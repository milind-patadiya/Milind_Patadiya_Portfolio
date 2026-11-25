import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {
  createMainIdeScreenTexture,
  createPhonePreviewTexture,
  createSideTerminalTexture,
  createTechBadgeTexture,
  type AnimatedScreenHandle,
} from './screenTextures';

export type HotspotId =
  | 'developer'
  | 'main-monitor'
  | 'vertical-monitor'
  | 'mobile-rig'
  | 'workstation';

export interface HotspotInfo {
  id: HotspotId;
  title: string;
  subtitle: string;
  tags: string[];
}

export const HOTSPOT_METADATA: Record<HotspotId, HotspotInfo> = {
  developer: {
    id: 'developer',
    title: 'Milind Patadiya',
    subtitle: 'Computer Engineering Student • Full-Stack & Flutter Developer (.NET Intern)',
    tags: ['B.Tech 2027', 'eLogics Intern', 'Rajkot, IN'],
  },
  'main-monitor': {
    id: 'main-monitor',
    title: 'Full-Stack Web Engineering',
    subtitle: 'Production ASP.NET MVC, .NET Core, PHP, ES6+ JavaScript & Bootstrap architectures.',
    tags: ['ASP.NET MVC', '.NET Core', 'PHP', 'JavaScript'],
  },
  'vertical-monitor': {
    id: 'vertical-monitor',
    title: 'Database, APIs & Networking',
    subtitle: 'MySQL relational modeling, Firebase Firestore, REST pipelines, CCNA & Cisco SRWE.',
    tags: ['MySQL', 'Firebase', 'CCNA', 'REST APIs'],
  },
  'mobile-rig': {
    id: 'mobile-rig',
    title: 'Mobile Development Rig',
    subtitle: 'Cross-platform Flutter (Dart) apps & zero-dependency native Android games in Kotlin.',
    tags: ['Flutter', 'Dart', 'Kotlin', 'Android'],
  },
  workstation: {
    id: 'workstation',
    title: '360° Studio Workstation',
    subtitle: 'Dual-arm VESA setup, mechanical input, ergonomic spine chair & orbiting stack.',
    tags: ['Drag 360°', 'Wireframe Ready', 'Interactive'],
  },
};

export interface BuiltDeveloperScene {
  root: THREE.Group;
  interactables: THREE.Object3D[];
  setWireframeMode: (enabled: boolean) => void;
  update: (elapsed: number) => void;
  dispose: () => void;
}

function tagHotspot(obj: THREE.Object3D, id: HotspotId, interactables: THREE.Object3D[]) {
  obj.userData.hotspotId = id;
  obj.traverse((child) => {
    child.userData.hotspotId = id;
  });
  interactables.push(obj);
}

/**
 * Builds an articulated, 360-degree detailed 3D developer character & architectural studio workstation.
 */
