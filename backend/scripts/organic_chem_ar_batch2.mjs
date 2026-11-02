const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const ORGANIC_AR_BATCH2 = [
  {
    question_number: 6,
    question_text: "Assertion (A): Inductive effect is a permanent effect while electromeric effect is a temporary effect.\nReason (R): When inductive and electromeric effects operate in opposite directions, then electromeric effect predominates.",
    options: [...AR_OPTIONS],
    correct_index: 1,
    solution: "Both Assertion & Reason are true but Reason is not the correct explanation of the assertion. Inductive effect is permanent because it arises from intrinsic electronegativity differences between atoms bonded by σ-bonds in the molecule's ground state. Electromeric effect is temporary because it operates only at the demand of an attacking reagent. It is also true that electromeric effect predominates over inductive effect when they oppose each other, but this relative magnitude does not explain why one is permanent and the other is temporary.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 7,
    question_text: "Assertion (A): Tropone is a non-benzenoid aromatic compound.\nReason (R): Tropone does not follow (4n+2)π electron rule.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is true statement but Reason is false. Tropone (cyclohepta-2,4,6-trien-1-one) is an iconic non-benzenoid aromatic compound. It polarizes strongly into a dipolar resonance contributor with a cycloheptatrienyl (tropylium) cation ring possessing 6 π-electrons and a negative charge on oxygen. The 6 π-electrons completely satisfy Hückel's (4n+2) rule for n=1, so Reason is false.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 8,
    question_text: "Assertion (A): Paper chromatography is a type of partition chromatography.\nReason (R): Partition chromatography is based on continuous differential partitioning of components of a mixture between stationary and mobile phases.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion & Reason are true and Reason is the correct explanation of Assertion. In paper chromatography, a special quality paper contains water trapped in its cellulose fibers that acts as the stationary liquid phase. A mobile solvent phase flows over it, and components of the mixture distribute (partition) continuously between the stationary water and mobile solvent phases according to their partition coefficients.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 9,
    question_text: "Assertion (A): Metamerism arises due to different alkyl chains on either side of the functional group in the molecule.\nReason (R): Metamers are stereoisomers.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is true statement but Reason is false. Metamerism is a type of structural (constitutional) isomerism arising from unequal distribution of carbon atoms on either side of a polyvalent functional group (such as -O-, -S-, -NH-, -CO-). Metamers have different connectivity of atoms, so they are constitutional isomers, not stereoisomers.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 10,
    question_text: "Assertion (A): Carbocations are highly unstable and reactive species.\nReason (R): Carbocations are pyramidal in shape.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is true statement but Reason is false. Carbocations have an electron-deficient positively charged carbon with only 6 valence electrons (sextet), making them highly unstable, short-lived, and reactive reaction intermediates. The central carbon is sp² hybridized with three coplanar σ-bonds (120° bond angles) and an empty unhybridized p-orbital, adopting a planar trigonal geometry, not pyramidal.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 11,
    question_text: "Assertion (A): In homolytic cleavage, one of the electrons of the shared pair in a covalent bond goes with each of the bonded atoms.\nReason (R): Organic reactions which proceed by homolytic fission are called homopolar or non-polar reactions.",
    options: [...AR_OPTIONS],
    correct_index: 1,
    solution: "Both Assertion & Reason are true but Reason is not the correct explanation of the assertion. In homolytic fission, the symmetrical breaking of a covalent bond results in each atom retaining one electron from the shared electron pair, generating neutral free radicals. Reactions involving free radicals and proceeding via homolytic cleavage are known as non-polar, homopolar, or radical reactions.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 12,
    question_text: "Assertion (A): The resonating structures are real.\nReason (R): All the resonating structures of a molecule contribute equally to the resonance hybrid.",
    options: [...AR_OPTIONS],
    correct_index: 3,
    solution: "Both Assertion and Reason are false statements. Resonating (canonical) structures are hypothetical Lewis structures and have no real individual physical existence; only the resonance hybrid represents the real molecule. Furthermore, canonical structures contribute unequally to the resonance hybrid depending on their relative stabilities (octet completeness, charge separation, electronegativity match).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 13,
    question_text: "Assertion (A): Pyridine is more basic than pyrrole.\nReason (R): In pyridine, lone pair of N is not involved in aromaticity while in pyrrole, lone pair of N is involved in aromaticity.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion & Reason are true and Reason is the correct explanation of Assertion. In pyridine, nitrogen is sp² hybridized and its lone pair resides in an sp² hybrid orbital orthogonal to the aromatic π-system, remaining free and readily available for protonation. In pyrrole, the lone pair on nitrogen resides in a p-orbital and is part of the 6 π-electron aromatic sextet; protonation destroys aromaticity, making pyrrole an extremely weak base (pKb ~13.6 vs ~8.8 for pyridine).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 14,
    question_text: "Assertion (A): Kjeldahl method is not applicable to compounds containing nitrogen in nitro and azo groups.\nReason (R): Nitrogen of nitro and azo groups do not change to ammonium sulphate.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion & Reason are true and Reason is the correct explanation of Assertion. The Kjeldahl method relies on digesting the organic compound with concentrated sulfuric acid to quantitatively convert organic nitrogen into ammonium sulphate, (NH4)2SO4. Nitrogen in nitro (-NO2) and azo (-N=N-) groups, as well as in heterocyclic rings like pyridine, does not convert to ammonium sulphate under standard digestion conditions.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 15,
    question_text: "Assertion (A): Hybridization influences the bond length and bond strength in organic compounds.\nReason (R): Change in hybridization affects the electronegativity of carbon.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion & Reason are true and Reason is the correct explanation of Assertion. As the s-character of a hybrid orbital increases (sp³: 25% s < sp²: 33.3% s < sp: 50% s), the electrons are held closer and more tightly to the nucleus, increasing the electronegativity of carbon. This pulls the bonded pair closer, resulting in shorter and stronger covalent bonds (e.g., C(sp)-H bond is shorter and stronger than C(sp³)-H bond).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  }
];

