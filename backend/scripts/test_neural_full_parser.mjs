import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/neural_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./scripts/neural_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./scripts/neural_diagram_urls.json', 'utf8'));

// Reconstruct lines per page (pages 2 to 20)
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 20)) {
  const items = [...p.items];
  items.sort((a, b) => (Math.abs(b.y - a.y) > 3) ? (b.y - a.y) : (a.x - b.x));

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
  }
}

// Find questions
const qIndices = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\./);
  if (m) {
    qIndices.push({ qNum: parseInt(m[1]), lineIdx: i, page: linesWithMeta[i].page });
  }
}

console.log(`Found ${qIndices.length} questions.`);

const SPECIAL_QUESTIONS = {
  3: {
    question: `Match List-I with List -II:

| List - I | List - II |
| :--- | :--- |
| (A) Schwann cells | (I) Neurotransmitter |
| (B) Synaptic knob | (II) Cerebral cortex |
| (C) Bipolar neurons | (III) Myelin sheath |
| (D) Multipolar neurons | (IV) Retina |

Choose the correct answer from the options given below:`,
    options: [
      "A-III, B-I, C-IV, D-II",
      "A-I, B-IV, C-II, D-III",
      "A-IV, B-III, C-II, D-I",
      "A-II, B-III, C-I, D-IV"
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: A**\n\n- Schwann cells: Form myelin sheath around axon in PNS (A-III).\n- Synaptic knob: Contains synaptic vesicles filled with neurotransmitter (B-I).\n- Bipolar neurons: Found in the retina of eye with one axon and one dendrite (C-IV).\n- Multipolar neurons: Found in cerebral cortex with one axon and two or more dendrites (D-II)."
  },
  4: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Pons | I. Provides additional space for Neurons, regulates posture and balance. |
| B. Hypothalamus | II. Controls respiration and gastric secretions. |
| C. Medulla | III. Connects different regions of the brain. |
| D. Cerebellum | IV. Neuro secretory cells |

Choose the correct answer from the options given below :`,
    options: [
      "A-II, B-III, C-I, D-IV",
      "A-III, B-IV, C-II, D-I",
      "A-I, B-III, C-II, D-IV",
      "A-II, B-I, C-III, D-IV"
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: B**\n\n- Pons: Consists of fibre tracts that interconnect different regions of the brain (A-III).\n- Hypothalamus: Contains neurosecretory cells called hypothalamic nuclei that secrete hormones (B-IV).\n- Medulla oblongata: Contains centres which control respiration, cardiovascular reflexes and gastric secretions (C-II).\n- Cerebellum: Has very convoluted surface to provide additional space for many neurons; coordinates muscular activity, posture and balance (D-I)."
  },
  5: {
    question: `Given below are two statements:
Statement I: The cerebral hemispheres are connected by nerve tract known as corpus callosum.
Statement II: The brain stem consists of the medulla oblongata, pons and cerebrum.

In the light of the above statements, choose the most appropriate answer from the options given below:`,
    options: [
      "Both Statement I and Statement II are correct.",
      "Both Statement I and Statement II are incorrect.",
      "Statement I is correct but Statement II is incorrect.",
      "Statement I is incorrect but Statement II is correct."
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: C**\n\n- Statement I is correct: A tract of nerve fibres called corpus callosum connects the left and right cerebral hemispheres.\n- Statement II is incorrect: The brain stem consists of the midbrain, pons and medulla oblongata (not cerebrum)."
  },
  8: {
    question: `Match List-I with List - II :

| List - I | List - II |
| :--- | :--- |
| (a) Multipolar neuron | (i) Somatic neural system |
| (b) Bipolar neuron | (ii) Cerebral cortex |
| (c) Myelinated nerve fibre | (iii) Retina of Eye |
| (d) Unmyelinated nerve fibre | (iv) Spinal nerves |

Choose the correct answer from the options given below :`,
    options: [
      "(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)",
      "(a) - (iii), (b) - (i), (c) - (iv), (d) - (ii)",
      "(a) - (ii), (b) - (iv), (c) - (iii), (d) - (i)",
      "(a) - (ii), (b) - (iii), (c) - (i), (d) - (iv)"
    ],
    exam: "NEET 2022 Phase 2",
    explanation: "**Correct Option: A**\n\n- Multipolar neuron: Found in cerebral cortex (a-ii).\n- Bipolar neuron: Found in retina of eye (b-iii).\n- Myelinated nerve fibres: Commonly found in cranial and spinal nerves (c-iv).\n- Unmyelinated nerve fibres: Commonly found in autonomous and somatic neural systems (d-i)."
  },
  18: {
    question: `The figure shows an axon terminal and synapse. Select the option giving correct identification of labels A-D.`,
    options: [
      "C-Receptor, D-Synaptic vesicles",
      "A-Axon terminal, B- Serotonin complex",
      "A-Action potential, C-Neurotransmitter",
      "B-Neurotransmitter, D- Receptor capsules"
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: A**\n\nIn the given diagram of axon terminal and synapse:\n- A represents the axon terminal / presynaptic membrane\n- B represents the synaptic cleft\n- C represents the receptors on the postsynaptic membrane\n- D represents synaptic vesicles containing neurotransmitters.\nHence, C is Receptor and D is Synaptic vesicles."
  },
  19: {
    question: `A sagittal section of human brain is shown here. Identify at least two labels from A-D.`,
    options: [
      "A-Cerebral hemispheres, B-Cerebellum",
      "B-Corpus callosum, D-Medulla",
      "C-Mid brain, D-Cerebellum",
      "A-Cerebrum, C-Pons"
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: D**\n\nIn the sagittal section of the human brain:\n- A represents the Cerebrum (cerebral cortex)\n- B represents the Corpus callosum / Thalamus\n- C represents the Pons\n- D represents the Cerebellum.\nHence, (D) A-Cerebrum, C-Pons is correctly identified."
  },
  20: {
    question: `The most abundant intracellular cation is`,
    options: [
      "$\\text{H}^+$",
      "$\\text{K}^+$",
      "$\\text{Na}^+$",
      "$\\text{Ca}^{++}$"
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: B**\n\n$\\text{K}^+$ (potassium ion) is the predominant intracellular cation, while $\\text{Na}^+$ is the principal extracellular cation."
  },
  21: {
    question: `A diagram showing axon terminal and synapse is given. Identify correctly at least two of A - D.`,
    options: [
      "A - Receptor, C - Synaptic vesicles",
      "A - Neurotransmitter, B - Synaptic cleft",
      "C - Neurotransmitter, D - $\\text{Ca}^{++}$",
      "B - Synaptic connection, D - $\\text{K}^+$"
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: A**\n\nIn the diagram of axon terminal and synapse:\n- A represents receptor protein on postsynaptic membrane\n- B represents synaptic cleft\n- C represents synaptic vesicle\n- D represents neurotransmitter molecules released into the synaptic cleft.\nHence, A - Receptor, C - Synaptic vesicles is correctly identified."
  },
  23: {
    question: `When a neuron is in resting state i.e., not conducting any impulse, the axonal membrane is`,
    options: [
      "comparatively more permeable to $\\text{Na}^+$ ions and nearly impermeable to $\\text{K}^+$ ions",
      "equally permeable to both $\\text{Na}^+$ and $\\text{K}^+$ ions",
      "impermeable to both $\\text{Na}^+$ and $\\text{K}^+$ ions",
      "comparatively more permeable to $\\text{K}^+$ ions and nearly impermeable to $\\text{Na}^+$ ions."
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: D**\n\nIn the resting state, the axonal membrane is comparatively more permeable to $\\text{K}^+$ ions and nearly impermeable to $\\text{Na}^+$ ions."
  },
  24: {
    question: `Select the answer with correct matching of the structure, its location and function.`,
    options: [
      "Eustachian tube | Anterior part of internal ear | Equalizes air pressure on either sides of tympanic membrane",
      "Cerebellum | Mid Brain | Controls respiration and gastric secretions",
      "Hypothalamus | Fore Brain | Controls body temperature, urge for eating and drinking",
      "Blind spot | Near the place where optic nerve leaves the eye | Rods and cones are present but inactive here"
    ],
    exam: "AIPMT 2010 Mains",
    explanation: "**Correct Option: C**\n\n- Option C is correctly matched: Hypothalamus lies at the base of the thalamus (forebrain) and contains centres which control body temperature, urge for eating and drinking.\n- Option A is incorrect: Eustachian tube connects the middle ear cavity with the pharynx (not anterior part of internal ear).\n- Option B is incorrect: Cerebellum is part of hindbrain (not midbrain), and respiration/gastric secretions are controlled by medulla oblongata.\n- Option D is incorrect: Photoreceptor cells (rods and cones) are completely absent at the blind spot (not present but inactive)."
  },
  28: {
    question: `During the propagation of a nerve impulse, the action potential results from the movement of`,
    options: [
      "$\\text{K}^+$ ions from intracellular fluid to extracellular fluid",
      "$\\text{Na}^+$ ions from extracellular fluid to intracellular fluid",
      "$\\text{K}^+$ ions from extracellular fluid to extracellular fluid",
      "$\\text{Na}^+$ ions from intracellular fluid to extracellular fluid."
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: B**\n\nWhen a stimulus is applied to a neuron, rapid influx of $\\text{Na}^+$ ions occurs from extracellular fluid to intracellular fluid across the membrane, causing depolarization and generating an action potential."
  },
  34: {
    question: `In the resting state of the neural membrane, diffusion due to concentration gradients, if allowed, would drive`,
    options: [
      "$\\text{K}^+$ into the cell",
      "$\\text{K}^+$ and $\\text{Na}^+$ out of the cell",
      "$\\text{Na}^+$ into the cell",
      "$\\text{Na}^+$ out of the cell."
    ],
    exam: "AIPMT 2004",
    explanation: "**Correct Option: C**\n\nIn the resting state, the concentration of $\\text{Na}^+$ is higher outside the cell than inside. Therefore, diffusion driven purely by concentration gradient would drive $\\text{Na}^+$ into the cell."
  },
  38: {
    question: `Depolarization of axolema during nerve conduction takes place because of`,
    options: [
      "equal amount of $\\text{Na}^+$ and $\\text{K}^+$ move out across axolema",
      "$\\text{Na}^+$ move inside and $\\text{K}^+$ move more outside.",
      "more $\\text{Na}^+$ outside",
      "none of these"
    ],
    exam: "AIPMT 2000",
    explanation: "**Correct Option: B**\n\nDepolarization occurs primarily due to rapid influx of $\\text{Na}^+$ ions into the axoplasm, reversing the membrane polarity, followed by $\\text{K}^+$ outflow during repolarization."
  },
  46: {
    question: `The sympathetic nerves, in mammals, arise from`,
    options: [
      "sacral nerves",
      "$3^\\text{rd}, 7^\\text{th}, 9^\\text{th}$ and $10^\\text{th}$ cranial nerves",
      "thoraco-lumbar nerves",
      "cervical nerves"
    ],
    exam: "AIPMT 1995",
    explanation: "**Correct Option: C**\n\nThe sympathetic nervous system has a thoraco-lumbar outflow (originating from thoracic and upper lumbar spinal cord segments), whereas parasympathetic has a cranio-sacral outflow."
  },
  52: {
    question: `Given below are two statements :
Statement I :- The nose contains mucus – coated receptors which are specialised for receiving the sense of smell and are called olfactory receptors.
Statement II :- Wall of the eye ball has three layers. The external layer is called choroid (dense connective tissue), middle layer is sclera (thin pigmented layer) and internal layer is retina (ganglion cells, bipolar cells and photoreceptor cells).

In the light of the above statements, choose the correct answer from the options given below:`,
    options: [
      "Statement I is true but statement II is false",
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false."
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: A**\n\n- Statement I is true: Olfactory epithelium has mucus-coated olfactory receptors for detecting smell.\n- Statement II is false: The external layer is the sclera (dense connective tissue), the middle layer is the choroid (vascular, thin pigmented layer), and the internal layer is the retina."
  },
  53: {
    question: `Match List I with List II with respect to human eye:

| List I | List II |
| :--- | :--- |
| (A) Fovea | (I) Visible coloured portion of eye that regulates diameter of pupil. |
| (B) Iris | (II) External layer of eye formed of dense connective tissue. |
| (C) Blind spot | (III) Point of greatest visual acuity or resolution. |
| (D) Sclera | (IV) Point where optic nerve leaves the eyeball and photoreceptor cells are absent. |

Choose the correct answer from the options given below:`,
    options: [
      "A-IV, B-III, C-II, D-I",
      "A-I, B-IV, C-III, D-II",
      "A-II, B-I, C-III, D-IV",
      "A-III, B-I, C-IV, D-II"
    ],
    exam: "NEET 2023",
    explanation: "**Correct Option: D**\n\n- Fovea: Thinned out portion of retina where only cones are densely packed, point of greatest visual acuity/resolution (A-III).\n- Iris: Visible coloured portion of eye that regulates diameter of pupil (B-I).\n- Blind spot: Region where optic nerve leaves the eyeball and photoreceptors are absent (C-IV).\n- Sclera: External layer of eyeball formed of dense connective tissue (D-II)."
  },
  54: {
    question: `Match the following columns and select the correct option :

| Column - I | Column - II |
| :--- | :--- |
| (a) Rods and Cones | (i) Absence of photoreceptor cells |
| (b) Blind Spot | (ii) Cones are densely packed |
| (c) Fovea | (iii) Photoreceptor cells |
| (d) Iris | (iv) Visible coloured portion of the eye |

Choose the correct answer from the options given below:`,
    options: [
      "(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)",
      "(a)-(iii), (b)-(i), (c)-(ii), (d)-(iv)",
      "(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)"
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: B**\n\n- Rods and Cones: Photoreceptor cells containing light-sensitive photopigments (a-iii).\n- Blind Spot: Region where optic nerve leaves the eye; photoreceptors are absent (b-i).\n- Fovea: Central pit where cones are densely packed for maximum visual acuity (c-ii).\n- Iris: Visible coloured portion of the eye that regulates pupil size (d-iv)."
  },
  55: {
    question: `Match the following columns and select the correct option:

| Column-I | Column-II |
| :--- | :--- |
| (a) Organ of Corti | (i) Connects middle ear and pharynx |
| (b) Cochlea | (ii) Coiled part of the labyrinth |
| (c) Eustachian tube | (iii) Attached to the oval window |
| (d) Stapes | (iv) Located on the basilar membrane |

Choose the correct answer from the options given below:`,
    options: [
      "(A) (ii), (B) (iii), (C) (i), (D) (iv)",
      "(A) (iv), (B) (ii), (C) (i), (D) (iii)",
      "(A) (iii), (B) (i), (C) (iv), (D) (ii)",
      "(A) (i), (B) (ii), (C) (iv), (D) (iii)"
    ],
    exam: "NEET 2020 Phase 1",
    explanation: "**Correct Option: B**\n\n- Organ of Corti: Located on the basilar membrane containing hair cells as auditory receptors (a-iv).\n- Cochlea: The coiled portion of the labyrinth (b-ii).\n- Eustachian tube: Connects the middle ear cavity with the pharynx (c-i).\n- Stapes: The innermost ear ossicle attached to the oval window of the cochlea (d-iii)."
  },
  60: {
    question: `Good vision depends on adequate intake of carotene rich food.
Select the best option from the following statements:
(1) Vitamin A derivatives are formed from carotene.
(2) The photopigments are embedded in the membrane discs of the inner segment.
(3) Retinal is a derivative of vitamin A.
(4) Retinal is a light absorbing part of all the visual photopigments.`,
    options: [
      "(1), (3) and (4)",
      "(1) and (3)",
      "(2), (3) and (4)",
      "(1) and (2)"
    ],
    exam: "NEET 2017",
    explanation: "**Correct Option: A**\n\n- Statement (1) is correct: Beta-carotene is a precursor of vitamin A (retinol).\n- Statement (2) is incorrect: Photopigments are embedded in membrane discs of the outer segment of photoreceptor cells (not inner segment).\n- Statement (3) is correct: Retinal is an aldehyde derivative of vitamin A.\n- Statement (4) is correct: Retinal is the chromophore and light-absorbing component of visual photopigments.\nHence, statements (1), (3) and (4) are correct."
  },
  66: {
    question: `Parts A, B, C and D of the human eye are shown in the diagram. Select the option which gives correct identification along with its functions/ characteristics.`,
    options: [
      "B - Blind spot - Has only a few rods and cones.",
      "A - Retina - Contains photoreceptors, i.e., rods and cones.",
      "C - Aqueous chamber - Reflects the light which does not pass through the lens.",
      "D - Choroid - Its anterior part forms ciliary body."
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: B**\n\nIn the given diagram of the human eye:\n- A represents the Retina, which contains photoreceptor cells (rods and cones), bipolar cells, and ganglion cells.\n- B represents the blind spot (photoreceptor cells are completely absent, not 'has only a few').\n- C represents the aqueous chamber (contains watery fluid providing nourishment and maintaining intraocular pressure, not reflecting light).\n- D represents the sclera (external layer).\nHence, option (B) is correct."
  },
  68: {
    question: `The purplish red pigment rhodopsin contained in the rods type of photoreceptor cells of the human eye, is a derivative of`,
    options: [
      "$\\text{vitamin B}_1$",
      "vitamin C",
      "vitamin D",
      "vitamin A."
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: D**\n\nRhodopsin (visual purple) consists of opsin (protein) and retinal (an aldehyde of vitamin A). Hence, it is a derivative of vitamin A."
  },
  70: {
    question: `Which one of the following is the correct difference between rod cells and cone cells of our retina?`,
    options: [
      "Overall function: Rod cells - Vision in poor light; Cone cells - Colour vision and detailed vision in bright light",
      "Distribution: Rod cells - More concentrated in centre of retina; Cone cells - Evenly distributed all over retina",
      "Visual acuity: Rod cells - High; Cone cells - Low",
      "Visual pigment contained: Rod cells - Iodopsin; Cone cells - Rhodopsin"
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: A**\n\n- Option A is correct: Rod cells provide twilight/scotopic vision (vision in dim light), while cone cells provide daylight/photopic and colour vision in bright light.\n- Option B is incorrect: Cones are densely concentrated at the fovea centralis (centre), whereas rods are distributed more towards the periphery.\n- Option C is incorrect: Visual acuity is high in cones and low in rods.\n- Option D is incorrect: Rods contain rhodopsin, while cones contain iodopsin / photopsins."
  },
  71: {
    question: `Given below is a diagrammatic cross section of a single loop of human cochlea.

Which one of the following options correctly represents the names of three different parts?`,
    options: [
      "B : Tectorial membrane, C : Perilymph, D: secretory cells",
      "A : Perilymph, B : Tectorial membrane, C: Endolymph",
      "C : Endolymph, D : Sensory hair cells, A : Serum",
      "D : Sensory hair cells, A : Endolymph B : Tectorial membrane."
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: B**\n\nIn the cross section of cochlea:\n- A represents scala vestibuli / scala tympani containing Perilymph\n- B represents the Tectorial membrane\n- C represents scala media containing Endolymph\n- D represents the basilar membrane / organ of Corti.\nHence, A : Perilymph, B : Tectorial membrane, C: Endolymph is correct."
  }
};

let success = 0;
let errors = [];

for (let i = 0; i < qIndices.length; i++) {
  const qInfo = qIndices[i];
  const qNum = qInfo.qNum;
  const officialKey = officialKeys[qNum];

  if (SPECIAL_QUESTIONS[qNum]) {
    const sq = SPECIAL_QUESTIONS[qNum];
    const keyIdx = officialKey.charCodeAt(0) - 65;
    if (sq.options.length !== 4) {
      errors.push(`Q${qNum} special question has ${sq.options.length} options`);
    } else {
      success++;
    }
    continue;
  }

  // Parse general question
  const nextLineIdx = (i + 1 < qIndices.length) ? qIndices[i + 1].lineIdx : linesWithMeta.length;
  const qLines = linesWithMeta.slice(qInfo.lineIdx, nextLineIdx).map(l => l.text);
  
  const cleanLines = qLines.filter(line => 
    !line.includes('ExamGOAL') &&
    !line.includes('Open solution') &&
    !line.includes('Keep practising') &&
    !line.includes('Google Play') &&
    !line.includes('GET IT ON') &&
    !line.includes('NEET Biology:') &&
    !line.includes('Solutions: questions.examside.com') &&
    !line.startsWith('MCQ (Single Correct Answer)') &&
    !line.startsWith('Out of syllabus') &&
    !line.includes('These questions are on topics')
  );

  const fullText = cleanLines.join(' ');
  const examMatch = fullText.match(/^Q\d+\.\s*([^A-Za-z0-9]*[A-Z0-9\s()–-]+?)\s+(?:·\s+MCQ\s+\(Single\s+Correct\s+Answer\)\s+)?(Which|What|When|Where|How|Select|Identify|Injury|In|During|Good|Photosensitive|A|Ivan|Light|Retina|Function|Iris|Sensitive|Nissl|The|Receptor|Destruction|Alzheimer|Parkinson|Third|One|Bowman|Cornea|Sympathetic|Afferent|Vagus|By)\b/i);

  let exam = '';
  let questionBody = '';

  if (examMatch) {
    exam = examMatch[1].replace(/·\s*MCQ.*$/i, '').trim();
    questionBody = fullText.slice(examMatch[0].length - examMatch[2].length).trim();
  } else {
    // Fallback exam extract
    const headerLine = cleanLines[0];
    const m = headerLine.match(/^Q\d+\.\s*(.+?)(?:\s*·\s*MCQ.*)?$/);
    exam = m ? m[1].replace(/·\s*MCQ.*$/i, '').trim() : '';
    questionBody = cleanLines.slice(1).join(' ').trim();
  }

  // Split options
  const optMatch = questionBody.match(/\(A\)\s*(.*?)\s*\(B\)\s*(.*?)\s*\(C\)\s*(.*?)\s*\(D\)\s*(.*)$/);
  if (!optMatch) {
    errors.push(`Q${qNum} failed option split: "${questionBody.slice(0, 80)}..."`);
    continue;
  }

  const qText = questionBody.slice(0, questionBody.indexOf('(A)')).trim();
  const options = [
    optMatch[1].trim(),
    optMatch[2].trim(),
    optMatch[3].trim(),
    optMatch[4].trim()
  ];

  if (!officialKey) {
    errors.push(`Q${qNum} missing official key`);
    continue;
  }

  success++;
}

console.log(`Successfully parsed: ${success}/${qIndices.length}`);
if (errors.length > 0) {
  console.log('Errors:', errors);
}

