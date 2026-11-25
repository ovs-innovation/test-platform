import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'basic_chem_pages');

async function scanGraphics() {
  console.log('Scanning all 78 content pages for graphic/diagram elements...');
  const suspiciousPages = [];

  for (let p = 1; p <= 78; p++) {
    const pad = String(p).padStart(3, '0');
    const pPath = path.resolve(pagesDir, `page_${pad}.png`);
    const { data, info } = await sharp(pPath).raw().toBuffer({ resolveWithObject: true });

    // Look for horizontal line segments or blocks of non-white pixels that span > 120 pixels without text breaks
    // Exclude header/footer (top 80px, bottom 50px)
    let maxContigLine = 0;
    for (let y = 100; y < info.height - 80; y += 4) {
      let run = 0;
      for (let x = 60; x < info.width - 60; x++) {
        const idx = (y * info.width + x) * info.channels;
        const isDark = (data[idx] < 120 && data[idx+1] < 120 && data[idx+2] < 120);
        if (isDark) {
          run++;
          if (run > maxContigLine) maxContigLine = run;
        } else {
          run = 0;
        }
      }
    }

    if (maxContigLine > 100) {
      suspiciousPages.push({ page: p, maxContigLine });
    }
  }

  console.log(`Pages with continuous lines > 100px: ${suspiciousPages.length}`, suspiciousPages);
}

scanGraphics().catch(console.error);
