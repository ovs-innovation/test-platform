import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const diagramsDir = path.resolve(__dirname, 'biotech_diagrams');
const files = ['q_10.png', 'q_12.png', 'q_25.png', 'q_98.png', 'q_99.png'];
const urls = {};

async function main() {
  console.log('Uploading diagrams to Cloudinary...');
  for (const f of files) {
    const filePath = path.join(diagramsDir, f);
    if (!fs.existsSync(filePath)) {
      console.error(`File missing: ${filePath}`);
      continue;
    }
    const qKey = f.replace('.png', '');
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/questions/biotechnology_principles_and_processes',
        public_id: qKey,
        overwrite: true
      });
      console.log(`Uploaded ${f} -> ${res.secure_url}`);
      urls[qKey] = res.secure_url;
    } catch (err) {
      console.error(`Failed to upload ${f}:`, err.message);
    }
  }

  const outPath = path.resolve(__dirname, 'biotech_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urls, null, 2));
  console.log(`Saved diagram URLs to ${outPath}`);
}

main().catch(console.error);

