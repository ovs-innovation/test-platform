import sharp from 'sharp';

async function scanBounds(page, yMin, yMax, xMin = 60, xMax = 700) {
  const input = `./scripts/biomolecules_rendered_pages/page_${page}.png`;
  const img = sharp(input);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  let top = info.height, bottom = 0, left = info.width, right = 0;
  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Check non-white pixels (not watermark)
      if ((r < 220 || g < 220 || b < 220) && !(r > 200 && g > 200 && b > 200)) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  return { left, top, width: right - left, height: bottom - top };
}

async function main() {
  console.log('Q7 (Page 4, y: 220-450):', await scanBounds(4, 220, 450));
  
  // Q16 on Page 6: options A, B, C, D
  console.log('Q16_A (Page 6, y: 260-490):', await scanBounds(6, 260, 490));
  console.log('Q16_B (Page 6, y: 490-710):', await scanBounds(6, 490, 710));
  console.log('Q16_C (Page 6, y: 710-930):', await scanBounds(6, 710, 930));
  console.log('Q16_D (Page 6, y: 930-1170):', await scanBounds(6, 930, 1170));

  console.log('Q60 (Page 17, y: 640-1035):', await scanBounds(17, 640, 1035));
  console.log('Q70 (Page 19, y: 850-1090):', await scanBounds(19, 850, 1090));
  console.log('Q76 (Page 21, y: 240-635):', await scanBounds(21, 240, 635));
  console.log('Q78 (Page 22, y: 250-660):', await scanBounds(22, 250, 660));
  console.log('Q80 (Page 23, y: 250-660):', await scanBounds(23, 250, 660));
  console.log('Q81 (Page 24, y: 250-580):', await scanBounds(24, 250, 580));
  console.log('Q83 (Page 25, y: 250-695):', await scanBounds(25, 250, 695));
}

main().catch(console.error);

