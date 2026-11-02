import sharp from 'sharp';

async function cropQ47() {
  const f = 'backend/uploads/bio/pages/img1_bottom_right.png';
  const meta = await sharp(f).metadata();
  console.log('img1_bottom_right dimensions:', meta.width, meta.height);
  // Q47 is at the bottom right corner
  // Let's crop bottom 40% of the image
  const top = Math.round(meta.height * 0.65);
  const height = meta.height - top;
  await sharp(f).extract({ left: 0, top, width: meta.width, height }).toFile('backend/uploads/bio/pages/q47_crop.png');
  console.log('Cropped Q47');
}

cropQ47().catch(console.error);

