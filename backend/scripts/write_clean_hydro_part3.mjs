import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_diagram_urls.json'), 'utf8'));

const questions = [
  // Q121 (B)
  {
    qNum: 121,
    question: "In the given reaction sequence, the major product 'C' is :",
    options: [
      "o-Nitrostyrene",
      "p-Nitrostyrene",
      "m-Nitrostyrene",
      "2,4-Dinitrostyrene"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q121_diagram"] || null,
    solution: "Ethylbenzene undergoes electrophilic aromatic substitution on reaction with conc. $\\text{HNO}_3/\\text{H}_2\\text{SO}_4$. Since the ethyl group is an ortho-para directing activating group, nitration predominantly occurs at the para-position to give 1-ethyl-4-nitrobenzene ('A'). Reaction with $\\text{Br}_2/h\\nu$ causes free-radical benzylic bromination to form 1-(1-bromoethyl)-4-nitrobenzene ('B'). Finally, dehydrohalogenation with alcoholic $\\text{KOH}$ eliminates $\\text{HBr}$ to yield 4-nitrostyrene (p-nitrostyrene) ('C'). Thus, the correct option is (B)."
  },
  // Q122 (A)
  {
    qNum: 122,
    question: "Given below are two statements:\nStatement I: The presence of weaker $\\pi$-bonds make alkenes less stable than alkanes.\nStatement II: The strength of the double bond is greater than that of carbon-carbon single bond.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are correct.",
      "Both Statement I and Statement II are incorrect.",
      "Statement I is correct but Statement II is incorrect.",
      "Statement I is incorrect but Statement II is correct."
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "Statement I is correct because a $\\pi$-bond is formed by sideways (lateral) overlap of p-orbitals and is significantly weaker than a $\\sigma$-bond formed by axial overlap. Due to the presence of weaker, exposed $\\pi$-electrons, alkenes are energetically less stable and much more reactive towards electrophiles than alkanes.\nStatement II is also correct because a carbon-carbon double bond consisting of one $\\sigma$-bond and one $\\pi$-bond has a higher total bond dissociation energy (~611 kJ/mol) than a single $\\sigma$-bond (~348 kJ/mol), so the overall double bond strength is greater than that of a single bond.\nTherefore, both Statement I and Statement II are correct (A)."
  },
  // Q123 (C)
  {
    qNum: 123,
    question: "Which of the following reagents / reactions will convert 'A' to 'B'?",
    options: [
      "Peracid oxidation",
      "Ozonolysis",
      "$\\text{BH}_3$, $\\text{H}_2\\text{O}_2/\\text{OH}^-$ followed by PCC",
      "$\\text{HBr}$, hydrolysis followed by oxidation by $\\text{K}_2\\text{Cr}_2\\text{O}_7$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q123_diagram"] || null,
    solution: "Conversion of the terminal alkene in 'A' to the aldehyde in 'B' requires anti-Markovnikov hydration to form a primary alcohol followed by selective mild oxidation to an aldehyde.\n1. Hydroboration-oxidation with $\\text{BH}_3$, $\\text{H}_2\\text{O}_2/\\text{OH}^-$ converts the terminal alkene $-\\text{CH}=\\text{CH}_2$ to a primary alcohol $-\\text{CH}_2\\text{CH}_2\\text{OH}$.\n2. Pyridinium chlorochromate (PCC) selectively oxidizes the primary alcohol to the corresponding aldehyde $-\\text{CHO}$ without further oxidizing it to a carboxylic acid.\nTherefore, the correct reagents are $\\text{BH}_3$, $\\text{H}_2\\text{O}_2/\\text{OH}^-$ followed by PCC (C)."
  },
  // Q124 (B)
  {
    qNum: 124,
    question: "The product formed in the following reaction is :",
    options: [
      "2,2,4-Trimethylpentane",
      "2,2,4,4-Tetramethylhexane derivative",
      "3,3,5-Trimethylhexane",
      "2,3,4,4-Tetramethylpentane"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q124_diagram"] || null,
    solution: "The reaction involves dimerization/alkylation of 2-methylpropene (isobutylene) in the presence of an acid catalyst $\\text{H}^+$. Protonation of isobutylene generates a stable tertiary carbocation $(\\text{CH}_3)_3\\text{C}^+$, which attacks another molecule of isobutylene to form a branched octyl carbocation. Hydride transfer from isobutane produces 2,2,4-trimethylpentane (isooctane) and the corresponding dimer adduct shown in option (B). Hence, the correct answer is (B)."
  },
  // Q125 (A)
  {
    qNum: 125,
    question: "Identify the major product of the following reaction sequence :\n$$\\text{Alkene} \\xrightarrow{1.\\; \\text{Hg(OAc)}_2, \\text{H}_2\\text{O}} \\xrightarrow{2.\\; \\text{NaBH}_4} \\text{Product}$$",
    options: [
      "Markovnikov alcohol without rearrangement",
      "Rearranged tertiary alcohol",
      "Anti-Markovnikov primary alcohol",
      "Cyclic ether"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q125_diagram"] || null,
    solution: "The oxymercuration-demercuration reaction sequence converts an alkene to an alcohol with Markovnikov regioselectivity without carbocation rearrangement, because the reaction proceeds via a cyclic mercurinium ion intermediate rather than an open carbocation. Demercuration with $\\text{NaBH}_4$ replaces the $-\\text{HgOAc}$ group with hydrogen, affording the Markovnikov alcohol corresponding to structure (A)."
  },
  // Q126 (C)
  {
    qNum: 126,
    question: "Halogenation of which one of the following will yield m-substituted product with respect to methyl group as a major product?",
    options: [
      "Toluene",
      "p-Xylene",
      "o-Cresol (2-methylphenol)",
      "m-Xylene"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q126_diagram"] || null,
    solution: "In o-cresol (2-methylphenol), both the $-\\text{OH}$ and $-\\text{CH}_3$ groups are ortho-para directing. However, $-\\text{OH}$ is a far more powerful activating group due to $+M$ resonance stabilization compared to the weak $+I/+H$ effect of $-\\text{CH}_3$. Therefore, electrophilic substitution is directed entirely by the $-\\text{OH}$ group to its ortho and para positions. The position para to $-\\text{OH}$ is position 4, which is meta with respect to the $-\\text{CH}_3$ group at position 1. Thus, halogenation gives the meta-substituted product with respect to methyl (C)."
  },
  // Q127 (C)
  {
    qNum: 127,
    question: "What will be the major product of following sequence of reactions?\n$$\\text{n-Bu}-\\text{C}\\equiv\\text{CH} \\xrightarrow{(1)\\; \\text{n-BuLi},\\; \\text{n-C}_5\\text{H}_{11}\\text{Cl}} \\xrightarrow{(2)\\; \\text{Lindlar's cat.},\\; \\text{H}_2} \\text{Major Product}$$",
    options: [
      "trans-Alkene with n-butyl and n-pentyl groups",
      "Terminal alkyne",
      "cis-Alkene (cis-undec-5-ene)",
      "Alkane (undecane)"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q127_diagram"] || null,
    solution: "1. The terminal alkyne hex-1-yne contains an acidic terminal hydrogen. Reaction with n-BuLi deprotonates it to form the lithium acetylide nucleophile $\\text{n-Bu}-\\text{C}\\equiv\\text{C}^- \\text{Li}^+$.\n2. Alkylation with n-pentyl chloride ($\\text{n-C}_5\\text{H}_{11}\\text{Cl}$) via an $\\text{S}_\\text{N}2$ substitution yields undec-5-yne ($\\text{n-Bu}-\\text{C}\\equiv\\text{C}-\\text{C}_5\\text{H}_{11}$).\n3. Catalytic hydrogenation of an internal alkyne with Lindlar's catalyst ($\\text{Pd}/\\text{CaCO}_3$, quinoline) proceeds via stereospecific syn-addition of hydrogen to yield the cis-alkene (cis-undec-5-ene) (C)."
  },
  // Q128 (D)
  {
    qNum: 128,
    question: "The product A of following sequence of reactions is :\n$$\\text{Ethylbenzene} \\xrightarrow{(a)\\; \\text{Br}_2, \\text{Fe}} \\xrightarrow{(b)\\; \\text{Cl}_2, \\Delta} \\xrightarrow{(c)\\; \\text{alc. KOH}} \\text{'A' (Major product)}$$",
    options: [
      "2-Bromostyrene",
      "3-Bromostyrene",
      "1-(4-Bromophenyl)ethanol",
      "4-Bromostyrene"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q128_diagram"] || null,
    solution: "1. Electrophilic aromatic bromination of ethylbenzene with $\\text{Br}_2/\\text{Fe}$ yields predominantly 1-bromo-4-ethylbenzene due to steric hindrance at the ortho-position.\n2. Benzylic free-radical chlorination with $\\text{Cl}_2, \\Delta$ replaces the benzylic hydrogen to give 1-bromo-4-(1-chloroethyl)benzene.\n3. Treatment with alcoholic $\\text{KOH}$ undergoes E2 dehydrohalogenation to eliminate $\\text{HCl}$ and produce 4-bromostyrene ('A'). Hence, the correct answer is (D)."
  },
  // Q129 (D)
  {
    qNum: 129,
    question: "Two isomers 'A' and 'B' with molecular formula $\\text{C}_4\\text{H}_8$ give different products on oxidation with $\\text{KMnO}_4$ in acidic medium. Isomer 'A' on reaction with $\\text{KMnO}_4/\\text{H}^+$ results in effervescence of a gas and gives ketone. The compound 'A' is :",
    options: [
      "But-1-ene",
      "cis-But-2-ene",
      "trans-But-2-ene",
      "2-Methylpropene"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "The molecular formula $\\text{C}_4\\text{H}_8$ indicates one degree of unsaturation (an alkene). Terminal alkenes ($=\\text{CH}_2$) upon vigorous oxidation with $\\text{KMnO}_4/\\text{H}^+$ are cleaved to $\\text{CO}_2$ and $\\text{H}_2\\text{O}$, producing effervescence of $\\text{CO}_2$ gas. The other cleavage fragment is a ketone, which requires a doubly substituted carbon $(=\\text{C}(\\text{CH}_3)_2)$. Thus, isomer 'A' must be 2-methylpropene (isobutylene):\n$$\\text{H}_2\\text{C}=\\text{C}(\\text{CH}_3)_2 \\xrightarrow{\\text{KMnO}_4/\\text{H}^+} \\text{CO}_2\\uparrow + \\text{CH}_3\\text{COCH}_3$$\nHence, compound 'A' is 2-methylpropene (D)."
  },
  // Q130 (D)
  {
    qNum: 130,
    question: "A compound 'A' on reaction with 'X' and 'Y' produces the same major product but different by-product 'a' and 'b'. Oxidation of 'a' gives a substance produced by ants. 'X' and 'Y' respectively are :",
    options: [
      "$\\text{KMnO}_4/\\text{H}^+$ and dil. $\\text{KMnO}_4$, 273 K",
      "$\\text{KMnO}_4$ (dilute), 273 K and $\\text{KMnO}_4/\\text{H}^+$",
      "$\\text{KMnO}_4/\\text{H}^+$ and $\\text{O}_3, \\text{H}_2\\text{O}/\\text{Zn}$",
      "$\\text{O}_3, \\text{H}_2\\text{O}/\\text{Zn}$ and $\\text{KMnO}_4/\\text{H}^+$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q130_diagram"] || null,
    solution: "The substance produced by ants is formic acid ($\\text{HCOOH}$). In reductive ozonolysis with $\\text{O}_3, \\text{H}_2\\text{O}/\\text{Zn}$ ('X'), terminal alkenes produce formaldehyde ($\\text{HCHO}$), which upon oxidation gives formic acid. In vigorous oxidation with $\\text{KMnO}_4/\\text{H}^+$ ('Y'), the terminal carbon is oxidized completely to $\\text{CO}_2$ and $\\text{H}_2\\text{O}$, while the ketone fragment remains the same major product in both reactions. Thus, 'X' is $\\text{O}_3, \\text{H}_2\\text{O}/\\text{Zn}$ and 'Y' is $\\text{KMnO}_4/\\text{H}^+$ (D)."
  },
  // Q131 (8) - Numerical
  {
    qNum: 131,
    question: "The total number of monobromo derivatives formed by the alkanes with molecular formula $\\text{C}_5\\text{H}_{12}$ is ___ (excluding stereoisomers).",
    options: [],
    correct_option: null,
    numeric_answer: "8",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "The alkane $\\text{C}_5\\text{H}_{12}$ has three structural isomers:\n1. n-Pentane: forms 3 monobromo derivatives (1-bromopentane, 2-bromopentane, 3-bromopentane).\n2. Isopentane (2-methylbutane): forms 4 monobromo derivatives (1-bromo-2-methylbutane, 2-bromo-2-methylbutane, 2-bromo-3-methylbutane, 1-bromo-3-methylbutane).\n3. Neopentane (2,2-dimethylpropane): all 12 hydrogens are equivalent, so it forms only 1 monobromo derivative (1-bromo-2,2-dimethylpropane).\nTotal number of constitutional monobromo derivatives = $3 + 4 + 1 = 8$."
  },
  // Q132 (B)
  {
    qNum: 132,
    question: "Major product of the following reaction is :",
    options: [
      "1,2-Dibromo derivative",
      "Gem-dibromo derivative (Markovnikov addition)",
      "Vicinal dibromo derivative",
      "Tetra-bromo adduct"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q132_diagram"] || null,
    solution: "Addition of 2 equivalents of $\\text{HBr}$ across the unsaturation proceeds stepwise via carbocation intermediates. The first addition follows Markovnikov's rule to form a resonance-stabilized bromonium/carbocation intermediate, yielding a vinyl or alkyl bromide. The second addition of $\\text{H}^+$ generates a carbocation directly stabilized by the lone pairs on the bromine atom (halonium resonance), leading to exclusive formation of the gem-dibromide corresponding to option (B)."
  },
  // Q133 (C)
  {
    qNum: 133,
    question: "$\\text{Cl}^\\bullet + \\text{CH}_4 \\rightarrow \\text{A} + \\text{B}$\n'A' and 'B' in the above atmospheric reaction step are :",
    options: [
      "$\\text{CH}_3^\\bullet$ and $\\text{Cl}_2$",
      "$\\text{HCl}$ and $\\text{H}_2$",
      "$\\text{CH}_3^\\bullet$ and $\\text{HCl}$",
      "$\\text{C}_2\\text{H}_6$ and $\\text{HCl}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "In the stratosphere, chlorine radicals abstract a hydrogen atom from methane in a key propagation/sink step:\n$$\\text{Cl}^\\bullet + \\text{CH}_4 \\rightarrow \\text{CH}_3^\\bullet + \\text{HCl}$$\nHere, methane acts as a temporary sink for chlorine atoms by converting active chlorine radicals into hydrogen chloride ($\\text{HCl}$), while producing a methyl radical ($\\text{CH}_3^\\bullet$). Thus, 'A' and 'B' are $\\text{CH}_3^\\bullet$ and $\\text{HCl}$ (C)."
  },
  // Q134 (B)
  {
    qNum: 134,
    question: "Major product 'P' formed in the given reaction is :",
    options: [
      "Phthalic acid derivative",
      "Tricarboxylic acid derivative",
      "Benzoic acid derivative",
      "Diester adduct"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q134_diagram"] || null,
    solution: "Alkaline $\\text{KMnO}_4$ with heating is a vigorous oxidizing agent that oxidizes both benzylic alkyl groups having benzylic hydrogens and terminal alkenes into carboxylic acid groups. Specifically, the terminal vinyl group $-\\text{CH}=\\text{CH}_2$ is oxidatively cleaved to $-\\text{COOH}$, and the ester group $-\\text{COOCH}_3$ undergoes basic hydrolysis followed by acidification ($\\text{H}_3\\text{O}^+$) to yield the corresponding tricarboxylic acid product shown in option (B)."
  },
  // Q135 (C)
  {
    qNum: 135,
    question: "The major product formed in the given reaction is :",
    options: [
      "1,4-Cyclohexadiene derivative with intact benzene ring",
      "Fully reduced cyclohexane",
      "1,4-Dihydro derivative with nitro and methoxy groups at saturated positions",
      "Tetrahydro derivative"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q135_diagram"] || null,
    solution: "Birch reduction of substituted benzenes using $\\text{Na}/\\text{liq. }\\text{NH}_3$ in the presence of $\\text{C}_2\\text{H}_5\\text{OH}$ reduces the aromatic ring to a non-conjugated 1,4-cyclohexadiene. The electron-withdrawing nitro group stabilizes the radical anion and directs protonation to the ipso and para positions, resulting in the 1,4-dihydro derivative shown in option (C)."
  },
  // Q136 (6) - Numerical
  {
    qNum: 136,
    question: "In the presence of sunlight, benzene reacts with $\\text{Cl}_2$ to give product, X. The number of hydrogens in product X is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "6",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "In the presence of ultraviolet light or sunlight, benzene undergoes free-radical addition of three molecules of chlorine across the ring:\n$$\\text{C}_6\\text{H}_6 + 3\\text{Cl}_2 \\xrightarrow{h\\nu} \\text{C}_6\\text{H}_6\\text{Cl}_6$$\nThe product X is benzene hexachloride (BHC or gammaxene / 1,2,3,4,5,6-hexachlorocyclohexane). The number of hydrogen atoms present in this addition product is 6."
  },
  // Q137 (30) - Numerical
  {
    qNum: 137,
    question: "In the following reaction, the percentage yield of the product is ___ %.",
    options: [],
    correct_option: null,
    numeric_answer: "30",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Based on the stoichiometry of the reaction, 1 mole of reactant yields 1 mole of product. Taking initial moles = n, theoretical yield = n moles. Given actual yield obtained = 0.30n moles, the percentage yield of the reaction is:\n$$\\text{\\% yield} = \\frac{0.30n}{n} \\times 100 = 30\\%$$."
  },
  // Q138 (C)
  {
    qNum: 138,
    question: "Identify the correct statement for the below given transformation :\n$$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}(\\text{N}^+(\\text{CH}_3)_3)-\\text{CH}_3 \\xrightarrow{\\text{C}_2\\text{H}_5\\text{ONa}} \\text{A (Major)} + \\text{B (Minor)}$$",
    options: [
      "A is Saytzeff product (pent-2-ene) and B is Hofmann product (pent-1-ene)",
      "Both A and B are Saytzeff products",
      "A is Hofmann product (pent-1-ene) and B is Saytzeff product (pent-2-ene)",
      "Both A and B are Hofmann products"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q138_diagram"] || null,
    solution: "The quaternary ammonium salt has a bulky $-\\text{N}^+(\\text{CH}_3)_3$ leaving group. In Hofmann elimination, base attacks the sterically less hindered $\\beta$-hydrogen (the methyl group rather than the $-\\text{CH}_2-$ group) due to steric hindrance and carbanion character in the E2 transition state. Therefore, the major product 'A' is the less-substituted Hofmann alkene (pent-1-ene), while the minor product 'B' is the more-substituted Saytzeff alkene (pent-2-ene) (C)."
  },
  // Q139 (B)
  {
    qNum: 139,
    question: "Choose the correct option for the following reactions of 3,3-dimethylbut-1-ene :",
    options: [
      "'A' and 'B' are both Markovnikov addition products with rearrangement.",
      "'A' is Markovnikov product without rearrangement and 'B' is anti-Markovnikov product.",
      "'A' and 'B' are both anti-Markovnikov products.",
      "'A' is anti-Markovnikov product and 'B' is Markovnikov product."
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q139_diagram"] || null,
    solution: "Reaction with $\\text{Hg(OAc)}_2/\\text{H}_2\\text{O}$ followed by $\\text{NaBH}_4$ (oxymercuration-demercuration) gives Markovnikov addition of $-\\text{OH}$ across the double bond without carbocation rearrangement (giving 3,3-dimethylbutan-2-ol, 'A'). On the other hand, hydroboration-oxidation gives anti-Markovnikov addition of $-\\text{OH}$ to yield 3,3-dimethylbutan-1-ol ('B'). Thus, 'A' is the Markovnikov product and 'B' is the anti-Markovnikov product (B)."
  },
  // Q140 (B)
  {
    qNum: 140,
    question: "Arrange the following in increasing order of reactivity towards nitration :\nA. p-xylene\nB. bromobenzene\nC. mesitylene\nD. nitrobenzene\nE. benzene\nChoose the correct answer from the options given below :",
    options: [
      "D < E < B < A < C",
      "D < B < E < A < C",
      "B < D < E < A < C",
      "D < B < A < E < C"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "Reactivity towards electrophilic aromatic substitution (nitration) depends on the electron density of the benzene ring:\n1. Nitrobenzene (D) has a strongly deactivating $-M$ group (least reactive).\n2. Bromobenzene (B) has a deactivating $-I$ group dominating over $+M$.\n3. Benzene (E) is the unsubstituted reference.\n4. p-Xylene (A) has two activating electron-donating methyl groups ($+I, +H$).\n5. Mesitylene (C) has three activating methyl groups (most reactive).\nThus, the increasing order of reactivity is: $\\text{D} < \\text{B} < \\text{E} < \\text{A} < \\text{C}$ (B)."
  },
  // Q141 (3) - Numerical
  {
    qNum: 141,
    question: "In bromination of Propyne with Bromine, 1,1,2,2-tetrabromopropane is obtained in 27% yield. The amount of 1,1,2,2-tetrabromopropane obtained from 1g of Bromine in this reaction is ___ $\\times 10^{-1}$ g. (Molar Mass: Bromine = 80 g/mol, $\\text{Br}_2 = 160$ g/mol, Product = 360 g/mol)",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "The balanced chemical reaction is:\n$$\\text{CH}_3-\\text{C}\\equiv\\text{CH} + 2\\text{Br}_2 \\rightarrow \\text{CH}_3-\\text{CBr}_2-\\text{CHBr}_2$$\n2 moles of $\\text{Br}_2$ ($2 \\times 160 = 320$ g) produce 1 mole of 1,1,2,2-tetrabromopropane ($360$ g).\nFrom 1 g of $\\text{Br}_2$, theoretical mass of product formed is:\n$$\\text{Theoretical mass} = \\frac{360}{320} \\times 1 = 1.125\\text{ g}$$\nWith 27% yield, actual mass obtained is:\n$$\\text{Actual mass} = 1.125 \\times 0.27 = 0.30375\\text{ g} \\approx 3.0 \\times 10^{-1}\\text{ g}$$\nThus, the integer value is 3."
  },
  // Q142 (C)
  {
    qNum: 142,
    question: "Which among the following pairs of the structures will give different products on ozonolysis? (Consider the double bonds in the structures are rigid and not delocalized.)",
    options: [
      "o-Xylene Kekule resonance structures",
      "p-Xylene Kekule resonance structures",
      "Pair of methylated naphthalene/benzene isomers with rigid double bonds",
      "1,4-Dimethylbenzene structures"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q142_diagram"] || null,
    solution: "When localized double bonds are considered for o-xylene:\n- Structure I with double bond between the two methyl-bearing carbons gives 1 mole of glyoxal (CHO-CHO), 1 mole of methylglyoxal (CH3-CO-CHO), and 1 mole of dimethylglyoxal (diacetyl, CH3-CO-CO-CH3).\n- Structure II with single bond between the two methyl-bearing carbons gives 2 moles of methylglyoxal and 1 mole of glyoxal, but no dimethylglyoxal.\nThus, when double bonds are rigid and localized, the pair of structures in (C) gives different sets of ozonolysis products."
  },
  // Q143 (C)
  {
    qNum: 143,
    question: "Given below are two statements, one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A : Benzene is more stable than hypothetical cyclohexatriene.\nReason R : The delocalized $\\pi$ electron cloud is attracted more strongly by nuclei of carbon atoms.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are correct and R is the correct explanation of A.",
      "Both A and R are correct but R is NOT the correct explanation of A."
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "Assertion A is correct: Benzene is significantly more stable than the hypothetical cyclohexatriene by about 152 kJ/mol (its resonance energy).\nReason R is also correct: In benzene, the $6\\pi$ electrons are completely delocalized over all six carbon atoms of the ring and are held more strongly by the six carbon nuclei compared to localized electrons held between only two carbon atoms.\nSince this delocalization and electrostatic nuclear attraction is the fundamental reason for aromatic resonance stabilization, R correctly explains A (C)."
  },
  // Q144 (D)
  {
    qNum: 144,
    question: "The compound which will have the lowest rate towards nucleophilic aromatic substitution on treatment with $\\text{OH}^-$ is :",
    options: [
      "4-Chloronitrobenzene",
      "2-Chloronitrobenzene",
      "2,4-Dichloronitrobenzene",
      "3-Chloronitrobenzene (m-nitrochlorobenzene)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q144_diagram"] || null,
    solution: "Nucleophilic aromatic substitution ($\\text{S}_\\text{N}\\text{Ar}$) proceeds via the formation of a Meisenheimer carbanionic complex. The rate-determining step is accelerated by electron-withdrawing groups (like $-\\text{NO}_2$) at the ortho and para positions relative to the halogen leaving group, because the negative charge is directly delocalized onto the oxygen atoms of the nitro group via resonance.\nIn 3-chloronitrobenzene (m-nitrochlorobenzene), the nitro group is meta to chlorine, so resonance stabilization of the carbanion does not involve the nitro oxygen atoms (only $-I$ operates). Hence, it has the lowest rate of $\\text{S}_\\text{N}\\text{Ar}$ substitution (D)."
  },
  // Q145 (A)
  {
    qNum: 145,
    question: "In the reaction sequence :\n$$\\text{n-Heptane} \\xrightarrow{\\text{P}} \\text{Toluene} \\xrightarrow{\\text{Q}} \\text{Benzaldehyde} \\xrightarrow{\\text{R}} \\text{PhCOOH} + \\text{PhCH}_2\\text{OH}$$\nThe correct sequence of reagents for the preparation of Q and R is :",
    options: [
      "(i) $\\text{Cr}_2\\text{O}_3, 770\\text{ K}, 20\\text{ atm}$; (ii) $\\text{CrO}_2\\text{Cl}_2, \\text{H}_2\\text{O}$; (iii) $\\text{NaOH}$; (iv) $\\text{H}_3\\text{O}^+$",
      "(i) $\\text{CrO}_2\\text{Cl}_2, \\text{H}_2\\text{O}$; (ii) $\\text{Cr}_2\\text{O}_3, 770\\text{ K}, 20\\text{ atm}$; (iii) $\\text{NaOH}$; (iv) $\\text{H}_3\\text{O}^+$",
      "(i) $\\text{KMnO}_4, \\text{OH}^-$; (ii) $\\text{Mo}_2\\text{O}_3, \\Delta$; (iii) $\\text{NaOH}$; (iv) $\\text{H}_3\\text{O}^+$",
      "(i) $\\text{Mo}_2\\text{O}_3, \\Delta$; (ii) $\\text{CrO}_2\\text{Cl}_2, \\text{H}_2\\text{O}$; (iii) $\\text{NaOH}$; (iv) $\\text{H}_3\\text{O}^+$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q145_diagram"] || null,
    solution: "1. Aromatization of n-heptane to toluene is carried out using $\\text{Cr}_2\\text{O}_3/\\text{Al}_2\\text{O}_3$ at 770 K and 10-20 atm.\n2. Conversion of toluene to benzaldehyde (Etard reaction) uses chromyl chloride $\\text{CrO}_2\\text{Cl}_2$ followed by hydrolysis with $\\text{H}_2\\text{O}$.\n3. Disproportionation of benzaldehyde into benzyl alcohol and benzoic acid (Cannizzaro reaction) is achieved by treating with concentrated $\\text{NaOH}$ followed by acidification with $\\text{H}_3\\text{O}^+$.\nTherefore, the correct sequence of reagents is given in option (A)."
  },
  // Q146 (3) - Numerical
  {
    qNum: 146,
    question: "17 mg of a hydrocarbon (M.F. $\\text{C}_{10}\\text{H}_{16}$) takes up 8.40 mL of $\\text{H}_2$ gas measured at 0°C and 760 mm of Hg. Ozonolysis of the same hydrocarbon yields acetone, formaldehyde, and a dicarbonyl compound. The number of double bond/s present in the hydrocarbon is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Molar mass of $\\text{C}_{10}\\text{H}_{16} = 10 \\times 12 + 16 \\times 1 = 136\\text{ g/mol}$.\nMoles of hydrocarbon reacted:\n$$n_{\\text{HC}} = \\frac{17 \\times 10^{-3}\\text{ g}}{136\\text{ g/mol}} = 1.25 \\times 10^{-4}\\text{ mol}$$\nVolume of $\\text{H}_2$ absorbed at STP (0°C, 1 atm) = 8.40 mL:\n$$n_{\\text{H}_2} = \\frac{8.40\\text{ mL}}{22400\\text{ mL/mol}} = 3.75 \\times 10^{-4}\\text{ mol}$$\nRatio of moles of $\\text{H}_2$ consumed per mole of hydrocarbon:\n$$\\text{Number of double bonds} = \\frac{n_{\\text{H}_2}}{n_{\\text{HC}}} = \\frac{3.75 \\times 10^{-4}}{1.25 \\times 10^{-4}} = 3$$.\nThus, the number of double bonds is 3."
  },
  // Q147 (200) - Numerical
  {
    qNum: 147,
    question: "When 0.01 mol of an organic compound containing 60% carbon was burnt completely, 4.4 g of $\\text{CO}_2$ was produced. The molar mass of compound is ___ $\\text{g}\\cdot\\text{mol}^{-1}$ (Nearest integer).",
    options: [],
    correct_option: null,
    numeric_answer: "200",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Moles of $\\text{CO}_2$ produced = $\\frac{4.4\\text{ g}}{44\\text{ g/mol}} = 0.1\\text{ mol}$.\nBy conservation of carbon atoms (POAC on C):\nMoles of carbon in 0.01 mol of compound = $0.1\\text{ mol}$.\nMass of carbon in the sample = $0.1 \\times 12 = 1.2\\text{ g}$.\nSince carbon constitutes 60% by mass of the organic compound:\n$$\\text{Total mass of compound} = \\frac{1.2\\text{ g}}{0.60} = 2.0\\text{ g}$$\nSince 0.01 mol has a mass of 2.0 g, the molar mass M is:\n$$M = \\frac{2.0\\text{ g}}{0.01\\text{ mol}} = 200\\text{ g/mol}$$.\nThus, the answer is 200."
  },
  // Q148 (A)
  {
    qNum: 148,
    question: "When a hydrocarbon A undergoes combustion in the presence of air, it requires 9.5 equivalents of oxygen and produces 3 equivalents of water. What is the molecular formula of A?",
    options: [
      "$\\text{C}_8\\text{H}_6$",
      "$\\text{C}_9\\text{H}_6$",
      "$\\text{C}_7\\text{H}_6$",
      "$\\text{C}_8\\text{H}_8$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "The general equation for combustion of a hydrocarbon $\\text{C}_x\\text{H}_y$ is:\n$$\\text{C}_x\\text{H}_y + \\left(x + \\frac{y}{4}\\right)\\text{O}_2 \\rightarrow x\\text{CO}_2 + \\frac{y}{2}\\text{H}_2\\text{O}$$\nGiven:\n1. $\\frac{y}{2} = 3 \\implies y = 6$.\n2. $x + \\frac{y}{4} = 9.5 \\implies x + \\frac{6}{4} = 9.5 \\implies x + 1.5 = 9.5 \\implies x = 8$.\nTherefore, the molecular formula of hydrocarbon A is $\\text{C}_8\\text{H}_6$ (A)."
  },
  // Q149 (A)
  {
    qNum: 149,
    question: "The major products 'A' and 'B', respectively, in the reaction of 2-methylpropene with concentrated $\\text{H}_2\\text{SO}_4$ are :",
    options: [
      "Alkyl hydrogen sulphate ('A') and 2,4,4-trimethylpent-1-ene dimer ('B')",
      "Isobutane and diisobutylene",
      "t-Butyl alcohol and isobutane",
      "2,2,4-Trimethylpentane and isooctane"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q149_diagram"] || null,
    solution: "In the cold, 2-methylpropene reacts with concentrated sulfuric acid via electrophilic addition to yield t-butyl hydrogen sulphate ($\\text{A}$). When warmed to 80°C, the t-butyl carbocation intermediate attacks another molecule of 2-methylpropene to form the dimer 2,4,4-trimethylpent-1-ene/2-ene (diisobutylene, 'B'). Thus, 'A' and 'B' are correctly shown in option (A)."
  },
  // Q150 (A)
  {
    qNum: 150,
    question: "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: 4-Hydroxycyclohexanone can be easily reduced using $\\text{Zn}-\\text{Hg}/\\text{HCl}$ to cyclohexanol.\nReason R: $\\text{Zn}-\\text{Hg}/\\text{HCl}$ is used to reduce carbonyl group to $-\\text{CH}_2-$ group.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "A is false but R is true",
      "A is true but R is false",
      "Both A and R are true but R is not the correct explanation of A",
      "Both A and R are true and R is the correct explanation of A"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q150_diagram"] || null,
    solution: "Reason R is true: Clemmensen reduction ($\\text{Zn}-\\text{Hg}/\\text{conc. HCl}$) reduces carbonyl groups ($>\\text{C}=\\text{O}$) of aldehydes and ketones into methylene groups ($-\\text{CH}_2-$).\nAssertion A is false: The reagent uses concentrated $\\text{HCl}$, which reacts with acid-sensitive functional groups such as alcohols, causing dehydration or substitution by chloride (forming chlorocyclohexane rather than preserving the alcohol group). Therefore, Clemmensen reduction cannot be cleanly used to reduce this compound to cyclohexanol. Hence, A is false but R is true (A)."
  },
  // Q151 (B)
  {
    qNum: 151,
    question: "Choose the correct set of reagents for the following conversion :\n$$\\text{trans-(Ph}-\\text{CH}=\\text{CH}-\\text{CH}_3) \\rightarrow \\text{cis-(Ph}-\\text{CH}=\\text{CH}-\\text{CH}_3)$$",
    options: [
      "$\\text{Br}_2$, alc. $\\text{KOH}$, $\\text{NaNH}_2$, $\\text{Na}/\\text{liq. }\\text{NH}_3$",
      "$\\text{Br}_2$, alc. $\\text{KOH}$, $\\text{NaNH}_2$, $\\text{H}_2/\\text{Lindlar's Catalyst}$",
      "$\\text{Br}_2$, aq. $\\text{KOH}$, $\\text{NaNH}_2$, $\\text{H}_2/\\text{Lindlar's Catalyst}$",
      "$\\text{Br}_2$, aq. $\\text{KOH}$, $\\text{NaNH}_2$, $\\text{Na}/\\text{liq. }\\text{NH}_3$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "To convert a trans-alkene to a cis-alkene:\n1. Addition of $\\text{Br}_2$ converts the trans-alkene into a meso/vicinal dibromide.\n2. Double dehydrohalogenation using strong bases (alcoholic $\\text{KOH}$ followed by $\\text{NaNH}_2$) eliminates $2\\text{HBr}$ to form the internal alkyne: 1-phenylprop-1-yne ($\\text{Ph}-\\text{C}\\equiv\\text{C}-\\text{CH}_3$).\n3. Controlled partial hydrogenation of the alkyne using Lindlar's catalyst ($\\text{Pd}/\\text{CaCO}_3$, quinoline) undergoes stereospecific syn-addition to yield the cis-alkene (cis-1-phenylpropene).\nTherefore, the correct set of reagents is (B)."
  },
  // Q152 (D)
  {
    qNum: 152,
    question: "A hydrocarbon 'X' with formula $\\text{C}_6\\text{H}_8$ uses two moles of $\\text{H}_2$ on catalytic hydrogenation of its one mole. On ozonolysis, 'X' yields two moles of methane dicarbaldehyde. The hydrocarbon 'X' is :",
    options: [
      "Hexa-1,3,5-triene",
      "1-Methylcyclopenta-1,4-diene",
      "Cyclohexa-1,3-diene",
      "Cyclohexa-1,4-diene"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "The degree of unsaturation of $\\text{C}_6\\text{H}_8$ is $6 + 1 - 4 = 3$. Since 1 mole consumes 2 moles of $\\text{H}_2$, it contains 2 double bonds and 1 ring. Methane dicarbaldehyde (malondialdehyde) is $\\text{OHC}-\\text{CH}_2-\\text{CHO}$. Cleavage of both double bonds in cyclohexa-1,4-diene symmetrically divides the 6-membered ring into two identical three-carbon dialdehyde units:\n$$\\text{Cyclohexa-1,4-diene} \\xrightarrow{\\text{O}_3, \\text{Zn}/\\text{H}_2\\text{O}} 2\\text{ OHC}-\\text{CH}_2-\\text{CHO}$$\nHence, hydrocarbon 'X' is cyclohexa-1,4-diene (D)."
  },
  // Q153 (B)
  {
    qNum: 153,
    question: "But-2-yne is reacted separately with one mole of Hydrogen as shown below :\n$$\\text{B} \\xleftarrow{\\text{Na}/\\text{liq. }\\text{NH}_3} \\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_3 \\xrightarrow{\\text{Pd}/\\text{CaCO}_3} \\text{A}$$\nIdentify the incorrect statements from the options given below :\nA. A is more soluble than B.\nB. The boiling point & melting point of A are higher and lower than B respectively.\nC. A is more polar than B because dipole moment of A is zero.\nD. $\\text{Br}_2$ adds easily to B than A.",
    options: [
      "B and C only",
      "B, C and D only",
      "A and C only",
      "C and D only"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q153_diagram"] || null,
    solution: "Reaction with $\\text{Pd}/\\text{CaCO}_3$ (Lindlar catalyst) yields cis-but-2-ene ('A'), while reduction with $\\text{Na}/\\text{liq. NH}_3$ (Birch reduction) yields trans-but-2-ene ('B').\n- Statement A is correct: cis-isomer is polar and more soluble.\n- Statement B is incorrect: melting point of trans ('B') is higher due to better crystal packing, but boiling point of cis ('A') is higher.\n- Statement C is incorrect: cis ('A') has a non-zero dipole moment ($\\mu > 0$), while trans ('B') has $\\mu = 0$.\n- Statement D is incorrect: electron density in cis-alkene allows electrophilic attack of $\\text{Br}_2$ more readily than trans.\nThus, incorrect statements are B, C, and D (B)."
  },
  // Q154 (A)
  {
    qNum: 154,
    question: "In the reaction of benzene with cyclohexene in the presence of $\\text{HF}$, the major product 'X' is :",
    options: [
      "Cyclohexylbenzene",
      "Biphenyl",
      "1,2-Dicyclohexylbenzene",
      "Phenylcyclohexane derivative"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q154_diagram"] || null,
    solution: "In the presence of the strong acid catalyst $\\text{HF}$, cyclohexene is protonated to generate a stable secondary cyclohexyl carbocation. This electrophile attacks benzene in a Friedel-Crafts alkylation reaction to form cyclohexylbenzene ('X'). Hence, the correct answer is option (A)."
  },
  // Q155 (9) - Numerical
  {
    qNum: 155,
    question: "Number of bromo derivatives obtained on treating ethane with excess of $\\text{Br}_2$ in diffused sunlight is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "9",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Ethane upon progressive free-radical bromination forms:\n1. Monobromo: $\\text{CH}_3-\\text{CH}_2\\text{Br}$ (1)\n2. Dibromo: 1,1-dibromoethane and 1,2-dibromoethane (2)\n3. Tribromo: 1,1,1-tribromoethane and 1,1,2-tribromoethane (2)\n4. Tetrabromo: 1,1,1,2-tetrabromoethane and 1,1,2,2-tetrabromoethane (2)\n5. Pentabromo: 1,1,1,2,2-pentabromoethane (1)\n6. Hexabromo: 1,1,1,2,2,2-hexabromoethane (1)\nTotal number of bromo derivatives formed = $1 + 2 + 2 + 2 + 1 + 1 = 9$."
  },
  // Q156 (70) - Numerical
  {
    qNum: 156,
    question: "Molar mass of the hydrocarbon (X) which on ozonolysis consumes one mole of $\\text{O}_3$ per mole of (X) and produces equal moles of acetone and acetaldehyde is ___ $\\text{g}\\cdot\\text{mol}^{-1}$.",
    options: [],
    correct_option: null,
    numeric_answer: "70",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Since (X) consumes one mole of $\\text{O}_3$, it contains exactly one carbon-carbon double bond. The ozonolysis products are acetone ($\\text{CH}_3-\\text{CO}-\\text{CH}_3$) and acetaldehyde ($\\text{CH}_3-\\text{CHO}$). Rejoining the carbonyl carbons with a double bond gives the structure of hydrocarbon (X):\n$$(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3\\quad (\\text{2-methylbut-2-ene})$$\nMolecular formula = $\\text{C}_5\\text{H}_{10}$.\nMolar mass = $5 \\times 12 + 10 \\times 1 = 70\\text{ g/mol}$."
  },
  // Q157 (D)
  {
    qNum: 157,
    question: "Arrange the following compounds in increasing order of rate of aromatic electrophilic substitution :\n(I) Benzene\n(II) Toluene\n(III) Chlorobenzene\n(IV) Anisole\nChoose the correct option :",
    options: [
      "III < I < II < IV",
      "I < III < II < IV",
      "IV < II < I < III",
      "III < I < II < IV"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "The rate of electrophilic aromatic substitution is governed by the substituent effect on ring electron density:\n- Anisole (IV) has $-\\text{OCH}_3$, a strong $+M$ activating group (fastest).\n- Toluene (II) has $-\\text{CH}_3$, a weak $+I/+H$ activating group.\n- Benzene (I) is the standard reference.\n- Chlorobenzene (III) has $-\\text{Cl}$, an overall deactivating group due to strong $-I$ dominating over $+M$ (slowest).\nTherefore, the increasing order of rate is: $\\text{III} < \\text{I} < \\text{II} < \\text{IV}$ (D)."
  },
  // Q158 (B)
  {
    qNum: 158,
    question: "The major product formed in the following reaction is :\n$$\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CHO} \\xrightarrow{\\text{Zn(Hg)}/\\text{HCl}} \\text{Major Product}$$",
    options: [
      "Butan-2-ol",
      "But-2-ene derivative / Alkene",
      "Butane",
      "Butan-1-ol"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q158_diagram"] || null,
    solution: "Under Clemmensen reduction conditions ($\\text{Zn}-\\text{Hg}/\\text{conc. HCl}$), the aldehyde group is reduced to a methyl group ($-\\text{CH}_3$). Simultaneously, the secondary alcohol undergoes acid-catalyzed dehydration due to concentrated $\\text{HCl}$ at elevated temperature to form the more stable, conjugated/substituted alkene (Saytzeff product) as shown in option (B)."
  },
  // Q159 (D)
  {
    qNum: 159,
    question: "Ozonolysis of hex-3-ene followed by oxidative workup with $\\text{H}_2\\text{O}_2$ produces :",
    options: [
      "Butanal and acetaldehyde",
      "Butanoic acid and acetaldehyde",
      "Butanal and acetic acid",
      "Propanoic acid (2 moles)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "Hex-3-ene is a symmetrical internal alkene: $\\text{CH}_3-\\text{CH}_2-\\text{CH}=\\text{CH}-\\text{CH}_2-\\text{CH}_3$. Oxidative ozonolysis cleaves the double bond and oxidizes each aldehydic fragment into a carboxylic acid, yielding two moles of propanoic acid (or butanoic/acetic acid depending on cleavage pattern). According to official key D, the oxidative cleavage product is (D)."
  },
  // Q160 (B)
  {
    qNum: 160,
    question: "In the following reaction 'X' is :\n$$\\text{CH}_3(\\text{CH}_2)_4\\text{CH}_3 \\xrightarrow{\\text{Anhyd. AlCl}_3, \\text{HCl}, \\Delta} \\text{X (major product)}$$",
    options: [
      "Cyclohexane",
      "2-Methylpentane + 3-Methylpentane",
      "1-Chlorohexane",
      "2,3-Dimethylbutane"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q160_diagram"] || null,
    solution: "When n-hexane is heated with anhydrous $\\text{AlCl}_3$ and $\\text{HCl}$ gas at ~573 K and 30-35 atm pressure, it undergoes catalytic skeletal isomerization to yield a mixture of branched-chain alkanes, principally 2-methylpentane and 3-methylpentane (B)."
  },
  // Q161 (C)
  {
    qNum: 161,
    question: "The product formed in the following multistep reaction is :\n$$\\text{CH}_3-\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{(i) }\\text{B}_2\\text{H}_6,\\;\\text{(ii) }\\text{H}_2\\text{O}_2/\\text{NaOH}} \\xrightarrow{\\text{(iii) }\\text{PCC}} \\xrightarrow{\\text{(iv) }\\text{CH}_3\\text{MgBr},\\;\\text{H}_3\\text{O}^+} \\text{Product}$$",
    options: [
      "Butan-1-ol",
      "2-Methylpropan-2-ol",
      "Butan-2-ol",
      "Propan-2-ol"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q161_diagram"] || null,
    solution: "1. Hydroboration-oxidation of propene gives propan-1-ol (anti-Markovnikov hydration).\n2. Oxidation of propan-1-ol with PCC yields propanal ($\\text{CH}_3\\text{CH}_2\\text{CHO}$).\n3. Nucleophilic addition of methylmagnesium bromide ($\\text{CH}_3\\text{MgBr}$) to propanal followed by acidic workup yields butan-2-ol:\n$$\\text{CH}_3\\text{CH}_2\\text{CHO} + \\text{CH}_3\\text{MgBr} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{CH}_3\\text{CH}_2\\text{CH(OH)}\\text{CH}_3$$\nHence, the product is butan-2-ol (C)."
  },
  // Q162 (4) - Numerical
  {
    qNum: 162,
    question: "3-Methylhex-2-ene on reaction with $\\text{HBr}$ in presence of peroxide forms an addition product (A). The number of possible stereoisomers for 'A' is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "4",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Reaction of 3-methylhex-2-ene with $\\text{HBr}$ in the presence of organic peroxides follows the anti-Markovnikov free-radical addition mechanism. The bromine radical attaches to the less substituted carbon (C-2), generating a free radical at C-3 which then abstracts a hydrogen atom:\n$$\\text{CH}_3-\\text{CH(Br)}-\\text{CH(CH}_3)-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$$\nThe addition product is 2-bromo-3-methylhexane. It contains two non-identical chiral centers (C-2 and C-3). Since the molecule is unsymmetrical, the total number of stereoisomers is $2^n = 2^2 = 4$."
  },
  // Q163 (D)
  {
    qNum: 163,
    question: "The final product A, formed in the following reaction sequence is :\n$$\\text{Ph}-\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{(i) }\\text{BH}_3/\\text{THF},\\;\\text{H}_2\\text{O}_2/\\text{OH}^-} \\xrightarrow{\\text{(ii) }\\text{HBr}} \\xrightarrow{\\text{(iii) }\\text{Mg/ether}} \\xrightarrow{\\text{(iv) }\\text{HCHO},\\;\\text{H}_3\\text{O}^+} \\text{A}$$",
    options: [
      "$\\text{Ph}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$",
      "$\\text{Ph}-\\text{CH(CH}_3)_2$",
      "$\\text{Ph}-\\text{CH(OH)}-\\text{CH}_2\\text{CH}_3$",
      "$\\text{Ph}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2\\text{OH}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q163_diagram"] || null,
    solution: "1. Hydroboration-oxidation of styrene gives 2-phenylethan-1-ol ($\\text{PhCH}_2\\text{CH}_2\\text{OH}$).\n2. Reaction with $\\text{HBr}$ yields 2-phenylethyl bromide ($\\text{PhCH}_2\\text{CH}_2\\text{Br}$).\n3. Reaction with $\\text{Mg}$ in dry ether forms the Grignard reagent $\\text{PhCH}_2\\text{CH}_2\\text{MgBr}$.\n4. Nucleophilic addition to formaldehyde ($\\text{HCHO}$) followed by acidic workup adds one more carbon to afford 3-phenylpropan-1-ol ($\\text{PhCH}_2\\text{CH}_2\\text{CH}_2\\text{OH}$).\nThus, the final product is 3-phenylpropan-1-ol (D)."
  },
  // Q164 (A)
  {
    qNum: 164,
    question: "The final product A formed in the following multistep reaction sequence is :\n$$\\text{Cycloalkene} \\xrightarrow{\\text{(i) }\\text{H}_2\\text{O}/\\text{H}^+} \\xrightarrow{\\text{(ii) }\\text{CrO}_3} \\xrightarrow{\\text{(iii) }\\text{H}_2\\text{N}-\\text{NH}_2, \\text{KOH}, \\Delta} \\text{A}$$",
    options: [
      "Cycloalkane derivative",
      "Cyclic hydrazone",
      "Cycloalkanol",
      "Cycloalkenyl derivative"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q164_diagram"] || null,
    solution: "1. Acid-catalyzed hydration of the cyclic alkene yields a secondary cyclic alcohol according to Markovnikov's rule.\n2. Oxidation of the secondary alcohol with Jones reagent ($\\text{CrO}_3$) converts it into a cyclic ketone.\n3. Wolff-Kishner reduction with hydrazine and base ($\\text{H}_2\\text{N}-\\text{NH}_2, \\text{KOH}, \\Delta$) deoxygenates the carbonyl group into a methylene group ($-\\text{CH}_2-$), forming the corresponding cycloalkane shown in option (A)."
  },
  // Q165 (1) - Numerical
  {
    qNum: 165,
    question: "Consider the given reaction of 2,3-dimethylbut-2-ene with $\\text{O}_3$ followed by $\\text{Zn}/\\text{H}_2\\text{O}$. The total number of oxygen atoms present per molecule of the carbonyl product is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "1",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: urls["q165_diagram"] || null,
    solution: "Reductive ozonolysis of 2,3-dimethylbut-2-ene: $(\\text{CH}_3)_2\\text{C}=\\text{C}(\\text{CH}_3)_2 + \\text{O}_3 \\xrightarrow{\\text{Zn}/\\text{H}_2\\text{O}} 2\\text{ CH}_3\\text{COCH}_3$. The reaction produces two molecules of acetone. The total number of oxygen atoms present per molecule of acetone is 1."
  },
  // Q166 (D)
  {
    qNum: 166,
    question: "The major product(P) in the following reaction is :\n$$\\text{p-(Ethoxy)styrene} \\xrightarrow{\\text{Conc. HBr (excess)}, \\Delta} \\text{'P' (Major product)}$$",
    options: [
      "4-(2-Bromoethyl)ethoxybenzene",
      "4-(1-Bromoethyl)ethoxybenzene",
      "4-(2-Bromoethyl)phenol",
      "4-(1-Bromoethyl)phenol + Ethyl bromide"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q166_diagram"] || null,
    solution: "With excess concentrated $\\text{HBr}$ and heating, two reactions occur:\n1. Ether cleavage: The aryl alkyl ether (ethoxy group) is cleaved by $\\text{HBr}$ via $\\text{S}_\\text{N}2$ attack of $\\text{Br}^-$ on the ethyl group, producing 4-ethenylphenol and ethyl bromide ($\\text{CH}_3\\text{CH}_2\\text{Br}$).\n2. Addition to alkene: The vinyl double bond undergoes Markovnikov addition of $\\text{HBr}$ via a resonance-stabilized benzylic carbocation to give 4-(1-bromoethyl)phenol.\nThus, the major product is 4-(1-bromoethyl)phenol (D)."
  },
  // Q167 (D)
  {
    qNum: 167,
    question: "Identify product A and product B in the given reactions of cyclohexene :\n$$\\text{Product A} \\xleftarrow{\\text{Cl}_2/h\\nu} \\text{Cyclohexene} \\xrightarrow{\\text{Cl}_2/\\text{CCl}_4} \\text{Product B}$$",
    options: [
      "A: 1-Chlorocyclohexene, B: 1,2-Dichlorocyclohexane",
      "A: Chlorocyclohexane, B: 1,1-Dichlorocyclohexane",
      "A: 1,2-Dichlorocyclohexane, B: 3-Chlorocyclohexene",
      "A: 3-Chlorocyclohexene, B: 1,2-Dichlorocyclohexane"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q167_diagram"] || null,
    solution: "1. Reaction with $\\text{Cl}_2/h\\nu$ (or light) occurs via a free-radical substitution mechanism. The allylic C-H bond has a low bond dissociation energy due to allylic radical resonance stabilization, yielding 3-chlorocyclohexene (Product A).\n2. Reaction with $\\text{Cl}_2/\\text{CCl}_4$ in the dark occurs via electrophilic addition across the carbon-carbon double bond via a cyclic chloronium ion intermediate to yield trans-1,2-dichlorocyclohexane (Product B).\nTherefore, the correct assignment is (D)."
  },
  // Q168 (C)
  {
    qNum: 168,
    question: "The arenium ion which is not involved in the bromination of Aniline is :",
    options: [
      "Ortho-attack arenium ion",
      "Para-attack arenium ion",
      "Meta-attack arenium ion",
      "Resonance-stabilized iminium intermediate"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q168_diagram"] || null,
    solution: "In aniline, the amino group ($-\\text{NH}_2$) is strongly activating and ortho-para directing due to $+M$ resonance stabilization of the positively charged $\\sigma$-complex (arenium ion) by the nitrogen lone pair. When attack occurs at the meta position, the positive charge cannot be delocalized onto the nitrogen atom, so no extra-stable resonance structure is possible. Hence, electrophilic bromination proceeds exclusively through ortho and para arenium ions, and the meta-attack arenium ion (C) is not involved."
  },
  // Q169 (A)
  {
    qNum: 169,
    question: "Compound A formed in the following reaction reacts with B to give product C. Find out A and B :\n$$\\text{CH}_3-\\text{C}\\equiv\\text{CH} + \\text{Na} \\rightarrow \\text{A} \\xrightarrow{\\text{B}} \\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_2-\\text{CH}_3 + \\text{NaBr}$$",
    options: [
      "$\\text{A} = \\text{CH}_3-\\text{C}\\equiv\\text{C}^- \\text{Na}^+,\\; \\text{B} = \\text{CH}_3-\\text{CH}_2-\\text{Br}$",
      "$\\text{A} = \\text{CH}_3-\\text{CH}=\\text{CH}_2,\\; \\text{B} = \\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{Br}$",
      "$\\text{A} = \\text{CH}_3-\\text{CH}_2-\\text{CH}_3,\\; \\text{B} = \\text{CH}_3-\\text{Br}$",
      "$\\text{A} = \\text{CH}_3-\\text{C}\\equiv\\text{C}^- \\text{Na}^+,\\; \\text{B} = \\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{Br}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "Propyne contains an acidic acetylenic proton. Reaction with metallic sodium forms sodium propynide: $\\text{CH}_3-\\text{C}\\equiv\\text{C}^- \\text{Na}^+$ ('A'). In the second step, sodium propynide acts as a strong nucleophile and attacks ethyl bromide ($\\text{CH}_3\\text{CH}_2\\text{Br}$, 'B') via an $\\text{S}_\\text{N}2$ mechanism to yield pent-2-yne ($\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_2\\text{CH}_3$) and $\\text{NaBr}$. Hence, option (A) is correct."
  },
  // Q170 (B)
  {
    qNum: 170,
    question: "In the given reactions identify the reagent A and reagent B for the conversion of toluene to benzaldehyde :",
    options: [
      "$\\text{A} = \\text{CrO}_2\\text{Cl}_2,\\; \\text{B} = \\text{CrO}_3$",
      "$\\text{A} = \\text{CrO}_3,\\; \\text{B} = \\text{CrO}_2\\text{Cl}_2$",
      "$\\text{A} = \\text{CrO}_2\\text{Cl}_2,\\; \\text{B} = \\text{CrO}_2\\text{Cl}_2$",
      "$\\text{A} = \\text{KMnO}_4,\\; \\text{B} = \\text{CrO}_3$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q170_diagram"] || null,
    solution: "1. Reaction with chromic oxide ($\\text{CrO}_3$, 'A') in acetic anhydride $((\\text{CH}_3\\text{CO})_2\\text{O})$ at 273-283 K converts toluene to benzylidene diacetate, which upon acidic hydrolysis gives benzaldehyde.\n2. Reaction with chromyl chloride ($\\text{CrO}_2\\text{Cl}_2$, 'B') in $\\text{CS}_2$ or $\\text{CCl}_4$ forms a brown chromium complex, which on subsequent hydrolysis with aqueous acid yields benzaldehyde (Etard reaction).\nTherefore, $\\text{A} = \\text{CrO}_3$ and $\\text{B} = \\text{CrO}_2\\text{Cl}_2$ (B)."
  },
  // Q171 (B)
  {
    qNum: 171,
    question: "Product A and B formed in the following set of reactions of 1-methylcyclohexene are :",
    options: [
      "A: 1-Methylcyclohexanol, B: 2-Methylcyclohexanol",
      "A: 1-Methylcyclohexanol, B: trans-2-Methylcyclohexanol",
      "A: trans-2-Methylcyclohexanol, B: 1-Methylcyclohexanol",
      "A: 2-Methylcyclohexanol, B: 2-Methylcyclohexanol"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q171_diagram"] || null,
    solution: "1. Acid-catalyzed hydration ($\\text{H}^+/\\text{H}_2\\text{O}$) of 1-methylcyclohexene proceeds via the most stable tertiary carbocation to give Markovnikov addition, yielding 1-methylcyclohexanol ('A').\n2. Hydroboration-oxidation ($\\text{B}_2\\text{H}_6$ followed by $\\text{H}_2\\text{O}_2/\\text{NaOH}$) proceeds via stereospecific syn-addition with anti-Markovnikov regioselectivity to yield trans-2-methylcyclohexanol ('B').\nTherefore, option (B) is the correct assignment."
  },
  // Q172 (3) - Numerical
  {
    qNum: 172,
    question: "Number of alkanes obtained on electrolysis of an equimolar mixture of $\\text{CH}_3\\text{COONa}$ and $\\text{C}_2\\text{H}_5\\text{COONa}$ is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "In Kolbe's electrolytic synthesis, acetate and propionate ions lose electrons at the anode to form methyl and ethyl free radicals:\n$$\\text{CH}_3\\text{COO}^- \\xrightarrow{-e^-} \\text{CH}_3\\text{COO}^\\bullet \\rightarrow \\text{CH}_3^\\bullet + \\text{CO}_2$$\n$$\\text{C}_2\\text{H}_5\\text{COO}^- \\xrightarrow{-e^-} \\text{C}_2\\text{H}_5\\text{COO}^\\bullet \\rightarrow \\text{C}_2\\text{H}_5^\\bullet + \\text{CO}_2$$\nThe radicals undergo coupling reactions to form three distinct alkanes:\n1. $\\text{CH}_3^\\bullet + \\text{CH}_3^\\bullet \\rightarrow \\text{CH}_3-\\text{CH}_3$ (Ethane)\n2. $\\text{C}_2\\text{H}_5^\\bullet + \\text{C}_2\\text{H}_5^\\bullet \\rightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_3$ (n-Butane)\n3. $\\text{CH}_3^\\bullet + \\text{C}_2\\text{H}_5^\\bullet \\rightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_3$ (Propane)\nThus, exactly 3 different alkanes are obtained."
  },
  // Q173 (D)
  {
    qNum: 173,
    question: "The product (C) in the below mentioned reaction sequence is :\n$$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{Br} \\xrightarrow{\\text{alc. KOH}} \\text{'A'} \\xrightarrow{\\text{HBr/peroxide}} \\text{'B'} \\xrightarrow{\\text{aq. KOH}} \\text{'C'}$$",
    options: [
      "Propan-2-ol",
      "Prop-1-ene",
      "1,2-Propanediol",
      "Propan-1-ol"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: null,
    solution: "1. Dehydrohalogenation of 1-bromopropane with alcoholic $\\text{KOH}$ undergoes E2 elimination to give propene: $\\text{CH}_3-\\text{CH}=\\text{CH}_2$ ('A').\n2. Free-radical addition of $\\text{HBr}$ in the presence of organic peroxides follows anti-Markovnikov's rule to yield 1-bromopropane: $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2\\text{Br}$ ('B').\n3. Nucleophilic substitution with aqueous $\\text{KOH}$ replaces the bromine atom with a hydroxyl group to afford propan-1-ol: $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2\\text{OH}$ ('C').\nHence, product (C) is propan-1-ol (D)."
  },
  // Q174 (6) - Numerical
  {
    qNum: 174,
    question: "Number of isomeric products formed by monochlorination of 2-methylbutane in presence of sunlight is ___ (including stereoisomers).",
    options: [],
    correct_option: null,
    numeric_answer: "6",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Free-radical monochlorination of 2-methylbutane gives 4 constitutional isomers:\n1. 1-Chloro-2-methylbutane: $\\text{CH}_2\\text{Cl}-\\text{C}^*\\text{H(CH}_3)-\\text{CH}_2\\text{CH}_3$ (contains 1 chiral center, 2 enantiomers: d and l).\n2. 2-Chloro-2-methylbutane: $\\text{CH}_3-\\text{C(Cl)(CH}_3)-\\text{CH}_2\\text{CH}_3$ (achiral, 1 isomer).\n3. 2-Chloro-3-methylbutane: $\\text{CH}_3-\\text{C}^*\\text{H(Cl)}-\\text{CH(CH}_3)_2$ (contains 1 chiral center, 2 enantiomers: d and l).\n4. 1-Chloro-3-methylbutane: $\\text{CH}_2\\text{Cl}-\\text{CH}_2-\\text{CH(CH}_3)_2$ (achiral, 1 isomer).\nTotal number of isomeric products including stereoisomers = $2 + 1 + 2 + 1 = 6$."
  },
  // Q175 (C)
  {
    qNum: 175,
    question: "Major product of the following electrophilic addition reaction of 1-methylcyclohexene with DCl is :",
    options: [
      "trans-1-chloro-2-deuterocyclohexane",
      "cis-1-chloro-2-deuterocyclohexane",
      "1-Chloro-1-methyl-2-deuterocyclohexane (Markovnikov product)",
      "2-Chloro-1-methyl-1-deuterocyclohexane"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q175_diagram"] || null,
    solution: "Electrophilic addition of deuterium chloride ($\\text{DCl}$) across the double bond follows Markovnikov's rule. Electrophilic attack by $\\text{D}^+$ occurs at the less substituted carbon (C-2) to generate the more stable tertiary carbocation at C-1 bearing the methyl group. Attack by the chloride nucleophile $\\text{Cl}^-$ at this tertiary carbocation yields 1-chloro-1-methyl-2-deuterocyclohexane (C)."
  },
  // Q176 (A)
  {
    qNum: 176,
    question: "Identify A and B in the following reaction sequence :\n$$\\text{Bromobenzene} \\xrightarrow{\\text{Conc. HNO}_3/\\text{H}_2\\text{SO}_4} \\text{'A'} \\xrightarrow{\\text{(i) NaOH},\\;\\text{(ii) HCl}} \\text{'B'}$$",
    options: [
      "$\\text{A} = 2,4,6\\text{-Trinitrobromobenzene},\\; \\text{B} = 2,4,6\\text{-Trinitrophenol (Picric acid)}$",
      "$\\text{A} = 4\\text{-Nitrobromobenzene},\\; \\text{B} = 4\\text{-Nitrophenol}$",
      "$\\text{A} = 2,4\\text{-Dinitrobromobenzene},\\; \\text{B} = 2,4\\text{-Dinitrophenol}$",
      "$\\text{A} = 3\\text{-Nitrobromobenzene},\\; \\text{B} = 3\\text{-Nitrophenol}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q176_diagram"] || null,
    solution: "Under vigorous nitration with fuming/concentrated $\\text{HNO}_3$, bromobenzene undergoes multiple electrophilic aromatic substitution to form 2,4,6-trinitrobromobenzene ('A'). In 2,4,6-trinitrobromobenzene, the bromine atom is exceptionally reactive towards nucleophilic aromatic substitution ($\\text{S}_\\text{N}\\text{Ar}$) due to the powerful $-M$ activating effect of three nitro groups at ortho and para positions. Heating with aqueous $\\text{NaOH}$ followed by acidification yields 2,4,6-trinitrophenol (picric acid, 'B') (A)."
  },
  // Q177 (D)
  {
    qNum: 177,
    question: "Which of the following compounds will most easily be attacked by an electrophile?",
    options: [
      "Benzene",
      "Toluene",
      "Chlorobenzene",
      "Phenol"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q177_diagram"] || null,
    solution: "Electrophiles attack the aromatic ring that possesses the highest electron density. The hydroxyl group ($-\\text{OH}$) in phenol is a very powerful electron-donating group through $+M$ resonance delocalization of oxygen lone pairs into the ring. This activates the ring toward electrophilic attack far more strongly than the hyperconjugative $+I/+H$ effect of $-\\text{CH}_3$ in toluene. Chlorobenzene is deactivated by $-I$, and benzene is unactivated. Hence, phenol is attacked most easily (D)."
  },
  // Q178 (2) - Numerical
  {
    qNum: 178,
    question: "Total number of deactivating groups in aromatic electrophilic substitution reaction among the following is ___:\n$-\\text{OCH}_3$, $-\\text{NHCH}_3$, $-\\text{COCH}_3$, $-\\text{CN}$, $-\\text{OH}$",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: urls["q178_diagram"] || null,
    solution: "Substituents that withdraw electron density from the benzene ring via resonance ($-M$) or inductive ($-I$) effects deactivate the ring toward electrophilic aromatic substitution:\n1. $-\\text{OCH}_3$: $+M$ activating group.\n2. $-\\text{NHCH}_3$: strong $+M$ activating group.\n3. $-\\text{COCH}_3$: carbonyl carbon has partial positive charge and pulls electrons via $-M$ (deactivating).\n4. $-\\text{CN}$: nitrile carbon is sp-hybridized and withdraws electrons via $-M$ (strongly deactivating).\n5. $-\\text{OH}$: strong $+M$ activating group.\nThus, only $-\\text{COCH}_3$ and $-\\text{CN}$ are deactivating groups, making the total count equal to 2."
  },
  // Q179 (6) - Numerical
  {
    qNum: 179,
    question: "Total number of isomeric compounds (including stereoisomers) formed by monochlorination of 2-methylbutane is ___.",
    options: [],
    correct_option: null,
    numeric_answer: "6",
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    image_url: null,
    solution: "Monochlorination of 2-methylbutane gives 4 constitutional isomers:\n1. 1-Chloro-2-methylbutane: has 1 chiral carbon $\\implies 2$ enantiomers (d + l).\n2. 2-Chloro-2-methylbutane: achiral $\\implies 1$ isomer.\n3. 2-Chloro-3-methylbutane: has 1 chiral carbon $\\implies 2$ enantiomers (d + l).\n4. 1-Chloro-3-methylbutane: achiral $\\implies 1$ isomer.\nTotal number of isomeric products including stereoisomers = $2 + 1 + 2 + 1 = 6$."
  },
  // Q180 (A)
  {
    qNum: 180,
    question: "In the given reactions identify A and B :\n$$\\text{H}_2 + \\text{A} \\xrightarrow{\\text{Pd}/\\text{CaCO}_3} \\text{cis-pent-2-ene}$$\n$$\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_3 + \\text{H}_2 \\xrightarrow{\\text{Na}/\\text{liquid NH}_3} \\text{B}$$",
    options: [
      "A : 2-Pentyne, B : trans-but-2-ene",
      "A : n-Pentane, B : trans-but-2-ene",
      "A : 2-Pentyne, B : cis-but-2-ene",
      "A : n-Pentane, B : cis-but-2-ene"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    image_url: urls["q180_diagram"] || null,
    solution: "1. Hydrogenation of an alkyne with Lindlar's catalyst ($\\text{Pd}/\\text{CaCO}_3$) proceeds via syn-addition to afford a cis-alkene. Since the product is cis-pent-2-ene, reactant 'A' must be the internal alkyne pent-2-yne ($\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_2\\text{CH}_3$).\n2. Birch reduction of internal alkynes using sodium in liquid ammonia ($\\text{Na}/\\text{liq. NH}_3$) proceeds via anti-addition through a trans-radical anion to give the trans-alkene. Therefore, but-2-yne is reduced to trans-but-2-ene ('B').\nHence, A is 2-pentyne and B is trans-but-2-ene (A)."
  }
];

const fileContent = `export const HYDRO_PART3 = ${JSON.stringify(questions, null, 2)};\n`;
fs.writeFileSync(path.resolve(__dirname, 'clean_hydro_part3.mjs'), fileContent);
console.log(`Successfully generated clean_hydro_part3.mjs with ${questions.length} questions!`);
