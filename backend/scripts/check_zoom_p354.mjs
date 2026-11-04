import sharp from 'sharp';

async function cropCheck() {
  await sharp('backend/scripts/animal_pages_part2/page_354_c1.png')
    .extract({ left: 0, top: 75, width: 110, height: 160 })
    .resize(500, 700, { kernel: 'lanczos3' })
    .toFile('backend/scripts/animal_pages_part2/check_p354_q168_171.png');

  await sharp('backend/scripts/animal_pages_part2/page_354_c2.png')
    .extract({ left: 0, top: 0, width: 110, height: 160 })
    .resize(500, 700, { kernel: 'lanczos3' })
    .toFile('backend/scripts/animal_pages_part2/check_p354_q172_175.png');

  console.log('Created zoomed crops for page 354');
}

cropCheck().catch(console.error);

