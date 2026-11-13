import sharp from 'sharp';

async function main() {
  await sharp('backend/scripts/page4_rendered.png')
    .extract({ left: 50, top: 200, width: 1000, height: 600 })
    .toFile('backend/scripts/q10_crop.png');
  console.log('Saved q10_crop.png');
}

main().catch(console.error);

