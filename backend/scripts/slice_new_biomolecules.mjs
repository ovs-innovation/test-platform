import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function sliceAll() {
  // Image 3: Page 216 & 217 (690 x 473)
  const img3 = sharp(base + 'media_1793681431118_b4182fec.png');
  await img3.clone().extract({ left: 0, top: 0, width: 172, height: 473 }).resize(688, 1892).sharpen().toFile(path.join(__dirname, 'p216_c1.png'));
  await img3.clone().extract({ left: 172, top: 0, width: 173, height: 473 }).resize(692, 1892).sharpen().toFile(path.join(__dirname, 'p216_c2.png'));
  await img3.clone().extract({ left: 345, top: 0, width: 172, height: 473 }).resize(688, 1892).sharpen().toFile(path.join(__dirname, 'p217_c1.png'));
  await img3.clone().extract({ left: 517, top: 0, width: 173, height: 473 }).resize(692, 1892).sharpen().toFile(path.join(__dirname, 'p217_c2.png'));

  // Image 2: Page 218 & 219 (682 x 470)
  const img2 = sharp(base + 'media_1793681371635_c2da21fc.png');
  await img2.clone().extract({ left: 0, top: 0, width: 170, height: 470 }).resize(680, 1880).sharpen().toFile(path.join(__dirname, 'p218_c1.png'));
  await img2.clone().extract({ left: 170, top: 0, width: 171, height: 470 }).resize(684, 1880).sharpen().toFile(path.join(__dirname, 'p218_c2.png'));
  await img2.clone().extract({ left: 341, top: 0, width: 170, height: 470 }).resize(680, 1880).sharpen().toFile(path.join(__dirname, 'p219_c1.png'));
  await img2.clone().extract({ left: 511, top: 0, width: 171, height: 470 }).resize(684, 1880).sharpen().toFile(path.join(__dirname, 'p219_c2.png'));

  // Image 1: Page 220 & 221 (672 x 463)
  const img1 = sharp(base + 'media_1793681357680_4efdf92e.jpg');
  await img1.clone().extract({ left: 0, top: 0, width: 168, height: 463 }).resize(672, 1852).sharpen().toFile(path.join(__dirname, 'p220_c1.png'));
  await img1.clone().extract({ left: 168, top: 0, width: 168, height: 463 }).resize(672, 1852).sharpen().toFile(path.join(__dirname, 'p220_c2.png'));
  await img1.clone().extract({ left: 336, top: 0, width: 168, height: 463 }).resize(672, 1852).sharpen().toFile(path.join(__dirname, 'p221_c1.png'));
  await img1.clone().extract({ left: 504, top: 0, width: 168, height: 463 }).resize(672, 1852).sharpen().toFile(path.join(__dirname, 'p221_c2.png'));

  // Image 4: Page 224 (332 x 361)
  const img4 = sharp(base + 'media_1793681444508_7ad6a6b4.png');
  await img4.clone().extract({ left: 0, top: 0, width: 166, height: 361 }).resize(664, 1444).sharpen().toFile(path.join(__dirname, 'p224_c1.png'));
  await img4.clone().extract({ left: 166, top: 0, width: 166, height: 361 }).resize(664, 1444).sharpen().toFile(path.join(__dirname, 'p224_c2.png'));

  console.log('All new pages sliced cleanly into columns!');
}

sliceAll().catch(console.error);
