import sharp from 'sharp';
import fs from 'fs';

const diagDir = 'backend/uploads/thermodynamics_chem';
if (!fs.existsSync(diagDir)) fs.mkdirSync(diagDir, { recursive: true });

async function cropDiagrams() {
  // Q5 on page_55.png (472 x 548)
  // Let's inspect where Q5 diagram is on page_55
  // Left column bottom: x: 140..320, y: 390..520
  await sharp('backend/scripts/thermo_pages/page_55.png')
    .extract({ left: 140, top: 390, width: 170, height: 125 })
    .toFile(`${diagDir}/thermo_chem_q5.png`);
  console.log('Cropped thermo_chem_q5.png');

  // Q15 on page_56.png (243 x 340)
  // Left column middle: x: 70..170, y: 160..215
  await sharp('backend/scripts/thermo_pages/page_56.png')
    .extract({ left: 70, top: 160, width: 100, height: 55 })
    .toFile(`${diagDir}/thermo_chem_q15.png`);
  console.log('Cropped thermo_chem_q15.png');

  // Q26 on page_57.png (244 x 340)
  // Left column middle: x: 50..160, y: 135..175
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 60, top: 135, width: 100, height: 45 })
    .toFile(`${diagDir}/thermo_chem_q26.png`);
  console.log('Cropped thermo_chem_q26.png');

  // Q29 on page_57.png (244 x 340)
  // Right column top: x: 180..240, y: 20..60
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 185, top: 20, width: 55, height: 42 })
    .toFile(`${diagDir}/thermo_chem_q29.png`);
  console.log('Cropped thermo_chem_q29.png');

  // Q69 on page_60.png (241 x 341)
  // Right column middle: x: 155..225, y: 95..145
  await sharp('backend/scripts/thermo_pages/page_60.png')
    .extract({ left: 150, top: 95, width: 80, height: 55 })
    .toFile(`${diagDir}/thermo_chem_q69.png`);
  console.log('Cropped thermo_chem_q69.png');
}

cropDiagrams().catch(console.error);

