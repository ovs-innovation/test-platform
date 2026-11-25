import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU'
});

const diagramsDir = path.resolve(__dirname, 'ionic_diagrams');
const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));

async function uploadAll() {
  console.log(`Uploading ${files.length} diagrams to Cloudinary folder edvedum/ionic_pyq...`);
  const urlMap = {};

  for (const file of files) {
    const filePath = path.join(diagramsDir, file);
    const key = file.replace('.png', '');
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/ionic_pyq',
        public_id: key,
        overwrite: true
      });
      urlMap[key] = res.secure_url;
      console.log(`Uploaded ${file} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  const outPath = path.resolve(__dirname, 'ionic_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved diagram URLs to ${outPath}`);
}

uploadAll().catch(e => console.error(e));
