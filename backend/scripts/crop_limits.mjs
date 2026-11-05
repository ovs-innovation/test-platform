import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const cropDir = 'backend/scripts/limits_crops';
if (!fs.existsSync(cropDir)) fs.mkdirSync(cropDir, { recursive: true });

async function cropRange(start, end) {
  for (let p = start; p <= end; p++) {
    const pageFile = `backend/scripts/limits_pages/page_${p}.png`;
    if (!fs.existsSync(pageFile)) continue;
    await sharp(pageFile).extract({ left: 0, top: 0, width: 935, height: 600 }).toFile(path.join(cropDir, `p${p}_top.png`));
    await sharp(pageFile).extract({ left: 0, top: 580, width: 935, height: 620 }).toFile(path.join(cropDir, `p${p}_bot.png`));
  }
  console.log(`Cropped pages ${start} to ${end}`);
}

const start = parseInt(process.argv[2] || '34');
const end = parseInt(process.argv[3] || '48');
cropRange(start, end);

