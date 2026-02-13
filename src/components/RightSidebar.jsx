import React from 'react';

export default function RightSidebar({ currentSong, visualizerSize, themeClasses }) {
  return (
    <div className={`absolute right-8 top-32 w-64 ${themeClasses.card} rounded-2xl p-6 shadow-xl border max-h-96 overflow-y-auto hidden lg:block`}>
      <h3 className={`text-sm font-bold ${themeClasses.text} mb-4`}>Now Playing Info</h3>
      <div className={`space-y-3 text-xs ${themeClasses.textMuted}`}>
        <div>
          <p className="font-semibold mb-1">Duration</p>
          <p>{currentSong.duration}</p>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <p className="font-semibold mb-1">Album</p>
          <p>{currentSong.album}</p>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <p className="font-semibold mb-1">Artist</p>
          <p>{currentSong.artist}</p>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <p className="font-semibold mb-1">Quality</p>
          <p>320 kbps • 44.1 kHz</p>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <p className="font-semibold mb-1">Visualizer</p>
          <p className="capitalize">{visualizerSize}</p>
        </div>
      </div>
    </div>
  );
}
