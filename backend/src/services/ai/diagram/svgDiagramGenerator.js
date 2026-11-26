/**
 * Programmatic and AI-Driven SVG Diagram Generation Engine
 * Generates examination-quality vector diagrams for NEET & JEE questions.
 */

import { DEFAULT_CANVAS_CONFIG, FORBIDDEN_ANSWER_PATTERNS } from './diagramConfig.js';
import { aiProvider } from '../aiProvider.js';

// Helper: Escape XML special characters
export function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * 1. PHYSICS: Electric Circuit Programmatic SVG
 */
export function buildElectricCircuitSvg({
  title = 'Circuit Diagram',
  circuitType = 'bridge', // 'series', 'parallel', 'bridge', 'rc_circuit'
  markers = ['X', 'Y', 'A', 'B'],
  width = 600,
  height = 400,
} = {}) {
  const m1 = markers[0] || 'A';
  const m2 = markers[1] || 'B';
  const m3 = markers[2] || 'X';
  const m4 = markers[3] || 'Y';

  let circuitPaths = '';

  if (circuitType === 'bridge' || circuitType === 'default') {
    // Wheatstone Bridge / Diamond Circuit
    circuitPaths = `
      <!-- Main diamond wires -->
      <line x1="100" y1="200" x2="250" y2="100" stroke="#0f172a" stroke-width="2.5" />
      <line x1="250" y1="100" x2="400" y2="200" stroke="#0f172a" stroke-width="2.5" />
      <line x1="100" y1="200" x2="250" y2="300" stroke="#0f172a" stroke-width="2.5" />
      <line x1="250" y1="300" x2="400" y2="200" stroke="#0f172a" stroke-width="2.5" />

      <!-- Center Galvanometer / Cross branch -->
      <line x1="250" y1="100" x2="250" y2="175" stroke="#0f172a" stroke-width="2" />
      <circle cx="250" cy="200" r="25" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
      <text x="250" y="206" font-family="system-ui" font-size="16" font-weight="bold" text-anchor="middle" fill="#0f172a">G</text>
      <line x1="250" y1="225" x2="250" y2="300" stroke="#0f172a" stroke-width="2" />

      <!-- Outer battery branch -->
      <line x1="100" y1="200" x2="60" y2="200" stroke="#0f172a" stroke-width="2" />
      <line x1="60" y1="200" x2="60" y2="360" stroke="#0f172a" stroke-width="2" />
      <line x1="60" y1="360" x2="220" y2="360" stroke="#0f172a" stroke-width="2" />

      <!-- DC Battery cell -->
      <line x1="220" y1="345" x2="220" y2="375" stroke="#0f172a" stroke-width="3" />
      <line x1="235" y1="352" x2="235" y2="368" stroke="#0f172a" stroke-width="2" />
      <line x1="250" y1="345" x2="250" y2="375" stroke="#0f172a" stroke-width="3" />
      <line x1="265" y1="352" x2="265" y2="368" stroke="#0f172a" stroke-width="2" />

      <line x1="265" y1="360" x2="440" y2="360" stroke="#0f172a" stroke-width="2" />
      <line x1="440" y1="360" x2="440" y2="200" stroke="#0f172a" stroke-width="2" />
      <line x1="440" y1="200" x2="400" y2="200" stroke="#0f172a" stroke-width="2" />

      <!-- Resistor 1 (Top Left) -->
      <rect x="150" y="130" width="50" height="24" transform="rotate(-34 175 142)" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="165" y="125" font-family="system-ui" font-size="14" font-weight="bold" fill="#2563eb">${escapeXml(m1)}</text>

      <!-- Resistor 2 (Top Right) -->
      <rect x="300" y="130" width="50" height="24" transform="rotate(34 325 142)" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="330" y="125" font-family="system-ui" font-size="14" font-weight="bold" fill="#2563eb">${escapeXml(m2)}</text>

      <!-- Resistor 3 (Bottom Left) -->
      <rect x="150" y="245" width="50" height="24" transform="rotate(34 175 257)" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="165" y="285" font-family="system-ui" font-size="14" font-weight="bold" fill="#2563eb">${escapeXml(m3)}</text>

      <!-- Resistor 4 (Bottom Right) -->
      <rect x="300" y="245" width="50" height="24" transform="rotate(-34 325 257)" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="330" y="285" font-family="system-ui" font-size="14" font-weight="bold" fill="#2563eb">${escapeXml(m4)}</text>

      <!-- Node Junction Dots -->
      <circle cx="100" cy="200" r="5" fill="#0f172a" />
      <circle cx="400" cy="200" r="5" fill="#0f172a" />
      <circle cx="250" cy="100" r="5" fill="#0f172a" />
      <circle cx="250" cy="300" r="5" fill="#0f172a" />
    `;
  } else {
    // Series-Parallel combo
    circuitPaths = `
      <line x1="80" y1="200" x2="160" y2="200" stroke="#0f172a" stroke-width="2" />
      <!-- Top parallel branch -->
      <line x1="160" y1="200" x2="160" y2="130" stroke="#0f172a" stroke-width="2" />
      <line x1="160" y1="130" x2="230" y2="130" stroke="#0f172a" stroke-width="2" />
      <rect x="230" y="118" width="60" height="24" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="260" y="135" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#2563eb">${escapeXml(m1)}</text>
      <line x1="290" y1="130" x2="360" y2="130" stroke="#0f172a" stroke-width="2" />
      <line x1="360" y1="130" x2="360" y2="200" stroke="#0f172a" stroke-width="2" />

      <!-- Bottom parallel branch -->
      <line x1="160" y1="200" x2="160" y2="270" stroke="#0f172a" stroke-width="2" />
      <line x1="160" y1="270" x2="230" y2="270" stroke="#0f172a" stroke-width="2" />
      <rect x="230" y="258" width="60" height="24" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="260" y="275" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#2563eb">${escapeXml(m2)}</text>
      <line x1="290" y1="270" x2="360" y2="270" stroke="#0f172a" stroke-width="2" />
      <line x1="360" y1="270" x2="360" y2="200" stroke="#0f172a" stroke-width="2" />

      <!-- Series resistor following -->
      <line x1="360" y1="200" x2="420" y2="200" stroke="#0f172a" stroke-width="2" />
      <rect x="420" y="188" width="60" height="24" fill="#ffffff" stroke="#2563eb" stroke-width="2" rx="3" />
      <text x="450" y="205" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#2563eb">${escapeXml(m3)}</text>
      <line x1="480" y1="200" x2="540" y2="200" stroke="#0f172a" stroke-width="2" />

      <!-- Node Junctions -->
      <circle cx="160" cy="200" r="4.5" fill="#0f172a" />
      <circle cx="360" cy="200" r="4.5" fill="#0f172a" />
      <circle cx="80" cy="200" r="4.5" fill="#0f172a" />
      <circle cx="540" cy="200" r="4.5" fill="#0f172a" />
      <text x="75" y="190" font-family="system-ui" font-size="14" font-weight="bold" fill="#0f172a">A</text>
      <text x="545" y="190" font-family="system-ui" font-size="14" font-weight="bold" fill="#0f172a">B</text>
    `;
  }

  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  <text x="30" y="40" font-family="system-ui" font-size="15" font-weight="600" fill="#334155">${escapeXml(title)}</text>
  ${circuitPaths}
</svg>`.trim();
}

/**
 * 2. PHYSICS: Ray Optics Programmatic SVG
 */
export function buildRayOpticsSvg({
  title = 'Ray Optics Diagram',
  opticType = 'convex_lens', // 'convex_lens', 'concave_lens', 'concave_mirror'
  markers = ['O', 'I', 'F', '2F'],
  width = 600,
  height = 400,
} = {}) {
  const mObj = markers[0] || 'O';
  const mImg = markers[1] || 'I';

  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
  <defs>
    <!-- Arrowhead markers -->
    <marker id="rayArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
    </marker>
    <marker id="arrowHead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626" />
    </marker>
  </defs>

  <rect width="${width}" height="${height}" fill="#ffffff" />
  <text x="30" y="40" font-family="system-ui" font-size="15" font-weight="600" fill="#334155">${escapeXml(title)}</text>

  <!-- Principal Axis -->
  <line x1="40" y1="200" x2="560" y2="200" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6,4" />

  <!-- Convex Lens -->
  <path d="M 300 80 Q 320 200 300 320 Q 280 200 300 80 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" />
  <line x1="300" y1="70" x2="300" y2="330" stroke="#0284c7" stroke-width="1" stroke-dasharray="3,3" />

  <!-- Focal Points Markers -->
  <circle cx="210" cy="200" r="3.5" fill="#0f172a" />
  <text x="210" y="222" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">F₁</text>

  <circle cx="120" cy="200" r="3.5" fill="#0f172a" />
  <text x="120" y="222" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">2F₁</text>

  <circle cx="390" cy="200" r="3.5" fill="#0f172a" />
  <text x="390" y="222" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">F₂</text>

  <circle cx="480" cy="200" r="3.5" fill="#0f172a" />
  <text x="480" y="222" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">2F₂</text>

  <!-- Optical Center O -->
  <circle cx="300" cy="200" r="3" fill="#0f172a" />
  <text x="308" y="218" font-family="system-ui" font-size="12" font-style="italic" fill="#64748b">C</text>

  <!-- Object (Upward Arrow at x=150) -->
  <line x1="150" y1="200" x2="150" y2="125" stroke="#dc2626" stroke-width="3" marker-end="url(#arrowHead)" />
  <!-- Object Marker Badge -->
  <rect x="135" y="90" width="30" height="24" rx="4" fill="#ef4444" />
  <text x="150" y="106" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(mObj)}</text>

  <!-- Ray 1: Parallel to axis, refracts through F2 -->
  <line x1="150" y1="125" x2="230" y2="125" stroke="#2563eb" stroke-width="2" marker-end="url(#rayArrow)" />
  <line x1="225" y1="125" x2="300" y2="125" stroke="#2563eb" stroke-width="2" />
  <line x1="300" y1="125" x2="390" y2="200" stroke="#2563eb" stroke-width="2" marker-end="url(#rayArrow)" />
  <line x1="390" y1="200" x2="480" y2="275" stroke="#2563eb" stroke-width="2" />

  <!-- Ray 2: Through optical center undeviated -->
  <line x1="150" y1="125" x2="230" y2="165" stroke="#2563eb" stroke-width="2" marker-end="url(#rayArrow)" />
  <line x1="225" y1="165" x2="300" y2="200" stroke="#2563eb" stroke-width="2" />
  <line x1="300" y1="200" x2="400" y2="245" stroke="#2563eb" stroke-width="2" marker-end="url(#rayArrow)" />
  <line x1="395" y1="245" x2="480" y2="275" stroke="#2563eb" stroke-width="2" />

  <!-- Real Inverted Image (Downward Arrow at x=480) -->
  <line x1="480" y1="200" x2="480" y2="270" stroke="#dc2626" stroke-width="3" marker-end="url(#arrowHead)" />
  <!-- Image Marker Badge -->
  <rect x="465" y="280" width="30" height="24" rx="4" fill="#ef4444" />
  <text x="480" y="296" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(mImg)}</text>
</svg>`.trim();
}

