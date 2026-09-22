import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Flame, 
  Clock, 
  Binary, 
  GitBranch, 
  Layers,
  Terminal,
  Code
} from 'lucide-react';

export default function ReadmeProfileView() {
  const { readmeMarkdown, overviewData } = useApp();
  const { user } = useAuth();
  
  const [viewMode, setViewMode] = useState('rendered'); // 'rendered' or 'raw'
  const [copied, setCopied] = useState(false);

  const streak = overviewData?.streak || {};
  const dsa = overviewData?.dsa || {};
  const roadmap = overviewData?.roadmap || {};
  const resources = overviewData?.resources || {};
  const trackMinutes = streak.trackMinutes || { DSA: 0, BACKEND: 0, CS_FUNDAMENTALS: 0, SYSTEM_DESIGN: 0 };

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([readmeMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Header & Controls Bar */}
      <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                README.md — Developer Profile & Telemetry
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Auto-compiled GitHub profile specification • Exportable as markdown
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            
            {/* View Mode Toggle */}
            <div className="flex bg-slate-900 border border-slate-700 rounded p-0.5">
              <button
                onClick={() => setViewMode('rendered')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'rendered' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Rendered Preview
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'raw' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Raw Markdown
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/40 flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export File</span>
            </button>

          </div>
        </div>
      </div>

      {/* Rendered View or Raw Markdown View */}
      {viewMode === 'raw' ? (
        <div className="bg-[#050810] border border-slate-800 rounded-lg p-5">
          <pre className="text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {readmeMarkdown || 'Loading markdown profile...'}
          </pre>
        </div>
      ) : (
        <div className="bg-[#070b14] border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6 text-slate-200 shadow-xl">
          
          {/* Profile Title Banner */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold text-lg">
                {user?.username?.charAt(0).toUpperCase() || 'D'}
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  {user?.username || 'developer'} / dev-upgrade-engine
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target Role: <strong className="text-cyan-400">{user?.targetRole || 'Senior Full Stack & Systems Engineer'}</strong>
                </p>
              </div>
            </div>

            {/* Badges Bar */}
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>STREAK: {streak.currentStreak || 0} DAYS</span>
              </span>

              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-bold flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>HOURS: {streak.totalHours || 0}h</span>
              </span>

              <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold flex items-center space-x-1.5">
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                <span>DSA A2Z: {dsa.solved || 0}/{dsa.total || 455} ({dsa.percentage || 0}%)</span>
              </span>

              <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex items-center space-x-1.5">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                <span>SPRINT: {roadmap.completedMilestones || 0}/{roadmap.totalMilestones || 0} ({roadmap.percentage || 0}%)</span>
              </span>
            </div>
          </div>

          {/* Track Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Track Velocity & Time Distribution</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-800">
                <thead>
                  <tr className="bg-[#0f1422] border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="p-2.5 border-r border-slate-800">Track Branch</th>
                    <th className="p-2.5 border-r border-slate-800">Hours Logged</th>
                    <th className="p-2.5 border-r border-slate-800">Focus Share</th>
                    <th className="p-2.5">Pipeline Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-900/30">
                    <td className="p-2.5 font-bold text-cyan-400 border-r border-slate-800">DSA (Striver A2Z Sheet)</td>
                    <td className="p-2.5 text-slate-200 border-r border-slate-800">{(trackMinutes.DSA/60).toFixed(1)} hrs</td>
                    <td className="p-2.5 text-slate-400 border-r border-slate-800">{streak.totalHours > 0 ? Math.round((trackMinutes.DSA/60/streak.totalHours)*100) : 0}%</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">TRACKING</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="p-2.5 font-bold text-emerald-400 border-r border-slate-800">Backend (Spring Boot + Node.js)</td>
                    <td className="p-2.5 text-slate-200 border-r border-slate-800">{(trackMinutes.BACKEND/60).toFixed(1)} hrs</td>
                    <td className="p-2.5 text-slate-400 border-r border-slate-800">{streak.totalHours > 0 ? Math.round((trackMinutes.BACKEND/60/streak.totalHours)*100) : 0}%</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">TRACKING</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="p-2.5 font-bold text-amber-400 border-r border-slate-800">CS Fundamentals (OS, Networks, DBs)</td>
                    <td className="p-2.5 text-slate-200 border-r border-slate-800">{(trackMinutes.CS_FUNDAMENTALS/60).toFixed(1)} hrs</td>
                    <td className="p-2.5 text-slate-400 border-r border-slate-800">{streak.totalHours > 0 ? Math.round((trackMinutes.CS_FUNDAMENTALS/60/streak.totalHours)*100) : 0}%</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">TRACKING</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="p-2.5 font-bold text-purple-400 border-r border-slate-800">System Design (HLD / LLD)</td>
                    <td className="p-2.5 text-slate-200 border-r border-slate-800">{(trackMinutes.SYSTEM_DESIGN/60).toFixed(1)} hrs</td>
                    <td className="p-2.5 text-slate-400 border-r border-slate-800">{streak.totalHours > 0 ? Math.round((trackMinutes.SYSTEM_DESIGN/60/streak.totalHours)*100) : 0}%</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">TRACKING</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ASCII Branch Topology Diagram */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Git Branch Topology (90-Day Upgrade Sprint)</span>
            </h3>

            <div className="bg-[#03060c] border border-slate-800 rounded p-4 text-[11px] font-mono text-cyan-300 leading-relaxed overflow-x-auto shadow-inner">
{`*   main (Production Ready Systems Engineer)
│
├──* phase/05-production-mastery (Weeks 12-13: Cloud Deployments, Mock Interviews, Master Merge)
│
├──* phase/04-system-design      (Weeks 10-11: Distributed Rate Limiters, Sharding, HLD/LLD)
│
├──* phase/03-trees-and-events   (Weeks 07-09: Trees, Graphs, DP, Kafka, Redis Caching)
│
├──* phase/02-core-structures    (Weeks 04-06: Linked Lists, Stacks, Sliding Window, JPA Transactions)
│
└──* [ACTIVE] phase/01-foundations (Weeks 01-03: Complexity, Array Patterns, Spring/Node JWT Auth)`}
            </div>
          </div>

          {/* Resource & Verification Summary */}
          <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              Curated Playlists Watched: <strong className="text-slate-300">{resources.watched || 0}/{resources.total || 0}</strong>
            </div>
            <div>
              commit:// dev upgrade engine • Last telemetry sync: <strong className="text-cyan-400">{new Date().toLocaleDateString()}</strong>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
