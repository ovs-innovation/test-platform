import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query(`
    SELECT count(*) as total,
           count(*) filter (where image_url is not null and image_url != '') as with_images
    FROM question_bank 
    WHERE subject = 'Zoology' AND (chapter = 'Human Health and Diseases' OR chapter_id = 215)
  `);
  console.log('Final DB count:', res.rows[0]);
  await pool.end();
}

check().catch(console.error);

