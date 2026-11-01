const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const REDOX_AR_BATCH = [
  {
    question_number: 1,
    question_text: "Assertion (A): The reaction Br2 -> Br^- + BrO3^- is a disproportionation reaction.\nReason (R): Br2 is getting oxidized and reduced.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. In elemental bromine (Br2), the oxidation state of Br is 0. In Br^-, it is -1 (reduction), and in BrO3^-, it is +5 (oxidation). Since Br2 is simultaneously oxidised and reduced, it is a disproportionation reaction.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 2,
    question_text: "Assertion (A): If highly electronegative element is in its highest oxidation state in a compound, then that compound will act as an oxidizing agent.\nReason (R): KClO4 is an oxidizing agent.",
    options: [...AR_OPTIONS],
    correct_index: 1,
    solution: "Assertion is true because an element in its maximum oxidation state cannot lose more electrons and can only gain electrons, acting as an oxidising agent. Reason is also true: in KClO4, chlorine is in its highest oxidation state of +7 and acts as an oxidising agent. However, Reason is merely a specific example and not the fundamental explanation of Assertion.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 3,
    question_text: "Assertion (A): Very less reactive metals such as Ag and Au react with dilute HCl.\nReason (R): Ag and Au do not liberate H2 gas when react with dilute acids.",
    options: [...AR_OPTIONS],
    correct_index: 3,
    solution: "Assertion is false: silver (Ag) and gold (Au) have positive reduction potentials (lie below hydrogen in the electrochemical series) and do not react with dilute non-oxidising acids like HCl. Reason is true: they do not liberate H2 from dilute acids. Under the 4-choice scheme where Assertion is false, mark (4).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 4,
    question_text: "Assertion (A): The equivalent weight of KMnO4 in neutral medium is M / 3.\nReason (R): In neutral medium, KMnO4 (Mn^7+) gets converted to MnO2 (Mn^4+).",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. In neutral or faintly alkaline medium, MnO4^- is reduced to MnO2. The change in oxidation state of manganese is 7 - 4 = 3, giving an n-factor of 3. Equivalent weight = M / 3.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 5,
    question_text: "Assertion (A): Zn rod placed in copper nitrate solution, intensity of blue colour of solution is reduced.\nReason (R): Zn rod placed in copper nitrate solution, Cu^2+ ion is deposited as Cu on Zn rod.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. Zinc is more electropositive than copper (E°_Zn2+/Zn = -0.76 V vs E°_Cu2+/Cu = +0.34 V) and displaces Cu^2+ ions from solution (Zn + Cu^2+ -> Zn^2+ + Cu). As hydrated Cu^2+ ions (responsible for blue color) precipitate as metallic Cu, the blue color fades.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 6,
    question_text: "Assertion (A): In permanganate titrations, KMnO4 acts as a reducing agent in acidic medium.\nReason (R): KMnO4 is a self indicator.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is false: KMnO4 is a powerful oxidising agent in acidic medium, not a reducing agent. Reason is true: KMnO4 has an intense purple colour which decolourises upon reduction, and the first slight excess gives a permanent faint pink tinge, acting as a self-indicator. Therefore, Assertion is false.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 7,
    question_text: "Assertion (A): Galvanic cell is an electrolytic cell.\nReason (R): Galvanic cell converts chemical energy into electrical energy.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is false: a galvanic (voltaic) cell converts chemical energy from spontaneous redox reactions into electrical energy, whereas an electrolytic cell uses external electrical energy to drive non-spontaneous reactions. Reason is true.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 8,
    question_text: "Assertion (A): For measuring standard electrode potential, concentration of solution should be 1 M, P = 1 atm and T = 273 K.\nReason (R): E°_cell for hydrogen electrode is 0.00 V.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is false because the standard temperature for standard electrode potentials in electrochemistry is 298.15 K (25°C), not 273 K (0°C). Reason is true: by international convention, the standard potential of the standard hydrogen electrode (SHE) is assigned as 0.00 V.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 9,
    question_text: "Assertion (A): Each hydrogen atom in H2 molecule has zero oxidation state.\nReason (R): In elements, in the free or the uncombined states, each atom bears an oxidation number of zero.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. By convention of oxidation numbers, any element in its free, uncombined, or elemental state has an oxidation state of zero. In H2, both atoms are identical and share electrons equally, having an oxidation state of zero.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 10,
    question_text: "Assertion (A): A positive value of E°_M^n+/M means that the redox couple is a stronger reducing agent than H^+/H2 couple.\nReason (R): For measuring E°_M^n+/M, standard hydrogen electrode is taken as 0.00 V.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is false: a positive reduction potential (E° > 0) means the couple has a higher tendency to gain electrons than H^+, meaning its reduced form is a WEAKER reducing agent than H2. A negative E° denotes a stronger reducing agent. Reason is true: the potential of SHE is taken as 0.00 V.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Redox Reactions',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  }
];

