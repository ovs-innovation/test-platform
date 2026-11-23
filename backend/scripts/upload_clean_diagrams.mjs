import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const DIAG_DIR = path.resolve(__dirname, 'electrostatics_clean_diagrams');
const OUT_MAP = path.resolve(__dirname, 'electrostatics_clean_diagram_urls.json');

async function run() {
  const files = fs.readdirSync(DIAG_DIR).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} clean diagrams to upload.`);

  let urlMap = {};
  if (fs.existsSync(OUT_MAP)) {
    try {
      urlMap = JSON.parse(fs.readFileSync(OUT_MAP, 'utf8'));
    } catch (e) {}
  }

  const toUpload = files.filter(f => !urlMap[f]);
  console.log(`To upload: ${toUpload.length}`);

  const BATCH = 8;
  for (let i = 0; i < toUpload.length; i += BATCH) {
    const batch = toUpload.slice(i, i + BATCH);
    await Promise.all(batch.map(async (file) => {
      const filePath = path.join(DIAG_DIR, file);
      const publicId = path.parse(file).name;
      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'edvedum_physics/electrostatics',
          public_id: publicId,
          overwrite: true,
          resource_type: 'image'
        });
        urlMap[file] = res.secure_url;
        console.log(`Uploaded ${file} -> ${res.secure_url}`);
      } catch (err) {
        console.error(`Error uploading ${file}:`, err.message);
      }
    }));
    fs.writeFileSync(OUT_MAP, JSON.stringify(urlMap, null, 2));
  }

  console.log(`Finished! Total uploaded URLs: ${Object.keys(urlMap).length}`);
}

run().catch(console.error);
