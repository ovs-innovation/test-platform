import sharp from 'sharp';

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793616792715_17fc438e.jpg';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793616792685_d5a4b635.png';

async function check() {
  const meta1 = await sharp(img1).metadata();
  console.log('Image 1:', meta1.width, meta1.height, meta1.format);

  const meta2 = await sharp(img2).metadata();
  console.log('Image 2:', meta2.width, meta2.height, meta2.format);
}

check().catch(console.error);

