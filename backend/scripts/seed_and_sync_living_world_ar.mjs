import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STANDARD_OPTIONS = [
  { key: 'A', text: 'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A).' },
  { key: 'B', text: 'Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of Assertion (A).' },
  { key: 'C', text: 'Assertion (A) is true, but Reason (R) is false.' },
  { key: 'D', text: 'Both Assertion (A) and Reason (R) are false.' }
];

const QUESTIONS = [
  {
    qNum: 1,
    assertion: 'The number of common characters is fewer in family than genus.',
    reason: 'Taxon is a taxonomic group of real organisms assigned to a category.',
    correctIndex: 1, // Option B
    solution: 'In taxonomic hierarchy, as we go higher from species to kingdom, the number of common characters goes on decreasing. A family comprises a group of related genera with fewer similarities compared to genus and species. A taxon is a taxonomic group of real biological entities assigned to a category. While both statements are true, the definition of a taxon does not explain why family has fewer common characters than genus. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 2,
    assertion: 'Two plants A and B are treated as two taxonomic species.',
    reason: 'Both A and B are reproductively isolated.',
    correctIndex: 0, // Option A
    solution: "According to the biological species concept, a species consists of natural populations of individuals that can freely interbreed among themselves but are reproductively isolated from other such groups. Therefore, if two plants A and B are reproductively isolated and cannot interbreed to produce fertile progeny, they are treated as two distinct taxonomic species. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    qNum: 3,
    assertion: 'Complexity of classification increases in ascending order.',
    reason: 'Common characters increase in ascending order.',
    correctIndex: 2, // Option C
    solution: 'In ascending order of taxonomic hierarchy (from species up to kingdom), the number of shared common characteristics progressively decreases. Consequently, as category rank increases, it becomes more difficult to determine the relationships between taxa at the same level, making the problem of classification more complex. Therefore, common characters decrease (not increase) in ascending order. Assertion is true, but Reason is false.'
  },
  {
    qNum: 4,
    assertion: 'Properties of cellular organelles are not present in the molecular constituents of the organelle.',
    reason: 'Properties of tissues are present in the constituent cells.',
    correctIndex: 2, // Option C
    solution: 'According to NCERT, properties of tissues are not present in the individual constituent cells, but arise as emergent properties resulting from cellular interactions. Similarly, properties of cellular organelles are not found within their molecular constituents, but emerge from coordinated interactions among those constituent biomolecules. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 5,
    assertion: 'Reproduction is not an all inclusive characteristic of living being.',
    reason: 'Mule, Hinny, Infertile human couples are not able to reproduce.',
    correctIndex: 0, // Option A
    solution: 'While all living beings are composed of cells and metabolize, several living organisms (such as sterile worker bees, mules, hinnies, and infertile human couples) cannot reproduce. Because an organism can be completely alive without possessing the capacity to reproduce, reproduction cannot be considered an all-inclusive defining characteristic of living beings. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 6,
    assertion: 'Growth cannot be taken as defining property of living being.',
    reason: 'Mountains, boulders also show growth.',
    correctIndex: 0, // Option A
    solution: 'If increase in body mass is used as the criterion for growth, non-living entities such as mountains, boulders, and sand dunes also exhibit growth through extrinsic accumulation and deposition of matter on their surfaces. In contrast, living organisms grow intrinsically from within. Because non-living things also show growth, growth cannot be considered a defining property of life. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 7,
    assertion: 'Taxonomic categories are also called broad categories.',
    reason: 'Taxonomists have developed subcategories to facilitate scientific placement of various taxa.',
    correctIndex: 1, // Option B
    solution: 'The major obligate taxonomic categories (Kingdom, Division, Class, Order, Family, Genus, Species) are termed broad categories because each includes a broad spectrum of organisms. To enable more precise and scientific placement of diverse organisms, taxonomists have also established intermediate subcategories (such as suborder, superfamily, subspecies). Both statements are accurate, but the existence of subcategories does not explain why major categories are broad. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 8,
    assertion: 'Polymoniales include Convolvulaceae and Solanaceae.',
    reason: 'It is due to presence of similar floral characters.',
    correctIndex: 0, // Option A
    solution: 'In plant taxonomy, plant families like Convolvulaceae and Solanaceae are grouped together within the order Polymoniales primarily based on shared vegetative and floral characteristics, especially floral similarities. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 9,
    assertion: 'Order is assemblage of families which exhibit many similar characters.',
    reason: 'Order lies below family.',
    correctIndex: 2, // Option C
    solution: 'An order is a higher taxonomic category comprising an assemblage of related families that share certain common aggregates of characters. In the taxonomic hierarchy, Order is situated higher than Family (Class -> Order -> Family -> Genus), so Order lies above family, not below it. Therefore, Assertion is true, but Reason is false.'
  }
];

