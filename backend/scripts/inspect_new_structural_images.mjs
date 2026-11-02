import sharp from 'sharp';

const files = [
  'media_1793452196796_428f3b20.png',
  'media_1793452210534_f99b13f6.jpg',
  'media_1793452226900_96046d93.png'
];

const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function inspect() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const meta = await sharp(basePath + f).metadata();
    console.log(`Image ${i + 1}: ${f} -> ${meta.width} x ${meta.height}`);
  }
}
inspect().catch(console.error);

