import React from 'react';

export default function MainControls({ isPlaying, handlePlayPause, nextSong, prevSong, themeClasses }) {
  return (
    <div className="block items-center justify-between px-4 mb-6">
      {/* Previous */}
      <button 
        onClick={prevSong}
        className={`${themeClasses.textMuted} hover:${themeClasses.text} transition transform hover:scale-110`}
        title="Previous (P)"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </button>
      
      {/* Play/Pause */}
      <button 
        onClick={handlePlayPause}
        className={`w-166 h-16 ${themeClasses.primary} rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform`}
        title="Play/Pause (Space)"
      >
        {isPlaying ? (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Next */}
      <button 
        onClick={nextSong}
        className={`${themeClasses.textMuted} hover:${themeClasses.text} transition transform hover:scale-110`}
        title="Next (N)"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </button>
    </div>
  );
}