import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query(`
    SELECT chapter, count(*) as count, count(*) filter (where image_url is not null and image_url != '') as with_images
    FROM question_bank 
    WHERE subject = 'Zoology' 
    GROUP BY chapter 
    ORDER BY chapter
  `);
  console.log(res.rows);
  await pool.end();
}

check().catch(console.error);

