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

async function queryWithRetry(sql, params = [], maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await pool.query(sql, params);
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB transient error: ${err.message}] Retrying query in 1.5s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 1500));
      } else {
        throw err;
      }
    }
  }
}

// 79 Section A (MCQ) Questions + 15 Section B (Assertion-Reason) Questions = 94 Questions Total
export const SECTION_A_QUESTIONS = [
  {
    q_num: 1,
    question_text: "Find the incorrect match from the following",
    options: [
      "Glycolysis – Cytosol",
      "β-oxidation of fatty acids – Mitochondrial matrix",
      "ETC – Inner mitochondrial membrane",
      "TCA cycle – Ribosome"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "TCA cycle occurs in the mitochondrial matrix of eukaryotic cells (and cytoplasm of prokaryotes), not in ribosomes. Ribosomes are the cellular sites for protein synthesis."
  },
  {
    q_num: 2,
    question_text: "The generic ions that are required in the first step and last step of glycolytic pathway are A and B and these are activator molecule of enzyme C. A, B and C respectively represents",
    options: [
      "Mn2+, K+ and Enolase",
      "Mg2+, K+ and Pyruvate kinase",
      "Ca2+, Mg2+ and Kinase",
      "Mn2+, Mg2+ and Mutase"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "In glycolysis, the first step catalyzed by hexokinase requires Mg2+ as an essential cofactor, and the last step catalyzed by pyruvate kinase requires both Mg2+ and K+ for catalytic activation. Therefore, A is Mg2+, B is K+, and C is Pyruvate kinase."
  },
  {
    q_num: 3,
    question_text: "Find the correct statement from the following",
    options: [
      "Alcoholic fermentation of pyruvate requires only alcohol dehydrogenase",
      "Lactobacillus lactis is a heterofermentative lactic acid bacteria",
      "Less than seven percent of the energy in glucose is released during fermentation",
      "CO2 is released during lactic acid fermentation"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "According to NCERT, less than seven per cent of the energy in glucose is released during fermentation and not all of it is trapped as high energy bonds of ATP."
  },
  {
    q_num: 4,
    question_text: "Read the statement carefully:\nA. Three NADH + H+ and one FADH2 molecules are generated during two turns of TCA cycle.\nB. Two molecules of CO2 are released per molecule of acetyl CoA oxidized in TCA cycle.\nC. The continued oxidation of acetyl CoA via the TCA cycle requires the continued replenishment of OAA.\nD. Krebs' cycle is an amphibolic pathway.\nWhich of the given statements are correct?",
    options: [
      "All are correct except A",
      "A, B and D are correct",
      "A and B are incorrect",
      "All A, B, C and D are correct"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Statement A is incorrect because in two turns of the TCA cycle (from one glucose molecule), 6 NADH + H+ and 2 FADH2 are generated (3 NADH + H+ and 1 FADH2 are produced per single turn). Statements B, C, and D are factually correct."
  },
  {
    q_num: 5,
    question_text: "Match the column correctly:\nColumn-I\nA. Acetyl CoA\nB. Succinyl CoA\nC. Oxaloacetic acid\nD. α-ketoglutaric acid\nColumn-II\n(i) Precursor for amino acid synthesis\n(ii) Raw material for alkaloids, pyrimidines\n(iii) Raw material for cytochrome, chlorophyll\n(iv) Raw materials for carotenoids and gibberellins",
    options: [
      "A(ii), B(i), C(iii), D(iv)",
      "A(i), B(iii), C(iv), D(ii)",
      "A(iv), B(iii), C(ii), D(i)",
      "A(iii), B(ii), C(iv), D(i)"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Acetyl CoA serves as raw material for synthesis of carotenoids, terpenes and gibberellins; Succinyl CoA is used in synthesizing porphyrins (cytochrome, chlorophyll); Oxaloacetic acid acts as precursor for pyrimidines and alkaloids; and α-ketoglutaric acid is the raw material for amino acid synthesis."
  },
  {
    q_num: 6,
    question_text: "How many decarboxylation reactions take place in aerobic respiration?",
    options: ["3", "2", "1", "0"],
    correct_index: 0,
    difficulty: "medium",
    solution: "Per molecule of pyruvic acid entering aerobic pathway, 3 decarboxylation reactions occur: 1 in the link reaction (pyruvate to acetyl-CoA) and 2 in the Krebs cycle (isocitrate to α-ketoglutarate, and α-ketoglutarate to succinyl-CoA)."
  },
  {
    q_num: 7,
    question_text: "In ETS, cytochrome-c oxidase complex contains",
    options: [
      "Cytochrome-a",
      "Cytochrome-bc1",
      "Two iron centres",
      "Cytochrome-c"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Complex IV (cytochrome-c oxidase) contains cytochromes a and a3, and two copper centers."
  },
  {
    q_num: 8,
    question_text: "Sum total of substrate level phosphorylation during one EMP pathway and one TCA cycle is",
    options: ["6", "3", "4", "2"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Net substrate level phosphorylation during one EMP pathway is 2 ATP, and one turn of the TCA cycle produces 1 GTP/ATP by substrate level phosphorylation. Total sum = 2 + 1 = 3."
  },
  {
    q_num: 9,
    question_text: "In aerobic bacteria Krebs' cycle occurs in",
    options: [
      "Cytoplasm",
      "Mesosome",
      "Plasma membrane",
      "Both (2) & (3)"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Prokaryotes (bacteria) lack mitochondria; hence, all enzymes of the Krebs cycle are located in the cytoplasm."
  },
  {
    q_num: 10,
    question_text: "Read the statements carefully:\nA. Glycolysis is present in both aerobic and anaerobic types of respiration.\nB. Sucrose cannot enter directly in glycolytic pathway.\nC. Two types of hexoses are present in the glycolytic pathway.\nWhich of the above statements are correct?",
    options: [
      "A and B",
      "C only",
      "All A, B and C",
      "Only A"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "All three statements are correct: glycolysis is universal to both aerobic and anaerobic respiration; sucrose is first converted to glucose and fructose by invertase before entering; and two hexoses (glucose and fructose) participate in the pathway."
  },
  {
    q_num: 11,
    question_text: "The respiratory quotient of organic acid, protein and alcoholic fermentation are respectively",
    options: [
      "> 1, = 1 and 1",
      "> 1, < 1 and < 1",
      "More than one, less than one, and infinite",
      "< 1, > 1 and = 1"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Respiratory quotient (RQ) of organic acids is more than one (> 1), of proteins is less than one (~0.9), and of alcoholic fermentation is infinite (since CO2 is released without O2 consumption: 2/0 = ∞)."
  },
  {
    q_num: 12,
    question_text: "Choose the correct sequence of electron carriers in cellular respiration.",
    options: [
      "FMN, FeS, UQ, cyt b, cyt c1, cyt a-a3",
      "FMN, FeS, cyt c, UQ, cyt b, cyt a-a3",
      "FAD, UQ, cyt b, cyt c, FMN, cyt a-a3",
      "FAD, FeS, UQ, cyt a-a3, cyt b, cyt c"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "In the mitochondrial electron transport chain: electrons from NADH pass through Complex I (FMN -> FeS) to Ubiquinone (UQ), then Complex III (cyt b -> cyt c1), to cyt c, and finally Complex IV (cyt a-a3) to oxygen."
  },
  {
    q_num: 13,
    question_text: "The amount of energy liberated when one molecule of ATP is disintegrated is",
    options: ["3 kcal", "8.15 kcal", "2.5 kcal", "80 kcal"],
    correct_index: 1,
    difficulty: "easy",
    solution: "Hydrolysis of terminal phosphate bond of ATP yields approximately 7.3 to 8.15 kcal/mol of energy under physiological intracellular conditions."
  },
  {
    q_num: 14,
    question_text: "From one molecule of pyruvic acid through oxidative phosphorylation only how many ATP will formed only through aerobic respiration?",
    options: ["12", "17", "14", "24"],
    correct_index: 2,
    difficulty: "hard",
    solution: "From one pyruvic acid: link reaction produces 1 NADH (= 3 ATP via ETS). Krebs cycle produces 3 NADH (= 9 ATP via ETS) and 1 FADH2 (= 2 ATP via ETS). Through oxidative phosphorylation only, total = 3 + 9 + 2 = 14 ATP."
  },
  {
    q_num: 15,
    question_text: "In fermentation there is a net gain of only ___ molecules of ATP for a molecule of glucose degraded.",
    options: ["2", "4", "8", "38"],
    correct_index: 0,
    difficulty: "easy",
    solution: "In fermentation, there is a net gain of only 2 molecules of ATP for each molecule of glucose degraded."
  },
  {
    q_num: 16,
    question_text: "How many ATPs are formed with complete oxidation of a glucose molecule in aerobic prokaryotes?",
    options: ["2", "38", "8", "40"],
    correct_index: 1,
    difficulty: "medium",
    solution: "In aerobic prokaryotes, 38 ATP molecules are formed because there is no shuttle loss across mitochondrial membranes."
  },
  {
    q_num: 17,
    question_text: "Which of the following enzyme is called \"Pacemaker enzyme\" of EMP Pathway?",
    options: [
      "Hexokinase",
      "Phosphohexoisomerase",
      "Phosphofructokinase",
      "Aldolase"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Phosphofructokinase (PFK) catalyzes the committed, allosterically regulated rate-limiting step of glycolysis and is termed the pacemaker enzyme of EMP pathway."
  },
  {
    q_num: 18,
    question_text: "Net gain of total number ATP in alcoholic fermentation and lactic acid fermentation (with respect to one glucose molecule) is",
    options: [
      "2 ATP and 4 ATP respectively",
      "4 ATP and 2 ATP respectively",
      "2 ATP in both cases",
      "4 ATP in both cases"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "In both alcoholic fermentation and lactic acid fermentation, the net gain of ATP is 2 ATP per glucose molecule."
  },
  {
    q_num: 19,
    question_text: "Respiratory substrate for protoplasmic respiration is:",
    options: ["Protein", "Organic acid", "Carbohydrate", "Fat"],
    correct_index: 0,
    difficulty: "easy",
    solution: "When protein is oxidised as respiratory substrate, it is termed protoplasmic respiration; oxidation of carbohydrates or fats is termed floating respiration."
  },
  {
    q_num: 20,
    question_text: "Decarboxylation in aerobic respiration takes place in",
    options: [
      "Glycolysis",
      "Link reaction",
      "TCA cycle",
      "Both (2) and (3)"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "Decarboxylation occurs in the link reaction (conversion of pyruvate to acetyl-CoA) and in the TCA cycle (isocitrate to α-ketoglutarate and α-ketoglutarate to succinyl-CoA)."
  },
  {
    q_num: 21,
    question_text: "Read the following statements and choose the correct option.\nStatement A: Glycolysis is a common step of both aerobic and anaerobic respiration.\nStatement B: Glycolysis does not require oxygen.",
    options: [
      "Both Statements A and B are correct",
      "Statement A is correct only",
      "Statement B is correct only",
      "Both Statements A and B are incorrect"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Both statements are correct: glycolysis is the common initial pathway for both aerobic and anaerobic respiration, and it functions independently of oxygen."
  },
  {
    q_num: 22,
    question_text: "Mark the correct match",
    options: [
      "Succinate dehydrogenase – Mitochondrial matrix",
      "Floating respiration – Respiratory substrate is fat or carbohydrate",
      "Aldolase – Pacemaker enzyme of glycolysis",
      "NADH dehydrogenase – Complex II of ETS"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Floating respiration refers to cellular respiration where carbohydrates or fats serve as respiratory substrates."
  },
  {
    q_num: 23,
    question_text: "Which of the following is the rate limiting step in EMP pathway?",
    options: [
      "Glucose -> Glucose 6P",
      "Glucose 6P -> Fructose 6P",
      "Fructose 6P -> Fructose 1, 6-bisphosphate",
      "Fructose-1, 6-bisphosphate -> 3, PGAL"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate catalyzed by phosphofructokinase is the rate-limiting and committed step of glycolysis."
  },
  {
    q_num: 24,
    question_text: "How many ATP molecules are produced by substrate level phosphorylation in glycolysis when one glucose molecule is broken down into two molecules of pyruvic acid?",
    options: ["2 ATP", "4 ATP", "6 ATP", "10 ATP"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Four ATP molecules are produced by substrate-level phosphorylation in glycolysis (two from 1,3-BPGA -> 3-PGA and two from PEP -> Pyruvate)."
  },
  {
    q_num: 25,
    question_text: "Which of the events are involved in the Krebs' cycle, when α-ketoglutaric acid is converted into succinyl coenzyme A?\n(a) Dehydrogenation\n(b) Attachment of Co-A\n(c) Decarboxylation\n(d) Dehydration",
    options: [
      "Only (a) and (b)",
      "Only (a) and (c)",
      "Only (a), (b) and (d)",
      "Only (a), (b) and (c)"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Conversion of α-ketoglutaric acid to succinyl-CoA by α-ketoglutarate dehydrogenase involves dehydrogenation (forming NADH + H+), decarboxylation (loss of CO2), and attachment of CoA-SH."
  },
  {
    q_num: 26,
    question_text: "Which of the following complex in ETS during aerobic respiration is not involved in the electron transfer?",
    options: [
      "Complex I and II",
      "Complex II and III",
      "Complex IV",
      "Complex V"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "Complex V (ATP synthase) couples the proton motive force to ATP synthesis from ADP and Pi; it does not transfer electrons."
  },
  {
    q_num: 27,
    question_text: "How many ATP will be produced from two molecules of succinyl CoA till it gets catabolised into oxaloacetic acid through oxidative phosphorylation only",
    options: ["10", "11", "12", "8"],
    correct_index: 0,
    difficulty: "hard",
    solution: "For each succinyl-CoA oxidized to OAA: Succinate -> Fumarate produces 1 FADH2 (= 2 ATP via ETS) and Malate -> OAA produces 1 NADH (= 3 ATP via ETS). Through oxidative phosphorylation only, each gives 5 ATP. For two molecules: 2 × 5 = 10 ATP."
  },
  {
    q_num: 28,
    question_text: "Read the following statement from (i) - (iv) and identify the correct ones:\n(i) Yeast poison themselves to death when the concentration of alcohol reaches about 13%\n(ii) In fermentation less than 7% of the energy in glucose is released\n(iii) Net gain in both types of fermentation is 4 ATP (w.r.t. one glucose molecule).\n(iv) During glycolysis enzyme involved in phosphorylation of hexose sugar is Enolase.",
    options: [
      "(i) and (ii)",
      "(ii) and (iv)",
      "(i) and (iii)",
      "(ii) and (iii)"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Statements (i) and (ii) are accurate NCERT lines. Statement (iii) is incorrect (net gain is 2 ATP) and (iv) is incorrect (hexokinase phosphorylates hexose sugars)."
  },
  {
    q_num: 29,
    question_text: "Read the following statements and state True (T) or False (F):\nA. Oligomycin inhibits oxidative phosphorylation.\nB. During aerobic respiration, end products are lactic acid or alcohol.\nC. The RQ value of oxalic acid is 4.\nD. Cytochrome-c is a non-mobile protein attached to inner membrane.",
    options: ["T F T F", "T T F T", "T F T T", "T F F F"],
    correct_index: 0,
    difficulty: "medium",
    solution: "A is True (oligomycin blocks F0 proton channel); B is False (end products are CO2 and H2O); C is True (RQ of oxalic acid is 4.0); D is False (Cytochrome c is a mobile carrier)."
  },
  {
    q_num: 30,
    question_text: "In aerobic respiration\n(i) Oxygen acts as terminal electron acceptor.\n(ii) Transfer of electrons from Complex III to Complex IV occurs by cytochrome oxidase.\n(iii) Ubiquinone also receives reducing equivalent via FADH2.\n(iv) Krebs' cycle does not involve any substrate level phosphorylation.\nWhich of the above statements are true?",
    options: [
      "(i) and (iii)",
      "(i), (ii) and (iv)",
      "(i) and (ii)",
      "(i) and (iv)"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Statements (i) and (iii) are true. Cytochrome c transfers electrons between Complex III and IV, and Krebs cycle involves substrate-level phosphorylation (succinyl-CoA to succinate)."
  },
  {
    q_num: 31,
    question_text: "The term floating respiration is used for oxidation of",
    options: [
      "Carbohydrate and fat",
      "Organic acid",
      "Fat and organic acid",
      "Protein and fat"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Floating respiration is cellular oxidation utilizing carbohydrates and fats as respiratory substrates."
  },
  {
    q_num: 32,
    question_text: "How many enzyme complex/complexes is/are involved in oxidative phosphorylation?",
    options: ["Four", "Five", "One", "Two"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Five enzyme complexes are involved in oxidative phosphorylation: Complexes I through IV in electron transport and Complex V (ATP synthase) in phosphorylation."
  },
  {
    q_num: 33,
    question_text: "Which of the following respiratory complex does not act as an electron carrier?",
    options: [
      "F0-F1 ATP synthase",
      "NADH dehydrogenase",
      "Cytochrome bc1",
      "Cytochrome-c oxidase"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Complex V (F0-F1 ATP synthase) serves as a proton translocation and ATP synthesizing channel, not an electron carrier."
  },
  {
    q_num: 34,
    question_text: "During respiration, mobile carrier cytochrome c transfers electron in between",
    options: [
      "NADH to FADH2",
      "Cytochrome bc1 to cytochrome f",
      "Cytochrome bc1 to cytochrome-c oxidase",
      "FADH2 to Ubiquinone"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Cytochrome c is a mobile carrier situated on the outer surface of the inner mitochondrial membrane that shuttles electrons from Complex III (cytochrome bc1) to Complex IV (cytochrome-c oxidase)."
  },
  {
    q_num: 35,
    question_text: "How many ATP will be produced from one molecule of 3-phosphoglyceraldehyde through substrate level during aerobic respiration?",
    options: ["Six", "Three", "Seventeen", "Fifteen"],
    correct_index: 1,
    difficulty: "hard",
    solution: "One molecule of 3-PGAL produces 2 ATP in glycolysis by substrate level phosphorylation (1,3-BPGA -> 3-PGA and PEP -> Pyruvate) and 1 ATP/GTP in TCA cycle (succinyl-CoA -> succinate). Total = 2 + 1 = 3 ATP."
  },
  {
    q_num: 36,
    question_text: "Read the following statements:\n(i) RQ of maturing fatty seeds > 1.\n(ii) 2, 4-DNP is an uncoupling agent in ETS.\n(iii) Cytochrome-c is an intrinsic protein completely embedded in the inner mitochondrial membrane.\n(iv) Organic acids are not used as a respiratory substrate.\nMark True (T) and False (F) for the statements (i), (ii), (iii) and (iv) respectively.",
    options: ["T, T, F, F", "F, F, T, F", "T, F, T, F", "T, T, F, T"],
    correct_index: 0,
    difficulty: "medium",
    solution: "(i) True (converting carbohydrates to fats releases CO2 without consuming equal O2); (ii) True (2,4-DNP uncouples electron transport from ATP synthesis); (iii) False (Cytochrome c is a peripheral protein); (iv) False (organic acids can serve as substrates under certain conditions)."
  },
  {
    q_num: 37,
    question_text: "Which one of the following is an integral membrane protein complex that forms the channel through which the protons cross the inner membrane?",
    options: ["UQ", "F0", "Cyt c", "CF1"],
    correct_index: 1,
    difficulty: "easy",
    solution: "F0 of ATP synthase is an integral membrane protein complex that forms the transmembrane proton channel."
  },
  {
    q_num: 38,
    question_text: "The fermentation product of yeast are",
    options: [
      "Methyl alcohol and ethyl alcohol",
      "Methyl alcohol and carbon dioxide",
      "Ethyl alcohol and carbon dioxide",
      "Pyruvate and acetaldehyde"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Yeast carries out alcoholic fermentation producing ethyl alcohol (ethanol) and carbon dioxide."
  },
  {
    q_num: 39,
    question_text: "During aerobic respiration, the site where both ATP and NADH + H+ are synthesised are",
    options: [
      "Cytosol and inner mitochondrial membrane",
      "Cytosol, mitochondrial matrix and inner mitochondrial membrane",
      "Mitochondrial matrix and inner mitochondrial membrane",
      "Cytosol and mitochondrial matrix"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "In cytosol (glycolysis), both ATP and NADH + H+ are synthesised. In mitochondrial matrix (Krebs cycle), both GTP/ATP and NADH + H+ are synthesised."
  },
  {
    q_num: 40,
    question_text: "In the figure given below, choose the correct option for labels A, B and C.",
    image_url: "/uploads/respiration_in_plants/q40_diagram.png",
    options: [
      "A-Ethanol, B-Lactic acid, C-Dihydroxyacetone phosphate",
      "A-Lactic acid, B-Ethanol, C-Oxaloacetic acid",
      "A-Lactic acid, B-Ethanol, C-3-Phosphoglyceric acid",
      "A-Ethanol, B-Lactic acid, C-3-Phosphoglyceric acid"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "According to NCERT Fig 14.2: Glyceraldehyde 3-phosphate is converted to 3-Phosphoglyceric acid (C). Pyruvic acid is converted to Lactic acid (A) via lactic fermentation, and to Ethanol (B) + CO2 via alcoholic fermentation."
  },
  {
    q_num: 41,
    question_text: "Which of the following conversion of Krebs cycle is not catalysed by dehydrogenase enzyme?",
    options: [
      "Conversion of isocitric acid to oxalosuccinic acid",
      "Succinic acid to fumaric acid",
      "Malic acid to oxaloacetic acid",
      "Oxalosuccinic acid to α-ketoglutaric acid"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Conversion of oxalosuccinic acid to α-ketoglutaric acid is a non-oxidative decarboxylation reaction catalyzed by oxalosuccinate decarboxylase."
  },
  {
    q_num: 42,
    question_text: "Cis-aconitate + H2O <-> Isocitrate\nThe enzyme and cofactor in above reaction are respectively,",
    options: [
      "Aconitase, Fe2+",
      "Aconitase, Mg2+",
      "Aconitase, Mn2+",
      "Isocitrate dehydrogenase, Fe2+"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "Aconitase catalyzes hydration/isomerization of cis-aconitate to isocitrate and requires Fe2+ (iron-sulfur cluster) as its cofactor."
  },
  {
    q_num: 43,
    question_text: "Mark the correct statement w.r.t. ethyl alcohol fermentation.",
    options: [
      "In presence of alcohol dehydrogenase, pyruvate is broken down to form acetaldehyde",
      "Acetaldehyde is reduced to ethyl alcohol",
      "NADPH is reduced to NAD+",
      "No carbon dioxide is produced"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Acetaldehyde is reduced to ethyl alcohol by NADH + H+ in the presence of alcohol dehydrogenase."
  },
  {
    q_num: 44,
    question_text: "Fate of pyruvate depends upon cellular needs. It can\na. Enter in aerobic pathway\nb. Take part in alcohol fermentation\nc. Perform lactic acid fermentation",
    options: [
      "All are correct",
      "Only b is incorrect",
      "Only a is incorrect",
      "Only c is incorrect"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Depending on the organism and oxygen availability, pyruvate can undergo aerobic respiration, alcoholic fermentation, or lactic acid fermentation."
  },
  {
    q_num: 45,
    question_text: "Find an incorrect statement w.r.t. ETS of respiration.",
    options: [
      "Cyt c and UQ work as mobile carriers",
      "Complex IV transfers electrons to oxygen",
      "Terminal electron acceptor is located in outer mitochondrial membrane",
      "UQ acts as common electron acceptor for both membrane enzyme complex I and II"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "The terminal electron acceptor is molecular oxygen, located in the mitochondrial matrix / inner mitochondrial membrane, not the outer membrane."
  },
  {
    q_num: 46,
    question_text: "Common step of EMP and Krebs cycle is",
    options: [
      "Oxidative decarboxylation",
      "Carboxylation",
      "Oxidative phosphorylation",
      "Substrate level phosphorylation"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "Both glycolysis (EMP) and Krebs cycle directly synthesize ATP/GTP by substrate level phosphorylation."
  },
  {
    q_num: 47,
    question_text: "Pasteur effect states that there is reduction in the amount of consumption of respiratory substrate and evolution of CO2 when there is",
    options: [
      "Transition from anaerobic to aerobic respiration",
      "Increase in the rate of sugar breakdown",
      "Transition from aerobic to anaerobic respiration",
      "Decrease in the rate of ATP production"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "The Pasteur effect refers to the inhibition of sugar breakdown and fermentation when cells transition from anaerobic to aerobic conditions."
  },
  {
    q_num: 48,
    question_text: "In the process of aerobic respiration how many ATP molecules will be generated from first formed single molecule of triose phosphate?",
    options: ["40 ATP", "20 ATP", "12 ATP", "24 ATP"],
    correct_index: 1,
    difficulty: "hard",
    solution: "One molecule of triose phosphate (PGAL) produces: 1 NADH (= 3 ATP) + 2 ATP (SLP) = 5 ATP in glycolysis; 1 NADH (= 3 ATP) in link reaction; and 3 NADH (= 9 ATP) + 1 FADH2 (= 2 ATP) + 1 GTP (= 1 ATP) in Krebs cycle = 12 ATP. Total = 5 + 3 + 12 = 20 ATP."
  },
  {
    q_num: 49,
    question_text: "In HMS, complete degradation of one glucose molecule leads to the formation of",
    options: [
      "6 NADH + H+",
      "12 NADH + H+",
      "12 NADPH + H+",
      "6 NADPH + H+"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Complete oxidation of one glucose molecule via the Hexose Monophosphate (HMS) shunt produces 12 NADPH + H+ and 6 CO2."
  },
  {
    q_num: 50,
    question_text: "ATP provides energy by",
    options: [
      "Metabolizing substances",
      "Allowing sugars to cross cell membrane",
      "Transferring an energized phosphate group to the substrate",
      "Helping to store sugar for later use"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "ATP drives endergonic cellular processes primarily by group transfer: phosphorylating and transferring an energized phosphate group to recipient substrates."
  },
  {
    q_num: 51,
    question_text: "Select an incorrect statement regarding ETS and cellular respiration.",
    options: [
      "Convert electron motive force (emf) into proton motive force (pmf)",
      "Involves ATP generation",
      "Have multiprotein complexes embedded as intrinsic and tunnel proteins",
      "Have single electron transport chain on outer membrane"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "The electron transport chain complexes are embedded in the inner mitochondrial membrane, not the outer membrane."
  },
  {
    q_num: 52,
    question_text: "Which of the following enzymes is common in Krebs cycle as well as in ETS?",
    options: [
      "Pyruvate decarboxylase",
      "Cyt c reductase",
      "Succinate dehydrogenase",
      "Cyt c oxidase"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Succinate dehydrogenase is an inner mitochondrial membrane enzyme that functions in the Krebs cycle (converting succinate to fumarate) and serves as Complex II of ETS."
  },
  {
    q_num: 53,
    question_text: "NADH2 generated in glycolysis is a source of energy and produces 3 ATP in ETS. In absence of O2 which process is responsible for regenerating NAD+ needed for glycolysis?",
    options: [
      "ETS",
      "Oxidative decarboxylation",
      "Fermentation",
      "Deamination"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "In the absence of oxygen, fermentation re-oxidizes NADH to NAD+, allowing glycolysis to continue."
  },
  {
    q_num: 54,
    question_text: "Both ubiquinone and cytochrome bc1 complex of inner mitochondrial membrane are structurally and functionally similar to ___ and ___ respectively of photosynthetic electron transport chain.",
    options: [
      "PC, cyt b6-f",
      "PQ, NADP reductase",
      "Pheo, PQ",
      "PQ, cyt b6-f"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "Ubiquinone (UQ) corresponds to Plastoquinone (PQ) as mobile lipid-soluble electron/proton carrier, and cytochrome bc1 complex corresponds to cytochrome b6-f complex."
  },
  {
    q_num: 55,
    question_text: "Which of the following cell organelles is not a site of β-oxidation of fats in plant or animals?",
    options: [
      "Mitochondria",
      "Peroxisomes",
      "Glyoxysome",
      "Sphaerosomes"
    ],
    correct_index: 3,
    difficulty: "medium",
    solution: "β-oxidation occurs in mitochondria, peroxisomes, and glyoxysomes. Sphaerosomes are lipid storage organelles and do not perform β-oxidation."
  },
  {
    q_num: 56,
    question_text: "Which of the following intermediates of cellular pathway is precursor of gibberellins, carotenoids, and terpenes?",
    options: [
      "Oxaloacetate",
      "Acetyl CoA",
      "Succinyl CoA",
      "PEP"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Acetyl-CoA is the starting material for mevalonic acid pathway which synthesizes carotenoids, gibberellins, and terpenes."
  },
  {
    q_num: 57,
    question_text: "How many decarboxylations occurs during one TCA cycle?",
    options: ["2", "6", "4", "5"],
    correct_index: 0,
    difficulty: "easy",
    solution: "During one turn of the TCA cycle, 2 decarboxylations occur: isocitrate to α-ketoglutarate, and α-ketoglutarate to succinyl-CoA."
  },
  {
    q_num: 58,
    question_text: "Find the odd one out w.r.t. amphibolic nature of Krebs cycle.",
    options: [
      "Oxaloacetic acid helps in pyrimidine biosynthesis",
      "Acetyl CoA is released from β-oxidation of fatty acid",
      "α-ketoglutaric acid provides raw material for amino acid synthesis",
      "Succinyl CoA works as raw material for chlorophyll biosynthesis"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Options (1), (3), and (4) represent anabolic withdrawal of intermediates, while option (2) is catabolic entry into the cycle."
  },
  {
    q_num: 59,
    question_text: "Choose the correct option for the following diagram:",
    image_url: "/uploads/respiration_in_plants/q59_diagram.png",
    options: [
      "'A' is peripheral membrane protein",
      "Protons activate the catalytic site present in 'B'",
      "'B' is an integral protein complex that forms the proton channel",
      "For each ATP production, 3H+ passes through complex"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "In Complex V, 'A' is the membrane-embedded F0 channel and 'B' is the peripheral catalytic F1 headpiece. Protons translocating through F0 activate the catalytic sites in F1 ('B') for ATP synthesis."
  },
  {
    q_num: 60,
    question_text: "What will be value of RQ in Opuntia and Bryophyllum in night?",
    options: ["> 1", "< 1", "1", "Zero"],
    correct_index: 3,
    difficulty: "easy",
    solution: "In CAM plants like Opuntia and Bryophyllum, carbohydrates are incompletely oxidized to malic acid at night without releasing CO2, so RQ = 0."
  },
  {
    q_num: 61,
    question_text: "Formation of ATP in mitochondrial ETS of a green cell in light is called",
    options: [
      "Oxidative phosphorylation",
      "Cyclic photophosphorylation",
      "Substrate level phosphorylation",
      "Non-cyclic photophosphorylation"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "ATP synthesis occurring in the mitochondrial ETS is termed oxidative phosphorylation, regardless of illumination."
  },
  {
    q_num: 62,
    question_text: "What will be net gain of ATP if one molecule of PGAL is oxidised completely in a bacterial cell?",
    options: ["1", "20", "38", "4"],
    correct_index: 1,
    difficulty: "hard",
    solution: "One PGAL completely oxidised yields 1 NADH (3 ATP) + 2 ATP in glycolysis = 5 ATP; 1 NADH (3 ATP) in link reaction = 3 ATP; 3 NADH (9 ATP) + 1 FADH2 (2 ATP) + 1 GTP (1 ATP) in TCA = 12 ATP. Total = 20 ATP."
  },
  {
    q_num: 63,
    question_text: "Which of the following statement is correct?",
    options: [
      "Glycolysis is present in facultative anaerobes, not in obligate anaerobes",
      "Usually carbohydrates are oxidised to release energy in cellular respiration",
      "Oxidation of one molecule of NADH gives rise to 3 molecules of ATP in anaerobic respiration",
      "Fermentation takes place under anaerobic conditions in prokaryotes only"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Carbohydrates are the main respiratory substrates usually oxidised to release cellular energy."
  },
  {
    q_num: 64,
    question_text: "The complete oxidation of one molecule of glucose inside the cell",
    options: [
      "Gives net gain of 38 ATP",
      "Does not show the activity of enzymes",
      "Yield energy, most of which is given out as AMP",
      "Yields heat energy only"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "Complete oxidation of one molecule of glucose in aerobic cells yields up to 36 to 38 ATP."
  },
  {
    q_num: 65,
    question_text: "During glycolysis how many redox equivalents are removed from PGAL to form a reduced molecule of co-enzyme?",
    options: ["One", "Two", "Three", "Four"],
    correct_index: 1,
    difficulty: "medium",
    solution: "Two redox equivalents (two hydrogen atoms) are removed from PGAL and transferred to NAD+ forming NADH + H+."
  },
  {
    q_num: 66,
    question_text: "In ETS the number of ATP molecules synthesized depends on",
    options: [
      "O2 concentration",
      "Respiratory substrate",
      "Electron donor",
      "Proton gradient"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "According to NCERT, the number of ATP molecules synthesized depends on the nature of the electron donor (oxidation of NADH yields 3 ATP, while FADH2 yields 2 ATP)."
  },
  {
    q_num: 67,
    question_text: "Which of the following compounds of cellular respiration is neither the intermediate of EMP nor TCA?",
    options: [
      "Oxaloacetic acid",
      "Lactate",
      "PGAL",
      "α-KGA"
    ],
    correct_index: 1,
    difficulty: "easy",
    solution: "Lactate is an end product of lactic acid fermentation and is neither an intermediate of glycolysis (EMP) nor Krebs cycle (TCA)."
  },
  {
    q_num: 68,
    question_text: "First state of transition reaction or link reaction is catalysed by enzyme namely",
    options: [
      "Hexokinase",
      "Transacetylase",
      "Pyruvate dehydrogenase",
      "Pyruvate kinase"
    ],
    correct_index: 2,
    difficulty: "easy",
    solution: "Pyruvate dehydrogenase complex catalyzes oxidative decarboxylation of pyruvate to acetyl-CoA."
  },
  {
    q_num: 69,
    question_text: "Which is incorrect for ATP synthase?",
    options: [
      "This is made up of two parts",
      "F0 is an integral membrane protein complex",
      "F1 is peripheral protein complex",
      "This is found in mitochondria only"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "ATP synthases are present in mitochondria, chloroplasts, and bacterial plasma membranes; they are not found in mitochondria only."
  },
  {
    q_num: 70,
    question_text: "Continuous supply of which organic acid is required to run TCA cycle continuously?",
    options: [
      "Acetyl Co-A",
      "α-ketoglutaric acid",
      "Oxaloacetic acid",
      "Citric acid"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Continued oxidation of acetyl-CoA requires continuous replenishment of oxaloacetic acid (OAA), the primary acceptor."
  },
  {
    q_num: 71,
    question_text: "A mobile electron carrier which transfers electron between complex III and complex IV is",
    options: [
      "Cytochrome-a and present on inner mitochondrial membrane",
      "Cytochrome-c and present on outer side of inner mitochondrial membrane",
      "Cytochrome oxidase and present on outer mitochondrial membrane",
      "Cytochrome-c and present on outer mitochondrial membrane"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Cytochrome c is a mobile carrier situated on the outer surface of the inner mitochondrial membrane and transfers electrons from Complex III to Complex IV."
  },
  {
    q_num: 72,
    question_text: "Match the following columns and select the correct option from those given below:\nColumn I\na. 5C compound\nb. 3C compound\nc. Carotenoids precursor\nd. Alkaloids precursor\nColumn II\n(i) Acetyl CoA\n(ii) OAA\n(iii) α-ketoglutaric acid\n(iv) 2-PGA",
    options: [
      "a(iii), b(iv), c(i), d(ii)",
      "a(iv), b(iii), c(ii), d(i)",
      "a(iii), b(iv), c(ii), d(i)",
      "a(ii), b(i), c(iv), d(iii)"
    ],
    correct_index: 0,
    difficulty: "medium",
    solution: "α-ketoglutarate is a 5C compound; 2-PGA is a 3C compound; Acetyl CoA is the precursor for carotenoids; OAA is the precursor for alkaloids."
  },
  {
    q_num: 73,
    question_text: "All monerans lack",
    options: [
      "Krebs' Cycle",
      "ETS",
      "Glycerol-3-Phosphate Shuttle",
      "Glycolysis"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Monerans (prokaryotes) lack mitochondria and subcellular compartments; thus they completely lack mitochondrial shuttle systems like glycerol-3-phosphate shuttle."
  },
  {
    q_num: 74,
    question_text: "Name the products marked as A, B and C in given diagram.",
    image_url: "/uploads/respiration_in_plants/q74_diagram.png",
    options: [
      "A: Fatty acid and glycerol, B: PEP, C: Acetyl CoA",
      "A: Glucose, B: Pyruvic acid, C: Acetyl CoA",
      "A: Glucose-6-Ph, B: PEP, C: OAA",
      "A: Fatty acid and glycerol, B: Pyruvic acid, C: Acetyl CoA"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "In the amphibolic respiratory pathway (NCERT Fig 14.6), A represents Glucose / carbohydrates, B represents Pyruvic acid, and C represents Acetyl CoA."
  },
  {
    q_num: 75,
    question_text: "Consider the statements a, b, c and d w.r.t. fermentation by yeast and select the correct choice.\na. Production of CO2 and ethanol.\nb. Complete oxidation of glucose.\nc. The reducing agent is NADH + H+.\nd. It is achieved under anaerobic condition.",
    options: [
      "a & b are correct",
      "b is incorrect",
      "c is incorrect",
      "a, b & c are correct"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "Statement b is incorrect because fermentation is an incomplete/partial oxidation of glucose into ethanol and CO2."
  },
  {
    q_num: 76,
    question_text: "Identify A, B, C and D in the following diagram:",
    image_url: "/uploads/respiration_in_plants/q76_diagram.png",
    options: [
      "A. Inner mitochondrial membrane; B. F0; C. F1; D. Matrix",
      "A. Inner mitochondrial membrane; B. F0; C. Matrix; D. F1",
      "A. Matrix; B. Inner mitochondrial membrane; C. F0; D. Cytoplasm",
      "A. Cytoplasm; B. F0; C. Matrix; D. F1"
    ],
    correct_index: 1,
    difficulty: "medium",
    solution: "In the ATP synthase diagram (NCERT Fig 14.5), A is the inner mitochondrial membrane, B is the embedded F0 channel, C is the mitochondrial matrix, and D is the catalytic F1 headpiece."
  },
  {
    q_num: 77,
    question_text: "Which enzyme conducts the irreversible reaction of glycolysis and is also called the pacemaker of the process?",
    options: [
      "Hexokinase",
      "Pyruvate kinase",
      "Phosphofructokinase",
      "Phosphophosphate mutase"
    ],
    correct_index: 2,
    difficulty: "medium",
    solution: "Phosphofructokinase catalyzes the key irreversible step (Fructose-6-P to Fructose-1,6-bisphosphate) and acts as the pacemaker enzyme of glycolysis."
  },
  {
    q_num: 78,
    question_text: "Match the following columns and select the correct option from given below:\nColumn I\na. NADH dehydrogenase\nb. Cytochrome bc1 complex\nc. ATP synthase\nd. Cytochrome c oxidase\nColumn II\n(i) Complex - V\n(ii) Complex - III\n(iii) Complex - IV\n(iv) Complex - I",
    options: [
      "a(iv), b(ii), c(i), d(iii)",
      "a(iv), b(i), c(iii), d(ii)",
      "a(i), b(iv), c(ii), d(iii)",
      "a(ii), b(iii), c(i), d(iv)"
    ],
    correct_index: 0,
    difficulty: "easy",
    solution: "NADH dehydrogenase is Complex I; Cytochrome bc1 is Complex III; ATP synthase is Complex V; Cytochrome c oxidase is Complex IV."
  },
  {
    q_num: 79,
    question_text: "Choose the odd one",
    options: [
      "Under certain conditions organic acids can be used as respiratory substrate",
      "Carbon skeleton produced during respiration is used as precursor for biosynthesis of other molecules",
      "During cellular respiration, energy is released in a series of slow stepwise reactions",
      "Proteins are the most preferred substrate for biological oxidation"
    ],
    correct_index: 3,
    difficulty: "easy",
    solution: "Carbohydrates (glucose) are the most preferred respiratory substrates. Proteins are never the preferred substrate and are only used under prolonged starvation."
  }
];

export const SECTION_B_AR_QUESTIONS = [
  {
    q_num: 1,
    assertion_text: "α-ketoglutaric acid is a starting substance in nitrogen metabolism.",
    reason_text: "It acts as a connecting link between respiration and photosynthesis.",
    correct_index: 2, // (3) Assertion is true but Reason is false
    difficulty: "medium",
    solution: "Assertion is true statement because α-ketoglutarate undergoes reductive amination to form glutamate, which serves as the starting compound for synthesis of other amino acids and nitrogen metabolism. Reason is false because α-ketoglutarate acts as a connecting link between carbohydrate metabolism (respiration) and protein metabolism (nitrogen metabolism), not photosynthesis."
  },
  {
    q_num: 2,
    assertion_text: "Pyruvic acid is directly reduced to lactic acid without decarboxylation in fermentation process.",
    reason_text: "The enzyme required in lactic acid fermentation is lactic dehydrogenase which also requires FMN and Zn++.",
    correct_index: 2, // (3) Assertion is true statement but Reason is false
    difficulty: "hard",
    solution: "Assertion is true because during lactic acid fermentation in muscle cells and lactic bacteria, pyruvic acid (3C) is directly reduced to lactic acid (3C) by NADH without any decarboxylation (no CO2 evolved). Reason is false because lactate dehydrogenase is an NAD+-dependent enzyme requiring Zn2+, not FMN."
  },
  {
    q_num: 3,
    assertion_text: "The continued oxidation of acetyl CoA via the TCA cycle requires the continued replenishment of OAA.",
    reason_text: "OAA is the primary acceptor molecule with aldehyde group.",
    correct_index: 2, // (3) Assertion is true statement but Reason is false
    difficulty: "medium",
    solution: "Assertion is true because oxaloacetic acid (OAA) is the initial 4C acceptor that condenses with acetyl-CoA to form citric acid; continued oxidation of acetyl-CoA strictly requires continuous regeneration and replenishment of OAA. Reason is false because OAA is a dicarboxylic keto-acid with a keto (carbonyl) group, not an aldehyde group."
  },
  {
    q_num: 4,
    assertion_text: "Glycerol would enter the respiratory pathway after being converted to glucose-6-phosphate.",
    reason_text: "Glucose-6-phosphate is substrate of link reaction.",
    correct_index: 3, // (4) Both Assertion and Reason are false statements
    difficulty: "medium",
    solution: "Both Assertion and Reason are false statements. Glycerol enters the respiratory pathway after phosphorylation and conversion to dihydroxyacetone phosphate (DHAP) / 3-PGAL (triose phosphate), not glucose-6-phosphate. The substrate for the link reaction is pyruvic acid, not glucose-6-phosphate."
  },
  {
    q_num: 5,
    assertion_text: "Proteins are the favoured substrate for respiration.",
    reason_text: "They enter the glycolytic pathway directly.",
    correct_index: 3, // (4) Both Assertion and Reason are false statements
    difficulty: "easy",
    solution: "Both Assertion and Reason are false statements. Carbohydrates (glucose) are the favoured respiratory substrates, not proteins. Proteins are hydrolyzed into amino acids which enter at pyruvate, acetyl-CoA, or Krebs cycle intermediates, and do not enter the glycolytic pathway directly."
  },
  {
    q_num: 6,
    assertion_text: "Pure proteins or fats are never used as respiratory substances.",
    reason_text: "Usually carbohydrates are oxidized to release energy in respiration.",
    correct_index: 1, // (2) Both are true but Reason is not the correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true statements from NCERT. Pure proteins or fats are never utilized as sole respiratory substrates in living cells because cellular metabolism always uses carbohydrates as primary fuel and mobilizes fats/proteins alongside carbohydrates. The fact that carbohydrates are usually oxidised does not provide the causal biochemical explanation for the assertion."
  },
  {
    q_num: 7,
    assertion_text: "In aerobic bacterium, glycolysis and TCA takes place in cytoplasm.",
    reason_text: "In prokaryotic cell, mitochondria is absent.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "easy",
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. Prokaryotic cells lack membrane-bound organelles including mitochondria; therefore, all respiratory metabolic pathways (glycolysis and TCA cycle) take place in the cytoplasm."
  },
  {
    q_num: 8,
    assertion_text: "Plants, unlike animals have no specialised organs for gaseous exchange.",
    reason_text: "Plants do not present great demands for gas exchange.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true statements and Reason correctly explains the Assertion. According to NCERT, plants do not possess specialised respiratory organs because each plant part takes care of its own gas-exchange needs and plants do not present great demands for gas exchange compared to animals."
  },
  {
    q_num: 9,
    assertion_text: "Fermentation takes place under anaerobic conditions in many prokaryotes and in unicellular eukaryotes.",
    reason_text: "For complete oxidation of glucose to CO2 and H2O, oxygen is not required.",
    correct_index: 2, // (3) Assertion is true statement but Reason is false
    difficulty: "easy",
    solution: "Assertion is true because fermentation occurs in anaerobic conditions in many prokaryotes (bacteria) and unicellular eukaryotes (yeast). Reason is false because complete oxidation of glucose into CO2 and H2O strictly requires molecular oxygen (aerobic respiration)."
  },
  {
    q_num: 10,
    assertion_text: "Succinate dehydrogenase is involved in Krebs cycle and electron transport system.",
    reason_text: "Succinate dehydrogenase is present in inner surface of inner membrane of mitochondria.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. Succinate dehydrogenase is physically located on the inner surface of the inner mitochondrial membrane, allowing it to oxidize succinate to fumarate in the TCA cycle while directly passing electrons into the electron transport chain as Complex II."
  },
  {
    q_num: 11,
    assertion_text: "In electron transport system, oxygen act as the final hydrogen acceptor.",
    reason_text: "Oxygen drives the whole process by removing hydrogen from the system of ETS.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "medium",
    solution: "Both Assertion and Reason are true and Reason is the exact NCERT explanation. Oxygen acts as the terminal electron and proton (hydrogen) acceptor, continuously removing electrons to form water and thereby maintaining the electron flow and proton gradient across the inner membrane."
  },
  {
    q_num: 12,
    assertion_text: "The respiratory pathway is considered as an amphibolic pathway rather than as a catabolic one.",
    reason_text: "The respiratory pathway is involved in both anabolism and catabolism.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "easy",
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. Respiration is involved in both the catabolic breakdown of substrates and the anabolic withdrawal of intermediates for biosynthesis (e.g. acetyl-CoA for fatty acids, α-ketoglutarate for amino acids), making it an amphibolic pathway."
  },
  {
    q_num: 13,
    assertion_text: "Glycolysis is common pathway for aerobic and anaerobic respiration.",
    reason_text: "In glycolysis decarboxylation does not take place.",
    correct_index: 1, // (2) Both are true but Reason is not correct explanation
    difficulty: "medium",
    solution: "Both statements are true: glycolysis is common to both modes of respiration, and no decarboxylation reaction occurs during glycolysis. However, the reason glycolysis is common to both is that it operates independently of molecular oxygen and is the ancestral pathway of glucose degradation, not simply because decarboxylation does not occur."
  },
  {
    q_num: 14,
    assertion_text: "In succulent plant like Opuntia RQ value is zero.",
    reason_text: "In anaerobic respiration RQ value is less than one (< 1).",
    correct_index: 2, // (3) Assertion is true statement but Reason is false
    difficulty: "medium",
    solution: "Assertion is true because in succulent CAM plants like Opuntia at night, carbohydrates are incompletely oxidized to malic acid without any release of CO2, resulting in an RQ of zero (0 / O2 consumed = 0). Reason is false because in anaerobic alcoholic fermentation RQ is infinite (CO2 / 0 = ∞), not less than one."
  },
  {
    q_num: 15,
    assertion_text: "ATP acts as the energy currency of the cell.",
    reason_text: "ATP is broken down whenever energy needs to be utilized.",
    correct_index: 0, // (1) Both are true and Reason is correct explanation
    difficulty: "easy",
    solution: "Both Assertion and Reason are true and Reason is the correct explanation. ATP functions as the cellular energy currency because energy released during exergonic processes is trapped in high-energy pyrophosphate bonds of ATP, which are subsequently hydrolyzed to ADP and Pi whenever endergonic cellular work is performed."
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

async function seed() {
  console.log('--- Starting Botany "Respiration in Plants" Seeding Script ---');
  let client;
  try {
    client = await connectWithRetry();

    // 1. Get or confirm Botany subject (id = 10)
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'botany' LIMIT 1");
    if (subRes.rows.length === 0) {
      throw new Error('Botany subject not found in subjects table');
    }
    const subjectId = subRes.rows[0].id;
    const subjectName = subRes.rows[0].name;
    console.log(`Found subject: ${subjectName} (ID: ${subjectId})`);

    // 2. Get or create chapter "Respiration in Plants"
    const chapterName = 'Respiration in Plants';
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

    // 3. Clean up any previous questions for this chapter to ensure clean idempotency
    const delRes = await client.query(
      `DELETE FROM question_bank WHERE (subject_id = $1 OR category = 'Botany') AND (chapter_id = $2 OR LOWER(chapter) = LOWER($3))`,
      [subjectId, chapterId, chapterName]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous question(s) for "${chapterName}".`);

    // 4. Insert Section A: 79 Objective Type (MCQ) Questions
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
        'Botany',
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
        'Botany',
        'Respiration in Plants',
        chapterName,
        'available'
      ];

      const res = await client.query(sql, values);
      secAInserted++;
      if (secAInserted % 10 === 0 || secAInserted === SECTION_A_QUESTIONS.length) {
        console.log(`  [Section A] Inserted ${secAInserted}/${SECTION_A_QUESTIONS.length} (Latest ID: ${res.rows[0].id})`);
      }
    }

    // 5. Insert Section B: 15 Assertion-Reason Questions into AR Section
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
        'Botany',
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
        'Botany',
        'Assertion and Reason', // Explicit AR section in this chapter
        chapterName,
        'available'
      ];

      const res = await client.query(sql, values);
      secBInserted++;
      console.log(`  [Section B - AR] Inserted AR Q${q.q_num}/${SECTION_B_AR_QUESTIONS.length} (DB ID: ${res.rows[0].id})`);
    }

    const totalInserted = secAInserted + secBInserted;
    console.log(`\n Successfully seeded ${totalInserted} questions (${secAInserted} MCQs + ${secBInserted} ARs) into Question Bank for Botany -> "${chapterName}".`);

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
        const liveBotany = subs.find(s => s.name.toLowerCase() === 'botany');
        if (liveBotany) {
          const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveBotany.id}/chapters`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const chaps = (await chapsRes.json()).chapters || [];
          let liveChap = chaps.find(c => c.name.toLowerCase() === chapterName.toLowerCase());
          if (!liveChap) {
            console.log(`Creating chapter '${chapterName}' on live edvedum...`);
            const createRes = await fetch(`${LIVE_API}/admin/subjects/${liveBotany.id}/chapters`, {
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
