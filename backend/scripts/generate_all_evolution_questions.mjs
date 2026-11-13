import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'evolution_pages_dump.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'evolution_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'evolution_diagram_urls.json'), 'utf8'));

// Build continuous clean lines from pages 2 to 37 (indices 1 to 36)
const lines = [];
for (let p = 1; p <= 36; p++) {
  const plines = pages[p].lines;
  for (let l of plines) {
    if (
      l.includes('Exam GOAL') ||
      l.includes('P Y Q   P D F') ||
      l.includes('Keep practising on the ExamGOAL app') ||
      l.includes('Chapter-wise PYQs with solutions') ||
      l.includes('NEET Biology: Evolution') ||
      (!l.startsWith('Q') && (l.includes('MCQ (Single Correct Answer)') || l.includes('MCQ (More than One Correct Answer)')))
    ) {
      continue;
    }
    const cleaned = l.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      lines.push(cleaned);
    }
  }
}

// Slice into 189 blocks
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

function parseBlock(blockLines, qNum) {
  const fullText = blockLines.slice(1).join('\n');

  // Custom handlers for match questions, diagram questions, and special cases
  if (qNum === 8) {
    return {
      questionText: `Match List I with List II with respect to chronology of evolution of life forms:

| List-I | List-II |
| :--- | :--- |
| A. About 65 mya | I. Jawless fish probably evolved |
| B. About 500 mya | II. The dinosaurs suddenly disappeared from the earth |
| C. About 350 mya | III. Seaweeds and few plants probably existed |
| D. About 320 mya | IV. Invertebrates were formed and became active |

Choose the correct answer from the options given below:`,
      optA: 'A(III), B(IV), C(I), D(II)',
      optB: 'A(I), B(II), C(III), D(IV)',
      optC: 'A(II), B(IV), C(III), D(I)',
      optD: 'A(II), B(IV), C(I), D(III)'
    };
  }

  if (qNum === 11) {
    return {
      questionText: `Match List-I with List-II :

| List - I | List - II |
| :--- | :--- |
| (A) Gene pool | (I) Stable within a generation |
| (B) Genetic drift | (II) Change in gene frequency by chance |
| (C) Gene flow | (III) Transfer of genes into or out of population |
| (D) Gene frequency | (IV) Total number of genes and their alleles |

Choose the correct answer from the options given below :`,
      optA: 'A-III, B-II, C-I, D-IV',
      optB: 'A-IV, B-II, C-III, D-I',
      optC: 'A-I, B-II, C-III, D-IV',
      optD: 'A-II, B-III, C-IV, D-I'
    };
  }

  if (qNum === 12) {
    return {
      questionText: `Which evolutionary phenomenon is depicted by the sketch given in figure?

![Adaptive Radiation of Darwin Finches](${diagramUrls.q_12})`,
      optA: 'Artificial selection',
      optB: 'Genetic drift',
      optC: 'Convergent evolution',
      optD: 'Adaptive radiation'
    };
  }

  if (qNum === 13) {
    return {
      questionText: `Match List-I with List-II with respect to convergent evolution:

| List - I | List - II |
| :--- | :--- |
| (A) Lemur | (I) Flying phalanger |
| (B) Bobcat | (II) Numbat |
| (C) Anteater | (III) Spotted cuscus |
| (D) Flying squirrels | (IV) Tasmanian tiger cat |

Choose the correct answer from the options given below:`,
      optA: 'A-III, B-IV, C-II, D-I',
      optB: 'A-III, B-II, C-IV, D-I',
      optC: 'A-IV, B-III, C-II, D-I',
      optD: 'A-IV, B-II, C-III, D-I'
    };
  }

  if (qNum === 14) {
    return {
      questionText: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| (A) Living Fossil | (I) Elongated canine teeth |
| (B) Connecting Link | (II) Vermiform appendix |
| (C) Vestigial Organ | (III) Echidna |
| (D) Atavism | (IV) Latimeria |

Choose the correct answer from the options given below:`,
      optA: 'A-IV, B-III, C-II, D-I',
      optB: 'A-IV, B-II, C-III, D-I',
      optC: 'A-IV, B-III, C-I, D-II',
      optD: 'A-III, B-IV, C-I, D-II'
    };
  }

  if (qNum === 19) {
    return {
      questionText: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Mesozoic Era | I. Lower invertebrates |
| B. Proterozoic Era | II. Fish & Amphibia |
| C. Cenozoic Era | III. Birds & Reptiles |
| D. Paleozoic Era | IV. Mammals |

Choose the correct answer from the options given below :`,
      optA: 'A-II, B-I, C-III, D-IV',
      optB: 'A-III, B-I, C-II, D-IV',
      optC: 'A-I, B-II, C-IV, D-III',
      optD: 'A-III, B-I, C-IV, D-II'
    };
  }

  if (qNum === 27) {
    return {
      questionText: `Match List-I with List-II.

| List-I | List-II |
| :--- | :--- |
| (a) Adaptive radiation | (i) Selection of resistant varieties due to excessive use of herbicides and pesticides |
| (b) Convergent evolution | (ii) Bones of forelimbs in Man and Whale |
| (c) Divergent evolution | (iii) Wings of Butterfly and Bird |
| (d) Evolution by anthropogenic action | (iv) Darwin Finches |

Choose the correct answer from the options given below:`,
      optA: '(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)',
      optB: '(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)',
      optC: '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)',
      optD: '(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)'
    };
  }

  if (qNum === 41) {
    return {
      questionText: `Match the hominids with their correct brain size:

| Hominid | Brain size |
| :--- | :--- |
| (a) Homo habilis | (i) 900 cc |
| (b) Homo neanderthalensis | (ii) 1350 cc |
| (c) Homo erectus | (iii) 650-800 cc |
| (d) Homo sapiens | (iv) 1400 cc |

Select the correct option:`,
      optA: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)',
      optB: '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)',
      optC: '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)',
      optD: '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)'
    };
  }

  if (qNum === 47) {
    return {
      questionText: `In Hardy-Weinberg equation, the frequency of heterozygous individual is represented by`,
      optA: 'pq',
      optB: 'p^2',
      optC: '2pq',
      optD: 'q^2'
    };
  }

  if (qNum === 48) {
    return {
      questionText: `The chronological order of human evolution from early to the recent is`,
      optA: 'Ramapithecus → Homo habilis → Australopithecus → Homo erectus',
      optB: 'Australopithecus → Ramapithecus → Homo habilis → Homo erectus',
      optC: 'Ramapithecus → Australopithecus → Homo habilis → Homo erectus',
      optD: 'Australopithecus → Homo habilis → Ramapithecus → Homo erectus'
    };
  }

  if (qNum === 132) {
    return {
      questionText: `Half life period of C^14 is : -`,
      optA: '5000 years',
      optB: '50 years',
      optC: '500 years',
      optD: '5 × 10^4 years'
    };
  }

  if (qNum === 151) {
    return {
      questionText: `The age of the fossil of Dryopithecus on the geological time scale is`,
      optA: '75 × 10^6 years back',
      optB: '25 × 10^6 years back',
      optC: '2.5 × 10^6 years back',
      optD: '50 × 10^6 years back'
    };
  }

  if (qNum === 163) {
    return {
      questionText: `The correct sequence for the manufacture of molecules/organic compounds on the primitive earth is`,
      optA: 'NH3, nucleic acid, protein and carbohydrate',
      optB: 'protein, carbohydrate, water and nucleic acid',
      optC: 'NH3, protein, carbohydrate and nucleic acid',
      optD: 'NH3, water, nucleic acid and protein'
    };
  }

  if (qNum === 179) {
    return {
      questionText: `Which was absent in the atmosphere at the time of origin of life?`,
      optA: 'NH3',
      optB: 'H2',
      optC: 'O2',
      optD: 'CH4'
    };
  }

  if (qNum === 180) {
    return {
      questionText: `Correct order is`,
      optA: 'Palaeozoic → archaeozoic → coenozoic',
      optB: 'Archaeozoic → palaeozoic → proterozoic',
      optC: 'Palaeozoic → mesozoic → coenozoic',
      optD: 'Mesozoic → archaeozoic → proterozoic'
    };
  }

  if (qNum === 189) {
    return {
      questionText: `Which one of the following are analogous structures?`,
      optA: 'Flippers of Dolphin and Legs of Horse',
      optB: 'Thorns of Bougainvillea and Tendrils of Cucurbita',
      optC: 'Wings of Bat and Wings of Pigeon',
      optD: 'Gills of Prawn and Lungs of Man'
    };
  }

  // Standard backward/sequential search for options
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

  for (let i = 0; i < qBlocks.length; i++) {
    const current = qBlocks[i];
    const next = qBlocks[i + 1];
    const blockLines = lines.slice(current.startLine, next ? next.startLine : lines.length);
    const parsed = parseBlock(blockLines, current.num);

    if (!parsed) {
      throw new Error(`Failed to parse Q${current.num}`);
    }

    const correctKey = officialKeys[String(current.num)];
    if (!correctKey) {
      throw new Error(`Missing official key for Q${current.num}`);
    }

    let image = '';
    if (current.num === 12) {
      image = diagramUrls.q_12;
    }

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
      explanation: '', // Will be enriched in step 2
      image: image
    });
  }

  console.log(`Successfully parsed all ${allQuestions.length} questions!`);
  const outFile = path.resolve(__dirname, 'evolution_all_questions.json');
  fs.writeFileSync(outFile, JSON.stringify(allQuestions, null, 2));
  console.log(`Saved output to ${outFile}`);
}

main().catch(console.error);
