import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const rotatedDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/d5ca2a07-dcd1-40f5-92f2-f44308e59fc5/scratch/rotated_plane_part2';
const outDir = path.resolve(__dirname, 'motion_in_plane_part2');
fs.mkdirSync(outDir, { recursive: true });

export const CHUNKS = [
  // Page 3: Q101 - Q116
  { page: 'part2_page3.png', start: 101, end: 106, name: 'chunk_101_106', type: 'mcq' },
  { page: 'part2_page3.png', start: 107, end: 111, name: 'chunk_107_111', type: 'mcq' },
  { page: 'part2_page3.png', start: 112, end: 116, name: 'chunk_112_116', type: 'mcq' },

  // Page 2: Q122 - Q133
  { page: 'part2_page2.png', start: 122, end: 125, name: 'chunk_122_125', type: 'mcq' },
  { page: 'part2_page2.png', start: 126, end: 129, name: 'chunk_126_129', type: 'mcq' },
  { page: 'part2_page2.png', start: 130, end: 133, name: 'chunk_130_133', type: 'mcq' },

  // Page 1: Q138 - Q150
  { page: 'part2_page1.png', start: 138, end: 141, name: 'chunk_138_141', type: 'mcq' },
  { page: 'part2_page1.png', start: 142, end: 145, name: 'chunk_142_145', type: 'mcq' },
  { page: 'part2_page1.png', start: 146, end: 150, name: 'chunk_146_150', type: 'mcq' },

  // Page 4: Section B Assertion - Reason Q1 - Q16
  { page: 'part2_page4.png', start: 1, end: 8, name: 'chunk_ar_1_8', type: 'assertion_reason' },
  { page: 'part2_page4.png', start: 9, end: 16, name: 'chunk_ar_9_16', type: 'assertion_reason' },
];

export async function extractChunk(chunk) {
  const { page, start, end, name, type } = chunk;
  const outPath = path.join(outDir, `${name}.json`);
  if (fs.existsSync(outPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
      if (Array.isArray(existing) && existing.length > 0) {
        console.log(`Chunk ${name} already exists with ${existing.length} questions. Skipping.`);
        return existing;
      }
    } catch {}
  }

  console.log(`Extracting ${name}: Questions ${start} to ${end} (${type}) from ${page}...`);

  const imgPath = path.join(rotatedDir, page);
  const imageBuffer = fs.readFileSync(imgPath);
  const base64Image = imageBuffer.toString('base64');

  let prompt = '';
  if (type === 'assertion_reason') {
    prompt = `You are an expert NEET Physics professor preparing questions for Chapter "motion in a plane".
In the provided image (Section B: Assertion - Reason Type Questions), formulate questions numbered ${start} to ${end}.

For EACH question from ${start} to ${end}:
1. "question_number": integer (${start} to ${end})
2. "question_type": "assertion_reason"
3. "assertion_text": The exact text of the Assertion (A). Use clean LaTeX $...$ for equations/symbols.
4. "reason_text": The exact text of the Reason (R). Use clean LaTeX $...$ for equations/symbols.
5. "question_text": "Assertion (A): [Assertion text]\\nReason (R): [Reason text]"
6. "options": [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "If Assertion is true statement but Reason is false, then mark (3).",
  "If both Assertion and Reason are false statements, then mark (4)."
]
7. "correct_index": integer 0, 1, 2, or 3 corresponding to option (1), (2), (3), or (4). Solve carefully using physics laws.
8. "difficulty": "easy", "medium", or "hard"
9. "topic": Specific physics subtopic (e.g. "Relative Motion", "Uniform Circular Motion", "Projectile Motion", "Vectors")
10. "has_diagram": false
11. "diagram_description": null
12. "solution": Detailed educational step-by-step physics explanation analyzing why Assertion is true/false, Reason is true/false, and if Reason correctly explains Assertion.

Output ONLY a valid JSON array of objects. Return raw JSON, no markdown wrapper.`;
  } else {
    prompt = `You are a distinguished NEET/JEE Physics professor preparing practice questions for Chapter "motion in a plane".
Based on the questions numbered ${start} to ${end} in the provided image of a physics worksheet, formulate each question for our online question bank.

For EACH question from ${start} to ${end}:
1. "question_number": integer (${start} to ${end})
2. "question_type": "mcq"
3. "question_text": The complete, exact question statement. Use clean LaTeX formatting enclosed in $...$ for all math, vectors (\\vec{v}, \\hat{i}, \\hat{j}, \\hat{k}), variables, equations, units, and symbols (e.g. $4\\text{ m/s}$, $\\theta = \\tan^{-1}(0.5)$, $y = ax - bx^2$, etc.). If the question refers to a diagram or graph (like "as shown in figure", "circle of radius", "trajectory"), include that context in the question_text.
4. "options": Array of exactly 4 strings for options (1), (2), (3), (4). Format mathematical expressions with LaTeX $...$.
   - If the options in the worksheet are graphs, set options to ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"] and set has_diagram: true.
5. "correct_index": integer 0, 1, 2, or 3 (0 for (1), 1 for (2), 2 for (3), 3 for (4)). You MUST solve the physics problem carefully using standard kinematics, vector algebra, and 2D projectile/circular motion formulas to determine the mathematically correct answer.
6. "difficulty": "easy", "medium", or "hard"
7. "topic": Specific physics subtopic (e.g. "Projectile Motion", "Uniform Circular Motion", "Relative Velocity", "Vectors", "Kinematics Constraints")
8. "has_diagram": boolean - true if the question or its options include a diagram, figure, or graph.
9. "diagram_description": string describing in detail what the diagram/figure shows, or null if no diagram.
10. "solution": A clear, step-by-step educational solution deriving the answer with 2D kinematics/vector formulas and explaining why this option is correct.

Output ONLY a valid JSON array of objects for questions ${start} to ${end}. Return raw JSON, no markdown wrapper.`;
  }

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
      temperature: 0.1,
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    },
  });

  let raw = response.text?.trim() || '';
  if (raw.startsWith('```json')) {
    raw = raw.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (raw.startsWith('```')) {
    raw = raw.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const parsed = JSON.parse(raw);
  fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
  console.log(`Saved ${name}.json with ${parsed.length} questions:`, parsed.map(q => q.question_number));
  return parsed;
}

async function main() {
  console.log(`Starting extraction for ${CHUNKS.length} chunks...`);
  for (let i = 0; i < CHUNKS.length; i++) {
    const chunk = CHUNKS[i];
    console.log(`--- Processing chunk ${i + 1} of ${CHUNKS.length}: ${chunk.name} ---`);
    try {
      await extractChunk(chunk);
    } catch (e) {
      console.warn(`Error on ${chunk.name}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('ALL CHUNKS PROCESSED!');
}

if (process.argv[1]?.endsWith('extract_plane_part2.mjs')) {
  main().catch(err => {
    console.error('Batch error:', err);
    process.exit(1);
  });
}
