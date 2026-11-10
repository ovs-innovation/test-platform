import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794297713878_b0f51bef.pdf';

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  fs.writeFileSync('backend/scripts/motion_pdf_text.txt', data.text);
  console.log('PDF text extracted! Number of pages:', data.numpages);
  console.log('Text length:', data.text.length);
}).catch(console.error);
