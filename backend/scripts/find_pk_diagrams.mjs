import fs from 'fs';

const text = fs.readFileSync('./backend/scripts/plant_kingdom_raw_text.txt', 'utf8');

const regex = /Q(\d+)\.[\s\S]*?(?=Q\d+\.|$)/g;
let match;
const diagramQuestions = [];

while ((match = regex.exec(text)) !== null) {
  const qNum = parseInt(match[1], 10);
  const qBody = match[0];
  if (/diagram|figure|given below and select the correct option giving all the four parts|examine the figure|shown below/i.test(qBody)) {
    diagramQuestions.push({ qNum, sample: qBody.slice(0, 150) });
  }
}

console.log('Questions mentioning diagram or figure:', diagramQuestions);

