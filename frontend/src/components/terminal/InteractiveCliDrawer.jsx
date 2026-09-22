import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export default function InteractiveCliDrawer({ isOpen, onClose }) {
  const { 
    activeBranch, 
    setActiveBranch, 
    commits, 
    overviewData, 
    dsaSteps, 
    roadmapData,
    handleCreateCommit, 
    handleToggleDsaSolved, 
    handleToggleDsaFlag,
    setActiveTab 
  } = useApp();
  const { user } = useAuth();
  const { theme, setTheme, themes, scanlines, setScanlines } = useTheme();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'commit:// CLI engine v1.2 initialized. Type "help" for command catalog.' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete basic commands
      const cmds = ['git status', 'git commit', 'git log', 'dsa solve', 'dsa flag', 'dsa search', 'roadmap status', 'theme matrix', 'theme amber', 'theme cyberpunk', 'scanlines on', 'clear', 'help'];
      const match = cmds.find(c => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  };

  const executeCommand = async (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    // Save to history
    setCommandHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    const newEntries = [{ type: 'input', text: `${user?.username || 'dev'}@commit [${activeBranch}] $ ${raw}` }];

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const subCmd = parts[1]?.toLowerCase();

    try {
      if (cmd === 'clear') {
        setHistory([]);
        return;
      }

      if (cmd === 'help') {
        newEntries.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  git status                  - Display branch, streak, and daily commit health
  git commit -m "<message>"   - Create a new daily commit (optional: -t <tracks> -m <mins> -s <merged|wip|conflict>)
  git log [-n <count>]        - Print formatted commit history log
  dsa list                    - List all 16 Striver A2Z steps
  dsa solve <problem_id>      - Toggle solved state (e.g. dsa solve p3_2_4)
  dsa flag <problem_id>       - Toggle revision flag (e.g. dsa flag p3_2_4)
  dsa search <query>          - Search Striver A2Z problems
  roadmap status              - Show current 90-day phase & sprint completion %
  theme [default|matrix|amber|cyberpunk] - Switch terminal visual palette
  scanlines [on|off]          - Toggle CRT retro scanlines effect
  tab [overview|roadmap|commits|heatmap|dsa|resources|readme] - Switch active view
  whoami                      - Print authenticated user profile
  clear                       - Clear terminal screen`
        });
      } else if (cmd === 'whoami') {
        newEntries.push({
          type: 'output',
          text: `USER: ${user?.username} (${user?.email})\nROLE: ${user?.targetRole || 'Full Stack Engineer'}\nSTREAK: ${overviewData?.streak?.currentStreak || 0} days active\nTOTAL TIME: ${overviewData?.streak?.totalHours || 0} hours logged`
        });
      } else if (cmd === 'git' && subCmd === 'status') {
        const streak = overviewData?.streak || {};
        newEntries.push({
          type: 'output',
          text: `On branch ${activeBranch}\nYour branch is up to date with 'origin/${activeBranch}'.\n\nActive Streak: ${streak.currentStreak || 0} days (Record: ${streak.longestStreak || 0} days)\nTotal Commits: ${streak.totalCommits || 0} logs\nWorking tree clean: All daily study sessions synchronized.`
        });
      } else if (cmd === 'git' && subCmd === 'log') {
        const count = parts[2] === '-n' ? Number(parts[3]) || 5 : 5;
        const logs = commits.slice(0, count).map(c => 
          `commit \x1b[36m${c.commitHash}\x1b[0m (${c.date})\nAuthor: ${user?.username} <${user?.email}>\nTracks: [${c.tracks?.join(', ')}] • Status: ${c.status} • Time: ${c.minutesSpent}m\n\n    ${c.commitMessage}\n`
        ).join('\n');
        newEntries.push({ type: 'output', text: logs || 'No commits recorded yet.' });
      } else if (cmd === 'git' && subCmd === 'commit') {
        const msgMatch = raw.match(/-m\s+"([^"]+)"/) || raw.match(/-m\s+'([^']+)'/);
        const message = msgMatch ? msgMatch[1] : parts.slice(2).join(' ') || 'feat: logged session via CLI';
        
        const trackMatch = raw.match(/-t\s+([^\s]+)/);
        const tracks = trackMatch ? trackMatch[1].toUpperCase().split(',') : ['DSA'];
        
        const timeMatch = raw.match(/-m\s+(\d+)/);
        const mins = timeMatch ? Number(timeMatch[1]) : 90;

        const res = await handleCreateCommit({
          commitMessage: message,
          tracks,
          minutesSpent: mins,
          status: 'MERGED',
          date: new Date().toISOString().split('T')[0]
        });

        newEntries.push({
          type: 'success',
          text: `[${activeBranch} ${res.commit.commitHash}] ${res.commit.commitMessage}\n 1 file changed, ${tracks.length * 2} insertions(+)\n create mode 100644 study_sessions/${res.commit.date}.log`
        });
      } else if (cmd === 'dsa' && subCmd === 'list') {
        const stepsText = dsaSteps.map(s => `  ${s.stepTitle} [${s.stepSolved}/${s.stepTotal} solved - ${s.completionPercentage}%]`).join('\n');
        newEntries.push({ type: 'output', text: `STRIVER'S A2Z DSA SHEET:\n${stepsText}` });
      } else if (cmd === 'dsa' && (subCmd === 'solve' || subCmd === 'flag')) {
        const problemId = parts[2];
        if (!problemId) {
          newEntries.push({ type: 'error', text: `Usage: dsa ${subCmd} <problem_id> (e.g. dsa ${subCmd} p3_2_4)` });
        } else {
          if (subCmd === 'solve') {
            await handleToggleDsaSolved(problemId, problemId);
            newEntries.push({ type: 'success', text: `✓ Updated problem [${problemId}] solved state.` });
          } else {
            await handleToggleDsaFlag(problemId, problemId);
            newEntries.push({ type: 'success', text: `🚩 Updated problem [${problemId}] revision flag.` });
          }
        }
      } else if (cmd === 'dsa' && subCmd === 'search') {
        const query = parts.slice(2).join(' ').toLowerCase();
        const matches = [];
        dsaSteps.forEach(s => s.topics.forEach(t => t.problems.forEach(p => {
          if (p.title.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)) {
            matches.push(`  [${p.id}] ${p.title} (${p.difficulty}) - ${p.solved ? 'SOLVED' : 'UNSOLVED'}`);
          }
        })));
        newEntries.push({ type: 'output', text: matches.length > 0 ? `FOUND ${matches.length} MATCHES:\n${matches.slice(0, 10).join('\n')}` : `No problems matched "${query}"` });
      } else if (cmd === 'roadmap' && subCmd === 'status') {
        newEntries.push({
          type: 'output',
          text: `90-DAY SPRINT STATUS:\nCurrent Phase: ${roadmapData?.stats?.currentPhase}\nCurrent Week: Week ${roadmapData?.currentWeekNumber} of 13\nCompleted Milestones: ${roadmapData?.stats?.completedMilestones} / ${roadmapData?.stats?.totalMilestones} (${roadmapData?.stats?.overallRoadmapPercentage}%)`
        });
      } else if (cmd === 'theme') {
        const targetTheme = parts[1]?.toLowerCase();
        if (themes[targetTheme]) {
          setTheme(targetTheme);
          newEntries.push({ type: 'success', text: `✓ Switched visual theme to: ${themes[targetTheme].name}` });
        } else {
          newEntries.push({ type: 'error', text: `Unknown theme. Available: default, matrix, amber, cyberpunk` });
        }
      } else if (cmd === 'scanlines') {
        const mode = parts[1]?.toLowerCase();
        if (mode === 'on') {
          setScanlines(true);
          newEntries.push({ type: 'success', text: `✓ CRT Scanlines overlay enabled.` });
        } else if (mode === 'off') {
          setScanlines(false);
          newEntries.push({ type: 'success', text: `✓ CRT Scanlines overlay disabled.` });
        } else {
          setScanlines(!scanlines);
          newEntries.push({ type: 'success', text: `✓ CRT Scanlines toggled.` });
        }
      } else if (cmd === 'tab') {
        const tab = parts[1]?.toLowerCase();
        if (['overview', 'roadmap', 'commits', 'heatmap', 'dsa', 'resources', 'readme'].includes(tab)) {
          setActiveTab(tab);
          newEntries.push({ type: 'success', text: `✓ Navigated to ${tab} view.` });
        } else {
          newEntries.push({ type: 'error', text: `Unknown tab. Choose: overview, roadmap, commits, heatmap, dsa, resources, readme` });
        }
      } else {
        newEntries.push({ type: 'error', text: `command not found: "${raw}". Type "help" to see available commands.` });
      }
    } catch (err) {
      newEntries.push({ type: 'error', text: `Error executing command: ${err.message}` });
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInput('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#050810]/95 backdrop-blur-md border-t-2 border-cyan-500/50 shadow-2xl font-mono transition-all duration-200 ${
      isMaximized ? 'h-[75vh]' : 'h-64 sm:h-72'
    }`}>
      
      {/* Title bar */}
      <div className="bg-[#0b101c] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">commit:// interactive CLI shell ($ commit-cli)</span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">[Tab autocomplete • ↑/↓ history]</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
            title={isMaximized ? 'Minimize' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Stream View */}
      <div className="p-4 overflow-y-auto h-[calc(100%-72px)] space-y-1.5 text-xs text-slate-200 select-text">
        {history.map((entry, idx) => (
          <div key={idx} className="leading-relaxed">
            {entry.type === 'input' && (
              <div className="text-cyan-300 font-bold">{entry.text}</div>
            )}
            {entry.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px]">{entry.text}</pre>
            )}
            {entry.type === 'success' && (
              <div className="text-emerald-400 whitespace-pre-wrap">{entry.text}</div>
            )}
            {entry.type === 'error' && (
              <div className="text-red-400">{entry.text}</div>
            )}
            {entry.type === 'system' && (
              <div className="text-slate-500 italic">{entry.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Line */}
      <form onSubmit={handleFormSubmit} className="bg-[#030509] border-t border-slate-800 px-4 py-2 flex items-center space-x-2 text-xs">
        <span className="text-emerald-400 font-bold shrink-0">{user?.username || 'dev'}@commit</span>
        <span className="text-slate-500">[{activeBranch}] $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command (e.g. git status, git commit -m 'message', help)..."
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 font-mono text-xs"
        />
        <span className="terminal-cursor"></span>
      </form>

    </div>
  );
}
