import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCode, X, Save, CheckCircle2, Bookmark } from 'lucide-react';

export default function DsaNotesModal() {
  const { dsaNotesModal, setDsaNotesModal, handleSaveDsaNotes } = useApp();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (dsaNotesModal.open && dsaNotesModal.problem) {
      setNotes(dsaNotesModal.problem.notes || '');
    }
  }, [dsaNotesModal]);

  if (!dsaNotesModal.open || !dsaNotesModal.problem) return null;

  const problem = dsaNotesModal.problem;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await handleSaveDsaNotes(problem.id, notes);
    setSaving(false);
    setDsaNotesModal({ open: false, problem: null });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-mono">
        
        {/* Header */}
        <div className="bg-[#0f1422] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Approach Notes & Gotchas
            </h3>
          </div>
          <button
            onClick={() => setDsaNotesModal({ open: false, problem: null })}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
          
          <div className="bg-[#050810] border border-slate-800 rounded p-3 text-slate-300">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Target Problem</div>
            <p className="text-white font-bold text-sm mt-0.5">{problem.title}</p>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
              <span>Platform: <strong className="text-cyan-400">{problem.platform}</strong></span>
              <span>•</span>
              <span>Difficulty: <strong className={
                problem.difficulty === 'EASY' ? 'text-emerald-400' :
                problem.difficulty === 'MEDIUM' ? 'text-amber-400' : 'text-red-400'
              }>{problem.difficulty}</strong></span>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold mb-1.5 block">
              Intuition, Time/Space Complexity & Gotchas:
            </label>
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Edge case when array has 1 element. Use two pointers with left and right. Time: O(N), Space: O(1)..."
              className="w-full bg-[#04060a] border border-slate-700 rounded p-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-xs shadow-inner"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-[10px] text-slate-500">
              Notes are persisted securely per user account
            </span>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setDsaNotesModal({ open: false, problem: null })}
                className="px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold border border-cyan-400/40 flex items-center space-x-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Notes'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
