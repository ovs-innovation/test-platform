import sharp from 'sharp';
import fs from 'fs';

const uploadedDir = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded';

const files = [
  'media_1793696244924_0d7b6a7f.jpg',
  'media_1793696244935_78a71e13.jpg',
  'media_1793696244939_314d78b8.jpg',
  'media_1793696244944_df7fc51c.jpg',
  'media_1793696244946_f58afdae.jpg'
];

async function inspectHeaders() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const fullPath = `${uploadedDir}/${f}`;
    const meta = await sharp(fullPath).metadata();
    
    await sharp(fullPath).extract({ left: 0, top: 0, width: 230, height: 40 })
      .toFile(`./backend/uploads/animal_kingdom_pages/file_${i}_topleft.png`);
    await sharp(fullPath).extract({ left: meta.width - 230, top: 0, width: 230, height: 40 })
      .toFile(`./backend/uploads/animal_kingdom_pages/file_${i}_topright.png`);
    await sharp(fullPath).extract({ left: 0, top: Math.floor(meta.height / 2), width: 230, height: 40 })
      .toFile(`./backend/uploads/animal_kingdom_pages/file_${i}_botleft.png`);
    await sharp(fullPath).extract({ left: meta.width - 230, top: Math.floor(meta.height / 2), width: 230, height: 40 })
      .toFile(`./backend/uploads/animal_kingdom_pages/file_${i}_botright.png`);
      
    console.log(`Processed file ${i}`);
  }
}

inspectHeaders().catch(console.error);
