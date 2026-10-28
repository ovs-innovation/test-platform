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
  // Q75: Small square inside circular loop perpendicular
  const svgQ75 = `
  <svg width="350" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <ellipse cx="175" cy="130" rx="100" ry="80" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <text x="170" y="40" font-size="16" font-weight="bold" fill="#0284c7">A</text>
    <line x1="75" y1="130" x2="275" y2="130" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    <!-- Small square loop in perpendicular plane (vertical) -->
    <polygon points="165,115 185,115 185,145 165,145" fill="#f8fafc" stroke="#dc2626" stroke-width="2"/>
    <text x="195" y="135" font-size="14" fill="#dc2626">l</text>
    <text x="215" y="125" font-size="14" fill="#0284c7">r</text>
  </svg>
  `;
  await saveDiagram('emi_q75.png', svgQ75);

  // Q86: Circular loop near straight wire with decreasing current
  const svgQ86 = `
  <svg width="350" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrDown" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Circular loop -->
    <circle cx="110" cy="130" r="45" fill="none" stroke="#0284c7" stroke-width="2.5"/>
    <!-- Straight conductor -->
    <line x1="220" y1="40" x2="220" y2="220" stroke="#0f172a" stroke-width="3"/>
    <line x1="220" y1="110" x2="220" y2="150" stroke="#0f172a" stroke-width="3" marker-end="url(#arrDown)"/>
    <text x="235" y="130" font-size="16" font-weight="bold" fill="#0f172a">i</text>
    <text x="235" y="155" font-size="14" fill="#dc2626">(Decreasing)</text>
  </svg>
  `;
  await saveDiagram('emi_q86.png', svgQ86);

  // Q88: Square loop entering/leaving magnetic field
  const svgQ88 = `
  <svg width="420" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrV" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Magnetic Field Region (dots) -->
    <g fill="#0284c7" font-size="16" font-family="monospace">
      <text x="60" y="50">·</text><text x="100" y="50">·</text><text x="140" y="50">·</text><text x="180" y="50">·</text><text x="220" y="50">·</text>
      <text x="60" y="90">·</text><text x="100" y="90">·</text><text x="140" y="90">·</text><text x="180" y="90">·</text><text x="220" y="90">·</text>
      <text x="60" y="130">·</text><text x="100" y="130">·</text><text x="140" y="130">·</text><text x="180" y="130">·</text><text x="220" y="130">·</text>
      <text x="60" y="170">·</text><text x="100" y="170">·</text><text x="140" y="170">·</text><text x="180" y="170">·</text><text x="220" y="170">·</text>
      <text x="60" y="210">·</text><text x="100" y="210">·</text><text x="140" y="210">·</text><text x="180" y="210">·</text><text x="220" y="210">·</text>
    </g>
    <text x="140" y="40" font-size="16" font-weight="bold" fill="#0284c7">B (outward)</text>
    <!-- Square Loop -->
    <rect x="160" y="75" width="110" height="110" fill="#f8fafc" fill-opacity="0.6" stroke="#1e293b" stroke-width="2.5"/>
    <text x="145" y="135" font-size="16" font-weight="bold" fill="#1e293b">L</text>
    <!-- Velocity Arrow -->
    <line x1="270" y1="130" x2="330" y2="130" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrV)"/>
    <text x="340" y="135" font-size="16" font-weight="bold" fill="#0f172a">v</text>
  </svg>
  `;
  await saveDiagram('emi_q88.png', svgQ88);

  // Q89: Conducting disc rotating in uniform magnetic field with resistor R
  const svgQ89 = `
  <svg width="360" height="280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Vertical rotation axis -->
    <line x1="150" y1="30" x2="150" y2="230" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    <!-- Disc ellipse -->
    <ellipse cx="150" cy="180" rx="90" ry="35" fill="#f1f5f9" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Centre C and radius r -->
    <circle cx="150" cy="180" r="3" fill="#0f172a"/>
    <line x1="150" y1="180" x2="85" y2="195" stroke="#0284c7" stroke-width="1.5"/>
    <text x="110" y="185" font-size="14" font-weight="bold" fill="#0284c7">r</text>
    <text x="155" y="180" font-size="14" font-weight="bold" fill="#0f172a">C</text>
    <!-- B Field vector -->
    <line x1="80" y1="170" x2="80" y2="120" stroke="#0284c7" stroke-width="2" marker-end="url(#arrUp)"/>
    <text x="65" y="130" font-size="16" font-weight="bold" fill="#0284c7">B</text>
    <!-- Angular velocity omega -->
    <path d="M 135 60 A 15 8 0 0 1 165 60" fill="none" stroke="#0f172a" stroke-width="2" marker-end="url(#arrUp)"/>
    <text x="175" y="65" font-size="16" font-weight="bold" fill="#0f172a">ω</text>
    <!-- External Resistor R between centre axis A and rim B -->
    <line x1="150" y1="90" x2="160" y2="90" stroke="#0f172a" stroke-width="2"/>
    <!-- Resistor zigzag -->
    <path d="M 160 90 L 165 85 L 175 95 L 185 85 L 195 95 L 205 85 L 210 90" fill="none" stroke="#0f172a" stroke-width="2"/>
    <line x1="210" y1="90" x2="240" y2="90" stroke="#0f172a" stroke-width="2"/>
    <line x1="240" y1="90" x2="240" y2="180" stroke="#0f172a" stroke-width="2"/>
    <text x="180" y="75" font-size="16" font-weight="bold" fill="#0f172a">R</text>
    <text x="135" y="90" font-size="14" font-weight="bold" fill="#0284c7">A</text>
    <text x="245" y="90" font-size="14" font-weight="bold" fill="#0284c7">B</text>
  </svg>
  `;
  await saveDiagram('emi_q89.png', svgQ89);

  // Q91: Square loop entering magnetic field
  const svgQ91 = `
  <svg width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ91" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Dots for B -->
    <g fill="#0284c7" font-size="16" font-family="monospace">
      <text x="180" y="50">·</text><text x="220" y="50">·</text><text x="260" y="50">·</text><text x="300" y="50">·</text><text x="340" y="50">·</text><text x="380" y="50">·</text>
      <text x="180" y="90">·</text><text x="220" y="90">·</text><text x="260" y="90">·</text><text x="300" y="90">·</text><text x="340" y="90">·</text><text x="380" y="90">·</text>
      <text x="180" y="130">·</text><text x="220" y="130">·</text><text x="260" y="130">·</text><text x="300" y="130">·</text><text x="340" y="130">·</text><text x="380" y="130">·</text>
      <text x="180" y="170">·</text><text x="220" y="170">·</text><text x="260" y="170">·</text><text x="300" y="170">·</text><text x="340" y="170">·</text><text x="380" y="170">·</text>
    </g>
    <!-- Square loop outside moving in -->
    <rect x="70" y="70" width="60" height="60" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="130" y1="100" x2="170" y2="100" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ91)"/>
    <text x="145" y="90" font-size="15" font-weight="bold" fill="#0f172a">v</text>
  </svg>
  `;
  await saveDiagram('emi_q91.png', svgQ91);

  // Q92: Rectangular loop ABCD entering magnetic field
  const svgQ92 = `
  <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ92" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Crosses for B -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="200" y="50">×</text><text x="240" y="50">×</text><text x="280" y="50">×</text><text x="320" y="50">×</text><text x="360" y="50">×</text>
      <text x="200" y="90">×</text><text x="240" y="90">×</text><text x="280" y="90">×</text><text x="320" y="90">×</text><text x="360" y="90">×</text>
      <text x="200" y="130">×</text><text x="240" y="130">×</text><text x="280" y="130">×</text><text x="320" y="130">×</text><text x="360" y="130">×</text>
      <text x="200" y="170">×</text><text x="240" y="170">×</text><text x="280" y="170">×</text><text x="320" y="170">×</text><text x="360" y="170">×</text>
    </g>
    <!-- Loop ABCD -->
    <rect x="70" y="60" width="90" height="80" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
    <text x="60" y="55" font-size="14" font-weight="bold" fill="#0f172a">A</text>
    <text x="165" y="55" font-size="14" font-weight="bold" fill="#0f172a">B</text>
    <text x="165" y="155" font-size="14" font-weight="bold" fill="#0f172a">C</text>
    <text x="60" y="155" font-size="14" font-weight="bold" fill="#0f172a">D</text>
    <line x1="160" y1="100" x2="200" y2="100" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ92)"/>
    <text x="175" y="90" font-size="15" font-weight="bold" fill="#0f172a">v</text>
  </svg>
  `;
  await saveDiagram('emi_q92.png', svgQ92);

  // Q94: Conducting rod AC pivoted at O
  const svgQ94 = `
  <svg width="400" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ94" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Background field -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="60" y="40">×</text><text x="110" y="40">×</text><text x="160" y="40">×</text><text x="210" y="40">×</text><text x="260" y="40">×</text><text x="310" y="40">×</text>
      <text x="60" y="80">×</text><text x="110" y="80">×</text><text x="160" y="80">×</text><text x="210" y="80">×</text><text x="260" y="80">×</text><text x="310" y="80">×</text>
      <text x="60" y="120">×</text><text x="110" y="120">×</text><text x="160" y="120">×</text><text x="210" y="120">×</text><text x="260" y="120">×</text><text x="310" y="120">×</text>
      <text x="60" y="160">×</text><text x="110" y="160">×</text><text x="160" y="160">×</text><text x="210" y="160">×</text><text x="260" y="160">×</text><text x="310" y="160">×</text>
      <text x="60" y="200">×</text><text x="110" y="200">×</text><text x="160" y="200">×</text><text x="210" y="200">×</text><text x="260" y="200">×</text><text x="310" y="200">×</text>
    </g>
    <!-- Rod AC -->
    <line x1="80" y1="120" x2="320" y2="120" stroke="#1e293b" stroke-width="4"/>
    <!-- Pivot O -->
    <circle cx="140" cy="120" r="5" fill="#ef4444"/>
    <text x="135" y="145" font-size="16" font-weight="bold" fill="#ef4444">O</text>
    <text x="65" y="125" font-size="16" font-weight="bold" fill="#0f172a">A</text>
    <text x="330" y="125" font-size="16" font-weight="bold" fill="#0f172a">C</text>
    <!-- Dimensions -->
    <text x="100" y="110" font-size="14" fill="#0284c7">l</text>
    <text x="220" y="110" font-size="14" fill="#0284c7">3l</text>
    <!-- Angular velocity arc -->
    <path d="M 130 95 A 15 15 0 0 1 150 95" fill="none" stroke="#0f172a" stroke-width="2" marker-end="url(#arrQ94)"/>
    <text x="135" y="85" font-size="14" font-weight="bold" fill="#0f172a">ω</text>
  </svg>
  `;
  await saveDiagram('emi_q94.png', svgQ94);

  // Q95: Flexible wire radius vs time graph
  const svgQ95 = `
  <svg width="350" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="50" y1="160" x2="300" y2="160" stroke="#0f172a" stroke-width="2"/>
    <line x1="50" y1="160" x2="50" y2="30" stroke="#0f172a" stroke-width="2"/>
    <text x="310" y="165" font-size="14" font-weight="bold" fill="#0f172a">t</text>
    <text x="40" y="30" font-size="14" font-weight="bold" fill="#0f172a">r</text>
    <text x="45" y="180" font-size="12" fill="#0f172a">0</text>
    <text x="130" y="180" font-size="12" fill="#0f172a">1</text>
    <text x="210" y="180" font-size="12" fill="#0f172a">2</text>
    <!-- Points a, b, c, d -->
    <line x1="50" y1="110" x2="130" y2="110" stroke="#0284c7" stroke-width="2.5"/>
    <line x1="130" y1="110" x2="210" y2="60" stroke="#0284c7" stroke-width="2.5"/>
    <path d="M 210 60 Q 250 65 280 85" fill="none" stroke="#0284c7" stroke-width="2.5"/>
    <circle cx="50" cy="110" r="3" fill="#0f172a"/><text x="35" y="110" font-size="12" fill="#0f172a">a</text>
    <circle cx="130" cy="110" r="3" fill="#0f172a"/><text x="130" y="100" font-size="12" fill="#0f172a">b</text>
    <circle cx="210" cy="60" r="3" fill="#0f172a"/><text x="210" y="50" font-size="12" fill="#0f172a">c</text>
    <line x1="130" y1="110" x2="130" y2="160" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="210" y1="60" x2="210" y2="160" stroke="#94a3b8" stroke-dasharray="3,3"/>
  </svg>
  `;
  await saveDiagram('emi_q95.png', svgQ95);

  // Q96: Cylindrical space of radius R
  const svgQ96 = `
  <svg width="240" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <circle cx="120" cy="110" r="80" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Crosses -->
    <g fill="#0284c7" font-size="14" font-family="monospace">
      <text x="80" y="80">×</text><text x="120" y="80">×</text><text x="150" y="80">×</text>
      <text x="60" y="110">×</text><text x="90" y="110">×</text><text x="140" y="110">×</text><text x="170" y="110">×</text>
      <text x="80" y="140">×</text><text x="120" y="140">×</text><text x="150" y="140">×</text>
    </g>
    <line x1="120" y1="110" x2="175" y2="55" stroke="#ef4444" stroke-width="2"/>
    <circle cx="120" cy="110" r="3" fill="#ef4444"/>
    <text x="150" y="90" font-size="14" font-weight="bold" fill="#ef4444">R</text>
  </svg>
  `;
  await saveDiagram('emi_q96.png', svgQ96);

  // Q98: Conducting triangle CDE with wire AH
  const svgQ98 = `
  <svg width="300" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrDownQ98" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Field indicator -->
    <circle cx="240" cy="60" r="8" fill="none" stroke="#0284c7" stroke-width="1.5"/>
    <text x="236" y="65" font-size="14" fill="#0284c7">×</text>
    <text x="255" y="65" font-size="15" font-weight="bold" fill="#0284c7">B</text>
    <!-- Triangular frame CDE -->
    <polygon points="150,50 60,210 240,210" fill="none" stroke="#1e293b" stroke-width="3"/>
    <text x="145" y="40" font-size="16" font-weight="bold" fill="#0f172a">D</text>
    <text x="45" y="225" font-size="16" font-weight="bold" fill="#0f172a">C</text>
    <text x="245" y="225" font-size="16" font-weight="bold" fill="#0f172a">E</text>
    <!-- Sliding wire AH -->
    <line x1="30" y1="130" x2="270" y2="130" stroke="#dc2626" stroke-width="3"/>
    <text x="15" y="135" font-size="16" font-weight="bold" fill="#dc2626">A</text>
    <text x="275" y="135" font-size="16" font-weight="bold" fill="#dc2626">H</text>
    <text x="95" y="125" font-size="13" font-weight="bold" fill="#0f172a">F</text>
    <text x="195" y="125" font-size="13" font-weight="bold" fill="#0f172a">G</text>
    <!-- Velocity v -->
    <line x1="150" y1="130" x2="150" y2="165" stroke="#0f172a" stroke-width="2" marker-end="url(#arrDownQ98)"/>
    <text x="155" y="155" font-size="14" font-weight="bold" fill="#0f172a">v</text>
  </svg>
  `;
  await saveDiagram('emi_q98.png', svgQ98);

  // Q99: Square loop pulled out of field
  const svgQ99 = `
  <svg width="340" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ99" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Crosses -->
    <g fill="#94a3b8" font-size="14" font-family="monospace">
      <text x="40" y="40">×</text><text x="80" y="40">×</text><text x="120" y="40">×</text><text x="160" y="40">×</text><text x="200" y="40">×</text><text x="240" y="40">×</text>
      <text x="40" y="80">×</text><text x="80" y="80">×</text><text x="120" y="80">×</text><text x="160" y="80">×</text><text x="200" y="80">×</text><text x="240" y="80">×</text>
      <text x="40" y="120">×</text><text x="80" y="120">×</text><text x="120" y="120">×</text><text x="160" y="120">×</text><text x="200" y="120">×</text><text x="240" y="120">×</text>
      <text x="40" y="160">×</text><text x="80" y="160">×</text><text x="120" y="160">×</text><text x="160" y="160">×</text><text x="200" y="160">×</text><text x="240" y="160">×</text>
      <text x="40" y="200">×</text><text x="80" y="200">×</text><text x="120" y="200">×</text><text x="160" y="200">×</text><text x="200" y="200">×</text><text x="240" y="200">×</text>
    </g>
    <rect x="70" y="60" width="100" height="100" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="170" y1="110" x2="220" y2="110" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ99)"/>
    <text x="185" y="100" font-size="15" font-weight="bold" fill="#0f172a">v</text>
  </svg>
  `;
  await saveDiagram('emi_q99.png', svgQ99);

  // Q100: Sliding wires on parallel rails
  const svgQ100 = `
  <svg width="450" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrL" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 5 L 10 0 L 10 10 z" fill="#0f172a"/>
      </marker>
      <marker id="arrR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Crosses -->
    <g fill="#94a3b8" font-size="14" font-family="monospace">
      <text x="40" y="30">×</text><text x="100" y="30">×</text><text x="160" y="30">×</text><text x="220" y="30">×</text><text x="280" y="30">×</text><text x="340" y="30">×</text><text x="400" y="30">×</text>
      <text x="40" y="90">×</text><text x="100" y="90">×</text><text x="160" y="90">×</text><text x="220" y="90">×</text><text x="280" y="90">×</text><text x="340" y="90">×</text><text x="400" y="90">×</text>
      <text x="40" y="150">×</text><text x="100" y="150">×</text><text x="160" y="150">×</text><text x="220" y="150">×</text><text x="280" y="150">×</text><text x="340" y="150">×</text><text x="400" y="150">×</text>
    </g>
    <!-- Rails -->
    <line x1="50" y1="50" x2="350" y2="50" stroke="#1e293b" stroke-width="3"/>
    <line x1="50" y1="130" x2="350" y2="130" stroke="#1e293b" stroke-width="3"/>
    <!-- Separation 4 cm -->
    <line x1="40" y1="50" x2="40" y2="130" stroke="#0284c7" stroke-width="1.5"/>
    <text x="5" y="95" font-size="13" font-weight="bold" fill="#0284c7">4 cm</text>
    <!-- Wire 1 P1Q1 -->
    <line x1="120" y1="40" x2="120" y2="140" stroke="#dc2626" stroke-width="3"/>
    <text x="110" y="35" font-size="13" font-weight="bold" fill="#dc2626">P₁</text>
    <text x="110" y="155" font-size="13" font-weight="bold" fill="#dc2626">Q₁</text>
    <text x="85" y="95" font-size="13" fill="#dc2626">2 Ω</text>
    <line x1="120" y1="45" x2="80" y2="45" stroke="#0f172a" stroke-width="2" marker-end="url(#arrL)"/>
    <!-- Wire 2 P2Q2 -->
    <line x1="200" y1="40" x2="200" y2="140" stroke="#16a34a" stroke-width="3"/>
    <text x="195" y="35" font-size="13" font-weight="bold" fill="#16a34a">P₂</text>
    <text x="195" y="155" font-size="13" font-weight="bold" fill="#16a34a">Q₂</text>
    <text x="205" y="95" font-size="13" fill="#16a34a">2 Ω</text>
    <line x1="200" y1="45" x2="240" y2="45" stroke="#0f172a" stroke-width="2" marker-end="url(#arrR)"/>
    <!-- Resistor 19 Ohm -->
    <path d="M 300 50 L 300 75 L 295 80 L 305 88 L 295 96 L 305 104 L 300 110 L 300 130" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="310" y="95" font-size="14" font-weight="bold" fill="#0f172a">19 Ω</text>
    <!-- Field info -->
    <text x="360" y="95" font-size="14" font-weight="bold" fill="#0284c7">B = 1.0 T</text>
  </svg>
  `;
  await saveDiagram('emi_q100.png', svgQ100);

  // Q101: Triangular circuit in solenoid
  const svgQ101 = `
  <svg width="260" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <circle cx="130" cy="120" r="90" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Diameter AC -->
    <line x1="40" y1="120" x2="220" y2="120" stroke="#0284c7" stroke-width="2"/>
    <circle cx="130" cy="120" r="3" fill="#0f172a"/>
    <text x="25" y="125" font-size="15" font-weight="bold" fill="#0f172a">A</text>
    <text x="225" y="125" font-size="15" font-weight="bold" fill="#0f172a">C</text>
    <text x="80" y="110" font-size="14" fill="#0284c7">R</text>
    <text x="170" y="110" font-size="14" fill="#0284c7">R</text>
    <!-- Point B at bottom -->
    <circle cx="130" cy="210" r="3" fill="#0f172a"/>
    <text x="125" y="230" font-size="15" font-weight="bold" fill="#0f172a">B</text>
    <!-- Triangle ABC -->
    <line x1="40" y1="120" x2="130" y2="210" stroke="#dc2626" stroke-width="2.5"/>
    <line x1="220" y1="120" x2="130" y2="210" stroke="#dc2626" stroke-width="2.5"/>
    <line x1="130" y1="120" x2="130" y2="210" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1.5"/>
    <text x="100" y="140" font-size="11" fill="#94a3b8">90°</text>
    <text x="140" y="140" font-size="11" fill="#94a3b8">90°</text>
  </svg>
  `;
  await saveDiagram('emi_q101.png', svgQ101);

  // Q102: Triangular loop pulled down
  const svgQ102 = `
  <svg width="280" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ102" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Crosses -->
    <g fill="#94a3b8" font-size="14" font-family="monospace">
      <text x="40" y="40">×</text><text x="90" y="40">×</text><text x="140" y="40">×</text><text x="190" y="40">×</text><text x="240" y="40">×</text>
      <text x="40" y="80">×</text><text x="90" y="80">×</text><text x="140" y="80">×</text><text x="190" y="80">×</text><text x="240" y="80">×</text>
      <text x="40" y="120">×</text><text x="90" y="120">×</text><text x="140" y="120">×</text><text x="190" y="120">×</text><text x="240" y="120">×</text>
      <text x="40" y="160">×</text><text x="90" y="160">×</text><text x="140" y="160">×</text><text x="190" y="160">×</text><text x="240" y="160">×</text>
    </g>
    <!-- Triangle ABC -->
    <polygon points="140,60 70,180 210,180" fill="#f8fafc" fill-opacity="0.5" stroke="#1e293b" stroke-width="2.5"/>
    <text x="135" y="50" font-size="15" font-weight="bold" fill="#0f172a">A</text>
    <text x="50" y="185" font-size="15" font-weight="bold" fill="#0f172a">B</text>
    <text x="215" y="185" font-size="15" font-weight="bold" fill="#0f172a">C</text>
    <!-- Velocity downwards -->
    <line x1="140" y1="180" x2="140" y2="215" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ102)"/>
    <text x="150" y="205" font-size="14" font-weight="bold" fill="#0f172a">v</text>
  </svg>
  `;
  await saveDiagram('emi_q102.png', svgQ102);

  // Q109: Metallic wheel with 8 spokes
  const svgQ109 = `
  <svg width="260" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrRot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Field crosses -->
    <g fill="#94a3b8" font-size="14" font-family="monospace">
      <text x="60" y="60">×</text><text x="120" y="40">×</text><text x="180" y="60">×</text>
      <text x="40" y="120">×</text><text x="200" y="120">×</text>
      <text x="60" y="180">×</text><text x="120" y="200">×</text><text x="180" y="180">×</text>
    </g>
    <!-- Wheel rim -->
    <circle cx="120" cy="120" r="80" fill="none" stroke="#1e293b" stroke-width="3"/>
    <circle cx="120" cy="120" r="5" fill="#ef4444"/>
    <text x="110" y="140" font-size="14" font-weight="bold" fill="#ef4444">O</text>
    <!-- 8 spokes -->
    <line x1="120" y1="40" x2="120" y2="200" stroke="#1e293b" stroke-width="2"/>
    <line x1="40" y1="120" x2="200" y2="120" stroke="#1e293b" stroke-width="2"/>
    <line x1="63" y1="63" x2="177" y2="177" stroke="#1e293b" stroke-width="2"/>
    <line x1="177" y1="63" x2="63" y2="177" stroke="#1e293b" stroke-width="2"/>
    <!-- Rotation arrow -->
    <path d="M 180 60 A 95 95 0 0 1 215 120" fill="none" stroke="#0f172a" stroke-width="2" marker-end="url(#arrRot)"/>
    <text x="215" y="90" font-size="16" font-weight="bold" fill="#0f172a">ω</text>
    <text x="40" y="40" font-size="16" font-weight="bold" fill="#0284c7">B</text>
  </svg>
  `;
  await saveDiagram('emi_q109.png', svgQ109);

  // Q110: Circular loop in decreasing magnetic field
  const svgQ110 = `
  <svg width="260" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Field dots -->
    <g fill="#0284c7" font-size="16" font-family="monospace">
      <text x="40" y="40">·</text><text x="80" y="40">·</text><text x="120" y="40">·</text><text x="160" y="40">·</text><text x="200" y="40">·</text>
      <text x="40" y="80">·</text><text x="80" y="80">·</text><text x="120" y="80">·</text><text x="160" y="80">·</text><text x="200" y="80">·</text>
      <text x="40" y="120">·</text><text x="80" y="120">·</text><text x="120" y="120">·</text><text x="160" y="120">·</text><text x="200" y="120">·</text>
      <text x="40" y="160">·</text><text x="80" y="160">·</text><text x="120" y="160">·</text><text x="160" y="160">·</text><text x="200" y="160">·</text>
      <text x="40" y="200">·</text><text x="80" y="200">·</text><text x="120" y="200">·</text><text x="160" y="200">·</text><text x="200" y="200">·</text>
    </g>
    <!-- Loop of radius r -->
    <circle cx="120" cy="120" r="60" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="120" y1="120" x2="162" y2="78" stroke="#ef4444" stroke-width="2"/>
    <circle cx="120" cy="120" r="3" fill="#ef4444"/>
    <text x="145" y="105" font-size="15" font-weight="bold" fill="#ef4444">r</text>
  </svg>
  `;
  await saveDiagram('emi_q110.png', svgQ110);

  // Q111: Coupled inductors in series with dots
  const svgQ111 = `
  <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Terminal A -->
    <circle cx="80" cy="160" r="4" fill="#0f172a"/>
    <text x="75" y="180" font-size="15" font-weight="bold" fill="#0f172a">A</text>
    <line x1="80" y1="160" x2="80" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="80" cy="110" r="4" fill="#ef4444"/>
    <!-- Coil 1 -->
    <path d="M 80 70 A 15 15 0 0 1 110 70 A 15 15 0 0 1 140 70 A 15 15 0 0 1 170 70" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Connection between Coil 1 and Coil 2 -->
    <line x1="170" y1="70" x2="170" y2="130" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="170" y1="130" x2="210" y2="130" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="210" y1="130" x2="210" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="170" cy="95" r="4" fill="#ef4444"/>
    <!-- Coil 2 -->
    <path d="M 210 70 A 15 15 0 0 1 240 70 A 15 15 0 0 1 270 70 A 15 15 0 0 1 300 70" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Connection to Terminal B -->
    <line x1="300" y1="70" x2="300" y2="140" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="300" y1="140" x2="220" y2="140" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="220" y1="140" x2="220" y2="160" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="220" cy="160" r="4" fill="#0f172a"/>
    <text x="215" y="180" font-size="15" font-weight="bold" fill="#0f172a">B</text>
    <!-- Labels -->
    <text x="110" y="50" font-size="14" fill="#0284c7">L₁ = 10 H</text>
    <text x="240" y="50" font-size="14" fill="#0284c7">L₂ = 20 H</text>
    <text x="180" y="30" font-size="14" font-weight="bold" fill="#dc2626">M = 3 H</text>
  </svg>
  `;
  await saveDiagram('emi_q111.png', svgQ111);

  // Q112: Solenoid with resistor R = 10 Ohm
  const svgQ112 = `
  <svg width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7"/>
      </marker>
    </defs>
    <!-- Solenoid core cylinder -->
    <rect x="70" y="65" width="280" height="30" rx="15" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <!-- Windings -->
    <path d="M 90 60 Q 95 95 105 100 M 120 60 Q 125 95 135 100 M 150 60 Q 155 95 165 100 M 180 60 Q 185 95 195 100 M 210 60 Q 215 95 225 100 M 240 60 Q 245 95 255 100 M 270 60 Q 275 95 285 100 M 300 60 Q 305 95 315 100 M 330 60 Q 335 95 345 100" fill="none" stroke="#0f172a" stroke-width="3"/>
    <!-- External B vector arrows -->
    <line x1="120" y1="40" x2="300" y2="40" stroke="#0284c7" stroke-width="2" marker-end="url(#arrB)"/>
    <text x="210" y="30" font-size="15" font-weight="bold" fill="#0284c7">B (increasing)</text>
    <!-- External Circuit with R = 10 Ohm -->
    <line x1="90" y1="100" x2="90" y2="150" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="90" y1="150" x2="160" y2="150" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Resistor zigzag -->
    <path d="M 160 150 L 165 145 L 175 155 L 185 145 L 195 155 L 205 145 L 210 150" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="210" y1="150" x2="345" y2="150" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="345" y1="150" x2="345" y2="100" stroke="#0f172a" stroke-width="2.5"/>
    <text x="170" y="175" font-size="15" font-weight="bold" fill="#0f172a">R = 10 Ω</text>
    <text x="80" y="165" font-size="14" font-weight="bold" fill="#0f172a">A</text>
    <text x="350" y="165" font-size="14" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_q112.png', svgQ112);

  // Q115: Straight wire and rotating square loop about axis xx'
  const svgQ115 = `
  <svg width="360" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrUpQ115" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Straight wire -->
    <line x1="80" y1="30" x2="80" y2="210" stroke="#0f172a" stroke-width="3"/>
    <line x1="80" y1="130" x2="80" y2="90" stroke="#0f172a" stroke-width="3" marker-end="url(#arrUpQ115)"/>
    <text x="65" y="120" font-size="16" font-weight="bold" fill="#0f172a">i</text>
    <!-- Axis xx' -->
    <line x1="80" y1="120" x2="280" y2="120" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2"/>
    <text x="95" y="115" font-size="14" font-weight="bold" fill="#94a3b8">x</text>
    <text x="245" y="115" font-size="14" font-weight="bold" fill="#94a3b8">x'</text>
    <!-- Rotation arrow -->
    <path d="M 265 110 A 10 10 0 1 1 265 130" fill="none" stroke="#0f172a" stroke-width="2" marker-end="url(#arrUpQ115)"/>
    <text x="280" y="125" font-size="15" font-weight="bold" fill="#0f172a">ω</text>
    <!-- Square loop -->
    <rect x="120" y="70" width="100" height="100" fill="#f8fafc" fill-opacity="0.6" stroke="#1e293b" stroke-width="2.5"/>
  </svg>
  `;
  await saveDiagram('emi_q115.png', svgQ115);

  // Q116: Circular region with increasing field
  const svgQ116 = `
  <svg width="260" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <circle cx="130" cy="120" r="85" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
    <g fill="#0284c7" font-size="15" font-family="monospace">
      <text x="90" y="80">×</text><text x="130" y="80">×</text><text x="170" y="80">×</text>
      <text x="70" y="120">×</text><text x="105" y="120">×</text><text x="155" y="120">×</text><text x="190" y="120">×</text>
      <text x="90" y="160">×</text><text x="130" y="160">×</text><text x="170" y="160">×</text>
    </g>
    <line x1="130" y1="120" x2="190" y2="60" stroke="#ef4444" stroke-width="2"/>
    <circle cx="130" cy="120" r="3" fill="#ef4444"/>
    <text x="165" y="95" font-size="15" font-weight="bold" fill="#ef4444">R</text>
    <text x="195" y="85" font-size="15" font-weight="bold" fill="#0284c7">B</text>
  </svg>
  `;
  await saveDiagram('emi_q116.png', svgQ116);

  // Q117: Circuit segment with R, V, L, C
  const svgQ117 = `
  <svg width="450" height="150" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ117" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Point A -->
    <circle cx="50" cy="80" r="4" fill="#0f172a"/>
    <text x="45" y="105" font-size="16" font-weight="bold" fill="#0f172a">A</text>
    <!-- Current 10A -->
    <line x1="50" y1="80" x2="110" y2="80" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ117)"/>
    <text x="75" y="70" font-size="14" font-weight="bold" fill="#0f172a">10 A</text>
    <!-- Resistor 2 Ohm -->
    <path d="M 110 80 L 115 75 L 125 85 L 135 75 L 145 85 L 155 75 L 160 80" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="125" y="105" font-size="14" font-weight="bold" fill="#0f172a">2 Ω</text>
    <!-- Battery 20 V (+ -) -->
    <line x1="160" y1="80" x2="190" y2="80" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="190" y1="65" x2="190" y2="95" stroke="#0f172a" stroke-width="3"/>
    <line x1="198" y1="72" x2="198" y2="88" stroke="#0f172a" stroke-width="3"/>
    <text x="185" y="55" font-size="14" font-weight="bold" fill="#0f172a">20 V</text>
    <!-- Inductor 20 mH -->
    <line x1="198" y1="80" x2="225" y2="80" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 225 80 A 10 10 0 0 1 245 80 A 10 10 0 0 1 265 80 A 10 10 0 0 1 285 80" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="240" y="105" font-size="14" font-weight="bold" fill="#0f172a">20 mH</text>
    <!-- Capacitor 40 uF (+ -) -->
    <line x1="285" y1="80" x2="320" y2="80" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="320" y1="65" x2="320" y2="95" stroke="#0284c7" stroke-width="3"/>
    <line x1="330" y1="65" x2="330" y2="95" stroke="#0284c7" stroke-width="3"/>
    <text x="312" y="60" font-size="13" font-weight="bold" fill="#dc2626">+</text>
    <text x="332" y="60" font-size="13" font-weight="bold" fill="#0284c7">−</text>
    <text x="340" y="60" font-size="14" font-weight="bold" fill="#0284c7">40 μF</text>
    <!-- Point B -->
    <line x1="330" y1="80" x2="390" y2="80" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="390" cy="80" r="4" fill="#0f172a"/>
    <text x="385" y="105" font-size="16" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_q117.png', svgQ117);

  // AR 17: Inductor with current i from A to B
  const svgAR17 = `
  <svg width="340" height="120" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrAR17" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a"/>
      </marker>
    </defs>
    <circle cx="50" cy="60" r="4" fill="#0f172a"/>
    <text x="45" y="85" font-size="16" font-weight="bold" fill="#0f172a">A</text>
    <line x1="50" y1="60" x2="110" y2="60" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrAR17)"/>
    <text x="80" y="50" font-size="15" font-weight="bold" fill="#0f172a">i</text>
    <!-- Inductor -->
    <path d="M 110 60 A 10 10 0 0 1 130 60 A 10 10 0 0 1 150 60 A 10 10 0 0 1 170 60 A 10 10 0 0 1 190 60 A 10 10 0 0 1 210 60" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <text x="155" y="85" font-size="15" font-weight="bold" fill="#0f172a">L</text>
    <line x1="210" y1="60" x2="270" y2="60" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="270" cy="60" r="4" fill="#0f172a"/>
    <text x="265" y="85" font-size="16" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_ar17.png', svgAR17);

  console.log('All Batch 6 diagrams generated successfully!');
}

generateAll().catch(console.error);
