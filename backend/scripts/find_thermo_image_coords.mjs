import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794314927151_0fe43097.pdf';

async function findCoords() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const results = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 });
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
        if (name !== 'g_d0_img_p1_2' && name !== 'img_p0_2') {
          // Calculate bounding box in 2x canvas pixels
          // Transform matrix: [scaleX, skewY, skewX, scaleY, transX, transY]
          const [scaleX, , , scaleY, transX, transY] = currentMatrix;
          // In PDF coords, (transX, transY) is bottom-left
          // scaleX is width, scaleY is height
          const pdfY = transY + scaleY; // top
          // In 2x canvas:
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
            h: Math.round(h)
          });
        }
      }
    }
  }

  console.log(`Found ${results.length} question diagrams across pages:`);
  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync('backend/scripts/thermo_diagram_coords.json', JSON.stringify(results, null, 2));
}

findCoords().catch(console.error);

