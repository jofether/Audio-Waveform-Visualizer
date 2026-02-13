import React from 'react';

export default function ProgressBar({ progress, formatTime, currentSong, themeClasses }) {
  return (
    <div className="mb-6">
      <div className={`w-full h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer hover:h-2 transition`}>
        <div 
          className={`h-full bg-gradient-to-r ${themeClasses.gradientBar}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={`flex justify-between mt-2 text-xs ${themeClasses.textMuted}`}>
        <span>{formatTime(progress)}</span>
        <span>{currentSong.duration}</span>
      </div>
    </div>
  );
}
