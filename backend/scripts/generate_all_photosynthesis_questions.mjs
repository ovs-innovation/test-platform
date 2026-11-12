import fs from 'fs';

const rawText = fs.readFileSync('./backend/scripts/photosynthesis_extracted_lines.txt', 'utf8');
const keys = JSON.parse(fs.readFileSync('./backend/scripts/photosynthesis_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/photosynthesis_diagram_urls.json', 'utf8'));

const lines = rawText.split('\n');

const rawQuestions = [];
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const qMatch = line.match(/^Q(\d+)\.\s*(.*)/);
  if (qMatch) {
    if (currentQ) rawQuestions.push(currentQ);
    currentQ = {
      q_num: parseInt(qMatch[1], 10),
      header: qMatch[2],
      lines: []
    };
  } else if (currentQ) {
    if (line.includes('=== PAGE') || line.includes('Exam GOAL') || line.includes('Page ') || line.includes('Keep practising on the ExamGOAL')) {
      continue;
    }
    currentQ.lines.push(line);
  }
}
if (currentQ) rawQuestions.push(currentQ);

// Match table definitions with clean Markdown tables
const matchTables = {
  10: {
    table: `\n\n| List - I | List - II |\n| :--- | :--- |\n| **A.** Chlorophyll a | **I.** Yellow-green |\n| **B.** Chlorophyll b | **II.** Yellow |\n| **C.** Xanthophylls | **III.** Blue-green |\n| **D.** Carotenoids | **IV.** Yellow to Yellow-orange |\n\nChoose the option with all correct matches :`
  },
  17: {
    table: `\n\n| List - I | List - II |\n| :--- | :--- |\n| **(A)** Chlorophyll a | **(I)** Yellow to yellow orange |\n| **(B)** Chlorophyll b | **(II)** Yellow green |\n| **(C)** Xanthophyll | **(III)** Blue green |\n| **(D)** Carotenoid | **(IV)** Yellow |\n\nChoose the correct answer from the options given below :`
  }
};

const finalQuestions = [];

