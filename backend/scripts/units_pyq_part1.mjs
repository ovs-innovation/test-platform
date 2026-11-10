// NEET Units & Measurement PYQ Part 1: Q1 to Q41

export const PART1_QUESTIONS = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: "Consider that $\\sigma_s, k_B, b$ represents Stefan-Boltzmann constant, Boltzmann constant and Wien's displacement law constant, respectively. The dimension of $\\sigma_s k_B^{-1} b$ is",
    options: [
      "[\\text{L}^{-1}\\text{T}^{-1}\\text{K}^{-4}]",
      "[\\text{L}^{-1}\\text{T}^{-1}\\text{K}^{-2}]",
      "[\\text{L}^{-1}\\text{K}^{-2}]",
      "[\\text{L}^{-1}\\text{T}^{-1}\\text{K}^{-3}]"
    ],
    correctIndex: 1,
    solution: "1. Stefan-Boltzmann constant $\\sigma_s$:\n$$E = \\sigma_s A T^4 t \\implies \\sigma_s = \\frac{E}{A T^4 t} = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{L}^2][\\text{K}^4][\\text{T}]} = [\\text{MT}^{-3}\\text{K}^{-4}]$$\n\n2. Boltzmann constant $k_B$:\n$$E = k_B T \\implies k_B = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{K}]} = [\\text{ML}^2\\text{T}^{-2}\\text{K}^{-1}]$$\n\n3. Wien's displacement constant $b$:\n$$\\lambda_{\\max} T = b \\implies [b] = [\\text{LK}]$$\n\n4. Combining the dimensions for $\\sigma_s k_B^{-1} b$:\n$$[\\sigma_s k_B^{-1} b] = \\frac{[\\text{MT}^{-3}\\text{K}^{-4}][\\text{LK}]}{[\\text{ML}^2\\text{T}^{-2}\\text{K}^{-1}]} = [\\text{L}^{-1}\\text{T}^{-1}\\text{K}^{-2}]$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: "One main scale division of a Vernier calliper is equal to $1\\text{ mm}$ and the number of divisions on the Vernier scale is $10$. When both the jaws touch each other, the Vernier scale shifts to the left of zero of the main scale in such a way that $4^{\\text{th}}$ Vernier division coincides with a division of the main scale. If this Vernier calliper measures the length of the wire to be $1\\text{ cm}$, the actual length of the wire is :",
    options: [
      "1.04 cm",
      "0.60 cm",
      "0.96 cm",
      "1.00 cm"
    ],
    correctIndex: 0,
    solution: "1. Least count of the Vernier calliper:\n$$\\text{LC} = \\frac{1\\text{ MSD}}{10} = \\frac{1\\text{ mm}}{10} = 0.1\\text{ mm} = 0.01\\text{ cm}$$\n\n2. Since the Vernier zero lies to the left of the main scale zero when jaws touch, the instrument possesses a negative zero error:\n$$\\text{Zero error} = -0.04\\text{ cm}$$\n\n3. Correct reading:\n$$\\text{Actual length} = \\text{Observed reading} - (\\text{Zero error}) = 1.00\\text{ cm} - (-0.04\\text{ cm}) = 1.04\\text{ cm}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 3,
    exam: 'NEET 2026',
    question: "The speed of light in vacuum is taken as unity. If light takes $6\\text{ min } 40\\text{ s}$ to reach the Earth from the Sun, the distance between the Sun and the Earth in new unit is:",
    options: [
      "3 \\times 10^8",
      "500",
      "3 \\times 10^{10}",
      "400"
    ],
    correctIndex: 3,
    solution: "Time taken by light to travel from Sun to Earth:\n$$t = 6\\text{ min } 40\\text{ s} = (6 \\times 60 + 40)\\text{ s} = 360 + 40 = 400\\text{ s}$$\n\nIn the new system of units, speed of light $c = 1\\text{ unit/s}$.\nTherefore, the distance is:\n$$d = c \\times t = 1 \\times 400 = 400\\text{ units}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 4,
    exam: 'NEET 2026',
    question: "Each side of a metallic cube of mass $5.580\\text{ kg}$ is measured to the $9.0\\text{ cm}$. Keeping the significant figures in view, the density of the material of the cube can be best expressed as $X \\times 10^3\\text{ kg m}^{-3}$ where the value of $X$ is:",
    options: [
      "7.654",
      "7.6",
      "7.65",
      "7.7"
    ],
    correctIndex: 3,
    solution: "Given:\n- Mass $m = 5.580\\text{ kg}$ (4 significant figures)\n- Side length $l = 9.0\\text{ cm} = 0.090\\text{ m}$ (2 significant figures)\n\nVolume of the cube:\n$$V = l^3 = (0.090\\text{ m})^3 = 7.29 \\times 10^{-4}\\text{ m}^3$$\n\nDensity:\n$$\\rho = \\frac{m}{V} = \\frac{5.580\\text{ kg}}{7.29 \\times 10^{-4}\\text{ m}^3} \\approx 7.6543 \\times 10^3\\text{ kg m}^{-3}$$\n\nSince the measured length $9.0\\text{ cm}$ has only 2 significant figures, the calculated density must also be rounded off to 2 significant figures:\n$$X = 7.7$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 5,
    exam: 'NEET 2026',
    question: "In a vernier calliper, 20 VSD coincide with 16 MSD (each division of length $1\\text{ mm}$). The least count of the vernier callipers is:",
    options: [
      "0.2 cm",
      "0.01 cm",
      "0.02 cm",
      "0.1 cm"
    ],
    correctIndex: 2,
    solution: "Given that $20\\text{ VSD} = 16\\text{ MSD}$:\n$$1\\text{ VSD} = \\frac{16}{20}\\text{ MSD} = 0.8\\text{ MSD}$$\n\nGiven $1\\text{ MSD} = 1\\text{ mm}$.\n\nLeast count:\n$$\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = (1 - 0.8)\\text{ MSD} = 0.2\\text{ mm} = 0.02\\text{ cm}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 6,
    exam: 'NEET 2025',
    question: "A balloon is made of a material of surface tension $S$ and its inflation outlet (from where gas is filled in it) has small area $A$. It is filled with a gas of density $\\rho$ and takes a spherical shape of radius $R$. When the gas is allowed to flow freely out of it, its radius $r$ changes from $R$ to $0$ (zero) in time $T$. If the speed $v(r)$ of gas coming out of the balloon depends on $r$ as $r^a$ and $T \\propto S^\\alpha A^\\beta \\rho^\\gamma R^\\delta$ then",
    options: [
      "a = -\\frac{1}{2}, \\alpha = -\\frac{1}{2}, \\beta = -1, \\gamma = \\frac{1}{2}, \\delta = \\frac{7}{2}",
      "a = \\frac{1}{2}, \\alpha = \\frac{1}{2}, \\beta = -\\frac{1}{2}, \\gamma = \\frac{1}{2}, \\delta = \\frac{7}{2}",
      "a = \\frac{1}{2}, \\alpha = \\frac{1}{2}, \\beta = -1, \\gamma = +1, \\delta = \\frac{3}{2}",
      "a = -\\frac{1}{2}, \\alpha = -\\frac{1}{2}, \\beta = -1, \\gamma = -\\frac{1}{2}, \\delta = \\frac{5}{2}"
    ],
    correctIndex: 0,
    solution: "1. The excess pressure inside the balloon is $\\Delta P = \\frac{2S}{r}$.\nBy Torricelli's theorem, efflux velocity $v(r) = \\sqrt{\\frac{2\\Delta P}{\\rho}} = \\sqrt{\\frac{4S}{\\rho r}} \\propto r^{-1/2}$. Hence $a = -1/2$.\n\n2. Conservation of volume / rate of volume efflux:\n$$-\\frac{dV}{dt} = A v(r) \\implies -4\\pi r^2 \\frac{dr}{dt} = A k \\sqrt{\\frac{S}{\\rho}} r^{-1/2}$$\n$$-r^{5/2} dr \\propto \\frac{A}{4\\pi} \\sqrt{\\frac{S}{\\rho}} dt$$\n\nIntegrating from $r = R$ to $0$:\n$$\\int_0^R r^{5/2} dr \\propto A S^{1/2} \\rho^{-1/2} T \\implies \\frac{2}{7} R^{7/2} \\propto A S^{1/2} \\rho^{-1/2} T$$\n$$T \\propto S^{-1/2} A^{-1} \\rho^{1/2} R^{7/2}$$\n\nComparing with $T \\propto S^\\alpha A^\\beta \\rho^\\gamma R^\\delta$:\n$$\\alpha = -\\frac{1}{2},\\; \\beta = -1,\\; \\gamma = \\frac{1}{2},\\; \\delta = \\frac{7}{2}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 7,
    exam: 'NEET 2025',
    question: "A physical quantity $P$ is related to four observations $a, b, c$ and $d$ as follows:\n$$P = \\frac{a^3 b^2}{c \\sqrt{d}}$$\nThe percentage errors of measurement in $a, b, c$ and $d$ are $1\\%, 3\\%, 2\\%$, and $4\\%$ respectively. The percentage error in the quantity $P$ is",
    options: [
      "13%",
      "15%",
      "10%",
      "2%"
    ],
    correctIndex: 0,
    solution: "Using the formula for propagation of percentage error:\n$$\\frac{\\Delta P}{P} \\times 100 = 3\\left(\\frac{\\Delta a}{a}\\times 100\\right) + 2\\left(\\frac{\\Delta b}{b}\\times 100\\right) + 1\\left(\\frac{\\Delta c}{c}\\times 100\\right) + \\frac{1}{2}\\left(\\frac{\\Delta d}{d}\\times 100\\right)$$\n\nSubstitute the given values:\n$$= 3(1\\%) + 2(3\\%) + 1(2\\%) + \\frac{1}{2}(4\\%)\n= 3 + 6 + 2 + 2 = 13\\%$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 8,
    exam: 'NEET 2025',
    question: "Consider the diameter of a spherical object being measured with the help of a Vernier callipers. Suppose its 10 Vernier Scale Divisions (V.S.D.) are equal to its 9 Main Scale Divisions (M.S.D.). The least division in the M.S. is $0.1\\text{ cm}$ and the zero of V.S. is at $x = 0.1\\text{ cm}$ when the jaws of Vernier callipers are closed. If the main scale reading for the diameter is $M = 5\\text{ cm}$ and the number of coinciding vernier division is 8, the measured diameter after zero error correction, is",
    options: [
      "4.98 cm",
      "5.00 cm",
      "5.18 cm",
      "5.08 cm"
    ],
    correctIndex: 0,
    solution: "1. Least count (LC):\n$$\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = 0.1\\text{ cm} - \\frac{9}{10}(0.1\\text{ cm}) = 0.01\\text{ cm}$$\n\n2. When jaws are closed, zero of VS is at $x = 0.1\\text{ cm}$ (positive zero error):\n$$\\text{Zero error} = +0.10\\text{ cm}$$\n\n3. Observed reading:\n$$\\text{Observed} = \\text{MSR} + (\\text{VSR} \\times \\text{LC}) = 5\\text{ cm} + (8 \\times 0.01\\text{ cm}) = 5.08\\text{ cm}$$\n\n4. Corrected reading:\n$$\\text{True diameter} = \\text{Observed} - (\\text{Zero error}) = 5.08\\text{ cm} - 0.10\\text{ cm} = 4.98\\text{ cm}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 9,
    exam: 'NEET 2024 (Re-Examination)',
    question: "In an electrical circuit, the voltage is measured as $V = (200 \\pm 4)\\text{ volt}$ and the current is measured as $I = (20 \\pm 0.2)\\text{ A}$. The value of the resistance is:",
    options: [
      "(10 \\pm 4.2)\\,\\Omega",
      "(10 \\pm 0.3)\\,\\Omega",
      "(10 \\pm 0.1)\\,\\Omega",
      "(10 \\pm 0.8)\\,\\Omega"
    ],
    correctIndex: 1,
    solution: "By Ohm's law:\n$$R = \\frac{V}{I} = \\frac{200}{20} = 10\\,\\Omega$$\n\nRelative error in $R$:\n$$\\frac{\\Delta R}{R} = \\frac{\\Delta V}{V} + \\frac{\\Delta I}{I} = \\frac{4}{200} + \\frac{0.2}{20} = 0.02 + 0.01 = 0.03$$\n\nAbsolute error in $R$:\n$$\\Delta R = 10 \\times 0.03 = 0.3\\,\\Omega$$\n\nTherefore:\n$$R = (10 \\pm 0.3)\\,\\Omega$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 10,
    exam: 'NEET 2024 (Re-Examination)',
    question: "The pitch of an error free screw gauge is $1\\text{ mm}$ and there are 100 divisions on the circular scale. While measuring the diameter of a thick wire, the pitch scale reads $1\\text{ mm}$ and $63^{\\text{rd}}$ division on the circular scale coincides with the reference line. The diameter of the wire is:",
    options: [
      "1.63 cm",
      "0.163 cm",
      "0.163 m",
      "1.63 m"
    ],
    correctIndex: 1,
    solution: "Least count of the screw gauge:\n$$\\text{LC} = \\frac{\\text{Pitch}}{\\text{Total circular divisions}} = \\frac{1\\text{ mm}}{100} = 0.01\\text{ mm}$$\n\nDiameter of the wire:\n$$\\text{Diameter} = \\text{Pitch scale reading} + (\\text{Circular scale reading} \\times \\text{LC})$$\n$$= 1\\text{ mm} + (63 \\times 0.01\\text{ mm}) = 1\\text{ mm} + 0.63\\text{ mm} = 1.63\\text{ mm}$$\n\nIn centimetres:\n$$1.63\\text{ mm} = 0.163\\text{ cm}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 11,
    exam: 'NEET 2024 (Re-Examination)',
    question: "The potential energy of a particle moving along $x$-direction varies as $V = \\frac{Ax^2}{\\sqrt{x} + B}$. The dimensions of $\\frac{A^2}{B}$ are:",
    options: [
      "[\\text{M}^{3/2} \\text{L}^{1/2} \\text{T}^{-3}]",
      "[\\text{M}^{1/2} \\text{LT}^{-3}]",
      "[\\text{M}^2 \\text{L}^{1/2} \\text{T}^{-4}]",
      "[\\text{ML}^2 \\text{T}^{-4}]"
    ],
    correctIndex: 2,
    solution: "1. By principle of homogeneity, terms added must have same dimensions:\n$$[B] = [\\sqrt{x}] = [\\text{L}^{1/2}]$$\n\n2. Dimensional formula of potential energy $V$ is $[\\text{ML}^2\\text{T}^{-2}]$.\n$$[V] = \\frac{[A][x^2]}{[\\sqrt{x}]} = \\frac{[A][\\text{L}^2]}{[\\text{L}^{1/2}]} = [A][\\text{L}^{3/2}]$$\n$$[A] = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{L}^{3/2}]} = [\\text{ML}^{1/2}\\text{T}^{-2}]$$\n\n3. Dimension of $A^2$:\n$$[A^2] = [\\text{M}^2\\text{L}\\text{T}^{-4}]$$\n\n4. Dimension of $\\frac{A^2}{B}$:\n$$\\left[\\frac{A^2}{B}\\right] = \\frac{[\\text{M}^2\\text{L}\\text{T}^{-4}]}{[\\text{L}^{1/2}]} = [\\text{M}^2\\text{L}^{1/2}\\text{T}^{-4}]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 12,
    exam: 'NEET 2024',
    question: "In a vernier callipers, $(N + 1)$ divisions of vernier scale coincide with $N$ divisions of main scale. If $1\\text{ MSD}$ represents $0.1\\text{ mm}$, the vernier constant (in $\\text{cm}$) is:",
    options: [
      "\\frac{1}{10N}",
      "\\frac{1}{100(N+1)}",
      "100 N",
      "10(N + 1)"
    ],
    correctIndex: 1,
    solution: "Given that $(N + 1)\\text{ VSD} = N\\text{ MSD}$:\n$$1\\text{ VSD} = \\frac{N}{N + 1}\\text{ MSD}$$\n\nVernier constant (Least count):\n$$\\text{VC} = 1\\text{ MSD} - 1\\text{ VSD} = \\left(1 - \\frac{N}{N + 1}\\right)\\text{ MSD} = \\frac{1}{N + 1}\\text{ MSD}$$\n\nGiven $1\\text{ MSD} = 0.1\\text{ mm} = 0.01\\text{ cm} = \\frac{1}{100}\\text{ cm}$:\n$$\\text{VC} = \\frac{1}{100(N + 1)}\\text{ cm}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 13,
    exam: 'NEET 2024',
    question: "The quantities which have the same dimensions as those of solid angle are:",
    options: [
      "strain and angle",
      "stress and angle",
      "strain and arc",
      "angular speed and stress"
    ],
    correctIndex: 0,
    solution: "Solid angle $\\Omega = \\frac{A}{r^2}$ is a dimensionless quantity ($[\\text{M}^0\\text{L}^0\\text{T}^0]$).\n- Strain $= \\frac{\\Delta L}{L}$ is dimensionless ($[\\text{M}^0\\text{L}^0\\text{T}^0]$).\n- Plane angle $\\theta = \\frac{s}{r}$ is dimensionless ($[\\text{M}^0\\text{L}^0\\text{T}^0]$).\n\nBoth strain and angle are dimensionless, exactly like solid angle.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 14,
    exam: 'NEET 2024',
    question: "A force defined by $F = \\alpha t^2 + \\beta t$ acts on a particle at a given time $t$. The factor which is dimensionless, if $\\alpha$ and $\\beta$ are constants, is:",
    options: [
      "\\beta t/\\alpha",
      "\\alpha t/\\beta",
      "\\alpha \\beta t",
      "\\alpha \\beta/t"
    ],
    correctIndex: 1,
    solution: "From principle of homogeneity, both terms have the dimensions of force:\n$$[\\alpha t^2] = [F] \\implies [\\alpha] = [F][\\text{T}^{-2}]$$\n$$[\\beta t] = [F] \\implies [\\beta] = [F][\\text{T}^{-1}]$$\n\nNow, test $\\frac{\\alpha t}{\\beta}$:\n$$\\left[\\frac{\\alpha t}{\\beta}\\right] = \\frac{[F][\\text{T}^{-2}][\\text{T}]}{[F][\\text{T}^{-1}]} = \\frac{[F][\\text{T}^{-1}]}{[F][\\text{T}^{-1}]} = [\\text{M}^0\\text{L}^0\\text{T}^0]$$\n\nThus, $\\frac{\\alpha t}{\\beta}$ is dimensionless.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 15,
    exam: 'NEET 2023 Manipur',
    question: "The diameter of a spherical bob, when measured with vernier callipers yielded the following values : $3.33\\text{ cm}, 3.32\\text{ cm}, 3.34\\text{ cm}, 3.33\\text{ cm}$ and $3.32\\text{ cm}$. The mean diameter to appropriate significant figures is :",
    options: [
      "3.328 cm",
      "3.3 cm",
      "3.33 cm",
      "3.32 cm"
    ],
    correctIndex: 2,
    solution: "Mean value:\n$$\\bar{d} = \\frac{3.33 + 3.32 + 3.34 + 3.33 + 3.32}{5} = \\frac{16.64}{5} = 3.328\\text{ cm}$$\n\nSince each individual measurement has two decimal places (three significant figures), the mean must be rounded to two decimal places:\n$$3.328\\text{ cm} \\approx 3.33\\text{ cm}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 16,
    exam: 'NEET 2023 Manipur',
    question: "The mechanical quantity, which has dimensions of reciprocal of mass ($\\text{M}^{-1}$) is :",
    options: [
      "angular momentum",
      "coefficient of thermal conductivity",
      "torque",
      "gravitational constant"
    ],
    correctIndex: 3,
    solution: "Universal gravitational constant $G$ from Newton's law:\n$$F = \\frac{G m_1 m_2}{r^2} \\implies G = \\frac{F r^2}{m_1 m_2}$$\n$$[G] = \\frac{[\\text{MLT}^{-2}][\\text{L}^2]}{[\\text{M}^2]} = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$$\n\nTherefore, gravitational constant has dimensions of reciprocal of mass ($\\text{M}^{-1}$).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 17,
    exam: 'NEET 2023',
    question: "The errors in the measurement which arise due to unpredictable fluctuations in temperature and voltage supply are :",
    options: [
      "Personal errors",
      "Least count errors",
      "Random errors",
      "Instrumental errors"
    ],
    correctIndex: 2,
    solution: "Random errors are those that occur irregularly and are caused by unpredictable fluctuations in experimental conditions such as ambient temperature, voltage supply, vibrations, etc.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 18,
    exam: 'NEET 2023',
    question: "A metal wire has mass $(0.4 \\pm 0.002)\\text{ g}$, radius $(0.3 \\pm 0.001)\\text{ mm}$ and length $(5 \\pm 0.02)\\text{ cm}$. The maximum possible percentage error in the measurement of density will nearly be :",
    options: [
      "1.3%",
      "1.6%",
      "1.4%",
      "1.2%"
    ],
    correctIndex: 1,
    solution: "Density of the cylindrical wire:\n$$\\rho = \\frac{m}{\\pi r^2 l}$$\n\nMaximum percentage error:\n$$\\frac{\\Delta \\rho}{\\rho}\\times 100 = \\left(\\frac{\\Delta m}{m} + 2\\frac{\\Delta r}{r} + \\frac{\\Delta l}{l}\\right)\\times 100$$\n\nCalculating individual fractional errors:\n- $\\frac{\\Delta m}{m} = \\frac{0.002}{0.4} = 0.005$\n- $2\\frac{\\Delta r}{r} = 2 \\times \\frac{0.001}{0.3} = \\frac{0.002}{0.3} \\approx 0.00667$\n- $\\frac{\\Delta l}{l} = \\frac{0.02}{5} = 0.004$\n\nSum of errors:\n$$\\frac{\\Delta \\rho}{\\rho} = 0.005 + 0.00667 + 0.004 = 0.01567$$\n$$\\text{Percentage error} = 0.01567 \\times 100\\% \\approx 1.57\\% \\approx 1.6\\%$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 19,
    exam: 'NEET 2022 Phase 2',
    question: "The physical quantity that has the same dimensional formula as pressure is",
    options: [
      "Coefficient of viscosity",
      "Force",
      "Momentum",
      "Young's modulus of elasticity"
    ],
    correctIndex: 3,
    solution: "Pressure is force per unit area:\n$$[P] = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2]} = [\\text{ML}^{-1}\\text{T}^{-2}]$$\n\nYoung's modulus is tensile stress divided by longitudinal strain:\n$$[Y] = \\frac{[\\text{Stress}]}{[\\text{Strain}]} = \\frac{[\\text{ML}^{-1}\\text{T}^{-2}]}{1} = [\\text{ML}^{-1}\\text{T}^{-2}]$$\n\nThus, Young's modulus of elasticity has the same dimensions as pressure.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 20,
    exam: 'NEET 2022 Phase 2',
    question: "The percentage error in the measurement of g is : (Given that $g = \\frac{4\\pi^2 L}{T^2}, L = (10 \\pm 0.1)\\text{ cm}, T = (100 \\pm 1)\\text{ s}$)",
    options: [
      "7%",
      "2%",
      "5%",
      "3%"
    ],
    correctIndex: 3,
    solution: "Given $g = \\frac{4\\pi^2 L}{T^2}$:\n$$\\frac{\\Delta g}{g}\\times 100 = \\left(\\frac{\\Delta L}{L} + 2\\frac{\\Delta T}{T}\\right)\\times 100$$\n\nSubstitute given values:\n$$= \\left(\\frac{0.1}{10} + 2\\times \\frac{1}{100}\\right)\\times 100 = (0.01 + 0.02)\\times 100 = 3\\%$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 21,
    exam: 'NEET 2022 Phase 1',
    question: "The dimensions $[\\text{MLT}^{-2}\\text{A}^{-2}]$ belong to the",
    options: [
      "Magnetic flux",
      "Self inductance",
      "Magnetic permeability",
      "Electric permittivity"
    ],
    correctIndex: 2,
    solution: "The magnetic force between two parallel long straight currents per unit length is:\n$$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d} \\implies \\mu_0 = \\frac{2\\pi d (F/L)}{I_1 I_2}$$\n$$[\\mu_0] = \\frac{[\\text{L}][\\text{MLT}^{-2}\\text{L}^{-1}]}{[\\text{A}^2]} = [\\text{MLT}^{-2}\\text{A}^{-2}]$$\n\nThus, $[\\text{MLT}^{-2}\\text{A}^{-2}]$ is the dimension of magnetic permeability ($\\mu_0$).\n\nHence, the correct option is (C)."
  },
  {
    qNum: 22,
    exam: 'NEET 2022 Phase 1',
    question: "Plane angle and solid angle have",
    options: [
      "Units but no dimensions",
      "Dimensions but no units",
      "No units and no dimensions",
      "Both units and dimensions"
    ],
    correctIndex: 0,
    solution: "Plane angle has the SI unit radian ($\\text{rad}$) and solid angle has the SI unit steradian ($\\text{sr}$). Both are ratios of length/length or area/area$^2$, making them dimensionless ($[\\text{M}^0\\text{L}^0\\text{T}^0]$).\n\nHence, they possess units but no dimensions. Correct option is (A)."
  },
  {
    qNum: 23,
    exam: 'NEET 2022 Phase 1',
    question: "The area of a rectangular field (in $\\text{m}^2$) of length $55.3\\text{ m}$ and breadth $25\\text{ m}$ after rounding off the value for correct significant digits is",
    options: [
      "138 \\times 10^1",
      "1382",
      "1382.5",
      "14 \\times 10^2"
    ],
    correctIndex: 3,
    solution: "Calculated area:\n$$\\text{Area} = 55.3\\text{ m} \\times 25\\text{ m} = 1382.5\\text{ m}^2$$\n\nIn multiplication, the product must be rounded to the same number of significant figures as the term with the fewest significant figures.\nHere, $25\\text{ m}$ has 2 significant figures.\nRounding $1382.5$ to 2 significant figures gives:\n$$1400\\text{ m}^2 = 14 \\times 10^2\\text{ m}^2$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 24,
    exam: 'NEET 2021',
    question: "If E and G respectively denote energy and gravitational constant, then $\\frac{E}{G}$ has the dimensions of :",
    options: [
      "[\\text{M}^2]\\,[\\text{L}^{-2}]\\,[\\text{T}^{-1}]",
      "[\\text{M}^2]\\,[\\text{L}^{-1}]\\,[\\text{T}^0]",
      "[\\text{M}]\\,[\\text{L}^{-1}]\\,[\\text{T}^{-1}]",
      "[\\text{M}]\\,[\\text{L}^0]\\,[\\text{T}^0]"
    ],
    correctIndex: 1,
    solution: "Dimensions of energy $E$:\n$$[E] = [\\text{ML}^2\\text{T}^{-2}]$$\n\nDimensions of universal gravitational constant $G$:\n$$[G] = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$$\n\nRatio $\\frac{E}{G}$:\n$$\\left[\\frac{E}{G}\\right] = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]} = [\\text{M}^2\\text{L}^{-1}\\text{T}^0]$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 25,
    exam: 'NEET 2021',
    question: "A screw gauge gives the following readings when used to measure the diameter of a wire\nMain scale reading : $0\\text{ mm}$\nCircular scale reading : 52 divisions\nGiven that $1\\text{ mm}$ on main scale corresponds to 100 divisions on the circular scale. The diameter of the wire from the above data is :",
    options: [
      "0.052 cm",
      "0.52 cm",
      "0.026 cm",
      "0.26 cm"
    ],
    correctIndex: 0,
    solution: "Least count of screw gauge:\n$$\\text{LC} = \\frac{1\\text{ mm}}{100} = 0.01\\text{ mm}$$\n\nMeasured diameter:\n$$\\text{Reading} = \\text{MSR} + (\\text{CSR} \\times \\text{LC}) = 0\\text{ mm} + (52 \\times 0.01\\text{ mm}) = 0.52\\text{ mm}$$\n\nIn centimetres:\n$$0.52\\text{ mm} = 0.052\\text{ cm}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 26,
    exam: 'NEET 2021',
    question: "If force $[\\text{F}]$, acceleration $[\\text{A}]$ and time $[\\text{T}]$ are chosen as the fundamental physical quantities. Find the dimensions of energy.",
    options: [
      "[\\text{F}]\\,[\\text{A}^{-1}]\\,[\\text{T}]",
      "[\\text{F}]\\,[\\text{A}]\\,[\\text{T}]",
      "[\\text{F}]\\,[\\text{A}]\\,[\\text{T}^2]",
      "[\\text{F}]\\,[\\text{A}]\\,[\\text{T}^{-1}]"
    ],
    correctIndex: 2,
    solution: "Energy is work done:\n$$\\text{Energy} = \\text{Force} \\times \\text{Displacement}$$\n\nFrom kinematics:\n$$\\text{Displacement} = \\text{Acceleration} \\times \\text{Time}^2 \\implies [\\text{L}] = [\\text{AT}^2]$$\n\nTherefore:\n$$[\\text{Energy}] = [\\text{F}][\\text{L}] = [\\text{F}][\\text{AT}^2] = [\\text{FAT}^2]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 27,
    exam: 'NEET 2020 Phase 2',
    question: "Time intervals measured by a clock give the following readings :\n$1.25\\text{ s}, 1.24\\text{ s}, 1.27\\text{ s}, 1.21\\text{ s}$ and $1.28\\text{ s}$\nWhat is the percentage relative error of the observations?",
    options: [
      "1.6%",
      "2%",
      "4%",
      "16%"
    ],
    correctIndex: 0,
    solution: "1. Mean value:\n$$t_{\\text{mean}} = \\frac{1.25 + 1.24 + 1.27 + 1.21 + 1.28}{5} = \\frac{6.25}{5} = 1.25\\text{ s}$$\n\n2. Absolute errors:\n$$|1.25 - 1.25| = 0.00\\text{ s}$$\n$$|1.24 - 1.25| = 0.01\\text{ s}$$\n$$|1.27 - 1.25| = 0.02\\text{ s}$$\n$$|1.21 - 1.25| = 0.04\\text{ s}$$\n$$|1.28 - 1.25| = 0.03\\text{ s}$$\n\n3. Mean absolute error:\n$$\\overline{\\Delta t} = \\frac{0.00 + 0.01 + 0.02 + 0.04 + 0.03}{5} = \\frac{0.10}{5} = 0.02\\text{ s}$$\n\n4. Percentage relative error:\n$$\\frac{\\overline{\\Delta t}}{t_{\\text{mean}}} \\times 100\\% = \\frac{0.02}{1.25} \\times 100\\% = 1.6\\%$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 28,
    exam: 'NEET 2020 Phase 2',
    question: "The angle of $1'$ (minute of arc) in radian is nearly equal to",
    options: [
      "1.75 \\times 10^{-2}\\text{ rad}",
      "2.91 \\times 10^{-4}\\text{ rad}",
      "4.85 \\times 10^{-4}\\text{ rad}",
      "4.80 \\times 10^{-6}\\text{ rad}"
    ],
    correctIndex: 1,
    solution: "We know that:\n$$360^\\circ = 2\\pi\\text{ rad} \\implies 1^\\circ = \\frac{\\pi}{180}\\text{ rad} = \\frac{3.1416}{180} \\approx 1.745 \\times 10^{-2}\\text{ rad}$$\n\nSince $1^\\circ = 60'$:\n$$1' = \\frac{1^\\circ}{60} = \\frac{1.745 \\times 10^{-2}}{60}\\text{ rad} \\approx 2.91 \\times 10^{-4}\\text{ rad}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 29,
    exam: 'NEET 2020 Phase 1',
    question: "A screw gauge has least count of $0.01\\text{ mm}$ and there are 50 divisions in its circular scale. The pitch of the screw gauge is :",
    options: [
      "0.25 mm",
      "0.5 mm",
      "1.0 mm",
      "0.01 mm"
    ],
    correctIndex: 1,
    solution: "Least count is given by:\n$$\\text{LC} = \\frac{\\text{Pitch}}{\\text{Number of circular scale divisions}}$$\n$$\\text{Pitch} = \\text{LC} \\times \\text{Number of circular scale divisions} = 0.01\\text{ mm} \\times 50 = 0.5\\text{ mm}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 30,
    exam: 'NEET 2020 Phase 1',
    question: "Taking into account of the significant figures, what is the value of $9.99\\text{ m} - 0.0099\\text{ m}$?",
    options: [
      "9.98 m",
      "9.980 m",
      "9.9 m",
      "9.9801 m"
    ],
    correctIndex: 0,
    solution: "Subtracting the two values:\n$$9.99\\text{ m} - 0.0099\\text{ m} = 9.9801\\text{ m}$$\n\nIn addition or subtraction, the final result should retain as many decimal places as there are in the number with the least decimal places.\nHere, $9.99\\text{ m}$ has 2 decimal places, while $0.0099\\text{ m}$ has 4 decimal places.\nRounding to 2 decimal places gives:\n$$9.98\\text{ m}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 31,
    exam: 'NEET 2020 Phase 1',
    question: "Dimensions of stress are :",
    options: [
      "[\\text{ML}^2\\text{T}^{-2}]",
      "[\\text{ML}^0\\text{T}^{-2}]",
      "[\\text{ML}^{-1}\\text{T}^{-2}]",
      "[\\text{ML}\\text{T}^{-2}]"
    ],
    correctIndex: 2,
    solution: "Stress is restoring force per unit area:\n$$\\text{Stress} = \\frac{\\text{Force}}{\\text{Area}}$$\n$$[\\text{Stress}] = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2]} = [\\text{ML}^{-1}\\text{T}^{-2}]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 32,
    exam: 'NEET 2020 Phase 1',
    question: "The energy required to break one bond in DNA is $10^{-20}\\text{ J}$. This value in $\\text{eV}$ is nearly :",
    options: [
      "0.6",
      "0.06",
      "0.006",
      "6"
    ],
    correctIndex: 1,
    solution: "Conversion factor between joules and electron-volts:\n$$1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}$$\n\nGiven energy $E = 10^{-20}\\text{ J}$:\n$$E = \\frac{10^{-20}\\text{ J}}{1.6 \\times 10^{-19}\\text{ J/eV}} = \\frac{1}{16} = 0.0625\\text{ eV} \\approx 0.06\\text{ eV}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 33,
    exam: 'NEET 2019 (Odisha)',
    question: "The main scale of a vernier callipers has $n\\text{ divisions/cm}$. $n$ divisions of the vernier scale coincide with $(n - 1)$ divisions of main scale. The least count of the vernier callipers is,",
    options: [
      "\\frac{1}{n(n+1)}\\text{ cm}",
      "\\frac{1}{(n+1)(n-1)}\\text{ cm}",
      "\\frac{1}{n}\\text{ cm}",
      "\\frac{1}{n^2}\\text{ cm}"
    ],
    correctIndex: 3,
    solution: "1. Main scale has $n$ divisions in $1\\text{ cm}$:\n$$1\\text{ MSD} = \\frac{1}{n}\\text{ cm}$$\n\n2. Given $n\\text{ VSD} = (n - 1)\\text{ MSD}$:\n$$1\\text{ VSD} = \\frac{n - 1}{n}\\text{ MSD}$$\n\n3. Least count:\n$$\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = \\left(1 - \\frac{n - 1}{n}\\right)\\text{ MSD} = \\frac{1}{n}\\text{ MSD}$$\n$$= \\frac{1}{n}\\left(\\frac{1}{n}\\text{ cm}\\right) = \\frac{1}{n^2}\\text{ cm}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 34,
    exam: 'NEET 2019',
    question: "In an experiment, the percentage of error occurred in the measurement of physical quantities A, B, C and D are $1\\%, 2\\%, 3\\%$ and $4\\%$ respectively. Then the maximum percentage of error in the measurement X, where $X = \\frac{A^2 B^{1/2}}{C^{1/3} D^3}$, will be :",
    options: [
      "16%",
      "-10%",
      "10%",
      "\\left(\\frac{3}{13}\\right)\\%"
    ],
    correctIndex: 0,
    solution: "Given $X = \\frac{A^2 B^{1/2}}{C^{1/3} D^3}$:\n$$\\frac{\\Delta X}{X}\\times 100 = 2\\left(\\frac{\\Delta A}{A}\\times 100\\right) + \\frac{1}{2}\\left(\\frac{\\Delta B}{B}\\times 100\\right) + \\frac{1}{3}\\left(\\frac{\\Delta C}{C}\\times 100\\right) + 3\\left(\\frac{\\Delta D}{D}\\times 100\\right)$$\n\nSubstitute given percentage errors:\n$$= 2(1\\%) + \\frac{1}{2}(2\\%) + \\frac{1}{3}(3\\%) + 3(4\\%)\n= 2 + 1 + 1 + 12 = 16\\%$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 35,
    exam: 'NEET 2018',
    question: "A student measured the diameter of a small steel ball using a screw gauge of least count $0.001\\text{ cm}$. The main scale reading is $5\\text{ mm}$ and zero of circular scale division coincides with 25 divisions above the reference level. If screw gauge has a zero error of $-0.004\\text{ cm}$, the correct diameter of the ball is",
    options: [
      "0.521 cm",
      "0.525 cm",
      "0.053 cm",
      "0.529 cm"
    ],
    correctIndex: 3,
    solution: "1. Observed reading:\n$$\\text{MSR} = 5\\text{ mm} = 0.5\\text{ cm}$$\n$$\\text{CSR} = 25 \\times 0.001\\text{ cm} = 0.025\\text{ cm}$$\n$$\\text{Observed diameter} = 0.5 + 0.025 = 0.525\\text{ cm}$$\n\n2. Zero error correction:\n$$\\text{True diameter} = \\text{Observed reading} - (\\text{Zero error})$$\n$$= 0.525\\text{ cm} - (-0.004\\text{ cm}) = 0.525 + 0.004 = 0.529\\text{ cm}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 36,
    exam: 'NEET 2017',
    question: "A physical quantity of the dimensions of length that can be formed out of $c$, $G$ and $\\frac{e^2}{4\\pi\\varepsilon_0}$ is [$c$ is velocity of light, $G$ is the universal constant of gravitation and $e$ is charge]",
    options: [
      "c^2 \\left[G - \\frac{e^2}{4\\pi\\varepsilon_0}\\right]^{1/2}",
      "\\frac{1}{c^2} \\left[\\frac{e^2}{G\\,4\\pi\\varepsilon_0}\\right]^{1/2}",
      "\\frac{1}{c} G \\frac{e^2}{4\\pi\\varepsilon_0}",
      "\\frac{1}{c^2} \\left[G \\frac{e^2}{4\\pi\\varepsilon_0}\\right]^{1/2}"
    ],
    correctIndex: 3,
    solution: "From Coulomb's law, $F = \\frac{e^2}{4\\pi\\varepsilon_0 r^2} \\implies \\left[\\frac{e^2}{4\\pi\\varepsilon_0}\\right] = [F r^2] = [\\text{ML}^3\\text{T}^{-2}]$.\nNewton's gravitational constant: $[G] = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$.\nVelocity of light: $[c] = [\\text{LT}^{-1}]$.\n\nMultiplying $G$ and $\\frac{e^2}{4\\pi\\varepsilon_0}$:\n$$\\left[G \\frac{e^2}{4\\pi\\varepsilon_0}\\right] = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}] \\times [\\text{ML}^3\\text{T}^{-2}] = [\\text{L}^6\\text{T}^{-4}]$$\nTaking square root:\n$$\\left[G \\frac{e^2}{4\\pi\\varepsilon_0}\\right]^{1/2} = [\\text{L}^3\\text{T}^{-2}]$$\nDividing by $c^2 = [\\text{L}^2\\text{T}^{-2}]$:\n$$\\left[\\frac{1}{c^2} \\left(G \\frac{e^2}{4\\pi\\varepsilon_0}\\right)^{1/2}\\right] = \\frac{[\\text{L}^3\\text{T}^{-2}]}{[\\text{L}^2\\text{T}^{-2}]} = [\\text{L}]$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 37,
    exam: 'NEET 2016 Phase 2',
    question: "Planck's constant ($h$), speed of light in vacuum ($c$) and Newton's gravitational constant ($G$) are three fundamental constants. Which of the following combinations of these has the dimension of length ?",
    options: [
      "\\frac{\\sqrt{hG}}{c^{3/2}}",
      "\\frac{\\sqrt{hG}}{c^{5/2}}",
      "\\sqrt{\\frac{hc}{G}}",
      "\\sqrt{\\frac{Gc}{h^{3/2}}}"
    ],
    correctIndex: 0,
    solution: "Dimensions of constants:\n- $[h] = [\\text{ML}^2\\text{T}^{-1}]$\n- $[G] = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$\n- $[c] = [\\text{LT}^{-1}]$\n\nProduct $hG$:\n$$[hG] = [\\text{ML}^2\\text{T}^{-1}][\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}] = [\\text{L}^5\\text{T}^{-3}]$$\n$$\\sqrt{hG} = [\\text{L}^{5/2}\\text{T}^{-3/2}]$$\n\nDividing by $c^{3/2} = [\\text{L}^{3/2}\\text{T}^{-3/2}]$:\n$$\\frac{\\sqrt{hG}}{c^{3/2}} = \\frac{[\\text{L}^{5/2}\\text{T}^{-3/2}]}{[\\text{L}^{3/2}\\text{T}^{-3/2}]} = [\\text{L}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 38,
    exam: 'AIPMT 2015',
    question: "If dimensions of critical velocity $v_c$ of a liquid flowing through a tube are expressed as $[\\eta^x \\rho^y r^z]$ where $\\eta, \\rho$ and $r$ are the coefficient of viscosity of liquid, density of liquid and radius of the tube respectively, then the values of $x, y$ and $z$ are given by",
    options: [
      "-1, -1, -1",
      "1, 1, 1",
      "1, -1, -1",
      "-1, -1, 1"
    ],
    correctIndex: 2,
    solution: "Reynolds number formula for critical velocity:\n$$v_c = \\frac{N_R \\eta}{\\rho r}$$\nwhere $N_R$ is dimensionless Reynolds number.\nTherefore:\n$$v_c \\propto \\eta^1 \\rho^{-1} r^{-1}$$\nComparing powers with $[\\eta^x \\rho^y r^z]$:\n$$x = 1,\\; y = -1,\\; z = -1$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 39,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "If energy (E), velocity (V) and time (T) are chosen as the fundamental quantities, the dimensional formula of surface tension will be",
    options: [
      "[E V^{-2} T^{-2}]",
      "[E^{-2} V^{-1} T^{-3}]",
      "[E V^{-2} T^{-1}]",
      "[E V^{-1} T^{-2}]"
    ],
    correctIndex: 0,
    solution: "Surface tension is energy per unit area:\n$$S = \\frac{E}{\\text{Area}} = \\frac{E}{\\text{L}^2}$$\n\nVelocity $V = \\frac{\\text{L}}{T} \\implies \\text{L} = V T \\implies \\text{L}^2 = V^2 T^2$.\n\nSubstituting $\\text{L}^2$:\n$$[S] = \\frac{[E]}{[V^2 T^2]} = [E V^{-2} T^{-2}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 40,
    exam: 'AIPMT 2014',
    question: "If force (F), velocity (V) and time (T) are taken as fundamental units, then dimensions of mass are",
    options: [
      "[F V T^{-1}]",
      "[F V T^{-2}]",
      "[F V^{-1} T^{-1}]",
      "[F V^{-1} T]"
    ],
    correctIndex: 3,
    solution: "From Newton's second law:\n$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{m V}{T} \\implies m = \\frac{F T}{V}$$\n$$[m] = [F V^{-1} T]$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 41,
    exam: 'NEET 2013 (Karnataka)',
    question: "The pair of quantities having same dimensions is",
    options: [
      "Impulse and Surface Tension",
      "Angular momentum and Work",
      "Work and Torque",
      "Young's modulus and Energy"
    ],
    correctIndex: 2,
    solution: "1. Work $= \\text{Force} \\times \\text{Displacement} = [\\text{MLT}^{-2}][\\text{L}] = [\\text{ML}^2\\text{T}^{-2}]$.\n2. Torque $= \\text{Force} \\times \\text{Perpendicular distance} = [\\text{MLT}^{-2}][\\text{L}] = [\\text{ML}^2\\text{T}^{-2}]$.\n\nBoth work and torque share the identical dimensional formula $[\\text{ML}^2\\text{T}^{-2}]$.\n\nHence, the correct option is (C)."
  }
];

