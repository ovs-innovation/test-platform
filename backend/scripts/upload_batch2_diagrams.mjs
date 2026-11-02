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
  const q200 = await cloudinary.uploader.upload('backend/scripts/cell_q200_er_nucleus.png', {
    folder: 'edvedum_botany/cell_unit_of_life',
    public_id: 'q200_er_nucleus_diagram'
  });
  console.log('Q200 URL:', q200.secure_url);

  const q221 = await cloudinary.uploader.upload('backend/scripts/cell_q221_plant_cell.png', {
    folder: 'edvedum_botany/cell_unit_of_life',
    public_id: 'q221_plant_cell_diagram'
  });
  console.log('Q221 URL:', q221.secure_url);
}

upload().catch(console.error);

