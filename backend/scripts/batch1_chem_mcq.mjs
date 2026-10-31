// Batch 1: Questions 15 to 45 (Some Basic Concepts of Chemistry)
import { query } from '../src/config/db.js';

const SUBJECT_ID = 10;
const CHAPTER_ID = 127;
const CHAPTER = 'Some Basic Concepts of Chemistry';
const CATEGORY = 'Chemistry';

export const BATCH_1 = [
  {
    q_num: 15,
    question_text: "The mass of N atom in 1 mole of K₄[Fe(CN)₆] is",
    options: ["14 g", "42 g", "78 g", "84 g"],
    correct_index: 3,
    solution: "One formula unit of $K_4[Fe(CN)_6]$ contains 6 nitrogen atoms. In 1 mole of $K_4[Fe(CN)_6]$, there are 6 moles of N atoms. Mass = $6 \\times 14 = 84\\text{ g}$.",
    topic: "Mole Concept",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 16,
    question_text: "1 g sample of chalk is completely neutralised by 100 ml 0.04 N HCl solution. %(w/w) CaCO₃ in the sample is",
    options: ["20", "40", "60", "80"],
    correct_index: 0,
    solution: "Equivalents of $\\text{HCl} = \\frac{100}{1000} \\times 0.04 = 0.004\\text{ eq}$. Equivalents of $\\text{CaCO}_3 = 0.004$. Equivalent weight of $\\text{CaCO}_3 = \\frac{100}{2} = 50$. Mass of $\\text{CaCO}_3 = 0.004 \\times 50 = 0.20\\text{ g}$. $\\%(w/w) = \\frac{0.20}{1} \\times 100 = 20\\%$.",
    topic: "Neutralization and Titration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 17,
    question_text: "The concentration of Cl⁻ ions in a mixture obtained by mixing 100 ml of 0.1 M NaCl with 40 ml of 0.1 M AgNO₃ is",
    options: ["0.1 M", "3/70 M", "2/70 M", "3/140 M"],
    correct_index: 1,
    solution: "Initial moles of $\\text{Cl}^- = 0.1 \\times 0.1 = 0.01\\text{ mol}$. Moles of $\\text{Ag}^+ = 0.04 \\times 0.1 = 0.004\\text{ mol}$. $\\text{Ag}^+$ precipitates $0.004\\text{ mol}$ $\\text{Cl}^-$ as $\\text{AgCl}$. Remaining $\\text{Cl}^- = 0.01 - 0.004 = 0.006\\text{ mol}$. Total volume = $140\\text{ mL} = 0.14\\text{ L}$. $[\\text{Cl}^-] = \\frac{0.006}{0.14} = \\frac{3}{70}\\text{ M}$.",
    topic: "Precipitation and Concentration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 18,
    question_text: "2.76 g silver carbonate on being strongly heated yield a residue weighing",
    options: ["2.16 g", "2.48 g", "2.32 g", "2.64 g"],
    correct_index: 0,
    solution: "Reaction: $\\text{Ag}_2\\text{CO}_3 \\xrightarrow{\\Delta} 2\\text{Ag} + \\text{CO}_2 + \\frac{1}{2}\\text{O}_2$. Molar mass of $\\text{Ag}_2\\text{CO}_3 = 276\\text{ g/mol}$. Moles of $\\text{Ag}_2\\text{CO}_3 = \\frac{2.76}{276} = 0.01\\text{ mol}$. Residue is metallic Ag: Mass = $2 \\times 0.01 \\times 108 = 2.16\\text{ g}$.",
    topic: "Thermal Decomposition",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 19,
    question_text: "Volume of air required to completely burn 12 g of carbon at STP would be (Air contains 21% oxygen by volume)",
    options: ["106.67 L", "118.2 L", "120 L", "225.4 L"],
    correct_index: 0,
    solution: "$\\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2$. 12 g C (1 mol) requires $1\\text{ mol } \\text{O}_2 = 22.4\\text{ L}$ at STP. Since air contains $21\\%$ oxygen by volume, Volume of air = $\\frac{22.4}{0.21} \\approx 106.67\\text{ L}$.",
    topic: "Combustion and Eudiometry",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 20,
    question_text: "The ratio of oxygen in FeO and Fe₂O₃ is (containing equal amount of iron)",
    options: ["1 : 3", "2 : 3", "1 : 2", "3 : 2"],
    correct_index: 1,
    solution: "For equal amount of iron (say 2 atoms of Fe), FeO becomes $\\text{Fe}_2\\text{O}_2$ (2 oxygen atoms) and $\\text{Fe}_2\\text{O}_3$ has 3 oxygen atoms. Ratio of oxygen atoms = 2 : 3.",
    topic: "Law of Multiple Proportions",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 21,
    question_text: "2.3 g Na is completely burnt to give Na₂O, which is then dissolved in 1 L. How much H₂SO₄ in gram is needed to neutralize the solution completely?",
    options: ["4.9 g", "9.8 g", "0.49 g", "0.98 g"],
    correct_index: 0,
    solution: "Moles of Na = $\\frac{2.3}{23} = 0.1\\text{ mol}$. Moles of $\\text{NaOH}$ produced = $0.1\\text{ mol}$. $2\\text{NaOH} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{Na}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}$. Moles of $\\text{H}_2\\text{SO}_4 = \\frac{0.1}{2} = 0.05\\text{ mol}$. Mass of $\\text{H}_2\\text{SO}_4 = 0.05 \\times 98 = 4.9\\text{ g}$.",
    topic: "Stoichiometry & Neutralization",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 22,
    question_text: "The equivalent weight of Ca(OH)₂ in this reaction is:\nCa(OH)₂ + HCl → Ca(OH)Cl + H₂O\n(M = Formula mass of Ca(OH)₂)",
    options: ["M/2", "M/3", "M", "2M"],
    correct_index: 2,
    solution: "In this partial neutralization, only one $\\text{OH}^-$ group of $\\text{Ca(OH)}_2$ is replaced by $\\text{Cl}^-$. Hence, n-factor = 1. Equivalent weight = $\\frac{M}{1} = M$.",
    topic: "Equivalent Weight",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 23,
    question_text: "1 mole of NH₃ and 1 mole of O₂ are reacted completely as per the following reaction:\n4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g)\nThe correct statement is",
    options: [
      "1.0 mole of NO will be produced",
      "Oxygen will be consumed completely",
      "1.5 moles of H₂O is produced",
      "Ammonia will be consumed completely"
    ],
    correct_index: 1,
    solution: "According to stoichiometry, $1\\text{ mol NH}_3$ requires $\\frac{5}{4} = 1.25\\text{ mol O}_2$. Since only $1\\text{ mol O}_2$ is available, $\\text{O}_2$ is the limiting reagent and will be consumed completely.",
    topic: "Limiting Reagent",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 24,
    question_text: "The normality of 0.3 M H₃PO₄ when it undergoes the following reaction:\nH₃PO₄ + 2OH⁻ → HPO₄²⁻ + 2H₂O would be",
    options: ["0.6 N", "0.15 N", "0.9 N", "0.1 N"],
    correct_index: 0,
    solution: "In this reaction, $\\text{H}_3\\text{PO}_4$ loses $2\\text{ H}^+$ ions, so its basicity (n-factor) is 2. $\\text{Normality} = \\text{Molarity} \\times n = 0.3 \\times 2 = 0.6\\text{ N}$.",
    topic: "Normality and n-factor",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 25,
    question_text: "Which of the following contains maximum number of atoms?",
    options: [
      "4 g atom of Ne",
      "2 g molecules of NH₃",
      "108 g silver",
      "18 ml water"
    ],
    correct_index: 1,
    solution: "(1) 4 g-atom Ne = $4 N_A$ atoms. (2) 2 g-molecules $\\text{NH}_3$ = $2 \\times 4 \\times N_A = 8 N_A$ atoms. (3) 108 g Ag = 1 mol = $1 N_A$ atoms. (4) 18 mL $\\text{H}_2\\text{O} = 1\\text{ mol} = 3 N_A$ atoms. Maximum is $8 N_A$ in option (2).",
    topic: "Mole Concept & Number of Atoms",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 26,
    question_text: "100 ml of 10 M HCl is diluted to 2 M HCl. Volume of water added is",
    options: ["500 ml", "400 ml", "300 ml", "200 ml"],
    correct_index: 1,
    solution: "$M_1 V_1 = M_2 V_2 \\Rightarrow 10 \\times 100 = 2 \\times V_2 \\Rightarrow V_2 = 500\\text{ mL}$. Volume of water added = $500 - 100 = 400\\text{ mL}$.",
    topic: "Dilution Law",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 27,
    question_text: "Total number of atoms in 18 a.m.u. of H₂O is",
    options: ["3", "3/N_A", "N_A", "3N_A"],
    correct_index: 0,
    solution: "The molecular mass of 1 molecule of $\\text{H}_2\\text{O}$ is $18\\text{ amu}$. Thus, $18\\text{ amu}$ corresponds to exactly 1 molecule of $\\text{H}_2\\text{O}$, which contains 3 atoms (2 H + 1 O).",
    topic: "Atomic Mass Unit",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 28,
    question_text: "6.02 × 10²⁰ molecules of sugar are present in 100 ml of its solution. The concentration of sugar solution is",
    options: ["0.001 M", "0.1 M", "0.02 M", "0.01 M"],
    correct_index: 3,
    solution: "Moles of sugar = $\\frac{6.02 \\times 10^{20}}{6.022 \\times 10^{23}} = 10^{-3}\\text{ mol}$. Volume = $100\\text{ mL} = 0.1\\text{ L}$. Molarity = $\\frac{10^{-3}}{0.1} = 0.01\\text{ M}$.",
    topic: "Molarity",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 29,
    question_text: "In Haber's process N₂ + 3H₂ → 2NH₃, starting with 5 mol of N₂ and 10 mol of H₂, the reagent completely consumed in the reaction is",
    options: ["N₂", "H₂", "Cannot be predicted", "Neither N₂ nor H₂"],
    correct_index: 1,
    solution: "5 mol $\\text{N}_2$ requires $3 \\times 5 = 15\\text{ mol H}_2$. Since only $10\\text{ mol H}_2$ is available, $\\text{H}_2$ is the limiting reagent and is completely consumed.",
    topic: "Limiting Reagent",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 30,
    question_text: "Number of significant figures in 141 m, 0.141 m and 0.0141 m will be respectively",
    options: ["3, 3 and 3", "3, 3 and 4", "3, 4 and 5", "3, 4 and 4"],
    correct_index: 0,
    solution: "In 141 m: 3 non-zero digits (3 sig figs). In 0.141 m: 3 sig figs (leading zero not significant). In 0.0141 m: 3 sig figs (leading zeros before 1 are not significant). Thus 3, 3, and 3.",
    topic: "Significant Figures",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 31,
    question_text: "0.45g of a dibasic acid is completely neutralised by 100 ml N/10 NaOH. The molecular weight of acid is?",
    options: ["45", "90", "180", "22.5"],
    correct_index: 1,
    solution: "Equivalents = $0.1 \\times \\frac{100}{1000} = 0.01\\text{ eq}$. Equivalent weight = $\\frac{0.45}{0.01} = 45$. For dibasic acid, Molecular weight = $\\text{Eq. wt} \\times 2 = 45 \\times 2 = 90$.",
    topic: "Volumetric Analysis",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 32,
    question_text: "Caustic soda solution is found to be 60% by mass having density 1.6 g/ml. How much volume of water is to be added to make 7.2 L of M/2 solution?",
    options: ["150 ml", "7050 ml", "705 ml", "1500 ml"],
    correct_index: 1,
    solution: "Molarity of stock = $\\frac{10 \\times 1.6 \\times 60}{40} = 24\\text{ M}$. Moles needed for $7.2\\text{ L}$ of $0.5\\text{ M} = 7.2 \\times 0.5 = 3.6\\text{ mol}$. Volume of stock needed = $\\frac{3.6}{24} = 0.15\\text{ L} = 150\\text{ mL}$. Volume of water to add = $7200 - 150 = 7050\\text{ mL}$.",
    topic: "Concentration and Dilution",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 33,
    question_text: "A certain metal gives two oxides. In the 1st oxide the percentage of oxygen is 22.5% and in the 2nd oxide the percentage of oxygen is 36.8% respectively. If the formula of the 1st oxide is MO, then formula of the 2nd oxide will be",
    options: ["M₃O₄", "M₂O", "MO₂", "M₂O₃"],
    correct_index: 2,
    solution: "In MO: $\\frac{A_M}{16} = \\frac{77.5}{22.5} \\Rightarrow A_M \\approx 55.1$. In second oxide: $\\%M = 63.2\\%, \\%O = 36.8\\%$. Ratio $M:O = \\frac{63.2}{55.1} : \\frac{36.8}{16} = 1.15 : 2.30 = 1 : 2$. Thus, formula is $\\text{MO}_2$.",
    topic: "Empirical Formula",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 34,
    question_text: "The amount of water obtained on burning 10 g of H₂ in 40 g of O₂ is",
    options: ["90 g", "45 g", "40 g", "30 g"],
    correct_index: 1,
    solution: "$2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}$. Moles of $\\text{H}_2 = 5$, Moles of $\\text{O}_2 = \\frac{40}{32} = 1.25\\text{ mol}$. $\\text{O}_2$ is limiting reagent. Moles of $\\text{H}_2\\text{O} = 2 \\times 1.25 = 2.5\\text{ mol}$. Mass of $\\text{H}_2\\text{O} = 2.5 \\times 18 = 45\\text{ g}$.",
    topic: "Limiting Reagent & Stoichiometry",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 35,
    question_text: "If x g of a metal reacts with oxygen to give y g metal oxide, then equivalent weight of metal is",
    options: [
      "(y - x)/x × 8",
      "(x - y)/y × 8",
      "(y - x)/y × 8",
      "x/(y - x) × 8"
    ],
    correct_index: 3,
    solution: "Mass of oxygen = $(y - x)\\text{ g}$. Equivalent weight of metal = $\\frac{\\text{Mass of metal}}{\\text{Mass of oxygen}} \\times 8 = \\frac{x}{y - x} \\times 8$.",
    topic: "Equivalent Weight of Metals",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 36,
    question_text: "The V.D. of an organic compound is 59. If the percentage of C, O, H are 40.656%, 54.128% and 5.016% respectively, then empirical formula of the compound is",
    options: ["C₂H₃O₂", "C₂H₃O", "CH₂O", "C₄H₆O"],
    correct_index: 0,
    solution: "Moles: C: $\\frac{40.656}{12} = 3.388$, H: $\\frac{5.016}{1} = 5.016$, O: $\\frac{54.128}{16} = 3.383$. Dividing by 3.383 gives $1 : 1.48 : 1 = 2 : 3 : 2$. Empirical formula is $\\text{C}_2\\text{H}_3\\text{O}_2$.",
    topic: "Empirical Formula",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 37,
    question_text: "How many moles of e⁻ weigh one kilogram? (m_e = 9.1 × 10⁻³¹ kg)",
    options: [
      "6.022 × 10²³",
      "(6.022 × 10⁵⁴)/9.1",
      "10⁸/(9.1 × 6.022)",
      "(1/9.1) × 10³¹"
    ],
    correct_index: 2,
    solution: "Mass of 1 mole of electrons = $N_A \\times m_e = 6.022 \\times 10^{23} \\times 9.1 \\times 10^{-31}\\text{ kg} = 9.1 \\times 6.022 \\times 10^{-8}\\text{ kg}$. Number of moles in $1\\text{ kg} = \\frac{1}{9.1 \\times 6.022 \\times 10^{-8}} = \\frac{10^8}{9.1 \\times 6.022}$.",
    topic: "Mass of Electron & Mole",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 38,
    question_text: "Number of g-atoms of oxygen present in 360 g of glucose?",
    options: ["12", "144", "6", "2"],
    correct_index: 0,
    solution: "Molar mass of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) = $180\\text{ g/mol}$. Moles of glucose = $\\frac{360}{180} = 2\\text{ mol}$. Each mole contains 6 g-atoms of O. Total g-atoms of O = $2 \\times 6 = 12$.",
    topic: "Gram Atoms & Mole Concept",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 39,
    question_text: "Law of constant proportion is not valid in?",
    options: ["KCl", "CaO", "Na₀.₉₈Cl₁.₀", "Ni₀.₉₈O"],
    correct_index: 3,
    solution: "Non-stoichiometric compounds like $\\text{Ni}_{0.98}\\text{O}$ have variable composition due to crystal defects (metal deficiency) and do not follow the law of constant proportion.",
    topic: "Law of Constant Proportion",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 40,
    question_text: "An aqueous solution of 6.3 g oxalic acid dihydrate is made up to 250 ml. The volume of 0.1 N NaOH required to completely neutralize 10 ml of this solution is",
    options: ["40 ml", "20 ml", "10 ml", "4 ml"],
    correct_index: 0,
    solution: "Equivalent weight of $(\\text{COOH})_2\\cdot 2\\text{H}_2\\text{O} = \\frac{126}{2} = 63$. Normality = $\\frac{6.3}{63 \\times 0.25} = 0.4\\text{ N}$. Using $N_1 V_1 = N_2 V_2 \\Rightarrow 0.4 \\times 10 = 0.1 \\times V_2 \\Rightarrow V_2 = 40\\text{ mL}$.",
    topic: "Neutralization Titration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 41,
    question_text: "A compound contains 28% nitrogen and 72% metal by mass. 3 atoms of the metal combine with 2 atoms of nitrogen. The atomic mass of metal is",
    options: ["12", "36", "24", "48"],
    correct_index: 2,
    solution: "Formula is $\\text{M}_3\\text{N}_2$. Mass ratio: $\\frac{3 A_M}{2 \\times 14} = \\frac{72}{28} \\Rightarrow 3 A_M = 72 \\Rightarrow A_M = 24$.",
    topic: "Atomic Mass Determination",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 42,
    question_text: "If 0.50 mole of BaCl₂ is mixed with 0.20 mol of Na₃PO₄, the maximum number of mole of Ba₃(PO₄)₂ that can be formed is",
    options: ["0.70", "0.50", "0.20", "0.10"],
    correct_index: 3,
    solution: "$3\\text{BaCl}_2 + 2\\text{Na}_3\\text{PO}_4 \\rightarrow \\text{Ba}_3(\\text{PO}_4)_2 + 6\\text{NaCl}$. $0.20\\text{ mol Na}_3\\text{PO}_4$ requires $0.30\\text{ mol BaCl}_2$. $\\text{Na}_3\\text{PO}_4$ is limiting. Moles of $\\text{Ba}_3(\\text{PO}_4)_2 = \\frac{0.20}{2} = 0.10\\text{ mol}$.",
    topic: "Limiting Reagent",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 43,
    question_text: "1 litre of CO₂ on passing through red hot coke produces gas mixture of final volume 1.4 litre at same temperature and pressure. The composition of the final gas mixture is",
    options: [
      "0.4 litre CO₂ and 1 litre CO",
      "0.8 litre CO₂ and 0.6 litre CO",
      "0.6 litre CO₂ and 0.8 litre CO",
      "0.7 litre CO₂ and 0.7 litre CO"
    ],
    correct_index: 2,
    solution: "$\\text{CO}_2(g) + \\text{C}(s) \\rightarrow 2\\text{CO}(g)$. Let $x\\text{ L}$ of $\\text{CO}_2$ react. Total volume = $(1 - x) + 2x = 1 + x = 1.4 \\Rightarrow x = 0.4\\text{ L}$. $\\text{CO}_2 = 1 - 0.4 = 0.6\\text{ L}$, $\\text{CO} = 2(0.4) = 0.8\\text{ L}$.",
    topic: "Gas Volume and Reaction Stoichiometry",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 44,
    question_text: "20 g of mixture of Na₂CO₃ and CaCO₃ on heating produces 1.12 litre CO₂ at S.T.P. % weight of Na₂CO₃ in the mixture is",
    options: ["25", "40", "50", "75"],
    correct_index: 3,
    solution: "$\\text{Na}_2\\text{CO}_3$ does not decompose. $\\text{CaCO}_3 \\xrightarrow{\\Delta} \\text{CaO} + \\text{CO}_2$. Moles of $\\text{CO}_2 = \\frac{1.12}{22.4} = 0.05\\text{ mol}$. Mass of $\\text{CaCO}_3 = 0.05 \\times 100 = 5\\text{ g}$. Mass of $\\text{Na}_2\\text{CO}_3 = 20 - 5 = 15\\text{ g}$. $\\% = \\frac{15}{20} \\times 100 = 75\\%$.",
    topic: "Mixture Analysis",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 45,
    question_text: "Total number of electrons present in 48 g of O₃ is",
    options: ["N_A", "2.4 N_A", "24 N_A", "8 N_A"],
    correct_index: 2,
    solution: "Moles of $\\text{O}_3 = \\frac{48}{48} = 1\\text{ mol}$. Electrons per molecule = $3 \\times 8 = 24$. Total electrons = $1 \\times 24 \\times N_A = 24 N_A$.",
    topic: "Number of Electrons in Molecules",
    marks: 1, difficulty: "easy"
  }
];

export async function insertBatch1() {
  console.log(`Inserting Batch 1 (Q15-Q45): ${BATCH_1.length} questions...`);
  let count = 0;
  for (const q of BATCH_1) {
    const ex = await query(
      `SELECT id FROM question_bank WHERE chapter = $1 AND question_text = $2 LIMIT 1`,
      [CHAPTER, q.question_text]
    );
    if (ex.rows.length > 0) {
      continue;
    }
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
  console.log(`✅ Batch 1 done: ${count} inserted.`);
}

