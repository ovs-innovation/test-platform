import pg from 'pg';
import bcrypt from 'bcryptjs';

async function seedProdDrona() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to production Neon DB (ep-little-hill)...');

    // 1. Create or get batch
    let bRes = await pool.query('SELECT id FROM batches WHERE institution_id = 27 LIMIT 1');
    let batchId;
    if (bRes.rowCount === 0) {
      const nb = await pool.query(
        'INSERT INTO batches (name, batch_name, institution_id, target_exam) VALUES ($1, $2, $3, $4) RETURNING id',
        ['NEET Super 30 Elite', 'NEET Super 30 Elite', 27, 'NEET']
      );
      batchId = nb.rows[0].id;
      console.log('Created batch:', batchId);
    } else {
      batchId = bRes.rows[0].id;
      console.log('Existing batch:', batchId);
    }

    // 2. Hash password
    const hash = await bcrypt.hash('Drona@2026', 10);

    // 3. Insert or update candidate
    let uRes = await pool.query('SELECT id FROM users WHERE email = $1 OR roll_number = $2', ['aarav.singhania@drona.edu', 'DRON-2026-001']);
    let userId;
    if (uRes.rowCount === 0) {
      const nu = await pool.query(
        'INSERT INTO users (name, email, role, institution_id, batch_id, roll_number, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        ['Aarav Singhania', 'aarav.singhania@drona.edu', 'candidate', 27, batchId, 'DRON-2026-001', hash]
      );
      userId = nu.rows[0].id;
      console.log('Created candidate user:', userId);
    } else {
      userId = uRes.rows[0].id;
      await pool.query(
        'UPDATE users SET institution_id = 27, batch_id = $1, roll_number = $2, password_hash = $3 WHERE id = $4',
        [batchId, 'DRON-2026-001', hash, userId]
      );
      console.log('Updated candidate user:', userId);
    }

    // 4. Student profile
    await pool.query(
      'INSERT INTO student_profiles (user_id, roll_number, target_exam) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET roll_number = $2, target_exam = $3',
      [userId, 'DRON-2026-001', 'NEET']
    );
    console.log('Upserted student profile for:', userId);

    // 5. Assign test 41 and 38
    for (const testId of [41, 38]) {
      await pool.query(
        'INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id, missed_access_override) SELECT $1, \'institution\', 27, false WHERE NOT EXISTS (SELECT 1 FROM test_assignments WHERE test_id = $1 AND assigned_to_type = \'institution\' AND assigned_to_id = 27)',
        [testId]
      );
      await pool.query(
        'INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id, missed_access_override) SELECT $1, \'individual\', $2, false WHERE NOT EXISTS (SELECT 1 FROM test_assignments WHERE test_id = $1 AND assigned_to_type = \'individual\' AND assigned_to_id = $2)',
        [testId, userId]
      );
    }
    console.log('Test assignments configured for test 41 and 38');

    // 6. Ensure Drona Academy institution record has logo_url and logo_badge set
    await pool.query(
      'UPDATE institutions SET logo_url = \'/edvedum/drona-academy-logo.svg\', logo_badge = \'DRO\', tagline = \'Premier NEET & Medical Entrance Academy · Kota\' WHERE id = 27'
    );
    console.log('Updated Drona Academy branding in ep-little-hill');

    console.log('ALL OPERATIONS COMPLETED SUCCESSFULLY FOR PRODUCTION DB!');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    await pool.end();
  }
}

seedProdDrona();
