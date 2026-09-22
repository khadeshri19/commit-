import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Code2, 
  X, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Plus, 
  FileText,
  CheckCircle2
} from 'lucide-react';

export default function AddLeetCodeModal() {
  const { 
    addLeetcodeModal, 
    setAddLeetcodeModal, 
    handleAddCustomLeetcode, 
    handleBatchAddLeetcode 
  } = useApp();

  const [mode, setMode] = useState('single'); // 'single' | 'batch'
  const [weekNumber, setWeekNumber] = useState(addLeetcodeModal.weekNumber || 1);
  
  // Single mode state
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [tags, setTags] = useState('');
  
  // Batch mode state
  const [batchText, setBatchText] = useState('');
  const [batchDifficulty, setBatchDifficulty] = useState('MEDIUM');

  const [submitting, setSubmitting] = useState(false);

  // Sync weekNumber when modal opens
  React.useEffect(() => {
    if (addLeetcodeModal?.weekNumber) {
      setWeekNumber(addLeetcodeModal.weekNumber);
    }
  }, [addLeetcodeModal]);

  if (!addLeetcodeModal?.open) return null;

  // Auto-fill title from LeetCode URL
  const handleUrlChange = (val) => {
    setUrl(val);
    if (!title) {
      const match = val.match(/leetcode\.com\/problems\/([^/?#]+)/i);
      if (match && match[1]) {
        const slug = match[1];
        const formatted = slug.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        setTitle(formatted);
      }
    }
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!url && !title) return;

    setSubmitting(true);
    try {
      const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
      await handleAddCustomLeetcode({
        weekNumber: Number(weekNumber),
        url: url.trim(),
        title: title.trim() || 'Custom LeetCode Challenge',
        number: number ? Number(number) : null,
        difficulty,
        tags: parsedTags.length > 0 ? parsedTags : ['custom-target']
      });
      setAddLeetcodeModal({ open: false, weekNumber: 1 });
      // Reset form
      setUrl('');
      setTitle('');
      setNumber('');
      setTags('');
    } catch (err) {
      console.error('Failed to add custom LeetCode problem:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    const lines = batchText.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    setSubmitting(true);
    try {
      await handleBatchAddLeetcode({
        weekNumber: Number(weekNumber),
        urls: lines,
        defaultDifficulty: batchDifficulty
      });
      setAddLeetcodeModal({ open: false, weekNumber: 1 });
      setBatchText('');
    } catch (err) {
      console.error('Failed to batch add LeetCode problems:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 font-mono">
      <div 
        className="w-full max-w-xl bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Integrate LeetCode Target into Roadmap
            </span>
          </div>
          <button
            onClick={() => setAddLeetcodeModal({ open: false, weekNumber: 1 })}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-[#070b14] px-4 pt-2">
          <button
            type="button"
            onClick={() => setMode('single')}
            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              mode === 'single'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Single Problem Link
          </button>
          <button
            type="button"
            onClick={() => setMode('batch')}
            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              mode === 'batch'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Bulk / Batch Import
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto custom-scrollbar">
          
          {/* Target Week Picker */}
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Target Roadmap Sprint Week
            </label>
            <select
              value={weekNumber}
              onChange={(e) => setWeekNumber(Number(e.target.value))}
              className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
            >
              {[...Array(13)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Week {i + 1 < 10 ? `0${i + 1}` : i + 1} {i + 1 === addLeetcodeModal.weekNumber ? '(Selected Week)' : ''}
                </option>
              ))}
            </select>
          </div>

          {mode === 'single' ? (
            /* Single Problem Form */
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-1">
                  <span>LeetCode Problem URL or Link *</span>
                  <span className="text-[10px] text-cyan-400">Auto-parses title & slug</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="https://leetcode.com/problems/trapping-rain-water/"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono pr-8"
                  />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Problem Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Trapping Rain Water"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    LC Number (optional)
                  </label>
                  <input
                    type="number"
                    placeholder="42"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
                  >
                    <option value="EASY">🟢 Easy</option>
                    <option value="MEDIUM">🟡 Medium</option>
                    <option value="HARD">🔴 Hard</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Topic Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="arrays, two-pointers, stack"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddLeetcodeModal({ open: false, weekNumber: 1 })}
                  className="px-4 py-1.5 rounded text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || (!url && !title)}
                  className="px-4 py-1.5 rounded text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Linking...' : 'Link LeetCode Problem'}</span>
                </button>
              </div>

            </form>
          ) : (
            /* Batch Form */
            <form onSubmit={handleBatchSubmit} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-1">
                  <span>Paste LeetCode URLs or Problem Slugs (1 per line)</span>
                  <span className="text-[10px] text-slate-500">Auto-extracts titles</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder={`https://leetcode.com/problems/lru-cache/\nhttps://leetcode.com/problems/coin-change/\nhttps://leetcode.com/problems/course-schedule/`}
                  value={batchText}
                  onChange={(e) => setBatchText(e.target.value)}
                  className="w-full bg-[#050810] border border-slate-700 rounded p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Default Difficulty for Batch
                </label>
                <select
                  value={batchDifficulty}
                  onChange={(e) => setBatchDifficulty(e.target.value)}
                  className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
                >
                  <option value="MEDIUM">🟡 Medium (Standard Interview Focus)</option>
                  <option value="EASY">🟢 Easy (Foundational Warmup)</option>
                  <option value="HARD">🔴 Hard (Advanced Rounds)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddLeetcodeModal({ open: false, weekNumber: 1 })}
                  className="px-4 py-1.5 rounded text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !batchText.trim()}
                  className="px-4 py-1.5 rounded text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Importing...' : 'Batch Import to Week'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
