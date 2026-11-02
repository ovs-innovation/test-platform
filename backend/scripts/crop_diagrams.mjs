import sharp from 'sharp';

const img = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793611065799_72e05dc5.jpg';

async function crop() {
  // Q175 chloroplast diagram
  await sharp(img)
    .extract({ left: 35, top: 148, width: 120, height: 60 })
    .toFile('backend/scripts/cell_q175_chloroplast.png');

  // Q189 mitochondrion diagram
  await sharp(img)
    .extract({ left: 355, top: 205, width: 160, height: 95 })
    .toFile('backend/scripts/cell_q189_mitochondrion.png');

  console.log('Successfully cropped Q175 and Q189 diagrams');
}

crop().catch(console.error);
