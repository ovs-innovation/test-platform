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

async function generateBatch2() {
  // Q30: Field lines concentrating inside a rectangular block
  const svgQ30 = `
  <svg width="450" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ30" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Rectangular block of substance -->
    <rect x="130" y="45" width="190" height="130" fill="#f8fafc" stroke="#334155" stroke-width="2.5" rx="2"/>

    <!-- Field lines curving slightly into the block -->
    <path d="M 30 55 C 80 55, 120 70, 225 70 C 330 70, 370 55, 420 55" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrQ30)"/>
    <path d="M 30 85 C 80 85, 120 95, 225 95 C 330 95, 370 85, 420 85" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrQ30)"/>
    <path d="M 30 110 L 420 110" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrQ30)"/>
    <path d="M 30 135 C 80 135, 120 125, 225 125 C 330 125, 370 135, 420 135" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrQ30)"/>
    <path d="M 30 165 C 80 165, 120 150, 225 150 C 330 150, 370 165, 420 165" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrQ30)"/>
  </svg>
  `;
  await saveDiagram('mag_matter_q30.png', svgQ30);

  // Q32: Square with two magnets and point P
  const svgQ32 = `
  <svg width="450" height="350" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Square ABCD of side 10 cm -->
    <rect x="100" y="70" width="200" height="200" fill="none" stroke="#64748b" stroke-width="2"/>
    <text x="200" y="295" font-size="16" font-weight="bold" fill="#334155" text-anchor="middle">10 cm</text>
    <text x="75" y="175" font-size="16" font-weight="bold" fill="#334155" text-anchor="middle">10 cm</text>

    <!-- Top-left Magnet: centered at (100, 70), along top horizontal edge -->
    <rect x="65" y="52" width="70" height="36" fill="#f1f5f9" stroke="#1e293b" stroke-width="2" rx="2"/>
    <text x="82" y="75" font-size="16" font-weight="bold" fill="#dc2626">N</text>
    <text x="118" y="75" font-size="16" font-weight="bold" fill="#2563eb">S</text>

    <!-- Bottom-right Magnet: centered at (300, 270), along bottom edge -->
    <rect x="265" y="252" width="70" height="36" fill="#f1f5f9" stroke="#1e293b" stroke-width="2" rx="2"/>
    <text x="282" y="275" font-size="16" font-weight="bold" fill="#dc2626">N</text>
    <text x="318" y="275" font-size="16" font-weight="bold" fill="#2563eb">S</text>

    <!-- Point P at top-right corner (300, 70) -->
    <circle cx="300" cy="70" r="5" fill="#dc2626"/>
    <text x="315" y="65" font-size="20" font-weight="bold" fill="#dc2626">P</text>
  </svg>
  `;
  await saveDiagram('mag_matter_q32.png', svgQ32);

  // Q35: Two magnets and point P with arrow choices
  const svgQ35 = `
  <svg width="450" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ35" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Left vertical magnet -->
    <rect x="80" y="30" width="30" height="110" fill="#f1f5f9" stroke="#1e293b" stroke-width="2" rx="2"/>
    <text x="95" y="55" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="95" y="130" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>
    <line x1="95" y1="105" x2="95" y2="65" stroke="#0f172a" stroke-width="2" marker-end="url(#arrQ35)"/>

    <!-- Horizontal line to right magnet -->
    <line x1="110" y1="85" x2="270" y2="85" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>

    <!-- Point P -->
    <circle cx="190" cy="85" r="4" fill="#2563eb"/>
    <text x="190" y="110" font-size="18" font-weight="bold" fill="#2563eb" text-anchor="middle">P</text>

    <!-- Right horizontal magnet -->
    <rect x="270" y="70" width="110" height="30" fill="#f1f5f9" stroke="#1e293b" stroke-width="2" rx="2"/>
    <text x="290" y="91" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="365" y="91" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>
    <line x1="345" y1="85" x2="305" y2="85" stroke="#0f172a" stroke-width="2" marker-end="url(#arrQ35)"/>
  </svg>
  `;
  await saveDiagram('mag_matter_q35.png', svgQ35);
}

generateBatch2().catch(console.error);
