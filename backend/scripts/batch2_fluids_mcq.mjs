import fs from 'fs';
const diagrams = JSON.parse(fs.readFileSync(new URL('./body_fluids_diagrams_map.json', import.meta.url)));

export const batch2Questions = [
  {
    question_number: 30,
    question_text: "Find the disorder indicating conduction abnormality:",
    options: [
      "Myocardial infarction",
      "Heart failure",
      "Myocardial ischemia",
      "Adams-Stokes syndrome"
    ],
    correct_answer: "Adams-Stokes syndrome",
    explanation: "Adams-Stokes syndrome is characterized by periodic fainting (syncope) caused by severe heart block or conduction system interruption between atria and ventricles.",
    difficulty: "hard",
    topic: "Disorders of Circulatory System - Conduction Abnormalities"
  },
  {
    question_number: 31,
    question_text: "The most popularly known blood grouping is the ABO grouping. It is named ABO and not ABC because 'O' in it refers to having:",
    options: [
      "Over dominance of this type on the genes for A and B types",
      "One antibody only - either anti A or anti B on the RBCs",
      "No antigen A and B on RBCs",
      "Other antigens besides A and B on RBCs"
    ],
    correct_answer: "No antigen A and B on RBCs",
    explanation: "The letter 'O' represents the German word 'Ohne' (meaning without), indicating the absence of both A and B surface antigens on red blood cells.",
    difficulty: "easy",
    topic: "Blood Groups - ABO Grouping"
  },
  {
    question_number: 32,
    question_text: "Mark the correct movement of lymph starting from lower portion of body:",
    options: [
      "Intercellular spaces -> Lymphatic capillary -> Lymphatic duct -> Right subclavian vein -> Heart",
      "Intercellular spaces -> Lymphatic duct -> Right subclavian vein -> Heart",
      "Intercellular spaces -> Lymphatic capillary -> Thoracic duct -> Left subclavian vein -> Heart",
      "Intercellular spaces -> Lymphatic duct -> Lymphatic capillary -> Left subclavian vein -> Heart"
    ],
    correct_answer: "Intercellular spaces -> Lymphatic capillary -> Thoracic duct -> Left subclavian vein -> Heart",
    explanation: "Lymph from the lower limbs collects in intercellular tissue spaces, enters lymphatic capillaries, travels through lymphatic vessels to the thoracic duct, which empties into the left subclavian vein and returns fluid to the heart.",
    difficulty: "medium",
    topic: "Lymphatic System - Flow Pathway"
  },
  {
    question_number: 33,
    question_text: "According to Frank Starling's law of heart, strength of ventricular contraction is:",
    options: [
      "Directly proportional to the end-diastolic volume",
      "Inversely proportional to the end-diastolic volume",
      "Independent of end-diastolic volume",
      "Independent of venous return"
    ],
    correct_answer: "Directly proportional to the end-diastolic volume",
    explanation: "Frank-Starling's law states that the stroke volume and strength of contraction are directly proportional to the end-diastolic volume (degree of initial stretching of cardiac muscle fibres).",
    difficulty: "medium",
    topic: "Regulation of Cardiac Activity - Frank-Starling Law"
  },
  {
    question_number: 34,
    question_text: "Match the following columns:\nColumn I:\n(A) Myocardial infarction\n(B) Heart block\n(C) Angina\n(D) Oedema\nColumn II:\n(i) Chest pain\n(ii) Fluid accumulates in tissue\n(iii) Acute heart attack\n(iv) Conducting system interrupted\nSelect the correct option.",
    options: [
      "A-ii, B-iv, C-iii, D-i",
      "A-iii, B-ii, C-i, D-iv",
      "A-iii, B-iv, C-i, D-ii",
      "A-iv, B-ii, C-i, D-iii"
    ],
    correct_answer: "A-iii, B-iv, C-i, D-ii",
    explanation: "Myocardial infarction is an acute heart attack (A-iii), Heart block represents interruption in the cardiac conduction system (B-iv), Angina is acute chest pain (C-i), and Oedema is excessive accumulation of fluid in tissues (D-ii).",
    difficulty: "medium",
    topic: "Disorders of Circulatory System - Clinical Correlation"
  },
  {
    question_number: 35,
    question_text: "Identify the correct match w.r.t. a standard ECG:",
    options: [
      "Peak P - Initiation of left atrial contraction only",
      "Complex QRS - One complete pulse",
      "Peak T - Initiation of ventricular cardiac contraction",
      "Peak P and Peak R together - Systolic and diastolic blood pressure"
    ],
    correct_answer: "Complex QRS - One complete pulse",
    explanation: "Each QRS complex corresponds to one ventricular depolarisation and resultant ventricular systole (producing one pulse). By counting the number of QRS complexes in a given time interval, the heart rate can be determined.",
    difficulty: "medium",
    topic: "Electrocardiograph (ECG) - Clinical Significance"
  },
  {
    question_number: 36,
    question_text: "pH of blood in arteries:",
    options: [
      "Is more than in veins",
      "Is less than in veins",
      "Is same as in veins",
      "Is less than in lymph vessels"
    ],
    correct_answer: "Is more than in veins",
    explanation: "Systemic arterial blood has a pH of approximately 7.40, which is slightly more alkaline (higher pH) than systemic venous blood (pH ~7.36) due to higher CO2 content in venous blood forming carbonic acid.",
    difficulty: "medium",
    topic: "Blood Composition - pH Regulation"
  },
  {
    question_number: 37,
    question_text: "Choose the incorrect statement with respect to coagulation of blood:",
    options: [
      "Coagulation involves a series of linked enzyme reactions called cascade process.",
      "Clot or coagulum is formed mainly of a network of fibrinogen threads.",
      "One of the clotting factors, prothrombin is converted to active thrombin.",
      "An injury or trauma stimulates the platelets in the blood to release certain factors which activate coagulation."
    ],
    correct_answer: "Clot or coagulum is formed mainly of a network of fibrinogen threads.",
    explanation: "Clot or coagulum is formed mainly of a network of insoluble *fibrin* threads in which dead and damaged formed elements of blood are trapped, not soluble fibrinogen.",
    difficulty: "medium",
    topic: "Coagulation of Blood"
  },
  {
    question_number: 38,
    question_text: "Which of the following is not a native component of blood?",
    options: [
      "Globulins and albumin",
      "Na+ and HCO3-",
      "Collagen and fibrin",
      "Fibrinogen and RBCs"
    ],
    correct_answer: "Collagen and fibrin",
    explanation: "Collagen is an extracellular structural protein of connective tissue and fibrin is produced only during blood clotting; neither is a native constituent of normal circulating blood.",
    difficulty: "medium",
    topic: "Blood Composition"
  },
  {
    question_number: 39,
    question_text: "During each cardiac cycle, two prominent sounds are produced which can be easily heard by stethoscope. The second heart sound is associated with:",
    options: [
      "Closing of the atrioventricular valve",
      "Opening of the tricuspid valve",
      "Closing of the semilunar valves",
      "Opening of the semilunar valves"
    ],
    correct_answer: "Closing of the semilunar valves",
    explanation: "The second heart sound (dub) is associated with the closure of the semilunar valves at the onset of ventricular diastole.",
    difficulty: "easy",
    topic: "Cardiac Cycle - Heart Sounds"
  },
  {
    question_number: 40,
    question_text: "At the end of joint diastole, ventricles are about:",
    options: [
      "Completely filled by blood",
      "1/3 filled by blood",
      "2/3 filled by blood",
      "Totally empty"
    ],
    correct_answer: "2/3 filled by blood",
    explanation: "During joint diastole, blood flows passively from the great veins into the atria and through the open AV valves into the ventricles, filling them to about 70% (approx 2/3) of their capacity before atrial systole.",
    difficulty: "medium",
    topic: "Cardiac Cycle - Ventricular Filling"
  },
  {
    question_number: 41,
    question_text: "Which of the following holds true with respect to human heart in adults?\na. Incompletely four-chambered\nb. Presence of papillary muscles\nc. Presence of ductus arteriosus",
    options: [
      "a and b",
      "Only b",
      "Only a",
      "a and c"
    ],
    correct_answer: "Only b",
    explanation: "Adult human heart is completely four-chambered (two atria, two ventricles) and contains papillary muscles attached to chordae tendineae. Ductus arteriosus is only present during embryonic life and becomes ligamentum arteriosum in adults.",
    difficulty: "medium",
    topic: "Human Circulatory System - Anatomy of Heart"
  },
  {
    question_number: 42,
    question_text: "Read the following statements (A-E):\nA - Mammalian RBCs appear biconcave, enucleated and disc-like after maturation with few exceptions.\nB - In humans, erythropoiesis starts in red bone marrow in early stage.\nC - Myeloid elements are found inside bone marrow.\nD - If RBC is placed in distilled water, then it shrinks gradually leading to plasmolysis.\nE - Haematocrit value is the volume occupied by all the blood cells in blood.\nHow many of the above statements are false?",
    options: [
      "Five",
      "Three",
      "Four",
      "Two"
    ],
    correct_answer: "Two",
    explanation: "Statements B and D are false. Erythropoiesis starts in the yolk sac and liver during early embryonic life (not in bone marrow). An RBC in distilled water swells and hemolyses (bursts), it does not shrink or plasmolyze.",
    difficulty: "hard",
    topic: "Formed Elements - RBCs and Erythropoiesis"
  },
  {
    question_number: 43,
    question_text: "Hyperpolarisation of cardiac muscle is caused by:",
    options: [
      "Influx of Ca2+",
      "Outflux of K+",
      "Influx of Na+",
      "Outflux of Na+"
    ],
    correct_answer: "Outflux of K+",
    explanation: "The efflux (outflux) of potassium ions (K+) from the intracellular fluid to the outside hyperpolarizes the cardiac muscle cell membrane, slowing the generation of action potentials.",
    difficulty: "medium",
    topic: "Cardiac Muscle Electrophysiology"
  },
  {
    question_number: 44,
    question_text: "Which of the following is correctly matched with its function?",
    options: [
      "EDTA - Natural anticoagulant",
      "Ca2+ - Factor I",
      "Blood in siliconised tube - Delayed clotting time",
      "Blood in chill tube - Fast clotting"
    ],
    correct_answer: "Blood in siliconised tube - Delayed clotting time",
    explanation: "Siliconised surfaces are extremely smooth, which prevents platelets from adhering and lysing, thereby delaying the clotting cascade.",
    difficulty: "medium",
    topic: "Coagulation of Blood - Anticoagulation Methods"
  },
  {
    question_number: 45,
    question_text: "Select the statements as true (T) or false (F):\nA - Heparin is anticoagulant which is secreted by basophil.\nB - Haemophilia is a genetic disorder which is caused due to change in a-chain of Hb due to replacement of 6th AA.\nC - Leucocytosis is also called blood cancer.\nD - O -ve is universal donor.",
    options: [
      "T T T T",
      "T T F F",
      "T F T T",
      "T F F T"
    ],
    correct_answer: "T F F T",
    explanation: "A is true (basophils secrete heparin). B is false (replacement of 6th amino acid in beta-chain causes sickle cell anaemia, not haemophilia). C is false (leucocytosis is elevated WBC count; leukaemia is blood cancer). D is true (O-negative lacks A, B, and Rh antigens).",
    difficulty: "medium",
    topic: "Blood and Disorders"
  },
  {
    question_number: 46,
    question_text: "Antihaemophilic factor-B is also called X, whose lacking cause a disease i.e., Y. Then X and Y are:",
    options: [
      "X = Christmas factor, Y = Haemophilia B",
      "X = Stuart factor, Y = Hodgkin's disease",
      "X = Christmas factor, Y = Haemophilia A",
      "X = XIIth factor, Y = Haemophilia A"
    ],
    correct_answer: "X = Christmas factor, Y = Haemophilia B",
    explanation: "Factor IX is known as Antihaemophilic factor-B (AHF-B) or Christmas factor. Its deficiency leads to Haemophilia B (Christmas disease).",
    difficulty: "medium",
    topic: "Coagulation of Blood - Clotting Factors"
  },
  {
    question_number: 47,
    question_text: "Read the following statements and choose the correct option:\nStatement I: Haemoglobin is respiratory pigment in invertebrates only.\nStatement II: Haemoglobin contains 4 Fe atoms in each molecule.",
    options: [
      "Only statement I is correct",
      "Both statements are correct",
      "Statement I is incorrect but statement II is correct",
      "Both statements are incorrect"
    ],
    correct_answer: "Statement I is incorrect but statement II is correct",
    explanation: "Statement I is incorrect because haemoglobin is the universal respiratory pigment in vertebrates and only found in some invertebrates. Statement II is correct as each Hb tetramer contains 4 heme groups, each with one Fe2+ atom.",
    difficulty: "easy",
    topic: "Respiratory Pigments - Haemoglobin"
  },
  {
    question_number: 48,
    question_text: `Study the given diagrammatic representation of a standard ECG and select the correct option accordingly.\n<img src="${diagrams.q48_ecg}" alt="Standard ECG Waveform" style="max-width:320px; display:block; margin:10px 0;" />`,
    options: [
      "Enlargement of P-wave indicates the enlargement of ventricles.",
      "Contraction of ventricle starts shortly after Q and marks the beginning of ventricular systole.",
      "If T-wave is flat, it means that the heart muscles are receiving sufficient oxygen.",
      "The ST segment is depressed in myocardial infarction."
    ],
    correct_answer: "Contraction of ventricle starts shortly after Q and marks the beginning of ventricular systole.",
    explanation: "The contraction of ventricles starts shortly after the Q wave and marks the beginning of ventricular systole. P-wave enlargement indicates atrial enlargement, flat T-wave indicates myocardial ischemia (insufficient oxygen), and acute infarction shows ST elevation.",
    difficulty: "medium",
    topic: "Electrocardiograph (ECG)"
  },
  {
    question_number: 49,
    question_text: "Select the correct sequence of blood flow through specific vessels considering hepatic portal system:",
    options: [
      "Hepatic portal vein -> Hepatic artery -> Hepatic vein -> Superior vena cava -> Right atrium",
      "Hepatic portal vein -> Liver -> Hepatic vein -> Inferior vena cava -> Right atrium",
      "Hepatic vein -> Hepatic portal vein -> Inferior vena cava -> Right atrium",
      "Hepatic portal vein -> Hepatic capillary -> Inferior vena cava -> Right atrium"
    ],
    correct_answer: "Hepatic portal vein -> Liver -> Hepatic vein -> Inferior vena cava -> Right atrium",
    explanation: "Nutrient-rich blood from the gut is carried by the hepatic portal vein into the liver sinusoids, drains into the hepatic vein, enters the inferior vena cava, and finally reaches the right atrium.",
    difficulty: "medium",
    topic: "Hepatic Portal System"
  },
  {
    question_number: 50,
    question_text: "The first heart sound, LUB and second heart sound, DUB are due to (i) and (ii) respectively. Identify (i) and (ii) and select the correct option.",
    options: [
      "Opening of AV valves | Closing of AV valves",
      "Opening of SL valves | Closing of SL valves",
      "Closing of SL valves | Closing of AV valves",
      "Closing of AV valves | Closing of SL valves"
    ],
    correct_answer: "Closing of AV valves | Closing of SL valves",
    explanation: "First heart sound (lub) is caused by the closure of atrioventricular (AV) valves, and the second heart sound (dub) is caused by the closure of semilunar (SL) valves.",
    difficulty: "easy",
    topic: "Cardiac Cycle - Heart Sounds"
  },
  {
    question_number: 51,
    question_text: "Which of the following openings into atria of human heart are without any functional valve?\na. Superior vena cava\nb. Inferior vena cava\nc. Coronary sinus\nd. Pulmonary vein\nSelect the correct option.",
    options: [
      "a only",
      "a & d",
      "b & d",
      "a, b & d"
    ],
    correct_answer: "a & d",
    explanation: "In the adult human heart, the superior vena cava and the pulmonary veins enter the atria without functional valves. Inferior vena cava has the Eustachian valve and coronary sinus has the Thebesian valve.",
    difficulty: "medium",
    topic: "Human Circulatory System - Cardiac Valves"
  },
  {
    question_number: 52,
    question_text: "First rapid filling of the ventricles occur when:",
    options: [
      "Atria contract, ventricles relax",
      "Atria relax, ventricles relax",
      "Atria relax, ventricles contract",
      "Atria contract, ventricles contract"
    ],
    correct_answer: "Atria relax, ventricles relax",
    explanation: "The first rapid filling phase occurs during early joint diastole when both atria and ventricles are relaxed, allowing blood to rush passively into the ventricles.",
    difficulty: "medium",
    topic: "Cardiac Cycle - Rapid Inflow"
  },
  {
    question_number: 53,
    question_text: "If cardiac output of a person at a time is 6.4 litre and his heart rate is 80 beats per minute, the stroke volume of the person will be:",
    options: [
      "62 mL",
      "72 mL",
      "80 mL",
      "50 mL"
    ],
    correct_answer: "80 mL",
    explanation: "Stroke volume = Cardiac output / Heart rate = 6400 mL / 80 beats per min = 80 mL.",
    difficulty: "easy",
    topic: "Cardiac Cycle - Stroke Volume Calculation"
  },
  {
    question_number: 54,
    question_text: "A period in which the atrial impulse is not carried to the ventricles for varying periods lasting from a few seconds to a few minutes is called:",
    options: [
      "Ventricular escape",
      "Cardiac arrest",
      "Myocardial infarction",
      "Rheumatic heart disorder"
    ],
    correct_answer: "Ventricular escape",
    explanation: "When conduction from atria to ventricles is interrupted, after a brief pause of a few seconds to minutes, an ectopic ventricular pacemaker takes over, a phenomenon known as ventricular escape.",
    difficulty: "hard",
    topic: "Disorders of Circulatory System - Conduction Blocks"
  },
  {
    question_number: 55,
    question_text: "A symptom of acute chest pain appears when no enough oxygen is reaching the heart muscle in sufficient quantity. This is observed in:",
    options: [
      "Angina pectoris",
      "Heart failure",
      "Atherosclerosis",
      "Cardiac arrest"
    ],
    correct_answer: "Angina pectoris",
    explanation: "Angina pectoris is acute chest pain caused by inadequate oxygen delivery to heart muscles (myocardial ischemia).",
    difficulty: "easy",
    topic: "Disorders of Circulatory System - Angina Pectoris"
  },
  {
    question_number: 56,
    question_text: "In a standard ECG, the QRS complex represents:",
    options: [
      "Atrial diastole",
      "Atrial systole",
      "Ventricular depolarisation",
      "Ventricular diastole"
    ],
    correct_answer: "Ventricular depolarisation",
    explanation: "The QRS complex represents the depolarisation of the ventricles, which initiates the ventricular contraction.",
    difficulty: "easy",
    topic: "Electrocardiograph (ECG)"
  },
  {
    question_number: 57,
    question_text: "Pulmonary circulation starts from _____ whereas systemic circulation starts from _____:",
    options: [
      "Right ventricle, left ventricle",
      "Left auricle, left ventricle",
      "Left ventricle, left auricle",
      "Right auricle, left auricle"
    ],
    correct_answer: "Right ventricle, left ventricle",
    explanation: "Pulmonary circulation begins in the right ventricle (pumping blood to the lungs), and systemic circulation begins in the left ventricle (pumping oxygenated blood into the aorta).",
    difficulty: "easy",
    topic: "Double Circulation"
  },
  {
    question_number: 58,
    question_text: "Cardiac arrest is best defined as:",
    options: [
      "Inability of heart to pump blood",
      "Complete stoppage of heart beat",
      "Severe chest pain",
      "Cholesterol plaque in coronary artery"
    ],
    correct_answer: "Complete stoppage of heart beat",
    explanation: "Cardiac arrest means when the heart stops beating completely.",
    difficulty: "easy",
    topic: "Disorders of Circulatory System - Cardiac Arrest"
  },
  {
    question_number: 59,
    question_text: "All are the correct statements with respect to lymphatic system, except:",
    options: [
      "Lymphatic nodes are present in armpits, groin and neck",
      "Filariasis affects lymphatic system",
      "Thoracic duct drains into right subclavian vein",
      "Lymph transports nutrients, O2 and plays a role in removal of wastes"
    ],
    correct_answer: "Thoracic duct drains into right subclavian vein",
    explanation: "The thoracic duct (largest lymphatic vessel) empties into the left subclavian vein, not the right subclavian vein.",
    difficulty: "medium",
    topic: "Lymphatic System - Ducts"
  },
  {
    question_number: 60,
    question_text: "'Christmas factor' is:",
    options: [
      "Factor IX",
      "Factor X",
      "Factor XIII",
      "Factor II"
    ],
    correct_answer: "Factor IX",
    explanation: "Factor IX is called Christmas factor (or Antihaemophilic factor-B). Its deficiency leads to Christmas disease (Haemophilia B).",
    difficulty: "easy",
    topic: "Coagulation of Blood - Clotting Factors"
  }
];
