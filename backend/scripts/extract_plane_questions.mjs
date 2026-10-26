import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const rotatedDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/scratch/rotated_plane';
const outDir = path.resolve(__dirname, 'motion_in_plane');
fs.mkdirSync(outDir, { recursive: true });

export const CHUNKS = [
  // Page 1 (Q1 - Q11)
  { page: 'plane_page1.png', start: 1, end: 7, name: 'chunk_1_7' },
  { page: 'plane_page1.png', start: 8, end: 11, name: 'chunk_8_11' },

  // Page 2 (Q16 - Q31)
  { page: 'plane_page2.png', start: 16, end: 21, name: 'chunk_16_21' },
  { page: 'plane_page2.png', start: 22, end: 26, name: 'chunk_22_26' },
  { page: 'plane_page2.png', start: 27, end: 31, name: 'chunk_27_31' },

  // Page 3 (Q37 - Q51)
  { page: 'plane_page3.png', start: 37, end: 42, name: 'chunk_37_42' },
  { page: 'plane_page3.png', start: 43, end: 46, name: 'chunk_43_46' },
  { page: 'plane_page3.png', start: 47, end: 51, name: 'chunk_47_51' },

  // Page 4 (Q56 - Q70)
  { page: 'plane_page4.png', start: 56, end: 60, name: 'chunk_56_60' },
  { page: 'plane_page4.png', start: 61, end: 64, name: 'chunk_61_64' },
  { page: 'plane_page4.png', start: 65, end: 70, name: 'chunk_65_70' },

  // Page 5 (Q77 - Q95)
  { page: 'plane_page5.png', start: 77, end: 82, name: 'chunk_77_82' },
  { page: 'plane_page5.png', start: 83, end: 89, name: 'chunk_83_89' },
  { page: 'plane_page5.png', start: 90, end: 95, name: 'chunk_90_95' },
];

export async function extractChunk(chunk) {
  const { page, start, end, name } = chunk;
  console.log(`Extracting ${name}: Questions ${start} to ${end} from ${page}...`);

  const imagePath = path.resolve(rotatedDir, page);
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  const prompt = `You are a distinguished NEET/JEE Physics professor preparing practice questions for the chapter "motion in a plane".
Based on the questions numbered ${start} to ${end} in the provided image of a physics worksheet, formulate each question for our online question bank.

For EACH question from ${start} to ${end}:
1. "question_number": integer (${start} to ${end})
2. "question_type": "mcq"
3. "question_text": The complete, exact question statement. Use clean LaTeX formatting enclosed in $...$ for all math, vectors (\\vec{v}, \\hat{i}, \\hat{j}, \\hat{k}), variables, equations, units, and symbols (e.g. $4\\text{ m/s}$, $\\theta = \\tan^{-1}(0.5)$, $y = ax - bx^2$, etc.). If the question refers to a diagram or graph (like "as shown in figure", "circle of radius", "trajectory"), include that context in the question_text.
4. "options": Array of exactly 4 strings for options (1), (2), (3), (4). Format mathematical expressions with LaTeX $...$.
   - If the options in the worksheet are graphs, set options to ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"] and set has_diagram: true.
5. "correct_index": integer 0, 1, 2, or 3 (0 for (1), 1 for (2), 2 for (3), 3 for (4)). You MUST solve the physics problem carefully using standard kinematics, vector algebra, and 2D projectile/circular motion formulas to determine the mathematically correct answer.
6. "difficulty": "easy", "medium", or "hard"
7. "topic": Specific physics subtopic (e.g. "River-Boat Problems", "Projectile Motion", "Uniform Circular Motion", "Relative Motion in 2D", "Vectors and Resolution", "Trajectory Equation")
8. "has_diagram": boolean - true if the question or its options include a diagram, figure, or graph.
9. "diagram_description": string describing in detail what the diagram/figure shows, or null if no diagram.
10. "solution": A clear, step-by-step educational solution deriving the answer with 2D kinematics/vector formulas and explaining why this option is correct.

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

  if (!text) {
    throw new Error(`Empty response for ${name}`);
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
      try {
        await extractChunk(chunk);
      } catch (err) {
        console.warn(`Error on chunk ${chunk.name}:`, err.message);
      }
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

if (process.argv[1]?.endsWith('extract_plane_questions.mjs')) {
  main().catch(err => {
    console.error('Extraction error:', err);
    process.exit(1);
  });
}
