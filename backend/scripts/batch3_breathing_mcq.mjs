import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/breathing_diagrams_map.json'));

export const batch3Questions = [
  {
    question_number: 51,
    question_text: "Which pulmonary volumes and capacities cannot be measured directly by a spirometer?",
    options: [
      "RV, FRC, TLC",
      "VC, IC, ERV",
      "TV, IRV, VC",
      "IC, EC, TV"
    ],
    correct_answer: "RV, FRC, TLC",
    explanation: "Residual Volume (RV) cannot be exhaled and remains in the lungs, so it cannot be measured using a simple spirometer. Consequently, capacities that include RV — namely Functional Residual Capacity (FRC = ERV + RV) and Total Lung Capacity (TLC = VC + RV) — also cannot be measured directly by spirometry (they require helium dilution or body plethysmography).",
    difficulty: "easy",
    topic: "Spirometry Limitations"
  },
  {
    question_number: 52,
    question_text: "Which of the following muscles does not contract during normal inhalation in humans?",
    options: [
      "Internal inter-costal muscle",
      "Diaphragm muscle",
      "External inter-costal muscle",
      "Phrenic radial muscle fibres of diaphragm"
    ],
    correct_answer: "Internal inter-costal muscle",
    explanation: "Normal quiet inspiration is driven solely by the active contraction of the diaphragm (radial phrenic muscles) and external intercostal muscles. Internal intercostal muscles are expiratory muscles and contract only during forceful active expiration.",
    difficulty: "easy",
    topic: "Inspiratory vs Expiratory Muscles"
  },
  {
    question_number: 53,
    question_text: "In Bend's disease, ________ gas dissolves in our blood under high pressure and forms bubbles upon rapid decompression.",
    options: [
      "O2",
      "CO",
      "SO2",
      "N2"
    ],
    correct_answer: "N2",
    explanation: "In deep sea diving, nitrogen gas (N2) dissolves in blood and tissues at high hydrostatic pressure. If a diver ascends too rapidly, decompression allows nitrogen to come out of solution and form bubbles in blood vessels and tissues, causing decompression sickness (Caisson disease or Bends).",
    difficulty: "easy",
    topic: "Decompression Sickness (Bends)"
  },
  {
    question_number: 54,
    question_text: "Vital capacity is represented by",
    options: [
      "TLC - IC",
      "TLC - RV",
      "IC + RV",
      "TV + RV"
    ],
    correct_answer: "TLC - RV",
    explanation: "Total Lung Capacity (TLC) is the sum of Vital Capacity (VC) and Residual Volume (RV). Hence, Vital Capacity equals Total Lung Capacity minus Residual Volume (VC = TLC - RV).",
    difficulty: "easy",
    topic: "Vital Capacity Equation"
  },
  {
    question_number: 55,
    question_text: "A person is having TV = 450 mL, and dead space volume = 150 mL. His breathing rate = 14/min. What will be the alveolar ventilation rate for him?",
    options: [
      "2 L/min",
      "4.2 L/min",
      "5.4 L/min",
      "2.5 L/min"
    ],
    correct_answer: "4.2 L/min",
    explanation: "Alveolar ventilation rate = (Tidal Volume - Dead Space Volume) × Respiratory Rate = (450 mL - 150 mL) × 14 breaths/min = 300 mL × 14 = 4200 mL/min = 4.2 L/min.",
    difficulty: "medium",
    topic: "Alveolar Ventilation Rate Calculation"
  },
  {
    question_number: 56,
    question_text: "Pneumotaxic centre is present in ________ and its hyperactivation causes ________.",
    options: [
      "Medulla; increased breathing rate",
      "Medulla; decreased depth of breathing",
      "Pons; increased breathing rate",
      "Pons; increased depth of breathing"
    ],
    correct_answer: "Pons; increased breathing rate",
    explanation: "The pneumotaxic centre is situated in the upper pons. Strong inhibitory output prematurely switches off inspiration, resulting in shorter respiratory cycles and thus an increased breathing rate (tachypnea) with shallow breathing.",
    difficulty: "medium",
    topic: "Pneumotaxic Centre Function"
  },
  {
    question_number: 57,
    question_text: "Myoglobin present in muscle has more affinity for O2 than haemoglobin. It contains",
    options: [
      "One Fe2+",
      "One Fe3+",
      "Two Fe2+",
      "Two Fe3+"
    ],
    correct_answer: "One Fe2+",
    explanation: "Myoglobin is a single-chain globular protein with a single heme group containing one ferrous iron ion (Fe2+) capable of reversibly binding one molecule of oxygen.",
    difficulty: "medium",
    topic: "Myoglobin Structure and Iron Valence"
  },
  {
    question_number: 58,
    question_text: "Read the following statements A and B and choose the correct option:\nStatement A: Oxyhaemoglobin dissociation curve for foetal haemoglobin appears on the left side of an adult haemoglobin.\nStatement B: HbF has higher affinity for O2 than maternal HbA because it binds BPG less strongly.",
    options: [
      "Both statement A and B are correct",
      "Both statement A and B are incorrect",
      "Only statement A is correct",
      "Only statement B is correct"
    ],
    correct_answer: "Both statement A and B are correct",
    explanation: "Both statements are correct. Foetal haemoglobin (HbF) contains γ chains instead of β chains, resulting in weaker binding to 2,3-BPG. This endows HbF with higher oxygen affinity, shifting its dissociation curve to the left relative to adult HbA.",
    difficulty: "medium",
    topic: "Foetal vs Adult Oxyhaemoglobin Curve"
  },
  {
    question_number: 59,
    question_text: "Hypoxia caused due to cyanide poisoning is",
    options: [
      "Stagnant hypoxia",
      "Hypoxic hypoxia",
      "Anaemic hypoxia",
      "Histotoxic hypoxia"
    ],
    correct_answer: "Histotoxic hypoxia",
    explanation: "Histotoxic (cytotoxic) hypoxia occurs when delivery of oxygen to tissues is normal, but cells cannot utilize it because mitochondrial enzymes such as cytochrome c oxidase are inhibited by toxins like cyanide.",
    difficulty: "easy",
    topic: "Histotoxic Hypoxia"
  },
  {
    question_number: 60,
    question_text: "Lung surfactant is released by ________ cells to prevent ________.",
    options: [
      "Type I alveolar; Atelectasis",
      "Type II alveolar; Atelectasis",
      "Type II alveolar; Emphysema",
      "Type I alveolar; Anaphylaxis"
    ],
    correct_answer: "Type II alveolar; Atelectasis",
    explanation: "Type II pneumocytes (great alveolar cells) secrete pulmonary surfactant (dipalmitoylphosphatidylcholine), which reduces surface tension in alveoli and prevents atelectasis (alveolar collapse during expiration).",
    difficulty: "easy",
    topic: "Pulmonary Surfactant and Alveolar Cells"
  },
  {
    question_number: 61,
    question_text: "Read the following statements (A — E):\nA. Effect of oxyhaemoglobin formation on CO2 transport is Haldane effect.\nB. Approximately 23% of O2 is transported in the dissolved state in the plasma of blood.\nC. The CO2 produced by the tissues reacts with water to form H2CO3 due to carbonic anhydrase enzyme.\nD. The oxyhaemoglobin formation increases in presence of increased temperature.\nE. The chloride ions diffuse from the plasma into the RBCs to maintain the ionic balance at tissue level.\nHow many of the above statement(s) is/are false?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_answer: "2",
    explanation: "Statements B and D are false. Statement B is false because only about 3% of O2 is carried dissolved in plasma (97% by RBCs). Statement D is false because high temperature decreases Hb-O2 affinity, favouring dissociation rather than formation. Statements A, C, and E are true.",
    difficulty: "hard",
    topic: "Multi-statement Respiratory Physiology Evaluation"
  },
  {
    question_number: 62,
    question_text: "During forceful exhalation, there is contraction of which of the following muscles?",
    options: [
      "Phrenic and abdominal",
      "Internal inter-costal and abdominal",
      "Phrenic and external inter-costal muscles",
      "External inter-costal and internal inter-costal"
    ],
    correct_answer: "Internal inter-costal and abdominal",
    explanation: "Forceful expiration is an active process mediated by internal intercostal muscles (which depress the rib cage) and anterolateral abdominal muscles (rectus abdominis, obliques, transversus abdominis), which push the diaphragm upward.",
    difficulty: "easy",
    topic: "Muscles of Forceful Expiration"
  },
  {
    question_number: 63,
    question_text: "Which of the following is not an occupational respiratory disorder?",
    options: [
      "Silicosis",
      "Emphysema",
      "Asbestosis",
      "Anthracosis"
    ],
    correct_answer: "Emphysema",
    explanation: "Silicosis, asbestosis, and anthracosis are occupational diseases resulting from long-term occupational exposure to mineral dusts. Emphysema is a chronic disease primarily caused by cigarette smoking and atmospheric pollutants.",
    difficulty: "easy",
    topic: "Occupational vs Non-occupational Lung Diseases"
  },
  {
    question_number: 64,
    question_text: "The central chemoreceptors are sensitive to",
    options: [
      "H+ of arterial blood only",
      "CO2 and H+ of arterial blood only",
      "CO2 and H+ of arterial blood and H+ of C.S.F.",
      "H+ concentration of cerebrospinal fluid (C.S.F.)"
    ],
    correct_answer: "H+ concentration of cerebrospinal fluid (C.S.F.)",
    explanation: "Central chemoreceptors located on the ventrolateral surface of the medulla are directly stimulated by H+ ion concentration in the surrounding cerebrospinal fluid (formed when arterial CO2 diffuses across the blood-brain barrier and hydrates into carbonic acid).",
    difficulty: "medium",
    topic: "Central Chemoreceptor Sensitivity"
  },
  {
    question_number: 65,
    question_text: "Choose the correct statement w.r.t. respiratory gas transport:",
    options: [
      "Increased pH increases oxyhaemoglobin formation",
      "Low temperature stimulates oxyhaemoglobin dissociation",
      "Myoglobin has lower affinity for O2 than haemoglobin",
      "Solubility of O2 is 20-25 times higher than CO2"
    ],
    correct_answer: "Increased pH increases oxyhaemoglobin formation",
    explanation: "An increase in blood pH (lower H+ concentration, alkalosis) increases haemoglobin affinity for oxygen, shifting the dissociation curve to the left and stimulating oxyhaemoglobin formation. Solubility of CO2 is 20-25 times higher than O2, and myoglobin has a higher affinity than Hb.",
    difficulty: "medium",
    topic: "Gas Transport Principles"
  },
  {
    question_number: 66,
    question_text: "All of the following are occupational respiratory disorders, except:",
    options: [
      "Silicosis",
      "Emphysema",
      "Asbestosis",
      "Anthracosis"
    ],
    correct_answer: "Emphysema",
    explanation: "Emphysema is a chronic obstructive pulmonary disease caused primarily by smoking, whereas silicosis (quarries), asbestosis (asbestos manufacturing), and anthracosis (coal mining) are occupational lung disorders.",
    difficulty: "easy",
    topic: "Classification of Respiratory Disorders"
  },
  {
    question_number: 67,
    question_text: "Which of the following explains the Haldane's effect?",
    options: [
      "CO2 enters systemic blood stream, causing more O2 to dissociate from Hb",
      "O2 combines with Hb and oxy-Hb acts as a strong acid, releasing H+ and promoting CO2 release",
      "HCO3- diffuse out from RBCs into plasma, whereas chloride ions move from plasma into RBCs",
      "Excess of 2,3-DPG dissociates O2 from Hb"
    ],
    correct_answer: "O2 combines with Hb and oxy-Hb acts as a strong acid, releasing H+ and promoting CO2 release",
    explanation: "The Haldane effect states that oxygenation of blood in the lungs promotes carbon dioxide dissociation from haemoglobin. Oxyhaemoglobin is more acidic than deoxyhaemoglobin, displacing H+ ions which react with bicarbonate to generate CO2 for exhalation.",
    difficulty: "hard",
    topic: "Haldane Effect"
  },
  {
    question_number: 68,
    question_text: "Volume of air that remains in the lungs after a normal expiration is",
    options: [
      "RV",
      "TV + IRV",
      "ERV + RV",
      "TV + IRV + ERV"
    ],
    correct_answer: "ERV + RV",
    explanation: "Functional Residual Capacity (FRC = ERV + RV) is the volume of gas remaining in lungs at the end of a tidal expiration.",
    difficulty: "easy",
    topic: "Respiratory Volumes Definition"
  },
  {
    question_number: 69,
    question_text: "All of the following structures are lined by incomplete cartilaginous rings to prevent them from collapsing during respiration, except:",
    options: [
      "Trachea",
      "Primary bronchi",
      "Respiratory bronchiole",
      "Initial bronchiole"
    ],
    correct_answer: "Respiratory bronchiole",
    explanation: "Incomplete C-shaped cartilaginous rings support the conducting airway from trachea down to initial bronchioles. Terminal and respiratory bronchioles, alveolar ducts, and alveoli lack cartilaginous support.",
    difficulty: "medium",
    topic: "Cartilaginous Support of Airways"
  },
  {
    question_number: 70,
    question_text: "The central chemoreceptors are directly affected by",
    options: [
      "H+ concentration in lymph",
      "O2 concentration in blood",
      "H+ concentration in C.S.F.",
      "O2 in trachea"
    ],
    correct_answer: "H+ concentration in C.S.F.",
    explanation: "Central chemoreceptors in the medulla oblongata respond directly to increased hydrogen ion concentration [H+] in the cerebrospinal fluid (CSF) and brain interstitial fluid.",
    difficulty: "easy",
    topic: "Chemoreception in Medulla"
  },
  {
    question_number: 71,
    question_text: "Spasm of bronchi and bronchioles: 'A'\nLoss of elasticity of alveolar walls: 'B'\nFibrosis of upper parts of lungs: 'C'\nCollapse of alveoli: 'D'\nIdentify A, B, C, D and choose the correct option:",
    options: [
      "A - Asthma, B - Asbestosis, C - Emphysema, D - Atelectasis",
      "A - Asthma, B - Emphysema, C - Asbestosis, D - Atelectasis",
      "A - Emphysema, B - Asthma, C - Atelectasis, D - Pleurisy",
      "A - Atelectasis, B - Emphysema, C - Asbestosis, D - Pleurisy"
    ],
    correct_answer: "A - Asthma, B - Emphysema, C - Asbestosis, D - Atelectasis",
    explanation: "Bronchospasm defines asthma (A). Loss of alveolar wall elasticity defines emphysema (B). Fibrous proliferation from mineral dust inhalation defines asbestosis (C). Alveolar collapse defines atelectasis (D).",
    difficulty: "medium",
    topic: "Respiratory Disorders Symptoms Identification"
  },
  {
    question_number: 72,
    question_text: "The right shift of the oxygen dissociation curve occurs in all of the following conditions, except:",
    options: [
      "Increased carbon dioxide concentration",
      "Increased H+ concentration",
      "Increased 2,3-DPG in blood",
      "Increased pO2"
    ],
    correct_answer: "Increased pO2",
    explanation: "Increased pO2 promotes oxygen binding to haemoglobin and shifts the dissociation curve to the left. Increased pCO2, H+, temperature, and 2,3-DPG shift the curve to the right.",
    difficulty: "easy",
    topic: "Oxygen-Haemoglobin Dissociation Curve Shifts"
  },
  {
    question_number: 73,
    question_text: "The diagram given below is a cross-section of an alveolus with pulmonary blood capillary. Identify the labelling and select the correct option.",
    options: [
      "A: Basement membrane — Prevents atelectasis",
      "B: Endothelial cells — Secretes surfactant",
      "C: Type I pneumocyte — Secretes mucus",
      "D: Red blood corpuscles — Carry respiratory pigment, haemoglobin"
    ],
    correct_answer: "D: Red blood corpuscles — Carry respiratory pigment, haemoglobin",
    explanation: "Label D correctly identifies the red blood corpuscles (erythrocytes) passing through the pulmonary capillary carrying haemoglobin for oxygen binding. Surfactant is secreted by Type II pneumocytes (not endothelial cells or Type I).",
    image_url: diagrams.zoo_q73_alveolus_cross,
    difficulty: "medium",
    topic: "Diffusion Membrane Anatomy"
  },
  {
    question_number: 74,
    question_text: "Which of the following events does not occur during the process of inspiration?",
    options: [
      "Ribs raised upwards and outwards",
      "Volume of thoracic cavity decreases",
      "Diaphragm becomes flat",
      "Pressure of thoracic cavity decreases"
    ],
    correct_answer: "Volume of thoracic cavity decreases",
    explanation: "During inspiration, contraction of the diaphragm and external intercostal muscles increases the volume of the thoracic cavity in the antero-posterior and dorso-ventral axes. Saying thoracic volume decreases is incorrect.",
    difficulty: "easy",
    topic: "Events in Inspiration"
  },
  {
    question_number: 75,
    question_text: "What is the usual difference of the partial pressure of O2 for O2 diffusion between alveoli and deoxygenated blood at the initial point of pulmonary capillary bed?",
    options: [
      "104 - 95 = 9 mm Hg",
      "95 - 45 = 50 mm Hg",
      "159 - 40 = 119 mm Hg",
      "104 - 40 = 64 mm Hg"
    ],
    correct_answer: "104 - 40 = 64 mm Hg",
    explanation: "At the initial end of the pulmonary capillary, the alveolar pO2 is 104 mm Hg and the entering deoxygenated venous blood pO2 is 40 mm Hg. The partial pressure gradient driving O2 diffusion into blood is 104 - 40 = 64 mm Hg.",
    difficulty: "medium",
    topic: "Diffusion Gradient for Oxygen"
  }
];
