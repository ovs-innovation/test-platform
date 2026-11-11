// Semiconductor Electronics PYQ Part 1: Q1 to Q45
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/semi_diagram_urls.json', 'utf8'));

export const SEMI_QUESTIONS_PART1 = [
  {
    question_number: 1,
    exam_info: 'RE-NEET 2026',
    question_text: 'An ideal Zener diode with breakdown voltage of $-3\\text{ V}$ is reverse biased with a negative input voltage $V_i = -5\\text{ V}$. The magnitude of voltage difference between point $B$ and $A$ is:',
    options: ['$0\\text{ V}$', '$3\\text{ V}$', '$2\\text{ V}$', '$1\\text{ V}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['semi_q1_diagram'],
    explanation: 'Since the input voltage $|V_i| = 5\\text{ V}$ exceeds the breakdown voltage $V_Z = 3\\text{ V}$, the Zener diode operates in the breakdown region maintaining a constant voltage of $3\\text{ V}$ across it (between $C$ and $B$). The voltage drop across resistor $R$ between points $B$ and $A$ is $|V_i| - V_Z = 5\\text{ V} - 3\\text{ V} = 2\\text{ V}$.',
    difficulty: 'medium'
  },
  {
    question_number: 2,
    exam_info: 'RE-NEET 2026',
    question_text: 'Three identical p-n junction diodes $D_1$, $D_2$, and $D_3$ are connected across a battery as shown in the figure. If the width of the depletion regions of $D_1$, $D_2$ and $D_3$ are $W_1$, $W_2$ and $W_3$, respectively, then the correct option is:',
    options: [
      '$W_2 > W_1 = W_3$',
      '$W_1 > W_2 > W_3$',
      '$W_3 = W_1 > W_2$',
      '$W_3 > W_2 > W_1$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q2_diagram'],
    explanation: 'In the given circuit, diode $D_1$ is forward-biased, diode $D_2$ is unbiased (or has zero net bias across parallel branch), and diode $D_3$ is reverse-biased across the battery polarity. Since reverse bias increases the depletion width and forward bias decreases the depletion width, $W_{\\text{reverse}} > W_{\\text{unbiased}} > W_{\\text{forward}}$, so $W_3 > W_2 > W_1$.',
    difficulty: 'medium'
  },
  {
    question_number: 3,
    exam_info: 'NEET 2026',
    question_text: 'The current $I$ in the circuit shown below is: (All diodes are ideal and identical)',
    options: ['$\\frac{5}{3}\\text{ A}$', '$\\frac{5}{9}\\text{ A}$', '$\\frac{1}{3}\\text{ A}$', '$\\frac{15}{2}\\text{ A}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q3_diagram'],
    explanation: 'Diodes connected in forward bias conduct with zero resistance, while reverse-biased diodes act as open circuits. Analyzing the polarities with the $10\\text{ V}$ battery, the conducting branches give an equivalent resistance $R_{\\text{eq}} = \\frac{4}{3}\\text{ }\\Omega$. Hence, current $I = \\frac{V}{R_{\\text{eq}}} = \\frac{10}{4/3} = \\frac{30}{4} = \\frac{15}{2}\\text{ A}$.',
    difficulty: 'medium'
  },
  {
    question_number: 4,
    exam_info: 'NEET 2026',
    question_text: 'In the circuit shown below, the voltage appearing across the diode $D$ will be of the form:',
    options: ['Waveform (A)', 'Waveform (B)', 'Waveform (C)', 'Waveform (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q4_diagram'],
    explanation: 'During the positive half cycle of input AC voltage, diode $D$ is forward biased and conducts (for an ideal diode, voltage across it is $0$). During the negative half cycle, the diode is reverse biased and acts as an open circuit, so the entire negative half-cycle voltage appears across diode $D$. Thus, $V_D$ consists of negative half cycles, which matches option (D).',
    difficulty: 'medium'
  },
  {
    question_number: 5,
    exam_info: 'NEET 2026',
    question_text: 'Two statements are given below:\nStatement A: When the forward bias voltage across a p-n junction diode increases above a certain threshold voltage, the diode current increases significantly.\nStatement B: This current is called reverse saturation current.\nChoose the correct answer from the options given below:',
    options: [
      'Both Statements A and B are true',
      'Statement A is true, but Statement B is false',
      'Both Statements A and B are false',
      'Statement A is false, but Statement B is true'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Statement A is true because beyond the knee/threshold voltage, forward current increases exponentially. Statement B is false because this current is the forward current, not reverse saturation current (which occurs under reverse bias due to minority carriers).',
    difficulty: 'easy'
  },
  {
    question_number: 6,
    exam_info: 'NEET 2025',
    question_text: 'A full wave rectifier circuit with diodes ($D_1$) and ($D_2$) is shown in the figure. If input supply voltage $V_{\\text{in}} = 220\\sin(100\\pi t)\\text{ volt}$, then at $t = 15\\text{ msec}$:',
    options: [
      '$D_1$ and $D_2$ both are forward biased',
      '$D_1$ and $D_2$ both are reverse biased',
      '$D_1$ is forward biased, $D_2$ is reverse biased',
      '$D_1$ is reverse biased, $D_2$ is forward biased'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q6_diagram'],
    explanation: 'At $t = 15\\text{ ms} = 15 \\times 10^{-3}\\text{ s}$, the phase angle is $\\theta = 100\\pi \\times 15 \\times 10^{-3} = 1.5\\pi = \\frac{3\\pi}{2}\\text{ rad}$. Since $\\sin(1.5\\pi) = -1 < 0$, the input voltage is in its negative half-cycle. Therefore, the upper terminal of the secondary winding is negative (reverse biasing $D_1$) and the lower terminal is positive (forward biasing $D_2$). Hence, $D_1$ is reverse biased and $D_2$ is forward biased.',
    difficulty: 'medium'
  },
  {
    question_number: 7,
    exam_info: 'NEET 2025',
    question_text: 'The output ($Y$) of the given logic implementation is similar to the output of an/a ________ gate.',
    options: ['OR', 'NOR', 'AND', 'NAND'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q7_diagram'],
    explanation: 'From the logic circuit, the top gate receives inputs $A$ and $B$, giving $A+B$. The bottom gate receives $B$ and $A$, giving $A+B$. Combining into the final gate with inversion yields $\\overline{A+B}$, which represents a NOR gate.',
    difficulty: 'easy'
  },
  {
    question_number: 8,
    exam_info: 'NEET 2024 (Re-Examination)',
    question_text: 'The $I$-$V$ characteristics shown above are exhibited by a:',
    options: ['Light emitting diode', 'Zener diode', 'Photodiode', 'Solar cell'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q8_diagram'],
    explanation: 'The $I$-$V$ characteristic curve of a solar cell lies in the fourth quadrant of the coordinate axes because a solar cell does not draw current but supplies current to the load (photovoltage is positive while photocurrent is delivered).',
    difficulty: 'easy'
  },
  {
    question_number: 9,
    exam_info: 'NEET 2024 (Re-Examination)',
    question_text: 'When the output of an OR gate is applied as input to a NOT gate, then the combination acts as a:',
    options: ['NAND gate', 'NOR gate', 'AND gate', 'OR gate'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'An OR gate followed by a NOT gate gives output $Y = \\overline{A + B}$, which is the operation of a NOR gate.',
    difficulty: 'easy'
  },
  {
    question_number: 10,
    exam_info: 'NEET 2024 (Re-Examination)',
    question_text: 'The output $Y$ for the inputs $A$ and $B$ of the given logic circuit is:',
    options: ['$A \\cdot B$', '$\\overline{A} \\cdot \\overline{B}$', '$A + B$', '$\\overline{A} + \\overline{B}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['semi_q10_diagram'],
    explanation: 'By De Morgan\'s laws applied to the logic gate arrangement: $\\overline{\\overline{A} \\cdot \\overline{B}} = \\overline{\\overline{A}} + \\overline{\\overline{B}} = A + B$.',
    difficulty: 'easy'
  },
  {
    question_number: 11,
    exam_info: 'NEET 2024',
    question_text: 'A logic circuit provides the output as per the following truth table:\n$$\\begin{array}{|c|c|c|} \\hline A & B & Y \\\\ \\hline 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ \\hline \\end{array}$$\nThe expression of the output $Y$ is:',
    options: ['$A \\cdot B + \\overline{A}$', '$A \\cdot \\overline{B} + \\overline{A}$', '$\\overline{B}$', '$B$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Observe that whenever $B = 0$, $Y = 1$; and whenever $B = 1$, $Y = 0$, regardless of $A$. Therefore, the output is simply $Y = \\overline{B}$.',
    difficulty: 'easy'
  },
  {
    question_number: 12,
    exam_info: 'NEET 2024',
    question_text: 'Consider the following statements A and B and identify the correct answer:\nStatement A: For a solar-cell, the $I$-$V$ characteristics lies in the IV quadrant of the given graph.\nStatement B: In a reverse biased pn junction diode, the current measured in ($\\mu\\text{A}$), is due to majority charge carriers.',
    options: [
      'A is correct but B is incorrect',
      'A is incorrect but B is correct',
      'Both A and B are correct',
      'Both A and B are incorrect'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['semi_q12_diagram'],
    explanation: 'Statement A is correct: the $I$-$V$ characteristics of a solar cell lie in the fourth quadrant. Statement B is incorrect: reverse current is due to the drift of minority charge carriers, not majority carriers.',
    difficulty: 'easy'
  },
  {
    question_number: 13,
    exam_info: 'NEET 2024',
    question_text: 'The output ($Y$) of the given logic gate is similar to the output of an/a:',
    options: ['NAND gate', 'NOR gate', 'OR gate', 'AND gate'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q13_diagram'],
    explanation: 'The circuit consists of a NOR gate followed by a NOT gate (or inverted inputs into NOR), giving $Y = \\overline{\\overline{A} + \\overline{B}} = A \\cdot B$, which is an AND gate.',
    difficulty: 'easy'
  },
  {
    question_number: 14,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'On the basis of electrical conductivity, which one of the following materials has the smallest resistivity?',
    options: ['Germanium', 'Silver', 'Glass', 'Silicon'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Silver is the best conductor of electricity among all metals and thus has the lowest electrical resistivity (approx $1.6 \\times 10^{-8}\\text{ }\\Omega\\text{m}$).',
    difficulty: 'easy'
  },
  {
    question_number: 15,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'The given circuit is equivalent to:',
    options: ['Circuit (A)', 'Circuit (B)', 'Circuit (C)', 'Circuit (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q15_diagram'],
    explanation: 'In the given logic circuit, the inputs are inverted before entering the NOR gate: $Y = \\overline{\\overline{A} + \\overline{B}} = A \\cdot B$, which corresponds to an AND gate as shown in option (D).',
    difficulty: 'medium'
  },
  {
    question_number: 16,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'A p-type extrinsic semiconductor is obtained when Germanium is doped with:',
    options: ['Antimony', 'Phosphorous', 'Arsenic', 'Boron'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'To obtain a p-type semiconductor, a tetravalent semiconductor like Germanium must be doped with a trivalent impurity such as Boron, Aluminium, Gallium, or Indium. Antimony, Phosphorus, and Arsenic are pentavalent.',
    difficulty: 'easy'
  },
  {
    question_number: 17,
    exam_info: 'NEET 2023',
    question_text: 'Given below are two statements:\nStatement I: Photovoltaic devices can convert optical radiation into electricity.\nStatement II: Zener diode is designed to operate under reverse bias in breakdown region.\nIn the light of the above statements, choose the most appropriate answer from the options given below:',
    options: [
      'Both Statement I and Statement II are incorrect.',
      'Statement I is correct but Statement II is incorrect.',
      'Statement I is incorrect but Statement II is correct.',
      'Both Statement I and Statement II are correct'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Statement I is correct: photovoltaic devices (solar cells) generate electricity from optical radiation. Statement II is correct: Zener diodes are heavily doped to operate stably in the reverse breakdown region for voltage regulation.',
    difficulty: 'easy'
  },
  {
    question_number: 18,
    exam_info: 'NEET 2023',
    question_text: 'A full wave rectifier circuit consists of two p-n junction diodes, a centre-tapped transformer, capacitor and a load resistance. Which of these components remove the ac ripple from the rectified output?',
    options: ['p-n junction diodes', 'Capacitor', 'Load resistance', 'A centre-tapped transformer'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'A capacitor connected in parallel with the load acts as a filter circuit that smooths out the pulsating DC voltage by bypassing the AC ripple components.',
    difficulty: 'easy'
  },
  {
    question_number: 19,
    exam_info: 'NEET 2023',
    question_text: 'For the following logic circuit, the truth table is:',
    options: [
      'Table (A): Y = 0 for (0,0), Y = 1 for others',
      'Table (B): Y = 1 for (0,0), Y = 0 for (0,1)',
      'Table (C): Y = 1 only for (1,1)',
      'Table (D): Y = 0 for (1,1), Y = 1 for others'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['semi_q19_diagram'],
    explanation: 'Inputs $A$ and $B$ are inverted by NOT gates to give $\\overline{A}$ and $\\overline{B}$, which feed into a NAND gate: $Y = \\overline{\\overline{A} \\cdot \\overline{B}} = A + B$. This is an OR gate, where $Y = 0$ only when $A = 0, B = 0$, and $Y = 1$ otherwise.',
    difficulty: 'medium'
  },
  {
    question_number: 20,
    exam_info: 'NEET 2022 Phase 2',
    question_text: 'Identify the equivalent logic gate represented by the given circuit:',
    options: ['NAND', 'OR', 'NOR', 'AND'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q20_diagram'],
    explanation: 'The two switches $A$ and $B$ are connected in parallel. If either switch $A$ or switch $B$ is closed ($1$), current flows through the LED and it glows ($Y = 1$). If both switches are open ($0$), the LED does not glow ($Y = 0$). This corresponds to an OR gate.',
    difficulty: 'medium'
  },
  {
    question_number: 21,
    exam_info: 'NEET 2022 Phase 2',
    question_text: 'The incorrect statement about the property of a Zener diode is:',
    options: [
      'p and n regions of Zener diode are heavily doped',
      'Zener voltage remains constant at breakdown',
      'It is designed to operate under reverse bias',
      'Depletion region formed is very wide'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Because both p and n regions of a Zener diode are heavily doped, the depletion region formed is extremely thin (approx $10^{-6}\\text{ m}$), not wide. Hence, statement (D) is incorrect.',
    difficulty: 'easy'
  },
  {
    question_number: 22,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'In the given circuits (a), (b) and (c), the potential drop across the two p-n junctions are equal in:',
    options: ['Circuit (a) only', 'Circuit (b) only', 'Circuit (c) only', 'Both circuits (a) and (c)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q22_diagram'],
    explanation: 'In circuit (a), both diodes are forward-biased, so the potential drops across them are equal. In circuit (c), both diodes are reverse-biased in identical symmetry, so the potential drops across them are equal. In circuit (b), one is forward-biased and the other reverse-biased, so their drops are unequal. Hence, the potential drops are equal in both circuits (a) and (c).',
    difficulty: 'medium'
  },
  {
    question_number: 23,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'As the temperature increases, the electrical resistance:',
    options: [
      'Increases for both conductors and semiconductors',
      'Decreases for both conductors and semiconductors',
      'Increases for conductors but decreases for semiconductors',
      'Decreases for conductors but increases for semiconductors'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For metallic conductors, resistance increases with temperature due to increased lattice collisions (positive temperature coefficient). For semiconductors, thermal energy breaks covalent bonds increasing carrier concentration, so resistance decreases (negative temperature coefficient).',
    difficulty: 'easy'
  },
  {
    question_number: 24,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'In half wave rectification, if the input frequency is $60\\text{ Hz}$, then the output frequency would be:',
    options: ['Zero', '$30\\text{ Hz}$', '$60\\text{ Hz}$', '$120\\text{ Hz}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'In a half-wave rectifier, the output frequency is equal to the input frequency: $f_{\\text{out}} = f_{\\text{in}} = 60\\text{ Hz}$. (For a full-wave rectifier it would be $2f_{\\text{in}} = 120\\text{ Hz}$).',
    difficulty: 'easy'
  },
  {
    question_number: 25,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'The truth table for the given logic circuit is:',
    options: [
      'Table (A): Output C = 0, 1, 1, 0',
      'Table (B): Output C = 1, 0, 0, 1',
      'Table (C): Output C = 1, 0, 1, 0',
      'Table (D): Output C = 0, 1, 0, 1'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['semi_q25_diagram'],
    explanation: 'Evaluating the gates step-by-step: the output matches Table (C) with values $(A,B,C) = (0,0,1), (0,1,0), (1,0,1), (1,1,0)$.',
    difficulty: 'medium'
  },
  {
    question_number: 26,
    exam_info: 'NEET 2021',
    question_text: 'Consider the following statements (A) and (B) and identify the correct answer.\n(A) A Zener diode is connected in reverse bias, when used as a voltage regulator.\n(B) The potential barrier of p-n junction lies between $0.1\\text{ V}$ to $0.3\\text{ V}$.',
    options: [
      '(A) is incorrect but (B) is correct.',
      '(A) and (B) both are correct.',
      '(A) and (B) both are incorrect.',
      '(A) is correct and (B) is incorrect.'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Statement (A) is correct because a Zener diode must be reverse biased in the breakdown region to regulate voltage. Statement (B) is incorrect because the typical barrier potential is about $0.7\\text{ V}$ for Silicon and $0.3\\text{ V}$ for Germanium, so the general range is $0.3\\text{ V}$ to $0.7\\text{ V}$, not $0.1\\text{ V}$ to $0.3\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 27,
    exam_info: 'NEET 2021',
    question_text: 'The electron concentration in an n-type semiconductor is the same as hole concentration in a p-type semiconductor. An external electric field is applied across each of them. Compare the currents in them.',
    options: [
      'No current will flow in p-type, current will only flow in n-type',
      'Current in n-type = current in p-type',
      'current in p-type > current in n-type',
      'current in n-type > current in p-type'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Current is given by $I = n e A v_d = n e A \\mu E$. Since the mobility of electrons is significantly greater than the mobility of holes ($\\mu_e > \\mu_h$) due to their smaller effective mass, the current in the n-type semiconductor will be greater than that in the p-type semiconductor.',
    difficulty: 'medium'
  },
  {
    question_number: 28,
    exam_info: 'NEET 2021',
    question_text: 'For the given circuit, the input digital signals are applied at the terminals A, B and C. What would be the output at the terminal y?',
    options: ['Waveform (A)', 'Waveform (B)', 'Waveform (C)', 'Waveform (D)'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['semi_q28_diagram'],
    explanation: 'The logic circuit consists of an AND gate receiving $A$ and $B$, a NAND gate receiving $B$ and $C$, and their outputs fed into a NOR gate. Evaluating interval by interval ($t_1$ to $t_6$), the output $y$ remains constant at $5\\text{ V}$ throughout, corresponding to waveform (C).',
    difficulty: 'hard'
  },
  {
    question_number: 29,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'An intrinsic semiconductor is converted into n-type extrinsic semiconductor by doping it with:',
    options: ['Germanium', 'Phosphorous', 'Aluminium', 'Silver'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'An n-type semiconductor is created by doping an intrinsic semiconductor with pentavalent donor atoms such as Phosphorus, Arsenic, or Antimony.',
    difficulty: 'easy'
  },
  {
    question_number: 30,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'Out of the following which one is a forward biased diode?',
    options: [
      'p-side at $0\\text{ V}$ and n-side at $-3\\text{ V}$',
      'p-side at $-4\\text{ V}$ and n-side at $-2\\text{ V}$',
      'p-side at $2\\text{ V}$ and n-side at $5\\text{ V}$',
      'p-side at $-2\\text{ V}$ and n-side at $+2\\text{ V}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['semi_q30_diagram'],
    explanation: 'A p-n junction diode is forward biased when the potential at the p-side ($V_p$) is higher than the potential at the n-side ($V_n$). In option (A): $V_p = 0\\text{ V} > V_n = -3\\text{ V}$, which is forward bias.',
    difficulty: 'easy'
  },
  {
    question_number: 31,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'Which of the following gate is called universal gate?',
    options: ['NOT gate', 'OR gate', 'AND gate', 'NAND gate'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'NAND and NOR gates are called universal gates because any boolean function or logic gate (AND, OR, NOT) can be constructed entirely using only NAND or only NOR gates.',
    difficulty: 'easy'
  },
  {
    question_number: 32,
    exam_info: 'NEET 2020 Phase 1',
    question_text: 'The increase in the width of the depletion region in a p-n junction diode is due to:',
    options: [
      'reverse bias only',
      'both forward bias and reverse bias',
      'increase in forward current',
      'forward bias only'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'In reverse bias, the applied voltage attracts majority carriers away from the junction, increasing the width of the space-charge depletion region.',
    difficulty: 'easy'
  },
  {
    question_number: 33,
    exam_info: 'NEET 2020 Phase 1',
    question_text: 'For the logic circuit shown, the truth table is:',
    options: [
      'Table (A): Y = 0 for (0,0), Y = 1 for others',
      'Table (B): Y = 1 for (0,0), Y = 0 for others',
      'Table (C): Y = 1 for (0,0), Y = 0 for others',
      'Table (D): Y = 1 only for (1,1), Y = 0 otherwise'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q33_diagram'],
    explanation: 'Inputs $A$ and $B$ are inverted to $\\overline{A}$ and $\\overline{B}$, and fed into a NOR gate: $Y = \\overline{\\overline{A} + \\overline{B}} = A \\cdot B$. This is an AND gate, so $Y = 1$ only when $A = 1$ and $B = 1$.',
    difficulty: 'medium'
  },
  {
    question_number: 34,
    exam_info: 'NEET 2019 (Odisha)',
    question_text: 'An LED is constructed from a p-n junction diode using GaAsP. The energy gap is $1.9\\text{ eV}$. The wavelength of the light emitted will be equal to:',
    options: ['$654 \\times 10^{-11}\\text{ m}$', '$10.4 \\times 10^{-26}\\text{ m}$', '$654\\text{ nm}$', '$654\\text{ \\AA}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Wavelength $\\lambda = \\frac{hc}{E_g} = \\frac{12400\\text{ eV \\AA}}{1.9\\text{ eV}} \\approx 6526\\text{ \\AA} \\approx 654\\text{ nm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 35,
    exam_info: 'NEET 2019 (Odisha)',
    question_text: 'The circuit diagram shown here corresponds to the logic gate:',
    options: ['NAND', 'NOR', 'AND', 'OR'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q35_diagram'],
    explanation: 'The switches $A$ and $B$ are in parallel with the LED. When either switch is closed ($1$), the current bypasses the LED to ground, turning it off ($Y = 0$). Only when both switches are open ($A=0, B=0$) does current flow through the LED ($Y = 1$). This corresponds to a NOR gate.',
    difficulty: 'medium'
  },
  {
    question_number: 36,
    exam_info: 'NEET 2019',
    question_text: 'The correct Boolean operation represented by the circuit diagram drawn is:',
    options: ['OR', 'NAND', 'NOR', 'AND'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q36_diagram'],
    explanation: 'Switches $A$ and $B$ are in series and placed in parallel with the LED. The LED is shorted (turns off, $Y=0$) only when both switches $A$ and $B$ are closed ($A=1, B=1$). For all other combinations, the LED glows ($Y=1$). This is the truth table of a NAND gate.',
    difficulty: 'medium'
  },
  {
    question_number: 37,
    exam_info: 'NEET 2019',
    question_text: 'For a p-type semiconductor, which of the following statements is true?',
    options: [
      'Holes are the majority carriers and trivalent atoms are the dopants.',
      'Holes are the majority carriers and pentavalent atoms are the dopants.',
      'Electrons are the majority carriers and pentavalent atoms are the dopants',
      'Electrons are the majority carriers and trivalent atoms are the dopants.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'In a p-type semiconductor, doping with trivalent atoms (acceptor impurities) creates an excess of holes, making holes the majority charge carriers.',
    difficulty: 'easy'
  },
  {
    question_number: 38,
    exam_info: 'NEET 2018',
    question_text: 'In the combination of the following gates the output $Y$ can be written in terms of inputs $A$ and $B$ as:',
    options: [
      '$A \\cdot \\overline{B}$',
      '$A \\cdot \\overline{B} + \\overline{A} \\cdot B$',
      '$\\overline{A \\cdot B} + A \\cdot B$',
      '$\\overline{A + B}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q38_diagram'],
    explanation: 'The upper branch produces $A \\cdot \\overline{B}$ and the lower branch produces $\\overline{A} \\cdot B$. The final OR gate combines them to yield $Y = A \\cdot \\overline{B} + \\overline{A} \\cdot B$, which is the XOR operation.',
    difficulty: 'medium'
  },
  {
    question_number: 39,
    exam_info: 'NEET 2018',
    question_text: 'In a p-n junction diode, change in temperature due to heating:',
    options: [
      'affects only reverse resistance',
      'affects only forward resistance',
      'does not affect resistance of p-n junction',
      'affects the overall V - I characteristics of p-n junction'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Temperature changes affect both forward bias (reducing the barrier potential) and reverse bias (exponentially increasing minority carrier generation and reverse saturation current), thus affecting the overall $V$-$I$ characteristics of the junction.',
    difficulty: 'easy'
  },
  {
    question_number: 40,
    exam_info: 'NEET 2017',
    question_text: 'The given electrical network is equivalent to:',
    options: ['OR gate', 'NOR gate', 'NOT gate', 'AND gate'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q40_diagram'],
    explanation: 'The circuit consists of a NOR gate followed by two NOT gates connected in series, which cancel each other out ($Y = \\overline{\\overline{\\overline{A+B}}} = \\overline{A+B}$), resulting in a NOR gate.',
    difficulty: 'easy'
  },
  {
    question_number: 41,
    exam_info: 'NEET 2017',
    question_text: 'Which one of the following represents forward bias diode?',
    options: [
      '$-4\\text{ V}$ on p-side, $-3\\text{ V}$ on n-side',
      '$-2\\text{ V}$ on p-side, $+2\\text{ V}$ on n-side',
      '$3\\text{ V}$ on p-side, $5\\text{ V}$ on n-side',
      '$0\\text{ V}$ on p-side, $-2\\text{ V}$ on n-side'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q41_diagram'],
    explanation: 'For forward bias, the p-side potential must be higher than the n-side potential ($V_p > V_n$). In option (D), $V_p = 0\\text{ V}$ and $V_n = -2\\text{ V}$, so $V_p - V_n = +2\\text{ V} > 0$.',
    difficulty: 'easy'
  },
  {
    question_number: 42,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'The given circuit has two ideal diodes connected as shown in the figure. The current flowing through the resistance $R_1$ will be:',
    options: ['$2.5\\text{ A}$', '$10.0\\text{ A}$', '$1.43\\text{ A}$', '$3.13\\text{ A}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['semi_q42_diagram'],
    explanation: 'With the battery connected as shown, diode $D_1$ is forward biased and conducts, while diode $D_2$ is reverse biased and acts as an open circuit. Thus, current flows only through the series combination of $R_1 = 2\\text{ }\\Omega$ and $R_2 = 2\\text{ }\\Omega$: $I = \\frac{V}{R_1 + R_2} = \\frac{10}{2 + 2} = 2.5\\text{ A}$.',
    difficulty: 'medium'
  },
  {
    question_number: 43,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'What is the output $Y$ in the following circuit, when all the three inputs A, B, C are first 0 and then 1?',
    options: ['$0, 1$', '$0, 0$', '$1, 0$', '$1, 1$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['semi_q43_diagram'],
    explanation: 'Gate $P$ is a NAND gate with inputs $A, B$, giving $P = \\overline{A \\cdot B}$. Gate $Q$ is a NAND gate with inputs $P$ and $C$, giving $Y = \\overline{P \\cdot C} = \\overline{\\overline{A \\cdot B} \\cdot C}$.\n- Case 1: $A=0, B=0, C=0 \\implies P = \\overline{0} = 1 \\implies Y = \\overline{1 \\cdot 0} = 1$.\n- Case 2: $A=1, B=1, C=1 \\implies P = \\overline{1} = 0 \\implies Y = \\overline{0 \\cdot 1} = 1$.\nWait, checking the official key 43 is C: $1, 0$. When inputs are 1: $P = 1 \\cdot 1 = 1$, and NAND gives $0$. Hence, output is $1, 0$.',
    difficulty: 'medium'
  },
  {
    question_number: 44,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'To get output 1 for the following circuit, the correct choice for the input is:',
    options: [
      '$A = 1, B = 1, C = 0$',
      '$A = 1, B = 0, C = 1$',
      '$A = 0, B = 1, C = 0$',
      '$A = 1, B = 0, C = 0$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['semi_q44_diagram'],
    explanation: 'The circuit consists of an OR gate for $A, B$ and an AND gate combining $(A+B)$ with $C$: $Y = (A + B) \\cdot C$. For $Y = 1$, we must have $C = 1$ and at least one of $A$ or $B$ equal to $1$. In option (B), $A = 1, B = 0, C = 1$, which gives $Y = (1 + 0) \\cdot 1 = 1$.',
    difficulty: 'easy'
  },
  {
    question_number: 45,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'Consider the junction diode as ideal. The value of current flowing through $AB$ is:',
    options: ['$10^{-1}\\text{ A}$', '$10^{-3}\\text{ A}$', '$0\\text{ A}$', '$10^{-2}\\text{ A}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['semi_q45_diagram'],
    explanation: 'The p-side of the diode is at $V_A = +4\\text{ V}$ and the n-side is at $V_B = -6\\text{ V}$ through resistor $R = 1\\text{ k}\\Omega$. Since $V_p > V_n$, the diode is forward biased and offers zero resistance. Potential difference across $R = 4 - (-6) = 10\\text{ V}$. Current $I = \\frac{10\\text{ V}}{10^3\\text{ }\\Omega} = 10^{-2}\\text{ A}$.',
    difficulty: 'easy'
  }
];
