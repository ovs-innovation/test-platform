import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_pages_dump.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_diagram_urls.json'), 'utf8'));

// Filter pages 2 to 37 (indices 1 to 36)
const lines = [];
for (let p = 1; p <= 36; p++) {
  const plines = pages[p].lines;
  for (let l of plines) {
    if (
      l.includes('Exam   GOAL') ||
      l.includes('Exam GOAL') ||
      l.includes('P Y Q   P D F') ||
      l.includes('Keep practising on the ExamGOAL app') ||
      l.includes('Chapter-wise PYQs with solutions') ||
      l.includes('NEET Biology: Human Health and Diseases') ||
      (!l.startsWith('Q') && (l.includes('MCQ (Single Correct Answer)') || l.includes('Out of syllabus')))
    ) {
      continue;
    }
    const cleaned = l.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      lines.push(cleaned);
    }
  }
}

// Slice into 171 blocks
const qBlocks = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      headerExam: m[2].replace(/·.*$/, '').trim(),
      startLine: i
    });
  }
}

console.log(`Found ${qBlocks.length} question blocks.`);

function parseBlock(blockLines, qNum) {
  const fullText = blockLines.slice(1).join('\n');

  if (qNum === 2) {
    return {
      questionText: `Colostrum, secreted by mother during initial days of lactation, is abundant in ______.`,
      optA: 'IgD',
      optB: 'IgG',
      optC: 'IgM',
      optD: 'IgA'
    };
  }

  if (qNum === 5) {
    return {
      questionText: `The following are the stages of life cycle of Plasmodium. Arrange the stages in the proper order.
A. The parasites reproduce asexually in RBCs, bursting the cells.
B. The parasites reproduce asexually in liver cells, bursting the cells and releasing into blood.
C. Gametocytes develop in RBCs.
D. Sporozoites reach the liver through the blood.
E. Female mosquito injects sporozoites into humans during bite.

Choose the correct answer from the options given below:`,
      optA: 'E, D, B, A, C',
      optB: 'A, B, C, D, E',
      optC: 'C, A, B, D, E',
      optD: 'E, C, D, B, A'
    };
  }

  if (qNum === 6) {
    return {
      questionText: `Match List I with List II:

| List I (Drug) | List II (Effect) |
| :--- | :--- |
| A. Nicotine | I. Causes sense of euphoria and increased energy |
| B. Morphine | II. Stimulates adrenal gland to release catecholamines into blood circulation |
| C. Heroin | III. Effective sedative and painkiller |
| D. Cocaine | IV. A depressant; slows down body function |

Choose the correct answer from the options given below:`,
      optA: 'A-III, B-II, C-IV, D-I',
      optB: 'A-II, B-III, C-I, D-IV',
      optC: 'A-II, B-III, C-IV, D-I',
      optD: 'A-III, B-II, C-I, D-IV'
    };
  }

  if (qNum === 8) {
    return {
      questionText: `Which are correct:
A. Computed tomography and magnetic resonance imaging detect cancers of internal organs.
B. Chemotherapeutics drugs are used to kill non-cancerous cells.
C. $\\alpha$-interferon activate the cancer patients' immune system and helps in destroying the tumour.
D. Chemotherapeutic drugs are biological response modifiers.
E. In the case of leukaemia blood cell counts are decreased.

Choose the correct answer from the options given below:`,
      optA: 'C and D only',
      optB: 'A and C only',
      optC: 'B and D only',
      optD: 'D and E only'
    };
  }

  if (qNum === 12) {
    return {
      questionText: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| A. Emphysema | I. Rapid spasms in muscle due to low $\\text{Ca}^{++}$ in body fluid |
| B. Angina Pectoris | II. Damaged alveolar walls and decreased respiratory surface |
| C. Glomerulonephritis | III. Acute chest pain when not enough oxygen is reaching to heart muscle |
| D. Tetany | IV. Inflammation of glomeruli of kidney |

Choose the correct answer from the options given below :`,
      optA: 'A-II, B-IV, C-III, D-I',
      optB: 'A-II, B-III, C-IV, D-I',
      optC: 'A-III, B-I, C-IV, D-II',
      optD: 'A-III, B-I, C-II, D-IV'
    };
  }

  if (qNum === 14) {
    return {
      questionText: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Malignant tumors | (I) Destroy tumors |
| (B) MALT | (II) AIDS |
| (C) NACO | (III) Metastasis |
| (D) $\\alpha$-Interferons | (IV) Lymphoid tissue |

Choose the correct answer from the options given below:`,
      optA: 'A-III, B-IV, C-II, D-I',
      optB: 'A-IV, B-III, C-II, D-I',
      optC: 'A-III, B-IV, C-I, D-II',
      optD: 'A-III, B-I, C-IV, D-II'
    };
  }

  if (qNum === 15) {
    return {
      questionText: `Match List I with List II :

| List - I | List - II |
| :--- | :--- |
| (A) B-Lymphocytes | (I) Passive immunity |
| (B) Interferons | (II) Cell mediated immunity |
| (C) T-Lymphocytes | (III) Produce an army of proteins in response to pathogens |
| (D) Colostrum | (IV) Innate immunity |

Choose the correct answer from the options given below :`,
      optA: 'A-I, B-IV, C-II, D-III',
      optB: 'A-IV, B-II, C-III, D-I',
      optC: 'A-III, B-IV, C-II, D-I',
      optD: 'A-II, B-IV, C-I, D-III'
    };
  }

  if (qNum === 17) {
    return {
      questionText: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Typhoid | I. Fungus |
| B. Leishmaniasis | II. Nematode |
| C. Ringworm | III. Protozoa |
| D. Filariasis | IV. Bacteria |

Choose the correct answer from the options given below:`,
      optA: 'A-I, B-III, C-II, D-IV',
      optB: 'A-IV, B-III, C-I, D-II',
      optC: 'A-III, B-I, C-IV, D-II',
      optD: 'A-II, B-IV, C-III, D-I'
    };
  }

  if (qNum === 18) {
    return {
      questionText: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Cocaine | I. Effective sedative in surgery |
| B. Heroin | II. Cannabis sativa |
| C. Morphine | III. Erythroxylum |
| D. Marijuana | IV. Papaver somniferum |

Choose the correct answer from the options given below:`,
      optA: 'A-IV, B-III, C-I, D-II',
      optB: 'A-I, B-III, C-II, D-IV',
      optC: 'A-II, B-I, C-III, D-IV',
      optD: 'A-III, B-IV, C-I, D-II'
    };
  }

  if (qNum === 19) {
    return {
      questionText: `Match List I with List II :

| List - I | List - II |
| :--- | :--- |
| A. Common cold | I. Plasmodium |
| B. Haemozoin | II. Typhoid |
| C. Widal test | III. Rhinoviruses |
| D. Allergy | IV. Dust mites |

Choose the correct answer from the options given below :`,
      optA: 'A-III, B-IV, C-III, D-I',
      optB: 'A-I, B-III, C-II, D-IV',
      optC: 'A-III, B-I, C-II, D-IV',
      optD: 'A-IV, B-II, C-III, D-I'
    };
  }

  if (qNum === 22) {
    return {
      questionText: `Match List - I with List - II.

| List - I | List - II |
| :--- | :--- |
| (A) Typhoid | (I) Protozoan |
| (B) Elephantiasis | (II) Salmonella |
| (C) Ringworm | (III) Aschelminthes |
| (D) Malaria | (IV) Microsporum |

Choose the correct answer from the options given below :`,
      optA: '(A)-(I), (B)-(IV), (C)-(III), (D)-(II)',
      optB: '(A)-(I), (B)-(III), (C)-(IV), (D)-(II)',
      optC: '(A)-(II), (B)-(III), (C)-(IV), (D)-(I)',
      optD: '(A)-(II), (B)-(IV), (C)-(III), (D)-(I)'
    };
  }

  if (qNum === 23) {
    return {
      questionText: `Match List-I with List-II.

| List - I | List - II |
| :--- | :--- |
| (A) Cytokine barriers | (I) Mucus coating of respiratory tract |
| (B) Cellular barriers | (II) Interferons |
| (C) Physiological barriers | (III) Neutrophils and Macrophages |
| (D) Physical barriers | (IV) Tears and Saliva |

Choose the correct answer from the options given below :`,
      optA: '(A)-(II), (B)-(III), (C)-(IV), (D)-(I)',
      optB: '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)',
      optC: '(A)-(III), (B)-(I), (C)-(II), (D)-(IV)',
      optD: '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)'
    };
  }

  if (qNum === 24) {
    return {
      questionText: `In which blood corpuscles, the HIV undergoes replication and produces progeny viruses?`,
      optA: 'B-lymphocytes',
      optB: 'Basophils',
      optC: 'Eosinophils',
      optD: '$\\text{T}_\\text{H}$ cells'
    };
  }

  if (qNum === 25) {
    return {
      questionText: `Match List I with List II.

| List I | List II |
| :--- | :--- |
| (A) Heroin | (I) Effect on cardiovascular system |
| (B) Marijuana | (II) Slow down body function |
| (C) Cocaine | (III) Painkiller |
| (D) Morphine | (IV) Interfere with transport of dopamine |

Choose the correct answer from the options given below:`,
      optA: 'A-I, B-II, C-III, D-IV',
      optB: 'A-IV, B-III, C-II, D-I',
      optC: 'A-III, B-IV, C-I, D-II',
      optD: 'A-II, B-I, C-IV, D-III'
    };
  }

  if (qNum === 26) {
    return {
      questionText: `Match List I with List II.

| List I | List II |
| :--- | :--- |
| (A) Ringworm | (I) Haemophilus influenzae |
| (B) Filariasis | (II) Trichophyton |
| (C) Malaria | (III) Wuchereria bancrofti |
| (D) Pneumonia | (IV) Plasmodium vivax |

Choose the correct answer from the options given below:`,
      optA: 'A-II, B-III, C-I, D-IV',
      optB: 'A-III, B-II, C-I, D-IV',
      optC: 'A-III, B-II, C-IV, D-I',
      optD: 'A-II, B-III, C-IV, D-I'
    };
  }

  if (qNum === 28) {
    return {
      questionText: `Match List - I with List - II :

| List - I | List - II |
| :--- | :--- |
| (a) Cellular barrier | (i) Interferons |
| (b) Cytokine barrier | (ii) Mucus |
| (c) Physical barrier | (iii) Neutrophils |
| (d) Physiological barrier | (iv) HCl in gastric juice |

Choose the correct answer from the options given below :`,
      optA: '(a) - (iii), (b) - (i), (c) - (ii), (d) - (iv)',
      optB: '(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)',
      optC: '(a) - (ii), (b) - (iii), (c) - (i), (d) - (iv)',
      optD: '(a) - (iii), (b) - (iv), (c) - (ii), (d) - (i)'
    };
  }

  if (qNum === 31) {
    return {
      questionText: `Match List-I with List-II:

| List-I | List-II |
| :--- | :--- |
| (a) Filariasis | (i) Haemophilus influenzae |
| (b) Amoebiasis | (ii) Trichophyton |
| (c) Pneumonia | (iii) Wuchereria bancrofti |
| (d) Ringworm | (iv) Entamoeba histolytica |

Choose the correct answer from the options given below:`,
      optA: '(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)',
      optB: '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)',
      optC: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      optD: '(a)-(i), (b)-(ii), (c)-(iv), (d)-(iii)'
    };
  }

  if (qNum === 33) {
    return {
      questionText: `Match the following columns and select the correct option :

| Column - I | Column - II |
| :--- | :--- |
| (i) Typhoid | (a) Haemophilus influenzae |
| (ii) Malaria | (b) Wuchereria bancrofti |
| (iii) Pneumonia | (c) Plasmodium vivax |
| (iv) Filariasis | (d) Salmonella typhi |

Choose the correct option:`,
      optA: '(i)-(a), (ii)-(b), (iii)-(d), (iv)-(c)',
      optB: '(i)-(d), (ii)-(c), (iii)-(a), (iv)-(b)',
      optC: '(i)-(c), (ii)-(d), (iii)-(b), (iv)-(a)',
      optD: '(i)-(a), (ii)-(c), (iii)-(b), (iv)-(d)'
    };
  }

  if (qNum === 34) {
    return {
      questionText: `Match the following diseases with the causative organism and select the correct option:

| Column-I | Column-II |
| :--- | :--- |
| (a) Typhoid | (i) Wuchereria |
| (b) Pneumonia | (ii) Plasmodium |
| (c) Filariasis | (iii) Salmonella |
| (d) Malaria | (iv) Haemophilus |

Choose the correct option:`,
      optA: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)',
      optB: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      optC: '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)',
      optD: '(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)'
    };
  }

  if (qNum === 58) {
    return {
      questionText: `Match each disease with its correct type of vaccine:

| Column I | Column II |
| :--- | :--- |
| A. Tuberculosis | (i) Harmless virus |
| B. Whooping cough | (ii) Inactivated toxin |
| C. Diphtheria | (iii) Killed bacteria |
| D. Polio | (iv) Harmless bacteria |

Choose the correct option:`,
      optA: 'A - (i), B - (ii), C - (iv), D - (iii)',
      optB: 'A - (iv), B - (iii), C - (ii), D - (i)',
      optC: 'A - (ii), B - (i), C - (iii), D - (iv)',
      optD: 'A - (iii), B - (ii), C - (iv), D - (i)'
    };
  }

  if (qNum === 61) {
    return {
      questionText: `Which is the particular type of drug that is obtained from the plant whose one flowering branch is shown below?

![Datura flowering branch](${diagramUrls.q_61})`,
      optA: 'Hallucinogen',
      optB: 'Stimulant',
      optC: 'Depressant',
      optD: 'Pain-killer'
    };
  }

  if (qNum === 68) {
    return {
      questionText: `Identify the molecules (a) and (b) shown below and select the right option giving their source and use.

![Molecules (a) and (b)](${diagramUrls.q_68})`,
      optA: 'Molecule (b) Heroin; Source: Cannabis sativa; Use: Depressant and slows down body functions',
      optB: 'Molecule (a) Morphine; Source: Papaver somniferum; Use: Sedative and pain killer',
      optC: 'Molecule (a) Cocaine; Source: Erythroxylum coca; Use: Accelerates the transport of dopamine',
      optD: 'Molecule (b) Cannabinoid; Source: Atropa belladona; Use: Produces hallucinations'
    };
  }

  if (qNum === 69) {
    return {
      questionText: `Which one of the following sets of items in the option A – D are correctly categorized with one exception in it ?

| | ITEMS | CATEGORY | EXCEPTION |
| :--- | :--- | :--- | :--- |
| (A) | Kangaroo, Koala, wombat | Australian marsupials | Wombat |
| (B) | Typhoid, Pneumonia, Diphtheria | Bacterial diseases | Diphtheria |
| (C) | UAA, UAG, UGA | Stop codons | UAG |
| (D) | Plasmodium, Cuscuta, Trypanosoma | Protozoan parasites | Cuscuta |`,
      optA: 'Kangaroo, Koala, wombat — Australian marsupials (Exception: Wombat)',
      optB: 'Typhoid, Pneumonia, Diphtheria — Bacterial diseases (Exception: Diphtheria)',
      optC: 'UAA, UAG, UGA — Stop codons (Exception: UAG)',
      optD: 'Plasmodium, Cuscuta, Trypanosoma — Protozoan parasites (Exception: Cuscuta)'
    };
  }

  if (qNum === 77) {
    return {
      questionText: `In which one of the following options the two examples are correctly matched with their particular type of immunity?

| Option | Examples | Types of immunity |
| :--- | :--- | :--- |
| (A) | Polymorphonuclear leukocytes and monocytes | Cellular barriers |
| (B) | Anti-tetanus and antisnake bite injection | Active immunity |
| (C) | Saliva in mouth and Tear in eyes | Physical barriers |
| (D) | Mucus coating of epithelium lining the urinogenital tract and the HCl in stomach | Physiological barriers |`,
      optA: 'Polymorphonuclear leukocytes and monocytes — Cellular barriers',
      optB: 'Anti-tetanus and antisnake bite injection — Active immunity',
      optC: 'Saliva in mouth and Tear in eyes — Physical barriers',
      optD: 'Mucus coating of epithelium lining the urinogenital tract and HCl in stomach — Physiological barriers'
    };
  }

  if (qNum === 78) {
    return {
      questionText: `Which one of the following options gives the correct matching of a disease with its causative organism and mode of infection ?`,
      optA: 'Disease: Pneumonia | Causative Organism: Streptococcus pneumoniae | Mode of Infection: Droplet infection',
      optB: 'Disease: Malaria | Causative Organism: Plasmodium vivax | Mode of Infection: Bite of male Anopheles mosquito',
      optC: 'Disease: Elephantiasis | Causative Organism: Wuchereria bancrofti | Mode of Infection: With infected water and food',
      optD: 'Disease: Typhoid | Causative Organism: Salmonella typhi | Mode of Infection: With inspired air'
    };
  }

  if (qNum === 98) {
    return {
      questionText: `Match the disease in Column I with the appropriate items (pathogen/ prevention/ treatment) in Column II:

| Column I | Column II |
| :--- | :--- |
| (A) Amoebiasis | (i) Treponema pallidum |
| (B) Diphtheria | (ii) Use only sterilized food |
| (C) Cholera | (iii) DPT Vaccine |
| (D) Syphilis | (iv) Use oral rehydration |

Choose the correct option:`,
      optA: 'A = (ii), B = (iv), C = (i), D = (iii)',
      optB: 'A = (i), B = (ii), C = (iii), D = (iv)',
      optC: 'A = (ii), B = (i), C = (iii), D = (iv)',
      optD: 'A = (ii), B = (iii), C = (iv), D = (i)'
    };
  }

  if (qNum === 117) {
    return {
      questionText: `Which of the following is used in the treatment of thyroid cancer?`,
      optA: 'I-131',
      optB: 'U-238',
      optC: 'Ra-224',
      optD: 'C-14'
    };
  }

  if (qNum === 171) {
    return {
      questionText: `Diacetyl morphine is also called as :`,
      optA: 'Amphetamine',
      optB: 'Barbiturate',
      optC: 'Crack',
      optD: 'Smack'
    };
  }

  // Standard sequential search for options
  const dMatches = [...fullText.matchAll(/(?:^|\s|\n)\(D\)\s+/g)];
  if (!dMatches.length) return null;
  const lastD = dMatches[dMatches.length - 1];
  const dIdx = lastD.index + lastD[0].indexOf('(D)');
  
  const cMatches = [...fullText.slice(0, dIdx).matchAll(/(?:^|\s|\n)\(C\)\s+/g)];
  if (!cMatches.length) return null;
  const lastC = cMatches[cMatches.length - 1];
  const cIdx = lastC.index + lastC[0].indexOf('(C)');
  
  const bMatches = [...fullText.slice(0, cIdx).matchAll(/(?:^|\s|\n)\(B\)\s+/g)];
  if (!bMatches.length) return null;
  const lastB = bMatches[bMatches.length - 1];
  const bIdx = lastB.index + lastB[0].indexOf('(B)');
  
  const aMatches = [...fullText.slice(0, bIdx).matchAll(/(?:^|\s|\n)\(A\)\s+/g)];
  if (!aMatches.length) return null;
  const lastA = aMatches[aMatches.length - 1];
  const aIdx = lastA.index + lastA[0].indexOf('(A)');
  
  let questionText = fullText.slice(0, aIdx).trim();
  let optA = fullText.slice(aIdx + 3, bIdx).trim().replace(/^[\s:]+/, '');
  let optB = fullText.slice(bIdx + 3, cIdx).trim().replace(/^[\s:]+/, '');
  let optC = fullText.slice(cIdx + 3, dIdx).trim().replace(/^[\s:]+/, '');
  let optD = fullText.slice(dIdx + 3).trim().replace(/^[\s:]+/, '');
  
  return { questionText, optA, optB, optC, optD };
}

