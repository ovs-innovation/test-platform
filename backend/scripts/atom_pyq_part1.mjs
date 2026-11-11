export const atomPyqPart1 = [
  {
    question_number: 1,
    exam_tag: "RE-NEET 2026",
    question_text: "Consider the following schematic plots of orbital wavefunction ($\\psi_r$) against distance ($r$) from the nucleus.\n\n![Orbital wavefunctions](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794387968/edvedum/structure_of_atom/q1_diagram.png)\n\nThe figure representing two radial nodes in the orbital is",
    options: [
      "D",
      "A",
      "B",
      "C"
    ],
    correct_option: "D",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1794387968/edvedum/structure_of_atom/q1_diagram.png",
    solution_text: "A radial node occurs at distances $r > 0$ where the radial wavefunction $\\psi_r$ passes through zero (changes sign).\n- Curve A has 0 radial nodes.\n- Curve B has 1 radial node.\n- Curve C crosses the $r$-axis twice at non-zero distances, meaning it has 2 radial nodes.\n- Curve D has 1 radial node.\nTherefore, the figure representing two radial nodes is C (which corresponds to Option D)."
  },
  {
    question_number: 2,
    exam_tag: "NEET 2026",
    question_text: "Match List I with List II :\n\n| List I (Quantum Numbers) | List II (Orbital) |\n| :--- | :--- |\n| A. $n = 2, l = 1$ | I. $3d$ |\n| B. $n = 4, l = 0$ | II. $2p$ |\n| C. $n = 5, l = 3$ | III. $4s$ |\n| D. $n = 3, l = 2$ | IV. $5f$ |\n\nChoose the correct answer from the options given below.",
    options: [
      "A-IV, B-II, C-III, D-I",
      "A-II, B-III, C-I, D-IV",
      "A-II, B-III, C-IV, D-I",
      "A-I, B-II, C-III, D-IV"
    ],
    correct_option: "C",
    solution_text: "Using the orbital notation based on principal quantum number $n$ and azimuthal quantum number $l$ ($l = 0 \\rightarrow s, 1 \\rightarrow p, 2 \\rightarrow d, 3 \\rightarrow f$):\n- A. $n = 2, l = 1 \\rightarrow 2p$ (II)\n- B. $n = 4, l = 0 \\rightarrow 4s$ (III)\n- C. $n = 5, l = 3 \\rightarrow 5f$ (IV)\n- D. $n = 3, l = 2 \\rightarrow 3d$ (I)\nThus, the correct match is A-II, B-III, C-IV, D-I."
  },
  {
    question_number: 3,
    exam_tag: "NEET 2026",
    question_text: "A bulb is rated at $150\\text{ watt}$, converting $8\\%$ energy into light. If energy of one photon is $4.42 \\times 10^{-19}\\text{ J}$, how many photons are emitted by the bulb per second?",
    options: [
      "$2.71 \\times 10^{19}$",
      "$4.06 \\times 10^{19}$",
      "$27.2 \\times 10^{19}$",
      "$1.35 \\times 10^{19}$"
    ],
    correct_option: "A",
    solution_text: "Power converted into light:\n$$P_{\\text{light}} = 8\\% \\text{ of } 150\\text{ W} = \\frac{8}{100} \\times 150 = 12\\text{ J s}^{-1}$$\nEnergy of light emitted per second $= 12\\text{ J}$.\nEnergy of one photon $= 4.42 \\times 10^{-19}\\text{ J}$.\n$$\\text{Number of photons emitted per second } (n) = \\frac{\\text{Total energy}}{\\text{Energy of one photon}} = \\frac{12}{4.42 \\times 10^{-19}} \\approx 2.71 \\times 10^{19}$$."
  },
  {
    question_number: 4,
    exam_tag: "NEET 2025",
    question_text: "The ratio of the wavelengths of the light absorbed by a Hydrogen atom when it undergoes $n = 2 \\rightarrow n = 3$ and $n = 4 \\rightarrow n = 6$ transitions, respectively, is",
    options: [
      "$\\frac{1}{9}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{36}$",
      "$\\frac{1}{16}$"
    ],
    correct_option: "B",
    solution_text: "Using Rydberg formula $\\frac{1}{\\lambda} = R_H Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$:\n1. For $n = 2 \\rightarrow n = 3$:\n$$\\frac{1}{\\lambda_1} = R_H \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = R_H \\left(\\frac{5}{36}\\right) \\implies \\lambda_1 = \\frac{36}{5 R_H}$$\n2. For $n = 4 \\rightarrow n = 6$:\n$$\\frac{1}{\\lambda_2} = R_H \\left(\\frac{1}{16} - \\frac{1}{36}\\right) = R_H \\left(\\frac{9 - 4}{144}\\right) = R_H \\left(\\frac{5}{144}\\right) \\implies \\lambda_2 = \\frac{144}{5 R_H}$$\nTaking the ratio:\n$$\\frac{\\lambda_1}{\\lambda_2} = \\frac{36 / (5 R_H)}{144 / (5 R_H)} = \\frac{36}{144} = \\frac{1}{4}$$."
  },
  {
    question_number: 5,
    exam_tag: "NEET 2025",
    question_text: "Energy and radius of first Bohr orbit of $\\text{He}^+$ and $\\text{Li}^{2+}$ are [Given $R_H = 2.18 \\times 10^{-18}\\text{ J}$, $a_0 = 52.9\\text{ pm}$]",
    options: [
      "$E_n(\\text{Li}^{2+}) = -19.62 \\times 10^{-16}\\text{ J}, r_n(\\text{Li}^{2+}) = 17.6\\text{ pm}; E_n(\\text{He}^+) = -8.72 \\times 10^{-16}\\text{ J}, r_n(\\text{He}^+) = 26.4\\text{ pm}$",
      "$E_n(\\text{Li}^{2+}) = -8.72 \\times 10^{-16}\\text{ J}, r_n(\\text{Li}^{2+}) = 17.6\\text{ pm}; E_n(\\text{He}^+) = -19.62 \\times 10^{-16}\\text{ J}, r_n(\\text{He}^+) = 17.6\\text{ pm}$",
      "$E_n(\\text{Li}^{2+}) = -19.62 \\times 10^{-18}\\text{ J}, r_n(\\text{Li}^{2+}) = 17.6\\text{ pm}; E_n(\\text{He}^+) = -8.72 \\times 10^{-18}\\text{ J}, r_n(\\text{He}^+) = 26.4\\text{ pm}$",
      "$E_n(\\text{Li}^{2+}) = -8.72 \\times 10^{-18}\\text{ J}, r_n(\\text{Li}^{2+}) = 26.4\\text{ pm}; E_n(\\text{He}^+) = -19.62 \\times 10^{-18}\\text{ J}, r_n(\\text{He}^+) = 17.6\\text{ pm}$"
    ],
    correct_option: "C",
    solution_text: "Bohr formulas for hydrogen-like species ($n = 1$):\n$$E_n = -R_H \\frac{Z^2}{n^2}, \\quad r_n = a_0 \\frac{n^2}{Z}$$\n1. For $\\text{He}^+$ ($Z = 2$):\n$$E_1(\\text{He}^+) = -2.18 \\times 10^{-18} \\times \\frac{2^2}{1^2} = -8.72 \\times 10^{-18}\\text{ J}$$\n$$r_1(\\text{He}^+) = 52.9 \\times \\frac{1}{2} = 26.45\\text{ pm} \\approx 26.4\\text{ pm}$$\n2. For $\\text{Li}^{2+}$ ($Z = 3$):\n$$E_1(\\text{Li}^{2+}) = -2.18 \\times 10^{-18} \\times \\frac{3^2}{1^2} = -19.62 \\times 10^{-18}\\text{ J}$$\n$$r_1(\\text{Li}^{2+}) = 52.9 \\times \\frac{1}{3} = 17.63\\text{ pm} \\approx 17.6\\text{ pm}$$\nThus, Option C is correct."
  },
  {
    question_number: 6,
    exam_tag: "NEET 2024 (Re-Examination)",
    question_text: "The quantum numbers of four electrons are given below :\nI. $n = 4, l = 2, m_l = -2, s = -1/2$\nII. $n = 3, l = 2, m_l = 1, s = +1/2$\nIII. $n = 4, l = 1, m_l = 0, s = +1/2$\nIV. $n = 3, l = 1, m_l = -1, s = +1/2$\nThe correct decreasing order of energy of these electrons is",
    options: [
      "IV > II > III > I",
      "I > III > II > IV",
      "III > I > II > IV",
      "I > II > III > IV"
    ],
    correct_option: "B",
    solution_text: "According to the $(n + l)$ rule, higher $(n + l)$ corresponds to higher energy. If $(n + l)$ is equal, higher $n$ has higher energy.\n- Electron I: $4d \\rightarrow n + l = 4 + 2 = 6$\n- Electron II: $3d \\rightarrow n + l = 3 + 2 = 5$\n- Electron III: $4p \\rightarrow n + l = 4 + 1 = 5$\n- Electron IV: $3p \\rightarrow n + l = 3 + 1 = 4$\nComparing II and III: both have $(n + l) = 5$, but III has $n = 4$ whereas II has $n = 3$, so $\\text{III} > \\text{II}$.\nTherefore, decreasing order of energy is:\n$$\\text{I } (4d) > \\text{III } (4p) > \\text{II } (3d) > \\text{IV } (3p)$$."
  },
  {
    question_number: 7,
    exam_tag: "NEET 2024 (Re-Examination)",
    question_text: "Given below are two statements:\nStatement I: The Balmer spectral line for H atom with lowest energy is located at $\\frac{5}{36} R_H\\text{ cm}^{-1}$. ($R_H = \\text{Rydberg constant}$)\nStatement II: When the temperature of blackbody increases, the maxima of the curve (intensity and wavelength) shifts to shorter wavelength.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false"
    ],
    correct_option: "C",
    solution_text: "- Statement I: Lowest energy line in Balmer series corresponds to $n_1 = 2$ and $n_2 = 3$.\n$$\\bar{\\nu} = R_H \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = R_H \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5}{36} R_H\\text{ cm}^{-1}$$\nThus, Statement I is true.\n- Statement II: According to Wien's displacement law ($\\lambda_{\\text{max}} T = b$), as temperature increases, the peak emission wavelength $\\lambda_{\\text{max}}$ shifts toward shorter wavelengths.\nThus, Statement II is true.\nBoth Statement I and Statement II are true."
  },
  {
    question_number: 8,
    exam_tag: "NEET 2024",
    question_text: "The energy of an electron in the ground state ($n = 1$) for $\\text{He}^+$ ion is $-x\\text{ J}$, then that for an electron in ($n = 2$) state for $\\text{Be}^{3+}$ ion in J is",
    options: [
      "$-x$",
      "$-\\frac{x}{9}$",
      "$-4x$",
      "$-\\frac{4}{9}x$"
    ],
    correct_option: "A",
    solution_text: "Energy of hydrogen-like species is given by:\n$$E_n = -E_0 \\frac{Z^2}{n^2}$$\nFor $\\text{He}^+$ ($Z = 2, n = 1$):\n$$E_1(\\text{He}^+) = -E_0 \\frac{2^2}{1^2} = -4E_0 = -x \\implies E_0 = \\frac{x}{4}$$\nFor $\\text{Be}^{3+}$ ($Z = 4, n = 2$):\n$$E_2(\\text{Be}^{3+}) = -E_0 \\frac{4^2}{2^2} = -E_0 \\frac{16}{4} = -4E_0 = -x\\text{ J}$$."
  },
  {
    question_number: 9,
    exam_tag: "NEET 2024",
    question_text: "Match List I with List II.\n\n| List I (Quantum Number) | List II (Information provided) |\n| :--- | :--- |\n| A. $m_l$ | I. Shape of orbital |\n| B. $m_s$ | II. Size of orbital |\n| C. $l$ | III. Orientation of orbital |\n| D. $n$ | IV. Orientation of spin of electron |\n\nChoose the correct answer from the options given below :",
    options: [
      "A-I, B-III, C-II, D-IV",
      "A-III, B-IV, C-I, D-II",
      "A-III, B-IV, C-II, D-I",
      "A-II, B-I, C-IV, D-III"
    ],
    correct_option: "B",
    solution_text: "- Principal quantum number ($n$) determines the size and main energy shell of the orbital $\\rightarrow$ D-II.\n- Azimuthal quantum number ($l$) determines the shape of the orbital $\\rightarrow$ C-I.\n- Magnetic quantum number ($m_l$) gives the spatial orientation of the orbital $\\rightarrow$ A-III.\n- Spin quantum number ($m_s$) gives the orientation of the spin of the electron $\\rightarrow$ B-IV.\nThus, the correct match is A-III, B-IV, C-I, D-II."
  },
  {
    question_number: 10,
    exam_tag: "NEET 2023 Manipur",
    question_text: "Incorrect set of quantum numbers from the following is :",
    options: [
      "$n = 4, l = 3, m_l = -3, -2, -1, 0, +1, +2, +3, m_s = -1/2$",
      "$n = 5, l = 2, m_l = -2, -1, +1, +2, m_s = +1/2$",
      "$n = 4, l = 2, m_l = -2, -1, 0, +1, +2, m_s = -1/2$",
      "$n = 5, l = 3, m_l = -3, -2, -1, 0, +1, +2, +3, m_s = +1/2$"
    ],
    correct_option: "B",
    solution_text: "For a given azimuthal quantum number $l$, the magnetic quantum number $m_l$ takes all integer values from $-l$ to $+l$, including zero ($2l + 1$ values).\nIn option (B), for $l = 2$, $m_l$ must include $0$, but the set given is $\\{-2, -1, +1, +2\\}$, missing $0$. Therefore, option (B) is the incorrect set."
  },
  {
    question_number: 11,
    exam_tag: "NEET 2023 Manipur",
    question_text: "Given below are two statements:\nStatement I : The value of wave function, $\\psi$ depends upon the coordinates of the electron in the atom.\nStatement II : The probability of finding an electron at a point within an atom is proportional to the orbital wave function.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Statement I is true but Statement II is false.",
      "Statement I is false but Statement II is true.",
      "Both Statement I and Statement II are true.",
      "Both Statement I and Statement II are false."
    ],
    correct_option: "A",
    solution_text: "- Statement I is true: The wave function $\\psi(x, y, z)$ or $\\psi(r, \\theta, \\phi)$ is a mathematical function that depends on the coordinates of the electron in the atom.\n- Statement II is false: The probability of finding an electron at a point is proportional to the square of the wave function ($|\\psi|^2$), known as probability density, not simply proportional to $\\psi$.\nHence, Statement I is true but Statement II is false."
  },
  {
    question_number: 12,
    exam_tag: "NEET 2023",
    question_text: "The relation between $n_m$ ($n_m = \\text{the number of permissible values of magnetic quantum number } (m)$) for a given value of azimuthal quantum number ($l$), is",
    options: [
      "$l = 2n_m + 1$",
      "$n_m = 2l^2 + 1$",
      "$n_m = l + 2$",
      "$l = \\frac{n_m - 1}{2}$"
    ],
    correct_option: "D",
    solution_text: "For a given value of azimuthal quantum number $l$, the number of permissible values of magnetic quantum number is:\n$$n_m = 2l + 1$$\nRearranging for $l$:\n$$n_m - 1 = 2l \\implies l = \\frac{n_m - 1}{2}$$."
  },
  {
    question_number: 13,
    exam_tag: "NEET 2022 Phase 2",
    question_text: "Match List-I with List-II :\n\n| List-I (quantum number) | List-II (orbital) |\n| :--- | :--- |\n| (a) $n = 2, l = 1$ | (i) $2s$ |\n| (b) $n = 3, l = 2$ | (ii) $3s$ |\n| (c) $n = 3, l = 0$ | (iii) $2p$ |\n| (d) $n = 2, l = 0$ | (iv) $3d$ |\n\nChoose the correct answer from the options given below :",
    options: [
      "(a) - (iii), (b) - (iv), (c) - (ii), (d) - (i)",
      "(a) - (iii), (b) - (iv), (c) - (i), (d) - (ii)",
      "(a) - (iv), (b) - (iii), (c) - (i), (d) - (ii)",
      "(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)"
    ],
    correct_option: "A",
    solution_text: "- (a) $n = 2, l = 1 \\rightarrow 2p$ (iii)\n- (b) $n = 3, l = 2 \\rightarrow 3d$ (iv)\n- (c) $n = 3, l = 0 \\rightarrow 3s$ (ii)\n- (d) $n = 2, l = 0 \\rightarrow 2s$ (i)\nThus, (a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)."
  },
  {
    question_number: 14,
    exam_tag: "NEET 2022 Phase 2",
    question_text: "When electromagnetic radiation of wavelength $300\\text{ nm}$ falls on the surface of a metal, electrons are emitted with the kinetic energy of $1.68 \\times 10^5\\text{ J mol}^{-1}$. What is the minimum energy needed to remove an electron from the metal?\n($h = 6.626 \\times 10^{-34}\\text{ Js}, c = 3 \\times 10^8\\text{ ms}^{-1}, N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}$)",
    options: [
      "$2.31 \\times 10^5\\text{ J mol}^{-1}$",
      "$2.31 \\times 10^6\\text{ J mol}^{-1}$",
      "$3.84 \\times 10^4\\text{ J mol}^{-1}$",
      "$3.84 \\times 10^{-19}\\text{ J mol}^{-1}$"
    ],
    correct_option: "A",
    solution_text: "Energy of incident photon per mole:\n$$E_{\\text{photon}} = \\frac{N_A h c}{\\lambda} = \\frac{(6.022 \\times 10^{23}) \\times (6.626 \\times 10^{-34}) \\times (3 \\times 10^8)}{300 \\times 10^{-9}}$$\n$$E_{\\text{photon}} = \\frac{11.97 \\times 10^{-2}}{300 \\times 10^{-9}} = 3.99 \\times 10^5\\text{ J mol}^{-1}$$\nBy Einstein's photoelectric equation:\n$$E_{\\text{photon}} = W_0 + K.E.$$\n$$W_0 = E_{\\text{photon}} - K.E. = 3.99 \\times 10^5 - 1.68 \\times 10^5 = 2.31 \\times 10^5\\text{ J mol}^{-1}$$."
  },
  {
    question_number: 15,
    exam_tag: "NEET 2022 Phase 1",
    question_text: "Identify the incorrect statement from the following.",
    options: [
      "All the five 5d orbitals are different in size when compared to the respective 4d orbitals.",
      "All the five 4d orbitals have shapes similar to the respective 3d orbitals.",
      "In an atom, all the five 3d orbitals are equal in energy in free state.",
      "The shapes of $d_{xy}, d_{yz}$ and $d_{zx}$ orbitals are similar to each other; and $d_{x^2 - y^2}$ and $d_{z^2}$ are similar to each other."
    ],
    correct_option: "D",
    solution_text: "Statements analysis:\n- Statement A, B, C are correct facts: $5d$ orbitals are larger than $4d$; $4d$ orbitals share shapes with $3d$; and in isolated free state, all five $3d$ orbitals are degenerate.\n- Statement D is incorrect: while $d_{xy}, d_{yz}, d_{zx}$ and $d_{x^2 - y^2}$ all have four-lobed cloverleaf shapes, $d_{z^2}$ has a unique 'doughnut' (torus) shape with two lobes along the $z$-axis. Thus $d_{x^2 - y^2}$ and $d_{z^2}$ do not have similar shapes."
  },
  {
    question_number: 16,
    exam_tag: "NEET 2022 Phase 1",
    question_text: "If radius of second Bohr orbit of the $\\text{He}^+$ ion is $105.8\\text{ pm}$, what is the radius of third Bohr orbit of $\\text{Li}^{2+}$ ion?",
    options: [
      "158.7 pm",
      "15.87 pm",
      "1.587 pm",
      "158.7 Å"
    ],
    correct_option: "A",
    solution_text: "Radius of Bohr orbit is given by $r = a_0 \\frac{n^2}{Z}$.\nFor second orbit of $\\text{He}^+$ ($n = 2, Z = 2$):\n$$r_2(\\text{He}^+) = a_0 \\frac{2^2}{2} = 2 a_0 = 105.8\\text{ pm} \\implies a_0 = 52.9\\text{ pm}$$\nFor third orbit of $\\text{Li}^{2+}$ ($n = 3, Z = 3$):\n$$r_3(\\text{Li}^{2+}) = a_0 \\frac{3^2}{3} = 3 a_0 = 3 \\times 52.9 = 158.7\\text{ pm}$$."
  },
  {
    question_number: 17,
    exam_tag: "NEET 2021",
    question_text: "A particular station of All India Radio, New Delhi broadcasts on a frequency of $1,368\\text{ kHz}$ (kilohertz). The wavelength of the electromagnetic radiation emitted by the transmitter is : [speed of light $c = 3.0 \\times 10^8\\text{ ms}^{-1}$]",
    options: [
      "21.92 cm",
      "219.3 m",
      "219.2 m",
      "2192 m"
    ],
    correct_option: "B",
    solution_text: "Relation between wavelength and frequency:\n$$\\lambda = \\frac{c}{\\nu} = \\frac{3.0 \\times 10^8\\text{ m s}^{-1}}{1368 \\times 10^3\\text{ s}^{-1}} = \\frac{3.0 \\times 10^5}{1368} \\approx 219.298\\text{ m} \\approx 219.3\\text{ m}$$."
  },
  {
    question_number: 18,
    exam_tag: "NEET 2021",
    question_text: "From the following pairs of ions which one is not an iso-electronic pair?",
    options: [
      "$\\text{Fe}^{2+}, \\text{Mn}^{2+}$",
      "$\\text{O}^{2-}, \\text{F}^-$",
      "$\\text{Na}^+, \\text{Mg}^{2+}$",
      "$\\text{Mn}^{2+}, \\text{Fe}^{3+}$"
    ],
    correct_option: "A",
    solution_text: "Let us count the number of electrons in each pair:\n- (A) $\\text{Fe}^{2+}$ has $26 - 2 = 24$ electrons, whereas $\\text{Mn}^{2+}$ has $25 - 2 = 23$ electrons. They are not isoelectronic.\n- (B) $\\text{O}^{2-}$ (10 e$^-$) and $\\text{F}^-$ (10 e$^-$): isoelectronic.\n- (C) $\\text{Na}^+$ (10 e$^-$) and $\\text{Mg}^{2+}$ (10 e$^-$): isoelectronic.\n- (D) $\\text{Mn}^{2+}$ (23 e$^-$) and $\\text{Fe}^{3+}$ (23 e$^-$): isoelectronic.\nThus, option (A) is not an isoelectronic pair."
  },
  {
    question_number: 19,
    exam_tag: "NEET 2020 Phase 2",
    question_text: "The number of angular nodes and radial nodes in $3s$ orbital are",
    options: [
      "0 and 1, respectively",
      "0 and 2, respectively",
      "1 and 0, respectively",
      "3 and 0, respectively"
    ],
    correct_option: "B",
    solution_text: "For $3s$ orbital:\n- Principal quantum number $n = 3$, azimuthal quantum number $l = 0$.\n- Number of angular nodes $= l = 0$.\n- Number of radial nodes $= n - l - 1 = 3 - 0 - 1 = 2$.\nTherefore, the number of angular nodes and radial nodes are 0 and 2, respectively."
  },
  {
    question_number: 20,
    exam_tag: "NEET 2019 (Odisha)",
    question_text: "Orbital having 3 angular nodes and 3 total nodes is",
    options: [
      "6d",
      "5p",
      "3d",
      "4f"
    ],
    correct_option: "D",
    solution_text: "- Number of angular nodes $= l$.\nGiven angular nodes $= 3 \\implies l = 3$ (which corresponds to an $f$ orbital).\n- Total nodes $= n - 1$.\nGiven total nodes $= 3 \\implies n - 1 = 3 \\implies n = 4$.\nThus, the orbital is $4f$."
  },
  {
    question_number: 21,
    exam_tag: "NEET 2019 (Odisha)",
    question_text: "In hydrogen atom, the de Broglie wavelength of an electron in the second Bohr orbit is [Given that Bohr radius, $a_0 = 52.9\\text{ pm}$]",
    options: [
      "105.8 pm",
      "211.6 pm",
      "$211.6\\pi\\text{ pm}$",
      "$52.9\\pi\\text{ pm}$"
    ],
    correct_option: "C",
    solution_text: "According to Bohr-de Broglie relation for an electron in $n^{\\text{th}}$ orbit:\n$$2\\pi r_n = n \\lambda$$\nFor $n = 2$:\n$$r_2 = a_0 \\frac{n^2}{Z} = a_0 (2^2) = 4 a_0$$\n$$2\\pi (4 a_0) = 2 \\lambda \\implies \\lambda = 4\\pi a_0$$\n$$\\lambda = 4\\pi (52.9\\text{ pm}) = 211.6\\pi\\text{ pm}$$."
  },
  {
    question_number: 22,
    exam_tag: "NEET 2019",
    question_text: "$4d, 5p, 5f$ and $6p$ orbitals are arranged in the order of decreasing energy. The correct option is :",
    options: [
      "$6p > 5f > 4d > 5p$",
      "$5f > 6p > 4d > 5p$",
      "$5f > 6p > 5p > 4d$",
      "$6p > 5f > 5p > 4d$"
    ],
    correct_option: "C",
    solution_text: "Using the $(n + l)$ rule:\n- $5f: n = 5, l = 3 \\implies n + l = 8$\n- $6p: n = 6, l = 1 \\implies n + l = 7$\n- $5p: n = 5, l = 1 \\implies n + l = 6$\n- $4d: n = 4, l = 2 \\implies n + l = 6$\nFor $5p$ and $4d$, both have $n + l = 6$; higher $n$ ($5p$) has higher energy.\nThus, decreasing order of energy is:\n$$5f > 6p > 5p > 4d$$."
  },
  {
    question_number: 23,
    exam_tag: "NEET 2019",
    question_text: "Which of the following series of transitions in the spectrum of hydrogen atom falls in visible region?",
    options: [
      "Paschen series",
      "Brackett series",
      "Lyman series",
      "Balmer series"
    ],
    correct_option: "D",
    solution_text: "Spectral series of hydrogen atom:\n- Lyman series: Ultraviolet region ($n_1 = 1$)\n- Balmer series: Visible region ($n_1 = 2$)\n- Paschen series: Infrared region ($n_1 = 3$)\n- Brackett series: Infrared region ($n_1 = 4$)\n- Pfund series: Far Infrared region ($n_1 = 5$)\nTherefore, the Balmer series falls in the visible region."
  },
  {
    question_number: 24,
    exam_tag: "NEET 2018",
    question_text: "Which one is a wrong statement?\n\n![Nitrogen configuration](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794387969/edvedum/structure_of_atom/q24_diagram.png)",
    options: [
      "Total orbital angular momentum of electron in s-orbital is equal to zero.",
      "An orbital is designated by three quantum numbers while an electron in an atom is designated by four quantum numbers",
      "The electronic configuration of N atom is $1s^2 2s^2 2p_x^1 2p_y^1 2p_z^1$ with one electron having opposite spin as shown in figure (C).",
      "The value of m for $d_{z^2}$ is zero."
    ],
    correct_option: "C",
    solution_text: "- (A) Correct: Orbital angular momentum $L = \\sqrt{l(l+1)}\\hbar$. For $s$-orbital, $l = 0$, so $L = 0$.\n- (B) Correct: An orbital is defined by $n, l, m_l$ while an electron requires $n, l, m_l, m_s$.\n- (C) Incorrect statement: In the diagram shown for (C), the three $2p$ electrons are shown as $(\\uparrow)(\\uparrow)(\\downarrow)$. According to Hund's rule of maximum multiplicity, electrons in degenerate orbitals must have parallel spins before pairing starts. Thus, having one spin flipped violates Hund's rule.\n- (D) Correct: By convention, $m = 0$ for $d_{z^2}$."
  },
  {
    question_number: 25,
    exam_tag: "NEET 2017",
    question_text: "Which one is the wrong statement ?\n\n(A) The uncertainty principle is $\\Delta E \\times \\Delta t \\ge \\frac{h}{4\\pi}$\n(B) Half filled and fully filled orbitals have greater stability due to greater exchange energy, greater symmetry and more balanced arrangement.\n(C) The energy of 2s-orbital is less than the energy of 2p-orbital in case of hydrogen like atoms.\n(D) de-Broglie's wavelength is given by $\\lambda = \\frac{h}{mv}$, where $m =$ mass of the particle, $v =$ group velocity of the particle.",
    options: [
      "The uncertainty principle is $\\Delta E \\times \\Delta t \\ge \\frac{h}{4\\pi}$",
      "Half filled and fully filled orbitals have greater stability due to greater exchange energy, greater symmetry and more balanced arrangement.",
      "The energy of 2s-orbital is less than the energy of 2p-orbital in case of hydrogen like atoms.",
      "de-Broglie's wavelength is given by $\\lambda = \\frac{h}{mv}$, where $m =$ mass of the particle, $v =$ group velocity of the particle."
    ],
    correct_option: "C",
    solution_text: "In single-electron (hydrogen-like) species, energy depends solely on the principal quantum number $n$ and does not depend on azimuthal quantum number $l$. Therefore, in hydrogen-like atoms, the $2s$ and $2p$ orbitals have identical energy (are degenerate: $E_{2s} = E_{2p}$). Statement (C) is therefore incorrect."
  },
  {
    question_number: 26,
    exam_tag: "NEET 2016 Phase 2",
    question_text: "How many electrons can fit in the orbital for which $n = 3$ and $l = 1$?",
    options: [
      "2",
      "6",
      "10",
      "14"
    ],
    correct_option: "B",
    solution_text: "For $n = 3, l = 1$, the subshell is $3p$.\nA $p$ subshell consists of 3 orbitals ($m = -1, 0, +1$).\nEach orbital can accommodate at most 2 electrons.\nThus, the total number of electrons that can fit in the $3p$ subshell is $2(2l + 1) = 2(3) = 6$ electrons."
  },
  {
    question_number: 27,
    exam_tag: "NEET 2016 Phase 2",
    question_text: "Which of the following pairs of d-orbitals will have electron density along the axes ?",
    options: [
      "$d_{z^2}, d_{xz}$",
      "$d_{xz}, d_{yz}$",
      "$d_{z^2}, d_{x^2 - y^2}$",
      "$d_{xy}, d_{x^2 - y^2}$"
    ],
    correct_option: "C",
    solution_text: "- The $e_g$ set of $d$-orbitals, $d_{x^2 - y^2}$ and $d_{z^2}$, have their lobes pointing directly along the Cartesian axes ($x, y$ and $z$ axes).\n- The $t_{2g}$ set of $d$-orbitals ($d_{xy}, d_{yz}, d_{zx}$) have their lobes lying between the axes.\nTherefore, $d_{z^2}$ and $d_{x^2 - y^2}$ have electron density along the axes."
  },
  {
    question_number: 28,
    exam_tag: "NEET 2016 Phase 1",
    question_text: "Two electrons occupying the same orbital are distinguished by",
    options: [
      "azimuthal quantum number",
      "spin quantum number",
      "principal quantum number",
      "magnetic quantum number"
    ],
    correct_option: "B",
    solution_text: "By Pauli's exclusion principle, no two electrons in an atom can have the same set of four quantum numbers. Two electrons occupying the same orbital have identical $n, l,$ and $m_l$ values, so they must have opposite spins ($m_s = +1/2$ and $m_s = -1/2$)."
  },
  {
    question_number: 29,
    exam_tag: "AIPMT 2015",
    question_text: "Which is the correct order of increasing energy of the listed orbitals in the atom of titanium ? (At. no. Z = 22)",
    options: [
      "4s 3s 3p 3d",
      "3s 3p 3d 4s",
      "3s 3p 4s 3d",
      "3s 4s 3p 3d"
    ],
    correct_option: "C",
    solution_text: "According to Aufbau principle and $(n + l)$ rule:\n- $3s: n+l = 3+0 = 3$\n- $3p: n+l = 3+1 = 4$\n- $4s: n+l = 4+0 = 4$ (lower $n$ than $3d$)\n- $3d: n+l = 3+2 = 5$\nTherefore, increasing order of orbital energy is: $3s < 3p < 4s < 3d$."
  },
  {
    question_number: 30,
    exam_tag: "AIPMT 2015 Cancelled Paper",
    question_text: "The number of d-electrons in $\\text{Fe}^{2+}$ ($Z = 26$) is not equal to the number of electrons in which one of the following ?",
    options: [
      "d-electrons in Fe ($Z = 26$)",
      "p-electrons in Ne ($Z = 10$)",
      "s-electrons in Mg ($Z = 12$)",
      "p-electrons in Cl ($Z = 17$)"
    ],
    correct_option: "D",
    solution_text: "Electronic configuration of $\\text{Fe}$ is $[\\text{Ar}] 3d^6 4s^2$, and $\\text{Fe}^{2+}$ is $[\\text{Ar}] 3d^6$.\nThus, number of $d$-electrons in $\\text{Fe}^{2+} = 6$.\nLet us check each option:\n- (A) $d$-electrons in $\\text{Fe} = 6$.\n- (B) $p$-electrons in $\\text{Ne}$ ($1s^2 2s^2 2p^6$) $= 6$.\n- (C) $s$-electrons in $\\text{Mg}$ ($1s^2 2s^2 2p^6 3s^2$) $= 2 + 2 + 2 = 6$.\n- (D) $p$-electrons in $\\text{Cl}$ ($1s^2 2s^2 2p^6 3s^2 3p^5$) $= 6 + 5 = 11$.\nTherefore, it is not equal to the number of $p$-electrons in Cl."
  },
  {
    question_number: 31,
    exam_tag: "AIPMT 2015 Cancelled Paper",
    question_text: "The angular momentum of electron in 'd' orbital is equal to",
    options: [
      "$2\\sqrt{3}\\hbar$",
      "$0\\hbar$",
      "$\\sqrt{6}\\hbar$",
      "$\\sqrt{2}\\hbar$"
    ],
    correct_option: "C",
    solution_text: "Orbital angular momentum of an electron is given by:\n$$L = \\sqrt{l(l+1)} \\frac{h}{2\\pi} = \\sqrt{l(l+1)}\\hbar$$\nFor a 'd' orbital, $l = 2$:\n$$L = \\sqrt{2(2+1)}\\hbar = \\sqrt{6}\\hbar$$."
  },
  {
    question_number: 32,
    exam_tag: "AIPMT 2014",
    question_text: "What is the maximum number of orbitals that can be identified with the following quantum numbers ?\n$$n = 3, l = 1, m_l = 0$$",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct_option: "A",
    solution_text: "A specific set of three quantum numbers ($n, l, m_l$) uniquely specifies exactly ONE atomic orbital (here, $3p_z$)."
  },
  {
    question_number: 33,
    exam_tag: "AIPMT 2014",
    question_text: "Calculate the energy in joule corresponding to light of wavelength $45\\text{ nm}$. (Planck's constant, $h = 6.63 \\times 10^{-34}\\text{ J s}$, speed of light, $c = 3 \\times 10^8\\text{ m s}^{-1}$)",
    options: [
      "$6.67 \\times 10^{15}$",
      "$6.67 \\times 10^{11}$",
      "$4.42 \\times 10^{-15}$",
      "$4.42 \\times 10^{-18}$"
    ],
    correct_option: "D",
    solution_text: "Energy of a photon:\n$$E = \\frac{hc}{\\lambda} = \\frac{(6.63 \\times 10^{-34}) \\times (3 \\times 10^8)}{45 \\times 10^{-9}}$$\n$$E = \\frac{1.989 \\times 10^{-25}}{45 \\times 10^{-9}} = 4.42 \\times 10^{-18}\\text{ J}$$."
  },
  {
    question_number: 34,
    exam_tag: "AIPMT 2014",
    question_text: "$\\text{Be}^{2+}$ is isoelectronic with which of the following ions ?",
    options: [
      "$\\text{H}^+$",
      "$\\text{Li}^+$",
      "$\\text{Na}^+$",
      "$\\text{Mg}^{2+}$"
    ],
    correct_option: "B",
    solution_text: "Atomic number of Be is 4. Number of electrons in $\\text{Be}^{2+} = 4 - 2 = 2$.\n- $\\text{H}^+: 1 - 1 = 0\\text{ electrons}$\n- $\\text{Li}^+: 3 - 1 = 2\\text{ electrons}$\n- $\\text{Na}^+: 11 - 1 = 10\\text{ electrons}$\n- $\\text{Mg}^{2+}: 12 - 2 = 10\\text{ electrons}$\nThus, $\\text{Be}^{2+}$ is isoelectronic with $\\text{Li}^+$."
  },
  {
    question_number: 35,
    exam_tag: "NEET 2013 (Karnataka)",
    question_text: "According to law of photochemical equivalence the energy absorbed (in ergs/mole) is given as ($h = 6.62 \\times 10^{-27}\\text{ ergs}$, $c = 3 \\times 10^{10}\\text{ cm s}^{-1}$, $N_A = 6.02 \\times 10^{23}\\text{ mol}^{-1}$)",
    options: [
      "$\\frac{1.196 \\times 10^8}{\\lambda}$",
      "$\\frac{2.859 \\times 10^5}{\\lambda}$",
      "$\\frac{2.859 \\times 10^{16}}{\\lambda}$",
      "$\\frac{1.196 \\times 10^{16}}{\\lambda}$"
    ],
    correct_option: "A",
    solution_text: "According to Einstein's law of photochemical equivalence, $1\\text{ mole}$ of substance absorbs $1\\text{ Einstein}$ of energy:\n$$E = \\frac{N_A h c}{\\lambda}$$\n$$E = \\frac{(6.02 \\times 10^{23}) \\times (6.62 \\times 10^{-27}\\text{ ergs}) \\times (3 \\times 10^{10}\\text{ cm s}^{-1})}{\\lambda}$$\n$$E = \\frac{1.196 \\times 10^8}{\\lambda}\\text{ ergs mol}^{-1}$$."
  },
  {
    question_number: 36,
    exam_tag: "NEET 2013",
    question_text: "What is the maximum numbers of electrons that can be associated with the following set of quantum numbers ?\n$$n = 3, l = 1 \\text{ and } m = -1$$",
    options: [
      "4",
      "2",
      "10",
      "6"
    ],
    correct_option: "B",
    solution_text: "The set $n = 3, l = 1, m = -1$ designates one single specific orbital in the $3p$ subshell. By Pauli's exclusion principle, an individual orbital can hold a maximum of 2 electrons (with opposite spins, $+1/2$ and $-1/2$)."
  },
  {
    question_number: 37,
    exam_tag: "NEET 2013",
    question_text: "Based on equation $E = -2.178 \\times 10^{-18}\\text{ J} \\left(\\frac{Z^2}{n^2}\\right)$, certain conclusions are written. Which of them is not correct ?",
    options: [
      "Equation can be used to calculate the change in energy when the electron changes orbit.",
      "For n = 1, the electron has a more negative energy than it does for n = 6 which means that the electron is more loosely bound in the smallest allowed orbit.",
      "The negative sign in equation simply means that the energy of electron bound to the nucleus is lower than it would be if the electrons were at the infinite distance from the nucleus.",
      "Larger the value of n, the larger is the orbit radius."
    ],
    correct_option: "B",
    solution_text: "Statement (B) is incorrect because a more negative energy indicates that the electron is MORE TIGHTLY bound (more stable) to the nucleus in the smallest allowed orbit ($n = 1$), not more loosely bound."
  },
  {
    question_number: 38,
    exam_tag: "NEET 2013",
    question_text: "The value of Planck's constant is $6.63 \\times 10^{-34}\\text{ J s}$. The speed of light is $3 \\times 10^{17}\\text{ nm s}^{-1}$. Which value is closest to the wavelength in nanometer of a quantum of light with frequency of $6 \\times 10^{15}\\text{ s}^{-1}$ ?",
    options: [
      "50",
      "75",
      "10",
      "25"
    ],
    correct_option: "A",
    solution_text: "Using the wave relationship $\\lambda = \\frac{c}{\\nu}$:\n$$\\lambda = \\frac{3 \\times 10^{17}\\text{ nm s}^{-1}}{6 \\times 10^{15}\\text{ s}^{-1}} = 0.5 \\times 10^2\\text{ nm} = 50\\text{ nm}$$."
  },
  {
    question_number: 39,
    exam_tag: "AIPMT 2012 Mains",
    question_text: "The orbital angular momentum of a p-electron is given as",
    options: [
      "$\\frac{h}{\\sqrt{2}\\pi}$",
      "$\\sqrt{3}\\frac{h}{2\\pi}$",
      "$\\sqrt{\\frac{3}{2}}\\frac{h}{\\pi}$",
      "$\\sqrt{6}\\frac{h}{2\\pi}$"
    ],
    correct_option: "A",
    solution_text: "Orbital angular momentum:\n$$L = \\sqrt{l(l+1)} \\frac{h}{2\\pi}$$\nFor a $p$-electron, $l = 1$:\n$$L = \\sqrt{1(1+1)} \\frac{h}{2\\pi} = \\sqrt{2} \\frac{h}{2\\pi} = \\frac{h}{\\sqrt{2}\\pi}$$."
  },
  {
    question_number: 40,
    exam_tag: "AIPMT 2012 Prelims",
    question_text: "Maximum number of electrons in a subshell with $l = 3$ and $n = 4$ is",
    options: [
      "14",
      "16",
      "10",
      "12"
    ],
    correct_option: "A",
    solution_text: "For $l = 3$, the subshell is an $f$-subshell ($4f$).\nNumber of orbitals in this subshell $= 2l + 1 = 2(3) + 1 = 7$.\nMaximum number of electrons in this subshell $= 2(2l + 1) = 2 \\times 7 = 14$."
  },
  {
    question_number: 41,
    exam_tag: "AIPMT 2012 Prelims",
    question_text: "The correct set of four quantum numbers for the valence electron of rubidium atom ($Z = 37$) is",
    options: [
      "$5, 1, 1, +1/2$",
      "$6, 0, 0, +1/2$",
      "$5, 0, 0, +1/2$",
      "$5, 1, 0, +1/2$"
    ],
    correct_option: "C",
    solution_text: "Electronic configuration of rubidium ($Z = 37$) is $[\\text{Kr}] 5s^1$.\nThe valence electron enters the $5s$ orbital:\n- Principal quantum number $n = 5$\n- Azimuthal quantum number $l = 0$ (for $s$ orbital)\n- Magnetic quantum number $m = 0$\n- Spin quantum number $s = +1/2$ (or $-1/2$)\nThus, the set is $5, 0, 0, +1/2$."
  },
  {
    question_number: 42,
    exam_tag: "AIPMT 2011 Mains",
    question_text: "According to the Bohr theory, which of the following transitions in the hydrogen atom will give rise to the least energetic photon ?",
    options: [
      "$n = 6 \\text{ to } n = 1$",
      "$n = 5 \\text{ to } n = 4$",
      "$n = 6 \\text{ to } n = 5$",
      "$n = 5 \\text{ to } n = 3$"
    ],
    correct_option: "C",
    solution_text: "Energy difference $\\Delta E \\propto \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$:\n- (A) $n = 6 \\rightarrow 1: 1 - \\frac{1}{36} = 0.972$\n- (B) $n = 5 \\rightarrow 4: \\frac{1}{16} - \\frac{1}{25} = 0.0625 - 0.0400 = 0.0225$\n- (C) $n = 6 \\rightarrow 5: \\frac{1}{25} - \\frac{1}{36} = 0.0400 - 0.0278 = 0.0122$\n- (D) $n = 5 \\rightarrow 3: \\frac{1}{9} - \\frac{1}{25} = 0.1111 - 0.0400 = 0.0711$\nThe transition $n = 6 \\rightarrow 5$ has the smallest energy difference, thus giving rise to the least energetic photon."
  },
  {
    question_number: 43,
    exam_tag: "AIPMT 2011 Prelims",
    question_text: "The total number of atomic orbitals in fourth energy level of an atom is",
    options: [
      "8",
      "16",
      "32",
      "4"
    ],
    correct_option: "B",
    solution_text: "Total number of atomic orbitals in a principal energy shell $n$ is given by $n^2$.\nFor fourth energy level ($n = 4$):\n$$\\text{Total orbitals} = 4^2 = 16$$\n(consisting of one $4s$, three $4p$, five $4d$, and seven $4f$ orbitals: $1 + 3 + 5 + 7 = 16$)."
  },
  {
    question_number: 44,
    exam_tag: "AIPMT 2011 Prelims",
    question_text: "The energies $E_1$ and $E_2$ of two radiations are $25\\text{ eV}$ and $50\\text{ eV}$ respectively. The relation between their wavelengths i.e., $\\lambda_1$ and $\\lambda_2$ will be",
    options: [
      "$\\lambda_1 = \\lambda_2$",
      "$\\lambda_1 = 2\\lambda_2$",
      "$\\lambda_1 = 4\\lambda_2$",
      "$\\lambda_1 = \\frac{1}{2}\\lambda_2$"
    ],
    correct_option: "B",
    solution_text: "Energy of radiation is inversely proportional to its wavelength ($E = \\frac{hc}{\\lambda}$):\n$$\\frac{E_1}{E_2} = \\frac{\\lambda_2}{\\lambda_1}$$\n$$\\frac{25}{50} = \\frac{\\lambda_2}{\\lambda_1} \\implies \\frac{1}{2} = \\frac{\\lambda_2}{\\lambda_1} \\implies \\lambda_1 = 2\\lambda_2$$."
  },
  {
    question_number: 45,
    exam_tag: "AIPMT 2011 Prelims",
    question_text: "If $n = 6$, the correct sequence for filling of electrons will be",
    options: [
      "$ns \\rightarrow (n - 2)f \\rightarrow (n - 1)d \\rightarrow np$",
      "$ns \\rightarrow (n - 1)d \\rightarrow (n - 2)f \\rightarrow np$",
      "$ns \\rightarrow (n - 2)f \\rightarrow np \\rightarrow (n - 1)d$",
      "$ns \\rightarrow np \\rightarrow (n - 1)d \\rightarrow (n - 2)f$"
    ],
    correct_option: "A",
    solution_text: "According to Aufbau principle for the 6th period ($n = 6$):\n- $6s$ ($n + l = 6 + 0 = 6$)\n- $4f$ [i.e., $(n - 2)f$] ($n + l = 4 + 3 = 7$)\n- $5d$ [i.e., $(n - 1)d$] ($n + l = 5 + 2 = 7$)\n- $6p$ [i.e., $np$] ($n + l = 6 + 1 = 7$)\nThus, the correct filling order is $ns \\rightarrow (n - 2)f \\rightarrow (n - 1)d \\rightarrow np$."
  }
];
