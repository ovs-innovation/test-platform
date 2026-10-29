export const SOLUTIONS_PART5 = [
  // =========================================================================
  // SECTION A: OBJECTIVE TYPE QUESTIONS (Q155 - Q159)
  // =========================================================================
  // Q155
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Freezing Point of Ethylene Glycol Solution',
    question_type: 'mcq',
    question_text: "$31\\,\\text{g}$ of ethylene glycol ($\\text{C}_2\\text{H}_6\\text{O}_2$) is mixed with $500\\,\\text{g}$ of water. What will be the freezing point of water? [$K_f\\text{ for water} = 1.86\\,\\text{K kg mol}^{-1}$]",
    options: ['269.14 K', '271.29 K', '275.01 K', '273.95 K'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Molar mass of ethylene glycol ($\\text{C}_2\\text{H}_6\\text{O}_2$) $= 2(12) + 6(1) + 2(16) = 62\\,\\text{g/mol}$. Moles of solute $= \\frac{31\\,\\text{g}}{62\\,\\text{g/mol}} = 0.5\\,\\text{mol}$. Mass of water $= 500\\,\\text{g} = 0.5\\,\\text{kg}$. Molality $m = \\frac{0.5\\,\\text{mol}}{0.5\\,\\text{kg}} = 1.0\\,\\text{mol kg}^{-1}$. Depression in freezing point $\\Delta T_f = K_f \\times m = 1.86\\,\\text{K kg mol}^{-1} \\times 1.0\\,\\text{mol kg}^{-1} = 1.86\\,\\text{K}$. Freezing point of pure water $= 273.15\\,\\text{K}$. Freezing point of the solution $= 273.15 - 1.86 = 271.29\\,\\text{K}$."
  },
  // Q156
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Enthalpy of Solution on Dilution',
    question_type: 'mcq',
    question_text: "The magnitude of heat of solution on addition of solvent to solution",
    options: ['Decreases', 'Increases', 'Remains constant', 'Increases or decreases'],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "When more solvent is added to a solution (dilution), additional solute-solvent interactions take place until infinite dilution is reached. Consequently, the cumulative magnitude of heat of solution increases towards the limiting value of heat of solution at infinite dilution."
  },
  // Q157
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Colligative Variations with Solvent Mole Fraction',
    question_type: 'mcq',
    question_text: "If the mole fraction of the solvent in a solution decreases, then",
    options: [
      'Vapour pressure of solution increases',
      'Boiling point decreases',
      'Osmotic pressure increases',
      'All are correct statements'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "If the mole fraction of the solvent ($x_{\\text{solvent}}$) decreases, the mole fraction and concentration of the solute ($x_{\\text{solute}} = 1 - x_{\\text{solvent}}$) increases. As solute concentration increases:\n1. Vapour pressure ($P = P^\\circ x_{\\text{solvent}}$) decreases.\n2. Boiling point elevation increases, so boiling point increases.\n3. Osmotic pressure $\\pi = C R T$ increases linearly with solute concentration.\nThus, statement (3) is correct."
  },
  // Q158
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Isotonic Electrolyte Solutions',
    question_type: 'mcq',
    question_text: "Which one is isotonic with $3\\,\\text{M NaCl}$ aqueous solution?",
    options: [
      '$3\\,\\text{M Urea}$',
      '$2\\,\\text{M BaCl}_2$',
      '$1\\,\\text{M AlCl}_3$',
      '$2\\,\\text{M KCl}$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Isotonic solutions have equal effective osmolar concentrations ($i \\times C$). For $3\\,\\text{M NaCl}$: $i = 2 \\implies i C = 2 \\times 3\\,\\text{M} = 6\\,\\text{M}$. Evaluating the options:\n1. $3\\,\\text{M Urea}$: $i = 1 \\implies i C = 1 \\times 3 = 3\\,\\text{M}$\n2. $2\\,\\text{M BaCl}_2$: $i = 3 \\implies i C = 3 \\times 2 = 6\\,\\text{M}$\n3. $1\\,\\text{M AlCl}_3$: $i = 4 \\implies i C = 4 \\times 1 = 4\\,\\text{M}$\n4. $2\\,\\text{M KCl}$: $i = 2 \\implies i C = 2 \\times 2 = 4\\,\\text{M}$\nTherefore, $2\\,\\text{M BaCl}_2$ is isotonic with $3\\,\\text{M NaCl}$."
  },
  // Q159
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Relative Lowering of Vapour Pressure Order',
    question_type: 'mcq',
    question_text: "Consider the following $0.01\\,\\text{M}$ aqueous solutions of:\nI. $\\text{KCl}$\nII. $\\text{CaCl}_2$\nIII. Glucose\n\nThe relative lowering of vapour pressure will be in the order:",
    options: [
      '$\\text{III} > \\text{II} > \\text{I}$',
      '$\\text{I} > \\text{II} > \\text{III}$',
      '$\\text{III} > \\text{I} > \\text{II}$',
      '$\\text{II} > \\text{I} > \\text{III}$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Relative lowering of vapour pressure is a colligative property proportional to the total concentration of dissolved particles: $\\frac{\\Delta P}{P^\\circ} \\propto i \\times C$.\nI. $\\text{KCl}$: $i = 2 \\implies i C = 2 \\times 0.01 = 0.02\\,\\text{M}$\nII. $\\text{CaCl}_2$: $i = 3 \\implies i C = 3 \\times 0.01 = 0.03\\,\\text{M}$\nIII. Glucose: $i = 1 \\implies i C = 1 \\times 0.01 = 0.01\\,\\text{M}$\nComparing values: $0.03\\text{ (II)} > 0.02\\text{ (I)} > 0.01\\text{ (III)}$, so the order is $\\text{II} > \\text{I} > \\text{III}$."
  },

  // =========================================================================
  // SECTION B: ASSERTION - REASON TYPE QUESTIONS (Q1 - Q12)
  // =========================================================================
  // Sec B Q1
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Azeotropes: Ethanol-Water',
    question_type: 'assertion_reason',
    assertion_text: "Ethanol water mixture forms minimum boiling azeotropes.",
    reason_text: "95.4% ethanol in water (by volume), the liquid and vapour have the same composition, and no further separation occurs.",
    question_text: "Assertion (A): Ethanol water mixture forms minimum boiling azeotropes.\nReason (R): 95.4% ethanol in water (by volume), the liquid and vapour have the same composition, and no further separation occurs.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Assertion is true: Ethanol and water show positive deviation from Raoult's law and form a minimum boiling azeotrope. Reason is true and correctly explains the assertion: At 95.4% by volume (95.6% by mass), the mixture boils at a constant minimum temperature of 78.13°C where liquid and vapour compositions are identical, preventing further separation by fractional distillation."
  },
  // Sec B Q2
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ideal Solutions: Ethyl Halides',
    question_type: 'assertion_reason',
    assertion_text: "$\\text{C}_2\\text{H}_5\\text{I}$ and $\\text{C}_2\\text{H}_5\\text{Br}$ form ideal solution.",
    reason_text: "The interaction between the components are similar to those in the pure components.",
    question_text: "Assertion (A): $\\text{C}_2\\text{H}_5\\text{I}$ and $\\text{C}_2\\text{H}_5\\text{Br}$ form ideal solution.\nReason (R): The interaction between the components are similar to those in the pure components.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Ethyl iodide and ethyl bromide have almost identical molecular sizes, shapes, and dipole-dipole interactions. As a result, the A-B intermolecular forces are nearly identical to A-A and B-B forces, which defines an ideal solution ($\\Delta H_{\\text{mix}} = 0, \\Delta V_{\\text{mix}} = 0$)."
  },
  // Sec B Q3
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Azeotropes: Composition in Phases',
    question_type: 'assertion_reason',
    assertion_text: "Azeotropes have different composition in liquid and vapour state depending upon the volatility of components.",
    reason_text: "Composition in both, liquid and vapour phase depends upon volatility of the substance.",
    question_text: "Assertion (A): Azeotropes have different composition in liquid and vapour state depending upon the volatility of components.\nReason (R): Composition in both, liquid and vapour phase depends upon volatility of the substance.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Assertion is false: By definition, an azeotrope is a constant boiling mixture whose composition in the liquid phase is identical to that in the vapour phase. Reason is also false in the context of azeotropic mixtures, where liquid and vapour phase compositions remain strictly identical and do not separate based on volatility."
  },
  // Sec B Q4
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Raoult's Law Applicability",
    question_type: 'assertion_reason',
    assertion_text: "Raoult's law for the solution of non-volatile solute can be given as $\\frac{P^\\circ - P_s}{P^\\circ} = \\frac{n_{\\text{solute}}}{n_{\\text{solvent}} + n_{\\text{solute}}}$.",
    reason_text: "Raoult's law is not applicable for the solution of $\\text{FeCl}_3$ in water.",
    question_text: "Assertion (A): Raoult's law for the solution of non-volatile solute can be given as $\\frac{P^\\circ - P_s}{P^\\circ} = \\frac{n_{\\text{solute}}}{n_{\\text{solvent}} + n_{\\text{solute}}}$.\nReason (R): Raoult's law is not applicable for the solution of $\\text{FeCl}_3$ in water.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Assertion is true: For a non-volatile, non-electrolyte solute, relative lowering of vapour pressure equals mole fraction of the solute: $\\frac{P^\\circ - P_s}{P^\\circ} = x_{\\text{solute}} = \\frac{n_{\\text{solute}}}{n_{\\text{solvent}} + n_{\\text{solute}}}$. Reason is true: $\\text{FeCl}_3$ is an electrolyte that dissociates into ions ($\\text{Fe}^{3+} + 3\\text{Cl}^-$) and undergoes hydrolysis in water, so standard uncorrected Raoult's law is not directly applicable. However, Reason is not the explanation of Assertion."
  },
  // Sec B Q5
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Vapour Pressure of Volatile Binary Mixture",
    question_type: 'assertion_reason',
    assertion_text: "Total vapour pressure over the solution can be related to the mole fraction of any one component when both components are volatile.",
    reason_text: "Total vapour pressure over the solution varies linearly with the mole fraction of component which is more volatile.",
    question_text: "Assertion (A): Total vapour pressure over the solution can be related to the mole fraction of any one component when both components are volatile.\nReason (R): Total vapour pressure over the solution varies linearly with the mole fraction of component which is more volatile.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Assertion is true: According to Raoult's law, $P_{\\text{total}} = P_1^\\circ x_1 + P_2^\\circ x_2 = P_1^\\circ + (P_2^\\circ - P_1^\\circ)x_2$. Because $x_1 + x_2 = 1$, total vapour pressure can be written in terms of the mole fraction of either component. Reason is also true as $P_{\\text{total}}$ varies linearly with mole fraction of component 2 (or the more volatile component), but it does not explain why it can be related to any one component (which is due to $x_1 + x_2 = 1$)."
  },
  // Sec B Q6
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law: Gas Solubility in Blood",
    question_type: 'assertion_reason',
    assertion_text: "Increased pressure increases the solubility of atmospheric gases in blood.",
    reason_text: "Decrease in temperature decreases the solubility of atmospheric gases in blood.",
    question_text: "Assertion (A): Increased pressure increases the solubility of atmospheric gases in blood.\nReason (R): Decrease in temperature decreases the solubility of atmospheric gases in blood.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Assertion is true: According to Henry's law ($m = K_H \\cdot P$), increasing the pressure of gases increases their solubility in blood (as experienced by deep-sea scuba divers). Reason is false: The dissolution of gases in liquid is an exothermic process ($\\Delta H < 0$). By Le Chatelier's principle, a decrease in temperature increases the solubility of gases, not decreases it."
  },
  // Sec B Q7
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Temperature Independence of Mass Concentrations',
    question_type: 'assertion_reason',
    assertion_text: "Mass %, ppm, mole fraction and molality are independent of temperature.",
    reason_text: "Volume depends on temperature and mass does not.",
    question_text: "Assertion (A): Mass %, ppm, mole fraction and molality are independent of temperature.\nReason (R): Volume depends on temperature and mass does not.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Mass %, ppm, mole fraction, and molality are defined solely in terms of masses of solute and solvent. Because mass does not change with temperature while volume expands or contracts, mass-based concentration terms are temperature-independent."
  },
  // Sec B Q8
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Definition of Solvent and Physical State',
    question_type: 'assertion_reason',
    assertion_text: "The component that is present in largest quantity is known as solvent.",
    reason_text: "Solvent determines the physical state in which solution exists.",
    question_text: "Assertion (A): The component that is present in largest quantity is known as solvent.\nReason (R): Solvent determines the physical state in which solution exists.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Both Assertion and Reason are true, but Reason is not the correct explanation. By convention, the component present in the largest amount in a solution is designated as the solvent. Furthermore, the physical state of the solvent dictates whether the solution is a gas, liquid, or solid."
  },
  // Sec B Q9
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmosis and Osmotic Pressure',
    question_type: 'assertion_reason',
    assertion_text: "In the osmosis process, the solvent molecules will flow through the membrane from pure solvent to the solution.",
    reason_text: "The flow of solvent from solution of low concentration side across a semipermeable membrane can be stopped if some excess pressure is applied on the solution.",
    question_text: "Assertion (A): In the osmosis process, the solvent molecules will flow through the membrane from pure solvent to the solution.\nReason (R): The flow of solvent from solution of low concentration side across a semipermeable membrane can be stopped if some excess pressure is applied on the solution.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Assertion is true: Solvent molecules spontaneously flow from a region of higher chemical potential (pure solvent) to lower chemical potential (solution). Reason is true: The excess hydrostatic pressure applied to the solution to just prevent this flow of solvent is defined as the osmotic pressure ($\\pi$). However, Reason defines osmotic pressure and does not explain the thermodynamic driving force of osmosis."
  },
  // Sec B Q10
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ethanoic Acid Dimerisation and Colligative Properties',
    question_type: 'assertion_reason',
    assertion_text: "Molecules of ethanoic acid normally dimerise in solvents of low dielectric constant.",
    reason_text: "Dimerisation does not affect the colligative properties.",
    question_text: "Assertion (A): Molecules of ethanoic acid normally dimerise in solvents of low dielectric constant.\nReason (R): Dimerisation does not affect the colligative properties.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Assertion is true: In solvents of low dielectric constant such as benzene, acetic acid forms stable cyclic dimers via two intermolecular hydrogen bonds ($2\\text{CH}_3\\text{COOH} \\rightleftharpoons (\\text{CH}_3\\text{COOH})_2$). Reason is false: Dimerisation reduces the total number of solute particles by half, which significantly reduces the magnitude of all colligative properties and doubles the observed molar mass."
  },
  // Sec B Q11
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ethanol and Acetone Positive Deviation',
    question_type: 'assertion_reason',
    assertion_text: "Mixtures of ethanol and acetone show positive deviation.",
    reason_text: "The molecules of acetone get in between the ethanol molecules and break some of the hydrogen bonds between them.",
    question_text: "Assertion (A): Mixtures of ethanol and acetone show positive deviation.\nReason (R): The molecules of acetone get in between the ethanol molecules and break some of the hydrogen bonds between them.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. In pure ethanol, molecules are extensively hydrogen bonded. When acetone is added, acetone molecules position themselves between ethanol molecules and break part of the hydrogen-bonded network. Consequently, the intermolecular attractions are weakened (A-B < A-A and B-B), leading to higher vapour pressure and positive deviation from Raoult's law."
  },
  // Sec B Q12
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Abnormal Molar Mass from Electrolyte Dissociation',
    question_type: 'assertion_reason',
    assertion_text: "When there is a dissociation of solute into ions, the experimentally determined molar mass is always lower than the true value.",
    reason_text: "If we dissolve $1\\,\\text{mole of KCl}$ in water, $2\\,\\text{moles of particles}$ in solution are obtained.",
    question_text: "Assertion (A): When there is a dissociation of solute into ions, the experimentally determined molar mass is always lower than the true value.\nReason (R): If we dissolve $1\\,\\text{mole of KCl}$ in water, $2\\,\\text{moles of particles}$ in solution are obtained.",
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      'If Assertion is true statement but Reason is false',
      'If both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Both Assertion and Reason are true, and Reason correctly explains the assertion. Colligative properties are inversely proportional to the molar mass of the solute ($M_{\\text{exp}} \\propto \\frac{1}{\\text{colligative property}}$). When an electrolyte like $\\text{KCl}$ dissociates into $2\\,\\text{moles}$ of ions per mole of solute, the colligative effect doubles ($i = 2$), causing the experimentally determined molar mass to be half of the theoretical value ($M_{\\text{exp}} = M_{\\text{true}} / i$)."
  }
];
