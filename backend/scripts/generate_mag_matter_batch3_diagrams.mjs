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

async function generateBatch3() {
  // Q47: I vs H for Ferromagnetic (4 options)
  const svgQ47 = `
  <svg width="700" height="340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <style>
      .label { font-size: 16px; font-weight: bold; fill: #1e293b; }
      .sublabel { font-size: 14px; font-style: italic; fill: #475569; }
      .axis { stroke: #334155; stroke-width: 2; marker-end: url(#arr47); }
      .curve { stroke: #2563eb; stroke-width: 3; fill: none; }
    </style>
    <defs>
      <marker id="arr47" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155"/>
      </marker>
    </defs>

    <!-- Graph (1) -->
    <g transform="translate(30, 20)">
      <text x="0" y="20" class="label">(1)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">I</text>
      <text x="165" y="125" class="sublabel">H</text>
      <line x1="40" y1="120" x2="140" y2="30" class="curve"/>
    </g>

    <!-- Graph (2) -->
    <g transform="translate(380, 20)">
      <text x="0" y="20" class="label">(2)</text>
      <line x1="40" y1="70" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="70" x2="40" y2="140"/>
      <line x1="40" y1="70" x2="160" y2="70" class="axis"/>
      <text x="25" y="30" class="sublabel">I</text>
      <text x="165" y="75" class="sublabel">H</text>
      <line x1="40" y1="70" x2="120" y2="140" class="curve"/>
    </g>

    <!-- Graph (3) -->
    <g transform="translate(30, 180)">
      <text x="0" y="20" class="label">(3)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">I</text>
      <text x="165" y="125" class="sublabel">H</text>
      <path d="M 45 35 Q 55 105 150 115" class="curve"/>
    </g>

    <!-- Graph (4) -->
    <g transform="translate(380, 180)">
      <text x="0" y="20" class="label">(4)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">I</text>
      <text x="165" y="125" class="sublabel">H</text>
      <path d="M 40 120 C 70 120, 80 80, 100 45 C 115 25, 135 25, 150 25" class="curve"/>
    </g>
  </svg>
  `;
  await saveDiagram('mag_matter_q47.png', svgQ47);

  // Q48: Susceptibility vs T for Ferromagnetic
  const svgQ48 = `
  <svg width="700" height="340" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <style>
      .label { font-size: 16px; font-weight: bold; fill: #1e293b; }
      .sublabel { font-size: 14px; font-style: italic; fill: #475569; }
      .axis { stroke: #334155; stroke-width: 2; marker-end: url(#arr48); }
      .curve { stroke: #2563eb; stroke-width: 3; fill: none; }
    </style>
    <defs>
      <marker id="arr48" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
      <path d="M 48 35 Q 55 105 150 115" class="curve"/>
    </g>

    <!-- Graph (2) with asymptote at Tc -->
    <g transform="translate(380, 20)">
      <text x="0" y="20" class="label">(2)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <line x1="80" y1="120" x2="80" y2="25" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
      <path d="M 83 25 Q 92 105 150 115" class="curve"/>
    </g>

    <!-- Graph (3) -->
    <g transform="translate(30, 180)">
      <text x="0" y="20" class="label">(3)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <line x1="40" y1="60" x2="140" y2="60" class="curve"/>
    </g>

    <!-- Graph (4) -->
    <g transform="translate(380, 180)">
      <text x="0" y="20" class="label">(4)</text>
      <line x1="40" y1="120" x2="40" y2="20" class="axis"/>
      <line x1="40" y1="120" x2="160" y2="120" class="axis"/>
      <text x="25" y="30" class="sublabel">χ</text>
      <text x="165" y="125" class="sublabel">T</text>
      <line x1="40" y1="120" x2="140" y2="35" class="curve"/>
    </g>
  </svg>
  `;
  await saveDiagram('mag_matter_q48.png', svgQ48);
}

generateBatch3().catch(console.error);
