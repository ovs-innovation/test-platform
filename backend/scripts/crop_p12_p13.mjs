import sharp from 'sharp';

const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613496592_78f4c103.jpg';

async function crop() {
  const meta = await sharp(img2).metadata();
  console.log('img2:', meta.width, 'x', meta.height);
  const halfW = Math.floor(meta.width / 2);

  // Page 12 (left half)
  await sharp(img2).extract({ left: 0, top: 0, width: Math.floor(halfW / 2), height: meta.height }).toFile('backend/scripts/img2_p12_c1.png');
  await sharp(img2).extract({ left: Math.floor(halfW / 2), top: 0, width: Math.ceil(halfW / 2), height: meta.height }).toFile('backend/scripts/img2_p12_c2.png');

  // Page 13 (right half)
  const rightW = meta.width - halfW;
  await sharp(img2).extract({ left: halfW, top: 0, width: Math.floor(rightW / 2), height: meta.height }).toFile('backend/scripts/img2_p13_c1.png');
  await sharp(img2).extract({ left: halfW + Math.floor(rightW / 2), top: 0, width: Math.ceil(rightW / 2), height: meta.height }).toFile('backend/scripts/img2_p13_c2.png');

  console.log('Done cropping Image 2');
}

crop().catch(console.error);

