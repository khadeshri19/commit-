import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GitBranch, GitMerge, CheckCircle2, Circle, Sparkles, Layers } from 'lucide-react';

export default function GitBranchGraph() {
  const { roadmapData, setActiveBranch } = useApp();
  const [hoveredNode, setHoveredNode] = useState(null);

  const phases = roadmapData?.phases || [];
  const currentWeek = roadmapData?.currentWeekNumber || 1;

  return (
    <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5 font-mono space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <GitMerge className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Interactive Git Branch Topology & Merge Graph
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live visual network of your 90-day sprint branches and milestone merges
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
          Target: main (Production Ready)
        </span>
      </div>

      {/* SVG Interactive Branch Graph */}
      <div className="overflow-x-auto py-2">
        <div className="min-w-[700px] bg-[#050810] border border-slate-800/80 rounded-lg p-4 relative">
          
          <div className="space-y-6">
            {phases.map((phase, pIdx) => {
              const isCurrentPhase = phase.weeks.some(w => w.weekNumber === currentWeek);

              return (
                <div key={phase.phaseId} className="relative flex items-center space-x-4">
                  
                  {/* Left: Branch Tag */}
                  <div className="w-48 shrink-0">
                    <button
                      onClick={() => setActiveBranch(phase.branchName)}
                      className={`text-left p-2 rounded border w-full transition-all cursor-pointer ${
                        isCurrentPhase 
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300 shadow-md'
                          : 'bg-[#080d1a] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500">{phase.phaseNumber}</span>
                        <span className="text-[9px] font-bold text-emerald-400">{phase.completionPercentage}%</span>
                      </div>
                      <div className="text-xs font-bold text-slate-200 truncate mt-0.5">{phase.branchName}</div>
                    </button>
                  </div>

                  {/* Middle: Week Nodes on Git Branch Track */}
                  <div className="flex-1 flex items-center space-x-3 relative">
                    
                    {/* Connecting Branch Line */}
                    <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full z-0">
                      <div 
                        className="h-full bg-cyan-500 rounded-full transition-all"
                        style={{ width: `${phase.completionPercentage}%` }}
                      />
                    </div>

                    {/* Nodes for Weeks */}
                    {phase.weeks.map(week => {
                      const isPast = week.weekNumber < currentWeek;
                      const isNow = week.weekNumber === currentWeek;
                      const isComplete = week.completionPercentage === 100;

                      return (
                        <div
                          key={week.weekNumber}
                          onMouseEnter={() => setHoveredNode(week)}
                          onMouseLeave={() => setHoveredNode(null)}
                          className="relative z-10"
                        >
                          <div
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold transition-transform cursor-pointer hover:scale-125 ${
                              isComplete ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950/60' :
                              isNow ? 'bg-cyan-950 border-cyan-400 text-cyan-200 ring-4 ring-cyan-500/20 animate-pulse' :
                              isPast ? 'bg-slate-900 border-slate-700 text-slate-400' :
                              'bg-[#060912] border-slate-800 text-slate-600'
                            }`}
                          >
                            W{week.weekNumber}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Hovered Node Tooltip Preview */}
      {hoveredNode ? (
        <div className="bg-[#050810] border border-cyan-500/40 rounded p-3 text-xs text-slate-200 flex items-center justify-between">
          <div>
            <span className="font-bold text-cyan-400">Week {hoveredNode.weekNumber}:</span> {hoveredNode.title}
            <div className="text-[11px] text-slate-400 mt-0.5">{hoveredNode.goal}</div>
          </div>
          <div className="text-right shrink-0 ml-4 font-bold text-emerald-400">
            {hoveredNode.weekCompleted}/{hoveredNode.weekTotal} milestones ({hoveredNode.completionPercentage}%)
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-slate-500 text-center">
          Hover over any week node to inspect objectives • Click branch badges to switch active tracking branch
        </div>
      )}

    </div>
  );
}
