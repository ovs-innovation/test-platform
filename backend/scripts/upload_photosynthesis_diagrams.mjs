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
  const q15 = await cloudinary.uploader.upload('backend/scripts/diagram_q15.png', {
    folder: 'edvedum_botany/photosynthesis',
    public_id: 'q15_c4_pathway'
  });
  console.log('Q15 URL:', q15.secure_url);

  const q56 = await cloudinary.uploader.upload('backend/scripts/diagram_q56.png', {
    folder: 'edvedum_botany/photosynthesis',
    public_id: 'q56_action_spectrum'
  });
  console.log('Q56 URL:', q56.secure_url);

  const q70 = await cloudinary.uploader.upload('backend/scripts/diagram_q70.png', {
    folder: 'edvedum_botany/photosynthesis',
    public_id: 'q70_photorespiration'
  });
  console.log('Q70 URL:', q70.secure_url);

  const q75 = await cloudinary.uploader.upload('backend/scripts/diagram_q75.png', {
    folder: 'edvedum_botany/photosynthesis',
    public_id: 'q75_z_scheme'
  });
  console.log('Q75 URL:', q75.secure_url);

  const q105 = await cloudinary.uploader.upload('backend/scripts/diagram_q105.png', {
    folder: 'edvedum_botany/photosynthesis',
    public_id: 'q105_absorption_action'
  });
  console.log('Q105 URL:', q105.secure_url);
}

upload().catch(console.error);

