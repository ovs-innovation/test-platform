import { pool } from '../src/config/db.js';
import fs from 'fs';

async function check() {
  const qList = [
    // Image 1: Assertion - Reason (1 to 14)
    { tag: 'AR-1', text: 'Product can form only when the required orientation' },
    { tag: 'AR-2', text: 'law of mass action and rate law expressions are generally same' },
    { tag: 'AR-3', text: 'At very high temperature (approaches to infinity)' },
    { tag: 'AR-4', text: 'Base catalysed hydrolysis of ethyl acetate' },
    { tag: 'AR-5', text: 'The overall order of the reaction is the sum' },
    { tag: 'AR-6', text: 'Rate law for any reaction cannot be predicted theoretically' },
    { tag: 'AR-7', text: 'CH3COOC2H5 + H2O -> CH3COOH + C2H5OH' },
    { tag: 'AR-8', text: 'Rate constant of a zero order reaction has the same unit' },
    { tag: 'AR-9', text: 'The reaction taking place in one step is called elementary' },
    { tag: 'AR-10', text: 'Hydrolysis of esters in acidic medium is a pseudo first order' },
    { tag: 'AR-11', text: 'Reactant have greater energy than product for an exothermic' },
    { tag: 'AR-12', text: 'Decrease in activation energy increases the rate' },
    { tag: 'AR-13', text: 'large fraction of reactant have energy more than that the threshold' },
    { tag: 'AR-14', text: 'fraction of molecule with a given kinetic energy' },

    // Image 2: Questions 94 to 105
    { tag: 'Q94', text: '2NO + Br2 -> 2NOBr' },
    { tag: 'Q95', text: 'initial conc. of unity is reduced to half in 25 s' },
    { tag: 'Q96', text: '8.5' }, // 8.5 x 10^5 e^-15000/T
    { tag: 'Q97', text: '2P + Q -> 3R' },
    { tag: 'Q98', text: 'order with respect to A and B is respectively 1.5 and zero' },
    { tag: 'Q99', text: 'The half life of a first order reaction is 10 minutes. If experiment is started with 0.08' },
    { tag: 'Q100', text: '10 g H2 were taken and after 10 s' },
    { tag: 'Q101', text: 'graph plotted between log K versus 1/T for calculating activation energy' },
    { tag: 'Q102', text: 'For the first order reaction, which one is not correct' },
    { tag: 'Q103', text: 'X -> Y (K1 = 10^10' },
    { tag: 'Q104', text: 'A + B -> C + D + 38 kcal' },
    { tag: 'Q105', text: 'Pressure of A in mm-Hg' }
  ];

  console.log('--- Checking Local DB & Live edvedum.com ---');

  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));
  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Chemistry', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];

  for (const item of qList) {
    const pattern = '%' + item.text.replace(/[^a-zA-Z0-9]/g, '%') + '%';
    const localRes = await pool.query(
      "SELECT id, chapter_id, chapter, question_text FROM question_bank WHERE question_text ILIKE $1",
      [pattern]
    );

    const normItem = item.text.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 30);
    const liveMatch = liveQuestions.find(q => {
      const qNorm = (q.question_text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return qNorm.includes(normItem);
    });

    const localStr = localRes.rows.length > 0 ? `LOCAL: ID ${localRes.rows[0].id} (${localRes.rows[0].chapter})` : 'LOCAL: NOT FOUND';
    const liveStr = liveMatch ? `LIVE: ID ${liveMatch.id} (${liveMatch.chapter})` : 'LIVE: NOT FOUND';

    console.log(`[${item.tag}] ${item.text.slice(0, 40)}...\n    -> ${localStr}\n    -> ${liveStr}`);
  }

  await pool.end();
}

check().catch(console.error);
