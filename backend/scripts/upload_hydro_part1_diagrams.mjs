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

const DIAGRAMS_DIR = path.resolve(__dirname, 'hydro_jee_diagrams');
const OUT_FILE = path.resolve(__dirname, 'hydro_jee_diagram_urls.json');

async function uploadAll() {
  const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.png'));
  console.log(`Uploading ${files.length} diagrams to Cloudinary folder "edvedum/hydro_jee_pyq"...`);

  let urls = {};
  if (fs.existsSync(OUT_FILE)) {
    try { urls = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')); } catch (e) {}
  }

  for (const file of files) {
    const id = file.replace('.png', '');
    if (urls[id]) {
      console.log(`Already uploaded: ${id}`);
      continue;
    }

    const filePath = path.join(DIAGRAMS_DIR, file);
    const uploadRes = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum/hydro_jee_pyq',
      public_id: id,
      overwrite: true,
      resource_type: 'image'
    });

    urls[id] = uploadRes.secure_url;
    console.log(`Uploaded ${id} -> ${uploadRes.secure_url}`);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(urls, null, 2));
  console.log(`Saved ${Object.keys(urls).length} URLs to ${OUT_FILE}`);
}

uploadAll().catch(console.error);
