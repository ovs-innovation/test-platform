import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const srcDir = path.resolve(__dirname, 'atom_diagrams');
const targetLocalDir = path.resolve(__dirname, '../../frontend/public/uploads/structure_of_atom');
if (!fs.existsSync(targetLocalDir)) {
  fs.mkdirSync(targetLocalDir, { recursive: true });
}

async function uploadAll() {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png'));
  const urlMap = {};

  for (const file of files) {
    const localSrc = path.join(srcDir, file);
    const localDest = path.join(targetLocalDir, file);
    fs.copyFileSync(localSrc, localDest);

    console.log(`Uploading ${file} to Cloudinary...`);
    try {
      const res = await cloudinary.uploader.upload(localSrc, {
        folder: 'edvedum/structure_of_atom',
        public_id: path.basename(file, '.png'),
        overwrite: true
      });
      urlMap[file] = res.secure_url;
      console.log(`Uploaded ${file} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
      urlMap[file] = `/uploads/structure_of_atom/${file}`;
    }
  }

  fs.writeFileSync('backend/scripts/atom_diagram_urls.json', JSON.stringify(urlMap, null, 2), 'utf8');
  console.log('Saved diagram URLs to atom_diagram_urls.json');
}

uploadAll().catch(console.error);
