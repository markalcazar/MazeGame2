# Module Contracts: Maze Game

**Date**: 2025-12-08
**Feature**: Maze Game (001-maze-game)
**Purpose**: Define public APIs and interfaces for all JavaScript modules

## Overview

This document specifies the public API contract for each JavaScript module in the Maze Game. All modules use JSDoc comments for type documentation.

---

## 1. MazeGenerator Module

**File**: `js/MazeGenerator.js`

**Purpose**: Generate random perfect mazes using Recursive Backtracker algorithm.

### Public API

```javascript
/**
 * Generates a perfect maze with guaranteed path from start to exit.
 * @param {number} width - Maze width in cells (15, 25, or 40)
 * @param {number} height - Maze height in cells (15, 25, or 40)
 * @returns {Maze} Generated maze object
 * @throws {Error} If width or height is invalid
 */
function generate(width, height);

/**
 * Validates that a maze has at least one path from start to exit.
 * @param {Maze} maze - Maze to validate
 * @returns {boolean} True if maze is solvable
 */
function validateMaze(maze);
```

### Example Usage

```javascript
import { generate } from './MazeGenerator.js';

const maze = generate(25, 25);
console.log(maze.width, maze.height); // 25, 25
console.log(maze.grid[0][0]); // 0 (path at start)
```

---

## 2. MazeRenderer Module

**File**: `js/MazeRenderer.js`

**Purpose**: Render maze, player, and fog of war to canvas.

### Public API

```javascript
/**
 * Renders the visible portion of the maze with fog of war.
 * @param {Maze} maze - Maze to render
 * @param {Player} player - Player position for fog of war center
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} [fogRadius=5] - Fog of war visibility radius
 */
function renderMaze(maze, player, ctx, fogRadius);

/**
 * Renders the player sprite at current position.
 * @param {Player} player - Player to render
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {AnimationManager} animationManager - For sprite frames
 */
function renderPlayer(player, ctx, animationManager);

/**
 * Calculates pixel coordinates for a grid position.
 * @param {number} gridX - Grid X coordinate
 * @param {number} gridY - Grid Y coordinate
 * @param {number} cellSize - Size of each cell in pixels
 * @returns {{x: number, y: number}} Pixel coordinates
 */
function gridToPixel(gridX, gridY, cellSize);
```

### Example Usage

```javascript
import { renderMaze, renderPlayer } from './MazeRenderer.js';

function render(ctx) {
  renderMaze(gameState.maze, gameState.player, ctx);
  renderPlayer(gameState.player, ctx, animationManager);
}
```

---

## 3. Player Module

**File**: `js/Player.js`

**Purpose**: Manage player state, position, and movement.

### Public API

```javascript
/**
 * Creates a new player at specified position.
 * @param {number} x - Starting X position
 * @param {number} y - Starting Y position
 * @returns {Player} New player object
 */
function createPlayer(x, y);

/**
 * Attempts to move player in specified direction.
 * @param {Player} player - Player to move
 * @param {Maze} maze - Maze for collision detection
 * @param {string} direction - 'up'|'down'|'left'|'right'
 * @returns {boolean} True if move was successful
 */
function movePlayer(player, maze, direction);

/**
 * Updates player animation state.
 * @param {Player} player - Player to update
 * @param {number} deltaTime - Time since last update (ms)
 */
function updateAnimation(player, deltaTime);

/**
 * Sets player animation state.
 * @param {Player} player - Player to update
 * @param {string} animationState - 'idle'|'walking'|'collision'
 */
function setAnimationState(player, animationState);
```

### Example Usage

```javascript
import { createPlayer, movePlayer } from './Player.js';

const player = createPlayer(0, 0);
const moved = movePlayer(player, maze, 'right');
if (moved) {
  console.log('Player moved to:', player.x, player.y);
}
```

---

## 4. InputHandler Module

**File**: `js/InputHandler.js`

**Purpose**: Handle keyboard input with auto-repeat support.

### Public API

```javascript
/**
 * Initializes keyboard event listeners.
 * @param {Function} onMove - Callback when player should move (direction: string)
 */
function initInputHandler(onMove);

/**
 * Updates input state (call each frame for auto-repeat).
 * @param {number} deltaTime - Time since last update (ms)
 */
function updateInput(deltaTime);

/**
 * Cleans up event listeners (call on destroy).
 */
function destroy();
```

### Example Usage

