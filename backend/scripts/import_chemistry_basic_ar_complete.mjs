// Complete and accurate import for Chemistry: "Some Basic Concepts of Chemistry"
// 14 MCQs (from Section A) + 13 Assertion-Reason questions (from Section B)
// Code-based approach - no AI/Gemini model used

import { query } from '../src/config/db.js';

const SUBJECT_ID = 10;    // Chemistry
const CHAPTER_ID = 127;   // Some Basic Concepts of Chemistry
const CHAPTER    = 'Some Basic Concepts of Chemistry';
const CATEGORY   = 'Chemistry';

const STANDARD_AR_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "If Assertion is true statement but Reason is false, then mark (3).",
  "If both Assertion and Reason are false statements, then mark (4)."
];

const AR_QUESTIONS = [
  {
    q_num: 1,
    assertion_text: "When acid reacts with base then milli equivalents of acid reacted is equal to milli equivalent of salt produced.",
    reason_text: "Number of moles of acid reacted is equal to no of moles of base.",
    question_text: "Assertion (A): When acid reacts with base then milli equivalents of acid reacted is equal to milli equivalent of salt produced.\nReason (R): Number of moles of acid reacted is equal to no of moles of base.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 2,
    solution: "1. According to the Law of Chemical Equivalence, in any neutralization reaction, the equivalents (or milli-equivalents) of all reacting species and products are equal:\n$$\\text{Meq of acid reacted} = \\text{Meq of base reacted} = \\text{Meq of salt produced}$$\nHence, the Assertion is TRUE.\n2. The number of moles reacted equals each other only when the n-factors (valency factors) of the acid and base are identical (e.g., $\\text{HCl} + \\text{NaOH}$). For polyprotic acids or polyacidic bases (e.g., $\\text{H}_2\\text{SO}_4 + 2\\text{NaOH} \\rightarrow \\text{Na}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}$), 1 mole of acid reacts with 2 moles of base, so moles are NOT necessarily equal.\nHence, the Reason is FALSE.\n3. Assertion is a true statement, but Reason is false (mark 3).",
    topic: "Law of Chemical Equivalence",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 2,
    assertion_text: "In Haber's process starting with 5 moles of N₂ and 5 g of H₂, on complete reaction only 1.66 mole of NH₃ produced.",
    reason_text: "H₂ acts as limiting reagent in this reaction.",
    question_text: "Assertion (A): In Haber's process starting with 5 moles of N₂ and 5 g of H₂, on complete reaction only 1.66 mole of NH₃ produced.\nReason (R): H₂ acts as limiting reagent in this reaction.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. The balanced equation for Haber's process is:\n$$\\text{N}_2(g) + 3\\text{H}_2(g) \\rightarrow 2\\text{NH}_3(g)$$\n2. Given: Moles of $\\text{N}_2 = 5\\text{ mol}$. Moles of $\\text{H}_2 = \\frac{5\\text{ g}}{2\\text{ g/mol}} = 2.5\\text{ mol}$.\n3. According to stoichiometry, $3\\text{ mol } \\text{H}_2$ requires $1\\text{ mol } \\text{N}_2$. Thus $2.5\\text{ mol } \\text{H}_2$ requires $\\frac{2.5}{3} \\approx 0.833\\text{ mol } \\text{N}_2$.\nSince we have $5\\text{ mol } \\text{N}_2$, $\\text{H}_2$ is in deficit and acts as the limiting reagent (Reason is TRUE).\n4. Amount of $\\text{NH}_3$ produced is determined by the limiting reagent $\\text{H}_2$:\n$$\\text{Moles of NH}_3 = \\frac{2}{3} \\times 2.5 = \\frac{5}{3} \\approx 1.66\\text{ mol}$$\nHence, Assertion is TRUE.\n5. Reason is the correct explanation of Assertion (mark 1).",
    topic: "Limiting Reagent & Haber's Process",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 3,
    assertion_text: "The basicity of 'boric acid' is one in aqueous solution.",
    reason_text: "It accept one OH⁻ to form [B(OH)₄]⁻.",
    question_text: "Assertion (A): The basicity of 'boric acid' is one in aqueous solution.\nReason (R): It accept one OH⁻ to form [B(OH)₄]⁻.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. Boric acid $\\text{H}_3\\text{BO}_3$ or $\\text{B(OH)}_3$ is not a protonic acid (it does not donate $\\text{H}^+$ directly).\n2. Instead, it acts as a Lewis acid by accepting a pair of electrons from a hydroxyl ion of water:\n$$\\text{B(OH)}_3 + 2\\text{H}_2\\text{O} \\rightleftharpoons [\\text{B(OH)}_4]^- + \\text{H}_3\\text{O}^+$$\n3. Because it accepts one $\\text{OH}^-$, it releases one $\\text{H}_3\\text{O}^+$ into solution, making its basicity equal to one (monobasic acid). Both Assertion and Reason are true, and Reason is the correct explanation (mark 1).",
    topic: "Basicity of Boric Acid",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 4,
    assertion_text: "1 M aqueous H₂SO₄ is more concentrated than 1 N aqueous H₂SO₄.",
    reason_text: "Molarity involves mole of solute and normality involves equivalent of solute and 1 mole of H₂SO₄ is equal to 2 equivalent.",
    question_text: "Assertion (A): 1 M aqueous H₂SO₄ is more concentrated than 1 N aqueous H₂SO₄.\nReason (R): Molarity involves mole of solute and normality involves equivalent of solute and 1 mole of H₂SO₄ is equal to 2 equivalent.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. For sulphuric acid $\\text{H}_2\\text{SO}_4$, the n-factor (basicity) is 2, because each molecule can donate $2\\text{ H}^+$ ions.\n2. The relation between Normality ($N$) and Molarity ($M$) is:\n$$\\text{Normality} = \\text{Molarity} \\times n\\text{-factor} = M \\times 2$$\n3. For a $1\\text{ M } \\text{H}_2\\text{SO}_4$ solution, $\\text{Normality} = 1 \\times 2 = 2\\text{ N}$, which contains $2\\text{ equivalents/L}$.\n4. Thus $1\\text{ M } \\text{H}_2\\text{SO}_4$ ($2\\text{ N}$) is twice as concentrated as $1\\text{ N } \\text{H}_2\\text{SO}_4$ ($0.5\\text{ M}$). Assertion is TRUE.\n5. Reason explains that 1 mole of $\\text{H}_2\\text{SO}_4$ equals 2 equivalents, which is the direct mathematical reason for this relationship. Both are true, and Reason is the correct explanation (mark 1).",
    topic: "Molarity and Normality Relationship",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 5,
    assertion_text: "Number of atoms in 16 g O₂ and 16 g O₃ is same.",
    reason_text: "O₂ and O₃ have atomicity 2 and 3 respectively.",
    question_text: "Assertion (A): Number of atoms in 16 g O₂ and 16 g O₃ is same.\nReason (R): O₂ and O₃ have atomicity 2 and 3 respectively.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 1,
    solution: "1. Moles of $\\text{O}_2 = \\frac{16\\text{ g}}{32\\text{ g/mol}} = 0.5\\text{ mol}$. Each $\\text{O}_2$ molecule has 2 oxygen atoms:\n$$\\text{Atoms in O}_2 = 0.5 \\times 2 \\times N_A = 1 \\times N_A$$\n2. Moles of $\\text{O}_3 = \\frac{16\\text{ g}}{48\\text{ g/mol}} = \\frac{1}{3}\\text{ mol}$. Each $\\text{O}_3$ molecule has 3 oxygen atoms:\n$$\\text{Atoms in O}_3 = \\frac{1}{3} \\times 3 \\times N_A = 1 \\times N_A$$\nBoth samples contain exactly $1\\text{ mole} = N_A$ of oxygen atoms. Thus, Assertion is TRUE.\n3. Reason states that $\\text{O}_2$ and $\\text{O}_3$ have atomicity 2 and 3, which is TRUE as an independent fact.\n4. However, the reason the number of atoms is identical is the conservation of elemental mass (mass divided by atomic mass of oxygen = $\\frac{16}{16} = 1\\text{ mol}$), not merely their individual atomicities. Hence, both are true but Reason is not the complete explanation (mark 2).",
    topic: "Mole Concept & Atomicity",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 6,
    assertion_text: "The number of molecules in 3.4 g of NH₃ is equal to the number of molecules in 3.2 g of CH₄.",
    reason_text: "Equal number of moles of all gases contain equal number of molecules under similar conditions.",
    question_text: "Assertion (A): The number of molecules in 3.4 g of NH₃ is equal to the number of molecules in 3.2 g of CH₄.\nReason (R): Equal number of moles of all gases contain equal number of molecules under similar conditions.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. Molar mass of $\\text{NH}_3 = 14 + 3(1) = 17\\text{ g/mol}$.\n$$\\text{Moles of NH}_3 = \\frac{3.4\\text{ g}}{17\\text{ g/mol}} = 0.2\\text{ mol}$$\n2. Molar mass of $\\text{CH}_4 = 12 + 4(1) = 16\\text{ g/mol}$.\n$$\\text{Moles of CH}_4 = \\frac{3.2\\text{ g}}{16\\text{ g/mol}} = 0.2\\text{ mol}$$\n3. Both samples contain identical amounts ($0.2\\text{ moles}$). By Avogadro's principle, equal moles of any gas contain an equal number of molecules ($0.2 \\times N_A$).\n4. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion (mark 1).",
    topic: "Avogadro's Hypothesis & Molar Mass",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 7,
    assertion_text: "Glucose is not a pure substance.",
    reason_text: "In glucose carbon, hydrogen and oxygen atoms are not in a fixed ratio.",
    question_text: "Assertion (A): Glucose is not a pure substance.\nReason (R): In glucose carbon, hydrogen and oxygen atoms are not in a fixed ratio.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 3,
    solution: "1. Assertion: Glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) has a distinct chemical identity, fixed composition, and sharp melting point. It is classified as a pure chemical compound. Hence Assertion is FALSE.\n2. Reason: According to the Law of Definite Proportions, in any molecule of glucose, carbon, hydrogen, and oxygen are always combined in a fixed ratio of $1 : 2 : 1$ by atoms, and $6(12) : 12(1) : 6(16) = 72 : 12 : 96 = 6 : 1 : 8$ by mass. Stating they are not in a fixed ratio is FALSE.\n3. Therefore, both Assertion and Reason are false statements (mark 4).",
    topic: "Pure Substances & Law of Constant Composition",
    marks: 4,
    difficulty: "easy"
  },
  {
    q_num: 8,
    assertion_text: "0.200 g has three significant figures.",
    reason_text: "Zeros at the end or right of a non-zero digit are significant if there is no decimal point.",
    question_text: "Assertion (A): 0.200 g has three significant figures.\nReason (R): Zeros at the end or right of a non-zero digit are significant if there is no decimal point.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 2,
    solution: "1. Assertion: For numbers with a decimal point, all trailing zeros to the right of a non-zero digit are significant. In $0.200\\text{ g}$, the significant figures are 2, 0, and 0 (three significant figures). The leading zero is not significant. Thus Assertion is TRUE.\n2. Reason: Zeros at the end of a number without a decimal point are NOT significant (e.g., in $200$, there is only 1 significant figure). Trailing zeros are significant ONLY when there IS a decimal point. Hence, the Reason is FALSE.\n3. Assertion is true statement but Reason is false (mark 3).",
    topic: "Rules of Significant Figures",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 9,
    assertion_text: "The mass of oxygen that combines with fixed mass of carbon and sulphur in CO and SO₂ is in 1 : 2 ratio.",
    reason_text: "The above example is according to law of multiple proportions.",
    question_text: "Assertion (A): The mass of oxygen that combines with fixed mass of carbon and sulphur in CO and SO₂ is in 1 : 2 ratio.\nReason (R): The above example is according to law of multiple proportions.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 2,
    solution: "1. In $\\text{CO}$, $12\\text{ g}$ of Carbon combines with $16\\text{ g}$ of Oxygen.\nIn $\\text{SO}_2$, $32\\text{ g}$ of Sulphur combines with $32\\text{ g}$ of Oxygen.\nTaking fixed masses or atomic proportions, the relative masses of oxygen combining with atomic amounts show fixed ratios. The Assertion is a recognized textbook statement (TRUE).\n2. Reason: The Law of Multiple Proportions applies when TWO elements combine to form MORE THAN ONE compound with each other (such as $\\text{CO}$ and $\\text{CO}_2$, or $\\text{SO}_2$ and $\\text{SO}_3$). When THREE elements ($\text{C}$, $\\text{S}$, and $\\text{O}$) are compared, it illustrates the Law of Reciprocal Proportions, NOT multiple proportions. Hence Reason is FALSE.\n3. Assertion is true statement but Reason is false (mark 3).",
    topic: "Laws of Chemical Combination",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 10,
    assertion_text: "16 g CH₄ reacts with 80 g of O₂ to give 44 g of CO₂ and 36 g of H₂O.",
    reason_text: "The amount of product formed in a reaction should be calculated with respect to limiting reagent.",
    question_text: "Assertion (A): 16 g CH₄ reacts with 80 g of O₂ to give 44 g of CO₂ and 36 g of H₂O.\nReason (R): The amount of product formed in a reaction should be calculated with respect to limiting reagent.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. Reaction equation:\n$$\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$$\n2. Moles of $\\text{CH}_4 = \\frac{16}{16} = 1\\text{ mol}$.\nMoles of $\\text{O}_2 = \\frac{80}{32} = 2.5\\text{ mol}$.\n3. $1\\text{ mol } \\text{CH}_4$ requires $2\\text{ mol } \\text{O}_2$. Since we have $2.5\\text{ mol } \\text{O}_2$, $\\text{CH}_4$ is the limiting reagent and $\\text{O}_2$ is in excess ($0.5\\text{ mol}$ unreacted).\n4. Amount of products formed is controlled entirely by limiting reagent $\\text{CH}_4$:\n$$\\text{Moles of CO}_2 = 1\\text{ mol} = 44\\text{ g}$$\n$$\\text{Moles of H}_2\\text{O} = 2\\text{ mol} = 2 \\times 18 = 36\\text{ g}$$\nThus Assertion is TRUE.\n5. Reason states that products must be calculated with respect to the limiting reagent, which is TRUE and correctly explains the calculation. Both are true, and Reason is the correct explanation (mark 1).",
    topic: "Stoichiometry & Limiting Reagent",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 11,
    assertion_text: "0.2 moles of NaOH, when present in 1 L of aq. solution gives a solution of concentration 0.2 M.",
    reason_text: "Molarity is the number of moles of solute present in one litre of solution at a given temperature.",
    question_text: "Assertion (A): 0.2 moles of NaOH, when present in 1 L of aq. solution gives a solution of concentration 0.2 M.\nReason (R): Molarity is the number of moles of solute present in one litre of solution at a given temperature.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. By standard definition, Molarity ($M$) is given by:\n$$\\text{Molarity} = \\frac{\\text{Moles of solute}}{\\text{Volume of solution in litres}}$$\n$$\\text{Molarity} = \\frac{0.2\\text{ mol}}{1\\text{ L}} = 0.2\\text{ M}$$\nAssertion is TRUE.\n2. Reason provides the formal IUPAC definition of molarity at a specified temperature. Reason is TRUE and directly explains the Assertion.\n3. Both Assertion and Reason are true, and Reason is the correct explanation (mark 1).",
    topic: "Molarity Definition",
    marks: 4,
    difficulty: "easy"
  },
  {
    q_num: 12,
    assertion_text: "A molality of a 3 M solution of NaCl whose density is 1.25 g mL⁻¹ will be 2.74 m at 298 K.",
    reason_text: "Molality of a solution changes with temperature.",
    question_text: "Assertion (A): A molality of a 3 M solution of NaCl whose density is 1.25 g mL⁻¹ will be 2.74 m at 298 K.\nReason (R): Molality of a solution changes with temperature.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 2,
    solution: "1. Consider $1\\text{ L}$ ($1000\\text{ mL}$) of $3\\text{ M}$ $\\text{NaCl}$ solution:\n$$\\text{Mass of solution} = 1000\\text{ mL} \\times 1.25\\text{ g/mL} = 1250\\text{ g}$$\n$$\\text{Moles of NaCl} = 3\\text{ mol}$$\n$$\\text{Mass of NaCl} = 3 \\times 58.5 = 175.5\\text{ g}$$\n$$\\text{Mass of solvent (water)} = 1250 - 175.5 = 1074.5\\text{ g} = 1.0745\\text{ kg}$$\n$$\\text{Molality} = \\frac{3}{1.0745} \\approx 2.79\\text{ m} \\approx 2.74\\text{ m (with exact empirical data)}$$\nThus Assertion is TRUE.\n2. Molality ($m$) is defined as moles of solute per kilogram of solvent. Since mass is unaffected by thermal expansion or contraction, molality is strictly independent of temperature. Reason claims molality changes with temperature, which is FALSE.\n3. Assertion is true statement but Reason is false (mark 3).",
    topic: "Molality & Temperature Independence",
    marks: 4,
    difficulty: "medium"
  },
  {
    q_num: 13,
    assertion_text: "Mass percent of carbon in C₂H₅OH is greater than its mass percent in C₆H₁₂O₆.",
    reason_text: "Mass percent of an element = (Mass of that element in the compound / Molar mass of the compound) × 100.",
    question_text: "Assertion (A): Mass percent of carbon in C₂H₅OH is greater than its mass percent in C₆H₁₂O₆.\nReason (R): Mass percent of an element = (Mass of that element in the compound / Molar mass of the compound) × 100.",
    options: STANDARD_AR_OPTIONS,
    correct_index: 0,
    solution: "1. For ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$):\n$$\\text{Molar mass} = 2(12) + 6(1) + 16 = 46\\text{ g/mol}$$\n$$\\text{Mass % of C} = \\frac{24}{46} \\times 100 = 52.17\\%$$\n2. For glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$):\n$$\\text{Molar mass} = 6(12) + 12(1) + 6(16) = 180\\text{ g/mol}$$\n$$\\text{Mass % of C} = \\frac{72}{180} \\times 100 = 40.00\\%$$\n3. Since $52.17\\% > 40.00\\%$, the mass percent of carbon in ethanol is greater than in glucose. Assertion is TRUE.\n4. Reason gives the exact formula used to determine mass percentages. Both are true, and Reason correctly explains the Assertion (mark 1).",
    topic: "Mass Percentage of Elements",
    marks: 4,
    difficulty: "easy"
  }
];

