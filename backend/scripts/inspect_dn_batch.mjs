import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/dn_ocr.json', 'utf8'));
const key = JSON.parse(fs.readFileSync('backend/scripts/dn_official_key.json', 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/dn_diagram_urls.json', 'utf8'));

export function getQData(qNum) {
  const qKey = `Q${qNum}`;
  const ocrText = ocr[qKey] || '';
  const correctOption = key[qNum] || key[String(qNum)];
  const diagKey = `dn_q${qNum}_diagram`;
  const imageUrl = diagUrls[diagKey] || null;

  return {
    qNum,
    ocrText,
    correctOption,
    imageUrl
  };
}

const qStart = parseInt(process.argv[2] || '1', 10);
const qEnd = parseInt(process.argv[3] || '5', 10);

console.log(`Inspecting Q${qStart} to Q${qEnd}:`);
for (let q = qStart; q <= qEnd; q++) {
  const d = getQData(q);
  console.log(`\n=================== QUESTION ${q} [Official Key: ${d.correctOption}] Diagram: ${d.imageUrl ? 'YES' : 'NO'} ===================`);
  console.log(d.ocrText);
}

