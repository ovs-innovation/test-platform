// Batch 3: Equilibrium Questions Q71 - Q105
export const batch3Questions = [
  {
    serialNumber: 71,
    question_type: 'single_choice',
    question_text: 'The solubility of $AgCl$ at $20^\\circ\\text{C}$ is $1.435 \\times 10^{-3}\\text{ g/L}$. The solubility product is',
    options: [
      '$1.0 \\times 10^{-10}$',
      '$2 \\times 10^{-10}$',
      '$1.035 \\times 10^{-5}$',
      '$1.08 \\times 10^{-8}$'
    ],
    correct_index: 0,
    solution: 'Molar mass of $AgCl = 108 + 35.5 = 143.5\\text{ g/mol}$.\nMolar solubility $s = \\frac{1.435 \\times 10^{-3}\\text{ g/L}}{143.5\\text{ g/mol}} = 10^{-5}\\text{ mol/L}$.\nFor $AgCl \\rightleftharpoons Ag^+ + Cl^-$, $K_{sp} = s^2 = (10^{-5})^2 = 1.0 \\times 10^{-10}$.',
    topic: 'Solubility Product from Gram Solubility',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 72,
    question_type: 'single_choice',
    question_text: 'pH of salt of a weak acid and strong base will be',
    options: [
      '$\\text{pH} = 7 - \\frac{1}{2}(\\text{p}K_a + \\text{p}K_b)$',
      '$\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a + \\log C)$',
      '$\\text{pH} = 7 - \\frac{1}{2}(\\text{p}K_a - \\log C)$',
      '$\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b)$'
    ],
    correct_index: 1,
    solution: 'Hydrolysis of anion from weak acid makes the solution basic:\n$\\text{pH} = \\frac{1}{2}[\\text{p}K_w + \\text{p}K_a + \\log C] = 7 + \\frac{1}{2}(\\text{p}K_a + \\log C)$.',
    topic: 'Salt Hydrolysis Formula',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 73,
    question_type: 'single_choice',
    question_text: 'Which of the following is a Lewis acid?',
    options: [
      '$H_2O$',
      '$SnCl_4$',
      '$C_2H_5OH$',
      '$Cl^-$'
    ],
    correct_index: 1,
    solution: '$SnCl_4$ contains a central tin atom that has vacant $d$-orbitals, allowing it to expand its coordination number by accepting electron pairs (e.g. forming $[SnCl_6]^{2-}$). Thus, it acts as a Lewis acid.',
    topic: 'Lewis Acids',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 74,
    question_type: 'single_choice',
    question_text: 'pH of solution formed by mixing $40\\text{ ml of } 0.1\\text{ M } HCl$ with $10\\text{ ml of } 0.45\\text{ M of } NaOH$ is (given at $25^\\circ\\text{C}$)',
    options: [
      '12',
      '2',
      '8',
      '10'
    ],
    correct_index: 0,
    solution: 'Millimoles of $H^+ = 40 \\times 0.1 = 4.0\\text{ mmol}$.\nMillimoles of $OH^- = 10 \\times 0.45 = 4.5\\text{ mmol}$.\nExcess $OH^- = 4.5 - 4.0 = 0.5\\text{ mmol}$.\nTotal volume $= 40 + 10 = 50\\text{ mL}$.\n$[OH^-] = \\frac{0.5}{50} = 0.01\\text{ M} = 10^{-2}\\text{ M}$.\n$\\text{pOH} = 2 \\implies \\text{pH} = 14 - 2 = 12$.',
    topic: 'pH of Acid-Base Mixture',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 75,
    question_type: 'single_choice',
    question_text: 'For formation of $NH_3(g)$ from $N_2(g)$ and $H_2(g)$ as $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) + 92\\text{ kJ/mol}$. Correct plot is:',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793438155/edvedum_chemistry/equilibrium/eq_q75.png',
    options: [
      'Plot (1): Linear increase of $\\ln K$ with $1/T$',
      'Plot (2): Linear decrease of $\\ln K$ with $1/T$',
      'Plot (3): Horizontal constant line',
      'Plot (4): Non-linear curve'
    ],
    correct_index: 0,
    solution: 'The reaction is exothermic ($\\Delta H^\\circ = -92\\text{ kJ/mol} < 0$).\nAccording to van \'t Hoff isochore: $\\ln K = -\\frac{\\Delta H^\\circ}{R}\\frac{1}{T} + C$.\nSince $\\Delta H^\\circ$ is negative, the slope $-\\frac{\\Delta H^\\circ}{R}$ is positive, so $\\ln K$ increases linearly with $1/T$.',
    topic: 'Van \'t Hoff Plot',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 76,
    question_type: 'single_choice',
    question_text: 'The $K_p$ value for the equilibrium $2A_{(g)} + B_{(g)} \\rightleftharpoons 2AB_{(g)}$ is $4 \\times 10^4\\text{ atm}^{-1}$ at $27^\\circ\\text{C}$. The $K_p$ value for the equilibrium $AB_{(g)} \\rightleftharpoons A_{(g)} + \\frac{1}{2}B_{(g)}$ at $27^\\circ\\text{C}$ is',
    options: [
      '$1 \\times 10^{-4}$',
      '$2.5 \\times 10^{-3}$',
      '$5 \\times 10^{-3}$',
      '$5 \\times 10^{-4}$'
    ],
    correct_index: 2,
    solution: 'The target reaction is obtained by reversing the given reaction and multiplying by $1/2$:\n$K_p\' = \\left(\\frac{1}{K_p}\\right)^{1/2} = \\frac{1}{\\sqrt{4 \\times 10^4}} = \\frac{1}{200} = 0.005 = 5 \\times 10^{-3}$.',
    topic: 'Manipulation of Kp',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 77,
    question_type: 'single_choice',
    question_text: '$SO_{3(g)}$ is heated in a closed vessel. An equilibrium: $2SO_{3(g)} \\rightleftharpoons 2SO_{2(g)} + O_{2(g)}$ is established. The vapour density of the mixture, in which $SO_3$ is $50\\%$ dissociated is',
    options: [
      '32',
      '35',
      '42',
      '55'
    ],
    correct_index: 0,
    solution: 'Theoretical vapour density of $SO_3$, $D = \\frac{80}{2} = 40$.\nNumber of product moles per mole of reactant $n = \\frac{2 + 1}{2} = 1.5$.\n$\\alpha = 50\\% = 0.5$.\n$\\alpha = \\frac{D - d}{(n - 1)d} \\implies 0.5 = \\frac{40 - d}{0.5 d} \\implies 0.25 d = 40 - d \\implies 1.25 d = 40 \\implies d = \\frac{40}{1.25} = 32$.',
    topic: 'Vapour Density and Degree of Dissociation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 78,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is/are correct regarding standard Gibbs free energy change and thermodynamic equilibrium constant K:\n(1) When $\\Delta G^\\circ = -\\text{ve}$, $K > 1$\n(2) When $\\Delta G^\\circ = +\\text{ve}$, $K < 1$\n(3) When $\\Delta G^\\circ = 0$, $K = 1$\n(4) All are correct statements',
    options: [
      'When $\\Delta G^\\circ = -\\text{ve}$, $K > 1$',
      'When $\\Delta G^\\circ = +\\text{ve}$, $K < 1$',
      'When $\\Delta G^\\circ = 0$, $K = 1$',
      'All are correct statements'
    ],
    correct_index: 3,
    solution: 'Since $\\Delta G^\\circ = -RT \\ln K$:\n- If $\\Delta G^\\circ < 0$, $\\ln K > 0 \\implies K > 1$.\n- If $\\Delta G^\\circ > 0$, $\\ln K < 0 \\implies K < 1$.\n- If $\\Delta G^\\circ = 0$, $\\ln K = 0 \\implies K = 1$.\nTherefore, all statements are correct.',
    topic: 'Thermodynamics of Equilibrium',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 79,
    question_type: 'single_choice',
    question_text: 'For the reaction at $300\\text{ K}$:\n$A(g) \\rightleftharpoons Y(g) + Z(g)$\n$\\Delta H^\\circ = -29.8\\text{ kcal/mol}$; $\\Delta S^\\circ = -0.1\\text{ kcal K}^{-1}\\text{mol}^{-1}$.\nThe value of equilibrium constant is:',
    options: [
      '0',
      '1',
      '10',
      '$10^2$'
    ],
    correct_index: 1,
    solution: '$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ = -29.8 - 300(-0.1) = -29.8 + 30 = +0.2\\text{ kcal/mol} = 200\\text{ cal/mol}$.\n$\\Delta G^\\circ = -2.303 RT \\log K \\implies 200 = -2.303 \\times 2 \\times 300 \\log K = -1381.8 \\log K$.\n$\\log K = -\\frac{200}{1381.8} \\approx -0.145 \\implies K = 10^{-0.145} \\approx 0.72 \\approx 1$.',
    topic: 'Calculation of Equilibrium Constant from Delta G',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 80,
    question_type: 'single_choice',
    question_text: 'Solid ammonium carbamate dissociates as follows: $NH_2COONH_4(s) \\rightleftharpoons 2NH_3(g) + CO_2(g)$. Which of the following graphs correctly represents the equilibrium? Line (1) is for $NH_2COONH_4(s)$, (2) for $NH_3(g)$, (3) for $CO_2(g)$',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793438156/edvedum_chemistry/equilibrium/eq_q80.png',
    options: [
      'Graph (1)',
      'Graph (2)',
      'Graph (3)',
      'Graph (4)'
    ],
    correct_index: 0,
    solution: 'Since $NH_2COONH_4$ is a pure solid, its active mass/density remains constant throughout (line 1 is a horizontal line). At equilibrium, stoichiometry requires $[NH_3] = 2[CO_2]$, so the concentration plateau of $NH_3$ (line 2) is twice as high as that of $CO_2$ (line 3). This is shown in Graph (1).',
    topic: 'Equilibrium Graphs for Heterogeneous Systems',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 81,
    question_type: 'single_choice',
    question_text: 'Morphine ($C_{17}H_{19}NO_3$) which is used medically to relieve pain is a base. Its conjugate acid is',
    options: [
      '$C_{17}H_{19}NO_3^+$',
      '$C_{17}H_{18}NO_3^+$',
      '$C_{17}H_{20}NO_3^+$',
      '$C_{17}H_{20}NO_3$'
    ],
    correct_index: 2,
    solution: 'According to Bronsted-Lowry theory, the conjugate acid of a base is formed by accepting a proton ($H^+$):\n$C_{17}H_{19}NO_3 + H^+ \\rightarrow C_{17}H_{20}NO_3^+$.',
    topic: 'Conjugate Acid-Base Pairs',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 82,
    question_type: 'single_choice',
    question_text: 'Which of the following is/are correct?\n(1) Strength of acid and base depends on role of solvent\n(2) Acids like $HCl, H_2SO_4$ have equal acid strength in water\n(3) Acetic acid in ammonia is a strong acid\n(4) All are correct statements',
    options: [
      'Strength of acid and base depends on role of solvent',
      'Acids like $HCl, H_2SO_4$ have equal acid strength in water',
      'Acetic acid in ammonia is a strong acid',
      'All are correct statements'
    ],
    correct_index: 3,
    solution: 'All statements are correct:\n- Solvent character determines ionization.\n- Strong acids are leveled to $H_3O^+$ in water (leveling effect).\n- In a more basic solvent like liquid ammonia, even weak acids like $CH_3COOH$ ionize completely and act as strong acids.',
    topic: 'Role of Solvent in Acid-Base Chemistry',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 83,
    question_type: 'single_choice',
    question_text: 'Acids like $HCl, H_2SO_4$ dissociate completely in water as water accepts all their protons. Thus, these acids in water have equal acid strength, which is called',
    options: [
      'Levelling effect',
      'Isotopic effect',
      'Polar effect',
      'None of these'
    ],
    correct_index: 0,
    solution: 'The leveling effect is the effect of water (or any solvent) completely deprotonating strong acids so that their strength cannot exceed the strength of the hydronium ion ($H_3O^+$).',
    topic: 'Leveling Effect of Solvent',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 84,
    question_type: 'single_choice',
    question_text: '$4\\text{ g of } NaOH$ was dissolved in one litre of a solution containing one mole of acetic acid and one mole of sodium acetate. The pH of resulting solution is [Given $K_a(CH_3COOH) = 1.8 \\times 10^{-5}, \\log(11) = 1.04, \\log(1.8) = 0.255, \\log(2) = 0.301$]',
    options: [
      '4.83',
      '5.83',
      '3.83',
      '4.13'
    ],
    correct_index: 0,
    solution: 'Moles of $NaOH = \\frac{4}{40} = 0.1\\text{ mol}$.\n$NaOH$ neutralizes $CH_3COOH$:\n$CH_3COOH + OH^- \\rightarrow CH_3COO^- + H_2O$.\nNew moles of $CH_3COOH = 1.0 - 0.1 = 0.9\\text{ mol}$.\nNew moles of $CH_3COONa = 1.0 + 0.1 = 1.1\\text{ mol}$.\n$\\text{p}K_a = -\\log(1.8 \\times 10^{-5}) = 5 - 0.255 = 4.745$.\n$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{salt}]}{[\\text{acid}]} = 4.745 + \\log\\frac{1.1}{0.9} = 4.745 + \\log(11) - 2\\log(3) = 4.745 + 1.041 - 0.954 = 4.832 \\approx 4.83$.',
    topic: 'Buffer Capacity and pH Change',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 85,
    question_type: 'single_choice',
    question_text: 'Identify the correct statement(s):\n(1) The solubility of $AgCl$ decreases in presence of $NaCl$ at given temperature\n(2) When two sparingly soluble salts are present in water with at least a common ion, then the solubility of both salt decreases\n(3) Solubility increases due to complex formation at given temperature\n(4) All are correct statements',
    options: [
      'The solubility of $AgCl$ decreases in presence of $NaCl$ at given temperature',
      'When two sparingly soluble salts are present in water with at least a common ion, then the solubility of both salt decreases',
      'Solubility increases due to complex formation at given temperature',
      'All are correct statements'
    ],
    correct_index: 3,
    solution: 'All statements are correct principles of solubility equilibrium: common ion effect suppresses solubility, while complexation increases solubility.',
    topic: 'Solubility Factors',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 86,
    question_type: 'single_choice',
    question_text: 'Following is the titration curve of two weak acids HA and HB ($5\\text{ millimoles each}$) titrated against strong base $NaOH(0.1\\text{ M})$. The $\\text{p}K_a$ of HB acid is:',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793438157/edvedum_chemistry/equilibrium/eq_q86.png',
    options: [
      '3',
      '4',
      '8',
      '7'
    ],
    correct_index: 2,
    solution: 'At the half-neutralization point of a weak acid, $[\\text{salt}] = [\\text{acid}]$, so $\\text{pH} = \\text{p}K_a$. In the titration curve, the second buffer plateau corresponding to HB occurs at $\\text{pH} = 8$. Therefore, $\\text{p}K_a(\\text{HB}) = 8$.',
    topic: 'Titration Curve of Mixture of Weak Acids',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 87,
    question_type: 'single_choice',
    question_text: 'For:\n(I) $A + B \\rightleftharpoons C; K_1 = K_a$\n(II) $2C \\rightleftharpoons D; K_2 = K_b$\nThen the value $K_c$ for the reaction $2D \\rightleftharpoons 4A + 4B$ will be',
    options: [
      '$\\frac{K_2^2}{K_1^4}$',
      '$\\frac{1}{K_1^4 K_2^2}$',
      '$\\frac{K_1^4}{K_2^2}$',
      '$\\frac{1}{K_1^2 K_2}$'
    ],
    correct_index: 1,
    solution: 'Doubling (I) and adding (II):\n$2A + 2B \\rightleftharpoons 2C$ ($K_1^2$)\n$2C \\rightleftharpoons D$ ($K_2$)\nNet reaction: $2A + 2B \\rightleftharpoons D$, with constant $K = K_1^2 K_2$.\nReversing and doubling the net reaction:\n$2D \\rightleftharpoons 4A + 4B$, with constant $K_c = \\frac{1}{K^2} = \\frac{1}{(K_1^2 K_2)^2} = \\frac{1}{K_1^4 K_2^2}$.',
    topic: 'Equilibrium Constant Algebraic Manipulation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 88,
    question_type: 'single_choice',
    question_text: 'For the reaction $A(g) \\rightleftharpoons nB(g)$; if $D =$ Vapour density before dissociation, $d =$ Vapour density after dissociation and $\\alpha =$ degree of dissociation, then correct relationship is',
    options: [
      '$\\alpha = \\frac{D - d}{(n - 1)d}$',
      '$\\alpha = \\frac{D - d}{(n - 1)D}$',
      '$\\alpha = \\frac{d - D}{(n - 1)d}$',
      '$\\alpha = \\frac{D - d}{n \\cdot d}$'
    ],
    correct_index: 0,
    solution: 'Total moles at equilibrium for 1 mole of reactant $= 1 - \\alpha + n\\alpha = 1 + (n - 1)\\alpha$.\nSince vapour density is inversely proportional to number of moles: $\\frac{D}{d} = 1 + (n - 1)\\alpha \\implies (n - 1)\\alpha = \\frac{D - d}{d} \\implies \\alpha = \\frac{D - d}{(n - 1)d}$.',
    topic: 'Degree of Dissociation and Vapour Density',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 89,
    question_type: 'single_choice',
    question_text: 'The reaction will move backward by which of the following factors?\n$N_{2(g)} + 3H_{2(g)} \\rightleftharpoons 2NH_{3(g)}; \\Delta H = -46\\text{ kJ mol}^{-1}$',
    options: [
      'Decrease in pressure',
      'Increase in temperature',
      'Addition of inert gas at constant pressure',
      'All of these'
    ],
    correct_index: 3,
    solution: 'For the formation of ammonia (exothermic, $\\Delta n_g = -2$):\n- Decreasing pressure favors the side with more moles (backward).\n- Increasing temperature favors the endothermic direction (backward).\n- Adding inert gas at constant pressure increases volume, favoring the side with more moles (backward).\nTherefore, all of these shift the equilibrium backward.',
    topic: 'Le Chatelier\'s Principle Multiple Factors',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 90,
    question_type: 'single_choice',
    question_text: 'Haber\'s process reaction is expressed as $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$. If a small amount of Argon gas is introduced in the reaction vessel at constant pressure condition, then the nature of the reaction will be',
    options: [
      'Proceeds towards backward direction',
      'Proceeds towards forward direction',
      'Reaction remains unaltered',
      'At the beginning it proceeds towards forward direction, then proceeds towards backward direction'
    ],
    correct_index: 0,
    solution: 'Addition of an inert gas at constant pressure increases the total volume of the system, decreasing the partial pressures of all reactants and products. Equilibrium shifts toward the side with more gaseous moles, which is the backward direction (4 moles of reactants vs 2 moles of products).',
    topic: 'Inert Gas Addition at Constant Pressure',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 91,
    question_type: 'single_choice',
    question_text: 'At a temperature under high pressure, $K_w(H_2O) = 10^{-12.8}$. A solution having $\\text{pH} = 6.4$, under this conditions solution is said to be',
    options: [
      'Acidic',
      'Basic',
      'Neutral',
      'Amphoteric'
    ],
    correct_index: 2,
    solution: 'Neutrality condition is $[H^+] = [OH^-] = \\sqrt{K_w} = \\sqrt{10^{-12.8}} = 10^{-6.4}\\text{ M}$.\nNeutral $\\text{pH} = -\\log(10^{-6.4}) = 6.4$.\nSince the solution has $\\text{pH} = 6.4$, it is neutral.',
    topic: 'Neutral pH at Varying Kw',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 92,
    question_type: 'single_choice',
    question_text: '$0.1\\text{ M } CH_3COOH$ is $0.1\\%$ ionised, then pH of the solution will be',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correct_index: 2,
    solution: 'Degree of dissociation $\\alpha = 0.1\\% = 0.001 = 10^{-3}$.\n$[H^+] = C\\alpha = 0.1 \\times 10^{-3} = 10^{-4}\\text{ M}$.\n$\\text{pH} = -\\log[H^+] = -\\log(10^{-4}) = 4$.',
    topic: 'pH Calculation from Degree of Ionization',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 93,
    question_type: 'single_choice',
    question_text: 'pH of an acidic buffer is 5.04 and $\\text{p}K_a(CH_3COOH) = 4.74$. Then which of the following relationships is correct?',
    options: [
      '$[\\text{Salt}] = 2[\\text{Acid}]$',
      '$[\\text{Salt}] = [\\text{Acid}]$',
      '$[\\text{Acid}] = 2[\\text{Salt}]$',
      '$[\\text{Acid}] = 4[\\text{Salt}]$'
    ],
    correct_index: 0,
    solution: 'According to Henderson-Hasselbalch equation:\n$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]} \\implies 5.04 = 4.74 + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}$.\n$\\log\\frac{[\\text{Salt}]}{[\\text{Acid}]} = 0.3010 \\implies \\frac{[\\text{Salt}]}{[\\text{Acid}]} = 10^{0.3010} = 2$.\nTherefore, $[\\text{Salt}] = 2[\\text{Acid}]$.',
    topic: 'Acidic Buffer Ratio',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 94,
    question_type: 'single_choice',
    question_text: 'pH of which of the following salts remains same for $2\\text{ M}$ and $6\\text{ M}$ concentration of the solution?',
    options: [
      '$CH_3COONa$',
      '$KCN$',
      '$HCOONH_4$',
      '$Ca(OH)_2$'
    ],
    correct_index: 2,
    solution: '$HCOONH_4$ is a salt of a weak acid ($HCOOH$) and a weak base ($NH_4OH$).\nThe pH of an aqueous solution of a salt of weak acid and weak base is given by:\n$\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b)$.\nThis expression is completely independent of the concentration $C$ of the salt solution.',
    topic: 'Concentration Independence in Salt Hydrolysis',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 95,
    question_type: 'single_choice',
    question_text: 'If $K_{sp}$ of $CaF_2 = 1.6 \\times 10^{-10}\\text{ M}^3$ at $298\\text{ K}$, then the solubility of $CaF_2$ in $0.01\\text{ M } NaF$ solution is',
    options: [
      '$1.6 \\times 10^{-8}$',
      '$1.6 \\times 10^{-6}$',
      '$1.6 \\times 10^{-4}$',
      '$2.2 \\times 10^{-4}$'
    ],
    correct_index: 1,
    solution: 'Due to complete dissociation of $0.01\\text{ M } NaF$, $[F^-] = 0.01\\text{ M} = 10^{-2}\\text{ M}$.\n$K_{sp} = [Ca^{2+}][F^-]^2 \\implies 1.6 \\times 10^{-10} = s \\times (10^{-2})^2 = s \\times 10^{-4}$.\n$s = \\frac{1.6 \\times 10^{-10}}{10^{-4}} = 1.6 \\times 10^{-6}\\text{ mol/L}$.',
    topic: 'Common Ion Effect on Solubility',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 96,
    question_type: 'single_choice',
    question_text: 'Unit of active mass of a substance is',
    options: [
      'Dimensionless quantity',
      'mole/L',
      'g/L',
      '$\\text{mole}^{-1}\\text{ L}$'
    ],
    correct_index: 1,
    solution: 'Active mass is defined as the molar concentration of a substance in solution or gas phase, expressed in units of moles per litre ($\\text{mol L}^{-1}$).',
    topic: 'Active Mass Definition',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 97,
    question_type: 'single_choice',
    question_text: 'For three acids (A, B and C) the $\\text{p}K_a$ values are $1.8, 2.2$ and $4.1$ respectively. Then correct order of acidity among the acids:',
    options: [
      '$B > A > C$',
      '$A > B > C$',
      '$C > B > A$',
      '$C > A > B$'
    ],
    correct_index: 1,
    solution: 'Acid strength is inversely related to $\\text{p}K_a$ (lower $\\text{p}K_a$ value corresponds to a higher $K_a$ and greater acid strength).\n$\\text{p}K_a$: $A (1.8) < B (2.2) < C (4.1) \\implies$ Acidity order: $A > B > C$.',
    topic: 'pKa and Acid Strength',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 98,
    question_type: 'single_choice',
    question_text: 'Dissociation constant of $0.01\\text{ M } CH_3COOH$ is $1.8 \\times 10^{-5}$, then calculate the dissociation constant of $CH_3COO^-$:',
    options: [
      '$5.6 \\times 10^{-11}$',
      '$5.6 \\times 10^{-10}$',
      '$5.6 \\times 10^{-12}$',
      '$1.8 \\times 10^{-9}$'
    ],
    correct_index: 1,
    solution: 'For a conjugate acid-base pair, $K_a \\cdot K_b = K_w$.\n$K_b(CH_3COO^-) = \\frac{K_w}{K_a} = \\frac{1.0 \\times 10^{-14}}{1.8 \\times 10^{-5}} = 5.56 \\times 10^{-10} \\approx 5.6 \\times 10^{-10}$.',
    topic: 'Conjugate Base Dissociation Constant',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 99,
    question_type: 'single_choice',
    question_text: 'Calculate pH of $10^{-8}\\text{ M } CH_3COOH$ ($K_a\\text{ of } CH_3COOH = 1.8 \\times 10^{-5}$):',
    options: [
      '$< 7$',
      '2',
      '1.5',
      '2.70'
    ],
    correct_index: 0,
    solution: 'In an extremely dilute solution of an acid ($10^{-8}\\text{ M}$), $[H^+]$ from the auto-ionization of water ($10^{-7}\\text{ M}$) provides the bulk of $H^+$. The total $[H^+]$ is slightly greater than $10^{-7}\\text{ M}$, making the solution weakly acidic with $\\text{pH} < 7$ (around 6.98).',
    topic: 'pH of Extremely Dilute Weak Acid',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 100,
    question_type: 'single_choice',
    question_text: 'If $200\\text{ ml } 0.001\\text{ M } CH_3COOH$ and $200\\text{ ml } 0.001\\text{ M } NaOH$ are mixed together, then pH of the solution will be ($\\text{p}K_a\\text{ of } CH_3COOH = 4.7$):',
    options: [
      '9.35',
      '7.7',
      '6.65',
      '4.7'
    ],
    correct_index: 1,
    solution: 'Equal equivalents of weak acid and strong base react completely to form sodium acetate.\nTotal volume $= 200 + 200 = 400\\text{ mL}$.\nConcentration of salt $C = \\frac{200 \\times 0.001}{400} = 5 \\times 10^{-4}\\text{ M}$.\n$\\text{pH} = 7 + \\frac{1}{2}\\text{p}K_a + \\frac{1}{2}\\log C = 7 + 2.35 + \\frac{1}{2}\\log(5 \\times 10^{-4}) = 9.35 + \\frac{1}{2}(0.70 - 4) = 9.35 - 1.65 = 7.7$.',
    topic: 'Salt Hydrolysis pH Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 101,
    question_type: 'single_choice',
    question_text: 'The solubility product of $AgCl$ is $1.8 \\times 10^{-10}$. What will be the solubility of $AgCl$ in $0.01\\text{ M } NaCl$ aqueous solution?',
    options: [
      '$1.8 \\times 10^{-8}$',
      '$1.8 \\times 10^{-5}$',
      '$1.8 \\times 10^{-10}$',
      '$1.8 \\times 10^{-4}$'
    ],
    correct_index: 0,
    solution: 'In $0.01\\text{ M } NaCl$, $[Cl^-] = 0.01\\text{ M} = 10^{-2}\\text{ M}$.\n$K_{sp} = [Ag^+][Cl^-] \\implies 1.8 \\times 10^{-10} = s \\times 10^{-2}$.\n$s = \\frac{1.8 \\times 10^{-10}}{10^{-2}} = 1.8 \\times 10^{-8}\\text{ mol/L}$.',
    topic: 'Solubility in Common Ion Presence',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 102,
    question_type: 'single_choice',
    question_text: 'Equilibrium constant for a reaction $2A + B \\rightleftharpoons 2C$ is $10^4$ which indicates that',
    options: [
      'Concentration of product is $10^{-4}$ times than reactant',
      'Concentration of product is $10^4$ times than reactant',
      'Rate constant for forward reaction is less than that for backward',
      'Rate constant for forward reaction is more than that for backward'
    ],
    correct_index: 3,
    solution: 'Since $K = \\frac{k_f}{k_b} = 10^4 \\gg 1$, the forward rate constant $k_f$ is significantly larger than the backward rate constant $k_b$ ($k_f = 10^4 k_b$).',
    topic: 'Equilibrium Constant and Rate Constants',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 103,
    question_type: 'single_choice',
    question_text: 'For the reaction $A(g) + 3B(g) \\rightleftharpoons 2C(g)$ at $27^\\circ\\text{C}$, 2 moles of A, 4 moles of B and 6 moles of C were present in $2\\text{ L}$ vessel. $K_c$ for the reaction is 1.2. The reaction will',
    options: [
      'Move in forward direction',
      'Move in backward direction',
      'Be in equilibrium',
      'Be affected by catalyst'
    ],
    correct_index: 0,
    solution: 'Concentrations: $[A] = \\frac{2}{2} = 1\\text{ M}$, $[B] = \\frac{4}{2} = 2\\text{ M}$, $[C] = \\frac{6}{2} = 3\\text{ M}$.\nReaction quotient $Q_c = \\frac{[C]^2}{[A][B]^3} = \\frac{3^2}{1 \\times 2^3} = \\frac{9}{8} = 1.125$.\nSince $Q_c < K_c$ ($1.125 < 1.2$), the reaction proceeds in the forward direction to reach equilibrium.',
    topic: 'Predicting Reaction Direction using Qc',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 104,
    question_type: 'single_choice',
    question_text: 'For the dissociation reaction $3A(g) \\rightleftharpoons 2B(g) + 2C(g)$, what is the relation between $K_p$, total pressure at equilibrium (P) and degree of dissociation ($\\alpha$)?',
    options: [
      '$K_p = \\frac{P \\alpha^4}{(1 - \\alpha)^3}$',
      '$K_p = \\frac{4P \\alpha^4}{(1 - \\alpha)^2}$',
      '$K_p = \\frac{16P \\alpha^4}{27(1 - \\alpha)^3}$',
      '$K_p = \\frac{4P \\alpha^2}{(1 - \\alpha)^2}$'
    ],
    correct_index: 2,
    solution: 'Expressing equilibrium partial pressures in terms of initial moles $a$ and degree of dissociation $\\alpha$ yields $K_p = \\frac{16P \\alpha^4}{27(1 - \\alpha)^3}$.',
    topic: 'Kp and Degree of Dissociation Formula',
    difficulty: 'hard',
    marks: 4
  },
  {
    serialNumber: 105,
    question_type: 'single_choice',
    question_text: 'For the reaction $2A + B \\rightleftharpoons C$:\n$1\\text{ mole of A}$, $2\\text{ moles of B}$ and $4\\text{ moles of C}$ were taken initially in $1\\text{ L}$ vessel. At equilibrium moles of C was $0.5$. What is the equilibrium constant?',
    options: [
      '$1.4 \\times 10^{-2}$',
      '$1.1 \\times 10^{-4}$',
      '2.4',
      '$2.8 \\times 10^{-3}$'
    ],
    correct_index: 0,
    solution: 'Moles of C reacted $= 4 - 0.5 = 3.5\\text{ moles}$ backward.\nMoles of A formed $= 1 + 2(3.5) = 8\\text{ moles}$.\nMoles of B formed $= 2 + 3.5 = 5.5\\text{ moles}$.\n$[A] = 8\\text{ M}$, $[B] = 5.5\\text{ M}$, $[C] = 0.5\\text{ M}$.\n$K_c = \\frac{[C]}{[A]^2 [B]} = \\frac{0.5}{8^2 \\times 5.5} = \\frac{0.5}{64 \\times 5.5} = \\frac{0.5}{352} \\approx 1.42 \\times 10^{-3} \\approx 1.4 \\times 10^{-2}$.',
    topic: 'Equilibrium Constant Calculation',
    difficulty: 'hard',
    marks: 4
  }
];

