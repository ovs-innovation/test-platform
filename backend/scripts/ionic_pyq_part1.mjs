// Ionic Equilibrium PYQ - Part 1 (Q1 - Q25)

export const part1Questions = [
  {
    question_number: 1,
    question_text: "The correct order of solubility of the given salts in water at $298\\text{ K}$ is:\n\n$$\\begin{array}{|l|l|}\n\\hline\n\\textbf{Salt} & \\mathbf{K_{sp}\\text{ at } 298\\text{ K}} \\\\\n\\hline\n\\text{AgBr} & 5.0 \\times 10^{-13} \\\\\n\\text{Zn(OH)}_2 & 1.0 \\times 10^{-15} \\\\\n\\text{Hg}_2\\text{Cl}_2 & 1.3 \\times 10^{-18} \\\\\n\\hline\n\\end{array}$$",
    options: [
      "$\\text{Zn(OH)}_2 > \\text{AgBr} > \\text{Hg}_2\\text{Cl}_2$",
      "$\\text{Hg}_2\\text{Cl}_2 > \\text{Zn(OH)}_2 > \\text{AgBr}$",
      "$\\text{AgBr} > \\text{Zn(OH)}_2 > \\text{Hg}_2\\text{Cl}_2$",
      "$\\text{Hg}_2\\text{Cl}_2 > \\text{AgBr} > \\text{Zn(OH)}_2$"
    ],
    correct_option: "A",
    explanation: "Let the solubility of each salt be $s$.\n\n1. For $\\text{AgBr}$ (1:1 salt, $AB$ type):\n$$K_{sp} = s^2 \\implies s = \\sqrt{K_{sp}} = \\sqrt{5.0 \\times 10^{-13}} = \\sqrt{50 \\times 10^{-14}} \\approx 7.07 \\times 10^{-7}\\text{ M}$$\n\n2. For $\\text{Zn(OH)}_2$ (1:2 salt, $AB_2$ type):\n$$K_{sp} = 4s^3 \\implies s = \\left(\\frac{1.0 \\times 10^{-15}}{4}\\right)^{1/3} = (2.5 \\times 10^{-16})^{1/3} = (250 \\times 10^{-18})^{1/3} \\approx 6.3 \\times 10^{-6}\\text{ M}$$\n\n3. For $\\text{Hg}_2\\text{Cl}_2 \\rightleftharpoons \\text{Hg}_2^{2+} + 2\\text{Cl}^-$ (1:2 type electrolyte):\n$$K_{sp} = 4s^3 \\implies s = \\left(\\frac{1.3 \\times 10^{-18}}{4}\\right)^{1/3} = (0.325 \\times 10^{-18})^{1/3} \\approx 6.87 \\times 10^{-7}\\text{ M}$$\n\nComparing solubilities:\n$$s_{\\text{Zn(OH)}_2} (6.3 \\times 10^{-6}\\text{ M}) > s_{\\text{AgBr}} (7.07 \\times 10^{-7}\\text{ M}) > s_{\\text{Hg}_2\\text{Cl}_2} (6.87 \\times 10^{-7}\\text{ M})$$\n\nTherefore, the correct order of solubility is $\\text{Zn(OH)}_2 > \\text{AgBr} > \\text{Hg}_2\\text{Cl}_2$."
  },
  {
    question_number: 2,
    question_text: "In a qualitative analysis, $\\text{Bi}^{3+}$ is detected by appearance of precipitate of $\\text{BiO(OH)(s)}$. Calculate $\\text{pH}$ when the following equilibrium exists at $298\\text{ K}$:\n$$\\text{BiO(OH)(s)} \\rightleftharpoons \\text{BiO}^+(\\text{aq}) + \\text{OH}^-(\\text{aq}), \\quad K = 4 \\times 10^{-10}$$\n(Given : $\\log 2 = 0.3010$)",
    options: [
      "8.714",
      "4.699",
      "5.286",
      "9.301"
    ],
    correct_option: "D",
    explanation: "For the dissolution equilibrium:\n$$\\text{BiO(OH)(s)} \\rightleftharpoons \\text{BiO}^+(\\text{aq}) + \\text{OH}^-(\\text{aq})$$\n$$K = [\\text{BiO}^+][\\text{OH}^-] = s \\times s = s^2$$\n$$s^2 = 4 \\times 10^{-10} \\implies [\\text{OH}^-] = s = \\sqrt{4 \\times 10^{-10}} = 2 \\times 10^{-5}\\text{ M}$$\n\nNow, calculate $\\text{pOH}$:\n$$\\text{pOH} = -\\log[\\text{OH}^-] = -\\log(2 \\times 10^{-5}) = 5 - \\log 2 = 5 - 0.3010 = 4.699$$\n\nAt $298\\text{ K}$:\n$$\\text{pH} = 14 - \\text{pOH} = 14 - 4.699 = 9.301$$"
  },
  {
    question_number: 3,
    question_text: "At $298\\text{ K}$, a certain buffer solution contains equal concentrations of $\\text{X}^-$ and $\\text{HX}$. $K_b$ for $\\text{X}^-$ is $10^{-10}$. What is the $\\text{pH}$ of this buffer solution?",
    options: [
      "2",
      "4",
      "6",
      "10"
    ],
    correct_option: "B",
    explanation: "Given for the conjugate base $\\text{X}^-$:\n$$K_b = 10^{-10}$$\nSince $K_a \\times K_b = K_w = 10^{-14}$ at $298\\text{ K}$:\n$$K_a = \\frac{10^{-14}}{K_b} = \\frac{10^{-14}}{10^{-10}} = 10^{-4}$$\n$$\\text{p}K_a = -\\log(10^{-4}) = 4$$\n\nAccording to Henderson-Hasselbalch equation for an acidic buffer:\n$$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{X}^-]}{[\\text{HX}]}$$\nSince $[\\text{X}^-] = [\\text{HX}]$:\n$$\\log\\frac{[\\text{X}^-]}{[\\text{HX}]} = \\log 1 = 0$$\n$$\\text{pH} = \\text{p}K_a = 4$$"
  },
  {
    question_number: 4,
    question_text: "Phenolphthalein is used as an indicator for the titration of sodium hydroxide solution against a standard solution of oxalic acid. The colour change that is observed at an alkaline $\\text{pH}$ close to the equivalence point during this titration is:",
    options: [
      "pinkish red to yellow",
      "yellow to pinkish red",
      "pink to colourless",
      "colourless to pink"
    ],
    correct_option: "D",
    explanation: "In the titration of oxalic acid (analyte in conical flask, acidic) against standard sodium hydroxide (titrant in burette, basic):\n- In acidic medium (oxalic acid solution), phenolphthalein is unionized and colourless.\n- As $\\text{NaOH}$ is added and the endpoint/equivalence point is reached at alkaline $\\text{pH}$ ($8.3 - 10.0$), phenolphthalein ionizes to form pink-coloured phenolphthalein anions ($\\text{In}^-$).\n- Thus, the sharp colour change observed is colourless to pink."
  },
  {
    question_number: 5,
    question_text: "Phosphoric acid ionizes in three steps with their ionization constant values $K_{a_1}$, $K_{a_2}$ and $K_{a_3}$, respectively, while $K$ is the overall ionization constant. Which of the following statements are true?\n\nA. $\\log K = \\log K_{a_1} + \\log K_{a_2} + \\log K_{a_3}$\nB. $\\text{H}_3\\text{PO}_4$ is a stronger acid than $\\text{H}_2\\text{PO}_4^-$ and $\\text{HPO}_4^{2-}$\nC. $K_{a_1} > K_{a_2} > K_{a_3}$\nD. $K_{a_1} = \\frac{K_{a_2} + K_{a_3}}{2}$\n\nChoose the correct answer from the options given below:",
    options: [
      "B, C and D only",
      "A, B and C only",
      "A and B only",
      "A and C only"
    ],
    correct_option: "B",
    explanation: "For the stepwise dissociation of $\\text{H}_3\\text{PO}_4$:\n1. $\\text{H}_3\\text{PO}_4 \\rightleftharpoons \\text{H}^+ + \\text{H}_2\\text{PO}_4^- \\quad (K_{a_1})$\n2. $\\text{H}_2\\text{PO}_4^- \\rightleftharpoons \\text{H}^+ + \\text{HPO}_4^{2-} \\quad (K_{a_2})$\n3. $\\text{HPO}_4^{2-} \\rightleftharpoons \\text{H}^+ + \\text{PO}_4^{3-} \\quad (K_{a_3})$\n\nOverall reaction:\n$$\\text{H}_3\\text{PO}_4 \\rightleftharpoons 3\\text{H}^+ + \\text{PO}_4^{3-}$$\n$$K = K_{a_1} \\times K_{a_2} \\times K_{a_3} \\implies \\log K = \\log K_{a_1} + \\log K_{a_2} + \\log K_{a_3} \\quad \\text{(Statement A is true)}$$\n\nDue to the electrostatic attraction, removing a proton from a negatively charged species becomes increasingly difficult:\n$$K_{a_1} > K_{a_2} > K_{a_3} \\quad \\text{(Statement C is true)}$$\nConsequently, $\\text{H}_3\\text{PO}_4$ is a stronger acid than $\\text{H}_2\\text{PO}_4^-$ and $\\text{HPO}_4^{2-}$ (Statement B is true).\nStatement D is clearly false.\n\nThus, statements A, B and C are true."
  },
  {
    question_number: 6,
    question_text: "Which indicator is used in the titration of sodium hydroxide against oxalic acid and what is the colour change at the end point?",
    options: [
      "Phenolphthalein, pink to yellow",
      "Alkaline $\\text{KMnO}_4$, colourless to pink",
      "Phenolphthalein, colourless to pink",
      "Methyl orange, yellow to pinkish red colour"
    ],
    correct_option: "C",
    explanation: "Titration of oxalic acid (weak acid) against sodium hydroxide (strong base) yields a basic salt at the equivalence point ($\\text{pH} > 7$, typically around $8.5 - 9.0$).\nPhenolphthalein operates in the $\\text{pH}$ range $8.3 - 10.0$ and changes colour from colourless (in acid) to pink (at alkaline endpoint)."
  },
  {
    question_number: 7,
    question_text: "The ratio of solubility of $\\text{AgCl}$ in $0.1\\text{ M KCl}$ solution to the solubility of $\\text{AgCl}$ in water is:\n(Given : Solubility product of $\\text{AgCl} = 10^{-10}$)",
    options: [
      "$10^{-4}$",
      "$10^{-6}$",
      "$10^{-9}$",
      "$10^{-5}$"
    ],
    correct_option: "A",
    explanation: "1. In pure water:\n$$K_{sp} = s^2 \\implies s = \\sqrt{K_{sp}} = \\sqrt{10^{-10}} = 10^{-5}\\text{ M}$$\n\n2. In $0.1\\text{ M KCl}$ solution:\n$[\\text{Cl}^-] = 0.1\\text{ M}$ (common ion effect, neglecting solubility contribution from $\\text{AgCl}$):\n$$K_{sp} = [\\text{Ag}^+][\\text{Cl}^-] = s' \\times 0.1$$\n$$s' = \\frac{10^{-10}}{0.1} = 10^{-9}\\text{ M}$$\n\n3. Ratio of solubility in $0.1\\text{ M KCl}$ to solubility in water:\n$$\\text{Ratio} = \\frac{s'}{s} = \\frac{10^{-9}}{10^{-5}} = 10^{-4}$$"
  },
  {
    question_number: 8,
    question_text: "For a weak acid $\\text{HA}$, the percentage of dissociation is nearly $1\\%$ at equilibrium. If the concentration of acid is $0.1\\text{ mol L}^{-1}$, then the correct option for its $K_a$ at the same temperature is:",
    options: [
      "$1 \\times 10^{-4}$",
      "$1 \\times 10^{-6}$",
      "$1 \\times 10^{-5}$",
      "$1 \\times 10^{-3}$"
    ],
    correct_option: "C",
    explanation: "Given:\n- Concentration $C = 0.1\\text{ mol L}^{-1}$\n- Degree of dissociation $\\alpha = 1\\% = 0.01 = 10^{-2}$\n\nFor a weak monobasic acid where $\\alpha \\ll 1$:\n$$K_a = C\\alpha^2 = 0.1 \\times (10^{-2})^2 = 0.1 \\times 10^{-4} = 1 \\times 10^{-5}$$"
  },
  {
    question_number: 9,
    question_text: "An acidic buffer is prepared by mixing:",
    options: [
      "weak acid and it's salt with strong base",
      "equal volumes of equimolar solutions of weak acid and weak base",
      "strong acid and it's salt with strong base",
      "strong acid and it's salt with weak base (The $\\text{p}K_a$ of acid = $\\text{p}K_b$ of the base)"
    ],
    correct_option: "A",
    explanation: "An acidic buffer solution consists of a mixture of a weak acid and its conjugate base (its salt with a strong base), such as $\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COONa}$."
  },
  {
    question_number: 10,
    question_text: "Amongst the given options which of the following molecules/ion acts as a Lewis acid?",
    options: [
      "$\\text{H}_2\\text{O}$",
      "$\\text{BF}_3$",
      "$\\text{OH}^-$",
      "$\\text{NH}_3$"
    ],
    correct_option: "B",
    explanation: "A Lewis acid is an electron-pair acceptor.\nIn $\\text{BF}_3$, the central boron atom has only 6 valence electrons in its outer shell (an electron-deficient octet with an empty $2p$ orbital), allowing it to readily accept a pair of electrons. Hence, $\\text{BF}_3$ acts as a Lewis acid.\n$\\text{H}_2\\text{O}$, $\\text{NH}_3$, and $\\text{OH}^-$ have lone pairs to donate and act as Lewis bases."
  },
  {
    question_number: 11,
    question_text: "$0.01\\text{ M}$ acetic acid solution is $1\\%$ ionised, then $\\text{pH}$ of this acetic acid solution is:",
    options: [
      "1",
      "3",
      "2",
      "4"
    ],
    correct_option: "D",
    explanation: "Given:\n- Concentration $C = 0.01\\text{ M} = 10^{-2}\\text{ M}$\n- Degree of dissociation $\\alpha = 1\\% = 0.01 = 10^{-2}$\n\nConcentration of $\\text{H}^+$ ions:\n$$[\\text{H}^+] = C\\alpha = 10^{-2} \\times 10^{-2} = 10^{-4}\\text{ M}$$\n$$\\text{pH} = -\\log[\\text{H}^+] = -\\log(10^{-4}) = 4$$"
  },
  {
    question_number: 12,
    question_text: "The $\\text{pH}$ of the solution containing $50\\text{ mL}$ each of $0.10\\text{ M}$ sodium acetate and $0.01\\text{ M}$ acetic acid is:\n[Given $\\text{p}K_a\\text{ of } \\text{CH}_3\\text{COOH} = 4.57$]",
    options: [
      "5.57",
      "3.57",
      "4.57",
      "2.57"
    ],
    correct_option: "A",
    explanation: "When equal volumes ($50\\text{ mL}$ each) are mixed, the molar concentrations are:\n$$[\\text{Salt}] = \\frac{0.10 \\times 50}{100} = 0.05\\text{ M}$$\n$$[\\text{Acid}] = \\frac{0.01 \\times 50}{100} = 0.005\\text{ M}$$\n\nUsing the Henderson-Hasselbalch equation for an acidic buffer:\n$$\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]} = 4.57 + \\log\\left(\\frac{0.05}{0.005}\\right) = 4.57 + \\log(10) = 4.57 + 1 = 5.57$$"
  },
  {
    question_number: 13,
    question_text: "The $\\text{p}K_b$ of dimethyl amine and $\\text{p}K_a$ of acetic acid are $3.27$ and $4.77$ respectively at $T\\text{ (K)}$. The correct option for the $\\text{pH}$ of dimethyl ammonium acetate solution is:",
    options: [
      "6.25",
      "8.50",
      "5.50",
      "7.75"
    ],
    correct_option: "D",
    explanation: "Dimethyl ammonium acetate is a salt of a weak acid (acetic acid) and a weak base (dimethyl amine).\nThe $\\text{pH}$ of a solution of salt of weak acid and weak base is given by:\n$$\\text{pH} = 7 + \\frac{1}{2}\\left(\\text{p}K_a - \\text{p}K_b\\right)$$\n\nSubstituting the given values:\n$$\\text{pH} = 7 + \\frac{1}{2}(4.77 - 3.27) = 7 + \\frac{1}{2}(1.50) = 7 + 0.75 = 7.75$$"
  },
  {
    question_number: 14,
    question_text: "Which among the following salt solutions is basic in nature?",
    options: [
      "Sodium acetate",
      "Ammonium chloride",
      "Ammonium sulphate",
      "Ammonium nitrate"
    ],
    correct_option: "A",
    explanation: "- Sodium acetate ($\\text{CH}_3\\text{COONa}$) is a salt formed from a weak acid ($\\text{CH}_3\\text{COOH}$) and a strong base ($\\text{NaOH}$). Anionic hydrolysis occurs, producing $\\text{OH}^-$ ions, making the aqueous solution basic ($\\text{pH} > 7$).\n- Ammonium chloride, ammonium sulphate, and ammonium nitrate are salts of a weak base ($\\text{NH}_4\\text{OH}$) and strong acids ($\\text{HCl}, \\text{H}_2\\text{SO}_4, \\text{HNO}_3$), which undergo cationic hydrolysis resulting in acidic solutions ($\\text{pH} < 7$)."
  },
  {
    question_number: 15,
    question_text: "The solubility product for a salt of the type $\\text{AB}$ is $4 \\times 10^{-8}$. What is the molarity of its standard solution?",
    options: [
      "$4 \\times 10^{-4}\\text{ mol/L}$",
      "$2 \\times 10^{-4}\\text{ mol/L}$",
      "$16 \\times 10^{-16}\\text{ mol/L}$",
      "$2 \\times 10^{-16}\\text{ mol/L}$"
    ],
    correct_option: "B",
    explanation: "For a 1:1 electrolyte of type $\\text{AB}$:\n$$\\text{AB(s)} \\rightleftharpoons \\text{A}^+(\\text{aq}) + \\text{B}^-(\\text{aq})$$\n$$K_{sp} = [\\text{A}^+][\\text{B}^-] = s^2$$\n$$s = \\sqrt{K_{sp}} = \\sqrt{4 \\times 10^{-8}} = 2 \\times 10^{-4}\\text{ mol/L}$$\n\nIn a saturated (standard) solution, the molarity equals its solubility $s = 2 \\times 10^{-4}\\text{ mol/L}$."
  },
  {
    question_number: 16,
    question_text: "Find out the solubility of $\\text{Ni(OH)}_2$ in $0.1\\text{ M NaOH}$. Given that the ionic product of $\\text{Ni(OH)}_2$ is $2 \\times 10^{-15}$.",
    options: [
      "$2 \\times 10^{-8}\\text{ M}$",
      "$1 \\times 10^{-13}\\text{ M}$",
      "$1 \\times 10^{8}\\text{ M}$",
      "$2 \\times 10^{-13}\\text{ M}$"
    ],
    correct_option: "D",
    explanation: "Dissociation equilibrium of $\\text{Ni(OH)}_2$:\n$$\\text{Ni(OH)}_2(s) \\rightleftharpoons \\text{Ni}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq})$$\nIn $0.1\\text{ M NaOH}$, $[\\text{OH}^-] \\approx 0.1\\text{ M}$ (since solubility $s$ is very small, common ion effect dominates):\n$$K_{sp} = [\\text{Ni}^{2+}][\\text{OH}^-]^2 = s \\times (0.1)^2 = s \\times 10^{-2}$$\n$$s = \\frac{K_{sp}}{10^{-2}} = \\frac{2 \\times 10^{-15}}{10^{-2}} = 2 \\times 10^{-13}\\text{ M}$$"
  },
  {
    question_number: 17,
    question_text: "The $\\text{pH}$ of $0.01\\text{ M NaOH (aq)}$ solution will be:",
    options: [
      "9",
      "7.01",
      "2",
      "12"
    ],
    correct_option: "D",
    explanation: "$\\text{NaOH}$ is a strong base that completely dissociates:\n$$[\\text{OH}^-] = 0.01\\text{ M} = 10^{-2}\\text{ M}$$\n$$\\text{pOH} = -\\log[\\text{OH}^-] = -\\log(10^{-2}) = 2$$\n$$\\text{pH} = 14 - \\text{pOH} = 14 - 2 = 12$$"
  },
  {
    question_number: 18,
    question_text: "Which of the following cannot act both as Bronsted acid and as Bronsted base?",
    options: [
      "$\\text{HSO}_4^-$",
      "$\\text{HCO}_3^-$",
      "$\\text{NH}_3$",
      "$\\text{HCl}$"
    ],
    correct_option: "D",
    explanation: "Amphiprotic species can both donate a proton (act as Bronsted acid) and accept a proton (act as Bronsted base):\n- $\\text{HSO}_4^- \\xrightarrow{-\\text{H}^+} \\text{SO}_4^{2-}$ (acid) and $\\text{HSO}_4^- \\xrightarrow{+\\text{H}^+} \\text{H}_2\\text{SO}_4$ (base)\n- $\\text{HCO}_3^- \\xrightarrow{-\\text{H}^+} \\text{CO}_3^{2-}$ (acid) and $\\text{HCO}_3^- \\xrightarrow{+\\text{H}^+} \\text{H}_2\\text{CO}_3$ (base)\n- $\\text{NH}_3 \\xrightarrow{-\\text{H}^+} \\text{NH}_2^-$ (acid) and $\\text{NH}_3 \\xrightarrow{+\\text{H}^+} \\text{NH}_4^+$ (base)\n- $\\text{HCl}$ can only donate a proton to form $\\text{Cl}^-$, but cannot act as a Bronsted base under normal conditions to accept another proton. Hence, $\\text{HCl}$ cannot act as both."
  },
  {
    question_number: 19,
    question_text: "The molar solubility of $\\text{CaF}_2$ ($K_{sp} = 5.3 \\times 10^{-11}$) in $0.1\\text{ M}$ solution of $\\text{NaF}$ will be:",
    options: [
      "$5.3 \\times 10^{-10}\\text{ mol L}^{-1}$",
      "$5.3 \\times 10^{-11}\\text{ mol L}^{-1}$",
      "$5.3 \\times 10^{-8}\\text{ mol L}^{-1}$",
      "$5.3 \\times 10^{-9}\\text{ mol L}^{-1}$"
    ],
    correct_option: "D",
    explanation: "For the dissolution of $\\text{CaF}_2$:\n$$\\text{CaF}_2(s) \\rightleftharpoons \\text{Ca}^{2+} + 2\\text{F}^- \\quad (s, \\; 2s)$$\nIn $0.1\\text{ M NaF}$, $[\\text{F}^-] = 0.1\\text{ M}$ (since $2s \\ll 0.1$ due to common ion effect):\n$$K_{sp} = [\\text{Ca}^{2+}][\\text{F}^-]^2 = s \\times (0.1)^2 = s \\times 10^{-2}$$\n$$s = \\frac{5.3 \\times 10^{-11}}{10^{-2}} = 5.3 \\times 10^{-9}\\text{ mol L}^{-1}$$"
  },
  {
    question_number: 20,
    question_text: "Conjugate base for Bronsted acids $\\text{H}_2\\text{O}$ and $\\text{HF}$ are:",
    options: [
      "$\\text{OH}^-$ and $\\text{F}^-$, respectively",
      "$\\text{H}_3\\text{O}^+$ and $\\text{H}_2\\text{F}^+$, respectively",
      "$\\text{OH}^-$ and $\\text{H}_2\\text{F}^+$, respectively",
      "$\\text{H}_3\\text{O}^+$ and $\\text{F}^-$, respectively"
    ],
    correct_option: "A",
    explanation: "A conjugate base of an acid is formed by removing a proton ($\\text{H}^+$):\n- For $\\text{H}_2\\text{O}$: $\\text{H}_2\\text{O} - \\text{H}^+ = \\text{OH}^-$\n- For $\\text{HF}$: $\\text{HF} - \\text{H}^+ = \\text{F}^-$\n\nTherefore, the conjugate bases are $\\text{OH}^-$ and $\\text{F}^-$, respectively."
  },
  {
    question_number: 21,
    question_text: "$\\text{pH}$ of a saturated solution of $\\text{Ca(OH)}_2$ is $9$. The solubility product ($K_{sp}$) of $\\text{Ca(OH)}_2$ is:",
    options: [
      "$0.125 \\times 10^{-15}$",
      "$0.5 \\times 10^{-10}$",
      "$0.5 \\times 10^{-15}$",
      "$0.25 \\times 10^{-10}$"
    ],
    correct_option: "C",
    explanation: "Given $\\text{pH} = 9$:\n$$\\text{pOH} = 14 - 9 = 5$$\n$$[\\text{OH}^-] = 10^{-\\text{pOH}} = 10^{-5}\\text{ M}$$\n\nFor $\\text{Ca(OH)}_2 \\rightleftharpoons \\text{Ca}^{2+} + 2\\text{OH}^-$:\n$$[\\text{Ca}^{2+}] = \\frac{[\\text{OH}^-]}{2} = \\frac{10^{-5}}{2} = 0.5 \\times 10^{-5}\\text{ M}$$\n\nSolubility product:\n$$K_{sp} = [\\text{Ca}^{2+}][\\text{OH}^-]^2 = (0.5 \\times 10^{-5}) \\times (10^{-5})^2 = 0.5 \\times 10^{-15}$$"
  },
  {
    question_number: 22,
    question_text: "Which will make basic buffer?",
    options: [
      "$100\\text{ mL of } 0.1\\text{ M HCl} + 200\\text{ mL of } 0.1\\text{ M NH}_4\\text{OH}$",
      "$100\\text{ mL of } 0.1\\text{ M HCl} + 100\\text{ mL of } 0.1\\text{ M NH}_4\\text{OH}$",
      "$50\\text{ mL of } 0.1\\text{ M NaOH} + 25\\text{ mL of } 0.1\\text{ M CH}_3\\text{COOH}$",
      "$100\\text{ mL of } 0.1\\text{ M CH}_3\\text{COOH} + 100\\text{ mL of } 0.1\\text{ M NaOH}$"
    ],
    correct_option: "A",
    explanation: "A basic buffer consists of a weak base and its salt with a strong acid.\nIn option (A):\n- $\\text{HCl} = 100 \\times 0.1 = 10\\text{ mmol}$\n- $\\text{NH}_4\\text{OH} = 200 \\times 0.1 = 20\\text{ mmol}$\n\nReaction:\n$$\\text{HCl} + \\text{NH}_4\\text{OH} \\rightarrow \\text{NH}_4\\text{Cl} + \\text{H}_2\\text{O}$$\nAfter reaction:\n- Remaining $\\text{NH}_4\\text{OH} = 20 - 10 = 10\\text{ mmol}$ (weak base)\n- Formed $\\text{NH}_4\\text{Cl} = 10\\text{ mmol}$ (salt with strong acid)\nSince both weak base ($\\text{NH}_4\\text{OH}$) and its salt ($\\text{NH}_4\\text{Cl}$) are present, it forms a basic buffer."
  },
  {
    question_number: 23,
    question_text: "Following solutions were prepared by mixing different volumes of $\\text{NaOH}$ and $\\text{HCl}$ of different concentrations:\n\nA. $60\\text{ mL } \\frac{\\text{M}}{10}\\text{ HCl} + 40\\text{ mL } \\frac{\\text{M}}{10}\\text{ NaOH}$\nB. $55\\text{ mL } \\frac{\\text{M}}{10}\\text{ HCl} + 45\\text{ mL } \\frac{\\text{M}}{10}\\text{ NaOH}$\nC. $75\\text{ mL } \\frac{\\text{M}}{5}\\text{ HCl} + 25\\text{ mL } \\frac{\\text{M}}{5}\\text{ NaOH}$\nD. $100\\text{ mL } \\frac{\\text{M}}{10}\\text{ HCl} + 100\\text{ mL } \\frac{\\text{M}}{10}\\text{ NaOH}$\n\n$\\text{pH}$ of which one of them will be equal to 1?",
    options: [
      "B",
      "A",
      "D",
      "C"
    ],
    correct_option: "D",
    explanation: "For $\\text{pH} = 1$, the concentration of $\\text{H}^+$ must be:\n$$[\\text{H}^+] = 10^{-1}\\text{ M} = 0.1\\text{ M}$$\n\nLet's evaluate each mixture:\n- In C:\n  $$\\text{mmoles of HCl} = 75 \\times 0.2 = 15\\text{ mmol}$$\n  $$\\text{mmoles of NaOH} = 25 \\times 0.2 = 5\\text{ mmol}$$\n  $$\\text{Remaining mmoles of } \\text{H}^+ = 15 - 5 = 10\\text{ mmol}$$\n  $$\\text{Total volume} = 75 + 25 = 100\\text{ mL}$$\n  $$[\\text{H}^+] = \\frac{10}{100} = 0.1\\text{ M} = 10^{-1}\\text{ M} \\implies \\text{pH} = 1$$\n\nSolution C gives $\\text{pH} = 1$, which is given in option (D)."
  },
  {
    question_number: 24,
    question_text: "The solubility of $\\text{BaSO}_4$ in water is $2.42 \\times 10^{-3}\\text{ g L}^{-1}$ at $298\\text{ K}$. The value of its solubility product ($K_{sp}$) will be (Given molar mass of $\\text{BaSO}_4 = 233\\text{ g mol}^{-1}$):",
    options: [
      "$1.08 \\times 10^{-10}\\text{ mol}^2\\text{ L}^{-2}$",
      "$1.08 \\times 10^{-12}\\text{ mol}^2\\text{ L}^{-2}$",
      "$1.08 \\times 10^{-14}\\text{ mol}^2\\text{ L}^{-2}$",
      "$1.08 \\times 10^{-8}\\text{ mol}^2\\text{ L}^{-2}$"
    ],
    correct_option: "A",
    explanation: "First, convert solubility from $\\text{g L}^{-1}$ to molar solubility ($s$ in $\\text{mol L}^{-1}$):\n$$s = \\frac{2.42 \\times 10^{-3}\\text{ g L}^{-1}}{233\\text{ g mol}^{-1}} \\approx 1.0386 \\times 10^{-5}\\text{ mol L}^{-1}$$\n\nFor $\\text{BaSO}_4(s) \\rightleftharpoons \\text{Ba}^{2+} + \\text{SO}_4^{2-}$:\n$$K_{sp} = s^2 = (1.0386 \\times 10^{-5})^2 \\approx 1.08 \\times 10^{-10}\\text{ mol}^2\\text{ L}^{-2}$$"
  },
  {
    question_number: 25,
    question_text: "Concentration of the $\\text{Ag}^+$ ions in a saturated solution of $\\text{Ag}_2\\text{C}_2\\text{O}_4$ is $2.2 \\times 10^{-4}\\text{ mol L}^{-1}$. Solubility product of $\\text{Ag}_2\\text{C}_2\\text{O}_4$ is:",
    options: [
      "$2.66 \\times 10^{-12}$",
      "$4.5 \\times 10^{-11}$",
      "$5.3 \\times 10^{-12}$",
      "$2.42 \\times 10^{-8}$"
    ],
    correct_option: "C",
    explanation: "For the dissociation:\n$$\\text{Ag}_2\\text{C}_2\\text{O}_4(s) \\rightleftharpoons 2\\text{Ag}^+ + \\text{C}_2\\text{O}_4^{2-}$$\nGiven $[\\text{Ag}^+] = 2.2 \\times 10^{-4}\\text{ mol L}^{-1}$.\nFrom the stoichiometry:\n$$[\\text{C}_2\\text{O}_4^{2-}] = \\frac{[\\text{Ag}^+]}{2} = \\frac{2.2 \\times 10^{-4}}{2} = 1.1 \\times 10^{-4}\\text{ mol L}^{-1}$$\n\nSolubility product:\n$$K_{sp} = [\\text{Ag}^+]^2[\\text{C}_2\\text{O}_4^{2-}] = (2.2 \\times 10^{-4})^2 \\times (1.1 \\times 10^{-4})$$\n$$= 4.84 \\times 10^{-8} \\times 1.1 \\times 10^{-4} = 5.324 \\times 10^{-12} \\approx 5.3 \\times 10^{-12}$$"
  }
];
