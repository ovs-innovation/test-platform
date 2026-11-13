// Questions 31 to 60 (30 questions)
// Chapter: Coordination Compounds

export const coordPart2 = [
  {
    question_number: 31,
    question_text: "Which of the following is the correct order of increasing field strength of ligands to form coordination compounds?",
    options: [
      "$\\text{SCN}^- < \\text{F}^- < \\text{CN}^- < \\text{C}_2\\text{O}_4^{2-}$",
      "$\\text{F}^- < \\text{SCN}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{CN}^-$",
      "$\\text{CN}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{SCN}^- < \\text{F}^-$",
      "$\\text{SCN}^- < \\text{F}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{CN}^-$"
    ],
    correct_option: "D",
    solution_text: "According to the spectrochemical series determined experimentally by absorption spectra of complexes, the ligand field strength increases in the order:\\n$$\\text{I}^- < \\text{Br}^- < \\text{SCN}^- < \\text{Cl}^- < \\text{S}^{2-} < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NCS}^- < \\text{edta}^{4-} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}$$\\nThus, the correct increasing order among the given ligands is $\\text{SCN}^- < \\text{F}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{CN}^-$."
  },
  {
    question_number: 32,
    question_text: "The Crystal Field Stabilisation Energy (CFSE) for $[\\text{CoCl}_6]^{4-}$ is $18000\\text{ cm}^{-1}$. The CFSE for $[\\text{CoCl}_4]^{2-}$ will be",
    options: [
      "$8000\\text{ cm}^{-1}$",
      "$6000\\text{ cm}^{-1}$",
      "$16000\\text{ cm}^{-1}$",
      "$18000\\text{ cm}^{-1}$"
    ],
    correct_option: "A",
    solution_text: "The relationship between tetrahedral crystal field splitting ($\\Delta_t$) and octahedral crystal field splitting ($\\Delta_o$) for the same metal ion and ligand is:\\n$$\\Delta_t = \\frac{4}{9} \\Delta_o$$\\nGiven $\\Delta_o = 18000\\text{ cm}^{-1}$:\\n$$\\Delta_t = \\frac{4}{9} \\times 18000\\text{ cm}^{-1} = 8000\\text{ cm}^{-1}$$"
  },
  {
    question_number: 33,
    question_text: "What is the correct electronic configuration of the central atom in $\\text{K}_4[\\text{Fe(CN)}_6]$ based on crystal field theory?",
    options: [
      "$t_{2g}^4 e_g^2$",
      "$t_{2g}^6 e_g^0$",
      "$e^3 t_2^3$",
      "$e^4 t_2^2$"
    ],
    correct_option: "B",
    solution_text: "In $\\text{K}_4[\\text{Fe(CN)}_6]$, the central metal is iron in $+2$ oxidation state ($\\text{Fe}^{2+}$, $3d^6$). Since cyanide ($\\text{CN}^-$) is a strong field ligand, the crystal field splitting energy exceeds the pairing energy ($\\Delta_o > P$). Consequently, all six $3d$ electrons pair up in the lower-energy $t_{2g}$ orbitals, giving the electronic configuration $t_{2g}^6 e_g^0$."
  },
  {
    question_number: 34,
    question_text: "The type of isomerism shown by the complex $[\\text{CoCl}_2(\\text{en})_2]^+$ is",
    options: [
      "geometrical isomerism",
      "coordination isomerism",
      "ionization isomerism",
      "linkage isomerism."
    ],
    correct_option: "A",
    solution_text: "Complexes of the general type $[\\text{M(AA)}_2\\text{b}_2]$ (where $\\text{AA}$ is a symmetrical bidentate ligand like ethylenediamine) exhibit geometrical isomerism: cis (where the two chloride ligands are adjacent at $90^\\circ$) and trans (where the two chloride ligands are opposite at $180^\\circ$)."
  },
  {
    question_number: 35,
    question_text: "The geometry and magnetic behaviour of the complex $[\\text{Ni(CO)}_4]$ are",
    options: [
      "square planar geometry and diamagnetic",
      "tetrahedral geometry and diamagnetic",
      "square planar geometry and paramagnetic",
      "tetrahedral geometry and paramagnetic."
    ],
    correct_option: "B",
    solution_text: "In $[\\text{Ni(CO)}_4]$, nickel is in zero oxidation state ($[\\text{Ar}]3d^8 4s^2$). Carbon monoxide ($\\text{CO}$) is a strong field ligand that forces the two $4s$ electrons to pair into the $3d$ subshell, resulting in a completely filled $3d^{10}$ configuration. The empty $4s$ and three $4p$ orbitals hybridize to form four $sp^3$ hybrid orbitals, giving tetrahedral geometry. Because all electrons are paired ($n = 0$), the complex is diamagnetic."
  },
  {
    question_number: 36,
    question_text: "Iron carbonyl, $\\text{Fe(CO)}_5$ is",
    options: [
      "tetranuclear",
      "mononuclear",
      "trinuclear",
      "dinuclear"
    ],
    correct_option: "B",
    solution_text: "A mononuclear carbonyl contains only one transition metal atom per molecule. Because $\\text{Fe(CO)}_5$ has a single iron atom coordinated to five carbonyl ligands, it is a mononuclear carbonyl."
  },
  {
    question_number: 37,
    question_text: "An example of a sigma bonded organometallic compound is",
    options: [
      "Grignard's reagent",
      "ferrocene",
      "cobaltocene",
      "ruthenocene."
    ],
    correct_option: "A",
    solution_text: "In Grignard reagent ($\\text{R}-\\text{Mg}-\\text{X}$), the alkyl/aryl group is bonded to the magnesium atom via a direct metal-carbon $\\sigma$ single bond. In contrast, ferrocene, cobaltocene, and ruthenocene are $\\pi$-bonded sandwich compounds where cyclopentadienyl rings donate $\\pi$-electron density to the metal."
  },
  {
    question_number: 38,
    question_text: "The correct order of the stoichiometries of $\\text{AgCl}$ formed when $\\text{AgNO}_3$ in excess is treated with the complexes : $\\text{CoCl}_3 \\cdot 6\\text{NH}_3$, $\\text{CoCl}_3 \\cdot 5\\text{NH}_3$, $\\text{CoCl}_3 \\cdot 4\\text{NH}_3$ respectively is",
    options: [
      "$3\\text{AgCl}, 1\\text{AgCl}, 2\\text{AgCl}$",
      "$3\\text{AgCl}, 2\\text{AgCl}, 1\\text{AgCl}$",
      "$2\\text{AgCl}, 3\\text{AgCl}, 2\\text{AgCl}$",
      "$1\\text{AgCl}, 3\\text{AgCl}, 2\\text{AgCl}$"
    ],
    correct_option: "B",
    solution_text: "Based on Werner's coordination theory:\\n- $\\text{CoCl}_3 \\cdot 6\\text{NH}_3 = [\\text{Co(NH}_3)_6]\\text{Cl}_3 \\implies 3$ ionizable $\\text{Cl}^- \\implies 3\\text{AgCl}$\\n- $\\text{CoCl}_3 \\cdot 5\\text{NH}_3 = [\\text{Co(NH}_3)_5\\text{Cl}]\\text{Cl}_2 \\implies 2$ ionizable $\\text{Cl}^- \\implies 2\\text{AgCl}$\\n- $\\text{CoCl}_3 \\cdot 4\\text{NH}_3 = [\\text{Co(NH}_3)_4\\text{Cl}_2]\\text{Cl} \\implies 1$ ionizable $\\text{Cl}^- \\implies 1\\text{AgCl}$\\n\\nHence, the correct stoichiometry is $3\\text{AgCl}, 2\\text{AgCl}, 1\\text{AgCl}$."
  },
  {
    question_number: 39,
    question_text: "Correct increasing order for the wavelengths of absorption in the visible region for the complexes of $\\text{Co}^{3+}$ is",
    options: [
      "$[\\text{Co(H}_2\\text{O)}_6]^{3+}, [\\text{Co(en)}_3]^{3+}, [\\text{Co(NH}_3)_6]^{3+}$",
      "$[\\text{Co(H}_2\\text{O)}_6]^{3+}, [\\text{Co(NH}_3)_6]^{3+}, [\\text{Co(en)}_3]^{3+}$",
      "$[\\text{Co(NH}_3)_6]^{3+}, [\\text{Co(en)}_3]^{3+}, [\\text{Co(H}_2\\text{O)}_6]^{3+}$",
      "$[\\text{Co(en)}_3]^{3+}, [\\text{Co(NH}_3)_6]^{3+}, [\\text{Co(H}_2\\text{O)}_6]^{3+}$"
    ],
    correct_option: "D",
    solution_text: "The crystal field splitting energy ($\\Delta_o$) follows the spectrochemical series of ligands: $\\text{en} > \\text{NH}_3 > \\text{H}_2\\text{O}$.\\nThus: $\\Delta_o([\\text{Co(en)}_3]^{3+}) > \\Delta_o([\\text{Co(NH}_3)_6]^{3+}) > \\Delta_o([\\text{Co(H}_2\\text{O)}_6]^{3+})$.\\nSince energy and absorption wavelength are inversely related ($\\Delta_o = \\frac{hc}{\\lambda} \\implies \\lambda \\propto \\frac{1}{\\Delta_o}$), the absorption wavelength increases in the order:\\n$$[\\text{Co(en)}_3]^{3+} < [\\text{Co(NH}_3)_6]^{3+} < [\\text{Co(H}_2\\text{O)}_6]^{3+}$$"
  },
  {
    question_number: 40,
    question_text: "Pick out the correct statement with respect to $[\\text{Mn(CN)}_6]^{3-}$.",
    options: [
      "It is $sp^3d^2$ hybridised and tetrahedral.",
      "It is $d^2sp^3$ hybridised and octahedral.",
      "It is $dsp^2$ hybridised and square planar.",
      "It is $sp^3d^2$ hybridised and octahedral."
    ],
    correct_option: "B",
    solution_text: "In $[\\text{Mn(CN)}_6]^{3-}$, manganese has an oxidation state of $+3$ ($[\\text{Ar}]3d^4$). Cyanide ion ($\\text{CN}^-$) is a strong field ligand that forces pairing of two electrons in the $3d$ orbitals, leaving two inner $3d$ orbitals vacant. These two $3d$, one $4s$, and three $4p$ orbitals undergo $d^2sp^3$ hybridization to form an inner-orbital octahedral complex."
  },
  {
    question_number: 41,
    question_text: "The correct increasing order of trans-effect of the following species is",
    options: [
      "$\\text{NH}_3 > \\text{CN}^- > \\text{Br}^- > \\text{C}_6\\text{H}_5^-$",
      "$\\text{CN}^- > \\text{C}_6\\text{H}_5^- > \\text{Br}^- > \\text{NH}_3$",
      "$\\text{Br}^- > \\text{CN}^- > \\text{NH}_3 > \\text{C}_6\\text{H}_5^-$",
      "$\\text{CN}^- > \\text{Br}^- > \\text{C}_6\\text{H}_5^- > \\text{NH}_3$"
    ],
    correct_option: "B",
    solution_text: "The trans-effect order (the ability of a ligand to facilitate substitution of a ligand trans to itself in square planar complexes) is:\\n$$\\text{CN}^- > \\text{C}_6\\text{H}_5^- > \\text{NO}_2^- > \\text{I}^- > \\text{Br}^- > \\text{Cl}^- > \\text{py} > \\text{NH}_3 > \\text{H}_2\\text{O}$$\\nHence, the correct decreasing/relative order shown in option (B) is $\\text{CN}^- > \\text{C}_6\\text{H}_5^- > \\text{Br}^- > \\text{NH}_3$."
  },
  {
    question_number: 42,
    question_text: "Jahn-Teller effect is not observed in high spin complexes of",
    options: [
      "$d^7$",
      "$d^8$",
      "$d^4$",
      "$d^9$"
    ],
    correct_option: "B",
    solution_text: "The Jahn-Teller theorem states that any non-linear molecular system in a degenerate electronic ground state undergoes geometrical distortion to remove the degeneracy. In high-spin octahedral $d^8$ complexes, the electronic configuration is $t_{2g}^6 e_g^2$. The $t_{2g}$ set is completely filled and the $e_g$ set is symmetrically half-filled, so there is no electronic degeneracy ($A_{2g}$ state), and therefore no Jahn-Teller distortion occurs."
  },
  {
    question_number: 43,
    question_text: "Which of the following has longest $\\text{C}-\\text{O}$ bond length? (Free $\\text{C}-\\text{O}$ bond length in $\\text{CO}$ is $1.128\\text{ \\AA}$)",
    options: [
      "$[\\text{Fe(CO)}_4]^{2-}$",
      "$[\\text{Mn(CO)}_6]^+$",
      "$\\text{Ni(CO)}_4$",
      "$[\\text{Co(CO)}_4]^-$"
    ],
    correct_option: "A",
    solution_text: "In metal carbonyls, synergistic bonding occurs where metal $d$-orbitals donate electron density into the empty antibonding $\\pi^*$ orbitals of $\\text{CO}$ ($M \\rightarrow \\text{CO}$ back-donation). Higher negative charge on the metal complex increases electron density on the metal, maximizing back-donation into the $\\pi^*$ orbital of $\\text{CO}$. This significantly weakens the $\\text{C}-\\text{O}$ bond and increases its bond length. Since $[\\text{Fe(CO)}_4]^{2-}$ has the highest negative charge ($-2$), it exhibits the maximum back-bonding and thus the longest $\\text{C}-\\text{O}$ bond length."
  },
  {
    question_number: 44,
    question_text: "The hybridization involved in complex $[\\text{Ni(CN)}_4]^{2-}$ is (At. No. $\\text{Ni} = 28$)",
    options: [
      "$sp^3$",
      "$d^2sp^2$",
      "$d^2sp^3$",
      "$dsp^2$"
    ],
    correct_option: "D",
    solution_text: "Nickel has atomic number $28$ ($[\\text{Ar}]3d^8 4s^2$). In $[\\text{Ni(CN)}_4]^{2-}$, nickel is in $+2$ oxidation state ($3d^8$). Since cyanide ($\\text{CN}^-$) is a strong field ligand, it forces pairing of the two unpaired $3d$ electrons, creating one vacant $3d$ orbital. The vacant $3d$, $4s$, and two $4p$ orbitals undergo $dsp^2$ hybridization, yielding a square planar, diamagnetic geometry."
  },
  {
    question_number: 45,
    question_text: "The name of complex ion, $[\\text{Fe(CN)}_6]^{3-}$ is",
    options: [
      "hexacyanitoferrate (III) ion",
      "tricyanoferrate (III) ion",
      "hexacyanidoferrate (III) ion",
      "hexacyanoiron (III) ion."
    ],
    correct_option: "C",
    solution_text: "According to IUPAC 2005 recommendations:\\n- The cyanide ligand ($\\text{CN}^-$) is named cyanido.\\n- The complex is an anion, so the central metal ends with the suffix '-ate' derived from Latin ferrum: ferrate.\\n- The oxidation state of iron is $x + 6(-1) = -3 \\implies x = +3$, represented in Roman numerals as (III).\\nHence, the full IUPAC name is hexacyanidoferrate (III) ion."
  },
  {
    question_number: 46,
    question_text: "The sum of coordination number and oxidation number of the metal $\\text{M}$ in the complex $[\\text{M(en)}_2(\\text{C}_2\\text{O}_4)]\\text{Cl}$ (where en is ethylenediamine) is",
    options: [
      "6",
      "7",
      "8",
      "9"
    ],
    correct_option: "D",
    solution_text: "1. Coordination number (CN):\\nBoth ethylenediamine ($en$) and oxalate ($\\text{C}_2\\text{O}_4^{2-}$) are bidentate ligands:\\n$$\\text{CN} = (2 \\times 2) + (1 \\times 2) = 4 + 2 = 6$$\\n2. Oxidation state of metal $\\text{M}$ ($x$):\\n$$x + 2(0) + (-2) + (-1) = 0 \\implies x - 3 = 0 \\implies x = +3$$\\n3. Sum of coordination number and oxidation number:\\n$$\\text{Sum} = 6 + 3 = 9$$"
  },
  {
    question_number: 47,
    question_text: "Number of possible isomers for the complex $[\\text{Co(en)}_2\\text{Cl}_2]\\text{Cl}$ will be (en = ethylenediamine)",
    options: [
      "1",
      "3",
      "4",
      "2"
    ],
    correct_option: "B",
    solution_text: "The complex ion $[\\text{Co(en)}_2\\text{Cl}_2]^+$ exhibits both geometrical and optical isomerism:\\n1. Trans-isomer: Achiral (possesses a plane of symmetry and center of inversion), optically inactive (1 isomer).\\n2. Cis-isomer: Chiral (lacks plane and center of symmetry), exists as a non-superimposable pair of enantiomers ($d$-form and $l$-form) (2 isomers).\\n\\nTotal stereoisomers = $1\\text{ (trans)} + 2\\text{ (cis-enantiomers)} = 3$."
  },
  {
    question_number: 48,
    question_text: "Cobalt (III) chloride forms several octahedral complexes with ammonia. Which of the following will not give test for chloride ions with silver nitrate at $25^\\circ\\text{C}$?",
    options: [
      "$\\text{CoCl}_3 \\cdot 5\\text{NH}_3$",
      "$\\text{CoCl}_3 \\cdot 6\\text{NH}_3$",
      "$\\text{CoCl}_3 \\cdot 3\\text{NH}_3$",
      "$\\text{CoCl}_3 \\cdot 4\\text{NH}_3$"
    ],
    correct_option: "C",
    solution_text: "In $\\text{CoCl}_3 \\cdot 3\\text{NH}_3$, the coordination entity is $[\\text{Co(NH}_3)_3\\text{Cl}_3]$. All three chloride ligands satisfy both secondary and primary valencies inside the coordination sphere, so there are no ionizable chloride ions in solution to precipitate with silver nitrate."
  },
  {
    question_number: 49,
    question_text: "Which of these statements about $[\\text{Co(CN)}_6]^{3-}$ is true?",
    options: [
      "$[\\text{Co(CN)}_6]^{3-}$ has four unpaired electrons and will be in a high-spin configuration.",
      "$[\\text{Co(CN)}_6]^{3-}$ has no unpaired electrons and will be in a high-spin configuration.",
      "$[\\text{Co(CN)}_6]^{3-}$ has no unpaired electrons and will be in a low-spin configuration.",
      "$[\\text{Co(CN)}_6]^{3-}$ has four unpaired electrons and will be in a low-spin configuration."
    ],
    correct_option: "C",
    solution_text: "In $[\\text{Co(CN)}_6]^{3-}$, cobalt is in $+3$ oxidation state ($[\\text{Ar}]3d^6$). Cyanide is a strong field ligand, resulting in a large crystal field splitting ($\\Delta_o > P$). All six electrons pair up in the lower-energy $t_{2g}$ orbitals ($t_{2g}^6 e_g^0$), leaving zero unpaired electrons. Therefore, the complex is in a low-spin, diamagnetic configuration."
  },
  {
    question_number: 50,
    question_text: "Among the following complexes the one which shows zero crystal field stabilization energy (CFSE) is",
    options: [
      "$[\\text{Mn(H}_2\\text{O)}_6]^{3+}$",
      "$[\\text{Fe(H}_2\\text{O)}_6]^{3+}$",
      "$[\\text{Co(H}_2\\text{O)}_6]^{2+}$",
      "$[\\text{Co(H}_2\\text{O)}_6]^{3+}$"
    ],
    correct_option: "B",
    solution_text: "In $[\\text{Fe(H}_2\\text{O)}_6]^{3+}$, iron is $\\text{Fe}^{3+}$ ($3d^5$). Water is a weak field ligand, resulting in a high-spin configuration $t_{2g}^3 e_g^2$:\\n$$\\text{CFSE} = [3 \\times (-0.4) + 2 \\times (+0.6)]\\Delta_o = (-1.2 + 1.2)\\Delta_o = 0\\Delta_o$$\\nHence, it has zero crystal field stabilization energy."
  },
  {
    question_number: 51,
    question_text: "Which of the following complexes is used to be as an anticancer agent?",
    options: [
      "$\\text{mer-}[\\text{Co(NH}_3)_3\\text{Cl}_3]$",
      "$\\text{cis-}[\\text{PtCl}_2(\\text{NH}_3)_2]$",
      "$\\text{cis-}\\text{K}_2[\\text{PtCl}_2\\text{Br}_2]$",
      "$\\text{Na}_2\\text{CoCl}_4$"
    ],
    correct_option: "B",
    solution_text: "Cis-diamminedichloridoplatinum(II), known commonly as cisplatin ($\\text{cis-}[\\text{PtCl}_2(\\text{NH}_3)_2]$), is widely used in oncology as a chemotherapy drug to inhibit the proliferation of cancer cells."
  },
  {
    question_number: 52,
    question_text: "Nitrogen detection in an organic compound is carried out by Lassaigne's test. The blue colour formed corresponds to which of the following formulae?",
    options: [
      "$\\text{Fe}_3[\\text{Fe(CN)}_6]_2$",
      "$\\text{Fe}_4[\\text{Fe(CN)}_6]_3$",
      "$\\text{Fe}_4[\\text{Fe(CN)}_6]_2$",
      "$\\text{Fe}_3[\\text{Fe(CN)}_6]_3$"
    ],
    correct_option: "B",
    solution_text: "In Lassaigne's test for nitrogen, sodium cyanide reacts with ferrous sulfate and ferric ions to produce a Prussian blue precipitate of iron(III) hexacyanoferrate(II):\\n$$\\text{Fe}^{3+} + [\\text{Fe(CN)}_6]^{4-} \\rightarrow \\text{Fe}_4[\\text{Fe(CN)}_6]_3 \\cdot x\\text{H}_2\\text{O}$$"
  },
  {
    question_number: 53,
    question_text: "Crystal field splitting energy for high spin $d^4$ octahedral complex is",
    options: [
      "$-1.2\\Delta_o$",
      "$-0.6\\Delta_o$",
      "$-0.8\\Delta_o$",
      "$-1.6\\Delta_o$"
    ],
    correct_option: "B",
    solution_text: "For a high-spin $d^4$ octahedral complex, the 4 electrons occupy orbitals according to Hund's rule: $t_{2g}^3 e_g^1$:\\n$$\\text{CFSE} = [3 \\times (-0.4) + 1 \\times (+0.6)]\\Delta_o = (-1.2 + 0.6)\\Delta_o = -0.6\\Delta_o$$"
  },
  {
    question_number: 54,
    question_text: "In a particular isomer of $[\\text{Co(NH}_3)_4\\text{Cl}_2]^+$, the $\\text{Cl}-\\text{Co}-\\text{Cl}$ angle is $90^\\circ$, this isomer is known as",
    options: [
      "optical isomer",
      "cis-isomer",
      "position isomer",
      "linkage isomer."
    ],
    correct_option: "B",
    solution_text: "In an octahedral coordination complex of formula $[\\text{Ma}_4\\text{b}_2]$, when the two identical ligands 'b' occupy adjacent positions subtending a $90^\\circ$ bond angle at the central metal ion, the isomer is termed the cis-isomer. When they occupy opposite positions at $180^\\circ$, it is the trans-isomer."
  },
  {
    question_number: 55,
    question_text: "The anion of acetylacetone (acac) forms $\\text{Co(acac)}_3$ chelate with $\\text{Co}^{3+}$. The rings of the chelate are",
    options: [
      "five membered",
      "four membered",
      "six membered",
      "three membered."
    ],
    correct_option: "C",
    solution_text: "Acetylacetonate ($\\text{acac}^-$) is a bidentate ligand coordinating through two oxygen atoms. The chelate ring formed includes the central metal atom and five atoms from the ligand: $\\text{Co}-\\text{O}-\\text{C}-\\text{CH}-\\text{C}-\\text{O}$, constituting a six-membered ring."
  },
  {
    question_number: 56,
    question_text: "The correct IUPAC name for $[\\text{CrF}_2(\\text{en})_2]\\text{Cl}$ is",
    options: [
      "chloro difluorido ethylene diaminechromium (III) chloride",
      "difluoridobis (ethylene diamine) chromium (III) chloride",
      "difluorobis-(ethylene diamine) chromium (III) chloride",
      "chloro difluoridobis (ethylene diamine) chromium (III)"
    ],
    correct_option: "B",
    solution_text: "According to IUPAC nomenclature rules for coordination compounds:\\n- Ligands in the coordination sphere are listed in alphabetical order: 'difluorido' before 'bis(ethylenediamine)'.\\n- The central metal is chromium with oxidation state $+3$: $x + 2(-1) + 2(0) + (-1) = 0 \\implies x = +3$.\\n- The counter anion is chloride.\\nThus, the correct name is difluoridobis (ethylene diamine) chromium (III) chloride."
  },
  {
    question_number: 57,
    question_text: "Which among the following is a paramagnetic complex?",
    options: [
      "$[\\text{Co(NH}_3)_6]^{3+}$",
      "$[\\text{Pt(en)Cl}_2]$",
      "$[\\text{CoBr}_4]^{2-}$",
      "$\\text{Mo(CO)}_6$"
    ],
    correct_option: "C",
    solution_text: "In $[\\text{CoBr}_4]^{2-}$, cobalt has an oxidation state of $+2$ ($[\\text{Ar}]3d^7$). Bromide is a weak field ligand forming a tetrahedral complex ($e^4 t_2^3$). With 3 unpaired electrons ($n = 3$), the complex is paramagnetic.\\nAll other complexes are diamagnetic ($n = 0$): $[\\text{Co(NH}_3)_6]^{3+}$ ($d^6$ low spin), $[\\text{Pt(en)Cl}_2]$ ($5d^8$ square planar), and $\\text{Mo(CO)}_6$ ($4d^6$ low spin)."
  },
  {
    question_number: 58,
    question_text: "Which is diamagnetic?",
    options: [
      "$[\\text{CoF}_6]^{3-}$",
      "$[\\text{Ni(CN)}_4]^{2-}$",
      "$[\\text{NiCl}_4]^{2-}$",
      "$[\\text{Fe(CN)}_6]^{3-}$"
    ],
    correct_option: "B",
    solution_text: "In $[\\text{Ni(CN)}_4]^{2-}$, nickel is $\\text{Ni}^{2+}$ ($[\\text{Ar}]3d^8$). Cyanide is a strong field ligand causing all 8 electrons to pair up in four $3d$ orbitals. The remaining empty $3d$ orbital hybridizes with $4s$ and two $4p$ orbitals ($dsp^2$, square planar). Because there are no unpaired electrons ($n = 0$), $[\\text{Ni(CN)}_4]^{2-}$ is diamagnetic."
  },
  {
    question_number: 59,
    question_text: "A magnetic moment at $1.73\\text{ BM}$ will be shown by one among of the following",
    options: [
      "$\\text{TiCl}_4$",
      "$[\\text{CoCl}_6]^{4-}$",
      "$[\\text{Cu(NH}_3)_4]^{2+}$",
      "$[\\text{Ni(CN)}_4]^{2-}$"
    ],
    correct_option: "C",
    solution_text: "A magnetic moment $\\mu = 1.73\\text{ BM}$ corresponds to $n = 1$ unpaired electron ($\\mu = \\sqrt{1(3)} = \\sqrt{3} \\approx 1.732\\text{ BM}$):\\n- $\\text{TiCl}_4$: $\\text{Ti}^{4+} (3d^0) \\implies n = 0$\\n- $[\\text{CoCl}_6]^{4-}$: $\\text{Co}^{2+} (3d^7) \\implies n = 3$\\n- $[\\text{Cu(NH}_3)_4]^{2+}$: $\\text{Cu}^{2+} (3d^9) \\implies n = 1$\\n- $[\\text{Ni(CN)}_4]^{2-}$: $\\text{Ni}^{2+} (3d^8) \\implies n = 0$\\n\\nHence, $[\\text{Cu(NH}_3)_4]^{2+}$ has a magnetic moment of $1.73\\text{ BM}$."
  },
  {
    question_number: 60,
    question_text: "An excess of $\\text{AgNO}_3$ is added to $100\\text{ mL}$ of a $0.01\\text{ M}$ solution of dichlorotetraaquachromium (III) chloride. The number of moles of $\\text{AgCl}$ precipitated would be",
    options: [
      "$0.003$",
      "$0.01$",
      "$0.001$",
      "$0.002$"
    ],
    correct_option: "C",
    solution_text: "The coordination formula of dichlorotetraaquachromium(III) chloride is $[\\text{Cr(H}_2\\text{O})_4\\text{Cl}_2]\\text{Cl}$. Only the chloride ion present in the ionization sphere (outside the coordination sphere) ionizes in aqueous solution to react with $\\text{AgNO}_3$:\\n$$\\text{Moles of complex} = M \\times V = 0.01\\text{ mol/L} \\times 0.1\\text{ L} = 0.001\\text{ mol}$$\\nSince each mole of complex produces 1 mole of free chloride ions, $0.001\\text{ mole of AgCl}$ is precipitated."
  }
];

