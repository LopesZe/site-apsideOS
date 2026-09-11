import { useEffect, useRef, useState } from 'react';

export function GalaxyMerge() {
  return (
    <svg className="galaxy-svg" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="g1" cx="35%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#e8e4d4" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#b8c4a0" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#6b7a9a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="65%" cy="55%" r="38%">
          <stop offset="0%" stopColor="#eaeae4" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#c4d6a7" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#7a8ab0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="merge-glow" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="#d4dfc0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#090909" stopOpacity="0" />
        </radialGradient>
        <filter id="galaxy-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="glow-filter">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Galaxy 1 — esquerda, mais compacta */}
      <g opacity="0.85">
        <ellipse cx="220" cy="230" rx="155" ry="120" fill="url(#g1)" transform="rotate(-18 220 230)" />
        <ellipse cx="220" cy="230" rx="90" ry="65" fill="url(#g1)" transform="rotate(-18 220 230)" opacity="0.7" />
        <ellipse cx="220" cy="230" rx="40" ry="28" fill="#e8e4d4" opacity="0.5" transform="rotate(-18 220 230)" />
        {/* Braços espirais */}
        <path d="M220 230 Q280 180 340 200 Q380 215 370 260" stroke="#b8c4a0" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#galaxy-blur)" />
        <path d="M220 230 Q160 280 120 250 Q90 230 100 190" stroke="#8a9ab0" strokeWidth="1.2" fill="none" opacity="0.25" filter="url(#galaxy-blur)" />
        <path d="M220 230 Q260 290 310 300 Q350 305 360 270" stroke="#c4d6a7" strokeWidth="1" fill="none" opacity="0.2" filter="url(#galaxy-blur)" />
      </g>
      {/* Galaxy 2 — direita, maior, mais aberta */}
      <g opacity="0.8">
        <ellipse cx="380" cy="270" rx="170" ry="135" fill="url(#g2)" transform="rotate(12 380 270)" />
        <ellipse cx="380" cy="270" rx="100" ry="75" fill="url(#g2)" transform="rotate(12 380 270)" opacity="0.65" />
        <ellipse cx="380" cy="270" rx="45" ry="30" fill="#eaeae4" opacity="0.45" transform="rotate(12 380 270)" />
        {/* Braços espirais */}
        <path d="M380 270 Q430 210 490 230 Q530 245 520 290" stroke="#c4d6a7" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#galaxy-blur)" />
        <path d="M380 270 Q320 320 280 300 Q250 285 260 245" stroke="#b8c4a0" strokeWidth="1.2" fill="none" opacity="0.25" filter="url(#galaxy-blur)" />
        <path d="M380 270 Q420 330 470 340 Q510 345 520 310" stroke="#8a9ab0" strokeWidth="1" fill="none" opacity="0.2" filter="url(#galaxy-blur)" />
      </g>
      {/* Zona de fusão — brilho central */}
      <ellipse cx="300" cy="255" rx="80" ry="60" fill="url(#merge-glow)" filter="url(#glow-filter)" />
      {/* Estrelas de fundo pontilhadas */}
      {Array.from({ length: 60 }, (_, i) => {
        const x = Math.random() * 600;
        const y = Math.random() * 500;
        const r = Math.random() * 1.2 + 0.3;
        const o = Math.random() * 0.5 + 0.15;
        return <circle key={i} cx={x} cy={y} r={r} fill="#eaeae4" opacity={o} />;
      })}
      {/* Nuvens de poeira na zona de contato */}
      <ellipse cx="290" cy="240" rx="55" ry="35" fill="#c4d6a7" opacity="0.08" filter="url(#galaxy-blur)" transform="rotate(-8 290 240)" />
      <ellipse cx="310" cy="265" rx="50" ry="30" fill="#b8c4a0" opacity="0.06" filter="url(#galaxy-blur)" transform="rotate(15 310 265)" />
    </svg>
  );
}

export function Starfield() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current; if (!el) return;
    const ctx = el.getContext('2d'); if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = window.innerWidth, height = window.innerHeight, frame = 0, active = !document.hidden;
    const mouse = { x: -1000, y: -1000 };
    const stars = Array.from({ length: width < 700 ? 70 : 180 }, () => ({ nx: Math.random(), ny: Math.random(), dx: 0, dy: 0, size: Math.random() * .95 + .25, phase: Math.random() * 6.28, speed: [.45, 1.1, 2.3][Math.floor(Math.random() * 3)] }));
    const resize = () => { width = window.innerWidth; height = window.innerHeight; const dpr = Math.min(window.devicePixelRatio, 1.5); el.width = width * dpr; el.height = height * dpr; el.style.width = width + 'px'; el.style.height = height + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const move = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const leave = () => { mouse.x = -1000; mouse.y = -1000; };
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const x = s.nx * width, y = s.ny * height;
        const vx = x - mouse.x, vy = y - mouse.y, distance = Math.hypot(vx, vy);
        const force = !reduced.matches && distance < 160 ? (1 - distance / 160) * 38 : 0;
        s.dx += ((distance ? vx / distance : 0) * force - s.dx) * .055;
        s.dy += ((distance ? vy / distance : 0) * force - s.dy) * .055;
        const alpha = reduced.matches ? .25 : .1 + (Math.sin(time * .001 * s.speed + s.phase) + 1) * .2;
        ctx.fillStyle = `rgba(224,228,218,${alpha})`;
        ctx.beginPath(); ctx.arc(x + s.dx, y + s.dy, s.size, 0, Math.PI * 2); ctx.fill();
      }
      if (active && !reduced.matches) frame = requestAnimationFrame(draw);
    };
    const visibility = () => { active = !document.hidden; cancelAnimationFrame(frame); if (active) draw(performance.now()); };
    const motion = () => { cancelAnimationFrame(frame); draw(performance.now()); };
    resize(); draw(0);
    window.addEventListener('resize', resize); window.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', motion);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', motion); };
  }, []);
  return <canvas className="starfield" ref={canvas} aria-hidden="true" />;
}

