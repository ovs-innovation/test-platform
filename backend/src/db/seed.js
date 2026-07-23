import { pool, withTransaction } from '../config/db.js';
import { env } from '../config/env.js';
import { hashPassword } from '../utils/password.js';
import { seedQuestionBank } from './seedQuestionBank.js';
import { seedPlatform } from './seedPlatform.js';

const seed = async () => {
  try {
    await withTransaction(async (client) => {
      const adminHash = await hashPassword(env.seed.adminPassword);

      const adminRes = await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, 'admin')
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash
         RETURNING id`,
        ['Platform Admin', env.seed.adminEmail, adminHash]
      );
      const adminId = adminRes.rows[0].id;

      const candidateHash = await hashPassword(env.seed.candidatePassword || 'Candidate@123');

      await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, 'candidate')
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash`,
        ['Demo Candidate', env.seed.candidateEmail, candidateHash]
      );

      await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, 'candidate')
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash`,
        ['Isha Sharma', 'isha@gmail.com', candidateHash]
      );

      const existing = await client.query('SELECT COUNT(*)::int AS c FROM assessments');
      if (existing.rows[0].c > 0) {
        console.log('[seed] Assessments already exist, skipping sample data.');
        await seedQuestionBank(client);
        await seedPlatform(client);
        return;
      }

      const assessmentRes = await client.query(
        `INSERT INTO assessments
           (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING id`,
        [
          'Full-Stack Hiring Assessment',
          'A comprehensive hiring assessment covering aptitude, technical, coding, and subjective sections.',
          'You must remain in fullscreen. Tab switches and copy/paste are logged. Exceeding the violation limit auto-submits your test.',
          30,
          8,
          3,
          true,
          true,
          adminId,
        ]
      );
      const assessmentId = assessmentRes.rows[0].id;

      const sections = [
        { name: 'Aptitude', type: 'aptitude', pos: 1 },
        { name: 'Technical MCQ', type: 'technical_mcq', pos: 2 },
        { name: 'Coding', type: 'coding', pos: 3 },
        { name: 'Subjective', type: 'subjective', pos: 4 },
      ];
      const sectionIds = {};
      for (const s of sections) {
        const r = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1,$2,$3,$4) RETURNING id`,
          [assessmentId, s.name, s.type, s.pos]
        );
        sectionIds[s.type] = r.rows[0].id;
      }

      const mcqQuestions = [
        { section: 'aptitude', q: 'If 3x + 5 = 20, what is x?', options: ['3', '5', '7', '15'], correct: 1, marks: 2 },
        { section: 'technical_mcq', q: 'Which HTTP method is idempotent?', options: ['POST', 'PATCH', 'PUT', 'CONNECT'], correct: 2, marks: 2 },
        { section: 'technical_mcq', q: 'What does SQL JOIN do?', options: ['Deletes rows', 'Combines rows from tables', 'Creates indexes', 'Rolls back'], correct: 1, marks: 2 },
      ];

      let position = 1;
      for (const item of mcqQuestions) {
        await client.query(
          `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position)
           VALUES ($1,$2,'mcq',$3,$4,$5,$6,$7)`,
          [assessmentId, sectionIds[item.section], item.q, JSON.stringify(item.options), item.correct, item.marks, position++]
        );
      }

      await client.query(
        `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position, starter_code, test_cases, language)
         VALUES ($1,$2,'coding',$3,'[]',0,4,$4,$5,$6,'javascript')`,
        [
          assessmentId,
          sectionIds.coding,
          'Write a function add(a, b) that returns the sum of two numbers.',
          position++,
          'function add(a, b) {\n  // your code\n}\n',
          JSON.stringify([
            { input: 'add(2, 3)', expected: '5' },
            { input: 'add(10, 15)', expected: '25' },
          ]),
        ]
      );

      await client.query(
        `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position)
         VALUES ($1,$2,'subjective',$3,'[]',0,2,$4)`,
        [
          assessmentId,
          sectionIds.subjective,
          'Describe a challenging technical problem you solved and how you approached it.',
          position++,
        ]
      );

      const inviteRes = await client.query(
        `INSERT INTO candidate_invites (assessment_id, candidate_name, candidate_email, created_by)
         VALUES ($1, $2, $3, $4)
         RETURNING token`,
        [assessmentId, 'Demo Candidate', env.seed.candidateEmail, adminId]
      );

      console.log('[seed] Sample assessment with 4 sections created.');
      console.log(`[seed] Candidate invite link: ${env.inviteBaseUrl}/invite/${inviteRes.rows[0].token}`);

      await seedQuestionBank(client);
      await seedPlatform(client);
    });

    const demoInvite = await pool.query(
      `SELECT ci.token FROM candidate_invites ci WHERE ci.candidate_email = $1 LIMIT 1`,
      [env.seed.candidateEmail]
    );
    if (demoInvite.rowCount === 0) {
      const first = await pool.query('SELECT id FROM assessments ORDER BY id LIMIT 1');
      if (first.rowCount > 0) {
        const inv = await pool.query(
          `INSERT INTO candidate_invites (assessment_id, candidate_name, candidate_email, created_by)
           SELECT $1, 'Demo Candidate', $2, u.id FROM users u WHERE u.role = 'admin' LIMIT 1
           ON CONFLICT (assessment_id, candidate_email) DO NOTHING RETURNING token`,
          [first.rows[0].id, env.seed.candidateEmail]
        );
        if (inv.rowCount > 0) {
          console.log(`[seed] Demo invite: ${env.inviteBaseUrl}/invite/${inv.rows[0].token}`);
        }
      }
    }

    console.log('[seed] Done.');
    console.log(`[seed] Admin login: ${env.seed.adminEmail} / ${env.seed.adminPassword}`);
  } catch (err) {
    console.error('[seed] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

seed();
