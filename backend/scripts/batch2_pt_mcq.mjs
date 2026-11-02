// Batch 2: Periodic Table MCQs (Q36 to Q70)
export const batch2Questions = [
  {
    serialNumber: 36,
    question_type: 'single_choice',
    question_text: 'Among the oxides given below, how many of them are acidic oxides?\n$Mn_2O_7, CO_2, NO_2, N_2O_5, CO, N_2O$',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correct_index: 2,
    solution: '- $Mn_2O_7$: Acidic oxide (Mn in +7 oxidation state forms permanganic acid $HMnO_4$).\n- $CO_2$: Acidic oxide (forms carbonic acid $H_2CO_3$).\n- $NO_2$: Acidic oxide (mixed anhydride of $HNO_2$ and $HNO_3$).\n- $N_2O_5$: Acidic oxide (anhydride of nitric acid $HNO_3$).\n- $CO, N_2O$: Neutral oxides.\nTherefore, exactly 4 of them are acidic oxides.',
    topic: 'Classification of Oxides as Acidic, Basic, or Neutral',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 37,
    question_type: 'single_choice',
    question_text: 'Which of the following has correct order of ionic radii?',
    options: [
      '$O^{2-} > F^- > Na^+ > Mg^{2+}$',
      '$Mg^{2+} > Na^+ > O^{2-} > F^-$',
      '$O^{2-} > Na^+ > F^- > Mg^{2+}$',
      '$F^- > O^{2-} > Mg^{2+} > Na^+$'
    ],
    correct_index: 0,
    solution: 'All four ions are isoelectronic (each has 10 electrons). In an isoelectronic series, ionic radius decreases as nuclear charge $Z$ increases: $O^{2-} (Z=8) > F^- (Z=9) > Na^+ (Z=11) > Mg^{2+} (Z=12)$.',
    topic: 'Ionic Radii of Isoelectronic Species',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 38,
    question_type: 'single_choice',
    question_text: 'The correct order of electron affinity is',
    options: [
      '$F > Cl > Br > I$',
      '$S > Se > Te > Po > O$',
      '$O > S > Se > Te > Po$',
      '$Cl > Br > F > I$'
    ],
    correct_index: 1,
    solution: 'In Group 16, oxygen has an exceptionally low electron affinity due to the small size of its $2p$ orbital and high inter-electronic repulsion. Down the group below sulphur, electron affinity decreases regularly with increasing atomic size: $S > Se > Te > Po > O$.',
    topic: 'Electron Affinity Trends in Group 16',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 39,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is incorrect?',
    options: [
      'The first ionisation energy of N is greater than that of O',
      'The second ionisation energy of O is greater than that of N',
      'The first ionisation energy of F is greater than that of Ne',
      'The first ionisation energy of He is greater than that of Ne'
    ],
    correct_index: 2,
    solution: 'Neon ($Ne$) is a noble gas with a completely filled, extremely stable octet configuration ($1s^2 2s^2 2p^6$) and a higher effective nuclear charge than Fluorine. Therefore, $IE_1(Ne) = 2080\\text{ kJ/mol}$ is significantly higher than $IE_1(F) = 1681\\text{ kJ/mol}$. Statement (3) is incorrect.',
    topic: 'Ionization Energy Comparison Across Period 2',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 40,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is correct?',
    options: [
      'Bond energy of $Cl-Cl$ bond is less than bond energy of $F-F$ bond',
      'Bond angle in $H_2O$ is less than that in $OF_2$',
      'Bond order of $C=C$ bond in $C_2H_4$ is less than bond order of $N_2$',
      '$O_2$ is more stable than $N_2$'
    ],
    correct_index: 2,
    solution: 'In ethene ($C_2H_4$), the $C=C$ double bond has a bond order of 2, whereas in dinitrogen ($N_2$), the $N \\equiv N$ triple bond has a bond order of 3. Thus, the bond order of $C=C$ in $C_2H_4$ is less than that of $N_2$. (Statement 1 is false because $Cl_2 > F_2$ due to lone pair repulsion in $F_2$; Statement 2 is false because bond angle in $H_2O$ ($104.5^\\circ$) is greater than $OF_2$ ($103^\\circ$)).',
    topic: 'Bond Parameters and Molecular Properties',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 41,
    question_type: 'single_choice',
    question_text: 'Which of the following is the correct order of negative electron gain enthalpy of halogens?',
    options: [
      '$F > Cl > Br > I$',
      '$Cl > F > Br > I$',
      '$Cl > Br > F > I$',
      '$Cl > Br > I > F$'
    ],
    correct_index: 1,
    solution: 'Chlorine has the highest negative electron gain enthalpy in the periodic table ($-349\\text{ kJ/mol}$). Fluorine has a slightly lower value ($-328\\text{ kJ/mol}$) due to intense electron-electron repulsions in its compact $2p$ subshell. Down the group from chlorine, $\\Delta H_{\\text{eg}}$ becomes less negative with increasing size. Thus: $Cl > F > Br > I$.',
    topic: 'Electron Gain Enthalpy of Halogens',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 42,
    question_type: 'single_choice',
    question_text: 'Which of the following has positive electron gain enthalpy?',
    options: [
      'Li',
      'O',
      'Cl',
      'Ne'
    ],
    correct_index: 3,
    solution: 'Neon is a noble gas with a completely filled valence shell ($2s^2 2p^6$). Adding an additional electron requires placing it into the next higher principal quantum shell ($3s$), which requires energy. Hence, neon has a positive electron gain enthalpy (endothermic).',
    topic: 'Positive Electron Gain Enthalpy of Noble Gases',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 43,
    question_type: 'single_choice',
    question_text: 'Which of the following has maximum electronegativity?',
    options: [
      'Cl',
      'O',
      'N',
      'F'
    ],
    correct_index: 3,
    solution: 'Fluorine has the highest electronegativity value on the Pauling scale ($4.0$) of any element in the periodic table due to its small atomic size and high effective nuclear charge.',
    topic: 'Electronegativity Maximum in Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 44,
    question_type: 'single_choice',
    question_text: 'Moseley\'s law for characteristic X-rays is $\\sqrt{\\nu} = a(Z - b)$. In this equation',
    options: [
      'Both a and b are independent of the material',
      'a is independent but b depends on the material',
      'b is independent but a depends on the material',
      'Both a and b depend on the material'
    ],
    correct_index: 0,
    solution: 'In Moseley\'s equation $\\sqrt{\\nu} = a(Z - b)$, $a$ and $b$ are constants for a particular series of characteristic X-rays (e.g., for $K_\\alpha$ lines, $a = \\sqrt{3RC/4}$ and $b \\approx 1$), and their values do not depend on the nature of the target material/metal used.',
    topic: 'Constants in Moseley Equation',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 45,
    question_type: 'single_choice',
    question_text: '$M(g) \\rightarrow M^+(g) + e^-, \\Delta H_1 = 100\\text{ eV}$\n$M(g) \\rightarrow M^{2+}(g) + 2e^-, \\Delta H_2 = 250\\text{ eV}$\nWhich is incorrect?',
    options: [
      '$IE_1$ of $M(g)$ is $100\\text{ eV}$',
      '$IE_2$ of $M(g)$ is $150\\text{ eV}$',
      '$IE_2$ of $M^+(g)$ is $250\\text{ eV}$',
      '$IE_1$ of $M^+(g)$ is $150\\text{ eV}$'
    ],
    correct_index: 2,
    solution: 'By definition, $IE_1 = \\Delta H_1 = 100\\text{ eV}$.\nThe second ionization enthalpy corresponds to $M^+(g) \\rightarrow M^{2+}(g) + e^-$, which is $\\Delta H_2 - \\Delta H_1 = 250 - 100 = 150\\text{ eV}$.\nTherefore, $IE_2$ of the element is $150\\text{ eV}$, not $250\\text{ eV}$. Statement (3) is incorrect.',
    topic: 'Successive Ionization Enthalpy Calculations',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 46,
    question_type: 'single_choice',
    question_text: 'Which of the following isolated gaseous ions is most stable?',
    options: [
      '$Fe^{3+}$',
      '$Fe^{2+}$',
      '$Mn^{3+}$',
      '$V^{2+}$'
    ],
    correct_index: 0,
    solution: 'The electronic configuration of $Fe^{3+}$ is $[Ar] 3d^5$. A half-filled $d$-subshell has symmetrical electron distribution and maximum exchange energy, which confers extraordinary electronic stability compared to $Fe^{2+} (3d^6)$, $Mn^{3+} (3d^4)$, or $V^{2+} (3d^3)$.',
    topic: 'Stability of Half-Filled d-Orbitals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 47,
    question_type: 'single_choice',
    question_text: 'Select the correct statement:\nI. Electron gain enthalpy of noble gases are high positive value.\nII. Electron affinity value of halogens are highly positive.\nIII. $1^{\\text{st}}$ electron gain enthalpy of most of the elements are negative while successive electron gain enthalpies are positive.\nIV. Electron affinity of Be and N are maximum positive.',
    options: [
      'Only IV',
      'I and II',
      'I and III',
      'I, II and III'
    ],
    correct_index: 3,
    solution: '- Statement I is correct: noble gases have completely filled stable shells, so electron gain enthalpy is strongly positive.\n- Statement II is correct: halogens have strong affinity to gain an electron to complete an octet, releasing large amounts of energy (electron affinity is positive by convention).\n- Statement III is correct: first electron gain enthalpy is usually negative (exothermic), but subsequent additions encounter strong electrostatic repulsion from the anion, making successive electron gain enthalpies positive (endothermic).\nThus, I, II and III are correct.',
    topic: 'Electron Gain Enthalpy Principles',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 48,
    question_type: 'single_choice',
    question_text: 'Which of the following oxide(s) is/are most acidic?',
    options: [
      '$Cl_2O_7$',
      '$SO_3$',
      '$N_2O_5$',
      '$N_2O_3$'
    ],
    correct_index: 0,
    solution: 'Dichlorine heptoxide ($Cl_2O_7$) contains Chlorine in its maximum oxidation state (+7) with high electronegativity ($3.0$). In water, it forms perchloric acid ($HClO_4$), the strongest of all common oxoacids. Hence, $Cl_2O_7$ is the most acidic oxide among the choices.',
    topic: 'Acidic Character of Non-Metal Oxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 49,
    question_type: 'single_choice',
    question_text: 'Which of the following elements of group 13 has least ionization enthalpy value?',
    options: [
      'Tl',
      'B',
      'Al',
      'In'
    ],
    correct_index: 3,
    solution: 'The first ionization enthalpy trend in Group 13 is: $B (801) > Tl (589) > Ga (579) > Al (577) > In (558\\text{ kJ/mol})$. Indium ($In$) has the lowest first ionization enthalpy in the group.',
    topic: 'Group 13 Ionization Enthalpy Anomalies',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 50,
    question_type: 'single_choice',
    question_text: 'Which of the following has lowest first ionization energy?',
    options: [
      'C',
      'Si',
      'Sn',
      'Pb'
    ],
    correct_index: 2,
    solution: 'In Group 14, ionization energy decreases from C down to Sn: $C (1086) > Si (786) > Ge (761) > Sn (708\\text{ kJ/mol})$. However, Lead ($Pb, 715\\text{ kJ/mol}$) has a slightly higher ionization energy than Sn due to poor shielding by the $14$ $4f$ electrons (lanthanide contraction). Hence, Tin ($Sn$) has the lowest first ionization energy in Group 14.',
    topic: 'Group 14 Ionization Energy Trends',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 51,
    question_type: 'single_choice',
    question_text: 'Which of the following is different from other three oxides?',
    options: [
      'SnO',
      'ZnO',
      'BeO',
      'BaO'
    ],
    correct_index: 3,
    solution: '$SnO$, $ZnO$, and $BeO$ are amphoteric oxides that react with both acids and bases. In contrast, $BaO$ is a strongly basic alkaline earth metal oxide that dissolves in water to form $Ba(OH)_2$.',
    topic: 'Amphoteric vs Basic Oxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 52,
    question_type: 'single_choice',
    question_text: 'The correct order of radii is',
    options: [
      '$N < Be < B$',
      '$F^- < O^{2-} < N^{3-}$',
      '$Na < Li < K$',
      '$Fe^{3+} < Fe^{2+} < Fe^{4+}$'
    ],
    correct_index: 1,
    solution: '$F^-, O^{2-}, N^{3-}$ are isoelectronic anions (10 electrons each). As negative charge increases, electron-electron repulsions expand the electron cloud while nuclear charge decreases ($Z = 9, 8, 7$). Therefore, ionic radius increases in the order $F^- < O^{2-} < N^{3-}$.',
    topic: 'Isoelectronic Anion Radii Trends',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 53,
    question_type: 'single_choice',
    question_text: 'The $I.P_1, I.P_2, I.P_3, I.P_4$ and $I.P_5$ of an element are $7.1, 14.3, 34.5, 46.8, 162.2\\text{ eV}$ respectively. The element is likely to be',
    options: [
      'Na',
      'Si',
      'Cl',
      'Ca'
    ],
    correct_index: 1,
    solution: 'The ionization potential values show a dramatic, sudden jump between $I.P_4$ ($46.8\\text{ eV}$) and $I.P_5$ ($162.2\\text{ eV}$). This indicates that the element has 4 valence electrons; after losing 4 electrons, removing a fifth electron requires breaking into a stable noble gas core. Hence, the element belongs to Group 14, which is Silicon ($Si$).',
    topic: 'Valence Electron Determination from Successive Ionization Energies',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 54,
    question_type: 'single_choice',
    question_text: 'Which of the following is/are correct regarding first negative electron gain enthalpy value?',
    options: [
      '$S > O$',
      '$P > N$',
      '$Cl > F$',
      'All of these'
    ],
    correct_index: 3,
    solution: 'In Groups 15, 16, and 17, elements of the $2^{\\text{nd}}$ period ($N, O, F$) have very compact $2p$ orbitals, creating strong inter-electronic repulsions that hinder electron addition. The $3^{\\text{rd}}$ period elements ($P, S, Cl$) have larger $3p$ orbitals with lower electron density, so their electron gain enthalpies are more negative: $S > O$, $P > N$, and $Cl > F$. Thus, all of these are correct.',
    topic: 'Electron Gain Enthalpy Anomalies in Period 2 vs Period 3',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 55,
    question_type: 'single_choice',
    question_text: 'If a graph is plotted between $\\sqrt{\\nu}$ versus atomic number ($Z$), then ($\\nu$ is the frequency of X-rays emitted)',
    options: [
      'Straight line is obtained',
      'Parabola is obtained',
      'Hyperbola is obtained',
      'Curve is obtained'
    ],
    correct_index: 0,
    solution: 'According to Moseley\'s law, the frequency of characteristic X-rays is related to the atomic number $Z$ by $\\sqrt{\\nu} = a(Z - b)$, which represents a linear relation $y = mx + c$. Therefore, a plot of $\\sqrt{\\nu}$ against $Z$ is a straight line.',
    topic: 'Moseley Law Graphical Representation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 56,
    question_type: 'single_choice',
    question_text: 'Which of the following will have highest negative electron gain enthalpy?',
    options: [
      'Oxygen',
      'Sulphur',
      'Selenium',
      'Tellurium'
    ],
    correct_index: 1,
    solution: 'In Group 16, Sulphur has the highest negative electron gain enthalpy ($-200\\text{ kJ/mol}$) because Oxygen ($-141\\text{ kJ/mol}$) suffers from strong inter-electronic repulsion in its compact $2p$ shell, and beyond Sulphur, increasing atomic size reduces electron attraction.',
    topic: 'Electron Gain Enthalpy in Chalcogens',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 57,
    question_type: 'single_choice',
    question_text: 'Which of the following ions have pseudo inert gas electronic configuration?',
    options: [
      '$Cu^+$',
      '$Fe^{3+}$',
      '$O^{2-}$',
      '$Cu^{2+}$'
    ],
    correct_index: 0,
    solution: 'A pseudo inert gas configuration is characterized by having 18 electrons in the outermost shell with the configuration $ns^2 np^6 nd^{10}$. $Cu^+$ ($Z = 29 - 1 = 28$) has configuration $1s^2 2s^2 2p^6 3s^2 3p^6 3d^{10}$, where the outermost shell ($n=3$) has exactly 18 electrons.',
    topic: 'Pseudo Inert Gas Configurations',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 58,
    question_type: 'single_choice',
    question_text: 'Beryllium is diagonally related to',
    options: [
      'Li',
      'Al',
      'B',
      'Si'
    ],
    correct_index: 1,
    solution: 'Due to their similar charge-to-size ratios (ionic potential), Beryllium ($Be$) in the second period exhibits a diagonal relationship with Aluminium ($Al$) in the third period (both form amphoteric oxides/hydroxides, covalent chlorides, polymeric hydrides, etc.).',
    topic: 'Diagonal Relationship in s and p Blocks',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 59,
    question_type: 'single_choice',
    question_text: 'Element having the smallest size in second period is',
    options: [
      'Na',
      'F',
      'O',
      'N'
    ],
    correct_index: 1,
    solution: 'Across the second period from left to right, effective nuclear charge increases while electrons are added to the same principal energy level ($n=2$). Consequently, covalent atomic radius decreases steadily across the period: $Li > Be > B > C > N > O > F$. Fluorine has the smallest atomic size among the chemically bonded atoms.',
    topic: 'Atomic Radii Trends Across Period 2',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 60,
    question_type: 'single_choice',
    question_text: 'Element Uub is placed in _____ group and _____ block of periodic table.',
    options: [
      '$4^{\\text{th}}, d$',
      '$3^{\\text{rd}}, f$',
      '$15^{\\text{th}}, p$',
      '$12^{\\text{th}}, d$'
    ],
    correct_index: 3,
    solution: 'Uub stands for Ununbium, which is element $Z = 112$ (IUPAC systematic name, now Copernicium, Cn). Its valence electronic configuration is $[Rn] 5f^{14} 6d^{10} 7s^2$. Since the last electron occupies the $6d$ subshell, it belongs to the $d$-block, and group number is $10 + 2 = 12$.',
    topic: 'IUPAC Nomenclature and Classification of Heavy Elements',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 61,
    question_type: 'single_choice',
    question_text: 'The correct increasing order of second ionisation energy is',
    options: [
      '$Na < Mg < Al < Si$',
      '$Mg < Na < Al < Si$',
      '$Mg < Al < Si < Na$',
      '$Al < Mg < Si < Na$'
    ],
    correct_index: 2,
    solution: 'Monovalent cations: $Mg^+ ([Ne] 3s^1)$, $Al^+ ([Ne] 3s^2)$, $Si^+ ([Ne] 3s^2 3p^1)$, $Na^+ ([Ne])$.\n$Na^+$ has a stable noble gas core, so $IE_2(Na)$ is by far the highest. For the others, removing an electron from $3s^1$ in $Mg^+$ is easiest ($1451\\text{ kJ/mol}$). In general, $IE_2$ increases as: $Mg < Al < Si < Na$.',
    topic: 'Second Ionization Energy Trends of Period 3 Elements',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 62,
    question_type: 'single_choice',
    question_text: 'The correct order of ionisation potential of Na, P, Cl is',
    options: [
      '$Na > P > Cl$',
      '$P > Cl > Na$',
      '$Cl > P > Na$',
      '$Cl > Na > P$'
    ],
    correct_index: 2,
    solution: 'Across a period from left to right, effective nuclear charge increases and atomic radius decreases, causing first ionization potential to increase overall. In the third period: $Na (496\\text{ kJ/mol}) < P (1012\\text{ kJ/mol}) < Cl (1251\\text{ kJ/mol})$. Therefore, the correct order is $Cl > P > Na$.',
    topic: 'Ionization Potential Across Period 3',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 63,
    question_type: 'single_choice',
    question_text: 'The correct order of second ionisation energy for the elements C, N, O and F would be',
    options: [
      '$C > N > O > F$',
      '$O > N > F > C$',
      '$O > F > N > C$',
      '$F > O > N > C$'
    ],
    correct_index: 2,
    solution: 'The electronic configurations of the monopositive ions are:\n$C^+: 2s^2 2p^1$\n$N^+: 2s^2 2p^2$\n$O^+: 2s^2 2p^3$ (extra-stable half-filled configuration)\n$F^+: 2s^2 2p^4$\nBecause $O^+$ has a half-filled $2p^3$ subshell, removing an electron requires more energy than removing an electron from $F^+$. Overall, the second ionization energy follows the order: $O > F > N > C$.',
    topic: 'Second Ionization Enthalpy of Period 2 Elements',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 64,
    question_type: 'single_choice',
    question_text: 'Select the correct statement',
    options: [
      'All isoelectronic ions belong to same period of the periodic table',
      'Negative electron gain enthalpy decreases from fluorine to iodine in the group',
      'The first ionisation potential of Al is less than the first ionisation potential of Mg',
      'All of these'
    ],
    correct_index: 2,
    solution: 'Magnesium has a stable, fully-filled $3s^2$ subshell with higher penetration power ($IE_1 = 737\\text{ kJ/mol}$), whereas Aluminium has configuration $3s^2 3p^1$ where removing the single $3p$ electron is energetically easier ($IE_1 = 577\\text{ kJ/mol}$). Thus, $IE_1(Al) < IE_1(Mg)$. (Statement 1 is false since $Na^+$ is in period 3 and $F^-$ in period 2; Statement 2 is false because $Cl$ has higher electron gain enthalpy than $F$).',
    topic: 'Comparative Ionization Enthalpy of Mg and Al',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 65,
    question_type: 'single_choice',
    question_text: 'Element with atomic number 102 is placed in',
    options: [
      '$s$-block',
      '$p$-block',
      '$d$-block',
      '$f$-block'
    ],
    correct_index: 3,
    solution: 'Element $Z = 102$ is Nobelium ($No$). It is a member of the actinide series ($Z = 89$ to $103$), where electrons progressively fill the $5f$ subshell ($[Rn] 5f^{14} 7s^2$). Hence, it belongs to the $f$-block.',
    topic: 'Block Classification of Actinides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 66,
    question_type: 'single_choice',
    question_text: 'The electron affinity values (in kJ/mol) of three halogens X, Y and Z are respectively $-349, -325$ and $-328$. Then, X, Y and Z are respectively',
    options: [
      'F, Cl and Br',
      'Cl, F and Br',
      'Cl, Br and F',
      'Br, Cl and F'
    ],
    correct_index: 2,
    solution: 'The electron gain enthalpies of halogens are: $Cl = -349\\text{ kJ/mol}$, $F = -328\\text{ kJ/mol}$, and $Br = -325\\text{ kJ/mol}$. Matching these with $-349, -325, -328$ gives $X = Cl$, $Y = Br$, and $Z = F$.',
    topic: 'Electron Affinity Values of Halogens',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 67,
    question_type: 'single_choice',
    question_text: 'If the electronic configuration of an element is $[Ar] 3d^{10} 4s^2 4p^3$, the element belongs to',
    options: [
      '$s$-block',
      '$p$-block',
      '$d$-block',
      '$f$-block'
    ],
    correct_index: 1,
    solution: 'The differentiating (last) electron enters the $4p$ subshell. Therefore, the element belongs to the $p$-block (specifically, Group 15, Arsenic, $Z = 33$).',
    topic: 'Block Identification from Electronic Configuration',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 68,
    question_type: 'single_choice',
    question_text: 'In compound M-OH, the acidic nature increases when',
    options: [
      'I.E. of M is low',
      'I.E. of M is very low',
      'I.E. of M is high',
      'Acidic nature does not depend on I.E. of M'
    ],
    correct_index: 2,
    solution: 'When the electronegativity and ionization energy of the central atom M are high, M strongly attracts the shared electron pair of the $M-O$ bond towards itself. This polarizes the $O-H$ bond and weakens it, facilitating the release of $H^+$ ions into solution, thereby increasing acidic strength.',
    topic: 'Acidic Character of Hydroxides and Electronegativity',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 69,
    question_type: 'single_choice',
    question_text: 'Which of the following is the most acidic oxide?',
    options: [
      '$N_2O$',
      '$NO$',
      '$N_2O_3$',
      '$N_2O_5$'
    ],
    correct_index: 3,
    solution: 'The oxidation states of Nitrogen in these oxides are: $+1$ in $N_2O$, $+2$ in $NO$, $+3$ in $N_2O_3$, and $+5$ in $N_2O_5$. As the positive oxidation state of a non-metal increases, its electronegativity and covalent character increase, making the oxide more acidic. Thus, $N_2O_5$ is the most acidic oxide.',
    topic: 'Acidic Strength of Nitrogen Oxides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 70,
    question_type: 'single_choice',
    question_text: 'Lowest ionisation enthalpy in the periodic table is shown by',
    options: [
      'Chalcogens',
      'Halogens',
      'Alkali metals',
      'Alkaline earth metals'
    ],
    correct_index: 2,
    solution: 'Alkali metals (Group 1) have the largest atomic size in their respective periods and only one loosely bound electron in their outermost $s$-orbital. Losing this electron gives them an extremely stable noble gas configuration; hence, they have the lowest first ionization enthalpy in each period and in the periodic table overall.',
    topic: 'Periodic Group Trends in Ionization Enthalpy',
    difficulty: 'easy',
    marks: 4
  }
];

