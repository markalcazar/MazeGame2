# Implementation Plan: Maze Game

**Branch**: `001-maze-game` | **Date**: 2025-12-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-maze-game/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

A browser-based maze navigation game where a player controls a mouse/rat character through a randomly generated maze using arrow keys. The game features fog of war visibility (5-cell radius), three difficulty levels (Easy: 15x15, Medium: 25x25, Hard: 40x40), background music with sound effects, smooth sprite animations, and a victory screen upon maze completion. The implementation uses vanilla HTML5, JavaScript (ES6+), and Canvas API for rendering, with a modular architecture for maintainability.

## Technical Context

**Language/Version**: JavaScript ES6+ (targeting modern browsers: Chrome, Firefox, Safari, Edge latest 2 versions)
**Primary Dependencies**:
- None for runtime (vanilla JavaScript)
- HTML5 Canvas API (built-in)
- Web Audio API (built-in)
- Jest or Vitest (dev dependency for unit testing)

**Storage**: None (no persistence required - in-memory game state only)

**Testing**:
- **REQUIRED**: Unit tests with 80% branch coverage for core logic (Jest or Vitest framework)
- **REQUIRED**: Manual QA checklist for UI/rendering/audio/gameplay integration
- Test modules: MazeGenerator, CollisionDetector, Timer, AnimationManager, Player, utils

**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions), Desktop/Laptop with keyboard input

**Project Type**: Single-page web application (standalone HTML + JavaScript)

**Performance Goals**:
- 60 FPS minimum for gameplay and animations
- <100ms input response time
- <1 second maze generation for all difficulty levels
- <3 seconds initial page load

**Constraints**:
- Fixed 800x600px canvas size (centered in window)
- No mobile/touch support required
- No server-side components
- All assets loaded from local files/CDN
- <50ms audio latency for sound effects

**Scale/Scope**:
- Single HTML file (index.html)
- ~8-10 JavaScript modules (<4KB per file)
- 3-5 audio files (background music, sound effects)
- Mouse sprite animation frames (sprite sheet)
- Estimated total codebase: ~2000-3000 lines of JavaScript

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

### Principle I: Code Quality

- ✅ **Readability First**: Modules will use descriptive names (MazeGenerator, CollisionDetector, AudioManager)
- ✅ **Single Responsibility**: Each module has one clear purpose (maze generation, rendering, input handling)
- ✅ **DRY**: Common utilities (randomInt, distance calculation) extracted to utils.js
- ✅ **Consistent Style**: ESLint configuration for JavaScript code style enforcement
- ✅ **Meaningful Comments**: JSDoc comments for public APIs, inline comments for "why" not "what"

### Principle II: Testing Standards

- ✅ **Test Coverage**: 80% branch coverage required for critical modules (MazeGenerator, CollisionDetector, Timer, AnimationManager, Player logic). Manual testing for UI/rendering.
- ✅ **Test Types**: Unit tests REQUIRED for all core logic modules. Manual integration testing via gameplay for UI/Canvas rendering.
- ✅ **Test Quality**: All automated tests must be deterministic (fixed seeds for maze generation)
- ✅ **Test Naming**: Follow pattern `test_[module]_[scenario]_[outcome]` for all test files
- ✅ **Test Maintenance**: No flaky tests tolerated

**TESTING APPROACH**: Unit tests are REQUIRED (not optional) for core game logic to ensure correctness and prevent regressions. Test framework: Jest or similar. Manual QA checklist validates UI/rendering/audio aspects that are expensive to automate.

### Principle III: User Experience Consistency

- ✅ **Visual Consistency**: Fixed color palette, consistent UI overlay styling
- ✅ **Interaction Patterns**: Arrow keys for movement, clickable buttons for difficulty/volume
- ✅ **Feedback**: <100ms response for all inputs (movement, button clicks, volume slider)
- ✅ **Error Handling**: Asset load failures show user-friendly messages, game continues with fallbacks
- ⚠️ **Accessibility**: Keyboard navigation supported. Screen reader support limited (game is visual)

**JUSTIFICATION FOR ⚠️**: Game mechanics require visual perception of maze. Full screen reader support would require alternative gameplay mode (out of scope). Keyboard accessibility fully supported.

### Principle IV: Performance Requirements

- ✅ **Responsiveness**: 60 FPS target, <100ms input response achieved via requestAnimationFrame
- ✅ **Resource Efficiency**: No memory leaks (proper cleanup on difficulty change, careful event listener management)
- ✅ **Frame Rate**: 60 FPS minimum enforced, <30 FPS triggers visible warning to player
- ⚠️ **Load Testing**: N/A for single-player browser game
- ✅ **Optimization**: Performance profiling with Chrome DevTools, identified bottlenecks addressed

**JUSTIFICATION FOR ⚠️**: Load testing not applicable - single-player game with no concurrent users or server.

### Quality Gates

✅ **All tests pass**: REQUIRED unit tests (80% coverage on core logic) + Manual QA checklist
✅ **Linting passes**: ESLint with zero errors/warnings
✅ **Build succeeds**: No build step required (vanilla JS), file validation only
✅ **No performance regression**: Maintain 60 FPS on target browsers
✅ **Documentation**: JSDoc for public module APIs
✅ **Test coverage**: 80% branch coverage on MazeGenerator, CollisionDetector, Timer, AnimationManager, Player, utils

### Gate Status: **PASSED**

## Project Structure

### Documentation (this feature)

