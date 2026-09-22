import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  X, 
  Check, 
  Code2, 
  Target, 
  Layers, 
  Sparkles,
  Server,
  Cpu,
  BrainCircuit
} from 'lucide-react';

export default function RoadmapPreferenceModal() {
  const { 
    preferenceModalOpen, 
    setPreferenceModalOpen, 
    roadmapData, 
    handleUpdatePreferences 
  } = useApp();

  const currentPrefs = roadmapData?.preferences || {
    trackFocus: 'BALANCED',
    difficultyPreference: 'ALL',
    presetList: 'STRIVER_A2Z',
    weeklyTarget: 10
  };

  const [trackFocus, setTrackFocus] = useState('BALANCED');
  const [difficultyPreference, setDifficultyPreference] = useState('ALL');
  const [presetList, setPresetList] = useState('STRIVER_A2Z');
  const [weeklyTarget, setWeeklyTarget] = useState(10);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentPrefs) {
      setTrackFocus(currentPrefs.trackFocus || 'BALANCED');
      setDifficultyPreference(currentPrefs.difficultyPreference || 'ALL');
      setPresetList(currentPrefs.presetList || 'STRIVER_A2Z');
      setWeeklyTarget(currentPrefs.weeklyTarget || 10);
    }
  }, [currentPrefs, preferenceModalOpen]);

  if (!preferenceModalOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await handleUpdatePreferences({
        trackFocus,
        difficultyPreference,
        presetList,
        weeklyTarget: Number(weeklyTarget)
      });
      setPreferenceModalOpen(false);
    } catch (err) {
      console.error('Failed to update preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  const TRACK_PRESETS = [
    {
      id: 'BALANCED',
      name: 'Balanced Full-Stack & Systems',
      desc: 'Uniform pacing across DSA, Spring Boot/Node, CS Fundamentals & System Design.',
      icon: Layers,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20'
    },
    {
      id: 'DSA_INTENSIVE',
      name: 'DSA & LeetCode Sprint',
      desc: 'Heavy focus on Striver A2Z, daily LeetCode rounds, and pattern mastery.',
      icon: Code2,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20'
    },
    {
      id: 'BACKEND',
      name: 'Spring Boot & Backend Specialist',
      desc: 'In-depth focus on REST, JPA transactions, Redis caching, and Kafka events.',
      icon: Server,
      color: 'text-purple-400 border-purple-500/40 bg-purple-950/20'
    },
    {
      id: 'SYSTEM_DESIGN',
      name: 'System Design & FAANG Prep',
      desc: 'High-Level & Low-Level Design, microservices, concurrency, and architecture.',
      icon: BrainCircuit,
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/20'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 font-mono">
      <div 
        className="w-full max-w-2xl bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Roadmap & LeetCode Preference Matrix
            </span>
          </div>
          <button
            onClick={() => setPreferenceModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* 1. Track Focus Presets */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Primary Upgrade Focus</span>
              </span>
              <span className="text-[10px] text-slate-500">Adapts roadmap milestones</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRACK_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = trackFocus === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setTrackFocus(preset.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? `${preset.color} ring-1 ring-cyan-500/50 shadow-md` 
                        : 'bg-[#050810] border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {preset.name}
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {preset.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. LeetCode Difficulty Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>LeetCode Difficulty Distribution</span>
              </span>
              <span className="text-[10px] text-slate-500">Roadmap Problem Filter</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'ALL', label: 'All Levels', sub: 'Easy, Med & Hard' },
                { id: 'EASY_MEDIUM', label: 'Easy + Medium', sub: 'High Frequency' },
                { id: 'MEDIUM_HARD', label: 'Medium + Hard', sub: 'FAANG Rounds' },
                { id: 'HARD', label: 'Hard Only', sub: 'Advanced Challenger' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDifficultyPreference(opt.id)}
                  className={`p-2.5 rounded border text-left transition-all cursor-pointer ${
                    difficultyPreference === opt.id
                      ? 'bg-cyan-950/30 border-cyan-400/60 text-cyan-300'
                      : 'bg-[#050810] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{opt.label}</div>
                  <div className="text-[9px] text-slate-500">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Curated Problem List Mode & Weekly Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            
            {/* Curated List Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Curated Problem Preset
              </label>
              <select
                value={presetList}
                onChange={(e) => setPresetList(e.target.value)}
                className="w-full bg-[#050810] border border-slate-700 rounded px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="STRIVER_A2Z">Striver A2Z Sheet (272 Problems)</option>
                <option value="BLIND_75">Blind 75 Essential Set</option>
                <option value="NEETCODE_150">NeetCode 150 Topic Roadmap</option>
                <option value="CUSTOM">Custom User Links & Practice</option>
              </select>
              <p className="text-[10px] text-slate-500">
                Synchronized with the active 13-week curriculum.
              </p>
            </div>

            {/* Weekly Target */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Target Problems / Week</span>
                <span className="text-cyan-400 font-bold">{weeklyTarget} problems</span>
              </label>
              <input
                type="range"
                min="3"
                max="25"
                step="1"
                value={weeklyTarget}
                onChange={(e) => setWeeklyTarget(e.target.value)}
                className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Casual (3/wk)</span>
                <span>Paced (10/wk)</span>
                <span>Hardcore (25/wk)</span>
              </div>
            </div>

          </div>

          {/* Prompt Preview */}
          <div className="p-3 rounded bg-[#050810] border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-300 font-bold">Live Configuration:</span> Target focus is set to{' '}
              <span className="text-cyan-300 font-bold">{trackFocus}</span> with{' '}
              <span className="text-emerald-300 font-bold">{difficultyPreference}</span> LeetCode difficulty filter and{' '}
              <span className="text-amber-300 font-bold">{weeklyTarget} problems/week</span> pace.
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setPreferenceModalOpen(false)}
              className="px-4 py-1.5 rounded text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 rounded text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              {saving ? 'Applying...' : 'Apply Preferences'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
