import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Terminal, Shield, KeyRound, User, Mail, ArrowRight, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { login, signup, loginAsDemo, authError } = useAuth();
  
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        if (!username.trim()) throw new Error('Username is required for developer handle.');
        await signup(email, username, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginAsDemo();
    } catch (err) {
      setError(err.message || 'Demo authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] flex items-center justify-center p-4 font-mono">
      <div className="bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Terminal Header */}
        <div className="bg-[#0f1422] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-slate-400 text-xs ml-2 font-semibold">
              auth — ssh session
            </span>
          </div>

          <span className="text-[10px] text-cyan-400 font-mono">
            commit:// v1.0
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          
          {/* Logo & Headline */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 mb-2">
              <Terminal className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              commit:// dev-upgrade-tracker
            </h1>
            <p className="text-[11px] text-slate-400">
              Treat your own engineering skill growth like a codebase.
            </p>
          </div>

          {/* Quick Demo Access CTA Button */}
          <div className="bg-[#04060b] border border-slate-800 rounded p-3 text-center space-y-2">
            <div className="text-[10px] text-slate-400">
              Instant Exploration (Pre-seeded with 14-day streak & telemetry)
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2 px-3 rounded bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Explore Demo Account (demo@commit.dev)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-slate-600">
            <div className="h-[1px] bg-slate-800 flex-1"></div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Or Authenticate Below</span>
            <div className="h-[1px] bg-slate-800 flex-1"></div>
          </div>

          {/* Error display */}
          {(error || authError) && (
            <div className="p-3 rounded bg-red-950/30 border border-red-500/40 text-red-400 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error || authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {isSignup && (
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Developer Handle / Username</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. octodev"
                    className="w-full bg-[#050810] border border-slate-700 rounded py-2 pl-9 pr-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono shadow-inner text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@domain.com"
                  className="w-full bg-[#050810] border border-slate-700 rounded py-2 pl-9 pr-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono shadow-inner text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050810] border border-slate-700 rounded py-2 pl-9 pr-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono shadow-inner text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : isSignup ? 'Sign Up & Create Repository' : 'Sign In (git ssh)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </form>

          {/* Switch signup/login */}
          <div className="text-center pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-cyan-400 hover:underline font-bold ml-1 cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New developer?{' '}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-cyan-400 hover:underline font-bold ml-1 cursor-pointer"
                >
                  Create an isolated account
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
