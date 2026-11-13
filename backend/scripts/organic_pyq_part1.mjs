import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/organic_diagram_urls.json', 'utf8'));

export const part1Questions = [
  {
    question_number: 1,
    question_text: "The following carbocation is stabilized by the interaction of the empty $p$ orbital with:\n\n![Carbocation](" + urls.q1_diag + ")",
    options: [
      { option_key: "A", option_text: "empty $\\sigma^*$ and empty $\\pi^*$ orbitals" },
      { option_key: "B", option_text: "filled $\\sigma$ and filled $\\pi$ orbitals" },
      { option_key: "C", option_text: "empty $\\sigma$ and empty $\\pi^*$ orbitals" },
      { option_key: "D", option_text: "empty $\\sigma^*$ and filled $\\pi$ orbitals" }
    ],
    correct_option: "B",
    solution_text: "An empty $p$ orbital of a carbocation is stabilized through hyperconjugation with filled $\\sigma$ bonds (C-H or C-C $\\sigma$ electrons) and resonance overlap with filled $\\pi$ bonding orbitals."
  },
  {
    question_number: 2,
    question_text: "The correct IUPAC name of the following compound is:\n\n$$\\begin{matrix} \\text{CH}_3-\\text{CH}_2-\\text{CH}-\\text{CH}_2-\\text{CH}-\\text{CH}_2-\\text{CH}_3 \\\\ | \\qquad\\qquad\\quad | \\qquad\\qquad \\\\ \\text{CH}_2-\\text{CH}_3 \\quad \\text{CH}_3 \\qquad\\quad \\end{matrix}$$",
    options: [
      { option_key: "A", option_text: "3-ethyl-5-methylheptane" },
      { option_key: "B", option_text: "2,4-diethylhexane" },
      { option_key: "C", option_text: "3-methyl-5-ethylheptane" },
      { option_key: "D", option_text: "3,5-diethylhexane" }
    ],
    correct_option: "A",
    solution_text: "The longest continuous carbon chain contains 7 carbon atoms (heptane). Numbering from either end gives substituents at positions 3 and 5. Applying alphabetical priority ('ethyl' before 'methyl'), numbering begins from the end nearer to the ethyl group, giving 3-ethyl-5-methylheptane."
  },
  {
    question_number: 3,
    question_text: "During Lassaigne's test, the elements present in an organic compound are converted from:",
    options: [
      { option_key: "A", option_text: "Ionic form to ionic form" },
      { option_key: "B", option_text: "Covalent form to ionic form" },
      { option_key: "C", option_text: "Covalent form to covalent form" },
      { option_key: "D", option_text: "Ionic form to covalent form" }
    ],
    correct_option: "B",
    solution_text: "In Lassaigne's test, organic compounds containing covalently bound elements such as nitrogen, sulphur, and halogens are fused with metallic sodium to convert them into water-soluble ionic sodium salts (such as $\\text{NaCN}$, $\\text{Na}_2\\text{S}$, and $\\text{NaX}$)."
  },
  {
    question_number: 4,
    question_text: "Which one of the following reactions does NOT belong to \"Lassaigne's test\"?",
    options: [
      { option_key: "A", option_text: "$\\text{Na} + \\text{X} \\rightarrow \\text{NaX}$" },
      { option_key: "B", option_text: "$2\\text{CuO} + \\text{C} \\xrightarrow{\\Delta} 2\\text{Cu} + \\text{CO}_2$" },
      { option_key: "C", option_text: "$\\text{Na} + \\text{C} + \\text{N} \\rightarrow \\text{NaCN}$" },
      { option_key: "D", option_text: "$2\\text{Na} + \\text{S} \\rightarrow \\text{Na}_2\\text{S}$" }
    ],
    correct_option: "B",
    solution_text: "The reaction $2\\text{CuO} + \\text{C} \\rightarrow 2\\text{Cu} + \\text{CO}_2$ belongs to the copper oxide reduction test used for the detection of carbon, not Lassaigne's sodium fusion test."
  },
  {
    question_number: 5,
    question_text: "How many products (including stereoisomers) are expected from monochlorination of the following compound?\n\n![Structure](" + urls.q5_diag + ")",
    options: [
      { option_key: "A", option_text: "5" },
      { option_key: "B", option_text: "6" },
      { option_key: "C", option_text: "2" },
      { option_key: "D", option_text: "3" }
    ],
    correct_option: "B",
    solution_text: "Monochlorination of 2-methylbutane yields 4 constitutional isomers:\n1. $\\text{CH}_2\\text{Cl}-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}_3$ (chiral center at C2 $\\rightarrow 2$ enantiomers)\n2. $\\text{CH}_3-\\text{C(Cl)}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}_3$ (achiral $\\rightarrow 1$)\n3. $\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH(Cl)}-\\text{CH}_3$ (chiral center at C3 $\\rightarrow 2$ enantiomers)\n4. $(\\text{CH}_3)_2\\text{CH}-\\text{CH}_2-\\text{CH}_2\\text{Cl}$ (achiral $\\rightarrow 1$)\nTotal products including stereoisomers = $2 + 1 + 2 + 1 = 6$."
  },
  {
    question_number: 6,
    question_text: "Total number of possible isomers (both structural as well as stereoisomers) of cyclic ethers of molecular formula $\\text{C}_4\\text{H}_8\\text{O}$ is:",
    options: [
      { option_key: "A", option_text: "10" },
      { option_key: "B", option_text: "11" },
      { option_key: "C", option_text: "6" },
      { option_key: "D", option_text: "8" }
    ],
    correct_option: "A",
    solution_text: "The cyclic ethers of molecular formula $\\text{C}_4\\text{H}_8\\text{O}$ include:\n- Tetrahydrofuran (1)\n- 2-Methyloxolane (2 enantiomers: $R, S$)\n- Oxetane derivatives: 2-Ethyloxetane (2 enantiomers), 2,2-dimethyloxetane (1), 2,3-dimethyloxetane (cis and trans $\\rightarrow 3$), 2,4-dimethyloxetane (cis and trans), 3,3-dimethyloxetane (1)\n- Oxirane derivatives: Ethyloxirane (2 enantiomers), 2,2-dimethyloxirane (1), 2,3-dimethyloxirane (cis-meso and trans-pair $\\rightarrow 3$).\nTaking all valid cyclic ethers into account, there are 10 total isomers."
  },
  {
    question_number: 7,
    question_text: "Among the given compounds I-III, the correct order of bond dissociation energy of C-H bond marked with * is:\n\n![Structures I-III](" + urls.q7_diag + ")",
    options: [
      { option_key: "A", option_text: "$\\text{III} > \\text{II} > \\text{I}$" },
      { option_key: "B", option_text: "$\\text{II} > \\text{III} > \\text{I}$" },
      { option_key: "C", option_text: "$\\text{II} > \\text{I} > \\text{III}$" },
      { option_key: "D", option_text: "$\\text{I} > \\text{II} > \\text{III}$" }
    ],
    correct_option: "C",
    solution_text: "Bond dissociation energy is inversely related to the stability of the free radical formed after homolytic bond cleavage. Radical II is a vinylic radical ($sp^2$ hybridized, extremely unstable $\\rightarrow$ highest BDE). Radical I is allylic (resonance stabilized). Radical III is benzylic/doubly resonance-stabilized (most stable $\\rightarrow$ lowest BDE). Hence the order of bond dissociation energy is $\\text{II} > \\text{I} > \\text{III}$."
  },
  {
    question_number: 8,
    question_text: "Match List-I with List-II:\n\n$$\\begin{array}{|l|l|l|l|} \\hline & \\textbf{List - I (Mixture)} & & \\textbf{List - II (Method of separation)} \\\\ \\hline \\text{A} & \\text{CHCl}_3 + \\text{C}_6\\text{H}_5\\text{NH}_2 & \\text{I} & \\text{Distillation under reduced pressure} \\\\ \\hline \\text{B} & \\text{Crude oil in petroleum industry} & \\text{II} & \\text{Steam distillation} \\\\ \\hline \\text{C} & \\text{Glycerol from spent-lye} & \\text{III} & \\text{Fractional distillation} \\\\ \\hline \\text{D} & \\text{Aniline - water} & \\text{IV} & \\text{Simple distillation} \\\\ \\hline \\end{array}$$\n\nChoose the correct answer from the options given below:",
    options: [
      { option_key: "A", option_text: "A-III, B-IV, C-I, D-II" },
      { option_key: "B", option_text: "A-III, B-IV, C-II, D-I" },
      { option_key: "C", option_text: "A-IV, B-III, C-I, D-II" },
      { option_key: "D", option_text: "A-IV, B-III, C-II, D-I" }
    ],
    correct_option: "C",
    solution_text: "- $\\text{CHCl}_3 + \\text{C}_6\\text{H}_5\\text{NH}_2$ has a large difference in boiling points ($61^\\circ\\text{C}$ vs $184^\\circ\\text{C}$), separated by Simple distillation (A-IV).\n- Crude oil fractions have close boiling points, separated by Fractional distillation (B-III).\n- Glycerol decomposes near its boiling point, so it is separated by Distillation under reduced pressure (C-I).\n- Aniline is steam volatile and immiscible with water, separated by Steam distillation (D-II).\nHence, A-IV, B-III, C-I, D-II."
  },
  {
    question_number: 9,
    question_text: "Which one of the following compounds can exist as cis-trans isomers?",
    options: [
      { option_key: "A", option_text: "1,1-Dimethylcyclopropane" },
      { option_key: "B", option_text: "1,2-Dimethylcyclohexane" },
      { option_key: "C", option_text: "Pent-1-ene" },
      { option_key: "D", option_text: "2-Methylhex-2-ene" }
    ],
    correct_option: "B",
    solution_text: "1,2-Dimethylcyclohexane has restricted rotation around the ring C-C bonds and two stereo-centers. The two methyl groups can point to the same face of the ring (cis isomer) or opposite faces (trans isomer)."
  },
  {
    question_number: 10,
    question_text: "Match List-I with List-II:\n\n$$\\begin{array}{|l|l|l|l|} \\hline & \\textbf{List - I (Ion)} & & \\textbf{List - II (Group Number in Cation Analysis)} \\\\ \\hline \\text{A} & \\text{Co}^{2+} & \\text{I} & \\text{Group-I} \\\\ \\hline \\text{B} & \\text{Mg}^{2+} & \\text{II} & \\text{Group-III} \\\\ \\hline \\text{C} & \\text{Pb}^{2+} & \\text{III} & \\text{Group-IV} \\\\ \\hline \\text{D} & \\text{Al}^{3+} & \\text{IV} & \\text{Group-VI} \\\\ \\hline \\end{array}$$\n\nChoose the correct answer from the options given below:",
    options: [
      { option_key: "A", option_text: "A-III, B-II, C-IV, D-I" },
      { option_key: "B", option_text: "A-III, B-II, C-I, D-IV" },
      { option_key: "C", option_text: "A-III, B-IV, C-II, D-I" },
      { option_key: "D", option_text: "A-III, B-IV, C-I, D-II" }
    ],
    correct_option: "D",
    solution_text: "- $\\text{Co}^{2+}$ is a Group-IV basic radical (precipitated as CoS) $\\rightarrow$ A-III\n- $\\text{Mg}^{2+}$ is a Group-VI basic radical $\\rightarrow$ B-IV\n- $\\text{Pb}^{2+}$ is a Group-I basic radical (precipitated as $\\text{PbCl}_2$) $\\rightarrow$ C-I\n- $\\text{Al}^{3+}$ is a Group-III basic radical (precipitated as $\\text{Al(OH)}_3$) $\\rightarrow$ D-II\nTherefore, A-III, B-IV, C-I, D-II."
  },
  {
    question_number: 11,
    question_text: "The correct IUPAC name of the compound is:\n\n![Compound](" + urls.q11_diag + ")",
    options: [
      { option_key: "A", option_text: "4-ethyl-1-fluoro-2-nitrobenzene" },
      { option_key: "B", option_text: "4-ethyl-1-fluoro-6-nitrobenzene" },
      { option_key: "C", option_text: "3-ethyl-6-fluoro-1-nitrobenzene" },
      { option_key: "D", option_text: "1-ethyl-4-fluoro-3-nitrobenzene" }
    ],
    correct_option: "A",
    solution_text: "Numbering the benzene ring gives the lowest set of locants $(1, 2, 4)$ with fluorine at position 1, nitro at position 2, and ethyl at position 4. Listing substituents alphabetically gives 4-ethyl-1-fluoro-2-nitrobenzene."
  },
  {
    question_number: 12,
    question_text: "A steam volatile organic compound which is immiscible with water has a boiling point of $250^\\circ\\text{C}$. During steam distillation, a mixture of this organic compound and water will boil:",
    options: [
      { option_key: "A", option_text: "above $100^\\circ\\text{C}$ but below $250^\\circ\\text{C}$" },
      { option_key: "B", option_text: "above $250^\\circ\\text{C}$" },
      { option_key: "C", option_text: "at $250^\\circ\\text{C}$" },
      { option_key: "D", option_text: "close to but below $100^\\circ\\text{C}$" }
    ],
    correct_option: "D",
    solution_text: "During steam distillation of two immiscible liquids, the total vapor pressure is $P = P_{\\text{water}} + P_{\\text{organic}}$. Boiling occurs when $P = 1\\text{ atm}$. Since water alone boils at $100^\\circ\\text{C}$, the mixture reaches $1\\text{ atm}$ at a temperature close to but slightly below $100^\\circ\\text{C}$."
  },
  {
    question_number: 13,
    question_text: "Match List-I with List-II:\n\n$$\\begin{array}{|l|l|l|l|} \\hline & \\textbf{List - I (Test/reagent)} & & \\textbf{List - II (Radical identified)} \\\\ \\hline \\text{(A)} & \\text{Lake Test} & \\text{(I)} & \\text{NO}_3^- \\\\ \\hline \\text{(B)} & \\text{Nessler's Reagent} & \\text{(II)} & \\text{Fe}^{3+} \\\\ \\hline \\text{(C)} & \\text{Potassium sulphocyanide} & \\text{(III)} & \\text{Al}^{3+} \\\\ \\hline \\text{(D)} & \\text{Brown Ring Test} & \\text{(IV)} & \\text{NH}_4^+ \\\\ \\hline \\end{array}$$\n\nChoose the correct answer from the options given below:",
    options: [
      { option_key: "A", option_text: "A-IV, B-II, C-III, D-I" },
      { option_key: "B", option_text: "A-II, B-IV, C-III, D-I" },
      { option_key: "C", option_text: "A-II, B-III, C-IV, D-I" },
      { option_key: "D", option_text: "A-III, B-IV, C-II, D-I" }
    ],
    correct_option: "D",
    solution_text: "- Lake test is a characteristic confirmatory test for $\\text{Al}^{3+}$ ions $\\rightarrow$ A-III\n- Nessler's reagent detects ammonium ions ($\\text{NH}_4^+$) $\\rightarrow$ B-IV\n- Potassium sulphocyanide ($\\text{KSCN}$) gives a blood-red color with $\\text{Fe}^{3+}$ ions $\\rightarrow$ C-II\n- Brown ring test confirms the nitrate ion ($\\text{NO}_3^-$) $\\rightarrow$ D-I\nHence, A-III, B-IV, C-II, D-I."
  },
  {
    question_number: 14,
    question_text: "Methyl group attached to a positively charged carbon atom stabilizes the carbocation due to:",
    options: [
      { option_key: "A", option_text: "$-I$ inductive effect" },
      { option_key: "B", option_text: "electromeric effect" },
      { option_key: "C", option_text: "hyperconjugation" },
      { option_key: "D", option_text: "mesomeric effect" }
    ],
    correct_option: "C",
    solution_text: "A methyl group directly attached to the carbocationic center stabilizes the carbocation through hyperconjugation, involving overlap of adjacent $\\text{C-H}$ $\\sigma$ bonding orbitals with the vacant $p$ orbital of the positive carbon."
  },
  {
    question_number: 15,
    question_text: "The most stable carbocation among the following is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q15_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q15_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q15_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q15_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Option (D) has the maximum number of $\\alpha$-hydrogens (hyperconjugative structures) and $+I$ inductive groups stabilizing the carbocationic center."
  },
  {
    question_number: 16,
    question_text: "A compound with a molecular formula of $\\text{C}_6\\text{H}_{14}$ has two tertiary carbons. Its IUPAC name is:",
    options: [
      { option_key: "A", option_text: "n-hexane" },
      { option_key: "B", option_text: "2-methylpentane" },
      { option_key: "C", option_text: "2,3-dimethylbutane" },
      { option_key: "D", option_text: "2,2-dimethylbutane" }
    ],
    correct_option: "C",
    solution_text: "2,3-Dimethylbutane has the structure $(\\text{CH}_3)_2\\text{CH}-\\text{CH}(\\text{CH}_3)_2$. Carbons 2 and 3 are each bonded to three other carbons and one hydrogen, so both are tertiary ($3^\\circ$) carbons."
  },
  {
    question_number: 17,
    question_text: "On heating, some solid substances change from solid to vapour state without passing through liquid state. The technique used for the purification of such solid substances based on the above principle is known as:",
    options: [
      { option_key: "A", option_text: "Crystallization" },
      { option_key: "B", option_text: "Sublimation" },
      { option_key: "C", option_text: "Distillation" },
      { option_key: "D", option_text: "Chromatography" }
    ],
    correct_option: "B",
    solution_text: "Sublimation is the direct transition of a substance from solid phase to vapour phase on heating, used to purify sublimable compounds from non-sublimable impurities."
  },
  {
    question_number: 18,
    question_text: "During the preparation of Mohr's salt solution (Ferrous ammonium sulphate), which of the following acid is added to prevent hydrolysis of $\\text{Fe}^{2+}$ ion?",
    options: [
      { option_key: "A", option_text: "dilute hydrochloric acid" },
      { option_key: "B", option_text: "concentrated sulphuric acid" },
      { option_key: "C", option_text: "dilute nitric acid" },
      { option_key: "D", option_text: "dilute sulphuric acid" }
    ],
    correct_option: "D",
    solution_text: "Dilute sulphuric acid ($\\text{dil. } \\text{H}_2\\text{SO}_4$) is added to prevent the hydrolysis of $\\text{Fe}^{2+}$ ions into insoluble basic salts and iron hydroxides."
  },
  {
    question_number: 19,
    question_text: "Which amongst the following compounds/species is least basic?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q19_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q19_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q19_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q19_opt_d + ")" }
    ],
    correct_option: "B",
    solution_text: "In option (B), the lone pair of electrons on the nitrogen atom is strongly delocalized through resonance, significantly reducing its availability for protonation, making it the least basic."
  },
  {
    question_number: 20,
    question_text: "Which amongst the following compounds will show geometrical isomerism?",
    options: [
      { option_key: "A", option_text: "Pent-1-ene" },
      { option_key: "B", option_text: "2,3-Dimethylbut-2-ene" },
      { option_key: "C", option_text: "2-Methylprop-1-ene" },
      { option_key: "D", option_text: "3,4-Dimethylhex-3-ene" }
    ],
    correct_option: "D",
    solution_text: "In 3,4-dimethylhex-3-ene, each double-bonded carbon is bonded to two different substituents: a methyl group ($-\\text{CH}_3$) and an ethyl group ($-\\text{C}_2\\text{H}_5$). Therefore, it exhibits cis-trans geometrical isomerism."
  },
  {
    question_number: 21,
    question_text: "Given below are two statements:\n\n**Statement I:** In an organic compound, when inductive and electromeric effects operate in opposite directions, the inductive effect predominates.\n\n**Statement II:** Hyperconjugation is observed in o-xylene.\n\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      { option_key: "A", option_text: "Statement-I is true but Statement-II is false." },
      { option_key: "B", option_text: "Statement-I is false but Statement-II is true." },
      { option_key: "C", option_text: "Both Statement-I and Statement-II are true." },
      { option_key: "D", option_text: "Both Statement-I and Statement-II are false." }
    ],
    correct_option: "B",
    solution_text: "Statement I is false: When inductive and electromeric effects act in opposing directions, the electromeric effect (complete $\\pi$-electron displacement) predominates.\nStatement II is true: o-Xylene contains two methyl groups attached to the aromatic ring, with $\\alpha$-hydrogens participating in hyperconjugation."
  },
  {
    question_number: 22,
    question_text: "The number of $\\sigma$ bonds, $\\pi$ bonds and lone pair of electrons in pyridine, respectively are:",
    options: [
      { option_key: "A", option_text: "12, 3, 0" },
      { option_key: "B", option_text: "11, 3, 1" },
      { option_key: "C", option_text: "12, 2, 1" },
      { option_key: "D", option_text: "11, 2, 0" }
    ],
    correct_option: "B",
    solution_text: "Pyridine ($\\text{C}_5\\text{H}_5\\text{N}$) has:\n- $6$ ring $\\sigma$ bonds (5 C-C and 1 C-N ring bonds, wait: 5 C-C single/double skeleton bonds + 2 C-N single/double skeleton bonds = 6 ring bonds) + 5 C-H single bonds = $11$ $\\sigma$ bonds.\n- $3$ conjugated $\\pi$ bonds in the aromatic ring.\n- $1$ lone pair residing on the nitrogen atom in an $sp^2$ orbital orthogonal to the $\\pi$ electron cloud.\nThus, 11 $\\sigma$, 3 $\\pi$, and 1 lone pair."
  },
  {
    question_number: 23,
    question_text: "In Lassaigne's extract of an organic compound, both nitrogen and sulphur are present, which gives blood red colour with $\\text{Fe}^{3+}$ due to the formation of:",
    options: [
      { option_key: "A", option_text: "$\\text{NaSCN}$" },
      { option_key: "B", option_text: "$[\\text{Fe}(\\text{CN})_5\\text{NOS}]^{4-}$" },
      { option_key: "C", option_text: "$[\\text{Fe}(\\text{SCN})]^{2+}$" },
      { option_key: "D", option_text: "$\\text{Fe}_4[\\text{Fe}(\\text{CN})_6]_3 \\cdot x\\text{H}_2\\text{O}$" }
    ],
    correct_option: "C",
    solution_text: "When both nitrogen and sulphur are present, sodium fusion produces sodium thiocyanate ($\\text{NaSCN}$). On addition of ferric chloride ($\\text{Fe}^{3+}$), a blood-red coloration is produced due to the formation of ferric thiocyanate complex: $\\text{Fe}^{3+} + \\text{SCN}^- \\rightarrow [\\text{Fe}(\\text{SCN})]^{2+}$."
  },
  {
    question_number: 24,
    question_text: "Consider the following compounds/species:\n\n![Compounds/species](" + urls.q24_diag + ")\n\nThe number of compounds/species which obey Huckel's rule is:",
    options: [
      { option_key: "A", option_text: "6" },
      { option_key: "B", option_text: "2" },
      { option_key: "C", option_text: "5" },
      { option_key: "D", option_text: "4" }
    ],
    correct_option: "D",
    solution_text: "According to Huckel's rule, planar cyclic conjugated systems with $(4n+2)\\,\\pi$ electrons are aromatic. Among the given species, exactly 4 species obey Huckel's rule."
  },
  {
    question_number: 25,
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Chlorine is an electron withdrawing group but it is ortho, para directing in electrophilic aromatic substitution.\n\n**Reason (R):** Inductive effect of chlorine destabilises the intermediate carbocation formed during the electrophilic substitution, however due to the more pronounced resonance effect, the halogen stabilises the carbocation at ortho and para positions.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      { option_key: "A", option_text: "(A) is not correct but (R) is correct" },
      { option_key: "B", option_text: "Both (A) and (R) are correct and (R) is the correct explanation of (A)" },
      { option_key: "C", option_text: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)" },
      { option_key: "D", option_text: "(A) is correct but (R) is not correct" }
    ],
    correct_option: "B",
    solution_text: "Chlorine withdraws electron density via its strong $-I$ effect, but through $+R$ resonance donation of its lone pair, it provides extra stabilization to the arenium ion when the electrophile attacks at the ortho or para positions. Thus, both statements are correct and Reason explains Assertion."
  },
  {
    question_number: 26,
    question_text: "What is the hybridization shown by $\\text{C}_1$ and $\\text{C}_2$ carbons, respectively in the given compound?\n\n$$\\text{OHC}-\\text{CH}=\\text{CH}-\\text{CH}_2-\\text{COOCH}_3$$",
    options: [
      { option_key: "A", option_text: "$sp^3$ and $sp^3$" },
      { option_key: "B", option_text: "$sp^2$ and $sp^3$" },
      { option_key: "C", option_text: "$sp^2$ and $sp^2$" },
      { option_key: "D", option_text: "$sp^3$ and $sp^2$" }
    ],
    correct_option: "B",
    solution_text: "Numbering starts from the carboxylic ester carbonyl carbon as $\\text{C}_1$ (highest priority functional group). $\\text{C}_1$ has a double bond to oxygen (carbonyl) and single bonds, giving $sp^2$ hybridization. $\\text{C}_2$ ($-\\text{CH}_2-$) has 4 single bonds, giving $sp^3$ hybridization."
  },
  {
    question_number: 27,
    question_text: "Which of the following is the most stable carbocation?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q27_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q27_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q27_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q27_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Option (A) is the most stable carbocation due to resonance delocalization and optimal hyperconjugative stabilization."
  },
  {
    question_number: 28,
    question_text: "Which compound amongst the following is not an aromatic compound?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q28_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q28_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q28_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q28_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "The structure in option (D) is non-aromatic because it contains an $sp^3$ hybridized carbon in the cyclic ring which disrupts continuous conjugation."
  },
  {
    question_number: 29,
    question_text: "The incorrect statement regarding chirality is:",
    options: [
      { option_key: "A", option_text: "$S_N1$ reaction yields $1 : 1$ mixture of both enantiomers" },
      { option_key: "B", option_text: "The product obtained by $S_N2$ reaction of haloalkane having chirality at the reactive site shows inversion of configuration" },
      { option_key: "C", option_text: "Enantiomers are superimposable mirror images on each other" },
      { option_key: "D", option_text: "A racemic mixture shows zero optical rotation" }
    ],
    correct_option: "C",
    solution_text: "Enantiomers are stereoisomers that are non-superimposable mirror images of each other. Therefore, statement (C) is incorrect."
  },
  {
    question_number: 30,
    question_text: "The Kjeldahl's method for the estimation of nitrogen can be used to estimate the amount of nitrogen in which one of the following compounds?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q30_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q30_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q30_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q30_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Kjeldahl's method fails for compounds containing nitro groups, azo groups, or nitrogen inside a heterocyclic ring because their nitrogen cannot be quantitatively converted into $(\\text{NH}_4)_2\\text{SO}_4$. It works successfully for aniline (Option C)."
  },
  {
    question_number: 31,
    question_text: "The correct IUPAC name of the following compound is:\n\n![Compound](" + urls.q31_diag + ")",
    options: [
      { option_key: "A", option_text: "1-bromo-5-chloro-4-methylhexan-3-ol" },
      { option_key: "B", option_text: "6-bromo-2-chloro-4-methylhexan-4-ol" },
      { option_key: "C", option_text: "1-bromo-4-methyl-5-chlorohexan-3-ol" },
      { option_key: "D", option_text: "6-bromo-4-methyl-2-chlorohexan-4-ol" }
    ],
    correct_option: "A",
    solution_text: "The principal functional group is alcohol ($-\\text{OH}$), which is assigned the lowest locant (3) by numbering from the left chain end. Carbon 1 bears bromo, carbon 4 bears methyl, carbon 5 bears chloro. In alphabetical order: 1-bromo-5-chloro-4-methylhexan-3-ol."
  },
  {
    question_number: 32,
    question_text: "The compound which shows metamerism is:",
    options: [
      { option_key: "A", option_text: "$\\text{C}_4\\text{H}_{10}\\text{O}$" },
      { option_key: "B", option_text: "$\\text{C}_5\\text{H}_{12}$" },
      { option_key: "C", option_text: "$\\text{C}_3\\text{H}_8\\text{O}$" },
      { option_key: "D", option_text: "$\\text{C}_3\\text{H}_6\\text{O}$" }
    ],
    correct_option: "A",
    solution_text: "$\\text{C}_4\\text{H}_{10}\\text{O}$ forms isomeric ethers such as diethyl ether ($\\text{CH}_3\\text{CH}_2-\\text{O}-\\text{CH}_2\\text{CH}_3$) and methyl propyl ether ($\\text{CH}_3-\\text{O}-\\text{CH}_2\\text{CH}_2\\text{CH}_3$), which exhibit metamerism due to unequal distribution of carbon atoms on either side of the functional group."
  },
  {
    question_number: 33,
    question_text: "The correct structure of 2,6-dimethyl-dec-4-ene is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q33_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q33_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q33_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q33_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Structure (A) contains a 10-carbon principal chain with a double bond starting at position 4 and methyl substituents at positions 2 and 6."
  },
  {
    question_number: 34,
    question_text: "Dihedral angle of least stable conformer of ethane is:",
    options: [
      { option_key: "A", option_text: "$0^\\circ$" },
      { option_key: "B", option_text: "$120^\\circ$" },
      { option_key: "C", option_text: "$180^\\circ$" },
      { option_key: "D", option_text: "$60^\\circ$" }
    ],
    correct_option: "A",
    solution_text: "The least stable conformer of ethane is the eclipsed conformation due to maximum torsional strain and electron-cloud repulsion between C-H bonds. Its dihedral angle is $0^\\circ$."
  },
  {
    question_number: 35,
    question_text: "A liquid compound (x) can be purified by steam distillation only if it is:",
    options: [
      { option_key: "A", option_text: "Not steam volatile, immiscible with water" },
      { option_key: "B", option_text: "Steam volatile, immiscible with water" },
      { option_key: "C", option_text: "Not steam volatile, miscible with water" },
      { option_key: "D", option_text: "Steam volatile, miscible with water" }
    ],
    correct_option: "B",
    solution_text: "Steam distillation is applicable only to substances which are steam volatile and practically immiscible with water."
  }
];

