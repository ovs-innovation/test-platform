import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS/transient error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

export const SECTION_A_QUESTIONS = [
  // Page 259: Q1 - Q8
  {
    q_num: 1,
    question_text: "Which of the following is the correctly matched?",
    options: [
      "Ammonotelic: Aquatic insects | Ureotelic: marine fishes | Uricotelic: amphibia",
      "Ammonotelic: Many bony fishes | Ureotelic: most mammal | Uricotelic: birds, insects",
      "Ammonotelic: Aquatic amphibian | Ureotelic: marine fishes | Uricotelic: mammal",
      "Ammonotelic: Aquatic insect, amphibian | Ureotelic: many bony fishes | Uricotelic: birds, reptile"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "According to NCERT: Many bony fishes, aquatic amphibians and aquatic insects are ammonotelic. Mammals, many terrestrial amphibians and marine fishes mainly release urea and are called ureotelic. Reptiles, birds, land snails and insects excrete uric acid and are called uricotelic."
  },
  {
    q_num: 2,
    question_text: "Which of the following is correct about the function of renal tubule?",
    options: [
      "DCT is capable of selective secretion of HCO3-",
      "Reabsorption in Henle's loop is maximum",
      "PCT also helps to maintain the pH and ionic balance of body fluid by absorption of HCO3-",
      "DCT allow passage of small amount of urea into medullary interstitium to keep up the osmolarity"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "PCT helps maintain pH and ionic balance of body fluids by selective secretion of H+, NH3 and K+ into filtrate and absorption of HCO3- from it. DCT reabsorbs HCO3-, while the collecting duct allows small amounts of urea into the medullary interstitium."
  },
  {
    q_num: 3,
    question_text: "The chemical/enzyme which converts angiotensin-I into angiotensin-II; is secreted by",
    options: ["Kidney", "Hypothalamus", "Heart", "Lungs"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Angiotensin Converting Enzyme (ACE), which converts angiotensin-I to angiotensin-II, is produced and secreted primarily by the vascular endothelial cells of the lungs."
  },
  {
    q_num: 4,
    question_text: "In interstitial fluid of kidney there is an increasing osmolarity from cortex to the inner medulla. This gradient is mainly caused by",
    options: ["Na+, K+", "NaCl, Urea", "NaCl, water, HCO3-", "Urea, K+, HCO3-"],
    correct_index: 1,
    difficulty: "easy",
    solution: "According to NCERT, the increasing medullary interstitial osmolar gradient (from 300 mOsmol/L in the cortex to 1200 mOsmol/L in the inner medulla) is mainly caused by NaCl and urea."
  },
  {
    q_num: 5,
    question_text: "How many molecules of ammonia and CO2 are respectively used in one urea cycle?",
    options: ["1 and 1", "2 and 1", "2 and 2", "3 and 2"],
    correct_index: 1,
    difficulty: "medium",
    solution: "In the ornithine/urea cycle, two molecules of ammonia (one from carbamoyl phosphate and one from aspartate) and one molecule of CO2 are consumed per molecule of urea synthesized."
  },
  {
    q_num: 6,
    question_text: "About 70-80% of electrolyte and water from glomerular filtrate is reabsorbed from which part of nephron?",
    options: [
      "Proximal convoluted tubule",
      "Descending limb of loop of Henle",
      "Ascending limb of loop of Henle",
      "Distal convoluted tubule"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Nearly all essential nutrients and 70-80 per cent of electrolytes and water are reabsorbed by the Proximal Convoluted Tubule (PCT)."
  },
  {
    q_num: 7,
    question_text: "Which of the following chemicals is used to measure the glomerular filtration rate?",
    options: ["Glucose", "Sucrose", "Starch", "Inulin"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Inulin, a polymer of fructose, is freely filtered at the glomerulus and neither reabsorbed nor secreted by renal tubules, making it the gold standard for measuring GFR."
  },
  {
    q_num: 8,
    question_text: "Match the Column A with Column B\nColumn-A:\nA. Renal calculi\nB. Alkaptonuria\nC. Cystitis\nD. Pyelonephritis\nColumn-B:\n(i) Inflammation of urinary bladder\n(ii) Inflammation of pelvis of kidney\n(iii) Homogentisic acid\n(iv) Calcium oxalate\n(v) Inflammation of glomeruli\nSelect the correct option:",
    options: [
      "A(iv), B(iii), C(i), D(ii)",
      "A(iv), B(iii), C(v), D(i)",
      "A(iii), B(ii), C(v), D(iv)",
      "A(v), B(iv), C(ii), D(iii)"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Renal calculi are insoluble masses of calcium oxalate; Alkaptonuria involves accumulation of homogentisic acid; Cystitis is inflammation of urinary bladder; and Pyelonephritis is inflammation of the renal pelvis."
  },

  // Page 260: Q9 - Q20
  {
    q_num: 9,
    question_text: "Which of the following is incorrect about micturition?",
    options: [
      "During micturition, urethral sphincters relax and urinary bladder contracts",
      "It is voluntary process in response to distension of urinary bladder",
      "External urethral sphincter is under voluntary control of animal",
      "It is under sympathetic control only"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Micturition involves parasympathetic motor impulses causing contraction of the smooth muscles of the bladder (detrusor) and relaxation of the internal sphincter. It is not under sympathetic control only."
  },
  {
    q_num: 10,
    question_text: "If GFR of a person is 0.125 L min-1 and RPF is 700 mL min-1. Calculate the filtration fraction.",
    options: ["0.14", "0.18", "0.22", "0.40"],
    correct_index: 1,
    difficulty: "medium",
    solution: "GFR = 0.125 L/min = 125 mL/min. RPF = 700 mL/min. Filtration Fraction (FF) = GFR / RPF = 125 / 700 ≈ 0.1785 ≈ 0.18."
  },
  {
    q_num: 11,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "The glomerular filtrate in descending limb of loop of Henle is hypotonic in comparison to blood plasma",
      "The diameter of arterioles of nephron helps to maintain glomerular hydrostatic pressure",
      "Facultative reabsorption takes place in DCT",
      "Ascending limb of loop of Henle is impermeable to water"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "As filtrate passes down the descending limb of loop of Henle, water is drawn out into the hypertonic medullary interstitium, concentrating the filtrate so it becomes hypertonic to blood plasma, not hypotonic."
  },
  {
    q_num: 12,
    question_text: "If parasympathetic nerve fibres supplying to urinary bladder are cut off which of the following is affected?",
    options: ["Filling of bladder", "Emptying of bladder", "Incontinence", "Voluntary control of micturition"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Parasympathetic pelvic nerves stimulate contraction of the detrusor muscle to empty the bladder. If they are severed, bladder emptying is impaired."
  },
  {
    q_num: 13,
    question_text: "Azotemia is increase in",
    options: ["Na+ in blood", "Urea in urine", "Nitrogenous waste in blood", "Drug in urine"],
    correct_index: 2,
    difficulty: "easy",
    solution: "Azotemia is a biochemical abnormality defined as an elevation of blood urea nitrogen (BUN) and other nitrogenous wastes (like creatinine) in the blood."
  },
  {
    q_num: 14,
    question_text: "Functional kidney of mammals is",
    options: ["Archinephros", "Opisthonephros", "Mesonephros", "Metanephros"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Adult reptiles, birds, and mammals have metanephric kidneys (metanephros)."
  },
  {
    q_num: 15,
    question_text: "Which one of the following statements is correct w.r.t. kidney function regulator?",
    options: [
      "During summer, when body loses lot of water by evaporation the release of ADH is suppressed",
      "An increase in glomerular blood flow stimulates formation of angiotensin II",
      "When someone drinks lot of water, ADH release is suppressed",
      "Exposure to the cold temperature stimulates ADH release"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "An increase in body fluid volume caused by drinking large quantities of water switches off osmoreceptors and suppresses the release of ADH."
  },
  {
    q_num: 16,
    question_text: "Which one of the following correctly explains the function of a specific part of human nephron?",
    options: [
      "Afferent arteriole: Carries the blood away from glomerulus towards renal vein",
      "Podocytes: Create minute spaces (slit pores) for the filtration of blood into Bowman's capsule",
      "Henle's loop: Most reabsorption of the major substances from glomerular filtrate",
      "Distal convoluted tubule: Reabsorption of K+ ions into surrounding blood capillaries"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Podocytes are specialized epithelial cells of Bowman's capsule arranged intricately to leave minute spaces called filtration slits or slit pores through which blood is finely filtered."
  },
  {
    q_num: 17,
    question_text: "Urea synthesis takes place primarily in liver because",
    options: [
      "Enzyme arginase is present in liver only",
      "NH3 and CO2 are present in liver only",
      "Hormone ADH is found in liver only",
      "Kidney is smaller than liver"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Arginase, the enzyme that cleaves arginine to yield ornithine and urea in the final step of the urea cycle, is localized almost exclusively in the liver."
  },
  {
    q_num: 18,
    question_text: "Maintenance of body potassium level is primarily by tubular",
    options: [
      "Reabsorption in loop of Henle",
      "Secretion in loop of Henle",
      "Reabsorption in DCT",
      "Secretion in DCT"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "DCT regulates potassium homeostasis and blood pH by the selective secretion of potassium (K+) and hydrogen (H+) ions into the filtrate."
  },
  {
    q_num: 19,
    question_text: "Parasympathetic nerve supplies to",
    options: [
      "Detrusor muscle only",
      "Detrusor muscle and internal sphincter",
      "Detrusor muscle and external sphincter",
      "External sphincter"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Parasympathetic nerve fibers innervate the smooth muscle of the bladder wall (detrusor muscle, causing contraction) and the internal urethral sphincter (causing relaxation)."
  },
  {
    q_num: 20,
    question_text: "Select the correctly matched pair:\n(i) Uremia - Excessive amount of urea in blood\n(ii) Hyperglycemia - Excess glucose in blood\n(iii) Presence of blood in urine - Haematuria\n(iv) Absence of glucose in urine - Glycosuria",
    options: [
      "(i) and (iv) are correct only",
      "(i) and (ii) are correct only",
      "(i), (ii) and (iii) are correct",
      "(i), (ii) and (iv) are correct"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Statements (i), (ii), and (iii) are correctly matched. Statement (iv) is incorrect because glycosuria indicates the presence (not absence) of glucose in urine."
  },

  // Page 261: Q21 - Q31
  {
    q_num: 21,
    question_text: "If Henle's loop were absent from mammalian nephron, which of the following is to be expected?",
    options: [
      "The urine will be more dilute",
      "There will be no urine formation",
      "The urine will be more concentrated",
      "There will be hardly any change in the quality and quantity of urine formed"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "The loop of Henle establishes the hypertonic medullary gradient required for concentrating urine. Without it, the ability to concentrate urine is lost, making urine more dilute."
  },
  {
    q_num: 22,
    question_text: "Angiotensinogen is a protein produced and secreted by",
    options: ["Liver cells", "Macula densa cells", "Juxta-glomerular cells", "Endothelial cells lining of blood vessels"],
    correct_index: 0,
    difficulty: "easy",
    solution: "Angiotensinogen is a plasma globulin produced and secreted into blood by hepatic cells (liver)."
  },
  {
    q_num: 23,
    question_text: "Which one of the following statements is correct with respect to water balance inside the body of living organisms?",
    options: [
      "When water is not available, camel does not produce urine but stores urea in tissues",
      "Salmon fish excretes lot of stored salt solution by contractile vacuole",
      "Paramecium discharges concentrated salt solution by contractile vacuoles",
      "The body fluid of freshwater animals are generally hypotonic to surrounding water"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "During water deprivation, camels produce minimal concentrated urine and reabsorb/store urea in tissues to maintain tissue water balance."
  },
  {
    q_num: 24,
    question_text: "Which of the following is correct in case of dehydration?",
    options: ["RPF will increase", "GFR will decrease", "FF will remain unchanged", "GFR and FF will increase"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Dehydration leads to hypovolemia, decreased renal arterial blood pressure, and a subsequent decrease in Glomerular Filtration Rate (GFR)."
  },
  {
    q_num: 25,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Birds and land snails are uricotelic",
      "Mammals and adult frogs are ureotelic",
      "Aquatic amphibians and aquatic insects are ammonotelic",
      "Birds and reptiles are ureotelic"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "Birds and reptiles are uricotelic animals, excreting nitrogenous waste in the form of uric acid with minimum loss of water; they are not ureotelic."
  },
  {
    q_num: 26,
    question_text: "Which of the following is incorrect about the ANF?",
    options: [
      "It inhibits RAAS",
      "Decreases urine formation",
      "Stimulates adrenal gland to secretes aldosterone",
      "Decreases reabsorption of NaCl"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "ANF opposes the RAAS mechanism and inhibits the adrenal cortex from secreting aldosterone. It causes natriuresis and vasodilation."
  },
  {
    q_num: 27,
    question_text: "Which of the following is not the physiological adaptation in fresh water animals to maintain osmolarity of body fluid?",
    options: [
      "Don't drink water",
      "Formation of dilute urine",
      "Metabolism of fats to release water",
      "Chloride cells or ionocytes actively uptake salt from surrounding water"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Fat metabolism to produce metabolic water is a characteristic adaptation of desert animals (e.g. kangaroo rat), not freshwater animals that face constant osmotic water influx."
  },
  {
    q_num: 28,
    question_text: "Select the incorrect statement",
    options: [
      "Counter current flow of blood in vasa recta helps to retain the absorbed sodium in the renal medulla",
      "Glomerular filtrate is protein free plasma",
      "Vasa recta carry glomerular filtrate from distal convoluted tubule to the collecting duct",
      "Glomerular filtrate in Bowman's capsule is isotonic to the plasma"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Vasa recta are capillary blood vessels; they carry blood, not glomerular filtrate from DCT to collecting duct."
  },
  {
    q_num: 29,
    question_text: "Osmoconformer are the animal that",
    options: [
      "Do not actively control the osmotic condition of their body fluid",
      "Actively control the osmotic condition of their body fluid",
      "Maintain the condition of body fluid within a narrow osmotic range",
      "Do not change the body fluid according to the osmolarity of ambient medium"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Osmoconformers allow their internal osmolarity to change with ambient osmotic changes and do not actively regulate internal osmolarity."
  },
  {
    q_num: 30,
    question_text: "Match column I and II and select the correct option\nColumn I\n(A) Glycosuria\n(B) Renal calculi\n(C) Glomerulonephritis\n(D) Gout\nColumn II\n(i) Accumulation of uric acid in joints\n(ii) Inflammation of glomeruli\n(iii) Mass of crystallized salts within the kidney\n(iv) Presence of glucose in urine",
    options: [
      "A(i), B(ii), C(iii), D(iv)",
      "A(iv), B(iii), C(ii), D(i)",
      "A(iv), B(ii), C(iii), D(i)",
      "A(i), B(iv), C(iii), D(ii)"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Glycosuria is presence of glucose in urine; Renal calculi are masses of crystallised salts; Glomerulonephritis is inflammation of glomeruli; and Gout is accumulation of uric acid in joints."
  },
  {
    q_num: 31,
    question_text: "Which of the following substances is/are not eliminated by sebaceous glands?",
    options: ["Sterols", "Hydrocarbons", "Waxes", "Lactic acid"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Sebaceous glands eliminate sterols, hydrocarbons, and waxes through sebum. Lactic acid is eliminated by sweat glands."
  },

  // Page 262: Q32 - Q41
  {
    q_num: 32,
    question_text: "Which of the following hormones is secreted by JG cells in response to fall in glomerular blood flow and glomerular blood pressure?",
    options: ["Renin", "Oxytocin", "Aldosterone", "ANF"],
    correct_index: 0,
    difficulty: "easy",
    solution: "A fall in glomerular blood flow/pressure activates the juxtaglomerular (JG) cells to release renin into circulation."
  },
  {
    q_num: 33,
    question_text: "PCT of nephron is lined by",
    options: [
      "Simple columnar brush bordered epithelium",
      "Compound columnar brush bordered epithelium",
      "Simple cuboidal brush bordered epithelium",
      "Compound cuboidal ciliated epithelium"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Proximal Convoluted Tubule (PCT) is lined by simple cuboidal brush-bordered epithelium, which provides a high surface area for reabsorption."
  },
  {
    q_num: 34,
    question_text: "Match the following and choose the correct option\nColumn I (Mode or product of excretion)\na. Trimethylamine oxide\nb. Ureotelism\nc. Ammonotelism\nd. Uricotelism\nColumn II (Organism)\n(i) Marine elasmobranchs\n(ii) Amoeba\n(iii) Marine teleosts\n(iv) Amphibian tadpoles\n(v) Insects",
    options: [
      "a(iv), b(i), c(ii), d(v)",
      "a(iii), b(iv), c(i), d(v)",
      "a(iii), b(i), c(iv), d(v)",
      "a(iv), b(iii), c(i), d(ii)"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Trimethylamine oxide is excreted by marine teleosts; Marine elasmobranchs are ureotelic; Amphibian tadpoles are ammonotelic; and Insects are uricotelic."
  },
  {
    q_num: 35,
    question_text: "Vasa recta of the peritubular capillaries network is present in/around",
    options: ["Renal medulla", "Limbs of loop of Henle", "Distal convoluted tubule", "Both (1) and (2)"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Vasa recta are hairpin-shaped peritubular capillary loops running parallel to Henle's loop in the renal medulla."
  },
  {
    q_num: 36,
    question_text: "Internal structure of a human kidney reveals the presence of pyramidal structures. These renal pyramids are the parts of",
    options: [
      "Renal cortex projecting into renal medulla",
      "Renal medulla leading into the minor calyces",
      "Renal cortex projecting into renal pelvis",
      "Renal cortex projecting into the medullary calyces"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Renal (medullary) pyramids are conical divisions of the renal medulla that project and empty into the minor calyces."
  },
  {
    q_num: 37,
    question_text: "Which of the following is mismatched w.r.t. enzyme and their function involved in ornithine cycle?",
    options: [
      "Carbamoyl phosphate synthetase - Carbamoyl phosphate formation",
      "Arginase - Cleavage of argininosuccinate",
      "Ornithine transcarbamoylase - Citrulline formation",
      "Argininosuccinate synthetase - Argininosuccinate synthesis"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Arginase catalyzes the cleavage of arginine to ornithine and urea. Cleavage of argininosuccinate is catalyzed by argininosuccinate lyase."
  },
  {
    q_num: 38,
    question_text: "In case of renal failure, the Net Filtration Pressure (NFP) in the glomeruli of the nephrons is 0, one of the causes behind this may be",
    options: [
      "Increase in Glomerular Hydrostatic Pressure",
      "Decrease in Glomerular Hydrostatic Pressure",
      "Decrease in Blood Colloid Osmotic Pressure",
      "Decrease in Capsular Hydrostatic Pressure"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "NFP = GHP - (BCOP + CHP). A significant drop in Glomerular Hydrostatic Pressure (GHP) reduces NFP to zero, halting glomerular ultrafiltration."
  },
  {
    q_num: 39,
    question_text: "In artificial haemodialysis, which of the following statements is true?",
    options: [
      "Nitrogenous waste rich blood is taken from renal vein and returned via renal artery",
      "The dialysing fluid is identical to the blood plasma in composition",
      "This is done for uremic patients to prolong life",
      "Anti-heparin is added to blood before it passes into dialysing unit"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Hemodialysis removes accumulated nitrogenous wastes from blood in uremic patients with kidney failure to prolong life."
  },
  {
    q_num: 40,
    question_text: "The interstitial fluid around the nephrons within the kidney will show",
    options: [
      "Maximum osmolarity at its inner medulla",
      "Maximum osmolarity at its outer medulla",
      "Maximum osmolarity at its inner cortex",
      "Maximum osmolarity at its outer cortex"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Osmolarity increases progressively through the renal interstitium from 300 mOsmol/L in the cortex to a maximum of ~1200 mOsmol/L in the inner medulla."
  },
  {
    q_num: 41,
    question_text: "Conditional reabsorption of Na+ and water takes place in",
    options: ["Proximal convoluted tubule", "Henle's loop", "Distal convoluted tubule", "Ducts of Bellini"],
    correct_index: 2,
    difficulty: "easy",
    solution: "Conditional (facultative) reabsorption of Na+ and water takes place in the Distal Convoluted Tubule (DCT) mediated by aldosterone and ADH."
  },

  // Page 263: Q42 - Q51
  {
    q_num: 42,
    question_text: "Urea cycle removes the following wastes from our blood",
    options: ["NH3 and Urea", "CO2 and Urea", "CO2 and NH3", "Urea and Uric acid"],
    correct_index: 2,
    difficulty: "easy",
    solution: "The urea cycle converts toxic carbon dioxide (CO2) and ammonia (NH3) into urea for excretion."
  },
  {
    q_num: 43,
    question_text: "'Renal calculi' is",
    options: ["Phenylketonuria", "Glomerulonephritis", "Ketonuria", "Kidney stone"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Renal calculi are stone or insoluble masses of crystallized salts formed within the kidney."
  },
  {
    q_num: 44,
    question_text: "Main composition of kidney stone is",
    options: ["Sodium chloride", "CaCO3", "Calcium oxalate", "Sodium bicarbonate"],
    correct_index: 2,
    difficulty: "easy",
    solution: "The primary and most common chemical constituent of kidney stones (renal calculi) is calcium oxalate."
  },
  {
    q_num: 45,
    question_text: "During haemodialysis, the following precautions are taken, except",
    options: [
      "Blood is mixed with Heparin",
      "Blood is cooled to 0°C",
      "Blood is centrifuged to separate serum",
      "Dialysing fluid has composition similar to blood plasma except nitrogenous waste"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Blood is never centrifuged to separate serum during hemodialysis; intact whole blood is dialyzed across the cellophane membrane."
  },
  {
    q_num: 46,
    question_text: "Reabsorption and secretion of major substances at different parts of the nephron are given below. Select the correct labelling for A, B, C and D respectively.",
    image_url: "/uploads/excretory_products/q46_diagram.png",
    options: [
      "A: HCO3-, B: Nutrients, C: Urea, D: NaCl",
      "A: NaCl, B: Urea, C: K+, D: HCO3-",
      "A: H2O, B: NaCl, C: Urea, D: HCO3-",
      "A: Urea, B: NaCl, C: H2O, D: HCO3-"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "In Henle's loop: descending limb reabsorbs water (A = H2O); ascending limb transports electrolytes (B = NaCl); collecting duct allows small amounts of urea to diffuse into interstitium (C = Urea); and DCT reabsorbs bicarbonate (D = HCO3-)."
  },
  {
    q_num: 47,
    question_text: "Which of the following parts of nephron help to maintain the pH and ionic balance of body fluids by selective secretion of hydrogen ions, ammonia and potassium ions to filtrate and by reabsorption of HCO3- from it?",
    options: [
      "PCT and DCT",
      "PCT and Loop of Henle",
      "DCT and Loop of Henle",
      "PCT, DCT and Loop of Henle"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Both PCT and DCT maintain the pH and electrolyte balance of body fluids through selective secretion of H+, NH3, and K+ and reabsorption of HCO3-."
  },
  {
    q_num: 48,
    question_text: "Final adjustment of urine concentration and passage of small amounts of urea into medullary interstitium occurs in",
    options: ["Loop of Henle", "DCT", "Collecting duct", "PCT"],
    correct_index: 2,
    difficulty: "easy",
    solution: "The collecting duct carries out final water reabsorption to produce concentrated urine and allows passage of small amounts of urea into the medullary interstitium."
  },
  {
    q_num: 49,
    question_text: "Which of the following pressure causes blood plasma to filter if BCOP = 30; CHP = 15; GHP = 55 mm Hg?",
    options: ["45 mm Hg", "30 mm Hg", "15 mm Hg", "10 mm Hg"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Net Filtration Pressure (NFP) = GHP - (BCOP + CHP) = 55 - (30 + 15) = 55 - 45 = 10 mm Hg."
  },
  {
    q_num: 50,
    question_text: "The medulla of the kidney is divided into few conical masses known as (i) projected into (ii). Select the correct option to fill in the blanks respectively",
    options: [
      "Calyces, medullary pyramid",
      "Medullary pyramids, calyces",
      "Loop of Henle, calyces",
      "Renal pelvis, ureter"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "The renal medulla is divided into a few conical masses called medullary pyramids projecting into the calyces."
  },
  {
    q_num: 51,
    question_text: "Choose the option which states all statements True (T) or False (F) correctly.\n(i) Glomerulus is a tuft of capillaries formed by the efferent arteriole.\n(ii) Descending limb of loop of Henle is impermeable to water.\n(iii) Ascending limb of loop of Henle is impermeable to water.\n(iv) Approx 70-80% of glomerular filtrate is normally absorbed in PCT.",
    options: ["T, T, F, F", "F, F, T, T", "T, F, T, F", "F, T, F, T"],
    correct_index: 1,
    difficulty: "medium",
    solution: "(i) False (formed by afferent arteriole); (ii) False (permeable to water); (iii) True (impermeable to water); (iv) True (70-80% reabsorbed in PCT). Pattern: F, F, T, T."
  },

  // Page 264: Q52 - Q61
  {
    q_num: 52,
    question_text: "Choose the correct match between the parts of the nephron and the type of tissue present in them.",
    options: [
      "Bowman's capsule – Simple cuboidal epithelium",
      "Proximal convoluted tubule – Squamous epithelium with podocytes",
      "Distal convoluted tubule – Simple cuboidal epithelium",
      "Loop of Henle – Brush-bordered cuboidal epithelium"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "DCT is lined by simple cuboidal epithelium. Bowman's capsule has simple squamous epithelium with podocytes, and PCT is lined by simple cuboidal brush border epithelium."
  },
  {
    q_num: 53,
    question_text: "Ornithine cycle, occurs in",
    options: [
      "Cytosol of hepatocytes only",
      "Mitochondria of kidney cells",
      "Cytosol of kidney cells",
      "Cytosol and mitochondria of hepatocytes"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "The urea (ornithine) cycle occurs exclusively in hepatocytes (liver cells), compartmentalized between mitochondria (steps 1 & 2) and cytosol (steps 3, 4 & 5)."
  },
  {
    q_num: 54,
    question_text: "The renal (i) extends into the renal (ii) as the (iii). Select the correct option to fill in the blanks",
    options: [
      "Cortex, Medulla, Ducts of Bellini",
      "Medulla, Cortex, Ducts of Bellini",
      "Cortex, Medulla, Columns of Bertini",
      "Medulla, Cortex, Columns of Bertini"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "The renal cortex extends in between the medullary pyramids as renal columns called Columns of Bertini."
  },
  {
    q_num: 55,
    question_text: "The renal blood flow in a normal adult human is ___ per min, which is roughly ___ of the cardiac output, and of this roughly ___ of filtrate is formed per minute by both kidneys.",
    options: [
      "1100-1200 mL; 1/3; 180 L",
      "1100-1200 mL; 1/5; 125 mL",
      "660 mL; 1/5; 125 mL",
      "180 L; 1/10; 125 mL"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Renal blood flow is 1100-1200 mL/min (roughly 1/5th of cardiac output), and GFR is approximately 125 mL/min."
  },
  {
    q_num: 56,
    question_text: "Identify the statements as true (T) or false (F) and choose the correct option\nI. Renin is secreted from the juxtaglomerular kidney cell.\nII. RAAS is activated by low blood pressure and low blood volume.\nIII. GFR is easily measured using PAH.\nIV. Blood from the glomerulus is carried away by an afferent arteriole.",
    options: ["T, T, F, F", "T, T, F, T", "F, T, T, F", "T, F, T, T"],
    correct_index: 0,
    difficulty: "medium",
    solution: "I is True; II is True; III is False (Inulin measures GFR, PAH measures RPF); IV is False (carried away by efferent arteriole). Pattern: T, T, F, F."
  },
  {
    q_num: 57,
    question_text: "Counter current system helps in A osmolarity towards the inner medullary interstitium, i.e., from B in the cortex to about C in the inner medulla. Select the correct option to fill in the blanks",
    options: [
      "Increasing, 1200 mOsmL-1, 300 mOsmL-1",
      "Increasing, 300 mOsmL-1, 1200 mOsmL-1",
      "Decreasing, 900 mOsmL-1, 600 mOsmL-1",
      "Decreasing, 600 mOsmL-1, 300 mOsmL-1"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "The counter-current system maintains an increasing osmolarity gradient from 300 mOsmol/L in the cortex to about 1200 mOsmol/L in the inner medulla."
  },
  {
    q_num: 58,
    question_text: "Which of the following is incorrect with respect to ANF action?",
    options: [
      "It opposes RAAS",
      "Reduces release of aldosterone",
      "Causes constriction of blood vessels",
      "Increases excretion of Na+ in urine"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "ANF causes vasodilation (dilation of blood vessels) and natriuresis to reduce blood pressure, opposing vasoconstriction."
  },
  {
    q_num: 59,
    question_text: "Which is neither reabsorbed nor secreted by tubular cells of nephron?",
    options: ["Glucose", "Urea", "Uric acid", "Inulin"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Inulin is neither reabsorbed nor secreted by the tubular cells after being filtered by the glomerulus."
  },
  {
    q_num: 60,
    question_text: "Read the following statements and choose the correct option.\nStatement A: BCOP is mainly due to albumin.\nStatement B: Micturition will not occur normally if stretch receptors of bladder are removed.",
    options: [
      "Only Statement A is correct",
      "Only Statement B is correct",
      "Both the statements A and B are incorrect",
      "Both the statements A and B are correct"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Both statements are correct: Blood Colloid Osmotic Pressure is maintained primarily by plasma albumin, and stretch receptors on the bladder wall initiate the normal micturition reflex."
  },
  {
    q_num: 61,
    question_text: "Choose the incorrect match",
    options: [
      "Conditional H2O reabsorption – PCT",
      "Minimum reabsorption – Ascending limb of Henle",
      "K+, H+ secretion – DCT",
      "Urea reabsorption – Collecting duct"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Conditional (facultative) water reabsorption takes place in the DCT under ADH regulation, whereas PCT performs obligatory water reabsorption."
  },

  // Page 265: Q62 - Q69
  {
    q_num: 62,
    question_text: "Identify the statements as True (T) or False (F) and choose the correct option.\nI. The kidney is covered by an outer tough renal capsule.\nII. Renal cortex is divided into conical masses called minor calyces.\nIII. The cortex extends in between the medullary pyramids which is called as columns of Bertini.\nIV. Blood in renal artery has more urea in comparison to blood in renal vein.",
    options: ["T, F, T, T", "T, T, T, F", "F, T, T, T", "T, F, F, T"],
    correct_index: 0,
    difficulty: "medium",
    solution: "I is True; II is False (medulla is divided into medullary pyramids); III is True (Columns of Bertini); IV is True (renal artery brings unfiltered blood with more urea). Pattern: T, F, T, T."
  },
  {
    q_num: 63,
    question_text: "Read the following statements (A-D):\nA. Micturition is carried out by contraction of detrusor muscles and simultaneous relaxation of urethral sphincters.\nB. ADH helps in water elimination, making the urine extremely dilute.\nC. Henle's loop plays an important role in concentrating the urine.\nD. Glucose is actively reabsorbed in the proximal convoluted tubule.\nHow many of the above statement are incorrect?",
    options: ["Zero", "One", "Two", "Three"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Only statement B is incorrect: ADH facilitates water reabsorption, making the urine concentrated rather than dilute. Statements A, C, and D are correct."
  },
  {
    q_num: 64,
    question_text: "Match the columns I and II and choose the correct option\nColumn I\nA. Proximal convoluted tubule\nB. Distal convoluted tubule\nC. Descending limb of Henle's loop\nD. Ascending limb of Henle\nColumn II\ni. Permeable to H2O, but almost impermeable to solutes\nii. Impermeable to H2O\niii. Reabsorption of 70-80% of filtrate\niv. Facultative water reabsorption",
    options: [
      "A(iii), B(iv), C(i), D(ii)",
      "A(iv), B(iii), C(i), D(ii)",
      "A(iii), B(iv), C(ii), D(i)",
      "A(iv), B(iii), C(ii), D(i)"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "A. PCT -> Reabsorption of 70-80% of filtrate (iii); B. DCT -> Facultative water reabsorption (iv); C. Descending limb -> Permeable to water, impermeable to solutes (i); D. Ascending limb -> Impermeable to water (ii)."
  },
  {
    q_num: 65,
    question_text: "The haemodialysing fluid is identical in composition to blood plasma except for",
    options: ["Nitrogenous waste", "NaCl", "Glucose", "Amino acids"],
    correct_index: 0,
    difficulty: "easy",
    solution: "The dialysing fluid has the same ionic and osmotic composition as normal plasma except that it is completely devoid of nitrogenous wastes (urea, uric acid)."
  },
  {
    q_num: 66,
    question_text: "Choose the correct option regarding the following statements (A and B)\nStatement A: RAAS may get activated in a person suffering from severe diarrhoea.\nStatement B: Due to activation of RAAS overall Na+ and H2O reabsorption increases.",
    options: [
      "Only Statement A is correct",
      "Only Statement B is correct",
      "Both the statements A and B are correct",
      "Both the statements A and B are incorrect"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Both statements are correct. Diarrhea causes hypovolemia and dehydration, stimulating renin release and activating RAAS, which enhances sodium and water reabsorption."
  },
  {
    q_num: 67,
    question_text: "Juxtamedullary nephrons differ from cortical nephrons as they have",
    options: [
      "Short loop of Henle",
      "No role in counter current exchange",
      "No role in urine concentration",
      "Well-developed vasa recta"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "Juxtamedullary nephrons have long loops of Henle dipping deep into the renal medulla and possess well-developed vasa recta."
  },
  {
    q_num: 68,
    question_text: "Match the following columns and choose the correct option\nColumn I\nA. Hematuria\nB. Ketonuria\nC. Glycosuria\nD. Pyuria\nColumn II\ni. Presence of pus in urine\nii. Presence of blood cells in urine\niii. Presence of glucose in urine\niv. Presence of high amount of ketone bodies in urine",
    options: [
      "A(ii), B(iv), C(iii), D(i)",
      "A(i), B(iv), C(iii), D(ii)",
      "A(ii), B(iii), C(iv), D(i)",
      "A(iv), B(ii), C(iii), D(i)"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Hematuria is blood in urine; Ketonuria is ketone bodies in urine; Glycosuria is glucose in urine; and Pyuria is pus in urine."
  },
  {
    q_num: 69,
    question_text: "Calculate the net filtration pressure if, GHP = 70 mm Hg, CHP = 20 mm Hg and BCOP = 40 mm Hg",
    options: ["10 mm Hg", "50 mm Hg", "110 mm Hg", "60 mm Hg"],
    correct_index: 0,
    difficulty: "easy",
    solution: "NFP = GHP - (BCOP + CHP) = 70 - (40 + 20) = 70 - 60 = 10 mm Hg."
  },

  // Page 266: Q70 - Q81
  {
    q_num: 70,
    question_text: "Increased stretching of afferent arteriole in response to increase in blood pressure leads to increased influx of Ca2+ and therefore ___ in its diameter. Select the correct option to fill in the blanks respectively",
    options: ["Influx; Increase", "Efflux; Increase", "Influx; Decrease", "Efflux; Decrease"],
    correct_index: 2,
    difficulty: "medium",
    solution: "In the myogenic autoregulatory response, stretch opens calcium channels causing Ca2+ influx and vascular smooth muscle contraction, decreasing the arteriole diameter."
  },
  {
    q_num: 71,
    question_text: "In which of the following conditions will the RAAS pathway be activated?",
    options: [
      "Increased B.P.",
      "Decreased body fluid volume",
      "Increased body fluid volume",
      "Excess Na+ in body fluids"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "A decrease in body fluid volume or blood pressure activates juxtaglomerular cells to release renin, triggering the RAAS cascade."
  },
  {
    q_num: 72,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Henle's loop plays a significant role in the maintenance of high osmolarity of medullary interstitial fluid",
      "Aquatic insects are ammonotelic",
      "PCT is lined by simple brush border cuboidal epithelium",
      "Ascending limb of Henle's loop is permeable to water but do not allow transport of electrolyte"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "The ascending limb of Henle's loop is impermeable to water and actively/passively transports electrolytes (NaCl) into the medullary interstitium."
  },
  {
    q_num: 73,
    question_text: "Which of the following changes will result in the decline of glomerular filtrate formation?",
    options: [
      "Increase in renal plasma flow",
      "Increase in capsular hydrostatic pressure",
      "Decrease in glomerular hydrostatic pressure",
      "Decrease in blood colloidal osmotic pressure"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "An increase in capsular hydrostatic pressure (CHP) directly opposes ultrafiltration, lowering the Net Filtration Pressure and decreasing GFR."
  },
  {
    q_num: 74,
    question_text: "Secretion of renin is stimulated by all of the following factors, except",
    options: [
      "Fall in arterial blood pressure",
      "Reduction in the volume of extracellular fluid",
      "Decreased load of sodium detected by macula densa",
      "Volume of urea produced per day"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "The daily volume of urea produced has no direct physiological regulatory impact on renin secretion by the juxtaglomerular apparatus."
  },
  {
    q_num: 75,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Secretion of H+ into the renal tubules occurs with the formation of carbonic acid",
      "The counter current multiplier system is formed by vasa recta",
      "The major cause for the hyperosmolality of medullary interstitial fluid is the active reabsorption of sodium chloride and other solutes from thick ascending segment into the medullary interstitium",
      "Antidiuretic hormone helps in the concentration of urine"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "The counter-current multiplier is the Loop of Henle; vasa recta function as the counter-current exchanger."
  },
  {
    q_num: 76,
    question_text: "If renal plasma flow is 660 mL/min and amount of plasma in blood is 55% then calculate renal blood flow",
    options: ["1300 mL/min", "1200 mL/min", "1100 mL/min", "1400 mL/min"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Renal Blood Flow (RBF) = RPF / Plasma fraction = 660 / 0.55 = 1200 mL/min."
  },
  {
    q_num: 77,
    question_text: "Which of the following parts of nephron can be termed as the concentrating segment of loop of Henle?",
    options: [
      "PCT",
      "DCT",
      "Descending limb of loop of Henle",
      "Ascending limb of loop of Henle"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "The descending limb of loop of Henle is permeable to water and impermeable to salts, progressively concentrating the luminal filtrate as water is drawn out."
  },
  {
    q_num: 78,
    question_text: "Which of the following is incorrect?",
    options: [
      "Azotemia - Accumulation of nitrogenous wastes in the blood",
      "Nephrology - The branch of medicine that deals with the male and female urinary systems and the male reproductive system",
      "ANF - Can cause vasodilation",
      "Gout - Urate crystals accumulate in joints"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Nephrology is the medical specialty studying kidney anatomy, physiology, and pathology. Urology deals with the urinary tract and male reproductive system."
  },
  {
    q_num: 79,
    question_text: "Which of the following statements is/are true w.r.t. ornithine cycle?\n(a) Carbamoyl phosphate is formed by combination of ammonia, CO2 and ATP\n(b) Carbamoyl phosphate combines with ornithine to form citrulline\n(c) Arginine is hydrolysed to urea and ornithine in presence of enzyme arginase\nChoose the correct option.",
    options: ["Only (a)", "Only (b) and (c)", "Only (a) and (b)", "(a), (b) and (c)"],
    correct_index: 3,
    difficulty: "medium",
    solution: "All three statements are correct representations of key biochemical steps in the hepatic urea (ornithine) cycle."
  },
  {
    q_num: 80,
    question_text: "Which of the given organisms are ammonotelic?",
    options: [
      "Starfish, tadpole larva of frog, cartilaginous fish",
      "Amoeba, sponge, Hydra",
      "Crow, frog, Jelly fish",
      "Sponge, cartilaginous fish, starfish"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Simple aquatic invertebrates like Amoeba, sponges, and Hydra excrete ammonia as their primary nitrogenous waste by simple diffusion."
  },
  {
    q_num: 81,
    question_text: "Which of the following is incorrect?",
    options: [
      "Uric acid - Cockroach and parrot",
      "Trimethylamine oxide - Marine bony fish",
      "Amino acid - Birds",
      "Urea - Shark"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Birds are uricotelic organisms that convert nitrogenous waste to uric acid; they do not excrete amino acids."
  },

  // Page 267: Q82 - Q87
  {
    q_num: 82,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Guanine - Spiders and Penguins",
      "Hippuric acid - Mammals",
      "Ammonia - Hydra, Shark, Lizard",
      "Uric acid - Reptiles, Birds"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Sharks are ureotelic (retaining urea in blood) and lizards are uricotelic; they do not excrete ammonia."
  },
  {
    q_num: 83,
    question_text: "In the diagram given below and match the hormones given in column I with target areas and action given in the column II.",
    image_url: "/uploads/excretory_products/q83_diagram.png",
    options: [
      "a(ii), b(iii), c(i)",
      "a(iii), b(ii), c(i)",
      "a(i), b(ii), c(iii)",
      "a(ii), b(i), c(iii)"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "ADH increases water permeability of DCT and collecting duct (a-ii); Aldosterone stimulates Na+ and water reabsorption in DCT (b-iii); and ANF inhibits renin release and opposes sodium reabsorption (c-i)."
  },
  {
    q_num: 84,
    question_text: "Angiotensin converting enzyme is secreted by",
    options: ["Juxtaglomerular cells", "Kidney", "Lungs", "The walls of atria"],
    correct_index: 2,
    difficulty: "easy",
    solution: "Angiotensin Converting Enzyme (ACE) is predominantly synthesized and secreted by the capillary endothelium of the lungs."
  },
  {
    q_num: 85,
    question_text: "Choose the incorrect match w.r.t. part of the nephron and the function associated with it",
    options: [
      "Proximal convoluted tubule – Reabsorption of HCO3- and selective secretion of hydrogen ions and ammonia",
      "Ascending limb of loop of Henle – Impermeable to water but allows the transport of electrolytes",
      "Descending limb of loop of Henle – Permeable to water but almost impermeable to electrolytes",
      "Distal convoluted tubule – Reabsorption of HCO3- and selective secretion of Na+ in the absence of aldosterone"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "In the DCT, sodium ions (Na+) are reabsorbed under the influence of aldosterone, not selectively secreted."
  },
  {
    q_num: 86,
    question_text: "What would happen to some patients in whom the formation of uric acid is abnormally enhanced by metabolic defects or its urinary elimination becomes defective?\nA. The patient can develop gouty arthritis.\nB. Uric acid can get deposited in the renal tubules and lead to kidney diseases.\nC. It will cause a condition called uremia and haemodialysis would be required.\nD. It can get deposited in joints and cartilages.\nSelect the correct option.",
    options: ["A only", "A and B only", "A, B and D only", "A, B, C and D"],
    correct_index: 2,
    difficulty: "medium",
    solution: "Hyperuricemia causes urate crystals to deposit in synovial joints causing gout (A, D) and in renal parenchyma/tubules causing kidney stones and nephropathy (B). Uremia (C) refers specifically to excess urea accumulation in renal failure."
  },
  {
    q_num: 87,
    question_text: "Birds also excrete urine as hypertonic as the mammalian urine. Reptiles like snakes cannot form hypertonic urine. Still, these animals can considerably revoke water loss in urine. How?\n(A) This is because their principal nitrogenous waste is uric acid.\n(B) Uric acid does not osmotically hold back any water from reabsorption.\n(C) Their urine is stored in the urinary bladder so urine volume becomes very low.\nSelect the correct option:",
    options: ["Only (A) and (B)", "Only (B) and (C)", "Only (A)", "(A), (B) and (C)"],
    correct_index: 0,
    difficulty: "medium",
    solution: "Uric acid is practically insoluble and precipitates out as a semi-solid paste, requiring minimal water and exerting no osmotic force against water reabsorption (A & B). Snakes do not have a urinary bladder."
  },

  // Page 268: Q88 - Q98
  {
    q_num: 88,
    question_text: "JGA operates a multi-hormonal RAAS. RAAS stimulates the release of",
    options: ["Mineralocorticoids", "Glucocorticoids", "ADH", "Atrial Natriuretic factor"],
    correct_index: 0,
    difficulty: "easy",
    solution: "Angiotensin II in the RAAS pathway stimulates the adrenal cortex to release aldosterone, which is a mineralocorticoid."
  },
  {
    q_num: 89,
    question_text: "Which of the following is not the accessory excretory function of skin in human beings?",
    options: [
      "Sweat is an aqueous fluid with 99.5% water and rest containing NaCl, lactic acid, urea, amino acids and glucose",
      "The principal function of sweat is the evaporative cooling of the body surface",
      "Sebum keeps the skin oily and eliminates some lipids, waxes, sterols, hydrocarbons and fatty acids",
      "Some amount of uric acid is excreted into the surrounding medium by diffusion"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Human skin does not excrete uric acid into the surrounding environment by diffusion."
  },
  {
    q_num: 90,
    question_text: "The cells of renal tubule excrete additional wastes from the blood stream into the filtrate by the process of tubular secretion. Which of the following statements is not true w.r.t. tubular secretion?",
    options: [
      "Plays a key role in the maintenance of ionic and acid-base balance of body fluids",
      "Removal of secreted materials from the blood of peritubular capillaries into the nephric filtrate",
      "It takes place by diffusion only",
      "Removal of ammonia, urea, uric acid, creatinine, takes place by tubular secretion"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Tubular secretion involves active transport mechanisms (carrier proteins, pumps) in addition to passive diffusion; it does not occur by diffusion alone."
  },
  {
    q_num: 91,
    question_text: "Urea is produced in the liver by a metabolic cycle called",
    options: ["Krebs cycle", "Ornithine cycle", "Cardiac cycle", "Cori's cycle"],
    correct_index: 1,
    difficulty: "easy",
    solution: "Urea is synthesized in the liver via the ornithine (urea) cycle discovered by Hans Krebs and Kurt Henseleit."
  },
  {
    q_num: 92,
    question_text: "After consuming beer and alcohol there is increase in the rate of urine flow because",
    options: [
      "They inhibit Na+ reabsorption",
      "They inhibit secretion of ADH",
      "They inhibit the action of aldosterone",
      "They inhibit the reabsorption of potassium"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Alcohol suppresses the release of Antidiuretic Hormone (ADH) from the posterior pituitary, preventing facultative water reabsorption and causing diuresis."
  },
  {
    q_num: 93,
    question_text: "Teleosts remove the nitrogenous waste mainly in the form of",
    options: ["Ammonia", "TMAO", "Urea and TMAO", "Uric acid"],
    correct_index: 0,
    difficulty: "easy",
    solution: "Marine and freshwater bony fishes (teleosts) excrete nitrogenous waste primarily as ammonia across the gill epithelia."
  },
  {
    q_num: 94,
    question_text: "Which of the following statements is not true?",
    options: [
      "The primary stimulus for ADH secretion is an increase in the osmolarity of the blood plasma",
      "Guanine contains high concentration of crystals and uric acid",
      "Loop of Henle is mainly responsible for concentration of urine",
      "Aldosterone is produced by the hypothalamus in response to high levels of sodium ions in blood"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Aldosterone is synthesized and secreted by the adrenal cortex (zona glomerulosa), not the hypothalamus, and is triggered by low Na+, high K+, or angiotensin II."
  },
  {
    q_num: 95,
    question_text: "All the following statements about micturition are correct but one is wrong, which one is wrong?",
    options: [
      "Micturition is under the control of parasympathetic nervous system",
      "During this process detrusor muscles of the bladder contract and internal sphincter muscles relax",
      "During micturition external sphincter muscles also relax to void out urine",
      "During micturition the sympathetic nervous system causes relaxation of detrusor muscles and constriction of internal sphincter"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "During micturition, sympathetic activity is inhibited so parasympathetic impulses contract the detrusor and relax the internal sphincter. Sympathetic stimulation functions during filling to retain urine."
  },
  {
    q_num: 96,
    question_text: "During the course of urine formation, glomerular filtrate moves how many times between cortex and medulla?",
    options: ["One time", "Two times", "Three times", "Four times"],
    correct_index: 1,
    difficulty: "hard",
    solution: "The filtrate travels: (1) Cortex to Medulla (descending limb) and back Medulla to Cortex (ascending limb); (2) Cortex to Medulla (collecting duct). This constitutes two round movements across the boundary."
  },
  {
    q_num: 97,
    question_text: "Select the incorrect statement w.r.t. shark and coelacanth.",
    options: [
      "They reduce osmoregulatory challenges by accumulation of urea and osmolytes",
      "They are slightly hyperosmotic to sea water due to retention of urea and TMAO",
      "They maintain far higher concentration of inorganic ions in the body fluid",
      "Urea and TMAO act as osmolytes"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Marine elasmobranchs maintain lower internal concentrations of inorganic ions than seawater; their hypertonicity is achieved by accumulating organic osmolytes (urea and TMAO)."
  },
  {
    q_num: 98,
    question_text: "In which part of nephron obligatory reabsorption of water takes place?",
    options: ["PCT", "Collecting duct", "Ascending limb of loop of Henle", "DCT"],
    correct_index: 0,
    difficulty: "easy",
    solution: "Obligatory reabsorption of water takes place in the PCT (and descending limb of loop of Henle), where water automatically follows active solute reabsorption."
  },

  // Page 269: Q99 - Q109
  {
    q_num: 99,
    question_text: "Which of the following is released in response to an increase in blood volume and pressure?",
    options: ["Renin", "Angiotensin II", "Aldosterone", "Atrial natriuretic factor"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Atrial Natriuretic Factor (ANF) is released by the atrial walls of the heart in response to elevated blood volume and atrial stretch."
  },
  {
    q_num: 100,
    question_text: "Ionocytes in the gill membrane of fresh water fishes are meant for",
    options: [
      "Actively eliminating excess of monovalent ions",
      "Actively import Na+ and Cl- from surrounding water",
      "Passively absorb Na+ and Cl- from surrounding water",
      "Passively eliminate Na+ and Cl- ions"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Freshwater teleosts actively transport Na+ and Cl- into their blood across gill ionocytes (chloride cells) to counteract salt loss."
  },
  {
    q_num: 101,
    question_text: "Which of the following labelled parts of nephron called the diluting segment?",
    image_url: "/uploads/excretory_products/q101_diagram.png",
    options: ["A", "B", "C", "D"],
    correct_index: 1,
    difficulty: "medium",
    solution: "The ascending limb of loop of Henle (B) actively reabsorbs NaCl while being impermeable to water, diluting the luminal fluid; hence it is called the diluting segment."
  },
  {
    q_num: 102,
    question_text: "Urea is produced in the liver by ornithine cycle, completed into different steps like:\na. Formation of citrulline.\nb. Formation of arginosuccinic acid.\nc. Formation of carbamoyl phosphate.\nd. Hydrolysis of arginine by the enzyme arginase.\nChoose the option which represents correct sequence of the urea synthesis",
    options: ["a, b, c, d", "c, a, b, d", "b, c, a, d", "d, c, a, b"],
    correct_index: 1,
    difficulty: "medium",
    solution: "The correct sequence is: (c) Carbamoyl phosphate synthesis -> (a) Citrulline formation -> (b) Argininosuccinate synthesis -> (d) Arginine hydrolysis to urea and ornithine."
  },
  {
    q_num: 103,
    question_text: "Osmoconformers are those animals which\n(a) Change the osmolarity of their body fluids according to the osmolarity of the medium in which they live\n(b) Do not actively control the concentration of their body fluids\n(c) Include all marine invertebrates and some freshwater invertebrates and Hagfish\nChoose the correct option.",
    options: ["(a) and (b) only", "(b) and (c) only", "(a) and (c) only", "(a), (b) and (c)"],
    correct_index: 3,
    difficulty: "easy",
    solution: "All three statements correctly describe osmoconformers."
  },
  {
    q_num: 104,
    question_text: "About 125 mL of glomerular filtrate is formed by the kidneys per minute. Out of this, approximately how much volume goes out as urine?",
    options: ["0.1 - 0.2 mL", "~ 1 mL", "~ 12 mL", "~ 120 mL"],
    correct_index: 1,
    difficulty: "easy",
    solution: "Nearly 99% of the 125 mL/min filtrate is reabsorbed by the renal tubules, leaving approximately 1.0 to 1.25 mL/min (~1.5 L/day) as excreted urine."
  },
  {
    q_num: 105,
    question_text: "Cells of PCT are provided with microvilli for the reabsorption of most of the contents of glomerular filtrate. Which of these contents is not at all reabsorbed in PCT?",
    options: ["Amino acids", "Vitamin C", "Urea", "Creatinine"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Creatinine is a waste product of muscle metabolism that is filtered and not reabsorbed by renal tubules."
  },
  {
    q_num: 106,
    question_text: "Animals which retain urea in their body fluids to prevent the loss of water from the body are",
    options: ["Elasmobranch fishes", "Teleosts", "Tadpoles", "Adult amphibians"],
    correct_index: 0,
    difficulty: "easy",
    solution: "Cartilaginous fishes (elasmobranchs) retain high blood concentrations of urea and TMAO to maintain internal osmolarity matching seawater."
  },
  {
    q_num: 107,
    question_text: "Extra purine found in the food of the mammals is excreted out in the form of",
    options: ["Citrulline", "Fumaric acid", "Glutamic acid", "Uric acid"],
    correct_index: 3,
    difficulty: "easy",
    solution: "In humans and other primates/mammals, excess dietary and endogenous purines (adenine and guanine) are degraded into uric acid."
  },
  {
    q_num: 108,
    question_text: "Malfunctioning of the kidneys can lead to accumulation of urea in blood, a condition called",
    options: ["Dysuria", "Renal calculi", "Anuria", "Uremia"],
    correct_index: 3,
    difficulty: "easy",
    solution: "Accumulation of toxic levels of urea in the blood caused by renal failure is termed uremia."
  },
  {
    q_num: 109,
    question_text: "Choose the incorrect statement",
    options: [
      "Angiotensin II is involved in enhancing reabsorption of Na+ in DCT of the nephron.",
      "Loop of Henle is largely responsible for concentrating urine",
      "Ionocytes are main structures for the elimination of monovalent ions from the body fluids of an osmoregulatory marine fish",
      "Arginase enzyme catalyzes the step involving conversion of ornithine to urea"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Arginase catalyzes the hydrolysis of arginine to ornithine and urea (not ornithine to urea)."
  },

  // Page 270: Q110 - Q119
  {
    q_num: 110,
    question_text: "Which of the following parts of the nephric tubule is incorrectly matched regarding osmotic concentration of filtrate in it?",
    options: [
      "Proximal convoluted tubule – Isotonic to blood plasma",
      "Bowman's capsule – Hypotonic to blood plasma",
      "Thick cortical part of ascending limb of loop of Henle – Hypotonic to blood plasma",
      "Descending limb of loop of Henle – Hypertonic to blood plasma"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Glomerular filtrate entering Bowman's capsule is an ultrafiltrate of plasma and is isotonic to blood plasma, not hypotonic."
  },
  {
    q_num: 111,
    question_text: "Podocytes are cells of",
    options: [
      "Outer wall of Bowman's capsule",
      "Inner wall of Bowman's capsule",
      "Endothelial lining of glomerulus",
      "Cortex part of kidneys"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Podocytes are specialized visceral epithelial cells forming the inner wall of Bowman's capsule."
  },
  {
    q_num: 112,
    question_text: "What will happen if stretch receptors of urinary bladder stop functioning?",
    options: [
      "Urine formation in nephrons decreases",
      "Urinary bladder stops collecting urine",
      "Micturition will continue",
      "Micturition will stop"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "The micturition reflex is initiated by sensory signals from bladder stretch receptors; if they fail to function, the reflex is lost and normal micturition stops."
  },
  {
    q_num: 113,
    question_text: "Malfunctioning of kidneys can lead to accumulation of urea in blood, a condition called __a__. In such patient urea can be removed by a process called __b__. During the process of __c__, the blood drained from a convenient artery is pumped into a dialysing unit called __d__.\nIn the given paragraph, which of the following two blanks correctly fill with same word?",
    options: ["a and b", "b and c", "c and d", "b and d"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Both blank b and blank c refer to 'haemodialysis' ('process called haemodialysis... During the process of haemodialysis...')."
  },
  {
    q_num: 114,
    question_text: "ADH, apart from facilitating water reabsorption from DCT and collecting tubules, also",
    options: [
      "Increases the blood pressure",
      "Promotes diuresis",
      "Stimulates dilation of arterioles",
      "Stops RAAS"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "ADH (vasopressin) exerts a vasoconstrictor effect on systemic arterioles, increasing peripheral resistance and raising blood pressure."
  },
  {
    q_num: 115,
    question_text: "If an osmoconformer is placed in sea water",
    options: [
      "It will develop ionocytes to actively absorb salts from outside",
      "It will develop thick body cover to prevent influx of excess of water",
      "It will start passing dilute urine",
      "It will change osmolarity of its body fluids"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "An osmoconformer adjusts and conforms the internal osmolarity of its body fluids to match that of the external seawater."
  },
  {
    q_num: 116,
    question_text: "Identify the organs/chemicals labelled as A, B and C in the given flow chart and select the correct option.",
    image_url: "/uploads/excretory_products/q116_flowchart.png",
    options: [
      "A: Kidney, B: Liver, C: Aldosterone",
      "A: Kidney, B: Prorenin, C: Aldosterone",
      "A: Liver, B: Prorenin, C: ANF",
      "A: Liver, B: Kidney, C: Aldosterone"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "In RAAS: Angiotensinogen is secreted by the Liver (A); Renin is secreted by the Kidney (B); and Angiotensin II stimulates the adrenal cortex to secrete Aldosterone (C)."
  },
  {
    q_num: 117,
    question_text: "Consider the following statements and choose the correct answer from the options given below:\nStatement A: Angiotensin II reduces GFR.\nStatement B: Atrial natriuretic factor increases blood pressure by stimulating Na+ reabsorption.",
    options: [
      "Only statement A is correct",
      "Only statement B is correct",
      "Both statements A and B are correct",
      "Both statements A and B are incorrect"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Angiotensin II elevates GFR by constricting efferent arterioles; ANF lowers blood pressure by stimulating natriuresis (inhibiting Na+ reabsorption). Both statements are incorrect."
  },
  {
    q_num: 118,
    question_text: "The position of kidney in human body is",
    options: ["Lateral", "Ventral", "Retroperitoneal", "Ventral to liver"],
    correct_index: 2,
    difficulty: "easy",
    solution: "The kidneys are retroperitoneal, situated on the posterior abdominal wall behind the parietal peritoneum."
  },
  {
    q_num: 119,
    question_text: "Given below are four statements A-D, each with a blank. Select the option which correctly fills up blanks in any two statements.\nA. The narrower diameter of efferent renal arteriole compared to the afferent arteriole contributes to generation of (i).\nB. In severe dehydration, the level of ADH in blood is (ii).\nC. The functional unit of kidney is (iii).\nD. Human urine is normally (iv) to blood plasma.",
    options: [
      "A - Glomerular hydrostatic pressure, C - Nephron",
      "B - Low, D - Hypotonic",
      "A - Renal portal system, C - Glomerulus",
      "B - Normal, D - Isotonic"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "A is Glomerular hydrostatic pressure, and C is Nephron. Option (1) correctly fills both."
  },

  // Page 271: Q120 - Q123
  {
    q_num: 120,
    question_text: "A comparison of the volume of the filtrate formed per day with the amount of urine released suggests that nearly (i) of the filtrate has to be reabsorbed from the renal tubules.\nAn increase in blood flow to the atria of the heart can cause the release of (ii).\nA fall in GFR can activate the JG cells to release (iii) which can increase the glomerular blood flow and thereby the GFR back to normal.",
    options: [
      "A (i) – 99%, (ii) – Blood colloidal osmotic pressure, (iii) – Renin",
      "A (i) – 90%, (ii) – Renin, (iii) – ANF",
      "A (i) – 99%, (ii) – Glomerular hydrostatic pressure, (iii) – ANF",
      "A (i) – 99%, (ii) – ANF (Atrial Natriuretic Factor), (iii) – Renin"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "(i) is 99% of filtrate reabsorbed; (ii) is ANF released by atrial stretch; (iii) is Renin released by JG cells."
  },
  {
    q_num: 121,
    question_text: "Following figure represents reabsorption and secretion of major substances at different parts of the nephron. Certain substances have been labelled as p, q, r, s. Select from the options the correct set of these substances.",
    image_url: "/uploads/excretory_products/q121_diagram.png",
    options: [
      "p: NH3, q: NaCl, r: H+, s: Urea",
      "p: H2O, q: NaCl, r: H+, s: Urea",
      "p: H+, q: NaCl, r: Water, s: NaCl",
      "p: NH3, q: Water, r: NaCl, s: HCO3-"
    ],
    correct_index: 1,
    difficulty: "hard",
    solution: "Substance p leaving the descending limb is H2O; substance q leaving the ascending limb is NaCl; r secreted is H+; and s diffusing into medullary interstitium is Urea."
  },
  {
    q_num: 122,
    question_text: "The kidneys have built in mechanism for the regulation of glomerular filtration rate. One such efficient mechanism is carried out by juxtaglomerular apparatus (JGA). JGA is a special sensitive region formed by\nA. Afferent arteriole before it divides to form glomerulus.\nB. Cellular modifications in distal convoluted tubule where it is in contact with afferent arteriole.\nC. Macula densa cells.\nD. Glomerulus.",
    options: ["A only", "A and B", "A, B and C", "A, B, C and D"],
    correct_index: 2,
    difficulty: "medium",
    solution: "JGA comprises granular juxtaglomerular cells in the afferent arteriole (A), specialized columnar macula densa cells of the DCT (B & C), and extraglomerular mesangial cells. It does not include the capillary glomerulus itself."
  },
  {
    q_num: 123,
    question_text: "Study the diagram given below which represents reabsorption and secretion of major substances at different parts of the nephron. Which of the following labelled parts plays a role in the maintenance of pH and ionic balance of the blood by the selective secretion of H+ and K+ ions?",
    image_url: "/uploads/excretory_products/q123_diagram.png",
    options: ["P and Q", "Q and R", "P and R", "P and S"],
    correct_index: 2,
    difficulty: "medium",
    solution: "Both the Proximal Convoluted Tubule (P) and Distal Convoluted Tubule (R) selectively secrete H+ and K+ ions into the filtrate to maintain blood pH and ionic equilibrium."
  },

  // Page 276: Q155 - Q160
  {
    q_num: 155,
    question_text: "Select the option not applicable to nephrons.",
    options: [
      "Each kidney has nearly one million complex tubular nephrons",
      "Henle's loop and vasa recta play important role in counter current mechanism",
      "Reabsorption of water in Henle's loop is minimum",
      "During urine formation, the tubular cells secrete substances like HCO3-, glucose, Cl- into filtrate"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Tubular cells secrete H+, K+, and ammonia into the filtrate, while glucose, HCO3-, and Cl- are reabsorbed into blood, not secreted."
  },
  {
    q_num: 156,
    question_text: "Choose the incorrect statement",
    options: [
      "Osmoreceptors are activated by changes in blood volume, body fluid volume and ionic concentration",
      "A fall in GFR activate JG cells to release rennin enzyme",
      "ANF can cause vasodilation so can decrease blood pressure",
      "Aldosterone causes reabsorption of Na+ and water from distal parts of the tubule"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "JG cells secrete RENIN (with one 'n'), which is a hormone-enzyme of the RAAS pathway. Rennin (with double 'n') is a milk-coagulating enzyme found in the gastric juice of infants."
  },
  {
    q_num: 157,
    question_text: "Given below are four statements (A-D) each with one or two blanks. Select the option which correctly fills up the blank.\nA. (i) is a condition of accumulation of urea in blood which is highly harmful and may lead to kidney failure.\nB. Ultimate method in correction of acute renal failures is (ii).\nC. PCT is the site for (iii) water reabsorption where as DCT is the site for (iv) water reabsorption.\nD. The epithelial cells of Bowman's capsule called (v) are arranged in an intricate manner so as to leave some minute spaces called (vi).",
    options: [
      "A. (i) Uremia, B. (ii) Haemodialysis, C. (iii) Conditional, (iv) Facultative, D. (v) Podocytes, (vi) Filtration slits",
      "C. (iii) Facultative, (iv) Obligatory, D. (v) Podocytes, (vi) Filtration slits",
      "B. (ii) Kidney transplantation, C. (iii) Obligatory, (iv) Facultative, D. (v) Podocytes, (vi) Filtration slits",
      "A. (i) Uremia, C. (iii) Obligatory, (iv) Facultative, D. (v) Podocytes, (vi) Filtration slits"
    ],
    correct_index: 2,
    difficulty: "hard",
    solution: "Ultimate correction of acute renal failure is kidney transplantation (B); PCT is obligatory and DCT is facultative water reabsorption (C); Podocytes leave filtration slits (D)."
  },
  {
    q_num: 158,
    question_text: "Select the incorrect match with respect to the animals and the types of excretory waste secreted by them.",
    options: [
      "Ammonia – Hydra, Tapeworm, Rohu",
      "Urea – Shark, Frog, earthworm",
      "Uric acid – Cockroach, crocodile, amphibian tadpole",
      "Guanine – Penguins"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Amphibian tadpoles are ammonotelic (excrete ammonia), not uricotelic."
  },
  {
    q_num: 159,
    question_text: "Following is a tabular representation of differences between juxtamedullary and cortical nephron. Choose the correct difference with humans.",
    options: [
      "Size: Juxtamedullary smaller, Cortical larger",
      "Loop of Henle: Juxtamedullary longer, Cortical short",
      "Presence: Juxtamedullary 85% of total nephrons, Cortical 15% of total nephrons",
      "Function: Juxtamedullary controls plasma volume when water supply is normal, Cortical when short"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Juxtamedullary nephrons have long loops of Henle extending deep into the inner medulla, whereas cortical nephrons have short loops extending only slightly into the outer medulla."
  },
  {
    q_num: 160,
    question_text: "In the retroperitoneal arrangement of kidney",
    options: [
      "Peritoneum cover is present only on the ventral side",
      "Peritoneum cover is present only on the dorsal side",
      "Peritoneum cover is present on both dorsal and ventral side",
      "Peritoneum cover is neither on the dorsal side nor on the ventral side"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Retroperitoneal organs are situated behind the parietal peritoneum against the dorsal wall, so the peritoneal membrane covers only their ventral surface."
  },

  // Page 277: Q161 - Q162
  {
    q_num: 161,
    question_text: "In response to decrease in blood volume and blood pressure in the afferent arteriole of glomerulus, which of the following will not help in raising the glomerular blood pressure and maintaining the GFR?",
    options: [
      "The constriction of efferent arteriole",
      "Release of aldosterone hormone which causes the distal convoluted tubule to reabsorb more Na+ and water",
      "Decreased resistance in afferent arterioles",
      "Decreased secretion of ADH"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Decreased secretion of ADH promotes water loss (diuresis) and lowers blood volume and pressure, which would further impair GFR recovery."
  },
  {
    q_num: 162,
    question_text: "Byproducts of steroid hormones are removed by ___ while elimination of hydrocarbons is done by ___",
    options: [
      "Kidneys, lungs",
      "Liver, sebaceous glands",
      "Liver, sweat glands",
      "Saliva, Kidneys"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "According to NCERT, degraded steroid hormones are eliminated in bile by the liver, while hydrocarbons and sterols are eliminated in sebum by sebaceous glands."
  }
];

export const SECTION_B_AR_QUESTIONS = [
  {
    q_num: 1,
    assertion_text: "We generally excrete more urine in winter than in summer.",
    reason_text: "In winters loss of water from body surface through sweat is reduced.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "easy",
    solution: "Both Assertion and Reason are true and Reason correctly explains the Assertion: in cold temperatures, cutaneous vasoconstriction reduces perspiration, conserving water so excess fluid is excreted by the kidneys, increasing urine output."
  },
  {
    q_num: 2,
    assertion_text: "Consumption of alcohol may induce polyuria in a normal person.",
    reason_text: "Alcohol increases ultrafiltration from the Bowman's capsule.",
    correct_index: 2, // (3) Assertion is true but Reason is false
    difficulty: "medium",
    solution: "Assertion is true because alcohol consumption leads to excessive urine excretion (polyuria). Reason is false because alcohol induces diuresis by inhibiting ADH secretion from the posterior pituitary, not by increasing ultrafiltration in Bowman's capsule."
  },
  {
    q_num: 3,
    assertion_text: "RAAS mechanism is involved in Na+ regulation of the body.",
    reason_text: "RAAS mechanism becomes active in conditions when less Na+ in blood plasma.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. Low blood sodium (hyponatremia) or low renal arterial pressure stimulates juxtaglomerular cells to secrete renin, activating the RAAS cascade to restore sodium reabsorption."
  },
  {
    q_num: 4,
    assertion_text: "PCT is the major site of obligatory water reabsorption.",
    reason_text: "PCT reabsorbs maximum amount of water passively.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true and Reason correctly explains the Assertion. Around 70-80% of water is reabsorbed obligatorily in the PCT down an osmotic gradient created by active solute reabsorption."
  },
  {
    q_num: 5,
    assertion_text: "In some patients, if the formation of uric acid is abnormally enhanced by metabolic defects, they consequently develop gout and kidney failure.",
    reason_text: "Uric acid being insoluble in water gets deposited in soft tissues including joints, cartilages and kidneys.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true and Reason correctly explains the Assertion: insoluble uric acid precipitates out as monosodium urate crystals in synovial joints causing gouty arthritis and in renal tubules causing nephrolithiasis and kidney damage."
  },
  {
    q_num: 6,
    assertion_text: "Beer and alcohol are diuretic substances.",
    reason_text: "They inhibit the release of ADH from the posterior lobe of pituitary.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "easy",
    solution: "Both Assertion and Reason are true and Reason correctly explains the Assertion: alcohol suppresses the neurohypophyseal secretion of ADH, diminishing water reabsorption in the collecting ducts and triggering diuresis."
  },
  {
    q_num: 7,
    assertion_text: "In haemodialysis, blood from radial artery is connected into dialysing unit after adding heparin.",
    reason_text: "Dialysing unit contains a coiled cellophane tube surrounded by a fluid having the same composition as that of plasma except nitrogenous wastes.",
    correct_index: 1, // (2) Both are true but Reason is not the correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true NCERT facts. However, heparin is added specifically as an anticoagulant to prevent clotting inside the artificial kidney machine, which is not causally explained by the fluid composition of the cellophane unit."
  },
  {
    q_num: 8,
    assertion_text: "Juxtamedullary nephrons are associated with counter current mechanism.",
    reason_text: "Peritubular capillaries are not present around cortical nephrons.",
    correct_index: 2, // (3) Assertion is true but Reason is false
    difficulty: "medium",
    solution: "Assertion is true because juxtamedullary nephrons have long loops of Henle and vasa recta that drive the counter-current multiplier and exchanger. Reason is false because cortical nephrons are densely surrounded by peritubular capillaries."
  },
  {
    q_num: 9,
    assertion_text: "Atrial wall of heart secretes an important peptide hormone called Atrial Natriuretic Factor (ANF) which increases blood pressure.",
    reason_text: "It causes constriction of blood vessels which raises the blood pressure.",
    correct_index: 3, // (4) Both Assertion and Reason are false statements
    difficulty: "easy",
    solution: "Both Assertion and Reason are false statements. ANF is released in response to high blood pressure and acts to DECREASE blood pressure by causing vasodilation and natriuresis, opposing vasoconstriction."
  },
  {
    q_num: 10,
    assertion_text: "In liver, toxic ammonia is converted into much less toxic urea which is excreted in urine.",
    reason_text: "Urea is produced in the liver by a metabolic cycle called as ornithine cycle.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "easy",
    solution: "Both Assertion and Reason are true and Reason correctly explains the Assertion: hepatic cells detoxify highly toxic ammonia into less toxic urea via the ornithine (urea) cycle."
  },
  {
    q_num: 11,
    assertion_text: "Chick embryo removes the nitrogenous waste in the form of uric acid, which precipitates out of the solution and can be stored in the shell as solid waste.",
    reason_text: "Highest concentration of urea is found in renal vein.",
    correct_index: 2, // (3) Assertion is true but Reason is false
    difficulty: "medium",
    solution: "Assertion is true because cleidoic eggs of birds store nitrogenous waste as non-toxic insoluble uric acid inside the allantoic sac. Reason is false because highest urea concentration is in the hepatic vein (site of synthesis), while the renal vein contains blood with the lowest urea concentration after renal clearance."
  },
  {
    q_num: 12,
    assertion_text: "A number of drugs as well as alcohol suppress ADH secretion, resulting in increased urinary flow.",
    reason_text: "After deprivation of water, the blood becomes hypertonic and the osmoreceptors stimulate ADH secretion.",
    correct_index: 1, // (2) Both are true but Reason is not correct explanation
    difficulty: "medium",
    solution: "Both statements are true physiological facts. However, osmoreceptor-mediated stimulation of ADH during water deprivation does not explain why pharmacological agents like alcohol suppress ADH secretion."
  }
];

const AR_STANDARD_OPTIONS = [
  {
    key: "A",
    text: "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
    media: [],
    image_url: ""
  },
  {
    key: "B",
    text: "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
    media: [],
    image_url: ""
  },
  {
    key: "C",
    text: "Assertion is true statement but Reason is false",
    media: [],
    image_url: ""
  },
  {
    key: "D",
    text: "Both Assertion and Reason are false statements",
    media: [],
    image_url: ""
  }
];

async function seed() {
  console.log('--- Starting Zoology "Excretory Products and their Elimination" Seeding Script ---');
  let client;
  try {
    client = await connectWithRetry();

    // 1. Get Zoology subject (ID: 2)
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'zoology' LIMIT 1");
    if (subRes.rows.length === 0) {
      throw new Error('Zoology subject not found in subjects table');
    }
    const subjectId = subRes.rows[0].id;
    const subjectName = subRes.rows[0].name;
    console.log(`Found subject: ${subjectName} (ID: ${subjectId})`);

    // 2. Get or create chapter "Excretory Products and their Elimination"
    const chapterName = 'Excretory Products and their Elimination';
    let chapterId;
    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = LOWER(TRIM($2)) LIMIT 1",
      [subjectId, chapterName]
    );

    if (chapRes.rows.length === 0) {
      const maxPos = await client.query("SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM chapters WHERE subject_id = $1", [subjectId]);
      const nextPos = maxPos.rows[0].next_pos;
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position) VALUES ($1, $2, $3) RETURNING id",
        [chapterName, subjectId, nextPos]
      );
      chapterId = insChap.rows[0].id;
      console.log(`Created new chapter: "${chapterName}" with ID: ${chapterId} at position ${nextPos}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter: "${chapRes.rows[0].name}" with ID: ${chapterId}`);
    }

    // 3. Clean up any previous questions for this chapter
    const delRes = await client.query(
      `DELETE FROM question_bank WHERE (subject_id = $1 OR category = 'Zoology') AND (chapter_id = $2 OR LOWER(chapter) = LOWER($3))`,
      [subjectId, chapterId, chapterName]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous question(s) for "${chapterName}".`);

    // 4. Insert Section A: 131 Objective Type (MCQ) Questions
    console.log(`\nInserting ${SECTION_A_QUESTIONS.length} Objective (Section A) questions...`);
    let secAInserted = 0;
    for (const q of SECTION_A_QUESTIONS) {
      const optionsObjects = q.options.map((optText, idx) => ({
        key: String.fromCharCode(65 + idx),
        text: optText,
        media: [],
        image_url: ""
      }));

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter, status
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        ) RETURNING id
      `;

      const values = [
        'Zoology',
        'mcq',
        q.question_text,
        JSON.stringify(optionsObjects),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Zoology',
        'Excretory Products and their Elimination',
        chapterName,
        'available'
      ];

      const res = await client.query(sql, values);
      secAInserted++;
      if (secAInserted % 20 === 0 || secAInserted === SECTION_A_QUESTIONS.length) {
        console.log(`  [Section A] Inserted ${secAInserted}/${SECTION_A_QUESTIONS.length} (Latest ID: ${res.rows[0].id})`);
      }
    }

    // 5. Insert Section B: 12 Assertion-Reason Questions into AR Section
    console.log(`\nInserting ${SECTION_B_AR_QUESTIONS.length} Assertion-Reason (Section B) questions...`);
    let secBInserted = 0;
    for (const q of SECTION_B_AR_QUESTIONS) {
      const questionText = `Assertion (A): ${q.assertion_text}\nReason (R): ${q.reason_text}`;

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, assertion_text, reason_text, subject, topic, chapter, status
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18
        ) RETURNING id
      `;

      const values = [
        'Zoology',
        'assertion_reason',
        questionText,
        JSON.stringify(AR_STANDARD_OPTIONS),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        '',
        q.assertion_text,
        q.reason_text,
        'Zoology',
        'Assertion and Reason', // Explicit AR section in this chapter
        chapterName,
        'available'
      ];

      const res = await client.query(sql, values);
      secBInserted++;
      console.log(`  [Section B - AR] Inserted AR Q${q.q_num}/${SECTION_B_AR_QUESTIONS.length} (DB ID: ${res.rows[0].id})`);
    }

    const totalInserted = secAInserted + secBInserted;
    console.log(`\n Successfully seeded ${totalInserted} questions (${secAInserted} MCQs + ${secBInserted} ARs) into Question Bank for Zoology -> "${chapterName}".`);

    // 6. Sync to live API if reachable
    try {
      console.log('\n--- Checking Live edvedum API sync ---');
      const loginRes = await fetch(`${LIVE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
        signal: AbortSignal.timeout(5000)
      });

      if (loginRes.ok) {
        const token = (await loginRes.json()).token;
        const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const subs = (await subsRes.json()).subjects || [];
        const liveZoology = subs.find(s => s.name.toLowerCase() === 'zoology');
        if (liveZoology) {
          const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveZoology.id}/chapters`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const chaps = (await chapsRes.json()).chapters || [];
          let liveChap = chaps.find(c => c.name.toLowerCase() === chapterName.toLowerCase());
          if (!liveChap) {
            console.log(`Creating chapter '${chapterName}' on live edvedum...`);
            const createRes = await fetch(`${LIVE_API}/admin/subjects/${liveZoology.id}/chapters`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ name: chapterName, position: 0 })
            });
            const cData = await createRes.json();
            liveChap = cData.chapter || cData;
          }
          console.log(`Live edvedum chapter ready: ID ${liveChap.id}`);
        }
      }
    } catch (syncErr) {
      console.warn('Live API sync note (non-critical):', syncErr.message);
    }

  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
    console.log('Database pool connection closed.');
  }
}

seed();