function LiveSculpture({ paused, onReady, onError }: { paused: boolean; onReady: () => void; onError: () => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => {
    let disposed = false, cleanup = () => {};
    const init = async () => {
      try {
        const THREE = await import('three');
        const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
        if (disposed || !mount.current) return;
        const host = mount.current;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
        renderer.setClearColor(0x090909, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.25;
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, .1, 50); camera.position.set(0, 0, 8.3);
        const room = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const target = pmrem.fromScene(room, .025); scene.environment = target.texture;
        const geometry = new THREE.TorusKnotGeometry(1.24, .41, 256, 48, 2, 3);
        const material = new THREE.MeshPhysicalMaterial({ color: 0xc4c5c6, metalness: 1, roughness: .12, clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: 1.55 });
        const mesh = new THREE.Mesh(geometry, material); mesh.rotation.set(.15, -.5, -.45); scene.add(mesh);
        const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(3, 5, 4); scene.add(key);
        const rim = new THREE.DirectionalLight(0xffffff, 3); rim.position.set(-5, -1, 2); scene.add(rim);
        let frame = 0, visible = true, dragging = false, oldX = 0, oldY = 0, rotX = .15, rotY = -.5, last = 0, elapsed = 0;
        const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); };
        const ro = new ResizeObserver(resize); ro.observe(host); resize();
        const down = (e: PointerEvent) => { dragging = true; oldX = e.clientX; oldY = e.clientY; host.setPointerCapture(e.pointerId); };
        const move = (e: PointerEvent) => { if (!dragging) return; rotY += (e.clientX - oldX) * .008; rotX += (e.clientY - oldY) * .008; oldX = e.clientX; oldY = e.clientY; };
        const up = () => { dragging = false; };
        host.addEventListener('pointerdown', down); host.addEventListener('pointermove', move); host.addEventListener('pointerup', up); host.addEventListener('pointercancel', up);
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const draw = (time: number) => { const delta = Math.min((time - last) / 1000, .04); last = time; if (visible && !document.hidden) { if (!pauseRef.current && !reduced.matches && !dragging) { rotY += delta * .12; elapsed += delta; } mesh.rotation.x += (rotX - mesh.rotation.x) * .08; mesh.rotation.y += (rotY - mesh.rotation.y) * .08; mesh.position.y = reduced.matches ? 0 : Math.sin(elapsed * .65) * .07; renderer.render(scene, camera); } frame = requestAnimationFrame(draw); };
        const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); io.observe(host);
        const keydown = (e: KeyboardEvent) => { if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) { e.preventDefault(); rotY += e.key === 'ArrowLeft' ? -.18 : e.key === 'ArrowRight' ? .18 : 0; rotX += e.key === 'ArrowUp' ? -.18 : e.key === 'ArrowDown' ? .18 : 0; } };
        host.addEventListener('keydown', keydown);
        cleanup = () => { cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); host.removeEventListener('pointerdown', down); host.removeEventListener('pointermove', move); host.removeEventListener('pointerup', up); host.removeEventListener('pointercancel', up); host.removeEventListener('keydown', keydown); geometry.dispose(); material.dispose(); target.dispose(); pmrem.dispose(); room.dispose(); renderer.dispose(); renderer.domElement.remove(); };
        renderer.render(scene, camera); onReady(); frame = requestAnimationFrame(draw);
      } catch { if (!disposed) onError(); }
    };
    init();
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div className="live-sculpture" ref={mount} tabIndex={0} role="img" aria-label="Escultura 3D cromada interativa. Arraste ou use as setas do teclado para girar." />;
}

export function Sculpture() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);
  return <div className={`sculpture ${paused ? 'sculpture-paused' : ''} ${ready ? 'sculpture-live' : ''}`}>
    <div className="sculpture-orbit orbit-one" /><div className="sculpture-orbit orbit-two" />
    <img className="chrome-art" src="/images/apside-chrome.jpg" alt="Escultura de órbitas entrelaçadas em cromo, símbolo de conexão e movimento" fetchPriority="high" />
    {live && <LiveSculpture paused={paused} onReady={() => setReady(true)} onError={() => { setLive(false); setReady(false); setError(true); }} />}
    <span className="object-label"><span className="crosshair">+</span> OBJETO 001 — CONEXÃO</span>
    <div className="sculpture-tag"><span className="tiny-orbit">◎</span> O PRÓXIMO NÍVEL NÃO É POR ACASO.</div>
    <div className="sculpture-controls">
      <span>{error ? 'Visual 3D indisponível neste dispositivo' : ready ? 'ARRASTE PARA EXPLORAR' : 'IDEIAS EM MOVIMENTO'}</span>
      <button aria-label={paused ? 'Retomar animação' : 'Pausar animação'} onClick={() => setPaused(!paused)}>{paused ? '▷' : 'Ⅱ'}</button>
      <button className="explore-3d" onClick={() => { if (live) { setLive(false); setReady(false); } else { setError(false); setLive(true); } }}>{live ? ready ? 'Sair do 3D ↗' : 'Carregando…' : 'Explorar em 3D ↗'}</button>
    </div>
  </div>;
}
