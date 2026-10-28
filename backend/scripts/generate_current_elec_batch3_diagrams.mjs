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

// 1. Q70: Circuit with 30 Ohm square, 15 Ohm series, and (3V, 5 Ohm) battery
async function generateQ70() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="340" viewBox="0 0 500 340">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Square Nodes: A=(150, 140), top-right=(280, 80), bottom-right=(280, 200), bottom-left=(150, 200), top-left=(150, 80) -->
    <!-- Wires connecting square -->
    <path d="M 150 80 L 150 200" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 280 80 L 280 200" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Top Resistor 30 Ohm -->
    <path d="M 150 80 L 185 80 L 192 70 L 206 90 L 220 70 L 234 90 L 241 80 L 280 80" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="215" y="60" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">30 Ω</text>

    <!-- Bottom Resistor 30 Ohm -->
    <path d="M 150 200 L 185 200 L 192 190 L 206 210 L 220 190 L 234 210 L 241 200 L 280 200" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="215" y="230" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">30 Ω</text>

    <!-- Diagonal Resistor 30 Ohm from bottom-left (150, 200) to top-right (280, 80) -->
    <!-- dx=130, dy=-120, mid=(215, 140) -->
    <g transform="translate(150, 200) rotate(-42.7)">
      <path d="M 0 0 L 55 0 L 62 -10 L 76 10 L 90 -10 L 104 10 L 111 0 L 177 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="88" y="-18" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">30 Ω</text>
    </g>

    <!-- Terminals A and B -->
    <circle cx="150" cy="140" r="5" fill="#0f172a" />
    <text x="132" y="145" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">A</text>

    <circle cx="280" cy="140" r="5" fill="#0f172a" />
    <text x="295" y="145" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">B</text>

    <!-- Series 15 Ohm resistor on right -->
    <path d="M 280 140 L 320 140 L 327 130 L 341 150 L 355 130 L 369 150 L 376 140 L 410 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="350" y="120" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">15 Ω</text>

    <!-- Outer loop to battery -->
    <path d="M 150 140 L 90 140 L 90 280 L 210 280" stroke="#1e293b" stroke-width="2.5" fill="none" />
    
    <!-- Battery (3V, 5 Ohm) -->
    <line x1="210" y1="262" x2="210" y2="298" stroke="#1e293b" stroke-width="3.5" />
    <line x1="222" y1="270" x2="222" y2="290" stroke="#1e293b" stroke-width="5" />
    <text x="216" y="320" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">(3 V, 5 Ω)</text>

    <path d="M 222 280 L 410 280 L 410 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
  </svg>`;
  await saveSvgAsPng('current_elec_q70_circuit.png', svg);
}

// 2. Q71: 3n cells loop with 2n aiding and n reversed
async function generateQ71() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="260" viewBox="0 0 600 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Outer connecting wire loop -->
    <path d="M 60 130 L 60 200 L 540 200 L 540 130" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Cell A (forward): battery + internal resistance r -->
    <path d="M 60 130 L 90 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="90" y1="114" x2="90" y2="146" stroke="#1e293b" stroke-width="3" />
    <line x1="98" y1="121" x2="98" y2="139" stroke="#1e293b" stroke-width="4.5" />
    <path d="M 98 130 L 120 130 L 125 122 L 135 138 L 145 122 L 155 138 L 160 130 L 180 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="94" y="105" font-family="system-ui, sans-serif" font-weight="bold" font-size="12" fill="#0f172a" text-anchor="middle">e</text>
    <text x="140" y="155" font-family="system-ui, sans-serif" font-weight="bold" font-size="12" fill="#0f172a" text-anchor="middle">r</text>

    <!-- Terminal A bracket across Cell A -->
    <path d="M 60 120 L 60 90 L 180 90 L 180 120" stroke="#2563eb" stroke-width="2" fill="none" />
    <text x="120" y="80" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">A (Terminal Voltage)</text>

    <!-- Cell 2 (forward) -->
    <path d="M 180 130 L 210 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="210" y1="114" x2="210" y2="146" stroke="#1e293b" stroke-width="3" />
    <line x1="218" y1="121" x2="218" y2="139" stroke="#1e293b" stroke-width="4.5" />
    <path d="M 218 130 L 235 130 L 240 122 L 250 138 L 260 122 L 270 138 L 275 130 L 290 130" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Ellipsis for 2n cells -->
    <text x="315" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="18" fill="#1e293b" text-anchor="middle">• • •</text>

    <!-- Last forward cell -->
    <path d="M 340 130 L 365 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="365" y1="114" x2="365" y2="146" stroke="#1e293b" stroke-width="3" />
    <line x1="373" y1="121" x2="373" y2="139" stroke="#1e293b" stroke-width="4.5" />
    <path d="M 373 130 L 395 130" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Reversed cells (polarity reversed: short plate first, then long plate) -->
    <line x1="410" y1="121" x2="410" y2="139" stroke="#1e293b" stroke-width="4.5" />
    <line x1="418" y1="114" x2="418" y2="146" stroke="#1e293b" stroke-width="3" />
    <path d="M 395 130 L 410 130 M 418 130 L 435 130 L 440 122 L 450 138 L 460 122 L 470 138 L 475 130 L 490 130" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <text x="505" y="135" font-family="system-ui, sans-serif" font-weight="bold" font-size="18" fill="#1e293b" text-anchor="middle">• • •</text>
    <path d="M 520 130 L 540 130" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Group brackets -->
    <path d="M 60 55 L 60 45 L 390 45 L 390 55" stroke="#64748b" stroke-width="1.8" fill="none" />
    <text x="225" y="35" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2n cells (Forward)</text>

    <path d="M 395 55 L 395 45 L 540 45 L 540 55" stroke="#64748b" stroke-width="1.8" fill="none" />
    <text x="468" y="35" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">n cells (Reversed)</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q71_cells_loop.png', svg);
}

// 3. Q72: 13-resistors symmetrical mesh
async function generateQ72() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="340" viewBox="0 0 500 340">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Nodes: A=(100, 170), B=(400, 170), Top-center=(250, 70), Bottom-center=(250, 270) -->
    <!-- Top-left corner=(100, 70), Bottom-left corner=(100, 270) -->
    <!-- Top-right corner=(400, 70), Bottom-right corner=(400, 270) -->

    <!-- Terminals lead wires -->
    <path d="M 40 170 L 100 170" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 400 170 L 460 170" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <circle cx="100" cy="170" r="5" fill="#0f172a" />
    <text x="80" y="175" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">A</text>
    <circle cx="400" cy="170" r="5" fill="#0f172a" />
    <text x="420" y="175" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">B</text>

    <!-- Outer Resistors -->
    <!-- Top-left horizontal -->
    <path d="M 100 70 L 150 70 L 157 62 L 169 78 L 181 62 L 193 78 L 200 70 L 250 70" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="175" y="52" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Top-right horizontal -->
    <path d="M 250 70 L 300 70 L 307 62 L 319 78 L 331 62 L 343 78 L 350 70 L 400 70" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="325" y="52" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Bottom-left horizontal -->
    <path d="M 100 270 L 150 270 L 157 262 L 169 278 L 181 262 L 193 278 L 200 270 L 250 270" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="175" y="295" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Bottom-right horizontal -->
    <path d="M 250 270 L 300 270 L 307 262 L 319 278 L 331 262 L 343 278 L 350 270 L 400 270" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="325" y="295" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Outer Vertical Resistors -->
    <!-- Left-top vertical -->
    <path d="M 100 70 L 100 100 L 92 107 L 108 119 L 92 131 L 108 143 L 100 150 L 100 170" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="80" y="125" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Left-bottom vertical -->
    <path d="M 100 170 L 100 200 L 92 207 L 108 219 L 92 231 L 108 243 L 100 250 L 100 270" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="80" y="225" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Right-top vertical -->
    <path d="M 400 70 L 400 100 L 392 107 L 408 119 L 392 131 L 408 143 L 400 150 L 400 170" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="420" y="125" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Right-bottom vertical -->
    <path d="M 400 170 L 400 200 L 392 207 L 408 219 L 392 231 L 408 243 L 400 250 L 400 270" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="420" y="225" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Center vertical resistor -->
    <path d="M 250 70 L 250 140 L 242 147 L 258 159 L 242 171 L 258 183 L 250 190 L 250 270" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="268" y="175" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>

    <!-- Diagonal Resistors -->
    <!-- A to top-center -->
    <g transform="translate(100, 170) rotate(-33.7)">
      <path d="M 0 0 L 60 0 L 67 -8 L 79 8 L 91 -8 L 103 8 L 110 0 L 180 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="85" y="-14" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- A to bottom-center -->
    <g transform="translate(100, 170) rotate(33.7)">
      <path d="M 0 0 L 60 0 L 67 -8 L 79 8 L 91 -8 L 103 8 L 110 0 L 180 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="85" y="20" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- top-center to B -->
    <g transform="translate(250, 70) rotate(33.7)">
      <path d="M 0 0 L 60 0 L 67 -8 L 79 8 L 91 -8 L 103 8 L 110 0 L 180 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="85" y="-14" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>
    </g>

    <!-- bottom-center to B -->
    <g transform="translate(250, 270) rotate(-33.7)">
      <path d="M 0 0 L 60 0 L 67 -8 L 79 8 L 91 -8 L 103 8 L 110 0 L 180 0" stroke="#1e293b" stroke-width="2.5" fill="none" />
      <text x="85" y="20" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">R</text>
    </g>
  </svg>`;
  await saveSvgAsPng('current_elec_q72_thirteen_resistors.png', svg);
}

