// Batch 6: Equilibrium Questions Q176 - Q210
export const batch6Questions = [
  {
    serialNumber: 176,
    question_type: 'single_choice',
    question_text: '$H_3PO_4 \\xrightleftharpoons{K_1} H^+ + A^- \\xrightleftharpoons{K_2} H^+ + B^{2-} \\xrightleftharpoons{K_3} H^+ + C^{3-}$, what can be predicted about $K_1, K_2, K_3$?',
    options: [
      '$K_1 > K_2 > K_3$',
      '$K_3 > K_2 > K_1$',
      '$K_1 = K_2 = K_3$',
      '$K_1 = K_2 < K_3$'
    ],
    correct_index: 0,
    solution: 'For a polyprotic acid, the removal of a proton from an already negatively charged anion becomes progressively more difficult due to electrostatic attraction. Hence, the successive ionization constants always follow the order: $K_1 > K_2 > K_3$.',
    topic: 'Ionization Constants of Polyprotic Acids',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 177,
    question_type: 'single_choice',
    question_text: 'Increasing pressure will move the reaction in forward direction for',
    options: [
      '$N_2(g) + O_2(g) \\rightleftharpoons 2NO(g)$',
      '$2PCl_3(g) \\rightleftharpoons 2P(s) + 3Cl_2(g)$',
      '$\\text{Water} \\rightleftharpoons \\text{Ice}$',
      '$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$'
    ],
    correct_index: 3,
    solution: 'According to Le Chatelier\'s principle, an increase in pressure shifts the equilibrium toward the side with fewer gaseous moles. For $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$, $\\Delta n_g = 2 - 4 = -2 < 0$, so the forward reaction produces fewer moles of gas and is favored by high pressure.',
    topic: 'Le Chatelier\'s Principle - Effect of Pressure',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 178,
    question_type: 'single_choice',
    question_text: '$H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$. If $2\\text{ g } H_2, 63.5\\text{ g } I_2, 25.6\\text{ g } HI$ are present at equilibrium for the reaction in $2\\text{ litre}$ flask, value of $K_c =$',
    options: [
      '0.16',
      '0.0256',
      '1.65',
      '0.08'
    ],
    correct_index: 0,
    solution: 'Moles at equilibrium:\n$n_{H_2} = \\frac{2}{2} = 1.0\\text{ mol}$.\n$n_{I_2} = \\frac{63.5}{254} = 0.25\\text{ mol}$.\n$n_{HI} = \\frac{25.6}{128} = 0.20\\text{ mol}$.\nSince $\\Delta n_g = 0$, volume cancels out:\n$K_c = \\frac{n_{HI}^2}{n_{H_2} \\times n_{I_2}} = \\frac{(0.20)^2}{1.0 \\times 0.25} = \\frac{0.04}{0.25} = 0.16$.',
    topic: 'Equilibrium Constant Kc Calculation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 179,
    question_type: 'single_choice',
    question_text: '$K_{sp}$ for zinc phosphate is correctly represented as',
    options: [
      '$27s^4$',
      '$8s^3$',
      '$27s^5$',
      '$108s^5$'
    ],
    correct_index: 3,
    solution: 'Zinc phosphate is $Zn_3(PO_4)_2(s) \\rightleftharpoons 3Zn^{2+} + 2PO_4^{3-}$.\nIf solubility is $s$, then $[Zn^{2+}] = 3s$ and $[PO_4^{3-}] = 2s$.\n$K_{sp} = [Zn^{2+}]^3 [PO_4^{3-}]^2 = (3s)^3 (2s)^2 = 27s^3 \\times 4s^2 = 108 s^5$.',
    topic: 'Solubility Product Expression',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 180,
    question_type: 'single_choice',
    question_text: 'If $K_a$ for $HCN$ is $10^{-6}$ and concentration of $CN^-$ is twice than that of $HCN$. The pH of buffer is',
    options: [
      '5',
      '5.477',
      '4.523',
      '6.3'
    ],
    correct_index: 3,
    solution: '$\\text{p}K_a = -\\log(10^{-6}) = 6.0$.\nBy Henderson-Hasselbalch equation:\n$\\text{pH} = \\text{p}K_a + \\log\\frac{[CN^-]}{[HCN]} = 6.0 + \\log(2) = 6.0 + 0.3010 = 6.301 \\approx 6.3$.',
    topic: 'pH of Acidic Buffer Solution',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 181,
    question_type: 'single_choice',
    question_text: 'If pH of $0.1\\text{ M } (NH_4)_2CO_3$ solution is $x$ then pH of $0.01\\text{ M}$ solution of $(NH_4)_2CO_3$ is',
    options: [
      '$2x$',
      '$x/2$',
      '$10x$',
      '$x$'
    ],
    correct_index: 3,
    solution: '$(NH_4)_2CO_3$ is a salt of a weak acid ($H_2CO_3$) and a weak base ($NH_4OH$).\nThe pH of an aqueous solution of a salt of weak acid and weak base is given by:\n$\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b)$.\nThis value is completely independent of concentration $C$. Therefore, the pH remains $x$.',
    topic: 'Salt Hydrolysis pH Independence',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 182,
    question_type: 'single_choice',
    question_text: 'Which of the following mixture act as buffer solution?',
    options: [
      '$100\\text{ ml of } 1\\text{ M } CH_3COOH + 25\\text{ ml } 5\\text{ M } NaOH$',
      '$150\\text{ ml } 0.1\\text{ M } HCOOH + 20\\text{ ml } 1\\text{ M } KOH$',
      '$200\\text{ ml } 0.5\\text{ M } NH_4OH + 50\\text{ ml } 2\\text{ M } H_2SO_4$',
      '$100\\text{ ml } 1\\text{ M } NH_4OH + 40\\text{ ml } 1\\text{ M } HCl$'
    ],
    correct_index: 3,
    solution: 'In option (4):\nMoles of $NH_4OH = 100 \\times 1 = 100\\text{ mmol}$.\nMoles of $HCl = 40 \\times 1 = 40\\text{ mmol}$.\n$HCl$ completely neutralizes $40\\text{ mmol } NH_4OH$, leaving $60\\text{ mmol } NH_4OH$ (weak base) and forming $40\\text{ mmol } NH_4Cl$ (conjugate salt). This forms an effective basic buffer.',
    topic: 'Buffer Solution Preparation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 183,
    question_type: 'single_choice',
    question_text: 'For the reaction, $A(g) + 2B(g) \\rightleftharpoons 3C(g)$, $K_c = 10^2$. If at equilibrium, one mole of A is added and 1 mole of C is removed then the value of $K_c$ will be',
    options: [
      '$10^2$',
      '$10^3$',
      '$10^4$',
      '10'
    ],
    correct_index: 0,
    solution: 'The equilibrium constant $K_c$ is a thermodynamic constant that depends solely on temperature for a given reaction. Adding or removing reactants or products shifts the equilibrium position but does not alter the value of $K_c$, so it remains $10^2$.',
    topic: 'Constancy of Equilibrium Constant',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 184,
    question_type: 'single_choice',
    question_text: 'In the system, $MgCl_2(s) + H_2O(g) + \\text{Heat} \\rightleftharpoons MgO(s) + 2HCl(g)$ equilibrium is established. More water vapour is added to re-establish the equilibrium. The pressure of water vapour is tripled. The factor by which pressure of $HCl$ is changed:',
    options: [
      '3',
      '$\\sqrt{3}$',
      '6',
      '$\\sqrt{6}$'
    ],
    correct_index: 1,
    solution: '$K_p = \\frac{P_{HCl}^2}{P_{H_2O}}$ because $MgCl_2(s)$ and $MgO(s)$ are pure solids.\nAt constant temperature, $K_p$ is constant:\n$P_{HCl}^2 = K_p \\cdot P_{H_2O} \\implies P_{HCl} \\propto \\sqrt{P_{H_2O}}$.\nWhen $P_{H_2O}$ is tripled, $P_{HCl}$ changes by a factor of $\\sqrt{3}$.',
    topic: 'Heterogeneous Equilibrium and Partial Pressure',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 185,
    question_type: 'single_choice',
    question_text: 'The equilibrium constant $K_p$ for the reaction $2AO + O_2 \\rightleftharpoons 2AO_2$ at a particular temperature is 5. The partial pressure of oxygen gas if equal moles of $AO$ and $AO_2$ is present at equilibrium:',
    options: [
      '$0.49\\text{ atm}$',
      '$5\\text{ atm}$',
      '$0.2\\text{ atm}$',
      '$1.87\\text{ atm}$'
    ],
    correct_index: 2,
    solution: '$K_p = \\frac{P_{AO_2}^2}{P_{AO}^2 \\cdot P_{O_2}} = 5$.\nSince equal moles of $AO$ and $AO_2$ are present, their mole fractions and partial pressures are equal ($P_{AO_2} = P_{AO}$).\nTherefore, $\\frac{1}{P_{O_2}} = 5 \\implies P_{O_2} = \\frac{1}{5} = 0.2\\text{ atm}$.',
    topic: 'Equilibrium Constant and Partial Pressure',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 186,
    question_type: 'single_choice',
    question_text: '$A^- + H_2O \\rightleftharpoons HA + OH^-$ represents the hydrolysis reaction. This indicates that the salt is made up of',
    options: [
      'Weak acid and weak base',
      'Strong acid and weak base',
      'Strong base and weak acid',
      'Strong acid and strong base'
    ],
    correct_index: 2,
    solution: 'The anion $A^-$ is the conjugate base of a weak acid $HA$. When it reacts with water, it produces $OH^-$, causing an alkaline solution. This is typical anionic hydrolysis of a salt derived from a weak acid and a strong base (such as $CH_3COONa$).',
    topic: 'Anionic Hydrolysis',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 187,
    question_type: 'single_choice',
    question_text: 'A solution contains $Pb^{2+}$ ions. In order to precipitate $Pb^{2+}$ ions, potassium sulphate is added. What is the concentration of sulphate ions required to reduce the concentration of $Pb^{2+}$ to $4 \\times 10^{-6}\\text{ moles per litre}$? [$K_{sp}\\text{ of } PbSO_4 = 1.8 \\times 10^{-8}$]',
    options: [
      '$4.5 \\times 10^{-3}\\text{ M}$',
      '$9 \\times 10^{-4}\\text{ M}$',
      '$8 \\times 10^{-5}\\text{ M}$',
      '$5 \\times 10^{-5}\\text{ M}$'
    ],
    correct_index: 0,
    solution: '$K_{sp} = [Pb^{2+}][SO_4^{2-}] \\implies [SO_4^{2-}] = \\frac{K_{sp}}{[Pb^{2+}]} = \\frac{1.8 \\times 10^{-8}}{4 \\times 10^{-6}} = 4.5 \\times 10^{-3}\\text{ mol/L}$.',
    topic: 'Precipitation Calculation from Ksp',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 188,
    question_type: 'single_choice',
    question_text: 'pH of which of the following salt solution does not depend on concentration?',
    options: [
      '$CH_3COONa$',
      '$NH_4Cl$',
      '$NH_4NO_2$',
      '$NaCN$'
    ],
    correct_index: 2,
    solution: '$NH_4NO_2$ is a salt of a weak acid ($HNO_2$) and a weak base ($NH_4OH$).\nThe pH for such salts is $\\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b)$, which has no concentration term $C$.',
    topic: 'Salt Hydrolysis Concentration Independence',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 189,
    question_type: 'single_choice',
    question_text: 'What volume of water is added to $400\\text{ ml of } HCl$ solution so the pH of the solution increases by one unit?',
    options: [
      '$360\\text{ ml}$',
      '$1000\\text{ ml}$',
      '$600\\text{ ml}$',
      '$3600\\text{ ml}$'
    ],
    correct_index: 3,
    solution: 'To increase the pH by 1 unit, $[H^+]$ must decrease by a factor of 10:\n$\\frac{C_1}{C_2} = 10 \\implies V_2 = 10 V_1 = 10 \\times 400 = 4000\\text{ mL}$.\nVolume of water to be added $= V_2 - V_1 = 4000 - 400 = 3600\\text{ mL}$.',
    topic: 'Dilution and pH Change',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 190,
    question_type: 'single_choice',
    question_text: 'The equilibrium constant $K_p$ for the reaction $A \\rightleftharpoons 2B$ is related to degree of dissociation $\\alpha$ and total pressure P is',
    options: [
      '$K_p = \\frac{4\\alpha^2 P}{1 - \\alpha^2}$, $K_p$ is independent of pressure',
      '$K_p = \\frac{2\\alpha^2 P}{1 - \\alpha^2}$',
      '$K_p = \\frac{4\\alpha^2 P}{1 - \\alpha}$, $K_p$ is directly proportional to pressure',
      '$K_p = \\frac{2\\alpha^2 P}{1 - \\alpha}$'
    ],
    correct_index: 0,
    solution: 'For $A(g) \\rightleftharpoons 2B(g)$:\nTotal moles $= (1 - \\alpha) + 2\\alpha = 1 + \\alpha$.\n$P_A = \\frac{1 - \\alpha}{1 + \\alpha}P$, $P_B = \\frac{2\\alpha}{1 + \\alpha}P$.\n$K_p = \\frac{P_B^2}{P_A} = \\frac{\\frac{4\\alpha^2}{(1 + \\alpha)^2}P^2}{\\frac{1 - \\alpha}{1 + \\alpha}P} = \\frac{4\\alpha^2 P}{1 - \\alpha^2}$.\n$K_p$ depends only on temperature and is independent of total pressure.',
    topic: 'Relation between Kp, Alpha and P',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 191,
    question_type: 'single_choice',
    question_text: 'pH of $0.1\\text{ M } CH_3COONa$ solution is 12. Then the percentage hydrolysis will be',
    options: [
      '$1\\%$',
      '$0.1\\%$',
      '$10\\%$',
      '$0.01\\%$'
    ],
    correct_index: 2,
    solution: '$\\text{pH} = 12 \\implies \\text{pOH} = 2 \\implies [OH^-] = 10^{-2}\\text{ M}$.\nFor anionic hydrolysis: $[OH^-] = C \\cdot h \\implies 10^{-2} = 0.1 \\times h \\implies h = 0.1$.\nPercentage hydrolysis $= h \\times 100\\% = 0.1 \\times 100\\% = 10\\%$.',
    topic: 'Percentage Hydrolysis Calculation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 192,
    question_type: 'single_choice',
    question_text: 'An element \'X\'(s) melts at $271^\\circ\\text{C}$ and has density of $9.73\\text{ g/ml}$ as solid and $10.05\\text{ g/ml}$ as a liquid at this temperature for the equilibrium $X(s) \\rightleftharpoons X(l)$, the melting point is favoured either by',
    options: [
      'Increasing temperature, decreasing pressure',
      'Decreasing temperature, decreasing pressure',
      'Increasing temperature, increasing pressure',
      'There is no effect of pressure on melting point'
    ],
    correct_index: 2,
    solution: 'Melting is an endothermic process ($\\Delta H > 0$), so increasing temperature favors the forward reaction. Since the density of liquid ($10.05\\text{ g/ml}$) is greater than solid ($9.73\\text{ g/ml}$), melting causes a decrease in volume. According to Le Chatelier\'s principle, increasing pressure favors the denser liquid phase (forward direction). Thus, melting is favored by increasing temperature and increasing pressure.',
    topic: 'Physical Equilibrium and Density Variation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 193,
    question_type: 'single_choice',
    question_text: 'For the equilibrium reaction $2NOBr(g) \\rightleftharpoons 2NO(g) + Br_2(g)$ if $P_{Br_2} = \\frac{P}{9}$, where P is total pressure then $P_{NOBr}$ will be',
    options: [
      '$\\frac{3P}{9}$',
      '$\\frac{6P}{9}$',
      '$\\frac{P}{9}$',
      '$\\frac{2P}{9}$'
    ],
    correct_index: 1,
    solution: 'From reaction stoichiometry, $2\\text{ moles of } NO$ are formed per $1\\text{ mole of } Br_2$:\n$P_{NO} = 2 P_{Br_2} = 2\\left(\\frac{P}{9}\\right) = \\frac{2P}{9}$.\nTotal pressure $P = P_{NOBr} + P_{NO} + P_{Br_2} = P_{NOBr} + \\frac{2P}{9} + \\frac{P}{9} = P_{NOBr} + \\frac{3P}{9}$.\n$P_{NOBr} = P - \\frac{3P}{9} = \\frac{6P}{9}$.',
    topic: 'Partial Pressures at Equilibrium',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 194,
    question_type: 'single_choice',
    question_text: 'At temperature T K, $PCl_5$ is $50\\%$ dissociated at an equilibrium pressure of $4\\text{ atm}$. At what pressure it would dissociate to $80\\%$ at the same temperature?',
    options: [
      '$0.75\\text{ atm}$',
      '$0.50\\text{ atm}$',
      '$0.60\\text{ atm}$',
      '$2.2\\text{ atm}$'
    ],
    correct_index: 0,
    solution: '$K_p = \\frac{\\alpha^2 P}{1 - \\alpha^2}$.\nAt $\\alpha_1 = 0.5$ and $P_1 = 4\\text{ atm}$:\n$K_p = \\frac{(0.5)^2 \\times 4}{1 - (0.5)^2} = \\frac{1}{0.75} = \\frac{4}{3}\\text{ atm}$.\nAt $\\alpha_2 = 0.8$:\n$K_p = \\frac{(0.8)^2 \\times P_2}{1 - (0.8)^2} = \\frac{0.64 P_2}{0.36} = \\frac{16}{9} P_2$.\n$\\frac{4}{3} = \\frac{16}{9} P_2 \\implies P_2 = \\frac{4}{3} \\times \\frac{9}{16} = \\frac{3}{4} = 0.75\\text{ atm}$.',
    topic: 'Degree of Dissociation and Total Pressure',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 195,
    question_type: 'single_choice',
    question_text: 'Vapour density of $N_2O_4$ when heated to $100^\\circ\\text{C}$ becomes 24.5. Its degree of dissociation at this temperature is',
    options: [
      '$80\\%$',
      '$87.75\\%$',
      '$40.34\\%$',
      '$60\\%$'
    ],
    correct_index: 1,
    solution: 'Theoretical vapour density $D = \\frac{92}{2} = 46$.\nObserved vapour density $d = 24.5$.\n$\\alpha = \\frac{D - d}{(n - 1)d} = \\frac{46 - 24.5}{(2 - 1) \\times 24.5} = \\frac{21.5}{24.5} \\approx 0.8775 = 87.75\\%$.',
    topic: 'Vapour Density and Dissociation Calculation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 196,
    question_type: 'single_choice',
    question_text: 'If $K_1$ and $K_2$ are respective equilibrium constant for the two reactions:\n$XeF_6(g) + H_2O(g) \\rightleftharpoons XeOF_4(g) + 2HF(g); K_1$\n$XeO_4(g) + XeF_6(g) \\rightleftharpoons XeOF_4(g) + XeO_3F_2(g); K_2$\nThe equilibrium constant for the reaction\n$XeO_4(g) + 2HF(g) \\rightleftharpoons XeO_3F_2(g) + H_2O(g)$ will be',
    options: [
      '$\\frac{K_1}{K_2}$',
      '$K_1 K_2$',
      '$\\frac{K_2}{K_1}$',
      '$\\frac{K_2}{K_1^2}$'
    ],
    correct_index: 2,
    solution: 'Subtracting reaction (1) from reaction (2):\n$XeO_4(g) + XeF_6(g) - [XeF_6(g) + H_2O(g)] \\rightleftharpoons XeOF_4(g) + XeO_3F_2(g) - [XeOF_4(g) + 2HF(g)]$\nRearranging: $XeO_4(g) + 2HF(g) \\rightleftharpoons XeO_3F_2(g) + H_2O(g)$.\nEquilibrium constant $K = \\frac{K_2}{K_1}$.',
    topic: 'Combining Equilibrium Constants',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 197,
    question_type: 'single_choice',
    question_text: '$\\Delta G^\\circ$ for the reaction $X + Y \\rightleftharpoons Z$ is $-4.606\\text{ kcal}$. The equilibrium constant for the reaction at $227^\\circ\\text{C}$ is nearly',
    options: [
      '100',
      '10',
      '2',
      '0.01'
    ],
    correct_index: 0,
    solution: '$T = 227 + 273 = 500\\text{ K}$.\n$\\Delta G^\\circ = -2.303 RT \\log K \\implies -4606\\text{ cal} = -2.303 \\times 2 \\times 500 \\log K = -2303 \\log K$.\n$\\log K = \\frac{4606}{2303} = 2 \\implies K = 10^2 = 100$.',
    topic: 'Free Energy and Equilibrium Constant',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 198,
    question_type: 'single_choice',
    question_text: 'When the reactants A and B are mixed to give products C and D, the reaction quotient Q at the initial stage of reaction is',
    options: [
      'Zero',
      'Independent of time',
      'Increase with time',
      'Decrease with time'
    ],
    correct_index: 0,
    solution: 'At the start of the reaction before any products are formed, $[C] = 0$ and $[D] = 0$. Since $Q = \\frac{[C][D]}{[A][B]}$, the reaction quotient $Q = 0$ initially.',
    topic: 'Reaction Quotient Definition',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 199,
    question_type: 'single_choice',
    question_text: 'At infinite dilution, the percentage ionisation for both strong and weak electrolytes is',
    options: [
      '$1\\%$',
      '$29\\%$',
      '$50\\%$',
      '$100\\%$'
    ],
    correct_index: 3,
    solution: 'According to Arrhenius theory and Ostwald\'s dilution law, at infinite dilution ($C \\rightarrow 0$), the degree of dissociation $\\alpha \\rightarrow 1$. Therefore, all electrolytes (strong as well as weak) are $100\\%$ ionized at infinite dilution.',
    topic: 'Degree of Ionization at Infinite Dilution',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 200,
    question_type: 'single_choice',
    question_text: 'Which of the following can act both as Bronsted acid and Bronsted base in aqueous solution?',
    options: [
      '$Na_2CO_3$',
      '$OH^-$',
      '$HCO_3^-$',
      '$NH_3$'
    ],
    correct_index: 2,
    solution: 'Bicarbonate ion ($HCO_3^-$) is amphiprotic:\n- As a Bronsted acid: $HCO_3^- + H_2O \\rightleftharpoons H_3O^+ + CO_3^{2-}$\n- As a Bronsted base: $HCO_3^- + H_2O \\rightleftharpoons H_2CO_3 + OH^-$.',
    topic: 'Amphiprotic Ions',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 201,
    question_type: 'single_choice',
    question_text: 'To $Ag_2CrO_4$ solution over its own precipitate $CrO_4^{2-}$ ions are added. This results in',
    options: [
      'Increase in $Ag^+$ concentration',
      'Decrease in $Ag^+$ concentration',
      'Increase in solubility',
      'Increase in solubility product'
    ],
    correct_index: 1,
    solution: 'For the equilibrium $Ag_2CrO_4(s) \\rightleftharpoons 2Ag^+ + CrO_4^{2-}$, adding $CrO_4^{2-}$ increases its concentration. By Le Chatelier\'s principle (common ion effect), the equilibrium shifts backward, causing more precipitate to form and decreasing $[Ag^+]$.',
    topic: 'Common Ion Effect on Solubility',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 202,
    question_type: 'single_choice',
    question_text: 'The $K_{sp}$ of $AgCl$ is $4.0 \\times 10^{-10}$ at $298\\text{ K}$. Its solubility in $0.04\\text{ M } CaCl_2$ will be',
    options: [
      '$2.0 \\times 10^{-5}\\text{ M}$',
      '$1.0 \\times 10^{-8}\\text{ M}$',
      '$5 \\times 10^{-9}\\text{ M}$',
      '$2.2 \\times 10^{-4}\\text{ M}$'
    ],
    correct_index: 2,
    solution: '$CaCl_2$ completely dissociates to provide $[Cl^-] = 2 \\times 0.04 = 0.08\\text{ M} = 8 \\times 10^{-2}\\text{ M}$.\n$K_{sp} = [Ag^+][Cl^-] \\implies 4.0 \\times 10^{-10} = s \\times 0.08$.\n$s = \\frac{4.0 \\times 10^{-10}}{0.08} = 5.0 \\times 10^{-9}\\text{ mol/L}$.',
    topic: 'Solubility in Presence of Common Ion',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 203,
    question_type: 'single_choice',
    question_text: 'A white salt is readily soluble in water and gives a colourless solution with a pH of about 9. The salt would be',
    options: [
      '$NH_4NO_3$',
      '$CH_3COONa$',
      '$CH_3COONH_4$',
      '$CaCO_3$'
    ],
    correct_index: 1,
    solution: 'Sodium acetate ($CH_3COONa$) is a soluble salt of a weak acid ($CH_3COOH$) and a strong base ($NaOH$). It undergoes anionic hydrolysis to produce $OH^-$ ions, giving a mildly basic solution with $\\text{pH} \\approx 9$.',
    topic: 'Salt Hydrolysis and Solution pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 204,
    question_type: 'single_choice',
    question_text: 'When $CO_2$ is dissolved in water following equilibrium is established: $CO_2 + 2H_2O \\rightleftharpoons H_3O^+ + HCO_3^-$ for which equilibrium constant is $3.8 \\times 10^{-7}$ and $\\text{pH} = 6.0$. The ratio $[HCO_3^-] / [CO_2]$ would be',
    options: [
      '$3.8 \\times 10^{-1}$',
      '$3.8 \\times 10^{-13}$',
      '6.0',
      '13.4'
    ],
    correct_index: 0,
    solution: '$\\text{pH} = 6.0 \\implies [H_3O^+] = 10^{-6}\\text{ M}$.\n$K = \\frac{[H_3O^+][HCO_3^-]}{[CO_2]} \\implies \\frac{[HCO_3^-]}{[CO_2]} = \\frac{K}{[H_3O^+]} = \\frac{3.8 \\times 10^{-7}}{10^{-6}} = 3.8 \\times 10^{-1} = 0.38$.',
    topic: 'Equilibrium Concentration Ratio',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 205,
    question_type: 'single_choice',
    question_text: 'The pH of a buffer solution containing equal molar concentration of a weak base and its chloride will be [$K_b\\text{ for weak base} = 2 \\times 10^{-5}$]',
    options: [
      '5',
      '9',
      '4.7',
      '9.3'
    ],
    correct_index: 3,
    solution: 'For equimolar basic buffer: $[\\text{salt}] = [\\text{base}] \\implies \\text{pOH} = \\text{p}K_b$.\n$\\text{p}K_b = -\\log(2 \\times 10^{-5}) = 5 - \\log 2 = 5 - 0.301 = 4.70$.\n$\\text{pH} = 14 - \\text{pOH} = 14 - 4.70 = 9.30$.',
    topic: 'Basic Buffer pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 206,
    question_type: 'single_choice',
    question_text: 'When rain is accompanied by a thunderstorm the collected rain water will have a pH value',
    options: [
      'Slightly lower than that of rain water without thunderstorm',
      'Slightly higher than that when the thunderstorm is not there',
      'Uninfluenced by occurrence of thunderstorm',
      'Depend on the amount of dust in air'
    ],
    correct_index: 0,
    solution: 'During a thunderstorm, electrical discharge provides the high energy required for atmospheric $N_2$ and $O_2$ to react, forming nitric oxide ($NO$) and nitrogen dioxide ($NO_2$). These dissolve in rain droplets to form nitric acid ($HNO_3$), which lowers the pH of the rain water slightly.',
    topic: 'Atmospheric Chemistry and Rain Water pH',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 207,
    question_type: 'single_choice',
    question_text: 'Mass loss of $1.0\\text{ g}$ of the $AgCl$ on repeated washing with $10\\text{ L of water}$ is ($K_{sp}\\text{ of } AgCl = 1.0 \\times 10^{-10}$ and $Ag = 108, Cl = 35.5$)',
    options: [
      '$1.43 \\times 10^{-2}\\text{ g}$',
      '$1.23 \\times 10^{-3}\\text{ g}$',
      '$1 \\times 10^{-4}\\text{ g}$',
      '$1.34 \\times 10^{-5}\\text{ g}$'
    ],
    correct_index: 0,
    solution: 'Solubility of $AgCl$ in water $s = \\sqrt{K_{sp}} = \\sqrt{1.0 \\times 10^{-10}} = 10^{-5}\\text{ mol/L}$.\nMoles of $AgCl$ dissolved in $10\\text{ L} = 10 \\times 10^{-5} = 10^{-4}\\text{ mol}$.\nMolar mass of $AgCl = 108 + 35.5 = 143.5\\text{ g/mol}$.\nMass dissolved $= 10^{-4}\\text{ mol} \\times 143.5\\text{ g/mol} = 1.435 \\times 10^{-2}\\text{ g}$.',
    topic: 'Solubility and Mass Loss',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 208,
    question_type: 'single_choice',
    question_text: 'pH of a solution obtained on mixing $50\\text{ ml of } 0.1\\text{ M } NaCN$ and $50\\text{ ml of } 0.2\\text{ M } HCl$ will be ($\\text{p}K_a\\text{ for } HCN = 9.40$):',
    options: [
      '1.00',
      '9.40',
      '9.10',
      '1.30'
    ],
    correct_index: 3,
    solution: 'Millimoles of $CN^- = 50 \\times 0.1 = 5\\text{ mmol}$.\nMillimoles of $H^+ = 50 \\times 0.2 = 10\\text{ mmol}$.\n$CN^-$ reacts completely with $5\\text{ mmol } H^+$, leaving $10 - 5 = 5\\text{ mmol}$ of unreacted strong acid $HCl$.\nTotal volume $= 50 + 50 = 100\\text{ mL}$.\n$[H^+] = \\frac{5}{100} = 0.05\\text{ M}$.\n$\\text{pH} = -\\log(0.05) = -\\log(5 \\times 10^{-2}) = 2 - \\log 5 = 2 - 0.699 = 1.301 \\approx 1.30$.',
    topic: 'pH of Mixture of Strong Acid and Weak Base Salt',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 209,
    question_type: 'single_choice',
    question_text: 'Equal volume of two solution having $\\text{pH} = 2$ and $\\text{pH} = 10$ are mixed together at $90^\\circ\\text{C}$ then pH of resulting solution [$K_w\\text{ at } 90^\\circ\\text{C} = 10^{-12}$]:',
    options: [
      '$2 + \\log 2$',
      '$10 - \\log 2$',
      '2',
      '6'
    ],
    correct_index: 3,
    solution: 'At $90^\\circ\\text{C}$, $\\text{p}K_w = 12$.\nFor solution 1: $\\text{pH} = 2 \\implies [H^+] = 10^{-2}\\text{ M}$.\nFor solution 2: $\\text{pH} = 10 \\implies \\text{pOH} = 12 - 10 = 2 \\implies [OH^-] = 10^{-2}\\text{ M}$.\nSince equal volumes of solutions containing identical concentrations of $H^+$ and $OH^-$ ($10^{-2}\\text{ M}$) are mixed, they neutralize each other completely to produce neutral water at $90^\\circ\\text{C}$.\nNeutral $\\text{pH} = \\frac{1}{2}\\text{p}K_w = \\frac{12}{2} = 6$.',
    topic: 'Neutralization at Elevated Temperature',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 210,
    question_type: 'single_choice',
    question_text: 'The correct order of increasing solubility of $AgCl$ in:\n$A = \\text{water}$\n$B = 0.1\\text{ M } NaCl$\n$C = 0.1\\text{ M } BaCl_2$\n$D = 0.1\\text{ M } NH_3$',
    options: [
      '$D > A > B > C$',
      '$D > C > B > A$',
      '$B > D > A > C$',
      '$A > D > B > C$'
    ],
    correct_index: 0,
    solution: '- In $NH_3$ (D): $Ag^+$ forms a soluble coordination complex $[Ag(NH_3)_2]^+$, dramatically increasing solubility (maximum).\n- In water (A): no common ion suppression.\n- In $0.1\\text{ M } NaCl$ (B): $[Cl^-] = 0.1\\text{ M}$ common ion suppresses solubility.\n- In $0.1\\text{ M } BaCl_2$ (C): $[Cl^-] = 0.2\\text{ M}$ suppresses solubility even more.\nTherefore, the order of decreasing solubility is $D > A > B > C$.',
    topic: 'Solubility in Different Media',
    difficulty: 'medium',
    marks: 4
  }
];

