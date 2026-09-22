import express from 'express';
import { db } from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { STRIVER_STEPS } from '../data/striverData.js';
import { ROADMAP_PHASES } from '../data/roadmapData.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * GET /api/stats/overview
 * Overview stats for the repo header and dashboard
 */
router.get('/overview', (req, res) => {
  const user = db.findUserById(req.user.id);
  const streakStats = db.getStreakAndStats(req.user.id);
  const dsaProgress = db.getDsaProgress(req.user.id);
  const userResources = db.getUserResources(req.user.id);
  const userMilestones = db.getRoadmapProgress(req.user.id);

  // Total DSA calculation
  let totalDsa = 0;
  let solvedDsa = 0;
  let flaggedDsa = 0;
  STRIVER_STEPS.forEach(s => s.topics.forEach(t => t.problems.forEach(p => {
    totalDsa++;
    if (dsaProgress[p.id]?.solved) solvedDsa++;
    if (dsaProgress[p.id]?.flagged) flaggedDsa++;
  })));

  // Roadmap calculation
  let totalMilestones = 0;
  let completedMilestones = 0;
  ROADMAP_PHASES.forEach(p => p.weeks.forEach(w => w.milestones.forEach(m => {
    totalMilestones++;
    if (userMilestones[m.id]) completedMilestones++;
  })));

  const startDate = user?.sprintStartDate ? new Date(user.sprintStartDate) : new Date();
  const now = new Date();
  const diffDays = Math.ceil(Math.abs(now - startDate) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(Math.max(Math.ceil(diffDays / 7), 1), 13);
  const currentPhase = currentWeek <= 3 ? 1 : currentWeek <= 6 ? 2 : currentWeek <= 9 ? 3 : currentWeek <= 11 ? 4 : 5;

  res.json({
    user: {
      username: user.username,
      email: user.email,
      targetRole: user.targetRole,
      sprintStartDate: user.sprintStartDate
    },
    streak: streakStats,
    dsa: {
      total: totalDsa,
      solved: solvedDsa,
      flagged: flaggedDsa,
      percentage: totalDsa > 0 ? Math.round((solvedDsa / totalDsa) * 100) : 0
    },
    roadmap: {
      currentWeek,
      currentPhase,
      daysInSprint: diffDays,
      totalMilestones,
      completedMilestones,
      percentage: totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0
    },
    resources: {
      total: userResources.length,
      watched: userResources.filter(r => r.status === 'watched').length,
      inProgress: userResources.filter(r => r.status === 'in_progress').length
    }
  });
});

/**
 * GET /api/stats/readme
 * Generate raw Markdown README.md string formatted for GitHub profiles
 */
router.get('/readme', (req, res) => {
  const user = db.findUserById(req.user.id);
  const streakStats = db.getStreakAndStats(req.user.id);
  const dsaProgress = db.getDsaProgress(req.user.id);
  const userResources = db.getUserResources(req.user.id);
  const userMilestones = db.getRoadmapProgress(req.user.id);
  const recentCommits = db.getCommits(req.user.id).slice(0, 7);

  // DSA numbers
  let totalDsa = 0, solvedDsa = 0;
  STRIVER_STEPS.forEach(s => s.topics.forEach(t => t.problems.forEach(p => {
    totalDsa++;
    if (dsaProgress[p.id]?.solved) solvedDsa++;
  })));
  const dsaPct = totalDsa > 0 ? Math.round((solvedDsa / totalDsa) * 100) : 0;

  // Roadmap calculation
  let totalMilestones = 0, completedMilestones = 0;
  ROADMAP_PHASES.forEach(p => p.weeks.forEach(w => w.milestones.forEach(m => {
    totalMilestones++;
    if (userMilestones[m.id]) completedMilestones++;
  })));
  const roadmapPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  const startDate = user?.sprintStartDate ? new Date(user.sprintStartDate) : new Date();
  const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(Math.max(Math.ceil(diffDays / 7), 1), 13);
  const currentPhase = currentWeek <= 3 ? 1 : currentWeek <= 6 ? 2 : currentWeek <= 9 ? 3 : currentWeek <= 11 ? 4 : 5;

  const dsaHours = (streakStats.trackMinutes.DSA / 60).toFixed(1);
  const backendHours = (streakStats.trackMinutes.BACKEND / 60).toFixed(1);
  const csHours = (streakStats.trackMinutes.CS_FUNDAMENTALS / 60).toFixed(1);
  const sysHours = (streakStats.trackMinutes.SYSTEM_DESIGN / 60).toFixed(1);

  const markdown = `# ${user.username} / dev-upgrade-engine
> **Repository Target**: \`${user.targetRole || 'Senior Full Stack & Systems Engineer'}\`  
> **Sprint Progress**: Day \`${diffDays} of 90\` | **Phase**: \`0${currentPhase} / 05\` | **Active Branch**: \`phase/0${currentPhase}-sprint\`

---

## 🚀 Telemetry & Telemetry Badges
\`\`\`
[STREAK: 🔥 ${streakStats.currentStreak} DAYS]  [TOTAL COMMITS: 📝 ${streakStats.totalCommits}]  [TIME LOGGED: ⏱️ ${streakStats.totalHours}h]  [DSA A2Z: 🗂️ ${solvedDsa}/${totalDsa} (${dsaPct}%)]
\`\`\`

---

## 📊 Track Velocity & Time Distribution
| Track | Hours Logged | Focus Ratio | Status |
| :--- | :--- | :--- | :--- |
| **DSA (Striver A2Z)** | \`${dsaHours} hrs\` | \`${streakStats.totalHours > 0 ? Math.round((streakStats.trackMinutes.DSA / 60 / streakStats.totalHours) * 100) : 0}%\` | \`TRACKING\` |
| **Backend (Spring Boot + Node.js)** | \`${backendHours} hrs\` | \`${streakStats.totalHours > 0 ? Math.round((streakStats.trackMinutes.BACKEND / 60 / streakStats.totalHours) * 100) : 0}%\` | \`TRACKING\` |
| **CS Fundamentals** | \`${csHours} hrs\` | \`${streakStats.totalHours > 0 ? Math.round((streakStats.trackMinutes.CS_FUNDAMENTALS / 60 / streakStats.totalHours) * 100) : 0}%\` | \`TRACKING\` |
| **System Design (HLD & LLD)** | \`${sysHours} hrs\` | \`${streakStats.totalHours > 0 ? Math.round((streakStats.trackMinutes.SYSTEM_DESIGN / 60 / streakStats.totalHours) * 100) : 0}%\` | \`TRACKING\` |

---

## 🔀 Git Branch Topology (90-Day Sprint)
\`\`\`text
*   main (Production Ready)
│
├──* phase/05-production-mastery (Weeks 12-13: Cloud, Mock Interviews, Master Merge)
│
├──* phase/04-system-design      (Weeks 10-11: Distributed Systems, Rate Limiting, Sharding)
│
├──* phase/03-trees-and-events   (Weeks 07-09: Trees, Graphs, DP, Kafka, Redis)
│
├──* phase/02-core-structures    (Weeks 04-06: LL, Stacks, Sliding Window, JPA Transactions)
│
└──* [ACTIVE] phase/01-foundations (Weeks 01-03: Complexity, Arrays, JWT Security Scaffolding)
\`\`\`

---

## 📝 Recent Commits (git log -n 5)
${recentCommits.map(c => `* \`${c.commitHash}\` **${c.date}** — \`${c.commitMessage}\` *(tracks: ${c.tracks.join(', ')} | ${c.minutesSpent} mins)*`).join('\n') || '* No commits logged yet.*'}

---

## 📚 Curated Hub Status
- **YouTube Playlists Completed**: \`${userResources.filter(r => r.status === 'watched').length} / ${userResources.length}\`
- **Active In-Progress**: \`${userResources.filter(r => r.status === 'in_progress').length}\`
- **90-Day Milestones Cleared**: \`${completedMilestones} / ${totalMilestones} (${roadmapPct}%)\`

---
*Auto-generated by **commit://** dev upgrade engine — Last sync: \`${new Date().toUTCString()}\`*
`;

  res.json({ markdown });
});

export default router;
