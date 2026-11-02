import sharp from 'sharp';

async function cropTop() {
  const meta = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg').metadata();
  console.log(meta);
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg')
    .extract({ left: 0, top: 0, width: meta.width, height: Math.floor(meta.height * 0.3) })
    .toFile('backend/uploads/body_fluids/img5_top.png');
}

cropTop().catch(console.error);

