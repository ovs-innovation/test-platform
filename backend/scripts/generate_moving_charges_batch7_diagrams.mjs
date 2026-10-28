import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const backendDir = 'c:/Users/rs004/OneDrive/Desktop/test-platform/backend/uploads/moving_charges';
const frontendDir = 'c:/Users/rs004/OneDrive/Desktop/test-platform/frontend/public/uploads/moving_charges';

[backendDir, frontendDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const diagrams = {
  // Q103: Three long parallel wires A, B, C carrying 1A, 2A, 3A
  'moving_charges_q103_three_parallel_wires.png': `
    <svg width="360" height="260" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Wire A (1A) -->
      <line x1="80" y1="30" x2="80" y2="220" stroke="#0284c7" stroke-width="2.5" />
      <polygon points="80,95 76,108 84,108" fill="#0284c7" />
      <circle cx="80" cy="115" r="3" fill="#0284c7" />
      <text x="50" y="120" font-size="14" font-weight="bold" fill="#0284c7">1 A</text>
      <text x="75" y="240" font-size="16" font-weight="bold" fill="#0f172a">A</text>

      <!-- Wire B (2A) -->
      <line x1="180" y1="30" x2="180" y2="220" stroke="#0284c7" stroke-width="3" />
      <polygon points="180,95 175,108 185,108" fill="#0284c7" />
      <circle cx="180" cy="115" r="3" fill="#0284c7" />
      <text x="150" y="120" font-size="14" font-weight="bold" fill="#0284c7">2 A</text>
      <text x="175" y="240" font-size="16" font-weight="bold" fill="#0f172a">B</text>

      <!-- Wire C (3A) -->
      <line x1="280" y1="30" x2="280" y2="220" stroke="#0284c7" stroke-width="3.5" />
      <polygon points="280,95 275,108 285,108" fill="#0284c7" />
      <circle cx="280" cy="115" r="3" fill="#0284c7" />
      <text x="290" y="120" font-size="14" font-weight="bold" fill="#0284c7">3 A</text>
      <text x="275" y="240" font-size="16" font-weight="bold" fill="#0f172a">C</text>

      <!-- Distance indicators -->
      <line x1="80" y1="200" x2="180" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="180" y1="200" x2="280" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="125" y="195" font-size="13" font-style="italic" fill="#64748b">d</text>
      <text x="225" y="195" font-size="13" font-style="italic" fill="#64748b">d</text>
    </svg>
  `,

  // Q107: Circular loop of radius r connected with straight tangential wires AB and CD
  'moving_charges_q107_circular_loop_tangents.png': `
    <svg width="380" height="260" viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Circular loop centered at (220, 130), radius 70 -->
      <circle cx="220" cy="130" r="70" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <circle cx="220" cy="130" r="4" fill="#0f172a" />
      <text x="200" y="135" font-size="15" font-weight="bold" fill="#0f172a">O</text>

      <!-- Radius r -->
      <line x1="220" y1="130" x2="270" y2="80" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3" />
      <text x="240" y="100" font-size="14" font-style="italic" font-weight="bold" fill="#475569">r</text>

      <!-- Wire AB at bottom tangent (y = 200) -->
      <line x1="60" y1="200" x2="160" y2="200" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
      <line x1="160" y1="200" x2="220" y2="200" stroke="#0284c7" stroke-width="2.5" />
      <polygon points="175,200 165,195 165,205" fill="#0284c7" />
      <text x="165" y="220" font-size="14" font-style="italic" fill="#0284c7">i</text>
      <text x="50" y="205" font-size="15" font-weight="bold" fill="#0f172a">A</text>
      <text x="215" y="225" font-size="15" font-weight="bold" fill="#0f172a">B</text>

      <!-- Wire CD at top tangent (y = 60) -->
      <line x1="220" y1="60" x2="300" y2="60" stroke="#0284c7" stroke-width="2.5" />
      <line x1="300" y1="60" x2="360" y2="60" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
      <polygon points="270,60 260,55 260,65" fill="#0284c7" />
      <text x="260" y="50" font-size="14" font-style="italic" fill="#0284c7">i</text>
      <text x="215" y="50" font-size="15" font-weight="bold" fill="#0f172a">C</text>
      <text x="365" y="65" font-size="15" font-weight="bold" fill="#0f172a">D</text>
    </svg>
  `,

  // Q108: Figure-8 double circular loop with radii 2a and a
  'moving_charges_q108_figure_eight_loops.png': `
    <svg width="360" height="240" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Loop 1: Radius 2a = 60, centered at (130, 120) -->
      <circle cx="130" cy="120" r="60" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <!-- Radius indicator 2a -->
      <line x1="70" y1="120" x2="130" y2="120" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <circle cx="130" cy="120" r="3" fill="#64748b" />
      <text x="90" y="115" font-size="14" font-weight="bold" fill="#0f172a">2a</text>
      <!-- Current arrows (counter-clockwise) -->
      <polygon points="135,180 125,175 125,185" fill="#0284c7" />
      <polygon points="125,60 135,55 135,65" fill="#0284c7" />

      <!-- Loop 2: Radius a = 30, centered at (220, 120), touches at x = 190 -->
      <circle cx="220" cy="120" r="30" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <!-- Radius indicator a -->
      <line x1="220" y1="120" x2="250" y2="120" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <circle cx="220" cy="120" r="3" fill="#64748b" />
      <text x="230" y="115" font-size="14" font-weight="bold" fill="#0f172a">a</text>
      <!-- Current arrows (clockwise) -->
      <polygon points="215,150 225,145 225,155" fill="#0284c7" />
      <polygon points="225,90 215,85 215,95" fill="#0284c7" />
    </svg>
  `,

  // Q109: Right-angled triangle loop 3m x 4m with 2A current
  'moving_charges_q109_triangular_loop.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Right Triangle: Vertices at (100, 50), (100, 200), (260, 200) -->
      <polygon points="100,50 100,200 260,200" fill="none" stroke="#0284c7" stroke-width="3" />

      <!-- Right angle marker at (100, 200) -->
      <polyline points="100,185 115,185 115,200" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="120" y="195" font-size="12" font-weight="bold" fill="#0f172a">90°</text>

      <!-- Side 3m (vertical leg) -->
      <polygon points="100,130 95,120 105,120" fill="#0284c7" />
      <text x="65" y="130" font-size="15" font-weight="bold" fill="#0f172a">3 m</text>

      <!-- Side 4m (horizontal leg) -->
      <polygon points="185,200 175,195 175,205" fill="#0284c7" />
      <text x="175" y="225" font-size="15" font-weight="bold" fill="#0f172a">4 m</text>

      <!-- Hypotenuse with current 2A -->
      <polygon points="175,120 185,125 180,115" fill="#0284c7" />
      <text x="195" y="125" font-size="15" font-weight="bold" fill="#0284c7">2 A</text>
    </svg>
  `,

  // Q113: Concentric coplanar paths with electron (r=2m, T=1s) and proton (r=1m, T=2s)
  'moving_charges_q113_concentric_coplanar_charges.png': `
    <svg width="360" height="280" viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Center O -->
      <circle cx="180" cy="140" r="4" fill="#0f172a" />
      <text x="165" y="145" font-size="16" font-weight="bold" fill="#0f172a">O</text>

      <!-- Inner Circle (r = 1m = 45px) -->
      <circle cx="180" cy="140" r="45" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,3" />
      <circle cx="180" cy="95" r="7" fill="#ef4444" />
      <text x="172" y="99" font-size="12" font-weight="bold" fill="#ffffff">+e</text>
      <!-- Motion arrow -->
      <polygon points="195,95 185,91 185,99" fill="#ef4444" />
      <text x="185" y="130" font-size="13" font-weight="bold" fill="#0f172a">1m</text>

      <!-- Outer Circle (r = 2m = 90px) -->
      <circle cx="180" cy="140" r="90" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <circle cx="180" cy="50" r="7" fill="#3b82f6" />
      <text x="174" y="54" font-size="12" font-weight="bold" fill="#ffffff">-e</text>
      <!-- Motion arrow -->
      <polygon points="195,50 185,46 185,54" fill="#3b82f6" />
      <text x="185" y="210" font-size="13" font-weight="bold" fill="#0f172a">2m</text>
    </svg>
  `
};

async function generate() {
  console.log('Generating Batch 7 diagrams...');
  for (const [filename, svg] of Object.entries(diagrams)) {
    const buffer = Buffer.from(svg.trim());
    const bPath = path.join(backendDir, filename);
    const fPath = path.join(frontendDir, filename);
    await sharp(buffer).png().toFile(bPath);
    await sharp(buffer).png().toFile(fPath);
    console.log(`✓ Saved: ${filename}`);
  }
}

generate().catch(console.error);
