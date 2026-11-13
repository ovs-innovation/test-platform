import sharp from 'sharp';
import fs from 'fs';

const outDir = './backend/scripts/biodiversity_diagrams';

async function cropQ74() {
  await sharp('./backend/scripts/biodiversity_rendered_pages/page_17.png')
    .extract({ left: 60, top: 290, width: 620, height: 280 })
    .toFile(`${outDir}/q_74.png`);
  console.log('Cropped Q74 table');
}

cropQ74().catch(console.error);

