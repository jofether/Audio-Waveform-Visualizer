import React, { useState, useEffect, useRef } from 'react';

function App() {
  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
  const [theme, setTheme] = useState('dark'); // dark or neon
  const [hoveredBar, setHoveredBar] = useState(null);
  const [animatingBars, setAnimatingBars] = useState(new Array(20).fill(false));
  
  // Song data
  const songs = [
    { title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '3:41' },
    { title: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '4:03' },
    { title: 'Float On', artist: 'Modest Mouse', album: 'Good News for People Who Love Bad News', duration: '3:31' },
  ];
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];
  
  // Generate waveform with animation
  const baseHeights = [40, 65, 30, 80, 55, 90, 45, 60, 75, 50, 95, 60, 40, 70, 35, 85, 50, 30, 65, 45];
  const [animatedHeights, setAnimatedHeights] = useState(baseHeights);
  
  // Animate bars when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setAnimatedHeights(prevHeights =>
        prevHeights.map(() => {
          const baseHeight = baseHeights[Math.floor(Math.random() * baseHeights.length)];
          const variance = Math.random() * 20 - 10;
          return Math.max(20, Math.min(100, baseHeight + variance));
        })
      );
    }, 150);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
      if (e.code === 'KeyN') {
        nextSong();
      }
      if (e.code === 'KeyP') {
        prevSong();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (isShuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * songs.length));
      setProgress(0);
    }
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const formatTime = (percentage) => {
    const totalSeconds = 221; // 3:41 in seconds
    const seconds = Math.floor((percentage / 100) * totalSeconds);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate progress
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (repeatMode === 2) {
            return 0;
          } else if (repeatMode === 1 || isShuffle) {
            nextSong();
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + 0.1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, repeatMode, isShuffle]);

  const themeClasses = theme === 'dark' 
    ? {
        bg: 'bg-gray-900',
        card: 'bg-gray-800 border-gray-700',
        text: 'text-white',
        textMuted: 'text-gray-400',
        gradientBar: 'from-indigo-500 to-pink-500',
        primary: 'bg-white text-gray-900',
      }
    : {
        bg: 'bg-gray-950',
        card: 'bg-black border-cyan-500',
        text: 'text-cyan-400',
        textMuted: 'text-cyan-300/60',
        gradientBar: 'from-cyan-400 to-purple-600',
        primary: 'bg-cyan-400 text-black',
      };

  return (
    <div className={`min-h-screen ${themeClasses.bg} flex flex-col items-center justify-center p-8 font-sans transition-colors duration-300`}>
      
      {/* Header with Theme Toggle */}
      <div className="absolute top-8 right-8">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'neon' : 'dark')}
          className={`px-4 py-2 rounded-full ${themeClasses.primary} shadow-lg hover:shadow-xl transition text-sm font-semibold`}
        >
          {theme === 'dark' ? '⚡ Neon' : '🌙 Dark'}
        </button>
      </div>

      {/* Main Player Card */}
      <div className={`w-full max-w-md ${themeClasses.card} rounded-3xl p-8 shadow-2xl border transition-all duration-300`}>
        
        {/* Song Info */}
        <div className="text-center mb-10">
          <div className={`w-40 h-40 mx-auto bg-gradient-to-tr ${themeClasses.gradientBar} rounded-full shadow-lg mb-6 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}>
            <svg className={`w-16 h-16 ${themeClasses.text}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <h2 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{currentSong.title}</h2>
          <p className={themeClasses.textMuted}>{currentSong.artist} • {currentSong.album}</p>
        </div>

        {/* VISUALIZER CONTAINER */}
        <div className="h-24 flex items-end justify-between space-x-1 mb-10">
          {animatedHeights.map((height, i) => (
            <div 
              key={i}
              className={`w-2 bg-gradient-to-t ${themeClasses.gradientBar} rounded-t-full transition-all duration-100 cursor-pointer hover:w-3 hover:shadow-lg`}
              style={{ 
                height: `${height}%`,
                opacity: hoveredBar === null || hoveredBar === i ? 1 : 0.5,
              }}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            ></div>
          ))}
        </div>

        {/* Progress Bar */}
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

        {/* Volume Control */}
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

        {/* Main Controls */}
        <div className="flex items-center justify-between px-4 mb-6">
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
            className={`w-16 h-16 ${themeClasses.primary} rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform`}
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

        {/* Secondary Controls */}
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

        {/* Song List */}
        <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-500/30'} pt-4 mt-4`}>
          <p className={`text-xs font-semibold ${themeClasses.textMuted} mb-2 uppercase tracking-widest`}>Queue</p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
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
                    ? `${themeClasses.gradientBar} bg-gradient-to-r text-white` 
                    : `${themeClasses.textMuted} hover:${themeClasses.text}`
                }`}
              >
                <div className="font-semibold">{song.title}</div>
                <div className="opacity-70">{song.artist}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Keyboard shortcuts indicator */}
      <div className={`mt-12 text-center text-xs ${themeClasses.textMuted}`}>
        <p className="mb-2 font-semibold">Keyboard Shortcuts</p>
        <div className="space-y-1">
          <div><kbd className="bg-gray-800 px-2 py-1 rounded">Space</kbd> Play/Pause</div>
          <div><kbd className="bg-gray-800 px-2 py-1 rounded">N</kbd> Next • <kbd className="bg-gray-800 px-2 py-1 rounded">P</kbd> Previous</div>
        </div>
      </div>
    </div>
  );
}

export default App;
