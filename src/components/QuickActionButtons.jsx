import React from 'react';

export default function QuickActionButtons({ 
  currentSongIndex, 
  favorites, 
  setFavorites, 
  setShowDetailView, 
  setDetailViewMode, 
  theme, 
  themeClasses 
}) {
  return (
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
  );
}
