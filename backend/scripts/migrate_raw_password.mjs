import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  console.log('Running migration: adding raw_password to users and student_profiles...');
  
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS raw_password TEXT;`);
  console.log('Added raw_password to users.');

  await pool.query(`ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS raw_password TEXT;`);
  console.log('Added raw_password to student_profiles.');

  const resUsers = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'raw_password'
  `);
  console.log('Verified users.raw_password column:', resUsers.rows);

  const resProfiles = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'student_profiles' AND column_name = 'raw_password'
  `);
  console.log('Verified student_profiles.raw_password column:', resProfiles.rows);

  await pool.end();
}

main().catch(console.error);

