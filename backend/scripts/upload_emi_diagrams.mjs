import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '621644782397127',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'n83n92W0D3L9gUu8q9r9q5bY3jI'
});

const srcDir = path.resolve(__dirname, 'emi_diagrams');
const targetLocalDir = path.resolve(__dirname, '../../frontend/public/uploads/emi');
if (!fs.existsSync(targetLocalDir)) {
  fs.mkdirSync(targetLocalDir, { recursive: true });
}

async function uploadAll() {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagrams to upload.`);

  // 1. Copy locally to frontend/public/uploads/emi/
  for (const f of files) {
    fs.copyFileSync(path.join(srcDir, f), path.join(targetLocalDir, f));
  }
  console.log(`Copied ${files.length} diagrams to ${targetLocalDir}`);

  // 2. Upload to Cloudinary
  const urlMap = {};
  for (const f of files) {
    const filePath = path.join(srcDir, f);
    const baseName = path.parse(f).name;
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/questions/emi',
        public_id: baseName,
        overwrite: true,
        resource_type: 'image'
      });
      urlMap[baseName] = res.secure_url;
      console.log(`Uploaded ${baseName} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${baseName}:`, err.message);
      urlMap[baseName] = `/uploads/emi/${f}`;
    }
  }

  const outMapPath = path.resolve(__dirname, 'emi_diagram_urls.json');
  fs.writeFileSync(outMapPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved diagram URLs map to ${outMapPath}`);
}

uploadAll().catch(console.error);
