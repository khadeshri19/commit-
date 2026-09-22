import express from 'express';
import { db } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { STRIVER_STEPS } from '../data/striverData.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * GET /api/dsa/steps
 * Fetch all Striver A2Z steps and topics merged with user progress
 */
router.get('/steps', (req, res) => {
  const userProgress = db.getDsaProgress(req.user.id);
  
  let totalProblems = 0;
  let totalSolved = 0;
  let totalFlagged = 0;

  const stepsWithProgress = STRIVER_STEPS.map(step => {
    let stepTotal = 0;
    let stepSolved = 0;

    const topicsWithProgress = step.topics.map(topic => {
      const problemsWithProgress = topic.problems.map(p => {
        totalProblems++;
        stepTotal++;

        const prog = userProgress[p.id] || { solved: false, flagged: false, notes: '' };
        if (prog.solved) {
          totalSolved++;
          stepSolved++;
        }
        if (prog.flagged) {
          totalFlagged++;
        }

        return {
          ...p,
          solved: !!prog.solved,
          flagged: !!prog.flagged,
          notes: prog.notes || '',
          solvedAt: prog.solvedAt || null
        };
      });

      return {
        ...topic,
        problems: problemsWithProgress
      };
    });

    const completionPercentage = stepTotal > 0 ? Math.round((stepSolved / stepTotal) * 100) : 0;

    return {
      ...step,
      stepTotal,
      stepSolved,
      completionPercentage,
      topics: topicsWithProgress
    };
  });

  const overallPercentage = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  res.json({
    steps: stepsWithProgress,
    stats: {
      totalProblems,
      totalSolved,
      totalFlagged,
      overallPercentage
    }
  });
});

/**
 * POST /api/dsa/toggle-solved/:problemId
 * Toggle solved status for a problem
 */
router.post('/toggle-solved/:problemId', (req, res) => {
  const { problemId } = req.params;
  const progress = db.toggleDsaSolved(req.user.id, problemId);
  res.json({ problemId, progress });
});

/**
 * POST /api/dsa/toggle-flag/:problemId
 * Toggle revision flag for a problem
 */
router.post('/toggle-flag/:problemId', (req, res) => {
  const { problemId } = req.params;
  const progress = db.toggleDsaFlag(req.user.id, problemId);
  res.json({ problemId, progress });
});

/**
 * PUT /api/dsa/notes/:problemId
 * Save approach / gotcha notes for a problem
 */
router.put('/notes/:problemId', (req, res) => {
  const { problemId } = req.params;
  const { notes } = req.body;
  const progress = db.updateDsaNotes(req.user.id, problemId, notes);
  res.json({ problemId, progress });
});

/**
 * GET /api/dsa/stats
 * Quick summary of DSA sheet progress
 */
router.get('/stats', (req, res) => {
  const userProgress = db.getDsaProgress(req.user.id);
  let totalProblems = 0;
  let totalSolved = 0;
  let totalFlagged = 0;
  let easySolved = 0, easyTotal = 0;
  let medSolved = 0, medTotal = 0;
  let hardSolved = 0, hardTotal = 0;

  STRIVER_STEPS.forEach(step => {
    step.topics.forEach(topic => {
      topic.problems.forEach(p => {
        totalProblems++;
        if (p.difficulty === 'EASY') easyTotal++;
        else if (p.difficulty === 'MEDIUM') medTotal++;
        else if (p.difficulty === 'HARD') hardTotal++;

        const prog = userProgress[p.id];
        if (prog?.solved) {
          totalSolved++;
          if (p.difficulty === 'EASY') easySolved++;
          else if (p.difficulty === 'MEDIUM') medSolved++;
          else if (p.difficulty === 'HARD') hardSolved++;
        }
        if (prog?.flagged) {
          totalFlagged++;
        }
      });
    });
  });

  res.json({
    totalProblems,
    totalSolved,
    totalFlagged,
    overallPercentage: totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0,
    difficulty: {
      easy: { solved: easySolved, total: easyTotal, pct: easyTotal ? Math.round((easySolved/easyTotal)*100) : 0 },
      medium: { solved: medSolved, total: medTotal, pct: medTotal ? Math.round((medSolved/medTotal)*100) : 0 },
      hard: { solved: hardSolved, total: hardTotal, pct: hardTotal ? Math.round((hardSolved/hardTotal)*100) : 0 }
    }
  });
});

export default router;
