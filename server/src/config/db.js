import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { STRIVER_STEPS } from '../data/striverData.js';
import { ROADMAP_PHASES } from '../data/roadmapData.js';
import { DEFAULT_RESOURCES } from '../data/resourcesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'dev_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Database Schema / Seed
function getInitialDbState() {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('password123', salt);

  // Generate realistic initial commits for demo user across recent 30 days
  const demoCommits = [];
  const tracks = ['DSA', 'BACKEND', 'CS_FUNDAMENTALS', 'SYSTEM_DESIGN'];
  const now = new Date();
  
  // Seed a continuous 14-day streak ending today
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Choose tracks touched
    let dayTracks = [];
    if (i % 3 === 0) dayTracks = ['DSA', 'BACKEND'];
    else if (i % 3 === 1) dayTracks = ['DSA', 'CS_FUNDAMENTALS'];
    else dayTracks = ['BACKEND', 'SYSTEM_DESIGN'];

    const hash = Math.random().toString(16).substring(2, 9);
    demoCommits.push({
      id: `commit_demo_${i}`,
      userId: 'user_demo_1',
      commitHash: hash,
      commitMessage: i === 0 
        ? 'feat(auth): implement jwt filter & scaffold striver dsa a2z integration' 
        : i % 2 === 0 
          ? `refactor(dsa): solve two-pointer & monotonic stack pattern set [step ${Math.floor(i/2) + 1}]` 
          : `feat(backend): implement spring boot jpa repo & connection pool benchmarks`,
      tracks: dayTracks,
      minutesSpent: 90 + ((i * 17) % 60),
      status: 'MERGED',
      date: dateStr,
      createdAt: d.toISOString()
    });
  }

  // Pre-seed some solved DSA problems for demo user
  const demoDsaProgress = {};
  const sampleSolvedIds = ['p1_1_1', 'p1_1_2', 'p1_1_3', 'p1_1_4', 'p1_2_1', 'p1_2_2', 'p1_3_1', 'p1_3_2', 'p1_4_1', 'p1_4_6', 'p2_1_1', 'p2_1_2', 'p2_2_1', 'p3_1_1', 'p3_1_2', 'p3_1_4', 'p3_2_1', 'p3_2_2', 'p3_2_4'];
  const sampleFlaggedIds = ['p1_4_6', 'p2_2_1', 'p3_2_4'];
  
  sampleSolvedIds.forEach(id => {
    demoDsaProgress[id] = {
      solved: true,
      flagged: sampleFlaggedIds.includes(id),
      notes: id === 'p3_2_4' ? "Kadane's Algorithm: Reset sum to 0 if current running sum becomes negative. O(N) time, O(1) space." : "",
      updatedAt: new Date().toISOString()
    };
  });

  return {
    users: [
      {
        id: 'user_demo_1',
        email: 'demo@commit.dev',
        username: 'octodev',
        passwordHash: passwordHash,
        targetRole: 'Senior Full Stack & Systems Engineer',
        sprintStartDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      }
    ],
    commits: demoCommits,
    dsaProgress: {
      'user_demo_1': demoDsaProgress
    },
    roadmapMilestones: {
      'user_demo_1': {
        'm_w1_1': true,
        'm_w1_2': true,
        'm_w1_3': true,
        'm_w1_4': true,
        'm_w2_1': true,
        'm_w2_2': true,
        'm_w2_3': true
      }
    },
    userResources: {
      'user_demo_1': DEFAULT_RESOURCES.map(r => ({ ...r }))
    },
    userPreferences: {
      'user_demo_1': {
        trackFocus: 'BALANCED',
        difficultyPreference: 'ALL',
        presetList: 'STRIVER_A2Z',
        weeklyTarget: 10,
        updatedAt: new Date().toISOString()
      }
    },
    customLeetcode: {
      'user_demo_1': [
        {
          id: 'lc_cust_demo_1',
          weekNumber: 1,
          number: 1,
          title: 'Two Sum',
          difficulty: 'EASY',
          url: 'https://leetcode.com/problems/two-sum/',
          tags: ['hash-map', 'arrays'],
          solved: true,
          createdAt: new Date().toISOString()
        }
      ]
    }
  };
}

