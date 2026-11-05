import sharp from 'sharp';

async function testCropQ37() {
  const src = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793696244924_0d7b6a7f.jpg';
  // Page 385 is top-right or bottom-right?
  // Let's check mapping:
  // Item 0: media_1793696244924_0d7b6a7f.jpg
  // Page 382 is top-left, Page 383 is top-right
  // Page 384 is bottom-left, Page 385 is bottom-right!
  // In 385, Q37 is at the top left of page 385:
  // left: 245..360, top: 370..420
  await sharp(src)
    .extract({ left: 245, top: 365, width: 105, height: 45 })
    .resize(420, 180, { kernel: 'lanczos3' })
    .sharpen()
    .toFile('./backend/uploads/animal_kingdom_pages/q37_test.png');
    
  console.log('Saved q37_test.png');
}

testCropQ37().catch(console.error);

