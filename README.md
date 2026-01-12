# Audio Waveform Visualizer

An elegant, feature-rich audio waveform visualizer built with React and Tailwind CSS. This project demonstrates flex layout alignment, interactive animations, and advanced data visualization concepts through a modern music player interface.

## ✨ Features

### Core Functionality
- **Music Player UI**: Beautiful dark-themed and neon-themed player card
- **Animated Waveform**: Real-time reactive bar visualization that animates during playback
- **Gradient Effects**: Dynamic gradient fills with smooth color transitions
- **Responsive Design**: Works seamlessly on all screen sizes

### Player Controls
- **Play/Pause Button**: Toggle playback with visual feedback
- **Previous/Next Navigation**: Browse through song queue
- **Progress Bar**: Visual timeline with current/total time display
- **Volume Control**: Adjustable volume slider with percentage display

### Advanced Features
- **Shuffle Mode**: Randomize song playback
- **Repeat Modes**: Cycle through no-repeat, repeat-all, and repeat-one
- **Theme Switcher**: Toggle between dark mode and neon mode
- **Song Queue**: Browse and select songs from playlist
- **Keyboard Shortcuts**: Play/Pause (Space), Next (N), Previous (P)
- **Hover Effects**: Interactive bar visualization with opacity feedback
- **Smooth Animations**: Fluid transitions and pulsing effects

### UI/UX Enhancements
- **Dynamic Colors**: Different gradient schemes for each theme
- **Custom Scrollbar**: Styled scrollbar for queue list
- **Range Slider**: Beautiful gradient-styled volume control
- **Keyboard Help**: Built-in shortcut reference
- **Visual Feedback**: Glow effects and scale transforms on interaction

## Project Rationale

This layout demonstrates key concepts in CSS Flexbox:
- **Vertical Alignment with `items-end`**: Bars align to the bottom, creating a gravity effect that's essential for proper data visualization
- **Space Distribution with `justify-between`**: Ensures even spacing between equalizer bars
- **Responsive Containers**: Uses flex properties for dynamic, flexible layouts

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `N` | Next Song |
| `P` | Previous Song |

## Project Structure

```
src/
├── App.jsx          # Main component with all features
├── main.jsx         # React DOM entry point
└── index.css        # Global styles with custom animations

public/
└── index.html       # HTML entry point

├── package.json     # Dependencies and scripts
├── vite.config.js   # Vite configuration
├── tailwind.config.js # Tailwind CSS config
└── postcss.config.js # PostCSS config
```

## Technologies Used

- **React 18**: Modern UI framework with hooks for state management
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PostCSS**: CSS processing with Autoprefixer
- **JavaScript ES6+**: Modern JavaScript features

## Key Implementation Details

### State Management
The application uses React hooks to manage:
- Playback state (isPlaying)
- Current song and progress
- Volume and repeat modes
- UI theme (dark/neon)
- Visual effects (hoveredBar, animatedHeights)

### Waveform Animation
- Bars animate automatically when music is playing
- Hover effects highlight individual bars
- Heights vary dynamically based on simulated audio frequency
- Smooth transitions between height changes

### Theme System
Two complete theme variations:
- **Dark Mode**: Gray backgrounds with indigo/pink gradients
- **Neon Mode**: Black backgrounds with cyan/purple gradients

### Progress Simulation
- Progress bar auto-advances during playback
- Respects repeat modes (none, repeat-all, repeat-one)
- Integrates with shuffle functionality
- Displays formatted time (MM:SS)

## Key Components

### Waveform Visualizer
The core visualizer uses a flex container with:
- `h-24`: Fixed height container
- `flex items-end`: Aligns bars to the bottom (gravity effect)
- `justify-between`: Distributes bars evenly with spacing
- Dynamic height percentages calculated from animated state

### Player Controls
- **Main Controls**: Previous, Play/Pause, Next buttons
- **Secondary Controls**: Shuffle, Repeat, Theme, Help buttons
- **Volume Control**: Interactive range slider with percentage display
- **Progress Bar**: Clickable timeline with time indicators

## Future Enhancements

- Real-time audio analysis using Web Audio API
- Microphone input visualization
- Custom color theme creator
- Playlist management system
- Import/export playlists
- Audio file upload and playback
- Equalizer controls
- Visualization mode switcher (waveform, frequency, etc.)
- Sound reactivity with actual audio frequency data
- Mobile app version
- Accessibility improvements (ARIA labels, keyboard navigation)

## Learning Outcomes

This project demonstrates:
1. **React Hooks**: useState, useEffect for state and side effect management
2. **CSS Flexbox**: Proper alignment, spacing, and responsive layouts
3. **Tailwind CSS**: Utility classes for rapid UI development
4. **Event Handling**: Click handlers, keyboard shortcuts, range inputs
5. **Animation**: CSS transitions, keyframe animations, state-driven animations
6. **Theme Management**: Dynamic styling based on theme state
7. **Component Architecture**: Organizing logic in a single component with clear sections
8. **Time Formatting**: Converting percentages to MM:SS format

## License

MIT
