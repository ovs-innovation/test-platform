import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/breathing_diagrams_map.json'));

export const batch2Questions = [
  {
    question_number: 26,
    question_text: "Find the incorrect equation w.r.t. respiratory capacities:",
    options: [
      "FRC = ERV + RV",
      "ERV + VC = IC",
      "RV = TLC - VC",
      "IRV = TLC - (EC + RV)"
    ],
    correct_answer: "ERV + VC = IC",
    explanation: "Vital Capacity (VC) is the maximum volume of air a person can breathe in after a forced expiration (VC = ERV + TV + IRV). Inspiratory Capacity (IC) is TV + IRV. Therefore, ERV + VC = ERV + ERV + TV + IRV ≠ IC. Thus, ERV + VC = IC is incorrect.",
    difficulty: "medium",
    topic: "Respiratory Volumes and Capacities"
  },
  {
    question_number: 27,
    question_text: "Match the following and choose the correct option:\nColumn I:\n(i) Stagnant hypoxia\n(ii) Hay fever\n(iii) Emphysema\n(iv) Pneumonia\n\nColumn II:\n(A) Damaged alveolar walls\n(B) Accumulation of WBCs/fluid in alveoli\n(C) Irritative inflammation of mucous membrane of upper respiratory tract\n(D) Reduced pumping activity of heart",
    options: [
      "(i)-D, (ii)-C, (iii)-A, (iv)-B",
      "(i)-D, (ii)-C, (iii)-B, (iv)-A",
      "(i)-C, (ii)-D, (iii)-A, (iv)-B",
      "(i)-A, (ii)-B, (iii)-C, (iv)-D"
    ],
    correct_answer: "(i)-D, (ii)-C, (iii)-A, (iv)-B",
    explanation: "Stagnant hypoxia occurs due to decreased blood flow from reduced cardiac pumping. Hay fever is allergic rhinitis with irritative inflammation of the upper respiratory mucous membrane. Emphysema features destruction of alveolar walls. Pneumonia involves inflammatory exudate and WBC accumulation in alveoli.",
    difficulty: "medium",
    topic: "Respiratory Pathologies and Matching"
  },
  {
    question_number: 28,
    question_text: "During inhalation, the increase in the thoracic volume causes",
    options: [
      "Increase in intra-pulmonary pressure",
      "Decrease in intra-pulmonary pressure (to less than atmospheric pressure)",
      "Air to be expelled out of the lungs",
      "Doming of diaphragm"
    ],
    correct_answer: "Decrease in intra-pulmonary pressure (to less than atmospheric pressure)",
    explanation: "Boyle's law dictates that an increase in thoracic volume reduces intra-pulmonary pressure below atmospheric pressure (creating negative pressure), which draws air from the outside atmosphere into the lungs.",
    difficulty: "easy",
    topic: "Mechanics of Inhalation"
  },
  {
    question_number: 29,
    question_text: "Volume of air that will remain in the lungs after a normal expiration is",
    options: [
      "TV + IRV",
      "ERV + RV",
      "VC + RV",
      "IRV + TV + ERV"
    ],
    correct_answer: "ERV + RV",
    explanation: "Functional Residual Capacity (FRC) is the volume of air remaining in the lungs after a normal tidal expiration, which is equal to Expiratory Reserve Volume (ERV) plus Residual Volume (RV).",
    difficulty: "easy",
    topic: "Functional Residual Capacity"
  },
  {
    question_number: 30,
    question_text: "Receptors associated with ________ and ________ can recognise changes in CO2, H+ concentration in blood and send necessary signals to the rhythm centre for remedial actions.",
    options: [
      "Pons, Medulla",
      "Hypothalamus, Cerebrum",
      "Cerebrum, Medulla",
      "Aortic arch, Carotid artery"
    ],
    correct_answer: "Aortic arch, Carotid artery",
    explanation: "Peripheral chemoreceptors in the carotid bodies (associated with the carotid artery) and aortic bodies (associated with the aortic arch) detect increases in arterial CO2 and H+ concentration, sending afferent signals via glossopharyngeal and vagus nerves to the medullary respiratory rhythm centre.",
    difficulty: "medium",
    topic: "Chemical Regulation of Respiration"
  },
  {
    question_number: 31,
    question_text: "Which of the following factors is not responsible for the formation of oxyhaemoglobin in the blood?",
    options: [
      "High pO2",
      "Low pCO2",
      "High H+ concentration",
      "Lower temperature"
    ],
    correct_answer: "High H+ concentration",
    explanation: "High H+ concentration (acidity) decreases the affinity of haemoglobin for oxygen (Bohr effect) and promotes oxyhaemoglobin dissociation rather than its formation. At the alveoli, low H+ (higher pH), high pO2, low pCO2, and lower temperature favour oxyhaemoglobin formation.",
    difficulty: "easy",
    topic: "Factors Favoring Oxyhaemoglobin Formation"
  },
  {
    question_number: 32,
    question_text: "To counter balance the rapid outrush of the negative bicarbonate ions from the RBCs, chloride ions move from the plasma into the erythrocytes. This effect is",
    options: [
      "Haldane's effect",
      "Cori's cycle",
      "Bohr's effect",
      "Hamburger's phenomenon"
    ],
    correct_answer: "Hamburger's phenomenon",
    explanation: "Hamburger's phenomenon (chloride shift) maintains ionic equilibrium and electrical neutrality across the erythrocyte membrane when bicarbonate ions diffuse out into plasma in exchange for chloride ions moving into the RBCs via an anion exchanger (Band 3 protein).",
    difficulty: "easy",
    topic: "Chloride Shift (Hamburger Phenomenon)"
  },
  {
    question_number: 33,
    question_text: "Choose the correct option w.r.t. humans.\nStatement A: Thoracic breathing is more prominent in pregnant females.\nStatement B: Pneumocytes type-II secrete lecithin.",
    options: [
      "Only statement B is correct",
      "Only statement A is correct",
      "Both statements A and B are correct",
      "Both statements A and B are incorrect"
    ],
    correct_answer: "Both statements A and B are correct",
    explanation: "Both statements are correct. In pregnant women, enlargement of the uterus elevates the diaphragm and impedes its excursion, making thoracic (costal) breathing dominant. Type II alveolar pneumocytes synthesize and secrete dipalmitoyl lecithin (surfactant) to lower surface tension.",
    difficulty: "medium",
    topic: "Thoracic Breathing and Type II Pneumocytes"
  },
  {
    question_number: 34,
    question_text: "Study the diagram given below with labelled points with respect to steps involved in normal breathing and then select the correct match.",
    options: [
      "A - Ribs and sternum raised",
      "B - Diaphragm relaxed and arched upward",
      "C - Volume of thorax decreased",
      "D - Air expelled from lungs"
    ],
    correct_answer: "B - Diaphragm relaxed and arched upward",
    explanation: "The diagram depicts the mechanism of expiration: the diaphragm relaxes and resumes its dome-shaped (arched upward) configuration, external intercostals relax, and thoracic volume decreases, expelling air from the lungs.",
    image_url: diagrams.zoo_q34_breathing,
    difficulty: "medium",
    topic: "Diagram of Breathing Mechanics"
  },
  {
    question_number: 35,
    question_text: "Given below are few factors which shift the HbO2 dissociation curve towards the right side:\n(i) Low temperature\n(ii) High H+ concentration and low pH\n(iii) Low partial pressure of O2\n(iv) High partial pressure of CO2\nHow many of the given influence the curve to shift towards the right side?",
    options: [
      "3",
      "1",
      "2",
      "4"
    ],
    correct_answer: "3",
    explanation: "Three factors — (ii) High H+ / low pH, (iii) Low pO2, and (iv) High pCO2 — shift the oxygen dissociation curve to the right (favouring oxygen unbinding). Low temperature (i) shifts the curve to the left.",
    difficulty: "medium",
    topic: "Factors Shifting Oxygen Dissociation Curve"
  },
  {
    question_number: 36,
    question_text: "During strenuous exercise, the O2 level falls to about X (i.e. approximately Y O2 is delivered to tissue by Hb per 100 mL of blood). X and Y are",
    options: [
      "X = 15 mL/100 mL, Y = 4.4 mL",
      "X = 4.4 mL/100 mL, Y = 15 mL",
      "X = 4.4 mL/100 mL, Y = 50 mL",
      "X = 25 mL/100 mL, Y = 75 mL"
    ],
    correct_answer: "X = 4.4 mL/100 mL, Y = 15 mL",
    explanation: "At rest, arterial blood carries ~20 mL O2/100 mL and venous blood retains ~15 mL O2/100 mL (delivering 5 mL). During strenuous exercise, tissue extraction increases greatly so that venous O2 content drops to ~4.4 mL/100 mL (X), delivering about 15 mL of O2 (Y) per 100 mL of blood.",
    difficulty: "hard",
    topic: "Oxygen Delivery During Exercise"
  },
  {
    question_number: 37,
    question_text: "Select the mismatched pair:",
    options: [
      "Carbon monoxide - Forms stable compound with Hb i.e. carboxy-haemoglobin",
      "Excess smoking - Asthma",
      "Asbestosis - Occupational lung disease",
      "SARS - Caused by human corona virus"
    ],
    correct_answer: "Excess smoking - Asthma",
    explanation: "Excess cigarette smoking is the primary causative agent for emphysema and chronic bronchitis (COPD), not asthma. Asthma is typically an allergic disorder caused by hypersensitivity to foreign allergens like pollen or dust mites.",
    difficulty: "easy",
    topic: "Respiratory Diseases and Etiology"
  },
  {
    question_number: 38,
    question_text: "Study the given diagram of the alveolar cavity and blood capillary and select the incorrect statement:",
    options: [
      "A - It is entry of air into alveolar cavity",
      "B - Basement membrane that lies between squamous epithelium and endothelial cells",
      "X - RBC inside vessel having Hb for binding with O2",
      "X - Oxidised Hb producing methaemoglobin resulting in cyanosis in normal conditions"
    ],
    correct_answer: "X - Oxidised Hb producing methaemoglobin resulting in cyanosis in normal conditions",
    explanation: "Under normal physiological conditions, oxygen binds reversibly with ferrous iron (Fe2+) in haemoglobin to form oxyhaemoglobin without oxidation to ferric iron (Fe3+). Methaemoglobin and cyanosis are abnormal pathological states.",
    image_url: diagrams.zoo_q38_alveolus,
    difficulty: "medium",
    topic: "Alveolar Gas Exchange Diagram"
  },
  {
    question_number: 39,
    question_text: "Increased diphosphoglyceric acid (DPG) shifts the Hb-O2 dissociation curve to X and it indicates Y. X and Y are",
    options: [
      "X - Left and Y - More oxygenation of Hb",
      "X - Left and Y - Less oxygenation",
      "X - Right and Y - Dissociation of HbO2",
      "X - Right and Y - Oxidation of Hb"
    ],
    correct_answer: "X - Right and Y - Dissociation of HbO2",
    explanation: "2,3-DPG binds to deoxyhaemoglobin and stabilizes its T (taut) state, decreasing its affinity for oxygen. This causes a rightward shift of the dissociation curve, facilitating the unloading (dissociation) of oxygen to tissues.",
    difficulty: "medium",
    topic: "2,3-DPG and Haemoglobin Affinity"
  },
  {
    question_number: 40,
    question_text: "Identify the statements as true (T) or false (F) and choose the correct option.\nI. The wall of bronchi and initial bronchioles are supported by incomplete cartilaginous rings.\nII. Surfactant-lecithin is secreted by type I pneumocytes to prevent collapse of alveoli.\nIII. Left lung has cardiac notch.\nIV. Forceful expiration is a passive process.",
    options: [
      "T F T F",
      "F T T T",
      "T T T F",
      "T T F F"
    ],
    correct_answer: "T F T F",
    explanation: "I is True (trachea, bronchi, and initial bronchioles are supported by incomplete cartilaginous rings). II is False (surfactant is secreted by Type II pneumocytes, not Type I). III is True (left lung has a cardiac notch accommodating the heart). IV is False (quiet expiration is passive, but forceful expiration is an active process involving internal intercostals and abdominal muscles).",
    difficulty: "medium",
    topic: "Respiratory Anatomy and Mechanics True/False"
  },
  {
    question_number: 41,
    question_text: "Which of the following phenomenon does not occur in the process of inspiration?",
    options: [
      "Decrease in air pressure within the pulmonary cavity",
      "Flattening and lowering of diaphragm",
      "Increase in volume of thoracic cavity",
      "Contraction of internal inter-costal muscles that raises ribs and sternum"
    ],
    correct_answer: "Contraction of internal inter-costal muscles that raises ribs and sternum",
    explanation: "Raising of the ribs and sternum during inspiration is accomplished by the contraction of external intercostal muscles, not internal intercostals. Internal intercostals contract during forceful expiration to pull ribs downwards and inwards.",
    difficulty: "easy",
    topic: "Inspiration Mechanics"
  },
  {
    question_number: 42,
    question_text: "Consider the statements given below:\nA. P50 value of HbF is higher than P50 of HbA.\nB. Affinity of myoglobin with O2 is more than Hb.\nC. Affinity of HbA with O2 is more than HbF.\nD. CO has higher affinity with Hb than O2.\nChoose the option with only correct statements:",
    options: [
      "A and D",
      "A, B and D",
      "B and D",
      "A, C and D"
    ],
    correct_answer: "B and D",
    explanation: "Statement B is correct (myoglobin has a hyperbolic dissociation curve with much higher affinity for O2 than haemoglobin). Statement D is correct (carbon monoxide has ~200-250 times higher affinity for haemoglobin than O2). Statement A and C are incorrect because HbF has higher affinity for O2 than HbA, which corresponds to a lower P50 value.",
    difficulty: "hard",
    topic: "Comparative Respiratory Pigments and Affinity"
  },
  {
    question_number: 43,
    question_text: "Choose the correct option to fill in the blanks.\nValue of ___A___ is lowest among all types of respiratory volumes. Extra volume of air a person can inspire by forceful inspiration is ___B___, while the air that remains in lung after forceful expiration is ___C___.",
    options: [
      "A - TV, B - ERV, C - IRV",
      "A - RV, B - IRV, C - ERV",
      "A - TV, B - IRV, C - RV",
      "A - IRV, B - RV, C - ERV"
    ],
    correct_answer: "A - TV, B - IRV, C - RV",
    explanation: "Tidal Volume (A = TV, ~500 mL) is the smallest pulmonary volume. Inspiratory Reserve Volume (B = IRV, 2500-3000 mL) is the extra air inspirable by forced inhalation. Residual Volume (C = RV, 1100-1200 mL) remains in lungs after maximal expiration.",
    difficulty: "easy",
    topic: "Pulmonary Volumes Classification"
  },
  {
    question_number: 44,
    question_text: "All the given statements are true, except:",
    options: [
      "Carbonic anhydrase is present in high concentration in RBCs",
      "Carboxyhaemoglobin carries CO2 in RBCs",
      "High pCO2 and low pO2 in tissues help in binding of carbon dioxide with Hb",
      "Approximately 4 mL of CO2 is delivered to alveoli by every 100 mL of deoxygenated blood"
    ],
    correct_answer: "Carboxyhaemoglobin carries CO2 in RBCs",
    explanation: "Carbon dioxide bound to haemoglobin is called carbamino-haemoglobin. Carboxyhaemoglobin is formed when carbon monoxide (CO) binds irreversibly to haemoglobin. Hence statement (2) is incorrect.",
    difficulty: "easy",
    topic: "Carbon Dioxide Transport Chemistry"
  },
  {
    question_number: 45,
    question_text: "Match column I and column II and choose the correct option:\nColumn I:\na. Occupational lung diseases\nb. Emphysema\nc. Orthopnea\nd. Bronchial asthma\n\nColumn II:\n(i) Inflation or abnormal distension of bronchiole or alveolar sac\n(ii) Painful breathing except in upright position\n(iii) Asbestosis and silicosis\n(iv) Difficulty in breathing in expiration due to spasms",
    options: [
      "a(iii), b(i), c(ii), d(iv)",
      "a(iv), b(i), c(ii), d(iii)",
      "a(iii), b(ii), c(i), d(iv)",
      "a(ii), b(i), c(iii), d(iv)"
    ],
    correct_answer: "a(iii), b(i), c(ii), d(iv)",
    explanation: "Occupational lung diseases include asbestosis and silicosis. Emphysema involves permanent over-inflation/distension of alveolar walls. Orthopnea is shortness of breath relieved only by an upright posture. Bronchial asthma causes wheezing and expiratory difficulty due to bronchial smooth muscle spasms.",
    difficulty: "medium",
    topic: "Respiratory Disorders Matching II"
  },
  {
    question_number: 46,
    question_text: "In the given figure, what is the appropriate value of pO2 in oxygenated blood and pCO2 in deoxygenated blood?",
    options: [
      "pO2 = 95 mm Hg; pCO2 = 45 mm Hg",
      "pO2 = 45 mm Hg; pCO2 = 95 mm Hg",
      "pO2 = 40 mm Hg; pCO2 = 45 mm Hg",
      "pO2 = 104 mm Hg; pCO2 = 40 mm Hg"
    ],
    correct_answer: "pO2 = 95 mm Hg; pCO2 = 45 mm Hg",
    explanation: "According to standard NCERT gas transport values: pO2 in systemic arterial oxygenated blood is 95 mm Hg, while pCO2 in systemic venous deoxygenated blood is 45 mm Hg.",
    image_url: diagrams.zoo_q46_circulation,
    difficulty: "medium",
    topic: "Partial Pressures in Circulation Diagram"
  },
  {
    question_number: 47,
    question_text: "Which of the following is correct w.r.t. the factor and its effect on the shift of O2-Hb dissociation curve?\na. High pO2 — Left shift\nb. Low pH — Right shift\nc. High temperature — Right shift\nd. Low pCO2 — Right shift",
    options: [
      "b, c and d are correct",
      "a and d are correct",
      "b and d are correct",
      "a, b and c are correct"
    ],
    correct_answer: "a, b and c are correct",
    explanation: "High pO2 shifts the curve to the left (increases affinity). Low pH (acidosis) and high temperature shift the curve to the right (decrease affinity, Bohr effect). Low pCO2 causes a leftward shift, so statement d is incorrect.",
    difficulty: "medium",
    topic: "Factors Influencing O2-Hb Curve"
  },
  {
    question_number: 48,
    question_text: "Match the columns and select the correct option:\nColumn I:\na. Blue baby syndrome\nb. Total lung capacity\nc. Dyspnoea\nd. Tidal volume\ne. Hypopnea\n\nColumn II:\n(i) Carboxy-haemoglobin\n(ii) Slow breathing\n(iii) 5800 mL\n(iv) Painful breathing\n(v) Methaemoglobin\n(vi) 500 mL",
    options: [
      "a(v), b(iii), c(iv), d(vi), e(ii)",
      "a(v), b(vi), c(iv), d(iii), e(ii)",
      "a(i), b(iii), c(iv), d(vi), e(ii)",
      "a(iv), b(iii), c(v), d(vi), e(ii)"
    ],
    correct_answer: "a(v), b(iii), c(iv), d(vi), e(ii)",
    explanation: "Blue baby syndrome (infant methaemoglobinaemia) is caused by excess nitrates converting Hb to methaemoglobin (v). Total lung capacity is approximately 5800 mL (iii). Dyspnoea is painful/difficult breathing (iv). Tidal volume is 500 mL (vi). Hypopnea is abnormally slow/shallow breathing (ii).",
    difficulty: "medium",
    topic: "Pulmonary Capacities and Pathologies"
  },
  {
    question_number: 49,
    question_text: "Rate of diffusion is not affected by",
    options: [
      "Thickness of the membrane",
      "Solubility of the gases",
      "Type of respiratory organ",
      "Partial pressure of gases"
    ],
    correct_answer: "Type of respiratory organ",
    explanation: "According to Fick's law of diffusion and NCERT, the rate of gaseous diffusion across the respiratory membrane is governed by partial pressure gradient, solubility of gases in the liquid phase, and thickness of the diffusion membrane. The general classification type of respiratory organ does not physically dictate diffusion rate across a given membrane.",
    difficulty: "easy",
    topic: "Factors Affecting Diffusion Rate"
  },
  {
    question_number: 50,
    question_text: "Respiratory disease common among cigarette smokers, in which alveoli become permanently distended and are full of air is",
    options: [
      "Asthma",
      "Bronchitis",
      "Pneumonia",
      "Emphysema"
    ],
    correct_answer: "Emphysema",
    explanation: "In emphysema, proteases destroy elastic fibres of alveolar walls, leading to loss of elasticity, permanent alveolar distension, air trapping during expiration, and diminished surface area for gas exchange.",
    difficulty: "easy",
    topic: "Emphysema and Smoking"
  }
];
