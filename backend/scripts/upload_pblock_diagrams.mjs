import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const itemsToUpload = [
  { id: 'q118_opt_a', file: 'uploads/p_block/q118_opt_a.png' },
  { id: 'q118_opt_b', file: 'uploads/p_block/q118_opt_b.png' },
  { id: 'q118_opt_c', file: 'uploads/p_block/q118_opt_c.png' },
];

async function main() {
  const urls = {};
  for (const item of itemsToUpload) {
    const fullPath = path.resolve(__dirname, '..', item.file);
    try {
      console.log(`Uploading ${item.id}...`);
      const res = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum/questions/p_block',
        public_id: item.id
      });
      const url = res.secure_url || res.url;
      console.log(`${item.id} uploaded:`, url);
      urls[item.id] = url;
    } catch (err) {
      console.error(`Failed to upload ${item.id}:`, err.message);
      urls[item.id] = `/${item.file}`;
    }
  }

  const outPath = path.resolve(__dirname, 'pblock_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urls, null, 2));
  console.log('Saved Cloudinary URLs to:', outPath);
}

main().catch(console.error);

