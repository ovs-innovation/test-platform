import { useEffect, useRef } from 'react';

// 18 Large, bold glowing particles in brand colors (Primary Blue #2563EB, Purple #7C3AED, Cyan #00F0FF)
const PARTICLES = [
  { id: 1, x: 12, y: 18, size: 36, color: '#2563eb', shadow: 'rgba(37,99,235,0.7)', speed: 0.18, phase: 0 },
  { id: 2, x: 82, y: 15, size: 40, color: '#7c3aed', shadow: 'rgba(124,58,237,0.7)', speed: -0.22, phase: 1.2 },
  { id: 3, x: 22, y: 78, size: 32, color: '#00f0ff', shadow: 'rgba(0,240,255,0.7)', speed: 0.15, phase: 2.4 },
  { id: 4, x: 75, y: 82, size: 38, color: '#2563eb', shadow: 'rgba(37,99,235,0.7)', speed: -0.19, phase: 0.8 },
  { id: 5, x: 48, y: 12, size: 28, color: '#7c3aed', shadow: 'rgba(124,58,237,0.7)', speed: 0.12, phase: 3.1 },
  { id: 6, x: 10, y: 52, size: 34, color: '#00f0ff', shadow: 'rgba(0,240,255,0.7)', speed: -0.16, phase: 4.0 },
  { id: 7, x: 88, y: 48, size: 42, color: '#2563eb', shadow: 'rgba(37,99,235,0.7)', speed: 0.20, phase: 1.7 },
  { id: 8, x: 32, y: 88, size: 26, color: '#7c3aed', shadow: 'rgba(124,58,237,0.7)', speed: -0.14, phase: 2.9 },
  { id: 9, x: 65, y: 92, size: 30, color: '#00f0ff', shadow: 'rgba(0,240,255,0.7)', speed: 0.16, phase: 0.5 },
  { id: 10, x: 5, y: 85, size: 36, color: '#2563eb', shadow: 'rgba(37,99,235,0.7)', speed: -0.17, phase: 3.6 },
  { id: 11, x: 92, y: 80, size: 32, color: '#7c3aed', shadow: 'rgba(124,58,237,0.7)', speed: 0.18, phase: 4.8 },
  { id: 12, x: 18, y: 35, size: 24, color: '#00f0ff', shadow: 'rgba(0,240,255,0.7)', speed: -0.11, phase: 1.1 },
  { id: 13, x: 84, y: 32, size: 35, color: '#2563eb', shadow: 'rgba(37,99,235,0.7)', speed: 0.19, phase: 2.2 },
  { id: 14, x: 42, y: 70, size: 22, color: '#7c3aed', shadow: 'rgba(124,58,237,0.7)', speed: -0.13, phase: 3.9 },
  { id: 15, x: 58, y: 25, size: 38, color: '#00f0ff', shadow: 'rgba(0,240,255,0.7)', speed: 0.21, phase: 0.3 },
  { id: 16, x: 28, y: 48, size: 20, color: '#2563eb', shadow: 'rgba(37,99,235,0.7)', speed: -0.10, phase: 5.1 },
  { id: 17, x: 70, y: 60, size: 26, color: '#7c3aed', shadow: 'rgba(124,58,237,0.7)', speed: 0.14, phase: 1.9 },
  { id: 18, x: 50, y: 85, size: 34, color: '#00f0ff', shadow: 'rgba(0,240,255,0.7)', speed: -0.18, phase: 4.2 },
];

export default function LargeInteractiveParticles() {
  const particleRefs = useRef([]);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;
    let time = 0;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Track mouse offset relative to screen center
      targetX = e.clientX - centerX;
      targetY = e.clientY - centerY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth RAF render loop updating translate3d & scale directly without CSS transitions
    const render = () => {
      time += 0.018;

      // Lerp easing for smooth cursor inertia
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      particleRefs.current.forEach((el, index) => {
        if (!el) return;
        const p = PARTICLES[index];
        if (!p) return;

        // Continuous organic idle floating path
        const idleX = Math.sin(time * 0.9 + p.phase) * 16;
        const idleY = Math.cos(time * 0.7 + p.phase) * 16;

        // Mouse parallax shift
        const parallaxX = currentX * p.speed;
        const parallaxY = currentY * p.speed;

        const finalX = parallaxX + idleX;
        const finalY = parallaxY + idleY;

        // Gentle pulsing glow scale (1.0 to 1.15)
        const scale = 1 + Math.sin(time * 1.6 + p.phase) * 0.12;

        el.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
      {PARTICLES.map((p, idx) => (
        <div
          key={p.id}
          ref={(el) => (particleRefs.current[idx] = el)}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 1.2}px ${p.shadow}, 0 0 ${p.size * 0.6}px ${p.color}`,
          }}
          className="absolute rounded-full opacity-70 border border-white/20"
        />
      ))}
    </div>
  );
}
