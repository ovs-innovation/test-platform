import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKEND_DIR = path.resolve(__dirname, '../uploads/current_electricity');
const FRONTEND_DIR = path.resolve(__dirname, '../../frontend/public/uploads/current_electricity');

[BACKEND_DIR, FRONTEND_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function saveSvgAsPng(filename, svgString) {
  const buf = Buffer.from(svgString);
  const backendPath = path.join(BACKEND_DIR, filename);
  const frontendPath = path.join(FRONTEND_DIR, filename);

  await sharp(buf).png({ quality: 95 }).toFile(backendPath);
  fs.copyFileSync(backendPath, frontendPath);
  console.log(`Saved: ${filename}`);
}

// 1. Q84: Circuit with battery epsilon, series R1, parallel R2 and C
async function generateQ84() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="280" viewBox="0 0 460 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Left battery loop -->
    <path d="M 80 220 L 80 160" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="80" y1="140" x2="80" y2="175" stroke="#1e293b" stroke-width="3.5" />
    <line x1="80" y1="182" x2="80" y2="202" stroke="#1e293b" stroke-width="5" />
    <text x="60" y="175" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">ε</text>
    <path d="M 80 140 L 80 80 L 150 80" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Series resistor R1 on top -->
    <path d="M 150 80 L 170 80 L 177 72 L 189 88 L 201 72 L 213 88 L 220 80 L 250 80" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="195" y="62" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R₁</text>

    <!-- Junction at x=250 -->
    <path d="M 250 80 L 370 80" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Branch R2 at x=250 -->
    <path d="M 250 80 L 250 120 L 242 127 L 258 139 L 242 151 L 258 163 L 250 170 L 250 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="275" y="145" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R₂</text>

    <!-- Branch Capacitor C at x=370 -->
    <path d="M 370 80 L 370 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="352" y1="140" x2="388" y2="140" stroke="#1e293b" stroke-width="3.5" />
    <line x1="352" y1="152" x2="388" y2="152" stroke="#1e293b" stroke-width="3.5" />
    <path d="M 370 152 L 370 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="405" y="150" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">C</text>

    <!-- Bottom return wire -->
    <path d="M 80 220 L 370 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
  </svg>`;
  await saveSvgAsPng('current_elec_q84_capacitor_circuit.png', svg);
}

// 2. Q87: Bridge network between A and B
async function generateQ87() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="280" viewBox="0 0 460 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Terminal A -->
    <circle cx="60" cy="90" r="5" fill="#0f172a" />
    <text x="40" y="95" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">A</text>

    <!-- Split from A -->
    <path d="M 60 90 L 110 90" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <!-- Upper branch: 10 Ohm -->
    <path d="M 110 90 L 140 90 L 147 82 L 159 98 L 171 82 L 183 98 L 190 90 L 250 90" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="165" y="72" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Lower branch from A: 10 Ohm -->
    <path d="M 110 90 L 110 150 L 140 150 L 147 142 L 159 158 L 171 142 L 183 158 L 190 150 L 250 150" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="165" y="172" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Connecting wire from top node x=250 to right corner x=330, y=90 -->
    <path d="M 250 90 L 330 90 L 330 150" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Middle resistor: 10 Ohm between x=250 and x=330 at y=150 -->
    <path d="M 250 150 L 265 150 L 272 142 L 284 158 L 296 142 L 308 158 L 315 150 L 330 150" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="290" y="132" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Vertical wire from top to bottom at x=250 with 5 Ohm resistor -->
    <path d="M 250 90 L 250 150 L 250 165 L 242 172 L 258 184 L 242 196 L 258 208 L 250 215 L 250 230" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="228" y="195" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">5 Ω</text>

    <!-- Bottom resistor: 5 Ohm between x=250 and x=330 at y=230 -->
    <path d="M 250 230 L 265 230 L 272 222 L 284 238 L 296 222 L 308 238 L 315 230 L 330 230" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="290" y="252" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">5 Ω</text>

    <!-- Vertical 10 Ohm resistor between y=150 and y=230 at x=330 -->
    <path d="M 330 150 L 330 165 L 322 172 L 338 184 L 322 196 L 338 208 L 330 215 L 330 230" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="355" y="195" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Terminal B -->
    <path d="M 330 230 L 380 230" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <circle cx="380" cy="230" r="5" fill="#0f172a" />
    <text x="400" y="235" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">B</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q87_bridge_network.png', svg);
}

// 3. Q88: 3 Resistors and 2 Capacitors
async function generateQ88() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="240" viewBox="0 0 480 240">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Terminal A -->
    <circle cx="60" cy="120" r="5" fill="#0f172a" />
    <text x="40" y="125" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">A</text>

    <!-- Three series resistors R -->
    <!-- Resistor 1: x=60 to x=180 -->
    <path d="M 60 120 L 90 120 L 97 112 L 109 128 L 121 112 L 133 128 L 140 120 L 180 120" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="115" y="142" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Resistor 2: x=180 to x=300 -->
    <path d="M 180 120 L 210 120 L 217 112 L 229 128 L 241 112 L 253 128 L 260 120 L 300 120" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="235" y="142" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Resistor 3: x=300 to x=420 -->
    <path d="M 300 120 L 330 120 L 337 112 L 349 128 L 361 112 L 373 128 L 380 120 L 420 120" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="355" y="142" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Terminal B -->
    <circle cx="420" cy="120" r="5" fill="#0f172a" />
    <text x="440" y="125" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">B</text>

    <!-- Top Capacitor C: connected from node A (x=60) to node between R2 and R3 (x=300) -->
    <path d="M 80 120 L 80 60 L 175 60" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="175" y1="44" x2="175" y2="76" stroke="#1e293b" stroke-width="3.5" />
    <line x1="187" y1="44" x2="187" y2="76" stroke="#1e293b" stroke-width="3.5" />
    <path d="M 187 60 L 300 60 L 300 120" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="181" y="32" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">C</text>

    <!-- Bottom Capacitor C: connected from node between R1 and R2 (x=180) to node B (x=420) -->
    <path d="M 180 120 L 180 180 L 285 180" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="285" y1="164" x2="285" y2="196" stroke="#1e293b" stroke-width="3.5" />
    <line x1="297" y1="164" x2="297" y2="196" stroke="#1e293b" stroke-width="3.5" />
    <path d="M 297 180 L 400 180 L 400 120" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="291" y="215" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">C</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q88_rc_network.png', svg);
}

// 4. Q89: Battery with internal resistance 4 Ohm, series 3 Ohm, parallel R || 2 Ohm
async function generateQ89() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Dashed box for real battery on top -->
    <rect x="180" y="40" width="180" height="60" fill="none" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6,4" rx="4" />
    <!-- Battery inside box -->
    <path d="M 120 70 L 210 70" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="210" y1="52" x2="210" y2="88" stroke="#1e293b" stroke-width="3.5" />
    <line x1="220" y1="60" x2="220" y2="80" stroke="#1e293b" stroke-width="5" />
    <path d="M 220 70 L 250 70 L 257 62 L 269 78 L 281 62 L 293 78 L 300 70 L 360 70" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="275" y="52" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4 Ω</text>

    <!-- Outer loop wire -->
    <path d="M 120 70 L 120 180 L 160 180" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Series 3 Ohm resistor on bottom -->
    <path d="M 160 180 L 180 180 L 187 172 L 199 188 L 211 172 L 223 188 L 230 180 L 270 180" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="205" y="202" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">3 Ω</text>

    <!-- Parallel branches split at x=270 -->
    <!-- Upper branch: R -->
    <path d="M 270 180 L 270 145 L 300 145 L 307 137 L 319 153 L 331 137 L 343 153 L 350 145 L 380 145 L 380 180" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="325" y="128" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Lower branch: 2 Ohm -->
    <path d="M 270 180 L 270 215 L 300 215 L 307 207 L 319 223 L 331 207 L 343 223 L 350 215 L 380 215 L 380 180" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="325" y="238" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2 Ω</text>

    <!-- Return wire from x=380 to top battery at x=360 -->
    <path d="M 380 180 L 410 180 L 410 70 L 360 70" stroke="#1e293b" stroke-width="2.5" fill="none" />
  </svg>`;
  await saveSvgAsPng('current_elec_q89_max_power.png', svg);
}

