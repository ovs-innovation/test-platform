// Ionic Equilibrium PYQ - Part 3 (Q51 - Q70)

export const part3Questions = [
  {
    question_number: 51,
    question_text: "The ionization constant of ammonium hydroxide is $1.77 \\times 10^{-5}$ at $298\\text{ K}$. Hydrolysis constant of ammonium chloride is:",
    options: [
      "$6.50 \\times 10^{-12}$",
      "$5.65 \\times 10^{-13}$",
      "$5.65 \\times 10^{-12}$",
      "$5.65 \\times 10^{-10}$"
    ],
    correct_option: "D",
    explanation: "Ammonium chloride ($\\text{NH}_4\\text{Cl}$) is a salt of a strong acid ($\\text{HCl}$) and a weak base ($\\text{NH}_4\\text{OH}$).\nThe hydrolysis constant $K_h$ is given by:\n$$K_h = \\frac{K_w}{K_b}$$\nSubstituting $K_w = 10^{-14}$ and $K_b = 1.77 \\times 10^{-5}$ at $298\\text{ K}$:\n$$K_h = \\frac{10^{-14}}{1.77 \\times 10^{-5}} \\approx 0.56497 \\times 10^{-9} \\approx 5.65 \\times 10^{-10}$$"
  },
  {
    question_number: 52,
    question_text: "What is the $[\\text{OH}^-]$ in the final solution prepared by mixing $20.0\\text{ mL}$ of $0.050\\text{ M HCl}$ with $30.0\\text{ mL}$ of $0.10\\text{ M Ba(OH)}_2$?",
    options: [
      "$0.40\\text{ M}$",
      "$0.0050\\text{ M}$",
      "$0.12\\text{ M}$",
      "$0.10\\text{ M}$"
    ],
    correct_option: "D",
    explanation: "1. Millimoles of $\\text{H}^+$ from $\\text{HCl}$:\n$$\\text{mmoles of } \\text{H}^+ = 20.0 \\times 0.050 = 1.0\\text{ mmol}$$\n\n2. Millimoles of $\\text{OH}^-$ from $\\text{Ba(OH)}_2$:\n$$\\text{mmoles of } \\text{OH}^- = 30.0 \\times 0.10 \\times 2 = 6.0\\text{ mmol}$$\n\n3. Neutralization reaction:\n$$\\text{H}^+ + \\text{OH}^- \\rightarrow \\text{H}_2\\text{O}$$\n$$\\text{Excess mmoles of } \\text{OH}^- = 6.0 - 1.0 = 5.0\\text{ mmol}$$\n$$\\text{Total volume} = 20.0 + 30.0 = 50.0\\text{ mL}$$\n$$[\\text{OH}^-] = \\frac{5.0\\text{ mmol}}{50.0\\text{ mL}} = 0.10\\text{ M}$$"
  },
  {
    question_number: 53,
    question_text: "If the concentration of $\\text{OH}^-$ ions in the reaction\n$$\\text{Fe(OH)}_3(s) \\rightleftharpoons \\text{Fe}^{3+}(\\text{aq}) + 3\\text{OH}^-(\\text{aq})$$\nis decreased by $1/4$ times, then equilibrium concentration of $\\text{Fe}^{3+}$ will increase by:",
    options: [
      "64 times",
      "4 times",
      "8 times",
      "16 times"
    ],
    correct_option: "A",
    explanation: "The solubility product expression is:\n$$K_{sp} = [\\text{Fe}^{3+}][\\text{OH}^-]^3$$\nAt constant temperature, $K_{sp}$ remains constant.\nIf $[\\text{OH}^-] ' = \\frac{1}{4}[\\text{OH}^-]$, then:\n$$K_{sp} = [\\text{Fe}^{3+}]' \\times \\left(\\frac{[\\text{OH}^-]}{4}\\right)^3 = [\\text{Fe}^{3+}]' \\times \\frac{[\\text{OH}^-]^3}{64}$$\n$$[\\text{Fe}^{3+}]' = 64 \\times \\frac{K_{sp}}{[\\text{OH}^-]^3} = 64 [\\text{Fe}^{3+}]$$\nThus, the concentration of $\\text{Fe}^{3+}$ will increase by $64$ times."
  },
  {
    question_number: 54,
    question_text: "Equal volumes of three acid solutions of $\\text{pH } 3, 4$ and $5$ are mixed in a vessel. What will be the $\\text{H}^+$ ion concentration in the mixture?",
    options: [
      "$3.7 \\times 10^{-3}\\text{ M}$",
      "$1.11 \\times 10^{-3}\\text{ M}$",
      "$1.11 \\times 10^{-4}\\text{ M}$",
      "$3.7 \\times 10^{-4}\\text{ M}$"
    ],
    correct_option: "D",
    explanation: "Let the volume of each solution mixed be $V$.\n$$[\\text{H}^+]_1 = 10^{-3}\\text{ M}, \\quad [\\text{H}^+]_2 = 10^{-4}\\text{ M}, \\quad [\\text{H}^+]_3 = 10^{-5}\\text{ M}$$\nTotal moles of $\\text{H}^+$:\n$$n_{\\text{total}} = V(10^{-3} + 10^{-4} + 10^{-5}) = V(10^{-3} + 0.1 \\times 10^{-3} + 0.01 \\times 10^{-3}) = 1.11 \\times 10^{-3} V$$\nTotal volume $V_{\\text{total}} = 3V$.\n$$[\\text{H}^+]_{\\text{mix}} = \\frac{1.11 \\times 10^{-3} V}{3V} = \\frac{1.11}{3} \\times 10^{-3} = 0.37 \\times 10^{-3}\\text{ M} = 3.7 \\times 10^{-4}\\text{ M}$$"
  },
  {
    question_number: 55,
    question_text: "A weak acid, $\\text{HA}$, has a $K_a$ of $1.00 \\times 10^{-5}$. If $0.100\\text{ mol}$ of this acid is dissolved in one litre of water, the percentage of acid dissociated at equilibrium is closest to:",
    options: [
      "1.00%",
      "99.9%",
      "0.100%",
      "99.0%"
    ],
    correct_option: "A",
    explanation: "For a weak monoprotic acid:\n$$\\alpha = \\sqrt{\\frac{K_a}{C}} = \\sqrt{\\frac{1.00 \\times 10^{-5}}{0.100}} = \\sqrt{10^{-4}} = 10^{-2} = 0.01$$\nPercentage of acid dissociated:\n$$\\% \\alpha = 0.01 \\times 100 = 1.00\\%$$"
  },
  {
    question_number: 56,
    question_text: "Calculate the $\\text{pOH}$ of a solution at $25^\\circ\\text{C}$ that contains $1 \\times 10^{-10}\\text{ M}$ of hydronium ions, i.e. $\\text{H}_3\\text{O}^+$.",
    options: [
      "4.000",
      "9.000",
      "1.000",
      "7.000"
    ],
    correct_option: "A",
    explanation: "Given $[\\text{H}_3\\text{O}^+] = 1 \\times 10^{-10}\\text{ M}$:\n$$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] = -\\log(10^{-10}) = 10$$\nAt $25^\\circ\\text{C}$, $\\text{pH} + \\text{pOH} = 14$:\n$$\\text{pOH} = 14 - \\text{pH} = 14 - 10 = 4.000$$"
  },
  {
    question_number: 57,
    question_text: "Which of the following pairs constitutes a buffer?",
    options: [
      "$\\text{HCl}$ and $\\text{KCl}$",
      "$\\text{HNO}_2$ and $\\text{NaNO}_2$",
      "$\\text{NaOH}$ and $\\text{NaCl}$",
      "$\\text{HNO}_3$ and $\\text{NH}_4\\text{NO}_3$"
    ],
    correct_option: "B",
    explanation: "A buffer solution consists of a weak acid and its salt with a strong base, or a weak base and its salt with a strong acid.\n$\\text{HNO}_2$ is a weak acid and $\\text{NaNO}_2$ is its salt with a strong base ($\\text{NaOH}$). Hence, the pair $\\text{HNO}_2 + \\text{NaNO}_2$ constitutes an acidic buffer.\nThe other pairs contain strong acids ($\\text{HCl}, \\text{HNO}_3$) or strong bases ($\\text{NaOH}$) and do not form buffers."
  },
  {
    question_number: 58,
    question_text: "The hydrogen ion concentration of a $10^{-8}\\text{ M}$, $\\text{HCl}$ aqueous solution at $298\\text{ K}$ ($K_w = 10^{-14}$) is:",
    options: [
      "$1.0 \\times 10^{-8}\\text{ M}$",
      "$1.0 \\times 10^{-6}\\text{ M}$",
      "$1.0525 \\times 10^{-7}\\text{ M}$",
      "$9.525 \\times 10^{-8}\\text{ M}$"
    ],
    correct_option: "C",
    explanation: "In very dilute acid solutions ($10^{-8}\\text{ M}$), the ionization of water cannot be neglected.\nLet $[\\text{H}^+]$ from water be $x$.\nTotal $[\\text{H}^+] = 10^{-8} + x$, and $[\\text{OH}^-] = x$.\n$$K_w = [\\text{H}^+][\\text{OH}^-] = (10^{-8} + x)x = 10^{-14}$$\n$$x^2 + 10^{-8}x - 10^{-14} = 0$$\nSolving for $x$:\n$$x = \\frac{-10^{-8} + \\sqrt{10^{-16} + 4 \\times 10^{-14}}}{2} = \\frac{-10^{-8} + \\sqrt{4.01 \\times 10^{-14}}}{2}$$\n$$= \\frac{-0.1 \\times 10^{-7} + 2.0025 \\times 10^{-7}}{2} = 0.95125 \\times 10^{-7}\\text{ M}$$\n\nTotal $[\\text{H}^+] = 10^{-8} + 0.95125 \\times 10^{-7} = 0.10 \\times 10^{-7} + 0.9525 \\times 10^{-7} = 1.0525 \\times 10^{-7}\\text{ M}$"
  },
  {
    question_number: 59,
    question_text: "At $25^\\circ\\text{C}$, the dissociation constant of a base, $\\text{BOH}$, is $1.0 \\times 10^{-12}$. The concentration of hydroxyl ions in $0.01\\text{ M}$ aqueous solution of the base would be:",
    options: [
      "$1.0 \\times 10^{-5}\\text{ mol L}^{-1}$",
      "$1.0 \\times 10^{-6}\\text{ mol L}^{-1}$",
      "$2.0 \\times 10^{-6}\\text{ mol L}^{-1}$",
      "$1.0 \\times 10^{-7}\\text{ mol L}^{-1}$"
    ],
    correct_option: "D",
    explanation: "For a weak monoacidic base:\n$$[\\text{OH}^-] = \\sqrt{K_b \\times C} = \\sqrt{(1.0 \\times 10^{-12}) \\times 0.01} = \\sqrt{1.0 \\times 10^{-14}} = 1.0 \\times 10^{-7}\\text{ mol L}^{-1}$$"
  },
  {
    question_number: 60,
    question_text: "$\\text{H}_2\\text{S}$ gas when passed through a solution of cations containing $\\text{HCl}$ precipitates the cations of second group of qualitative analysis but not those belonging to the fourth group. It is because:",
    options: [
      "presence of $\\text{HCl}$ decreases the sulphide ion concentration",
      "solubility product of group II sulphides is more than that of group IV sulphates",
      "presence of $\\text{HCl}$ increases the sulphide ion concentration",
      "sulphides of group IV cations are unstable in $\\text{HCl}$."
    ],
    correct_option: "A",
    explanation: "In qualitative salt analysis, $\\text{HCl}$ is added in Group II as a source of $\\text{H}^+$ ions. Due to the common ion effect, the ionization of the weak acid $\\text{H}_2\\text{S}$ is suppressed:\n$$\\text{H}_2\\text{S} \\rightleftharpoons 2\\text{H}^+ + \\text{S}^{2-}$$\nThis significantly lowers the $[\\text{S}^{2-}]$, allowing the ionic product to exceed only the very low solubility products ($K_{sp}$) of Group II metal sulphides (like $\\text{CuS}, \\text{PbS}, \\text{Bi}_2\\text{S}_3$), without precipitating Group IV cations (like $\\text{Zn}^{2+}, \\text{Ni}^{2+}, \\text{Mn}^{2+}$) which have much higher $K_{sp}$ values."
  },
  {
    question_number: 61,
    question_text: "The solubility product of a sparingly soluble salt $\\text{AX}_2$ is $3.2 \\times 10^{-11}$. Its solubility (in moles/L) is:",
    options: [
      "$5.6 \\times 10^{-6}$",
      "$3.1 \\times 10^{-4}$",
      "$2 \\times 10^{-4}$",
      "$4 \\times 10^{-4}$"
    ],
    correct_option: "C",
    explanation: "For $\\text{AX}_2(s) \\rightleftharpoons \\text{A}^{2+} + 2\\text{X}^-$:\n$$K_{sp} = [\\text{A}^{2+}][\\text{X}^-]^2 = s(2s)^2 = 4s^3$$\n$$4s^3 = 3.2 \\times 10^{-11} = 32 \\times 10^{-12}$$\n$$s^3 = 8 \\times 10^{-12}$$\n$$s = (8 \\times 10^{-12})^{1/3} = 2 \\times 10^{-4}\\text{ mol L}^{-1}$$"
  },
  {
    question_number: 62,
    question_text: "The rapid change of $\\text{pH}$ near the stoichiometric point of an acid-base titration is the basis of indicator detection. $\\text{pH}$ of the solution is related to ratio of the concentrations of the conjugate acid ($\\text{HIn}$) and base ($\\text{In}^-$) forms of the indicator by the expression:",
    options: [
      "$\\log\\frac{[\\text{In}^-]}{[\\text{HIn}]} = \\text{p}K_{\\text{In}} - \\text{pH}$",
      "$\\log\\frac{[\\text{HIn}]}{[\\text{In}^-]} = \\text{p}K_{\\text{In}} - \\text{pH}$",
      "$\\log\\frac{[\\text{HIn}]}{[\\text{In}^-]} = \\text{pH} - \\text{p}K_{\\text{In}}$",
      "$\\log\\frac{[\\text{In}^-]}{[\\text{HIn}]} = \\text{pH} - \\text{p}K_{\\text{In}}$"
    ],
    correct_option: "D",
    explanation: "For an indicator acid dissociation:\n$$\\text{HIn} \\rightleftharpoons \\text{H}^+ + \\text{In}^-$$\n$$K_{\\text{In}} = \\frac{[\\text{H}^+][\\text{In}^-]}{[\\text{HIn}]}$$\nTaking negative logarithm on both sides:\n$$-\\log[\\text{H}^+] = -\\log K_{\\text{In}} + \\log\\frac{[\\text{In}^-]}{[\\text{HIn}]}$$\n$$\\text{pH} = \\text{p}K_{\\text{In}} + \\log\\frac{[\\text{In}^-]}{[\\text{HIn}]}$$\nRearranging gives:\n$$\\log\\frac{[\\text{In}^-]}{[\\text{HIn}]} = \\text{pH} - \\text{p}K_{\\text{In}}$$"
  },
  {
    question_number: 63,
    question_text: "The solubility product of $\\text{AgI}$ at $25^\\circ\\text{C}$ is $1.0 \\times 10^{-16}\\text{ mol}^2\\text{ L}^{-2}$. The solubility of $\\text{AgI}$ in $10^{-4}\\text{ N}$ solution of $\\text{KI}$ at $25^\\circ\\text{C}$ is approximately (in $\\text{mol L}^{-1}$):",
    options: [
      "$1.0 \\times 10^{-16}$",
      "$1.0 \\times 10^{-12}$",
      "$1.0 \\times 10^{-10}$",
      "$1.0 \\times 10^{-8}$"
    ],
    correct_option: "B",
    explanation: "In $10^{-4}\\text{ N KI}$ solution (for $\\text{KI}$, $1\\text{ N} = 1\\text{ M}$), $[\\text{I}^-] = 10^{-4}\\text{ M}$.\nDue to common ion effect:\n$$K_{sp} = [\\text{Ag}^+][\\text{I}^-] = s \\times 10^{-4}$$\n$$s = \\frac{K_{sp}}{10^{-4}} = \\frac{1.0 \\times 10^{-16}}{10^{-4}} = 1.0 \\times 10^{-12}\\text{ mol L}^{-1}$$"
  },
  {
    question_number: 64,
    question_text: "Solubility of $\\text{MX}_2$ type electrolytes is $0.5 \\times 10^{-4}\\text{ mole/lit.}$, then find out $K_{sp}$ of electrolytes.",
    options: [
      "$5 \\times 10^{-12}$",
      "$25 \\times 10^{-10}$",
      "$1 \\times 10^{-13}$",
      "$5 \\times 10^{-13}$"
    ],
    correct_option: "D",
    explanation: "For an electrolyte of type $\\text{MX}_2$:\n$$\\text{MX}_2(s) \\rightleftharpoons \\text{M}^{2+} + 2\\text{X}^-$$\n$$K_{sp} = [\\text{M}^{2+}][\\text{X}^-]^2 = s(2s)^2 = 4s^3$$\nGiven $s = 0.5 \\times 10^{-4}\\text{ mol L}^{-1}$:\n$$K_{sp} = 4(0.5 \\times 10^{-4})^3 = 4 \\times (0.125 \\times 10^{-12}) = 0.5 \\times 10^{-12} = 5 \\times 10^{-13}$$"
  },
  {
    question_number: 65,
    question_text: "Which has highest $\\text{pH}$?",
    options: [
      "$\\text{CH}_3\\text{COOK}$",
      "$\\text{Na}_2\\text{CO}_3$",
      "$\\text{NH}_4\\text{Cl}$",
      "$\\text{NaNO}_3$"
    ],
    correct_option: "B",
    explanation: "- $\\text{NH}_4\\text{Cl}$ is a salt of weak base and strong acid $\\implies$ acidic ($\\text{pH} < 7$).\n- $\\text{NaNO}_3$ is a salt of strong acid and strong base $\\implies$ neutral ($\\text{pH} \\approx 7$).\n- $\\text{CH}_3\\text{COOK}$ is a salt of strong base and weak monobasic acid ($\\text{CH}_3\\text{COOH}$, $K_a \\approx 1.8 \\times 10^{-5}$) $\\implies$ basic ($\\text{pH} \\approx 8.5 - 9$).\n- $\\text{Na}_2\\text{CO}_3$ is a salt of strong base and very weak polyprotic acid ($\\text{H}_2\\text{CO}_3$, $K_{a_2} \\approx 4.7 \\times 10^{-11}$). Its hydrolysis produces significant $[\\text{OH}^-]$ ($\\text{pH} \\approx 11.5$).\nTherefore, $\\text{Na}_2\\text{CO}_3$ has the highest $\\text{pH}$."
  },
  {
    question_number: 66,
    question_text: "Solution of $0.1\\text{ N NH}_4\\text{OH}$ and $0.1\\text{ N NH}_4\\text{Cl}$ has $\\text{pH } 9.25$. Then find out $\\text{p}K_b$ of $\\text{NH}_4\\text{OH}$.",
    options: [
      "9.25",
      "4.75",
      "3.75",
      "8.25"
    ],
    correct_option: "B",
    explanation: "Given $\\text{pH} = 9.25$:\n$$\\text{pOH} = 14 - 9.25 = 4.75$$\nFrom the Henderson-Hasselbalch equation for a basic buffer:\n$$\\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{Salt}]}{[\\text{Base}]}$$\nSince $[\\text{Salt}] = [\\text{Base}] = 0.1\\text{ N}$:\n$$\\log\\left(\\frac{0.1}{0.1}\\right) = \\log 1 = 0$$\n$$\\text{p}K_b = \\text{pOH} = 4.75$$"
  },
  {
    question_number: 67,
    question_text: "In $\\text{HS}^-$, $\\text{I}^-$, $\\text{R}-\\text{NH}_2$, $\\text{NH}_3$ order of proton accepting tendency will be:",
    options: [
      "$\\text{I}^- > \\text{NH}_3 > \\text{R}-\\text{NH}_2 > \\text{HS}^-$",
      "$\\text{NH}_3 > \\text{R}-\\text{NH}_2 > \\text{HS}^- > \\text{I}^-$",
      "$\\text{R}-\\text{NH}_2 > \\text{NH}_3 > \\text{HS}^- > \\text{I}^-$",
      "$\\text{HS}^- > \\text{R}-\\text{NH}_2 > \\text{NH}_3 > \\text{I}^-$"
    ],
    correct_option: "C",
    explanation: "Proton accepting tendency is a measure of base strength:\n1. $\\text{HI}$ is a very strong acid, so its conjugate base $\\text{I}^-$ is an extremely weak base (least tendency to accept a proton).\n2. $\\text{H}_2\\text{S}$ is stronger than amine conjugate acids, so $\\text{HS}^-$ is a weaker base than amines/ammonia.\n3. Among $\\text{R}-\\text{NH}_2$ and $\\text{NH}_3$, the alkyl group in $\\text{R}-\\text{NH}_2$ exerts an electron-donating $+I$ inductive effect, increasing electron density on nitrogen and making it a stronger proton acceptor than $\\text{NH}_3$.\n\nHence, the correct order is:\n$$\\text{R}-\\text{NH}_2 > \\text{NH}_3 > \\text{HS}^- > \\text{I}^-$$"
  },
  {
    question_number: 68,
    question_text: "Ionisation constant of $\\text{CH}_3\\text{COOH}$ is $1.7 \\times 10^{-5}$ and concentration of $\\text{H}^+$ ions is $3.4 \\times 10^{-4}$. Then find out initial concentration of $\\text{CH}_3\\text{COOH}$ molecules.",
    options: [
      "$3.4 \\times 10^{-4}$",
      "$3.4 \\times 10^{-3}$",
      "$6.8 \\times 10^{-4}$",
      "$6.8 \\times 10^{-3}$"
    ],
    correct_option: "D",
    explanation: "For the dissociation of acetic acid:\n$$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+$$\n$$K_a = \\frac{[\\text{H}^+]^2}{C} \\implies C = \\frac{[\\text{H}^+]^2}{K_a}$$\nGiven $[\\text{H}^+] = 3.4 \\times 10^{-4}\\text{ M}$ and $K_a = 1.7 \\times 10^{-5}$:\n$$C = \\frac{(3.4 \\times 10^{-4})^2}{1.7 \\times 10^{-5}} = \\frac{11.56 \\times 10^{-8}}{1.7 \\times 10^{-5}} = 6.8 \\times 10^{-3}\\text{ M}$$"
  },
  {
    question_number: 69,
    question_text: "Solubility of $\\text{M}_2\\text{S}$ salt is $3.5 \\times 10^{-6}$ then find out solubility product.",
    options: [
      "$1.7 \\times 10^{-6}$",
      "$1.7 \\times 10^{-16}$",
      "$1.7 \\times 10^{-18}$",
      "$1.7 \\times 10^{-12}$"
    ],
    correct_option: "B",
    explanation: "For the salt $\\text{M}_2\\text{S}$:\n$$\\text{M}_2\\text{S}(s) \\rightleftharpoons 2\\text{M}^+ + \\text{S}^{2-}$$\n$$[\\text{M}^+] = 2s, \\quad [\\text{S}^{2-}] = s$$\n$$K_{sp} = [\\text{M}^+]^2[\\text{S}^{2-}] = (2s)^2(s) = 4s^3$$\nGiven $s = 3.5 \\times 10^{-6}\\text{ mol L}^{-1}$:\n$$K_{sp} = 4 \\times (3.5 \\times 10^{-6})^3 = 4 \\times 42.875 \\times 10^{-18} = 171.5 \\times 10^{-18} \\approx 1.715 \\times 10^{-16} \\approx 1.7 \\times 10^{-16}$$"
  },
  {
    question_number: 70,
    question_text: "Correct relation between dissociation constants of a dibasic acid is:",
    options: [
      "$K_{a_1} = K_{a_2}$",
      "$K_{a_1} > K_{a_2}$",
      "$K_{a_1} < K_{a_2}$",
      "$K_{a_1} = \\frac{1}{K_{a_2}}$"
    ],
    correct_option: "B",
    explanation: "For a dibasic acid $\\text{H}_2\\text{A}$:\n1. $\\text{H}_2\\text{A} \\rightleftharpoons \\text{H}^+ + \\text{HA}^- \\quad (K_{a_1})$\n2. $\\text{HA}^- \\rightleftharpoons \\text{H}^+ + \\text{A}^{2-} \\quad (K_{a_2})$\n\nRemoving a proton from a neutral molecule ($\\text{H}_2\\text{A}$) is much easier than removing a positively charged proton from a negatively charged ion ($\\text{HA}^-$) due to electrostatic attraction. Hence, $K_{a_1} > K_{a_2}$."
  }
];

