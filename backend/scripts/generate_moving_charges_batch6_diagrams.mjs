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
  // Q90: Two infinite parallel wires carrying 3A and 6A separated by distance d
  'moving_charges_q90_parallel_wires_3A_6A.png': `
    <svg width="340" height="260" viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
      <!-- Left Wire (3A) -->
      <line x1="100" y1="30" x2="100" y2="230" stroke="#0284c7" stroke-width="3" />
      <polygon points="100,100 95,115 105,115" fill="#0284c7" />
      <text x="70" y="112" font-size="16" font-weight="bold" fill="#0284c7">3 A</text>

      <!-- Right Wire (6A) -->
      <line x1="240" y1="30" x2="240" y2="230" stroke="#0284c7" stroke-width="3.5" />
      <polygon points="240,100 235,115 245,115" fill="#0284c7" />
      <text x="250" y="112" font-size="16" font-weight="bold" fill="#0284c7">6 A</text>

      <!-- Midpoint line -->
      <line x1="170" y1="40" x2="170" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4" />
      <circle cx="170" cy="130" r="4" fill="#ef4444" />
      <text x="175" y="125" font-size="13" font-weight="bold" fill="#ef4444">Mid-point</text>

      <!-- Dimension d -->
      <line x1="100" y1="180" x2="240" y2="180" stroke="#475569" stroke-width="1.5" />
      <polygon points="100,180 110,176 110,184" fill="#475569" />
      <polygon points="240,180 230,176 230,184" fill="#475569" />
      <text x="165" y="174" font-size="15" font-style="italic" font-weight="bold" fill="#0f172a">d</text>
    </svg>
  `
};

async function generate() {
  console.log('Generating Batch 6 diagrams...');
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
