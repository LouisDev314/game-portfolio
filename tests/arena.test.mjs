import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
import * as three from 'three';

// Execute the actual engine with real Three math/raycasting and a controlled
// clock. Only WebGL, DOM events, and ResizeObserver are replaced here.
function setup() {
  class Events {
    listeners = new Map();
    addEventListener(type, fn) {
      if (!this.listeners.has(type)) this.listeners.set(type, new Set());
      this.listeners.get(type).add(fn);
    }
    removeEventListener(type, fn) {
      this.listeners.get(type)?.delete(fn);
    }
    emit(type, event = {}) {
      for (const fn of this.listeners.get(type) ?? []) fn(event);
    }
    count() {
      return [...this.listeners.values()].reduce((sum, set) => sum + set.size, 0);
    }
  }
  const document = new Events();
  const window = new Events();
  window.devicePixelRatio = 2;
  window.matchMedia = () => ({ matches: false });
  document.pointerLockElement = null;
  document.exitPointerLock = () => {
    document.pointerLockElement = null;
    document.emit('pointerlockchange');
  };
  const captured = {};
  let now = 0,
    state;
  const resources = new Set();
  const disposed = new Set();
  class Renderer {
    domElement = Object.assign(new Events(), {
      setAttribute() {},
      focus() {},
      remove() {},
      requestPointerLock() {
        document.pointerLockElement = this;
        document.emit('pointerlockchange');
      },
    });
    renders = 0;
    constructor() {
      captured.renderer = this;
    }
    setPixelRatio(value) {
      this.pixelRatio = value;
    }
    setAnimationLoop(fn) {
      this.loop = fn;
    }
    setSize(width, height) {
      this.size = [width, height];
    }
    render(scene, camera) {
      this.scene = scene;
      this.camera = camera;
      this.renders++;
      scene.traverse((object) => {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const resource of [object.geometry, ...materials].filter(Boolean)) {
          if (!resources.has(resource)) {
            resources.add(resource);
            resource.addEventListener('dispose', () => disposed.add(resource));
          }
        }
      });
    }
    dispose() {
      this.disposed = true;
    }
    forceContextLoss() {
      this.contextLost = true;
    }
  }
  const host = { dataset: {}, appendChild() {}, getBoundingClientRect: () => ({ width: 1200, height: 675 }) };
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL('../lib/game/arena.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  runInNewContext(source, {
    exports,
    require: () => ({ ...three, WebGLRenderer: Renderer }),
    document,
    window,
    performance: { now: () => now },
    ResizeObserver: class {
      constructor(fn) {
        captured.resize = this;
        this.fn = fn;
      }
      observe() {
        this.fn();
      }
      disconnect() {
        this.disconnected = true;
      }
    },
  });
  const engine = exports.createArena(host, (snapshot) => {
    state = snapshot;
  });
  const { renderer, resize } = captured;
  const key = (code, down = true) => window.emit(down ? 'keydown' : 'keyup', { code, preventDefault() {} });
  function tick(seconds) {
    for (let i = 0; i < Math.round(seconds * 20); i++) {
      now += 50;
      renderer.loop?.(now);
    }
  }
  const enemies = () =>
    renderer.scene.children.filter(
      (mesh) => mesh.geometry?.type === 'OctahedronGeometry' && mesh.material.type === 'MeshLambertMaterial',
    );
  return {
    engine,
    renderer,
    document,
    window,
    host,
    key,
    tick,
    enemies,
    resize,
    state: () => state,
    resources,
    disposed,
  };
}

test('warning, meaningful escape, lethal camping, restart, and paused clock', () => {
  const h = setup();
  assert.equal(h.renderer.loop, undefined);
  h.engine.start();
  h.tick(2.55);
  assert.equal(h.state().pressure, 'warning');
  h.key('KeyW');
  h.tick(0.5);
  h.key('KeyW', false);
  assert.equal(h.state().pressure, 'clear');
  h.key('Tab');
  const remaining = h.state().remaining;
  const renders = h.renderer.renders;
  h.tick(20);
  assert.equal(h.state().remaining, remaining);
  assert.equal(h.renderer.renders, renders);
  assert.equal(h.renderer.loop, null);
  h.engine.start();
  // Isolate floor pressure from shards already approaching during this test.
  for (const enemy of h.enemies()) enemy.position.set(100, 1.45, 100);
  h.tick(3.6);
  assert.equal(h.state().pressure, 'danger');
  h.tick(0.65);
  assert.equal(h.state().status, 'over');
  assert.match(h.state().message, /Floor pulse/);
  h.key('KeyR');
  assert.equal(h.state().status, 'playing');
  assert.equal(h.state().score, 0);
  assert.equal(h.state().remaining, 30);
  assert.equal(h.state().pressure, 'clear');
  h.engine.dispose();
});

