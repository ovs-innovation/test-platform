import sharp from 'sharp';

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613303472_98ad8aad.png';
const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793613561303_1c236b6e.png';

async function crop() {
  const m1 = await sharp(img1).metadata();
  console.log('img1:', m1.width, 'x', m1.height);
  const m4 = await sharp(img4).metadata();
  console.log('img4:', m4.width, 'x', m4.height);

  // Q200 diagram:
  // In img1 (906x613):
  await sharp(img1)
    .extract({ left: 55, top: 375, width: 145, height: 155 })
    .toFile('backend/scripts/cell_q200_er_nucleus.png');

  // Q221 plant cell diagram:
  // In img4 (710x493):
  await sharp(img4)
    .extract({ left: 190, top: 105, width: 140, height: 135 })
    .toFile('backend/scripts/cell_q221_plant_cell.png');

  console.log('Done test crops');
}

crop().catch(console.error);
