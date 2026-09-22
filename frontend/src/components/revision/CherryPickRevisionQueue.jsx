import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitPullRequest, 
  Bookmark, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  FileText, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CherryPickRevisionQueue() {
  const { dsaSteps, handleToggleDsaSolved, handleToggleDsaFlag, setDsaNotesModal, notifyGit } = useApp();
  const [snoozed, setSnoozed] = useState({});

  // Collect all flagged or spaced repetition problems
  const revisionProblems = [];

  dsaSteps.forEach(step => {
    step.topics.forEach(topic => {
      topic.problems.forEach(p => {
        if (snoozed[p.id]) return;

        if (p.flagged) {
          revisionProblems.push({
            ...p,
            stepTitle: step.stepTitle,
            topicTitle: topic.topicTitle,
            reason: 'Bookmarked for Revision'
          });
        } else if (p.solved) {
          // Include sample spaced repetition set
          if (p.id.endsWith('_1') || p.id.endsWith('_4')) {
            revisionProblems.push({
              ...p,
              stepTitle: step.stepTitle,
              topicTitle: topic.topicTitle,
              reason: 'Spaced Repetition (Interval 3d/7d)'
            });
          }
        }
      });
    });
  });

  const handleSnooze = (problemId, title) => {
    setSnoozed(prev => ({ ...prev, [problemId]: true }));
    notifyGit(`⏳ Snoozed revision for ${title}`, 'info');
  };

  const handleMarkReviewed = async (problemId, title) => {
    await handleToggleDsaFlag(problemId, title);
    setSnoozed(prev => ({ ...prev, [problemId]: true }));
    notifyGit(`✅ Revision cleared for ${title}`, 'success');
  };

  return (
    <div className="bg-[#0b0f1a] border border-purple-500/30 rounded-lg p-5 font-mono space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <GitPullRequest className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Daily Cherry-Pick Queue (Spaced Repetition Engine)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Reinforce high-yield DSA & System Design gotchas before memory decay
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-purple-950/40 text-purple-300 border border-purple-500/40 text-xs font-bold">
          {revisionProblems.length} in Today&apos;s Queue
        </span>
      </div>

      {/* Queue Cards */}
      {revisionProblems.length === 0 ? (
        <div className="p-8 text-center bg-[#070a12] border border-slate-800/80 rounded text-slate-400">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
          <p className="text-xs font-bold text-slate-200">Cherry-Pick Queue is Empty!</p>
          <p className="text-[11px] text-slate-500 mt-1">
            All flagged gotchas and spaced repetition items have been merged. Great job!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {revisionProblems.slice(0, 4).map(p => (
            <div
              key={p.id}
              className="bg-[#070a12] border border-slate-800 hover:border-purple-500/50 rounded-lg p-3.5 space-y-2.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="text-purple-400 font-bold uppercase">{p.reason}</span>
                  <span className={`px-1.5 py-0.2 rounded font-bold ${
                    p.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-950/30' :
                    p.difficulty === 'MEDIUM' ? 'text-amber-400 bg-amber-950/30' : 'text-red-400 bg-red-950/30'
                  }`}>
                    {p.difficulty}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
                  {p.title}
                </h4>

                <p className="text-[10px] text-slate-500 truncate">
                  {p.stepTitle} • {p.topicTitle}
                </p>

                {p.notes && (
                  <p className="text-[10px] text-cyan-400/90 line-clamp-2 bg-[#04060b] border border-slate-800/80 p-1.5 rounded mt-1.5">
                    💡 Gotcha: &quot;{p.notes}&quot;
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 flex items-center space-x-1 text-[11px]"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open</span>
                </a>

                <div className="flex space-x-1.5">
                  <button
                    onClick={() => handleSnooze(p.id, p.title)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] cursor-pointer"
                  >
                    Snooze
                  </button>

                  <button
                    onClick={() => handleMarkReviewed(p.id, p.title)}
                    className="px-2.5 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] cursor-pointer"
                  >
                    ✓ Retained
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
