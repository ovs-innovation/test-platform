// Batch 3: Periodic Table MCQs (Q71 to Q105)
export const batch3Questions = [
  {
    serialNumber: 71,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is correct?',
    options: [
      '$Z_{\\text{eff}} = Z - \\sigma$',
      '$Z_{\\text{eff}} = Z + \\sigma$',
      '$Z_{\\text{eff}} = Z - \\text{number of penultimate electrons}$',
      '$Z_{\\text{eff}} = Z - \\sigma + \\text{number of penultimate electrons}$'
    ],
    correct_index: 0,
    solution: 'Effective nuclear charge ($Z_{\\text{eff}}$) is the actual net positive nuclear charge experienced by an electron in a polyelectronic atom, calculated as the total nuclear charge ($Z$) minus the screening or shielding constant ($\\sigma$): $Z_{\\text{eff}} = Z - \\sigma$.',
    topic: 'Effective Nuclear Charge Definition',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 72,
    question_type: 'single_choice',
    question_text: 'The element of atomic number 118 will be placed in which of the following group of long form of periodic table?',
    options: [
      '15',
      '16',
      '18',
      '17'
    ],
    correct_index: 2,
    solution: 'Element $Z = 118$ is Oganesson ($Og$). Its electronic configuration is $[Rn] 5f^{14} 6d^{10} 7s^2 7p^6$. Having a completely filled valence shell of 8 electrons ($7s^2 7p^6$), it is placed at the end of the $7^{\\text{th}}$ period in Group 18 with the noble gases.',
    topic: 'Group Placement of Superheavy Element 118',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 73,
    question_type: 'single_choice',
    question_text: 'The highest third ionisation energy among the following is of',
    options: [
      'Boron',
      'Beryllium',
      'Carbon',
      'Nitrogen'
    ],
    correct_index: 1,
    solution: 'Beryllium has configuration $1s^2 2s^2$. After losing two valence electrons, $Be^{2+}$ has the ultra-stable, noble gas configuration of Helium ($1s^2$). Removing a third electron requires breaking into this inner, tightly bound $1s$ core close to the nucleus, resulting in an exceptionally high third ionization energy ($14848\\text{ kJ/mol}$).',
    topic: 'Third Ionization Energy Extremes',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 74,
    question_type: 'single_choice',
    question_text: 'There are 28 neutrons in the nucleus of the element $^{52}M$. It belongs to',
    options: [
      '$s$-block',
      '$d$-block',
      '$p$-block',
      '$f$-block'
    ],
    correct_index: 1,
    solution: 'The atomic number $Z = A - N = 52 - 28 = 24$. The element with $Z = 24$ is Chromium ($Cr$). Its electronic configuration is $[Ar] 3d^5 4s^1$, where the differentiating electrons enter the $3d$ subshell. Thus, it belongs to the $d$-block.',
    topic: 'Block Classification from Mass Number and Neutrons',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 75,
    question_type: 'single_choice',
    question_text: 'The pair of elements which are members of third period are',
    options: [
      'Be, P',
      'Si, Cl',
      'N, O',
      'F, Al'
    ],
    correct_index: 1,
    solution: 'The third period contains elements with atomic numbers $Z = 11$ to $18$ ($Na$ to $Ar$). Silicon ($Z = 14$) and Chlorine ($Z = 17$) both have electrons filling the $n=3$ principal energy level, making them both members of the third period.',
    topic: 'Period Membership in Periodic Table',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 76,
    question_type: 'single_choice',
    question_text: 'Boron shows diagonal relationship with element having atomic number',
    options: [
      '15',
      '13',
      '14',
      '12'
    ],
    correct_index: 2,
    solution: 'Boron (Group 13, Period 2, $Z = 5$) shows a diagonal relationship with Silicon (Group 14, Period 3, $Z = 14$). Both elements form covalent, polymeric oxides and hydrides, exhibit semi-metallic character, and form volatile halides.',
    topic: 'Diagonal Relationship of Boron and Silicon',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 77,
    question_type: 'single_choice',
    question_text: 'Highest electron affinity will be of',
    options: [
      'N',
      'P',
      'O',
      'S'
    ],
    correct_index: 3,
    solution: 'Nitrogen has an extra-stable half-filled $2p^3$ subshell giving it an electron affinity near zero. Oxygen ($-141\\text{ kJ/mol}$) has high inter-electronic repulsion in its compact $2p$ orbital. Phosphorus has an electron affinity of $-72\\text{ kJ/mol}$. Sulphur has larger $3p$ orbitals and releases $-200\\text{ kJ/mol}$ upon gaining an electron, the highest among the choices.',
    topic: 'Comparative Electron Affinity of Period 2 and 3 Non-Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 78,
    question_type: 'single_choice',
    question_text: 'Eka-aluminium and eka-silicon in Mendeleev\'s periodic table respectively are',
    options: [
      'Ga, Ta',
      'Ga, Sn',
      'Ge, Ga',
      'Ga, Ge'
    ],
    correct_index: 3,
    solution: 'Mendeleev predicted the existence of elements below Aluminium and Silicon, naming them Eka-aluminium and Eka-silicon. When discovered, Eka-aluminium was identified as Gallium ($Ga$) and Eka-silicon as Germanium ($Ge$).',
    topic: 'Mendeleev Predictions and Historical Development',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 79,
    question_type: 'single_choice',
    question_text: 'The correct order of radii is',
    options: [
      '$Na^+ < F^- < Al^{3+} < Mg^{2+}$',
      '$N^{3-} < Na^+ < Mg^{2+} < O^{2-}$',
      '$Al^{3+} < Mg^{2+} < O^{2-} < N^{3-}$',
      '$Mg^{2+} < N^{3-} < O^{2-} < F^-$'
    ],
    correct_index: 2,
    solution: '$Al^{3+}, Mg^{2+}, O^{2-}, N^{3-}$ are isoelectronic (10 electrons). As the nuclear charge decreases from $+13$ in $Al^{3+}$ to $+7$ in $N^{3-}$, the electron cloud expands significantly. Hence, the correct increasing order of radii is: $Al^{3+} < Mg^{2+} < O^{2-} < N^{3-}$.',
    topic: 'Isoelectronic Radii Sequence',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 80,
    question_type: 'single_choice',
    question_text: 'General outer electronic configuration of first inner transition series is',
    options: [
      '$(n-2)f^{1-14} (n-1)d^{0-1} ns^2$',
      '$(n-2)f^{0-14} (n-1)d^{0-2} ns^2$',
      '$(n-2)f^{1-14} (n-1)d^{1-2} ns^2$',
      '$(n-2)f^{1-14} (n-1)d^{0-1} ns^1$'
    ],
    correct_index: 0,
    solution: 'The first inner transition series corresponds to the Lanthanoids ($4f$ series, $n=6$). Its general valence shell electronic configuration is $(n-2)f^{1-14} (n-1)d^{0-1} ns^2$, which specifically corresponds to $4f^{1-14} 5d^{0-1} 6s^2$.',
    topic: 'Electronic Configuration of Lanthanides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 81,
    question_type: 'single_choice',
    question_text: 'Predict the atomic number of the element in the periodic table satisfying the outer shell electronic configuration $(n-1)d^3 ns^2$ for $n=4$',
    options: [
      '39',
      '57',
      '21',
      '23'
    ],
    correct_index: 3,
    solution: 'For $n=4$, the configuration is $(4-1)d^3 4s^2 = 3d^3 4s^2$. Including the preceding noble gas core Argon ($[Ar]$ with $Z=18$), the total number of electrons is $18 + 3 + 2 = 23$, which corresponds to Vanadium ($V$).',
    topic: 'Atomic Number Determination from Configuration',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 82,
    question_type: 'single_choice',
    question_text: 'Predict the block to which an element with $Z = 90$ belongs',
    options: [
      '$s$-block',
      '$p$-block',
      '$d$-block',
      '$f$-block'
    ],
    correct_index: 3,
    solution: 'Element $Z = 90$ is Thorium ($Th$), the first element of the actinoid series ($Z = 90$ to $103$). Members of the actinoid series are classified as inner transition elements and belong to the $f$-block.',
    topic: 'Block Classification of Actinides',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 83,
    question_type: 'single_choice',
    question_text: 'The first and the second ionization enthalpies (in kJ/mol) of a few elements are given below:\nElement I: $IE_1 = 2372, IE_2 = 5251$\nElement II: $IE_1 = 520, IE_2 = 7300$\nElement III: $IE_1 = 900, IE_2 = 1760$\nElement IV: $IE_1 = 1680, IE_2 = 3380$\nWhich of the above elements is likely to be a metal that forms a stable binary halide of the formula $AX_2$?',
    options: [
      'I',
      'II',
      'III',
      'IV'
    ],
    correct_index: 2,
    solution: 'An element forming a stable divalent halide $AX_2$ must be a Group 2 alkaline earth metal with two easily removable valence electrons. Element III has moderate $IE_1$ ($900\\text{ kJ/mol}$) and $IE_2$ ($1760\\text{ kJ/mol}$) with no large gap between them, characteristic of alkaline earth metals like Magnesium. (Element II has a huge jump after $IE_1$, typical of alkali metals forming $AX$).',
    topic: 'Identification of Group 2 Metals from Ionization Enthalpies',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 84,
    question_type: 'single_choice',
    question_text: 'Which of the following elements has the most negative electron gain enthalpy?',
    options: [
      '$[Ne] 3s^2 3p^1$',
      '$[Ne] 3s^2 3p^2$',
      '$[Ne] 3s^2 3p^3$',
      '$[Ne] 3s^2 3p^5$'
    ],
    correct_index: 3,
    solution: '$[Ne] 3s^2 3p^5$ is the electronic configuration of Chlorine ($Cl$). Chlorine has the highest negative electron gain enthalpy ($-349\\text{ kJ/mol}$) in the entire periodic table, as adding one electron completes an exceptionally stable noble gas octet with minimal repulsions.',
    topic: 'Electron Gain Enthalpy Extremes from Electronic Configurations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 85,
    question_type: 'single_choice',
    question_text: 'Predict the formula of the stable binary compound that would be formed by the element $M (Z = 114)$ and fluorine',
    options: [
      'MF',
      '$MF_2$',
      '$MF_4$',
      '$MF_6$'
    ],
    correct_index: 2,
    solution: 'Element $Z = 114$ (Flerovium) belongs to Group 14 of the periodic table, having 4 valence electrons ($7s^2 7p^2$). The principal group oxidation state for Group 14 elements when reacting with highly electronegative and oxidizing Fluorine is $+4$. Therefore, the stable binary compound formed is $MF_4$.',
    topic: 'Chemical Formula Prediction of Superheavy Compounds',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 86,
    question_type: 'single_choice',
    question_text: 'The element with atomic number 57 belongs to',
    options: [
      '$s$-block',
      '$p$-block',
      '$d$-block',
      '$f$-block'
    ],
    correct_index: 2,
    solution: 'Element $Z = 57$ is Lanthanum ($La$). Its electronic configuration is $[Xe] 5d^1 6s^2$. The last electron enters the $5d$ subshell rather than a $4f$ subshell; thus, Lanthanum is officially a $d$-block transition element in Group 3.',
    topic: 'Classification and Block of Lanthanum',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 87,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is incorrect?',
    options: [
      'The first ionization potential of Al is less than the first ionization potential of Mg',
      'The second ionization potential of Mg is greater than the second ionization potential of Na',
      'The first ionization potential of Na is less than the first ionization potential of Mg',
      'The third ionization potential of Mg is greater than the third ionization potential of Al'
    ],
    correct_index: 1,
    solution: '$Na^+$ has a stable noble-gas closed-shell configuration ($1s^2 2s^2 2p^6$), so its second ionization potential is very high ($4562\\text{ kJ/mol}$). $Mg^+$ has one valence electron in $3s^1$, and removing it yields a stable octet ($1451\\text{ kJ/mol}$). Therefore, $IE_2(Na) > IE_2(Mg)$, making statement (2) incorrect.',
    topic: 'Successive Ionization Potential Comparisons Across Period 3',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 88,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is incorrect?',
    options: [
      'van der Waals radius of iodine is more than its covalent radius',
      'All isoelectronic ions belong to the same period of the periodic table',
      'IE of N is higher than that of O while $IE_2$ of O is higher than that of N',
      'The electron gain enthalpy of N is positive'
    ],
    correct_index: 1,
    solution: 'Statement (2) is incorrect: isoelectronic ions frequently belong to different periods of the periodic table. For example, $N^{3-}, O^{2-}, F^-$ belong to Period 2, whereas their isoelectronic partners $Na^+, Mg^{2+}, Al^{3+}$ belong to Period 3.',
    topic: 'Properties of Isoelectronic Species and Periodicity',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 89,
    question_type: 'single_choice',
    question_text: 'Which of the following elements with atomic numbers 25, 30, 48 and 80 has the highest vapour pressure at room temperature?',
    options: [
      '$Z = 30$',
      '$Z = 48$',
      '$Z = 80$',
      '$Z = 25$'
    ],
    correct_index: 2,
    solution: 'Element $Z = 80$ is Mercury ($Hg$). Due to completely filled $5d^{10} 6s^2$ orbitals and strong relativistic inert pair contraction of the $6s$ orbital, metallic bonding in mercury is extraordinarily weak. It is a liquid at room temperature with high volatility and highest vapour pressure among all metals.',
    topic: 'Volatility and Vapour Pressure Trends in Group 12 Metals',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 90,
    question_type: 'single_choice',
    question_text: 'Which of the isoelectronic ions, $K^+, Ca^{2+}, Cl^-$ and $S^{2-}$ has the lowest ionization energy?',
    options: [
      '$K^+$',
      '$Ca^{2+}$',
      '$Cl^-$',
      '$S^{2-}$'
    ],
    correct_index: 3,
    solution: 'All four ions possess 18 electrons. Ionization energy increases with increasing nuclear charge ($Z$). Among the four, $S^{2-}$ has the lowest nuclear charge ($Z = 16$), meaning its valence electrons experience the weakest effective nuclear attraction. Consequently, removing an electron from $S^{2-}$ requires the least energy.',
    topic: 'Ionization Energy of Isoelectronic Anions and Cations',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 91,
    question_type: 'single_choice',
    question_text: 'Which of the following process is exothermic?',
    options: [
      '$K \\rightarrow K^+$',
      '$Mg^+ \\rightarrow Mg^{2+}$',
      '$O \\rightarrow O^-$',
      '$S^- \\rightarrow S^{2-}$'
    ],
    correct_index: 2,
    solution: 'The first electron addition to a neutral oxygen atom ($O(g) + e^- \\rightarrow O^-(g)$) releases energy ($\\Delta H_{\\text{eg}} = -141\\text{ kJ/mol}$), making it an exothermic process. In contrast, ionizations ($K \\rightarrow K^+, Mg^+ \\rightarrow Mg^{2+}$) and adding an electron to an existing negative ion ($S^- \\rightarrow S^{2-}$) require energy (endothermic).',
    topic: 'Exothermic vs Endothermic Electron Gain Steps',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 92,
    question_type: 'single_choice',
    question_text: 'The process involving highest release of energy will be',
    options: [
      '$F(g) + e^- \\rightarrow F^-(g)$',
      '$Cl(g) + e^- \\rightarrow Cl^-(g)$',
      '$O^-(g) + e^- \\rightarrow O^{2-}(g)$',
      '$S(g) + e^- \\rightarrow S^-(g)$'
    ],
    correct_index: 1,
    solution: 'Chlorine has the highest electron gain enthalpy ($-349\\text{ kJ/mol}$) of all elements due to its optimal atomic size and low inter-electronic repulsion compared to Fluorine ($-328\\text{ kJ/mol}$). Thus, the formation of $Cl^-$ releases the greatest amount of energy.',
    topic: 'Maximum Energy Release in Electron Gain',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 93,
    question_type: 'single_choice',
    question_text: 'The correct order of first ionisation energies of some elements is given in the order',
    options: [
      '$B < C < N < O$',
      '$B < C < O < N$',
      '$B < O < C < N$',
      '$O < B < C < N$'
    ],
    correct_index: 1,
    solution: 'In the second period, first ionization energy increases with nuclear charge from Boron to Carbon ($B < C$). However, Nitrogen ($2s^2 2p^3$) has an extra-stable half-filled $2p$ subshell, requiring more energy to ionize than Oxygen ($2s^2 2p^4$). Thus, the correct sequence is $B < C < O < N$.',
    topic: 'Ionization Energy Sequence in Period 2',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 94,
    question_type: 'single_choice',
    question_text: 'The highest second ionisation energy among the following is',
    options: [
      'Nitrogen',
      'Oxygen',
      'Lithium',
      'Carbon'
    ],
    correct_index: 2,
    solution: 'Lithium ($1s^2 2s^1$) forms $Li^+$ ($1s^2$) upon losing its first electron. The second ionization involves removing an electron from the completely filled, tightly held $1s$ core directly adjacent to the nucleus ($Z = 3$), demanding $5248\\text{ kJ/mol}$, the highest among the choices.',
    topic: 'Second Ionization Energy of Alkali Metals vs Non-Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 95,
    question_type: 'single_choice',
    question_text: 'Element having symbol Unb belong to which period and group of periodic table respectively?',
    options: [
      '7, 4',
      '6, 6',
      '7, 3',
      '6, 5'
    ],
    correct_index: 2,
    solution: 'The IUPAC temporary systematic symbol Unb corresponds to Un-nil-bium, which is element $Z = 102$ (Nobelium). Nobelium is an actinoid (series $Z = 89$ to $103$), all of which belong to Period 7 and Group 3 of the periodic table.',
    topic: 'IUPAC Nomenclature and Period/Group Assignment',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 96,
    question_type: 'single_choice',
    question_text: 'The correct order of electron affinities is',
    options: [
      '$Cl > F > S > O$',
      '$S > Cl > Na > Ar$',
      '$Cl > Na > Si > Ar$',
      '$Cl > Si > Ar > Na$'
    ],
    correct_index: 0,
    solution: 'The electron gain enthalpies of these non-metals are: $Cl (-349\\text{ kJ/mol}) > F (-328\\text{ kJ/mol}) > S (-200\\text{ kJ/mol}) > O (-141\\text{ kJ/mol})$. In terms of magnitude of electron affinity, the correct sequence is $Cl > F > S > O$.',
    topic: 'Comparative Electron Affinity of Halogens and Chalcogens',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 97,
    question_type: 'single_choice',
    question_text: 'Which of the following ions has the highest value of ionic radius?',
    options: [
      '$Li^+$',
      '$B^{3+}$',
      '$O^{2-}$',
      '$F^-$'
    ],
    correct_index: 2,
    solution: 'Anions are significantly larger than cations due to electron-electron repulsion and lower effective nuclear charge. Between isoelectronic $O^{2-}$ and $F^-$ (10 electrons each), $O^{2-}$ has a lower nuclear charge ($Z = 8$ vs $Z = 9$), resulting in the largest ionic radius ($140\\text{ pm}$).',
    topic: 'Comparative Ionic Radii',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 98,
    question_type: 'single_choice',
    question_text: 'In which of the following processes, maximum energy is released?',
    options: [
      '$O(g) + e^- \\rightarrow O^-(g)$',
      '$O^-(g) + e^- \\rightarrow O^{2-}(g)$',
      '$S(g) + e^- \\rightarrow S^-(g)$',
      '$S^-(g) + e^- \\rightarrow S^{2-}(g)$'
    ],
    correct_index: 2,
    solution: 'Between Oxygen and Sulphur, Sulphur has a significantly larger $3p$ orbital with less inter-electronic repulsion than Oxygen\'s compact $2p$ orbital. Hence, adding an electron to Sulphur ($S + e^- \\rightarrow S^-$) releases $200\\text{ kJ/mol}$, whereas Oxygen ($O + e^- \\rightarrow O^-$) releases $141\\text{ kJ/mol}$. (The second additions to anions are endothermic).',
    topic: 'Energy Release in Chalcogen Anion Formation',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 99,
    question_type: 'single_choice',
    question_text: 'Ionisation energy of $F^-$ is $320\\text{ kJ/mol}$. The electron affinity of fluorine would be',
    options: [
      '$-320\\text{ kJ/mol}$',
      '$-160\\text{ kJ/mol}$',
      '$320\\text{ kJ/mol}$',
      '$160\\text{ kJ/mol}$'
    ],
    correct_index: 2,
    solution: 'The ionization of fluoride ion is: $F^-(g) \\rightarrow F(g) + e^-, \\Delta H = +320\\text{ kJ/mol}$. The reverse process is electron addition to fluorine atom: $F(g) + e^- \\rightarrow F^-(g), \\Delta H = -320\\text{ kJ/mol}$. Since electron affinity is defined as the magnitude of energy released, the electron affinity of fluorine is $+320\\text{ kJ/mol}$.',
    topic: 'Relationship Between Ionization Energy of Anion and Electron Affinity',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 100,
    question_type: 'single_choice',
    question_text: 'Which of the following statement is not correct?',
    options: [
      'Among halogens, oxidising behaviour increases down the group',
      'Among alkali metals, Lithium is the strongest reducing agent in aqueous medium',
      'Fluorine is the most electronegative element',
      'Lithium is the hardest metal among alkali metals'
    ],
    correct_index: 0,
    solution: 'Standard reduction potentials of halogens decrease down the group: $E^\\circ(F_2/F^-) = +2.87\\text{ V} > E^\\circ(Cl_2/Cl^-) = +1.36\\text{ V} > E^\\circ(Br_2/Br^-) = +1.09\\text{ V} > E^\\circ(I_2/I^-) = +0.54\\text{ V}$. Therefore, oxidizing power decreases down the group from Fluorine to Iodine. Statement (1) is incorrect.',
    topic: 'Periodic Group Trends of Halogens and Alkali Metals',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 101,
    question_type: 'single_choice',
    question_text: 'The correct order of third ionization energies ($IE_3$) of Na, Mg and Al is',
    options: [
      '$Mg > Na > Al$',
      '$Al > Mg > Na$',
      '$Mg > Al > Na$',
      '$Na > Mg > Al$'
    ],
    correct_index: 0,
    solution: 'The dipositive ions have configurations: $Na^{2+} ([Ne] 2p^5)$, $Mg^{2+} ([Ne])$, and $Al^{2+} ([Ne] 3s^1)$. For $Mg^{2+}$, removing the third electron requires disrupting an extremely stable noble gas octet ($2p^6$), requiring the highest energy ($7733\\text{ kJ/mol}$). For $Al^{2+}$, removing the $3s^1$ electron yields a stable octet, requiring the lowest energy ($2745\\text{ kJ/mol}$). Thus, the order is $Mg > Na > Al$.',
    topic: 'Third Ionization Energy of Period 3 Metals',
    difficulty: 'medium',
    marks: 4
  },
  {
    serialNumber: 102,
    question_type: 'single_choice',
    question_text: 'The first element of rare-earth metals is',
    options: [
      'Cerium',
      'Actinium',
      'Uranium',
      'Lanthanum'
    ],
    correct_index: 0,
    solution: 'Rare earth metals conventionally refer to the lanthanoids ($4f$ series). The first element of the lanthanoid series where $4f$ electron filling begins is Cerium ($Ce, Z = 58$, $[Xe] 4f^1 5d^1 6s^2$).',
    topic: 'Rare Earth Elements and First Lanthanoid',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 103,
    question_type: 'single_choice',
    question_text: 'Atomic radii of fluorine and oxygen in pm units are respectively given by',
    options: [
      '72, 74',
      '74, 72',
      '77, 77',
      '88, 77'
    ],
    correct_index: 0,
    solution: 'Across Period 2 from left to right, effective nuclear charge increases and atomic radius decreases steadily. Since Oxygen precedes Fluorine in the period, $r(O) > r(F)$. Thus, the atomic radii are $72\\text{ pm}$ for Fluorine and $74\\text{ pm}$ for Oxygen.',
    topic: 'Covalent Radii of Oxygen and Fluorine',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 104,
    question_type: 'single_choice',
    question_text: 'In graph of atomic volume versus atomic weight, the elements corresponding to peaks in the curve belong to',
    options: [
      'Group-1',
      'Group-18',
      'Group-4',
      'Group-14'
    ],
    correct_index: 0,
    solution: 'In Lothar Meyer\'s atomic volume curve (atomic volume vs atomic weight), the strongly electropositive alkali metals ($Li, Na, K, Rb, Cs$) have the largest atomic volumes in their periods and occupy the sharp peaks (crests) of the curve.',
    topic: 'Lothar Meyer Atomic Volume Curve',
    difficulty: 'easy',
    marks: 4
  },
  {
    serialNumber: 105,
    question_type: 'single_choice',
    question_text: 'If there are three possible values for spin quantum number, then how many total elements can be present in $3^{\\text{rd}}$ period of periodic table?',
    options: [
      '12',
      '10',
      '8',
      '18'
    ],
    correct_index: 0,
    solution: 'In the $3^{\\text{rd}}$ period, electrons fill the $3s$ (1 orbital) and $3p$ (3 orbitals) subshells, providing a total of $1 + 3 = 4$ orbitals. If each electron could have 3 spin states, each orbital could accommodate 3 electrons by Pauli\'s exclusion principle. Therefore, total elements = $4 \\text{ orbitals} \\times 3 = 12$ elements.',
    topic: 'Hypothetical Quantum States and Periodic Table Capacity',
    difficulty: 'medium',
    marks: 4
  }
];

