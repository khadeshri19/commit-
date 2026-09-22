import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Terminal, CheckCircle2, AlertTriangle, Info, Shield, Radio } from 'lucide-react';

export default function Footer() {
  const { gitToast, activeBranch } = useApp();
  const { user } = useAuth();

  return (
    <>
      {/* Floating Understated Git CLI Toast */}
      {gitToast && (
        <div className="fixed bottom-12 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#0b101c] border border-slate-700/90 rounded-md shadow-2xl p-3 max-w-md font-mono text-xs text-slate-200 flex items-start space-x-2.5">
            {gitToast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />}
            {gitToast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
            {gitToast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />}
            
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                git telemetry stream
              </div>
              <p className="text-slate-200 font-mono text-xs break-all mt-0.5">
                {gitToast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Terminal Status Bar */}
      <footer className="border-t border-slate-800/80 bg-[#060911] px-4 py-2 text-[11px] font-mono text-slate-500 sticky bottom-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>git status: clean</span>
            </span>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <span className="text-slate-400 hidden sm:inline-flex items-center space-x-1">
              <Radio className="w-3 h-3 text-cyan-400" />
              <span>HEAD detached at origin/{activeBranch}</span>
            </span>

            <span className="text-slate-700 hidden md:inline">|</span>

            <span className="text-slate-400 hidden md:inline">
              user: <span className="text-slate-300 font-bold">{user?.username || 'anonymous'}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-500">
            <span>commit:// v1.0</span>
            <span className="text-slate-700">|</span>
            <span className="text-cyan-500/80">API: 200 OK</span>
          </div>

        </div>
      </footer>
    </>
  );
}
