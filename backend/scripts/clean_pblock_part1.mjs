import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pblock_diagram_urls.json'), 'utf8'));

export const PBLOCK_PART1 = [
  {
    qNum: 1,
    exam: "JEE Main 2003",
    question: "For making good quality mirrors, plates of float glass are used. These are obtained by floating molten glass over a liquid metal which does not solidify before glass. The metal used can be:",
    options: [
      "tin",
      "sodium",
      "magnesium",
      "mercury"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "For making good quality mirrors, plates of float glass are obtained by floating molten glass over molten tin or liquid metal. Under ambient conditions, mercury exists as a liquid metal at room temperature.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 2,
    exam: "JEE Main 2003",
    question: "Graphite is a soft solid lubricant extremely difficult to melt. The reason for this anomalous behaviour is that graphite:",
    options: [
      "is an allotropic form of diamond",
      "has molecules of variable molecular masses like polymers",
      "has carbon atoms arranged in large plates of rings of strongly bound carbon atoms with weak interplate bonds",
      "is a non-crystalline substance"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Graphite has a layered two-dimensional sheet structure. Within each layer, carbon atoms are arranged in hexagonal rings held by strong covalent bonds ($sp^2$ hybridized), while successive layers are held together by weak van der Waals forces, allowing them to slide over one another easily. Because breaking the covalent network requires enormous energy, it has an extremely high melting point.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 3,
    exam: "JEE Main 2003",
    question: "In curing cement plasters water is sprinkled from time to time. This helps in:",
    options: [
      "developing interlocking needle-like crystals of hydrated silicates",
      "hydrating sand and gravel mixed with cement",
      "converting sand into silicic acid",
      "keeping it cool"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "During the setting of cement, hydration of calcium silicates and aluminates occurs. Water sprinkling promotes the slow crystallization and growth of interlocking needle-like crystals of hydrated calcium silicates (tobermorite gel), providing high compressive strength.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 4,
    exam: "JEE Main 2004",
    question: "Aluminium chloride exists as dimer, $\\text{Al}_2\\text{Cl}_6$ in solid state as well as in solution of non-polar solvents such as benzene. When dissolved in water, it gives:",
    options: [
      "$\\text{Al}^{3+} + 3\\text{Cl}^-$",
      "$\\text{Al}_2\\text{O}_3 + 6\\text{HCl}$",
      "$[\\text{Al}(\\text{OH})_6]^{3-}$",
      "$[\\text{Al}(\\text{H}_2\\text{O})_6]^{3+} + 3\\text{Cl}^-$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "In polar solvents like water, the high hydration enthalpy of $\\text{Al}^{3+}$ exceeds the lattice energy and the $\\text{Al}-\\text{Cl}$ coordinate bond energy in $\\text{Al}_2\\text{Cl}_6$. As a result, it ionizes into hexaaquaaluminium(III) cations and chloride ions:\n$$\\text{Al}_2\\text{Cl}_6 + 12\\text{H}_2\\text{O} \\rightarrow 2[\\text{Al}(\\text{H}_2\\text{O})_6]^{3+} + 6\\text{Cl}^-$$\nHence, the correct option is (D)."
  },
  {
    qNum: 5,
    exam: "JEE Main 2004",
    question: "The soldiers of Napoleon army while at Alps during freezing winter suffered a serious problem as regards to the tin buttons of their uniforms. White metallic tin buttons got converted to grey powder. This transformation is related to:",
    options: [
      "an interaction with nitrogen of the air at very low temperatures",
      "an interaction with water vapour contained in the humid air",
      "a change in the partial pressure of oxygen in the air",
      "a change in the crystalline structure of tin"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Tin exhibits allotropy: white $\\beta$-tin (tetragonal metallic lattice) transforms below $13.2^\\circ\\text{C}$ into grey $\\alpha$-tin (diamond cubic lattice, brittle powder). This phenomenon is known as 'tin pest' or 'tin disease' and involves a change in crystalline structure.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 6,
    exam: "JEE Main 2005",
    question: "The structure of diborane ($\\text{B}_2\\text{H}_6$) contains:",
    options: [
      "four $2c\\text{--}2e$ bonds and two $3c\\text{--}2e$ bonds",
      "two $2c\\text{--}2e$ bonds and four $3c\\text{--}2e$ bonds",
      "two $2c\\text{--}2e$ bonds and two $3c\\text{--}3e$ bonds",
      "four $2c\\text{--}2e$ bonds and four $3c\\text{--}2e$ bonds"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["6"],
    solution_image_url: diagramUrls["6"],
    solution: "Diborane has four terminal $\\text{B}-\\text{H}$ bonds which are conventional two-centre two-electron ($2c\\text{--}2e$) bonds, and two bridging $\\text{B}-\\text{H}-\\text{B}$ banana bonds which are three-centre two-electron ($3c\\text{--}2e$) bonds.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 7,
    exam: "JEE Main 2005",
    question: "Heating an aqueous solution of aluminium chloride to dryness will give:",
    options: [
      "$\\text{AlCl}_3$",
      "$\\text{Al}_2\\text{Cl}_6$",
      "$\\text{Al}_2\\text{O}_3$",
      "$\\text{Al}(\\text{OH})\\text{Cl}_2$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Due to high charge density of $\\text{Al}^{3+}$, hydrated aluminium chloride $\\text{AlCl}_3\\cdot 6\\text{H}_2\\text{O}$ undergoes extensive hydrolysis upon heating, losing $\\text{HCl}$ gas instead of just water, ultimately yielding aluminium oxide:\n$$2\\text{AlCl}_3\\cdot 6\\text{H}_2\\text{O} \\xrightarrow{\\Delta} \\text{Al}_2\\text{O}_3 + 6\\text{HCl} + 9\\text{H}_2\\text{O}$$\nHence, the correct option is (C)."
  },
  {
    qNum: 8,
    exam: "JEE Main 2005",
    question: "The number and type of bonds between two carbon atoms in calcium carbide are:",
    options: [
      "One sigma, one pi",
      "One sigma, two pi",
      "Two sigma, one pi",
      "Two sigma, two pi"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["8"],
    solution_image_url: diagramUrls["8"],
    solution: "Calcium carbide contains $\\text{Ca}^{2+}$ and the acetylide ion $[:\\text{C}\\equiv \\text{C}:]^{2-}$. The carbon-carbon triple bond consists of one $\\sigma$ bond and two $\\pi$ bonds.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 9,
    exam: "JEE Main 2005",
    question: "In silicon dioxide:",
    options: [
      "Each silicon atom is surrounded by four oxygen atoms and each oxygen atom is bonded to two silicon atoms",
      "Each silicon atom is surrounded by two oxygen atoms and each oxygen atom is bonded to two silicon atoms",
      "Silicon atom is bonded to two oxygen atoms",
      "There are double bonds between silicon and oxygen atoms"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["9"],
    solution_image_url: diagramUrls["9"],
    solution: "In silica ($\\text{SiO}_2$), a giant three-dimensional covalent network is formed where each silicon atom is tetrahedrally bonded to four oxygen atoms, and each oxygen atom acts as a bridge between two silicon atoms.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 10,
    exam: "JEE Main 2007",
    question: "The stability of dihalides of $\\text{Si}$, $\\text{Ge}$, $\\text{Sn}$ and $\\text{Pb}$ increases steadily in the sequence:",
    options: [
      "$\\text{GeX}_2 < \\text{SiX}_2 < \\text{SnX}_2 < \\text{PbX}_2$",
      "$\\text{SiX}_2 < \\text{GeX}_2 < \\text{PbX}_2 < \\text{SnX}_2$",
      "$\\text{SiX}_2 < \\text{GeX}_2 < \\text{SnX}_2 < \\text{PbX}_2$",
      "$\\text{PbX}_2 < \\text{SnX}_2 < \\text{GeX}_2 < \\text{SiX}_2$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Due to the inert pair effect, the stability of the lower (+2) oxidation state increases on moving down Group 14 from carbon to lead. Thus, the stability of dihalides follows:\n$$\\text{SiX}_2 < \\text{GeX}_2 < \\text{SnX}_2 < \\text{PbX}_2$$\nHence, the correct option is (C)."
  },
  {
    qNum: 11,
    exam: "JEE Main 2008",
    question: "Among the following substituted silanes the one which will give rise to cross linked silicone polymer on hydrolysis is:",
    options: [
      "$\\text{R}_4\\text{Si}$",
      "$\\text{RSiCl}_3$",
      "$\\text{R}_2\\text{SiCl}_2$",
      "$\\text{R}_3\\text{SiCl}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["11"],
    solution_image_url: diagramUrls["11"],
    solution: "Hydrolysis of alkyltrichlorosilane $\\text{RSiCl}_3$ gives the trihydroxy intermediate $\\text{RSi}(\\text{OH})_3$, which undergoes 3D condensation polymerisation to form cross-linked silicone polymers.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 12,
    exam: "JEE Main 2008",
    question: "The bond dissociation energy of $\\text{B}-\\text{F}$ in $\\text{BF}_3$ is $646\\text{ kJ mol}^{-1}$ whereas that of $\\text{C}-\\text{F}$ in $\\text{CF}_4$ is $515\\text{ kJ mol}^{-1}$. The correct reason for higher $\\text{B}-\\text{F}$ bond dissociation energy as compared to that of $\\text{C}-\\text{F}$ is:",
    options: [
      "smaller size of B-atom as compared to that of C-atom",
      "stronger $\\sigma$ bond between B and F in $\\text{BF}_3$ as compared to that between C and F in $\\text{CF}_4$",
      "significant $p\\pi-p\\pi$ interaction between B and F in $\\text{BF}_3$ whereas there is no possibility of such interaction between C and F in $\\text{CF}_4$",
      "lower degree of $p\\pi-p\\pi$ interaction between B and F in $\\text{BF}_3$ than that between C and F in $\\text{CF}_4$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "In $\\text{BF}_3$, boron has an empty $2p$ orbital that receives electron density from the filled $2p$ orbital of fluorine via $p\\pi-p\\pi$ back-bonding, giving partial double bond character to the $\\text{B}-\\text{F}$ bond and greatly increasing its bond dissociation energy. In $\\text{CF}_4$, carbon's octet is complete and it has no vacant $p$ orbitals to accept back-bonding.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 13,
    exam: "JEE Main 2011",
    question: "Boron cannot form which one of the following anions?",
    options: [
      "$\\text{BH}_4^-$",
      "$\\text{B}(\\text{OH})_4^-$",
      "$\\text{BO}_2^-$",
      "$\\text{BF}_6^{3-}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Boron belongs to the second period and has only four valence orbitals ($2s, 2p_x, 2p_y, 2p_z$) without any vacant $d$-orbitals. Hence its maximum covalency is restricted to 4, so it cannot form the hexacoordinated $[\\text{BF}_6]^{3-}$ anion.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 14,
    exam: "JEE Main 2012 (07 May)",
    question: "Which of the oxide groups among the following cannot be reduced by carbon?",
    options: [
      "$\\text{Cu}_2\\text{O}, \\text{SnO}_2$",
      "$\\text{CaO}, \\text{K}_2\\text{O}$",
      "$\\text{PbO}, \\text{Fe}_2\\text{O}_3$",
      "$\\text{Fe}_2\\text{O}_3, \\text{ZnO}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Calcium and potassium are highly electropositive and reactive metals. Their oxides ($\\text{CaO}, \\text{K}_2\\text{O}$) have very high negative free energies of formation, which carbon cannot reduce at practical metallurgical temperatures.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 15,
    exam: "JEE Main 2014 (19 Apr)",
    question: "Which of these statements is not true?",
    options: [
      "$\\text{LiAlH}_4$ is versatile reducing agent in organic synthesis.",
      "$\\text{NO}^+$ is isoelectronic with $\\text{O}_2$.",
      "Boron is always covalent in its compounds.",
      "In aqueous solution, the $\\text{Tl}^+$ ion is much more stable than $\\text{Tl}^{3+}$."
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Number of electrons in $\\text{NO}^+ = 7 + 8 - 1 = 14$.\nNumber of electrons in $\\text{O}_2 = 8 + 8 = 16$.\nSince they do not possess the same number of electrons, they are not isoelectronic.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 16,
    exam: "JEE Main 2014 (19 Apr)",
    question: "Example of a three-dimensional silicate is:",
    options: [
      "Ultramarines",
      "Feldspars",
      "Zeolites",
      "All of these"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Three-dimensional silicates (tectosilicates) are formed when all four oxygen atoms of each $[\\text{SiO}_4]^{4-}$ tetrahedron are shared with adjacent tetrahedra. Quartz, feldspars, zeolites, and ultramarines are all examples of three-dimensional framework aluminosilicates.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 17,
    exam: "JEE Main 2016 (09 Apr)",
    question: "Match the items in Column I with its main use listed in Column II:\n\n**Column I**:\nA. Silica gel\nB. Silicon\nC. Silicone\nD. Silicate\n\n**Column II**:\ni. Transistor\nii. Ion-exchanger\niii. Drying agent\niv. Sealant",
    options: [
      "A-iii, B-i, C-iv, D-ii",
      "A-ii, B-i, C-iv, D-iii",
      "A-ii, B-iv, C-i, D-iii",
      "A-iii, B-iv, C-i, D-ii"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Matching:\n- Silica gel is an effective drying agent (A $\\rightarrow$ iii).\n- Silicon is a semiconductor used in transistors (B $\\rightarrow$ i).\n- Silicone is water repellent and used as sealants/lubricants (C $\\rightarrow$ iv).\n- Silicates (such as zeolites) act as ion exchangers (D $\\rightarrow$ ii).\n\nHence, the correct option is (A)."
  },
  {
    qNum: 18,
    exam: "JEE Main 2016 (10 Apr)",
    question: "Identify the reaction which does not liberate hydrogen:",
    options: [
      "Reaction of lithium hydride with $\\text{B}_2\\text{H}_6$.",
      "Electrolysis of acidified water using Pt electrodes.",
      "Reaction of zinc with aqueous alkali.",
      "Allowing a solution of sodium in liquid ammonia to stand."
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Reaction of lithium hydride with diborane in ether produces lithium borohydride without liberating hydrogen gas:\n$$2\\text{LiH} + \\text{B}_2\\text{H}_6 \\xrightarrow{\\text{ether}} 2\\text{Li}[\\text{BH}_4]$$\nAll other given reactions release $\\text{H}_2$ gas.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 19,
    exam: "JEE Main 2016 (10 Apr)",
    question: "Assertion: Among the carbon allotropes, diamond is an insulator, whereas, graphite is a good conductor of electricity.\nReason: Hybridization of carbon in diamond and graphite are $sp^3$ and $sp^2$ respectively.",
    options: [
      "Both assertion and reason are correct, but the reason is not the correct explanation for the assertion.",
      "Both assertion and reason are correct, and the reason is the correct explanation for the assertion.",
      "Both assertion and reason are incorrect.",
      "Assertion is incorrect statement, but the reason is correct."
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Assertion is correct: diamond has localized electrons and is an insulator, whereas graphite has delocalized $\\pi$-electrons that conduct electricity along the planes.\nReason is correct: carbon is $sp^3$ in diamond and $sp^2$ in graphite.\nHowever, hybridization alone is not the full explanation for conductivity; conductivity requires delocalized mobile electrons in a continuous band/sheet.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 20,
    exam: "JEE Main 2017",
    question: "Which one of the following is an oxide?",
    options: [
      "$\\text{SiO}_2$",
      "$\\text{KO}_2$",
      "$\\text{BaO}_2$",
      "$\\text{CsO}_2$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "In $\\text{SiO}_2$, silicon is in +4 oxidation state and oxygen is in -2 oxidation state as the normal oxide ion $\\text{O}^{2-}$. In $\\text{KO}_2$ and $\\text{CsO}_2$, oxygen exists as superoxide ion $\\text{O}_2^-$. In $\\text{BaO}_2$, oxygen exists as peroxide ion $\\text{O}_2^{2-}$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 21,
    exam: "JEE Main 2017",
    question: "When metal M is treated with $\\text{NaOH}$, a white gelatinous precipitate X is obtained, which is soluble in excess of $\\text{NaOH}$. Compound X when heated strongly gives an oxide which is used in chromatography as an adsorbent. The metal M is:",
    options: [
      "$\\text{Zn}$",
      "$\\text{Fe}$",
      "$\\text{Mg}$",
      "$\\text{Al}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Aluminium reacts with sodium hydroxide to precipitate white gelatinous $\\text{Al}(\\text{OH})_3$ (X), which dissolves in excess $\\text{NaOH}$ forming soluble $[\\text{Al}(\\text{OH})_4]^-$. Heating $\\text{Al}(\\text{OH})_3$ gives alumina $\\text{Al}_2\\text{O}_3$, which is widely used in column chromatography as an adsorbent:\n$$2\\text{Al}(\\text{OH})_3 \\xrightarrow{\\Delta} \\text{Al}_2\\text{O}_3 + 3\\text{H}_2\\text{O}$$\nHence, the correct option is (D)."
  },
  {
    qNum: 22,
    exam: "JEE Main 2018 (15 Apr Shift 2)",
    question: "Lithium aluminium hydride reacts with silicon tetrachloride to form:",
    options: [
      "$\\text{LiCl}, \\text{AlH}_3 \\text{ and } \\text{SiH}_4$",
      "$\\text{LiCl}, \\text{AlCl}_3 \\text{ and } \\text{SiH}_4$",
      "$\\text{LiH}, \\text{AlCl}_3 \\text{ and } \\text{SiCl}_4$",
      "$\\text{LiH}, \\text{AlH}_3 \\text{ and } \\text{SiH}_4$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Silicon tetrachloride is reduced by lithium aluminium hydride to produce silane along with lithium chloride and aluminium chloride:\n$$\\text{SiCl}_4 + \\text{LiAlH}_4 \\rightarrow \\text{SiH}_4 + \\text{LiCl} + \\text{AlCl}_3$$\nHence, the correct option is (B)."
  },
  {
    qNum: 23,
    exam: "JEE Main 2018 (16 Apr)",
    question: "A group 13 element X reacts with chlorine gas to produce a compound $\\text{XCl}_3$. $\\text{XCl}_3$ is electron deficient and easily reacts with $\\text{NH}_3$ to form $\\text{Cl}_3\\text{X}\\leftarrow\\text{NH}_3$ adduct; however, $\\text{XCl}_3$ does not dimerize. X is:",
    options: [
      "B",
      "Al",
      "In",
      "Ga"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["23"],
    solution_image_url: diagramUrls["23"],
    solution: "Boron reacts with chlorine to form $\\text{BCl}_3$. Because of the small size of boron, it cannot accommodate four large chlorine atoms around it, preventing dimerization (unlike $\\text{Al}_2\\text{Cl}_6$). It readily accepts a lone pair from $\\text{NH}_3$ to form an adduct $\\text{Cl}_3\\text{B}\\leftarrow\\text{NH}_3$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 24,
    exam: "JEE Main 2019 (09 Jan Shift 1)",
    question: "Correct statements regarding silicones are:\n(a) They are polymers with hydrophobic character.\n(b) They are biocompatible.\n(c) In general, they have high thermal stability and low dielectric strength.\n(d) Usually, they are resistant to oxidation and used as greases.",
    options: [
      "(a), (b) and (c) only",
      "(a) and (b) only",
      "(a), (b), (c) and (d)",
      "(a), (b) and (d) only"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Silicones are organosilicon polymers surrounded by non-polar alkyl groups, imparting strong hydrophobic nature. They possess high thermal stability, biocompatibility (used in cosmetic/medical implants), chemical inertness against oxidation, and are used as lubricants, greases, and insulating materials.\n\nHence, all statements are correct, so the correct option is (C)."
  },
  {
    qNum: 25,
    exam: "JEE Main 2019 (10 Jan Shift 2)",
    question: "The number of 2-centre-2-electron and 3-centre-2-electron bonds in $\\text{B}_2\\text{H}_6$, respectively, are:",
    options: [
      "4 and 2",
      "2 and 4",
      "2 and 2",
      "4 and 1"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["25"],
    solution_image_url: diagramUrls["25"],
    solution: "In diborane $\\text{B}_2\\text{H}_6$, there are four terminal $\\text{B}-\\text{H}$ bonds which are normal $2c\\text{--}2e$ bonds, and two bridging $\\text{B}-\\text{H}-\\text{B}$ banana bonds which are $3c\\text{--}2e$ bonds.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 26,
    exam: "JEE Main 2019 (11 Jan Shift 2)",
    question: "The relative stability of +1 oxidation state of group 13 elements follows the order:",
    options: [
      "$\\text{Al} < \\text{Ga} < \\text{Tl} < \\text{In}$",
      "$\\text{Tl} < \\text{In} < \\text{Ga} < \\text{Al}$",
      "$\\text{Ga} < \\text{Al} < \\text{In} < \\text{Tl}$",
      "$\\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Due to the inert pair effect, the reluctance of valence $ns^2$ electrons to participate in bonding increases down the group. Hence, the stability of the +1 oxidation state increases in the order $\\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 27,
    exam: "JEE Main 2019 (11 Jan Shift 2)",
    question: "The hydride that is NOT electron deficient is:",
    options: [
      "$\\text{SiH}_4$",
      "$\\text{B}_2\\text{H}_6$",
      "$\\text{GaH}_3$",
      "$\\text{AlH}_3$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "$\\text{SiH}_4$ has an exact octet of electrons around silicon (8 valence electrons) and is classified as an electron-precise hydride. $\\text{B}_2\\text{H}_6$, $\\text{GaH}_3$, and $\\text{AlH}_3$ are electron-deficient hydrides.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 28,
    exam: "JEE Main 2019 (08 Apr Shift 1)",
    question: "Diborane ($\\text{B}_2\\text{H}_6$) reacts independently with $\\text{O}_2$ and $\\text{H}_2\\text{O}$ to produce, respectively:",
    options: [
      "$\\text{HBO}_2 \\text{ and } \\text{H}_3\\text{BO}_3$",
      "$\\text{H}_3\\text{BO}_3 \\text{ and } \\text{B}_2\\text{O}_3$",
      "$\\text{B}_2\\text{O}_3 \\text{ and } [\\text{BH}_4]^-$",
      "$\\text{B}_2\\text{O}_3 \\text{ and } \\text{H}_3\\text{BO}_3$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Diborane burns spontaneously in oxygen to form boric oxide:\n$$\\text{B}_2\\text{H}_6 + 3\\text{O}_2 \\rightarrow \\text{B}_2\\text{O}_3 + 3\\text{H}_2\\text{O}$$\nIt hydrolyses completely with water to yield orthoboric acid and hydrogen:\n$$\\text{B}_2\\text{H}_6 + 6\\text{H}_2\\text{O} \\rightarrow 2\\text{H}_3\\text{BO}_3 + 6\\text{H}_2$$\nHence, the products are $\\text{B}_2\\text{O}_3$ and $\\text{H}_3\\text{BO}_3$ respectively (D)."
  },
  {
    qNum: 29,
    exam: "JEE Main 2019 (09 Apr Shift 1)",
    question: "$\\text{C}_{60}$, an allotrope of carbon contains:",
    options: [
      "12 hexagons and 20 pentagons",
      "16 hexagons and 16 pentagons",
      "18 hexagons and 14 pentagons",
      "20 hexagons and 12 pentagons"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Buckminsterfullerene ($\\text{C}_{60}$) has a soccer-ball cage structure composed of 20 six-membered rings (hexagons) and 12 five-membered rings (pentagons).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 30,
    exam: "JEE Main 2019 (09 Apr Shift 2)",
    question: "The correct statements among I to III regarding group 13 element oxides are:\n(I) Boron trioxide is acidic.\n(II) Oxides of aluminium and gallium are amphoteric.\n(III) Oxides of indium and thallium are basic.",
    options: [
      "(I) and (II) only",
      "(II) and (III) only",
      "(I), (II) and (III)",
      "(I) and (III) only"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "In Group 13:\n- $\\text{B}_2\\text{O}_3$ is acidic (forms boric acid in water).\n- $\\text{Al}_2\\text{O}_3$ and $\\text{Ga}_2\\text{O}_3$ are amphoteric (react with both acids and bases).\n- $\\text{In}_2\\text{O}_3$ and $\\text{Tl}_2\\text{O}$ are distinctly basic.\nThus, all three statements (I, II, III) are correct.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 31,
    exam: "JEE Main 2019 (09 Apr Shift 2)",
    question: "The amorphous form of silica is:",
    options: [
      "quartz",
      "kieselguhr",
      "tridymite",
      "cristobalite"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Kieselguhr (diatomaceous earth) is an amorphous form of silica used as a filtration aid and absorbent. Quartz, tridymite, and cristobalite are all crystalline polymorphs of silica.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 32,
    exam: "JEE Main 2019 (10 Apr Shift 1)",
    question: "The correct order of catenation is:",
    options: [
      "$\\text{Ge} > \\text{Sn} > \\text{Si} > \\text{C}$",
      "$\\text{C} > \\text{Sn} > \\text{Si} \\approx \\text{Ge}$",
      "$\\text{C} > \\text{Si} > \\text{Ge} \\approx \\text{Sn}$",
      "$\\text{Si} > \\text{Sn} > \\text{C} > \\text{Ge}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "The catenation tendency decreases down Group 14 as the covalent bond enthalpy between identical atoms decreases with increasing atomic size:\n$$\\text{C}-\\text{C} (348\\text{ kJ/mol}) \\gg \\text{Si}-\\text{Si} (297) > \\text{Ge}-\\text{Ge} (260) \\approx \\text{Sn}-\\text{Sn} (240)$$\nThus, the order of catenation is $\\text{C} > \\text{Si} > \\text{Ge} \\approx \\text{Sn}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 33,
    exam: "JEE Main 2019 (10 Apr Shift 2)",
    question: "The number of pentagons in $\\text{C}_{60}$ and trigons (triangles) in white phosphorus, are:",
    options: [
      "12 and 3",
      "20 and 4",
      "20 and 3",
      "12 and 4"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["33"],
    solution_image_url: diagramUrls["33"],
    solution: "$\\text{C}_{60}$ contains 12 pentagons and 20 hexagons. White phosphorus ($\\text{P}_4$) has a tetrahedral geometry consisting of 4 triangular faces (trigons).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 34,
    exam: "JEE Main 2019 (12 Apr Shift 1)",
    question: "The basic structural unit of feldspar, zeolites, mica, and asbestos is:",
    options: [
      "$[\\text{SiO}_4]^{4-}$",
      "$[\\text{Si}_2\\text{O}_7]^{6-}$",
      "$[\\text{SiO}_3]^{2-}$",
      "$\\text{SiO}_2$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "The fundamental structural building block of all naturally occurring silicates (including feldspars, zeolites, micas, and asbestos) is the tetrahedral $[\\text{SiO}_4]^{4-}$ unit.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 35,
    exam: "JEE Main 2019 (12 Apr Shift 2)",
    question: "The $\\text{C}-\\text{C}$ bond length is maximum in:",
    options: [
      "$\\text{C}_{60}$",
      "$\\text{C}_{70}$",
      "graphite",
      "diamond"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "In diamond, every carbon atom is $sp^3$ hybridized, giving pure single $\\text{C}-\\text{C}$ bonds of length $154\\text{ pm}$. In graphite and fullerenes ($\\text{C}_{60}, \\text{C}_{70}$), $sp^2$ hybridization with delocalized $\\pi$-electron density gives partial double bond character with shorter bond lengths ($141.5\\text{ pm}$ to $143\\text{ pm}$).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 36,
    exam: "JEE Main 2020 (09 Jan Shift 1)",
    question: "\"X\" melts at low temperature and is a bad conductor of electricity in both liquid and solid state. X is:",
    options: [
      "zinc sulphide",
      "mercury",
      "silicon carbide",
      "carbon tetrachloride"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Carbon tetrachloride ($\\text{CCl}_4$) is a non-polar covalent molecular solid that melts at $-23^\\circ\\text{C}$ and does not possess free ions or electrons to conduct electricity in either liquid or solid state.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 37,
    exam: "JEE Main 2020 (08 Jan Shift 2)",
    question: "The reaction of $\\text{H}_3\\text{N}_3\\text{B}_3\\text{Cl}_3$ (A) with $\\text{LiBH}_4$ in tetrahydrofuran gives inorganic benzene (B). Further, the reaction of (A) with (C) leads to $\\text{B}_3\\text{N}_3\\text{H}_3(\\text{Me})_3$. Compounds (B) and (C) respectively, are:",
    options: [
      "Borazine and MeBr",
      "Diborane and MeMgBr",
      "Boron nitride and MeBr",
      "Borazine and MeMgBr"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Reduction of B-trichloroborazine $\\text{B}_3\\text{N}_3\\text{H}_3\\text{Cl}_3$ (A) with $\\text{LiBH}_4$ yields borazine $\\text{B}_3\\text{N}_3\\text{H}_6$ (B), known as inorganic benzene. Alkylation of (A) with Grignard reagent $\\text{MeMgBr}$ (C) replaces the chlorine atoms on boron by methyl groups to yield $\\text{B}_3\\text{N}_3\\text{H}_3(\\text{Me})_3$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 38,
    exam: "JEE Main 2020 (02 Sep Shift 1)",
    question: "On heating compound (A) gives a gas (B) which is constituent of air. This gas when treated with $\\text{H}_2$ in the presence of a catalyst gives another gas (C) which is basic in nature. (A) should not be:",
    options: [
      "$\\text{NaN}_3$",
      "$\\text{Pb}(\\text{NO}_3)_2$",
      "$(\\text{NH}_4)_2\\text{Cr}_2\\text{O}_7$",
      "$\\text{NH}_4\\text{NO}_2$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Heating $\\text{NaN}_3$, $(\\text{NH}_4)_2\\text{Cr}_2\\text{O}_7$, or $\\text{NH}_4\\text{NO}_2$ produces $\\text{N}_2$ gas (constituent of air), which reacts with $\\text{H}_2$ (Haber's process) to form basic $\\text{NH}_3$ gas (C). However, heating lead nitrate $\\text{Pb}(\\text{NO}_3)_2$ produces nitrogen dioxide $\\text{NO}_2$ and $\\text{O}_2$, not $\\text{N}_2$.\n\nHence, the compound (A) should not be $\\text{Pb}(\\text{NO}_3)_2$ (B)."
  },
  {
    qNum: 39,
    exam: "JEE Main 2020 (04 Sep Shift 1)",
    question: "$\\text{Al}_2\\text{O}_3$ was leached with alkali to get X. The solution of X on passing of gas Y, forms Z. X, Y and Z respectively are:",
    options: [
      "$\\text{X} = \\text{Al}(\\text{OH})_3, \\text{Y} = \\text{CO}_2, \\text{Z} = \\text{Al}_2\\text{O}_3$",
      "$\\text{X} = \\text{Na}[\\text{Al}(\\text{OH})_4], \\text{Y} = \\text{SO}_2, \\text{Z} = \\text{Al}_2\\text{O}_3$",
      "$\\text{X} = \\text{Al}(\\text{OH})_3, \\text{Y} = \\text{SO}_2, \\text{Z} = \\text{Al}_2\\text{O}_3\\cdot x\\text{H}_2\\text{O}$",
      "$\\text{X} = \\text{Na}[\\text{Al}(\\text{OH})_4], \\text{Y} = \\text{CO}_2, \\text{Z} = \\text{Al}_2\\text{O}_3\\cdot x\\text{H}_2\\text{O}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["39"],
    solution_image_url: diagramUrls["39"],
    solution: "During Bayer's process:\n1. Leaching: $\\text{Al}_2\\text{O}_3 + 2\\text{NaOH} + 3\\text{H}_2\\text{O} \\rightarrow 2\\text{Na}[\\text{Al}(\\text{OH})_4]$ (X)\n2. Neutralisation: $2\\text{Na}[\\text{Al}(\\text{OH})_4] + \\text{CO}_2 \\rightarrow \\text{Al}_2\\text{O}_3\\cdot x\\text{H}_2\\text{O} (\\text{Z}) + 2\\text{NaHCO}_3$\nHence, $\\text{X} = \\text{Na}[\\text{Al}(\\text{OH})_4], \\text{Y} = \\text{CO}_2, \\text{Z} = \\text{Al}_2\\text{O}_3\\cdot x\\text{H}_2\\text{O}$ (D)."
  },
  {
    qNum: 40,
    exam: "JEE Main 2021 (25 Feb Shift 1)",
    question: "The incorrect statement about $\\text{B}_2\\text{H}_6$ is:",
    options: [
      "All $\\text{B}-\\text{H}-\\text{B}$ angles are of $120^\\circ$",
      "The two $\\text{B}-\\text{H}-\\text{B}$ bonds (bridged and terminal) are not of same length.",
      "Terminal $\\text{B}-\\text{H}$ bonds have less $p$ character when compared to bridging bonds.",
      "Its fragment, $\\text{BH}_3$, behaves as a Lewis acid."
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["40"],
    solution_image_url: diagramUrls["40"],
    solution: "The bridging $\\text{B}-\\text{H}-\\text{B}$ angle in diborane is approximately $83^\\circ$ to $97^\\circ$, not $120^\\circ$. The terminal $\\text{H}-\\text{B}-\\text{H}$ angle is about $120^\\circ$.\n\nHence, statement (A) is incorrect."
  },
  {
    qNum: 41,
    exam: "JEE Main 2021 (26 Feb Shift 1)",
    question: "Compound A used as a strong oxidizing agent is amphoteric in nature. It is the part of lead storage batteries. Compound A is:",
    options: [
      "$\\text{PbO}$",
      "$\\text{Pb}_3\\text{O}_4$",
      "$\\text{PbO}_2$",
      "$\\text{PbSO}_4$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Lead dioxide ($\\text{PbO}_2$) is an amphoteric oxide where lead is in the +4 oxidation state. Due to the inert pair effect, $\\text{Pb}^{4+}$ readily reduces to $\\text{Pb}^{2+}$, making $\\text{PbO}_2$ a powerful oxidizing agent. It serves as the cathode material in lead storage batteries.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 42,
    exam: "JEE Main 2021 (26 Feb Shift 2)",
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: In $\\text{TlI}_3$, isomorphous to $\\text{CsI}_3$, the metal is present in +1 oxidation state.\nReason R: $\\text{Tl}$ metal has fourteen $f$ electrons in its electronic configuration.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "A is correct but R is not correct",
      "Both A and R are correct and R is the correct explanation of A",
      "A is not correct but R is correct",
      "Both A and R are correct but R is NOT the correct explanation of A"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution_image_url: null,
    solution: "Assertion A is true: $\\text{TlI}_3$ exists as $\\text{Tl}^+\\text{I}_3^-$, where thallium is in the +1 oxidation state.\nReason R is true: Thallium ($Z=81$) has configuration $[\\text{Xe}]\\,4f^{14}5d^{10}6s^26p^1$, containing fourteen $4f$ electrons.\nHowever, the primary cause of the +1 state being more stable is the inert pair effect (poor shielding by $4f$ and $5d$ orbitals), so R alone does not explain A.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 43,
    exam: "JEE Main 2021 (16 Mar Shift 2)",
    question: "The INCORRECT statement regarding the structure of $\\text{C}_{60}$ is:",
    options: [
      "The six-membered rings are fused to both six and five-membered rings.",
      "Each carbon atom forms three sigma bonds.",
      "The five-membered rings are fused only to six-membered rings.",
      "It contains 12 six-membered rings and 24 five-membered rings."
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["43"],
    solution_image_url: diagramUrls["43"],
    solution: "Buckminsterfullerene ($\\text{C}_{60}$) contains exactly 20 six-membered rings and 12 five-membered rings. Therefore, statement (D) stating '12 six-membered rings and 24 five-membered rings' is incorrect.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 44,
    exam: "JEE Main 2021 (22 Jul Shift 1)",
    question: "Given below are the statements about diborane:\n(a) Diborane is prepared by the oxidation of $\\text{NaBH}_4$ with $\\text{I}_2$\n(b) Each boron atom is in $sp^2$ hybridized state\n(c) Diborane has one bridged 3 centre-2-electron bond\n(d) Diborane is a planar molecule\nThe option with correct statement(s) is:",
    options: [
      "(c) and (d) only",
      "(a) only",
      "(c) only",
      "(a) and (b) only"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["44"],
    solution_image_url: diagramUrls["44"],
    solution: "- (a) $2\\text{NaBH}_4 + \\text{I}_2 \\rightarrow \\text{B}_2\\text{H}_6 + 2\\text{NaI} + \\text{H}_2$ (Correct)\n- (b) Boron atoms in diborane are $sp^3$ hybridized, not $sp^2$ (Incorrect)\n- (c) Diborane has two $3c\\text{--}2e$ bridging bonds, not one (Incorrect)\n- (d) Diborane is a non-planar molecule (Incorrect)\nThus, only statement (a) is correct.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 45,
    exam: "JEE Main 2021 (25 Jul Shift 1)",
    question: "Which one of the following compounds of Group-14 elements is not known?",
    options: [
      "$[\\text{GeCl}_6]^{2-}$",
      "$[\\text{Sn}(\\text{OH})_6]^{2-}$",
      "$[\\text{SiCl}_6]^{2-}$",
      "$[\\text{SiF}_6]^{2-}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution_image_url: null,
    solution: "Due to the small size of the silicon atom, six large chlorine atoms experience severe steric hindrance around silicon. In addition, interaction between the lone pairs of chlorine and silicon is not effective. Hence $[\\text{SiCl}_6]^{2-}$ does not exist.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 46,
    exam: "JEE Main 2021 (26 Aug Shift 1)",
    question: "The ratio of number of water molecules in Mohr's salt and potash alum is $x \\times 10^{-1}$. (Integer answer)",
    options: [],
    correct_option: null,
    numeric_answer: 5,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution_image_url: null,
    solution: "Formula of Mohr's salt: $\\text{FeSO}_4\\cdot(\\text{NH}_4)_2\\text{SO}_4\\cdot 6\\text{H}_2\\text{O}$ (6 water molecules).\nFormula of potash alum per aluminium atom: $\\text{KAl}(\\text{SO}_4)_2\\cdot 12\\text{H}_2\\text{O}$ (12 water molecules).\n$$\\text{Ratio} = \\frac{6}{12} = 0.5 = 5 \\times 10^{-1}$$\nTherefore, the value of $x$ is 5."
  },
  {
    qNum: 47,
    exam: "JEE Main 2021 (27 Aug Shift 1)",
    question: "In which one of the following molecules strongest back donation of an electron pair from halide to boron is expected?",
    options: [
      "$\\text{BBr}_3$",
      "$\\text{BI}_3$",
      "$\\text{BCl}_3$",
      "$\\text{BF}_3$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["47"],
    solution_image_url: diagramUrls["47"],
    solution: "Back donation involves overlap between the filled $2p$ orbital of halogen and the vacant $2p$ orbital of boron. Because of similar size and maximum orbital overlap between $2p(\\text{B})$ and $2p(\\text{F})$, $2p\\pi-2p\\pi$ back donation is strongest in $\\text{BF}_3$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 48,
    exam: "JEE Main 2022 (24 Jun Shift 1)",
    question: "Identify the correct statement for $\\text{B}_2\\text{H}_6$ from those given below:\n(A) In $\\text{B}_2\\text{H}_6$, all $\\text{B}-\\text{H}$ bonds are equivalent.\n(B) In $\\text{B}_2\\text{H}_6$, there are four 3-centre-2-electron bonds.\n(C) $\\text{B}_2\\text{H}_6$ is a Lewis acid.\n(D) $\\text{B}_2\\text{H}_6$ can be synthesized from both $\\text{BF}_3$ and $\\text{NaBH}_4$.\n(E) $\\text{B}_2\\text{H}_6$ is a planar molecule.\nChoose the most appropriate answer from the options given below:",
    options: [
      "(A) and (E) only",
      "(B), (C) and (E) only",
      "(C) and (D) only",
      "(C) and (E) only"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["48"],
    solution_image_url: diagramUrls["48"],
    solution: "- (A) False: 4 terminal bonds and 2 bridge bonds are different in length.\n- (B) False: There are two $3c\\text{--}2e$ bonds and four $2c\\text{--}2e$ bonds.\n- (C) True: $\\text{B}_2\\text{H}_6$ is electron deficient and acts as a Lewis acid.\n- (D) True: $3\\text{NaBH}_4 + 4\\text{BF}_3 \\rightarrow 2\\text{B}_2\\text{H}_6 + 3\\text{NaBF}_4$.\n- (E) False: The bridging hydrogens lie above and below the plane of the terminal atoms (non-planar).\nThus, statements (C) and (D) are correct.\n\nHence, the correct option is (C)."
  }
];
