import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: 'backend/.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '519659357635739',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Z7wFq9zH8b8bI2L-wN7v3u7k2d0'
});

async function main() {
  const dir = 'backend/uploads/breathing/diagrams';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

  const map = {};

  for (const f of files) {
    const id = f.replace('.png', '');
    console.log(`Uploading ${f}...`);
    const res = await cloudinary.uploader.upload(`${dir}/${f}`, {
      folder: 'edvedum_zoology/breathing',
      public_id: id
    });
    map[id] = res.secure_url;
    console.log(`${id} -> ${res.secure_url}`);
  }

  fs.writeFileSync('backend/scripts/breathing_diagrams_map.json', JSON.stringify(map, null, 2));
  console.log('Saved backend/scripts/breathing_diagrams_map.json');
}

main().catch(console.error);
