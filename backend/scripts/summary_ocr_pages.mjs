import fs from 'fs';

for (let i = 1; i <= 14; i++) {
  const p = `backend/uploads/plant/ocr_raw/page_${String(i).padStart(2, '0')}.txt`;
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
    console.log(`=== page_${String(i).padStart(2, '0')}.txt ===`);
    console.log(lines.slice(0, 4).join(' | '));
  }
}

