import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/pk_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/pk_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/pk_diagram_urls.json', 'utf8'));

// Filter lines
const clean = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (/^=== PAGE \d+ ===$/.test(line)) continue;
  if (/^Exam\s*GOAL$/i.test(line)) continue;
  if (/^P\s*Y\s*Q\s*P\s*D\s*F$/i.test(line)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(line)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(line)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(line)) continue;
  if (/^NEET Biology: Plant Kingdom/i.test(line)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(line)) continue;
  if (/^GET IT ON Google Play/i.test(line)) continue;
  if (/^Open solution$/i.test(line)) continue;
  if (/^Out of syllabus/i.test(line)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(line)) continue;
  clean.push(line);
}

// Group into question blocks
const qBlocks = [];
let currentBlock = null;

for (const line of clean) {
  const match = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (match) {
    if (currentBlock) qBlocks.push(currentBlock);
    currentBlock = {
      qNum: parseInt(match[1], 10),
      header: match[2],
      lines: []
    };
  } else if (currentBlock) {
    currentBlock.lines.push(line);
  }
}
if (currentBlock) qBlocks.push(currentBlock);

const allQuestions = [];

for (const b of qBlocks) {
  let qNum = b.qNum;
  let header = b.header;
  let keyLetter = officialKeys[qNum];
  let correctIndex = ['A', 'B', 'C', 'D'].indexOf(keyLetter);
  let imageUrl = diagramUrls[qNum] || '';

  let questionText = '';
  let options = [];

  if (qNum === 7) {
    questionText = "Given below are the stages in the life cycle of pteridophytes. Arrange the following stages in the correct sequence.\n\nA. Prothallus stage\nB. Meiosis in spore mother cells\nC. Fertilisation\nD. Formation of archegonia and antheridia in gametophyte.\nE. Transfer of antherozoids to the archegonia in presence of water.\n\nChoose the correct answer from the options given below:";
    options = [
      "D, E, C, A, B",
      "E, D, C, B, A",
      "B, A, D, E, C",
      "B, A, E, C, D"
    ];
  } else if (qNum === 5) {
    questionText = "Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Pteridophyte | I. Salvia |\n| B. Bryophyte | II. Ginkgo |\n| C. Angiosperm | III. Polytrichum |\n| D. Gymnosperm | IV. Salvinia |\n\nChoose the option with all correct matches.";
    options = [
      "A-III, B-IV, C-I, D-II",
      "A-IV, B-III, C-II, D-I",
      "A-III, B-IV, C-II, D-I",
      "A-IV, B-III, C-I, D-II"
    ];
  } else if (qNum === 13) {
    questionText = "Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| (A) Pteropsida | (I) Psilotum |\n| (B) Lycopsida | (II) Equisetum |\n| (C) Psilopsida | (III) Adiantum |\n| (D) Sphenopsida | (IV) Selaginella |\n\nChoose the correct answer from the options given below :";
    options = [
      "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
      "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
      "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)",
      "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"
    ];
  } else if (qNum === 18) {
    questionText = "Match List-I with List-II :\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) Chlamydomonas | (i) Moss |\n| (b) Cycas | (ii) Pteridophyte |\n| (c) Selaginella | (iii) Alga |\n| (d) Sphagnum | (iv) Gymnosperm |\n\nChoose the correct answer from the options given below :";
    options = [
      "(a) - (ii), (b) - (iii), (c) - (i), (d) - (iv)",
      "(a) - (iii), (b) - (i), (c) - (ii), (d) - (iv)",
      "(a) - (iii), (b) - (iv), (c) - (ii), (d) - (i)",
      "(a) - (iii), (b) - (ii), (c) - (i), (d) - (iv)"
    ];
  } else if (qNum === 22) {
    questionText = "Match the plant with the kind of life cycle it exhibits:\n\n| List - I | List - II |\n| :--- | :--- |\n| (a) Spirogyra | (i) Dominant diploid sporophyte vascular plant, with highly reduced male or female gametophyte |\n| (b) Fern | (ii) Dominant haploid free-living gametophyte |\n| (c) Funaria | (iii) Dominant diploid sporophyte alternating with reduced gametophyte called prothallus |\n| (d) Cycas | (iv) Dominant haploid leafy gametophyte alternating with partially dependent multicellular sporophyte |\n\nChoose the correct answer from the options given below :";
    options = [
      "(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)",
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)"
    ];
  } else if (qNum === 96) {
    questionText = "Match items in column I with those in column II.\n\n| Column I | Column II |\n| :--- | :--- |\n| (A) Peritrichous flagellation | (J) Ginkgo |\n| (B) Living fossil | (K) Macrocystis |\n| (C) Rhizophore | (L) Escherichia coli |\n| (D) Smallest flowering plant | (M) Selaginella |\n| (E) Largest perennial alga | (N) Wolffia |\n\nSelect the correct answer from the following.";
    options = [
      "(A) - (L); (B) - (J); (C) - (M); (D) - (N); (E) - (K)",
      "(A) - (K); (B) - (J); (C) - (L); (D) - (M); (E) - (N)",
      "(A) - (N); (B) - (L); (C) - (K); (D) - (N); (E) - (J)",
      "(A) - (J); (B) - (K); (C) - (N); (D) - (L); (E) - (K)"
    ];
  } else {
    // Normal question parsing
    let aIdx = -1;
    for (let i = 0; i < b.lines.length; i++) {
      const l = b.lines[i];
      if (/^\(A\)\s+/.test(l) || /\s\(A\)\s+/.test(l)) {
        const rest = b.lines.slice(i).join(' ');
        if (rest.includes('(B)') && rest.includes('(C)') && rest.includes('(D)')) {
          aIdx = i;
          break;
        }
      }
    }

    if (aIdx !== -1) {
      questionText = b.lines.slice(0, aIdx).join('\n').trim();
      const optStr = b.lines.slice(aIdx).join('\n');
      const parts = optStr.split(/(?=\([A-D]\))/);
      let curKey = null;
      let optMap = { A: '', B: '', C: '', D: '' };
      for (const p of parts) {
        const m = p.match(/^\(([A-D])\)\s*([\s\S]*)/);
        if (m) {
          curKey = m[1];
          optMap[curKey] = (optMap[curKey] + ' ' + m[2]).trim();
        } else if (curKey) {
          optMap[curKey] = (optMap[curKey] + ' ' + p).trim();
        }
      }
      options = [optMap.A, optMap.B, optMap.C, optMap.D].map(o => o.trim());
    } else {
      questionText = b.lines.join('\n');
    }
  }

  // Solution generation
  const correctOptionText = options[correctIndex] || '';
  let solution = `Correct Answer: Option (${keyLetter})${correctOptionText ? ` - ${correctOptionText}` : ''}.`;
  if (qNum === 1) solution += ` In gymnosperms, male and female gametophytes do not have an independent free-living existence; they remain within the sporangia retained on sporophytes. Gymnosperms have naked seeds (not enclosed within an ovary wall/fruit).`;
  else if (qNum === 2) solution += ` Sphenopsida is a class of Pteridophytes (e.g., Equisetum - horsetail).`;
  else if (qNum === 3) solution += ` Pinus is a gymnosperm in which the ovules are naked and not enclosed by an ovary wall.`;
  else if (qNum === 4) solution += ` Gymnosperms are seed-bearing non-flowering plants where seeds are naked and not enclosed in fruits.`;
  else if (qNum === 5) solution += ` Salvinia is a pteridophyte (A-IV), Polytrichum is a moss/bryophyte (B-III), Salvia is an angiosperm (C-I), and Ginkgo is a gymnosperm (D-II).`;
  else if (qNum === 6) solution += ` Gemmae are green, multicellular, asexual buds which develop in gemma cups located on the thallus in bryophytes (e.g., Marchantia) for asexual reproduction.`;
  else if (qNum === 7) solution += ` Life cycle sequence in pteridophytes: Meiosis in spore mother cells (B) -> Haploid spores germinate into free-living prothallus gametophyte (A) -> Development of sex organs archegonia and antheridia (D) -> Transfer of biflagellate/multiflagellate antherozoids to archegonium in presence of water (E) -> Fertilisation forming diploid zygote (C).`;
  else if (qNum === 8) solution += ` In bryophytes: Attachment of gametophyte to substratum (B) -> Release of flagellated antherozoids into water (E) -> Fusion of antherozoid with egg in archegonium (A) -> Formation of sporophyte (D) -> Reduction division in capsule to produce haploid spores (C).`;
  else if (qNum === 9) solution += ` Gymnosperms lack true xylem vessels (except in Gnetales) and companion cells in phloem (they have albuminous cells and sieve cells).`;
  else if (qNum === 10) solution += ` Adiantum belongs to Pteropsida (ferns), not Sphenopsida. Equisetum belongs to Sphenopsida.`;
  else if (qNum === 11) solution += ` Cedrus, Pinus, and Sequoia (giant redwood) are all gymnosperms.`;
  else if (qNum === 12) solution += ` In Phaeophyceae (brown algae): zoospores are biflagellate (pyriform with two unequal lateral flagella), food stored as mannitol/laminarin, major pigments are chlorophyll a, c, carotenoids, fucoxanthin, and cell wall has cellulose and algin. Sexual reproduction can be isogamous, anisogamous, or oogamous (not oogamous only). Hence statements A, C, D, and E are correct.`;
  else if (qNum === 14) solution += ` Brown algae (Phaeophyceae) possess fucoxanthin, and red algae (Rhodophyceae) possess phycoerythrin.`;
  else if (qNum === 15) solution += ` Selaginella and Salvinia are heterosporous pteridophytes producing microspores and megaspores.`;
  else if (qNum === 16) solution += ` The first stage of moss gametophyte is protonema, which develops directly from spores produced in the capsule. Both A and R are true and R correctly explains A.`;
  else if (qNum === 17) solution += ` In gymnosperms, pollen grains are carried by air currents, germinate and form pollen tube to deliver male gametes to archegonia. Thus Reason R is false.`;
  else if (qNum === 18) solution += ` Chlamydomonas is a green alga (iii), Cycas is a gymnosperm (iv), Selaginella is a pteridophyte (ii), and Sphagnum is a moss (i).`;
  else if (qNum === 19) solution += ` The diagram shows Chara (stonewort), a green alga belonging to Chlorophyceae, storing food as starch, and bearing globule (antheridium) and nucule (oogonium).`;
  else if (qNum === 20) solution += ` Carrageen is a hydrocolloid (phycocolloid) extracted from red algae (Rhodophyceae, e.g., Chondrus crispus).`;
  else if (qNum === 70) solution += ` In Marchantia female thallus: A = Archegoniophore, B = Female thallus, C = Gemma cup, D = Rhizoids.`;
  else if (qNum === 76) solution += ` In the given figures: A = Selaginella, B = Equisetum, C = Salvinia, D = Ginkgo.`;

  allQuestions.push({
    q_num: qNum,
    exam: header,
    text: questionText,
    options,
    correct_index: correctIndex,
    correct_indices: [correctIndex],
    solution,
    image_url: imageUrl,
    marks: 4,
    difficulty: 'medium',
    status: 'normal',
    topic: 'Plant Kingdom'
  });
}

console.log(`Parsed ${allQuestions.length} complete questions.`);
fs.writeFileSync('./backend/scripts/pk_all_questions.json', JSON.stringify(allQuestions, null, 2));

const invalid = allQuestions.filter(q => !q.text || q.options.length !== 4 || q.correct_index === -1);
console.log('Invalid questions count:', invalid.length);
if (invalid.length > 0) {
  console.log('Invalid questions:', invalid.map(i => i.q_num));
}
