import React from 'react';

export default function BottomStats({ volume, isShuffle, repeatMode, themeClasses }) {
  return (
    <>
      {/* Bottom Stats - Left Side */}
      <div className={`absolute bottom-8 left-8 ${themeClasses.card} rounded-xl p-4 shadow-lg border`}>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className={`text-2xl font-bold ${themeClasses.text}`}>20</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Tracks</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${themeClasses.text}`}>{volume}%</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Volume</p>
          </div>
        </div>
      </div>

      {/* Bottom Stats - Right Side */}
      <div className={`absolute bottom-8 right-8 ${themeClasses.card} rounded-xl p-4 shadow-lg border`}>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className={`text-2xl font-bold ${themeClasses.text}`}>{isShuffle ? '✓' : '—'}</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Shuffle</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${themeClasses.text}`}>{repeatMode}</p>
            <p className={`text-xs ${themeClasses.textMuted}`}>Repeat</p>
          </div>
        </div>
      </div>
    </>
  );
}
