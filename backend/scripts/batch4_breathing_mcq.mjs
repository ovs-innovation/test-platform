import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/breathing_diagrams_map.json'));

export const batch4Questions = [
  {
    question_number: 76,
    question_text: "How many of the given statement(s) (A-D) is/are correct w.r.t. neural control of breathing?\nA. Pneumotaxic and Apneustic centres are located in pons.\nB. Expiratory area is active only during forceful exhalation.\nC. Expiratory area causes normal and forceful expiration.\nD. Apneustic area prolongs the inhalation time.\nSelect the correct option:",
    options: [
      "4",
      "3",
      "2",
      "1"
    ],
    correct_answer: "3",
    explanation: "Three statements (A, B, and D) are correct. Statement C is incorrect because normal quiet expiration is a passive process resulting from elastic recoil of the lungs, not driven by the active firing of the expiratory area.",
    difficulty: "medium",
    topic: "Neural Centres of Respiration"
  },
  {
    question_number: 77,
    question_text: "Which of the following is not related to asbestosis?",
    options: [
      "Lung fibrosis",
      "Occupational respiratory disorder",
      "Upper part of lungs affected",
      "Caused due to excessive cigarette smoking"
    ],
    correct_answer: "Caused due to excessive cigarette smoking",
    explanation: "Asbestosis is an occupational restrictive lung disease caused by the inhalation of microscopic asbestos fibres, leading to pulmonary fibrosis. It is not caused by cigarette smoking (though smoking synergistically increases bronchogenic carcinoma risk in asbestos-exposed workers).",
    difficulty: "easy",
    topic: "Asbestosis"
  },
  {
    question_number: 78,
    question_text: "From the oxygen dissociation curve given below, identify the respiratory pigments designated as A, B and C and choose the correct option.",
    options: [
      "A - Myoglobin (Mb), B - Adult Hb (HbA), C - Foetal Hb (HbF)",
      "A - Myoglobin (Mb), B - Foetal Hb (HbF), C - Adult Hb (HbA)",
      "A - Foetal Hb (HbF), B - Adult Hb (HbA), C - Myoglobin (Mb)",
      "A - Adult Hb (HbA), B - Foetal Hb (HbF), C - Myoglobin (Mb)"
    ],
    correct_answer: "A - Myoglobin (Mb), B - Foetal Hb (HbF), C - Adult Hb (HbA)",
    explanation: "Curve A (hyperbolic, extreme left) represents myoglobin which has the highest oxygen affinity. Curve B (shifted left of adult Hb) represents foetal haemoglobin (HbF). Curve C represents standard maternal adult haemoglobin (HbA).",
    image_url: diagrams.zoo_q78_o2_curves,
    difficulty: "hard",
    topic: "Oxygen Dissociation Curves of Respiratory Pigments"
  },
  {
    question_number: 79,
    question_text: "Relaxation of the diaphragm and external intercostal muscles will cause",
    options: [
      "Return of the diaphragm and sternum to the original position",
      "Return of the sternum only to its original position",
      "Increase in the pulmonary volume",
      "Elevation of ribs and sternum"
    ],
    correct_answer: "Return of the diaphragm and sternum to the original position",
    explanation: "When the diaphragm and external intercostal muscles relax, the diaphragm resumes its convex dome shape and the sternum and ribs return to their original inferior position, decreasing thoracic volume and causing expiration.",
    difficulty: "easy",
    topic: "Expiration Mechanics"
  },
  {
    question_number: 80,
    question_text: "Choose the correct option to fill in the blanks:\nDuring normal exhalation, there is ________, whereas in forceful exhalation, there is active contraction of ________.",
    options: [
      "Active contraction of internal intercostals; diaphragm and external intercostals",
      "Contraction of abdominal muscles; diaphragm and external intercostals",
      "Relaxation of external intercostals and diaphragm; internal intercostals and abdominal muscles",
      "Contraction of phrenic muscles; internal intercostals and abdominal muscles"
    ],
    correct_answer: "Relaxation of external intercostals and diaphragm; internal intercostals and abdominal muscles",
    explanation: "Normal exhalation is passive, requiring only relaxation of the inspiratory muscles (diaphragm and external intercostals). Forceful expiration is an active process involving the contraction of internal intercostal muscles and anterior abdominal muscles.",
    difficulty: "medium",
    topic: "Quiet vs Forceful Expiration"
  },
  {
    question_number: 81,
    question_text: "Match the following columns and choose the correct option:\nColumn I:\n(a) Inspiratory capacity\n(b) Vital capacity\n(c) Functional residual capacity\n(d) Expiratory capacity\n\nColumn II:\n(i) RV + ERV\n(ii) TV + ERV\n(iii) IRV + TV + ERV\n(iv) TV + IRV",
    options: [
      "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)",
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)",
      "(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)"
    ],
    correct_answer: "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)",
    explanation: "Inspiratory capacity (IC) = TV + IRV (iv). Vital capacity (VC) = IRV + TV + ERV (iii). Functional residual capacity (FRC) = RV + ERV (i). Expiratory capacity (EC) = TV + ERV (ii).",
    difficulty: "easy",
    topic: "Respiratory Capacities Matching"
  },
  {
    question_number: 82,
    question_text: "Oxygen binds with ________ of haemoglobin. This reaction is ________ and is an example of ________.",
    options: [
      "Fe2+; reversible; oxygenation",
      "Fe3+; oxidation; reversible",
      "Fe2+; irreversible; oxygenation",
      "Fe3+; reversible; oxygenation"
    ],
    correct_answer: "Fe2+; reversible; oxygenation",
    explanation: "Molecular oxygen binds reversibly to the ferrous iron (Fe2+) of the heme group. Because the iron remains in the reduced Fe2+ state without electron transfer to Fe3+, this reaction is defined as oxygenation, not oxidation.",
    difficulty: "medium",
    topic: "Biochemistry of Oxygen Binding to Haemoglobin"
  },
  {
    question_number: 83,
    question_text: "Select the correct sequence for O2 movement across the diffusion membrane into capillary blood in lungs:\n(a) Capillary basement membrane\n(b) Capillary endothelial cells\n(c) Interstitial fluid\n(d) Alveolar basement membrane\n(e) Alveolar epithelial cells",
    options: [
      "(e) -> (a) -> (b) -> (d) -> (c)",
      "(a) -> (d) -> (b) -> (c) -> (e)",
      "(e) -> (d) -> (c) -> (a) -> (b)",
      "(d) -> (e) -> (c) -> (a) -> (b)"
    ],
    correct_answer: "(e) -> (d) -> (c) -> (a) -> (b)",
    explanation: "Oxygen diffusing from alveolar air into blood crosses: (e) squamous alveolar epithelium -> (d) alveolar epithelial basement membrane -> (c) thin interstitial fluid layer -> (a) capillary basement membrane -> (b) capillary endothelial cell layer.",
    difficulty: "hard",
    topic: "Layers of the Respiratory Diffusion Membrane"
  },
  {
    question_number: 84,
    question_text: "Respiratory rhythm centre is present in ________ and it stimulates ________ of external intercostal and phrenic muscles during normal inhalation.",
    options: [
      "Pons; contraction",
      "Pons; relaxation",
      "Medulla oblongata; contraction",
      "Medulla oblongata; relaxation"
    ],
    correct_answer: "Medulla oblongata; contraction",
    explanation: "The primary respiratory rhythm centre is located in the dorsal medulla oblongata. It periodically discharges nerve impulses that cause rhythmic contraction of the diaphragm (via phrenic nerves) and external intercostal muscles.",
    difficulty: "easy",
    topic: "Medullary Rhythm Centre"
  },
  {
    question_number: 85,
    question_text: "Which of the following is an incorrect statement?",
    options: [
      "Intrapleural pressure is less than intra-pulmonary pressure",
      "Collapsing of alveoli is called as atelectasis",
      "Tidal volume is the volume of air inhaled after a forceful exhalation",
      "Incomplete cartilaginous rings are present around trachea, bronchi and initial bronchioles"
    ],
    correct_answer: "Tidal volume is the volume of air inhaled after a forceful exhalation",
    explanation: "Tidal volume is defined as the volume of air inspired or expired during a normal unforced respiration (~500 mL). The maximum volume of air that can be inspired after a forceful expiration is Vital Capacity (VC), not Tidal Volume.",
    difficulty: "medium",
    topic: "Respiratory Volumes Definitions Evaluation"
  },
  {
    question_number: 86,
    question_text: "Choose the correct option to fill in the blanks:\n________ of CO2 is transported as carbaminohaemoglobin and ________ as bicarbonates in plasma.",
    options: [
      "70%, 30%",
      "20-25%, 70%",
      "7%, 23%",
      "23%, 7%"
    ],
    correct_answer: "20-25%, 70%",
    explanation: "According to NCERT, about 20-25% of CO2 is transported bound to haemoglobin as carbamino-haemoglobin, and 70% is transported as bicarbonate ions (HCO3-) in plasma.",
    difficulty: "easy",
    topic: "CO2 Transport Percentages"
  },
  {
    question_number: 87,
    question_text: "Which of the following options is incorrect?",
    options: [
      "Effect of oxyhaemoglobin formation on CO2 transport is called Haldane effect",
      "During strong pneumotaxic signal, complete filling of lungs occurs",
      "VC = IRV + TV + ERV",
      "Arytenoid cartilages are two roughly pyramid shaped cartilages"
    ],
    correct_answer: "During strong pneumotaxic signal, complete filling of lungs occurs",
    explanation: "A strong pneumotaxic signal switches off inspiration early, shortening the inspiratory phase and leading to incomplete lung filling (shallow breaths) with an increased respiratory rate. Complete filling occurs when the pneumotaxic centre is inhibited.",
    difficulty: "hard",
    topic: "Pneumotaxic Control Mechanisms"
  },
  {
    question_number: 88,
    question_text: "Dorsal respiratory centre receives chemical signals from carotid and aortic bodies (peripheral chemoreceptors) by the means of",
    options: [
      "Glossopharyngeal and Vagus cranial nerves respectively",
      "Vagus and Glossopharyngeal cranial nerves respectively",
      "Facial and Glossopharyngeal cranial nerves respectively",
      "Vagus and Facial cranial nerves respectively"
    ],
    correct_answer: "Glossopharyngeal and Vagus cranial nerves respectively",
    explanation: "Afferent impulses from the carotid bodies are transmitted to the respiratory rhythm centre via the carotid sinus branch of the glossopharyngeal nerve (cranial nerve IX), while impulses from aortic bodies travel via the vagus nerve (cranial nerve X).",
    difficulty: "medium",
    topic: "Peripheral Chemoreceptors Afferent Pathways"
  },
  {
    question_number: 89,
    question_text: "Major part of carbon dioxide is transported in the form of",
    options: [
      "Dissolved state",
      "Sodium bicarbonate",
      "Potassium bicarbonate",
      "Carbamino-haemoglobin"
    ],
    correct_answer: "Sodium bicarbonate",
    explanation: "Nearly 70% of carbon dioxide is transported as bicarbonate ions in the plasma. In the plasma, bicarbonate ions combine with sodium cations (Na+) to circulate as sodium bicarbonate (NaHCO3).",
    difficulty: "easy",
    topic: "Bicarbonate Transport of CO2"
  },
  {
    question_number: 90,
    question_text: "Respiratory rhythm centre is present in the medulla and is primarily responsible for regulation of respiration as per demands of the body tissues. This centre is regulated by\na. Pneumotaxic centre present in pons region\nb. Central chemoreceptors adjacent to rhythm centre\nc. Peripheral chemoreceptors present in aortic arch and carotid artery\nChoose the correct option:",
    options: [
      "Only a",
      "Only b and c",
      "Only c and a",
      "a, b and c"
    ],
    correct_answer: "a, b and c",
    explanation: "All three components participate in the regulation of the medullary rhythm centre: the pneumotaxic centre in pons (neural moderation), central chemoreceptors in medulla (CSF H+/CO2 sensing), and peripheral chemoreceptors in carotid and aortic bodies (arterial blood gas sensing).",
    difficulty: "easy",
    topic: "Integrated Regulation of Respiration"
  },
  {
    question_number: 91,
    question_text: "When oxygen haemoglobin dissociation curve gets shifted towards the right side, it reflects the following features, except:",
    options: [
      "Decreased affinity of haemoglobin for oxygen",
      "Facilitates dissociation of oxyhaemoglobin",
      "Decrease in P50 value",
      "Less percentage saturation of haemoglobin at a given pO2"
    ],
    correct_answer: "Decrease in P50 value",
    explanation: "A rightward shift of the oxygen dissociation curve denotes a lower affinity for oxygen, which means a higher pO2 is required to achieve 50% saturation; therefore, the P50 value increases, not decreases.",
    difficulty: "medium",
    topic: "P50 and Dissociation Curve Shift"
  },
  {
    question_number: 137,
    question_text: "The movement of air into the lungs occurs due to a pressure gradient between the lungs and the atmosphere. So, inspiration occurs in all of the following conditions, except:",
    options: [
      "Intra-pulmonary pressure is less than atmospheric pressure",
      "Increase in the volume of the thoracic chamber in the dorso-ventral axis",
      "Contraction of external inter-costal muscles and phrenic muscles",
      "Contraction of internal inter-costal muscles"
    ],
    correct_answer: "Contraction of internal inter-costal muscles",
    explanation: "Contraction of internal intercostal muscles pulls the ribs downward and inward, reducing thoracic volume to drive forceful expiration. Inhalation is driven by the contraction of external intercostals and diaphragm.",
    difficulty: "easy",
    topic: "Inspiration vs Expiration Muscular Mechanics"
  },
  {
    question_number: 138,
    question_text: "The diffusion membrane or respiratory membrane does not include",
    options: [
      "Thin squamous epithelium of alveoli",
      "Pseudostratified ciliated epithelium",
      "Endothelium of alveolar capillaries",
      "Basement substance in between"
    ],
    correct_answer: "Pseudostratified ciliated epithelium",
    explanation: "The respiratory diffusion membrane consists of three microscopic layers: (1) thin squamous epithelium of alveoli, (2) endothelium of alveolar capillaries, and (3) the intervening basement substance. Pseudostratified ciliated epithelium lines the conducting zone (nasal cavity, trachea, bronchi).",
    difficulty: "easy",
    topic: "Diffusion Membrane Histology"
  },
  {
    question_number: 139,
    question_text: "How much percentage of O2 is transported through plasma in the dissolved form?",
    options: [
      "97%",
      "3%",
      "20-25%",
      "7%"
    ],
    correct_answer: "3%",
    explanation: "Due to the low solubility of oxygen in aqueous plasma, only about 3% of O2 is transported in physical solution in plasma; the remaining 97% is transported by RBCs bound to haemoglobin.",
    difficulty: "easy",
    topic: "Dissolved Oxygen Transport"
  },
  {
    question_number: 140,
    question_text: "Human beings have a significant ability to maintain and moderate the respiratory rhythm to suit tissue demands. This is done by neural control. Which of the following is not directly related with respiratory rhythm regulation?",
    options: [
      "Pneumotaxic centre",
      "Respiratory rhythm centre",
      "Hypothalamus",
      "Aortic and carotid body receptors"
    ],
    correct_answer: "Hypothalamus",
    explanation: "The core respiratory rhythmicity and chemical feedback are mediated by the medullary respiratory rhythm centre, pontine pneumotaxic centre, and aortic/carotid chemoreceptors. The hypothalamus exerts higher emotional/temperature modulations but does not generate or maintain the basic respiratory rhythm.",
    difficulty: "medium",
    topic: "Neural Centres for Respiratory Rhythm"
  },
  {
    question_number: 141,
    question_text: "During inspiration, the diaphragm",
    options: [
      "Contracts",
      "Expands",
      "Does not move",
      "Relaxes"
    ],
    correct_answer: "Contracts",
    explanation: "Inspiration is initiated by the contraction of the diaphragm, which pulls its central tendon downward, flattening the dome and increasing the volume of the thoracic cavity in the antero-posterior axis.",
    difficulty: "easy",
    topic: "Diaphragm in Inspiration"
  },
  {
    question_number: 142,
    question_text: "Hiccups occur during respiration due to abnormal spasmodic activity of / presence of",
    options: [
      "Inter-costal muscles",
      "Food in the air tract",
      "Diaphragm",
      "Inadequate O2 in the environment"
    ],
    correct_answer: "Diaphragm",
    explanation: "Hiccups (singultus) are sudden, involuntary, spasmodic contractions of the diaphragm accompanied by an abrupt closure of the glottis, producing the characteristic 'hic' sound.",
    difficulty: "easy",
    topic: "Hiccups Etiology"
  },
  {
    question_number: 143,
    question_text: "Myoglobin binds with how many molecule(s) of O2?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_answer: "One",
    explanation: "Myoglobin is a monomeric protein containing a single polypeptide chain and one heme prosthetic group, allowing it to bind exactly one molecule of O2.",
    difficulty: "easy",
    topic: "Myoglobin Stoichiometry"
  },
  {
    question_number: 144,
    question_text: "A healthy man can inspire or expire approximately ________ of air per breath normally.",
    options: [
      "500 mL",
      "1000 mL to 1100 mL",
      "1100 mL to 1200 mL",
      "6000 mL to 8000 mL"
    ],
    correct_answer: "500 mL",
    explanation: "Tidal volume is the volume of air inspired or expired during a normal breath, which is approximately 500 mL in a healthy adult (amounting to 6000 to 8000 mL per minute).",
    difficulty: "easy",
    topic: "Tidal Volume"
  },
  {
    question_number: 145,
    question_text: "Total volume of air accommodated in the lungs at the end of maximum forceful inspiration includes:\nA. ERV + RV\nB. IRV + ERV\nC. TV + IRV + ERV + RV\nD. VC + RV\nSelect the correct option:",
    options: [
      "A only",
      "A and B only",
      "C only",
      "C and D only"
    ],
    correct_answer: "C and D only",
    explanation: "Total Lung Capacity (TLC) is the total volume of air in lungs after maximal forced inspiration. TLC = TV + IRV + ERV + RV (statement C), and since VC = TV + IRV + ERV, TLC = VC + RV (statement D).",
    difficulty: "medium",
    topic: "Total Lung Capacity Formulation"
  }
];