```javascript
import { initInputHandler, updateInput } from './InputHandler.js';

initInputHandler((direction) => {
  const moved = movePlayer(gameState.player, gameState.maze, direction);
  if (moved) {
    audioManager.playSoundEffect('move-sound');
  } else {
    gameState.player.animationState = 'collision';
    audioManager.playSoundEffect('wall-hit');
  }
});

// In game loop:
updateInput(deltaTime);
```

---

## 5. CollisionDetector Module

**File**: `js/CollisionDetector.js`

**Purpose**: Detect collisions with walls and boundaries.

### Public API

```javascript
/**
 * Checks if player can move to a target position.
 * @param {Maze} maze - Maze to check against
 * @param {number} fromX - Current X position
 * @param {number} fromY - Current Y position
 * @param {string} direction - 'up'|'down'|'left'|'right'
 * @returns {boolean} True if move is valid (no wall collision)
 */
function canMove(maze, fromX, fromY, direction);

/**
 * Gets the target position after moving in a direction.
 * @param {number} x - Current X
 * @param {number} y - Current Y
 * @param {string} direction - Direction to move
 * @returns {{x: number, y: number}} Target position
 */
function getTargetPosition(x, y, direction);

/**
 * Checks if position is within maze bounds.
 * @param {Maze} maze - Maze to check
 * @param {number} x - X position
 * @param {number} y - Y position
 * @returns {boolean} True if position is in bounds
 */
function isInBounds(maze, x, y);
```

### Example Usage

```javascript
import { canMove } from './CollisionDetector.js';

if (canMove(maze, player.x, player.y, 'right')) {
  player.x += 1;
} else {
  console.log('Wall collision!');
}
```

---

## 6. AudioManager Module

**File**: `js/AudioManager.js`

**Purpose**: Manage background music and sound effects.

### Public API

```javascript
/**
 * Initializes Web Audio API context.
 * @returns {Promise<AudioManager>} Initialized audio manager
 */
async function createAudioManager();

/**
 * Loads an audio file.
 * @param {string} name - Sound identifier ('background-music', 'move-sound', 'wall-hit')
 * @param {string} url - Path to audio file
 * @returns {Promise<void>}
 */
async function loadSound(name, url);

/**
 * Plays background music (looping).
 */
function playMusic();

/**
 * Stops background music.
 */
function stopMusic();

/**
 * Plays a sound effect once.
 * @param {string} name - Sound identifier
 */
function playSoundEffect(name);

/**
 * Sets master volume level.
 * @param {number} level - Volume (0.0 to 1.0)
 */
function setVolume(level);

/**
 * Toggles mute state.
 * @param {boolean} muted - True to mute, false to unmute
 */
function setMuted(muted);

/**
 * Gets current volume level.
 * @returns {number} Volume (0.0 to 1.0)
 */
function getVolume();
```

### Example Usage

```javascript
import { createAudioManager } from './AudioManager.js';

const audioManager = await createAudioManager();
await audioManager.loadSound('background-music', 'assets/audio/background-music.mp3');
await audioManager.loadSound('move-sound', 'assets/audio/move-sound.mp3');
await audioManager.loadSound('wall-hit', 'assets/audio/wall-hit.mp3');

audioManager.playMusic();
audioManager.setVolume(0.7);
```

---

## 7. AnimationManager Module

**File**: `js/AnimationManager.js`

**Purpose**: Manage sprite sheet animations.

### Public API

```javascript
/**
 * Creates animation manager for a sprite sheet.
 * @param {HTMLImageElement} spritesheet - Loaded sprite sheet image
 * @param {number} frameWidth - Width of each frame
 * @param {number} frameHeight - Height of each frame
 * @param {Object} animations - Animation definitions
 * @returns {AnimationManager}
 */
function createAnimationManager(spritesheet, frameWidth, frameHeight, animations);

/**
 * Updates animation frame based on elapsed time.
 * @param {number} deltaTime - Time since last update (ms)
 */
function update(deltaTime);

/**
 * Gets current sprite frame coordinates.
 * @returns {{x: number, y: number, width: number, height: number}}
 */
function getCurrentFrame();

/**
 * Sets the active animation.
 * @param {string} animationName - Animation to play
 */
function setAnimation(animationName);

/**
 * Resets animation to first frame.
 */
function reset();
```

### Example Usage

```javascript
import { createAnimationManager } from './AnimationManager.js';

const spritesheet = new Image();
spritesheet.src = 'assets/sprites/mouse-spritesheet.png';
await spritesheet.decode();

const animManager = createAnimationManager(spritesheet, 32, 32, {
  idle: { frames: [0], fps: 0 },
  walking: { frames: [1, 2, 3, 4], fps: 8 },
  collision: { frames: [5], fps: 0 }
});

// In game loop:
animManager.update(deltaTime);
const frame = animManager.getCurrentFrame();
ctx.drawImage(spritesheet, frame.x, frame.y, frame.width, frame.height, x, y, 32, 32);
```

