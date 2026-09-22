import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tv, 
  Play, 
  CheckCircle2, 
  Clock, 
  Circle, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import YouTubeModal from './YouTubeModal';
import { api } from '../../services/api';

export default function ResourceHubView() {
  const { 
    resourcesData, 
    setYoutubeModal, 
    handleUpdateResourceStatus, 
    fetchResources,
    notifyGit 
  } = useApp();

  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedPhase, setSelectedPhase] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom resource modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [customForm, setCustomForm] = useState({
    title: '',
    channel: '',
    embedUrl: '',
    track: 'BACKEND',
    phaseTag: 'Phase 1 - Foundations',
    description: ''
  });

  const resources = resourcesData?.resources || [];
  const stats = resourcesData?.stats || {};

  const filteredResources = resources.filter(r => {
    if (selectedTrack !== 'ALL' && r.track !== selectedTrack) return false;
    if (selectedPhase !== 'ALL' && !r.phaseTag.includes(selectedPhase)) return false;
    if (selectedStatus !== 'ALL' && r.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchChannel = r.channel.toLowerCase().includes(q);
      if (!matchTitle && !matchChannel) return false;
    }
    return true;
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addResource(customForm);
      notifyGit(`Added resource: ${customForm.title}`, 'success');
      setAddModalOpen(false);
      setCustomForm({
        title: '',
        channel: '',
        embedUrl: '',
        track: 'BACKEND',
        phaseTag: 'Phase 1 - Foundations',
        description: ''
      });
      fetchResources();
    } catch (err) {
      alert(err.message || 'Failed to add custom resource');
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <YouTubeModal />

      {/* Add Custom Resource Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090d16] border border-slate-700 rounded-lg shadow-2xl max-w-lg w-full p-5 text-xs font-mono space-y-4">
            <h3 className="text-sm font-bold text-white uppercase">Add Curated Video / Playlist</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-slate-300 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={customForm.title}
                  onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                  placeholder="e.g. Spring Boot 3 Security Deep Dive"
                  className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Channel Name</label>
                <input
                  type="text"
                  value={customForm.channel}
                  onChange={(e) => setCustomForm({ ...customForm, channel: e.target.value })}
                  placeholder="e.g. Amigoscode / FreeCodeCamp"
                  className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">YouTube URL or Embed URL</label>
                <input
                  type="url"
                  required
                  value={customForm.embedUrl}
                  onChange={(e) => setCustomForm({ ...customForm, embedUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or playlist"
                  className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">Track</label>
                  <select
                    value={customForm.track}
                    onChange={(e) => setCustomForm({ ...customForm, track: e.target.value })}
                    className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200"
                  >
                    <option value="DSA">DSA</option>
                    <option value="BACKEND">Backend</option>
                    <option value="CS_FUNDAMENTALS">CS Fundamentals</option>
                    <option value="SYSTEM_DESIGN">System Design</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Phase</label>
                  <select
                    value={customForm.phaseTag}
                    onChange={(e) => setCustomForm({ ...customForm, phaseTag: e.target.value })}
                    className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200"
                  >
                    <option value="Phase 1 - Foundations">Phase 1 (W01-W03)</option>
                    <option value="Phase 2 - Core Data Structures">Phase 2 (W04-W06)</option>
                    <option value="Phase 3 - Trees & DP">Phase 3 (W07-W09)</option>
                    <option value="Phase 4 - System Design">Phase 4 (W10-W11)</option>
                    <option value="Phase 5 - Production Mastery">Phase 5 (W12-W13)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={customForm.description}
                  onChange={(e) => setCustomForm({ ...customForm, description: e.target.value })}
                  placeholder="Brief synopsis of what this resource covers..."
                  className="w-full bg-[#050810] border border-slate-700 rounded p-2 text-slate-200"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header & Stats Banner */}
      <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Tv className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Curated Resource Hub (YouTube IFrame Integrations)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Zero-cost public video embeds • Track progress across 90-day sprint phases
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Resource</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
          <div className="bg-[#070a12] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">Completed</span>
            <div className="text-emerald-400 font-bold text-sm mt-0.5">{stats.watched || 0} playlists</div>
          </div>
          <div className="bg-[#070a12] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">In-Progress</span>
            <div className="text-amber-400 font-bold text-sm mt-0.5">{stats.inProgress || 0} playlists</div>
          </div>
          <div className="bg-[#070a12] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[10px] uppercase">Queue</span>
            <div className="text-slate-300 font-bold text-sm mt-0.5">{stats.notStarted || 0} playlists</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        
        <div className="sm:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search channels, topics..."
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 pl-9 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono shadow-inner text-xs"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
          >
            <option value="ALL">All Tracks</option>
            <option value="DSA">DSA</option>
            <option value="BACKEND">Backend (Spring / Node)</option>
            <option value="CS_FUNDAMENTALS">CS Fundamentals</option>
            <option value="SYSTEM_DESIGN">System Design</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
          >
            <option value="ALL">All Phases</option>
            <option value="Phase 1">Phase 1 (Foundations)</option>
            <option value="Phase 2">Phase 2 (Core Structures)</option>
            <option value="Phase 3">Phase 3 (Trees & DP)</option>
            <option value="Phase 4">Phase 4 (System Design)</option>
            <option value="Phase 5">Phase 5 (Mastery)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#050810] border border-slate-700 rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="watched">Watched</option>
            <option value="in_progress">In Progress</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>

      </div>

      {/* Video / Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="bg-[#090d16] border border-slate-800 hover:border-slate-700 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm transition-all"
          >
            
            {/* Top: Card Header & Channel */}
            <div className="p-4 space-y-2">
              
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  resource.track === 'DSA' ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/40' :
                  resource.track === 'BACKEND' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40' :
                  resource.track === 'CS_FUNDAMENTALS' ? 'bg-amber-950/40 text-amber-300 border-amber-500/40' :
                  'bg-purple-950/40 text-purple-300 border-purple-500/40'
                }`}>
                  {resource.track}
                </span>

                <span className="text-[10px] text-slate-500">
                  {resource.phaseTag}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-200 line-clamp-2 leading-relaxed">
                {resource.title}
              </h3>

              <div className="text-[11px] text-cyan-400 font-semibold">
                Channel: {resource.channel}
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                {resource.description}
              </p>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#070a12] border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
              
              {/* Inline Player Button */}
              <button
                onClick={() => setYoutubeModal({ open: true, resource })}
                className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Inline</span>
              </button>

              {/* Status Pill Toggle */}
              <button
                onClick={() => {
                  const nextStatus = resource.status === 'watched' ? 'not_started' : resource.status === 'in_progress' ? 'watched' : 'in_progress';
                  handleUpdateResourceStatus(resource.id, nextStatus, resource.title);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold border flex items-center space-x-1 transition-colors cursor-pointer ${
                  resource.status === 'watched' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40' :
                  resource.status === 'in_progress' ? 'bg-amber-950/40 text-amber-400 border-amber-500/40' :
                  'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
                title="Click to cycle status"
              >
                {resource.status === 'watched' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {resource.status === 'in_progress' && <Clock className="w-3 h-3 text-amber-400" />}
                {resource.status === 'not_started' && <Circle className="w-3 h-3 text-slate-500" />}
                <span className="capitalize">{resource.status.replace('_', ' ')}</span>
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
