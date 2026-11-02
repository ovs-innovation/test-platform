import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: 'backend/.env' });
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  dotenv.config({ path: '.env' });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '519659357635739',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Z7wFq9zH8b8bI2L-wN7v3u7k2d0'
});

async function main() {
  const dir = 'scripts/complex_pages';
  const targetFiles = [
    'diagram_q30.png',
    'diagram_q40.png',
    'diagram_q48.png',
    'diagram_q57.png',
    'diagram_q61.png',
    'diagram_q64.png',
    'diagram_q71.png'
  ];

  const map = {};

  for (const f of targetFiles) {
    const id = f.replace('diagram_', '').replace('.png', '');
    console.log(`Uploading ${f}...`);
    const res = await cloudinary.uploader.upload(`${dir}/${f}`, {
      folder: 'edvedum_mathematics/complex_numbers',
      public_id: `complex_${id}`
    });
    map[id] = res.secure_url;
    console.log(`${id} -> ${res.secure_url}`);
  }

  fs.writeFileSync('scripts/complex_diagrams_map.json', JSON.stringify(map, null, 2));
  console.log('Saved scripts/complex_diagrams_map.json');
}

main().catch(console.error);

