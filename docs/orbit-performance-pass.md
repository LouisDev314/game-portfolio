# Orbit and homepage performance pass

## Scope

Orbit sizing/gameplay, its render lifecycle, and homepage scroll/media work only. Navigation, About copy, contact/Resend, project content, blog architecture, branding, and the theme system are unchanged. The existing uncommitted Mini Game label and card order were preserved.

## Orbit

- Desktop modal: 92vw, capped at 100rem (1600px), 86dvh, with a 90dvh ceiling. Compact fixed header/footer; the gameplay area fills the remaining height. Mobile retains the mouse/keyboard fallback in a shorter modal.
- Browser sizes: at 1920×1080 the modal was 1600×929 and the canvas 1566×783; at 1024×768, 942×660 / 908×514; at 800×600, 736×516 / 702×370. No dialog overflow. At 390×844, the fallback was 359×480 with no canvas.
- ResizeObserver still updates renderer dimensions and camera aspect/projection. Mouse sensitivity remains 0.002 radians per pixel; the DOM crosshair and raycast both use the center of the actual gameplay viewport. Pixel ratio remains capped at 1.5.
- Movement pressure measures net horizontal displacement from the last movement anchor. A move of at least 2.2 arena units establishes a new anchor and resets the pressure clock. Held movement keys into a wall and tiny movement around the anchor do not reset it.
- At 2.5 seconds within that radius, a floor ring grows and the HUD says MOVE / FLOOR CHARGING. At 3.5 seconds it changes to MOVE NOW / FLOOR PULSE. At 4.2 seconds the pulse ends the run if the player has not escaped. Moving clears the warning immediately. Pausing or hiding the tab freezes the clock. Restart clears all pressure state.
- Spawns use varied, approximately golden-angle perimeter sectors with jitter rather than a circular perimeter and a simple opposite-side fallback. Candidates must be at least 7 units away, or 10 units if within the forward arc. Enemies have small varying approach offsets until close range; the cap remains 36.
- Spawn interval progresses continuously from about 1.35 to 1.1 seconds during 0–10s, 1.1 to 0.75 during 10–20s, and 0.75 to 0.45 during 20–30s. Existing speed escalation remains. The HUD labels the introduction, rising pressure, and final push.
- Immediate click/hold firing remains at a 0.16-second cooldown. Shot crosshair tint and hit confirmation last 0.11 seconds. Restrained wireframe death feedback and recoil remain, with reduced-motion suppression. End states explain the cause of death or survival, show final hits, and support immediate replay/R restart.

## Confirmed scroll causes and fixes

### Projects reveal replay (homepage animation)

The full Projects section was enclosed in a Motion reveal that returned to opacity 0 and y=12 after leaving the observer region. Returning upward reanimated the entire section, including its video surfaces. A browser scroll sequence confirmed opacity 0 below Projects and opacity 1 on return. This explains the visible disappearing/reappearing section and adds compositing work over a large area.

Reveals now run once and disconnect their observer when revealed. The section stays visible on the upward return. Reduced motion remains supported. This preserves the entrance effect rather than globally disabling motion.

### Source churn and intrinsic media sizing (project footage)

The old 200px-margin observer attached/removed video src on every entry/exit. The browser recorded `emptied` and fresh `loadstart` events, with playback time reset to zero, on upward return. That forces media initialization/decoding at the same time as the section reveal. The old normal-flow, height:100% video also depended on intrinsic media sizing inside an auto-height desktop grid. One baseline sample requested scrollY=1800 and settled at 1885 during media re-entry; no CLS metric was recorded, so the sizing diagnosis combines that scroll anchoring observation with the grid/video code.

Sources now attach on first useful visibility and remain attached; videos pause rather than unload offscreen. Playback starts at 15% intersection and pauses on a complete exit, providing hysteresis. The new repeated down/up sequence had no re-entry `emptied` or `loadstart` events and kept the requested upward scroll positions. All three videos were paused below Projects. A final wheel-driven down/up smoke check after closing Orbit kept Projects at opacity 1 throughout and recorded zero Orbit draw calls. Posters, preload="none", muted looping gameplay, and hover treatment remain. Explicit video dimensions and absolute placement inside an aspect-ratio/min-height container keep media loading out of grid sizing.

### Other audited work

The hero word timer had no timeout cleanup and continued scheduling blur/letter animations offscreen. It now clears timers and stops scheduling offscreen, in a hidden tab, and for reduced motion. The photo carousel now pauses its CSS animation offscreen/hidden; backdrop blur under fully covering photos was removed. These are background-work reductions, not claimed as the primary source of the reverse-scroll glitch.

