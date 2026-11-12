import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/body_fluids_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q43 (Page 12)
  await sharp('./backend/scripts/body_fluids_rendered_pages/page_12.png')
    .extract({ left: 60, top: 490, width: 600, height: 400 })
    .toFile(`${outDir}/q_43.png`);
  console.log('Cropped Q43');

  // Q44 (Page 13)
  await sharp('./backend/scripts/body_fluids_rendered_pages/page_13.png')
    .extract({ left: 60, top: 240, width: 450, height: 250 })
    .toFile(`${outDir}/q_44.png`);
  console.log('Cropped Q44');

  // Q45 (Page 13)
  await sharp('./backend/scripts/body_fluids_rendered_pages/page_13.png')
    .extract({ left: 60, top: 770, width: 750, height: 330 })
    .toFile(`${outDir}/q_45.png`);
  console.log('Cropped Q45');

  // Q46 (Page 14)
  await sharp('./backend/scripts/body_fluids_rendered_pages/page_14.png')
    .extract({ left: 60, top: 230, width: 600, height: 400 })
    .toFile(`${outDir}/q_46.png`);
  console.log('Cropped Q46');

  // Q49 (Page 15)
  await sharp('./backend/scripts/body_fluids_rendered_pages/page_15.png')
    .extract({ left: 60, top: 230, width: 750, height: 370 })
    .toFile(`${outDir}/q_49.png`);
  console.log('Cropped Q49');
}

cropAll().catch(console.error);
