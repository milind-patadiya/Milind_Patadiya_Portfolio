import * as THREE from 'three';

export interface AnimatedScreenHandle {
  texture: THREE.CanvasTexture;
  update: (elapsed: number) => void;
  dispose: () => void;
}

/**
 * Generates an authentic GitHub Dark Modern IDE texture for the main ultrawide monitor.
 */
export function createMainIdeScreenTexture(): AnimatedScreenHandle {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  let lastDraw = -1;

  const draw = (elapsed: number) => {
    if (!ctx) return;

    // GitHub Dark Modern background
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Top window bar
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, canvas.width, 34);
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath();
    ctx.arc(20, 17, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath();
    ctx.arc(38, 17, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#27c93f';
    ctx.beginPath();
    ctx.arc(56, 17, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8b949e';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('milind-patadiya — workspace', 82, 22);

    // Left Explorer Sidebar
    ctx.fillStyle = '#090c10';
    ctx.fillRect(0, 34, 195, canvas.height - 34);
    ctx.strokeStyle = '#21262d';
    ctx.beginPath();
    ctx.moveTo(195, 34);
    ctx.lineTo(195, canvas.height);
    ctx.stroke();

    const files = [
      { label: 'EXPLORER', color: '#6e7681', indent: 14 },
      { label: '▾ gitaguide_flutter/', color: '#e6edf3', indent: 14 },
      { label: '  main.dart', color: '#8b949e', indent: 20 },
      { label: '  verse_reader.dart', color: '#8b949e', indent: 20 },
      { label: '▾ cems_portal/', color: '#e6edf3', indent: 14 },
      { label: '  auth_controller.php', color: '#8b949e', indent: 20 },
      { label: '  events_schema.sql', color: '#8b949e', indent: 20 },
      { label: '▾ elogics_dotnet/', color: '#e6edf3', indent: 14 },
      { label: '  Startup.cs', color: '#8b949e', indent: 20 },
      { label: '▾ snakes_kotlin/', color: '#e6edf3', indent: 14 },
      { label: '  GameBoard.kt', color: '#8b949e', indent: 20 },
    ];

    ctx.font = '400 12px "JetBrains Mono", monospace';
    files.forEach((f, idx) => {
      ctx.fillStyle = f.color;
      ctx.fillText(f.label, f.indent, 64 + idx * 26);
    });

    // Editor tab bar
    ctx.fillStyle = '#090c10';
    ctx.fillRect(195, 34, canvas.width - 195, 30);
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(195, 34, 210, 30);
    ctx.fillStyle = '#f78166';
    ctx.fillRect(195, 34, 210, 2);
    ctx.fillStyle = '#e6edf3';
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillText('DeveloperProfile.dart', 214, 53);
    ctx.fillStyle = '#8b949e';
    ctx.fillText('EventService.cs', 428, 53);

    // Code lines (muted GitHub Dark syntax)
    const codeLines: Array<Array<{ text: string; color: string }>> = [
      [
        { text: 'class ', color: '#ff7b72' },
        { text: 'MilindPatadiya ', color: '#ffa657' },
        { text: 'extends ', color: '#ff7b72' },
        { text: 'SoftwareEngineer ', color: '#ffa657' },
        { text: '{', color: '#e6edf3' },
      ],
      [
        { text: '  final ', color: '#ff7b72' },
        { text: 'webStack ', color: '#e6edf3' },
        { text: '= [', color: '#8b949e' },
        { text: "'ASP.NET Core'", color: '#a5d6ff' },
        { text: ', ', color: '#8b949e' },
        { text: "'PHP'", color: '#a5d6ff' },
        { text: ', ', color: '#8b949e' },
        { text: "'JS'", color: '#a5d6ff' },
        { text: ', ', color: '#8b949e' },
        { text: "'MySQL'", color: '#a5d6ff' },
        { text: '];', color: '#8b949e' },
      ],
      [
        { text: '  final ', color: '#ff7b72' },
        { text: 'mobile ', color: '#e6edf3' },
        { text: '= [', color: '#8b949e' },
        { text: "'Flutter'", color: '#a5d6ff' },
        { text: ', ', color: '#8b949e' },
        { text: "'Dart'", color: '#a5d6ff' },
        { text: ', ', color: '#8b949e' },
        { text: "'Kotlin'", color: '#a5d6ff' },
        { text: '];', color: '#8b949e' },
      ],
      [{ text: '', color: '#e6edf3' }],
      [
        { text: '  Future<', color: '#79c0ff' },
        { text: 'BuildResult', color: '#ffa657' },
        { text: '> ', color: '#79c0ff' },
        { text: 'deliverSystem', color: '#d2a8ff' },
        { text: '(Spec spec) ', color: '#e6edf3' },
        { text: 'async ', color: '#ff7b72' },
        { text: '{', color: '#e6edf3' },
      ],
      [
        { text: '    final ', color: '#ff7b72' },
        { text: 'auth ', color: '#e6edf3' },
        { text: '= await ', color: '#ff7b72' },
        { text: 'AuthService.verify', color: '#79c0ff' },
        { text: '(spec.roles);', color: '#8b949e' },
      ],
      [
        { text: '    final ', color: '#ff7b72' },
        { text: 'db   ', color: '#e6edf3' },
        { text: '= await ', color: '#ff7b72' },
        { text: 'MySqlPool.connect', color: '#79c0ff' },
        { text: '();', color: '#8b949e' },
      ],
      [
        { text: '    return ', color: '#ff7b72' },
        { text: 'AppShell.mount', color: '#7ee787' },
        { text: '(auth: auth, db: db);', color: '#8b949e' },
      ],
      [{ text: '  }', color: '#e6edf3' }],
      [{ text: '}', color: '#e6edf3' }],
    ];

    ctx.font = '400 14px "JetBrains Mono", monospace';
    codeLines.forEach((tokens, rowIdx) => {
      const y = 96 + rowIdx * 24;
      ctx.fillStyle = '#484f58';
      ctx.fillText(String(rowIdx + 1).padStart(2, ' '), 210, y);

      let x = 244;
      tokens.forEach((tok) => {
        ctx.fillStyle = tok.color;
        ctx.fillText(tok.text, x, y);
        x += ctx.measureText(tok.text).width;
      });
    });

    // Animated blinking cursor
    if (Math.floor(elapsed * 2) % 2 === 0) {
      ctx.fillStyle = '#e6edf3';
      ctx.fillRect(602, 96 + 7 * 24 - 13, 7, 17);
    }

    // Bottom Terminal Panel
    ctx.fillStyle = '#090c10';
    ctx.fillRect(195, 344, canvas.width - 195, canvas.height - 344);
    ctx.strokeStyle = '#21262d';
    ctx.beginPath();
    ctx.moveTo(195, 344);
    ctx.lineTo(canvas.width, 344);
    ctx.stroke();

    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillStyle = '#8b949e';
    ctx.fillText('TERMINAL', 214, 368);

    ctx.font = '400 13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#7ee787';
    ctx.fillText('✓ dotnet test: 0 failed, build clean', 214, 396);
    ctx.fillStyle = '#a5d6ff';
    ctx.fillText('✓ flutter analyze: no issues found', 214, 420);
    ctx.fillStyle = '#8b949e';
    const dots = '.'.repeat((Math.floor(elapsed * 2) % 3) + 1);
    ctx.fillText(`milind@rajkot:~/projects$ watching${dots}`, 214, 446);

    // Subtle right minimap
    ctx.fillStyle = 'rgba(139, 148, 158, 0.16)';
    for (let i = 0; i < 14; i++) {
      const w = 28 + ((i * 19) % 45);
      ctx.fillRect(940, 82 + i * 11, w, 5);
    }

    texture.needsUpdate = true;
  };

  draw(0);

  return {
    texture,
    update: (elapsed: number) => {
      if (Math.floor(elapsed * 2) !== lastDraw) {
        lastDraw = Math.floor(elapsed * 2);
        draw(elapsed);
      }
    },
    dispose: () => texture.dispose(),
  };
}

/**
 * Generates an understated portrait terminal / git activity screen for the vertical monitor.
 */
export function createSideTerminalTexture(): AnimatedScreenHandle {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  let lastFrame = -1;

  const draw = (elapsed: number) => {
    if (!ctx) return;

    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, canvas.width, 46);
    ctx.fillStyle = '#e6edf3';
    ctx.font = '600 15px "JetBrains Mono", monospace';
    ctx.fillText('LOGS & SYSTEM TELEMETRY', 22, 29);

    // Clean monospace info blocks
    const cards = [
      { title: 'INTERNSHIP', val: 'eLogics Corporation', sub: 'ASP.NET MVC • .NET Core', color: '#7ee787' },
      { title: 'DATABASES', val: 'MySQL + Firestore', sub: 'Relational & NoSQL CRUD', color: '#79c0ff' },
      { title: 'CREDENTIALS', val: 'CCNA • Cisco SRWE', sub: 'SQL • Python Data Science', color: '#d2a8ff' },
    ];

    cards.forEach((c, idx) => {
      const y = 68 + idx * 106;
      ctx.fillStyle = '#161b22';
      ctx.fillRect(22, y, canvas.width - 44, 88);
      ctx.strokeStyle = '#30363d';
      ctx.strokeRect(22, y, canvas.width - 44, 88);

      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#8b949e';
      ctx.fillText(c.title, 38, y + 24);

      ctx.font = '600 19px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#f0f6fc';
      ctx.fillText(c.val, 38, y + 52);

      ctx.font = '400 12px "JetBrains Mono", monospace';
      ctx.fillStyle = c.color;
      ctx.fillText(c.sub, 38, y + 74);
    });

    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillStyle = '#8b949e';
    ctx.fillText('BUILD PIPELINES', 22, 412);

    const bars = ['REST API', 'AUTH JWT', 'MYSQL IO', 'FLUTTER UI', 'KOTLIN VM'];
    bars.forEach((label, idx) => {
      const y = 434 + idx * 48;
      ctx.fillStyle = '#c9d1d9';
      ctx.fillText(label, 22, y + 14);

      ctx.fillStyle = '#21262d';
      ctx.fillRect(128, y + 2, 326, 12);

      const wave = 0.65 + 0.22 * Math.sin(elapsed * 1.6 + idx * 1.1);
      ctx.fillStyle = '#58a6ff';
      ctx.fillRect(128, y + 2, Math.floor(326 * wave), 12);
    });

    ctx.fillStyle = '#7ee787';
    ctx.font = '400 13px "JetBrains Mono", monospace';
    ctx.fillText('● workspace healthy — ready', 22, 690);

    texture.needsUpdate = true;
  };

  draw(0);

  return {
    texture,
    update: (elapsed: number) => {
      const quantized = Math.floor(elapsed * 6);
      if (quantized !== lastFrame) {
        lastFrame = quantized;
        draw(elapsed);
      }
    },
    dispose: () => texture.dispose(),
  };
}

/**
 * Generates a realistic mobile app preview texture for the desk phone dock.
 */
export function createPhonePreviewTexture(): AnimatedScreenHandle {
  const canvas = document.createElement('canvas');
  canvas.width = 280;
  canvas.height = 560;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const draw = () => {
    if (!ctx) return;
    ctx.fillStyle = '#111114';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Status notch
    ctx.fillStyle = '#09090b';
    ctx.fillRect(92, 12, 96, 18);

    // App Header
    ctx.fillStyle = '#fafafa';
    ctx.font = '600 18px "Space Grotesk", sans-serif';
    ctx.fillText('GitaGuide – Path', 24, 68);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '400 12px "JetBrains Mono", monospace';
    ctx.fillText('Flutter • Dart', 24, 90);

    // Card 1
    ctx.fillStyle = '#18181b';
    ctx.fillRect(22, 114, 236, 150);
    ctx.strokeStyle = '#27272a';
    ctx.strokeRect(22, 114, 236, 150);

    ctx.fillStyle = '#f4f4f5';
    ctx.font = '600 15px "Space Grotesk", sans-serif';
    ctx.fillText('Chapter 2 • Verse 47', 36, 148);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '400 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Structured verse reader', 36, 174);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillText('OPEN CHAPTER →', 36, 238);

    // Card 2
    ctx.fillStyle = '#18181b';
    ctx.fillRect(22, 286, 236, 150);
    ctx.strokeStyle = '#27272a';
    ctx.strokeRect(22, 286, 236, 150);

    ctx.fillStyle = '#f4f4f5';
    ctx.font = '600 15px "Space Grotesk", sans-serif';
    ctx.fillText('Snakes & Ladders', 36, 318);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '400 12px "JetBrains Mono", monospace';
    ctx.fillText('Native Kotlin • 2-Player', 36, 342);

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? '#27272a' : '#1f1f23';
        ctx.fillRect(36 + c * 40, 360 + r * 20, 36, 17);
      }
    }

    // Bottom nav bar
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 504, 280, 56);
    ctx.fillStyle = '#f4f4f5';
    ctx.beginPath();
    ctx.arc(70, 532, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#52525b';
    ctx.beginPath();
    ctx.arc(140, 532, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(210, 532, 5, 0, Math.PI * 2);
    ctx.fill();

    texture.needsUpdate = true;
  };

  draw();

  return {
    texture,
    update: () => {},
    dispose: () => texture.dispose(),
  };
}

/**
 * Creates a clean monochrome architectural badge sprite texture for orbiting skill nodes.
 */
export function createTechBadgeTexture(label: string, accentHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const r = 20;
    const x = 10;
    const y = 16;
    const w = 236;
    const h = 64;

    ctx.fillStyle = 'rgba(24, 24, 27, 0.92)';
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.stroke();

    // Subtle dot
    ctx.fillStyle = accentHex;
    ctx.beginPath();
    ctx.arc(36, 48, 5, 0, Math.PI * 2);
    ctx.fill();

    // Crisp monochrome typography
    ctx.fillStyle = '#f4f4f5';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 54, 49);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
