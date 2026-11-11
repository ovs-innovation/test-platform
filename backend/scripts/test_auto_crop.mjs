import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function testAutoCrop() {
  const qList = [1, 3, 6, 7, 9, 12, 13, 19, 20];
  for (const qNum of qList) {
    const slicePath = `backend/scripts/current_electricity_q_slices/q_${qNum}.png`;
    const img = await loadImage(slicePath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imgData.data;

    // Scan horizontal line darkness across the image
    // Skip left margin (x < 60) and right margin (x > img.width - 200 where QR code is)
    const scanLeft = 60;
    const scanRight = Math.floor(img.width * 0.75); // avoid QR code on the right!

    const rowDarkness = [];
    for (let y = 0; y < img.height; y++) {
      let darkCount = 0;
      for (let x = scanLeft; x < scanRight; x++) {
        const idx = (y * img.width + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        // If not white or light background
        if (r < 235 || g < 235 || b < 235) {
          darkCount++;
        }
      }
      rowDarkness.push(darkCount);
    }

    // Let's find rows with significant content
    console.log(`Q${qNum}: slice height = ${img.height}`);
  }
}

testAutoCrop().catch(console.error);

