export const EMW_PYQ_PART1 = [
  {
    question_number: 1,
    question_text: "The following table presents the part of the electromagnetic spectrum and their corresponding major applications.\n\n| Part of the electromagnetic spectrum | Applications |\n| :--- | :--- |\n| P. Microwave | I. For purifying the water |\n| Q. UV rays | II. For warming the food |\n| R. Gamma rays | III. For AM and FM communication systems |\n| S. Radio wave | IV. For treating the Cancer cells |\n\nThe correct option is :",
    options: [
      "P-II, Q-IV, R-III, S-I",
      "P-I, Q-II, R-III, S-IV",
      "P-I, Q-IV, R-II, S-III",
      "P-II, Q-I, R-IV, S-III"
    ],
    correct_option: "D",
    solution: "1. **Microwaves (P)** are used in microwave ovens for heating and warming food $\\rightarrow$ **II**.\n2. **UV rays (Q)** have germicidal properties and are used in water purifiers to kill bacteria $\\rightarrow$ **I**.\n3. **Gamma rays (R)** are high-energy ionizing radiations used in radiotherapy for destroying cancer cells $\\rightarrow$ **IV**.\n4. **Radio waves (S)** are widely used for transmission in AM and FM communication systems $\\rightarrow$ **III**.\n\nTherefore, the correct combination is **P-II, Q-I, R-IV, S-III**.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 2,
    question_text: "An electromagnetic wave travelling in a lossless dielectric medium having a dielectric constant, $\\varepsilon_r = 9$, has the electric field, $E_x = E_0 \\sin(kz - 2\\pi \\times 10^6 t)\\text{ V m}^{-1}$ where $E_0$ is the amplitude and $k$ is the wave vector. Among the following options, the incorrect choice is :",
    options: [
      "The direction of propagation of the electromagnetic wave is along $+z$",
      "The speed of the electromagnetic wave inside the medium is $10^8\\text{ ms}^{-1}$",
      "The wavelength of the electromagnetic wave inside the medium is $300\\text{ m}$",
      "The magnetic field is given by the relation $B_y = \\frac{E_0}{v}\\sin(kz - 2\\pi \\times 10^6 t)$ where $v$ is the speed of the electromagnetic wave inside the medium"
    ],
    correct_option: "C",
    solution: "1. The electric field is given by $E_x = E_0 \\sin(kz - \\omega t)$ with $\\omega = 2\\pi \\times 10^6\\text{ rad s}^{-1}$. Since the argument is $(kz - \\omega t)$, the wave propagates along the $+z$ direction.\n2. For a non-magnetic lossless dielectric medium ($\\mu_r = 1$), the speed of the wave is:\n$$v = \\frac{c}{\\sqrt{\\varepsilon_r}} = \\frac{3 \\times 10^8}{\\sqrt{9}} = 10^8\\text{ m s}^{-1}$$\n3. The frequency is $f = \\frac{\\omega}{2\\pi} = 10^6\\text{ Hz}$.\nThe wavelength in the medium is:\n$$\\lambda = \\frac{v}{f} = \\frac{10^8\\text{ m s}^{-1}}{10^6\\text{ s}^{-1}} = 100\\text{ m}$$\nThus, the statement that the wavelength is $300\\text{ m}$ is incorrect.\n4. Since $\\vec{E}$ is along $+x$ ($\\\\hat{i}$) and propagation is along $+z$ ($\\\\hat{k}$), $\\vec{B}$ must be along $+y$ ($\\\\hat{j}$) with amplitude $B_0 = \\frac{E_0}{v}$.\nTherefore, choice (C) is the incorrect statement.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 3,
    question_text: "Match List I with List II :\n\n| List-I (Electromagnetic wave) | List-II (Production) |\n| :--- | :--- |\n| A. Microwave | I. Electrons in atoms emit light when they move from a higher energy level to a lower energy level |\n| B. Visible light | II. Radioactive decay of nucleus |\n| C. Gamma rays | III. Vibration of atoms and molecules |\n| D. Infra-red rays | IV. Klystron valve or magnetron valve |\n\nChoose the correct answer from the options given below :",
    options: [
      "A-III, B-I, C-II, D-IV",
      "A-III, B-IV, C-I, D-II",
      "A-IV, B-I, C-II, D-III",
      "A-IV, B-III, C-II, D-I"
    ],
    correct_option: "C",
    solution: "1. **Microwaves (A)** are produced by special vacuum tubes like klystron, magnetron, or Gunn diodes $\\rightarrow$ **IV**.\n2. **Visible light (B)** is emitted by transition of valence electrons in atoms from higher to lower energy levels $\\rightarrow$ **I**.\n3. **Gamma rays (C)** are produced in nuclear reactions and radioactive decay of atomic nuclei $\\rightarrow$ **II**.\n4. **Infra-red rays (D)** are produced by hot bodies and thermal vibrations of atoms and molecules $\\rightarrow$ **III**.\n\nHence, the correct matching is **A-IV, B-I, C-II, D-III**.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 4,
    question_text: "A parallel plate capacitor made of circular plates is being charged such that the surface charge density on its plates is increasing at a constant rate with time. The magnetic field arising due to displacement current is :",
    options: [
      "Non-zero everywhere with maximum at the imaginary cylindrical surface connecting peripheries of the plates",
      "Zero between the plates and non-zero outside",
      "Zero at all places",
      "Constant between the plates and zero outside the plates"
    ],
    correct_option: "A",
    solution: "1. For circular plates of radius $R$, displacement current $I_d$ is distributed uniformly across the cross-section.\n2. Inside the plates ($r < R$), Ampere-Maxwell law gives:\n$$B(2\\pi r) = \\mu_0 I_d(r) = \\mu_0 \\left(\\frac{\\pi r^2}{\\pi R^2} I_d\\right) \\implies B = \\frac{\\mu_0 I_d r}{2\\pi R^2}$$\nHere, $B$ increases linearly with distance $r$ from the central axis.\n3. Outside the plates ($r \\ge R$):\n$$B(2\\pi r) = \\mu_0 I_d \\implies B = \\frac{\\mu_0 I_d}{2\\pi r}$$\nHere, $B$ decreases inversely with $r$.\n4. Thus, the magnetic field is non-zero everywhere (except at the axis $r = 0$) and reaches its maximum value at the rim/periphery ($r = R$).",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 5,
    question_text: "The electric field in a plane electromagnetic wave is given by $E_z = 60 \\cos(5x + 1.5 \\times 10^9 t)\\text{ V/m}$. Then expression for the corresponding magnetic field is (here subscripts denote the direction of the field) :",
    options: [
      "$B_z = 60\\cos(5x + 1.5 \\times 10^9 t)\\text{ T}$",
      "$B_y = 60\\sin(5x + 1.5 \\times 10^9 t)\\text{ T}$",
      "$B_y = 2 \\times 10^{-7}\\cos(5x + 1.5 \\times 10^9 t)\\text{ T}$",
      "$B_x = 2 \\times 10^{-7}\\cos(5x + 1.5 \\times 10^9 t)\\text{ T}$"
    ],
    correct_option: "C",
    solution: "1. Given $E_z = 60 \\cos(5x + 1.5 \\times 10^9 t)\\text{ V/m}$:\nWave vector $k = 5\\text{ rad/m}$ and angular frequency $\\omega = 1.5 \\times 10^9\\text{ rad/s}$.\nWave speed $v = \\frac{\\omega}{k} = \\frac{1.5 \\times 10^9}{5} = 3 \\times 10^8\\text{ m/s} = c$.\n2. Amplitude of magnetic field:\n$$B_0 = \\frac{E_0}{c} = \\frac{60}{3 \\times 10^8} = 2 \\times 10^{-7}\\text{ T}$$\n3. Direction of propagation: The argument $(5x + \\omega t)$ means the wave propagates in the $-x$ direction, so $\\hat{v} = -\\hat{i}$.\nThe electric field oscillates along the $z$-direction, so $\\hat{E} = \\hat{k}$.\nSince $\\hat{v} = \\hat{E} \\times \\hat{B}$:\n$$-\\hat{i} = \\hat{k} \\times \\hat{B} \\implies \\hat{B} = \\hat{j}$$\nThus, the magnetic field is along the $y$-direction:\n$$B_y = 2 \\times 10^{-7}\\cos(5x + 1.5 \\times 10^9 t)\\text{ T}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 6,
    question_text: "The electromagnetic radiation which has the smallest wavelength are :",
    options: [
      "X-rays",
      "Gamma rays",
      "Ultraviolet rays",
      "Microwaves"
    ],
    correct_option: "B",
    solution: "In the electromagnetic spectrum ordered by decreasing wavelength (increasing frequency and photon energy):\n$$\\text{Radio waves} > \\text{Microwaves} > \\text{Infrared} > \\text{Visible} > \\text{Ultraviolet} > \\text{X-rays} > \\text{Gamma rays}$$\nGamma rays have the highest frequencies ($> 10^{19}\\text{ Hz}$) and the shortest wavelengths ($< 10^{-11}\\text{ m}$).",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 7,
    question_text: "If the ratio of relative permeability and relative permittivity of a uniform medium is $1 : 4$. The ratio of the magnitudes of electric field intensity ($E$) to the magnetic field intensity ($H$) of an EM wave propagating in that medium is (Given that $\\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} = 120\\pi$) :",
    options: [
      "$30\\pi : 1$",
      "$1 : 120\\pi$",
      "$60\\pi : 1$",
      "$120\\pi : 1$"
    ],
    correct_option: "C",
    solution: "1. The ratio of electric field intensity to magnetic field intensity is the intrinsic wave impedance of the medium ($Z$):\n$$Z = \\frac{E}{H} = \\sqrt{\\frac{\\mu}{\\varepsilon}} = \\sqrt{\\frac{\\mu_0 \\mu_r}{\\varepsilon_0 \\varepsilon_r}} = \\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} \\sqrt{\\frac{\\mu_r}{\\varepsilon_r}}$$\n2. Given $\\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} = 120\\pi$ and $\\frac{\\mu_r}{\\varepsilon_r} = \\frac{1}{4}$:\n$$Z = 120\\pi \\times \\sqrt{\\frac{1}{4}} = 120\\pi \\times \\frac{1}{2} = 60\\pi$$\nTherefore, the ratio is $60\\pi : 1$.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 8,
    question_text: "A parallel plate capacitor is charged by connecting it to a battery through a resistor. If $I$ is the current in the circuit, then in the gap between the plates :",
    options: [
      "There is no current",
      "Displacement current of magnitude equal to $I$ flows in the same direction as $I$",
      "Displacement current of magnitude equal to $I$ flows in a direction opposite to that of $I$",
      "Displacement current of magnitude greater than $I$ flows but can be in any direction"
    ],
    correct_option: "B",
    solution: "According to Maxwell's concept of displacement current, Ampere's circuital law was generalized to maintain the continuity of current across the circuit:\n$$I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$$\nInside the gap between the capacitor plates, the changing electric field produces a displacement current whose magnitude is precisely equal to the conduction current $I$ entering the plates, and it flows in the same direction as $I$.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 9,
    question_text: "The property which is not of an electromagnetic wave travelling in free space is that :",
    options: [
      "They are transverse in nature",
      "The energy density in electric field is equal to energy density in magnetic field",
      "They travel with a speed equal to $\\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$",
      "They originate from charges moving with uniform speed"
    ],
    correct_option: "D",
    solution: "1. Electromagnetic waves are produced by **accelerated** or oscillating charges, where the accelerated motion creates time-varying electric and magnetic fields.\n2. A stationary charge produces only an electrostatic field, while a charge moving with uniform (constant) speed produces both a static electric field and a steady magnetic field, but **no** radiation is emitted.\nHence, statement (D) is not a property of EM waves.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 10,
    question_text: "$\\varepsilon_0$ and $\\mu_0$ are the electric permittivity and magnetic permeability of free space respectively. If the corresponding quantities of a medium are $2\\varepsilon_0$ and $1.5\\mu_0$ respectively, the refractive index of the medium will nearly be :",
    options: [
      "$\\sqrt{2}$",
      "$\\sqrt{3}$",
      "$3$",
      "$2$"
    ],
    correct_option: "B",
    solution: "1. The refractive index $n$ of a medium is given by:\n$$n = \\frac{c}{v} = \\sqrt{\\varepsilon_r \\mu_r}$$\n2. Relative permittivity is $\\varepsilon_r = \\frac{\\varepsilon}{\\varepsilon_0} = 2$.\n3. Relative permeability is $\\mu_r = \\frac{\\mu}{\\mu_0} = 1.5$.\n4. Therefore:\n$$n = \\sqrt{2 \\times 1.5} = \\sqrt{3} \\approx 1.732$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 11,
    question_text: "In a plane electromagnetic wave travelling in free space, the electric field component oscillates sinusoidally at a frequency of $2.0 \\times 10^{10}\\text{ Hz}$ and amplitude $48\\text{ V m}^{-1}$. Then the amplitude of oscillating magnetic field is : (Speed of light in free space $= 3 \\times 10^8\\text{ ms}^{-1}$)",
    options: [
      "$1.6 \\times 10^{-8}\\text{ T}$",
      "$1.6 \\times 10^{-7}\\text{ T}$",
      "$1.6 \\times 10^{-6}\\text{ T}$",
      "$1.6 \\times 10^{-9}\\text{ T}$"
    ],
    correct_option: "B",
    solution: "In a plane electromagnetic wave propagating in free space, the ratio of the amplitudes of the electric and magnetic fields equals the speed of light:\n$$c = \\frac{E_0}{B_0} \\implies B_0 = \\frac{E_0}{c}$$\nGiven $E_0 = 48\\text{ V m}^{-1}$ and $c = 3 \\times 10^8\\text{ m s}^{-1}$:\n$$B_0 = \\frac{48}{3 \\times 10^8} = 16 \\times 10^{-8}\\text{ T} = 1.6 \\times 10^{-7}\\text{ T}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 12,
    question_text: "The magnetic field of a plane electromagnetic wave is given by $\\vec{B} = 3 \\times 10^{-8} \\cos(1.6 \\times 10^3 x + 48 \\times 10^{10} t)\\hat{j}\\text{ T}$, then the associated electric field will be :",
    options: [
      "$9\\cos(1.6 \\times 10^3 x + 48 \\times 10^{10} t)\\hat{k}\\text{ V/m}$",
      "$3 \\times 10^{-8} \\cos(1.6 \\times 10^3 x + 48 \\times 10^{10} t)\\hat{i}\\text{ V/m}$",
      "$3 \\times 10^{-8} \\sin(1.6 \\times 10^3 x + 48 \\times 10^{10} t)\\hat{i}\\text{ V/m}$",
      "$9\\sin(1.6 \\times 10^3 x - 48 \\times 10^{10} t)\\hat{k}\\text{ V/m}$"
    ],
    correct_option: "A",
    solution: "1. The wave travels along $-x$ direction because of $(1.6 \\times 10^3 x + 48 \\times 10^{10} t)$, so unit vector of propagation is $\\hat{v} = -\\hat{i}$.\n2. The speed of the wave is:\n$$v = \\frac{\\omega}{k} = \\frac{48 \\times 10^{10}}{1.6 \\times 10^3} = 3 \\times 10^8\\text{ m/s}$$\n3. The amplitude of the electric field is:\n$$E_0 = c B_0 = (3 \\times 10^8\\text{ m/s})(3 \\times 10^{-8}\\text{ T}) = 9\\text{ V/m}$$\n4. For direction: $\\hat{v} = \\hat{E} \\times \\hat{B} \\implies -\\hat{i} = \\hat{E} \\times \\hat{j} \\implies \\hat{E} = \\hat{k}$.\nTherefore:\n$$\\vec{E} = 9\\cos(1.6 \\times 10^3 x + 48 \\times 10^{10} t)\\hat{k}\\text{ V/m}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 13,
    question_text: "The ratio of the magnitude of the magnetic field and electric field intensity of a plane electromagnetic wave in free space of permeability $\\mu_0$ and permittivity $\\varepsilon_0$ is (Given that $c$ is the velocity of light in free space) :",
    options: [
      "$\\frac{\\sqrt{\\mu_0 \\varepsilon_0}}{c}$",
      "$c$",
      "$\\frac{1}{c}$",
      "$\\frac{c}{\\sqrt{\\mu_0 \\varepsilon_0}}$"
    ],
    correct_option: "C",
    solution: "For a plane electromagnetic wave propagating in free space, the relation between the magnitudes of the electric field $E$ and magnetic field $B$ is:\n$$c = \\frac{E}{B}$$\nTherefore, the ratio of the magnitude of the magnetic field to the electric field is:\n$$\\frac{B}{E} = \\frac{1}{c}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 14,
    question_text: "Match List - I with List - II :\n\n| List - I (Electromagnetic waves) | List - II (Wavelength) |\n| :--- | :--- |\n| (a) AM radio waves | (i) $10^{-10}\\text{ m}$ |\n| (b) Microwaves | (ii) $10^2\\text{ m}$ |\n| (c) Infrared radiations | (iii) $10^{-2}\\text{ m}$ |\n| (d) X-rays | (iv) $10^{-4}\\text{ m}$ |\n\nChoose the correct answer from the options given below :",
    options: [
      "(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)",
      "(a) - (iii), (b) - (ii), (c) - (i), (d) - (iv)",
      "(a) - (iii), (b) - (iv), (c) - (ii), (d) - (i)",
      "(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)"
    ],
    correct_option: "D",
    solution: "Typical orders of wavelength for regions of the electromagnetic spectrum:\n1. **AM radio waves (a)** $\\sim 10^2\\text{ m}$ $\\rightarrow$ **(ii)**\n2. **Microwaves (b)** $\\sim 10^{-2}\\text{ m}$ $\\rightarrow$ **(iii)**\n3. **Infrared radiations (c)** $\\sim 10^{-4}\\text{ m}$ $\\rightarrow$ **(iv)**\n4. **X-rays (d)** $\\sim 10^{-10}\\text{ m}$ $\\rightarrow$ **(i)**\n\nThus, the correct matching is **(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)**.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 15,
    question_text: "When light propagates through a material medium of relative permittivity $\\varepsilon_r$ and relative permeability $\\mu_r$, the velocity of light, $v$ is given by ($c$ is velocity of light in vacuum) :",
    options: [
      "$v = c$",
      "$v = \\sqrt{\\frac{\\mu_r}{\\varepsilon_r}}$",
      "$v = \\sqrt{\\frac{\\varepsilon_r}{\\mu_r}}$",
      "$v = \\frac{c}{\\sqrt{\\varepsilon_r \\mu_r}}$"
    ],
    correct_option: "D",
    solution: "The speed of light in vacuum is $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$.\nIn a material medium with permeability $\\mu = \\mu_0 \\mu_r$ and permittivity $\\varepsilon = \\varepsilon_0 \\varepsilon_r$, the wave speed is:\n$$v = \\frac{1}{\\sqrt{\\mu \\varepsilon}} = \\frac{1}{\\sqrt{\\mu_0 \\mu_r \\varepsilon_0 \\varepsilon_r}} = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} \\frac{1}{\\sqrt{\\varepsilon_r \\mu_r}} = \\frac{c}{\\sqrt{\\varepsilon_r \\mu_r}}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 16,
    question_text: "For a plane electromagnetic wave propagating in $x$-direction, which one of the following combination gives the correct possible directions for electric field ($E$) and magnetic field ($B$) respectively?",
    options: [
      "$-\\hat{j} + \\hat{k}, -\\hat{j} + \\hat{k}$",
      "$\\hat{j} + \\hat{k}, \\hat{j} + \\hat{k}$",
      "$-\\hat{j} + \\hat{k}, -\\hat{j} - \\hat{k}$",
      "$\\hat{j} + \\hat{k}, -\\hat{j} - \\hat{k}$"
    ],
    correct_option: "C",
    solution: "For an electromagnetic wave, the direction of propagation must be given by $\\vec{E} \\times \\vec{B}$ and the two fields must be mutually perpendicular ($\\vec{E} \\cdot \\vec{B} = 0$).\nHere, the wave propagates along $+x$ ($\\\\hat{i}$).\nChecking option (C):\n1. $\\vec{E} \\cdot \\vec{B} = (-\\hat{j} + \\hat{k}) \\cdot (-\\hat{j} - \\hat{k}) = 1 - 1 = 0$ (mutually perpendicular).\n2. $\\vec{E} \\times \\vec{B} = (-\\hat{j} + \\hat{k}) \\times (-\\hat{j} - \\hat{k}) = (\\hat{j} \\times \\hat{k}) - (\\hat{k} \\times \\hat{j}) = \\hat{i} - (-\\hat{i}) = 2\\hat{i}$.\nThe cross product points in the $+x$ direction ($\\\\hat{i}$), matching the direction of wave propagation.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 17,
    question_text: "The E.M. wave with shortest wavelength among the following is :",
    options: [
      "Microwaves",
      "Ultraviolet rays",
      "X-rays",
      "Gamma-rays"
    ],
    correct_option: "D",
    solution: "Among all electromagnetic radiations, gamma-rays have the highest frequency ($f > 10^{19}\\text{ Hz}$) and the shortest wavelength (typically $\\lambda < 10^{-11}\\text{ m} = 10^{-2}\\text{ nm}$).",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 18,
    question_text: "The magnetic field in a plane electromagnetic wave is given by $B_y = 2 \\times 10^{-7} \\sin(\\pi \\times 10^3 x + 3\\pi \\times 10^{11} t)\\text{ T}$. Calculate the wavelength.",
    options: [
      "$\\pi \\times 10^{-3}\\text{ m}$",
      "$\\pi \\times 10^3\\text{ m}$",
      "$2 \\times 10^{-3}\\text{ m}$",
      "$2 \\times 10^3\\text{ m}$"
    ],
    correct_option: "C",
    solution: "Comparing the given equation with the standard wave equation $B_y = B_0 \\sin(kx + \\omega t)$:\n$$k = \\pi \\times 10^3\\text{ rad/m}$$\nThe relationship between propagation constant $k$ and wavelength $\\lambda$ is:\n$$k = \\frac{2\\pi}{\\lambda} \\implies \\lambda = \\frac{2\\pi}{k}$$\n$$\\lambda = \\frac{2\\pi}{\\pi \\times 10^3} = 2 \\times 10^{-3}\\text{ m}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 19,
    question_text: "The ratio of contributions made by the electric field and magnetic field components to the intensity of an electromagnetic wave is : ($c$ is speed of electromagnetic waves)",
    options: [
      "$1 : 1$",
      "$1 : c$",
      "$1 : c^2$",
      "$c : 1$"
    ],
    correct_option: "A",
    solution: "In an electromagnetic wave, the total energy density is equally shared between the electric and magnetic fields:\n$$u_E = \\frac{1}{4}\\varepsilon_0 E_0^2, \\quad u_B = \\frac{B_0^2}{4\\mu_0}$$\nSince $E_0 = c B_0$ and $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$:\n$$u_E = \\frac{1}{4}\\varepsilon_0 (c B_0)^2 = \\frac{1}{4}\\varepsilon_0 \\left(\\frac{1}{\\mu_0 \\varepsilon_0}\\right) B_0^2 = \\frac{B_0^2}{4\\mu_0} = u_B$$\nSince intensity is $I = u \\cdot c$, the intensity contributions from both components are equal, yielding a ratio of $1 : 1$.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 20,
    question_text: "For a transparent medium, relative permeability and permittivity, $\\mu_r$ and $\\varepsilon_r$ are $1.0$ and $1.44$ respectively. The velocity of light in this medium would be :",
    options: [
      "$4.32 \\times 10^8\\text{ m/s}$",
      "$2.5 \\times 10^8\\text{ m/s}$",
      "$3 \\times 10^8\\text{ m/s}$",
      "$2.08 \\times 10^8\\text{ m/s}$"
    ],
    correct_option: "B",
    solution: "The speed of light in a medium is given by:\n$$v = \\frac{c}{\\sqrt{\\mu_r \\varepsilon_r}}$$\nGiven $\\mu_r = 1.0$, $\\varepsilon_r = 1.44$, and $c = 3 \\times 10^8\\text{ m/s}$:\n$$v = \\frac{3 \\times 10^8}{\\sqrt{1.0 \\times 1.44}} = \\frac{3 \\times 10^8}{1.2} = 2.5 \\times 10^8\\text{ m/s}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 21,
    question_text: "Which colour of the light has the longest wavelength?",
    options: [
      "blue",
      "violet",
      "red",
      "green"
    ],
    correct_option: "C",
    solution: "In the visible spectrum arranged in order of increasing wavelength (VIBGYOR):\n$$\\lambda_{\\text{violet}} (\\sim 400\\text{ nm}) < \\lambda_{\\text{blue}} < \\lambda_{\\text{green}} < \\lambda_{\\text{yellow}} < \\lambda_{\\text{orange}} < \\lambda_{\\text{red}} (\\sim 700\\text{ nm})$$\nTherefore, red light has the longest wavelength in the visible region.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 22,
    question_text: "An EM wave is propagating in a medium with a velocity $\\vec{v} = v\\hat{i}$. The instantaneous oscillating electric field of this em wave is along $+y$ axis. Then the direction of oscillating magnetic field of the em wave will be along :",
    options: [
      "$-z\\text{ direction}$",
      "$+z\\text{ direction}$",
      "$-y\\text{ direction}$",
      "$-x\\text{ direction}$"
    ],
    correct_option: "B",
    solution: "The direction of wave propagation of an electromagnetic wave is parallel to the Poynting vector $\\vec{S} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B})$.\nHere, $\\vec{v} = v\\hat{i}$ and $\\vec{E} = E\\hat{j}$.\nTherefore:\n$$\\hat{E} \\times \\hat{B} = \\hat{v} \\implies \\hat{j} \\times \\hat{B} = \\hat{i}$$\nSince $\\hat{j} \\times \\hat{k} = \\hat{i}$, the magnetic field vector $\\vec{B}$ must be along the $+z$ direction.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 23,
    question_text: "In an electromagnetic wave in free space that root mean square value of the electric field is $E_{rms} = 6\\text{ V m}^{-1}$. The peak value of the magnetic field is :",
    options: [
      "$2.83 \\times 10^{-8}\\text{ T}$",
      "$0.70 \\times 10^{-8}\\text{ T}$",
      "$4.23 \\times 10^{-8}\\text{ T}$",
      "$1.41 \\times 10^{-8}\\text{ T}$"
    ],
    correct_option: "A",
    solution: "1. The peak electric field $E_0$ is given by:\n$$E_0 = \\sqrt{2} E_{rms} = \\sqrt{2} \\times 6\\text{ V m}^{-1}$$\n2. The peak magnetic field $B_0$ in free space is:\n$$B_0 = \\frac{E_0}{c} = \\frac{6\\sqrt{2}}{3 \\times 10^8} = 2\\sqrt{2} \\times 10^{-8}\\text{ T}$$\n3. Since $\\sqrt{2} \\approx 1.414$:\n$$B_0 = 2 \\times 1.414 \\times 10^{-8} = 2.828 \\times 10^{-8}\\text{ T} \\approx 2.83 \\times 10^{-8}\\text{ T}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 24,
    question_text: "Out of the following options which one can be used to produce a propagating electromagnetic wave?",
    options: [
      "A chargeless particle",
      "An accelerating charge",
      "A charge moving at constant velocity",
      "A stationary charge"
    ],
    correct_option: "B",
    solution: "1. A stationary charge produces only a static electric field.\n2. A charge moving with uniform velocity produces a steady electric field and a steady magnetic field, but no electromagnetic waves.\n3. An accelerated charge produces changing electric and magnetic fields that regenerate each other continuously in space, radiating energy in the form of electromagnetic waves.\n4. A chargeless particle produces no electromagnetic fields.\nHence, an accelerating charge produces propagating EM waves.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 25,
    question_text: "The energy of the em waves is of the order of $15\\text{ keV}$. To which part of the spectrum does it belong?",
    options: [
      "Ultraviolet rays",
      "$\\gamma$-rays",
      "X-rays",
      "Infra-red rays"
    ],
    correct_option: "C",
    solution: "1. The photon energy is $E = 15\\text{ keV} = 15 \\times 10^3 \\times 1.6 \\times 10^{-19}\\text{ J} = 2.4 \\times 10^{-15}\\text{ J}$.\n2. The wavelength of the radiation is:\n$$\\lambda = \\frac{h c}{E} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{2.4 \\times 10^{-15}} \\approx 0.83 \\times 10^{-10}\\text{ m} = 0.83\\text{ \\AA}$$\n3. Radiations having wavelengths in the range of $0.1\\text{ \\AA}$ to $100\\text{ \\AA}$ ($10^{-11}\\text{ m}$ to $10^{-8}\\text{ m}$) belong to the **X-ray** region of the electromagnetic spectrum.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 26,
    question_text: "A radiation of energy $E$ falls normally on a perfectly reflecting surface. The momentum transferred to the surface is ($C$ is velocity of light) :",
    options: [
      "$\\frac{2E}{C^2}$",
      "$\\frac{E}{C^2}$",
      "$\\frac{E}{C}$",
      "$\\frac{2E}{C}$"
    ],
    correct_option: "D",
    solution: "1. The momentum of an electromagnetic radiation of energy $E$ is $p = \\frac{E}{C}$.\n2. For a perfectly reflecting surface at normal incidence, the incident momentum is $p_{\\text{initial}} = +\\frac{E}{C}$ and the reflected momentum is $p_{\\text{final}} = -\\frac{E}{C}$.\n3. The change in momentum (momentum transferred to the surface) is:\n$$\\Delta p = p_{\\text{initial}} - p_{\\text{final}} = \\frac{E}{C} - \\left(-\\frac{E}{C}\\right) = \\frac{2E}{C}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 27,
    question_text: "Light with an energy flux of $25 \\times 10^4\\text{ W m}^{-2}$ falls on a perfectly reflecting surface at normal incidence. If the surface area is $15\\text{ cm}^2$, the average force exerted on the surface is :",
    options: [
      "$1.25 \\times 10^{-6}\\text{ N}$",
      "$2.50 \\times 10^{-6}\\text{ N}$",
      "$1.20 \\times 10^{-6}\\text{ N}$",
      "$3.0 \\times 10^{-6}\\text{ N}$"
    ],
    correct_option: "B",
    solution: "1. The total power incident on the surface is:\n$$P = S \\times A = (25 \\times 10^4\\text{ W/m}^2) \\times (15 \\times 10^{-4}\\text{ m}^2) = 375\\text{ W}$$\n2. For complete reflection at normal incidence, the radiation pressure is $P_{\\text{rad}} = \\frac{2S}{c}$, so the total average force is:\n$$F = \\frac{2P}{c} = \\frac{2 \\times 375\\text{ W}}{3 \\times 10^8\\text{ m/s}} = \\frac{750}{3 \\times 10^8} = 2.50 \\times 10^{-6}\\text{ N}$$",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 28,
    question_text: "An electromagnetic wave of frequency $\\nu = 3.0\\text{ MHz}$ passes from vacuum into a dielectric medium with relative permittivity $\\varepsilon_r = 4.0$. Then :",
    options: [
      "Wavelength is doubled and frequency becomes half.",
      "Wavelength is halved and frequency remains unchanged.",
      "Wavelength and frequency both remain unchanged.",
      "Wavelength is doubled and frequency unchanged."
    ],
    correct_option: "B",
    solution: "1. Frequency $\\nu$ is an intrinsic characteristic of the emitting source and remains unchanged when an electromagnetic wave travels from one medium to another.\n2. The refractive index of the non-magnetic medium ($\\mu_r = 1$) is:\n$$n = \\sqrt{\\varepsilon_r} = \\sqrt{4.0} = 2$$\n3. The speed of the wave in the medium becomes $v = \\frac{c}{n} = \\frac{c}{2}$.\n4. Therefore, the wavelength in the medium is:\n$$\\lambda' = \\frac{v}{\\nu} = \\frac{c/2}{\\nu} = \\frac{\\lambda}{2}$$\nHence, the wavelength is halved and the frequency remains unchanged.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 29,
    question_text: "The condition under which a microwave oven heats up a food item containing water molecules most efficiently is :",
    options: [
      "Microwaves are heat waves, so always produce heating.",
      "Infra-red waves produce heating in a microwave oven.",
      "The frequency of the microwaves must match the resonant frequency of the water molecules.",
      "The frequency of the microwaves has no relation with natural frequency of water molecules."
    ],
    correct_option: "C",
    solution: "Microwave ovens work on the principle of dielectric heating: the alternating electric field of the microwaves exerts torques on polar water molecules. When the operating frequency of the microwaves matches the natural rotation/resonant frequency of water molecules, maximum energy is absorbed due to resonance, rapidly converting electromagnetic energy into thermal energy.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 30,
    question_text: "The ratio of amplitude of magnetic field to the amplitude of electric field for an electromagnetic wave propagating in vacuum is equal to :",
    options: [
      "the speed of light in vacuum",
      "reciprocal of speed of light in vacuum",
      "the ratio of magnetic permeability to the electric susceptibility of vacuum",
      "unity"
    ],
    correct_option: "B",
    solution: "For an electromagnetic wave in vacuum, the relation between the amplitude of the electric field $E_0$ and the magnetic field $B_0$ is:\n$$E_0 = c B_0 \\implies \\frac{B_0}{E_0} = \\frac{1}{c}$$\nThus, the ratio $\\frac{B_0}{E_0}$ is equal to the reciprocal of the speed of light in vacuum.",
    subject: "Physics",
    chapter: "Electromagnetic Waves",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];

