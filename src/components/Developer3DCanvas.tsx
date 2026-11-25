import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Box,
  Compass,
  Eye,
  Layers,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  buildDeveloperScene,
  HOTSPOT_METADATA,
  type HotspotId,
  type HotspotInfo,
} from './three/buildDeveloperScene';

interface Developer3DCanvasProps {
  isDark: boolean;
  wireframeExternal?: boolean;
  onWireframeChange?: (next: boolean) => void;
  presetExternal?: CameraPresetKey | null;
}

export type CameraPresetKey = 'hero' | 'face' | 'screens' | 'side' | 'back' | 'top';

interface CameraPreset {
  key: CameraPresetKey;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: CameraPreset[] = [
  { key: 'hero', label: 'Hero 3/4', position: [-2.95, 2.08, 1.75], target: [0, 1.0, -0.05] },
  { key: 'face', label: 'Dev Front', position: [-2.2, 1.74, -1.7], target: [0, 1.18, 0.15] },
  { key: 'screens', label: 'Code Rig', position: [0.15, 2.15, 2.85], target: [0, 1.15, -0.35] },
  { key: 'side', label: 'Side 90°', position: [3.45, 1.82, 0.15], target: [0, 1.0, -0.05] },
  { key: 'back', label: 'Back 180°', position: [0.1, 1.95, 3.6], target: [0, 0.98, 0.0] },
  { key: 'top', label: 'Top View', position: [-0.35, 4.2, 1.8], target: [0, 0.9, -0.1] },
];

/**
 * Computes responsive vertical FOV so narrow portrait phones never clip the 3D scene sides.
 */
function computeResponsiveFov(width: number, height: number): number {
  const aspect = width / Math.max(height, 1);
  if (aspect < 1) {
    return THREE.MathUtils.clamp(40 / Math.max(aspect, 0.7), 40, 56);
  }
  return 40;
}

export const Developer3DCanvas: React.FC<Developer3DCanvasProps> = ({
  isDark,
  wireframeExternal,
  onWireframeChange,
  presetExternal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [activePreset, setActivePreset] = useState<CameraPresetKey>('hero');
  const [azimuthDeg, setAzimuthDeg] = useState(315);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo>(HOTSPOT_METADATA.developer);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<HotspotId | null>(null);
  const [webglError, setWebglError] = useState(false);

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const sceneApiRef = useRef<{
    setWireframe: (enabled: boolean) => void;
    goToPreset: (preset: CameraPreset) => void;
    zoomStep: (factor: number) => void;
    updateLightingTheme: (dark: boolean) => void;
  } | null>(null);

  useEffect(() => {
    if (typeof wireframeExternal === 'boolean' && wireframeExternal !== wireframe) {
      setWireframe(wireframeExternal);
      sceneApiRef.current?.setWireframe(wireframeExternal);
    }
  }, [wireframeExternal, wireframe]);

  useEffect(() => {
    if (presetExternal) {
      const found = CAMERA_PRESETS.find((p) => p.key === presetExternal);
      if (found) {
        setActivePreset(found.key);
        sceneApiRef.current?.goToPreset(found);
      }
    }
  }, [presetExternal]);

  useEffect(() => {
    sceneApiRef.current?.updateLightingTheme(isDark);
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.outline = 'none';
    // Allows clean 360° touch rotation inside the canvas on phones/tablets
    renderer.domElement.style.touchAction = 'none';

    const scene = new THREE.Scene();

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.85;
    roomEnv.dispose();

    const camera = new THREE.PerspectiveCamera(
      computeResponsiveFov(width, height),
      width / Math.max(height, 1),
      0.1,
      40
    );
    const initialPreset = CAMERA_PRESETS[0];
    camera.position.set(...initialPreset.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...initialPreset.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 2.4;
    controls.maxDistance = 7.4;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.75;

    const hemiLight = new THREE.HemisphereLight(0xf4f4f5, 0x18181b, 1.0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.4);
    keyLight.position.set(-4.2, 6.2, 3.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.camera.left = -3.2;
    keyLight.shadow.camera.right = 3.2;
    keyLight.shadow.camera.top = 3.2;
    keyLight.shadow.camera.bottom = -3.2;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    const coolFillLight = new THREE.DirectionalLight(0xdbeafe, 1.05);
    coolFillLight.position.set(3.5, 3.2, -2.5);
    scene.add(coolFillLight);

    const rimBackLight = new THREE.PointLight(0xe4e4e7, 2.2, 8);
    rimBackLight.position.set(2.2, 2.5, 2.6);
    scene.add(rimBackLight);

    const warmDeskFill = new THREE.PointLight(0xf59e0b, 1.15, 4.0);
    warmDeskFill.position.set(-0.85, 1.4, -0.5);
    scene.add(warmDeskFill);

    const built = buildDeveloperScene();
    scene.add(built.root);

    let tweenActive = false;
    let tweenProgress = 0;
    const tweenStartPos = new THREE.Vector3();
    const tweenEndPos = new THREE.Vector3();
    const tweenStartTarget = new THREE.Vector3();
    const tweenEndTarget = new THREE.Vector3();

    const goToPreset = (preset: CameraPreset) => {
      tweenStartPos.copy(camera.position);
      tweenEndPos.set(...preset.position);
      tweenStartTarget.copy(controls.target);
      tweenEndTarget.set(...preset.target);
      tweenProgress = 0;
      tweenActive = true;
    };

    const zoomStep = (factor: number) => {
      const dir = camera.position.clone().sub(controls.target);
      const nextLen = THREE.MathUtils.clamp(dir.length() * factor, 2.4, 7.4);
      dir.normalize().multiplyScalar(nextLen);
      camera.position.copy(controls.target).add(dir);
    };

    const updateLightingTheme = (dark: boolean) => {
      scene.environmentIntensity = dark ? 0.82 : 1.05;
      hemiLight.intensity = dark ? 0.95 : 1.25;
      keyLight.intensity = dark ? 2.35 : 2.55;
    };
    updateLightingTheme(isDark);

    sceneApiRef.current = {
      setWireframe: built.setWireframeMode,
      goToPreset,
      zoomStep,
      updateLightingTheme,
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const pickHotspot = (clientX: number, clientY: number): HotspotId | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(built.interactables, true);
      for (const hit of hits) {
        const id = hit.object.userData?.hotspotId as HotspotId | undefined;
        if (id && HOTSPOT_METADATA[id]) return id;
      }
      return null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const hit = pickHotspot(e.clientX, e.clientY);
      setHoveredHotspotId(hit);
      renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      tweenActive = false;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e: PointerEvent) => {
      renderer.domElement.style.cursor = hoveredHotspotId ? 'pointer' : 'grab';
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 8) {
        const hit = pickHotspot(e.clientX, e.clientY);
        if (hit) {
          setSelectedHotspot(HOTSPOT_METADATA[hit]);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w <= 0 || h <= 0) return;
      camera.fov = computeResponsiveFov(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;
    let lastUiAzimuth = -1;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      controls.autoRotate = autoRotateRef.current && !tweenActive;

      if (tweenActive) {
        tweenProgress = Math.min(1, tweenProgress + delta * 2.2);
        const eased = 1 - Math.pow(1 - tweenProgress, 3);
        camera.position.lerpVectors(tweenStartPos, tweenEndPos, eased);
        controls.target.lerpVectors(tweenStartTarget, tweenEndTarget, eased);
        if (tweenProgress >= 1) tweenActive = false;
      }

      controls.update();
      built.update(elapsed);

      const rawDeg = Math.round(THREE.MathUtils.radToDeg(controls.getAzimuthalAngle()));
      const normalizedDeg = ((rawDeg % 360) + 360) % 360;
      if (Math.abs(normalizedDeg - lastUiAzimuth) >= 2) {
        lastUiAzimuth = normalizedDeg;
        setAzimuthDeg(normalizedDeg);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      controls.dispose();
      built.dispose();
      envTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
      sceneApiRef.current = null;
    };
  }, []);

  const handleToggleWireframe = () => {
    const next = !wireframe;
    setWireframe(next);
    sceneApiRef.current?.setWireframe(next);
    onWireframeChange?.(next);
  };

  const handleSelectPreset = (preset: CameraPreset) => {
    setActivePreset(preset.key);
    sceneApiRef.current?.goToPreset(preset);
  };

  if (webglError) {
    return (
      <div className="surface-card flex h-[340px] flex-col items-center justify-center rounded-2xl p-6 text-center sm:h-[460px] lg:h-[520px]">
        <Box className="mb-3 h-9 w-9 text-[var(--text-secondary)]" />
        <p className="font-display text-lg font-semibold">3D Studio Preview</p>
        <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
          WebGL hardware acceleration is unavailable in this browser session.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col">
      {/* Main 3D Viewport Card */}
      <div className="surface-card relative h-[340px] w-full overflow-hidden rounded-2xl sm:h-[440px] md:h-[490px] lg:h-[520px]">
        {/* Studio Backdrop BEHIND the WebGL canvas (z-0) */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 45%, #1c1c21 0%, #111114 58%, #09090b 100%)'
              : 'radial-gradient(circle at 50% 45%, #f4f4f5 0%, #e4e4e7 65%, #d4d4d8 100%)',
          }}
        />

        {/* Top HUD Bar */}
        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-10 flex flex-wrap items-center justify-between gap-1.5 sm:inset-x-4 sm:top-4 sm:gap-2">
          <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/92 px-2.5 py-1.5 text-xs font-medium backdrop-blur-md sm:gap-2 sm:px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono-code text-[10px] tracking-wide text-[var(--text-primary)] sm:text-[11px]">
              360° <span className="hidden xs:inline">STUDIO</span>
            </span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="inline-flex items-center gap-1 font-mono-code text-[10px] text-[var(--accent)] sm:text-[11px]">
              <Compass className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {azimuthDeg}°
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setAutoRotate((v) => !v)}
              title={autoRotate ? 'Pause 360° orbit' : 'Resume 360° orbit'}
              aria-label={autoRotate ? 'Pause 360° orbit' : 'Resume 360° orbit'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/92 p-2 text-xs font-medium text-[var(--text-primary)] backdrop-blur-md transition hover:border-[var(--border-strong)] sm:px-2.5 sm:py-1.5"
            >
              {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{autoRotate ? 'Orbiting' : 'Paused'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleWireframe}
              title="Toggle 3D Wireframe"
              aria-label="Toggle 3D Wireframe"
              className={`inline-flex items-center gap-1.5 rounded-lg border p-2 text-xs font-medium backdrop-blur-md transition sm:px-2.5 sm:py-1.5 ${
                wireframe
                  ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)]/92 text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Wireframe</span>
            </button>

            {/* Zoom & Reset visible on ALL devices including mobile! */}
            <div className="inline-flex items-center overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/92 backdrop-blur-md">
              <button
                type="button"
                onClick={() => sceneApiRef.current?.zoomStep(0.86)}
                title="Zoom in"
                aria-label="Zoom in"
                className="p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:p-1.5"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => sceneApiRef.current?.zoomStep(1.16)}
                title="Zoom out"
                aria-label="Zoom out"
                className="border-l border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:p-1.5"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset(CAMERA_PRESETS[0])}
                title="Reset 3D view"
                aria-label="Reset 3D view"
                className="border-l border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:p-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* WebGL Canvas Mount ABOVE backdrop (z-[1]) */}
        <div
          ref={containerRef}
          className="relative z-[1] h-full w-full"
          aria-label="Interactive 3D developer model"
        />

        {/* Minimal Unobtrusive Bottom Hint */}
        <div className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/88 px-2.5 py-1 text-[10px] text-[var(--text-secondary)] backdrop-blur-md sm:right-3 sm:bottom-3 sm:text-[11px]">
          <Maximize2 className="h-3 w-3" />
          <span>{hoveredHotspotId ? 'Tap to inspect' : 'Drag 360° · Tap parts'}</span>
        </div>
      </div>

      {/* Camera Preset Strip */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:justify-between">
        <span className="hidden font-mono-code text-[11px] text-[var(--text-muted)] md:inline">
          Angles:
        </span>
        <div className="flex flex-wrap justify-center gap-1.5">
          {CAMERA_PRESETS.map((preset) => {
            const active = activePreset === preset.key;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:py-1 ${
                  active
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Scene Inspector Card Below Canvas */}
      <div className="surface-card mt-3 flex flex-col justify-between gap-2 rounded-xl px-3.5 py-3 sm:flex-row sm:items-center sm:px-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
            <Eye className="h-3 w-3 shrink-0 text-[var(--accent)]" />
            <span>Inspector</span>
            <span>·</span>
            <span className="font-semibold text-[var(--text-primary)]">{selectedHotspot.title}</span>
          </div>
          <p className="mt-0.5 text-xs leading-snug text-[var(--text-secondary)] sm:truncate">
            {selectedHotspot.subtitle}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-1">
          {selectedHotspot.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono-code text-[10px] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
