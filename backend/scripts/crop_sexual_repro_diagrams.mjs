import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/sexual_repro_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // Q15 (Page 5)
  await sharp('./backend/scripts/sexual_repro_rendered_pages/page_5.png')
    .extract({ left: 70, top: 250, width: 500, height: 440 })
    .toFile(`${outDir}/q_15.png`);
  console.log('Cropped Q15 diagram');

  // Q17 (Page 6)
  await sharp('./backend/scripts/sexual_repro_rendered_pages/page_6.png')
    .extract({ left: 70, top: 250, width: 450, height: 440 })
    .toFile(`${outDir}/q_17.png`);
  console.log('Cropped Q17 diagram');

  // Q29 (Page 9)
  await sharp('./backend/scripts/sexual_repro_rendered_pages/page_9.png')
    .extract({ left: 70, top: 250, width: 500, height: 440 })
    .toFile(`${outDir}/q_29.png`);
  console.log('Cropped Q29 diagram');

  // Q102 (Page 21)
  await sharp('./backend/scripts/sexual_repro_rendered_pages/page_21.png')
    .extract({ left: 70, top: 250, width: 550, height: 460 })
    .toFile(`${outDir}/q_102.png`);
  console.log('Cropped Q102 diagram');
}

cropAll().catch(console.error);

