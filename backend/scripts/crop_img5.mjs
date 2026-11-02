import sharp from 'sharp';

const img5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793611065799_72e05dc5.jpg';

async function crop() {
  const meta = await sharp(img5).metadata();
  console.log('Image 5 meta:', meta);

  const halfW = Math.floor(meta.width / 2);

  // Page 16 (left page): Q174 to Q185
  await sharp(img5).extract({ left: 0, top: 0, width: Math.floor(halfW / 2), height: meta.height }).toFile('backend/scripts/img5_p16_col1.png');
  await sharp(img5).extract({ left: Math.floor(halfW / 2), top: 0, width: Math.ceil(halfW / 2), height: meta.height }).toFile('backend/scripts/img5_p16_col2.png');

  // Page 17 (right page): Q186 to Q196
  const rightW = meta.width - halfW;
  await sharp(img5).extract({ left: halfW, top: 0, width: Math.floor(rightW / 2), height: meta.height }).toFile('backend/scripts/img5_p17_col1.png');
  await sharp(img5).extract({ left: halfW + Math.floor(rightW / 2), top: 0, width: Math.ceil(rightW / 2), height: meta.height }).toFile('backend/scripts/img5_p17_col2.png');

  console.log('Done cropping Image 5');
}

crop().catch(console.error);
