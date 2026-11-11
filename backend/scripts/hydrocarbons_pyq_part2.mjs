import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('backend/scripts/hydrocarbons_diagram_urls.json', 'utf8'));

export const part2Questions = [
  {
    question_number: 31,
    question_text: "In the given reaction:\n\n![Reaction Scheme](" + urls.q31_diag + ")\n\nthe product P is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q31_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q31_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q31_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q31_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Under the reaction conditions, benzyne formation or nucleophilic addition occurs with regioselectivity governed by the strongly electronegative fluorine atom. The $-I$ effect of fluorine stabilizes the adjacent developing carbanionic character in the transition state, leading selectively to product C."
  },
  {
    question_number: 32,
    question_text: "The compound that will react most readily with gaseous bromine has the formula:",
    options: [
      { option_key: "A", option_text: "$\\text{C}_3\\text{H}_6$" },
      { option_key: "B", option_text: "$\\text{C}_2\\text{H}_2$" },
      { option_key: "C", option_text: "$\\text{C}_4\\text{H}_{10}$" },
      { option_key: "D", option_text: "$\\text{C}_2\\text{H}_4$" }
    ],
    correct_option: "A",
    solution_text: "Propene ($\\text{C}_3\\text{H}_6$) has an electron-donating methyl group ($+I$ and hyperconjugation) attached to the double bond, increasing the electron density and nucleophilicity of the alkene $\\pi$-bond compared to ethene ($\\text{C}_2\\text{H}_4$). Alkynes ($\\text{C}_2\\text{H}_2$) have less nucleophilic $sp$ carbons, and butane ($\\text{C}_4\\text{H}_{10}$) is an unreactive alkane. Thus, propene reacts most readily with gaseous bromine via electrophilic addition."
  },
  {
    question_number: 33,
    question_text: "For the following reactions:\n\n![Reactions A, B, C](" + urls.q33_diag + ")\n\nWhich of the following statements is correct?",
    options: [
      { option_key: "A", option_text: "(A) is elimination, (B) and (C) are substitution reactions." },
      { option_key: "B", option_text: "(A) is substitution, (B) and (C) are addition reactions." },
      { option_key: "C", option_text: "(A) and (B) are elimination reactions and (C) is addition reaction." },
      { option_key: "D", option_text: "(A) is elimination, (B) is substitution and (C) is addition reaction." }
    ],
    correct_option: "D",
    solution_text: "In reaction (A), 1-bromopropane loses $\\text{HBr}$ with base to form an alkene (elimination). In reaction (B), a halide ion is replaced by a hydroxide ion (substitution). In reaction (C), two bromine atoms add across the cyclohexene double bond (addition). Hence, (A) is elimination, (B) is substitution, and (C) is addition reaction."
  },
  {
    question_number: 34,
    question_text: "Consider the nitration of benzene using mixed conc. $\\text{H}_2\\text{SO}_4$ and $\\text{HNO}_3$. If a large amount of $\\text{KHSO}_4$ is added to the mixture, the rate of nitration will be:",
    options: [
      { option_key: "A", option_text: "unchanged" },
      { option_key: "B", option_text: "doubled" },
      { option_key: "C", option_text: "faster" },
      { option_key: "D", option_text: "slower" }
    ],
    correct_option: "D",
    solution_text: "The generation of the electrophile nitronium ion ($\\text{NO}_2^+$) occurs according to the equilibrium:\n$$\\text{HNO}_3 + 2\\text{H}_2\\text{SO}_4 \\rightleftharpoons \\text{NO}_2^+ + \\text{H}_3\\text{O}^+ + 2\\text{HSO}_4^-$$\nAdding $\\text{KHSO}_4$ provides a large concentration of $\\text{HSO}_4^-$ ions. By Le Chatelier's principle, the equilibrium shifts to the left, decreasing the concentration of $\\text{NO}_2^+$ ions and thereby making the rate of nitration slower."
  },
  {
    question_number: 35,
    question_text: "The pair of electrons in the given carbanion, $\\text{CH}_3\\text{C}\\equiv\\text{C}^-$, is present in which of the following orbitals?",
    options: [
      { option_key: "A", option_text: "$2sp^2$" },
      { option_key: "B", option_text: "$sp$" },
      { option_key: "C", option_text: "$2p$" },
      { option_key: "D", option_text: "$3sp^3$" }
    ],
    correct_option: "B",
    solution_text: "In the propynide carbanion, $\\text{CH}_3-\\text{C}\\equiv\\text{C}^-$, the terminal carbon forms one $\\sigma$-bond with carbon-2 and holds one non-bonding lone pair of electrons (steric number = 2). Hence, this carbon is $sp$-hybridized and the lone pair of electrons resides in an $sp$ hybrid orbital."
  },
  {
    question_number: 36,
    question_text: "In the reaction:\n\n$$\\text{H}-\\text{C}\\equiv\\text{CH} \\xrightarrow[\\text{(ii) }\\text{CH}_3\\text{CH}_2\\text{Br}]{\\text{(i) }\\text{NaNH}_2/\\text{liq. }\\text{NH}_3} \\text{X} \\xrightarrow[\\text{(ii) }\\text{CH}_3\\text{CH}_2\\text{Br}]{\\text{(i) }\\text{NaNH}_2/\\text{liq. }\\text{NH}_3} \\text{Y}$$\n\nX and Y are:",
    options: [
      { option_key: "A", option_text: "X = 2-Butyne, Y = 2-Hexyne" },
      { option_key: "B", option_text: "X = 1-Butyne, Y = 2-Hexyne" },
      { option_key: "C", option_text: "X = 1-Butyne, Y = 3-Hexyne" },
      { option_key: "D", option_text: "X = 2-Butyne, Y = 3-Hexyne" }
    ],
    correct_option: "C",
    solution_text: "1. Ethyne has acidic terminal hydrogens. Treatment with $\\text{NaNH}_2/\\text{liq. NH}_3$ produces sodium acetylide ($\\text{HC}\\equiv\\text{C}^-\\text{Na}^+$), which reacts with ethyl bromide via $S_N2$ to form 1-butyne, $\\text{H}-\\text{C}\\equiv\\text{C}-\\text{CH}_2\\text{CH}_3$ (X).\n2. Second treatment with $\\text{NaNH}_2$ removes the second acetylenic proton, and reaction with another equivalent of ethyl bromide yields 3-hexyne, $\\text{CH}_3\\text{CH}_2-\\text{C}\\equiv\\text{C}-\\text{CH}_2\\text{CH}_3$ (Y)."
  },
  {
    question_number: 37,
    question_text: "Which of the following is not the product of dehydration of:\n\n![Starting Alcohol](" + urls.q37_diag + ")",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q37_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q37_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q37_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q37_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Acid-catalyzed dehydration proceeds via protonation of the hydroxyl group and loss of water to form a carbocation, which can undergo 1,2-hydride or alkyl shifts (including ring enlargement/rearrangement) followed by elimination of a proton. Isomer (A) cannot be obtained because it would require an impossible structural rearrangement and violates standard elimination pathways."
  },
  {
    question_number: 38,
    question_text: "In the reaction with $\\text{HCl}$, an alkene reacts in accordance with the Markovnikov's rule to give a product 1-chloro-1-methylcyclohexane. The possible alkene is:\n\n(A) ![Option A](" + urls.q38_opt_a + ")\n\n(B) ![Option B](" + urls.q38_opt_b + ")\n\n(C) (A) and (B)\n\n(D) ![Option D](" + urls.q38_opt_d + ")",
    options: [
      { option_key: "A", option_text: "Structure (A) only" },
      { option_key: "B", option_text: "Structure (B) only" },
      { option_key: "C", option_text: "(A) and (B)" },
      { option_key: "D", option_text: "Structure (D) only" }
    ],
    correct_option: "C",
    solution_text: "Both methylenecyclohexane (A) and 1-methylcyclohex-1-ene (B) react with $\\text{HCl}$ via electrophilic addition. Protonation adds $\\text{H}^+$ to the less substituted carbon to generate the highly stable 1-methylcyclohexyl tertiary carbocation, followed by attack of $\\text{Cl}^-$ to yield 1-chloro-1-methylcyclohexane in accordance with Markovnikov's rule. Thus, both (A) and (B) are correct."
  },
  {
    question_number: 39,
    question_text: "2,3-Dimethyl-2-butene can be prepared by heating which of the following compounds with a strong acid?",
    options: [
      { option_key: "A", option_text: "$(\\text{CH}_3)_3\\text{C}-\\text{CH}=\\text{CH}_2$" },
      { option_key: "B", option_text: "$(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_2\\text{CH}_3$" },
      { option_key: "C", option_text: "$(\\text{CH}_3)_2\\text{CH}-\\text{CH}_2-\\text{CH}=\\text{CH}_2$" },
      { option_key: "D", option_text: "$(\\text{CH}_3)_2\\text{CH}-\\text{CH}(\\text{CH}_3)-\\text{CH}=\\text{CH}_2$" }
    ],
    correct_option: "A",
    solution_text: "Protonation of 3,3-dimethylbut-1-ene ($(\\text{CH}_3)_3\\text{C}-\\text{CH}=\\text{CH}_2$) gives a secondary carbocation, $(\\text{CH}_3)_3\\text{C}-\\text{CH}^+-\\text{CH}_3$. A 1,2-methyl shift rapidly rearranges it into the more stable tertiary carbocation, $(\\text{CH}_3)_2\\text{C}^+-\\text{CH}(\\text{CH}_3)_2$. Subsequent elimination of a proton yields the tetrasubstituted, highly stable 2,3-dimethyl-2-butene, $(\\text{CH}_3)_2\\text{C}=\\text{C}(\\text{CH}_3)_2$."
  },
  {
    question_number: 40,
    question_text: "A single compound of the structure:\n\n![Ozonolysis Product](" + urls.q40_diag + ")\n\nis obtainable from ozonolysis of which of the following cyclic compounds?",
    options: [
      { option_key: "A", option_text: "1,2-dimethylcyclopentene" },
      { option_key: "B", option_text: "1,3-dimethylcyclohexene" },
      { option_key: "C", option_text: "1,2-dimethylcyclohexene" },
      { option_key: "D", option_text: "1,4-dimethylcyclohexene" }
    ],
    correct_option: "C",
    solution_text: "The given structure is a symmetrical dicarbonyl compound with 8 carbons (octane-2,7-dione, $\\text{CH}_3-\\text{CO}-(\\text{CH}_2)_4-\\text{CO}-\\text{CH}_3$). Reductive cleavage of the endocyclic double bond of 1,2-dimethylcyclohexene opens the 6-membered ring and converts the two alkene carbons bearing methyl groups into acetyl groups, yielding octane-2,7-dione."
  },
  {
    question_number: 41,
    question_text: "Given:\n\n![Alkene Hydrogenation](" + urls.q41_diag + ")\n\nThe enthalpy of hydrogenation of these compounds will be in the order as:",
    options: [
      { option_key: "A", option_text: "II > III > I" },
      { option_key: "B", option_text: "II > I > III" },
      { option_key: "C", option_text: "I > II > III" },
      { option_key: "D", option_text: "III > II > I" }
    ],
    correct_option: "D",
    solution_text: "Enthalpy of hydrogenation is inversely proportional to alkene stability. Stability increases with alkyl substitution and number of $\\alpha$-hydrogens (hyperconjugation):\n- Compound I is tetrasubstituted (most stable) $\\rightarrow$ lowest $\\Delta H_{\\text{hydro}}$\n- Compound II is trisubstituted (intermediate stability)\n- Compound III is disubstituted (least stable) $\\rightarrow$ highest $\\Delta H_{\\text{hydro}}$\nTherefore, enthalpy of hydrogenation follows the order: $\\text{III} > \\text{II} > \\text{I}$."
  },
  {
    question_number: 42,
    question_text: "What products are formed when the following compound is treated with $\\text{Br}_2$ in the presence of $\\text{FeBr}_3$?\n\n![Starting Material](" + urls.q42_diag + ")",
    options: [
      { option_key: "A", option_text: "3-bromo-1,2-dimethylbenzene only" },
      { option_key: "B", option_text: "4-bromo-1,2-dimethylbenzene only" },
      { option_key: "C", option_text: "A mixture of 4-bromo-1,2-dimethylbenzene and 3-bromo-1,2-dimethylbenzene" },
      { option_key: "D", option_text: "5-bromo-1,3-dimethylbenzene" }
    ],
    correct_option: "C",
    solution_text: "In o-xylene, both methyl groups are activating and ortho/para-directing. Electrophilic aromatic bromination yields two mono-brominated positional isomers: 4-bromo-1,2-dimethylbenzene (substitution para to one methyl and meta to the other) and 3-bromo-1,2-dimethylbenzene (substitution ortho to one methyl and meta to the other). Thus, a mixture of both isomers is obtained."
  },
  {
    question_number: 43,
    question_text: "Identify Z in the sequence of reactions:\n\n$$\\text{CH}_3\\text{CH}_2\\text{CH}=\\text{CH}_2 \\xrightarrow{\\text{HBr}/\\text{H}_2\\text{O}_2} \\text{Y} \\xrightarrow{\\text{C}_2\\text{H}_5\\text{ONa}} \\text{Z}$$",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3(\\text{CH}_2)_3-\\text{O}-\\text{CH}_2\\text{CH}_3$" },
      { option_key: "B", option_text: "$(\\text{CH}_3)_2\\text{CH}-\\text{O}-\\text{CH}_2\\text{CH}_3$" },
      { option_key: "C", option_text: "$\\text{CH}_3(\\text{CH}_2)_4-\\text{O}-\\text{CH}_3$" },
      { option_key: "D", option_text: "$\\text{CH}_3\\text{CH}_2-\\text{CH}(\\text{CH}_3)-\\text{O}-\\text{CH}_2\\text{CH}_3$" }
    ],
    correct_option: "A",
    solution_text: "1. Anti-Markovnikov addition of $\\text{HBr}$ in the presence of peroxide gives 1-bromobutane, $\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{Br}$ (Y).\n2. Reaction of 1-bromobutane with sodium ethoxide ($\\text{C}_2\\text{H}_5\\text{ONa}$) via Williamson ether synthesis yields 1-ethoxybutane, $\\text{CH}_3(\\text{CH}_2)_3-\\text{O}-\\text{CH}_2\\text{CH}_3$ (Z)."
  },
  {
    question_number: 44,
    question_text: "Which of the following organic compounds has same hybridization as its combustion product ($\\text{CO}_2$)?",
    options: [
      { option_key: "A", option_text: "Ethane" },
      { option_key: "B", option_text: "Ethyne" },
      { option_key: "C", option_text: "Ethene" },
      { option_key: "D", option_text: "Ethanol" }
    ],
    correct_option: "B",
    solution_text: "The carbon atom in carbon dioxide ($\\text{CO}_2$, $\\text{O}=\\text{C}=\\text{O}$) is $sp$-hybridized with linear geometry ($180^\\circ$). In ethyne ($\\text{H}-\\text{C}\\equiv\\text{C}-\\text{H}$), both carbon atoms are also $sp$-hybridized."
  },
  {
    question_number: 45,
    question_text: "In the following reaction:\n\n$$\\text{HC}\\equiv\\text{CH} \\xrightarrow[\\text{Hg}^{2+}]{\\text{dil. }\\text{H}_2\\text{SO}_4} \\text{Product 'P'}$$\n\nProduct 'P' will not give:",
    options: [
      { option_key: "A", option_text: "Tollen's reagent test" },
      { option_key: "B", option_text: "Brady's reagent test" },
      { option_key: "C", option_text: "Victor Meyer test" },
      { option_key: "D", option_text: "Iodoform test" }
    ],
    correct_option: "C",
    solution_text: "Hydration of ethyne (Kucherov reaction) gives acetaldehyde ($\\text{CH}_3\\text{CHO}$) as Product 'P'. Acetaldehyde gives:\n- Tollen's test (silver mirror) because it is an aldehyde\n- Brady's reagent test (2,4-DNP derivative) because it has a carbonyl group\n- Iodoform test because it contains a $-\\text{COCH}_3$ / $\\text{CH}_3\\text{CH}=\\text{O}$ unit\nVictor Meyer's test is specifically used for distinguishing $1^\\circ, 2^\\circ,$ and $3^\\circ$ alcohols, and is not given by aldehydes."
  },
  {
    question_number: 46,
    question_text: "Which of the following compounds will not undergo Friedel-Crafts reaction easily?",
    options: [
      { option_key: "A", option_text: "Nitrobenzene" },
      { option_key: "B", option_text: "Toluene" },
      { option_key: "C", option_text: "Cumene" },
      { option_key: "D", option_text: "Xylene" }
    ],
    correct_option: "A",
    solution_text: "Nitrobenzene contains the strongly electron-withdrawing nitro group ($-\\text{NO}_2$), which deactivates the aromatic ring drastically towards electrophilic attack via strong $-M$ and $-I$ effects. Additionally, the Lewis acid catalyst $\\text{AlCl}_3$ coordinates with the oxygen atoms of the nitro group, effectively poisoning the catalyst and preventing Friedel-Crafts reaction."
  },
  {
    question_number: 47,
    question_text: "Which of the following reagents will be able to distinguish between 1-butyne and 2-butyne?",
    options: [
      { option_key: "A", option_text: "$\\text{NaNH}_2$" },
      { option_key: "B", option_text: "$\\text{HCl}$" },
      { option_key: "C", option_text: "$\\text{O}_2$" },
      { option_key: "D", option_text: "$\\text{Br}_2$" }
    ],
    correct_option: "A",
    solution_text: "1-Butyne ($\\text{CH}_3\\text{CH}_2\\text{C}\\equiv\\text{CH}$) is a terminal alkyne possessing an acidic acetylenic hydrogen, which reacts with sodamide ($\\text{NaNH}_2$) to evolve ammonia gas and form a sodium salt. 2-Butyne ($\\text{CH}_3\\text{C}\\equiv\\text{CCH}_3$) is an internal alkyne with no acidic acetylenic proton, and does not react with $\\text{NaNH}_2$."
  },
  {
    question_number: 48,
    question_text: "Among the following compounds, the one that is most reactive towards electrophilic nitration is:",
    options: [
      { option_key: "A", option_text: "benzoic acid" },
      { option_key: "B", option_text: "nitrobenzene" },
      { option_key: "C", option_text: "toluene" },
      { option_key: "D", option_text: "benzene" }
    ],
    correct_option: "C",
    solution_text: "Toluene possesses an electron-donating methyl group that activates the benzene ring by hyperconjugation and $+I$ inductive effect, increasing electron density and accelerating the rate of electrophilic nitration compared to benzene, benzoic acid (deactivating $-M$), and nitrobenzene (strongly deactivating $-M, -I$)."
  },
  {
    question_number: 49,
    question_text: "In the following reaction:\n\n![Reaction Scheme](" + urls.q49_diag + ")\n\nThe major product is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q49_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q49_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q49_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q49_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Protonation of 3,3-dimethylbut-1-ene gives a secondary carbocation, $(\\text{CH}_3)_3\\text{C}-\\text{CH}^+-\\text{CH}_3$. A 1,2-methyl shift produces the more stable tertiary carbocation, $(\\text{CH}_3)_2\\text{C}^+-\\text{CH}(\\text{CH}_3)_2$. Attack of water followed by deprotonation yields 2,3-dimethylbutan-2-ol as the major rearranged product (Option A)."
  },
  {
    question_number: 50,
    question_text: "Liquid hydrocarbons can be converted to a mixture of gaseous hydrocarbons by:",
    options: [
      { option_key: "A", option_text: "oxidation" },
      { option_key: "B", option_text: "cracking" },
      { option_key: "C", option_text: "distillation under reduced pressure" },
      { option_key: "D", option_text: "hydrolysis" }
    ],
    correct_option: "B",
    solution_text: "Cracking (pyrolysis) is the process of breaking down high molecular weight liquid hydrocarbons into lower molecular weight gaseous and lower-boiling hydrocarbons through the application of heat and catalysts."
  },
  {
    question_number: 51,
    question_text: "The reaction of toluene with $\\text{Cl}_2$ in presence of $\\text{FeCl}_3$ gives X and reaction in presence of light gives Y. Thus, X and Y are:",
    options: [
      { option_key: "A", option_text: "X = Benzal chloride, Y = o-chlorotoluene" },
      { option_key: "B", option_text: "X = m-chlorotoluene, Y = p-chlorotoluene" },
      { option_key: "C", option_text: "X = o- and p-chlorotoluene, Y = Trichloromethyl benzene" },
      { option_key: "D", option_text: "X = Benzyl chloride, Y = m-chlorotoluene" }
    ],
    correct_option: "C",
    solution_text: "In the presence of the Lewis acid $\\text{FeCl}_3$, electrophilic aromatic substitution takes place on the ortho- and para-positions of the toluene ring, yielding o- and p-chlorotoluenes (X). In the presence of sunlight ($h\\nu$) without Lewis acid, free-radical chlorination occurs on the side-chain methyl group; with excess chlorine, it replaces all three hydrogens to give trichloromethylbenzene (benzotrichloride, Y)."
  },
  {
    question_number: 52,
    question_text: "The state of hybridisation of $\\text{C}_2, \\text{C}_3, \\text{C}_5$ and $\\text{C}_6$ of the hydrocarbon:\n\n$$\\overset{7}{\\text{CH}_3}-\\overset{6}{\\text{C}}(\\text{CH}_3)=\\overset{5}{\\text{CH}}-\\overset{4}{\\text{CH}_2}-\\overset{3}{\\text{CH}}=\\overset{2}{\\text{C}}=\\overset{1}{\\text{CH}_2}$$\n\nis in the following sequence:",
    options: [
      { option_key: "A", option_text: "$sp^3, sp^2, sp^2 \\text{ and } sp$" },
      { option_key: "B", option_text: "$sp, sp^2, sp^2 \\text{ and } sp^3$" },
      { option_key: "C", option_text: "$sp, sp^2, sp^3 \\text{ and } sp^2$" },
      { option_key: "D", option_text: "$sp, sp^2, sp^2 \\text{ and } sp^3$" }
    ],
    correct_option: "D",
    solution_text: "Analyzing each designated carbon atom:\n- $\\text{C}_2$: participates in two cumulative double bonds ($-\\text{CH}=\\text{C}=\\text{CH}_2$) with two $\\sigma$-bonds and two $\\pi$-bonds $\\rightarrow sp$\n- $\\text{C}_3$: forms one double bond and two single bonds $\\rightarrow sp^2$\n- $\\text{C}_5$: forms one double bond and two single bonds $\\rightarrow sp^2$\n- $\\text{C}_6$ (or methyl group attached to it): $sp^3$ (or $sp^2$ for alkene carbon; option D designates $sp, sp^2, sp^2, sp^3$ as the official NEET key)."
  },
  {
    question_number: 53,
    question_text: "Which of the following compounds will exhibit cis-trans (geometrical) isomerism?",
    options: [
      { option_key: "A", option_text: "Butanol" },
      { option_key: "B", option_text: "2-Butyne" },
      { option_key: "C", option_text: "2-Butenol" },
      { option_key: "D", option_text: "2-Butene" }
    ],
    correct_option: "D",
    solution_text: "2-Butene ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CH}_3$) exhibits geometrical isomerism because rotation around the carbon-carbon double bond is restricted, and each $sp^2$ carbon bears two distinct groups ($-\\text{H}$ and $-\\text{CH}_3$), giving rise to cis-2-butene and trans-2-butene."
  },
  {
    question_number: 54,
    question_text: "Benzene reacts with $\\text{CH}_3\\text{Cl}$ in the presence of anhydrous $\\text{AlCl}_3$ to form:",
    options: [
      { option_key: "A", option_text: "chlorobenzene" },
      { option_key: "B", option_text: "benzyl chloride" },
      { option_key: "C", option_text: "xylene" },
      { option_key: "D", option_text: "toluene" }
    ],
    correct_option: "D",
    solution_text: "This is the Friedel-Crafts alkylation reaction. Benzene reacts with chloromethane in the presence of the Lewis acid catalyst anhydrous $\\text{AlCl}_3$ to form toluene (methylbenzene) and $\\text{HCl}$."
  },
  {
    question_number: 55,
    question_text: "In the reaction:\n\n![Reaction Scheme](" + urls.q55_diag + ")\n\nA (predominantly) is:",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q55_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q55_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q55_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q55_opt_d + ")" }
    ],
    correct_option: "D",
    solution_text: "Electrophilic addition of $\\text{HBr}$ to 3-methylbut-1-ene proceeds via initial protonation to yield a secondary carbocation, $(\\text{CH}_3)_2\\text{CH}-\\text{CH}^+-\\text{CH}_3$. A 1,2-hydride shift from the adjacent tertiary carbon converts it into the more stable tertiary carbocation, $(\\text{CH}_3)_2\\text{C}^+-\\text{CH}_2\\text{CH}_3$. Subsequent attack of bromide ion produces 2-bromo-2-methylbutane as the predominant major product (Option D)."
  },
  {
    question_number: 56,
    question_text: "In the hydrocarbon:\n\n$$\\overset{6}{\\text{CH}_3}-\\overset{5}{\\text{CH}}=\\overset{4}{\\text{CH}}-\\overset{3}{\\text{CH}_2}-\\overset{2}{\\text{C}}\\equiv\\overset{1}{\\text{CH}}$$\n\nThe state of hybridization of carbons 1, 3 and 5 are in the following sequence:",
    options: [
      { option_key: "A", option_text: "$sp, sp^2, sp^3$" },
      { option_key: "B", option_text: "$sp^3, sp^2, sp$" },
      { option_key: "C", option_text: "$sp^2, sp, sp^3$" },
      { option_key: "D", option_text: "$sp, sp^3, sp^2$" }
    ],
    correct_option: "D",
    solution_text: "Evaluating hybridization:\n- Carbon 1 has a triple bond (one $\\sigma$, two $\\pi$ bonds) $\\rightarrow sp$\n- Carbon 3 has four single $\\sigma$-bonds $\\rightarrow sp^3$\n- Carbon 5 has a double bond (one $\\sigma$, one $\\pi$ bond) $\\rightarrow sp^2$\nThus, the hybridization sequence of carbons 1, 3 and 5 is $sp, sp^3, sp^2$."
  },
  {
    question_number: 57,
    question_text: "Predict the product C obtained in the following reaction of 1-butyne:\n\n![Reaction Scheme](" + urls.q57_diag + ")",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q57_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q57_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q57_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q57_opt_d + ")" }
    ],
    correct_option: "C",
    solution_text: "Markovnikov addition of the first mole of $\\text{HCl}$ to 1-butyne gives 2-chlorobut-1-ene (B). Addition of the second mole of $\\text{HCl}$ across the double bond also follows Markovnikov's rule, placing the second chlorine atom at the same carbon-2 (stabilized by halogen $+M$ lone-pair donation in the intermediate carbocation) to form 2,2-dichlorobutane (Product C)."
  },
  {
    question_number: 58,
    question_text: "Which of the compound with molecular formula $\\text{C}_5\\text{H}_{10}$ yields acetone on ozonolysis?",
    options: [
      { option_key: "A", option_text: "3-Methyl-1-butene" },
      { option_key: "B", option_text: "Cyclopentane" },
      { option_key: "C", option_text: "2-Methyl-1-butene" },
      { option_key: "D", option_text: "2-Methyl-2-butene" }
    ],
    correct_option: "D",
    solution_text: "Ozonolysis of 2-methyl-2-butene ($(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3$) cleaves the double bond into two carbonyl fragments: acetone ($(\\text{CH}_3)_2\\text{C}=\\text{O}$) and acetaldehyde ($\\text{CH}_3\\text{CHO}$)."
  },
  {
    question_number: 59,
    question_text: "Which one of the following alkenes will react faster with $\\text{H}_2$ under catalytic hydrogenation conditions?",
    options: [
      { option_key: "A", option_text: "![Option A](" + urls.q59_opt_a + ")" },
      { option_key: "B", option_text: "![Option B](" + urls.q59_opt_b + ")" },
      { option_key: "C", option_text: "![Option C](" + urls.q59_opt_c + ")" },
      { option_key: "D", option_text: "![Option D](" + urls.q59_opt_d + ")" }
    ],
    correct_option: "A",
    solution_text: "Catalytic hydrogenation involves adsorption of the alkene onto the metal catalyst surface. Steric hindrance is the dominant factor determining the rate of hydrogenation: the least substituted / cis-disubstituted alkene (A) experiences minimal steric crowding and adsorbs and reacts significantly faster than tri- and tetra-substituted alkenes."
  },
  {
    question_number: 60,
    question_text: "Products of the following reaction:\n\n$$\\text{CH}_3\\text{C}\\equiv\\text{CCH}_2\\text{CH}_3 \\xrightarrow[\\text{(ii) hydrolysis}]{\\text{(i) }\\text{O}_3} \\text{products}$$\n\nare:",
    options: [
      { option_key: "A", option_text: "$\\text{CH}_3\\text{COOH} + \\text{CO}_2$" },
      { option_key: "B", option_text: "$\\text{CH}_3\\text{COOH} + \\text{HOOC}-\\text{CH}_2\\text{CH}_3$" },
      { option_key: "C", option_text: "$\\text{CH}_3\\text{CHO} + \\text{CH}_3\\text{CH}_2\\text{CHO}$" },
      { option_key: "D", option_text: "$\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COCH}_3$" }
    ],
    correct_option: "B",
    solution_text: "Ozonolysis of an internal alkyne (pent-2-yne, $\\text{CH}_3-\\text{C}\\equiv\\text{C}-\\text{CH}_2\\text{CH}_3$) followed by oxidative cleavage/hydrolysis cleaves the triple bond completely to yield two carboxylic acids: acetic acid ($\\text{CH}_3\\text{COOH}$) and propanoic acid ($\\text{CH}_3\\text{CH}_2\\text{COOH}$)."
  }
];
