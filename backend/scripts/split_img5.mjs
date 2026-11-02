import sharp from 'sharp';

async function splitImg5() {
  const f = 'backend/uploads/bio/pages/img5_upscaled.png';
  const meta = await sharp(f).metadata();
  const midX = Math.round(meta.width / 2);
  await sharp(f).extract({ left: 0, top: 0, width: midX, height: meta.height }).toFile('backend/uploads/bio/pages/img5_left_big.png');
  await sharp(f).extract({ left: midX, top: 0, width: meta.width - midX, height: meta.height }).toFile('backend/uploads/bio/pages/img5_right_big.png');
  console.log('Split img5 into left and right.');
}

splitImg5().catch(console.error);

