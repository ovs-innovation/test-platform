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
  const q53 = await cloudinary.uploader.upload('backend/scripts/cell_cycle_q53.png', {
    folder: 'edvedum_botany/cell_cycle_division',
    public_id: 'q53_dna_content_curve'
  });
  console.log('Q53 URL:', q53.secure_url);

  const q123 = await cloudinary.uploader.upload('backend/scripts/cell_cycle_q123.png', {
    folder: 'edvedum_botany/cell_cycle_division',
    public_id: 'q123_stages_diagram'
  });
  console.log('Q123 URL:', q123.secure_url);

  const q149 = await cloudinary.uploader.upload('backend/scripts/cell_cycle_q149.png', {
    folder: 'edvedum_botany/cell_cycle_division',
    public_id: 'q149_pie_chart'
  });
  console.log('Q149 URL:', q149.secure_url);

  const q161 = await cloudinary.uploader.upload('backend/scripts/cell_cycle_q161.png', {
    folder: 'edvedum_botany/cell_cycle_division',
    public_id: 'q161_mitosis_stages'
  });
  console.log('Q161 URL:', q161.secure_url);
}

upload().catch(console.error);

