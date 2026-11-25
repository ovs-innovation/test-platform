import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_diagram_urls.json'), 'utf8'));

const part1Questions = [
  {
    qNum: 1,
    exam: "JEE Main 2002",
    question: "What is the product when acetylene reacts with hypochlorous acid ?",
    options: [
      "$\\text{CH}_3\\text{COCl}$",
      "$\\text{ClCH}_2\\text{CHO}$",
      "$\\text{Cl}_2\\text{CHCHO}$",
      "$\\text{ClCHCOOH}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "When acetylene reacts with hypochlorous acid ($\\text{HOCl}$), electrophilic addition takes place across the triple bond:\n$$\\text{CH}\\equiv\\text{CH} + \\text{HOCl} \\rightarrow \\text{CH(OH)}=\\text{CHCl}$$\nFurther addition of $\\text{HOCl}$ gives the gem-diol:\n$$\\text{CH(OH)}=\\text{CHCl} + \\text{HOCl} \\rightarrow [\\text{CH(OH)}_2-\\text{CHCl}_2]$$\nLoss of a water molecule from the unstable gem-diol yields dichloroacetaldehyde:\n$$[\\text{CH(OH)}_2-\\text{CHCl}_2] \\xrightarrow{-\\text{H}_2\\text{O}} \\text{CHO}-\\text{CHCl}_2 \\text{ (dichloroacetaldehyde)}$$\nHence, the correct option is (C)."
  },
  {
    qNum: 2,
    exam: "JEE Main 2002",
    question: "Which of these will not react with acetylene ?",
    options: [
      "$\\text{NaOH}$",
      "ammoniacal $\\text{AgNO}_3$",
      "$\\text{Na}$",
      "$\\text{HCl}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Acetylene has weakly acidic terminal hydrogens ($pK_a \\approx 25$) and is a weaker acid than water ($pK_a \\approx 15.7$). Therefore, it does not react with a moderate base like aqueous $\\text{NaOH}$. However, it reacts with stronger bases like $\\text{Na}$ metal in liquid $\\text{NH}_3$, ammoniacal $\\text{AgNO}_3$ (forming a white precipitate of silver acetylide, $\\text{AgC}\\equiv\\text{CAg}$), and undergoes electrophilic addition with $\\text{HCl}$. Hence, option (A) is correct."
  },
  {
    qNum: 3,
    exam: "JEE Main 2003",
    question: "Butene-1 may be converted to butane by reaction with :",
    options: [
      "$\\text{Sn} - \\text{HCl}$",
      "$\\text{Zn} - \\text{Hg}$",
      "$\\text{Pd}/\\text{H}_2$",
      "$\\text{Zn} - \\text{HCl}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Catalytic hydrogenation of an alkene (butene-1) in the presence of transition metal catalysts like $\\text{Pd}$, $\\text{Pt}$, or $\\text{Ni}$ with $\\text{H}_2$ reduces the carbon-carbon double bond to a single bond, yielding butane:\n$$\\text{CH}_3\\text{CH}_2\\text{CH}=\\text{CH}_2 + \\text{H}_2 \\xrightarrow{\\text{Pd}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_3$$\nHence, option (C) is correct."
  },
  {
    qNum: 4,
    exam: "JEE Main 2004",
    question: "Which one of the following has the minimum boiling point ?",
    options: [
      "n-butane",
      "isobutane",
      "1-butene",
      "1-butyne"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Among isomeric alkanes, branching decreases the surface area of the molecule, resulting in weaker van der Waals forces and a lower boiling point. Isobutane (2-methylpropane) has a spherical shape with smaller surface area compared to straight-chain n-butane. Boiling points: Isobutane ($-11.7^\\circ\\text{C}$), n-butane ($-0.5^\\circ\\text{C}$), 1-butene ($-6.3^\\circ\\text{C}$), 1-butyne ($8.1^\\circ\\text{C}$). Hence, isobutane has the minimum boiling point."
  },
  {
    qNum: 5,
    exam: "JEE Main 2006",
    question: "The alkene formed as a major product in the given elimination reaction is :",
    options: [
      "4-Methylcyclohexene",
      "$\\text{CH}_2=\\text{CH}_2$ (Ethene)",
      "3-Methylcyclohexene",
      "1-Methylcyclohexene"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q5_diagram'] || null,
    solution_image_url: null,
    solution: "In Hofmann elimination of a quaternary ammonium hydroxide, the least substituted, least sterically hindered alkene is formed as the major product. The ethyl group attached to the nitrogen undergoes $\\beta$-elimination more readily than the bulky cyclohexyl ring or n-butyl group, yielding ethene ($\\text{CH}_2=\\text{CH}_2$) as the major alkene product. Hence, option (B) is correct."
  },
  {
    qNum: 6,
    exam: "JEE Main 2007",
    question: "Presence of a nitro group in a benzene ring :",
    options: [
      "activates the ring towards electrophilic substitution",
      "renders the ring basic",
      "deactivates the ring towards nucleophilic substitution",
      "deactivates the ring towards electrophilic substitution"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The nitro group ($-\\text{NO}_2$) exhibits strong $-I$ (inductive) and $-M$ (mesomeric/resonance electron-withdrawing) effects. It significantly withdraws electron density from the benzene ring, especially from the ortho and para positions, thereby strongly deactivating the ring towards electrophilic aromatic substitution. Hence, option (D) is correct."
  },
  {
    qNum: 7,
    exam: "JEE Main 2007",
    question: "The reaction of toluene with $\\text{Cl}_2$ in presence of $\\text{FeCl}_3$ gives predominantly :",
    options: [
      "benzoyl chloride",
      "benzyl chloride",
      "o- and p-chlorotoluene",
      "m-chlorotoluene"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The methyl group ($-\\text{CH}_3$) in toluene is an activating, ortho- and para-directing group due to hyperconjugation and $+I$ inductive effect. In the presence of a Lewis acid catalyst like $\\text{FeCl}_3$, electrophilic aromatic chlorination occurs at the ring, yielding a mixture of o-chlorotoluene and p-chlorotoluene predominantly. Hence, option (C) is correct."
  },
  {
    qNum: 8,
    exam: "JEE Main 2008",
    question: "In the following sequence of reactions, the alkene affords the compound 'B' :\n$$\\text{CH}_3\\text{CH}=\\text{CHCH}_3 \\xrightarrow{\\text{O}_3} A \\xrightarrow{\\text{Zn}/\\text{H}_2\\text{O}} B$$\nThe compound B is :",
    options: [
      "$\\text{CH}_3\\text{CH}_2\\text{CHO}$",
      "$\\text{CH}_3\\text{COCH}_3$",
      "$\\text{CH}_3\\text{CH}_2\\text{COCH}_3$",
      "$\\text{CH}_3\\text{CHO}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Reductive ozonolysis of but-2-ene ($\\text{CH}_3\\text{CH}=\\text{CHCH}_3$) cleaves the double bond into two carbonyl groups:\n$$\\text{CH}_3\\text{CH}=\\text{CHCH}_3 \\xrightarrow{\\text{O}_3} \\text{Ozonide} \\xrightarrow{\\text{Zn}/\\text{H}_2\\text{O}} 2\\,\\text{CH}_3\\text{CHO}$$\nThus, compound B is acetaldehyde ($\\text{CH}_3\\text{CHO}$). Hence, option (D) is correct."
  },
  {
    qNum: 9,
    exam: "JEE Main 2008",
    question: "The treatment of $\\text{CH}_3\\text{MgX}$ with $\\text{CH}_3\\text{C}\\equiv\\text{C}-\\text{H}$ produces :",
    options: [
      "$\\text{CH}_3-\\text{CH}=\\text{CH}_2$",
      "$\\text{CH}_3\\text{C}\\equiv\\text{C}-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{C}(\\text{H})=\\text{C}(\\text{H})-\\text{CH}_3$",
      "$\\text{CH}_4$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Grignard reagents ($\\text{CH}_3\\text{MgX}$) act as strong bases and abstract the acidic terminal hydrogen atom from propyne ($\\text{CH}_3\\text{C}\\equiv\\text{C}-\\text{H}$):\n$$\\text{CH}_3\\text{MgX} + \\text{CH}_3\\text{C}\\equiv\\text{C}-\\text{H} \\rightarrow \\text{CH}_4 + \\text{CH}_3\\text{C}\\equiv\\text{C}-\\text{MgX}$$\nMethane ($\\text{CH}_4$) gas is produced. Hence, option (D) is correct."
  },
  {
    qNum: 10,
    exam: "JEE Main 2008",
    question: "The electrophile, $\\text{E}^+$ attacks the benzene ring to generate the intermediate $\\sigma$-complex. Of the following, which $\\sigma$-complex is of lowest energy ?",
    options: [
      "$\\sigma$-complex (A)",
      "$\\sigma$-complex (B)",
      "$\\sigma$-complex (C)",
      "$\\sigma$-complex (D)"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q10_diagram'] || null,
    solution_image_url: null,
    solution: "In nitrobenzene, the nitro group ($-\\text{NO}_2$) is strongly electron-withdrawing. Electrophilic attack at the meta position avoids placing the positive charge directly on the carbon atom bearing the electron-withdrawing nitro group, making the meta $\\sigma$-complex (structure B) the most stable (lowest energy) among the intermediate complexes. Hence, option (B) is correct."
  },
  {
    qNum: 11,
    exam: "JEE Main 2008",
    question: "Toluene is nitrated and the resulting product is reduced with tin and hydrochloric acid. The product so obtained is diazotised and then heated with cuprous bromide. The reaction mixture so formed contains :",
    options: [
      "mixture of o- and p-bromotoluenes",
      "mixture of o- and p-dibromobenzenes",
      "mixture of o- and p-bromoanilines",
      "mixture of o- and m-bromotoluenes"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "1. Nitration of toluene gives a mixture of o- and p-nitrotoluenes.\n2. Reduction with $\\text{Sn} + \\text{HCl}$ converts the nitro group to amino group, yielding o- and p-toluidines.\n3. Diazotisation with $\\text{NaNO}_2 + \\text{HCl}$ at $0-5^\\circ\\text{C}$ gives diazonium salts.\n4. Sandmeyer reaction with $\\text{CuBr}/\\text{HBr}$ replaces the diazonium group with bromine, producing a mixture of o- and p-bromotoluenes.\nHence, option (A) is correct."
  },
  {
    qNum: 12,
    exam: "JEE Main 2008",
    question: "The hydrocarbon which can react with sodium in liquid ammonia is :",
    options: [
      "$\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{C}\\equiv\\text{CCH}_2\\text{CH}_2\\text{CH}_3$",
      "$\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CH}$",
      "$\\text{CH}_3\\text{CH}=\\text{CHCH}_3$",
      "$\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CCH}_2\\text{CH}_3$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Terminal alkynes (1-alkynes) possess an acidic acetylenic hydrogen atom ($sp$-hybridized C-H bond). But-1-yne ($\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CH}$) reacts with sodium in liquid ammonia to form sodium butynide with liberation of hydrogen gas:\n$$\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CH} + \\text{Na} \\xrightarrow{\\text{liq. }\\text{NH}_3} \\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{C}^-\\text{Na}^+ + \\frac{1}{2}\\text{H}_2$$\nNon-terminal alkynes and alkenes do not have acidic acetylenic hydrogens to react in this acid-base manner. Hence, option (B) is correct."
  },
  {
    qNum: 13,
    exam: "JEE Main 2010",
    question: "The main product of the following reaction is :\n$$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH(OH)CH}(\\text{CH}_3)_2 \\xrightarrow{\\text{conc. }\\text{H}_2\\text{SO}_4} ?$$",
    options: [
      "trans-4-methyl-1-phenylpent-2-ene",
      "cis-4-methyl-1-phenylpent-2-ene",
      "(E)-4-methyl-1-phenylpent-1-ene",
      "2-methyl-5-phenylpent-2-ene"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Acid-catalyzed dehydration of $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH(OH)CH}(\\text{CH}_3)_2$ protonates the $-\\text{OH}$ group, which leaves to form a secondary carbocation. A hydride shift occurs to give the resonance-stabilized benzylic carbocation $\\text{C}_6\\text{H}_5\\text{CH}^+-\\text{CH}_2\\text{CH}(\\text{CH}_3)_2$, followed by loss of a proton to form the conjugated alkene, with the trans isomer being the most stable and major product: $\\text{C}_6\\text{H}_5-\\text{CH}=\\text{CH}-\\text{CH}(\\text{CH}_3)_2$ (trans). Hence, option (A) is correct."
  },
  {
    qNum: 14,
    exam: "JEE Main 2011",
    question: "Ozonolysis of an organic compound gives formaldehyde as one of the products. This confirms the presence of :",
    options: [
      "a vinyl group",
      "an isopropyl group",
      "an acetylenic triple bond",
      "two ethylenic double bonds"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Formaldehyde ($\\text{HCHO}$) is produced upon ozonolysis if and only if there is a terminal alkene carbon with two hydrogens, i.e., a terminal double bond or vinyl group ($-\\text{CH}=\\text{CH}_2$):\n$$R-\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{O}_3/\\text{Zn},\\text{H}_2\\text{O}} R-\\text{CHO} + \\text{HCHO}$$\nHence, option (A) is correct."
  },
  {
    qNum: 15,
    exam: "JEE Main 2012",
    question: "2-Hexyne gives trans-2-hexene on treatment with :",
    options: [
      "$\\text{Pt}/\\text{H}_2$",
      "$\\text{Li}/\\text{NH}_3$",
      "$\\text{Pd}/\\text{BaSO}_4$",
      "$\\text{LiAlH}_4$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Reduction of non-terminal alkynes with sodium or lithium in liquid ammonia (Birch reduction) proceeds via anti-addition of hydrogen through radical anion intermediates to yield trans-alkenes exclusively:\n$$\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_2\\text{CH}_2\\text{CH}_3 \\xrightarrow{\\text{Li}/\\text{NH}_3} \\text{trans-2-hexene}$$\nIn contrast, $\\text{Pd}/\\text{BaSO}_4$ (Lindlar's catalyst) gives cis-alkenes. Hence, option (B) is correct."
  },
  {
    qNum: 16,
    exam: "JEE Main 2012 (12 May)",
    question: "The reaction, $\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{Zn(Hg)/conc. HCl}} \\text{CH}_3\\text{CH}_3$ is :",
    options: [
      "Cannizzaro's reaction",
      "Rosenmund reduction",
      "Wolff-Kishner reduction",
      "Clemmensen reduction"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The reduction of aldehydes and ketones to corresponding hydrocarbons (alkanes) using zinc amalgam and concentrated hydrochloric acid [$\\text{Zn(Hg)}/\\text{conc. HCl}$] is known as Clemmensen reduction. Hence, option (D) is correct."
  },
  {
    qNum: 17,
    exam: "JEE Main 2012 (26 May)",
    question: "Consider the following sequence of reactions :\n$$\\text{CH}_3\\text{CH}=\\text{CH}_2 \\xrightarrow[700\\,\\text{K}]{\\text{Cl}_2} A \\xrightarrow[420\\,\\text{K}, 12\\,\\text{atm}]{\\text{Na}_2\\text{CO}_3} B \\xrightarrow[\\text{(ii) NaOH}]{\\text{(i) HOCl}} C$$\nCompound 'C' is :",
    options: [
      "Glycerol ($\\text{HOCH}_2-\\text{CH(OH)}-\\text{CH}_2\\text{OH}$)",
      "$\\text{CH}_3\\text{CH(OH)COONa}$",
      "$\\text{HOCH}_2-\\text{CH}=\\text{CH}_2$",
      "$\\text{CH}_3\\text{CH(OH)COCl}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "1. Allylic chlorination of propene at $700\\,\\text{K}$ gives allyl chloride: $A = \\text{CH}_2=\\text{CH}-\\text{CH}_2\\text{Cl}$.\n2. Hydrolysis with aqueous $\\text{Na}_2\\text{CO}_3$ at high temperature and pressure yields allyl alcohol: $B = \\text{CH}_2=\\text{CH}-\\text{CH}_2\\text{OH}$.\n3. Addition of $\\text{HOCl}$ followed by alkaline hydrolysis ($\\text{NaOH}$) converts the double bond into a diol, forming glycerol: $C = \\text{HOCH}_2-\\text{CH(OH)}-\\text{CH}_2\\text{OH}$.\nHence, option (A) is correct."
  },
  {
    qNum: 18,
    exam: "JEE Main 2012 (26 May)",
    question: "The hydration of propyne results in formation of :",
    options: [
      "Acetone",
      "Propanol-1",
      "Propene",
      "Propanal"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Hydration of propyne with dilute $\\text{H}_2\\text{SO}_4$ in the presence of $\\text{HgSO}_4$ catalyst follows Markovnikov's rule:\n$$\\text{CH}_3-\\text{C}\\equiv\\text{CH} + \\text{H}_2\\text{O} \\xrightarrow{\\text{Hg}^{2+}/\\text{H}^+} [\\text{CH}_3-\\text{C(OH)}=\\text{CH}_2]$$\nThe enol rapidly tautomerizes to the more stable ketone, acetone ($\\text{CH}_3\\text{COCH}_3$). Hence, option (A) is correct."
  },
  {
    qNum: 19,
    exam: "JEE Main 2013 (09 Apr)",
    question: "The addition of $\\text{HI}$ in the presence of peroxide catalyst does not follow anti-Markovnikov's rule because :",
    options: [
      "$\\text{HI}$ is a strong reducing agent.",
      "$\\text{H}-\\text{I}$ bond is too strong to be broken homolytically.",
      "$\\text{I}$ atom combines with $\\text{H}$ atom to give back $\\text{HI}$.",
      "Iodine atom is not reactive enough to add across a double bond."
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The peroxide effect (anti-Markovnikov addition) operates through a free-radical chain mechanism. For $\\text{HI}$, the $\\text{H}-\\text{I}$ bond is weak and easily broken, but the resulting iodine free radicals ($\\text{I}^\\bullet$) are large and not reactive enough to add across the double bond (the addition step is endothermic). Instead, iodine radicals preferentially recombine to form molecular iodine ($\\text{I}_2$). Hence, option (D) is correct."
  },
  {
    qNum: 20,
    exam: "JEE Main 2013 (22 Apr)",
    question: "Which of the following would not give 2-phenylbutane as the major product in a Friedel-Crafts alkylation reaction ?",
    options: [
      "1-butene + $\\text{HF}$",
      "2-butanol + $\\text{H}_2\\text{SO}_4$",
      "Butanoyl chloride + $\\text{AlCl}_3$ then $\\text{Zn}, \\text{HCl}$",
      "Butyl chloride + $\\text{AlCl}_3$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Friedel-Crafts acylation of benzene with butanoyl chloride ($\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{COCl}$) in the presence of $\\text{AlCl}_3$ gives butyrophenone (propyl phenyl ketone, $\\text{C}_6\\text{H}_5\\text{COCH}_2\\text{CH}_2\\text{CH}_3$) without rearrangement. Subsequent Clemmensen reduction ($\\text{Zn-Hg}/\\text{HCl}$) reduces the carbonyl group to $-\\text{CH}_2-$, giving butylbenzene (1-phenylbutane), NOT 2-phenylbutane. The other three pathways generate the 2-butyl carbocation via rearrangement or direct protonation, yielding 2-phenylbutane. Hence, option (C) is correct."
  },
  {
    qNum: 21,
    exam: "JEE Main 2013 (22 Apr)",
    question: "A major component of Borsch reagent is obtained by reacting hydrazine hydrate with which of the following ?",
    options: [
      "1-Chloro-2-nitrobenzene",
      "1-Chloro-2,4-dinitrobenzene",
      "1-Chloro-3-nitrobenzene",
      "1-Chloro-2,4,6-trinitrobenzene"
    ],
    correct_option: 2, // C is 1-chloro-2,4-dinitrobenzene in official key
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q21_diagram'] || null,
    solution_image_url: null,
    solution: "Borsch's reagent (Brady's reagent) is 2,4-dinitrophenylhydrazine (2,4-DNP). It is prepared by the nucleophilic aromatic substitution reaction of hydrazine hydrate with 1-chloro-2,4-dinitrobenzene (2,4-dinitrochlorobenzene):\n$$\\text{C}_6\\text{H}_3(\\text{NO}_2)_2\\text{Cl} + \\text{NH}_2\\text{NH}_2 \\rightarrow \\text{C}_6\\text{H}_3(\\text{NO}_2)_2\\text{NHNH}_2 + \\text{HCl}$$\nHence, option (C) is correct."
  },
  {
    qNum: 22,
    exam: "JEE Main 2014 (06 Apr)",
    question: "The major organic compound formed by the reaction of 1, 1, 1 - trichloroethane with silver powder is :",
    options: [
      "Acetylene",
      "Ethene",
      "2 - Butyne",
      "2 - Butene"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Heating 1,1,1-trichloroethane with silver powder brings about reductive dehalogenation and coupling of the two alkylidene units to form 2-butyne:\n$$2\\,\\text{CH}_3\\text{CCl}_3 + 6\\,\\text{Ag} \\xrightarrow{\\Delta} \\text{CH}_3\\text{C}\\equiv\\text{CCH}_3 + 6\\,\\text{AgCl}$$\nHence, option (C) is correct."
  },
  {
    qNum: 23,
    exam: "JEE Main 2014 (11 Apr)",
    question: "The gas liberated by the electrolysis of Dipotassium succinate solution is :",
    options: [
      "Ethane",
      "Ethyne",
      "Ethene",
      "Propene"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Kolbe's electrolytic decarboxylation of dipotassium succinate generates succinate ions, which at the anode lose two electrons to form a diradical intermediate that spontaneously undergoes ring opening and decarboxylation to produce ethene ($\\text{CH}_2=\\text{CH}_2$) and $\\text{CO}_2$ gas:\n$$\\text{CH}_2\\text{COO}^- - \\text{CH}_2\\text{COO}^- \\xrightarrow{-2e^-} [\\text{CH}_2\\text{COO}^\\bullet - \\text{CH}_2\\text{COO}^\\bullet] \\rightarrow \\text{CH}_2=\\text{CH}_2 + 2\\,\\text{CO}_2$$\nHence, option (C) is correct."
  },
  {
    qNum: 24,
    exam: "JEE Main 2014 (11 Apr)",
    question: "The reagent needed for converting diphenylacetylene ($\\text{Ph}-\\text{C}\\equiv\\text{C}-\\text{Ph}$) to trans-stilbene is :",
    options: [
      "Catalytic Hydrogenation",
      "$\\text{H}_2 / \\text{Lindlar Cat.}$",
      "$\\text{Li} / \\text{NH}_3$",
      "$\\text{LiAlH}_4$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Reduction of diphenylacetylene with lithium or sodium in liquid ammonia (Birch reduction) proceeds by anti-addition to give trans-1,2-diphenylethene (trans-stilbene) stereoselectively. On the other hand, Lindlar's catalyst produces the cis-isomer. Hence, option (C) is correct."
  },
  {
    qNum: 25,
    exam: "JEE Main 2014 (12 Apr)",
    question: "In the presence of peroxide, $\\text{HCl}$ and $\\text{HI}$ do not give anti-Markovnikoff's addition of alkenes because :",
    options: [
      "One of the steps is endothermic in $\\text{HCl}$ and $\\text{HI}$",
      "Both $\\text{HCl}$ and $\\text{HI}$ are strong acids",
      "$\\text{HCl}$ is oxidizing and the $\\text{HI}$ is reducing",
      "All the steps are exothermic in $\\text{HCl}$ and $\\text{HI}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the peroxide effect to operate as a chain reaction, both propagation steps must be exothermic. In the case of $\\text{HBr}$, both propagation steps are exothermic. For $\\text{HCl}$, the second propagation step (abstraction of H from $\\text{HCl}$ by carbon radical) is endothermic because the $\\text{H}-\\text{Cl}$ bond is too strong. For $\\text{HI}$, the first propagation step (addition of iodine radical to alkene) is endothermic. Thus, one of the steps is endothermic in both $\\text{HCl}$ and $\\text{HI}$. Hence, option (A) is correct."
  },
  {
    qNum: 26,
    exam: "JEE Main 2014 (12 Apr)",
    question: "Allylbenzene on oxymercuration-demercuration produces the major product :",
    options: [
      "1-Phenylpropan-2-ol",
      "3-Phenylpropan-1-ol",
      "1-Phenylpropane-1,2-diol",
      "2-Phenylacetic acid"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q26_diagram'] || null,
    solution_image_url: null,
    solution: "Oxymercuration-demercuration [$\\text{(i) Hg(OAc)}_2/\\text{H}_2\\text{O}, \\text{(ii) NaBH}_4$] adds water across the double bond of an alkene according to Markovnikov's regioselectivity without carbocation rearrangement:\n$$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{(i) Hg(OAc)}_2/\\text{H}_2\\text{O},\\;\\text{(ii) NaBH}_4} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH(OH)CH}_3$$\nThe major product formed is 1-phenylpropan-2-ol. Hence, option (A) is correct."
  },
  {
    qNum: 27,
    exam: "JEE Main 2015 (10 Apr)",
    question: "A compound $A$ with molecular formula $\\text{C}_{10}\\text{H}_{13}\\text{Cl}$, gives a white precipitate on adding silver nitrate solution. $A$ on reacting with alcoholic $\\text{KOH}$ gives compound $B$ as the main product. $B$ on ozonolysis, gives $C$ and $D$. $C$ gives Cannizzaro reaction, but not aldol condensation. $D$ gives aldol condensation, but not Cannizzaro reaction. $A$ is :",
    options: [
      "$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{CH}_2-\\text{CH(Cl)}-\\text{CH}_3$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{C(Cl)}(\\text{CH}_3)_2$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{Cl}$",
      "$\\text{C}_6\\text{H}_5-\\text{CH(Cl)}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "1. Compound $A$ gives a precipitate with $\\text{AgNO}_3$, indicating an easily ionizable reactive chloride (tertiary alkyl halide).\n2. $A$ is $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{C(Cl)}(\\text{CH}_3)_2$. Elimination with alc. $\\text{KOH}$ gives the most stable alkene: $B = \\text{C}_6\\text{H}_5\\text{CH}=\\text{C}(\\text{CH}_3)_2$.\n3. Ozonolysis of $B$ yields benzaldehyde ($C = \\text{C}_6\\text{H}_5\\text{CHO}$) and acetone ($D = \\text{CH}_3\\text{COCH}_3$).\n4. Benzaldehyde has no $\\alpha$-hydrogen and undergoes Cannizzaro reaction. Acetone has $\\alpha$-hydrogens and undergoes aldol condensation.\nHence, compound $A$ is $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{C(Cl)}(\\text{CH}_3)_2$ (Option B)."
  },
  {
    qNum: 28,
    exam: "JEE Main 2016 (03 Apr)",
    question: "The reaction of propene with $\\text{HOCl}$ ($\\text{Cl}_2 + \\text{H}_2\\text{O}$) proceeds through the intermediate :",
    options: [
      "$\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2^+$",
      "$\\text{CH}_3-\\text{CHCl}-\\text{CH}_2^+$",
      "$\\text{CH}_3-\\text{CH}^+-\\text{CH}_2-\\text{OH}$",
      "$\\text{CH}_3-\\text{CH}^+-\\text{CH}_2-\\text{Cl}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "In the halohydrin reaction of propene with $\\text{HOCl}$, the electrophilic species is $\\text{Cl}^+$. Addition of $\\text{Cl}^+$ to the terminal carbon of propene generates the more stable secondary carbocation intermediate:\n$$\\text{CH}_3-\\text{CH}=\\text{CH}_2 + \\text{Cl}^+ \\rightarrow \\text{CH}_3-\\text{CH}^+-\\text{CH}_2-\\text{Cl}$$\nNucleophilic attack of water at the secondary carbocation carbon then yields 1-chloropropan-2-ol. Hence, option (D) is correct."
  },
  {
    qNum: 29,
    exam: "JEE Main 2016 (09 Apr)",
    question: "$5\\,\\text{L}$ of an alkane requires $25\\,\\text{L}$ of oxygen for its complete combustion. If all volumes are measured at constant temperature and pressure, the alkane is :",
    options: [
      "Isobutane",
      "Ethane",
      "Butane",
      "Propane"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The balanced equation for complete combustion of an alkane $\\text{C}_x\\text{H}_y$ is:\n$$\\text{C}_x\\text{H}_y + \\left(x + \\frac{y}{4}\\right)\\text{O}_2 \\rightarrow x\\,\\text{CO}_2 + \\frac{y}{2}\\,\\text{H}_2\\text{O}$$\nVolume ratio of $\\text{O}_2$ to alkane:\n$$\\frac{V_{\\text{O}_2}}{V_{\\text{alkane}}} = x + \\frac{y}{4} = \\frac{25}{5} = 5$$\nFor an alkane, $y = 2x + 2$:\n$$x + \\frac{2x+2}{4} = 5 \\implies x + \\frac{x}{2} + 0.5 = 5 \\implies 1.5x = 4.5 \\implies x = 3$$\nThus, the alkane is propane ($\\text{C}_3\\text{H}_8$). Hence, option (D) is correct."
  },
  {
    qNum: 30,
    exam: "JEE Main 2016 (10 Apr)",
    question: "Consider the reaction sequence below :\n$$\\text{Methoxybenzene} \\xrightarrow[\\text{AlCl}_3]{\\text{Succinic anhydride}} A \\xrightarrow{\\text{Clemmensen's reduction}} X$$\n$X$ is :",
    options: [
      "6-Methoxy-1,2,3,4-tetrahydronaphthalene-1,4-diol",
      "6-Methoxy-1,2,3,4-tetrahydronaphthalen-1-one",
      "5-Methoxy-1,2,3,4-tetrahydronaphthalene",
      "6-Methoxy-1,2,3,4-tetrahydronaphthalene"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q30_diagram'] || null,
    solution_image_url: null,
    solution: "1. Friedel-Crafts acylation of methoxybenzene (anisole) with succinic anhydride occurs at the less hindered para position due to the strongly activating $+M$ effect of the $-\\text{OCH}_3$ group, forming 4-(4-methoxyphenyl)-4-oxobutanoic acid ($A$).\n2. Clemmensen reduction ($\\text{Zn-Hg}/\\text{HCl}$) followed by intramolecular Friedel-Crafts cyclization and complete reduction of the ketone carbonyl yields 6-methoxy-1,2,3,4-tetrahydronaphthalene. Hence, option (D) is correct."
  },
  {
    qNum: 31,
    exam: "JEE Main 2017 (02 Apr)",
    question: "Which of the following compounds will form significant amount of meta product during mono-nitration reaction ?",
    options: [
      "Phenyl acetate ($\\text{C}_6\\text{H}_5\\text{OCOCH}_3$)",
      "Aniline ($\\text{C}_6\\text{H}_5\\text{NH}_2$)",
      "Acetanilide ($\\text{C}_6\\text{H}_5\\text{NHCOCH}_3$)",
      "Phenol ($\\text{C}_6\\text{H}_5\\text{OH}$)"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q31_diagram'] || null,
    solution_image_url: null,
    solution: "In strongly acidic nitrating medium ($\\text{HNO}_3 + \\text{H}_2\\text{SO}_4$), aniline undergoes extensive protonation to form the anilinium ion ($\\text{C}_6\\text{H}_5-\\text{NH}_3^+$). The $-\\text{NH}_3^+$ group is a powerful electron-withdrawing ($-I$) group and is meta-directing. Consequently, nitration of aniline yields $51\\%$ para-, $47\\%$ meta-, and only $2\\%$ ortho-nitroaniline. Thus, significant meta product is formed by aniline. Hence, option (B) is correct."
  },
  {
    qNum: 32,
    exam: "JEE Main 2017 (08 Apr)",
    question: "Which of the following compounds will not undergo Friedel Crafts reaction with benzene ?",
    options: [
      "Vinyl chloride ($\\text{CH}_2=\\text{CH}-\\text{Cl}$)",
      "Allyl chloride ($\\text{CH}_2=\\text{CH}-\\text{CH}_2\\text{Cl}$)",
      "Crotonyl chloride ($\\text{CH}_3\\text{CH}=\\text{CHCOCl}$)",
      "Benzoyl chloride ($\\text{C}_6\\text{H}_5\\text{COCl}$)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q32_diagram'] || null,
    solution_image_url: null,
    solution: "In vinyl chloride ($\\text{CH}_2=\\text{CH}-\\text{Cl}$), the lone pair of electrons on the chlorine atom is in resonance with the adjacent $\\text{C}=\\text{C}$ double bond, imparting partial double bond character to the $\\text{C}-\\text{Cl}$ bond. Furthermore, the $sp^2$-hybridized vinyl carbocation ($\\text{CH}_2=\\text{CH}^+$) is extremely unstable. Thus, vinyl chloride cannot form a carbocation with $\\text{AlCl}_3$ and will not undergo Friedel-Crafts reaction. Hence, option (A) is correct."
  },
  {
    qNum: 33,
    exam: "JEE Main 2017 (09 Apr)",
    question: "The major product of the following reaction is :\n$$\\text{1-Methylcyclohexene} \\xrightarrow{\\text{Br}_2 / h\\nu} \\text{Major Product}$$",
    options: [
      "3-Bromo-3-methylcyclohex-1-ene",
      "1,2-Dibromo-1-methylcyclohexane",
      "3-Bromo-1-methylcyclohex-1-ene",
      "6-Bromo-1-methylcyclohex-1-ene"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q33_diagram'] || null,
    solution_image_url: null,
    solution: "Free radical bromination with $\\text{Br}_2/h\\nu$ occurs selectively at the allylic position. Abstraction of hydrogen from the allylic carbon with the methyl substituent produces a tertiary allylic free radical, which is resonance-stabilized and the most stable possible radical intermediate. Bromination at this radical site yields 3-bromo-3-methylcyclohex-1-ene as the major product. Hence, option (A) is correct."
  },
  {
    qNum: 34,
    exam: "JEE Main 2018 (08 Apr)",
    question: "The trans-alkenes are formed by the reduction of alkynes with :",
    options: [
      "$\\text{Sn} - \\text{HCl}$",
      "$\\text{H}_2 - \\text{Pd}/\\text{C}, \\text{BaSO}_4$",
      "$\\text{NaBH}_4$",
      "$\\text{Na}/\\text{liq. }\\text{NH}_3$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Birch reduction of alkynes using sodium in liquid ammonia ($\\text{Na}/\\text{liq. }\\text{NH}_3$) proceeds via anti-addition of hydrogen atoms, producing trans-alkenes stereoselectively. On the other hand, Lindlar's catalyst ($\\text{H}_2-\\text{Pd}/\\text{C}, \\text{BaSO}_4$) gives cis-alkenes. Hence, option (D) is correct."
  },
  {
    qNum: 35,
    exam: "JEE Main 2018 (15 Apr)",
    question: "The increasing order of nitration in the acidic medium of the following compounds is :\n(a) Aniline, (b) Chlorobenzene, (c) Anisole, (d) Toluene",
    options: [
      "(a) < (b) < (d) < (c)",
      "(a) < (b) < (c) < (d)",
      "(b) < (a) < (c) < (d)",
      "(b) < (a) < (d) < (c)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q35_diagram'] || null,
    solution_image_url: null,
    solution: "In acidic nitrating medium:\n1. Aniline is converted into the anilinium ion ($\\text{C}_6\\text{H}_5\\text{NH}_3^+$), which possesses a strong $-I$ deactivating effect, making it the least reactive towards nitration: (a) is lowest.\n2. Chlorobenzene has $-I > +M$, making it deactivated compared to benzene: (b).\n3. Toluene has $+I$ and hyperconjugative activation: (d).\n4. Anisole has strong $+M$ activation from the methoxy group: (c).\nThus, the increasing order of reactivity towards nitration is: (a) < (b) < (d) < (c). Hence, option (A) is correct."
  },
  {
    qNum: 36,
    exam: "JEE Main 2018 (15 Apr, Shift 1)",
    question: "Which of the following will most readily give the dehydrohalogenation product ?",
    options: [
      "(E)-1-bromo-1-phenylprop-1-ene derivative",
      "2-bromobut-1-ene derivative",
      "bromocyclohexane derivative",
      "bromobenzene derivative"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q36_diagram'] || null,
    solution_image_url: null,
    solution: "In compound (A), elimination goes via an $\\text{E1cB}$ mechanism where the carbanion formed upon proton abstraction is strongly stabilized by resonance with both the adjacent phenyl ring and the conjugated system. This makes dehydrohalogenation occur most readily in (A). Hence, option (A) is correct."
  },
  {
    qNum: 37,
    exam: "JEE Main 2018 (15 Apr, Shift 1)",
    question: "The increasing order of nitration of the following compounds is :\n(A) Aniline, (B) Chlorobenzene, (C) Anisole, (D) Toluene",
    options: [
      "(A) < (B) < (D) < (C)",
      "(B) < (C) < (D)",
      "(A) < (C) < (D)",
      "(A) < (D) < (C)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q37_diagram'] || null,
    solution_image_url: null,
    solution: "Due to protonation in strongly acidic nitrating mixture, aniline forms anilinium ion which is strongly deactivated by $-I$ effect. Methoxy (in anisole) is strongly activating ($+M$), methyl (in toluene) is activating via hyperconjugation, and chloro (in chlorobenzene) is deactivating ($-I > +M$). Hence, the reactivity order is: Aniline (A) < Chlorobenzene (B) < Toluene (D) < Anisole (C). Hence, option (A) is correct."
  },
  {
    qNum: 38,
    exam: "JEE Main 2018 (15 Apr, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{3-Methoxyphenol} \\xrightarrow[\\text{(ii) }\\text{AlCl}_3\\text{(anhyd.)}]{\\text{(i) }\\text{ClCH}_2\\text{CH}_2\\text{COCl}} ?$$",
    options: [
      "5-methoxychroman-4-one",
      "7-methoxychroman-4-one",
      "6-methoxychroman-4-one",
      "8-methoxychroman-4-one"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q38_diagram'] || null,
    solution_image_url: null,
    solution: "1. The acyl chloride group ($-\\text{COCl}$) is more reactive than the primary alkyl chloride group, so esterification of the phenolic $-\\text{OH}$ group occurs first to form the aryl ester.\n2. Under anhydrous $\\text{AlCl}_3$ treatment (Fries rearrangement followed by intramolecular Friedel-Crafts alkylation), cyclization takes place at the position ortho to the $-\\text{OH}$ group and para to the methoxy group (due to combined activating effects), producing the chromanone ring derivative shown in Option (C). Hence, option (C) is correct."
  },
  {
    qNum: 39,
    exam: "JEE Main 2018 (15 Apr, Shift 2)",
    question: "The major product formed in the following reaction is :\n$$\\text{4-chloro-2-methylcyclopentyl nitro derivative} \\xrightarrow[\\text{Heat}]{\\text{NaOCH}_3\\,(1\\,\\text{eq.})} ?$$",
    options: [
      "Product (A)",
      "Product (B)",
      "Product (C)",
      "Product (D)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q39_diagram'] || null,
    solution_image_url: null,
    solution: "Upon heating with $\\text{NaOCH}_3$ (1 eq.), dehydrohalogenation occurs with elimination of $\\text{HCl}$. The nitro group ($-\\text{NO}_2$) increases the acidity of the hydrogen on the carbon to which it is attached. Elimination produces a conjugated double bond with the nitro group, giving the thermodynamically most stable product (A). Hence, option (A) is correct."
  },
  {
    qNum: 40,
    exam: "JEE Main 2018 (15 Apr, Shift 2)",
    question: "When 2-butyne is treated with $\\text{H}_2 / \\text{Lindlar's catalyst}$, compound $X$ is produced as the major product and when treated with $\\text{Na} / \\text{liq. }\\text{NH}_3$ it produces $Y$ as the major product. Which of the following statements is correct ?",
    options: [
      "$Y$ will have higher dipole moment and higher boiling point than $X$",
      "$Y$ will have higher dipole moment and lower boiling point than $X$",
      "$X$ will have lower dipole moment and lower boiling point than $Y$",
      "$X$ will have higher dipole moment and higher boiling point than $Y$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "1. Treatment of 2-butyne with $\\text{H}_2/\\text{Lindlar's catalyst}$ gives cis-2-butene ($X$).\n2. Treatment of 2-butyne with $\\text{Na}/\\text{liq. }\\text{NH}_3$ gives trans-2-butene ($Y$).\n3. cis-2-butene has individual bond dipoles reinforcing each other, resulting in a net dipole moment ($\\mu > 0$). In trans-2-butene, the dipoles cancel out ($\\mu = 0$).\n4. Greater dipole moment in cis-2-butene leads to stronger dipole-dipole attractions and consequently a higher boiling point than the trans-isomer. Therefore, $X$ has higher dipole moment and higher boiling point than $Y$. Hence, option (D) is correct."
  },
  {
    qNum: 41,
    exam: "JEE Main 2018 (16 Apr)",
    question: "The major product of the following reaction is :\n$$\\text{3-Methoxyphenol} \\xrightarrow[\\text{(ii) }\\text{H}_2\\text{SO}_4,\\,\\text{heat}]{\\text{(i) }\\text{OHCCH}_2\\text{COCl}} ?$$",
    options: [
      "5-methoxy-2H-chromen-2-one derivative",
      "7-methoxy-2H-chromen-2-one (coumarin derivative)",
      "6-methoxy-2H-chromen-2-one derivative",
      "8-methoxy-2H-chromen-2-one derivative"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q41_diagram'] || null,
    solution_image_url: null,
    solution: "In 3-methoxyphenol, electrophilic attack by the formylacyl group occurs preferentially at the position ortho to $-\\text{OH}$ and para to $-\\text{OCH}_3$ (the least hindered and most activated position). Subsequent acid-catalyzed dehydration and cyclization produces the 7-methoxy coumarin derivative shown in structure (B). Hence, option (B) is correct."
  },
  {
    qNum: 42,
    exam: "JEE Main 2019 (09 Jan, Shift 1)",
    question: "The compounds $A$ and $B$ in the following reaction are, respectively :\n$$\\text{Benzene} \\xrightarrow{\\text{HCHO} + \\text{HCl}} A \\xrightarrow{\\text{AgCN}} B$$",
    options: [
      "$A = \\text{Benzyl alcohol},\\; B = \\text{Benzyl isocyanide}$",
      "$A = \\text{Benzyl chloride},\\; B = \\text{Benzyl isocyanide}$",
      "$A = \\text{Benzyl alcohol},\\; B = \\text{Benzyl cyanide}$",
      "$A = \\text{Benzyl chloride},\\; B = \\text{Benzyl cyanide}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "1. Chloromethylation (Blanc reaction) of benzene with $\\text{HCHO} + \\text{HCl}$ in the presence of $\\text{ZnCl}_2$ yields benzyl chloride ($A = \\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}$).\n2. Reaction of benzyl chloride with $\\text{AgCN}$ produces benzyl isocyanide ($B = \\text{C}_6\\text{H}_5\\text{CH}_2\\text{NC}$) because $\\text{AgCN}$ is predominantly covalent and the attack occurs via the lone pair on the nitrogen atom. Hence, option (B) is correct."
  },
  {
    qNum: 43,
    exam: "JEE Main 2019 (10 Jan, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{1,3-dibromo-1-phenylbutane} \\xrightarrow[\\Delta]{\\text{KOH alcohol (excess)}} \\text{Major Product}$$",
    options: [
      "1-phenylbuta-1,3-diene derivative (A)",
      "1-phenylbuta-1,3-diene derivative (B)",
      "1-phenylbuta-1,3-diene (conjugated diene, C)",
      "1-phenylbuta-1,3-diene derivative (D)"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q43_diagram'] || null,
    solution_image_url: null,
    solution: "Treatment of 1,3-dibromo-1-phenylbutane with excess alcoholic $\\text{KOH}$ undergoes double dehydrobromination following Saytzeff's rule. The resulting diene is conjugated both across the double bonds and with the benzene ring (extended conjugation), providing maximum thermodynamic stability to product (C). Hence, option (C) is correct."
  },
  {
    qNum: 44,
    exam: "JEE Main 2019 (10 Jan, Shift 1)",
    question: "Which hydrogen in compound ($E$) is easily replaceable during bromination reaction in presence of light ?\n$$\\text{CH}_3(\\delta) - \\text{CH}_2(\\gamma) - \\text{CH}(\\beta) = \\text{CH}_2(\\alpha)$$",
    options: [
      "$\\beta$ - hydrogen",
      "$\\delta$ - hydrogen",
      "$\\alpha$ - hydrogen",
      "$\\gamma$ - hydrogen"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Free radical bromination selectively abstracts the allylic hydrogen atom. The $\\gamma$-position ($-\\text{CH}_2-$) is directly adjacent to the $\\text{C}=\\text{C}$ double bond (allylic position). Abstraction of a $\\gamma$-hydrogen generates a resonance-stabilized allylic free radical:\n$$\\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}=\\text{CH}_2 \\longleftrightarrow \\text{CH}_3-\\text{CH}=\\text{CH}-\\dot{\\text{C}}\\text{H}_2$$\nHence, the $\\gamma$-hydrogen is most easily replaced. Option (D) is correct."
  },
  {
    qNum: 45,
    exam: "JEE Main 2019 (10 Jan, Shift 2)",
    question: "What will be the major product in the following mononitration reaction ?\n$$\\text{Benzanilide} \\xrightarrow{\\text{HNO}_3 / \\text{conc. }\\text{H}_2\\text{SO}_4} ?$$",
    options: [
      "4-nitrobenzanilide (nitration on the anilino ring, A)",
      "4'-nitrobenzanilide (nitration on the benzoyl ring, B)",
      "3-nitrobenzanilide (C)",
      "2-nitrobenzanilide (D)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q45_diagram'] || null,
    solution_image_url: null,
    solution: "In benzanilide ($\\text{C}_6\\text{H}_5-\\text{NH}-\\text{CO}-\\text{C}_6\\text{H}_5$):\n- The left benzene ring is attached to $-\\text{NH}-$, which has a lone pair of electrons and activates the ring through $+M$ resonance (ortho/para directing).\n- The right benzene ring is attached to $-\\text{CO}-$, which withdraws electrons through $-M$ resonance and deactivates the ring.\nTherefore, electrophilic nitration occurs exclusively on the more electron-rich left ring at the para position (due to steric hindrance at ortho), giving 4-nitrobenzanilide (A). Hence, option (A) is correct."
  },
  {
    qNum: 46,
    exam: "JEE Main 2019 (11 Jan, Shift 2)",
    question: "Which of the following compounds reacts with ethylmagnesium bromide and also decolourizes bromine water solution ?",
    options: [
      "2-cyanocyclohexanone derivative (A)",
      "ester derivative (B)",
      "allyl phenyl ether derivative (C)",
      "2-allylphenol derivative (D)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q46_diagram'] || null,
    solution_image_url: null,
    solution: "Compound (D) is 2-allylphenol:\n1. It contains an active acidic phenolic hydrogen ($-\\text{OH}$) which reacts quantitatively with the Grignard reagent ($\\text{EtMgBr}$) to liberate ethane gas:\n$$\\text{Ar-OH} + \\text{EtMgBr} \\rightarrow \\text{Ar-OMgBr} + \\text{C}_2\\text{H}_6$$\n2. It contains an allylic carbon-carbon double bond ($-\\text{CH}=\\text{CH}_2$) which adds $\\text{Br}_2$ across the double bond, rapidly decolourizing bromine water.\nHence, option (D) is correct."
  },
  {
    qNum: 47,
    exam: "JEE Main 2019 (11 Jan, Shift 2)",
    question: "Which of the following compounds will produce a precipitate with $\\text{AgNO}_3$ ?",
    options: [
      "2-bromopyridine (A)",
      "7-bromocyclohepta-1,3,5-triene (tropylium bromide, B)",
      "bromobenzene (C)",
      "bromocyclohexane (D)"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q47_diagram'] || null,
    solution_image_url: null,
    solution: "Only halides that ionize easily to generate a highly stable carbocation precipitate readily with silver nitrate ($\\text{AgNO}_3$). In 7-bromocyclohepta-1,3,5-triene (compound B), ionization of bromide ion generates the tropylium cation ($\\text{C}_7\\text{H}_7^+$), which possesses $6\\pi$ electrons delocalized over 7 carbons in a planar cyclic ring and is exceptionally stable due to aromaticity ($4n+2$, $n=1$). Thus, it readily forms a pale yellow $\\text{AgBr}$ precipitate. Hence, option (B) is correct."
  },
  {
    qNum: 48,
    exam: "JEE Main 2019 (12 Jan, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{1-(3-methoxyphenyl)pent-4-ene} \\xrightarrow[(2)\\;\\text{AlCl}_3\\text{ (anhydrous)}]{(1)\\;\\text{Cl}_2 / \\text{CCl}_4} ?$$",
    options: [
      "6-membered tetralin derivative (A)",
      "6-membered tetralin derivative (B)",
      "5-membered indane derivative (C)",
      "5-membered indane derivative (D)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q48_diagram'] || null,
    solution_image_url: null,
    solution: "1. Addition of chlorine to the terminal alkene double bond gives the 1,2-dichloro derivative.\n2. In the presence of Lewis acid $\\text{AlCl}_3$, chloride abstraction occurs preferentially to generate the more stable secondary carbocation at C-4.\n3. Intramolecular electrophilic aromatic attack of this carbocation onto the electron-rich anisole ring occurs para to the $-\\text{OCH}_3$ group, forming a stable five-membered indane ring derivative (D). Hence, option (D) is correct."
  },
  {
    qNum: 49,
    exam: "JEE Main 2019 (12 Jan, Shift 2)",
    question: "The major product of the following reaction is :\n$$\\text{Fischer projection: ethyl 2-chloro-2-methylbutanoate} \\xrightarrow[\\Delta]{\\text{NaOEt}} ?$$",
    options: [
      "Substitution product (A)",
      "Terminal alkene product (B)",
      "Z-Saytzeff alkene product (C)",
      "Ether substitution product (D)"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q49_diagram'] || null,
    solution_image_url: null,
    solution: "Treatment with $\\text{NaOEt}$ brings about an $E2$ elimination. With moderate leaving group $\\text{Cl}^-$, the reaction follows Saytzeff's rule to produce the most substituted, conjugated, thermodynamically stable alkene:\n$$\\text{CH}_3-\\text{C}(\\text{CH}_3)=\\text{C(H)}-\\text{COOCH}_2\\text{CH}_3$$\nThe double bond is conjugated with the ester carbonyl group, providing maximum stabilization (structure C). Hence, option (C) is correct."
  },
  {
    qNum: 50,
    exam: "JEE Main 2019 (12 Jan, Shift 2)",
    question: "The major product of the following reaction is :\n$$\\text{CH}_3\\text{CH}_2\\text{CH(Br)CH}_2\\text{Br} \\xrightarrow[\\text{(ii) NaNH}_2\\text{ in liq. NH}_3]{\\text{(i) KOH alcohol}} ?$$",
    options: [
      "$\\text{CH}_3\\text{CH}_2\\text{CH(NH}_2)\\text{CH}_2\\text{NH}_2$",
      "$\\text{CH}_3\\text{CH}=\\text{CHCH}_2\\text{NH}_2$",
      "$\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CH}$",
      "$\\text{CH}_3\\text{CH}=\\text{C}=\\text{CH}_2$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q50_diagram'] || null,
    solution_image_url: null,
    solution: "1. Treatment of 1,2-dibromobutane with alcoholic $\\text{KOH}$ brings about the first dehydrobromination, giving 1-bromobut-1-ene (or 2-bromobut-1-ene).\n2. Subsequent treatment with the very strong base sodamide in liquid ammonia ($\\text{NaNH}_2/\\text{liq. }\\text{NH}_3$) causes the second elimination to form terminal alkyne but-1-yne ($\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CH}$), which is deprotonated to the sodium acetylide salt and regenerated upon workup. Hence, option (C) is correct."
  },
  {
    qNum: 51,
    exam: "JEE Main 2019 (08 Apr, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{1-methoxy-3-vinylbenzene} \\xrightarrow[\\text{heat}]{\\text{Conc. HBr (excess)}} ?$$",
    options: [
      "3-(1-bromoethyl)phenol (A)",
      "3-(2-bromoethyl)phenol (B)",
      "1-bromo-3-(1-bromoethyl)benzene (C)",
      "1-bromo-3-(2-bromoethyl)benzene (D)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q51_diagram'] || null,
    solution_image_url: null,
    solution: "1. Electrophilic addition of $\\text{HBr}$ across the vinyl double bond follows Markovnikov's rule to give a stable benzylic carbocation, yielding the 1-bromoethyl derivative: $-\\text{CH(Br)}-\\text{CH}_3$.\n2. Excess concentrated $\\text{HBr}$ at elevated temperature cleaves the alkyl aryl ether bond ($\\text{Ar}-\\text{O}-\\text{CH}_3 \\rightarrow \\text{Ar}-\\text{OH} + \\text{CH}_3\\text{Br}$) via an $S_N2$ displacement on the methyl carbon by $\\text{Br}^-$.\nThus, the final major product is 3-(1-bromoethyl)phenol (structure A). Hence, option (A) is correct."
  },
  {
    qNum: 52,
    exam: "JEE Main 2019 (08 Apr, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{Phthalic anhydride} + \\text{Chlorobenzene} \\xrightarrow[\\text{(ii) H}_2\\text{O}]{\\text{(i) AlCl}_3\\text{, heat}} ?$$",
    options: [
      "2-chloroanthracene-9,10-dione (A)",
      "2-(4-chlorobenzoyl)benzoic acid (B)",
      "2-(3-chlorobenzoyl)benzoic acid (C)",
      "Anthraquinone derivative (D)"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q52_diagram'] || null,
    solution_image_url: null,
    solution: "In the Friedel-Crafts acylation of chlorobenzene with phthalic anhydride, the chlorine atom on the benzene ring is ortho/para-directing ($+M > -I$). Attack occurs preferentially at the less sterically hindered para position to give 2-(4-chlorobenzoyl)benzoic acid after aqueous workup. Hence, option (B) is correct."
  },
  {
    qNum: 53,
    exam: "JEE Main 2019 (08 Apr, Shift 2)",
    question: "Which one of the following alkenes when treated with $\\text{HCl}$ yields majorly an anti-Markovnikov product ?",
    options: [
      "$\\text{CH}_3\\text{O}-\\text{CH}=\\text{CH}_2$",
      "$\\text{Cl}-\\text{CH}=\\text{CH}_2$",
      "$\\text{H}_2\\text{N}-\\text{CH}=\\text{CH}_2$",
      "$\\text{F}_3\\text{C}-\\text{CH}=\\text{CH}_2$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The $-\\text{CF}_3$ group has a very powerful electron-withdrawing inductive effect ($-I$). If $\\text{H}^+$ were to add to the terminal carbon to form the secondary carbocation $\\text{CF}_3-\\text{CH}^+-\\text{CH}_3$, the positive charge would be directly adjacent to the strongly electron-withdrawing $-\\text{CF}_3$ group, which is highly destabilized. Instead, $\\text{H}^+$ adds to the internal carbon to form the primary carbocation $\\text{CF}_3-\\text{CH}_2-\\text{CH}_2^+$. Subsequent attack of $\\text{Cl}^-$ gives $\\text{CF}_3\\text{CH}_2\\text{CH}_2\\text{Cl}$ (anti-Markovnikov product). Hence, option (D) is correct."
  },
  {
    qNum: 54,
    exam: "JEE Main 2019 (08 Apr, Shift 2)",
    question: "Polysubstitution is a major drawback in :",
    options: [
      "Reimer Tiemann reaction",
      "Friedel Craft's alkylation",
      "Acetylation of aniline",
      "Friedel Craft's acylation"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "In Friedel-Crafts alkylation, introducing an alkyl group (such as $-\\text{CH}_3$) onto the aromatic ring activates the ring towards further electrophilic substitution due to $+I$ and hyperconjugative electron donation. As a result, the monoalkylated product is more reactive than the starting benzene itself, leading to polyalkylation (poly-substitution). In Friedel-Crafts acylation, the introduced acyl group is electron-withdrawing and deactivates the ring, preventing polyacylation. Hence, option (B) is correct."
  },
  {
    qNum: 55,
    exam: "JEE Main 2019 (09 Apr, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{1-(4-chlorophenyl)-2-chloropropane} \\xrightarrow[(2)\\;\\text{Free radical polymerisation}]{(1)\\;\\text{KOH (alc.)}} ?$$",
    options: [
      "Polymer structure (A)",
      "Polymer structure (B)",
      "Polymer structure (C)",
      "Polymer structure (D)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q55_diagram'] || null,
    solution_image_url: null,
    solution: "1. Treatment with alcoholic $\\text{KOH}$ undergoes an $E2$ elimination. Dehydrochlorination from 1-(4-chlorophenyl)-2-chloropropane forms 1-(4-chlorophenyl)prop-1-ene as the major product because the double bond is conjugated with the aromatic ring.\n2. Free radical polymerization of this alkene links the vinyl carbons into a polyalkylene chain with repeating units bearing $-\\text{CH}_3$ and the 4-chlorophenyl group, giving polymer structure (A). Hence, option (A) is correct."
  },
  {
    qNum: 56,
    exam: "JEE Main 2019 (09 Apr, Shift 1)",
    question: "The major product of the following reaction is :\n$$\\text{CH}_3-\\text{C}\\equiv\\text{CH} \\xrightarrow[\\text{(ii) DI}]{\\text{(i) DCl (1 equiv.)}} ?$$",
    options: [
      "$\\text{CH}_3\\text{CD(I)CHD(Cl)}$",
      "$\\text{CH}_3\\text{CD(Cl)CHD(I)}$",
      "$\\text{CH}_3\\text{CD}_2\\text{CH(Cl)(I)}$",
      "$\\text{CH}_3\\text{C(I)(Cl)CHD}_2$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Both electrophilic additions follow Markovnikov's rule:\n1. In the first step, $\\text{D}^+$ adds to the terminal carbon to form the more stable vinyl carbocation $\\text{CH}_3-\\text{C}^+=\\text{CHD}$. Attack by $\\text{Cl}^-$ gives 2-chloroprop-1-ene-1-d: $\\text{CH}_3-\\text{C(Cl)}=\\text{CHD}$.\n2. In the second step, $\\text{D}^+$ adds again to the terminal carbon, forming the resonance-stabilized carbocation $\\text{CH}_3-\\text{C}^+(\\text{Cl})-\\text{CHD}_2$ (stabilized by chlorine lone-pair back-donation). Attack by $\\text{I}^-$ gives $\\text{CH}_3\\text{C(I)(Cl)CHD}_2$. Hence, option (D) is correct."
  },
  {
    qNum: 57,
    exam: "JEE Main 2019 (10 Apr, Shift 1)",
    question: "The increasing order of the reactivity of the following compounds towards electrophilic aromatic substitution reactions is :\n(I) Chlorobenzene, (II) Toluene, (III) Acetophenone",
    options: [
      "II < I < III",
      "III < II < I",
      "III < I < II",
      "I < III < II"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q57_diagram'] || null,
    solution_image_url: null,
    solution: "1. Acetophenone (III) has a strong $-M$ and $-I$ electron-withdrawing acetyl group, making it strongly deactivated and the least reactive.\n2. Chlorobenzene (I) has net electron-withdrawing deactivation ($-I > +M$), but is less deactivated than acetophenone.\n3. Toluene (II) has an electron-donating methyl group ($+I$ and hyperconjugation) which activates the ring towards electrophilic attack.\nThus, the increasing reactivity order is: III < I < II. Hence, option (C) is correct."
  },
  {
    qNum: 58,
    exam: "JEE Main 2019 (10 Apr, Shift 2)",
    question: "The major product obtained in the given reaction is :\n$$\\text{1-(3-chloropropoxy)-3-methylbenzene} \\xrightarrow{\\text{AlCl}_3} \\text{Product}$$",
    options: [
      "Product (A)",
      "Product (B)",
      "Product (C)",
      "7-methylchromane derivative (D)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q58_diagram'] || null,
    solution_image_url: null,
    solution: "Treatment with Lewis acid $\\text{AlCl}_3$ abstracts the chlorine atom from the 3-chloropropoxy side chain to form an electrophilic carbon complex/carbocation. Intramolecular Friedel-Crafts alkylation onto the benzene ring takes place at the position para to the methyl group and ortho to the ether oxygen (most activated position), cyclizing to form a stable 6-membered chromane ring system (structure D). Hence, option (D) is correct."
  },
  {
    qNum: 59,
    exam: "JEE Main 2019 (12 Apr, Shift 1)",
    question: "But-2-ene on reaction with alkaline $\\text{KMnO}_4$ at elevated temperature followed by acidification will give :",
    options: [
      "2 molecules of $\\text{CH}_3\\text{COOH}$",
      "$\\text{CH}_3\\text{CH(OH)CH(OH)CH}_3$",
      "2 Molecules of $\\text{CH}_3\\text{CHO}$",
      "One molecule of $\\text{CH}_3\\text{CHO}$ and one molecule of $\\text{CH}_3\\text{COOH}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "At elevated temperature (hot alkaline $\\text{KMnO}_4$), oxidative cleavage of the $\\text{C}=\\text{C}$ double bond occurs rather than simple syn-dihydroxylation. Symmetrical but-2-ene ($\\text{CH}_3\\text{CH}=\\text{CHCH}_3$) is cleaved and oxidized completely to two molecules of acetic acid:\n$$\\text{CH}_3\\text{CH}=\\text{CHCH}_3 \\xrightarrow{\\text{KMnO}_4, \\Delta / \\text{H}^+} 2\\,\\text{CH}_3\\text{COOH}$$\nHence, option (A) is correct."
  },
  {
    qNum: 60,
    exam: "JEE Main 2019 (12 Apr, Shift 1)",
    question: "The major product of the following addition reaction is :\n$$\\text{H}_3\\text{C}-\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{Cl}_2 / \\text{H}_2\\text{O}} ?$$",
    options: [
      "$\\text{CH}_3\\text{COCH}_3$",
      "$\\text{H}_3\\text{C}-\\text{CH(OH)}-\\text{CH}_2\\text{Cl}$",
      "Propylene oxide",
      "$\\text{H}_3\\text{C}-\\text{CH(Cl)}-\\text{CH}_2\\text{OH}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Hydrocarbons",
    exam_type: "JEE",
    image_url: diagramUrls['q60_diagram'] || null,
    solution_image_url: null,
    solution: "Halohydrin formation with chlorine water proceeds via a cyclic chloronium ion intermediate. Water acts as the nucleophile and attacks the more substituted secondary carbon (which bears greater partial positive charge) from the opposite side, opening the three-membered ring. Subsequent deprotonation gives 1-chloropropan-2-ol ($\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2\\text{Cl}$). Hence, option (B) is correct."
  }
];

const outPath = path.resolve(__dirname, 'clean_hydro_part1.mjs');
const fileContent = `export const HYDRO_PART1 = ${JSON.stringify(part1Questions, null, 2)};\n`;
fs.writeFileSync(outPath, fileContent, 'utf8');
console.log(`Successfully generated clean_hydro_part1.mjs with ${part1Questions.length} questions!`);
