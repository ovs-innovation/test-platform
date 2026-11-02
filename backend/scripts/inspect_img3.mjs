import sharp from 'sharp';

async function inspectImg3() {
  const f = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446826049_70074155.jpg';
  const meta = await sharp(f).metadata();
  console.log('Image 3 dimensions:', meta.width, meta.height);
}

inspectImg3().catch(console.error);

