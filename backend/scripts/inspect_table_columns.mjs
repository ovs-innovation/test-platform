import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const qbCols = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'question_bank'");
console.log('question_bank columns:', qbCols.rows.map(r => r.column_name).join(', '));

const qCols = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'questions'");
console.log('questions columns:', qCols.rows.map(r => r.column_name).join(', '));

await pool.end();
