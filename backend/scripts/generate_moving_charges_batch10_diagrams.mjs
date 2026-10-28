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
  // Q164: Charge entering field boundary at angle theta = pi/6
  'moving_charges_q164_boundary_entry_angle.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Vertical boundary at x = 140 -->
      <line x1="140" y1="30" x2="140" y2="230" stroke="#0f172a" stroke-width="2.5" />

      <!-- Field region x > 140 with crosses -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <path d="M 170 50 L 180 60 M 180 50 L 170 60" />
        <path d="M 210 50 L 220 60 M 220 50 L 210 60" />
        <path d="M 250 50 L 260 60 M 260 50 L 250 60" />
        <path d="M 170 90 L 180 100 M 180 90 L 170 100" />
        <path d="M 210 90 L 220 100 M 220 90 L 210 100" />
        <path d="M 250 90 L 260 100 M 260 90 L 250 100" />
        <path d="M 170 130 L 180 140 M 180 130 L 170 140" />
        <path d="M 210 130 L 220 140 M 220 130 L 210 140" />
        <path d="M 250 130 L 260 140 M 260 130 L 250 140" />
        <path d="M 170 170 L 180 180 M 180 170 L 170 180" />
        <path d="M 210 170 L 220 180 M 220 170 L 210 180" />
        <path d="M 250 170 L 260 180 M 260 170 L 250 180" />
      </g>
      <text x="210" y="40" font-size="16" font-weight="bold" fill="#0284c7">B₀</text>

      <!-- Particle entering at (140, 160) -->
      <circle cx="80" cy="200" r="6" fill="#ef4444" />
      <text x="65" y="215" font-size="15" font-weight="bold" fill="#0f172a">q</text>

      <!-- Trajectory vector entering boundary -->
      <line x1="80" y1="200" x2="140" y2="160" stroke="#ef4444" stroke-width="2" />
      <polygon points="140,160 128,162 133,170" fill="#ef4444" />
      <text x="110" y="150" font-size="14" font-style="italic" font-weight="bold" fill="#ef4444">v₁</text>

      <!-- Angle theta = pi/6 with boundary -->
      <path d="M 140 180 A 20 20 0 0 1 127 169" fill="none" stroke="#0f172a" stroke-width="1.5" />
      <text x="145" y="195" font-size="13" font-weight="bold" fill="#0f172a">θ = π/6</text>
    </svg>
  `,

  // Q167: Particle tracks A, B, C, D in perpendicular magnetic field
  'moving_charges_q167_particle_tracks_ABCD.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Entrance boundary at bottom -->
      <line x1="60" y1="210" x2="280" y2="210" stroke="#0f172a" stroke-width="2" />

      <!-- Field crosses into page -->
      <g stroke="#94a3b8" stroke-width="1.5">
        <path d="M 90 70 L 100 80 M 100 70 L 90 80" />
        <path d="M 240 70 L 250 80 M 250 70 L 240 80" />
        <path d="M 90 140 L 100 150 M 100 140 L 90 150" />
        <path d="M 240 140 L 250 150 M 250 140 L 240 150" />
      </g>
      <text x="245" y="110" font-size="16" font-weight="bold" fill="#64748b">B</text>

      <!-- Entrance point (170, 210) -->
      <!-- Track B: Straight up (neutron) -->
      <line x1="170" y1="210" x2="170" y2="60" stroke="#0284c7" stroke-width="2.5" />
      <polygon points="170,55 166,65 174,65" fill="#0284c7" />
      <text x="165" y="48" font-size="16" font-weight="bold" fill="#0f172a">B</text>

      <!-- Track A: Deflects right (electron) -->
      <path d="M 170 210 Q 185 140 230 110" fill="none" stroke="#3b82f6" stroke-width="2.5" />
      <polygon points="235,108 223,110 227,117" fill="#3b82f6" />
      <text x="240" y="112" font-size="16" font-weight="bold" fill="#0f172a">A</text>

      <!-- Track C: Deflects left, larger radius (alpha particle) -->
      <path d="M 170 210 Q 155 120 120 70" fill="none" stroke="#ef4444" stroke-width="2.5" />
      <polygon points="116,66 122,76 127,70" fill="#ef4444" />
      <text x="110" y="60" font-size="16" font-weight="bold" fill="#0f172a">C</text>

      <!-- Track D: Deflects left, tighter radius (proton) -->
      <path d="M 170 210 Q 140 150 90 130" fill="none" stroke="#10b981" stroke-width="2.5" />
      <polygon points="85,128 94,136 96,128" fill="#10b981" />
      <text x="75" y="135" font-size="16" font-weight="bold" fill="#0f172a">D</text>
    </svg>
  `,

  // Q169: Hairpin loop with semicircle of radius r and straight wires
  'moving_charges_q169_hairpin_loop.png': `
    <svg width="340" height="240" viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Semicircle: Center at (160, 120), radius 60 -->
      <!-- Curves to the left from (160, 60) to (160, 180) -->
      <path d="M 160 60 A 60 60 0 0 0 160 180" fill="none" stroke="#0284c7" stroke-width="3" />
      <!-- Current arrow along semicircle -->
      <polygon points="100,120 105,110 95,110" fill="#0284c7" />
      <text x="85" y="115" font-size="15" font-style="italic" font-weight="bold" fill="#0284c7">I</text>

      <!-- Top straight wire from (160, 60) to (280, 60) -->
      <line x1="160" y1="60" x2="280" y2="60" stroke="#0284c7" stroke-width="2.5" />
      <line x1="280" y1="60" x2="310" y2="60" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
      <polygon points="230,60 220,55 220,65" fill="#0284c7" />

      <!-- Bottom straight wire from (280, 180) to (160, 180) -->
      <line x1="160" y1="180" x2="280" y2="180" stroke="#0284c7" stroke-width="2.5" />
      <line x1="280" y1="180" x2="310" y2="180" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
      <polygon points="210,180 220,175 220,185" fill="#0284c7" />

      <!-- Center O -->
      <circle cx="160" cy="120" r="4" fill="#0f172a" />
      <text x="170" y="125" font-size="15" font-weight="bold" fill="#0f172a">O</text>

      <!-- Diameter 2r indicator -->
      <line x1="160" y1="60" x2="160" y2="180" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="210" y1="60" x2="210" y2="180" stroke="#475569" stroke-width="1.5" />
      <polygon points="210,60 206,70 214,70" fill="#475569" />
      <polygon points="210,180 206,170 214,170" fill="#475569" />
      <text x="218" y="125" font-size="14" font-weight="bold" fill="#475569">2r</text>
    </svg>
  `
};

async function generate() {
  console.log('Generating Batch 10 diagrams...');
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
