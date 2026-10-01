import * as THREE from 'three';

export type ArenaStatus = 'ready' | 'playing' | 'paused' | 'over' | 'complete' | 'error';
export type ArenaSnapshot = {
  status: ArenaStatus;
  score: number;
  remaining: number;
  pressure?: 'clear' | 'warning' | 'danger';
  message?: string;
};

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
  // This untextured arena only needs diffuse hemisphere lighting. PBR materials
  // in Three r186 also bind a shared DFG lookup texture whose dispose listeners
  // retain old renderer contexts across modal cycles.
  const floorMaterial = new THREE.MeshLambertMaterial({ color: '#1c242d' });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  const grid = new THREE.GridHelper(28, 14, '#536272', '#2c3743');
  grid.position.y = 0.01;
  scene.add(grid);
  const pulseGeometry = new THREE.RingGeometry(0.92, 1, 48);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: '#fbbf24',
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
  });
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  pulse.rotation.x = -Math.PI / 2;
  pulse.visible = false;
  scene.add(pulse);
  const wallGeometry = new THREE.BoxGeometry(28, 0.45, 0.2);
  const wallMaterial = new THREE.MeshBasicMaterial({ color: '#647585' });
  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(i < 2 ? 0 : i === 2 ? -14 : 14, 0.225, i < 2 ? (i === 0 ? -14 : 14) : 0);
    if (i >= 2) wall.rotation.y = Math.PI / 2;
    scene.add(wall);
  }
  const geometry = new THREE.OctahedronGeometry(0.65);
  const material = new THREE.MeshLambertMaterial({
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
  const enemies: { mesh: THREE.Mesh; phase: number; speed: number; flank: number }[] = [];
  const pops: { mesh: THREE.Mesh; life: number }[] = [];
  const keys = new Set<string>();
  const ray = new THREE.Raycaster();
  const direction = new THREE.Vector3();
  const movement = new THREE.Vector3();
  const movementAnchor = camera.position.clone();
  const aimCenter = new THREE.Vector2(0, 0);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let status: ArenaStatus = 'ready';
  let score = 0,
    elapsed = 0,
    spawnIn = 0,
    last = 0,
    shotAt = -1,
    kick = 0,
    hudSecond = -1;
  let stationary = 0,
    spawnIndex = 0;
  let pressure: 'clear' | 'warning' | 'danger' = 'clear';
  let firing = false,
    disposed = false;

  function snapshot(message?: string) {
    report({ status, score, remaining: Math.max(0, Math.ceil(30 - elapsed)), pressure, message });
  }
  function render() {
    renderer.render(scene, camera);
  }
  function stop(next: ArenaStatus, message?: string) {
    status = next;
    keys.clear();
    firing = false;
    delete host.dataset.feedback;
    renderer.setAnimationLoop(null);
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    render();
    snapshot(message);
  }
  function spawn() {
    // Spread consecutive arrivals across the square perimeter. Reject close
    // spawns, and give anything appearing in the forward view extra distance.
    let x = 0,
      z = 0;
    for (let attempt = 0; attempt < 16; attempt++) {
      const angle = spawnIndex++ * 2.399963 + (Math.random() - 0.5) * 0.5;
      const c = Math.cos(angle),
        s = Math.sin(angle);
      const edge = 13 / Math.max(Math.abs(c), Math.abs(s));
      x = c * edge;
      z = s * edge;
      const dx = x - camera.position.x,
        dz = z - camera.position.z;
      const distance = Math.hypot(dx, dz);
      const inFront = (-Math.sin(camera.rotation.y) * dx - Math.cos(camera.rotation.y) * dz) / distance > 0.5;
      if (distance >= (inFront ? 10 : 7)) break;
      if (attempt === 15) return;
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 1.45, z);
    scene.add(mesh);
    enemies.push({
      mesh,
      phase: Math.random() * Math.PI * 2,
      speed: 1.7 + Math.random() * 0.3,
      flank: (Math.random() - 0.5) * 0.45,
    });
  }
  function shoot() {
    if (status !== 'playing' || elapsed - shotAt < 0.16) return;
    shotAt = elapsed;
    kick = reducedMotion.matches ? 0 : 0.018;
    camera.updateMatrixWorld();
    scene.updateMatrixWorld();
    ray.setFromCamera(aimCenter, camera);
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
  function updatePressure(dt: number) {
    // Net displacement, not held keys or tiny circles. A 2.2-unit move cancels
    // the pulse; pushing into an arena wall cannot clear it.
    if (Math.hypot(camera.position.x - movementAnchor.x, camera.position.z - movementAnchor.z) >= 2.2) {
      movementAnchor.copy(camera.position);
      stationary = 0;
    } else stationary += dt;
    const nextPressure = stationary >= 3.5 ? 'danger' : stationary >= 2.5 ? 'warning' : 'clear';
    if (pressure !== nextPressure) {
      pressure = nextPressure;
      snapshot();
    }
    pulse.visible = pressure !== 'clear';
    if (pulse.visible) {
      pulse.position.set(movementAnchor.x, 0.025, movementAnchor.z);
      pulse.scale.setScalar(2.2 * Math.min(1, (stationary - 2.5) / 1.7));
      pulseMaterial.color.set(pressure === 'danger' ? '#fb923c' : '#fbbf24');
    }
    if (stationary >= 4.2) {
      stop('over', 'Floor pulse caught you. Move away when the MOVE warning appears.');
      return false;
    }
    return true;
  }
  function frame(now: number) {
    if (disposed || status !== 'playing') return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    if (elapsed >= 30) {
      stop('complete', 'You held out through the final push. Play again to beat your score.');
      return;
    }
    const forward = Number(keys.has('KeyW')) - Number(keys.has('KeyS'));
    const strafe = Number(keys.has('KeyD')) - Number(keys.has('KeyA'));
    movement.set(strafe, 0, -forward).normalize().applyAxisAngle(THREE.Object3D.DEFAULT_UP, camera.rotation.y);
    camera.position.addScaledVector(movement, dt * 5.5);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -12.8, 12.8);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -12.8, 12.8);
    if (!updatePressure(dt)) return;
    camera.rotation.z = kick;
    kick *= Math.exp(-dt * 24);
    spawnIn -= dt;
    if (spawnIn <= 0 && enemies.length < 36) {
      spawn();
      // Continuous escalation with a more distinct final ten seconds.
      spawnIn =
        elapsed < 10
          ? 1.35 - elapsed * 0.025
          : elapsed < 20
            ? 1.1 - (elapsed - 10) * 0.035
            : 0.75 - (elapsed - 20) * 0.03;
    }
    for (const enemy of enemies) {
      direction.copy(camera.position).sub(enemy.mesh.position);
      direction.y = 0;
      const distance = direction.length();
      if (distance < 0.95) {
        stop('over', 'A shard reached you. Keep moving and watch the flanks.');
        return;
      }
      direction.normalize();
      if (distance > 3) direction.applyAxisAngle(THREE.Object3D.DEFAULT_UP, enemy.flank);
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
    if (elapsed - shotAt > 0.11) delete host.dataset.feedback;
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
      stop('paused', 'Mouse capture unavailable. Use Resume to try again.');
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
      stationary = 0;
      pressure = 'clear';
      pulse.visible = false;
      spawnIndex = Math.floor(Math.random() * 100);
      delete host.dataset.feedback;
      camera.position.set(0, 1.6, 3);
      camera.rotation.set(0, 0, 0);
      movementAnchor.copy(camera.position);
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
      if (disposed) return;
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
        pulseGeometry,
        pulseMaterial,
      ])
        resource.dispose();
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
      gridMaterials.forEach((item) => item.dispose());
      scene.clear();
      enemies.length = 0;
      pops.length = 0;
      keys.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      delete host.dataset.feedback;
    },
  };
}
