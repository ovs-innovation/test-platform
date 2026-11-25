import fs from 'fs';
import readline from 'readline';

async function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.system_generated/logs/transcript.jsonl'),
    crlfDelay: Infinity
  });
  const inputs = [];
  for await (const l of rl) {
    if (l.includes('"type":"USER_INPUT"')) {
      try {
        inputs.push(JSON.parse(l));
      } catch (e) {}
    }
  }
  console.log("Total user inputs:", inputs.length);
  inputs.slice(-5).forEach(x => console.log(x.step_index, x.created_at, JSON.stringify(x.content), JSON.stringify(x.media)));
}
main();
