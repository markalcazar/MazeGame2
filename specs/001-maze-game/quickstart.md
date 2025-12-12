# Development Quickstart: Maze Game

**Feature**: Maze Game (001-maze-game)
**Last Updated**: 2025-12-08
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

## Table of Contents

1. [Getting Started](#getting-started)
2. [Jest Setup & TDD Workflow](#jest-setup--tdd-workflow)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Asset Requirements](#asset-requirements)
6. [Testing Procedures](#testing-procedures)
7. [Performance Profiling](#performance-profiling)
8. [Browser Compatibility](#browser-compatibility)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

**Required:**
- **Node.js 18+** or **Node.js 20+** (for running tests) - [Download](https://nodejs.org/)
- **npm 9+** (comes with Node.js)
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+)
- Text editor or IDE (VS Code, Sublime Text, WebStorm, etc.)

**Optional:**
- Git (for cloning the repository)
- Basic HTTP server for local development (recommended for testing)
- Chrome DevTools or equivalent for debugging and profiling

### Quick Setup (Automated)

**For new developers - use the automated setup script:**

```bash
# Clone the repository (or download and extract ZIP)
git clone <repository-url>
cd MazeGame2

# Run the automated setup script
node setup.js
```

**What the setup script does:**
1. ✅ Verifies Node.js 18+ is installed
2. ✅ Verifies npm is available
3. ✅ Validates package.json configuration
4. ✅ Installs all dependencies (Jest, @types/jest, jest-environment-jsdom)
5. ✅ Validates correct package versions
6. ✅ Verifies Jest is working correctly
7. ✅ Displays available npm commands

**Expected output:**
```
✓ Node.js 20.x.x is compatible
✓ npm is available
✓ package.json exists and is valid
✓ Dependencies installed successfully
✓ jest@29.7.0 installed
✓ @types/jest@29.5.14 installed
✓ jest-environment-jsdom@29.7.0 installed
✓ Jest is working correctly

✅ Setup completed successfully!
```

### Manual Setup (Alternative)

If you prefer manual setup or the automated script fails:

**1. Verify Node.js and npm:**
```bash
node --version   # Should show v18.x.x or v20.x.x
npm --version    # Should show 9.x.x or higher
```

**2. Install dependencies:**
```bash
npm install
```

**3. Verify installation:**
```bash
npm test   # Should show "No tests found" (expected at this stage)
```

**4. Verify all packages are installed:**
```bash
npm list jest @types/jest jest-environment-jsdom
```

Expected output:
```
maze-game@1.0.0
├── @types/jest@29.5.14
├── jest-environment-jsdom@29.7.0
└── jest@29.7.0
```

### Running the Game Locally

**Option 1: Direct File Opening (Quick Start)**

1. Clone or download the repository
2. Navigate to the project root directory
3. Double-click `index.html` to open in your default browser
4. Game should load and be playable immediately

**Option 2: Local HTTP Server (Recommended)**

Using Python (if installed):
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Using VS Code:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

Then navigate to `http://localhost:8000` in your browser.

**Why use a server?** Some browsers restrict local file access for security (CORS policies). A local server avoids these restrictions and provides a more production-like environment.

---

## Jest Setup & TDD Workflow

**This section provides step-by-step instructions for running unit tests and achieving the "green bar" with Jest.**

### Initial Setup

**1. Install Jest**:
```bash
npm init -y
npm install --save-dev jest @types/jest
```

**2. Configure Jest** - Create `jest.config.js` in project root:

See complete example: [examples/jest.config.js.example](examples/jest.config.js.example)

Key settings:
- `testEnvironment: 'jsdom'` - Browser-like environment
- Coverage excludes UI/rendering modules (tested manually)
- 80% coverage threshold on all metrics
- No transpilation needed (ES6+ modules)

**3. Update package.json** - Add test scripts:

See complete example: [examples/package.json.example](examples/package.json.example)

Key scripts:
- `npm test` - Run all tests
- `npm run test:watch` - Watch mode (great for TDD!)
- `npm run test:coverage` - Generate coverage report
- Must use `--experimental-vm-modules` flag for ES6 modules

### TDD Workflow: Red → Green → Refactor

**Example: Testing utils.js (following TDD)**

#### Step 1: 🔴 RED - Write Failing Test

Create `tests/utils.test.js` - See complete example: [examples/utils.test.js.example](examples/utils.test.js.example)

The test file includes:
- Tests for `randomInt()` - validates range and boundary conditions
- Tests for `chebyshevDistance()` - validates diagonal, horizontal, and same-position cases
- Tests for `clamp()` - validates clamping above max, below min, and within range
- Tests for `shuffle()` - validates array length preservation and element preservation

**Run the tests** - They MUST fail:
- Command: `npm test utils`
- Expected: Test suite fails (cannot find module)

✅ **This is GOOD!** You have failing tests. This is the RED phase.

#### Step 2: 🟢 GREEN - Implement to Pass

Create `js/utils.js` - See complete example: [examples/utils.js.example](examples/utils.js.example)

The implementation includes:
- `randomInt(min, max)` - Generates random integer in range
- `chebyshevDistance(x1, y1, x2, y2)` - Calculates max of absolute differences
- `clamp(value, min, max)` - Clamps value between bounds
- `shuffle(array)` - Fisher-Yates algorithm for shuffling
- `loadImage(src)` - Promise-based image loader

**Run the tests again**:
- Command: `npm test utils`
- Expected: All tests pass (10 tests, green checkmarks)

✅ **GREEN BAR!** All tests passing!

#### Step 3: 🔵 REFACTOR - Improve Code Quality

Now you can refactor with confidence. Tests will catch any regressions.

### Common Jest Commands

- `npm test` - Run all tests
- `npm run test:watch` - Watch mode (re-runs on file changes) - **GREAT for TDD!**
- `npm run test:coverage` - Generate coverage report
- `npm test utils` - Run specific test file
- `npm test -- -t "randomInt"` - Run specific test by name pattern
- `npm test -- -u` - Update snapshots (if using snapshot testing)
- `npm test -- --verbose` - Verbose mode
- `npm test -- --onlyFailures` - Run only failed tests

### Reading Test Output

**When tests PASS** (🟢 GREEN):
- Shows "PASS" with green checkmarks (✓) for each test
- Summary shows test suites passed, total tests passed
- Time elapsed displayed

**When tests FAIL** (🔴 RED):
- Shows "FAIL" with red crosses (✕) for failed tests
- Displays expected vs. received values
- Shows exact file location and line number of failure

**Coverage Report** (after `npm run test:coverage`):
- Table shows % Statements, % Branch, % Functions, % Lines
- Lists uncovered line numbers
- HTML report generated in `coverage/lcov-report/index.html`

✅ **Goal**: All percentages ≥ 80%

### Jest Troubleshooting

**Problem**: `Cannot use import statement outside a module`
**Solution**: Ensure `package.json` has `"type": "module"` and use the experimental VM modules flag in test scripts

**Problem**: `ReferenceError: document is not defined`
**Solution**: Change `testEnvironment` to `'jsdom'` in `jest.config.js`

**Problem**: Tests pass but coverage is below 80%
**Solution**: Add more test cases to cover edge cases and all code branches

**Problem**: `ELIFECYCLE` error on Windows
**Solution**: Use `npm test` instead of `npm run test`, or check Node.js version (need v14+)

### Tips for Getting to 80% Coverage

1. **Check uncovered lines**: Run `npm run test:coverage` and look at the table
2. **Open HTML report**: Coverage creates `coverage/lcov-report/index.html` - open in browser to see exactly which lines aren't covered
3. **Add edge case tests**: Test boundary conditions, null/undefined, empty arrays, etc.
4. **Test error paths**: Make sure to test `catch` blocks and error handling
5. **Use `describe.each` for parameterized tests**: Test multiple inputs efficiently

### Jest Best Practices

- **Run `npm run test:watch`** during development for instant feedback
- **Commit after each GREEN phase** (all tests passing)
- **Write tests FIRST** (RED), then minimal code to pass (GREEN), then refactor (REFACTOR)
- **Use `describe` blocks** to group related tests
- **Use meaningful test names** that describe the expected behavior
- **Test one thing per test** - if a test has multiple assertions testing different behaviors, split it
- **Mock external dependencies** (APIs, file system) to keep tests fast and deterministic

---

## Project Structure

```text
C:\Projects\MazeGame2\
├── index.html               # Main HTML file (entry point)
├── css/
│   └── styles.css           # Minimal CSS for layout and UI styling
├── js/
│   ├── main.js              # Game initialization and loop coordination
│   ├── config.js            # Constants (difficulty, colors, FPS)
│   ├── utils.js             # Shared utility functions
│   ├── MazeGenerator.js     # Maze generation algorithm
│   ├── MazeRenderer.js      # Canvas rendering for maze
│   ├── Player.js            # Player entity and logic
│   ├── InputHandler.js      # Keyboard input handling
│   ├── CollisionDetector.js # Wall collision detection
│   ├── AudioManager.js      # Audio playback management
│   ├── AnimationManager.js  # Sprite animation control
│   ├── Timer.js             # Game timer logic
│   ├── UIManager.js         # UI overlay controls
│   └── GameState.js         # Centralized state management
├── assets/
│   ├── audio/
│   │   ├── background-music.mp3   # Background music (looping)
│   │   ├── move-sound.mp3          # Movement sound effect
│   │   └── wall-hit.mp3            # Wall collision sound
│   └── sprites/
│       ├── mouse-spritesheet.png   # Animated mouse sprite
│       └── fireworks.png            # Victory fireworks (optional)
├── tests/                   # Optional unit tests
│   ├── MazeGenerator.test.js
│   └── CollisionDetector.test.js
└── specs/
    └── 001-maze-game/       # Feature documentation
        ├── spec.md
        ├── plan.md
        ├── research.md
        ├── data-model.md
        ├── quickstart.md (this file)
        └── contracts/
            └── module-contracts.md
```

### Module Responsibilities

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| `main.js` | Entry point, game loop coordination | `init()`, `gameLoop()` |
| `config.js` | Game constants and settings | Difficulty configs, colors, FPS target |
| `utils.js` | Shared utilities | `randomInt()`, `distance()`, DOM helpers |
| `MazeGenerator.js` | Maze generation (Recursive Backtracker) | `generate()`, `validateMaze()` |
| `MazeRenderer.js` | Canvas rendering (fog of war) | `render()`, `renderVictory()` |
| `Player.js` | Player state and movement | `movePlayer()`, `updateAnimation()` |
| `InputHandler.js` | Keyboard input (arrow keys) | `initInputHandler()`, `updateInput()` |
| `CollisionDetector.js` | Wall collision logic | `canMove()`, `getTargetPosition()` |
| `AudioManager.js` | Background music and SFX | `playMusic()`, `playSoundEffect()` |
| `AnimationManager.js` | Sprite animation frames | `update()`, `getCurrentFrame()` |
| `Timer.js` | Game timer (start/stop/reset) | `start()`, `getElapsed()` |
| `UIManager.js` | UI overlay (difficulty, volume) | `updateDifficulty()`, `showVictory()` |
| `GameState.js` | Central state management | `init()`, `checkVictory()`, `subscribe()` |

---

## Development Workflow

### 1. Code Style and Linting

**Recommended ESLint Configuration:**

See complete example: [examples/.eslintrc.json.example](examples/.eslintrc.json.example)

Create `.eslintrc.json` in project root with ESLint rules for:
- Browser environment with ES6
- 2-space indentation
- Single quotes, semicolons required
- Console allowed for debugging

**Run linting:** `npx eslint js/**/*.js`

### 2. Development Cycle

1. **Make changes** to JavaScript modules in `js/` directory
2. **Refresh browser** (or auto-reload with Live Server)
3. **Test manually** using the QA checklist (see [Testing Procedures](#testing-procedures))
4. **Profile performance** if needed (see [Performance Profiling](#performance-profiling))
5. **Commit changes** following constitution principles

### 3. Modular Development

Each module should:
- Export a single responsibility (e.g., `MazeGenerator` only generates mazes)
- Use JSDoc comments for public APIs
- Avoid side effects (state changes should go through `GameState`)
- Be testable independently

**Example module structure:**

See complete example: [examples/MazeGenerator.js.example](examples/MazeGenerator.js.example)

Each module should:
- Use JSDoc comments for function documentation
- Export single responsibility functions
- Follow consistent naming conventions

---

## Asset Requirements

### Audio Assets

**Required Files:**
- `assets/audio/background-music.mp3` - Looping background music (2-3 minutes, instrumental)
- `assets/audio/move-sound.mp3` - Short mouse movement sound (<200ms)
- `assets/audio/wall-hit.mp3` - Short wall collision sound (<200ms)

**Recommended Sources:**
- [OpenGameArt.org](https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=12) - CC0/CC-BY music
- [Freesound.org](https://freesound.org/) - CC0 sound effects
- [Incompetech](https://incompetech.com/music/royalty-free/) - Royalty-free music (attribution required)

**Audio Specifications:**
- Format: MP3 (for broad browser support)
- Background music: 128-192 kbps, 44.1 kHz, mono/stereo
- Sound effects: 96-128 kbps, 44.1 kHz, mono
- File size target: <2 MB per file (faster loading)

**Licensing:**
- Prefer **CC0 (Public Domain)** for no attribution required
- **CC-BY** acceptable (add attribution to index.html footer)
- Document all licenses in `assets/audio/LICENSE.txt`

### Sprite Assets

**Required Files:**
- `assets/sprites/mouse-spritesheet.png` - Animated mouse sprite sheet

**Sprite Sheet Layout:**
```
[idle-frame] [walk1] [walk2] [walk3] [walk4] [collision-frame]
```

**Specifications:**
- Format: PNG with transparency
- Frame size: 32x32 pixels (recommended)
- Layout: Horizontal strip (6 frames minimum)
- Animation frames:
  - **Idle**: Mouse standing still (1 frame)
  - **Walk cycle**: Legs alternating, tail swaying (3-4 frames)
  - **Collision**: Mouse recoiling/bouncing (1 frame)
  - **Blink**: Eyes closed variant (optional, 1 frame)

**Recommended Sources:**
- [Kenney.nl](https://kenney.nl/assets) - CC0 game assets
- [itch.io](https://itch.io/game-assets/free/tag-sprites) - Free sprites (various licenses)
- [OpenGameArt.org](https://opengameart.org/art-search-advanced?keys=mouse&field_art_type_tid%5B%5D=9) - Sprite art

**Tools for Custom Sprites:**
- [Piskel](https://www.piskelapp.com/) - Free online sprite editor
- [Aseprite](https://www.aseprite.org/) - Paid pixel art tool ($19.99)

**Victory Assets (Optional):**
- `assets/sprites/fireworks.png` - Fireworks sprite sheet for victory screen

---

## Testing Procedures

### Manual QA Checklist

Use this checklist before considering a feature complete:

#### User Story 1: Navigate Maze to Exit

- [ ] Mouse appears at starting position on game load
- [ ] 5-cell radius visibility around mouse (fog of war)
- [ ] Arrow key UP moves mouse up (if no wall)
- [ ] Arrow key DOWN moves mouse down (if no wall)
- [ ] Arrow key LEFT moves mouse left (if no wall)
- [ ] Arrow key RIGHT moves mouse right (if no wall)
- [ ] Mouse does NOT move through walls
- [ ] Fog of war reveals new areas as mouse moves
- [ ] Holding arrow key auto-repeats movement (500ms delay)
- [ ] Victory screen appears when mouse reaches exit
- [ ] Victory screen shows fireworks effect
- [ ] Victory screen shows "You Won" message
- [ ] Victory screen shows final elapsed time

#### User Story 2: Track Completion Time

- [ ] Timer displays 00:00 on game start
- [ ] Timer updates every second during gameplay
- [ ] Timer shows minutes:seconds format (MM:SS)
- [ ] Timer stops when maze is completed
- [ ] Final time is accurate (±1 second)

#### User Story 3: Maze Difficulty Levels

- [ ] Game defaults to Medium difficulty on load
- [ ] Easy difficulty generates 15x15 maze
- [ ] Medium difficulty generates 25x25 maze
- [ ] Hard difficulty generates 40x40 maze
- [ ] Difficulty can be changed mid-game via UI overlay
- [ ] Changing difficulty regenerates maze immediately
- [ ] Changing difficulty resets timer to 00:00
- [ ] Changing difficulty resets mouse to new start position

#### User Story 4: Sound Effects and Music

- [ ] Background music plays on game start
- [ ] Background music loops continuously
- [ ] Movement sound plays when mouse moves successfully
- [ ] Wall collision sound plays when mouse hits wall
- [ ] Volume slider adjusts all audio (music + SFX)
- [ ] Mute toggle silences all audio
- [ ] Unmute restores previous volume level
- [ ] Audio does NOT cause frame rate drops

#### User Story 5: Animations

- [ ] Mouse sprite animates during movement (legs, tail)
- [ ] Mouse eyes blink periodically
- [ ] Collision animation plays when hitting wall
- [ ] Collision animation shows mouse recoiling/bouncing
- [ ] All animations run at 60 FPS (smooth)
- [ ] Collision animation completes within 200ms

#### Performance and Edge Cases

- [ ] Maze generates in <1 second (all difficulties)
- [ ] Input response feels instant (<100ms)
- [ ] Game runs at 60 FPS minimum
- [ ] Rapid arrow key presses handled correctly
- [ ] Browser window resize keeps canvas centered
- [ ] Browser window resize maintains fixed canvas size
- [ ] Missing audio files show warning, game continues
- [ ] Missing sprite files show error or fallback

### Automated Unit Testing (Optional)

If using Jest or similar test framework:

**Install Jest:** `npm install --save-dev jest`

**Example test structure:**

See complete example: [examples/MazeGenerator.test.js.example](examples/MazeGenerator.test.js.example)

Tests should verify:
- Maze dimensions match input parameters
- Valid path exists from start to exit
- Start and exit positions are on path cells
- Grid uses correct cell type constants

**Run tests:** `npx jest`

**Note:** Automated testing is optional per constitution check (manual QA primary method for browser games).

---

## Performance Profiling

### Target Metrics

From [spec.md](spec.md) Success Criteria:

- **SC-002**: Maze generation <1 second (all difficulties)
- **SC-003**: Input response <100ms
- **SC-010**: Music plays without FPS drops below 60
- **SC-016**: Animations render at 60 FPS minimum
- **SC-017**: Collision animation <200ms

### Using Chrome DevTools

**1. Frame Rate Monitoring**

1. Open Chrome DevTools (F12)
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
3. Type "Show frames" and enable "Rendering > Frame Rendering Stats"
4. Play the game and observe FPS counter in top-right
5. **Target**: 60 FPS sustained, never below 30 FPS

**2. Performance Recording**

1. Open DevTools > Performance tab
2. Click Record button (circle)
3. Play game for 10-15 seconds (move mouse, trigger animations)
4. Stop recording
5. Analyze flame chart for slow functions

**Key areas to check:**
- `gameLoop()` should execute in <16ms per frame (60 FPS = 16.67ms per frame)
- `MazeRenderer.render()` should be fast (<5ms for fog of war rendering)
- `AudioManager` should NOT appear in main thread (runs on separate Web Audio thread)

**3. Memory Profiling**

1. DevTools > Memory tab
2. Take heap snapshot before playing
3. Play game, change difficulty 3-4 times
4. Take another heap snapshot
5. Compare snapshots for memory leaks

**Red flags:**
- Retained event listeners after difficulty change
- Unreleased AudioBufferSourceNode objects
- Growing arrays that should be fixed-size

**4. Network Tab (Asset Loading)**

1. DevTools > Network tab
2. Hard refresh page (Ctrl+Shift+R)
3. Check load times for assets:
   - Audio files: <1 second each
   - Sprite sheets: <500ms
   - Total page load: <3 seconds (SC-007)

### Performance Optimization Tips

**If FPS drops below 60:**
- Reduce fog of war calculations (cache visible tiles)
- Use offscreen canvas for static maze rendering
- Optimize sprite sheet decoding (smaller images)

**If maze generation is slow:**
- Profile `MazeGenerator.generate()` function
- Ensure recursive backtracker uses stack, not excessive function calls
- Consider iterative implementation for very large mazes

**If audio has latency:**
- Preload all audio during initialization
- Use `AudioContext.resume()` if autoplay blocked
- Check audio files are optimized (not excessively large)

---

## Browser Compatibility

### Target Browsers

Per [spec.md](spec.md) assumptions, support latest 2 versions of:

- Google Chrome (90+)
- Mozilla Firefox (88+)
- Apple Safari (14+)
- Microsoft Edge (90+)

### Testing Checklist

Test on each browser:

- [ ] Chrome: All features work, 60 FPS sustained
- [ ] Firefox: All features work, 60 FPS sustained
- [ ] Safari: All features work, audio plays correctly
- [ ] Edge: All features work, 60 FPS sustained

### Known Browser Differences

**Safari:**
- May require user interaction before playing audio (Web Audio API restriction)
- Solution: Add "Click to Start" button to initialize `AudioContext`

**Firefox:**
- requestAnimationFrame timing may differ slightly
- Solution: Use deltaTime for all animations, not fixed frame counts

**Edge:**
- Should behave identically to Chrome (both use Chromium engine)

### Polyfills (if needed)

For older browser support, consider:

```javascript
// Polyfill for requestAnimationFrame
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.msRequestAnimationFrame;

// Polyfill for AudioContext
window.AudioContext = window.AudioContext || window.webkitAudioContext;
```

**Note:** Polyfills NOT required for target browsers (latest 2 versions).

---

## Common Tasks

### Adding a New Difficulty Level

1. **Update config.js:**
   ```javascript
   const DIFFICULTY_SETTINGS = {
     easy: { gridSize: 15, label: 'Easy' },
     medium: { gridSize: 25, label: 'Medium' },
     hard: { gridSize: 40, label: 'Hard' },
     expert: { gridSize: 60, label: 'Expert' } // NEW
   };
   ```

2. **Update UIManager.js:**
   - Add "Expert" button to difficulty selector UI

3. **Test:**
   - Verify 60x60 maze generates in <1 second
   - Verify fog of war performance at 60 FPS
   - Update spec.md if this becomes permanent

### Adding a New Sound Effect

1. **Add audio file:**
   - Place MP3 in `assets/audio/` (e.g., `victory-sound.mp3`)

2. **Update AudioManager.js:**
   ```javascript
   await audioManager.loadSound('victory', 'assets/audio/victory-sound.mp3');
   ```

3. **Play sound in GameState.js:**
   ```javascript
   checkVictory(state) {
     if (state.player.x === state.maze.exit.x &&
         state.player.y === state.maze.exit.y) {
       state.audioSettings.manager.playSoundEffect('victory');
       // ... rest of victory logic
     }
   }
   ```

### Adding a New Animation State

1. **Update AnimationManager.js:**
   ```javascript
   const animations = {
     idle: { startFrame: 0, frameCount: 1 },
     walking: { startFrame: 1, frameCount: 4 },
     collision: { startFrame: 5, frameCount: 1 },
     celebrating: { startFrame: 6, frameCount: 3 } // NEW
   };
   ```

2. **Update Player.js:**
   ```javascript
   if (state.isVictory) {
     player.animationState = 'celebrating';
   }
   ```

3. **Update sprite sheet:**
   - Add 3 new frames to `mouse-spritesheet.png` (frames 6-8)

### Debugging Collision Detection

**Enable debug rendering in MazeRenderer.js:**

```javascript
function render(maze, player, ctx, debugMode = false) {
  // Normal rendering...

  if (debugMode) {
    // Draw collision boxes
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    const targetPos = getTargetPosition(player.x, player.y, player.direction);
    const cellSize = 32;
    ctx.strokeRect(targetPos.x * cellSize, targetPos.y * cellSize, cellSize, cellSize);
  }
}
```

**Enable in main.js:**
```javascript
const DEBUG_MODE = true; // Set to false for production
mazeRenderer.render(state.maze, state.player, ctx, DEBUG_MODE);
```

### Changing Fog of War Radius

**Update config.js:**
```javascript
const FOG_OF_WAR_RADIUS = 7; // Increase from 5 to 7
```

**Update MazeRenderer.js:**
```javascript
import { FOG_OF_WAR_RADIUS } from './config.js';

function isVisible(playerX, playerY, tileX, tileY) {
  const dx = Math.abs(playerX - tileX);
  const dy = Math.abs(playerY - tileY);
  return Math.max(dx, dy) <= FOG_OF_WAR_RADIUS;
}
```

**Test impact on performance** (larger radius = more tiles rendered per frame).

---

## Troubleshooting

### Issue: Audio doesn't play on Safari

**Cause:** Safari blocks autoplay audio until user interaction.

**Solution:**
```javascript
// In main.js
function initGame() {
  // Show "Click to Start" button
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', async () => {
    await audioManager.context.resume();
    audioManager.playMusic();
    startButton.style.display = 'none';
  });
}
```

### Issue: FPS drops below 60 during gameplay

**Diagnosis:**
1. Open Chrome DevTools > Performance
2. Record 10 seconds of gameplay
3. Identify slow functions in flame chart

**Common causes:**
- Rendering entire maze instead of only visible tiles
- Creating new sprite objects every frame (should cache)
- Excessive DOM manipulation in UIManager

**Solutions:**
- Optimize `MazeRenderer.render()` to only draw visible tiles
- Cache sprite frames in `AnimationManager`
- Batch DOM updates in `UIManager`

### Issue: Maze generation takes >1 second on Hard difficulty

**Diagnosis:**
```javascript
console.time('Maze Generation');
const maze = mazeGenerator.generate(40, 40);
console.timeEnd('Maze Generation');
```

**Common causes:**
- Recursive backtracker causing stack overflow
- Excessive validation checks during generation
- Inefficient random number generation

**Solutions:**
- Convert recursive algorithm to iterative (use explicit stack)
- Remove unnecessary validation inside generation loop
- Use `Math.random()` directly, avoid wrapper functions

### Issue: Collision detection allows walking through walls

**Diagnosis:**
1. Enable debug mode (see [Debugging Collision Detection](#debugging-collision-detection))
2. Visually inspect collision boxes
3. Add console logging to `CollisionDetector.canMove()`:

```javascript
function canMove(maze, fromX, fromY, direction) {
  const target = getTargetPosition(fromX, fromY, direction);
  console.log('Checking move:', { fromX, fromY, direction, target });
  console.log('Cell value:', maze.grid[target.y][target.x]);
  return maze.grid[target.y][target.x] === 0; // 0 = path, 1 = wall
}
```

**Common causes:**
- X/Y coordinate swap (grid[y][x] vs grid[x][y])
- Off-by-one errors in boundary checks
- Direction calculation reversed

### Issue: Timer displays incorrect time

**Diagnosis:**
```javascript
// In Timer.js
getElapsed() {
  const elapsed = Date.now() - this.startTime;
  console.log('Elapsed ms:', elapsed);
  console.log('Formatted:', this.formatTime(elapsed));
  return this.formatTime(elapsed);
}
```

**Common causes:**
- `Date.now()` not in milliseconds (it is, but verify calculation)
- Formatting function has bug (minutes vs seconds swap)
- Timer not stopped on victory (keeps counting)

---

## Additional Resources

- **Specification**: [spec.md](spec.md)
- **Implementation Plan**: [plan.md](plan.md)
- **Technical Research**: [research.md](research.md)
- **Data Model**: [data-model.md](data-model.md)
- **Module Contracts**: [contracts/module-contracts.md](contracts/module-contracts.md)

### External Documentation

- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN: Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [Maze Generation Algorithms](https://en.wikipedia.org/wiki/Maze_generation_algorithm)

### Support

For issues or questions:
1. Review troubleshooting section above
2. Check module contracts for API documentation
3. Review research.md for technical decision rationale
4. Profile performance with Chrome DevTools

---

**Last Updated**: 2025-12-08
**Version**: 1.0
**Status**: Phase 1 Complete
