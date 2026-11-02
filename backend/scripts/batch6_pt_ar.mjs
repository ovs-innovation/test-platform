// Batch 6: Section B Assertion - Reason Questions 1 to 16 (Periodic Table)
export const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batch6ARQuestions = [
  {
    q_num: 1,
    assertion_text: "Electron gain enthalpy for nitrogen is positive.",
    reason_text: "Addition of electron in nitrogen is an endothermic process due to half filled stable configuration.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Nitrogen has electronic configuration $1s^2 2s^2 2p^3$ with an extra-stable, symmetrical half-filled $2p$ subshell. Adding an additional electron requires placing it into an already occupied $2p$ orbital, producing significant inter-electronic repulsion and disrupting subshell stability. Consequently, energy must be supplied (endothermic process), making the electron gain enthalpy positive. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Electron Gain Enthalpy of Nitrogen",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 2,
    assertion_text: "Boron cannot show covalency greater than four.",
    reason_text: "Boron has high ionization energy and high electronegativity corresponding to $13^{\\text{th}}$ group elements.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Boron belongs to the second period ($2s^2 2p^1$) and possesses only four valence orbitals (one $2s$ and three $2p$ orbitals) with no vacant $d$-orbitals in the second shell. Consequently, its maximum covalency is restricted to four (e.g. $[BF_4]^-$) (Assertion is true). Boron does have the highest ionization enthalpy and electronegativity in Group 13 (Reason is true). However, its covalency limit is determined by the absence of $d$-orbitals, not by its ionization energy or electronegativity. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Maximum Covalency of Boron",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 3,
    assertion_text: "In each period, second ionization energy of alkali metal is highest.",
    reason_text: "Second electron is removed from noble gas configuration in alkali metals which is most stable.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Alkali metals have valence electronic configuration $ns^1$. Losing their first electron generates a monovalent cation $M^+$ possessing an extremely stable noble gas closed-shell octet configuration ($(n-1)s^2 (n-1)p^6$). Removing a second electron requires disrupting this noble-gas core close to the nucleus under a high effective nuclear charge. Hence, the second ionization enthalpy of an alkali metal is by far the highest in its period. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Second Ionization Energy of Alkali Metals",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 4,
    assertion_text: "Zn, Cd and Hg do not show most of the properties of transition elements.",
    reason_text: "The chemistry of early actinoids is more complicated than the corresponding lanthanoids.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Zinc, Cadmium, and Mercury have completely filled $(n-1)d^{10} ns^2$ configurations in their elemental states and common $+2$ oxidation states ($d^{10}$). Because their $d$-subshell remains completely filled, they do not exhibit typical transition metal characteristics such as variable oxidation states, catalytic activity, paramagnetism, or colored complexes (Assertion is true). Early actinoids display complex chemistry due to the close energy levels of $5f, 6d, 7s$ orbitals, allowing wide-ranging oxidation states (Reason is true). However, Reason does not explain the atypical behavior of Group 12 elements. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Non-Transition Character of Group 12 Elements",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 5,
    assertion_text: "Electron gain enthalpy can be exothermic or endothermic.",
    reason_text: "Depending on the elements, electron gain enthalpy provides a measure of the ease with which an atom adds an electron to form anion.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Electron gain enthalpy ($\\Delta H_{\\text{eg}}$) measures the energy change when an isolated gaseous atom accepts an electron. For elements that strongly attract electrons to attain stable configurations (such as halogens and chalcogens), energy is released (exothermic, $\\Delta H_{\\text{eg}} < 0$). For elements with stable filled or half-filled subshells (such as noble gases, alkaline earth metals, and nitrogen), energy must be supplied to force electron addition (endothermic, $\\Delta H_{\\text{eg}} > 0$). Thus, electron gain enthalpy can be exothermic or endothermic because it measures the thermodynamic ease of anion formation. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Thermodynamics of Electron Gain Enthalpy",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 6,
    assertion_text: "Atomic number of the element ununbium is 112.",
    reason_text: "Name for digits 1 and 2 is un and bi respectively in Latin words.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Under IUPAC systematic nomenclature for superheavy elements ($Z > 100$), roots derived directly from digits are: $0 = \\text{nil}$, $1 = \\text{un}$, and $2 = \\text{bi}$. For $Z = 112$, the name is constructed as un + un + bi + ium = Ununbium ($Uub$). Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "IUPAC Systematic Nomenclature of Elements",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 7,
    assertion_text: "Second period consists of 8 elements.",
    reason_text: "Number of elements in each period is four times the number of period.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "The second period involves filling the $2s$ (1 orbital) and $2p$ (3 orbitals) subshells, accommodating a total of $4 \\times 2 = 8$ electrons from Lithium ($Z = 3$) to Neon ($Z = 10$) (Assertion is true). The number of elements in periods 1, 2, 3, 4, 5, 6, 7 are 2, 8, 8, 18, 18, 32, 32 respectively, which is NOT four times the period number (e.g. Period 1 has 2, not $4 \\times 1 = 4$; Period 3 has 8, not 12) (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Number of Elements in Periodic Periods",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 8,
    assertion_text: "Elements in the same column have similar properties.",
    reason_text: "Periodic properties of elements is a function of atomic number.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Elements occupying the same vertical group (column) of the periodic table possess identical valence shell electronic configurations, which leads to similar chemical properties and valencies (Assertion is true). According to the Modern Periodic Law, physical and chemical properties of elements are periodic functions of their atomic numbers (Reason is true). However, the specific reason why elements in the same column share similar properties is their identical number and arrangement of valence electrons, not simply the general statement of the periodic law. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Group Periodicity and Chemical Similarity",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 9,
    assertion_text: "In Cr, number of unpaired electron is 6.",
    reason_text: "Half filled subshells are more stable than partially filled subshells.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Chromium ($Z = 24$) has ground-state electronic configuration $[Ar] 3d^5 4s^1$ rather than the expected $[Ar] 3d^4 4s^2$. This gives 5 unpaired electrons in the $3d$ subshell and 1 unpaired electron in the $4s$ subshell, totaling $5 + 1 = 6$ unpaired electrons (Assertion is true). Chromium adopts this anomalous configuration because half-filled subshells ($3d^5$) possess extra electronic stability arising from exchange energy and symmetric charge distribution (Reason is true and correctly explains the Assertion).",
    topic: "Electronic Configuration and Unpaired Electrons of Chromium",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 10,
    assertion_text: "In a period as we move from left to right nature of oxides gradually changes from basic to acidic.",
    reason_text: "On moving left to right in a period non-metallic character increases.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Across a horizontal period from left to right, electropositivity decreases and non-metallic character increases due to rising effective nuclear charge and electronegativity. Metallic elements on the left form basic ionic oxides (e.g. $Na_2O, MgO$), intermediate elements form amphoteric oxides (e.g. $Al_2O_3$), and non-metals on the right form covalent acidic oxides (e.g. $P_4O_{10}, SO_3, Cl_2O_7$). The steady increase in non-metallic character directly causes oxides to transition from basic to acidic. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Periodic Variation in Acid-Base Character of Oxides",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 11,
    assertion_text: "The term atomic size refers to the radius of the atom.",
    reason_text: "Atomic size depends only on number of protons present in an atom.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Atomic size is quantitatively expressed in terms of atomic radius (covalent, metallic, or van der Waals radius) (Assertion is true). Atomic size does not depend solely on the number of protons; it is determined by the principal quantum number (number of electron shells $n$), effective nuclear charge ($Z_{\\text{eff}}$), shielding by inner core electrons, and electron-electron repulsions (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Factors Determining Atomic Size",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 12,
    assertion_text: "Li, Na, K form Dobereiner triads.",
    reason_text: "Atomic mass of Na is roughly the average of atomic masses of Li and K.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Lithium ($A = 7$), Sodium ($A = 23$), and Potassium ($A = 39$) share very similar chemical properties and constitute Dobereiner\'s classic alkali metal triad. The arithmetic mean of the atomic masses of the first and third elements is $\\frac{7 + 39}{2} = 23$, which exactly matches the atomic mass of the central element Sodium. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Dobereiner Law of Triads",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 13,
    assertion_text: "Isotopes are placed together in the modern periodic table.",
    reason_text: "Isotopes have same atomic number.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Moseley\'s Modern Periodic Law arranges elements in order of increasing atomic number ($Z$). Because isotopes of an element have the identical number of protons and atomic number, they have identical valence electronic configurations and occupy the exact same slot in the modern periodic table. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Placement of Isotopes in Modern Periodic Table",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 14,
    assertion_text: "As we move from left to right along a period in periodic table, the outermost electrons are held more and more tightly to the nucleus.",
    reason_text: "Across the period, increasing nuclear charge outweighs the shielding.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Across a period from left to right, each successive element gains one nuclear proton ($Z$) and one electron in the same principal energy shell. Electrons residing in the same valence shell provide poor screening for each other. As a result, the increase in nuclear charge strongly outweighs the shielding effect, causing the effective nuclear charge ($Z_{\\text{eff}}$) to rise continuously. This pulls the valence electrons closer and binds them with increasing firmness to the nucleus. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Effective Nuclear Charge Across a Period",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 15,
    assertion_text: "It is easier to remove the $2p$ electron from boron compared to the removal of $2s$ electron from beryllium.",
    reason_text: "$2p$-electron of boron is more shielded from the nucleus by the inner core of electrons than the $2s$ electrons of beryllium.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Beryllium ($1s^2 2s^2$) has a first ionization enthalpy of $899\\text{ kJ/mol}$, whereas Boron ($1s^2 2s^2 2p^1$) has a lower first ionization enthalpy of $801\\text{ kJ/mol}$. An $s$-orbital electron has higher penetration probability closer to the nucleus than a $p$-orbital electron of the same principal shell. The $2p$ electron in Boron is screened by both the $1s$ and $2s$ electrons, while the $2s$ electrons in Beryllium are screened only by $1s$ electrons and experience greater penetration. Thus, it is easier to remove the $2p$ electron from boron. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Penetration and Shielding in Be and B Ionization",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 16,
    assertion_text: "Noble gases exhibit very low chemical reactivity.",
    reason_text: "Noble gases belongs to group 18 in modern periodic table.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Noble gases possess completely filled valence shells ($ns^2 np^6$, and $1s^2$ for He), having extremely high ionization enthalpies and large positive electron gain enthalpies. They have no tendency to gain, lose, or share electrons under standard conditions, resulting in chemically inert behavior (Assertion is true). Noble gases are located in Group 18 of the periodic table (Reason is true). However, their chemical inertness is caused by their stable closed-shell electronic configuration, not by the arbitrary group label 18. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Inertness and Electronic Stability of Noble Gases",
    difficulty: "easy",
    marks: 4
  }
];

