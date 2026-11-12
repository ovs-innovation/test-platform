import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/ecosystem_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q10 (Page 4)
  await sharp('./backend/scripts/ecosystem_rendered_pages/page_4.png')
    .extract({ left: 60, top: 920, width: 620, height: 340 })
    .toFile(`${outDir}/q_10.png`);
  console.log('Cropped Q10');

  // Q43 (Page 11)
  await sharp('./backend/scripts/ecosystem_rendered_pages/page_11.png')
    .extract({ left: 60, top: 710, width: 680, height: 340 })
    .toFile(`${outDir}/q_43.png`);
  console.log('Cropped Q43');

  // Q45 (Page 12)
  await sharp('./backend/scripts/ecosystem_rendered_pages/page_12.png')
    .extract({ left: 60, top: 250, width: 650, height: 285 })
    .toFile(`${outDir}/q_45.png`);
  console.log('Cropped Q45');

  // Q53 (Page 13)
  await sharp('./backend/scripts/ecosystem_rendered_pages/page_13.png')
    .extract({ left: 50, top: 850, width: 560, height: 360 })
    .toFile(`${outDir}/q_53.png`);
  console.log('Cropped Q53');

  // Q100 (Page 22)
  await sharp('./backend/scripts/ecosystem_rendered_pages/page_22.png')
    .extract({ left: 60, top: 260, width: 620, height: 285 })
    .toFile(`${outDir}/q_100.png`);
  console.log('Cropped Q100');
}

cropAll().catch(console.error);
