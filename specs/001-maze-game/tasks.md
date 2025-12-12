# Tasks: Maze Game

**Input**: Design documents from `/specs/001-maze-game/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests are REQUIRED for core logic modules with 80% branch coverage (Jest/Vitest). Manual QA testing validates UI/rendering/audio integration.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

This is a single-page web application with vanilla JavaScript:
- **HTML**: `index.html` at repository root
- **JavaScript modules**: `js/` directory
- **CSS**: `css/` directory
- **Assets**: `assets/audio/` and `assets/sprites/`
- **Optional tests**: `tests/` directory

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic file structure

- [ ] T001 Create directory structure: js/, css/, assets/audio/, assets/sprites/, tests/
- [ ] T002 [P] Create index.html with canvas element and UI overlay containers
- [ ] T003 [P] Create css/styles.css for canvas centering and UI styling
- [ ] T004 [P] Initialize package.json and install Jest or Vitest for unit testing
- [ ] T005 [P] Configure test framework (jest.config.js or vitest.config.js) with coverage thresholds (80% branch coverage)
- [ ] T006 [P] Create placeholder for assets (document required audio/sprite files in README or quickstart)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities and configuration that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 [P] Create js/config.js with DIFFICULTY_CONFIG, GAME_CONFIG, CELL_TYPES, ANIMATION_STATES constants
- [ ] T008 [P] Implement js/utils.js with randomInt(), chebyshevDistance(), clamp(), loadImage(), shuffle() functions
- [ ] T009 [P] Create js/Timer.js module with createTimer(), start(), stop(), reset(), getElapsedSeconds(), formatTime() functions
- [ ] T010 [P] Create js/CollisionDetector.js module with canMove(), getTargetPosition(), isInBounds() functions
- [ ] T011 [P] Write unit tests for js/utils.js in tests/utils.test.js (80% coverage): test randomInt, chebyshevDistance, clamp, shuffle
- [ ] T012 [P] Write unit tests for js/Timer.js in tests/Timer.test.js (80% coverage): test start, stop, reset, elapsed time calculation
- [ ] T013 [P] Write unit tests for js/CollisionDetector.js in tests/CollisionDetector.test.js (80% coverage): test wall collision, boundaries, all directions

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Navigate Maze to Exit (Priority: P1) 🎯 MVP

**Goal**: Player can navigate a randomly generated maze using arrow keys with fog of war, from start to exit, triggering victory screen

**Independent Test**: Launch game, use arrow keys to move mouse through maze (fog of war reveals tiles), reach exit, verify victory screen displays with "You Won" and elapsed time

### Implementation for User Story 1

**Maze Generation & Rendering**

- [ ] T014 [P] [US1] Implement js/MazeGenerator.js with generate(width, height) using Recursive Backtracker algorithm and validateMaze() function
- [ ] T015 [P] [US1] Implement js/MazeRenderer.js with renderMaze(), renderPlayer(), gridToPixel(), and fog of war logic (Chebyshev distance <= 5)

**Player & Input**

- [ ] T016 [P] [US1] Implement js/Player.js with createPlayer(), movePlayer(), updateAnimation(), setAnimationState() functions
- [ ] T017 [P] [US1] Implement js/InputHandler.js with initInputHandler(), updateInput() for arrow key handling and auto-repeat (500ms delay)

**State Management**

- [ ] T018 [US1] Implement js/GameState.js with createGameState(), initGame(), resetGame(), setDifficulty(), checkVictory(), subscribe(), notify() functions (depends on T007, T014, T016)

**UI Management**

- [ ] T019 [US1] Implement js/UIManager.js with initUI(), showVictory(), hideVictory(), updateTimerDisplay() functions for victory overlay
- [ ] T020 [US1] Add victory screen HTML elements to index.html (hidden by default): fireworks container, "You Won" text, time display
- [ ] T021 [US1] Add victory screen CSS to css/styles.css: fireworks animation, overlay styling, centered text

**Main Game Loop**

- [ ] T022 [US1] Implement js/main.js with init(), gameLoop() using requestAnimationFrame, integrate all modules for basic gameplay (depends on T014-T019)
- [ ] T023 [US1] Wire up input handlers to player movement in main.js game loop
- [ ] T024 [US1] Wire up victory detection and UI updates in main.js game loop
- [ ] T025 [US1] Add canvas-based fireworks animation for victory screen (simple particle system or find lightweight library)

**Testing & Validation**

- [ ] T026 [US1] Manual QA: Verify maze generates with valid path (15x15 medium default)
- [ ] T027 [US1] Manual QA: Verify arrow keys move mouse (up/down/left/right)
- [ ] T028 [US1] Manual QA: Verify collision detection prevents walking through walls
- [ ] T029 [US1] Manual QA: Verify fog of war reveals 5-cell radius around mouse
- [ ] T030 [US1] Manual QA: Verify holding arrow key auto-repeats movement at 500ms intervals
- [ ] T031 [US1] Manual QA: Verify victory screen displays on reaching exit
- [ ] T032 [US1] Manual QA: Verify timer displays and counts up during gameplay
- [ ] T033 [US1] Manual QA: Verify final time shown on victory screen

**Required Unit Tests (80% Coverage)**

- [ ] T034 [P] [US1] Write unit tests for js/MazeGenerator.js in tests/MazeGenerator.test.js (80% coverage): test generate() dimensions, start/exit positions, grid structure, validateMaze() solvability
- [ ] T035 [P] [US1] Write unit tests for js/Player.js in tests/Player.test.js (80% coverage): test createPlayer(), movePlayer() with various maze configurations, animation state transitions
- [ ] T036 [P] [US1] Write unit tests for js/GameState.js in tests/GameState.test.js (80% coverage): test initGame(), checkVictory(), setDifficulty(), observer pattern

**Checkpoint**: At this point, User Story 1 should be fully functional - player can navigate maze and win

---

## Phase 4: User Story 2 - Track Completion Time (Priority: P2)

**Goal**: Timer continuously displays elapsed time (MM:SS format) during gameplay and final time on victory

**Independent Test**: Start game, observe timer counting from 00:00, play through maze, verify timer stops on victory and final time is displayed

**Note**: Timer module already implemented in Phase 2 (T007). This phase focuses on UI integration and display updates.

### Implementation for User Story 2

- [ ] T037 [US2] Add timer display HTML element to index.html UI overlay (visible during gameplay)
- [ ] T038 [US2] Add timer display CSS styling to css/styles.css (positioned top-center or top-right)
- [ ] T039 [US2] Update js/UIManager.js to include updateTimerDisplay(time) function if not already present
- [ ] T040 [US2] Update js/main.js game loop to call updateTimerDisplay() each frame with formatted time
- [ ] T041 [US2] Verify timer starts when maze loads and stops on victory in GameState.checkVictory()

**Testing & Validation**

- [ ] T042 [US2] Manual QA: Verify timer displays 00:00 on game start
- [ ] T043 [US2] Manual QA: Verify timer updates every second during gameplay
- [ ] T044 [US2] Manual QA: Verify timer format is MM:SS (e.g., "02:34")
- [ ] T045 [US2] Manual QA: Verify timer stops when player reaches exit
- [ ] T046 [US2] Manual QA: Verify final time is accurate (±1 second) on victory screen

**Checkpoint**: Timer is now fully integrated and visible throughout gameplay

---

## Phase 5: User Story 3 - Maze Difficulty Levels (Priority: P2)

**Goal**: Players can select Easy (15x15), Medium (25x25), or Hard (40x40) difficulty via in-game UI. Changing difficulty immediately regenerates maze and resets timer.

**Independent Test**: Start game on Medium, navigate partially, switch to Hard via UI button, verify new 40x40 maze generates, timer resets to 00:00, mouse returns to start position

### Implementation for User Story 3

- [ ] T047 [US3] Add difficulty selector HTML buttons to index.html UI overlay (Easy/Medium/Hard)
- [ ] T048 [US3] Add difficulty selector CSS to css/styles.css (button styling, active state highlighting)
- [ ] T049 [US3] Update js/UIManager.js with updateDifficultyDisplay(difficulty) to highlight active button
- [ ] T050 [US3] Wire up difficulty buttons to onDifficultyChange callback in js/UIManager.initUI()
- [ ] T051 [US3] Update js/main.js to handle difficulty changes: call GameState.setDifficulty(), regenerate maze, reset timer
- [ ] T052 [US3] Ensure js/GameState.setDifficulty() calls initGame() with new difficulty and notifies observers

**Testing & Validation**

- [ ] T053 [US3] Manual QA: Verify game defaults to Medium (25x25) on load
- [ ] T054 [US3] Manual QA: Verify clicking Easy generates 15x15 maze
- [ ] T055 [US3] Manual QA: Verify clicking Medium generates 25x25 maze
- [ ] T056 [US3] Manual QA: Verify clicking Hard generates 40x40 maze
- [ ] T057 [US3] Manual QA: Verify changing difficulty mid-game immediately regenerates maze
- [ ] T058 [US3] Manual QA: Verify timer resets to 00:00 on difficulty change
- [ ] T059 [US3] Manual QA: Verify mouse returns to start position on difficulty change
- [ ] T060 [US3] Manual QA: Verify all difficulty mazes generate in <1 second
- [ ] T061 [US3] Manual QA: Verify active difficulty button is visually highlighted

**Checkpoint**: Difficulty selection is fully functional with immediate feedback

---

## Phase 6: User Story 4 - Sound Effects and Music (Priority: P2)

**Goal**: Background music plays during gameplay, sound effects trigger on mouse movement and wall collisions. Players can adjust master volume with slider and toggle mute.

**Independent Test**: Start game, hear background music looping. Move mouse, hear movement sound. Hit wall, hear collision sound. Adjust volume slider, verify all audio changes. Toggle mute, verify silence. Unmute, verify audio resumes at previous volume.

### Asset Acquisition (Required Before Implementation)

- [ ] T062 [US4] Acquire/create assets/audio/background-music.mp3 (2-3 min looping instrumental, CC0 or CC-BY license)
- [ ] T063 [US4] Acquire/create assets/audio/move-sound.mp3 (<200ms mouse shuffle/scurry sound, CC0 or CC-BY license)
- [ ] T064 [US4] Acquire/create assets/audio/wall-hit.mp3 (<200ms collision/thud sound, CC0 or CC-BY license)
- [ ] T065 [US4] Document audio asset licenses in assets/audio/LICENSE.txt

### Implementation for User Story 4

- [ ] T066 [US4] Implement js/AudioManager.js with createAudioManager(), loadSound(), playMusic(), stopMusic(), playSoundEffect(), setVolume(), setMuted(), getVolume() using Web Audio API
- [ ] T067 [US4] Add volume slider and mute toggle HTML elements to index.html UI overlay
- [ ] T068 [US4] Add volume controls CSS to css/styles.css (slider styling, mute button)
- [ ] T069 [US4] Update js/UIManager.js with updateVolumeDisplay(volume) function
- [ ] T070 [US4] Wire up volume controls to onVolumeChange and onMuteToggle callbacks in js/UIManager.initUI()
- [ ] T071 [US4] Update js/main.js init() to create AudioManager, load all 3 sounds, start background music (handle Safari autoplay restrictions with user interaction)
- [ ] T072 [US4] Update js/InputHandler.js or js/main.js to call audioManager.playSoundEffect('move-sound') on successful movement
- [ ] T073 [US4] Update js/InputHandler.js or js/main.js to call audioManager.playSoundEffect('wall-hit') on wall collision
- [ ] T074 [US4] Wire up GameState observers to stop music on victory

**Testing & Validation**

- [ ] T075 [US4] Manual QA: Verify background music plays on game start and loops continuously
- [ ] T076 [US4] Manual QA: Verify movement sound plays when mouse moves successfully
- [ ] T077 [US4] Manual QA: Verify wall collision sound plays when mouse hits wall
- [ ] T078 [US4] Manual QA: Verify volume slider adjusts all audio (music + SFX) immediately (<100ms)
- [ ] T079 [US4] Manual QA: Verify mute toggle silences all audio instantly (<50ms)
- [ ] T080 [US4] Manual QA: Verify unmute restores previous volume level
- [ ] T081 [US4] Manual QA: Verify audio plays without frame rate drops (maintain 60 FPS)
- [ ] T082 [US4] Manual QA: Verify sound effects play with <50ms latency
- [ ] T083 [US4] Manual QA: Verify audio handles Safari autoplay restrictions (shows "Click to Start" if needed)
- [ ] T084 [US4] Manual QA: Verify game continues if audio files fail to load (graceful degradation with console warning)

**Checkpoint**: Audio is fully integrated with volume controls and graceful failure handling

---

## Phase 7: User Story 5 - Animations (Priority: P2)

**Goal**: Mouse sprite displays smooth animations during movement (legs alternating, tail swaying, eyes blinking) at 60 FPS. Collision animation (recoiling/bouncing) plays when hitting walls, completing within 200ms.

**Independent Test**: Move mouse through maze, observe animated legs/tail/eyes. Hit wall, observe brief recoil/bounce animation. Verify all animations run smoothly at 60 FPS.

### Asset Acquisition (Required Before Implementation)

- [ ] T085 [US5] Acquire/create assets/sprites/mouse-spritesheet.png: horizontal sprite sheet with frames: [idle, walk1, walk2, walk3, walk4, collision] (32x32px frames, PNG with transparency, CC0 or CC-BY license)
- [ ] T086 [US5] Document sprite asset license in assets/sprites/LICENSE.txt
- [ ] T087 [US5] Optional: Acquire/create assets/sprites/fireworks.png for enhanced victory animation (if not using canvas-based particles)

### Implementation for User Story 5

- [ ] T088 [US5] Implement js/AnimationManager.js with createAnimationManager(), update(deltaTime), getCurrentFrame(), setAnimation(), reset() functions for sprite sheet cycling
- [ ] T089 [US5] Update js/main.js init() to load mouse-spritesheet.png and create AnimationManager with animation definitions (idle, walking, collision)
- [ ] T090 [US5] Update js/Player.js to track animationState ('idle', 'walking', 'collision') and update sprite frame index
- [ ] T091 [US5] Update js/MazeRenderer.js renderPlayer() to use AnimationManager.getCurrentFrame() for drawing correct sprite frame
- [ ] T092 [US5] Update js/InputHandler.js or js/main.js to set player.animationState = 'walking' on movement, 'collision' on wall hit, 'idle' when stopped
- [ ] T093 [US5] Implement collision animation timing in js/Player.js: collision state lasts 200ms then returns to idle
- [ ] T094 [US5] Add eye blink logic to js/AnimationManager.js or js/Player.js: periodic blinking during idle/walking states
- [ ] T095 [US5] Update js/main.js game loop to call animationManager.update(deltaTime) each frame

**Testing & Validation**

- [ ] T096 [US5] Manual QA: Verify mouse sprite displays idle frame when stationary
- [ ] T097 [US5] Manual QA: Verify walking animation cycles through leg frames when moving
- [ ] T098 [US5] Manual QA: Verify tail sways during movement (visible in sprite frames)
- [ ] T099 [US5] Manual QA: Verify eyes blink periodically during gameplay
- [ ] T100 [US5] Manual QA: Verify collision animation (recoil/bounce) plays when hitting wall
- [ ] T101 [US5] Manual QA: Verify collision animation completes within 200ms
- [ ] T102 [US5] Manual QA: Verify collision animation does not block subsequent player input
- [ ] T103 [US5] Manual QA: Verify all animations render at 60 FPS minimum (no frame drops)
- [ ] T104 [US5] Manual QA: Verify animations maintain smooth frame transitions
- [ ] T105 [US5] Manual QA: Verify game falls back to static sprite if animation frames fail to load

**Required Unit Tests (80% Coverage)**

- [ ] T106 [P] [US5] Write unit tests for js/AnimationManager.js in tests/AnimationManager.test.js (80% coverage): test update() frame cycling with deltaTime, getCurrentFrame() coordinates, setAnimation() state changes

**Checkpoint**: All animations are smooth and performant at 60 FPS

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final quality improvements, performance validation, cross-browser testing, documentation

- [ ] T107 [P] Run test coverage report: verify 80% branch coverage on MazeGenerator, CollisionDetector, Timer, AnimationManager, Player, utils, GameState
- [ ] T108 [P] Add ESLint configuration (.eslintrc.json) per quickstart.md recommendations
- [ ] T109 [P] Run ESLint on all js/ files, fix any errors/warnings for code quality compliance
- [ ] T110 [P] Add JSDoc comments to all public module APIs for documentation
- [ ] T111 Performance profiling with Chrome DevTools: verify 60 FPS sustained, <1s maze generation, <100ms input response
- [ ] T112 Performance profiling: verify no memory leaks on difficulty changes (take heap snapshots)
- [ ] T113 Browser compatibility testing: Chrome (verify all features work at 60 FPS)
- [ ] T114 Browser compatibility testing: Firefox (verify all features work at 60 FPS)
- [ ] T115 Browser compatibility testing: Safari (verify audio plays, handle autoplay restrictions)
- [ ] T116 Browser compatibility testing: Edge (verify all features work at 60 FPS)
- [ ] T117 [P] Create README.md at repository root with game description, how to run, asset attribution
- [ ] T118 [P] Update quickstart.md if any development workflow changes were discovered during implementation
- [ ] T119 Edge case testing: Rapid arrow key presses (verify movement smoothness and collision accuracy)
- [ ] T120 Edge case testing: Browser window resize (verify canvas stays centered and fixed size)
- [ ] T121 Edge case testing: Missing audio files (verify graceful degradation with warning)
- [ ] T122 Edge case testing: Missing sprite files (verify error handling or fallback graphics)
- [ ] T123 Final manual QA pass: Run complete checklist from quickstart.md (50+ items covering all user stories)
- [ ] T124 Accessibility review: Verify keyboard navigation works (arrow keys), document visual-only limitation
- [ ] T125 Create demo video or screenshots for project showcase (optional)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P2 → P2 → P2)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories ✅ INDEPENDENT
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Timer module already exists from Phase 2, only needs UI integration ✅ INDEPENDENT
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Requires User Story 1 components but can be tested independently ✅ INDEPENDENT
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Adds audio layer on top of existing gameplay ✅ INDEPENDENT
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Requires User Story 1 rendering but can be tested independently ✅ INDEPENDENT

**Note**: While some user stories build on User Story 1's foundation (maze/player/rendering), they are designed to be independently testable and deliverable.

### Within Each User Story

- Models/utilities before services
- Services before integration into main game loop
- Core implementation before testing
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T004) marked [P] can run in parallel
- All Foundational tasks (T005-T008) marked [P] can run in parallel
- Once Foundational phase completes:
  - **User Story 1 internal parallelism**: T014, T015, T016, T017 can run in parallel (different files)
  - **User Story 1 tests**: T034, T035, T036 can run in parallel
  - **User Story 4 asset acquisition**: T062, T063, T064 can run in parallel
  - **User Story 5 asset acquisition**: T085, T086, T087 can run in parallel
- Different user stories (US2, US3, US4, US5) can be worked on in parallel by different team members after US1 is complete
- All Polish tasks marked [P] can run in parallel (T108, T109, T110, T117, T118)

---

## Parallel Example: User Story 1 (Maze Navigation)

```bash
# After Foundational phase is complete, launch these in parallel:

