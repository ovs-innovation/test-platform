import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT 
        COUNT(id) as total_questions,
        COUNT(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END) as questions_with_diagrams,
        COUNT(CASE WHEN difficulty = 'easy' THEN 1 END) as easy_count,
        COUNT(CASE WHEN difficulty = 'medium' THEN 1 END) as medium_count,
        COUNT(CASE WHEN difficulty = 'hard' THEN 1 END) as hard_count
      FROM question_bank 
      WHERE chapter = 'Work, Power and Energy'
    `);
    console.log('Work, Power and Energy Complete Statistics:');
    console.log(res.rows[0]);

    const batchBreakdown = await client.query(`
      SELECT 
        CASE 
          WHEN id BETWEEN 768 AND 830 THEN 'Batch 1 (Q24 - Q86)'
          WHEN id BETWEEN 831 AND 904 THEN 'Batch 2 (Q87 - Q204)'
          WHEN id >= 905 THEN 'Batch 3 (Q272 - Q350 / Sec-B)'
          ELSE 'Other'
        END as batch,
        COUNT(id) as count,
        COUNT(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END) as with_diagram
      FROM question_bank
      WHERE chapter = 'Work, Power and Energy'
      GROUP BY 1
      ORDER BY 1
    `);
    console.log('\nBreakdown by Batch:');
    console.table(batchBreakdown.rows);

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

verify();
