import sharp from 'sharp';

async function cropImg5() {
  const f = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443531775_c71913ac.jpg';
  const meta = await sharp(f).metadata();
  console.log('Image 5 dimensions:', meta.width, meta.height);
  // Upscale x4 so we can read clearly
  await sharp(f).resize(meta.width * 4, meta.height * 4, { kernel: 'lanczos3' }).toFile('backend/uploads/bio/pages/img5_upscaled.png');
  console.log('Saved img5_upscaled.png');
}

cropImg5().catch(console.error);

