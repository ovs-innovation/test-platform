
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/organic_diagram_urls.json', 'utf8'));

export const part3Questions = [
  {
    question_number: 71,
    question_text: "Considering the state of hybridization of carbon atoms, find out the molecule among the following which is linear?",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$" },
      { option_key: "B", option_text: "$\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_3$" },
      { option_key: "C", option_text: "$\\text{CH}_2=\\text{CH}-\\text{CH}_2-\\text{C}\\equiv\\text{CH}$" },
      { option_key: "D", option_text: "$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$" }
    ],
    correct_option: "B",
    solution_text: "In but-2-yne ($\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_3$), the two central triply-bonded carbon atoms are $sp$ hybridized with a linear $180^\\circ$ bond angle. Consequently, all four carbon atoms lie along a single straight line."
  },
  {
    question_number: 72,
    question_text: "Which one of the following is most reactive towards electrophilic reagent?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q72_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q72_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q72_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q72_opt_d + ")" }
    ],
    correct_option: "B",
    solution_text: "The hydroxyl group ($-\\text{OH}$) in phenol derivatives donates its oxygen lone pair into the aromatic ring through a strong $+M$ (mesomeric) effect, significantly increasing electron density and making it the most reactive towards electrophilic attack."
  },
  {
    question_number: 73,
    question_text: "The correct IUPAC name for the compound is:\n\n![Compound](" + urls.q73_diag + ")",
    options: [
      { option_key: "A", option_text: "4-ethyl-3-propylhex-1-ene" },
      { option_key: "B", option_text: "3-ethyl-4-ethenylheptane" },
      { option_key: "C", option_text: "3-ethyl-4-propylhex-5-ene" },
      { option_key: "D", option_text: "3-(1-ethylpropyl)hex-1-ene" }
    ],
    correct_option: "A",
    solution_text: "The longest continuous carbon chain containing the double bond contains 6 carbons (hex-1-ene). Numbering from the double-bond end: C3 has a propyl substituent and C4 has an ethyl substituent. Following alphabetical priority ('ethyl' before 'propyl'), the IUPAC name is 4-ethyl-3-propylhex-1-ene."
  },
  {
    question_number: 74,
    question_text: "The Lassaigne's extract is boiled with conc. $\\text{HNO}_3$ while testing for halogens. By doing so it:",
    options: [
      { option_key: "A", option_text: "decomposes $\\text{Na}_2\\text{S}$ and $\\text{NaCN}$, formed" },
      { option_key: "B", option_text: "helps in the precipitation of $\\text{AgCl}$" },
      { option_key: "C", option_text: "increases the solubility product of $\\text{AgCl}$" },
      { option_key: "D", option_text: "increases the concentration of $\\text{NO}_3^-$ ions" }
    ],
    correct_option: "A",
    solution_text: "Boiling the Lassaigne's extract with concentrated $\\text{HNO}_3$ decomposes any $\\text{NaCN}$ into volatile $\\text{HCN}$ gas and $\\text{Na}_2\\text{S}$ into $\\text{H}_2\\text{S}$ gas. This prevents cyanide and sulfide ions from forming interfering precipitates ($\\text{AgCN}$ or $\\text{Ag}_2\\text{S}$) upon adding $\\text{AgNO}_3$ solution."
  },
  {
    question_number: 75,
    question_text: "Which of the following species is not electrophilic in nature?",
    options: [
      { option_key: "A", option_text: "$\\text{Cl}^+$" },
      { option_key: "B", option_text: "$\\text{BH}_3$" },
      { option_key: "C", option_text: "$\\text{H}_3\\text{O}^+$" },
      { option_key: "D", option_text: "$\\text{NO}_2^+$" }
    ],
    correct_option: "C",
    solution_text: "In the hydronium ion ($\\text{H}_3\\text{O}^+$), oxygen has a complete valence octet and no vacant low-lying orbital to accept an incoming pair of electrons. Therefore, $\\text{H}_3\\text{O}^+$ is not electrophilic."
  },
  {
    question_number: 76,
    question_text: "The IUPAC name of the compound $\\text{CH}_3\\text{CH}=\\text{CHC}\\equiv\\text{CH}$ is:",
    options: [
      { option_key: "A", option_text: "pent-4-yn-2-ene" },
      { option_key: "B", option_text: "pent-3-en-1-yne" },
      { option_key: "C", option_text: "pent-2-en-4-yne" },
      { option_key: "D", option_text: "pent-1-yn-3-ene" }
    ],
    correct_option: "B",
    solution_text: "Numbering from the right gives locants 1 (alkyne) and 3 (alkene), which gives the lower set of locants $(1, 3)$ compared to numbering from the left $(2, 4)$. Hence, numbering begins at the alkyne carbon: pent-3-en-1-yne."
  },
  {
    question_number: 77,
    question_text: "Which of the following conformers for ethylene glycol is most stable?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q77_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q77_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q77_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q77_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "In ethylene glycol (ethane-1,2-diol), the gauche conformation (D) is stabilized by intramolecular hydrogen bonding between the two adjacent hydroxyl ($-OH$) groups, making it more stable than the anti conformation."
  },
  {
    question_number: 78,
    question_text: "Which one of the following is most reactive towards electrophilic reagent?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q78_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q78_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q78_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q78_opt_d + ")" }
    ],
    correct_option: "B",
    solution_text: "Phenol (option B) has the strongest electron-donating group ($-OH$) via $+M$ resonance effect, imparting high electron density into the ortho and para positions of the aromatic ring, making it the most reactive towards electrophiles."
  },
  {
    question_number: 79,
    question_text: "In the following the most stable conformation of n-butane is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q79_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q79_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q79_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q79_opt_d + ")" }
    ],
    correct_option: "B",
    solution_text: "The anti-conformation of n-butane (B) has a dihedral angle of $180^\\circ$ between the two bulky methyl groups, minimizing both steric repulsion and torsional strain, making it the most stable conformation."
  },
  {
    question_number: 80,
    question_text: "The IUPAC name of the compound having the formula $\\text{CH}\\equiv\\text{C}-\\text{CH}=\\text{CH}_2$ is:",
    options: [
      { option_key: "A", option_text: "1-butyne-3-ene" },
      { option_key: "B", option_text: "but-1-yne-3-ene" },
      { option_key: "C", option_text: "1-butene-3-yne" },
      { option_key: "D", option_text: "3-butene-1-yne" }
    ],
    correct_option: "C",
    solution_text: "When double and triple bonds are located symmetrically at terminal positions (1 and 3), the double bond is given lower locant preference. Thus, numbering starts at the alkene carbon, yielding but-1-en-3-yne (1-butene-3-yne)."
  },
  {
    question_number: 81,
    question_text: "Base strength of:\n\n![Carbanions](" + urls.q81_diag + ")\n\n(i) $\\text{H}_3\\text{C}-\\bar{\\text{C}}\\text{H}_2$, (ii) $\\text{H}_2\\text{C}=\\bar{\\text{C}}\\text{H}$ and (iii) $\\text{H}-\\text{C}\\equiv\\bar{\\text{C}}$ is in the order of:",
    options: [
      { option_key: "A", option_text: "(i) > (iii) > (ii)" },
      { option_key: "B", option_text: "(i) > (ii) > (iii)" },
      { option_key: "C", option_text: "(ii) > (i) > (iii)" },
      { option_key: "D", option_text: "(iii) > (ii) > (i)" }
    ],
    correct_option: "B",
    solution_text: "Base strength is the tendency to donate an electron pair. As the s-character of the carbanion increases ($sp > sp^2 > sp^3$), the negative charge is held more tightly by the nucleus, increasing stability and lowering basicity. Thus, the least stable carbanion (i, $sp^3$) is the strongest base: $\\text{(i)} > \\text{(ii)} > \\text{(iii)}$."
  },
  {
    question_number: 82,
    question_text: "Which one of the following is most reactive towards electrophilic attack?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q82_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q82_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q82_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q82_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Phenol (option A) has the $-OH$ group, which exerts a strong $+M$ activating effect on the aromatic ring, making it much more reactive towards electrophiles than toluene, chlorobenzene, or nitrobenzene."
  },
  {
    question_number: 83,
    question_text: "The stability of carbanions in the following:\n\n![Carbanions](" + urls.q83_diag + ")\n\nis in the order of:",
    options: [
      { option_key: "A", option_text: "(iv) > (ii) > (iii) > (i)" },
      { option_key: "B", option_text: "(i) > (iii) > (ii) > (iv)" },
      { option_key: "C", option_text: "(i) > (ii) > (iii) > (iv)" },
      { option_key: "D", option_text: "(ii) > (iii) > (iv) > (i)" }
    ],
    correct_option: "C",
    solution_text: "Carbanion stability increases with higher s-character of the carbon atom carrying the negative charge: $sp > sp^2 > sp^3$. Furthermore, electron-releasing alkyl groups destabilize carbanions via $+I$ inductive effect. Hence the stability order is $\\text{(i)} > \\text{(ii)} > \\text{(iii)} > \\text{(iv)}$."
  },
  {
    question_number: 84,
    question_text: "How many stereoisomers does this molecule have?\n\n$$\\text{CH}_3\\text{CH}=\\text{CHCH}_2\\text{CHBrCH}_3$$",
    options: [
      { option_key: "A", option_text: "8" },
      { option_key: "B", option_text: "2" },
      { option_key: "C", option_text: "4" },
      { option_key: "D", option_text: "6" }
    ],
    correct_option: "C",
    solution_text: "The molecule contains two stereocenters: one double bond capable of geometrical isomerism ($cis/trans$) and one asymmetric chiral carbon (C5) capable of optical isomerism ($R/S$). The total number of stereoisomers is $2^n = 2^2 = 4$."
  },
  {
    question_number: 85,
    question_text: "For (i) $\\text{I}^-$, (ii) $\\text{Cl}^-$, (iii) $\\text{Br}^-$, the increasing order of nucleophilicity would be:",
    options: [
      { option_key: "A", option_text: "$\\text{Cl}^- < \\text{Br}^- < \\text{I}^-$" },
      { option_key: "B", option_text: "$\\text{I}^- < \\text{Cl}^- < \\text{Br}^-$" },
      { option_key: "C", option_text: "$\\text{Br}^- < \\text{Cl}^- < \\text{I}^-$" },
      { option_key: "D", option_text: "$\\text{I}^- < \\text{Br}^- < \\text{Cl}^-$" }
    ],
    correct_option: "A",
    solution_text: "In protic solvents, smaller anions are more strongly solvated by hydrogen bonding, which diminishes their nucleophilicity. Iodide ($\\text{I}^-$) has the largest ionic radius, is least solvated, and has the most polarizable electron cloud, making it the strongest nucleophile. Order: $\\text{Cl}^- < \\text{Br}^- < \\text{I}^-$."
  },
  {
    question_number: 86,
    question_text: "The order of decreasing reactivity towards an electrophilic reagent, for the following would be:\n\n(i) benzene, (ii) toluene, (iii) chlorobenzene, (iv) phenol",
    options: [
      { option_key: "A", option_text: "(ii) > (iv) > (i) > (iii)" },
      { option_key: "B", option_text: "(iv) > (iii) > (ii) > (i)" },
      { option_key: "C", option_text: "(iv) > (ii) > (i) > (iii)" },
      { option_key: "D", option_text: "(i) > (ii) > (iii) > (iv)" }
    ],
    correct_option: "C",
    solution_text: "Phenol (iv) is strongly activated by the $+M$ effect of the $-OH$ group. Toluene (ii) is moderately activated by the $+I$ and hyperconjugative effects of the methyl group. Benzene (i) is neutral. Chlorobenzene (iii) is deactivated by the $-I$ effect of chlorine. Hence: $\\text{(iv)} > \\text{(ii)} > \\text{(i)} > \\text{(iii)}$."
  },
  {
    question_number: 87,
    question_text: "If there is no rotation of plane polarised light by a compound in a specific solvent, thought to be chiral, it may mean that:",
    options: [
      { option_key: "A", option_text: "the compound is certainly meso" },
      { option_key: "B", option_text: "there is no compound in the solvent" },
      { option_key: "C", option_text: "the compound may be a racemic mixture" },
      { option_key: "D", option_text: "the compound is certainly a chiral." }
    ],
    correct_option: "C",
    solution_text: "A chiral substance shows zero net optical rotation if it is present as an equimolar mixture of both (+) and (-) enantiomers (racemic mixture), where the optical rotation of one enantiomer is cancelled by the other (external compensation)."
  },
  {
    question_number: 88,
    question_text: "The IUPAC name of:\n\n![Compound](" + urls.q88_diag + ")\n\nis:",
    options: [
      { option_key: "A", option_text: "1-chloro-1-oxo-2, 3-dimethylpentane" },
      { option_key: "B", option_text: "2-ethyl-3-methylbutanoyl chloride" },
      { option_key: "C", option_text: "2, 3-dimethylpentanoyl chloride" },
      { option_key: "D", option_text: "3, 4-dimethylpentanoyl chloride" }
    ],
    correct_option: "C",
    solution_text: "The principal chain containing the carbonyl chloride group ($-COCl$, C1) has 5 carbons (pentanoyl chloride). Methyl substituents are located at carbons 2 and 3. The correct IUPAC name is 2,3-dimethylpentanoyl chloride."
  },
  {
    question_number: 89,
    question_text: "Names of some compounds are given. Which one is not in IUPAC system?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q89_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q89_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q89_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q89_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "In option (A), substituents must be cited alphabetically. Because 'ethyl' comes before 'methyl' alphabetically, the correct IUPAC name is 4-ethyl-3-methylheptane, not 3-methyl-4-ethylheptane."
  },
  {
    question_number: 90,
    question_text: "The chirality of the compound:\n\n![Chiral compound](" + urls.q90_diag + ")\n\nis:",
    options: [
      { option_key: "A", option_text: "R" },
      { option_key: "B", option_text: "S" },
      { option_key: "C", option_text: "E" },
      { option_key: "D", option_text: "Z" }
    ],
    correct_option: "A",
    solution_text: "Using CIP rules, priority is assigned by atomic number: $1: -\\text{Br}, 2: -\\text{Cl}, 3: -\\text{C}_2\\text{H}_5, 4: -\\text{H}$. With the lowest priority group ($-H$) pointing into the page (dash), the sequence $1 \\rightarrow 2 \\rightarrow 3$ runs in a clockwise direction, which corresponds to the (R) configuration."
  },
  {
    question_number: 91,
    question_text: "Which amongst the following is the most stable carbocation?",
    options: [
      { option_key: "A", option_text: "$\\overset{+}{\\text{C}}\\text{H}_3$" },
      { option_key: "B", option_text: "$\\text{CH}_3\\overset{+}{\\text{C}}\\text{H}_2$" },
      { option_key: "C", option_text: "$(\\text{CH}_3)_2\\overset{+}{\\text{C}}\\text{H}$" },
      { option_key: "D", option_text: "$(\\text{CH}_3)_3\\overset{+}{\\text{C}}$" }
    ],
    correct_option: "D",
    solution_text: "The tertiary butyl carbocation, $(\\text{CH}_3)_3\\overset{+}{\\text{C}}$, is stabilized by 9 $\\alpha$-hydrogens through hyperconjugation and three $+I$ inductive electron-donating methyl groups, making it the most stable carbocation."
  },
  {
    question_number: 92,
    question_text: "Which one of the following pairs represents stereoisomerism?",
    options: [
      { option_key: "A", option_text: "Structural isomerism and geometrical isomerism" },
      { option_key: "B", option_text: "Optical isomerism and geometrical isomerism" },
      { option_key: "C", option_text: "Chain isomerism and rotational isomerism" },
      { option_key: "D", option_text: "Linkage isomerism and geometrical isomerism." }
    ],
    correct_option: "B",
    solution_text: "Stereoisomerism is divided into two primary classes: optical isomerism (enantiomerism/diastereomerism) and geometrical isomerism (cis-trans/E-Z isomerism)."
  },
  {
    question_number: 93,
    question_text: "The best method for the separation of naphthalene and benzoic acid from their mixture is:",
    options: [
      { option_key: "A", option_text: "distillation" },
      { option_key: "B", option_text: "sublimation" },
      { option_key: "C", option_text: "chromatography" },
      { option_key: "D", option_text: "crystallisation" }
    ],
    correct_option: "B",
    solution_text: "Naphthalene easily sublimes upon gentle warming, separating cleanly from benzoic acid, which does not sublime at that temperature."
  },
  {
    question_number: 94,
    question_text: "The molecular formula of diphenyl methane,\n\n![Diphenylmethane](" + urls.q94_diag + ")\n\nHow many structural isomers are possible when one of the hydrogens is replaced by a chlorine atom?",
    options: [
      { option_key: "A", option_text: "6" },
      { option_key: "B", option_text: "4" },
      { option_key: "C", option_text: "8" },
      { option_key: "D", option_text: "7" }
    ],
    correct_option: "B",
    solution_text: "Replacing one hydrogen with chlorine gives 4 structural isomers:\n1. Chlorodiphenylmethane (substitution at the $-\\text{CH}_2-$ carbon)\n2. 2-Chlorodiphenylmethane (ortho substitution on phenyl ring)\n3. 3-Chlorodiphenylmethane (meta substitution on phenyl ring)\n4. 4-Chlorodiphenylmethane (para substitution on phenyl ring)\nTotal structural isomers = 4."
  },
  {
    question_number: 95,
    question_text: "Name of the compound given below is:\n\n![Compound](" + urls.q95_diag + ")",
    options: [
      { option_key: "A", option_text: "4-ethyl-3-methyloctane" },
      { option_key: "B", option_text: "3-methyl-4-ethyloctane" },
      { option_key: "C", option_text: "2,3-diethylheptane" },
      { option_key: "D", option_text: "5-ethyl-6-methyloctane" }
    ],
    correct_option: "A",
    solution_text: "The longest continuous carbon chain has 8 carbons (octane). Numbering from the left gives substituents at positions 3 (methyl) and 4 (ethyl). Listing alphabetically gives 4-ethyl-3-methyloctane."
  },
  {
    question_number: 96,
    question_text: "Which one of the following orders of acid strength is correct?",
    options: [
      { option_key: "A", option_text: "$\\text{RCOOH} > \\text{ROH} > \\text{HOH} > \\text{HC}\\equiv\\text{CH}$" },
      { option_key: "B", option_text: "$\\text{RCOOH} > \\text{HOH} > \\text{ROH} > \\text{HC}\\equiv\\text{CH}$" },
      { option_key: "C", option_text: "$\\text{RCOOH} > \\text{HOH} > \\text{HC}\\equiv\\text{CH} > \\text{ROH}$" },
      { option_key: "D", option_text: "$\\text{RCOOH} > \\text{HC}\\equiv\\text{CH} > \\text{HOH} > \\text{ROH}$" }
    ],
    correct_option: "B",
    solution_text: "Carboxylic acids ($\\text{RCOOH}$) are the strongest due to resonance stabilization of carboxylate anions. Water ($\\text{HOH}$) is more acidic than alcohols ($\\text{ROH}$) because the $+I$ alkyl group in alcohols destabilizes the alkoxide ion. Terminal alkynes ($\\text{HC}\\equiv\\text{CH}$) are very weak acids ($pK_a \\approx 25$). Order: $\\text{RCOOH} > \\text{HOH} > \\text{ROH} > \\text{HC}\\equiv\\text{CH}$."
  },
  {
    question_number: 97,
    question_text: "Which of the following pairs of compounds are enantiomers?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q97_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q97_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q97_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q97_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Pair (A) consists of stereoisomers that are non-superimposable mirror images of each other with inverted configurations at all chiral centers, satisfying the definition of enantiomers."
  },
  {
    question_number: 98,
    question_text: "IUPAC name of the following is:\n\n$$\\text{CH}_2=\\text{CH}-\\text{CH}_2-\\text{CH}_2-\\text{C}\\equiv\\text{CH}$$",
    options: [
      { option_key: "A", option_text: "1-hexyne-5-ene" },
      { option_key: "B", option_text: "1, 5 -hexenyne" },
      { option_key: "C", option_text: "1-hexene-5-yne" },
      { option_key: "D", option_text: "1,5-hexynene" }
    ],
    correct_option: "C",
    solution_text: "Both double and triple bonds are equidistant from the chain terminals (positions 1 and 5). Double bonds take precedence over triple bonds for lower locants in IUPAC nomenclature. Thus, numbering starts from the double bond: 1-hexene-5-yne."
  },
  {
    question_number: 99,
    question_text: "Geometrical isomers differ in:",
    options: [
      { option_key: "A", option_text: "position of functional group" },
      { option_key: "B", option_text: "position of atoms" },
      { option_key: "C", option_text: "spatial arrangement of atoms" },
      { option_key: "D", option_text: "length of carbon chain" }
    ],
    correct_option: "C",
    solution_text: "Geometrical isomers possess identical constitutional connectivity and bonding sequence, but differ in the spatial arrangement of atoms or groups around a rigid double bond or ring."
  },
  {
    question_number: 100,
    question_text: "The incorrect IUPAC name is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q100_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q100_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q100_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q100_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "In structure (A), the principal functional group is ketone ($-CO-$). Numbering must give the carbonyl carbon the lowest possible locant (C2), naming it 3-methylbutan-2-one (3-methyl-2-butanone), not 2-methyl-3-butanone."
  },
  {
    question_number: 101,
    question_text: "In steam distillation of toluene, the pressure of toluene in vapour is:",
    options: [
      { option_key: "A", option_text: "equal to pressure of barometer" },
      { option_key: "B", option_text: "Less than pressure of barometer" },
      { option_key: "C", option_text: "equal to vapour pressure of toluene in simple distillation" },
      { option_key: "D", option_text: "more than vapour pressure of toluene in simple distillation" }
    ],
    correct_option: "B",
    solution_text: "During steam distillation of immiscible liquids, boiling occurs when the sum of partial pressures equals atmospheric pressure ($P_{\\text{toluene}} + P_{\\text{water}} = P_{\\text{atm}}$). Therefore, the partial pressure of toluene in the vapour phase is strictly less than the barometric pressure."
  },
  {
    question_number: 102,
    question_text: "The correct acidic order of the following is:\n\n![Phenol derivatives](" + urls.q102_diag + ")",
    options: [
      { option_key: "A", option_text: "I > II > III" },
      { option_key: "B", option_text: "III > I > II" },
      { option_key: "C", option_text: "II > III > I" },
      { option_key: "D", option_text: "I > III > II" }
    ],
    correct_option: "B",
    solution_text: "p-Nitrophenol (III) is most acidic due to $-M$ and $-I$ electron-withdrawing effects of the nitro group. Phenol (I) is moderately acidic. p-Cresol (II) is least acidic because the electron-donating methyl group ($+I$ and hyperconjugation) destabilizes the phenoxide ion. Acidic order: $\\text{III} > \\text{I} > \\text{II}$."
  },
  {
    question_number: 103,
    question_text: "A compound of molecular formula $\\text{C}_7\\text{H}_{16}$ shows optical isomerism, compound will be:",
    options: [
      { option_key: "A", option_text: "2, 3-dimethylpentane" },
      { option_key: "B", option_text: "2, 2-dimethylbutane" },
      { option_key: "C", option_text: "2-methylhexane" },
      { option_key: "D", option_text: "none of these" }
    ],
    correct_option: "A",
    solution_text: "2,3-Dimethylpentane has a chiral carbon atom (C3) bonded to four distinct groups: $-\\text{H}$, $-\\text{CH}_3$, $-\\text{CH}(\\text{CH}_3)_2$, and $-\\text{CH}_2\\text{CH}_3$, rendering it optically active."
  },
  {
    question_number: 104,
    question_text: "Dihedral angle in staggered form of ethane is:",
    options: [
      { option_key: "A", option_text: "$0^\\circ$" },
      { option_key: "B", option_text: "$120^\\circ$" },
      { option_key: "C", option_text: "$60^\\circ$" },
      { option_key: "D", option_text: "$180^\\circ$" }
    ],
    correct_option: "C",
    solution_text: "In the staggered conformation of ethane, adjacent C-H bonds are staggered at a dihedral angle of $60^\\circ$."
  },
  {
    question_number: 105,
    question_text: "The (R)- and (S)-enantiomers of an optically active compound differ in:",
    options: [
      { option_key: "A", option_text: "their solubility in achiral solvents" },
      { option_key: "B", option_text: "their reactivity with achiral reagents" },
      { option_key: "C", option_text: "their optical rotation of plane polarised light" },
      { option_key: "D", option_text: "their melting points" }
    ],
    correct_option: "C",
    solution_text: "Enantiomers have identical physical properties in achiral environments and differ only in the sign (direction) of rotation of plane-polarized light."
  }
];