// 4. Q73: Two parallel batteries with voltmeter
async function generateQ73() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="460" height="280" viewBox="0 0 460 280">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Connecting vertical busbars -->
    <path d="M 90 60 L 90 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 370 60 L 370 220" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- Upper branch: (18V, 2 Ohm) at y=130 -->
    <path d="M 90 130 L 170 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="170" y1="112" x2="170" y2="148" stroke="#1e293b" stroke-width="3.5" />
    <line x1="180" y1="120" x2="180" y2="140" stroke="#1e293b" stroke-width="5" />
    <text x="175" y="102" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">18 V</text>
    <path d="M 180 130 L 240 130 L 247 122 L 259 138 L 271 122 L 283 138 L 290 130 L 370 130" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="265" y="112" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2 Ω</text>

    <!-- Lower branch: (12V, 1 Ohm) at y=220 -->
    <path d="M 90 220 L 170 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="170" y1="202" x2="170" y2="238" stroke="#1e293b" stroke-width="3.5" />
    <line x1="180" y1="210" x2="180" y2="230" stroke="#1e293b" stroke-width="5" />
    <text x="175" y="192" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">12 V</text>
    <path d="M 180 220 L 240 220 L 247 212 L 259 228 L 271 212 L 283 228 L 290 220 L 370 220" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="265" y="202" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">1 Ω</text>

    <!-- Voltmeter branch at y=60 -->
    <path d="M 90 60 L 210 60" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 250 60 L 370 60" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <circle cx="230" cy="60" r="18" fill="#ffffff" stroke="#2563eb" stroke-width="2.5" />
    <text x="230" y="66" font-family="system-ui, sans-serif" font-weight="bold" font-size="18" fill="#2563eb" text-anchor="middle">V</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q73_parallel_batteries.png', svg);
}

