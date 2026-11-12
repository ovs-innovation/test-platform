import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_diagram_urls.json', 'utf8'));

export const alcoholsPart3 = [
  {
    question_number: 53,
    exam_tag: "AIPMT 2005",
    question_text: "Which one of the following compounds is most acidic?",
    option_a: "$\\text{Cl}-\\text{CH}_2-\\text{CH}_2-\\text{OH}$",
    option_b: "Cyclohexanol",
    option_c: "p-Nitrophenol",
    option_d: "p-Cresol",
    correct_option: "C",
    solution: "Phenols are much more acidic than aliphatic alcohols due to resonance stabilization of the phenoxide ion. In p-nitrophenol, the strongly electron-withdrawing nitro group ($-\\text{NO}_2$) at the para-position further stabilizes the phenoxide ion through powerful $-M$ and $-I$ effects, making it the most acidic among the given compounds."
  },
  {
    question_number: 54,
    exam_tag: "AIPMT 2004",
    question_text: "Which one of the following will not form a yellow precipitate on heating with an alkaline solution of iodine?",
    option_a: "$\\text{CH}_3\\text{CH(OH)}\\text{CH}_3$",
    option_b: "$\\text{CH}_3\\text{CH}_2\\text{CH(OH)}\\text{CH}_3$",
    option_c: "$\\text{CH}_3\\text{OH}$",
    option_d: "$\\text{CH}_3\\text{CH}_2\\text{OH}$",
    correct_option: "C",
    solution: "The iodoform test gives a yellow precipitate of $\\text{CHI}_3$ with compounds containing a $\\text{CH}_3-\\text{CH(OH)}-$ or $\\text{CH}_3-\\text{CO}-$ group. Propan-2-ol (A), butan-2-ol (B), and ethanol (D) all possess this grouping and yield a positive test. Methanol ($\\text{CH}_3\\text{OH}$, C) lacks this group and gives a negative test."
  },
  {
    question_number: 55,
    exam_tag: "AIPMT 2002",
    question_text: "n-propyl alcohol and isopropyl alcohol can be chemically distinguished by which reagent",
    option_a: "$\\text{PCl}_5$",
    option_b: "reduction",
    option_c: "oxidation with potassium dichromate",
    option_d: "ozonolysis",
    correct_option: "C",
    solution: "n-Propyl alcohol ($1^\\circ$) on oxidation with acidified potassium dichromate ($\\text{K}_2\\text{Cr}_2\\text{O}_7$) yields propanal and then propanoic acid, which does not give the iodoform test. In contrast, isopropyl alcohol ($2^\\circ$) oxidizes to propanone (acetone), which contains a $\\text{CH}_3\\text{CO}-$ group and readily gives a yellow precipitate with iodine and $\\text{NaOH}$ (iodoform test)."
  },
  {
    question_number: 56,
    exam_tag: "AIPMT 2002",
    question_text: "When phenol is treated with $\\text{CHCl}_3$ and NaOH, the product formed is",
    option_a: "benzaldehyde",
    option_b: "salicylaldehyde",
    option_c: "salicylic acid",
    option_d: "benzoic acid",
    correct_option: "B",
    solution: "Treatment of phenol with chloroform ($\\text{CHCl}_3$) in the presence of sodium hydroxide (Reimer-Tiemann reaction) introduces an ortho-formyl group, producing salicylaldehyde (2-hydroxybenzaldehyde) as the main product."
  },
  {
    question_number: 57,
    exam_tag: "AIPMT 2001",
    question_text: "Which of the following is correct?",
    option_a: "On reduction, any aldehyde gives secondary alcohol.",
    option_b: "Reaction of vegetable oil with $\\text{H}_2\\text{SO}_4$ gives glycerine.",
    option_c: "Alcoholic iodine with NaOH gives iodoform.",
    option_d: "Sucrose on reaction with NaCl gives invert sugar.",
    correct_option: "C",
    solution: "A solution of iodine in presence of alkali ($\\text{NaOH}$) forms sodium hypoiodite ($\\text{NaOI}$), which oxidizes and iodinates ethanol or other methyl carbinols/ketones to yield iodoform ($\\text{CHI}_3$). Aldehydes upon reduction yield primary alcohols, not secondary alcohols."
  },
  {
    question_number: 58,
    exam_tag: "AIPMT 2000",
    question_text: "The ionization constant of phenol is higher than that of ethanol because",
    option_a: "phenoxide ion is bulkier than ethoxide",
    option_b: "phenoxide ion is stronger base than ethoxide",
    option_c: "phenoxide ion is stabilized through delocalization",
    option_d: "phenoxide ion is less stable than ethoxide",
    correct_option: "C",
    solution: "In the phenoxide ion, the negative charge on the oxygen atom is delocalized over the ortho and para positions of the aromatic ring through resonance. In contrast, in the ethoxide ion ($\\text{C}_2\\text{H}_5\\text{O}^-$), the negative charge is localized on oxygen and further destabilized by the $+I$ inductive effect of the ethyl group. Hence, phenol ionizes much more readily than ethanol."
  },
  {
    question_number: 59,
    exam_tag: "AIPMT 1999",
    question_text: "Ethyl chloride is converted into diethyl ether by",
    option_a: "Wurtz synthesis",
    option_b: "Grignard reaction",
    option_c: "Perkin's reaction",
    option_d: "Williamson's synthesis",
    correct_option: "D",
    solution: "Reaction of ethyl chloride with sodium ethoxide yields diethyl ether:\n$$\\text{CH}_3\\text{CH}_2\\text{Cl} + \\text{CH}_3\\text{CH}_2\\text{ONa} \\to \\text{CH}_3\\text{CH}_2\\text{OCH}_2\\text{CH}_3 + \\text{NaCl}$$\nThis method is known as Williamson's synthesis."
  },
  {
    question_number: 60,
    exam_tag: "AIPMT 1998",
    question_text: "Which one of the following compounds is resistant to nucleophilic attack by hydroxyl ions?",
    option_a: "Methyl acetate",
    option_b: "Acetonitrile",
    option_c: "Dimethyl ether",
    option_d: "Acetamide",
    correct_option: "C",
    solution: "Ethers lack an electrophilic carbonyl carbon and alkoxide ions are poor leaving groups. Therefore, dialkyl ethers like dimethyl ether are stable and resistant to nucleophilic attack by hydroxyl ions ($\\text{OH}^-$). Esters, nitriles, and amides readily undergo nucleophilic attack at their carbonyl or cyanide carbon atoms."
  },
  {
    question_number: 61,
    exam_tag: "AIPMT 1998",
    question_text: "Reaction of ethylene oxide with RMgX leads to formation of",
    image_url: urls.q61_diag || "",
    option_a: "$\\text{RCH(OH)R}$",
    option_b: "$\\text{RCH(OH)}\\text{CH}_3$",
    option_c: "$\\text{RCH}_2\\text{CH}_2\\text{OH}$",
    option_d: "$\\text{R}_2\\text{CHCH}_2\\text{OH}$",
    correct_option: "C",
    solution: "Ethylene oxide (oxirane) reacts with a Grignard reagent ($\\text{RMgX}$) via ring opening initiated by nucleophilic attack of the carbanion $\\text{R}^-$ on one of the ring carbon atoms, forming $\\text{R}-\\text{CH}_2\\text{CH}_2\\text{OMgX}$. Subsequent acid hydrolysis produces a primary alcohol with two additional carbon atoms: $\\text{R}-\\text{CH}_2\\text{CH}_2\\text{OH}$."
  },
  {
    question_number: 62,
    exam_tag: "AIPMT 1995",
    question_text: "When 3,3-dimethyl-2-butanol is heated with $\\text{H}_2\\text{SO}_4$, the major product obtained is",
    option_a: "2,3-dimethyl-2-butene",
    option_b: "cis and trans isomers of 2,3-dimethyl-2-butene",
    option_c: "2,3-dimethyl-1-butene",
    option_d: "3,3-dimethyl-1-butene",
    correct_option: "A",
    solution: "1. Dehydration of 3,3-dimethyl-2-butanol initially generates a secondary carbocation: $(\\text{CH}_3)_3\\text{C}-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_3$.\n2. A 1,2-methyl shift rapidly occurs to produce the more stable tertiary carbocation: $(\\text{CH}_3)_2\\overset{+}{\\text{C}}-\\text{CH}(\\text{CH}_3)_2$.\n3. Elimination of a proton from the adjacent carbon gives the most substituted, highly stable alkene: 2,3-dimethyl-2-butene (tetrasubstituted alkene, Saytzeff product)."
  },
  {
    question_number: 63,
    exam_tag: "AIPMT 1994",
    question_text: "On heating glycerol with conc. $\\text{H}_2\\text{SO}_4$, a compound is obtained which has bad odour. The compound is",
    option_a: "acrolein",
    option_b: "formic acid",
    option_c: "allyl alcohol",
    option_d: "glycerol sulphate",
    correct_option: "A",
    solution: "Heating glycerol with dehydrating agents like concentrated $\\text{H}_2\\text{SO}_4$ or $\\text{KHSO}_4$ results in loss of two molecules of water to produce acrolein (propenal, $\\text{CH}_2=\\text{CH}-\\text{CHO}$), an unsaturated aldehyde characterized by a pungent, irritating odour."
  },
  {
    question_number: 64,
    exam_tag: "AIPMT 1994",
    question_text: "The compound which does not react with sodium is",
    image_url: urls.q64_diag || "",
    option_a: "$\\text{CH}_3\\text{COOH}$",
    option_b: "$\\text{CH}_3\\text{CH(OH)}\\text{CH}_3$",
    option_c: "$\\text{C}_2\\text{H}_5\\text{OH}$",
    option_d: "$\\text{CH}_3\\text{OCH}_3$",
    correct_option: "D",
    solution: "Sodium reacts vigorously with compounds containing active (acidic) hydrogen attached to oxygen (such as carboxylic acids and alcohols) to evolve hydrogen gas. Dimethyl ether ($\\text{CH}_3\\text{OCH}_3$) has no acidic hydrogen atom and does not react with sodium."
  },
  {
    question_number: 65,
    exam_tag: "AIPMT 1993",
    question_text: "Ethanol and dimethyl ether form a pair of functional isomers. The boiling point of ethanol is higher than that of dimethyl ether, due to the presence of",
    option_a: "H-bonding in ethanol",
    option_b: "H-bonding in dimethyl ether",
    option_c: "$\\text{CH}_3$ group in ethanol",
    option_d: "$\\text{CH}_3$ group in dimethyl ether",
    correct_option: "A",
    solution: "Ethanol molecules are associated through strong intermolecular hydrogen bonding due to the highly polar $\\text{O}-\\text{H}$ group. Dimethyl ether molecules have no hydrogen attached directly to oxygen and can only interact via weaker dipole-dipole attractions. Hence, ethanol has a much higher boiling point ($78^\\circ\\text{C}$ vs $-24^\\circ\\text{C}$)."
  },
  {
    question_number: 66,
    exam_tag: "AIPMT 1993",
    question_text: "Increasing order of acid strength among p-methoxyphenol, p-methylphenol and p-nitrophenol is",
    option_a: "p-nitrophenol, p-methoxyphenol, p-methylphenol",
    option_b: "p-methylphenol, p-methoxyphenol, p-nitrophenol",
    option_c: "p-nitrophenol, p-methylphenol, p-methoxyphenol",
    option_d: "p-methoxyphenol, p-methylphenol, p-nitrophenol",
    correct_option: "D",
    solution: "- The methoxy group ($-\\text{OCH}_3$) exerts a strong $+M$ resonance electron-donating effect at the para position, destabilizing the phenoxide ion and reducing acidity most.\n- The methyl group ($-\\text{CH}_3$) is weakly electron-donating by inductive ($+I$) and hyperconjugative effects.\n- The nitro group ($-\\text{NO}_2$) is strongly electron-withdrawing by $-M$ and $-I$ effects, greatly enhancing acidity.\nTherefore, the increasing order of acid strength is: p-methoxyphenol < p-methylphenol < p-nitrophenol."
  },
  {
    question_number: 67,
    exam_tag: "AIPMT 1993",
    question_text: "Which one of the following on oxidation gives a ketone?",
    option_a: "Primary alcohol",
    option_b: "Secondary alcohol",
    option_c: "Tertiary alcohol",
    option_d: "All of these",
    correct_option: "B",
    solution: "Controlled oxidation of a secondary alcohol ($\\text{R}-\\text{CH(OH)}-\\text{R}'$) removes two hydrogen atoms to yield a ketone ($\\text{R}-\\text{CO}-\\text{R}'$). Primary alcohols oxidize to aldehydes and then carboxylic acids, while tertiary alcohols resist oxidation under neutral or basic conditions."
  },
  {
    question_number: 68,
    exam_tag: "AIPMT 1993",
    question_text: "What is formed when a primary alcohol undergoes catalytic dehydrogenation?",
    option_a: "Aldehyde",
    option_b: "Ketone",
    option_c: "Alkene",
    option_d: "Acid",
    correct_option: "A",
    solution: "When vapours of a primary alcohol are passed over heated copper catalyst at $573\\text{ K}$, dehydrogenation occurs to form an aldehyde:\n$$\\text{R}-\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Cu}, 573\\text{ K}} \\text{R}-\\text{CHO} + \\text{H}_2$$"
  },
  {
    question_number: 69,
    exam_tag: "AIPMT 1992",
    question_text: "Methanol is industrially prepared by",
    option_a: "oxidation of $\\text{CH}_4$ by steam at 900°C",
    option_b: "reduction of $\\text{HCHO}$ using $\\text{LiAlH}_4$",
    option_c: "reaction $\\text{HCHO}$ with a solution of $\\text{NaOH}$",
    option_d: "reduction of CO using $\\text{H}_2$ and $\\text{ZnO}-\\text{Cr}_2\\text{O}_3$",
    correct_option: "D",
    solution: "Industrially, methanol (wood spirit) is synthesized by catalytic hydrogenation of carbon monoxide in the presence of $\\text{ZnO}-\\text{Cr}_2\\text{O}_3$ catalyst at $200-300\\text{ atm}$ pressure and $573-673\\text{ K}$:\n$$\\text{CO} + 2\\text{H}_2 \\xrightarrow[573-673\\text{ K}, 200-300\\text{ atm}]{\\text{ZnO}-\\text{Cr}_2\\text{O}_3} \\text{CH}_3\\text{OH}$$"
  },
  {
    question_number: 70,
    exam_tag: "AIPMT 1992",
    question_text: "HBr reacts fastest with",
    option_a: "2-methylpropan-1-ol",
    option_b: "2-methylpropan-2-ol",
    option_c: "propan-2-ol",
    option_d: "propan-1-ol",
    correct_option: "B",
    solution: "The reaction of alcohols with halogen acids proceeds via the formation of a carbocation intermediate ($S_N1$). The order of reactivity of alcohols follows carbocation stability: $3^\\circ > 2^\\circ > 1^\\circ$. 2-Methylpropan-2-ol (tert-butyl alcohol) forms a stable tertiary carbocation and therefore reacts fastest with $\\text{HBr}$."
  },
  {
    question_number: 71,
    exam_tag: "AIPMT 1992",
    question_text: "When phenol is treated with excess bromine water, it gives",
    option_a: "m-bromophenol",
    option_b: "o- and p-bromophenols",
    option_c: "2,4-dibromophenol",
    option_d: "2,4,6-tribromophenol",
    correct_option: "D",
    solution: "In aqueous solution, phenol strongly ionizes to the phenoxide ion, which activates the aromatic ring to a very high degree. With bromine water, electrophilic aromatic substitution occurs rapidly at all available ortho and para positions, yielding a white precipitate of 2,4,6-tribromophenol."
  },
  {
    question_number: 72,
    exam_tag: "AIPMT 1989",
    question_text: "The compound which reacts fastest with Lucas reagent at room temperature is",
    option_a: "butan-1-ol",
    option_b: "butan-2-ol",
    option_c: "2-methylpropan-1-ol",
    option_d: "2-methylpropan-2-ol",
    correct_option: "D",
    solution: "Lucas reagent (conc. $\\text{HCl} + \\text{anh. ZnCl}_2$) reacts with tertiary alcohols immediately at room temperature to form an insoluble layer/cloudiness of alkyl chloride. 2-methylpropan-2-ol is a tertiary alcohol ($3^\\circ$) and reacts fastest."
  },
  {
    question_number: 73,
    exam_tag: "AIPMT 1989",
    question_text: "Which one of the following compounds will be most readily attacked by an electrophile?",
    option_a: "Chlorobenzene",
    option_b: "Benzene",
    option_c: "Phenol",
    option_d: "Toluene",
    correct_option: "C",
    solution: "The hydroxyl group ($-OH$) in phenol has lone pairs that participate in $+M$ resonance delocalization, substantially increasing the electron density on the aromatic ring (especially at ortho and para positions). This makes phenol far more nucleophilic and receptive to electrophilic attack than benzene, toluene (weak $+I$ and hyperconjugation), or chlorobenzene (deactivated by $-I$ effect)."
  },
  {
    question_number: 74,
    exam_tag: "AIPMT 1989",
    question_text: "Propene, $\\text{CH}_3\\text{CH}=\\text{CH}_2$, can be converted into 1-propanol by oxidation. Indicate which set of reagents amongst the following is ideal for the above conversion?",
    option_a: "$\\text{KMnO}_4$ (alkaline)",
    option_b: "Osmium tetroxide ($\\text{OsO}_4/\\text{CH}_2\\text{Cl}_2$)",
    option_c: "$\\text{B}_2\\text{H}_6$ and alk. $\\text{H}_2\\text{O}_2$",
    option_d: "$\\text{O}_3/\\text{Zn}$",
    correct_option: "C",
    solution: "Hydroboration-oxidation using diborane ($\\text{B}_2\\text{H}_6$ or $\\text{BH}_3\\cdot\\text{THF}$) followed by alkaline hydrogen peroxide ($\\text{H}_2\\text{O}_2/\\text{OH}^-$) yields an anti-Markovnikov addition of water across the alkene double bond, converting propene cleanly into propan-1-ol."
  },
  {
    question_number: 75,
    exam_tag: "AIPMT 1989",
    question_text: "Phenol is heated with $\\text{CHCl}_3$ and aqueous KOH when salicylaldehyde is produced. This reaction is known as",
    option_a: "Rosenmund's reaction",
    option_b: "Reimer-Tiemann reaction",
    option_c: "Friedel-Crafts reaction",
    option_d: "Sommelet reaction",
    correct_option: "B",
    solution: "The formylation of phenol with chloroform in the presence of alkali (such as aqueous $\\text{KOH}$ or $\\text{NaOH}$) to yield salicylaldehyde is the Reimer-Tiemann reaction."
  },
  {
    question_number: 76,
    exam_tag: "AIPMT 1988",
    question_text: "Which one is formed when sodium phenoxide is heated with ethyl iodide?",
    option_a: "Phenetole",
    option_b: "Ethyl phenyl alcohol",
    option_c: "Phenol",
    option_d: "None of these",
    correct_option: "A",
    solution: "Sodium phenoxide undergoes Williamson ether synthesis with ethyl iodide to yield ethyl phenyl ether (phenetole):\n$$\\text{C}_6\\text{H}_5\\text{ONa} + \\text{C}_2\\text{H}_5\\text{I} \\xrightarrow{\\Delta} \\text{C}_6\\text{H}_5-\\text{O}-\\text{C}_2\\text{H}_5 + \\text{NaI}$$"
  },
  {
    question_number: 77,
    exam_tag: "AIPMT 1988",
    question_text: "Phenol is heated with $\\text{CHCl}_3$ and aqueous KOH when salicylaldehyde is produced. This reaction is known as",
    option_a: "Rosenmund's reaction",
    option_b: "Reimer-Tiemann reaction",
    option_c: "Friedel-Crafts reaction",
    option_d: "Sommelet reaction",
    correct_option: "B",
    solution: "The conversion of phenol to salicylaldehyde by heating with chloroform and aqueous $\\text{KOH}$ is the Reimer-Tiemann reaction."
  },
  {
    question_number: 78,
    exam_tag: "AIPMT 1988",
    question_text: "Lucas reagent is",
    option_a: "conc. HCl and anhydrous $\\text{ZnCl}_2$",
    option_b: "conc. $\\text{HNO}_3$ and hydrous $\\text{ZnCl}_2$",
    option_c: "conc. HCl and hydrous $\\text{ZnCl}_2$",
    option_d: "conc. $\\text{HNO}_3$ and anhydrous $\\text{ZnCl}_2$",
    correct_option: "A",
    solution: "Lucas reagent is an equimolar mixture of concentrated hydrochloric acid ($\\text{HCl}$) and anhydrous zinc chloride ($\\text{ZnCl}_2$), used to classify alcohols into primary, secondary, and tertiary based on the rate of alkyl chloride formation."
  }
];

