import sharp from 'sharp';
import fs from 'fs';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453893036_d78c9428.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453915968_de55130b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453935381_c8385f14.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png'
];

async function main() {
  const dir = 'backend/uploads/breathing/pages';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Image 1: 446 x 530 (Single page, questions 1-10)
  await sharp(images[0]).toFile(`${dir}/img1_page.png`);

  // Image 2: 477 x 690 - let's see if it is 2 pages (top & bottom or left & right)
  // Look at thumbnail: top is page 226 & 227? Wait! In Image 2, let's look at aspect ratio: 477 wide, 690 high.
  // Wait, let's crop top half and bottom half or inspect thumbnail!
  // In the thumbnail of media_1793453915968_de55130b.png, we see:
  // left is page 226, right is page 227! Wait, 477 wide, 690 high?
  // Let's inspect the layout of Image 2 and Image 3!
}

main().catch(console.error);

