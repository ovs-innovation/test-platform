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

console.log(`Found ${qIndices.length} questions in lines dump.`);

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
      { id: 'A', text: "A-III, B-I, C-IV, D-II" },
      { id: 'B', text: "A-I, B-IV, C-II, D-III" },
      { id: 'C', text: "A-IV, B-III, C-II, D-I" },
      { id: 'D', text: "A-II, B-III, C-I, D-IV" }
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: A**\n\n- **Schwann cells**: Envelope nerve fibres and form myelin sheath in the peripheral nervous system (A-III).\n- **Synaptic knob**: Bulb-like structure at axon terminal possessing synaptic vesicles filled with neurotransmitters (B-I).\n- **Bipolar neurons**: Possess one axon and one dendrite, typically found in the retina of the eye (C-IV).\n- **Multipolar neurons**: Possess one axon and two or more dendrites, typically found in the cerebral cortex (D-II)."
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
      { id: 'A', text: "A-II, B-III, C-I, D-IV" },
      { id: 'B', text: "A-III, B-IV, C-II, D-I" },
      { id: 'C', text: "A-I, B-III, C-II, D-IV" },
      { id: 'D', text: "A-II, B-I, C-III, D-IV" }
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: B**\n\n- **Pons**: Consists of fibre tracts that interconnect different regions of the brain (A-III).\n- **Hypothalamus**: Contains several groups of neurosecretory cells called hypothalamic nuclei which produce releasing and inhibiting hormones (B-IV).\n- **Medulla**: Contains reflex centres that control respiration, cardiovascular reflexes, and gastric secretions (C-II).\n- **Cerebellum**: Has a convoluted surface to provide additional space for many neurons; coordinates muscular movements, maintains posture and equilibrium (D-I)."
  },
  5: {
    question: `Given below are two statements:
Statement I: The cerebral hemispheres are connected by nerve tract known as corpus callosum.
Statement II: The brain stem consists of the medulla oblongata, pons and cerebrum.

In the light of the above statements, choose the most appropriate answer from the options given below:`,
    options: [
      { id: 'A', text: "Both Statement I and Statement II are correct." },
      { id: 'B', text: "Both Statement I and Statement II are incorrect." },
      { id: 'C', text: "Statement I is correct but Statement II is incorrect." },
      { id: 'D', text: "Statement I is incorrect but Statement II is correct." }
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: C**\n\n- **Statement I is correct**: The left and right cerebral hemispheres are connected by a wide, flat tract of myelinated nerve fibres called the **corpus callosum**.\n- **Statement II is incorrect**: The brain stem consists of three parts: **midbrain, pons, and medulla oblongata** (it does not include the cerebrum)."
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
      { id: 'A', text: "(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)" },
      { id: 'B', text: "(a) - (iii), (b) - (i), (c) - (iv), (d) - (ii)" },
      { id: 'C', text: "(a) - (ii), (b) - (iv), (c) - (iii), (d) - (i)" },
      { id: 'D', text: "(a) - (ii), (b) - (iii), (c) - (i), (d) - (iv)" }
    ],
    exam: "NEET 2022 Phase 2",
    explanation: "**Correct Option: A**\n\n- **Multipolar neuron**: Found in the cerebral cortex (a-ii).\n- **Bipolar neuron**: Found in the retina of the eye (b-iii).\n- **Myelinated nerve fibre**: Enclosed by Schwann cells producing myelin sheath, commonly found in cranial and spinal nerves (c-iv).\n- **Unmyelinated nerve fibre**: Enclosed by Schwann cells without myelin sheath, commonly found in autonomous and somatic neural systems (d-i)."
  },
  18: {
    question: `The figure shows an axon terminal and synapse. Select the option giving correct identification of labels A-D.`,
    options: [
      { id: 'A', text: "C-Receptor, D-Synaptic vesicles" },
      { id: 'B', text: "A-Axon terminal, B- Serotonin complex" },
      { id: 'C', text: "A-Action potential, C-Neurotransmitter" },
      { id: 'D', text: "B-Neurotransmitter, D- Receptor capsules" }
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: A**\n\nIn the given diagram of the chemical synapse:\n- **A**: Axon terminal / Pre-synaptic membrane\n- **B**: Synaptic cleft\n- **C**: Post-synaptic receptors (specific protein receptors on the post-synaptic membrane)\n- **D**: Synaptic vesicles (membrane-bound spheres storing neurotransmitters).\nTherefore, **C-Receptor, D-Synaptic vesicles** is the correct identification."
  },
  19: {
    question: `A sagittal section of human brain is shown here. Identify at least two labels from A-D.`,
    options: [
      { id: 'A', text: "A-Cerebral hemispheres, B-Cerebellum" },
      { id: 'B', text: "B-Corpus callosum, D-Medulla" },
      { id: 'C', text: "C-Mid brain, D-Cerebellum" },
      { id: 'D', text: "A-Cerebrum, C-Pons" }
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: D**\n\nIn the sagittal section of the human brain:\n- **A**: Cerebrum (cerebral cortex)\n- **B**: Thalamus / Corpus callosum\n- **C**: Pons varolii\n- **D**: Cerebellum.\nHence, option (D) correctly identifies A as Cerebrum and C as Pons."
  },
  20: {
    question: `The most abundant intracellular cation is`,
    options: [
      { id: 'A', text: "$\\text{H}^+$" },
      { id: 'B', text: "$\\text{K}^+$" },
      { id: 'C', text: "$\\text{Na}^+$" },
      { id: 'D', text: "$\\text{Ca}^{++}$" }
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: B**\n\n$\\text{K}^+$ (potassium ion) is the principal and most abundant intracellular cation in human cells and axoplasm, whereas $\\text{Na}^+$ is the principal extracellular cation."
  },
  21: {
    question: `A diagram showing axon terminal and synapse is given. Identify correctly at least two of A - D.`,
    options: [
      { id: 'A', text: "A - Receptor, C - Synaptic vesicles" },
      { id: 'B', text: "A - Neurotransmitter, B - Synaptic cleft" },
      { id: 'C', text: "C - Neurotransmitter, D - $\\text{Ca}^{++}$" },
      { id: 'D', text: "B - Synaptic connection, D - $\\text{K}^+$" }
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: A**\n\nIn the synapse diagram:\n- **A**: Specific receptors on the post-synaptic membrane\n- **B**: Synaptic cleft\n- **C**: Synaptic vesicles carrying neurotransmitters in the presynaptic terminal\n- **D**: Neurotransmitter molecules released into the cleft.\nHence, **A - Receptor, C - Synaptic vesicles** is correctly matched."
  },
  23: {
    question: `When a neuron is in resting state i.e., not conducting any impulse, the axonal membrane is`,
    options: [
      { id: 'A', text: "comparatively more permeable to $\\text{Na}^+$ ions and nearly impermeable to $\\text{K}^+$ ions" },
      { id: 'B', text: "equally permeable to both $\\text{Na}^+$ and $\\text{K}^+$ ions" },
      { id: 'C', text: "impermeable to both $\\text{Na}^+$ and $\\text{K}^+$ ions" },
      { id: 'D', text: "comparatively more permeable to $\\text{K}^+$ ions and nearly impermeable to $\\text{Na}^+$ ions." }
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: D**\n\nWhen a neuron is in a resting state (polarized), the axonal membrane is comparatively **more permeable to $\\text{K}^+$ ions** and **nearly impermeable to $\\text{Na}^+$ ions**, and completely impermeable to negatively charged proteins present in the axoplasm."
  },
  24: {
    question: `Select the answer with correct matching of the structure, its location and function.`,
    options: [
      { id: 'A', text: "Eustachian tube | Anterior part of internal ear | Equalizes air pressure on either sides of tympanic membrane" },
      { id: 'B', text: "Cerebellum | Mid Brain | Controls respiration and gastric secretions" },
      { id: 'C', text: "Hypothalamus | Fore Brain | Controls body temperature, urge for eating and drinking" },
      { id: 'D', text: "Blind spot | Near the place where optic nerve leaves the eye | Rods and cones are present but inactive here" }
    ],
    exam: "AIPMT 2010 Mains",
    explanation: "**Correct Option: C**\n\n- **Option C is correct**: The **hypothalamus** lies at the base of the thalamus in the **forebrain** and contains centres controlling body temperature, urge for eating (hunger), and drinking (thirst).\n- **Option A is incorrect**: The Eustachian tube connects the middle ear cavity with the pharynx (not anterior part of internal ear).\n- **Option B is incorrect**: Cerebellum is part of the hindbrain (not midbrain), and respiratory/gastric secretions are regulated by the medulla.\n- **Option D is incorrect**: Photoreceptor cells (rods and cones) are completely absent at the blind spot."
  },
  28: {
    question: `During the propagation of a nerve impulse, the action potential results from the movement of`,
    options: [
      { id: 'A', text: "$\\text{K}^+$ ions from intracellular fluid to extracellular fluid" },
      { id: 'B', text: "$\\text{Na}^+$ ions from extracellular fluid to intracellular fluid" },
      { id: 'C', text: "$\\text{K}^+$ ions from extracellular fluid to extracellular fluid" },
      { id: 'D', text: "$\\text{Na}^+$ ions from intracellular fluid to extracellular fluid." }
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: B**\n\nWhen a stimulus is applied at a site on the polarized membrane, the membrane becomes freely permeable to $\\text{Na}^+$. This leads to a rapid **influx of $\\text{Na}^+$ ions from extracellular fluid to intracellular fluid**, causing depolarization and generating an action potential."
  },
  34: {
    question: `In the resting state of the neural membrane, diffusion due to concentration gradients, if allowed, would drive`,
    options: [
      { id: 'A', text: "$\\text{K}^+$ into the cell" },
      { id: 'B', text: "$\\text{K}^+$ and $\\text{Na}^+$ out of the cell" },
      { id: 'C', text: "$\\text{Na}^+$ into the cell" },
      { id: 'D', text: "$\\text{Na}^+$ out of the cell." }
    ],
    exam: "AIPMT 2004",
    explanation: "**Correct Option: C**\n\nIn the resting state, the concentration of $\\text{Na}^+$ is significantly higher outside the cell than inside. Therefore, passive diffusion along the chemical concentration gradient would drive **$\\text{Na}^+$ into the cell**."
  },
  38: {
    question: `Depolarization of axolema during nerve conduction takes place because of`,
    options: [
      { id: 'A', text: "equal amount of $\\text{Na}^+$ and $\\text{K}^+$ move out across axolema" },
      { id: 'B', text: "$\\text{Na}^+$ move inside and $\\text{K}^+$ move more outside." },
      { id: 'C', text: "more $\\text{Na}^+$ outside" },
      { id: 'D', text: "none of these" }
    ],
    exam: "AIPMT 2000",
    explanation: "**Correct Option: B**\n\nDepolarization is initiated by the rapid movement of $\\text{Na}^+$ inside the axoplasm through voltage-gated sodium channels, accompanied by subsequent movement of $\\text{K}^+$ outside during the repolarization phase."
  },
  46: {
    question: `The sympathetic nerves, in mammals, arise from`,
    options: [
      { id: 'A', text: "sacral nerves" },
      { id: 'B', text: "$3^\\text{rd}, 7^\\text{th}, 9^\\text{th}$ and $10^\\text{th}$ cranial nerves" },
      { id: 'C', text: "thoraco-lumbar nerves" },
      { id: 'D', text: "cervical nerves" }
    ],
    exam: "AIPMT 1995",
    explanation: "**Correct Option: C**\n\nThe sympathetic nervous system exhibits a **thoraco-lumbar outflow**, arising from the lateral horn of spinal cord segments $T_1$ through $L_2/L_3$. In contrast, the parasympathetic nervous system has a cranio-sacral outflow."
  },
  52: {
    question: `Given below are two statements :
Statement I :- The nose contains mucus – coated receptors which are specialised for receiving the sense of smell and are called olfactory receptors.
Statement II :- Wall of the eye ball has three layers. The external layer is called choroid (dense connective tissue), middle layer is sclera (thin pigmented layer) and internal layer is retina (ganglion cells, bipolar cells and photoreceptor cells).

In the light of the above statements, choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: "Statement I is true but statement II is false" },
      { id: 'B', text: "Statement I is false but Statement II is true" },
      { id: 'C', text: "Both Statement I and Statement II are true" },
      { id: 'D', text: "Both Statement I and Statement II are false." }
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: A**\n\n- **Statement I is true**: The olfactory epithelium in the nose contains specialised mucus-coated bipolar sensory cells called olfactory receptor cells.\n- **Statement II is false**: The external layer is the **sclera** (composed of dense connective tissue), the middle layer is the **choroid** (thin, vascular, pigmented layer), and the inner layer is the **retina**."
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
      { id: 'A', text: "A-IV, B-III, C-II, D-I" },
      { id: 'B', text: "A-I, B-IV, C-III, D-II" },
      { id: 'C', text: "A-II, B-I, C-III, D-IV" },
      { id: 'D', text: "A-III, B-I, C-IV, D-II" }
    ],
    exam: "NEET 2023",
    explanation: "**Correct Option: D**\n\n- **Fovea**: The central pit in the macula lutea where only cones are densely packed, providing maximum visual acuity (A-III).\n- **Iris**: Opaque, pigmented extension of ciliary body that regulates pupil diameter (B-I).\n- **Blind spot**: Area where optic nerve exits the eyeball and retinal blood vessels enter; photoreceptors are absent (C-IV).\n- **Sclera**: External tough white coat composed of dense connective tissue (D-II)."
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
      { id: 'A', text: "(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)" },
      { id: 'B', text: "(a)-(iii), (b)-(i), (c)-(ii), (d)-(iv)" },
      { id: 'C', text: "(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)" },
      { id: 'D', text: "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)" }
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: B**\n\n- **Rods and Cones**: The photoreceptor cells of the retina (a-iii).\n- **Blind Spot**: Region devoid of photoreceptor cells where the optic nerve leaves (b-i).\n- **Fovea**: Area where cones are densely packed for high resolution (c-ii).\n- **Iris**: Visible pigmented anterior portion of the eye regulating light entry (d-iv)."
  },
  55: {
    question: `Match the following columns and select the correct option.

| Column-I | Column-II |
| :--- | :--- |
| (a) Organ of Corti | (i) Connects middle ear and pharynx |
| (b) Cochlea | (ii) Coiled part of the labyrinth |
| (c) Eustachian tube | (iii) Attached to the oval window |
| (d) Stapes | (iv) Located on the basilar membrane |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: "(A) (ii), (B) (iii), (C) (i), (D) (iv)" },
      { id: 'B', text: "(A) (iv), (B) (ii), (C) (i), (D) (iii)" },
      { id: 'C', text: "(A) (iii), (B) (i), (C) (iv), (D) (ii)" },
      { id: 'D', text: "(A) (i), (B) (ii), (C) (iv), (D) (iii)" }
    ],
    exam: "NEET 2020 Phase 1",
    explanation: "**Correct Option: B**\n\n- **Organ of Corti**: Sensory structure for hearing situated on the basilar membrane containing auditory hair cells (a-iv).\n- **Cochlea**: Coiled, fluid-filled snail-like portion of the inner ear labyrinth (b-ii).\n- **Eustachian tube**: Canal connecting middle ear cavity with the nasopharynx to balance pressure (c-i).\n- **Stapes**: Smallest ear ossicle fitted onto the oval window (fenestra ovalis) of cochlea (d-iii)."
  },
  60: {
    question: `Good vision depends on adequate intake of carotene rich food.
Select the best option from the following statements:
(1) Vitamin A derivatives are formed from carotene.
(2) The photopigments are embedded in the membrane discs of the inner segment.
(3) Retinal is a derivative of vitamin A.
(4) Retinal is a light absorbing part of all the visual photopigments.`,
    options: [
      { id: 'A', text: "(1), (3) and (4)" },
      { id: 'B', text: "(1) and (3)" },
      { id: 'C', text: "(2), (3) and (4)" },
      { id: 'D', text: "(1) and (2)" }
    ],
    exam: "NEET 2017",
    explanation: "**Correct Option: A**\n\n- **Statement (1) is correct**: Ingested beta-carotenes from plants are cleaved in intestinal mucosa to yield retinal/retinol (vitamin A).\n- **Statement (2) is incorrect**: Photopigments (rhodopsin/iodopsin) are embedded in the membrane discs of the **outer segment** of photoreceptors (not the inner segment).\n- **Statement (3) is correct**: Retinal is an aldehyde derivative of vitamin A (retinol).\n- **Statement (4) is correct**: Retinal serves as the chromophore that absorbs light energy across visual photopigments.\nTherefore, statements (1), (3), and (4) are correct."
  },
  66: {
    question: `Parts A, B, C and D of the human eye are shown in the diagram. Select the option which gives correct identification along with its functions/ characteristics.`,
    options: [
      { id: 'A', text: "B - Blind spot - Has only a few rods and cones." },
      { id: 'B', text: "A - Retina - Contains photoreceptors, i.e., rods and cones." },
      { id: 'C', text: "C - Aqueous chamber - Reflects the light which does not pass through the lens." },
      { id: 'D', text: "D - Choroid - Its anterior part forms ciliary body." }
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: B**\n\nIn the eye diagram:\n- **A**: **Retina**, the innermost sensitive layer containing photoreceptors (rods and cones), bipolar cells, and ganglion cells.\n- **B**: Blind spot (completely lacks photoreceptors, does not have 'a few rods and cones').\n- **C**: Aqueous chamber containing aqueous humor that nourishes lens and cornea (does not reflect light).\n- **D**: Sclera (the outer fibrous layer).\nHence, option (B) is accurate."
  },
  68: {
    question: `The purplish red pigment rhodopsin contained in the rods type of photoreceptor cells of the human eye, is a derivative of`,
    options: [
      { id: 'A', text: "$\\text{vitamin B}_1$" },
      { id: 'B', text: "vitamin C" },
      { id: 'C', text: "vitamin D" },
      { id: 'D', text: "vitamin A." }
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: D**\n\nRhodopsin (visual purple) is a conjugated protein composed of opsin (protein) and **retinal** (aldehyde of **vitamin A**). Deficiency of vitamin A leads to impaired rhodopsin regeneration and night blindness (nyctalopia)."
  },
  70: {
    question: `Which one of the following is the correct difference between rod cells and cone cells of our retina?`,
    options: [
      { id: 'A', text: "Overall function: Rod cells - Vision in poor light; Cone cells - Colour vision and detailed vision in bright light" },
      { id: 'B', text: "Distribution: Rod cells - More concentrated in centre of retina; Cone cells - Evenly distributed all over retina" },
      { id: 'C', text: "Visual acuity: Rod cells - High; Cone cells - Low" },
      { id: 'D', text: "Visual pigment contained: Rod cells - Iodopsin; Cone cells - Rhodopsin" }
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: A**\n\n- **Option A is correct**: Rods mediate twilight/scotopic vision (sensitive in low light), while cones mediate photopic/daylight vision and color discrimination.\n- **Option B is incorrect**: Cones are concentrated in the fovea (center), while rods are more abundant in the periphery.\n- **Option C is incorrect**: Cones provide high visual acuity, whereas rods provide lower acuity due to greater convergence.\n- **Option D is incorrect**: Rods contain rhodopsin; cones contain iodopsin / photopsin."
  },
  71: {
    question: `Given below is a diagrammatic cross section of a single loop of human cochlea.

Which one of the following options correctly represents the names of three different parts?`,
    options: [
      { id: 'A', text: "B : Tectorial membrane, C : Perilymph, D: secretory cells" },
      { id: 'B', text: "A : Perilymph, B : Tectorial membrane, C: Endolymph" },
      { id: 'C', text: "C : Endolymph, D : Sensory hair cells, A : Serum" },
      { id: 'D', text: "D : Sensory hair cells, A : Endolymph B : Tectorial membrane." }
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: B**\n\nIn the transverse section of the cochlea:\n- **A**: Scala vestibuli / scala tympani filled with **Perilymph**\n- **B**: **Tectorial membrane** overlying the sensory hair cells of the organ of Corti\n- **C**: Scala media filled with **Endolymph**\n- **D**: Basilar membrane supporting hair cells.\nTherefore, **A : Perilymph, B : Tectorial membrane, C: Endolymph** is correctly represented."
  }
};

const allQuestions = [];

for (let i = 0; i < qIndices.length; i++) {
  const qInfo = qIndices[i];
  const qNum = qInfo.qNum;
  const officialKey = officialKeys[qNum];

  if (SPECIAL_QUESTIONS[qNum]) {
    const sq = SPECIAL_QUESTIONS[qNum];
    allQuestions.push({
      num: qNum,
      exam: sq.exam,
      question: sq.question,
      options: sq.options,
      correctOption: officialKey,
      explanation: sq.explanation,
      image: diagramUrls['q_' + qNum] || ''
    });
    continue;
  }

  // Parse general question
  const nextLineIdx = (i + 1 < qIndices.length) ? qIndices[i + 1].lineIdx : linesWithMeta.length;
  const qLines = linesWithMeta.slice(qInfo.lineIdx, nextLineIdx).map(l => l.text);
  
  const cleanLines = qLines.map(l => l.replace(/Open solution/gi, '').trim()).filter(line => 
    !line.includes('ExamGOAL') &&
    !line.includes('Keep practising') &&
    !line.includes('Google Play') &&
    !line.includes('GET IT ON') &&
    !line.includes('NEET Biology:') &&
    !line.includes('Solutions: questions.examside.com') &&
    !line.startsWith('MCQ (Single Correct Answer)') &&
    !line.startsWith('Out of syllabus') &&
    !line.includes('These questions are on topics')
  ).filter(Boolean);

  const fullText = cleanLines.join(' ');
  const headerMatch = cleanLines[0].match(/^Q\d+\.\s*(.+?)(?:\s*·\s*MCQ.*)?$/);
  const exam = headerMatch ? headerMatch[1].replace(/·\s*MCQ.*$/i, '').trim() : 'NEET';

  const bodyStartIndex = fullText.indexOf(exam) + exam.length;
  let fullBody = fullText.slice(bodyStartIndex).trim();
  fullBody = fullBody.replace(/^·\s*MCQ\s*\(Single\s*Correct\s*Answer\)\s*/i, '').trim();

  const optMatch = fullBody.match(/\(A\)\s*(.*?)\s*\(B\)\s*(.*?)\s*\(C\)\s*(.*?)\s*\(D\)\s*(.*)$/);
  const questionText = fullBody.slice(0, fullBody.indexOf('(A)')).trim();

  const options = [
    { id: 'A', text: optMatch[1].trim() },
    { id: 'B', text: optMatch[2].trim() },
    { id: 'C', text: optMatch[3].trim() },
    { id: 'D', text: optMatch[4].trim() }
  ];

  const optKey = officialKey;
  const chosenOptText = options.find(o => o.id === optKey)?.text || '';

  const explanation = `**Correct Option: ${optKey}**\n\n${chosenOptText ? `**${chosenOptText}** is the correct answer according to the official NEET answer key and NCERT Neural Control and Coordination syllabus.` : `According to the official NEET answer key, option (${optKey}) is correct.`}`;

  allQuestions.push({
    num: qNum,
    exam: exam,
    question: questionText,
    options: options,
    correctOption: officialKey,
    explanation: explanation,
    image: diagramUrls['q_' + qNum] || ''
  });
}

console.log(`Generated all ${allQuestions.length} questions.`);
fs.writeFileSync('./scripts/neural_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./scripts/neural_all_questions.json');

