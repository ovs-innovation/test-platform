import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// SECTION A: 129 OBJECTIVE TYPE QUESTIONS (MCQS)
// ---------------------------------------------------------------------------
export const SECTION_A_QUESTIONS = [
  // Page 281: Q1 - Q7
  {
    q_num: 1,
    question_text: "Ciliary movement is found in",
    options: [
      "Monocyte and macrophage",
      "Small intestine and spinal cord",
      "Fallopian tube and trachea",
      "Oesophagus and larynx"
    ],
    correct_index: 2,
    solution: "Ciliated epithelium lines the inner surface of hollow organs like fallopian tubes (moving ova) and trachea/bronchioles (propelling mucus and trapped dust particles).",
    image_url: ""
  },
  {
    q_num: 2,
    question_text: "How many of the following features is/are correct about red muscle fibres?\n(i) Myoglobin content is high.\n(ii) Rich in mitochondria.\n(iii) Amount of sarcoplasmic reticulum is high.\n(iv) Carry out aerobic oxidation for ATP production.\n(v) They are thinner than white muscle fibres.",
    options: [
      "Three",
      "Four",
      "Two",
      "One"
    ],
    correct_index: 1,
    solution: "Four statements ((i), (ii), (iv), (v)) are correct. Statement (iii) is incorrect because red muscle fibres have a lesser/low amount of sarcoplasmic reticulum compared to white muscle fibres.",
    image_url: ""
  },
  {
    q_num: 3,
    question_text: "Choose the incorrect statement",
    options: [
      "A-band has both actin and myosin filaments",
      "Length of actin and myosin is not affected during contraction",
      "Length of A-band decreases during contraction of muscle",
      "In a myofibril each thick filament is surrounded by six thin filaments"
    ],
    correct_index: 2,
    solution: "During muscle contraction, the length of the A-band remains constant (does not decrease). The I-band and H-zone shorten as actin filaments slide into the A-band.",
    image_url: ""
  },
  {
    q_num: 4,
    question_text: "How many of the given skull bones are unpaired?\nZygomatic, Lacrimal, Nasal, Vomer, Mandible, Occipital, Sphenoid, Frontal, Temporal, Maxilla",
    options: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],
    correct_index: 2,
    solution: "Five bones are unpaired: Vomer (1), Mandible (1), Occipital (1), Sphenoid (1), and Frontal (1). The remaining are paired: Zygomatic (2), Lacrimal (2), Nasal (2), Temporal (2), and Maxilla (2).",
    image_url: ""
  },
  {
    q_num: 5,
    question_text: "Find the incorrect statement",
    options: [
      "Sternum assists in breathing",
      "Ribs are called bicephalic as they articulate with thoracic vertebrae at two points",
      "11th and 12th pair of ribs are called floating ribs",
      "Ventrally all ribs articulate with sternum with the help of hyaline cartilage"
    ],
    correct_index: 3,
    solution: "Only true ribs (1st to 7th pairs) articulate directly with the sternum ventrally via hyaline cartilage. 8th-10th pairs join the 7th rib, and 11th-12th pairs have no ventral connection.",
    image_url: ""
  },
  {
    q_num: 6,
    question_text: "Which of the following pair is correctly matched?",
    options: [
      "Hinge joint - Between vertebrae",
      "Gliding joint - Between zygapophyses of the successive vertebrae",
      "Fibrous joint - Between phalanges",
      "Cartilaginous joint - Bones of skull"
    ],
    correct_index: 1,
    solution: "The joints between the superior and inferior articular processes (zygapophyses) of adjacent vertebrae are plane synovial / gliding joints.",
    image_url: ""
  },
  {
    q_num: 7,
    question_text: "Read the following statements about the mechanism of muscle contraction:\n(A) Acetylcholine is released when the neural signal reaches the motor end plate.\n(B) Muscle contraction is initiated by a signal sent by CNS via sensory neuron.\n(C) During muscle contraction isotropic band get elongated.\n(D) Repeated activation of the muscle can lead to lactic acid accumulation.\nChoose the option stating correct statements.",
    options: [
      "A and D",
      "A and C",
      "B and C",
      "A and B"
    ],
    correct_index: 0,
    solution: "Statements A and D are correct. B is incorrect because motor neurons (not sensory) send signals from the CNS. C is incorrect because isotropic (I) bands shorten, not elongate.",
    image_url: ""
  },

  // Page 282: Q29 - Q37
  {
    q_num: 29,
    question_text: "Match the following bones with their correct number w.r.t. one limb in humans:\nColumn-I:\na. Wrist bones\nb. Ankle bones\nc. Metacarpals\nd. Phalanges\nColumn-II:\n(i) 7\n(ii) 5\n(iii) 8\n(iv) 14",
    options: [
      "a(iii), b(i), c(ii), d(iv)",
      "a(i), b(iii), c(ii), d(iv)",
      "a(iii), b(i), c(iv), d(ii)",
      "a(ii), b(i), c(iii), d(iv)"
    ],
    correct_index: 0,
    solution: "In one human limb: Wrist bones (Carpals) = 8, Ankle bones (Tarsals) = 7, Palm bones (Metacarpals) = 5, Digits (Phalanges) = 14.",
    image_url: ""
  },
  {
    q_num: 30,
    question_text: "Wild contractions are occurring in the muscles due to low Ca2+ in body fluids, this condition is called",
    options: [
      "Myasthenia gravis",
      "Tetany",
      "Muscular dystrophy",
      "Arthritis"
    ],
    correct_index: 1,
    solution: "Tetany refers to rapid spasms (wild contractions) in muscles due to hypocalcemia (low calcium ion levels in body fluids).",
    image_url: ""
  },
  {
    q_num: 31,
    question_text: "During the muscle contraction, which of the following does not occur?",
    options: [
      "Length of A-band remains constant",
      "No change in length of actin filaments",
      "Sliding movement of myosin over actin",
      "Shortening of sarcomere"
    ],
    correct_index: 2,
    solution: "According to the sliding filament theory, actin (thin) filaments slide over the fixed myosin (thick) filaments, not myosin over actin.",
    image_url: ""
  },
  {
    q_num: 32,
    question_text: "Match column A with column B and select the correct option:\nColumn A:\na. Sarcomere\nb. Rigor mortis\nc. Iris muscles\nd. Intercalated disc\nColumn B:\ni. Ectodermal\nii. Cardiac muscles\niii. Extreme rigidity of muscles in dead individual\niv. Contractile unit of skeletal muscle fibres",
    options: [
      "a-iv, b-iii, c-i, d-ii",
      "a-iv, b-i, c-iii, d-ii",
      "a-i, b-iii, c-iv, d-ii",
      "a-iii, b-iv, c-i, d-ii"
    ],
    correct_index: 0,
    solution: "Sarcomere is the functional contractile unit of myofibril (iv). Rigor mortis is state of extreme muscular rigidity after death due to ATP depletion (iii). Iris muscles are ectodermal in origin (i). Intercalated discs are communication junctions of cardiac muscles (ii).",
    image_url: ""
  },
  {
    q_num: 33,
    question_text: "Identify the statements as True (T) or False (F):\nI. Foramen magnum is the largest foramen and it exists out of limbic system from cranium.\nII. Stapes is the smallest bone of our body and is present in internal ear.\nIII. Patella is sesamoid bone.\nIV. Femur articulates with 3 bones.",
    options: [
      "T, T, T, T",
      "F, T, F, T",
      "F, F, T, T",
      "F, F, T, F"
    ],
    correct_index: 2,
    solution: "I is False (foramen magnum transmits the brain stem/medulla oblongata). II is False (stapes is in the middle ear, not internal ear). III is True (patella is a sesamoid bone). IV is True (femur articulates with coxal bone at acetabulum, patella, and tibia).",
    image_url: ""
  },
  {
    q_num: 34,
    question_text: "Study the given diagram and select the correct option w.r.t parts labelled as X, Y and Z.",
    options: [
      "Z - Sacrum, X - Pubis, Y - Obturator foramen",
      "Z - Ilium, X - Ischium, Y - Acetabulum",
      "Z - Coccyx, X - Pubic symphysis, Y - Ischial tuberosity",
      "Z - Sacrum, X - Ischium, Y - Pubic arch"
    ],
    correct_index: 0,
    solution: "In the human pelvic girdle: Z represents the sacrum (triangular bone between the two iliac wings), X represents the anteriorly located pubis bone, and Y represents the large obturator foramen.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682331/edvedum_zoology/locomotion_and_movement/q34_pelvis.png"
  },
  {
    q_num: 35,
    question_text: "Acetabulum in each coxal bone is formed by all except",
    options: [
      "Ilium",
      "Ischium",
      "Pubis",
      "Sacrum"
    ],
    correct_index: 3,
    solution: "The acetabulum (deep socket articulating with the head of femur) is formed by the fusion of three bones: ilium, ischium, and pubis. Sacrum does not participate in forming the acetabulum.",
    image_url: ""
  },
  {
    q_num: 36,
    question_text: "Which of the following curvatures in adult vertebral column are called secondary curvatures?",
    options: [
      "Thoracic and lumbar",
      "Cervical and lumbar",
      "Cervical and sacral",
      "Lumbar and sacral"
    ],
    correct_index: 1,
    solution: "Cervical and lumbar curves are secondary (compensatory) curvatures. Cervical curve develops when the infant begins to hold its head upright, and lumbar curve develops upon walking/standing.",
    image_url: ""
  },
  {
    q_num: 37,
    question_text: "Which of the following does not occur during contraction of muscle fibre?",
    options: [
      "Pulling of actin filaments towards central H-zone",
      "Binding of Ca2+ with calsequestrin protein",
      "Reduction in length of I band",
      "Chemical energy is converted into mechanical energy"
    ],
    correct_index: 1,
    solution: "Binding of Ca2+ with calsequestrin inside the sarcoplasmic reticulum occurs during relaxation when Ca2+ is actively pumped back into the sarcoplasmic cisternae.",
    image_url: ""
  },

  // Page 283: Q38 - Q48
  {
    q_num: 38,
    question_text: "A motor unit is formed by\n(i) Single motor neuron\n(ii) Muscle fibres it innervates\n(iii) Neuromuscular junction",
    options: [
      "(i) only",
      "(i) and (ii) only",
      "(i) and (iii) only",
      "(i), (ii) and (iii)"
    ],
    correct_index: 1,
    solution: "A motor neuron along with all the muscle fibres connected to (innervated by) it constitute a motor unit.",
    image_url: ""
  },
  {
    q_num: 39,
    question_text: "Which joint is present between carpals?",
    options: [
      "Saddle joint",
      "Gliding joint",
      "Ball & socket joint",
      "Pivot joint"
    ],
    correct_index: 1,
    solution: "Gliding joint (plane synovial joint) is present between the carpal bones (intercarpal joints).",
    image_url: ""
  },
  {
    q_num: 40,
    question_text: "Mark the incorrect statement for myosin (thick) filament.",
    options: [
      "Each myosin filament is a polymerised protein",
      "Its globular head has an active ATPase activity",
      "It has binding sites for ATP as well as actin",
      "The head is made up of LMM and form cross bridges with actin"
    ],
    correct_index: 3,
    solution: "The globular head and short arm of meromyosin constitute Heavy Meromyosin (HMM), while the tail constitutes Light Meromyosin (LMM).",
    image_url: ""
  },
  {
    q_num: 41,
    question_text: "Which of the following joints show the limited or slight movement?\nA - Cartilaginous joint, B - Synovial joint, C - Gliding joint, D - Pubic symphysis, E - Amphiarthrosis, F - Intervertebral symphysis, G - Angular joint",
    options: [
      "A, D, E, F",
      "A, B, E, F, G",
      "B, C, D, E, G",
      "C, D, E, F"
    ],
    correct_index: 0,
    solution: "Cartilaginous joints (amphiarthroses) permit only slight/limited movement. Examples include pubic symphysis and intervertebral symphyses.",
    image_url: ""
  },
  {
    q_num: 42,
    question_text: "Complete the analogy and select the correct option.\nGlenoid cavity : Pectoral girdle :: ______ : Pelvic girdle",
    options: [
      "Acromion process",
      "Foramen transversarium",
      "Acetabulum",
      "Coracoid process"
    ],
    correct_index: 2,
    solution: "Glenoid cavity is the cup-like socket of pectoral girdle that articulates with the humerus; similarly, the acetabulum is the deep socket of pelvic girdle that articulates with the femur.",
    image_url: ""
  },
  {
    q_num: 43,
    question_text: "Which of the following is incorrect w.r.t. muscle contraction?\nA. An increase in Ca2+ in sarcoplasm leads to muscle contraction.\nB. Ca2+ released from SR binds with tropomyosin.\nC. Acetylcholine esterase release in synapse increases muscle contraction.\nD. Muscle fibre remains relaxed till Ca2+ in sarcoplasm is increased.",
    options: [
      "A and D",
      "B and C",
      "A, B and C",
      "B, C and D"
    ],
    correct_index: 1,
    solution: "Statements B and C are incorrect. Ca2+ binds to troponin C (not tropomyosin). Acetylcholinesterase breaks down acetylcholine, thereby terminating (not increasing) muscle contraction.",
    image_url: ""
  },
  {
    q_num: 44,
    question_text: "Which of the following joint is present between atlas and axis?",
    options: [
      "Angular joint",
      "Gliding joint",
      "Hinge joint",
      "Pivot joint"
    ],
    correct_index: 3,
    solution: "The atlanto-axial joint between the atlas (1st cervical vertebra) and axis (2nd cervical vertebra) is a pivot (trochoid) synovial joint.",
    image_url: ""
  },
  {
    q_num: 45,
    question_text: "Cori's cycle operates between",
    options: [
      "Liver and voluntary muscle",
      "Liver and involuntary muscle",
      "Liver and cardiac muscle",
      "Voluntary and involuntary muscle"
    ],
    correct_index: 0,
    solution: "Cori's cycle (lactic acid cycle) involves the cycling of lactic acid produced by anaerobic glycolysis in skeletal (voluntary) muscle to the liver, where it is converted back to glucose via gluconeogenesis.",
    image_url: ""
  },
  {
    q_num: 46,
    question_text: "Proteins which combine with Ca2+ in voluntary and involuntary muscles are respectively",
    options: [
      "Calmodulin and Troponin",
      "Troponin and Calmodulin",
      "Troponin and Troponin",
      "Calmodulin and Calmodulin"
    ],
    correct_index: 1,
    solution: "In skeletal (voluntary) muscle, Ca2+ binds to troponin C. In smooth (involuntary) muscle, which lacks troponin, Ca2+ binds to calmodulin.",
    image_url: ""
  },
  {
    q_num: 47,
    question_text: "Choose the correct match w.r.t. humans.\nEar ossicle - Shape",
    options: [
      "Malleus - Anvil",
      "Incus - Hammer",
      "Stapes - Anvil",
      "Malleus - Hammer"
    ],
    correct_index: 3,
    solution: "The three ear ossicles and their shapes: Malleus - Hammer shaped; Incus - Anvil shaped; Stapes - Stirrup shaped.",
    image_url: ""
  },
  {
    q_num: 48,
    question_text: "Match the following columns:\nColumn I:\na. Tetany\nb. Osteoporosis\nc. Muscular dystrophy\nd. Arthritis\ne. Myasthenia gravis\nColumn II:\ni. Auto-immune disorder\nii. Progressive degeneration of skeletal muscle\niii. Inflammation of joints\niv. Rapid spasms in muscle\nv. Bone mass decreased",
    options: [
      "a(iv), b(v), c(ii), d(iii), e(i)",
      "a(iv), b(v), c(i), d(iii), e(ii)",
      "a(v), b(iv), c(ii), d(iii), e(i)",
      "a(iv), b(ii), c(v), d(iii), e(i)"
    ],
    correct_index: 0,
    solution: "Tetany: rapid spasms due to low Ca2+ (iv); Osteoporosis: age-dependent loss of bone mass (v); Muscular dystrophy: progressive genetic degeneration of skeletal muscle (ii); Arthritis: inflammation of joints (iii); Myasthenia gravis: autoimmune disorder against neuromuscular junction (i).",
    image_url: ""
  },

  // Page 284: Q49 - Q61
  {
    q_num: 49,
    question_text: "Humerus with rounded upper head articulates with",
    options: [
      "Acromion process",
      "Glenoid cavity",
      "Deltoid cavity",
      "Acetabulum"
    ],
    correct_index: 1,
    solution: "The rounded head of humerus articulates with the shallow glenoid cavity of the scapula to form the ball-and-socket shoulder joint.",
    image_url: ""
  },
  {
    q_num: 50,
    question_text: "Which of the following structure is formed from four vertebrae?",
    options: [
      "Sacrum",
      "Coccyx",
      "Atlas",
      "Axis"
    ],
    correct_index: 1,
    solution: "The human coccyx (tailbone) is formed by the fusion of 4 rudimentary coccygeal vertebrae (Co1-Co4). Sacrum is formed by 5 fused vertebrae.",
    image_url: ""
  },
  {
    q_num: 51,
    question_text: "Match column I with column II and select the correct option from codes given below:\nColumn I:\nA. True ribs\nB. False ribs\nC. Floating ribs\nColumn II:\n(i) 3 pairs\n(ii) 2 pairs\n(iii) 7 pairs",
    options: [
      "A - (iii), B - (i), C - (ii)",
      "A - (iii), B - (ii), C - (i)",
      "A - (i), B - (iii), C - (ii)",
      "A - (ii), B - (i), C - (iii)"
    ],
    correct_index: 0,
    solution: "True ribs (vertebrosternal) = 7 pairs (1st-7th); False ribs (vertebrochondral) = 3 pairs (8th-10th); Floating ribs (vertebral) = 2 pairs (11th-12th).",
    image_url: ""
  },
  {
    q_num: 52,
    question_text: "The vertebral formula of a human adult is",
    options: [
      "C7 Th12 L5 S(5) Co(4)",
      "C7 Th12 L5 S(1) Co(1)",
      "C7 Th10 L5 S(5) Co(4)",
      "C8 Th12 L5 S(5) Co(4)"
    ],
    correct_index: 0,
    solution: "The human vertebral formula is C7 Th12 L5 S(5) Co(4), representing 7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, and 4 fused coccygeal vertebrae.",
    image_url: ""
  },
  {
    q_num: 53,
    question_text: "Joint between radius and ulna is an example of",
    options: [
      "Pivot joint",
      "Gliding joint",
      "Hinge joint",
      "Saddle joint"
    ],
    correct_index: 0,
    solution: "The proximal and distal radioulnar joints allow rotatory pronation and supination of the forearm and are classic pivot synovial joints.",
    image_url: ""
  },
  {
    q_num: 54,
    question_text: "How many of the following bones are associated with appendicular skeleton?\nZygomatic, Hyoid, Scapula, Clavicle, Patella, Carpal, Sternum, Rib, Nasal",
    options: [
      "3",
      "4",
      "6",
      "2"
    ],
    correct_index: 1,
    solution: "Four bones belong to the appendicular skeleton: Scapula, Clavicle, Patella, and Carpal. Zygomatic, Hyoid, Sternum, Rib, and Nasal are parts of the axial skeleton.",
    image_url: ""
  },
  {
    q_num: 55,
    question_text: "Choose the incorrect statement",
    options: [
      "Last 2 pairs of ribs have no ventral attachment",
      "Ca2+ ions are transported back to sarcoplasmic reticulum passively when muscle contraction gets over",
      "Humans have dicondylic skull and bicephalic ribs",
      "Acromion process is associated with scapula of pectoral girdle"
    ],
    correct_index: 1,
    solution: "During muscle relaxation, Ca2+ ions are pumped back actively into the sarcoplasmic reticulum against the concentration gradient by the Ca2+-ATPase pump.",
    image_url: ""
  },
  {
    q_num: 56,
    question_text: "Match the following and choose the correct option:\nColumn A:\nA. Vertebro-sternal ribs\nB. Vertebro-chondral\nC. Vertebral ribs\nColumn B:\ni. 8th, 9th, 10th pairs\nii. 11th and 12th pairs\niii. 1st - 7th pairs",
    options: [
      "A - iii, B - i, C - ii",
      "A - iii, B - ii, C - i",
      "A - i, B - iii, C - ii",
      "A - ii, B - i, C - iii"
    ],
    correct_index: 0,
    solution: "Vertebro-sternal ribs are 1st to 7th pairs; Vertebro-chondral ribs are 8th, 9th, and 10th pairs; Vertebral (floating) ribs are 11th and 12th pairs.",
    image_url: ""
  },
  {
    q_num: 57,
    question_text: "Which of the following is not true with respect to white muscle fibres?",
    options: [
      "Mitochondria are less in number",
      "They contract for short periods of time",
      "They have less sarcoplasmic reticulum",
      "They have faster rate of contraction"
    ],
    correct_index: 2,
    solution: "White muscle fibres have an extensive and well-developed sarcoplasmic reticulum, enabling rapid release and uptake of calcium for fast twitches.",
    image_url: ""
  },
  {
    q_num: 58,
    question_text: "Defective purine metabolism can lead to",
    options: [
      "Gout",
      "Rheumatoid arthritis",
      "Osteoarthritis",
      "Osteoporosis"
    ],
    correct_index: 0,
    solution: "Defective purine metabolism causes hyperuricemia and subsequent deposition of monosodium urate crystals in synovial joints, leading to Gout.",
    image_url: ""
  },
  {
    q_num: 59,
    question_text: "Which of the following is not a \"Replacing bone\"?",
    options: [
      "Patella",
      "Humerus",
      "Femur",
      "Ribs"
    ],
    correct_index: 0,
    solution: "Patella is a sesamoid bone formed by the ossification within a tendon (tendon of quadriceps femoris), whereas humerus, femur, and ribs are endochondral (cartilage-replacing) bones.",
    image_url: ""
  },
  {
    q_num: 60,
    question_text: "Which of the following is a correct match with respect to human skeletal system?",
    options: [
      "Facial bones: 14 bones, of which, 4 are paired, 6 are unpaired",
      "Mandible: Only movable facial bone",
      "Hyoid: Paired bone at base of buccal cavity",
      "Tarsals: Ankle bones; 5 in each leg"
    ],
    correct_index: 1,
    solution: "Mandible (lower jaw bone) is the only movable bone of the human skull (excluding ear ossicles).",
    image_url: ""
  },
  {
    q_num: 61,
    question_text: "Match the columns and choose the correct option:\nJoints:\na. Fibrous\nb. Cartilaginous\nc. Hinge\nd. Gliding\nExamples:\n(i) Tarsals\n(ii) Between sternum and ribs\n(iii) Knee\n(iv) Sutures",
    options: [
      "a-iv, b-ii, c-iii, d-i",
      "a-iv, b-i, c-iii, d-ii",
      "a-ii, b-iv, c-iii, d-i",
      "a-i, b-ii, c-iii, d-iv"
    ],
    correct_index: 0,
    solution: "Fibrous: Cranial sutures (iv); Cartilaginous: Sternocostal / between sternum and ribs (ii); Hinge: Knee joint (iii); Gliding: Intertarsal joints between tarsals (i).",
    image_url: ""
  },

  // Page 285: Q62 - Q69
  {
    q_num: 62,
    question_text: "The collagenous connective tissue sheath called 'A' holds the numerous 'B' which make up a skeletal muscle.\nA and B respectively are",
    options: [
      "Fascicle and Fascia",
      "Endomysium and Muscle bundles",
      "Fascia and Fascicles",
      "Epimysium and Muscle fibres"
    ],
    correct_index: 2,
    solution: "A skeletal muscle is composed of many muscle bundles (fascicles) held together by a common collagenous connective tissue layer called fascia.",
    image_url: ""
  },
  {
    q_num: 63,
    question_text: "Arrange the following steps in correct sequence for skeletal muscle contraction:\nA. [Ca2+] gradually increases in sarcoplasm.\nB. Calcium binds to troponin.\nC. Troponin-tropomyosin move away from myosin binding sites on actin filaments.\nD. Neural signal at neuromuscular junction releases Acetylcholine.\nE. Action potential along sarcolemma.\nF. Actin-myosin cross-bridges formed.",
    options: [
      "D -> E -> A -> B -> C -> F",
      "E -> D -> A -> B -> C -> F",
      "D -> E -> B -> A -> C -> F",
      "E -> A -> B -> C -> D -> F"
    ],
    correct_index: 0,
    solution: "Neural signal releases ACh at NMJ (D) -> Action potential generates and travels along sarcolemma (E) -> Sarcoplasmic Ca2+ increases (A) -> Ca2+ binds to troponin C (B) -> Active sites on actin unmasked (C) -> Cross-bridge formation (F).",
    image_url: ""
  },
  {
    q_num: 64,
    question_text: "Find the correct statements regarding vertebral column of a human:\na. It protects the spinal cord.\nb. There are 2 primary and 2 secondary curvatures in adult vertebral column.\nc. Axis articulates with single occipital condyle of the skull.\nd. All ribs articulate dorsally with the thoracic vertebrae.\ne. Sacral, coccygeal and lumbar vertebrae are separate in children but get fused in adults.",
    options: [
      "a, b, c and d",
      "a, b and d only",
      "All except c & e",
      "a, b, d and e"
    ],
    correct_index: 1,
    solution: "Statements a, b, and d are correct. c is incorrect because the atlas (not axis) articulates with two occipital condyles. e is incorrect because lumbar vertebrae do not fuse in adults.",
    image_url: ""
  },
  {
    q_num: 65,
    question_text: "Match the columns and choose the correct option:\nColumn-I:\nA. Hinge joint\nB. Gliding joint\nC. Ball and socket joint\nD. Condyloid joint\nE. Saddle joint\nColumn-II:\n(i) Shoulder joint\n(ii) Between radius and carpal\n(iii) Interphalangeal joint\n(iv) Between carpal and metacarpal of human thumb\n(v) Zygapophyses of successive vertebrae",
    options: [
      "A - iii, B - v, C - i, D - ii, E - iv",
      "A - i, B - v, C - iii, D - ii, E - iv",
      "A - iii, B - v, C - i, D - iv, E - ii",
      "A - ii, B - v, C - i, D - iii, E - iv"
    ],
    correct_index: 0,
    solution: "Hinge joint: Interphalangeal joints (iii); Gliding joint: Zygapophyses of vertebrae (v); Ball and socket: Shoulder joint (i); Condyloid joint: Radiocarpal / wrist (ii); Saddle joint: Between carpal and metacarpal of thumb (iv).",
    image_url: ""
  },
  {
    q_num: 66,
    question_text: "Choose the incorrect statement",
    options: [
      "Tendons connect muscles to bones",
      "Investing bones are formed by ossification of tendons",
      "Clavicle has two curvatures",
      "Patella covers knee ventrally"
    ],
    correct_index: 1,
    solution: "Investing (membrane/dermal) bones are formed by direct intramembranous ossification in the dermis/connective tissue. Bones formed in tendons are called sesamoid bones (e.g., patella).",
    image_url: ""
  },
  {
    q_num: 67,
    question_text: "Which of the following set of bones are unpaired?",
    options: [
      "Sphenoid, Ethmoid, Palatine",
      "Vomer, Mandible, Sphenoid",
      "Temporal, Frontal, Lacrimal",
      "Zygomatic, Nasal, Mandible"
    ],
    correct_index: 1,
    solution: "Vomer (facial), Mandible (facial), and Sphenoid (cranial) are all single unpaired bones.",
    image_url: ""
  },
  {
    q_num: 68,
    question_text: "Choose the correct match",
    options: [
      "Myasthenia gravis - ACh receptors get damaged by antibodies",
      "Osteoporosis - Excess Ca2+ deposit in bones",
      "Muscular dystrophy - Autoimmune disorder",
      "Osteomalacia - Due to deficiency of Vitamin C"
    ],
    correct_index: 0,
    solution: "Myasthenia gravis is an autoimmune neuromuscular disorder where autoantibodies attack acetylcholine receptors at the neuromuscular junction.",
    image_url: ""
  },
  {
    q_num: 69,
    question_text: "Obturator foramen is surrounded by",
    options: [
      "Ilium, Ischium and pubis",
      "Ischium and pubis",
      "Ilium and Ischium",
      "Ilium and pubis"
    ],
    correct_index: 1,
    solution: "The obturator foramen is a large aperture in the hip bone bounded entirely by the rami of the ischium and pubis.",
    image_url: ""
  },

  // Page 286: Q70 - Q79
  {
    q_num: 70,
    question_text: "Given below is a diagrammatic representation of vertebral column. Which of the labelled structure forms the part of thoracic cage?",
    options: [
      "(1) A",
      "(2) B",
      "(3) C",
      "(4) D"
    ],
    correct_index: 1,
    solution: "Structure B represents the 12 thoracic vertebrae, which articulate dorsally with the ribs and form the dorsal boundary of the thoracic cage.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682333/edvedum_zoology/locomotion_and_movement/q70_vertebral_column.png"
  },
  {
    q_num: 71,
    question_text: "Which one of the following disorder of bones is characterised by microarchitectural deterioration of the bone, decreased bone mass, increased fragility and proneness to fracture?",
    options: [
      "Osteoarthritis",
      "Gouty arthritis",
      "Osteoporosis",
      "Rheumatoid arthritis"
    ],
    correct_index: 2,
    solution: "Osteoporosis is an age-related systemic skeletal disease characterized by low bone mass and microarchitectural deterioration of bone tissue, leading to enhanced bone fragility and fracture risk.",
    image_url: ""
  },
  {
    q_num: 72,
    question_text: "In rib cage, which of the following set of ribs remain attached to each other?",
    options: [
      "2nd, 3rd and 4th pairs of the ribs",
      "4th, 5th and 6th pairs of the ribs",
      "7th, 8th and 9th pairs of the ribs",
      "8th, 9th and 10th pairs of the ribs"
    ],
    correct_index: 3,
    solution: "The 8th, 9th, and 10th pairs of ribs (vertebrochondral or false ribs) do not articulate directly with the sternum but join the hyaline cartilage of the 7th rib.",
    image_url: ""
  },
  {
    q_num: 73,
    question_text: "All the statements regarding muscle fibres are correct except one. Select the wrong statement:",
    options: [
      "Tropomyosin is formed by the polymerisation of globular protein and is wrapped around the F-actin",
      "During relaxation of muscle, the troponin complex masks the active sites for the myosin head",
      "The duration of twitch can vary in different muscles",
      "The globular head is an active Mg2+ dependent ATPase enzyme"
    ],
    correct_index: 0,
    solution: "Tropomyosin is a two-stranded fibrous (helical) protein, not formed by polymerization of globular subunits (G-actin polymerizes to F-actin).",
    image_url: ""
  },
  {
    q_num: 74,
    question_text: "Following is a diagrammatic view of human skull with certain labelled bones. Among these which of them are unpaired bones?",
    options: [
      "(1) b, c, f, g, h",
      "(2) a, c, e, h",
      "(3) c, d, e, f, g",
      "(4) a, b, d, i"
    ],
    correct_index: 1,
    solution: "The unpaired bones of the skull among the labeled bones are (a) Frontal, (c) Occipital, (e) Sphenoid, and (h) Mandible.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682334/edvedum_zoology/locomotion_and_movement/q74_skull.png"
  },
  {
    q_num: 75,
    question_text: "How many unpaired bones are present in cranium?",
    options: [
      "2",
      "4",
      "3",
      "6"
    ],
    correct_index: 1,
    solution: "Four cranial bones are unpaired: Frontal (1), Occipital (1), Sphenoid (1), and Ethmoid (1). The remaining cranial bones (Parietal and Temporal) are paired (2 each).",
    image_url: ""
  },
  {
    q_num: 76,
    question_text: "Arrange the events during muscle contraction in correct order:\na. Acto-myosin complex synthesis.\nb. Release of neurotransmitter (acetylcholine) at the neuromuscular junction.\nc. Pumping of Ca2+ into sarcoplasmic cisternae.\nd. Sliding of actin filaments over myosin.\ne. Release of Ca2+ into sarcoplasm.",
    options: [
      "b, c, e, a, d",
      "b, e, a, d, c",
      "b, a, e, d, c",
      "e, b, a, d, c"
    ],
    correct_index: 1,
    solution: "Correct order: Neurotransmitter ACh released (b) -> Ca2+ released into sarcoplasm (e) -> Cross-bridge / actomyosin complex forms (a) -> Sliding of actin over myosin (d) -> Ca2+ pumped back into sarcoplasmic cisternae during relaxation (c).",
    image_url: ""
  },
  {
    q_num: 77,
    question_text: "Type of joint present between two carpals is",
    options: [
      "Gliding",
      "Saddle",
      "Pivot joint",
      "Cartilaginous"
    ],
    correct_index: 0,
    solution: "The joints between carpal bones (intercarpal joints) are gliding (plane synovial) joints.",
    image_url: ""
  },
  {
    q_num: 78,
    question_text: "Atlanto-occipital joint is an example of",
    options: [
      "Hinge joint",
      "Condyloid joint",
      "Pivot joint",
      "Gliding joint"
    ],
    correct_index: 1,
    solution: "The joint between the occipital condyles of the skull and the superior articular facets of the atlas vertebra is a condyloid (ellipsoidal) synovial joint (the 'yes' joint).",
    image_url: ""
  },
  {
    q_num: 79,
    question_text: "Which of the following includes non-muscular movement?\n(a) Protoplasmic streaming\n(b) Pseudopodial movements\n(c) Flagellar movements\n(d) Ciliary movement",
    options: [
      "(a) and (b)",
      "(a), (c) and (d)",
      "(a), (b) and (d)",
      "(a), (b), (c) and (d)"
    ],
    correct_index: 3,
    solution: "All four—protoplasmic streaming (cyclosis), amoeboid/pseudopodial, flagellar, and ciliary movements—are examples of non-muscular cellular locomotion/movement.",
    image_url: ""
  },

  // Page 287: Q80 - Q89
  {
    q_num: 80,
    question_text: "Which statement is incorrect w.r.t. muscle contraction?",
    options: [
      "Sarcoplasmic membrane contains active transport pump for Ca+2",
      "Ca2+ released from sarcoplasmic reticulum combines with tropomyosin",
      "Increase in Ca2+ concentration in sarcoplasm causes increased contraction",
      "Muscle action potential travels along the sarcolemma"
    ],
    correct_index: 1,
    solution: "Ca2+ binds to the subunit troponin C of the troponin complex on the actin filament, not with tropomyosin.",
    image_url: ""
  },
  {
    q_num: 81,
    question_text: "Which of the following statement is incorrect w.r.t. skeletal muscle?",
    options: [
      "Two sarcomeres are separated from each other by Krause line (Z-line)",
      "I-band appears dark under the light microscope",
      "During contraction, Z-line come closer",
      "H-zone reduces during contraction"
    ],
    correct_index: 1,
    solution: "The isotropic (I) band contains only thin actin filaments and appears light under polarized/light microscope. The anisotropic (A) band appears dark.",
    image_url: ""
  },
  {
    q_num: 82,
    question_text: "Which of the following statement is incorrect?",
    options: [
      "Accumulation of lactic acid in muscle leads to pain",
      "Fresh ATP molecule is required for muscle relaxation",
      "Tetany is hyperexcitability of muscles which results in cramps and convulsions",
      "As the nerve impulse reaches the skeletal muscle fibre, the sarcolemma becomes impermeable to Na+"
    ],
    correct_index: 3,
    solution: "When the action potential reaches the neuromuscular junction, acetylcholine binding increases the sarcolemma's permeability to Na+, causing depolarization, not impermeability.",
    image_url: ""
  },
  {
    q_num: 83,
    question_text: "Which of the following bone is unpaired in humans?",
    options: [
      "Mandible",
      "Zygomatic",
      "Nasal",
      "Palatine"
    ],
    correct_index: 0,
    solution: "The mandible (lower jaw) is a single, unpaired facial bone.",
    image_url: ""
  },
  {
    q_num: 84,
    question_text: "Acromion process is related to",
    options: [
      "Scapula",
      "Humerus",
      "Femur",
      "Tibia"
    ],
    correct_index: 0,
    solution: "The acromion is a prominent flat, expanded lateral projection of the spine of the scapula that articulates with the clavicle.",
    image_url: ""
  },
  {
    q_num: 85,
    question_text: "Which of the following joint is a type of saddle joint?",
    options: [
      "Joint between metacarpal of thumb and carpals",
      "Joint between radio-ulna and carpals",
      "Metacarpophalangeal joints",
      "Between sternum and clavicle"
    ],
    correct_index: 0,
    solution: "The first carpometacarpal joint (between the trapezium carpal bone and the first metacarpal of the thumb) is a saddle synovial joint.",
    image_url: ""
  },
  {
    q_num: 86,
    question_text: "Which of the following is incorrect w.r.t. comparison of red muscle fibres with white muscle fibres?",
    options: [
      "The former ones are dark red in appearance",
      "The former ones rich in mitochondria and sarcoplasmic reticulum",
      "The former ones have slow rate of contraction",
      "The former ones can contract for longer period without fatigue"
    ],
    correct_index: 1,
    solution: "Red muscle fibres are rich in mitochondria and myoglobin, but have a LESS abundant sarcoplasmic reticulum compared to white muscle fibres.",
    image_url: ""
  },
  {
    q_num: 87,
    question_text: "The following diagram represents right pectoral girdle and upper arm. The letters a, b, c and d represent which bones?",
    options: [
      "a: Acromion process, b: Humerus, c: Radius, d: Ulna",
      "a: Clavicle, b: Humerus, c: Radius, d: Ulna",
      "a: Clavicle, b: Humerus, c: Ulna, d: Radius",
      "a: Clavicle, b: Femur, c: Radius, d: Ulna"
    ],
    correct_index: 1,
    solution: "In the human upper limb: a is the clavicle (collar bone), b is the humerus (arm bone), c is the lateral forearm bone (radius, on the thumb side), and d is the medial forearm bone (ulna).",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682336/edvedum_zoology/locomotion_and_movement/q87_pectoral_girdle.png"
  },
  {
    q_num: 88,
    question_text: "The upper ends of the forearm bones articulate with each other in a",
    options: [
      "Ball and socket joint",
      "Hinge joint",
      "Pivot joint",
      "Saddle joint"
    ],
    correct_index: 2,
    solution: "The superior (proximal) radioulnar joint is a pivot joint that permits rotatory movements (pronation and supination).",
    image_url: ""
  },
  {
    q_num: 89,
    question_text: "All the ribs are attached to",
    options: [
      "Sternum",
      "Vertebral column",
      "Clavicle",
      "Ilium"
    ],
    correct_index: 1,
    solution: "All 12 pairs of ribs articulate dorsally with the thoracic vertebrae of the vertebral column.",
    image_url: ""
  },

  // Page 288: Q90 - Q103
  {
    q_num: 90,
    question_text: "Which of the following joint is present between the tarsal bones in the ankle?",
    options: [
      "Hinge joint",
      "Angular joint",
      "Gliding joint",
      "Ball and socket joint"
    ],
    correct_index: 2,
    solution: "The intertarsal joints between the individual tarsal bones of the foot are plane synovial / gliding joints.",
    image_url: ""
  },
  {
    q_num: 91,
    question_text: "Which of the following is a correct match between bones / their numbers / characteristics listed?",
    options: [
      "Pisiform: Bones of sesamoid type in lower limb of appendicular skeleton",
      "Axis and Atlas: Condyloid joint where synovial fluid acts as lubricant",
      "Femur and Tibia: Hinge joint is found between humerus and ulna",
      "Floating / vertebral ribs: Two pairs of bones that protect kidneys dorsolaterally"
    ],
    correct_index: 3,
    solution: "The 11th and 12th pairs of ribs (floating/vertebral ribs) have no ventral attachment and protect internal thoracic/abdominal organs like kidneys dorsolaterally.",
    image_url: ""
  },
  {
    q_num: 92,
    question_text: "In the figure of pectoral girdle given below, which part has been labelled wrongly?",
    options: [
      "Coracoid process",
      "Spine",
      "Glenoid cavity",
      "Supraspinous fossa"
    ],
    correct_index: 0,
    solution: "In the pectoral girdle diagram, the coracoid process was swapped/mislabeled relative to the acromion process.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682337/edvedum_zoology/locomotion_and_movement/q92_scapula.png"
  },
  {
    q_num: 93,
    question_text: "Which of the following is a major inorganic component of muscle?",
    options: [
      "Silica",
      "Potassium",
      "Sodium",
      "Calcium"
    ],
    correct_index: 1,
    solution: "Potassium (K+) is the primary and most abundant intracellular cation inside skeletal muscle fibres.",
    image_url: ""
  },
  {
    q_num: 94,
    question_text: "Which of the following can be taken as an example of endochondral bone?",
    options: [
      "Humerus",
      "Frontal",
      "Patella",
      "Nasals"
    ],
    correct_index: 0,
    solution: "The humerus is an endochondral (cartilage-replacing) bone that develops from a hyaline cartilage model. Frontal and nasal bones are dermal/intramembranous, and patella is sesamoid.",
    image_url: ""
  },
  {
    q_num: 95,
    question_text: "Excessive metabolism of nucleic acids is not responsible for",
    options: [
      "Gouty arthritis",
      "Deposition of uric acid in cartilages",
      "Deposition of urate crystals in renal tubules leading to kidney failure",
      "Deposition of urate crystals in gall bladder"
    ],
    correct_index: 3,
    solution: "Purine catabolism yields uric acid, which can deposit in joints (gout) or renal tubules (kidney stones/nephropathy), but does not deposit in the gall bladder (gallstones are primarily cholesterol/bilirubin).",
    image_url: ""
  },
  {
    q_num: 96,
    question_text: "Which vertebra in the human spine is characterized by the presence of odontoid process?",
    options: [
      "Atlas",
      "Axis",
      "C-7 vertebra",
      "T-1 vertebra"
    ],
    correct_index: 1,
    solution: "The Axis (second cervical vertebra, C2) is distinguished by the tooth-like odontoid process (dens), around which the atlas pivots.",
    image_url: ""
  },
  {
    q_num: 97,
    question_text: "The Japanese population have a variable number of floating ribs as compared to other population. Maximum how many floating ribs are observed in the Japanese?",
    options: [
      "2",
      "4",
      "6",
      "12"
    ],
    correct_index: 2,
    solution: "In a proportion of the Japanese population, the 10th pair of ribs can also be floating (in addition to the 11th and 12th pairs), giving up to 3 pairs = 6 floating ribs.",
    image_url: ""
  },
  {
    q_num: 98,
    question_text: "Choose the unpaired bones of the skull amongst the following bones w.r.t. humans:",
    options: [
      "Palatine",
      "Maxillae",
      "Parietal",
      "Mandible"
    ],
    correct_index: 3,
    solution: "Mandible is a single unpaired facial bone. Palatine, maxillae, and parietal bones are paired.",
    image_url: ""
  },
  {
    q_num: 99,
    question_text: "Which amongst the following can be considered as an autoimmune disease leading to weakness of muscle contraction?",
    options: [
      "Poliomyelitis",
      "Myasthenia gravis",
      "Duchenne's muscular dystrophy",
      "Tetany"
    ],
    correct_index: 1,
    solution: "Myasthenia gravis is an autoimmune disorder in which autoantibodies block or destroy nicotinic acetylcholine receptors at the neuromuscular junction, causing progressive muscle weakness and fatigue.",
    image_url: ""
  },
  {
    q_num: 100,
    question_text: "Which of the following is not a character of white muscle fibres when compared to red muscle fibres?",
    options: [
      "Larger diameter",
      "Less blood capillaries",
      "Less number of mitochondria",
      "Less sarcoplasmic reticulum"
    ],
    correct_index: 3,
    solution: "White muscle fibres have an extensive and abundant sarcoplasmic reticulum (not less) to rapidly release Ca2+ for fast glycolytic contractions.",
    image_url: ""
  },
  {
    q_num: 101,
    question_text: "Select amongst the following a horizontally placed long bone which is very susceptible to fracture:",
    options: [
      "Sternum",
      "Clavicle",
      "Ileum",
      "Pubis"
    ],
    correct_index: 1,
    solution: "The clavicle (collar bone) is the only long bone placed horizontally in the human body and is one of the most frequently fractured bones.",
    image_url: ""
  },
  {
    q_num: 102,
    question_text: "The disorder associated with weakness of bones, bowed tibia, 'rosary' condition in ribs especially seen in children is known as",
    options: [
      "Rickets",
      "Osteomalacia",
      "Scurvy",
      "Polio"
    ],
    correct_index: 0,
    solution: "Rickets (deficiency of Vitamin D in children) causes defective mineralization of bones, bowed legs (tibia), and beading of the costochondral junctions ('rachitic rosary').",
    image_url: ""
  },
  {
    q_num: 103,
    question_text: "Amongst the following, choose the process which can be classified as a muscle twitch:",
    options: [
      "Hiccup",
      "Yawning",
      "Cough",
      "Sneezing"
    ],
    correct_index: 0,
    solution: "A hiccup is a sudden, involuntary spasmodic contraction (twitch) of the diaphragm followed by abrupt closure of the glottis.",
    image_url: ""
  },

  // Page 289: Q104 - Q117
  {
    q_num: 104,
    question_text: "Which bone is formed by ossification in the tendon of quadriceps femoris and hence classified as a sesamoid bone?",
    options: [
      "Clavicle",
      "Scapula",
      "Patella",
      "Humerus"
    ],
    correct_index: 2,
    solution: "The patella (knee cap) is a sesamoid bone developed by ossification within the tendon of the quadriceps femoris muscle.",
    image_url: ""
  },
  {
    q_num: 105,
    question_text: "How many vertebrae are present in a child in case of human beings?",
    options: [
      "26",
      "33",
      "12",
      "42"
    ],
    correct_index: 1,
    solution: "In an infant/child, there are 33 individual vertebrae (7 cervical, 12 thoracic, 5 lumbar, 5 sacral, 4 coccygeal). In adults, the 5 sacral fuse into 1 sacrum and 4 coccygeal fuse into 1 coccyx, resulting in 26 vertebrae.",
    image_url: ""
  },
  {
    q_num: 106,
    question_text: "Scoliosis and kyphosis are conditions associated with abnormal structure of which part of the body?",
    options: [
      "Humerus",
      "Mandible",
      "Vertebral column",
      "Patella"
    ],
    correct_index: 2,
    solution: "Scoliosis (lateral curvature) and kyphosis (hunchback / exaggerated thoracic curvature) are postural/structural deformities of the human vertebral column.",
    image_url: ""
  },
  {
    q_num: 107,
    question_text: "In which case amongst the following will rigor mortis appear earlier?",
    options: [
      "Soldier in the battle field",
      "Polar bear which died of starvation in Arctic Ice",
      "A man who died a silent death after a prolonged illness",
      "All of them will show similar time period"
    ],
    correct_index: 0,
    solution: "A soldier dying in intense physical combat has already depleted muscle glycogen and ATP reserves, causing cross-bridges to lock and rigor mortis to set in much faster.",
    image_url: ""
  },
  {
    q_num: 108,
    question_text: "The interchange between muscle and liver lactic acid and glycogen is studied under the name of",
    options: [
      "Cori's cycle",
      "Sliding filament theory",
      "Krebs cycle",
      "Ornithine cycle"
    ],
    correct_index: 0,
    solution: "Cori's cycle describes the pathway where lactate formed in muscles during anaerobic glycolysis travels through blood to the liver for gluconeogenesis.",
    image_url: ""
  },
  {
    q_num: 109,
    question_text: "All the muscles have the following special properties, except",
    options: [
      "Excitability",
      "Extensibility",
      "Autorhythmicity",
      "Contractility"
    ],
    correct_index: 2,
    solution: "Autorhythmicity (inherent rhythmic self-excitation) is a unique property of cardiac muscle and some smooth muscle, not all muscle types (e.g. skeletal muscle requires motor nerve stimulation).",
    image_url: ""
  },
  {
    q_num: 110,
    question_text: "Which of the following symptoms / characters cannot be related to rheumatoid arthritis?",
    options: [
      "Inflammation of synovial membrane",
      "ESR-high, rheumatoid factor positive",
      "Synovial membrane secretes pannus",
      "Affects large weight bearing joints, often single"
    ],
    correct_index: 3,
    solution: "Rheumatoid arthritis typically affects small peripheral joints (MCP, PIP joints of fingers) bilaterally and symmetrically. Affecting a single large weight-bearing joint is characteristic of osteoarthritis or septic arthritis.",
    image_url: ""
  },
  {
    q_num: 111,
    question_text: "A single U-shaped bone in the skull which does not articulate with any other bone is",
    options: [
      "Mandible",
      "Vomer",
      "Ethmoid",
      "Hyoid"
    ],
    correct_index: 3,
    solution: "The hyoid bone is a solitary U-shaped bone situated at the base of the tongue/buccal cavity that does not articulate directly with any other bone.",
    image_url: ""
  },
  {
    q_num: 112,
    question_text: "The costal cartilage of vertebrochondral ribs are attached to",
    options: [
      "Sternum",
      "Vertebrosternal rib",
      "Thoracic vertebrae",
      "Not attached they are free"
    ],
    correct_index: 1,
    solution: "The costal cartilages of vertebrochondral ribs (8th, 9th, and 10th pairs) attach to the cartilage of the 7th vertebrosternal rib.",
    image_url: ""
  },
  {
    q_num: 113,
    question_text: "Which of the following combinations of statements is wrong about pectoral girdle?\na. Scapula is a large irregular flat bone situated in the dorsal part of the thorax between the 2nd and 7th ribs.\nb. Glenoid cavity is involved in forming a shoulder joint.\nc. Each clavicle is a flat bone with one curvature.\nd. Each half of the pectoral girdle consists of a pair of scapula and clavicle.",
    options: [
      "a, b and d",
      "a, b and c",
      "c only",
      "a and c only"
    ],
    correct_index: 2,
    solution: "Statement c is wrong: the clavicle is a long slender S-shaped bone with two curvatures, not a flat bone with one curvature.",
    image_url: ""
  },
  {
    q_num: 114,
    question_text: "Which of the following features will not be true w.r.t. hypertrophy of muscles?",
    options: [
      "Number of muscle fibres increase",
      "Number of myofilaments increase",
      "Number of mitochondria increase",
      "More development of sarcoplasmic reticulum"
    ],
    correct_index: 0,
    solution: "Muscle hypertrophy involves an increase in the size/diameter of existing muscle fibres (due to synthesis of more actin and myosin myofilaments), not an increase in the number of muscle fibres (hyperplasia).",
    image_url: ""
  },
  {
    q_num: 115,
    question_text: "The type of joint present between zygapophyses of two adjacent vertebrae in vertebral column is",
    options: [
      "Cartilaginous joint",
      "Gliding joint",
      "Fibrous joint",
      "Pivot joint"
    ],
    correct_index: 1,
    solution: "The articular facets between pre-zygapophyses and post-zygapophyses of adjacent vertebrae are plane synovial / gliding joints.",
    image_url: ""
  },
  {
    q_num: 116,
    question_text: "Choose the incorrect statement",
    options: [
      "Proximally tibia articulates with femur and at the distal end both tibia and fibula together articulate with tarsal bone",
      "Female pelvis is wider and larger than male",
      "Muscular dystrophy is a genetic disorder",
      "Tibia and fibula both contribute in the formation of knee joint"
    ],
    correct_index: 3,
    solution: "The knee joint is formed by the articulation between the femur, tibia, and patella. The fibula does not participate in forming the knee joint.",
    image_url: ""
  },
  {
    q_num: 117,
    question_text: "Which of the following does not occur at the time of contraction of striped muscle?",
    options: [
      "I-band reduced to half",
      "Binding of Ca2+ with Troponin C",
      "Shortening of H zone",
      "Shortening of myofilament"
    ],
    correct_index: 3,
    solution: "During contraction, thick and thin myofilaments do not shorten; they maintain constant length while sliding past one another.",
    image_url: ""
  },

  // Page 290: Q118 - Q130
  {
    q_num: 118,
    question_text: "Which of the following type of vertebrae are thick, strongest with their neural spine directed dorsally?",
    options: [
      "Cervical",
      "Thoracic",
      "Lumbar",
      "Sacral"
    ],
    correct_index: 2,
    solution: "Lumbar vertebrae are the largest, heaviest, and strongest vertebrae with thick kidney-shaped centra designed to bear trunk weight.",
    image_url: ""
  },
  {
    q_num: 119,
    question_text: "Which of the following is not correct w.r.t. striated muscle fibres?",
    options: [
      "A-band consists of myosin filaments and parts of actin filaments",
      "Each myosin filament is surrounded by 6 actin filaments",
      "The calcium binding protein is calmodulin",
      "T-tubules are present at the junction of A-I bands and are invagination of sarcolemma"
    ],
    correct_index: 2,
    solution: "In striated (skeletal) muscle fibres, the calcium-binding regulatory protein is troponin C, not calmodulin.",
    image_url: ""
  },
  {
    q_num: 120,
    question_text: "Select the correct sequence of events involved in contraction of striated muscles:\na. An action potential passes from the motor end plate finally reaching the SR and stimulate release of Ca2+ ions.\nb. Binding of energized cross-bridges to myosin binding sites on actin.\nc. Binding of Ca2+ with TpC-unit of troponin.\nd. Movement of troponin-tropomyosin complex away from the myosin binding sites on actin.\ne. Movement of the energized cross-bridges (power stroke) causing thin filaments to slide along the thick filament.",
    options: [
      "a -> c -> d -> b -> e",
      "a -> d -> c -> b -> e",
      "c -> a -> d -> b -> e",
      "a -> c -> b -> d -> e"
    ],
    correct_index: 0,
    solution: "Correct order: Action potential causes Ca2+ release (a) -> Ca2+ binds to TpC (c) -> Unmasking of active sites (d) -> Cross-bridge binding (b) -> Power stroke and sliding (e).",
    image_url: ""
  },
  {
    q_num: 121,
    question_text: "Choose the odd one w.r.t. smooth muscle fibres:",
    options: [
      "Spindle shaped fibres without striations",
      "Calmodulin is the calcium-binding protein",
      "T-tubules are present close to Z-line",
      "Iris and ciliary body muscles are multi-unit muscles"
    ],
    correct_index: 2,
    solution: "Smooth muscle fibres lack transverse T-tubules and do not have Z-discs (they have dense bodies instead).",
    image_url: ""
  },
  {
    q_num: 122,
    question_text: "Globular protein which blocks active sites on F-actin when the muscle fibre is relaxed is",
    options: [
      "Tropomyosin",
      "Meromyosin",
      "Actin",
      "Troponin"
    ],
    correct_index: 3,
    solution: "Troponin is a complex of three globular subunits (TnT, TnC, TnI), where TnI subunit masks the myosin-binding active sites on actin in a relaxed muscle.",
    image_url: ""
  },
  {
    q_num: 123,
    question_text: "While, if a stimulus several times greater than threshold stimulus is provided to a single muscle fibre, the muscle fibre will",
    options: [
      "Contract with same force",
      "Contract more forcefully",
      "Contract slightly",
      "Undergo tetany"
    ],
    correct_index: 0,
    solution: "According to the All-or-None Law (Bowditch's Law), an isolated individual muscle fibre contracts with maximal force once the stimulus reaches threshold level; suprathreshold stimuli do not increase contraction force of a single fibre.",
    image_url: ""
  },
  {
    q_num: 124,
    question_text: "Which of the following is a slightly movable joint?",
    options: [
      "Joint between thoracic vertebrae",
      "Atlas-axis joint",
      "Carpo-metacarpal joint of thumb",
      "Shoulder joint"
    ],
    correct_index: 0,
    solution: "The intervertebral joints between adjacent vertebral bodies are cartilaginous joints (amphiarthroses) which are slightly movable.",
    image_url: ""
  },
  {
    q_num: 125,
    question_text: "Which of the following is a sesamoid bone?",
    options: [
      "Humerus",
      "Clavicle",
      "Bones of skull",
      "Patella"
    ],
    correct_index: 3,
    solution: "The patella is the largest sesamoid bone in the human body, formed within the quadriceps tendon.",
    image_url: ""
  },
  {
    q_num: 126,
    question_text: "Which one is anatomically incorrect w.r.t. humans?",
    options: [
      "Cranial bones : 8 in number",
      "Vertebrochondral ribs : 3 pairs",
      "Phalanges in digits : 12 in number",
      "Floating ribs : 2 pairs"
    ],
    correct_index: 2,
    solution: "Phalanges in the digits of one limb are 14 in number (formula 2, 3, 3, 3, 3), not 12.",
    image_url: ""
  },
  {
    q_num: 127,
    question_text: "Which of the following set of bones belongs to the same part of the body?",
    options: [
      "Occipital, frontal and ethmoid",
      "Humerus, carpals and metatarsals",
      "Ulna, radius and tarsals",
      "Tibia, fibula and metacarpals"
    ],
    correct_index: 0,
    solution: "Occipital, frontal, and ethmoid all belong to the human cranium/skull.",
    image_url: ""
  },
  {
    q_num: 128,
    question_text: "Choose the mismatched pair w.r.t. human skeleton:",
    options: [
      "Scapula : Glenoid cavity, acromion process",
      "Ribs : Bicephalic",
      "Atlas : Second cervical vertebrae",
      "Coxal bone : Acetabulum"
    ],
    correct_index: 2,
    solution: "Atlas is the FIRST cervical vertebra (C1); the second cervical vertebra (C2) is the Axis.",
    image_url: ""
  },
  {
    q_num: 129,
    question_text: "Which of the following is not a matching pair of joint and its example?",
    options: [
      "Pivot joint : Between radius and ulna",
      "Hinge joint : Interphalangeal joints",
      "Fibrous joint : Between skull bones",
      "Ball and socket joint : Between glenoid cavity of pectoral girdle and head of femur"
    ],
    correct_index: 3,
    solution: "The glenoid cavity articulates with the head of the HUMERUS (forming shoulder joint), while the head of the femur articulates with the acetabulum of the pelvic girdle.",
    image_url: ""
  },
  {
    q_num: 130,
    question_text: "Which of the following is a degenerative joint disease that affects articular cartilages of synovial joints normally in old age?",
    options: [
      "Rheumatoid arthritis",
      "Osteoarthritis",
      "Gouty arthritis",
      "Myasthenia gravis"
    ],
    correct_index: 1,
    solution: "Osteoarthritis is a degenerative 'wear and tear' joint disorder that erodes the articular hyaline cartilages in weight-bearing joints of elderly individuals.",
    image_url: ""
  },

  // Page 291: Q131 - Q139
  {
    q_num: 131,
    question_text: "Active transport of Ca2+ ions into the sarcoplasmic reticulum will not be associated with",
    options: [
      "Return of Z-lines to their original position",
      "Increase in the I-band of sarcomere",
      "Decrease in width of overlapping zone of a sarcomere",
      "Decrease in the width of H-zone of a sarcomere"
    ],
    correct_index: 3,
    solution: "Active uptake of Ca2+ into the SR causes muscle relaxation. During relaxation, the H-zone widens / reappears (does not decrease).",
    image_url: ""
  },
  {
    q_num: 132,
    question_text: "An autoimmune disorder of neuromuscular junction, treatable by acetyl cholinesterase inhibitor, is",
    options: [
      "Muscular dystrophy",
      "Myasthenia gravis",
      "Polio",
      "Rheumatoid arthritis"
    ],
    correct_index: 1,
    solution: "Myasthenia gravis is treated using acetylcholinesterase inhibitors (e.g. neostigmine, pyridostigmine) which prolong ACh action at remaining receptors.",
    image_url: ""
  },
  {
    q_num: 133,
    question_text: "Choose the incorrect statement",
    options: [
      "Ca2+ play key regulatory role in muscle contraction",
      "Tropomyosin is a globular protein",
      "The last two pairs of ribs do not participate in breathing",
      "Carpometacarpal joint of thumb is an example of saddle joint"
    ],
    correct_index: 1,
    solution: "Tropomyosin is a double-stranded fibrous protein that wraps helically around F-actin, not a globular protein.",
    image_url: ""
  },
  {
    q_num: 134,
    question_text: "In the figure given below carefully and identify the joints labelled as - A, B and C.",
    options: [
      "Ball and socket, hinge and condyloid joints",
      "Ball and socket, pivot and condyloid joints",
      "Hinge, gliding and saddle joints",
      "Hinge, condyloid and pivot joints"
    ],
    correct_index: 0,
    solution: "A is the shoulder joint (ball and socket joint); B is the elbow joint (hinge joint); C is the radiocarpal/wrist joint (condyloid/ellipsoid joint).",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682339/edvedum_zoology/locomotion_and_movement/q134_arm_joints.png"
  },
  {
    q_num: 135,
    question_text: "Which of the following is not an example of flagellar movement?",
    options: [
      "Swimming of human spermatozoa",
      "Maintenance of water canal in the canal system of sponges",
      "Movement of ova in fallopian tube",
      "Locomotion in Euglena"
    ],
    correct_index: 2,
    solution: "Movement of ova through the female reproductive tract is driven by ciliary movement of the ciliated epithelial cells lining the fallopian tubes.",
    image_url: ""
  },
  {
    q_num: 136,
    question_text: "Vertebra prominens is the term used for which vertebra?",
    options: [
      "Last cervical vertebra (C7)",
      "Thoracic vertebra",
      "Sacral vertebra",
      "First lumbar vertebra"
    ],
    correct_index: 0,
    solution: "The 7th cervical vertebra (C7) is named 'vertebra prominens' because of its long, prominent, non-bifid spinous process that can be felt at the base of the neck.",
    image_url: ""
  },
  {
    q_num: 137,
    question_text: "Pannus granules are formed in which disorder of bones?",
    options: [
      "Bursitis",
      "Osteomalacia",
      "Rheumatoid arthritis",
      "Osteoporosis"
    ],
    correct_index: 2,
    solution: "In rheumatoid arthritis, chronic inflammation causes the synovial membrane to proliferate into an invasive granulation tissue called pannus, which destroys articular cartilage and bone.",
    image_url: ""
  },
  {
    q_num: 138,
    question_text: "Which of the following is mismatched regarding disorders of muscular and skeletal system?",
    options: [
      "Myasthenia gravis - Autoimmune disorder affecting neuromuscular junction",
      "Muscular dystrophy - Progressive degeneration of skeletal muscles mostly due to genetic disorder",
      "Tetany - Rapid spasms in muscle due to low Ca2+ in body fluid",
      "Osteoporosis - Inflammation of joints due to accumulation of uric acid crystals"
    ],
    correct_index: 3,
    solution: "Inflammation of joints due to accumulation of uric acid crystals is Gout. Osteoporosis is age-related decrease in bone density.",
    image_url: ""
  },
  {
    q_num: 139,
    question_text: "During hypertrophy of total muscles which of the following will not increase?",
    options: [
      "Number of myofilaments",
      "Number of mitochondria",
      "Number of myofibrils",
      "Number of muscle fibres"
    ],
    correct_index: 3,
    solution: "Hypertrophy of skeletal muscle involves an increase in diameter/size of muscle fibres (by adding myofibrils, myofilaments, sarcoplasmic volume), but the total number of muscle fibres does not increase.",
    image_url: ""
  },

  // Page 292: Q140 - Q148
  {
    q_num: 140,
    question_text: "Which of the following is an incorrect statement w.r.t. axial skeleton of humans?",
    options: [
      "A single U-shaped bone called hyoid bone is present at the base of the buccal cavity and it is included in the skull",
      "The skull region articulates with the superior region of the vertebral column with the help of one occipital condyle",
      "Sternum is a flat bone present on the ventral midline of thorax",
      "Last 2 pairs (11th and 12th) of ribs are not connected ventrally and are therefore called floating ribs"
    ],
    correct_index: 1,
    solution: "The human skull is dicondylic, meaning it articulates with the first cervical vertebra (atlas) with TWO occipital condyles, not one.",
    image_url: ""
  },
  {
    q_num: 141,
    question_text: "Choose the incorrect match",
    options: [
      "Saddle joint - Between carpal and metacarpal of thumb",
      "Ball and socket - Between humerus and pectoral girdle",
      "Gliding joint - Between carpals",
      "Cartilaginous - Between pre-zygapophyses and post-zygapophyses of two adjacent vertebrae"
    ],
    correct_index: 3,
    solution: "The zygapophysial joints between articular facets of adjacent vertebrae are plane synovial / gliding joints, not cartilaginous.",
    image_url: ""
  },
  {
    q_num: 142,
    question_text: "Passage of ova through female reproductive tract is facilitated mainly by",
    options: [
      "Amoeboid movement",
      "Ciliary movement",
      "Muscular movement only",
      "Pseudopodial movement"
    ],
    correct_index: 1,
    solution: "The coordinated beating of cilia on the ciliated epithelium lining the fallopian tubes transports the non-motile ovum towards the uterus.",
    image_url: ""
  },
  {
    q_num: 143,
    question_text: "Each myosin is surrounded by _____ actin filaments on either side. Choose the option that correctly fills the blank:",
    options: [
      "Six",
      "Four",
      "Three",
      "Eight"
    ],
    correct_index: 0,
    solution: "In a cross-section of a vertebrate skeletal sarcomere in the overlap zone, each thick (myosin) filament is surrounded hexagonally by six thin (actin) filaments.",
    image_url: ""
  },
  {
    q_num: 144,
    question_text: "At the time of skeletal muscle contraction, which of the following will not occur?",
    options: [
      "Shortening of isotropic band",
      "Shortening of Hensen's zone",
      "Dobie's lines (Z-lines) come closer to each other",
      "Binding of Ca2+ with calsequestrin"
    ],
    correct_index: 3,
    solution: "Binding of Ca2+ to calsequestrin occurs inside the sarcoplasmic reticulum during relaxation to store Ca2+ at high concentrations.",
    image_url: ""
  },
  {
    q_num: 145,
    question_text: "Select the feature which is not associated with white muscle fibres:",
    options: [
      "Lighter in colour",
      "These muscles have a fast rate of contraction but for a short period",
      "They depend mainly on glycolysis for energy production and soon get fatigued",
      "Less sarcoplasmic reticulum compared to red muscle fibres"
    ],
    correct_index: 3,
    solution: "White muscle fibres have MORE (an extensive and specialized) sarcoplasmic reticulum compared to red muscle fibres.",
    image_url: ""
  },
  {
    q_num: 146,
    question_text: "In the figure given below, identify A, B, C and D.",
    options: [
      "Coxal bone, patella, fibula and tibia",
      "A: Patella, B: Tibia, C: Fibula, D: Tarsals",
      "Secrum, patella, fibula and tibia",
      "Pubis, calcaneum, tibia and fibula"
    ],
    correct_index: 1,
    solution: "In the human lower limb: A is Patella (knee cap), B is the thicker medial shank bone (Tibia), C is the slender lateral shank bone (Fibula), and D represents the ankle bones (Tarsals).",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682341/edvedum_zoology/locomotion_and_movement/q146_lower_limb.png"
  },
  {
    q_num: 147,
    question_text: "Autorhythmicity is exhibited by both",
    options: [
      "Striped muscle and cardiac muscle",
      "Unstriped muscle and skeletal muscle",
      "Cardiac muscle and voluntary muscle",
      "Unstriped muscle and cardiac muscle"
    ],
    correct_index: 3,
    solution: "Both cardiac muscle (via SA node) and visceral unstriped/smooth muscle (via myogenic pacemaker cells) exhibit spontaneous autorhythmicity.",
    image_url: ""
  },
  {
    q_num: 148,
    question_text: "Which of the following curves are not present in vertebral column at the time of birth?",
    options: [
      "Cervical and Lumbar",
      "Thoracic and Sacral",
      "Cervical and Sacral",
      "Thoracic and Lumbar"
    ],
    correct_index: 0,
    solution: "At birth, the vertebral column exhibits a single primary anterior concavity (thoracic and sacral). The secondary lordotic curves (cervical and lumbar) develop postnatally.",
    image_url: ""
  },

  // Page 293: Q149 - Q159
  {
    q_num: 149,
    question_text: "Costal cartilage of vertebrochondral ribs are attached to",
    options: [
      "Thoracic vertebrae",
      "Sternum",
      "Cartilage of 7th vertebrosternal rib",
      "Not attached to any other bone"
    ],
    correct_index: 2,
    solution: "The vertebrochondral ribs (8th, 9th, and 10th pairs) do not articulate directly with the sternum; their costal cartilages fuse with the cartilage of the 7th rib.",
    image_url: ""
  },
  {
    q_num: 150,
    question_text: "Choose the incorrect statement with respect to myosin:",
    options: [
      "Globular head part has actin binding site",
      "Has binding site for ATP",
      "Has light meromyosin and heavy meromyosin",
      "Tropomyosin run close to the meromyosin throughout its length"
    ],
    correct_index: 3,
    solution: "Tropomyosin runs close to the F-ACTIN filament (thin filament), not meromyosin (thick filament).",
    image_url: ""
  },
  {
    q_num: 151,
    question_text: "Extra amount of oxygen consumed during recovery from muscle fatigue is called oxygen debt of the muscle. It is used in oxidizing what percentage of accumulated lactic acid aerobically and in restoring the depleted creatine phosphate and ATP in muscle fibres?",
    options: [
      "80%",
      "20%",
      "40%",
      "60%"
    ],
    correct_index: 1,
    solution: "Approximately 20% (one-fifth) of accumulated lactic acid is oxidized aerobically to CO2 and H2O to generate ATP for glycogen resynthesis; the remaining 80% is converted back to glycogen in liver via Cori's cycle.",
    image_url: ""
  },
  {
    q_num: 152,
    question_text: "During muscle contraction, the following events occur:\na. Release of Ca2+ from sarcoplasmic reticulum expose actins which bind to the myosin heads to form cross bridges.\nb. A motor neuron carries signal to the muscle fibre which generates an action potential in it.\nc. Cross bridges are broken and muscle relaxes.\nd. These cross bridges pull the actin filaments, causing them to slide over the myosin filaments and thereby causing contraction.\nSelect the correct sequence:",
    options: [
      "b -> a -> d -> c",
      "c -> b -> a -> d",
      "a -> b -> c -> d",
      "b -> d -> a -> c"
    ],
    correct_index: 0,
    solution: "The correct sequence of muscle contraction: Motor neuron signal and action potential (b) -> Ca2+ release and cross-bridge formation (a) -> Sliding of actin over myosin (d) -> Breaking of cross-bridge upon ATP binding (c).",
    image_url: ""
  },
  {
    q_num: 153,
    question_text: "Bones of cranium which do not allow any movement are attached to each other by",
    options: [
      "Cartilaginous joint",
      "Fibrous joint",
      "Elastic cartilage",
      "Synovial joints"
    ],
    correct_index: 1,
    solution: "Cranial bones are joined together by immovable fibrous joints known as sutures, composed of dense collagenous white fibrous connective tissue.",
    image_url: ""
  },
  {
    q_num: 154,
    question_text: "Joint between ear ossicles are",
    options: [
      "Immovable (Synarthroses)",
      "Slightly movable (Amphiarthroses)",
      "Movable (Diarthroses)",
      "Gomphoses"
    ],
    correct_index: 2,
    solution: "The joints between the ear ossicles (incudomalleolar and incudostapedial) are tiny synovial joints (diarthroses / freely movable).",
    image_url: ""
  },
  {
    q_num: 155,
    question_text: "Which of the following properties is not applicable to the myosin filament?",
    options: [
      "Slide into H-zone during muscle contraction",
      "Cross arms present have native rough surface",
      "Fewer than actin filaments",
      "Found only in the A-band of sarcomere"
    ],
    correct_index: 0,
    solution: "Myosin filaments do not slide into the H-zone; it is the thin actin filaments that slide inward into the H-zone towards the M-line during contraction.",
    image_url: ""
  },
  {
    q_num: 156,
    question_text: "Which of the following is the unpaired bone present in the cranium?",
    options: [
      "Parietal bone",
      "Mandible",
      "Temporal",
      "Sphenoid"
    ],
    correct_index: 3,
    solution: "Sphenoid is an unpaired cranial bone. Mandible is a facial bone (not cranial), and parietal and temporal bones are paired cranial bones.",
    image_url: ""
  },
  {
    q_num: 157,
    question_text: "Which of the following properties does not describe rheumatoid arthritis?",
    options: [
      "Affects large joints first",
      "Formation of rheumatoid factor (IgM)",
      "Formation of pannus granules",
      "It is an autoimmune disorder"
    ],
    correct_index: 0,
    solution: "Rheumatoid arthritis typically affects small peripheral joints of the hands and feet symmetrically first, rather than large joints.",
    image_url: ""
  },
  {
    q_num: 158,
    question_text: "The correct sequence of events at the neuromuscular junction is\na. Uptake of Ca2+ into the presynaptic terminals\nb. Action potential in the motor nerve\nc. Release of Acetylcholine (Ach)\nd. Depolarisation in the muscle end plate\ne. Interaction between Ach and Ach-specific receptors\nChoose the correct option:",
    options: [
      "b -> a -> c -> e -> d",
      "a -> b -> c -> d -> e",
      "b -> c -> a -> d -> e",
      "a -> c -> b -> e -> d"
    ],
    correct_index: 0,
    solution: "Action potential in motor axon (b) -> Presynaptic Ca2+ influx (a) -> Exocytosis of ACh (c) -> ACh binds nicotinic receptors (e) -> End-plate potential / depolarization (d).",
    image_url: ""
  },
  {
    q_num: 159,
    question_text: "Select the correct statement:",
    options: [
      "Myocardial contractility increases with the increase in concentration of Ca2+ ions",
      "In humans, there are 120 bones in appendicular skeleton",
      "Number of secondary curvatures in the human vertebral column are three",
      "Rheumatoid arthritis is diagnosed by the presence of IgM and mainly affects the larger joints in its early stages"
    ],
    correct_index: 0,
    solution: "Increase in intracellular Ca2+ ion concentration enhances cross-bridge cycling and increases myocardial contractility (positive inotropic effect).",
    image_url: ""
  },

  // Page 296: Q179 - Q187
  {
    q_num: 179,
    question_text: "Given below is a diagrammatic representation of ribs and ribcage. Identify the structure labelled as 'A' and choose the correct option w.r.t. its number in human body.",
    options: [
      "7 in number (cervical vertebrae)",
      "12 in number (lumbar vertebrae)",
      "5 in number (sacral vertebrae)",
      "12 in number (thoracic vertebrae)"
    ],
    correct_index: 3,
    solution: "Structure 'A' represents the thoracic vertebrae forming the dorsal boundary of the ribcage, which are 12 in number in the human body.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682342/edvedum_zoology/locomotion_and_movement/q179_ribcage.png"
  },
  {
    q_num: 180,
    question_text: "The contractile protein of skeletal muscle possessing Mg2+ dependent ATPase activity is",
    options: [
      "Troponin",
      "Myosin head",
      "Actin",
      "Tropomyosin"
    ],
    correct_index: 1,
    solution: "The globular head of myosin contains an active actin-activated, Mg2+-dependent ATPase enzyme site that hydrolyzes ATP to energize the cross-bridge.",
    image_url: ""
  },
  {
    q_num: 181,
    question_text: "Given below is a diagrammatic representation of right pelvic girdle and lower limb bones (frontal view). Choose the incorrect option w.r.t. wrongly labelled bones.",
    options: [
      "Pubis and Ischium",
      "Tibia and Tarsals",
      "Tibia and Fibula",
      "Femur and Ilium"
    ],
    correct_index: 2,
    solution: "In the diagram, the thicker medial bone is the tibia and the slender lateral bone is the fibula; swapping them represents the incorrect label.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793682343/edvedum_zoology/locomotion_and_movement/q181_pelvic_limb.png"
  },
  {
    q_num: 182,
    question_text: "Which of the following muscle tissue has lowest refractory period and can use lactic acid produced by skeletal muscle fibres to make ATP?",
    options: [
      "Cardiac muscle",
      "Smooth muscle",
      "Non-striated muscle",
      "Skeletal muscle"
    ],
    correct_index: 0,
    solution: "Cardiac muscle cells contain abundant lactate dehydrogenase-1 (LDH-1) and can rapidly absorb blood lactic acid produced by active skeletal muscles and convert it into pyruvate for aerobic ATP generation.",
    image_url: ""
  },
  {
    q_num: 183,
    question_text: "Read the following statements very carefully:\nA. Muscle fibres carry out considerable aerobic oxidation.\nB. Muscle fibres have slow rate of contraction.\nC. Muscle fibres poor in sarcoplasmic reticulum and less mitochondria.\nD. Muscle fibres are lighter in colour and thicker.\nHow many of the following statements is/are correct for red muscle fibres?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_index: 1,
    solution: "Two statements (A and B) are correct. C is incorrect because red fibres are rich in mitochondria. D is incorrect because red fibres are dark red and thinner.",
    image_url: ""
  },
  {
    q_num: 184,
    question_text: "In resting state, a subunit of ______ masks the active binding sites for myosin on actin filaments. Choose the option that correctly fills the blank:",
    options: [
      "Troponin",
      "Calsequestrin",
      "Calmodulin",
      "Meromyosin"
    ],
    correct_index: 0,
    solution: "In the resting state, the TnI subunit of the troponin complex masks the active binding sites for myosin on the actin filaments.",
    image_url: ""
  },
  {
    q_num: 185,
    question_text: "Which of the following cells in our body exhibit amoeboid movement?",
    options: [
      "Fibroblast and thrombocytes",
      "Macrophages and thrombocytes",
      "Macrophages and leucocytes",
      "Leucocytes and thrombocytes"
    ],
    correct_index: 2,
    solution: "Specialized cells in human blood and tissues such as macrophages and leucocytes (neutrophils, monocytes) exhibit amoeboid movement using pseudopodia.",
    image_url: ""
  },
  {
    q_num: 186,
    question_text: "Each organised skeletal muscle in our body is made of a number of A held together by a common collagenous connective tissue layer called B. Choose the option which correctly fills the blanks:",
    options: [
      "Fascicles - Sarcolemma",
      "Muscle bundles - Endomysium",
      "Fascicles - Fascia",
      "Muscle bundles - Sarcolemma"
    ],
    correct_index: 2,
    solution: "Each skeletal muscle is made of multiple muscle bundles (fascicles) bound together by a common collagenous sheath called fascia.",
    image_url: ""
  },
  {
    q_num: 187,
    question_text: "Axis vertebra is identified by",
    options: [
      "Sigmoid notch",
      "Odontoid fossa",
      "Odontoid process",
      "Olecranon process"
    ],
    correct_index: 2,
    solution: "The axis (C2) is characterized by the presence of a tooth-like odontoid process (dens) projecting superiorly from its vertebral body.",
    image_url: ""
  },

  // Page 297: Q188
  {
    q_num: 188,
    question_text: "Which of the following is an age-dependent systemic disorder characterised by low bone mass, microarchitectural deterioration of bones and increased fragility and susceptibility of bones to fracture?",
    options: [
      "Osteomyelitis",
      "Rickets",
      "Gout",
      "Osteoporosis"
    ],
    correct_index: 3,
    solution: "Osteoporosis is an age-dependent disorder characterized by progressive loss of bone mineral density and bone mass, predisposing individuals to fragility fractures.",
    image_url: ""
  }
];

