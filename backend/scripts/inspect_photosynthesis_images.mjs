import sharp from 'sharp';

async function check() {
  const imgs = [
    'media_1793617603527_afd66c8a.png',
    'media_1793617623893_0fdc1417.jpg',
    'media_1793617651306_80292f2d.png'
  ];
  for (const img of imgs) {
    const meta = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/' + img).metadata();
    console.log(img, meta.width, 'x', meta.height);
  }
}

check().catch(console.error);

