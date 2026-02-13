import React from 'react';

export default function DetailView({ 
  showDetailView, 
  detailViewMode, 
  setShowDetailView, 
  theme, 
  themeClasses 
}) {
  return (
    showDetailView && (
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-500/30'} pt-4 mt-4`}>
        <div className="flex justify-between items-center mb-3">
          <p className={`text-sm font-semibold ${themeClasses.textMuted} uppercase tracking-widest`}>
            {detailViewMode === 'stats' ? 'Statistics' : 'More Options'}
          </p>
          <button 
            onClick={() => setShowDetailView(false)}
            className={`text-lg ${themeClasses.textMuted} hover:${themeClasses.text}`}
          >
            ✕
          </button>
        </div>
        
        {detailViewMode === 'stats' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className={`p-3 rounded ${themeClasses.card} border`}>
              <p className={`${themeClasses.textMuted} text-xs`}>Play Count</p>
              <p className={`text-lg font-bold ${themeClasses.text}`}>42</p>
            </div>
            <div className={`p-3 rounded ${themeClasses.card} border`}>
              <p className={`${themeClasses.textMuted} text-xs`}>Last Played</p>
              <p className={`text-lg font-bold ${themeClasses.text}`}>2h ago</p>
            </div>
            <div className={`p-3 rounded ${themeClasses.card} border`}>
              <p className={`${themeClasses.textMuted} text-xs`}>Bitrate</p>
              <p className={`text-lg font-bold ${themeClasses.text}`}>320kbps</p>
            </div>
            <div className={`p-3 rounded ${themeClasses.card} border`}>
              <p className={`${themeClasses.textMuted} text-xs`}>Format</p>
              <p className={`text-lg font-bold ${themeClasses.text}`}>MP3</p>
            </div>
          </div>
        )}
        
        {detailViewMode === 'more' && (
          <div className="space-y-2">
            <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
              📁 Add to Playlist
            </button>
            <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
              🔗 Share
            </button>
            <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
              ℹ️ About Artist
            </button>
            <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
              💿 View Album
            </button>
          </div>
        )}
      </div>
    )
  );
}
