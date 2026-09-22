import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Terminal, 
  GitCommit, 
  GitBranch, 
  Binary, 
  Tv, 
  Flame, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Sparkles,
  GitCompare
} from 'lucide-react';
import ContributionHeatmap from '../heatmap/ContributionHeatmap';
import CherryPickRevisionQueue from '../revision/CherryPickRevisionQueue';
import PomodoroTimer from '../timer/PomodoroTimer';
import GitBranchGraph from '../roadmap/GitBranchGraph';

export default function OverviewTab() {
  const { 
    overviewData, 
    commits, 
    roadmapData, 
    setActiveTab, 
    setCommitModalOpen, 
    setEditingCommit,
    handleToggleMilestone,
    cliOpen,
    setCliOpen 
  } = useApp();
  const { user } = useAuth();

  const streak = overviewData?.streak || {};
  const dsa = overviewData?.dsa || {};
  const roadmap = overviewData?.roadmap || {};
  const currentWeekNum = roadmap.currentWeek || 1;

  // Active week milestones
  const activePhase = roadmapData?.phases?.find(p => p.weeks.some(w => w.weekNumber === currentWeekNum));
  const activeWeek = activePhase?.weeks?.find(w => w.weekNumber === currentWeekNum);

  return (
    <div className="space-y-6 font-mono">
      
      {/* 1. Terminal Quick Commit Banner */}
      <div className="bg-[#0b0f1a] border border-cyan-500/30 rounded-lg p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-white font-bold">Ready to log today&apos;s upgrade session?</span>
              <span className="text-slate-500 hidden sm:inline">($ git commit -m &quot;...&quot;)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Current streak: <strong className="text-amber-400">{streak.currentStreak || 0} days</strong> • Keep the flame burning.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCliOpen(!cliOpen)}
            className="px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>$ Open CLI Shell</span>
          </button>

          <button
            onClick={() => {
              setEditingCommit(null);
              setCommitModalOpen(true);
            }}
            className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <GitCommit className="w-4 h-4" />
            <span>+ Log Daily Session</span>
          </button>
        </div>
      </div>

      {/* 2. Key Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Streak */}
        <div className="bg-[#090d16] border border-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Active Streak</span>
            <div className="text-xl font-bold text-amber-400 mt-1 flex items-center space-x-1.5">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <span>{streak.currentStreak || 0} Days</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Longest: {streak.longestStreak || 0} days</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* DSA Sheet Progress */}
        <div 
          onClick={() => setActiveTab('dsa')}
          className="bg-[#090d16] hover:bg-[#0d1424] border border-slate-800 hover:border-cyan-500/40 rounded-lg p-4 flex items-center justify-between transition-all cursor-pointer"
        >
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Striver A2Z DSA</span>
            <div className="text-xl font-bold text-cyan-400 mt-1">
              {dsa.solved || 0} <span className="text-xs text-slate-500 font-normal">/ {dsa.total || 455}</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">{dsa.percentage || 0}% overall completion</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
            {dsa.percentage || 0}%
          </div>
        </div>

        {/* 90-Day Sprint Roadmap */}
        <div 
          onClick={() => setActiveTab('roadmap')}
          className="bg-[#090d16] hover:bg-[#0d1424] border border-slate-800 hover:border-emerald-500/40 rounded-lg p-4 flex items-center justify-between transition-all cursor-pointer"
        >
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">90-Day Roadmap</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">
              Week {currentWeekNum < 10 ? `0${currentWeekNum}` : currentWeekNum} <span className="text-xs text-slate-500 font-normal">/ 13</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Phase 0{roadmap.currentPhase || 1} • {roadmap.percentage || 0}% merged</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Time Logged */}
        <div className="bg-[#090d16] border border-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Time Logged</span>
            <div className="text-xl font-bold text-purple-400 mt-1">
              {streak.totalHours || 0} <span className="text-xs text-slate-500 font-normal">hrs</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">{streak.totalCommits || 0} commits recorded</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
        </div>

      </div>

      {/* 3. Pomodoro Focus Timer + Spaced Repetition Cherry-Pick Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <PomodoroTimer />
        </div>
        <div className="lg:col-span-6">
          <CherryPickRevisionQueue />
        </div>
      </div>

      {/* 4. 4-Track Overlaid Contribution Heatmap */}
      <ContributionHeatmap onSelectDate={() => setActiveTab('commits')} />

      {/* 5. Interactive SVG Git Branch Graph */}
      <GitBranchGraph />

      {/* 6. Two Column Layout: Active Week Focus + Recent Commits Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Sprint Week Milestones */}
        <div className="lg:col-span-6 bg-[#090d16] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Sprint Focus: Week {currentWeekNum < 10 ? `0${currentWeekNum}` : currentWeekNum}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-[11px] text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Full Roadmap</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-medium mt-3 mb-1">
              {activeWeek?.title || 'Loading active sprint tasks...'}
            </p>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              {activeWeek?.goal}
            </p>

            {/* Milestones Checklist */}
            <div className="space-y-2">
              {activeWeek?.milestones?.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleToggleMilestone(m.id, m.text)}
                  className={`w-full p-2.5 rounded border text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                    m.completed
                      ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-400'
                      : 'bg-[#050810] border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {m.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                  <span className={`text-[11px] ${m.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {m.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Progress: {activeWeek?.weekCompleted || 0}/{activeWeek?.weekTotal || 0} milestones</span>
            <span className="text-cyan-400 font-bold">{activeWeek?.completionPercentage || 0}%</span>
          </div>
        </div>

        {/* Right Column: Recent Commit Log */}
        <div className="lg:col-span-6 bg-[#090d16] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <GitCommit className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Commits (git log -n 5)
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('commits')}
                className="text-[11px] text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>View All ({commits.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Commit List */}
            <div className="space-y-2.5 mt-3">
              {commits.slice(0, 5).map((c, idx) => (
                <div
                  key={c.id || idx}
                  onClick={() => setActiveTab('commits')}
                  className="bg-[#050810] hover:bg-[#0c1220] border border-slate-800/80 rounded p-2.5 transition-colors cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-cyan-400 font-mono">
                        {c.commitHash}
                      </span>
                      <span className="text-xs text-slate-200 font-mono truncate">
                        {c.commitMessage}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1">
                      <span>{c.date}</span>
                      <span>•</span>
                      <span>{c.minutesSpent} mins</span>
                      <span>•</span>
                      <span className="text-slate-500">{c.tracks?.join(', ')}</span>
                    </div>
                  </div>

                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    c.status === 'MERGED' ? 'text-emerald-400 bg-emerald-950/30' :
                    c.status === 'WIP' ? 'text-amber-400 bg-amber-950/30' : 'text-red-400 bg-red-950/30'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Branch HEAD: master</span>
            <button
              onClick={() => {
                setEditingCommit(null);
                setCommitModalOpen(true);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              + Create New Commit
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
