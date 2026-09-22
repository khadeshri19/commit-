import express from 'express';
import { db } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { ROADMAP_PHASES } from '../data/roadmapData.js';

const router = express.Router();

router.use(authenticateToken);

// Helper to parse LeetCode URL into slug, title, and formatted URL
function parseLeetCodeInput(input, customDifficulty = 'MEDIUM') {
  if (!input) return null;
  const str = String(input).trim();
  
  // Extract slug from URL if pasted
  let slug = str;
  const urlMatch = str.match(/leetcode\.com\/problems\/([^/?#]+)/i);
  if (urlMatch && urlMatch[1]) {
    slug = urlMatch[1];
  } else {
    // Strip leading/trailing slashes
    slug = slug.replace(/^https?:\/\//, '').replace(/\/+$/, '').split('/').pop();
  }

  // Convert slug (e.g. "longest-palindromic-substring") into "Longest Palindromic Substring"
  const words = slug.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  const title = words.join(' ');
  const cleanUrl = `https://leetcode.com/problems/${slug}/`;

  return {
    slug,
    title,
    url: cleanUrl,
    difficulty: ['EASY', 'MEDIUM', 'HARD'].includes(customDifficulty?.toUpperCase()) 
      ? customDifficulty.toUpperCase() 
      : 'MEDIUM'
  };
}

/**
 * GET /api/roadmap
 * Get 5 Phases / 13 Weeks with milestone completion, user preferences & LeetCode problem integration
 */
router.get('/', (req, res) => {
  const user = db.findUserById(req.user.id);
  const userMilestones = db.getRoadmapProgress(req.user.id);
  const userDsa = db.getDsaProgress(req.user.id);
  const preferences = db.getUserPreferences(req.user.id);
  const customLeetcode = db.getCustomLeetcode(req.user.id);
  
  // Calculate which week we are on based on sprintStartDate
  const startDate = user?.sprintStartDate ? new Date(user.sprintStartDate) : new Date();
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const currentWeekNumber = Math.min(Math.max(Math.ceil(diffDays / 7), 1), 13);

  let totalMilestones = 0;
  let completedMilestones = 0;
  let totalLeetcodeProblems = 0;
  let solvedLeetcodeProblems = 0;

  const phasesWithProgress = ROADMAP_PHASES.map(phase => {
    let phaseTotal = 0;
    let phaseCompleted = 0;

    const weeksWithProgress = phase.weeks.map(week => {
      let weekTotal = 0;
      let weekCompleted = 0;

      const milestonesWithProgress = week.milestones.map(m => {
        totalMilestones++;
        phaseTotal++;
        weekTotal++;

        const isDone = !!userMilestones[m.id];
        if (isDone) {
          completedMilestones++;
          phaseCompleted++;
          weekCompleted++;
        }

        return {
          ...m,
          completed: isDone
        };
      });

      // Base curated LeetCode problems
      const baseLeetcode = (week.leetcodeProblems || []).map(p => {
        const isSolved = p.dsaId ? !!userDsa[p.dsaId]?.solved : false;
        const isFlagged = p.dsaId ? !!userDsa[p.dsaId]?.flagged : false;
        const notes = p.dsaId ? (userDsa[p.dsaId]?.notes || '') : '';
        return {
          ...p,
          isCustom: false,
          solved: isSolved,
          flagged: isFlagged,
          notes
        };
      });

      // Custom LeetCode problems added by user for this week
      const userWeekCustom = customLeetcode
        .filter(c => Number(c.weekNumber) === Number(week.weekNumber))
        .map(c => ({
          ...c,
          isCustom: true,
          solved: !!c.solved
        }));

      // Combined LeetCode list
      const combinedLeetcode = [...baseLeetcode, ...userWeekCustom];

      combinedLeetcode.forEach(p => {
        totalLeetcodeProblems++;
        if (p.solved) solvedLeetcodeProblems++;
      });

      const isCurrentWeek = week.weekNumber === currentWeekNumber;
      const isPastWeek = week.weekNumber < currentWeekNumber;

      return {
        ...week,
        isCurrentWeek,
        isPastWeek,
        weekTotal,
        weekCompleted,
        completionPercentage: weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0,
        milestones: milestonesWithProgress,
        leetcodeProblems: combinedLeetcode
      };
    });

    const phasePercentage = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;

    return {
      ...phase,
      phaseTotal,
      phaseCompleted,
      completionPercentage: phasePercentage,
      weeks: weeksWithProgress
    };
  });

  const overallRoadmapPercentage = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  res.json({
    phases: phasesWithProgress,
    currentWeekNumber,
    preferences,
    stats: {
      totalMilestones,
      completedMilestones,
      overallRoadmapPercentage,
      totalLeetcodeProblems,
      solvedLeetcodeProblems,
      leetcodeCompletionPercentage: totalLeetcodeProblems > 0 ? Math.round((solvedLeetcodeProblems / totalLeetcodeProblems) * 100) : 0,
      currentPhase: phasesWithProgress.find(p => p.weeks.some(w => w.weekNumber === currentWeekNumber))?.phaseNumber || 'Phase 01'
    }
  });
});

/**
 * GET /api/roadmap/preferences
 * Fetch user learning & roadmap preferences
 */
router.get('/preferences', (req, res) => {
  const preferences = db.getUserPreferences(req.user.id);
  res.json({ preferences });
});

/**
 * PUT /api/roadmap/preferences
 * Update user roadmap preferences (Track focus, difficulty, preset list, weekly target)
 */
router.put('/preferences', (req, res) => {
  const { trackFocus, difficultyPreference, presetList, weeklyTarget } = req.body;
  const updated = db.updateUserPreferences(req.user.id, {
    ...(trackFocus && { trackFocus }),
    ...(difficultyPreference && { difficultyPreference }),
    ...(presetList && { presetList }),
    ...(weeklyTarget !== undefined && { weeklyTarget: Number(weeklyTarget) })
  });
  res.json({ success: true, preferences: updated });
});

/**
 * POST /api/roadmap/custom-leetcode
 * Add a custom LeetCode problem link to a target week
 */
router.post('/custom-leetcode', (req, res) => {
  const { weekNumber, url, title, number, difficulty, tags, notes } = req.body;
  
  if (!url && !title) {
    return res.status(400).json({ error: 'LeetCode URL or problem title is required.' });
  }

  const parsed = parseLeetCodeInput(url || title, difficulty);
  
  const problem = db.addCustomLeetcode(req.user.id, weekNumber || 1, {
    url: parsed.url,
    title: title || parsed.title,
    number: number || null,
    difficulty: difficulty ? difficulty.toUpperCase() : parsed.difficulty,
    tags: tags || ['custom-target'],
    notes: notes || ''
  });

  res.status(201).json({ success: true, problem });
});

/**
 * DELETE /api/roadmap/custom-leetcode/:problemId
 * Remove a custom LeetCode problem
 */
router.delete('/custom-leetcode/:problemId', (req, res) => {
  const { problemId } = req.params;
  const deleted = db.deleteCustomLeetcode(req.user.id, problemId);
  if (!deleted) {
    return res.status(404).json({ error: 'Custom LeetCode problem not found' });
  }
  res.json({ success: true, message: 'Problem removed from roadmap' });
});

/**
 * POST /api/roadmap/custom-leetcode/toggle-solved/:problemId
 * Toggle solved status for a custom LeetCode problem
 */
router.post('/custom-leetcode/toggle-solved/:problemId', (req, res) => {
  const { problemId } = req.params;
  const problem = db.toggleCustomLeetcodeSolved(req.user.id, problemId);
  if (!problem) {
    return res.status(404).json({ error: 'Custom LeetCode problem not found' });
  }
  res.json({ success: true, problem });
});

/**
 * POST /api/roadmap/batch-leetcode
 * Bulk import multiple LeetCode links into a week
 */
router.post('/batch-leetcode', (req, res) => {
  const { weekNumber, urls, defaultDifficulty } = req.body;
  
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Array of LeetCode URLs or lines is required.' });
  }

  const problemsToInsert = [];
  urls.forEach(item => {
    const raw = String(item).trim();
    if (!raw) return;
    const parsed = parseLeetCodeInput(raw, defaultDifficulty || 'MEDIUM');
    if (parsed) {
      problemsToInsert.push({
        url: parsed.url,
        title: parsed.title,
        difficulty: parsed.difficulty,
        tags: ['imported-batch']
      });
    }
  });

  const added = db.batchAddLeetcode(req.user.id, weekNumber || 1, problemsToInsert);
  res.status(201).json({ success: true, count: added.length, problems: added });
});

/**
 * POST /api/roadmap/toggle-milestone/:milestoneId
 * Toggle completion of a milestone task
 */
router.post('/toggle-milestone/:milestoneId', (req, res) => {
  const { milestoneId } = req.params;
  const result = db.toggleRoadmapMilestone(req.user.id, milestoneId);
  res.json(result);
});

export default router;
