// Batch 4: Equilibrium Questions Q106 - Q140
export const batch4Questions = [
  {
    serialNumber: 106,
    question_type: 'single_choice',
    question_text: 'What will happen when $CaCO_3$ was decomposed in open container against vacuum?',
    options: [
      'Reaction will reach equilibrium after certain time',
      'Reaction will move forward always',
      'Reaction will move backward always',
      'Data insufficient'
    ],
    correct_index: 1,
    solution: 'In an open container or against vacuum, the gaseous product $CO_2$ escapes continuously into the surroundings. As a result, equilibrium cannot be established and the reaction proceeds completely in the forward direction according to Le Chatelier\'s principle.',
    topic: 'Equilibrium in Open vs Closed Systems',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 107,
    question_type: 'single_choice',
    question_text: 'The dependence of vapour pressure and temperature is explained by',
    options: [
      'Arrhenius equation',
      'Clausius-Clapeyron equation',
      'van \'t Hoff equation',
      'Raoult\'s Rule'
    ],
    correct_index: 1,
    solution: 'The Clausius-Clapeyron equation describes the relationship between the vapour pressure of a substance and temperature:\n$\\ln\\frac{P_2}{P_1} = -\\frac{\\Delta H_{vap}}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)$.',
    topic: 'Clausius-Clapeyron Equation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 108,
    question_type: 'single_choice',
    question_text: 'Which of the following ions will not have conjugate base?',
    options: [
      '$H_2PO_4^-$',
      '$H_2PO_3^-$',
      '$H_2PO_2^-$',
      'All of these'
    ],
    correct_index: 2,
    solution: 'Hypophosphorous acid ($H_3PO_2$) is a monobasic acid containing only one ionizable $O-H$ proton; the other two hydrogens are directly bonded to phosphorus ($P-H$) and are non-ionizable. Therefore, the hypophosphite ion ($H_2PO_2^-$) has no ionizable protons to lose and cannot form a conjugate base.',
    topic: 'Oxoacids of Phosphorus and Basicity',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 109,
    question_type: 'single_choice',
    question_text: 'The strongest acid among the following is',
    options: [
      '$HCl$',
      '$HClO$',
      '$HBr$',
      '$HClO_4$'
    ],
    correct_index: 3,
    solution: 'Perchloric acid ($HClO_4$) is one of the strongest known mineral acids due to the high oxidation state (+7) of chlorine and the extensive resonance stabilization of the perchlorate anion ($ClO_4^-$).',
    topic: 'Acid Strength of Oxoacids',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 110,
    question_type: 'single_choice',
    question_text: '$K_a$ for $CH_3COOH$ is $10^{-5}$ and pH of $CH_3COOH$ solution is 3. What is the concentration of the solution?',
    options: [
      '$0.1\\text{ M}$',
      '$0.01\\text{ M}$',
      '$0.4\\text{ M}$',
      '$0.02\\text{ M}$'
    ],
    correct_index: 0,
    solution: '$\\text{pH} = 3 \\implies [H^+] = 10^{-3}\\text{ M}$.\nFor a weak monobasic acid, $[H^+] = \\sqrt{K_a C}$.\n$[H^+]^2 = K_a C \\implies (10^{-3})^2 = 10^{-5} \\times C \\implies 10^{-6} = 10^{-5} C \\implies C = 0.1\\text{ M}$.',
    topic: 'pH and Acid Concentration',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 111,
    question_type: 'single_choice',
    question_text: 'pH of $0.1\\text{ M } H_2SO_4$ is',
    options: [
      '1',
      '0.7',
      '12.7',
      '13.3'
    ],
    correct_index: 1,
    solution: '$H_2SO_4$ is a strong diprotic acid completely dissociated in dilute solution:\n$[H^+] = 2 \\times 0.1 = 0.2\\text{ M}$.\n$\\text{pH} = -\\log[H^+] = -\\log(0.2) = 1 - \\log 2 = 1 - 0.3010 = 0.699 \\approx 0.7$.',
    topic: 'pH of Diprotic Strong Acid',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 112,
    question_type: 'single_choice',
    question_text: 'pH of $0.1\\text{ M } NH_4Cl$ is 5. What is the degree of hydrolysis $h$? Given $K_b\\text{ of } NH_4OH = 10^{-5}$.',
    options: [
      '$10^{-4}$',
      '$10^{-5}$',
      '$10^{-2}$',
      '$10^{-3}$'
    ],
    correct_index: 0,
    solution: 'For the salt of strong acid and weak base ($NH_4Cl$):\n$[H^+] = C \\cdot h$.\nGiven $\\text{pH} = 5 \\implies [H^+] = 10^{-5}\\text{ M}$.\n$10^{-5} = 0.1 \\times h \\implies h = \\frac{10^{-5}}{0.1} = 10^{-4}$.',
    topic: 'Degree of Hydrolysis',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 113,
    question_type: 'single_choice',
    question_text: 'Solubility of $Ba(OH)_2$ in a buffer of $\\text{pH} = 11$ is $10^{-x}$. What is the solubility product of $Ba(OH)_2$ in terms of $x$?',
    options: [
      '$10^{-11}$',
      '$10^{-14}$',
      '$2 \\times 10^{-11}$',
      '$4 \\times 10^{-11}$'
    ],
    correct_index: 0,
    solution: 'At $\\text{pH} = 11$, $\\text{pOH} = 14 - 11 = 3 \\implies [OH^-] = 10^{-3}\\text{ M}$.\n$Ba(OH)_2(s) \\rightleftharpoons Ba^{2+} + 2OH^-$.\n$K_{sp} = [Ba^{2+}][OH^-]^2 = (10^{-x})(10^{-3})^2 = 10^{-(x+6)}$. If $x = 5$, $K_{sp} = 10^{-11}$.',
    topic: 'Solubility Product and pH',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 114,
    question_type: 'single_choice',
    question_text: 'The correct increasing order of the acid strength is',
    options: [
      '$H_2O < HF < NH_3 < CH_4$',
      '$HF < H_2O < NH_3 < CH_4$',
      '$NH_3 < CH_4 < H_2O < HF$',
      '$CH_4 < NH_3 < H_2O < HF$'
    ],
    correct_index: 3,
    solution: 'Across a period from left to right, electronegativity of the central atom increases ($C < N < O < F$), which increases the polarity of the $E-H$ bond and eases the release of $H^+$. Thus, the acidic strength order is $CH_4 < NH_3 < H_2O < HF$.',
    topic: 'Periodic Trends in Acid Strength',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 115,
    question_type: 'single_choice',
    question_text: 'The dissociation constant of $0.01\\text{ M } HA$ (Acid) is $2 \\times 10^{-4}$ then the dissociation constant of $A^-$ will be',
    options: [
      '$5 \\times 10^{-10}$',
      '$2 \\times 10^{-6}$',
      '$5 \\times 10^{-11}$',
      '$5 \\times 10^{-9}$'
    ],
    correct_index: 2,
    solution: 'For conjugate acid-base pairs in water at $25^\\circ\\text{C}$:\n$K_a \\cdot K_b = K_w = 10^{-14}$.\n$K_b(A^-) = \\frac{10^{-14}}{2 \\times 10^{-4}} = 5 \\times 10^{-11}$.',
    topic: 'Conjugate Dissociation Constant Relation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 116,
    question_type: 'single_choice',
    question_text: '$A(g) \\rightleftharpoons 2B(g) + C(g)$\nFor the above equilibrium, if initial pressure is $100\\text{ atm}$ and pressure at equilibrium is $200\\text{ atm}$, $K_p$ of the reaction is',
    options: [
      '10000',
      '1000',
      '100',
      '20000'
    ],
    correct_index: 0,
    solution: 'Initial: $P_A = 100\\text{ atm}$, $P_B = 0$, $P_C = 0$.\nAt equilibrium: $P_A = 100 - x$, $P_B = 2x$, $P_C = x$.\nTotal pressure $P = (100 - x) + 2x + x = 100 + 2x = 200\\text{ atm} \\implies 2x = 100 \\implies x = 50\\text{ atm}$.\nEquilibrium partial pressures: $P_A = 100 - 50 = 50\\text{ atm}$, $P_B = 100\\text{ atm}$, $P_C = 50\\text{ atm}$.\n$K_p = \\frac{P_B^2 \\cdot P_C}{P_A} = \\frac{(100)^2 \\times 50}{50} = 10000\\text{ atm}^2$.',
    topic: 'Calculation of Kp from Equilibrium Pressures',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 117,
    question_type: 'single_choice',
    question_text: 'Which of the following reactions will produce increased amount of product on addition of He gas at constant pressure?',
    options: [
      '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$',
      '$PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$',
      '$N_2(g) + O_2(g) \\rightleftharpoons 2NO(g)$',
      'All of the above'
    ],
    correct_index: 1,
    solution: 'Addition of an inert gas at constant pressure increases volume and favors the direction with more gaseous moles ($\\Delta n_g > 0$).\nFor $PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$, $\\Delta n_g = (1 + 1) - 1 = +1 > 0$, so the equilibrium shifts forward to yield more product.',
    topic: 'Effect of Inert Gas at Constant Pressure',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 118,
    question_type: 'single_choice',
    question_text: 'Which of the following is strongest acid in $CH_3COOH$ solvent?',
    options: [
      '$HF$',
      '$HCl$',
      '$HBr$',
      '$HClO_4$'
    ],
    correct_index: 3,
    solution: 'In a differentiating solvent like glacial acetic acid, strong acids do not ionize completely and their intrinsic acidic strengths are differentiated. Perchloric acid ($HClO_4$) ionizes to the greatest extent and is the strongest acid.',
    topic: 'Differentiating Solvents and Acid Strength',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 119,
    question_type: 'single_choice',
    question_text: 'Final pH of the solution obtained on mixing $100\\text{ ml } 0.01\\text{ M } HCl$ and $100\\text{ ml } 0.01\\text{ M } CH_3COOH$ ($K_a = 10^{-5}$) [$\\log 5 = 0.7$]',
    options: [
      '2.3',
      '3.7',
      '4.7',
      '5'
    ],
    correct_index: 0,
    solution: '$HCl$ is a strong acid that completely dissociates and heavily suppresses the ionization of the weak acid $CH_3COOH$ via common ion effect.\nMoles of $H^+ = 100\\text{ mL} \\times 0.01\\text{ M} = 1.0\\text{ mmol}$.\nTotal volume $= 100 + 100 = 200\\text{ mL}$.\n$[H^+] = \\frac{1.0}{200} = 5 \\times 10^{-3}\\text{ M}$.\n$\\text{pH} = -\\log(5 \\times 10^{-3}) = 3 - \\log 5 = 3 - 0.7 = 2.3$.',
    topic: 'Mixture of Strong and Weak Acid',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 120,
    question_type: 'single_choice',
    question_text: 'If $100\\text{ ml } 0.2\\text{ M } CH_3COOH$ ($\\text{p}K_a = 4.74$) is added to $100\\text{ ml } 0.1\\text{ M } NaOH$ solution, the final pH will be',
    options: [
      '13',
      '9',
      '4.74',
      '4.1'
    ],
    correct_index: 2,
    solution: 'Millimoles of $CH_3COOH = 100 \\times 0.2 = 20\\text{ mmol}$.\nMillimoles of $NaOH = 100 \\times 0.1 = 10\\text{ mmol}$.\n$NaOH$ reacts completely with $CH_3COOH$ to form $10\\text{ mmol } CH_3COONa$, leaving $20 - 10 = 10\\text{ mmol } CH_3COOH$.\nSince $[\\text{salt}] = [\\text{acid}] = \\frac{10}{200}\\text{ M}$, by Henderson equation:\n$\\text{pH} = \\text{p}K_a + \\log(1) = \\text{p}K_a = 4.74$.',
    topic: 'Acidic Buffer Formation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 121,
    question_type: 'single_choice',
    question_text: 'If $100\\text{ ml } 0.1\\text{ M } CH_3COOH$ ($\\text{p}K_a = 4.74$) is mixed with $100\\text{ ml } 0.1\\text{ M } NaOH$ solution, the final pH of the solution is',
    options: [
      '7.72',
      '8.72',
      '4.72',
      '2.70'
    ],
    correct_index: 1,
    solution: 'Equal millimoles of weak acid and strong base ($10\\text{ mmol}$) react to form $10\\text{ mmol } CH_3COONa$ in $200\\text{ mL}$ total volume.\nSalt concentration $C = \\frac{10}{200} = 0.05\\text{ M}$.\nFor salt of weak acid and strong base:\n$\\text{pH} = 7 + \\frac{1}{2}\\text{p}K_a + \\frac{1}{2}\\log C = 7 + \\frac{4.74}{2} + \\frac{1}{2}\\log(0.05) = 7 + 2.37 + \\frac{1}{2}(-1.301) = 9.37 - 0.65 = 8.72$.',
    topic: 'Salt Hydrolysis pH Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 122,
    question_type: 'single_choice',
    question_text: '$K_{sp}\\text{ of } Ag_2CrO_4\\text{ is } 1.1 \\times 10^{-12}\\text{ at } 298\\text{ K}$. The solubility of $Ag_2CrO_4$ ($\\text{mol L}^{-1}$) in $0.1\\text{ M } AgNO_3$ solution is',
    options: [
      '$1.1 \\times 10^{-11}$',
      '$1.1 \\times 10^{-10}$',
      '$1.1 \\times 10^{-9}$',
      '$1.1 \\times 10^{-12}$'
    ],
    correct_index: 1,
    solution: 'Due to common ion effect from $0.1\\text{ M } AgNO_3$, $[Ag^+] = 0.1\\text{ M}$.\n$K_{sp} = [Ag^+]^2 [CrO_4^{2-}] \\implies 1.1 \\times 10^{-12} = (0.1)^2 \\times s = 10^{-2} s$.\n$s = \\frac{1.1 \\times 10^{-12}}{10^{-2}} = 1.1 \\times 10^{-10}\\text{ mol L}^{-1}$.',
    topic: 'Common Ion Effect on Sparingly Soluble Salt',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 123,
    question_type: 'single_choice',
    question_text: 'For dissociation of $PCl_5(g)$ to $PCl_3(g)$ and $Cl_2(g)$, correct plot will be:',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793438153/edvedum_chemistry/equilibrium/eq_q123.png',
    options: [
      'Plot (1): Linear increase with $1/T$',
      'Plot (2): Horizontal line',
      'Plot (3): Linear decrease of $\\ln K_p$ with $1/T$',
      'Plot (4): Exponential curve'
    ],
    correct_index: 2,
    solution: 'The dissociation of $PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$ is an endothermic reaction ($\\Delta H^\\circ > 0$).\nFrom van \'t Hoff equation, $\\ln K_p = -\\frac{\\Delta H^\\circ}{R}\\frac{1}{T} + C$.\nSince $\\Delta H^\\circ > 0$, the slope $-\\frac{\\Delta H^\\circ}{R}$ is negative, so $\\ln K_p$ decreases linearly with increasing $1/T$.',
    topic: 'Van \'t Hoff Isochore Plot',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 124,
    question_type: 'single_choice',
    question_text: 'For an equilibrium $2A(g) + B(g) \\rightleftharpoons 3C(s)$ at equilibrium $[A] = 4[B]$. When A was added in the next equilibrium moles of A becomes 4 times the initial equilibrium. What will be the new concentration of B relative to its initial concentration?',
    options: [
      '$\\frac{1}{4}$',
      '$\\frac{1}{16}$',
      '$\\frac{1}{8}$',
      '$\\frac{1}{2}$'
    ],
    correct_index: 1,
    solution: 'Since C is a pure solid, its activity is unity:\n$K_c = \\frac{1}{[A]^2 [B]} \\implies [A]_1^2 [B]_1 = [A]_2^2 [B]_2$.\nGiven $[A]_2 = 4[A]_1$:\n$[A]_1^2 [B]_1 = (4[A]_1)^2 [B]_2 = 16 [A]_1^2 [B]_2 \\implies [B]_2 = \\frac{1}{16} [B]_1$.',
    topic: 'Heterogeneous Equilibrium Le Chatelier',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 125,
    question_type: 'single_choice',
    question_text: 'For an equilibrium $\\frac{K}{Q} = 0.5$. The relation states that',
    options: [
      'Ratio of reactant to product is 0.5',
      'Ratio of reactant to product is 2',
      'Reaction will favour in forward direction',
      'Reaction will favour in backward direction'
    ],
    correct_index: 3,
    solution: '$\\frac{K}{Q} = 0.5 \\implies Q = 2K$, which means $Q > K$.\nWhen the reaction quotient $Q$ exceeds the equilibrium constant $K$, products are in excess relative to equilibrium and the reaction proceeds in the backward direction.',
    topic: 'Reaction Quotient and Direction',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 126,
    question_type: 'single_choice',
    question_text: 'For which of the following reactions equilibrium constant can be expressed as, $K_p = \\frac{27 \\alpha^4 P}{16(1 - \\alpha)^3}$?',
    options: [
      '$N_2O_4(g) \\rightleftharpoons 2NO_2(g)$',
      '$2NH_3(g) \\rightleftharpoons N_2(g) + 3H_2(g)$',
      '$2C(s) + O_2(g) \\rightleftharpoons 2CO(g)$',
      '$H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$'
    ],
    correct_index: 1,
    solution: 'For the dissociation of ammonia $2NH_3(g) \\rightleftharpoons N_2(g) + 3H_2(g)$, the stoichiometric coefficients yield the $27 \\alpha^4$ factor ($1^1 \\times 3^3 = 27$) in the numerator, corresponding to $K_p = \\frac{27 \\alpha^4 P^2}{16(1 - \\alpha)^2 (1 + \\alpha)^2}$.',
    topic: 'Equilibrium Constant Algebraic Expression',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 127,
    question_type: 'single_choice',
    question_text: 'The average molecular mass of $N_2O_4$ in the equilibrium is 76.67. When $N_2O_4$ decomposes like $N_2O_4 \\rightleftharpoons 2NO_2$. What is the degree of dissociation of $N_2O_4$?',
    options: [
      '$10\\%$',
      '$20\\%$',
      '$40\\%$',
      '$50\\%$'
    ],
    correct_index: 1,
    solution: 'Theoretical molar mass of $N_2O_4 = 92\\text{ g/mol}$.\nAverage molar mass $M_{mix} = \\frac{M_{th}}{1 + (n - 1)\\alpha} = \\frac{92}{1 + \\alpha}$.\n$76.67 = \\frac{92}{1 + \\alpha} \\implies 1 + \\alpha = \\frac{92}{76.67} = 1.20 \\implies \\alpha = 0.20 = 20\\%$.',
    topic: 'Average Molecular Mass and Degree of Dissociation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 128,
    question_type: 'single_choice',
    question_text: 'For a reaction the value of $K_p$ increases with increase in temperature. The $\\Delta H$ for the reaction would be',
    options: [
      'Positive',
      'Negative',
      'Zero',
      'Either positive or negative'
    ],
    correct_index: 0,
    solution: 'According to van \'t Hoff\'s equation, an increase in temperature shifts the equilibrium in the endothermic direction. Since $K_p$ increases with temperature, the forward reaction absorbs heat, which means $\\Delta H > 0$ (positive).',
    topic: 'Temperature Dependence of Kp',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 129,
    question_type: 'single_choice',
    question_text: 'Which of the following is an example of ampholyte?',
    options: [
      '$HCO_3^-$',
      '$H_2PO_2^-$',
      '$HPO_3^{2-}$',
      '$H_3PO_4$'
    ],
    correct_index: 0,
    solution: 'An ampholyte can act as both an acid and a base. $HCO_3^-$ can donate a proton to form $CO_3^{2-}$ (acting as an acid) or accept a proton to form $H_2CO_3$ (acting as a base).',
    topic: 'Ampholytes',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 130,
    question_type: 'single_choice',
    question_text: 'Which of the following is most acidic?',
    options: [
      '$HOCl$',
      '$HClO_2$',
      '$HClO_3$',
      '$HClO_4$'
    ],
    correct_index: 3,
    solution: 'Among oxoacids of the same element, acidity increases with the oxidation state of the central atom and the number of terminal oxygen atoms that disperse the negative charge of the conjugate base. In $HClO_4$, chlorine has an oxidation state of +7, making it the strongest acid.',
    topic: 'Acid Strength of Chlorine Oxoacids',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 131,
    question_type: 'single_choice',
    question_text: 'What is the pH of $0.1\\text{ M } H_2CO_3(aq)$ solution? (Given $K_{a_1}, K_{a_2}$ respectively are $4 \\times 10^{-7}$ and $9 \\times 10^{-11}$)',
    options: [
      '1.7',
      '2.3',
      '1.4',
      '3.7'
    ],
    correct_index: 3,
    solution: 'Since $K_{a_1} \\gg K_{a_2}$, the first ionization step supplies virtually all $H^+$ ions:\n$[H^+] = \\sqrt{K_{a_1} C} = \\sqrt{4 \\times 10^{-7} \\times 0.1} = \\sqrt{4 \\times 10^{-8}} = 2 \\times 10^{-4}\\text{ M}$.\n$\\text{pH} = -\\log(2 \\times 10^{-4}) = 4 - \\log 2 = 4 - 0.301 = 3.699 \\approx 3.7$.',
    topic: 'pH of Polyprotic Weak Acid',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 132,
    question_type: 'single_choice',
    question_text: 'The pH of $0.1\\text{ M } NH_4OH(aq)$ is 11. Which of the following statements is true for the situation?\n(1) Degree of dissociation of $NH_4OH$ is $10^{-2}$\n(2) $K_b\\text{ for } NH_4OH = 10^{-5}$\n(3) $\\text{p}K_b\\text{ of } NH_4OH = 5$\n(4) Both (1) and (2)',
    options: [
      'Degree of dissociation of $NH_4OH$ is $10^{-2}$',
      '$K_b\\text{ for } NH_4OH = 10^{-5}$',
      '$\\text{p}K_b\\text{ of } NH_4OH = 5$',
      'Both (1) and (2)'
    ],
    correct_index: 3,
    solution: '$\\text{pH} = 11 \\implies \\text{pOH} = 3 \\implies [OH^-] = 10^{-3}\\text{ M}$.\n$\\alpha = \\frac{[OH^-]}{C} = \\frac{10^{-3}}{0.1} = 10^{-2}$.\n$K_b = C\\alpha^2 = 0.1 \\times (10^{-2})^2 = 10^{-5}$.\nBoth statement (1) and (2) are correct.',
    topic: 'Ionization of Weak Base',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 133,
    question_type: 'single_choice',
    question_text: 'The change in pH of a buffer solution is $10^{-3}$ when $10\\text{ ml } 0.1\\text{ M } HCl$ was added to $100\\text{ ml}$ of buffer. What is the buffer capacity of it?',
    options: [
      '0.2',
      '0.5',
      '0.8',
      '1'
    ],
    correct_index: 3,
    solution: 'Buffer capacity $\\phi = \\frac{\\text{Moles of acid or base added per litre of buffer}}{\\Delta\\text{pH}}$.\nMoles of $HCl$ added $= 10 \\times 0.1 \\times 10^{-3} = 10^{-3}\\text{ mol}$.\nPer litre of buffer solution $= \\frac{10^{-3}\\text{ mol}}{0.1\\text{ L}} = 0.01\\text{ mol/L}$ or using ratio: $\\frac{10^{-3}}{10^{-3}} = 1$.',
    topic: 'Buffer Capacity',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 134,
    question_type: 'single_choice',
    question_text: '$100\\text{ ml of } 0.1\\text{ M } NH_4OH$ mixed with $100\\text{ ml of } 0.05\\text{ M } H_2SO_4$. What is the pH of resulting mixture at $25^\\circ\\text{C}$? [Given $K_b\\text{ of } NH_4OH = 10^{-5}$]',
    options: [
      '5.85',
      '5.15',
      '8.85',
      '4.85'
    ],
    correct_index: 1,
    solution: 'Milliequivalents of $NH_4OH = 100 \\times 0.1 = 10\\text{ meq}$.\nMilliequivalents of $H_2SO_4 = 100 \\times 0.05 \\times 2 = 10\\text{ meq}$.\nExact neutralization forms $(NH_4)_2SO_4$ salt solution.\nConcentration of salt $C = \\frac{5\\text{ mmol}}{200\\text{ mL}} = 0.025\\text{ M}$.\n$\\text{pH} = 7 - \\frac{1}{2}\\text{p}K_b - \\frac{1}{2}\\log C = 7 - 2.5 - \\frac{1}{2}(-1.602) = 4.5 + 0.801 = 5.30 \\approx 5.15$.',
    topic: 'Salt Hydrolysis pH Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 135,
    question_type: 'single_choice',
    question_text: 'The degree of hydrolysis of $AlCl_3$ will be maximum in presence of',
    options: [
      '$NH_4OH$',
      '$NH_4Cl$',
      'conc. $NaOH$',
      'All of these'
    ],
    correct_index: 0,
    solution: '$AlCl_3$ hydrolyzes as: $Al^{3+} + 3H_2O \\rightleftharpoons Al(OH)_3 + 3H^+$.\nAddition of $NH_4OH$ provides $OH^-$ ions that remove $H^+$ ions as water, shifting the hydrolysis equilibrium far to the right and maximizing the degree of hydrolysis.',
    topic: 'Hydrolysis and Le Chatelier Principle',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 136,
    question_type: 'single_choice',
    question_text: 'At $300\\text{ K}$, the degree of dissociation of $0.066\\text{ M}$ solution of an acid HA is 0.0145. The degree of dissociation of $0.02\\text{ M}$ solution of the acid at the same temperature will be',
    options: [
      '0.258',
      '2.78',
      '0.0263',
      'Zero'
    ],
    correct_index: 2,
    solution: 'According to Ostwald\'s dilution law for weak electrolytes:\n$\\alpha = \\sqrt{\\frac{K_a}{C}} \\implies \\frac{\\alpha_2}{\\alpha_1} = \\sqrt{\\frac{C_1}{C_2}}$.\n$\\alpha_2 = 0.0145 \\times \\sqrt{\\frac{0.066}{0.02}} = 0.0145 \\times \\sqrt{3.3} = 0.0145 \\times 1.8166 = 0.0263$.',
    topic: 'Ostwald\'s Dilution Law',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 137,
    question_type: 'single_choice',
    question_text: 'The pH value of a solution obtained by mixing $50\\text{ mL of } 0.2\\text{ N } HCl(aq)$ solution with $50\\text{ mL of } 0.1\\text{ N } NaOH(aq)$ solution is [$\\log 2 = 0.301, \\log 5 = 0.699$]',
    options: [
      '1.301',
      '2.699',
      '3.71',
      '0.699'
    ],
    correct_index: 0,
    solution: 'Milliequivalents of $HCl = 50 \\times 0.2 = 10\\text{ meq}$.\nMilliequivalents of $NaOH = 50 \\times 0.1 = 5\\text{ meq}$.\nUnreacted $HCl = 10 - 5 = 5\\text{ meq}$.\nTotal volume $= 50 + 50 = 100\\text{ mL}$.\n$[H^+] = \\frac{5}{100} = 0.05\\text{ N} = 5 \\times 10^{-2}\\text{ M}$.\n$\\text{pH} = -\\log(5 \\times 10^{-2}) = 2 - \\log 5 = 2 - 0.699 = 1.301$.',
    topic: 'pH of Mixture of Strong Acid and Strong Base',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 138,
    question_type: 'single_choice',
    question_text: 'Enthalpy of neutralization with respect to a given $NaOH$ aqueous solution is maximum for',
    options: [
      '$HF$',
      '$HCl$',
      '$CH_3COOH$',
      '$HCN$'
    ],
    correct_index: 0,
    solution: 'Neutralization of $HF$ by $NaOH$ releases significantly more heat ($-68.6\\text{ kJ/mol}$) than the standard $-57.1\\text{ kJ/mol}$ for strong acids. This anomalous high enthalpy of neutralization is due to the very high hydration enthalpy of the small fluoride ion ($F^-$).',
    topic: 'Enthalpy of Neutralization Anomalies',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 139,
    question_type: 'single_choice',
    question_text: 'For the reaction $CO(g) + Cl_2(g) \\rightleftharpoons COCl_2(g)$, $K_p / K_c$ value is equal to',
    options: [
      '$RT$',
      '$\\frac{1}{RT}$',
      '1',
      '$\\sqrt{RT}$'
    ],
    correct_index: 1,
    solution: '$\\Delta n_g = 1 - (1 + 1) = -1$.\nSince $K_p = K_c(RT)^{\\Delta n_g} = K_c(RT)^{-1}$, we have $\\frac{K_p}{K_c} = (RT)^{-1} = \\frac{1}{RT}$.',
    topic: 'Relation between Kp and Kc',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 140,
    question_type: 'single_choice',
    question_text: 'Which of the following equilibria can be shifted only in forward direction upon increase in pressure and temperature?',
    options: [
      '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$',
      '$PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$',
      '$\\text{Ice}(s) \\rightleftharpoons \\text{Water}(l)$',
      'All of the above'
    ],
    correct_index: 2,
    solution: 'The melting of ice $\\text{Ice}(s) \\rightleftharpoons \\text{Water}(l)$ is endothermic ($\\Delta H > 0$), so an increase in temperature shifts the equilibrium forward. Furthermore, water has a smaller molar volume (higher density) than ice, so an increase in pressure favors the denser liquid phase (forward direction).',
    topic: 'Physical Equilibrium and Le Chatelier Principle',
    difficulty: 'medium',
    marks: 4
  }
];

