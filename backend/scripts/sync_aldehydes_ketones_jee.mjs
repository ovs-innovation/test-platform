import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const datasetPath = path.join(__dirname, 'aldehydes_ketones_jee_final_181.json');
const urlsPath = path.join(__dirname, 'aldehydes_diagram_urls.json');

async function syncAldehydesKetones() {
  console.log('=== SYNCING ALDEHYDES AND KETONES JEE QUESTIONS TO NEON DB ===');
  
  const questions = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  const urls = fs.existsSync(urlsPath) ? JSON.parse(fs.readFileSync(urlsPath, 'utf8')) : {};
  console.log(`Loaded ${questions.length} questions and ${Object.keys(urls).length} Cloudinary URLs.`);

  // Link uploaded scheme and solution URLs
  for (const q of questions) {
    if (q.schemeFile) {
      const k = q.schemeFile.replace('.png', '');
      if (urls[k]) q.image_url = urls[k];
    }
    if (q.solutionFile) {
      const k = q.solutionFile.replace('.png', '');
      if (urls[k]) q.solution_image_url = urls[k];
    }
  }

  // Save back linked dataset
  fs.writeFileSync(datasetPath, JSON.stringify(questions, null, 2));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Resolve Subject Chemistry
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Chemistry' not found!");
    }
    const subjectId = subRes.rows[0].id;
    console.log(`Resolved Subject: Chemistry (ID: ${subjectId})`);

    // 2. Resolve Chapter Aldehydes, Ketones and Carboxylic Acids
    const chRes = await client.query(`
      SELECT id, name FROM chapters 
      WHERE subject_id = $1 AND (
        LOWER(name) LIKE '%aldehyde%' OR LOWER(name) LIKE '%ketone%'
      )
      ORDER BY id ASC
      LIMIT 1
    `, [subjectId]);

    if (chRes.rows.length === 0) {
      throw new Error("Chapter for 'Aldehydes and Ketones' not found!");
    }

    const chapterId = chRes.rows[0].id;
    const chapterName = chRes.rows[0].name;
    console.log(`Resolved Chapter ID ${chapterId} ("${chapterName}").`);

    // 3. Remove old JEE records for this chapter (keeping NEET intact)
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE exam_type = 'JEE' 
        AND chapter_id = $1
    `, [chapterId]);
    console.log(`Removed ${delRes.rowCount} previous JEE question_bank records for ${chapterName}.`);

    // 4. Batch insert all 181 questions
    const batchSize = 35;
    let totalInserted = 0;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const values = [];
      const placeholders = [];
      let paramIdx = 1;

      for (const q of batch) {
        const isNum = q.question_type === 'numerical';
        const optionsJson = JSON.stringify(q.options || []);
        const correctIndex = isNum ? null : q.correct_index;
        const correctIndicesJson = isNum ? '[]' : JSON.stringify(q.correct_indices || [q.correct_index]);
        const numericAnswer = isNum ? (q.numeric_answer !== null ? Number(q.numeric_answer) : null) : null;
        const tolerance = isNum ? 0 : null;

        values.push(
          'Chemistry',                       // $1: category
          isNum ? 'numerical' : 'mcq',       // $2: question_type
          q.question_text,                   // $3: question_text
          optionsJson,                       // $4: options
          correctIndex,                      // $5: correct_index
          correctIndicesJson,                // $6: correct_indices
          numericAnswer,                     // $7: numeric_answer
          tolerance,                         // $8: numerical_tolerance
          null,                              // $9: assertion_text
          null,                              // $10: reason_text
          q.marks || 4,                      // $11: marks
          q.solution || '',                  // $12: solution
          subjectId,                         // $13: subject_id
          chapterId,                         // $14: chapter_id
          'medium',                          // $15: difficulty
          q.image_url || null,               // $16: image_url
          q.solution_image_url || null,      // $17: solution_image_url
          chapterName,                       // $18: chapter
          chapterName,                       // $19: topic
          'JEE',                             // $20: exam_type
          'available'                        // $21: status
        );

        const rowPlaceholders = [];
        for (let p = 0; p < 21; p++) {
          rowPlaceholders.push(`$${paramIdx++}`);
        }
        placeholders.push(`(${rowPlaceholders.join(', ')})`);
      }

      const insertQuery = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, numeric_answer, numerical_tolerance, assertion_text,
          reason_text, marks, solution, subject_id, chapter_id, difficulty,
          image_url, solution_image_url, chapter, topic, exam_type, status
        ) VALUES ${placeholders.join(', ')}
      `;

      const insRes = await client.query(insertQuery, values);
      totalInserted += insRes.rowCount;
      console.log(`Inserted batch ${i + 1}-${i + batch.length} (${totalInserted}/${questions.length})`);
    }

    await client.query('COMMIT');
    console.log(`\nSUCCESS: Successfully committed ${totalInserted} questions to Neon PostgreSQL.`);

    // 5. Verification query
    const vRes = await client.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN question_type = 'mcq' THEN 1 END) as mcq_count,
        COUNT(CASE WHEN question_type = 'numerical' THEN 1 END) as numerical_count,
        COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as with_question_diagrams,
        COUNT(CASE WHEN solution_image_url IS NOT NULL THEN 1 END) as with_solution_diagrams
      FROM question_bank
      WHERE chapter_id = $1 AND exam_type = 'JEE'
    `, [chapterId]);

    console.log('\n--- VERIFICATION IN DATABASE ---');
    console.log('Total JEE questions in chapter:', vRes.rows[0].total);
    console.log('MCQs:', vRes.rows[0].mcq_count);
    console.log('Numericals:', vRes.rows[0].numerical_count);
    console.log('With Question Diagrams:', vRes.rows[0].with_question_diagrams);
    console.log('With Solution Diagrams:', vRes.rows[0].with_solution_diagrams);

    const neetRes = await client.query(`
      SELECT COUNT(*) as neet_total 
      FROM question_bank 
      WHERE chapter_id = $1 AND exam_type = 'NEET'
    `, [chapterId]);
    console.log('NEET questions preserved in chapter:', neetRes.rows[0].neet_total);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('SYNC FAILED, ROLLED BACK:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

syncAldehydesKetones()
  .then(() => {
    console.log('Aldehydes and Ketones sync complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal sync error:', err);
    process.exit(1);
  });
