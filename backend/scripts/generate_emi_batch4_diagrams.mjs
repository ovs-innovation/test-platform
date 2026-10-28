import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const backendDir = 'backend/uploads/emi';
const frontendDir = 'frontend/public/uploads/emi';

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
  // Q43: Cylindrical magnetic field region of radius a and point P
  const svgQ43 = `
  <svg width="360" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr43" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Field circle of radius a -->
    <circle cx="120" cy="120" r="75" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="120" cy="120" r="3" fill="#0f172a"/>

    <!-- Field crosses -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="80" y="80">×</text><text x="120" y="80">×</text><text x="155" y="80">×</text>
      <text x="70" y="115">×</text><text x="150" y="115">×</text>
      <text x="70" y="150">×</text><text x="110" y="150">×</text><text x="150" y="150">×</text>
      <text x="115" y="180">×</text>
    </g>

    <!-- Radius a -->
    <line x1="120" y1="120" x2="120" y2="195" stroke="#0284c7" stroke-width="2"/>
    <text x="125" y="165" font-size="15" font-weight="bold" fill="#0284c7">a</text>

    <!-- Distance r to point P -->
    <line x1="120" y1="120" x2="280" y2="70" stroke="#0f172a" stroke-width="2"/>
    <circle cx="280" cy="70" r="4" fill="#0f172a"/>
    <text x="285" y="65" font-size="16" font-weight="bold" fill="#0f172a">P</text>
    <text x="200" y="85" font-size="15" font-weight="bold" fill="#0f172a">r</text>
  </svg>
  `;
  await saveDiagram('emi_q43.png', svgQ43);

  // Q44: Semicircular loop entering field B
  const svgQ44 = `
  <svg width="340" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr44" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Field boundary vertical line -->
    <line x1="120" y1="20" x2="120" y2="200" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>

    <!-- Field crosses on the right -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="150" y="50">×</text><text x="200" y="50">×</text><text x="250" y="50">×</text>
      <text x="150" y="100">×</text><text x="200" y="100">×</text><text x="250" y="100">×</text>
      <text x="150" y="150">×</text><text x="200" y="150">×</text><text x="250" y="150">×</text>
    </g>
    <line x1="210" y1="35" x2="245" y2="35" stroke="#0f172a" stroke-width="2" marker-end="url(#arr44)"/>
    <text x="255" y="40" font-size="15" font-weight="bold" fill="#0f172a">B</text>

    <!-- Semicircular loop rotated about O (120, 110) -->
    <path d="M 120 40 A 70 70 0 0 0 120 180 Z" fill="#f1f5f9" stroke="#0284c7" stroke-width="3"/>
    <circle cx="120" cy="110" r="4" fill="#0f172a"/>
    <text x="100" y="115" font-size="15" font-weight="bold" fill="#0f172a">O</text>
  </svg>
  `;
  await saveDiagram('emi_q44.png', svgQ44);

  // Q46: Line charge on wheel rim
  const svgQ46 = `
  <svg width="340" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="dimArr46" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Outer rim of wheel (radius R) -->
    <circle cx="170" cy="130" r="95" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="275" y="135" font-size="15" font-weight="bold" fill="#0284c7">λ</text>

    <!-- Inner magnetic field region (radius a) -->
    <circle cx="170" cy="130" r="45" fill="#f8fafc" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,3"/>
    <g fill="#dc2626" font-size="14" font-family="monospace">
      <text x="155" y="125">×</text><text x="175" y="125">×</text>
      <text x="165" y="145">×</text>
    </g>
    <text x="180" y="155" font-size="13" font-weight="bold" fill="#dc2626">B₀</text>

    <!-- Central axle -->
    <circle cx="170" cy="130" r="4" fill="#0f172a"/>

    <!-- Dimension arrows for a and R -->
    <line x1="170" y1="130" x2="215" y2="130" stroke="#64748b" stroke-width="1.5" marker-end="url(#dimArr46)"/>
    <text x="185" y="122" font-size="13" font-weight="bold" fill="#64748b">a</text>

    <line x1="170" y1="235" x2="265" y2="235" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr46)" marker-end="url(#dimArr46)"/>
    <text x="210" y="250" font-size="14" font-weight="bold" fill="#64748b">R</text>
  </svg>
  `;
  await saveDiagram('emi_q46.png', svgQ46);

  // Q47: Rotating wooden stick with copper coating
  const svgQ47 = `
  <svg width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr47" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
      <marker id="dimArr47" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Background field crosses -->
    <g fill="#cbd5e1" font-size="16" font-family="monospace">
      <text x="80" y="40">×</text><text x="160" y="40">×</text><text x="240" y="40">×</text><text x="320" y="40">×</text>
      <text x="80" y="160">×</text><text x="160" y="160">×</text><text x="240" y="160">×</text><text x="320" y="160">×</text>
    </g>

    <!-- Pivot at left -->
    <rect x="50" y="75" width="15" height="40" fill="#64748b"/>
    <!-- Wooden portion (length 2l) -->
    <rect x="65" y="85" width="160" height="20" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
    <text x="120" y="100" font-size="13" font-weight="bold" fill="#b45309">wood (2l)</text>

    <!-- Copper coated portion (length l) -->
    <rect x="225" y="85" width="80" height="20" fill="#fdba74" stroke="#c2410c" stroke-width="2"/>
    <text x="240" y="100" font-size="13" font-weight="bold" fill="#c2410c">copper (l)</text>

    <!-- Dimension 3l -->
    <line x1="65" y1="130" x2="305" y2="130" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr47)" marker-end="url(#dimArr47)"/>
    <text x="175" y="145" font-size="14" font-weight="bold" fill="#64748b">3l</text>

    <!-- Rotation arrow -->
    <path d="M 315 75 A 30 30 0 0 1 315 115" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arr47)"/>
    <text x="330" y="98" font-size="15" font-weight="bold" fill="#dc2626">ω</text>
  </svg>
  `;
  await saveDiagram('emi_q47.png', svgQ47);

  // Q48: Proton moving past ring
  const svgQ48 = `
  <svg width="360" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr48" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Conducting Ring -->
    <circle cx="120" cy="110" r="45" fill="none" stroke="#0284c7" stroke-width="3"/>

    <!-- Proton path from O to P -->
    <line x1="220" y1="230" x2="220" y2="150" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="220" y1="200" x2="220" y2="175" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr48)"/>
    <circle cx="220" cy="230" r="3" fill="#0f172a"/>
    <text x="212" y="248" font-size="15" font-weight="bold" fill="#0f172a">O</text>
    <circle cx="220" cy="150" r="4" fill="#0f172a"/>
    <text x="228" y="155" font-size="15" font-weight="bold" fill="#0f172a">P</text>

    <!-- Trajectories A, B, C -->
    <!-- Path A (deflected left towards ring) -->
    <path d="M 220 150 Q 215 90 195 50" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arr48)"/>
    <text x="185" y="45" font-size="15" font-weight="bold" fill="#0f172a">A</text>

    <!-- Path B (straight) -->
    <line x1="220" y1="150" x2="220" y2="45" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arr48)"/>
    <text x="215" y="40" font-size="15" font-weight="bold" fill="#0f172a">B</text>

    <!-- Path C (deflected right away from ring) -->
    <path d="M 220 150 Q 225 90 245 50" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arr48)"/>
    <text x="250" y="45" font-size="15" font-weight="bold" fill="#dc2626">C</text>
  </svg>
  `;
  await saveDiagram('emi_q48.png', svgQ48);

  // Q55: Triangular i-t graph
  const svgQ55 = `
  <svg width="340" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr55" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Axes -->
    <line x1="40" y1="150" x2="300" y2="150" stroke="#0f172a" stroke-width="2" marker-end="url(#arr55)"/>
    <line x1="70" y1="180" x2="70" y2="30" stroke="#0f172a" stroke-width="2" marker-end="url(#arr55)"/>
    <text x="305" y="155" font-size="16" font-weight="bold" fill="#0f172a">t</text>
    <text x="65" y="25" font-size="16" font-weight="bold" fill="#0f172a">i</text>
    <text x="45" y="170" font-size="14" fill="#64748b">(0,0)</text>

    <!-- Triangular curve: from (70,150) to (160, 60) to (250, 150) -->
    <line x1="70" y1="150" x2="160" y2="60" stroke="#0284c7" stroke-width="3"/>
    <line x1="160" y1="60" x2="250" y2="150" stroke="#0284c7" stroke-width="3"/>
    <line x1="160" y1="60" x2="160" y2="150" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
  </svg>
  `;
  await saveDiagram('emi_q55.png', svgQ55);

  // Q56: Square loop entering magnetic field
  const svgQ56 = `
  <svg width="420" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr56" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
      <marker id="dimArr56" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Square loop of side 5cm -->
    <rect x="50" y="70" width="60" height="60" fill="#f8fafc" stroke="#0284c7" stroke-width="2.5"/>
    <line x1="50" y1="55" x2="110" y2="55" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr56)" marker-end="url(#dimArr56)"/>
    <text x="65" y="50" font-size="13" font-weight="bold" fill="#64748b">5 cm</text>

    <!-- Velocity arrow -->
    <line x1="110" y1="100" x2="150" y2="100" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr56)"/>
    <text x="115" y="90" font-size="13" font-weight="bold" fill="#0f172a">1 cm/s</text>

    <!-- Magnetic field region of width 10cm -->
    <rect x="170" y="50" width="140" height="100" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
    <g fill="#94a3b8" font-size="15" font-family="monospace">
      <text x="185" y="75">×</text><text x="215" y="75">×</text><text x="245" y="75">×</text><text x="275" y="75">×</text>
      <text x="185" y="105">×</text><text x="215" y="105">×</text><text x="245" y="105">×</text><text x="275" y="105">×</text>
      <text x="185" y="135">×</text><text x="215" y="135">×</text><text x="245" y="135">×</text><text x="275" y="135">×</text>
    </g>
    <line x1="170" y1="165" x2="310" y2="165" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr56)" marker-end="url(#dimArr56)"/>
    <text x="225" y="180" font-size="13" font-weight="bold" fill="#64748b">10 cm</text>
    <text x="325" y="105" font-size="15" font-weight="bold" fill="#0f172a">B = 0.8 T</text>
  </svg>
  `;
  await saveDiagram('emi_q56.png', svgQ56);
}

generateAll().catch(console.error);