function cleanStr(s) {
  if (!s) return '';
  return String(s)
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function main() {
  console.log('=== SEEDING & SYNCING THE LIVING WORLD AR QUESTIONS (BOTANY) ===\n');

  // 1. Local Database Insertion (Neon DB)
  const client = await pool.connect();
  let localChapterId;
  let localSubjectId;
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'botany'");
    if (subRes.rows.length === 0) throw new Error("Subject 'Botany' not found locally.");
    localSubjectId = subRes.rows[0].id;

    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) = 'the living world' OR LOWER(name) LIKE '%living world%')",
      [localSubjectId]
    );

    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['The Living World', localSubjectId]
      );
      localChapterId = createChap.rows[0].id;
      console.log(`Created local chapter 'The Living World' (ID: ${localChapterId})`);
    } else {
      localChapterId = chapRes.rows[0].id;
      console.log(`Using existing local chapter '${chapRes.rows[0].name}' (ID: ${localChapterId})`);
    }

    let localInserted = 0;
    for (const q of QUESTIONS) {
      const questionText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE subject_id = $1 AND question_type = 'assertion_reason' AND assertion_text = $2",
        [localSubjectId, q.assertion]
      );

      if (existing.rows.length > 0) {
        await client.query(
          `UPDATE question_bank SET
            question_text = $1, assertion_text = $2, reason_text = $3,
            options = $4, correct_index = $5, correct_indices = $6,
            solution = $7, category = 'Botany', subject = 'Botany',
            chapter = 'The Living World', topic = 'The Living World',
            chapter_id = $8, difficulty = 'medium', marks = 4, status = 'available'
          WHERE id = $9`,
          [
            questionText, q.assertion, q.reason,
            JSON.stringify(STANDARD_OPTIONS), q.correctIndex, JSON.stringify([q.correctIndex]),
            q.solution, localChapterId, existing.rows[0].id
          ]
        );
      } else {
        await client.query(
          `INSERT INTO question_bank (
            question_type, question_text, assertion_text, reason_text, options,
            correct_index, correct_indices, marks, difficulty, category, status,
            solution, subject_id, subject, chapter_id, chapter, topic, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())`,
          [
            'assertion_reason', questionText, q.assertion, q.reason,
            JSON.stringify(STANDARD_OPTIONS), q.correctIndex, JSON.stringify([q.correctIndex]),
            4, 'medium', 'Botany', 'available', q.solution,
            localSubjectId, 'Botany', localChapterId, 'The Living World', 'The Living World'
          ]
        );
      }
      localInserted++;
    }
    console.log(`Successfully seeded ${localInserted}/${QUESTIONS.length} questions in Local/Neon DB.`);
  } finally {
    client.release();
  }

  // 2. Sync to Live (edvedum.com)
  console.log('\n--- Syncing to Live edvedum.com API ---');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain token from live API');

  const liveBotRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveBotData = await liveBotRes.json();
  const liveBotQuestions = liveBotData.questions || [];
  console.log(`Found ${liveBotQuestions.length} total Botany questions on Live.`);

  const liveMap = new Map();
  for (const q of liveBotQuestions) {
    const key = cleanStr(q.assertion_text || q.question_text);
    if (key) liveMap.set(key, q);
  }

  let liveSynced = 0;
  for (const q of QUESTIONS) {
    const questionText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;
    const payload = {
      category: 'Botany',
      subject: 'Botany',
      chapter: 'The Living World',
      topic: 'The Living World',
      subject_id: 10,  // Live Botany ID
      chapter_id: 221, // Live The Living World ID
      question_type: 'assertion_reason',
      question_text: questionText,
      assertion_text: q.assertion,
      reason_text: q.reason,
      options: STANDARD_OPTIONS,
      correct_index: q.correctIndex,
      correct_indices: [q.correctIndex],
      solution: q.solution,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    const key = cleanStr(q.assertion);
    const existing = liveMap.get(key);

    if (existing) {
      console.log(`[Q${q.qNum}] Updating existing Live question ID: ${existing.id}...`);
      const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) liveSynced++;
      else console.error(`Failed to update ${existing.id}:`, await putRes.text());
    } else {
      console.log(`[Q${q.qNum}] Inserting new question: "${q.assertion.slice(0, 40)}..."`);
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id;
        console.log(`  -> Inserted as Live ID: ${newId}`);
        liveSynced++;
      } else {
        console.error('Failed to insert:', await postRes.text());
      }
    }
    await sleep(150);
  }

  console.log(`\nSuccessfully synced ${liveSynced}/${QUESTIONS.length} questions to Live API.`);

  // 3. Final Verification on Live
  const finalBot = await (await fetch(`${LIVE_API}/question-bank?category=Botany`, { headers: { Authorization: `Bearer ${token}` } })).json();
  const finalBotQuestions = finalBot.questions || [];
  const liveLivingAR = finalBotQuestions.filter(q =>
    ((q.chapter || '').toLowerCase().includes('living world') || (q.chapter_name || '').toLowerCase().includes('living world')) &&
    q.question_type === 'assertion_reason'
  );
  console.log(`\nVerified on Live: ${liveLivingAR.length} AR questions in The Living World!`);
  await pool.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

