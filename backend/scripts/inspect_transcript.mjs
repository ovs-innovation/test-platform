import fs from 'fs';

const lines = fs.readFileSync('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
console.log('Total lines:', lines.length);

for (let i = lines.length - 1; i >= 0; i--) {
  const row = JSON.parse(lines[i]);
  if (row.type === 'USER_INPUT') {
    console.log('Found USER_INPUT at index', i);
    console.log('Step index:', row.step_index);
    console.log('Content:', row.content);
    console.log('Media:', row.media);
    break;
  }
}