---

## 8. Timer Module

**File**: `js/Timer.js`

**Purpose**: Track game elapsed time.

### Public API

```javascript
/**
 * Creates a new timer.
 * @returns {Timer}
 */
function createTimer();

/**
 * Starts the timer.
 * @param {Timer} timer
 */
function start(timer);

/**
 * Stops the timer.
 * @param {Timer} timer
 */
function stop(timer);

/**
 * Resets the timer to zero.
 * @param {Timer} timer
 */
function reset(timer);

/**
 * Gets elapsed seconds.
 * @param {Timer} timer
 * @returns {number} Elapsed time in seconds
 */
function getElapsedSeconds(timer);

/**
 * Formats elapsed time as MM:SS.
 * @param {Timer} timer
 * @returns {string} Formatted time string
 */
function formatTime(timer);
```

### Example Usage

```javascript
import { createTimer, start, formatTime } from './Timer.js';

const timer = createTimer();
start(timer);

// Later:
const timeString = formatTime(timer); // "02:34"
```

---

## 9. UIManager Module

**File**: `js/UIManager.js`

**Purpose**: Manage UI overlays (difficulty selector, volume slider, victory screen).

### Public API

```javascript
/**
 * Initializes UI event listeners.
 * @param {Object} callbacks - Callback functions
 * @param {Function} callbacks.onDifficultyChange - (difficulty: string) => void
 * @param {Function} callbacks.onVolumeChange - (volume: number) => void
 * @param {Function} callbacks.onMuteToggle - () => void
 */
function initUI(callbacks);

/**
 * Updates difficulty button active state.
 * @param {string} difficulty - 'easy'|'medium'|'hard'
 */
function updateDifficultyDisplay(difficulty);

/**
 * Updates volume slider value.
 * @param {number} volume - Volume (0.0 to 1.0)
 */
function updateVolumeDisplay(volume);

/**
 * Shows victory overlay with completion time.
 * @param {string} time - Formatted time string (MM:SS)
 */
function showVictory(time);

/**
 * Hides victory overlay.
 */
function hideVictory();

/**
 * Updates timer display.
 * @param {string} time - Formatted time string
 */
function updateTimerDisplay(time);
```

### Example Usage

```javascript
import { initUI, showVictory } from './UIManager.js';

initUI({
  onDifficultyChange: (difficulty) => {
    gameState.setDifficulty(difficulty);
  },
  onVolumeChange: (volume) => {
    audioManager.setVolume(volume);
  },
  onMuteToggle: () => {
    const muted = !audioManager.isMuted();
    audioManager.setMuted(muted);
  }
});

// When player wins:
showVictory('03:42');
```

---

## 10. GameState Module

**File**: `js/GameState.js`

**Purpose**: Central state management with observer pattern.

### Public API

```javascript
/**
 * Creates initial game state.
 * @param {string} [difficulty='medium'] - Starting difficulty
 * @returns {GameState}
 */
function createGameState(difficulty);

/**
 * Initializes a new game at specified difficulty.
 * @param {GameState} state
 * @param {string} difficulty
 */
function initGame(state, difficulty);

/**
 * Resets game to start (same difficulty).
 * @param {GameState} state
 */
function resetGame(state);

/**
 * Changes difficulty and resets game.
 * @param {GameState} state
 * @param {string} difficulty
 */
function setDifficulty(state, difficulty);

/**
 * Checks if player has reached exit (victory condition).
 * @param {GameState} state
 * @returns {boolean} True if player won
 */
function checkVictory(state);

/**
 * Subscribes to state change events.
 * @param {GameState} state
 * @param {Function} observer - (event: string, data: any) => void
 */
function subscribe(state, observer);

/**
 * Notifies all observers of a state change.
 * @param {GameState} state
 * @param {string} event - Event name
 * @param {any} [data] - Event data
 */
function notify(state, event, data);
```

### Example Usage

```javascript
import { createGameState, checkVictory, subscribe } from './GameState.js';

const gameState = createGameState('medium');

subscribe(gameState, (event, data) => {
  switch (event) {
    case 'victory':
      showVictory(data.time);
      break;
    case 'difficultyChanged':
      updateDifficultyDisplay(data.difficulty);
      break;
  }
});

// In game loop:
if (checkVictory(gameState)) {
  audioManager.stopMusic();
  // Victory UI shown via observer
}
```

