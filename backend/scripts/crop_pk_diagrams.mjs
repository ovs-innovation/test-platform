import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './backend/scripts/pk_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function main() {
  // Q19 diagram on page 7: y: 220 to 600, x: 60 to 350
  await sharp('./backend/scripts/pk_diagram_pages/page_7.png')
    .extract({ left: 60, top: 225, width: 250, height: 380 })
    .trim()
    .toFile(path.join(outDir, 'q19_alga.png'));
  console.log('Cropped Q19 diagram');

  // Q70 diagram on page 16: y: 225 to 635, x: 80 to 450
  await sharp('./backend/scripts/pk_diagram_pages/page_16.png')
    .extract({ left: 70, top: 230, width: 380, height: 390 })
    .trim()
    .toFile(path.join(outDir, 'q70_marchantia.png'));
  console.log('Cropped Q70 diagram');

  // Q76 diagram on page 17: y: 725 to 1070, x: 60 to 750
  await sharp('./backend/scripts/pk_diagram_pages/page_17.png')
    .extract({ left: 60, top: 730, width: 680, height: 340 })
    .trim()
    .toFile(path.join(outDir, 'q76_figures.png'));
  console.log('Cropped Q76 diagram');
}

main().catch(console.error);
