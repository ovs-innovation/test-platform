// Ionic Equilibrium PYQ - Part 4 (Q71 - Q89)

export const part4Questions = [
  {
    question_number: 71,
    question_text: "Conjugate acid of $\\text{NH}_2^-$ is:",
    options: [
      "$\\text{NH}_4\\text{OH}$",
      "$\\text{NH}_4^+$",
      "$\\text{NH}_2^-$",
      "$\\text{NH}_3$"
    ],
    correct_option: "D",
    explanation: "A conjugate acid is formed by adding a proton ($\\text{H}^+$) to a Bronsted base:\n$$\\text{NH}_2^- + \\text{H}^+ \\rightarrow \\text{NH}_3$$\nThus, $\\text{NH}_3$ is the conjugate acid of $\\text{NH}_2^-$."
  },
  {
    question_number: 72,
    question_text: "Which statement is wrong about $\\text{pH}$ and $\\text{H}^+$?",
    options: [
      "$\\text{pH}$ of neutral water is not zero.",
      "Adding $1\\text{ N}$ solution of $\\text{CH}_3\\text{COOH}$ and $1\\text{ N}$ solution of $\\text{NaOH}$, $\\text{pH}$ will be seven.",
      "$[\\text{H}^+]$ of dilute and hot $\\text{H}_2\\text{SO}_4$ is more than concentrated and cold $\\text{H}_2\\text{SO}_4$",
      "Mixing solution of $\\text{CH}_3\\text{COOH}$ and $\\text{HCl}$, $\\text{pH}$ will be less than 7."
    ],
    correct_option: "B",
    explanation: "When equinormal solutions of acetic acid (weak acid) and sodium hydroxide (strong base) are mixed in equal volumes, complete neutralization yields sodium acetate ($\\text{CH}_3\\text{COONa}$).\nSodium acetate undergoes anionic hydrolysis:\n$$\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-$$\nBecause $\\text{OH}^-$ is released, the solution is basic ($\\text{pH} > 7$, not 7).\nTherefore, statement (B) is incorrect."
  },
  {
    question_number: 73,
    question_text: "The strongest conjugate base is:",
    options: [
      "$\\text{NO}_3^-$",
      "$\\text{Cl}^-$",
      "$\\text{SO}_4^{2-}$",
      "$\\text{CH}_3\\text{COO}^-$"
    ],
    correct_option: "D",
    explanation: "According to Bronsted-Lowry theory, the conjugate base of the weakest acid is the strongest base.\nComparing the relative acid strengths:\n$$\\text{HCl} > \\text{HNO}_3 > \\text{HSO}_4^- \\gg \\text{CH}_3\\text{COOH}$$\nSince acetic acid ($\\text{CH}_3\\text{COOH}$) is by far the weakest acid in this group, its conjugate base $\\text{CH}_3\\text{COO}^-$ is the strongest conjugate base."
  },
  {
    question_number: 74,
    question_text: "The concentration of $[\\text{H}^+]$ and concentration of $[\\text{OH}^-]$ of a $0.1\\text{ M}$ aqueous solution of $2\\%$ ionised weak monobasic acid is:\n[ionic product of water $= 1 \\times 10^{-14}$]",
    options: [
      "$0.02 \\times 10^{-3}\\text{ M}$ and $5 \\times 10^{-11}\\text{ M}$",
      "$1 \\times 10^{-3}\\text{ M}$ and $3 \\times 10^{-11}\\text{ M}$",
      "$2 \\times 10^{-3}\\text{ M}$ and $5 \\times 10^{-12}\\text{ M}$",
      "$3 \\times 10^{-2}\\text{ M}$ and $4 \\times 10^{-13}\\text{ M}$"
    ],
    correct_option: "C",
    explanation: "Given:\n- Concentration $C = 0.1\\text{ M}$\n- Degree of ionisation $\\alpha = 2\\% = 0.02$\n\nConcentration of $\\text{H}^+$:\n$$[\\text{H}^+] = C\\alpha = 0.1 \\times 0.02 = 2 \\times 10^{-3}\\text{ M}$$\n\nConcentration of $\\text{OH}^-$:\n$$[\\text{OH}^-] = \\frac{K_w}{[\\text{H}^+]} = \\frac{1 \\times 10^{-14}}{2 \\times 10^{-3}} = 0.5 \\times 10^{-11} = 5 \\times 10^{-12}\\text{ M}$$\n\nThus, $[\\text{H}^+] = 2 \\times 10^{-3}\\text{ M}$ and $[\\text{OH}^-] = 5 \\times 10^{-12}\\text{ M}$."
  },
  {
    question_number: 75,
    question_text: "The solubility of a saturated solution of calcium fluoride is $2 \\times 10^{-4}\\text{ mol/L}$. Its solubility product is:",
    options: [
      "$12 \\times 10^{-2}$",
      "$14 \\times 10^{-4}$",
      "$22 \\times 10^{-11}$",
      "$32 \\times 10^{-12}$"
    ],
    correct_option: "D",
    explanation: "Calcium fluoride ($\\text{CaF}_2$) dissociates as:\n$$\\text{CaF}_2(s) \\rightleftharpoons \\text{Ca}^{2+} + 2\\text{F}^-$$\n$$[\\text{Ca}^{2+}] = s, \\quad [\\text{F}^-] = 2s$$\n$$K_{sp} = [\\text{Ca}^{2+}][\\text{F}^-]^2 = s(2s)^2 = 4s^3$$\nGiven $s = 2 \\times 10^{-4}\\text{ mol L}^{-1}$:\n$$K_{sp} = 4 \\times (2 \\times 10^{-4})^3 = 4 \\times (8 \\times 10^{-12}) = 32 \\times 10^{-12}$$"
  },
  {
    question_number: 76,
    question_text: "A physician wishes to prepare a buffer solution at $\\text{pH} = 3.85$ that efficiently resists changes in $\\text{pH}$ yet contains only small concentration of the buffering agents. Which of the following weak acids together with its sodium salt would be best to use?",
    options: [
      "2,5-Dihydroxy benzoic acid ($\\text{p}K_a = 2.97$)",
      "Acetoacetic acid ($\\text{p}K_a = 3.58$)",
      "$m$-Chlorobenzoic acid ($\\text{p}K_a = 3.98$)",
      "$p$-Chlorocinnamic acid ($\\text{p}K_a = 4.41$)"
    ],
    correct_option: "C",
    explanation: "A buffer has maximum buffer capacity when its $\\text{pH}$ is equal to or very close to the $\\text{p}K_a$ of the conjugate weak acid ($\\text{pH} \\approx \\text{p}K_a$):\n- For $m$-chlorobenzoic acid, $\\text{p}K_a = 3.98$.\n- The difference $|\\text{pH} - \\text{p}K_a| = |3.85 - 3.98| = 0.13$, which is smaller than for any of the other options.\nTherefore, $m$-chlorobenzoic acid is best to use."
  },
  {
    question_number: 77,
    question_text: "The solubility product of $\\text{CuS}$, $\\text{Ag}_2\\text{S}$ and $\\text{HgS}$ are $10^{-31}$, $10^{-44}$ and $10^{-54}$ respectively. The solubilities of these sulphides are in the order:",
    options: [
      "$\\text{HgS} > \\text{Ag}_2\\text{S} > \\text{CuS}$",
      "$\\text{CuS} > \\text{Ag}_2\\text{S} > \\text{HgS}$",
      "$\\text{Ag}_2\\text{S} > \\text{CuS} > \\text{HgS}$",
      "$\\text{Ag}_2\\text{S} > \\text{HgS} > \\text{CuS}$"
    ],
    correct_option: "C",
    explanation: "1. For $\\text{CuS}$ ($AB$ type):\n$$K_{sp} = s^2 \\implies s = \\sqrt{10^{-31}} = \\sqrt{10 \\times 10^{-32}} \\approx 3.16 \\times 10^{-16}\\text{ mol L}^{-1}$$\n\n2. For $\\text{Ag}_2\\text{S}$ ($A_2B$ type):\n$$K_{sp} = 4s^3 \\implies s = \\left(\\frac{10^{-44}}{4}\\right)^{1/3} = (2.5 \\times 10^{-45})^{1/3} \\approx 1.36 \\times 10^{-15}\\text{ mol L}^{-1}$$\n\n3. For $\\text{HgS}$ ($AB$ type):\n$$K_{sp} = s^2 \\implies s = \\sqrt{10^{-54}} = 10^{-27}\\text{ mol L}^{-1}$$\n\nComparing solubilities:\n$$s_{\\text{Ag}_2\\text{S}} (1.36 \\times 10^{-15}) > s_{\\text{CuS}} (3.16 \\times 10^{-16}) > s_{\\text{HgS}} (10^{-27})$$\nOrder of solubility: $\\text{Ag}_2\\text{S} > \\text{CuS} > \\text{HgS}$."
  },
  {
    question_number: 78,
    question_text: "The ionic product of water at $25^\\circ\\text{C}$ is $10^{-14}$. Its ionic product at $90^\\circ\\text{C}$ will be:",
    options: [
      "$1 \\times 10^{-14}$",
      "$1 \\times 10^{-16}$",
      "$1 \\times 10^{-20}$",
      "$1 \\times 10^{-12}$"
    ],
    correct_option: "D",
    explanation: "The autoionization of water:\n$$\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}^+ + \\text{OH}^-, \\quad \\Delta H > 0$$\nis an endothermic process. According to Le Chatelier's principle, an increase in temperature shifts the equilibrium in the forward direction, increasing the ionization and therefore increasing $K_w$.\nAmong the options, only $1 \\times 10^{-12}$ is greater than $10^{-14}$."
  },
  {
    question_number: 79,
    question_text: "The $\\text{pH}$ value of $N/10\\text{ NaOH}$ solution is:",
    options: [
      "12",
      "13",
      "10",
      "11"
    ],
    correct_option: "B",
    explanation: "For $\\text{NaOH}$ (monobasic strong base), normality equals molarity:\n$$N/10 = 0.1\\text{ N} = 0.1\\text{ M}$$\n$$[\\text{OH}^-] = 0.1\\text{ M} = 10^{-1}\\text{ M}$$\n$$\\text{pOH} = -\\log[\\text{OH}^-] = -\\log(10^{-1}) = 1$$\n$$\\text{pH} = 14 - \\text{pOH} = 14 - 1 = 13$$"
  },
  {
    question_number: 80,
    question_text: "Which of the following is not a Lewis acid?",
    options: [
      "$\\text{SiF}_4$",
      "$\\text{C}_2\\text{H}_4$",
      "$\\text{BF}_3$",
      "$\\text{FeCl}_3$"
    ],
    correct_option: "B",
    explanation: "A Lewis acid is an electron pair acceptor.\n- $\\text{BF}_3$ has an incomplete octet (electron deficient).\n- $\\text{SiF}_4$ and $\\text{FeCl}_3$ have vacant $d$-orbitals to accept electron pairs.\n- $\\text{C}_2\\text{H}_4$ (ethene) has loosely held $\\pi$-electrons that can be donated to electrophiles, acting as a Lewis base (electron pair donor), not a Lewis acid."
  },
  {
    question_number: 81,
    question_text: "The $\\text{pH}$ value of blood does not appreciably change by a small addition of an acid or a base, because the blood:",
    options: [
      "can be easily coagulated",
      "contains iron as a part of the molecule",
      "is a body fluid",
      "contains serum protein which acts as buffer."
    ],
    correct_option: "D",
    explanation: "Human blood maintains a remarkably constant $\\text{pH}$ of approximately $7.4$ due to the presence of efficient buffer systems, primarily the carbonic acid-bicarbonate ($\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-$) system, phosphate buffer, and serum proteins (hemoglobin and plasma albumin) which behave as amphoteric buffers."
  },
  {
    question_number: 82,
    question_text: "The $\\text{pH}$ value of a $10\\text{ M}$ solution of $\\text{HCl}$ is:",
    options: [
      "equal to 1",
      "equal to 2",
      "less than 0",
      "equal to 0"
    ],
    correct_option: "C",
    explanation: "For a concentrated $10\\text{ M HCl}$ solution:\n$$[\\text{H}^+] \\approx 10\\text{ M}$$\n$$\\text{pH} = -\\log[\\text{H}^+] = -\\log(10) = -1 < 0$$\nThus, the $\\text{pH}$ is less than 0 (negative $\\text{pH}$)."
  },
  {
    question_number: 83,
    question_text: "The solubility of $\\text{AgCl}$ will be minimum in:",
    options: [
      "$0.01\\text{ M CaCl}_2$",
      "pure water",
      "$0.001\\text{ M AgNO}_3$",
      "$0.01\\text{ M NaCl}$"
    ],
    correct_option: "A",
    explanation: "According to the common ion effect, higher concentration of a common ion suppresses solubility to a greater extent:\n- In pure water: no common ion\n- In $0.001\\text{ M AgNO}_3$: $[\\text{Ag}^+] = 10^{-3}\\text{ M}$\n- In $0.01\\text{ M NaCl}$: $[\\text{Cl}^-] = 0.01\\text{ M} = 10^{-2}\\text{ M}$\n- In $0.01\\text{ M CaCl}_2$: $[\\text{Cl}^-] = 2 \\times 0.01 = 0.02\\text{ M} = 2 \\times 10^{-2}\\text{ M}$ (highest common ion concentration)\nSince $0.01\\text{ M CaCl}_2$ provides the maximum common ion concentration, solubility of $\\text{AgCl}$ is minimum in it."
  },
  {
    question_number: 84,
    question_text: "Which one of the following is most soluble?",
    options: [
      "$\\text{Bi}_2\\text{S}_3$ ($K_{sp} = 1 \\times 10^{-70}$)",
      "$\\text{Ag}_2\\text{S}$ ($K_{sp} = 6 \\times 10^{-51}$)",
      "$\\text{CuS}$ ($K_{sp} = 8 \\times 10^{-37}$)",
      "$\\text{MnS}$ ($K_{sp} = 7 \\times 10^{-16}$)"
    ],
    correct_option: "D",
    explanation: "Comparing molar solubilities:\n- For $\\text{MnS}$ ($AB$ type): $s = \\sqrt{K_{sp}} = \\sqrt{7 \\times 10^{-16}} \\approx 2.65 \\times 10^{-8}\\text{ mol L}^{-1}$\n- For $\\text{CuS}$ ($AB$ type): $s = \\sqrt{8 \\times 10^{-37}} \\approx 8.9 \\times 10^{-19}\\text{ mol L}^{-1}$\n- For $\\text{Ag}_2\\text{S}$ ($A_2B$ type): $s = (K_{sp}/4)^{1/3} = (1.5 \\times 10^{-51})^{1/3} \\approx 1.14 \\times 10^{-17}\\text{ mol L}^{-1}$\n- For $\\text{Bi}_2\\text{S}_3$ ($A_2B_3$ type): $s = (K_{sp}/108)^{1/5} = (10^{-70}/108)^{1/5} \\approx 1.56 \\times 10^{-15}\\text{ mol L}^{-1}$\n\nClearly, $\\text{MnS}$ has the highest solubility ($2.65 \\times 10^{-8}\\text{ mol L}^{-1}$)."
  },
  {
    question_number: 85,
    question_text: "At $80^\\circ\\text{C}$, distilled water has $[\\text{H}_3\\text{O}^+]$ concentration equal to $1 \\times 10^{-6}\\text{ mole/litre}$. The value of $K_w$ at this temperature will be:",
    options: [
      "$1 \\times 10^{-12}$",
      "$1 \\times 10^{-14}$",
      "$1 \\times 10^{-6}$",
      "$1 \\times 10^{-9}$"
    ],
    correct_option: "A",
    explanation: "In pure distilled water, electrical neutrality requires that:\n$$[\\text{OH}^-] = [\\text{H}_3\\text{O}^+] = 1 \\times 10^{-6}\\text{ mol L}^{-1}$$\nTherefore:\n$$K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = (1 \\times 10^{-6}) \\times (1 \\times 10^{-6}) = 1 \\times 10^{-12}$$"
  },
  {
    question_number: 86,
    question_text: "$0.1\\text{ M}$ solution of which one of these substances will act basic?",
    options: [
      "Sodium borate",
      "Ammonium chloride",
      "Calcium nitrate",
      "Sodium sulphate"
    ],
    correct_option: "A",
    explanation: "Sodium borate (borax, $\\text{Na}_2\\text{B}_4\\text{O}_7$) is a salt of a strong base ($\\text{NaOH}$) and a weak acid (boric acid, $\\text{H}_3\\text{BO}_3$).\nIt undergoes anionic hydrolysis to yield excess hydroxide ions ($\\text{OH}^-$):\n$$\\text{B}_4\\text{O}_7^{2-} + 7\\text{H}_2\\text{O} \\rightleftharpoons 4\\text{H}_3\\text{BO}_3 + 2\\text{OH}^-$$\nHence, its solution is alkaline (basic, $\\text{pH} > 7$)."
  },
  {
    question_number: 87,
    question_text: "Aqueous solution of acetic acid contains:",
    options: [
      "$\\text{CH}_3\\text{COO}^-$ and $\\text{H}^+$",
      "$\\text{CH}_3\\text{COO}^-$, $\\text{H}_3\\text{O}^+$ and $\\text{CH}_3\\text{COOH}$",
      "$\\text{CH}_3\\text{COO}^-$, $\\text{H}_3\\text{O}^+$ and $\\text{H}^+$",
      "$\\text{CH}_3\\text{COOH}$, $\\text{CH}_3\\text{COO}^-$ and $\\text{H}^+$"
    ],
    correct_option: "B",
    explanation: "Acetic acid is a weak monobasic acid that undergoes partial ionization in water:\n$$\\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}_3\\text{O}^+$$\nBecause it is weak (degree of ionization $\\alpha \\ll 1$), an equilibrium mixture in aqueous solution contains un-ionized $\\text{CH}_3\\text{COOH}$ molecules, acetate ions ($\\text{CH}_3\\text{COO}^-$), and hydronium ions ($\\text{H}_3\\text{O}^+$)."
  },
  {
    question_number: 88,
    question_text: "Aqueous solution of ammonia consists of:",
    options: [
      "$\\text{H}^+$",
      "$\\text{OH}^-$",
      "$\\text{NH}_4^+$",
      "$\\text{NH}_4^+$ and $\\text{OH}^-$"
    ],
    correct_option: "D",
    explanation: "When ammonia gas is dissolved in water, it undergoes basic ionization:\n$$\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-$$\nHence, the aqueous solution contains ammonium ions ($\\text{NH}_4^+$) and hydroxide ions ($\\text{OH}^-$)."
  },
  {
    question_number: 89,
    question_text: "The compound whose water solution has the highest $\\text{pH}$ is:",
    options: [
      "$\\text{NaCl}$",
      "$\\text{NaHCO}_3$",
      "$\\text{Na}_2\\text{CO}_3$",
      "$\\text{NH}_4\\text{Cl}$"
    ],
    correct_option: "C",
    explanation: "- $\\text{NH}_4\\text{Cl}$ is acidic ($\\text{pH} < 7$).\n- $\\text{NaCl}$ is neutral ($\\text{pH} = 7$).\n- $\\text{NaHCO}_3$ is an amphiprotic salt with $\\text{pH} = \\frac{1}{2}(\\text{p}K_{a_1} + \\text{p}K_{a_2}) \\approx 8.3$.\n- $\\text{Na}_2\\text{CO}_3$ is the salt of a strong base ($\\text{NaOH}$) and a weak diprotic acid ($\\text{H}_2\\text{CO}_3$). Carbonate ions ($\\text{CO}_3^{2-}$) undergo strong hydrolysis:\n$$\\text{CO}_3^{2-} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{HCO}_3^- + \\text{OH}^-$$\nyielding a strongly alkaline solution ($\\text{pH} \\approx 11.5$, the highest among the options)."
  }
];