test('mouse aiming, hit scoring, one-hit collision, resize and complete cleanup', () => {
  const h = setup();
  assert.equal(h.renderer.camera.aspect, 1200 / 675);
  assert.equal(h.renderer.pixelRatio, 1.5);
  h.engine.start();
  h.tick(0.05);
  const enemy = h.enemies()[0];
  enemy.position.set(0, 1.6, -4);
  h.document.emit('mousedown', { button: 0 });
  assert.equal(h.state().score, 1);
  assert.equal(h.host.dataset.feedback, 'hit');
  h.document.emit('mouseup');
  h.document.emit('mousemove', { movementX: 100, movementY: 50 });
  assert.equal(h.renderer.camera.rotation.y, -0.2);
  assert.equal(h.renderer.camera.rotation.x, -0.1);
  h.tick(1.4);
  h.enemies()[0].position.copy(h.renderer.camera.position);
  h.tick(0.05);
  assert.equal(h.state().status, 'over');
  h.engine.dispose();
  h.engine.dispose();
  assert.equal(h.document.count(), 0);
  assert.equal(h.window.count(), 0);
  assert.equal(h.renderer.domElement.count(), 0);
  assert.equal(h.renderer.loop, null);
  assert.equal(h.resize.disconnected, true);
  assert.equal(h.renderer.disposed, true);
  assert.equal(h.renderer.contextLost, true);
  assert.equal(h.resources.size, h.disposed.size);
});

test('30-second arc, varied safe spawns, completion and repeated cycles', () => {
  for (let cycle = 0; cycle < 3; cycle++) {
    const h = setup();
    h.engine.start();
    const counts = [0, 0, 0];
    const angles = new Set();
    let previous = new Set();
    // Circle the arena, and remove enemies after observing spawns to isolate
    // scheduling/completion from collision (covered separately above).
    for (let step = 0; step < 600; step++) {
      const t = step * 0.05;
      h.renderer.camera.position.set(8 * Math.sin(t * 0.7), 1.6, 8 * Math.cos(t * 0.7));
      h.tick(0.05);
      const current = h.enemies();
      for (const mesh of current) {
        if (!previous.has(mesh)) {
          counts[Math.min(2, Math.floor(t / 10))]++;
          assert.ok(mesh.position.distanceTo(h.renderer.camera.position) >= 6.7);
          angles.add(Math.floor((Math.atan2(mesh.position.z, mesh.position.x) + Math.PI) / (Math.PI / 2)));
        }
        // Move away rather than altering the engine's private arrays.
        mesh.position.set(100, 1.45, 100);
      }
      previous = new Set(current);
    }
    h.tick(0.05);
    assert.equal(h.state().status, 'complete');
    assert.equal(h.state().remaining, 0);
    assert.ok(counts[1] > counts[0] && counts[2] > counts[1], counts.join(','));
    assert.ok(angles.size >= 4);
    assert.equal(h.renderer.loop, null);
    h.engine.dispose();
    assert.equal(h.document.count(), 0);
    assert.equal(h.window.count(), 0);
  }
});

test('wall pushing cannot evade pressure; visibility freezes gameplay', () => {
  const h = setup();
  h.engine.start();
  h.renderer.camera.position.set(12.8, 1.6, 12.8);
  h.tick(0.05); // Establish the new movement anchor.
  h.key('KeyD');
  h.tick(2.6);
  assert.equal(h.state().pressure, 'warning');
  h.document.hidden = true;
  h.document.emit('visibilitychange');
  assert.equal(h.state().status, 'paused');
  assert.equal(h.document.pointerLockElement, null);
  const remaining = h.state().remaining;
  h.tick(10);
  assert.equal(h.state().remaining, remaining);
  h.document.hidden = false;
  h.engine.start();
  // Isolate escape from collision with shards already approaching the corner.
  for (const enemy of h.enemies()) enemy.position.set(100, 1.45, 100);
  h.key('KeyA');
  h.tick(0.5);
  h.key('KeyA', false);
  assert.equal(h.state().pressure, 'clear');
  h.engine.dispose();
});

test('hold-to-fire hits subsequent targets without another click', () => {
  const h = setup();
  h.engine.start();
  h.tick(0.05);
  h.enemies()[0].position.set(0, 1.6, -4);
  h.document.emit('mousedown', { button: 0 });
  assert.equal(h.state().score, 1);
  h.tick(1.4);
  h.enemies()[0].position.set(0, 1.6, -4);
  h.tick(0.2);
  assert.equal(h.state().score, 2);
  h.document.emit('mouseup');
  h.engine.dispose();
});
