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
  // Q26: Wire with downward current and accelerating loop
  const svgQ26 = `
  <svg width="360" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr26" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Straight wire with downward current -->
    <line x1="100" y1="20" x2="100" y2="200" stroke="#0f172a" stroke-width="3"/>
    <line x1="100" y1="90" x2="100" y2="130" stroke="#0f172a" stroke-width="3" marker-end="url(#arr26)"/>
    <text x="80" y="115" font-size="16" font-weight="bold" fill="#0f172a">i</text>

    <!-- Circular loop -->
    <circle cx="230" cy="110" r="45" fill="none" stroke="#0284c7" stroke-width="3"/>

    <!-- Acceleration arrow towards wire -->
    <line x1="210" y1="110" x2="150" y2="110" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arr26)"/>
    <text x="170" y="100" font-size="15" font-weight="bold" fill="#dc2626">a</text>
  </svg>
  `;
  await saveDiagram('emi_q26.png', svgQ26);

  // Q31: Two coaxial circular loops in 3D frame
  const svgQ31 = `
  <svg width="400" height="280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr31" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
      <marker id="dimArr31" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Coordinate axes -->
    <line x1="200" y1="170" x2="200" y2="30" stroke="#0f172a" stroke-width="2" marker-end="url(#arr31)"/>
    <text x="185" y="25" font-size="16" font-weight="bold" fill="#0f172a">y</text>

    <line x1="200" y1="170" x2="130" y2="250" stroke="#0f172a" stroke-width="2" marker-end="url(#arr31)"/>
    <text x="115" y="260" font-size="16" font-weight="bold" fill="#0f172a">z</text>

    <!-- Large loop in x-z plane at y=0 -->
    <ellipse cx="200" cy="170" rx="100" ry="35" fill="none" stroke="#0284c7" stroke-width="3"/>
    <line x1="200" y1="170" x2="300" y2="170" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="245" y="165" font-size="14" font-weight="bold" fill="#0284c7">R</text>

    <!-- Distance y = sqrt(3) R -->
    <line x1="250" y1="170" x2="250" y2="75" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" marker-start="url(#dimArr31)" marker-end="url(#dimArr31)"/>
    <text x="255" y="125" font-size="14" font-weight="bold" fill="#64748b">√3 R</text>

    <!-- Small tilted loop at y = sqrt(3) R -->
    <g transform="translate(200, 75) rotate(30)">
      <ellipse cx="0" cy="0" rx="40" ry="15" fill="none" stroke="#dc2626" stroke-width="2.5"/>
      <line x1="0" y1="0" x2="0" y2="-45" stroke="#0f172a" stroke-width="2" marker-end="url(#arr31)"/>
      <text x="5" y="-35" font-size="14" font-weight="bold" fill="#0f172a">n̂</text>
    </g>
    <!-- Angle 60 deg with y-axis -->
    <text x="225" y="55" font-size="14" font-weight="bold" fill="#0f172a">60°</text>
  </svg>
  `;
  await saveDiagram('emi_q31.png', svgQ31);

  // Q32: Insulating rotating disc in magnetic field
  const svgQ32 = `
  <svg width="340" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr32" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Vertical magnetic field lines pointing down -->
    <g stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr32)">
      <line x1="80" y1="20" x2="80" y2="230"/>
      <line x1="120" y1="20" x2="120" y2="230"/>
      <line x1="170" y1="20" x2="170" y2="230"/>
      <line x1="220" y1="20" x2="220" y2="230"/>
      <line x1="260" y1="20" x2="260" y2="230"/>
    </g>
    <text x="275" y="40" font-size="15" font-weight="bold" fill="#64748b">B₀</text>

    <!-- Central axle -->
    <line x1="170" y1="30" x2="170" y2="220" stroke="#0f172a" stroke-width="4"/>
    <!-- Rotation arrow -->
    <path d="M 150 70 A 20 10 0 1 1 185 80" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arr32)"/>
    <text x="195" y="75" font-size="15" font-weight="bold" fill="#dc2626">ω₀</text>

    <!-- Disc -->
    <ellipse cx="170" cy="160" rx="100" ry="35" fill="#f8fafc" stroke="#0284c7" stroke-width="3"/>
    
    <!-- Periphery charges (+) -->
    <g fill="#0284c7" font-size="14" font-weight="bold">
      <text x="80" y="165">+</text><text x="110" y="180">+</text><text x="165" y="193">+</text>
      <text x="220" y="180">+</text><text x="250" y="165">+</text>
    </g>
  </svg>
  `;
  await saveDiagram('emi_q32.png', svgQ32);

  // Q33: Conducting rod on vertical rails
  const svgQ33 = `
  <svg width="340" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Resistor R at top -->
    <line x1="100" y1="40" x2="140" y2="40" stroke="#1e293b" stroke-width="3"/>
    <rect x="140" y="32" width="40" height="16" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="153" y="25" font-size="15" font-weight="bold" fill="#1e293b">R</text>
    <line x1="180" y1="40" x2="220" y2="40" stroke="#1e293b" stroke-width="3"/>

    <!-- Vertical Rails -->
    <line x1="100" y1="40" x2="100" y2="200" stroke="#1e293b" stroke-width="3"/>
    <line x1="220" y1="40" x2="220" y2="200" stroke="#1e293b" stroke-width="3"/>

    <!-- Horizontal Sliding Rod -->
    <rect x="80" y="110" width="160" height="12" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" rx="2"/>

    <!-- Field Crosses into paper -->
    <circle cx="160" cy="165" r="16" fill="none" stroke="#0f172a" stroke-width="2"/>
    <g fill="#0f172a" font-size="20" font-family="monospace">
      <text x="153" y="172">⊗</text>
    </g>
    <text x="185" y="172" font-size="16" font-weight="bold" fill="#0f172a">B₀</text>
  </svg>
  `;
  await saveDiagram('emi_q33.png', svgQ33);

  // Q34: AC generator graph (cosine graph)
  const svgQ34 = `
  <svg width="360" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr34" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Axes -->
    <line x1="40" y1="100" x2="320" y2="100" stroke="#0f172a" stroke-width="2" marker-end="url(#arr34)"/>
    <line x1="70" y1="180" x2="70" y2="20" stroke="#0f172a" stroke-width="2" marker-end="url(#arr34)"/>
    <text x="325" y="105" font-size="16" font-weight="bold" fill="#0f172a">t</text>
    <text x="65" y="15" font-size="16" font-weight="bold" fill="#0f172a">E</text>

    <!-- Cosine curve: starts at (70, 40), crosses (130, 100), min at (190, 160), crosses (250, 100), max at (310, 40) -->
    <path d="M 70 40 Q 100 40 130 100 Q 160 160 190 160 Q 220 160 250 100 Q 280 40 310 40" fill="none" stroke="#0284c7" stroke-width="3"/>
  </svg>
  `;
  await saveDiagram('emi_q34.png', svgQ34);

  // Q36: Bulbs with inductors in parallel
  const svgQ36 = `
  <svg width="360" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Main loop -->
    <line x1="60" y1="60" x2="60" y2="150" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="60" y1="150" x2="140" y2="150" stroke="#1e293b" stroke-width="2.5"/>
    
    <!-- Battery -->
    <line x1="140" y1="140" x2="140" y2="160" stroke="#0f172a" stroke-width="3"/>
    <line x1="150" y1="135" x2="150" y2="165" stroke="#0f172a" stroke-width="3"/>
    
    <!-- Switch / key -->
    <line x1="150" y1="150" x2="190" y2="150" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="190" cy="150" r="3" fill="#1e293b"/>
    <line x1="190" y1="150" x2="215" y2="135" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="220" cy="150" r="3" fill="#1e293b"/>
    <text x="200" y="170" font-size="14" font-weight="bold" fill="#1e293b">key</text>
    
    <line x1="220" y1="150" x2="300" y2="150" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="300" y1="150" x2="300" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Branch 1 (top) -->
    <line x1="60" y1="60" x2="100" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 100 60 Q 110 45 120 60 Q 130 45 140 60 Q 150 45 160 60 Q 170 45 180 60" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="135" y="40" font-size="15" font-weight="bold" fill="#0284c7">L</text>
    <line x1="180" y1="60" x2="220" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Bulb 1 -->
    <circle cx="235" cy="60" r="14" fill="#f8fafc" stroke="#eab308" stroke-width="2.5"/>
    <text x="231" y="65" font-size="14" font-weight="bold" fill="#0f172a">1</text>
    <line x1="249" y1="60" x2="300" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Branch 2 (middle) -->
    <line x1="60" y1="95" x2="100" y2="95" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 100 95 Q 110 80 120 95 Q 130 80 140 95 Q 150 80 160 95 Q 170 80 180 95" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="135" y="115" font-size="15" font-weight="bold" fill="#0284c7">L</text>
    <line x1="180" y1="95" x2="220" y2="95" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Bulb 2 -->
    <circle cx="235" cy="95" r="14" fill="#f8fafc" stroke="#eab308" stroke-width="2.5"/>
    <text x="231" y="100" font-size="14" font-weight="bold" fill="#0f172a">2</text>
    <line x1="249" y1="95" x2="300" y2="95" stroke="#1e293b" stroke-width="2.5"/>
  </svg>
  `;
  await saveDiagram('emi_q36.png', svgQ36);

  // Q38: Circuit segment from A to B
  const svgQ38 = `
  <svg width="450" height="120" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr38" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Terminal A -->
    <circle cx="40" cy="60" r="4" fill="#0f172a"/>
    <text x="20" y="65" font-size="16" font-weight="bold" fill="#0f172a">A</text>

    <!-- Current Arrow -->
    <line x1="40" y1="60" x2="90" y2="60" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="60" y1="60" x2="80" y2="60" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr38)"/>
    <text x="55" y="85" font-size="14" font-weight="bold" fill="#0f172a">5A</text>

    <!-- Resistor 1 ohm -->
    <rect x="90" y="52" width="40" height="16" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="100" y="85" font-size="14" font-weight="bold" fill="#1e293b">1 Ω</text>
    <line x1="130" y1="60" x2="170" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Battery 15V (+ on left, - on right) -->
    <line x1="170" y1="45" x2="170" y2="75" stroke="#0f172a" stroke-width="3"/>
    <line x1="178" y1="52" x2="178" y2="68" stroke="#0f172a" stroke-width="3"/>
    <text x="160" y="95" font-size="14" font-weight="bold" fill="#0f172a">15V</text>
    <line x1="178" y1="60" x2="220" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Inductor 5H -->
    <path d="M 220 60 Q 230 45 240 60 Q 250 45 260 60 Q 270 45 280 60 Q 290 45 300 60" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="250" y="85" font-size="14" font-weight="bold" fill="#0284c7">5H</text>
    <line x1="300" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Terminal B -->
    <circle cx="350" cy="60" r="4" fill="#0f172a"/>
    <text x="365" y="65" font-size="16" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_q38.png', svgQ38);

  // Q39: Circuit with C, L, R
  const svgQ39 = `
  <svg width="400" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr39" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Outer rectangle -->
    <line x1="80" y1="40" x2="320" y2="40" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="80" y1="160" x2="320" y2="160" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Left branch: Battery E, resistor R, switch S -->
    <line x1="80" y1="40" x2="80" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Battery -->
    <line x1="68" y1="70" x2="92" y2="70" stroke="#0f172a" stroke-width="3"/>
    <line x1="72" y1="78" x2="88" y2="78" stroke="#0f172a" stroke-width="3"/>
    <text x="50" y="77" font-size="15" font-weight="bold" fill="#0f172a">ε</text>
    <line x1="80" y1="78" x2="80" y2="100" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Resistor R -->
    <rect x="72" y="100" width="16" height="30" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="50" y="120" font-size="14" font-weight="bold" fill="#1e293b">R</text>
    <line x1="80" y1="130" x2="80" y2="160" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Switch S at bottom -->
    <circle cx="120" cy="160" r="3" fill="#1e293b"/>
    <line x1="120" y1="160" x2="140" y2="150" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="145" cy="160" r="3" fill="#1e293b"/>
    <text x="130" y="180" font-size="14" font-weight="bold" fill="#1e293b">S</text>

    <!-- Current I1 -->
    <line x1="110" y1="40" x2="150" y2="40" stroke="#0f172a" stroke-width="2" marker-end="url(#arr39)"/>
    <text x="125" y="30" font-size="14" font-weight="bold" fill="#0f172a">I₁</text>

    <!-- Middle branch: Resistor R and Inductor L -->
    <line x1="200" y1="40" x2="200" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Current I2 -->
    <line x1="200" y1="50" x2="200" y2="70" stroke="#0f172a" stroke-width="2" marker-end="url(#arr39)"/>
    <text x="210" y="65" font-size="14" font-weight="bold" fill="#0f172a">I₂</text>
    <rect x="192" y="70" width="16" height="30" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="215" y="90" font-size="14" font-weight="bold" fill="#1e293b">R</text>
    <line x1="200" y1="100" x2="200" y2="115" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 200 115 Q 190 123 200 130 Q 190 138 200 145" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="215" y="135" font-size="14" font-weight="bold" fill="#0284c7">L</text>
    <line x1="200" y1="145" x2="200" y2="160" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Right branch: Resistor 2R and Capacitor C -->
    <!-- Current I3 -->
    <line x1="250" y1="40" x2="290" y2="40" stroke="#0f172a" stroke-width="2" marker-end="url(#arr39)"/>
    <text x="265" y="30" font-size="14" font-weight="bold" fill="#0f172a">I₃</text>
    <line x1="320" y1="40" x2="320" y2="65" stroke="#1e293b" stroke-width="2.5"/>
    <rect x="312" y="65" width="16" height="30" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="335" y="85" font-size="14" font-weight="bold" fill="#1e293b">2R</text>
    <line x1="320" y1="95" x2="320" y2="120" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Capacitor -->
    <line x1="308" y1="120" x2="332" y2="120" stroke="#0284c7" stroke-width="3"/>
    <line x1="308" y1="128" x2="332" y2="128" stroke="#0284c7" stroke-width="3"/>
    <text x="335" y="128" font-size="14" font-weight="bold" fill="#0284c7">C</text>
    <line x1="320" y1="128" x2="320" y2="160" stroke="#1e293b" stroke-width="2.5"/>
  </svg>
  `;
  await saveDiagram('emi_q39.png', svgQ39);

  // Q42: Concentric square loops
  const svgQ42 = `
  <svg width="340" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="dimArr42" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Large square of side a -->
    <rect x="70" y="50" width="180" height="180" fill="#f8fafc" stroke="#1e293b" stroke-width="3"/>
    <line x1="70" y1="35" x2="250" y2="35" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr42)" marker-end="url(#dimArr42)"/>
    <text x="155" y="30" font-size="15" font-weight="bold" fill="#64748b">a</text>

    <!-- Small concentric square of side b -->
    <rect x="130" y="110" width="60" height="60" fill="#ffffff" stroke="#0284c7" stroke-width="2.5"/>
    <line x1="130" y1="95" x2="190" y2="95" stroke="#0284c7" stroke-width="1.5" marker-start="url(#dimArr42)" marker-end="url(#dimArr42)"/>
    <text x="155" y="90" font-size="14" font-weight="bold" fill="#0284c7">b</text>
  </svg>
  `;
  await saveDiagram('emi_q42.png', svgQ42);
}

generateAll().catch(console.error);