// ---------------------------------------------------------------------------
// SECTION B: 14 ASSERTION - REASON QUESTIONS
// ---------------------------------------------------------------------------
export const SECTION_B_AR_QUESTIONS = [
  {
    q_num: 1,
    assertion_text: "Rest is necessary after heavy exercise.",
    reason_text: "During rest, glucose is converted into lactic acid and creatine phosphate breaks down into creatine.",
    correct_index: 2, // (3) Assertion is true but Reason is false
    solution: "Assertion is true because rest is necessary to repay oxygen debt and remove accumulated lactic acid. Reason is false because during rest, lactic acid is converted back into glycogen/glucose in the liver via Cori's cycle, and creatine phosphate is resynthesized from ATP."
  },
  {
    q_num: 2,
    assertion_text: "Fracture in children usually does not break the bone into individual parts.",
    reason_text: "Bending type of fractures in children is known as greenstick fracture.",
    correct_index: 0, // (1) Both true & Reason is correct explanation
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Children's bones contain a higher proportion of organic collagen fibres, making them pliable; hence under stress they bend and crack incompletely on one side like a green twig (greenstick fracture) without snapping completely."
  },
  {
    q_num: 3,
    assertion_text: "Athletes engaged in activities requiring prolonged action have abundant red muscle fibres.",
    reason_text: "Red muscle fibres can perform slow sustained work over long periods without getting fatigued.",
    correct_index: 0, // (1) Both true & Reason is correct explanation
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Red fibres contain abundant myoglobin and mitochondria that carry out aerobic respiration, resisting fatigue and enabling endurance athletes to sustain continuous exertion."
  },
  {
    q_num: 4,
    assertion_text: "Flat skull bones fuse end to end with the help of dense white fibrous tissue.",
    reason_text: "Joints between skull bones is an example of fibrous joints.",
    correct_index: 0, // (1) Both true & Reason is correct explanation
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Cranial sutures are fibrous joints (synarthroses) where adjacent flat bones are tightly united by dense collagenous white fibrous tissue, permitting zero movement."
  },
  {
    q_num: 5,
    assertion_text: "Myasthenia gravis is an autoimmune disorder affecting the neuromuscular junction.",
    reason_text: "It leads to fatigue, weakening and paralysis of skeletal muscle.",
    correct_index: 1, // (2) Both true but Reason is NOT the correct explanation
    solution: "Both statements are true. However, Reason states the clinical symptoms resulting from the disease, but does not explain why it is classified as autoimmune (it is autoimmune because the body produces autoantibodies against its own nicotinic ACh receptors)."
  },
  {
    q_num: 6,
    assertion_text: "Myasthenia gravis is an immune disorder affecting neuromuscular junction, leads to fatigue, weakening and paralysis of skeletal muscles.",
    reason_text: "Use of acetylcholinesterase inhibitors may help.",
    correct_index: 1, // (2) Both true but Reason is not correct explanation
    solution: "Both statements are true. Acetylcholinesterase inhibitors (e.g., neostigmine) prevent acetylcholine degradation and improve transmission, but this therapeutic fact does not explain the pathological nature stated in the assertion."
  },
  {
    q_num: 7,
    assertion_text: "Muscles possess excitability, contractility, extensibility and elasticity.",
    reason_text: "Cardiac muscles are striated, branched and show autorhythmicity.",
    correct_index: 1, // (2) Both true but Reason is not correct explanation
    solution: "Both statements are true facts of muscular physiology, but the specific histological characteristics of cardiac muscle do not explain the general properties shared by all muscle tissues."
  },
  {
    q_num: 8,
    assertion_text: "All locomotions are movements but all movements are not locomotions.",
    reason_text: "Locomotion is generally for search of food, shelter, mate, suitable breeding grounds, favourable climatic conditions or to escape from enemies or predators.",
    correct_index: 1, // (2) Both true but Reason is not correct explanation
    solution: "Both statements are true. Locomotion specifically involves change in place/location (a subset of voluntary movement). While Reason explains the evolutionary purpose of locomotion, it does not explain the definitional relationship in the assertion."
  },
  {
    q_num: 9,
    assertion_text: "When a muscle is stimulated repeatedly at regular intervals, the first 5-15 contractions increase progressively in amplitude.",
    reason_text: "This is muscle treppe or staircase phenomenon.",
    correct_index: 0, // (1) Both true & Reason is correct explanation
    solution: "Both Assertion and Reason are true, and Reason correctly identifies the physiological phenomenon known as treppe (staircase effect), which occurs due to progressive accumulation of Ca2+ in the sarcoplasm and slight warming."
  },
  {
    q_num: 10,
    assertion_text: "Rapid spasm is caused in muscle due to low Ca2+ in the body fluid.",
    reason_text: "PTH is a hypercalcaemic hormone.",
    correct_index: 1, // (2) Both true but Reason is not correct explanation
    solution: "Both statements are true. Low extracellular calcium causes hypocalcemic tetany by increasing neuronal Na+ permeability and membrane excitability. Parathyroid hormone (PTH) indeed raises blood Ca2+, but this hormonal role does not directly explain the ionic mechanism of muscle spasm."
  },
  {
    q_num: 11,
    assertion_text: "Muscle fibre is the anatomical unit of muscle.",
    reason_text: "About 20% of the body weight of a human adult is contributed by muscle.",
    correct_index: 2, // (3) Assertion is true but Reason is false
    solution: "Assertion is true: the muscle fibre (myocyte) is the anatomical unit of skeletal muscle. Reason is false: muscles contribute about 40% to 50% of total body weight in a healthy human adult, not 20%."
  },
  {
    q_num: 12,
    assertion_text: "The portion of myofibril between two successive Z-lines is considered as functional unit of contraction and is called a sarcomere.",
    reason_text: "'H' zone marks the centre of sarcomere.",
    correct_index: 1, // (2) Both true but Reason is not correct explanation
    solution: "Both statements are true. A sarcomere is bounded by two Z-discs and is the smallest contracting unit. The H-zone is the central region of the A-band containing only thick filaments, but this does not explain why the sarcomere is the functional contractile unit."
  },
  {
    q_num: 13,
    assertion_text: "The single filament of tropomyosin runs close to 'F' actins throughout its length.",
    reason_text: "Tropomyosin is distributed on troponin at regular intervals.",
    correct_index: 3, // (4) Both Assertion and Reason are false
    solution: "Both statements are false. TWO filaments of tropomyosin (not a single filament) run close to the F-actin throughout its length. Furthermore, troponin is distributed on tropomyosin at regular intervals, not tropomyosin on troponin."
  },
  {
    q_num: 14,
    assertion_text: "White muscle fibres are characterised by fewer mitochondria and lesser number of sarcoplasmic reticulum.",
    reason_text: "White muscle fibres exhibit slow rate of contraction for a short duration only.",
    correct_index: 3, // (4) Both Assertion and Reason are false
    solution: "Both statements are false. White muscle fibres have fewer mitochondria, but they have an EXTENSIVE/HIGH amount of sarcoplasmic reticulum. Reason is also false because white fibres exhibit a FAST (rapid) rate of contraction, although they fatigue quickly."
  }
];

