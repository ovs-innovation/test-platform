import sharp from 'sharp';

async function check() {
  const base = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';
  const files = [
    'media_1793681357680_4efdf92e.jpg',
    'media_1793681371635_c2da21fc.png',
    'media_1793681431118_b4182fec.png',
    'media_1793681444508_7ad6a6b4.png'
  ];
  for (const f of files) {
    const meta = await sharp(base + f).metadata();
    console.log(`${f}: ${meta.width} x ${meta.height}`);
  }
}
check().catch(console.error);
