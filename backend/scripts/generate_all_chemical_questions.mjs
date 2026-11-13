import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/chemical_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./scripts/chemical_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./scripts/chemical_diagram_urls.json', 'utf8'));

// Reconstruct lines per page (pages 2 to 27)
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 27)) {
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
  2: {
    question: `Which one of the following statements is incorrect?`,
    options: [
      { id: 'A', text: "$\\beta$-cells of pancreas secrete insulin" },
      { id: 'B', text: "$\\alpha$-cells of pancreas secrete glucagon" },
      { id: 'C', text: "$\\alpha$-cells of pancreas secrete insulin" },
      { id: 'D', text: "Glucagon stimulates glycogenolysis" }
    ],
    exam: "RE-NEET 2026",
    explanation: "**Correct Option: C**\n\n- Statement C is incorrect: In the Islets of Langerhans, **$\\alpha$-cells secrete glucagon** and **$\\beta$-cells secrete insulin** (not $\\alpha$-cells secreting insulin).\n- Glucagon stimulates glycogenolysis (breakdown of glycogen into glucose) and gluconeogenesis, resulting in hyperglycemia."
  },
  3: {
    question: `Match List-I with List-II:

| List-I | List-II |
| :--- | :--- |
| (A) Excess growth hormone | (I) Reabsorption of water and electrolytes in kidney |
| (B) Luteinizing hormone | (II) Contraction of uterus during child birth |
| (C) Vasopressin | (III) Acromegaly |
| (D) Oxytocin | (IV) Ovulation |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: "A-IV, B-III, C-I, D-II" },
      { id: 'B', text: "A-III, B-IV, C-II, D-I" },
      { id: 'C', text: "A-III, B-IV, C-I, D-II" },
      { id: 'D', text: "A-II, B-IV, C-I, D-III" }
    ],
    exam: "RE-NEET 2026",
    explanation: "**Correct Option: C**\n\n- **Excess growth hormone**: In adults causes severe disfigurement known as Acromegaly (A-III).\n- **Luteinizing hormone (LH)**: Induces ovulation of fully mature follicles (graafian follicles) in females (B-IV).\n- **Vasopressin (ADH)**: Stimulates reabsorption of water and electrolytes by the distal tubules of the kidney (C-I).\n- **Oxytocin**: Acts on the smooth muscles of the uterus and causes strong uterine contractions during parturition (childbirth) (D-II)."
  },
  4: {
    question: `Match List I with List II:

| List I | List II |
| :--- | :--- |
| A. Cortisol | I. Stimulates the formation of alveoli in mammary glands |
| B. Aldosterone | II. Produces anti-inflammatory reactions |
| C. Cholecystokinin | III. Stimulates reabsorption of $\\text{Na}^+$ and water from renal tubule |
| D. Progesterone | IV. Stimulates secretion of pancreatic enzymes and bile juice |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: "A-III, B-II, C-IV, D-I" },
      { id: 'B', text: "A-IV, B-II, C-I, D-III" },
      { id: 'C', text: "A-II, B-III, C-IV, D-I" },
      { id: 'D', text: "A-II, B-III, C-I, D-IV" }
    ],
    exam: "NEET 2026",
    explanation: "**Correct Option: C**\n\n- **Cortisol**: Glucocorticoid that produces anti-inflammatory reactions and suppresses the immune response (A-II).\n- **Aldosterone**: Mineralocorticoid acting on renal tubules to stimulate reabsorption of $\\text{Na}^+$ and water (B-III).\n- **Cholecystokinin (CCK)**: Acts on both pancreas and gall bladder, stimulating secretion of pancreatic enzymes and bile juice (C-IV).\n- **Progesterone**: Acts on mammary glands and stimulates the formation of alveoli (sac-like structures that store milk) and milk secretion (D-I)."
  },
  5: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| A. Progesterone | I. Pars intermedia |
