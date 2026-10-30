/**
 * Aldehydes, Ketones and Carboxylic Acids - Questions 106 to 144
 * Source: Aakash Momentum Booster for NEET (Section A Objective Type Questions)
 */

export const ALDEHYDES_PART4 = [
  {
    qNum: 106,
    topic: "Selective Reduction of Unsaturated Esters",
    question_text: "In the reduction of an $\\alpha,\\beta$-unsaturated ester:\n\n$$\\text{Ethyl cyclopent-1-enecarboxylate} \\xrightarrow[\\text{(ii) }\\text{H}_2\\text{O}]{\\text{(i) }\\text{LiAlH}_4} \\text{Product}$$\n\nThe major product formed is:",
    options: [
      "Cyclopent-1-en-1-ylmethanol (an allylic alcohol)",
      "Cyclopentylmethanol",
      "Cyclopent-1-enecarbaldehyde",
      "Cyclopentanol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Lithium aluminium hydride ($\\text{LiAlH}_4$) reduces ester groups ($\\text{-COOR}$) to primary alcohols ($\\text{-CH}_2\\text{OH}$) without reducing non-conjugated or cyclic alkene double bonds, yielding the allylic alcohol, cyclopent-1-en-1-ylmethanol."
  },
  {
    qNum: 107,
    topic: "Comparison of Acidic Strengths",
    question_text: "The correct decreasing order of acidic strength among the following is:\n\nI: Picric acid (2,4,6-trinitrophenol)\nII: Formic acid ($\\text{HCOOH}$)\nIII: Benzoic acid ($\\text{C}_6\\text{H}_5\\text{COOH}$)\nIV: Phenol ($\\text{C}_6\\text{H}_5\\text{OH}$)",
    options: [
      "$\\text{I} > \\text{II} > \\text{III} > \\text{IV}$",
      "$\\text{II} > \\text{I} > \\text{III} > \\text{IV}$",
      "$\\text{III} > \\text{II} > \\text{I} > \\text{IV}$",
      "$\\text{I} > \\text{III} > \\text{II} > \\text{IV}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. Picric acid (I) has three strong electron-withdrawing nitro groups that stabilize the phenolate ion by extensive resonance, making it an extremely strong acid ($\\text{p}K_a \\approx 0.38$, stronger than most carboxylic acids).\n2. Formic acid (II) has $\\text{p}K_a \\approx 3.75$.\n3. Benzoic acid (III) has $\\text{p}K_a \\approx 4.20$.\n4. Phenol (IV) has $\\text{p}K_a \\approx 10.0$ and is by far the weakest.\nOrder: $\\text{I} > \\text{II} > \\text{III} > \\text{IV}$."
  },
  {
    qNum: 108,
    topic: "Crossed Cannizzaro Reaction",
    question_text: "When an equimolar mixture of benzaldehyde and formaldehyde is heated with concentrated $\\text{NaOH}$ solution (Crossed Cannizzaro reaction), the products formed are:",
    options: [
      "Benzyl alcohol and Sodium formate",
      "Sodium benzoate and Methanol",
      "Benzyl alcohol and Methanol",
      "Sodium benzoate and Sodium formate"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Formaldehyde ($\\text{HCHO}$) has no alkyl/aryl groups and minimal steric hindrance, making its carbonyl carbon far more electrophilic than that of benzaldehyde. Hydroxide ion preferentially attacks formaldehyde to form a tetrahedral intermediate, which transfers a hydride ion ($\\text{H}^-$) to benzaldehyde. Thus, formaldehyde is oxidised to sodium formate ($\\text{HCOONa}$), and benzaldehyde is reduced to benzyl alcohol ($\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$)."
  },
  {
    qNum: 109,
    topic: "Decarboxylation with Soda-Lime",
    question_text: "Methane gas can be prepared in the laboratory by heating anhydrous sodium ethanoate with:",
    options: [
      "Soda-lime ($\\text{NaOH} + \\text{CaO}$) at 630 K",
      "Aqueous $\\text{NaOH}$",
      "Quicklime ($\\text{CaO}$) alone",
      "Concentrated $\\text{H}_2\\text{SO}_4$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Heating anhydrous sodium ethanoate with soda-lime (a 3:1 mixture of $\\text{NaOH}$ and $\\text{CaO}$) causes decarboxylation to produce methane and sodium carbonate:\n$$\\text{CH}_3\\text{COONa} + \\text{NaOH} \\xrightarrow{\\text{CaO}, \\Delta} \\text{CH}_4 + \\text{Na}_2\\text{CO}_3$$\n$\\text{CaO}$ keeps the reaction mixture dry and reduces the corrosive action of $\\text{NaOH}$ on glass."
  },
  {
    qNum: 110,
    topic: "Structural Requirements for HVZ Reaction",
    question_text: "Which of the following carboxylic acids will NOT undergo the Hell-Volhard-Zelinsky (HVZ) reaction on treatment with $\\text{Br}_2 / \\text{Red P}$?",
    options: [
      "2,2-Dimethylpropanoic acid (Pivalic acid)",
      "Propanoic acid",
      "Ethanoic acid",
      "2-Methylpropanoic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The HVZ reaction requires the presence of at least one $\\alpha$-hydrogen atom on the carboxylic acid for halogenation to proceed via an enol/acyl halide intermediate. 2,2-Dimethylpropanoic acid (pivalic acid, $(\\text{CH}_3)_3\\text{C-COOH}$) has no $\\alpha$-hydrogens and therefore cannot undergo the HVZ reaction."
  },
  {
    qNum: 111,
    topic: "Reimer-Tiemann Reaction Intermediate",
    question_text: "In the Reimer-Tiemann reaction of phenol with chloroform and aqueous $\\text{NaOH}$ to yield salicylaldehyde, the electrophilic intermediate is:",
    options: [
      "Dichlorocarbene ($:\\text{CCl}_2$)",
      "Trichloromethyl anion ($^-\\text{CCl}_3$)",
      "Formyl cation ($^+\\text{CHO}$)",
      "Dichloromethyl cation ($^+\\text{CHCl}_2$)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Treatment of chloroform with hydroxide causes $\\alpha$-elimination of $\\text{HCl}$ to generate neutral, electron-deficient dichlorocarbene ($:\\text{CCl}_2$), which acts as the reactive electrophile attacking the phenolate ring at the ortho position."
  },
  {
    qNum: 112,
    topic: "Kolbe-Schmitt Carboxylation",
    question_text: "Salicylic acid is prepared industrially by heating sodium phenoxide with carbon dioxide at 400 K and 4-7 atm pressure followed by acidification. This reaction is known as:",
    options: [
      "Kolbe-Schmitt reaction",
      "Reimer-Tiemann reaction",
      "Perkin reaction",
      "Gattermann reaction"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The carboxylation of sodium phenoxide with $\\text{CO}_2$ under pressure followed by acidification yields 2-hydroxybenzoic acid (salicylic acid), known as the Kolbe-Schmitt reaction."
  },
  {
    qNum: 113,
    topic: "Gattermann-Koch Formylation",
    question_text: "Benzaldehyde is synthesised from benzene in the Gattermann-Koch reaction using:",
    options: [
      "$\\text{CO} + \\text{HCl}$ in the presence of anhydrous $\\text{AlCl}_3 / \\text{CuCl}$",
      "$\\text{HCN} + \\text{HCl}$ in the presence of $\\text{AlCl}_3$",
      "$\\text{CHCl}_3 + \\text{KOH}$",
      "$\\text{CH}_3\\text{COCl} + \\text{AlCl}_3$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The Gattermann-Koch reaction introduces a formyl group ($-\\text{CHO}$) directly onto benzene by treatment with a mixture of carbon monoxide ($\\text{CO}$) and hydrogen chloride ($\\text{HCl}$) gas under high pressure in the presence of anhydrous aluminium chloride and cuprous chloride."
  },
  {
    qNum: 114,
    topic: "Etard's Reaction",
    question_text: "In Etard's reaction, toluene is converted to benzaldehyde by oxidation with:",
    options: [
      "Chromyl chloride ($\\text{CrO}_2\\text{Cl}_2$) in $\\text{CS}_2$ followed by hydrolysis",
      "Alkaline $\\text{KMnO}_4$",
      "Acidified $\\text{K}_2\\text{Cr}_2\\text{O}_7$",
      "$\\text{CrO}_3$ in acetic anhydride"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Etard's reaction oxidises the methyl group of toluene selectively to a brown chromium complex using chromyl chloride ($\\text{CrO}_2\\text{Cl}_2$) in carbon disulfide ($\\text{CS}_2$) or $\\text{CCl}_4$, which on hydrolysis yields benzaldehyde."
  },
  {
    qNum: 115,
    topic: "Inductive Effect and Haloacetic Acid Acidity",
    question_text: "The correct decreasing order of acidic strength of monohaloacetic acids is:",
    options: [
      "$\\text{F-CH}_2\\text{COOH} > \\text{Cl-CH}_2\\text{COOH} > \\text{Br-CH}_2\\text{COOH} > \\text{I-CH}_2\\text{COOH}$",
      "$\\text{I-CH}_2\\text{COOH} > \\text{Br-CH}_2\\text{COOH} > \\text{Cl-CH}_2\\text{COOH} > \\text{F-CH}_2\\text{COOH}$",
      "$\\text{Cl-CH}_2\\text{COOH} > \\text{F-CH}_2\\text{COOH} > \\text{Br-CH}_2\\text{COOH} > \\text{I-CH}_2\\text{COOH}$",
      "$\\text{F-CH}_2\\text{COOH} > \\text{Br-CH}_2\\text{COOH} > \\text{Cl-CH}_2\\text{COOH} > \\text{I-CH}_2\\text{COOH}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The $-I$ (electron-withdrawing inductive) effect of halogens increases with increasing electronegativity: $\\text{F} > \\text{Cl} > \\text{Br} > \\text{I}$. Stronger electron withdrawal stabilizes the conjugate carboxylate anion, giving the acidity order: $\\text{FCH}_2\\text{COOH} > \\text{ClCH}_2\\text{COOH} > \\text{BrCH}_2\\text{COOH} > \\text{ICH}_2\\text{COOH}$."
  },
  {
    qNum: 116,
    topic: "Number of Halogen Atoms and Acid Strength",
    question_text: "Which of the following chlorinated acetic acids is the strongest acid?",
    options: [
      "Trichloroacetic acid ($\\text{CCl}_3\\text{COOH}$)",
      "Dichloroacetic acid ($\\text{CHCl}_2\\text{COOH}$)",
      "Monochloroacetic acid ($\\text{CH}_2\\text{ClCOOH}$)",
      "Acetic acid ($\\text{CH}_3\\text{COOH}$)"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The cumulative $-I$ effect increases with the number of electron-withdrawing chlorine atoms. Trichloroacetic acid ($\\text{p}K_a \\approx 0.65$) is far more acidic than dichloroacetic acid ($\\text{p}K_a \\approx 1.29$), monochloroacetic acid ($\\text{p}K_a \\approx 2.86$), and acetic acid ($\\text{p}K_a \\approx 4.76$)."
  },
  {
    qNum: 117,
    topic: "Distance Dependence of Inductive Effect",
    question_text: "The correct decreasing order of acidic strength among the chlorobutanoic acids is:\n\nI: 2-Chlorobutanoic acid\nII: 3-Chlorobutanoic acid\nIII: 4-Chlorobutanoic acid\nIV: Butanoic acid",
    options: [
      "$\\text{I} > \\text{II} > \\text{III} > \\text{IV}$",
      "$\\text{IV} > \\text{III} > \\text{II} > \\text{I}$",
      "$\\text{I} > \\text{III} > \\text{II} > \\text{IV}$",
      "$\\text{II} > \\text{I} > \\text{III} > \\text{IV}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "The inductive effect decreases sharply with increasing distance from the reaction center (carboxyl group). In 2-chlorobutanoic acid, the chlorine atom is on the $\\alpha$-carbon (closest), exerting the strongest $-I$ effect. It is weaker at the $\\beta$-position (3-chloro) and even weaker at the $\\gamma$-position (4-chloro). Order: $\\text{I} > \\text{II} > \\text{III} > \\text{IV}$."
  },
  {
    qNum: 118,
    topic: "Blanc's Rule on Heating Dicarboxylic Acids",
    question_text: "Adipic acid (hexanedioic acid) on heating in the presence of $\\text{Ba(OH)}_2$ or $\\text{MnO}$ undergoes simultaneous decarboxylation and dehydration to yield:",
    options: [
      "Cyclopentanone",
      "Cyclohexanone",
      "Adipic anhydride",
      "Glutaric acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "According to Blanc's rule, 1,6-dicarboxylic acids (like adipic acid) and 1,7-dicarboxylic acids (pimelic acid) lose carbon dioxide and water upon heating to yield 5- and 6-membered cyclic ketones respectively. Adipic acid gives cyclopentanone:\n$$\\text{HOOC}-(\\text{CH}_2)_4-\\text{COOH} \\xrightarrow{\\text{Ba(OH)}_2, \\Delta} \\text{Cyclopentanone} + \\text{CO}_2 + \\text{H}_2\\text{O}$$"
  },
  {
    qNum: 119,
    topic: "Esterification with Diazomethane",
    question_text: "Carboxylic acids react smoothly with diazomethane ($\\text{CH}_2\\text{N}_2$) in ether at room temperature to produce:",
    options: [
      "Methyl esters with liberation of $\\text{N}_2$ gas",
      "Ethyl esters",
      "Amides",
      "Acid anhydrides"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Diazomethane ($\\text{CH}_2\\text{N}_2$) is an excellent methylating agent for carboxylic acids. Proton transfer from the carboxylic acid generates the carboxylate anion and methyldiazonium cation, which undergoes rapid nucleophilic displacement to form a methyl ester and nitrogen gas:\n$$\\text{R-COOH} + \\text{CH}_2\\text{N}_2 \\xrightarrow{\\text{ether}} \\text{R-COOCH}_3 + \\text{N}_2 \\uparrow$$"
  },
  {
    qNum: 120,
    topic: "Schmidt Reaction",
    question_text: "In the Schmidt reaction, a carboxylic acid is converted into a primary amine with one fewer carbon atom by heating with:",
    options: [
      "Hydrazoic acid ($\\text{HN}_3$) in the presence of concentrated $\\text{H}_2\\text{SO}_4$",
      "Ammonia in the presence of $\\text{Al}_2\\text{O}_3$",
      "Hydroxylamine in acid",
      "Nitrous acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "The Schmidt reaction converts carboxylic acids into primary amines having one less carbon atom by treatment with hydrazoic acid ($\\text{HN}_3$) in concentrated $\\text{H}_2\\text{SO}_4$ with loss of $\\text{CO}_2$ and $\\text{N}_2$:\n$$\\text{R-COOH} + \\text{HN}_3 \\xrightarrow{\\text{conc. H}_2\\text{SO}_4} \\text{R-NH}_2 + \\text{CO}_2 + \\text{N}_2$$"
  },
  {
    qNum: 121,
    topic: "Curtius Rearrangement",
    question_text: "In the Curtius rearrangement, an acyl azide on thermal decomposition undergoes 1,2-migration with loss of nitrogen to yield:",
    options: [
      "An alkyl isocyanate ($\\text{R-N}=\\text{C}=\\text{O}$)",
      "A primary amide",
      "An oxime",
      "A nitrile"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Thermal rearrangement of acyl azides ($\\text{R-CON}_3$) proceeds with extrusion of molecular nitrogen ($\\text{N}_2$) and concomitant migration of the alkyl/aryl group to the electron-deficient nitrogen atom, yielding an alkyl isocyanate ($\\text{R-N=C=O}$), which on subsequent hydrolysis gives a primary amine."
  },
  {
    qNum: 122,
    topic: "Wolff-Kishner Reduction Mechanism",
    question_text: "In the Wolff-Kishner reduction of a carbonyl compound, the intermediate hydrazone is heated with $\\text{KOH}$ in high-boiling ethylene glycol. The gas evolved during the reaction is:",
    options: [
      "$\\text{N}_2$ (Nitrogen gas)",
      "$\\text{H}_2$",
      "$\\text{NH}_3$",
      "$\\text{CO}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "In the Wolff-Kishner reduction, base-catalysed tautomerization of the hydrazone ($\\text{R}_2\\text{C}=\\text{N-NH}_2$) generates a diimide intermediate that undergoes base-induced elimination of nitrogen gas ($\\text{N}_2 \\uparrow$), driven by the extreme thermodynamic stability of the $\\text{N}\\equiv\\text{N}$ bond."
  },
  {
    qNum: 123,
    topic: "Limitations of Clemmensen Reduction",
    question_text: "Which of the following compounds CANNOT be reduced cleanly to an alkane using Clemmensen reduction ($\\text{Zn-Hg} / \\text{conc. HCl}$)?",
    options: [
      "A keto-alcohol containing an acid-sensitive $-\\text{OH}$ group",
      "Acetophenone",
      "Cyclohexanone",
      "Butan-2-one"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Clemmensen reduction uses concentrated $\\text{HCl}$, an aggressive acid. Compounds containing acid-sensitive groups like alcohols ($-\\text{OH}$), ethers, or carbon-carbon double bonds undergo dehydration, substitution by chloride, or addition of $\\text{HCl}$. Wolff-Kishner reduction is preferred for such acid-sensitive compounds."
  },
  {
    qNum: 124,
    topic: "DIBAL-H Reduction of Esters and Nitriles",
    question_text: "Diisobutylaluminium hydride (DIBAL-H) at low temperature (-78 °C) reduces esters and nitriles selectively to:",
    options: [
      "Aldehydes",
      "Primary alcohols",
      "Carboxylic acids",
      "Alkanes"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "DIBAL-H is a sterically hindered hydride donor. At -78 °C, it transfers exactly one hydride to an ester or nitrile to form a stable tetrahedral hemiacetal or imine intermediate that does not decompose until aqueous acidic workup, thereby stopping cleanly at the aldehyde stage."
  },
  {
    qNum: 125,
    topic: "Selective Reduction of Acyl Chlorides",
    question_text: "Lithium tri-tert-butoxyaluminium hydride ($\\text{LiAlH[OC(CH}_3)_3]_3$) selectively reduces acyl chlorides ($\\text{R-COCl}$) to:",
    options: [
      "Aldehydes ($\\text{R-CHO}$)",
      "Primary alcohols ($\\text{R-CH}_2\\text{OH}$)",
      "Carboxylic acids",
      "Methyl ketones"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "The three bulky tert-butoxy groups significantly moderate the reducing power of the aluminium hydride. It rapidly reduces the highly reactive acyl chloride at -78 °C, but is too weak to reduce the resulting aldehyde, giving aldehydes in high yields."
  },
  {
    qNum: 126,
    topic: "Synthesis of Pentaerythritol",
    question_text: "When acetaldehyde is treated with excess formaldehyde in the presence of $\\text{Ca(OH)}_2$, the final product formed after three crossed-aldol additions and one crossed-Cannizzaro reaction is:",
    options: [
      "Pentaerythritol ($(\\text{HOCH}_2)_4\\text{C}$)",
      "Glycerol",
      "Crotonaldehyde",
      "Trihydroxyacetone"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "Acetaldehyde has three $\\alpha$-hydrogens. Treatment with excess $\\text{HCHO}$ in base causes three successive crossed-aldol additions to form tris(hydroxymethyl)acetaldehyde, $(\\text{HOCH}_2)_3\\text{C-CHO}$. This aldehyde has no remaining $\\alpha$-hydrogens and undergoes a crossed-Cannizzaro reaction with a fourth molecule of formaldehyde, yielding pentaerythritol ($(\\text{HOCH}_2)_4\\text{C}$) and calcium formate."
  },
  {
    qNum: 127,
    topic: "Acid-Catalysed Condensation of Acetone",
    question_text: "When dry $\\text{HCl}$ gas is passed into acetone, the initial condensation product formed by the self-condensation of two molecules of acetone is:",
    options: [
      "Mesityl oxide (4-methylpent-3-en-2-one)",
      "Phorone",
      "Mesitylene",
      "Pinacol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Dry $\\text{HCl}$ catalyzes the aldol condensation of two molecules of acetone to form diacetone alcohol, which dehydrates readily under acid conditions to yield mesityl oxide ($\\text{CH}_3\\text{COCH}=\\text{C(CH}_3)_2$). Further condensation with a third molecule of acetone yields phorone."
  },
  {
    qNum: 128,
    topic: "Hydrolysis of Oximes",
    question_text: "Acid-catalysed boiling of an oxime with dilute mineral acid converts it back into:",
    options: [
      "The original carbonyl compound and hydroxylamine salt",
      "A primary amine",
      "A carboxylic acid",
      "An alcohol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Oximes ($\\text{R}_2\\text{C}=\\text{N-OH}$) are hydrolysed by boiling with dilute aqueous acids to regenerate the parent aldehyde or ketone and hydroxylammonium salt:\n$$\\text{R}_2\\text{C}=\\text{N-OH} + \\text{H}_3\\text{O}^+ \\to \\text{R}_2\\text{C}=\\text{O} + [\\text{NH}_3\\text{OH}]^+$$"
  },
  {
    qNum: 129,
    topic: "Beckmann Rearrangement",
    question_text: "In the Beckmann rearrangement of acetophenone oxime:\n\n$$\\text{C}_6\\text{H}_5-\\text{C}(\\text{CH}_3)=\\text{N-OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4 \\text{ or } \\text{PCl}_5} \\text{Product}$$\n\nIf the $-\\text{OH}$ group is anti to the phenyl group, the product formed is:",
    options: [
      "Acetanilide ($\\text{CH}_3\\text{CONHPh}$)",
      "$N$-Methylbenzamide ($\\text{PhCONHCH}_3$)",
      "Benzamide",
      "Aniline"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "In the Beckmann rearrangement, the group that is anti (trans) to the leaving hydroxyl group migrates stereospecifically to the nitrogen atom. When the phenyl group is anti to $-\\text{OH}$, phenyl migration occurs to give acetanilide ($\\text{CH}_3\\text{CONHPh}$)."
  },
  {
    qNum: 130,
    topic: "Formation of Schiff's Base",
    question_text: "Benzaldehyde reacts with aniline in the presence of a trace of acid to form an azomethine (Schiff's base) known as benzalaniline. The structure is:",
    options: [
      "$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N}-\\text{C}_6\\text{H}_5$",
      "$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{NH}-\\text{C}_6\\text{H}_5$",
      "$\\text{C}_6\\text{H}_5-\\text{CONH}-\\text{C}_6\\text{H}_5$",
      "$\\text{C}_6\\text{H}_5-\\text{N}=\\text{N}-\\text{C}_6\\text{H}_5$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Reaction of an aromatic aldehyde with a primary aromatic amine in the presence of an acid catalyst involves nucleophilic addition-elimination of water to form a stable azomethine (Schiff's base / anil): $\\text{C}_6\\text{H}_5-\\text{CH}=\\text{N}-\\text{C}_6\\text{H}_5$."
  },
  {
    qNum: 131,
    topic: "Condensation of Acetone with Chloroform",
    question_text: "Acetone reacts with chloroform in the presence of solid potassium hydroxide ($\\text{KOH}$) to yield a hypnotic drug called:",
    options: [
      "Chloretone (1,1,1-trichloro-2-methylpropan-2-ol)",
      "Chloral",
      "Chloroformic ester",
      "Dichlor"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Deprotonation of chloroform by $\\text{KOH}$ yields the trichloromethyl carbanion ($^-\\text{CCl}_3$), which attacks the carbonyl carbon of acetone to produce 1,1,1-trichloro-2-methylpropan-2-ol, commonly called chloretone, used as a hypnotic and mild sedative."
  },
  {
    qNum: 132,
    topic: "Reaction of Formaldehyde with Ammonia",
    question_text: "Formaldehyde reacts with ammonia to form a hexacyclic crystalline solid known as urotropine. Its chemical formula is:",
    options: [
      "$(\\text{CH}_2)_6\\text{N}_4$ (Hexamethylenetetramine)",
      "$(\\text{CH}_2)_4\\text{N}_6$",
      "$(\\text{CH}_2)_3\\text{N}_3$",
      "$\\text{CH}_3\\text{NH}_2$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Formaldehyde reacts uniquely with ammonia via repeated additions and condensation to produce hexamethylenetetramine (urotropine, $(\\text{CH}_2)_6\\text{N}_4$), an adamantane-like cage molecule used medically as a urinary tract antiseptic and in the manufacture of the explosive RDX:\n$$6\\text{HCHO} + 4\\text{NH}_3 \\to (\\text{CH}_2)_6\\text{N}_4 + 6\\text{H}_2\\text{O}$$"
  },
  {
    qNum: 133,
    topic: "Thermal Behaviour of Alpha-Hydroxy Acids",
    question_text: "When an $\\alpha$-hydroxy acid such as lactic acid is heated, it undergoes bimolecular intermolecular esterification to yield a 6-membered cyclic diester called a:",
    options: [
      "Lactide",
      "Lactone",
      "Lactam",
      "Anhydride"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Two molecules of an $\\alpha$-hydroxy acid react by mutual esterification between the $-\\text{COOH}$ group of one molecule and the $-\\text{OH}$ group of the other, with loss of two molecules of water to form a 6-membered cyclic diester known as a lactide."
  },
  {
    qNum: 134,
    topic: "Thermal Behaviour of Beta-Hydroxy Acids",
    question_text: "When a $\\beta$-hydroxy acid such as 3-hydroxybutanoic acid is heated, it undergoes dehydration to produce:",
    options: [
      "An $\\alpha,\\beta$-unsaturated carboxylic acid (Crotonic acid)",
      "A $\\beta$-lactone",
      "A cyclic lactide",
      "An alkane"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "$\\beta$-hydroxy acids have acidic $\\alpha$-hydrogens adjacent to the carboxyl group. On heating, they eliminate water readily to yield stable, conjugated $\\alpha,\\beta$-unsaturated carboxylic acids (e.g. 3-hydroxybutanoic acid gives but-2-enoic acid, crotonic acid)."
  },
  {
    qNum: 135,
    topic: "Thermal Behaviour of Gamma- and Delta-Hydroxy Acids",
    question_text: "When a $\\gamma$-hydroxy acid or $\\delta$-hydroxy acid is heated, it undergoes spontaneous intramolecular esterification to form a cyclic ester known as a:",
    options: [
      "Lactone ($\\gamma$-lactone or $\\delta$-lactone)",
      "Lactide",
      "Lactam",
      "Cyclic ether"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "$\\gamma$- and $\\delta$-hydroxy acids readily undergo intramolecular esterification because 5- and 6-membered rings possess minimal angle and conformational strain. The resulting cyclic mono-esters are called lactones ($\\gamma$-lactones and $\\delta$-lactones)."
  },
  {
    qNum: 136,
    topic: "Thermal Decarboxylation of Oxalic and Malonic Acids",
    question_text: "Malonic acid (propanedioic acid) on heating above its melting point (150 °C) undergoes decarboxylation to give:",
    options: [
      "Ethanoic acid (Acetic acid) and $\\text{CO}_2$",
      "Methanoic acid and $\\text{CO}$",
      "Propanoic acid",
      "Succinic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Malonic acid contains two carboxyl groups attached to the same carbon atom (a 1,3-dicarboxylic acid). Heating at 150 °C causes smooth decarboxylation via a 6-membered cyclic transition state to yield acetic acid and carbon dioxide:\n$$\\text{HOOC}-\\text{CH}_2-\\text{COOH} \\xrightarrow{150^\\circ\\text{C}} \\text{CH}_3\\text{COOH} + \\text{CO}_2$$"
  },
  {
    qNum: 137,
    topic: "Mechanism and Catalyst of HVZ Reaction",
    question_text: "In the Hell-Volhard-Zelinsky (HVZ) reaction, red phosphorus is used along with bromine because:",
    options: [
      "It generates $\\text{PBr}_3$ in situ, which converts the carboxylic acid into an acyl bromide that enolises rapidly",
      "It acts as a reducing agent",
      "It absorbs $\\text{HBr}$ gas",
      "It prevents oxidation of the carboxyl group"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "Carboxylic acids themselves enolise very slowly. Red phosphorus reacts with $\\text{Br}_2$ to generate phosphorus tribromide ($\\text{PBr}_3$), which converts a small amount of acid into acyl bromide ($\\text{R-CH}_2\\text{COBr}$). Acyl bromides enolise thousands of times faster than free carboxylic acids, enabling rapid $\\alpha$-bromination. Exchange with another acid molecule regenerates the acyl bromide catalyst."
  },
  {
    qNum: 138,
    topic: "Decarboxylation of Benzoates",
    question_text: "Dry heating of sodium benzoate with soda-lime yields:",
    options: [
      "Benzene and $\\text{Na}_2\\text{CO}_3$",
      "Toluene",
      "Biphenyl",
      "Phenol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Heating sodium benzoate with soda-lime ($\\text{NaOH} + \\text{CaO}$) causes replacement of the carboxylate group by hydrogen, yielding benzene:\n$$\\text{C}_6\\text{H}_5\\text{COONa} + \\text{NaOH} \\xrightarrow{\\text{CaO}, \\Delta} \\text{C}_6\\text{H}_6 + \\text{Na}_2\\text{CO}_3$$"
  },
  {
    qNum: 139,
    topic: "Oxidation of Alkylbenzenes to Benzoic Acid",
    question_text: "Which of the following alkylbenzenes will NOT yield benzoic acid on prolonged refluxing with alkaline $\\text{KMnO}_4$ followed by acidification?",
    options: [
      "tert-Butylbenzene",
      "Toluene",
      "Ethylbenzene",
      "Isopropylbenzene"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Vigorous oxidation of an alkyl side chain to a carboxyl group requires the presence of at least one benzylic hydrogen atom ($-\\text{CH}<$). Toluene (3 benzylic H), ethylbenzene (2 benzylic H), and isopropylbenzene (1 benzylic H) all oxidise to benzoic acid. tert-Butylbenzene has a quaternary benzylic carbon with no benzylic hydrogen and is inert to alkaline $\\text{KMnO}_4$."
  },
  {
    qNum: 140,
    topic: "Distinguishing Tests for Aldehydes",
    question_text: "Which reagent can be used to distinguish between acetaldehyde (an aliphatic aldehyde) and benzaldehyde (an aromatic aldehyde)?",
    options: [
      "Fehling's solution (or Benedict's solution)",
      "Tollen's reagent",
      "2,4-Dinitrophenylhydrazine (2,4-DNP)",
      "Hydroxylamine"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Acetaldehyde (aliphatic) reduces Fehling's solution to give a red precipitate of cuprous oxide ($\\text{Cu}_2\\text{O}$), whereas benzaldehyde (aromatic) gives a negative Fehling's test. Both reduce Tollen's reagent and react with 2,4-DNP and hydroxylamine."
  },
  {
    qNum: 141,
    topic: "Cannizzaro Reaction of Formaldehyde",
    question_text: "When concentrated aqueous sodium hydroxide is added to formaldehyde at room temperature, it undergoes disproportionation according to the equation:\n\n$$2\\,\\text{HCHO} + \\text{NaOH} \\to \\text{Product}(s)$$\n\nThe products obtained are:",
    options: [
      "Methanol and Sodium formate",
      "Ethanol and Formic acid",
      "Formic acid and Hydrogen gas",
      "Sodium carbonate and Water"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "Formaldehyde lacks $\\alpha$-hydrogen atoms and undergoes the Cannizzaro reaction in concentrated alkali: one molecule is reduced to methanol ($\\text{CH}_3\\text{OH}$), and the other is oxidised to sodium formate ($\\text{HCOONa}$)."
  },
  {
    qNum: 142,
    topic: "Selenium Dioxide Oxidation of Ketones",
    question_text: "Oxidation of acetone with selenium dioxide ($\\text{SeO}_2$) yields:",
    options: [
      "Methylglyoxal (2-Oxopropanal, $\\text{CH}_3\\text{COCHO}$)",
      "Glyoxal",
      "Acetic acid",
      "Propionic acid"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "Selenium dioxide ($\\text{SeO}_2$) oxidises active methyl or methylene groups adjacent to a carbonyl group into an $\\alpha$-dicarbonyl compound. Oxidation of the methyl group of acetone yields methylglyoxal (pyruvaldehyde, $\\text{CH}_3\\text{COCHO}$)."
  },
  {
    qNum: 143,
    topic: "Baeyer-Villiger Oxidation of Acetophenone",
    question_text: "In the Baeyer-Villiger oxidation of acetophenone with peroxybenzoic acid:\n\n$$\\text{C}_6\\text{H}_5-\\text{CO}-\\text{CH}_3 + \\text{PhCO}_3\\text{H} \\to \\text{Product}$$\n\nThe major product is:",
    options: [
      "Phenyl acetate ($\\text{CH}_3\\text{COOC}_6\\text{H}_5$)",
      "Methyl benzoate ($\\text{C}_6\\text{H}_5\\text{COOCH}_3$)",
      "Benzoic acid",
      "Phenol"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "In Baeyer-Villiger oxidation, migratory aptitude determines which group migrates to the peroxy oxygen: $\\text{tertiary alkyl} > \\text{cyclohexyl} > \\text{secondary alkyl} > \\text{benzyl} > \\text{phenyl} > \\text{primary alkyl} > \\text{methyl}$. Since phenyl has a much higher migratory aptitude than methyl, the phenyl group migrates with retention of configuration to form phenyl acetate ($\\text{CH}_3\\text{COOC}_6\\text{H}_5$)."
  },
  {
    qNum: 144,
    topic: "Perkin Reaction for Cinnamic Acid",
    question_text: "Cinnamic acid (3-phenylprop-2-enoic acid) is synthesised by heating benzaldehyde with acetic anhydride in the presence of sodium acetate. This reaction is known as the:",
    options: [
      "Perkin reaction",
      "Claisen condensation",
      "Knoevenagel condensation",
      "Reformatsky reaction"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "The condensation of an aromatic aldehyde with an aliphatic acid anhydride in the presence of the corresponding sodium carboxylate to yield an $\\alpha,\\beta$-unsaturated carboxylic acid is the Perkin reaction:\n$$\\text{C}_6\\text{H}_5\\text{CHO} + (\\text{CH}_3\\text{CO})_2\\text{O} \\xrightarrow{\\text{CH}_3\\text{COONa}, \\Delta} \\text{C}_6\\text{H}_5-\\text{CH}=\\text{CH}-\\text{COOH} + \\text{CH}_3\\text{COOH}$$"
  }
];