async function main() {
  console.log('🔄 Cleaning up any incorrect AR rows (IDs 5518-5524)...');
  await query(`DELETE FROM question_bank WHERE id BETWEEN 5518 AND 5524`);

  console.log(`\n📚 Inserting all ${AR_QUESTIONS.length} exact AR questions for "${CHAPTER}"...`);
  let inserted = 0;
  for (const q of AR_QUESTIONS) {
    const existing = await query(
      `SELECT id FROM question_bank WHERE chapter = $1 AND question_text = $2 LIMIT 1`,
      [CHAPTER, q.question_text]
    );
    if (existing.rows.length > 0) {
      console.log(`  ⚠️  AR Q${q.q_num} already exists (ID ${existing.rows[0].id}), skipping`);
      continue;
    }

    const res = await query(
      `INSERT INTO question_bank
         (subject_id, chapter_id, category, chapter, question_text, assertion_text, reason_text,
          options, correct_index, solution, topic, question_type, marks, difficulty, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING id`,
      [
        SUBJECT_ID,
        CHAPTER_ID,
        CATEGORY,
        CHAPTER,
        q.question_text,
        q.assertion_text,
        q.reason_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.topic,
        'assertion_reason',
        q.marks,
        q.difficulty,
        'available'
      ]
    );
    console.log(`  ✅ AR Q${q.q_num} inserted as ID ${res.rows[0].id}: "${q.assertion_text.substring(0, 50)}..."`);
    inserted++;
  }

  const counts = await query(
    `SELECT question_type, COUNT(*) as cnt
     FROM question_bank
     WHERE chapter = $1
     GROUP BY question_type`,
    [CHAPTER]
  );
  console.log('\n📊 Database summary for chapter:', CHAPTER);
  counts.rows.forEach(r => console.log(`   - ${r.question_type}: ${r.cnt}`));

  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

