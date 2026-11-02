import sharp from 'sharp';

async function cropPage56() {
  // Let's crop Q14
  await sharp('backend/scripts/thermo_pages/page_56.png')
    .extract({ left: 10, top: 110, width: 110, height: 50 })
    .toFile('backend/scripts/p56_q14.png');

  // Q17, Q18, Q19
  await sharp('backend/scripts/thermo_pages/page_56.png')
    .extract({ left: 125, top: 0, width: 118, height: 160 })
    .toFile('backend/scripts/p56_right_top.png');

  // Q20, Q21, Q22
  await sharp('backend/scripts/thermo_pages/page_56.png')
    .extract({ left: 125, top: 160, width: 118, height: 160 })
    .toFile('backend/scripts/p56_right_bottom.png');

  console.log('Cropped page 56 segments');
}

cropPage56().catch(console.error);

