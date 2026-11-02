// Batch 5: Equilibrium Questions Q141 - Q175
export const batch5Questions = [
  {
    serialNumber: 141,
    question_type: 'single_choice',
    question_text: 'Which of the following acids is strongest in aqueous solution?',
    options: [
      '$HCl$',
      '$HNO_3$',
      '$H_2SO_4$',
      'All are of same strength'
    ],
    correct_index: 3,
    solution: 'Due to the leveling effect of water, all strong acids ($HCl, HNO_3, H_2SO_4$) dissociate virtually $100\\%$ into hydronium ions ($H_3O^+$). Hence, they all appear to have the same acid strength in aqueous solution.',
    topic: 'Leveling Effect of Water',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 142,
    question_type: 'single_choice',
    question_text: 'If $0.02\\text{ N } HCl$ and $0.02\\text{ N } CH_3COOH$ are mixed in equal volume, final pH of the solution will be',
    options: [
      '1',
      '2',
      '1.7',
      '3'
    ],
    correct_index: 1,
    solution: '$HCl$ is a strong acid that ionizes completely, producing $H^+$ ions that suppress the ionization of the weak acid $CH_3COOH$ via common ion effect.\nUpon mixing equal volumes, concentration of $HCl$ is halved: $[H^+] = \\frac{0.02}{2} = 0.01\\text{ M} = 10^{-2}\\text{ M}$.\n$\\text{pH} = -\\log[H^+] = -\\log(10^{-2}) = 2$.',
    topic: 'Common Ion Effect in Acid Mixture',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 143,
    question_type: 'single_choice',
    question_text: 'In an aqueous solution $1\\text{ mol each of } CH_3COOH$ ($\\text{p}K_a = 4.75$) and $CH_3COONa$ are present. If $1\\text{ L of } 0.2\\text{ M } HCl$ is added to the solution, final pH of the solution will be',
    options: [
      '8.55',
      '3.55',
      '4.57',
      '10.55'
    ],
    correct_index: 2,
    solution: 'Added strong acid reacts with acetate ions: $CH_3COO^- + H^+ \\rightarrow CH_3COOH$.\nMoles of $HCl$ added $= 0.2\\text{ mol}$.\nNew moles of $CH_3COO^- = 1.0 - 0.2 = 0.8\\text{ mol}$.\nNew moles of $CH_3COOH = 1.0 + 0.2 = 1.2\\text{ mol}$.\n$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{salt}]}{[\\text{acid}]} = 4.75 + \\log\\left(\\frac{0.8}{1.2}\\right) = 4.75 + \\log\\left(\\frac{2}{3}\\right) = 4.75 - 0.176 = 4.574 \\approx 4.57$.',
    topic: 'Buffer Action and pH Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 144,
    question_type: 'single_choice',
    question_text: '$\\text{p}K_a\\text{ of } CH_3COOH$ and $\\text{p}K_b\\text{ of } NH_4OH$ are $4.76$ and $4.75$ respectively, pH of $0.1\\text{ M } CH_3COONH_4$ solution is',
    options: [
      '6.995',
      '8.505',
      '7.005',
      '7.000'
    ],
    correct_index: 2,
    solution: 'For a salt of weak acid and weak base:\n$\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b) = 7 + \\frac{1}{2}(4.76 - 4.75) = 7 + \\frac{0.01}{2} = 7 + 0.005 = 7.005$.',
    topic: 'Salt of Weak Acid and Weak Base pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 145,
    question_type: 'single_choice',
    question_text: 'Solubility product values of salts of types $MX, MX_2$ and $M_3X$ at same temperature are $4 \\times 10^{-8}, 4 \\times 10^{-12}$ and $2.7 \\times 10^{-15}$. The salt having maximum solubility in water is',
    options: [
      '$MX$',
      '$MX_2$',
      '$M_3X$',
      'All are of same solubility'
    ],
    correct_index: 0,
    solution: 'For $MX$: $K_{sp} = s^2 = 4 \\times 10^{-8} \\implies s = 2 \\times 10^{-4}\\text{ mol/L}$.\nFor $MX_2$: $K_{sp} = 4s^3 = 4 \\times 10^{-12} \\implies s^3 = 10^{-12} \\implies s = 10^{-4}\\text{ mol/L}$.\nFor $M_3X$: $K_{sp} = 27s^4 = 2.7 \\times 10^{-15} \\implies s^4 = 10^{-16} \\implies s = 10^{-4}\\text{ mol/L}$.\n$MX$ has the largest solubility ($2 \\times 10^{-4}\\text{ mol/L}$).',
    topic: 'Comparison of Solubilities from Ksp',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 146,
    question_type: 'single_choice',
    question_text: '$K_c$ for $PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$ is $0.04$ at $25^\\circ\\text{C}$. The number of moles of $PCl_5$ required to a $3.0\\text{ litre}$ flask to obtain $Cl_2$ of concentration $0.15\\text{ M}$ is',
    options: [
      '1.5 mole',
      '2.1 mole',
      '6.0 mole',
      '0.45 mole'
    ],
    correct_index: 1,
    solution: 'At equilibrium, $[Cl_2] = 0.15\\text{ M} \\implies [PCl_3] = 0.15\\text{ M}$.\n$K_c = \\frac{[PCl_3][Cl_2]}{[PCl_5]} \\implies 0.04 = \\frac{(0.15)^2}{[PCl_5]} \\implies [PCl_5] = \\frac{0.0225}{0.04} = 0.5625\\text{ M}$.\nInitial concentration of $PCl_5 = [PCl_5]_{eq} + [Cl_2]_{eq} = 0.5625 + 0.15 = 0.7125\\text{ M}$.\nTotal moles required in $3.0\\text{ L} = 0.7125 \\times 3 = 2.1375 \\approx 2.1\\text{ moles}$.',
    topic: 'Equilibrium Constant Calculations',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 147,
    question_type: 'single_choice',
    question_text: 'Which of the following is correct for the reaction $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$?',
    options: [
      '$K_p = K_c$',
      '$K_p > K_c$',
      '$K_p < K_c$',
      'Pressure is required to predict the correlation'
    ],
    correct_index: 2,
    solution: '$\\Delta n_g = 2 - (1 + 3) = -2$.\n$K_p = K_c(RT)^{\\Delta n_g} = K_c(RT)^{-2} = \\frac{K_c}{(RT)^2}$.\nUnder standard reaction conditions where $RT > 1$, $K_p < K_c$.',
    topic: 'Relation between Kp and Kc',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 148,
    question_type: 'single_choice',
    question_text: 'What will be effect on the state of equilibrium for the following reaction $H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$ at $250^\\circ\\text{C}$, on doubling the volume of the system?',
    options: [
      'Shift to reactant side',
      'Shift to product side',
      'No effect on state of equilibrium',
      'Liquefaction of $HI$'
    ],
    correct_index: 2,
    solution: 'For the reaction $H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$, the number of gaseous moles on both sides is identical ($\\Delta n_g = 2 - 2 = 0$). Therefore, a change in pressure or volume has no effect on the equilibrium position.',
    topic: 'Effect of Volume Change on Equilibrium',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 149,
    question_type: 'single_choice',
    question_text: 'Density of diamond and graphite are $2.5$ and $1.3\\text{ g/ml}$ respectively. With decrease in pressure equilibrium $C(\\text{diamond}) \\rightleftharpoons C(\\text{graphite})$ will',
    options: [
      'Favour backward reaction',
      'Favour forward reaction',
      'Increases the reaction rate',
      'Has no effect'
    ],
    correct_index: 1,
    solution: 'Molar volume is inversely proportional to density ($V = M/d$). Since graphite has lower density ($1.3\\text{ g/ml}$ vs $2.5\\text{ g/ml}$), it occupies a larger volume. Decreasing pressure shifts the equilibrium in the direction of greater volume, favoring the formation of graphite (forward reaction).',
    topic: 'Le Chatelier Principle and Density',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 150,
    question_type: 'single_choice',
    question_text: 'The pure water has $[H_3O^+] = 10^{-6}\\text{ M}$ at $90^\\circ\\text{C}$. The value of $\\text{p}K_w$ at the same temperature is',
    options: [
      '6',
      '14',
      '$10^{-12}$',
      '12'
    ],
    correct_index: 3,
    solution: 'In pure water, $[H_3O^+] = [OH^-] = 10^{-6}\\text{ M}$.\n$K_w = [H_3O^+][OH^-] = (10^{-6})^2 = 10^{-12}$.\n$\\text{p}K_w = -\\log(10^{-12}) = 12$.',
    topic: 'Ionic Product of Water at High Temperature',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 151,
    question_type: 'single_choice',
    question_text: '$0.40\\text{ g of } NaOH$ was added to one litre of a buffer solution. Its buffer capacity is found to be 0.06, its pH change will be',
    options: [
      '0.33',
      '0.17',
      '1.0',
      '0.01'
    ],
    correct_index: 1,
    solution: 'Moles of $NaOH$ added $= \\frac{0.40\\text{ g}}{40\\text{ g/mol}} = 0.01\\text{ mol}$.\nBuffer capacity $\\beta = \\frac{\\text{Moles of base per litre}}{\\Delta\\text{pH}} \\implies 0.06 = \\frac{0.01}{\\Delta\\text{pH}}$.\n$\\Delta\\text{pH} = \\frac{0.01}{0.06} = \\frac{1}{6} \\approx 0.17$.',
    topic: 'Buffer Capacity Calculation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 152,
    question_type: 'single_choice',
    question_text: 'Calculate the degree of hydrolysis of salt which is prepared by the mixing of $10\\text{ mL } \\frac{N}{10}$ acetic acid and $10\\text{ ml of } \\frac{N}{10} NaOH$ solution. [$K_a\\text{ of } CH_3COOH = 10^{-5}$]',
    options: [
      '$4.4 \\times 10^{-4}$',
      '$10^{-4}$',
      '$1.4 \\times 10^{-4}$',
      '$1.69 \\times 10^{-4}$'
    ],
    correct_index: 2,
    solution: 'Concentration of salt $C = \\frac{10 \\times 0.1}{20} = 0.05\\text{ M}$.\nDegree of hydrolysis $h = \\sqrt{\\frac{K_w}{K_a \\cdot C}} = \\sqrt{\\frac{10^{-14}}{10^{-5} \\times 0.05}} = \\sqrt{2 \\times 10^{-8}} = 1.414 \\times 10^{-4}$.',
    topic: 'Degree of Hydrolysis Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 153,
    question_type: 'single_choice',
    question_text: 'The solubility product of chalk is $9.3 \\times 10^{-8}$. Solubility of chalk in $\\text{g/L}$ is',
    options: [
      '$3.5 \\times 10^{-4}$',
      '$1.6 \\times 10^{-2}$',
      '$9.1 \\times 10^{-3}$',
      '$3.05 \\times 10^{-2}$'
    ],
    correct_index: 3,
    solution: 'Chalk is $CaCO_3$, molar mass $= 100\\text{ g/mol}$.\n$K_{sp} = s^2 \\implies s = \\sqrt{9.3 \\times 10^{-8}} = 3.05 \\times 10^{-4}\\text{ mol/L}$.\nSolubility in $\\text{g/L} = 3.05 \\times 10^{-4}\\text{ mol/L} \\times 100\\text{ g/mol} = 3.05 \\times 10^{-2}\\text{ g/L}$.',
    topic: 'Solubility in g/L from Ksp',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 154,
    question_type: 'single_choice',
    question_text: 'Which of the following is correct about buffer solution?\n(1) Its pH does not change on standing for long time\n(2) Its pH does not change on dilution\n(3) pH is slightly changed by the addition of small quantity of an acid or a base\n(4) All of these',
    options: [
      'Its pH does not change on standing for long time',
      'Its pH does not change on dilution',
      'pH is slightly changed by the addition of small quantity of an acid or a base',
      'All of these'
    ],
    correct_index: 3,
    solution: 'A buffer solution resists change in pH upon dilution, standing, or addition of small quantities of acid or base. Therefore, all given options are correct characteristics.',
    topic: 'Characteristics of Buffer Solution',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 155,
    question_type: 'single_choice',
    question_text: 'If $AgCl, PbCl_2$ and $Ca_3(PO_4)_2$ have same value of solubility product, which of the following has minimum solubility in mol/litre?',
    options: [
      '$AgCl$',
      '$PbCl_2$',
      '$Ca_3(PO_4)_2$',
      'All have same solubility'
    ],
    correct_index: 0,
    solution: 'Let $K_{sp} = 10^{-10}$:\nFor $AgCl$ (1:1 salt): $s = \\sqrt{10^{-10}} = 10^{-5}\\text{ M}$.\nFor $PbCl_2$ (1:2 salt): $s = (10^{-10}/4)^{1/3} \\approx 2.9 \\times 10^{-4}\\text{ M}$.\nFor $Ca_3(PO_4)_2$ (3:2 salt): $s = (10^{-10}/108)^{1/5} \\approx 4.0 \\times 10^{-3}\\text{ M}$.\nThus, $AgCl$ has the minimum molar solubility.',
    topic: 'Comparison of Solubilities from Identical Ksp',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 156,
    question_type: 'single_choice',
    question_text: 'When $0.4\\text{ mole of } HCl$ is added to one litre of solution containing $0.2\\text{ M each of } HCN$ and $CN^-$ ion, pH of solution becomes ($K_a = 1.8 \\times 10^{-5}$):',
    options: [
      '3.5',
      '1.7',
      '0.7',
      '4.5'
    ],
    correct_index: 2,
    solution: '$CN^-$ ($0.2\\text{ mol}$) consumes $0.2\\text{ mol } HCl$ to form $HCN$.\nRemaining unreacted $HCl = 0.4 - 0.2 = 0.2\\text{ mol}$ in $1\\text{ L}$.\n$[H^+] = 0.2\\text{ M}$ from strong acid.\n$\\text{pH} = -\\log(0.2) = 1 - \\log 2 = 1 - 0.301 = 0.699 \\approx 0.7$.',
    topic: 'Destruction of Buffer by Excess Strong Acid',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 157,
    question_type: 'single_choice',
    question_text: 'A certain weak acid has a dissociation constant $1.0 \\times 10^{-4}$. The equilibrium constant for its reaction with a strong base is',
    options: [
      '$1.0 \\times 10^{-4}$',
      '$1.0 \\times 10^{-10}$',
      '$1.0 \\times 10^{10}$',
      '$1.0 \\times 10^{14}$'
    ],
    correct_index: 2,
    solution: 'Reaction: $HA + OH^- \\rightleftharpoons A^- + H_2O$.\n$K = \\frac{[A^-]}{[HA][OH^-]} = \\frac{[A^-][H^+]}{[HA]} \\cdot \\frac{1}{[H^+][OH^-]} = \\frac{K_a}{K_w} = \\frac{1.0 \\times 10^{-4}}{1.0 \\times 10^{-14}} = 1.0 \\times 10^{10}$.',
    topic: 'Equilibrium Constant of Neutralization',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 158,
    question_type: 'single_choice',
    question_text: 'Review the $\\text{p}K_a$ data of the following equilibria and point out which buffer is to be used to study the hydrolysis of methyl acetate at $\\text{pH } 5.25$:\n(1) $HSO_4^- \\rightleftharpoons SO_4^{2-} + H^+$ ($\\text{p}K_a = 1.92$)\n(2) $H_2PO_4^- \\rightleftharpoons HPO_4^{2-} + H^+$ ($\\text{p}K_a = 7.21$)\n(3) $CO_2(aq) + H_2O \\rightleftharpoons HCO_3^- + H^+$ ($\\text{p}K_a = 6.37$)\n(4) $HCO_3^- \\rightleftharpoons CO_3^{2-} + H^+$ ($\\text{p}K_a = 10.25$)',
    options: [
      '$HSO_4^- / SO_4^{2-}$',
      '$H_2PO_4^- / HPO_4^{2-}$',
      '$CO_2 / HCO_3^-$',
      '$HCO_3^- / CO_3^{2-}$'
    ],
    correct_index: 2,
    solution: 'A buffer system has maximum buffering capacity in the range $\\text{pH} = \\text{p}K_a \\pm 1$. For studying at $\\text{pH } 5.25$, the $CO_2 / HCO_3^-$ system ($\\text{p}K_a = 6.37$) is closest to the effective buffering range.',
    topic: 'Buffer Selection',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 159,
    question_type: 'single_choice',
    question_text: 'For the reaction (I) and (II):\n$A(s) \\rightleftharpoons B(g) + C(g)$ ... (I)\n$D(s) \\rightleftharpoons 2E(g)$ ... (II)\nGiven $K_{p_1} : K_{p_2} = 16 : 1$. If the degree of dissociation of A and D be same then the total pressure at equilibria (I) and (II) would be in the ratio',
    options: [
      '$32 : 1$',
      '$1 : 64$',
      '$64 : 1$',
      '$4 : 1$'
    ],
    correct_index: 2,
    solution: 'For (I): $P_B = P_C = \\frac{P_1}{2} \\implies K_{p_1} = (P_1/2)^2 = \\frac{P_1^2}{4}$.\nFor (II): $P_E = P_2 \\implies K_{p_2} = P_2^2$.\n$\\frac{K_{p_1}}{K_{p_2}} = \\frac{P_1^2 / 4}{P_2^2} = 16 \\implies \\frac{P_1^2}{P_2^2} = 64$. Thus, the pressure terms ratio is $64 : 1$.',
    topic: 'Equilibrium Pressure Ratio',
    difficulty: 'hard',
    marks: 4
  },
  {
    serialNumber: 160,
    question_type: 'single_choice',
    question_text: '$40\\% N_2O_4$ molecules are dissociated in a sample of gas at $27^\\circ\\text{C}$ and $760\\text{ mm Hg}$. Calculate the density of the equilibrium mixture:',
    options: [
      '$13.11\\text{ g/L}$',
      '$2.66\\text{ g/L}$',
      '$6.2\\text{ g/L}$',
      '$20.02\\text{ g/L}$'
    ],
    correct_index: 1,
    solution: 'Average molar mass $M_{mix} = \\frac{M_{th}}{1 + \\alpha} = \\frac{92}{1 + 0.4} = \\frac{92}{1.4} = 65.71\\text{ g/mol}$.\n$d = \\frac{P M_{mix}}{R T} = \\frac{1\\text{ atm} \\times 65.71\\text{ g/mol}}{0.0821 \\times 300\\text{ K}} = \\frac{65.71}{24.63} = 2.668\\text{ g/L} \\approx 2.66\\text{ g/L}$.',
    topic: 'Density of Gas Mixture at Equilibrium',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 161,
    question_type: 'single_choice',
    question_text: '$\\text{p}K_h$ for a salt of weak acid and weak base is given by',
    options: [
      '$\\text{p}K_h = \\text{p}K_w - \\text{p}K_a$',
      '$\\text{p}K_h = \\text{p}K_w - \\text{p}K_a - \\text{p}K_b$',
      '$\\text{p}K_h = 14 + \\log K_a + \\log K_b$',
      '$\\text{p}K_h = 14 - \\log K_a - \\log K_b$'
    ],
    correct_index: 1,
    solution: 'For salt of weak acid and weak base: $K_h = \\frac{K_w}{K_a K_b}$.\nTaking negative log on both sides:\n$\\text{p}K_h = \\text{p}K_w - \\text{p}K_a - \\text{p}K_b$.',
    topic: 'Hydrolysis Constant Expression',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 162,
    question_type: 'single_choice',
    question_text: 'On reducing the concentration of base to one half in the buffer solution of $NH_4OH$ and $NH_4Cl$, the pH observed was 7.82. What was the pH of the original solution?',
    options: [
      '4.6',
      '10.34',
      '8.12',
      '7.52'
    ],
    correct_index: 2,
    solution: '$\\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{salt}]}{[\\text{base}]}$.\nWhen $[\\text{base}]$ is reduced to half, $[\\text{salt}]/[\\text{base}]$ doubles, so $\\text{pOH}$ increases by $\\log 2 = 0.301$, which causes $\\text{pH}$ to decrease by 0.30.\n$\\text{pH}_{new} = \\text{pH}_{initial} - 0.30 \\implies 7.82 = \\text{pH}_{initial} - 0.30 \\implies \\text{pH}_{initial} = 7.82 + 0.30 = 8.12$.',
    topic: 'Buffer Solution Henderson Equation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 163,
    question_type: 'single_choice',
    question_text: 'In a reaction, $A_2(g) + 4B_2(g) \\rightleftharpoons 2AB_4(g), \\Delta H > 0$. The formation of $AB_4(g)$ will be favoured by',
    options: [
      'Low temperature and low pressure',
      'Low temperature and high pressure',
      'High temperature and low pressure',
      'High temperature and high pressure'
    ],
    correct_index: 3,
    solution: 'Since $\\Delta H > 0$ (endothermic), an increase in temperature shifts the equilibrium forward. Also, $\\Delta n_g = 2 - (1 + 4) = -3 < 0$, so an increase in pressure shifts the equilibrium toward fewer gaseous moles (forward). Both high temperature and high pressure favor the formation of $AB_4(g)$.',
    topic: 'Le Chatelier Principle Multi-variable',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 164,
    question_type: 'single_choice',
    question_text: 'If solubility product of $Ca(OH)_2$ is $10^{-11}$, the pH at which $Ca(OH)_2$ precipitate from a solution containing decimolar concentration of $Ca^{2+}$ is',
    options: [
      '$< 5$',
      '$9 < \\text{pH} < 5$',
      '$> 9$',
      '$9 < \\text{pH} < 7$'
    ],
    correct_index: 2,
    solution: '$[Ca^{2+}] = 0.1\\text{ M} = 10^{-1}\\text{ M}$.\nPrecipitation begins when ionic product $Q_{sp} > K_{sp}$:\n$[Ca^{2+}][OH^-]^2 > 10^{-11} \\implies 10^{-1}[OH^-]^2 > 10^{-11} \\implies [OH^-]^2 > 10^{-10} \\implies [OH^-] > 10^{-5}\\text{ M}$.\n$[OH^-] > 10^{-5}\\text{ M} \\implies \\text{pOH} < 5 \\implies \\text{pH} > 9$.',
    topic: 'Precipitation Criterion and pH',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 165,
    question_type: 'single_choice',
    question_text: 'What will be the pOH when $20\\text{ ml of } 0.2\\text{ M } HCN$ ($\\text{p}K_a = 5.0$) is titrated with $20\\text{ ml of } 0.2\\text{ M } NH_4OH$ solution ($\\text{p}K_b = 5.0$)?',
    options: [
      '7',
      '5',
      '9',
      '12'
    ],
    correct_index: 0,
    solution: 'Equal equivalents of weak acid and weak base neutralize completely to form ammonium cyanide ($NH_4CN$).\nFor salt of weak acid and weak base:\n$\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b) = 7 + \\frac{1}{2}(5.0 - 5.0) = 7.0$.\n$\\text{pOH} = 14 - \\text{pH} = 14 - 7.0 = 7.0$.',
    topic: 'Weak Acid-Weak Base Salt pOH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 166,
    question_type: 'single_choice',
    question_text: 'For the reaction, $CuSO_4 \\cdot 5H_2O(s) \\rightleftharpoons CuSO_4 \\cdot 3H_2O(s) + 2H_2O(g)$. Which one is correct representation?\n(1) $K_p = P_{H_2O}^2$\n(2) $K_c = [H_2O]^2$\n(3) $K_p = K_c(RT)^2$\n(4) All of these',
    options: [
      '$K_p = P_{H_2O}^2$',
      '$K_c = [H_2O]^2$',
      '$K_p = K_c(RT)^2$',
      'All of these'
    ],
    correct_index: 3,
    solution: 'Both copper sulfate hydrates are pure solids whose activities are unity. Hence $K_p = P_{H_2O}^2$ and $K_c = [H_2O]^2$. Since $\\Delta n_g = 2$, $K_p = K_c(RT)^2$. All representations are correct.',
    topic: 'Heterogeneous Equilibrium Expression',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 167,
    question_type: 'single_choice',
    question_text: 'pH of water is 7.0 at $25^\\circ\\text{C}$. If water is heated to $70^\\circ\\text{C}$, the',
    options: [
      'pH will decrease and solution becomes acidic',
      'pH will increase',
      'pH will remain constant as 7',
      'pH will decrease but solution will be neutral'
    ],
    correct_index: 3,
    solution: 'Auto-ionization of water is endothermic, so heating to $70^\\circ\\text{C}$ increases $K_w$ and $[H^+]$, causing the pH to decrease below 7. However, $[H^+] = [OH^-]$ remains true, so the water remains neutral.',
    topic: 'Temperature Effect on pH of Water',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 168,
    question_type: 'single_choice',
    question_text: 'The conjugate base of $[Al(H_2O)_6]^{3+}$ is',
    options: [
      '$[Al(H_2O)_5(OH)]^{2+}$',
      '$[Al(H_2O)_4(OH)_2]^+$',
      '$[Al(H_2O)_3(OH)_3]$',
      '$[Al(H_2O)_2(OH)_4]^-$'
    ],
    correct_index: 0,
    solution: 'The conjugate base is formed by the removal of one proton ($H^+$) from a coordinated water molecule:\n$[Al(H_2O)_6]^{3+} \\rightarrow [Al(H_2O)_5(OH)]^{2+} + H^+$.',
    topic: 'Conjugate Bases of Hydrated Cations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 169,
    question_type: 'single_choice',
    question_text: 'The solubility of $PbCl_2$ in water is $0.01\\text{ M}$ at $25^\\circ\\text{C}$. Maximum concentration of $[Pb^{2+}]$ in $0.1\\text{ M } NaCl$ will be',
    options: [
      '$2 \\times 10^{-2}\\text{ M}$',
      '$1 \\times 10^{-4}\\text{ M}$',
      '$1.6 \\times 10^{-2}\\text{ M}$',
      '$4 \\times 10^{-4}\\text{ M}$'
    ],
    correct_index: 3,
    solution: '$K_{sp} = 4s^3 = 4 \\times (0.01)^3 = 4 \\times 10^{-6}$.\nIn $0.1\\text{ M } NaCl$, $[Cl^-] = 0.1\\text{ M}$.\n$[Pb^{2+}] = \\frac{K_{sp}}{[Cl^-]^2} = \\frac{4 \\times 10^{-6}}{(0.1)^2} = \\frac{4 \\times 10^{-6}}{10^{-2}} = 4 \\times 10^{-4}\\text{ M}$.',
    topic: 'Common Ion Effect on Solubility',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 170,
    question_type: 'single_choice',
    question_text: 'For the reaction: $N_2O_5 \\rightleftharpoons NO + NO_2$, total pressure is P and degree of dissociation is $50\\%$. Then, $K_p$ would be',
    options: [
      '$3P$',
      '$2P$',
      '$\\frac{P}{3}$',
      '$\\frac{P}{2}$'
    ],
    correct_index: 2,
    solution: 'At equilibrium, with $\\alpha = 0.5$:\nMoles: $N_2O_5 = 1 - 0.5 = 0.5$, $NO = 0.5$, $NO_2 = 0.5$.\nTotal moles $= 1.5$.\nPartial pressures: $P_{N_2O_5} = P_{NO} = P_{NO_2} = \\frac{0.5}{1.5} P = \\frac{P}{3}$.\n$K_p = \\frac{P_{NO} \\cdot P_{NO_2}}{P_{N_2O_5}} = \\frac{(P/3)(P/3)}{(P/3)} = \\frac{P}{3}$.',
    topic: 'Kp Calculation from Degree of Dissociation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 171,
    question_type: 'single_choice',
    question_text: 'Which of the following aqueous solution of sodium acetate will show minimum pH?',
    options: [
      '$0.01\\text{ M}$',
      '$0.001\\text{ M}$',
      '$0.0001\\text{ M}$',
      '$0.1\\text{ M}$'
    ],
    correct_index: 2,
    solution: 'For a salt of weak acid and strong base: $\\text{pH} = 7 + \\frac{1}{2}\\text{p}K_a + \\frac{1}{2}\\log C$.\nAs concentration $C$ decreases, $\\log C$ becomes more negative, reducing the pH toward neutral 7. Hence, the most dilute solution ($0.0001\\text{ M}$) will have the minimum pH.',
    topic: 'Concentration Dependence of Salt Hydrolysis pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 172,
    question_type: 'single_choice',
    question_text: 'pH of $0.1\\text{ M } NaCN$ solution is 11, then the percentage hydrolysis is',
    options: [
      '$0.1\\%$',
      '$1\\%$',
      '$0.001\\%$',
      '$10\\%$'
    ],
    correct_index: 1,
    solution: '$\\text{pH} = 11 \\implies \\text{pOH} = 3 \\implies [OH^-] = 10^{-3}\\text{ M}$.\n$[OH^-] = C \\cdot h \\implies 10^{-3} = 0.1 \\times h \\implies h = 10^{-2} = 0.01$.\nPercentage hydrolysis $= h \\times 100\\% = 0.01 \\times 100\\% = 1\\%$.',
    topic: 'Percentage Hydrolysis',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 173,
    question_type: 'single_choice',
    question_text: 'Equilibrium constant ($K_c$) for the following reaction $2HI \\rightleftharpoons H_2 + I_2$ is $\\frac{1}{36}$. Then, percentage of $HI$ left at equilibrium will be',
    options: [
      '$25\\%$',
      '$50\\%$',
      '$75\\%$',
      '$12.5\\%$'
    ],
    correct_index: 2,
    solution: '$K_c = \\frac{(\\alpha/2)^2}{(1 - \\alpha)^2} = \\frac{\\alpha^2}{4(1 - \\alpha)^2} = \\frac{1}{36}$.\nTaking square root: $\\frac{\\alpha}{2(1 - \\alpha)} = \\frac{1}{6} \\implies 6\\alpha = 2 - 2\\alpha \\implies 8\\alpha = 2 \\implies \\alpha = 0.25 = 25\\%$.\nPercentage of $HI$ unreacted at equilibrium $= 100\\% - 25\\% = 75\\%$.',
    topic: 'Degree of Dissociation and Equilibrium Composition',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 174,
    question_type: 'single_choice',
    question_text: 'Which of the following can act as Buffer solution?\n(1) $NH_4OH + NH_4Cl$\n(2) Boric acid + Borax\n(3) $Na_2HPO_4 + Na_3PO_4$\n(4) All of these',
    options: [
      '$NH_4OH + NH_4Cl$',
      'Boric acid + Borax',
      '$Na_2HPO_4 + Na_3PO_4$',
      'All of these'
    ],
    correct_index: 3,
    solution: 'All three mixtures consist of a weak acid or base and its conjugate salt:\n- $NH_4OH + NH_4Cl$ is a basic buffer.\n- Boric acid + Borax is an acidic buffer.\n- $Na_2HPO_4 + Na_3PO_4$ is a buffer of conjugate species $HPO_4^{2-} / PO_4^{3-}$.\nThus, all of them can act as buffer solutions.',
    topic: 'Buffer Systems',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 175,
    question_type: 'single_choice',
    question_text: 'What will be the resulting pH, when equal volume of each of monobasic acid solution with pH 2, 3, 4 are mixed in a vessel? ($\\log 3.7 = 0.56$)',
    options: [
      '1.9',
      '2.44',
      '3',
      '3.40'
    ],
    correct_index: 1,
    solution: '$[H^+]_1 = 10^{-2}\\text{ M}$, $[H^+]_2 = 10^{-3}\\text{ M}$, $[H^+]_3 = 10^{-4}\\text{ M}$.\nWhen equal volumes $V$ are mixed, total volume is $3V$:\n$[H^+]_{mix} = \\frac{10^{-2} + 10^{-3} + 10^{-4}}{3} = \\frac{0.01 + 0.001 + 0.0001}{3} = \\frac{0.0111}{3} = 0.0037\\text{ M} = 3.7 \\times 10^{-3}\\text{ M}$.\n$\\text{pH} = -\\log(3.7 \\times 10^{-3}) = 3 - \\log 3.7 = 3 - 0.56 = 2.44$.',
    topic: 'pH of Mixture of Acids',
    difficulty: 'medium',
    marks: 4
  }
];