// 5. Q92: Three-star junction
async function generateQ92() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="280" viewBox="0 0 460 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Center node O -->
    <circle cx="230" cy="140" r="5" fill="#0f172a" />
    <text x="230" y="165" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">O</text>

    <!-- Branch A: horizontal from left x=70 to x=230, y=140 -->
    <circle cx="70" cy="140" r="5" fill="#0f172a" />
    <text x="60" y="130" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">A</text>
    <text x="60" y="160" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">20 V</text>
    <path d="M 70 140 L 110 140 L 117 132 L 129 148 L 141 132 L 153 148 L 160 140 L 230 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="135" y="122" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Branch B: angled up-right to (360, 60) -->
    <circle cx="360" cy="60" r="5" fill="#0f172a" />
    <text x="375" y="55" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">B</text>
    <text x="375" y="75" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">10 V</text>
    <g transform="translate(230, 140) rotate(-31.6)">
      <path d="M 0 0 L 40 0 L 47 -8 L 59 8 L 71 -8 L 83 8 L 90 0 L 152 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="65" y="-14" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>
    </g>

    <!-- Branch C: angled down-right to (360, 220) -->
    <circle cx="360" cy="220" r="5" fill="#0f172a" />
    <text x="375" y="215" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">C</text>
    <text x="375" y="235" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">30 V</text>
    <g transform="translate(230, 140) rotate(31.6)">
      <path d="M 0 0 L 40 0 L 47 -8 L 59 8 L 71 -8 L 83 8 L 90 0 L 152 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="65" y="20" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>
    </g>
  </svg>`;
  await saveSvgAsPng('current_elec_q92_three_star.png', svg);
}

// 6. Q94: Ammeters A1 and A2 between two loops
async function generateQ94() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="280" viewBox="0 0 500 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Left loop -->
    <path d="M 70 190 L 70 145" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="70" y1="125" x2="70" y2="160" stroke="#1e293b" stroke-width="3.5" />
    <line x1="70" y1="167" x2="70" y2="187" stroke="#1e293b" stroke-width="5" />
    <text x="45" y="155" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">15 V</text>
    <path d="M 70 125 L 70 80 L 90 80" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Top-left 20 Ohm -->
    <path d="M 90 80 L 110 80 L 117 72 L 129 88 L 141 72 L 153 88 L 160 80 L 190 80" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="135" y="62" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">20 Ω</text>

    <!-- Bottom-left 5 Ohm -->
    <path d="M 70 190 L 90 190 L 97 182 L 109 198 L 121 182 L 133 198 L 140 190 L 190 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="115" y="212" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">5 Ω</text>

    <!-- Vertical 10 Ohm at x=190 -->
    <path d="M 190 80 L 190 105 L 182 112 L 198 124 L 182 136 L 198 148 L 190 155 L 190 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="165" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Ammeter A1 on top wire between x=190 and x=310 -->
    <path d="M 190 80 L 235 80" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <circle cx="250" cy="80" r="15" fill="#ffffff" stroke="#dc2626" stroke-width="2.5" />
    <text x="250" y="85" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">A₁</text>
    <path d="M 265 80 L 310 80" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Ammeter A2 on bottom wire between x=190 and x=310 -->
    <path d="M 190 190 L 235 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <circle cx="250" cy="190" r="15" fill="#ffffff" stroke="#dc2626" stroke-width="2.5" />
    <text x="250" y="195" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">A₂</text>
    <path d="M 265 190 L 310 190" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Right loop -->
    <!-- Vertical 10V battery at x=310 -->
    <path d="M 310 80 L 310 120" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="298" y1="120" x2="322" y2="120" stroke="#1e293b" stroke-width="3.5" />
    <line x1="303" y1="130" x2="317" y2="130" stroke="#1e293b" stroke-width="5" />
    <path d="M 310 130 L 310 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="340" y="128" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 V</text>

    <!-- Top wire to 5 Ohm on far right -->
    <path d="M 310 80 L 390 80 L 390 105 L 382 112 L 398 124 L 382 136 L 398 148 L 390 155 L 390 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="415" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">5 Ω</text>

    <!-- Bottom-right 10 Ohm -->
    <path d="M 310 190 L 330 190 L 337 182 L 349 198 L 361 182 L 373 198 L 380 190 L 390 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="355" y="212" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q94_ammeters_ratio.png', svg);
}

// 7. Q95: Symmetrical diamond bridge
async function generateQ95() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="260" viewBox="0 0 480 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Terminal a -->
    <circle cx="60" cy="130" r="5" fill="#0f172a" />
    <text x="40" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">a</text>

    <!-- Series resistor from a to diamond: x=60 to x=160 -->
    <path d="M 60 130 L 85 130 L 92 122 L 104 138 L 116 122 L 128 138 L 135 130 L 160 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="110" y="112" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Diamond nodes: Left=(160, 130), Top=(240, 50), Bottom=(240, 210), Right=(320, 130) -->
    <!-- Top-left arm -->
    <g transform="translate(160, 130) rotate(-45)">
      <path d="M 0 0 L 30 0 L 37 -8 L 49 8 L 61 -8 L 73 8 L 80 0 L 113 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="55" y="-14" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- Bottom-left arm -->
    <g transform="translate(160, 130) rotate(45)">
      <path d="M 0 0 L 30 0 L 37 -8 L 49 8 L 61 -8 L 73 8 L 80 0 L 113 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="55" y="20" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- Center vertical arm: (240, 50) to (240, 210) -->
    <path d="M 240 50 L 240 95 L 232 102 L 248 114 L 232 126 L 248 138 L 240 145 L 240 210" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="258" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Top-right arm -->
    <g transform="translate(240, 50) rotate(45)">
      <path d="M 0 0 L 30 0 L 37 -8 L 49 8 L 61 -8 L 73 8 L 80 0 L 113 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="55" y="-14" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- Bottom-right arm -->
    <g transform="translate(240, 210) rotate(-45)">
      <path d="M 0 0 L 30 0 L 37 -8 L 49 8 L 61 -8 L 73 8 L 80 0 L 113 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="55" y="20" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- Series resistor from diamond to b: x=320 to x=420 -->
    <path d="M 320 130 L 345 130 L 352 122 L 364 138 L 376 122 L 388 138 L 395 130 L 420 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="370" y="112" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Terminal b -->
    <circle cx="420" cy="130" r="5" fill="#0f172a" />
    <text x="440" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">b</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q95_diamond_bridge.png', svg);
}

// 8. Q96: Stored energy in capacitor circuit
async function generateQ96() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Left busbar x=100, Right busbar x=360 -->
    <path d="M 100 60 L 100 200" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 360 60 L 360 200" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Top branch: 10 Ohm and 100 uF at y=60 -->
    <path d="M 100 60 L 140 60 L 147 52 L 159 68 L 171 52 L 183 68 L 190 60 L 250 60" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="165" y="42" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>
    <line x1="250" y1="44" x2="250" y2="76" stroke="#1e293b" stroke-width="3.5" />
    <line x1="262" y1="44" x2="262" y2="76" stroke="#1e293b" stroke-width="3.5" />
    <path d="M 262 60 L 360 60" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="256" y="32" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">100 μF</text>

    <!-- Middle branch: 10 Ohm at y=130 -->
    <path d="M 100 130 L 200 130 L 207 122 L 219 138 L 231 122 L 243 138 L 250 130 L 360 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="225" y="112" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>

    <!-- Bottom branch: 10 Ohm and 20V battery at y=200 -->
    <path d="M 100 200 L 140 200 L 147 192 L 159 208 L 171 192 L 183 208 L 190 200 L 260 200" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="165" y="222" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">10 Ω</text>
    <line x1="260" y1="182" x2="260" y2="218" stroke="#1e293b" stroke-width="3.5" />
    <line x1="270" y1="190" x2="270" y2="210" stroke="#1e293b" stroke-width="5" />
    <path d="M 270 200 L 360 200" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="265" y="235" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">20 V</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q96_stored_energy.png', svg);
}

// 9. Q97: Current node network
async function generateQ97() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
      </marker>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Input wire from left carrying 10 A -->
    <path d="M 50 110 L 120 110" stroke="#1e293b" stroke-width="2.5" fill="none" marker-mid="url(#arrow)" />
    <line x1="50" y1="110" x2="100" y2="110" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="75" y="95" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">10 A</text>

    <!-- Top arm carrying 4 A: to (220, 40) then to (320, 110) -->
    <path d="M 120 110 L 150 75 L 156 68 L 168 84 L 180 68 L 192 84 L 198 76 L 220 40" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="165" y="55" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">4 A</text>
    <path d="M 220 40 L 250 65 L 256 58 L 268 74 L 280 58 L 292 74 L 298 66 L 320 110" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Middle arm to (320, 110) -->
    <path d="M 120 110 L 180 110 L 187 102 L 199 118 L 211 102 L 223 118 L 230 110 L 320 110" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Angled arm below middle to (320, 110) -->
    <path d="M 180 160 L 220 140 L 226 133 L 238 149 L 250 133 L 262 149 L 268 142 L 320 110" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="215" y="170" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">3 A</text>

    <!-- Exit wire from node (320, 110) to top-right carrying 3 A -->
    <line x1="320" y1="110" x2="400" y2="70" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="415" y="80" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">3 A</text>

    <!-- Bottom loop leaving as I -->
    <path d="M 120 110 L 120 150 L 140 180 L 146 173 L 158 189 L 170 173 L 182 189 L 188 182 L 230 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 320 110 L 320 150 L 300 180 L 294 173 L 282 189 L 270 173 L 258 189 L 252 182 L 230 220" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Current I leaving at bottom -->
    <line x1="230" y1="220" x2="230" y2="250" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="245" y="245" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#dc2626" text-anchor="middle">I</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q97_current_node.png', svg);
}

async function run() {
  console.log('Generating Batch 4 Diagrams...');
  await generateQ84();
  await generateQ87();
  await generateQ88();
  await generateQ89();
  await generateQ92();
  await generateQ94();
  await generateQ95();
  await generateQ96();
  await generateQ97();
  console.log('🎉 Batch 4 Diagrams Generated Successfully!');
}

run().catch(console.error);
