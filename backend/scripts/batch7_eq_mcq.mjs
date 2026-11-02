// Batch 7: Equilibrium Questions Q211 - Q234
export const batch7Questions = [
  {
    serialNumber: 211,
    question_type: 'single_choice',
    question_text: 'A monoprotic acid undergoes $40\\%$ dissociation in its $0.2\\text{ M}$ aqueous solution. The approx. pH of solution will be',
    options: [
      '2',
      '1.7',
      '1.53',
      '1.1'
    ],
    correct_index: 3,
    solution: '$\\alpha = 40\\% = 0.40$.\n$[H^+] = C \\cdot \\alpha = 0.2 \\times 0.40 = 0.08\\text{ M} = 8 \\times 10^{-2}\\text{ M}$.\n$\\text{pH} = -\\log[H^+] = -\\log(8 \\times 10^{-2}) = 2 - 3\\log 2 = 2 - 3(0.3010) = 2 - 0.903 = 1.097 \\approx 1.1$.',
    topic: 'pH from Degree of Dissociation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 212,
    question_type: 'single_choice',
    question_text: 'In the reaction, $N_2O_4 \\rightleftharpoons 2NO_2$. On reducing the pressure the reaction shifts in forward direction. This is because on reducing pressure',
    options: [
      '$Q_c$ increases while $K_c$ remains constant',
      '$Q_c$ decreases while $K_c$ remains constant',
      '$Q_c$ remains constant while $K_c$ decreases',
      '$Q_c$ remains constant while $K_c$ increases'
    ],
    correct_index: 1,
    solution: 'Reducing pressure corresponds to increasing volume $V$.\nFor $N_2O_4 \\rightleftharpoons 2NO_2$, the reaction quotient is $Q_c = \\frac{[NO_2]^2}{[N_2O_4]} = \\frac{(n_{NO_2}/V)^2}{n_{N_2O_4}/V} = \\frac{n_{NO_2}^2}{n_{N_2O_4} \\cdot V}$.\nWhen volume $V$ increases, $Q_c$ decreases such that $Q_c < K_c$. To restore equilibrium, the reaction proceeds in the forward direction while $K_c$ remains constant.',
    topic: 'Le Chatelier Principle and Reaction Quotient',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 213,
    question_type: 'single_choice',
    question_text: 'Which of the following aqueous solution will have maximum pH?',
    options: [
      '$1\\text{ M } NaCl$',
      '$1\\text{ M } CH_3COONa$',
      '$1\\text{ M } NH_4Cl$',
      '$1\\text{ M } HCl$'
    ],
    correct_index: 1,
    solution: '- $NaCl$ is neutral ($\\text{pH} = 7$).\n- $HCl$ is strongly acidic ($\\text{pH} = 0$).\n- $NH_4Cl$ is weakly acidic due to cationic hydrolysis ($\\text{pH} < 7$).\n- $CH_3COONa$ is weakly basic due to anionic hydrolysis ($\\text{pH} > 7$).\nTherefore, $1\\text{ M } CH_3COONa$ has the maximum pH.',
    topic: 'Comparison of Salt Solution pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 214,
    question_type: 'single_choice',
    question_text: 'Two solutions of equal volume of $\\text{pH} = 3$ and $\\text{pH} = 5$ are mixed together. The pH of resultant solution will be nearly [$\\log 3 = 0.48, \\log 5 = 0.7$]',
    options: [
      '4',
      '2.7',
      '3.3',
      '3.5'
    ],
    correct_index: 2,
    solution: '$[H^+]_1 = 10^{-3}\\text{ M}$, $[H^+]_2 = 10^{-5}\\text{ M}$.\nMixing equal volumes $V$:\n$[H^+]_{mix} = \\frac{10^{-3} + 10^{-5}}{2} = \\frac{0.00101}{2} = 5.05 \\times 10^{-4}\\text{ M}$.\n$\\text{pH} = -\\log(5.05 \\times 10^{-4}) = 4 - \\log 5.05 = 4 - 0.70 = 3.30$.',
    topic: 'pH of Mixture of Solutions',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 215,
    question_type: 'single_choice',
    question_text: 'Which of the following reaction has minimum value of $K_p / K_c$?',
    options: [
      '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$',
      '$PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$',
      '$2HI(g) \\rightleftharpoons H_2(g) + I_2(g)$',
      '$N_2O_4(g) \\rightleftharpoons 2NO_2(g)$'
    ],
    correct_index: 0,
    solution: '$K_p / K_c = (RT)^{\\Delta n_g}$.\n- For $N_2 + 3H_2 \\rightleftharpoons 2NH_3$: $\\Delta n_g = 2 - 4 = -2$.\n- For $PCl_5 \\rightleftharpoons PCl_3 + Cl_2$: $\\Delta n_g = 2 - 1 = +1$.\n- For $2HI \\rightleftharpoons H_2 + I_2$: $\\Delta n_g = 2 - 2 = 0$.\n- For $N_2O_4 \\rightleftharpoons 2NO_2$: $\\Delta n_g = 2 - 1 = +1$.\nThe minimum value corresponds to the lowest power of $\\Delta n_g = -2$.',
    topic: 'Ratio of Kp to Kc',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 216,
    question_type: 'single_choice',
    question_text: 'In the reaction $A(g) + 2B(g) \\rightleftharpoons 2C(g) + D(g)$, the initial concentration of B is twice of A and at equilibrium the concentration of A and D are equal then the value of equilibrium constant is',
    options: [
      '4',
      '16',
      '2',
      '1'
    ],
    correct_index: 3,
    solution: 'Let initial $[A]_0 = a$, $[B]_0 = 2a$.\nAt equilibrium:\n$[A] = a - x$, $[B] = 2a - 2x = 2(a - x)$, $[C] = 2x$, $[D] = x$.\nGiven $[A] = [D] \\implies a - x = x \\implies a = 2x \\implies x = a/2$.\nEquilibrium concentrations:\n$[A] = a/2$, $[B] = a$, $[C] = a$, $[D] = a/2$.\n$K_c = \\frac{[C]^2 [D]}{[A][B]^2} = \\frac{(a)^2 (a/2)}{(a/2)(a)^2} = 1$.',
    topic: 'Calculation of Kc from Stoichiometry',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 217,
    question_type: 'single_choice',
    question_text: 'When $100\\text{ ml } 1\\text{ M } H_2SO_4$ is mixed with $50\\text{ ml of } 4\\text{ M } NaOH$ solution, pH of resulting solution would be',
    options: [
      '6.05',
      '8.10',
      '7.00',
      '6.20'
    ],
    correct_index: 2,
    solution: 'Milliequivalents of $H_2SO_4 = 100 \\times 1 \\times 2 = 200\\text{ meq}$.\nMilliequivalents of $NaOH = 50 \\times 4 \\times 1 = 200\\text{ meq}$.\nSince equivalents of strong acid and strong base are equal, complete neutralization occurs forming neutral $Na_2SO_4$ solution with $\\text{pH} = 7.00$.',
    topic: 'Neutralization of Strong Acid and Strong Base',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 218,
    question_type: 'single_choice',
    question_text: 'The degree of hydrolysis of $0.2\\text{ M } NH_4Cl$ solution will be [$K_b\\text{ for } NH_4OH \\text{ is } 1.8 \\times 10^{-5}$]',
    options: [
      '$5.27 \\times 10^{-5}$',
      '$3.16 \\times 10^{-4}$',
      '$3.65 \\times 10^{-5}$',
      '$5.15 \\times 10^{-5}$'
    ],
    correct_index: 0,
    solution: 'For salt of strong acid and weak base:\n$h = \\sqrt{\\frac{K_w}{K_b \\cdot C}} = \\sqrt{\\frac{1.0 \\times 10^{-14}}{1.8 \\times 10^{-5} \\times 0.2}} = \\sqrt{\\frac{10^{-9}}{3.6}} = \\sqrt{2.778 \\times 10^{-10}} = 5.27 \\times 10^{-5}$.',
    topic: 'Degree of Hydrolysis Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 219,
    question_type: 'single_choice',
    question_text: 'When the volume of container is doubled then which of the following equilibrium shifts in the right direction?',
    options: [
      '$2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)$',
      '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$',
      '$N_2O_4(g) \\rightleftharpoons 2NO_2(g)$',
      '$2HI(g) \\rightleftharpoons H_2(g) + I_2(g)$'
    ],
    correct_index: 2,
    solution: 'Doubling the container volume halves the total pressure. By Le Chatelier\'s principle, a decrease in pressure shifts the equilibrium toward the side with a greater number of gaseous moles ($\\Delta n_g > 0$). For $N_2O_4(g) \\rightleftharpoons 2NO_2(g)$, $\\Delta n_g = 2 - 1 = +1 > 0$, so the reaction shifts forward (to the right).',
    topic: 'Le Chatelier Principle - Volume Expansion',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 220,
    question_type: 'single_choice',
    question_text: 'Find the change in pH value of buffer solution when $50\\text{ ml } \\frac{M}{10} HCl$ is added to a buffer containing $100\\text{ ml } \\frac{M}{10} CH_3COOH$ and $100\\text{ ml } \\frac{M}{10} CH_3COONa$ ($\\text{p}K_a = 4.74, \\log 3 = 0.4771$):',
    options: [
      'pH decreases by 0.47',
      'pH decreases by 0.477',
      'pH remain constant',
      'pH increases by 1'
    ],
    correct_index: 1,
    solution: 'Initial buffer: $[\\text{salt}] = [\\text{acid}] \\implies \\text{pH}_1 = \\text{p}K_a = 4.74$.\nMoles of components: $n_{salt} = 10\\text{ mmol}, n_{acid} = 10\\text{ mmol}$.\nMoles of $HCl$ added $= 50 \\times 0.1 = 5\\text{ mmol}$.\nNew moles: $n_{salt} = 10 - 5 = 5\\text{ mmol}$, $n_{acid} = 10 + 5 = 15\\text{ mmol}$.\n$\\text{pH}_2 = 4.74 + \\log\\left(\\frac{5}{15}\\right) = 4.74 - \\log 3 = 4.74 - 0.4771 = 4.263$.\nChange in pH: $\\Delta\\text{pH} = 4.74 - 4.263 = 0.477$ (decreases by 0.477).',
    topic: 'Buffer Action and pH Change Quantitative',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 221,
    question_type: 'single_choice',
    question_text: 'In $Ca(OH)_2$ solution (aqueous), the molar concentration of $[OH^-]$ is found to be $x$, the solubility of $Ca(OH)_2$ in mol/litre is',
    options: [
      '$2x$',
      '$x$',
      '$\\frac{x}{2}$',
      '$4x$'
    ],
    correct_index: 2,
    solution: '$Ca(OH)_2(s) \\rightleftharpoons Ca^{2+}(aq) + 2OH^-(aq)$.\nIf molar solubility is $s$, then $[Ca^{2+}] = s$ and $[OH^-] = 2s$.\nGiven $[OH^-] = x \\implies 2s = x \\implies s = \\frac{x}{2}$.',
    topic: 'Molar Solubility Relation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 222,
    question_type: 'single_choice',
    question_text: 'Hydrolysis constant ($K_h$) of salt of weak acid and weak base is given by',
    options: [
      '$K_h = \\frac{K_w}{K_a}$',
      '$K_h = \\frac{K_w}{K_a \\cdot K_b}$',
      '$K_h = \\frac{K_w}{K_b}$',
      '$K_h = \\frac{K_w \\cdot K_a}{K_b}$'
    ],
    correct_index: 1,
    solution: 'For the salt of a weak acid and a weak base, both the cation and anion undergo hydrolysis simultaneously:\n$B^+ + A^- + H_2O \\rightleftharpoons BOH + HA$.\nHydrolysis constant $K_h = \\frac{K_w}{K_a \\cdot K_b}$.',
    topic: 'Hydrolysis Constant Formula',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 223,
    question_type: 'single_choice',
    question_text: '$0.01\\text{ M } NH_4OH$ is $50\\%$ neutralised by using $HCl$ solution. The pOH value of final solution will be ($\\text{p}K_b = 4.74$):',
    options: [
      '7.26',
      '6.74',
      '4.74',
      '8.74'
    ],
    correct_index: 2,
    solution: 'At $50\\%$ neutralization, exactly half of the weak base has been converted into its conjugate salt, so $[\\text{salt}] = [\\text{base}]$.\nBy Henderson-Hasselbalch equation:\n$\\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{salt}]}{[\\text{base}]} = \\text{p}K_b + \\log(1) = \\text{p}K_b = 4.74$.',
    topic: 'Half-Neutralization Buffer Point',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 224,
    question_type: 'single_choice',
    question_text: 'The relation between $K_p$ and $K_c$ at equilibrium is',
    options: [
      '$K_c = K_p(RT)^{\\Delta n}$',
      '$K_p = K_c(RT)^{\\Delta n}$',
      '$K_c = K_p(RT)^{-\\Delta n}$',
      '$K_p = K_c(RT)^{-\\Delta n}$'
    ],
    correct_index: 1,
    solution: 'The general thermodynamic relationship between pressure-based and concentration-based equilibrium constants is:\n$K_p = K_c(RT)^{\\Delta n_g}$, where $\\Delta n_g$ is the difference in stoichiometric moles of gaseous products and reactants.',
    topic: 'Relationship between Kp and Kc',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 225,
    question_type: 'single_choice',
    question_text: 'The nature of $10^{-7}\\text{ M } HCl$ solution is',
    options: [
      'Acidic',
      'Basic',
      'Neutral',
      'Cannot define'
    ],
    correct_index: 0,
    solution: 'In a $10^{-7}\\text{ M } HCl$ solution, the auto-ionization of water cannot be neglected:\nTotal $[H^+] = [H^+]_{acid} + [H^+]_{water} = 10^{-7} + x$.\nSince $[H^+] > 10^{-7}\\text{ M}$, the solution has $\\text{pH} < 7$ (around 6.79), confirming it is acidic in nature.',
    topic: 'pH of Very Dilute Strong Acid',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 226,
    question_type: 'single_choice',
    question_text: '$20\\text{ ml of } H_2$ and $20\\text{ ml of } I_2$ was heated in a one litre vessel and at equilibrium $30\\text{ ml of } HI$ was found. $K_c$ is',
    options: [
      '1.8',
      '0.18',
      '36',
      '0.018'
    ],
    correct_index: 2,
    solution: 'Reaction: $H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$.\nFormation of $30\\text{ mL } HI$ consumes $15\\text{ mL } H_2$ and $15\\text{ mL } I_2$.\nEquilibrium volumes:\n$V_{H_2} = 20 - 15 = 5\\text{ mL}$, $V_{I_2} = 20 - 15 = 5\\text{ mL}$, $V_{HI} = 30\\text{ mL}$.\nSince $\\Delta n_g = 0$, volume/concentration terms cancel out:\n$K_c = \\frac{(30)^2}{5 \\times 5} = \\frac{900}{25} = 36$.',
    topic: 'Equilibrium Constant from Volume Data',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 227,
    question_type: 'single_choice',
    question_text: 'Which pair will show common ion effect?',
    options: [
      '$BaCl_2 + Ba(NO_3)_2$',
      '$NaCl + HCl$',
      '$NH_4OH + NH_4Cl$',
      '$NaCN + KCN$'
    ],
    correct_index: 2,
    solution: 'Common ion effect is observed when a strong electrolyte is added to a weak electrolyte sharing a common ion, thereby suppressing the ionization of the weak electrolyte. In $NH_4OH + NH_4Cl$, $NH_4Cl$ is a strong electrolyte providing $NH_4^+$ ions that suppress the ionization of the weak base $NH_4OH$.',
    topic: 'Common Ion Effect Definition and Examples',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 228,
    question_type: 'single_choice',
    question_text: 'A $1\\text{ M}$ monoprotic acid is $0.001\\%$ ionised. The dissociation constant of acid is',
    options: [
      '$1.0 \\times 10^{-4}$',
      '$1.0 \\times 10^{-6}$',
      '$1.0 \\times 10^{-8}$',
      '$1.0 \\times 10^{-10}$'
    ],
    correct_index: 3,
    solution: 'Degree of dissociation $\\alpha = 0.001\\% = \\frac{0.001}{100} = 10^{-5}$.\nConcentration $C = 1\\text{ M}$.\n$K_a = C\\alpha^2 = 1 \\times (10^{-5})^2 = 1.0 \\times 10^{-10}$.',
    topic: 'Ostwald\'s Dilution Law Calculation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 229,
    question_type: 'single_choice',
    question_text: 'Conjugate acid of $OH^-$ base is',
    options: [
      '$H_2$',
      '$H_2O$',
      '$O^{2-}$',
      '$H_3O^+$'
    ],
    correct_index: 1,
    solution: 'According to Bronsted-Lowry theory, the conjugate acid of a base is formed by adding one proton ($H^+$):\n$OH^- + H^+ \\rightarrow H_2O$.',
    topic: 'Conjugate Acid-Base Pairs',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 230,
    question_type: 'single_choice',
    question_text: 'The dissociation constant of acids HA, HB, HC and HD are $1.3 \\times 10^{-4}, 1.8 \\times 10^{-5}, 6.23 \\times 10^{-7}$ and $8.5 \\times 10^{-9}$ respectively. The weakest acid among these is',
    options: [
      'HA',
      'HB',
      'HC',
      'HD'
    ],
    correct_index: 3,
    solution: 'Acid strength is directly proportional to the dissociation constant $K_a$. HD has the lowest $K_a$ value ($8.5 \\times 10^{-9}$), which makes it the weakest acid among the four.',
    topic: 'Relative Strengths of Acids from Ka',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 231,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is incorrect?',
    options: [
      'pH of pure water at $50^\\circ\\text{C}$ is non-zero',
      'pH of $10^{-8}\\text{ M } HCl$ is less than 7 at $25^\\circ\\text{C}$',
      'Addition of one drop of conc. $HCl$ in $NH_4OH$ solution decreases the pH of solution',
      'Equimolar mixture of $HCN$ and $NaOH$ solution has $\\text{pH of } 7$'
    ],
    correct_index: 3,
    solution: 'An equimolar mixture of a weak acid ($HCN$) and a strong base ($NaOH$) neutralizes to form sodium cyanide ($NaCN$). $NaCN$ undergoes anionic hydrolysis in water to produce an alkaline solution with $\\text{pH} > 7$, not 7. Therefore, statement (4) is incorrect.',
    topic: 'Salt Hydrolysis and Acid-Base Concepts',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 232,
    question_type: 'single_choice',
    question_text: 'The nature of solution for salt of weak acid and strong base is',
    options: [
      'Acidic',
      'Basic',
      'Neutral',
      'Both (1) & (2)'
    ],
    correct_index: 1,
    solution: 'For a salt of weak acid and strong base (such as $CH_3COONa$):\n$A^- + H_2O \\rightleftharpoons HA + OH^-$.\nThe generation of excess hydroxide ions ($OH^-$) renders the solution basic ($\\text{pH} > 7$).',
    topic: 'Anionic Hydrolysis Nature',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 233,
    question_type: 'single_choice',
    question_text: 'Correct representation for the solubility product of $Hg_2Cl_2$?',
    options: [
      '$[Hg_2^{2+}][Cl^-]^2$',
      '$[Hg_2^{2+}]^2[Cl^-]^2$',
      '$[Hg^{2+}][Cl^-]^2$',
      '$[Hg_2^{2+}][Cl^-]$'
    ],
    correct_index: 0,
    solution: 'Calomel exists with a diatomic mercurous ion: $Hg_2Cl_2(s) \\rightleftharpoons Hg_2^{2+}(aq) + 2Cl^-(aq)$.\nTherefore, the correct solubility product expression is $K_{sp} = [Hg_2^{2+}][Cl^-]^2$.',
    topic: 'Solubility Product of Calomel',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 234,
    question_type: 'single_choice',
    question_text: 'Which of the following is not a buffer?',
    options: [
      '$NaCN / HCN$',
      '$C_2H_5NH_2 / C_2H_5NH_3^+ Cl^-$',
      '$Na_2HPO_4 / Na_3PO_4$',
      '$NH_4OH / NaOH$'
    ],
    correct_index: 3,
    solution: 'A buffer requires a conjugate acid-base pair consisting of a weak acid and its conjugate base, or a weak base and its conjugate acid. $NH_4OH$ and $NaOH$ are both bases (one weak, one strong) and do not constitute a conjugate pair, so they cannot function as a buffer.',
    topic: 'Buffer Identification',
    difficulty: 'easy',
    marks: 4
  }
];

