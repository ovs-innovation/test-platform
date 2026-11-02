import sharp from 'sharp';

async function fixCrops() {
  // Q5 on page_55.png (472 x 548)
  await sharp('backend/scripts/thermo_pages/page_55.png')
    .extract({ left: 70, top: 433, width: 145, height: 83 })
    .toFile('backend/uploads/thermodynamics_chem/thermo_chem_q5.png');

  // Q15 on page_56.png (243 x 340)
  // Triangle ABCA: x: 15..95, y: 165..215
  await sharp('backend/scripts/thermo_pages/page_56.png')
    .extract({ left: 15, top: 165, width: 75, height: 50 })
    .toFile('backend/uploads/thermodynamics_chem/thermo_chem_q15.png');

  // Q26 on page_57.png (244 x 340)
  // Triangle cycle: x: 30..95, y: 135..175
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 30, top: 135, width: 65, height: 40 })
    .toFile('backend/uploads/thermodynamics_chem/thermo_chem_q26.png');

  // Q29 on page_57.png (244 x 340)
  // Rectangle cycle ABCD: x: 155..205, y: 20..60
  await sharp('backend/scripts/thermo_pages/page_57.png')
    .extract({ left: 155, top: 20, width: 50, height: 40 })
    .toFile('backend/uploads/thermodynamics_chem/thermo_chem_q29.png');

  // Q69 on page_60.png (241 x 341)
  // Circle cycle: x: 160..225, y: 106..145
  await sharp('backend/scripts/thermo_pages/page_60.png')
    .extract({ left: 160, top: 106, width: 65, height: 38 })
    .toFile('backend/uploads/thermodynamics_chem/thermo_chem_q69.png');

  console.log('Fixed all 5 crops');
}

fixCrops().catch(console.error);
