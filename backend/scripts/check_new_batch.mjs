import { query, pool } from '../src/config/db.js';

async function main() {
  const tests = [
    '31 g of ethylene glycol',
    'magnitude of heat of solution on addition',
    'mole fraction of the solvent in a solution decreases',
    'Which one is isotonic with 3 M NaCl',
    'relative lowering of vapour pressure will be in the order',
    'Ethanol water mixture forms minimum boiling',
    'C2H5I and C2H5Br form ideal solution',
    'Molecules of ethanoic acid normally dimerise',
  ];

  for (const t of tests) {
    const res = await query(
      "SELECT id, question_text, assertion_text, chapter FROM question_bank WHERE question_text ILIKE $1 OR assertion_text ILIKE $1",
      [`%${t}%`]
    );
    console.log(`Query "${t}": found ${res.rows.length}`);
    if (res.rows.length) {
      console.log(res.rows);
    }
  }

  await pool.end();
  process.exit(0);
}

main().catch(console.error);