// 5. Q75: Meter connections 4 options
async function generateQ75() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Option (1) -->
    <text x="35" y="70" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a">(1)</text>
    <!-- Loop: Battery on left, two series resistors with V across them, A in series on right -->
    <line x1="80" y1="50" x2="80" y2="72" stroke="#1e293b" stroke-width="3" />
    <line x1="80" y1="78" x2="80" y2="92" stroke="#1e293b" stroke-width="5" />
    <path d="M 80 50 L 160 50 L 165 44 L 175 56 L 185 44 L 195 56 L 200 50 L 250 50 L 255 44 L 265 56 L 275 44 L 285 56 L 290 50 L 460 50 L 460 62" stroke="#1e293b" stroke-width="2" fill="none" />
    <!-- Voltmeter across resistors -->
    <path d="M 150 50 L 150 25 L 210 25" stroke="#1e293b" stroke-width="2" fill="none" />
    <path d="M 240 25 L 300 25 L 300 50" stroke="#1e293b" stroke-width="2" fill="none" />
    <circle cx="225" cy="25" r="14" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="225" y="30" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">V</text>
    <!-- Ammeter on right wire -->
    <circle cx="460" cy="76" r="14" fill="#ffffff" stroke="#dc2626" stroke-width="2" />
    <text x="460" y="81" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">A</text>
    <path d="M 460 90 L 460 110 L 80 110 L 80 92" stroke="#1e293b" stroke-width="2" fill="none" />

    <!-- Option (2) -->
    <text x="35" y="195" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a">(2)</text>
    <line x1="80" y1="175" x2="80" y2="197" stroke="#1e293b" stroke-width="3" />
    <line x1="80" y1="203" x2="80" y2="217" stroke="#1e293b" stroke-width="5" />
    <path d="M 80 175 L 160 175 L 165 169 L 175 181 L 185 169 L 195 181 L 200 175 L 250 175 L 255 169 L 265 181 L 275 169 L 285 181 L 290 175 L 460 175 L 460 187" stroke="#1e293b" stroke-width="2" fill="none" />
    <!-- Ammeter in parallel across right resistor -->
    <path d="M 240 175 L 240 150 L 260 150" stroke="#1e293b" stroke-width="2" fill="none" />
    <path d="M 288 150 L 300 150 L 300 175" stroke="#1e293b" stroke-width="2" fill="none" />
    <circle cx="274" cy="150" r="14" fill="#ffffff" stroke="#dc2626" stroke-width="2" />
    <text x="274" y="155" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">A</text>
    <!-- Voltmeter in series on right wire -->
    <circle cx="460" cy="201" r="14" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="460" y="206" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">V</text>
    <path d="M 460 215 L 460 235 L 80 235 L 80 217" stroke="#1e293b" stroke-width="2" fill="none" />

    <!-- Option (3) -->
    <text x="35" y="325" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a">(3)</text>
    <line x1="80" y1="305" x2="80" y2="327" stroke="#1e293b" stroke-width="3" />
    <line x1="80" y1="333" x2="80" y2="347" stroke="#1e293b" stroke-width="5" />
    <path d="M 80 305 L 140 305" stroke="#1e293b" stroke-width="2" fill="none" />
    <circle cx="155" cy="305" r="14" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="155" y="310" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">V</text>
    <path d="M 170 305 L 460 305 L 460 317" stroke="#1e293b" stroke-width="2" fill="none" />
    <!-- Parallel vertical resistors -->
    <path d="M 280 305 L 280 325 L 274 330 L 286 340 L 274 350 L 286 360 L 280 365 L 280 385" stroke="#1e293b" stroke-width="2" fill="none" />
    <path d="M 360 305 L 360 325 L 354 330 L 366 340 L 354 350 L 366 360 L 360 365 L 360 385" stroke="#1e293b" stroke-width="2" fill="none" />
    <circle cx="460" cy="331" r="14" fill="#ffffff" stroke="#dc2626" stroke-width="2" />
    <text x="460" y="336" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">A</text>
    <path d="M 460 345 L 460 385 L 80 385 L 80 347" stroke="#1e293b" stroke-width="2" fill="none" />

    <!-- Option (4) -->
    <text x="35" y="455" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a">(4)</text>
    <line x1="80" y1="435" x2="80" y2="457" stroke="#1e293b" stroke-width="3" />
    <line x1="80" y1="463" x2="80" y2="477" stroke="#1e293b" stroke-width="5" />
    <path d="M 80 435 L 140 435" stroke="#1e293b" stroke-width="2" fill="none" />
    <circle cx="155" cy="435" r="14" fill="#ffffff" stroke="#dc2626" stroke-width="2" />
    <text x="155" y="440" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#dc2626" text-anchor="middle">A</text>
    <path d="M 170 435 L 270 435" stroke="#1e293b" stroke-width="2" fill="none" />
    <circle cx="285" cy="435" r="14" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
    <text x="285" y="440" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#2563eb" text-anchor="middle">V</text>
    <path d="M 300 435 L 460 435 L 460 500 L 80 500 L 80 477" stroke="#1e293b" stroke-width="2" fill="none" />
    <path d="M 220 435 L 220 455 L 214 460 L 226 470 L 214 480 L 226 490 L 220 495 L 220 500" stroke="#1e293b" stroke-width="2" fill="none" />
    <path d="M 400 435 L 400 455 L 394 460 L 406 470 L 394 480 L 406 490 L 400 495 L 400 500" stroke="#1e293b" stroke-width="2" fill="none" />
  </svg>`;
  await saveSvgAsPng('current_elec_q75_meter_connections.png', svg);
}

// 6. Q78: Ladder resistor network
async function generateQ78() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="560" height="260" viewBox="0 0 560 260">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Terminal A -->
    <circle cx="70" cy="90" r="5" fill="#0f172a" />
    <text x="50" y="95" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">A</text>

    <!-- Terminal B -->
    <circle cx="70" cy="190" r="5" fill="#0f172a" />
    <text x="50" y="195" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">B</text>

    <!-- Bottom return wire -->
    <path d="M 70 190 L 490 190" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- First series resistor R -->
    <path d="M 70 90 L 105 90 L 112 82 L 124 98 L 136 82 L 148 98 L 155 90 L 180 90" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="130" y="72" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">R</text>

    <!-- First vertical shunt 2R -->
    <path d="M 180 90 L 180 115 L 172 122 L 188 134 L 172 146 L 188 158 L 180 165 L 180 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="156" y="145" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2R</text>

    <!-- Second series resistor 2R -->
    <path d="M 180 90 L 215 90 L 222 82 L 234 98 L 246 82 L 258 98 L 265 90 L 290 90" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="240" y="72" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2R</text>

    <!-- Second vertical shunt 4R -->
    <path d="M 290 90 L 290 115 L 282 122 L 298 134 L 282 146 L 298 158 L 290 165 L 290 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="266" y="145" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4R</text>

    <!-- Third series resistor 4R -->
    <path d="M 290 90 L 325 90 L 332 82 L 344 98 L 356 82 L 368 98 L 375 90 L 400 90" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="350" y="72" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4R</text>

    <!-- Third vertical shunt 4R -->
    <path d="M 400 90 L 400 115 L 392 122 L 408 134 L 392 146 L 408 158 L 400 165 L 400 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="376" y="145" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4R</text>

    <!-- Terminating resistor 4R -->
    <path d="M 400 90 L 425 90 L 432 82 L 444 98 L 456 82 L 468 98 L 475 90 L 490 90 L 490 190" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="450" y="72" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4R</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q78_ladder_network.png', svg);
}

// 7. Q79: Power consumption circuit with 14V battery, 12 Ohm series, 6 Ohm || 3 Ohm
async function generateQ79() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Left loop from battery to 12 Ohm -->
    <path d="M 80 230 L 80 140 L 130 140 L 137 132 L 149 148 L 161 132 L 173 148 L 180 140 L 240 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="155" y="122" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">12 Ω</text>

    <!-- Parallel split at x=240 -->
    <path d="M 240 140 L 240 80 L 290 80 L 297 72 L 309 88 L 321 72 L 333 88 L 340 80 L 400 80 L 400 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="315" y="62" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">6 Ω</text>

    <path d="M 240 140 L 290 140 L 297 132 L 309 148 L 321 132 L 333 148 L 340 140 L 400 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="315" y="165" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">3 Ω</text>

    <!-- Right loop return to battery -->
    <path d="M 400 140 L 400 230 L 270 230" stroke="#1e293b" stroke-width="2.5" fill="none" />

    <!-- 14 V Battery -->
    <line x1="210" y1="212" x2="210" y2="248" stroke="#1e293b" stroke-width="3.5" />
    <line x1="220" y1="220" x2="220" y2="240" stroke="#1e293b" stroke-width="5" />
    <text x="215" y="270" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">14 V</text>
    <path d="M 80 230 L 210 230" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 220 230 L 400 230" stroke="#1e293b" stroke-width="2.5" fill="none" />
  </svg>`;
  await saveSvgAsPng('current_elec_q79_resistor_circuit.png', svg);
}

