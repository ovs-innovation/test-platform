import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/organic_diagram_urls.json', 'utf8'));

export const part2Questions = [
  {
    question_number: 36,
    question_text: "Paper chromatography is an example of:",
    options: [
      { option_key: "A", option_text: "Partition chromatography" },
      { option_key: "B", option_text: "Thin layer chromatography" },
      { option_key: "C", option_text: "Column chromatography" },
      { option_key: "D", option_text: "Adsorption chromatography" }
    ],
    correct_option: "A",
    solution_text: "Paper chromatography is a type of partition chromatography in which water held in the pores of the paper acts as the stationary phase, and the solvent acts as the mobile phase."
  },
  {
    question_number: 37,
    question_text: "A tertiary butyl carbocation is more stable than a secondary butyl carbocation because of which of the following?",
    options: [
      { option_key: "A", option_text: "$+R$ effect of $-\\text{CH}_3$ groups" },
      { option_key: "B", option_text: "$-R$ effect of $-\\text{CH}_3$ groups" },
      { option_key: "C", option_text: "Hyperconjugation" },
      { option_key: "D", option_text: "$-I$ effect of $-\\text{CH}_3$ groups" }
    ],
    correct_option: "C",
    solution_text: "A tertiary butyl carbocation, $(\\text{CH}_3)_3\\text{C}^+$, has 9 $\\alpha$-hydrogens participating in hyperconjugation, whereas a secondary butyl carbocation has only 5 $\\alpha$-hydrogens. The greater number of hyperconjugative structures imparts greater stability."
  },
  {
    question_number: 38,
    question_text: "The most stable carbocation, among the following, is:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3-\\text{CH}_2-\\overset{+}{\\text{C}}\\text{H}_2$" },
      { option_key: "B", option_text: "$(\\text{CH}_3)_3\\text{C}-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_3$" },
      { option_key: "C", option_text: "$\\text{CH}_3-\\text{CH}_2-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_2-\\text{CH}_3$" },
      { option_key: "D", option_text: "$\\text{CH}_3-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$" }
    ],
    correct_option: "D",
    solution_text: "Carbocation stability is determined by the number of $\\alpha$-hydrogens participating in hyperconjugation:\n- (A) $\\text{CH}_3-\\text{CH}_2-\\overset{+}{\\text{C}}\\text{H}_2$: 2 $\\alpha$-H\n- (B) $(\\text{CH}_3)_3\\text{C}-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_3$: 3 $\\alpha$-H (from methyl; tert-butyl carbon has 0 $\\alpha$-H)\n- (C) $\\text{CH}_3-\\text{CH}_2-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_2-\\text{CH}_3$: 4 $\\alpha$-H\n- (D) $\\text{CH}_3-\\overset{+}{\\text{C}}\\text{H}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3$: $3 + 2 = 5$ $\\alpha$-H.\nSince carbocation (D) has the maximum number of $\\alpha$-hydrogens (5 $\\alpha$-H), it is the most stable."
  },
  {
    question_number: 39,
    question_text: "The compound that is most difficult to protonate is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q39_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q39_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q39_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q39_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "In phenol / diphenylether (option D), the lone pair of electrons on the oxygen atom is delocalized into the benzene ring through $+M$ resonance, significantly decreasing electron density at oxygen and making protonation extremely unfavorable."
  },
  {
    question_number: 40,
    question_text: "Which of the following carbocations is expected to be most stable?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q40_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q40_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q40_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q40_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "The $-\\text{NO}_2$ group is a strong electron-withdrawing group ($-I$ and $-M$). Being electron withdrawing, it destabilizes a carbocation. The farther the $-\\text{NO}_2$ group is from the positively charged carbon, the lesser the destabilizing inductive effect. In (C), $-\\text{NO}_2$ is farthest (at the meta position), making it the most stable carbocation."
  },
  {
    question_number: 41,
    question_text: "Which of the following molecules represents the order of hybridisation $sp^2, sp^2, sp, sp$ from left to right atoms?",
    options: [
      { option_key: "A", option_text: "$\\text{HC}\\equiv\\text{C}-\\text{C}\\equiv\\text{CH}$" },
      { option_key: "B", option_text: "$\\text{CH}_2=\\text{CH}-\\text{C}\\equiv\\text{CH}$" },
      { option_key: "C", option_text: "$\\text{CH}_2=\\text{CH}-\\text{CH}=\\text{CH}_2$" },
      { option_key: "D", option_text: "$\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$" }
    ],
    correct_option: "B",
    solution_text: "In but-1-en-3-yne, $\\text{CH}_2=\\text{CH}-\\text{C}\\equiv\\text{CH}$:\n- C1 ($\\text{CH}_2=$): $sp^2$\n- C2 ($=\\text{CH}-$): $sp^2$\n- C3 ($-\\text{C}\\equiv$): $sp$\n- C4 ($\\equiv\\text{CH}$): $sp$\nThis matches $sp^2, sp^2, sp, sp$ from left to right."
  },
  {
    question_number: 42,
    question_text: "The most suitable method of separation of $1 : 1$ mixture of ortho and para-nitrophenols is:",
    options: [
      { option_key: "A", option_text: "chromatography" },
      { option_key: "B", option_text: "crystallisation" },
      { option_key: "C", option_text: "steam distillation" },
      { option_key: "D", option_text: "sublimation" }
    ],
    correct_option: "C",
    solution_text: "ortho-Nitrophenol forms intramolecular hydrogen bonds (chelation), which lowers its boiling point and makes it steam volatile. para-Nitrophenol forms intermolecular hydrogen bonds with higher boiling point and is non-steam volatile. Thus, they are separated by steam distillation."
  },
  {
    question_number: 43,
    question_text: "The correct statement regarding electrophile is:",
    options: [
      { option_key: "A", option_text: "electrophile is a negatively charged species and form a bond by accepting a pair of electrons from another electrophile" },
      { option_key: "B", option_text: "electrophiles are generally neutral species and can form a bond by accepting a pair of electrons from a nucleophile" },
      { option_key: "C", option_text: "electrophile can be either neutral or positively charged species and can form a bond by accepting a pair of electrons from a nucleophile" },
      { option_key: "D", option_text: "electrophile is a negatively charged species and can form a bond by accepting a pair of electrons from a nucleophile." }
    ],
    correct_option: "C",
    solution_text: "Electrophiles are electron-deficient species that can be positively charged (e.g., $\\text{H}^+, \\text{NO}_2^+, \\text{R}^+$) or neutral molecules with an incomplete octet (e.g., $\\text{BF}_3, \\text{AlCl}_3$). They accept an electron pair from a nucleophile to form a covalent bond."
  },
  {
    question_number: 44,
    question_text: "The IUPAC name of the compound is:\n\n![Compound](" + urls.q44_diag + ")",
    options: [
      { option_key: "A", option_text: "5-formylhex-2-en-3-one" },
      { option_key: "B", option_text: "5-methyl-4-oxohex-2-en-5-al" },
      { option_key: "C", option_text: "3-keto-2-methylhex-5-enal" },
      { option_key: "D", option_text: "3-keto-2-methylhex-4-enal" }
    ],
    correct_option: "D",
    solution_text: "The principal functional group is aldehyde ($-\\text{CHO}$), assigned C1. The chain contains 6 carbons: C2 has a methyl group, C3 has an oxo/keto group ($=\\text{O}$), and a double bond is at C4-C5. Hence the IUPAC name is 3-keto-2-methylhex-4-enal."
  },
  {
    question_number: 45,
    question_text: "With respect to the conformers of ethane, which of the following statements is true?",
    options: [
      { option_key: "A", option_text: "Bond angle changes but bond length remains same." },
      { option_key: "B", option_text: "Both bond angle and bond length change." },
      { option_key: "C", option_text: "Both bond angle and bond length remain same." },
      { option_key: "D", option_text: "Bond angle remains same but bond length changes." }
    ],
    correct_option: "C",
    solution_text: "Conformers of ethane are produced by rotation around the carbon-carbon single bond without changing the bond angles or bond lengths."
  },
  {
    question_number: 46,
    question_text: "Which among the given molecules can exhibit tautomerism?\n\n![Molecules I, II, III](" + urls.q46_diag + ")",
    options: [
      { option_key: "A", option_text: "III only" },
      { option_key: "B", option_text: "Both I and III" },
      { option_key: "C", option_text: "Both I and II" },
      { option_key: "D", option_text: "Both II and III" }
    ],
    correct_option: "A",
    solution_text: "Tautomerism requires an enolizable $\\alpha$-hydrogen. In bicyclic bridgehead compounds (Bredt's rule), double bonds cannot be accommodated at bridgehead positions without severe angle strain. Only compound III possesses an accessible, non-bridgehead $\\alpha$-hydrogen that can undergo keto-enol tautomerism."
  },
  {
    question_number: 47,
    question_text: "Which of the following biphenyls is optically active?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q47_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q47_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q47_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q47_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Bulky ortho-substituents in biphenyls cause steric hindrance, restricting rotation about the central C-C single bond (atropisomerism). When both rings are non-planar and neither ring possesses a plane or center of symmetry, the biphenyl is chiral and optically active, as in option (D)."
  },
  {
    question_number: 48,
    question_text: "The correct statement regarding the comparison of staggered and eclipsed conformations of ethane, is:",
    options: [
      { option_key: "A", option_text: "the eclipsed conformation of ethane is more stable than staggered conformation even though the eclipsed conformation has torsional strain" },
      { option_key: "B", option_text: "the staggered conformation of ethane is more stable than eclipsed conformation, because staggered conformation has no torsional strain" },
      { option_key: "C", option_text: "the staggered conformation of ethane is less stable than eclipsed conformation, because staggered conformation has torsional strain" },
      { option_key: "D", option_text: "the eclipsed conformation of ethane is more stable than staggered conformation, because eclipsed conformation has no torsional strain." }
    ],
    correct_option: "B",
    solution_text: "In the staggered conformation of ethane, C-H bonds on adjacent carbons are positioned maximally far apart, minimizing electron cloud repulsion (torsional strain), which makes it more stable than the eclipsed conformation."
  },
  {
    question_number: 49,
    question_text: "Which of the following statements is not correct for a nucleophile?",
    options: [
      { option_key: "A", option_text: "Ammonia is a nucleophile." },
      { option_key: "B", option_text: "Nucleophiles attack low $e^-$ density sites." },
      { option_key: "C", option_text: "Nucleophiles are not electron seeking." },
      { option_key: "D", option_text: "Nucleophile is a Lewis acid." }
    ],
    correct_option: "D",
    solution_text: "Nucleophiles are electron-rich species that donate an electron pair to form a chemical bond, which classifies them as Lewis bases, not Lewis acids."
  },
  {
    question_number: 50,
    question_text: "The possible stereo-structures of $\\text{CH}_3\\text{CHOHCOOH}$, which are optically active, are called:",
    options: [
      { option_key: "A", option_text: "atropisomers" },
      { option_key: "B", option_text: "enantiomers" },
      { option_key: "C", option_text: "mesomers" },
      { option_key: "D", option_text: "diastereomers" }
    ],
    correct_option: "B",
    solution_text: "Lactic acid, $\\text{CH}_3\\text{CH(OH)COOH}$, has one chiral carbon and exists as two non-superimposable mirror image stereoisomers: $d$-lactic acid and $l$-lactic acid, known as enantiomers."
  },
  {
    question_number: 51,
    question_text: "The total number of $\\pi$-bond electrons in the following structure is:\n\n![Structure](" + urls.q51_diag + ")",
    options: [
      { option_key: "A", option_text: "12" },
      { option_key: "B", option_text: "16" },
      { option_key: "C", option_text: "4" },
      { option_key: "D", option_text: "8" }
    ],
    correct_option: "D",
    solution_text: "The conjugated polyene structure contains 4 carbon-carbon double bonds. Each double bond consists of one $\\sigma$ bond and one $\\pi$ bond (2 $\\pi$ electrons). Hence, $4 \\times 2 = 8$ $\\pi$-bond electrons."
  },
  {
    question_number: 52,
    question_text: "Given:\n\n![Compounds](" + urls.q52_diag + ")\n\nWhich of the given compounds can exhibit tautomerism?",
    options: [
      { option_key: "A", option_text: "II and III" },
      { option_key: "B", option_text: "I, II and III" },
      { option_key: "C", option_text: "I and II" },
      { option_key: "D", option_text: "I and III" }
    ],
    correct_option: "B",
    solution_text: "Compounds I, II, and III all have acidic $\\alpha$-hydrogens adjacent to their carbonyl groups (or vinylogous $\\gamma$-positions) that can shift to form stable enol tautomers, meaning all three exhibit tautomerism."
  },
  {
    question_number: 53,
    question_text: "Which of the following is the most correct electron displacement for a nucleophilic reaction to take place?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q53_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q53_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q53_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q53_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "In option (A), the electron displacement flows correctly from the electron-donating methyl group through the conjugated $\\pi$ system towards the electronegative chlorine leaving group: $\\text{H}_3\\text{C} \\rightarrow \\text{C}=\\text{C} \\rightarrow \\text{C}-\\text{Cl}^-$."
  },
  {
    question_number: 54,
    question_text: "In Dumas' method for estimation of nitrogen, $0.25\\text{ g}$ of an organic compound gave $40\\text{ mL}$ of nitrogen collected at $300\\text{ K}$ temperature and $725\\text{ mm}$ pressure. If the aqueous tension at $300\\text{ K}$ is $25\\text{ mm}$, the percentage of nitrogen in the compound is:",
    options: [
      { option_key: "A", option_text: "16.75" },
      { option_key: "B", option_text: "15.76" },
      { option_key: "C", option_text: "17.36" },
      { option_key: "D", option_text: "18.20" }
    ],
    correct_option: "A",
    solution_text: "Actual pressure of dry nitrogen $P = 725 - 25 = 700\\text{ mm Hg}$.\nVolume of nitrogen at STP ($V_0$):\n$$V_0 = \\frac{700 \\times 40 \\times 273}{760 \\times 300} = 33.526\\text{ mL}$$\n$$\\%\\text{N} = \\frac{28 \\times V_0}{22400 \\times w} \\times 100 = \\frac{28 \\times 33.526 \\times 100}{22400 \\times 0.25} = 16.76\\% \\approx 16.75\\%$$."
  },
  {
    question_number: 55,
    question_text: "Consider the following compounds:\n\n![Compounds](" + urls.q55_diag + ")\n\nHyperconjugation occurs in:",
    options: [
      { option_key: "A", option_text: "III only" },
      { option_key: "B", option_text: "I and III" },
      { option_key: "C", option_text: "I only" },
      { option_key: "D", option_text: "II only" }
    ],
    correct_option: "A",
    solution_text: "Hyperconjugation requires an $sp^3$ hybridized carbon with at least one hydrogen atom ($\\alpha$-hydrogen) bonded directly to an unsaturated system or radical. Compound III has $\\alpha$-hydrogens capable of hyperconjugation, whereas I and II do not."
  },
  {
    question_number: 56,
    question_text: "The enolic form of ethyl acetoacetate as shown below has:\n\n![Enolic form](" + urls.q56_diag + ")",
    options: [
      { option_key: "A", option_text: "9 sigma bonds and 2 pi-bonds" },
      { option_key: "B", option_text: "9 sigma bonds and 1 pi-bond" },
      { option_key: "C", option_text: "18 sigma bonds and 2 pi-bonds" },
      { option_key: "D", option_text: "16 sigma bonds and 1 pi-bond." }
    ],
    correct_option: "C",
    solution_text: "Enolic ethyl acetoacetate: $\\text{CH}_3-\\text{C(OH)}=\\text{CH}-\\text{COOCH}_2\\text{CH}_3$.\n- Total atoms = 6 C + 10 H + 3 O = 19 atoms. In an acyclic molecule, number of $\\sigma$ bonds = $19 - 1 = 18$.\n- $\\pi$ bonds: 1 in $\\text{C=C}$ and 1 in $\\text{C=O}$, totaling 2 $\\pi$ bonds.\nTherefore, 18 $\\sigma$ bonds and 2 $\\pi$ bonds."
  },
  {
    question_number: 57,
    question_text: "In which of the following compounds, the C-Cl bond ionisation shall give most stable carbonium ion?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q57_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q57_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q57_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q57_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Ionization of the C-Cl bond in (D) forms the aromatic tropylium carbocation (cycloheptatrienyl cation), which contains $6\\,\\pi$ electrons fully delocalized across a planar 7-membered ring, making it remarkably stable according to Huckel's $(4n+2)$ rule."
  },
  {
    question_number: 58,
    question_text: "In the Kjeldahl's method for estimation of nitrogen present in a soil sample, ammonia evolved from $0.75\\text{ g}$ of sample neutralized $10\\text{ mL}$ of $1\\text{ M } \\text{H}_2\\text{SO}_4$. The percentage of nitrogen in the soil is:",
    options: [
      { option_key: "A", option_text: "37.33" },
      { option_key: "B", option_text: "45.33" },
      { option_key: "C", option_text: "35.33" },
      { option_key: "D", option_text: "43.33" }
    ],
    correct_option: "A",
    solution_text: "Normality of $1\\text{ M } \\text{H}_2\\text{SO}_4 = 1 \\times 2 = 2\\text{ N}$.\n$$\\%\\text{N} = \\frac{1.4 \\times N \\times V}{w} = \\frac{1.4 \\times 2 \\times 10}{0.75} = \\frac{28}{0.75} = 37.33\\%$$."
  },
  {
    question_number: 59,
    question_text: "Arrange the following in increasing order of stability:\n\n1. $(\\text{CH}_3)_2\\text{C}^+-\\text{CH}_2-\\text{CH}_3$\n2. $(\\text{CH}_3)_3\\text{C}^+$\n3. $(\\text{CH}_3)_2\\text{CH}^+$\n4. $\\text{CH}_3-\\text{CH}_2^+$\n5. $\\text{CH}_3^+$",
    options: [
      { option_key: "A", option_text: "5 < 4 < 3 < 1 < 2" },
      { option_key: "B", option_text: "4 < 5 < 3 < 1 < 2" },
      { option_key: "C", option_text: "1 < 5 < 4 < 3 < 2" },
      { option_key: "D", option_text: "5 < 4 < 3 < 2 < 1" }
    ],
    correct_option: "A",
    solution_text: "Carbocation stability increases with the number of $\\alpha$-hydrogens (hyperconjugation):\n- $\\text{CH}_3^+$ (5): 0 $\\alpha$-H\n- $\\text{CH}_3\\text{CH}_2^+$ (4): 3 $\\alpha$-H\n- $(\\text{CH}_3)_2\\text{CH}^+$ (3): 6 $\\alpha$-H\n- $(\\text{CH}_3)_2\\text{C}^+-\\text{CH}_2\\text{CH}_3$ (1): 8 $\\alpha$-H\n- $(\\text{CH}_3)_3\\text{C}^+$ (2): 9 $\\alpha$-H\nTherefore, the increasing order of stability is $5 < 4 < 3 < 1 < 2$."
  },
  {
    question_number: 60,
    question_text: "What is the hybridisation state of benzyl carbonium ion?\n\n![Benzyl carbonium ion](" + urls.q60_diag + ")",
    options: [
      { option_key: "A", option_text: "$sp^2$" },
      { option_key: "B", option_text: "$sp^2d$" },
      { option_key: "C", option_text: "$sp^3d$" },
      { option_key: "D", option_text: "$sp^3$" }
    ],
    correct_option: "A",
    solution_text: "In the benzyl carbonium ion ($\\text{C}_6\\text{H}_5\\overset{+}{\\text{C}}\\text{H}_2$), the positively charged benzylic carbon forms three $\\sigma$ bonds and has a vacant $p$ orbital perpendicular to the plane that overlaps with the aromatic $\\pi$-system, giving it $sp^2$ hybridisation."
  },
  {
    question_number: 61,
    question_text: "Homolytic fission of the following alkanes forms free radicals $\\text{CH}_3-\\text{CH}_3, \\text{CH}_3-\\text{CH}_2-\\text{CH}_3, (\\text{CH}_3)_2\\text{CH}-\\text{CH}_3, \\text{CH}_3-\\text{CH}_2-\\text{CH}(\\text{CH}_3)_2$. Increasing order of stability of the radicals is:",
    options: [
      { option_key: "A", option_text: "$(\\text{CH}_3)_2\\dot{\\text{C}}-\\text{CH}_2\\text{CH}_3 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}_3 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}_2 < (\\text{CH}_3)_3\\dot{\\text{C}}$" },
      { option_key: "B", option_text: "$\\text{CH}_3-\\dot{\\text{C}}\\text{H}_2 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}_3 < (\\text{CH}_3)_2\\dot{\\text{C}}-\\text{CH}_2\\text{CH}_3 < (\\text{CH}_3)_3\\dot{\\text{C}}$" },
      { option_key: "C", option_text: "$\\text{CH}_3-\\dot{\\text{C}}\\text{H}_2 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}_3 < (\\text{CH}_3)_3\\dot{\\text{C}} < (\\text{CH}_3)_2\\dot{\\text{C}}-\\text{CH}_2\\text{CH}_3$" },
      { option_key: "D", option_text: "$(\\text{CH}_3)_3\\dot{\\text{C}} < (\\text{CH}_3)_2\\dot{\\text{C}}-\\text{CH}_2\\text{CH}_3 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}_3 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}_2$" }
    ],
    correct_option: "B",
    solution_text: "Alkyl radical stability follows the order $1^\\circ < 2^\\circ < 3^\\circ$ due to hyperconjugation:\n- $\\text{CH}_3-\\dot{\\text{C}}\\text{H}_2$: 3 $\\alpha$-H\n- $\\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}_3$: 6 $\\alpha$-H\n- $(\\text{CH}_3)_2\\dot{\\text{C}}-\\text{CH}_2\\text{CH}_3$: 8 $\\alpha$-H\n- $(\\text{CH}_3)_3\\dot{\\text{C}}$: 9 $\\alpha$-H\nThus: $\\text{CH}_3-\\dot{\\text{C}}\\text{H}_2 < \\text{CH}_3-\\dot{\\text{C}}\\text{H}-\\text{CH}_3 < (\\text{CH}_3)_2\\dot{\\text{C}}-\\text{CH}_2\\text{CH}_3 < (\\text{CH}_3)_3\\dot{\\text{C}}$."
  },
  {
    question_number: 62,
    question_text: "Which of the following chemical system is non aromatic?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q62_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q62_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q62_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q62_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Compound (D) contains an $sp^3$ hybridized carbon in the cyclic ring (or non-planar geometry), disrupting cyclic conjugation, making it non-aromatic."
  },
  {
    question_number: 63,
    question_text: "Given:\n\n![Projections I and II](" + urls.q63_diag + ")\n\nI and II are:",
    options: [
      { option_key: "A", option_text: "identical" },
      { option_key: "B", option_text: "a pair of conformers" },
      { option_key: "C", option_text: "a pair of geometrical isomers" },
      { option_key: "D", option_text: "a pair of optical isomers" }
    ],
    correct_option: "B",
    solution_text: "The two given representations can be interconverted solely by rotation around the carbon-carbon single bond without breaking any chemical bonds, making them conformational isomers (conformers)."
  },
  {
    question_number: 64,
    question_text: "The radical,\n\n![Radical](" + urls.q64_diag + ")\n\nis aromatic because it has:",
    options: [
      { option_key: "A", option_text: "7 p-orbitals and 7 unpaired electrons" },
      { option_key: "B", option_text: "6 p-orbitals and 7 unpaired electrons" },
      { option_key: "C", option_text: "6 p-orbitals and 6 unpaired electrons" },
      { option_key: "D", option_text: "7 p-orbitals and 6 unpaired electrons." }
    ],
    correct_option: "C",
    solution_text: "The aromatic conjugated system consists of 6 p-orbitals containing 6 delocalized $\\pi$ electrons, fulfilling Huckel's rule for aromaticity."
  },
  {
    question_number: 65,
    question_text: "The structure of isobutyl group in an organic compound is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q65_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q65_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q65_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q65_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "The isobutyl group is $(\\text{CH}_3)_2\\text{CH}-\\text{CH}_2-$, where a 2-propyl branch is connected through a $-\\text{CH}_2-$ carbon to the rest of the molecule, corresponding to (C)."
  },
  {
    question_number: 66,
    question_text: "Structure of the compound whose IUPAC name is 3-Ethyl-2-hydroxy-4-methylhex-3-en-5-ynoic acid is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q66_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q66_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q66_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q66_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "The compound 3-ethyl-2-hydroxy-4-methylhex-3-en-5-ynoic acid has a 6-carbon chain with $-\\text{COOH}$ at C1, $-\\text{OH}$ at C2, an ethyl group at C3, a double bond between C3 and C4, a methyl group at C4, and a triple bond between C5 and C6, as depicted in (D)."
  },
  {
    question_number: 67,
    question_text: "Some meta-directing substituents in aromatic substitution are given. Which one is most deactivating?",
    options: [
      { option_key: "A", option_text: "$-\\text{COOH}$" },
      { option_key: "B", option_text: "$-\\text{NO}_2$" },
      { option_key: "C", option_text: "$-\\text{C}\\equiv\\text{N}$" },
      { option_key: "D", option_text: "$-\\text{SO}_3\\text{H}$" }
    ],
    correct_option: "B",
    solution_text: "The nitro group ($-\\text{NO}_2$) has a formal positive charge on nitrogen and two strongly electronegative oxygen atoms, making it the most powerful electron-withdrawing and deactivating meta-directing group among the given choices."
  },
  {
    question_number: 68,
    question_text: "Which nomenclature is not according to IUPAC system?",
    options: [
      { option_key: "A", option_text: "$\\text{Br}-\\text{CH}_2-\\text{CH}=\\text{CH}_2$ : 1-Bromoprop-2-ene" },
      { option_key: "B", option_text: "$\\text{CH}_3-\\text{CH}_2-\\text{C(Br)(Cl)}-\\text{CH}_2-\\text{CH(CH}_3)_2$ : 4-Bromo-2,4-dimethylhexane" },
      { option_key: "C", option_text: "$\\text{CH}_3-\\text{CH(CH}_3)-\\text{CH(Ph)}-\\text{CH}_2-\\text{CH}_3$ : 2-Methyl-3-phenylpentane" },
      { option_key: "D", option_text: "$\\text{CH}_3-\\text{CO}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2\\text{COOH}$ : 5-oxohexanoic acid" }
    ],
    correct_option: "A",
    solution_text: "In numbering unsaturated hydrocarbons with substituents, double bonds have priority over halogens for receiving lower locants. Thus, $\\text{Br}-\\text{CH}_2-\\text{CH}=\\text{CH}_2$ must be named 3-bromoprop-1-ene, making 1-bromoprop-2-ene incorrect."
  },
  {
    question_number: 69,
    question_text: "Which of the following acids does not exhibit optical isomerism?",
    options: [
      { option_key: "A", option_text: "Maleic acid" },
      { option_key: "B", option_text: "$\\alpha$-amino acids" },
      { option_key: "C", option_text: "Lactic acid" },
      { option_key: "D", option_text: "Tartaric acid" }
    ],
    correct_option: "A",
    solution_text: "Maleic acid (cis-but-2-enedioic acid, $\\text{HOOC}-\\text{CH}=\\text{CH}-\\text{COOH}$) is planar and possesses a plane of symmetry with no asymmetric carbon, so it is optically inactive and does not exhibit optical isomerism."
  },
  {
    question_number: 70,
    question_text: "The IUPAC name of the following compound is:\n\n![Compound](" + urls.q70_diag + ")",
    options: [
      { option_key: "A", option_text: "trans-2-chloro-3-iodo-2-pentene" },
      { option_key: "B", option_text: "cis-3-iodo-4-chloro-3-pentane" },
      { option_key: "C", option_text: "trans-3-iodo-4-chloro-3-pentene" },
      { option_key: "D", option_text: "cis-2-chloro-3-iodo-2-pentene" }
    ],
    correct_option: "A",
    solution_text: "The principal chain has 5 carbon atoms (pent-2-ene). Numbering from the left gives substituents at positions 2 (chloro) and 3 (iodo). The configuration has the higher priority or similar groups on opposite sides, giving trans-2-chloro-3-iodo-2-pentene."
  }
];
