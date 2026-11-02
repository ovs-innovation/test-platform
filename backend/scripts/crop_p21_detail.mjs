import sharp from 'sharp';

const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613561303_1c236b6e.png';

async function crop() {
  const m4 = await sharp(img4).metadata();
  const halfW = Math.floor(m4.width / 2);
  const rightW = m4.width - halfW;

  // Whole Page 21
  await sharp(img4).extract({ left: halfW, top: 0, width: rightW, height: m4.height }).toFile('backend/scripts/img4_p21_full.png');

  // Page 21 Left column (Q224, Q225, Q226, AR instructions)
  await sharp(img4).extract({ left: halfW, top: 0, width: Math.floor(rightW / 2), height: m4.height }).toFile('backend/scripts/img4_p21_col1.png');

  // Page 21 Right column (AR Q1 to Q12!)
  await sharp(img4).extract({ left: halfW + Math.floor(rightW / 2), top: 0, width: Math.ceil(rightW / 2), height: m4.height }).toFile('backend/scripts/img4_p21_col2.png');

  console.log('Done cropping Page 21');
}

crop().catch(console.error);

