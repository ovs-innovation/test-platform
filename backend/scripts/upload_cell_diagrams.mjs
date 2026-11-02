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
  const q175 = await cloudinary.uploader.upload('backend/scripts/cell_q175_chloroplast.png', {
    folder: 'edvedum_botany/cell_unit_of_life',
    public_id: 'q175_chloroplast_diagram'
  });
  console.log('Q175 URL:', q175.secure_url);

  const q189 = await cloudinary.uploader.upload('backend/scripts/cell_q189_mitochondrion.png', {
    folder: 'edvedum_botany/cell_unit_of_life',
    public_id: 'q189_mitochondrion_diagram'
  });
  console.log('Q189 URL:', q189.secure_url);
}

upload().catch(console.error);
