// Ionic Equilibrium PYQ - Part 2 (Q26 - Q50)

export const part2Questions = [
  {
    question_number: 26,
    question_text: "The percentage of pyridine ($\\text{C}_5\\text{H}_5\\text{N}$) that forms pyridinium ion ($\\text{C}_5\\text{H}_5\\text{N}^+\\text{H}$) in a $0.10\\text{ M}$ aqueous pyridine solution ($K_b\\text{ for } \\text{C}_5\\text{H}_5\\text{N} = 1.7 \\times 10^{-9}$) is:",
    options: [
      "0.0060%",
      "0.013%",
      "0.77%",
      "1.6%"
    ],
    correct_option: "B",
    explanation: "For the weak base ionization:\n$$\\text{C}_5\\text{H}_5\\text{N} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{C}_5\\text{H}_5\\text{NH}^+ + \\text{OH}^-$$\nThe degree of dissociation $\\alpha$ is given by:\n$$\\alpha = \\sqrt{\\frac{K_b}{C}} = \\sqrt{\\frac{1.7 \\times 10^{-9}}{0.10}} = \\sqrt{1.7 \\times 10^{-8}} \\approx 1.304 \\times 10^{-4}$$\n\nPercentage dissociation:\n$$\\%\\alpha = 1.304 \\times 10^{-4} \\times 100 = 0.01304\\% \\approx 0.013\\%$$"
  },
  {
    question_number: 27,
    question_text: "The solubility of $\\text{AgCl(s)}$ with solubility product $1.6 \\times 10^{-10}$ in $0.1\\text{ M NaCl}$ solution would be:",
    options: [
      "$1.26 \\times 10^{-5}\\text{ M}$",
      "$1.6 \\times 10^{-9}\\text{ M}$",
      "$1.6 \\times 10^{-11}\\text{ M}$",
      "zero"
    ],
    correct_option: "B",
    explanation: "In $0.1\\text{ M NaCl}$ solution, $[\\text{Cl}^-] = 0.1\\text{ M}$ due to complete dissociation of $\\text{NaCl}$.\nDue to common ion effect:\n$$K_{sp} = [\\text{Ag}^+][\\text{Cl}^-] = s \\times 0.1$$\n$$s = \\frac{K_{sp}}{0.1} = \\frac{1.6 \\times 10^{-10}}{0.1} = 1.6 \\times 10^{-9}\\text{ M}$$"
  },
  {
    question_number: 28,
    question_text: "Which of the following fluoro-compounds is most likely to behave as a Lewis base?",
    options: [
      "$\\text{BF}_3$",
      "$\\text{PF}_3$",
      "$\\text{CF}_4$",
      "$\\text{SiF}_4$"
    ],
    correct_option: "B",
    explanation: "A Lewis base is an electron pair donor.\n- In $\\text{PF}_3$, the central phosphorus atom is $sp^3$ hybridised and possesses a lone pair of electrons in its valence shell, which it can donate.\n- $\\text{BF}_3$ has an incomplete octet (6 electrons) and behaves as a Lewis acid.\n- $\\text{CF}_4$ has a complete octet with no lone pair and no vacant $d$-orbitals.\n- $\\text{SiF}_4$ has vacant $d$-orbitals on silicon and acts as a Lewis acid."
  },
  {
    question_number: 29,
    question_text: "$\\text{MY}$ and $\\text{NY}_3$, two nearly insoluble salts, have the same $K_{sp}$ values of $6.2 \\times 10^{-13}$ at room temperature. Which statement would be true in regard to $\\text{MY}$ and $\\text{NY}_3$?",
    options: [
      "The salts $\\text{MY}$ and $\\text{NY}_3$ are more soluble in $0.5\\text{ M KY}$ than in pure water.",
      "The addition of the salt of $\\text{KY}$ to solution of $\\text{MY}$ and $\\text{NY}_3$ will have no effect on their solubilities.",
      "The molar solubilities of $\\text{MY}$ and $\\text{NY}_3$ in water are identical.",
      "The molar solubility of $\\text{MY}$ in water is less than that of $\\text{NY}_3$."
    ],
    correct_option: "D",
    explanation: "1. For the salt $\\text{MY}$ ($AB$ type):\n$$K_{sp} = s_1^2 \\implies s_1 = \\sqrt{6.2 \\times 10^{-13}} = \\sqrt{62 \\times 10^{-14}} \\approx 7.87 \\times 10^{-7}\\text{ mol L}^{-1}$$\n\n2. For the salt $\\text{NY}_3$ ($AB_3$ type):\n$$K_{sp} = 27s_2^4 \\implies s_2 = \\left(\\frac{6.2 \\times 10^{-13}}{27}\\right)^{1/4} = \\left(2.296 \\times 10^{-14}\\right)^{1/4} \\approx 3.89 \\times 10^{-4}\\text{ mol L}^{-1}$$\n\nComparing $s_1$ and $s_2$:\n$$s_1 (7.87 \\times 10^{-7}) < s_2 (3.89 \\times 10^{-4})$$\nThus, the molar solubility of $\\text{MY}$ in water is less than that of $\\text{NY}_3$."
  },
  {
    question_number: 30,
    question_text: "What is the $\\text{pH}$ of the resulting solution when equal volumes of $0.1\\text{ M NaOH}$ and $0.01\\text{ M HCl}$ are mixed?",
    options: [
      "2.0",
      "7.0",
      "1.04",
      "12.65"
    ],
    correct_option: "D",
    explanation: "Let the volume of each solution mixed be $V\\text{ L}$.\n$$\\text{Moles of } \\text{OH}^- = 0.1 \\times V$$\n$$\\text{Moles of } \\text{H}^+ = 0.01 \\times V$$\n$$\\text{Excess moles of } \\text{OH}^- = 0.1V - 0.01V = 0.09V$$\n$$\\text{Total volume} = V + V = 2V$$\n\nConcentration of $\\text{OH}^-$ in the mixture:\n$$[\\text{OH}^-] = \\frac{0.09V}{2V} = 0.045\\text{ M}$$\n$$\\text{pOH} = -\\log(0.045) = -\\log(4.5 \\times 10^{-2}) = 2 - 0.653 = 1.347$$\n$$\\text{pH} = 14 - \\text{pOH} = 14 - 1.347 = 12.653 \\approx 12.65$$"
  },
  {
    question_number: 31,
    question_text: "Which one of the following pairs of solution is not an acidic buffer?",
    options: [
      "$\\text{CH}_3\\text{COOH}$ and $\\text{CH}_3\\text{COONa}$",
      "$\\text{H}_2\\text{CO}_3$ and $\\text{Na}_2\\text{CO}_3$",
      "$\\text{H}_3\\text{PO}_4$ and $\\text{Na}_3\\text{PO}_4$",
      "$\\text{HClO}_4$ and $\\text{NaClO}_4$"
    ],
    correct_option: "D",
    explanation: "An acidic buffer must contain a weak acid and its salt with a strong base.\n$\\text{HClO}_4$ (perchloric acid) is a very strong acid, and its conjugate base $\\text{ClO}_4^-$ is an exceptionally weak base that does not hydrolyze or buffer. Therefore, the mixture $\\text{HClO}_4 + \\text{NaClO}_4$ cannot act as a buffer."
  },
  {
    question_number: 32,
    question_text: "The $K_{sp}$ of $\\text{Ag}_2\\text{CrO}_4$, $\\text{AgCl}$, $\\text{AgBr}$ and $\\text{AgI}$ are respectively, $1.1 \\times 10^{-12}$, $1.8 \\times 10^{-10}$, $5.0 \\times 10^{-13}$, $8.3 \\times 10^{-17}$. Which one of the following salts will precipitate last if $\\text{AgNO}_3$ solution is added to the solution containing equal moles of $\\text{NaCl}$, $\\text{NaBr}$, $\\text{NaI}$ and $\\text{Na}_2\\text{CrO}_4$?",
    options: [
      "$\\text{AgBr}$",
      "$\\text{Ag}_2\\text{CrO}_4$",
      "$\\text{AgI}$",
      "$\\text{AgCl}$"
    ],
    correct_option: "B",
    explanation: "The salt requiring the highest concentration of $\\text{Ag}^+$ to exceed its solubility product ($K_{sp}$) will precipitate last.\nLet the concentration of each anion be $C$ (e.g., $1\\text{ M}$ or $0.1\\text{ M}$):\n1. For $\\text{AgI}$: $[\\text{Ag}^+] = \\frac{8.3 \\times 10^{-17}}{C}$\n2. For $\\text{AgBr}$: $[\\text{Ag}^+] = \\frac{5.0 \\times 10^{-13}}{C}$\n3. For $\\text{AgCl}$: $[\\text{Ag}^+] = \\frac{1.8 \\times 10^{-10}}{C}$\n4. For $\\text{Ag}_2\\text{CrO}_4$: $[\\text{Ag}^+]^2[\\text{CrO}_4^{2-}] = K_{sp} \\implies [\\text{Ag}^+] = \\sqrt{\\frac{1.1 \\times 10^{-12}}{C}} = \\frac{1.05 \\times 10^{-6}}{\\sqrt{C}}$\n\nSince $1.05 \\times 10^{-6} \\gg 1.8 \\times 10^{-10}$, $\\text{Ag}_2\\text{CrO}_4$ requires the highest $[\\text{Ag}^+]$ and will precipitate last."
  },
  {
    question_number: 33,
    question_text: "Which of the following salts will give highest $\\text{pH}$ in water?",
    options: [
      "$\\text{KCl}$",
      "$\\text{NaCl}$",
      "$\\text{Na}_2\\text{CO}_3$",
      "$\\text{CuSO}_4$"
    ],
    correct_option: "C",
    explanation: "- $\\text{KCl}$ and $\\text{NaCl}$ are salts of strong acids and strong bases; their solutions are neutral ($\\text{pH} \\approx 7$).\n- $\\text{CuSO}_4$ is a salt of a weak base ($\\text{Cu(OH)}_2$) and strong acid ($\\text{H}_2\\text{SO}_4$); cationic hydrolysis gives an acidic solution ($\\text{pH} < 7$).\n- $\\text{Na}_2\\text{CO}_3$ is a salt of a strong base ($\\text{NaOH}$) and a weak acid ($\\text{H}_2\\text{CO}_3$); anionic hydrolysis yields $\\text{OH}^-$, resulting in a strongly basic solution ($\\text{pH} > 7$, highest among the options)."
  },
  {
    question_number: 34,
    question_text: "Using the Gibb's energy change, $\\Delta G^\\circ = +63.3\\text{ kJ}$, for the following reaction:\n$$\\text{Ag}_2\\text{CO}_3(s) \\rightleftharpoons 2\\text{Ag}^+(\\text{aq}) + \\text{CO}_3^{2-}(\\text{aq})$$\nthe $K_{sp}$ of $\\text{Ag}_2\\text{CO}_3(s)$ in water at $25^\\circ\\text{C}$ is ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$):",
    options: [
      "$3.2 \\times 10^{-26}$",
      "$8.0 \\times 10^{-12}$",
      "$2.9 \\times 10^{-3}$",
      "$7.9 \\times 10^{-2}$"
    ],
    correct_option: "B",
    explanation: "The relationship between standard Gibbs free energy change and the equilibrium constant is:\n$$\\Delta G^\\circ = -2.303 RT \\log K_{sp}$$\nGiven $\\Delta G^\\circ = +63.3\\text{ kJ} = 63300\\text{ J}$, $T = 298\\text{ K}$, $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$:\n$$\\log K_{sp} = -\\frac{\\Delta G^\\circ}{2.303 RT} = -\\frac{63300}{2.303 \\times 8.314 \\times 298} = -\\frac{63300}{5705.85} \\approx -11.0939$$\n$$K_{sp} = 10^{-11.0939} = 10^{0.9061} \\times 10^{-12} \\approx 8.05 \\times 10^{-12} \\approx 8.0 \\times 10^{-12}$$"
  },
  {
    question_number: 35,
    question_text: "Accumulation of lactic acid ($\\text{HC}_3\\text{H}_5\\text{O}_3$), a monobasic acid in tissues leads to pain and a feeling of fatigue. In a $0.10\\text{ M}$ aqueous solution, lactic acid is $3.7\\%$ dissociated. The value of dissociation constant, $K_a$, for this acid will be:",
    options: [
      "$1.4 \\times 10^{-5}$",
      "$1.4 \\times 10^{-4}$",
      "$3.7 \\times 10^{-4}$",
      "$2.8 \\times 10^{-4}$"
    ],
    correct_option: "B",
    explanation: "Given:\n- Concentration $C = 0.10\\text{ M}$\n- Degree of dissociation $\\alpha = 3.7\\% = 0.037$\n\nFor a weak monobasic acid:\n$$K_a = \\frac{C\\alpha^2}{1 - \\alpha} \\approx C\\alpha^2 = 0.10 \\times (0.037)^2 = 0.10 \\times 1.369 \\times 10^{-3} = 1.37 \\times 10^{-4} \\approx 1.4 \\times 10^{-4}$$"
  },
  {
    question_number: 36,
    question_text: "At $100^\\circ\\text{C}$ the $K_w$ of water is $55$ times its value at $25^\\circ\\text{C}$. What will be the $\\text{pH}$ of neutral solution? ($\\log 55 = 1.74$)",
    options: [
      "7.00",
      "7.87",
      "5.13",
      "6.13"
    ],
    correct_option: "D",
    explanation: "At $25^\\circ\\text{C}$, $K_w = 10^{-14}$.\nAt $100^\\circ\\text{C}$:\n$$K_w = 55 \\times 10^{-14}$$\n$$\\text{p}K_w = -\\log(55 \\times 10^{-14}) = 14 - \\log 55 = 14 - 1.74 = 12.26$$\n\nFor a neutral solution:\n$$[\\text{H}^+] = [\\text{OH}^-] = \\sqrt{K_w}$$\n$$\\text{pH} = \\frac{1}{2}\\text{p}K_w = \\frac{12.26}{2} = 6.13$$"
  },
  {
    question_number: 37,
    question_text: "The values of $K_{sp}$ of $\\text{CaCO}_3$ and $\\text{CaC}_2\\text{O}_4$ are $4.7 \\times 10^{-9}$ and $1.3 \\times 10^{-9}$ respectively at $25^\\circ\\text{C}$. If the mixture of these two is washed with water, what is the concentration of $\\text{Ca}^{2+}$ ions in water?",
    options: [
      "$5.831 \\times 10^{-5}\\text{ M}$",
      "$6.856 \\times 10^{-5}\\text{ M}$",
      "$3.606 \\times 10^{-5}\\text{ M}$",
      "$7.746 \\times 10^{-5}\\text{ M}$"
    ],
    correct_option: "D",
    explanation: "Let the solubility of $\\text{CaCO}_3$ be $x$ and that of $\\text{CaC}_2\\text{O}_4$ be $y$.\nTotal $[\\text{Ca}^{2+}] = x + y$.\n$$[\\text{CO}_3^{2-}] = x, \\quad [\\text{C}_2\\text{O}_4^{2-}] = y$$\n$$K_{sp_1} = [\\text{Ca}^{2+}][\\text{CO}_3^{2-}] = (x + y)x = 4.7 \\times 10^{-9}$$\n$$K_{sp_2} = [\\text{Ca}^{2+}][\\text{C}_2\\text{O}_4^{2-}] = (x + y)y = 1.3 \\times 10^{-9}$$\n\nAdding the two expressions:\n$$(x + y)^2 = K_{sp_1} + K_{sp_2} = 4.7 \\times 10^{-9} + 1.3 \\times 10^{-9} = 6.0 \\times 10^{-9} = 60 \\times 10^{-10}$$\n$$[\\text{Ca}^{2+}] = x + y = \\sqrt{60 \\times 10^{-10}} \\approx 7.746 \\times 10^{-5}\\text{ M}$$"
  },
  {
    question_number: 38,
    question_text: "The dissociation constant of weak acid is $1 \\times 10^{-4}$. In order to prepare a buffer solution with a $\\text{pH} = 5$, the $\\frac{[\\text{Salt}]}{[\\text{Acid}]}$ ratio should be:",
    options: [
      "4 : 5",
      "10 : 1",
      "5 : 4",
      "1 : 10"
    ],
    correct_option: "B",
    explanation: "Given:\n- $K_a = 1 \\times 10^{-4} \\implies \\text{p}K_a = -\\log(10^{-4}) = 4$\n- Desired $\\text{pH} = 5$\n\nUsing the Henderson-Hasselbalch equation:\n$$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}$$\n$$5 = 4 + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}$$\n$$\\log\\frac{[\\text{Salt}]}{[\\text{Acid}]} = 1 \\implies \\frac{[\\text{Salt}]}{[\\text{Acid}]} = 10^1 = 10 : 1$$"
  },
  {
    question_number: 39,
    question_text: "$\\text{KMnO}_4$ can be prepared from $\\text{K}_2\\text{MnO}_4$ as per the reaction,\n$$3\\text{MnO}_4^{2-} + 2\\text{H}_2\\text{O} \\rightleftharpoons 2\\text{MnO}_4^- + \\text{MnO}_2 + 4\\text{OH}^-$$\nThe reaction can go to completion by removing $\\text{OH}^-$ ions by adding:",
    options: [
      "$\\text{CO}_2$",
      "$\\text{SO}_2$",
      "$\\text{HCl}$",
      "$\\text{KOH}$"
    ],
    correct_option: "A",
    explanation: "To drive the disproportionation of manganate ($\\text{MnO}_4^{2-}$) forward to completion, $\\text{OH}^-$ must be removed.\n$\\text{CO}_2$ is an acidic gas that neutralizes $\\text{OH}^-$ ions forming carbonate/bicarbonate:\n$$\\text{CO}_2 + 2\\text{OH}^- \\rightarrow \\text{CO}_3^{2-} + \\text{H}_2\\text{O}$$\nUnlike $\\text{HCl}$ (which reduces $\\text{MnO}_4^-$ with evolution of $\\text{Cl}_2$) and $\\text{SO}_2$ (which acts as a strong reducing agent), $\\text{CO}_2$ acts gently as a non-reducing acidifier."
  },
  {
    question_number: 40,
    question_text: "Which of these is least likely to act as a Lewis base?",
    options: [
      "$\\text{BF}_3$",
      "$\\text{PF}_3$",
      "$\\text{CO}$",
      "$\\text{F}^-$"
    ],
    correct_option: "A",
    explanation: "A Lewis base must possess a lone pair of electrons to donate.\n$\\text{BF}_3$ has an incomplete octet (6 electrons around the central boron atom) and has a vacant $2p$ orbital. Hence, it behaves as a strong Lewis acid (electron pair acceptor), and is least likely to act as a Lewis base."
  },
  {
    question_number: 41,
    question_text: "$\\text{pH}$ of a saturated solution of $\\text{Ba(OH)}_2$ is $12$. The value of solubility product ($K_{sp}$) of $\\text{Ba(OH)}_2$ is:",
    options: [
      "$3.3 \\times 10^{-7}$",
      "$5.0 \\times 10^{-7}$",
      "$4.0 \\times 10^{-6}$",
      "$5.0 \\times 10^{-6}$"
    ],
    correct_option: "B",
    explanation: "Given $\\text{pH} = 12$:\n$$\\text{pOH} = 14 - 12 = 2$$\n$$[\\text{OH}^-] = 10^{-2}\\text{ M}$$\n\nFor $\\text{Ba(OH)}_2 \\rightleftharpoons \\text{Ba}^{2+} + 2\\text{OH}^-$:\n$$[\\text{Ba}^{2+}] = \\frac{[\\text{OH}^-]}{2} = \\frac{10^{-2}}{2} = 0.5 \\times 10^{-2}\\text{ M}$$\n\nSolubility product:\n$$K_{sp} = [\\text{Ba}^{2+}][\\text{OH}^-]^2 = (0.5 \\times 10^{-2}) \\times (10^{-2})^2 = 0.5 \\times 10^{-6} = 5.0 \\times 10^{-7}$$"
  },
  {
    question_number: 42,
    question_text: "Equimolar solutions of the following substances were prepared separately. Which one of these will record the highest $\\text{pH}$ value?",
    options: [
      "$\\text{BaCl}_2$",
      "$\\text{AlCl}_3$",
      "$\\text{LiCl}$",
      "$\\text{BeCl}_2$"
    ],
    correct_option: "A",
    explanation: "- $\\text{BaCl}_2$ is a salt of a strong base ($\\text{Ba(OH)}_2$) and a strong acid ($\\text{HCl}$); it does not undergo hydrolysis, so its aqueous solution is neutral ($\\text{pH} \\approx 7$).\n- $\\text{BeCl}_2$ and $\\text{AlCl}_3$ contain small, highly charged cations that hydrolyze significantly to give acidic solutions ($\\text{pH} < 7$).\n- $\\text{Li}^+$ is a smaller alkali ion with slight polarization tendency, but $\\text{Ba(OH)}_2$ is the strongest base among the corresponding hydroxides.\nTherefore, $\\text{BaCl}_2$ has the highest $\\text{pH}$."
  },
  {
    question_number: 43,
    question_text: "Buffer solutions have constant acidity and alkalinity because:",
    options: [
      "these give unionised acid or base on reaction with added acid or alkali",
      "acids and alkalies in these solutions are shielded from attack by other ions",
      "they have large excess of $\\text{H}^+$ or $\\text{OH}^-$ ions",
      "they have fixed value of $\\text{pH}$"
    ],
    correct_option: "A",
    explanation: "A buffer resists change in $\\text{pH}$ upon addition of small amounts of acid or base because the added $\\text{H}^+$ ions react with the conjugate base to form unionised weak acid, and the added $\\text{OH}^-$ ions react with the weak acid to form water and conjugate base, thus consuming the added hydronium or hydroxide ions."
  },
  {
    question_number: 44,
    question_text: "In qualitative analysis, the metals of group I can be separated from other ions by precipitating them as chloride salts. A solution initially contains $\\text{Ag}^+$ and $\\text{Pb}^{2+}$ at a concentration of $0.10\\text{ M}$. Aqueous $\\text{HCl}$ is added to this solution until the $\\text{Cl}^-$ concentration is $0.10\\text{ M}$. What will the concentrations of $\\text{Ag}^+$ and $\\text{Pb}^{2+}$ be at equilibrium?\n($K_{sp}\\text{ for } \\text{AgCl} = 1.8 \\times 10^{-10}$, $K_{sp}\\text{ for } \\text{PbCl}_2 = 1.7 \\times 10^{-5}$)",
    options: [
      "$[\\text{Ag}^+] = 1.8 \\times 10^{-7}\\text{ M}, \\; [\\text{Pb}^{2+}] = 1.7 \\times 10^{-6}\\text{ M}$",
      "$[\\text{Ag}^+] = 1.8 \\times 10^{-11}\\text{ M}, \\; [\\text{Pb}^{2+}] = 8.5 \\times 10^{-5}\\text{ M}$",
      "$[\\text{Ag}^+] = 1.8 \\times 10^{-9}\\text{ M}, \\; [\\text{Pb}^{2+}] = 1.7 \\times 10^{-3}\\text{ M}$",
      "$[\\text{Ag}^+] = 1.8 \\times 10^{-11}\\text{ M}, \\; [\\text{Pb}^{2+}] = 1.7 \\times 10^{-4}\\text{ M}$"
    ],
    correct_option: "C",
    explanation: "Given $[\\text{Cl}^-] = 0.10\\text{ M}$ at equilibrium:\n\n1. For $\\text{AgCl}$:\n$$K_{sp} = [\\text{Ag}^+][\\text{Cl}^-] \\implies [\\text{Ag}^+] = \\frac{1.8 \\times 10^{-10}}{0.10} = 1.8 \\times 10^{-9}\\text{ M}$$\n\n2. For $\\text{PbCl}_2$:\n$$K_{sp} = [\\text{Pb}^{2+}][\\text{Cl}^-]^2 \\implies [\\text{Pb}^{2+}] = \\frac{1.7 \\times 10^{-5}}{(0.10)^2} = \\frac{1.7 \\times 10^{-5}}{10^{-2}} = 1.7 \\times 10^{-3}\\text{ M}$$"
  },
  {
    question_number: 45,
    question_text: "A buffer solution is prepared in which the concentration of $\\text{NH}_3$ is $0.30\\text{ M}$ and the concentration of $\\text{NH}_4^+$ is $0.20\\text{ M}$. If the equilibrium constant, $K_b$ for $\\text{NH}_3$ equals $1.8 \\times 10^{-5}$, what is the $\\text{pH}$ of this solution? ($\\log 2.7 = 0.43$)",
    options: [
      "9.08",
      "9.43",
      "11.72",
      "8.73"
    ],
    correct_option: "B",
    explanation: "Using the Henderson-Hasselbalch equation for a basic buffer:\n$$\\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}$$\n$$\\text{p}K_b = -\\log(1.8 \\times 10^{-5}) = 5 - \\log 1.8 = 5 - 0.255 = 4.745$$\n$$\\frac{[\\text{Salt}]}{[\\text{Base}]} = \\frac{0.20}{0.30} = \\frac{2}{3}$$\n$$\\text{pOH} = 4.745 + \\log\\left(\\frac{2}{3}\\right) = 4.745 + (0.301 - 0.477) = 4.745 - 0.176 = 4.569$$\n\nAlternatively, using $[\\text{OH}^-] = K_b \\times \\frac{[\\text{Base}]}{[\\text{Salt}]} = 1.8 \\times 10^{-5} \\times \\frac{0.30}{0.20} = 2.7 \\times 10^{-5}\\text{ M}$:\n$$\\text{pOH} = -\\log(2.7 \\times 10^{-5}) = 5 - \\log 2.7 = 5 - 0.43 = 4.57$$\n$$\\text{pH} = 14 - \\text{pOH} = 14 - 4.57 = 9.43$$"
  },
  {
    question_number: 46,
    question_text: "Which of the following is least likely to behave as Lewis base?",
    options: [
      "$\\text{H}_2\\text{O}$",
      "$\\text{NH}_3$",
      "$\\text{BF}_3$",
      "$\\text{OH}^-$"
    ],
    correct_option: "C",
    explanation: "A Lewis base is an electron-pair donor.\n$\\text{BF}_3$ has an incomplete octet with only six valence electrons around boron, leaving an empty $p$-orbital that readily accepts electron pairs. It is a quintessential Lewis acid, not a Lewis base."
  },
  {
    question_number: 47,
    question_text: "If $\\text{pH}$ of a saturated solution of $\\text{Ba(OH)}_2$ is $12$, the value of its $K_{sp}$ is:",
    options: [
      "$4.00 \\times 10^{-6}\\text{ M}^3$",
      "$4.00 \\times 10^{-7}\\text{ M}^3$",
      "$5.00 \\times 10^{-6}\\text{ M}^3$",
      "$5.00 \\times 10^{-7}\\text{ M}^3$"
    ],
    correct_option: "D",
    explanation: "Given $\\text{pH} = 12$:\n$$\\text{pOH} = 14 - 12 = 2$$\n$$[\\text{OH}^-] = 10^{-2}\\text{ M}$$\n\nFor $\\text{Ba(OH)}_2(s) \\rightleftharpoons \\text{Ba}^{2+} + 2\\text{OH}^-$:\n$$[\\text{Ba}^{2+}] = \\frac{[\\text{OH}^-]}{2} = \\frac{10^{-2}}{2} = 0.5 \\times 10^{-2}\\text{ M}$$\n\nSolubility product:\n$$K_{sp} = [\\text{Ba}^{2+}][\\text{OH}^-]^2 = (0.5 \\times 10^{-2}) \\times (10^{-2})^2 = 0.5 \\times 10^{-6} = 5.00 \\times 10^{-7}\\text{ M}^3$$"
  },
  {
    question_number: 48,
    question_text: "What is $[\\text{H}^+]$ in $\\text{mol/L}$ of a solution that is $0.20\\text{ M}$ in $\\text{CH}_3\\text{COONa}$ and $0.10\\text{ M}$ in $\\text{CH}_3\\text{COOH}$? $K_a\\text{ for } \\text{CH}_3\\text{COOH} = 1.8 \\times 10^{-5}$:",
    options: [
      "$3.5 \\times 10^{-4}$",
      "$1.1 \\times 10^{-5}$",
      "$1.8 \\times 10^{-5}$",
      "$9.0 \\times 10^{-6}$"
    ],
    correct_option: "D",
    explanation: "For an acidic buffer:\n$$[\\text{H}^+] = K_a \\times \\frac{[\\text{Acid}]}{[\\text{Salt}]}$$\n$$[\\text{H}^+] = (1.8 \\times 10^{-5}) \\times \\frac{0.10}{0.20} = (1.8 \\times 10^{-5}) \\times 0.5 = 0.9 \\times 10^{-5} = 9.0 \\times 10^{-6}\\text{ mol/L}$$"
  },
  {
    question_number: 49,
    question_text: "In a buffer solution containing equal concentration of $\\text{B}^-$ and $\\text{HB}$, the $K_b$ for $\\text{B}^-$ is $10^{-10}$. The $\\text{pH}$ of buffer solution is:",
    options: [
      "10",
      "7",
      "6",
      "4"
    ],
    correct_option: "D",
    explanation: "For the conjugate acid-base pair $\\text{HB}/\\text{B}^-$:\n$$K_a = \\frac{K_w}{K_b} = \\frac{10^{-14}}{10^{-10}} = 10^{-4}$$\n$$\\text{p}K_a = -\\log(10^{-4}) = 4$$\n\nFrom the Henderson-Hasselbalch equation:\n$$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{B}^-]}{[\\text{HB}]}$$\nSince $[\\text{B}^-] = [\\text{HB}]$, $\\log(1) = 0$:\n$$\\text{pH} = \\text{p}K_a = 4$$"
  },
  {
    question_number: 50,
    question_text: "Which of the following molecules acts as a Lewis acid?",
    options: [
      "$(\\text{CH}_3)_2\\text{O}$",
      "$(\\text{CH}_3)_3\\text{P}$",
      "$(\\text{CH}_3)_3\\text{N}$",
      "$(\\text{CH}_3)_3\\text{B}$"
    ],
    correct_option: "D",
    explanation: "- In $(\\text{CH}_3)_3\\text{B}$ (trimethylborane), the central boron atom has only 6 electrons in its valence shell, leaving an empty $2p$ orbital. Hence, it acts as an electron-pair acceptor (Lewis acid).\n- $(\\text{CH}_3)_2\\text{O}$, $(\\text{CH}_3)_3\\text{P}$, and $(\\text{CH}_3)_3\\text{N}$ all contain lone pairs on oxygen, phosphorus, and nitrogen respectively, acting as Lewis bases."
  }
];