// In-Memory / File-based Database Client
class Database {
  constructor() {
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        if (!this.data.userPreferences) this.data.userPreferences = {};
        if (!this.data.customLeetcode) this.data.customLeetcode = {};
      } else {
        this.data = getInitialDbState();
        this.save();
      }
    } catch (err) {
      console.warn('Could not read dev_db.json, initializing fresh state:', err.message);
      this.data = getInitialDbState();
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting dev_db.json:', err);
    }
  }

  // --- Users ---
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  createUser({ email, username, password }) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      email: email.toLowerCase().trim(),
      username: username.trim(),
      passwordHash: passwordHash,
      targetRole: 'Full Stack & Distributed Systems Engineer',
      sprintStartDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    
    // Initialize user collections
    this.data.dsaProgress[newUser.id] = {};
    this.data.roadmapMilestones[newUser.id] = {};
    this.data.userResources[newUser.id] = DEFAULT_RESOURCES.map(r => ({ ...r }));
    this.data.userPreferences[newUser.id] = {
      trackFocus: 'BALANCED',
      difficultyPreference: 'ALL',
      presetList: 'STRIVER_A2Z',
      weeklyTarget: 10,
      updatedAt: new Date().toISOString()
    };
    this.data.customLeetcode[newUser.id] = [];
    
    this.save();
    return newUser;
  }

  // --- Commits ---
  getCommits(userId, filters = {}) {
    let userCommits = this.data.commits.filter(c => c.userId === userId);
    
    if (filters.track && filters.track !== 'ALL') {
      userCommits = userCommits.filter(c => c.tracks && c.tracks.includes(filters.track));
    }
    if (filters.status && filters.status !== 'ALL') {
      userCommits = userCommits.filter(c => c.status === filters.status);
    }
    if (filters.startDate) {
      userCommits = userCommits.filter(c => c.date >= filters.startDate);
    }
    if (filters.endDate) {
      userCommits = userCommits.filter(c => c.date <= filters.endDate);
    }

    // Sort descending by date & creation time
    return userCommits.sort((a, b) => new Date(b.date + 'T' + (b.createdAt?.split('T')[1] || '00:00:00')) - new Date(a.date + 'T' + (a.createdAt?.split('T')[1] || '00:00:00')));
  }

  createCommit(userId, { commitMessage, tracks, minutesSpent, status, date }) {
    const commitHash = Math.random().toString(16).substring(2, 9);
    const newCommit = {
      id: `commit_${Date.now()}_${commitHash}`,
      userId,
      commitHash,
      commitMessage: commitMessage || 'chore: logged learning session',
      tracks: Array.isArray(tracks) && tracks.length > 0 ? tracks : ['DSA'],
      minutesSpent: Number(minutesSpent) || 60,
      status: status || 'MERGED',
      date: date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    this.data.commits.unshift(newCommit);
    this.save();
    return newCommit;
  }

  updateCommit(userId, commitId, updates) {
    const index = this.data.commits.findIndex(c => c.id === commitId && c.userId === userId);
    if (index === -1) return null;

    this.data.commits[index] = {
      ...this.data.commits[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.commits[index];
  }

  deleteCommit(userId, commitId) {
    const index = this.data.commits.findIndex(c => c.id === commitId && c.userId === userId);
    if (index === -1) return false;

    this.data.commits.splice(index, 1);
    this.save();
    return true;
  }

  // Calculate Running Streak & Multi-track Heatmap
  getStreakAndStats(userId) {
    const userCommits = this.data.commits.filter(c => c.userId === userId);
    
    // Group commits by date
    const dateMap = {};
    let totalMinutes = 0;
    const trackMinutes = {
      DSA: 0,
      BACKEND: 0,
      CS_FUNDAMENTALS: 0,
      SYSTEM_DESIGN: 0
    };

    userCommits.forEach(c => {
      const d = c.date;
      if (!dateMap[d]) dateMap[d] = [];
      dateMap[d].push(c);
      
      const mins = Number(c.minutesSpent) || 0;
      totalMinutes += mins;
      
      if (Array.isArray(c.tracks)) {
        const splitMins = mins / c.tracks.length;
        c.tracks.forEach(t => {
          if (trackMinutes[t] !== undefined) {
            trackMinutes[t] += splitMins;
          }
        });
      }
    });

    // Calculate current streak
    const dates = Object.keys(dateMap).sort().reverse();
    let currentStreak = 0;
    let longestStreak = 0;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if streak is alive today or yesterday
    let checkDate = new Date();
    if (!dateMap[todayStr] && dateMap[yesterdayStr]) {
      checkDate = yesterday;
    }

    while (true) {
      const checkStr = checkDate.toISOString().split('T')[0];
      if (dateMap[checkStr] && dateMap[checkStr].length > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Longest streak calculation
    let tempStreak = 0;
    const sortedAscDates = Object.keys(dateMap).sort();
    for (let i = 0; i < sortedAscDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prev = new Date(sortedAscDates[i - 1]);
        const curr = new Date(sortedAscDates[i]);
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    }

    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      totalCommits: userCommits.length,
      totalHours: Number((totalMinutes / 60).toFixed(1)),
      trackMinutes,
      activeDaysCount: Object.keys(dateMap).length
    };
  }

  // --- Striver DSA Sheet Progress ---
  getDsaProgress(userId) {
    if (!this.data.dsaProgress[userId]) {
      this.data.dsaProgress[userId] = {};
      this.save();
    }
    return this.data.dsaProgress[userId];
  }

  toggleDsaSolved(userId, problemId) {
    if (!this.data.dsaProgress[userId]) this.data.dsaProgress[userId] = {};
    const curr = this.data.dsaProgress[userId][problemId] || { solved: false, flagged: false, notes: '' };
    
    this.data.dsaProgress[userId][problemId] = {
      ...curr,
      solved: !curr.solved,
      solvedAt: !curr.solved ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.dsaProgress[userId][problemId];
  }

  toggleDsaFlag(userId, problemId) {
    if (!this.data.dsaProgress[userId]) this.data.dsaProgress[userId] = {};
    const curr = this.data.dsaProgress[userId][problemId] || { solved: false, flagged: false, notes: '' };
    
    this.data.dsaProgress[userId][problemId] = {
      ...curr,
      flagged: !curr.flagged,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.dsaProgress[userId][problemId];
  }

  updateDsaNotes(userId, problemId, notes) {
    if (!this.data.dsaProgress[userId]) this.data.dsaProgress[userId] = {};
    const curr = this.data.dsaProgress[userId][problemId] || { solved: false, flagged: false, notes: '' };
    
    this.data.dsaProgress[userId][problemId] = {
      ...curr,
      notes: notes || '',
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.dsaProgress[userId][problemId];
  }

  // --- Roadmap Milestones ---
  getRoadmapProgress(userId) {
    if (!this.data.roadmapMilestones[userId]) {
      this.data.roadmapMilestones[userId] = {};
      this.save();
    }
    return this.data.roadmapMilestones[userId];
  }

  toggleRoadmapMilestone(userId, milestoneId) {
    if (!this.data.roadmapMilestones[userId]) this.data.roadmapMilestones[userId] = {};
    const current = !!this.data.roadmapMilestones[userId][milestoneId];
    this.data.roadmapMilestones[userId][milestoneId] = !current;
    this.save();
    return { milestoneId, completed: !current };
  }

  // --- Resources ---
  getUserResources(userId) {
    if (!this.data.userResources[userId]) {
      this.data.userResources[userId] = DEFAULT_RESOURCES.map(r => ({ ...r }));
      this.save();
    }
    return this.data.userResources[userId];
  }

  updateResourceStatus(userId, resourceId, status) {
    if (!this.data.userResources[userId]) {
      this.data.userResources[userId] = DEFAULT_RESOURCES.map(r => ({ ...r }));
    }
    const resList = this.data.userResources[userId];
    const item = resList.find(r => r.id === resourceId);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
      this.save();
      return item;
    }
    return null;
  }

  addCustomResource(userId, resource) {
    if (!this.data.userResources[userId]) {
      this.data.userResources[userId] = DEFAULT_RESOURCES.map(r => ({ ...r }));
    }
    const newRes = {
      id: `res_custom_${Date.now()}`,
      title: resource.title,
      channel: resource.channel || 'Custom',
      embedUrl: resource.embedUrl,
      track: resource.track || 'BACKEND',
      phaseTag: resource.phaseTag || 'Phase 1 - Foundations',
      description: resource.description || '',
      status: 'not_started',
      tags: resource.tags || [],
      createdAt: new Date().toISOString()
    };
    this.data.userResources[userId].unshift(newRes);
    this.save();
    return newRes;
  }

  // --- Roadmap Preferences & Custom LeetCode Management ---
  getUserPreferences(userId) {
    if (!this.data.userPreferences[userId]) {
      this.data.userPreferences[userId] = {
        trackFocus: 'BALANCED',
        difficultyPreference: 'ALL',
        presetList: 'STRIVER_A2Z',
        weeklyTarget: 10,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
    return this.data.userPreferences[userId];
  }

  updateUserPreferences(userId, updates) {
    const current = this.getUserPreferences(userId);
    this.data.userPreferences[userId] = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.userPreferences[userId];
  }

  getCustomLeetcode(userId) {
    if (!this.data.customLeetcode[userId]) {
      this.data.customLeetcode[userId] = [];
      this.save();
    }
    return this.data.customLeetcode[userId];
  }

  addCustomLeetcode(userId, weekNumber, problemData) {
    if (!this.data.customLeetcode[userId]) {
      this.data.customLeetcode[userId] = [];
    }

    const id = `lc_cust_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newProblem = {
      id,
      weekNumber: Number(weekNumber) || 1,
      number: Number(problemData.number) || null,
      title: problemData.title || 'Custom LeetCode Challenge',
      difficulty: problemData.difficulty ? problemData.difficulty.toUpperCase() : 'MEDIUM',
      url: problemData.url || 'https://leetcode.com/problemset/all/',
      tags: Array.isArray(problemData.tags) ? problemData.tags : [],
      solved: !!problemData.solved,
      notes: problemData.notes || '',
      createdAt: new Date().toISOString()
    };

    this.data.customLeetcode[userId].unshift(newProblem);
    this.save();
    return newProblem;
  }

  deleteCustomLeetcode(userId, problemId) {
    if (!this.data.customLeetcode[userId]) return false;
    const index = this.data.customLeetcode[userId].findIndex(p => p.id === problemId);
    if (index === -1) return false;

    this.data.customLeetcode[userId].splice(index, 1);
    this.save();
    return true;
  }

  batchAddLeetcode(userId, weekNumber, problemsArray) {
    if (!this.data.customLeetcode[userId]) {
      this.data.customLeetcode[userId] = [];
    }

    const added = [];
    problemsArray.forEach((p, idx) => {
      const id = `lc_cust_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`;
      const newProblem = {
        id,
        weekNumber: Number(weekNumber) || 1,
        number: Number(p.number) || null,
        title: p.title || `LeetCode Problem #${idx + 1}`,
        difficulty: p.difficulty ? p.difficulty.toUpperCase() : 'MEDIUM',
        url: p.url || 'https://leetcode.com/problemset/all/',
        tags: Array.isArray(p.tags) ? p.tags : [],
        solved: false,
        notes: '',
        createdAt: new Date().toISOString()
      };
      this.data.customLeetcode[userId].unshift(newProblem);
      added.push(newProblem);
    });

    this.save();
    return added;
  }

  toggleCustomLeetcodeSolved(userId, problemId) {
    if (!this.data.customLeetcode[userId]) return null;
    const problem = this.data.customLeetcode[userId].find(p => p.id === problemId);
    if (!problem) return null;

    problem.solved = !problem.solved;
    problem.solvedAt = problem.solved ? new Date().toISOString() : null;
    this.save();
    return problem;
  }
}

export const db = new Database();

