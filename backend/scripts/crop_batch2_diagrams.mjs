import sharp from 'sharp';

async function cropCheck() {
  // Q104 from page 1 (width 672, height 565)
  await sharp('scripts/thermal_pages_batch2/page_1_rot270.png')
    .extract({ left: 10, top: 290, width: 200, height: 180 })
    .toFile('scripts/thermal_pages_batch2/q104_crop.png');

  // Q116 from page 2 (width 646, height 573)
  await sharp('scripts/thermal_pages_batch2/page_2_rot270.png')
    .extract({ left: 10, top: 120, width: 200, height: 170 })
    .toFile('scripts/thermal_pages_batch2/q116_crop.png');

  // Q126 from page 2
  await sharp('scripts/thermal_pages_batch2/page_2_rot270.png')
    .extract({ left: 220, top: 380, width: 200, height: 160 })
    .toFile('scripts/thermal_pages_batch2/q126_crop.png');

  // Q202 from page 4 (width 657, height 550)
  await sharp('scripts/thermal_pages_batch2/page_4_rot270.png')
    .extract({ left: 10, top: 340, width: 200, height: 190 })
    .toFile('scripts/thermal_pages_batch2/q202_crop.png');

  // Q224 from page 5 (width 621, height 573)
  await sharp('scripts/thermal_pages_batch2/page_5_rot270.png')
    .extract({ left: 420, top: 200, width: 190, height: 180 })
    .toFile('scripts/thermal_pages_batch2/q224_crop.png');

  console.log('Crops generated successfully');
}

cropCheck().catch(console.error);
