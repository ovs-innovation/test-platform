import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();

const res = await client.query(`
  SELECT id, left(question_text, 35) as q, image_url, solution_image_url 
  FROM question_bank 
  WHERE (image_url IS NOT NULL AND image_url != '') 
     OR (solution_image_url IS NOT NULL AND solution_image_url != '')
  LIMIT 5
`);
console.log('Real image URLs:', res.rows);

await client.end();