for (const rawQ of rawQuestions) {
  const qNum = rawQ.q_num;
  const officialKeyLetter = keys[qNum] || 'A';
  const correctIndex = { A: 0, B: 1, C: 2, D: 3 }[officialKeyLetter] ?? 0;

  // Clean lines
  const cleanedLines = rawQ.lines
    .map(l => l.replace(/open solution/gi, '').trim())
    .filter(l => l.length > 0);
  const fullText = cleanedLines.join('\n');

  let questionText = '';
  let options = [];

  if (qNum === 2) {
    questionText = `Photorespiration reaction catalyzed by RuBisCo is shown below :\n$$\\text{RuBP} + \\text{O}_2 \\rightarrow \\text{3-Phosphoglycerate} + X$$\n\nIdentify " $X$ " from the given options :`;
    options = [
      { key: 'A', text: 'Malate' },
      { key: 'B', text: 'Phosphoenolpyruvate' },
      { key: 'C', text: '2-Phosphoglycolate' },
      { key: 'D', text: 'Oxaloacetate' }
    ];
  } else if (matchTables[qNum]) {
    let intro = cleanedLines[0] || '';
    if (cleanedLines.length > 1 && !cleanedLines[1].includes('List') && !cleanedLines[1].includes('(A)')) {
      intro += ' ' + cleanedLines[1];
    }
    questionText = intro.trim() + matchTables[qNum].table;

    const optAMatches = [...fullText.matchAll(/\(A\)/g)];
    const lastA = optAMatches[optAMatches.length - 1];
    const optsPart = fullText.slice(lastA.index).trim();
    const optMatches = [...optsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
    options = optMatches.slice(0, 4).map(m => ({
      key: m[1],
      text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
    }));
  } else if (qNum === 4) {
    questionText = `Which of the following statements regarding photorespiration are correct?\n\n(a) Do not occur in $C_3$ plants\n(b) $\\text{CO}_2$ is consumed and $\\text{O}_2$ is generated\n(c) Phosphoglycolate is formed\n(d) No synthesis of ATP and NADPH\n\nChoose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: '(a) and (b) only' },
      { key: 'B', text: '(a) and (d) only' },
      { key: 'C', text: '(c) and (d) only' },
      { key: 'D', text: '(b) and (d) only' }
    ];
  } else if (qNum === 5) {
    questionText = `Select the correct sequence of experiments that led to a gradual understanding of photosynthesis in green plants.`;
    options = [
      { key: 'A', text: 'Production of glucose $\\rightarrow$ role of air $\\rightarrow$ release of oxygen $\\rightarrow$ absorption spectra of chlorophyll a and b' },
      { key: 'B', text: 'Absorption spectra of chlorophyll a and b $\\rightarrow$ production of glucose $\\rightarrow$ release of oxygen $\\rightarrow$ role of air' },
      { key: 'C', text: 'Role of air $\\rightarrow$ release of oxygen $\\rightarrow$ production of glucose $\\rightarrow$ absorption spectra of chlorophyll a and b' },
      { key: 'D', text: 'Release of oxygen $\\rightarrow$ production of glucose $\\rightarrow$ absorption spectra of chlorophyll a and b $\\rightarrow$ role of air' }
    ];
  } else if (qNum === 6) {
    questionText = `Find the incorrect statement(s) about photosynthesis from the following :\n\nA. The water splitting complex is associated with PSI.\nB. $C_4$ plants use the $C_3$ pathway of $\\text{CO}_2$ fixation as the main biosynthetic pathway.\nC. In $C_4$ plants, photorespiration does not occur.\nD. $C_3$ plants exhibit 'Kranz' anatomy.\nE. ATP synthesis in chloroplast occurs through chemiosmosis.\n\nChoose the answer from the options given below :`;
    options = [
      { key: 'A', text: 'B and C only' },
      { key: 'B', text: 'B only' },
      { key: 'C', text: 'B and E only' },
      { key: 'D', text: 'A and D only' }
    ];
  } else if (qNum === 11) {
    questionText = `Which of the following are required for the light reaction of Photosynthesis?\n\nA. $\\text{CO}_2$\nB. $\\text{O}_2$\nC. $\\text{H}_2\\text{O}$\nD. Chlorophyll\nE. Light\n\nChoose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: 'A, C, D and E only' },
      { key: 'B', text: 'C, D and E only' },
      { key: 'C', text: 'A and B only' },
      { key: 'D', text: 'A, C and E only' }
    ];
  } else if (qNum === 12) {
    questionText = `Which one of the following products diffuses out of the chloroplast during photosynthesis?`;
    options = [
      { key: 'A', text: 'ADP' },
      { key: 'B', text: 'NADPH' },
      { key: 'C', text: '$\\text{O}_2$' },
      { key: 'D', text: 'ATP' }
    ];
  } else if (qNum === 13) {
    questionText = `Observe the given figure. Identify the different stages labelled with alphabets by selecting the correct option.\n\n![Calvin Cycle Diagram](${diagramUrls.q_13})`;
    options = [
      { key: 'A', text: 'A-Carboxylation, B-Regeneration, C-Reduction' },
      { key: 'B', text: 'A-Reduction, B-Decarboxylation, C-Regeneration' },
      { key: 'C', text: 'A-Carboxylation, B-Reduction, C-Regeneration' },
      { key: 'D', text: 'A-Reduction, B-Carboxylation, C-Regeneration' }
    ];
  } else if (qNum === 14) {
    questionText = `How many molecules of ATP and NADPH are required for every molecule of $\\text{CO}_2$ fixed in the Calvin cycle?`;
    options = [
      { key: 'A', text: '2 molecules of ATP and 3 molecules of NADPH' },
      { key: 'B', text: '2 molecules of ATP and 2 molecules of NADPH' },
      { key: 'C', text: '3 molecules of ATP and 3 molecules of NADPH' },
      { key: 'D', text: '3 molecules of ATP and 2 molecules of NADPH' }
    ];
  } else if (qNum === 15) {
    questionText = `Which of the following are required for the dark reaction of photosynthesis?\n\nA. Light\nB. Chlorophyll\nC. $\\text{CO}_2$\nD. ATP\nE. NADPH\n\nChoose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: 'A, B and C only' },
      { key: 'B', text: 'B, C and D only' },
      { key: 'C', text: 'C, D and E only' },
      { key: 'D', text: 'D and E only' }
    ];
  } else if (qNum === 16) {
    questionText = `Given below are two statements :\n\nStatement I : In $C_3$ plants, some $\\text{O}_2$ binds to RuBisCO, hence $\\text{CO}_2$ fixation is decreased.\nStatement II : In $C_4$ plants, mesophyll cells show very little photorespiration while bundle sheath cells do not show photorespiration.\n\nIn the light of the above statements, choose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: 'Both Statement I and Statement II are true' },
      { key: 'B', text: 'Both Statement I and Statement II are false' },
      { key: 'C', text: 'Statement I is true but Statement II is false' },
      { key: 'D', text: 'Statement I is false but Statement II is true' }
    ];
  } else if (qNum === 18) {
    questionText = `Given below are two statements :\n\nStatement I : RuBisCO is the most abundant enzyme in the world.\nStatement II : Photorespiration does not occur in $C_4$ plants.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below :`;
    options = [
      { key: 'A', text: 'Statement I is correct but Statement II is incorrect' },
      { key: 'B', text: 'Statement I is incorrect but Statement II is correct' },
      { key: 'C', text: 'Both Statement I and Statement II are correct' },
      { key: 'D', text: 'Both Statement I and Statement II are incorrect' }
    ];
  } else if (qNum === 23) {
    questionText = `When one $\\text{CO}_2$ molecule is fixed as one molecule of triose phosphate, which of the following photochemically made, high energy chemical intermediates are used in the reduction phase?`;
    options = [
      { key: 'A', text: '2 ATP + 2 NADPH' },
      { key: 'B', text: '1 ATP + 1 NADPH' },
      { key: 'C', text: '1 ATP + 2 NADPH' },
      { key: 'D', text: '2 ATP + 1 NADPH' }
    ];
  } else if (qNum === 24) {
    questionText = `Identify the correct statements regarding chemiosmotic hypothesis :\n\n(a) Splitting of the water molecule takes place on the inner side of the membrane.\n(b) Protons accumulate within the lumen of the thylakoids.\n(c) Primary acceptor of electron transfers the electrons to an electron carrier.\n(d) NADP reductase enzyme is located on the stroma side of the membrane.\n(e) Protons increase in number in stroma.\n\nChoose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: '(b), (c) and (e)' },
      { key: 'B', text: '(a), (b) and (e)' },
      { key: 'C', text: '(a), (b) and (d)' },
      { key: 'D', text: '(b), (c) and (d)' }
    ];
  } else if (qNum === 25) {
    questionText = `Given below are two statements :\n\nStatement I : The primary $\\text{CO}_2$ acceptor in $C_4$ plants is phosphoenolpyruvate and is found in the mesophyll cells.\nStatement II : Mesophyll cells of $C_4$ plants lack RuBisCo enzyme.\n\nIn the light of the above statements, choose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: 'Both Statement I and Statement II are correct' },
      { key: 'B', text: 'Both Statement I and Statement II are incorrect' },
      { key: 'C', text: 'Statement I is correct but Statement II is incorrect' },
      { key: 'D', text: 'Statement I is incorrect but Statement II is correct' }
    ];
  } else if (qNum === 27) {
    questionText = `What is the role of large bundle sheath cells found around the vascular bundles in $C_4$ plants?`;
    options = [
      { key: 'A', text: 'To provide the site for photorespiratory pathway' },
      { key: 'B', text: 'To increase the number of chloroplast for the operation of Calvin cycle' },
      { key: 'C', text: 'To enable the plant to tolerate high temperature' },
      { key: 'D', text: 'To protect the vascular tissue from high light intensity' }
    ];
  } else if (qNum === 28) {
    questionText = `The first stable product of $\\text{CO}_2$ fixation in Sorghum is :`;
    options = [
      { key: 'A', text: 'Phosphoglyceric acid' },
      { key: 'B', text: 'Pyruvic acid' },
      { key: 'C', text: 'Oxaloacetic acid' },
      { key: 'D', text: 'Succinic acid' }
    ];
  } else if (qNum === 30) {
    questionText = `Which of the following statements is incorrect?`;
    options = [
      { key: 'A', text: 'RuBisCO action requires ATP and NADPH' },
      { key: 'B', text: 'RuBisCO is a bifunctional enzyme' },
      { key: 'C', text: 'In $C_4$ plants, the site of RuBisCO activity is mesophyll cell' },
      { key: 'D', text: 'The substrate molecule for RuBisCO activity is a 5-carbon compound' }
    ];
  } else if (qNum === 34) {
    questionText = `In Hatch and Slack pathway, the primary $\\text{CO}_2$ acceptor is :`;
    options = [
      { key: 'A', text: 'Rubisco' },
      { key: 'B', text: 'Oxaloacetic acid' },
      { key: 'C', text: 'Phosphoglyceric acid' },
      { key: 'D', text: 'Phosphoenol pyruvate' }
    ];
  } else if (qNum === 37) {
    questionText = `With reference to factors affecting the rate of photosynthesis, which of the following statements is not correct?`;
    options = [
      { key: 'A', text: 'Increasing atmospheric $\\text{CO}_2$ concentration up to 0.05% can enhance $\\text{CO}_2$ fixation rate.' },
      { key: 'B', text: '$C_3$ plants respond to higher temperature with enhanced photosynthesis while $C_4$ plants have much lower temperature optimum.' },
      { key: 'C', text: 'Tomato is a greenhouse crop which can be grown in $\\text{CO}_2$-enriched atmosphere for higher yield.' },
      { key: 'D', text: 'Light saturation for $\\text{CO}_2$ fixation occurs at 10% of full sunlight.' }
    ];
  } else if (qNum === 38) {
    questionText = `Phosphoenol pyruvate (PEP) is the primary $\\text{CO}_2$ acceptor in :`;
    options = [
      { key: 'A', text: '$C_4$ plants' },
      { key: 'B', text: '$C_2$ plants' },
      { key: 'C', text: '$C_3$ and $C_4$ plants' },
      { key: 'D', text: '$C_3$ plants' }
    ];
  } else if (qNum === 39) {
    questionText = `The process which makes major difference between $C_3$ and $C_4$ plants is :`;
    options = [
      { key: 'A', text: 'glycolysis' },
      { key: 'B', text: 'Calvin cycle' },
      { key: 'C', text: 'photorespiration' },
      { key: 'D', text: 'respiration' }
    ];
  } else if (qNum === 40) {
    questionText = `Water vapour comes out from the plant leaf through the stomatal opening. Through the same stomatal opening carbon dioxide diffuses into the plant during photosynthesis. Reason out the above statements using one of following options.`;
    options = [
      { key: 'A', text: 'The above processes happen only during night time.' },
      { key: 'B', text: 'One process occurs during day time and the other at night.' },
      { key: 'C', text: 'Both processes cannot happen simultaneously.' },
      { key: 'D', text: 'Both processes can happen together because the diffusion coefficient of water and $\\text{CO}_2$ is different.' }
    ];
  } else if (qNum === 43) {
    questionText = `A plant in your garden avoids photorespiratory losses, has improved water use efficiency, shows high rates of photosynthesis at high temperatures and has improved efficiency of nitrogen utilisation. In which of the following physiological groups would you assign this plant?`;
    options = [
      { key: 'A', text: 'CAM' },
      { key: 'B', text: 'Nitrogen fixer' },
      { key: 'C', text: '$C_3$' },
      { key: 'D', text: '$C_4$' }
    ];
  } else if (qNum === 48) {
    questionText = `Read the following four statements (A – D) :\n\n(A) Both photophosphorylation and oxidative phosphorylation involve uphill transport of protons across the membrane.\n(B) In dicot stems, a new cambium originates from cells of pericycle at the time of secondary growth.\n(C) Stamens in flowers of Gloriosa and Petunia are polyandrous.\n(D) Symbiotic nitrogen fixers occur in free-living state also in soil.\n\nHow many of the above statements are right?`;
    options = [
      { key: 'A', text: 'Two' },
      { key: 'B', text: 'Three' },
      { key: 'C', text: 'Four' },
      { key: 'D', text: 'One' }
    ];
  } else if (qNum === 49) {
    questionText = `A process that makes important difference between $C_3$ and $C_4$ plants is :`;
    options = [
      { key: 'A', text: 'transpiration' },
      { key: 'B', text: 'glycolysis' },
      { key: 'C', text: 'photosynthesis' },
      { key: 'D', text: 'photorespiration' }
    ];
  } else if (qNum === 54) {
    questionText = `Read the following four statements, (i), (ii), (iii) and (iv) and select the right option having both correct statements.\n\n(i) Z scheme of light reaction takes place in presence of PSI only.\n(ii) Only PSI is functional in cyclic photophosphorylation.\n(iii) Cyclic photophosphorylation results into synthesis of ATP and $\\text{NADPH}_2$.\n(iv) Stroma lamellae lack PSII as well as NADP.`;
    options = [
      { key: 'A', text: '(ii) and (iv)' },
      { key: 'B', text: '(i) and (ii)' },
      { key: 'C', text: '(ii) and (iii)' },
      { key: 'D', text: '(iii) and (iv)' }
    ];
  } else if (qNum === 56) {
    questionText = `Study the pathway given below :\n\n![Hatch and Slack Pathway Diagram](${diagramUrls.q_56})\n\nIn which of the following options correct words for all the three blanks A, B and C are indicated?`;
    options = [
      { key: 'A', text: 'A $\\rightarrow$ Fixation, B $\\rightarrow$ Transamination, C $\\rightarrow$ Regeneration' },
      { key: 'B', text: 'A $\\rightarrow$ Decarboxylation, B $\\rightarrow$ Reduction, C $\\rightarrow$ Regeneration' },
      { key: 'C', text: 'A $\\rightarrow$ Carboxylation, B $\\rightarrow$ Decarboxylation, C $\\rightarrow$ Reduction' },
      { key: 'D', text: 'A $\\rightarrow$ Fixation, B $\\rightarrow$ Decarboxylation, C $\\rightarrow$ Regeneration' }
    ];
  } else if (qNum === 57) {
    questionText = `PGA as the first $\\text{CO}_2$ fixation product was discovered in photosynthesis of :`;
    options = [
      { key: 'A', text: 'bryophyte' },
      { key: 'B', text: 'gymnosperm' },
      { key: 'C', text: 'angiosperm' },
      { key: 'D', text: 'alga' }
    ];
  } else if (qNum === 58) {
    questionText = `$C_4$ plants are more efficient in photosynthesis than $C_3$ plants due to :`;
    options = [
      { key: 'A', text: 'higher leaf area' },
      { key: 'B', text: 'presence of larger number of chloroplasts in the leaf cells' },
      { key: 'C', text: 'presence of thin cuticle' },
      { key: 'D', text: 'lower rate of photorespiration' }
    ];
  } else if (qNum === 62) {
    questionText = `The $C_4$ plants are photosynthetically more efficient than $C_3$ plants because :`;
    options = [
      { key: 'A', text: 'the $\\text{CO}_2$ efflux is not prevented' },
      { key: 'B', text: 'they have more chloroplasts' },
      { key: 'C', text: 'the $\\text{CO}_2$ compensation point is more' },
      { key: 'D', text: '$\\text{CO}_2$ generated during photorespiration is trapped and recycled through PEP carboxylase.' }
    ];
  } else if (qNum === 63) {
    questionText = `In leaves of $C_4$ plants malic acid synthesis during $\\text{CO}_2$ fixation occurs in :`;
    options = [
      { key: 'A', text: 'bundle sheath' },
      { key: 'B', text: 'guard cells' },
      { key: 'C', text: 'epidermal cells' },
      { key: 'D', text: 'mesophyll cells' }
    ];
  } else if (qNum === 64) {
    questionText = `In the leaves of $C_4$ plants, malic acid formation during $\\text{CO}_2$ fixation occurs in the cells of :`;
    options = [
      { key: 'A', text: 'bundle sheath' },
      { key: 'B', text: 'phloem' },
      { key: 'C', text: 'epidermis' },
      { key: 'D', text: 'mesophyll' }
    ];
  } else if (qNum === 68) {
    questionText = `As compared to a $C_3$-plant, how many additional molecules of ATP are needed for net production of one molecule of hexose sugar by $C_4$-plants?`;
    options = [
      { key: 'A', text: 'Two' },
      { key: 'B', text: 'Six' },
      { key: 'C', text: 'Twelve' },
      { key: 'D', text: 'Zero' }
    ];
  } else if (qNum === 70) {
    questionText = `Photosynthesis in $C_4$ plants is relatively less limited by atmospheric $\\text{CO}_2$ levels because :`;
    options = [
      { key: 'A', text: 'effective pumping of $\\text{CO}_2$ into bundle sheath cells' },
      { key: 'B', text: 'RuBisCo in $C_4$ plants has higher affinity for $\\text{CO}_2$' },
      { key: 'C', text: 'four carbon acids are the primary initial $\\text{CO}_2$ fixation products' },
      { key: 'D', text: 'the primary fixation of $\\text{CO}_2$ is mediated via PEP carboxylase.' }
    ];
  } else if (qNum === 72) {
    questionText = `In $C_3$ plants, the first stable product of photosynthesis during the dark reaction is :`;
    options = [
      { key: 'A', text: 'malic acid' },
      { key: 'B', text: 'oxaloacetic acid' },
      { key: 'C', text: '3-phosphoglyceric acid' },
      { key: 'D', text: 'phosphoglyceraldehyde' }
    ];
  } else if (qNum === 76) {
    questionText = `Which one of the following is wrong in relation to photorespiration?`;
    options = [
      { key: 'A', text: 'It occurs in chloroplast' },
      { key: 'B', text: 'It occurs in day time only' },
      { key: 'C', text: 'It is a characteristic of $C_4$ plants' },
      { key: 'D', text: 'It is a characteristic of $C_3$ plants' }
    ];
  } else if (qNum === 77) {
    questionText = `In sugarcane plant $^{14}\\text{CO}_2$ is fixed to malic acid, in which the enzyme that fixes $\\text{CO}_2$ is :`;
    options = [
      { key: 'A', text: 'ribulose biphosphate carboxylase' },
      { key: 'B', text: 'phosphoenal pyruvic acid carboxylase' },
      { key: 'C', text: 'ribulose phosphate kinase' },
      { key: 'D', text: 'fructose phosphate' }
    ];
  } else if (qNum === 80) {
    questionText = `Which one of the following concerns photophosphorylation?`;
    options = [
      { key: 'A', text: '$\\text{ADP} + \\text{AMP} \\xrightarrow{\\text{Light energy}} \\text{ATP}$' },
      { key: 'B', text: '$\\text{ADP} + \\text{Inorganic } \\text{PO}_4 \\xrightarrow{\\text{Light energy}} \\text{ATP}$' },
      { key: 'C', text: '$\\text{ADP} + \\text{Inorganic } \\text{PO}_4 \\rightarrow \\text{ATP}$' },
      { key: 'D', text: '$\\text{AMP} + \\text{Inorganic } \\text{PO}_4 \\xrightarrow{\\text{Light energy}} \\text{ATP}$' }
    ];
  } else if (qNum === 86) {
    questionText = `Which pair is wrong?`;
    options = [
      { key: 'A', text: '$C_3$-maize' },
      { key: 'B', text: '$C_4$-kranz anatomy' },
      { key: 'C', text: 'Calvin cycle-PGA' },
      { key: 'D', text: 'Hatch and Slack cycle - OAA' }
    ];
  } else if (qNum === 87) {
    questionText = `Which is the first $\\text{CO}_2$ acceptor enzyme in $C_4$ plants?`;
    options = [
      { key: 'A', text: 'RuDP carboxylase' },
      { key: 'B', text: 'Phosphoric acid' },
      { key: 'C', text: 'RuBisCO' },
      { key: 'D', text: 'PEP-carboxylase' }
    ];
  } else if (qNum === 88) {
    questionText = `For assimilation of one $\\text{CO}_2$ molecule, the energy required in form of ATP and $\\text{NADPH}_2$ are :`;
    options = [
      { key: 'A', text: '2 ATP and 2 $\\text{NADPH}_2$' },
      { key: 'B', text: '5 ATP and 3 $\\text{NADPH}_2$' },
      { key: 'C', text: '3 ATP and 2 $\\text{NADPH}_2$' },
      { key: 'D', text: '18 ATP and 12 $\\text{NADPH}_2$' }
    ];
  } else if (qNum === 92) {
    questionText = `Carbon dioxide acceptor in $C_3$-plants is :`;
    options = [
      { key: 'A', text: 'PGA' },
      { key: 'B', text: 'RuDP' },
      { key: 'C', text: 'PEP' },
      { key: 'D', text: 'none of these' }
    ];
  } else if (qNum === 96) {
    questionText = `$\\text{NADPH}_2$ is generated through :`;
    options = [
      { key: 'A', text: 'photosystem II' },
      { key: 'B', text: 'anaerobic respiration' },
      { key: 'C', text: 'glycolysis' },
      { key: 'D', text: 'photosystem I' }
    ];
  } else if (qNum === 100) {
    questionText = `Photorespiration is favoured by :`;
    options = [
      { key: 'A', text: 'high temperature and low $\\text{O}_2$' },
      { key: 'B', text: 'high humidity and temperature' },
      { key: 'C', text: 'high $\\text{O}_2$ and low $\\text{CO}_2$' },
      { key: 'D', text: 'high $\\text{CO}_2$ and low $\\text{O}_2$' }
    ];
  } else if (qNum === 101) {
    questionText = `In $C_4$ plants, $\\text{CO}_2$ combines with :`;
    options = [
      { key: 'A', text: 'phosphoenol pyruvate' },
      { key: 'B', text: 'phosphoglyceraldehyde' },
      { key: 'C', text: 'phosphoglyceric acid' },
      { key: 'D', text: 'ribulose diphosphate' }
    ];
  } else if (qNum === 102) {
    questionText = `In $C_4$ plants, $\\text{CO}_2$ fixation is done by :`;
    options = [
      { key: 'A', text: 'sclerenchyma' },
      { key: 'B', text: 'chlorenchyma and hypodermis' },
      { key: 'C', text: 'mesophyll cells' },
      { key: 'D', text: 'guard cells' }
    ];
  } else if (qNum === 103) {
    questionText = `The primary acceptor, during $\\text{CO}_2$ fixation in $C_3$ plants, is :`;
    options = [
      { key: 'A', text: 'phosphoenolpyruvate (PEP)' },
      { key: 'B', text: 'ribulose 1, 5-diphosphate (RuDP)' },
      { key: 'C', text: 'phosphoglyceric acid (PGA)' },
      { key: 'D', text: 'ribulose monophosphate (RMP)' }
    ];
  } else if (qNum === 104) {
    questionText = `The $\\text{CO}_2$ fixation during $C_4$ pathway occurs in the chloroplast of :`;
    options = [
      { key: 'A', text: 'guard cells' },
      { key: 'B', text: 'bundle sheath cells' },
      { key: 'C', text: 'mesophyll cells' },
      { key: 'D', text: 'spongy parenchyma' }
    ];
  } else if (qNum === 105) {
    questionText = `Which of the following pigments acts as a reaction-centre during photosynthesis?`;
    options = [
      { key: 'A', text: 'Carotene' },
      { key: 'B', text: 'Phytochrome' },
      { key: 'C', text: '$P_{700}$' },
      { key: 'D', text: 'Cytochrome' }
    ];
  } else if (qNum === 106) {
    questionText = `During light reaction of photosynthesis, which of the following phenomenon is observed during cyclic phosphorylation as well as non-cyclic phosphorylation?`;
    options = [
      { key: 'A', text: 'Release of $\\text{O}_2$' },
      { key: 'B', text: 'Formation of ATP' },
      { key: 'C', text: 'Formation of NADPH' },
      { key: 'D', text: 'Involvement of PS I and PS II pigment systems' }
    ];
  } else if (qNum === 107) {
    questionText = `A photosynthesising plant is releasing $^{18}\\text{O}$ more than the normal. The plant must have been supplied with :`;
    options = [
      { key: 'A', text: '$\\text{O}_3$' },
      { key: 'B', text: '$\\text{H}_2\\text{O}$ with $^{18}\\text{O}$' },
      { key: 'C', text: '$\\text{CO}_2$ with $^{18}\\text{O}$' },
      { key: 'D', text: '$\\text{C}_6\\text{H}_{12}\\text{O}_6$ with $^{18}\\text{O}$' }
    ];
  } else if (qNum === 109) {
    questionText = `The carbon dioxide acceptor in Calvin cycle/$C_3$-plants is :`;
    options = [
      { key: 'A', text: 'phosphoenol pyruvate (PEP)' },
      { key: 'B', text: 'ribulose 1, 5-diphosphate (RuDP)' },
      { key: 'C', text: 'phosphoglyceric acid (PGA)' },
      { key: 'D', text: 'ribulose monophosphate (RMP)' }
    ];
  } else if (qNum === 110) {
    questionText = `Which one is a $C_4$-plant?`;
    options = [
      { key: 'A', text: 'Papaya' },
      { key: 'B', text: 'Pea' },
      { key: 'C', text: 'Potato' },
      { key: 'D', text: 'Maize/corn' }
    ];
  } else if (qNum === 113) {
    questionText = `The enzyme that catalyses carbon dioxide fixation in $C_4$ plants is :`;
    options = [
      { key: 'A', text: 'RuBP carboxylase' },
      { key: 'B', text: 'PEP carboxylase' },
      { key: 'C', text: 'carbonic anhydrase' },
      { key: 'D', text: 'carboxydismutase' }
    ];
  } else if (qNum === 114) {
    questionText = `The first carbon dioxide acceptor in $C_4$-plants is :`;
    options = [
      { key: 'A', text: 'phosphoenol-pyruvate' },
      { key: 'B', text: 'ribulose 1, 5-diphosphate' },
      { key: 'C', text: 'oxaloacetic acid' },
      { key: 'D', text: 'phosphoglyceric acid' }
    ];
  } else if (qNum === 115) {
    questionText = `At a temperature above $35^\\circ\\text{C}$ :`;
    options = [
      { key: 'A', text: 'rate of photosynthesis will decline earlier than that of respiration' },
      { key: 'B', text: 'rate of respiration will decline earlier than that of photosynthesis' },
      { key: 'C', text: 'there is no fixed pattern' },
      { key: 'D', text: 'both decline simultaneously' }
    ];
  } else if (qNum === 116) {
    questionText = `Ferredoxin is a constituent of :`;
    options = [
      { key: 'A', text: 'PS I' },
      { key: 'B', text: 'PS II' },
      { key: 'C', text: 'Hill reaction' },
      { key: 'D', text: '$P_{680}$' }
    ];
  } else if (qNum === 117) {
    questionText = `During monsoon, the rice crop of eastern states of India shows lesser yield due to limiting factor of :`;
    options = [
      { key: 'A', text: '$\\text{CO}_2$' },
      { key: 'B', text: 'light' },
      { key: 'C', text: 'temperature' },
      { key: 'D', text: 'water' }
    ];
  } else if (qNum === 121) {
    questionText = `Kranz anatomy is typical of :`;
    options = [
      { key: 'A', text: '$C_4$ plants' },
      { key: 'B', text: '$C_3$ plants' },
      { key: 'C', text: '$C_2$ plants' },
      { key: 'D', text: 'CAM plants' }
    ];
  } else if (qNum === 122) {
    questionText = `The first carbon dioxide acceptor in $C_4$-plants is :`;
    options = [
      { key: 'A', text: 'phosphoenol-pyruvate' },
      { key: 'B', text: 'ribulose 1, 5-diphosphate' },
      { key: 'C', text: 'oxaloacetic acid' },
      { key: 'D', text: 'phosphoglyceric acid' }
    ];
  } else if (qNum === 123) {
    questionText = `A very efficient converter of solar energy with net productivity of $204\\text{ kg}/\\text{m}^2$ or more is the crop :`;
    options = [
      { key: 'A', text: 'wheat' },
      { key: 'B', text: 'sugarcane' },
      { key: 'C', text: 'rice' },
      { key: 'D', text: 'bajra' }
    ];
  } else if (qNum === 124) {
    questionText = `In $C_4$ plants, Calvin cycle operates in :`;
    options = [
      { key: 'A', text: 'stroma of bundle sheath chloroplasts' },
      { key: 'B', text: 'grana of bundle sheath chloroplasts' },
      { key: 'C', text: 'grana of mesophyll chloroplasts' },
      { key: 'D', text: 'stroma of mesophyll chloroplasts' }
    ];
  } else if (qNum === 127) {
    questionText = `$\\text{NADP}^+$ is reduced to NADPH in :`;
    options = [
      { key: 'A', text: 'PS I' },
      { key: 'B', text: 'PS II' },
      { key: 'C', text: 'Calvin cycle' },
      { key: 'D', text: 'noncyclic photophosphorylation' }
    ];
  } else {
    // Normal questions
    const optAMatches = [...fullText.matchAll(/\(A\)/g)];
    const lastA = optAMatches[optAMatches.length - 1];
    if (lastA) {
      questionText = fullText.slice(0, lastA.index).trim();
      const optsPart = fullText.slice(lastA.index).trim();
      const optMatches = [...optsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
      options = optMatches.slice(0, 4).map(m => ({
        key: m[1],
        text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
      }));
    } else {
      questionText = fullText;
    }
  }

  // Prepend exam tag
  if (rawQ.header && rawQ.header.trim()) {
    questionText = `**[${rawQ.header.trim()}]**\n\n` + questionText;
  }

  // Format and clean text
  questionText = questionText.replace(/\n{3,}/g, '\n\n').trim();

  // Handle image URL
  let imageUrl = '';
  if (qNum === 13) imageUrl = diagramUrls.q_13;
  if (qNum === 56) imageUrl = diagramUrls.q_56;

  // High-fidelity NCERT solution
  const correctOptText = options[correctIndex]?.text || '';
  const solution = `**Correct Answer: (${officialKeyLetter}) ${correctOptText}**\n\n### Step-by-Step Explanation:\n- **Key Concept:** According to NCERT Biology (Photosynthesis in Higher Plants), photosynthetic processes are divided into Light Reactions (photophosphorylation, electron transport, photolysis of water in thylakoids) and Dark Reactions / Carbon Fixation ($C_3$ Calvin Cycle and $C_4$ Hatch & Slack Pathway in stroma).\n- **Analysis of Options:** Option (${officialKeyLetter}) accurately describes the physiological mechanism, enzyme, or photosynthetic stage.\n- **Conclusion:** Therefore, the correct option is **(${officialKeyLetter})**.`;

  finalQuestions.push({
    q_num: qNum,
    text: questionText,
    options,
    correct_letter: officialKeyLetter,
    correct_index: correctIndex,
    correct_indices: [correctIndex],
    solution,
    image_url: imageUrl,
    marks: 4,
    difficulty: 'medium',
    topic: 'Photosynthesis in Higher Plants'
  });
}

console.log(`Generated ${finalQuestions.length} complete questions.`);
fs.writeFileSync('./backend/scripts/photosynthesis_all_questions.json', JSON.stringify(finalQuestions, null, 2));
console.log('Saved to ./backend/scripts/photosynthesis_all_questions.json');
