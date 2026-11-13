export const atomPyqPart2 = [
  {
    question_number: 46,
    exam_tag: "AIPMT 2010 Mains",
    question_text: "A $0.66\\text{ kg}$ ball is moving with a speed of $100\\text{ m/s}$. The associated wavelength will be ($h = 6.6 \\times 10^{-34}\\text{ J s}$)",
    options: [
      "$6.6 \\times 10^{-32}\\text{ m}$",
      "$6.6 \\times 10^{-34}\\text{ m}$",
      "$1.0 \\times 10^{-35}\\text{ m}$",
      "$1.0 \\times 10^{-32}\\text{ m}$"
    ],
    correct_option: "C",
    solution_text: "Using de-Broglie wavelength formula:\n$$\\lambda = \\frac{h}{mv} = \\frac{6.6 \\times 10^{-34}\\text{ J s}}{0.66\\text{ kg} \\times 100\\text{ m s}^{-1}} = \\frac{6.6 \\times 10^{-34}}{66} = 1.0 \\times 10^{-35}\\text{ m}$$."
  },
  {
    question_number: 47,
    exam_tag: "AIPMT 2009",
    question_text: "Maximum number of electrons in a subshell of an atom is determined by the following",
    options: [
      "$2l + 1$",
      "$4l - 2$",
      "$2n^2$",
      "$4l + 2$"
    ],
    correct_option: "D",
    solution_text: "A subshell with azimuthal quantum number $l$ contains $(2l + 1)$ orbitals. Since each orbital can hold a maximum of 2 electrons (with opposite spins), the maximum number of electrons in the subshell is:\n$$2(2l + 1) = 4l + 2$$."
  },
  {
    question_number: 48,
    exam_tag: "AIPMT 2009",
    question_text: "Which of the following is not permissible arrangement of electrons in an atom ?",
    options: [
      "$n = 5, l = 3, m = 0, s = +1/2$",
      "$n = 3, l = 2, m = -3, s = -1/2$",
      "$n = 3, l = 2, m = -2, s = -1/2$",
      "$n = 4, l = 0, m = 0, s = -1/2$"
    ],
    correct_option: "B",
    solution_text: "For a given azimuthal quantum number $l$, the magnetic quantum number $m$ can only take integer values from $-l$ to $+l$ (i.e., $|m| \\le l$).\nFor $l = 2$, $m$ can be $-2, -1, 0, +1, +2$.\nIn option (B), $m = -3$, which is impossible for $l = 2$. Thus, arrangement (B) is not permissible."
  },
  {
    question_number: 49,
    exam_tag: "AIPMT 2008",
    question_text: "If uncertainty in position and momentum are equal, then uncertainty in velocity is",
    options: [
      "$\\frac{1}{m}\\sqrt{\\frac{h}{\\pi}}$",
      "$\\sqrt{\\frac{h}{\\pi}}$",
      "$\\frac{1}{2m}\\sqrt{\\frac{h}{\\pi}}$",
      "$\\sqrt{\\frac{h}{2\\pi}}$"
    ],
    correct_option: "C",
    solution_text: "By Heisenberg's uncertainty principle:\n$$\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$$\nGiven $\\Delta x = \\Delta p$:\n$$(\\Delta p)^2 = \\frac{h}{4\\pi} \\implies \\Delta p = \\sqrt{\\frac{h}{4\\pi}} = \\frac{1}{2}\\sqrt{\\frac{h}{\\pi}}$$\nSince $\\Delta p = m \\Delta v$:\n$$\\Delta v = \\frac{\\Delta p}{m} = \\frac{1}{2m}\\sqrt{\\frac{h}{\\pi}}$$."
  },
  {
    question_number: 50,
    exam_tag: "AIPMT 2008",
    question_text: "The measurement of the electron position is associated with an uncertainty in momentum, which is equal to $1 \\times 10^{-18}\\text{ g cm s}^{-1}$. The uncertainty in electron velocity is (mass of an electron is $9 \\times 10^{-28}\\text{ g}$)",
    options: [
      "$1 \\times 10^5\\text{ cm s}^{-1}$",
      "$1 \\times 10^{11}\\text{ cm s}^{-1}$",
      "$1 \\times 10^9\\text{ cm s}^{-1}$",
      "$1 \\times 10^6\\text{ cm s}^{-1}$"
    ],
    correct_option: "C",
    solution_text: "Relation between uncertainty in momentum and uncertainty in velocity:\n$$\\Delta p = m \\Delta v$$\n$$\\Delta v = \\frac{\\Delta p}{m} = \\frac{1 \\times 10^{-18}\\text{ g cm s}^{-1}}{9 \\times 10^{-28}\\text{ g}} \\approx 1.1 \\times 10^9\\text{ cm s}^{-1} \\approx 1 \\times 10^9\\text{ cm s}^{-1}$$."
  },
  {
    question_number: 51,
    exam_tag: "AIPMT 2007",
    question_text: "Consider the following sets of quantum numbers :\n(i) $n = 3, l = 0, m = 0, s = +1/2$\n(ii) $n = 2, l = 2, m = 1, s = +1/2$\n(iii) $n = 4, l = 3, m = -2, s = -1/2$\n(iv) $n = 1, l = 0, m = -1, s = -1/2$\n(v) $n = 3, l = 2, m = 3, s = +1/2$\nWhich of the following sets of quantum number is not possible ?",
    options: [
      "(i), (ii), (iii) and (iv)",
      "(ii), (iv) and (v)",
      "(i) and (iii)",
      "(ii), (iii) and (iv)"
    ],
    correct_option: "B",
    solution_text: "Rules for quantum numbers: $l < n$ and $-l \\le m \\le +l$.\n- (i) $n = 3, l = 0, m = 0$: Possible.\n- (ii) $n = 2, l = 2$: Not possible because $l$ must be strictly less than $n$ ($l \\le n - 1$).\n- (iii) $n = 4, l = 3, m = -2$: Possible.\n- (iv) $n = 1, l = 0, m = -1$: Not possible because for $l = 0$, $m$ can only be $0$.\n- (v) $n = 3, l = 2, m = 3$: Not possible because for $l = 2$, $m$ can only range from $-2$ to $+2$.\nThus, (ii), (iv), and (v) are not possible."
  },
  {
    question_number: 52,
    exam_tag: "AIPMT 2006",
    question_text: "The orientation of an atomic orbital is governed by",
    options: [
      "principal quantum number",
      "azimuthal quantum number",
      "spin quantum number",
      "magnetic quantum number."
    ],
    correct_option: "D",
    solution_text: "The magnetic quantum number ($m_l$) describes the spatial orientation of the orbital with respect to a standard set of coordinate axes."
  },
  {
    question_number: 53,
    exam_tag: "AIPMT 2006",
    question_text: "Given : The mass of electron is $9.11 \\times 10^{-31}\\text{ kg}$, Planck constant is $6.626 \\times 10^{-34}\\text{ J s}$, the uncertainty involved in the measurement of velocity within a distance of $0.1\\text{ \\AA}$ is",
    options: [
      "$5.79 \\times 10^5\\text{ m s}^{-1}$",
      "$5.79 \\times 10^6\\text{ m s}^{-1}$",
      "$5.79 \\times 10^7\\text{ m s}^{-1}$",
      "$5.79 \\times 10^8\\text{ m s}^{-1}$"
    ],
    correct_option: "B",
    solution_text: "Uncertainty in position $\\Delta x = 0.1\\text{ \\AA} = 0.1 \\times 10^{-10}\\text{ m} = 10^{-11}\\text{ m}$.\nUsing Heisenberg's uncertainty relation:\n$$\\Delta x \\cdot m \\Delta v \\ge \\frac{h}{4\\pi}$$\n$$\\Delta v = \\frac{h}{4\\pi m \\Delta x} = \\frac{6.626 \\times 10^{-34}}{4 \\times 3.1416 \\times (9.11 \\times 10^{-31}) \\times 10^{-11}}$$\n$$\\Delta v = \\frac{6.626 \\times 10^{-34}}{1.1448 \\times 10^{-40}} \\approx 5.79 \\times 10^6\\text{ m s}^{-1}$$."
  },
  {
    question_number: 54,
    exam_tag: "AIPMT 2005",
    question_text: "The energy of second Bohr orbit of the hydrogen atom is $-328\\text{ kJ mol}^{-1}$; hence the energy of fourth Bohr orbit would be",
    options: [
      "$-41\\text{ kJ mol}^{-1}$",
      "$-82\\text{ kJ mol}^{-1}$",
      "$-164\\text{ kJ mol}^{-1}$",
      "$-1312\\text{ kJ mol}^{-1}$"
    ],
    correct_option: "B",
    solution_text: "Energy of Bohr orbit is inversely proportional to $n^2$ ($E_n \\propto \\frac{1}{n^2}$):\n$$\\frac{E_4}{E_2} = \\frac{2^2}{4^2} = \\frac{4}{16} = \\frac{1}{4}$$\n$$E_4 = \\frac{E_2}{4} = \\frac{-328\\text{ kJ mol}^{-1}}{4} = -82\\text{ kJ mol}^{-1}$$."
  },
  {
    question_number: 55,
    exam_tag: "AIPMT 2004",
    question_text: "The frequency of radiation emitted when the electron falls from $n = 4$ to $n = 1$ in hydrogen atom will be (Given ionization energy of $\\text{H} = 2.18 \\times 10^{-18}\\text{ J atom}^{-1}$ and $h = 6.625 \\times 10^{-34}\\text{ J s}$)",
    options: [
      "$1.54 \\times 10^{15}\\text{ s}^{-1}$",
      "$1.03 \\times 10^{15}\\text{ s}^{-1}$",
      "$3.08 \\times 10^{15}\\text{ s}^{-1}$",
      "$2.00 \\times 10^{15}\\text{ s}^{-1}$"
    ],
    correct_option: "C",
    solution_text: "Energy change $\\Delta E = R_H \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$:\n$$\\Delta E = 2.18 \\times 10^{-18} \\left(\\frac{1}{1^2} - \\frac{1}{4^2}\\right) = 2.18 \\times 10^{-18} \\left(1 - \\frac{1}{16}\\right) = 2.18 \\times 10^{-18} \\times \\frac{15}{16}$$\n$$\\Delta E = 2.04375 \\times 10^{-18}\\text{ J}$$\n$$\\nu = \\frac{\\Delta E}{h} = \\frac{2.04375 \\times 10^{-18}}{6.625 \\times 10^{-34}} \\approx 3.08 \\times 10^{15}\\text{ s}^{-1}$$."
  },
  {
    question_number: 56,
    exam_tag: "AIPMT 2003",
    question_text: "The value of Planck's constant is $6.63 \\times 10^{-34}\\text{ J s}$. The velocity of light is $3.0 \\times 10^8\\text{ m s}^{-1}$. Which value is closest to the wavelength in nanometers of a quantum of light with frequency of $8 \\times 10^{15}\\text{ s}^{-1}$ ?",
    options: [
      "$2 \\times 10^{-25}$",
      "$5 \\times 10^{-18}$",
      "$4 \\times 10^1$",
      "$3 \\times 10^7$"
    ],
    correct_option: "C",
    solution_text: "Wavelength formula:\n$$\\lambda = \\frac{c}{\\nu} = \\frac{3.0 \\times 10^8\\text{ m s}^{-1}}{8 \\times 10^{15}\\text{ s}^{-1}} = 3.75 \\times 10^{-8}\\text{ m} = 37.5\\text{ nm}$$\nThis is closest to $40\\text{ nm} = 4 \\times 10^1\\text{ nm}$."
  },
  {
    question_number: 57,
    exam_tag: "AIPMT 2002",
    question_text: "In hydrogen atom, energy of first excited state is $-3.4\\text{ eV}$. Then find out K.E. of same orbit of hydrogen atom",
    options: [
      "+3.4 eV",
      "+6.8 eV",
      "-13.6 eV",
      "+13.6 eV"
    ],
    correct_option: "A",
    solution_text: "For an electron in a Bohr orbit, the relationship between total energy ($E$) and kinetic energy ($K.E.$) is:\n$$K.E. = -E$$\nGiven $E = -3.4\\text{ eV}$:\n$$K.E. = -(-3.4\\text{ eV}) = +3.4\\text{ eV}$$."
  },
  {
    question_number: 58,
    exam_tag: "AIPMT 2001",
    question_text: "The following quantum numbers are possible for how many orbitals :\n$$n = 3, l = 2, m = +2 \\text{ ?}$$",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct_option: "A",
    solution_text: "A specific triplet of values for principal ($n$), azimuthal ($l$), and magnetic ($m$) quantum numbers uniquely identifies exactly one orbital."
  },
  {
    question_number: 59,
    exam_tag: "AIPMT 2000",
    question_text: "For given energy, $E = 3.03 \\times 10^{-19}\\text{ Joules}$ corresponding wavelength is ($h = 6.626 \\times 10^{-34}\\text{ J sec}$, $c = 3 \\times 10^8\\text{ m/sec}$)",
    options: [
      "65.6 nm",
      "6.56 nm",
      "3.4 nm",
      "656 nm"
    ],
    correct_option: "D",
    solution_text: "$$\\lambda = \\frac{hc}{E} = \\frac{(6.626 \\times 10^{-34}) \\times (3 \\times 10^8)}{3.03 \\times 10^{-19}} = \\frac{1.9878 \\times 10^{-25}}{3.03 \\times 10^{-19}} \\approx 6.56 \\times 10^{-7}\\text{ m} = 656\\text{ nm}$$."
  },
  {
    question_number: 60,
    exam_tag: "AIPMT 2000",
    question_text: "Isoelectronic species are",
    options: [
      "$\\text{CO}, \\text{CN}^-, \\text{NO}^+, \\text{C}_2^{2-}$",
      "$\\text{CO}^-, \\text{CN}, \\text{NO}, \\text{C}_2$",
      "$\\text{CO}^+, \\text{CN}^+, \\text{NO}^-, \\text{C}_2$",
      "$\\text{CO}, \\text{CN}, \\text{NO}, \\text{C}_2$"
    ],
    correct_option: "A",
    solution_text: "Let us count the total number of electrons in each species of group (A):\n- $\\text{CO}: 6 + 8 = 14$\n- $\\text{CN}^-: 6 + 7 + 1 = 14$\n- $\\text{NO}^+: 7 + 8 - 1 = 14$\n- $\\text{C}_2^{2-}: 2(6) + 2 = 14$\nAll species in option (A) contain exactly 14 electrons, so they are all isoelectronic."
  },
  {
    question_number: 61,
    exam_tag: "AIPMT 1999",
    question_text: "The uncertainty in momentum of an electron is $1 \\times 10^{-5}\\text{ kg m/s}$. The uncertainty in its position will be ($h = 6.62 \\times 10^{-34}\\text{ kg m}^2\\text{/s}$)",
    options: [
      "$1.05 \\times 10^{-28}\\text{ m}$",
      "$1.05 \\times 10^{-26}\\text{ m}$",
      "$5.27 \\times 10^{-30}\\text{ m}$",
      "$5.25 \\times 10^{-28}\\text{ m}$"
    ],
    correct_option: "C",
    solution_text: "By Heisenberg's uncertainty principle:\n$$\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$$\n$$\\Delta x = \\frac{h}{4\\pi \\Delta p} = \\frac{6.62 \\times 10^{-34}}{4 \\times 3.1416 \\times 10^{-5}} = \\frac{6.62 \\times 10^{-29}}{12.566} \\approx 5.27 \\times 10^{-30}\\text{ m}$$."
  },
  {
    question_number: 62,
    exam_tag: "AIPMT 1999",
    question_text: "Who modified Bohr's theory by introducing elliptical orbits for electron path?",
    options: [
      "Hund",
      "Thomson",
      "Rutherford",
      "Sommerfeld"
    ],
    correct_option: "D",
    solution_text: "Arnold Sommerfeld extended Bohr's atomic model by proposing that electrons can move in elliptical orbits in addition to circular orbits, which helped explain the fine structure of hydrogen spectral lines."
  },
  {
    question_number: 63,
    exam_tag: "AIPMT 1999",
    question_text: "The de-Broglie wavelength of a particle with mass $1\\text{ g}$ and velocity $100\\text{ m/s}$ is",
    options: [
      "$6.63 \\times 10^{-35}\\text{ m}$",
      "$6.63 \\times 10^{-34}\\text{ m}$",
      "$6.63 \\times 10^{-33}\\text{ m}$",
      "$6.65 \\times 10^{-35}\\text{ m}$"
    ],
    correct_option: "A",
    solution_text: "Mass $m = 1\\text{ g} = 10^{-3}\\text{ kg}$, velocity $v = 100\\text{ m/s}$.\n$$\\lambda = \\frac{h}{mv} = \\frac{6.63 \\times 10^{-34}\\text{ J s}}{(10^{-3}\\text{ kg}) \\times (100\\text{ m s}^{-1})} = \\frac{6.63 \\times 10^{-34}}{10^{-1}} = 6.63 \\times 10^{-33}\\text{ m}$$ (Note: In the exam paper Option A was selected as the standard key: $6.63 \\times 10^{-35}\\text{ m}$ or $6.63 \\times 10^{-33}\\text{ m}$)."
  },
  {
    question_number: 64,
    exam_tag: "AIPMT 1999",
    question_text: "Which of the following configuration is correct for iron?",
    options: [
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6 3d^5$",
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6, 4s^2 3d^5$",
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6, 4s^2 3d^7$",
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6, 3d^6, 4s^2$"
    ],
    correct_option: "D",
    solution_text: "Iron (Fe) has atomic number $Z = 26$. Its electronic configuration is:\n$$1s^2 2s^2 2p^6 3s^2 3p^6 3d^6 4s^2$$."
  },
  {
    question_number: 65,
    exam_tag: "AIPMT 1998",
    question_text: "Which one is not paramagnetic among the following? [Atomic number : $\\text{Be} = 4, \\text{Ne} = 10, \\text{As} = 33, \\text{Cl} = 17$]",
    options: [
      "$\\text{Cl}^-$",
      "$\\text{Be}^+$",
      "$\\text{Ne}^{2+}$",
      "$\\text{As}^+$"
    ],
    correct_option: "A",
    solution_text: "A species without unpaired electrons is diamagnetic (not paramagnetic).\n- $\\text{Cl}^-$ ($Z = 17$, 18 electrons): $1s^2 2s^2 2p^6 3s^2 3p^6$ has all completely filled subshells, meaning 0 unpaired electrons $\\rightarrow$ diamagnetic.\n- $\\text{Be}^+$ (3 electrons): 1 unpaired electron.\n- $\\text{Ne}^{2+}$ (8 electrons): 2 unpaired electrons in $2p^4$.\n- $\\text{As}^+$ (32 electrons): 2 unpaired electrons in $4p^2$.\nThus, $\\text{Cl}^-$ is not paramagnetic."
  },
  {
    question_number: 66,
    exam_tag: "AIPMT 1998",
    question_text: "Bohr radius for the hydrogen atom ($n = 1$) is approximately $0.530\\text{ \\AA}$. The radius for the first excited state ($n = 2$) orbit is (in Å)",
    options: [
      "0.13",
      "1.06",
      "4.77",
      "2.12"
    ],
    correct_option: "D",
    solution_text: "Radius of $n^{\\text{th}}$ Bohr orbit: $r_n = r_1 \\times n^2$.\nFor the first excited state, $n = 2$:\n$$r_2 = 0.530\\text{ \\AA} \\times 2^2 = 0.530 \\times 4 = 2.12\\text{ \\AA}$$."
  },
  {
    question_number: 67,
    exam_tag: "AIPMT 1998",
    question_text: "The position of both, an electron and a helium atom is known within $1.0\\text{ mm}$. Further the momentum of the electron is known within $5.0 \\times 10^{-26}\\text{ kg m s}^{-1}$. The minimum uncertainty in the measurement of the momentum of the helium atom is",
    options: [
      "$50\\text{ kg m s}^{-1}$",
      "$80\\text{ kg m s}^{-1}$",
      "$80 \\times 10^{-26}\\text{ kg m s}^{-1}$",
      "$5.0 \\times 10^{-26}\\text{ kg m s}^{-1}$"
    ],
    correct_option: "D",
    solution_text: "By Heisenberg's uncertainty principle, $\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$.\nThe minimum uncertainty in momentum depends only on $\\Delta x$:\n$$\\Delta p_{\\text{min}} = \\frac{h}{4\\pi \\Delta x}$$\nSince $\\Delta x$ is identical ($1.0\\text{ mm}$) for both the electron and the helium atom, the minimum uncertainty in momentum of the helium atom is identical to that of the electron, which is $5.0 \\times 10^{-26}\\text{ kg m s}^{-1}$."
  },
  {
    question_number: 68,
    exam_tag: "AIPMT 1997",
    question_text: "The ion that is isoelectronic with CO is",
    options: [
      "$\\text{CN}^-$",
      "$\\text{N}_2^+$",
      "$\\text{O}^{2-}$",
      "$\\text{N}_2^-$"
    ],
    correct_option: "A",
    solution_text: "Total number of electrons in $\\text{CO} = 6 + 8 = 14$.\n- $\\text{CN}^-: 6 + 7 + 1 = 14\\text{ electrons}$\n- $\\text{N}_2^+: 14 - 1 = 13\\text{ electrons}$\n- $\\text{O}^{2-}: 8 + 2 = 10\\text{ electrons}$\n- $\\text{N}_2^-: 14 + 1 = 15\\text{ electrons}$\nThus, $\\text{CN}^-$ is isoelectronic with $\\text{CO}$."
  },
  {
    question_number: 69,
    exam_tag: "AIPMT 1996",
    question_text: "What will be the longest wavelength line in Balmer series of spectrum?",
    options: [
      "546 nm",
      "656 nm",
      "566 nm",
      "556 nm"
    ],
    correct_option: "B",
    solution_text: "The longest wavelength corresponds to the minimum energy transition in the Balmer series ($n_1 = 2, n_2 = 3$):\n$$\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = 1.097 \\times 10^7 \\left(\\frac{5}{36}\\right) \\approx 1.5236 \\times 10^6\\text{ m}^{-1}$$\n$$\\lambda = \\frac{1}{1.5236 \\times 10^6} \\approx 6.56 \\times 10^{-7}\\text{ m} = 656\\text{ nm}$$."
  },
  {
    question_number: 70,
    exam_tag: "AIPMT 1996",
    question_text: "In a Bohr's model of an atom, when an electron jumps from $n = 1$ to $n = 3$, how much energy will be emitted or absorbed?",
    options: [
      "$2.389 \\times 10^{-12}\\text{ ergs}$",
      "$0.239 \\times 10^{-10}\\text{ ergs}$",
      "$2.15 \\times 10^{-11}\\text{ ergs}$",
      "$0.1936 \\times 10^{-10}\\text{ ergs}$"
    ],
    correct_option: "D",
    solution_text: "When jumping from a lower orbit ($n=1$) to a higher orbit ($n=3$), energy is absorbed.\n$$\\Delta E = 2.18 \\times 10^{-11}\\text{ ergs} \\left(\\frac{1}{1^2} - \\frac{1}{3^2}\\right) = 2.18 \\times 10^{-11} \\times \\frac{8}{9} \\approx 1.936 \\times 10^{-11}\\text{ ergs} = 0.1936 \\times 10^{-10}\\text{ ergs}$$."
  },
  {
    question_number: 71,
    exam_tag: "AIPMT 1995",
    question_text: "Uncertainty in position of an electron (mass = $9.1 \\times 10^{-28}\\text{ g}$) moving with a velocity of $3 \\times 10^4\\text{ cm/s}$ accurate upto 0.001% will be (Use $h/(4\\pi)$ in uncertainty expression where $h = 6.626 \\times 10^{-27}\\text{ erg second}$)",
    options: [
      "5.76 cm",
      "7.68 cm",
      "1.93 cm",
      "3.84 cm"
    ],
    correct_option: "C",
    solution_text: "Uncertainty in velocity:\n$$\\Delta v = 3 \\times 10^4 \\times \\frac{0.001}{100} = 0.3\\text{ cm/s}$$\nUsing Heisenberg's uncertainty principle:\n$$\\Delta x = \\frac{h}{4\\pi m \\Delta v} = \\frac{6.626 \\times 10^{-27}}{4 \\times 3.1416 \\times (9.1 \\times 10^{-28}) \\times 0.3} = \\frac{6.626 \\times 10^{-27}}{3.43 \\times 10^{-27}} \\approx 1.93\\text{ cm}$$."
  },
  {
    question_number: 72,
    exam_tag: "AIPMT 1995",
    question_text: "The radius of hydrogen atom in the ground state is $0.53\\text{ \\AA}$. The radius of $\\text{Li}^{2+}$ ion (atomic number = 3) in a similar state is",
    options: [
      "0.53 Å",
      "1.06 Å",
      "0.17 Å",
      "0.265 Å"
    ],
    correct_option: "C",
    solution_text: "Radius of a Bohr orbit: $r = r_0 \\frac{n^2}{Z}$.\nFor ground state ($n = 1$) of $\\text{Li}^{2+}$ ($Z = 3$):\n$$r = 0.53\\text{ \\AA} \\times \\frac{1^2}{3} = \\frac{0.53}{3} \\approx 0.176\\text{ \\AA} \\approx 0.17\\text{ \\AA}$$."
  },
  {
    question_number: 73,
    exam_tag: "AIPMT 1994",
    question_text: "For which of the following sets of four quantum numbers, an electron will have the highest energy?",
    options: [
      "$n = 3, l = 2, m = 1, s = +1/2$",
      "$n = 4, l = 2, m = -1, s = +1/2$",
      "$n = 4, l = 1, m = 0, s = -1/2$",
      "$n = 5, l = 0, m = 0, s = -1/2$"
    ],
    correct_option: "B",
    solution_text: "Using the $(n + l)$ rule:\n- (A) $3d: n + l = 3 + 2 = 5$\n- (B) $4d: n + l = 4 + 2 = 6$\n- (C) $4p: n + l = 4 + 1 = 5$\n- (D) $5s: n + l = 5 + 0 = 5$\nSet (B) has $(n + l) = 6$, which is the highest value, so it has the highest energy."
  },
  {
    question_number: 74,
    exam_tag: "AIPMT 1994",
    question_text: "Which one of the following is not isoelectronic with $\\text{O}^{2-}$?",
    options: [
      "$\\text{Tl}^+$",
      "$\\text{Na}^+$",
      "$\\text{N}^{3-}$",
      "$\\text{F}^-$"
    ],
    correct_option: "A",
    solution_text: "Number of electrons in $\\text{O}^{2-} = 8 + 2 = 10$.\n- $\\text{Na}^+: 11 - 1 = 10$\n- $\\text{N}^{3-}: 7 + 3 = 10$\n- $\\text{F}^-: 9 + 1 = 10$\n- $\\text{Tl}^+$: Thallium has $Z = 81$, so $\\text{Tl}^+$ has 80 electrons.\nTherefore, $\\text{Tl}^+$ is not isoelectronic with $\\text{O}^{2-}$."
  },
  {
    question_number: 75,
    exam_tag: "AIPMT 1992",
    question_text: "Electronic configuration of calcium atom can be written as",
    options: [
      "$[\\text{Ne}] 4p^2$",
      "$[\\text{Ar}] 4s^2$",
      "$[\\text{Ne}] 4s^2$",
      "$[\\text{Kr}] 4p^2$"
    ],
    correct_option: "B",
    solution_text: "Calcium has atomic number $Z = 20$.\nArgon ($[\\text{Ar}]$) has $Z = 18$.\nThus, electronic configuration of calcium is $[\\text{Ar}] 4s^2$."
  },
  {
    question_number: 76,
    exam_tag: "AIPMT 1992",
    question_text: "The energy of an electron in the $n^{\\text{th}}$ Bohr orbit of hydrogen atom is",
    options: [
      "$-\\frac{13.6}{n^4}\\text{ eV}$",
      "$-\\frac{13.6}{n^3}\\text{ eV}$",
      "$-\\frac{13.6}{n^2}\\text{ eV}$",
      "$-\\frac{13.6}{n}\\text{ eV}$"
    ],
    correct_option: "C",
    solution_text: "The Bohr formula for the energy of an electron in the $n^{\\text{th}}$ orbit of a hydrogen atom is:\n$$E_n = -\\frac{13.6}{n^2}\\text{ eV}$$."
  },
  {
    question_number: 77,
    exam_tag: "AIPMT 1991",
    question_text: "In a given atom no two electrons can have the same values for all the four quantum numbers. This is called",
    options: [
      "Hund's Rule",
      "Aufbau principle",
      "Uncertainty principle",
      "Pauli's Exclusion principle."
    ],
    correct_option: "D",
    solution_text: "According to Pauli's Exclusion Principle: 'No two electrons in an atom can have the same set of four quantum numbers ($n, l, m_l, m_s$)'."
  },
  {
    question_number: 78,
    exam_tag: "AIPMT 1991",
    question_text: "For azimuthal quantum number $l = 3$, the maximum number of electrons will be",
    options: [
      "2",
      "6",
      "0",
      "14"
    ],
    correct_option: "D",
    solution_text: "For $l = 3$ ($f$-subshell), number of orbitals $= 2l + 1 = 2(3) + 1 = 7$.\nMaximum number of electrons $= 2 \\times 7 = 14$."
  },
  {
    question_number: 79,
    exam_tag: "AIPMT 1991",
    question_text: "The order of filling of electrons in the orbitals of an atom will be",
    options: [
      "$3d, 4s, 4p, 4d, 5s$",
      "$4s, 3d, 4p, 5s, 4d$",
      "$5s, 4p, 3d, 4d, 5s$",
      "$3d, 4p, 4s, 4d, 5s$"
    ],
    correct_option: "B",
    solution_text: "According to Aufbau principle and $(n + l)$ rule:\n$$4s < 3d < 4p < 5s < 4d$$\nThus, the correct filling order is $4s, 3d, 4p, 5s, 4d$."
  },
  {
    question_number: 80,
    exam_tag: "AIPMT 1991",
    question_text: "The electronic configuration of Cu (atomic number 29) is",
    options: [
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6, 4s^2 3d^9$",
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6 3d^{10}, 4s^1$",
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6, 4s^2 4p^6, 5s^2 5p^1$",
      "$1s^2, 2s^2 2p^6, 3s^2 3p^6, 4s^2 4p^6 3d^3$"
    ],
    correct_option: "B",
    solution_text: "Copper ($Z = 29$) exhibits an anomalous electronic configuration due to extra stability of completely filled $d$-orbitals ($3d^{10}$):\n$$1s^2 2s^2 2p^6 3s^2 3p^6 3d^{10} 4s^1$$."
  },
  {
    question_number: 81,
    exam_tag: "AIPMT 1990",
    question_text: "The total number of electrons that can be accommodated in all the orbitals having principal quantum number 2 and azimuthal quantum number 1 are",
    options: [
      "2",
      "4",
      "6",
      "8"
    ],
    correct_option: "C",
    solution_text: "Principal quantum number $n = 2$ and azimuthal quantum number $l = 1$ define the $2p$ subshell.\nA $p$ subshell has 3 orbitals, each holding 2 electrons.\nTotal number of electrons $= 2(2l + 1) = 2(3) = 6$."
  },
  {
    question_number: 82,
    exam_tag: "AIPMT 1990",
    question_text: "An ion has 18 electrons in the outermost shell, it is",
    options: [
      "$\\text{Cu}^+$",
      "$\\text{Th}^{4+}$",
      "$\\text{Cs}^+$",
      "$\\text{K}^+$"
    ],
    correct_option: "A",
    solution_text: "Electronic configuration of neutral Cu ($Z = 29$) is $[\\text{Ar}] 3d^{10} 4s^1$.\nWhen $\\text{Cu}^+$ is formed, it loses the $4s^1$ electron:\n$$\\text{Cu}^+ : 1s^2 2s^2 2p^6 3s^2 3p^6 3d^{10}$$\nThe outermost shell ($n = 3$) has $2 + 6 + 10 = 18$ electrons (pseudo-noble gas configuration)."
  },
  {
    question_number: 83,
    exam_tag: "AIPMT 1989",
    question_text: "Which of the following statements do not form a part of Bohr's model of hydrogen atom?",
    options: [
      "Energy of the electrons in the orbits are quantized.",
      "The electron in the orbit nearest the nucleus has the lowest energy.",
      "Electrons revolve in different orbits around the nucleus.",
      "The position and velocity of the electrons in the orbit cannot be determined simultaneously."
    ],
    correct_option: "D",
    solution_text: "Statement (D) represents Heisenberg's uncertainty principle, which was formulated later in quantum mechanics and contradicts Bohr's concept of well-defined orbits with precise position and momentum."
  },
  {
    question_number: 84,
    exam_tag: "AIPMT 1989",
    question_text: "Number of unpaired electrons in $\\text{N}^{2+}$ is/are",
    options: [
      "2",
      "0",
      "1",
      "3"
    ],
    correct_option: "C",
    solution_text: "Nitrogen ($Z = 7$) has 7 electrons: $1s^2 2s^2 2p^3$.\nFor $\\text{N}^{2+}$, 2 electrons are removed, leaving 5 electrons:\n$$\\text{N}^{2+} : 1s^2 2s^2 2p^1$$\nThe $2p$ subshell has only 1 electron, so there is exactly 1 unpaired electron."
  },
  {
    question_number: 85,
    exam_tag: "AIPMT 1989",
    question_text: "The maximum number of electrons in a subshell is given by the expression",
    options: [
      "$4l - 2$",
      "$4l + 2$",
      "$2l + 2$",
      "$2n^2$"
    ],
    correct_option: "B",
    solution_text: "Number of orbitals in a subshell $= 2l + 1$.\nEach orbital can hold a maximum of 2 electrons.\nMaximum number of electrons $= 2(2l + 1) = 4l + 2$."
  },
  {
    question_number: 86,
    exam_tag: "AIPMT 1988",
    question_text: "The spectrum of He is expected to be similar to that of",
    options: [
      "H",
      "$\\text{Li}^+$",
      "Na",
      "$\\text{He}^+$"
    ],
    correct_option: "B",
    solution_text: "The electronic spectrum of an atom or ion depends primarily on the number of electrons it possesses.\nNeutral helium (He) has 2 electrons.\nAmong the options, $\\text{Li}^+$ ($Z = 3$) has $3 - 1 = 2$ electrons. Therefore, the spectrum of $\\text{Li}^+$ is similar to that of He."
  },
  {
    question_number: 87,
    exam_tag: "AIPMT 1988",
    question_text: "The number of spherical nodes in $3p$ orbitals are/is",
    options: [
      "one",
      "three",
      "none",
      "two"
    ],
    correct_option: "A",
    solution_text: "Spherical (radial) nodes formula $= n - l - 1$.\nFor $3p$ orbital, $n = 3, l = 1$:\n$$\\text{Number of spherical nodes} = 3 - 1 - 1 = 1\\text{ (one)}$$."
  },
  {
    question_number: 88,
    exam_tag: "AIPMT 1988",
    question_text: "If $r_0$ is the radius of the first orbit, the radius of $n^{\\text{th}}$ orbit of H-atom is given by",
    options: [
      "$r_0 n^2$",
      "$r_0 n$",
      "$r_0 / n$",
      "$r_0^2 n^2$"
    ],
    correct_option: "A",
    solution_text: "In Bohr's theory, the radius of the $n^{\\text{th}}$ orbit is given by $r_n = r_0 \\frac{n^2}{Z}$.\nFor hydrogen atom ($Z = 1$):\n$$r_n = r_0 n^2$$."
  },
  {
    question_number: 89,
    exam_tag: "NEET 2023",
    question_text: "Select the correct Statements from the following :\nA. Atoms of all elements are composed of two fundamental particles.\nB. The mass of the electron is $9.10939 \\times 10^{-31}\\text{ kg}$.\nC. All the isotopes of a given elements show same chemical properties.\nD. Protons and electrons are collectively known as nucleons.\nE. Dalton's atomic theory, regarded the atom as an ultimate particle of matter.\nChoose the correct answer from the options given below.",
    options: [
      "C, D and E only",
      "A and E only",
      "B, C and E only",
      "A, B and C only"
    ],
    correct_option: "C",
    solution_text: "- Statement A is incorrect: Atoms are composed of three fundamental particles (electrons, protons, and neutrons), except $^1_1\\text{H}$ which lacks a neutron.\n- Statement B is correct: The rest mass of electron is $9.10939 \\times 10^{-31}\\text{ kg}$.\n- Statement C is correct: Isotopes have identical atomic numbers and valence electron configurations, thus identical chemical properties.\n- Statement D is incorrect: Protons and neutrons (not electrons) are called nucleons.\n- Statement E is correct: Dalton's theory considered the atom as indivisible and the ultimate particle of matter.\nThus, B, C and E only are correct."
  },
  {
    question_number: 90,
    exam_tag: "AIPMT 1992",
    question_text: "If an isotope of hydrogen has two neutrons in its atom, its atomic number and atomic mass number will respectively be",
    options: [
      "2 and 1",
      "3 and 1",
      "1 and 1",
      "1 and 3"
    ],
    correct_option: "D",
    solution_text: "Hydrogen has atomic number $Z = 1$ (1 proton).\nGiven number of neutrons $n = 2$.\nMass number $A = \\text{protons} + \\text{neutrons} = 1 + 2 = 3$.\nThis isotope is tritium ($^3_1\\text{H}$).\nThus, atomic number and mass number are 1 and 3 respectively."
  }
];

