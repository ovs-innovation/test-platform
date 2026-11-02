import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'ecology_pages');
const uploadsDir = path.join(__dirname, '../public/uploads/ecology');

const crops = [
  // Page 79
  { id: 'q24', page: 79, extract: { left: 120, top: 198, width: 85, height: 38 } },
  // Page 80
  { id: 'q27', page: 80, extract: { left: 16, top: 48, width: 80, height: 42 } },
  { id: 'q29', page: 80, extract: { left: 15, top: 165, width: 90, height: 52 } },
  // Page 81
  { id: 'q43', page: 81, extract: { left: 135, top: 38, width: 80, height: 62 } },
  // Page 82
  { id: 'q47', page: 82, extract: { left: 10, top: 28, width: 98, height: 38 } },
  { id: 'q49', page: 82, extract: { left: 10, top: 180, width: 98, height: 62 } },
  { id: 'q52', page: 82, extract: { left: 125, top: 100, width: 95, height: 50 } },
  // Page 83
  { id: 'q58', page: 83, extract: { left: 15, top: 125, width: 90, height: 60 } },
  // Page 85
  { id: 'q78', page: 85, extract: { left: 15, top: 22, width: 95, height: 200 } },
  // Page 86
  { id: 'q93', page: 86, extract: { left: 15, top: 135, width: 98, height: 80 } },
  { id: 'q98', page: 86, extract: { left: 125, top: 98, width: 100, height: 160 } },
  // Page 87
  { id: 'q102', page: 87, extract: { left: 130, top: 72, width: 85, height: 42 } },
  { id: 'q109', page: 87, extract: { left: 135, top: 215, width: 85, height: 60 } },
  // Page 88
  { id: 'q114', page: 88, extract: { left: 12, top: 198, width: 95, height: 52 } },
  // Page 90
  { id: 'q133', page: 90, extract: { left: 15, top: 58, width: 98, height: 55 } },
  { id: 'q134', page: 90, extract: { left: 15, top: 172, width: 95, height: 48 } }
];

async function main() {
  for (const c of crops) {
    const inputPath = path.join(pagesDir, `page_${c.page}.png`);
    const outputPath = path.join(uploadsDir, `ecology_${c.id}.png`);
    await sharp(inputPath)
      .extract(c.extract)
      .png({ quality: 95 })
      .toFile(outputPath);
    console.log(`Extracted ecology_${c.id}.png`);
  }
}

main().catch(console.error);
