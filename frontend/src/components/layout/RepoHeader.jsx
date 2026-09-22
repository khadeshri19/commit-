import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  GitBranch, 
  GitCommit, 
  Flame, 
  Clock, 
  Layers, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Terminal, 
  Palette,
  Tv,
  Sparkles
} from 'lucide-react';

export default function RepoHeader() {
  const { user, logout } = useAuth();
  const { 
    activeBranch, 
    setActiveBranch, 
    setCommitModalOpen, 
    setEditingCommit,
    overviewData,
    cliOpen,
    setCliOpen 
  } = useApp();
  const { theme, setTheme, themes, scanlines, setScanlines } = useTheme();
  
  const [branchDropdown, setBranchDropdown] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const branches = [
    { name: 'main', label: 'main (Production Engine)' },
    { name: 'phase/01-foundations', label: 'phase/01-foundations (W01-W03)' },
    { name: 'phase/02-core-structures', label: 'phase/02-core-structures (W04-W06)' },
    { name: 'phase/03-trees-and-events', label: 'phase/03-trees-and-events (W07-W09)' },
    { name: 'phase/04-system-design', label: 'phase/04-system-design (W10-W11)' },
    { name: 'phase/05-production-mastery', label: 'phase/05-production-mastery (W12-W13)' },
  ];

  const streak = overviewData?.streak?.currentStreak || 0;
  const totalHours = overviewData?.streak?.totalHours || 0;
  const daysInSprint = overviewData?.roadmap?.daysInSprint || 14;

  return (
    <header className="border-b border-slate-800 bg-[#070a12]/90 backdrop-blur-md sticky top-0 z-40 font-mono">
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Left: Repo Path & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold tracking-tight text-base sm:text-lg">
              <Terminal className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>commit://</span>
            </div>

            <span className="text-slate-600">/</span>
            
            <span className="text-slate-300 text-xs sm:text-sm font-semibold hover:text-white transition-colors">
              {user?.username || 'developer'}
            </span>

            <span className="text-slate-600">/</span>

            <span className="text-white text-xs sm:text-sm font-bold bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
              dev-upgrade-engine
            </span>

            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              public repo
            </span>
          </div>

          {/* Right: Quick Stats & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Streak Counter Chip */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{streak}d streak</span>
            </div>

            {/* Total Hours Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{totalHours}h</span>
            </div>

            {/* Terminal CLI Button CTA */}
            <button
              onClick={() => setCliOpen(!cliOpen)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-all cursor-pointer ${
                cliOpen
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
              }`}
              title="Open Interactive Terminal Shell"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">$ CLI</span>
            </button>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdown(!themeDropdown)}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 cursor-pointer"
                title="Visual Theme"
              >
                <Palette className="w-3.5 h-3.5 text-purple-400" />
              </button>

              {themeDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-md bg-[#0d121f] border border-slate-700 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Terminal Visual Themes
                  </div>
                  {Object.values(themes).map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800/80 ${
                        theme === t.id ? 'text-cyan-400 font-bold bg-cyan-950/30' : 'text-slate-300'
                      }`}
                    >
                      <span>{t.name}</span>
                      {theme === t.id && <span className="text-cyan-400">✓</span>}
                    </button>
                  ))}

                  <div className="border-t border-slate-800 mt-2 pt-2 px-3">
                    <button
                      onClick={() => setScanlines(!scanlines)}
                      className="w-full text-left flex items-center justify-between text-slate-400 hover:text-slate-200"
                    >
                      <span className="text-[11px]">CRT Scanlines</span>
                      <span className={`text-[10px] font-bold ${scanlines ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {scanlines ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Signature Terminal Commit CTA */}
            <button
              onClick={() => {
                setEditingCommit(null);
                setCommitModalOpen(true);
              }}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-md border border-emerald-400/40 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <GitCommit className="w-4 h-4" />
              <span className="hidden sm:inline">+ git commit</span>
              <span className="sm:hidden">Commit</span>
            </button>

            {/* User Profile / Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center space-x-1.5 px-2 py-1.5 rounded-md bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-900/60 border border-cyan-500/40 flex items-center justify-center text-[10px] text-cyan-300 font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-md bg-[#0d121f] border border-slate-700 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-slate-400 text-[10px]">SIGNED IN AS</p>
                    <p className="text-white font-bold truncate">{user?.email}</p>
                    <p className="text-cyan-400 text-[11px] mt-0.5">@{user?.username}</p>
                  </div>
                  
                  <div className="px-3 py-2 text-[11px] text-slate-400 border-b border-slate-800">
                    <span className="text-slate-500">Target Role:</span>
                    <p className="text-slate-200 mt-0.5">{user?.targetRole || 'Full Stack Engineer'}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>git logout --force</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Sub-header: Branch Selector & Repo Metadata */}
      <div className="bg-[#0b0f1a] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Branch Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBranchDropdown(!branchDropdown)}
              className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 px-3 py-1 rounded text-xs text-slate-200 transition-colors shadow-inner cursor-pointer"
            >
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-cyan-300">{activeBranch}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {branchDropdown && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-md bg-[#0f1523] border border-slate-700 shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Switch 90-Day Branch (Track)
                </div>
                {branches.map(b => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setActiveBranch(b.name);
                      setBranchDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                      activeBranch === b.name ? 'text-cyan-400 font-bold bg-cyan-950/30' : 'text-slate-300'
                    }`}
                  >
                    <span className="truncate">{b.label}</span>
                    {activeBranch === b.name && <span className="text-[10px] text-cyan-400">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Repo Metadata chips */}
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="hidden sm:inline-flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>HEAD detached at origin/{activeBranch}</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-slate-400">
              DSA: <span className="text-cyan-400 font-bold">{overviewData?.dsa?.percentage || 0}%</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">
              Roadmap: <span className="text-emerald-400 font-bold">{overviewData?.roadmap?.percentage || 0}%</span>
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
