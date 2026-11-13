import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794470772376_d8bf79c5.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Loaded PDF with ${doc.numPages} pages.`);

  const pageReports = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    const ops = await page.getOperatorList();
    const textContent = await page.getTextContent();

    // Check for images
    const imageNames = [];
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (
        ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject ||
        ops.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject
      ) {
        imageNames.push(ops.argsArray[i][0]);
      }
    }

    // Text lines
    const textItems = textContent.items.map(item => ({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      w: item.width,
      h: item.height
    }));

    pageReports.push({
      pageNum,
      imageCount: imageNames.length,
      imageNames,
      textCount: textItems.length
    });
  }

  console.log('Page Image Summary:');
  pageReports.forEach(r => {
    console.log(`Page ${r.pageNum}: ${r.imageCount} image(s), ${r.textCount} text items`);
  });
}

main().catch(console.error);

