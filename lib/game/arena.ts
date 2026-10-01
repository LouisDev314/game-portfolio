import * as THREE from 'three';

export type ArenaStatus = 'ready' | 'playing' | 'paused' | 'over' | 'complete' | 'error';
export type ArenaSnapshot = { status: ArenaStatus; score: number; remaining: number; message?: string };

/** One renderer per mounted modal; no assets, timers, physics engine, or global state. */
export function createArena(host: HTMLDivElement, report: (state: ArenaSnapshot) => void) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label', 'First-person arena. WASD to move, mouse to look, click to fire.');
  canvas.tabIndex = -1;
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#10151b');
  scene.fog = new THREE.Fog('#10151b', 10, 32);
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 50);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, 1.6, 3);
  scene.add(new THREE.HemisphereLight('#c2d8e5', '#17202a', 2));
  const floorGeometry = new THREE.PlaneGeometry(28, 28);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: '#1c242d', roughness: 1 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  const grid = new THREE.GridHelper(28, 14, '#536272', '#2c3743');
  grid.position.y = 0.01;
  scene.add(grid);
  const wallGeometry = new THREE.BoxGeometry(28, 0.45, 0.2);
  const wallMaterial = new THREE.MeshBasicMaterial({ color: '#647585' });
  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(i < 2 ? 0 : i === 2 ? -14 : 14, 0.225, i < 2 ? (i === 0 ? -14 : 14) : 0);
    if (i >= 2) wall.rotation.y = Math.PI / 2;
    scene.add(wall);
  }
  const geometry = new THREE.OctahedronGeometry(0.65);
  const material = new THREE.MeshStandardMaterial({
    color: '#b7e1ef',
    emissive: '#4b849b',
    emissiveIntensity: 0.8,
    flatShading: true,
  });
  const popMaterial = new THREE.MeshBasicMaterial({
    color: '#fbbf24',
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });
  const enemies: { mesh: THREE.Mesh; phase: number; speed: number }[] = [];
  const pops: { mesh: THREE.Mesh; life: number }[] = [];
  const keys = new Set<string>();
  const ray = new THREE.Raycaster();
  const direction = new THREE.Vector3();
  const movement = new THREE.Vector3();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let status: ArenaStatus = 'ready';
  let score = 0,
    elapsed = 0,
    spawnIn = 0,
    last = 0,
    shotAt = -1,
    kick = 0,
    hudSecond = -1;
  let firing = false,
    disposed = false;

  function snapshot(message?: string) {
    report({ status, score, remaining: Math.max(0, Math.ceil(30 - elapsed)), message });
  }
  function render() {
    renderer.render(scene, camera);
  }
  function stop(next: ArenaStatus) {
    status = next;
    keys.clear();
    firing = false;
    renderer.setAnimationLoop(null);
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    render();
    snapshot();
  }
  function spawn() {
    // Edge spawns stay at least six units away, even when the player hugs a wall.
    let angle = Math.random() * Math.PI * 2;
    let x = Math.cos(angle) * 13,
      z = Math.sin(angle) * 13;
    if (Math.hypot(x - camera.position.x, z - camera.position.z) < 6) {
      angle += Math.PI;
      x = Math.cos(angle) * 13;
      z = Math.sin(angle) * 13;
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 1.45, z);
    scene.add(mesh);
    enemies.push({ mesh, phase: Math.random() * Math.PI * 2, speed: 1.7 + Math.random() * 0.3 });
  }
  function shoot() {
    if (status !== 'playing' || elapsed - shotAt < 0.16) return;
    shotAt = elapsed;
    kick = reducedMotion.matches ? 0 : 0.018;
    camera.updateMatrixWorld();
    scene.updateMatrixWorld();
    ray.setFromCamera(new THREE.Vector2(0, 0), camera);
    const hit = ray.intersectObjects(
      enemies.map((enemy) => enemy.mesh),
      false,
    )[0];
    host.dataset.feedback = hit ? 'hit' : 'shot';
    if (!hit) return;
    const index = enemies.findIndex((enemy) => enemy.mesh === hit.object);
    const [enemy] = enemies.splice(index, 1);
    scene.remove(enemy.mesh);
    if (!reducedMotion.matches) {
      const mesh = new THREE.Mesh(geometry, popMaterial);
      mesh.position.copy(enemy.mesh.position);
      scene.add(mesh);
      pops.push({ mesh, life: 0.18 });
    }
    score += 1;
    snapshot();
  }
  function frame(now: number) {
    if (disposed || status !== 'playing') return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    if (elapsed >= 30) {
      stop('complete');
      return;
    }
    const forward = Number(keys.has('KeyW')) - Number(keys.has('KeyS'));
    const strafe = Number(keys.has('KeyD')) - Number(keys.has('KeyA'));
    movement.set(strafe, 0, -forward).normalize().applyAxisAngle(THREE.Object3D.DEFAULT_UP, camera.rotation.y);
    camera.position.addScaledVector(movement, dt * 5.5);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -12.8, 12.8);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -12.8, 12.8);
    camera.rotation.z = kick;
    kick *= Math.exp(-dt * 24);
    spawnIn -= dt;
    if (spawnIn <= 0 && enemies.length < 36) {
      spawn();
      spawnIn = Math.max(0.45, 1.4 - elapsed * 0.03);
    }
    for (const enemy of enemies) {
      direction.copy(camera.position).sub(enemy.mesh.position);
      direction.y = 0;
      const distance = direction.length();
      if (distance < 0.95) {
        stop('over');
        return;
      }
      direction.normalize();
      enemy.mesh.position.addScaledVector(direction, dt * (enemy.speed + elapsed * 0.035));
      if (!reducedMotion.matches) {
        enemy.mesh.position.y = 1.45 + Math.sin(elapsed * 2 + enemy.phase) * 0.15;
        enemy.mesh.rotation.y += dt * 1.2;
      }
    }
    for (let i = pops.length - 1; i >= 0; i--) {
      const pop = pops[i];
      pop.life -= dt;
      pop.mesh.scale.addScalar(dt * 5);
      if (pop.life <= 0) {
        scene.remove(pop.mesh);
        pops.splice(i, 1);
      }
    }
    if (firing) shoot();
    if (elapsed - shotAt > 0.075) delete host.dataset.feedback;
    if (Math.ceil(30 - elapsed) !== hudSecond) {
      hudSecond = Math.ceil(30 - elapsed);
      snapshot();
    }
    render();
  }
  function lockChanged() {
    if (disposed) return;
    if (document.pointerLockElement === canvas) {
      status = 'playing';
      last = performance.now();
      canvas.focus();
      snapshot();
      renderer.setAnimationLoop(frame);
    } else if (status === 'playing') stop('paused');
  }
  function lockError() {
    if (!disposed) {
      status = 'paused';
      snapshot('Mouse capture unavailable. Use Resume to try again.');
    }
  }
  function start() {
    if (disposed || status === 'playing') return;
    if (status !== 'paused') {
      for (const { mesh } of [...enemies, ...pops]) scene.remove(mesh);
      enemies.length = 0;
      pops.length = 0;
      score = 0;
      elapsed = 0;
      spawnIn = 0;
      shotAt = -1;
      kick = 0;
      hudSecond = -1;
      delete host.dataset.feedback;
      camera.position.set(0, 1.6, 3);
      camera.rotation.set(0, 0, 0);
    }
    try {
      const result = canvas.requestPointerLock();
      result?.catch(lockError);
    } catch {
      lockError();
    }
  }
  function keyDown(event: KeyboardEvent) {
    if (event.code === 'KeyR' && (status === 'over' || status === 'complete') && !event.repeat) {
      event.preventDefault();
      start();
    }
    if (status !== 'playing') return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(event.code)) event.preventDefault();
    keys.add(event.code);
    if (event.code === 'Tab') stop('paused');
  }
  function keyUp(event: KeyboardEvent) {
    keys.delete(event.code);
  }
  function mouseMove(event: MouseEvent) {
    if (document.pointerLockElement !== canvas || status !== 'playing') return;
    camera.rotation.y -= event.movementX * 0.002;
    camera.rotation.x = THREE.MathUtils.clamp(camera.rotation.x - event.movementY * 0.002, -1.2, 1.2);
  }
  function mouseDown(event: MouseEvent) {
    if (event.button === 0 && document.pointerLockElement === canvas) {
      firing = true;
      shoot();
    }
  }
  function mouseUp() {
    firing = false;
  }
  function pause() {
    if (status === 'playing') stop('paused');
  }
  function visibility() {
    if (document.hidden) pause();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    stop('error');
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height || disposed) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (status !== 'playing') render();
  });
  resize.observe(host);
  document.addEventListener('pointerlockchange', lockChanged);
  document.addEventListener('pointerlockerror', lockError);
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mousedown', mouseDown);
  document.addEventListener('mouseup', mouseUp);
  window.addEventListener('blur', pause);
  document.addEventListener('visibilitychange', visibility);
  canvas.addEventListener('webglcontextlost', contextLost);
  render();
  return {
    start,
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
      resize.disconnect();
      document.removeEventListener('pointerlockchange', lockChanged);
      document.removeEventListener('pointerlockerror', lockError);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('blur', pause);
      document.removeEventListener('visibilitychange', visibility);
      canvas.removeEventListener('webglcontextlost', contextLost);
      for (const resource of [
        floorGeometry,
        floorMaterial,
        wallGeometry,
        wallMaterial,
        geometry,
        material,
        popMaterial,
        grid.geometry,
      ])
        resource.dispose();
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
      gridMaterials.forEach((item) => item.dispose());
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      delete host.dataset.feedback;
    },
  };
}
