/**
 * Hydrocarbons - MCQ Batch 1 (Q1 to Q22)
 * Source: Image 1 & Image 2 (Pages 150 & 151)
 */

export const HYDROCARBON_MCQ_BATCH1 = [
  {
    question_text: "Which of the following compound have least heat of hydrogenation?",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q1.png",
    options: [
      "(1) 1,2-dimethylcyclohexene (tetrasubstituted)",
      "(2) 1-methyl-2-methylenecyclohexane",
      "(3) 2,3-dimethylcyclohexene",
      "(4) 1,2-dimethylcyclohexene isomer"
    ],
    correct_index: 0,
    solution: "Heat of hydrogenation is inversely proportional to the stability of the alkene. More substituted alkenes have greater hyperconjugation and thermodynamic stability, releasing less heat on hydrogenation. The tetrasubstituted alkene (1,2-dimethylcyclohexene) is the most stable and therefore has the least heat of hydrogenation.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "Statement I: Tert-butyl benzene on nitration gives ortho and para nitro-t-butyl benzene.\nStatement II: Tert-butyl group is ortho, para directing group.",
    options: [
      "(1) Both statement I and II are correct.",
      "(2) Both statement I and II are incorrect.",
      "(3) Statement I is correct but statement II is incorrect.",
      "(4) Statement I is incorrect but statement II is correct."
    ],
    correct_index: 0,
    solution: "The tert-butyl group is electron-donating through inductive effect (+I) and directs incoming electrophiles to ortho and para positions. While the para product predominates due to steric hindrance of the bulky tert-butyl group, both ortho and para nitro-tert-butylbenzene are formed. Hence, both statement I and statement II are correct.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "In the reaction:\n\n$$\\text{Isopentane } ((CH_3)_2CH-CH_2-CH_3) + Cl_2 \\xrightarrow{h\\nu} (A) + (B) + (C) + (D)$$\n\nThe ratio of the amount of product (A), (B), (C), (D) is expected to be:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q3.png",
    options: [
      "(1) 1 : 3.8 : 5 : 1",
      "(2) 3 : 7.6 : 5 : 6",
      "(3) 3 : 7.6 : 5 : 3",
      "(4) 1 : 7.6 : 5 : 1"
    ],
    correct_index: 1,
    solution: "For free-radical chlorination at 25°C, relative reactivity of 3° : 2° : 1° hydrogens is 5.0 : 3.8 : 1.0.\n- Product (A) from 1° H on methyl: $3 \\times 1.0 = 3$\n- Product (B) from 2° H on -CH2-: $2 \\times 3.8 = 7.6$\n- Product (C) from 3° H on -CH-: $1 \\times 5.0 = 5.0$\n- Product (D) from 1° H on isopropyl (two methyls): $6 \\times 1.0 = 6$\nThus the ratio of products is 3 : 7.6 : 5 : 6.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "When 2-methylbuta-1,3-diene reacts with $HCl$ (one mole), then major product under high temperature is?",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q4.png",
    options: [
      "(1) 1-chloro-3-methylbut-2-ene",
      "(2) 3-chloro-3-methylbut-1-ene",
      "(3) 2-chloro-3-methylbut-1-ene",
      "(4) 1-chloro-2-methylbut-2-ene"
    ],
    correct_index: 0,
    solution: "At high temperatures, conjugated dienes undergo thermodynamically controlled addition (1,4-addition) yielding the more substituted, more stable alkene. For isoprene (2-methylbuta-1,3-diene), 1,4-addition of HCl gives 1-chloro-3-methylbut-2-ene.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "An alkene on reductive ozonolysis gives two molecule of $CH_2-(CHO)_2$. The alkene is:",
    options: [
      "(1) 2,4-hexadiene",
      "(2) 1,3-cyclohexadiene",
      "(3) 1,4-cyclohexadiene",
      "(4) 1-methyl-1,3-cyclopentadiene"
    ],
    correct_index: 2,
    solution: "1,4-cyclohexadiene contains two double bonds separated by single methylene groups ($-CH_2-$). Reductive ozonolysis ($O_3 / Zn-H_2O$) cleaves both double bonds to yield two identical molecules of malondialdehyde ($OHC-CH_2-CHO$, or $CH_2(CHO)_2$).",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "The major product obtained in the reaction of 1,3-dichlorobenzene with $SO_3 / H_2SO_4$ is:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q6.png",
    options: [
      "(1) 2,4-dichlorobenzenesulfonic acid",
      "(2) 3,5-dichlorobenzenesulfonic acid",
      "(3) 2,6-dichlorobenzenesulfonic acid",
      "(4) Both (1) and (2) are formed in equal amount"
    ],
    correct_index: 0,
    solution: "Chlorine is an ortho/para directing group. In 1,3-dichlorobenzene, position 4 is ortho to one Cl and para to the other Cl, reinforcing electrophilic attack. Position 2 is between both Cl atoms and is sterically hindered. Thus, 2,4-dichlorobenzenesulfonic acid is the major product.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "Compare the stability of following alkenes:\n(i) 1-methylcyclohexene\n(ii) methylenecyclohexane\n(iii) 1,2-dimethylcyclohexene\n(iv) 1,4-dimethylcyclohexene",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q7.png",
    options: [
      "(1) (i) > (ii) > (iii) > (iv)",
      "(2) (i) > (iii) > (ii) > (iv)",
      "(3) (iii) > (i) > (iv) > (ii)",
      "(4) (iv) > (iii) > (ii) > (i)"
    ],
    correct_index: 2,
    solution: "Alkene stability increases with the number of $\\alpha$-hydrogens (hyperconjugation) and substitution of the double bond. (iii) 1,2-dimethylcyclohexene is tetrasubstituted (most stable). (i) and (iv) are trisubstituted, and (ii) methylenecyclohexane is disubstituted with exocyclic double bond (least stable).",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "Which of the following alkane will be formed in high yield by Wurtz Reaction?",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q8.png",
    options: [
      "(1) Bicyclohexyl",
      "(2) Spiro[3.3]heptane",
      "(3) Bicyclobutane derivative",
      "(4) 1,1'-bicyclopentyl derivative"
    ],
    correct_index: 0,
    solution: "The Wurtz reaction ($2 R-X + 2Na \\to R-R + 2NaX$) gives excellent yields for symmetrical alkanes prepared from a single symmetrical alkyl halide. Chlorocyclohexane reacts with sodium to give bicyclohexyl in high yield.",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "Find number of monochloro derivatives (excluding stereoisomers) for isopentane (2-methylbutane):",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q9.png",
    options: [
      "(1) 2",
      "(2) 3",
      "(3) 4",
      "(4) 5"
    ],
    correct_index: 2,
    solution: "2-methylbutane has 4 non-equivalent sets of hydrogen atoms: 1-chloro-2-methylbutane, 2-chloro-2-methylbutane, 2-chloro-3-methylbutane, and 1-chloro-3-methylbutane. Hence, there are 4 constitutional monochloro isomers.",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "In the reaction:\n\n$$CH_3-C\\equiv C-CH=CH-C\\equiv C-CH_3 \\xrightarrow{H_2/Pd-BaSO_4\\text{ (one equivalent)}} A \\xrightarrow{Na/NH_3(l)} B$$\n\nB is:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q10.png",
    options: [
      "(1) Compound with cis and trans double bonds",
      "(2) Compound with all cis double bonds",
      "(3) Compound with all trans double bonds",
      "(4) Diene with unconjugated double bonds"
    ],
    correct_index: 0,
    solution: "Lindlar's catalyst ($H_2 / Pd-BaSO_4$) reduces alkynes selectively via syn addition to cis-alkenes. Subsequent Birch reduction with $Na / NH_3(l)$ reduces the remaining alkyne via anti addition to a trans-alkene, giving a mixed cis-trans polyene.",
    difficulty: "hard",
    question_type: "single_choice"
  },
  {
    question_text: "In the reaction:\n\n$$\\text{Cyclohexene} \\xrightarrow[CH_3COOH]{BD_3 / THF} \\text{Major (P)}$$\n\nP is:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q11.png",
    options: [
      "(1) Trans-1,2-dideuteriocyclohexane",
      "(2) 1,1-dideuteriocyclohexane",
      "(3) Cis-1-deuterio-2-hydrocyclohexane (H and D cis)",
      "(4) Cyclohexanol"
    ],
    correct_index: 2,
    solution: "Hydroboration-protolysis of alkenes using $BD_3/THF$ followed by carboxylic acid ($CH_3COOH$) proceeds via syn-addition of the B-D bond followed by stereoretentive protolysis of the C-B bond by H, resulting in syn addition of D and H (cis relationship).",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "$$CH_3-C\\equiv CH \\xrightarrow{KMnO_4 + H_2SO_4, \\Delta} A \\xrightarrow{NaOH, CaO} B$$\n\nCompound 'B' is:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q12.png",
    options: [
      "(1) $C_2H_6$",
      "(2) $CH_4$",
      "(3) $CH_3COOH$",
      "(4) $CH_3COONa$"
    ],
    correct_index: 1,
    solution: "Oxidative cleavage of propyne ($CH_3-C\\equiv CH$) with hot acidic $KMnO_4$ yields acetic acid ($CH_3COOH$) and $CO_2$. Heating acetic acid with soda lime ($NaOH + CaO$) causes decarboxylation, releasing $CO_2$ and forming methane ($CH_4$).",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "The main product of following reaction is:\n\n$$Ph-CH_2-CH(OH)-CH(CH_3)_2 \\xrightarrow{\\text{Conc. } H_2SO_4, \\Delta}$$",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q13.png",
    options: [
      "(1) $Ph-CH_2-CH=C(CH_3)_2$",
      "(2) $Ph-CH=CH-CH(CH_3)_2$",
      "(3) $Ph-CH_2-CH_2-C(CH_3)=CH_2$",
      "(4) $Ph-C(H)=C(H)-CH(CH_3)_2$ (cis)"
    ],
    correct_index: 1,
    solution: "Acid-catalyzed dehydration proceeds via formation of secondary carbocation $Ph-CH_2-CH^+-CH(CH_3)_2$. A 1,2-hydride shift generates the resonance-stabilized benzylic carbocation $Ph-CH^+-CH_2-CH(CH_3)_2$. Subsequent elimination of $H^+$ yields the stable conjugated trans-alkene $Ph-CH=CH-CH(CH_3)_2$.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "In the sequence:\n\n$$CH_3-CH=CH_2 \\xrightarrow{1.\\ Br_2/CCl_4,\\ 2.\\ NaNH_2(\\text{excess})} B \\xrightarrow{\\text{tert-Butyl chloride}} C\\ (Major)$$\n\nWhich one is correct for C?",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q14.png",
    options: [
      "(1) It has no degree of unsaturation",
      "(2) All C - C bonds are equivalent",
      "(3) It has two degree of unsaturation",
      "(4) It shows $\\sigma - \\pi$ conjugation"
    ],
    correct_index: 3,
    solution: "Bromination of propene followed by excess $NaNH_2$ gives propyne ($CH_3-C\\equiv CH$), which forms sodium propynide ($CH_3-C\\equiv C^- Na^+$). Reaction with tert-butyl chloride ($(CH_3)_3C-Cl$, a bulky tertiary halide) undergoes E2 elimination rather than SN2 substitution, yielding isobutene ($CH_2=C(CH_3)_2$). Isobutene shows $\\sigma-\\pi$ hyperconjugation with 6 $\\alpha$-hydrogens.",
    difficulty: "hard",
    question_type: "single_choice"
  },
  {
    question_text: "What is the major product of the given reaction?\n\n$$\\text{1-methylcyclohexene} + Br_2/H_2O \\to ?$$",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q15.png",
    options: [
      "(1) Trans-2-bromo-1-methylcyclohexan-1-ol",
      "(2) Cis-2-bromo-1-methylcyclohexan-1-ol",
      "(3) 1-bromo-2-methylcyclohexanol",
      "(4) 1,2-dibromo-1-methylcyclohexane"
    ],
    correct_index: 0,
    solution: "Halohydrin formation occurs via a cyclic bromonium ion intermediate. Water attacks the more substituted tertiary carbon from the opposite face (anti addition), yielding trans-2-bromo-1-methylcyclohexan-1-ol with -OH and -Br in trans stereochemistry.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "Which reagent can be used for the conversion of an internal alkyne to a cis-alkene in a cyclopentyl derivative?",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q16.png",
    options: [
      "(1) $Na / \\text{liq. } NH_3$",
      "(2) $H_2, Pd-CaCO_3$",
      "(3) $Li, Ph-NH_2$",
      "(4) $H_2, Pt$"
    ],
    correct_index: 1,
    solution: "Controlled catalytic hydrogenation using Lindlar's catalyst ($H_2$ with $Pd / CaCO_3$ deactivated by quinoline) selectively reduces internal alkynes to cis-alkenes via syn-addition.",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "Which reagent is used for the conversion:\n\n$$CH_3-CH_2-C\\equiv CH \\to CH_3-CH_2-CO-CH_3$$",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q17.png",
    options: [
      "(1) $OsO_4 / NaHSO_3$",
      "(2) $H_2SO_4 / H_2O$",
      "(3) $HgSO_4 / H_2SO_4$",
      "(4) $HIO_4$"
    ],
    correct_index: 2,
    solution: "Hydration of terminal alkynes in the presence of mercuric sulphate and dilute sulphuric acid ($HgSO_4 / H_2SO_4$, Kucherov's reaction) follows Markovnikov's addition to yield an enol intermediate which tautomerizes to butan-2-one.",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "Salicylic acid $+ HNO_3 + H_2SO_4 \\to P\\ (Major)$. Compound P would be:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q18.png",
    options: [
      "(1) 5-nitrosalicylic acid",
      "(2) 3-nitrosalicylic acid",
      "(3) 4-nitrosalicylic acid",
      "(4) 6-nitrosalicylic acid"
    ],
    correct_index: 0,
    solution: "The phenolic -OH group is a powerful ortho/para-directing activator. Position 5 is para to -OH and meta to -COOH, experiencing minimal steric hindrance. Consequently, electrophilic nitration yields 5-nitrosalicylic acid as the major product.",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "$$\\text{Benzene} + CH_2Cl_2 \\xrightarrow{\\text{Anhydrous } AlCl_3} A$$\n\nCompound A is:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q19.png",
    options: [
      "(1) $Ph-CH_2Cl$",
      "(2) $Ph-CHCl_2$",
      "(3) Methylenecyclohexadiene",
      "(4) $Ph-CH_2-Ph$ (Diphenylmethane)"
    ],
    correct_index: 3,
    solution: "In the presence of anhydrous $AlCl_3$, dichloromethane reacts with benzene to first form benzyl chloride ($Ph-CH_2Cl$). Benzyl chloride is even more reactive toward electrophilic aromatic substitution than $CH_2Cl_2$, and rapidly alkylates a second molecule of benzene to yield diphenylmethane ($Ph-CH_2-Ph$).",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "A compound X ($C_5H_8$) reacts with ammoniacal $AgNO_3$ solution to give a white ppt and on oxidation with hot and alkaline $KMnO_4$ gives the acid $(CH_3)_2CH-COOH$. Compound X may be:",
    options: [
      "(1) 3-methyl-1-butyne",
      "(2) 3-methyl-butene",
      "(3) 2-methyl-1,3-butadiene",
      "(4) 1-pentyne"
    ],
    correct_index: 0,
    solution: "Formation of a white precipitate with ammoniacal $AgNO_3$ confirms the presence of a terminal alkyne group ($-C\\equiv CH$). Vigorous oxidative cleavage with hot alkaline $KMnO_4$ oxidizes the terminal $-C\\equiv CH$ to $CO_2$ and the remaining fragment to isobutyric acid ($(CH_3)_2CHCOOH$). Hence, compound X is 3-methyl-1-butyne ($(CH_3)_2CH-C\\equiv CH$).",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_text: "$$Mg_2C_3 \\xrightarrow{H_2O} (X) \\xrightarrow{2\\text{ mole } HCl} (Y)$$\n$$X \\xrightarrow{NaNH_2 (2 eq)} (Z)$$\n\nIdentify X, Y, Z:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q21.png",
    options: [
      "(1) $CH_2=C=CH_2,\\ CH_3-CCl_2-CH_3,\\ CH_3-C=C-CH_3$",
      "(2) $CH_3-C\\equiv CH,\\ CH_3-CCl_2-CH_3,\\ CH_3-C\\equiv CH$",
      "(3) $CH_3-C\\equiv CH,\\ CH_3-CCl_2-CH_3,\\ CH_3-C\\equiv C-CH_3$",
      "(4) None of these"
    ],
    correct_index: 1,
    solution: "Magnesium carbide $Mg_2C_3$ (an allylide containing $C_3^{4-}$ ions) on hydrolysis yields propyne ($X = CH_3-C\\equiv CH$). Addition of 2 moles of $HCl$ proceeds by Markovnikov's rule to yield 2,2-dichloropropane ($Y = CH_3-CCl_2-CH_3$).",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_text: "In the reaction:\n\n$$\\text{Cyclobutyl-CH}_2OH \\xrightarrow{Al_2O_3, \\Delta} A\\ (Major)$$\n\nA is:",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_q22.png",
    options: [
      "(1) Methylenecyclobutane",
      "(2) Cyclopentene",
      "(3) Bicyclo[1.1.0]butane",
      "(4) None of these"
    ],
    correct_index: 1,
    solution: "Acid-induced dehydration of cyclobutylmethanol forms a primary cyclobutylmethyl carbocation. To relieve high angle strain in the 4-membered ring, a 1,2-alkyl shift (ring expansion) occurs to generate the stable cyclopentyl carbocation, which upon loss of $H^+$ yields cyclopentene as the major product.",
    difficulty: "medium",
    question_type: "single_choice"
  }
];

