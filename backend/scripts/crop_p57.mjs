import sharp from 'sharp';

async function cropPage57() {
  // Q23, Q24, Q25, Q26
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 5, top: 5, width: 120, height: 170 })
    .toFile('backend/scripts/p57_left_top.png');

  // Q27, Q28
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 5, top: 170, width: 120, height: 165 })
    .toFile('backend/scripts/p57_left_bottom.png');

  // Q29, Q30, Q31
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 125, top: 5, width: 118, height: 160 })
    .toFile('backend/scripts/p57_right_top.png');

  // Q32, Q33, Q34
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 125, top: 165, width: 118, height: 170 })
    .toFile('backend/scripts/p57_right_bottom.png');

  console.log('Cropped page 57 segments');
}

cropPage57().catch(console.error);

