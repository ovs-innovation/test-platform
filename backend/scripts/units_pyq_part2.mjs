// NEET Units & Measurement PYQ Part 2: Q42 to Q82

export const PART2_QUESTIONS = [
  {
    qNum: 42,
    exam: 'NEET 2013',
    question: "If in an experiment four quantities a, b, c and d are measured with percentage error 1%, 2%, 3% and 4% respectively.\nQuantity P is calculated as follows $P = \\frac{a^3 b^2}{cd}$ % error in P is",
    options: [
      "7%",
      "4%",
      "14%",
      "10%"
    ],
    correctIndex: 2,
    solution: "Given $P = \\frac{a^3 b^2}{cd}$:\n$$\\frac{\\Delta P}{P}\\times 100 = 3\\left(\\frac{\\Delta a}{a}\\times 100\\right) + 2\\left(\\frac{\\Delta b}{b}\\times 100\\right) + \\left(\\frac{\\Delta c}{c}\\times 100\\right) + \\left(\\frac{\\Delta d}{d}\\times 100\\right)$$\n$$= 3(1\\%) + 2(2\\%) + 1(3\\%) + 1(4\\%) = 3 + 4 + 3 + 4 = 14\\%$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 43,
    exam: 'AIPMT 2012 Mains',
    question: "The dimensions of $(\\mu_0\\varepsilon_0)^{-1/2}$ are",
    options: [
      "[L^{1/2}T^{-1/2}]",
      "[L^{-1}T]",
      "[LT^{-1}]",
      "[L^{1/2}T^{1/2}]"
    ],
    correctIndex: 2,
    solution: "Speed of electromagnetic waves in vacuum is given by:\n$$c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = (\\mu_0 \\varepsilon_0)^{-1/2}$$\nTherefore, the dimension of $(\\mu_0\\varepsilon_0)^{-1/2}$ is that of velocity:\n$$[c] = [\\text{LT}^{-1}]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 44,
    exam: 'AIPMT 2012 Prelims',
    question: "The damping force on an oscillator is directly proportional to the velocity. The units of the constant of proportionality are",
    options: [
      "\\text{kg m s}^{-1}",
      "\\text{kg m s}^{-2}",
      "\\text{kg s}^{-1}",
      "\\text{kg s}"
    ],
    correctIndex: 2,
    solution: "Given $F \\propto v \\implies F = b v$, where $b$ is the damping constant:\n$$b = \\frac{F}{v} = \\frac{\\text{N}}{\\text{m/s}} = \\frac{\\text{kg m s}^{-2}}{\\text{m s}^{-1}} = \\text{kg s}^{-1}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 45,
    exam: 'AIPMT 2011 Mains',
    question: "The density of a material in CGS system of units is $4\\text{ g cm}^{-3}$. In a system of units in which unit of length is $10\\text{ cm}$ and unit of mass is $100\\text{ g}$, the value of density of material will be",
    options: [
      "0.04",
      "0.4",
      "40",
      "400"
    ],
    correctIndex: 2,
    solution: "Using the unit conversion relation $n_2 u_2 = n_1 u_1$:\n$$n_2 = n_1 \\left[\\frac{M_1}{M_2}\\right]^1 \\left[\\frac{L_1}{L_2}\\right]^{-3}$$\n$$n_2 = 4 \\left[\\frac{1\\text{ g}}{100\\text{ g}}\\right]^1 \\left[\\frac{1\\text{ cm}}{10\\text{ cm}}\\right]^{-3} = 4 \\times \\frac{1}{100} \\times 10^3 = 4 \\times 10 = 40$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 46,
    exam: 'AIPMT 2011 Prelims',
    question: "The dimensions of $(\\mu_0\\varepsilon_0)^{-1/2}$ are",
    options: [
      "[L^{1/2}T^{-1/2}]",
      "[L^{-1}T]",
      "[LT^{-1}]",
      "[L^{1/2}T^{1/2}]"
    ],
    correctIndex: 2,
    solution: "From Maxwell's electromagnetic theory, the speed of light in vacuum is:\n$$c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = (\\mu_0 \\varepsilon_0)^{-1/2}$$\nTherefore, the dimension of $(\\mu_0\\varepsilon_0)^{-1/2}$ is velocity $[\\text{LT}^{-1}]$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 47,
    exam: 'AIPMT 2010 Mains',
    question: "A student measures the distance traversed in free fall of a body, initially at rest, in a given time. He uses this data to estimate g, the acceleration due to gravity. If the maximum percentage errors in measurement of the distance and the time are $e_1$ and $e_2$ respectively, the percentage error in the estimation of g is",
    options: [
      "e_2 - e_1",
      "e_1 + 2e_2",
      "e_1 + e_2",
      "e_1 - 2e_2"
    ],
    correctIndex: 1,
    solution: "Distance traversed from rest: $h = \\frac{1}{2}gt^2 \\implies g = \\frac{2h}{t^2}$.\nMaximum fractional error:\n$$\\frac{\\Delta g}{g} = \\frac{\\Delta h}{h} + 2\\frac{\\Delta t}{t}$$\nMultiplying by 100:\n$$\\text{Percentage error in } g = e_1 + 2e_2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 48,
    exam: 'AIPMT 2010 Prelims',
    question: "The dimension of $\\frac{1}{2}\\varepsilon_0 E^2$, where $\\varepsilon_0$ is permittivity of free space and E is electric field, is",
    options: [
      "\\text{ML}^2\\text{T}^{-2}",
      "\\text{ML}^{-1}\\text{T}^{-2}",
      "\\text{ML}^2\\text{T}^{-1}",
      "\\text{MLT}^{-1}"
    ],
    correctIndex: 1,
    solution: "The expression $\\frac{1}{2}\\varepsilon_0 E^2$ represents electrostatic energy density (energy per unit volume $u_E$):\n$$[u_E] = \\frac{[\\text{Energy}]}{[\\text{Volume}]} = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{L}^3]} = [\\text{ML}^{-1}\\text{T}^{-2}]$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 49,
    exam: 'AIPMT 2009',
    question: "If the dimensions of a physical quantity are given by $\\text{M}^a \\text{L}^b \\text{T}^c$, then the physical quantity will be",
    options: [
      "velocity if a = 1, b = 0, c = -1",
      "acceleration if a = 1, b = 1, c = -2",
      "force if a = 0, b = -1, c = -2",
      "pressure if a = 1, b = -1, c = -2"
    ],
    correctIndex: 3,
    solution: "Checking each option:\n- Velocity: $[\\text{LT}^{-1}] = \\text{M}^0 \\text{L}^1 \\text{T}^{-1}$\n- Acceleration: $[\\text{LT}^{-2}] = \\text{M}^0 \\text{L}^1 \\text{T}^{-2}$\n- Force: $[\\text{MLT}^{-2}] = \\text{M}^1 \\text{L}^1 \\text{T}^{-2}$\n- Pressure: $\\frac{\\text{Force}}{\\text{Area}} = [\\text{ML}^{-1}\\text{T}^{-2}] = \\text{M}^1 \\text{L}^{-1} \\text{T}^{-2}$, matching $a = 1, b = -1, c = -2$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 50,
    exam: 'AIPMT 2008',
    question: "If the error in the measurement of radius of a sphere is 2%, then the error in the determination of volume of the sphere will be",
    options: [
      "8%",
      "2%",
      "4%",
      "6%"
    ],
    correctIndex: 3,
    solution: "Volume of a sphere is $V = \\frac{4}{3}\\pi r^3$.\nPercentage error in volume:\n$$\\frac{\\Delta V}{V}\\times 100 = 3\\left(\\frac{\\Delta r}{r}\\times 100\\right) = 3(2\\%) = 6\\%$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 51,
    exam: 'AIPMT 2008',
    question: "Which two of the following five physical parameters have the same dimensions ?\n1. Energy density\n2. Refractive index\n3. Dielectric constant\n4. Young's modulus\n5. Magnetic field",
    options: [
      "1 and 4",
      "1 and 5",
      "2 and 4",
      "3 and 5"
    ],
    correctIndex: 0,
    solution: "1. Energy density $= \\frac{\\text{Energy}}{\\text{Volume}} = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{L}^3]} = [\\text{ML}^{-1}\\text{T}^{-2}]$\n2. Refractive index is dimensionless $[\\text{M}^0\\text{L}^0\\text{T}^0]$\n3. Dielectric constant is dimensionless $[\\text{M}^0\\text{L}^0\\text{T}^0]$\n4. Young's modulus $= \\frac{\\text{Stress}}{\\text{Strain}} = [\\text{ML}^{-1}\\text{T}^{-2}]$\n5. Magnetic field $= [\\text{MT}^{-2}\\text{A}^{-1}]$\n\nParameters 1 and 4 have identical dimensions $[\\text{ML}^{-1}\\text{T}^{-2}]$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 52,
    exam: 'AIPMT 2007',
    question: "Dimensions of resistance in an electrical circuit, in terms of dimension of mass M, of length L, of time T and of current I, would be",
    options: [
      "[\\text{ML}^2\\text{T}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-1}\\text{I}^{-1}]",
      "[\\text{ML}^2\\text{T}^{-3}\\text{I}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-3}\\text{I}^{-1}]"
    ],
    correctIndex: 2,
    solution: "Electric power $P = I^2 R \\implies R = \\frac{P}{I^2}$:\n$$[P] = \\frac{[\\text{Work}]}{[\\text{Time}]} = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{T}]} = [\\text{ML}^2\\text{T}^{-3}]$$\n$$[R] = \\frac{[\\text{ML}^2\\text{T}^{-3}]}{[\\text{I}^2]} = [\\text{ML}^2\\text{T}^{-3}\\text{I}^{-2}]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 53,
    exam: 'AIPMT 2006',
    question: "The velocity v of a particle at time t is given by $v = at + \\frac{b}{t + c}$, where a, b and c are constants. The dimensions of a, b and c are",
    options: [
      "[\\text{L}], [\\text{LT}] \\text{ and } [\\text{LT}^{-2}]",
      "[\\text{LT}^{-2}], [\\text{L}] \\text{ and } [\\text{T}]",
      "[\\text{L}^2], [\\text{T}] \\text{ and } [\\text{LT}^{-2}]",
      "[\\text{LT}^{-2}], \\text{ and } [\\text{LT}] \\text{ and } [\\text{L}]"
    ],
    correctIndex: 1,
    solution: "1. Denominator $(t + c)$: terms added must have same dimensions $\\implies [c] = [t] = [\\text{T}]$.\n2. First term $[at] = [v] \\implies [a][\\text{T}] = [\\text{LT}^{-1}] \\implies [a] = [\\text{LT}^{-2}]$.\n3. Second term $\\left[\\frac{b}{t + c}\\right] = [v] \\implies \\frac{[b]}{[\\text{T}]} = [\\text{LT}^{-1}] \\implies [b] = [\\text{L}]$.\n\nThus, dimensions are $[\\text{LT}^{-2}], [\\text{L}]$ and $[\\text{T}]$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 54,
    exam: 'AIPMT 2005',
    question: "The ratio of the dimensions of Planck's constant and that of moment of inertia is the dimensions of",
    options: [
      "time",
      "frequency",
      "angular momentum",
      "velocity"
    ],
    correctIndex: 1,
    solution: "Planck's constant $h$: $[h] = [\\text{ML}^2\\text{T}^{-1}]$.\nMoment of inertia $I = m r^2$: $[I] = [\\text{ML}^2]$.\n\nRatio:\n$$\\left[\\frac{h}{I}\\right] = \\frac{[\\text{ML}^2\\text{T}^{-1}]}{[\\text{ML}^2]} = [\\text{T}^{-1}]$$\n$[\\text{T}^{-1}]$ is the dimension of frequency.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 55,
    exam: 'AIPMT 2004',
    question: "The dimensions of universal gravitational constant are",
    options: [
      "[\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-1}]",
      "[\\text{M}^{-2}\\text{L}^3\\text{T}^{-2}]",
      "[\\text{M}^{-2}\\text{L}^2\\text{T}^{-1}]"
    ],
    correctIndex: 0,
    solution: "Newton's law of gravitation:\n$$F = \\frac{G m_1 m_2}{r^2} \\implies G = \\frac{F r^2}{m_1 m_2}$$\n$$[G] = \\frac{[\\text{MLT}^{-2}][\\text{L}^2]}{[\\text{M}^2]} = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 56,
    exam: 'AIPMT 2004',
    question: "The unit of permittivity of free space, $\\varepsilon_0$, is",
    options: [
      "\\text{coulomb/newton-metre}",
      "\\text{newton-metre}^2/\\text{coulomb}^2",
      "\\text{coulomb}^2/\\text{newton-metre}^2",
      "\\text{coulomb}^2/(\\text{newton-metre})^2"
    ],
    correctIndex: 2,
    solution: "From Coulomb's law:\n$$F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2} \\implies \\varepsilon_0 = \\frac{q_1 q_2}{4\\pi F r^2}$$\n$$\\text{Unit of } \\varepsilon_0 = \\frac{\\text{C}\\times\\text{C}}{\\text{N}\\times\\text{m}^2} = \\text{coulomb}^2/\\text{newton-metre}^2$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 57,
    exam: 'AIPMT 2001',
    question: "The dimensions of Planck's constant equals to that of",
    options: [
      "energy",
      "momentum",
      "angular momentum",
      "power"
    ],
    correctIndex: 2,
    solution: "Planck's constant: $E = h\\nu \\implies [h] = \\frac{[E]}{[\\nu]} = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{T}^{-1}]} = [\\text{ML}^2\\text{T}^{-1}]$.\nAngular momentum: $L = mvr \\implies [L] = [\\text{M}][\\text{LT}^{-1}][\\text{L}] = [\\text{ML}^2\\text{T}^{-1}]$.\nBoth have identical dimensions $[\\text{ML}^2\\text{T}^{-1}]$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 58,
    exam: 'AIPMT 2000',
    question: "Which pair do not have equal dimensions ?",
    options: [
      "Energy and torque",
      "Force and impulse",
      "Angular momentum and Planck constant",
      "Elastic modulus and pressure."
    ],
    correctIndex: 1,
    solution: "- Force $= [\\text{MLT}^{-2}]$\n- Impulse $= \\text{Force}\\times\\text{Time} = [\\text{MLT}^{-1}]$\nThese two have different dimensions.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 59,
    exam: 'AIPMT 1999',
    question: "The dimensional formula for magnetic flux is",
    options: [
      "[\\text{ML}^2\\text{T}^{-2}\\text{A}^{-1}]",
      "[\\text{ML}^3\\text{T}^{-2}\\text{A}^{-2}]",
      "[\\text{M}^0\\text{L}^{-2}\\text{T}^2\\text{A}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-1}\\text{A}^2]"
    ],
    correctIndex: 0,
    solution: "Magnetic flux $\\Phi = B A$.\nFrom Lorentz force $F = I L B \\implies B = \\frac{F}{I L}$:\n$$[B] = \\frac{[\\text{MLT}^{-2}]}{[\\text{A}][\\text{L}]} = [\\text{MT}^{-2}\\text{A}^{-1}]$$\n$$[\\Phi] = [B][A] = [\\text{MT}^{-2}\\text{A}^{-1}][\\text{L}^2] = [\\text{ML}^2\\text{T}^{-2}\\text{A}^{-1}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 60,
    exam: 'AIPMT 1996',
    question: "An equation is given here $\\left(P + \\frac{a}{V^2}\\right) = b\\,\\frac{\\theta}{V}$ where $P = \\text{Pressure}$, $V = \\text{Volume}$ and $\\theta = \\text{Absolute temperature}$. If $a$ and $b$ are constants, the dimensions of $a$ will be",
    options: [
      "[\\text{ML}^{-5}\\text{T}^{-1}]",
      "[\\text{ML}^5\\text{T}^1]",
      "[\\text{ML}^5\\text{T}^{-2}]",
      "[\\text{M}^{-1}\\text{L}^5\\text{T}^2]"
    ],
    correctIndex: 2,
    solution: "By the principle of homogeneity, only physical quantities with the same dimensions can be added together:\n$$\\left[\\frac{a}{V^2}\\right] = [P] \\implies [a] = [P][V^2]$$\nSince $[P] = [\\text{ML}^{-1}\\text{T}^{-2}]$ and $[V] = [\\text{L}^3]$:\n$$[a] = [\\text{ML}^{-1}\\text{T}^{-2}][\\text{L}^6] = [\\text{ML}^5\\text{T}^{-2}]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 61,
    exam: 'AIPMT 1996',
    question: "The density of a cube is measured by measuring its mass and length of its sides. If the maximum error in the measurement of mass and lengths are 3% and 2% respectively, the maximum error in the measurement of density would be",
    options: [
      "12%",
      "14%",
      "7%",
      "9%"
    ],
    correctIndex: 3,
    solution: "Density is $\\rho = \\frac{m}{L^3}$.\nMaximum percentage error:\n$$\\frac{\\Delta \\rho}{\\rho}\\times 100 = \\left(\\frac{\\Delta m}{m} + 3\\frac{\\Delta L}{L}\\right)\\times 100 = 3\\% + 3(2\\%) = 3\\% + 6\\% = 9\\%$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 62,
    exam: 'AIPMT 1996',
    question: "The dimensions of impulse are equal to that of",
    options: [
      "pressure",
      "linear momentum",
      "force",
      "angular momentum"
    ],
    correctIndex: 1,
    solution: "Impulse $J = F \\Delta t = [\\text{MLT}^{-2}][\\text{T}] = [\\text{MLT}^{-1}]$.\nLinear momentum $p = mv = [\\text{M}][\\text{LT}^{-1}] = [\\text{MLT}^{-1}]$.\nBy the impulse-momentum theorem ($J = \\Delta p$), impulse has the exact dimensions of linear momentum.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 63,
    exam: 'AIPMT 1996',
    question: "Which of the following dimensions will be the same as that of time?",
    options: [
      "\\frac{L}{R}",
      "\\frac{C}{L}",
      "LC",
      "\\frac{R}{L}"
    ],
    correctIndex: 0,
    solution: "In an inductive-resistive (LR) circuit, the time constant $\\tau$ is given by:\n$$\\tau = \\frac{L}{R}$$\nIts dimension is that of time $[\\text{T}]$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 64,
    exam: 'AIPMT 1995',
    question: "Which of the following is a dimensional constant?",
    options: [
      "Relative density",
      "Gravitational constant",
      "Refractive index",
      "Poisson ratio"
    ],
    correctIndex: 1,
    solution: "A dimensional constant is a physical constant that has dimensions and units. Universal gravitational constant $G$ has dimensions $[\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$ and unit $\\text{N m}^2\\text{ kg}^{-2}$. Relative density, refractive index, and Poisson's ratio are all pure dimensionless numbers.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 65,
    exam: 'AIPMT 1995',
    question: "The dimensions of $RC$ is",
    options: [
      "square of time",
      "square of inverse time",
      "time",
      "inverse time"
    ],
    correctIndex: 2,
    solution: "$RC$ is the time constant of a capacitive-resistive circuit $\\tau = RC$.\n$$[R] = [\\text{ML}^2\\text{T}^{-3}\\text{A}^{-2}]$$\n$$[C] = [\\text{M}^{-1}\\text{L}^{-2}\\text{T}^4\\text{A}^2]$$\n$$[RC] = [\\text{ML}^2\\text{T}^{-3}\\text{A}^{-2}][\\text{M}^{-1}\\text{L}^{-2}\\text{T}^4\\text{A}^2] = [\\text{T}]$$\nThus, $RC$ has dimensions of time.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 66,
    exam: 'AIPMT 1995',
    question: "Percentage errors in the measurement of mass and speed are 2% and 3% respectively. The error in the estimate of kinetic energy obtained by measuring mass and speed will be",
    options: [
      "8%",
      "2%",
      "12%",
      "10%"
    ],
    correctIndex: 0,
    solution: "Kinetic energy $K = \\frac{1}{2}mv^2$.\nMaximum percentage error:\n$$\\frac{\\Delta K}{K}\\times 100 = \\left(\\frac{\\Delta m}{m} + 2\\frac{\\Delta v}{v}\\right)\\times 100 = 2\\% + 2(3\\%) = 2\\% + 6\\% = 8\\%$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 67,
    exam: 'AIPMT 1994',
    question: "Which of the following has the dimensions of pressure?",
    options: [
      "[\\text{ML}\\text{T}^{-2}]",
      "[\\text{ML}^{-1}\\text{T}^{-2}]",
      "[\\text{ML}^{-2}\\text{T}^{-2}]",
      "[\\text{M}^{-1}\\text{L}^{-1}]"
    ],
    correctIndex: 1,
    solution: "Pressure is force per unit area:\n$$P = \\frac{F}{A} = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2]} = [\\text{ML}^{-1}\\text{T}^{-2}]$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 68,
    exam: 'AIPMT 1993',
    question: "Turpentine oil is flowing through a tube of length $l$ and radius $r$. The pressure difference between the two ends of the tube is $P$. The viscosity of oil is given by $\\eta = \\frac{P(r^2 - x^2)}{4vl}$ where $v$ is the velocity of oil at a distance $x$ from the axis of the tube. The dimensions of $\\eta$ are",
    options: [
      "[\\text{M}^0\\text{L}^0\\text{T}^0]",
      "[\\text{ML}\\text{T}^{-1}]",
      "[\\text{ML}^2\\text{T}^{-2}]",
      "[\\text{ML}^{-1}\\text{T}^{-1}]"
    ],
    correctIndex: 3,
    solution: "Dimensions of individual terms:\n- $[P] = [\\text{ML}^{-1}\\text{T}^{-2}]$\n- $[r^2 - x^2] = [\\text{L}^2]$\n- $[v] = [\\text{LT}^{-1}]$\n- $[l] = [\\text{L}]$\n\nSubstituting into the viscosity equation:\n$$[\\eta] = \\frac{[P][r^2 - x^2]}{[v][l]} = \\frac{[\\text{ML}^{-1}\\text{T}^{-2}][\\text{L}^2]}{[\\text{LT}^{-1}][\\text{L}]} = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2\\text{T}^{-1}]} = [\\text{ML}^{-1}\\text{T}^{-1}]$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 69,
    exam: 'AIPMT 1993',
    question: "The time dependence of a physical quantity $p$ is given by $p = p_0 \\exp(-at^2)$, where $a$ is a constant and $t$ is the time. The constant $a$",
    options: [
      "is dimensionless",
      "has dimensions [\\text{T}^{-2}]",
      "has dimensions [\\text{T}^2]",
      "has dimensions of p"
    ],
    correctIndex: 1,
    solution: "The argument of an exponential function must be dimensionless ($[\\text{M}^0\\text{L}^0\\text{T}^0]$):\n$$[at^2] = 1 \\implies [a][t^2] = 1 \\implies [a] = [\\text{T}^{-2}]$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 70,
    exam: 'AIPMT 1992',
    question: "$P$ represents radiation pressure, $c$ represents speed of light and $S$ represents radiation energy striking per unit area per sec. The non zero integers $x, y, z$ such that $P^x S^y c^z$ is dimensionless are",
    options: [
      "x = 1, y = 1, z = 1",
      "x = -1, y = 1, z = 1",
      "x = 1, y = -1, z = 1",
      "x = 1, y = 1, z = -1"
    ],
    correctIndex: 2,
    solution: "Radiation pressure for complete absorption is given by:\n$$P = \\frac{S}{c} \\implies \\frac{P c}{S} = 1$$\nTherefore, $P^1 S^{-1} c^1$ is dimensionless.\nComparing with $P^x S^y c^z$ gives:\n$$x = 1,\\; y = -1,\\; z = 1$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 71,
    exam: 'AIPMT 1992',
    question: "The dimensions of universal gravitational constant are",
    options: [
      "[\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-1}]",
      "[\\text{M}^{-2}\\text{L}^3\\text{T}^{-2}]",
      "[\\text{M}^{-2}\\text{L}^2\\text{T}^{-1}]"
    ],
    correctIndex: 0,
    solution: "From Newton's law of gravitation:\n$$F = \\frac{G m_1 m_2}{r^2} \\implies G = \\frac{F r^2}{m_1 m_2}$$\n$$[G] = \\frac{[\\text{MLT}^{-2}][\\text{L}^2]}{[\\text{M}^2]} = [\\text{M}^{-1}\\text{L}^3\\text{T}^{-2}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 72,
    exam: 'AIPMT 1991',
    question: "A certain body weighs $22.42\\text{ g}$ and has a measured volume of $4.7\\text{ cc}$. The possible error in the measurement of mass and volume are $0.01\\text{ g}$ and $0.1\\text{ cc}$. Then maximum error in the density will be",
    options: [
      "22%",
      "2%",
      "0.2%",
      "0.02%"
    ],
    correctIndex: 1,
    solution: "Density $\\rho = \\frac{m}{V}$.\nMaximum relative error:\n$$\\frac{\\Delta \\rho}{\\rho} = \\frac{\\Delta m}{m} + \\frac{\\Delta V}{V} = \\frac{0.01}{22.42} + \\frac{0.1}{4.7} \\approx 0.00045 + 0.02128 = 0.02173$$\nPercentage error:\n$$\\frac{\\Delta \\rho}{\\rho}\\times 100 \\approx 2.17\\% \\approx 2\\%$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 73,
    exam: 'AIPMT 1991',
    question: "The dimensional formula of permeability of free space $\\mu_0$ is",
    options: [
      "[\\text{MLT}^{-2}\\text{A}^{-2}]",
      "[\\text{M}^0\\text{L}^1\\text{T}]",
      "[\\text{M}^0\\text{L}^2\\text{T}^{-1}\\text{A}^2]",
      "none of these"
    ],
    correctIndex: 0,
    solution: "Magnetic force per unit length between two parallel currents is:\n$$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d} \\implies \\mu_0 = \\frac{2\\pi d (F/L)}{I_1 I_2}$$\n$$[\\mu_0] = \\frac{[\\text{L}][\\text{MLT}^{-2}\\text{L}^{-1}]}{[\\text{A}^2]} = [\\text{MLT}^{-2}\\text{A}^{-2}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 74,
    exam: 'AIPMT 1990',
    question: "Which of the following has the dimensions of pressure?",
    options: [
      "[\\text{MLT}^{-2}]",
      "[\\text{ML}^{-1}\\text{T}^{-2}]",
      "[\\text{ML}^{-2}\\text{T}^{-2}]",
      "[\\text{M}^{-1}\\text{L}^{-1}]"
    ],
    correctIndex: 1,
    solution: "Pressure is defined as normal force per unit area:\n$$P = \\frac{F}{A} = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2]} = [\\text{ML}^{-1}\\text{T}^{-2}]$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 75,
    exam: 'AIPMT 1990',
    question: "The frequency of vibration $f$ of a mass $m$ suspended from a spring of spring constant $k$ is given by a relation $f = a m^x k^y$, where $a$ is a dimensionless constant. The values of $x$ and $y$ are",
    options: [
      "x = \\frac{1}{2}, y = \\frac{1}{2}",
      "x = -\\frac{1}{2}, y = -\\frac{1}{2}",
      "x = \\frac{1}{2}, y = -\\frac{1}{2}",
      "x = -\\frac{1}{2}, y = \\frac{1}{2}"
    ],
    correctIndex: 3,
    solution: "Frequency: $[f] = [\\text{T}^{-1}]$.\nMass: $[m] = [\\text{M}]$.\nSpring constant: $F = kx \\implies [k] = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}]} = [\\text{MT}^{-2}]$.\n\nEquating dimensions:\n$$[\\text{T}^{-1}] = [\\text{M}^x][\\text{MT}^{-2}]^y = [\\text{M}^{x+y}\\text{T}^{-2y}]$$\nEquating exponents of $\\text{M}$ and $\\text{T}$:\n$$-2y = -1 \\implies y = \\frac{1}{2}$$\n$$x + y = 0 \\implies x = -y = -\\frac{1}{2}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 76,
    exam: 'AIPMT 1990',
    question: "According to Newton, the viscous force acting between liquid layers of area $A$ and velocity gradient $\\Delta v / \\Delta z$ is given by $F = -\\eta A \\frac{\\Delta v}{\\Delta z}$, where $\\eta$ is constant called coefficient of viscosity. The dimensional formula of $\\eta$ is",
    options: [
      "[\\text{ML}^{-2}\\text{T}^{-2}]",
      "[\\text{M}^0\\text{L}^0\\text{T}^0]",
      "[\\text{ML}^2\\text{T}^{-2}]",
      "[\\text{ML}^{-1}\\text{T}^{-1}]"
    ],
    correctIndex: 3,
    solution: "From Newton's law of viscosity:\n$$\\eta = \\frac{F}{A \\frac{\\Delta v}{\\Delta z}}$$\n$$[\\eta] = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2][\\text{LT}^{-1}/\\text{L}]} = \\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2\\text{T}^{-1}]} = [\\text{ML}^{-1}\\text{T}^{-1}]$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 77,
    exam: 'AIPMT 1989',
    question: "If $x = at + bt^2$, where $x$ is the distance travelled by the body in kilometers while $t$ is the time in seconds, then the units of $b$ is",
    options: [
      "\\text{km/s}",
      "\\text{km s}",
      "\\text{km/s}^2",
      "\\text{km s}^2"
    ],
    correctIndex: 2,
    solution: "By principle of homogeneity, each term on the right hand side must have the dimension and unit of $x$:\n$$[bt^2] = [x] \\implies \\text{Unit of } b = \\frac{\\text{Unit of } x}{\\text{Unit of } t^2} = \\frac{\\text{km}}{\\text{s}^2} = \\text{km/s}^2$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 78,
    exam: 'AIPMT 1989',
    question: "Of the following quantities, which one has dimensions different from the remaining three?",
    options: [
      "Energy per unit volume",
      "Force per unit area",
      "Product of voltage and charge per unit volume",
      "Angular momentum"
    ],
    correctIndex: 3,
    solution: "1. Energy per unit volume: $\\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{L}^3]} = [\\text{ML}^{-1}\\text{T}^{-2}]$\n2. Force per unit area: $\\frac{[\\text{MLT}^{-2}]}{[\\text{L}^2]} = [\\text{ML}^{-1}\\text{T}^{-2}]$\n3. Voltage $\\times$ charge is energy, so per unit volume: $[\\text{ML}^{-1}\\text{T}^{-2}]$\n4. Angular momentum: $L = mvr = [\\text{M}][\\text{LT}^{-1}][\\text{L}] = [\\text{ML}^2\\text{T}^{-1}]$\n\nAngular momentum has dimensions $[\\text{ML}^2\\text{T}^{-1}]$, whereas the other three are all pressures/energy densities $[\\text{ML}^{-1}\\text{T}^{-2}]$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 79,
    exam: 'AIPMT 1989',
    question: "Dimensional formula of self inductance is",
    options: [
      "[\\text{MLT}^{-2}\\text{A}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-1}\\text{A}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-2}\\text{A}^{-2}]",
      "[\\text{ML}^2\\text{T}^{-2}\\text{A}^{-1}]"
    ],
    correctIndex: 2,
    solution: "Energy stored in an inductor: $U = \\frac{1}{2}L I^2 \\implies L = \\frac{2U}{I^2}$:\n$$[L] = \\frac{[\\text{ML}^2\\text{T}^{-2}]}{[\\text{A}^2]} = [\\text{ML}^2\\text{T}^{-2}\\text{A}^{-2}]$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 80,
    exam: 'AIPMT 1989',
    question: "The dimensional formula of torque is",
    options: [
      "[\\text{ML}^2\\text{T}^{-2}]",
      "[\\text{ML}\\text{T}^{-2}]",
      "[\\text{ML}^{-1}\\text{T}^{-2}]",
      "[\\text{ML}^{-2}\\text{T}^{-2}]"
    ],
    correctIndex: 0,
    solution: "Torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$:\n$$[\\tau] = [\\text{L}][\\text{MLT}^{-2}] = [\\text{ML}^2\\text{T}^{-2}]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 81,
    exam: 'AIPMT 1988',
    question: "If $C$ and $R$ denote capacitance and resistance, the dimensional formula of $CR$ is",
    options: [
      "[\\text{M}^0\\text{L}^0\\text{T}^1]",
      "[\\text{M}^0\\text{L}^0\\text{T}^0]",
      "[\\text{M}^0\\text{L}^0\\text{T}^{-1}]",
      "not expressible in terms of MLT"
    ],
    correctIndex: 0,
    solution: "The product $CR$ represents the capacitive time constant of an RC circuit:\n$$\\tau = CR \\implies [CR] = [\\text{T}] = [\\text{M}^0\\text{L}^0\\text{T}^1]$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 82,
    exam: 'AIPMT 1988',
    question: "The dimensional formula of angular momentum is",
    options: [
      "[\\text{ML}^2\\text{T}^{-2}]",
      "[\\text{ML}^{-2}\\text{T}^{-1}]",
      "[\\text{ML}\\text{T}^{-1}]",
      "[\\text{ML}^2\\text{T}^{-1}]"
    ],
    correctIndex: 3,
    solution: "Angular momentum $L = mvr$:\n$$[L] = [\\text{M}][\\text{LT}^{-1}][\\text{L}] = [\\text{ML}^2\\text{T}^{-1}]$$\n\nHence, the correct option is (D)."
  }
];

