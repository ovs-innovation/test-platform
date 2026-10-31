import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '519659357635739',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Z7wFq9zH8b8bI2L-wN7v3u7k2d0'
});

async function main() {
  console.log('Uploading Biological Classification diagram to Cloudinary...');
  const res = await cloudinary.uploader.upload('backend/uploads/bio/diagrams/bio_q47_diagram.png', {
    folder: 'edvedum_botany/biological_classification',
    public_id: 'bio_q47'
  });
  console.log('bio_q47 Cloudinary URL:', res.secure_url);
}

main().catch(console.error);
