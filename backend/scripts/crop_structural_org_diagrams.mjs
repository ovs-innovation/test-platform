import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/structural_org_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q58 (Page 15)
  // top 480 to 860 -> height 380, width 400
  await sharp('./backend/scripts/structural_org_rendered_pages/page_15.png')
    .extract({ left: 60, top: 480, width: 450, height: 380 })
    .toFile(`${outDir}/q_58.png`);
  console.log('Cropped Q58');

  // Q60 (Page 16)
  // top 240 to 640 -> height 400, width 650
  await sharp('./backend/scripts/structural_org_rendered_pages/page_16.png')
    .extract({ left: 60, top: 240, width: 650, height: 400 })
    .toFile(`${outDir}/q_60.png`);
  console.log('Cropped Q60');

  // Q62 (Page 17)
  // top 270 to 660 -> height 390, width 600
  await sharp('./backend/scripts/structural_org_rendered_pages/page_17.png')
    .extract({ left: 60, top: 270, width: 600, height: 390 })
    .toFile(`${outDir}/q_62.png`);
  console.log('Cropped Q62');
}

cropAll().catch(console.error);

