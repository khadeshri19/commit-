import express from 'express';
import { db } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All commit routes are protected by JWT authentication
router.use(authenticateToken);

/**
 * GET /api/commits
 * Retrieve commit log timeline for current user
 */
router.get('/', (req, res) => {
  const { track, status, startDate, endDate } = req.query;
  const commits = db.getCommits(req.user.id, { track, status, startDate, endDate });
  res.json({ commits });
});

/**
 * POST /api/commits
 * Log a new study session (commit)
 */
router.post('/', (req, res) => {
  const { commitMessage, tracks, minutesSpent, status, date } = req.body;

  if (!commitMessage || commitMessage.trim() === '') {
    return res.status(400).json({ error: 'Commit message is required.' });
  }

  const newCommit = db.createCommit(req.user.id, {
    commitMessage: commitMessage.trim(),
    tracks: tracks || ['DSA'],
    minutesSpent: Number(minutesSpent) || 60,
    status: status || 'MERGED',
    date: date || new Date().toISOString().split('T')[0]
  });

  const streakStats = db.getStreakAndStats(req.user.id);

  res.status(201).json({
    message: `[main ${newCommit.commitHash}] ${newCommit.commitMessage}`,
    commit: newCommit,
    stats: streakStats
  });
});

/**
 * PUT /api/commits/:id
 * Edit an existing commit
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { commitMessage, tracks, minutesSpent, status, date } = req.body;

  const updated = db.updateCommit(req.user.id, id, {
    commitMessage,
    tracks,
    minutesSpent: Number(minutesSpent),
    status,
    date
  });

  if (!updated) {
    return res.status(404).json({ error: 'Commit not found.' });
  }

  const streakStats = db.getStreakAndStats(req.user.id);
  res.json({ commit: updated, stats: streakStats });
});

/**
 * DELETE /api/commits/:id
 * Revert / delete a commit
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = db.deleteCommit(req.user.id, id);

  if (!success) {
    return res.status(404).json({ error: 'Commit not found.' });
  }

  const streakStats = db.getStreakAndStats(req.user.id);
  res.json({ message: 'Commit reverted successfully.', stats: streakStats });
});

/**
 * GET /api/commits/streak
 * Get current streak, longest streak, and hours breakdown
 */
router.get('/streak', (req, res) => {
  const stats = db.getStreakAndStats(req.user.id);
  res.json({ stats });
});

/**
 * GET /api/commits/heatmap
 * Get 365-day multi-track contribution matrix
 */
router.get('/heatmap', (req, res) => {
  const commits = db.getCommits(req.user.id);
  
  // Aggregate commits by date
  const dateMap = {};
  commits.forEach(c => {
    const d = c.date;
    if (!dateMap[d]) {
      dateMap[d] = {
        date: d,
        count: 0,
        minutes: 0,
        tracks: {
          DSA: 0,
          BACKEND: 0,
          CS_FUNDAMENTALS: 0,
          SYSTEM_DESIGN: 0
        },
        commits: []
      };
    }
    dateMap[d].count += 1;
    const mins = Number(c.minutesSpent) || 0;
    dateMap[d].minutes += mins;
    dateMap[d].commits.push({
      hash: c.commitHash,
      message: c.commitMessage,
      tracks: c.tracks,
      status: c.status
    });

    if (Array.isArray(c.tracks)) {
      c.tracks.forEach(t => {
        if (dateMap[d].tracks[t] !== undefined) {
          dateMap[d].tracks[t] += 1;
        }
      });
    }
  });

  // Generate 52 weeks (364 days) calendar ending today
  const today = new Date();
  const dayGrid = [];
  const totalDays = 364; // 52 weeks * 7 days

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const data = dateMap[dateStr] || {
      date: dateStr,
      count: 0,
      minutes: 0,
      tracks: { DSA: 0, BACKEND: 0, CS_FUNDAMENTALS: 0, SYSTEM_DESIGN: 0 },
      commits: []
    };
    dayGrid.push(data);
  }

  res.json({
    days: dayGrid,
    stats: db.getStreakAndStats(req.user.id)
  });
});

export default router;
