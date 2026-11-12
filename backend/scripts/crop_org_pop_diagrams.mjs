import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/org_pop_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q14 (Page 6)
  await sharp('./backend/scripts/org_pop_rendered_pages/page_6.png')
    .extract({ left: 60, top: 235, width: 520, height: 345 })
    .toFile(`${outDir}/q_14.png`);
  console.log('Cropped Q14');

  // Q56 (Page 16)
  await sharp('./backend/scripts/org_pop_rendered_pages/page_16.png')
    .extract({ left: 60, top: 865, width: 560, height: 380 })
    .toFile(`${outDir}/q_56.png`);
  console.log('Cropped Q56');

  // Q66 (Page 18)
  await sharp('./backend/scripts/org_pop_rendered_pages/page_18.png')
    .extract({ left: 60, top: 975, width: 620, height: 330 })
    .toFile(`${outDir}/q_66.png`);
  console.log('Cropped Q66');

  // Q71 (Page 20)
  await sharp('./backend/scripts/org_pop_rendered_pages/page_20.png')
    .extract({ left: 60, top: 260, width: 580, height: 330 })
    .toFile(`${outDir}/q_71.png`);
  console.log('Cropped Q71');

  // Q73 (Page 21)
  await sharp('./backend/scripts/org_pop_rendered_pages/page_21.png')
    .extract({ left: 60, top: 290, width: 350, height: 330 })
    .toFile(`${outDir}/q_73.png`);
  console.log('Cropped Q73');
}

cropAll().catch(console.error);