/**
 * 3. PHYSICS: Mechanics & Free Body Diagram (FBD) Programmatic SVG
 */
export function buildMechanicsFbdSvg({
  title = 'Mechanics Force System',
  markers = ['N', 'mg', 'f', 'F'],
  width = 600,
  height = 400,
} = {}) {
  const m1 = markers[0] || 'N';
  const m2 = markers[1] || 'W';
  const m3 = markers[2] || 'f';
  const m4 = markers[3] || 'F';

  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
  <defs>
    <marker id="forceArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
    </marker>
  </defs>

  <rect width="${width}" height="${height}" fill="#ffffff" />
  <text x="30" y="40" font-family="system-ui" font-size="15" font-weight="600" fill="#334155">${escapeXml(title)}</text>

  <!-- Inclined Plane -->
  <polygon points="120,320 480,320 480,140" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" />
  <!-- Incline angle theta arc -->
  <path d="M 170 320 A 50 50 0 0 0 162 298" fill="none" stroke="#64748b" stroke-width="1.8" />
  <text x="180" y="312" font-family="system-ui" font-size="14" font-weight="bold" fill="#334155">θ</text>

  <!-- Block resting on incline (center around 300, 230, rotated -26.5 deg) -->
  <g transform="translate(300, 230) rotate(-26.56)">
    <rect x="-40" y="-35" width="80" height="45" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5" />
    <text x="0" y="-7" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#0f172a">m</text>

    <!-- Normal force N (perpendicular to surface upwards) -->
    <line x1="0" y1="-35" x2="0" y2="-100" stroke="#2563eb" stroke-width="2.5" marker-end="url(#forceArrow)" />
    <!-- Friction force f (parallel to surface up the incline) -->
    <line x1="-40" y1="10" x2="-105" y2="10" stroke="#2563eb" stroke-width="2.5" marker-end="url(#forceArrow)" />
  </g>

  <!-- Gravity vector W (straight down from center 300, 230) -->
  <line x1="300" y1="230" x2="300" y2="330" stroke="#2563eb" stroke-width="2.5" marker-end="url(#forceArrow)" />

  <!-- Applied Force / Pull F -->
  <line x1="300" y1="230" x2="410" y2="175" stroke="#2563eb" stroke-width="2.5" marker-end="url(#forceArrow)" />

  <!-- Marker Badges (Neutral question markers) -->
  <rect x="250" y="110" width="28" height="24" rx="4" fill="#2563eb" />
  <text x="264" y="127" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m1)}</text>

  <rect x="310" y="320" width="28" height="24" rx="4" fill="#2563eb" />
  <text x="324" y="337" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m2)}</text>

  <rect x="200" y="200" width="28" height="24" rx="4" fill="#2563eb" />
  <text x="214" y="217" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m3)}</text>

  <rect x="420" y="155" width="28" height="24" rx="4" fill="#2563eb" />
  <text x="434" y="172" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m4)}</text>
