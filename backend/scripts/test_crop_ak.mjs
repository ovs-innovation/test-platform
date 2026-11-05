import sharp from 'sharp';
import fs from 'fs';

async function testCrop() {
  // Q28 is on page 384
  // Page 384 is bottom-left of media_1793696244924_0d7b6a7f.jpg
  // Let's crop Q28 directly from the original uploaded image with 4x upscale
  const src = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793696244924_0d7b6a7f.jpg';
  
  // In media_1793696244924_0d7b6a7f.jpg (478x682):
  // Page 384 is left=0..239, top=341..682
  // Q28 is in the middle of page 384
  await sharp(src)
    .extract({ left: 30, top: 500, width: 85, height: 35 })
    .resize(340, 140, { kernel: 'lanczos3' })
    .sharpen()
    .toFile('./backend/uploads/animal_kingdom_pages/q28_test.png');
    
  console.log('Saved q28_test.png');
}

testCrop().catch(console.error);

