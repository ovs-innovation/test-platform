import fs from 'fs';
import sharp from 'sharp';

// We want to inspect pixel darkness in the slice to find where the diagram is
async function analyzeSlice(qNum) {
  const slicePath = `backend/scripts/capacitor_q_slices/q_${qNum}.png`;
  const img = sharp(slicePath);
  const meta = await img.metadata();
  const raw = await img.raw().toBuffer();

  const width = meta.width;
  const height = meta.height;
  const channels = meta.channels;

  // Find rows where non-white pixels exist (excluding left margin and right QR code)
  // Page width is ~1200 or ~2400? Let's check width:
  // viewport scale 2.0 -> width is 1190 or similar
  const rowCounts = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 60; x < width - 180; x++) { // avoid QR code on right
      const idx = (y * width + x) * channels;
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      // Dark / colored pixels
      if (r < 230 || g < 230 || b < 230) {
        rowCounts[y]++;
      }
    }
  }

  return { width, height, rowCounts };
}

async function main() {
  const diagramQs = [1, 2, 7, 8, 10, 12, 15, 17, 18, 20, 24, 25, 28, 35, 37, 43, 46];
  for (const q of diagramQs) {
    const { width, height, rowCounts } = await analyzeSlice(q);
    console.log(`Q${q}: slice size ${width}x${height}`);
  }
}

main().catch(console.error);
