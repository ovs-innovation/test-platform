import fs from 'fs';
const diagrams = JSON.parse(fs.readFileSync(new URL('./body_fluids_diagrams_map.json', import.meta.url)));

export const batch1Questions = [
  {
    question_number: 1,
    question_text: "Which of the following is coronary sulcus?",
    options: [
      "Interauricular sulcus",
      "Interventricular sulcus",
      "Auriculoventricular sulcus",
      "Interventricular septum"
    ],
    correct_answer: "Auriculoventricular sulcus",
    explanation: "The coronary sulcus (also known as the auriculoventricular groove) is a surface groove separating the atria from the ventricles of the heart.",
    difficulty: "easy",
    topic: "Human Circulatory System - Anatomy of Heart"
  },
  {
    question_number: 2,
    question_text: "Which of the following options represent correct blood flow pathway in pulmonary circulation?",
    options: [
      "Right ventricle -> pulmonary artery -> lungs -> pulmonary vein -> right atrium",
      "Right ventricle -> Aorta -> body tissue -> vena cava -> right atrium",
      "Right ventricle -> pulmonary artery -> lungs -> pulmonary vein -> left atrium",
      "Left ventricle -> aorta -> lungs -> pulmonary artery -> left atrium"
    ],
    correct_answer: "Right ventricle -> pulmonary artery -> lungs -> pulmonary vein -> left atrium",
    explanation: "In pulmonary circulation, deoxygenated blood is pumped by the right ventricle through the pulmonary artery to the lungs for oxygenation, and returned as oxygenated blood via pulmonary veins into the left atrium.",
    difficulty: "easy",
    topic: "Double Circulation - Pulmonary Circulation"
  },
  {
    question_number: 3,
    question_text: "Which statement is incorrect with respect to first heart sound?",
    options: [
      "It is produced at the beginning of ventricular systole",
      "It is associated with the closure of the tricuspid and bicuspid valves",
      "It is called LUB",
      "It is high pitched and of short duration"
    ],
    correct_answer: "It is high pitched and of short duration",
    explanation: "The first heart sound (lub) is low-pitched, dull, and of longer duration (approx 0.15 s). The second heart sound (dub) is high-pitched, sharper, and of shorter duration (approx 0.1 s).",
    difficulty: "medium",
    topic: "Cardiac Cycle - Heart Sounds"
  },
  {
    question_number: 4,
    question_text: "A special case of Rh incompatibility causing erythroblastosis foetalis is possible where",
    options: [
      "Mother has Rh+ blood and foetus has Rh- blood",
      "Mother has Rh+ blood and foetus has Rh+ blood",
      "Mother has Rh- blood and foetus has Rh+ blood",
      "Mother has Rh- blood and foetus has Rh- blood"
    ],
    correct_answer: "Mother has Rh- blood and foetus has Rh+ blood",
    explanation: "Erythroblastosis foetalis occurs when an Rh-negative mother carries an Rh-positive foetus. During delivery, foetal Rh antigens can enter the mother's circulation, stimulating production of anti-Rh antibodies that destroy RBCs of subsequent Rh-positive foetuses.",
    difficulty: "easy",
    topic: "Blood Groups - Rh Grouping & Incompatibility"
  },
  {
    question_number: 5,
    question_text: "Which of the following can increase the rate of heart beat?\n(i) Sympathetic neural signal\n(ii) Parasympathetic neural signal\n(iii) Adrenaline\n(iv) Thyroxine hormone\n(v) Acetylcholine\nSelect the correct option.",
    options: [
      "i, iii, iv",
      "iii, iv, v",
      "i, iii, v",
      "i, ii, iv"
    ],
    correct_answer: "i, iii, iv",
    explanation: "Sympathetic neural signals (via noradrenaline), adrenaline (epinephrine from adrenal medulla), and thyroxine hormone increase the heart rate and force of contraction. Parasympathetic signals and acetylcholine decrease heart rate.",
    difficulty: "medium",
    topic: "Regulation of Cardiac Activity"
  },
  {
    question_number: 6,
    question_text: "The three main electrical leads from the ECG are connected to which body part of patient?",
    options: [
      "One to chest and two leads to wrist",
      "One to each wrist and one to the left ankle",
      "One to each ankle and one to the right wrist",
      "One to each ankle and one to chest"
    ],
    correct_answer: "One to each wrist and one to the left ankle",
    explanation: "To obtain a standard ECG, a patient is connected to the machine with three electrical leads: one attached to each wrist and one to the left ankle.",
    difficulty: "easy",
    topic: "Electrocardiograph (ECG)"
  },
  {
    question_number: 7,
    question_text: "After child birth, the foramen ovale closes to become A and ductus arteriosus closes to become B. Choose the correct answer for A and B.\n(1) Foramen caecum | Obturator fossa\n(2) Ligamentum arteriosum | Fossa ovalis\n(3) Auricular septum | Ventricular septum\n(4) Fossa ovalis | Ligamentum arteriosum",
    options: [
      "A = Foramen caecum, B = Obturator fossa",
      "A = Ligamentum arteriosum, B = Fossa ovalis",
      "A = Auricular septum, B = Ventricular septum",
      "A = Fossa ovalis, B = Ligamentum arteriosum"
    ],
    correct_answer: "A = Fossa ovalis, B = Ligamentum arteriosum",
    explanation: "After birth, the foramen ovale between the atria closes to form the fossa ovalis, and the ductus arteriosus connecting the pulmonary artery and aorta closes to become the fibrous ligamentum arteriosum.",
    difficulty: "medium",
    topic: "Foetal Circulation and Postnatal Changes"
  },
  {
    question_number: 8,
    question_text: "Choose the incorrect statement about lymphatic system.",
    options: [
      "Lymph acts as middle man",
      "Lymphatic capillaries are open at both ends",
      "Thoracic lymphatic duct opens to left subclavian vein",
      "Lymphatic nodes are abundant in neck, armpits and groin region"
    ],
    correct_answer: "Lymphatic capillaries are open at both ends",
    explanation: "Lymphatic capillaries are microscopic, blind-ended (closed at one end) vessels situated in tissue spaces, not open at both ends.",
    difficulty: "medium",
    topic: "Lymph (Tissue Fluid) and Lymphatic System"
  },
  {
    question_number: 9,
    question_text: "Find the incorrect option with reference to disease and its characteristics:\n(1) Heart failure : Heart muscle suddenly damaged due to inadequate blood supply\n(2) Cardiac arrest : Complete stoppage of heart beat\n(3) Angina pectoris : Causes chest pain\n(4) CAD : Atherosclerosis in coronary artery",
    options: [
      "Heart failure : Heart muscle suddenly damaged due to inadequate blood supply",
      "Cardiac arrest : Complete stoppage of heart beat",
      "Angina pectoris : Causes chest pain",
      "CAD : Atherosclerosis in coronary artery"
    ],
    correct_answer: "Heart failure : Heart muscle suddenly damaged due to inadequate blood supply",
    explanation: "Heart failure means the state of heart when it is not pumping blood effectively enough to meet the needs of the body. When heart muscle is suddenly damaged by an inadequate blood supply, it is called a heart attack (myocardial infarction).",
    difficulty: "medium",
    topic: "Disorders of Circulatory System"
  },
  {
    question_number: 10,
    question_text: "Parasympathetic nervous system causes hyperpolarisation of cardiac muscle by",
    options: [
      "Influx of Na+",
      "Influx of K+",
      "Outflux of K+",
      "Influx of Ca2+"
    ],
    correct_answer: "Outflux of K+",
    explanation: "Parasympathetic nerve stimulation releases acetylcholine, which increases membrane permeability to potassium ions, causing K+ efflux (outflux). This hyperpolarizes the membrane and reduces the heart rate.",
    difficulty: "medium",
    topic: "Regulation of Cardiac Activity"
  },
  {
    question_number: 11,
    question_text: "AV bundle is a group of",
    options: [
      "Parasympathetic nerve fibres",
      "Cardiac muscle fibres",
      "Sympathetic nerve fibres",
      "Ganglia"
    ],
    correct_answer: "Cardiac muscle fibres",
    explanation: "The atrioventricular (AV) bundle (Bundle of His) is composed of specialized autoexcitable cardiac muscular fibers that conduct electrical impulses from the AV node to the ventricles.",
    difficulty: "easy",
    topic: "Human Circulatory System - Nodal Tissue"
  },
  {
    question_number: 12,
    question_text: "A drop of each of these were placed in separate slides. Which of these will not coagulate?",
    options: [
      "Serum",
      "Lymph",
      "Plasma",
      "Blood"
    ],
    correct_answer: "Serum",
    explanation: "Serum is plasma minus clotting factors (such as fibrinogen and prothrombin). Therefore, serum cannot undergo coagulation.",
    difficulty: "easy",
    topic: "Blood Composition - Serum"
  },
  {
    question_number: 13,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Cardiac cycle includes atrial systole, ventricular systole and joint diastole",
      "Cardiac output of an athlete is much higher than that of an ordinary man",
      "In each minute a single cardiac cycle is performed",
      "During each cardiac cycle two prominent sounds are produced"
    ],
    correct_answer: "In each minute a single cardiac cycle is performed",
    explanation: "In a healthy adult human, the heart beats roughly 72 times per minute, meaning about 72 cardiac cycles are performed every minute (each cycle lasting approximately 0.8 seconds).",
    difficulty: "easy",
    topic: "Cardiac Cycle"
  },
  {
    question_number: 14,
    question_text: "Which of the following pair of substances prevents blood clotting?",
    options: [
      "Hirudin and citrate",
      "Christmas factor and oxalates",
      "Calcium ions and platelet factors",
      "EDTA and calcium ions"
    ],
    correct_answer: "Hirudin and citrate",
    explanation: "Hirudin (from leech saliva) is a potent direct thrombin inhibitor, and sodium/potassium citrate acts as an anticoagulant by chelating ionized calcium (Ca2+), thereby preventing clotting.",
    difficulty: "medium",
    topic: "Coagulation of Blood - Anticoagulants"
  },
  {
    question_number: 15,
    question_text: "In elephantiasis, which of the following systems is affected?",
    options: [
      "Blood vascular system",
      "Skeletal system",
      "Lymphatic system",
      "Excretory system"
    ],
    correct_answer: "Lymphatic system",
    explanation: "Elephantiasis (caused by filarial worm Wuchereria bancrofti) causes chronic inflammation and blockage of lymphatic vessels, particularly in the lower limbs and genital organs.",
    difficulty: "easy",
    topic: "Lymphatic System - Disorders"
  },
  {
    question_number: 16,
    question_text: "The site of production of blood cells is present within",
    options: [
      "Adult liver",
      "Adult spleen",
      "Bones",
      "Cartilage"
    ],
    correct_answer: "Bones",
    explanation: "In adult humans, hemopoiesis (formation of blood cells) occurs primarily in the red bone marrow situated within bones.",
    difficulty: "easy",
    topic: "Formed Elements - Hemopoiesis"
  },
  {
    question_number: 17,
    question_text: "Heart of foetus has",
    options: [
      "Oxygenated blood only",
      "Mixed blood",
      "Oxygenated blood in left half and deoxygenated blood in right half",
      "Oxygenated blood in right half and deoxygenated blood in left half"
    ],
    correct_answer: "Mixed blood",
    explanation: "Because of foetal vascular shunts including the foramen ovale (between right and left atria) and the ductus arteriosus (between pulmonary trunk and aorta), blood mixes and all chambers of the foetal heart contain mixed blood.",
    difficulty: "medium",
    topic: "Foetal Circulation"
  },
  {
    question_number: 18,
    question_text: "The elevated ST segment in ECG depicts",
    options: [
      "Atherosclerosis",
      "Acute myocardial infarction",
      "Myocardial ischaemia",
      "Hyperkalaemia"
    ],
    correct_answer: "Acute myocardial infarction",
    explanation: "Elevation of the ST segment in a standard clinical ECG indicates acute myocardial infarction (STEMI - ST-elevation myocardial infarction).",
    difficulty: "medium",
    topic: "Electrocardiograph (ECG) - Pathological Tracings"
  },
  {
    question_number: 19,
    question_text: "The opening of the AV valve occurs immediately after",
    options: [
      "Isovolumetric contraction",
      "End of joint diastole",
      "Isovolumetric relaxation",
      "Atrial systole"
    ],
    correct_answer: "Isovolumetric relaxation",
    explanation: "During isovolumetric relaxation, intraventricular pressure falls sharply below the pressure in the atria, causing the atrioventricular (AV) valves to open and rapid ventricular filling to commence.",
    difficulty: "medium",
    topic: "Cardiac Cycle - Phases"
  },
  {
    question_number: 20,
    question_text: "Lymph capillaries differ from blood capillaries in that they",
    options: [
      "Collapse when interstitial pressure increases",
      "Are absent in the central nervous system",
      "Are not lined by endothelium",
      "Lack valves"
    ],
    correct_answer: "Are absent in the central nervous system",
    explanation: "Lymphatic capillaries are closed-ended endothelial tubes that are absent from the central nervous system, bone marrow, and non-vascular tissues like the cornea.",
    difficulty: "medium",
    topic: "Lymphatic System - Structure"
  },
  {
    question_number: 21,
    question_text: "The maximum volume of blood at a given time is found in the",
    options: [
      "Venules and veins",
      "Capillaries",
      "Heart",
      "Aorta"
    ],
    correct_answer: "Venules and veins",
    explanation: "Systemic veins and venules serve as capacitance vessels (blood reservoirs) and hold approximately 64% of total blood volume under resting physiological conditions.",
    difficulty: "easy",
    topic: "Blood Vessels - Capacitance"
  },
  {
    question_number: 22,
    question_text: `The diagram given here is the standard ECG of a normal person. The P-wave represents the\n<img src="${diagrams.q22_ecg}" alt="ECG Diagram" style="max-width:320px; display:block; margin:10px 0;" />`,
    options: [
      "End of atrial systole",
      "Beginning of ventricular diastole",
      "Electrical depolarisation of the atria",
      "Initiation of the ventricular contraction"
    ],
    correct_answer: "Electrical depolarisation of the atria",
    explanation: "In a standard ECG, the P-wave represents the electrical depolarisation of the atria, which leads to the contraction of both the atria.",
    difficulty: "easy",
    topic: "Electrocardiograph (ECG)"
  },
  {
    question_number: 23,
    question_text: "If due to some injury the chordae tendineae of the tricuspid valve of the human heart is partially non-functional, what will be the immediate effect?",
    options: [
      "The pace maker will stop working",
      "The blood will tend to flow back into the left atrium",
      "The flow of blood into the aorta will be slowed down",
      "The flow of blood into the pulmonary artery will be reduced"
    ],
    correct_answer: "The flow of blood into the pulmonary artery will be reduced",
    explanation: "Chordae tendineae prevent the cusps of the tricuspid valve from swinging back into the right atrium during ventricular systole. Damage to them causes regurgitation of blood into the right atrium, reducing the volume of blood pumped out into the pulmonary artery.",
    difficulty: "hard",
    topic: "Human Circulatory System - Valve Mechanisms"
  },
  {
    question_number: 24,
    question_text: "Fastest distribution of some injectable medicine and with no risk of any kind can be achieved by injecting it into the",
    options: [
      "Muscles",
      "Arteries",
      "Veins",
      "Lymph vessels"
    ],
    correct_answer: "Veins",
    explanation: "Intravenous (IV) injection delivers medication directly into the venous bloodstream returning to the heart, enabling rapid, widespread, and safe systemic distribution.",
    difficulty: "easy",
    topic: "Blood Vessels - Clinical Aspects"
  },
  {
    question_number: 25,
    question_text: `Figure shows schematic plan of blood circulation in humans with labels A to D. Identify the label and its correct functions.\n<img src="${diagrams.q25_circulation}" alt="Circulation Plan Diagram" style="max-width:280px; display:block; margin:10px 0;" />`,
    options: [
      "B = Pulmonary artery - Takes blood from heart to lungs, pO2 = 90 mm Hg",
      "C = Vena Cava - Carries blood from the body parts to right auricle, pCO2 = 45 mm Hg",
      "D = Dorsal aorta - Takes blood from heart to body parts, pO2 = 95 mm Hg",
      "A = Pulmonary vein - Takes impure blood from body parts, pO2 = 60 mm Hg"
    ],
    correct_answer: "C = Vena Cava - Carries blood from the body parts to right auricle, pCO2 = 45 mm Hg",
    explanation: "In the diagram, C represents the Vena Cava returning deoxygenated systemic venous blood with pCO2 = 45 mm Hg and pO2 = 40 mm Hg to the right atrium of the heart.",
    difficulty: "medium",
    topic: "Double Circulation - Schematic Plan"
  },
  {
    question_number: 26,
    question_text: "Ductus Botalli connects",
    options: [
      "Two systemic aorta",
      "Systemic aorta and carotid artery",
      "Carotid and pulmonary arteries",
      "Pulmonary trunk and aorta"
    ],
    correct_answer: "Pulmonary trunk and aorta",
    explanation: "Ductus Botalli (ductus arteriosus) is a foetal blood vessel connecting the pulmonary trunk directly to the aortic arch, diverting blood away from the non-functional foetal lungs.",
    difficulty: "medium",
    topic: "Foetal Circulation - Ductus Arteriosus"
  },
  {
    question_number: 27,
    question_text: "In humans, blood passes from the postcaval vein to the diastolic right atrium of the heart due to",
    options: [
      "Pressure difference between the postcaval vein and atrium",
      "Stimulation of sino-auricular node",
      "Pushing open of the venous valves",
      "Suction pull"
    ],
    correct_answer: "Pressure difference between the postcaval vein and atrium",
    explanation: "Blood flows along a hydrostatic pressure gradient from higher pressure in the vena cava (postcaval vein) into the lower pressure in the relaxing (diastolic) right atrium.",
    difficulty: "medium",
    topic: "Cardiac Cycle - Venous Return"
  },
  {
    question_number: 28,
    question_text: "Which of the following statements is related to Frank-Starling's law of heart?",
    options: [
      "Greater the stroke volume, greater is the heart rate",
      "Greater the minute volume, greater is the heart rate",
      "The stroke volume of the heart increases in response to an increase in the volume of blood filling the heart",
      "Lesser the length of cardiac muscle fibre, greater is the force of contraction of heart"
    ],
    correct_answer: "The stroke volume of the heart increases in response to an increase in the volume of blood filling the heart",
    explanation: "Frank-Starling law states that the force of ventricular contraction and stroke volume are directly proportional to the initial length of the cardiac muscle fibres (end-diastolic volume).",
    difficulty: "medium",
    topic: "Regulation of Cardiac Activity - Frank-Starling Law"
  },
  {
    question_number: 29,
    question_text: `The given diagram shows how things get to and from the liver. They are labelled as A, B, C, D, E, F. Which one of the following labelling is the correct one?\n<img src="${diagrams.q29_portal_system}" alt="Hepatic Portal System Diagram" style="max-width:320px; display:block; margin:10px 0;" />`,
    options: [
      "A is the hepatic portal vein and E is the hepatic vein",
      "C is the intestine and F is the hepatic portal vein",
      "D is the hepatic portal vein and F is the hepatic vein",
      "B is the pancreatic artery and E is the hepatic artery"
    ],
    correct_answer: "D is the hepatic portal vein and F is the hepatic vein",
    explanation: "In the hepatic portal system, vessel D (hepatic portal vein) carries nutrient-rich blood from the gut to the liver, and vessel F (hepatic vein) carries blood from the liver into the inferior vena cava toward the heart.",
    difficulty: "medium",
    topic: "Hepatic Portal System"
  }
];
