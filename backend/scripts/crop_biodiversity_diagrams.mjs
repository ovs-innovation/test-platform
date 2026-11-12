import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/biodiversity_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  await sharp('./backend/scripts/biodiversity_rendered_pages/page_14.png')
    .extract({ left: 70, top: 260, width: 440, height: 430 })
    .toFile(`${outDir}/q_57.png`);
  console.log('Cropped Q57');
}

cropAll().catch(console.error);
