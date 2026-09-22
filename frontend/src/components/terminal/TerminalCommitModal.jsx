import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Terminal, 
  X, 
  GitCommit, 
  Clock, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Play
} from 'lucide-react';

export default function TerminalCommitModal() {
  const { 
    commitModalOpen, 
    setCommitModalOpen, 
    editingCommit, 
    handleCreateCommit, 
    handleUpdateCommit,
    activeBranch 
  } = useApp();

  const [message, setMessage] = useState('');
  const [tracks, setTracks] = useState(['DSA']);
  const [minutesSpent, setMinutesSpent] = useState(90);
  const [status, setStatus] = useState('MERGED'); // MERGED, WIP, CONFLICT
  const [commitDate, setCommitDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Terminal animation states
  const [committing, setCommitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);

  useEffect(() => {
    if (editingCommit) {
      setMessage(editingCommit.commitMessage || '');
      setTracks(editingCommit.tracks || ['DSA']);
      setMinutesSpent(editingCommit.minutesSpent || 60);
      setStatus(editingCommit.status || 'MERGED');
      setCommitDate(editingCommit.date || new Date().toISOString().split('T')[0]);
    } else {
      setMessage('');
      setTracks(['DSA']);
      setMinutesSpent(90);
      setStatus('MERGED');
      setCommitDate(new Date().toISOString().split('T')[0]);
    }
    setTerminalOutput([]);
    setCommitting(false);
  }, [editingCommit, commitModalOpen]);

  if (!commitModalOpen) return null;

  const trackOptions = [
    { id: 'DSA', label: 'DSA (Striver A2Z)', color: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300' },
    { id: 'BACKEND', label: 'Backend (Spring / Node)', color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' },
    { id: 'CS_FUNDAMENTALS', label: 'CS Fundamentals', color: 'border-amber-500/50 bg-amber-950/40 text-amber-300' },
    { id: 'SYSTEM_DESIGN', label: 'System Design', color: 'border-purple-500/50 bg-purple-950/40 text-purple-300' },
  ];

  const statusOptions = [
    { id: 'MERGED', label: 'MERGED (+done)', desc: 'Topic finished or problem set completed cleanly', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
    { id: 'WIP', label: 'WIP (~partial)', desc: 'Session made progress, ongoing study', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
    { id: 'CONFLICT', label: 'CONFLICT (-blocked)', desc: 'Hit a roadblock or concept that needs re-architecture', color: 'text-red-400 border-red-500/40 bg-red-950/30' },
  ];

  const prefixOptions = ['feat(dsa):', 'feat(backend):', 'refactor:', 'fix(bug):', 'study(cs):', 'design(sys):'];

  const toggleTrack = (t) => {
    if (tracks.includes(t)) {
      if (tracks.length > 1) {
        setTracks(tracks.filter(item => item !== t));
      }
    } else {
      setTracks([...tracks, t]);
    }
  };

  const handleCommitSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || committing) return;

    setCommitting(true);
    const mockHash = Math.random().toString(16).substring(2, 9);
    
    // Simulate terminal typing and understated git CLI output
    setTerminalOutput([
      `$ git add -A`,
      `$ git commit -m "${message}" --tracks ${tracks.join(',').toLowerCase()} --time ${minutesSpent}m`,
      `[${activeBranch} ${mockHash}] ${message}`,
      ` 1 file changed, ${tracks.length * 3} insertions(+)`,
      ` create mode 100644 study_sessions/${commitDate}.log`,
      `✓ commit recorded to master branch.`
    ]);

    try {
      if (editingCommit) {
        await handleUpdateCommit(editingCommit.id, {
          commitMessage: message.trim(),
          tracks,
          minutesSpent: Number(minutesSpent),
          status,
          date: commitDate
        });
      } else {
        await handleCreateCommit({
          commitMessage: message.trim(),
          tracks,
          minutesSpent: Number(minutesSpent),
          status,
          date: commitDate
        });
      }

      setTimeout(() => {
        setCommitting(false);
        setCommitModalOpen(false);
      }, 950);
    } catch (err) {
      setTerminalOutput(prev => [...prev, `fatal: ${err.message || 'error saving commit'}`]);
      setCommitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-mono">
        
        {/* Terminal Window Title Bar */}
        <div className="bg-[#0f1422] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-slate-400 text-xs ml-2 font-semibold">
              terminal — git commit -m
            </span>
          </div>

          <button
            onClick={() => setCommitModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCommitSubmit} className="p-5 space-y-5 text-xs text-slate-300">
          
          {/* Live CLI Command Preview with Blinking Cursor */}
          <div className="bg-[#04060a] border border-slate-800/90 rounded p-3 text-slate-300 font-mono text-[12px] leading-relaxed shadow-inner">
            <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Interactive CLI Preview</div>
            <div className="text-cyan-400">
              <span className="text-emerald-400 font-bold">{activeBranch}</span>
              <span className="text-slate-500"> $ </span>
              <span>git commit -m &quot;</span>
              <span className="text-amber-200">{message || 'what did you learn today?'}</span>
              <span>&quot;</span>
              <span className="terminal-cursor"></span>
            </div>
          </div>

          {/* 1. Commit Message */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-semibold flex items-center space-x-1.5">
                <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                <span>Commit Message (Session Log)</span>
              </label>
              <span className="text-[10px] text-slate-500">Plain text / Markdown</span>
            </div>

            {/* Quick prefix chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {prefixOptions.map(p => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setMessage(prev => prev.startsWith(p) ? prev : `${p} ${prev}`)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. feat(dsa): solved 4 sliding window medium problems + reviewed kadane's algo edge cases"
              className="w-full bg-[#050810] border border-slate-700 rounded p-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono text-xs shadow-inner"
              required
            />
          </div>

          {/* 2. Track Multi-Select */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Tracks Touched (Multi-Select)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {trackOptions.map(t => {
                const isSelected = tracks.includes(t.id);
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => toggleTrack(t.id)}
                    className={`p-2 rounded border text-left text-[11px] font-mono transition-all cursor-pointer ${
                      isSelected 
                        ? `${t.color} font-bold shadow-md` 
                        : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{t.id}</span>
                      <span className="text-[10px]">{isSelected ? '✓' : '+'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Time Spent & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Time Spent */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 font-semibold flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Time Spent: <span className="text-cyan-400 font-bold">{minutesSpent} mins</span> ({(minutesSpent/60).toFixed(1)}h)</span>
                </label>
              </div>

              <div className="flex gap-1.5 mb-2">
                {[30, 60, 90, 120, 180].map(m => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMinutesSpent(m)}
                    className={`flex-1 py-1 rounded text-[10px] border font-mono transition-colors cursor-pointer ${
                      minutesSpent === m
                        ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="15"
                max="360"
                step="15"
                value={minutesSpent}
                onChange={(e) => setMinutesSpent(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded h-1.5 cursor-pointer"
              />
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-slate-300 font-semibold mb-1.5 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Commit Date</span>
              </label>
              <input
                type="date"
                value={commitDate}
                onChange={(e) => setCommitDate(e.target.value)}
                className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs shadow-inner"
              />
            </div>

          </div>

          {/* 4. Commit Status */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">
              Commit Status
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {statusOptions.map(s => {
                const isSelected = status === s.id;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setStatus(s.id)}
                    className={`p-2.5 rounded border text-left transition-all cursor-pointer ${
                      isSelected
                        ? `${s.color} font-bold shadow-md`
                        : 'border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[11px] font-mono">{s.label}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulated Terminal Output during commit */}
          {terminalOutput.length > 0 && (
            <div className="bg-[#030509] border border-slate-800 rounded p-3 text-[11px] text-slate-400 space-y-1 font-mono">
              {terminalOutput.map((line, idx) => (
                <div 
                  key={idx} 
                  className={
                    line.startsWith('✓') ? 'text-emerald-400 font-bold' :
                    line.startsWith('fatal') ? 'text-red-400 font-bold' :
                    line.startsWith('$') ? 'text-cyan-400' : 'text-slate-300'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <span className="text-[10px] text-slate-500">
              Press [Ctrl+Enter] to commit
            </span>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setCommitModalOpen(false)}
                className="px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
              >
                Abort
              </button>

              <button
                type="submit"
                disabled={committing || !message.trim()}
                className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold border border-emerald-400/30 flex items-center space-x-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>{committing ? 'Writing to branch...' : editingCommit ? 'git commit --amend' : 'git commit'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
