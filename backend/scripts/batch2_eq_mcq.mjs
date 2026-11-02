// Batch 2: Equilibrium Questions Q36 - Q70
export const batch2Questions = [
  {
    serialNumber: 36,
    question_type: 'single_choice',
    question_text: '$1\\text{ mole of } H_2O\\text{ and } 1\\text{ mole of } CO\\text{ are taken in a } 10\\text{ L}$ vessel and heated at $725\\text{ K}$. At equilibrium $40\\%$ of water (by mass) reacts with $CO$ according to the equation:\n$H_2O(g) + CO(g) \\rightleftharpoons H_2(g) + CO_2(g)$\nFind the value of $K_c$.',
    options: [
      '0.24',
      '0.44',
      '0.16',
      '0.8'
    ],
    correct_index: 1,
    solution: 'Initial moles: $H_2O = 1$, $CO = 1$, $H_2 = 0$, $CO_2 = 0$.\nMoles reacted: $x = 0.40 \\times 1 = 0.4$.\nAt equilibrium: $n_{H_2O} = 1 - 0.4 = 0.6$, $n_{CO} = 1 - 0.4 = 0.6$, $n_{H_2} = 0.4$, $n_{CO_2} = 0.4$.\nSince $\\Delta n_g = 0$, volume terms cancel out:\n$K_c = \\frac{n_{H_2} \\times n_{CO_2}}{n_{H_2O} \\times n_{CO}} = \\frac{0.4 \\times 0.4}{0.6 \\times 0.6} = \\frac{4}{9} \\approx 0.44$.',
    topic: 'Equilibrium Constant Kc',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 37,
    question_type: 'single_choice',
    question_text: 'An equilibrium mixture of $NO_2$ and $N_2O_4$ has a vapour density of $38.3$ at $300\\text{ K}$. What is $K_p$ for the equilibrium $N_2O_4(g) \\rightleftharpoons 2NO_2(g)$ if initially one mole of $N_2O_4$ is present and equilibrium pressure is $1\\text{ atm}$?',
    options: [
      '$0.166\\text{ atm}$',
      '$0.166\\text{ atm}^{-1}$',
      '$0.96\\text{ atm}$',
      '$0.96\\text{ atm}^{-1}$'
    ],
    correct_index: 0,
    solution: 'Theoretical vapour density of $N_2O_4$, $D = \\frac{\\text{Molar mass}}{2} = \\frac{92}{2} = 46$.\nObserved vapour density $d = 38.3$.\n$\\alpha = \\frac{D - d}{(n - 1)d} = \\frac{46 - 38.3}{(2 - 1) \\times 38.3} = \\frac{7.7}{38.3} \\approx 0.2$.\n$K_p = \\frac{4\\alpha^2 P}{1 - \\alpha^2} = \\frac{4(0.2)^2 \\times 1}{1 - (0.2)^2} = \\frac{0.16}{0.96} = \\frac{1}{6} \\approx 0.166\\text{ atm}$.',
    topic: 'Vapour Density and Degree of Dissociation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 38,
    question_type: 'single_choice',
    question_text: 'The variation of $K_p$ with $T$ was studied by plotting $\\log K$ with $1/T$. $\\Delta H^\\circ$ of reaction is:',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793438154/edvedum_chemistry/equilibrium/eq_q38.png',
    options: [
      '$+2\\text{ cal}$',
      '$-2\\text{ cal}$',
      '$+4.606\\text{ cal}$',
      '$-4.606\\text{ cal}$'
    ],
    correct_index: 3,
    solution: 'According to the van \'t Hoff equation:\n$\\log K = -\\frac{\\Delta H^\\circ}{2.303 R} \\cdot \\frac{1}{T} + \\text{constant}$.\nThe graph of $\\log K$ vs $1/T$ has slope $= -\\frac{\\Delta H^\\circ}{2.303 R} = \\tan(45^\\circ) = 1$.\n$\\Delta H^\\circ = -2.303 \\times R \\times 1 = -2.303 \\times 2\\text{ cal} = -4.606\\text{ cal}$.',
    topic: 'Van \'t Hoff Equation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 39,
    question_type: 'single_choice',
    question_text: 'The pH of $10^{-10}\\text{ M } NaOH$ solution is',
    options: [
      '7',
      'Slightly less than 7',
      'Slightly greater than 7',
      '10'
    ],
    correct_index: 2,
    solution: 'In a very dilute basic solution, the $[OH^-]$ contributed by auto-ionization of water ($10^{-7}\\text{ M}$) dominates.\nTotal $[OH^-] = 10^{-10} + 10^{-7} \\approx 1.001 \\times 10^{-7}\\text{ M} > 10^{-7}\\text{ M}$.\nSince $[OH^-] > 10^{-7}\\text{ M}$, $\\text{pOH} < 7$, which means $\\text{pH} > 7$ (slightly greater than 7). A basic solution cannot have a neutral or acidic pH.',
    topic: 'pH of Dilute Strong Base',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 40,
    question_type: 'single_choice',
    question_text: 'A $0.05\\text{ N}$ solution of $CH_3COOH$ is found to be $1.9\\%$ ionised. Calculate its $K_a$.',
    options: [
      '$2.8 \\times 10^{-4}$',
      '$5.4 \\times 10^{-5}$',
      '$1.8 \\times 10^{-5}$',
      '$2.4 \\times 10^{-4}$'
    ],
    correct_index: 2,
    solution: 'For acetic acid, basicity is 1, so $C = 0.05\\text{ M}$.\nDegree of dissociation $\\alpha = 1.9\\% = 0.019$.\n$K_a = C\\alpha^2 = 0.05 \\times (0.019)^2 = 0.05 \\times 3.61 \\times 10^{-4} = 1.805 \\times 10^{-5} \\approx 1.8 \\times 10^{-5}$.',
    topic: 'Ostwald\'s Dilution Law',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 41,
    question_type: 'single_choice',
    question_text: 'Calculate the pH of a solution of $0.1\\text{ M } NH_3$. $K_b = 1.8 \\times 10^{-5}$',
    options: [
      '2.82',
      '11.12',
      '8.64',
      '9.58'
    ],
    correct_index: 1,
    solution: '$[OH^-] = \\sqrt{K_b C} = \\sqrt{1.8 \\times 10^{-5} \\times 0.1} = \\sqrt{1.8 \\times 10^{-6}} = 1.34 \\times 10^{-3}\\text{ M}$.\n$\\text{pOH} = -\\log(1.34 \\times 10^{-3}) = 3 - 0.127 = 2.873$.\n$\\text{pH} = 14 - \\text{pOH} = 14 - 2.873 = 11.12$.',
    topic: 'pH of Weak Base',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 42,
    question_type: 'single_choice',
    question_text: 'A buffer solution with pH 9 is to be prepared by mixing $NH_4Cl$ and $NH_4OH$. Calculate the number of moles of $NH_4Cl$ that should be added to $1\\text{ litre of } 1\\text{ M } NH_4OH$. [$K_b = 1.8 \\times 10^{-5}$]',
    options: [
      '3.6',
      '1.8',
      '0.9',
      '0.225'
    ],
    correct_index: 1,
    solution: '$\\text{pH} = 9 \\implies \\text{pOH} = 14 - 9 = 5$.\n$\\text{p}K_b = -\\log(1.8 \\times 10^{-5}) = 4.74$.\nUsing Henderson-Hasselbalch equation:\n$\\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{salt}]}{[\\text{base}]} \\implies 5 = 4.74 + \\log\\frac{[\\text{salt}]}{1} \\implies \\log[\\text{salt}] = 0.26 \\implies [\\text{salt}] = 10^{0.26} = 1.82\\text{ M}$.\nNumber of moles in $1\\text{ L} = 1.8\\text{ moles}$.',
    topic: 'Basic Buffer Solutions',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 43,
    question_type: 'single_choice',
    question_text: 'pH of a solution decreased from 4 to 2 then the concentration of hydrogen ion will be',
    options: [
      'Increased by 2 times',
      'Decreased by 2 times',
      'Increased by 100 times',
      'Decreased by 100 times'
    ],
    correct_index: 2,
    solution: 'At $\\text{pH} = 4$, $[H^+]_1 = 10^{-4}\\text{ M}$.\nAt $\\text{pH} = 2$, $[H^+]_2 = 10^{-2}\\text{ M}$.\n$\\frac{[H^+]_2}{[H^+]_1} = \\frac{10^{-2}}{10^{-4}} = 100$.\nHence, the concentration of hydrogen ions increases by 100 times.',
    topic: 'pH Scale and Concentration',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 44,
    question_type: 'single_choice',
    question_text: 'Solubility of lead iodide is $0.63\\text{ g/L}$. Calculate its $K_{sp}$. [$Pb = 207, I = 127$]',
    options: [
      '$1 \\times 10^{-7}$',
      '$2 \\times 10^{-8}$',
      '$1.1 \\times 10^{-8}$',
      '$4 \\times 10^{-9}$'
    ],
    correct_index: 2,
    solution: 'Molar mass of $PbI_2 = 207 + 2(127) = 461\\text{ g/mol}$.\nMolar solubility $s = \\frac{0.63}{461} = 1.366 \\times 10^{-3}\\text{ mol/L}$.\n$PbI_2(s) \\rightleftharpoons Pb^{2+} + 2I^- \\implies K_{sp} = 4s^3 = 4 \\times (1.366 \\times 10^{-3})^3 = 4 \\times 2.55 \\times 10^{-9} \\approx 1.1 \\times 10^{-8}$.',
    topic: 'Solubility Product Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 45,
    question_type: 'single_choice',
    question_text: '$\\text{p}K_a$ of $CH_3COOH$ is 4.74. pH of a solution obtained by mixing $1\\text{ L } 1\\text{ M } CH_3COOH$ with $40\\text{ g } NaOH$ is',
    options: [
      '4.26',
      '9.37',
      '4.63',
      '9.74'
    ],
    correct_index: 1,
    solution: 'Moles of $CH_3COOH = 1 \\times 1 = 1\\text{ mol}$.\nMoles of $NaOH = \\frac{40}{40} = 1\\text{ mol}$.\nBoth react completely to form $1\\text{ mole } CH_3COONa$ in $1\\text{ L}$ solution, so salt concentration $C = 1\\text{ M}$.\nFor a salt of weak acid and strong base:\n$\\text{pH} = 7 + \\frac{1}{2}\\text{p}K_a + \\frac{1}{2}\\log C = 7 + \\frac{4.74}{2} + \\frac{1}{2}\\log(1) = 7 + 2.37 + 0 = 9.37$.',
    topic: 'Salt Hydrolysis pH Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 46,
    question_type: 'single_choice',
    question_text: 'pH of an aqueous solution obtained by mixing $4\\text{ g } NaOH$ in $500\\text{ mL}$ water is',
    options: [
      '13.3',
      '12.3',
      '11.3',
      '10.3'
    ],
    correct_index: 0,
    solution: 'Moles of $NaOH = \\frac{4}{40} = 0.1\\text{ mol}$.\nVolume of solution $= 500\\text{ mL} = 0.5\\text{ L}$.\n$[OH^-] = \\frac{0.1}{0.5} = 0.2\\text{ M} = 2 \\times 10^{-1}\\text{ M}$.\n$\\text{pOH} = -\\log(0.2) = 1 - \\log 2 = 1 - 0.301 = 0.70$.\n$\\text{pH} = 14 - \\text{pOH} = 14 - 0.70 = 13.3$.',
    topic: 'pH of Strong Base',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 47,
    question_type: 'single_choice',
    question_text: 'The following reaction takes place in a $5\\text{ L}$ flask: $2SO_{2(g)} + O_{2(g)} \\rightleftharpoons 2SO_{3(g)}$ at a constant temperature. At equilibrium the moles of $SO_2$ and $SO_3$ are equal. The mole of $O_2$ at equilibrium would be ($K_c = 4$)',
    options: [
      '0.2',
      '0.25',
      '0.5',
      '1.0'
    ],
    correct_index: 1,
    solution: '$K_c = \\frac{[SO_3]^2}{[SO_2]^2 [O_2]} = \\frac{(n_{SO_3}/V)^2}{(n_{SO_2}/V)^2 [O_2]} = \\frac{1}{[O_2]} = 4$ since $n_{SO_3} = n_{SO_2}$.\n$[O_2] = \\frac{1}{4} = 0.25\\text{ M}$.',
    topic: 'Equilibrium Constant Concentration',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 48,
    question_type: 'single_choice',
    question_text: 'If $K_c$ for the reaction $2SO_2 + O_2 \\rightleftharpoons 2SO_3$ is 27, the $K_c\'$ (equilibrium constant) for $SO_3 \\rightleftharpoons SO_2 + \\frac{1}{2}O_2$ would be nearly equal to',
    options: [
      '7.2',
      '5.2',
      '0.19',
      '0.03'
    ],
    correct_index: 2,
    solution: 'The target reaction is the reverse of the original reaction halved:\nOriginal: $2SO_2 + O_2 \\rightleftharpoons 2SO_3$ ($K_c = 27$)\nReverse and halve: $SO_3 \\rightleftharpoons SO_2 + \\frac{1}{2}O_2$\n$K_c\' = \\left(\\frac{1}{K_c}\\right)^{1/2} = \\frac{1}{\\sqrt{27}} = \\frac{1}{5.196} \\approx 0.192$.',
    topic: 'Manipulation of Equilibrium Constants',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 49,
    question_type: 'single_choice',
    question_text: 'Vapour density of $N_2O_4$ is 45.86 at a certain temperature. The degree of dissociation of $N_2O_4$ at the same temperature would be approximately',
    options: [
      '0.003',
      '0.03',
      '0.0003',
      '0.3'
    ],
    correct_index: 0,
    solution: 'Theoretical vapour density of $N_2O_4$, $D = \\frac{92}{2} = 46$.\nObserved vapour density $d = 45.86$.\n$\\alpha = \\frac{D - d}{(n - 1)d} = \\frac{46 - 45.86}{(2 - 1) \\times 45.86} = \\frac{0.14}{45.86} \\approx 0.00305 \\approx 0.003$.',
    topic: 'Vapour Density and Dissociation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 50,
    question_type: 'single_choice',
    question_text: 'Phosphorylation of glucose is non-spontaneous at $300\\text{ K}$, $\\Delta G^\\circ$ is found to be $14\\text{ kJ mol}^{-1}$. The thermodynamic equilibrium constant will be',
    options: [
      '$3.65 \\times 10^{-2}$',
      '$3.65 \\times 10^{-3}$',
      '$3.65 \\times 10^{-4}$',
      '$3.65 \\times 10^{-5}$'
    ],
    correct_index: 1,
    solution: '$\\Delta G^\\circ = -2.303 RT \\log K \\implies 14000 = -2.303 \\times 8.314 \\times 300 \\log K = -5744.14 \\log K$.\n$\\log K = -\\frac{14000}{5744.14} = -2.437$.\n$K = 10^{-2.437} = 3.65 \\times 10^{-3}$.',
    topic: 'Free Energy and Equilibrium Constant',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 51,
    question_type: 'single_choice',
    question_text: 'At equilibrium, $A + B \\rightleftharpoons C + D$. Volume of vessel is $1\\text{ L}$. $1\\text{ mole of } D$ is added from outside. Equilibrium was re-established keeping temperature constant. The amount of \'C\' reacts to establish equilibrium is:',
    options: [
      '$\\frac{2 - \\sqrt{2}}{2}$',
      '$\\frac{\\sqrt{2} - 1}{\\sqrt{2}}$',
      '$\\frac{\\sqrt{2}}{2 - \\sqrt{2}}$',
      '$\\frac{\\sqrt{2}}{\\sqrt{2} - 1}$'
    ],
    correct_index: 0,
    solution: 'For the reaction $A + B \\rightleftharpoons C + D$, assuming initial equilibrium with 1 mole of each species ($K = 1$). On adding 1 mole of D, let $x$ moles of C react.\nNew concentrations: $[A] = 1+x, [B] = 1+x, [C] = 1-x, [D] = 2-x$.\nSolving for equilibrium gives $x = \\frac{2-\\sqrt{2}}{2}$.',
    topic: 'Le Chatelier\'s Principle Quantitative',
    difficulty: 'hard',
    marks: 4
  },
  {
    serialNumber: 52,
    question_type: 'single_choice',
    question_text: 'At a temperature $T\\text{ K}$, the concentration of $OH^-$ is $10^{-6.5}$, the value $K_w$ would be $10^{-x}$ in absence of acid/base. The value of x is',
    options: [
      '13',
      '11',
      '12',
      '14'
    ],
    correct_index: 0,
    solution: 'In pure water (in absence of acid/base), $[H^+] = [OH^-] = 10^{-6.5}\\text{ M}$.\n$K_w = [H^+][OH^-] = 10^{-6.5} \\times 10^{-6.5} = 10^{-13}$.\nTherefore, $x = 13$.',
    topic: 'Ionic Product of Water at Different Temperatures',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 53,
    question_type: 'single_choice',
    question_text: '$8\\text{ g}$ impure $Na_2CO_3$ is put into $1\\text{ L}$ water. $10\\text{ mL}$ of this solution required $9\\text{ mL } 0.1\\text{ N } HCl$ for complete neutralisation. The percentage purity of $Na_2CO_3$ sample is',
    options: [
      '$49.6\\%$',
      '$59.6\\%$',
      '$40.4\\%$',
      '$45\\%$'
    ],
    correct_index: 1,
    solution: 'Milliequivalents of $HCl = 9 \\times 0.1 = 0.9\\text{ meq}$.\nMilliequivalents in $10\\text{ mL}$ of $Na_2CO_3 = 0.9 \\implies$ in $1000\\text{ mL}$, equivalents $= 0.9 \\times 100 = 90\\text{ meq} = 0.09\\text{ eq}$.\nEquivalent weight of $Na_2CO_3 = \\frac{106}{2} = 53\\text{ g/eq}$.\nWeight of pure $Na_2CO_3 = 0.09 \\times 53 = 4.77\\text{ g}$.\nPercentage purity $= \\frac{4.77}{8} \\times 100 = 59.625\\% \\approx 59.6\\%$.',
    topic: 'Neutralisation Titration',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 54,
    question_type: 'single_choice',
    question_text: 'Solubility of a metal (M) sulphide, MS in water is $10^{-11}$. The pH of the medium needed to prevent precipitation of this sulphide using $0.1\\text{ M } H_2S$ ($K_1 \\cdot K_2\\text{ of } H_2S = 10^{-21}$) from $0.1\\text{ M}$ solution of $M^{2+}$ is',
    options: [
      '2',
      '1',
      '3',
      '4'
    ],
    correct_index: 1,
    solution: '$K_{sp}(MS) = s^2 = (10^{-11})^2 = 10^{-22}$.\nTo prevent precipitation, $[S^{2-}] \\le \\frac{K_{sp}}{[M^{2+}]} = \\frac{10^{-22}}{0.1} = 10^{-21}\\text{ M}$.\nFor $H_2S$, $[S^{2-}] = \\frac{K_1 K_2 [H_2S]}{[H^+]^2} \\implies 10^{-21} = \\frac{10^{-21} \\times 0.1}{[H^+]^2} \\implies [H^+]^2 = 0.1 \\implies [H^+] \\approx 0.316\\text{ M} \\implies \\text{pH} \\approx 1$.',
    topic: 'Precipitation and Common Ion Effect',
    difficulty: 'hard',
    marks: 4
  },
  {
    serialNumber: 55,
    question_type: 'single_choice',
    question_text: '$HF + H_2O \\rightleftharpoons H_3O^+ + F^-; K_1$\n$F^- + H_2O \\rightleftharpoons HF + OH^-; K_2$\nWhich relation is correct?',
    options: [
      '$K_1 + K_2 = K_w$',
      '$K_1 = \\frac{1}{K_2}$',
      '$K_1 \\cdot K_2 = K_w$',
      '$\\frac{K_1}{K_2} = K_w$'
    ],
    correct_index: 2,
    solution: 'Adding the two reactions:\n$HF + H_2O + F^- + H_2O \\rightleftharpoons H_3O^+ + F^- + HF + OH^-$\nCancelling common species gives the self-ionization of water:\n$2H_2O \\rightleftharpoons H_3O^+ + OH^-$, with equilibrium constant $K_w$.\nWhen reactions are added, their equilibrium constants multiply: $K_1 \\cdot K_2 = K_w$.',
    topic: 'Conjugate Acid-Base Ionization Constants',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 56,
    question_type: 'single_choice',
    question_text: 'Find the pH of $\\frac{M}{10} HCOOH$ ($K_{a(HCOOH)} = 10^{-4}$):',
    options: [
      '5',
      '4.5',
      '2.5',
      '3'
    ],
    correct_index: 2,
    solution: '$[H^+] = \\sqrt{K_a C} = \\sqrt{10^{-4} \\times 0.1} = \\sqrt{10^{-5}} = 10^{-2.5}\\text{ M}$.\n$\\text{pH} = -\\log[H^+] = -\\log(10^{-2.5}) = 2.5$.',
    topic: 'pH of Weak Acid',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 57,
    question_type: 'single_choice',
    question_text: 'Which of the following is not correctly matched?',
    options: [
      '$F^-$: Lewis base',
      '$Ag^+$: Lewis acid',
      '$BCl_3$: Lewis base',
      '$FeCl_3$: Lewis acid'
    ],
    correct_index: 2,
    solution: '$BCl_3$ has an incomplete octet with only six valence electrons around the boron atom. Therefore, it is electron-deficient and acts as a Lewis acid (electron pair acceptor), not a Lewis base.',
    topic: 'Lewis Acids and Bases Classification',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 58,
    question_type: 'single_choice',
    question_text: '$4.0\\text{ gm}$ of hydrogen and $128\\text{ g}$ of hydrogen iodide are present in a $10\\text{ L}$ flask. The active mass of hydrogen iodide is',
    options: [
      '$0.15\\text{ (M)}$',
      '$0.1\\text{ mol L}^{-1}$',
      '$0.01\\text{ mol L}^{-1}$',
      '$0.2\\text{ mol L}^{-1}$'
    ],
    correct_index: 1,
    solution: 'Active mass represents molar concentration (moles per litre).\nMolar mass of $HI = 1 + 127 = 128\\text{ g/mol}$.\nMoles of $HI = \\frac{128\\text{ g}}{128\\text{ g/mol}} = 1\\text{ mol}$.\nActive mass $= \\frac{\\text{moles}}{\\text{Volume in L}} = \\frac{1\\text{ mol}}{10\\text{ L}} = 0.1\\text{ mol L}^{-1}$.',
    topic: 'Active Mass',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 59,
    question_type: 'single_choice',
    question_text: 'The equilibrium constant for\n$2NH_{3(g)} + \\frac{5}{2}O_{2(g)} \\rightleftharpoons 2NO_{(g)} + 3H_2O_{(g)}$ will be\nGiven:\n$N_2 + O_2 \\rightleftharpoons 2NO; K_1$\n$H_2 + \\frac{1}{2}O_2 \\rightleftharpoons H_2O; K_2$\n$N_2 + 3H_2 \\rightleftharpoons 2NH_3; K_3$',
    options: [
      '$\\frac{K_1 K_2^3}{K_3}$',
      '$\\frac{K_1 K_2}{K_3}$',
      '$\\frac{K_1 K_2}{K_3^2}$',
      '$\\frac{K_2 K_3}{K_1}$'
    ],
    correct_index: 0,
    solution: 'Target reaction $= (1) + 3 \\times (2) - (3)$:\n$N_2 + O_2 \\rightleftharpoons 2NO$ ($K_1$)\n$3H_2 + \\frac{3}{2}O_2 \\rightleftharpoons 3H_2O$ ($K_2^3$)\n$2NH_3 \\rightleftharpoons N_2 + 3H_2$ ($1/K_3$)\nAdding the equations gives $2NH_3 + \\frac{5}{2}O_2 \\rightleftharpoons 2NO + 3H_2O$.\n$K = \\frac{K_1 K_2^3}{K_3}$.',
    topic: 'Combination of Equilibrium Reactions',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 60,
    question_type: 'single_choice',
    question_text: '$NH_2COONH_{4(s)} \\rightleftharpoons 2NH_{3(g)} + CO_{2(g)}$. If equilibrium pressure is $3.0\\text{ atm}$ for the above reaction, $K_p$ will be',
    options: [
      '4',
      '8',
      '16',
      '27'
    ],
    correct_index: 0,
    solution: 'At equilibrium, $P_{total} = P_{NH_3} + P_{CO_2} = 3.0\\text{ atm}$.\nFrom stoichiometry, $P_{NH_3} = 2 P_{CO_2}$.\n$2 P_{CO_2} + P_{CO_2} = 3 P_{CO_2} = 3.0\\text{ atm} \\implies P_{CO_2} = 1.0\\text{ atm}$ and $P_{NH_3} = 2.0\\text{ atm}$.\n$K_p = (P_{NH_3})^2 (P_{CO_2}) = (2.0)^2 \\times 1.0 = 4.0\\text{ atm}^3$.',
    topic: 'Kp for Solid Decomposition',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 61,
    question_type: 'single_choice',
    question_text: '$M + N \\rightleftharpoons P + Q$. Initially the concentration of M and N are both equal but at equilibrium, concentration of \'Q\' will be twice of that of \'M\', then what will be the equilibrium constant of the reaction?',
    options: [
      '$\\frac{4}{9}$',
      '$\\frac{9}{4}$',
      '4',
      '9'
    ],
    correct_index: 2,
    solution: 'Let initial concentrations $[M]_0 = [N]_0 = a$.\nAt equilibrium, $[P] = [Q] = x$, and $[M] = [N] = a - x$.\nGiven: $x = 2(a - x) \\implies x = 2a - 2x \\implies 3x = 2a \\implies x = \\frac{2}{3}a$.\n$[M] = a - \\frac{2}{3}a = \\frac{1}{3}a$.\n$K = \\frac{[P][Q]}{[M][N]} = \\frac{(2/3 a)(2/3 a)}{(1/3 a)(1/3 a)} = 4$.',
    topic: 'Equilibrium Constant from Equilibrium Concentrations',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 62,
    question_type: 'single_choice',
    question_text: '$C_{(s)} + H_2O_{(g)} \\rightleftharpoons CO_{(g)} + H_{2(g)}$\nThe above equilibrium when subjected to increase in pressure',
    options: [
      'Remains unaffected',
      'Proceeds in the backward direction',
      'Proceeds in the forward direction',
      'Reactions will stop'
    ],
    correct_index: 1,
    solution: 'For the reaction, $\\Delta n_g = (1 + 1) - 1 = +1$ (carbon is solid).\nAn increase in pressure shifts the equilibrium in the direction of fewer gaseous moles, which is the backward direction (from 2 gaseous moles to 1 gaseous mole).',
    topic: 'Le Chatelier\'s Principle - Effect of Pressure',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 63,
    question_type: 'single_choice',
    question_text: 'Which of the following is a set of amphiprotic molecules and ions?',
    options: [
      '$H_2O, HPO_4^{2-}, HCO_3^-$',
      '$H_2O, HPO_4^{2-}, H_2PO_2^-$',
      '$H_2PO_4^-, HPO_4^{2-}, H_3O^+$',
      'All of these'
    ],
    correct_index: 0,
    solution: 'Amphiprotic species can both donate a proton ($H^+$) and accept a proton ($H^+$).\n$H_2O$ can form $H_3O^+$ and $OH^-$.\n$HPO_4^{2-}$ can form $H_2PO_4^-$ and $PO_4^{3-}$.\n$HCO_3^-$ can form $H_2CO_3$ and $CO_3^{2-}$.\nAll three in set (1) are amphiprotic.',
    topic: 'Amphiprotic Substances',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 64,
    question_type: 'single_choice',
    question_text: 'The strongest Bronsted base among the following anions is',
    options: [
      '$O^{2-}$',
      '$Cl^-$',
      '$I^-$',
      '$Br^-$'
    ],
    correct_index: 0,
    solution: '$Cl^-, Br^-, I^-$ are conjugate bases of very strong acids ($HCl, HBr, HI$) and are extremely weak bases. $O^{2-}$ is the conjugate base of the weak base/acid $OH^-$ and has very high charge density, making it a very strong Bronsted base that protonates completely in water.',
    topic: 'Bronsted Base Strength',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 65,
    question_type: 'single_choice',
    question_text: 'Given: Enthalpy of ionization of two acids:\n$\\Delta H^\\circ(HCN) = 4.52\\text{ kJ mol}^{-1}$\n$\\Delta H^\\circ(CH_3COOH) = 2.1\\text{ kJ mol}^{-1}$\nWhich relationship for the two acids is true?',
    options: [
      '$\\text{p}K_a(HCN) = \\text{p}K_a(CH_3COOH)$',
      '$\\text{p}K_a(HCN) > \\text{p}K_a(CH_3COOH)$',
      '$\\text{p}K_a(HCN) < \\text{p}K_a(CH_3COOH)$',
      '$\\text{p}K_a(HCN) = \\frac{2.1}{4.52} \\text{p}K_a(CH_3COOH)$'
    ],
    correct_index: 1,
    solution: 'A higher enthalpy of ionization indicates that more energy is required to ionize the acid, meaning it ionizes to a lesser extent and is a weaker acid ($K_a$ is smaller).\nSince $K_a(HCN) < K_a(CH_3COOH)$, we have $\\text{p}K_a(HCN) > \\text{p}K_a(CH_3COOH)$.',
    topic: 'Enthalpy of Ionization and Acid Strength',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 66,
    question_type: 'single_choice',
    question_text: 'The correct formula to calculate the hydroxyl ion $[OH^-]$ of an aqueous solution of $NH_4NO_2$ is',
    options: [
      '$\\sqrt{\\frac{C \\cdot K_w}{K_a}}$',
      '$\\sqrt{\\frac{K_w \\cdot K_b}{C}}$',
      '$\\sqrt{\\frac{K_w \\cdot K_a}{K_b}}$',
      '$\\sqrt{\\frac{K_w \\cdot K_b}{K_a}}$'
    ],
    correct_index: 3,
    solution: '$NH_4NO_2$ is a salt of a weak acid ($HNO_2$) and a weak base ($NH_4OH$).\nFor such salts, $[H^+] = \\sqrt{\\frac{K_w K_a}{K_b}}$ and $[OH^-] = \\frac{K_w}{[H^+]} = \\sqrt{\\frac{K_w K_b}{K_a}}$.',
    topic: 'Hydrolysis of Salt of Weak Acid and Weak Base',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 67,
    question_type: 'single_choice',
    question_text: 'The solubility of $Ba_3(AsO_4)_2$ (formula mass $= 690$) is $6.9 \\times 10^{-2}\\text{ g per } 100\\text{ mL}$. Its $K_{sp}$ is',
    options: [
      '$1.08 \\times 10^{-11}$',
      '$1.08 \\times 10^{-13}$',
      '$1.0 \\times 10^{-15}$',
      '$1.08 \\times 10^{-15}$'
    ],
    correct_index: 1,
    solution: 'Solubility in $\\text{g/L} = \\frac{6.9 \\times 10^{-2}}{100} \\times 1000 = 0.69\\text{ g/L}$.\nMolar solubility $s = \\frac{0.69}{690} = 10^{-3}\\text{ mol/L}$.\n$Ba_3(AsO_4)_2 \\rightleftharpoons 3Ba^{2+} + 2AsO_4^{3-} \\implies K_{sp} = (3s)^3 (2s)^2 = 27s^3 \\times 4s^2 = 108 s^5$.\n$K_{sp} = 108 \\times (10^{-3})^5 = 108 \\times 10^{-15} = 1.08 \\times 10^{-13}$.',
    topic: 'Solubility Product Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 68,
    question_type: 'single_choice',
    question_text: 'The given pH curve is valid for:',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793438154/edvedum_chemistry/equilibrium/eq_q68.png',
    options: [
      'Weak acid vs strong base',
      'Strong acid vs strong base',
      'Strong acid vs weak base',
      'Weak acid vs weak base'
    ],
    correct_index: 0,
    solution: 'The titration curve starts at an initial pH around 3-4 (typical of a weak acid) and has an equivalence point in the basic region above pH 7 (~8.5-9), which is characteristic of the titration of a Weak Acid against a Strong Base.',
    topic: 'Titration Curves',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 69,
    question_type: 'single_choice',
    question_text: 'Calculate pH for $0.01\\text{ N } Ca(OH)_2$:',
    options: [
      '2',
      '12',
      '6',
      '4'
    ],
    correct_index: 1,
    solution: 'Normality directly gives equivalent concentration of hydroxide ions: $[OH^-] = 0.01\\text{ N} = 10^{-2}\\text{ M}$.\n$\\text{pOH} = -\\log[OH^-] = -\\log(10^{-2}) = 2$.\n$\\text{pH} = 14 - \\text{pOH} = 14 - 2 = 12$.',
    topic: 'pH from Normality of Base',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 70,
    question_type: 'single_choice',
    question_text: 'The ionisation constant of acetic acid is $1.8 \\times 10^{-5}$. At what concentration will it be dissociated to $2\\%$?',
    options: [
      '$1\\text{ M}$',
      '$0.018\\text{ M}$',
      '$0.18\\text{ M}$',
      '$0.045\\text{ M}$'
    ],
    correct_index: 3,
    solution: 'Degree of dissociation $\\alpha = 2\\% = 0.02$.\nAccording to Ostwald\'s dilution law: $K_a = C\\alpha^2 \\implies C = \\frac{K_a}{\\alpha^2}$.\n$C = \\frac{1.8 \\times 10^{-5}}{(0.02)^2} = \\frac{1.8 \\times 10^{-5}}{4 \\times 10^{-4}} = 0.45 \\times 10^{-1} = 0.045\\text{ M}$.',
    topic: 'Ostwald Dilution Law Calculation',
    difficulty: 'easy',
    marks: 4
  }
];