</svg>`.trim();
}

/**
 * 4. MATHEMATICS / PHYSICS: Coordinate Graphs Programmatic SVG
 */
export function buildGraphSvg({
  title = 'Graph / Curve Representation',
  xLabel = 'X',
  yLabel = 'Y',
  graphType = 'thermodynamic_cycle', // 'thermodynamic_cycle', 'parabola', 'photoelectric'
  markers = ['A', 'B', 'C', 'D'],
  width = 600,
  height = 400,
} = {}) {
  const m1 = markers[0] || 'A';
  const m2 = markers[1] || 'B';
  const m3 = markers[2] || 'C';
  const m4 = markers[3] || 'D';

  let curvePaths = '';

  if (graphType === 'thermodynamic_cycle') {
    // Cyclic P-V indicator diagram
    curvePaths = `
      <!-- P-V Indicator Closed Loop A -> B -> C -> D -->
      <path d="M 200 140 Q 275 125 380 170 Q 390 230 380 270 Q 280 280 200 240 Z" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />

      <!-- Directional indicators -->
      <polygon points="280,128 295,133 285,142" fill="#2563eb" />
      <polygon points="383,215 378,230 392,225" fill="#2563eb" />
      <polygon points="300,280 285,275 295,268" fill="#2563eb" />

      <!-- Cycle Vertices Badges -->
      <circle cx="200" cy="140" r="14" fill="#2563eb" />
      <text x="200" y="145" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m1)}</text>

      <circle cx="380" cy="170" r="14" fill="#2563eb" />
      <text x="380" y="175" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m2)}</text>

      <circle cx="380" cy="270" r="14" fill="#2563eb" />
      <text x="380" y="275" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m3)}</text>

      <circle cx="200" cy="240" r="14" fill="#2563eb" />
      <text x="200" y="245" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m4)}</text>
    `;
  } else {
    // Parabola / Function Curve
    curvePaths = `
      <!-- Shaded area between curve and axis -->
      <path d="M 180 320 Q 280 120 440 320 Z" fill="#e0f2fe" opacity="0.7" />
      <path d="M 140 340 Q 280 80 480 340" fill="none" stroke="#2563eb" stroke-width="3" />

      <!-- Tangent line at vertex -->
      <line x1="200" y1="120" x2="360" y2="120" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4" />

      <!-- Marked Points -->
      <circle cx="280" cy="120" r="5" fill="#dc2626" />
      <rect x="290" y="105" width="28" height="24" rx="4" fill="#dc2626" />
      <text x="304" y="122" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m1)}</text>

      <circle cx="180" cy="320" r="5" fill="#2563eb" />
      <rect x="155" y="330" width="28" height="24" rx="4" fill="#2563eb" />
      <text x="169" y="347" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m2)}</text>

      <circle cx="440" cy="320" r="5" fill="#2563eb" />
      <rect x="445" y="330" width="28" height="24" rx="4" fill="#2563eb" />
      <text x="459" y="347" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m3)}</text>
    `;
  }

  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
  <defs>
    <marker id="axisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#0f172a" />
    </marker>
  </defs>

  <rect width="${width}" height="${height}" fill="#ffffff" />
  <text x="30" y="40" font-family="system-ui" font-size="15" font-weight="600" fill="#334155">${escapeXml(title)}</text>

  <!-- Coordinate Grid -->
  <g stroke="#f1f5f9" stroke-width="1">
    <line x1="100" y1="120" x2="520" y2="120" />
    <line x1="100" y1="180" x2="520" y2="180" />
    <line x1="100" y1="240" x2="520" y2="240" />
    <line x1="180" y1="80" x2="180" y2="340" />
    <line x1="280" y1="80" x2="280" y2="340" />
    <line x1="380" y1="80" x2="380" y2="340" />
    <line x1="480" y1="80" x2="480" y2="340" />
  </g>

  <!-- Axes: X and Y -->
  <line x1="100" y1="320" x2="540" y2="320" stroke="#0f172a" stroke-width="2.5" marker-end="url(#axisArrow)" />
  <line x1="100" y1="320" x2="100" y2="70" stroke="#0f172a" stroke-width="2.5" marker-end="url(#axisArrow)" />

  <text x="540" y="340" font-family="system-ui" font-size="14" font-weight="bold" fill="#0f172a">${escapeXml(xLabel)}</text>
  <text x="80" y="70" font-family="system-ui" font-size="14" font-weight="bold" fill="#0f172a">${escapeXml(yLabel)}</text>
  <text x="85" y="338" font-family="system-ui" font-size="13" fill="#64748b">O</text>

  ${curvePaths}
</svg>`.trim();
}

