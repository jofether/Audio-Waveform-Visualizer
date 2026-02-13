import React from 'react';

export default function VolumeControl({ volume, setVolume, themeClasses }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <svg className={`w-4 h-4 ${themeClasses.textMuted}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(parseInt(e.target.value))}
        className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-pink-500"
      />
      <span className={`text-xs ${themeClasses.textMuted} w-8`}>{volume}%</span>
    </div>
  );
}
