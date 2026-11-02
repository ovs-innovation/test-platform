import sharp from 'sharp';

async function main() {
  const dir = 'backend/uploads/breathing/geometry';
  await sharp('backend/uploads/breathing/slices/img2_top.png')
    .extract({ left: 0, top: 0, width: 150, height: 60 })
    .toFile('backend/uploads/breathing/img2_top_left_corner.png');
  await sharp('backend/uploads/breathing/slices/img2_top.png')
    .extract({ left: 327, top: 0, width: 150, height: 60 })
    .toFile('backend/uploads/breathing/img2_top_right_corner.png');
  await sharp('backend/uploads/breathing/slices/img2_bottom.png')
    .extract({ left: 0, top: 0, width: 150, height: 60 })
    .toFile('backend/uploads/breathing/img2_bottom_left_corner.png');

  console.log('Corners cropped!');
}

main().catch(console.error);

