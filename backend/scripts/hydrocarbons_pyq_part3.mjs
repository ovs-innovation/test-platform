import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/hydrocarbons_diagram_urls.json', 'utf8'));

export const part3Questions = [
  {
    question_number: 61,
    question_text: "Using anhydrous $\\text{AlCl}_3$ as catalyst, which one of the following reactions produces ethylbenzene (PhEt)?",
    options: [
      { option_key: "A", option_text: "$\\text{H}_3\\text{C}-\\text{CH}_2\\text{OH} + \\text{C}_6\\text{H}_6$" },
      { option_key: "B", option_text: "$\\text{CH}_3-\\text{CH}=\\text{CH}_2 + \\text{C}_6\\text{H}_6$" },
      { option_key: "C", option_text: "$\\text{H}_2\\text{C}=\\text{CH}_2 + \\text{C}_6\\text{H}_6$" },
      { option_key: "D", option_text: "$\\text{H}_3\\text{C}-\\text{CH}_3 + \\text{C}_6\\text{H}_6$" }
    ],
    correct_option: "C",
    solution_text: "Alkylation of benzene with ethene ($\\text{H}_2\\text{C}=\\text{CH}_2$) in the presence of anhydrous $\\text{AlCl}_3$ and $\\text{HCl}$ proceeds through generation of an ethyl carbocation ($\\text{CH}_3\\text{CH}_2^+$), which undergoes electrophilic aromatic substitution on benzene to form ethylbenzene ($\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH}_3$)."
  },
  {
    question_number: 62,
    question_text: "Reaction of $\\text{HBr}$ with propene in the presence of peroxide gives:",
    options: [
      { option_key: "A", option_text: "isopropyl bromide" },
      { option_key: "B", option_text: "3-bromopropane" },
      { option_key: "C", option_text: "allyl bromide" },
      { option_key: "D", option_text: "n-propyl bromide" }
    ],
    correct_option: "D",
    solution_text: "In the presence of organic peroxides, addition of $\\text{HBr}$ to propene proceeds via a free-radical chain mechanism (peroxide effect / Kharasch effect). The bromine free radical attacks the terminal carbon atom to form the more stable secondary alkyl free radical, yielding 1-bromopropane (n-propyl bromide) as the major anti-Markovnikov product."
  },
  {
    question_number: 63,
    question_text: "The compound:\n\n![Starting Alkene](" + urls.q63_diag + ")\n\non reaction with $\\text{NaIO}_4$ in the presence of $\\text{KMnO}_4$ gives:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3\\text{COCH}_3$" },
      { option_key: "B", option_text: "$\\text{CH}_3\\text{COCH}_3 + \\text{CH}_3\\text{COOH}$" },
      { option_key: "C", option_text: "$\\text{CH}_3\\text{COCH}_3 + \\text{CH}_3\\text{CHO}$" },
      { option_key: "D", option_text: "$\\text{CH}_3\\text{CHO} + \\text{CO}_2$" }
    ],
    correct_option: "B",
    solution_text: "Oxidative cleavage of 2-methylbut-2-ene ($(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3$) with Lemieux reagent ($\\text{KMnO}_4 / \\text{NaIO}_4$) cleaves the carbon-carbon double bond completely: the disubstituted carbon $(=\\text{C}(\\text{CH}_3)_2)$ is converted to acetone ($\\text{CH}_3\\text{COCH}_3$), while the monosubstituted carbon ($=\\text{CH}-\\text{CH}_3$) is oxidized to acetic acid ($\\text{CH}_3\\text{COOH}$)."
  },
  {
    question_number: 64,
    question_text: "Which one of the following is a free-radical substitution reaction?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q64_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q64_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q64_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q64_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Chlorination of toluene at high temperature or under UV light without Lewis acid occurs on the side-chain methyl group via a free-radical substitution mechanism to produce benzyl chloride (Option A). Reaction B is electrophilic aromatic substitution, C is nucleophilic substitution, and D is nucleophilic addition."
  },
  {
    question_number: 65,
    question_text: "The correct order of reactivity towards the electrophilic substitution of the compounds aniline (I), benzene (II) and nitrobenzene (III) is:",
    options: [
      { option_key: "A", option_text: "III > II > I" },
      { option_key: "B", option_text: "II > III > I" },
      { option_key: "C", option_text: "I < II > III" },
      { option_key: "D", option_text: "I > II > III" }
    ],
    correct_option: "D",
    solution_text: "In aniline (I), the amino group ($-\\text{NH}_2$) donates electron density into the ring through a strong $+M$ resonance effect, strongly activating the ring toward electrophiles. In nitrobenzene (III), the nitro group ($-\\text{NO}_2$) withdraws electron density by both strong $-M$ and $-I$ effects, strongly deactivating the ring. Benzene (II) has intermediate reactivity. Therefore, the order is $\\text{I} > \\text{II} > \\text{III}$."
  },
  {
    question_number: 66,
    question_text: "When $\\text{CH}_3\\text{CH}_2\\text{CHCl}_2$ is treated with $\\text{NaNH}_2$, the product formed is:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3-\\text{CH}=\\text{CH}_2$" },
      { option_key: "B", option_text: "$\\text{CH}_3-\\text{C}\\equiv\\text{CH}$" },
      { option_key: "C", option_text: "$\\text{CH}_3\\text{CH}_2\\text{CH}(\\text{NH}_2)_2$" },
      { option_key: "D", option_text: "$\\text{CH}_3\\text{CH}_2\\text{CH}=\\text{NH}$" }
    ],
    correct_option: "B",
    solution_text: "1,1-Dichloropropane is a geminal dihalide. When treated with the strong base sodamide ($\\text{NaNH}_2$), it undergoes double dehydrohalogenation (loss of two molecules of $\\text{HCl}$) to form propyne, $\\text{CH}_3-\\text{C}\\equiv\\text{CH}$."
  },
  {
    question_number: 67,
    question_text: "In preparation of alkene from alcohol using $\\text{Al}_2\\text{O}_3$, which is the effective factor?",
    options: [
      { option_key: "A", option_text: "Porosity of $\\text{Al}_2\\text{O}_3$" },
      { option_key: "B", option_text: "Temperature" },
      { option_key: "C", option_text: "Concentration" },
      { option_key: "D", option_text: "Surface area of $\\text{Al}_2\\text{O}_3$" }
    ],
    correct_option: "B",
    solution_text: "In the catalytic dehydration of alcohols over alumina ($\\text{Al}_2\\text{O}_3$), temperature determines the reaction course: at lower temperatures (~$513-523\\text{ K}$), intermolecular dehydration predominantly gives ethers, while at higher temperatures (~$623\\text{ K}$), intramolecular dehydration occurs to give alkenes."
  },
  {
    question_number: 68,
    question_text: "Increasing order of electrophilic substitution for following compounds:\n\n![Compounds I to IV](" + urls.q68_diag + ")",
    options: [
      { option_key: "A", option_text: "IV < I < II < III" },
      { option_key: "B", option_text: "III < II < I < IV" },
      { option_key: "C", option_text: "I < IV < III < II" },
      { option_key: "D", option_text: "II < III < I < IV" }
    ],
    correct_option: "A",
    solution_text: "Electrophilic aromatic substitution reactivity depends on substituent electronic effects:\n- III: Methoxy group ($-\\text{OCH}_3$) strongly activates the ring by $+M$ resonance $\\rightarrow$ most reactive\n- II: Methyl group ($-\\text{CH}_3$) activates the ring by hyperconjugation and $+I$ effect\n- I: Benzene (unsubstituted standard)\n- IV: Trifluoromethyl group ($-\\text{CF}_3$) strongly deactivates the ring by strong $-I$ effect $\\rightarrow$ least reactive\nThus, the increasing order is $\\text{IV} < \\text{I} < \\text{II} < \\text{III}$."
  },
  {
    question_number: 69,
    question_text: "In Friedel-Crafts reaction, toluene can be prepared by:",
    options: [
      { option_key: "A", option_text: "$\\text{C}_6\\text{H}_6 + \\text{CH}_3\\text{Cl}$" },
      { option_key: "B", option_text: "$\\text{C}_6\\text{H}_5\\text{Cl} + \\text{CH}_4$" },
      { option_key: "C", option_text: "$\\text{C}_6\\text{H}_6 + \\text{CH}_2\\text{Cl}_2$" },
      { option_key: "D", option_text: "$\\text{C}_6\\text{H}_6 + \\text{CH}_3\\text{COCl}$" }
    ],
    correct_option: "A",
    solution_text: "In Friedel-Crafts alkylation, benzene ($\\text{C}_6\\text{H}_6$) reacts with chloromethane ($\\text{CH}_3\\text{Cl}$) in the presence of anhydrous aluminum chloride ($\\text{AlCl}_3$) to form toluene ($\\text{C}_6\\text{H}_5\\text{CH}_3$) and hydrogen chloride."
  },
  {
    question_number: 70,
    question_text: "Which reagent converts propene to 1-propanol?",
    options: [
      { option_key: "A", option_text: "$\\text{H}_2\\text{O}, \\text{H}_2\\text{SO}_4$" },
      { option_key: "B", option_text: "$\\text{B}_2\\text{H}_6, \\text{H}_2\\text{O}_2, \\text{OH}^-$" },
      { option_key: "C", option_text: "$\\text{Hg(OAc)}_2, \\text{NaBH}_4/\\text{H}_2\\text{O}$" },
      { option_key: "D", option_text: "Aq. $\\text{KOH}$" }
    ],
    correct_option: "B",
    solution_text: "Hydroboration-oxidation using diborane ($\\text{B}_2\\text{H}_6$) followed by oxidation with alkaline hydrogen peroxide ($\\text{H}_2\\text{O}_2/\\text{OH}^-$) adds water across the double bond with anti-Markovnikov regiochemistry, converting propene into 1-propanol."
  },
  {
    question_number: 71,
    question_text: "Which is maximum stable?",
    options: [
      { option_key: "A", option_text: "1-Butene" },
      { option_key: "B", option_text: "cis-2-Butene" },
      { option_key: "C", option_text: "trans-2-Butene" },
      { option_key: "D", option_text: "All have same stability." }
    ],
    correct_option: "C",
    solution_text: "trans-2-Butene has its two bulky methyl groups oriented on opposite sides of the carbon-carbon double bond, which minimizes steric hindrance (van der Waals strain) between them. In cis-2-butene, steric crowding between the adjacent cis-methyl groups destabilizes the molecule. 1-Butene is monosubstituted and has fewer $\\alpha$-hydrogens, making it less stable than 2-butene. Hence, trans-2-butene has maximum stability."
  },
  {
    question_number: 72,
    question_text: "2-Butene shows geometrical isomerism due to:",
    options: [
      { option_key: "A", option_text: "restricted rotation about double bond" },
      { option_key: "B", option_text: "free rotation about double bond" },
      { option_key: "C", option_text: "free rotation about single bond" },
      { option_key: "D", option_text: "chiral carbon" }
    ],
    correct_option: "A",
    solution_text: "Geometrical isomerism arises when there is restricted rotation around a carbon-carbon double bond due to the lateral overlap of $p$-orbitals forming the $\\pi$-bond, and each doubly-bonded carbon carries two different substituents (here, $-\\text{H}$ and $-\\text{CH}_3$)."
  },
  {
    question_number: 73,
    question_text: "When acetylene is passed through dil. $\\text{H}_2\\text{SO}_4$ in presence of $\\text{HgSO}_4$, the compound formed is:",
    options: [
      { option_key: "A", option_text: "ether" },
      { option_key: "B", option_text: "ketone" },
      { option_key: "C", option_text: "acetic acid" },
      { option_key: "D", option_text: "acetaldehyde" }
    ],
    correct_option: "D",
    solution_text: "Hydration of acetylene (ethyne) in the presence of dilute sulfuric acid and mercuric sulfate catalyst adds water across the triple bond to form vinyl alcohol ($\\text{CH}_2=\\text{CHOH}$), which rapidly tautomerizes into acetaldehyde (ethanal, $\\text{CH}_3\\text{CHO}$)."
  },
  {
    question_number: 74,
    question_text: "In Friedel-Craft's alkylation, besides $\\text{AlCl}_3$ the other reactants are:",
    options: [
      { option_key: "A", option_text: "$\\text{C}_6\\text{H}_6 + \\text{NH}_3$" },
      { option_key: "B", option_text: "$\\text{C}_6\\text{H}_6 + \\text{CH}_4$" },
      { option_key: "C", option_text: "$\\text{C}_6\\text{H}_6 + \\text{CH}_3\\text{Cl}$" },
      { option_key: "D", option_text: "$\\text{C}_6\\text{H}_5\\text{Cl} + \\text{CH}_3\\text{COCl}$" }
    ],
    correct_option: "C",
    solution_text: "Friedel-Crafts alkylation involves reaction between an aromatic hydrocarbon (such as benzene, $\\text{C}_6\\text{H}_6$) and an alkyl halide (such as chloromethane, $\\text{CH}_3\\text{Cl}$) in the presence of anhydrous Lewis acid $\\text{AlCl}_3$."
  },
  {
    question_number: 75,
    question_text: "Which of the following compounds will be more easily attacked by an electrophile?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q75_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q75_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q75_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q75_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Phenol (C) contains the hydroxyl group ($-\\text{OH}$), whose oxygen atom donates its unshared lone pair of electrons into the aromatic $\\pi$-system via a powerful $+M$ resonance effect. This dramatically increases electron density at the ortho and para positions, making phenol much more susceptible to electrophilic attack than chlorobenzene, benzene, or nitrobenzene."
  },
  {
    question_number: 76,
    question_text: "Which one of these, is not compatible with arenes?",
    options: [
      { option_key: "A", option_text: "Greater stability" },
      { option_key: "B", option_text: "Delocalisation of $\\pi$-electrons" },
      { option_key: "C", option_text: "Electrophilic additions" },
      { option_key: "D", option_text: "Resonance" }
    ],
    correct_option: "C",
    solution_text: "Arenes possess high resonance stabilization energy due to cyclic delocalization of $\\pi$-electrons. Electrophilic addition reactions disrupt this stable aromatic $\\pi$-sextet and destroy aromaticity, which is energetically unfavorable. Therefore, arenes typically undergo electrophilic aromatic substitution rather than addition."
  },
  {
    question_number: 77,
    question_text: "Which one of the following compounds will be most easily attacked by an electrophile?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q77_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q77_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q77_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q77_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Phenol (D) is the most activated compound among the choices because the $-\\text{OH}$ group donates electrons into the ring via strong $+M$ resonance, significantly exceeding the weaker hyperconjugative activation of methyl in toluene (C) and the deactivating effects of halogen in chlorobenzene (A) and benzene (B)."
  },
  {
    question_number: 78,
    question_text: "Which of the following reaction is expected to readily give a hydrocarbon product in good yields?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q78_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q78_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q78_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q78_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Kolbe's electrolytic synthesis (C) involves the electrolysis of an aqueous solution of a potassium or sodium carboxylate ($\\text{RCOOK}$), which undergoes anodic decarboxylation and free-radical coupling to yield the symmetrical alkane ($\\text{R}-\\text{R}$) in good yields."
  },
  {
    question_number: 79,
    question_text: "In a reaction:\n\n$$\\text{CH}_2=\\text{CH}_2 \\xrightarrow{\\text{Hypochlorous acid}} \\text{M} \\xrightarrow{\\text{R}} \\begin{matrix} \\text{CH}_2\\text{OH} \\\\ | \\\\ \\text{CH}_2\\text{OH} \\end{matrix}$$\n\nwhere M = Molecule and R = Reagent. M and R are:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3\\text{CH}_2\\text{OH}$ and $\\text{HCl}$" },
      { option_key: "B", option_text: "$\\text{CH}_2=\\text{CH}_2$ and heat" },
      { option_key: "C", option_text: "$\\text{CH}_3\\text{CH}_2\\text{Cl}$ and $\\text{NaOH}$" },
      { option_key: "D", option_text: "$\\text{CH}_2\\text{Cl}-\\text{CH}_2\\text{OH}$ and aq. $\\text{NaHCO}_3$" }
    ],
    correct_option: "D",
    solution_text: "Addition of hypochlorous acid ($\\text{HOCl}$) to ethene yields ethylene chlorohydrin ($\\text{Cl}-\\text{CH}_2-\\text{CH}_2-\\text{OH}$, M). Mild alkaline hydrolysis using aqueous sodium bicarbonate (aq. $\\text{NaHCO}_3$, R) hydrolyzes the chloro group to yield ethane-1,2-diol (ethylene glycol)."
  },
  {
    question_number: 80,
    question_text: "The cylindrical shape of an alkyne is due to:",
    options: [
      { option_key: "A", option_text: "two sigma C – C and one $\\pi$ C – C bonds" },
      { option_key: "B", option_text: "one sigma C – C and two $\\pi$ C – C bonds" },
      { option_key: "C", option_text: "three sigma C – C bonds" },
      { option_key: "D", option_text: "three $\\pi$ C – C bonds" }
    ],
    correct_option: "B",
    solution_text: "In an alkyne ($\\text{R}-\\text{C}\\equiv\\text{C}-\\text{R}$), the carbon-carbon triple bond consists of one $\\sigma$-bond and two mutually perpendicular $\\pi$-bonds formed by the overlap of unhybridized $2p_y$ and $2p_z$ orbitals. The two perpendicular $\\pi$-electron clouds merge around the internuclear axis to form a single, cylindrically symmetrical $\\pi$-electron cloud."
  },
  {
    question_number: 81,
    question_text: "In the commercial gasolines, the type of hydrocarbons which are more desirable is:",
    options: [
      { option_key: "A", option_text: "linear unsaturated hydrocarbon" },
      { option_key: "B", option_text: "toluene" },
      { option_key: "C", option_text: "branched hydrocarbon" },
      { option_key: "D", option_text: "straight-chain hydrocarbon" }
    ],
    correct_option: "C",
    solution_text: "Branched hydrocarbons have significantly higher octane numbers and burn smoothly without premature detonation (knocking) in combustion engines compared to straight-chain hydrocarbons, making them highly desirable fuel components."
  },
  {
    question_number: 82,
    question_text: "Among the following compounds (I-III), the correct reaction with electrophile is:\n\n![Compounds I to III](" + urls.q82_diag + ")",
    options: [
      { option_key: "A", option_text: "II > I > III" },
      { option_key: "B", option_text: "I = II > III" },
      { option_key: "C", option_text: "II > III > I" },
      { option_key: "D", option_text: "III < I < II" }
    ],
    correct_option: "A",
    solution_text: "Compound II is anisole (methoxybenzene), which has an strongly activating $-\\text{OCH}_3$ group ($+M$). Compound I is toluene, which has a moderately activating $-\\text{CH}_3$ group ($+I$, hyperconjugation). Compound III is nitrobenzene, which has a strongly deactivating $-\\text{NO}_2$ group ($-M, -I$). Hence, the reactivity toward electrophilic substitution follows $\\text{II} > \\text{I} > \\text{III}$."
  },
  {
    question_number: 83,
    question_text: "The most stable conformation of n-butane is:",
    options: [
      { option_key: "A", option_text: "gauche" },
      { option_key: "B", option_text: "staggered" },
      { option_key: "C", option_text: "skew boat" },
      { option_key: "D", option_text: "eclipsed" }
    ],
    correct_option: "B",
    solution_text: "The anti-staggered conformation of n-butane (dihedral angle of $180^\\circ$ between the two methyl groups) has minimal torsional strain and zero steric (van der Waals) repulsion between methyl groups, making it the most stable conformer."
  },
  {
    question_number: 84,
    question_text: "Which of the following is used as an antiknocking material?",
    options: [
      { option_key: "A", option_text: "Glyoxal" },
      { option_key: "B", option_text: "Freon" },
      { option_key: "C", option_text: "T.E.L." },
      { option_key: "D", option_text: "Ethyl alcohol" }
    ],
    correct_option: "C",
    solution_text: "Tetraethyllead (T.E.L.), $(\\text{C}_2\\text{H}_5)_4\\text{Pb}$, is used as an antiknocking agent in motor fuels to increase their octane rating and ensure smooth fuel combustion."
  },
  {
    question_number: 85,
    question_text: "Electrophile in the case of chlorination of benzene in the presence of $\\text{FeCl}_3$ is:",
    options: [
      { option_key: "A", option_text: "$\\text{Cl}$" },
      { option_key: "B", option_text: "$\\text{FeCl}_4^-$" },
      { option_key: "C", option_text: "$\\text{Cl}^+$" },
      { option_key: "D", option_text: "$\\text{Cl}^-$" }
    ],
    correct_option: "C",
    solution_text: "The Lewis acid catalyst $\\text{FeCl}_3$ polarizes the chlorine molecule and abstracts a chloride ion to form the chloronium electrophile: $\\text{Cl}_2 + \\text{FeCl}_3 \\rightarrow \\text{Cl}^+ + \\text{FeCl}_4^-$. The chloronium ion ($\\text{Cl}^+$) then attacks the electron-rich aromatic ring."
  }
];

