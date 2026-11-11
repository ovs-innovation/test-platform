// Questions 29 to 55 (27 questions)
// Chapter: The d- and f-Block Elements

export const dfPart2 = [
  {
    question_number: 29,
    question_text: "Which one of the following ions exhibits $d\\text{-}d$ transition and paramagnetism as well?",
    options: [
      "$\\text{CrO}_4^{2-}$",
      "$\\text{Cr}_2\\text{O}_7^{2-}$",
      "$\\text{MnO}_4^-$",
      "$\\text{MnO}_4^{2-}$"
    ],
    correct_option: "D",
    solution_text: "In $\\text{MnO}_4^{2-}$, manganese has an oxidation state of $+6$ ($[\\text{Ar}]3d^1$). Because it contains one unpaired electron in the $3d$ orbital ($n = 1$), it is paramagnetic and can undergo $d\\text{-}d$ transitions.\\n\\nIn contrast, $\\text{CrO}_4^{2-}$, $\\text{Cr}_2\\text{O}_7^{2-}$ (both $\\text{Cr}^{6+}, 3d^0$), and $\\text{MnO}_4^-$ ($\\text{Mn}^{7+}, 3d^0$) have no $d$-electrons, so they are diamagnetic and their colour is due to charge-transfer spectra rather than $d\\text{-}d$ transitions."
  },
  {
    question_number: 30,
    question_text: "Match the metal ions given in Column I with the spin magnetic moments of the ions given in Column II and assign the correct code :\\n\\n| Column - I | Column - II |\\n| :--- | :--- |\\n| A. $\\text{Co}^{3+}$ | (i) $\\sqrt{8}\\text{ B.M.}$ |\\n| B. $\\text{Cr}^{3+}$ | (ii) $\\sqrt{35}\\text{ B.M.}$ |\\n| C. $\\text{Fe}^{3+}$ | (iii) $\\sqrt{3}\\text{ B.M.}$ |\\n| D. $\\text{Ni}^{2+}$ | (iv) $\\sqrt{24}\\text{ B.M.}$ |\\n| | (v) $\\sqrt{15}\\text{ B.M.}$ |",
    options: [
      "A-(iv), B-(v), C-(ii), D-(i)",
      "A-(i), B-(ii), C-(iii), D-(iv)",
      "A-(iv), B-(i), C-(ii), D-(iii)",
      "A-(iii), B-(v), C-(i), D-(ii)"
    ],
    correct_option: "A",
    solution_text: "Spin magnetic moment is calculated using $\\mu = \\sqrt{n(n + 2)}\\text{ B.M.}$, where $n$ is the number of unpaired electrons:\\n- A. $\\text{Co}^{3+}$: $[\\text{Ar}]3d^6 \\implies 4$ unpaired electrons $\\implies \\mu = \\sqrt{4(6)} = \\sqrt{24}\\text{ B.M.}$ $\\rightarrow$ (iv)\\n- B. $\\text{Cr}^{3+}$: $[\\text{Ar}]3d^3 \\implies 3$ unpaired electrons $\\implies \\mu = \\sqrt{3(5)} = \\sqrt{15}\\text{ B.M.}$ $\\rightarrow$ (v)\\n- C. $\\text{Fe}^{3+}$: $[\\text{Ar}]3d^5 \\implies 5$ unpaired electrons $\\implies \\mu = \\sqrt{5(7)} = \\sqrt{35}\\text{ B.M.}$ $\\rightarrow$ (ii)\\n- D. $\\text{Ni}^{2+}$: $[\\text{Ar}]3d^8 \\implies 2$ unpaired electrons $\\implies \\mu = \\sqrt{2(4)} = \\sqrt{8}\\text{ B.M.}$ $\\rightarrow$ (i)\\n\\nHence, the correct matching is A-(iv), B-(v), C-(ii), D-(i)."
  },
  {
    question_number: 31,
    question_text: "Name the gas that can readily decolourise acidified $\\text{KMnO}_4$ solution.",
    options: [
      "$\\text{SO}_2$",
      "$\\text{NO}_2$",
      "$\\text{P}_2\\text{O}_5$",
      "$\\text{CO}_2$"
    ],
    correct_option: "A",
    solution_text: "Sulfur dioxide ($\\text{SO}_2$) acts as a strong reducing agent. It reduces purple permanganate ($\\text{MnO}_4^-$) to colourless $\\text{Mn}^{2+}$ ion in acidic solution:\\n$$2\\text{MnO}_4^- + 5\\text{SO}_2 + 2\\text{H}_2\\text{O} \\rightarrow 2\\text{Mn}^{2+} + 5\\text{SO}_4^{2-} + 4\\text{H}^+$$"
  },
  {
    question_number: 32,
    question_text: "$\\text{HgCl}_2$ and $\\text{I}_2$ both when dissolved in water containing $\\text{I}^-$ ions, the pair of species formed is",
    options: [
      "$\\text{HgI}_2, \\text{I}^-$",
      "$\\text{HgI}_4^{2-}, \\text{I}_3^-$",
      "$\\text{Hg}_2\\text{I}_2, \\text{I}^-$",
      "$\\text{HgI}_2, \\text{I}_3^-$"
    ],
    correct_option: "B",
    solution_text: "In aqueous solution containing excess $\\text{I}^-$ ions:\\n1. Mercuric chloride forms tetraiodomercurate(II) complex:\\n$$\\text{HgCl}_2 + 4\\text{I}^- \\rightarrow [\\text{HgI}_4]^{2-} + 2\\text{Cl}^-$$\\n2. Iodine reacts with iodide to form triiodide ion:\\n$$\\text{I}_2 + \\text{I}^- \\rightarrow \\text{I}_3^-$$\\n\\nThus, the pair of species formed is $\\text{HgI}_4^{2-}$ and $\\text{I}_3^-$."
  },
  {
    question_number: 33,
    question_text: "The reason for greater range of oxidation states in actinoids is attributed to",
    options: [
      "actinoid contraction",
      "$5f$, $6d$ and $7s$ levels having comparable energies",
      "$4f$ and $5d$ levels being close in energies",
      "the radioactive nature of actinoids."
    ],
    correct_option: "B",
    solution_text: "Actinoids exhibit a wider range of oxidation states than lanthanoids because the energy difference between the $5f$, $6d$, and $7s$ orbitals is very small (they have comparable energies), enabling electrons from all these subshells to participate in bonding."
  },
  {
    question_number: 34,
    question_text: "Which one of the following statements related to lanthanoids is incorrect?",
    options: [
      "Europium shows $+2$ oxidation state.",
      "The basicity decreases as the ionic radius decreases from $\\text{Pr}$ to $\\text{Lu}$.",
      "All the lanthanons are much more reactive than aluminium.",
      "$\\text{Ce}^{4+}$ solutions are widely used as oxidizing agent in volumetric analysis."
    ],
    correct_option: "C",
    solution_text: "The earlier members of the lanthanoid series are quite reactive (similar to calcium), but with increasing atomic number, they behave more like aluminium, not much more reactive than aluminium. Hence, statement (C) is incorrect."
  },
  {
    question_number: 35,
    question_text: "Which one of the following statements is correct when $\\text{SO}_2$ is passed through acidified $\\text{K}_2\\text{Cr}_2\\text{O}_7$ solution?",
    options: [
      "$\\text{SO}_2$ is reduced.",
      "Green $\\text{Cr}_2(\\text{SO}_4)_3$ is formed.",
      "The solution turns blue.",
      "The solution is decolourised."
    ],
    correct_option: "B",
    solution_text: "When sulfur dioxide gas is passed through acidified potassium dichromate solution, orange dichromate is reduced to green chromium(III) sulfate, and $\\text{SO}_2$ is oxidized to sulfate:\\n$$\\text{K}_2\\text{Cr}_2\\text{O}_7 + 3\\text{SO}_2 + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{K}_2\\text{SO}_4 + \\text{Cr}_2(\\text{SO}_4)_3 + \\text{H}_2\\text{O}$$"
  },
  {
    question_number: 36,
    question_text: "The electronic configuration of $\\text{Eu}$ (Atomic No. 63), $\\text{Gd}$ (Atomic No. 64) and $\\text{Tb}$ (Atomic No. 65) are",
    options: [
      "$[\\text{Xe}]4f^6 5d^1 6s^2$, $[\\text{Xe}]4f^7 5d^1 6s^2$ and $[\\text{Xe}]4f^8 5d^1 6s^2$",
      "$[\\text{Xe}]4f^7 6s^2$, $[\\text{Xe}]4f^7 5d^1 6s^2$ and $[\\text{Xe}]4f^9 6s^2$",
      "$[\\text{Xe}]4f^7 6s^2$, $[\\text{Xe}]4f^8 6s^2$ and $[\\text{Xe}]4f^8 5d^1 6s^2$",
      "$[\\text{Xe}]4f^6 5d^1 6s^2$, $[\\text{Xe}]4f^7 5d^1 6s^2$ and $[\\text{Xe}]4f^9 6s^2$"
    ],
    correct_option: "B",
    solution_text: "The electronic configurations are:\\n- $\\text{Eu}$ ($Z = 63$): $[\\text{Xe}]4f^7 6s^2$\\n- $\\text{Gd}$ ($Z = 64$): $[\\text{Xe}]4f^7 5d^1 6s^2$ (half-filled $4f$ stability)\\n- $\\text{Tb}$ ($Z = 65$): $[\\text{Xe}]4f^9 6s^2$"
  },
  {
    question_number: 37,
    question_text: "Gadolinium belongs to $4f$ series. Its atomic number is 64. Which of the following is the correct electronic configuration of gadolinium?",
    options: [
      "$[\\text{Xe}]4f^9 5s^1$",
      "$[\\text{Xe}]4f^7 5d^1 6s^2$",
      "$[\\text{Xe}]4f^6 5d^2 6s^2$",
      "$[\\text{Xe}]4f^8 6d^2$"
    ],
    correct_option: "B",
    solution_text: "The atomic number of Gadolinium is 64. Its ground-state electronic configuration is $[\\text{Xe}]4f^7 5d^1 6s^2$, where the half-filled $4f^7$ subshell provides extra exchange energy and stability."
  },
  {
    question_number: 38,
    question_text: "Assuming complete ionisation, same moles of which of the following compounds will require the least amount of acidified $\\text{KMnO}_4$ for complete oxidation?",
    options: [
      "$\\text{FeSO}_3$",
      "$\\text{FeC}_2\\text{O}_4$",
      "$\\text{Fe(NO}_2)_2$",
      "$\\text{FeSO}_4$"
    ],
    correct_option: "D",
    solution_text: "Let us calculate the number of moles of electrons transferred ($n$-factor) per mole of each compound upon complete oxidation:\\n- $\\text{FeSO}_4$: $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + 1e^-$ ($n$-factor = 1)\\n- $\\text{FeSO}_3$: $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + 1e^-$ and $\\text{SO}_3^{2-} \\rightarrow \\text{SO}_4^{2-} + 2e^-$ (total 3 electrons)\\n- $\\text{FeC}_2\\text{O}_4$: $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + 1e^-$ and $\\text{C}_2\\text{O}_4^{2-} \\rightarrow 2\\text{CO}_2 + 2e^-$ (total 3 electrons)\\n- $\\text{Fe(NO}_2)_2$: $\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + 1e^-$ and $2\\text{NO}_2^- \\rightarrow 2\\text{NO}_3^- + 4e^-$ (total 5 electrons)\\n\\nSince $\\text{FeSO}_4$ requires only 1 electron per mole for oxidation, it requires the least amount of acidified $\\text{KMnO}_4$."
  },
  {
    question_number: 39,
    question_text: "Magnetic moment $2.84\\text{ B.M.}$ is given by (At. nos. $\\text{Ni} = 28$, $\\text{Ti} = 22$, $\\text{Cr} = 24$, $\\text{Co} = 27$)",
    options: [
      "$\\text{Cr}^{2+}$",
      "$\\text{Co}^{2+}$",
      "$\\text{Ni}^{2+}$",
      "$\\text{Ti}^{3+}$"
    ],
    correct_option: "C",
    solution_text: "The spin-only magnetic moment $\\mu = \\sqrt{n(n + 2)} = 2.84\\text{ B.M.}$ corresponds to $n = 2$ unpaired electrons ($\\\\sqrt{2(2+2)} = \\sqrt{8} \\approx 2.83\\text{ B.M.}$).\\n- $\\text{Ni}^{2+}$ ($[\\text{Ar}]3d^8$): has 2 unpaired electrons ($n = 2$).\\n- $\\text{Ti}^{3+}$ ($[\\text{Ar}]3d^1$): has 1 unpaired electron ($n = 1$).\\n- $\\text{Cr}^{2+}$ ($[\\text{Ar}]3d^4$): has 4 unpaired electrons ($n = 4$).\\n- $\\text{Co}^{2+}$ ($[\\text{Ar}]3d^7$): has 3 unpaired electrons ($n = 3$).\\n\\nTherefore, $\\text{Ni}^{2+}$ gives a magnetic moment of $2.84\\text{ B.M.}$."
  },
  {
    question_number: 40,
    question_text: "Which of the following processes does not involve oxidation of iron?",
    options: [
      "Formation of $\\text{Fe(CO)}_5$ from $\\text{Fe}$.",
      "Liberation of $\\text{H}_2$ from steam by iron at high temperature.",
      "Rusting of iron sheets.",
      "Decolourisation of blue $\\text{CuSO}_4$ solution by iron."
    ],
    correct_option: "A",
    solution_text: "In the reaction $\\text{Fe} + 5\\text{CO} \\rightarrow \\text{Fe(CO)}_5$, the oxidation state of iron remains zero ($0 \\rightarrow 0$), so iron is not oxidized.\\n\\nIn contrast:\\n- Reaction with steam: $\\text{Fe} \\rightarrow \\text{Fe}_3\\text{O}_4$ (iron is oxidized to $+8/3$).\\n- Rusting: $\\text{Fe} \\rightarrow \\text{Fe}^{3+}$ (iron is oxidized).\\n- Displacement with $\\text{CuSO}_4$: $\\text{Fe} + \\text{Cu}^{2+} \\rightarrow \\text{Fe}^{2+} + \\text{Cu}$ (iron is oxidized)."
  },
  {
    question_number: 41,
    question_text: "Because of lanthanoid contraction, which of the following pairs of elements have nearly same atomic radii? (Numbers in the parenthesis are atomic numbers)",
    options: [
      "$\\text{Zr}(40)$ and $\\text{Hf}(72)$",
      "$\\text{Zr}(40)$ and $\\text{Ta}(73)$",
      "$\\text{Ti}(22)$ and $\\text{Zr}(40)$",
      "$\\text{Zr}(40)$ and $\\text{Nb}(41)$"
    ],
    correct_option: "A",
    solution_text: "Due to the intervening 14 $4f$-electrons in the lanthanoid series providing imperfect shielding, the expected size increase from the second to third transition series is counterbalanced (lanthanoid contraction). Consequently, $\\text{Zr}$ ($160\\text{ pm}$) and $\\text{Hf}$ ($159\\text{ pm}$) have almost identical atomic radii."
  },
  {
    question_number: 42,
    question_text: "The reaction of aqueous $\\text{KMnO}_4$ with $\\text{H}_2\\text{O}_2$ in acidic conditions gives",
    options: [
      "$\\text{Mn}^{4+}$ and $\\text{O}_2$",
      "$\\text{Mn}^{2+}$ and $\\text{O}_2$",
      "$\\text{Mn}^{2+}$ and $\\text{O}_3$",
      "$\\text{Mn}^{4+}$ and $\\text{MnO}_2$"
    ],
    correct_option: "B",
    solution_text: "In acidic solution, permanganate oxidizes hydrogen peroxide to molecular oxygen while being reduced to manganese(II) ion:\\n$$2\\text{MnO}_4^- + 5\\text{H}_2\\text{O}_2 + 6\\text{H}^+ \\rightarrow 2\\text{Mn}^{2+} + 5\\text{O}_2 + 8\\text{H}_2\\text{O}$$"
  },
  {
    question_number: 43,
    question_text: "Magnetic moment $2.83\\text{ BM}$ is given by which of the following ions? (At. nos. $\\text{Ti} = 22$, $\\text{Cr} = 24$, $\\text{Mn} = 25$, $\\text{Ni} = 28$)",
    options: [
      "$\\text{Ti}^{3+}$",
      "$\\text{Ni}^{2+}$",
      "$\\text{Cr}^{3+}$",
      "$\\text{Mn}^{2+}$"
    ],
    correct_option: "B",
    solution_text: "Magnetic moment $\\mu = \\sqrt{n(n + 2)} = 2.83\\text{ BM} \\implies n = 2$ unpaired electrons.\\n- $\\text{Ti}^{3+}$ ($[\\text{Ar}]3d^1$): $n = 1$\\n- $\\text{Ni}^{2+}$ ($[\\text{Ar}]3d^8$): $n = 2$\\n- $\\text{Cr}^{3+}$ ($[\\text{Ar}]3d^3$): $n = 3$\\n- $\\text{Mn}^{2+}$ ($[\\text{Ar}]3d^5$): $n = 5$\\n\\nThus, $\\text{Ni}^{2+}$ has a magnetic moment of $2.83\\text{ BM}$."
  },
  {
    question_number: 44,
    question_text: "Reason of lanthanoid contraction is",
    options: [
      "negligible screening effect of '$f$'- orbitals",
      "increasing nuclear charge",
      "decreasing nuclear charge",
      "decreasing screening effect."
    ],
    correct_option: "A",
    solution_text: "Lanthanoid contraction is primarily caused by the imperfect (poor or negligible) screening effect of the $4f$-electrons. As the nuclear charge increases across the series, the outer electrons experience a greater effective nuclear charge, causing a steady decrease in atomic and ionic radii."
  },
  {
    question_number: 45,
    question_text: "The outer electronic configuration of $\\text{Gd}$ (At. No. 64) is",
    options: [
      "$4f^5 5d^4 6s^1$",
      "$4f^7 5d^1 6s^2$",
      "$4f^3 5d^5 6s^2$",
      "$4f^4 5d^5 6s^1$"
    ],
    correct_option: "B",
    solution_text: "The outer electronic configuration of gadolinium ($Z = 64$) is $4f^7 5d^1 6s^2$, where the half-filled $4f^7$ subshell confers special stability."
  },
  {
    question_number: 46,
    question_text: "$\\text{Sc}$ ($Z = 21$) is a transition element but $\\text{Zn}$ ($Z = 30$) is not because",
    options: [
      "both $\\text{Sc}^{3+}$ and $\\text{Zn}^{2+}$ ions are colourless and form white compounds.",
      "in case of $\\text{Sc}$, $3d$ orbitals are partially filled but in $\\text{Zn}$ these are filled.",
      "last electron is assumed to be added to $4s$ level in case of $\\text{Zn}$.",
      "both $\\text{Sc}$ and $\\text{Zn}$ do not exhibit variable oxidation states."
    ],
    correct_option: "B",
    solution_text: "A transition element is defined as an element that has an incompletely filled $d$-orbital in its ground state or in any of its common oxidation states. Scandium has an incompletely filled $3d$ subshell ($3d^1 4s^2$) in its ground state, whereas zinc has completely filled $d$-orbitals in both its ground state ($3d^{10}4s^2$) and its common $+2$ oxidation state ($3d^{10}$)."
  },
  {
    question_number: 47,
    question_text: "Which of the following statements about the interstitial compounds is incorrect?",
    options: [
      "They are much harder than the pure metal.",
      "They have higher melting points than the pure metal.",
      "The retain metallic conductivity.",
      "They are chemically reactive."
    ],
    correct_option: "D",
    solution_text: "Interstitial compounds are chemically inert, not reactive. They are formed when small atoms (H, C, N) get trapped in the crystal lattices of transition metals, resulting in high melting points, extreme hardness, and retention of metallic conductivity."
  },
  {
    question_number: 48,
    question_text: "Which of the following lanthanoid ions is diamagnetic? (At. nos. $\\text{Ce} = 58$, $\\text{Sm} = 62$, $\\text{Eu} = 63$, $\\text{Yb} = 70$)",
    options: [
      "$\\text{Eu}^{2+}$",
      "$\\text{Yb}^{2+}$",
      "$\\text{Ce}^{2+}$",
      "$\\text{Sm}^{2+}$"
    ],
    correct_option: "B",
    solution_text: "The electronic configurations of the $+2$ ions are:\\n- $\\text{Yb}^{2+}$ ($Z = 70$): $[\\text{Xe}]4f^{14}$ $\\implies n = 0$ (all electrons paired, diamagnetic)\\n- $\\text{Eu}^{2+}$ ($Z = 63$): $[\\text{Xe}]4f^7$ $\\implies n = 7$ (paramagnetic)\\n- $\\text{Sm}^{2+}$ ($Z = 62$): $[\\text{Xe}]4f^6$ $\\implies n = 6$ (paramagnetic)\\n- $\\text{Ce}^{2+}$ ($Z = 58$): $[\\text{Xe}]4f^2$ $\\implies n = 2$ (paramagnetic)\\n\\nHence, $\\text{Yb}^{2+}$ is diamagnetic."
  },
  {
    question_number: 49,
    question_text: "The catalytic activity of transition metals and their compounds is ascribed mainly to",
    options: [
      "their magnetic behaviour",
      "their unfilled $d$-orbitals",
      "their ability to adopt variable oxidation states",
      "their chemical reactivity"
    ],
    correct_option: "C",
    solution_text: "The catalytic activity of transition metals and their compounds is primarily attributed to their ability to exhibit multiple (variable) oxidation states and form unstable intermediates with reactants, providing low-activation energy reaction pathways."
  },
  {
    question_number: 50,
    question_text: "Which of the following exhibits only $+3$ oxidation state?",
    options: [
      "$\\text{U}$",
      "$\\text{Th}$",
      "$\\text{Ac}$",
      "$\\text{Pa}$"
    ],
    correct_option: "C",
    solution_text: "Actinium ($\\text{Ac}$, $Z = 89$, $[\\text{Rn}]6d^1 7s^2$) exhibits only the $+3$ oxidation state because the loss of 3 electrons results in the stable noble gas configuration of radon ($[\\text{Rn}]$). The other actinoids (Th, Pa, U) exhibit multiple variable oxidation states up to $+4, +5$, and $+6$."
  },
  {
    question_number: 51,
    question_text: "Which one of the following does not correctly represent the correct order of the property indicated against it?",
    options: [
      "$\\text{Ti} < \\text{V} < \\text{Cr} < \\text{Mn}$ : increasing number of oxidation states",
      "$\\text{Ti}^{3+} < \\text{V}^{3+} < \\text{Cr}^{3+} < \\text{Mn}^{3+}$ : increasing magnetic moment",
      "$\\text{Ti} < \\text{V} < \\text{Cr} < \\text{Mn}$ : increasing melting points",
      "$\\text{Ti} < \\text{V} < \\text{Mn} < \\text{Cr}$ : increasing $2^{\\text{nd}}$ ionization enthalpy"
    ],
    correct_option: "C",
    solution_text: "The melting point of $3d$ transition elements reaches a maximum at chromium (Cr) and drops abnormally at manganese (Mn) due to its stable half-filled $3d^5$ configuration, which results in weaker metallic bonding. Thus, $\\text{Mn}$ has a lower melting point than $\\text{Cr}$ and $\\text{V}$, making order (C) incorrect."
  },
  {
    question_number: 52,
    question_text: "Four successive members of the first series of the transition metals are listed below. For which one of them the standard potential ($E^\\circ_{\\text{M}^{2+}/\\text{M}}$) value has a positive sign?",
    options: [
      "$\\text{Co } (Z = 27)$",
      "$\\text{Ni } (Z = 28)$",
      "$\\text{Cu } (Z = 29)$",
      "$\\text{Fe } (Z = 26)$"
    ],
    correct_option: "C",
    solution_text: "In the first transition series, copper is the only element that has a positive standard electrode reduction potential ($E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = +0.34\\text{ V}$), because the high sum of its first and second ionization enthalpies is not balanced by its hydration enthalpy."
  },
  {
    question_number: 53,
    question_text: "Identify the alloy containing a non-metal as a constituent in it.",
    options: [
      "Invar",
      "Steel",
      "Bell metal",
      "Bronze"
    ],
    correct_option: "B",
    solution_text: "Steel is an alloy composed predominantly of iron and carbon (a non-metal, typically $0.1\\% - 1.5\\%\\text{ C}$).\\n- Invar is $\\text{Fe} + \\text{Ni}$.\\n- Bell metal is $\\text{Cu} + \\text{Sn}$.\\n- Bronze is $\\text{Cu} + \\text{Sn}$."
  },
  {
    question_number: 54,
    question_text: "Which of the statements is not true?",
    options: [
      "On passing $\\text{H}_2\\text{S}$ through acidified $\\text{K}_2\\text{Cr}_2\\text{O}_7$ solution, a milky colour is observed.",
      "$\\text{Na}_2\\text{Cr}_2\\text{O}_7$ is preferred over $\\text{K}_2\\text{Cr}_2\\text{O}_7$ in volumetric analysis.",
      "$\\text{K}_2\\text{Cr}_2\\text{O}_7$ solution in acidic medium is orange.",
      "$\\text{K}_2\\text{Cr}_2\\text{O}_7$ solution becomes yellow increasing the pH beyond 7."
    ],
    correct_option: "B",
    solution_text: "$\\text{K}_2\\text{Cr}_2\\text{O}_7$ is preferred over $\\text{Na}_2\\text{Cr}_2\\text{O}_7$ as a primary standard in volumetric analysis because sodium dichromate is hygroscopic (absorbs moisture from the atmosphere) and cannot be weighed accurately, whereas potassium dichromate is non-hygroscopic. Hence, statement (B) is false."
  },
  {
    question_number: 55,
    question_text: "For the four successive transition elements ($\\text{Cr, Mn, Fe}$ and $\\text{Co}$), the stability of $+2$ oxidation state will be there in which of the following order? (At. nos. $\\text{Cr} = 24$, $\\text{Mn} = 25$, $\\text{Fe} = 26$, $\\text{Co} = 27$)",
    options: [
      "$\\text{Mn} > \\text{Fe} > \\text{Cr} > \\text{Co}$",
      "$\\text{Fe} > \\text{Mn} > \\text{Co} > \\text{Cr}$",
      "$\\text{Co} > \\text{Mn} > \\text{Fe} > \\text{Cr}$",
      "$\\text{Cr} > \\text{Mn} > \\text{Co} > \\text{Fe}$"
    ],
    correct_option: "A",
    solution_text: "$\\text{Mn}^{2+}$ has a stable half-filled $d^5$ configuration, giving it high stability in the $+2$ oxidation state. Based on standard electrode potentials ($E^\\circ_{\\text{M}^{3+}/\\text{M}^{2+}}$ values: $\\text{Mn} = +1.57\\text{ V}$, $\\text{Co} = +1.97\\text{ V}$, $\\text{Fe} = +0.77\\text{ V}$, $\\text{Cr} = -0.41\\text{ V}$), the order of stability of the $+2$ state relative to $+3$ is $\\text{Mn} > \\text{Fe} > \\text{Cr} > \\text{Co}$."
  }
];

