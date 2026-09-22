import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tv, X, CheckCircle2, Clock, ExternalLink, Play } from 'lucide-react';

export default function YouTubeModal() {
  const { youtubeModal, setYoutubeModal, handleUpdateResourceStatus } = useApp();

  if (!youtubeModal.open || !youtubeModal.resource) return null;

  const resource = youtubeModal.resource;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#090d16] border border-slate-700/80 rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-mono">
        
        {/* Header */}
        <div className="bg-[#0f1422] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <Tv className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
              {resource.title}
            </span>
          </div>
          
          <button
            onClick={() => setYoutubeModal({ open: false, resource: null })}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={resource.embedUrl}
            title={resource.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Metadata & Controls */}
        <div className="p-4 bg-[#070a12] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Channel:</span>
              <strong className="text-cyan-300">{resource.channel}</strong>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{resource.phaseTag}</span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-xl">
              {resource.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const nextStatus = resource.status === 'watched' ? 'in_progress' : 'watched';
                handleUpdateResourceStatus(resource.id, nextStatus, resource.title);
                setYoutubeModal(prev => ({ ...prev, resource: { ...prev.resource, status: nextStatus } }));
              }}
              className={`px-3.5 py-1.5 rounded font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                resource.status === 'watched'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{resource.status === 'watched' ? 'Watched (Done)' : 'Mark as Watched'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
