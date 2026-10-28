export const SEMICONDUCTOR_BATCH5_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The combination of gates shown has inputs $A$ and $B$ each passing through tied-input NAND gates (inverters to give $\\bar{A}$ and $\\bar{B}$), which then enter another 2-input NAND gate to produce output $X$. This combination of gates yields',
    options: [
      '(1) OR gate',
      '(2) NOT gate',
      '(3) XOR gate',
      '(4) NAND gate'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Expression for Output $X$:**\n   - A NAND gate with both inputs tied together acts as an inverter:\n     $$\\text{Output}_A = \\bar{A}, \\quad \\text{Output}_B = \\bar{B}$$\n   - These inverted inputs are fed into a 2-input NAND gate:\n     $$X = \\overline{\\bar{A} \\cdot \\bar{B}}$$\n\n2. **Applying De Morgan\'s Law:**\n   $$X = \\overline{\\bar{A}} + \\overline{\\bar{B}} = A + B$$\n   - The expression $A + B$ corresponds to an OR gate.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'What is the output expression of the combination of gates where inputs $A$ and $B$ are fed into an AND gate, and input $A$ and the output of the AND gate are fed into an OR gate?',
    options: [
      '(1) $A + A \\cdot B$',
      '(2) $(A + B)(\\overline{A + B})$',
      '(3) $A \\cdot B + \\bar{A} \\cdot \\bar{B}$',
      '(4) $(A + B) \\cdot (\\overline{A \\cdot B})$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Output of the AND Gate:**\n   The AND gate takes inputs $A$ and $B$, giving output $A \\cdot B$.\n\n2. **Output of the OR Gate ($Y$):**\n   The OR gate takes input $A$ and the output of the AND gate ($A \\cdot B$):\n   $$Y = A + A \\cdot B$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which logic gate is represented by the combination of logic gates where inputs $A$ and $B$ are inverted by NOT gates, and their outputs are fed into a NOR gate?',
    options: [
      '(1) OR',
      '(2) NAND',
      '(3) AND',
      '(4) NOR'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Expression:**\n   - Inverted inputs: $\\bar{A}$ and $\\bar{B}$.\n   - NOR gate operation on $\\bar{A}$ and $\\bar{B}$:\n     $$Y = \\overline{\\bar{A} + \\bar{B}}$$\n\n2. **Applying De Morgan\'s Law:**\n   $$Y = \\overline{\\bar{A}} \\cdot \\overline{\\bar{B}} = A \\cdot B$$\n   - $A \\cdot B$ represents an AND gate (bubbled NOR = AND).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a logic circuit, input $A$ and an inverter on $B$ feed into one AND gate (giving $A \\bar{B}$), while input $B$ and an inverter on $A$ feed into a second AND gate (giving $\\bar{A} B$). Both AND outputs feed into an OR gate to produce output $C$. In this circuit, $C =$',
    options: [
      '(1) $A\\bar{B} + \\bar{A}B$',
      '(2) $\\overline{A + B}$',
      '(3) $\\overline{AB}$',
      '(4) $A\\bar{A} + B\\bar{B}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Output of Upper AND Gate:**\n   Inputs are $A$ and $\\bar{B}$, giving $A \\bar{B}$.\n\n2. **Output of Lower AND Gate:**\n   Inputs are $\\bar{A}$ and $B$, giving $\\bar{A} B$.\n\n3. **Output of the OR Gate ($C$):**\n   $$C = A\\bar{B} + \\bar{A}B$$\n   - This is the standard sum-of-products expression for an XOR gate ($A \\oplus B$).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a logic gate circuit, input $A$ and inverted input $\\bar{B}$ feed into an upper AND gate, while input $B$ and inverted input $\\bar{A}$ feed into a lower AND gate. The outputs of both AND gates are fed into a final 2-input AND gate to produce output $Y$. Which truth table represents this circuit?',
    options: [
      '(1) $Y = 0$ for all input combinations $(0,0), (1,0), (0,1), (1,1)$',
      '(2) $Y = 1$ only when $A=1, B=1$, and $0$ otherwise',
      '(3) $Y = 1$ for all combinations except $(0,0)$',
      '(4) $Y = 1$ for $(0,1)$ and $(1,1)$, and $0$ otherwise'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Boolean Logic Expression:**\n   - Upper AND gate produces $A \\bar{B}$.\n   - Lower AND gate produces $\\bar{A} B$.\n   - Final AND gate combines the two:\n     $$Y = (A \\bar{B}) \\cdot (\\bar{A} B) = (A \\cdot \\bar{A}) \\cdot (\\bar{B} \\cdot B)$$\n\n2. **Evaluation:**\n   - By the law of complementarity, $A \\cdot \\bar{A} = 0$ and $B \\cdot \\bar{B} = 0$.\n   - Therefore, $Y = 0 \\cdot 0 = 0$ for every possible combination of inputs $(A, B)$.\n   - The output $Y$ is permanently 0 for $(0,0), (1,0), (0,1), (1,1)$.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two inputs $A$ and $B$ pass through separate NOT gates and enter a NOR gate ($Y = \\overline{\\bar{A} + \\bar{B}} = A \\cdot B$). Waveform $A$ is HIGH during $1 \\le t \\le 3$, and waveform $B$ is HIGH during $2 \\le t \\le 3$ and $4 \\le t \\le 5$. The output waveform $Y$ will be',
    options: [
      '(1) HIGH during $2 \\le t \\le 3$ and $4 \\le t \\le 6$',
      '(2) HIGH only during the interval $2 \\le t \\le 3$ (pulse from 2 to 3) and LOW everywhere else',
      '(3) HIGH during $2 \\le t \\le 3$ and $5 \\le t \\le 6$',
      '(4) HIGH during $3 \\le t \\le 6$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Equivalent Gate:**\n   $$Y = \\overline{\\bar{A} + \\bar{B}} = A \\cdot B$$\n   - The circuit operates as an AND gate.\n\n2. **Interval Analysis:**\n   - $0 \\le t \\le 1$: $A=0, B=0 \\implies Y = 0$\n   - $1 \\le t \\le 2$: $A=1, B=0 \\implies Y = 0$\n   - $2 \\le t \\le 3$: $A=1, B=1 \\implies Y = 1$\n   - $3 \\le t \\le 4$: $A=0, B=0 \\implies Y = 0$\n   - $4 \\le t \\le 5$: $A=0, B=1 \\implies Y = 0$\n   - $5 \\le t \\le 6$: $A=0, B=0 \\implies Y = 0$\n   - Therefore, output $Y$ is HIGH exclusively during $2 \\le t \\le 3$, yielding a single positive pulse between $2$ and $3$.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Name the logic gate shown where inputs $A$ and $B$ pass through separate NOT gates, and their inverted outputs feed into a NOR gate to yield output $C$.',
    options: [
      '(1) NOR-gate',
      '(2) NAND-gate',
      '(3) AND-gate',
      '(4) OR-gate'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Logic Transformation:**\n   - Inverters yield $\\bar{A}$ and $\\bar{B}$.\n   - NOR gate computes the negated sum:\n     $$C = \\overline{\\bar{A} + \\bar{B}}$$\n   - Applying De Morgan\'s Law:\n     $$C = \\overline{\\bar{A}} \\cdot \\overline{\\bar{B}} = A \\cdot B$$\n   - This is the Boolean equation for an AND gate.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In Boolean algebra, the expression $(\\overline{\\bar{A} \\bar{B}}) A$ is equal to',
    options: [
      '(1) $\\overline{A + B}$',
      '(2) $A$',
      '(3) $\\overline{A \\cdot B}$',
      '(4) $A + B$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Simplify the Overbar Term using De Morgan\'s Law:**\n   $$\\overline{\\bar{A} \\bar{B}} = \\overline{\\bar{A}} + \\overline{\\bar{B}} = A + B$$\n\n2. **Multiply by $A$:**\n   $$(\\overline{\\bar{A} \\bar{B}}) A = (A + B) A = A \\cdot A + A \\cdot B = A + A B$$\n\n3. **Absorption Law:**\n   $$A + A B = A(1 + B) = A(1) = A$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A combination of logic gates consists of an AND gate receiving inputs $A$ and $B$, followed by an OR gate receiving input $A$ and the output of the AND gate ($R = A + A \\cdot B$). If $A$ is at $0\\text{ V}$ (Logic 0) and $B$ is at $5\\text{ V}$ (Logic 1), then the potential of $R$ is',
    options: [
      '(1) $0\\text{ V}$',
      '(2) $5\\text{ V}$',
      '(3) $10\\text{ V}$',
      '(4) Any of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Logic of Circuit:**\n   $$R = A + A \\cdot B = A(1 + B) = A$$\n\n2. **Evaluating for Given Voltages:**\n   - Input $A = 0\\text{ V} \\implies A = 0$\n   - Input $B = 5\\text{ V} \\implies B = 1$\n   - The output of the AND gate is $0 \\cdot 1 = 0$ ($0\\text{ V}$).\n   - The OR gate combines $A = 0$ and $0$, giving $R = 0$ ($0\\text{ V}$).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'How many minimum number of NOR gates are required to obtain an AND gate?',
    options: [
      '(1) One',
      '(2) Two',
      '(3) Three',
      '(4) Five'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Realization of AND Gate using NOR Gates:**\n   $$A \\cdot B = \\overline{\\overline{A \\cdot B}} = \\overline{\\bar{A} + \\bar{B}}$$\n   - Step 1: Use 1 NOR gate with tied inputs to invert $A \\to \\bar{A}$.\n   - Step 2: Use 1 NOR gate with tied inputs to invert $B \\to \\bar{B}$.\n   - Step 3: Feed $\\bar{A}$ and $\\bar{B}$ into a 3rd NOR gate: $\\overline{\\bar{A} + \\bar{B}} = A \\cdot B$.\n   - Thus, a minimum of 3 NOR gates are required.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'What is the name of the logic gate represented by a NOR gate with inputs $A$ and $B$, whose output is fed into a tied-input NAND gate (inverter)?',
    options: [
      '(1) NOR',
      '(2) OR',
      '(3) NAND',
      '(4) AND'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Gate Operations:**\n   - The first gate is a NOR gate with inputs $A$ and $B$, producing $\\overline{A + B}$.\n   - The second gate is a NAND gate with its inputs tied together, which acts as a NOT gate (inverter).\n   - Inverting the NOR output yields:\n     $$X = \\overline{\\overline{A + B}} = A + B$$\n   - The expression $A + B$ is the operation of an OR gate.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Identify the logic gate which follows the input-output waveform where output $Y = 0$ when $A=0, B=0$, and $Y = 1$ whenever either $A=1$ or $B=1$ or both are $1$.',
    options: [
      '(1) OR gate',
      '(2) AND gate',
      '(3) NOT gate',
      '(4) XOR gate'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Truth Table from Waveform:**\n   - Before $t_1$: $A=0, B=0 \\implies Y=0$\n   - $t_1$ to $t_2$: $A=1, B=0 \\implies Y=1$\n   - $t_2$ to $t_3$: $A=1, B=1 \\implies Y=1$\n   - $t_3$ to $t_4$: $A=0, B=1 \\implies Y=1$\n   - $t_4$ to $t_5$: $A=0, B=0 \\implies Y=0$\n   - $t_5$ to $t_6$: $A=1, B=0 \\implies Y=1$\n\n2. **Conclusion:**\n   The output is $1$ whenever at least one of the inputs is $1$, which precisely defines the operation of an OR gate ($Y = A + B$).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  }
];
