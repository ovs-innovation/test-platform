import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'human_health_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropDiagrams() {
  // Page 17 - Q61
  const p17Path = path.resolve(__dirname, 'human_health_rendered_pages/page_17.png');
  await sharp(p17Path)
    .extract({ left: 80, top: 248, width: 440, height: 355 })
    .png()
    .toFile(path.join(outDir, 'q_61.png'));

  console.log('Q61 diagram saved');
}

cropDiagrams().catch(console.error);
