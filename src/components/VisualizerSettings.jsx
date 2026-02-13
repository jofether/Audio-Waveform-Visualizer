import React from 'react';

export default function VisualizerSettings({ visualizerSize, setVisualizerSize, themeClasses }) {
  return (
    <div className="flex gap-2 mb-6 px-4">
      <button
        onClick={() => setVisualizerSize('compact')}
        className={`flex-1 py-2 rounded transition text-xs font-semibold ${
          visualizerSize === 'compact' 
            ? `${themeClasses.primary}` 
            : `${themeClasses.textMuted} hover:${themeClasses.text} border ${themeClasses.card}`
        }`}
      >
        Compact
      </button>
      <button
        onClick={() => setVisualizerSize('normal')}
        className={`flex-1 py-2 rounded transition text-xs font-semibold ${
          visualizerSize === 'normal' 
            ? `${themeClasses.primary}` 
            : `${themeClasses.textMuted} hover:${themeClasses.text} border ${themeClasses.card}`
        }`}
      >
        Normal
      </button>
      <button
        onClick={() => setVisualizerSize('large')}
        className={`flex-1 py-2 rounded transition text-xs font-semibold ${
          visualizerSize === 'large' 
            ? `${themeClasses.primary}` 
            : `${themeClasses.textMuted} hover:${themeClasses.text} border ${themeClasses.card}`
        }`}
      >
        Large
      </button>
    </div>
  );
}
