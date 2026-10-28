import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve('../frontend/public/uploads/botany');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

async function cropQ45() {
  const src = path.resolve('scripts/microbes_pages/microbes_p70_71.png');
  const dest = path.join(uploadDir, 'microbes_q45_biogas.png');

  // Let's crop x: 25, y: 170, width: 190, height: 165
  await sharp(src)
    .extract({ left: 25, top: 175, width: 190, height: 165 })
    .toFile(dest);

  console.log(`Cropped diagram saved to ${dest}`);
}

cropQ45().catch(console.error);
