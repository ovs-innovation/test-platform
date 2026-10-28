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
  // Q58: Wire of 6m rotated about point C
  const svgQ58 = `
  <svg width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr58" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
      <marker id="dimArr58" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Background field dots -->
    <g fill="#94a3b8">
      <circle cx="60" cy="50" r="3"/><circle cx="120" cy="50" r="3"/><circle cx="180" cy="50" r="3"/><circle cx="240" cy="50" r="3"/><circle cx="300" cy="50" r="3"/><circle cx="360" cy="50" r="3"/>
      <circle cx="60" cy="150" r="3"/><circle cx="120" cy="150" r="3"/><circle cx="180" cy="150" r="3"/><circle cx="240" cy="150" r="3"/><circle cx="300" cy="150" r="3"/><circle cx="360" cy="150" r="3"/>
    </g>
    <text x="375" y="55" font-size="16" font-weight="bold" fill="#0f172a">B</text>

    <!-- Wire ab -->
    <rect x="50" y="94" width="310" height="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" rx="2"/>
    <text x="35" y="105" font-size="15" font-weight="bold" fill="#0f172a">a</text>
    <text x="365" y="105" font-size="15" font-weight="bold" fill="#0f172a">b</text>

    <!-- Pivot point C (at 2m from a, 4m from b) -->
    <!-- 50 + (310 * 2/6) = 50 + 103.3 = 153.3 -->
    <circle cx="153" cy="100" r="5" fill="#dc2626"/>
    <text x="148" y="85" font-size="16" font-weight="bold" fill="#dc2626">C</text>

    <!-- Rotation arrow around C -->
    <path d="M 135 100 A 18 18 0 1 0 171 100" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arr58)"/>

    <!-- Dimensions: 2m and 4m -->
    <line x1="50" y1="125" x2="153" y2="125" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr58)" marker-end="url(#dimArr58)"/>
    <text x="95" y="140" font-size="13" font-weight="bold" fill="#64748b">2 m</text>

    <line x1="153" y1="125" x2="360" y2="125" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr58)" marker-end="url(#dimArr58)"/>
    <text x="245" y="140" font-size="13" font-weight="bold" fill="#64748b">4 m</text>
  </svg>
  `;
  await saveDiagram('emi_q58.png', svgQ58);

  // Q66: Rod moving with speed v between R1 and R2
  const svgQ66 = `
  <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr66" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Rails -->
    <line x1="60" y1="40" x2="340" y2="40" stroke="#1e293b" stroke-width="3"/>
    <line x1="60" y1="160" x2="340" y2="160" stroke="#1e293b" stroke-width="3"/>

    <!-- Resistor R1 (left) -->
    <line x1="60" y1="40" x2="60" y2="80" stroke="#1e293b" stroke-width="2.5"/>
    <rect x="52" y="80" width="16" height="40" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="25" y="105" font-size="14" font-weight="bold" fill="#1e293b">R₁</text>
    <line x1="60" y1="120" x2="60" y2="160" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Resistor R2 (right) -->
    <line x1="340" y1="40" x2="340" y2="80" stroke="#1e293b" stroke-width="2.5"/>
    <rect x="332" y="80" width="16" height="40" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="355" y="105" font-size="14" font-weight="bold" fill="#1e293b">R₂</text>
    <line x1="340" y1="120" x2="340" y2="160" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Moving Rod (middle) -->
    <rect x="195" y="30" width="14" height="140" fill="#0284c7" stroke="#0369a1" stroke-width="2" rx="2"/>
    <text x="215" y="55" font-size="14" font-weight="bold" fill="#0284c7">R₀</text>

    <!-- Velocity arrow -->
    <line x1="210" y1="100" x2="255" y2="100" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr66)"/>
    <text x="260" y="105" font-size="14" font-weight="bold" fill="#0f172a">v</text>

    <!-- Magnetic Field Crosses -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="120" y="85">×</text><text x="120" y="130">×</text>
      <text x="280" y="85">×</text><text x="280" y="130">×</text>
    </g>
    <text x="125" y="105" font-size="15" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_q66.png', svgQ66);

  // Q67: Solenoids in series opposition on core
  const svgQ67 = `
  <svg width="320" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr67" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
      </marker>
    </defs>
    <!-- Core cylinder -->
    <rect x="120" y="30" width="70" height="180" fill="#f1f5f9" stroke="#64748b" stroke-width="2.5" rx="6"/>

    <!-- Solenoid 1 windings (upper half, arrows right) -->
    <path d="M 100 50 L 190 70 M 100 80 L 190 100" stroke="#0284c7" stroke-width="3"/>
    <line x1="145" y1="60" x2="165" y2="65" stroke="#dc2626" stroke-width="2" marker-end="url(#arr67)"/>
    <line x1="145" y1="90" x2="165" y2="95" stroke="#dc2626" stroke-width="2" marker-end="url(#arr67)"/>

    <!-- Solenoid 2 windings (lower half, arrows left) -->
    <path d="M 100 130 L 190 150 M 100 160 L 190 180" stroke="#0284c7" stroke-width="3"/>
    <line x1="165" y1="145" x2="145" y2="140" stroke="#dc2626" stroke-width="2" marker-end="url(#arr67)"/>
    <line x1="165" y1="175" x2="145" y2="170" stroke="#dc2626" stroke-width="2" marker-end="url(#arr67)"/>
  </svg>
  `;
  await saveDiagram('emi_q67.png', svgQ67);

  // Q70: Semicircular loop entering field
  const svgQ70 = `
  <svg width="340" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr70" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
      </marker>
    </defs>
    <!-- Field boundary dashed line -->
    <line x1="150" y1="20" x2="150" y2="200" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4"/>

    <!-- Field crosses on the right -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="180" y="50">×</text><text x="220" y="50">×</text><text x="260" y="50">×</text>
      <text x="180" y="90">×</text><text x="220" y="90">×</text><text x="260" y="90">×</text>
      <text x="180" y="130">×</text><text x="220" y="130">×</text><text x="260" y="130">×</text>
      <text x="180" y="170">×</text><text x="220" y="170">×</text><text x="260" y="170">×</text>
    </g>

    <!-- Semicircular loop ACB on the left -->
    <path d="M 150 40 A 70 70 0 0 0 150 180 Z" fill="#f8fafc" stroke="#0284c7" stroke-width="3"/>
    <text x="145" y="32" font-size="14" font-weight="bold" fill="#0f172a">A</text>
    <text x="145" y="195" font-size="14" font-weight="bold" fill="#0f172a">B</text>
    <text x="65" y="115" font-size="15" font-weight="bold" fill="#0f172a">C</text>

    <!-- Center O and rotation arrow -->
    <circle cx="150" cy="110" r="4" fill="#0f172a"/>
    <text x="160" y="115" font-size="15" font-weight="bold" fill="#0f172a">O</text>
    <path d="M 135 110 A 15 15 0 1 1 150 125" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arr70)"/>
    <text x="135" y="95" font-size="14" font-weight="bold" fill="#dc2626">ω</text>
  </svg>
  `;
  await saveDiagram('emi_q70.png', svgQ70);

  // Q71: Current cable penetrating loop
  const svgQ71 = `
  <svg width="260" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Circular loop -->
    <circle cx="130" cy="100" r="60" fill="#f8fafc" stroke="#0284c7" stroke-width="3"/>

    <!-- Cable penetrating center with current out of page (dot) -->
    <circle cx="130" cy="100" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="130" cy="100" r="4" fill="#0f172a"/>
    <text x="150" y="105" font-size="16" font-weight="bold" fill="#0f172a">I</text>
  </svg>
  `;
  await saveDiagram('emi_q71.png', svgQ71);

  // Q74: Square loop rotated about axis PQ
  const svgQ74 = `
  <svg width="340" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr74" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
      </marker>
    </defs>
    <!-- Background field crosses -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="60" y="40">×</text><text x="120" y="40">×</text><text x="180" y="40">×</text><text x="240" y="40">×</text>
      <text x="60" y="110">×</text><text x="120" y="110">×</text><text x="180" y="110">×</text><text x="240" y="110">×</text>
      <text x="60" y="180">×</text><text x="120" y="180">×</text><text x="180" y="180">×</text><text x="240" y="180">×</text>
    </g>

    <!-- Axis PQ -->
    <line x1="230" y1="20" x2="230" y2="210" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="235" y="45" font-size="15" font-weight="bold" fill="#0f172a">P</text>
    <text x="235" y="185" font-size="15" font-weight="bold" fill="#0f172a">Q</text>

    <!-- Square loop -->
    <rect x="90" y="45" width="140" height="140" fill="none" stroke="#0284c7" stroke-width="3"/>

    <!-- Rotation arrow around PQ -->
    <path d="M 215 30 A 15 15 0 1 1 245 30" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arr74)"/>
    <text x="250" y="30" font-size="14" font-weight="bold" fill="#dc2626">ω</text>
  </svg>
  `;
  await saveDiagram('emi_q74.png', svgQ74);
}

generateAll().catch(console.error);
