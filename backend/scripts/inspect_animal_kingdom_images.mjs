import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded';
const files = [
  'media_1793696244924_0d7b6a7f.jpg',
  'media_1793696244935_78a71e13.jpg',
  'media_1793696244939_314d78b8.jpg',
  'media_1793696244944_df7fc51c.jpg',
  'media_1793696244946_f58afdae.jpg'
];

async function inspect() {
  for (const f of files) {
    const fullPath = path.join(uploadedDir, f);
    const meta = await sharp(fullPath).metadata();
    console.log(`${f}: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
}

inspect().catch(console.error);

