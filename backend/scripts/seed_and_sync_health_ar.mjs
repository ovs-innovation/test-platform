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
    assertion: 'Some growth factors and hormones are considered as tumor promoters.',
    reason: 'All tumors show metagenesis.',
    correctIndex: 2, // Option C
    solution: 'Tumor promoters are agents, including certain growth factors and hormones (such as estrogen), that stimulate cell proliferation and clonal expansion of preneoplastic cells without altering DNA directly. Metagenesis is the alternation of generations observed in cnidarians (such as Obelia), not a feature of tumors. Tumors exhibit metastasis (the spread of malignant cells to secondary sites), not metagenesis, and benign tumors do not metastasize. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 2,
    assertion: 'Morphine has a potent stimulating action on the CNS, producing a sense of euphoria and increased energy.',
    reason: 'Morphine is obtained from Erythroxylum plant, native to South America.',
    correctIndex: 3, // Option D
    solution: 'Cocaine has a potent stimulating action on the central nervous system, producing a sense of euphoria and increased energy, whereas morphine is an opioid that acts as a potent analgesic and depressant that slows down body functions. Furthermore, morphine is extracted from the latex of the opium poppy Papaver somniferum, whereas Erythroxylum coca (native to South America) is the source of cocaine. Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 3,
    assertion: 'IgE antibodies are produced during allergic reactions.',
    reason: 'It is made up of two heavy and two light chains.',
    correctIndex: 1, // Option B
    solution: 'Allergic reactions (type I hypersensitivity) are characterized by the production of IgE antibodies in response to environmental allergens, which bind to high-affinity Fc receptors on mast cells and basophils. Structurally, each IgE antibody molecule is composed of four polypeptide chains: two identical heavy chains (epsilon) and two identical light chains (H2L2). While both statements are true, the basic H2L2 architecture is common to all immunoglobulins and does not explain why IgE specifically mediates allergic reactions. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 4,
    assertion: 'Colostrum is absolutely essential to develop resistance for the new born babies.',
    reason: 'It contains abundant IgA antibodies.',
    correctIndex: 0, // Option A
    solution: "Colostrum, the yellowish fluid secreted by the mammary glands during the initial days of lactation, is crucial for newborns because it provides natural passive immunity. It contains abundant secretory IgA antibodies that protect the newborn's vulnerable gastrointestinal and respiratory mucosa from pathogens while their own immune system is still developing. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    qNum: 5,
    assertion: 'Malaria is a vector borne disease.',
    reason: 'Malaria is caused by Plasmodium parasite.',
    correctIndex: 1, // Option B
    solution: 'Malaria is classified as a vector-borne infectious disease because the causative pathogen is transmitted between human hosts via a biological vector, the female Anopheles mosquito. The causative agent of malaria is the protozoan parasite belonging to the genus Plasmodium (e.g., P. vivax, P. malariae, P. falciparum). Both statements are accurate, but the fact that it is caused by a Plasmodium parasite does not explain why it requires a mosquito vector for transmission. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 6,
    assertion: 'Tobacco smoking is injurious.',
    reason: 'Nicotine of tobacco stimulates the adrenal glands which results in increase in heart rate and blood pressure.',
    correctIndex: 0, // Option A
    solution: 'Tobacco smoking is detrimental to health because tobacco contains nicotine, a potent alkaloid. Nicotine stimulates the adrenal glands to release adrenaline and noradrenaline into the circulation, which constricts blood vessels, increases peripheral vascular resistance, raises blood pressure, and accelerates heart rate, thereby elevating the risk of cardiovascular disease. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 7,
    assertion: 'Pneumonia is a respiratory disorder caused by Haemophilus influenzae leading to severe problems in respiration.',
    reason: 'Alveoli get filled with fluid leading to severe reduction in gaseous exchange.',
    correctIndex: 0, // Option A
    solution: 'Bacterial pneumonia caused by pathogens like Streptococcus pneumoniae and Haemophilus influenzae infects the pulmonary alveoli. In response to infection and inflammation, the alveolar sacs become filled with inflammatory exudate and fluid, drastically reducing the functional surface area available for gas exchange and causing dyspnea and severe respiratory distress. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 8,
    assertion: 'Cancer is one of the most dreaded diseases of human beings.',
    reason: 'Spread occurs through shaking of hands and sexual intercourse.',
    correctIndex: 2, // Option C
    solution: 'Cancer is a major non-communicable disease characterized by uncontrolled cellular proliferation and tissue invasion, remaining one of the leading causes of morbidity and mortality worldwide. Cancer is not a contagious or sexually transmitted infection, and it cannot be transmitted from person to person through casual contact such as handshakes or sexual intercourse. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 9,
    assertion: 'Each antibody has four polypeptide chains, two light and two heavy.',
    reason: 'Antibodies are secreted by T-lymphocytes.',
    correctIndex: 2, // Option C
    solution: 'Each antibody monomer molecule possesses a basic quaternary structure consisting of four polypeptide chains: two identical light chains and two identical heavy chains connected by interchain disulfide bonds (represented as H2L2). Antibodies are synthesized and secreted by effector B-lymphocytes (plasma cells), not by T-lymphocytes (which mediate cell-mediated immunity and provide helper functions). Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 10,
    assertion: 'Epitopes and paratopes are complementary structures of antibodies and antigens respectively.',
    reason: 'Epitopes are antigen binding sites of antibodies.',
    correctIndex: 3, // Option D
    solution: 'An epitope (antigenic determinant) is the specific structural feature located on the surface of an antigen, whereas a paratope is the antigen-binding site located on the hypervariable region of an antibody. Therefore, epitopes belong to antigens and paratopes belong to antibodies, making both Assertion (which reverses them) and Reason (which claims epitopes are on antibodies) false. Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 11,
    assertion: 'HIV viral RNA genome is converted into DNA copy by reverse transcriptase.',
    reason: 'HIV selectively infects and kills B-lymphocytes.',
    correctIndex: 2, // Option C
    solution: 'HIV is a retrovirus possessing an enveloped single-stranded RNA genome that is reverse-transcribed into complementary double-stranded viral DNA by the enzyme reverse transcriptase upon entry into host cells. HIV selectively binds to CD4 receptors and infects helper T-lymphocytes (TH cells) and macrophages, not B-lymphocytes. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 12,
    assertion: 'The cancer patients are given substances such as α-interferons.',
    reason: 'Tumor cells have been shown to avoid detection and destruction by immune system.',
    correctIndex: 0, // Option A
    solution: 'Tumor cells often evade host immune surveillance by downregulating MHC class I antigens or producing immunosuppressive factors. To overcome this immune evasion, cancer patients are treated with biological response modifiers such as alpha-interferon (alpha-IFN), which enhances the cytotoxic activity of natural killer cells and macrophages and stimulates the immune system to recognize and destroy neoplastic cells. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 13,
    assertion: 'The cell mediated immune response is responsible for the graft rejection in humans.',
    reason: "During graft rejection the body is not able to differentiate 'self' and 'non-self'.",
    correctIndex: 2, // Option C
    solution: 'Graft rejection following organ transplantation is primarily mediated by the cell-mediated immune response, driven by cytotoxic T-lymphocytes that identify foreign human leukocyte antigens (HLA) on the donor tissue. Rejection occurs precisely because the immune system can successfully distinguish self from non-self, mounting an attack against the foreign donor tissue. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 14,
    assertion: 'The immune response of old person becomes weak.',
    reason: 'Thymus is degenerated in old individual.',
    correctIndex: 0, // Option A
    solution: 'The thymus gland plays an essential role in the differentiation and maturation of T-lymphocytes and secretes the peptide hormone thymosin. With advancing age, the thymus undergoes progressive involution (degeneration) and is largely replaced by adipose tissue, resulting in reduced thymosin secretion and diminished T-cell development, which weakens cell-mediated and humoral immunity in elderly individuals. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 15,
    assertion: 'Macrophages act like a HIV factory.',
    reason: 'The HIV virus enters into macrophages where RNA genome of virus replicates to form viral RNA with the help of enzyme reverse transcriptase.',
    correctIndex: 2, // Option C
    solution: "Macrophages act as long-term reservoirs for HIV and continuously shed newly assembled virions without undergoing immediate lysis, thus functioning like a 'HIV factory'. However, reverse transcriptase synthesizes complementary viral DNA from the viral RNA template (not viral RNA from viral RNA). Therefore, Assertion is true, but Reason is false."
  },
  {
    qNum: 16,
    assertion: "Mother's milk is considered very essential for the new born infant.",
    reason: 'The yellowish fluid colostrum secreted by mother during initial days of lactation has abundant antibodies (IgA) to protect the infant.',
    correctIndex: 0, // Option A
    solution: "Breast milk, especially the colostrum secreted during the first several days postpartum, is rich in secretory IgA antibodies, lactoferrin, and lysozyme. These immunoglobulins provide passive immunity that lines the newborn's gut, preventing pathogen attachment and systemic infection while the infant's adaptive immune system is immature. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    qNum: 17,
    assertion: 'Smoking is associated with gastric ulcer.',
    reason: 'Tobacco contains a large number of chemical substances including nicotine, a terpenoid.',
    correctIndex: 2, // Option C
    solution: 'Chronic smoking stimulates gastric acid secretion, inhibits pancreatic bicarbonate production, and impairs mucosal blood flow, significantly increasing the incidence and recurrence of gastric and duodenal peptic ulcers. While tobacco contains numerous toxins, nicotine is chemically a pyridine-pyrrolidine alkaloid, not a terpenoid. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 18,
    assertion: 'Cellular barriers like PMNLs-Neutrophils provide non- specific immunity.',
    reason: 'Cellular barriers belong to the category of innate immunity which is acquired after birth.',
    correctIndex: 2, // Option C
    solution: 'Cellular barriers consisting of polymorphonuclear leukocytes (PMNL-neutrophils), monocytes, and tissue macrophages provide non-specific, first-line phagocytic defense against a wide spectrum of microbial invaders. However, innate immunity is an inborn defense mechanism present at the time of birth, whereas immunity developed or acquired after birth in response to specific antigens is termed acquired (adaptive) immunity. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 19,
    assertion: 'Rheumatoid arthritis is an auto immune disease.',
    reason: 'Rheumatoid arthritis is an exaggerated response of immune system to certain antigens present in the environment.',
    correctIndex: 2, // Option C
    solution: "Rheumatoid arthritis is a systemic autoimmune disorder in which the body's immune system erroneously attacks self-antigens in the synovial membranes of joints, resulting in chronic inflammation and joint degradation. An exaggerated immune response to environmental antigens is the definition of an allergy (hypersensitivity), not an autoimmune disorder. Therefore, Assertion is true, but Reason is false."
  },
  {
    qNum: 20,
    assertion: 'Phagocytic cells digest microbes and debris.',
    reason: 'Natural killer cells destroy virus infected cells and tumor cells.',
    correctIndex: 1, // Option B
    solution: 'Phagocytic cells such as neutrophils and macrophages recognize, engulf, and degrade pathogenic microorganisms and cellular debris through lysosomal enzymatic digestion. Natural killer (NK) cells are non-phagocytic granular lymphocytes that recognize altered or stressed host cells (such as virus-infected or transformed malignant cells) and release perforin and granzymes to induce apoptosis. Both statements are accurate descriptions of innate cellular defenses, but Reason does not explain the phagocytic action described in Assertion. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
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
  console.log('=== SEEDING & SYNCING HUMAN HEALTH AND DISEASE AR QUESTIONS ===\n');

  // 1. Local Database Insertion (Neon DB)
  const client = await pool.connect();
  let localChapterId;
  let localSubjectId;
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'zoology'");
    if (subRes.rows.length === 0) throw new Error("Subject 'Zoology' not found locally.");
    localSubjectId = subRes.rows[0].id;

    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) LIKE '%health%' OR LOWER(name) LIKE '%disease%')",
      [localSubjectId]
    );

    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Human Health & Disease', localSubjectId]
      );
      localChapterId = createChap.rows[0].id;
      console.log(`Created local chapter 'Human Health & Disease' (ID: ${localChapterId})`);
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
            solution = $7, category = 'Zoology', subject = 'Zoology',
            chapter = 'Human Health & Disease', topic = 'Human Health & Disease',
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
            4, 'medium', 'Zoology', 'available', q.solution,
            localSubjectId, 'Zoology', localChapterId, 'Human Health & Disease', 'Human Health & Disease'
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

  const liveZooRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveZooData = await liveZooRes.json();
  const liveZooQuestions = liveZooData.questions || [];
  console.log(`Found ${liveZooQuestions.length} total Zoology questions on Live.`);

  const liveMap = new Map();
  for (const q of liveZooQuestions) {
    const key = cleanStr(q.assertion_text || q.question_text);
    if (key) liveMap.set(key, q);
  }

  let liveSynced = 0;
  for (const q of QUESTIONS) {
    const questionText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;
    const payload = {
      category: 'Zoology',
      subject: 'Zoology',
      chapter: 'Human Health & Disease',
      topic: 'Human Health & Disease',
      subject_id: 2,   // Live Zoology ID
      chapter_id: 211, // Live Human Health & Disease ID
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
  const finalZoo = await (await fetch(`${LIVE_API}/question-bank?category=Zoology`, { headers: { Authorization: `Bearer ${token}` } })).json();
  const finalZooQuestions = finalZoo.questions || [];
  const liveHealthAR = finalZooQuestions.filter(q =>
    ((q.chapter || '').toLowerCase().includes('health') || (q.chapter_name || '').toLowerCase().includes('health')) &&
    q.question_type === 'assertion_reason'
  );
  console.log(`\nVerified on Live: ${liveHealthAR.length} AR questions in Human Health & Disease!`);
  await pool.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

