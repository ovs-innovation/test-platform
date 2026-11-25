import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';

const buf = fs.readFileSync(PDF_PATH);
console.log('PDF byte length:', buf.length);

// Check for common strings in PDF: /Font, /Text, /Image, /DCTDecode, etc.
const str = buf.toString('latin1');
const fontMatches = str.match(/\/Font/g);
const imageMatches = str.match(/\/Image/g);
const dctMatches = str.match(/\/DCTDecode/g);
const flateMatches = str.match(/\/FlateDecode/g);

console.log('Font count:', fontMatches ? fontMatches.length : 0);
console.log('Image count:', imageMatches ? imageMatches.length : 0);
console.log('DCTDecode count:', dctMatches ? dctMatches.length : 0);
console.log('FlateDecode count:', flateMatches ? flateMatches.length : 0);
