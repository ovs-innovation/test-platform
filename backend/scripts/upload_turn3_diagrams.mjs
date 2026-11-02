import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function upload() {
  const q167 = await cloudinary.uploader.upload('backend/scripts/cell_cycle_q167.png', {
    folder: 'edvedum_botany/cell_cycle_division',
    public_id: 'q167_stages_nodules_chiasmata'
  });
  console.log('Q167 URL:', q167.secure_url);

  const q183 = await cloudinary.uploader.upload('backend/scripts/cell_cycle_q183.png', {
    folder: 'edvedum_botany/cell_cycle_division',
    public_id: 'q183_metaphase_kinetochore_diagram'
  });
  console.log('Q183 URL:', q183.secure_url);
}

upload().catch(console.error);

