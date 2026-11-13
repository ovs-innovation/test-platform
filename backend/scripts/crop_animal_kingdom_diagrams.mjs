import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/animal_kingdom_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Page 24 Q81
  // top around 530 to 920, left around 60 to 1100
  // let's check dimensions of page_24: 1190 x 1684
  await sharp('./backend/scripts/animal_kingdom_rendered_pages/page_24.png')
    .extract({ left: 60, top: 520, width: 850, height: 390 })
    .toFile(`${outDir}/q_81.png`);
  console.log('Cropped Q81');
}

cropAll().catch(console.error);

