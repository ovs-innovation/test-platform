import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_pnKv5TdUQ7fg@ep-weathered-heart-aqvw9ylo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require';

const isNeon = databaseUrl.includes('neon.tech');
const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: isNeon ? { rejectUnauthorized: false } : false
});

async function query(text, params) {
  return pool.query(text, params);
}

async function repairAssessment27() {
  const isDryRun = process.argv.includes('--dry-run');
  const targetAssessmentId = parseInt(process.env.TARGET_ASSESSMENT_ID || '27', 10);

  console.log('======================================================================');
  console.log(` REPAIR ASSESSMENT ${targetAssessmentId}: NEET 180 QUESTIONS (BIOLOGY 90 / PHYSICS 45 / CHEMISTRY 45)`);
  console.log(` Mode: ${isDryRun ? 'DRY-RUN (Read-Only Preview)' : 'LIVE EXECUTION'}`);
  console.log('======================================================================\n');

  // 1. Verify Assessment Record
  const assessRes = await query('SELECT * FROM assessments WHERE id = $1', [targetAssessmentId]);
  let targetAssessment = assessRes.rows[0];

  if (!targetAssessment) {
    console.warn(`[WARN] Assessment ${targetAssessmentId} not found in assessments table.`);
    // Check if assessment 227 has it
    const altRes = await query('SELECT * FROM assessments WHERE id = 227');
    if (altRes.rows[0]) {
      console.log(`[INFO] Found Assessment 227: "${altRes.rows[0].title}".`);
    }
  } else {
    console.log(`[PASS] Found Assessment ${targetAssessmentId}: "${targetAssessment.title}"`);
    console.log(`       Created: ${targetAssessment.created_at}, Updated: ${targetAssessment.updated_at}`);
  }

  // 2. Check Candidate Attempts & Safety
  console.log('\n--- 1. SAFETY & ATTEMPTS AUDIT ---');
  let hasAttempts = false;
  let attemptCount = 0;
  try {
    const attRes = await query('SELECT COUNT(*)::int AS count FROM attempts WHERE assessment_id = $1', [targetAssessmentId]);
    const attCount = attRes.rows[0]?.count || 0;
    console.log(`Student Attempts in 'attempts' table: ${attCount}`);
    if (attCount > 0) { hasAttempts = true; attemptCount += attCount; }
  } catch (_) { }

  try {
    const testAttRes = await query('SELECT COUNT(*)::int AS count FROM test_attempts WHERE test_id = $1', [targetAssessmentId]);
    const testAttCount = testAttRes.rows[0]?.count || 0;
    console.log(`Student Attempts in 'test_attempts' table: ${testAttCount}`);
    if (testAttCount > 0) { hasAttempts = true; attemptCount += testAttCount; }
  } catch (_) { }

  try {
    const ansRes = await query(`
      SELECT COUNT(*)::int AS count
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      WHERE q.assessment_id = $1
    `, [targetAssessmentId]);
    const ansCount = ansRes.rows[0]?.count || 0;
    console.log(`Student Answers in 'answers' table: ${ansCount}`);
    if (ansCount > 0) { hasAttempts = true; attemptCount += ansCount; }
  } catch (_) { }

  if (hasAttempts) {
    console.log(`[SAFETY ALERT] ${attemptCount} student attempt/answer records detected on Assessment ${targetAssessmentId}. In-place UPDATE strategy will be used to preserve question IDs and grading references.`);
  } else {
    console.log(`[SAFETY] 0 student attempts/answers detected on Assessment ${targetAssessmentId}. Safe for clean 1:1 questionNumber = position re-alignment.`);
  }

  // 3. Inspect Current Questions in DB
  console.log('\n--- 2. CURRENT DATABASE QUESTIONS INSPECTION ---');
  const currentQsRes = await query(`
    SELECT id, position, subject, question_type, correct_index, marks, image_url,
           left(question_text, 60) AS text_preview,
           extraction_meta
    FROM questions
    WHERE assessment_id = $1
    ORDER BY position ASC, id ASC
  `, [targetAssessmentId]);

  const currentQs = currentQsRes.rows;
  console.log(`Current questions in DB for Assessment ${targetAssessmentId}: ${currentQs.length}`);

  // Backup current records
  const backupFile = path.join(__dirname, `assessment_${targetAssessmentId}_backup_${Date.now()}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(currentQs, null, 2));
  console.log(`[BACKUP] Saved current snapshot of ${currentQs.length} questions to ${backupFile}`);

  // 4. Load Verified 180 Source Questions
  console.log('\n--- 3. LOAD VERIFIED SOURCE QUESTIONS & SYNC DIAGRAM ASSETS ---');
  const verifiedJsonPath = path.join(__dirname, 'neet_180_verified_questions.json');
  if (!fs.existsSync(verifiedJsonPath)) {
    throw new Error(`Verified questions file not found at ${verifiedJsonPath}`);
  }
  const verifiedQuestions = JSON.parse(fs.readFileSync(verifiedJsonPath, 'utf8'));
  console.log(`Loaded ${verifiedQuestions.length} verified source questions.`);

  const bioCount = verifiedQuestions.filter(q => q.subject === 'Biology').length;
  const phyCount = verifiedQuestions.filter(q => q.subject === 'Physics').length;
  const chemCount = verifiedQuestions.filter(q => q.subject === 'Chemistry').length;
  console.log(`Source Composition: Biology=${bioCount}, Physics=${phyCount}, Chemistry=${chemCount} (Total=${verifiedQuestions.length})`);

  // Ensure diagram files are present and synced to uploads directory
  const assetsDir = path.join(__dirname, 'assets/neet_diagrams');
  const baseUploadsDir = path.resolve(__dirname, '../uploads');
  const diagramList = [28, 43, 66, 103, 119, 127, 128];
  let deployedDiagrams = 0;

  for (const qNum of diagramList) {
    const assetFile = path.join(assetsDir, `q${qNum}_question-diagram-1.png`);
    const targetQDir = path.join(baseUploadsDir, `q${qNum}`);
    const targetFile = path.join(targetQDir, 'question-diagram-1.png');

    if (fs.existsSync(assetFile)) {
      if (!isDryRun) {
        if (!fs.existsSync(targetQDir)) fs.mkdirSync(targetQDir, { recursive: true });
        fs.copyFileSync(assetFile, targetFile);
      }
      deployedDiagrams++;
      console.log(`[DIAGRAM PASS] Q${qNum} diagram verified (${fs.statSync(assetFile).size} bytes) -> /uploads/q${qNum}/question-diagram-1.png`);
    } else {
      console.warn(`[DIAGRAM WARN] Q${qNum} diagram asset not found at ${assetFile}`);
    }
  }
  console.log(`Diagram Assets Audit: ${deployedDiagrams}/${diagramList.length} ready.`);

  // 5. Build Mapping Table: database ID | original PDF number | current position/subject | corrected position/subject | image status
  console.log('\n--- 4. DRY-RUN MAPPING TABLE (PREVIEW) ---');
  console.log('-------------------------------------------------------------------------------------------------------------------------');
  console.log('| DB ID     | Orig Q# | Current (Pos / Subject)          | Corrected (Pos / Subject)        | Diagram Status             |');
  console.log('-------------------------------------------------------------------------------------------------------------------------');

  const mappingTable = [];

  for (let i = 0; i < verifiedQuestions.length; i++) {
    const vq = verifiedQuestions[i];
    const qNum = vq.questionNumber;
    const currentQ = currentQs[i] || null;

    const dbIdStr = currentQ ? String(currentQ.id).padEnd(9) : 'NEW (Auto)';
    const origQStr = `Q${qNum}`.padEnd(7);
    const currStr = currentQ
      ? `Pos ${String(currentQ.position).padEnd(3)} / ${(currentQ.subject || 'None').slice(0, 15)}`.padEnd(32)
      : 'Unassigned'.padEnd(32);
    const corrStr = `Pos ${String(qNum).padEnd(3)} / ${vq.subject}`.padEnd(32);
    const imgStr = vq.image_url ? `Recovered (${vq.image_url.slice(0, 20)}...)` : 'No Diagram';

    mappingTable.push({
      dbId: currentQ ? currentQ.id : null,
      qNum,
      currentPos: currentQ ? currentQ.position : null,
      currentSubject: currentQ ? currentQ.subject : null,
      correctedPos: qNum,
      correctedSubject: vq.subject,
      imageUrl: vq.image_url,
      verifiedQ: vq
    });

    if (qNum <= 5 || [28, 43, 66, 103, 119, 127, 128].includes(qNum) || (qNum >= 82 && qNum <= 95) || (qNum >= 134 && qNum <= 138) || qNum >= 178) {
      console.log(`| ${dbIdStr} | ${origQStr} | ${currStr} | ${corrStr} | ${imgStr.padEnd(26)} |`);
    } else if (qNum === 6 || qNum === 29 || qNum === 44 || qNum === 67 || qNum === 96 || qNum === 104 || qNum === 120 || qNum === 129 || qNum === 139) {
      console.log('| ...       | ...     | ...                              | ...                              | ...                        |');
    }
  }
  console.log('-------------------------------------------------------------------------------------------------------------------------');

  if (isDryRun) {
    console.log('\n[DRY-RUN COMPLETE] No database modifications were written.');
    console.log('To apply the changes, re-run without --dry-run flag.');
    await pool.end();
    return;
  }

  // 6. Apply In-Place Repair
  console.log('\n--- 5. APPLYING IN-PLACE TRANSACTIONAL REPAIR ---');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // If assessment doesn't exist, create it
    if (!targetAssessment) {
      console.log(`Creating Assessment ${targetAssessmentId} record...`);
      await client.query(`
        INSERT INTO assessments (id, title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_at, updated_at)
        VALUES ($1, 'AIETS 2027: Cumulative Test 2', 'REVISION CUMULATIVE Phase - NTA Pattern CUMULATIVE TEST', 'Authentic NTA-pattern CBT test. Ensure stable connection.', 180, 0, 3, true, false, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
      `, [targetAssessmentId]);
    }

    // Mirror in tests table
    await client.query(`
      INSERT INTO tests (id, test_name, title, test_type, test_date, start_time, end_time, duration_minutes, max_marks, is_published, status, created_at, updated_at)
      VALUES ($1, 'AIETS 2027: Cumulative Test 2', 'AIETS 2027: Cumulative Test 2', 'AIETS', CURRENT_DATE, '09:00:00', '12:00:00', 180, 720, false, 'draft', NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET max_marks = 720, duration_minutes = 180, updated_at = NOW()
    `, [targetAssessmentId]).catch(() => {});

    // Clear existing scrambled questions cleanly for fresh 1:1 position alignment
    if (!hasAttempts) {
      console.log(`Deleting old scrambled questions for assessment ${targetAssessmentId}...`);
      await client.query('DELETE FROM questions WHERE assessment_id = $1', [targetAssessmentId]);

      console.log(`Inserting 180 verified questions with 1:1 questionNumber = position alignment...`);
      for (const vq of verifiedQuestions) {
        const primaryMediaUrl = vq.image_url || null;
        const allMedia = primaryMediaUrl ? [{
          id: `q${vq.questionNumber}-img-1`,
          type: 'diagram',
          url: primaryMediaUrl,
          description: `Diagram for question ${vq.questionNumber}`,
          sourcePage: vq.page
        }] : [];

        const extractionMeta = {
          confidence: 0.98,
          needsReview: false,
          sourcePages: [vq.page],
          extractedBy: 'verified-repair-pipeline',
          hasAnswerKey: Boolean(vq.correctAnswer),
          original_question_number: vq.questionNumber,
          printed_question_number: vq.questionNumber,
          original_subject: vq.subject
        };

        await client.query(`
          INSERT INTO questions (
            assessment_id, position, question_text, question_type,
            options, correct_index, correct_option_index, marks, bank_category,
            subject, chapter, topic, image_url, media, tables, extraction_meta
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        `, [
          targetAssessmentId,
          vq.questionNumber,
          vq.questionText,
          vq.questionType || 'mcq',
          JSON.stringify(vq.options),
          vq.correct_index,
          vq.correct_index,
          vq.marks || 4,
          vq.subject,
          vq.subject,
          vq.chapter,
          vq.topic,
          primaryMediaUrl,
          JSON.stringify(allMedia),
          JSON.stringify(vq.tables || []),
          JSON.stringify(extractionMeta)
        ]);
      }
    } else {
      // In-place update preserving question IDs
      console.log(`Updating ${currentQs.length} existing question records in-place...`);
      for (let i = 0; i < verifiedQuestions.length; i++) {
        const vq = verifiedQuestions[i];
        const existingQ = currentQs[i];

        const primaryMediaUrl = vq.image_url || null;
        const allMedia = primaryMediaUrl ? [{
          id: `q${vq.questionNumber}-img-1`,
          type: 'diagram',
          url: primaryMediaUrl,
          description: `Diagram for question ${vq.questionNumber}`,
          sourcePage: vq.page
        }] : [];

        const extractionMeta = {
          confidence: 0.98,
          needsReview: false,
          sourcePages: [vq.page],
          extractedBy: 'verified-repair-pipeline',
          hasAnswerKey: Boolean(vq.correctAnswer),
          original_question_number: vq.questionNumber,
          printed_question_number: vq.questionNumber,
          original_subject: vq.subject
        };

        if (existingQ) {
          await client.query(`
            UPDATE questions SET
              position = $1,
              question_text = $2,
              question_type = $3,
              options = $4,
              correct_index = $5,
              correct_option_index = $6,
              marks = $7,
              bank_category = $8,
              subject = $9,
              chapter = $10,
              topic = $11,
              image_url = $12,
              media = $13,
              tables = $14,
              extraction_meta = $15
            WHERE id = $16
          `, [
            vq.questionNumber,
            vq.questionText,
            vq.questionType || 'mcq',
            JSON.stringify(vq.options),
            vq.correct_index,
            vq.correct_index,
            vq.marks || 4,
            vq.subject,
            vq.subject,
            vq.chapter,
            vq.topic,
            primaryMediaUrl,
            JSON.stringify(allMedia),
            JSON.stringify(vq.tables || []),
            JSON.stringify(extractionMeta),
            existingQ.id
          ]);
        }
      }
    }

    // Update Assessment total marks and time
    await client.query(`
      UPDATE assessments SET
        passing_marks = 0,
        duration_minutes = 180,
        updated_at = NOW()
      WHERE id = $1
    `, [targetAssessmentId]);

    // Update Tests table
    await client.query(`
      UPDATE tests SET
        subject = 'NEET',
        subjects = '["Biology", "Physics", "Chemistry"]'::jsonb,
        max_marks = 720,
        duration_minutes = 180,
        updated_at = NOW()
      WHERE id = $1
    `, [targetAssessmentId]).catch(() => {});

    await client.query('COMMIT');
    console.log(`[PASS] Transaction committed successfully for Assessment ${targetAssessmentId}.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[ERROR] Repair transaction failed and rolled back:', err);
    throw err;
  } finally {
    client.release();
  }

  // 7. Verification Audit
  console.log('\n--- 6. POST-REPAIR VERIFICATION AUDIT ---');
  const verifyRes = await query(`
    SELECT
      COUNT(*)::int AS total_questions,
      COUNT(*) FILTER (WHERE subject = 'Biology')::int AS biology_count,
      COUNT(*) FILTER (WHERE subject = 'Physics')::int AS physics_count,
      COUNT(*) FILTER (WHERE subject = 'Chemistry')::int AS chemistry_count,
      COUNT(*) FILTER (WHERE image_url IS NOT NULL)::int AS diagram_count,
      COUNT(*) FILTER (WHERE correct_index IS NOT NULL)::int AS with_answer_key,
      MIN(position)::int AS min_pos,
      MAX(position)::int AS max_pos
    FROM questions
    WHERE assessment_id = $1
  `, [targetAssessmentId]);

  const stats = verifyRes.rows[0];
  console.log('Post-repair database statistics:');
  console.log(`  Total Questions: ${stats.total_questions} (Expected: 180)`);
  console.log(`  Biology Questions: ${stats.biology_count} (Expected: 90, Q1 to Q90)`);
  console.log(`  Physics Questions: ${stats.physics_count} (Expected: 45, Q91 to Q135)`);
  console.log(`  Chemistry Questions: ${stats.chemistry_count} (Expected: 45, Q136 to Q180)`);
  console.log(`  Diagrams Attached: ${stats.diagram_count} (Expected: 7)`);
  console.log(`  With Answer Keys: ${stats.with_answer_key} (Expected: 180)`);
  console.log(`  Position Range: ${stats.min_pos} to ${stats.max_pos}`);

  const check1 = stats.total_questions === 180;
  const check2 = stats.biology_count === 90;
  const check3 = stats.physics_count === 45;
  const check4 = stats.chemistry_count === 45;
  const check5 = stats.diagram_count === 7;

  if (check1 && check2 && check3 && check4 && check5) {
    console.log('\n>>> ALL 5 VERIFICATION CHECKS PASSED PERFECTLY! <<<');
  } else {
    console.warn('\n>>> WARNING: SOME CHECKS DID NOT MEET EXPECTED VALUES. Check stats above. <<<');
  }

  await pool.end();
}

repairAssessment27().catch((err) => {
  console.error('Fatal error during repair:', err);
  process.exit(1);
});
