import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'jee_gravitation_pages');

// For each page, analyze vertical projection of dark pixels to find diagrams (blocks with drawings)
async function scanPage(p) {
  const pad = String(p).padStart(3, '0');
  const imgPath = path.join(pagesDir, `page_${pad}.png`);
  if (!fs.existsSync(imgPath)) return null;

  // AcadXL page is 918x1188. Diagram is typically in the upper half or middle (y: 50 to 800)
  // Let's look for regions with drawing strokes: continuous blocks of dark pixels that don't match text line spacing
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  
  // Find connected non-white clusters or check if there is an embedded drawing
  // Let's count non-white pixels in right half (x: 450 to 880, y: 50 to 500) where diagrams frequently appear
  let rightDark = 0;
  for (let y = 60; y < 500; y++) {
    for (let x = 450; x < 850; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] < 200) rightDark++;
    }
  }

  // Also check middle region (x: 100 to 800, y: 150 to 450)
  let midDark = 0;
  for (let y = 150; y < 450; y++) {
    for (let x = 150; x < 750; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] < 200) midDark++;
    }
  }

  return { page: p, rightDark, midDark };
}

async function main() {
  console.log('Scanning all 144 pages for drawing density...');
  const results = [];
  for (let p = 1; p <= 144; p++) {
    const res = await scanPage(p);
    results.push(res);
  }
  // Sort by rightDark or midDark
  const topCandidates = results
    .filter(r => r.rightDark > 1500 || r.midDark > 4000)
    .sort((a, b) => (b.rightDark + b.midDark) - (a.rightDark + a.midDark));

  console.log(`Found ${topCandidates.length} high-density pages:`);
  for (const c of topCandidates) {
    console.log(`Page ${c.page}: rightDark=${c.rightDark}, midDark=${c.midDark}`);
  }
}

main().catch(console.error);
