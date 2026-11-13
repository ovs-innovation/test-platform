import fs from 'fs';
const lines = fs.readFileSync("C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.system_generated/logs/transcript.jsonl", "utf8").trim().split("\n");
const userInputs = [];
for (let i = 0; i < lines.length; i++) {
  try {
    const d = JSON.parse(lines[i]);
    if (d.type === 'USER_INPUT') {
      userInputs.push({ step: d.step_index, content: d.content, media: d.media });
    }
  } catch(e) {}
}
console.log("Total user inputs:", userInputs.length);
console.log("Last 3 user inputs:");
for (const u of userInputs.slice(-3)) {
  console.log(`Step ${u.step}: ${u.content} (media: ${JSON.stringify(u.media)})`);
}

