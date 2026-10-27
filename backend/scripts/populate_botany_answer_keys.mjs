import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from '@google/genai';
import { query } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGeminiWithTimeout(prompt, timeoutMs = 60000) {
  const apiPromise = ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.1,
    }
  });

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Gemini API call timed out after ${timeoutMs}ms`)), timeoutMs)
  );

  return Promise.race([apiPromise, timeoutPromise]);
}

async function solveBatch(batch, attempt = 1) {
  const prompt = `You are a master NEET / CBSE Biology & Botany educator with encyclopedic knowledge of NCERT Class 11 and 12 Biology textbooks.
Below is a batch of Botany multiple-choice questions from NEET examination preparation.
For each question, accurately determine the correct option index (0 for Option A, 1 for Option B, 2 for Option C, 3 for Option D) based strictly on standard NCERT Biology curriculum.
Also provide a concise 1-sentence solution explanation based on NCERT.

Questions:
${JSON.stringify(batch.map((q) => ({
  id: q.id,
  topic: q.topic || q.chapter || '',
  question: q.question_text,
  options: q.options
})), null, 2)}

Return ONLY a valid JSON array of objects with the exact fields:
- "id": number (the question ID)
- "correct_index": number (0, 1, 2, or 3)
- "solution": string (concise 1-sentence explanation)
`;

  try {
    const response = await callGeminiWithTimeout(prompt, 60000);
    const text = response.text || '';
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error('Gemini response was not an array');
    }
    return parsed;
  } catch (err) {
    if (attempt <= 3) {
      console.warn(`[solveBatch] Error on attempt ${attempt} (${err.message}). Retrying in ${attempt * 3}s...`);
      await sleep(attempt * 3000);
      return solveBatch(batch, attempt + 1);
    }
    throw err;
  }
}

async function main() {
  console.log('--- Resuming Botany Answer Key Generator & Populator ---');

  // Fetch only remaining botany questions missing correct_index
  const questionsRes = await query(`
    SELECT id, question_text, options, topic, chapter, solution
    FROM question_bank
    WHERE category = 'Botany' AND (correct_index IS NULL OR correct_index < 0)
    ORDER BY id ASC
  `);

  const questions = questionsRes.rows;
  console.log(`Found ${questions.length} Botany questions still missing an answer key.`);

  if (questions.length === 0) {
    console.log('All Botany questions already have answer keys!');
    await delCache('cache:qb:*').catch(() => {});
    process.exit(0);
  }

  const BATCH_SIZE = 10;
  const CONCURRENCY = 2;
  let solvedCount = 0;
  let failedCount = 0;

  const chunks = [];
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    chunks.push(questions.slice(i, i + BATCH_SIZE));
  }

  console.log(`Total batches remaining: ${chunks.length} (Batch size: ${BATCH_SIZE}, Concurrency: ${CONCURRENCY})`);

  for (let i = 0; i < chunks.length; i += CONCURRENCY) {
    const slice = chunks.slice(i, i + CONCURRENCY);
    const roundNumber = Math.floor(i / CONCURRENCY) + 1;
    const totalRounds = Math.ceil(chunks.length / CONCURRENCY);

    console.log(`\nProcessing Round ${roundNumber}/${totalRounds} (Batches ${i + 1} to ${Math.min(i + CONCURRENCY, chunks.length)})...`);

    await Promise.all(
      slice.map(async (chunk, chunkIdx) => {
        const batchNum = i + chunkIdx + 1;
        try {
          const results = await solveBatch(chunk);
          
          for (const item of results) {
            const q = chunk.find((x) => x.id === item.id);
            if (!q) continue;

            const opts = Array.isArray(q.options) ? q.options : (typeof q.options === 'string' ? JSON.parse(q.options || '[]') : []);
            let cIdx = Number(item.correct_index);
            if (isNaN(cIdx) || cIdx < 0 || (opts.length > 0 && cIdx >= opts.length)) {
              console.warn(`[Warning] Invalid correct_index ${cIdx} for question ID ${item.id}. Clamping to 0.`);
              cIdx = 0;
            }

            const sol = item.solution || '';
            const correctIndices = JSON.stringify([cIdx]);

            await query(
              `UPDATE question_bank 
               SET correct_index = $1, 
                   correct_indices = $2, 
                   solution = CASE WHEN solution IS NULL OR length(trim(solution)) = 0 THEN $3 ELSE solution END
               WHERE id = $4`,
              [cIdx, correctIndices, sol, item.id]
            );
            solvedCount++;
          }
          console.log(`  ✓ Batch ${batchNum}/${chunks.length} completed (${results.length} questions updated).`);
        } catch (err) {
          console.error(`  ✗ Batch ${batchNum}/${chunks.length} failed:`, err.message);
          failedCount += chunk.length;
        }
      })
    );

    if (i + CONCURRENCY < chunks.length) {
      await sleep(1000);
    }
  }

  console.log('\n--- Invalidation Cache ---');
  try {
    await delCache('cache:qb:*');
    console.log('Successfully invalidated Question Bank cache.');
  } catch (cErr) {
    console.warn('Cache clear warning:', cErr.message);
  }

  console.log('\n=============================================');
  console.log(`Finished processing Botany Answer Keys!`);
  console.log(`Total questions processed: ${questions.length}`);
  console.log(`Successfully updated: ${solvedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log('=============================================\n');

  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
