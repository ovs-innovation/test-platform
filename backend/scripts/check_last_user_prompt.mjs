import fs from 'fs';

const logFile = 'C:/Users/rs004/.gemini/antigravity-ide/brain/39e11379-7ffb-459f-b4f0-6d978d3d1c61/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n');
const userLines = lines.filter(l => l.includes('"USER_INPUT"'));
const last = JSON.parse(userLines[userLines.length - 1]);
console.log('Last USER_INPUT step_index:', last.step_index);
console.log('Content:', last.content);
if (last.files) console.log('Files:', last.files);
if (last.attachments) console.log('Attachments:', last.attachments);
console.log('Keys:', Object.keys(last));
