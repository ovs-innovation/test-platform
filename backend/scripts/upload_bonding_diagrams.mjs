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
  const dir = 'uploads/bonding/diagrams';
  const targetFiles = [
    'q7_diagram.png',
    'q47_diagram.png',
    'q86_diagram.png',
    'q98_diagram.png',
    'q100_diagram.png',
    'q115_diagram.png',
    'q120_diagram.png',
    'q278_diagram.png'
  ];

  const map = {};

  for (const f of targetFiles) {
    const id = f.replace('.png', '');
    console.log(`Uploading ${f}...`);
    const res = await cloudinary.uploader.upload(`${dir}/${f}`, {
      folder: 'edvedum_chemistry/bonding',
      public_id: id
    });
    map[id] = res.secure_url;
    console.log(`${id} -> ${res.secure_url}`);
  }

  fs.writeFileSync('scripts/bonding_diagrams_map.json', JSON.stringify(map, null, 2));
  console.log('Saved scripts/bonding_diagrams_map.json');
}

main().catch(console.error);
