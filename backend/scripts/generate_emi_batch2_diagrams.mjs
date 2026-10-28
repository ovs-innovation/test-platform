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
  // Q14: Rod in xy plane from (0, 4) to (3, 0)
  const svgQ14 = `
  <svg width="350" height="280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr14" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Axes -->
    <line x1="50" y1="230" x2="310" y2="230" stroke="#0f172a" stroke-width="2" marker-end="url(#arr14)"/>
    <line x1="70" y1="250" x2="70" y2="30" stroke="#0f172a" stroke-width="2" marker-end="url(#arr14)"/>
    <text x="315" y="235" font-size="16" font-weight="bold" fill="#0f172a">X</text>
    <text x="65" y="25" font-size="16" font-weight="bold" fill="#0f172a">Y</text>
    <text x="50" y="245" font-size="14" fill="#64748b">O</text>

    <!-- Rod -->
    <line x1="70" y1="70" x2="230" y2="230" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
    
    <!-- Endpoints -->
    <circle cx="70" cy="70" r="4" fill="#0369a1"/>
    <circle cx="230" cy="230" r="4" fill="#0369a1"/>
    
    <text x="80" y="70" font-size="14" font-weight="bold" fill="#0369a1">(0, 4m)</text>
    <text x="210" y="250" font-size="14" font-weight="bold" fill="#0369a1">(3m, 0)</text>
    <text x="170" y="140" font-size="14" font-style="italic" fill="#334155">rod</text>
  </svg>
  `;
  await saveDiagram('emi_q14.png', svgQ14);

  // Q15: phi - t graph
  const svgQ15 = `
  <svg width="350" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr15" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Axes -->
    <line x1="40" y1="140" x2="310" y2="140" stroke="#0f172a" stroke-width="2" marker-end="url(#arr15)"/>
    <line x1="80" y1="170" x2="80" y2="30" stroke="#0f172a" stroke-width="2" marker-end="url(#arr15)"/>
    <text x="315" y="145" font-size="16" font-weight="bold" fill="#0f172a">t</text>
    <text x="75" y="25" font-size="18" font-weight="bold" fill="#0f172a">φ</text>

    <!-- Linear decreasing flux -->
    <line x1="80" y1="50" x2="230" y2="170" stroke="#dc2626" stroke-width="3"/>
    <text x="175" y="160" font-size="15" font-weight="bold" fill="#0f172a">t₀</text>
  </svg>
  `;
  await saveDiagram('emi_q15.png', svgQ15);

  // Q16: Two conducting rings on surface S
  const svgQ16 = `
  <svg width="460" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr16" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Conducting surface S -->
    <line x1="20" y1="160" x2="440" y2="160" stroke="#334155" stroke-width="3"/>
    <text x="230" y="185" font-size="16" font-weight="bold" fill="#334155">S</text>

    <!-- Ring 1 (radius r, moving left at 2v) -->
    <circle cx="120" cy="120" r="40" fill="none" stroke="#0284c7" stroke-width="3"/>
    <circle cx="120" cy="120" r="3" fill="#0284c7"/>
    <line x1="80" y1="120" x2="25" y2="120" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr16)"/>
    <text x="35" y="110" font-size="15" font-weight="bold" fill="#0f172a">2v</text>

    <!-- Ring 2 (radius 2r, moving right at v) -->
    <circle cx="320" cy="80" r="80" fill="none" stroke="#0284c7" stroke-width="3"/>
    <circle cx="320" cy="80" r="3" fill="#0284c7"/>
    <line x1="400" y1="80" x2="445" y2="80" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr16)"/>
    <text x="420" y="70" font-size="15" font-weight="bold" fill="#0f172a">v</text>

    <!-- Field B out of paper -->
    <circle cx="215" cy="80" r="12" fill="none" stroke="#0f172a" stroke-width="2"/>
    <circle cx="215" cy="80" r="3" fill="#0f172a"/>
    <text x="185" y="85" font-size="16" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_q16.png', svgQ16);

  // Q17: Two inductors in series opposition
  const svgQ17 = `
  <svg width="420" height="150" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="30" y1="70" x2="70" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <text x="10" y="75" font-size="16" font-weight="bold" fill="#0f172a">A</text>

    <!-- Inductor 1 (L1) -->
    <path d="M 70 70 Q 82 45 95 70 Q 107 45 120 70 Q 132 45 145 70 Q 157 45 170 70 Q 182 45 195 70 Q 207 45 220 70" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="140" y="40" font-size="16" font-weight="bold" fill="#0284c7">L₁</text>

    <!-- Connecting wire to bottom of L2 -->
    <line x1="220" y1="70" x2="250" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="250" y1="70" x2="250" y2="120" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="250" y1="120" x2="330" y2="120" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="330" y1="120" x2="330" y2="95" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Inductor 2 (L2) -->
    <path d="M 330 95 Q 320 85 330 75 Q 320 65 330 55" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="345" y="75" font-size="16" font-weight="bold" fill="#0284c7">L₂</text>

    <!-- Terminal B -->
    <line x1="330" y1="55" x2="330" y2="30" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="330" y1="30" x2="270" y2="30" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="270" y1="30" x2="270" y2="50" stroke="#1e293b" stroke-width="2.5"/>
    <text x="285" y="45" font-size="16" font-weight="bold" fill="#0f172a">B</text>
  </svg>
  `;
  await saveDiagram('emi_q17.png', svgQ17);

  // Q18: Straight wire and rectangular loop
  const svgQ18 = `
  <svg width="400" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr18" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
      <marker id="dimArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b"/>
      </marker>
    </defs>
    <!-- Long Wire -->
    <line x1="80" y1="20" x2="80" y2="200" stroke="#0f172a" stroke-width="3"/>
    <line x1="80" y1="120" x2="80" y2="80" stroke="#0f172a" stroke-width="3" marker-end="url(#arr18)"/>
    <text x="60" y="105" font-size="16" font-weight="bold" fill="#0f172a">i</text>

    <!-- Distance x dimension -->
    <line x1="80" y1="110" x2="180" y2="110" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" marker-start="url(#dimArr)" marker-end="url(#dimArr)"/>
    <text x="125" y="105" font-size="14" font-weight="bold" fill="#64748b">x</text>

    <!-- Rectangular Loop (a x b) -->
    <rect x="180" y="50" width="120" height="120" fill="#f8fafc" stroke="#0284c7" stroke-width="3"/>
    <text x="310" y="115" font-size="15" font-weight="bold" fill="#0284c7">b</text>

    <!-- Width a dimension -->
    <line x1="180" y1="185" x2="300" y2="185" stroke="#64748b" stroke-width="1.5" marker-start="url(#dimArr)" marker-end="url(#dimArr)"/>
    <text x="235" y="200" font-size="14" font-weight="bold" fill="#64748b">a</text>
  </svg>
  `;
  await saveDiagram('emi_q18.png', svgQ18);

  // Q19: R-L bridge circuit
  const svgQ19 = `
  <svg width="380" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Loop structure -->
    <rect x="80" y="50" width="220" height="100" fill="none" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Middle Inductor L -->
    <path d="M 190 50 Q 180 62 190 75 Q 180 87 190 100 Q 180 112 190 125 Q 180 137 190 150" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="200" y="105" font-size="16" font-weight="bold" fill="#0284c7">L</text>

    <!-- Resistors labels -->
    <!-- Top left: R -->
    <rect x="120" y="44" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="128" y="38" font-size="14" font-weight="bold" fill="#1e293b">R</text>

    <!-- Top right: 2R -->
    <rect x="230" y="44" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="235" y="38" font-size="14" font-weight="bold" fill="#1e293b">2R</text>

    <!-- Bottom left: 2R -->
    <rect x="120" y="144" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="125" y="172" font-size="14" font-weight="bold" fill="#1e293b">2R</text>

    <!-- Bottom right: R -->
    <rect x="230" y="144" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="238" y="172" font-size="14" font-weight="bold" fill="#1e293b">R</text>

    <!-- Battery at outer terminals -->
    <line x1="80" y1="100" x2="40" y2="100" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="40" y1="100" x2="40" y2="195" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="40" y1="195" x2="165" y2="195" stroke="#1e293b" stroke-width="2.5"/>

    <line x1="300" y1="100" x2="340" y2="100" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="340" y1="100" x2="340" y2="195" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="340" y1="195" x2="195" y2="195" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Battery symbol -->
    <line x1="165" y1="185" x2="165" y2="205" stroke="#0f172a" stroke-width="3"/>
    <line x1="175" y1="175" x2="175" y2="215" stroke="#0f172a" stroke-width="3"/>
    <line x1="185" y1="185" x2="185" y2="205" stroke="#0f172a" stroke-width="3"/>
    <line x1="195" y1="175" x2="195" y2="215" stroke="#0f172a" stroke-width="3"/>
  </svg>
  `;
  await saveDiagram('emi_q19.png', svgQ19);

  // Q20: Bridge circuit with switch S, cell E, inductor L
  const svgQ20 = `
  <svg width="420" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Upper bridge -->
    <rect x="60" y="40" width="280" height="80" fill="none" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Nodes M and N -->
    <text x="35" y="85" font-size="16" font-weight="bold" fill="#0f172a">M</text>
    <text x="345" y="85" font-size="16" font-weight="bold" fill="#0f172a">N</text>

    <!-- Resistors -->
    <!-- Top-left 3R -->
    <rect x="100" y="34" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="105" y="28" font-size="13" font-weight="bold" fill="#1e293b">3R</text>

    <!-- Top-right 3R -->
    <rect x="250" y="34" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="255" y="28" font-size="13" font-weight="bold" fill="#1e293b">3R</text>

    <!-- Bottom-left 6R -->
    <rect x="100" y="114" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="105" y="140" font-size="13" font-weight="bold" fill="#1e293b">6R</text>

    <!-- Bottom-right 3R -->
    <rect x="250" y="114" width="30" height="12" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="255" y="140" font-size="13" font-weight="bold" fill="#1e293b">3R</text>

    <!-- Center vertical branch: switch S and cell E -->
    <line x1="200" y1="40" x2="200" y2="55" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Switch -->
    <circle cx="200" cy="55" r="3" fill="#1e293b"/>
    <line x1="200" y1="55" x2="215" y2="65" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="200" cy="75" r="3" fill="#1e293b"/>
    <text x="220" y="65" font-size="14" font-weight="bold" fill="#1e293b">S</text>

    <line x1="200" y1="75" x2="200" y2="85" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Cell -->
    <line x1="185" y1="85" x2="215" y2="85" stroke="#0f172a" stroke-width="3"/>
    <line x1="190" y1="95" x2="210" y2="95" stroke="#0f172a" stroke-width="2"/>
    <text x="225" y="93" font-size="13" font-weight="bold" fill="#0f172a">E (emf)</text>
    <line x1="200" y1="95" x2="200" y2="120" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Bottom inductor branch between M and N -->
    <line x1="60" y1="80" x2="60" y2="190" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="60" y1="190" x2="120" y2="190" stroke="#1e293b" stroke-width="2.5"/>

    <path d="M 120 190 Q 135 170 150 190 Q 165 170 180 190 Q 195 170 210 190 Q 225 170 240 190 Q 255 170 270 190" fill="none" stroke="#0284c7" stroke-width="3"/>
    <text x="195" y="215" font-size="15" font-weight="bold" fill="#0284c7">L</text>

    <line x1="270" y1="190" x2="340" y2="190" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="340" y1="190" x2="340" y2="80" stroke="#1e293b" stroke-width="2.5"/>
  </svg>
  `;
  await saveDiagram('emi_q20.png', svgQ20);

  // Q21: Circle with chord PQ and time varying field
  const svgQ21 = `
  <svg width="360" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Circle of radius R = 1m -->
    <circle cx="120" cy="110" r="80" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="120" cy="110" r="3" fill="#0f172a"/>
    <text x="125" y="105" font-size="14" font-weight="bold" fill="#0f172a">O</text>

    <!-- Field Crosses inside -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="80" y="70">×</text><text x="130" y="70">×</text><text x="160" y="70">×</text>
      <text x="60" y="110">×</text><text x="170" y="110">×</text>
      <text x="80" y="150">×</text><text x="140" y="150">×</text>
      <text x="110" y="180">×</text>
    </g>

    <!-- Chord PQ (subtending 90 deg at O) -->
    <!-- Angle at O is 90 deg: P at bottom left (-45 deg from bottom: 225 deg from +x = (-56.5, 56.5)), Q at (56.5, 56.5) -->
    <line x1="63.5" y1="166.5" x2="176.5" y2="166.5" stroke="#0284c7" stroke-width="4"/>
    <circle cx="63.5" cy="166.5" r="4" fill="#0284c7"/>
    <circle cx="176.5" cy="166.5" r="4" fill="#0284c7"/>
    <text x="45" y="172" font-size="16" font-weight="bold" fill="#0284c7">P</text>
    <text x="185" y="172" font-size="16" font-weight="bold" fill="#0284c7">Q</text>

    <!-- Box for |dB/dt| = 2 T/s -->
    <rect x="230" y="80" width="110" height="50" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
    <text x="240" y="112" font-size="14" font-weight="bold" fill="#0f172a">|dB/dt| = 2 T/s</text>
  </svg>
  `;
  await saveDiagram('emi_q21.png', svgQ21);

  // Q23: Metallic sheet in magnetic field
  const svgQ23 = `
  <svg width="340" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr23" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Background field crosses -->
    <g fill="#94a3b8" font-size="16" font-family="monospace">
      <text x="40" y="40">×</text><text x="90" y="40">×</text><text x="140" y="40">×</text><text x="190" y="40">×</text><text x="240" y="40">×</text>
      <text x="40" y="80">×</text><text x="90" y="80">×</text><text x="190" y="80">×</text><text x="240" y="80">×</text>
      <text x="40" y="120">×</text><text x="90" y="120">×</text><text x="190" y="120">×</text><text x="240" y="120">×</text>
      <text x="40" y="160">×</text><text x="90" y="160">×</text><text x="190" y="160">×</text><text x="240" y="160">×</text>
      <text x="40" y="200">×</text><text x="90" y="200">×</text><text x="140" y="200">×</text><text x="190" y="200">×</text><text x="240" y="200">×</text>
    </g>

    <!-- Metallic sheet moving upwards -->
    <rect x="130" y="60" width="24" height="110" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <!-- Velocity arrow -->
    <line x1="142" y1="60" x2="142" y2="20" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr23)"/>
    <text x="150" y="35" font-size="16" font-weight="bold" fill="#0f172a">v</text>

    <!-- Labels sigma1 and sigma2 -->
    <text x="105" y="120" font-size="15" font-weight="bold" fill="#0284c7">σ₁</text>
    <text x="160" y="120" font-size="15" font-weight="bold" fill="#0284c7">σ₂</text>
  </svg>
  `;
  await saveDiagram('emi_q23.png', svgQ23);

  // Q25: Cylindrical region with charge projected
  const svgQ25 = `
  <svg width="380" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr25" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
      </marker>
    </defs>
    <!-- Cylindrical field region of radius R -->
    <circle cx="120" cy="120" r="75" fill="#f8fafc" stroke="#0284c7" stroke-width="2.5"/>
    
    <!-- Dots for B out of paper -->
    <g fill="#0284c7">
      <circle cx="80" cy="80" r="3"/><circle cx="120" cy="80" r="3"/><circle cx="160" cy="80" r="3"/>
      <circle cx="65" cy="120" r="3"/><circle cx="100" cy="120" r="3"/><circle cx="140" cy="120" r="3"/><circle cx="175" cy="120" r="3"/>
      <circle cx="80" cy="160" r="3"/><circle cx="120" cy="160" r="3"/><circle cx="160" cy="160" r="3"/>
    </g>
    <!-- Radius R -->
    <line x1="120" y1="120" x2="120" y2="195" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="125" y="165" font-size="14" font-weight="bold" fill="#64748b">R</text>

    <!-- Point P outside -->
    <line x1="120" y1="120" x2="270" y2="120" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="270" cy="120" r="4" fill="#0f172a"/>
    <text x="265" y="140" font-size="16" font-weight="bold" fill="#0f172a">P</text>

    <!-- Velocity arrow upwards -->
    <line x1="270" y1="120" x2="285" y2="60" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arr25)"/>
    <text x="290" y="70" font-size="15" font-weight="bold" fill="#dc2626">v</text>
  </svg>
  `;
  await saveDiagram('emi_q25.png', svgQ25);
}

generateAll().catch(console.error);
