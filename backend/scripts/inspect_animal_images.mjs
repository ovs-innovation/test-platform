import sharp from 'sharp';

const files = [
  'media_1793694321045_4e13bde7.png',
  'media_1793694344487_6914b068.jpg',
  'media_1793694360756_1595a1d1.jpg',
  'media_1793694375869_e1e12c16.png',
  'media_1793694395907_cde93be9.jpg'
];

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const m = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/' + f).metadata();
  console.log(`Image ${i + 1} (${f}): ${m.width} x ${m.height}, channels: ${m.channels}, format: ${m.format}`);
}