```text
specs/001-maze-game/
├── plan.md              # This file
├── research.md          # Phase 0: Technology decisions and patterns
├── data-model.md        # Phase 1: Game state and entities
├── quickstart.md        # Phase 1: How to run and develop
├── contracts/           # Phase 1: Module interfaces (JSDoc definitions)
│   └── module-contracts.md
├── examples/            # Code examples (referenced by quickstart.md)
│   ├── .eslintrc.json.example
│   ├── jest.config.js.example
│   ├── MazeGenerator.js.example
│   ├── MazeGenerator.test.js.example
│   ├── package.json.example
│   ├── utils.js.example
│   └── utils.test.js.example
└── tasks.md             # Phase 2: Implementation task list
```

### Source Code (repository root)

```text
index.html               # Main HTML file with canvas and UI overlay

js/
├── main.js              # Entry point: initialization, game loop coordination
├── config.js            # Game constants (difficulty settings, colors, FPS target)
├── utils.js             # Shared utilities (random, math helpers, DOM helpers)
├── MazeGenerator.js     # Maze generation using depth-first search or Prim's algorithm
├── MazeRenderer.js      # Canvas rendering for maze (walls, floor, fog of war)
├── Player.js            # Mouse/rat character (position, state, animations)
├── InputHandler.js      # Keyboard input (arrow keys, auto-repeat handling)
├── CollisionDetector.js # Wall collision detection logic
├── AudioManager.js      # Background music and sound effects playback
├── AnimationManager.js  # Sprite animation frames (legs, tail, eyes, collision)
├── Timer.js             # Game timer (start, stop, reset, format display)
├── UIManager.js         # UI overlay (difficulty selector, volume controls, victory screen)
└── GameState.js         # Central game state management (current difficulty, maze, player, timer)

assets/
├── audio/
│   ├── background-music.mp3   # Looping background music
│   ├── move-sound.mp3          # Mouse movement sound effect
│   └── wall-hit.mp3            # Wall collision sound effect
└── sprites/
    ├── mouse-spritesheet.png   # Animated mouse sprite frames
    └── fireworks.png            # Victory fireworks sprite (optional)

css/
└── styles.css           # Minimal CSS for canvas centering and UI overlay styling

tests/                   # Optional: Unit tests for core logic
├── MazeGenerator.test.js
└── CollisionDetector.test.js
```

**Structure Decision**: Single-page web application using vanilla HTML5 + JavaScript. All game logic runs client-side in the browser. Modular JavaScript files organized by responsibility (generation, rendering, input, audio, etc.). Fixed 800x600px canvas centered with CSS. No build tooling required - direct browser execution.

## Complexity Tracking

| Complexity | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Unit testing with Jest/Vitest | Ensure correctness and prevent regressions in core logic | Pure manual testing would miss edge cases and regressions. Unit tests required for 80% coverage on MazeGenerator, CollisionDetector, Timer, AnimationManager, Player, utils. |
| No E2E testing for UI/Canvas | Browser game with Canvas rendering and animations | E2E testing tools (Playwright/Cypress) add significant complexity for UI/rendering tests. Manual QA with spec checklist more efficient for visual/audio validation. |
| 12 JavaScript modules | Clean separation of concerns per Constitution Principle I | Combining modules (e.g., Player + AnimationManager) creates >50 line functions and violates Single Responsibility. Current split keeps each module focused and testable. |

## Phase 0: Research & Technical Decisions

See [research.md](research.md) for detailed research findings.

**Key Decisions**:
1. **Maze Generation Algorithm**: Use Recursive Backtracker (Depth-First Search) for guaranteed perfect mazes
2. **Animation Technique**: Sprite sheets with frame cycling at 60 FPS using requestAnimationFrame
3. **Audio Management**: Web Audio API with AudioContext for precise timing and volume control
4. **Fog of War**: Render only tiles within 5-cell Chebyshev distance (max(|dx|, |dy|) ≤ 5)
5. **State Management**: Centralized GameState object with observer pattern for UI updates

## Phase 1: Design Artifacts

### Data Model
See [data-model.md](data-model.md) for complete entity definitions.

**Core Entities**:
- **Maze**: 2D grid array, start/exit positions, difficulty metadata
- **Player**: position (x, y), direction, animation state, movement timestamp
- **Timer**: startTime, elapsedSeconds, isRunning
- **AudioSettings**: masterVolume (0-1), isMuted, AudioContext reference
- **GameState**: maze, player, timer, difficulty, audioSettings, isVictory

### Module Contracts
See [contracts/module-contracts.md](contracts/module-contracts.md) for detailed API specifications.

**Module Responsibilities**:
- **MazeGenerator**: `generate(width, height) → Maze`
- **MazeRenderer**: `render(maze, player, ctx) → void`
- **Player**: `move(direction) → boolean`, `animate(deltaTime) → void`
- **InputHandler**: `onKeyDown(event) → void`, `onKeyUp(event) → void`
- **CollisionDetector**: `canMove(maze, player, direction) → boolean`
- **AudioManager**: `playMusic()`, `playSoundEffect(type)`, `setVolume(level)`
- **AnimationManager**: `update(deltaTime) → void`, `getCurrentFrame() → Frame`
- **Timer**: `start()`, `stop()`, `reset()`, `getElapsed() → string`
- **UIManager**: `updateDifficulty(level)`, `updateVolume(value)`, `showVictory(time)`
- **GameState**: `init()`, `reset()`, `setDifficulty(level)`, `checkVictory() → boolean`

### Development Quickstart
See [quickstart.md](quickstart.md) for setup and development workflow.

## Phase 2: Task Decomposition

**NOT CREATED BY THIS COMMAND** - Use `/speckit.tasks` to generate implementation tasks.

## Notes

- No external dependencies or build tools required
- All code runs directly in browser (no transpilation needed for ES6+ in modern browsers)
- Asset files must be sourced or created separately (background music, sound effects, mouse sprite)
- Consider using free/open-source assets from OpenGameArt.org or similar
- Test on all target browsers (Chrome, Firefox, Safari, Edge) before considering complete