Lenis was not implicated by the observed section/media resets, so smooth scrolling and its settings remain. Its RAF now suspends in hidden tabs and reduced-motion changes are handled live. Existing small navbar blur/shadow transitions and its threshold state were audited; they do not explain the section-specific reset and were preserved. No permanent will-change was introduced, no synchronous per-scroll React updates or layout measurements were added, and project cards/homepage remain server-rendered apart from existing targeted client islands.

## Orbit lifecycle and memory

The unopened homepage had zero WebGL contexts and draw calls. Orbit was already mounted only inside the open modal, so it cannot explain the initial scroll problem. Network-resource checks confirmed that neither the engine nor the Three.js chunk loaded on the unopened homepage or mobile fallback, and both loaded on desktop opening. The engine and Three.js are now additionally imported asynchronously only for an open, eligible desktop arena; an import-generation guard prevents creation after closing or changing device eligibility.

The renderer loop runs only while playing. Three's setAnimationLoop(null) calls its internal animation stop/cancelAnimationFrame path. Ready, paused, and closed sampling windows recorded zero draw calls. Blur/hidden-tab/pointer-lock loss pause play. Modal removal disposes immediately through PresentContent, including during its exit animation.

Disposal is idempotent: stop the loop, release pointer lock, disconnect ResizeObserver, remove input/pointer-lock/blur/visibility/context-loss listeners, dispose shared geometries/materials/grid/pulse resources, clear scene/entity/key references, dispose renderer, lose the WebGL context, and remove the canvas. There are no engine timers. Five controlled-clock engine tests cover cleanup alongside actual Three math/raycasting; only DOM/WebGL/event delivery is mocked.

A longer browser audit found an additional Orbit memory issue: MeshStandardMaterial in Three r186 binds a module-shared DFG lookup texture. Heap retainers led from that texture's dispose listeners/source cache through WebGL objects to old canvases/contexts. This accumulated one DOM node per modal cycle despite normal renderer disposal. The arena's untextured surfaces now use MeshLambertMaterial, retaining hemisphere/emissive lighting without binding the PBR lookup texture. No global Three texture or another component's resources are disposed.

After the change, a fresh 12-cycle browser test held DOM nodes at 965 and JS event listeners at 633 for every cycle; before it, nodes increased from 974 to 985. Total JS heap still warmed from roughly 8.29MB to 9.52MB during the final test (module/JIT/browser bookkeeping is included), so this is evidence of removal of canvas accumulation, not a claim of zero heap growth. Four instrumented cycles created/lost four contexts, with zero canvases after every close.

## Checks

- pnpm lint: pass, no errors/warnings.
- pnpm typecheck: pass.
- node --test tests/arena.test.mjs: 5 passing tests (movement pressure/escape/restart/pause; aiming/hit/collision/resize/disposal; spawn/escalation/completion/repeated cycles; corner/wall movement and visibility; hold firing).
- pnpm build: environment failure in Turbopack CSS processing: creating a process/binding a port, Operation not permitted. This is a sandbox restriction, not a reported application compilation error.
- pnpm exec next build --webpack: pass, including compilation, TypeScript, and generation of all 17 pages.
- Production-browser checks: desktop sizes, mobile fallback, light/dark appearance, reduced-motion media/carousel/Lenis, project video visibility, repeat down/up scrolling, modal cycles, draw/context/listener/node instrumentation. Native pointer lock worked after raising the test browser window; background automation could also receive pointer-lock denial, and the fallback/resume path handled it.

A native-click/browser gameplay check confirmed floor-pulse death, scoring (five hits), rising pressure, shard-contact death, immediate replay, zero paused draws, and Escape closing. The scripted moving/shooting run ended on shard contact with 13 seconds remaining, so successful 30-second completion is covered by the controlled engine test rather than a successful browser playthrough. Manual survival/difficulty review remains appropriate.

## Changed files and dependencies

Source files: components/ArenaGame.tsx, components/HomeExpandableCards.tsx (sizing only beyond pre-existing edits), components/ProjectCardMedia.tsx, components/RevealOnScroll.tsx, components/SmoothScroll.tsx, components/ui/flip-words.tsx, components/ui/infinite-moving-cards.tsx, lib/game/arena.ts.

Verification/report: tests/arena.test.mjs, this report, and screenshots/evidence in output/playwright.

No dependencies added or removed. No deployment or commit performed.

## Manual review

A real mouse playthrough is still useful for subjective aiming feel, spawn fairness, floor-warning readability, and the 30-second difficulty curve, particularly Safari/Firefox, ultrawide screens, and high-DPI displays. No FPS, CPU percentage, GPU-memory, or cross-browser performance claim is made from these checks.
