import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  GitCommit, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';

export default function PomodoroTimer() {
  const { setCommitModalOpen, setEditingCommit, notifyGit } = useApp();

  const [selectedDuration, setSelectedDuration] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('DSA');
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setCompletedSessions(prev => prev + 1);
      notifyGit(`⏱️ ${selectedDuration}m Pomodoro Session completed! Auto-filling commit log...`, 'success');
      
      // Auto populate commit logger
      setEditingCommit(null);
      setCommitModalOpen(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedDuration, setCommitModalOpen, setEditingCommit, notifyGit]);

  const handlePresetChange = (mins) => {
    setIsRunning(false);
    setSelectedDuration(mins);
    setTimeLeft(mins * 60);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <div className="bg-[#0b0f1a] border border-amber-500/30 rounded-lg p-5 font-mono space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Terminal Focus Timer (Pomodoro Engine)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Deep work sprint blocks • Completed sessions automatically prompt git commits
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30 font-bold">
            🔥 {completedSessions} Sprints Today
          </span>
        </div>
      </div>

      {/* Timer Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Countdown & Progress Ring */}
        <div className="md:col-span-5 flex flex-col items-center justify-center py-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            
            {/* SVG Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="6"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="6"
                className="text-amber-400 transition-all duration-300"
                strokeDasharray={276}
                strokeDashoffset={276 - (276 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
              <span className="text-2xl font-bold text-white tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold uppercase mt-0.5">
                {isRunning ? 'FOCUS RUNNING' : 'PAUSED'}
              </span>
            </div>

          </div>
        </div>

        {/* Controls & Presets */}
        <div className="md:col-span-7 space-y-4">
          
          {/* Preset Buttons */}
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1.5">
              Select Session Block
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { mins: 25, label: '25m Standard' },
                { mins: 50, label: '50m Deep Work' },
                { mins: 5, label: '5m Short Break' },
                { mins: 15, label: '15m Long Break' }
              ].map(p => (
                <button
                  key={p.mins}
                  onClick={() => handlePresetChange(p.mins)}
                  className={`px-3 py-1.5 rounded text-xs border font-mono transition-colors cursor-pointer ${
                    selectedDuration === p.mins
                      ? 'bg-amber-950/60 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-[#070a12] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Track Selection */}
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1.5">
              Active Focus Track
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['DSA', 'BACKEND', 'CS_FUNDAMENTALS', 'SYSTEM_DESIGN'].map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTrack(t)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                    selectedTrack === t
                      ? 'bg-cyan-950/50 border-cyan-400 text-cyan-300'
                      : 'bg-[#070a12] border-slate-800 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Start / Pause / Commit Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={toggleTimer}
              className={`px-4 py-2 rounded font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-black'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Pause Timer' : 'Start Focus Sprint'}</span>
            </button>

            <button
              onClick={resetTimer}
              className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => {
                setEditingCommit(null);
                setCommitModalOpen(true);
              }}
              className="px-3 py-2 rounded bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center space-x-1 cursor-pointer ml-auto"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Log as Commit</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
