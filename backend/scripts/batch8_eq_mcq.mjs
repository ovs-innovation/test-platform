// Batch 8: Remaining Equilibrium MCQs (Q235 to Q239 / Book Q249 to Q253)
export const batch8Questions = [
  {
    serialNumber: 235,
    bookNumber: 249,
    question_type: 'single_choice',
    question_text: 'Which of the following is incorrectly matched?',
    options: [
      'Milk : $\\text{pH} = 6.8$',
      'Gastric juice : $\\text{pH} = 11.2$',
      'Human blood : $\\text{pH} = 7.4$',
      'Human saliva : $\\text{pH} = 6.4$'
    ],
    correct_index: 1,
    solution: 'Gastric juice is strongly acidic with a normal pH range of approximately 1.5 to 3.5 due to the secretion of hydrochloric acid ($HCl$). A pH of 11.2 represents an alkaline medium and is therefore incorrectly matched.',
    topic: 'pH of Biological Fluids',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 236,
    bookNumber: 250,
    question_type: 'single_choice',
    question_text: '$100\\text{ mL}$ of $0.2\\text{ N } HCl$ is added to $100\\text{ mL}$ of $0.18\\text{ N } NaOH$ and the whole volume is made one litre. The pH of resulting solution is',
    options: [
      '2.2',
      '1.3',
      '2.7',
      '4.55'
    ],
    correct_index: 2,
    solution: 'Initial milliequivalents of $HCl = 100 \\times 0.2 = 20\\text{ meq}$.\nInitial milliequivalents of $NaOH = 100 \\times 0.18 = 18\\text{ meq}$.\nExcess $HCl = 20 - 18 = 2\\text{ meq}$.\nTotal volume $V = 1000\\text{ mL}$.\n$[H^+] = \\frac{2\\text{ meq}}{1000\\text{ mL}} = 2 \\times 10^{-3}\\text{ N} = 2 \\times 10^{-3}\\text{ M}$.\n$\\text{pH} = -\\log(2 \\times 10^{-3}) = 3 - \\log 2 = 3 - 0.3010 = 2.699 \\approx 2.7$.',
    topic: 'pH of Acid-Base Mixture',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 237,
    bookNumber: 251,
    question_type: 'single_choice',
    question_text: 'Which of the following cannot form its conjugate base in aqueous medium?',
    options: [
      '$H_2PO_4^-$',
      '$H_2PO_3^-$',
      '$H_2PO_2^-$',
      'All of these'
    ],
    correct_index: 2,
    solution: 'Hypophosphorous acid ($H_3PO_2$) is a monoprotic acid because only one hydrogen is bonded to oxygen ($P-OH$), while the other two hydrogens are directly bonded to phosphorus ($P-H$) and are non-ionizable. Once it loses its single acidic proton to form $H_2PO_2^-$, it has no further ionizable protons to lose in aqueous solution and thus cannot form a conjugate base.',
    topic: 'Conjugate Acid-Base and Oxyacids of Phosphorus',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 238,
    bookNumber: 252,
    question_type: 'single_choice',
    question_text: '$50\\text{ mL}$ of $0.2\\text{ N } HCl$ solution is added to $50\\text{ mL}$ of $0.1\\text{ N } NaOH$ solution, pH of mixture will be',
    options: [
      '1.3',
      '2.7',
      '11.7',
      '11.2'
    ],
    correct_index: 0,
    solution: 'Milliequivalents of $HCl = 50 \\times 0.2 = 10\\text{ meq}$.\nMilliequivalents of $NaOH = 50 \\times 0.1 = 5\\text{ meq}$.\nExcess $HCl = 10 - 5 = 5\\text{ meq}$.\nTotal volume after mixing = $50 + 50 = 100\\text{ mL}$.\n$[H^+] = \\frac{5\\text{ meq}}{100\\text{ mL}} = 0.05\\text{ N} = 5 \\times 10^{-2}\\text{ M}$.\n$\\text{pH} = -\\log(5 \\times 10^{-2}) = 2 - \\log 5 = 2 - 0.6990 = 1.301 \\approx 1.3$.',
    topic: 'pH Calculation for Strong Acid and Strong Base Mixture',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 239,
    bookNumber: 253,
    question_type: 'single_choice',
    question_text: 'Which of the following will favour the formation of ammonia in Haber\'s process?\nI. Increase in temperature\nII. Increase in pressure\nIII. Addition of catalyst\nIV. Increase in concentration of $N_2$ gas',
    options: [
      'I & II',
      'II & III',
      'I, II & III',
      'II, III & IV'
    ],
    correct_index: 3,
    solution: 'For Haber\'s synthesis of ammonia: $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g), \\Delta H < 0$.\n1. Since the reaction is exothermic, an increase in temperature shifts the equilibrium in the backward direction according to Le Chatelier\'s principle (favouring dissociation of $NH_3$), so statement I does not favour formation.\n2. The reaction proceeds with a decrease in gaseous moles ($\\Delta n_g = 2 - 4 = -2$), so high pressure (II) shifts the equilibrium in the forward direction.\n3. The addition of a catalyst (III) increases the rate of ammonia formation by lowering activation energy and speeding up attainment of equilibrium.\n4. Increasing the concentration of reactant $N_2$ (IV) shifts equilibrium forward to produce more $NH_3$.\nTherefore, II, III & IV favour the formation of ammonia.',
    topic: 'Le Chatelier\'s Principle in Haber\'s Process',
    difficulty: 'medium',
    marks: 4
  }
];