/**
 * 5. CHEMISTRY: Molecular Structure Programmatic SVG
 */
export function buildMolecularStructureSvg({
  title = 'Chemical Structure',
  markers = ['X', 'Y', 'Z'],
  width = 600,
  height = 400,
} = {}) {
  const m1 = markers[0] || 'X';
  const m2 = markers[1] || 'Y';
  const m3 = markers[2] || 'Z';

  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  <text x="30" y="40" font-family="system-ui" font-size="15" font-weight="600" fill="#334155">${escapeXml(title)}</text>

  <!-- Benzene Ring (Center 300, 200, Radius 70) -->
  <g transform="translate(300, 200)" stroke="#0f172a" stroke-width="2.5">
    <!-- Outer Hexagon -->
    <polygon points="0,-70 60.6,-35 60.6,35 0,70 -60.6,35 -60.6,-35" fill="none" />
    <!-- Inner Resonating Ring -->
    <circle cx="0" cy="0" r="42" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6,4" />

    <!-- Substituent Bonds -->
    <!-- Position 1 (Top) -->
    <line x1="0" y1="-70" x2="0" y2="-120" stroke="#0f172a" stroke-width="2.5" />
    <!-- Position 2 (Top Right) -->
    <line x1="60.6" y1="-35" x2="110" y2="-65" stroke="#0f172a" stroke-width="2.5" />
    <!-- Position 4 (Bottom) -->
    <line x1="0" y1="70" x2="0" y2="120" stroke="#0f172a" stroke-width="2.5" />
  </g>

  <!-- Neutral Reference Marker Badges -->
  <!-- Marker at Position 1 -->
  <rect x="286" y="55" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="300" y="73" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m1)}</text>

  <!-- Marker at Position 2 -->
  <rect x="415" y="120" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="429" y="138" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m2)}</text>

  <!-- Marker at Position 4 -->
  <rect x="286" y="325" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="300" y="343" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m3)}</text>
