import { query } from '../src/config/db.js';

const r = await query("SELECT MIN(id) as min_id, MAX(id) as max_id, COUNT(id) as cnt FROM question_bank WHERE chapter = 'Some Basic Concepts of Chemistry'");
console.log('Local Some Basic Concepts of Chemistry:', r.rows);

const allChem = await query("SELECT chapter, COUNT(id) as cnt FROM question_bank WHERE category = 'Chemistry' GROUP BY chapter ORDER BY cnt DESC");
console.log('\nAll Chemistry Chapters in Local DB:');
allChem.rows.forEach(r => console.log(`  ${r.chapter}: ${r.cnt}`));

process.exit(0);

