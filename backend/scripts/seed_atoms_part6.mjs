export const ATOMS_BATCH6_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): It is not essential that all the lines available in the emission spectrum will also be available in the absorption spectrum.\nReason (R): The spectrum of hydrogen atom is only absorption spectrum.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Assertion Evaluation:**\n   In emission spectra, electrons can jump between any higher excited state to any lower state (giving Lyman, Balmer, Paschen, etc.). In absorption spectra at normal temperatures, atoms are in the ground state ($n = 1$), so absorption lines correspond almost exclusively to transitions starting from the ground state ($n = 1 \\to n = 2, 3, 4, \\dots$). Hence, many lines present in emission are absent in absorption. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   Hydrogen atoms produce both emission spectra (upon de-excitation of excited atoms) and absorption spectra (when white light passes through cold hydrogen gas). Stating that it is 'only absorption spectrum' is completely incorrect. Thus, Reason is FALSE.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): If electron in a sample of hydrogen atom falls from $6^{\\text{th}}$ orbit to $3^{\\text{rd}}$ orbit, the maximum number of emission lines is six.\nReason (R): When an electron jumps from a higher orbit to a lower orbit, its kinetic energy increases.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Assertion Evaluation:**\n   For transition from $n_2 = 6$ to $n_1 = 3$:\n   $$N = \\frac{(n_2 - n_1)(n_2 - n_1 + 1)}{2} = \\frac{(6 - 3)(6 - 3 + 1)}{2} = \\frac{3 \\times 4}{2} = 6$$\n   Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   When an electron moves to a lower orbit ($n$ decreases), its orbital speed $v \\propto 1/n$ increases, so its kinetic energy $K = \\frac{1}{2}mv^2$ increases. Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   The number of emission lines is derived from combinatorial transitions between discrete quantum states, not from the increase in kinetic energy. Hence, Reason does not explain the Assertion.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Balmer spectral lines of hydrogen spectrum may lie in ultraviolet regions\nReason (R): When an electron is excited from lower energy to higher energy state, its kinetic energy decreases.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Assertion Evaluation:**\n   The series limit of the Balmer series occurs at $\\lambda = \\frac{4}{R} \\approx 364.6\\text{ nm}$, which lies in the ultraviolet region ($\\lambda < 400\\text{ nm}$). Higher order transitions near the limit also fall into near-UV. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   When an electron is excited to a higher energy state ($n$ increases), its speed $v \\propto 1/n$ decreases, so its kinetic energy $K = \\frac{1}{2}mv^2$ decreases. Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   The spectral line wavelength falling into the UV spectrum is governed by the energy transition equation $\\Delta E = \\frac{hc}{\\lambda}$, not directly by the decrease of kinetic energy upon excitation.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Balmer series of hydrogen atom lies in the visible region of electromagnetic spectrum.\nReason (R): For Balmer series, $\\frac{1}{\\lambda} = R\\left[\\frac{1}{3^2} - \\frac{1}{n^2}\\right], n = 4, 5, 6, 7 \\dots$",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   The visible lines of the hydrogen spectrum ($H_\\alpha, H_\\beta, H_\\gamma, H_\\delta$) belong to the Balmer series. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   For the Balmer series, transitions terminate at the second orbit ($n_1 = 2$). The correct Rydberg formula is:\n   $$\\frac{1}{\\lambda} = R\\left[\\frac{1}{2^2} - \\frac{1}{n^2}\\right], \\quad n = 3, 4, 5, \\dots$$\n   The formula given in the Reason corresponds to the Paschen series ($n_1 = 3$). Thus, Reason is FALSE.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Kinetic energy of an electron moving in an orbit decreases with increase in radius of the orbit.\nReason (R): Kinetic energy of the electron is given by $\\frac{k q_1 q_2}{r}$.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   Centripetal force is provided by electrostatic attraction:\n   $$\\frac{m v^2}{r} = \\frac{k Z e^2}{r^2} \\implies K = \\frac{1}{2} m v^2 = \\frac{k Z e^2}{2r}$$\n   As the radius $r$ increases, the kinetic energy $K$ decreases. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   The kinetic energy is $K = \\frac{k q_1 q_2}{2r}$, which has an essential factor of $\\frac{1}{2}$. The expression $\\frac{k q_1 q_2}{r}$ corresponds to the magnitude of potential energy, not kinetic energy. Thus, Reason is FALSE.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): In Bohr's model, frequency of revolution of electron in its orbit is related with frequency of spectral line for small quantum number.\nReason (R): In Bohr's model for transition between small quantum numbers both frequencies match.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: "1. **Bohr's Correspondence Principle:**\n   Bohr's correspondence principle states that quantum physics results agree with classical physics in the limit of **large quantum numbers** ($n \\gg 1$).\n\n2. **Comparison of Frequencies:**\n   - Frequency of revolution: $f_{\\text{rev}} = \\frac{v}{2\\pi r} \\propto \\frac{1}{n^3}$.\n   - For transitions between adjacent orbits ($n \\to n - 1$), the frequency of the emitted photon is:\n     $$\\nu = \\frac{\\Delta E}{h} = \\frac{2 R c}{n^3}$$\n   This matches $f_{\\text{rev}}$ only when $n$ is very large ($n \\to \\infty$). For small quantum numbers, the two frequencies are completely different and do not match.\n\nHence, both Assertion and Reason are false statements.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): In Bohr's model, angular momentum is quantised.\nReason (R): Energy of hydrogen atom in $n^{\\text{th}}$ orbit is $E_n = -\\frac{13.6}{n^2}\\text{ eV}$.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   According to Bohr's second postulate, orbital angular momentum is quantized as $L = \\frac{nh}{2\\pi}$. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   The energy of an electron in the $n^{\\text{th}}$ stationary orbit of hydrogen is $E_n = -\\frac{13.6}{n^2}\\text{ eV}$. Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   Quantization of angular momentum is an independent postulate that leads to the derivation of the quantized energy expression, rather than being explained by it. Thus, Reason is not the correct explanation of Assertion.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): The existence of discrete energy level in atom was experimentally verified by Franck and Hertz.\nReason (R): The potential energy of electron of hydrogen atom in second excited state is $-3.02\\text{ eV}$.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Assertion Evaluation:**\n   The Franck-Hertz experiment (1914) provided the first direct experimental evidence for discrete quantized energy levels in atoms via inelastic electron scattering with mercury vapour. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   Second excited state corresponds to $n = 3$:\n   $$E_3 = -\\frac{13.6}{3^2} = -1.51\\text{ eV}$$\n   $$U_3 = 2 E_3 = 2 \\times (-1.51) = -3.02\\text{ eV}$$\n   Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   The numerical calculation of potential energy in hydrogen does not explain the historical Franck-Hertz experiment on mercury vapor.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Bohr's model correctly predicts frequencies of light emitted by hydrogenic atoms.\nReason (R): According to Bohr's model $E_i - E_f = h\\nu$",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   Bohr's model provides quantitatively accurate formulas for the spectral frequencies of hydrogen and hydrogen-like ions ($\\text{He}^+, \\text{Li}^{2+}$, etc.). Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   Bohr's third postulate states that radiation is emitted when an electron jumps from higher state $E_i$ to lower state $E_f$ with photon frequency $\\nu = \\frac{E_i - E_f}{h}$. Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   This frequency condition is precisely the mathematical basis by which Bohr's model predicts the spectral frequencies.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Bohr's model is applicable to doubly ionised helium.\nReason (R): Doubly ionised helium is a hydrogenic atom.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Hydrogenic Atom Definition:**\n   A hydrogenic (or hydrogen-like) atom is an atom or ion that possesses exactly **one electron** orbiting a nucleus of charge $+Ze$.\n\n2. **Doubly Ionised Helium:**\n   A neutral helium atom has 2 electrons ($Z = 2$). Doubly ionized helium ($\\text{He}^{2+}$) has lost both electrons; it has zero electrons and consists only of a bare nucleus (an alpha particle). Hence, it is not a hydrogenic atom.\n\n3. **Bohr Model Applicability:**\n   Since there are no electrons orbiting the nucleus in $\\text{He}^{2+}$, Bohr's atomic model does not apply to it (it applies to singly ionized helium $\\text{He}^+$).\n\nBoth Assertion and Reason are false statements.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Bohr's model is not applicable for two electron atoms.\nReason (R): In such cases each electron also interact with other electron other than positively charged nucleus.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   Bohr's model fails for any multi-electron atom or ion (such as neutral helium, which has 2 electrons). Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   In multi-electron systems, electrons experience not only the attractive Coulomb force from the positive nucleus but also mutual repulsive forces with each other (electron-electron interactions). Bohr's simple central-force model does not account for these interactions. Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   The presence of electron-electron repulsion is the exact reason why Bohr's model is not applicable to multi-electron systems.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): In Rutherford's experiment computation of trajectory of an alpha-particle scattered by a single nucleus is enough.\nReason (R): As the gold foil is very thin, it can be assumed that $\\alpha$-particle will suffer not more than one scattering during their passage through it.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **NCERT Context on Rutherford Scattering:**\n   The gold foil used in the Geiger-Marsden experiment was extremely thin (about $2.1 \\times 10^{-7}\\text{ m}$, only about 1000 atoms thick). Since atoms are mostly empty space, an alpha particle passes through with a negligible probability of interacting with more than one nucleus.\n\n2. **Single Scattering Approximation:**\n   Assuming single scattering enables analyzing the trajectory using Coulomb's law for a two-body interaction with a single gold nucleus. Thus both Assertion and Reason are true, and Reason is the correct explanation.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Study of emission line spectra of a material can therefore serve as a type of fingerprint for identification of the gas.\nReason (R): Different material has different emission spectra.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Atomic Emission Spectra as Fingerprints:**\n   Every chemical element has a unique arrangement of electrons and discrete energy levels, producing a characteristic set of spectral lines when excited. Because no two elements share the same emission spectrum, emission spectra serve as an unmistakable fingerprint to identify substances.\n\nThus, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): In Rutherford model the energy of an accelerating electron should continuously decrease.\nReason (R): According to classical electromagnetic theory, an accelerating charged particle can never emit any radiation.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   In Rutherford's planetary model, electrons undergo centripetal acceleration. By classical electrodynamics, an accelerating electron must continuously radiate electromagnetic energy, steadily decreasing its total orbital energy and spiraling into the nucleus. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   Classical electromagnetic theory explicitly proves that an accelerating charged particle **always radiates energy**. The claim that it can 'never emit any radiation' is completely false. Thus, Reason is FALSE.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): The minimum energy required to free the electron from the ground state of hydrogen atom is $13.6\\text{ eV}$.\nReason (R): The energy of lowest state of H atom is $13.6\\text{ eV}$.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   The ground state binding/ionization energy required to liberate an electron from hydrogen to infinity is $+13.6\\text{ eV}$. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   The lowest energy state of a hydrogen atom is bound, with total energy $E_1 = -13.6\\text{ eV}$ (negative), not $+13.6\\text{ eV}$. Thus, Reason is FALSE.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): Atom contains equal amount of positive and negative charges.\nReason (R): Atom, as a whole, is electrically neutral.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   An uncharged atom has $Z$ protons (positive charge $+Ze$) and $Z$ electrons (negative charge $-Ze$). Thus, an atom contains equal amounts of positive and negative charges. Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   Under normal conditions, an atom has zero net charge and is electrically neutral. Reason is TRUE.\n\n3. **Explanation Check:**\n   The equality of positive and negative charges is the microscopic cause of macroscopic electrical neutrality, not vice versa. Therefore, Reason is not the correct explanation of the Assertion.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): In a scattering experiment of Rutherford, it is reasonable to assume that the nucleus of gold remains stationary throughout the scattering process.\nReason (R): The nucleus of gold is about 100 times heavier than an $\\alpha$-particle.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Assertion Evaluation:**\n   Because the gold nucleus is much heavier than the incident $\\alpha$-particle, it recoils negligibly and can be assumed to remain stationary at the origin during scattering. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   The mass number of gold is $197\\text{ u}$ and that of an $\\alpha$-particle is $4\\text{ u}$. The gold nucleus is approximately $\\frac{197}{4} \\approx 50$ times heavier than an $\\alpha$-particle (as explicitly noted in NCERT), not 100 times. Thus, Reason is FALSE.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Assertion (A): In emission spectra light is radiated in various discrete frequencies.\nReason (R): $h\\nu_{if} = E_{n_i} - E_{n_f}$, both $n_i$ and $n_f$ are integers.",
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
      '(3) Assertion is true statement but Reason is false',
      '(4) Both Assertion and Reason are false statements'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Assertion Evaluation:**\n   Atomic emission spectra consist of distinct, sharp spectral lines at discrete frequencies rather than a continuous band. Thus, Assertion is TRUE.\n\n2. **Reason Evaluation:**\n   Electrons transition between stationary states with discrete quantized energies characterized by integers $n_i$ and $n_f$. By Bohr's frequency condition:\n   $$h\\nu_{if} = E_{n_i} - E_{n_f}$$\n   Since the states are discrete, only discrete photon energies and frequencies can be emitted. Thus, Reason is TRUE.\n\n3. **Explanation Check:**\n   The discrete nature of the quantum numbers $n_i, n_f$ directly explains why light is emitted in discrete frequencies.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  }
];
