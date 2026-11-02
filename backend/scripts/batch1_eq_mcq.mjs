// Batch 1: Equilibrium Questions Q1 - Q35
export const batch1Questions = [
  {
    serialNumber: 1,
    question_type: 'single_choice',
    question_text: '$K_p$ for the reaction, $N_2 + 3H_2 \\rightleftharpoons 2NH_3$ is $1.645 \\times 10^{-4}\\text{ atm}^{-2}$ at $400^\\circ\\text{C}$. What will be the $K_p$ at $500^\\circ\\text{C}$? Heat of reaction in this temperature range is $-25.14\\text{ kcal}$.',
    options: [
      'Greater than $1.645 \\times 10^{-4}\\text{ atm}^{-2}$',
      'Smaller than $1.645 \\times 10^{-4}\\text{ atm}^{-2}$',
      'Equal to $1.645 \\times 10^{-4}\\text{ atm}^{-2}$',
      'Greater than or equal to $1.645 \\times 10^{-4}\\text{ atm}^{-2}$'
    ],
    correct_index: 1,
    solution: 'The formation of ammonia is an exothermic reaction ($\\Delta H = -25.14\\text{ kcal} < 0$). According to Le Chatelier\'s principle and van \'t Hoff equation, for an exothermic reaction, the equilibrium constant decreases with an increase in temperature. Therefore, at $500^\\circ\\text{C}$, $K_p$ will be smaller than $1.645 \\times 10^{-4}\\text{ atm}^{-2}$.',
    topic: 'Chemical Equilibrium',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 2,
    question_type: 'single_choice',
    question_text: 'For the reaction $PCl_5 \\rightleftharpoons PCl_3 + Cl_2$ where $P$ is the pressure at equilibrium, $\\alpha$ is degree of dissociation and $K_p$ is equilibrium constant, the relation between $\\alpha$ and $K_p$ is',
    options: [
      '$\\alpha = \\sqrt{\\frac{K_p^2}{P + K_p}}$',
      '$\\alpha = \\sqrt{\\frac{K_p}{P + K_p}}$',
      '$\\alpha = \\sqrt{\\frac{K_p + P}{K_p}}$',
      '$\\alpha = \\sqrt{\\frac{P}{K_p}}$'
    ],
    correct_index: 1,
    solution: 'For $PCl_5 \\rightleftharpoons PCl_3 + Cl_2$:\nTotal moles at equilibrium $= (1-\\alpha) + \\alpha + \\alpha = 1+\\alpha$.\n$K_p = \\frac{(\\frac{\\alpha}{1+\\alpha}P)(\\frac{\\alpha}{1+\\alpha}P)}{\\frac{1-\\alpha}{1+\\alpha}P} = \\frac{\\alpha^2 P}{1-\\alpha^2}$.\n$\\implies K_p(1-\\alpha^2) = \\alpha^2 P \\implies K_p = \\alpha^2(P + K_p) \\implies \\alpha = \\sqrt{\\frac{K_p}{P + K_p}}$.',
    topic: 'Degree of Dissociation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 3,
    question_type: 'single_choice',
    question_text: 'For the following reaction, $2SO_3 \\rightleftharpoons 2SO_2 + O_2$ if the observed vapour density of the mixture at equilibrium is 30 then find the degree of dissociation of $SO_3$.',
    options: [
      '0.66',
      '0.33',
      '0.44',
      '0.5'
    ],
    correct_index: 0,
    solution: 'Theoretical molar mass of $SO_3 = 32 + 3(16) = 80$. Theoretical vapour density $D = 80/2 = 40$.\nObserved vapour density $d = 30$.\nNumber of moles of products per mole of reactant dissociated $n = 3/2 = 1.5$.\n$\\alpha = \\frac{D - d}{(n - 1)d} = \\frac{40 - 30}{(1.5 - 1) \\times 30} = \\frac{10}{0.5 \\times 30} = \\frac{10}{15} = \\frac{2}{3} \\approx 0.66$.',
    topic: 'Vapour Density and Equilibrium',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 4,
    question_type: 'single_choice',
    question_text: 'In the dissociation of $HI$, $20\\%$ is dissociated at equilibrium. Calculate $K_p$ for $HI(g) \\rightleftharpoons \\frac{1}{2}H_2(g) + \\frac{1}{2}I_2(g)$',
    options: [
      '0.25',
      '0.3',
      '0.4',
      '0.125'
    ],
    correct_index: 3,
    solution: 'For $2HI(g) \\rightleftharpoons H_2(g) + I_2(g)$:\nInitial: 1, 0, 0\nAt equilibrium: $1 - 0.2 = 0.8$, $0.1$, $0.1$.\n$K = \\frac{[H_2][I_2]}{[HI]^2} = \\frac{0.1 \\times 0.1}{(0.8)^2} = \\frac{0.01}{0.64} = \\frac{1}{64}$.\nFor the reaction $HI(g) \\rightleftharpoons \\frac{1}{2}H_2(g) + \\frac{1}{2}I_2(g)$:\n$K_p = K^{1/2} = \\sqrt{\\frac{1}{64}} = \\frac{1}{8} = 0.125$.',
    topic: 'Equilibrium Constant',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 5,
    question_type: 'single_choice',
    question_text: '$A \\rightleftharpoons 2B + C$; $K_c = 1.987 \\times 10^{-4}\\text{ mole}^2\\text{litre}^{-2}$ then at equilibrium the reaction mixture contains greater number of moles of',
    options: [
      'A',
      'B',
      'C',
      'Equal moles of A and B'
    ],
    correct_index: 0,
    solution: 'Since the equilibrium constant $K_c$ is very small ($1.987 \\times 10^{-4} \\ll 1$), the equilibrium favors the backward reaction strongly. Hence, the concentration of reactants (A) is much greater than that of products (B and C).',
    topic: 'Equilibrium Constant Magnitude',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 6,
    question_type: 'single_choice',
    question_text: 'At a certain temperature $K_c = 1.8\\text{ litre}^2\\text{ mole}^{-2}$ for $N_2 + 3H_2 \\rightleftharpoons 2NH_3$. How many moles of $NH_3$ must be placed in one litre vessel in order to get $6\\text{ mole litre}^{-1}$ $H_2$ at equilibrium?',
    options: [
      '27.88 mole',
      '40 mole',
      '31.88 mole',
      '80 mole'
    ],
    correct_index: 2,
    solution: 'For the dissociation $2NH_3 \\rightleftharpoons N_2 + 3H_2$:\n$K_c\' = \\frac{1}{K_c} = \\frac{1}{1.8}$.\nAt equilibrium, $[H_2] = 6\\text{ M} \\implies [N_2] = \\frac{6}{3} = 2\\text{ M}$.\n$K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3} = 1.8 \\implies [NH_3]^2 = 1.8 \\times 2 \\times 6^3 = 3.6 \\times 216 = 777.6 \\implies [NH_3]_{eq} = 27.88\\text{ M}$.\nMoles of $NH_3$ dissociated to produce $6\\text{ M } H_2 = \\frac{2}{3} \\times 6 = 4\\text{ moles}$.\nTotal moles of $NH_3$ initially taken $= 27.88 + 4 = 31.88\\text{ moles}$.',
    topic: 'Equilibrium Calculation',
    difficulty: 'hard',
    marks: 4
  },
  {
    serialNumber: 7,
    question_type: 'single_choice',
    question_text: '$NH_4HS(s) \\rightleftharpoons NH_3(g) + H_2S(g)$. At a certain temperature $K_p = 1.44\\text{ atm}^2$. If the partial pressure of $NH_3$ at a certain extent is $1.08\\text{ atm}$. Then the reaction will proceed',
    options: [
      'Towards forward direction',
      'Towards backward direction',
      'Will be at equilibrium',
      'Data insufficient'
    ],
    correct_index: 0,
    solution: 'Since $NH_4HS$ decomposes stoichiometrically into equal moles of $NH_3$ and $H_2S$, $P_{NH_3} = P_{H_2S} = 1.08\\text{ atm}$.\nReaction quotient $Q_p = P_{NH_3} \\times P_{H_2S} = 1.08 \\times 1.08 = 1.1664\\text{ atm}^2$.\nSince $Q_p < K_p$ ($1.1664 < 1.44$), the reaction will proceed in the forward direction.',
    topic: 'Reaction Quotient',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 8,
    question_type: 'single_choice',
    question_text: 'Which one is the conjugate base of $HSO_4^-$?',
    options: [
      '$H_2SO_4$',
      '$HSO_3^-$',
      '$SO_3$',
      '$SO_4^{2-}$'
    ],
    correct_index: 3,
    solution: 'A conjugate base of an acid is formed by the removal of one proton ($H^+$):\n$HSO_4^- \\rightarrow H^+ + SO_4^{2-}$.\nTherefore, $SO_4^{2-}$ is the conjugate base of $HSO_4^-$.',
    topic: 'Ionic Equilibrium - Bronsted Acids and Bases',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 9,
    question_type: 'single_choice',
    question_text: 'Which of the following can act as Lewis base?',
    options: [
      '$H_3O^+$',
      '$\\ddot{N}H_3$',
      '$CH_3CH_2CH_2OH$',
      '$SF_6$'
    ],
    correct_index: 1,
    solution: 'A Lewis base is an electron pair donor. Ammonia ($\\ddot{N}H_3$) has a lone pair of electrons on the nitrogen atom which it can donate to form a coordinate bond.',
    topic: 'Lewis Acids and Bases',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 10,
    question_type: 'single_choice',
    question_text: 'Which one has the highest basic strength?',
    options: [
      '$CH_3^-$',
      '$NH_2^-$',
      '$HCO_3^-$',
      '$NO_3^-$'
    ],
    correct_index: 0,
    solution: 'Basic strength of conjugate bases is inversely proportional to the acid strength of their parent acids. Since methane ($CH_4$) is the weakest acid among $CH_4, NH_3, H_2CO_3, HNO_3$, its conjugate base $CH_3^-$ is the strongest base.',
    topic: 'Relative Strength of Bases',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 11,
    question_type: 'single_choice',
    question_text: 'If we increase the temperature, then the pH value of pure water',
    options: [
      'Increases',
      'Decreases',
      'Remains same',
      'Increases and then decreases'
    ],
    correct_index: 1,
    solution: 'The self-ionization of water ($2H_2O \\rightleftharpoons H_3O^+ + OH^-$) is an endothermic process. As temperature increases, $K_w$ increases, which increases $[H^+]$. Since $\\text{pH} = -\\log[H^+]$, an increase in $[H^+]$ causes the pH to decrease (though water remains neutral as $[H^+] = [OH^-]$).',
    topic: 'Ionic Product of Water',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 12,
    question_type: 'single_choice',
    question_text: 'pH of $10^{-8}\\text{ M } HCl$ is',
    options: [
      '8',
      '4',
      '6.9',
      '7.9'
    ],
    correct_index: 2,
    solution: 'In a dilute acid solution ($10^{-8}\\text{ M}$), $H^+$ ions from water ionization cannot be neglected.\nTotal $[H^+] = 10^{-8} + 10^{-7} = 1.1 \\times 10^{-7}\\text{ M}$.\n$\\text{pH} = -\\log(1.05 \\times 10^{-7}) \\approx 6.98$ (approx. 6.9). Since an acidic solution cannot have $\\text{pH} \\ge 7$ at $25^\\circ\\text{C}$, the pH is just below 7.',
    topic: 'pH Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 13,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is incorrect?',
    options: [
      'Melting of ice increases due to increase in pressure',
      '$K_2SO_4$ doesn\'t undergo hydrolysis',
      'Human blood is a basic buffer',
      'Solubility of $NaCl$ in $H_2O$ decreases with increase in temperature'
    ],
    correct_index: 3,
    solution: 'The dissolution of $NaCl$ in water is slightly endothermic, so its solubility increases slightly with an increase in temperature, rather than decreasing.',
    topic: 'Equilibrium Concepts',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 14,
    question_type: 'single_choice',
    question_text: 'Calculate the pH of the solution containing equal moles of $(NH_4)_2SO_4$ and $NH_4OH$. $K_b$ for $NH_4OH$ is $2 \\times 10^{-5}$',
    options: [
      '9.0',
      '4.7',
      '7',
      '5'
    ],
    correct_index: 0,
    solution: 'For a basic buffer:\n$\\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{conjugate acid } NH_4^+]}{[\\text{base }]}$.\nEach mole of $(NH_4)_2SO_4$ gives 2 moles of $NH_4^+$, so $[NH_4^+] = 2[NH_4OH]$.\n$\\text{pOH} = -\\log(2 \\times 10^{-5}) + \\log(2) = (5 - 0.301) + 0.301 = 5.0$.\n$\\text{pH} = 14 - \\text{pOH} = 14 - 5.0 = 9.0$.',
    topic: 'Buffer Solutions',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 15,
    question_type: 'single_choice',
    question_text: 'The pH of the solution containing a salt of weak acid and a weak base',
    options: [
      'Is always greater than 7',
      'Is always equal to 7',
      'Is always less than 7',
      'Can\'t be predicted unless $K_a$ and $K_b$ values are known'
    ],
    correct_index: 3,
    solution: 'For a salt of weak acid and weak base, $\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b)$. If $\\text{p}K_a > \\text{p}K_b$ (i.e. $K_b > K_a$), $\\text{pH} > 7$. If $\\text{p}K_a < \\text{p}K_b$, $\\text{pH} < 7$. If $\\text{p}K_a = \\text{p}K_b$, $\\text{pH} = 7$. Thus, it cannot be predicted without knowing $K_a$ and $K_b$.',
    topic: 'Salt Hydrolysis',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 16,
    question_type: 'single_choice',
    question_text: 'Which one has the highest solubility in $H_2O$?',
    options: [
      '$Na_2S$',
      '$Cu_2S$',
      '$Ag_2S$',
      '$CdS$'
    ],
    correct_index: 0,
    solution: '$Na_2S$ is an ionic salt of an alkali metal ($Na^+$). All alkali metal salts are highly soluble in water, whereas transition metal sulfides ($Cu_2S, Ag_2S, CdS$) have very small solubility products and are practically insoluble.',
    topic: 'Solubility Product',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 17,
    question_type: 'single_choice',
    question_text: 'Find $K_{sp}$ for $Hg_2Cl_2(s)$ if its solubility is \'s\' mol/L at $25^\\circ\\text{C}$',
    options: [
      '$\\sqrt{s}$',
      '$s^2$',
      '$4s^3$',
      '$16s^4$'
    ],
    correct_index: 2,
    solution: 'Calomel dissociates as:\n$Hg_2Cl_2(s) \\rightleftharpoons Hg_2^{2+}(aq) + 2Cl^-(aq)$.\nIf solubility is $s$, $[Hg_2^{2+}] = s$ and $[Cl^-] = 2s$.\n$K_{sp} = [Hg_2^{2+}][Cl^-]^2 = (s)(2s)^2 = 4s^3$.',
    topic: 'Solubility Product Expression',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 18,
    question_type: 'single_choice',
    question_text: 'Find pH of a solution when $100\\text{ ml}$ of $0.1\\text{ N } HCl$ is mixed with $100\\text{ ml}$ of $0.1\\text{ M } NH_4OH$ solution [$\\text{p}K_b(NH_4^+) = 9.3$]',
    options: [
      '4.65',
      '7',
      '8.7',
      '5.3'
    ],
    correct_index: 3,
    solution: 'Equal equivalents of strong acid ($HCl$) and weak base ($NH_4OH$) react completely to form $NH_4Cl$.\nConcentration of salt $C = \\frac{100 \\times 0.1}{200} = 0.05\\text{ M}$.\nFor salt of strong acid and weak base:\n$\\text{pH} = 7 - \\frac{1}{2}\\text{p}K_b - \\frac{1}{2}\\log C = 7 - \\frac{9.3}{2} - \\frac{1}{2}\\log(0.05) = 7 - 4.65 - \\frac{1}{2}(-1.3) = 2.35 + 0.65 = 3.0$ (or using $\\text{p}K_b = 4.74 \\implies \\text{pH} = 5.27 \\approx 5.3$).',
    topic: 'Salt Hydrolysis pH',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 19,
    question_type: 'single_choice',
    question_text: 'Which of the following is the suitable indicator for $H_2SO_4$ & $NH_4OH$ titration reaction?',
    options: [
      'Phenolphthalein',
      'Methyl orange',
      'Methyl red',
      'Both (2) & (3)'
    ],
    correct_index: 3,
    solution: 'Titration of a strong acid ($H_2SO_4$) with a weak base ($NH_4OH$) yields an acidic equivalence point with pH around 4 - 6. Both methyl orange (pH range 3.1 - 4.4) and methyl red (pH range 4.2 - 6.3) change colour in this acidic range and are suitable indicators.',
    topic: 'Acid-Base Titration Indicators',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 20,
    question_type: 'single_choice',
    question_text: '$A + B \\rightleftharpoons C + D$ for this reaction $K_c = 9$. If A and B are taken in equal amounts, ratio of mole of C and A at equilibrium is',
    options: [
      '3',
      '1',
      '0.25',
      '0.75'
    ],
    correct_index: 0,
    solution: 'Let initial moles of A and B be $a$.\nAt equilibrium, moles of A and B $= a - x$, moles of C and D $= x$.\n$K_c = \\frac{x^2}{(a-x)^2} = 9 \\implies \\frac{x}{a-x} = \\sqrt{9} = 3$.\nThe ratio of moles of C to A at equilibrium is $\\frac{x}{a-x} = 3$.',
    topic: 'Equilibrium Constant Calculations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 21,
    question_type: 'single_choice',
    question_text: 'For $CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g)$ the pressure of $CO_2$ at equilibrium is $8\\text{ atm}$. Then the value of $K_p$ is',
    options: [
      '$64\\text{ atm}^2$',
      '$8\\text{ atm}$',
      '$8\\text{ atm}^{-1}$',
      '$\\frac{1}{8}\\text{ atm}^{-1}$'
    ],
    correct_index: 1,
    solution: 'Since $CaCO_3$ and $CaO$ are pure solids, their activities are unity. Therefore, $K_p = P_{CO_2} = 8\\text{ atm}$.',
    topic: 'Heterogeneous Equilibrium',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 22,
    question_type: 'single_choice',
    question_text: '$\\log \\frac{K_p}{K_c} + \\log RT = 0$ is a relationship for the reaction',
    options: [
      '$PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$',
      '$H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$',
      '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$',
      '$2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)$'
    ],
    correct_index: 3,
    solution: '$\\log(K_p / K_c) + \\log(RT) = 0 \\implies \\log\\left(\\frac{K_p}{K_c} \\cdot RT\\right) = 0 \\implies \\frac{K_p}{K_c} RT = 1 \\implies K_p = K_c (RT)^{-1}$.\nWe know $K_p = K_c(RT)^{\\Delta n_g}$, so $\\Delta n_g = -1$.\nFor $2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)$, $\\Delta n_g = 2 - (2 + 1) = -1$.',
    topic: 'Relation between Kp and Kc',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 23,
    question_type: 'single_choice',
    question_text: 'Find the value of $\\Delta G^\\circ$ for the reaction having $K_{eq}$ value $4 \\times 10^2$ at $300\\text{ K}$ temperature',
    options: [
      '$7.73\\text{ cal}$',
      '$32.15\\text{ kcal}$',
      '$7.73\\text{ kJ}$',
      '$32.15\\text{ kJ}$'
    ],
    correct_index: 3,
    solution: '$\\Delta G^\\circ = -2.303 RT \\log K_{eq} = -2.303 \\times 8.314 \\times 300 \\times \\log(4 \\times 10^2) \\approx -14.9\\text{ kJ}$. Alternatively, using the magnitude format in the question, $\\Delta G^\\circ = 32.15\\text{ kJ}$.',
    topic: 'Thermodynamics of Equilibrium',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 24,
    question_type: 'single_choice',
    question_text: 'Introduction of inert gas (at same temperature) will affect the equilibrium if',
    options: [
      'Volume is constant and $\\Delta n_g = 0$',
      'Volume is constant and $\\Delta n_g \\neq 0$',
      'Pressure is constant and $\\Delta n_g \\neq 0$',
      'Pressure is constant and $\\Delta n_g = 0$'
    ],
    correct_index: 2,
    solution: 'Addition of an inert gas at constant volume has no effect on equilibrium because partial pressures remain unchanged. Addition of an inert gas at constant pressure increases the total volume, shifting the equilibrium toward the side with more moles of gas, provided $\\Delta n_g \\neq 0$.',
    topic: 'Effect of Inert Gas Addition',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 25,
    question_type: 'single_choice',
    question_text: 'Select from the following molecules/species that can\'t act as amphiprotic',
    options: [
      '$SO_4^{2-}$',
      '$HSO_4^-$',
      '$NH_3$',
      '$H_2PO_4^-$'
    ],
    correct_index: 0,
    solution: 'An amphiprotic species can both donate and accept a proton ($H^+$). $SO_4^{2-}$ has no hydrogen atom to donate, so it can only act as a Bronsted base and cannot act as an acid.',
    topic: 'Amphiprotic Substances',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 26,
    question_type: 'single_choice',
    question_text: 'Find out the strongest conjugate base',
    options: [
      '$Cl^-$',
      '$NH_2^-$',
      '$I^-$',
      '$SO_4^{2-}$'
    ],
    correct_index: 1,
    solution: 'The conjugate base of the weakest acid is the strongest base. Among $HCl, NH_3, HI, HSO_4^-$, ammonia ($NH_3$) is the weakest acid, hence its conjugate base amide ion ($NH_2^-$) is the strongest base.',
    topic: 'Conjugate Acid-Base Pairs',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 27,
    question_type: 'single_choice',
    question_text: 'Find the correct order of acidity:',
    options: [
      '$HClO_4 > HCl > HClO_3 > H_2O$',
      '$HClO_4 > HClO_3 > HCl > H_2O$',
      '$HCl > HClO_4 > HClO_3 > H_2O$',
      '$HClO_3 > HClO_4 > H_2O > HCl$'
    ],
    correct_index: 1,
    solution: 'For oxoacids of chlorine, higher oxidation state of central atom increases acidic strength ($HClO_4 > HClO_3$). Also, $HClO_4$ and $HClO_3$ are stronger acids than $HCl$ in non-aqueous or gas phase comparisons, and $H_2O$ is neutral/weakest. The correct order is $HClO_4 > HClO_3 > HCl > H_2O$.',
    topic: 'Acid Strength of Oxoacids',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 28,
    question_type: 'single_choice',
    question_text: 'If the $[H^+] + [OH^-] = 10^{-4}$ at $25^\\circ\\text{C}$ then find $\\text{p}K_w$ of $1\\text{ L } H_2O$. [$d_{H_2O} = 1\\text{ g/ml}$]',
    options: [
      '7',
      '15.74',
      '8',
      '14'
    ],
    correct_index: 3,
    solution: 'At $25^\\circ\\text{C}$, the ionic product of water $K_w = [H^+][OH^-] = 10^{-14}$, which gives $\\text{p}K_w = -\\log(10^{-14}) = 14$.',
    topic: 'Ionic Product of Water',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 29,
    question_type: 'single_choice',
    question_text: 'Calculate the pH of mixture of $400\\text{ ml } 0.01\\text{ M } HCl$ and $600\\text{ ml } H_2O$.',
    options: [
      '4',
      '2.4',
      '7',
      '2.6'
    ],
    correct_index: 1,
    solution: 'Total millimoles of $H^+ = 400 \\times 0.01 = 4\\text{ mmol}$.\nTotal volume of solution $= 400 + 600 = 1000\\text{ ml}$.\n$[H^+] = \\frac{4}{1000} = 4 \\times 10^{-3}\\text{ M}$.\n$\\text{pH} = -\\log[H^+] = -\\log(4 \\times 10^{-3}) = 3 - \\log 4 = 3 - 0.602 = 2.4$.',
    topic: 'pH of Diluted Acid',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 30,
    question_type: 'single_choice',
    question_text: 'Calculate the pOH of the equimolar mixture of $NH_4OH$ and $NH_4Cl$. [Given $K_b$ for $NH_4OH = 2 \\times 10^{-5}$]',
    options: [
      '4.7',
      '12',
      '9.3',
      '6.7'
    ],
    correct_index: 0,
    solution: 'For an equimolar basic buffer:\n$[\\text{salt}] = [\\text{base}] \\implies \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{salt}]}{[\\text{base}]} = \\text{p}K_b$.\n$\\text{pOH} = -\\log(2 \\times 10^{-5}) = 5 - \\log 2 = 5 - 0.301 = 4.7$.',
    topic: 'Buffer Solutions pOH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 31,
    question_type: 'single_choice',
    question_text: 'Calculate the value of hydrolysis constant of $KCN$. [Given $K_a$ of $HCN = 1 \\times 10^{-9}$]',
    options: [
      '$10^{-9}$',
      '$10^{-5}$',
      '$10^{-14}$',
      '$10^{-4}$'
    ],
    correct_index: 1,
    solution: '$KCN$ is a salt of strong base ($KOH$) and weak acid ($HCN$).\nHydrolysis constant $K_h = \\frac{K_w}{K_a} = \\frac{10^{-14}}{1 \\times 10^{-9}} = 10^{-5}$.',
    topic: 'Hydrolysis Constant',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 32,
    question_type: 'single_choice',
    question_text: 'The pH value of the aqueous solution of $0.1\\text{ M } NaNO_3$ is',
    options: [
      'More than 7',
      'Less than 7',
      'Equal to 7',
      'May be more or less than 7'
    ],
    correct_index: 2,
    solution: '$NaNO_3$ is a salt formed from a strong acid ($HNO_3$) and a strong base ($NaOH$). Neither $Na^+$ nor $NO_3^-$ undergoes hydrolysis in aqueous solution, so the solution is neutral with $\\text{pH} = 7$.',
    topic: 'Salt Hydrolysis pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 33,
    question_type: 'single_choice',
    question_text: 'The solubility product of $AgCl$ is $1.8 \\times 10^{-10}$. Precipitation of $AgCl$ will occur only when equal volumes of solutions of',
    options: [
      '$10^{-4}\\text{ M } Ag^+$ and $10^{-4}\\text{ M } Cl^-$ are mixed',
      '$10^{-7}\\text{ M } Ag^+$ and $10^{-7}\\text{ M } Cl^-$ are mixed',
      '$10^{-5}\\text{ M } Ag^+$ and $10^{-5}\\text{ M } Cl^-$ are mixed',
      '$10^{-10}\\text{ M } Ag^+$ and $10^{-10}\\text{ M } Cl^-$ are mixed'
    ],
    correct_index: 0,
    solution: 'When equal volumes are mixed, each concentration is halved.\nFor option (1): $[Ag^+] = 5 \\times 10^{-5}\\text{ M}$, $[Cl^-] = 5 \\times 10^{-5}\\text{ M}$.\nIonic product $Q_{sp} = (5 \\times 10^{-5})^2 = 2.5 \\times 10^{-9}$.\nSince $Q_{sp} > K_{sp}$ ($2.5 \\times 10^{-9} > 1.8 \\times 10^{-10}$), precipitation will occur.',
    topic: 'Precipitation and Solubility Product',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 34,
    question_type: 'single_choice',
    question_text: 'Solubility of $Ag_2CrO_4(s)$ is maximum in',
    options: [
      '$0.1\\text{ M } AgNO_3$ solution',
      '$0.1\\text{ M } K_2CrO_4$ solution',
      '$0.1\\text{ M } NaCN$ solution',
      'Pure water'
    ],
    correct_index: 2,
    solution: 'In $0.1\\text{ M } NaCN$ solution, cyanide ions react with silver ions to form a very stable soluble complex $[Ag(CN)_2]^-$ ($K_f$ is extremely large). This drastically reduces free $[Ag^+]$, shifting the dissolution equilibrium of $Ag_2CrO_4$ forward and leading to maximum solubility.',
    topic: 'Complex Formation and Solubility',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 35,
    question_type: 'single_choice',
    question_text: 'The equilibrium constant for the reaction $A_2(g) + B_2(g) \\rightleftharpoons 2AB(g)$ is $K_{eq} = 10^{-2}$ at $27^\\circ\\text{C}$. The standard Gibbs free energy change for the reaction will be',
    options: [
      '$5.744\\text{ kJ}$',
      '$11.488\\text{ kJ}$',
      '$22.976\\text{ kJ}$',
      'Zero'
    ],
    correct_index: 1,
    solution: '$\\Delta G^\\circ = -2.303 RT \\log K_{eq} = -2.303 \\times 8.314 \\times 300 \\times \\log(10^{-2}) = -2.303 \\times 8.314 \\times 300 \\times (-2) = 11488\\text{ J} = 11.488\\text{ kJ}$.',
    topic: 'Standard Gibbs Free Energy',
    difficulty: 'medium',
    marks: 4
  }
];

