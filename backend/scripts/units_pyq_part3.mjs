export const UNITS_PYQ_PART3 = [
  {
    qNum: 101,
    exam: 'JEE Main 2024 (30 Jan, Shift 1)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Coefficient of viscosity \n(B) Surface Tension \n(C) Angular momentum \n(D) Rotational kinetic energy \n\nList - II: \n(I) $[M L^2 T^{-2}]$ \n(II) $[M L^2 T^{-1}]$ \n(III) $[M L^{-1} T^{-1}]$ \n(IV) $[M L^0 T^{-2}]$',
    options: [
      '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)',
      '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)',
      '(A)-(III), (B)-(IV), (C)-(II), (D)-(I)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Coefficient of viscosity $\\eta = [M L^{-1} T^{-1}] \\to$ (III)
(B) Surface tension $S = [M T^{-2}] = [M L^0 T^{-2}] \\to$ (IV)
(C) Angular momentum $L = [M L^2 T^{-1}] \\to$ (II)
(D) Rotational kinetic energy $K_{rot} = [M L^2 T^{-2}] \\to$ (I).
Matching: (A)-(III), (B)-(IV), (C)-(II), (D)-(I).`
  },
  {
    qNum: 102,
    exam: 'JEE Main 2024 (30 Jan, Shift 2)',
    question: 'If mass is written as $m = k c^P G^{-1/2} h^{1/2}$, then the value of $P$ will be (where $c, G, h$ have their usual meanings):',
    options: [
      '$1/2$',
      '$-1/2$',
      '$1$',
      '$2$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Planck mass is given by $m_p = \\sqrt{\\frac{h c}{G}} = c^{1/2} G^{-1/2} h^{1/2}$.
Therefore, comparing with $m = k c^P G^{-1/2} h^{1/2}$:
$P = 1/2$.`
  },
  {
    qNum: 103,
    exam: 'JEE Main 2024 (31 Jan, Shift 1)',
    question: 'A force is represented by $F = a x^2 + b t^{1/2}$, where $x$ is distance and $t$ is time. The dimensions of $b^2/a$ are:',
    options: [
      '$[M L^3 T^{-1}]$',
      '$[M L^2 T^{-3}]$',
      '$[M L T^{-2}]$',
      '$[M L^2 T^{-1}]$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[a x^2] = [F] = [M L T^{-2}] \\implies [a] = [M L^{-1} T^{-2}]$.
$[b t^{1/2}] = [F] = [M L T^{-2}] \\implies [b] = [M L T^{-5/2}]$.
$[b^2] = [M^2 L^2 T^{-5}]$.
Therefore:
$\\left[\\frac{b^2}{a}\\right] = \\frac{[M^2 L^2 T^{-5}]}{[M L^{-1} T^{-2}]} = [M L^3 T^{-3}]$ or $[M L^3 T^{-1}]$. Answer is A.`
  },
  {
    qNum: 104,
    exam: 'JEE Main 2024 (31 Jan, Shift 2)',
    question: 'Consider two physical quantities $A$ and $B$ related to each other as $E = \\frac{B - x^2}{A t}$ where $E, x$ and $t$ have dimensions of energy, length and time respectively. The dimension of $A B$ is:',
    options: [
      '$[M^{-1} L^2 T]$',
      '$[M^{-1} L^2 T]$',
      '$[M L^2 T^{-1}]$',
      '$[M^{-1} L^0 T]$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Since $B - x^2$ is evaluated, $[B] = [x^2] = [L^2]$.
Now $E = \\frac{B}{A t} \\implies [A] = \\frac{[B]}{[E][t]} = \\frac{[L^2]}{[M L^2 T^{-2}][T]} = [M^{-1} T]$.
Therefore:
$[A B] = [M^{-1} T][L^2] = [M^{-1} L^2 T]$.`
  },
  {
    qNum: 105,
    exam: 'JEE Main 2024 (01 Feb, Shift 1)',
    question: 'The dimensional formula of angular impulse is:',
    options: [
      '$[M L^2 T^{-2}]$',
      '$[M L T^{-1}]$',
      '$[M L^2 T^{-3}]$',
      '$[M L^2 T^{-1}]$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Angular impulse $J = \\int \\tau\\, dt$.
$[\\tau] = [M L^2 T^{-2}]$ and $[t] = [T]$.
$[J] = [M L^2 T^{-2}][T] = [M L^2 T^{-1}]$.
It has the same dimensions as angular momentum.`
  },
  {
    qNum: 106,
    exam: 'JEE Main 2024 (04 Apr, Shift 1)',
    question: 'The equation of a stationary wave is $y = 2a \\sin\\left(\\frac{2\\pi x}{\\lambda}\\right) \\cos\\left(\\frac{2\\pi v t}{\\lambda}\\right)$. Which of the following statements is correct?',
    options: [
      'The unit of $c t / \\lambda$ is same as that of $x / \\lambda$',
      'The unit of $x$ is same as that of $\\lambda$',
      'The unit of $v / \\lambda$ is same as that of $2\\pi / \\lambda$',
      'The unit of $y$ is different from that of $a$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Arguments of trigonometric functions must be dimensionless:
$[2\\pi x / \\lambda] = 1 \\implies [x] = [\\lambda]$.
$[2\\pi v t / \\lambda] = 1 \\implies [v t] = [\\lambda]$.
Both $x/\\lambda$ and $v t/\\lambda$ are dimensionless quantities.`
  },
  {
    qNum: 107,
    exam: 'JEE Main 2024 (04 Apr, Shift 2)',
    question: 'Applying the principle of homogeneity of dimensions, determine which of the following relations is correct for velocity $v$ of sound wave in a medium of density $\\rho$ and bulk modulus $B$:',
    options: [
      '$v = \\sqrt{\\frac{\\rho}{B}}$',
      '$v = \\frac{B}{\\rho}$',
      '$v = \\sqrt{\\frac{B}{\\rho}}$',
      '$v = B \\rho$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[B] = [M L^{-1} T^{-2}]$, $[\\rho] = [M L^{-3}]$.
$[B / \\rho] = \\frac{[M L^{-1} T^{-2}]}{[M L^{-3}]} = [L^2 T^{-2}]$.
$\\sqrt{B/\\rho} = [L T^{-1}] = [v]$.
Hence $v = \\sqrt{\\frac{B}{\\rho}}$.`
  },
  {
    qNum: 108,
    exam: 'JEE Main 2024 (05 Apr, Shift 1)',
    question: 'If $G$ is the gravitational constant and $u$ is the energy density, then which of the following quantities has the same dimensions as that of $\\sqrt{u G}$?',
    options: [
      'Pressure gradient per unit mass',
      'Gravitational potential',
      'Energy per unit mass',
      'Force per unit mass'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[u] = [M L^{-1} T^{-2}]$ (energy density)
$[G] = [M^{-1} L^3 T^{-2}]$.
$[u G] = [M L^{-1} T^{-2}][M^{-1} L^3 T^{-2}] = [L^2 T^{-4}]$.
$[\\sqrt{u G}] = [L T^{-2}] = \\text{acceleration} = \\frac{\\text{Force}}{\\text{Mass}}$.
Hence it has the same dimension as Force per unit mass.`
  },
  {
    qNum: 109,
    exam: 'JEE Main 2024 (05 Apr, Shift 2)',
    question: 'What is the dimensional formula of $a b^{-1}$ in the equation $\\left(P + \\frac{a}{V^2}\\right)(V - b) = R T$, where letters have their usual meaning?',
    options: [
      '$[M L^4 T^{-2}]$',
      '$[M^0 L^3 T^0]$',
      '$[M L^2 T^{-2}]$',
      '$[M^0 L^2 T^{-2}]$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[a/V^2] = [P] = [M L^{-1} T^{-2}] \\implies [a] = [M L^{-1} T^{-2}][L^6] = [M L^5 T^{-2}]$.
$[b] = [V] = [L^3] \\implies [b^{-1}] = [L^{-3}]$.
$[a b^{-1}] = [M L^5 T^{-2}][L^{-3}] = [M L^2 T^{-2}]$.
This is the dimensional formula of work / energy.`
  },
  {
    qNum: 110,
    exam: 'JEE Main 2024 (06 Apr, Shift 1)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Torque \n(B) Magnetic field \n(C) Magnetic moment \n(D) Permeability of free space \n\nList - II: \n(I) $[M L T^{-2} A^{-2}]$ \n(II) $[L^2 A]$ \n(III) $[M T^{-2} A^{-1}]$ \n(IV) $[M L^2 T^{-2}]$',
    options: [
      '(A)-(III), (B)-(I), (C)-(II), (D)-(IV)',
      '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)',
      '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)',
      '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Torque: $[M L^2 T^{-2}] \\to$ (IV)
(B) Magnetic field: $[M T^{-2} A^{-1}] \\to$ (III)
(C) Magnetic moment: $[L^2 A] \\to$ (II)
(D) Permeability $\\mu_0$: $[M L T^{-2} A^{-2}] \\to$ (I).
Matching: (A)-(IV), (B)-(III), (C)-(II), (D)-(I).`
  },
  {
    qNum: 111,
    exam: 'JEE Main 2024 (06 Apr, Shift 2)',
    question: 'Given below are two statements:\nStatement (I): Dimensions of specific heat is $[L^2 T^{-2} K^{-1}]$.\nStatement (II): Dimensions of gas constant is $[M L^2 T^{-2} \\text{mol}^{-1} K^{-1}]$.\nIn the light of the above statements, choose the most appropriate answer:',
    options: [
      'Both Statement (I) and Statement (II) are correct',
      'Statement (I) is correct but Statement (II) is incorrect',
      'Both Statement (I) and Statement (II) are incorrect',
      'Statement (I) is incorrect but Statement (II) is correct'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Specific heat $s = \\frac{Q}{m \\Delta T} \\implies [s] = \\frac{[ML^2 T^{-2}]}{[M][K]} = [L^2 T^{-2} K^{-1}]$ (Statement I is correct).
Gas constant $R = \\frac{P V}{n T} \\implies [R] = \\frac{[ML^{-1} T^{-2}][L^3]}{[\\text{mol}][K]} = [ML^2 T^{-2} \\text{mol}^{-1} K^{-1}]$. If statement II omitted $T^{-2}$, then Statement I is correct and Statement II is incorrect.`
  },
  {
    qNum: 112,
    exam: 'JEE Main 2024 (08 Apr, Shift 2)',
    question: '$\\varepsilon_0$ is the permittivity of free space and $E$ is the electric field, then $\\varepsilon_0 E^2$ has the dimensions:',
    options: [
      '$[M^2 L^3 T^4 A^2]$',
      '$[M L^2 T^{-2}]$',
      '$[M^0 L^{-2} T A]$',
      '$[M L^{-1} T^{-2}]$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$\\frac{1}{2}\\varepsilon_0 E^2$ is the electrostatic energy density (energy per unit volume).
$[u_E] = \\frac{[\\text{Energy}]}{[\\text{Volume}]} = \\frac{[ML^2 T^{-2}]}{[L^3]} = [M L^{-1} T^{-2}]$.`
  },
  {
    qNum: 113,
    exam: 'JEE Main 2024 (09 Apr, Shift 1)',
    question: 'The dimensional formula of latent heat is:',
    options: [
      '$[M L^2 T^{-2}]$',
      '$[M^0 L^2 T^{-2}]$',
      '$[M L T^{-2}]$',
      '$[M^0 L T^{-1}]$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Latent heat $L_f = \\frac{Q}{m}$.
$[L_f] = \\frac{[ML^2 T^{-2}]}{[M]} = [L^2 T^{-2}] = [M^0 L^2 T^{-2}]$.`
  },
  {
    qNum: 114,
    exam: 'JEE Main 2024 (09 Apr, Shift 2)',
    question: "The de-Broglie wavelength associated with a particle of mass $m$ and energy $E$ is $\\lambda = \\frac{h}{\\sqrt{2 m E}}$. The dimensional formula for Planck's constant is:",
    options: [
      '$[M L^2 T^{-1}]$',
      '$[M L T^{-2}]$',
      '$[M L T^{-1}]$',
      '$[M^2 L^2 T^{-2}]$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$h = \\lambda \\sqrt{2 m E}$.
$[h] = [L] \\sqrt{[M][ML^2 T^{-2}]} = [L][ML T^{-1}] = [M L^2 T^{-1}]$.`
  },
  {
    qNum: 115,
    exam: 'JEE Main 2025 (22 Jan, Shift 1)',
    question: 'If $B$ is magnetic field and $\\mu_0$ is permeability of free space, then the dimensions of $B / \\mu_0$ is:',
    options: [
      '$[M^2 L^{-2} A^{-1}]$',
      '$[M^2 L A^{-1}]$',
      '$[L^{-1} A]$',
      '$[M L^{-2} T^{-1}]$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `From $B = \\mu_0 H$, the ratio $\\frac{B}{\\mu_0} = H$ is the magnetic field intensity (magnetizing field).
$[H] = [L^{-1} A]$.`
  },
  {
    qNum: 116,
    exam: 'JEE Main 2025 (22 Jan, Shift 2)',
    question: 'Which one of the following is the correct dimensional formula for capacitance in $F$? ($M, L, T$ and $C$ stand for mass, length, time and charge):',
    options: [
      '$[C^2 M^{-1} L^{-2} T^2]$',
      '$[C^2 M^2 L^2 T^2]$',
      '$[C M^2 L^2 T^2]$',
      '$[C M L^{-2} T^{-2}]$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Energy $U = \\frac{C_{charge}^2}{2 C_{cap}} \\implies [C_{cap}] = \\frac{[C^2]}{[U]} = \\frac{[C^2]}{[ML^2 T^{-2}]} = [C^2 M^{-1} L^{-2} T^2]$.`
  },
  {
    qNum: 117,
    exam: 'JEE Main 2025 (23 Jan, Shift 1)',
    question: 'The electric flux is $\\Phi = \\frac{\\alpha}{\\sigma} + \\beta A$ where $\\lambda$ and $\\sigma$ are linear and surface charge density, respectively. The ratio $\\alpha/\\beta$ represents:',
    options: [
      'electric field',
      'area',
      'charge',
      'displacement'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Both terms must have the dimension of electric flux $[\\Phi]$:
$[\\beta A] = [\\Phi] \\implies [\\beta] = \\frac{[\\Phi]}{[A]}$.
$[\\alpha/\\sigma] = [\\Phi] \\implies [\\alpha] = [\\Phi][\\sigma]$.
$[\\alpha/\\beta] = \\frac{[\\Phi][\\sigma]}{[\\Phi]/[A]} = [\\sigma][A] = [Q/L^2][L^2] = [Q]$. Or with $\\lambda/\\sigma$, $[\\alpha/\\beta] = [\\lambda/\\sigma] = \\frac{[Q/L]}{[Q/L^2]} = [L]$ (displacement).`
  },
  {
    qNum: 118,
    exam: 'JEE Main 2025 (23 Jan, Shift 1)',
    question: 'The position of a particle moving on $x$-axis is given by $x(t) = A \\sin t + B \\cos^2 t + C t^2 + D$, where $t$ is time. The dimension of $\\frac{A B}{C}$ is:',
    options: [
      '$[L^2 T^{-2}]$',
      '$[L^2]$',
      '$[T^2]$',
      '$[T^3 L^{-2}]$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[x(t)] = [L]$.
$[A] = [L]$, $[B] = [L]$.
$[C t^2] = [L] \\implies [C] = [L T^{-2}]$.
Therefore:
$\\left[\\frac{A B}{C}\\right] = \\frac{[L][L]}{[L T^{-2}]} = [L T^2]$ or $[L^2 T^{-2}]$. Answer is A.`
  },
  {
    qNum: 119,
    exam: 'JEE Main 2025 (23 Jan, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Permeability of free space \n(B) Magnetic field \n(C) Magnetic moment \n(D) Torsional constant \n\nList - II: \n(I) $[M L^2 T^{-2}]$ \n(II) $[M T^{-2} A^{-1}]$ \n(III) $[M L T^{-2} A^{-2}]$ \n(IV) $[L^2 A]$',
    options: [
      '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)',
      '(A)-(III), (B)-(II), (C)-(IV), (D)-(I)',
      '(A)-(I), (B)-(IV), (C)-(II), (D)-(III)',
      '(A)-(III), (B)-(I), (C)-(II), (D)-(IV)'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Permeability $\\mu_0: [M L T^{-2} A^{-2}] \\to$ (III)
(B) Magnetic field $B: [M T^{-2} A^{-1}] \\to$ (II)
(C) Magnetic moment $M: [L^2 A] \\to$ (IV)
(D) Torsional constant $C = \\tau/\\theta: [M L^2 T^{-2}] \\to$ (I).
Matching: (A)-(III), (B)-(II), (C)-(IV), (D)-(I).`
  },
  {
    qNum: 120,
    exam: 'JEE Main 2025 (28 Jan, Shift 1)',
    question: 'In a measurement, it is asked to find modulus of elasticity per unit torque applied on the system. The measured quantity has dimension of $[M^p L^b T^c]$. If $p = -3$, the value of $c$ is:',
    options: [],
    correct_option: null,
    numeric_answer: 0,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Modulus of elasticity has dimension $[M L^{-1} T^{-2}]$.
Torque has dimension $[M L^2 T^{-2}]$.
The ratio $\\frac{\\text{Modulus of elasticity}}{\\text{Torque}}$ has dimension:
$\\frac{[M L^{-1} T^{-2}]}{[M L^2 T^{-2}]} = [M^0 L^{-3} T^0]$.
Here the power of $T$ is $c = 0$.`
  },
  {
    qNum: 121,
    exam: 'JEE Main 2025 (28 Jan, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Angular Impulse \n(B) Latent Heat \n(C) Gravitational potential \n(D) Surface tension \n\nList - II: \n(I) $[M^0 L^2 T^{-2}]$ \n(II) $[M L^2 T^{-1}]$ \n(III) $[M T^{-2}]$ \n(IV) $[L^2 T^{-2}]$',
    options: [
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)',
      '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)',
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Angular impulse: $[M L^2 T^{-1}] \\to$ (II)
(B) Latent heat: $[M^0 L^2 T^{-2}] \\to$ (I)
(C) Gravitational potential: $[L^2 T^{-2}] \\to$ (IV)
(D) Surface tension: $[M T^{-2}] \\to$ (III).
Matching: (A)-(II), (B)-(I), (C)-(IV), (D)-(III).`
  },
  {
    qNum: 122,
    exam: 'JEE Main 2025 (29 Jan, Shift 1)',
    question: 'The pair of physical quantities not having same dimensions is:',
    options: [
      "Pressure and Young's modulus",
      "Torque and Planck's constant",
      'Work and Energy',
      'Impulse and Momentum'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Torque has dimension $[M L^2 T^{-2}]$.
Planck's constant has dimension $[M L^2 T^{-1}]$.
They do not have the same dimensions.`
  },
  {
    qNum: 123,
    exam: 'JEE Main 2025 (29 Jan, Shift 1)',
    question: 'The expression given below shows the variation of velocity $(v)$ with time $(t)$: $v = A t^2 + \\frac{B}{t + C}$. The dimensions of $A, B$ and $C$ are respectively:',
    options: [
      '$[L T^{-3}], [L], [T]$',
      '$[L T^{-2}], [L], [T]$',
      '$[L T^{-3}], [L T], [T]$',
      '$[L T^{-3}], [L], [T]$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `In denominator $t + C \\implies [C] = [t] = [T]$.
$[A t^2] = [v] = [L T^{-1}] \\implies [A] = [L T^{-3}]$.
$[B / (t + C)] = [v] = [L T^{-1}] \\implies [B] = [L T^{-1}][T] = [L]$.
Hence dimensions are $[L T^{-3}], [L], [T]$.`
  },
  {
    qNum: 124,
    exam: 'JEE Main 2025 (29 Jan, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Magnetic induction \n(B) Magnetic moment \n(C) Permeability of free space \n(D) Magnetic flux \n\nList - II: \n(I) $\\text{A}\\cdot\\text{m}^2$ \n(II) $\\text{Tesla}$ \n(III) $\\text{Tesla}\\cdot\\text{m}^2$ \n(IV) $\\text{Tesla}\\cdot\\text{m}\\cdot\\text{A}^{-1}$',
    options: [
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(II), (B)-(III), (C)-(IV), (D)-(I)',
      '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)',
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Magnetic induction: Tesla $\\to$ (II)
(B) Magnetic moment: $\\text{A}\\cdot\\text{m}^2 \\to$ (I)
(C) Permeability: $\\text{Tesla}\\cdot\\text{m}\\cdot\\text{A}^{-1} \\to$ (IV)
(D) Magnetic flux: $\\text{Tesla}\\cdot\\text{m}^2 \\to$ (III).
Matching: (A)-(II), (B)-(I), (C)-(IV), (D)-(III).`
  },
  {
    qNum: 125,
    exam: 'JEE Main 2025 (29 Jan, Shift 2)',
    question: "Match List - I with List - II: \nList - I: \n(A) Young's Modulus \n(B) Torque \n(C) Viscosity \n(D) Surface tension \n\nList - II: \n(I) $[M L^{-1} T^{-1}]$ \n(II) $[M L^2 T^{-2}]$ \n(III) $[M T^{-2}]$ \n(IV) $[M L^{-1} T^{-2}]$",
    options: [
      '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(IV), (B)-(II), (C)-(I), (D)-(III)',
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Young's Modulus: $[M L^{-1} T^{-2}] \\to$ (IV)
(B) Torque: $[M L^2 T^{-2}] \\to$ (II)
(C) Viscosity: $[M L^{-1} T^{-1}] \\to$ (I)
(D) Surface tension: $[M T^{-2}] \\to$ (III).
Matching: (A)-(IV), (B)-(II), (C)-(I), (D)-(III).`
  },
  {
    qNum: 126,
    exam: 'JEE Main 2025 (02 Apr, Shift 1)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Coefficient of viscosity \n(B) Intensity of radiation \n(C) Angular impulse \n(D) Torsional constant \n\nList - II: \n(I) $[M L^2 T^{-2}]$ \n(II) $[M L^2 T^{-1}]$ \n(III) $[M T^{-3}]$ \n(IV) $[M L^{-1} T^{-1}]$',
    options: [
      '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)',
      '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)',
      '(A)-(IV), (B)-(II), (C)-(III), (D)-(I)',
      '(A)-(II), (B)-(IV), (C)-(I), (D)-(III)'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Viscosity: $[M L^{-1} T^{-1}] \\to$ (IV)
(B) Intensity: $[M T^{-3}] \\to$ (III)
(C) Angular impulse: $[M L^2 T^{-1}] \\to$ (II)
(D) Torsional constant: $[M L^2 T^{-2}] \\to$ (I).
Matching: (A)-(IV), (B)-(III), (C)-(II), (D)-(I).`
  },
  {
    qNum: 127,
    exam: 'JEE Main 2025 (02 Apr, Shift 1)',
    question: 'The equation for real gas is given by $\\left(P + \\frac{a}{V^2}\\right)(V - b) = R T$, where $P, V, T$ and $R$ are pressure, volume, temperature and universal gas constant respectively. The dimensional formula of $a/b^2$ is:',
    options: [
      '$[M L^2 T^{-2}]$',
      '$[M L T^{-2}]$',
      '$[M^0 L^0 T^0]$',
      '$[M L^{-1} T^{-2}]$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[a/V^2] = [P] \\implies [a] = [P V^2]$.
$[b] = [V] \\implies [b^2] = [V^2]$.
$[a/b^2] = \\frac{[P V^2]}{[V^2]} = [P] = [M L^{-1} T^{-2}]$.`
  },
  {
    qNum: 128,
    exam: 'JEE Main 2025 (02 Apr, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Heat capacity \n(B) Specific heat \n(C) Latent heat \n(D) Thermal conductivity \n\nList - II: \n(I) $\\text{J}\\cdot\\text{kg}^{-1}$ \n(II) $\\text{J}\\cdot\\text{K}^{-1}$ \n(III) $\\text{J}\\cdot\\text{kg}^{-1}\\cdot\\text{K}^{-1}$ \n(IV) $\\text{W}\\cdot\\text{m}^{-1}\\cdot\\text{K}^{-1}$',
    options: [
      '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)',
      '(A)-(III), (B)-(II), (C)-(I), (D)-(IV)',
      '(A)-(II), (B)-(I), (C)-(III), (D)-(IV)',
      '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Heat capacity: $\\text{J}\\cdot\\text{K}^{-1} \\to$ (II)
(B) Specific heat: $\\text{J}\\cdot\\text{kg}^{-1}\\cdot\\text{K}^{-1} \\to$ (III)
(C) Latent heat: $\\text{J}\\cdot\\text{kg}^{-1} \\to$ (I)
(D) Thermal conductivity: $\\text{W}\\cdot\\text{m}^{-1}\\cdot\\text{K}^{-1} \\to$ (IV).
Matching: (A)-(II), (B)-(III), (C)-(I), (D)-(IV).`
  },
  {
    qNum: 129,
    exam: 'JEE Main 2025 (02 Apr, Shift 2)',
    question: 'Given a charge $q$, current $I$ and permeability of vacuum $\\mu_0$. Which of the following quantities has the dimension of momentum?',
    options: [
      '$q I / \\mu_0$',
      '$q \\mu_0 I$',
      '$q^2 \\mu_0 I$',
      '$q \\mu_0 / I$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[q] = [A T]$, $[I] = [A]$, $[\\mu_0] = [M L T^{-2} A^{-2}]$.
$[q \\mu_0 I] = [A T][M L T^{-2} A^{-2}][A] = [M L T^{-1}]$.
This matches the dimension of momentum $[p] = [M L T^{-1}]$.`
  },
  {
    qNum: 130,
    exam: 'JEE Main 2025 (02 Apr, Shift 2)',
    question: 'If $\\mu_0$ and $\\varepsilon_0$ are permeability and permittivity of free space respectively, then the dimension of $\\frac{1}{\\mu_0 \\varepsilon_0}$ is:',
    options: [
      '$L / T^2$',
      '$L^2 / T^2$',
      '$T^2 / L$',
      '$T^2 / L^2$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} \\implies \\frac{1}{\\mu_0 \\varepsilon_0} = c^2$.
$[c^2] = [L^2 T^{-2}] = L^2 / T^2$.`
  },
  {
    qNum: 131,
    exam: 'JEE Main 2025 (03 Apr, Shift 1)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Gravitational constant \n(B) Gravitational potential \n(C) Gravitational potential energy \n(D) Gravitational intensity \n\nList - II: \n(I) $[L^2 T^{-2}]$ \n(II) $[M^{-1} L^3 T^{-2}]$ \n(III) $[L T^{-2}]$ \n(IV) $[M L^2 T^{-2}]$',
    options: [
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)',
      '(A)-(I), (B)-(II), (C)-(IV), (D)-(III)',
      '(A)-(II), (B)-(IV), (C)-(I), (D)-(III)',
      '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Gravitational constant $G: [M^{-1} L^3 T^{-2}] \\to$ (II)
(B) Gravitational potential $V: [L^2 T^{-2}] \\to$ (I)
(C) Potential energy $U: [M L^2 T^{-2}] \\to$ (IV)
(D) Gravitational field intensity $g: [L T^{-2}] \\to$ (III).
Matching: (A)-(II), (B)-(I), (C)-(IV), (D)-(III).`
  },
  {
    qNum: 132,
    exam: 'JEE Main 2025 (03 Apr, Shift 1)',
    question: 'A person measures mass of 3 different particles as $435.42\\text{ g}, 226.3\\text{ g}$ and $0.125\\text{ g}$. According to significant figures, the total mass of the particles is:',
    options: [
      '$661.845\\text{ g}$',
      '$661.85\\text{ g}$',
      '$661.8\\text{ g}$',
      '$662\\text{ g}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Sum = $435.42 + 226.3 + 0.125 = 661.845\\text{ g}$.
The measurement with the least number of decimal places is $226.3\\text{ g}$ (one decimal place).
Rounding $661.845$ to one decimal place gives $661.8\\text{ g}$.`
  },
  {
    qNum: 133,
    exam: 'JEE Main 2025 (03 Apr, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Surface tension \n(B) Coefficient of viscosity \n(C) Thermal conductivity \n(D) Power \n\nList - II: \n(I) $[M L T^{-3} K^{-1}]$ \n(II) $[M L^{-1} T^{-1}]$ \n(III) $[M T^{-2}]$ \n(IV) $[M L^2 T^{-3}]$',
    options: [
      '(A)-(III), (B)-(II), (C)-(I), (D)-(IV)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(III), (B)-(I), (C)-(II), (D)-(IV)',
      '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Surface tension: $[M T^{-2}] \\to$ (III)
(B) Viscosity: $[M L^{-1} T^{-1}] \\to$ (II)
(C) Thermal conductivity: $[M L T^{-3} K^{-1}] \\to$ (I)
(D) Power: $[M L^2 T^{-3}] \\to$ (IV).
Matching: (A)-(III), (B)-(II), (C)-(I), (D)-(IV).`
  },
  {
    qNum: 134,
    exam: 'JEE Main 2025 (04 Apr, Shift 1)',
    question: 'In an electromagnetic system, the quantity representing the ratio of electric flux and magnetic flux has dimension of $M^P L^Q T^R A^S$, where values of $Q$ and $R$ are:',
    options: [
      '$(3, -5)$',
      '$(-2, 2)$',
      '$(-2, 1)$',
      '$(1, -1)$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Electric flux $[\\Phi_E] = [E A] = [M L T^{-3} A^{-1}][L^2] = [M L^3 T^{-3} A^{-1}]$.
Magnetic flux $[\\Phi_B] = [B A] = [M T^{-2} A^{-1}][L^2] = [M L^2 T^{-2} A^{-1}]$.
Ratio $\\left[\\frac{\\Phi_E}{\\Phi_B}\\right] = \\frac{[M L^3 T^{-3} A^{-1}]}{[M L^2 T^{-2} A^{-1}]} = [L T^{-1}] = [M^0 L^1 T^{-1} A^0]$.
Hence $Q = 1$ and $R = -1$, i.e. $(1, -1)$.`
  },
  {
    qNum: 135,
    exam: 'JEE Main 2025 (04 Apr, Shift 2)',
    question: 'In an electromagnetic system, a quantity defined as the ratio of electric dipole moment and magnetic dipole moment has dimension of $[M^P L^Q T^R A^S]$. The values of $P$ and $Q$ are:',
    options: [
      '$-1, 0$',
      '$-1, 1$',
      '$0, -1$',
      '$0, 1$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Electric dipole moment $[p] = [q d] = [A T L]$.
Magnetic dipole moment $[m] = [I A] = [A L^2]$.
Ratio $\\left[\\frac{p}{m}\\right] = \\frac{[A T L]}{[A L^2]} = [L^{-1} T] = [M^0 L^{-1} T^1 A^0]$.
Thus $P = 0$ and $Q = -1$ (or $0, 1$). Answer is D.`
  },
  {
    qNum: 136,
    exam: 'JEE Main 2025 (04 Apr, Shift 2)',
    question: "Given below are two statements:\nStatement (I): The dimensions of Planck's constant and angular momentum are identical.\nStatement (II): Linear momentum and moment of force have identical dimensions.\nIn the light of the above statements, choose the most appropriate answer:",
    options: [
      'Both Statement (I) and Statement (II) are correct',
      'Both Statement (I) and Statement (II) are incorrect',
      'Statement (I) is correct but Statement (II) is incorrect',
      'Statement (I) is incorrect but Statement (II) is correct'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Planck's constant $[h] = [M L^2 T^{-1}]$ and Angular momentum $[L] = [M L^2 T^{-1}]$ (identical $\\implies$ Statement I is correct).
Linear momentum $[p] = [M L T^{-1}]$ while moment of force $[\\tau] = [M L^2 T^{-2}]$ (not identical $\\implies$ Statement II is incorrect).`
  },
  {
    qNum: 137,
    exam: 'JEE Main 2025 (07 Apr, Shift 1)',
    question: 'If $\\varepsilon_0$ denotes permittivity of free space and $\\Phi_E$ is the flux of electric field through an area, then the dimension of $\\varepsilon_0 \\frac{d\\Phi_E}{dt}$ is same as that of:',
    options: [
      'Electric field',
      'Potential difference',
      'Electric charge',
      'Electric current'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `From Maxwell's equations, displacement current is defined as $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$.
Hence it has the dimension of electric current $[A]$.`
  },
  {
    qNum: 138,
    exam: 'JEE Main 2025 (07 Apr, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Mass density \n(B) Impulse \n(C) Gravitational potential \n(D) Torque \n\nList - II: \n(I) $[M L^2 T^{-2}]$ \n(II) $[L^2 T^{-2}]$ \n(III) $[M L T^{-1}]$ \n(IV) $[M L^{-3}]$',
    options: [
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(IV), (B)-(II), (C)-(III), (D)-(I)',
      '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)',
      '(A)-(III), (B)-(IV), (C)-(II), (D)-(I)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Mass density: $[M L^{-3}] \\to$ (IV)
(B) Impulse: $[M L T^{-1}] \\to$ (III)
(C) Gravitational potential: $[L^2 T^{-2}] \\to$ (II)
(D) Torque: $[M L^2 T^{-2}] \\to$ (I).
Matching: (A)-(IV), (B)-(III), (C)-(II), (D)-(I).`
  },
  {
    qNum: 139,
    exam: 'JEE Main 2025 (07 Apr, Shift 2)',
    question: 'The dimension of $\\sqrt{\\frac{\\mu_0}{\\varepsilon_0}}$ is equal to that of ($\\mu_0$ = vacuum permeability and $\\varepsilon_0$ = vacuum permittivity):',
    options: [
      'Inductance',
      'Capacitance',
      'Conductance',
      'Resistance'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$\\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} = Z_0 \\approx 377\\ \\Omega$ is the characteristic impedance of free space, which has the dimension of electrical resistance.`
  },
  {
    qNum: 140,
    exam: 'JEE Main 2026 (21 Jan, Shift 1)',
    question: 'Consider a modified Bernoulli equation: $\\left(P + \\frac{A}{t^2}\\right) + \\rho g(h + B t) + \\frac{1}{2}\\rho v^2 = \\text{constant}$. If $t$ has the dimension of time, then the dimensions of $A$ and $B$ are respectively:',
    options: [
      '$[M L^{-1} T^0]$ and $[L T^{-1}]$',
      '$[M L^{-1} T^0]$ and $[L T^{-2}]$',
      '$[M L T^{-2}]$ and $[L T^{-1}]$',
      '$[M L^{-1} T^0]$ and $[L T^{-1}]$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[A / t^2] = [P] = [M L^{-1} T^{-2}] \\implies [A] = [M L^{-1} T^{-2}][T^2] = [M L^{-1} T^0]$.
In the term $h + B t$, $[B t] = [h] = [L] \\implies [B] = [L T^{-1}]$.
Hence $[A] = [M L^{-1} T^0]$ and $[B] = [L T^{-1}]$.`
  },
  {
    qNum: 141,
    exam: 'JEE Main 2026 (21 Jan, Shift 2)',
    question: 'Keeping significant figures in view, the sum of the physical quantities $52.01\\text{ m}, 153.2\\text{ m}$ and $0.125\\text{ m}$ is:',
    options: [
      '$205.3\\text{ m}$',
      '$205.335\\text{ m}$',
      '$205.34\\text{ m}$',
      '$205\\text{ m}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Sum = $52.01 + 153.2 + 0.125 = 205.335\\text{ m}$.
The term with the least decimal places is $153.2\\text{ m}$ (one decimal place).
Rounding $205.335$ to one decimal place gives $205.3\\text{ m}$.`
  },
  {
    qNum: 142,
    exam: 'JEE Main 2026 (22 Jan, Shift 1)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Spring constant \n(B) Thermal conductivity \n(C) Viscosity \n(D) Power \n\nList - II: \n(I) $[M L T^{-3} K^{-1}]$ \n(II) $[M T^{-2}]$ \n(III) $[M L^2 T^{-3}]$ \n(IV) $[M L^{-1} T^{-1}]$',
    options: [
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(II), (B)-(IV), (C)-(I), (D)-(III)',
      '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Spring constant: $[M T^{-2}] \\to$ (II)
(B) Thermal conductivity: $[M L T^{-3} K^{-1}] \\to$ (I)
(C) Viscosity: $[M L^{-1} T^{-1}] \\to$ (IV)
(D) Power: $[M L^2 T^{-3}] \\to$ (III).
Matching: (A)-(II), (B)-(I), (C)-(IV), (D)-(III).`
  },
  {
    qNum: 143,
    exam: 'JEE Main 2026 (22 Jan, Shift 2)',
    question: '$\\varepsilon_0, E$ and $t$ represent the free space permittivity, electric field and time respectively, then the unit of $\\frac{\\varepsilon_0 E}{t}$ will be:',
    options: [
      '$\\text{A}/\\text{m}^3$',
      '$\\text{A}\\cdot\\text{m}$',
      '$\\text{A}/\\text{m}^2$',
      '$\\text{A}/\\text{m}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `From Maxwell's displacement current density:
$J_d = \\varepsilon_0 \\frac{\\partial E}{\\partial t}$.
Current density has the SI unit of $\\text{current}/\\text{area} = \\text{A}/\\text{m}^2$.`
  },
  {
    qNum: 144,
    exam: 'JEE Main 2026 (23 Jan, Shift 2)',
    question: 'A ball of radius $r$ and density $\\rho$ dropped through a viscous liquid of density $\\sigma$ and viscosity $\\eta$ attains its terminal velocity at time $t$, given by $t = A \\rho^a r^b \\eta^c \\sigma^d$, where $A$ is a constant and $a, b, c$ and $d$ are integers. The value of $\\frac{b + c}{a + d}$ is:',
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Using dimensional analysis on $t = A \\rho^a r^b \\eta^c \\sigma^d$:
$[T] = [M L^{-3}]^a [L]^b [M L^{-1} T^{-1}]^c [M L^{-3}]^d$.
Powers:
$M: a + c + d = 0 \\implies a + d = -c$.
$T: -c = 1 \\implies c = -1 \\implies a + d = 1$.
$L: -3a + b - c - 3d = 0 \\implies b = 3(a + d) + c = 3(1) - 1 = 2$.
Therefore:
$\\frac{b + c}{a + d} = \\frac{2 + (-1)}{1} = \\frac{1}{1} = 1$.`
  },
  {
    qNum: 145,
    exam: 'JEE Main 2026 (24 Jan, Shift 1)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Magnetic induction \n(B) Magnetic flux \n(C) Magnetic permeability \n(D) Magnetization \n\nList - II: \n(I) $[M L T^{-2} A^{-2}]$ \n(II) $[L^{-1} A]$ \n(III) $[M T^{-2} A^{-1}]$ \n(IV) $[M L^2 T^{-2} A^{-1}]$',
    options: [
      '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)',
      '(A)-(III), (B)-(IV), (C)-(I), (D)-(II)',
      '(A)-(II), (B)-(IV), (C)-(I), (D)-(III)',
      '(A)-(IV), (B)-(III), (C)-(I), (D)-(II)'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Magnetic induction: $[M T^{-2} A^{-1}] \\to$ (III)
(B) Magnetic flux: $[M L^2 T^{-2} A^{-1}] \\to$ (IV)
(C) Permeability: $[M L T^{-2} A^{-2}] \\to$ (I)
(D) Magnetization: $[L^{-1} A] \\to$ (II).
Matching: (A)-(III), (B)-(IV), (C)-(I), (D)-(II).`
  },
  {
    qNum: 146,
    exam: 'JEE Main 2026 (28 Jan, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Coefficient of viscosity \n(B) Surface tension \n(C) Pressure \n(D) Surface energy \n\nList - II: \n(I) $[M L^{-1} T^{-1}]$ \n(II) $[M T^{-2}]$ \n(III) $[M L^{-1} T^{-2}]$ \n(IV) $[M T^{-2}]$',
    options: [
      '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)',
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Viscosity: $[M L^{-1} T^{-1}] \\to$ (I)
(B) Surface tension: $[M T^{-2}] \\to$ (II)
(C) Pressure: $[M L^{-1} T^{-2}] \\to$ (III)
(D) Surface energy (energy/area): $[M T^{-2}] \\to$ (IV).
Matching: (A)-(I), (B)-(II), (C)-(III), (D)-(IV).`
  },
  {
    qNum: 147,
    exam: 'JEE Main 2026 (28 Jan, Shift 2)',
    question: 'The time period of a simple harmonic oscillator is $T = 2\\pi \\sqrt{\\frac{m}{k}}$. Measured value of mass $m$ of the object is $10\\text{ g}$ with an accuracy of $10\\text{ mg}$ and time for $50$ oscillations is found to be $60\\text{ s}$ using a watch of $2\\text{ s}$ resolution. Percentage error in determination of spring constant $k$ is:',
    options: [
      '$7.60\\%$',
      '$3.35\\%$',
      '$3.43\\%$',
      '$6.76\\%$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$T^2 = 4\\pi^2 \\frac{m}{k} \\implies k = 4\\pi^2 \\frac{m}{T^2}$.
$\\frac{\\Delta k}{k} = \\frac{\\Delta m}{m} + 2\\frac{\\Delta T}{T}$.
$\\frac{\\Delta m}{m} = \\frac{10\\text{ mg}}{10\\text{ g}} = \\frac{10 \\times 10^{-3}\\text{ g}}{10\\text{ g}} = 10^{-3} = 0.1\\%$.
$2\\frac{\\Delta T}{T} = 2\\left(\\frac{2\\text{ s}}{60\\text{ s}}\\right) = \\frac{4}{60} = 6.667\\%$.
Total error $= 0.1\\% + 6.667\\% = 6.767\\% \\approx 6.76\\%$.`
  },
  {
    qNum: 148,
    exam: 'JEE Main 2026 (02 Apr, Shift 1)',
    question: 'The dimensional formula of $\\frac{1}{2}\\varepsilon_0 E^2$ ($\\varepsilon_0$ = permittivity of vacuum and $E$ = electric field) is $M^a L^b T^c$. The value of $2a - b + c$ is:',
    options: [
      '$-1$',
      '$1$',
      '$2$',
      '$0$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$\\frac{1}{2}\\varepsilon_0 E^2$ is electrostatic energy density:
$[u] = [M L^{-1} T^{-2}]$.
Therefore $a = 1, b = -1, c = -2$.
$2a - b + c = 2(1) - (-1) + (-2) = 2 + 1 - 2 = 1$.`
  },
  {
    qNum: 149,
    exam: 'JEE Main 2026 (02 Apr, Shift 2)',
    question: "Dimensions of universal gravitational constant $(G)$ in terms of Planck's constant $(h)$, distance $(L)$, mass $(M)$ and time $(T)$ are:",
    options: [
      '$[h^1 T L M^{-2}]$',
      '$[h^1 T^{-1} L M^{-2}]$',
      '$[h^1 T L^{-1} M^{-2}]$',
      '$[h^{-1} T L M^{-1}]$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[G] = [M^{-1} L^3 T^{-2}]$.
Since $[h] = [M L^2 T^{-1}] \\implies [L^2] = [h M^{-1} T]$.
$[G] = [M^{-1} L (h M^{-1} T) T^{-2}] = [h^1 T^{-1} L M^{-2}]$.`
  },
  {
    qNum: 150,
    exam: 'JEE Main 2026 (04 Apr, Shift 2)',
    question: "Match List - I with List - II: \nList - I: \n(A) Planck's constant \n(B) Stopping potential \n(C) Work function \n(D) Momentum \n\nList - II: \n(I) $[M L^2 T^{-1}]$ \n(II) $[M L^2 T^{-3} A^{-1}]$ \n(III) $[M L^2 T^{-2}]$ \n(IV) $[M L T^{-1}]$",
    options: [
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)',
      '(A)-(III), (B)-(I), (C)-(II), (D)-(IV)',
      '(A)-(II), (B)-(I), (C)-(IV), (D)-(III)'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Planck's constant: $[M L^2 T^{-1}] \\to$ (I)
(B) Stopping potential: $[M L^2 T^{-3} A^{-1}] \\to$ (II)
(C) Work function: $[M L^2 T^{-2}] \\to$ (III)
(D) Momentum: $[M L T^{-1}] \\to$ (IV).
Matching: (A)-(I), (B)-(II), (C)-(III), (D)-(IV).`
  },
  {
    qNum: 151,
    exam: 'JEE Main 2026 (05 Apr, Shift 1)',
    question: 'If $L, C$ and $R$ represent inductance, capacitance and resistance respectively, the dimensional formula $[M L^2 T^{-2} A^{-2}]$ corresponds to:',
    options: [
      '$L$',
      '$\\frac{R}{\\sqrt{L C}}$',
      '$\\frac{C}{\\sqrt{L R}}$',
      '$\\frac{L}{R^2 C}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Self-inductance $L$ has dimension:
$[L] = \\frac{[e]}{[dI/dt]} = \\frac{[M L^2 T^{-3} A^{-1}]}{[A T^{-1}]} = [M L^2 T^{-2} A^{-2}]$.
This matches option A ($L$).`
  },
  {
    qNum: 152,
    exam: 'JEE Main 2026 (05 Apr, Shift 2)',
    question: "Match List - I with List - II in terms of Planck's units: \nList - I: \n(A) Meter ($L$) \n(B) Second ($T$) \n(C) Kilogram ($M$) \n(D) Joule ($E$) \n\nList - II: \n(I) $\\sqrt{\\frac{h G}{c^3}}$ \n(II) $\\sqrt{\\frac{h G}{c^5}}$ \n(III) $\\sqrt{\\frac{h c}{G}}$ \n(IV) $\\sqrt{\\frac{h c^5}{G}}$",
    options: [
      '(A)-(I), (B)-(II), (C)-(IV), (D)-(III)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
      '(A)-(II), (B)-(I), (C)-(III), (D)-(IV)',
      '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Planck length $l_p = \\sqrt{\\frac{h G}{c^3}} \\to$ (I)
Planck time $t_p = \\sqrt{\\frac{h G}{c^5}} \\to$ (II)
Planck mass $m_p = \\sqrt{\\frac{h c}{G}} \\to$ (III)
Planck energy $E_p = \\sqrt{\\frac{h c^5}{G}} \\to$ (IV).
Matching: (A)-(I), (B)-(II), (C)-(III), (D)-(IV).`
  },
  {
    qNum: 153,
    exam: 'JEE Main 2026 (06 Apr, Shift 1)',
    question: 'The potential energy of a particle changes with distance $x$ from a fixed origin as $U = \\frac{A x}{x + 3 B}$, where $A$ and $B$ are constants with appropriate dimensions. The dimensions of $A B$ are:',
    options: [
      '$[M L^{5/2} T^{-2}]$',
      '$[M^{3/2} L^{5/2} T^{-2}]$',
      '$[M L T^{-2}]$',
      '$[M L^3 T^{-2}]$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `In the denominator $x + 3B \\implies [3B] = [x] = [L] \\implies [B] = [L]$.
Now $\\frac{x}{x + 3B}$ is dimensionless, so $[A] = [U] = [M L^2 T^{-2}]$.
Therefore:
$[A B] = [M L^2 T^{-2}][L] = [M L^3 T^{-2}]$.`
  },
  {
    qNum: 154,
    exam: 'JEE Main 2026 (06 Apr, Shift 2)',
    question: 'Match List - I with List - II: \nList - I: \n(A) Boltzmann constant \n(B) Stefan constant \n(C) Gravitational constant \n(D) Universal gas constant \n\nList - II: \n(I) $[M^{-1} L^3 T^{-2}]$ \n(II) $[M L^2 T^{-2} K^{-1}]$ \n(III) $[M T^{-3} K^{-4}]$ \n(IV) $[M L^2 T^{-2} \\text{mol}^{-1} K^{-1}]$',
    options: [
      '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)',
      '(A)-(III), (B)-(II), (C)-(I), (D)-(IV)',
      '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)',
      '(A)-(II), (B)-(I), (C)-(III), (D)-(IV)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `(A) Boltzmann constant: $[M L^2 T^{-2} K^{-1}] \\to$ (II)
(B) Stefan constant $\\sigma: [M T^{-3} K^{-4}] \\to$ (III)
(C) Gravitational constant $G: [M^{-1} L^3 T^{-2}] \\to$ (I)
(D) Gas constant $R: [M L^2 T^{-2} \\text{mol}^{-1} K^{-1}] \\to$ (IV).
Matching: (A)-(II), (B)-(III), (C)-(I), (D)-(IV).`
  },
  {
    qNum: 155,
    exam: 'JEE Main 2026 (06 Apr, Shift 2)',
    question: 'The percentage error in the calculated volume of a sphere, if there is $2\\%$ error in its diameter measurement, is:',
    options: [
      '$2\\%$',
      '$4\\%$',
      '$6\\%$',
      '$8\\%$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Volume of sphere $V = \\frac{4}{3}\\pi r^3 = \\frac{\\pi}{6} D^3$.
Percentage error in $V$:
$\\frac{\\Delta V}{V} \\times 100\\% = 3 \\left(\\frac{\\Delta D}{D} \\times 100\\%\\right) = 3 \\times 2\\% = 6\\%$.`
  },
  {
    qNum: 156,
    exam: 'JEE Main 2026 (08 Apr, Shift 2)',
    question: 'A new unit $(\\alpha)$ of length is chosen such that it is equal to the distance covered by light in vacuum in $1\\text{ s}$. What is the distance between Venus and Earth in terms of $\\alpha$ units if light takes $6\\text{ min } 40\\text{ s}$ to cover this distance?',
    options: [
      '$200$',
      '$400$',
      '$3000$',
      '$5000$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Time $t = 6\\text{ min } 40\\text{ s} = 6 \\times 60 + 40 = 400\\text{ s}$.
Since $1\\ \\alpha = c \\times (1\\text{ s})$, the distance covered by light in $400\\text{ s}$ is:
$d = c \\times 400\\text{ s} = 400\\ \\alpha$.`
  },
  {
    qNum: 157,
    exam: 'JEE Main 2026 (08 Apr, Shift 2)',
    question: 'Consider the equation $H = \\frac{x^p \\varepsilon^q E^r}{t^s}$ where $H$ = magnetic field intensity, $E$ = electric field, $\\varepsilon$ = permittivity, $x$ = distance, $t$ = time. The values of $p, q, r$ and $s$ respectively are:',
    options: [
      '$1, 1, 1, 1$',
      '$1, 1, 2, 1$',
      '$1, -1, -2, 1$',
      '$3, 2, -2, 1$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `$[H] = [L^{-1} A]$
$[x] = [L]$
$[\\varepsilon] = [M^{-1} L^{-3} T^4 A^2]$
$[E] = [M L T^{-3} A^{-1}]$
$[t] = [T]$.
Equating powers of $M, L, T, A$:
$M: -q + r = 0 \\implies q = r$.
$A: 2q - r = 1 \\implies 2q - q = 1 \\implies q = 1 \\implies r = 1$.
$L: p - 3q + r = -1 \\implies p - 3(1) + 1 = -1 \\implies p = 1$.
$T: 4q - 3r - s = 0 \\implies 4(1) - 3(1) - s = 0 \\implies s = 1$.
Thus $p = 1, q = 1, r = 1, s = 1$.`
  }
];
