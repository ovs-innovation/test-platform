import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function extractRange(targetImage, startQ, endQ, outName, extraInstructions = '') {
  console.log(`Extracting ${outName}: Questions ${startQ} to ${endQ}...`);
  const imageBuffer = fs.readFileSync(targetImage);
  const base64Image = imageBuffer.toString('base64');

  const prompt = `You are a distinguished NEET Physics author preparing interactive CBT practice questions for the chapter "Units and Measurements".
Based on the questions numbered ${startQ} to ${endQ} shown in the worksheet image, formulate each question for our online question bank.

${extraInstructions}

For EACH question from ${startQ} to ${endQ}, output a JSON object:
- "question_number": integer
- "question_type": "mcq" or "assertion_reason"
- "question_text": formatted question statement with clear LaTeX notation ($...$ for math, variables, equations, dimensions)
- "assertion_text": string or null
- "reason_text": string or null
- "options": array of 4 option strings corresponding to options (1), (2), (3), (4)
- "correct_index": 0, 1, 2, or 3
- "difficulty": "easy", "medium", or "hard"
- "topic": physics topic name
- "has_diagram": boolean
- "diagram_description": string or null
- "solution": step-by-step educational solution and derivation justifying the correct answer

Return a clean JSON array of the questions from ${startQ} to ${endQ}. Return ONLY raw JSON, no markdown wrapper.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],
    config: {
      temperature: 0.4,
    },
  });

  let text = (response?.text || response?.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('') || '').trim();
  if (!text) {
    console.error('No text in response. Candidates:', JSON.stringify(response?.candidates, null, 2));
    throw new Error('Gemini response did not contain text');
  }
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const outDir = path.resolve(__dirname, 'units_measurements');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.resolve(outDir, `${outName}.json`);
  fs.writeFileSync(outPath, text, 'utf-8');
  console.log(`Saved ${outName}.json`);
  const parsed = JSON.parse(text);
  console.log(`${outName} extracted ${parsed.length} questions: numbers`, parsed.map(q => q.question_number));
  return parsed;
}

const PARTS = [
  { img: 'page2.png', start: 11, end: 23, name: 'part_11_23' },
  { img: 'page2.png', start: 24, end: 41, name: 'part_24_41' },
  { img: 'page3.png', start: 42, end: 57, name: 'part_42_57' },
  { img: 'page3.png', start: 58, end: 71, name: 'part_58_71' },
  { img: 'page4.png', start: 86, end: 101, name: 'part_86_101' },
  { img: 'page4.png', start: 102, end: 117, name: 'part_102_117' },
  {
    img: 'page5.png',
    start: 118,
    end: 121,
    name: 'part_118_121',
    extra: 'Also extract Section B Assertion-Reason questions 1 to 10. For Section B, set question_type to "assertion_reason", question_number to 122 through 131, include assertion_text and reason_text, and standard 4 A-R options.'
  },
];

async function main() {
  const arg = process.argv[2];
  const rotatedDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/ab738db6-84dd-49de-9771-c93e29ba1c83/scratch/rotated';
  
  if (arg === 'remaining') {
    const remainingParts = PARTS.slice(2); // from part_42_57 onwards
    for (const part of remainingParts) {
      const imgPath = path.resolve(rotatedDir, part.img);
      await extractRange(imgPath, part.start, part.end, part.name, part.extra || '');
      await new Promise(r => setTimeout(r, 2000));
    }
  } else if (arg) {
    const part = PARTS.find(p => p.name === arg);
    if (!part) {
      console.error(`Part ${arg} not found. Available parts:`, PARTS.map(p => p.name));
      process.exit(1);
    }
    const imgPath = path.resolve(rotatedDir, part.img);
    await extractRange(imgPath, part.start, part.end, part.name, part.extra || '');
  } else {
    for (const part of PARTS) {
      const imgPath = path.resolve(rotatedDir, part.img);
      await extractRange(imgPath, part.start, part.end, part.name, part.extra || '');
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

main().catch(err => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