Task T014: "Implement js/MazeGenerator.js with generate() and validateMaze()"
Task T015: "Implement js/MazeRenderer.js with renderMaze(), renderPlayer(), fog of war"
Task T016: "Implement js/Player.js with createPlayer(), movePlayer(), updateAnimation()"
Task T017: "Implement js/InputHandler.js with initInputHandler(), updateInput()"

# Then sequentially (after above complete):

Task T018: "Implement js/GameState.js (depends on Timer, MazeGenerator, Player)"
Task T019: "Implement js/UIManager.js for victory UI"
Task T020-T021: "Add victory screen HTML/CSS"
Task T022-T025: "Wire everything up in main.js game loop"

# Then in parallel again:

Task T026-T033: "Manual QA testing (all 8 tests can be run together)"
Task T034-T036: "Optional unit tests (can run in parallel)"
```

---

## Parallel Example: User Story 4 (Audio)

```bash
# Asset acquisition (can run in parallel):

Task T062: "Acquire background-music.mp3"
Task T063: "Acquire move-sound.mp3"
Task T064: "Acquire wall-hit.mp3"

# After assets acquired, implementation can proceed sequentially:

Task T066: "Implement js/AudioManager.js"
Task T067-T068: "Add volume controls HTML/CSS"
Task T069-T074: "Wire up audio in main.js and InputHandler.js"
Task T075-T084: "Manual QA testing"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006) - includes test framework setup
2. Complete Phase 2: Foundational (T007-T013) - CRITICAL - includes REQUIRED unit tests - blocks all stories
3. Complete Phase 3: User Story 1 (T014-T036) - includes REQUIRED unit tests
4. **STOP and VALIDATE**: Run unit tests (verify 80% coverage), run manual QA checklist
5. Deploy/demo MVP - playable maze game with basic navigation!

