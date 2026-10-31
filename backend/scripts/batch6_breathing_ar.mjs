// Batch 6: Zoology - Breathing and Exchange of Gases Assertion - Reason Questions (7 questions)
const arOptions = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batch6Questions = [
  {
    question_type: "assertion_reason",
    assertion_text: "A film of lecithin lines the alveoli of the lungs that lowers the surface tension and keeps the alveoli inflated.",
    reason_text: "Lecithin is a phospholipid secreted by pneumocyte cells type-II.",
    question_text: "Assertion (A): A film of lecithin lines the alveoli of the lungs that lowers the surface tension and keeps the alveoli inflated.\nReason (R): Lecithin is a phospholipid secreted by pneumocyte cells type-II.",
    options: arOptions,
    correct_answer: arOptions[0],
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Dipalmitoyl lecithin is a surface-active phospholipid (surfactant) secreted by Type II alveolar pneumocytes. It reduces surface tension at the alveolar air-fluid interface, preventing alveolar collapse (atelectasis) at the end of expiration.",
    difficulty: "easy",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Breathing and eating cannot occur simultaneously in mammals.",
    reason_text: "Cerebral cortex influences the contraction of breathing muscles.",
    question_text: "Assertion (A): Breathing and eating cannot occur simultaneously in mammals.\nReason (R): Cerebral cortex influences the contraction of breathing muscles.",
    options: arOptions,
    correct_answer: arOptions[1],
    correct_index: 1,
    explanation: "Both Assertion and Reason are true. Breathing and deglutition cannot occur simultaneously because swallowing triggers reflexive elevation of the larynx and closure of the glottis by the epiglottis to prevent food aspiration. The cerebral cortex can exert voluntary control over respiratory muscles. However, the cerebral cortex's influence does not explain the mechanical reflex preventing simultaneous swallowing and breathing.",
    difficulty: "medium",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Methaemoglobin when present in large quantities causes cyanosis.",
    reason_text: "In methaemoglobin, Fe2+ ions are oxidised to ferric ions (Fe3+) and bind with oxygen irreversibly.",
    question_text: "Assertion (A): Methaemoglobin when present in large quantities causes cyanosis.\nReason (R): In methaemoglobin, Fe2+ ions are oxidised to ferric ions (Fe3+) and bind with oxygen irreversibly.",
    options: arOptions,
    correct_answer: arOptions[2],
    correct_index: 2,
    explanation: "Assertion is true but Reason is false. Methaemoglobin contains iron in the oxidized ferric state (Fe3+). In the ferric state, it cannot bind oxygen at all (not irreversibly), resulting in tissue hypoxia and cyanosis.",
    difficulty: "hard",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  },
  {
    question_type: "assertion_reason",
    assertion_text: "P50 value indicates the pO2 at which 50% haemoglobin of blood is saturated with O2.",
    reason_text: "The haemoglobin gets saturated to about 50% when partial pressure of oxygen is 25-30 mm of Hg.",
    question_text: "Assertion (A): P50 value indicates the pO2 at which 50% haemoglobin of blood is saturated with O2.\nReason (R): The haemoglobin gets saturated to about 50% when partial pressure of oxygen is 25-30 mm of Hg.",
    options: arOptions,
    correct_answer: arOptions[1],
    correct_index: 1,
    explanation: "Both Assertion and Reason are true. P50 is defined as the oxygen partial pressure required to achieve 50% saturation of haemoglobin. In normal adult blood under standard physiological conditions, P50 is approximately 25-30 mm Hg (normally ~26.8 mm Hg). However, Reason provides the quantitative normal value rather than explaining the physiological definition in Assertion.",
    difficulty: "medium",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  },
  {
    question_type: "assertion_reason",
    assertion_text: "In carbon monoxide poisoning, death occurs due to non-availability of oxygen.",
    reason_text: "It is due to the absence of free haemoglobin.",
    question_text: "Assertion (A): In carbon monoxide poisoning, death occurs due to non-availability of oxygen.\nReason (R): It is due to the absence of free haemoglobin.",
    options: arOptions,
    correct_answer: arOptions[0],
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Carbon monoxide has an affinity for haemoglobin approximately 200-250 times greater than oxygen, forming carboxyhaemoglobin. This ties up oxygen-binding sites, severely depleting free haemoglobin available to transport oxygen, leading to fatal tissue hypoxia.",
    difficulty: "easy",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  },
  {
    question_type: "assertion_reason",
    assertion_text: "CO2 is transported in the blood mainly in the form of bicarbonate ions.",
    reason_text: "RBCs contain a very high concentration of the enzyme carbonic anhydrase.",
    question_text: "Assertion (A): CO2 is transported in the blood mainly in the form of bicarbonate ions.\nReason (R): RBCs contain a very high concentration of the enzyme carbonic anhydrase.",
    options: arOptions,
    correct_answer: arOptions[0],
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. RBCs contain high amounts of carbonic anhydrase, which rapidly catalyses the reaction CO2 + H2O <-> H2CO3 <-> HCO3- + H+. Consequently, approximately 70% of all CO2 is transported as bicarbonate ions in the plasma.",
    difficulty: "easy",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  },
  {
    question_type: "assertion_reason",
    assertion_text: "CO2 can diffuse through the diffusion membrane more rapidly than O2 per unit difference in partial pressure.",
    reason_text: "Solubility of CO2 in plasma is 20-25 times higher than that of O2.",
    question_text: "Assertion (A): CO2 can diffuse through the diffusion membrane more rapidly than O2 per unit difference in partial pressure.\nReason (R): Solubility of CO2 in plasma is 20-25 times higher than that of O2.",
    options: arOptions,
    correct_answer: arOptions[0],
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. The diffusion capacity of a gas across the respiratory membrane is directly proportional to its solubility in the aqueous phase. Because CO2 solubility is 20-25 times higher than that of O2, CO2 diffuses across the membrane much faster per unit partial pressure gradient.",
    difficulty: "easy",
    topic: "Assertion-Reason - Breathing and Exchange of Gases"
  }
];
