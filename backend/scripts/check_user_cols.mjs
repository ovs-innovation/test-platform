import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const usersCols = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'users'
    ORDER BY ordinal_position
  `);
  console.log('Columns of users:');
  console.table(usersCols.rows);

  const studentCols = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'student_profiles'
    ORDER BY ordinal_position
  `);
  console.log('Columns of student_profiles:');
  console.table(studentCols.rows);

  await pool.end();
}

main().catch(console.error);

