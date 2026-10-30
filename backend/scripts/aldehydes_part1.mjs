/**
 * Aldehydes, Ketones and Carboxylic Acids - Questions 1 to 35
 * Source: Aakash Momentum Booster for NEET (Section A Objective Type Questions)
 */

export const ALDEHYDES_PART1 = [
  {
    qNum: 1,
    topic: "Oxidation of Alcohols to Carbonyl Compounds",
    question_text: "$$\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_2\\text{OH} \\xrightarrow{[O]} \\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CHO}$$\n\nSelect the correct oxidising agent among the following:",
    options: [
      "PCC",
      "$\\text{KMnO}_4 / \\text{OH}^-$",
      "$\\text{K}_2\\text{Cr}_2\\text{O}_7 / \\text{H}^+$",
      "$\\text{Conc. HNO}_3$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "PCC (Pyridinium Chlorochromate) is a mild oxidising agent that selectively oxidises primary allylic alcohols to $\\alpha,\\beta$-unsaturated aldehydes without cleaving or oxidising the carbon-carbon double bond ($\\text{C}=\\text{C}$). Strong oxidising agents like $\\text{KMnO}_4$, $\\text{K}_2\\text{Cr}_2\\text{O}_7$, or concentrated $\\text{HNO}_3$ oxidise the alcohol to a carboxylic acid and also cleave the alkene double bond."
  },
  {
    qNum: 2,
    topic: "Preparation of Carboxylic Acid Anhydrides",
    question_text: "The product of the following reaction will be:\n\n$$\\text{CH}_3-\\text{COOH} \\xrightarrow{\\text{P}_2\\text{O}_5 / \\Delta} \\text{Product}$$",
    options: [
      "$\\text{CH}_3-\\text{CO}-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{CHO}$",
      "$\\text{CH}_3-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{CO}-\\text{O}-\\text{CO}-\\text{CH}_3$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Heating ethanoic acid (acetic acid) with phosphorus pentoxide ($\\text{P}_2\\text{O}_5$), a powerful dehydrating agent, causes intermolecular dehydration between two molecules of acetic acid to yield ethanoic anhydride (acetic anhydride, $\\text{CH}_3\\text{COOCOCH}_3$):\n$$2\\text{CH}_3\\text{COOH} \\xrightarrow{\\text{P}_2\\text{O}_5, \\Delta} (\\text{CH}_3\\text{CO})_2\\text{O} + \\text{H}_2\\text{O}$$"
  },
  {
    qNum: 3,
    topic: "Hydroboration-Oxidation of Alkynes",
    question_text: "What is the major product of the following reaction?\n\n$$\\text{H}_3\\text{C}-\\text{C}\\equiv\\text{C}-\\text{H} \\xrightarrow[\\text{(ii) }\\text{H}_2\\text{O}_2, \\text{OH}^-]{\\text{(i) }\\text{B}_2\\text{H}_6, \\text{THF}} \\text{Major Product}$$",
    options: [
      "$\\text{H}_3\\text{C}-\\text{CH}=\\text{CH}-\\text{OH}$",
      "$\\text{H}_3\\text{C}-\\text{C}(\\text{OH})=\\text{CH}_2$",
      "$\\text{CH}_3-\\text{CO}-\\text{CH}_3$",
      "$\\text{H}_3\\text{C}-\\text{CH}_2-\\text{CHO}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Hydroboration-oxidation of a terminal alkyne (propyne) gives anti-Markovnikov addition of water across the triple bond to form an unstable enol ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{OH}$), which rapidly tautomerises to the more stable aldehyde, propanal ($\\text{CH}_3\\text{CH}_2\\text{CHO}$)."
  },
  {
    qNum: 4,
    topic: "Acidity of Carboxylic Acids",
    question_text: "The correct acid strength order of the following is:\n\nI: Benzoic acid\nII: $o$-Nitrobenzoic acid\nIII: $m$-Nitrobenzoic acid\nIV: $p$-Nitrobenzoic acid",
    options: [
      "$\\text{IV} > \\text{II} > \\text{III} > \\text{I}$",
      "$\\text{II} > \\text{III} > \\text{IV} > \\text{I}$",
      "$\\text{II} > \\text{IV} > \\text{III} > \\text{I}$",
      "$\\text{I} > \\text{II} > \\text{III} > \\text{IV}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. Ortho-nitrobenzoic acid (II) is the strongest acid due to the ortho effect (steric hindrance forces the carboxyl group out of the ring plane, preventing cross-conjugation and enhancing acidity).\n2. At the para position (IV), the nitro group exerts strong $-M$ (mesomeric) and $-I$ (inductive) electron-withdrawing effects.\n3. At the meta position (III), the nitro group exerts only $-I$ effect (no mesomeric interaction with the meta position).\n4. Benzoic acid (I) has no electron-withdrawing substituents and is the weakest.\nHence, the acidity order is $\\text{II} > \\text{IV} > \\text{III} > \\text{I}$."
  },
  {
    qNum: 5,
    topic: "Cyanohydrin Formation and Hydrolysis",
    question_text: "In the reaction sequence:\n\n$$\\text{Acetaldehyde} \\xrightarrow{\\text{HCN}} X \\xrightarrow{\\text{H}^+ / \\text{H}_2\\text{O}} Y$$\n\nThe product $Y$ is:",
    options: [
      "Tartaric acid",
      "Lactic acid",
      "Malonic acid",
      "Adipic acid"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "Nucleophilic addition of $\\text{HCN}$ to acetaldehyde ($\\text{CH}_3\\text{CHO}$) forms acetaldehyde cyanohydrin, $\\text{CH}_3\\text{CH(OH)CN}$ ($X$). Complete acid-catalysed hydrolysis of the nitrile ($-\\text{CN}$) group converts it into a carboxyl ($-\\text{COOH}$) group, producing 2-hydroxypropanoic acid (lactic acid, $Y$)."
  },
  {
    qNum: 6,
    topic: "Mozingo Reduction of Carbonyls",
    question_text: "In the reaction sequence:\n\n$$\\text{CH}_2=\\text{CH}-\\text{CO}-\\text{CH}_3 \\xrightarrow{\\text{HS}-\\text{CH}_2-\\text{CH}_2-\\text{SH}} A \\xrightarrow{\\text{Ni} / \\text{H}_2 \\text{ (Raney Nickel)}} B$$\n\nThe final product $B$ is:",
    options: [
      "Butan-2-ol",
      "But-3-en-2-ol",
      "But-1-ene",
      "Butane"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Treatment of but-3-en-2-one with ethane-1,2-dithiol forms a cyclic 1,3-dithiolane (thioketal) intermediate ($A$). Subsequent reduction with Raney nickel and hydrogen gas desulfurises the cyclic thioacetal to a methylene group ($-\\text{CH}_2-$) and simultaneously hydrogenates the carbon-carbon double bond, yielding butane."
  },
  {
    qNum: 7,
    topic: "Lactone Formation via Selective Reduction",
    question_text: "What is the product for the following reaction?\n\n$$2\\text{-(formylmethyl)benzoic acid} \\xrightarrow[\\text{(ii) }\\text{H}^+/\\text{H}_2\\text{O}]{\\text{(i) }\\text{NaBH}_4} \\text{Cyclic Product}$$",
    options: [
      "Indane-1,3-dione",
      "3,4-Dihydroisocoumarin (isochroman-1-one)",
      "Isochroman-4-one",
      "Both (2) and (3)"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    solution: "$\\text{NaBH}_4$ selectively reduces the aldehyde group ($-\\text{CH}_2\\text{CHO}$) to a primary alcohol ($-\\text{CH}_2\\text{CH}_2\\text{OH}$) without affecting the carboxylic acid group ($-\\text{COOH}$). Subsequent acidic workup promotes intramolecular esterification between the carboxyl group and the alcohol to form a stable 6-membered lactone ring fused to the benzene ring: 3,4-dihydroisocoumarin (isochroman-1-one)."
  },
  {
    qNum: 8,
    topic: "Aldol Condensation of Ketones",
    question_text: "Cyclopentanone undergoes reaction with dilute base under heating:\n\n$$\\text{Cyclopentanone} \\xrightarrow{\\text{dil. KOH} / \\Delta} \\text{Product}$$\n\nThe major product is:",
    options: [
      "2-(1-Hydroxycyclopentyl)cyclopentan-1-one",
      "2-Cyclopentylidenecyclopentan-1-one",
      "2-(Cyclopent-1-en-1-yl)cyclopentanol",
      "Cyclopentane-1,2-dione"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Cyclopentanone undergoes self-aldol condensation in the presence of dilute base. Upon heating ($\\Delta$), the intermediate $\\beta$-hydroxy ketone readily dehydrates to form an $\\alpha,\\beta$-unsaturated ketone: 2-cyclopentylidenecyclopentan-1-one."
  },
  {
    qNum: 9,
    topic: "Fehling's Solution Test",
    question_text: "Which among the following give(s) negative test with Fehling's reagent?",
    options: [
      "Aliphatic aldehyde",
      "Aromatic aldehyde",
      "$\\alpha$-hydroxy ketone",
      "Both (1) and (3)"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "Fehling's reagent is a mild oxidising agent. Aromatic aldehydes (such as benzaldehyde) do not reduce Fehling's reagent because the carbonyl carbon is resonance-stabilised by the benzene ring. Aliphatic aldehydes and $\\alpha$-hydroxy ketones reduce Fehling's solution to give a red precipitate of $\\text{Cu}_2\\text{O}$."
  },
  {
    qNum: 10,
    topic: "Baeyer-Villiger Oxidation",
    question_text: "In the Baeyer-Villiger oxidation:\n\n$$\\text{2-Methylcyclopentan-1-one} \\xrightarrow{\\text{RCO}_3\\text{H}} \\text{Major Product}$$\n\nThe major product is:",
    options: [
      "5-Methyltetrahydro-2H-pyran-2-one (oxygen inserted at secondary carbon)",
      "6-Methyltetrahydro-2H-pyran-2-one (oxygen inserted at more substituted CH(Me) carbon)",
      "2-Hydroxy-2-methylcyclopentanone",
      "5-Hydroxy-2-methylcyclopentanone"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    solution: "In Baeyer-Villiger oxidation with a peroxy acid ($\\text{RCO}_3\\text{H}$), unsymmetrical ketones undergo oxygen insertion with high regioselectivity. The migrating ability of alkyl groups is: tertiary > secondary > primary > methyl. Here, the substituted $-\\text{CH}(\\text{CH}_3)-$ carbon migrates preferentially over the unsubstituted secondary $-\\text{CH}_2-$ carbon, yielding 6-methyltetrahydro-2H-pyran-2-one (a 6-membered lactone with oxygen bonded to the methyl-bearing carbon)."
  },
  {
    qNum: 11,
    topic: "Grignard Reactions with Acyl Chlorides",
    question_text: "For the complete reaction of 1 mole of 3-hydroxycyclohexanecarbonyl chloride:\n\n$$\\text{3-Hydroxycyclohexanecarbonyl chloride} \\xrightarrow[\\text{(ii) }\\text{H}_3\\text{O}^+]{\\text{(i) }\\text{CH}_3\\text{MgBr}} \\text{Product}$$\n\nThe number of moles of $\\text{CH}_3\\text{MgBr}$ required per mole of the compound is:",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "1. The acidic hydrogen of the alcohol ($-\\text{OH}$) group consumes 1 mole of Grignard reagent in an acid-base neutralization step:\n$$\\text{R-OH} + \\text{CH}_3\\text{MgBr} \\to \\text{R-OMgBr} + \\text{CH}_4$$\n2. The acyl chloride ($-\\text{COCl}$) group reacts with 1 mole of $\\text{CH}_3\\text{MgBr}$ to give a ketone, which immediately reacts with a second mole of $\\text{CH}_3\\text{MgBr}$ to give a tertiary alcohol (consuming 2 moles total):\n$$\\text{R-COCl} + 2\\text{CH}_3\\text{MgBr} \\to \\text{R-C(OH)(CH}_3)_2$$\nTotal moles of $\\text{CH}_3\\text{MgBr}$ required = $1 + 2 = 3$ moles."
  },
  {
    qNum: 12,
    topic: "Nucleophilic Addition Reactivity of Carbonyls",
    question_text: "The correct order of reactivity with $\\text{HCN}/\\text{OH}^-$ (nucleophilic addition) among the following will be:\n\nI: $p$-Nitrobenzaldehyde\nII: Benzaldehyde\nIII: $p$-Methoxyacetophenone",
    options: [
      "$\\text{I} > \\text{II} > \\text{III}$",
      "$\\text{II} > \\text{I} > \\text{III}$",
      "$\\text{III} > \\text{I} > \\text{II}$",
      "$\\text{III} > \\text{II} > \\text{I}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. Aldehydes are generally more reactive than ketones towards nucleophilic addition due to both less steric hindrance and smaller electron-donating inductive effect.\n2. In $p$-nitrobenzaldehyde (I), the strong $-M$ and $-I$ electron-withdrawing nitro group greatly enhances the partial positive charge on the carbonyl carbon, making it the most reactive.\n3. In $p$-methoxyacetophenone (III), the electron-donating $+M$ methoxy group and the $+I$ methyl group of the ketone strongly reduce electrophilicity, making it the least reactive.\nHence, the reactivity order is $\\text{I} > \\text{II} > \\text{III}$."
  },
  {
    qNum: 13,
    topic: "Clemmensen vs Wolff-Kishner Reduction",
    question_text: "To reduce the carbonyl group in 4-acetylcyclohexanol to an ethyl group while keeping the secondary alcohol group intact:\n\n$$\\text{4-Acetylcyclohexanol} \\xrightarrow{\\text{Reagent}} \\text{4-Ethylcyclohexanol}$$\n\nThe most suitable reagent among the following will be:",
    options: [
      "$\\text{Zn-Hg} / \\text{conc. HCl}$",
      "(i) $\\text{NH}_2\\text{NH}_2$, (ii) $\\text{OH}^-$",
      "Both (1) and (2)",
      "$\\text{HI} / \\text{Red P}, \\Delta$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "The substrate contains an acid-sensitive secondary alcohol ($-\\text{OH}$) group. Clemmensen reduction uses concentrated $\\text{HCl}$, which would dehydrate or replace the alcohol with a chlorine atom. Wolff-Kishner reduction ((i) $\\text{NH}_2\\text{NH}_2$, (ii) $\\text{OH}^-$) operates under strongly basic conditions, leaving the alcohol untouched while reducing the ketone carbonyl to a methylene group."
  },
  {
    qNum: 14,
    topic: "Bisulfite Addition and Chirality",
    question_text: "$$A \\xrightarrow{\\text{NaHSO}_3} \\text{Optically active compound}$$\n\nCompound '$A$' is:",
    options: [
      "$\\text{C}_2\\text{H}_5-\\text{CO}-\\text{C}_2\\text{H}_5$",
      "$\\text{CH}_3-\\text{CO}-\\text{C}_2\\text{H}_5$",
      "$\\text{H}-\\text{CHO}$",
      "$\\text{CH}_3-\\text{CO}-\\text{CH}_3$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Upon nucleophilic addition of sodium bisulfite ($\\text{NaHSO}_3$) to butan-2-one ($\\text{CH}_3\\text{COC}_2\\text{H}_5$), the resulting tetrahedral adduct contains four different groups attached to the central carbon atom: $-\\text{CH}_3$, $-\\text{C}_2\\text{H}_5$, $-\\text{OH}$, and $-\\text{SO}_3\\text{Na}$. This creates an asymmetric (chiral) carbon center, rendering the product optically active."
  },
  {
    qNum: 15,
    topic: "Selective Oxidation with Manganese Dioxide",
    question_text: "For the reaction:\n\n$$\\text{1-(Cyclohex-1-en-1-yl)ethanol} \\xrightarrow{\\text{MnO}_2} A \\text{ (major)}$$\n\nThe product $A$ is:",
    options: [
      "Cyclohex-1-enecarbaldehyde",
      "Cyclohex-2-en-1-one",
      "1-(Cyclohex-1-en-1-yl)ethan-1-one",
      "Cyclohexanone"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "Manganese dioxide ($\\text{MnO}_2$) is a mild and selective oxidizing agent that oxidises allylic and benzylic alcohols to their corresponding $\\alpha,\\beta$-unsaturated carbonyl compounds without attacking unactivated saturated alcohols or carbon-carbon double bonds. The secondary allylic alcohol is oxidised to 1-(cyclohex-1-en-1-yl)ethan-1-one."
  },
  {
    qNum: 16,
    topic: "Epoxidation and Ring Opening",
    question_text: "Consider the following sequence of reactions:\n\n$$\\text{1-Methylcyclohexene} \\xrightarrow{\\text{RCO}_3\\text{H}} A \\xrightarrow{\\text{H}_3\\text{O}^+} B$$\n\nThe product $B$ in the above sequence is:",
    options: [
      "cis-1-Methylcyclohexane-1,2-diol",
      "trans-1-Methylcyclohexane-1,2-diol",
      "2-Methylcyclohexanone",
      "Cyclohexane-1,2-diol"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Reaction of 1-methylcyclohexene with a peroxy acid ($\\text{RCO}_3\\text{H}$) forms a 1,2-epoxide (1-methyl-7-oxabicyclo[4.1.0]heptane). Acid-catalysed ring opening of the epoxide proceeds via backside nucleophilic attack of water on the protonated oxirane ring, leading to stereospecific anti-addition to produce trans-1-methylcyclohexane-1,2-diol."
  },
  {
    qNum: 17,
    topic: "Distinguishing Tests for Carbonyl Compounds",
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Aldehydes impart magenta color to Schiff's reagent",
      "Sterically hindered ketones do not produce bisulfite addition product",
      "Benzaldehyde responds to Fehling's test",
      "Formic acid reduces Tollen's reagent"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Aromatic aldehydes such as benzaldehyde do NOT reduce Fehling's solution because the carbonyl carbon has decreased electrophilicity due to resonance donation from the aromatic ring, and Fehling's reagent is a weaker oxidant than Tollen's reagent. Hence statement (3) is incorrect."
  },
  {
    qNum: 18,
    topic: "Hinsberg's Test and Sulfonamides",
    question_text: "Which of the following statements is incorrect regarding Hinsberg's reagent?",
    options: [
      "Benzenesulfonyl chloride is known as Hinsberg's reagent",
      "Sulfonamides are produced when Hinsberg's reagent reacts with $1^\\circ$ or $2^\\circ$ amine",
      "$3^\\circ$ amines produce a sulfonamide which dissolves in alkali",
      "Sulfonamides of $2^\\circ$ amines are insoluble in alkali"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Tertiary amines ($3^\\circ$) do not possess any acidic hydrogen attached to nitrogen, so they cannot form a sulfonamide upon treatment with Hinsberg's reagent (benzenesulfonyl chloride). Therefore, statement (3) is incorrect."
  },
  {
    qNum: 19,
    topic: "Acid-Catalyzed Trimerization of Acetone",
    question_text: "Acetone on distillation with concentrated $\\text{H}_2\\text{SO}_4$ gives:",
    options: [
      "Xylene",
      "Phorone",
      "Mesitylene",
      "Mesityl oxide"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "When acetone is distilled in the presence of concentrated sulphuric acid ($\\text{conc. H}_2\\text{SO}_4$), it undergoes cyclotrimerization with loss of three molecules of water to form 1,3,5-trimethylbenzene, commonly known as mesitylene:\n$$3\\text{CH}_3\\text{COCH}_3 \\xrightarrow{\\text{conc. H}_2\\text{SO}_4, \\Delta} \\text{C}_6\\text{H}_3(\\text{CH}_3)_3 + 3\\text{H}_2\\text{O}$$"
  },
  {
    qNum: 20,
    topic: "Cannizzaro Reaction Scope",
    question_text: "Which of the following will give Cannizzaro's reaction?",
    options: [
      "$\\text{CH}_3-\\text{CHO}$",
      "$\\text{H-CHO}$",
      "$(\\text{CH}_3)_3\\text{C}-\\text{CHO}$",
      "Both (2) and (3)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Aldehydes that lack $\\alpha$-hydrogen atoms undergo self-oxidation and reduction (disproportionation) in concentrated alkali via the Cannizzaro reaction. Both formaldehyde ($\\text{HCHO}$) and pivalaldehyde ($(\\text{CH}_3)_3\\text{CCHO}$) lack $\\alpha$-hydrogens and give the Cannizzaro reaction. Acetaldehyde has $\\alpha$-hydrogens and undergoes aldol condensation instead."
  },
  {
    qNum: 21,
    topic: "Aldol Condensation of Cycloalkanones",
    question_text: "Consider the following reaction sequence:\n\n$$\\text{Cyclohexanol} \\xrightarrow{\\text{PCC}} A \\xrightarrow[\\Delta]{\\text{OH}^-(\\text{aq})} B$$\n\nThe final product $B$ is:",
    options: [
      "2-Cyclohexylcyclohexan-1-one",
      "Bicyclohexyl-1,1'-diol",
      "2-(Cyclohex-1-en-1-yl)cyclohexan-1-one",
      "Dicyclohexyl ether"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "Cyclohexanol is oxidised by PCC to cyclohexanone ($A$). Treatment of cyclohexanone with aqueous hydroxide upon heating brings about self-aldol condensation followed by dehydration to yield 2-(cyclohex-1-en-1-yl)cyclohexan-1-one (or 2-cyclohexylidenecyclohexan-1-one), an $\\alpha,\\beta$-unsaturated bicyclic ketone."
  },
  {
    qNum: 22,
    topic: "Perkin Reaction",
    question_text: "In the Perkin reaction:\n\n$$p\\text{-NO}_2-\\text{C}_6\\text{H}_4-\\text{CHO} + (\\text{CH}_3-\\text{CH}_2-\\text{CO})_2\\text{O} \\xrightarrow[\\Delta]{\\text{CH}_3\\text{CH}_2\\text{COONa}} X$$\n\nThe major product $X$ is:",
    options: [
      "$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{CH}-\\text{COOH}$",
      "$p\\text{-NO}_2-\\text{C}_6\\text{H}_4-\\text{CH}=\\text{CH}-\\text{COOH}$",
      "$p\\text{-NO}_2-\\text{C}_6\\text{H}_4-\\text{CH}=\\text{C}(\\text{CH}_3)-\\text{COOH}$",
      "$\\text{CH}_3-\\text{CH}=\\text{C}(\\text{NO}_2)-\\text{COOH}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "In the Perkin reaction of an aromatic aldehyde with an aliphatic acid anhydride in the presence of the corresponding sodium carboxylate, condensation occurs at the $\\alpha$-carbon of the anhydride. Propionic anhydride has an $\\alpha$-methylene group ($\\text{-CH}_2\\text{-}$), yielding an $\\alpha$-methylcinnamic acid derivative: $p$-nitro-$\\alpha$-methylcinnamic acid ($p\\text{-NO}_2-\\text{C}_6\\text{H}_4-\\text{CH}=\\text{C}(\\text{CH}_3)-\\text{COOH}$)."
  },
  {
    qNum: 23,
    topic: "Aldol Condensation Requirements",
    question_text: "Which of the following compounds will undergo aldol condensation?",
    options: [
      "$\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CHO}$ (Crotonaldehyde)",
      "$\\text{C}_6\\text{H}_5-\\text{CHO}$ (Benzaldehyde)",
      "$\\text{Ph}-\\text{CO}-\\text{Ph}$ (Benzophenone)",
      "$(\\text{CH}_3)_3\\text{C}-\\text{CHO}$ (Pivalaldehyde)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Benzaldehyde, benzophenone, and pivalaldehyde all completely lack $\\alpha$-hydrogens. Crotonaldehyde ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CHO}$) has acidic $\\gamma$-hydrogens which form a resonance-stabilised vinylogous enolate ion that can act as a nucleophile in aldol-type condensations."
  },
  {
    qNum: 24,
    topic: "Exceptions to Cannizzaro Reaction",
    question_text: "Which of the following compounds does not give the Cannizzaro reaction?",
    options: [
      "$\\text{CH}_3\\text{COCHO}$ (Methylglyoxal)",
      "$\\text{CHO-CHO}$ (Glyoxal)",
      "$\\text{CCl}_3\\text{CHO}$ (Chloral)",
      "$\\text{HCHO}$ (Formaldehyde)"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "Although chloral ($\\text{CCl}_3\\text{CHO}$) has no $\\alpha$-hydrogens, it does NOT undergo the Cannizzaro reaction when treated with alkali. Instead, hydroxide attacks the carbonyl carbon and causes cleavage of the weak $\\text{C-C}$ bond (haloform-type cleavage) to yield chloroform ($\\text{CHCl}_3$) and sodium formate ($\\text{HCOONa}$)."
  },
  {
    qNum: 25,
    topic: "Mechanism of Benzoin Condensation",
    question_text: "Which of the following species acts as the key carbanion nucleophile during Benzoin condensation?",
    options: [
      "$:\\text{CN}^-$",
      "$\\text{C}_6\\text{H}_5-\\overset{\\ominus}{\\text{C}}(\\text{OH})-\\text{CN}$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}(\\text{OH})-\\text{CN}$",
      "Both (1) and (2)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "hard",
    solution: "In Benzoin condensation, cyanide ($:\\text{CN}^-$) first acts as a nucleophile attacking benzaldehyde to form a cyanohydrin intermediate. Deprotonation then generates the resonance-stabilised carbanion $\\text{C}_6\\text{H}_5-\\overset{\\ominus}{\\text{C}}(\\text{OH})-\\text{CN}$, which acts as a carbon nucleophile attacking a second molecule of benzaldehyde. Thus, both cyanide and the carbanion act as nucleophiles at different stages of the mechanism."
  },
  {
    qNum: 26,
    topic: "Reformatsky Reaction",
    question_text: "In the Reformatsky reaction:\n\n$$\\text{R}-\\text{CHO} + \\text{R}'-\\text{CH(Br)}-\\text{COOR}'' \\xrightarrow[\\text{(ii) }\\text{H}_3\\text{O}^+]{\\text{(i) Zn}} \\text{Product}$$\n\nThe product formed is a(n):",
    options: [
      "$\\alpha$-hydroxy ester",
      "$\\beta$-hydroxy ester",
      "$\\alpha,\\beta$-unsaturated ester",
      "$\\alpha$-halo ketone"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "The reaction between an aldehyde or ketone and an $\\alpha$-halo ester in the presence of zinc dust yields an organozinc intermediate (zinc enolate), which adds nucleophilically across the carbonyl group. Hydrolysis produces a $\\beta$-hydroxy ester (Reformatsky reaction)."
  },
  {
    qNum: 27,
    topic: "Reactions of Carbonyls with Ammonia Derivatives",
    question_text: "Which of the following nucleophilic addition-elimination reactions of carbonyl compounds can take place?\n\n(I) $\\text{R}_2\\text{C}=\\text{O} + \\text{H}_2\\text{N}-\\text{NH}_2 \\to \\text{R}_2\\text{C}=\\text{N}-\\text{NH}_2 + \\text{H}_2\\text{O}$\n(II) $\\text{R}_2\\text{C}=\\text{O} + \\text{H}_2\\text{N}-\\text{OH} \\to \\text{R}_2\\text{C}=\\text{N}-\\text{OH} + \\text{H}_2\\text{O}$\n(III) $\\text{R}_2\\text{C}=\\text{O} + \\text{H}_2\\text{N}-\\text{NH}-\\text{CONH}_2 \\to \\text{R}_2\\text{C}=\\text{N}-\\text{NH}-\\text{CONH}_2 + \\text{H}_2\\text{O}$",
    options: [
      "Only (I)",
      "Only (II)",
      "Only (I) and (II)",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Aldehydes and ketones readily react with ammonia derivatives ($\\text{H}_2\\text{N}-G$) under weakly acidic conditions via addition-elimination to form imine derivatives with loss of water: with hydrazine to form hydrazones, with hydroxylamine to form oximes, and with semicarbazide to form semicarbazones. All these reactions take place smoothly."
  },
  {
    qNum: 28,
    topic: "Identification of Alcohols and Carbonyls",
    question_text: "A compound $\\text{C}_4\\text{H}_{10}\\text{O}$ on oxidation forms a compound $\\text{C}_4\\text{H}_8\\text{O}$ which gives an oxime and a positive iodoform test. The original compound on treatment with $\\text{conc. H}_2\\text{SO}_4$ gives $\\text{C}_4\\text{H}_8$. The structure of the compound is:",
    options: [
      "$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{OH}$",
      "$\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CH}_3$",
      "$(\\text{CH}_3)_3\\text{C}-\\text{OH}$",
      "$\\text{CH}_3-\\text{O}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "1. $\\text{C}_4\\text{H}_{10}\\text{O}$ oxidises to $\\text{C}_4\\text{H}_8\\text{O}$, which gives an oxime (confirming a carbonyl group) and a positive iodoform test (confirming a methyl ketone, $\\text{CH}_3\\text{COCH}_2\\text{CH}_3$, butan-2-one).\n2. Oxidation of a secondary alcohol containing $-\\text{CH(OH)CH}_3$ yields butan-2-one. Hence the starting compound is butan-2-ol ($\\text{CH}_3\\text{CH(OH)CH}_2\\text{CH}_3$).\n3. Dehydration of butan-2-ol with $\\text{conc. H}_2\\text{SO}_4$ gives but-2-ene ($\\text{C}_4\\text{H}_8$)."
  },
  {
    qNum: 29,
    topic: "Acetylation of Salicylic Acid (Aspirin)",
    question_text: "In the reaction:\n\n$$\\text{Salicylic acid} + (\\text{CH}_3\\text{CO})_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{Product}$$\n\nThe IUPAC name of the product is:",
    options: [
      "Phenyl salicylate",
      "Ortho-salicylate benzoic acid",
      "2-Acetoxybenzoic acid",
      "Methyl salicylate"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Acetylation of the phenolic $-\\text{OH}$ group of salicylic acid (2-hydroxybenzoic acid) by acetic anhydride in the presence of an acid catalyst produces acetylsalicylic acid (commonly known as aspirin). Its IUPAC name is 2-acetoxybenzoic acid."
  },
  {
    qNum: 30,
    topic: "Reaction of Ketones with Phosphorus Pentachloride",
    question_text: "The product of the following reaction is:\n\n$$\\text{CH}_3-\\text{CH}_2-\\text{CO}-\\text{CH}_2-\\text{CH}_3 + \\text{PCl}_5 \\xrightarrow{\\Delta} \\text{Product}$$",
    options: [
      "$\\text{CH}_3-\\text{CH}_2-\\text{CCl}_2-\\text{CH}_2-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{CH}_2-\\text{CHCl}-\\text{CH}_2-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{CHCl}-\\text{CO}-\\text{CH}_2-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{CH}_2-\\text{CCl}_2-\\text{CH}_3$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Phosphorus pentachloride ($\\text{PCl}_5$) replaces the carbonyl oxygen atom of aldehydes and ketones with two geminal chlorine atoms, yielding a gem-dichloride and phosphoryl chloride ($\\text{POCl}_3$):\n$$\\text{CH}_3\\text{CH}_2\\text{COCH}_2\\text{CH}_3 + \\text{PCl}_5 \\to \\text{CH}_3\\text{CH}_2\\text{CCl}_2\\text{CH}_2\\text{CH}_3 + \\text{POCl}_3$$\nThe product is 3,3-dichloropentane."
  },
  {
    qNum: 31,
    topic: "Hell-Volhard-Zelinsky (HVZ) Reaction",
    question_text: "Which reaction is used for the synthesis of $\\alpha$-chloroacetic acid from acetic acid?",
    options: [
      "Perkin reaction",
      "Stephen's reaction",
      "HVZ reaction",
      "Gattermann-Koch reaction"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "The Hell-Volhard-Zelinsky (HVZ) reaction halogenates aliphatic carboxylic acids possessing an $\\alpha$-hydrogen at the $\\alpha$-position using chlorine or bromine in the presence of a small amount of red phosphorus:\n$$\\text{CH}_3\\text{COOH} \\xrightarrow{\\text{Cl}_2 / \\text{Red P}} \\text{Cl}-\\text{CH}_2-\\text{COOH}$$"
  },
  {
    qNum: 32,
    topic: "Grignard Carboxylation to Carboxylic Acids",
    question_text: "In the reaction sequence:\n\n$$\\text{CH}_3-\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{HBr} / \\text{peroxide}} X \\xrightarrow[\\text{(ii) }\\text{H}_3\\text{O}^+]{\\text{(i) Mg / ether, (ii) }\\text{CO}_2} Y$$\n\nIdentify $Y$:",
    options: [
      "$\\text{CH}_3-\\text{CH}_2-\\text{COOH}$",
      "$\\text{HCHO}$",
      "$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$",
      "$\\text{CH}_3-\\text{COOH}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. Anti-Markovnikov addition of $\\text{HBr}$ in the presence of peroxides gives 1-bromopropane: $\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br}$ ($X$).\n2. Reaction with magnesium in dry ether forms the Grignard reagent $n$-propylmagnesium bromide ($\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{MgBr}$).\n3. Carboxylation with dry ice ($\\text{CO}_2$) followed by acidic hydrolysis adds one carbon atom to yield butanoic acid ($\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{COOH}$)."
  },
  {
    qNum: 33,
    topic: "Selective Oxidation of Allyl Alcohol",
    question_text: "For the conversion:\n\n$$\\text{CH}_2=\\text{CH}-\\text{CH}_2\\text{OH} \\xrightarrow{R} \\text{CH}_2=\\text{CH}-\\text{CHO}$$\n\nThe best reagent $R$ will be:",
    options: [
      "$\\text{MnO}_2$",
      "$\\text{K}_2\\text{Cr}_2\\text{O}_7 / \\text{H}^+$",
      "$\\text{KMnO}_4 / \\text{H}^+$",
      "$\\text{OsO}_4 / \\text{NaHSO}_3$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "$\\text{MnO}_2$ is a selective oxidising agent that specifically oxidises allylic and benzylic alcohols to $\\alpha,\\beta$-unsaturated aldehydes/ketones without attacking the carbon-carbon double bond. $\\text{KMnO}_4$ or $\\text{K}_2\\text{Cr}_2\\text{O}_7$ would cleave the double bond or oxidise to carboxylic acid."
  },
  {
    qNum: 34,
    topic: "Grignard Reaction with Carbonyls",
    question_text: "Which carbonyl compound produces a primary ($1^\\circ$) alcohol on reaction with a Grignard reagent followed by hydrolysis?",
    options: [
      "Formaldehyde",
      "Acetaldehyde",
      "Acetone",
      "Methyl formate"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Formaldehyde ($\\text{HCHO}$) reacts with Grignard reagents ($\\text{RMgX}$) to produce primary ($1^\\circ$) alcohols:\n$$\\text{HCHO} + \\text{RMgX} \\xrightarrow{\\text{ether}} \\text{R-CH}_2\\text{OMgX} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-CH}_2\\text{OH}$$\nOther aldehydes give secondary ($2^\\circ$) alcohols, and ketones give tertiary ($3^\\circ$) alcohols."
  },
  {
    qNum: 35,
    topic: "Chemical Reactivity of Formic Acid",
    question_text: "Formic acid ($\\text{HCOOH}$) does not react with:",
    options: [
      "Tollen's reagent",
      "Fehling's solution",
      "$\\text{HCN}$",
      "Sodium metal"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "Formic acid contains both an aldehyde-like group ($-\\text{CHO}$) and a carboxylic group ($-\\text{COOH}$). Because of the aldehydic hydrogen, it reduces Tollen's and Fehling's reagents. As an acid, it reacts with sodium metal with evolution of $\\text{H}_2$ gas. However, it does not undergo nucleophilic addition with $\\text{HCN}$ like standard aldehydes/ketones because the carbonyl carbon has significant resonance stabilization with the $-\\text{OH}$ group."
  }
];

