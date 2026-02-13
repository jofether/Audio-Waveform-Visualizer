import React from 'react';

export default function EqualizerSection({ 
  showSettings, 
  equalizer, 
  setEqualizer, 
  bass, 
  setBass, 
  treble, 
  setTreble, 
  theme, 
  themeClasses 
}) {
  return (
    showSettings && (
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-500/30'} pt-4 mb-4`}>
        <div className="flex items-center justify-between mb-4">
          <p className={`text-sm font-semibold ${themeClasses.textMuted} uppercase tracking-widest`}>Equalizer</p>
          <button
            onClick={() => setEqualizer(!equalizer)}
            className={`px-3 py-1 rounded text-xs ${equalizer ? `${themeClasses.primary}` : `${themeClasses.textMuted} border`}`}
          >
            {equalizer ? 'On' : 'Off'}
          </button>
        </div>
        
        {equalizer && (
          <div className="space-y-3">
            <div>
              <label className={`text-xs ${themeClasses.textMuted} block mb-1`}>Bass: {bass}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={bass}
                onChange={(e) => setBass(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-pink-500"
              />
            </div>
            <div>
              <label className={`text-xs ${themeClasses.textMuted} block mb-1`}>Treble: {treble}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={treble}
                onChange={(e) => setTreble(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          </div>
        )}
      </div>
    )
  );
}
