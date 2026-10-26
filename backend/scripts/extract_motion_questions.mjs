import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const rotatedDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/scratch/rotated';
const outDir = path.resolve(__dirname, 'motion_straight_line');
fs.mkdirSync(outDir, { recursive: true });

export const CHUNKS = [
  // Page 1 (Q1 - Q17)
  { page: 'page1.png', start: 1, end: 6, name: 'chunk_1_6' },
  { page: 'page1.png', start: 7, end: 12, name: 'chunk_7_12' },
  { page: 'page1.png', start: 13, end: 17, name: 'chunk_13_17' },

  // Page 2 (Q18 - Q34)
  { page: 'page2.png', start: 18, end: 25, name: 'chunk_18_25' },
  { page: 'page2.png', start: 26, end: 29, name: 'chunk_26_29' },
  { page: 'page2.png', start: 30, end: 34, name: 'chunk_30_34' },

  // Page 3 (Q35 - Q52)
  { page: 'page3.png', start: 35, end: 43, name: 'chunk_35_43' },
  { page: 'page3.png', start: 44, end: 48, name: 'chunk_44_48' },
  { page: 'page3.png', start: 49, end: 52, name: 'chunk_49_52' },

  // Page 4 (Q53 - Q72)
  { page: 'page4.png', start: 53, end: 57, name: 'chunk_53_57' },
  { page: 'page4.png', start: 58, end: 62, name: 'chunk_58_62' },
  { page: 'page4.png', start: 63, end: 67, name: 'chunk_63_67' },
  { page: 'page4.png', start: 68, end: 72, name: 'chunk_68_72' },

  // Page 5 (Q73 - Q88)
  { page: 'page5.png', start: 73, end: 77, name: 'chunk_73_77' },
  { page: 'page5.png', start: 78, end: 81, name: 'chunk_78_81' },
  { page: 'page5.png', start: 82, end: 85, name: 'chunk_82_85' },
  { page: 'page5.png', start: 86, end: 88, name: 'chunk_86_88' },
];

export async function extractChunk(chunk) {
  const { page, start, end, name } = chunk;
  console.log(`Extracting ${name}: Questions ${start} to ${end} from ${page}...`);

  const imagePath = path.resolve(rotatedDir, page);
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  const prompt = `You are a distinguished NEET/JEE Physics professor preparing practice questions for the chapter "Motion in a straight line".
Based on the questions numbered ${start} to ${end} in the provided image of a physics worksheet, formulate each question for our online question bank.

For EACH question from ${start} to ${end}:
1. "question_number": integer (${start} to ${end})
2. "question_type": "mcq"
3. "question_text": The complete, exact question statement. Use clean LaTeX formatting enclosed in $...$ for all math, variables, equations, units, and symbols (e.g. $v = \\sqrt{160 - 16x}$, $10\\text{ m/s}$, $t = 2\\text{ s}$, etc.). If the question refers to a diagram or graph (like "as shown in the figure", "velocity-time graph", etc.), include that context in the question_text.
4. "options": Array of exactly 4 strings for options (1), (2), (3), (4). Format mathematical expressions with LaTeX $...$.
   - If the options in the worksheet are graphs (e.g., v-t graphs, a-x graphs, s-t graphs), set options to ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"] or describe the graphs clearly, and set has_diagram: true.
5. "correct_index": integer 0, 1, 2, or 3 (0 for (1), 1 for (2), 2 for (3), 3 for (4)). You MUST solve the physics problem carefully using standard kinematics formulas to determine the mathematically correct answer.
6. "difficulty": "easy", "medium", or "hard"
7. "topic": Specific physics subtopic (e.g. "Relative Velocity", "Uniformly Accelerated Motion", "Non-uniform Acceleration", "Motion Under Gravity", "Kinematic Graphs", "Calculus in Kinematics")
8. "has_diagram": boolean - true if the question or its options include a graph, figure, or diagram.
9. "diagram_description": string describing in detail what the diagram/graph shows (axes, curves, key coordinate points, intercepts, labels), or null if no diagram.
10. "solution": A clear, step-by-step educational solution deriving the answer with kinematics formulas and explaining why this option is correct.

Output ONLY a valid JSON array of objects for questions ${start} to ${end}. Return raw JSON, no markdown wrapper.`;

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
          { text: prompt },
        ],
      },
    ],
    config: {
      temperature: 0.2,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });

  let text = (response?.text || response?.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('') || '').trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const outPath = path.resolve(outDir, `${name}.json`);
  fs.writeFileSync(outPath, text, 'utf-8');
  const parsed = JSON.parse(text);
  console.log(`Saved ${name}.json with ${parsed.length} questions:`, parsed.map(q => q.question_number));
  return parsed;
}

async function main() {
  const target = process.argv[2];
  if (target === 'all') {
    for (const chunk of CHUNKS) {
      await extractChunk(chunk);
      await new Promise(r => setTimeout(r, 2000));
    }
  } else if (target) {
    const chunk = CHUNKS.find(c => c.name === target || String(c.start) === target);
    if (!chunk) throw new Error(`Chunk ${target} not found`);
    await extractChunk(chunk);
  } else {
    // Default test run on chunk 1
    await extractChunk(CHUNKS[0]);
  }
}

if (process.argv[1]?.endsWith('extract_motion_questions.mjs')) {
  main().catch(err => {
    console.error('Extraction error:', err);
    process.exit(1);
  });
}