const STANDARD_AR_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "If Assertion is true statement but Reason is false, then mark (3).",
  "If both Assertion and Reason are false statements, then mark (4)."
];

async function seed() {
  console.log('=== STARTING SEEDING FOR ZOOLOGY: LOCOMOTION AND MOVEMENT ===\n');

  const client = await connectWithRetry();

  try {
    // 1. Ensure Zoology Subject
    const subRes = await client.query(`SELECT id, name FROM subjects WHERE name ILIKE '%zoo%' LIMIT 1`);
    const subjectId = subRes.rows[0]?.id || 2;
    console.log(`Using Subject: Zoology (ID: ${subjectId})`);

    // 2. Ensure / Update Chapter
    let chapterId = 3;
    const updateChap = await client.query(`
      UPDATE chapters 
      SET name = 'Locomotion and Movement', subject_id = $1 
      WHERE id = $2 
      RETURNING id, name
    `, [subjectId, chapterId]);

    if (updateChap.rows.length === 0) {
      const insChap = await client.query(`
        INSERT INTO chapters (id, name, subject_id, position)
        VALUES (3, 'Locomotion and Movement', $1, 7)
        ON CONFLICT (id) DO UPDATE SET name = 'Locomotion and Movement'
        RETURNING id, name
      `, [subjectId]);
      chapterId = insChap.rows[0].id;
    }
    console.log(`Confirmed Chapter: "Locomotion and Movement" with ID: ${chapterId}`);

    // 3. Clean up any existing questions for this chapter
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE chapter_id = $1 OR chapter ILIKE '%locomotion%'
    `, [chapterId]);
    console.log(`Cleaned up ${delRes.rowCount} previous question(s).`);

    // 4. Insert Section A MCQs
    console.log(`\nInserting ${SECTION_A_QUESTIONS.length} Section A (Objective MCQ) questions...`);
    for (let i = 0; i < SECTION_A_QUESTIONS.length; i++) {
      const q = SECTION_A_QUESTIONS[i];
      const optKeys = ['A', 'B', 'C', 'D'];
      const formattedOptions = q.options.map((optText, idx) => ({
        key: optKeys[idx],
        text: optText,
        media: [],
        image_url: ""
      }));

      await client.query(`
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter, status
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        )
      `, [
        'Zoology',
        'mcq',
        q.question_text,
        JSON.stringify(formattedOptions),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        'medium',
        q.solution,
        q.image_url || '',
        'Zoology',
        'Locomotion and Movement',
        'Locomotion and Movement',
        'approved'
      ]);

      if ((i + 1) % 20 === 0 || i + 1 === SECTION_A_QUESTIONS.length) {
        console.log(`  [Section A] Inserted ${i + 1}/${SECTION_A_QUESTIONS.length}`);
      }
    }

    // 5. Insert Section B AR Questions
    console.log(`\nInserting ${SECTION_B_AR_QUESTIONS.length} Section B (Assertion-Reason) questions...`);
    for (let i = 0; i < SECTION_B_AR_QUESTIONS.length; i++) {
      const ar = SECTION_B_AR_QUESTIONS[i];
      const optKeys = ['A', 'B', 'C', 'D'];
      const formattedOptions = STANDARD_AR_OPTIONS.map((optText, idx) => ({
        key: optKeys[idx],
        text: optText,
        media: [],
        image_url: ""
      }));

      const fullQuestionText = `Assertion (A): ${ar.assertion_text}\nReason (R): ${ar.reason_text}`;

      await client.query(`
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, assertion_text, reason_text, subject, topic, chapter, status
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18
        )
      `, [
        'Zoology',
        'assertion_reason',
        fullQuestionText,
        JSON.stringify(formattedOptions),
        ar.correct_index,
        JSON.stringify([ar.correct_index]),
        4,
        subjectId,
        chapterId,
        'medium',
        ar.solution,
        '',
        ar.assertion_text,
        ar.reason_text,
        'Zoology',
        'Assertion and Reason',
        'Locomotion and Movement',
        'approved'
      ]);

      console.log(`  [Section B - AR] Inserted AR Q${i + 1}/${SECTION_B_AR_QUESTIONS.length}`);
    }

    // 6. Invalidate Redis Question Bank Cache
    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('\n Redis Question Bank cache invalidated.');
    } catch (cacheErr) {
      console.warn('\n Cache invalidation note:', cacheErr.message);
    }

    console.log(`\n=== SUCCESS: 143 QUESTIONS (129 MCQs + 14 ARs) SEEDED FOR LOCOMOTION AND MOVEMENT ===`);

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);

