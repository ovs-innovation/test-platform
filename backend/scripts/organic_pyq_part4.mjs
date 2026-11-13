import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/organic_diagram_urls.json', 'utf8'));

export const part4Questions = [
  {
    question_number: 106,
    question_text: "The most suitable method of the separation of a mixture of ortho and para-nitrophenol mixed in the ratio of $1 : 1$ is:",
    options: [
      { option_key: "A", option_text: "distillation" },
      { option_key: "B", option_text: "crystallisation" },
      { option_key: "C", option_text: "vaporisation" },
      { option_key: "D", option_text: "colour spectrum" }
    ],
    correct_option: "A",
    solution_text: "ortho-Nitrophenol exhibits intramolecular hydrogen bonding (chelation), lowering its boiling point and making it steam volatile. para-Nitrophenol forms intermolecular hydrogen bonds with a higher boiling point and is non-steam volatile. Hence, the mixture is separated by steam distillation."
  },
  {
    question_number: 107,
    question_text: "IUPAC name of the compound:\n\n![Compound](" + urls.q107_diag + ")\n\nis:",
    options: [
      { option_key: "A", option_text: "trans-3-iodo-4-chloro-3-pentene" },
      { option_key: "B", option_text: "cis-2-chloro-3-iodo-2-pentene" },
      { option_key: "C", option_text: "trans-2-chloro-3-iodo-2-pentene" },
      { option_key: "D", option_text: "cis-3-iodo-4-chloro-3-pentene" }
    ],
    correct_option: "C",
    solution_text: "The principal chain consists of 5 carbons (pent-2-ene). Lowest locants are assigned to the double bond and substituents from the left: C2 has chloro, C3 has iodo. The priority groups on each double-bonded carbon are situated on opposite sides of the double bond, giving trans-2-chloro-3-iodo-2-pentene."
  },
  {
    question_number: 108,
    question_text: "Which one of the following orders is correct regarding the $-I$ effect of the substituents?",
    options: [
      { option_key: "A", option_text: "$-\\text{NR}_2 < -\\text{OR} > -\\text{F}$" },
      { option_key: "B", option_text: "$-\\text{NR}_2 > -\\text{OR} > -\\text{F}$" },
      { option_key: "C", option_text: "$-\\text{NR}_2 < -\\text{OR} < -\\text{F}$" },
      { option_key: "D", option_text: "$-\\text{NR}_2 > -\\text{OR} < -\\text{F}$" }
    ],
    correct_option: "C",
    solution_text: "The inductive effect ($-I$) is directly related to the electronegativity of the substituent atom directly bonded to carbon. The electronegativity order of second-row elements is $\\text{F} > \\text{O} > \\text{N}$. Therefore, the $-I$ electron-withdrawing power follows the order: $-\\text{NR}_2 < -\\text{OR} < -\\text{F}$."
  },
  {
    question_number: 109,
    question_text: "Which of the following compounds is not chiral?",
    options: [
      { option_key: "A", option_text: "$\\text{DCH}_2\\text{CH}_2\\text{CH}_2\\text{Cl}$" },
      { option_key: "B", option_text: "$\\text{CH}_3\\text{CH}_2\\text{CHDCl}$" },
      { option_key: "C", option_text: "$\\text{CH}_3\\text{CHDCH}_2\\text{Cl}$" },
      { option_key: "D", option_text: "$\\text{CH}_3\\text{CHClCH}_2\\text{D}$" }
    ],
    correct_option: "A",
    solution_text: "In $\\text{DCH}_2-\\text{CH}_2-\\text{CH}_2\\text{Cl}$, every carbon atom is bonded to at least two identical hydrogen atoms. Since no carbon atom is bonded to four different groups, the molecule contains no stereocenter and is not chiral."
  },
  {
    question_number: 110,
    question_text: "Tautomerism is exhibited by:",
    options: [
      { option_key: "A", option_text: "$\\text{R}_3\\text{CNO}_2$" },
      { option_key: "B", option_text: "$\\text{RCH}_2\\text{NO}_2$" },
      { option_key: "C", option_text: "$(\\text{CH}_3)_3\\text{CNO}$" },
      { option_key: "D", option_text: "$(\\text{CH}_3)_2\\text{NH}$" }
    ],
    correct_option: "B",
    solution_text: "Primary nitroalkanes, $\\text{RCH}_2\\text{NO}_2$, contain acidic $\\alpha$-hydrogens attached to the carbon bearing the nitro group. They readily undergo nitro-aci tautomerism: $\\text{R-CH}_2-\\text{NO}_2 \\rightleftharpoons \\text{R-CH}=\\text{N}^+(\\text{O}^-)\\text{OH}$."
  },
  {
    question_number: 111,
    question_text: "Which of the following technique is most suitable for purification/identification of cyclohexanone from a mixture containing benzoic acid, isoamyl alcohol, cyclohexane and cyclohexanone?",
    options: [
      { option_key: "A", option_text: "Sublimation" },
      { option_key: "B", option_text: "Evaporation" },
      { option_key: "C", option_text: "Crystallisation" },
      { option_key: "D", option_text: "IR spectroscopy" }
    ],
    correct_option: "D",
    solution_text: "Cyclohexanone contains a characteristic carbonyl group ($>\\text{C=O}$) that exhibits a sharp, diagnostic infrared absorption peak around $1715\\text{ cm}^{-1}$, allowing clear spectroscopic identification and differentiation from alcohols, carboxylic acids, and hydrocarbons in the mixture."
  },
  {
    question_number: 112,
    question_text: "The number of isomers in $\\text{C}_4\\text{H}_{10}\\text{O}$ will be:",
    options: [
      { option_key: "A", option_text: "7" },
      { option_key: "B", option_text: "8" },
      { option_key: "C", option_text: "5" },
      { option_key: "D", option_text: "6" }
    ],
    correct_option: "A",
    solution_text: "The saturated compound $\\text{C}_4\\text{H}_{10}\\text{O}$ has 7 constitutional isomers:\n- 4 isomeric alcohols: butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol\n- 3 isomeric ethers: 1-methoxypropane, 2-methoxypropane, ethoxyethane (diethyl ether)\nTotal structural isomers = 7."
  },
  {
    question_number: 113,
    question_text: "The IUPAC name of $(\\text{CH}_3)_2\\text{CH}-\\text{CH}_2-\\text{CH}_2\\text{Br}$ is:",
    options: [
      { option_key: "A", option_text: "1-bromo-3-methylbutane" },
      { option_key: "B", option_text: "2-methyl-3-bromopropane" },
      { option_key: "C", option_text: "1-bromopentane" },
      { option_key: "D", option_text: "2-methyl-4-bromobutane" }
    ],
    correct_option: "A",
    solution_text: "The principal chain contains 4 carbons (butane). Numbering begins at the end nearest to the bromo substituent: C1 carries bromo and C3 carries methyl, giving 1-bromo-3-methylbutane."
  },
  {
    question_number: 114,
    question_text: "The IUPAC name for $\\text{CH}_3\\text{CH}=\\text{CHCH}_2\\text{CH}(\\text{NH}_2)\\text{CH}_2\\text{COOH}$ is:",
    options: [
      { option_key: "A", option_text: "3-amino-5-heptenoic acid" },
      { option_key: "B", option_text: "$\\beta$-amino-$\\epsilon$-heptenoic acid" },
      { option_key: "C", option_text: "5-amino-2-heptenoic acid" },
      { option_key: "D", option_text: "5-amino-hex-2-enecarboxylic acid" }
    ],
    correct_option: "A",
    solution_text: "The carboxylic acid group ($-COOH$) has highest priority and is assigned C1. The main chain has 7 carbons (hept-5-enoic acid), with an amino substituent ($-NH_2$) at C3. IUPAC name: 3-aminohept-5-enoic acid (3-amino-5-heptenoic acid)."
  },
  {
    question_number: 115,
    question_text: "In the reaction $\\text{CH}_3\\text{CHO} + \\text{HCN} \\rightarrow \\text{CH}_3\\text{CH(OH)CN}$, a chiral centre is produced. This product is:",
    options: [
      { option_key: "A", option_text: "dextrorotatory" },
      { option_key: "B", option_text: "racemic mixture" },
      { option_key: "C", option_text: "meso compound" },
      { option_key: "D", option_text: "laevorotatory" }
    ],
    correct_option: "B",
    solution_text: "The carbonyl carbon in acetaldehyde is planar ($sp^2$). Attack by cyanide ion ($\\text{CN}^-$) can occur with equal probability from either the top or bottom face, producing an equimolar 50:50 mixture of $(+)$ and $(-)$ enantiomers, known as a racemic mixture."
  },
  {
    question_number: 116,
    question_text: "The most suitable method of separation of $1 : 1$ mixture of ortho and para-nitrophenols is:",
    options: [
      { option_key: "A", option_text: "chromatography" },
      { option_key: "B", option_text: "crystallisation" },
      { option_key: "C", option_text: "steam distillation" },
      { option_key: "D", option_text: "sublimation" }
    ],
    correct_option: "C",
    solution_text: "ortho-Nitrophenol possesses intramolecular hydrogen bonding, making it steam volatile, whereas para-nitrophenol has intermolecular hydrogen bonding and is non-steam volatile. They are separated by steam distillation."
  },
  {
    question_number: 117,
    question_text: "2-Methyl-2-butene will be represented as:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2\\text{CH}_3$" },
      { option_key: "B", option_text: "$(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3$" },
      { option_key: "C", option_text: "$\\text{CH}_3-\\text{CH}_2-\\text{C}(\\text{CH}_3)=\\text{CH}_2$" },
      { option_key: "D", option_text: "$\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}=\\text{CH}_2$" }
    ],
    correct_option: "B",
    solution_text: "2-Methyl-2-butene has a four-carbon principal chain with a double bond at C2 and a methyl group at C2, represented as $(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3$."
  },
  {
    question_number: 118,
    question_text: "The IUPAC name of $\\text{CH}_3-\\text{CH(OH)}-\\text{CH}=\\text{C}(\\text{CH}_3)-\\text{CHO}$ is:",
    options: [
      { option_key: "A", option_text: "4-hydroxy-1-methylpentanal" },
      { option_key: "B", option_text: "4-hydroxy-2-methylpent-2-en-1-al" },
      { option_key: "C", option_text: "2-hydroxy-4-methylpent-3-en-5-al" },
      { option_key: "D", option_text: "2-hydroxy-3-methylpent-2-en-5-al" }
    ],
    correct_option: "B",
    solution_text: "The aldehyde group ($-CHO$) defines C1. The chain contains 5 carbons: C2 has a methyl substituent and a double bond to C3, and C4 bears a hydroxyl group ($-OH$). IUPAC name: 4-hydroxy-2-methylpent-2-en-1-al."
  },
  {
    question_number: 119,
    question_text: "How many isomers of $\\text{C}_5\\text{H}_{11}\\text{OH}$ will be primary alcohols?",
    options: [
      { option_key: "A", option_text: "5" },
      { option_key: "B", option_text: "4" },
      { option_key: "C", option_text: "2" },
      { option_key: "D", option_text: "3" }
    ],
    correct_option: "B",
    solution_text: "There are four primary ($1^\\circ$) alcohol isomers of $\\text{C}_5\\text{H}_{11}\\text{OH}$:\n1. Pentan-1-ol\n2. 2-Methylbutan-1-ol\n3. 3-Methylbutan-1-ol\n4. 2,2-Dimethylpropan-1-ol\nTotal = 4."
  },
  {
    question_number: 120,
    question_text: "Isomers of a substance must have the same:",
    options: [
      { option_key: "A", option_text: "structural formula" },
      { option_key: "B", option_text: "physical properties" },
      { option_key: "C", option_text: "chemical properties" },
      { option_key: "D", option_text: "molecular formula" }
    ],
    correct_option: "D",
    solution_text: "Isomers are distinct chemical species that have the exact same molecular formula but different structural arrangements or orientations of their atoms in space."
  },
  {
    question_number: 121,
    question_text: "Which of the following is the most stable carbocation (carbonium ion)?",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3\\overset{+}{\\text{C}}\\text{H}_2$" },
      { option_key: "B", option_text: "$(\\text{CH}_3)_2\\overset{+}{\\text{C}}\\text{H}$" },
      { option_key: "C", option_text: "$(\\text{CH}_3)_3\\overset{+}{\\text{C}}$" },
      { option_key: "D", option_text: "$\\text{C}_6\\text{H}_5\\overset{+}{\\text{C}}\\text{H}_2$" }
    ],
    correct_option: "C",
    solution_text: "The tertiary butyl carbocation, $(\\text{CH}_3)_3\\overset{+}{\\text{C}}$, is stabilized by 9 hyperconjugative $\\alpha$-hydrogens and three electron-releasing $+I$ methyl groups, providing optimal carbocation stability."
  },
  {
    question_number: 122,
    question_text: "In sodium fusion test of organic compounds, the nitrogen of the organic compound is converted into:",
    options: [
      { option_key: "A", option_text: "sodamide" },
      { option_key: "B", option_text: "sodium cyanide" },
      { option_key: "C", option_text: "sodium nitrite" },
      { option_key: "D", option_text: "sodium nitrate" }
    ],
    correct_option: "B",
    solution_text: "In Lassaigne's test, nitrogen from the organic compound reacts with carbon and molten sodium metal to yield sodium cyanide ($\\text{NaCN}$)."
  },
  {
    question_number: 123,
    question_text: "Kjeldahl's method is used in the estimation of:",
    options: [
      { option_key: "A", option_text: "nitrogen" },
      { option_key: "B", option_text: "halogens" },
      { option_key: "C", option_text: "sulphur" },
      { option_key: "D", option_text: "oxygen" }
    ],
    correct_option: "A",
    solution_text: "Kjeldahl's method is a standard analytical method for the quantitative determination of nitrogen in organic compounds."
  },
  {
    question_number: 124,
    question_text: "An organic compound X (molecular formula $\\text{C}_6\\text{H}_7\\text{O}_2\\text{N}$) has six carbon atoms in a ring system, two double bonds and a nitro group as substituent, X is:",
    options: [
      { option_key: "A", option_text: "homocyclic but not aromatic" },
      { option_key: "B", option_text: "aromatic but not homocyclic" },
      { option_key: "C", option_text: "homocyclic and aromatic" },
      { option_key: "D", option_text: "heterocyclic and aromatic" }
    ],
    correct_option: "A",
    solution_text: "Since the ring consists only of carbon atoms (all 6 atoms are carbon), it is homocyclic. With only two double bonds, it lacks complete cyclic delocalization ($4\\,\\pi$ electrons instead of Huckel's $6\\,\\pi$ aromatic system). Hence, it is homocyclic but not aromatic."
  },
  {
    question_number: 125,
    question_text: "Which one of the following can exhibit cis-trans isomerism?",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3-\\text{CHCl}-\\text{COOH}$" },
      { option_key: "B", option_text: "$\\text{H}-\\text{C}\\equiv\\text{C}-\\text{Cl}$" },
      { option_key: "C", option_text: "$\\text{ClCH}=\\text{CHCl}$" },
      { option_key: "D", option_text: "$\\text{ClCH}_2-\\text{CH}_2\\text{Cl}$" }
    ],
    correct_option: "C",
    solution_text: "1,2-Dichloroethene, $\\text{ClCH}=\\text{CHCl}$, has restricted rotation about the double bond and each $sp^2$ carbon is attached to two different atoms ($-\\text{H}$ and $-\\text{Cl}$), giving rise to cis and trans geometrical isomers."
  },
  {
    question_number: 126,
    question_text: "Lassaigne's test is used in qualitative analysis to detect:",
    options: [
      { option_key: "A", option_text: "nitrogen" },
      { option_key: "B", option_text: "sulphur" },
      { option_key: "C", option_text: "chlorine" },
      { option_key: "D", option_text: "all of these" }
    ],
    correct_option: "D",
    solution_text: "Lassaigne's test is used in qualitative analysis for the detection of extra elements such as nitrogen, sulphur, and halogens (chlorine, bromine, iodine) in organic compounds."
  },
  {
    question_number: 127,
    question_text: "Which of the following is an optically active compound?",
    options: [
      { option_key: "A", option_text: "1-Butanol" },
      { option_key: "B", option_text: "1-Propanol" },
      { option_key: "C", option_text: "2-Chlorobutane" },
      { option_key: "D", option_text: "4-Hydroxyheptane" }
    ],
    correct_option: "C",
    solution_text: "In 2-chlorobutane, $\\text{CH}_3-\\overset{*}{\\text{C}}\\text{H(Cl)}-\\text{CH}_2\\text{CH}_3$, carbon 2 is an asymmetric carbon atom bonded to four distinct groups ($-\\text{H}, -\\text{Cl}, -\\text{CH}_3, -\\text{C}_2\\text{H}_5$), rendering it optically active."
  },
  {
    question_number: 128,
    question_text: "How many chain isomers could be obtained from the alkane $\\text{C}_6\\text{H}_{14}$?",
    options: [
      { option_key: "A", option_text: "Four" },
      { option_key: "B", option_text: "Five" },
      { option_key: "C", option_text: "Six" },
      { option_key: "D", option_text: "Seven" }
    ],
    correct_option: "B",
    solution_text: "$\\text{C}_6\\text{H}_{14}$ has 5 constitutional chain isomers: n-hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane, and 2,3-dimethylbutane."
  },
  {
    question_number: 129,
    question_text: "Which of the following is correct with respect to $-I$ effect of the substituents? ($R = \\text{alkyl}$)",
    options: [
      { option_key: "A", option_text: "$-\\text{NH}_2 < -\\text{OR} < -\\text{F}$" },
      { option_key: "B", option_text: "$-\\text{NR}_2 < -\\text{OR} < -\\text{F}$" },
      { option_key: "C", option_text: "$-\\text{NH}_2 > -\\text{OR} > -\\text{F}$" },
      { option_key: "D", option_text: "$-\\text{NR}_2 > -\\text{OR} > -\\text{F}$" }
    ],
    correct_option: "A",
    solution_text: "Electronegativity follows $\\text{F} > \\text{O} > \\text{N}$. Hence, electron withdrawal via inductive effect increases from nitrogen to oxygen to fluorine: $-\\text{NH}_2 < -\\text{OR} < -\\text{F}$ (both A and B are correct trends)."
  },
  {
    question_number: 130,
    question_text: "Match List - I with List - II:\n\n$$\\begin{array}{|l|l|l|l|} \\hline & \\textbf{List - I (Mixtures/Sample)} & & \\textbf{List - II (Technique used for purification)} \\\\ \\hline \\text{(A)} & \\text{Glycerol from spent lye} & \\text{(I)} & \\text{Steam distillation} \\\\ \\hline \\text{(B)} & \\text{Chloroform + Aniline} & \\text{(II)} & \\text{Fractional distillation} \\\\ \\hline \\text{(C)} & \\text{Fractions of crude oil} & \\text{(III)} & \\text{Distillation under reduced pressure} \\\\ \\hline \\text{(D)} & \\text{Aniline + Water} & \\text{(IV)} & \\text{Distillation} \\\\ \\hline \\end{array}$$\n\nChoose the correct answer from the options given below:",
    options: [
      { option_key: "A", option_text: "(A) - (III), (B) - (IV), (C) - (II), (D) - (I)" },
      { option_key: "B", option_text: "(A) - (IV), (B) - (II), (C) - (I), (D) - (III)" },
      { option_key: "C", option_text: "(A) - (I), (B) - (II), (C) - (III), (D) - (IV)" },
      { option_key: "D", option_text: "(A) - (I), (B) - (III), (C) - (II), (D) - (IV)" }
    ],
    correct_option: "A",
    solution_text: "- Glycerol from spent lye: Distillation under reduced pressure (A - III)\n- Chloroform + Aniline: Simple distillation (B - IV)\n- Fractions of crude oil: Fractional distillation (C - II)\n- Aniline + Water: Steam distillation (D - I)\nCorrect combination: (A) - (III), (B) - (IV), (C) - (II), (D) - (I)."
  }
];

