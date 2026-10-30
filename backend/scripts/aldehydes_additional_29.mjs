/**
 * Additional 29 Questions for Aldehydes, Ketones and Carboxylic Acids
 * Source: Momentum Booster for NEET
 * - Questions 225 to 235 (11 questions, Page 131)
 * - Questions 252 to 260 (9 questions, Page 135)
 * - Assertion-Reason Questions 1 to 9 (9 questions, Pages 137-138)
 */

export const ALDEHYDES_ADDITIONAL_29 = [
  // --- Page 131: Questions 225 to 235 ---
  {
    qNum: 225,
    topic: "Preparation of Acyl Chlorides",
    question_text: "Benzoyl chloride is prepared in high purity from benzoic acid by treatment with:",
    options: [
      "$\\text{Cl}_2 / h\\nu$",
      "$\\text{SO}_2\\text{Cl}_2$",
      "$\\text{Cl}_2 / \\text{H}_2\\text{O}$",
      "$\\text{SOCl}_2$ (Thionyl chloride)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Thionyl chloride ($\\text{SOCl}_2$) is the reagent of choice for converting carboxylic acids into acid chlorides because both by-products, sulfur dioxide ($\\text{SO}_2$) and hydrogen chloride ($\\text{HCl}$), are gaseous and escape from the reaction mixture, leaving behind virtually pure acyl chloride:\n$$\\text{C}_6\\text{H}_5\\text{COOH} + \\text{SOCl}_2 \\to \\text{C}_6\\text{H}_5\\text{COCl} + \\text{SO}_2 \\uparrow + \\text{HCl} \\uparrow$$"
  },
  {
    qNum: 226,
    topic: "Synthesis of Benzyl Alcohol via Grignard Reagent",
    question_text: "Which of the following reactions will yield benzyl alcohol ($\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$)?",
    options: [
      "$\\text{HCHO} \\xrightarrow[\\text{(ii) }\\text{H}^+/\\text{H}_2\\text{O}]{\\text{(i) }\\text{C}_6\\text{H}_5\\text{MgBr}}$",
      "$\\text{C}_6\\text{H}_5\\text{CHO} \\xrightarrow[\\text{(ii) }\\text{H}^+/\\text{H}_2\\text{O}]{\\text{(i) }\\text{CH}_3\\text{MgBr}}$",
      "$\\text{CH}_3\\text{CHO} \\xrightarrow[\\text{(ii) }\\text{H}^+/\\text{H}_2\\text{O}]{\\text{(i) }\\text{C}_6\\text{H}_5\\text{CH}_2\\text{MgBr}}$",
      "$(\\text{CH}_3)_2\\text{CO} \\xrightarrow[\\text{(ii) }\\text{H}^+/\\text{H}_2\\text{O}]{\\text{(i) }\\text{C}_6\\text{H}_5\\text{MgBr}}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Reaction of phenylmagnesium bromide ($\\text{C}_6\\text{H}_5\\text{MgBr}$) with formaldehyde ($\\text{HCHO}$) produces a primary alcohol with one additional carbon attached to the benzene ring: benzyl alcohol ($\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$).\nReaction (2) gives 1-phenylethanol ($2^\\circ$), reaction (3) gives 1-phenylpropan-2-ol ($2^\\circ$), and reaction (4) gives 2-phenylpropan-2-ol ($3^\\circ$)."
  },
  {
    qNum: 227,
    topic: "Chemical Properties of Formic Acid",
    question_text: "Which of the following statements is INCORRECT about formic acid ($\\text{HCOOH}$)?",
    options: [
      "It is a stronger acid than $\\text{CH}_3\\text{COOH}$",
      "It forms stable formyl chloride upon reaction with $\\text{PCl}_5$",
      "It decomposes into $\\text{CO}$ and $\\text{H}_2\\text{O}$ on heating with concentrated $\\text{H}_2\\text{SO}_4$",
      "It reduces Tollen's reagent to metallic silver"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Formic acid does NOT form stable formyl chloride ($\\text{HCOCl}$) when treated with $\\text{PCl}_5$. Formyl chloride is extremely unstable at room temperature and decomposes spontaneously into carbon monoxide and hydrogen chloride ($\\text{CO} + \\text{HCl}$). Hence, statement (2) is incorrect."
  },
  {
    qNum: 228,
    topic: "Ozonolysis and Aldol Condensation",
    question_text: "In the sequence:\n\n$$A \\xrightarrow[\\text{(ii) Zn/H}_2\\text{O}]{\\text{(i) O}_3} B + C$$\n\nCompound $B$ gives a positive iodoform test, and when treated with dilute $\\text{NaOH}$:\n\n$$B + C \\xrightarrow{\\text{NaOH}} \\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CHO}$$\n\nCompound $A$ is:",
    options: [
      "$\\text{CH}_2=\\text{CH}-\\text{CH}_3$ (Propene)",
      "$\\text{CH}_2=\\text{CH}-\\text{CH}(\\text{CH}_3)_2$",
      "$\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$ (But-2-ene)",
      "$\\text{CH}\\equiv\\text{CH}$ (Ethyne)"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "The aldol addition product $\\text{CH}_3\\text{CH(OH)CH}_2\\text{CHO}$ (3-hydroxybutanal) is formed by the self-aldol condensation of two molecules of acetaldehyde ($\\text{CH}_3\\text{CHO}$). Acetaldehyde gives a positive iodoform test. Reductive ozonolysis of symmetrical but-2-ene ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$) yields two molecules of acetaldehyde ($B = C = \\text{CH}_3\\text{CHO}$)."
  },
  {
    qNum: 229,
    topic: "Structural Requirements for Claisen Condensation",
    question_text: "Which of the following esters does NOT undergo Claisen ester condensation?",
    options: [
      "$\\text{CH}_3\\text{COOC}_2\\text{H}_5$ (Ethyl acetate)",
      "$\\text{CH}_3\\text{COOCH}_3$ (Methyl acetate)",
      "$\\text{CH}_3\\text{CH}_2\\text{COOC}_2\\text{H}_5$ (Ethyl propionate)",
      "$(\\text{CH}_3)_3\\text{CCOOC}_2\\text{H}_5$ (Ethyl pivalate)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Claisen condensation requires an ester to possess at least two $\\alpha$-hydrogen atoms: one to form the nucleophilic enolate, and a second to allow deprotonation of the resulting $\\beta$-keto ester to drive the equilibrium forward. Ethyl pivalate (ethyl 2,2-dimethylpropanoate) has zero $\\alpha$-hydrogens and cannot undergo Claisen condensation."
  },
  {
    qNum: 230,
    topic: "Grignard Reaction with Esters",
    question_text: "In the reaction:\n\n$$\\text{CH}_3\\text{COOC}_2\\text{H}_5 \\xrightarrow[\\text{(ii) }\\text{H}_3\\text{O}^+]{\\text{(i) }\\text{RMgX (excess), ether}} A$$\n\nThe product $A$ is a(n):",
    options: [
      "Aldehyde",
      "Ketone",
      "$2^\\circ$-Alcohol",
      "$3^\\circ$-Alcohol"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "When an ester is treated with excess Grignard reagent ($\\text{RMgX}$), the first mole adds nucleophilically to form an intermediate ketone. The ketone is more reactive than the ester and immediately reacts with a second mole of Grignard reagent to produce a tertiary ($3^\\circ$) alcohol upon hydrolysis: $\\text{CH}_3-\\text{C(OH)R}_2$."
  },
  {
    qNum: 231,
    topic: "Ionization Constant of Nitrobenzoic Acids",
    question_text: "Which of the following compounds has the highest ionization constant ($K_a$)?",
    options: [
      "$o$-Nitrobenzoic acid",
      "$p$-Nitrobenzoic acid",
      "$m$-Nitrobenzoic acid",
      "Benzoic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Due to the ortho effect (steric inhibition of resonance forces the carboxyl group out of the aromatic ring plane, preventing cross-conjugation), $o$-nitrobenzoic acid has $K_a \\approx 6.7 \\times 10^{-3}$ ($\\text{p}K_a \\approx 2.17$), which is substantially higher than $p$-nitrobenzoic acid ($K_a \\approx 3.7 \\times 10^{-4}$) and $m$-nitrobenzoic acid ($K_a \\approx 3.2 \\times 10^{-4}$)."
  },
  {
    qNum: 232,
    topic: "Aldol and Stability Comparisons",
    question_text: "Which of the following statements is INCORRECT?",
    options: [
      "$o$-Methylaniline is a weaker base than aniline (ortho effect in anilines)",
      "$o$-Methylbenzoic acid is a stronger acid than benzoic acid (ortho effect in benzoic acids)",
      "$(\\text{CH}_3)_3\\text{C}^+$ (tert-butyl cation) is more stable than $\\text{PhCH}_2^+$ (primary benzyl cation)",
      "Salicylaldehyde (2-hydroxybenzaldehyde) undergoes intramolecular aldol condensation"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Salicylaldehyde is an aromatic aldehyde with a phenolic $-\\text{OH}$ group attached to a benzene ring. It completely lacks an $\\alpha$-hydrogen atom and cannot undergo aldol condensation. Therefore, statement (4) is completely incorrect."
  },
  {
    qNum: 233,
    topic: "Fehling's Solution Positive Test Scope",
    question_text: "Which of the following gives a positive Fehling's solution test (red precipitate of $\\text{Cu}_2\\text{O}$)?",
    options: [
      "Fructose in alkaline medium",
      "Formic acid ($\\text{HCOOH}$)",
      "3-Phenylpropanal ($\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{CH}_2-\\text{CHO}$)",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. Fructose is an $\\alpha$-hydroxy ketone that isomerizes to glucose/mannose in alkaline solution and reduces Fehling's solution.\n2. Formic acid contains an oxidizable aldehydic $-\\text{CHO}$ hydrogen and reduces Fehling's solution.\n3. 3-Phenylpropanal is an aliphatic aldehyde (the $-\\text{CHO}$ group is separated from the aromatic ring by two methylene carbons) and readily reduces Fehling's solution.\nHence, all of these give a positive Fehling's test."
  },
  {
    qNum: 234,
    topic: "Ozonolysis of Exocyclic Dienes",
    question_text: "Complete reductive ozonolysis ($\\text{O}_3$ followed by $\\text{Zn} / \\text{H}_2\\text{O}$) of 1,4-di(propan-2-ylidene)cyclohexane yields acetone and a dialdehyde. Which of the following is NOT a product of this reaction?",
    options: [
      "Acetone ($\\text{CH}_3\\text{COCH}_3$)",
      "Butanedial (Succinaldehyde)",
      "Formaldehyde ($\\text{HCHO}$)",
      "Cyclohexane-1,4-dione derivatives"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "The compound contains two exocyclic double bonds connecting isopropylidene groups to the ring: $=C(Me)_2$. Reductive cleavage of both double bonds produces acetone from the outer carbons and carbonyls at the ring carbons. Because there are no terminal methylene groups ($=CH_2$), formaldehyde ($\\text{HCHO}$) is NOT formed."
  },
  {
    qNum: 235,
    topic: "Aldol Condensation Substrates",
    question_text: "Aldol condensation is given by which of the following compounds?",
    options: [
      "3-Methylpentanal",
      "1-Phenylpropanone (Propiophenone)",
      "Phenylacetaldehyde",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Any aldehyde or ketone possessing at least one $\\alpha$-hydrogen atom can undergo aldol condensation. 3-Methylpentanal has two $\\alpha$-hydrogens ($-\\text{CH}_2\\text{CHO}$), propiophenone has two $\\alpha$-hydrogens ($-\\text{COCH}_2\\text{CH}_3$), and phenylacetaldehyde has two $\\alpha$-hydrogens ($\\text{PhCH}_2\\text{CHO}$). Thus, all of these undergo aldol condensation."
  },

  // --- Page 135: Questions 252 to 260 ---
  {
    qNum: 252,
    topic: "Dehydration of Formic Acid and Phosgene Formation",
    question_text: "In the sequence:\n\n$$\\text{HCOOH} \\xrightarrow[373\\text{ K}]{\\text{conc. H}_2\\text{SO}_4} \\text{Gas } A + B \\xrightarrow{h\\nu + \\text{Cl}_2} X$$\n\nCompound $X$ in the above reaction is:",
    options: [
      "$\\text{CCl}_4$",
      "$\\text{CHCl}_3$",
      "$\\text{HCl} + \\text{CO}_2$",
      "$\\text{COCl}_2$ (Phosgene)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. Concentrated $\\text{H}_2\\text{SO}_4$ dehydrates formic acid at 373 K to carbon monoxide (Gas $A$) and water ($B$):\n$$\\text{HCOOH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4, \\Delta} \\text{CO} \\uparrow + \\text{H}_2\\text{O}$$\n2. In the presence of sunlight ($h\\nu$), carbon monoxide adds chlorine gas to form carbonyl chloride (phosgene, $\\text{COCl}_2$, $X$):\n$$\\text{CO} + \\text{Cl}_2 \\xrightarrow{h\\nu} \\text{COCl}_2$$"
  },
  {
    qNum: 253,
    topic: "Multistep Synthesis of Mesityl Oxide",
    question_text: "In the reaction sequence:\n\n$$\\text{H}_3\\text{C}-\\text{C}(\\text{CH}_3)_2-\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{HBr}} A \\xrightarrow[\\Delta]{\\text{alc. KOH}} B \\xrightarrow[\\text{(ii) Zn, H}_2\\text{O}]{\\text{(i) O}_3} C \\xrightarrow[\\Delta]{\\text{dil. OH}^-} D\\text{ (major)}$$\n\nThe product $D$ is:",
    options: [
      "4-Hydroxy-2-methylpent-3-enone",
      "2-Methylpenta-1,3-diene",
      "4-Methylpent-3-en-2-one (Mesityl oxide)",
      "Cyclohexanone"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "1. Addition of $\\text{HBr}$ to 3,3-dimethylbut-1-ene gives a carbocation that undergoes a 1,2-methyl shift to yield 2-bromo-2,3-dimethylbutane ($A$).\n2. Dehydrohalogenation with alcoholic $\\text{KOH}$ gives the most substituted alkene: 2,3-dimethylbut-2-ene ($B$, $(\\text{CH}_3)_2\\text{C}=\\text{C}(\\text{CH}_3)_2$).\n3. Reductive ozonolysis cleaves the tetrasubstituted alkene into two molecules of acetone ($C$, $\\text{CH}_3\\text{COCH}_3$).\n4. Base-catalysed aldol condensation of acetone with heating yields mesityl oxide: 4-methylpent-3-en-2-one ($D$)."
  },
  {
    qNum: 254,
    topic: "Chemoselective Carbonyl Protection and Reduction",
    question_text: "In the reaction sequence:\n\n$$\\text{3-Oxocyclohexanecarbaldehyde} \\xrightarrow[\\text{(1 equivalent)}]{\\text{HOCH}_2\\text{CH}_2\\text{OH}} X \\xrightarrow{\\text{NaBH}_4} Y \\xrightarrow{\\text{H}_3\\text{O}^+} Z$$\n\nThe compound $Z$ is:",
    options: [
      "3-(Hydroxymethyl)cyclohexanol",
      "3-(Hydroxymethyl)cyclohexanone",
      "3-Methylcyclohexanone",
      "3-Hydroxycyclohexanecarbaldehyde"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "hard",
    solution: "1. Aldehydes are substantially more electrophilic and less sterically crowded than ketones. With exactly 1 equivalent of ethylene glycol, the aldehyde group is chemoselectively protected as a cyclic 1,3-dioxolane acetal ($X$), leaving the ketone unreacted.\n2. Reduction with $\\text{NaBH}_4$ selectively reduces the ketone to a secondary alcohol ($Y$).\n3. Acid hydrolysis deprotects the cyclic acetal back to the aldehyde, yielding 3-hydroxycyclohexanecarbaldehyde ($Z$)."
  },
  {
    qNum: 255,
    topic: "Acidity of Aminobenzoic Acids",
    question_text: "The correct acidic strength order among the aminobenzoic acids is:\n\nI: Benzoic acid\nII: $m$-Aminobenzoic acid\nIII: $o$-Aminobenzoic acid\nIV: $p$-Aminobenzoic acid",
    options: [
      "$\\text{I} > \\text{II} > \\text{IV} > \\text{III}$",
      "$\\text{IV} > \\text{III} > \\text{II} > \\text{I}$",
      "$\\text{III} > \\text{II} > \\text{I} > \\text{IV}$",
      "$\\text{III} > \\text{I} > \\text{II} > \\text{IV}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. $o$-Aminobenzoic acid (III) is the strongest acid due to the ortho effect.\n2. In $p$-aminobenzoic acid (IV), the $-\\text{NH}_2$ group donates electrons strongly by $+M$ resonance, severely destabilizing the carboxylate anion and making it the weakest acid.\n3. Benzoic acid (I) is stronger than $m$-aminobenzoic acid (II) because the latter has weak electron donation and zwitterionic character in aqueous medium.\nOrder: $\\text{III} > \\text{I} > \\text{II} > \\text{IV}$."
  },
  {
    qNum: 256,
    topic: "Selective Carbonyl Reduction of Conjugated Enones",
    question_text: "In the reduction of cyclopent-2-en-1-one with $\\text{NaBH}_4$ in methanol:\n\n$$\\text{Cyclopent-2-en-1-one} \\xrightarrow[\\text{MeOH}]{\\text{NaBH}_4} X\\text{ (Major)}$$\n\nThe major product $X$ is:",
    options: [
      "Cyclopentene",
      "Cyclopentanone",
      "Cyclopent-2-en-1-ol",
      "Cyclopentanol"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "$\\text{NaBH}_4$ in methanol selectively reduces the carbonyl group via 1,2-addition to yield the allylic alcohol, cyclopent-2-en-1-ol, without reducing the carbon-carbon double bond."
  },
  {
    qNum: 257,
    topic: "Kinetics of Cannizzaro Reaction at High Base Concentration",
    question_text: "In the Cannizzaro reaction, when the concentration of hydroxide ion is very high, the reaction follows which overall order of kinetics?",
    options: [
      "First order",
      "Second order",
      "Fourth order",
      "Zero order"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "At normal base concentrations, the Cannizzaro reaction is 3rd order overall: $\\text{Rate} = k[\\text{ArCHO}]^2[\\text{OH}^-]$. However, at very high base concentration, a second proton is abstracted from the monoanion to generate a dianion ($[\\text{ArCH(O}^-)_2]$), which then transfers hydride in the rate-determining step. The rate law becomes fourth order overall:\n$$\\text{Rate} = k'[\\text{ArCHO}]^2[\\text{OH}^-]^2$$"
  },
  {
    qNum: 258,
    topic: "Adipic Acid Pyrolysis and Aldol Condensation",
    question_text: "In the reaction:\n\n$$\\text{Adipic acid} \\xrightarrow[-\\text{CO}_2, -\\text{H}_2\\text{O}]{\\text{P}_2\\text{O}_5, \\Delta} A \\xrightarrow[\\Delta]{\\text{dil. OH}^-} B$$\n\nThe compound $B$ is:",
    options: [
      "2-(1-Hydroxycyclopentyl)cyclopentan-1-one",
      "2-Cyclopentylidenecyclopentan-1-one",
      "Cyclopentylcyclopentene",
      "Spiro[4.4]nonane"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Pyrolytic cyclodecarboxylation of adipic acid yields cyclopentanone ($A$). Treatment of cyclopentanone with dilute hydroxide and heat brings about self-aldol condensation followed by dehydration to yield 2-cyclopentylidenecyclopentan-1-one ($B$)."
  },
  {
    qNum: 259,
    topic: "Identification of Carbonyl Semicarbazones",
    question_text: "A compound $A$ ($\\text{C}_3\\text{H}_8\\text{O}$) is oxidised with acidified $\\text{K}_2\\text{Cr}_2\\text{O}_7$ to form $B$ ($\\text{C}_3\\text{H}_6\\text{O}$), which forms a silver mirror with Tollen's reagent. When $B$ is treated with semicarbazide ($\\text{H}_2\\text{N-NH-CONH}_2$) in acidic medium, it gives $C$. The structure of $C$ is:",
    options: [
      "$\\text{CH}_3\\text{CH}_2\\text{CH}=\\text{N-NHCONH}_2$ (Propanal semicarbazone)",
      "$(\\text{CH}_3)_2\\text{C}=\\text{N-CONHNH}_2$",
      "$\\text{H}_3\\text{C}-\\text{CH}=\\text{N-NHCONH}_2$",
      "$\\text{CH}_3\\text{CH}_2\\text{CH}=\\text{N-CONHNH}_2$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. Compound $A$ is propan-1-ol ($\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}$). Oxidation gives propanal ($B$, $\\text{CH}_3\\text{CH}_2\\text{CHO}$), which reduces Tollen's reagent.\n2. Semicarbazide has two $-\\text{NH}_2$ groups. The hydrazine $-\\text{NH}_2$ is much more nucleophilic than the amide $-\\text{CONH}_2$ (which is resonance-deactivated). Condensation occurs at the hydrazine nitrogen to produce propanal semicarbazone:\n$$\\text{CH}_3\\text{CH}_2\\text{CH}=\\text{N-NHCONH}_2$$"
  },
  {
    qNum: 260,
    topic: "Haloform Oxidation of 2-Butanone",
    question_text: "Which reagent is used for the selective conversion of 2-butanone to propanoic acid with loss of one carbon atom?",
    options: [
      "$\\text{SeO}_2$",
      "Fehling's solution",
      "$\\text{NaOH} / \\text{I}_2$ followed by $\\text{H}^+$",
      "Tollen's reagent"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "2-Butanone is a methyl ketone ($\\text{CH}_3\\text{CH}_2\\text{COCH}_3$). Reaction with iodine in aqueous $\\text{NaOH}$ (haloform reaction) cleaves the methyl group as iodoform ($\\text{CHI}_3 \\downarrow$) and leaves sodium propanoate. Acidification yields propanoic acid ($\\text{CH}_3\\text{CH}_2\\text{COOH}$)."
  },

  // --- Pages 137-138: Assertion - Reason Questions 1 to 9 ---
  {
    qNum: 261,
    topic: "Nomenclature of Aldehydes (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Each question contains Statement-1 (Assertion) and Statement-2 (Reason). Examine the statements carefully and select the correct option from:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): The common name of $\\text{CH}_3-\\text{CH(Br)}-\\text{CH}_2-\\text{CHO}$ is $\\beta$-bromobutyraldehyde.\nReason (R): Common names reflect the Latin or Greek term for the original source of the aldehyde and the location of the substituent in the carbon chain is indicated by Greek letters $\\alpha, \\beta, \\gamma, \\delta$ etc.",
    assertion_text: "The common name of $\\text{CH}_3-\\text{CH(Br)}-\\text{CH}_2-\\text{CHO}$ is $\\beta$-bromobutyraldehyde.",
    reason_text: "Common names reflect the Latin or Greek term for the original source of the aldehyde and the location of the substituent in the carbon chain is indicated by Greek letters $\\alpha, \\beta, \\gamma, \\delta$ etc.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Both Assertion and Reason are true. In common nomenclature, butyraldehyde is the 4-carbon aldehyde root (derived from Latin butyrum). The carbon adjacent to the carbonyl carbon is designated $\\alpha$, the next is $\\beta$, and so on. The bromine substituent is on the $\\beta$-carbon, making its common name $\\beta$-bromobutyraldehyde. Reason correctly explains how the common name is derived."
  },
  {
    qNum: 262,
    topic: "Polarity of Carbonyl Compounds (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): Carbonyl compounds have substantial dipole moments and are more polar than ethers.\nReason (R): The high polarity of the carbonyl group is explained on the basis of resonance involving a neutral and dipolar structure.",
    assertion_text: "Carbonyl compounds have substantial dipole moments and are more polar than ethers.",
    reason_text: "The high polarity of the carbonyl group is explained on the basis of resonance involving a neutral and dipolar structure.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Both Assertion and Reason are true, and Reason correctly explains Assertion. Carbonyl compounds ($>\\text{C}=\\text{O}$) have dipole moments of 2.3–2.8 D, which are higher than ethers (1.1–1.3 D) because of the resonance contributor $>\\overset{\\oplus}{\\text{C}}-\\overset{\\ominus}{\\text{O}}$, which places a formal negative charge on oxygen and a positive charge on carbon."
  },
  {
    qNum: 263,
    topic: "Hydration of Alkynes (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): Hydration of ethyne in the presence of $\\text{H}_2\\text{SO}_4$ and $\\text{HgSO}_4$ gives acetaldehyde.\nReason (R): Hydration of all other alkynes gives ketones.",
    assertion_text: "Hydration of ethyne in the presence of $\\text{H}_2\\text{SO}_4$ and $\\text{HgSO}_4$ gives acetaldehyde.",
    reason_text: "Hydration of all other alkynes gives ketones.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "Assertion is true (ethyne hydrates to vinyl alcohol which tautomerises to acetaldehyde). Reason is also true (Markovnikov addition of water to any higher terminal or internal alkyne places the carbonyl on an internal carbon to form a ketone). However, Reason is a statement of observation for other alkynes and does not explain why ethyne gives acetaldehyde (ethyne has only 2 carbons). Hence, option (2) is correct."
  },
  {
    qNum: 264,
    topic: "Ozonolysis Products (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): Reductive ozonolysis of substituted alkenes always produces ketones.\nReason (R): Reductive ozonolysis of ethene gives acetaldehyde.",
    assertion_text: "Reductive ozonolysis of substituted alkenes always produces ketones.",
    reason_text: "Reductive ozonolysis of ethene gives acetaldehyde.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Both Assertion and Reason are false statements. Reductive ozonolysis of mono- or 1,2-disubstituted alkenes produces aldehydes (e.g. propene gives acetaldehyde and formaldehyde), not always ketones. Reductive ozonolysis of ethene ($\\text{CH}_2=\\text{CH}_2$) gives formaldehyde ($\\text{HCHO}$), not acetaldehyde."
  },
  {
    qNum: 265,
    topic: "Intermolecular Forces and Boiling Points (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): The boiling point of propan-1-ol is more than the boiling point of acetone.\nReason (R): Aldehydes and ketones have dipole-dipole interactions.",
    assertion_text: "The boiling point of propan-1-ol is more than the boiling point of acetone.",
    reason_text: "Aldehydes and ketones have dipole-dipole interactions.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Assertion is true: propan-1-ol boils at 97 °C whereas acetone boils at 56 °C. Reason is also true: aldehydes and ketones associate through dipole-dipole interactions. However, the reason propan-1-ol has a higher boiling point is because it exhibits intermolecular hydrogen bonding, which is substantially stronger than dipole-dipole interactions. Hence, Reason does not explain Assertion (Option 2)."
  },
  {
    qNum: 266,
    topic: "Water Solubility of Carbonyls (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): The lower members of aldehydes and ketones such as methanal, ethanal and propanone are miscible with water in all proportions.\nReason (R): They form hydrogen bonds with water molecules.",
    assertion_text: "The lower members of aldehydes and ketones such as methanal, ethanal and propanone are miscible with water in all proportions.",
    reason_text: "They form hydrogen bonds with water molecules.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion. The small non-polar hydrocarbon parts in methanal, ethanal, and propanone do not hinder solubility, and the electronegative carbonyl oxygen readily acts as a hydrogen bond acceptor to form strong intermolecular hydrogen bonds with water molecules."
  },
  {
    qNum: 267,
    topic: "Carbonyl Reactivity in Nucleophilic Addition (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): Benzaldehyde is more reactive than acetone towards nucleophilic addition reactions.\nReason (R): Aldehydes are generally more reactive than ketones.",
    assertion_text: "Benzaldehyde is more reactive than acetone towards nucleophilic addition reactions.",
    reason_text: "Aldehydes are generally more reactive than ketones.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Both Assertion and Reason are true, and Reason correctly explains Assertion. Aldehydes are sterically less crowded and have only one electron-donating substituent compared to ketones which have two alkyl groups. Hence, benzaldehyde is more reactive towards nucleophilic addition than acetone."
  },
  {
    qNum: 268,
    topic: "Aromaticity of Phloroglucinol Enol Form (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): The enol form of cyclohexane-1,3,5-trione is more stable than its keto form.\nReason (R): The enol form is aromatic.",
    assertion_text: "The enol form of cyclohexane-1,3,5-trione is more stable than its keto form.",
    reason_text: "The enol form is aromatic.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Cyclohexane-1,3,5-trione undergoes complete keto-enol tautomerism to benzene-1,3,5-triol (phloroglucinol). The enol form possesses a planar, fully conjugated ring with $6\\pi$ electrons satisfying Hückel's $(4n+2)$ rule, conferring tremendous aromatic stabilization energy that makes it much more stable than the triketo form."
  },
  {
    qNum: 269,
    topic: "Haloform Reaction of Acetic Acid (Assertion-Reason)",
    question_type: "assertion_reason",
    question_text: "Directions: Select the correct option:\n(1) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.\n(2) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.\n(3) Assertion is true but Reason is false.\n(4) Both Assertion and Reason are false.\n\nAssertion (A): Acetic acid does not undergo the iodoform reaction.\nReason (R): Acetic acid has no $\\alpha$-hydrogens.",
    assertion_text: "Acetic acid does not undergo the iodoform reaction.",
    reason_text: "Acetic acid has no $\\alpha$-hydrogens.",
    options: [
      "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      "Assertion is true but Reason is false",
      "Both Assertion and Reason are false"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Assertion is true: acetic acid contains a $-\\text{COOH}$ group rather than a ketone/aldehyde carbonyl; base removes the acidic proton from $-\\text{COOH}$ to form an unreactive carboxylate anion which does not undergo the haloform reaction. Reason is false: acetic acid ($\\text{CH}_3\\text{COOH}$) has 3 $\\alpha$-hydrogens on its methyl carbon. Hence, Assertion is true but Reason is false."
  }
];

