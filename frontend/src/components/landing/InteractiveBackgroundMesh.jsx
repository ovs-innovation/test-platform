import { useEffect, useRef } from 'react';
import LargeInteractiveParticles from './LargeInteractiveParticles.jsx';

export default function InteractiveBackgroundMesh() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;
    let clock = 0;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = e.clientX - centerX;
      targetY = e.clientY - centerY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth 60fps RAF animation loop with lerp easing
    const animate = () => {
      clock += 0.015;

      // Eased interpolation towards mouse target
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Continuous organic idle drift oscillation
      const idleX1 = Math.sin(clock * 0.8) * 28;
      const idleY1 = Math.cos(clock * 0.7) * 28;

      const idleX2 = Math.cos(clock * 0.6) * 32;
      const idleY2 = Math.sin(clock * 0.9) * 32;

      const idleX3 = Math.sin(clock * 1.1) * 22;
      const idleY3 = Math.cos(clock * 0.5) * 22;

      // Pulse scaling factor (1.0 to 1.12)
      const scale1 = 1 + Math.sin(clock * 0.9) * 0.06;
      const scale2 = 1 + Math.cos(clock * 0.7) * 0.07;
      const scale3 = 1 + Math.sin(clock * 1.2) * 0.05;

      if (orb1Ref.current) {
        const posX = (currentX * -0.18 + idleX1).toFixed(2);
        const posY = (currentY * -0.18 + idleY1).toFixed(2);
        orb1Ref.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale1.toFixed(3)})`;
      }

      if (orb2Ref.current) {
        const posX = (currentX * 0.16 + idleX2).toFixed(2);
        const posY = (currentY * 0.16 + idleY2).toFixed(2);
        orb2Ref.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale2.toFixed(3)})`;
      }

      if (orb3Ref.current) {
        const posX = (currentX * -0.12 + idleX3).toFixed(2);
        const posY = (currentY * 0.12 + idleY3).toFixed(2);
        orb3Ref.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale3.toFixed(3)})`;
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
      {/* Orb 1: Large Bold Primary Blue (#2563EB) Interactive Glow Light Sphere */}
      <div
        ref={orb1Ref}
        className="absolute -top-24 -left-24 h-[550px] w-[550px] sm:h-[650px] sm:w-[650px] rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] opacity-55 blur-[100px]"
      />

      {/* Orb 2: Large Bold Secondary Purple/Violet (#7C3AED) Interactive Glow Light Sphere */}
      <div
        ref={orb2Ref}
        className="absolute -bottom-28 -right-28 h-[600px] w-[600px] sm:h-[720px] sm:w-[720px] rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#9333ea] to-[#6d28d9] opacity-50 blur-[110px]"
      />

      {/* Orb 3: Vibrant Cyan / Sky Light Bloom Sphere (Center Accent) */}
      <div
        ref={orb3Ref}
        className="absolute top-1/4 left-1/3 h-[450px] w-[450px] sm:h-[550px] sm:w-[550px] rounded-full bg-gradient-to-r from-[#00b4d8] via-[#00F0FF] to-[#2563eb] opacity-45 blur-[95px]"
      />

      {/* 18 Large Glowing Particles (15-40px) with Mouse Parallax & Idle Bobbing */}
      <LargeInteractiveParticles />

      {/* Rich Overlapping Diagonal Light Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2563eb]/10 to-[#7c3aed]/10" />
    </div>
  );
}
