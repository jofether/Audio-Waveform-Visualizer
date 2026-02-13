import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SongInfo from './components/SongInfo';
import Visualizer from './components/Visualizer';
import ProgressBar from './components/ProgressBar';
import VolumeControl from './components/VolumeControl';
import MainControls from './components/MainControls';
import SecondaryControls from './components/SecondaryControls';
import VisualizerSettings from './components/VisualizerSettings';
import EqualizerSection from './components/EqualizerSection';
import PlaylistSection from './components/PlaylistSection';
import QuickActionButtons from './components/QuickActionButtons';
import DetailView from './components/DetailView';
import RightSidebar from './components/RightSidebar';
import BottomStats from './components/BottomStats';

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
        /* 2. COLOR BUG B: Dark theme text set to dark gray (Gray-900), making it unreadable on the dark card */
        /* FIX: text: 'text-white', */
        text: 'text-gray-900',
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
    /* 3. LAYOUT BUG A: Removed 'flex' and 'items-center'. The player will lose its centered positioning and stretch full width. */
    /* FIX: className={`min-h-screen ${themeClasses.bg} flex flex-col items-center justify-center p-8 ...`} */
    <div className={`min-h-screen ${themeClasses.bg} block p-8 font-sans transition-colors duration-300`}>
      
      {/* Header */}
      <Header 
        theme={theme}
        setTheme={setTheme}
        showPlaylist={showPlaylist}
        setShowPlaylist={setShowPlaylist}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        themeClasses={themeClasses}
      />

      {/* Main Player Card */}
      <div className={`w-full max-w-md ${themeClasses.card} rounded-3xl p-8 shadow-2xl border transition-all duration-300`}>
        
        {/* Song Info */}
        <SongInfo 
          currentSong={currentSong}
          isPlaying={isPlaying}
          themeClasses={themeClasses}
          theme={theme}
        />

        {/* Visualizer */}
        <Visualizer 
          animatedHeights={animatedHeights}
          hoveredBar={hoveredBar}
          setHoveredBar={setHoveredBar}
          themeClasses={themeClasses}
        />

        {/* Progress Bar */}
        <ProgressBar 
          progress={progress}
          formatTime={formatTime}
          currentSong={currentSong}
          themeClasses={themeClasses}
        />

        {/* Volume Control */}
        <VolumeControl 
          volume={volume}
          setVolume={setVolume}
          themeClasses={themeClasses}
        />

        {/* Main Controls */}
        <MainControls 
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          nextSong={nextSong}
          prevSong={prevSong}
          themeClasses={themeClasses}
        />

        {/* Secondary Controls */}
        <SecondaryControls 
          isShuffle={isShuffle}
          toggleShuffle={toggleShuffle}
          repeatMode={repeatMode}
          toggleRepeat={toggleRepeat}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          theme={theme}
          themeClasses={themeClasses}
        />

        {/* Visualizer Size Controls */}
        <VisualizerSettings 
          visualizerSize={visualizerSize}
          setVisualizerSize={setVisualizerSize}
          themeClasses={themeClasses}
        />

        {/* Equalizer Section */}
        <EqualizerSection 
          showSettings={showSettings}
          equalizer={equalizer}
          setEqualizer={setEqualizer}
          bass={bass}
          setBass={setBass}
          treble={treble}
          setTreble={setTreble}
          theme={theme}
          themeClasses={themeClasses}
        />

        {/* Playlist Section */}
        <PlaylistSection 
          showPlaylist={showPlaylist}
          songs={songs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          setProgress={setProgress}
          setIsPlaying={setIsPlaying}
          theme={theme}
          themeClasses={themeClasses}
        />

        {/* Quick Action Buttons */}
        <QuickActionButtons 
          currentSongIndex={currentSongIndex}
          favorites={favorites}
          setFavorites={setFavorites}
          setShowDetailView={setShowDetailView}
          setDetailViewMode={setDetailViewMode}
          theme={theme}
          themeClasses={themeClasses}
        />

        {/* Detail View Modal */}
        <DetailView 
          showDetailView={showDetailView}
          detailViewMode={detailViewMode}
          setShowDetailView={setShowDetailView}
          theme={theme}
          themeClasses={themeClasses}
        />

      </div>

      {/* Right Sidebar */}
      <RightSidebar 
        currentSong={currentSong}
        visualizerSize={visualizerSize}
        themeClasses={themeClasses}
      />

      {/* Bottom Stats */}
      <BottomStats 
        volume={volume}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        themeClasses={themeClasses}
      />

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