| B. Relaxin | II. Ovary |
| C. Melanocyte stimulating hormone | III. Adrenal Medulla |
| D. Catecholamines | IV. Corpus luteum |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-II, B-IV, C-I, D-III" },
      { id: 'B', text: "A-III, B-II, C-IV, D-I" },
      { id: 'C', text: "A-IV, B-II, C-I, D-III" },
      { id: 'D', text: "A-IV, B-II, C-III, D-I" }
    ],
    exam: "NEET 2025",
    explanation: "**Correct Option: C**\n\n- **Progesterone**: Secreted in large amounts by the corpus luteum to maintain endometrium (A-IV).\n- **Relaxin**: Secreted by the ovary in the later stages of pregnancy (B-II).\n- **Melanocyte stimulating hormone (MSH)**: Secreted by pars intermedia of pituitary gland (C-I).\n- **Catecholamines (Adrenaline & Noradrenaline)**: Secreted by adrenal medulla during emergency situations (D-III)."
  },
  8: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| A. Heart | I. Erythropoietin |
| B. Kidney | II. Aldosterone |
| C. Gastro-intestinal tract | III. Atrial natriuretic factor |
| D. Adrenal Cortex | IV. Secretin |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-I, B-III, C-IV, D-II" },
      { id: 'B', text: "A-III, B-I, C-IV, D-II" },
      { id: 'C', text: "A-II, B-I, C-III, D-IV" },
      { id: 'D', text: "A-IV, B-III, C-II, D-I" }
    ],
    exam: "NEET 2025",
    explanation: "**Correct Option: B**\n\n- **Heart**: The atrial wall secretes Atrial Natriuretic Factor (ANF) when blood pressure increases (A-III).\n- **Kidney**: Juxtaglomerular cells produce Erythropoietin which stimulates erythropoiesis (A-I).\n- **Gastro-intestinal tract**: Secretes peptide hormones including Secretin, gastrin, CCK, and GIP (C-IV).\n- **Adrenal Cortex**: Secretes mineralocorticoids like Aldosterone (D-II)."
  },
  10: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Epinephrine | (I) Hyperglycemia |
