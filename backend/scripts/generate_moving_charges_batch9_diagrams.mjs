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
  // Q140: Straight conductor AB and rectangular loop PQRS
  'moving_charges_q140_wire_and_rectangular_loop.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Wire AB -->
      <line x1="80" y1="30" x2="80" y2="230" stroke="#0284c7" stroke-width="3" />
      <polygon points="80,105 75,120 85,120" fill="#0284c7" />
      <text x="50" y="120" font-size="15" font-weight="bold" fill="#0284c7">I₁</text>
      <text x="75" y="45" font-size="15" font-weight="bold" fill="#0f172a">B</text>
      <text x="75" y="240" font-size="15" font-weight="bold" fill="#0f172a">A</text>

      <!-- Rectangular loop PQRS -->
      <!-- P(140, 70), Q(260, 70), R(260, 190), S(140, 190) -->
      <polygon points="140,70 260,70 260,190 140,190" fill="none" stroke="#0f172a" stroke-width="2.5" />

      <!-- Vertices -->
      <text x="125" y="65" font-size="15" font-weight="bold" fill="#0f172a">P</text>
      <text x="265" y="65" font-size="15" font-weight="bold" fill="#0f172a">Q</text>
      <text x="265" y="205" font-size="15" font-weight="bold" fill="#0f172a">R</text>
      <text x="125" y="205" font-size="15" font-weight="bold" fill="#0f172a">S</text>

      <!-- Current arrows (counter-clockwise or clockwise?) -->
      <!-- In book: P to Q (right), Q to R (down), R to S (left), S to P (up) -->
      <!-- S to P -->
      <polygon points="140,120 135,135 145,135" fill="#ef4444" />
      <!-- P to Q -->
      <polygon points="210,70 195,65 195,75" fill="#ef4444" />
      <!-- Q to R -->
      <polygon points="260,140 255,125 265,125" fill="#ef4444" />
      <!-- R to S -->
      <polygon points="190,190 205,185 205,195" fill="#ef4444" />
      <text x="150" y="130" font-size="14" font-weight="bold" fill="#ef4444">I₂</text>
    </svg>
  `,

  // Q143: Field slab of width d = mv/(2qB) with charge exiting at angle theta
  'moving_charges_q143_field_width_deflection.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Field Box: x=100 to 220, y=40 to 210, width d = 120 -->
      <rect x="100" y="40" width="120" height="170" fill="none" stroke="#0f172a" stroke-width="2" />

      <!-- Field crosses (into page) -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <path d="M 120 60 L 130 70 M 130 60 L 120 70" />
        <path d="M 155 60 L 165 70 M 165 60 L 155 70" />
        <path d="M 190 60 L 200 70 M 200 60 L 190 70" />
        <path d="M 120 100 L 130 110 M 130 100 L 120 110" />
        <path d="M 155 100 L 165 110 M 165 100 L 155 110" />
        <path d="M 190 100 L 200 110 M 200 100 L 190 110" />
        <path d="M 120 140 L 130 150 M 130 140 L 120 150" />
        <path d="M 155 140 L 165 150 M 165 140 L 155 150" />
        <path d="M 190 140 L 200 150 M 200 140 L 190 150" />
        <path d="M 120 180 L 130 190 M 130 180 L 120 190" />
        <path d="M 155 180 L 165 190 M 165 180 L 155 190" />
        <path d="M 190 180 L 200 190 M 200 180 L 190 190" />
      </g>

      <!-- Incoming charge at (100, 190) horizontally -->
      <circle cx="70" cy="190" r="6" fill="#ef4444" />
      <text x="66" y="194" font-size="11" font-weight="bold" fill="#ffffff">+</text>
      <line x1="76" y1="190" x2="100" y2="190" stroke="#ef4444" stroke-width="2" />
      <polygon points="100,190 90,186 90,194" fill="#ef4444" />
      <text x="85" y="180" font-size="14" font-style="italic" font-weight="bold" fill="#ef4444">v</text>

      <!-- Circular trajectory bending upwards to exit at (220, 80) -->
      <path d="M 100 190 Q 170 190 220 90" fill="none" stroke="#ef4444" stroke-width="2.5" />

      <!-- Exiting particle -->
      <circle cx="220" cy="90" r="5" fill="#ef4444" />
      <!-- Tangent vector -->
      <line x1="220" y1="90" x2="260" y2="50" stroke="#ef4444" stroke-width="2" />
      <polygon points="260,50 250,55 255,60" fill="#ef4444" />
      <text x="260" y="45" font-size="14" font-style="italic" font-weight="bold" fill="#ef4444">v</text>

      <!-- Angle theta with horizontal -->
      <line x1="220" y1="90" x2="280" y2="90" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <path d="M 245 90 A 25 25 0 0 0 240 70" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="250" y="80" font-size="14" font-style="italic" font-weight="bold" fill="#0f172a">θ</text>

      <!-- Width d -->
      <line x1="100" y1="230" x2="220" y2="230" stroke="#0f172a" stroke-width="1.5" />
      <polygon points="100,230 110,226 110,234" fill="#0f172a" />
      <polygon points="220,230 210,226 210,234" fill="#0f172a" />
      <text x="155" y="245" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">d</text>
    </svg>
  `,

  // Q149: Proton beam deflected by B = 10^-2 T near screen at 10 cm
  'moving_charges_q149_proton_beam_screen.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Field Region box: x=70 to 270, y=90 to 200 -->
      <rect x="70" y="90" width="200" height="110" fill="none" stroke="#0f172a" stroke-width="1.5" />

      <!-- Field crosses -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <path d="M 100 110 L 110 120 M 110 110 L 100 120" />
        <path d="M 150 110 L 160 120 M 160 110 L 150 120" />
        <path d="M 230 110 L 240 120 M 240 110 L 230 120" />
        <path d="M 100 160 L 110 170 M 110 160 L 100 170" />
        <path d="M 150 160 L 160 170 M 160 160 L 150 170" />
        <path d="M 230 160 L 240 170 M 240 160 L 230 170" />
      </g>
      <text x="115" y="145" font-size="15" font-weight="bold" fill="#0284c7">B = 10⁻² T</text>

      <!-- Screen at right boundary (y=200, bottom of field) -->
      <text x="210" y="220" font-size="13" font-weight="bold" fill="#475569">Screen</text>
      <!-- Thickness 10 cm -->
      <line x1="280" y1="90" x2="280" y2="200" stroke="#0f172a" stroke-width="1.5" />
      <polygon points="280,90 276,100 284,100" fill="#0f172a" />
      <polygon points="280,200 276,190 284,190" fill="#0f172a" />
      <text x="290" y="150" font-size="14" font-weight="bold" fill="#0f172a">10 cm</text>

      <!-- Beam entering at angle 30° -->
      <line x1="150" y1="30" x2="150" y2="90" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3" />
      <line x1="125" y1="35" x2="150" y2="90" stroke="#ef4444" stroke-width="2.5" />
      <polygon points="150,90 144,78 152,82" fill="#ef4444" />
      <text x="155" y="65" font-size="13" font-weight="bold" fill="#ef4444">Beam of Protons</text>

      <!-- 30° arc -->
      <path d="M 140 55 A 35 35 0 0 1 150 55" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="135" y="50" font-size="12" font-weight="bold" fill="#0f172a">30°</text>
    </svg>
  `,

  // Q153: Folded circular loop with semicircles in xz and yz planes
  'moving_charges_q153_folded_semicircles.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Origin O at (140, 140) -->
      <!-- y-axis (up) -->
      <line x1="140" y1="140" x2="140" y2="30" stroke="#0f172a" stroke-width="2" />
      <polygon points="140,25 136,35 144,35" fill="#0f172a" />
      <text x="125" y="30" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">y</text>

      <!-- x-axis (right) -->
      <line x1="140" y1="140" x2="270" y2="140" stroke="#0f172a" stroke-width="2" />
      <polygon points="275,140 265,136 265,144" fill="#0f172a" />
      <text x="280" y="145" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">x</text>

      <!-- z-axis (down-left) -->
      <line x1="140" y1="140" x2="60" y2="190" stroke="#0f172a" stroke-width="2" />
      <polygon points="55,193 68,190 62,182" fill="#0f172a" />
      <text x="45" y="195" font-size="16" font-style="italic" font-weight="bold" fill="#0f172a">z</text>

      <circle cx="140" cy="140" r="3.5" fill="#0f172a" />
      <text x="125" y="155" font-size="14" font-weight="bold" fill="#0f172a">O</text>

      <!-- Semicircle 1: in yz-plane (vertical-ish perspective) -->
      <path d="M 140 70 A 50 65 0 0 1 100 165" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <!-- Current arrow -->
      <polygon points="110,120 102,126 108,132" fill="#0284c7" />
      <text x="90" y="125" font-size="14" font-style="italic" font-weight="bold" fill="#0284c7">I</text>

      <!-- Semicircle 2: in xz-plane (flat perspective) -->
      <path d="M 100 165 A 65 30 0 0 1 200 120" fill="none" stroke="#0284c7" stroke-width="2.5" />
      <!-- Connector back to (140, 70) -->
      <path d="M 200 120 A 45 45 0 0 0 140 70" fill="none" stroke="#0284c7" stroke-width="2.5" />
    </svg>
  `,

  // Q154: Suspended current-carrying block of mass M with springs k1, k2, k3
  'moving_charges_q154_suspended_bar_springs.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Ceiling (hatched support) -->
      <line x1="80" y1="35" x2="260" y2="35" stroke="#0f172a" stroke-width="2.5" />
      <line x1="90" y1="35" x2="80" y2="25" stroke="#0f172a" stroke-width="1.5" />
      <line x1="120" y1="35" x2="110" y2="25" stroke="#0f172a" stroke-width="1.5" />
      <line x1="150" y1="35" x2="140" y2="25" stroke="#0f172a" stroke-width="1.5" />
      <line x1="180" y1="35" x2="170" y2="25" stroke="#0f172a" stroke-width="1.5" />
      <line x1="210" y1="35" x2="200" y2="25" stroke="#0f172a" stroke-width="1.5" />
      <line x1="240" y1="35" x2="230" y2="25" stroke="#0f172a" stroke-width="1.5" />

      <!-- Left branch: k1 and k2 in series (x = 120) -->
      <!-- Spring k1 -->
      <path d="M 120 35 L 120 45 L 115 50 L 125 55 L 115 60 L 125 65 L 115 70 L 120 75 L 120 85" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="95" y="65" font-size="14" font-weight="bold" fill="#0284c7">k₁</text>

      <!-- Spring k2 -->
      <path d="M 120 85 L 120 95 L 115 100 L 125 105 L 115 110 L 125 115 L 115 120 L 120 125 L 120 135" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="95" y="115" font-size="14" font-weight="bold" fill="#0284c7">k₂</text>

      <!-- Right branch: k3 alone (x = 220) -->
      <path d="M 220 35 L 220 50 L 213 60 L 227 70 L 213 80 L 227 90 L 213 100 L 227 110 L 213 120 L 220 125 L 220 135" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="235" y="85" font-size="14" font-weight="bold" fill="#0284c7">k₃</text>

      <!-- Horizontal bar of mass M: from x=80 to 260 at y=135 -->
      <rect x="80" y="135" width="180" height="15" fill="#cbd5e1" stroke="#0f172a" stroke-width="2" />

      <!-- Current i flowing right in bar -->
      <line x1="140" y1="142" x2="190" y2="142" stroke="#ef4444" stroke-width="2" />
      <polygon points="190,142 180,138 180,146" fill="#ef4444" />
      <text x="160" y="132" font-size="14" font-style="italic" font-weight="bold" fill="#ef4444">i</text>

      <!-- Gravity force Mg downward -->
      <line x1="170" y1="150" x2="170" y2="190" stroke="#0f172a" stroke-width="2" />
      <polygon points="170,195 165,185 175,185" fill="#0f172a" />
      <text x="175" y="180" font-size="15" font-weight="bold" fill="#0f172a">Mg</text>

      <!-- Magnetic field B crosses (into page) -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <path d="M 95 45 L 105 55 M 105 45 L 95 55" />
        <path d="M 160 45 L 170 55 M 170 45 L 160 55" />
        <path d="M 235 45 L 245 55 M 245 45 L 235 55" />
        <path d="M 160 90 L 170 100 M 170 90 L 160 100" />
      </g>
      <text x="245" y="70" font-size="16" font-weight="bold" fill="#64748b">B</text>
    </svg>
  `
};

async function generate() {
  console.log('Generating Batch 9 diagrams...');
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
