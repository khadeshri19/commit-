import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitBranch, 
  CheckCircle2, 
  Circle, 
  Layers, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  GitCommit, 
  ExternalLink, 
  Code2, 
  Sliders, 
  Plus, 
  Trash2, 
  FileText, 
  Search, 
  Zap, 
  Target,
  Bookmark
} from 'lucide-react';
import RoadmapPreferenceModal from './RoadmapPreferenceModal';
import AddLeetCodeModal from './AddLeetCodeModal';

export default function RoadmapView() {
  const { 
    roadmapData, 
    handleToggleMilestone, 
    handleToggleDsaSolved,
    handleToggleCustomLeetcode,
    handleDeleteCustomLeetcode,
    handleSolveAndCommitLeetCode,
    setDsaNotesModal,
    setCommitModalOpen,
    setActiveBranch,
    setPreferenceModalOpen,
    setAddLeetcodeModal
  } = useApp();

  const phases = roadmapData?.phases || [];
  const currentWeekNum = roadmapData?.currentWeekNumber || 1;
  const preferences = roadmapData?.preferences || {
    trackFocus: 'BALANCED',
    difficultyPreference: 'ALL',
    presetList: 'STRIVER_A2Z',
    weeklyTarget: 10
  };
  const stats = roadmapData?.stats || {};
  
  // Find current week object for spotlight banner
  let currentWeekObj = null;
  let currentPhaseObj = null;
  phases.forEach(p => {
    p.weeks.forEach(w => {
      if (w.weekNumber === currentWeekNum) {
        currentWeekObj = w;
        currentPhaseObj = p;
      }
    });
  });

  // State for collapsible phases, local search, and filter
  const [collapsedPhases, setCollapsedPhases] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const togglePhaseCollapse = (phaseId) => {
    setCollapsedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const getFocusBadgeColor = (focus) => {
    switch(focus) {
      case 'DSA_INTENSIVE': return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40';
      case 'BACKEND': return 'text-purple-400 bg-purple-950/40 border-purple-500/40';
      case 'SYSTEM_DESIGN': return 'text-amber-400 bg-amber-950/40 border-amber-500/40';
      default: return 'text-cyan-400 bg-cyan-950/40 border-cyan-500/40';
    }
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* 1. Top Preference & LeetCode Command Radar Bar */}
      <div className="bg-[#0b1220] border border-slate-700/80 rounded-lg p-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Preferences Summary */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>Roadmap Mode:</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getFocusBadgeColor(preferences.trackFocus)}`}>
                {preferences.trackFocus === 'BALANCED' ? 'BALANCED FULL-STACK' :
                 preferences.trackFocus === 'DSA_INTENSIVE' ? 'DSA INTENSIVE' :
                 preferences.trackFocus === 'BACKEND' ? 'SPRING BOOT & BACKEND' :
                 'SYSTEM DESIGN FAANG'}
              </span>
            </div>

            <span className="hidden sm:inline text-slate-700">|</span>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Preset: <strong className="text-slate-200">{preferences.presetList || 'STRIVER_A2Z'}</strong></span>
            </div>

            <span className="hidden sm:inline text-slate-700">|</span>

            <div className="text-xs text-slate-400">
              Target: <strong className="text-cyan-300">{preferences.weeklyTarget || 10} problems/wk</strong>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreferenceModalOpen(true)}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
              title="Configure learning focus, difficulty preferences, and targets"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>⚙️ Preferences</span>
            </button>

            <button
              onClick={() => setAddLeetcodeModal({ open: true, weekNumber: currentWeekNum })}
              className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              title="Add a single LeetCode link or bulk import problem URLs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>⚡ + Link LeetCode / Batch</span>
            </button>
          </div>

        </div>

        {/* LeetCode Telemetry Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#070b14] p-2 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Total LeetCode Linked</div>
            <div className="text-sm font-bold text-white mt-0.5">{stats.totalLeetcodeProblems || 0} Problems</div>
          </div>
          <div className="bg-[#070b14] p-2 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Cleared / Solved</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{stats.solvedLeetcodeProblems || 0} Solved ({stats.leetcodeCompletionPercentage || 0}%)</div>
          </div>
          <div className="bg-[#070b14] p-2 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Milestones Merged</div>
            <div className="text-sm font-bold text-cyan-300 mt-0.5">{stats.completedMilestones || 0}/{stats.totalMilestones || 0} ({stats.overallRoadmapPercentage || 0}%)</div>
          </div>
          <div className="bg-[#070b14] p-2 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Current Sprint</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5">Week {currentWeekNum < 10 ? `0${currentWeekNum}` : currentWeekNum} / 13</div>
          </div>
        </div>
      </div>

      {/* 2. Spotlight Hero Card with LeetCode Integration */}
      {currentWeekObj && (
        <div className="bg-gradient-to-r from-[#0b1329] via-[#091024] to-[#070b18] border-2 border-cyan-500/40 rounded-lg p-6 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <GitBranch className="w-32 h-32 text-cyan-400" />
          </div>

          <div className="relative z-10 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 animate-pulse">
                  ⭐ ACTIVE SPRINT FOCUS
                </span>
                <span className="text-slate-400 text-xs">
                  {currentPhaseObj?.phaseNumber} • {currentPhaseObj?.phaseTitle}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-300 font-bold">{currentWeekObj.weekCompleted}/{currentWeekObj.weekTotal} milestones</span>
                <span className="text-cyan-400 font-bold">({currentWeekObj.completionPercentage}%)</span>
              </div>
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {currentWeekObj.title}
              </h2>

              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {currentWeekObj.goal}
              </p>
            </div>

            {/* This Week's LeetCode Integrated Problems */}
            {currentWeekObj.leetcodeProblems?.length > 0 && (
              <div className="bg-[#050810]/90 border border-slate-700/80 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                  <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>This Week&apos;s Target LeetCode Set (Click to practice / 1-click solve)</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400">
                      {currentWeekObj.leetcodeProblems.filter(p => p.solved).length}/{currentWeekObj.leetcodeProblems.length} solved
                    </span>
                    <button
                      onClick={() => setAddLeetcodeModal({ open: true, weekNumber: currentWeekNum })}
                      className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30 cursor-pointer"
                    >
                      + Add LC Link
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {currentWeekObj.leetcodeProblems.map(lc => (
                    <div
                      key={lc.id}
                      className={`p-2.5 rounded border flex items-center justify-between text-xs transition-colors ${
                        lc.solved 
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300' 
                          : 'bg-[#080d1a] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 overflow-hidden">
                        <button
                          onClick={() => {
                            if (lc.dsaId) handleToggleDsaSolved(lc.dsaId, lc.title);
                            else if (lc.isCustom) handleToggleCustomLeetcode(lc.id, lc.title);
                          }}
                          className="cursor-pointer"
                          title={lc.solved ? 'Mark unsolved' : 'Mark solved'}
                        >
                          {lc.solved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 hover:text-cyan-400" />
                          )}
                        </button>

                        <div className="truncate">
                          <div className="flex items-center space-x-1.5">
                            {lc.number && (
                              <span className="text-[10px] font-bold text-slate-500 font-mono">#{lc.number}</span>
                            )}
                            <span className={`text-xs font-medium truncate ${lc.solved ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {lc.title}
                            </span>
                            {lc.isCustom && (
                              <span className="text-[8px] bg-purple-950/50 text-purple-300 border border-purple-500/30 px-1 rounded">
                                custom
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          lc.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30' :
                          lc.difficulty === 'MEDIUM' ? 'text-amber-400 bg-amber-950/40 border border-amber-500/30' :
                          'text-red-400 bg-red-950/40 border border-red-500/30'
                        }`}>
                          {lc.difficulty}
                        </span>

                        {/* 1-Click Solve & Log Commit */}
                        <button
                          onClick={() => handleSolveAndCommitLeetCode(lc, 30)}
                          className="text-slate-400 hover:text-emerald-400 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                          title="1-Click: Mark Solved & Log 30m Git Commit"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>

                        {/* Direct LeetCode External Link */}
                        <a
                          href={lc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400 p-1 rounded hover:bg-slate-800 transition-colors"
                          title="Open problem on LeetCode in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Custom problem delete */}
                        {lc.isCustom && (
                          <button
                            onClick={() => handleDeleteCustomLeetcode(lc.id, lc.title)}
                            className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Remove custom problem"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* This Week's Milestones Checklist */}
            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentWeekObj.milestones.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleToggleMilestone(m.id, m.text)}
                  className={`p-2.5 rounded border text-left flex items-start space-x-2.5 transition-all cursor-pointer ${
                    m.completed
                      ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-400'
                      : 'bg-[#060a14] border-slate-700/80 text-slate-200 hover:border-cyan-500/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {m.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600 hover:text-cyan-400" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-[11px] ${m.completed ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                      {m.text}
                    </p>
                    <span className="inline-block mt-0.5 text-[9px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                      {m.track}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-500">
                Solving LeetCode problems syncs live with both roadmap weeks and the Striver A2Z sheet.
              </span>
              <button
                onClick={() => setCommitModalOpen(true)}
                className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>+ Log Today&apos;s Work</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. Full 5-Phase / 13-Week Git Branch Topology View */}
      <div className="space-y-4">
        
        {/* Toolbar with Search & Difficulty Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-1">
          <span className="font-bold text-slate-300 uppercase tracking-wider">
            Repository Branch Matrix (5 Phases / 13 Weeks)
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search problem / milestone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#050810] border border-slate-700 rounded py-1 pl-7 pr-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono w-48"
              />
              <Search className="w-3 h-3 text-slate-500 absolute left-2 top-2 pointer-events-none" />
            </div>

            {/* Difficulty Preference Selector */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-[#050810] border border-slate-700 rounded py-1 px-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
            >
              <option value="ALL">All Difficulties</option>
              <option value="EASY">Easy Focus</option>
              <option value="MEDIUM">Medium Focus</option>
              <option value="HARD">Hard Focus</option>
            </select>
          </div>
        </div>

        {phases.map((phase) => {
          const isCollapsed = !!collapsedPhases[phase.phaseId];

          return (
            <div 
              key={phase.phaseId}
              className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden shadow-sm"
            >
              
              {/* Phase Header */}
              <div className="bg-[#0f1422] p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                
                <button
                  onClick={() => togglePhaseCollapse(phase.phaseId)}
                  className="flex items-center space-x-3 text-left cursor-pointer flex-1"
                >
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0" />
                  )}

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-cyan-400">{phase.phaseNumber}</span>
                      <span className="text-slate-600">•</span>
                      <h3 className="text-sm font-bold text-white">{phase.phaseTitle}</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{phase.phaseSubtitle}</p>
                  </div>
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveBranch(phase.branchName)}
                    className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                    title="Switch active branch context"
                  >
                    <GitBranch className="w-3 h-3 text-cyan-400" />
                    <span>checkout {phase.branchName}</span>
                  </button>

                  <div className="text-right text-xs">
                    <span className="text-slate-400">{phase.phaseCompleted}/{phase.phaseTotal} done</span>
                    <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div 
                        className="bg-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${phase.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-400 w-8 text-right">
                    {phase.completionPercentage}%
                  </span>
                </div>

              </div>

              {/* Weeks within Phase */}
              {!isCollapsed && (
                <div className="p-4 space-y-5 bg-[#070a12]">
                  {phase.weeks.map(week => {
                    const isCurrent = week.weekNumber === currentWeekNum;
                    
                    // Filter leetcode by difficulty & search query
                    const filteredLeetcode = (week.leetcodeProblems || []).filter(p => {
                      const matchDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
                      const matchSearch = !searchQuery || 
                        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.number && String(p.number).includes(searchQuery));
                      return matchDiff && matchSearch;
                    });

                    return (
                      <div 
                        key={week.weekNumber}
                        className={`p-4 rounded-lg border transition-all ${
                          isCurrent 
                            ? 'bg-[#091122] border-cyan-500/50 shadow-md' 
                            : 'bg-[#090d16] border-slate-800/80'
                        }`}
                      >
                        
                        {/* Week Title Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/70">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-300'}`}>
                              Week {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}
                            </span>
                            <span className="text-slate-600">•</span>
                            <h4 className="text-xs font-bold text-slate-200">{week.title}</h4>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                THIS WEEK
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3 text-xs">
                            <button
                              onClick={() => setAddLeetcodeModal({ open: true, weekNumber: week.weekNumber })}
                              className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center space-x-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add LC Link</span>
                            </button>

                            <span className="text-slate-500 text-[11px]">
                              {week.weekCompleted}/{week.weekTotal} milestones
                            </span>
                            <span className="text-xs font-bold text-cyan-400">
                              {week.completionPercentage}%
                            </span>
                          </div>
                        </div>

                        {/* Week Goal Summary */}
                        <p className="text-[11px] text-slate-400 mt-2 mb-3">
                          {week.goal}
                        </p>

                        {/* LeetCode Practice Set Integration */}
                        {filteredLeetcode.length > 0 && (
                          <div className="mb-3 bg-[#050810] border border-slate-800/80 rounded p-3">
                            <div className="text-[10px] text-cyan-400 font-bold uppercase mb-2 flex items-center justify-between">
                              <span className="flex items-center space-x-1.5">
                                <Code2 className="w-3.5 h-3.5" />
                                <span>Integrated LeetCode Set</span>
                              </span>
                              <span className="text-slate-500 font-normal">
                                {filteredLeetcode.filter(p => p.solved).length}/{filteredLeetcode.length} cleared
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {filteredLeetcode.map(lc => (
                                <div
                                  key={lc.id}
                                  className={`p-2 rounded border flex items-center justify-between text-xs transition-colors ${
                                    lc.solved 
                                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300' 
                                      : 'bg-[#080d1a] border-slate-800/90 hover:border-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2 overflow-hidden">
                                    <button
                                      onClick={() => {
                                        if (lc.dsaId) handleToggleDsaSolved(lc.dsaId, lc.title);
                                        else if (lc.isCustom) handleToggleCustomLeetcode(lc.id, lc.title);
                                      }}
                                      className="cursor-pointer"
                                      title={lc.solved ? 'Mark unsolved' : 'Mark solved'}
                                    >
                                      {lc.solved ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : (
                                        <Circle className="w-3.5 h-3.5 text-slate-600 hover:text-cyan-400" />
                                      )}
                                    </button>

                                    <div className="truncate">
                                      {lc.number && (
                                        <span className="text-[10px] font-bold text-slate-500 mr-1.5">#{lc.number}</span>
                                      )}
                                      <span className={`text-[11px] font-medium truncate ${lc.solved ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                        {lc.title}
                                      </span>
                                      {lc.isCustom && (
                                        <span className="ml-1.5 text-[8px] bg-purple-950/50 text-purple-300 border border-purple-500/30 px-1 rounded">
                                          custom
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                                    <span className={`px-1 py-0.2 rounded text-[8px] font-bold ${
                                      lc.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30' :
                                      lc.difficulty === 'MEDIUM' ? 'text-amber-400 bg-amber-950/40 border border-amber-500/30' :
                                      'text-red-400 bg-red-950/40 border border-red-500/30'
                                    }`}>
                                      {lc.difficulty}
                                    </span>

                                    {/* 1-Click Solve & Git Commit */}
                                    <button
                                      onClick={() => handleSolveAndCommitLeetCode(lc, 30)}
                                      className="text-slate-400 hover:text-emerald-400 p-0.5 rounded hover:bg-slate-800"
                                      title="1-Click: Mark Solved & Log Git Commit"
                                    >
                                      <Zap className="w-3 h-3" />
                                    </button>

                                    {/* Direct LeetCode Link */}
                                    <a
                                      href={lc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-slate-400 hover:text-cyan-400 p-0.5 rounded hover:bg-slate-800"
                                      title="Open problem on LeetCode"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </a>

                                    {/* Custom problem delete */}
                                    {lc.isCustom && (
                                      <button
                                        onClick={() => handleDeleteCustomLeetcode(lc.id, lc.title)}
                                        className="text-slate-500 hover:text-red-400 p-0.5 rounded hover:bg-slate-800 cursor-pointer"
                                        title="Remove custom link"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Week Milestones Checklist */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {week.milestones.map(m => (
                            <button
                              key={m.id}
                              onClick={() => handleToggleMilestone(m.id, m.text)}
                              className={`p-2 rounded border text-left flex items-start space-x-2 transition-colors cursor-pointer ${
                                m.completed
                                  ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-400'
                                  : 'bg-[#050810] border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {m.completed ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-slate-600" />
                                )}
                              </div>
                              <div className="overflow-hidden flex-1">
                                <span className={`text-[11px] ${m.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                  {m.text}
                                </span>
                                <span className="inline-block ml-1.5 text-[9px] text-slate-500 font-semibold">
                                  [{m.track}]
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Modals */}
      <RoadmapPreferenceModal />
      <AddLeetCodeModal />

    </div>
  );
}
