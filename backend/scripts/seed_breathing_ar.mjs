import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const STANDARD_OPTIONS = [
  { key: 'A', text: 'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A).' },
  { key: 'B', text: 'Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of Assertion (A).' },
  { key: 'C', text: 'Assertion (A) is true, but Reason (R) is false.' },
  { key: 'D', text: 'Both Assertion (A) and Reason (R) are false.' }
];

const QUESTIONS = [
  {
    qNum: 1,
    assertion: 'A film of lecithin lines the alveoli of the lungs that lowers the surface tension and keeps the alveoli inflated.',
    reason: 'Lecithin is a phospholipid secreted by pneumocyte cells type-II.',
    correctIndex: 1, // Option B
    solution: 'A film of lecithin (specifically dipalmitoylphosphatidylcholine), an essential component of pulmonary surfactant, lines the inner surface of the alveoli. It reduces surface tension at the air-water interface, preventing alveolar collapse during expiration and keeping them inflated. Lecithin is synthesized and secreted by Type II pneumocytes. While both statements are factually correct, Reason states its cellular origin and biochemical classification, which does not explain the physical interfacial mechanism of how lecithin lowers surface tension. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 2,
    assertion: 'Breathing and eating can occur simultaneously in mammals.',
    reason: 'Cerebral cortex influences the contraction of breathing muscles.',
    correctIndex: 1, // Option B
    solution: 'Mammals have an evolved secondary palate that completely separates the nasal cavity from the oral cavity, enabling them to masticate/eat food while continuing to breathe through the nose. The cerebral cortex exerts voluntary control over the contraction of respiratory muscles via corticospinal pathways (e.g., during breath holding or speaking). While both statements are true, the ability to breathe while eating is an anatomical adaptation of the secondary palate, not a consequence of cortical control over respiratory muscles. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 3,
    assertion: 'Methaemoglobin when present in large quantities causes cyanosis.',
    reason: 'In methaemoglobin, Fe2+ ions are oxidised to ferric ions and bind with oxygen irreversibly.',
    correctIndex: 2, // Option C
    solution: 'When hemoglobin iron is oxidized from the ferrous (Fe2+) state to the ferric (Fe3+) state, methaemoglobin is formed. High concentrations of methaemoglobin result in methemoglobinemia, imparting a chocolate-brown color to blood and causing cyanosis due to inadequate tissue oxygenation. However, ferric (Fe3+) iron is incapable of binding oxygen at all (it does not bind oxygen irreversibly; irreversible binding occurs with carbon monoxide). Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 4,
    assertion: 'P50 value indicates the pO2 at which 50% haemoglobin of blood is saturated with O2.',
    reason: 'The haemoglobin gets saturated to about 50% when partial pressure of oxygen is 25-30 mm of Hg.',
    correctIndex: 1, // Option B
    solution: 'The P50 value is physiologically defined as the partial pressure of oxygen (pO2) at which 50% of the hemoglobin binding sites are saturated with oxygen. Under normal physiological conditions (37°C, pH 7.4), human hemoglobin reaches 50% saturation at a pO2 of approximately 25-30 mm Hg (~26.6 mm Hg). Both statements are correct, but stating the numerical value does not explain the definition of P50. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 5,
    assertion: 'In carbon monoxide poisoning, death occurs due to non-availability of oxygen.',
    reason: 'It is due to the absence of free haemoglobin.',
    correctIndex: 0, // Option A
    solution: 'Carbon monoxide (CO) binds to the ferrous iron of hemoglobin with an affinity 200-250 times greater than oxygen, forming carboxyhemoglobin. This avid binding occupies oxygen-transport sites and locks remaining subunits in a high-affinity state, resulting in a virtual absence of free hemoglobin available to transport and release oxygen to tissues. This leads to cellular asphyxiation, tissue hypoxia, and death due to non-availability of oxygen. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 6,
    assertion: 'CO2 is transported in the blood mainly in the form of bicarbonate ions.',
    reason: 'RBCs contain a very high concentration of the enzyme carbonic anhydrase.',
    correctIndex: 0, // Option A
    solution: 'Nearly 70% of carbon dioxide is transported in blood in the form of bicarbonate ions (HCO3-). This occurs because red blood cells contain an exceptionally high concentration of the zinc-containing enzyme carbonic anhydrase, which rapidly hydrates CO2 into carbonic acid (H2CO3) that subsequently dissociates into HCO3- and H+. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 7,
    assertion: 'CO2 can diffuse through the diffusion membrane more rapidly than O2 per unit difference in partial pressure.',
    reason: 'Solubility of CO2 in plasma is 20-25 times higher than that of O2.',
    correctIndex: 0, // Option A
    solution: "According to Fick's law of diffusion, the rate of gas diffusion across a membrane is directly proportional to its solubility. As the solubility of CO2 in plasma and aqueous membranes is 20-25 times higher than that of O2, the amount of CO2 that diffuses through the alveolar-capillary membrane per unit difference in partial pressure is significantly higher than that of O2. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    qNum: 8,
    assertion: 'Pneumotaxic centre can moderate the functions of the respiratory rhythm centre.',
    reason: 'Neural signals from pneumotaxic centre can reduce the duration of inspiration and alter the respiratory rate.',
    correctIndex: 0, // Option A
    solution: 'The pneumotaxic centre, located in the pons region of the brainstem, moderates the activity of the respiratory rhythm centre in the medulla. Neural impulses transmitted from this centre "switch off" the inspiratory ramp signal, thereby shortening the duration of inspiration and consequently increasing the respiratory rate. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 9,
    assertion: 'Carbonic anhydrase enzyme facilitates the following reaction in both directions: CO2 + H2O <-> H2CO3.',
    reason: 'Carbonic anhydrase is found in very high concentration in RBCs and minute quantities of it is present in the plasma too.',
    correctIndex: 1, // Option B
    solution: 'Carbonic anhydrase is a reversible enzyme that catalyzes the hydration of CO2 to H2CO3 at the tissue level and the dehydration of H2CO3 back into CO2 and H2O at the alveolar level. It is present in high concentration in erythrocytes and in minute quantities in blood plasma. While both statements are accurate facts from NCERT, its anatomical distribution does not explain the biochemical reversibility of the enzymatic reaction. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 10,
    assertion: 'During holding of breath by closing the nose with fingers, CO2 builds up so that when nose opens again, the breathing becomes accelerated.',
    reason: 'The regulatory centre for respiration lies in the medulla of the brain and is sensitive to increase in concentration of CO2 in arterial blood.',
    correctIndex: 0, // Option A
    solution: 'During voluntary breath-holding, cellular respiration continuously adds CO2 to the blood, raising arterial pCO2 and H+ concentration. The chemosensitive area adjacent to the respiratory rhythm centre in the medulla is highly sensitive to elevated pCO2 and H+ ions. Upon release of the breath, this center triggers powerful signals to increase ventilation and accelerate breathing to blow off excess CO2. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 11,
    assertion: 'Water has very less pO2 as compared to atmosphere.',
    reason: 'Gills have the most powerful oxygenation capacity in the animal kingdom.',
    correctIndex: 2, // Option C
    solution: 'The concentration and partial pressure of dissolved oxygen in aquatic environments is significantly lower (approx. 4-8 ml O2 per liter) compared to air in the atmosphere (approx. 210 ml O2 per liter, pO2 ~159 mm Hg). Gills utilize a countercurrent exchange mechanism, but avian lungs with continuous unidirectional flow and parabronchi represent the most efficient gas-exchange system in the animal kingdom. Hence, the claim that gills possess the most powerful oxygenation capacity in the animal kingdom is false. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 12,
    assertion: 'We have the ability to increase the strength of inspiration and expiration.',
    reason: 'It is because of additional muscles present in the abdomen.',
    correctIndex: 0, // Option A
    solution: 'While quiet breathing relies primarily on the diaphragm and external intercostal muscles, humans have accessory muscles in the abdomen (rectus abdominis, internal oblique, transverse abdominis) and ribcage (internal intercostals, scalenes, sternocleidomastoid) that contract during forced respiration to forcefully depress or elevate the rib cage, thereby significantly increasing the strength of inspiration and expiration. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 13,
    assertion: 'Larynx helps in sound production.',
    reason: 'It can change the length and area of passage of air column.',
    correctIndex: 0, // Option A
    solution: 'The larynx (voice box) contains the vocal cords that border the glottis. Intrinsic laryngeal muscles contract to alter the length, tension, and position of the vocal folds and change the dimensions of the rima glottidis (the air passage), modulating the vibrations of the passing air column to produce sound and control pitch. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 14,
    assertion: 'Alveoli are irregularly walled and vascularised bag like structures.',
    reason: 'They are composed of squamous epithelium.',
    correctIndex: 1, // Option B
    solution: 'Alveoli are thin, irregular-walled, vascularized pouch-like structures that form the functional gas exchange units of the lungs. The alveolar wall is lined by simple squamous epithelium (type I pneumocytes) to provide a minimal diffusion barrier. While both statements are true descriptions from NCERT, being composed of squamous epithelium explains the thinness of the diffusion membrane rather than the irregular-walled, vascularized bag architecture. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 15,
    assertion: 'The volume of air involved in alveolar exchange can be estimated using a spirometer.',
    reason: 'The volume of air involved in breathing movements cannot be estimated using spirometer.',
    correctIndex: 2, // Option C
    solution: 'A spirometer is the standard clinical instrument specifically designed to measure the volume of air involved in breathing movements (tidal volume, inspiratory reserve volume, and expiratory reserve volume). Therefore, the statement that volume of air involved in breathing movements cannot be estimated using a spirometer is directly false. Consequently, Assertion is true, but Reason is false.'
  },
  {
    qNum: 16,
    assertion: 'It is essential to change the volume of thoracic cavity for breathing.',
    reason: 'Humans cannot directly alter the pulmonary volume.',
    correctIndex: 0, // Option A
    solution: 'Lungs are passively expanded and compressed within the airtight thoracic cavity because lung tissue lacks its own contractile musculature to directly change its internal volume. Consequently, pulmonary volume can only be altered indirectly by changing the volume of the thoracic cavity through the movement of the diaphragm and intercostal muscles. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 17,
    assertion: 'TLC can be calculated by indirect method.',
    reason: 'Spirometer fails to calculate the residual volume.',
    correctIndex: 0, // Option A
    solution: 'Total Lung Capacity (TLC) is the total volume of air present in the lungs after maximal inspiration (TLC = VC + RV). Because residual volume (RV) cannot be exhaled, standard spirometry cannot measure RV directly, and as a result cannot directly measure TLC. Therefore, TLC must be determined using indirect methods such as helium dilution, nitrogen washout, or plethysmography. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 18,
    assertion: 'Larynx is also called the voice box.',
    reason: 'Larynx is a bony box which helps in sound conduction.',
    correctIndex: 2, // Option C
    solution: 'The larynx is known as the voice box because it houses the vocal cords responsible for sound production. However, the larynx is a cartilaginous structure (composed of thyroid, cricoid, and arytenoid cartilages), not a bony box, and it functions in sound production rather than sound conduction. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 19,
    assertion: 'Each bronchi undergoes repeated divisions to form the 2° and 3° bronchi and bronchioles ending up in very thin terminal bronchioles.',
    reason: 'Each terminal bronchiole gives rise to a number of very thin, regularly walled and vascularised bag like structures.',
    correctIndex: 2, // Option C
    solution: 'The primary bronchi branch repeatedly inside the lungs into secondary and tertiary bronchi, bronchioles, and terminal bronchioles. However, according to NCERT, each terminal bronchiole gives rise to a number of very thin, irregular-walled (not regularly walled) and vascularised bag-like structures called alveoli. Therefore, Assertion is true, but Reason is false.'
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('--- SEEDING ZOOLOGY AR QUESTIONS: BREATHING AND EXCHANGE OF GASES ---');

    // 1. Get Zoology Subject ID
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'zoology'");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Zoology' not found in database.");
    }
    const subjectId = subRes.rows[0].id;
    console.log(`Subject: Zoology (ID: ${subjectId})`);

    // 2. Resolve Chapter: "Breathing and Exchange of Gases"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) = 'breathing and exchange of gases' OR LOWER(name) LIKE '%breathing%')",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Breathing and Exchange of Gases', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new chapter 'Breathing and Exchange of Gases' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter '${chapRes.rows[0].name}' (ID: ${chapterId})`);
    }

    // 3. Insert the 19 questions
    let inserted = 0;
    for (const q of QUESTIONS) {
      const questionText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;

      // Check if already exists to prevent duplicate inserts
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE subject_id = $1 AND question_type = 'assertion_reason' AND assertion_text = $2",
        [subjectId, q.assertion]
      );

      if (existing.rows.length > 0) {
        console.log(`[Q${q.qNum}] Already exists (ID: ${existing.rows[0].id}). Updating...`);
        await client.query(
          `UPDATE question_bank SET
            question_text = $1,
            assertion_text = $2,
            reason_text = $3,
            options = $4,
            correct_index = $5,
            correct_indices = $6,
            solution = $7,
            category = 'Zoology',
            subject = 'Zoology',
            chapter = 'Breathing and Exchange of Gases',
            topic = 'Breathing and Exchange of Gases',
            chapter_id = $8,
            difficulty = 'medium',
            marks = 4,
            status = 'available'
          WHERE id = $9`,
          [
            questionText,
            q.assertion,
            q.reason,
            JSON.stringify(STANDARD_OPTIONS),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            q.solution,
            chapterId,
            existing.rows[0].id
          ]
        );
        inserted++;
      } else {
        const insertRes = await client.query(
          `INSERT INTO question_bank (
            question_type,
            question_text,
            assertion_text,
            reason_text,
            options,
            correct_index,
            correct_indices,
            marks,
            difficulty,
            category,
            status,
            solution,
            subject_id,
            subject,
            chapter_id,
            chapter,
            topic,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW()) RETURNING id`,
          [
            'assertion_reason',
            questionText,
            q.assertion,
            q.reason,
            JSON.stringify(STANDARD_OPTIONS),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            4,
            'medium',
            'Zoology',
            'available',
            q.solution,
            subjectId,
            'Zoology',
            chapterId,
            'Breathing and Exchange of Gases',
            'Breathing and Exchange of Gases'
          ]
        );
        console.log(`[Q${q.qNum}] Inserted successfully with ID: ${insertRes.rows[0].id}`);
        inserted++;
      }
    }

    console.log(`\nSuccessfully processed ${inserted}/${QUESTIONS.length} Assertion-Reason questions into 'Breathing and Exchange of Gases'!`);

  } catch (err) {
    console.error('Error seeding questions:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();

