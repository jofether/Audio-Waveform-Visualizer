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
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bass, setBass] = useState(50);
  const [treble, setTreble] = useState(50);
  const [equalizer, setEqualizer] = useState(false);
  const [visualizerSize, setVisualizerSize] = useState('normal'); // normal, large, compact
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showDetailView, setShowDetailView] = useState(false);
  const [detailViewMode, setDetailViewMode] = useState('info'); // 'info', 'stats', 'more'
  
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
      
      {/* Header with Controls */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`px-3 py-2 rounded-lg ${themeClasses.primary} shadow-lg hover:shadow-xl transition text-xs font-semibold`}
            title="Toggle Playlist"
          >
            📋 Playlist
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`px-3 py-2 rounded-lg ${themeClasses.primary} shadow-lg hover:shadow-xl transition text-xs font-semibold`}
            title="Toggle Settings"
          >
            ⚙️ Settings
          </button>
        </div>
        
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

        {/* Visualizer Size Controls */}
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

        {/* Equalizer Section */}
        {showSettings && (
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
        )}

        {/* Playlist Section */}
        {showPlaylist && (
          <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-500/30'} pt-4 mt-4`}>
            <p className={`text-xs font-semibold ${themeClasses.textMuted} mb-2 uppercase tracking-widest`}>Queue</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
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
                      ? `bg-gradient-to-r ${themeClasses.gradientBar} text-white` 
                      : `${themeClasses.textMuted} hover:${themeClasses.text}`
                  }`}
                >
                  <div className="font-semibold">{song.title}</div>
                  <div className="opacity-70">{song.artist}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-6 px-4 border-t pt-4" style={{borderColor: theme === 'dark' ? '#374151' : '#06b6d4'}}>
          <button 
            onClick={() => {
              const isFavorited = favorites.includes(currentSongIndex);
              if (isFavorited) {
                setFavorites(favorites.filter(idx => idx !== currentSongIndex));
              } else {
                setFavorites([...favorites, currentSongIndex]);
              }
            }}
            className={`py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${
              favorites.includes(currentSongIndex) ? 'bg-red-500 text-white' : themeClasses.primary
            }`}
          >
            {favorites.includes(currentSongIndex) ? '❤️ Favorited' : '🤍 Favorite'}
          </button>
          <button 
            onClick={() => {
              setShowDetailView(true);
              setDetailViewMode('stats');
            }}
            className={`py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}
          >
            📊 Stats
          </button>
          <button 
            onClick={() => {
              setShowDetailView(true);
              setDetailViewMode('more');
            }}
            className={`py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}
          >
            🎵 More
          </button>
        </div>

        {/* Detail View Modal */}
        {showDetailView && (
          <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-500/30'} pt-4 mt-4`}>
            <div className="flex justify-between items-center mb-3">
              <p className={`text-sm font-semibold ${themeClasses.textMuted} uppercase tracking-widest`}>
                {detailViewMode === 'stats' ? 'Statistics' : 'More Options'}
              </p>
              <button 
                onClick={() => setShowDetailView(false)}
                className={`text-lg ${themeClasses.textMuted} hover:${themeClasses.text}`}
              >
                ✕
              </button>
            </div>
            
            {detailViewMode === 'stats' && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className={`p-3 rounded ${themeClasses.card} border`}>
                  <p className={`${themeClasses.textMuted} text-xs`}>Play Count</p>
                  <p className={`text-lg font-bold ${themeClasses.text}`}>42</p>
                </div>
                <div className={`p-3 rounded ${themeClasses.card} border`}>
                  <p className={`${themeClasses.textMuted} text-xs`}>Last Played</p>
                  <p className={`text-lg font-bold ${themeClasses.text}`}>2h ago</p>
                </div>
                <div className={`p-3 rounded ${themeClasses.card} border`}>
                  <p className={`${themeClasses.textMuted} text-xs`}>Bitrate</p>
                  <p className={`text-lg font-bold ${themeClasses.text}`}>320kbps</p>
                </div>
                <div className={`p-3 rounded ${themeClasses.card} border`}>
                  <p className={`${themeClasses.textMuted} text-xs`}>Format</p>
                  <p className={`text-lg font-bold ${themeClasses.text}`}>MP3</p>
                </div>
              </div>
            )}
            
            {detailViewMode === 'more' && (
              <div className="space-y-2">
                <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
                  📁 Add to Playlist
                </button>
                <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
                  🔗 Share
                </button>
                <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
                  ℹ️ About Artist
                </button>
                <button className={`w-full py-2 px-3 rounded text-xs font-semibold transition hover:scale-105 ${themeClasses.primary}`}>
                  💿 View Album
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Right Sidebar - Additional Info */}
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
