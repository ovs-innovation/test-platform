import fs from 'fs';
import pdf from 'pdf-parse';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795167989020_500877aa.pdf';

const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  console.log('PDF total pages:', data.numpages);
  console.log('Extracted text length:', data.text.length);
  console.log('First 500 chars:', data.text.slice(0, 500));
}).catch(console.error);
