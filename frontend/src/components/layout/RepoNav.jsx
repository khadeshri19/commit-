import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Code2, 
  GitBranch, 
  GitCommit, 
  BarChart3, 
  Binary, 
  Tv, 
  FileText,
  GitCompare,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export default function RepoNav() {
  const { activeTab, setActiveTab, overviewData, commits, dsaStats } = useApp();

  const tabs = [
    {
      id: 'overview',
      label: 'Code / Overview',
      icon: Code2,
      badge: null,
    },
    {
      id: 'roadmap',
      label: 'Branches (Roadmap)',
      icon: GitBranch,
      badge: `${overviewData?.roadmap?.percentage || 0}%`,
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
    },
    {
      id: 'commits',
      label: 'Commits',
      icon: GitCommit,
      badge: commits?.length || 0,
      badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700'
    },
    {
      id: 'heatmap',
      label: 'Insights (Graph)',
      icon: BarChart3,
      badge: `${overviewData?.streak?.currentStreak || 0}d streak`,
      badgeColor: 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
    },
    {
      id: 'dsa',
      label: 'Striver A2Z Sheet',
      icon: Binary,
      badge: `${overviewData?.dsa?.solved || 0}/${overviewData?.dsa?.total || 455}`,
      badgeColor: 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
    },
    {
      id: 'diff',
      label: 'Code Diff Inspector',
      icon: GitCompare,
      badge: 'Diffs',
      badgeColor: 'bg-slate-800 text-cyan-300 border border-slate-700'
    },
    {
      id: 'resources',
      label: 'Resource Hub',
      icon: Tv,
      badge: `${overviewData?.resources?.watched || 0} done`,
      badgeColor: 'bg-purple-950/60 text-purple-400 border border-purple-500/30'
    },
    {
      id: 'readme',
      label: 'README.md',
      icon: FileText,
      badge: 'Profile',
      badgeColor: 'bg-slate-800 text-slate-400 border border-slate-700'
    }
  ];

  return (
    <nav className="bg-[#0b0f1a] border-b border-slate-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-md font-mono text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-cyan-400 text-white bg-slate-900/90 font-semibold shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
