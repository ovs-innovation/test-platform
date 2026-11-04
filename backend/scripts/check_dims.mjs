import sharp from 'sharp';

const files = [
  'media_1793689671083_077beaf5.png',
  'media_1793689690510_62326720.jpg',
  'media_1793689934833_c9c37bac.jpg',
  'media_1793689947541_f79ba2b6.png',
  'media_1793689988274_c316d297.jpg'
];

for (const f of files) {
  const m = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/' + f).metadata();
  console.log(f, m.width, 'x', m.height);
}

