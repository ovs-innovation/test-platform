const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const ORGANIC_AR_BATCH = [
  {
    question_number: 1,
    question_text: "Assertion (A): Aromatic compounds are more stable than their acyclic counterpart.\nReason (R): In aromatic compounds, π-electrons are delocalised over the entire ring and they also have resonance energy.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion. Aromatic compounds are characterized by cyclic, planar delocalization of (4n + 2) π-electrons, which lowers their overall potential energy by a significant amount known as the resonance (delocalization) energy, making them substantially more stable than acyclic polyenes with the same number of double bonds.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 2,
    question_text: "Assertion (A): The process of simple distillation is used to purify those organic compounds which are unstable at their boiling point.\nReason (R): Ethylene glycol can be purified by simple distillation.",
    options: [...AR_OPTIONS],
    correct_index: 3,
    solution: "Both Assertion and Reason are false statements. Simple distillation is exclusively used for liquids that boil without decomposition and have boiling points sufficiently apart from impurities (> 25 °C). Compounds that decompose at or near their boiling points, such as ethylene glycol (b.p. 197 °C) or glycerol, cannot be purified by simple distillation and must be purified by vacuum distillation (distillation under reduced pressure).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 3,
    question_text: "Assertion (A): Adsorption chromatography is based upon differential adsorption.\nReason (R): In adsorption chromatography, both stationary and mobile phases are solids.",
    options: [...AR_OPTIONS],
    correct_index: 2,
    solution: "Assertion is a true statement, but Reason is false. Adsorption chromatography is indeed based on the differential adsorption of various components of a mixture on a suitable adsorbent. However, the stationary phase is a solid adsorbent (such as silica gel or alumina), whereas the mobile phase is a liquid solvent or mixture of solvents, or a gas—never a solid.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 4,
    question_text: "Assertion (A): Lassaigne's test is used to purify carbon, nitrogen, sulphur and halogens in an organic compound.\nReason (R): Lassaigne's test is prepared by fusing organic compound with magnesium.",
    options: [...AR_OPTIONS],
    correct_index: 3,
    solution: "Both Assertion and Reason are false statements. Lassaigne's test is a qualitative chemical test used for the detection (not purification) of extra elements like nitrogen, sulphur, and halogens in organic compounds by converting covalently bonded elements into ionic water-soluble sodium salts. Sodium metal (not magnesium) is used for the fusion because of its high reactivity and low melting point.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  },
  {
    question_number: 5,
    question_text: "Assertion (A): (CH3)2CH⁺ is more stable than CH3CH2⁺.\nReason (R): Hyperconjugation interaction in (CH3)2CH⁺ is greater than CH3CH2⁺.",
    options: [...AR_OPTIONS],
    correct_index: 0,
    solution: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion. The isopropyl carbocation, (CH3)2CH⁺, possesses 6 α-hydrogens on two adjacent methyl groups capable of participating in σ-p hyperconjugation (no-bond resonance), dispersing the positive charge effectively. In contrast, the ethyl carbocation, CH3CH2⁺, has only 3 α-hydrogens. Greater hyperconjugation leads to higher thermodynamic stability.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Some Basic Principles and Techniques',
    marks: 4,
    question_type: 'assertion_reason',
    image_url: null
  }
];

