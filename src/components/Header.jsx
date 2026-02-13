import React from 'react';

export default function Header({ theme, setTheme, showPlaylist, setShowPlaylist, showSettings, setShowSettings, themeClasses }) {
  return (
    /* 4. LAYERS BUG A: Added 'z-[-1]'. The header controls (Playlist, Settings) will sit behind the background/body. */ 
    /* FIX: className="absolute top-8 left-8 right-8 flex items-center justify-between" */
    <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-[-1]">
      <div className="flex gap-2">
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`px-3 py-2 rounded-lg ${themeClasses.primary} shadow-lg hover:shadow-xl transition text-xs font-semibold`}
          title="Toggle Playlist"
        >
          📋 Playlist
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`px-3 py-2 rounded-lg ${themeClasses.primary} shadow-lg hover:shadow-xl transition text-xs font-semibold`}
          title="Toggle Settings"
        >
          ⚙️ Settings
        </button>
      </div>
      
      <button
        onClick={() => setTheme(theme === 'dark' ? 'neon' : 'dark')}
        className={`px-4 py-2 rounded-full ${themeClasses.primary} shadow-lg hover:shadow-xl transition text-sm font-semibold`}
      >
        {theme === 'dark' ? '⚡ Neon' : '🌙 Dark'}
      </button>
    </div>
  );
}