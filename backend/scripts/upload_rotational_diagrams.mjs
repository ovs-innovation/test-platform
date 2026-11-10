import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const diagramsDir = path.resolve(__dirname, 'rotational_diagrams');
const frontendUploadsDir = path.resolve(__dirname, '../../frontend/public/uploads/rotational_motion');
const outMapFile = path.resolve(__dirname, 'rotational_diagram_urls.json');

if (!fs.existsSync(frontendUploadsDir)) {
  fs.mkdirSync(frontendUploadsDir, { recursive: true });
}

async function uploadAll() {
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagrams to process...`);

  // Copy to frontend public
  for (const f of files) {
    const src = path.join(diagramsDir, f);
    const dest = path.join(frontendUploadsDir, f);
    fs.copyFileSync(src, dest);
  }
  console.log(`Copied ${files.length} diagrams to ${frontendUploadsDir}`);

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
        folder: 'edvedum/questions/rotational_motion',
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

