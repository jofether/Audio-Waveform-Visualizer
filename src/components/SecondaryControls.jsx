import React from 'react';

export default function SecondaryControls({ 
  isShuffle, 
  toggleShuffle, 
  repeatMode, 
  toggleRepeat, 
  isMuted, 
  setIsMuted, 
  theme, 
  themeClasses 
}) {
  return (
    <div className="flex items-center justify-between px-4 mb-6">
      {/* Shuffle */}
      <button 
        onClick={toggleShuffle}
        className={`transition transform hover:scale-110 ${isShuffle ? 'text-pink-500' : themeClasses.textMuted}`}
        title="Shuffle"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.59 9.38L6.5 5.29 8 3.75l6 6-6 6-1.41-1.41 4.17-4.17zM14.5 4l2 2h-3.02c-4.14 0-7.78 3.29-7.78 7.78 0 1.58.46 3.06 1.25 4.32l1.41-1.41C6.16 14.92 5.5 13.5 5.5 11.78c0-3.12 2.38-5.78 5.48-5.78h3.02l-2-2h6v6zm-2.41 10.96c.8 1.26 1.27 2.73 1.27 4.32 0 4.42-3.58 8-8 8s-8-3.58-8-8H0l4-4 4 4H4c0 3.31 2.69 6 6 6 1.02 0 1.97-.25 2.81-.7l-1.41-1.41z"/>
        </svg>
      </button>

      {/* Repeat */}
      <button 
        onClick={toggleRepeat}
        className={`transition transform hover:scale-110 ${repeatMode > 0 ? 'text-pink-500' : themeClasses.textMuted}`}
        title="Repeat"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
        </svg>
        {repeatMode === 2 && <span className="text-xs absolute mt-8">1</span>}
      </button>

      {/* Mute Button */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className={`transition transform hover:scale-110 ${isMuted ? 'text-red-500' : themeClasses.textMuted}`}
        title="Mute"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          {isMuted ? (
            <path d="M16.6915026,12.4744748 L21.5693473,7.59603197 C22.1459756,7.01940369 22.1459756,5.87425726 21.5693473,5.297622 C20.9925722,4.72150326 19.8474257,4.72150326 19.2706506,5.297622 L14.3931045,10.1760417 L9.51727475,5.29603285 C8.9386922,4.71740562 7.79251259,4.71740562 7.213827,5.29603285 C6.6365484,5.87466007 6.6365484,7.02106978 7.213827,7.59969701 L12.0896356,12.4744748 L7.213827,17.3492526 C6.6365484,17.9278798 6.6365484,19.0740262 7.213827,19.6526535 C7.79251259,20.2312807 8.9386922,20.2312807 9.51727475,19.6526535 L14.3931045,14.7728658 L19.2706506,19.6526535 C19.8474257,20.2312807 20.9925722,20.2312807 21.5693473,19.6526535 C22.1459756,19.0740262 22.1459756,17.9278798 21.5693473,17.3492526 L16.6915026,12.4744748 Z"/>
          ) : (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          )}
        </svg>
      </button>

      {/* Theme indicator */}
      <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-indigo-500' : 'bg-cyan-400'} animate-pulse`}></div>

      {/* Keyboard help */}
      <button 
        title="Keyboard shortcuts: Space (play/pause), N (next), P (previous)"
        className={`transition transform hover:scale-110 ${themeClasses.textMuted}`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </button>
    </div>
  );
}