async function main() {
  const allQuestions = [];
  const failed = [];

  for (let i = 0; i < qBlocks.length; i++) {
    const current = qBlocks[i];
    const next = qBlocks[i + 1];
    const blockLines = lines.slice(current.startLine, next ? next.startLine : lines.length);
    const parsed = parseBlock(blockLines, current.num);

    if (!parsed) {
      failed.push(current.num);
      continue;
    }

    const correctKey = officialKeys[String(current.num)];
    if (!correctKey) {
      throw new Error(`Missing official key for Q${current.num}`);
    }

    let image = '';
    if (current.num === 61) image = diagramUrls.q_61;
    if (current.num === 68) image = diagramUrls.q_68;

    allQuestions.push({
      num: current.num,
      exam: current.headerExam,
      question: parsed.questionText,
      options: [
        { id: 'A', text: parsed.optA },
        { id: 'B', text: parsed.optB },
        { id: 'C', text: parsed.optC },
        { id: 'D', text: parsed.optD }
      ],
      correctOption: correctKey,
      explanation: '',
      image: image
    });
  }

  if (failed.length > 0) {
    console.error('Failed to parse question numbers:', failed);
    for (const f of failed) {
      const idx = qBlocks.findIndex(b => b.num === f);
      const b = qBlocks[idx];
      const nextB = qBlocks[idx + 1];
      console.log(`\n--- Block lines for Q${f} ---`);
      console.log(lines.slice(b.startLine, nextB ? nextB.startLine : lines.length).join('\n'));
    }
    process.exit(1);
  }

  console.log(`Successfully parsed all ${allQuestions.length} questions!`);
  const outFile = path.resolve(__dirname, 'human_health_all_questions.json');
  fs.writeFileSync(outFile, JSON.stringify(allQuestions, null, 2));
  console.log(`Saved output to ${outFile}`);
}

main().catch(console.error);
