import React from 'react';

export default function PlaylistSection({ 
  showPlaylist, 
  songs, 
  currentSongIndex, 
  setCurrentSongIndex, 
  setProgress, 
  setIsPlaying, 
  theme, 
  themeClasses 
}) {
  return (
    showPlaylist && (
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-500/30'} pt-4 mt-4`}>
        <p className={`text-xs font-semibold ${themeClasses.textMuted} mb-2 uppercase tracking-widest`}>Queue</p>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {songs.map((song, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSongIndex(idx);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`w-full text-left p-2 rounded transition text-xs ${
                idx === currentSongIndex 
                  ? `bg-gradient-to-r ${themeClasses.gradientBar} text-white` 
                  : `${themeClasses.textMuted} hover:${themeClasses.text}`
              }`}
            >
              <div className="font-semibold">{song.title}</div>
              <div className="opacity-70">{song.artist}</div>
            </button>
          ))}
        </div>
      </div>
    )
  );
}