| (B) Thyroxine | (II) Smooth muscle contraction |
| (C) Oxytocin | (III) Basal metabolic rate |
| (D) Glucagon | (IV) Emergency hormone |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-II, B-I, C-IV, D-III" },
      { id: 'B', text: "A-III, B-II, C-I, D-IV" },
      { id: 'C', text: "A-IV, B-III, C-II, D-I" },
      { id: 'D', text: "A-I, B-IV, C-III, D-II" }
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: C**\n\n- **Epinephrine**: Emergency hormone secreted during stress/fight-or-flight conditions (A-IV).\n- **Thyroxine**: Regulates the basal metabolic rate (BMR) (B-III).\n- **Oxytocin**: Stimulates vigorous contraction of smooth muscles of the uterus (C-II).\n- **Glucagon**: Hyperglycemic hormone that raises blood glucose levels (D-I)."
  },
  14: {
    question: `Match List I with List II :

| List - I | List - II |
| :--- | :--- |
| A. Exophthalmic goiter | I. Excess secretion of cortisol, moon face & hyperglycemia. |
| B. Acromegaly | II. Hypo-secretion of thyroid hormone and stunted growth. |
| C. Cushing's syndrome | III. Hyper secretion of thyroid hormone & protruding eye balls. |
| D. Cretinism | IV. Excessive secretion of growth hormone. |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-I, B-III, C-II, D-IV" },
      { id: 'B', text: "A-IV, B-II, C-I, D-III" },
      { id: 'C', text: "A-III, B-IV, C-II, D-I" },
      { id: 'D', text: "A-III, B-IV, C-I, D-II" }
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: D**\n\n- **Exophthalmic goiter (Graves' disease)**: Form of hyperthyroidism characterized by enlargement of thyroid gland, protrusion of eyeballs, increased BMR (A-III).\n- **Acromegaly**: Caused by hypersecretion of growth hormone in adults, causing disfigurement especially of the face (B-IV).\n- **Cushing's syndrome**: Caused by hypersecretion of cortisol from adrenal cortex (A-I).\n- **Cretinism**: Hypothyroidism during pregnancy causing defective development and stunted growth of baby (D-II)."
  },
  19: {
    question: `Which of the following are not the effects of Parathyroid hormone?
(a) Stimulates the process of bone resorption
(b) Decreases $\\text{Ca}^{2+}$ level in blood
(c) Reabsorption of $\\text{Ca}^{2+}$ by renal tubules
(d) Decreases the absorption of $\\text{Ca}^{2+}$ from digested food
(e) Increases metabolism of carbohydrates

Choose the most appropriate answer from the options given below:`,
    options: [
      { id: 'A', text: "(a) and (c) only" },
      { id: 'B', text: "(b), (d) and (e) only" },
      { id: 'C', text: "(a) and (e) only" },
      { id: 'D', text: "(b) and (c) only" }
    ],
    exam: "NEET 2022 Phase 1",
    explanation: "**Correct Option: B**\n\n- Parathyroid hormone (PTH) is a hypercalcemic hormone that **increases blood $\\text{Ca}^{2+}$ levels** by stimulating bone resorption, reabsorption of $\\text{Ca}^{2+}$ by renal tubules, and increasing $\\text{Ca}^{2+}$ absorption from digested food.\n- Therefore, statements (b) decreases $\\text{Ca}^{2+}$ level, (d) decreases absorption of $\\text{Ca}^{2+}$, and (e) increases metabolism of carbohydrates are NOT effects of PTH."
  },
  22: {
    question: `Match the following columns and select the correct option :

| Column - I | Column - II |
| :--- | :--- |
| (a) Ovary | (i) Human chorionic Gonadotropin |
| (b) Placenta | (ii) Estrogen & Progesterone |
| (c) Corpus luteum | (iii) Androgens |
| (d) Leydig cells | (iv) Progesterone only |

Choose the correct option:`,
    options: [
      { id: 'A', text: "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)" },
      { id: 'B', text: "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)" },
      { id: 'C', text: "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)" },
      { id: 'D', text: "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)" }
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: A**\n\n- **Ovary**: Produces primary female sex hormones, estrogen and progesterone (a-ii).\n- **Placenta**: Produces hormones including hCG (human chorionic gonadotropin), hPL, estrogen, progesterone (b-i).\n- **Corpus luteum**: Primarily secretes large amounts of progesterone to maintain pregnancy (c-iv).\n- **Leydig cells (interstitial cells)**: Produce androgens, principally testosterone (d-iii)."
  },
  23: {
    question: `Match the following columns and select the correct option :

| Column - I | Column - II |
| :--- | :--- |
| (a) Pituitary hormone | (i) Steroid |
| (b) Epinephrine | (ii) Neuropeptides |
| (c) Endorphins | (iii) Peptides, proteins |
| (d) Cortisol | (iv) Biogenic amines |

Choose the correct option:`,
    options: [
      { id: 'A', text: "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)" },
      { id: 'B', text: "(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)" },
      { id: 'C', text: "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)" },
      { id: 'D', text: "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)" }
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: C**\n\n- **Pituitary hormones**: Peptide and protein hormones (a-iii).\n- **Epinephrine**: Amino acid derivative / biogenic amine derived from tyrosine (b-iv).\n- **Endorphins**: Neuropeptides that act as endogenous analgesics (c-ii).\n- **Cortisol**: Glucocorticoid steroid hormone synthesized from cholesterol (d-i)."
  },
  24: {
    question: `Match the following columns and select the correct option:

| Column-I | Column-II |
| :--- | :--- |
| (a) Pituitary gland | (i) Grave's disease |
| (b) Thyroid gland | (ii) Diabetes mellitus |
| (c) Adrenal gland | (iii) Diabetes insipidus |
| (d) Pancreas | (iv) Addison's disease |

Choose the correct option:`,
    options: [
      { id: 'A', text: "(A) (iii), (B) (ii), (C) (i), (D) (iv)" },
      { id: 'B', text: "(A) (iv), (B) (iii), (C) (i), (D) (ii)" },
      { id: 'C', text: "(A) (ii), (B) (i), (C) (iv), (D) (iii)" },
      { id: 'D', text: "(A) (iii), (B) (i), (C) (iv), (D) (ii)" }
    ],
    exam: "NEET 2020 Phase 1",
    explanation: "**Correct Option: D**\n\n- **Pituitary gland**: Deficiency of ADH (vasopressin) causes Diabetes insipidus (a-iii).\n- **Thyroid gland**: Hyperthyroidism with toxic diffuse goiter causes Grave's disease (b-i).\n- **Adrenal gland**: Hyposecretion of adrenal cortex hormones causes Addison's disease (c-iv).\n- **Pancreas**: Deficiency of insulin causes Diabetes mellitus (d-ii)."
  },
  26: {
    question: `Identify A, B and C in the diagrammatic representation of the mechanism of hormone action.

Select the correct option from the following:`,
    options: [
      { id: 'A', text: "A = Protein Hormone; B = Cyclic AMP; C = Hormone-receptor Complex" },
      { id: 'B', text: "A = Steroid Hormone; B = Hormone-receptor Complex; C = Protein" },
      { id: 'C', text: "A = Protein Hormone; B = Receptor; C = Cyclic AMP" },
      { id: 'D', text: "A = Steroid Hormone; B = Receptor; C = Second Messenger" }
    ],
    exam: "NEET 2019 (Odisha)",
    explanation: "**Correct Option: C**\n\nIn the mechanism of action of water-soluble protein/peptide hormones (e.g., FSH):\n- **A**: **Protein Hormone** (first messenger) that interacts with membrane-bound receptor.\n- **B**: **Membrane-bound Receptor** on the target cell ovarian membrane.\n- **C**: **Generation of second messenger** (e.g., **Cyclic AMP** or $\\text{Ca}^{2+}$) which regulates cellular biochemical metabolism and results in physiological responses."
  },
  28: {
    question: `Which of the following conditions will stimulate parathyroid gland to release parathyroid hormone?`,
    options: [
      { id: 'A', text: "Rise in blood $\\text{Ca}^{+2}$ levels" },
      { id: 'B', text: "Fall in active Vitamin D levels" },
      { id: 'C', text: "Fall in blood $\\text{Ca}^{+2}$ levels" },
      { id: 'D', text: "Fall in bone $\\text{Ca}^{+2}$ levels" }
    ],
    exam: "NEET 2019 (Odisha)",
    explanation: "**Correct Option: C**\n\nParathyroid hormone (PTH) secretion is stimulated by a **fall in blood calcium ($\\text{Ca}^{2+}$) levels** (hypocalcemia). PTH acts to raise circulating blood $\\text{Ca}^{2+}$ back to normal levels."
  },
  29: {
    question: `Match the following hormones with the respective disease :

| Column I (Hormone) | Column II (Disease) |
| :--- | :--- |
| (a) Insulin | (i) Addison's disease |
| (b) Thyroxin | (ii) Diabetes insipidus |
| (c) Corticoids | (iii) Acromegaly |
| (d) Growth Hormones | (iv) Goitre |
| | (v) Diabetes mellitus |

Select the correct option:`,
    options: [
      { id: 'A', text: "(a)-(v), (b)-(iv), (c)-(i), (d)-(iii)" },
      { id: 'B', text: "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)" },
      { id: 'C', text: "(a)-(v), (b)-(i), (c)-(ii), (d)-(iii)" },
      { id: 'D', text: "(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)" }
    ],
    exam: "NEET 2019",
    explanation: "**Correct Option: A**\n\n- **Insulin**: Deficiency leads to Diabetes mellitus (a-v).\n- **Thyroxin**: Deficiency leads to simple Goitre (b-iv).\n- **Corticoids**: Hyposecretion leads to Addison's disease (c-i).\n- **Growth Hormones**: Hypersecretion in adults leads to Acromegaly (d-iii)."
  },
  47: {
    question: `Select the option which correctly matches the endocrine gland with its hormone and its function.`,
    options: [
      { id: 'A', text: "Placenta | Estrogen | Initiates secretion of the milk" },
      { id: 'B', text: "Corpus luteum | Estrogen | Essential for maintenance of endometrium" },
      { id: 'C', text: "Leydig's cells | Androgen | Initiates the production of sperms" },
      { id: 'D', text: "Ovary | FSH | Stimulates follicular development and the secretion of estrogens" }
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: C**\n\n- **Option C is correct**: Leydig cells (interstitial cells) secrete androgens (primarily testosterone) which stimulate and initiate spermatogenesis.\n- Option A is incorrect: Milk secretion is stimulated by prolactin and ejected by oxytocin.\n- Option B is incorrect: Maintenance of endometrium is primarily by progesterone.\n- Option D is incorrect: FSH is secreted by anterior pituitary, not ovary."
  },
  52: {
    question: `Select the answer which correctly matches the endocrine gland with the hormone it secretes and its function/deficiency symptom.`,
    options: [
      { id: 'A', text: "Thyroid gland | Thyroxine | Lack of iodine in diet results in goitre" },
      { id: 'B', text: "Corpus luteum | Testosterone | Stimulates spermatogenesis" },
      { id: 'C', text: "Anterior pituitary | Oxytocin | Stimulates uterine contraction during child birth" },
      { id: 'D', text: "Posterior pituitary | Growth hormone (GH) | Oversecretion stimulates abnormal growth" }
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: A**\n\n- **Option A is correct**: Dietary deficiency of iodine impairs thyroxine synthesis, causing enlargement of the thyroid gland known as simple goitre.\n- Option B is incorrect: Corpus luteum secretes progesterone, not testosterone.\n- Option C is incorrect: Oxytocin is released from posterior pituitary, not anterior pituitary.\n- Option D is incorrect: Growth hormone is secreted by anterior pituitary, not posterior pituitary."
  },
  55: {
    question: `What is correct to say about the hormone action in humans?`,
    options: [
      { id: 'A', text: "Glucagon is secreted by $\\beta$-cells of islets of Langerhans and stimulates glycogenolysis." },
      { id: 'B', text: "Secretion of thymosins is stimulated with aging." },
      { id: 'C', text: "In females, FSH first binds with specific receptors on ovarian cell membrane." },
      { id: 'D', text: "FSH stimulates the secretion of estrogen and progesterone." }
    ],
    exam: "AIPMT 2012 Prelims",
    explanation: "**Correct Option: C**\n\n- **Option C is correct**: Being a peptide hormone, FSH cannot cross the lipid bilayer and binds with specific extracellular membrane receptors on the ovarian cell membrane.\n- Option A is incorrect: Glucagon is secreted by $\\alpha$-cells, not $\\beta$-cells.\n- Option B is incorrect: Thymus degenerates with aging, decreasing thymosin secretion.\n- Option D is incorrect: Progesterone is primarily stimulated by LH acting on corpus luteum."
  },
  57: {
    question: `Match the source gland with its respective hormone and function and select the correct option.`,
    options: [
      { id: 'A', text: "Anterior pituitary | Oxytocin | Contraction of uterus muscles during child birth" },
      { id: 'B', text: "Posterior pituitary | Vasopressin | Stimulates reabsorption of water in the distal tubules in the nephron" },
      { id: 'C', text: "Corpus luteum | Estrogen | Supports pregnancy" },
      { id: 'D', text: "Thyroid | Thyroxine | Regulates blood calcium level" }
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: B**\n\n- **Option B is correct**: Vasopressin (ADH) is released from the posterior pituitary and acts mainly at the DCT and collecting duct of the kidney to stimulate reabsorption of water.\n- Option A is incorrect: Oxytocin is released by posterior pituitary.\n- Option C is incorrect: Corpus luteum secretes progesterone to support pregnancy.\n- Option D is incorrect: Blood calcium is regulated by calcitonin (TCT) and parathyroid hormone."
  },
  58: {
    question: `Given below is an incomplete table on hormones, their source glands and one major effect of each on human body. Identify the option representing correct grouping of hormone its gland and effect.

| Gland | Secretion | Effect on body |
| :--- | :--- | :--- |
| A | Estrogen | Maintenance of secondary sexual characters |
| Alpha cells of Islets of Langerhans | B | Raises blood sugar level |
| Anterior pituitary | C | Over secretion leads to gigantism |`,
    options: [
      { id: 'A', text: "A: Ovary, B: Glucagon, C: Growth hormone" },
      { id: 'B', text: "A: Placenta, B: Insulin, C: Vasopressin" },
      { id: 'C', text: "A: Ovary, B: Insulin, C: Calcitonin" },
      { id: 'D', text: "A: Placenta, B: Glucagon, C: Calcitonin" }
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: A**\n\n- **A**: Ovary secretes estrogen for maintenance of secondary sexual characters in females.\n- **B**: Alpha cells of islets of Langerhans secrete glucagon which raises blood sugar level.\n- **C**: Anterior pituitary secretes growth hormone; hypersecretion during childhood leads to gigantism."
  },
  59: {
    question: `Select the correct matching of a hormone, its source and function.`,
    options: [
      { id: 'A', text: "Vasopressin | Posterior pituitary | Increases loss of water through urine" },
      { id: 'B', text: "Norepinephrine | Adrenal medulla | Increases heart beat, rate of respiration and alertness" },
      { id: 'C', text: "Glucagon | Beta-cells of Islets of Langerhans | Stimulates glycogenolysis" },
      { id: 'D', text: "Prolactin | Posterior pituitary | Regulates growth of mammary glands and milk formation in females" }
    ],
    exam: "AIPMT 2010 Mains",
    explanation: "**Correct Option: B**\n\n- **Option B is correct**: Norepinephrine (noradrenaline) is secreted by adrenal medulla and increases heartbeat, strength of heart contraction, respiratory rate, and alertness.\n- Option A is incorrect: Vasopressin prevents water loss (anti-diuretic).\n- Option C is incorrect: Glucagon is produced by alpha-cells.\n- Option D is incorrect: Prolactin is secreted by anterior pituitary."
  },
  79: {
    question: `Adrenaline directly affects on`,
    options: [
      { id: 'A', text: "S.A. node" },
      { id: 'B', text: "$\\beta$-cells of Langerhans" },
      { id: 'C', text: "dorsal root of spinal nerve" },
      { id: 'D', text: "epithelial cells of stomach." }
    ],
    exam: "AIPMT 2002",
    explanation: "**Correct Option: A**\n\nAdrenaline acts directly on adrenergic receptors of the sinoatrial (S.A.) node in the heart, increasing the rate of heart contractions (tachycardia) and cardiac output."
  },
  88: {
    question: `Diabetes is due to`,
    options: [
      { id: 'A', text: "iodine deficiency" },
      { id: 'B', text: "hormonal deficiency" },
      { id: 'C', text: "$\\text{Na}^+$ deficiency" },
      { id: 'D', text: "enzyme deficiency" }
    ],
    exam: "AIPMT 1999",
    explanation: "**Correct Option: B**\n\nDiabetes (both diabetes mellitus due to insulin deficiency and diabetes insipidus due to ADH deficiency) is caused by a **hormonal deficiency**."
  },
  108: {
    question: `Match List I with List II:

| List I | List II |
| :--- | :--- |
| (A) CCK | (I) Kidney |
| (B) GIP | (II) Heart |
| (C) ANF | (III) Gastric gland |
| (D) ADH | (IV) Pancreas |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-III, B-II, C-IV, D-I" },
      { id: 'B', text: "A-II, B-IV, C-I, D-III" },
      { id: 'C', text: "A-IV, B-II, C-III, D-I" },
      { id: 'D', text: "A-IV, B-III, C-II, D-I" }
    ],
    exam: "NEET 2023",
    explanation: "**Correct Option: D**\n\n- **CCK (Cholecystokinin)**: Acts on the pancreas and gallbladder (A-IV).\n- **GIP (Gastric Inhibitory Peptide)**: Inhibits gastric secretion and motility in the gastric glands (B-III).\n- **ANF (Atrial Natriuretic Factor)**: Secreted by atrial wall of the heart (C-II).\n- **ADH (Antidiuretic Hormone)**: Acts on kidney tubules to promote water reabsorption (D-I)."
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

  const explanation = `**Correct Option: ${optKey}**\n\n${chosenOptText ? `**${chosenOptText}** is the correct answer according to the official NEET answer key and NCERT Chemical Coordination and Integration syllabus.` : `According to the official NEET answer key, option (${optKey}) is correct.`}`;

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
fs.writeFileSync('./scripts/chemical_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./scripts/chemical_all_questions.json');

