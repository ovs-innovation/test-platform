import sharp from 'sharp';

async function main() {
  await sharp('backend/scripts/page_3.png')
    .extract({ left: 60, top: 150, width: 1050, height: 450 })
    .toFile('backend/scripts/q5_preview.png');
  console.log('q5_preview saved');
}

main().catch(console.error);

