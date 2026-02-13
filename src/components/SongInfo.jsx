import React from 'react';

export default function SongInfo({ currentSong, isPlaying, themeClasses, theme }) {
  return (
    /* 5. SPACING BUG A: Negative margin pulls the song info down into the visualizer bars, causing overlap. */ 
    /* FIX: className="text-center mb-10" */
    <div className="text-center mb-[-50px]">
      <div className={`w-40 h-40 mx-auto bg-gradient-to-tr ${themeClasses.gradientBar} rounded-full shadow-lg mb-6 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}>
        <svg className={`w-16 h-16 ${themeClasses.text}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>
      {/* 6. TYPO BUG A: 'text-22xl' is invalid. The song title will fall back to default small size. */ }
      {/* FIX: className={`text-2xl font-bold ${themeClasses.text} mb-1`} */}
      <h2 className={`text-22xl font-bold ${themeClasses.text} mb-1`}>{currentSong.title}</h2>
      <p className={themeClasses.textMuted}>{currentSong.artist} • {currentSong.album}</p>
    </div>
  );
}