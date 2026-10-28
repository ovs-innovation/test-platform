import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const backendDir = 'backend/uploads/magnetism_matter';
const frontendDir = 'frontend/public/uploads/magnetism_matter';

[backendDir, frontendDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function saveDiagram(filename, svgString) {
  const buf = Buffer.from(svgString);
  const backPath = path.join(backendDir, filename);
  const frontPath = path.join(frontendDir, filename);

  await sharp(buf).png({ quality: 100 }).toFile(backPath);
  await sharp(buf).png({ quality: 100 }).toFile(frontPath);
  console.log(`Saved: ${filename}`);
}

async function generateAll() {
  // Q4: Susceptibility of Paramagnetic vs T (4 graphs)
  const svgQ4 = `
  <svg width="700" height="340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <style>
      .label { font-size: 16px; font-weight: bold; fill: #1e293b; }
      .sublabel { font-size: 14px; font-style: italic; fill: #475569; }
      .axis { stroke: #334155; stroke-width: 2; marker-end: url(#arrow); }
      .curve { stroke: #2563eb; stroke-width: 3; fill: none; }
    </style>
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155"/>
      </marker>
    </defs>

    <!-- Graph (1) -->
    <g transform="translate(30, 20)">
      <text x="0" y="20" class="label">(1)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <path d="M 45 115 Q 80 40 100 50 T 150 110" class="curve"/>
    </g>

    <!-- Graph (2) -->
    <g transform="translate(380, 20)">
      <text x="0" y="20" class="label">(2)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <line x1="40" y1="40" x2="130" y2="120" class="curve"/>
    </g>

    <!-- Graph (3) -->
    <g transform="translate(30, 180)">
      <text x="0" y="20" class="label">(3)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <path d="M 45 115 C 60 70, 70 70, 100 70 L 150 70" class="curve"/>
    </g>

    <!-- Graph (4) -->
    <g transform="translate(380, 180)">
      <text x="0" y="20" class="label">(4)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <path d="M 48 35 Q 55 105 150 115" class="curve"/>
    </g>
  </svg>
  `;
  await saveDiagram('mag_matter_q4.png', svgQ4);

  // Q7: Susceptibility of Diamagnetic vs T (4 graphs)
  const svgQ7 = `
  <svg width="700" height="340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <style>
      .label { font-size: 16px; font-weight: bold; fill: #1e293b; }
      .sublabel { font-size: 14px; font-style: italic; fill: #475569; }
      .axis { stroke: #334155; stroke-width: 2; marker-end: url(#arrow2); }
      .curve { stroke: #dc2626; stroke-width: 3; fill: none; }
    </style>
    <defs>
      <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155"/>
      </marker>
    </defs>

    <!-- Graph (1) -->
    <g transform="translate(30, 20)">
      <text x="0" y="20" class="label">(1)</text>
      <line x1="40" y1="70" x2="40" y2="15" class="axis"/>
      <line x1="40" y1="70" x2="40" y2="135"/>
      <line x1="40" y1="70" x2="160" y2="70" class="axis"/>
      <text x="25" y="25" class="sublabel">χ</text>
      <text x="165" y="75" class="sublabel">T</text>
      <line x1="40" y1="105" x2="150" y2="105" class="curve"/>
    </g>

    <!-- Graph (2) -->
    <g transform="translate(380, 20)">
      <text x="0" y="20" class="label">(2)</text>
      <line x1="40" y1="70" x2="40" y2="15" class="axis"/>
      <line x1="40" y1="70" x2="40" y2="135"/>
      <line x1="40" y1="70" x2="160" y2="70" class="axis"/>
      <text x="25" y="25" class="sublabel">χ</text>
      <text x="165" y="75" class="sublabel">T</text>
      <path d="M 45 75 Q 60 130 150 130" class="curve"/>
    </g>

    <!-- Graph (3) -->
    <g transform="translate(30, 180)">
      <text x="0" y="20" class="label">(3)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <path d="M 48 35 Q 55 105 150 115" class="curve"/>
    </g>

    <!-- Graph (4) -->
    <g transform="translate(380, 180)">
      <text x="0" y="20" class="label">(4)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <line x1="40" y1="40" x2="140" y2="120" class="curve"/>
    </g>
  </svg>
  `;
  await saveDiagram('mag_matter_q7.png', svgQ7);

  // Q16: Two bar magnets at 60 degrees
  const svgQ16 = `
  <svg width="450" height="350" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrowBlack" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Common corner at (120, 270) -->
    <!-- Horizontal reference dashed line -->
    <line x1="120" y1="270" x2="320" y2="270" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,4"/>

    <!-- Magnet 1: Vertical (from y=270 up to y=70) -->
    <rect x="100" y="70" width="40" height="200" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" rx="4"/>
    <line x1="120" y1="260" x2="120" y2="80" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrowBlack)"/>
    <text x="120" y="105" font-size="20" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="120" y="255" font-size="20" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>

    <!-- Magnet 2: Tilted at 60 degrees from vertical, i.e., 30 degrees above horizontal -->
    <!-- Center line length 200, dx = 200*sin(60) = 173.2, dy = -200*cos(60) = -100 -->
    <g transform="translate(120, 270) rotate(-30)">
      <rect x="0" y="-20" width="200" height="40" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" rx="4"/>
      <line x1="10" y1="0" x2="185" y2="0" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrowBlack)"/>
      <text x="25" y="7" font-size="20" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>
      <text x="175" y="7" font-size="20" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    </g>

    <!-- Angle arc of 60 deg between the two magnets -->
    <path d="M 120 180 A 90 90 0 0 1 198 225" fill="none" stroke="#0f172a" stroke-width="2"/>
    <text x="155" y="195" font-size="16" font-weight="bold" fill="#0f172a">60°</text>
  </svg>
  `;
  await saveDiagram('mag_matter_q16.png', svgQ16);

  // Q17: Two perpendicular magnets forming a cross
  const svgQ17 = `
  <svg width="400" height="350" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Vertical Magnet -->
    <rect x="175" y="40" width="50" height="260" fill="#f8fafc" stroke="#334155" stroke-width="2.5" rx="4"/>
    <text x="200" y="80" font-size="24" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="200" y="275" font-size="24" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>

    <!-- Horizontal Magnet -->
    <rect x="70" y="145" width="260" height="50" fill="#f8fafc" stroke="#334155" stroke-width="2.5" rx="4"/>
    <text x="105" y="178" font-size="24" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="295" y="178" font-size="24" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>

    <!-- Intersection outline overlay -->
    <rect x="175" y="145" width="50" height="50" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
  </svg>
  `;
  await saveDiagram('mag_matter_q17.png', svgQ17);

  // Q19: Hysteresis loops for materials A and B
  const svgQ19 = `
  <svg width="650" height="300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrHys" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155"/>
      </marker>
    </defs>
    <!-- Material A (Tall and narrow) -->
    <g transform="translate(30, 20)">
      <line x1="20" y1="120" x2="260" y2="120" stroke="#334155" stroke-width="2" marker-end="url(#arrHys)"/>
      <line x1="140" y1="230" x2="140" y2="10" stroke="#334155" stroke-width="2" marker-end="url(#arrHys)"/>
      <text x="265" y="125" font-size="16" font-style="italic" fill="#334155">H</text>
      <text x="135" y="15" font-size="16" font-style="italic" fill="#334155">B</text>

      <!-- Narrow loop A -->
      <path d="M 60 145 C 90 145, 125 110, 140 30 C 150 15, 185 30, 220 95 C 190 95, 155 130, 140 210 C 130 225, 95 210, 60 145 Z" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>
      <text x="140" y="255" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">(A)</text>
    </g>

    <!-- Material B (Broad loop with large coercivity) -->
    <g transform="translate(340, 20)">
      <line x1="20" y1="120" x2="260" y2="120" stroke="#334155" stroke-width="2" marker-end="url(#arrHys)"/>
      <line x1="140" y1="230" x2="140" y2="10" stroke="#334155" stroke-width="2" marker-end="url(#arrHys)"/>
      <text x="265" y="125" font-size="16" font-style="italic" fill="#334155">H</text>
      <text x="135" y="15" font-size="16" font-style="italic" fill="#334155">B</text>

      <!-- Broad loop B -->
      <path d="M 30 150 C 70 150, 105 80, 140 35 C 175 10, 210 50, 250 90 C 210 90, 175 160, 140 205 C 105 230, 70 190, 30 150 Z" fill="#fef2f2" stroke="#dc2626" stroke-width="2.5"/>
      <text x="140" y="255" font-size="18" font-weight="bold" fill="#1e293b" text-anchor="middle">(B)</text>
    </g>
  </svg>
  `;
  await saveDiagram('mag_matter_q19.png', svgQ19);

  // Q20: Two perpendicular magnets and point P on angle bisector
  const svgQ20 = `
  <svg width="450" height="380" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrP" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Center is at (260, 120) -->
    <!-- Vertical Magnet -->
    <rect x="245" y="30" width="30" height="180" fill="#f8fafc" stroke="#334155" stroke-width="2" rx="3"/>
    <text x="260" y="55" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>
    <text x="260" y="195" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>

    <!-- Horizontal Magnet -->
    <rect x="170" y="105" width="180" height="30" fill="#f8fafc" stroke="#334155" stroke-width="2" rx="3"/>
    <text x="185" y="126" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="335" y="126" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>

    <!-- Center dot -->
    <circle cx="260" cy="120" r="4" fill="#0f172a"/>

    <!-- Bisector line extending to lower-left (towards point P) -->
    <!-- Vector dx = -140, dy = 140 -> P at (120, 260) -->
    <line x1="260" y1="120" x2="110" y2="270" stroke="#0f172a" stroke-width="2" stroke-dasharray="6,4" marker-end="url(#arrP)"/>
    <circle cx="110" cy="270" r="5" fill="#2563eb"/>
    <text x="90" y="275" font-size="18" font-weight="bold" fill="#0f172a">P</text>
    <text x="175" y="215" font-size="18" font-style="italic" font-weight="bold" fill="#0f172a">d</text>
  </svg>
  `;
  await saveDiagram('mag_matter_q20.png', svgQ20);
}

generateAll().catch(console.error);
