import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { isAuthenticated } = useAuth();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview'); // overview, roadmap, commits, heatmap, dsa, resources, diff, readme
  const [activeBranch, setActiveBranch] = useState('main');

  // Modals & Drawers
  const [commitModalOpen, setCommitModalOpen] = useState(false);
  const [editingCommit, setEditingCommit] = useState(null);
  const [youtubeModal, setYoutubeModal] = useState({ open: false, resource: null });
  const [dsaNotesModal, setDsaNotesModal] = useState({ open: false, problem: null });
  const [cliOpen, setCliOpen] = useState(false);

  // Terminal Notification (Understated Git CLI output)
  const [gitToast, setGitToast] = useState(null);

  // Cached Application Data
  const [overviewData, setOverviewData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [heatmapData, setHeatmapData] = useState(null);
  const [dsaSteps, setDsaSteps] = useState([]);
  const [dsaStats, setDsaStats] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [resourcesData, setResourcesData] = useState({ resources: [], stats: {} });
  const [readmeMarkdown, setReadmeMarkdown] = useState('');
  
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [loadingDsa, setLoadingDsa] = useState(false);

  // Trigger Understated Git CLI Toast
  const notifyGit = useCallback((message, type = 'info') => {
    setGitToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setGitToast(prev => (prev?.message === message ? null : prev));
    }, 4500);
  }, []);

  // Fetch Overview Stats
  const fetchOverview = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoadingOverview(true);
      const data = await api.getOverview();
      setOverviewData(data);
    } catch (err) {
      console.error('Failed to load overview telemetry:', err);
    } finally {
      setLoadingOverview(false);
    }
  }, [isAuthenticated]);

  // Fetch Commits & Heatmap
  const fetchCommits = useCallback(async (filters = {}) => {
    if (!isAuthenticated) return;
    try {
      setLoadingCommits(true);
      const [commitsRes, heatmapRes] = await Promise.all([
        api.getCommits(filters),
        api.getHeatmap()
      ]);
      setCommits(commitsRes.commits || []);
      setHeatmapData(heatmapRes);
    } catch (err) {
      console.error('Failed to load commits:', err);
    } finally {
      setLoadingCommits(false);
    }
  }, [isAuthenticated]);

  // Fetch Striver DSA Sheet
  const fetchDsa = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoadingDsa(true);
      const [stepsRes, statsRes] = await Promise.all([
        api.getDsaSteps(),
        api.getDsaStats()
      ]);
      setDsaSteps(stepsRes.steps || []);
      setDsaStats(statsRes);
    } catch (err) {
      console.error('Failed to load DSA sheet:', err);
    } finally {
      setLoadingDsa(false);
    }
  }, [isAuthenticated]);

  // Fetch Roadmap
  const fetchRoadmap = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await api.getRoadmap();
      setRoadmapData(data);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
    }
  }, [isAuthenticated]);

  // Fetch Resources
  const fetchResources = useCallback(async (filters = {}) => {
    if (!isAuthenticated) return;
    try {
      const data = await api.getResources(filters);
      setResourcesData(data);
    } catch (err) {
      console.error('Failed to load resources:', err);
    }
  }, [isAuthenticated]);

  // Fetch README Markdown
  const fetchReadme = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await api.getReadme();
      setReadmeMarkdown(data.markdown || '');
    } catch (err) {
      console.error('Failed to load README.md:', err);
    }
  }, [isAuthenticated]);

  // Refresh All Data
  const refreshAll = useCallback(() => {
    if (isAuthenticated) {
      fetchOverview();
      fetchCommits();
      fetchDsa();
      fetchRoadmap();
      fetchResources();
      fetchReadme();
    }
  }, [isAuthenticated, fetchOverview, fetchCommits, fetchDsa, fetchRoadmap, fetchResources, fetchReadme]);

  // Initial load when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      refreshAll();
    }
  }, [isAuthenticated, refreshAll]);

  // Handlers for Commits
  const handleCreateCommit = async (commitData) => {
    const res = await api.createCommit(commitData);
    notifyGit(`[${activeBranch} ${res.commit.commitHash}] ${res.commit.commitMessage}`, 'success');
    refreshAll();
    return res;
  };

  const handleUpdateCommit = async (id, commitData) => {
    const res = await api.updateCommit(id, commitData);
    notifyGit(`[commit ${res.commit.commitHash}] updated successfully`, 'info');
    refreshAll();
    return res;
  };

  const handleDeleteCommit = async (id) => {
    await api.deleteCommit(id);
    notifyGit(`commit reverted from history`, 'warning');
    refreshAll();
  };

  // Handlers for DSA
  const handleToggleDsaSolved = async (problemId, problemTitle) => {
    const res = await api.toggleDsaSolved(problemId);
    const isSolved = res.progress?.solved;
    notifyGit(`${isSolved ? '+ [SOLVED]' : '- [UNSOLVED]'} ${problemTitle}`, isSolved ? 'success' : 'warning');
    fetchDsa();
    fetchOverview();
    fetchReadme();
  };

  const handleToggleDsaFlag = async (problemId, problemTitle) => {
    const res = await api.toggleDsaFlag(problemId);
    const isFlagged = res.progress?.flagged;
    notifyGit(`${isFlagged ? '🚩 [FLAGGED FOR REVISION]' : '🏳️ [REVISION CLEARED]'} ${problemTitle}`, 'info');
    fetchDsa();
  };

  const handleSaveDsaNotes = async (problemId, notes) => {
    await api.updateDsaNotes(problemId, notes);
    notifyGit(`📝 Approach notes saved`, 'info');
    fetchDsa();
  };

  const [addLeetcodeModal, setAddLeetcodeModal] = useState({ open: false, weekNumber: 1 });
  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);

  // Handlers for Roadmap
  const handleToggleMilestone = async (milestoneId, text) => {
    const res = await api.toggleMilestone(milestoneId);
    notifyGit(`${res.completed ? '✅ [MERGED MILESTONE]' : '⏳ [REOPENED]'} ${text.substring(0, 40)}...`, res.completed ? 'success' : 'info');
    fetchRoadmap();
    fetchOverview();
    fetchReadme();
  };

  const handleUpdatePreferences = async (newPrefs) => {
    await api.updateRoadmapPreferences(newPrefs);
    notifyGit('⚙️ [CONFIG] Roadmap & LeetCode preferences updated', 'success');
    fetchRoadmap();
    fetchOverview();
  };

  const handleAddCustomLeetcode = async (problemData) => {
    const res = await api.addCustomLeetcode(problemData);
    notifyGit(`⚡ [LEETCODE LINKED] ${res.problem?.title || 'Problem'} to Week ${problemData.weekNumber}`, 'success');
    fetchRoadmap();
    fetchOverview();
    return res;
  };

  const handleDeleteCustomLeetcode = async (problemId, title) => {
    await api.deleteCustomLeetcode(problemId);
    notifyGit(`🗑️ Removed ${title || 'LeetCode link'} from roadmap`, 'warning');
    fetchRoadmap();
    fetchOverview();
  };

  const handleToggleCustomLeetcode = async (problemId, title) => {
    const res = await api.toggleCustomLeetcodeSolved(problemId);
    const isSolved = res.problem?.solved;
    notifyGit(`${isSolved ? '+ [SOLVED LC]' : '- [UNSOLVED LC]'} ${title}`, isSolved ? 'success' : 'warning');
    fetchRoadmap();
    fetchOverview();
    fetchReadme();
  };

  const handleBatchAddLeetcode = async (batchData) => {
    const res = await api.batchAddLeetcode(batchData);
    notifyGit(`🚀 [BATCH IMPORT] ${res.count} LeetCode links imported to Week ${batchData.weekNumber}`, 'success');
    fetchRoadmap();
    fetchOverview();
    return res;
  };

  // 1-Click Solve & Log Git Commit
  const handleSolveAndCommitLeetCode = async (problem, minutesSpent = 30) => {
    // If it has a dsaId, mark dsa solved
    if (problem.dsaId) {
      if (!problem.solved) {
        await api.toggleDsaSolved(problem.dsaId);
      }
    } else if (problem.isCustom) {
      if (!problem.solved) {
        await api.toggleCustomLeetcodeSolved(problem.id);
      }
    }

    // Log git commit
    const commitMsg = `feat(dsa): solved LeetCode #${problem.number || 'Chall'} ${problem.title} [${problem.difficulty || 'MEDIUM'}]`;
    await api.createCommit({
      commitMessage: commitMsg,
      tracks: ['DSA'],
      minutesSpent: Number(minutesSpent) || 30,
      status: 'MERGED'
    });

    notifyGit(`[commit MERGED] Solved ${problem.title} & logged 30m DSA commit`, 'success');
    refreshAll();
  };

  // Handlers for Resources
  const handleUpdateResourceStatus = async (resourceId, status, title) => {
    await api.updateResourceStatus(resourceId, status);
    notifyGit(`📺 [${status.toUpperCase()}] ${title.substring(0, 35)}...`, status === 'watched' ? 'success' : 'info');
    fetchResources();
    fetchOverview();
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeBranch,
        setActiveBranch,
        
        // Modals & Drawers
        commitModalOpen,
        setCommitModalOpen,
        editingCommit,
        setEditingCommit,
        youtubeModal,
        setYoutubeModal,
        dsaNotesModal,
        setDsaNotesModal,
        cliOpen,
        setCliOpen,
        addLeetcodeModal,
        setAddLeetcodeModal,
        preferenceModalOpen,
        setPreferenceModalOpen,
        
        // Notifications
        gitToast,
        notifyGit,

        // Data & Refreshers
        overviewData,
        commits,
        heatmapData,
        dsaSteps,
        dsaStats,
        roadmapData,
        resourcesData,
        readmeMarkdown,
        loadingOverview,
        loadingCommits,
        loadingDsa,
        
        refreshAll,
        fetchCommits,
        fetchDsa,
        fetchResources,
        fetchRoadmap,
        fetchReadme,

        // Direct actions
        handleCreateCommit,
        handleUpdateCommit,
        handleDeleteCommit,
        handleToggleDsaSolved,
        handleToggleDsaFlag,
        handleSaveDsaNotes,
        handleToggleMilestone,
        handleUpdatePreferences,
        handleAddCustomLeetcode,
        handleDeleteCustomLeetcode,
        handleToggleCustomLeetcode,
        handleBatchAddLeetcode,
        handleSolveAndCommitLeetCode,
        handleUpdateResourceStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
