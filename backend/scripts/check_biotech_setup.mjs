import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const subs = await pool.query('SELECT id, name FROM subjects ORDER BY id');
  console.log('Subjects:', subs.rows);
  
  const zoologySub = subs.rows.find(s => s.name.toLowerCase().includes('zool'));
  console.log('Zoology subject in Neon DB:', zoologySub);
  
  if (zoologySub) {
    const chs = await pool.query('SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY id', [zoologySub.id]);
    console.log('Zoology chapters in Neon DB:');
    for (const c of chs.rows) {
      console.log(`  id=${c.id}: "${c.name}"`);
    }
    
    // Check if any Biotechnology exists
    const biotech = chs.rows.filter(c => c.name.toLowerCase().includes('biotech'));
    console.log('Biotech matches in Neon DB:', biotech);
  }
  
  await pool.end();
}

main().catch(console.error);