export function buildDeveloperScene(): BuiltDeveloperScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const screenHandles: AnimatedScreenHandle[] = [];
  const badgeTextures: THREE.Texture[] = [];
  const wireframeCapableMaterials: THREE.MeshStandardMaterial[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(geo: T): T => {
    geometries.push(geo);
    return geo;
  };
  const trackMat = <T extends THREE.Material>(mat: T, wireframeable = true): T => {
    materials.push(mat);
    if (wireframeable && mat instanceof THREE.MeshStandardMaterial) {
      wireframeCapableMaterials.push(mat);
    }
    return mat;
  };

  // --- Shared Realistic Studio PBR Materials (Matte Graphite, Walnut, Brushed Titanium) ---
  const darkMetalMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.38, metalness: 0.78 })
  );
  const brushedAluminumMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xa1a1aa, roughness: 0.28, metalness: 0.88 })
  );
  const deskWoodMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x2a211c, roughness: 0.62, metalness: 0.06 })
  );
  const deskMatPadMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.9, metalness: 0.03 })
  );
  const monitorBezelMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x121215, roughness: 0.36, metalness: 0.5 })
  );
  const subtleIndicatorMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x60a5fa,
      emissiveIntensity: 0.48,
      roughness: 0.25,
    }),
    false
  );
  const warmBulbMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.75,
      roughness: 0.2,
    }),
    false
  );

  // Realistic Apparel & Character Materials
  const skinMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xd69a74, roughness: 0.58, metalness: 0.03 })
  );
  const hairMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x18161a, roughness: 0.75, metalness: 0.08 })
  );
  const hoodieMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.84, metalness: 0.04 })
  );
  const hoodieTrimMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.75, metalness: 0.08 })
  );
  const innerShirtMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.78, metalness: 0.02 })
  );
  const jeansMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.86, metalness: 0.03 })
  );
  const sneakerMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.65, metalness: 0.08 })
  );
  const sneakerSoleMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xf4f4f5, roughness: 0.5, metalness: 0.04 })
  );
  const glassesFrameMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xd4d4d8, roughness: 0.22, metalness: 0.92 })
  );
  const lensMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xe4e4e7,
      transparent: true,
      opacity: 0.22,
      roughness: 0.06,
      metalness: 0.1,
      clearcoat: 1,
    }),
    false
  );
  const eyeWhiteMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.2, metalness: 0 }),
    false
  );
  const pupilMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.15, metalness: 0.1 }),
    false
  );
  const chairMeshMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x1f1f23, roughness: 0.78, metalness: 0.1 })
  );

  // =========================================================================
  // 1. 360° ARCHITECTURAL TURNTABLE PEDESTAL
  // =========================================================================
  const pedestalGroup = new THREE.Group();
  const basePlate = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(2.35, 2.48, 0.12, 72)),
    darkMetalMat
  );
  basePlate.position.y = 0.06;
  basePlate.receiveShadow = true;
  pedestalGroup.add(basePlate);

  const innerDeck = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(2.18, 2.18, 0.04, 72)),
    trackMat(new THREE.MeshStandardMaterial({ color: 0x111114, roughness: 0.68, metalness: 0.2 }))
  );
  innerDeck.position.y = 0.13;
  innerDeck.receiveShadow = true;
  pedestalGroup.add(innerDeck);

  // Brushed titanium trim ring
  const trimRing = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(2.34, 0.012, 16, 120)),
    brushedAluminumMat
  );
  trimRing.rotation.x = Math.PI / 2;
  trimRing.position.y = 0.12;
  pedestalGroup.add(trimRing);

  // 360° compass degree tick marks around the pedestal perimeter
  const tickGeo = trackGeo(new THREE.BoxGeometry(0.022, 0.014, 0.1));
  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2;
    const isCardinal = i % 9 === 0;
    const tick = new THREE.Mesh(tickGeo, isCardinal ? subtleIndicatorMat : brushedAluminumMat);
    const radius = 2.26;
    tick.position.set(Math.sin(angle) * radius, 0.155, Math.cos(angle) * radius);
    tick.rotation.y = angle;
    if (isCardinal) tick.scale.set(1.3, 1.3, 1.4);
    pedestalGroup.add(tick);
  }

  root.add(pedestalGroup);

  // =========================================================================
  // 2. WARM WALNUT & GRAPHITE DESK + PERIPHERALS
  // =========================================================================
  const workstationGroup = new THREE.Group();

  const deskY = 0.92;
  const deskZ = -0.45;
  const tabletop = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(2.35, 0.065, 1.08, 4, 0.02)),
    deskWoodMat
  );
  tabletop.position.set(0, deskY, deskZ);
  tabletop.castShadow = true;
  tabletop.receiveShadow = true;
  workstationGroup.add(tabletop);

  // Subtle brushed-steel rear cable trim bar (no neon LEDs)
  const rearDeskTrim = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(2.1, 0.018, 0.02, 2, 0.008)),
    darkMetalMat
  );
  rearDeskTrim.position.set(0, deskY - 0.032, deskZ - 0.52);
  workstationGroup.add(rearDeskTrim);

  // Brushed gunmetal legs & under-desk cable tray
  [-1.02, 1.02].forEach((lx) => {
    const pillar = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.065, 0.76, 0.065, 3, 0.012)),
      darkMetalMat
    );
    pillar.position.set(lx, 0.53, deskZ - 0.05);
    pillar.castShadow = true;
    workstationGroup.add(pillar);

    const foot = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.08, 0.04, 0.88, 3, 0.012)),
      darkMetalMat
    );
    foot.position.set(lx, 0.16, deskZ);
    foot.castShadow = true;
    workstationGroup.add(foot);
  });

  const cableTray = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(1.5, 0.07, 0.14, 2, 0.01)),
    darkMetalMat
  );
  cableTray.position.set(0, deskY - 0.12, deskZ - 0.34);
  workstationGroup.add(cableTray);

  // Desk Mat
  const deskMat = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(1.38, 0.012, 0.56, 3, 0.005)),
    deskMatPadMat
  );
  deskMat.position.set(0.02, deskY + 0.036, deskZ + 0.16);
  deskMat.receiveShadow = true;
  workstationGroup.add(deskMat);

  // 65% Mechanical Keyboard (Clean Aluminum Case + Neutral Matte Keycaps)
  const kbGroup = new THREE.Group();
  kbGroup.position.set(-0.04, deskY + 0.052, deskZ + 0.19);
  const kbBody = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.48, 0.024, 0.17, 3, 0.008)),
    brushedAluminumMat
  );
  kbBody.castShadow = true;
  kbGroup.add(kbBody);

  const keyGeo = trackGeo(new RoundedBoxGeometry(0.025, 0.014, 0.025, 2, 0.003));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 13; c++) {
      const isEscOrSpace = (r === 0 && c === 0) || (r === 3 && c >= 4 && c <= 7);
      const key = new THREE.Mesh(
        keyGeo,
        isEscOrSpace ? hoodieTrimMat : monitorBezelMat
      );
      key.position.set(-0.205 + c * 0.034, 0.015, -0.05 + r * 0.033);
      kbGroup.add(key);
    }
  }
  workstationGroup.add(kbGroup);

  // Ergonomic Wireless Mouse
  const mouse = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.082, 0.034, 0.125, 4, 0.016)),
    monitorBezelMat
  );
  mouse.position.set(0.36, deskY + 0.055, deskZ + 0.2);
  mouse.castShadow = true;
  workstationGroup.add(mouse);

  // Ceramic Coffee Mug
  const mugGroup = new THREE.Group();
  mugGroup.position.set(0.74, deskY + 0.032, deskZ + 0.24);
  const mugBody = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.048, 0.044, 0.11, 24)),
    trackMat(new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.35, metalness: 0.05 }))
  );
  mugBody.position.y = 0.055;
  mugBody.castShadow = true;
  mugGroup.add(mugBody);

  const coffeeTop = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.042, 0.042, 0.006, 20)),
    trackMat(new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.2 }))
  );
  coffeeTop.position.y = 0.104;
  mugGroup.add(coffeeTop);

  const mugHandle = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(0.03, 0.007, 10, 20, Math.PI)),
    trackMat(new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.35 }))
  );
  mugHandle.rotation.z = -Math.PI / 2;
  mugHandle.position.set(0.048, 0.058, 0);
  mugGroup.add(mugHandle);
  workstationGroup.add(mugGroup);

  // Warm Minimalist Architectural Desk Lamp
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-0.92, deskY + 0.032, deskZ - 0.18);
  const lampBase = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.085, 0.095, 0.022, 24)),
    darkMetalMat
  );
  lampBase.position.y = 0.011;
  lampGroup.add(lampBase);

  const lampStem = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.014, 0.014, 0.42, 16)),
    brushedAluminumMat
  );
  lampStem.position.set(-0.02, 0.22, -0.02);
  lampStem.rotation.z = -0.18;
  lampGroup.add(lampStem);

  const lampHead = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.24, 0.022, 0.045, 2, 0.008)),
    darkMetalMat
  );
  lampHead.position.set(0.08, 0.42, 0.03);
  lampHead.rotation.y = 0.35;
  lampGroup.add(lampHead);

  const lampDiffuser = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(0.21, 0.008, 0.032)),
    warmBulbMat
  );
  lampDiffuser.position.set(0.08, 0.409, 0.03);
  lampDiffuser.rotation.y = 0.35;
  lampGroup.add(lampDiffuser);
  workstationGroup.add(lampGroup);

  tagHotspot(workstationGroup, 'workstation', interactables);
  root.add(workstationGroup);

  // =========================================================================
  // 3. DUAL VESA MONITOR ARM & HARDWARE DISPLAYS
  // =========================================================================
  const vesaClamp = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.09, 0.09, 0.1, 2, 0.01)),
    darkMetalMat
  );
  vesaClamp.position.set(-0.08, deskY + 0.04, deskZ - 0.46);
  root.add(vesaClamp);

  const vesaPole = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.024, 0.024, 0.56, 20)),
    brushedAluminumMat
  );
  vesaPole.position.set(-0.08, deskY + 0.32, deskZ - 0.46);
  vesaPole.castShadow = true;
  root.add(vesaPole);

  // Main Ultrawide Monitor
  const mainMonitorGroup = new THREE.Group();
  mainMonitorGroup.position.set(-0.04, deskY + 0.48, deskZ - 0.25);

  const mainFrame = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(1.16, 0.56, 0.042, 4, 0.014)),
    monitorBezelMat
  );
  mainFrame.castShadow = true;
  mainMonitorGroup.add(mainFrame);

  // Brushed aluminum rear VESA hub
  const rearVesaPlate = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.22, 0.22, 0.035, 3, 0.01)),
    darkMetalMat
  );
  rearVesaPlate.position.z = -0.028;
  mainMonitorGroup.add(rearVesaPlate);

  const rearSpineTrim = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.02, 0.34, 0.012, 2, 0.005)),
    brushedAluminumMat
  );
  rearSpineTrim.position.set(0, 0, -0.046);
  mainMonitorGroup.add(rearSpineTrim);

  const mainArm = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.04, 0.036, 0.22, 2, 0.008)),
    brushedAluminumMat
  );
  mainArm.position.set(-0.02, -0.04, -0.13);
  mainMonitorGroup.add(mainArm);

  const mainIdeHandle = createMainIdeScreenTexture();
  screenHandles.push(mainIdeHandle);
  const mainScreenMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: mainIdeHandle.texture,
      emissiveMap: mainIdeHandle.texture,
      emissive: 0xffffff,
      emissiveIntensity: 0.65,
      roughness: 0.18,
      metalness: 0.06,
    }),
    false
  );
  const mainScreenPlane = new THREE.Mesh(
    trackGeo(new THREE.PlaneGeometry(1.1, 0.505)),
    mainScreenMat
  );
  mainScreenPlane.position.z = 0.023;
  mainMonitorGroup.add(mainScreenPlane);

  tagHotspot(mainMonitorGroup, 'main-monitor', interactables);
  root.add(mainMonitorGroup);

  // Vertical Portrait Side Monitor
  const sideMonitorGroup = new THREE.Group();
  sideMonitorGroup.position.set(0.77, deskY + 0.46, deskZ - 0.13);
  sideMonitorGroup.rotation.y = -0.42;

  const sideFrame = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.42, 0.62, 0.038, 4, 0.012)),
    monitorBezelMat
  );
  sideFrame.castShadow = true;
  sideMonitorGroup.add(sideFrame);

  const sideRearPlate = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.16, 0.16, 0.028, 2, 0.008)),
    darkMetalMat
  );
  sideRearPlate.position.z = -0.024;
  sideMonitorGroup.add(sideRearPlate);

  const sideRearTrim = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.016, 0.28, 0.01, 2, 0.004)),
    brushedAluminumMat
  );
  sideRearTrim.position.z = -0.04;
  sideMonitorGroup.add(sideRearTrim);

  const sideTermHandle = createSideTerminalTexture();
  screenHandles.push(sideTermHandle);
  const sideScreenMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: sideTermHandle.texture,
      emissiveMap: sideTermHandle.texture,
      emissive: 0xffffff,
      emissiveIntensity: 0.65,
      roughness: 0.18,
      metalness: 0.06,
    }),
    false
  );
  const sideScreenPlane = new THREE.Mesh(
    trackGeo(new THREE.PlaneGeometry(0.382, 0.578)),
    sideScreenMat
  );
  sideScreenPlane.position.z = 0.021;
  sideMonitorGroup.add(sideScreenPlane);

  tagHotspot(sideMonitorGroup, 'vertical-monitor', interactables);
  root.add(sideMonitorGroup);

  // Mobile Development Dock + Live Phone Screen
  const mobileRigGroup = new THREE.Group();
  mobileRigGroup.position.set(-0.66, deskY + 0.032, deskZ + 0.12);
  mobileRigGroup.rotation.y = 0.46;

  const phoneStandBase = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.14, 0.016, 0.15, 3, 0.006)),
    brushedAluminumMat
  );
  phoneStandBase.position.y = 0.008;
  mobileRigGroup.add(phoneStandBase);

  const phoneStandNeck = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.04, 0.13, 0.014, 2, 0.004)),
    brushedAluminumMat
  );
  phoneStandNeck.position.set(0, 0.068, -0.032);
  phoneStandNeck.rotation.x = 0.28;
  mobileRigGroup.add(phoneStandNeck);

  const phoneGroup = new THREE.Group();
  phoneGroup.position.set(0, 0.145, 0.005);
  phoneGroup.rotation.x = -0.26;

  const phoneBody = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.115, 0.228, 0.014, 4, 0.014)),
    monitorBezelMat
  );
  phoneBody.castShadow = true;
  phoneGroup.add(phoneBody);

  const camBump = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.038, 0.042, 0.008, 2, 0.006)),
    darkMetalMat
  );
  camBump.position.set(-0.026, 0.072, -0.008);
  phoneGroup.add(camBump);

  const phoneHandle = createPhonePreviewTexture();
  screenHandles.push(phoneHandle);
  const phoneScreenMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: phoneHandle.texture,
      emissiveMap: phoneHandle.texture,
      emissive: 0xffffff,
      emissiveIntensity: 0.72,
      roughness: 0.16,
    }),
    false
  );
  const phoneScreen = new THREE.Mesh(
    trackGeo(new THREE.PlaneGeometry(0.102, 0.206)),
    phoneScreenMat
  );
  phoneScreen.position.z = 0.008;
  phoneGroup.add(phoneScreen);
  mobileRigGroup.add(phoneGroup);

  tagHotspot(mobileRigGroup, 'mobile-rig', interactables);
  root.add(mobileRigGroup);

  // =========================================================================
  // 4. ERGONOMIC DEVELOPER CHAIR (360° SCULPTED SPINE & CASTERS)
  // =========================================================================
  const chairGroup = new THREE.Group();
  chairGroup.position.set(0, 0.14, 0.38);

  const hub = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.055, 0.065, 0.06, 24)),
    brushedAluminumMat
  );
  hub.position.y = 0.08;
  chairGroup.add(hub);

  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const arm = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.038, 0.026, 0.34, 2, 0.008)),
      brushedAluminumMat
    );
    arm.position.set(Math.sin(a) * 0.17, 0.065, Math.cos(a) * 0.17);
    arm.rotation.y = a;
    arm.castShadow = true;
    chairGroup.add(arm);

    const wheel = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.028, 0.028, 0.032, 16)),
      darkMetalMat
    );
    wheel.rotation.z = Math.PI / 2;
    wheel.rotation.y = a;
    wheel.position.set(Math.sin(a) * 0.31, 0.03, Math.cos(a) * 0.31);
    chairGroup.add(wheel);
  }

  const piston = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.026, 0.032, 0.35, 20)),
    darkMetalMat
  );
  piston.position.y = 0.25;
  chairGroup.add(piston);

  const seatPan = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.54, 0.085, 0.5, 5, 0.03)),
    chairMeshMat
  );
  seatPan.position.set(0, 0.43, -0.02);
  seatPan.castShadow = true;
  seatPan.receiveShadow = true;
  chairGroup.add(seatPan);

  [-0.29, 0.29].forEach((ax) => {
    const bracket = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.035, 0.22, 0.045, 2, 0.008)),
      darkMetalMat
    );
    bracket.position.set(ax, 0.54, 0.02);
    chairGroup.add(bracket);

    const pad = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.075, 0.032, 0.26, 3, 0.014)),
      monitorBezelMat
    );
    pad.position.set(ax, 0.65, -0.02);
    chairGroup.add(pad);
  });

  const spinePost = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.075, 0.72, 0.042, 3, 0.012)),
    brushedAluminumMat
  );
  spinePost.position.set(0, 0.78, 0.255);
  spinePost.rotation.x = 0.08;
  spinePost.castShadow = true;
  chairGroup.add(spinePost);

  const backrestFrame = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.48, 0.64, 0.048, 5, 0.02)),
    chairMeshMat
  );
  backrestFrame.position.set(0, 0.84, 0.22);
  backrestFrame.rotation.x = 0.08;
  backrestFrame.castShadow = true;
  chairGroup.add(backrestFrame);

  for (let r = 0; r < 5; r++) {
    const rib = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.4, 0.026, 0.02, 2, 0.008)),
      r === 1 ? brushedAluminumMat : darkMetalMat
    );
    rib.position.set(0, 0.63 + r * 0.095, 0.246 + r * 0.007);
    rib.rotation.x = 0.08;
    chairGroup.add(rib);
  }

  const headrest = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.28, 0.13, 0.055, 4, 0.024)),
    chairMeshMat
  );
  headrest.position.set(0, 1.24, 0.255);
  headrest.rotation.x = -0.1;
  headrest.castShadow = true;
  chairGroup.add(headrest);

  root.add(chairGroup);

  // =========================================================================
  // 5. ARTICULATED 3D PROFESSIONAL DEVELOPER CHARACTER
  // =========================================================================
  const developerGroup = new THREE.Group();
  developerGroup.position.set(0, 0.14, 0.32);

  const hips = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.38, 0.14, 0.28, 4, 0.06)),
    jeansMat
  );
  hips.position.set(0, 0.49, 0.02);
  hips.castShadow = true;
  developerGroup.add(hips);

  [-0.12, 0.12].forEach((lx) => {
    const thigh = new THREE.Mesh(
      trackGeo(new THREE.CapsuleGeometry(0.078, 0.34, 8, 16)),
      jeansMat
    );
    thigh.rotation.x = Math.PI / 2 - 0.08;
    thigh.position.set(lx, 0.49, -0.19);
    thigh.castShadow = true;
    developerGroup.add(thigh);

    const shin = new THREE.Mesh(
      trackGeo(new THREE.CapsuleGeometry(0.066, 0.36, 8, 16)),
      jeansMat
    );
    shin.position.set(lx, 0.27, -0.37);
    shin.rotation.x = 0.05;
    shin.castShadow = true;
    developerGroup.add(shin);

    const shoeUpper = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.115, 0.075, 0.23, 4, 0.028)),
      sneakerMat
    );
    shoeUpper.position.set(lx, 0.052, -0.43);
    shoeUpper.castShadow = true;
    developerGroup.add(shoeUpper);

    const shoeSole = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.12, 0.024, 0.238, 3, 0.01)),
      sneakerSoleMat
    );
    shoeSole.position.set(lx, 0.014, -0.43);
    developerGroup.add(shoeSole);
  });

  const torsoPivot = new THREE.Group();
  torsoPivot.position.set(0, 0.54, 0.02);
  developerGroup.add(torsoPivot);

  const torsoMesh = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.41, 0.48, 0.24, 6, 0.085)),
    hoodieMat
  );
  torsoMesh.position.set(0, 0.25, -0.02);
  torsoMesh.rotation.x = -0.08;
  torsoMesh.castShadow = true;
  torsoPivot.add(torsoMesh);

  const collarV = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.082, 0.095, 0.07, 24)),
    innerShirtMat
  );
  collarV.position.set(0, 0.49, -0.03);
  torsoPivot.add(collarV);

  const drapedHood = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.28, 0.14, 0.13, 5, 0.055)),
    hoodieTrimMat
  );
  drapedHood.position.set(0, 0.46, 0.095);
  drapedHood.rotation.x = 0.35;
  drapedHood.castShadow = true;
  torsoPivot.add(drapedHood);

  // Subtle brushed aluminum chest tag
  const chestBadge = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.042, 0.018, 0.01, 2, 0.004)),
    brushedAluminumMat
  );
  chestBadge.position.set(-0.1, 0.37, -0.145);
  torsoPivot.add(chestBadge);

  // Studio Over-Ear Headphones around collar
  const headphonesGroup = new THREE.Group();
  headphonesGroup.position.set(0, 0.49, -0.03);
  const neckBand = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(0.115, 0.015, 14, 36, Math.PI * 1.28)),
    monitorBezelMat
  );
  neckBand.rotation.x = Math.PI / 2 + 0.18;
  neckBand.rotation.z = -Math.PI * 0.14;
  headphonesGroup.add(neckBand);

  [-0.105, 0.105].forEach((hx) => {
    const cup = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.042, 0.042, 0.032, 20)),
      darkMetalMat
    );
    cup.rotation.z = Math.PI / 2;
    cup.position.set(hx, -0.015, -0.075);
    headphonesGroup.add(cup);

    const cupAccent = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.034, 0.004, 8, 24)),
      brushedAluminumMat
    );
    cupAccent.rotation.y = Math.PI / 2;
    cupAccent.position.set(hx + (hx > 0 ? 0.017 : -0.017), -0.015, -0.075);
    headphonesGroup.add(cupAccent);
  });
  torsoPivot.add(headphonesGroup);

  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.54, -0.04);
  torsoPivot.add(headPivot);

  const neck = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.058, 0.066, 0.1, 20)),
    skinMat
  );
  neck.position.set(0, 0.03, 0);
  headPivot.add(neck);

  const headMesh = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.132, 32, 28)),
    skinMat
  );
  headMesh.scale.set(0.92, 1.08, 0.98);
  headMesh.position.set(0, 0.175, -0.01);
  headMesh.castShadow = true;
  headPivot.add(headMesh);

  [-0.122, 0.122].forEach((ex) => {
    const ear = new THREE.Mesh(
      trackGeo(new THREE.SphereGeometry(0.026, 14, 14)),
      skinMat
    );
    ear.scale.set(0.55, 1.1, 0.8);
    ear.position.set(ex, 0.165, 0.005);
    headPivot.add(ear);
  });

  const hairCap = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.138, 28, 24, 0, Math.PI * 2, 0, Math.PI * 0.58)),
    hairMat
  );
  hairCap.scale.set(0.95, 1.04, 1.02);
  hairCap.position.set(0, 0.19, 0.006);
  hairCap.rotation.x = 0.2;
  hairCap.castShadow = true;
  headPivot.add(hairCap);

  const frontWave = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.19, 0.055, 0.12, 4, 0.024)),
    hairMat
  );
  frontWave.position.set(0.01, 0.285, -0.055);
  frontWave.rotation.set(0.18, -0.1, -0.08);
  headPivot.add(frontWave);

  const backHair = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.18, 0.12, 0.06, 4, 0.025)),
    hairMat
  );
  backHair.position.set(0, 0.175, 0.1);
  headPivot.add(backHair);

  // Facial Features
  [-0.044, 0.044].forEach((bx) => {
    const brow = new THREE.Mesh(
      trackGeo(new RoundedBoxGeometry(0.036, 0.01, 0.012, 2, 0.004)),
      hairMat
    );
    brow.position.set(bx, 0.212, -0.135);
    brow.rotation.z = bx < 0 ? 0.05 : -0.05;
    headPivot.add(brow);
  });

  [-0.044, 0.044].forEach((ex) => {
    const eyeSclera = new THREE.Mesh(
      trackGeo(new THREE.SphereGeometry(0.017, 16, 16)),
      eyeWhiteMat
    );
    eyeSclera.scale.set(1.1, 0.85, 0.65);
    eyeSclera.position.set(ex, 0.184, -0.13);
    headPivot.add(eyeSclera);

    const pupil = new THREE.Mesh(
      trackGeo(new THREE.SphereGeometry(0.0095, 14, 14)),
      pupilMat
    );
    pupil.position.set(ex, 0.184, -0.139);
    headPivot.add(pupil);
  });

  const nose = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.02, 0.036, 0.024, 3, 0.009)),
    skinMat
  );
  nose.position.set(0, 0.16, -0.143);
  headPivot.add(nose);

  const glassesGroup = new THREE.Group();
  glassesGroup.position.set(0, 0.184, -0.155);

  [-0.046, 0.046].forEach((gx) => {
    const topBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.068, 0.006, 0.008)), glassesFrameMat);
    topBar.position.set(gx, 0.021, 0);
    const botBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.068, 0.005, 0.008)), glassesFrameMat);
    botBar.position.set(gx, -0.021, 0);
    const leftBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.005, 0.042, 0.008)), glassesFrameMat);
    leftBar.position.set(gx - 0.032, 0, 0);
    const rightBar = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.005, 0.042, 0.008)), glassesFrameMat);
    rightBar.position.set(gx + 0.032, 0, 0);
    const glassPane = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(0.06, 0.038)), lensMat);
    glassPane.position.set(gx, 0, 0);

    glassesGroup.add(topBar, botBar, leftBar, rightBar, glassPane);
  });

  const bridge = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(0.028, 0.005, 0.008)),
    glassesFrameMat
  );
  bridge.position.set(0, 0.008, 0);
  glassesGroup.add(bridge);

  [-0.08, 0.08].forEach((tx) => {
    const temple = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.005, 0.005, 0.155)),
      glassesFrameMat
    );
    temple.position.set(tx, 0.01, 0.078);
    glassesGroup.add(temple);
  });
  headPivot.add(glassesGroup);

  const createLimbSegment = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    radius: number,
    mat: THREE.Material
  ) => {
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = Math.max(0.02, dir.length() - radius * 1.1);
    const mesh = new THREE.Mesh(
      trackGeo(new THREE.CapsuleGeometry(radius, len, 8, 14)),
      mat
    );
    mesh.position.copy(start).addScaledVector(dir, 0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    mesh.castShadow = true;
    return mesh;
  };

  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.24, 0.42, -0.03);
  const leftElbow = new THREE.Vector3(-0.04, -0.14, -0.2);
  const leftWrist = new THREE.Vector3(0.09, -0.085, -0.47);
  leftArmPivot.add(createLimbSegment(new THREE.Vector3(0, 0, 0), leftElbow, 0.052, hoodieMat));
  leftArmPivot.add(createLimbSegment(leftElbow, leftWrist, 0.044, hoodieMat));

  const watchBand = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.046, 0.046, 0.026, 16)),
    monitorBezelMat
  );
  watchBand.rotation.x = Math.PI / 2;
  watchBand.position.copy(leftWrist);
  leftArmPivot.add(watchBand);

  const watchFace = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.032, 0.01, 0.034, 2, 0.004)),
    subtleIndicatorMat
  );
  watchFace.position.set(leftWrist.x, leftWrist.y + 0.045, leftWrist.z);
  leftArmPivot.add(watchFace);

  const leftHand = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.068, 0.026, 0.082, 3, 0.012)),
    skinMat
  );
  leftHand.position.set(0.11, -0.095, -0.53);
  leftHand.castShadow = true;
  leftArmPivot.add(leftHand);
  torsoPivot.add(leftArmPivot);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.24, 0.42, -0.03);
  const rightElbow = new THREE.Vector3(0.04, -0.14, -0.2);
  const rightWrist = new THREE.Vector3(-0.12, -0.085, -0.47);
  rightArmPivot.add(createLimbSegment(new THREE.Vector3(0, 0, 0), rightElbow, 0.052, hoodieMat));
  rightArmPivot.add(createLimbSegment(rightElbow, rightWrist, 0.044, hoodieMat));

  const rightHand = new THREE.Mesh(
    trackGeo(new RoundedBoxGeometry(0.068, 0.026, 0.082, 3, 0.012)),
    skinMat
  );
  rightHand.position.set(-0.14, -0.095, -0.53);
  rightHand.castShadow = true;
  rightArmPivot.add(rightHand);
  torsoPivot.add(rightArmPivot);

  tagHotspot(developerGroup, 'developer', interactables);
  root.add(developerGroup);

  // =========================================================================
  // 6. SUBTLE ARCHITECTURAL ORBIT RINGS & MONOCHROME STACK BADGES
  // =========================================================================
  const orbitGroup = new THREE.Group();
  orbitGroup.position.set(0, 1.05, 0);

  const outerOrbitRing = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(2.05, 0.005, 8, 120)),
    trackMat(
      new THREE.MeshBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.2 }),
      false
    )
  );
  outerOrbitRing.rotation.set(Math.PI / 2 - 0.16, 0.14, 0);
  orbitGroup.add(outerOrbitRing);

  const techBadges: Array<{ sprite: THREE.Sprite; angle: number; radius: number; yOffset: number; speed: number }> = [];
  const badgeDefs = [
    { label: 'FLUTTER', color: '#60a5fa', radius: 2.02, y: 0.42 },
    { label: '.NET CORE', color: '#a1a1aa', radius: 2.02, y: -0.14 },
    { label: 'KOTLIN', color: '#60a5fa', radius: 1.98, y: 0.54 },
    { label: 'PHP / JS', color: '#a1a1aa', radius: 2.04, y: -0.08 },
    { label: 'MYSQL', color: '#60a5fa', radius: 1.96, y: 0.3 },
    { label: 'GIT / REST', color: '#a1a1aa', radius: 2.0, y: -0.2 },
  ];

  badgeDefs.forEach((def, idx) => {
    const tex = createTechBadgeTexture(def.label, def.color);
    badgeTextures.push(tex);
    const spriteMat = trackMat(
      new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }),
      false
    );
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.52, 0.19, 1);
    const angle = (idx / badgeDefs.length) * Math.PI * 2;
    orbitGroup.add(sprite);
    techBadges.push({
      sprite,
      angle,
      radius: def.radius,
      yOffset: def.y,
      speed: 0.14,
    });
  });

  root.add(orbitGroup);

  // =========================================================================
  // 7. ANIMATION & WIREFRAME CONTROL LOOP
  // =========================================================================
  const setWireframeMode = (enabled: boolean) => {
    wireframeCapableMaterials.forEach((mat) => {
      mat.wireframe = enabled;
    });
  };

  const update = (elapsed: number) => {
    screenHandles.forEach((h) => h.update(elapsed));

    torsoPivot.scale.y = 1 + Math.sin(elapsed * 1.8) * 0.008;
    headPivot.rotation.y = Math.sin(elapsed * 0.65) * 0.1;
    headPivot.rotation.x = Math.sin(elapsed * 0.95) * 0.03;

    leftArmPivot.rotation.x = Math.sin(elapsed * 9.5) * 0.025;
    rightArmPivot.rotation.x = Math.cos(elapsed * 8.2) * 0.018;

    outerOrbitRing.rotation.z = elapsed * 0.1;

    techBadges.forEach((b, i) => {
      const a = b.angle + elapsed * b.speed;
      b.sprite.position.set(
        Math.cos(a) * b.radius,
        b.yOffset + Math.sin(elapsed * 1.2 + i) * 0.06,
        Math.sin(a) * b.radius
      );
    });
  };

  const dispose = () => {
    screenHandles.forEach((h) => h.dispose());
    badgeTextures.forEach((t) => t.dispose());
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
  };

  return {
    root,
    interactables,
    setWireframeMode,
    update,
    dispose,
  };
}
