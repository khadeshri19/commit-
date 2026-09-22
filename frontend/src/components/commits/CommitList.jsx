import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitCommit, 
  Clock, 
  Calendar, 
  Filter, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Plus,
  ArrowUpDown,
  History,
  Tag
} from 'lucide-react';
import CommitDetailModal from './CommitDetailModal';

export default function CommitList() {
  const { 
    commits, 
    overviewData, 
    setCommitModalOpen, 
    setEditingCommit,
    fetchCommits,
    loadingCommits 
  } = useApp();

  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedCommit, setInspectedCommit] = useState(null);

  const streak = overviewData?.streak || {};

  // Filter commits locally
  const filteredCommits = commits.filter(c => {
    if (selectedTrack !== 'ALL' && (!c.tracks || !c.tracks.includes(selectedTrack))) {
      return false;
    }
    if (selectedStatus !== 'ALL' && c.status !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMsg = c.commitMessage?.toLowerCase().includes(q);
      const matchHash = c.commitHash?.toLowerCase().includes(q);
      if (!matchMsg && !matchHash) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 font-mono">
      {inspectedCommit && (
        <CommitDetailModal
          commit={inspectedCommit}
          onClose={() => setInspectedCommit(null)}
        />
      )}

      {/* Header & Stats Banner */}
      <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Git Commit History (Daily Study Logs)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic skill commit logs • Each commit advances your master branch
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingCommit(null);
                setCommitModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>git commit</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">Total Commits</span>
            <div className="text-white font-bold text-sm mt-0.5">{streak.totalCommits || 0} logs</div>
          </div>
          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">Current Streak</span>
            <div className="text-amber-400 font-bold text-sm mt-0.5">{streak.currentStreak || 0} days</div>
          </div>
          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">Longest Streak</span>
            <div className="text-slate-300 font-bold text-sm mt-0.5">{streak.longestStreak || 0} days</div>
          </div>
          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">Time Logged</span>
            <div className="text-cyan-400 font-bold text-sm mt-0.5">{streak.totalHours || 0} hrs</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commit messages, hashes (e.g. 7f3a2b1, jwt)..."
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 pl-9 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono shadow-inner text-xs"
          />
        </div>

        {/* Track Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
          >
            <option value="ALL">All Tracks</option>
            <option value="DSA">DSA (Striver A2Z)</option>
            <option value="BACKEND">Backend (Spring / Node)</option>
            <option value="CS_FUNDAMENTALS">CS Fundamentals</option>
            <option value="SYSTEM_DESIGN">System Design</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="MERGED">MERGED (Done)</option>
            <option value="WIP">WIP (In Progress)</option>
            <option value="CONFLICT">CONFLICT (Blocked)</option>
          </select>
        </div>

      </div>

      {/* Commit Timeline / Log View */}
      <div className="space-y-3">
        {filteredCommits.length === 0 ? (
          <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-10 text-center text-slate-400">
            <GitCommit className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-200">No commits found.</p>
            <p className="text-xs text-slate-500 mt-1">Start by logging your daily study session.</p>
            <button
              onClick={() => {
                setEditingCommit(null);
                setCommitModalOpen(true);
              }}
              className="mt-4 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
            >
              + Create First Commit
            </button>
          </div>
        ) : (
          filteredCommits.map((commit, idx) => (
            <div
              key={commit.id || idx}
              onClick={() => setInspectedCommit(commit)}
              className="bg-[#090d16] hover:bg-[#0e1424] border border-slate-800 hover:border-slate-700 rounded-lg p-4 transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                
                {/* Left: Git Icon, Hash & Message */}
                <div className="flex items-start space-x-3 flex-1 min-w-[280px]">
                  <div className="mt-0.5 text-cyan-400 group-hover:scale-110 transition-transform">
                    <GitCommit className="w-4 h-4" />
                  </div>

                  <div className="overflow-hidden space-y-1">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                        {commit.commitHash}
                      </span>
                      <span className="text-slate-200 text-xs font-semibold group-hover:text-white">
                        {commit.commitMessage}
                      </span>
                    </div>

                    {/* Meta line: Tracks & Duration */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{commit.date}</span>
                      </span>

                      <span className="text-slate-700">•</span>

                      <span className="flex items-center space-x-1 text-amber-300">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{commit.minutesSpent} mins</span>
                      </span>

                      <span className="text-slate-700">•</span>

                      <div className="flex flex-wrap gap-1">
                        {commit.tracks?.map(t => (
                          <span 
                            key={t}
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${
                              t === 'DSA' ? 'bg-cyan-950/30 text-cyan-300 border-cyan-500/30' :
                              t === 'BACKEND' ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30' :
                              t === 'CS_FUNDAMENTALS' ? 'bg-amber-950/30 text-amber-300 border-amber-500/30' :
                              'bg-purple-950/30 text-purple-300 border-purple-500/30'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>

                {/* Right: Status Badge & Inspect indicator */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    commit.status === 'MERGED' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' :
                    commit.status === 'WIP' ? 'bg-amber-950/40 text-amber-400 border-amber-500/30' :
                    'bg-red-950/40 text-red-400 border-red-500/30'
                  }`}>
                    {commit.status}
                  </span>

                  <span className="text-slate-600 group-hover:text-slate-400 text-xs transition-colors">
                    →
                  </span>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
