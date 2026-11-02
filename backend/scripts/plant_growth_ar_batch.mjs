const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const PLANT_GROWTH_AR_BATCH = [
  {
    question_text: "Assertion (A): In abscission, shedding of leaves, flowers and fruits occurs from living plants.\nReason (R): ABA promotes the abscission whereas ethylene prevents it.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: abscission is the natural detachment of older or mature leaves, flowers, and fruits from the parent plant. Reason is false: ethylene actively promotes abscission (along with ABA), rather than preventing it.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Abscission & Hormonal Control"
  },
  {
    question_text: "Assertion (A): Florigen is synthesized in leaves and translocated to the shoot apical meristem.\nReason (R): It is translocated via phloem and xylem.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: leaves perceive the photoperiodic stimulus and synthesize florigen, which migrates to the shoot apex to initiate flowering. Reason is false: florigen is translocated systemically via the phloem sieve elements, not through the xylem.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Florigen & Phloem Translocation"
  },
  {
    question_text: "Assertion (A): 2,4-D is a selective herbicide.\nReason (R): 2,4-D kills dicot weeds in crop fields.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason correctly explains the Assertion. 2,4-D is classified as a selective weedicide because it specifically eradicates broad-leaved dicot weeds in monocotyledonous cereal crop fields without injuring mature monocots.",
    marks: 4,
    difficulty: "easy",
    question_type: "assertion_reason",
    topic: "Auxins as Selective Weedicides"
  },
  {
    question_text: "Assertion (A): Ethephon hastens fruit ripening in tomatoes.\nReason (R): Ethephon releases ethylene readily.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Ethephon in aqueous form penetrates plant tissues and slowly decomposes to release ethylene gas, which triggers rapid and uniform ripening in tomatoes and apples.",
    marks: 4,
    difficulty: "easy",
    question_type: "assertion_reason",
    topic: "Ethephon & Fruit Ripening"
  },
  {
    question_text: "Assertion (A): In coriander, the leaves of juvenile plants are different in shape from those in mature plants.\nReason (R): It shows environmental plasticity.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: coriander displays heterophylly where juvenile and mature leaves have different morphologies. Reason is false: heterophylly in coriander, cotton, and larkspur is due to phases of life (developmental plasticity), whereas environmental plasticity occurs in plants like buttercup.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Plasticity & Heterophylly"
  },
  {
    question_text: "Assertion (A): Plant growth generally is indeterminate.\nReason (R): Plant body contains meristems at certain locations.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Plant growth is open and indeterminate because perpetual embryonic dividing cells (apical and lateral meristems) are located at specific regions, continuously adding new cells throughout life.",
    marks: 4,
    difficulty: "easy",
    question_type: "assertion_reason",
    topic: "Open Growth & Meristems"
  },
  {
    question_text: "Assertion (A): A sigmoid curve is a characteristic of living organism growing in a natural environment.\nReason (R): In geometric growth lag phase and stationary phase growth is zero.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: natural population and tissue growth typically yield an S-shaped sigmoid curve. Reason is false: in the initial lag phase, growth occurs at a slow but non-zero rate, while growth stabilizes at stationary phase due to limited resources.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Sigmoid Growth Phases"
  },
  {
    question_text: "Assertion (A): Differentiation in plants is open.\nReason (R): In plants tissues arising out of the same meristem have different structures at maturity.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Differentiation in plants is open because cells originating from the same meristematic precursor can differentiate into completely diverse cell types (e.g. xylem vessels vs parenchyma) at maturity.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Open Differentiation"
  },
  {
    question_text: "Assertion (A): Water is very essential element for plant growth.\nReason (R): Macro and micro essential elements are required by plants for synthesis of protoplasm.",
    options: AR_OPTIONS,
    correct_index: 1, // (2)
    solution: "Both Assertion and Reason are true statements, but Reason does not explain why water is essential. Water is vital because it maintains cellular turgidity for cell enlargement and provides the medium for enzymatic biochemical reactions.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Requirements for Growth"
  },
  {
    question_text: "Assertion (A): Auxins and cytokinins are antagonistic to each other in apical dominance.\nReason (R): Cytokinins help overcome apical dominance.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Auxin produced at shoot tips suppresses the development of lateral/axillary buds, while exogenous cytokinin application stimulates lateral buds to grow, thereby overcoming apical dominance.",
    marks: 4,
    difficulty: "easy",
    question_type: "assertion_reason",
    topic: "Auxin-Cytokinin Antagonism"
  },
  {
    question_text: "Assertion (A): Development in plants is under the control of intrinsic and extrinsic factors.\nReason (R): Intrinsic factors include plant growth regulators only.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: plant development is regulated by both internal and external factors. Reason is false: intrinsic factors comprise intracellular genetic factors (DNA/genes) as well as intercellular factors (PGRs), not PGRs only.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Control of Development"
  },
  {
    question_text: "Assertion (A): Abscisic acid is also called stress hormone.\nReason (R): Abscisic acid induces the closure of stomata in the epidermis and increases the tolerance of plants to various kinds of stress.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. ABA stimulates the rapid closing of guard cells/stomata during water deficit and enhances systemic plant tolerance to abiotic stresses, earning it the designation of stress hormone.",
    marks: 4,
    difficulty: "easy",
    question_type: "assertion_reason",
    topic: "ABA as Stress Hormone"
  },
  {
    question_text: "Assertion (A): Gibberellic acid leading to early seed production in conifers.\nReason (R): Gibberellic acid sprayed on juvenile conifers hastens their maturity period.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Spraying juvenile conifers with gibberellic acid accelerates the transition from juvenile to reproductive adult stage, thereby promoting early cone and seed development.",
    marks: 4,
    difficulty: "easy",
    question_type: "assertion_reason",
    topic: "Gibberellins in Conifer Maturation"
  },
  {
    question_text: "Assertion (A): Growth is measured by a variety of parameters which are fresh weight, dry weight, length, area, volume and cell number.\nReason (R): Increase in protoplasm is difficult to measure directly.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Because cell growth is fundamentally an increase in protoplasm, which cannot be quantified directly in living tissues, growth is measured through surrogate parameters such as dry/fresh weight, length, surface area, and cell count.",
    marks: 4,
    difficulty: "medium",
    question_type: "assertion_reason",
    topic: "Parameters of Growth Measurement"
  }
];