**MVP Scope**: ~36 tasks (T001-T036), estimated ~2000-2500 lines of JavaScript + ~500-800 lines of test code

### Incremental Delivery

1. Complete Setup + Foundational (T001-T013) → Foundation ready with test framework + REQUIRED unit tests
2. Add User Story 1 (T014-T036) → Run unit tests + manual QA → **Deploy MVP!** 🎯
3. Add User Story 2 (T037-T046) → Manual QA → **Deploy with timer!**
4. Add User Story 3 (T047-T061) → Manual QA → **Deploy with difficulty levels!**
5. Add User Story 4 (T062-T084) → Manual QA → **Deploy with audio!**
6. Add User Story 5 (T085-T106) → Run unit tests + manual QA → **Deploy with animations!**
7. Polish (T107-T125) → Verify 80% coverage + final quality pass → **Production ready!**

Each story adds value without breaking previous stories. All unit tests must pass before deployment.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T013) - includes REQUIRED unit tests
2. Once Foundational is done:
   - **Developer A**: User Story 1 (T014-T036) - PRIORITY (others depend on this) - includes REQUIRED unit tests
3. After User Story 1 MVP is stable:
   - **Developer A**: User Story 2 (T037-T046) + User Story 3 (T047-T061)
   - **Developer B**: User Story 4 (T062-T084) - can work independently
   - **Developer C**: User Story 5 (T085-T106) - can work independently (uses US1 foundation) - includes REQUIRED unit tests
