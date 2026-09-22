import React from 'react';
import { useApp } from '../../context/AppContext';
import { GitCommit, X, Clock, Calendar, Layers, CheckCircle2, AlertTriangle, AlertCircle, Trash2, Edit3 } from 'lucide-react';

export default function CommitDetailModal({ commit, onClose }) {
  const { setEditingCommit, setCommitModalOpen, handleDeleteCommit } = useApp();

  if (!commit) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-mono">
        
        {/* Title Bar */}
        <div className="bg-[#0f1422] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitCommit className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              commit {commit.commitHash}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Commit Message Box */}
          <div className="bg-[#04060a] border border-slate-800 rounded p-3.5 text-slate-200 leading-relaxed shadow-inner">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Commit Message</div>
            <p className="text-sm font-mono text-cyan-200">{commit.commitMessage}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#0b0f1a] border border-slate-800 rounded p-3">
              <span className="text-[10px] text-slate-500 uppercase block">Date Logged</span>
              <div className="flex items-center space-x-1.5 text-slate-200 mt-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{commit.date}</span>
              </div>
            </div>

            <div className="bg-[#0b0f1a] border border-slate-800 rounded p-3">
              <span className="text-[10px] text-slate-500 uppercase block">Time Invested</span>
              <div className="flex items-center space-x-1.5 text-slate-200 mt-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{commit.minutesSpent} mins ({(commit.minutesSpent/60).toFixed(1)}h)</span>
              </div>
            </div>
          </div>

          {/* Status & Tracks */}
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block mb-1">Execution Status</span>
              <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-bold border ${
                commit.status === 'MERGED' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40' :
                commit.status === 'WIP' ? 'bg-amber-950/40 text-amber-400 border-amber-500/40' :
                'bg-red-950/40 text-red-400 border-red-500/40'
              }`}>
                {commit.status === 'MERGED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {commit.status === 'WIP' && <AlertTriangle className="w-3.5 h-3.5" />}
                {commit.status === 'CONFLICT' && <AlertCircle className="w-3.5 h-3.5" />}
                <span>{commit.status}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block mb-1">Tracks Touched</span>
              <div className="flex flex-wrap gap-1.5">
                {commit.tracks?.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Simulated Diff Line Output */}
          <div className="bg-[#030509] border border-slate-800 rounded p-2.5 text-[11px] text-slate-400 font-mono space-y-0.5">
            <div className="text-slate-500">commit {commit.commitHash}</div>
            <div className="text-slate-500">Author: dev &lt;developer@commit.dev&gt;</div>
            <div className="text-slate-500">Date:   {commit.date}</div>
            <div className="diff-line-add px-2 py-0.5 mt-1 rounded-sm text-emerald-400">
              + [{commit.tracks?.join(', ')}] {commit.commitMessage} ({commit.minutesSpent}m)
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to revert this commit from history?')) {
                  handleDeleteCommit(commit.id);
                  onClose();
                }
              }}
              className="text-red-400 hover:text-red-300 flex items-center space-x-1 text-xs hover:underline cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>git revert</span>
            </button>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onClose();
                  setEditingCommit(commit);
                  setCommitModalOpen(true);
                }}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center space-x-1.5 border border-slate-700 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Amend Commit</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
