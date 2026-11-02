import sharp from 'sharp';

const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613561303_1c236b6e.png';

async function crop() {
  const meta = await sharp(img4).metadata();
  console.log('img4:', meta.width, 'x', meta.height);
  const halfW = Math.floor(meta.width / 2);

  // Page 20 (left half)
  await sharp(img4).extract({ left: 0, top: 0, width: Math.floor(halfW / 2), height: meta.height }).toFile('backend/scripts/img4_p20_c1.png');
  await sharp(img4).extract({ left: Math.floor(halfW / 2), top: 0, width: Math.ceil(halfW / 2), height: meta.height }).toFile('backend/scripts/img4_p20_c2.png');

  // Page 21 top (right half, top section before SECTION - B)
  const rightW = meta.width - halfW;
  await sharp(img4).extract({ left: halfW, top: 0, width: rightW, height: 320 }).toFile('backend/scripts/img4_p21_top.png');

  // Page 21 bottom (SECTION - B AR questions 1 to 12)
  await sharp(img4).extract({ left: halfW, top: 310, width: rightW, height: meta.height - 310 }).toFile('backend/scripts/img4_p21_ar.png');

  console.log('Done cropping Image 4');
}

crop().catch(console.error);

