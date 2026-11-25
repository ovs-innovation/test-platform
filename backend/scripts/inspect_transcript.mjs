import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({ 
  input: fs.createReadStream('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.system_generated/logs/transcript.jsonl') 
});

const userInputs = [];
rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      userInputs.push({ 
        step_index: obj.step_index, 
        created_at: obj.created_at,
        content: obj.content ? obj.content.slice(0, 300) : '',
        media: obj.media ? obj.media.length : 0
      });
    }
  } catch(e) {}
});

rl.on('close', () => {
  console.log('Last 5 USER_INPUT steps:');
  console.log(JSON.stringify(userInputs.slice(-5), null, 2));
});