</svg>`.trim();
}

/**
 * 6. BIOLOGY: Cellular / Organelle Structure Programmatic SVG
 */
export function buildCellularStructureSvg({
  title = 'Cellular Structure Diagram',
  markers = ['P', 'Q', 'R', 'S'],
  width = 600,
  height = 400,
} = {}) {
  const m1 = markers[0] || 'P';
  const m2 = markers[1] || 'Q';
  const m3 = markers[2] || 'R';
  const m4 = markers[3] || 'S';

  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
  <defs>
    <marker id="bioPointer" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <circle cx="5" cy="5" r="3" fill="#0f172a" />
    </marker>
  </defs>

  <rect width="${width}" height="${height}" fill="#ffffff" />
  <text x="30" y="40" font-family="system-ui" font-size="15" font-weight="600" fill="#334155">${escapeXml(title)}</text>

  <!-- Outer Cell Wall / Membrane -->
  <ellipse cx="300" cy="210" rx="190" ry="130" fill="#f0fdf4" stroke="#16a34a" stroke-width="4" />
  <ellipse cx="300" cy="210" rx="175" ry="118" fill="#fcfdfa" stroke="#22c55e" stroke-width="2" stroke-dasharray="5,3" />

  <!-- Central Vacuole -->
  <path d="M 230 160 Q 340 140 370 210 Q 350 280 260 270 Q 200 250 230 160 Z" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" />

  <!-- Nucleus -->
  <circle cx="190" cy="240" r="38" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" />
  <circle cx="190" cy="240" r="14" fill="#d97706" />

  <!-- Chloroplasts / Mitochondria -->
  <ellipse cx="380" cy="140" rx="25" ry="15" transform="rotate(-20 380 140)" fill="#bbf7d0" stroke="#15803d" stroke-width="2" />
  <ellipse cx="390" cy="280" rx="25" ry="15" transform="rotate(30 390 280)" fill="#bbf7d0" stroke="#15803d" stroke-width="2" />

  <!-- Reference Pointer Lines & Neutral Marker Badges -->
  <!-- Marker P -> Cell Wall -->
  <line x1="90" y1="130" x2="160" y2="150" stroke="#0f172a" stroke-width="1.8" marker-end="url(#bioPointer)" />
  <rect x="60" y="115" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="74" y="133" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m1)}</text>

  <!-- Marker Q -> Central Vacuole -->
  <line x1="490" y1="160" x2="330" y2="200" stroke="#0f172a" stroke-width="1.8" marker-end="url(#bioPointer)" />
  <rect x="495" y="145" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="509" y="163" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m2)}</text>

  <!-- Marker R -> Nucleus -->
  <line x1="90" y1="280" x2="175" y2="250" stroke="#0f172a" stroke-width="1.8" marker-end="url(#bioPointer)" />
  <rect x="60" y="270" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="74" y="288" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m3)}</text>

  <!-- Marker S -> Chloroplast -->
  <line x1="490" y1="290" x2="410" y2="280" stroke="#0f172a" stroke-width="1.8" marker-end="url(#bioPointer)" />
  <rect x="495" y="280" width="28" height="26" rx="4" fill="#2563eb" />
  <text x="509" y="298" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(m4)}</text>
</svg>`.trim();
}

