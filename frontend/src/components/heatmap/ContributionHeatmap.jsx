import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Clock, Calendar, Layers, Info, Filter, Sparkles } from 'lucide-react';

export default function ContributionHeatmap({ onSelectDate }) {
  const { heatmapData, overviewData, setActiveTab, setCommitModalOpen } = useApp();
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = heatmapData?.days || [];
  const streak = overviewData?.streak || {};
  const trackMinutes = streak.trackMinutes || { DSA: 0, BACKEND: 0, CS_FUNDAMENTALS: 0, SYSTEM_DESIGN: 0 };
  const totalMins = Object.values(trackMinutes).reduce((a, b) => a + b, 0) || 1;

  // Day names for 7 rows
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Organize days into 52 columns of 7 days
  const weeks = [];
  let currentWeek = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate cell color style based on 4-track overlay
  const getDayStyle = (day) => {
    if (!day || day.count === 0) {
      return 'bg-[#0f1422] border-slate-800/80 hover:border-slate-600';
    }

    const { tracks } = day;
    const activeTracks = Object.keys(tracks).filter(t => tracks[t] > 0);

    // If multiple tracks touched on the same day, provide a multi-color gradient border
    if (activeTracks.length > 1) {
      return 'bg-slate-800 border-cyan-400/80 shadow-sm shadow-cyan-950/50';
    }

    // Single track
    if (tracks.DSA > 0) return 'bg-cyan-600/60 border-cyan-400 shadow-sm';
    if (tracks.BACKEND > 0) return 'bg-emerald-600/60 border-emerald-400 shadow-sm';
    if (tracks.CS_FUNDAMENTALS > 0) return 'bg-amber-600/60 border-amber-400 shadow-sm';
    if (tracks.SYSTEM_DESIGN > 0) return 'bg-purple-600/60 border-purple-400 shadow-sm';

    return 'bg-emerald-700 border-emerald-500';
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    if (onSelectDate) {
      onSelectDate(day.date);
    }
  };

  return (
    <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5 font-mono">
      
      {/* Header & Streak Counters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Telemetry Heatmap (4-Track Overlaid Activity)
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            52-week telemetry log • Multi-track color overlays reveal neglected branches
          </p>
        </div>

        {/* Quick Streak Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Current: <strong>{streak.currentStreak || 0}d</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            <span>Max Streak: <strong>{streak.longestStreak || 0}d</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Total: <strong>{streak.totalHours || 0} hrs</strong></span>
          </div>
        </div>
      </div>

      {/* Track Balance Distribution Bars */}
      <div className="mb-5 bg-[#070a12] border border-slate-800/80 rounded p-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span className="font-semibold text-slate-300">Track Balance & Velocity Distribution</span>
          <span>{streak.totalCommits || 0} total commits logged</span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
          <div 
            style={{ width: `${(trackMinutes.DSA / totalMins) * 100}%` }} 
            className="bg-cyan-500 hover:opacity-90 transition-all" 
            title={`DSA: ${(trackMinutes.DSA/60).toFixed(1)}h`}
          />
          <div 
            style={{ width: `${(trackMinutes.BACKEND / totalMins) * 100}%` }} 
            className="bg-emerald-500 hover:opacity-90 transition-all" 
            title={`Backend: ${(trackMinutes.BACKEND/60).toFixed(1)}h`}
          />
          <div 
            style={{ width: `${(trackMinutes.CS_FUNDAMENTALS / totalMins) * 100}%` }} 
            className="bg-amber-500 hover:opacity-90 transition-all" 
            title={`CS Fundamentals: ${(trackMinutes.CS_FUNDAMENTALS/60).toFixed(1)}h`}
          />
          <div 
            style={{ width: `${(trackMinutes.SYSTEM_DESIGN / totalMins) * 100}%` }} 
            className="bg-purple-500 hover:opacity-90 transition-all" 
            title={`System Design: ${(trackMinutes.SYSTEM_DESIGN/60).toFixed(1)}h`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px]">
          <div className="flex items-center space-x-1.5 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>
            <span>DSA ({(trackMinutes.DSA/60).toFixed(1)}h • {Math.round((trackMinutes.DSA/totalMins)*100)}%)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
            <span>Backend ({(trackMinutes.BACKEND/60).toFixed(1)}h • {Math.round((trackMinutes.BACKEND/totalMins)*100)}%)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
            <span>CS Fundamentals ({(trackMinutes.CS_FUNDAMENTALS/60).toFixed(1)}h • {Math.round((trackMinutes.CS_FUNDAMENTALS/totalMins)*100)}%)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-purple-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500"></span>
            <span>System Design ({(trackMinutes.SYSTEM_DESIGN/60).toFixed(1)}h • {Math.round((trackMinutes.SYSTEM_DESIGN/totalMins)*100)}%)</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          
          <div className="flex space-x-1">
            
            {/* Day name labels (left column) */}
            <div className="flex flex-col justify-between text-[9px] text-slate-500 pr-2 py-0.5 select-none">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* 52 Week Columns */}
            <div className="flex space-x-1">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col space-y-1">
                  {week.map((day, dIndex) => {
                    const isHovered = hoveredDay?.date === day.date;
                    const isSelected = selectedDay?.date === day.date;
                    const { tracks } = day;

                    return (
                      <button
                        key={dIndex}
                        onClick={() => handleDayClick(day)}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3 h-3 rounded-[2px] border transition-all cursor-pointer relative ${getDayStyle(day)} ${
                          isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-black' : ''
                        } ${isHovered ? 'scale-125 z-10' : ''}`}
                        title={`${day.date}: ${day.count} commits, ${day.minutes} mins`}
                      >
                        {/* Multi-track tiny dots overlay if multiple tracks */}
                        {day.count > 0 && Object.keys(tracks).filter(t => tracks[t] > 0).length > 1 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-cyan-300"></span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Interactive Tooltip / Selected Day Drill-down */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        
        {hoveredDay ? (
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="font-bold text-cyan-400">{hoveredDay.date}</span>
            <span>•</span>
            <span>
              {hoveredDay.count === 0 ? 'No commits recorded' : `${hoveredDay.count} commit(s) • ${hoveredDay.minutes} mins logged`}
            </span>
            {hoveredDay.commits?.length > 0 && (
              <span className="text-slate-400 truncate max-w-md hidden sm:inline">
                ({hoveredDay.commits.map(c => c.message).join(' | ')})
              </span>
            )}
          </div>
        ) : selectedDay ? (
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="font-bold text-emerald-400">Selected: {selectedDay.date}</span>
            <span>•</span>
            <span>{selectedDay.count} session(s)</span>
            <button
              onClick={() => {
                setActiveTab('commits');
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              View in Commits Tab →
            </button>
          </div>
        ) : (
          <div className="text-slate-500">
            Hover over any square for telemetry details, click to inspect past logs.
          </div>
        )}

        <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0f1422] border border-slate-800"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900 border border-emerald-700"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700 border border-emerald-500"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 border border-emerald-400"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-500 border border-cyan-300"></span>
          <span>More</span>
        </div>

      </div>

    </div>
  );
}
