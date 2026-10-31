// Batch 4: Questions 108 to 117 (Some Basic Concepts of Chemistry)
import { query } from '../src/config/db.js';

const SUBJECT_ID = 10;
const CHAPTER_ID = 127;
const CHAPTER = 'Some Basic Concepts of Chemistry';
const CATEGORY = 'Chemistry';

export const BATCH_4 = [
  {
    q_num: 108,
    question_text: "Haemoglobin contains 0.5% iron by weight. The molecular weight of haemoglobin is 44800, then the number of iron atom per molecule of haemoglobin is",
    options: ["8", "4", "2", "12"],
    correct_index: 1,
    solution: "Mass of iron in 1 molecule of haemoglobin = $\\frac{0.5}{100} \\times 44800 = 224\\text{ amu}$. Number of iron atoms per molecule = $\\frac{224}{56} = 4$.",
    topic: "Percentage Composition of Biomolecules",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 109,
    question_text: "At STP conditions, 5 L of a gas weighs 9 g. Vapour density of gas is",
    options: ["40.32", "20.16", "9", "18"],
    correct_index: 1,
    solution: "Molar mass of gas = $\\frac{9}{5} \\times 22.4 = 40.32\\text{ g/mol}$. $\\text{Vapour Density} = \\frac{\\text{Molar mass}}{2} = \\frac{40.32}{2} = 20.16$.",
    topic: "Vapour Density at STP",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 110,
    question_text: "In the reaction, ClO₃⁻ + 6H⁺ + 6e⁻ → Cl⁻ + 3H₂O, equivalent mass of ClO₃⁻ is (M = formula weight of ClO₃⁻)",
    options: ["M/6", "M/3", "M/5", "M/4"],
    correct_index: 0,
    solution: "6 electrons are accepted per mole of $\\text{ClO}_3^-$, so its n-factor = 6. $\\text{Equivalent mass} = \\frac{M}{6}$.",
    topic: "Equivalent Mass in Redox Half-reactions",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 111,
    question_text: "Oxygen exists in three isotopic forms O¹⁶ (82%), O¹⁷ (10%) and O¹⁸ (8%). Average atomic mass of oxygen is",
    options: ["16.34", "16.89", "16.92", "16.26"],
    correct_index: 3,
    solution: "$\\text{Average atomic mass} = \\frac{(16 \\times 82) + (17 \\times 10) + (18 \\times 8)}{100} = \\frac{1312 + 170 + 144}{100} = \\frac{1626}{100} = 16.26$.",
    topic: "Average Atomic Mass of Isotopes",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 112,
    question_text: "10 ml hydrocarbon requires 55 ml oxygen for complete combustion and forms 40 ml CO₂. Then the formula of hydrocarbon is",
    options: ["C₄H₆", "C₄H₈", "C₄H₁₀", "C₃H₈"],
    correct_index: 0,
    solution: "$\\text{C}_x\\text{H}_y + (x + y/4)\\text{O}_2 \\rightarrow x\\text{CO}_2 + y/2\\text{H}_2\\text{O}$. Volume of $\\text{CO}_2 = 10 x = 40 \\Rightarrow x = 4$. Oxygen required = $10(x + y/4) = 55 \\Rightarrow 4 + y/4 = 5.5 \\Rightarrow y/4 = 1.5 \\Rightarrow y = 6$. Formula is $\\text{C}_4\\text{H}_6$.",
    topic: "Eudiometry & Hydrocarbon Combustion",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 113,
    question_text: "Equivalent weight of Al₂(SO₄)₃ is (M = Molecular weight)",
    options: ["M/2", "M/3", "M/8", "M/6"],
    correct_index: 3,
    solution: "For the salt $\\text{Al}_2(\\text{SO}_4)_3$, total positive charge on cations = $2 \\times (+3) = 6$ (or total negative charge = $3 \\times 2 = 6$). Hence n-factor = 6, and Equivalent weight = $\\frac{M}{6}$.",
    topic: "Equivalent Weight of Salts",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 114,
    question_text: "One litre hard water contains 2 mg MgCl₂ and 3 mg CaCl₂. Calculate the total hardness in terms of parts of CaCO₃ per 10⁶ parts of water by mass",
    options: ["4.8 ppm", "1.95 ppm", "2.75 ppm", "3.50 ppm"],
    correct_index: 0,
    solution: "$\\text{CaCO}_3$ equivalent of $\\text{MgCl}_2 = 2 \\times \\frac{100}{95} \\approx 2.105\\text{ mg}$. $\\text{CaCO}_3$ equivalent of $\\text{CaCl}_2 = 3 \\times \\frac{100}{111} \\approx 2.703\\text{ mg}$. Total hardness = $2.105 + 2.703 = 4.808\\text{ mg/L} \\approx 4.8\\text{ ppm}$.",
    topic: "Hardness of Water in ppm",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 115,
    question_text: "HCl (M = 2, V = 5 L) + H₂SO₄ (M = 1.5, V = 2 L) + NaOH (M = 2.5, V = 2 L) are mixed. What is the normality of hydrogen ion in resulting solution?",
    options: ["15/7 N", "7/15 N", "11/9 N", "9/11 N"],
    correct_index: 2,
    solution: "Equivalents of $\\text{H}^+$ from $\\text{HCl} = 2 \\times 5 = 10$. Equivalents of $\\text{H}^+$ from $\\text{H}_2\\text{SO}_4 = 1.5 \\times 2 \\times 2 = 6$. Total $\\text{H}^+ = 16\\text{ eq}$. Equivalents of $\\text{OH}^-$ from $\\text{NaOH} = 2.5 \\times 1 \\times 2 = 5\\text{ eq}$. Remaining $\\text{H}^+ = 16 - 5 = 11\\text{ eq}$. Total volume = $5 + 2 + 2 = 9\\text{ L}$. $\\text{Normality of H}^+ = \\frac{11}{9}\\text{ N}$.",
    topic: "Mixing of Acid and Base",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 116,
    question_text: "50 ml of an aqueous solution of glucose contains 6.02 × 10²² molecules, the concentration of solution is",
    options: ["0.1 M", "1 M", "0.2 M", "2 M"],
    correct_index: 3,
    solution: "Moles of glucose = $\\frac{6.02 \\times 10^{22}}{6.022 \\times 10^{23}} = 0.1\\text{ mol}$. Volume = $50\\text{ mL} = 0.05\\text{ L}$. $\\text{Molarity} = \\frac{0.1}{0.05} = 2\\text{ M}$.",
    topic: "Molarity Calculation",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 117,
    question_text: "Boron has two isotopes ₅B¹⁰ and ₅B¹¹. If the atomic mass of Boron is 10.80, the percentage of ₅B¹⁰ in nature is",
    options: ["15", "20", "80", "85"],
    correct_index: 1,
    solution: "Let $\\% \\text{ of } ^{10}\\text{B} = x$. $10 x + 11 (100 - x) = 10.80 \\times 100 = 1080 \\Rightarrow 1100 - x = 1080 \\Rightarrow x = 20\\%$.",
    topic: "Isotopic Abundance",
    marks: 1, difficulty: "easy"
  }
];

export async function insertBatch4() {
  console.log(`Inserting Batch 4 (Q108-Q117): ${BATCH_4.length} questions...`);
  let count = 0;
  for (const q of BATCH_4) {
    const ex = await query(
      `SELECT id FROM question_bank WHERE chapter = $1 AND question_text = $2 LIMIT 1`,
      [CHAPTER, q.question_text]
    );
    if (ex.rows.length > 0) continue;
    await query(
      `INSERT INTO question_bank
         (subject_id, chapter_id, category, chapter, question_text, options, correct_index,
          solution, topic, question_type, marks, difficulty, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        SUBJECT_ID, CHAPTER_ID, CATEGORY, CHAPTER,
        q.question_text, JSON.stringify(q.options), q.correct_index,
        q.solution, q.topic, 'mcq', q.marks, q.difficulty, 'available'
      ]
    );
    count++;
  }
  console.log(`✅ Batch 4 done: ${count} inserted.`);
}

