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
  // Q1: Rails with Capacitor and Moving Rod
  const svgQ1 = `
  <svg width="450" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Rails -->
    <line x1="80" y1="50" x2="380" y2="50" stroke="#334155" stroke-width="3"/>
    <line x1="80" y1="170" x2="380" y2="170" stroke="#334155" stroke-width="3"/>
    
    <!-- Capacitor -->
    <line x1="80" y1="50" x2="80" y2="95" stroke="#334155" stroke-width="3"/>
    <line x1="80" y1="170" x2="80" y2="125" stroke="#334155" stroke-width="3"/>
    <line x1="60" y1="95" x2="100" y2="95" stroke="#0284c7" stroke-width="3"/>
    <line x1="60" y1="125" x2="100" y2="125" stroke="#0284c7" stroke-width="3"/>
    <text x="40" y="115" font-size="18" font-weight="bold" fill="#0284c7">C</text>

    <!-- Moving Rod -->
    <rect x="230" y="40" width="16" height="140" fill="#f1f5f9" stroke="#1e293b" stroke-width="2.5" rx="2"/>
    <line x1="246" y1="110" x2="330" y2="110" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ1)"/>
    <text x="260" y="100" font-size="15" font-weight="bold" fill="#0f172a">F_constant</text>

    <!-- Magnetic Field Crosses -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="140" y="90">×</text><text x="180" y="90">×</text><text x="310" y="90">×</text><text x="350" y="90">×</text>
      <text x="140" y="150">×</text><text x="180" y="150">×</text><text x="310" y="150">×</text><text x="350" y="150">×</text>
    </g>
  </svg>
  `;
  await saveDiagram('emi_q1.png', svgQ1);

  // Q3: Two coupled inductors
  const svgQ3 = `
  <svg width="450" height="120" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="40" y1="60" x2="80" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Inductor 1 (9H) -->
    <path d="M 80 60 Q 95 30 110 60 Q 125 30 140 60 Q 155 30 170 60 Q 185 30 200 60" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="140" y="30" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="middle">9 H</text>

    <!-- Connect wire -->
    <line x1="200" y1="60" x2="240" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Inductor 2 (4H) -->
    <path d="M 240 60 Q 255 30 270 60 Q 285 30 300 60 Q 315 30 330 60 Q 345 30 360 60" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="300" y="30" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="middle">4 H</text>

    <line x1="360" y1="60" x2="400" y2="60" stroke="#1e293b" stroke-width="2.5"/>
  </svg>
  `;
  await saveDiagram('emi_q3.png', svgQ3);

  // Q4: LR Circuit
  const svgQ4 = `
  <svg width="450" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Main loop with cell and resistor r -->
    <line x1="80" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Battery -->
    <line x1="180" y1="165" x2="180" y2="195" stroke="#1e293b" stroke-width="3"/>
    <line x1="190" y1="172" x2="190" y2="188" stroke="#1e293b" stroke-width="2"/>
    <text x="185" y="155" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">E (emf)</text>
    <line x1="190" y1="180" x2="260" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Resistor r -->
    <rect x="260" y="170" width="50" height="20" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <text x="285" y="210" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">r</text>
    <line x1="310" y1="180" x2="380" y2="180" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Switch S at left -->
    <line x1="80" y1="180" x2="80" y2="120" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="80" y1="120" x2="95" y2="105" stroke="#dc2626" stroke-width="2.5"/>
    <text x="65" y="115" font-size="14" font-weight="bold" fill="#dc2626">t=0</text>
    <text x="95" y="125" font-size="15" font-weight="bold" fill="#1e293b">S</text>
    <line x1="80" y1="95" x2="80" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Right vertical wire -->
    <line x1="380" y1="180" x2="380" y2="60" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Parallel Branches: Top (L), Middle (R) -->
    <!-- Top Branch (L) -->
    <line x1="80" y1="60" x2="170" y2="60" stroke="#1e293b" stroke-width="2"/>
    <path d="M 170 60 Q 185 40 200 60 Q 215 40 230 60 Q 245 40 260 60 Q 275 40 290 60" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="230" y="35" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">L</text>
    <line x1="290" y1="60" x2="380" y2="60" stroke="#1e293b" stroke-width="2"/>

    <!-- Middle Branch (R) -->
    <line x1="120" y1="60" x2="120" y2="110" stroke="#1e293b" stroke-width="2"/>
    <line x1="120" y1="110" x2="200" y2="110" stroke="#1e293b" stroke-width="2"/>
    <rect x="200" y="100" width="60" height="20" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <text x="230" y="115" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">R</text>
    <line x1="260" y1="110" x2="340" y2="110" stroke="#1e293b" stroke-width="2"/>
    <line x1="340" y1="110" x2="340" y2="60" stroke="#1e293b" stroke-width="2"/>
  </svg>
  `;
  await saveDiagram('emi_q4.png', svgQ4);

  // Q5: Rotating Rod in circular magnetic field
  const svgQ5 = `
  <svg width="450" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <circle cx="150" cy="130" r="90" fill="#f8fafc" stroke="#334155" stroke-width="2.5"/>
    <!-- Magnetic field crosses inside -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="90" y="90">×</text><text x="140" y="90">×</text><text x="190" y="90">×</text>
      <text x="90" y="135">×</text><text x="140" y="135">×</text><text x="190" y="135">×</text>
      <text x="90" y="180">×</text><text x="140" y="180">×</text><text x="190" y="180">×</text>
    </g>

    <!-- Center O -->
    <circle cx="150" cy="130" r="4" fill="#0f172a"/>
    <text x="140" y="125" font-size="15" font-weight="bold" fill="#0f172a">O</text>

    <!-- Rod OB along horizontal -->
    <rect x="150" y="124" width="90" height="12" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
    <!-- Point A at mid point -->
    <circle cx="195" cy="130" r="4" fill="#dc2626"/>
    <text x="195" y="115" font-size="15" font-weight="bold" fill="#dc2626" text-anchor="middle">A</text>
    <!-- Point B at edge -->
    <circle cx="240" cy="130" r="4" fill="#2563eb"/>
    <text x="255" y="135" font-size="15" font-weight="bold" fill="#2563eb">B</text>

    <!-- Parameters text on right -->
    <text x="280" y="100" font-size="16" font-weight="bold" fill="#0f172a">ω = 2 rad/s</text>
    <text x="280" y="130" font-size="16" font-weight="bold" fill="#0f172a">R = 1 m</text>
    <text x="280" y="160" font-size="16" font-weight="bold" fill="#0f172a">B = 1 T</text>
  </svg>
  `;
  await saveDiagram('emi_q5.png', svgQ5);

  // Q6: Wire and Circular Loop
  const svgQ6 = `
  <svg width="450" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ6" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Circular Loop -->
    <circle cx="140" cy="100" r="45" fill="#f8fafc" stroke="#2563eb" stroke-width="2.5"/>
    <circle cx="140" cy="100" r="4" fill="#2563eb"/>

    <!-- Straight wire carrying current i upwards -->
    <line x1="280" y1="170" x2="280" y2="30" stroke="#0f172a" stroke-width="3" marker-end="url(#arrQ6)"/>
    <text x="295" y="105" font-size="18" font-weight="bold" fill="#0f172a">i</text>
  </svg>
  `;
  await saveDiagram('emi_q6.png', svgQ6);

  // Q7: Rotating rod OA touching loop
  const svgQ7 = `
  <svg width="450" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Circular Loop -->
    <circle cx="180" cy="130" r="90" fill="#f8fafc" stroke="#334155" stroke-width="2.5"/>
    <!-- Magnetic Field Crosses -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="120" y="80">×</text><text x="180" y="80">×</text><text x="240" y="80">×</text>
      <text x="120" y="135">×</text><text x="240" y="135">×</text>
      <text x="120" y="190">×</text><text x="180" y="190">×</text><text x="240" y="190">×</text>
    </g>

    <!-- Pivot O -->
    <circle cx="180" cy="130" r="4" fill="#0f172a"/>
    <text x="195" y="135" font-size="16" font-weight="bold" fill="#0f172a">O</text>

    <!-- Rod OA pointing vertically up to A -->
    <rect x="174" y="40" width="12" height="90" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
    <text x="180" y="30" font-size="18" font-weight="bold" fill="#dc2626" text-anchor="middle">A</text>

    <!-- Resistor R from O to fixed point e on rim -->
    <line x1="180" y1="130" x2="145" y2="160" stroke="#1e293b" stroke-width="2"/>
    <rect x="130" y="155" width="24" height="20" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="155" y="165" font-size="13" font-weight="bold" fill="#1e293b">R</text>
    <line x1="130" y1="175" x2="116" y2="194" stroke="#1e293b" stroke-width="2"/>
    <text x="95" y="200" font-size="16" font-weight="bold" fill="#2563eb">e</text>
  </svg>
  `;
  await saveDiagram('emi_q7.png', svgQ7);

  // Q9: Circuit with L and R2
  const svgQ9 = `
  <svg width="450" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Battery V and Resistor R1 on top rail -->
    <line x1="80" y1="40" x2="160" y2="40" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="160" y1="28" x2="160" y2="52" stroke="#1e293b" stroke-width="3"/>
    <line x1="168" y1="34" x2="168" y2="46" stroke="#1e293b" stroke-width="2"/>
    <text x="164" y="20" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">V</text>
    <line x1="168" y1="40" x2="240" y2="40" stroke="#1e293b" stroke-width="2.5"/>
    <rect x="240" y="30" width="50" height="20" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <text x="265" y="22" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">R1</text>
    <line x1="290" y1="40" x2="360" y2="40" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Vertical rails -->
    <line x1="80" y1="40" x2="80" y2="160" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="360" y1="40" x2="360" y2="160" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Middle branch: Resistor R2 -->
    <line x1="80" y1="100" x2="190" y2="100" stroke="#1e293b" stroke-width="2"/>
    <rect x="190" y="90" width="60" height="20" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <text x="220" y="80" font-size="15" font-weight="bold" fill="#1e293b" text-anchor="middle">R2</text>
    <line x1="250" y1="100" x2="360" y2="100" stroke="#1e293b" stroke-width="2"/>

    <!-- Bottom branch: Inductor L -->
    <line x1="80" y1="160" x2="180" y2="160" stroke="#1e293b" stroke-width="2"/>
    <path d="M 180 160 Q 195 140 210 160 Q 225 140 240 160 Q 255 140 270 160" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="225" y="185" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">L</text>
    <line x1="270" y1="160" x2="360" y2="160" stroke="#1e293b" stroke-width="2"/>
  </svg>
  `;
  await saveDiagram('emi_q9.png', svgQ9);

  // Q10: Falling Ring in Field B
  const svgQ10 = `
  <svg width="350" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <circle cx="175" cy="130" r="70" fill="none" stroke="#2563eb" stroke-width="3"/>
    <!-- Points A, B, C, D, E -->
    <circle cx="105" cy="130" r="4" fill="#dc2626"/>
    <text x="85" y="135" font-size="16" font-weight="bold" fill="#dc2626">A</text>
    <circle cx="245" cy="130" r="4" fill="#dc2626"/>
    <text x="255" y="135" font-size="16" font-weight="bold" fill="#dc2626">D</text>
    <circle cx="175" cy="60" r="4" fill="#dc2626"/>
    <text x="175" y="50" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">C</text>
    <circle cx="175" cy="200" r="4" fill="#dc2626"/>
    <text x="175" y="225" font-size="16" font-weight="bold" fill="#dc2626" text-anchor="middle">E</text>

    <!-- Center B field -->
    <text x="170" y="135" font-size="16" font-family="monospace" fill="#64748b">⊗ B</text>
  </svg>
  `;
  await saveDiagram('emi_q10.png', svgQ10);

  // Q11: Sliding rod on rails with resistor R
  const svgQ11 = `
  <svg width="450" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ11" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- U-shaped rail -->
    <line x1="80" y1="50" x2="380" y2="50" stroke="#334155" stroke-width="3"/>
    <line x1="80" y1="170" x2="380" y2="170" stroke="#334155" stroke-width="3"/>
    <line x1="80" y1="50" x2="80" y2="85" stroke="#334155" stroke-width="3"/>
    <line x1="80" y1="170" x2="80" y2="135" stroke="#334155" stroke-width="3"/>
    <rect x="70" y="85" width="20" height="50" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <text x="105" y="115" font-size="16" font-weight="bold" fill="#1e293b">R</text>

    <!-- Moving Rod -->
    <rect x="250" y="40" width="14" height="140" fill="#fed7aa" stroke="#c2410c" stroke-width="2" rx="2"/>
    <line x1="264" y1="110" x2="340" y2="110" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrQ11)"/>
    <text x="350" y="115" font-size="16" font-weight="bold" fill="#0f172a">F</text>
    <text x="385" y="55" font-size="16" font-family="monospace" fill="#64748b">⊗ B</text>
  </svg>
  `;
  await saveDiagram('emi_q11.png', svgQ11);
}

generateAll().catch(console.error);
