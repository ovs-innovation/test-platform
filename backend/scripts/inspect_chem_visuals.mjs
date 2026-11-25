import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'basic_chem_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropVisuals() {
  // Page 44 Q127
  const p44 = path.resolve(__dirname, 'basic_chem_pages/page_044.png');
  // Let's crop top half of page 44
  await sharp(p44).extract({ left: 50, top: 50, width: 1100, height: 600 }).toFile(path.join(outDir, 'p44_preview.png'));

  // Page 66 Q198
  const p66 = path.resolve(__dirname, 'basic_chem_pages/page_066.png');
  // Crop top half of page 66
  await sharp(p66).extract({ left: 50, top: 50, width: 1100, height: 650 }).toFile(path.join(outDir, 'p66_preview.png'));

  // Page 41 Q120
  const p41 = path.resolve(__dirname, 'basic_chem_pages/page_041.png');
  await sharp(p41).extract({ left: 50, top: 50, width: 1100, height: 400 }).toFile(path.join(outDir, 'p41_preview.png'));

  console.log('Saved previews to basic_chem_diagrams/');
}

cropVisuals().catch(console.error);
