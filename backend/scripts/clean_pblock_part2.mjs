import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_diagram_urls.json'), 'utf8'));

export const PBLOCK_PART2 = [
  {
    qNum: 49,
    exam: "JEE Main 2022 (25 Jun Shift 2)",
    question: "The number of bridged oxygen atoms present in compound B formed from the following reactions is:\n$$\\text{Pb}(\\text{NO}_3)_2 \\xrightarrow{673\\text{ K}} \\text{A} + \\text{PbO} + \\text{O}_2$$\n$$\\text{A} \\xrightarrow{\\text{Dimerise}} \\text{B}$$",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["49"],
    solution_image_url: diagramUrls["49"],
    solution: "Thermal decomposition of lead nitrate gives nitrogen dioxide: $2\\text{Pb}(\\text{NO}_3)_2 \\xrightarrow{673\\text{ K}} 2\\text{PbO} + 4\\text{NO}_2\\text{ (A)} + \\text{O}_2$. On cooling, $\\text{NO}_2$ dimerizes to form planar dinitrogen tetroxide $\\text{N}_2\\text{O}_4$ (B), where two nitrogen atoms are directly bonded to each other by an $\\text{N}-\\text{N}$ bond. There are no bridging oxygen atoms present in $\\text{N}_2\\text{O}_4$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 50,
    exam: "JEE Main 2022 (26 Jun Shift 1)",
    question: "Choose the correct stability order of group 13 elements in their +1 oxidation state:",
    options: [
      "$\\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$",
      "$\\text{Tl} < \\text{In} < \\text{Ga} < \\text{Al}$",
      "$\\text{In} < \\text{Tl} < \\text{Ga} < \\text{Al}$",
      "$\\text{Ga} < \\text{In} < \\text{Al} < \\text{Tl}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Due to the inert pair effect, the stability of the lower (+1) oxidation state progressively increases down the group from aluminium to thallium:\n$$\\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$$\nHence, the correct option is (A)."
  },
  {
    qNum: 51,
    exam: "JEE Main 2022 (27 Jun Shift 1)",
    question: "Match List - I with List - II.\n\n**List - I (Si-Compounds)**\nA. $(\\text{CH}_3)_4\\text{Si}$\nB. $(\\text{CH}_3)\\text{Si}(\\text{OH})_3$\nC. $(\\text{CH}_3)_2\\text{Si}(\\text{OH})_2$\nD. $(\\text{CH}_3)_3\\text{Si}(\\text{OH})$\n\n**List - II (Si-Polymeric/Other Products)**\nI. Chain Silicone\nII. Dimeric Silicone\nIII. Silane\nIV. 2D-Silicone\n\nChoose the correct answer from the options given below:",
    options: [
      "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)",
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
      "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- $(\\text{CH}_3)_4\\text{Si}$ is tetramethylsilane, a silane (A $\\rightarrow$ III).\n- $(\\text{CH}_3)\\text{Si}(\\text{OH})_3$ has 3 reactive sites, yielding 2D/cross-linked silicone (B $\\rightarrow$ IV).\n- $(\\text{CH}_3)_2\\text{Si}(\\text{OH})_2$ has 2 reactive sites, polymerizing into linear chain silicone (C $\\rightarrow$ I).\n- $(\\text{CH}_3)_3\\text{Si}(\\text{OH})$ has 1 reactive site, forming hexamethyldisiloxane dimer (D $\\rightarrow$ II).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 52,
    exam: "JEE Main 2022 (28 Jun Shift 1)",
    question: "Match List - I with List - II.\n\n**List - I (Element)**\nA. $\\text{Cs}$\nB. $\\text{Ga}$\nC. $\\text{B}$\nD. $\\text{Si}$\n\n**List - II (Application)**\nI. High temperature thermometer\nII. Water repellent sprays\nIII. Photoelectric cells\nIV. Bullet proof vest\n\nChoose the most appropriate answer from the options given below:",
    options: [
      "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
      "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)",
      "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)",
      "(A)-(I), (B)-(IV), (C)-(III), (D)-(II)"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- Caesium ($\\text{Cs}$) has very low ionization energy and is used in photoelectric cells (A $\\rightarrow$ III).\n- Gallium ($\\text{Ga}$) has a wide liquid range ($30^\\circ\\text{C}$ to $2237^\\circ\\text{C}$) and is used in high temperature thermometers (B $\\rightarrow$ I).\n- Boron fibres have high tensile strength and are used in bullet-proof vests (C $\\rightarrow$ IV).\n- Silicones derived from silicon are hydrophobic and used in water repellent sprays (D $\\rightarrow$ II).\n\nHence, the correct option is (A)."
  },
  {
    qNum: 53,
    exam: "JEE Main 2022 (28 Jun Shift 2)",
    question: "Aqueous solution of which of the following boron compounds will be strongly basic in nature?",
    options: [
      "$\\text{NaBH}_4$",
      "$\\text{LiBH}_4$",
      "$\\text{B}_2\\text{H}_6$",
      "$\\text{Na}_2\\text{B}_4\\text{O}_7$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Borax ($\\text{Na}_2\\text{B}_4\\text{O}_7\\cdot 10\\text{H}_2\\text{O}$) dissolves in water to give a strong base ($\\text{NaOH}$) and a weak acid (orthoboric acid, $\\text{H}_3\\text{BO}_3$):\n$$\\text{Na}_2\\text{B}_4\\text{O}_7 + 7\\text{H}_2\\text{O} \\rightleftharpoons 2\\text{NaOH} + 4\\text{H}_3\\text{BO}_3$$\nBecause $\\text{NaOH}$ completely dissociates while $\\text{H}_3\\text{BO}_3$ is very weak, the resulting solution is distinctly basic.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 54,
    exam: "JEE Main 2022 (25 Jul Shift 1)",
    question: "The geometry around boron in the product 'B' formed from the following reaction is:\n$$\\text{BF}_3 + \\text{NaH} \\xrightarrow{450\\text{ K}} \\text{A} + \\text{NaF}$$\n$$\\text{A} + \\text{NMe}_3 \\rightarrow \\text{B}$$",
    options: [
      "trigonal planar",
      "tetrahedral",
      "pyramidal",
      "square planar"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["54"],
    solution_image_url: diagramUrls["54"],
    solution: "Preparation of diborane: $2\\text{BF}_3 + 6\\text{NaH} \\xrightarrow{450\\text{ K}} \\text{B}_2\\text{H}_6\\text{ (A)} + 6\\text{NaF}$.\nReaction with tertiary amine causes symmetrical cleavage:\n$$\\text{B}_2\\text{H}_6 + 2\\text{NMe}_3 \\rightarrow 2\\text{Me}_3\\text{N}\\cdot\\text{BH}_3\\text{ (B)}$$\nAround the boron atom in $\\text{Me}_3\\text{N}\\cdot\\text{BH}_3$, there are four bond pairs ($sp^3$ hybridization), giving a tetrahedral geometry.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 55,
    exam: "JEE Main 2022 (26 Jul Shift 1)",
    question: "Borazine, also known as inorganic benzene, can be prepared by the reaction of 3-equivalents of \"X\" with 6-equivalents of \"Y\". \"X\" and \"Y\", respectively are:",
    options: [
      "$\\text{B}(\\text{OH})_3 \\text{ and } \\text{NH}_3$",
      "$\\text{B}_2\\text{H}_6 \\text{ and } \\text{NH}_3$",
      "$\\text{B}_2\\text{H}_6 \\text{ and } \\text{HN}_3$",
      "$\\text{NH}_3 \\text{ and } \\text{B}_2\\text{O}_3$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Reaction of 3 equivalents of diborane $\\text{B}_2\\text{H}_6$ (X) with 6 equivalents of ammonia $\\text{NH}_3$ (Y) initially forms an addition compound, which on strong heating at $200^\\circ\\text{C}$ gives borazine and hydrogen:\n$$3\\text{B}_2\\text{H}_6 + 6\\text{NH}_3 \\rightarrow 3[\\text{BH}_2(\\text{NH}_3)_2]^+[\\text{BH}_4]^- \\xrightarrow{\\Delta} 2\\text{B}_3\\text{N}_3\\text{H}_6 + 12\\text{H}_2$$\nHence, the correct option is (B)."
  },
  {
    qNum: 56,
    exam: "JEE Main 2022 (26 Jul Shift 2)",
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: Boric acid is a weak acid.\nReason R: Boric acid is not able to release $\\text{H}^+$ ion on its own. It receives $\\text{OH}^-$ ion from water and releases $\\text{H}^+$ ion.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both A and R are correct and R is the correct explanation of A",
      "Both A and R are correct but R is NOT the correct explanation of A",
      "A is correct but R is not correct",
      "A is not correct but R is correct"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["56"],
    solution_image_url: diagramUrls["56"],
    solution: "Assertion A is correct: Boric acid $\\text{B}(\\text{OH})_3$ is a weak, monobasic Lewis acid, not a protonic acid.\nReason R is correct: It does not dissociate directly to produce protons; instead, it acts as a Lewis acid by accepting an $\\text{OH}^-$ pair from water, liberating a hydronium ion:\n$$\\text{B}(\\text{OH})_3 + 2\\text{H}_2\\text{O} \\rightleftharpoons [\\text{B}(\\text{OH})_4]^- + \\text{H}_3\\text{O}^+$$\nReason R is the correct explanation for Assertion A.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 57,
    exam: "JEE Main 2022 (28 Jul Shift 2)",
    question: "The element that shows greater ability to form $p\\pi-p\\pi$ multiple bonds is:",
    options: [
      "$\\text{Ge}$",
      "$\\text{Si}$",
      "$\\text{Sn}$",
      "$\\text{C}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Carbon has a small atomic size and high electronegativity, allowing its $2p$ orbitals to achieve effective sideways overlap to form stable $p\\pi-p\\pi$ multiple bonds with itself and other small atoms (C=C, $\\text{C}\\equiv\\text{C}$, C=O, C=N). Heavier elements have large, diffused $p$ orbitals where sideways overlap is ineffective.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 58,
    exam: "JEE Main 2022 (27 Jul Shift 2)",
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: Boron is unable to form $[\\text{BF}_6]^{3-}$.\nReason R: Size of B is very small.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Assertion A is true: Due to the absence of vacant $d$-orbitals in the second shell, boron cannot expand its octet beyond 4 covalence, and therefore cannot form $[\\text{BF}_6]^{3-}$.\nReason R is true: Boron is indeed the smallest atom in Group 13.\nHowever, the inability to form $[\\text{BF}_6]^{3-}$ is fundamentally due to the absence of $d$-orbitals, not merely small size. Hence, R is not the correct explanation of A.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 59,
    exam: "JEE Main 2022 (29 Jul Shift 2)",
    question: "When borax is heated with $\\text{CoO}$ on a platinum loop, blue coloured bead formed is largely due to:",
    options: [
      "$\\text{B}_2\\text{O}_3$",
      "$\\text{Co}(\\text{BO}_2)_2$",
      "$\\text{CoO}_2$",
      "$\\text{Co}[\\text{B}_4\\text{O}_5(\\text{OH})_4]$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "On heating borax, it loses water of crystallization and forms a glassy bead of sodium metaborate and boric anhydride:\n$$\\text{Na}_2\\text{B}_4\\text{O}_7 \\xrightarrow{\\Delta} 2\\text{NaBO}_2 + \\text{B}_2\\text{O}_3$$\nWhen heated with cobalt oxide $\\text{CoO}$, boric anhydride reacts to form cobalt(II) metaborate, which imparts a characteristic deep blue colour to the bead:\n$$\\text{CoO} + \\text{B}_2\\text{O}_3 \\rightarrow \\text{Co}(\\text{BO}_2)_2$$\nHence, the correct option is (B)."
  },
  {
    qNum: 60,
    exam: "JEE Main 2023 (26 Jan Shift 2)",
    question: "Given below are two statements, one is labelled as Assertion A and the other is labelled as Reason R:\nAssertion A: Carbon forms two important oxides $\\text{CO}$ and $\\text{CO}_2$. $\\text{CO}$ is neutral whereas $\\text{CO}_2$ is acidic in nature.\nReason R: $\\text{CO}_2$ can combine with water in a limited way to form carbonic acid, while $\\text{CO}$ is sparingly soluble in water.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both A and R are correct but R is NOT the correct explanation of A.",
      "Both A and R are correct and R is the correct explanation of A.",
      "A is not correct but R is correct.",
      "A is correct but R is not correct."
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Assertion A is correct: $\\text{CO}$ does not react with water, acids, or bases (neutral oxide), while $\\text{CO}_2$ dissolves in water to form carbonic acid $\\text{H}_2\\text{CO}_3$ (acidic oxide).\nReason R is correct: $\\text{CO}_2$ forms carbonic acid in water, explaining its acidic behaviour, whereas $\\text{CO}$ does not form any acid in water.\nThus, Reason R correctly explains Assertion A.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 61,
    exam: "JEE Main 2023 (29 Jan Shift 1)",
    question: "During the borax bead test with $\\text{CuSO}_4$, a blue green colour of the bead was observed in oxidising flame due to the formation of:",
    options: [
      "$\\text{Cu}_3\\text{B}_2$",
      "$\\text{Cu}$",
      "$\\text{Cu}(\\text{BO}_2)_2$",
      "$\\text{CuO}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "In the oxidizing flame, $\\text{CuSO}_4$ decomposes to $\\text{CuO}$ and $\\text{SO}_3$, which then reacts with boric anhydride $\\text{B}_2\\text{O}_3$ from the glassy bead to form copper(II) metaborate:\n$$\\text{CuO} + \\text{B}_2\\text{O}_3 \\rightarrow \\text{Cu}(\\text{BO}_2)_2$$\nCopper(II) metaborate imparts a characteristic blue-green colour to the bead.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 62,
    exam: "JEE Main 2023 (29 Jan Shift 2)",
    question: "Given below are two statements:\nStatement I: Nickel is being used as the catalyst for producing syn gas and edible fats.\nStatement II: Silicon forms both electron rich and electron deficient hydrides.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are correct",
      "Statement I is incorrect but Statement II is correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is correct: Nickel is used as a catalyst in steam reforming of hydrocarbons to produce syn gas ($\\text{CO} + \\text{H}_2$) and in hydrogenation of vegetable oils to produce edible fats (vanaspati).\nStatement II is incorrect: Group 14 elements including silicon form electron-precise hydrides (such as $\\text{SiH}_4$), which have exact octets around the central atom and are neither electron-deficient nor electron-rich.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 63,
    exam: "JEE Main 2023 (30 Jan Shift 2)",
    question: "Boric acid is a solid, whereas $\\text{BF}_3$ is a gas at room temperature because of:",
    options: [
      "strong ionic bond in Boric acid",
      "strong van der Waals interaction in Boric acid",
      "strong hydrogen bond in Boric acid",
      "covalent bond in $\\text{BF}_3$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["63"],
    solution_image_url: diagramUrls["63"],
    solution: "In solid orthoboric acid $\\text{H}_3\\text{BO}_3$, planar $[\\text{BO}_3]^{3-}$ units are linked together into two-dimensional sheets through extensive intermolecular hydrogen bonding. In contrast, $\\text{BF}_3$ consists of discrete non-polar monomeric molecules held only by weak London dispersion forces, existing as a gas at room temperature.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 64,
    exam: "JEE Main 2023 (31 Jan Shift 2)",
    question: "The Lewis acid character of boron trihalides follows the order:",
    options: [
      "$\\text{BCl}_3 > \\text{BF}_3 > \\text{BBr}_3 > \\text{BI}_3$",
      "$\\text{BI}_3 > \\text{BBr}_3 > \\text{BCl}_3 > \\text{BF}_3$",
      "$\\text{BBr}_3 > \\text{BI}_3 > \\text{BCl}_3 > \\text{BF}_3$",
      "$\\text{BF}_3 > \\text{BCl}_3 > \\text{BBr}_3 > \\text{BI}_3$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["64"],
    solution_image_url: diagramUrls["64"],
    solution: "The Lewis acidity of boron trihalides depends inversely on the extent of $p\\pi-p\\pi$ back-bonding. Due to similar orbital size, back donation is maximum in $\\text{BF}_3$ ($2p-2p$) and progressively decreases in $\\text{BCl}_3$ ($2p-3p$), $\\text{BBr}_3$ ($2p-4p$), and $\\text{BI}_3$ ($2p-5p$). Because back-bonding satisfies the electron deficiency of boron in $\\text{BF}_3$, its Lewis acid strength is lowest. Therefore, Lewis acid strength follows:\n$$\\text{BI}_3 > \\text{BBr}_3 > \\text{BCl}_3 > \\text{BF}_3$$\nHence, the correct option is (B)."
  },
  {
    qNum: 65,
    exam: "JEE Main 2023 (01 Feb Shift 2)",
    question: "The correct order of bond enthalpy ($\\text{kJ mol}^{-1}$) is:",
    options: [
      "$\\text{Si}-\\text{Si} > \\text{C}-\\text{C} > \\text{Sn}-\\text{Sn} > \\text{Ge}-\\text{Ge}$",
      "$\\text{Si}-\\text{Si} > \\text{C}-\\text{C} > \\text{Ge}-\\text{Ge} > \\text{Sn}-\\text{Sn}$",
      "$\\text{C}-\\text{C} > \\text{Si}-\\text{Si} > \\text{Sn}-\\text{Sn} > \\text{Ge}-\\text{Ge}$",
      "$\\text{C}-\\text{C} > \\text{Si}-\\text{Si} > \\text{Ge}-\\text{Ge} > \\text{Sn}-\\text{Sn}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "As atomic size increases down Group 14, orbital overlap becomes less effective and the single bond length increases, resulting in a decrease in single bond dissociation enthalpy:\n$$\\text{C}-\\text{C} (348\\text{ kJ/mol}) > \\text{Si}-\\text{Si} (297) > \\text{Ge}-\\text{Ge} (260) > \\text{Sn}-\\text{Sn} (240)$$\nHence, the correct option is (D)."
  },
  {
    qNum: 66,
    exam: "JEE Main 2023 (06 Apr Shift 2)",
    question: "Structures of $\\text{BeCl}_2$ in solid state, vapour phase and at very high temperature respectively are:",
    options: [
      "Monomeric, Dimeric, Polymeric",
      "Dimeric, Polymeric, Monomeric",
      "Polymeric, Monomeric, Dimeric",
      "Polymeric, Dimeric, Monomeric"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["66"],
    solution_image_url: diagramUrls["66"],
    solution: "- In the solid state, $\\text{BeCl}_2$ has a polymeric chain structure with chlorine bridges (coordination number of $\\text{Be} = 4$).\n- In the vapour phase below $1200\\text{ K}$, it exists as a chloro-bridged dimer $\\text{Be}_2\\text{Cl}_4$ (coordination number of $\\text{Be} = 3$).\n- At high temperatures ($>1200\\text{ K}$), it dissociates into a linear monomer $\\text{BeCl}_2$ ($sp$ hybridized, coordination number = 2).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 67,
    exam: "JEE Main 2023 (11 Apr Shift 1)",
    question: "For compound having the formula $\\text{GaAlCl}_4$, the correct option from the following is:",
    options: [
      "$\\text{Ga}$ is coordinated with $\\text{Cl}$ in $\\text{GaAlCl}_4$",
      "$\\text{Ga}$ is more electronegative than $\\text{Al}$ and is present as a cationic part of the salt $\\text{GaAlCl}_4$",
      "$\\text{Cl}$ forms bond with both $\\text{Al}$ and $\\text{Ga}$ in $\\text{GaAlCl}_4$",
      "Oxidation state of $\\text{Ga}$ in the salt $\\text{GaAlCl}_4$ is +3"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution_image_url: null,
    solution: "The compound $\\text{GaAlCl}_4$ exists as the mixed-valence ionic salt $\\text{Ga}^+[\\text{AlCl}_4]^-$. Due to the presence of $3d^{10}$ electrons in gallium, poor shielding causes gallium to have a higher electronegativity ($1.81$) than aluminium ($1.61$), and gallium exists in the stable +1 oxidation state as the cation $\\text{Ga}^+$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 68,
    exam: "JEE Main 2023 (12 Apr Shift 1)",
    question: "Given below are two statements:\nStatement I: Boron is extremely hard indicating its high lattice energy.\nStatement II: Boron has highest melting and boiling point compared to its other group members.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Both Statement I and Statement II are correct",
      "Statement I is incorrect but Statement II is correct"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is correct: Elemental boron exists in complex icosahedral polymeric structural units ($\\text{B}_{12}$) held by strong covalent bonds, giving it extreme hardness and high lattice cohesion.\nStatement II is correct: Due to very small size and strong covalent network, boron exhibits the highest melting point ($2453\\text{ K}$) and boiling point ($3923\\text{ K}$) among all Group 13 elements.\nThus, both Statement I and Statement II are correct.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 69,
    exam: "JEE Main 2023 (13 Apr Shift 2)",
    question: "If the formula of Borax is $\\text{Na}_2[\\text{B}_4\\text{O}_x(\\text{OH})_y]\\cdot z\\text{H}_2\\text{O}$, then $x + y + z =$ ______.",
    options: [],
    correct_option: null,
    numeric_answer: 17,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "The true structural formula of borax is $\\text{Na}_2[\\text{B}_4\\text{O}_5(\\text{OH})_4]\\cdot 8\\text{H}_2\\text{O}$.\nComparing with the given formula $\\text{Na}_2[\\text{B}_4\\text{O}_x(\\text{OH})_y]\\cdot z\\text{H}_2\\text{O}$:\n$$x = 5, \\quad y = 4, \\quad z = 8$$\n$$x + y + z = 5 + 4 + 8 = 17$$\nTherefore, the required value is 17."
  },
  {
    qNum: 70,
    exam: "JEE Main 2023 (13 Apr Shift 2)",
    question: "Better method for preparation of $\\text{BeF}_2$ among the following is:",
    options: [
      "$\\text{BeO} + \\text{C} + \\text{F}_2 \\rightarrow \\text{BeF}_2$",
      "$(\\text{NH}_4)_2\\text{BeF}_4 \\xrightarrow{\\Delta} \\text{BeF}_2$",
      "$\\text{Be} + \\text{F}_2 \\xrightarrow{\\Delta} \\text{BeF}_2$",
      "$\\text{BeI}_2 + \\text{F}_2 \\xrightarrow{\\Delta} \\text{BeF}_2$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Direct reaction of beryllium with fluorine is dangerous and difficult to control, and evaporation of aqueous solutions yields basic oxyfluorides. Thermal decomposition of ammonium tetrafluoroberyllate is the standard laboratory method to prepare pure $\\text{BeF}_2$:\n$$(\\text{NH}_4)_2\\text{BeF}_4 \\xrightarrow{\\Delta} \\text{BeF}_2 + 2\\text{NH}_4\\text{F}$$\nHence, the correct option is (B)."
  },
  {
    qNum: 71,
    exam: "JEE Main 2023 (13 Apr Shift 2)",
    question: "The covalency and oxidation state respectively of boron in $[\\text{BF}_4]^-$ are:",
    options: [
      "3 and 5",
      "3 and 4",
      "4 and 4",
      "4 and 3"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["71"],
    solution_image_url: diagramUrls["71"],
    solution: "In the fluoroborate anion $[\\text{BF}_4]^-$, boron forms 4 covalent bonds with four fluorine atoms, so its covalency is 4.\nLet the oxidation state of boron be $x$. Since fluorine is always $-1$:\n$$x + 4(-1) = -1 \\implies x = +3$$\nThus, covalency = 4 and oxidation state = +3.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 72,
    exam: "JEE Main 2023 (15 Apr Shift 1)",
    question: "For a good quality cement, the ratio of silica to alumina is found to be:",
    options: [
      "1.5",
      "4.5",
      "1.0",
      "2.5 to 4.0"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "For a good quality Portland cement, the ratio of silica ($\\text{SiO}_2$) to alumina ($\\text{Al}_2\\text{O}_3$) should lie between 2.5 and 4.0, and the ratio of lime ($\\text{CaO}$) to the total of the other oxides should be close to 2.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 73,
    exam: "JEE Main 2024 (27 Jan Shift 1)",
    question: "Given below are two statements:\nStatement I: The group 14 elements show $+4$ and $+2$ oxidation states, with $+2$ state becoming more stable down the group.\nStatement II: $\\text{Pb}^{4+}$ acts as a strong oxidising agent, whereas $\\text{Sn}^{2+}$ acts as a reducing agent.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is true: Due to the inert pair effect, the stability of the +2 oxidation state increases down Group 14 while the +4 state becomes less stable.\nStatement II is true: Because $\\text{Pb}^{2+}$ is more stable than $\\text{Pb}^{4+}$, $\\text{Pb}^{4+}$ readily accepts two electrons and acts as a strong oxidising agent. Conversely, $\\text{Sn}^{4+}$ is more stable than $\\text{Sn}^{2+}$, so $\\text{Sn}^{2+}$ readily loses two electrons and acts as a reducing agent.\n\nHence, both statements are true (B)."
  },
  {
    qNum: 74,
    exam: "JEE Main 2024 (29 Jan Shift 1)",
    question: "Given below are two statements:\nStatement I : The electronegativity of group 14 elements from Si to Pb gradually decreases.\nStatement II : Group 14 contains non-metallic, metallic, as well as metalloid elements.\nIn the light of the above statements, choose the most appropriate from the options given below:",
    options: [
      "Statement I is false but Statement II is true",
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is false: The electronegativity values for Group 14 elements are $\\text{C} (2.5)$, $\\text{Si} (1.8)$, $\\text{Ge} (1.8)$, $\\text{Sn} (1.8)$, $\\text{Pb} (1.9)$. The electronegativity from $\\text{Si}$ to $\\text{Pb}$ is almost constant and slightly increases for $\\text{Pb}$, so it does not gradually decrease.\nStatement II is true: Group 14 contains non-metals ($\\text{C}$), metalloids ($\\text{Si}, \\text{Ge}$), and metals ($\\text{Sn}, \\text{Pb}$).\nThus, Statement I is false but Statement II is true.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 75,
    exam: "JEE Main 2024 (29 Jan Shift 1)",
    question: "The correct statement regarding the oxides of group 14 elements is:",
    options: [
      "$\\text{CO}$ is acidic, whereas $\\text{CO}_2$ is neutral.",
      "$\\text{SiO}_2$ and $\\text{GeO}_2$ are basic.",
      "$\\text{CO}_2, \\text{SiO}_2$ and $\\text{GeO}_2$ are acidic, whereas $\\text{SnO}_2$ and $\\text{PbO}_2$ are amphoteric.",
      "All dioxides of group 14 elements are acidic."
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "In Group 14 dioxides:\n- $\\text{CO}_2, \\text{SiO}_2, \\text{GeO}_2$ are acidic oxides.\n- $\\text{SnO}_2$ and $\\text{PbO}_2$ are amphoteric oxides (react with both strong acids and strong bases).\nAmong monoxides, $\\text{CO}$ is neutral, $\\text{GeO}$ is distinctly acidic, while $\\text{SnO}$ and $\\text{PbO}$ are amphoteric.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 76,
    exam: "JEE Main 2024 (31 Jan Shift 2)",
    question: "Given below are two statements:\nStatement I: Group 13 trivalent halides get easily hydrolysed by water due to their covalent nature.\nStatement II: $\\text{AlCl}_3$ upon hydrolysis in acidified aqueous solution forms octahedral $[\\text{Al}(\\text{H}_2\\text{O})_6]^{3+}$ ion.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is true: Group 13 trihalides are electron-deficient covalent compounds and are readily hydrolysed in water.\nStatement II is true: In acidified aqueous solution, aluminium chloride ionizes and coordinates with six water molecules to form the octahedral hexaaquaaluminium(III) ion $[\\text{Al}(\\text{H}_2\\text{O})_6]^{3+}$ ($sp^3d^2$ hybridized).\nThus, both Statement I and Statement II are true.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 77,
    exam: "JEE Main 2024 (01 Feb Shift 2)",
    question: "Given below are two statements:\nStatement (I): $\\text{SiO}_2$ and $\\text{GeO}_2$ are acidic while $\\text{SnO}$ and $\\text{PbO}$ are amphoteric in nature.\nStatement (II): Allotropic forms of carbon are due to property of catenation and $p\\pi-d\\pi$ bond formation.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is true: $\\text{SiO}_2$ and $\\text{GeO}_2$ are acidic dioxides, whereas $\\text{SnO}$ and $\\text{PbO}$ are amphoteric monoxides.\nStatement II is false: Carbon belongs to period 2 and does not possess $d$-orbitals in its valence shell, so it cannot form $p\\pi-d\\pi$ bonds. Its allotropy is due to catenation and $p\\pi-p\\pi$ multiple bonding.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 78,
    exam: "JEE Main 2024 (05 Apr Shift 1)",
    question: "The number of neutrons present in the more abundant isotope of boron is $x$. Amorphous boron upon heating with air forms a product, in which the oxidation state of boron is $y$. The value of $x + y$ is:",
    options: [
      "3",
      "9",
      "4",
      "6"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "The more abundant isotope of boron is $^{11}\\text{B}$ (abundance $\\approx 81\\%$, atomic number = 5).\nNumber of neutrons $x = 11 - 5 = 6$.\nWhen boron is heated with air, it forms boron trioxide ($\\text{B}_2\\text{O}_3$):\n$$4\\text{B} + 3\\text{O}_2 \\rightarrow 2\\text{B}_2\\text{O}_3$$\nOxidation state of boron in $\\text{B}_2\\text{O}_3$ is $y = +3$.\n$$x + y = 6 + 3 = 9$$\nHence, the correct option is (B)."
  },
  {
    qNum: 79,
    exam: "JEE Main 2024 (05 Apr Shift 1)",
    question: "Given below are two statements:\nStatement I: In group 13, the stability of +1 oxidation state increases down the group.\nStatement II: The atomic size of gallium is greater than that of aluminium.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are correct",
      "Statement I is incorrect but Statement II is correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is correct: Due to the inert pair effect, the stability of the +1 oxidation state increases down Group 13 ($\\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$).\nStatement II is incorrect: Due to poor shielding of the nuclear charge by ten intervening $3d$ electrons (transition contraction), the atomic radius of gallium ($135\\text{ pm}$) is slightly smaller than that of aluminium ($143\\text{ pm}$).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 80,
    exam: "JEE Main 2024 (05 Apr Shift 2)",
    question: "The correct statements from the following are:\n(A) The decreasing order of atomic radii of group 13 elements is $\\text{Tl} > \\text{In} > \\text{Ga} > \\text{Al} > \\text{B}$.\n(B) Down the group 13 electronegativity decreases from top to bottom.\n(C) $\\text{Al}$ dissolves in dil. $\\text{HCl}$ and liberates $\\text{H}_2$, but conc. $\\text{HNO}_3$ renders $\\text{Al}$ passive by forming a protective oxide layer on the surface.\n(D) All elements of group 13 exhibits highly stable +1 oxidation state.\n(E) Hybridisation of $\\text{Al}$ in $[\\text{Al}(\\text{H}_2\\text{O})_6]^{3+}$ ion is $sp^3d^2$.\nChoose the correct answer from the options given below:",
    options: [
      "(A), (C) and (E) only",
      "(A) and (C) only",
      "(C) and (E) only",
      "(A), (B), (C) and (E) only"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- (A) Incorrect: Correct order is $\\text{Tl} > \\text{In} > \\text{Al} > \\text{Ga} > \\text{B}$ due to transition contraction in Ga.\n- (B) Incorrect: Electronegativity does not decrease uniformly (increases slightly from Al to Tl).\n- (C) Correct: Conc. $\\text{HNO}_3$ passivates aluminium by forming a thin protective film of $\\text{Al}_2\\text{O}_3$.\n- (D) Incorrect: Only $\\text{Tl}$ exhibits a highly stable +1 state; B and Al are most stable as +3.\n- (E) Correct: In octahedral $[\\text{Al}(\\text{H}_2\\text{O})_6]^{3+}$, aluminium uses $sp^3d^2$ hybrid orbitals.\nThus, only statements (C) and (E) are correct.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 81,
    exam: "JEE Main 2024 (06 Apr Shift 1)",
    question: "Given below are two statements:\nStatement I: Gallium is used in the manufacturing of thermometers.\nStatement II: A thermometer containing gallium is useful for measuring the freezing point (256 K) of brine solution.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are true",
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is true: Gallium has a high boiling point ($2237^\\circ\\text{C}$) and low vapour pressure, making it ideal for high-temperature thermometers.\nStatement II is false: The melting point of gallium is $303\\text{ K}$ ($29.76^\\circ\\text{C}$), which is above $256\\text{ K}$. At $256\\text{ K}$, gallium would be a solid, so it cannot measure the freezing point of brine.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 82,
    exam: "JEE Main 2024 (06 Apr Shift 2)",
    question: "Evaluate the following statements related to group 14 elements for their correctness:\n(A) Covalent radius decreases down the group from C to Pb in a regular manner.\n(B) Electronegativity decreases from C to Pb down the group gradually.\n(C) Maximum covalence of C is 4 whereas other elements can expand their covalence due to presence of d orbitals.\n(D) Heavier elements do not form $p\\pi-p\\pi$ bonds.\n(E) Carbon can exhibit negative oxidation states.\nChoose the correct answer from the options given below:",
    options: [
      "(A), (B) and (C) Only",
      "(C), (D) and (E) Only",
      "(C) and (D) Only",
      "(A) and (B) Only"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- (A) Incorrect: Covalent radius increases down the group.\n- (B) Incorrect: Electronegativity drops from C (2.5) to Si (1.8) and remains nearly constant down to Pb (1.8).\n- (C) Correct: Carbon has no $d$-orbitals, so its maximum covalency is 4, while others have vacant $d$-orbitals.\n- (D) Correct: Due to large size, heavier elements do not form strong $p\\pi-p\\pi$ bonds.\n- (E) Correct: Carbon exhibits oxidation states from $-4$ (e.g. in $\\text{CH}_4$) to $+4$.\nThus, statements (C), (D), and (E) are correct.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 83,
    exam: "JEE Main 2024 (06 Apr Shift 2)",
    question: "The number of ions from the following that are expected to behave as oxidising agent is:\n$$\\text{Sn}^{4+}, \\text{Sn}^{2+}, \\text{Pb}^{2+}, \\text{Pb}^{4+}, \\text{Tl}^{3+}, \\text{Tl}^+$$",
    options: [
      "3",
      "2",
      "1",
      "4"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Due to the inert pair effect, the lower oxidation states are more stable for the heavier elements ($\\text{Pb}^{2+}$ is more stable than $\\text{Pb}^{4+}$, and $\\text{Tl}^+$ is more stable than $\\text{Tl}^{3+}$). Therefore, $\\text{Pb}^{4+}$ and $\\text{Tl}^{3+}$ readily gain electrons and behave as strong oxidizing agents. The number of such oxidizing ions is 2.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 84,
    exam: "JEE Main 2024 (08 Apr Shift 1)",
    question: "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R:\nAssertion A: The stability order of +1 oxidation state of $\\text{Ga}$, $\\text{In}$ and $\\text{Tl}$ is $\\text{Ga} < \\text{In} < \\text{Tl}$.\nReason R: The inert pair effect stabilizes the lower oxidation state down the group.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A."
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Assertion A is true: The stability of the +1 oxidation state follows $\\text{Ga} < \\text{In} < \\text{Tl}$.\nReason R is true: Due to poor shielding by $d$ and $f$ electrons, the valence $ns^2$ electrons remain inert (inert pair effect), progressively stabilizing the lower oxidation state (+1) down the group.\nReason R is the correct explanation for Assertion A.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 85,
    exam: "JEE Main 2025 (23 Jan Shift 2)",
    question: "Given below are the atomic numbers of some group 14 elements. The atomic number of the element with lowest melting point is:",
    options: [
      "6",
      "82",
      "14",
      "50"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["85"],
    solution_image_url: diagramUrls["85"],
    solution: "The melting points of Group 14 elements (in $^\\circ\\text{C}$) are:\n- $\\text{C}$ ($Z=6$): $3730^\\circ\\text{C}$\n- $\\text{Si}$ ($Z=14$): $1410^\\circ\\text{C}$\n- $\\text{Ge}$ ($Z=32$): $937^\\circ\\text{C}$\n- $\\text{Sn}$ ($Z=50$): $232^\\circ\\text{C}$\n- $\\text{Pb}$ ($Z=82$): $327^\\circ\\text{C}$\nAmong these, tin ($\\text{Sn}$, $Z=50$) has the lowest melting point ($232^\\circ\\text{C}$).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 86,
    exam: "JEE Main 2025 (28 Jan Shift 1)",
    question: "Consider the following elements $\\text{In}$, $\\text{Tl}$, $\\text{Al}$, $\\text{Pb}$, $\\text{Sn}$ and $\\text{Ge}$. The most stable oxidation states of elements with highest and lowest first ionisation enthalpies, respectively, are:",
    options: [
      "+3 and +1",
      "+1 and +4",
      "+4 and +3",
      "+2 and +3"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution_image_url: null,
    solution: "Among $\\text{In}, \\text{Tl}, \\text{Al}, \\text{Pb}, \\text{Sn}, \\text{Ge}$:\n- The element with the highest first ionization enthalpy is $\\text{Ge}$ ($762\\text{ kJ mol}^{-1}$); its most stable oxidation state is $+4$.\n- The element with the lowest first ionization enthalpy is $\\text{In}$ ($558\\text{ kJ mol}^{-1}$); its most stable oxidation state is $+3$.\nThus, the most stable oxidation states are +4 and +3 respectively.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 87,
    exam: "JEE Main 2025 (04 Apr Shift 2)",
    question: "Given below are two statements:\nStatement (I): The first ionisation enthalpy of group 14 elements is higher than the corresponding elements of group 13.\nStatement (II): Melting points and boiling points of group 13 elements are in general much higher than those of the corresponding elements of group 14.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
      "Both Statement I and Statement II are incorrect",
      "Both Statement I and Statement II are correct"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement (I) is correct: Across a period from Group 13 to Group 14, nuclear charge increases and atomic size decreases, resulting in higher first ionization enthalpies for Group 14 elements.\nStatement (II) is incorrect: Group 14 elements have higher melting and boiling points than Group 13 elements because they form four covalent bonds per atom in tetrahedral 3D network lattices (e.g., diamond, silicon).\n\nHence, the correct option is (A)."
  },
  {
    qNum: 88,
    exam: "JEE Main 2025 (07 Apr Shift 1)",
    question: "The group 14 elements A and B have the first ionisation enthalpy values of $708$ and $715\\text{ kJ mol}^{-1}$ respectively. The above values are lowest among their group members. The nature of their ions $\\text{A}^{2+}$ and $\\text{B}^{4+}$ respectively is:",
    options: [
      "both reducing",
      "both oxidising",
      "reducing and oxidising",
      "oxidising and reducing"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution_image_url: null,
    solution: "In Group 14, the two elements with the lowest first ionization enthalpies are $\\text{Sn}$ ($708\\text{ kJ mol}^{-1}$) and $\\text{Pb}$ ($715\\text{ kJ mol}^{-1}$). Thus, $\\text{A} = \\text{Sn}$ and $\\text{B} = \\text{Pb}$.\n- For $\\text{Sn}$, the +4 state is more stable than +2, so $\\text{Sn}^{2+}$ acts as a reducing agent.\n- For $\\text{Pb}$, the +2 state is more stable than +4 due to the inert pair effect, so $\\text{Pb}^{4+}$ acts as an oxidising agent.\nTherefore, $\\text{A}^{2+}$ and $\\text{B}^{4+}$ are reducing and oxidising respectively.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 89,
    exam: "JEE Main 2025 (07 Apr Shift 2)",
    question: "The correct statements from the following are:\n(A) $\\text{Tl}^{3+}$ is a powerful oxidising agent\n(B) $\\text{Al}^{3+}$ does not get reduced easily\n(C) Both $\\text{Al}^{3+}$ and $\\text{Tl}^{3+}$ are very stable in solution\n(D) $\\text{Tl}^+$ is more stable than $\\text{Tl}^{3+}$\n(E) $\\text{Al}^{3+}$ and $\\text{Tl}^+$ are highly stable\nChoose the correct answer from the options given below:",
    options: [
      "(A), (B), (C), (D) and (E)",
      "(A), (B), (D) and (E) only",
      "(B), (D) and (E) only",
      "(A), (C) and (D) only"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- (A) True: Due to the inert pair effect, $\\text{Tl}^+$ is more stable than $\\text{Tl}^{3+}$, so $\\text{Tl}^{3+}$ is a powerful oxidising agent.\n- (B) True: Standard reduction potential $E^\\circ(\\text{Al}^{3+}/\\text{Al}) = -1.66\\text{ V}$, so it does not get reduced easily.\n- (C) False: $\\text{Tl}^{3+}$ is unstable in aqueous solution and easily reduces to $\\text{Tl}^+$.\n- (D) True: $\\text{Tl}^+$ is much more stable than $\\text{Tl}^{3+}$.\n- (E) True: $\\text{Al}^{3+}$ and $\\text{Tl}^+$ are the respective thermodynamically stable oxidation states.\nThus, statements (A), (B), (D), and (E) are correct.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 90,
    exam: "JEE Main 2026 (21 Jan Shift 1)",
    question: "Given below are two statements:\nStatement I: The number of pairs among $[\\text{SiO}_2, \\text{CO}_2]$, $[\\text{SnO}, \\text{SnO}_2]$, $[\\text{PbO}, \\text{PbO}_2]$ and $[\\text{GeO}, \\text{GeO}_2]$, which contain oxides that are both amphoteric is 2.\nStatement II: $\\text{BF}_3$ is an electron deficient molecule, can act as a Lewis acid, forms adduct with $\\text{NH}_3$ and has a trigonal planar geometry.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is true: Checking each pair:\n- $[\\text{SiO}_2, \\text{CO}_2]$: Both are acidic.\n- $[\\text{SnO}, \\text{SnO}_2]$: Both are amphoteric (Pair 1).\n- $[\\text{GeO}, \\text{GeO}_2]$: Both are amphoteric (Pair 2).\n- $[\\text{PbO}, \\text{PbO}_2]$: $\\text{PbO}$ is amphoteric while $\\text{PbO}_2$ is predominantly acidic/oxidizing.\nThus, exactly 2 pairs contain oxides that are both amphoteric.\nStatement II is true: $\\text{BF}_3$ has an incomplete octet (6 valence electrons), acts as a Lewis acid, forms $\\text{BF}_3\\cdot\\text{NH}_3$ adduct, and has $sp^2$ hybridized trigonal planar geometry.\nThus, both Statement I and Statement II are true.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 91,
    exam: "JEE Main 2026 (21 Jan Shift 1)",
    question: "Consider the following reactions:\n$$\\text{PbCl}_2 + \\text{K}_2\\text{CrO}_4 \\xrightarrow{\\text{Hot solution}} \\text{A} + 2\\text{KCl}$$\n$$\\text{A} + \\text{NaOH} \\rightarrow \\text{B} + \\text{Na}_2\\text{CrO}_4$$\n$$\\text{PbSO}_4 + 4\\text{CH}_3\\text{COONH}_4 \\rightarrow (\\text{NH}_4)_2\\text{SO}_4 + \\text{X}$$\nIn the above reactions, A, B and X are respectively:",
    options: [
      "$\\text{Na}_2[\\text{Pb}(\\text{OH})_4], \\text{PbCrO}_4 \\text{ and } (\\text{NH}_4)_2[\\text{Pb}(\\text{CH}_3\\text{COO})_4]$",
      "$\\text{Na}_2[\\text{Pb}(\\text{OH})_4], \\text{PbCrO}_4 \\text{ and } [\\text{Pb}(\\text{NH}_4)_2]\\text{SO}_4$",
      "$\\text{PbCrO}_4, \\text{Na}_2[\\text{Pb}(\\text{OH})_4] \\text{ and } (\\text{NH}_4)_2[\\text{Pb}(\\text{CH}_3\\text{COO})_4]$",
      "$\\text{PbO}, \\text{Na}_2[\\text{Pb}(\\text{OH})_4] \\text{ and } [\\text{Pb}(\\text{NH}_4)_4]\\text{SO}_4$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution_image_url: null,
    solution: "- Reaction 1: $\\text{PbCl}_2 + \\text{K}_2\\text{CrO}_4 \\rightarrow \\text{PbCrO}_4\\text{ (A, yellow ppt)} + 2\\text{KCl}$\n- Reaction 2: $\\text{PbCrO}_4 + 4\\text{NaOH} \\rightarrow \\text{Na}_2[\\text{Pb}(\\text{OH})_4]\\text{ (B)} + \\text{Na}_2\\text{CrO}_4$\n- Reaction 3: $\\text{PbSO}_4 + 4\\text{CH}_3\\text{COONH}_4 \\rightarrow (\\text{NH}_4)_2\\text{SO}_4 + (\\text{NH}_4)_2[\\text{Pb}(\\text{CH}_3\\text{COO})_4]\\text{ (X)}$\nThus, $\\text{A} = \\text{PbCrO}_4$, $\\text{B} = \\text{Na}_2[\\text{Pb}(\\text{OH})_4]$, and $\\text{X} = (\\text{NH}_4)_2[\\text{Pb}(\\text{CH}_3\\text{COO})_4]$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 92,
    exam: "JEE Main 2026 (22 Jan Shift 2)",
    question: "Given below are two statements:\nStatement I: Elements 'X' and 'Y' are the most and least electronegative elements, respectively among N, As, Sb and P. The nature of the oxides $\\text{X}_2\\text{O}_3$ and $\\text{Y}_2\\text{O}_3$ is acidic and amphoteric, respectively.\nStatement II: $\\text{BCl}_3$ is covalent in nature and gets hydrolysed in water. It produces $[\\text{B}(\\text{OH})_4]^-$ and $[\\text{B}(\\text{H}_2\\text{O})_6]^{3+}$ in aqueous medium.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Statement I is true: Among $\\text{N}, \\text{P}, \\text{As}, \\text{Sb}$, electronegativity order is $\\text{N} > \\text{P} > \\text{As} > \\text{Sb}$. Thus $\\text{X} = \\text{N}$ and $\\text{Y} = \\text{Sb}$. $\\text{N}_2\\text{O}_3$ is an acidic oxide while $\\text{Sb}_2\\text{O}_3$ is an amphoteric oxide.\nStatement II is false: $\\text{BCl}_3$ hydrolyses in water to form orthoboric acid $\\text{B}(\\text{OH})_3$ and $\\text{HCl}$. Due to the absence of $d$-orbitals, boron can only attain a maximum coordination number of 4, forming $[\\text{B}(\\text{OH})_4]^-$ under alkaline conditions, but it cannot form hexacoordinated $[\\text{B}(\\text{H}_2\\text{O})_6]^{3+}$.\nThus, Statement I is true but Statement II is false.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 93,
    exam: "JEE Main 2026 (23 Jan Shift 1)",
    question: "Given below are statements about group 13 elements:\n(A) Down the group, ionic radii of $\\text{M}^{3+}$ ions decrease.\n(B) Electronegativity decreases uniformly down the group.\n(C) Boron has the highest first ionization enthalpy among all group 13 elements.\n(D) Trichloride and triiodide of group 13 elements are covalent in nature.\nChoose the correct answer from the options given below:",
    options: [
      "(C) and (D) Only",
      "(A) and (D) Only",
      "(A) and (C) Only",
      "(B) and (D) Only"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- (A) Incorrect: Down a group, principal quantum number increases, so ionic radii of $\\text{M}^{3+}$ increase.\n- (B) Incorrect: Electronegativity does not decrease uniformly (it increases from Al to Tl).\n- (C) Correct: Boron has the smallest size and highest nuclear charge density, giving it the highest first ionization enthalpy ($801\\text{ kJ mol}^{-1}$).\n- (D) Correct: Trihalides of Group 13 elements are electron deficient and predominantly covalent in nature.\nThus, only statements (C) and (D) are correct.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 94,
    exam: "JEE Main 2026 (23 Jan Shift 2)",
    question: "It is noticed that $\\text{Pb}^{2+}$ is more stable than $\\text{Pb}^{4+}$ but $\\text{Sn}^{2+}$ is less stable than $\\text{Sn}^{4+}$. Observe the following reactions:\n$$\\text{PbO}_2 + \\text{Pb} \\rightarrow 2\\text{PbO}; \\quad \\Delta_r G^\\circ(1)$$\n$$\\text{SnO}_2 + \\text{Sn} \\rightarrow 2\\text{SnO}; \\quad \\Delta_r G^\\circ(2)$$\nIdentify the correct set from the following:",
    options: [
      "$\\Delta_r G^\\circ(1) < 0; \\quad \\Delta_r G^\\circ(2) < 0$",
      "$\\Delta_r G^\\circ(1) > 0; \\quad \\Delta_r G^\\circ(2) > 0$",
      "$\\Delta_r G^\\circ(1) < 0; \\quad \\Delta_r G^\\circ(2) > 0$",
      "$\\Delta_r G^\\circ(1) > 0; \\quad \\Delta_r G^\\circ(2) < 0$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "For lead, the +2 oxidation state is thermodynamically more stable than the +4 state due to the inert pair effect. The conversion of $\\text{Pb}^{4+} + \\text{Pb}^0 \\rightarrow 2\\text{Pb}^{2+}$ leads to the more stable species, so this reaction is spontaneous: $\\Delta_r G^\\circ(1) < 0$.\nFor tin, the +4 oxidation state is more stable than the +2 state. The reverse reaction converting stable $\\text{Sn}^{4+}$ and $\\text{Sn}^0$ into less stable $\\text{Sn}^{2+}$ is non-spontaneous: $\\Delta_r G^\\circ(2) > 0$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 95,
    exam: "JEE Main 2026 (28 Jan Shift 2)",
    question: "Consider the following reactions:\n$$\\text{Na}_2\\text{B}_4\\text{O}_7 \\xrightarrow{\\Delta} 2\\text{X} + \\text{Y}$$\n$$\\text{CuSO}_4 + \\text{Y} \\xrightarrow{\\text{Oxidising flame}} \\text{Z} + \\text{SO}_3$$\n$$2\\text{Z} + 2\\text{X} + \\text{Carbon} \\xrightarrow{\\text{Reducing flame}} 2\\text{Q} + \\text{Na}_2\\text{B}_4\\text{O}_7 + \\text{CO}$$\nThe oxidation states of $\\text{Cu}$ in $\\text{Z}$ and $\\text{Q}$, respectively are:",
    options: [
      "+1 and +1",
      "+2 and +2",
      "+1 and +2",
      "+2 and +1"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution_image_url: null,
    solution: "In the Borax bead test:\n1. On heating, borax forms sodium metaborate and boric anhydride:\n$$\\text{Na}_2\\text{B}_4\\text{O}_7 \\xrightarrow{\\Delta} 2\\text{NaBO}_2\\text{ (X)} + \\text{B}_2\\text{O}_3\\text{ (Y)}$$\n2. In the oxidising flame, $\\text{B}_2\\text{O}_3$ reacts with $\\text{CuSO}_4$ to form copper(II) metaborate (Z, blue bead):\n$$\\text{CuSO}_4 + \\text{B}_2\\text{O}_3 \\rightarrow \\text{Cu}(\\text{BO}_2)_2\\text{ (Z)} + \\text{SO}_3$$\nHere, copper is in the +2 oxidation state.\n3. In the reducing flame, carbon reduces $\\text{Cu}(\\text{BO}_2)_2$ to copper(I) metaborate (Q, red/colourless bead):\n$$2\\text{Cu}(\\text{BO}_2)_2 + 2\\text{NaBO}_2 + \\text{C} \\rightarrow 2\\text{CuBO}_2\\text{ (Q)} + \\text{Na}_2\\text{B}_4\\text{O}_7 + \\text{CO}$$\nHere, copper is in the +1 oxidation state.\nThus, the oxidation states of copper in Z and Q are +2 and +1 respectively.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 96,
    exam: "JEE Main 2026 (05 Apr Shift 2)",
    question: "Given below are two statements:\nStatement I: Aluminium upon reaction with $\\text{NaOH}$ forms $[\\text{Al}(\\text{OH})_6]^{3-}$ ion.\nStatement II: The geometry of $\\text{ICl}_4^-$, $\\text{ClO}_3^-$ and $\\text{IBr}_2^-$ is square planar, pyramidal and linear respectively.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "- Statement I is false: Aluminium reacts with aqueous $\\text{NaOH}$ to form sodium tetrahydroxoaluminate(III) $[\\text{Al}(\\text{OH})_4]^-$, not $[\\text{Al}(\\text{OH})_6]^{3-}$:\n$$2\\text{Al} + 2\\text{NaOH} + 6\\text{H}_2\\text{O} \\rightarrow 2\\text{Na}[\\text{Al}(\\text{OH})_4] + 3\\text{H}_2$$\n- Statement II is true:\n  - $\\text{ICl}_4^-$ has 4 bonding pairs and 2 lone pairs ($sp^3d^2$), giving a square planar geometry.\n  - $\\text{ClO}_3^-$ has 3 bonding pairs and 1 lone pair ($sp^3$), giving a trigonal pyramidal geometry.\n  - $\\text{IBr}_2^-$ has 2 bonding pairs and 3 lone pairs ($sp^3d$), giving a linear geometry.\nThus, Statement I is false but Statement II is true.\n\nHence, the correct option is (D)."
  }
];
