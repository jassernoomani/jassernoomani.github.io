import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
export interface SceneController {
  setPaused(paused: boolean): void;
  dispose(): void;
}

export function createScene(
  host: HTMLElement,
  initiallyPaused: boolean,
  onLost: () => void,
): SceneController {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
  camera.position.set(0, 0, 9.8);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const sculpture = new THREE.Group();
  sculpture.rotation.set(0.3, -0.35, -0.34);
  scene.add(sculpture);
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.46, 0.44, 240, 40, 2, 3),
    new THREE.MeshPhysicalMaterial({
      color: 0x778da9,
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    }),
  );
  sculpture.add(knot);
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(2.45, 0.014, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0x778da9, transparent: true, opacity: 0.75 }),
  );
  orbit.rotation.set(0.95, 0.3, -0.2);
  sculpture.add(orbit);
  const bead = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xe0e1dd }),
  );
  orbit.add(bead);
  bead.position.x = 2.45;
  const light = new THREE.DirectionalLight(0xe0e1dd, 5);
  light.position.set(-3, 4, 4);
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xe0e1dd, 4);
  fill.position.set(4, -1, 2);
  scene.add(fill);
  const rim = new THREE.PointLight(0x415a77, 35, 14);
  rim.position.set(0, -3, 1);
  scene.add(rim);
  let paused = initiallyPaused,
    visible = true,
    disposed = false,
    lost = false,
    frame = 0,
    time = 0,
    lastTime = 0,
    drag = false,
    previousX = 0,
    targetX = 0,
    targetY = 0,
    angle = 0;
  const draw = () => renderer.render(scene, camera);
  const animate = (now: number) => {
    frame = 0;
    if (disposed || lost || !visible || document.hidden || paused) return;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
    lastTime = now;
    time += delta;
    if (!drag) angle += delta * 0.095;
    knot.rotation.y = angle;
    knot.rotation.x = Math.sin(time * 0.15) * 0.12;
    sculpture.rotation.x += (0.3 + targetY * 0.16 - sculpture.rotation.x) * 0.04;
    sculpture.rotation.y += (-0.35 + targetX * 0.22 - sculpture.rotation.y) * 0.04;
    sculpture.position.y = Math.sin(time * 0.55) * 0.075;
    bead.position.set(Math.cos(time * 0.35) * 2.45, Math.sin(time * 0.35) * 2.45, 0);
    draw();
    frame = requestAnimationFrame(animate);
  };
  const resume = () => {
    lastTime = 0;
    if (!frame && !paused && !lost && visible && !document.hidden && !disposed)
      frame = requestAnimationFrame(animate);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height || lost) return;
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.85 ? 12.2 : 9.8;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    draw();
  };
  const pointerMove = (event: PointerEvent) => {
    if (paused) return;
    const rect = host.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (drag) angle += (event.clientX - previousX) * 0.009;
    previousX = event.clientX;
  };
  const pointerDown = (event: PointerEvent) => {
    if (paused || event.button !== 0) return;
    drag = true;
    previousX = event.clientX;
    host.setPointerCapture(event.pointerId);
  };
  const pointerUp = () => {
    drag = false;
  };
  const pointerLeave = () => {
    targetX = 0;
    targetY = 0;
  };
  const visibilityChange = () => (document.hidden ? stop() : resume());
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    stop();
    renderer.domElement.style.display = 'none';
    onLost();
  };
  host.addEventListener('pointermove', pointerMove);
  host.addEventListener('pointerdown', pointerDown);
  host.addEventListener('pointerup', pointerUp);
  host.addEventListener('pointercancel', pointerUp);
  host.addEventListener('pointerleave', pointerLeave);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  document.addEventListener('visibilitychange', visibilityChange);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) resume();
    else stop();
  });
  intersectionObserver.observe(host);
  resize();
  resume();
  return {
    setPaused(value) {
      paused = value;
      if (value) stop();
      else resume();
    },
    dispose() {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', visibilityChange);
      host.removeEventListener('pointermove', pointerMove);
      host.removeEventListener('pointerdown', pointerDown);
      host.removeEventListener('pointerup', pointerUp);
      host.removeEventListener('pointercancel', pointerUp);
      host.removeEventListener('pointerleave', pointerLeave);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((item) =>
            item.dispose(),
          );
        }
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
