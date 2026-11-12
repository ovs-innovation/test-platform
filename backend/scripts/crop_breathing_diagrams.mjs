import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/breathing_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q38 (Page 11)
  // top 680 to 1070 -> height 390, width 650
  await sharp('./backend/scripts/breathing_rendered_pages/page_11.png')
    .extract({ left: 60, top: 680, width: 650, height: 390 })
    .toFile(`${outDir}/q_38.png`);
  console.log('Cropped Q38');

  // Q44 (Page 13)
  // top 240 to 660 -> height 420, width 600
  await sharp('./backend/scripts/breathing_rendered_pages/page_13.png')
    .extract({ left: 60, top: 240, width: 600, height: 420 })
    .toFile(`${outDir}/q_44.png`);
  console.log('Cropped Q44');
}

cropAll().catch(console.error);
