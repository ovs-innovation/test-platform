// Batch 4: Periodic Table MCQs (Q106 to Q140)
export const batch4Questions = [
  {
    serialNumber: 106,
    question_type: 'single_choice',
    question_text: 'An atom of an element A has 2 electrons in its outermost shell while one of the element B has 6 electrons in its outermost shell. Then formula of the compound formed by A and B is',
    options: [
      'AB',
      '$A_2B$',
      '$AB_2$',
      '$A_2B_3$'
    ],
    correct_index: 0,
    solution: 'Element A with 2 valence electrons loses 2 electrons to form a divalent cation $A^{2+}$. Element B with 6 valence electrons needs 2 electrons to complete an octet, forming a divalent anion $B^{2-}$. Combining $A^{2+}$ and $B^{2-}$ gives the neutral empirical formula $AB$.',
    topic: 'Valence Electrons and Chemical Formula Prediction',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 107,
    question_type: 'single_choice',
    question_text: 'The ratio of cationic size to anionic size is minimum for the compound',
    options: [
      'LiF',
      'LiI',
      'RbI',
      'RbF'
    ],
    correct_index: 1,
    solution: 'The ratio $r_{\\text{cation}} / r_{\\text{anion}}$ is minimized when the cation is as small as possible and the anion is as large as possible. Among alkali metal cations, $Li^+$ is the smallest, and among halide anions, $I^-$ is the largest. Therefore, the radius ratio is smallest for Lithium iodide ($LiI$).',
    topic: 'Cation to Anion Radius Ratio',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 108,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is wrong?',
    options: [
      'Neutron/proton ratio does not reflect the periodicity in chemical properties of elements',
      'The I.E. of aluminium is greater than magnesium because penetrating effect of $p$ orbital is greater than $s$ orbital',
      'The value of $e^-$ gain enthalpy for N is positive',
      'The order of $1^{\\text{st}} IE$ of elements A, B, C and D with atomic numbers 6, 7, 8 and 9 respectively will be $C < D > B > A$'
    ],
    correct_index: 1,
    solution: 'Statement (2) is completely wrong: the ionization enthalpy of Aluminium ($577\\text{ kJ/mol}$) is actually LESS than that of Magnesium ($737\\text{ kJ/mol}$) because an $s$-orbital electron penetrates closer to the nucleus and is more strongly held than a $p$-orbital electron, making penetration power of $s > p$.',
    topic: 'Ionization Enthalpy Comparison of Mg and Al',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 109,
    question_type: 'single_choice',
    question_text: 'I.E. is the amount of energy required to remove an electron from an isolated gaseous atom to infinity. Then which of the following statement regarding I.E. is incorrect?',
    options: [
      '$IE_1$ of $O^+$ is greater than O',
      'I.E. of noble gas is very high due to large size',
      'The I.E. of $P > S$',
      'The process of ionisation is an endothermic reaction'
    ],
    correct_index: 1,
    solution: 'Noble gases have the smallest atomic radii in their respective periods due to maximum effective nuclear charge across the period. Their high ionization energies are due to their stable filled-shell configurations and compact small size, not "large size". Statement (2) is incorrect.',
    topic: 'Factors Affecting Ionization Energy',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 110,
    question_type: 'single_choice',
    question_text: 'An element with atomic number 56 belongs to which period, block and group of the periodic table respectively?',
    options: [
      '$6^{\\text{th}}\\text{ period; } d\\text{-block; } 3^{\\text{rd}}\\text{ group}$',
      '$7^{\\text{th}}\\text{ period; } d\\text{-block; } 3^{\\text{rd}}\\text{ group}$',
      '$6^{\\text{th}}\\text{ period; } s\\text{-block; } 2^{\\text{nd}}\\text{ group}$',
      '$7^{\\text{th}}\\text{ period; } s\\text{-block; } 2^{\\text{nd}}\\text{ group}$'
    ],
    correct_index: 2,
    solution: 'Element $Z = 56$ is Barium ($Ba$). Its electronic configuration is $[Xe] 6s^2$. The principal quantum number of the outermost valence electrons is $n=6$, so it is in the $6^{\\text{th}}$ period. Since valence electrons are in the $s$-subshell, it belongs to the $s$-block, and having 2 valence electrons places it in Group 2.',
    topic: 'Periodic Table Position of Barium',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 111,
    question_type: 'single_choice',
    question_text: 'The ionization enthalpies of lithium and sodium are $x\\text{ kJ/mol}$ and $y\\text{ kJ/mol}$ respectively. Then energy required to convert all the atoms present in $7\\text{ mg}$ of lithium (Li) vapours and $23\\text{ mg}$ of sodium (Na) vapours into cations is',
    options: [
      '$(x + y)\\text{ J}$',
      '$(x + y)\\text{ kJ}$',
      '$\\frac{x+y}{1000}\\text{ J}$',
      '$\\left(\\frac{x}{100} + \\frac{y}{100}\\right)\\text{ J}$'
    ],
    correct_index: 0,
    solution: 'Moles of Li = $\\frac{7 \\times 10^{-3}\\text{ g}}{7\\text{ g/mol}} = 10^{-3}\\text{ mol}$. Energy for Li = $10^{-3} \\times x\\text{ kJ} = x\\text{ J}$.\nMoles of Na = $\\frac{23 \\times 10^{-3}\\text{ g}}{23\\text{ g/mol}} = 10^{-3}\\text{ mol}$. Energy for Na = $10^{-3} \\times y\\text{ kJ} = y\\text{ J}$.\nTotal energy required = $(x + y)\\text{ J}$.',
    topic: 'Quantitative Ionization Energy Calculations',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 112,
    question_type: 'single_choice',
    question_text: 'The correct order of ionic size is',
    options: [
      '$N^{3-} > Na^+ > F^- > O^{2-} > Mg^{2+}$',
      '$N^{3-} > O^{2-} > F^- > Na^+ > Mg^{2+}$',
      '$N^{3-} > O^{2-} > F^- > Mg^{2+} > Na^+$',
      '$F^- > O^{2-} > N^{3-} > Na^+ > Mg^{2+}$'
    ],
    correct_index: 1,
    solution: 'All five ions ($N^{3-}, O^{2-}, F^-, Na^+, Mg^{2+}$) are isoelectronic with 10 electrons. For isoelectronic species, size decreases as nuclear charge increases: $N^{3-} (Z=7) > O^{2-} (Z=8) > F^- (Z=9) > Na^+ (Z=11) > Mg^{2+} (Z=12)$.',
    topic: 'Comparative Isoelectronic Ionic Sizes',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 113,
    question_type: 'single_choice',
    question_text: 'Valence configuration and block number of element with atomic number 89 is',
    options: [
      '$[Rn] 6d^1 7s^2, d\\text{-block}$',
      '$[Rn] 5f^1 7s^2, f\\text{-block}$',
      '$[Rn] 5f^1 6d^1 7s^2, d\\text{-block}$',
      '$[Rn] 7s^2, s\\text{-block}$'
    ],
    correct_index: 0,
    solution: 'Element $Z = 89$ is Actinium ($Ac$). Its ground-state electronic configuration is $[Rn] 6d^1 7s^2$, where the differentiating electron occupies the $6d$ orbital before the $5f$ subshell begins filling in Thorium. Hence, Actinium belongs to the $d$-block.',
    topic: 'Electronic Configuration and Block of Actinium',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 114,
    question_type: 'single_choice',
    question_text: 'Which is true regarding ionisation energy?',
    options: [
      '$IE_1 < IE_2$',
      '$I^+ < I$',
      '$IE_1\\text{ of } Mg < IE_2\\text{ of } Mg$',
      'Both (1) & (3)'
    ],
    correct_index: 3,
    solution: 'Successive ionization energies of an atom always increase because each subsequent electron is removed from an increasingly positive ion experiencing a higher effective nuclear charge ($IE_1 < IE_2 < IE_3$). Therefore, both $IE_1 < IE_2$ and $IE_1(Mg) < IE_2(Mg)$ are unconditionally true.',
    topic: 'Successive Ionization Energy Relationships',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 115,
    question_type: 'single_choice',
    question_text: 'Maximum oxidation states of transition metal is derived from',
    options: [
      '$ns$ electron',
      '$(n-1)d$ electron',
      '$(n-2)f$ electron',
      '$ns + (n-1)d$ electrons'
    ],
    correct_index: 3,
    solution: 'Because the energy difference between the outermost $ns$ and penultimate $(n-1)d$ orbitals is very small, transition metals can involve both $ns$ and $(n-1)d$ electrons in chemical bonding. The maximum oxidation state exhibited by a transition element is determined by the total number of electrons in $ns + (n-1)d$ subshells (e.g., $Mn = 2 + 5 = +7$; $Ru, Os = 2 + 6 = +8$).',
    topic: 'Variable Oxidation States of Transition Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 116,
    question_type: 'single_choice',
    question_text: 'Which of the following set of compounds are amphoteric in nature?',
    options: [
      '$BeO, B_2O_3, Be(OH)_2$',
      '$BeO, Be(OH)_2, Al_2O_3$',
      '$Be(OH)_2, N_2O, SiO_2$',
      '$Al_2O_3, MgO, SO_3$'
    ],
    correct_index: 1,
    solution: 'Beryllium oxide ($BeO$), Beryllium hydroxide ($Be(OH)_2$), and Aluminium oxide ($Al_2O_3$) are all amphoteric compounds capable of reacting with both acids and strong bases to form salts.',
    topic: 'Amphoteric Oxides and Hydroxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 117,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is incorrect?',
    options: [
      'Acidic nature of oxide of elements of third period increases from left to right',
      'Acidic nature of hydracids increases from top to bottom in a group of periodic table',
      'Acidic nature of hydracids of element from carbon to fluorine increases',
      'For an atom van der Waals radius > covalent radius > metallic radius'
    ],
    correct_index: 3,
    solution: 'For any given element, the correct order of radii is: $\\text{van der Waals radius} > \\text{metallic radius} > \\text{covalent radius}$. Covalent bonding involves orbital overlap which pulls the nuclei closer together, making the covalent radius strictly smaller than the metallic radius. Statement (4) is incorrect.',
    topic: 'Comparison of van der Waals, Metallic and Covalent Radii',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 118,
    question_type: 'single_choice',
    question_text: 'The anomalous behaviour of the first member of each group of representative elements in periodic table is due to',
    options: [
      'High electronegativity',
      'Non-availability of $d$-orbitals in their valence shell',
      'High charge/radius ratio',
      'All of these'
    ],
    correct_index: 3,
    solution: 'The first member of each group ($p$-block elements of Period 2: B, C, N, O, F) differs significantly from heavier congeners due to: (i) very small size and high charge/radius ratio, (ii) high ionization enthalpy and high electronegativity, and (iii) absence of low-lying $d$-orbitals which limits their maximum covalency to 4. Hence, all of these reasons are responsible.',
    topic: 'Anomalous Properties of Second Period Elements',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 119,
    question_type: 'single_choice',
    question_text: 'Which of the pair of oxides is neutral?',
    options: [
      '$CO$ and $CO_2$',
      '$SO_2$ and $N_2O$',
      '$NO$ and $N_2O$',
      '$N_2O$ and $CO_2$'
    ],
    correct_index: 2,
    solution: 'Nitric oxide ($NO$) and nitrous oxide ($N_2O$) (along with carbon monoxide $CO$) do not exhibit either acidic or basic properties in aqueous medium and are neutral oxides.',
    topic: 'Identification of Neutral Non-Metal Oxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 120,
    question_type: 'single_choice',
    question_text: 'The non-transition metals exhibit variable valency due to',
    options: [
      'Unstable core configuration',
      '$d-d$ transition',
      'Poor screening effect of $d$ and $f$ electrons',
      'Small size'
    ],
    correct_index: 2,
    solution: 'Heavier $p$-block non-transition metals (such as $Tl, Pb, Bi$) exhibit variable valency differing by 2 units (e.g. $Pb^{2+}/Pb^{4+}, Tl^+/Tl^{3+}$) due to the inert pair effect. The intervening $d$ and $f$ electrons provide poor screening of the nuclear charge, causing the outermost $ns^2$ pair to be held tightly by the nucleus and remain unshared.',
    topic: 'Inert Pair Effect in Heavier p-Block Elements',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 121,
    question_type: 'single_choice',
    question_text: 'Which of the following will have highest $2^{\\text{nd}}$ ionization enthalpy, if the outermost electronic configuration is given below?',
    options: [
      '$2p^4$',
      '$2p^3$',
      '$2p^2$',
      '$3p^1$'
    ],
    correct_index: 0,
    solution: 'An atom with valence configuration $2p^4$ (Oxygen) loses its first electron to form a monocation with a half-filled $2p^3$ subshell. Because a half-filled $p$-subshell has extra stability and maximum exchange energy, removing a second electron from $2p^3$ requires the highest energy.',
    topic: 'Second Ionization Enthalpy from Configuration',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 122,
    question_type: 'single_choice',
    question_text: 'General outer electronic configuration of actinoids and its period are',
    options: [
      '$(n-2)f^{1-14} (n-1)d^{0-2} ns^2$, $n=5$ and 6 period',
      '$(n-2)f^{1-14} (n-1)d^{0-2} ns^2$, $n=6$ and 7 period',
      '$(n-2)f^{1-14} (n-1)d^{0-2} ns^2$, $n=7$ and 7 period',
      '$(n-2)f^{1-14} (n-1)d^{0-1} ns^2$, $n=7$ and 7 period'
    ],
    correct_index: 2,
    solution: 'Actinoids belong to Period 7 ($n=7$) and involve progressive filling of the $5f$ subshell. Their general outer electronic configuration is $(n-2)f^{1-14} (n-1)d^{0-2} ns^2$ with $n=7$ (specifically $5f^{1-14} 6d^{0-2} 7s^2$), in the $7^{\\text{th}}$ period.',
    topic: 'General Electronic Configuration of Actinides',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 123,
    question_type: 'single_choice',
    question_text: 'Correct order of electron affinity is shown by',
    options: [
      '$O > S > F > Cl$',
      '$O > F > S > Cl$',
      '$Cl > F > S > O$',
      '$F > O > Cl > S$'
    ],
    correct_index: 2,
    solution: 'The electron gain enthalpies of halogens and chalcogens are: $Cl (-349\\text{ kJ/mol}) > F (-328\\text{ kJ/mol}) > S (-200\\text{ kJ/mol}) > O (-141\\text{ kJ/mol})$. Thus, the correct sequence in terms of magnitude of electron affinity is $Cl > F > S > O$.',
    topic: 'Comparative Electron Affinity Across Groups 16 and 17',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 124,
    question_type: 'single_choice',
    question_text: 'The chemical formula of the most stable chloride of the element M will be given by which of the following, if the IUPAC name of M is ununquadium?',
    options: [
      'MCl',
      '$MCl_2$',
      '$MCl_3$',
      '$MCl_4$'
    ],
    correct_index: 1,
    solution: 'Ununquadium ($Z = 114$, Flerovium) belongs to Group 14 beneath Lead ($Pb$). Due to the strong relativistic stabilization and inert pair effect of the $7s^2$ electrons in heavy elements, the $+2$ oxidation state is much more stable than the $+4$ oxidation state. Therefore, the most stable chloride is $MCl_2$.',
    topic: 'Stability of Lower Oxidation States and Superheavy Halides',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 125,
    question_type: 'single_choice',
    question_text: 'Which of the following process is endothermic in nature?\nA. $Al^{2+} \\rightarrow Al^{3+}$\nB. $Cl \\rightarrow Cl^-$\nC. $N \\rightarrow N^-$\nD. $O^- \\rightarrow O^{2-}$\nE. $H \\rightarrow H^+$',
    options: [
      'A, E',
      'A, D, E',
      'A, C, D, E',
      'A, B, C, D, E'
    ],
    correct_index: 2,
    solution: '- A and E are ionizations, which are always endothermic (require energy).\n- B ($Cl + e^- \\rightarrow Cl^-$) has a highly negative electron gain enthalpy (exothermic).\n- C ($N + e^- \\rightarrow N^-$) is endothermic because adding an electron disrupts the stable half-filled $2p^3$ subshell.\n- D ($O^- + e^- \\rightarrow O^{2-}$) is endothermic due to strong electrostatic repulsion between the negative ion and the incoming electron.\nThus, A, C, D, and E are endothermic.',
    topic: 'Thermodynamics of Ionization and Electron Gain',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 126,
    question_type: 'single_choice',
    question_text: 'Which of the following sets is mismatched regarding the nature of oxides?',
    options: [
      'Neutral oxide — $CO, NO, N_2O$',
      'Amphoteric oxide — $BeO, As_2O_3$',
      'Acidic oxide — $Cl_2O_7, SiO_2$',
      'Basic oxide — $BaO, Na_2O_2$'
    ],
    correct_index: 3,
    solution: '$Na_2O_2$ is a peroxide which hydrolyzes in water to give $NaOH$ and $H_2O_2$ (a weak acid), making its classification as a typical simple basic oxide mismatched compared to the classic basic oxides like $Na_2O$ or $BaO$.',
    topic: 'Oxide Classification Mismatch',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 127,
    question_type: 'single_choice',
    question_text: 'Maximum number of elements that can be accommodated in the periodic table according to the format of modern periodic table is',
    options: [
      '108',
      '118',
      '120',
      '150'
    ],
    correct_index: 1,
    solution: 'The modern 18-column long-form periodic table consists of 7 completed periods accommodating up to element $Z = 118$ (Oganesson), where the $7p$ subshell is fully filled.',
    topic: 'Format and Total Capacity of Modern Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 128,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is incorrect?',
    options: [
      'In a period noble gases has maximum radii',
      'Successive ionization enthalpy is always higher',
      'Ionic radius of $Na^+$ is larger than that of atomic radius of sodium',
      'As, Sb, Te are semi-metals'
    ],
    correct_index: 2,
    solution: 'When a sodium atom ($Na$) loses its valence electron to form $Na^+$, the whole $n=3$ shell is discarded and the effective nuclear charge on the remaining 10 electrons increases from $+11/11$ to $+11/10$. Consequently, the ionic radius of $Na^+$ ($102\\text{ pm}$) is significantly smaller than the atomic radius of $Na$ ($186\\text{ pm}$). Statement (3) is incorrect.',
    topic: 'Atomic vs Cationic Radii',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 129,
    question_type: 'single_choice',
    question_text: 'The smallest size among the following is of',
    options: [
      '$N^{3-}$',
      '$O^{2-}$',
      '$F^-$',
      '$Na^+$'
    ],
    correct_index: 3,
    solution: 'The four species ($N^{3-}, O^{2-}, F^-, Na^+$) are isoelectronic with 10 electrons. As the nuclear charge increases ($Z = 7, 8, 9, 11$), the electrostatic attraction pulls the electrons closer to the nucleus. Sodium cation ($Na^+, Z=11$) has the highest nuclear charge and smallest ionic size ($102\\text{ pm}$).',
    topic: 'Smallest Ion in an Isoelectronic Series',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 130,
    question_type: 'single_choice',
    question_text: 'If ionization enthalpy of potassium is $z\\text{ kJ/mol}$, then energy required in eV to convert $3.9\\text{ g}$ of K to $K^+$ is',
    options: [
      '$z \\times 1.6 \\times 10^{-19}$',
      '$\\frac{z}{1.6 \\times 10^{-19}}$',
      '$\\frac{z}{1.6 \\times 10^{-16}}$',
      '$z \\times 1.6 \\times 10^{-16}$'
    ],
    correct_index: 2,
    solution: 'Moles of Potassium = $\\frac{3.9\\text{ g}}{39\\text{ g/mol}} = 0.1\\text{ mol}$.\nTotal energy required in Joules = $0.1 \\times z\\text{ kJ} = 0.1 \\times 1000 z\\text{ J} = 100 z\\text{ J}$.\nConverting Joules to eV ($1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}$):\n$\\text{Energy} = \\frac{100 z}{1.6 \\times 10^{-19}} = \\frac{z}{1.6 \\times 10^{-16}}\\text{ eV}$.',
    topic: 'Conversion of Ionization Enthalpy to Electron Volts',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 131,
    question_type: 'single_choice',
    question_text: 'In Mendeleev\'s periodic table, in group-8 the element placed in each row are',
    options: [
      'Fe, Co, Ni',
      'Ru, Rh, Pd',
      'Os, Ir, Pt',
      'All of these'
    ],
    correct_index: 3,
    solution: 'In Mendeleev\'s periodic table, Group VIII contained transition metal triads placed together in groups of three in each series: Fe, Co, Ni in the fourth period; Ru, Rh, Pd in the fifth period; and Os, Ir, Pt in the sixth period. Thus, all of these are present in Group VIII.',
    topic: 'Group VIII Triads in Mendeleev Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 132,
    question_type: 'single_choice',
    question_text: 'The $IP_1, IP_2, IP_3, IP_4$ and $IP_5$ of an element are $7.1, 14.3, 34.5, 46.8, 162.2\\text{ eV}$ respectively. The element is likely to be',
    options: [
      'Ca',
      'Si',
      'F',
      'Na'
    ],
    correct_index: 1,
    solution: 'The ionization potential values show a dramatic leap between the fourth ($46.8\\text{ eV}$) and fifth ($162.2\\text{ eV}$) ionization potentials. This proves the element has four valence electrons in its outer shell; removing the fifth requires disrupting the stable inner core. Hence, the element is Silicon ($Si$).',
    topic: 'Successive Ionization Potential and Periodic Group',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 133,
    question_type: 'single_choice',
    question_text: 'Electronegativity of the element (A) is $E_1$ and I.P. is $E_2$. Hence $E_A$ will be',
    options: [
      '$2E_1 - E_2$',
      '$E_1 - 2E_2$',
      '$\\frac{E_1 + E_2}{2}$',
      '$\\frac{E_1 - E_2}{2}$'
    ],
    correct_index: 0,
    solution: 'According to the Mulliken scale of electronegativity, the electronegativity $\\chi$ is defined as the arithmetic mean of ionization potential ($IP$) and electron affinity ($EA$):\n$\\chi = \\frac{IP + EA}{2} \\implies E_1 = \\frac{E_2 + E_A}{2} \\implies 2E_1 = E_2 + E_A \\implies E_A = 2E_1 - E_2$.',
    topic: 'Mulliken Scale Equation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 134,
    question_type: 'single_choice',
    question_text: 'Ionisation energy of Na atom will be numerically equal to',
    options: [
      'Electron gain enthalpy of $Na^+$ ion',
      'Electron gain enthalpy of Na atom',
      'Ionisation energy of $Na^+$ ion',
      'Both (1) & (2)'
    ],
    correct_index: 0,
    solution: 'The ionization energy of sodium corresponds to: $Na(g) \\rightarrow Na^+(g) + e^-, \\Delta H = IE(Na)$. The electron gain enthalpy of the sodium cation corresponds to the exact reverse process: $Na^+(g) + e^- \\rightarrow Na(g), \\Delta H = \\Delta H_{\\text{eg}}(Na^+)$. Therefore, the magnitudes are numerically identical.',
    topic: 'Relation Between IE of Atom and Electron Gain Enthalpy of Cation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 135,
    question_type: 'single_choice',
    question_text: 'If the ionic radii of $K^+$ and $F^-$ are nearly the same (i.e., $1.34\\text{ Å}$), then the atomic radii of K and F respectively are',
    options: [
      '$1.34\\text{ Å}, 1.34\\text{ Å}$',
      '$0.67\\text{ Å}, 1.99\\text{ Å}$',
      '$1.99\\text{ Å}, 0.67\\text{ Å}$',
      '$1.99\\text{ Å}, 1.34\\text{ Å}$'
    ],
    correct_index: 2,
    solution: 'A neutral metallic atom is always larger than its cation ($r(K) > r(K^+) = 1.34\\text{ Å}$), and a neutral non-metallic atom is always smaller than its anion ($r(F) < r(F^-) = 1.34\\text{ Å}$). Therefore, the atomic radius of K must be $> 1.34\\text{ Å}$ (i.e., $1.99\\text{ Å}$) and that of F must be $< 1.34\\text{ Å}$ (i.e., $0.67\\text{ Å}$).',
    topic: 'Atomic vs Ionic Radii Estimation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 136,
    question_type: 'single_choice',
    question_text: 'Electronegativity on Pauling scale is based on',
    options: [
      'Bond length',
      'Bond energy',
      'Atomic radius',
      'Covalent radius'
    ],
    correct_index: 1,
    solution: 'Linus Pauling based his electronegativity scale on thermochemical bond dissociation energies. The difference in electronegativity between two atoms A and B is calculated from the resonance ionic bond stabilization energy: $|X_A - X_B| = 0.208\\sqrt{\\Delta}$, where $\\Delta = E_{A-B} - \\sqrt{E_{A-A} \\cdot E_{B-B}}$.',
    topic: 'Basis of Pauling Electronegativity Scale',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 137,
    question_type: 'single_choice',
    question_text: 'Zinc, cadmium, mercury belong to which group of periodic table?',
    options: [
      '10',
      '11',
      '12',
      '13'
    ],
    correct_index: 2,
    solution: 'Zinc ($Zn$), Cadmium ($Cd$), and Mercury ($Hg$) have the general electronic configuration $(n-1)d^{10} ns^2$, possessing fully filled $d$-orbitals in both their ground states and common oxidation states. They occupy Group 12 of the periodic table.',
    topic: 'Group 12 Elements',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 138,
    question_type: 'single_choice',
    question_text: 'The ionisation energy will be maximum for the process',
    options: [
      '$Ba \\rightarrow Ba^{2+}$',
      '$Be \\rightarrow Be^{2+}$',
      '$Cs \\rightarrow Cs^+$',
      '$Li \\rightarrow Li^+$'
    ],
    correct_index: 1,
    solution: 'Beryllium has the smallest atomic radius and highest effective nuclear charge among the alkaline earth metals. Removing two electrons requires $IE_1 + IE_2 = 899 + 1757 = 2656\\text{ kJ/mol}$, which is significantly higher than that for Barium ($503 + 965 = 1468\\text{ kJ/mol}$) or alkali metal single ionizations ($Cs = 376\\text{ kJ/mol}, Li = 520\\text{ kJ/mol}$).',
    topic: 'Comparative Total Ionization Energy',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 139,
    question_type: 'single_choice',
    question_text: 'Which one of the following pairs of elements has same number of electrons in their outermost shell?',
    options: [
      'Al, Tl',
      'Si, Pb',
      'As, Bi',
      'All of these'
    ],
    correct_index: 3,
    solution: 'Elements belonging to the same vertical group of the periodic table possess identical valence shell electronic configurations:\n- Al and Tl belong to Group 13 (3 valence electrons: $ns^2 np^1$).\n- Si and Pb belong to Group 14 (4 valence electrons: $ns^2 np^2$).\n- As and Bi belong to Group 15 (5 valence electrons: $ns^2 np^3$).\nTherefore, all of these pairs have the same number of outermost electrons.',
    topic: 'Valence Electron Periodicity in Groups',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 140,
    question_type: 'single_choice',
    question_text: 'The possible electronic configuration of the atom having maximum difference in first and second ionisation energies is',
    options: [
      '$1s^2 2s^2 2p^6 3s^1$',
      '$1s^2 2s^2 2p^6 3s^2$',
      '$1s^2 2s^2 2p^6 3s^2 3p^1$',
      '$1s^2 2s^2 2p^6 3s^2 3p^2$'
    ],
    correct_index: 0,
    solution: 'An element with configuration $1s^2 2s^2 2p^6 3s^1$ (Sodium) has a low first ionization energy ($496\\text{ kJ/mol}$) as it readily loses its single $3s$ electron to attain a noble-gas octet ($[Ne]$). Its second ionization requires removing an electron from the completely filled $2p^6$ noble-gas shell ($4562\\text{ kJ/mol}$). The difference $IE_2 - IE_1 = 4066\\text{ kJ/mol}$ is vastly larger than for any other configuration.',
    topic: 'Maximum Difference in Successive Ionization Energies',
    difficulty: 'easy',
    marks: 4
  }
];

