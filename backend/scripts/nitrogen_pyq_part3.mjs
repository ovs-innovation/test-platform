import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('./backend/scripts/nitrogen_diagram_urls.json', 'utf8'));

export const nitrogenPart3 = [
  {
    question_number: 53,
    exam_tag: "AIPMT 2009",
    question_text: "Nitrobenzene can be prepared from benzene by using a mixture of conc. $\\text{HNO}_3$ and conc. $\\text{H}_2\\text{SO}_4$. In the mixture, nitric acid acts as a/an",
    option_a: "acid",
    option_b: "base",
    option_c: "catalyst",
    option_d: "reducing agent",
    correct_option: "B",
    solution: "Sulfuric acid is a stronger acid than nitric acid. In the nitrating mixture, sulfuric acid protonates nitric acid, causing it to accept a proton (acting as a Brønsted-Lowry base) and generate the nitronium ion ($\\text{NO}_2^+$) electrophile:\n$$\\text{HNO}_3 + 2\\text{H}_2\\text{SO}_4 \\rightleftharpoons \\text{NO}_2^+ + \\text{H}_3\\text{O}^+ + 2\\text{HSO}_4^-$$"
  },
  {
    question_number: 54,
    exam_tag: "AIPMT 2009",
    question_text: "Predict the product:\n$$\\text{C}_6\\text{H}_5\\text{NHCH}_3 + \\text{NaNO}_2 + \\text{HCl} \\to \\text{Product}$$",
    image_url: urls.q54_diag || "",
    option_a: "N-methyl-N-nitroaniline",
    option_b: "p-nitroso-N-methylaniline",
    option_c: "N-hydroxy-N-methylaniline",
    option_d: "N-methyl-N-nitrosoaniline",
    correct_option: "D",
    solution: "Secondary amines (both aliphatic and aromatic like N-methylaniline) react with nitrous acid ($\\text{NaNO}_2 + \\text{HCl}$) via electrophilic nitrosation on the secondary nitrogen atom to form N-nitrosoamines: N-methyl-N-nitrosoaniline, $\\text{C}_6\\text{H}_5-\\text{N}(\\text{CH}_3)-\\text{N}=\\text{O}$, which separates as a yellow oily liquid."
  },
  {
    question_number: 55,
    exam_tag: "AIPMT 2008",
    question_text: "In a reaction of aniline a coloured product C was obtained:\n$$\\text{Aniline} \\xrightarrow{\\text{NaNO}_2/\\text{HCl}} B \\xrightarrow[\\text{cold}]{\\text{N,N-dimethylaniline}} C$$\nThe structure of C would be",
    image_url: urls.q55_diag || "",
    option_a: "1,2-diphenylhydrazine derivative",
    option_b: "$\\text{C}_6\\text{H}_5-\\text{N}=\\text{N}-\\text{C}_6\\text{H}_4-\\text{N}(\\text{CH}_3)_2$",
    option_c: "$\\text{C}_6\\text{H}_5-\\text{N}=\\text{N}-\\text{CH}_2-\\text{N}(\\text{CH}_3)\\text{C}_6\\text{H}_5$",
    option_d: "2-(dimethylamino)azobenzene",
    correct_option: "B",
    solution: "Diazotization of aniline yields benzenediazonium chloride ($B$). Coupling with N,N-dimethylaniline in mildly acidic solution occurs exclusively at the activated para position to give p-(dimethylamino)azobenzene ($C$), a yellow-coloured azo dye."
  },
  {
    question_number: 56,
    exam_tag: "AIPMT 2007",
    question_text: "Which one of the following on reduction with lithium aluminium hydride yields a secondary amine?",
    option_a: "Methyl isocyanide",
    option_b: "Acetamide",
    option_c: "Methyl cyanide",
    option_d: "Nitroethane",
    correct_option: "A",
    solution: "Reduction of isocyanides (carbylamines) with $\\text{LiAlH}_4$ reduces the $-N\\equiv C$ group to a secondary amine:\n$$\\text{CH}_3-\\text{N}\\equiv\\text{C} + 4[\\text{H}] \\xrightarrow{\\text{LiAlH}_4} \\text{CH}_3-\\text{NH}-\\text{CH}_3 \\text{ (dimethylamine)}$$\nNitriles, primary amides, and nitroalkanes reduce to primary amines."
  },
  {
    question_number: 57,
    exam_tag: "AIPMT 2006",
    question_text: "Which of the following is more basic than aniline?",
    option_a: "Benzylamine",
    option_b: "Diphenylamine",
    option_c: "Triphenylamine",
    option_d: "p-Nitroaniline",
    correct_option: "A",
    solution: "In benzylamine ($\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$), the $-\\text{NH}_2$ group is attached to an $sp^3$ hybridized aliphatic carbon. The lone pair of electrons on nitrogen is fully localized and available for protonation ($pK_b \\approx 4.70$). In aniline, diphenylamine, triphenylamine, and p-nitroaniline, the lone pair participates in resonance delocalization into one or more aromatic rings, markedly decreasing basicity ($pK_b > 9$)."
  },
  {
    question_number: 58,
    exam_tag: "AIPMT 2005",
    question_text: "Electrolytic reduction of nitrobenzene in weakly acidic medium gives",
    option_a: "N-phenylhydroxylamine",
    option_b: "nitrosobenzene",
    option_c: "aniline",
    option_d: "p-hydroxyaniline",
    correct_option: "C",
    solution: "Electrolytic reduction of nitrobenzene depends strongly on the acidity of the medium:\n- In weakly acidic medium, reduction proceeds completely through nitrosobenzene and phenylhydroxylamine to yield aniline ($\\text{C}_6\\text{H}_5\\text{NH}_2$).\n- In strongly acidic medium, phenylhydroxylamine rearranges to p-aminophenol."
  },
  {
    question_number: 59,
    exam_tag: "AIPMT 2005",
    question_text: "Aniline in a set of reactions yielded a product D:\n$$\\text{Aniline} \\xrightarrow{\\text{NaNO}_2/\\text{HCl}} A \\xrightarrow{\\text{CuCN}} B \\xrightarrow{\\text{H}_2/\\text{Ni}} C \\xrightarrow{\\text{HNO}_2} D$$\nThe structure of the product D would be",
    image_url: urls.q59_diag || "",
    option_a: "$\\text{C}_6\\text{H}_5\\text{NHOH}$",
    option_b: "$\\text{C}_6\\text{H}_5\\text{NHCH}_2\\text{CH}_3$",
    option_c: "$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$",
    option_d: "$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$",
    correct_option: "D",
    solution: "1. $\\text{Aniline} \\xrightarrow{\\text{NaNO}_2/\\text{HCl}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-$ ($A$, benzenediazonium chloride).\n2. $\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- \\xrightarrow{\\text{CuCN}} \\text{C}_6\\text{H}_5\\text{CN}$ ($B$, benzonitrile).\n3. Reduction with $\\text{H}_2/\\text{Ni}$: $\\text{C}_6\\text{H}_5\\text{CN} \\to \\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$ ($C$, benzylamine).\n4. Reaction with $\\text{HNO}_2$: Benzylamine decomposes to benzyl alcohol, $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$ ($D$)."
  },
  {
    question_number: 60,
    exam_tag: "AIPMT 2004",
    question_text: "In a reaction of aniline a coloured product C was obtained:\n$$\\text{Aniline} \\xrightarrow{\\text{NaNO}_2/\\text{HCl}} B \\xrightarrow[\\text{cold}]{\\text{N,N-dimethylaniline}} C$$\nThe structure of C would be",
    image_url: urls.q60_diag || "",
    option_a: "Hydrazobenzene derivative",
    option_b: "$\\text{C}_6\\text{H}_5-\\text{N}=\\text{N}-\\text{C}_6\\text{H}_4-\\text{N}(\\text{CH}_3)_2$",
    option_c: "Alkyl-linked diazo compound",
    option_d: "Ortho-coupled azo derivative",
    correct_option: "B",
    solution: "Benzenediazonium chloride couples with N,N-dimethylaniline at the position para to the dimethylamino group to yield butter yellow (p-dimethylaminoazobenzene), an azo dye."
  },
  {
    question_number: 61,
    exam_tag: "AIPMT 2003",
    question_text: "The final product C, obtained in this reaction:\n$$\\text{p-toluidine} \\xrightarrow{\\text{Ac}_2\\text{O}} A \\xrightarrow{\\text{Br}_2/\\text{CH}_3\\text{COOH}} B \\xrightarrow{\\text{H}_2\\text{O}/\\text{H}^+} C$$\nwould be",
    image_url: urls.q61_diag || "",
    option_a: "2-acetyl-4-methylaniline",
    option_b: "4-methylbenzoyl chloride derivative",
    option_c: "2-bromo-4-methylaniline",
    option_d: "2-bromo-4-methylacetanilide",
    correct_option: "C",
    solution: "1. Acetylation of 4-methylaniline with $\\text{Ac}_2\\text{O}$ protects the $-\\text{NH}_2$ group as an acetamido group ($-\\text{NHCOCH}_3$, $A$).\n2. Monobromination occurs ortho to the activating $-\\text{NHCOCH}_3$ group (position 2), giving 2-bromo-4-methylacetanilide ($B$).\n3. Acidic hydrolysis cleaves the protecting acetyl group, yielding 2-bromo-4-methylaniline ($C$)."
  },
  {
    question_number: 62,
    exam_tag: "AIPMT 2002",
    question_text: "Product 'P' in the following reaction is:\n$$\\text{m-methoxybenzonitrile} + \\text{CH}_3\\text{MgBr} \\xrightarrow{\\text{H}_3\\text{O}^+} P$$",
    image_url: urls.q62_diag || "",
    option_a: "1-(3-methoxyphenyl)ethanol",
    option_b: "3-methoxyacetophenone",
    option_c: "3-methoxybenzaldehyde",
    option_d: "3-methoxybenzoic acid",
    correct_option: "B",
    solution: "Nucleophilic addition of methylmagnesium bromide to the nitrile group ($-C\\equiv N$) of m-methoxybenzonitrile yields an imine magnesium adduct. Subsequent acidic hydrolysis decomposes the imine to give the corresponding methyl ketone: 3-methoxyacetophenone ($\\text{m-CH}_3\\text{O}-\\text{C}_6\\text{H}_4-\\text{COCH}_3$)."
  },
  {
    question_number: 63,
    exam_tag: "AIPMT 2001",
    question_text: "Intermediates formed during reaction of $\\text{RCONH}_2$ with $\\text{Br}_2$ and $\\text{KOH}$ are",
    image_url: urls.q63_diag || "",
    option_a: "$\\text{RCONHBr}$ and $\\text{RNCO}$",
    option_b: "$\\text{RNHCOBr}$ and $\\text{RNCO}$",
    option_c: "$\\text{RNH}-\\text{Br}$ and $\\text{RCONHBr}$",
    option_d: "$\\text{RCONBr}_2$",
    correct_option: "A",
    solution: "In the mechanism of the Hofmann bromamide reaction, the primary amide reacts with hypobromite to form N-bromoamide ($\\text{RCONHBr}$). Base abstraction of the nitrogen proton triggers rearrangement (with migration of the alkyl group $\\text{R}$ to nitrogen) to yield an alkyl isocyanate ($\\text{R}-\\text{N}=\\text{C}=\\text{O}$ or $\\text{RNCO}$). Hydrolysis of the isocyanate yields the primary amine."
  },
  {
    question_number: 64,
    exam_tag: "AIPMT 2000",
    question_text: "In the sequence:\n$$A \\xrightarrow{\\text{reduction}} B \\xrightarrow{\\text{CHCl}_3/\\text{KOH}} C \\xrightarrow{\\text{reduction}} N\\text{-methylaniline}$$\nthen A is",
    image_url: urls.q64_diag || "",
    option_a: "Aniline",
    option_b: "Nitrobenzene",
    option_c: "$\\text{CH}_3\\text{NH}_2$",
    option_d: "Benzonitrile",
    correct_option: "B",
    solution: "1. Reduction of compound $C$ gives N-methylaniline ($\\text{C}_6\\text{H}_5\\text{NHCH}_3$), so $C$ must be phenyl isocyanide ($\\text{C}_6\\text{H}_5\\text{NC}$).\n2. Phenyl isocyanide is formed by carbylamine reaction of aniline ($B = \\text{C}_6\\text{H}_5\\text{NH}_2$) with $\\text{CHCl}_3/\\text{KOH}$.\n3. Aniline is obtained by reduction of nitrobenzene ($A = \\text{C}_6\\text{H}_5\\text{NO}_2$).\nHence, $A$ is nitrobenzene."
  },
  {
    question_number: 65,
    exam_tag: "AIPMT 1999",
    question_text: "Amides can be converted into amines by a reaction named after",
    option_a: "Perkin",
    option_b: "Claisen",
    option_c: "Hofmann",
    option_d: "Kekule",
    correct_option: "C",
    solution: "The conversion of primary amides into primary amines containing one less carbon atom using bromine and an aqueous/ethanolic alkali is named after August Wilhelm von Hofmann (Hofmann bromamide degradation)."
  },
  {
    question_number: 66,
    exam_tag: "AIPMT 1999",
    question_text: "Phenyl isocyanides are prepared from which of the following reaction?",
    option_a: "Rosenmund's reaction",
    option_b: "Carbylamine reaction",
    option_c: "Reimer-Tiemann reaction",
    option_d: "Wurtz reaction",
    correct_option: "B",
    solution: "Heating aniline (primary aromatic amine) with chloroform and alcoholic potassium hydroxide gives phenyl isocyanide (phenyl carbylamine):\n$$\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\to \\text{C}_6\\text{H}_5\\text{NC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}$$\nThis reaction is the Carbylamine reaction."
  },
  {
    question_number: 67,
    exam_tag: "AIPMT 1998",
    question_text: "Aniline is reacted with bromine water and the resulting product is treated with an aqueous solution of sodium nitrite in presence of dilute hydrochloric acid. The compound so formed is converted to a tetrafluoroborate which is subsequently heated. The final product is",
    option_a: "1, 3, 5-tribromobenzene",
    option_b: "p-bromofluorobenzene",
    option_c: "p-bromoaniline",
    option_d: "2, 4, 6-tribromofluorobenzene",
    correct_option: "D",
    solution: "1. Aniline reacts with bromine water to give 2,4,6-tribromoaniline.\n2. Diazotization with $\\text{NaNO}_2 + \\text{HCl}$ converts it to 2,4,6-tribromobenzenediazonium chloride.\n3. Addition of fluoroboric acid ($\\text{HBF}_4$) precipitates 2,4,6-tribromobenzenediazonium tetrafluoroborate.\n4. Gentle thermal decomposition (Balz-Schiemann reaction) yields 2,4,6-tribromofluorobenzene."
  },
  {
    question_number: 68,
    exam_tag: "AIPMT 1997",
    question_text: "The compound obtained by heating a mixture of ethyl amine and chloroform with ethanolic potassium hydroxide (KOH) is",
    option_a: "an amide",
    option_b: "an amide and nitro compound",
    option_c: "an ethyl isocyanide",
    option_d: "an alkyl halide",
    correct_option: "C",
    solution: "When ethylamine is heated with chloroform and alcoholic $\\text{KOH}$, it undergoes the carbylamine reaction to produce ethyl isocyanide ($\\text{CH}_3\\text{CH}_2\\text{NC}$), recognizable by its extremely repulsive odour."
  },
  {
    question_number: 69,
    exam_tag: "AIPMT 1996",
    question_text: "Aniline on nitration gives :\n(A) p-nitroaniline\n(B) 2,4-dinitrotoluene\n(C) m-nitroaniline\n(D) both (a) and (c)",
    image_url: urls.q69_diag || "",
    option_a: "p-nitroaniline only",
    option_b: "2,4-dinitrotoluene",
    option_c: "m-nitroaniline only",
    option_d: "both (a) and (c)",
    correct_option: "D",
    solution: "Direct nitration of aniline with concentrated nitric acid and sulfuric acid produces a mixture of p-nitroaniline ($51\\%$) and m-nitroaniline ($47\\%$) along with a small amount of o-nitroaniline ($2\\%$). Thus, both (a) and (c) are major products."
  },
  {
    question_number: 70,
    exam_tag: "AIPMT 1995",
    question_text: "Which product is formed, when acetonitrile is hydrolysed partially with cold concentrated HCl?",
    option_a: "Methyl cyanide",
    option_b: "Acetic anhydride",
    option_c: "Acetic acid",
    option_d: "Acetamide",
    correct_option: "D",
    solution: "Partial acid hydrolysis of acetonitrile (ethanenitrile, $\\text{CH}_3\\text{CN}$) with cold concentrated $\\text{HCl}$ yields acetamide ($\\text{CH}_3\\text{CONH}_2$). Complete hydrolysis under reflux yields acetic acid."
  },
  {
    question_number: 71,
    exam_tag: "AIPMT 1995",
    question_text: "When aniline reacts with oil of bitter almonds ($\\text{C}_6\\text{H}_5\\text{CHO}$) condensation takes place and benzal derivative is formed. This is known as",
    option_a: "Schiff's base",
    option_b: "Benedict's reagent",
    option_c: "Millon's base",
    option_d: "Schiff's reagent",
    correct_option: "A",
    solution: "Reaction of aniline with benzaldehyde (oil of bitter almonds) involves nucleophilic addition-elimination to form benzylideneaniline (benzalaniline, $\\text{C}_6\\text{H}_5\\text{CH}=\\text{N}\\text{C}_6\\text{H}_5$ + $\\text{H}_2\\text{O}$), an imine class compound commonly termed a Schiff's base (or anil)."
  },
  {
    question_number: 72,
    exam_tag: "AIPMT 1994",
    question_text: "The action of nitrous acid on an aliphatic primary amine gives",
    option_a: "secondary amine",
    option_b: "nitro alkane",
    option_c: "alcohol",
    option_d: "alkyl nitrite",
    correct_option: "C",
    solution: "Aliphatic primary amines react with nitrous acid ($\\text{HNO}_2$) to form unstable alkyldiazonium salts which immediately decompose to evolve nitrogen gas and form carbocations, yielding alcohols as the principal organic product."
  },
  {
    question_number: 73,
    exam_tag: "AIPMT 1994",
    question_text: "Which one of the following order is wrong, with respect to the property indicated?",
    option_a: "Benzoic acid > phenol > cyclohexanol (acid strength)",
    option_b: "Aniline > cyclohexylamine > benzamide (basic strength)",
    option_c: "Formic acid > acetic acid > propanoic acid (acid strength)",
    option_d: "Fluoroacetic acid > chloroacetic acid > bromoacetic acid (acid strength)",
    correct_option: "B",
    solution: "Order (B) is incorrect: Cyclohexylamine is an aliphatic primary amine where the lone pair on nitrogen is localized and readily available ($pK_b \\approx 3.3$). In aniline, the lone pair is resonance-delocalized into the benzene ring ($pK_b \\approx 9.4$). Hence, cyclohexylamine is far more basic than aniline. The correct basic strength order is: cyclohexylamine > aniline > benzamide."
  },
  {
    question_number: 74,
    exam_tag: "AIPMT 1994",
    question_text: "Diazo coupling is useful to prepare some",
    option_a: "pesticides",
    option_b: "dyes",
    option_c: "proteins",
    option_d: "vitamins",
    correct_option: "B",
    solution: "Diazo coupling reactions between arenediazonium salts and activated aromatic rings (such as phenols and aromatic amines) yield brightly coloured azo compounds ($\\text{Ar}-\\text{N}=\\text{N}-\\text{Ar}'$) having extended conjugated $\\pi$-systems, which are widely used as commercial azo dyes (e.g., methyl orange, aniline yellow)."
  },
  {
    question_number: 75,
    exam_tag: "AIPMT 1992",
    question_text: "For carbylamine reaction, we need hot alcoholic KOH and",
    option_a: "any primary amine and chloroform",
    option_b: "chloroform and silver powder",
    option_c: "a primary amine and an alkyl halide",
    option_d: "a monoalkylamine and trichloromethane",
    correct_option: "A",
    solution: "The carbylamine reaction is given by both aliphatic and aromatic primary amines (any primary amine) when heated with chloroform ($\\text{CHCl}_3$) in the presence of alcoholic $\\text{KOH}$, producing foul-smelling isocyanides."
  },
  {
    question_number: 76,
    exam_tag: "AIPMT 1989",
    question_text: "Indicate which nitrogen compound amongst the following would undergo Hofmann reaction (i.e., reaction with $\\text{Br}_2$ and strong KOH) to furnish the primary amine ($\\text{R}-\\text{NH}_2$)?",
    option_a: "$\\text{RCONHCH}_3$",
    option_b: "$\\text{RCOONH}_4$",
    option_c: "$\\text{RCONH}_2$",
    option_d: "$\\text{R}-\\text{CO}-\\text{NHOH}$",
    correct_option: "C",
    solution: "The Hofmann bromamide degradation reaction specifically converts primary carboxamides ($\\text{RCONH}_2$) upon treatment with bromine in alkaline medium into primary amines ($\\text{R}-\\text{NH}_2$) having one carbon less."
  }
];

