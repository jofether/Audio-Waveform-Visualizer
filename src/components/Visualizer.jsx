import React from 'react';

export default function Visualizer({ animatedHeights, hoveredBar, setHoveredBar, themeClasses }) {
  return (
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
  );
}
