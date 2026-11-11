export const EMW_PYQ_PART2 = [
  {
    question_number: 31,
    question_text: "The electric field associated with an em wave in vacuum is given by $\\vec{E} = \\hat{i} 40 \\cos(kz - 6 \\times 10^8 t)$ where $E$, $z$ and $t$ are in volt/m, meter and seconds respectively. The value of wave vector $k$ is :",
    options: [
      "$2\\text{ m}^{-1}$",
      "$0.5\\text{ m}^{-1}$",
      "$6\\text{ m}^{-1}$",
      "$3\\text{ m}^{-1}$"
    ],
    correct_option: "A",
    solution: "Comparing the electric field equation with standard form $E = E_0 \\cos(kz - \\omega t)$:\n$$\\omega = 6 \\times 10^8\\text{ rad/s}$$\nIn vacuum, the speed of an electromagnetic wave is $c = 3 \\times 10^8\\text{ m/s}$.\nThe wave vector $k$ is related to angular frequency by:\n$$k = \\frac{\\omega}{c} = \\frac{6 \\times 10^8\\text{ rad/s}}{3 \\times 10^8\\text{ m/s}} = 2\\text{ m}^{-1}$$",
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
    question_number: 32,
    question_text: "The electric and the magnetic field, associated with an e.m. wave, propagating along the $+z$-axis, can be represented by :",
    options: [
      "$\\vec{E} = E_0\\hat{i}, \\vec{B} = B_0\\hat{j}$",
      "$\\vec{E} = E_0\\hat{k}, \\vec{B} = B_0\\hat{i}$",
      "$\\vec{E} = E_0\\hat{j}, \\vec{B} = B_0\\hat{i}$",
      "$\\vec{E} = E_0\\hat{j}, \\vec{B} = B_0\\hat{k}$"
    ],
    correct_option: "A",
    solution: "The direction of propagation of an electromagnetic wave is given by the cross product of the unit vectors of electric and magnetic fields:\n$$\\hat{v} = \\hat{E} \\times \\hat{B}$$\nHere, the wave propagates along the $+z$-axis, so $\\hat{v} = \\hat{k}$.\nFor option (A):\n$$\\vec{E} \\times \\vec{B} = (E_0\\hat{i}) \\times (B_0\\hat{j}) = E_0 B_0 (\\hat{i} \\times \\hat{j}) = E_0 B_0 \\hat{k}$$\nSince $\\hat{i} \\times \\hat{j} = \\hat{k}$, this correctly represents an electromagnetic wave propagating along the $+z$-axis.",
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
    question_number: 33,
    question_text: "The decreasing order of wavelength of infrared, microwave, ultraviolet and gamma rays is :",
    options: [
      "microwave, infrared, ultraviolet, gamma rays",
      "gamma rays, ultraviolet, infrared, microwaves",
      "microwaves, gamma rays, infrared, ultraviolet",
      "infrared, microwave, ultraviolet, gamma rays"
    ],
    correct_option: "A",
    solution: "In the electromagnetic spectrum, arranged in order of decreasing wavelength:\n$$\\text{Microwaves } (10^{-3}\\text{ to } 10^{-1}\\text{ m}) > \\text{Infrared } (700\\text{ nm to } 1\\text{ mm}) > \\text{Ultraviolet } (10\\text{ to } 400\\text{ nm}) > \\text{Gamma rays } (< 10^{-11}\\text{ m})$$\nHence, the decreasing order of wavelength is **microwave, infrared, ultraviolet, gamma rays**.",
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
    question_number: 34,
    question_text: "The electric field of an electromagnetic wave in free space is given by $\\vec{E} = 10 \\cos(10^7 t + kx)\\hat{j}\\text{ V/m}$, where $t$ and $x$ are in seconds and metres respectively. It can be inferred that :\n(1) the wavelength $\\lambda$ is $188.4\\text{ m}$.\n(2) the wave number $k$ is $0.33\\text{ rad/m}$.\n(3) the wave amplitude is $10\\text{ V/m}$.\n(4) the wave is propagating along $+x$ direction.\n\nWhich one of the following pairs of statements is correct?",
    options: [
      "(3) and (4)",
      "(1) and (2)",
      "(2) and (3)",
      "(1) and (3)"
    ],
    correct_option: "D",
    solution: "From the given electric field $\\vec{E} = 10 \\cos(10^7 t + kx)\\hat{j}\\text{ V/m}$:\n1. The wave amplitude is $E_0 = 10\\text{ V/m}$ $\\rightarrow$ **Statement (3) is correct**.\n2. Angular frequency is $\\omega = 10^7\\text{ rad/s}$. In free space, wave speed is $c = 3 \\times 10^8\\text{ m/s}$.\nWave number $k$ is:\n$$k = \\frac{\\omega}{c} = \\frac{10^7}{3 \\times 10^8} = \\frac{1}{30} \\approx 0.033\\text{ rad/m}$$\nThus statement (2) is incorrect ($0.033 \\neq 0.33$).\n3. Wavelength $\\lambda$ is:\n$$\\lambda = \\frac{2\\pi}{k} = 2\\pi \\times 30 = 60\\pi \\approx 188.4\\text{ m}$$\nThus **Statement (1) is correct**.\n4. Since the argument is $(10^7 t + kx)$, the wave propagates in the $-x$ direction, so statement (4) is incorrect.\nTherefore, the correct pair of statements is **(1) and (3)**.",
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
    question_number: 35,
    question_text: "Which of the following statements is false for the properties of electromagnetic waves?",
    options: [
      "Both electric and magnetic field vectors attain the maxima and minima at the same place and same time.",
      "The energy in electromagnetic wave is divided equally between electric and magnetic vectors.",
      "Both electric and magnetic field vectors are parallel to each other and perpendicular to the direction of propagation of wave.",
      "These waves do not require any material medium for propagation."
    ],
    correct_option: "C",
    solution: "In an electromagnetic wave:\n1. The electric field $\\vec{E}$ and magnetic field $\\vec{B}$ are mutually **perpendicular** to each other ($\\vec{E} \\perp \\vec{B}$), as well as perpendicular to the direction of wave propagation (transverse wave nature).\n2. They oscillate in phase, reaching their maxima and minima at the same locations and times.\n3. The energy density is shared equally between $\\vec{E}$ and $\\vec{B}$.\n4. Being self-propagating oscillating fields, EM waves do not require any material medium.\nHence, statement (C) is false because $\\vec{E}$ and $\\vec{B}$ are perpendicular, not parallel.",
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
    question_number: 36,
    question_text: "The electric field part of an electromagnetic wave in a medium is represented by $E_x = 0$; $E_y = 2.5\\frac{\\text{N}}{\\text{C}} \\cos\\left[\\left(2\\pi \\times 10^6\\frac{\\text{rad}}{\\text{s}}\\right)t - \\left(\\pi \\times 10^{-2}\\frac{\\text{rad}}{\\text{m}}\\right)x\\right]$; $E_z = 0$. The wave is :",
    options: [
      "moving along $x$ direction with frequency $10^6\\text{ Hz}$ and wavelength $100\\text{ m}$",
      "moving along $x$ direction with frequency $10^6\\text{ Hz}$ and wavelength $200\\text{ m}$",
      "moving along $-x$ direction with frequency $10^6\\text{ Hz}$ and wavelength $200\\text{ m}$",
      "moving along $y$ direction with frequency $2\\pi \\times 10^6\\text{ Hz}$ and wavelength $200\\text{ m}$"
    ],
    correct_option: "B",
    solution: "1. The wave equation has the phase $(\\omega t - kx)$. The minus sign before $kx$ signifies propagation along the $+x$ direction.\n2. Angular frequency is $\\omega = 2\\pi \\times 10^6\\text{ rad/s}$:\n$$2\\pi f = 2\\pi \\times 10^6 \\implies f = 10^6\\text{ Hz}$$\n3. Wave vector is $k = \\pi \\times 10^{-2}\\text{ rad/m}$:\n$$\\lambda = \\frac{2\\pi}{k} = \\frac{2\\pi}{\\pi \\times 10^{-2}} = 200\\text{ m}$$\nTherefore, the wave is moving along the $x$-direction with frequency $10^6\\text{ Hz}$ and wavelength $200\\text{ m}$.",
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
    question_number: 37,
    question_text: "The velocity of electromagnetic radiation in a medium of permittivity $\\varepsilon_0$ and permeability $\\mu_0$ is given by :",
    options: [
      "$\\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$",
      "$\\sqrt{\\frac{\\mu_0}{\\varepsilon_0}}$",
      "$\\sqrt{\\frac{\\varepsilon_0}{\\mu_0}}$",
      "$\\sqrt{\\mu_0 \\varepsilon_0}$"
    ],
    correct_option: "A",
    solution: "From Maxwell's electromagnetic equations, the speed of light (electromagnetic radiation) in free space with permittivity $\\varepsilon_0$ and permeability $\\mu_0$ is:\n$$c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}$$",
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
    question_number: 38,
    question_text: "The electric and magnetic field of an electromagnetic wave are :",
    options: [
      "in opposite phase and perpendicular to each other",
      "in opposite phase and parallel to each other",
      "in phase and perpendicular to each other",
      "in phase and parallel to each other"
    ],
    correct_option: "C",
    solution: "In a plane electromagnetic wave propagating through space, the electric field vector $\\vec{E}$ and magnetic field vector $\\vec{B}$ oscillate in the same phase (reaching their crests and troughs simultaneously at the same point in space and time) and are mutually perpendicular to each other and to the direction of wave propagation.",
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
    question_number: 39,
    question_text: "If $\\lambda_v$, $\\lambda_x$ and $\\lambda_m$ represent the wavelengths of visible light, X-rays and microwaves respectively, then :",
    options: [
      "$\\lambda_m > \\lambda_x > \\lambda_v$",
      "$\\lambda_m > \\lambda_v > \\lambda_x$",
      "$\\lambda_v > \\lambda_x > \\lambda_m$",
      "$\\lambda_v > \\lambda_m > \\lambda_x$"
    ],
    correct_option: "B",
    solution: "Typical wavelength ranges in the electromagnetic spectrum:\n- Microwaves ($\\lambda_m$): $10^{-3}\\text{ m to } 10^{-1}\\text{ m}$\n- Visible light ($\\lambda_v$): $4 \\times 10^{-7}\\text{ m to } 7 \\times 10^{-7}\\text{ m}$\n- X-rays ($\\lambda_x$): $10^{-11}\\text{ m to } 10^{-8}\\text{ m}$\nTherefore:\n$$\\lambda_m > \\lambda_v > \\lambda_x$$",
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
    question_number: 40,
    question_text: "We consider the radiation emitted by the human body. Which one of the following statements is true?",
    options: [
      "The radiation emitted is in the infra-red region",
      "The radiation emitted only during the day",
      "The radiation is emitted during the summers and absorbed during the winters",
      "The radiation emitted lies in the ultraviolet region and hence is not visible"
    ],
    correct_option: "A",
    solution: "The normal internal human body temperature is approximately $T \\approx 37^\\circ\\text{C} = 310\\text{ K}$.\nAccording to Wien's displacement law ($\\lambda_{\\text{max}} T = b$ where $b \\approx 2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}$):\n$$\\lambda_{\\text{max}} = \\frac{2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}}{310\\text{ K}} \\approx 9.35 \\times 10^{-6}\\text{ m} = 9.35\\ \\mu\\text{m}$$\nThis wavelength falls squarely in the **thermal infrared** (long-wave infrared) region of the electromagnetic spectrum. Thermal imaging cameras detect this infrared radiation.",
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
    question_number: 41,
    question_text: "Which of the following rays are not electromagnetic waves?",
    options: [
      "X-rays",
      "$\\gamma$-rays",
      "$\\beta$-rays",
      "heat rays"
    ],
    correct_option: "C",
    solution: "1. X-rays, $\\gamma$-rays, and heat rays (infrared radiation) are all electromagnetic waves composed of oscillating electric and magnetic fields traveling at the speed of light.\n2. $\\beta$-rays are high-speed streams of electrons ($\\beta^-$) or positrons ($\\beta^+$) emitted during nuclear decay. They are charged material particles possessing rest mass, and are not electromagnetic waves.",
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
    question_number: 42,
    question_text: "The velocity of electromagnetic wave is parallel to :",
    options: [
      "$\\vec{B} \\times \\vec{E}$",
      "$\\vec{E} \\times \\vec{B}$",
      "$\\vec{E}$",
      "$\\vec{B}$"
    ],
    correct_option: "B",
    solution: "The propagation vector and energy flow of an electromagnetic wave are defined by the Poynting vector:\n$$\\vec{S} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B})$$\nTherefore, the velocity vector $\\vec{v}$ of an electromagnetic wave is parallel to $\\vec{E} \\times \\vec{B}$.",
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
    question_number: 43,
    question_text: "What is the cause of Green house effect?",
    options: [
      "infra-red rays",
      "ultra violet rays",
      "X-rays",
      "radio waves"
    ],
    correct_option: "A",
    solution: "The greenhouse effect is primarily caused by infrared rays. The Earth absorbs short-wavelength solar radiation and re-emits thermal energy as longer-wavelength infrared radiation. Greenhouse gases (such as carbon dioxide and water vapor) in the atmosphere trap and absorb this infrared radiation, preventing it from escaping into space and keeping the surface warm.",
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
    question_number: 44,
    question_text: "Which of the following has minimum wavelength?",
    options: [
      "X-rays",
      "Ultraviolet rays",
      "$\\gamma$-rays",
      "Cosmic rays"
    ],
    correct_option: "D",
    solution: "Cosmic rays consist of astronomical high-energy particles and extreme-energy photons having frequencies greater than $10^{22}\\text{ Hz}$ and wavelengths shorter than $10^{-13}\\text{ m}$, which is shorter than $\\gamma$-rays ($10^{-13}-10^{-11}\\text{ m}$), X-rays, and ultraviolet rays.",
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
    question_number: 45,
    question_text: "Biological importance of ozone layer is :",
    options: [
      "it stops ultraviolet rays",
      "ozone layer reduces green house effect",
      "ozone layer reflects radio waves",
      "ozone layer controls $\\text{O}_2/\\text{H}_2$ ratio in atmosphere"
    ],
    correct_option: "A",
    solution: "The stratospheric ozone layer absorbs harmful high-energy ultraviolet (UV) radiation (especially UV-B and UV-C) from the Sun, preventing severe biological damage such as sunburns, skin cancer, cataract formation, and genetic mutations in living organisms.",
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
    question_number: 46,
    question_text: "The frequency order for $\\gamma$-rays ($a$), X-rays ($b$), UV rays ($c$) is :",
    options: [
      "$b > a > c$",
      "$a > b > c$",
      "$c > b > a$",
      "$a > c > b$"
    ],
    correct_option: "B",
    solution: "In the electromagnetic spectrum ordered by decreasing frequency (increasing wavelength):\n$$f_{\\gamma} (\\sim 10^{20}\\text{ Hz}) > f_X (\\sim 10^{18}\\text{ Hz}) > f_{UV} (\\sim 10^{15}\\text{ Hz})$$\nHence, $a > b > c$.",
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
    question_number: 47,
    question_text: "Ozone layer blocks the radiations of wavelength :",
    options: [
      "less than $3 \\times 10^{-7}\\text{ m}$",
      "equal to $3 \\times 10^{-7}\\text{ m}$",
      "more than $3 \\times 10^{-7}\\text{ m}$",
      "all of the above"
    ],
    correct_option: "A",
    solution: "The ozone layer strongly absorbs ultraviolet radiation in the UV-B and UV-C ranges, which have wavelengths shorter than approximately $300\\text{ nm} = 3 \\times 10^{-7}\\text{ m}$, allowing visible and infrared radiations to pass through.",
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
    question_number: 48,
    question_text: "The wavelength of light of frequency $100\\text{ Hz}$ is :",
    options: [
      "$2 \\times 10^6\\text{ m}$",
      "$3 \\times 10^6\\text{ m}$",
      "$4 \\times 10^6\\text{ m}$",
      "$5 \\times 10^6\\text{ m}$"
    ],
    correct_option: "B",
    solution: "The relationship between speed of light $c$, frequency $f$, and wavelength $\\lambda$ is:\n$$\\lambda = \\frac{c}{f}$$\nGiven $c = 3 \\times 10^8\\text{ m/s}$ and $f = 100\\text{ Hz}$:\n$$\\lambda = \\frac{3 \\times 10^8\\text{ m/s}}{100\\text{ s}^{-1}} = 3 \\times 10^6\\text{ m}$$",
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
    question_number: 49,
    question_text: "The electromagnetic radiations are caused by :",
    options: [
      "a stationary charge",
      "uniformly moving charges",
      "accelerated charges",
      "all of the above"
    ],
    correct_option: "C",
    solution: "According to classical electromagnetic theory (Maxwell's equations):\n- A static charge creates only an electrostatic field.\n- A charge moving at constant velocity produces a static magnetic field along with its electric field, but no energy is radiated.\n- Only when a charge undergoes acceleration (or oscillation) do the electric and magnetic fields fluctuate with time and propagate outwards as electromagnetic radiation.",
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
    question_number: 50,
    question_text: "If $\\varepsilon_0$ and $\\mu_0$ are the electric permittivity and magnetic permeability in a free space, $\\varepsilon$ and $\\mu$ are the corresponding quantities in medium, the index of refraction of the medium is :",
    options: [
      "$\\sqrt{\\frac{\\varepsilon_0 \\mu_0}{\\varepsilon \\mu}}$",
      "$\\sqrt{\\frac{\\varepsilon \\mu}{\\varepsilon_0 \\mu_0}}$",
      "$\\sqrt{\\frac{\\varepsilon_0 \\mu}{\\varepsilon \\mu_0}}$",
      "$\\sqrt{\\frac{\\varepsilon}{\\varepsilon_0}}$"
    ],
    correct_option: "B",
    solution: "1. Speed of light in vacuum is $c = \\frac{1}{\\sqrt{\\varepsilon_0 \\mu_0}}$.\n2. Speed of light in the medium is $v = \\frac{1}{\\sqrt{\\varepsilon \\mu}}$.\n3. The refractive index $n$ of the medium is:\n$$n = \\frac{c}{v} = \\frac{\\frac{1}{\\sqrt{\\varepsilon_0 \\mu_0}}}{\\frac{1}{\\sqrt{\\varepsilon \\mu}}} = \\sqrt{\\frac{\\varepsilon \\mu}{\\varepsilon_0 \\mu_0}}$$",
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
    question_number: 51,
    question_text: "The electric and magnetic field of an electromagnetic wave are :",
    options: [
      "in opposite phase and perpendicular to each other",
      "in opposite phase and parallel to each other",
      "in phase and perpendicular to each other",
      "in phase and parallel to each other"
    ],
    correct_option: "C",
    solution: "In a propagating electromagnetic wave, the electric and magnetic field vectors are orthogonal to each other and to the wave velocity direction (transverse waves). Furthermore, both fields oscillate with identical phase, attaining their maxima, zeros, and minima simultaneously.",
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
    question_number: 52,
    question_text: "Which of the following electromagnetic radiations have the smaller wavelength?",
    options: [
      "X-rays",
      "$\\gamma$-rays",
      "UV waves",
      "microwaves"
    ],
    correct_option: "B",
    solution: "Among the options listed, gamma rays ($\\gamma$-rays) have the highest frequencies and therefore possess the shortest (smallest) wavelengths (typically $\\lambda < 10^{-11}\\text{ m}$).",
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
    question_number: 53,
    question_text: "The structure of solids is investigated by using :",
    options: [
      "cosmic rays",
      "X-rays",
      "$\\gamma$-rays",
      "infra-red radiations"
    ],
    correct_option: "B",
    solution: "X-rays have wavelengths ($\\\\sim 0.1-1\\text{ nm}$) comparable to the interatomic spacings in crystal lattices. When incident on crystalline solids, they undergo diffraction according to Bragg's law ($2d\\sin\\theta = n\\lambda$), allowing precise determination of atomic arrangement and crystal structure.",
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
    question_number: 54,
    question_text: "The frequency of electromagnetic wave, which best suited to observe a particle of radius $3 \\times 10^{-4}\\text{ cm}$ is of the order of :",
    options: [
      "$10^{15}$",
      "$10^{14}$",
      "$10^{13}$",
      "$10^{12}$"
    ],
    correct_option: "B",
    solution: "To resolve and observe a microscopic particle, the wavelength $\\lambda$ of the probing electromagnetic wave must be of the same order of magnitude as the particle size:\n$$\\lambda \\approx 3 \\times 10^{-4}\\text{ cm} = 3 \\times 10^{-6}\\text{ m}$$\nThe corresponding frequency is:\n$$f = \\frac{c}{\\lambda} = \\frac{3 \\times 10^8\\text{ m/s}}{3 \\times 10^{-6}\\text{ m}} = 10^{14}\\text{ Hz}$$",
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
    question_number: 55,
    question_text: "Which of the following electromagnetic radiations have the longest wavelength?",
    options: [
      "X-rays",
      "$\\gamma$-rays",
      "Microwaves",
      "Radiowaves"
    ],
    correct_option: "D",
    solution: "In the electromagnetic spectrum, radiowaves possess the lowest frequencies and consequently the longest wavelengths, ranging from a few centimetres to thousands of kilometres ($\\lambda > 0.1\\text{ m}$).",
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
    question_number: 56,
    question_text: "A signal emitted by an antenna from a certain point can be received at another point of the surface in the form of :",
    options: [
      "sky wave",
      "ground wave",
      "sea wave",
      "both (1) and (2)"
    ],
    correct_option: "D",
    solution: "A radio signal propagated along the Earth's surface can travel either as a ground (surface) wave gliding along the curvature of the Earth, or as a sky wave reflected back from the ionosphere. Therefore, it can be received in the form of both sky waves and ground waves.",
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

