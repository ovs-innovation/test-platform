// Batch 2: Questions 46 to 76 (Some Basic Concepts of Chemistry)
import { query } from '../src/config/db.js';

const SUBJECT_ID = 10;
const CHAPTER_ID = 127;
const CHAPTER = 'Some Basic Concepts of Chemistry';
const CATEGORY = 'Chemistry';

export const BATCH_2 = [
  {
    q_num: 46,
    question_text: "Number of moles of calcium phosphate, Ca₃(PO₄)₂ that contains 0.5 mole of oxygen atom is",
    options: ["6.25 × 10⁻⁴", "6.25 × 10⁻²", "6.25 × N_A", "8 N_A"],
    correct_index: 1,
    solution: "1 mole of $\\text{Ca}_3(\\text{PO}_4)_2$ contains 8 moles of oxygen atoms. Moles of $\\text{Ca}_3(\\text{PO}_4)_2 = \\frac{0.5}{8} = 0.0625 = 6.25 \\times 10^{-2}\\text{ mol}$.",
    topic: "Mole Concept in Formula Units",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 47,
    question_text: "Number of atoms of iron present in 100g Fe₂O₃ having 20% purity is",
    options: ["0.20 N_A", "0.25 N_A", "0.50 N_A", "0.30 N_A"],
    correct_index: 1,
    solution: "Mass of pure $\\text{Fe}_2\\text{O}_3 = 20\\% \\text{ of } 100 = 20\\text{ g}$. Molar mass of $\\text{Fe}_2\\text{O}_3 = 160\\text{ g/mol}$. Moles = $\\frac{20}{160} = 0.125\\text{ mol}$. Atoms of $\\text{Fe} = 0.125 \\times 2 \\times N_A = 0.25 N_A$.",
    topic: "Purity and Stoichiometry",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 48,
    question_text: "The molality of dilute aqueous solution of 0.05 M NaOH is",
    options: ["0.05 m", "18.5 m", "55.55 m", "0.1 m"],
    correct_index: 0,
    solution: "For very dilute aqueous solutions, the density is approximately $1.0\\text{ g/mL}$ and the mass of solvent in $1\\text{ L}$ solution is nearly $1000\\text{ g} = 1\\text{ kg}$. Hence, $\\text{Molality} \\approx \\text{Molarity} = 0.05\\text{ m}$.",
    topic: "Molarity and Molality",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 49,
    question_text: "A gas is found to have formula [CO]_x and its vapour density is 70. The value of x will be",
    options: ["3", "5", "6", "2.5"],
    correct_index: 1,
    solution: "Molar mass = $2 \\times \\text{Vapour Density} = 2 \\times 70 = 140$. Formula mass of $[\\text{CO}] = 12 + 16 = 28$. $x = \\frac{140}{28} = 5$.",
    topic: "Vapour Density and Molecular Formula",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 50,
    question_text: "The number of molecules present in one drop (0.05 ml) of benzene (density = 0.78 g/ml) is nearly equal to (N_A = 6 × 10²³)",
    options: ["6 × 10²³", "3 × 10²¹", "3 × 10²⁰", "6 × 10¹⁸"],
    correct_index: 2,
    solution: "Mass of drop = $0.05 \\times 0.78 = 0.039\\text{ g}$. Molar mass of benzene ($\\text{C}_6\\text{H}_6$) = $78\\text{ g/mol}$. Moles = $\\frac{0.039}{78} = 5 \\times 10^{-4}\\text{ mol}$. Number of molecules = $5 \\times 10^{-4} \\times 6 \\times 10^{23} = 3 \\times 10^{20}$.",
    topic: "Mole Concept in Liquids",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 51,
    question_text: "x₁ g of an element gives x₂ g of its oxide. The equivalent mass of the element is",
    options: [
      "(x₂ - x₁)/x₁ × 8",
      "(x₂ - x₁)/x₂ × 8",
      "x₁/(x₂ - x₁) × 8",
      "x₂/(x₂ - x₁) × 8"
    ],
    correct_index: 2,
    solution: "Mass of oxygen = $(x_2 - x_1)\\text{ g}$. Equivalent mass = $\\frac{\\text{Mass of element}}{\\text{Mass of oxygen}} \\times 8 = \\frac{x_1}{x_2 - x_1} \\times 8$.",
    topic: "Equivalent Mass of Oxides",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 52,
    question_text: "In order to prepare 500 ml of N/25 HCl, what volume of N/20 HCl and N/30 HCl should be mixed respectively?",
    options: ["300 ml, 200 ml", "200 ml, 300 ml", "250 ml, 250 ml", "150 ml, 350 ml"],
    correct_index: 1,
    solution: "Let $V_1$ be volume of $N/20\\text{ HCl}$. Then volume of $N/30$ is $(500 - V_1)$. $\\frac{V_1}{20} + \\frac{500 - V_1}{30} = \\frac{500}{25} = 20$. Multiplying by 60: $3V_1 + 2(500 - V_1) = 1200 \\Rightarrow V_1 = 200\\text{ mL}$. Volume of $N/30 = 500 - 200 = 300\\text{ mL}$.",
    topic: "Mixing of Solutions",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 53,
    question_text: "If percentage of cobalt in a complex is 0.25% by mass, minimum molecular mass of complex will be (molar mass of Co = 59)",
    options: ["2.41 × 10⁵", "1.25 × 10⁵", "2.36 × 10⁴", "1.20 × 10⁴"],
    correct_index: 2,
    solution: "For minimum molecular mass, each molecule contains at least 1 cobalt atom ($59\\text{ g/mol}$). $\\frac{59}{M} \\times 100 = 0.25 \\Rightarrow M = \\frac{5900}{0.25} = 23600 = 2.36 \\times 10^4\\text{ g/mol}$.",
    topic: "Minimum Molecular Weight",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 54,
    question_text: "224 ml of a triatomic gas weighs 1 g at 273 K and 1 atm. The mass of one atom of this gas is",
    options: ["8.30 × 10⁻²³ g", "2.08 × 10⁻²³ g", "5.53 × 10⁻²³ g", "6.24 × 10⁻²³ g"],
    correct_index: 2,
    solution: "Moles of gas = $\\frac{224}{22400} = 0.01\\text{ mol}$. Molar mass = $\\frac{1}{0.01} = 100\\text{ g/mol}$. In 1 mole of triatomic gas, there are $3 N_A$ atoms. Mass of 1 atom = $\\frac{100}{3 \\times 6.022 \\times 10^{23}} \\approx 5.53 \\times 10^{-23}\\text{ g}$.",
    topic: "Mass of an Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 55,
    question_text: "Calculate the molarity of CaCl₂ when it is dissolved in 250 ml of the solution and gives 3.011 × 10²³ chloride ions",
    options: ["4 M", "2 M", "1.5 M", "1 M"],
    correct_index: 3,
    solution: "Moles of $\\text{Cl}^- = \\frac{3.011 \\times 10^{23}}{6.022 \\times 10^{23}} = 0.5\\text{ mol}$. Each $\\text{CaCl}_2$ yields $2\\text{ Cl}^-$, so Moles of $\\text{CaCl}_2 = \\frac{0.5}{2} = 0.25\\text{ mol}$. Volume = $250\\text{ mL} = 0.25\\text{ L}$. $\\text{Molarity} = \\frac{0.25}{0.25} = 1\\text{ M}$.",
    topic: "Ion Concentration & Molarity",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 56,
    question_text: "Commercially available concentrated hydrochloric acid contains 40% HCl by mass having density 1.20 gm cm⁻³. The normality of this solution is",
    options: ["9.65 N", "13.15 N", "15.26 N", "18.10 N"],
    correct_index: 1,
    solution: "$\\text{Normality} = \\frac{10 \\times d \\times \\%(w/w)}{\\text{Equivalent weight}} = \\frac{10 \\times 1.20 \\times 40}{36.5} = \\frac{480}{36.5} \\approx 13.15\\text{ N}$.",
    topic: "Normality from Density & %w/w",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 57,
    question_text: "The average molar mass of a mixture of CO(g) and CO₂(g) is 37. The mole percentage of CO(g) in the mixture is approximately",
    options: ["37.30", "43.75", "56.68", "65.25"],
    correct_index: 1,
    solution: "$M_{\\text{avg}} = 28 x + 44 (1 - x) = 37 \\Rightarrow 16 x = 7 \\Rightarrow x = \\frac{7}{16} = 0.4375$. Mole percentage of $\\text{CO} = 43.75\\%$.",
    topic: "Average Molar Mass of Gas Mixture",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 58,
    question_text: "The weight of 50% H₂SO₄ solution required to react completely with 50 g CaCO₃ would be",
    options: ["49 g", "98 g", "24.5 g", "196 g"],
    correct_index: 1,
    solution: "$\\text{CaCO}_3 + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{CaSO}_4 + \\text{CO}_2 + \\text{H}_2\\text{O}$. $50\\text{ g CaCO}_3 = 0.5\\text{ mol}$, requiring $0.5\\text{ mol pure H}_2\\text{SO}_4 = 49\\text{ g}$. Since solution is $50\\%$, mass of solution = $\\frac{49}{0.50} = 98\\text{ g}$.",
    topic: "Purity and Solution Stoichiometry",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 59,
    question_text: "12 ml of mixture containing carbon monoxide and nitrogen required 7 ml oxygen to form CO₂ and NO on combustion, the volume of carbon monoxide in the mixture will be",
    options: ["2 ml", "10 ml", "4 ml", "8 ml"],
    correct_index: 1,
    solution: "$\\text{CO} + \\frac{1}{2}\\text{O}_2 \\rightarrow \\text{CO}_2$ and $\\text{N}_2 + \\text{O}_2 \\rightarrow 2\\text{NO}$. Let $V_{\\text{CO}} = x$, $V_{\\text{N}_2} = (12 - x)$. $\\text{O}_2$ consumed = $\\frac{x}{2} + (12 - x) = 7 \\Rightarrow 12 - \\frac{x}{2} = 7 \\Rightarrow \\frac{x}{2} = 5 \\Rightarrow x = 10\\text{ mL}$.",
    topic: "Eudiometry",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 60,
    question_text: "If an iodized salt contains 10% of KI and a person takes 20 g of the salt everyday, the iodide ions going into his body everyday would be approximately [Atomic weight of K = 39 u and I = 127 u]",
    options: ["7.2 × 10²¹", "7.2 × 10¹⁹", "9.5 × 10¹⁸", "3.6 × 10²⁰"],
    correct_index: 0,
    solution: "Mass of $\\text{KI} = 10\\% \\text{ of } 20\\text{ g} = 2\\text{ g}$. Molar mass of $\\text{KI} = 39 + 127 = 166\\text{ g/mol}$. Number of $\\text{I}^-$ ions = $\\frac{2}{166} \\times 6.022 \\times 10^{23} \\approx 7.2 \\times 10^{21}$.",
    topic: "Everyday Chemistry & Mole Concept",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 61,
    question_text: "1.5 g of a divalent metal displaced 4 g of copper (atomic weight = 64) from a solution of CuSO₄. The atomic weight of the metal is",
    options: ["12", "24", "48", "6"],
    correct_index: 1,
    solution: "Equivalents of metal = Equivalents of Cu. $\\frac{1.5}{E} = \\frac{4}{64/2} = \\frac{4}{32} = 0.125 \\Rightarrow E = 12$. For divalent metal, Atomic weight = $E \\times 2 = 12 \\times 2 = 24$.",
    topic: "Law of Chemical Equivalence",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 62,
    question_text: "What volume of hydrogen gas at 273 K and 1 atm pressure will be consumed in obtaining 32.4 g of elemental boron (atomic mass = 10.8) from the reduction of boron trichloride by hydrogen?",
    options: ["67.2 L", "44.8 L", "100.8 L", "22.4 L"],
    correct_index: 2,
    solution: "$2\\text{BCl}_3 + 3\\text{H}_2 \\rightarrow 2\\text{B} + 6\\text{HCl}$. Moles of B = $\\frac{32.4}{10.8} = 3\\text{ mol}$. Moles of $\\text{H}_2$ required = $\\frac{3}{2} \\times 3 = 4.5\\text{ mol}$. Volume of $\\text{H}_2 = 4.5 \\times 22.4 = 100.8\\text{ L}$.",
    topic: "Stoichiometry & Gas Volume",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 63,
    question_text: "x g of Ag was dissolved in HNO₃ and the solution was treated with excess of NaCl when 2.87 g of AgCl was precipitated. The value of x is",
    options: ["1.08 g", "2.16 g", "2.70 g", "1.62 g"],
    correct_index: 1,
    solution: "Moles of $\\text{AgCl} = \\frac{2.87}{143.5} = 0.02\\text{ mol}$. Mass of silver = $0.02 \\times 108 = 2.16\\text{ g}$.",
    topic: "Gravimetric Analysis",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 64,
    question_text: "The crystalline salt, Na₂SO₄·xH₂O on heating loses 55.9% of its weight. The formula of the crystalline salt is",
    options: ["Na₂SO₄·5H₂O", "Na₂SO₄·7H₂O", "Na₂SO₄·10H₂O", "Na₂SO₄·H₂O"],
    correct_index: 2,
    solution: "Molar mass of anhydrous $\\text{Na}_2\\text{SO}_4 = 142\\text{ g/mol}$. Loss on heating is water: $\\frac{18x}{142 + 18x} = 0.559 \\Rightarrow 18x = 79.378 + 10.062x \\Rightarrow 7.938x = 79.378 \\Rightarrow x = 10$. Salt is $\\text{Na}_2\\text{SO}_4\\cdot 10\\text{H}_2\\text{O}$.",
    topic: "Water of Crystallization",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 65,
    question_text: "The correct statement for 'limiting reagent' in a chemical reaction is\nI. It is consumed at last\nII. It is completely consumed\nIII. It decides the yield of product",
    options: ["I and II", "II and III", "I and III", "I, II and III"],
    correct_index: 1,
    solution: "The limiting reagent is completely consumed during the reaction (II) and determines the maximum theoretical yield of product (III). It is consumed first, not last (I is incorrect).",
    topic: "Limiting Reagent Concept",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 66,
    question_text: "When 100 ml of M/10 H₂SO₄ is mixed with 500 ml of M/10 NaOH then nature of resulting solution and normality of excess of reactant left is",
    options: ["Acidic, N/5", "Basic, N/5", "Basic, N/20", "Acidic, N/10"],
    correct_index: 2,
    solution: "meq of $\\text{H}_2\\text{SO}_4 = 100 \\times 0.1 \\times 2 = 20\\text{ meq}$. meq of $\\text{NaOH} = 500 \\times 0.1 \\times 1 = 50\\text{ meq}$. Excess base = $50 - 20 = 30\\text{ meq}$. Total volume = $600\\text{ mL}$. $\\text{Normality} = \\frac{30}{600} = \\frac{1}{20} = \\frac{N}{20}$ (Basic).",
    topic: "Neutralization & Resulting Solution",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 67,
    question_text: "Haemoglobin contains 0.25% iron by weight. The molecular weight of haemoglobin is 89000. Calculate the number of iron atom per molecule of haemoglobin",
    options: ["3 atom", "4 atom", "2 atom", "1 atom"],
    correct_index: 1,
    solution: "Mass of Fe per molecule = $\\frac{0.25}{100} \\times 89000 = 222.5\\text{ amu}$. Number of Fe atoms = $\\frac{222.5}{56} \\approx 3.97 \\approx 4$ atoms.",
    topic: "Percentage Composition & Molecular Formula",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 68,
    question_text: "A gaseous hydrocarbon (12 ml) is exploded with excess of oxygen. On cooling, the contraction in volume is 48 ml and there is further contraction of 48 ml in volume when passed through lime water. The molecular formula of hydrocarbon is",
    options: ["C₄H₁₀", "C₂H₆", "C₄H₁₂", "C₄H₈"],
    correct_index: 3,
    solution: "$\\text{C}_x\\text{H}_y + (x + y/4)\\text{O}_2 \\rightarrow x\\text{CO}_2 + y/2\\text{H}_2\\text{O}(l)$. Volume of $\\text{CO}_2 = 12 x = 48 \\Rightarrow x = 4$. Contraction on cooling = $12(1 + y/4) = 48 \\Rightarrow 1 + y/4 = 4 \\Rightarrow y/4 = 3 \\Rightarrow y = 8$. Molecular formula is $\\text{C}_4\\text{H}_8$.",
    topic: "Eudiometry",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 69,
    question_text: "The equivalent mass of an element is 4. Its chloride has vapour density 59.25. Then valency of the element is",
    options: ["4", "3", "2", "1"],
    correct_index: 1,
    solution: "Molecular mass of chloride = $2 \\times 59.25 = 118.5$. Formula is $\\text{MCl}_n$. Mass = $E \\cdot n + 35.5 n = 4 n + 35.5 n = 39.5 n = 118.5 \\Rightarrow n = 3$. Valency is 3.",
    topic: "Dulong-Petit & Valency",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 70,
    question_text: "3 g of an oxide of a metal is converted to chloride completely and it yields 5 g chloride. The equivalent weight of metal is",
    options: ["20.86", "12.75", "35.10", "33.25"],
    correct_index: 3,
    solution: "$\\frac{\\text{Mass of oxide}}{\\text{Mass of chloride}} = \\frac{E + 8}{E + 35.5} \\Rightarrow \\frac{3}{5} = \\frac{E + 8}{E + 35.5} \\Rightarrow 3E + 106.5 = 5E + 40 \\Rightarrow 2E = 66.5 \\Rightarrow E = 33.25$.",
    topic: "Equivalent Weight Conversion",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 71,
    question_text: "Three isotopes of each carbon and oxygen is taken then types of CO₂ molecules which can be formed is",
    options: ["6", "9", "12", "18"],
    correct_index: 3,
    solution: "Carbon has 3 isotopes. Two oxygen atoms from 3 isotopes can be selected in $\\frac{3(3+1)}{2} = 6$ ways (including identical pairs). Total combinations of $\\text{CO}_2 = 3 \\times 6 = 18$.",
    topic: "Isotopic Combinations",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 72,
    question_text: "The ratio of volume of O₂ required for complete combustion of a gaseous alkane to CO₂ formed is found to be 13 : 8 then molecular formula of alkane is",
    options: ["C₄H₁₀", "C₃H₈", "C₂H₆", "C₅H₁₂"],
    correct_index: 0,
    solution: "For $\\text{C}_n\\text{H}_{2n+2} + \\frac{3n+1}{2}\\text{O}_2 \\rightarrow n\\text{CO}_2 + (n+1)\\text{H}_2\\text{O}$, ratio $\\frac{\\text{O}_2}{\\text{CO}_2} = \\frac{3n+1}{2n} = \\frac{13}{8} \\Rightarrow 24n + 8 = 26n \\Rightarrow 2n = 8 \\Rightarrow n = 4$. Alkane is butane $\\text{C}_4\\text{H}_{10}$.",
    topic: "Combustion Stoichiometry",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 73,
    question_text: "Weight of Na₂CO₃ of 80% purity would be required to neutralize 500 ml of 0.1 N HCl is",
    options: ["3.3 g", "0.8 g", "5.3 g", "80 g"],
    correct_index: 0,
    solution: "Equivalents of $\\text{HCl} = 0.5 \\times 0.1 = 0.05\\text{ eq}$. Mass of pure $\\text{Na}_2\\text{CO}_3 = 0.05 \\times 53 = 2.65\\text{ g}$. Mass of $80\\%$ pure sample = $\\frac{2.65}{0.80} \\approx 3.3\\text{ g}$.",
    topic: "Purity and Titration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 74,
    question_text: "Equal weight of Fe₂O₃ and Fe₃O₄ has oxygen atoms in the ratio",
    options: ["174 / 160", "160 / 147", "3/4", "4/3"],
    correct_index: 0,
    solution: "For mass $m$: Moles of $\\text{O}$ in $\\text{Fe}_2\\text{O}_3 = 3 \\times \\frac{m}{160}$. Moles of $\\text{O}$ in $\\text{Fe}_3\\text{O}_4 = 4 \\times \\frac{m}{232}$. Ratio = $\\frac{3/160}{4/232} = \\frac{3 \\times 232}{4 \\times 160} = \\frac{696}{640} = \\frac{174}{160}$.",
    topic: "Mole Concept in Oxides",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 75,
    question_text: "Two elements A and B form the compound AB₂ and AB₃. If 0.5 mole of AB₂ weighs 32 g and 2 moles of AB₃ weighs 160 g. Then the atomic weights of A and B will be respectively",
    options: ["16, 32", "32, 16", "16, 16", "32, 32"],
    correct_index: 1,
    solution: "$M(\\text{AB}_2) = \\frac{32}{0.5} = 64 \\Rightarrow A + 2B = 64$. $M(\\text{AB}_3) = \\frac{160}{2} = 80 \\Rightarrow A + 3B = 80$. Subtracting gives $B = 16$, and $A = 64 - 32 = 32$. Atomic weights are 32 and 16.",
    topic: "Determination of Atomic Weights",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 76,
    question_text: "Equal volume of three flasks contains He, H₂ and O₃ respectively. Find the incorrect statement",
    options: [
      "Number of moles of all the three gases will be same",
      "Number of molecules in three flasks will be same",
      "Number of atoms in three flasks will be same",
      "Weight of all the three flasks will be different"
    ],
    correct_index: 2,
    solution: "Under identical conditions of T and P, equal volumes contain equal moles and equal molecules. However, the atomicities are 1 (He), 2 (H₂), and 3 (O₃). Hence, the number of atoms will be in the ratio 1 : 2 : 3 (NOT same). Statement (3) is incorrect.",
    topic: "Avogadro's Hypothesis and Atomicity",
    marks: 1, difficulty: "easy"
  }
];

export async function insertBatch2() {
  console.log(`Inserting Batch 2 (Q46-Q76): ${BATCH_2.length} questions...`);
  let count = 0;
  for (const q of BATCH_2) {
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
  console.log(`✅ Batch 2 done: ${count} inserted.`);
}

