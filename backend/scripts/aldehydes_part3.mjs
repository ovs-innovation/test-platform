/**
 * Aldehydes, Ketones and Carboxylic Acids - Questions 71 to 105
 * Source: Aakash Momentum Booster for NEET (Section A Objective Type Questions)
 */

export const ALDEHYDES_PART3 = [
  {
    qNum: 71,
    topic: "Pinacol-Type Reductive Coupling",
    question_text: "In the reductive coupling reaction:\n\n$$2\\,\\text{Cyclohexanone} \\xrightarrow{\\text{Mg-Hg} / \\text{benzene, then } \\text{H}_2\\text{O}} \\text{Product}$$\n\nThe product formed is:",
    options: [
      "[1,1'-Bicyclohexyl]-1,1'-diol (a pinacol)",
      "Bicyclohexyl-1-ol",
      "[1,1'-Bicyclohexyl]-2-one",
      "Cyclohexylcyclohexane"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Treatment of ketones with magnesium amalgam ($\\text{Mg-Hg}$) in non-polar solvents involves a one-electron transfer to each carbonyl to generate ketyl radical anions. Dimerization of these radical anions followed by protonation with water yields a vicinal diol (pinacol): [1,1'-bicyclohexyl]-1,1'-diol."
  },
  {
    qNum: 72,
    topic: "Ease of Dehydration in Carbonyl Derivatives",
    question_text: "Which of the following compounds will be most readily dehydrated in acidic medium?",
    options: [
      "$\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CHO}$ (3-Hydroxybutanal, an aldol adduct)",
      "$\\text{CH}_3-\\text{CH}_2-\\text{CH(OH)}-\\text{CH}_3$ (Butan-2-ol)",
      "$\\text{HO}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{CHO}$ (4-Hydroxybutanal)",
      "$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2\\text{OH}$ (Butan-1-ol)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "$\\beta$-hydroxy aldehydes and ketones (aldol adducts like 3-hydroxybutanal) undergo extremely facile dehydration because the resulting double bond is conjugated with the strongly electron-withdrawing carbonyl group, forming a thermodynamically very stable $\\alpha,\\beta$-unsaturated carbonyl compound (crotonaldehyde, $\\text{CH}_3\\text{CH}=\\text{CHCHO}$)."
  },
  {
    qNum: 73,
    topic: "Reactivity of Carbonyls towards Nucleophiles",
    question_text: "The correct order of reactivity of the following towards nucleophilic addition reactions is:\n\nI: $\\text{Ph}-\\text{CO}-\\text{Ph}$ (Benzophenone)\nII: $\\text{CH}_3-\\text{CHO}$ (Acetaldehyde)\nIII: $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ (Acetone)",
    options: [
      "$\\text{I} > \\text{II} > \\text{III}$",
      "$\\text{II} > \\text{III} > \\text{I}$",
      "$\\text{II} > \\text{I} > \\text{III}$",
      "$\\text{III} > \\text{II} > \\text{I}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. Acetaldehyde (II) is an aliphatic aldehyde with only one $+I$ methyl group and minimal steric hindrance, making it the most reactive.\n2. Acetone (III) is an aliphatic ketone with two $+I$ methyl groups and moderate steric hindrance.\n3. Benzophenone (I) is a bulky aromatic ketone with two phenyl rings that provide massive steric hindrance and extensive resonance stabilization of the carbonyl group, making it the least reactive.\nReactivity order: $\\text{II} > \\text{III} > \\text{I}$."
  },
  {
    qNum: 74,
    topic: "Dicarboxylic Acids Synthesis via Grignard Reagent",
    question_text: "In the sequence:\n\n$$\\text{Br}-\\text{CH}_2-\\text{CH}_2-\\text{Br} \\xrightarrow{\\text{KCN (excess)}} A \\xrightarrow{\\text{H}_3\\text{O}^+, \\Delta} B$$\n\nThe dicarboxylic acid $B$ obtained is:",
    options: [
      "Succinic acid (Butanedioic acid)",
      "Malonic acid (Propanedioic acid)",
      "Adipic acid (Hexanedioic acid)",
      "Oxalic acid (Ethanedioic acid)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1,2-Dibromoethane reacts with excess potassium cyanide to form succinonitrile ($\\text{NC}-\\text{CH}_2-\\text{CH}_2-\\text{CN}$, $A$). Complete acid hydrolysis of both nitrile groups yields the 4-carbon dicarboxylic acid, succinic acid ($\\text{HOOC}-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$, $B$)."
  },
  {
    qNum: 75,
    topic: "Limitations of Rosenmund Reduction",
    question_text: "Which of the following aldehydes cannot be prepared by Rosenmund's reduction?",
    options: [
      "Acetaldehyde",
      "Formaldehyde",
      "Benzaldehyde",
      "Propanal"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "Formaldehyde ($\\text{HCHO}$) cannot be prepared by Rosenmund reduction because its precursor, formyl chloride ($\\text{H-COCl}$), is extremely unstable and decomposes spontaneously into carbon monoxide and hydrogen chloride ($\\text{CO} + \\text{HCl}$) at room temperature."
  },
  {
    qNum: 76,
    topic: "Brady's Reagent Test",
    question_text: "Acetone reacts with Brady's reagent (2,4-dinitrophenylhydrazine) in acidic medium to form an orange-yellow crystalline derivative named:",
    options: [
      "Propanone phenylhydrazone",
      "Propanone semicarbazone",
      "Propanone-2,4-dinitrophenylhydrazone",
      "Acetone oxime"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Brady's reagent is 2,4-dinitrophenylhydrazine (2,4-DNP). Nucleophilic addition of the hydrazine followed by elimination of a molecule of water produces a brightly coloured crystalline hydrazone: propanone-2,4-dinitrophenylhydrazone."
  },
  {
    qNum: 77,
    topic: "Role of Dry HCl in Acetal Formation",
    question_text: "Which of the following is correct regarding the role of dry $\\text{HCl}$ gas in the formation of hemiacetals and acetals?",
    options: [
      "Dry $\\text{HCl}$ gas protonates the carbonyl oxygen, increasing the electrophilicity of the carbonyl carbon",
      "Dry $\\text{HCl}$ acts as a Lewis / Brønsted acid catalyst",
      "It helps ketones and aldehydes to react with alcohols",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "Dry $\\text{HCl}$ gas protonates the carbonyl oxygen atom, creating a full carbocation resonance contributor and dramatically increasing the electrophilicity of the carbonyl carbon towards nucleophilic attack by the weakly nucleophilic alcohol. It also acts as an acid catalyst for the subsequent loss of water to form full acetals. Hence, all statements are correct."
  },
  {
    qNum: 78,
    topic: "Dry Distillation of Calcium Carboxylates",
    question_text: "Dry distillation of calcium propionate produces:\n\n$$(\\text{CH}_3-\\text{CH}_2-\\text{COO})_2\\text{Ca} \\xrightarrow{\\Delta} X + \\text{CaCO}_3$$\n\nCompound $X$ is:",
    options: [
      "Ethane",
      "Ethanol",
      "Cyclopentanone",
      "Pentan-3-one (Diethyl ketone)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Pyrolysis (dry distillation) of the calcium salt of a monocarboxylic acid causes decarboxylation and coupling to produce a symmetrical ketone and calcium carbonate:\n$$(\\text{CH}_3\\text{CH}_2\\text{COO})_2\\text{Ca} \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH}_2\\text{COCH}_2\\text{CH}_3 + \\text{CaCO}_3$$\nThe product is pentan-3-one (diethyl ketone)."
  },
  {
    qNum: 79,
    topic: "Relative Acidic Strength of Carboxylic Acids",
    question_text: "Select the compound that is the most acidic in nature among the following:",
    options: [
      "Formic acid ($\\text{HCOOH}$)",
      "Benzoic acid ($\\text{C}_6\\text{H}_5\\text{COOH}$)",
      "Acetic acid ($\\text{CH}_3\\text{COOH}$)",
      "Phenol ($\\text{C}_6\\text{H}_5\\text{OH}$)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Formic acid ($\\text{p}K_a \\approx 3.75$) has no electron-donating $+I$ alkyl group attached to the carboxyl group. In acetic acid, the methyl group exerts $+I$ electron donation, reducing acidity ($\\text{p}K_a \\approx 4.76$). In benzoic acid, the phenyl ring donates electrons via resonance to the carbonyl ($\\text{p}K_a \\approx 4.20$). Phenol is much less acidic ($\\text{p}K_a \\approx 10.0$). Thus, formic acid is the most acidic."
  },
  {
    qNum: 80,
    topic: "Kinetics of Esterification for Different Alcohols",
    question_text: "The rate of Fischer esterification with a given carboxylic acid is maximum in the case of:",
    options: [
      "Methanol",
      "Ethanol",
      "Propan-2-ol",
      "2-Methylpropan-2-ol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The nucleophilic attack of an alcohol on the protonated carboxylic acid carbonyl is very sensitive to steric hindrance. The reactivity order for alcohols in esterification is: $\\text{CH}_3\\text{OH} > 1^\\circ > 2^\\circ > 3^\\circ$. Methanol has the smallest steric bulk and thus exhibits the highest rate of esterification."
  },
  {
    qNum: 81,
    topic: "Multistep Carbonyl Synthesis",
    question_text: "In the multistep reaction sequence:\n\n$$\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{LiAlH}_4} \\text{Alcohol} \\xrightarrow{\\text{HBr}} \\text{Halide} \\xrightarrow{\\text{Mg / ether}} \\text{Grignard} \\xrightarrow{\\text{HCHO}, \\text{ then } \\text{H}_3\\text{O}^+} \\text{Product } A \\xrightarrow{\\text{PCC}} \\text{Final Product } B$$\n\nThe final product $B$ is:",
    options: [
      "Ethanol",
      "Propanal",
      "Ethanal",
      "Acetone"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    solution: "1. Acetaldehyde is reduced by $\\text{LiAlH}_4$ to ethanol ($\\text{CH}_3\\text{CH}_2\\text{OH}$).\n2. Reaction with $\\text{HBr}$ gives bromoethane ($\\text{CH}_3\\text{CH}_2\\text{Br}$).\n3. Treatment with $\\text{Mg}$ in ether forms ethylmagnesium bromide ($\\text{CH}_3\\text{CH}_2\\text{MgBr}$).\n4. Reaction with formaldehyde ($\\text{HCHO}$) followed by acidic workup adds one carbon to yield propan-1-ol ($A$, $\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}$).\n5. Oxidation with PCC selectively converts propan-1-ol into propanal ($B$, $\\text{CH}_3\\text{CH}_2\\text{CHO}$)."
  },
  {
    qNum: 82,
    topic: "Synthesis of Phenolphthalein",
    question_text: "Phenolphthalein is prepared by heating 2 moles of phenol with 1 mole of a cyclic reactant $A$ in the presence of concentrated $\\text{H}_2\\text{SO}_4$. The reactant $A$ is:",
    options: [
      "Benzoyl chloride",
      "Phosgene",
      "Carbon tetrachloride",
      "Phthalic anhydride"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "Heating phthalic anhydride with two molecules of phenol in the presence of concentrated sulphuric acid (acting as a dehydrating agent and acid catalyst) yields phenolphthalein via electrophilic aromatic substitution at the para-positions of both phenol molecules."
  },
  {
    qNum: 83,
    topic: "Role of Pyridine in Acylation",
    question_text: "In the preparation of acetic anhydride:\n\n$$\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COCl} \\xrightarrow{\\text{Pyridine}} \\text{CH}_3\\text{COOCOCH}_3 + \\text{HCl}$$\n\nPyridine is used primarily:",
    options: [
      "To remove $\\text{HCl}$ as pyridinium chloride and drive the equilibrium forward",
      "To increase the electrophilicity of the carbonyl carbon",
      "To control the nucleophilic strength of the acid",
      "All of these"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Pyridine is a tertiary organic base that traps the hydrogen chloride ($\\text{HCl}$) generated during the acylation reaction, forming insoluble pyridinium chloride. According to Le Chatelier's principle, removing the acidic by-product prevents back-reaction and drives the equilibrium to completion."
  },
  {
    qNum: 84,
    topic: "HVZ Reaction Followed by Ammonolysis",
    question_text: "In the sequence:\n\n$$\\text{CH}_3-\\text{COOH} \\xrightarrow{\\text{Br}_2 / \\text{Red P}} A \\xrightarrow{\\text{NH}_3 \\text{ (large excess)}} B$$\n\nThe product $B$ is:",
    options: [
      "$\\alpha$-Amino acid (Glycine, $\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}$)",
      "$\\beta$-Alanine",
      "Propanedioic acid",
      "Glucosamine"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. The HVZ reaction brominates acetic acid at the $\\alpha$-position to yield bromoacetic acid: $\\text{Br-CH}_2\\text{-COOH}$ ($A$).\n2. Nucleophilic substitution with large excess of ammonia replaces the bromine atom with an amino group, producing aminoacetic acid (glycine, $\\text{H}_2\\text{N-CH}_2\\text{-COOH}$, $B$)."
  },
  {
    qNum: 85,
    topic: "Ortho Effect in Substituted Benzoic Acids",
    question_text: "The most acidic compound among the following is:",
    options: [
      "$\\text{HCOOH}$ (Formic acid)",
      "$\\text{C}_6\\text{H}_5\\text{COOH}$ (Benzoic acid)",
      "$o$-Nitrobenzoic acid",
      "Phenol"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "Due to the ortho effect (steric inhibition of resonance preventing the benzene ring from donating $\\pi$-electron density to the carbonyl), ortho-nitrobenzoic acid has a $\\text{p}K_a \\approx 2.17$, making it considerably more acidic than formic acid ($\\text{p}K_a \\approx 3.75$), benzoic acid ($\\text{p}K_a \\approx 4.20$), and phenol ($\\text{p}K_a \\approx 10.0$)."
  },
  {
    qNum: 86,
    topic: "Regioselective Grignard Addition to Keto-Aldehydes",
    question_text: "What is the major product obtained when 4-oxopentanal reacts with 1 mole of phenylmagnesium bromide followed by acidification?\n\n$$\\text{CH}_3-\\text{CO}-\\text{CH}_2-\\text{CH}_2-\\text{CHO} \\xrightarrow[\\text{(ii) }\\text{H}_3\\text{O}^+]{\\text{(i) } 1 \\text{ mol } \\text{PhMgBr}} \\text{Major Product}$$",
    options: [
      "$\\text{CH}_3-\\text{CO}-\\text{CH}_2-\\text{CH}_2-\\text{CH(OH)-Ph}$ (addition at aldehyde carbonyl)",
      "$\\text{CH}_3-\\text{C(OH)(Ph)}-\\text{CH}_2-\\text{CH}_2-\\text{CHO}$ (addition at ketone carbonyl)",
      "$\\text{CH}_3-\\text{C(OH)(Ph)}-\\text{CH}_2-\\text{CH}_2-\\text{CH(OH)-Ph}$",
      "$\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CH}_2-\\text{CO-Ph}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Aldehydes are significantly more electrophilic and much less sterically hindered than ketones. When exactly 1 mole of Grignard reagent is added to a compound containing both an aldehyde and a ketone, addition takes place chemo- and regio-selectively at the more reactive aldehyde group to produce $\\text{CH}_3-\\text{CO}-\\text{CH}_2-\\text{CH}_2-\\text{CH(OH)-Ph}$."
  },
  {
    qNum: 87,
    topic: "Acidity of Salicylic Acid Derivatives",
    question_text: "Which of the following compounds is the most acidic?",
    options: [
      "Salicylic acid (2-hydroxybenzoic acid)",
      "3-Hydroxybenzoic acid",
      "4-Hydroxybenzoic acid",
      "Benzoic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Salicylic acid (2-hydroxybenzoic acid) is unusually acidic ($\\text{p}K_a \\approx 2.97$, compared to $4.20$ for benzoic acid) because after ionisation, the phenolate oxygen / phenolic hydrogen forms a strong intramolecular hydrogen bond with the carboxylate oxygen, creating an exceptionally stable 6-membered chelate ring."
  },
  {
    qNum: 88,
    topic: "Reactivity of Carboxylic Acid Derivatives",
    question_text: "The rate of nucleophilic acyl substitution (addition-elimination) for carboxylic acid derivatives follows the decreasing order:",
    options: [
      "Acyl halide > Acid anhydride > Ester > Amide",
      "Ester > Acid anhydride > Acyl halide > Amide",
      "Alkyl halide > Amide > Ester > Acid anhydride",
      "Amide > Ester > Acid anhydride > Acyl halide"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The reactivity in nucleophilic acyl substitution is governed by the leaving group ability (conjugate base stability) and the extent of resonance donation into the carbonyl carbon. The leaving group ability is $\\text{Cl}^- > \\text{RCOO}^- > \\text{RO}^- > \\text{NH}_2^-$, giving the order: Acyl halide > Acid anhydride > Ester > Amide."
  },
  {
    qNum: 89,
    topic: "Acidic Hydrolysis of Cyclic Acetals and Ketals",
    question_text: "Acid-catalysed hydrolysis of a cyclic ethylene ketal of cyclohexanone:\n\n$$\\text{1,4-Dioxaspiro[4.5]decane} \\xrightarrow{\\text{H}_3\\text{O}^+, \\Delta} \\text{Products}$$\n\nyields:",
    options: [
      "Cyclohexanone and Ethane-1,2-diol (Ethylene glycol)",
      "Cyclohexanol and Ethanol",
      "Adipic acid and Glycol",
      "Cyclohexene and Ethylene oxide"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Cyclic acetals and ketals are stable to base but undergo quantitative cleavage in aqueous acid back to the parent carbonyl compound and the diol. Hydrolysis of 1,4-dioxaspiro[4.5]decane produces cyclohexanone and ethane-1,2-diol (ethylene glycol)."
  },
  {
    qNum: 90,
    topic: "Electrophilic Aromatic Substitution on Benzaldehyde",
    question_text: "Nitration of benzaldehyde with concentrated $\\text{HNO}_3$ and concentrated $\\text{H}_2\\text{SO}_4$ gives predominantly:",
    options: [
      "$o$-Nitrobenzaldehyde",
      "$p$-Nitrobenzaldehyde",
      "$m$-Nitrobenzaldehyde",
      "Both (1) and (2)"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "The formyl group ($-\\text{CHO}$) is strongly electron-withdrawing by $-M$ resonance and $-I$ inductive effects, deactivating the ortho and para positions of the benzene ring to a much greater extent than the meta position. Therefore, electrophilic substitution (nitration) occurs selectively at the meta position to yield $m$-nitrobenzaldehyde."
  },
  {
    qNum: 91,
    topic: "Clemmensen Reduction Reagents",
    question_text: "Clemmensen reduction of a ketone is carried out in the presence of which of the following reagents?",
    options: [
      "$\\text{H}_2 / \\text{Pd-C}$",
      "$\\text{NH}_2\\text{NH}_2 / \\text{glycol} / \\text{KOH}$",
      "$\\text{Zn-Hg} / \\text{conc. HCl}$",
      "$\\text{LiAlH}_4$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "Clemmensen reduction reduces aldehydes and ketones to their corresponding hydrocarbon methylene groups using zinc amalgam ($\\text{Zn-Hg}$) in concentrated hydrochloric acid ($\\text{HCl}$)."
  },
  {
    qNum: 92,
    topic: "Thermal Decarboxylation of Beta-Keto Acids",
    question_text: "Which of the following compounds undergoes decarboxylation most readily under mild heating conditions?",
    options: [
      "Acetoacetic acid ($\\text{CH}_3\\text{COCH}_2\\text{COOH}$, a $\\beta$-keto acid)",
      "Acetic acid ($\\text{CH}_3\\text{COOH}$)",
      "Malonic acid (at 150 °C)",
      "Benzoic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "$\\beta$-keto acids possess a carbonyl group at the $\\beta$-position relative to the carboxyl group. They undergo rapid, spontaneous decarboxylation upon gentle warming via a concerted 6-membered cyclic transition state to produce an enol, which immediately tautomerises to a ketone."
  },
  {
    qNum: 93,
    topic: "Mechanism of Cannizzaro Reaction",
    question_text: "In the Cannizzaro reaction of benzaldehyde:\n\n$$2\\,\\text{C}_6\\text{H}_5\\text{CHO} \\xrightarrow{\\text{50% KOH}} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH} + \\text{C}_6\\text{H}_5\\text{COOK}$$\n\nThe rate-determining step is:",
    options: [
      "Attack of hydroxide on the first aldehyde molecule",
      "Hydride ion ($\\text{H}^-$) transfer from the tetrahedral dianion/monoanion to the second aldehyde molecule",
      "Proton transfer between the alkoxide and carboxylic acid",
      "Dehydration of the intermediate"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    solution: "The slow and rate-determining step in the Cannizzaro reaction is the intermolecular hydride transfer from the carbonyl carbon of the tetrahedral intermediate (formed by nucleophilic addition of $\\text{OH}^-$) to the carbonyl carbon of the second aldehyde molecule."
  },
  {
    qNum: 94,
    topic: "Haloform Reaction Mechanism",
    question_text: "In the haloform reaction of acetone with $\\text{I}_2 / \\text{NaOH}$:\n\n$$\\text{CH}_3\\text{COCH}_3 + 3\\,\\text{I}_2 + 4\\,\\text{NaOH} \\to \\text{CHI}_3 \\downarrow + \\text{CH}_3\\text{COONa} + 3\\,\\text{NaI} + 3\\,\\text{H}_2\\text{O}$$\n\nThe number of moles of $\\text{I}_2$ and $\\text{NaOH}$ consumed per mole of acetone are respectively:",
    options: [
      "3 and 4",
      "1 and 2",
      "3 and 3",
      "2 and 3"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Halogenation of the three $\\alpha$-hydrogens consumes 3 moles of $\\text{I}_2$ and 3 moles of $\\text{NaOH}$ to produce the triiodomethyl ketone ($\\text{CH}_3\\text{COCI}_3$). Cleavage of the triiodomethyl group by a fourth mole of hydroxide yields iodoform ($\\text{CHI}_3$) and sodium acetate. Total consumed: 3 moles $\\text{I}_2$ and 4 moles $\\text{NaOH}$."
  },
  {
    qNum: 95,
    topic: "Stephen's Reduction of Nitriles",
    question_text: "Stephen's reaction involves the conversion of a nitrile into an aldehyde using:",
    options: [
      "$\\text{SnCl}_2 / \\text{HCl}$ followed by $\\text{H}_3\\text{O}^+$",
      "$\\text{LiAlH}_4$ in ether",
      "$\\text{H}_2 / \\text{Pd-BaSO}_4$",
      "$\\text{NaBH}_4$ in ethanol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Stephen's reduction reduces aliphatic or aromatic nitriles ($\\text{R-CN}$) to iminium salts using stannous chloride and hydrochloric acid ($\\text{SnCl}_2 / \\text{HCl}$), which upon boiling with water (hydrolysis) yield the corresponding aldehydes ($\\text{R-CHO}$)."
  },
  {
    qNum: 96,
    topic: "Hemiacetal Formation with One Equivalent of Alcohol",
    question_text: "Acetaldehyde on treatment with one equivalent of dry ethanol in the presence of dry $\\text{HCl}$ gas yields:",
    options: [
      "Acetic acid",
      "1-Ethoxyethanol (a hemiacetal)",
      "1,1-Diethoxyethane (an acetal)",
      "Ethyl acetate"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "When an aldehyde reacts with exactly one equivalent of monohydric alcohol in the presence of dry hydrogen chloride gas, addition across the carbonyl produces an alkoxy alcohol known as a hemiacetal: $\\text{CH}_3\\text{CH(OH)(OCH}_2\\text{CH}_3)$ (1-ethoxyethanol). Treatment with excess alcohol is required to form the full acetal."
  },
  {
    qNum: 97,
    topic: "Chloral Hydrate Stability",
    question_text: "Chloral ($\\text{CCl}_3\\text{CHO}$) reacts with water to form chloral hydrate, $\\text{CCl}_3\\text{CH(OH)}_2$. This gem-diol is exceptionally stable because of:",
    options: [
      "Intramolecular hydrogen bonding between the $-\\text{OH}$ protons and the electronegative chlorine atoms",
      "Steric relief in the tetrahedral carbon",
      "Strong $+I$ effect of chlorine",
      "Resonance stabilization"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Although gem-diols are generally unstable and spontaneously dehydrate to carbonyls, chloral hydrate is an exception. The strong $-I$ effect of three chlorine atoms makes the carbonyl carbon highly electron-deficient, promoting hydration, and the resulting gem-diol is strongly stabilised by intramolecular hydrogen bonding forming two 5-membered rings involving the chlorine atoms."
  },
  {
    qNum: 98,
    topic: "Stereoisomerism in Cross-Aldol Condensation",
    question_text: "How many aldol condensation products are obtained (considering geometrical $E/Z$ stereoisomers) from the cross-aldol condensation of benzaldehyde and acetaldehyde?",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "Benzaldehyde has no $\\alpha$-hydrogens, while acetaldehyde has $\\alpha$-hydrogens. Two structural condensation products are formed:\n1. Self-aldol of acetaldehyde yields crotonaldehyde ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CHO}$), which exists as $E$ and $Z$ stereoisomers (2 isomers).\n2. Cross-aldol yields cinnamaldehyde ($\\text{Ph}-\\text{CH}=\\text{CH}-\\text{CHO}$), which also exists as $E$ and $Z$ stereoisomers (2 isomers).\nTotal condensation products considering stereoisomerism = $2 + 2 = 4$."
  },
  {
    qNum: 99,
    topic: "Claisen Ester Condensation",
    question_text: "Ethyl acetoacetate (a classic compound containing an active methylene group) is prepared industrially by the self-condensation of ethyl acetate in the presence of sodium ethoxide. This reaction is known as:",
    options: [
      "Perkin's reaction",
      "Cannizzaro's reaction",
      "Darzen's reaction",
      "Claisen condensation"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "The condensation of an ester possessing an $\\alpha$-hydrogen with itself or another ester in the presence of a strong base (such as $\\text{C}_2\\text{H}_5\\text{ONa}$) to form a $\\beta$-keto ester is the Claisen ester condensation:\n$$2\\,\\text{CH}_3\\text{COOC}_2\\text{H}_5 \\xrightarrow{\\text{C}_2\\text{H}_5\\text{ONa}} \\text{CH}_3\\text{COCH}_2\\text{COOC}_2\\text{H}_5 + \\text{C}_2\\text{H}_5\\text{OH}$$"
  },
  {
    qNum: 100,
    topic: "Synthesis of Phthalimide",
    question_text: "In the sequence:\n\n$$\\text{Phthalic acid} \\xrightarrow{\\text{PCl}_5} X \\xrightarrow{\\text{excess NH}_3, \\Delta} Y$$\n\nThe product $Y$ is:",
    options: [
      "Phthaloyl chloride",
      "Phthalamide",
      "Phthalimide",
      "Anthranilic acid"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. Reaction of phthalic acid with $\\text{PCl}_5$ converts both carboxyl groups into acyl chlorides to yield phthaloyl chloride ($X$).\n2. Reaction with ammonia yields phthalamide, which upon heating readily loses a molecule of ammonia in an intramolecular cyclization to form the stable 5-membered cyclic imide: phthalimide ($Y$)."
  },
  {
    qNum: 101,
    topic: "Comparative Acidity of Substituted Benzoic Acids",
    question_text: "The correct order of acidic strength of the following substituted benzoic acids is:\n\n(I) $o$-Hydroxybenzoic acid (Salicylic acid)\n(II) $p$-Hydroxybenzoic acid\n(III) $m$-Hydroxybenzoic acid\n(IV) Benzoic acid",
    options: [
      "(I) > (III) > (IV) > (II)",
      "(I) > (IV) > (III) > (II)",
      "(I) > (II) > (III) > (IV)",
      "(IV) > (I) > (III) > (II)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "1. Salicylic acid (I) is the strongest acid by far due to the ortho effect and intramolecular hydrogen bonding in the salicylate anion ($\\text{p}K_a \\approx 2.97$).\n2. At the meta position (III), $-\\text{OH}$ exerts an electron-withdrawing $-I$ effect, making it stronger than benzoic acid (IV) ($\\text{p}K_a \\approx 4.08$ vs $4.20$).\n3. At the para position (II), $-\\text{OH}$ donates electron density strongly by $+M$ resonance, destabilizing the carboxylate and making it the weakest ($\\text{p}K_a \\approx 4.58$).\nDecreasing acidity: (I) > (III) > (IV) > (II)."
  },
  {
    qNum: 102,
    topic: "Reaction of Phthalic Anhydride with Hydrazine",
    question_text: "When phthalic anhydride is heated with hydrazine hydrate ($\\text{NH}_2\\text{NH}_2$), the product formed is:",
    options: [
      "Phthalhydrazide (a 6-membered cyclic hydrazide)",
      "Phthalic acid",
      "Phthalimide",
      "Hydrazobenzene"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Hydrazine has two nucleophilic amino groups. Nucleophilic attack on both carbonyls of phthalic anhydride with elimination of water forms a stable 6-membered heterocyclic bicyclic compound known as phthalhydrazide (2,3-dihydrophthalazine-1,4-dione)."
  },
  {
    qNum: 103,
    topic: "Transesterification Mechanism",
    question_text: "The exchange of an alkoxy group of an ester with another alcohol in the presence of an acid or base catalyst:\n\n$$\\text{R-COOR}' + \\text{R}''-\\text{OH} \\xrightleftharpoons{\\text{H}^+ / \\text{OH}^-} \\text{R-COOR}'' + \\text{R}'-\\text{OH}$$\n\nis known as:",
    options: [
      "Transesterification (Alcoholysis of ester)",
      "Saponification",
      "Fischer esterification",
      "Decarboxylation"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The reaction between an ester and an alcohol in the presence of an acid or base to form a new ester and a new alcohol is known as alcoholysis of an ester, or transesterification."
  },
  {
    qNum: 104,
    topic: "Structure Elucidation of Cycloalkenes via Ozonolysis",
    question_text: "An organic compound $A$ with molecular formula $\\text{C}_7\\text{H}_{12}$ decolourizes Baeyer's reagent and absorbs 1 mole of $\\text{H}_2$ to form $\\text{C}_7\\text{H}_{14}$. Ozonolysis of $A$ followed by reductive workup ($\\text{Zn} / \\text{H}_2\\text{O}$) gives heptane-2,6-dione as the only product. Compound $A$ is:",
    options: [
      "1,2-Dimethylcyclopentene",
      "1,3-Dimethylcyclopentene",
      "1,4-Dimethylcyclobutene",
      "Cycloheptene"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "1. Formula $\\text{C}_7\\text{H}_{12}$ has degree of unsaturation = $7 + 1 - (12/2) = 2$.\n2. Absorbing 1 mole of $\\text{H}_2$ means it contains 1 double bond and 1 ring.\n3. Ozonolysis gives a single diketone product, heptane-2,6-dione ($\\text{CH}_3\\text{COCH}_2\\text{CH}_2\\text{CH}_2\\text{COCH}_3$). Cleavage of a cyclic alkene yielding a 7-carbon open chain with carbonyls at positions 2 and 6 indicates that the double bond was between the carbons bearing the methyl groups in a 5-membered ring: 1,2-dimethylcyclopentene."
  },
  {
    qNum: 105,
    topic: "Iodoform Positive Test Identification",
    question_text: "Which of the following compounds gives a yellow precipitate of iodoform on warming with $\\text{I}_2$ and aqueous $\\text{NaOH}$?",
    options: [
      "Acetophenone ($\\text{C}_6\\text{H}_5-\\text{CO}-\\text{CH}_3$)",
      "Benzophenone ($\\text{C}_6\\text{H}_5-\\text{CO}-\\text{C}_6\\text{H}_5$)",
      "3-Pentanone ($\\text{CH}_3\\text{CH}_2\\text{COCH}_2\\text{CH}_3$)",
      "Benzaldehyde ($\\text{C}_6\\text{H}_5\\text{CHO}$)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The haloform (iodoform) reaction is given specifically by compounds having a methyl ketone group ($-\\text{COCH}_3$) or a secondary alcohol with $-\\text{CH(OH)CH}_3$. Acetophenone contains the $-\\text{COCH}_3$ group and yields a bright yellow precipitate of iodoform ($\\text{CHI}_3$). Benzophenone, 3-pentanone, and benzaldehyde lack a methyl group directly bonded to the carbonyl and give a negative test."
  }
];
