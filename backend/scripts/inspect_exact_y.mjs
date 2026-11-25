import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, 'jee_gravitation_pages');

async function checkRows(page, startY, endY) {
  const pad = String(page).padStart(3, '0');
  const imgPath = path.join(pagesDir, `page_${pad}.png`);
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });

  console.log(`=== Page ${page} horizontal dark pixels from y=${startY} to ${endY} ===`);
  for (let y = startY; y <= endY; y += 5) {
    let dark = 0;
    for (let x = 120; x < 600; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] < 200) dark++;
    }
    console.log(`y=${y}: dark=${dark}`);
  }
}

async function main() {
  await checkRows(14, 220, 310);
}

main().catch(console.error);
