import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794328591592_c4a450b9.pdf';

async function findCoords() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const results = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    let currentMatrix = null;

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];

      if (fn === pdfjsLib.OPS.transform) {
        currentMatrix = args;
      }

      if (
        fn === pdfjsLib.OPS.paintImageXObject ||
        fn === pdfjsLib.OPS.paintInlineImageXObject ||
        fn === pdfjsLib.OPS.paintImageXObjectRepeat
      ) {
        const name = args[0];
        // Skip header/footer logos or QR codes (QR codes are usually small width/height around 100-110 at x > 400 in 1x)
        if (currentMatrix) {
          const [scaleX, , , scaleY, transX, transY] = currentMatrix;
          const pdfY = transY + scaleY;
          const x = transX * 2.0;
          const y = (page.view[3] - pdfY) * 2.0;
          const w = scaleX * 2.0;
          const h = scaleY * 2.0;

          results.push({
            page: p,
            name,
            x: Math.round(x),
            y: Math.round(y),
            w: Math.round(w),
            h: Math.round(h),
            isQR: (x > 900 && w < 200 && h < 200) || (y < 200 && w < 200 && h < 200) || (y > 1500)
          });
        }
      }
    }
  }

  const diagrams = results.filter(r => !r.isQR && r.w > 50 && r.h > 50);
  console.log(`Found ${diagrams.length} question diagrams across pages:`);
  console.log(JSON.stringify(diagrams, null, 2));
  fs.writeFileSync('backend/scripts/rotational_diagram_coords.json', JSON.stringify(diagrams, null, 2));
}

findCoords().catch(console.error);

