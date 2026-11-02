import Tesseract from 'tesseract.js';

async function test() {
  const ret = await Tesseract.recognize('backend/uploads/structural_organisation/page_183_hires.png', 'eng');
  console.log(ret.data.text);
}
test().catch(console.error);
