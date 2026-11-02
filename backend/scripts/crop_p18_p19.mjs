import sharp from 'sharp';

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613303472_98ad8aad.png';

async function crop() {
  const meta = await sharp(img1).metadata();
  console.log('img1:', meta.width, 'x', meta.height);
  const halfW = Math.floor(meta.width / 2);

  // Page 18 (left)
  await sharp(img1).extract({ left: 0, top: 0, width: Math.floor(halfW / 2), height: meta.height }).toFile('backend/scripts/img1_p18_c1.png');
  await sharp(img1).extract({ left: Math.floor(halfW / 2), top: 0, width: Math.ceil(halfW / 2), height: meta.height }).toFile('backend/scripts/img1_p18_c2.png');

  // Page 19 (right)
  const rightW = meta.width - halfW;
  await sharp(img1).extract({ left: halfW, top: 0, width: Math.floor(rightW / 2), height: meta.height }).toFile('backend/scripts/img1_p19_c1.png');
  await sharp(img1).extract({ left: halfW + Math.floor(rightW / 2), top: 0, width: Math.ceil(rightW / 2), height: meta.height }).toFile('backend/scripts/img1_p19_c2.png');

  console.log('Done cropping Image 1 pages 18 & 19');
}

crop().catch(console.error);

