import sharp from 'sharp';

const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613561303_1c236b6e.png';
const img5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613578051_1ead9d80.png';

async function crop() {
  const m4 = await sharp(img4).metadata();
  const halfW4 = Math.floor(m4.width / 2);
  const rightW4 = m4.width - halfW4;

  // Page 21 AR section: y: 310 to end
  const arH = m4.height - 310;
  // AR Q1 to Q6 (left half of Page 21 AR)
  await sharp(img4).extract({ left: halfW4, top: 310, width: Math.floor(rightW4 / 2), height: arH }).toFile('backend/scripts/ar_p21_c1.png');
  // AR Q7 to Q12 (right half of Page 21 AR)
  await sharp(img4).extract({ left: halfW4 + Math.floor(rightW4 / 2), top: 310, width: Math.ceil(rightW4 / 2), height: arH }).toFile('backend/scripts/ar_p21_c2.png');

  // Page 22 AR section: img5
  const m5 = await sharp(img5).metadata();
  console.log('img5:', m5.width, 'x', m5.height);
  const halfW5 = Math.floor(m5.width / 2);
  // AR Q13 to Q19 (left column of Page 22)
  await sharp(img5).extract({ left: 0, top: 0, width: halfW5, height: m5.height }).toFile('backend/scripts/ar_p22_c1.png');
  // AR Q20 to Q24 (right column of Page 22)
  await sharp(img5).extract({ left: halfW5, top: 0, width: m5.width - halfW5, height: m5.height }).toFile('backend/scripts/ar_p22_c2.png');

  console.log('Done cropping AR sections');
}

crop().catch(console.error);

