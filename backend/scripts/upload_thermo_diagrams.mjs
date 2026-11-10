import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: 'backend/.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const diagramsDir = 'backend/scripts/thermo_diagrams';
const outMapFile = 'backend/scripts/thermo_diagram_urls.json';

async function uploadAll() {
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  console.log(`Uploading ${files.length} diagrams to Cloudinary...`);

  let urlMap = {};
  if (fs.existsSync(outMapFile)) {
    try {
      urlMap = JSON.parse(fs.readFileSync(outMapFile, 'utf8'));
    } catch (e) {}
  }

  for (const f of files) {
    const key = path.parse(f).name;
    if (urlMap[key]) {
      console.log(`Already uploaded: ${key} -> ${urlMap[key]}`);
      continue;
    }

    const filePath = path.join(diagramsDir, f);
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/questions/heat_thermodynamics',
        public_id: key,
        overwrite: true
      });
      urlMap[key] = res.secure_url;
      console.log(`Uploaded: ${key} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key}:`, err);
    }
  }

  fs.writeFileSync(outMapFile, JSON.stringify(urlMap, null, 2));
  console.log(`Saved mapping to ${outMapFile} with ${Object.keys(urlMap).length} URLs.`);
}

uploadAll().catch(console.error);