4. Stories integrate and test independently (all unit tests must pass)
5. Team completes Polish together (T107-T125) - verify 80% coverage across all modules

---

## Task Summary

**Total Tasks**: 123 tasks

**Task Count by User Story**:
- Phase 1 (Setup): 6 tasks (including test framework setup)
- Phase 2 (Foundational): 7 tasks (4 modules + 3 REQUIRED unit test files) - BLOCKS all stories
- Phase 3 (US1 - Navigate Maze): 23 tasks (including 8 QA + 3 REQUIRED unit test files) 🎯 MVP
- Phase 4 (US2 - Timer Display): 10 tasks (including 5 QA)
- Phase 5 (US3 - Difficulty Levels): 15 tasks (including 9 QA)
- Phase 6 (US4 - Audio): 23 tasks (including 4 assets + 10 QA)
- Phase 7 (US5 - Animations): 20 tasks (including 3 assets + 10 QA + 1 REQUIRED unit test file)
- Phase 8 (Polish): 19 tasks (including coverage verification)

**Parallel Opportunities Identified**:
- Setup phase: 5 tasks can run in parallel (T002, T003, T004, T005, T006)
- Foundational phase: 7 tasks can run in parallel (T007, T008, T009, T010, T011, T012, T013)
- User Story 1: 4 core modules can be built in parallel (T014, T015, T016, T017), then 3 unit tests in parallel (T034, T035, T036)
- User Story 4: 3 asset acquisitions in parallel (T062, T063, T064)
- User Story 5: 3 asset acquisitions in parallel (T085, T086, T087)
- Polish phase: 4 tasks can run in parallel (T107, T108, T109, T110, T117, T118)

**Independent Test Criteria**:
- ✅ US1: Launch game, navigate maze with arrow keys, reach exit, see victory screen
- ✅ US2: Observe timer counting from 00:00 during gameplay, final time on victory
- ✅ US3: Switch difficulty mid-game, verify new maze size and timer reset
- ✅ US4: Hear music/SFX, adjust volume, toggle mute
- ✅ US5: Observe animated legs/tail/eyes during movement, collision recoil on wall hit

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = Tasks T001-T036

**Estimated Codebase Size**: ~2000-3000 lines of JavaScript across 12 modules (per plan.md)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **REQUIRED**: Unit tests with 80% branch coverage for core logic modules (MazeGenerator, CollisionDetector, Timer, AnimationManager, Player, utils, GameState)
- **REQUIRED**: Manual QA checklist for UI/rendering/audio integration validation
- Test framework: Jest or Vitest (configured in Phase 1)
- All unit tests must pass before deployment or moving to next phase
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Asset files (audio, sprites) must be acquired externally - see quickstart.md for recommended sources
- Performance targets: 60 FPS, <1s maze generation, <100ms input response, <50ms audio latency
- Browser targets: Chrome, Firefox, Safari, Edge (latest 2 versions)
