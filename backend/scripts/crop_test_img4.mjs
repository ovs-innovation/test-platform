import sharp from 'sharp';

async function cropCheck() {
  // Image 4 is 667 x 455.
  // Top-left page is x: 0..333, y: 0..227.
  // Let's crop the top-left area (x: 10, y: 10, width: 300, height: 100)
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg')
    .extract({ left: 10, top: 10, width: 300, height: 100 })
    .toFile('backend/scripts/img4_crop1.png');
  
  console.log('Cropped img4_crop1.png');
}

cropCheck().catch(console.error);

