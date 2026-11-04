import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793705195438_416f5048.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({ data });
const pdfDoc = await loadingTask.promise;
const page = await pdfDoc.getPage(1);
const operatorList = await page.getOperatorList();
console.log('Operator list fnArray length:', operatorList.fnArray.length);
console.log('Operator list argsArray length:', operatorList.argsArray.length);
// Find paintImageXObject ops
for (let i = 0; i < operatorList.fnArray.length; i++) {
  if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
    console.log('Found paintImageXObject at', i, 'arg:', operatorList.argsArray[i]);
  }
}

