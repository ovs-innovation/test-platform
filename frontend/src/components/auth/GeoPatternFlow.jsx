import { useMemo } from 'react';

export default function GeoPatternFlow() {
  // Generate 32 Left Mesh Longitudinal Lines (Dense Parametric Surface)
  const leftMeshLines = useMemo(() => {
    const lines = [];
    const count = 34;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1); // 0 to 1
      const yStart = -60 + t * 260;
      const xWaist = 180 + Math.sin(t * Math.PI) * 110;
      const yWaist = 260 + t * 180;
      const xEnd = 360 + t * 340;
      const yEnd = 700 + t * 260;

      const cp1x = 100 + t * 80;
      const cp1y = yStart + 80;
      const cp2x = xWaist + (t - 0.5) * 60;
      const cp2y = yWaist;

      const isHighlight = i === 4 || i === 12 || i === 22 || i === 30;
      const opacity = isHighlight ? 0.28 : 0.06 + Math.sin(t * Math.PI) * 0.11;
      const stroke = isHighlight ? '#38BDF8' : '#2563EB';

      lines.push({
        id: `left-line-${i}`,
        d: `M -120 ${yStart} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${xEnd} ${yEnd}`,
        opacity,
        stroke,
        strokeWidth: isHighlight ? 1.4 : 0.9,
      });
    }
    return lines;
  }, []);

  // Generate 14 Left Mesh Cross-Contour Lines
  const leftCrossLines = useMemo(() => {
    const lines = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const u = (i + 1) / (count + 1);
      const xStart = -80 + u * 400;
      const yStart = 20 + u * 650;
      const xEnd = 80 + u * 580;
      const yEnd = 160 + u * 720;
      const cpx = xStart + 120;
      const cpy = yStart + 80;

      lines.push({
        id: `left-cross-${i}`,
        d: `M ${xStart} ${yStart} Q ${cpx} ${cpy} ${xEnd} ${yEnd}`,
        opacity: 0.04 + Math.sin(u * Math.PI) * 0.05,
      });
    }
    return lines;
  }, []);

  // Generate 34 Right Mesh Longitudinal Lines (Dense Parametric Surface)
  const rightMeshLines = useMemo(() => {
    const lines = [];
    const count = 34;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const yStart = 120 + t * 280;
      const xWaist = 1260 - Math.sin(t * Math.PI) * 120;
      const yWaist = 380 + t * 200;
      const xEnd = 760 + t * 360;
      const yEnd = 960 + t * 160;

      const cp1x = 1420 - t * 100;
      const cp1y = yStart + 60;
      const cp2x = xWaist - (t - 0.5) * 70;
      const cp2y = yWaist;

      const isHighlight = i === 5 || i === 15 || i === 25 || i === 31;
      const opacity = isHighlight ? 0.28 : 0.06 + Math.sin(t * Math.PI) * 0.11;
      const stroke = isHighlight ? '#38BDF8' : '#3B82F6';

      lines.push({
        id: `right-line-${i}`,
        d: `M 1560 ${yStart} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${xEnd} ${yEnd}`,
        opacity,
        stroke,
        strokeWidth: isHighlight ? 1.4 : 0.9,
      });
    }
    return lines;
  }, []);

  // Generate 14 Right Mesh Cross-Contour Lines
  const rightCrossLines = useMemo(() => {
    const lines = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const u = (i + 1) / (count + 1);
      const xStart = 1520 - u * 380;
      const yStart = 160 + u * 620;
      const xEnd = 1140 - u * 320;
      const yEnd = 300 + u * 700;
      const cpx = xStart - 100;
      const cpy = yStart + 90;

      lines.push({
        id: `right-cross-${i}`,
        d: `M ${xStart} ${yStart} Q ${cpx} ${cpy} ${xEnd} ${yEnd}`,
        opacity: 0.04 + Math.sin(u * Math.PI) * 0.05,
      });
    }
    return lines;
  }, []);

  // Generate Selective Micro-Points
  const selectivePoints = useMemo(() => {
    const points = [];
    for (let i = 2; i < 32; i += 4) {
      for (let j = 2; j < 12; j += 4) {
        const u = j / 14;
        const v = i / 34;
        const x = -40 + u * 420 + Math.sin(v * Math.PI) * 40;
        const y = 60 + u * 520 + v * 120;
        points.push({
          id: `pt-left-${i}-${j}`,
          cx: x,
          cy: y,
          r: (i % 3 === 0) ? 2 : 1.5,
          opacity: 0.4 + (i % 3 === 0 ? 0.3 : 0.1),
          glow: i === 10 || i === 22,
        });
      }
    }
    for (let i = 2; i < 32; i += 4) {
      for (let j = 2; j < 12; j += 4) {
        const u = j / 14;
        const v = i / 34;
        const x = 1480 - u * 420 - Math.sin(v * Math.PI) * 40;
        const y = 180 + u * 540 + v * 100;
        points.push({
          id: `pt-right-${i}-${j}`,
          cx: x,
          cy: y,
          r: (i % 3 === 0) ? 2 : 1.5,
          opacity: 0.4 + (i % 3 === 0 ? 0.3 : 0.1),
          glow: i === 14 || i === 26,
        });
      }
    }
    return points;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0 bg-[#051329]" aria-hidden="true">
      {/* BASE DEEP NAVY ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_40%,#0a1c3d_0%,#07152b_60%,#030914_100%)]" />

      {/* RICH BLUE ATMOSPHERIC ILLUMINATION (Left & Right Edge Soft Washes) */}
      <div className="absolute top-[8%] -left-[12%] h-[750px] w-[750px] rounded-full bg-[#2563EB]/[0.11] blur-[170px]" />
      <div className="absolute top-[15%] -right-[12%] h-[800px] w-[800px] rounded-full bg-[#3B82F6]/[0.10] blur-[180px]" />

      {/* DARK CENTER BEHIND AUTHENTICATION CARD */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-[65%] rounded-full bg-[#040b18]/80 blur-[80px]" />

      {/* OUTER EDGE DARK NAVY VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#020610_100%)] opacity-85" />

      {/* SVG DENSE PARAMETRIC WIREFRAME FABRIC MESH */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <defs>
          {/* Linear Gradient for Bottom Fade */}
          <linearGradient id="bottom-gradient-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Mask combining center card cutout & progressive bottom fade */}
          <mask id="geo-pattern-mask">
            <rect width="1440" height="900" fill="url(#bottom-gradient-fade)" />
            <rect x="240" y="70" width="960" height="760" rx="40" fill="black" filter="url(#mask-blur)" />
          </mask>

          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="45" />
          </filter>

          <filter id="point-glow-filter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g mask="url(#geo-pattern-mask)">
          {/* FAR LAYER */}
          <g className="animate-geo-back" stroke="#1D4ED8" strokeWidth="0.8" opacity="0.05" fill="none">
            <path d="M -120 0 Q 200 160 380 440 T 700 960" />
            <path d="M -120 40 Q 220 190 400 470 T 720 990" />
            <path d="M -120 80 Q 240 220 420 500 T 740 1020" />
            <path d="M 1560 140 Q 1200 320 1020 560 T 680 1040" />
            <path d="M 1560 180 Q 1180 350 1000 590 T 660 1070" />
          </g>

          {/* MAIN LAYER */}
          <g className="animate-geo-mid-left" fill="none">
            {leftMeshLines.map((line) => (
              <path key={line.id} d={line.d} stroke={line.stroke} strokeWidth={line.strokeWidth} opacity={line.opacity} />
            ))}
          </g>

          <g className="animate-geo-mid-right" fill="none">
            {rightMeshLines.map((line) => (
              <path key={line.id} d={line.d} stroke={line.stroke} strokeWidth={line.strokeWidth} opacity={line.opacity} />
            ))}
          </g>

          {/* DETAIL LAYER */}
          <g className="animate-geo-mid-left" stroke="#60A5FA" strokeWidth="0.8" fill="none">
            {leftCrossLines.map((line) => (
              <path key={line.id} d={line.d} opacity={line.opacity} />
            ))}
          </g>

          <g className="animate-geo-mid-right" stroke="#60A5FA" strokeWidth="0.8" fill="none">
            {rightCrossLines.map((line) => (
              <path key={line.id} d={line.d} opacity={line.opacity} />
            ))}
          </g>

          {/* SELECTIVE MICRO-POINTS */}
          <g className="animate-geo-front">
            {selectivePoints.map((pt) => (
              <circle
                key={pt.id}
                cx={pt.cx}
                cy={pt.cy}
                r={pt.r}
                fill={pt.glow ? '#38BDF8' : '#60A5FA'}
                opacity={pt.opacity}
                filter={pt.glow ? 'url(#point-glow-filter)' : undefined}
              />
            ))}
          </g>
        </g>

        {/* MOBILE SIMPLIFIED CURVES (< sm viewports) */}
        <g className="sm:hidden" opacity="0.25">
          <path d="M -40 60 Q 180 30 420 100" fill="none" stroke="#38BDF8" strokeWidth="1.2" />
          <path d="M -40 85 Q 180 55 420 125" fill="none" stroke="#2563EB" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
