import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Binary, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Trophy,
  AlertCircle
} from 'lucide-react';
import DsaNotesModal from './DsaNotesModal';

export default function DsaSheetView() {
  const { 
    dsaSteps, 
    dsaStats, 
    handleToggleDsaSolved, 
    handleToggleDsaFlag, 
    setDsaNotesModal,
    loadingDsa 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStep, setSelectedStep] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, SOLVED, UNSOLVED, FLAGGED
  
  // Track open/collapsed state of steps
  const [expandedSteps, setExpandedSteps] = useState({ 1: true, 2: true, 3: true });

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const expandAll = () => {
    const all = {};
    dsaSteps.forEach(s => { all[s.stepId] = true; });
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  // Filtered steps and problems
  const filteredSteps = useMemo(() => {
    if (!dsaSteps) return [];

    return dsaSteps
      .filter(step => selectedStep === 'ALL' || step.stepId === Number(selectedStep))
      .map(step => {
        const filteredTopics = step.topics.map(topic => {
          const filteredProblems = topic.problems.filter(p => {
            // Search query
            if (searchQuery.trim()) {
              const query = searchQuery.toLowerCase();
              const matchTitle = p.title.toLowerCase().includes(query);
              const matchTopic = topic.topicTitle.toLowerCase().includes(query);
              if (!matchTitle && !matchTopic) return false;
            }

            // Difficulty filter
            if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
              return false;
            }

            // Status filter
            if (statusFilter === 'SOLVED' && !p.solved) return false;
            if (statusFilter === 'UNSOLVED' && p.solved) return false;
            if (statusFilter === 'FLAGGED' && !p.flagged) return false;

            return true;
          });

          return {
            ...topic,
            problems: filteredProblems
          };
        }).filter(t => t.problems.length > 0);

        return {
          ...step,
          topics: filteredTopics
        };
      }).filter(step => step.topics.length > 0);
  }, [dsaSteps, selectedStep, selectedDifficulty, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 font-mono">
      <DsaNotesModal />

      {/* Header & Stats Banner */}
      <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Binary className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Striver's A2Z DSA Sheet Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Structured curriculum (16 Steps, 455 problems) • Track solved, revision gotchas, and complexity notes
            </p>
          </div>

          {/* Aggregate Completion Ring */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Total Solved</div>
              <div className="text-lg font-bold text-cyan-400">
                {dsaStats?.totalSolved || 0} <span className="text-xs text-slate-500 font-normal">/ {dsaStats?.totalProblems || 455}</span>
              </div>
            </div>

            <div className="relative w-14 h-14 flex items-center justify-center bg-slate-900 rounded-full border-2 border-cyan-500/30">
              <span className="text-xs font-bold text-cyan-300">
                {dsaStats?.overallPercentage || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs">
          
          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5 flex items-center justify-between">
            <div>
              <span className="text-emerald-400 font-semibold">Easy</span>
              <div className="text-slate-400 text-[11px] mt-0.5">
                {dsaStats?.difficulty?.easy?.solved || 0} / {dsaStats?.difficulty?.easy?.total || 0}
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400">{dsaStats?.difficulty?.easy?.pct || 0}%</span>
          </div>

          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5 flex items-center justify-between">
            <div>
              <span className="text-amber-400 font-semibold">Medium</span>
              <div className="text-slate-400 text-[11px] mt-0.5">
                {dsaStats?.difficulty?.medium?.solved || 0} / {dsaStats?.difficulty?.medium?.total || 0}
              </div>
            </div>
            <span className="text-xs font-bold text-amber-400">{dsaStats?.difficulty?.medium?.pct || 0}%</span>
          </div>

          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5 flex items-center justify-between">
            <div>
              <span className="text-red-400 font-semibold">Hard</span>
              <div className="text-slate-400 text-[11px] mt-0.5">
                {dsaStats?.difficulty?.hard?.solved || 0} / {dsaStats?.difficulty?.hard?.total || 0}
              </div>
            </div>
            <span className="text-xs font-bold text-red-400">{dsaStats?.difficulty?.hard?.pct || 0}%</span>
          </div>

          <div className="bg-[#070a12] border border-slate-800/80 rounded p-2.5 flex items-center justify-between">
            <div>
              <span className="text-purple-400 font-semibold flex items-center space-x-1">
                <Bookmark className="w-3 h-3 text-purple-400" />
                <span>Flagged</span>
              </span>
              <div className="text-slate-400 text-[11px] mt-0.5">
                {dsaStats?.totalFlagged || 0} for revision
              </div>
            </div>
            <span className="text-xs font-bold text-purple-400">Review</span>
          </div>

        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, patterns (e.g. kadane, sliding window)..."
              className="w-full bg-[#050810] border border-slate-700 rounded py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono shadow-inner"
            />
          </div>

          {/* Step Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedStep}
              onChange={(e) => setSelectedStep(e.target.value)}
              className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
            >
              <option value="ALL">All Steps (1 to 16)</option>
              {dsaSteps.map(s => (
                <option key={s.stepId} value={s.stepId}>
                  {s.stepTitle} ({s.completionPercentage}%)
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
            >
              <option value="ALL">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
            >
              <option value="ALL">All Problems ({dsaStats?.totalProblems || 0})</option>
              <option value="SOLVED">Solved ({dsaStats?.totalSolved || 0})</option>
              <option value="UNSOLVED">Unsolved ({((dsaStats?.totalProblems || 0) - (dsaStats?.totalSolved || 0))})</option>
              <option value="FLAGGED">Flagged for Revision ({dsaStats?.totalFlagged || 0})</option>
            </select>
          </div>

        </div>

        {/* Quick controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          <div>
            Showing <span className="text-cyan-400 font-bold">{filteredSteps.reduce((acc, s) => acc + s.topics.reduce((a, t) => a + t.problems.length, 0), 0)}</span> matching problem(s)
          </div>
          <div className="flex space-x-3">
            <button onClick={expandAll} className="text-slate-400 hover:text-cyan-400 cursor-pointer">
              [ Expand All ]
            </button>
            <button onClick={collapseAll} className="text-slate-400 hover:text-cyan-400 cursor-pointer">
              [ Collapse All ]
            </button>
          </div>
        </div>

      </div>

      {/* Step Accordion List */}
      <div className="space-y-4">
        {filteredSteps.length === 0 ? (
          <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-10 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-bold text-slate-200">No problems match your current filters.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting filters or adjusting search keywords.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStep('ALL');
                setSelectedDifficulty('ALL');
                setStatusFilter('ALL');
              }}
              className="mt-3 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs border border-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSteps.map(step => {
            const isExpanded = !!expandedSteps[step.stepId];

            return (
              <div 
                key={step.stepId}
                className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden transition-all shadow-sm"
              >
                
                {/* Step Header */}
                <button
                  onClick={() => toggleStep(step.stepId)}
                  className="w-full bg-[#0f1422] hover:bg-[#141b2e] p-4 flex items-center justify-between text-left transition-colors border-b border-slate-800/80 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>{step.stepTitle}</span>
                        {step.completionPercentage === 100 && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                            MERGED
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{step.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right text-xs">
                      <span className="text-slate-400">{step.stepSolved} / {step.stepTotal} solved</span>
                      <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                        <div 
                          className="bg-cyan-400 h-full rounded-full transition-all"
                          style={{ width: `${step.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-400 w-9 text-right">
                      {step.completionPercentage}%
                    </span>
                  </div>
                </button>

                {/* Topics & Problems List */}
                {isExpanded && (
                  <div className="p-4 space-y-5 bg-[#070a12]">
                    {step.topics.map(topic => (
                      <div key={topic.topicId} className="space-y-2">
                        
                        {/* Topic Sub-header */}
                        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 pb-1 border-b border-slate-800/60">
                          <span className="text-cyan-400 font-bold">{topic.topicId}</span>
                          <span>{topic.topicTitle}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            ({topic.problems.filter(p => p.solved).length}/{topic.problems.length})
                          </span>
                        </div>

                        {/* Problems Table / List */}
                        <div className="space-y-1.5">
                          {topic.problems.map(problem => (
                            <div
                              key={problem.id}
                              className={`p-2.5 rounded border flex flex-wrap items-center justify-between gap-3 transition-colors ${
                                problem.solved
                                  ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-200'
                                  : 'bg-[#0b0f1a] border-slate-800/80 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              
                              {/* Left: Solved Checkbox & Problem Title */}
                              <div className="flex items-center space-x-3 flex-1 min-w-[260px]">
                                
                                <button
                                  onClick={() => handleToggleDsaSolved(problem.id, problem.title)}
                                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                                  title={problem.solved ? 'Mark unsolved' : 'Mark solved'}
                                >
                                  {problem.solved ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                                  )}
                                </button>

                                <div className="overflow-hidden">
                                  <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-mono font-medium ${problem.solved ? 'text-emerald-200' : 'text-slate-200'}`}>
                                      {problem.title}
                                    </span>
                                  </div>

                                  {problem.notes && (
                                    <p className="text-[10px] text-cyan-400/90 truncate max-w-md mt-0.5">
                                      📝 &quot;{problem.notes}&quot;
                                    </p>
                                  )}
                                </div>

                              </div>

                              {/* Right: Difficulty, Notes, Revision Flag & External Link */}
                              <div className="flex items-center space-x-2 text-xs">
                                
                                {/* Difficulty Badge */}
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  problem.difficulty === 'EASY' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                  problem.difficulty === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                  'bg-red-500/10 text-red-400 border border-red-500/30'
                                }`}>
                                  {problem.difficulty}
                                </span>

                                {/* Revision Flag Toggle */}
                                <button
                                  onClick={() => handleToggleDsaFlag(problem.id, problem.title)}
                                  className={`p-1 rounded border transition-colors cursor-pointer ${
                                    problem.flagged
                                      ? 'border-purple-500/60 bg-purple-950/40 text-purple-300'
                                      : 'border-slate-800 text-slate-600 hover:text-slate-400'
                                  }`}
                                  title={problem.flagged ? 'Flagged for revision' : 'Flag for revision'}
                                >
                                  <Bookmark className={`w-3.5 h-3.5 ${problem.flagged ? 'fill-purple-400 text-purple-400' : ''}`} />
                                </button>

                                {/* Notes Button */}
                                <button
                                  onClick={() => setDsaNotesModal({ open: true, problem })}
                                  className={`p-1 rounded border transition-colors cursor-pointer ${
                                    problem.notes
                                      ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300'
                                      : 'border-slate-800 text-slate-600 hover:text-slate-400'
                                  }`}
                                  title={problem.notes ? 'Edit approach notes' : 'Add approach notes'}
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                </button>

                                {/* External Link */}
                                <a
                                  href={problem.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1"
                                  title={`Open on ${problem.platform || 'takeuforward'}`}
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                              </div>

                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