// 8. Q82: Max power circuit: 8V, 1 Ohm in series with two parallel 4V, 2 Ohm branches across load R
async function generateQ82() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="320" viewBox="0 0 500 320">
    <rect width="100%" height="100%" fill="#ffffff" />
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Left branch: 8V battery and 1 Ohm resistor at y=100 -->
    <path d="M 80 240 L 80 100 L 110 100" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="110" y1="82" x2="110" y2="118" stroke="#1e293b" stroke-width="3.5" />
    <line x1="120" y1="90" x2="120" y2="110" stroke="#1e293b" stroke-width="5" />
    <text x="115" y="72" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">8 V</text>
    <path d="M 120 100 L 150 100 L 157 92 L 169 108 L 181 92 L 193 108 L 200 100 L 230 100" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="175" y="80" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">1 Ω</text>

    <!-- Parallel branches split at x=230 -->
    <!-- Upper branch: 4V, 2 Ohm at y=60 -->
    <path d="M 230 100 L 230 60 L 260 60" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="260" y1="44" x2="260" y2="76" stroke="#1e293b" stroke-width="3.5" />
    <line x1="270" y1="52" x2="270" y2="68" stroke="#1e293b" stroke-width="5" />
    <text x="265" y="34" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4 V</text>
    <path d="M 270 60 L 300 60 L 307 52 L 319 68 L 331 52 L 343 68 L 350 60 L 390 60 L 390 100" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="325" y="42" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2 Ω</text>

    <!-- Lower branch: 4V, 2 Ohm at y=140 -->
    <path d="M 230 100 L 230 140 L 260 140" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <line x1="260" y1="124" x2="260" y2="156" stroke="#1e293b" stroke-width="3.5" />
    <line x1="270" y1="132" x2="270" y2="148" stroke="#1e293b" stroke-width="5" />
    <text x="265" y="114" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">4 V</text>
    <path d="M 270 140 L 300 140 L 307 132 L 319 148 L 331 132 L 343 148 L 350 140 L 390 140 L 390 100" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="325" y="165" font-family="system-ui, sans-serif" font-weight="bold" font-size="14" fill="#0f172a" text-anchor="middle">2 Ω</text>

    <!-- Right loop to load resistor R at y=240 -->
    <path d="M 390 100 L 420 100 L 420 240 L 285 240" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <path d="M 285 240 L 278 232 L 266 248 L 254 232 L 242 248 L 235 240 L 80 240" stroke="#1e293b" stroke-width="2.5" fill="none" />
    <text x="260" y="270" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#0f172a" text-anchor="middle">R (Load Resistor)</text>
  </svg>`;
  await saveSvgAsPng('current_elec_q82_max_power_circuit.png', svg);
}

async function run() {
  console.log('Generating Batch 3 SVG-to-PNG Diagrams...');
  await generateQ70();
  await generateQ71();
  await generateQ72();
  await generateQ73();
  await generateQ75();
  await generateQ78();
  await generateQ79();
  await generateQ82();
  console.log('🎉 Batch 3 Diagrams Generated Successfully!');
}

run().catch(console.error);