---

## 11. Config Module

**File**: `js/config.js`

**Purpose**: Game constants and configuration.

### Public API

```javascript
export const DIFFICULTY_CONFIG = {
  easy: { width: 15, height: 15 },
  medium: { width: 25, height: 25 },
  hard: { width: 40, height: 40 }
};

export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  TARGET_FPS: 60,
  FOG_OF_WAR_RADIUS: 5,
  AUTO_REPEAT_DELAY: 500,
  COLLISION_ANIM_DURATION: 200,
  DEFAULT_VOLUME: 0.7,
  SPRITE_FRAME_DURATION: 125
};

export const CELL_TYPES = {
  PATH: 0,
  WALL: 1
};

export const ANIMATION_STATES = {
  IDLE: 'idle',
  WALKING: 'walking',
  COLLISION: 'collision'
};
```

---

## 12. Utils Module

**File**: `js/utils.js`

**Purpose**: Shared utility functions.

### Public API

```javascript
/**
 * Generates random integer in range [min, max].
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random integer
 */
function randomInt(min, max);

/**
 * Calculates Chebyshev distance between two points.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number} Chebyshev distance
 */
function chebyshevDistance(x1, y1, x2, y2);

/**
 * Clamps a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number} Clamped value
 */
function clamp(value, min, max);

/**
 * Waits for an image to load.
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>}
 */
async function loadImage(src);

/**
 * Shuffles array in place (Fisher-Yates).
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array (same reference)
 */
function shuffle(array);
```

---

## Module Dependency Graph

```text
main.js
  ├── imports GameState
  ├── imports MazeGenerator
  ├── imports MazeRenderer
  ├── imports Player
  ├── imports InputHandler
  ├── imports AudioManager
  ├── imports AnimationManager
  ├── imports Timer
  ├── imports UIManager
  └── imports config

GameState
  ├── imports Timer
  ├── imports MazeGenerator
  └── imports Player

MazeGenerator
  └── imports utils

Player
  └── imports CollisionDetector

InputHandler
  (no dependencies)

CollisionDetector
  (no dependencies)

MazeRenderer
  └── imports utils (for chebyshevDistance)

AudioManager
  (no dependencies)

AnimationManager
  (no dependencies)

Timer
  (no dependencies)

UIManager
  (no dependencies)

config
  (no dependencies)

utils
  (no dependencies)
```

---

## Error Handling Contracts

All modules follow these error handling conventions:

1. **Input Validation**: Throw `Error` for invalid parameters (e.g., negative dimensions)
2. **Asset Loading**: Return `Promise` that rejects on load failure
3. **Runtime Errors**: Log to console, continue with fallback when possible
4. **User Feedback**: Use `UIManager` to show error messages to user

Example:

```javascript
// MazeGenerator.js
function generate(width, height) {
  if (width < 5 || height < 5) {
    throw new Error(`Invalid maze dimensions: ${width}x${height}`);
  }
  // ... generate maze
}

// AudioManager.js
async function loadSound(name, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // ... decode audio
  } catch (error) {
    console.error(`Failed to load sound ${name}:`, error);
    // Continue without sound (graceful degradation)
  }
}
```

---

## Summary

| Module | Exports | Dependencies | Testable |
|--------|---------|--------------|----------|
| MazeGenerator | generate(), validateMaze() | utils | ✅ Yes (unit test maze structure) |
| MazeRenderer | renderMaze(), renderPlayer() | utils | ⚠️ Manual (visual inspection) |
| Player | createPlayer(), movePlayer(), updateAnimation() | CollisionDetector | ✅ Yes (unit test movement logic) |
| InputHandler | initInputHandler(), updateInput() | - | ⚠️ Manual (keyboard interaction) |
| CollisionDetector | canMove(), getTargetPosition() | - | ✅ Yes (unit test collision cases) |
| AudioManager | playMusic(), playSoundEffect(), setVolume() | - | ⚠️ Manual (audio playback) |
| AnimationManager | update(), getCurrentFrame() | - | ✅ Yes (unit test frame cycling) |
| Timer | start(), stop(), formatTime() | - | ✅ Yes (unit test time calculation) |
| UIManager | initUI(), showVictory() | - | ⚠️ Manual (DOM manipulation) |
| GameState | initGame(), checkVictory(), subscribe() | many | ✅ Yes (unit test state transitions) |
| config | (constants) | - | N/A |
| utils | randomInt(), chebyshevDistance() | - | ✅ Yes (unit test utilities) |

All modules use ES6 module syntax (`import`/`export`).
