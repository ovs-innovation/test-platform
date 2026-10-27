import fs from 'fs';

const logFile = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n');
for (const line of lines) {
  if (line.includes('"step_index":480') || line.includes('"step_index": 480')) {
    const obj = JSON.parse(line);
    console.log('Keys:', Object.keys(obj));
    for (const [k, v] of Object.entries(obj)) {
      if (k !== 'content') {
        console.log(k, ':', JSON.stringify(v).slice(0, 200));
      } else {
        console.log('content type/length:', typeof v, v.length);
      }
    }
    break;
  }
}
