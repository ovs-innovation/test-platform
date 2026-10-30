/**
 * Aldehydes, Ketones and Carboxylic Acids - Questions 36 to 70
 * Source: Aakash Momentum Booster for NEET (Section A Objective Type Questions)
 */

export const ALDEHYDES_PART2 = [
  {
    qNum: 36,
    topic: "Acidity of Substituted Benzoic Acids",
    question_text: "The decreasing order of acidic strength of the following substituted benzoic acids is:\n\n(i) $o$-Chlorobenzoic acid\n(ii) $p$-Chlorobenzoic acid\n(iii) $m$-Chlorobenzoic acid\n(iv) Benzoic acid",
    options: [
      "(i) > (iii) > (ii) > (iv)",
      "(i) > (ii) > (iii) > (iv)",
      "(iv) > (ii) > (iii) > (i)",
      "(iii) > (i) > (ii) > (iv)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. Ortho-chlorobenzoic acid (i) is the most acidic due to the ortho effect (steric inhibition of resonance forces the carboxyl group out of the aromatic ring plane).\n2. Chlorine exerts a $-I$ electron-withdrawing effect and a $+R$ resonance effect. At the meta position (iii), only the $-I$ effect operates, making it stronger than the para isomer.\n3. At the para position (ii), the $+R$ effect slightly opposes the $-I$ effect, so $m\\text{-chloro} > p\\text{-chloro}$.\n4. Unsubstituted benzoic acid (iv) has no electron-withdrawing halogen and is the least acidic.\nDecreasing order: (i) > (iii) > (ii) > (iv)."
  },
  {
    qNum: 37,
    topic: "Boiling Points of Carbonyls and Derivatives",
    question_text: "The correct decreasing order of boiling points of the following compounds is:\n\n(i) $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$ (Butanoic acid)\n(ii) $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2\\text{OH}$ (Butan-1-ol)\n(iii) $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CHO}$ (Butanal)",
    options: [
      "(i) > (ii) > (iii)",
      "(ii) > (i) > (iii)",
      "(iii) > (ii) > (i)",
      "(i) > (iii) > (ii)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. Butanoic acid forms extensive, very strong intermolecular hydrogen-bonded cyclic dimers in both liquid and vapour phases, giving it the highest boiling point (~164 °C).\n2. Butan-1-ol has intermolecular hydrogen bonding through its $-\\text{OH}$ group, giving an intermediate boiling point (~118 °C).\n3. Butanal has only dipole-dipole interactions and no hydrogen bonding between its molecules, giving the lowest boiling point (~76 °C).\nOrder: (i) > (ii) > (iii)."
  },
  {
    qNum: 38,
    topic: "Acidity of Substituted Benzoic Acids",
    question_text: "Select the most acidic compound from the following:",
    options: [
      "$p$-Nitrobenzoic acid",
      "$p$-Hydroxybenzoic acid",
      "Benzoic acid",
      "$p$-Toluic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "In $p$-nitrobenzoic acid, the nitro group ($-\\text{NO}_2$) exerts strong electron-withdrawing $-M$ (mesomeric) and $-I$ (inductive) effects, stabilizing the carboxylate anion conjugate base and dramatically increasing acidic strength. In contrast, $-\\text{OH}$ and $-\\text{CH}_3$ are electron-donating groups that destabilise the conjugate base."
  },
  {
    qNum: 39,
    topic: "Selective Oxidation of Primary Alcohols",
    question_text: "The most suitable reagent for the conversion:\n\n$$\\text{R}-\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Reagent}} \\text{R}-\\text{CHO}$$",
    options: [
      "$\\text{KMnO}_4 / \\text{H}_2\\text{SO}_4$",
      "$\\text{K}_2\\text{Cr}_2\\text{O}_7 / \\text{H}_2\\text{SO}_4$",
      "$\\text{CrO}_3 / \\text{H}_2\\text{SO}_4$ (Jones reagent)",
      "PCC (Pyridinium chlorochromate) or Collins reagent ($\\text{CrO}_3 \\cdot 2\\text{C}_5\\text{H}_5\\text{N}$)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "PCC (or Collins reagent $\\text{CrO}_3 \\cdot 2\\text{C}_5\\text{H}_5\\text{N}$) in non-aqueous solvent ($\\text{CH}_2\\text{Cl}_2$) stops the oxidation of primary alcohols at the aldehyde stage without over-oxidising them to carboxylic acids. Aqueous acidic $\\text{KMnO}_4$, $\\text{K}_2\\text{Cr}_2\\text{O}_7$, or Jones reagent rapidly oxidise primary alcohols further to carboxylic acids."
  },
  {
    qNum: 40,
    topic: "Aldol Condensation of Cyclohexanone",
    question_text: "In the reaction:\n\n$$\\text{Cyclohexanone} \\xrightarrow{\\text{NaOH}} A \\xrightarrow[\\Delta]{-\\text{H}_2\\text{O}} B$$\n\nThe product $B$ is:",
    options: [
      "2-Cyclohexylidenecyclohexan-1-one",
      "Bicyclohexyl-1,1'-diol",
      "2-Cyclohexylcyclohexan-1-ol",
      "Cyclohexyl benzoate"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Under basic conditions, an enolate of cyclohexanone is generated which attacks a second molecule of cyclohexanone to yield the $\\beta$-hydroxy ketone (aldol adduct $A$). Upon heating, it dehydrates to form the $\\alpha,\\beta$-unsaturated bicyclic ketone, 2-cyclohexylidenecyclohexan-1-one (or 2-(cyclohex-1-en-1-yl)cyclohexan-1-one) ($B$)."
  },
  {
    qNum: 41,
    topic: "Hemiacetals and Acetals",
    question_text: "Which of the following functional group representations corresponds to a hemiacetal?",
    options: [
      "A carbon bonded to an $-\\text{OH}$ group, an $-\\text{OR}$ (alkoxy) group, an $\\text{R}$ group, and an $\\text{H}$ atom",
      "A carbon bonded to two $-\\text{OR}$ (alkoxy) groups and two alkyl groups",
      "A carbon bonded to two $-\\text{OH}$ groups",
      "A carbon bonded to a carbonyl oxygen and an $-\\text{OR}$ group"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "A hemiacetal is formed by the nucleophilic addition of one molecule of alcohol to an aldehyde. The central carbon is simultaneously bonded to a hydroxyl group ($-\\text{OH}$), an alkoxy group ($-\\text{OR}$), a hydrogen atom, and an alkyl/aryl group ($\\text{R}-\\text{CH(OH)(OR)}$)."
  },
  {
    qNum: 42,
    topic: "Dehydration of Aldoximes to Nitriles",
    question_text: "In the given reaction sequence:\n\n$$\\text{C}_6\\text{H}_5\\text{CHO} \\xrightarrow{\\text{NH}_2\\text{OH}} A \\xrightarrow{\\text{Ac}_2\\text{O} / \\Delta} B$$\n\n$A$ and $B$ respectively are:",
    options: [
      "$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N-OH}$ and $\\text{C}_6\\text{H}_5\\text{CN}$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N-OH}$ and $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N-OH}$ and $\\text{C}_6\\text{H}_5\\text{CHO}$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N-OH}$ and $\\text{C}_6\\text{H}_5\\text{COOH}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Benzaldehyde reacts with hydroxylamine ($\\text{NH}_2\\text{OH}$) to form benzaldoxime, $\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N-OH}$ ($A$). Heating benzaldoxime with acetic anhydride ($\\text{Ac}_2\\text{O}$) causes elimination of water (dehydration) to yield benzonitrile ($\\text{C}_6\\text{H}_5\\text{CN}$, $B$)."
  },
  {
    qNum: 43,
    topic: "Intramolecular Aldol Condensation",
    question_text: "In the reaction:\n\n$$A \\xrightarrow{\\text{KOH} / \\Delta} \\text{3-Methylcyclohex-2-en-1-one}$$\n\nCompound $A$ is:",
    options: [
      "Heptane-2,6-dione",
      "Heptane-2,5-dione",
      "Octane-2,7-dione",
      "Hexane-2,5-dione"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "Heptane-2,6-dione has two carbonyl groups at C2 and C6 separated by three methylene units. In the presence of base, the methyl group at C7 is deprotonated to form an enolate that attacks the C2 carbonyl in an intramolecular aldol addition, forming a 6-membered ring. Dehydration upon heating yields 3-methylcyclohex-2-en-1-one."
  },
  {
    qNum: 44,
    topic: "Polymerization of Acetaldehyde",
    question_text: "When anhydrous acetaldehyde is treated with a few drops of concentrated sulphuric acid at room temperature, which of the following is formed?",
    options: [
      "Paraldehyde",
      "Polyoxymethylene",
      "Trioxane",
      "Paraformaldehyde"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Treatment of dry acetaldehyde with a trace of concentrated $\\text{H}_2\\text{SO}_4$ at room temperature induces cyclotrimerization to yield paraldehyde (2,4,6-trimethyl-1,3,5-trioxane), a cyclic trimer formerly used in medicine as a hypnotic/sedative. (At 0 °C, metaldehyde, a cyclic tetramer, is formed instead)."
  },
  {
    qNum: 45,
    topic: "Selective Oxidation of Allylic / Unsaturated Alcohols",
    question_text: "In the reaction:\n\n$$\\text{CH}_2=\\text{CH}-\\text{CH}_2-\\text{CH(OH)}-\\text{CH}_3 \\xrightarrow{\\text{PCC}} \\text{Product}$$\n\nThe product is:",
    options: [
      "$\\text{CH}_2=\\text{CH}-\\text{CH}_2-\\text{CO}-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CO}-\\text{CH}_3$",
      "$\\text{CH}_2=\\text{CH}-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$",
      "Both (1) and (2)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "PCC oxidises secondary alcohols cleanly to ketones without affecting carbon-carbon double bonds. Pent-4-en-2-ol is selectively oxidised to pent-4-en-2-one ($\\text{CH}_2=\\text{CH}-\\text{CH}_2-\\text{CO}-\\text{CH}_3$)."
  },
  {
    qNum: 46,
    topic: "Ester Identification via Hydrolysis and Chemical Tests",
    question_text: "An ester $A$ of formula $\\text{C}_4\\text{H}_8\\text{O}_2$ on acidic hydrolysis gives an acid $B$, which reduces Tollen's reagent, and an alcohol $C$, which gives a positive iodoform test. Ester $A$ also reacts with excess Grignard reagent to produce alcohol $C$. Identify the correct statement(s):",
    options: [
      "$B$ is formic acid ($\\text{HCOOH}$)",
      "$A$ is isopropyl formate ($\\text{H-COO-CH(CH}_3)_2$)",
      "$C$ is propan-2-ol ($\\text{CH}_3\\text{CH(OH)CH}_3$)",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "hard",
    solution: "1. Acid $B$ reduces Tollen's reagent $\\implies B$ is formic acid ($\\text{HCOOH}$).\n2. Alcohol $C$ gives a positive iodoform test and has 3 carbons (since ester has 4 carbons total: $4 - 1 = 3$) $\\implies C$ is propan-2-ol ($\\text{CH}_3\\text{CH(OH)CH}_3$).\n3. Therefore, ester $A$ is isopropyl formate ($\\text{H-COOCH(CH}_3)_2$).\n4. Reaction of isopropyl formate with excess $\\text{CH}_3\\text{MgBr}$ followed by hydrolysis yields propan-2-ol. Hence, all statements are correct."
  },
  {
    qNum: 47,
    topic: "Reaction of Phthalic Anhydride with Grignard Reagent",
    question_text: "When phthalic anhydride reacts with 1 mole of methylmagnesium bromide followed by acidic workup, the major product is:",
    options: [
      "2-Acetylbenzoic acid",
      "Phthalic acid",
      "Dimethyl phthalate",
      "Acetophenone"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "Nucleophilic acyl addition of 1 equivalent of $\\text{CH}_3\\text{MgBr}$ opens the cyclic anhydride ring, transferring a methyl group to one carbonyl carbon to form a methyl ketone while converting the second carbonyl into a carboxylate group. Subsequent acidification yields 2-acetylbenzoic acid."
  },
  {
    qNum: 48,
    topic: "Preparation of Aldehydes via Grignard Reagents",
    question_text: "Select from the following the reagent that can yield an aldehyde on reaction with a Grignard reagent followed by hydrolysis:",
    options: [
      "$\\text{R-CO-Cl}$ (Acyl chloride)",
      "$\\text{R-COOR}'$ (Ester)",
      "$\\text{HCN}$ (Hydrogen cyanide) or $\\text{H-COOC}_2\\text{H}_5$ (Ethyl formate)",
      "$\\text{CO}_2$ (Carbon dioxide)"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "Grignard reagents ($\\text{RMgX}$) react with hydrogen cyanide ($\\text{HCN}$) to form an imine magnesium salt, which on acidic hydrolysis yields an aldehyde:\n$$\\text{RMgX} + \\text{HCN} \\to \\text{R-CH}=\\text{NMgX} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-CHO} + \\text{NH}_3 + \\text{Mg(OH)X}$$\nSimilarly, ethyl formate reacts with 1 mole of $\\text{RMgX}$ to yield an aldehyde. In contrast, acyl chlorides and other esters react with excess Grignard reagent to produce tertiary alcohols, and $\\text{CO}_2$ yields carboxylic acids."
  },
  {
    qNum: 49,
    topic: "Reduction of Tollen's Reagent",
    question_text: "Tollen's reagent is reduced to metallic silver by:",
    options: [
      "$\\text{CH}_3\\text{CHO}$ (Acetaldehyde)",
      "$\\text{HCOOH}$ (Formic acid)",
      "$\\text{C}_6\\text{H}_5\\text{CHO}$ (Benzaldehyde)",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Tollen's reagent is ammoniacal silver nitrate, a mild oxidizing agent. Aliphatic aldehydes (like $\\text{CH}_3\\text{CHO}$), aromatic aldehydes (like $\\text{C}_6\\text{H}_5\\text{CHO}$), and formic acid ($\\text{HCOOH}$, which possesses an oxidizable aldehydic $-\\text{CHO}$ hydrogen) all reduce Tollen's reagent to produce a silver mirror."
  },
  {
    qNum: 50,
    topic: "Acidity of Substituted Benzoic Acids",
    question_text: "The least acidic compound among the following is:",
    options: [
      "$o$-Chlorobenzoic acid",
      "$m$-Chlorobenzoic acid",
      "$p$-Chlorobenzoic acid",
      "$p$-Toluic acid (4-methylbenzoic acid)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "In $p$-toluic acid, the methyl group ($-\\text{CH}_3$) donates electron density through $+I$ inductive effect and hyperconjugation, destabilizing the carboxylate anion and making it weaker than benzoic acid ($\\text{p}K_a \\approx 4.37$). The chloro-substituted benzoic acids all contain electron-withdrawing chlorine atoms and are significantly more acidic."
  },
  {
    qNum: 51,
    topic: "Nitrile Hydrolysis to Carboxylic Acids",
    question_text: "In the reaction sequence:\n\n$$\\text{CH}_3-\\text{CH}_2-\\text{Br} \\xrightarrow{\\text{NaCN}} A \\xrightarrow{\\text{H}^+ / \\text{H}_2\\text{O}} B$$\n\nThe product $B$ is:",
    options: [
      "Propanoic acid",
      "Ethanoic acid",
      "Lactic acid",
      "Pyruvic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. Nucleophilic substitution of ethyl bromide with cyanide gives propanenitrile: $\\text{CH}_3\\text{CH}_2\\text{CN}$ ($A$).\n2. Complete acidic hydrolysis converts the nitrile carbon into a carboxylic acid, yielding propanoic acid ($\\text{CH}_3\\text{CH}_2\\text{COOH}$, $B$)."
  },
  {
    qNum: 52,
    topic: "Comparative Boiling Points",
    question_text: "Which of the following compounds has the highest boiling point?",
    options: [
      "Ethanol",
      "Acetone",
      "Ethanoic acid",
      "Methoxyethane"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Ethanoic acid (acetic acid) has the highest boiling point (~118 °C) because carboxylic acid molecules form stable cyclic dimers held together by two strong intermolecular hydrogen bonds, requiring substantial energy to vaporise."
  },
  {
    qNum: 53,
    topic: "Mechanism of Esterification / Acylation",
    question_text: "The reaction:\n\n$$\\text{CH}_3-\\text{CO}-\\text{Cl} + \\text{CH}_3-\\text{OH} \\to \\text{CH}_3-\\text{CO}-\\text{OCH}_3 + \\text{HCl}$$\n\nis classified as a(n):",
    options: [
      "Electrophilic addition reaction",
      "Nucleophilic addition reaction",
      "Nucleophilic substitution (addition-elimination) reaction",
      "Electrophilic substitution reaction"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Acyl chlorides react with alcohols via a nucleophilic acyl substitution mechanism (addition-elimination, $\\text{S}_\\text{N}\\text{Ac}$). Methanol attacks the carbonyl carbon as a nucleophile to form a tetrahedral intermediate, followed by elimination of chloride ($\\text{Cl}^-$) as leaving group."
  },
  {
    qNum: 54,
    topic: "Manganese Dioxide Selective Oxidation",
    question_text: "If allyl alcohol is oxidised with $\\text{MnO}_2$, the product will be:",
    options: [
      "Prop-2-en-1-al (Acrolein)",
      "2-Propen-1-one",
      "Propanal",
      "Propanoic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Allyl alcohol ($\\text{CH}_2=\\text{CH}-\\text{CH}_2\\text{OH}$) is an allylic primary alcohol. Selective oxidation with $\\text{MnO}_2$ converts the allylic alcohol group into an aldehyde group without affecting the $\\text{C}=\\text{C}$ double bond, producing acrolein (prop-2-en-1-al, $\\text{CH}_2=\\text{CH}-\\text{CHO}$)."
  },
  {
    qNum: 55,
    topic: "HVZ Halogenation and Nucleophilic Substitution",
    question_text: "In the sequence:\n\n$$\\text{CH}_3-\\text{CH}_2-\\text{COOH} \\xrightarrow{\\text{Cl}_2 / \\text{Red P}} X \\xrightarrow{\\text{aq. KOH}} Y$$\n\n$X$ and $Y$ are respectively:",
    options: [
      "$\\text{CH}_3-\\text{CH(Cl)}-\\text{COOH}$ and $\\text{CH}_3-\\text{CH(OH)}-\\text{COOH}$ (Lactic acid)",
      "$\\text{Cl}-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$ and $\\text{HO}-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$",
      "$\\text{CH}_3-\\text{CH(Cl)}-\\text{COOK}$ and $\\text{CH}_2=\\text{CH}-\\text{COOH}$",
      "$\\text{CH}_3-\\text{CCl}_2-\\text{COOH}$ and $\\text{CH}_3-\\text{CO}-\\text{COOH}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. The Hell-Volhard-Zelinsky (HVZ) reaction halogenates propanoic acid selectively at the $\\alpha$-position to give 2-chloropropanoic acid: $\\text{CH}_3\\text{CH(Cl)COOH}$ ($X$).\n2. Nucleophilic substitution with aqueous $\\text{KOH}$ replaces the $\\alpha$-chlorine with a hydroxyl group to produce 2-hydroxypropanoic acid (lactic acid, $Y$)."
  },
  {
    qNum: 56,
    topic: "Isotopic Tracing in Esterification",
    question_text: "In the acid-catalysed esterification reaction of an alcohol with an isotopic $^{18}\\text{O}$-labelled carboxylic acid:\n\n$$\\text{R}-\\overset{18}{\\text{C}}(=\\text{O})-\\text{OH} + \\text{R}'-\\text{OH} \\xrightarrow{\\text{H}^+} \\text{Ester} + \\text{Water}$$\n\nWhich of the following describes the distribution of the $^{18}\\text{O}$ label?",
    options: [
      "The $^{18}\\text{O}$ label remains in the carbonyl oxygen of the ester",
      "The $^{18}\\text{O}$ label is entirely transferred to the water molecule",
      "The $^{18}\\text{O}$ label is found in the alkoxy oxygen of the ester",
      "Both ester and water are unlabeled"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "In Fischer esterification, acyl-oxygen cleavage occurs: the $-\\text{OH}$ group of the carboxylic acid is eliminated as water, while the alkoxy group ($-\\text{OR}'$) of the alcohol attacks the acyl carbon. The carbonyl oxygen of the carboxylic acid (labelled with $^{18}\\text{O}$) is retained in the ester product: $\\text{R}-\\overset{18}{\\text{C}}(=\\text{O})-\\text{OR}'$."
  },
  {
    qNum: 57,
    topic: "Bisulfite Adduct Formation",
    question_text: "Select from the following the carbonyl compound that forms a crystalline addition compound with a saturated aqueous solution of $\\text{NaHSO}_3$:",
    options: [
      "Diethyl ketone",
      "Acetophenone",
      "Benzophenone",
      "Acetone"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Sodium bisulfite addition is sensitive to steric hindrance around the carbonyl carbon. Aldehydes and unhindered methyl ketones like acetone ($\\text{CH}_3\\text{COCH}_3$) readily form crystalline bisulfite adducts. Sterically bulky ketones like diethyl ketone, acetophenone, and benzophenone do not form stable bisulfite addition products."
  },
  {
    qNum: 58,
    topic: "Iodoform Reaction Scope",
    question_text: "Select from the following the compound that will give a positive iodoform test:",
    options: [
      "Formaldehyde",
      "Propanal",
      "Pentan-3-one",
      "Propan-2-ol"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "The iodoform test gives a yellow precipitate of $\\text{CHI}_3$ with compounds containing a methyl carbonyl group ($\\text{CH}_3\\text{-CO-}$) or a methyl carbinol group ($\\text{CH}_3\\text{-CH(OH)-}$) that can be oxidised to a methyl ketone by hypoiodite. Propan-2-ol ($\\text{CH}_3\\text{CH(OH)CH}_3$) contains the $\\text{CH}_3\\text{CH(OH)-}$ group and gives a positive iodoform test."
  },
  {
    qNum: 59,
    topic: "Cyanohydrin Addition Mechanism",
    question_text: "The addition of hydrogen cyanide to a carbonyl group to form a cyanohydrin:\n\n$$>\\text{C}=\\text{O} + \\text{HCN} \\xrightarrow{\\text{OH}^-} >\\text{C}(\\text{OH})(\\text{CN})$$\n\nis an example of:",
    options: [
      "Electrophilic addition reaction",
      "Nucleophilic substitution reaction",
      "Nucleophilic addition reaction",
      "Electrophilic substitution reaction"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "The cyanide ion ($:\\text{CN}^-$), a strong nucleophile generated by base deprotonation of $\\text{HCN}$, attacks the electrophilic carbonyl carbon in the rate-determining step, followed by protonation of the alkoxide intermediate. Hence, it is a classic nucleophilic addition reaction."
  },
  {
    qNum: 60,
    topic: "Reactivity of Carboxylic Acids towards Esterification",
    question_text: "Which of the following carboxylic acids is least reactive towards esterification with an alcohol?",
    options: [
      "$\\text{HCOOH}$",
      "$\\text{CH}_3\\text{COOH}$",
      "$\\text{R-CH}_2\\text{COOH}$",
      "$\\text{R}_3\\text{C-COOH}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Acid-catalysed esterification involves the formation of a bulky tetrahedral intermediate. Bulky alkyl substituents attached to the $\\alpha$-carbon create severe steric hindrance towards nucleophilic attack of the alcohol on the protonated carbonyl carbon. The reactivity order is: $\\text{HCOOH} > \\text{CH}_3\\text{COOH} > 1^\\circ > 2^\\circ > 3^\\circ$ (least reactive: $\\text{R}_3\\text{C-COOH}$)."
  },
  {
    qNum: 61,
    topic: "Fehling's Solution Negative Test",
    question_text: "Select the compound that is not oxidised by Fehling's solution:",
    options: [
      "Formaldehyde",
      "Acetaldehyde",
      "Benzaldehyde",
      "Fructose (an $\\alpha$-hydroxy ketone)"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Benzaldehyde (and aromatic aldehydes in general) does not reduce Fehling's solution because conjugation with the benzene ring reduces the electrophilicity of the carbonyl carbon, and Fehling's reagent is too mild to effect its oxidation."
  },
  {
    qNum: 62,
    topic: "Chemical Tests for Carboxylic Acids",
    question_text: "Benzoic acid decomposes $\\text{NaHCO}_3$ with effervescence of $\\text{CO}_2$, but does not give a violet coloration with neutral $\\text{FeCl}_3$. This distinguishes it from:",
    options: [
      "Phenol",
      "Acetic acid",
      "Ethanol",
      "Acetaldehyde"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Phenol gives a characteristic violet coloration with neutral ferric chloride ($\\text{FeCl}_3$) but is too weak an acid to react with sodium bicarbonate ($\\text{NaHCO}_3$). Benzoic acid is sufficiently acidic to liberate $\\text{CO}_2$ from $\\text{NaHCO}_3$ and gives a buff-coloured precipitate with neutral $\\text{FeCl}_3$, not a violet coloration."
  },
  {
    qNum: 63,
    topic: "Acidity of Substituted Benzoic Acids",
    question_text: "The correct order of acidic strength among the following benzoic acid derivatives is:\n\nI: Benzoic acid\nII: $p$-Nitrobenzoic acid\nIII: $p$-Methoxybenzoic acid",
    options: [
      "$\\text{II} > \\text{I} > \\text{III}$",
      "$\\text{I} > \\text{II} > \\text{III}$",
      "$\\text{III} > \\text{I} > \\text{II}$",
      "$\\text{II} > \\text{III} > \\text{I}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. The $p$-nitro group exerts powerful electron-withdrawing $-M$ and $-I$ effects, greatly enhancing acid strength (II is strongest).\n2. Unsubstituted benzoic acid has intermediate acidity (I).\n3. The $p$-methoxy group exerts a strong electron-donating $+M$ resonance effect that destabilises the carboxylate anion, making it the weakest acid (III is weakest).\nHence, $\\text{II} > \\text{I} > \\text{III}$."
  },
  {
    qNum: 64,
    topic: "Reactivity Order in Nucleophilic Addition",
    question_text: "The most reactive carbonyl compound towards nucleophilic addition reaction is:",
    options: [
      "$\\text{HCHO}$ (Formaldehyde)",
      "$\\text{CH}_3\\text{CHO}$ (Acetaldehyde)",
      "$\\text{CH}_3\\text{COCH}_3$ (Acetone)",
      "$\\text{C}_6\\text{H}_5\\text{CHO}$ (Benzaldehyde)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Formaldehyde ($\\text{HCHO}$) has no alkyl groups to donate electron density (no $+I$ effect) and has the smallest steric hindrance (two small hydrogen atoms attached to carbonyl carbon). Consequently, it possesses the greatest partial positive charge and highest accessibility, making it the most reactive towards nucleophiles."
  },
  {
    qNum: 65,
    topic: "Benzil-Benzilic Acid Rearrangement",
    question_text: "In the reaction:\n\n$$\\text{Ph}-\\text{CO}-\\text{CO}-\\text{Ph} \\xrightarrow{\\text{KOH} / \\Delta} \\text{Product}$$\n\nThis transformation is known as:",
    options: [
      "Benzoin condensation",
      "Benzil-benzilic acid rearrangement",
      "Perkin reaction",
      "Cannizzaro reaction"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "Reaction of the 1,2-diketone benzil ($\\text{Ph-CO-CO-Ph}$) with potassium hydroxide causes intramolecular nucleophilic addition of hydroxide followed by 1,2-phenyl migration, yielding potassium benzilate ($\\text{Ph}_2\\text{C(OH)COOK}$). This reaction is the classic Benzil-benzilic acid rearrangement."
  },
  {
    qNum: 66,
    topic: "Carbonyl Reduction Mechanisms",
    question_text: "Reduction of a carbonyl compound with $\\text{Zn-Hg} / \\text{conc. HCl}$ to a methylene ($-\\text{CH}_2-$) group is known as:",
    options: [
      "Clemmensen reduction",
      "Wolff-Kishner reduction",
      "Rosenmund reduction",
      "Stephen reduction"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Clemmensen reduction uses zinc amalgam ($\\text{Zn-Hg}$) and concentrated hydrochloric acid ($\\text{HCl}$) to reduce aldehydes and ketones to alkanes (converting $C=O$ to $CH_2$)."
  },
  {
    qNum: 67,
    topic: "Thermal Dehydration of Dicarboxylic Acids",
    question_text: "Succinic acid (butanedioic acid) on heating undergoes dehydration to give:",
    options: [
      "Succinic anhydride (a 5-membered cyclic anhydride)",
      "Maleic anhydride",
      "Propanoic acid and $\\text{CO}_2$",
      "Cyclobutanone"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Succinic acid ($\\text{HOOC}-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$) is a 1,4-dicarboxylic acid. Heating it causes intramolecular loss of a molecule of water to yield a highly stable 5-membered cyclic anhydride: succinic anhydride."
  },
  {
    qNum: 68,
    topic: "Esterification Product Identification",
    question_text: "In the Fischer esterification:\n\n$$\\text{CH}_3\\text{CH}_2\\text{OH} + \\text{CH}_3\\text{COOH} \\xrightarrow{\\text{H}^+} \\text{Ester} + \\text{H}_2\\text{O}$$\n\nThe structure and name of the ester formed is:",
    options: [
      "$\\text{CH}_3-\\text{CO}-\\text{O}-\\text{CH}_2-\\text{CH}_3$ (Ethyl ethanoate)",
      "$\\text{CH}_3-\\text{CO}-\\text{O}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$",
      "$\\text{CH}_3-\\text{O}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$",
      "Both (1) and (2)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Ethanol ($\\text{CH}_3\\text{CH}_2\\text{OH}$) reacts with ethanoic acid ($\\text{CH}_3\\text{COOH}$) in the presence of an acid catalyst to produce ethyl ethanoate (ethyl acetate, $\\text{CH}_3\\text{COOCH}_2\\text{CH}_3$) and water."
  },
  {
    qNum: 69,
    topic: "Rosenmund Reduction",
    question_text: "The reaction:\n\n$$\\text{C}_6\\text{H}_5\\text{COCl} \\xrightarrow[\\text{quinoline or S}]{\\text{H}_2 / \\text{Pd-BaSO}_4} \\text{C}_6\\text{H}_5\\text{CHO} + \\text{HCl}$$\n\nis known as:",
    options: [
      "Stephen's reduction",
      "Rosenmund's reduction",
      "Etard's reaction",
      "Gattermann reaction"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "The catalytic hydrogenation of an acyl chloride to an aldehyde using palladium supported on barium sulphate ($\\text{Pd/BaSO}_4$) poisoned with sulfur or quinoline (to prevent further reduction to alcohol) is known as Rosenmund's reduction."
  },
  {
    qNum: 70,
    topic: "Distinguishing Tests for Benzaldehyde",
    question_text: "Benzaldehyde does not give a positive test with:\n\n(a) Tollen's test\n(b) Benedict's test\n(c) 2,4-DNP test",
    options: [
      "Only (b)",
      "(a) and (b) only",
      "(b) and (c) only",
      "All of (a), (b), and (c)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Benzaldehyde reduces Tollen's reagent to give a silver mirror (positive test a), and forms an orange-red hydrazone with 2,4-DNP (positive test c). However, being an aromatic aldehyde, it does NOT reduce Benedict's (or Fehling's) solution. Therefore, it gives a negative test only with Benedict's test (b)."
  }
];

