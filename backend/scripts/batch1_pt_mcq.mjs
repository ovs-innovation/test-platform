// Batch 1: Periodic Table MCQs (Q1 to Q35)
export const batch1Questions = [
  {
    serialNumber: 1,
    question_type: 'single_choice',
    question_text: '$\\sqrt{\\nu} = a(Z - b)$ is a Moseley equation where $\\nu$ is the frequency of X-ray produced, $Z = \\text{atomic number}$ and $a, b = \\text{constant}$. The $\\sqrt{\\nu}$ vs $Z$ graph of Moseley equation is',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793441345/edvedum_chemistry/periodic_table/pt_q1.png',
    options: [
      'Graph (1)',
      'Graph (2)',
      'Graph (3)',
      'Graph (4)'
    ],
    correct_index: 2,
    solution: 'Moseley\'s equation is $\\sqrt{\\nu} = a(Z - b) = aZ - ab$. Comparing with $y = mx + c$, the slope $m = a > 0$ and the intercept on the $Z$-axis occurs when $\\sqrt{\\nu} = 0$, giving $Z = b$. Thus, the graph is a straight line having a positive slope with a positive intercept $b$ on the $Z$-axis, matching Graph (3).',
    topic: 'Moseley Equation and Modern Periodic Law',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 2,
    question_type: 'single_choice',
    question_text: '$F^-, Na^+, Mg^{2+}$ are isoelectronic species. Which one is correct?',
    options: [
      'All have same size',
      '$Mg^{2+}$ have minimum effective nuclear charge',
      '$F^-$ have smallest size',
      '$Mg^{2+}$ have maximum effective nuclear charge'
    ],
    correct_index: 3,
    solution: 'For isoelectronic species, the number of electrons is the same (10 electrons for $F^-, Na^+, Mg^{2+}$). The effective nuclear charge ($Z_{\\text{eff}}$) increases with increasing atomic number ($Z$): $F (Z=9) < Na (Z=11) < Mg (Z=12)$. Hence, $Mg^{2+}$ has the highest nuclear charge ($Z=12$), pulls electrons most strongly, and has the maximum effective nuclear charge and smallest ionic size.',
    topic: 'Isoelectronic Species and Ionic Radii',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 3,
    question_type: 'single_choice',
    question_text: 'Nb belongs to $5^{\\text{th}}$ period while Ta belongs to $6^{\\text{th}}$ period. Which one is correct?',
    options: [
      'Size of Ta is greater than the size of Nb',
      'Size of Nb is greater than the size of Ta',
      'Both have almost equal size',
      'Nb belongs to d-block element while Ta belongs to f-block element'
    ],
    correct_index: 2,
    solution: 'Due to the lanthanide contraction (poor shielding of the intervening $4f$ electrons in the $6^{\\text{th}}$ period), the atomic radii of $4d$ and $5d$ transition elements of the same group are virtually identical. Hence, Nb ($4d$) and Ta ($5d$) have almost identical atomic and ionic radii.',
    topic: 'Lanthanide Contraction',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 4,
    question_type: 'single_choice',
    question_text: 'Which one is not endothermic reaction?',
    options: [
      '$O^- + e^- \\rightarrow O^{2-}$',
      '$O^+ \\rightarrow O^{2+} + e^-$',
      '$O + e^- \\rightarrow O^-$',
      '$O \\rightarrow O^+ + e^-$'
    ],
    correct_index: 2,
    solution: 'The first electron gain enthalpy of oxygen ($O + e^- \\rightarrow O^-$) is exothermic (energy is released, $\\Delta H_{\\text{eg}} = -141\\text{ kJ/mol}$). In contrast, the second electron gain enthalpy ($O^- + e^- \\rightarrow O^{2-}$) is endothermic due to inter-electronic repulsion, and all ionization steps ($O \\rightarrow O^+ + e^-$ and $O^+ \\rightarrow O^{2+} + e^-$) require energy and are endothermic.',
    topic: 'Electron Gain Enthalpy and Ionization Enthalpy',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 5,
    question_type: 'single_choice',
    question_text: 'Some neutral atoms have electronic configuration as follows:\n$A = 1s^2 2s^2 2p^1$\n$B = 1s^2 2s^2$\n$C = 1s^2 2s^2 2p^6 3s^1$\n$D = 1s^2 2s^2 2p^3$\nIn which of these electronic configuration would you expect to have lowest $1^{\\text{st}}$ IP?',
    options: [
      'A',
      'B',
      'C',
      'D'
    ],
    correct_index: 2,
    solution: 'Configuration $C$ corresponds to Sodium ($1s^2 2s^2 2p^6 3s^1$), an alkali metal in the $3^{\\text{rd}}$ period. It has the largest principal quantum number ($n=3$), largest atomic radius, and maximum shielding of the single valence electron from the nucleus, resulting in the lowest first ionization potential among the given elements.',
    topic: 'Periodic Trends in Ionization Potential',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 6,
    question_type: 'single_choice',
    question_text: 'Order of $1^{\\text{st}}$ IE of elements of second period is',
    options: [
      '$Li < Be < B < C < N < O < F$',
      '$Li < B < Be < C < O < N < F$',
      '$Be < Li < B < C < N < O < F$',
      '$Be < Li < C < B < N < F < O$'
    ],
    correct_index: 1,
    solution: 'Across the second period, ionization energy generally increases with effective nuclear charge, with two notable exceptions:\n1. $Be (2s^2) > B (2s^2 2p^1)$ because removing an electron from a fully filled $2s$ subshell requires more energy than removing a $2p$ electron.\n2. $N (2s^2 2p^3) > O (2s^2 2p^4)$ because $N$ has an extra-stable half-filled $2p$ subshell.\nThus, the correct order is: $Li < B < Be < C < O < N < F$.',
    topic: 'Ionization Enthalpy Anomalies in Period 2',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 7,
    question_type: 'single_choice',
    question_text: 'In Pauling\'s scale the electronegativity values of two elements A and B are found to be 3.0 and 0.7 respectively. Calculate percentage ionic character of compound formed.',
    options: [
      '55.3%',
      '60%',
      '75%',
      '20.2%'
    ],
    correct_index: 0,
    solution: 'According to Hannay-Smith equation:\n$\\% \\text{ ionic character} = 16|X_A - X_B| + 3.5|X_A - X_B|^2$.\nHere, $|X_A - X_B| = 3.0 - 0.7 = 2.3$.\n$\\% \\text{ ionic character} = 16(2.3) + 3.5(2.3)^2 = 36.8 + 3.5(5.29) = 36.8 + 18.515 = 55.315\\% \\approx 55.3\\%$.',
    topic: 'Electronegativity Difference and Percentage Ionic Character',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 8,
    question_type: 'single_choice',
    question_text: 'The electronegativity of the following elements increases in the order',
    options: [
      '$Si < P < C < N$',
      '$N < Si < C < P$',
      '$P < Si < N < C$',
      '$C < N < Si < P$'
    ],
    correct_index: 0,
    solution: 'On the Pauling scale, the electronegativity values are:\n$Si = 1.8$, $P = 2.1$, $C = 2.5$, $N = 3.0$.\nTherefore, the correct increasing order of electronegativity is $Si < P < C < N$.',
    topic: 'Electronegativity Trends in Groups 14 and 15',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 9,
    question_type: 'single_choice',
    question_text: 'Find the group and period in periodic table of element having atomic number 29',
    options: [
      '11, 3',
      '12, 4',
      '11, 4',
      '12, 3'
    ],
    correct_index: 2,
    solution: 'The element with atomic number $Z = 29$ is Copper ($Cu$). Its electronic configuration is $[Ar] 3d^{10} 4s^1$. The principal quantum number of the outermost shell is $n=4$, so it belongs to Period 4. The group number for a $d$-block element is given by $(n-1)d + ns = 10 + 1 = 11$. Thus, Group = 11, Period = 4.',
    topic: 'Group and Period Identification in Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 10,
    question_type: 'single_choice',
    question_text: 'Effective nuclear charge is increased on going from',
    options: [
      'Li to Na',
      'Na to K',
      'K to Rb',
      'Rb to Cs'
    ],
    correct_index: 0,
    solution: 'According to Slater\'s rules, $Z_{\\text{eff}}$ for Li valence electron is $Z - \\sigma = 3 - (2 \\times 0.85) = 1.30$. For Na, $Z_{\\text{eff}} = 11 - (8 \\times 0.85 + 2 \\times 1.0) = 11 - 8.8 = 2.20$. Beyond Na, down group 1, $Z_{\\text{eff}}$ remains nearly constant ($2.20$), so effective nuclear charge increases notably on moving from Li to Na.',
    topic: 'Effective Nuclear Charge Trends Down a Group',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 11,
    question_type: 'single_choice',
    question_text: 'Select the van der Waals radii that is the largest',
    options: [
      'Ne',
      'Ar',
      'Kr',
      'Rn'
    ],
    correct_index: 3,
    solution: 'Down a group of noble gases, the number of electron shells increases successively ($n=2$ for Ne up to $n=6$ for Rn). Consequently, the van der Waals radius increases steadily down the group, making Radon (Rn) have the largest van der Waals radius.',
    topic: 'van der Waals Radii of Noble Gases',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 12,
    question_type: 'single_choice',
    question_text: 'Due to lanthanide contraction',
    options: [
      'Basic strength of hydroxides in lanthanides series decreases',
      'Basic strength of hydroxides in lanthanides series increases',
      'Basic strength of elements in lanthanides series remain constant',
      'Basic strength $1^{\\text{st}}$ decreases and then increases'
    ],
    correct_index: 0,
    solution: 'Due to lanthanide contraction, the size of $Ln^{3+}$ ions decreases steadily from $La^{3+}$ to $Lu^{3+}$. By Fajan\'s rules, smaller cation size increases the polarizing power, leading to increased covalent character in the $Ln-OH$ bond. As covalent character increases, the cleavage of the $Ln-OH$ bond to release $OH^-$ ions becomes more difficult; thus, the basic strength of lanthanide hydroxides decreases from $La(OH)_3$ to $Lu(OH)_3$.',
    topic: 'Lanthanide Contraction and Basic Strength of Hydroxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 13,
    question_type: 'single_choice',
    question_text: '$1^{\\text{st}}$ IP of elements of Boron family is',
    options: [
      '$B > Al > Ga > In > Tl$',
      '$B > Al > Ga < In < Tl$',
      '$B > Tl > Ga > Al > In$',
      '$B > Tl > In > Ga > Al$'
    ],
    correct_index: 2,
    solution: 'The first ionization enthalpy trend in Group 13 shows anomalous variations due to poor shielding by $3d$ electrons in Ga and $4f$ electrons in Tl (lanthanide contraction). As a result, the order of $1^{\\text{st}}$ IE is: $B > Tl > Ga > Al > In$.',
    topic: 'Ionization Enthalpy of Boron Family',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 14,
    question_type: 'single_choice',
    question_text: 'From graph which is correct?',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793441346/edvedum_chemistry/periodic_table/pt_q14.png',
    options: [
      'Element A is Boron',
      'Element C is Argon',
      'Element D is Sulphur',
      'Element B is Oxygen'
    ],
    correct_index: 1,
    solution: 'The graph plots first ionization potential vs atomic number for $2^{\\text{nd}}$ and $3^{\\text{rd}}$ period elements. The sharp peaks correspond to noble gases with stable octets ($Ne$ at peak B and $Ar$ at peak C). Thus, Element C corresponds to Argon.',
    topic: 'Ionization Energy Curves of Period 2 and 3 Elements',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 15,
    question_type: 'single_choice',
    question_text: 'Select the one that has highest value of $2^{\\text{nd}}$ IP of given element',
    options: [
      '$1s^2 2s^2 2p^6 3s^1$',
      '$1s^2 2s^2 2p^6 3s^2$',
      '$1s^2 2s^2 2p^4$',
      '$1s^2 2s^1$'
    ],
    correct_index: 3,
    solution: 'For Lithium ($1s^2 2s^1$), after removal of the first electron, the $Li^+$ ion achieves the ultra-stable, noble-gas electronic configuration of helium ($1s^2$) with $n=1$. Removing a second electron from the tightly bound $1s^2$ shell requires an immense amount of energy ($5248\\text{ kJ/mol}$), making its $2^{\\text{nd}}$ IP exceptionally high—the highest among the options.',
    topic: 'Second Ionization Potential Extremes',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 16,
    question_type: 'single_choice',
    question_text: 'The element of $3^{\\text{rd}}$ period that has highest electron affinity is',
    options: [
      'S',
      'P',
      'Cl',
      'Si'
    ],
    correct_index: 2,
    solution: 'Chlorine ($Cl$) in the $3^{\\text{rd}}$ period has the highest electron affinity in the entire periodic table ($-349\\text{ kJ/mol}$) because its $3p$ subshell has larger volume and lower inter-electronic repulsion compared to Fluorine\'s compact $2p$ subshell.',
    topic: 'Electron Affinity in Period 3',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 17,
    question_type: 'single_choice',
    question_text: 'According to Allred and Rochow\'s scale, slope of the following graph is given as ($E_A$ vs $\\frac{Z_{\\text{eff}}}{r^2}$):',
    image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793441347/edvedum_chemistry/periodic_table/pt_q17.png',
    options: [
      '0.744',
      '0.359',
      '7.44',
      '74.5'
    ],
    correct_index: 1,
    solution: 'The Allred-Rochow electronegativity equation is:\n$\\chi_{\\text{AR}} = 0.359 \\left(\\frac{Z_{\\text{eff}}}{r^2}\\right) + 0.744$.\nPlotting $\\chi_{\\text{AR}}$ against $\\frac{Z_{\\text{eff}}}{r^2}$ yields a straight line with slope $= 0.359$ and $y$-intercept $= 0.744$. Thus, the slope is $0.359$.',
    topic: 'Allred-Rochow Scale of Electronegativity',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 18,
    question_type: 'single_choice',
    question_text: 'Select the order that is correct regarding the increasing order of electronegativity',
    options: [
      '$M^{3+} < M^{2+} < M^+ < M$',
      '$M < M^+ < M^{2+} < M^{3+}$',
      '$M^{2+} < M^{3+} < M^+ < M$',
      '$M < M^{3+} < M^{2+} < M^+$'
    ],
    correct_index: 1,
    solution: 'As the positive oxidation state of an element increases ($M \\rightarrow M^+ \\rightarrow M^{2+} \\rightarrow M^{3+}$), the effective nuclear charge increases and the atomic/ionic radius decreases. Consequently, the tendency to attract shared electrons increases with oxidation number. Thus, the increasing order of electronegativity is $M < M^+ < M^{2+} < M^{3+}$.',
    topic: 'Dependence of Electronegativity on Oxidation State',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 19,
    question_type: 'single_choice',
    question_text: 'Which of the following ion is largest in size?',
    options: [
      '$N^{3-}$',
      '$O^{2-}$',
      '$Al^{3+}$',
      '$Mg^{2+}$'
    ],
    correct_index: 0,
    solution: 'All four species ($N^{3-}, O^{2-}, Mg^{2+}, Al^{3+}$) are isoelectronic with 10 electrons. For isoelectronic ions, ionic radius decreases as nuclear charge $Z$ increases. $N^{3-}$ has the lowest nuclear charge ($Z = 7$), resulting in the minimum electron-nucleus attraction and largest size.',
    topic: 'Size Comparison of Isoelectronic Anions and Cations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 20,
    question_type: 'single_choice',
    question_text: 'In which of the following options both pair of elements have more or less, same atomic radius?',
    options: [
      'Cl and Li',
      'O and N',
      'Zr and Hf',
      'Yb and Ce'
    ],
    correct_index: 2,
    solution: 'Zirconium (Zr, $4d$) and Hafnium (Hf, $5d$) belong to group 4. Due to the intervention of the $4f$ subshell in Hf (lanthanide contraction), the expected increase in atomic radius from $4d$ to $5d$ is completely compensated, resulting in almost identical atomic radii ($Zr \\approx 160\\text{ pm}, Hf \\approx 159\\text{ pm}$).',
    topic: 'Lanthanide Contraction in Group 4 Elements',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 21,
    question_type: 'single_choice',
    question_text: 'Select the correct order of I.E. among the following',
    options: [
      '$Li < Na < K$',
      '$K^+ > Ca^{2+}$',
      '$N < O$',
      '$He > Ne > Ar$'
    ],
    correct_index: 3,
    solution: 'Down a group of noble gases, atomic size increases and valence electrons are further from the nucleus, so ionization energy decreases: $He > Ne > Ar > Kr$. Thus option (4) is correct. (Options 1, 2, and 3 are incorrect since $Li > Na > K$, $Ca^{2+} > K^+$, and $N > O$).',
    topic: 'Periodic Trends in Ionization Energy',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 22,
    question_type: 'single_choice',
    question_text: 'Select from the following that has maximum negative electron gain enthalpy',
    options: [
      '$A(g) + e^- + 60\\text{ kJ} \\rightarrow A^-$',
      '$B(g) + e^- + 400\\text{ kJ} \\rightarrow B^-$',
      '$C(g) + e^- \\rightarrow C^- + 140\\text{ kJ}$',
      '$D(g) + e^- \\rightarrow D^- + 60\\text{ kJ}$'
    ],
    correct_index: 2,
    solution: 'A negative electron gain enthalpy corresponds to an exothermic process where energy is released upon electron addition ($X(g) + e^- \\rightarrow X^-(g) + \\text{Energy}$). Reaction C releases $140\\text{ kJ}$ ($\\Delta H_{\\text{eg}} = -140\\text{ kJ}$), which is the most negative electron gain enthalpy among the exothermic processes (reactions A and B are endothermic).',
    topic: 'Sign Convention for Electron Gain Enthalpy',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 23,
    question_type: 'single_choice',
    question_text: 'Position of Co in modern periodic table is',
    options: [
      '$\\text{Period} \\rightarrow 3^{\\text{rd}}, \\text{Group} \\rightarrow 9$',
      '$\\text{Period} \\rightarrow 4^{\\text{th}}, \\text{Group} \\rightarrow 9$',
      '$\\text{Period} \\rightarrow 4^{\\text{th}}, \\text{Group} \\rightarrow 2$',
      '$\\text{Period} \\rightarrow 3^{\\text{rd}}, \\text{Group} \\rightarrow 2$'
    ],
    correct_index: 1,
    solution: 'Cobalt (Co) has atomic number $Z = 27$ with electronic configuration $[Ar] 3d^7 4s^2$. The principal quantum number of valence electrons is $n=4$, so it is in Period 4. The group number is $7 + 2 = 9$. Thus, $\\text{Period} \\rightarrow 4^{\\text{th}}, \\text{Group} \\rightarrow 9$.',
    topic: 'Position of Transition Elements in Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 24,
    question_type: 'single_choice',
    question_text: 'Which one has minimum effective nuclear charge?',
    options: [
      'Li',
      'Na',
      'K',
      'Cs'
    ],
    correct_index: 0,
    solution: 'According to Slater\'s rules for alkali metals, the screening constant $\\sigma$ for Li ($1s^2 2s^1$) gives $Z_{\\text{eff}} = 3 - 2(0.85) = 1.30$. For heavier alkali metals (Na, K, Rb, Cs), $Z_{\\text{eff}} \\approx 2.20$. Hence, Lithium (Li) has the minimum effective nuclear charge.',
    topic: 'Slater\'s Rules for Effective Nuclear Charge',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 25,
    question_type: 'single_choice',
    question_text: 'Which of the following has minimum covalent radius?',
    options: [
      'B',
      'C',
      'N',
      'Be'
    ],
    correct_index: 2,
    solution: 'Across a period from left to right, effective nuclear charge increases while electrons enter the same principal energy level ($n=2$). As a result, atomic/covalent radius decreases across the second period: $Be > B > C > N$. Thus, Nitrogen (N) has the minimum covalent radius among the options.',
    topic: 'Covalent Radii Trends Across Period 2',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 26,
    question_type: 'single_choice',
    question_text: 'Which of the following elements have positive electron gain enthalpy?',
    options: [
      'He',
      'Be',
      'N',
      'All of these'
    ],
    correct_index: 3,
    solution: 'He has a completely filled shell ($1s^2$), Be has a fully filled subshell ($2s^2$), and N has an extra-stable half-filled subshell ($2s^2 2p^3$). In all three cases, adding an extra electron causes significant inter-electronic repulsion and destabilization, making the electron gain enthalpy positive (endothermic). Thus, all of these elements have positive $\\Delta H_{\\text{eg}}$.',
    topic: 'Elements with Positive Electron Gain Enthalpy',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 27,
    question_type: 'single_choice',
    question_text: 'An element ($Z = 112$) belongs to which period and which group?',
    options: [
      '$7^{\\text{th}}\\text{ period, } 12^{\\text{th}}\\text{ group}$',
      '$7^{\\text{th}}\\text{ period, } 10^{\\text{th}}\\text{ group}$',
      '$6^{\\text{th}}\\text{ period, } 12^{\\text{th}}\\text{ group}$',
      '$6^{\\text{th}}\\text{ period, } 9^{\\text{th}}\\text{ group}$'
    ],
    correct_index: 0,
    solution: 'Element $Z = 112$ is Copernicium (Cn). Its electronic configuration is $[Rn] 5f^{14} 6d^{10} 7s^2$. The highest principal quantum number is $n=7$, so it belongs to the $7^{\\text{th}}$ period. The group number for a $d$-block element is $(n-1)d + ns = 10 + 2 = 12$. Therefore, it belongs to the $7^{\\text{th}}$ period and $12^{\\text{th}}$ group.',
    topic: 'Superheavy Element Classification',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 28,
    question_type: 'single_choice',
    question_text: '$Al^{3+}$ has lower ionic radius than $Mg^{2+}$ ion because',
    options: [
      'Mg atom has less neutrons than Al',
      '$Al^{3+}$ has higher effective nuclear charge than $Mg^{2+}$',
      'Their electronegativities are different',
      'Al has lower ionization potential than Mg atom'
    ],
    correct_index: 1,
    solution: '$Al^{3+}$ and $Mg^{2+}$ are isoelectronic ions (both have 10 electrons). The atomic number of Al is 13, while that of Mg is 12. Because $Al^{3+}$ has a higher nuclear charge ($Z = 13$ vs $12$), its effective nuclear charge is greater, which pulls the 10 electrons closer to the nucleus, giving $Al^{3+}$ a smaller ionic radius.',
    topic: 'Isoelectronic Radii Comparison',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 29,
    question_type: 'single_choice',
    question_text: 'Which of the following is/are consequence(s) of Lanthanide contraction?',
    options: [
      'The sizes of the ions decreases across the $4f$ series',
      'The sizes of $4d$ and $5d$ series elements are almost the same',
      'Across the $4f$ series the basicity of hydroxides decreases',
      'All of these'
    ],
    correct_index: 3,
    solution: 'Lanthanide contraction results from the poor shielding of the $4f$ electrons. Its consequences include:\n1. Regular decrease in ionic radii of $Ln^{3+}$ across the series.\n2. Nearly identical atomic and ionic radii for $4d$ and $5d$ pairs (e.g. Zr/Hf, Nb/Ta, Mo/W).\n3. Decrease in basic strength of lanthanide hydroxides from $La(OH)_3$ to $Lu(OH)_3$.\nTherefore, all of these are consequences of lanthanide contraction.',
    topic: 'Consequences of Lanthanide Contraction',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 30,
    question_type: 'single_choice',
    question_text: 'The first ionisation potentials (eV) of Be and B are respectively',
    options: [
      '8.29 eV, 9.32 eV',
      '9.32 eV, 9.32 eV',
      '9.32 eV, 8.29 eV',
      '8.29 eV, 8.29 eV'
    ],
    correct_index: 2,
    solution: 'Beryllium has a completely filled $2s^2$ subshell which has high penetration power and exchange stability, whereas Boron ($2s^2 2p^1$) loses a less penetrating $2p$ electron to leave a filled $2s^2$ subshell. Consequently, the first ionization energy of Be ($9.32\\text{ eV}$) is higher than that of B ($8.29\\text{ eV}$).',
    topic: 'Ionization Potential Comparison of Be and B',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 31,
    question_type: 'single_choice',
    question_text: 'A sudden jump between the values of second and third ionisation energies of an element would be associated with the electronic configuration',
    options: [
      '$1s^2 2s^2 2p^6 3s^1$',
      '$1s^2 2s^2 2p^6 3s^2 3p^1$',
      '$1s^2 2s^2 2p^6 3s^2$',
      '$1s^2 2s^2 2p^6 3s^2 3p^2$'
    ],
    correct_index: 2,
    solution: 'A massive jump between the second ($IE_2$) and third ($IE_3$) ionization energies signifies that removing two electrons completely clears the valence shell, and removing the third electron requires disrupting an inner noble-gas core ($2p^6$). This is characteristic of an alkaline earth metal with configuration $1s^2 2s^2 2p^6 3s^2$ ($Mg$).',
    topic: 'Successive Ionization Enthalpies and Valence Electrons',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 32,
    question_type: 'single_choice',
    question_text: 'The correct order of second ionisation potential is',
    options: [
      '$IE_2(Mg) > IE_2(Al)$',
      '$IE_2(Na) > IE_2(Mg)$',
      '$IE_2(Al) > IE_2(Si)$',
      '$IE_2(N) > IE_2(O)$'
    ],
    correct_index: 1,
    solution: 'For Sodium ($Na$), the first electron removal leaves $Na^+$ with a stable noble gas configuration ($2p^6$). Removing a second electron from this stable octet requires breaking the closed shell ($IE_2 = 4562\\text{ kJ/mol}$). For Magnesium ($Mg$), $Mg^+$ has configuration $[Ne] 3s^1$, and removing the second electron yields a stable noble gas octet ($IE_2 = 1451\\text{ kJ/mol}$). Hence, $IE_2(Na) > IE_2(Mg)$.',
    topic: 'Second Ionization Energy Comparisons',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 33,
    question_type: 'single_choice',
    question_text: 'Of the following elements, which possess the highest electron affinity?',
    options: [
      'Te',
      'O',
      'S',
      'Se'
    ],
    correct_index: 2,
    solution: 'In Group 16 (chalcogens), Oxygen has an unusually low electron affinity ($-141\\text{ kJ/mol}$) compared to Sulphur ($-200\\text{ kJ/mol}$) due to the small, compact size of the $2p$ orbitals in Oxygen, which creates strong inter-electronic repulsions. Sulphur ($3p$) has larger orbitals with less repulsion; hence, Sulphur (S) possesses the highest electron affinity in the group.',
    topic: 'Electron Affinity Anomalies in Group 16',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 34,
    question_type: 'single_choice',
    question_text: 'Which of the following has highest $2^{\\text{nd}}$ IE?',
    options: [
      'Li',
      'Sc',
      'F',
      'N'
    ],
    correct_index: 0,
    solution: 'Lithium ($1s^2 2s^1$) forms $Li^+$ ($1s^2$, helium core) after losing its first electron. The second ionization involves removing an electron from the $1s$ orbital in extremely close proximity to the nucleus with an effective charge of $+3$. Its $2^{\\text{nd}}$ IE is $5248\\text{ kJ/mol}$, vastly higher than those of Sc, F, or N.',
    topic: 'Comparative Second Ionization Energy',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 35,
    question_type: 'single_choice',
    question_text: 'The most electronegative chlorine is present in',
    options: [
      '$HClO$',
      '$HClO_2$',
      '$HClO_3$',
      '$HClO_4$'
    ],
    correct_index: 3,
    solution: 'The oxidation state of Chlorine in its oxyacids is: $+1$ in $HClO$, $+3$ in $HClO_2$, $+5$ in $HClO_3$, and $+7$ in $HClO_4$. As the positive oxidation state of an atom increases, its effective nuclear charge increases and its electron-attracting power increases. Therefore, Chlorine has the highest electronegativity in $HClO_4$ ($+7$).',
    topic: 'Electronegativity Variation with Oxidation Number',
    difficulty: 'easy',
    marks: 4
  }
];

