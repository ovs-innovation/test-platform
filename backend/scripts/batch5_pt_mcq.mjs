// Batch 5: Periodic Table MCQs (Q141 to Q171)
export const batch5Questions = [
  {
    serialNumber: 141,
    question_type: 'single_choice',
    question_text: 'Which of the following has highest I.E.?',
    options: [
      'Sb',
      'P',
      'As',
      'Te'
    ],
    correct_index: 1,
    solution: 'In Group 15, ionization energy decreases down the group due to increasing atomic size and shielding effect: $N > P > As > Sb > Bi$. Phosphorus ($P$) has a first ionization energy of $1012\\text{ kJ/mol}$, which is significantly higher than that of $As$ ($947\\text{ kJ/mol}$), $Sb$ ($834\\text{ kJ/mol}$), or Group 16 element $Te$ ($869\\text{ kJ/mol}$).',
    topic: 'Ionization Enthalpy in Group 15',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 142,
    question_type: 'single_choice',
    question_text: 'Identify the electronic configuration of the most electropositive element among the following',
    options: [
      '$[Kr] 5s^1$',
      '$[Kr] 5s^2$',
      '$[Ar] 4s^1$',
      '$[Ar] 4s^2$'
    ],
    correct_index: 0,
    solution: 'Alkali metals ($ns^1$) are the most electropositive elements in the periodic table. Within Group 1, electropositive (metallic) character increases down the group as atomic radius expands and ionization enthalpy decreases: $Cs > Rb > K > Na > Li$. Configuration $[Kr] 5s^1$ corresponds to Rubidium ($Rb$), which is more electropositive than Potassium ($[Ar] 4s^1$).',
    topic: 'Electropositivity Trends in Alkali Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 143,
    question_type: 'single_choice',
    question_text: 'The set of atomic numbers representing chalcogens is',
    options: [
      '14, 32, 50',
      '16, 34, 52',
      '12, 20, 38',
      '15, 33, 51'
    ],
    correct_index: 1,
    solution: 'Chalcogens are the Group 16 elements: Oxygen ($Z = 8$), Sulphur ($Z = 16$), Selenium ($Z = 34$), Tellurium ($Z = 52$), and Polonium ($Z = 84$). Thus, the set containing 16, 34, and 52 represents chalcogens.',
    topic: 'Atomic Numbers of Chalcogens',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 144,
    question_type: 'single_choice',
    question_text: 'Which of the atom has lowest first ionization energy?',
    options: [
      '$ns^2 np^3$',
      '$ns^2 np^4$',
      '$ns^2 np^5$',
      '$ns^2 np^6$'
    ],
    correct_index: 1,
    solution: 'An atom with valence configuration $ns^2 np^4$ (Group 16) has one paired set of electrons in a $p$-orbital, causing inter-electronic repulsion. Removing one electron yields an extra-stable half-filled $ns^2 np^3$ subshell. Consequently, $IE_1$ of $np^4$ is lower than that of the half-filled $np^3$ (Group 15) and lower than the subsequent halogens ($np^5$) and noble gases ($np^6$).',
    topic: 'Lowest First Ionization Energy from Subshell Configurations',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 145,
    question_type: 'single_choice',
    question_text: 'An element (A) forms the oxide $A_2O_5$. (A) belongs to',
    options: [
      '13 group',
      '14 group',
      '15 group',
      '16 group'
    ],
    correct_index: 2,
    solution: 'In an oxide with formula $A_2O_5$, the oxidation state of element A is $+5$ (since oxygen is $-2$: $2x + 5(-2) = 0 \\implies x = +5$). Elements capable of exhibiting a maximum group oxidation state of $+5$ belong to Group 15 (e.g., $N_2O_5, P_2O_5, As_2O_5$).',
    topic: 'Group Number from Oxide Formula',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 146,
    question_type: 'single_choice',
    question_text: 'The maximum number of electrons which can be present in the outermost orbit of elements of third period of the periodic table is',
    options: [
      '7',
      '8',
      '10',
      '18'
    ],
    correct_index: 1,
    solution: 'According to the octet rule, the outermost (valence) shell of any main group element cannot contain more than 8 electrons ($ns^2 np^6$). In the third period, electrons fill the $3s$ and $3p$ orbitals, accommodating a maximum of $2 + 6 = 8$ valence electrons (argon).',
    topic: 'Maximum Capacity of Valence Shell in Period 3',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 147,
    question_type: 'single_choice',
    question_text: 'In third period, the most basic oxide is formed by',
    options: [
      'S',
      'P',
      'Na',
      'Mg'
    ],
    correct_index: 2,
    solution: 'Across a period from left to right, metallic character decreases and electropositive character diminishes. Sodium ($Na$) has the highest electropositivity and lowest ionization energy in the third period, so it forms sodium oxide ($Na_2O$), which is strongly basic and dissolves vigorously in water to form $NaOH$.',
    topic: 'Basic Strength of Period 3 Oxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 148,
    question_type: 'single_choice',
    question_text: 'Which pair of elements is chemically similar?',
    options: [
      'Li, Mg',
      'Be, Al',
      'B, Si',
      'All of these'
    ],
    correct_index: 3,
    solution: 'Elements of the second period display diagonal relationships with the elements of the third period positioned diagonally across from them due to comparable charge-to-size ratios: $Li$ resembles $Mg$, $Be$ resembles $Al$, and $B$ resembles $Si$. Thus, all of these pairs are chemically similar.',
    topic: 'Diagonal Relationships in the Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 149,
    question_type: 'single_choice',
    question_text: 'Among the following elements, least electronegative is',
    options: [
      'O',
      'F',
      'Cl',
      'S'
    ],
    correct_index: 3,
    solution: 'Electronegativity values on the Pauling scale are: $F (4.0) > O (3.5) > Cl (3.0) > S (2.58)$. Therefore, Sulphur (S) is the least electronegative among these four elements.',
    topic: 'Comparative Electronegativity of Non-Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 150,
    question_type: 'single_choice',
    question_text: 'The formula of the compound formed by $X [Ne] 3s^2 3p^3$ and $Y [He] 2s^2 2p^4$ is',
    options: [
      '$XY_2$',
      '$XY$',
      '$X_2Y_3$',
      '$XY_3$'
    ],
    correct_index: 2,
    solution: 'Element $X$ has configuration $[Ne] 3s^2 3p^3$ (Group 15, phosphorus), having 5 valence electrons and exhibiting a common valency of 3 ($8 - 5 = 3$). Element $Y$ has configuration $[He] 2s^2 2p^4$ (Group 16, oxygen), having 6 valence electrons and a valency of 2 ($8 - 6 = 2$). Combining element X (valency 3) with element Y (valency 2) gives the binary formula $X_2Y_3$.',
    topic: 'Chemical Formula from Electronic Configurations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 151,
    question_type: 'single_choice',
    question_text: 'The maximum tendency to form a tripositive ion lies with the element having the electronic configuration',
    options: [
      '$[Ne] 3s^2 3p^1$',
      '$[Ne] 3s^2 3p^2$',
      '$[Ne] 3s^2 3p^3$',
      '$[Ne] 3s^2$'
    ],
    correct_index: 0,
    solution: 'The configuration $[Ne] 3s^2 3p^1$ corresponds to Aluminium ($Al$). By losing its three valence electrons ($3s^2 3p^1$), Aluminium attains the extremely stable, noble-gas closed-shell configuration of Neon ($[Ne]$), forming the tripositive cation $Al^{3+}$. Hence, it has the maximum tendency to form a tripositive ion.',
    topic: 'Formation of Tripositive Cations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 152,
    question_type: 'single_choice',
    question_text: 'As compared to alkaline earth metals, alkali metals exhibit',
    options: [
      'Higher valency',
      'Higher reducing power',
      'Greater hardness',
      'All of these'
    ],
    correct_index: 1,
    solution: 'Alkali metals have lower ionization energies and more negative standard reduction potentials than alkaline earth metals, meaning they lose their single valence electron much more readily. Thus, alkali metals exhibit higher reducing power.',
    topic: 'Comparison of Alkali and Alkaline Earth Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 153,
    question_type: 'single_choice',
    question_text: 'Which pair of elements belongs to same group?',
    options: [
      'Element with atomic number 38 and 56',
      'Element with atomic number 29 and 46',
      'Element with atomic number 34 and 52',
      'Element with atomic number 18 and 35'
    ],
    correct_index: 0,
    solution: 'Element with atomic number $Z = 38$ is Strontium ($Sr$) and $Z = 56$ is Barium ($Ba$). Both possess the valence electron configuration $ns^2$ and belong to Group 2 (alkaline earth metals). (Also, elements 34 ($Se$) and 52 ($Te$) belong to Group 16; option 1 is the primary matching pair).',
    topic: 'Group Assignment from Atomic Numbers',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 154,
    question_type: 'single_choice',
    question_text: 'Identify the weakest oxidizing agent',
    options: [
      '$I_2$',
      '$Br_2$',
      '$Cl_2$',
      '$F_2$'
    ],
    correct_index: 0,
    solution: 'The standard electrode reduction potentials of halogens decrease down Group 17: $F_2 (+2.87\\text{ V}) > Cl_2 (+1.36\\text{ V}) > Br_2 (+1.09\\text{ V}) > I_2 (+0.54\\text{ V})$. A lower reduction potential indicates a weaker tendency to be reduced and gain electrons. Therefore, Iodine ($I_2$) is the weakest oxidizing agent.',
    topic: 'Oxidizing Power of Halogens',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 155,
    question_type: 'single_choice',
    question_text: 'The element which does not show variable oxidation is',
    options: [
      'In',
      'Ag',
      'Cr',
      'W'
    ],
    correct_index: 1,
    solution: 'Silver ($Ag$) predominantly exhibits only the $+1$ oxidation state in nearly all of its stable chemical compounds ($[Kr] 4d^{10} 5s^1 \\rightarrow Ag^+ [Kr] 4d^{10}$). Transition metals like Cr and W exhibit multiple oxidation states from $+2$ to $+6$, and In exhibits $+1$ and $+3$.',
    topic: 'Oxidation States of d and p Block Elements',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 156,
    question_type: 'single_choice',
    question_text: 'Among the following, choose the one which has high ionization enthalpy but positive electron gain enthalpy?',
    options: [
      'F',
      'Na',
      'He',
      'B'
    ],
    correct_index: 2,
    solution: 'Helium ($He$) has a completely filled $1s^2$ duplet configuration with electrons tightly bound directly to a nucleus of charge $+2$ with no inner shielding. This gives it the highest first ionization enthalpy in the periodic table ($2372\\text{ kJ/mol}$). Adding an extra electron requires placing it into the $2s$ subshell against significant repulsion, giving Helium a positive electron gain enthalpy ($+48\\text{ kJ/mol}$).',
    topic: 'Helium Electronic Characteristics and Thermodynamic Trends',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 157,
    question_type: 'single_choice',
    question_text: 'The atomic number of first man-made element is',
    options: [
      '43',
      '45',
      '41',
      '46'
    ],
    correct_index: 0,
    solution: 'The first artificially synthesized element in human history was Technetium ($Tc$), with atomic number $Z = 43$, produced by Carlo Perrier and Emilio Segrè in 1937 by bombarding molybdenum with deuterons.',
    topic: 'First Synthetic Element in Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 158,
    question_type: 'single_choice',
    question_text: 'The expected atomic number of seventh noble gas would be',
    options: [
      '113',
      '114',
      '118',
      '122'
    ],
    correct_index: 2,
    solution: 'The noble gases occupying Group 18 of periods 1 to 7 are:\n$1^{\\text{st}}$: He ($Z = 2$)\n$2^{\\text{nd}}$: Ne ($Z = 10$)\n$3^{\\text{rd}}$: Ar ($Z = 18$)\n$4^{\\text{th}}$: Kr ($Z = 36$)\n$5^{\\text{th}}$: Xe ($Z = 54$)\n$6^{\\text{th}}$: Rn ($Z = 86$)\n$7^{\\text{th}}$: Og (Oganesson, $Z = 118$).\nThus, the seventh noble gas has atomic number 118.',
    topic: 'Magic Numbers and Noble Gas Atomic Numbers',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 159,
    question_type: 'single_choice',
    question_text: 'The correct statement is',
    options: [
      'Acidic nature of oxides increases from left to right in a period of periodic table',
      'Acidic nature of hydracids increases from left to right in a period of periodic table',
      'Acidic nature of hydracids increases from top to bottom in a group of periodic table',
      'All of these'
    ],
    correct_index: 3,
    solution: '- In a period from left to right, electronegativity increases, making oxides increasingly acidic ($Na_2O < Al_2O_3 < SO_3 < Cl_2O_7$).\n- Hydracid acidity increases across a period with increasing electronegativity of central atom ($CH_4 < NH_3 < H_2O < HF$).\n- Hydracid acidity increases down a group due to decreasing $H-X$ bond dissociation energy ($HF < HCl < HBr < HI$).\nTherefore, all of these statements are correct.',
    topic: 'Periodic Trends in Acidity of Oxides and Hydracids',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 160,
    question_type: 'single_choice',
    question_text: 'Representative elements belong to',
    options: [
      '$s$-block',
      '$p$-block',
      '$d$-block',
      'Both (1) & (2)'
    ],
    correct_index: 3,
    solution: 'Representative elements (also known as main group elements) are the elements of the $s$-block (Groups 1 and 2) and the $p$-block (Groups 13 to 18, excluding group 18 noble gases in classical terminology). Thus, they belong to both the $s$-block and $p$-block.',
    topic: 'Classification of Representative Elements',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 161,
    question_type: 'single_choice',
    question_text: 'Formula of chloride of element A whose $IE_1, IE_2, IE_3$ and $IE_4$ are respectively $4.5\\text{ eV}, 11\\text{ eV}, 78\\text{ eV}$ and $110\\text{ eV}$ is',
    options: [
      'ACl',
      '$ACl_2$',
      '$A_2Cl_3$',
      '$A_2Cl$'
    ],
    correct_index: 1,
    solution: 'The successive ionization energies are: $IE_1 = 4.5\\text{ eV}$, $IE_2 = 11\\text{ eV}$, $IE_3 = 78\\text{ eV}$, and $IE_4 = 110\\text{ eV}$. There is an immense, seven-fold jump between $IE_2$ and $IE_3$. This indicates that element A has exactly 2 valence electrons ($A^{2+}$) and belongs to Group 2. With chlorine (valency 1), it forms the divalent chloride $ACl_2$.',
    topic: 'Compound Formula from Ionization Enthalpy Jumps',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 162,
    question_type: 'single_choice',
    question_text: 'Position of element ($Z = 108$) in long form periodic table and its IUPAC name is',
    options: [
      '$d\\text{-block, group 8 — unniloctium}$',
      '$f\\text{-block, group 3 — unnilseptium}$',
      '$p\\text{-block, group 17 — unniloctium}$',
      '$s\\text{-block, group 2 — unnilennium}$'
    ],
    correct_index: 0,
    solution: 'Element $Z = 108$ has the IUPAC systematic name Unniloctium ($Uno$, now Hassium $Hs$). Its electronic configuration is $[Rn] 5f^{14} 6d^6 7s^2$. The differentiating electrons enter the $6d$ subshell, so it belongs to the $d$-block. The group number is $6 + 2 = 8$. Thus: $d$-block, group 8 — unniloctium.',
    topic: 'IUPAC Naming and Placement of Element 108',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 163,
    question_type: 'single_choice',
    question_text: 'The largest atom of $3^{\\text{rd}}$ period is',
    options: [
      'Na',
      'Cl',
      'Fe',
      'Ar'
    ],
    correct_index: 0,
    solution: 'Across a period from left to right, effective nuclear charge increases while electrons are added to the same principal shell, causing atomic radius to decrease from alkali metal to halogen. Sodium ($Na$) has the lowest effective nuclear charge in the third period and has the largest covalent atomic radius ($186\\text{ pm}$).',
    topic: 'Largest Atom Across Period 3',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 164,
    question_type: 'single_choice',
    question_text: 'Which set has the strongest tendency to form anions?',
    options: [
      'V, Cr, Mn',
      'Ga, In, Tl',
      'Na, Mg, Al',
      'N, O, F'
    ],
    correct_index: 3,
    solution: 'Non-metals located at the top-right of the periodic table ($N, O, F$) have small atomic radii, high effective nuclear charges, and high electronegativities. They have a powerful attraction for electrons and readily gain electrons to form stable noble-gas octets ($N^{3-}, O^{2-}, F^-$), exhibiting the strongest tendency to form anions.',
    topic: 'Anion Formation Tendency in Non-Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 165,
    question_type: 'single_choice',
    question_text: 'The firmness with which an electron is held by an atom is a measure of its',
    options: [
      'Electronegativity',
      'Ionisation potential',
      'Ionic character',
      'Metallic character'
    ],
    correct_index: 1,
    solution: 'Ionization potential is quantitatively defined as the minimum energy required to detach the most loosely bound valence electron from an isolated gaseous atom. The tighter and firmer the electrostatic attraction holding the electron to the nucleus, the greater is the ionization potential.',
    topic: 'Definition and Significance of Ionization Potential',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 166,
    question_type: 'single_choice',
    question_text: 'Considering the elements B, Al, Mg and K, the correct order of their metallic character is',
    options: [
      '$B > Al > Mg > K$',
      '$Al > Mg > B > K$',
      '$Mg > Al > K > B$',
      '$K > Mg > Al > B$'
    ],
    correct_index: 3,
    solution: 'Metallic character increases down a vertical group and decreases across a horizontal period. Potassium ($K$, Group 1, Period 4) is an alkali metal and the most metallic. In Period 3, Magnesium ($Mg$, Group 2) is more metallic than Aluminium ($Al$, Group 13). Boron ($B$, Period 2, Group 13) is a non-metal/metalloid. Therefore: $K > Mg > Al > B$.',
    topic: 'Metallic Character Sequence',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 167,
    question_type: 'single_choice',
    question_text: 'The element which belongs to group-3 and d-block is',
    options: [
      '$La (Z = 57)$',
      '$Ce (Z = 58)$',
      '$Th (Z = 90)$',
      '$Zr (Z = 40)$'
    ],
    correct_index: 0,
    solution: 'Lanthanum ($La, Z = 57$) has electronic configuration $[Xe] 5d^1 6s^2$. The differentiating electron is in the $5d$ orbital, placing it formally in Group 3 of the $d$-block. (Ce and Th belong to the $f$-block, while Zr belongs to Group 4).',
    topic: 'Group 3 Transition Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 168,
    question_type: 'single_choice',
    question_text: '$Na^+, Mg^{2+}, Al^{3+}$ and $Si^{4+}$ are isoelectronic, their ionic size will follow the order',
    options: [
      '$Na^+ > Mg^{2+} > Al^{3+} > Si^{4+}$',
      '$Na^+ < Mg^{2+} < Al^{3+} < Si^{4+}$',
      '$Na^+ > Mg^{2+} > Al^{3+} < Si^{4+}$',
      '$Na^+ < Mg^{2+} > Al^{3+} > Si^{4+}$'
    ],
    correct_index: 0,
    solution: 'In an isoelectronic series of cations, each ion has 10 electrons. As the positive nuclear charge increases from $Na^+ (Z=11)$ to $Si^{4+} (Z=14)$, the electron cloud is drawn progressively closer to the nucleus. Hence, ionic radii decrease as: $Na^+ > Mg^{2+} > Al^{3+} > Si^{4+}$.',
    topic: 'Isoelectronic Cation Radii Comparison',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 169,
    question_type: 'single_choice',
    question_text: 'Statement I: The electron affinity of oxygen is less than that of nitrogen but greater than that of fluorine.\nStatement II: Nitrogen, oxygen and fluorine do not belong to the same period of the periodic table.\nChoose the correct option among the following:',
    options: [
      'Both statement I and statement II are correct',
      'Both statement I and statement II are incorrect',
      'Statement I is correct but statement II is incorrect',
      'Statement I is incorrect but statement II is correct'
    ],
    correct_index: 1,
    solution: '- Statement I is incorrect: The electron affinity of Oxygen ($141\\text{ kJ/mol}$) is much higher than Nitrogen (near zero due to half-filled $2p^3$), and less than Fluorine ($328\\text{ kJ/mol}$).\n- Statement II is incorrect: Nitrogen ($Z=7$), Oxygen ($Z=8$), and Fluorine ($Z=9$) all belong to the same second period of the periodic table.\nThus, both statement I and statement II are incorrect.',
    topic: 'Evaluation of Electron Affinity Statements',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 170,
    question_type: 'single_choice',
    question_text: 'Statement I: Chlorine has maximum negative electron gain enthalpy in periodic table.\nStatement II: Chlorine has smallest size in periodic table.\nChoose the correct option among the following:',
    options: [
      'Both statement I and statement II are correct',
      'Both statement I and statement II are incorrect',
      'Statement I is correct but statement II is incorrect',
      'Statement I is incorrect but statement II is correct'
    ],
    correct_index: 2,
    solution: '- Statement I is correct: Chlorine has $\\Delta H_{\\text{eg}} = -349\\text{ kJ/mol}$, which is the highest negative electron gain enthalpy of any element.\n- Statement II is incorrect: Helium and Fluorine have much smaller atomic radii than Chlorine, which is in the third period with three electron shells.\nTherefore, Statement I is correct but Statement II is incorrect.',
    topic: 'Chlorine Electron Gain Enthalpy and Atomic Radius',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 171,
    question_type: 'single_choice',
    question_text: 'Statement I: The ionic radii of $Na^+$ is lesser than $Mg^{2+}$.\nStatement II: Ionic radii increases with increase in effective nuclear charge.\nChoose the correct option among the following:',
    options: [
      'Both statement I and statement II are correct',
      'Both statement I and statement II are incorrect',
      'Statement I is correct but statement II is incorrect',
      'Statement I is incorrect but statement II is correct'
    ],
    correct_index: 1,
    solution: '- Statement I is incorrect: $Na^+$ and $Mg^{2+}$ are isoelectronic with 10 electrons; $Mg^{2+}$ ($Z=12$) has a higher nuclear charge than $Na^+$ ($Z=11$), so $r(Mg^{2+}) = 72\\text{ pm} < r(Na^+) = 102\\text{ pm}$. Thus, $Na^+$ is larger, not lesser.\n- Statement II is incorrect: As effective nuclear charge increases, the electrostatic attraction pulls electrons inward, causing ionic radii to decrease, not increase.\nThus, both statement I and statement II are incorrect.',
    topic: 'Isoelectronic Radii and Nuclear Charge Statements',
    difficulty: 'easy',
    marks: 4
  }
];

