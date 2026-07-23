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

      await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, NULL, 'candidate')
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name`,
        ['Demo Candidate', env.seed.candidateEmail]
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
          'JEE & NEET Diagnostic Assessment',
          'A comprehensive diagnostic assessment covering Physics, Chemistry, Mathematics, Botany, and Zoology for JEE and NEET aspirants.',
          'You must remain in fullscreen. Tab switches and copy/paste are logged. Exceeding the violation limit auto-submits your test.',
          60,
          8,
          3,
          true,
          true,
          adminId,
        ]
      );
      const assessmentId = assessmentRes.rows[0].id;

      const sections = [
        { name: 'Physics & Chemistry', type: 'technical_mcq', pos: 1 },
        { name: 'Mathematics', type: 'technical_mcq', pos: 2 },
        { name: 'Botany & Zoology', type: 'technical_mcq', pos: 3 },
      ];
      const sectionIds = {};
      for (const s of sections) {
        const r = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1,$2,$3,$4) RETURNING id`,
          [assessmentId, s.name, s.type, s.pos]
        );
        sectionIds[s.name] = r.rows[0].id;
      }

      const sampleQuestions = [
        { section: 'Physics & Chemistry', type: 'mcq', q: 'If a body starts from rest and moves with a uniform acceleration of 2 m/s², what distance does it cover in 5 seconds?', options: ['10 m', '25 m', '50 m', '100 m'], correct: 1, marks: 4 },
        { section: 'Physics & Chemistry', type: 'integer', q: 'A force of 10 N accelerates a mass of 2 kg. Calculate acceleration in m/s².', numeric_answer: 5, marks: 4 },
        { section: 'Physics & Chemistry', type: 'numerical', q: 'Calculate the de Broglie wavelength (in Angstroms) for V = 100 V.', numeric_answer: 1.23, numerical_tolerance: 0.05, marks: 4 },
        { section: 'Physics & Chemistry', type: 'assertion_reason', q: 'Electrostatic forces are conservative.', assertion_text: 'Electrostatic force field is conservative.', reason_text: 'Work done around any closed loop in electrostatic field is zero.', options: ['Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)', 'Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A)', 'Assertion (A) is true but Reason (R) is false', 'Assertion (A) is false but Reason (R) is true'], correct: 0, marks: 4 },
        { section: 'Mathematics', type: 'mcq', q: 'What are the roots of the quadratic equation x² - 5x + 6 = 0?', options: ['2 and 3', '-2 and -3', '1 and 6', '-1 and -6'], correct: 0, marks: 4 },
        { section: 'Mathematics', type: 'integer', q: 'Evaluate the limit: lim(x->0) (sin(4x) / x).', numeric_answer: 4, marks: 4 },
        { section: 'Botany & Zoology', type: 'mcq', q: 'Which pigment is primarily responsible for light absorption during photosynthesis in green plants?', options: ['Hemoglobin', 'Chlorophyll a', 'Carotenoid', 'Melanin'], correct: 1, marks: 4 },
        { section: 'Botany & Zoology', type: 'multi_select', q: 'Which of the following organelles contain their own DNA?', options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Lysosome'], correct_indices: [0, 1], marks: 4 },
      ];

      let position = 1;
      for (const item of sampleQuestions) {
        await client.query(
          `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, position)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
          [
            assessmentId,
            sectionIds[item.section],
            item.type,
            item.q,
            JSON.stringify(item.options || []),
            item.correct ?? 0,
            JSON.stringify(item.correct_indices || []),
            item.numeric_answer !== undefined ? item.numeric_answer : null,
            item.numerical_tolerance || 0,
            item.assertion_text || null,
            item.reason_text || null,
            item.marks,
            position++,
          ]
        );
      }

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
