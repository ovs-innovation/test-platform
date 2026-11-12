import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/molecular_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q55 (Page 15)
  await sharp('./backend/scripts/molecular_rendered_pages/page_15.png')
    .extract({ left: 60, top: 1110, width: 620, height: 110 })
    .toFile(`${outDir}/q_55.png`);
  console.log('Cropped Q55');

  // Q114 (Page 27)
  await sharp('./backend/scripts/molecular_rendered_pages/page_27.png')
    .extract({ left: 60, top: 210, width: 640, height: 120 })
    .toFile(`${outDir}/q_114.png`);
  console.log('Cropped Q114');

  // Q120 (Page 28)
  await sharp('./backend/scripts/molecular_rendered_pages/page_28.png')
    .extract({ left: 60, top: 670, width: 640, height: 120 })
    .toFile(`${outDir}/q_120.png`);
  console.log('Cropped Q120');
}

cropAll().catch(console.error);
