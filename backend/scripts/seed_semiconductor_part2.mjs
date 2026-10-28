export const SEMICONDUCTOR_BATCH2_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'When $p-n$ junction diode is forward biased, then',
    options: [
      '(1) The depletion region is reduced and barrier height is increased',
      '(2) The depletion region is widened and barrier height is reduced',
      '(3) Both the depletion region and barrier height are reduced',
      '(4) Both the depletion region and barrier height are increased'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Effect of Forward Bias on $p-n$ Junction:**\n   - In forward bias, the positive terminal of the external battery is connected to the $p$-side and the negative terminal to the $n$-side.\n   - The applied external voltage opposes the built-in potential barrier $V_0$, reducing the effective barrier height to $(V_0 - V)$.\n   - Majority carriers are pushed toward the junction, neutralizing the space charge and decreasing the width of the depletion region.\n\n2. Thus, both the depletion region width and the barrier height are reduced.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The forward biased diode is',
    options: [
      '(1) Anode at $-4\\text{ V}$, cathode at $-3\\text{ V}$',
      '(2) Anode at $+3\\text{ V}$, cathode at $+5\\text{ V}$',
      '(3) Anode at $0\\text{ V}$, cathode at $-2\\text{ V}$',
      '(4) Anode at $-2\\text{ V}$, cathode at $+2\\text{ V}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Condition for Forward Biasing:**\n   A diode is forward biased when the potential of the $p$-type anode ($V_p$) is higher than the potential of the $n$-type cathode ($V_n$):\n   $$V_p > V_n$$\n\n2. **Evaluating the Options:**\n   - (1) $V_p = -4\\text{ V}, V_n = -3\\text{ V} \\implies V_p < V_n$ (Reverse biased)\n   - (2) $V_p = +3\\text{ V}, V_n = +5\\text{ V} \\implies V_p < V_n$ (Reverse biased)\n   - (3) $V_p = 0\\text{ V}, V_n = -2\\text{ V} \\implies 0\\text{ V} > -2\\text{ V}$ (Forward biased)\n   - (4) $V_p = -2\\text{ V}, V_n = +2\\text{ V} \\implies V_p < V_n$ (Reverse biased)\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In the circuit shown, a $10\\text{ V}$ source is connected in series with a $2\\text{ k}\\Omega$ resistor to a junction node. Branch 1 has a $14\\text{ k}\\Omega$ resistor to ground carrying current $I_1$. Branch 2 has an ideal diode (anode at the node) carrying current $I_2$, which feeds into a parallel combination of a $12\\text{ k}\\Omega$ resistor and an ideal diode pointing downwards to ground. Assuming ideal diodes, the currents $I_1$ and $I_2$ are respectively',
    options: [
      '(1) $0, 0$',
      '(2) $5\\text{ mA}, 5\\text{ mA}$',
      '(3) $5\\text{ mA}, 0$',
      '(4) $0, 5\\text{ mA}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **State of the Diodes:**\n   - Current from the $10\\text{ V}$ source forward biases the series diode in Branch 2.\n   - The second diode pointing downwards to ground in parallel with the $12\\text{ k}\\Omega$ resistor is also forward biased.\n   - For ideal forward-biased diodes, resistance is zero, acting as a short circuit to ground.\n\n2. **Current Distribution:**\n   - Because the downstream node is shorted to ground ($0\\text{ V}$), the potential across the $14\\text{ k}\\Omega$ resistor is zero, giving:\n     $$I_1 = 0$$\n   - The entire circuit current passes through the $2\\text{ k}\\Omega$ resistor directly to ground via Branch 2:\n     $$I_2 = \\frac{10\\text{ V}}{2\\text{ k}\\Omega} = 5\\text{ mA}$$\n\nThus, $I_1 = 0$ and $I_2 = 5\\text{ mA}$.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Out of the following $PN$ junction diodes, which one is forward biased?',
    options: [
      '(1) Anode at $-20\\text{ V}$, cathode connected to ground ($0\\text{ V}$)',
      '(2) Anode at $-15\\text{ V}$, cathode at $-20\\text{ V}$',
      '(3) Anode connected to ground ($0\\text{ V}$), cathode connected to ground ($0\\text{ V}$)',
      '(4) Anode at $-10\\text{ V}$, cathode at $-5\\text{ V}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Forward Bias Condition:**\n   $$V_{\\text{anode}} > V_{\\text{cathode}}$$\n\n2. **Checking each case:**\n   - Option (1): $-20\\text{ V} < 0\\text{ V}$ (Reverse biased)\n   - Option (2): $-15\\text{ V} > -20\\text{ V}$ (Forward biased)\n   - Option (3): $0\\text{ V} = 0\\text{ V}$ (Unbiased)\n   - Option (4): $-10\\text{ V} < -5\\text{ V}$ (Reverse biased)\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In the circuit below, $V_s = 10\\text{ V}$, $R_3 = 5\\text{ k}\\Omega$, $R_2 = 5\\text{ k}\\Omega$, and $R_1 = 10\\text{ k}\\Omega$. An ideal diode is connected in parallel with $R_1$ with its anode at the top and cathode at the bottom, and a return diode is in series with the battery. Assuming the diodes to be ideal, find the current flowing through $R_1$.',
    options: [
      '(1) Zero',
      '(2) $0.5\\text{ mA}$',
      '(3) $1\\text{ mA}$',
      '(4) $2\\text{ mA}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Analysis of Diode in Parallel with $R_1$:**\n   - Current flowing down through $R_2$ encounters the parallel combination of $R_1$ and the downward-pointing ideal diode.\n   - The diode is forward biased, offering zero resistance ($0\\text{ }\\Omega$).\n   - Consequently, it acts as a short circuit across $R_1$, so the voltage drop across $R_1$ is zero.\n\n2. **Current through $R_1$:**\n   $$I_{R_1} = \\frac{0\\text{ V}}{R_1} = 0\\text{ (Zero)}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two identical $p-n$ junction diodes are connected in series with a battery in 3 ways: (i) back-to-back ($p-n$ and $n-p$), (ii) forward-forward ($p-n$ and $p-n$), (iii) reverse-reverse ($n-p$ and $n-p$). The potential difference across the two $p-n$ junctions are equal in',
    options: [
      '(1) (i) and (ii)',
      '(2) (ii) and (iii)',
      '(3) (i) and (iii)',
      '(4) (i) only'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Analysis of Circuit (i):**\n   One diode is forward biased while the other is reverse biased. The reverse-biased diode has vastly higher resistance and drops almost the entire battery voltage, so potentials across the two diodes are not equal.\n\n2. **Analysis of Circuits (ii) and (iii):**\n   - In circuit (ii), both identical diodes are in the same forward orientation; carrying equal current, they have equal forward voltage drops.\n   - In circuit (iii), both identical diodes are in the same reverse orientation; having equal reverse resistance, they divide the voltage equally.\n\n3. Hence, the potential difference across the two diodes is equal in (ii) and (iii).\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The current through an ideal $p-n$ junction connected with its $p$-side at $+1\\text{ V}$ and its $n$-side connected through a $100\\text{ }\\Omega$ resistor to $-2\\text{ V}$ will be',
    options: [
      '(1) Zero',
      '(2) $1\\text{ mA}$',
      '(3) $10\\text{ mA}$',
      '(4) $30\\text{ mA}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Diode State:**\n   $$V_p = +1\\text{ V}, \\quad V_n = -2\\text{ V}$$\n   Since $V_p > V_n$, the ideal diode is forward biased with zero forward resistance.\n\n2. **Current Calculation:**\n   $$\\Delta V = 1\\text{ V} - (-2\\text{ V}) = 3\\text{ V}$$\n   $$I = \\frac{\\Delta V}{R} = \\frac{3\\text{ V}}{100\\text{ }\\Omega} = 0.03\\text{ A} = 30\\text{ mA}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In case of a $p-n$ junction diode at high value of reverse bias, current rises sharply. The value of reverse bias is called',
    options: [
      '(1) Cut off voltage',
      '(2) Inverse voltage',
      '(3) Junction zener voltage',
      '(4) Critical voltage'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Reverse Breakdown:**\n   When the reverse bias across a $p-n$ junction is increased to a critical threshold, electrical breakdown occurs (either through Zener effect in heavily doped diodes or Avalanche effect in lightly doped diodes), causing the reverse current to increase abruptly.\n2. This characteristic voltage is known as the **breakdown voltage** or **junction zener voltage** ($V_Z$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'What is the reading of ideal ammeters $A_1$ and $A_2$ connected in the given circuit diagram? The circuit has an $18\\text{ V}$ battery in series with a $3\\text{ }\\Omega$ resistor, connected across two parallel branches: Branch 1 with a $5\\text{ }\\Omega$ resistor, ammeter $A_1$, and diode $D_1$ pointing left; Branch 2 with diode $D_2$ pointing right, a $6\\text{ }\\Omega$ resistor, and ammeter $A_2$.',
    options: [
      '(1) $2\\text{ A}$ and zero',
      '(2) $3\\text{ A}$ and $2\\text{ A}$',
      '(3) $2\\text{ A}$ and $3\\text{ A}$',
      '(4) Zero and $2\\text{ A}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Diode States:**\n   - Current leaves the positive terminal on the left and travels toward the parallel branches from left to right.\n   - In Branch 1, diode $D_1$ points left (cathode towards the left), so it is reverse biased and acts as an open circuit $\\implies$ Reading of $A_1 = 0$.\n   - In Branch 2, diode $D_2$ points right (anode towards the left), so it is forward biased with zero resistance.\n\n2. **Current in Branch 2 ($A_2$):**\n   $$R_{\\text{total}} = 3\\text{ }\\Omega + 6\\text{ }\\Omega = 9\\text{ }\\Omega$$\n   $$I = \\frac{18\\text{ V}}{9\\text{ }\\Omega} = 2\\text{ A}$$\n   Reading of $A_2 = 2\\text{ A}$.\n\nThus, $A_1 = \\text{Zero}$ and $A_2 = 2\\text{ A}$.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If in a reverse biased $p-n$ junction, increase in carrier concentration takes place due to creation of new hole-electron pairs by light of wavelength less than or equal to $620\\text{ nm}$, then the band gap is',
    options: [
      '(1) $1\\text{ eV}$',
      '(2) $2\\text{ eV}$',
      '(3) $20\\text{ eV}$',
      '(4) $0.2\\text{ eV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Band Gap Energy Formula:**\n   $$E_g = \\frac{hc}{\\lambda_{\\text{max}}}$$\n\n2. **Calculation:**\n   Using $hc \\approx 1240\\text{ eV}\\cdot\\text{nm}$:\n   $$E_g = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{620\\text{ nm}} = 2\\text{ eV}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Five ideal diodes and three resistors are connected in three parallel branches across a cell of emf $1.5\\text{ V}$ and internal resistance $0.1\\text{ }\\Omega$. Top branch has $0.8\\text{ }\\Omega$ with diode $D_1$ pointing left; middle branch has diode $D_2$ pointing right, $0.4\\text{ }\\Omega$, and diode $D_3$ pointing right; bottom branch has diode $D_4$ pointing left, $0.2\\text{ }\\Omega$, and diode $D_5$ pointing right. The current drawn from the cell is',
    options: [
      '(1) $3\\text{ A}$',
      '(2) $0.3\\text{ A}$',
      '(3) $5\\text{ A}$',
      '(4) $0.5\\text{ A}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **State of Each Branch:**\n   - Current enters the three branches from the left.\n   - Top branch has diode $D_1$ pointing left (cathode on left) $\\implies$ Reverse biased (open circuit).\n   - Middle branch has diodes $D_2$ and $D_3$ both pointing right (anode on left) $\\implies$ Forward biased, conducting through the $0.4\\text{ }\\Omega$ resistor.\n   - Bottom branch has diode $D_4$ pointing left $\\implies$ Reverse biased (open circuit).\n\n2. **Current Drawn from Cell:**\n   $$R_{\\text{total}} = R_{\\text{middle}} + r = 0.4\\text{ }\\Omega + 0.1\\text{ }\\Omega = 0.5\\text{ }\\Omega$$\n   $$I = \\frac{E}{R_{\\text{total}}} = \\frac{1.5\\text{ V}}{0.5\\text{ }\\Omega} = 3\\text{ A}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'What is the equivalent resistance across the terminals of the battery in the circuit shown, if the diodes are ideal? A central branch contains a $10\\text{ }\\Omega$ resistor in series with a battery ($+$ on left, $-$ on right). Across this are two parallel branches: a top branch with an ideal diode pointing right in series with $10\\text{ }\\Omega$, and a bottom branch with an ideal diode pointing left in series with $10\\text{ }\\Omega$.',
    options: [
      '(1) $10\\text{ }\\Omega$',
      '(2) $20\\text{ }\\Omega$',
      '(3) $15\\text{ }\\Omega$',
      '(4) $\\frac{10}{3}\\text{ }\\Omega$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Circuit Operation:**\n   - Current flows out of the positive terminal on the left toward the left node.\n   - Top diode points right (anode on left), so it is forward biased ($0\\text{ }\\Omega$), conducting through the top $10\\text{ }\\Omega$ resistor.\n   - Bottom diode points left (cathode on left), so it is reverse biased (open circuit).\n\n2. **Total Equivalent Resistance:**\n   $$R_{\\text{eq}} = R_{\\text{central}} + R_{\\text{top}} = 10\\text{ }\\Omega + 10\\text{ }\\Omega = 20\\text{ }\\Omega$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If $p-n$ junction is reverse biased, then\n(1) Diffusion current decreases\n(2) Drift current almost remains unchanged\n(3) Net current within diode flows from $n$-side to $p$-side\n(4) All of the above are correct',
    options: [
      '(1) Diffusion current decreases',
      '(2) Drift current almost remains unchanged',
      '(3) Net current within diode flows from $n$-side to $p$-side',
      '(4) All of the above are correct'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Effects of Reverse Bias on $p-n$ Junction:**\n   - Barrier height increases, preventing majority carriers from surmounting the junction, so diffusion current decreases drastically to nearly zero (Statement 1 is true).\n   - Drift current depends only on thermal generation of minority carriers, which is independent of the applied voltage (Statement 2 is true).\n   - The net reverse current consists of minority carrier drift flowing from the $n$-side to the $p$-side (Statement 3 is true).\n\n2. Hence, all statements are correct.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'What is the potential difference across the $15\\text{ }\\Omega$ resistor in a circuit where the resistor is connected between ground and the anode of an ideal diode, and the cathode of the diode is connected to a $+10\\text{ V}$ potential, with a $+5\\text{ V}$ source in the resistor branch?',
    options: [
      '(1) $15\\text{ V}$',
      '(2) $10\\text{ V}$',
      '(3) $5\\text{ V}$',
      '(4) Zero'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Diode Biasing:**\n   - Potential at anode: $V_{\\text{anode}} = +5\\text{ V}$\n   - Potential at cathode: $V_{\\text{cathode}} = +10\\text{ V}$\n   - Since $V_{\\text{anode}} < V_{\\text{cathode}}$, the diode is reverse biased.\n\n2. **Current and Voltage Drop:**\n   - An ideal reverse-biased diode acts as an open circuit ($I = 0$).\n   - With zero current flowing through the circuit, the potential difference across the $15\\text{ }\\Omega$ resistor is:\n     $$V_R = I \\cdot R = 0 \\times 15\\text{ }\\Omega = 0\\text{ (Zero)}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Assuming the diodes have forward resistance zero, the current $I$ in a circuit having a battery $E = 20\\text{ V}$ connected in series with a $2\\text{ k}\\Omega$ resistor and a parallel branch of two opposite diodes connected to ground is',
    options: [
      '(1) Zero',
      '(2) $9.65\\text{ mA}$',
      '(3) $10\\text{ mA}$',
      '(4) $10.35\\text{ mA}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Diode Operation:**\n   - Of the two parallel opposite diodes, the diode pointing in the direction of current (anode toward the battery side, cathode to ground) is forward biased with $0\\text{ }\\Omega$ resistance.\n   - The reverse-oriented diode acts as an open circuit.\n\n2. **Current Calculation:**\n   $$I = \\frac{E}{R} = \\frac{20\\text{ V}}{2\\text{ k}\\Omega} = 10\\text{ mA}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two ideal diodes are connected with a battery as shown. A battery $E$ supplies current through a $6\\text{ }\\Omega$ series resistor into two parallel branches: one branch has a $9\\text{ }\\Omega$ resistor in series with a diode pointing in the forward direction, and the other branch has a diode pointing in the reverse direction in series with a $9\\text{ }\\Omega$ resistor. If a $5\\text{ A}$ current is drawn from the battery, then the value of emf $E$ of the battery is',
    options: [
      '(1) $45\\text{ V}$',
      '(2) $75\\text{ V}$',
      '(3) $25\\text{ V}$',
      '(4) $15\\text{ V}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Diode States:**\n   - The forward-oriented diode conducts with zero resistance ($R_1 = 9\\text{ }\\Omega$).\n   - The reverse-oriented diode is reverse biased and draws no current (open circuit).\n\n2. **Total Resistance and EMF:**\n   $$R_{\\text{total}} = 6\\text{ }\\Omega + 9\\text{ }\\Omega = 15\\text{ }\\Omega$$\n   $$E = I \\cdot R_{\\text{total}} = 5\\text{ A} \\times 15\\text{ }\\Omega = 75\\text{ V}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two ideal diodes are used in the circuit shown across an emf source $E$. Branch 1 has $R_1$ in series with a diode pointing right. Branch 2 has $R_2$ in series with a diode pointing left. If the voltage drop across $R_1$ is $1.3\\text{ V}$, and that across $R_2$ is $V$, then',
    options: [
      '(1) $E = 2\\text{ V}, V = 1.3\\text{ V}$',
      '(2) $E = 1.3\\text{ V}, V = 0$',
      '(3) $E = 2\\text{ V}, V = 0$',
      '(4) $E = 2.3\\text{ V}, V = 1.7\\text{ V}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Analysis of Branch 1:**\n   - Since there is a voltage drop of $1.3\\text{ V}$ across $R_1$, current is flowing through Branch 1, so its diode is forward biased ($0\\text{ V}$ drop).\n   - This implies the left rail is positive and the right rail is negative, so $E = V_{R_1} = 1.3\\text{ V}$.\n\n2. **Analysis of Branch 2:**\n   - The diode in Branch 2 points left, meaning its cathode is at the positive left rail and its anode is at the negative right rail.\n   - Hence, this diode is reverse biased and blocks current (open circuit).\n   - Therefore, no current flows through $R_2$, giving $V = 0$.\n\nThus, $E = 1.3\\text{ V}$ and $V = 0$.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Current in the circuit shown will be (if diodes are ideal): A $10\\text{ V}$ battery is in series with a $20\\text{ }\\Omega$ resistor. Two parallel branches are connected: Branch 1 with an ideal diode pointing right in series with a $20\\text{ }\\Omega$ resistor; Branch 2 with an ideal diode pointing left in series with a $30\\text{ }\\Omega$ resistor.',
    options: [
      '(1) $\\frac{1}{4}\\text{ A}$',
      '(2) $\\frac{1}{5}\\text{ A}$',
      '(3) $\\frac{25}{8}\\text{ A}$',
      '(4) $\\frac{2}{5}\\text{ A}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **State of the Parallel Branches:**\n   - With current flowing left-to-right across the upper branches, the diode in Branch 1 (pointing right) is forward biased.\n   - The diode in Branch 2 (pointing left) is reverse biased and does not conduct.\n\n2. **Total Resistance and Current:**\n   $$R_{\\text{total}} = 20\\text{ }\\Omega\\text{ (branch 1)} + 20\\text{ }\\Omega\\text{ (series)} = 40\\text{ }\\Omega$$\n   $$I = \\frac{10\\text{ V}}{40\\text{ }\\Omega} = \\frac{1}{4}\\text{ A}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The drift current in a $p-n$ junction is',
    options: [
      '(1) Directly proportional to the bias voltage',
      '(2) Inversely proportional to the bias voltage',
      '(3) Nearly independent of the bias voltage',
      '(4) Directly proportional to the square of bias voltage'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Origin of Drift Current:**\n   - Drift current is due to minority charge carriers generated thermally near the depletion region.\n   - The built-in electric field sweeps all these minority carriers across the junction regardless of the applied reverse bias.\n   - Hence, drift current is limited by thermal generation rate and is nearly independent of the applied bias voltage.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In which of the following condition, diffusion current in $p-n$ junction is more than drift current?',
    options: [
      '(1) Forward biasing',
      '(2) Reverse biasing',
      '(3) No biasing',
      '(4) All of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Comparison of Diffusion and Drift Currents:**\n   - At zero bias (equilibrium), diffusion current equals drift current ($I_{\\text{diff}} = I_{\\text{drift}}$).\n   - Under reverse bias, the barrier height increases, heavily suppressing diffusion ($I_{\\text{diff}} < I_{\\text{drift}}$).\n   - Under forward bias, the barrier height is reduced, allowing a large majority carrier diffusion current to cross the junction ($I_{\\text{diff}} > I_{\\text{drift}}$).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  }
];
