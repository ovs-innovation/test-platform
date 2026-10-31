// Batch 3: Questions 77 to 107 (Some Basic Concepts of Chemistry)
import { query } from '../src/config/db.js';

const SUBJECT_ID = 10;
const CHAPTER_ID = 127;
const CHAPTER = 'Some Basic Concepts of Chemistry';
const CATEGORY = 'Chemistry';

export const BATCH_3 = [
  {
    q_num: 77,
    question_text: "The volume occupied by 4 g equivalents of oxygen molecule under STP will be",
    options: ["5.6 litres", "22.4/8 litres", "11.2 litres", "22.4 litres"],
    correct_index: 3,
    solution: "For oxygen gas, 1 mole ($32\\text{ g} = 22.4\\text{ L}$ at STP) corresponds to 4 equivalents (valency factor = 4). Hence, the volume of 1 equivalent of $\\text{O}_2$ is $\\frac{22.4}{4} = 5.6\\text{ L}$. For 4 equivalents, the volume is $4 \\times 5.6 = 22.4\\text{ litres}$.",
    topic: "Equivalent Volume of Gases",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 78,
    question_text: "Calculate the number of molecules of product formed when 100 atoms of A and 100 atoms of B are allowed to react:\nA(g) + B₂(g) → AB₂(g)",
    options: ["100", "50", "40", "60"],
    correct_index: 1,
    solution: "100 atoms of B correspond to 50 molecules of $\\text{B}_2$. According to reaction stoichiometry, $1\\text{ atom A} + 1\\text{ molecule B}_2 \\rightarrow 1\\text{ molecule AB}_2$. With 100 atoms A and 50 molecules $\\text{B}_2$, $\\text{B}_2$ is the limiting reagent and yields exactly 50 molecules of $\\text{AB}_2$.",
    topic: "Limiting Reagent at Molecular Level",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 79,
    question_text: "1 g atom of atomic oxygen, 2 g molecule of dioxygen and 3 g mole of O₃ are mixed in a container, then total number of oxygen atoms present will be",
    options: ["14 N_A", "6 N_A", "14", "13 N_A"],
    correct_index: 0,
    solution: "1 g-atom atomic oxygen = $1 N_A$ atoms. 2 g-molecules $\\text{O}_2 = 2 \\times 2 \\times N_A = 4 N_A$ atoms. 3 g-moles $\\text{O}_3 = 3 \\times 3 \\times N_A = 9 N_A$ atoms. Total oxygen atoms = $(1 + 4 + 9) N_A = 14 N_A$.",
    topic: "Gram Atoms and Molecules",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 80,
    question_text: "3.01 × 10²² molecules are removed from 196 g of H₂SO₄, then total number of atoms left are",
    options: ["8.2 × 10²⁴", "1.08 × 10²⁴", "2.16 × 10²⁴", "2.16 × 10²²"],
    correct_index: 0,
    solution: "Moles of $\\text{H}_2\\text{SO}_4 = \\frac{196}{98} = 2\\text{ mol} = 1.2044 \\times 10^{24}$ molecules. Molecules removed = $3.01 \\times 10^{22} = 0.0301 \\times 10^{24}$. Molecules remaining = $1.1743 \\times 10^{24}$. Each molecule contains 7 atoms (2H + 1S + 4O). Total atoms left = $7 \\times 1.1743 \\times 10^{24} \\approx 8.2 \\times 10^{24}$.",
    topic: "Mole Concept and Number of Atoms",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 81,
    question_text: "A human adult breaths in approximately 0.50 dm³ of air at 1.00 bar with each breath. If an air tank holds 100 dm³ of air at 200 bar, how many breaths the tank will supply approximately?",
    options: ["20,000", "10,000", "40,000", "80,000"],
    correct_index: 2,
    solution: "Using Boyle's law: $P_1 V_1 = P_2 V_2 \\Rightarrow 200 \\times 100 = 1.00 \\times V_2 \\Rightarrow V_2 = 20,000\\text{ dm}^3$. Number of breaths = $\\frac{20000}{0.50} = 40,000$.",
    topic: "Gas Laws & Real-life Application",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 82,
    question_text: "A mixture of Na₂CO₃ and K₂CO₃ weigh 1.2 g dissolved in 100 cm³ water. 10 cm³ of this solution consumes 20 cm³ of 0.1 N HCl for complete neutralisation. What is the composition of mixture?",
    options: [
      "0.596 g Na₂CO₃ and 0.604 g K₂CO₃",
      "0.4 g Na₂CO₃ and 0.8 g K₂CO₃",
      "0.6 g Na₂CO₃ and 0.6 g K₂CO₃",
      "0.8 g Na₂CO₃ and 0.4 g K₂CO₃"
    ],
    correct_index: 0,
    solution: "In $10\\text{ cm}^3$, meq = $20 \\times 0.1 = 2\\text{ meq}$. In $100\\text{ cm}^3$, total meq = 20 meq = 0.02 eq. Let mass of $\\text{Na}_2\\text{CO}_3 = x\\text{ g}$ (eq wt 53) and $\\text{K}_2\\text{CO}_3 = (1.2 - x)\\text{ g}$ (eq wt 69). $\\frac{x}{53} + \\frac{1.2 - x}{69} = 0.02 \\Rightarrow 16 x = 9.54 \\Rightarrow x = 0.596\\text{ g } \\text{Na}_2\\text{CO}_3$, and $\\text{K}_2\\text{CO}_3 = 0.604\\text{ g}$.",
    topic: "Mixture Titration",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 83,
    question_text: "What is the equivalent weight of P₄ in the reaction given below?\nP₄ + 3NaOH + 3H₂O → PH₃ + 3NaH₂PO₂",
    options: ["4M/3", "M/3", "M/8", "M/12"],
    correct_index: 1,
    solution: "This is a disproportionation reaction. Phosphorus is reduced from oxidation state 0 to -3 in $\\text{PH}_3$ (gain of 3 electrons) and oxidized from 0 to +1 in $\\text{NaH}_2\\text{PO}_2$ (loss of 1 electron $\\times 3 = 3$ electrons). Total electrons transferred per mole of $\\text{P}_4$ is 3. Hence n-factor = 3, and Equivalent weight = $\\frac{M}{3}$.",
    topic: "Equivalent Weight in Disproportionation",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 84,
    question_text: "What will be the resulting normality of NaCl solution formed on mixing 200 ml of decimolar NaOH with 40 ml of semimolar HCl?",
    options: ["0.25 N", "0.083 N", "0.39 N", "0.5 N"],
    correct_index: 1,
    solution: "meq of $\\text{NaOH} = 200 \\times 0.1 = 20\\text{ meq}$. meq of $\\text{HCl} = 40 \\times 0.5 = 20\\text{ meq}$. Exact neutralization occurs, forming $20\\text{ meq} = 0.02\\text{ mol NaCl}$. Total volume = $200 + 40 = 240\\text{ mL} = 0.24\\text{ L}$. $\\text{Normality} = \\frac{0.02}{0.24} \\approx 0.083\\text{ N}$.",
    topic: "Resulting Normality of Neutralization",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 85,
    question_text: "Calculate the weight of KMnO₄ which will react with 500 ml of 1/3 M solution of ferrous oxalate in acidic medium (Mol. wt. of KMnO₄ = 158)",
    options: ["15.8 g", "158 g", "25.0 g", "13.1 g"],
    correct_index: 0,
    solution: "For ferrous oxalate ($\\text{FeC}_2\\text{O}_4$), $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} (1 e^-)$ and $\\text{C}_2\\text{O}_4^{2-} \\rightarrow 2\\text{CO}_2 (2 e^-)$, so n-factor = $1 + 2 = 3$. meq of $\\text{FeC}_2\\text{O}_4 = 500 \\times \\frac{1}{3} \\times 3 = 500\\text{ meq} = 0.5\\text{ eq}$. For $\\text{KMnO}_4$ in acidic medium, n-factor = 5. Equivalent weight = $\\frac{158}{5} = 31.6$. Mass = $0.5 \\times 31.6 = 15.8\\text{ g}$.",
    topic: "Redox Titrations & n-factor",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 86,
    question_text: "Normality of H₃PO₄ if 10% weight/weight of the solution is given having density 1.5 g/cc is",
    options: ["4.59", "2.65", "3.20", "1.25"],
    correct_index: 0,
    solution: "$\\text{H}_3\\text{PO}_4$ is tribasic (n-factor = 3). Molar mass = $98\\text{ g/mol}$. Equivalent weight = $\\frac{98}{3}$. $\\text{Normality} = \\frac{10 \\times d \\times \\%(w/w)}{\\text{Eq. wt}} = \\frac{10 \\times 1.5 \\times 10}{98/3} = \\frac{450}{98} \\approx 4.59\\text{ N}$.",
    topic: "Normality Calculation",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 87,
    question_text: "Percentage by mass of water of crystallization in washing soda is (approx.)",
    options: ["32%", "63%", "37%", "50%"],
    correct_index: 1,
    solution: "Washing soda is $\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O}$. Molar mass = $106 + 180 = 286\\text{ g/mol}$. $\\%\\text{ water} = \\frac{180}{286} \\times 100 \\approx 62.9\\% \\approx 63\\%$.",
    topic: "Water of Crystallization",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 88,
    question_text: "50 g CaCO₃ is allowed to react with 50% H₂SO₄ solution by weight. What is the weight of H₂SO₄ (pure) required for the purpose?",
    options: ["98 g", "49 g", "196 g", "147 g"],
    correct_index: 1,
    solution: "$\\text{CaCO}_3 + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{CaSO}_4 + \\text{CO}_2 + \\text{H}_2\\text{O}$. $50\\text{ g CaCO}_3 = 0.5\\text{ mol}$. Pure $\\text{H}_2\\text{SO}_4$ required = $0.5\\text{ mol} \\times 98 = 49\\text{ g}$.",
    topic: "Stoichiometry",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 89,
    question_text: "The order which represents correctly the increasing number of atoms present is",
    options: [
      "4 g CO₂ < 4 L H₂ at STP < 4 amu of He < 4 mole NH₃",
      "4 amu He < 4 mole NH₃ < 4 g CO₂ < 4 L H₂ at STP",
      "4 amu He < 4 L H₂ at STP < 4 g CO₂ < 4 mole NH₃",
      "4 amu He < 4 g CO₂ < 4 L H₂ at STP < 4 mole NH₃"
    ],
    correct_index: 3,
    solution: "$4\\text{ amu He} = 1\\text{ atom}$. $4\\text{ g CO}_2 = \\frac{4}{44} \\times 3 N_A = 0.27 N_A$ atoms. $4\\text{ L H}_2 = \\frac{4}{22.4} \\times 2 N_A = 0.357 N_A$ atoms. $4\\text{ mole NH}_3 = 4 \\times 4 N_A = 16 N_A$ atoms. Hence: $4\\text{ amu He} < 4\\text{ g CO}_2 < 4\\text{ L H}_2\\text{ at STP} < 4\\text{ mole NH}_3$.",
    topic: "Comparing Number of Atoms",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 90,
    question_text: "Molecular weight which is not possible for a polymer having 4% sulphur in it",
    options: ["1600", "2400", "800", "400"],
    correct_index: 3,
    solution: "Minimum molecular weight requires at least 1 atom of sulphur ($32\\text{ g/mol}$): $M = \\frac{32}{4} \\times 100 = 800\\text{ g/mol}$. Any valid molecular weight must be an integer multiple of $800$ (e.g. 800, 1600, 2400). Hence $400$ is not possible.",
    topic: "Minimum Molecular Weight of Polymers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 91,
    question_text: "Assuming air, a mixture of 80% N₂ and 20% O₂ by weight. Calculate density of air at STP",
    options: ["4.2 g L⁻¹", "2.24 g L⁻¹", "1.286 g L⁻¹", "4.8 g L⁻¹"],
    correct_index: 2,
    solution: "In $100\\text{ g}$ air: Moles of $\\text{N}_2 = \\frac{80}{28} = 2.857$, Moles of $\\text{O}_2 = \\frac{20}{32} = 0.625$. Total moles = $3.482$. $M_{\\text{avg}} = \\frac{100}{3.482} = 28.72\\text{ g/mol}$. $\\text{Density} = \\frac{28.72}{22.4} \\approx 1.286\\text{ g/L}$.",
    topic: "Density of Gaseous Mixture",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 92,
    question_text: "The number of moles of H₃O⁺ in 200 ml of 0.005 M H₂SO₄ is",
    options: ["0.005", "0.01", "0.002", "0.001"],
    correct_index: 2,
    solution: "Moles of $\\text{H}_2\\text{SO}_4 = 0.200 \\times 0.005 = 0.001\\text{ mol}$. Each $\\text{H}_2\\text{SO}_4$ donates $2\\text{ H}^+$ ions to form $2\\text{ H}_3\\text{O}^+$. Moles of $\\text{H}_3\\text{O}^+ = 2 \\times 0.001 = 0.002\\text{ mol}$.",
    topic: "Molarity of Hydronium Ions",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 93,
    question_text: "2.75 g metallic oxide contains 1.53 g metal, what is empirical formula? (Atomic mass of metal = 51)",
    options: ["M₂O₃", "MO", "M₃O₄", "M₂O₅"],
    correct_index: 3,
    solution: "Mass of metal = $1.53\\text{ g}$. Mass of oxygen = $2.75 - 1.53 = 1.22\\text{ g}$. Moles of metal = $\\frac{1.53}{51} = 0.03$. Moles of oxygen = $\\frac{1.22}{16} = 0.07625$. Ratio $M : O = 0.03 : 0.07625 = 1 : 2.54 = 2 : 5$. Empirical formula is $\\text{M}_2\\text{O}_5$.",
    topic: "Empirical Formula of Oxides",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 94,
    question_text: "n-factor of Ba(MnO₄)₂ in acidic medium",
    options: ["10", "7", "5", "3"],
    correct_index: 0,
    solution: "In $\\text{Ba(MnO}_4)_2$, there are 2 permanganate units. In acidic medium, $\\text{Mn}^{7+} + 5e^- \\rightarrow \\text{Mn}^{2+}$. Total change in oxidation state per formula unit = $2 \\times 5 = 10$. Hence n-factor = 10.",
    topic: "n-factor in Redox Reactions",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 95,
    question_text: "2.45 g KClO₃ heated to give O₂ which is allowed to react completely with H₂ to form H₂O and this H₂ comes from reaction of Zn and H₂SO₄. The weight of Zn required for the purpose is (Molecular weight of KClO₃ = 122.5, At. wt. of Zn = 65)",
    options: ["39 g", "3.9 g", "0.39 g", "0.039 g"],
    correct_index: 1,
    solution: "Moles of $\\text{KClO}_3 = \\frac{2.45}{122.5} = 0.02\\text{ mol}$. $2\\text{KClO}_3 \\rightarrow 2\\text{KCl} + 3\\text{O}_2 \\Rightarrow \\text{Moles of O}_2 = 0.03\\text{ mol}$. Reaction $2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}$ requires $0.06\\text{ mol H}_2$. $\\text{Zn} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{ZnSO}_4 + \\text{H}_2 \\Rightarrow 0.06\\text{ mol Zn}$ required. Mass of $\\text{Zn} = 0.06 \\times 65 = 3.9\\text{ g}$.",
    topic: "Sequential Stoichiometry",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 96,
    question_text: "Number of molecules left unreacted (acid or base) on mixing 100 ml of 0.1 M H₂SO₄ with 100 ml 0.2 M NaOH",
    options: [
      "Approx. 6.02 × 10²² molecules",
      "Approx. 1.2 × 10²⁴ molecules",
      "Zero molecules",
      "Approx. 3.1 × 10²² molecules"
    ],
    correct_index: 2,
    solution: "meq of $\\text{H}_2\\text{SO}_4 = 100 \\times 0.1 \\times 2 = 20\\text{ meq}$. meq of $\\text{NaOH} = 100 \\times 0.2 \\times 1 = 20\\text{ meq}$. Both reactants completely neutralize each other with stoichiometric equivalency. Neither acid nor base is left unreacted (zero molecules left).",
    topic: "Complete Neutralization",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 97,
    question_text: "The equivalent weight of a metal is 9 and vapour density of its chloride is 66.75. The atomic weight of metal is",
    options: ["23.9", "27", "30.3", "48.3"],
    correct_index: 1,
    solution: "Molar mass of $\\text{MCl}_n = 2 \\times 66.75 = 133.5$. $n = \\frac{133.5}{9 + 35.5} = \\frac{133.5}{44.5} = 3$. Valency $n = 3$. Atomic weight = $\\text{Eq. wt} \\times n = 9 \\times 3 = 27$ (Aluminium).",
    topic: "Dulong-Petit & Vapour Density",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 98,
    question_text: "Total number of protons in 10 g of CaCO₃ is (N_A = 6.023 × 10²³)",
    options: ["3.01 × 10²⁴", "6.02 × 10²⁴", "2.01 × 10²⁴", "3.02 × 10²⁴"],
    correct_index: 0,
    solution: "Moles of $\\text{CaCO}_3 = \\frac{10}{100} = 0.1\\text{ mol}$. Protons per $\\text{CaCO}_3$ molecule = $20 (\\text{Ca}) + 6 (\\text{C}) + 3 \\times 8 (\\text{O}) = 50$. Total protons = $0.1 \\times 50 \\times N_A = 5 \\times 6.023 \\times 10^{23} \\approx 3.01 \\times 10^{24}$.",
    topic: "Subatomic Particles in Compounds",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 99,
    question_text: "How many gram of KCl would have to be dissolved in 60 g of H₂O to give 20% by weight of solution?",
    options: ["15 g", "1.5 g", "11.5 g", "31.5 g"],
    correct_index: 0,
    solution: "Let mass of $\\text{KCl} = x\\text{ g}$. $\\frac{x}{x + 60} = 0.20 \\Rightarrow x = 0.2 x + 12 \\Rightarrow 0.8 x = 12 \\Rightarrow x = 15\\text{ g}$.",
    topic: "Mass Percentage Concentration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 100,
    question_text: "The density of a liquid is 1.2 g/mL. There are 35 drops in 2 mL. The number of molecules in one drop are (molar mass of liquid = 70)",
    options: [
      "(1.2 / 35) N_A",
      "(1/35)² N_A",
      "(1.2 / (35 × 35)) N_A",
      "1.2 N_A"
    ],
    correct_index: 2,
    solution: "Volume of 1 drop = $\\frac{2}{35}\\text{ mL}$. Mass of 1 drop = $\\frac{2}{35} \\times 1.2\\text{ g}$. Moles = $\\frac{(2/35) \\times 1.2}{70} = \\frac{2 \\times 1.2}{35 \\times 70} = \\frac{1.2}{35 \\times 35}\\text{ mol}$. Number of molecules = $\\left[\\frac{1.2}{35 \\times 35}\\right] N_A$.",
    topic: "Molecules in a Drop",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 101,
    question_text: "Sum of basicity of H₃PO₄, H₃PO₃, H₃PO₂ and HPO₃ is equal to",
    options: ["7", "6", "5", "8"],
    correct_index: 0,
    solution: "Basicity of $\\text{H}_3\\text{PO}_4 = 3$, $\\text{H}_3\\text{PO}_3 = 2$, $\\text{H}_3\\text{PO}_2 = 1$, and $\\text{HPO}_3 = 1$. Sum = $3 + 2 + 1 + 1 = 7$.",
    topic: "Basicity of Oxyacids of Phosphorus",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 102,
    question_text: "10 g C reacts with 100 g of Cl₂ to form CCl₄. How much CCl₄ will be formed?",
    options: ["108.45 g", "110 g", "128.33 g", "135 g"],
    correct_index: 0,
    solution: "$\\text{C} + 2\\text{Cl}_2 \\rightarrow \\text{CCl}_4$. Moles of $\\text{C} = \\frac{10}{12} = 0.833\\text{ mol}$. Moles of $\\text{Cl}_2 = \\frac{100}{71} = 1.408\\text{ mol}$. $0.833\\text{ mol C}$ requires $1.667\\text{ mol Cl}_2$, so $\\text{Cl}_2$ is the limiting reagent. Moles of $\\text{CCl}_4 = \\frac{1.408}{2} = 0.704\\text{ mol}$. Mass of $\\text{CCl}_4 = 0.704 \\times 154 = 108.45\\text{ g}$.",
    topic: "Limiting Reagent & Synthesis",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 103,
    question_text: "The ratio of the masses of sulphuric acid and orthophosphoric acid needed to neutralise the same amount of an alkali if the hydrogen sulphate and hydrogen orthophosphate were formed is",
    options: ["1 : 2", "1 : 1", "1 : 3", "2 : 1"],
    correct_index: 3,
    solution: "Formation of hydrogen sulphate ($\\text{HSO}_4^-$) involves 1 $\\text{H}^+$ replaced, so n-factor = 1 (Eq wt = 98). Formation of hydrogen orthophosphate ($\\text{HPO}_4^{2-}$) involves 2 $\\text{H}^+$ replaced, so n-factor = 2 (Eq wt = 49). For same equivalents of alkali: Mass ratio = $98 : 49 = 2 : 1$.",
    topic: "Partial Neutralization",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 104,
    question_text: "200 ml of PH₃ on heating forms P₄ and H₂, volume change at STP in the reaction is",
    options: [
      "An increase of 100 ml",
      "An increase of 150 ml",
      "A decrease of 50 ml",
      "A decrease of 40 ml"
    ],
    correct_index: 0,
    solution: "$4\\text{PH}_3(g) \\xrightarrow{\\Delta} \\text{P}_4(s) + 6\\text{H}_2(g)$. $\\text{P}_4$ is a solid with negligible gas volume. $200\\text{ mL PH}_3$ produces $\\frac{6}{4} \\times 200 = 300\\text{ mL H}_2$. Volume change = $300 - 200 = +100\\text{ mL}$ (an increase of $100\\text{ mL}$).",
    topic: "Gay-Lussac's Law & Volume Changes",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 105,
    question_text: "In a reaction, 4A + 2B + 3C → A₄B₂C₃. What will be the number of moles of product formed, starting from 1 mole of A, 0.4 mole of B and 0.9 mole of C?",
    options: ["0.25", "0.20", "0.30", "2.32"],
    correct_index: 1,
    solution: "Ratio of moles to stoichiometric coefficients: A: $\\frac{1}{4} = 0.25$; B: $\\frac{0.4}{2} = 0.20$; C: $\\frac{0.9}{3} = 0.30$. B has the lowest ratio ($0.20$), so B is the limiting reagent. Moles of product formed = $0.20$.",
    topic: "Multi-Reactant Limiting Reagent",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 106,
    question_text: "43% (w/v) of NaCl solution (density = 1.14 g/ml) is equivalent to",
    options: ["0.35 × 10⁵ ppm", "4 × 10⁵ ppm", "3.5 × 10⁵ ppm", "0.35 × 10³ ppm"],
    correct_index: 2,
    solution: "$43\\%\\text{ (w/v)}$ means $43\\text{ g NaCl}$ in $100\\text{ mL}$ solution. Mass of $100\\text{ mL}$ solution = $100 \\times 1.14 = 114\\text{ g}$. $\\text{ppm} = \\frac{43}{114} \\times 10^6 \\approx 3.77 \\times 10^5 \\approx 3.5 \\times 10^5\\text{ ppm}$.",
    topic: "ppm Concentration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 107,
    question_text: "Number of electrons present in 7.2 mg of NH₄⁺ is",
    options: ["2.4 × 10²¹", "2.4 × 10²⁴", "2 × 10¹⁸", "4 × 10²¹"],
    correct_index: 0,
    solution: "Molar mass of $\\text{NH}_4^+ = 18\\text{ g/mol}$. Moles = $\\frac{7.2 \\times 10^{-3}}{18} = 4 \\times 10^{-4}\\text{ mol}$. Each $\\text{NH}_4^+$ ion has $7 + 4 - 1 = 10$ electrons. Total electrons = $4 \\times 10^{-4} \\times 10 \\times 6.022 \\times 10^{23} \\approx 2.4 \\times 10^{21}$.",
    topic: "Electrons in Polyatomic Ions",
    marks: 1, difficulty: "medium"
  }
];

export async function insertBatch3() {
  console.log(`Inserting Batch 3 (Q77-Q107): ${BATCH_3.length} questions...`);
  let count = 0;
  for (const q of BATCH_3) {
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
  console.log(`✅ Batch 3 done: ${count} inserted.`);
}

