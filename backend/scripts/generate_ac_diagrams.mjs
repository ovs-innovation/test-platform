import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const backendDir = 'backend/uploads/alternating_current';
const frontendDir = 'frontend/public/uploads/alternating_current';

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
  // Q1: Q-t parabolic graph
  const svgQ1 = `
  <svg width="400" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Axes -->
    <line x1="60" y1="210" x2="350" y2="210" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr)"/>
    <line x1="60" y1="210" x2="60" y2="30" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr)"/>
    <text x="360" y="215" font-size="16" font-weight="bold" fill="#1e293b">t</text>
    <text x="50" y="25" font-size="16" font-weight="bold" fill="#1e293b">Q</text>
    <text x="45" y="225" font-size="14" fill="#64748b">0</text>
    
    <!-- Parabola: Q = t^2 -> at t=2, Q=4. (t=0 -> x=60, y=210; t=2 -> x=180, y=110; t=3 -> x=270, y=40) -->
    <path d="M 60 210 Q 120 200 180 110 T 260 30" fill="none" stroke="#2563eb" stroke-width="3"/>
    
    <!-- Dotted lines for (2, 4) -->
    <line x1="180" y1="210" x2="180" y2="110" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
    <line x1="60" y1="110" x2="180" y2="110" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
    <circle cx="180" cy="110" r="4.5" fill="#1e293b"/>
    <text x="175" y="230" font-size="15" font-weight="bold" fill="#1e293b">2</text>
    <text x="40" y="115" font-size="15" font-weight="bold" fill="#1e293b">4</text>
  </svg>
  `;
  await saveDiagram('ac_q1.png', svgQ1);

  // Q2: i-t sinusoidal curve
  const svgQ2 = `
  <svg width="450" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Axes -->
    <line x1="50" y1="130" x2="410" y2="130" stroke="#1e293b" stroke-width="2" marker-end="url(#arr2)"/>
    <line x1="80" y1="230" x2="80" y2="25" stroke="#1e293b" stroke-width="2" marker-end="url(#arr2)"/>
    <text x="415" y="135" font-size="14" font-weight="bold" fill="#1e293b">t (s)</text>
    <text x="60" y="22" font-size="14" font-weight="bold" fill="#1e293b">i (A)</text>
    <text x="68" y="145" font-size="13" fill="#64748b">0</text>

    <!-- Curve: i(0)=2, peak at 4, crosses 0 at t=4, valley at -4, crosses 0 at t=10 -->
    <!-- (80, 95) -> peak at (130, 60) -> zero at (200, 130) -> valley at (280, 200) -> zero at (360, 130) -->
    <path d="M 80 95 C 100 60, 115 60, 130 60 C 160 60, 180 100, 200 130 C 230 175, 255 200, 280 200 C 310 200, 335 160, 360 130" fill="none" stroke="#2563eb" stroke-width="2.8"/>
    
    <!-- Guidelines -->
    <line x1="80" y1="95" x2="50" y2="95" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="65" y="98" font-size="13" font-weight="bold" fill="#1e293b">2</text>
    
    <line x1="130" y1="60" x2="50" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="130" y1="60" x2="130" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="65" y="65" font-size="13" font-weight="bold" fill="#1e293b">4</text>
    
    <text x="195" y="148" font-size="13" font-weight="bold" fill="#1e293b">4</text>
    <text x="355" y="148" font-size="13" font-weight="bold" fill="#1e293b">10</text>
    
    <line x1="280" y1="200" x2="50" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="280" y1="200" x2="280" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="60" y="205" font-size="13" font-weight="bold" fill="#1e293b">-4</text>
  </svg>
  `;
  await saveDiagram('ac_q2.png', svgQ2);

  // Q3: Resonant circuit with parallel C' and key K
  const svgQ3 = `
  <svg width="450" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Loop -->
    <!-- Resistor R on left -->
    <line x1="60" y1="60" x2="60" y2="90" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 60 90 L 53 95 L 67 105 L 53 115 L 67 125 L 53 135 L 67 145 L 60 150" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="60" y1="150" x2="60" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <text x="35" y="125" font-size="16" font-weight="bold" fill="#1e293b">R</text>

    <!-- Top wire with Inductor L -->
    <line x1="60" y1="60" x2="130" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Inductor -->
    <path d="M 130 60 C 130 45, 145 45, 145 60 C 145 45, 160 45, 160 60 C 160 45, 175 45, 175 60 C 175 45, 190 45, 190 60 C 190 45, 205 45, 205 60" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="205" y1="60" x2="260" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <text x="165" y="40" font-size="16" font-weight="bold" fill="#1e293b">L</text>

    <!-- Capacitor C branch -->
    <line x1="260" y1="60" x2="260" y2="105" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="245" y1="105" x2="275" y2="105" stroke="#2563eb" stroke-width="3"/>
    <line x1="245" y1="115" x2="275" y2="115" stroke="#2563eb" stroke-width="3"/>
    <line x1="260" y1="115" x2="260" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <text x="225" y="115" font-size="16" font-weight="bold" fill="#1e293b">C</text>

    <!-- Parallel branch with C' and Key K -->
    <line x1="260" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="350" y1="60" x2="350" y2="85" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="335" y1="85" x2="365" y2="85" stroke="#2563eb" stroke-width="3"/>
    <line x1="335" y1="95" x2="365" y2="95" stroke="#2563eb" stroke-width="3"/>
    <text x="375" y="95" font-size="16" font-weight="bold" fill="#1e293b">C'</text>
    <line x1="350" y1="95" x2="350" y2="125" stroke="#1e293b" stroke-width="2.5"/>
    
    <!-- Key K -->
    <circle cx="350" cy="140" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <path d="M 342 140 Q 350 132 358 140" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="375" y="145" font-size="15" font-weight="bold" fill="#1e293b">K</text>
    <line x1="350" y1="154" x2="350" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="350" y1="180" x2="260" y2="180" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Bottom AC Source -->
    <line x1="60" y1="180" x2="140" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="160" cy="180" r="20" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 150 180 Q 155 172 160 180 T 170 180" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="180" y1="180" x2="260" y2="180" stroke="#1e293b" stroke-width="2.5"/>
    <text x="115" y="218" font-size="16" font-weight="bold" fill="#1e293b">V = V_0 sin \omega t</text>
  </svg>
  `;
  await saveDiagram('ac_q3.png', svgQ3);

  // Q4: Phasor diagrams of series LCR circuit (4 candidate sub-diagrams)
  const svgQ4 = `
  <svg width="500" height="360" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="parr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Sub 1 -->
    <g transform="translate(40, 20)">
      <text x="0" y="20" font-size="15" font-weight="bold">(1)</text>
      <line x1="30" y1="80" x2="170" y2="80" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="10" x2="100" y2="150" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- V_R and i -->
      <line x1="100" y1="80" x2="160" y2="40" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <circle cx="135" cy="57" r="3" fill="#2563eb"/>
      <text x="165" y="38" font-size="13" font-weight="bold">V_R</text>
      <text x="125" y="50" font-size="12" font-weight="bold" fill="#2563eb">i_0</text>
      <!-- V_L (long) -->
      <line x1="100" y1="80" x2="40" y2="20" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="25" y="20" font-size="13" font-weight="bold">V_L</text>
      <!-- V_C (short) -->
      <line x1="100" y1="80" x2="135" y2="125" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="140" y="135" font-size="13" font-weight="bold">V_C</text>
    </g>

    <!-- Sub 2 (Correct: V_C long, V_L short) -->
    <g transform="translate(280, 20)">
      <text x="0" y="20" font-size="15" font-weight="bold" fill="#16a34a">(2)</text>
      <line x1="30" y1="80" x2="170" y2="80" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="10" x2="100" y2="150" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- V_R and i -->
      <line x1="100" y1="80" x2="160" y2="40" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <circle cx="135" cy="57" r="3" fill="#2563eb"/>
      <text x="165" y="38" font-size="13" font-weight="bold">V_R</text>
      <text x="125" y="50" font-size="12" font-weight="bold" fill="#2563eb">i_0</text>
      <!-- V_L (short) -->
      <line x1="100" y1="80" x2="75" y2="55" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="60" y="55" font-size="13" font-weight="bold">V_L</text>
      <!-- V_C (long) -->
      <line x1="100" y1="80" x2="160" y2="145" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="165" y="155" font-size="13" font-weight="bold">V_C</text>
    </g>

    <!-- Sub 3 -->
    <g transform="translate(40, 190)">
      <text x="0" y="20" font-size="15" font-weight="bold">(3)</text>
      <line x1="30" y1="80" x2="170" y2="80" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="10" x2="100" y2="150" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="160" y2="40" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <circle cx="135" cy="57" r="3" fill="#2563eb"/>
      <text x="165" y="38" font-size="13" font-weight="bold">V_R</text>
      <line x1="100" y1="80" x2="60" y2="50" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <circle cx="75" cy="61" r="3" fill="#2563eb"/>
      <text x="45" y="50" font-size="13" font-weight="bold">V_L</text>
      <line x1="100" y1="80" x2="150" y2="140" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="155" y="150" font-size="13" font-weight="bold">V_C</text>
    </g>

    <!-- Sub 4 -->
    <g transform="translate(280, 190)">
      <text x="0" y="20" font-size="15" font-weight="bold">(4)</text>
      <line x1="30" y1="80" x2="170" y2="80" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="10" x2="100" y2="150" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="160" y2="40" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <circle cx="135" cy="57" r="3" fill="#2563eb"/>
      <text x="165" y="38" font-size="13" font-weight="bold">V_R</text>
      <line x1="100" y1="80" x2="40" y2="20" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="25" y="20" font-size="13" font-weight="bold">V_L</text>
      <line x1="100" y1="80" x2="135" y2="125" stroke="#1e293b" stroke-width="2.2" marker-end="url(#parr)"/>
      <text x="140" y="135" font-size="13" font-weight="bold">V_C</text>
    </g>
  </svg>
  `;
  await saveDiagram('ac_q4.png', svgQ4);

  // Q5: Series LCR circuit and 4 resonance response curves
  const svgQ5 = `
  <svg width="480" height="320" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Top circuit -->
    <g transform="translate(40, 10)">
      <line x1="40" y1="30" x2="90" y2="30" stroke="#1e293b" stroke-width="2"/>
      <!-- R -->
      <path d="M 90 30 L 95 24 L 105 36 L 115 24 L 125 36 L 135 24 L 140 30" fill="none" stroke="#1e293b" stroke-width="2"/>
      <text x="110" y="16" font-size="13" font-weight="bold">R</text>
      <line x1="140" y1="30" x2="180" y2="30" stroke="#1e293b" stroke-width="2"/>
      <!-- C -->
      <line x1="180" y1="18" x2="180" y2="42" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="188" y1="18" x2="188" y2="42" stroke="#2563eb" stroke-width="2.5"/>
      <text x="180" y="14" font-size="13" font-weight="bold">C</text>
      <line x1="188" y1="30" x2="230" y2="30" stroke="#1e293b" stroke-width="2"/>
      <!-- L -->
      <path d="M 230 30 C 230 18, 242 18, 242 30 C 242 18, 254 18, 254 30 C 254 18, 266 18, 266 30 C 266 18, 278 18, 278 30" fill="none" stroke="#1e293b" stroke-width="2"/>
      <text x="250" y="14" font-size="13" font-weight="bold">L</text>
      <line x1="278" y1="30" x2="350" y2="30" stroke="#1e293b" stroke-width="2"/>
      <!-- Down and Source -->
      <line x1="350" y1="30" x2="350" y2="75" stroke="#1e293b" stroke-width="2"/>
      <line x1="350" y1="75" x2="210" y2="75" stroke="#1e293b" stroke-width="2"/>
      <circle cx="195" cy="75" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <path d="M 188 75 Q 192 70 195 75 T 202 75" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="181" y1="75" x2="40" y2="75" stroke="#1e293b" stroke-width="2"/>
      <line x1="40" y1="75" x2="40" y2="30" stroke="#1e293b" stroke-width="2"/>
    </g>

    <!-- 4 Graphs -->
    <!-- (1) Sharp Triangle peak -->
    <g transform="translate(40, 120)">
      <text x="0" y="15" font-size="14" font-weight="bold">(1)</text>
      <line x1="30" y1="75" x2="160" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="75" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="165" y="78" font-size="12">ω</text>
      <text x="25" y="8" font-size="12">i</text>
      <path d="M 30 75 L 85 20 L 150 75" fill="none" stroke="#2563eb" stroke-width="2"/>
      <line x1="85" y1="20" x2="85" y2="75" stroke="#94a3b8" stroke-dasharray="2,2"/>
      <text x="80" y="88" font-size="11">ω_0</text>
    </g>

    <!-- (2) Decreasing -->
    <g transform="translate(260, 120)">
      <text x="0" y="15" font-size="14" font-weight="bold">(2)</text>
      <line x1="30" y1="75" x2="160" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="75" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="165" y="78" font-size="12">ω</text>
      <text x="25" y="8" font-size="12">i</text>
      <path d="M 30 20 Q 50 65 150 72" fill="none" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- (3) Increasing -->
    <g transform="translate(40, 220)">
      <text x="0" y="15" font-size="14" font-weight="bold">(3)</text>
      <line x1="30" y1="75" x2="160" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="75" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="165" y="78" font-size="12">ω</text>
      <text x="25" y="8" font-size="12">i</text>
      <path d="M 30 65 Q 60 60 85 20" fill="none" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- (4) Smooth Bell (Correct) -->
    <g transform="translate(260, 220)">
      <text x="0" y="15" font-size="14" font-weight="bold" fill="#16a34a">(4)</text>
      <line x1="30" y1="75" x2="160" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="75" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="165" y="78" font-size="12">ω</text>
      <text x="25" y="8" font-size="12">i</text>
      <path d="M 30 75 C 55 75, 70 20, 85 20 C 100 20, 115 75, 150 75" fill="none" stroke="#2563eb" stroke-width="2"/>
      <line x1="85" y1="20" x2="85" y2="75" stroke="#94a3b8" stroke-dasharray="2,2"/>
      <text x="80" y="88" font-size="11">ω_0</text>
    </g>
  </svg>
  `;
  await saveDiagram('ac_q5.png', svgQ5);

  // Q10: Circuit with voltmeter across C
  const svgQ10 = `
  <svg width="450" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="60" y1="90" x2="110" y2="90" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Inductor L -->
    <path d="M 110 90 C 110 75, 122 75, 122 90 C 122 75, 134 75, 134 90 C 134 75, 146 75, 146 90 C 146 75, 158 75, 158 90" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <text x="130" y="65" font-size="16" font-weight="bold">L</text>
    
    <line x1="158" y1="90" x2="200" y2="90" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Capacitor C -->
    <line x1="200" y1="75" x2="200" y2="105" stroke="#2563eb" stroke-width="3"/>
    <line x1="208" y1="75" x2="208" y2="105" stroke="#2563eb" stroke-width="3"/>
    <text x="200" y="125" font-size="16" font-weight="bold">C</text>

    <!-- Voltmeter across C -->
    <line x1="185" y1="90" x2="185" y2="50" stroke="#1e293b" stroke-width="2"/>
    <line x1="185" y1="50" x2="223" y2="50" stroke="#1e293b" stroke-width="2"/>
    <circle cx="204" cy="50" r="16" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="198" y="56" font-size="16" font-weight="bold">V</text>
    <line x1="223" y1="50" x2="223" y2="90" stroke="#1e293b" stroke-width="2"/>
    <text x="180" y="25" font-size="14" font-weight="bold" fill="#0284c7">V = 200 volt</text>

    <line x1="208" y1="90" x2="250" y2="90" stroke="#1e293b" stroke-width="2.5"/>
    <!-- Resistor R -->
    <path d="M 250 90 L 255 82 L 265 98 L 275 82 L 285 98 L 295 82 L 300 90" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <text x="260" y="70" font-size="15" font-weight="bold">R = 20 Ω</text>
    <line x1="300" y1="90" x2="380" y2="90" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Bottom connection and Source -->
    <line x1="380" y1="90" x2="380" y2="170" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="380" y1="170" x2="240" y2="170" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="220" cy="170" r="20" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 210 170 Q 215 162 220 170 T 230 170" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="200" y1="170" x2="60" y2="170" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="60" y1="170" x2="60" y2="90" stroke="#1e293b" stroke-width="2.5"/>
    <text x="180" y="210" font-size="15" font-weight="bold">220 V, 50 Hz</text>
  </svg>
  `;
  await saveDiagram('ac_q10.png', svgQ10);

  // Q11: Circuit with 300V across L and C, 100 ohm resistor with V1
  const svgQ11 = `
  <svg width="480" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="80" y1="80" x2="110" y2="80" stroke="#1e293b" stroke-width="2"/>
    <!-- Inductor -->
    <path d="M 110 80 C 110 65, 122 65, 122 80 C 122 65, 134 65, 134 80 C 134 65, 146 65, 146 80 C 146 65, 158 65, 158 80" fill="none" stroke="#1e293b" stroke-width="2"/>
    <!-- Voltmeter across Inductor -->
    <path d="M 105 80 L 105 105 L 122 105" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="134" cy="105" r="12" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="130" y="110" font-size="12" font-weight="bold">V</text>
    <path d="M 146 105 L 163 105 L 163 80" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <text x="115" y="132" font-size="12" font-weight="bold">300 V</text>

    <line x1="158" y1="80" x2="200" y2="80" stroke="#1e293b" stroke-width="2"/>
    <!-- Capacitor -->
    <line x1="200" y1="65" x2="200" y2="95" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="208" y1="65" x2="208" y2="95" stroke="#2563eb" stroke-width="2.5"/>
    <!-- Voltmeter across Capacitor -->
    <path d="M 195 80 L 195 105 L 210 105" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="222" cy="105" r="12" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="218" y="110" font-size="12" font-weight="bold">V</text>
    <path d="M 234 105 L 245 105 L 245 80" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <text x="205" y="132" font-size="12" font-weight="bold">300 V</text>

    <line x1="208" y1="80" x2="260" y2="80" stroke="#1e293b" stroke-width="2"/>
    <!-- Resistor 100 ohm -->
    <path d="M 260 80 L 265 72 L 275 88 L 285 72 L 295 88 L 305 72 L 310 80" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="270" y="62" font-size="13" font-weight="bold">100 Ω</text>
    <!-- Voltmeter V1 across Resistor -->
    <path d="M 255 80 L 255 105 L 273 105" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="285" cy="105" r="12" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="279" y="110" font-size="11" font-weight="bold">V_1</text>
    <path d="M 297 105 L 315 105 L 315 80" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <line x1="310" y1="80" x2="380" y2="80" stroke="#1e293b" stroke-width="2"/>
    <line x1="380" y1="80" x2="380" y2="160" stroke="#1e293b" stroke-width="2"/>
    <line x1="380" y1="160" x2="245" y2="160" stroke="#1e293b" stroke-width="2"/>
    <circle cx="230" cy="160" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <path d="M 223 160 Q 226 154 230 160 T 237 160" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="200" y="195" font-size="14" font-weight="bold">220 V, 50 Hz</text>
    <line x1="215" y1="160" x2="50" y2="160" stroke="#1e293b" stroke-width="2"/>
    <line x1="50" y1="160" x2="50" y2="80" stroke="#1e293b" stroke-width="2"/>
    <!-- Ammeter A on left -->
    <circle cx="50" cy="115" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="45" y="120" font-size="14" font-weight="bold">A</text>
    <line x1="50" y1="80" x2="80" y2="80" stroke="#1e293b" stroke-width="2"/>
  </svg>
  `;
  await saveDiagram('ac_q11.png', svgQ11);

  // Q15: Circuit with voltmeters V1, V2, V3 at resonance
  const svgQ15 = `
  <svg width="450" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- R -->
    <line x1="80" y1="110" x2="110" y2="110" stroke="#1e293b" stroke-width="2"/>
    <path d="M 110 110 L 115 102 L 125 118 L 135 102 L 145 118 L 155 102 L 160 110" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="130" y="130" font-size="15" font-weight="bold">R</text>
    <!-- Voltmeter V1 across R -->
    <path d="M 105 110 L 105 75 L 122 75" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="135" cy="75" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="128" y="80" font-size="12" font-weight="bold">V_1</text>
    <path d="M 148 75 L 165 75 L 165 110" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <line x1="160" y1="110" x2="220" y2="110" stroke="#1e293b" stroke-width="2"/>
    <!-- L -->
    <path d="M 220 110 C 220 98, 230 98, 230 110 C 230 98, 240 98, 240 110 C 240 98, 250 98, 250 110 C 250 98, 260 98, 260 110" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="235" y="130" font-size="15" font-weight="bold">L</text>
    <line x1="260" y1="110" x2="290" y2="110" stroke="#1e293b" stroke-width="2"/>
    <!-- C -->
    <line x1="290" y1="98" x2="290" y2="122" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="298" y1="98" x2="298" y2="122" stroke="#2563eb" stroke-width="2.5"/>
    <text x="290" y="140" font-size="15" font-weight="bold">C</text>
    <line x1="298" y1="110" x2="360" y2="110" stroke="#1e293b" stroke-width="2"/>

    <!-- Voltmeter V2 across L and C -->
    <path d="M 215 110 L 215 75 L 275 75" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="288" cy="75" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="281" y="80" font-size="12" font-weight="bold">V_2</text>
    <path d="M 301 75 L 350 75 L 350 110" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <!-- Voltmeter V3 across entire circuit -->
    <path d="M 80 110 L 80 155 L 217 155" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="230" cy="155" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="223" y="160" font-size="12" font-weight="bold">V_3</text>
    <path d="M 243 155 L 360 155 L 360 110" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <!-- Source -->
    <line x1="80" y1="155" x2="80" y2="185" stroke="#1e293b" stroke-width="2"/>
    <line x1="360" y1="155" x2="360" y2="185" stroke="#1e293b" stroke-width="2"/>
    <line x1="80" y1="185" x2="215" y2="185" stroke="#1e293b" stroke-width="2"/>
    <circle cx="230" cy="185" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <path d="M 223 185 Q 226 180 230 185 T 237 185" fill="none" stroke="#1e293b" stroke-width="2"/>
    <line x1="245" y1="185" x2="360" y2="185" stroke="#1e293b" stroke-width="2"/>
    <text x="145" y="220" font-size="14" font-weight="bold">e = e_0 sin \omega t, \omega = 1/\sqrt{LC}</text>
  </svg>
  `;
  await saveDiagram('ac_q15.png', svgQ15);

  // Q19: Circuit with XL=5, XC=5, R=10, V across R, 40V source
  const svgQ19 = `
  <svg width="450" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="60" y1="60" x2="100" y2="60" stroke="#1e293b" stroke-width="2"/>
    <!-- Inductor XL = 5 ohm -->
    <path d="M 100 60 C 100 45, 112 45, 112 60 C 112 45, 124 45, 124 60 C 124 45, 136 45, 136 60 C 136 45, 148 45, 148 60" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="105" y="40" font-size="13" font-weight="bold">X_L = 5 Ω</text>
    <line x1="148" y1="60" x2="190" y2="60" stroke="#1e293b" stroke-width="2"/>
    <!-- Capacitor XC = 5 ohm -->
    <line x1="190" y1="48" x2="190" y2="72" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="198" y1="48" x2="198" y2="72" stroke="#2563eb" stroke-width="2.5"/>
    <text x="175" y="40" font-size="13" font-weight="bold">X_C = 5 Ω</text>
    <line x1="198" y1="60" x2="245" y2="60" stroke="#1e293b" stroke-width="2"/>
    <!-- Resistor R = 10 ohm -->
    <path d="M 245 60 L 250 52 L 260 68 L 270 52 L 280 68 L 290 52 L 295 60" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="250" y="40" font-size="13" font-weight="bold">R = 10 Ω</text>
    <!-- Voltmeter across R -->
    <path d="M 240 60 L 240 90 L 257 90" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="270" cy="90" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="264" y="95" font-size="13" font-weight="bold">V</text>
    <path d="M 283 90 L 300 90 L 300 60" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <line x1="295" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="2"/>
    <line x1="350" y1="60" x2="350" y2="150" stroke="#1e293b" stroke-width="2"/>
    
    <!-- Source and Ammeter -->
    <line x1="350" y1="150" x2="235" y2="150" stroke="#1e293b" stroke-width="2"/>
    <circle cx="220" cy="150" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <path d="M 213 150 Q 216 145 220 150 T 227 150" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="205" y="185" font-size="14" font-weight="bold">40 V</text>
    <line x1="205" y1="150" x2="120" y2="150" stroke="#1e293b" stroke-width="2"/>
    <circle cx="105" cy="150" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <text x="100" y="155" font-size="14" font-weight="bold">A</text>
    <line x1="90" y1="150" x2="60" y2="150" stroke="#1e293b" stroke-width="2"/>
    <line x1="60" y1="150" x2="60" y2="60" stroke="#1e293b" stroke-width="2"/>
  </svg>
  `;
  await saveDiagram('ac_q19.png', svgQ19);

  // Q25: LCR circuit with C=80uF, L=5H, R=40 ohm, V=200V
  const svgQ25 = `
  <svg width="420" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="50" y1="60" x2="100" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <!-- C = 80uF -->
    <line x1="100" y1="45" x2="100" y2="75" stroke="#2563eb" stroke-width="3"/>
    <line x1="108" y1="45" x2="108" y2="75" stroke="#2563eb" stroke-width="3"/>
    <text x="80" y="95" font-size="14" font-weight="bold">C = 80 μF</text>
    <line x1="108" y1="60" x2="160" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <!-- L = 5H -->
    <path d="M 160 60 C 160 45, 172 45, 172 60 C 172 45, 184 45, 184 60 C 184 45, 196 45, 196 60 C 196 45, 208 45, 208 60" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <text x="170" y="40" font-size="14" font-weight="bold">L = 5 H</text>
    <line x1="208" y1="60" x2="280" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    
    <!-- Right side: R = 40 ohm -->
    <line x1="280" y1="60" x2="280" y2="75" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 280 75 L 273 80 L 287 90 L 273 100 L 287 110 L 273 120 L 280 125" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <text x="295" y="105" font-size="14" font-weight="bold">R = 40 Ω</text>
    <line x1="280" y1="125" x2="280" y2="155" stroke="#1e293b" stroke-width="2.5"/>

    <!-- Bottom: Source V = 200V -->
    <line x1="280" y1="155" x2="180" y2="155" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="165" cy="155" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
    <path d="M 158 155 Q 161 150 165 155 T 172 155" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="150" y1="155" x2="50" y2="155" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="50" y1="155" x2="50" y2="60" stroke="#1e293b" stroke-width="2.5"/>
    <text x="135" y="190" font-size="14" font-weight="bold">V = 200 V</text>
  </svg>
  `;
  await saveDiagram('ac_q25.png', svgQ25);

  // Q32: Circuit with XC=4, XL=4 in series, V across it, R=45, A, 90V source
  const svgQ32 = `
  <svg width="450" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Left branch: XC = 4 and XL = 4 in series -->
    <line x1="100" y1="50" x2="100" y2="75" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="85" y1="75" x2="115" y2="75" stroke="#2563eb" stroke-width="3"/>
    <line x1="85" y1="83" x2="115" y2="83" stroke="#2563eb" stroke-width="3"/>
    <text x="40" y="82" font-size="13" font-weight="bold">X_C = 4 Ω</text>
    <line x1="100" y1="83" x2="100" y2="110" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 100 110 C 85 110, 85 120, 100 120 C 85 120, 85 130, 100 130 C 85 130, 85 140, 100 140 C 85 140, 85 150, 100 150" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="40" y="135" font-size="13" font-weight="bold">X_L = 4 Ω</text>
    <line x1="100" y1="150" x2="100" y2="175" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Voltmeter branch in parallel with (XC+XL) -->
    <line x1="100" y1="50" x2="200" y2="50" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="200" y1="50" x2="200" y2="95" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="200" cy="112" r="17" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <text x="194" y="118" font-size="16" font-weight="bold">V</text>
    <line x1="200" y1="129" x2="200" y2="175" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="100" y1="175" x2="200" y2="175" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Right loop: Resistor R = 45 ohm and Source 90V and Ammeter -->
    <line x1="200" y1="50" x2="250" y2="50" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="265" cy="50" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <text x="260" y="55" font-size="14" font-weight="bold">A</text>
    <line x1="280" y1="50" x2="330" y2="50" stroke="#1e293b" stroke-width="2.2"/>
    
    <line x1="330" y1="50" x2="330" y2="97" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="330" cy="112" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 324 112 Q 327 107 330 112 T 336 112" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="350" y="118" font-size="14" font-weight="bold">90 V</text>
    <line x1="330" y1="127" x2="330" y2="175" stroke="#1e293b" stroke-width="2.2"/>
    
    <line x1="330" y1="175" x2="275" y2="175" stroke="#1e293b" stroke-width="2.2"/>
    <!-- Resistor R = 45 ohm -->
    <path d="M 275 175 L 270 167 L 260 183 L 250 167 L 240 183 L 230 167 L 225 175" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="235" y="200" font-size="13" font-weight="bold">R = 45 Ω</text>
    <line x1="225" y1="175" x2="200" y2="175" stroke="#1e293b" stroke-width="2.2"/>
  </svg>
  `;
  await saveDiagram('ac_q32.png', svgQ32);

  // Q34: AC generator with capacitor C and 4 candidate I-f graphs
  const svgQ34 = `
  <svg width="480" height="300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Circuit diagram -->
    <g transform="translate(140, 10)">
      <line x1="30" y1="20" x2="70" y2="20" stroke="#1e293b" stroke-width="2"/>
      <line x1="70" y1="10" x2="70" y2="30" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="76" y1="10" x2="76" y2="30" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="76" y1="20" x2="130" y2="20" stroke="#1e293b" stroke-width="2"/>
      <circle cx="140" cy="20" r="10" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
      <text x="136" y="24" font-size="10" font-weight="bold">A</text>
      <line x1="150" y1="20" x2="170" y2="20" stroke="#1e293b" stroke-width="2"/>
      <line x1="170" y1="20" x2="170" y2="60" stroke="#1e293b" stroke-width="2"/>
      <line x1="170" y1="60" x2="115" y2="60" stroke="#1e293b" stroke-width="2"/>
      <circle cx="100" cy="60" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
      <path d="M 94 60 Q 97 55 100 60 T 106 60" fill="none" stroke="#1e293b" stroke-width="2"/>
      <line x1="86" y1="60" x2="30" y2="60" stroke="#1e293b" stroke-width="2"/>
      <line x1="30" y1="60" x2="30" y2="20" stroke="#1e293b" stroke-width="2"/>
      <text x="65" y="80" font-size="11" font-weight="bold">A.C. generator</text>
    </g>

    <!-- 4 Graphs -->
    <!-- (1) Concave down -->
    <g transform="translate(40, 110)">
      <text x="0" y="15" font-size="14" font-weight="bold">(1)</text>
      <line x1="30" y1="70" x2="150" y2="70" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="70" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="155" y="73" font-size="11">ω</text><text x="25" y="8" font-size="11">I</text>
      <path d="M 30 70 Q 70 20 140 20" fill="none" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- (2) Straight line through origin (Correct) -->
    <g transform="translate(260, 110)">
      <text x="0" y="15" font-size="14" font-weight="bold" fill="#16a34a">(2)</text>
      <line x1="30" y1="70" x2="150" y2="70" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="70" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="155" y="73" font-size="11">ω</text><text x="25" y="8" font-size="11">I</text>
      <line x1="30" y1="70" x2="140" y2="15" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- (3) Hyperbola -->
    <g transform="translate(40, 205)">
      <text x="0" y="15" font-size="14" font-weight="bold">(3)</text>
      <line x1="30" y1="70" x2="150" y2="70" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="70" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="155" y="73" font-size="11">ω</text><text x="25" y="8" font-size="11">I</text>
      <path d="M 35 15 Q 50 65 140 68" fill="none" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- (4) Decreasing line -->
    <g transform="translate(260, 205)">
      <text x="0" y="15" font-size="14" font-weight="bold">(4)</text>
      <line x1="30" y1="70" x2="150" y2="70" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="30" y1="70" x2="30" y2="10" stroke="#1e293b" stroke-width="1.8"/>
      <text x="155" y="73" font-size="11">ω</text><text x="25" y="8" font-size="11">I</text>
      <line x1="30" y1="15" x2="140" y2="70" stroke="#2563eb" stroke-width="2"/>
    </g>
  </svg>
  `;
  await saveDiagram('ac_q34.png', svgQ34);

  // Q38: R=40, XC=60, XL=20, E=80\sqrt{2} sin(314t)
  const svgQ38 = `
  <svg width="450" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="50" y1="60" x2="90" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- R = 40 ohm -->
    <path d="M 90 60 L 95 52 L 105 68 L 115 52 L 125 68 L 135 52 L 140 60" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="100" y="42" font-size="13" font-weight="bold">40 Ω</text>
    <line x1="140" y1="60" x2="180" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- XC = 60 ohm -->
    <line x1="180" y1="46" x2="180" y2="74" stroke="#2563eb" stroke-width="2.8"/>
    <line x1="188" y1="46" x2="188" y2="74" stroke="#2563eb" stroke-width="2.8"/>
    <text x="165" y="42" font-size="13" font-weight="bold">X_C = 60 Ω</text>
    <line x1="188" y1="60" x2="235" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- XL = 20 ohm -->
    <path d="M 235 60 C 235 48, 245 48, 245 60 C 245 48, 255 48, 255 60 C 255 48, 265 48, 265 60 C 265 48, 275 48, 275 60" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="245" y="42" font-size="13" font-weight="bold">X_L = 20 Ω</text>
    <line x1="275" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Bottom: Source -->
    <line x1="350" y1="60" x2="350" y2="150" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="350" y1="150" x2="215" y2="150" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="200" cy="150" r="16" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 193 150 Q 196 144 200 150 T 207 150" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="185" y1="150" x2="50" y2="150" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="50" y1="150" x2="50" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <text x="125" y="190" font-size="15" font-weight="bold">E = 80√2 sin(314t) volt</text>
  </svg>
  `;
  await saveDiagram('ac_q38.png', svgQ38);

  // Q39: L=0.8H, R, V=100sin(50t)
  const svgQ39 = `
  <svg width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="60" y1="60" x2="110" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- L = 0.8H -->
    <path d="M 110 60 C 110 46, 122 46, 122 60 C 122 46, 134 46, 134 60 C 134 46, 146 46, 146 60 C 146 46, 158 46, 158 60" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="120" y="40" font-size="14" font-weight="bold">L = 0.8 H</text>
    <line x1="158" y1="60" x2="220" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- R -->
    <path d="M 220 60 L 225 52 L 235 68 L 245 52 L 255 68 L 265 52 L 270 60" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="240" y="40" font-size="14" font-weight="bold">R</text>
    <line x1="270" y1="60" x2="340" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    
    <!-- Source -->
    <line x1="340" y1="60" x2="340" y2="140" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="340" y1="140" x2="215" y2="140" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="200" cy="140" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 193 140 Q 196 135 200 140 T 207 140" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="185" y1="140" x2="60" y2="140" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="60" y1="140" x2="60" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <text x="120" y="175" font-size="14" font-weight="bold">V = 100 sin 50t</text>
  </svg>
  `;
  await saveDiagram('ac_q39.png', svgQ39);

  // Q40: Impedance Z vs f curves
  const svgQ40 = `
  <svg width="460" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- (1) Inverted V -->
    <g transform="translate(30, 10)">
      <text x="0" y="15" font-size="13" font-weight="bold">(1)</text>
      <line x1="25" y1="75" x2="95" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="25" y1="75" x2="25" y2="15" stroke="#1e293b" stroke-width="1.8"/>
      <text x="100" y="78" font-size="11">f</text><text x="18" y="12" font-size="11">Z</text>
      <path d="M 30 70 L 60 25 L 90 70" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="55" y="88" font-size="10">f_r</text>
    </g>

    <!-- (2) Sharp V downwards -->
    <g transform="translate(140, 10)">
      <text x="0" y="15" font-size="13" font-weight="bold">(2)</text>
      <line x1="25" y1="75" x2="95" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="25" y1="75" x2="25" y2="15" stroke="#1e293b" stroke-width="1.8"/>
      <text x="100" y="78" font-size="11">f</text><text x="18" y="12" font-size="11">Z</text>
      <path d="M 30 25 L 60 70 L 90 25" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="55" y="88" font-size="10">f_r</text>
    </g>

    <!-- (3) Smooth U-shaped (Correct) -->
    <g transform="translate(250, 10)">
      <text x="0" y="15" font-size="13" font-weight="bold" fill="#16a34a">(3)</text>
      <line x1="25" y1="75" x2="95" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="25" y1="75" x2="25" y2="15" stroke="#1e293b" stroke-width="1.8"/>
      <text x="100" y="78" font-size="11">f</text><text x="18" y="12" font-size="11">Z</text>
      <path d="M 30 25 Q 60 85 90 25" fill="none" stroke="#2563eb" stroke-width="2.2"/>
      <text x="55" y="88" font-size="10">f_r</text>
    </g>

    <!-- (4) Smooth inverted U -->
    <g transform="translate(360, 10)">
      <text x="0" y="15" font-size="13" font-weight="bold">(4)</text>
      <line x1="25" y1="75" x2="95" y2="75" stroke="#1e293b" stroke-width="1.8"/>
      <line x1="25" y1="75" x2="25" y2="15" stroke="#1e293b" stroke-width="1.8"/>
      <text x="100" y="78" font-size="11">f</text><text x="18" y="12" font-size="11">Z</text>
      <path d="M 30 70 Q 60 15 90 70" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="55" y="88" font-size="10">f_r</text>
    </g>
  </svg>
  `;
  await saveDiagram('ac_q40.png', svgQ40);

  // Q43: Full wave rectifier sine curve half cycle
  const svgQ43 = `
  <svg width="380" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr43" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="40" y1="140" x2="340" y2="140" stroke="#1e293b" stroke-width="2" marker-end="url(#arr43)"/>
    <line x1="60" y1="160" x2="60" y2="30" stroke="#1e293b" stroke-width="2" marker-end="url(#arr43)"/>
    <text x="345" y="145" font-size="14" font-weight="bold">t</text>
    <text x="45" y="25" font-size="14" font-weight="bold">i</text>
    <text x="55" y="155" font-size="13">0</text>
    
    <!-- Half cycles: 0 to T/2, T/2 to T -->
    <path d="M 60 140 Q 115 40 170 140 Q 225 40 280 140" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="160" y="160" font-size="13" font-weight="bold">T/2</text>
    <text x="275" y="160" font-size="13" font-weight="bold">T</text>
    <line x1="60" y1="65" x2="115" y2="65" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="42" y="70" font-size="13" font-weight="bold">i_0</text>
    <text x="135" y="50" font-size="13" fill="#64748b">sine curve</text>
  </svg>
  `;
  await saveDiagram('ac_q43.png', svgQ43);

  // Q51: Resonant circuit diagram
  const svgQ51 = `
  <svg width="420" height="190" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="60" y1="60" x2="110" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- L -->
    <path d="M 110 60 C 110 46, 122 46, 122 60 C 122 46, 134 46, 134 60 C 134 46, 146 46, 146 60 C 146 46, 158 46, 158 60" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="130" y="80" font-size="14" font-weight="bold">L</text>
    <line x1="158" y1="60" x2="200" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- C -->
    <line x1="200" y1="46" x2="200" y2="74" stroke="#2563eb" stroke-width="2.8"/>
    <line x1="208" y1="46" x2="208" y2="74" stroke="#2563eb" stroke-width="2.8"/>
    <text x="200" y="90" font-size="14" font-weight="bold">C</text>
    <line x1="208" y1="60" x2="250" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    <!-- R -->
    <path d="M 250 60 L 255 52 L 265 68 L 275 52 L 285 68 L 295 52 L 300 60" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="270" y="80" font-size="14" font-weight="bold">R</text>
    <line x1="300" y1="60" x2="350" y2="60" stroke="#1e293b" stroke-width="2.2"/>
    
    <!-- Source -->
    <line x1="350" y1="60" x2="350" y2="135" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="350" y1="135" x2="220" y2="135" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="205" cy="135" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 198 135 Q 201 130 205 135 T 212 135" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="190" y1="135" x2="60" y2="135" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="60" y1="135" x2="60" y2="60" stroke="#1e293b" stroke-width="2.2"/>
  </svg>
  `;
  await saveDiagram('ac_q51.png', svgQ51);

  // Q53: Voltmeter across XL
  const svgQ53 = `
  <svg width="450" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="50" y1="70" x2="80" y2="70" stroke="#1e293b" stroke-width="2"/>
    <!-- Resistor 10 ohm -->
    <path d="M 80 70 L 85 62 L 95 78 L 105 62 L 115 78 L 125 62 L 130 70" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="90" y="52" font-size="13" font-weight="bold">10 Ω</text>
    <line x1="130" y1="70" x2="165" y2="70" stroke="#1e293b" stroke-width="2"/>
    <!-- Capacitor XC = 50 ohm -->
    <line x1="165" y1="56" x2="165" y2="84" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="173" y1="56" x2="173" y2="84" stroke="#2563eb" stroke-width="2.5"/>
    <text x="145" y="105" font-size="13" font-weight="bold">X_C = 50 Ω</text>
    <line x1="173" y1="70" x2="225" y2="70" stroke="#1e293b" stroke-width="2"/>
    <!-- Inductor XL = 50 ohm -->
    <path d="M 225 70 C 225 56, 237 56, 237 70 C 237 56, 249 56, 249 70 C 249 56, 261 56, 261 70 C 261 56, 273 56, 273 70" fill="none" stroke="#1e293b" stroke-width="2"/>
    <text x="235" y="105" font-size="13" font-weight="bold">X_L = 50 Ω</text>
    
    <!-- Voltmeter across XL -->
    <path d="M 220 70 L 220 40 L 240 40" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="253" cy="40" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="247" y="45" font-size="13" font-weight="bold">V</text>
    <path d="M 266 40 L 285 40 L 285 70" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <line x1="273" y1="70" x2="340" y2="70" stroke="#1e293b" stroke-width="2"/>
    <line x1="340" y1="70" x2="340" y2="150" stroke="#1e293b" stroke-width="2"/>
    <line x1="340" y1="150" x2="210" y2="150" stroke="#1e293b" stroke-width="2"/>
    <circle cx="195" cy="150" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <path d="M 188 150 Q 191 145 195 150 T 202 150" fill="none" stroke="#1e293b" stroke-width="2"/>
    <line x1="180" y1="150" x2="50" y2="150" stroke="#1e293b" stroke-width="2"/>
    <line x1="50" y1="150" x2="50" y2="70" stroke="#1e293b" stroke-width="2"/>
    <text x="125" y="185" font-size="14" font-weight="bold">V = 100√2 sin \omega t</text>
  </svg>
  `;
  await saveDiagram('ac_q53.png', svgQ53);

  // Q54: Power factor circuit R(2V), L(6V), C(4V)
  const svgQ54 = `
  <svg width="440" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr54" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="50" y1="70" x2="100" y2="70" stroke="#1e293b" stroke-width="2.2" marker-end="url(#arr54)"/>
    <text x="65" y="60" font-size="14" font-weight="bold">I</text>
    <line x1="100" y1="70" x2="120" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- R (2V) -->
    <path d="M 120 70 L 125 62 L 135 78 L 145 62 L 155 78 L 165 62 L 170 70" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="140" y="52" font-size="14" font-weight="bold">R</text>
    <text x="135" y="92" font-size="13" font-weight="bold" fill="#0284c7">2V</text>
    <line x1="170" y1="70" x2="210" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- L (6V) -->
    <path d="M 210 70 C 210 56, 222 56, 222 70 C 222 56, 234 56, 234 70 C 234 56, 246 56, 246 70" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="225" y="52" font-size="14" font-weight="bold">L</text>
    <text x="220" y="92" font-size="13" font-weight="bold" fill="#0284c7">6V</text>
    <line x1="246" y1="70" x2="285" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- C (4V) -->
    <line x1="285" y1="56" x2="285" y2="84" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="293" y1="56" x2="293" y2="84" stroke="#2563eb" stroke-width="2.5"/>
    <text x="285" y="52" font-size="14" font-weight="bold">C</text>
    <text x="282" y="100" font-size="13" font-weight="bold" fill="#0284c7">4V</text>
    <line x1="293" y1="70" x2="350" y2="70" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Bottom: Source -->
    <line x1="350" y1="70" x2="350" y2="140" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="350" y1="140" x2="215" y2="140" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="200" cy="140" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 193 140 Q 196 135 200 140 T 207 140" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="185" y1="140" x2="50" y2="140" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="50" y1="140" x2="50" y2="70" stroke="#1e293b" stroke-width="2.2"/>
  </svg>
  `;
  await saveDiagram('ac_q54.png', svgQ54);

  // Q55: Triangular AC waveform
  const svgQ55 = `
  <svg width="380" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr55" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="40" y1="110" x2="340" y2="110" stroke="#1e293b" stroke-width="2" marker-end="url(#arr55)"/>
    <line x1="70" y1="180" x2="70" y2="25" stroke="#1e293b" stroke-width="2" marker-end="url(#arr55)"/>
    <text x="345" y="115" font-size="14" font-weight="bold">t</text>
    <text x="50" y="20" font-size="14" font-weight="bold">i</text>
    
    <!-- Triangular wave: 0 to T/4 peak I0, T/4 to T/2 zero, T/2 to 3T/4 -I0, 3T/4 to T zero -->
    <path d="M 70 110 L 120 40 L 170 110 L 220 180 L 270 110" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="70" y1="40" x2="120" y2="40" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="120" y1="40" x2="120" y2="110" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="45" y="45" font-size="13" font-weight="bold">I_0</text>
    <text x="160" y="125" font-size="13" font-weight="bold">T/2</text>
    <text x="265" y="125" font-size="13" font-weight="bold">T</text>
  </svg>
  `;
  await saveDiagram('ac_q55.png', svgQ55);

  // Q56: RC Phasor diagrams
  const svgQ56 = `
  <svg width="450" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr56" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- (1) I leading V by pi/2 -->
    <g transform="translate(30, 10)">
      <text x="0" y="20" font-size="14" font-weight="bold">(1)</text>
      <line x1="20" y1="70" x2="140" y2="70" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="10" x2="80" y2="110" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="70" x2="130" y2="30" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="135" y="28" font-size="12" font-weight="bold">V</text>
      <line x1="80" y1="70" x2="40" y2="20" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="30" y="18" font-size="12" font-weight="bold">I</text>
      <text x="100" y="65" font-size="11">ωt</text>
      <text x="75" y="35" font-size="11">π/2</text>
    </g>

    <!-- (2) I leading V by acute angle (Correct) -->
    <g transform="translate(250, 10)">
      <text x="0" y="20" font-size="14" font-weight="bold" fill="#16a34a">(2)</text>
      <line x1="20" y1="70" x2="140" y2="70" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="10" x2="80" y2="110" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="70" x2="135" y2="35" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="140" y="35" font-size="12" font-weight="bold">V</text>
      <line x1="80" y1="70" x2="110" y2="15" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="110" y="10" font-size="12" font-weight="bold">I</text>
      <text x="105" y="65" font-size="11">ωt</text>
    </g>

    <!-- (3) I lagging V -->
    <g transform="translate(30, 130)">
      <text x="0" y="20" font-size="14" font-weight="bold">(3)</text>
      <line x1="20" y1="70" x2="140" y2="70" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="10" x2="80" y2="110" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="70" x2="130" y2="30" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="135" y="28" font-size="12" font-weight="bold">V</text>
      <line x1="80" y1="70" x2="125" y2="105" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="130" y="115" font-size="12" font-weight="bold">I</text>
      <text x="100" y="65" font-size="11">ωt</text>
    </g>

    <!-- (4) In-phase -->
    <g transform="translate(250, 130)">
      <text x="0" y="20" font-size="14" font-weight="bold">(4)</text>
      <line x1="20" y1="70" x2="140" y2="70" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="10" x2="80" y2="110" stroke="#cbd5e1" stroke-dasharray="2,2"/>
      <line x1="80" y1="70" x2="130" y2="30" stroke="#1e293b" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="135" y="28" font-size="12" font-weight="bold">V</text>
      <line x1="80" y1="70" x2="115" y2="42" stroke="#2563eb" stroke-width="2" marker-end="url(#arr56)"/>
      <text x="120" y="45" font-size="12" font-weight="bold" fill="#2563eb">I</text>
      <text x="100" y="65" font-size="11">ωt</text>
    </g>
  </svg>
  `;
  await saveDiagram('ac_q56.png', svgQ56);

  // Q63: Current resonance curve with w1, w2 at 0.707 I0
  const svgQ63 = `
  <svg width="420" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr63" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="50" y1="180" x2="380" y2="180" stroke="#1e293b" stroke-width="2" marker-end="url(#arr63)"/>
    <line x1="70" y1="190" x2="70" y2="25" stroke="#1e293b" stroke-width="2" marker-end="url(#arr63)"/>
    <text x="385" y="185" font-size="14" font-weight="bold">ω</text>
    <text x="50" y="20" font-size="14" font-weight="bold">i</text>
    <text x="55" y="195" font-size="13">0</text>
    
    <!-- Resonance curve -->
    <path d="M 70 180 C 130 180, 170 50, 210 50 C 250 50, 290 180, 350 180" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="70" y1="50" x2="210" y2="50" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="50" y="55" font-size="13" font-weight="bold">i_0</text>

    <!-- 0.707 i_0 line -->
    <line x1="70" y1="88" x2="265" y2="88" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="15" y="93" font-size="13" font-weight="bold">0.707 i_0</text>

    <line x1="165" y1="88" x2="165" y2="180" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="158" y="200" font-size="14" font-weight="bold">ω_1</text>
    <line x1="255" y1="88" x2="255" y2="180" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="248" y="200" font-size="14" font-weight="bold">ω_2</text>
  </svg>
  `;
  await saveDiagram('ac_q63.png', svgQ63);

  // Q64: Circuit with C=100uF, L=1H, R=20 ohm, V across L & C
  const svgQ64 = `
  <svg width="450" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="50" y1="70" x2="90" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- 20 ohm -->
    <path d="M 90 70 L 95 62 L 105 78 L 115 62 L 125 78 L 135 62 L 140 70" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="100" y="52" font-size="14" font-weight="bold">20 Ω</text>
    <line x1="140" y1="70" x2="180" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- C = 100uF -->
    <line x1="180" y1="56" x2="180" y2="84" stroke="#2563eb" stroke-width="2.8"/>
    <line x1="188" y1="56" x2="188" y2="84" stroke="#2563eb" stroke-width="2.8"/>
    <text x="160" y="45" font-size="13" font-weight="bold">C = 100 μF</text>
    <line x1="188" y1="70" x2="230" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- L = 1H -->
    <path d="M 230 70 C 230 56, 242 56, 242 70 C 242 56, 254 56, 254 70 C 254 56, 266 56, 266 70" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="240" y="45" font-size="13" font-weight="bold">L = 1 H</text>
    <line x1="266" y1="70" x2="330" y2="70" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Voltmeter across C and L -->
    <path d="M 160 70 L 160 110 L 225 110" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="238" cy="110" r="14" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="232" y="115" font-size="14" font-weight="bold">V</text>
    <path d="M 251 110 L 310 110 L 310 70" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <!-- Bottom: Source -->
    <line x1="330" y1="70" x2="330" y2="155" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="330" y1="155" x2="215" y2="155" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="200" cy="155" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 193 155 Q 196 150 200 155 T 207 155" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="185" y1="155" x2="50" y2="155" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="50" y1="155" x2="50" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <text x="135" y="190" font-size="14" font-weight="bold">V = 200√2 sin 100t</text>
  </svg>
  `;
  await saveDiagram('ac_q64.png', svgQ64);

  // Q67: Phasor diagram with 30 degree angle
  const svgQ67 = `
  <svg width="340" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr67" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="40" y1="160" x2="280" y2="160" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr67)"/>
    <text x="290" y="165" font-size="18" font-weight="bold">e</text>
    
    <!-- Vector i at 30 deg -->
    <line x1="80" y1="160" x2="220" y2="60" stroke="#2563eb" stroke-width="3" marker-end="url(#arr67)"/>
    <text x="225" y="55" font-size="18" font-weight="bold" fill="#2563eb">i</text>
    
    <!-- Angle arc -->
    <path d="M 130 160 A 50 50 0 0 0 123 130" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <text x="138" y="145" font-size="15" font-weight="bold">30°</text>
  </svg>
  `;
  await saveDiagram('ac_q67.png', svgQ67);

  // Q75: Symmetrical square wave
  const svgQ75 = `
  <svg width="420" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr75" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="40" y1="105" x2="380" y2="105" stroke="#1e293b" stroke-width="2" marker-end="url(#arr75)"/>
    <line x1="70" y1="185" x2="70" y2="25" stroke="#1e293b" stroke-width="2" marker-end="url(#arr75)"/>
    <text x="385" y="110" font-size="14" font-weight="bold">t</text>
    <text x="50" y="22" font-size="14" font-weight="bold">v</text>
    <text x="55" y="120" font-size="13">0</text>
    
    <!-- Square wave: +10 from 70 to 140, -10 from 140 to 210, +10 from 210 to 280, -10 from 280 to 350 -->
    <path d="M 70 50 L 140 50 L 140 160 L 210 160 L 210 50 L 280 50 L 280 160 L 350 160" fill="none" stroke="#2563eb" stroke-width="2.8"/>
    <line x1="45" y1="50" x2="70" y2="50" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="35" y="55" font-size="14" font-weight="bold">+10</text>
    <line x1="45" y1="160" x2="140" y2="160" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="35" y="165" font-size="14" font-weight="bold">-10</text>
  </svg>
  `;
  await saveDiagram('ac_q75.png', svgQ75);

  // Q81: Curves I (R), II (XC), III (XL) vs w
  const svgQ81 = `
  <svg width="380" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr81" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <line x1="50" y1="180" x2="340" y2="180" stroke="#1e293b" stroke-width="2" marker-end="url(#arr81)"/>
    <line x1="50" y1="180" x2="50" y2="25" stroke="#1e293b" stroke-width="2" marker-end="url(#arr81)"/>
    <text x="345" y="185" font-size="14" font-weight="bold">ω</text>
    <text x="35" y="25" font-size="14" font-weight="bold">y</text>
    
    <!-- Curve (I): horizontal line R -->
    <line x1="50" y1="60" x2="300" y2="60" stroke="#059669" stroke-width="2.5"/>
    <text x="310" y="65" font-size="14" font-weight="bold" fill="#059669">(I)</text>
    
    <!-- Curve (II): hyperbola XC -->
    <path d="M 55 75 Q 85 160 300 175" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="270" y="165" font-size="14" font-weight="bold" fill="#2563eb">(II)</text>

    <!-- Curve (III): straight line XL -->
    <line x1="50" y1="180" x2="280" y2="70" stroke="#dc2626" stroke-width="2.5"/>
    <text x="285" y="80" font-size="14" font-weight="bold" fill="#dc2626">(III)</text>
  </svg>
  `;
  await saveDiagram('ac_q81.png', svgQ81);

  // Q83: Junction of i1, i2 and i3
  const svgQ83 = `
  <svg width="340" height="180" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arr83" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Wire 1 -> junction (170, 70) -->
    <line x1="50" y1="70" x2="170" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="90" y1="70" x2="120" y2="70" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr83)"/>
    <text x="95" y="55" font-size="15" font-weight="bold">i_1</text>
    
    <!-- Wire 2 -> junction -->
    <line x1="290" y1="70" x2="170" y2="70" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="250" y1="70" x2="220" y2="70" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr83)"/>
    <text x="230" y="55" font-size="15" font-weight="bold">i_2</text>

    <!-- Wire 3 leaving downwards -->
    <circle cx="170" cy="70" r="4" fill="#1e293b"/>
    <line x1="170" y1="70" x2="170" y2="150" stroke="#1e293b" stroke-width="2.5"/>
    <line x1="170" y1="100" x2="170" y2="130" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr83)"/>
    <text x="185" y="125" font-size="15" font-weight="bold">i_3</text>
  </svg>
  `;
  await saveDiagram('ac_q83.png', svgQ83);

  // Q84: Box Z connected to AC source
  const svgQ84 = `
  <svg width="360" height="180" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="70" y1="50" x2="140" y2="50" stroke="#1e293b" stroke-width="2.2"/>
    <rect x="140" y="30" width="80" height="40" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <text x="172" y="57" font-size="20" font-weight="bold" fill="#1e293b">Z</text>
    <line x1="220" y1="50" x2="290" y2="50" stroke="#1e293b" stroke-width="2.2"/>
    
    <line x1="290" y1="50" x2="290" y2="130" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="290" y1="130" x2="195" y2="130" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="180" cy="130" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <path d="M 173 130 Q 176 125 180 130 T 187 130" fill="none" stroke="#1e293b" stroke-width="2"/>
    <line x1="165" y1="130" x2="70" y2="130" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="70" y1="130" x2="70" y2="50" stroke="#1e293b" stroke-width="2.2"/>
  </svg>
  `;
  await saveDiagram('ac_q84.png', svgQ84);

  // Q85: Transformer core with DC battery across primary and load across secondary
  const svgQ85 = `
  <svg width="450" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <!-- Core -->
    <rect x="170" y="40" width="110" height="130" fill="#f1f5f9" stroke="#334155" stroke-width="3" rx="4"/>
    <rect x="200" y="65" width="50" height="80" fill="#ffffff" stroke="#334155" stroke-width="2"/>
    
    <!-- Primary coil (N1) -->
    <line x1="90" y1="65" x2="170" y2="65" stroke="#1e293b" stroke-width="2"/>
    <path d="M 170 65 Q 160 75 170 85 Q 160 95 170 105 Q 160 115 170 125 Q 160 135 170 145" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="170" y1="145" x2="90" y2="145" stroke="#1e293b" stroke-width="2"/>
    <text x="180" y="60" font-size="14" font-weight="bold">N_1</text>
    
    <!-- DC Battery 10V -->
    <line x1="90" y1="65" x2="90" y2="95" stroke="#1e293b" stroke-width="2"/>
    <line x1="75" y1="95" x2="105" y2="95" stroke="#1e293b" stroke-width="3"/>
    <line x1="82" y1="105" x2="98" y2="105" stroke="#1e293b" stroke-width="2"/>
    <line x1="90" y1="105" x2="90" y2="145" stroke="#1e293b" stroke-width="2"/>
    <text x="35" y="105" font-size="14" font-weight="bold">10 V</text>

    <!-- Secondary coil (N2) -->
    <line x1="280" y1="65" x2="350" y2="65" stroke="#1e293b" stroke-width="2"/>
    <path d="M 280 65 Q 290 73 280 81 Q 290 89 280 97 Q 290 105 280 113 Q 290 121 280 129 Q 290 137 280 145" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="280" y1="145" x2="350" y2="145" stroke="#1e293b" stroke-width="2"/>
    <text x="260" y="60" font-size="14" font-weight="bold">N_2</text>

    <!-- Load 10 kohm -->
    <line x1="350" y1="65" x2="350" y2="90" stroke="#1e293b" stroke-width="2"/>
    <path d="M 350 90 L 343 95 L 357 105 L 343 115 L 357 125 L 350 130" fill="none" stroke="#1e293b" stroke-width="2"/>
    <line x1="350" y1="130" x2="350" y2="145" stroke="#1e293b" stroke-width="2"/>
    <text x="365" y="115" font-size="14" font-weight="bold">10 kΩ</text>
  </svg>
  `;
  await saveDiagram('ac_q85.png', svgQ85);

  // Q93: Voltmeter across XC
  const svgQ93 = `
  <svg width="450" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="60" y1="80" x2="100" y2="80" stroke="#1e293b" stroke-width="2.2"/>
    <!-- XC = 20 ohm -->
    <line x1="100" y1="65" x2="100" y2="95" stroke="#2563eb" stroke-width="2.8"/>
    <line x1="108" y1="65" x2="108" y2="95" stroke="#2563eb" stroke-width="2.8"/>
    <text x="75" y="115" font-size="13" font-weight="bold">X_C = 20 Ω</text>
    
    <!-- Voltmeter across XC -->
    <path d="M 90 80 L 90 50 L 115 50" fill="none" stroke="#1e293b" stroke-width="1.8"/>
    <circle cx="127" cy="50" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="1.8"/>
    <text x="121" y="55" font-size="13" font-weight="bold">V</text>
    <path d="M 140 50 L 165 50 L 165 80" fill="none" stroke="#1e293b" stroke-width="1.8"/>

    <line x1="108" y1="80" x2="165" y2="80" stroke="#1e293b" stroke-width="2.2"/>
    <!-- R = 10 ohm -->
    <path d="M 165 80 L 170 72 L 180 88 L 190 72 L 200 88 L 210 72 L 215 80" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="175" y="115" font-size="13" font-weight="bold">R = 10 Ω</text>
    
    <line x1="215" y1="80" x2="260" y2="80" stroke="#1e293b" stroke-width="2.2"/>
    <!-- XL = 20 ohm -->
    <path d="M 260 80 C 260 66, 272 66, 272 80 C 272 66, 284 66, 284 80 C 284 66, 296 66, 296 80 C 296 66, 308 66, 308 80" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="260" y="55" font-size="13" font-weight="bold">X_L = 20 Ω</text>
    <line x1="308" y1="80" x2="360" y2="80" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Bottom: Source -->
    <line x1="360" y1="80" x2="360" y2="160" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="360" y1="160" x2="225" y2="160" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="210" cy="160" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 203 160 Q 206 155 210 160 T 217 160" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="195" y1="160" x2="60" y2="160" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="60" y1="160" x2="60" y2="80" stroke="#1e293b" stroke-width="2.2"/>
    <text x="145" y="195" font-size="14" font-weight="bold">V = 100√2 sin \omega t</text>
  </svg>
  `;
  await saveDiagram('ac_q93.png', svgQ93);

  // Q98: Circuit with bulb B, R, and inductor L with iron rod
  const svgQ98 = `
  <svg width="450" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <line x1="60" y1="70" x2="100" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- Iron Rod -->
    <rect x="95" y="42" width="105" height="8" fill="#94a3b8" stroke="#475569" stroke-width="1.5" rx="2"/>
    <text x="110" y="35" font-size="13" font-weight="bold" fill="#334155">Iron Rod</text>
    <!-- Inductor L -->
    <path d="M 100 70 C 100 56, 112 56, 112 70 C 112 56, 124 56, 124 70 C 124 56, 136 56, 136 70 C 136 56, 148 56, 148 70 C 148 56, 160 56, 160 70 C 160 56, 172 56, 172 70 C 172 56, 184 56, 184 70" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="140" y="90" font-size="14" font-weight="bold">L</text>
    
    <line x1="184" y1="70" x2="250" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    <!-- Bulb B -->
    <circle cx="265" cy="55" r="14" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
    <path d="M 258 55 Q 265 45 272 55" fill="none" stroke="#d97706" stroke-width="2"/>
    <text x="260" y="85" font-size="14" font-weight="bold">B</text>
    <line x1="279" y1="70" x2="330" y2="70" stroke="#1e293b" stroke-width="2.2"/>
    
    <!-- Resistor R on right -->
    <line x1="330" y1="70" x2="330" y2="90" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 330 90 L 322 95 L 338 105 L 322 115 L 338 125 L 330 130" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <text x="345" y="115" font-size="14" font-weight="bold">R</text>
    <line x1="330" y1="130" x2="330" y2="160" stroke="#1e293b" stroke-width="2.2"/>

    <!-- Bottom: Switch S and AC source -->
    <line x1="330" y1="160" x2="270" y2="160" stroke="#1e293b" stroke-width="2.2"/>
    <!-- Switch S -->
    <circle cx="270" cy="160" r="3" fill="#1e293b"/>
    <line x1="270" y1="160" x2="250" y2="145" stroke="#1e293b" stroke-width="2.2"/>
    <circle cx="245" cy="160" r="3" fill="#1e293b"/>
    <text x="255" y="180" font-size="14" font-weight="bold">S</text>
    <line x1="245" y1="160" x2="175" y2="160" stroke="#1e293b" stroke-width="2.2"/>
    
    <circle cx="160" cy="160" r="15" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
    <path d="M 153 160 Q 156 155 160 160 T 167 160" fill="none" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="145" y1="160" x2="60" y2="160" stroke="#1e293b" stroke-width="2.2"/>
    <line x1="60" y1="160" x2="60" y2="70" stroke="#1e293b" stroke-width="2.2"/>
  </svg>
  `;
  await saveDiagram('ac_q98.png', svgQ98);

  console.log('All 20 AC diagrams generated successfully!');
}

generateAll().catch(console.error);
