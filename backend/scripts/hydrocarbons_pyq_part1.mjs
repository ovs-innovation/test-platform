import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/hydrocarbons_diagram_urls.json', 'utf8'));

export const part1Questions = [
  {
    question_number: 1,
    question_text: "Given below are two statements:\n\nStatement I: trans-But-2-ene upon treatment with $\\text{Br}_2$ in $\\text{CCl}_4$ gives the following product:\n\n![Statement I and II](" + urls.q1_diag + ")\n\nStatement II: cis-But-2-ene upon treatment with alkaline $\\text{KMnO}_4$ gives the following product.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below.",
    options: [
      { option_key: "A", option_text: "Statement I is incorrect but Statement II is correct" },
      { option_key: "B", option_text: "Both Statement I and Statement II are correct" },
      { option_key: "C", option_text: "Both Statement I and Statement II are incorrect" },
      { option_key: "D", option_text: "Statement I is correct but Statement II is incorrect" }
    ],
    correct_option: "A",
    solution_text: "Anti-addition of $\\text{Br}_2$ across a symmetrical trans-alkene (trans-but-2-ene) yields the achiral meso-form (meso-2,3-dibromobutane). The product shown in Statement I has identical configurations at both chiral carbons giving an optically active enantiomer rather than meso, so Statement I is incorrect. Syn-hydroxylation of cis-but-2-ene with cold alkaline $\\text{KMnO}_4$ (Baeyer's reagent) adds two $-\\text{OH}$ groups from the same face, yielding meso-butane-2,3-diol, which matches Statement II. Therefore, Statement I is incorrect but Statement II is correct."
  },
  {
    question_number: 2,
    question_text: "Among the following, the compound having conjugated double bonds is:",
    options: [
      { option_key: "A", option_text: "hepta-1,6-diene" },
      { option_key: "B", option_text: "hepta-1,3-diene" },
      { option_key: "C", option_text: "hepta-1,4-diene" },
      { option_key: "D", option_text: "hepta-1,5-diene" }
    ],
    correct_option: "B",
    solution_text: "Conjugated double bonds are separated by exactly one carbon-carbon single bond ($-\\text{C}=\\text{C}-\\text{C}=\\text{C}-$). In hepta-1,3-diene, $\\text{CH}_2=\\text{CH}-\\text{CH}=\\text{CH}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$, the double bonds are conjugated at positions 1 and 3."
  },
  {
    question_number: 3,
    question_text: "Consider the following reaction sequences and choose the correct option:\n\n![Reaction Sequences](" + urls.q3_diag + ")",
    options: [
      { option_key: "A", option_text: "M and N are stereoisomers" },
      { option_key: "B", option_text: "K and L are geometrical isomers" },
      { option_key: "C", option_text: "K and L are enantiomers" },
      { option_key: "D", option_text: "M and N are geometrical isomers" }
    ],
    correct_option: "B",
    solution_text: "Controlled catalytic hydrogenation of 2-butyne over $\\text{Pd}/\\text{C}$ poisoned with quinoline (Lindlar's catalyst) undergoes syn-addition to yield cis-but-2-ene (K). Reduction of 2-butyne with sodium in liquid ammonia (Birch reduction) proceeds via trans-addition to yield trans-but-2-ene (L). Cis- and trans-isomers are diastereomeric stereoisomers with restricted rotation, known as geometrical isomers."
  },
  {
    question_number: 4,
    question_text: "The number of chlorine atoms present in the organic products X and Y of the following reactions, respectively, are:\n\n![Chlorination Reactions](" + urls.q4_diag + ")",
    options: [
      { option_key: "A", option_text: "3 and 3" },
      { option_key: "B", option_text: "6 and 3" },
      { option_key: "C", option_text: "6 and 6" },
      { option_key: "D", option_text: "3 and 6" }
    ],
    correct_option: "C",
    solution_text: "In the presence of excess $\\text{Cl}_2$ and anhydrous $\\text{AlCl}_3$ in the dark and cold, benzene undergoes exhaustive electrophilic substitution to form hexachlorobenzene ($\\text{C}_6\\text{Cl}_6$, product X), containing 6 chlorine atoms. Under photochemical conditions ($\\text{UV}/500\\text{ K}$), benzene adds 3 molecules of chlorine across the rings via free-radical addition to yield benzene hexachloride ($\\text{C}_6\\text{H}_6\\text{Cl}_6$, BHC/gammaxene, product Y), which also contains 6 chlorine atoms."
  },
  {
    question_number: 5,
    question_text: "Which one of the following reactions does NOT give benzene as the product?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q5_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q5_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q5_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q5_opt_d + ")" }
    ],
    correct_option: "B",
    solution_text: "Cyclic polymerization of ethyne over a red hot iron tube at $873\\text{ K}$ yields benzene (A). Heating phenol with zinc dust reduces it to benzene (C). Catalytic aromatization of n-hexane over $\\text{Mo}_2\\text{O}_3$ at $773\\text{ K}$ and $10-20\\text{ atm}$ gives benzene (D). Reaction (B) does not produce benzene."
  },
  {
    question_number: 6,
    question_text: "Which one of the following compounds does not decolourize bromine water?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q6_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q6_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q6_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q6_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Benzene has an extraordinarily stable aromatic $\\pi$-electron sextet (aromatic resonance stabilization) and does not undergo electrophilic addition reactions under ordinary conditions; hence it does not decolourize bromine water. In contrast, alkenes, cyclohexene derivatives, and styrene undergo addition reactions with aqueous bromine."
  },
  {
    question_number: 7,
    question_text: "Predict the major product 'P' in the following sequence of reactions:\n\n![Reaction Scheme](" + urls.q7_diag + ")",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q7_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q7_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q7_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q7_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "1. Addition of $\\text{HBr}$ in the presence of benzoyl peroxide proceeds by a free-radical anti-Markovnikov mechanism to give the primary alkyl bromide at the terminal position.\n2. Nucleophilic substitution with $\\text{KCN}$ replaces $-\\text{Br}$ with $-\\text{C}\\equiv\\text{N}$, extending the carbon chain by one.\n3. Reduction with $\\text{Na(Hg)}/\\text{C}_2\\text{H}_5\\text{OH}$ (Mendius reaction) reduces $-\\text{C}\\equiv\\text{N}$ to a primary amine $-\\text{CH}_2\\text{NH}_2$, giving product C."
  },
  {
    question_number: 8,
    question_text: "Given below are two statements:\n\nStatement I: Propene on treatment with diborane gives an addition product with the formula $(( \\text{CH}_3)_2\\text{CH})_3\\text{B}$.\n\nStatement II: Oxidation of $(( \\text{CH}_3)_2\\text{CH})_3\\text{B}$ with hydrogen peroxide in presence of $\\text{NaOH}$ gives propan-2-ol.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      { option_key: "A", option_text: "Statement I is correct but Statement II is incorrect" },
      { option_key: "B", option_text: "Statement I is incorrect but Statement II is correct" },
      { option_key: "C", option_text: "Both Statement I and Statement II are correct" },
      { option_key: "D", option_text: "Both Statement I and Statement II are incorrect" }
    ],
    correct_option: "B",
    solution_text: "During hydroboration, the boron atom attaches predominantly to the less substituted (terminal) carbon atom of propene due to steric and electronic factors, giving tri-n-propylborane $(\\text{CH}_3\\text{CH}_2\\text{CH}_2)_3\\text{B}$, not triisopropylborane $(( \\text{CH}_3)_2\\text{CH})_3\\text{B}$. Thus, Statement I is incorrect. However, oxidation of triisopropylborane $(( \\text{CH}_3)_2\\text{CH})_3\\text{B}$ with alkaline $\\text{H}_2\\text{O}_2$ converts each isopropyl group to propan-2-ol, making Statement II chemically correct as stated."
  },
  {
    question_number: 9,
    question_text: "Baeyer's reagent is:",
    options: [
      { option_key: "A", option_text: "Acidic potassium permanganate solution" },
      { option_key: "B", option_text: "Acidic potassium dichromate solution" },
      { option_key: "C", option_text: "Cold, dilute, aqueous solution of potassium permanganate" },
      { option_key: "D", option_text: "Hot, concentrated solution of potassium permanganate" }
    ],
    correct_option: "C",
    solution_text: "Baeyer's reagent is a cold, dilute, alkaline (or neutral aqueous) solution of potassium permanganate ($\\text{KMnO}_4$), used for testing unsaturation (double and triple bonds) in organic compounds via syn-dihydroxylation."
  },
  {
    question_number: 10,
    question_text: "The alkane that can be oxidized to the corresponding alcohol by $\\text{KMnO}_4$ as per the equation:\n\n$$\\begin{matrix} R_1 \\\\ | \\\\ R_2 - C - H \\\\ | \\\\ R_3 \\end{matrix} \\xrightarrow{\\text{KMnO}_4} \\begin{matrix} R_1 \\\\ | \\\\ R_2 - C - \\text{OH} \\\\ | \\\\ R_3 \\end{matrix}$$\n\nis, when:",
    options: [
      { option_key: "A", option_text: "$R_1 = \\text{H}; R_2 = \\text{H}; R_3 = \\text{H}$" },
      { option_key: "B", option_text: "$R_1 = \\text{CH}_3; R_2 = \\text{CH}_3; R_3 = \\text{CH}_3$" },
      { option_key: "C", option_text: "$R_1 = \\text{CH}_3; R_2 = \\text{H}; R_3 = \\text{H}$" },
      { option_key: "D", option_text: "$R_1 = \\text{CH}_3; R_2 = \\text{CH}_3; R_3 = \\text{H}$" }
    ],
    correct_option: "B",
    solution_text: "Alkanes containing a tertiary ($3^\\circ$) hydrogen atom resist attack by normal oxidizing agents but can be oxidized by potassium permanganate ($\\text{KMnO}_4$) to corresponding tertiary alcohols. Isobutane (2-methylpropane, where $R_1=R_2=R_3=\\text{CH}_3$) is oxidized to 2-methylpropan-2-ol (tert-butyl alcohol)."
  },
  {
    question_number: 11,
    question_text: "Given below are two statements:\n\nStatement I: The boiling point of three isomeric pentanes follows the order:\n$$\\text{n-pentane} > \\text{isopentane} > \\text{neopentane}$$\n\nStatement II: When branching increases, the molecule attains a shape of sphere. This results in smaller surface area for contact, due to which the intermolecular forces between the spherical molecules are weak, thereby lowering the boiling point.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      { option_key: "A", option_text: "Both Statement I and Statement II are correct" },
      { option_key: "B", option_text: "Both Statement I and Statement II are incorrect" },
      { option_key: "C", option_text: "Statement I is correct but Statement II is incorrect" },
      { option_key: "D", option_text: "Statement I is incorrect but Statement II is correct" }
    ],
    correct_option: "A",
    solution_text: "Both statements are correct. With increase in branching, the molecular surface area decreases as the molecule approaches a spherical geometry. Smaller surface area leads to weaker intermolecular van der Waals forces of attraction, resulting in a lower boiling point. Thus, boiling points decrease in the order: $\\text{n-pentane} (309.1\\text{ K}) > \\text{isopentane} (301\\text{ K}) > \\text{neopentane} (282.5\\text{ K})$."
  },
  {
    question_number: 12,
    question_text: "The decreasing order of boiling points of the following alkanes is:\n(a) heptane\n(b) butane\n(c) 2-methylbutane\n(d) 2-methylpropane\n(e) hexane\n\nChoose the correct answer from the options given below:",
    options: [
      { option_key: "A", option_text: "(a) > (e) > (c) > (b) > (d)" },
      { option_key: "B", option_text: "(a) > (c) > (e) > (d) > (b)" },
      { option_key: "C", option_text: "(c) > (d) > (a) > (e) > (b)" },
      { option_key: "D", option_text: "(a) > (e) > (b) > (c) > (d)" }
    ],
    correct_option: "A",
    solution_text: "Boiling points increase with molecular mass (number of carbon atoms) and decrease with branching:\n- Heptane (7 carbons): highest boiling point (~$371\\text{ K}$)\n- Hexane (6 carbons): ~$342\\text{ K}$\n- 2-Methylbutane (5 carbons branched): ~$301\\text{ K}$\n- Butane (4 carbons unbranched): ~$272.5\\text{ K}$\n- 2-Methylpropane (4 carbons branched): ~$261\\text{ K}$\nThus, the correct decreasing order is $(a) > (e) > (c) > (b) > (d)$."
  },
  {
    question_number: 13,
    question_text: "The products A and B in the following reaction sequence are:\n\n![Reaction Sequence](" + urls.q13_diag + ")",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q13_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q13_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q13_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q13_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "1. The aryl bromide reacts with $\\text{Mg}$ in dry ether to form the Grignard reagent, which reacts with $\\text{CO}_2$ followed by acid workup ($\\text{H}_3\\text{O}^+$) to yield the carboxylic acid (Product A).\n2. Treatment of the carboxylic acid with $\\text{SOCl}_2$ converts the $-\\text{COOH}$ group into an acyl chloride ($-\\text{COCl}$), which on reaction with methylamine ($\\text{CH}_3\\text{NH}_2$) gives the N-methylamide (Product B)."
  },
  {
    question_number: 14,
    question_text: "The incorrect method for the synthesis of alkenes is:",
    options: [
      { option_key: "A", option_text: "Treating vicinal dihalides with Zn metal" },
      { option_key: "B", option_text: "Treating of alkynes with Na in liquid $\\text{NH}_3$" },
      { option_key: "C", option_text: "Heating alkyl halides with alcoholic KOH" },
      { option_key: "D", option_text: "Treating alkyl halides in aqueous KOH solution" }
    ],
    correct_option: "D",
    solution_text: "Treating alkyl halides with aqueous $\\text{KOH}$ undergoes nucleophilic substitution ($S_N2$ or $S_N1$) to produce alcohols, not alkenes. To synthesize alkenes via dehydrohalogenation (elimination), alcoholic $\\text{KOH}$ is required."
  },
  {
    question_number: 15,
    question_text: "Compound X on reaction with $\\text{O}_3$ followed by $\\text{Zn}/\\text{H}_2\\text{O}$ gives formaldehyde and 2-methylpropanal as products. The compound X is:",
    options: [
      { option_key: "A", option_text: "3-Methylbut-1-ene" },
      { option_key: "B", option_text: "2-Methylbut-1-ene" },
      { option_key: "C", option_text: "2-Methylbut-2-ene" },
      { option_key: "D", option_text: "Pent-2-ene" }
    ],
    correct_option: "A",
    solution_text: "Joining the carbonyl carbons of the ozonolysis products by a double bond:\n$$\\text{H}_2\\text{C}=\\text{O} + \\text{O}=\\text{CH}-\\text{CH}(\\text{CH}_3)_2 \\rightarrow \\text{H}_2\\text{C}=\\text{CH}-\\text{CH}(\\text{CH}_3)_2$$\nThis compound is 3-methylbut-1-ene."
  },
  {
    question_number: 16,
    question_text: "Which of the following compound is most reactive in electrophilic aromatic substitution?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q16_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q16_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q16_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q16_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Phenol (A) contains an $-\\text{OH}$ group, which is a powerful activating group due to strong $+M$ (resonance donation of lone pair electrons) effect on the benzene ring, significantly increasing electron density and accelerating electrophilic substitution compared to benzene, chlorobenzene (deactivating due to $-I$), and nitrobenzene (strongly deactivating $-M, -I$)."
  },
  {
    question_number: 17,
    question_text: "Which of the following is a free radical substitution reaction?",
    options: [
      { option_key: "A", option_text: "Propene with $\\text{HBr}/(\\text{C}_6\\text{H}_5\\text{COO})_2$" },
      { option_key: "B", option_text: "Benzene with $\\text{Br}_2/\\text{AlCl}_3$" },
      { option_key: "C", option_text: "Acetylene with $\\text{HBr}$" },
      { option_key: "D", option_text: "Methane with $\\text{Br}_2/h\\nu$" }
    ],
    correct_option: "D",
    solution_text: "The reaction of methane with bromine in the presence of light ($h\\nu$) is a classic free-radical halogenation (substitution) consisting of initiation, propagation, and termination steps. In contrast, propene with $\\text{HBr}/\\text{peroxide}$ is a free-radical addition reaction."
  },
  {
    question_number: 18,
    question_text: "An alkene on ozonolysis gives methanal as one of the products. Its structure is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q18_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q18_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q18_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q18_opt_d + ")" }
    ],
    correct_option: "B",
    solution_text: "Formation of methanal ($\\text{HCHO}$) on ozonolysis requires a terminal methylene group ($=\\text{CH}_2$). Structure (B), which has a terminal $-\\text{CH}=\\text{CH}_2$ group, cleaves during ozonolysis to yield formaldehyde."
  },
  {
    question_number: 19,
    question_text: "The alkane that gives only one mono-chloro product on chlorination with $\\text{Cl}_2$ in presence of diffused sunlight is:",
    options: [
      { option_key: "A", option_text: "Isopentane" },
      { option_key: "B", option_text: "2,2-dimethylbutane" },
      { option_key: "C", option_text: "neopentane" },
      { option_key: "D", option_text: "n-pentane" }
    ],
    correct_option: "C",
    solution_text: "Neopentane (2,2-dimethylpropane) has four chemically and stereochemically equivalent methyl groups and all 12 hydrogen atoms are equivalent primary hydrogens. Therefore, replacement of any hydrogen gives only one monochloro derivative, 1-chloro-2,2-dimethylpropane (neopentyl chloride)."
  },
  {
    question_number: 20,
    question_text: "In the following reaction:\n\n$$3\\text{H}_3\\text{C}-\\text{C}\\equiv\\text{CH} \\xrightarrow[873\\text{ K}]{\\text{red hot iron tube}} \\text{A}$$\n\nthe number of sigma ($\\sigma$) bonds present in the product A, is:",
    options: [
      { option_key: "A", option_text: "18" },
      { option_key: "B", option_text: "21" },
      { option_key: "C", option_text: "9" },
      { option_key: "D", option_text: "24" }
    ],
    correct_option: "B",
    solution_text: "Cyclic trimerization of propyne over a red hot iron tube at $873\\text{ K}$ gives 1,3,5-trimethylbenzene (mesitylene, $\\text{C}_9\\text{H}_{12}$):\n- Ring C-C $\\sigma$ bonds: 6\n- Ring C-H $\\sigma$ bonds: 3\n- Ring C-$\\text{CH}_3$ $\\sigma$ bonds: 3\n- Methyl C-H $\\sigma$ bonds: $3 \\times 3 = 9$\nTotal number of $\\sigma$ bonds = $6 + 3 + 3 + 9 = 21$."
  },
  {
    question_number: 21,
    question_text: "Among the following, the reaction that proceeds through an electrophilic substitution, is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q21_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q21_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q21_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q21_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Halogenation of benzene with $\\text{Cl}_2$ in the presence of anhydrous Lewis acid catalyst $\\text{AlCl}_3$ proceeds via generation of the electrophile $\\text{Cl}^+$ and formation of an arenium ion (arenium/Wheland intermediate), which is a classic electrophilic aromatic substitution reaction."
  },
  {
    question_number: 22,
    question_text: "The most suitable reagent for the following conversion, is:\n\n$$\\text{H}_3\\text{C}-\\text{C}\\equiv\\text{C}-\\text{CH}_3 \\rightarrow \\text{cis-2-butene}$$",
    options: [
      { option_key: "A", option_text: "$\\text{Zn} / \\text{HCl}$" },
      { option_key: "B", option_text: "$\\text{Hg}^{2+} / \\text{H}^+, \\text{H}_2\\text{O}$" },
      { option_key: "C", option_text: "$\\text{Na} / \\text{liquid }\\text{NH}_3$" },
      { option_key: "D", option_text: "$\\text{H}_2, \\text{Pd/C, quinoline}$" }
    ],
    correct_option: "D",
    solution_text: "Hydrogenation of alkynes to cis-alkenes requires stereoselective syn-addition using hydrogen gas in the presence of palladium on carbon partially deactivated (poisoned) with quinoline or lead salts, known as Lindlar's catalyst ($\\text{H}_2, \\text{Pd/C, quinoline}$)."
  },
  {
    question_number: 23,
    question_text: "An alkene “A” on reaction with $\\text{O}_3$ and $\\text{Zn} + \\text{H}_2\\text{O}$ gives propanone and ethanal in equimolar ratio. Addition of $\\text{HCl}$ to alkene “A” gives “B” as the major product. The structure of product “B” is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q23_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q23_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q23_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q23_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Ozonolysis products propanone ($(\\text{CH}_3)_2\\text{C}=\\text{O}$) and ethanal ($\\text{O}=\\text{CH}-\\text{CH}_3$) correspond to alkene A: 2-methylbut-2-ene, $(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3$. Addition of $\\text{HCl}$ across 2-methylbut-2-ene follows Markovnikov's rule through the more stable $3^\\circ$ carbocation to yield 2-chloro-2-methylbutane, $\\text{CH}_3-\\text{CH}_2-\\text{C}(\\text{CH}_3)(\\text{Cl})-\\text{CH}_3$ (structure A)."
  },
  {
    question_number: 24,
    question_text: "Hydrocarbon (A) reacts with bromine by substitution to form an alkyl bromide which by Wurtz reaction is converted to gaseous hydrocarbon containing less than four carbon atoms. (A) is:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}\\equiv\\text{CH}$" },
      { option_key: "B", option_text: "$\\text{CH}_2=\\text{CH}_2$" },
      { option_key: "C", option_text: "$\\text{CH}_3-\\text{CH}_3$" },
      { option_key: "D", option_text: "$\\text{CH}_4$" }
    ],
    correct_option: "D",
    solution_text: "Methane ($\\text{CH}_4$) undergoes free-radical bromination to form bromomethane ($\\text{CH}_3\\text{Br}$). When bromomethane is subjected to the Wurtz reaction ($2\\text{CH}_3\\text{Br} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{CH}_3-\\text{CH}_3 + 2\\text{NaBr}$), it forms ethane, which is a gaseous hydrocarbon containing 2 carbon atoms (less than four carbon atoms). Hence, (A) is methane."
  },
  {
    question_number: 25,
    question_text: "Which one is the correct order of acidity?",
    options: [
      { option_key: "A", option_text: "$\\text{CH}\\equiv\\text{CH} > \\text{CH}_3-\\text{C}\\equiv\\text{CH} > \\text{CH}_2=\\text{CH}_2 > \\text{CH}_3-\\text{CH}_3$" },
      { option_key: "B", option_text: "$\\text{CH}\\equiv\\text{CH} > \\text{CH}_2=\\text{CH}_2 > \\text{CH}_3-\\text{C}\\equiv\\text{CH} > \\text{CH}_3-\\text{CH}_3$" },
      { option_key: "C", option_text: "$\\text{CH}_3-\\text{CH}_3 > \\text{CH}_2=\\text{CH}_2 > \\text{CH}_3-\\text{C}\\equiv\\text{CH} > \\text{CH}\\equiv\\text{CH}$" },
      { option_key: "D", option_text: "$\\text{CH}_2=\\text{CH}_2 > \\text{CH}_3-\\text{CH}=\\text{CH}_2 > \\text{CH}_3-\\text{C}\\equiv\\text{CH} > \\text{CH}\\equiv\\text{CH}$" }
    ],
    correct_option: "A",
    solution_text: "Acidity of hydrocarbons increases with greater s-character of the carbon hybrid orbital attached to hydrogen ($sp (50\\%) > sp^2 (33.3\\%) > sp^3 (25\\%)$) because higher s-character stabilizes the conjugate base carbanion. Additionally, the electron-donating $+I$ effect of the methyl group in propyne slightly decreases the acidity compared to ethyne. Thus, the order is: $\\text{CH}\\equiv\\text{CH} > \\text{CH}_3-\\text{C}\\equiv\\text{CH} > \\text{CH}_2=\\text{CH}_2 > \\text{CH}_3-\\text{CH}_3$."
  },
  {
    question_number: 26,
    question_text: "Predict the correct intermediate and product in the following reaction:\n\n![Reaction Scheme](" + urls.q26_diag + ")",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q26_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q26_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q26_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q26_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Hydration of propyne in the presence of $\\text{H}_2\\text{SO}_4/\\text{HgSO}_4$ proceeds by Markovnikov addition of water across the triple bond to yield prop-1-en-2-ol, $\\text{H}_3\\text{C}-\\text{C}(\\text{OH})=\\text{CH}_2$ as an unstable enol intermediate (A). This intermediate rapidly tautomerizes (keto-enol tautomerism) to form acetone, $\\text{H}_3\\text{C}-\\text{CO}-\\text{CH}_3$ as the stable ketone product (B)."
  },
  {
    question_number: 27,
    question_text: "Which of the following can be used as the halide component for Friedel-Crafts reaction?",
    options: [
      { option_key: "A", option_text: "Chlorobenzene" },
      { option_key: "B", option_text: "Bromobenzene" },
      { option_key: "C", option_text: "Chloroethene" },
      { option_key: "D", option_text: "Isopropyl chloride" }
    ],
    correct_option: "D",
    solution_text: "Aryl halides (chlorobenzene, bromobenzene) and vinyl halides (chloroethene) have partial double bond character in the carbon-halogen bond due to resonance with the $\\pi$-system, making cleavage of the $\\text{C}-\\text{X}$ bond by $\\text{AlCl}_3$ extremely difficult. In contrast, alkyl halides like isopropyl chloride ($(\\text{CH}_3)_2\\text{CHCl}$) readily ionize with $\\text{AlCl}_3$ to form stable carbocations for Friedel-Crafts alkylation."
  },
  {
    question_number: 28,
    question_text: "In which of the following molecules, all atoms are coplanar?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q28_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q28_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q28_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q28_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "In biphenyl (A), all carbon and hydrogen atoms lie in the same plane in its planar conformation because every carbon atom is $sp^2$-hybridized with trigonal planar geometry. Molecules containing $sp^3$ carbons with tetrahedral geometries (like methyl groups or cyclohexane rings) cannot have all atoms lying in a single plane."
  },
  {
    question_number: 29,
    question_text: "In pyrrole, the electron density is maximum on:\n\n![Pyrrole Structure](" + urls.q29_diag + ")",
    options: [
      { option_key: "A", option_text: "2 and 3" },
      { option_key: "B", option_text: "3 and 4" },
      { option_key: "C", option_text: "2 and 4" },
      { option_key: "D", option_text: "2 and 5" }
    ],
    correct_option: "D",
    solution_text: "In pyrrole, resonance delocalization of the nitrogen lone pair into the aromatic ring creates five resonance contributors. Attack by electrophiles or examination of the Wheland intermediate reveals that substitution at position 2 (and equivalent position 5, $\\alpha$-positions) yields three resonance contributors stabilizing the positive charge, compared to only two contributors for attack at positions 3 and 4. Hence, electron density and reactivity are greatest at carbons 2 and 5."
  },
  {
    question_number: 30,
    question_text: "Which of the following compounds shall not produce propene by reaction with $\\text{HBr}$ followed by elimination or direct only elimination reaction?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q30_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q30_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q30_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q30_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "In structure (C), the compound has a halogen on a central quaternary/tertiary carbon where elimination yields a substituted isomer or cannot give propene directly without skeleton fragmentation. Cyclopropane reacts with $\\text{HBr}$ by ring opening to form 1-bromopropane which undergoes elimination to propene. Propan-1-ol and 1-bromopropane also undergo dehydration/elimination to yield propene."
  }
];