/**
 * 7. AI-DRIVEN DYNAMIC SVG GENERATOR
 * Prompts Gemini to generate exact, scientific SVG for specialized diagrams.
 */
export async function generateDynamicSvgWithAI({
  prompt,
  subject,
  chapter,
  topic,
  referenceMarkers = ['A', 'B', 'C', 'D'],
  width = 600,
  height = 400,
}) {
  const markerListStr = referenceMarkers.join(', ');

  const systemPrompt = `You are an elite scientific vector graphic illustrator and exam creator for NEET and JEE.
You produce clean, valid, standalone SVG code representing scientific diagrams, experimental setups, graphs, and anatomical structures.

CRITICAL RULES:
1. Output ONLY valid XML SVG wrapped inside <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"> ... </svg>.
2. Do NOT output markdown code fences, do NOT output explanations or preamble.
3. CRITICAL EXAMINATION QUESTION REQUIREMENT:
   - The diagram is for an UNANSWERED EXAM QUESTION.
   - It MUST NOT reveal the answer, correct option, or analytical conclusion.
   - Do NOT write descriptive labels for the key parts.
   - Instead, place ONLY neutral reference markers (${markerListStr}) in rounded badge boxes or circles pointing to the relevant structures.
   - Keep styling clean, high-contrast, professional, and readable (white background, #0f172a stroke, clear fills).
4. Strictly NO scripts, foreignObject, or external web links.`;

  const userPrompt = `Subject: ${subject}
Chapter: ${chapter || 'Standard'}
Topic: ${topic || 'General'}
Reference Markers to Include: ${markerListStr}
Diagram Request:
${prompt}

Generate the complete standalone SVG.`;

  const rawResponse = await aiProvider.callAI({
    systemPrompt,
    prompt: userPrompt,
    temperature: 0.2,
  });

  // Extract raw SVG string
  let svgCode = rawResponse.trim();
  if (svgCode.includes('```xml')) {
    svgCode = svgCode.split('```xml')[1].split('```')[0].trim();
  } else if (svgCode.includes('```svg')) {
    svgCode = svgCode.split('```svg')[1].split('```')[0].trim();
  } else if (svgCode.includes('```')) {
    svgCode = svgCode.split('```')[1].split('```')[0].trim();
  }

  // Ensure <svg> tag start and end
  const startIdx = svgCode.indexOf('<svg');
  const endIdx = svgCode.lastIndexOf('</svg>');
  if (startIdx !== -1 && endIdx !== -1) {
    svgCode = svgCode.substring(startIdx, endIdx + 6);
  }

  return svgCode;
}
