export const batch1 = [
  {
    question_number: 1,
    question_text: "The domain of $\\sin^{-1} [\\log_3 (x/3)]$ is :",
    options: [
      "$[1, 9]$",
      "$[-1, 9]$",
      "$[-9, 1]$",
      "$[-9, -1]$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Domain of Function",
    solution: "$f(x) = \\sin^{-1} (\\log_3 (x/3))$ exists if:\n$$-1 \\le \\log_3 (x/3) \\le 1$$\n$$3^{-1} \\le \\frac{x}{3} \\le 3^1$$\n$$\\frac{1}{3} \\le \\frac{x}{3} \\le 3$$\n$$1 \\le x \\le 9 \\implies x \\in [1, 9]$$"
  },
  {
    question_number: 2,
    question_text: "Which one is not periodic ?",
    options: [
      "$|\\sin 3x| + \\sin^2 x$",
      "$\\cos \\sqrt{x} + \\cos^2 x$",
      "$\\cos 4x + \\tan^2 x$",
      "$\\cos 2x + \\sin x$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Periodic Functions",
    solution: "The function $\\cos \\sqrt{x}$ has a non-linear argument $\\sqrt{x}$. For any positive period $T$, $\\cos\\sqrt{x + T} = \\cos\\sqrt{x}$ cannot hold for all $x \\ge 0$ because $\\sqrt{x + T} - \\sqrt{x} \\to 0$ as $x \\to \\infty$.\n\nHence, $\\cos \\sqrt{x} + \\cos^2 x$ is not periodic."
  },
  {
    question_number: 3,
    question_text: "If $f(x + y) = f(x) \\cdot f(y) \\, \\forall x, y$ and $f(5) = 2$, $f'(0) = 3$, then $f'(5)$ is :",
    options: [
      "0",
      "1",
      "6",
      "2"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Functional Equations",
    solution: "Given $f(x + y) = f(x) f(y)$. Differentiating with respect to $x$ treating $y$ as constant:\n$$f'(x + y) = f'(x) f(y)$$\nPutting $x = 0$ and $y = x$:\n$$f'(x) = f'(0) f(x)$$\nGiven $f'(0) = 3$, we have:\n$$f'(x) = 3 f(x)$$\nTherefore:\n$$f'(5) = 3 f(5) = 3 \\times 2 = 6$$"
  },
  {
    question_number: 4,
    question_text: "Domain of definition of the function $f(x) = \\frac{3}{4 - x^2} + \\log_{10} (x^3 - x)$, is :",
    options: [
      "$(-1, 0) \\cup (1, 2) \\cup (2, \\infty)$",
      "$(0, 2)$",
      "$(-1, 0) \\cup (0, 2)$",
      "$(1, 2) \\cup (2, \\infty)$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Domain of Function",
    solution: "For $f(x) = \\frac{3}{4 - x^2} + \\log_{10} (x^3 - x)$ to be defined:\n1. Denominator $4 - x^2 \\ne 0 \\implies x \\ne \\pm 2$.\n2. Argument of log $x^3 - x > 0 \\implies x(x^2 - 1) > 0 \\implies x(x - 1)(x + 1) > 0$.\n\nBy wavy curve method, $x \\in (-1, 0) \\cup (1, \\infty)$.\nExcluding $x = 2$ from $(1, \\infty)$:\n$$D = (-1, 0) \\cup (1, 2) \\cup (2, \\infty)$$"
  },
  {
    question_number: 5,
    question_text: "The function $f(x) = \\log (x + \\sqrt{x^2 + 1})$, is :",
    options: [
      "neither an even nor an odd function",
      "an even function",
      "an odd function",
      "a periodic function"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Even and Odd Functions",
    solution: "Given $f(x) = \\log (x + \\sqrt{x^2 + 1})$.\n$$f(-x) = \\log (-x + \\sqrt{x^2 + 1})$$\nRationalizing the argument:\n$$-x + \\sqrt{x^2 + 1} = \\frac{(\\sqrt{x^2 + 1} - x)(\\sqrt{x^2 + 1} + x)}{\\sqrt{x^2 + 1} + x} = \\frac{1}{x + \\sqrt{x^2 + 1}}$$\nThus:\n$$f(-x) = \\log \\left( \\frac{1}{x + \\sqrt{x^2 + 1}} \\right) = -\\log (x + \\sqrt{x^2 + 1}) = -f(x)$$\nSince $f(-x) = -f(x)$, $f(x)$ is an odd function."
  },
  {
    question_number: 6,
    question_text: "A function $f$ from the set of natural numbers to integers defined by $f(n) = \\begin{cases} \\frac{n - 1}{2}, & \\text{when } n \\text{ is odd} \\\\ -\\frac{n}{2}, & \\text{when } n \\text{ is even} \\end{cases}$ is :",
    options: [
      "neither one-one nor onto",
      "one-one but not onto",
      "onto but not one-one",
      "one-one and onto both"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Classification of Functions",
    solution: "Consider $f : \\mathbf{N} \\to \\mathbf{Z}$:\n- For odd natural numbers: $f(1) = 0, f(3) = 1, f(5) = 2, f(7) = 3, \\dots$, which bijectively maps odd natural numbers to all non-negative integers $\\{0, 1, 2, \\dots\\}$.\n- For even natural numbers: $f(2) = -1, f(4) = -2, f(6) = -3, \\dots$, which bijectively maps even natural numbers to all negative integers $\\{-1, -2, -3, \\dots\\}$.\n\nEvery integer $y \\in \\mathbf{Z}$ has a unique preimage in $\\mathbf{N}$, and distinct elements of $\\mathbf{N}$ map to distinct integers.\nHence, $f$ is both one-one and onto (bijective)."
  },
  {
    question_number: 7,
    question_text: "If $f : \\mathbf{R} \\to \\mathbf{R}$ satisfies $f(x + y) = f(x) + f(y)$, for all $x, y \\in \\mathbf{R}$ and $f(1) = 7$, then $\\sum_{r=1}^{n} f(r)$ is :",
    options: [
      "$\\frac{7n(n + 1)}{2}$",
      "$\\frac{7n}{2}$",
      "$\\frac{7(n + 1)}{2}$",
      "$7n + (n + 1)$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Functional Equations",
    solution: "The functional relation $f(x + y) = f(x) + f(y)$ implies $f(x) = mx$ for some constant $m$.\nGiven $f(1) = 7 \\implies m = 7$, so $f(x) = 7x$.\n\nThen:\n$$\\sum_{r=1}^n f(r) = \\sum_{r=1}^n 7r = 7 \\sum_{r=1}^n r = 7 \\cdot \\frac{n(n + 1)}{2} = \\frac{7n(n + 1)}{2}$$"
  },
  {
    question_number: 8,
    question_text: "The domain of the function $f(x) = \\frac{\\sin^{-1}(x - 3)}{\\sqrt{9 - x^2}}$ is :",
    options: [
      "$[2, 3]$",
      "$[2, 3)$",
      "$[1, 2]$",
      "$[1, 2)$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Domain of Function",
    solution: "For $f(x)$ to be defined:\n1. For $\\sin^{-1}(x - 3)$: $-1 \\le x - 3 \\le 1 \\implies 2 \\le x \\le 4$.\n2. For the denominator $\\sqrt{9 - x^2}$: $9 - x^2 > 0 \\implies x^2 < 9 \\implies -3 < x < 3$.\n\nTaking the intersection:\n$$x \\in [2, 4] \\cap (-3, 3) = [2, 3)$$"
  },
  {
    question_number: 9,
    question_text: "The range of the function $f(x) = {^{7 - x}P_{x - 3}}$ is :",
    options: [
      "$\\{1, 2, 3\\}$",
      "$\\{1, 2, 3, 4, 5\\}$",
      "$\\{1, 2, 3, 4\\}$",
      "$\\{1, 2, 3, 4, 5, 6\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Range of Function",
    solution: "For $^{n}P_r$ to be defined:\n1. $n = 7 - x \\ge 0 \\implies x \\le 7$\n2. $r = x - 3 \\ge 0 \\implies x \\ge 3$\n3. $n \\ge r \\implies 7 - x \\ge x - 3 \\implies 2x \\le 10 \\implies x \\le 5$\n\nSince $x$ must be an integer, $x \\in \\{3, 4, 5\\}$.\n- If $x = 3$: $f(3) = {^4P_0} = 1$\n- If $x = 4$: $f(4) = {^3P_1} = 3$\n- If $x = 5$: $f(5) = {^2P_2} = 2$\n\nHence, the range of $f(x)$ is $\\{1, 2, 3\\}$."
  },
  {
    question_number: 10,
    question_text: "If $f : \\mathbf{R} \\to S$, defined by $f(x) = \\sin x - \\sqrt{3} \\cos x + 1$, is onto, then the interval of $S$ is :",
    options: [
      "$[0, 3]$",
      "$[-1, 1]$",
      "$[0, 1]$",
      "$[-1, 3]$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Range and Onto Functions",
    solution: "The expression $\\sin x - \\sqrt{3}\\cos x$ can be rewritten as:\n$$2\\left(\\frac{1}{2}\\sin x - \\frac{\\sqrt{3}}{2}\\cos x\\right) = 2\\sin\\left(x - \\frac{\\pi}{3}\\right)$$\nSince $-1 \\le \\sin\\left(x - \\frac{\\pi}{3}\\right) \\le 1$, we have:\n$$-2 \\le \\sin x - \\sqrt{3}\\cos x \\le 2$$\nAdding 1:\n$$-1 \\le \\sin x - \\sqrt{3}\\cos x + 1 \\le 3$$\n\nThus, the range of $f(x)$ is $[-1, 3]$. Since $f$ is onto, codomain $S = [-1, 3]$."
  },
  {
    question_number: 11,
    question_text: "The graph of the function $y = f(x)$ is symmetrical about the line $x = 2$, then :",
    options: [
      "$f(x + 2) = f(x - 2)$",
      "$f(2 + x) = f(2 - x)$",
      "$f(x) = f(-x)$",
      "$f(x) = -f(-x)$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Symmetry of Graphs",
    solution: "If the graph of $y = f(x)$ is symmetric about the line $x = a$, then for every $x$, the values at equal horizontal distances from $a$ are identical:\n$$f(a + x) = f(a - x)$$\nFor $a = 2$, this gives $f(2 + x) = f(2 - x)$."
  },
  {
    question_number: 12,
    question_text: "Let $f : (-1, 1) \\to B$, be a function defined by $f(x) = \\tan^{-1}\\left(\\frac{2x}{1 - x^2}\\right)$, then $f$ is both one-one and onto when $B$ is the interval :",
    options: [
      "$\\left(0, \\frac{\\pi}{2}\\right)$",
      "$\\left[0, \\frac{\\pi}{2}\\right)$",
      "$\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$",
      "$\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Invertible Functions and Range",
    solution: "For $x \\in (-1, 1)$, $\\tan^{-1}\\left(\\frac{2x}{1 - x^2}\\right) = 2\\tan^{-1}x$.\nSince $x \\in (-1, 1)$, $-\\frac{\\pi}{4} < \\tan^{-1}x < \\frac{\\pi}{4}$.\nMultiplying by 2:\n$$-\\frac{\\pi}{2} < 2\\tan^{-1}x < \\frac{\\pi}{2}$$\nThus, the range of $f(x)$ is $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$.\nFor $f$ to be onto, the codomain $B$ must equal the range, so $B = \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$."
  },
  {
    question_number: 13,
    question_text: "A real valued function $f(x)$ satisfies the functional equation $f(x - y) = f(x)f(y) - f(a - x)f(a + y)$ where $a$ is a given constant and $f(0) = 1$. Then $f(2a - x)$ is equal to :",
    options: [
      "$-f(x)$",
      "$f(x)$",
      "$f(a) + f(a - x)$",
      "$f(-x)$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Functional Equations",
    solution: "Given $f(x - y) = f(x)f(y) - f(a - x)f(a + y)$ with $f(0) = 1$.\nPutting $x = 0$ and $y = 0$:\n$$f(0) = [f(0)]^2 - [f(a)]^2 \\implies 1 = 1 - [f(a)]^2 \\implies f(a) = 0$$\nNow evaluate $f(2a - x)$ by writing $2a - x = a - (x - a)$ and substituting $x = a, y = x - a$ in the functional equation:\n$$f(a - (x - a)) = f(a)f(x - a) - f(a - a)f(a + x - a)$$\n$$f(2a - x) = 0 \\cdot f(x - a) - f(0)f(x) = -f(x)$$"
  },
  {
    question_number: 14,
    question_text: "The largest interval lying in $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$ for which the function $f(x) = 4^{-x^2} + \\cos^{-1}\\left(\\frac{x}{2} - 1\\right) + \\log(\\cos x)$ is defined, is :",
    options: [
      "$[0, \\pi]$",
      "$\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$",
      "$\\left[-\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right)$",
      "$\\left[0, \\frac{\\pi}{2}\\right)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Domain of Function",
    solution: "For $f(x)$ to be defined:\n1. $4^{-x^2}$ is defined for all $x \\in \\mathbf{R}$.\n2. For $\\cos^{-1}\\left(\\frac{x}{2} - 1\\right)$: $-1 \\le \\frac{x}{2} - 1 \\le 1 \\implies 0 \\le \\frac{x}{2} \\le 2 \\implies 0 \\le x \\le 4$.\n3. For $\\log(\\cos x)$: $\\cos x > 0$. In $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$, $\\cos x > 0$ holds everywhere.\n\nTaking intersection within $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$:\n$$[0, 4] \\cap \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right) = \\left[0, \\frac{\\pi}{2}\\right)$$\n(since $\\frac{\\pi}{2} \\approx 1.57 < 4$)."
  },
  {
    question_number: 15,
    question_text: "Let $f : \\mathbf{N} \\to Y$ be a function defined as $f(x) = 4x + 3$, where $Y = \\{y \\in \\mathbf{N} : y = 4x + 3 \\text{ for some } x \\in \\mathbf{N}\\}$. Then $f$ is invertible and its inverse is :",
    options: [
      "$g(y) = \\frac{3y + 4}{3}$",
      "$g(y) = 4 + \\frac{y + 3}{4}$",
      "$g(y) = \\frac{y + 3}{4}$",
      "$g(y) = \\frac{y - 3}{4}$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Inverse of a Function",
    solution: "Given $y = 4x + 3$.\n$$4x = y - 3 \\implies x = \\frac{y - 3}{4}$$\nSince $f$ is strictly increasing, it is injective. By definition of $Y$, $f$ is surjective onto $Y$.\nHence $f$ is invertible with inverse $g(y) = \\frac{y - 3}{4}$."
  },
  {
    question_number: 16,
    question_text: "For real $x$, let $f(x) = x^3 + 5x + 1$, then :",
    options: [
      "$f$ is one-one but not onto $\\mathbf{R}$",
      "$f$ is onto $\\mathbf{R}$ but not one-one",
      "$f$ is one-one and onto $\\mathbf{R}$",
      "$f$ is neither one-one nor onto $\\mathbf{R}$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "One-One and Onto Functions",
    solution: "Given $f(x) = x^3 + 5x + 1$.\n$$f'(x) = 3x^2 + 5 > 0, \\quad \\forall x \\in \\mathbf{R}$$\nSince $f'(x) > 0$ strictly for all real $x$, $f(x)$ is strictly increasing, hence one-one.\n\nAlso, $\\lim_{x \\to -\\infty} f(x) = -\\infty$ and $\\lim_{x \\to \\infty} f(x) = \\infty$. Being continuous, $f(x)$ takes all real values, so its range is $\\mathbf{R}$. Thus $f$ is onto.\n\nTherefore, $f$ is one-one and onto $\\mathbf{R}$."
  },
  {
    question_number: 17,
    question_text: "Let $f(x) = (x + 1)^2 - 1, x \\ge -1$.\nStatement-1: The set $\\{x : f(x) = f^{-1}(x)\\} = \\{0, -1\\}$.\nStatement-2: $f$ is a bijection.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Invertibility and Fixed Points",
    solution: "Statement-1: For an increasing function, solutions to $f(x) = f^{-1}(x)$ lie on the line $y = x$:\n$$(x + 1)^2 - 1 = x \\implies x^2 + 2x = x \\implies x^2 + x = 0 \\implies x(x + 1) = 0$$\nSince $x \\ge -1$, $x = 0$ or $x = -1$. Thus Statement-1 is true.\n\nStatement-2: No codomain is specified; if the codomain is taken as $\\mathbf{R}$, then range $[-1, \\infty) \\ne \\mathbf{R}$, meaning $f$ is not onto, hence not a bijection. Thus Statement-2 is false.\n\nTherefore, Statement-1 is true, Statement-2 is false."
  },
  {
    question_number: 18,
    question_text: "The domain of the function $f(x) = \\frac{1}{\\sqrt{|x| - x}}$ is :",
    options: [
      "$(0, \\infty)$",
      "$(-\\infty, 0)$",
      "$(-\\infty, \\infty) - \\{0\\}$",
      "$(-\\infty, \\infty)$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Domain of Function",
    solution: "For $f(x) = \\frac{1}{\\sqrt{|x| - x}}$ to be defined, the quantity inside the square root must be strictly positive:\n$$|x| - x > 0 \\implies |x| > x$$\n- For $x \\ge 0$, $|x| = x$, so $|x| > x$ does not hold.\n- For $x < 0$, $|x| = -x > 0 > x$, which always holds.\n\nThus, $x \\in (-\\infty, 0)$."
  },
  {
    question_number: 19,
    question_text: "Let $f(x) = \\sin x, g(x) = x$.\nStatement 1: $f(x) \\le g(x)$ for $x$ in $(0, \\infty)$.\nStatement 2: $f(x) \\le 1$ for $x$ in $(0, \\infty)$ but $g(x) \\to \\infty$ as $x \\to \\infty$.",
    options: [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true."
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Inequalities in Functions",
    solution: "Statement 1: For $x > 0$, $\\sin x < x$ is a well-known inequality (derivative $h'(x) = 1 - \\cos x \\ge 0$), so Statement 1 is true.\n\nStatement 2: For $x \\in (0, \\infty)$, $\\sin x \\le 1$ and $x \\to \\infty$ as $x \\to \\infty$, which is also true.\n\nHowever, Statement 2 only explains why $\\sin x < x$ for $x > 1$; it does not explain why $\\sin x < x$ on $(0, 1]$. Hence Statement 2 is not a correct explanation for Statement 1."
  },
  {
    question_number: 20,
    question_text: "The range of the function $f(x) = \\frac{x}{1 + |x|}, x \\in \\mathbf{R}$, is :",
    options: [
      "$\\mathbf{R}$",
      "$(-1, 1)$",
      "$\\mathbf{R} - \\{0\\}$",
      "$[-1, 1]$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Range of Function",
    solution: "1. For $x \\ge 0$: $f(x) = \\frac{x}{1 + x} = 1 - \\frac{1}{1 + x}$. As $x \\in [0, \\infty)$, $f(x) \\in [0, 1)$.\n2. For $x < 0$: $f(x) = \\frac{x}{1 - x} = -1 + \\frac{1}{1 - x}$. As $x \\in (-\\infty, 0)$, $f(x) \\in (-1, 0)$.\n\nCombining both parts, the range of $f(x)$ is $(-1, 1)$."
  },
  {
    question_number: 21,
    question_text: "Statement 1: If $A$ and $B$ be two sets having $p$ and $q$ elements respectively, where $q > p$. Then the total number of functions from set $A$ to set $B$ is $q^p$.\nStatement 2: The total number of selections of $p$ different objects out of $q$ objects is ${^qC_p}$.",
    options: [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation of Statement 1.",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true, Statement 2 is a correct explanation of Statement 1."
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Number of Functions",
    solution: "Statement 1: For any set $A$ with $n(A) = p$ and $B$ with $n(B) = q$, each element of $A$ has $q$ possible images in $B$. Thus total functions $= q^p$. This is true.\n\nStatement 2: The number of ways to choose $p$ distinct objects from $q$ objects is $^{q}C_p$. This is true.\n\nOfficial answer key: (D)."
  },
  {
    question_number: 22,
    question_text: "If $P(S)$ denotes the set of all subsets of a given set $S$, then the number of one-to-one functions from the set $S = \\{1, 2, 3\\}$ to the set $P(S)$ is :",
    options: [
      "24",
      "8",
      "336",
      "320"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Number of Injective Functions",
    solution: "The set $S = \\{1, 2, 3\\}$ has $n(S) = 3$ elements.\nThe power set $P(S)$ has $n(P(S)) = 2^3 = 8$ elements.\n\nThe number of one-to-one (injective) functions from a set of 3 elements to a set of 8 elements is:\n$${^8P_3} = \\frac{8!}{(8 - 3)!} = 8 \\times 7 \\times 6 = 336$$"
  },
  {
    question_number: 23,
    question_text: "Let $A$ and $B$ be non empty sets in $\\mathbf{R}$ and $f : A \\to B$ is a bijective function.\nStatement 1: $f$ is an onto function.\nStatement 2: There exists a function $g : B \\to A$ such that $f \\circ g = I_B$.",
    options: [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not the correct explanation for Statement 1."
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Bijective Functions",
    solution: "Statement 1 is true because a bijection is by definition both injective (one-one) and surjective (onto).\n\nStatement 2 is also true because an inverse function $g = f^{-1} : B \\to A$ exists satisfying $f \\circ g = I_B$.\n\nHowever, Statement 2 is an equivalent property / consequence of invertibility, not the direct definition/explanation of Statement 1. Thus Statement 2 is not the correct explanation for Statement 1."
  },
  {
    question_number: 24,
    question_text: "Let $A = \\{1, 2, 3, 4\\}$ and $R : A \\to A$ be the relation defined by $R = \\{(1, 1), (2, 3), (3, 4), (4, 2)\\}$. The correct statement is :",
    options: [
      "$R$ does not have an inverse.",
      "$R$ is not a one to one function.",
      "$R$ is an onto function.",
      "$R$ is not a function."
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Classification of Functions",
    solution: "Domain of $R = \\{1, 2, 3, 4\\} = A$, and every element has a unique image, so $R$ is a function.\nRange of $R = \\{1, 3, 4, 2\\} = A$.\nSince $\\text{Domain} = \\text{Codomain} = \\text{Range} = A$, $R$ is both one-one and onto.\nHence $R$ is an onto function."
  },
  {
    question_number: 25,
    question_text: "If $g$ is the inverse of a function $f$ and $f'(x) = \\frac{1}{1 + x^5}$, then $g'(x)$ is equal to :",
    options: [
      "$\\frac{1}{1 + \\{g(x)\\}^5}$",
      "$1 + \\{g(x)\\}^5$",
      "$1 + x^5$",
      "$5x^4$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Derivative of Inverse Function",
    solution: "Since $g$ is the inverse of $f$, we have $f(g(x)) = x$.\nDifferentiating both sides with respect to $x$:\n$$f'(g(x)) \\cdot g'(x) = 1 \\implies g'(x) = \\frac{1}{f'(g(x))}$$\nGiven $f'(x) = \\frac{1}{1 + x^5}$, we get $f'(g(x)) = \\frac{1}{1 + \\{g(x)\\}^5}$.\nTherefore:\n$$g'(x) = \\frac{1}{\\frac{1}{1 + \\{g(x)\\}^5}} = 1 + \\{g(x)\\}^5$$"
  },
  {
    question_number: 26,
    question_text: "Let $f$ be an odd function defined on the set of real numbers such that for $x \\ge 0$, $f(x) = 3\\sin x + 4\\cos x$. Then $f(x)$ at $x = -\\frac{11\\pi}{6}$ is equal to :",
    options: [
      "$\\frac{3}{2} + 2\\sqrt{3}$",
      "$-\\frac{3}{2} + 2\\sqrt{3}$",
      "$\\frac{3}{2} - 2\\sqrt{3}$",
      "$-\\frac{3}{2} - 2\\sqrt{3}$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Odd Functions",
    solution: "Since $f$ is an odd function, $f(-x) = -f(x)$:\n$$f\\left(-\\frac{11\\pi}{6}\\right) = -f\\left(\\frac{11\\pi}{6}\\right)$$\nFor $x = \\frac{11\\pi}{6} = 2\\pi - \\frac{\\pi}{6} > 0$:\n$$\\sin\\left(\\frac{11\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$$\n$$\\cos\\left(\\frac{11\\pi}{6}\\right) = \\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}$$\n$$f\\left(\\frac{11\\pi}{6}\\right) = 3\\left(-\\frac{1}{2}\\right) + 4\\left(\\frac{\\sqrt{3}}{2}\\right) = -\\frac{3}{2} + 2\\sqrt{3}$$\n\nTherefore:\n$$f\\left(-\\frac{11\\pi}{6}\\right) = -\\left(-\\frac{3}{2} + 2\\sqrt{3}\\right) = \\frac{3}{2} - 2\\sqrt{3}$$"
  },
  {
    question_number: 27,
    question_text: "If $f(x) = x^2 - x + 5, x > \\frac{1}{2}$, and $g(x)$ is its inverse function, then $g'(7)$ equals :",
    options: [
      "$-\\frac{1}{3}$",
      "$\\frac{1}{13}$",
      "$\\frac{1}{3}$",
      "$-\\frac{1}{13}$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Derivative of Inverse Function",
    solution: "Let $g(7) = x_0 \\implies f(x_0) = 7$.\n$$x_0^2 - x_0 + 5 = 7 \\implies x_0^2 - x_0 - 2 = 0 \\implies (x_0 - 2)(x_0 + 1) = 0$$\nSince $x > \\frac{1}{2}$, we select $x_0 = 2$.\n\nNow $f'(x) = 2x - 1 \\implies f'(2) = 2(2) - 1 = 3$.\nBy inverse derivative rule:\n$$g'(7) = \\frac{1}{f'(g(7))} = \\frac{1}{f'(2)} = \\frac{1}{3}$$"
  },
  {
    question_number: 28,
    question_text: "The function $f(x) = |\\sin 4x| + |\\cos 2x|$, is a periodic function with a fundamental period :",
    options: [
      "$\\pi$",
      "$2\\pi$",
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{2}$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Periodic Functions",
    solution: "Period of $|\\sin 4x|$ is $T_1 = \\frac{\\pi}{4}$.\nPeriod of $|\\cos 2x|$ is $T_2 = \\frac{\\pi}{2}$.\n\n$$\\text{L.C.M.}\\left(\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right) = \\frac{\\text{L.C.M.}(\\pi, \\pi)}{\\text{H.C.F.}(4, 2)} = \\frac{\\pi}{2}$$\nChecking if $\\frac{\\pi}{4}$ is a period:\n$$f\\left(x + \\frac{\\pi}{4}\\right) = |\\sin(4x + \\pi)| + |\\cos(2x + \\pi/2)| = |\\sin 4x| + |\\sin 2x| \\ne f(x)$$\nHence the fundamental period is $\\frac{\\pi}{2}$."
  },
  {
    question_number: 29,
    question_text: "Let $f : \\mathbf{R} \\to \\mathbf{R}$ be defined by $f(x) = \\frac{|x| - 1}{|x| + 1}$, then $f$ is :",
    options: [
      "one-one but not onto",
      "neither one-one nor onto",
      "both one-one and onto",
      "onto but not one-one"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Classification of Functions",
    solution: "1. Since $f(-x) = \\frac{|-x| - 1}{|-x| + 1} = \\frac{|x| - 1}{|x| + 1} = f(x)$, $f$ is an even function.\nFor example, $f(1) = f(-1) = 0$, so $f$ is not one-one (many-one).\n\n2. We have $f(x) = 1 - \\frac{2}{|x| + 1}$.\nSince $|x| \\ge 0$, $1 \\le |x| + 1 < \\infty \\implies 0 < \\frac{2}{|x| + 1} \\le 2$.\nThus $-1 \\le f(x) < 1$. The range is $[-1, 1)$, which is a proper subset of $\\mathbf{R}$. Hence $f$ is not onto.\n\nTherefore, $f$ is neither one-one nor onto."
  },
  {
    question_number: 30,
    question_text: "If $f(x) + 2f\\left(\\frac{1}{x}\\right) = 3x, x \\ne 0$, and $S = \\{x \\in \\mathbf{R} : f(x) = f(-x)\\}$, then $S$ :",
    options: [
      "Contains exactly two elements",
      "Contains more than two elements",
      "Is an empty set",
      "Contains exactly one element"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Functional Equations",
    solution: "Given:\n$$f(x) + 2f\\left(\\frac{1}{x}\\right) = 3x \\quad \\dots(1)$$\nReplace $x$ by $\\frac{1}{x}$:\n$$f\\left(\\frac{1}{x}\\right) + 2f(x) = \\frac{3}{x} \\quad \\dots(2)$$\nMultiply (2) by 2 and subtract (1):\n$$3f(x) = \\frac{6}{x} - 3x \\implies f(x) = \\frac{2}{x} - x$$\n\nFor $f(x) = f(-x)$:\n$$\\frac{2}{x} - x = -\\frac{2}{x} + x$$\n$$\\frac{4}{x} = 2x \\implies x^2 = 2 \\implies x = \\pm \\sqrt{2}$$\n\nHence, $S = \\{-\\sqrt{2}, \\sqrt{2}\\}$ contains exactly two elements."
  },
  {
    question_number: 31,
    question_text: "For $x \\in \\mathbf{R}, x \\ne 0, x \\ne 1$, let $f_0(x) = \\frac{1}{1 - x}$ and $f_{n+1}(x) = f_0(f_n(x)), n = 0, 1, 2, \\dots$. Then the value of $f_{100}(3) + f_1\\left(\\frac{2}{3}\\right) + f_2\\left(\\frac{3}{2}\\right)$ is equal to :",
    options: [
      "$\\frac{8}{3}$",
      "$\\frac{4}{3}$",
      "$\\frac{5}{3}$",
      "$\\frac{1}{3}$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composition and Periodic Iteration",
    solution: "Given $f_0(x) = \\frac{1}{1 - x}$.\n$$f_1(x) = f_0(f_0(x)) = \\frac{1}{1 - \\frac{1}{1 - x}} = \\frac{x - 1}{x}$$\n$$f_2(x) = f_0(f_1(x)) = \\frac{1}{1 - \\frac{x - 1}{x}} = x$$\n$$f_3(x) = f_0(f_2(x)) = f_0(x) = \\frac{1}{1 - x}$$\n\nSo $f_n(x)$ is periodic with period 3 ($f_n = f_{n \\pmod 3}$).\n- $f_{100}(3) = f_1(3) = \\frac{3 - 1}{3} = \\frac{2}{3}$\n- $f_1\\left(\\frac{2}{3}\\right) = \\frac{2/3 - 1}{2/3} = -\\frac{1}{2}$\n- $f_2\\left(\\frac{3}{2}\\right) = \\frac{3}{2}$\n\n$$\\text{Sum} = \\frac{2}{3} - \\frac{1}{2} + \\frac{3}{2} = \\frac{2}{3} + 1 = \\frac{5}{3}$$"
  },
  {
    question_number: 32,
    question_text: "The function $f : \\mathbf{R} \\to \\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$ defined as $f(x) = \\frac{x}{1 + x^2}$, is :",
    options: [
      "Invertible",
      "Injective but not surjective",
      "Surjective but not injective",
      "Neither injective nor surjective"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Injective and Surjective Functions",
    solution: "Let $y = \\frac{x}{1 + x^2} \\implies y x^2 - x + y = 0$.\nFor real $x$, discriminant $D \\ge 0 \\implies 1 - 4y^2 \\ge 0 \\implies y \\in \\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$.\nSince the range equals the given codomain, $f$ is surjective.\n\nNow, for $x_1 = 2$ and $x_2 = \\frac{1}{2}$:\n$$f(2) = \\frac{2}{5}, \\quad f(1/2) = \\frac{1/2}{1 + 1/4} = \\frac{2}{5}$$\nSince $f(2) = f(1/2)$, $f$ is not injective.\n\nHence, $f$ is surjective but not injective."
  },
  {
    question_number: 33,
    question_text: "Let $a, b, c \\in \\mathbf{R}$. If $f(x) = ax^2 + bx + c$ is such that $a + b + c = 3$ and $f(x + y) = f(x) + f(y) + xy, \\forall x, y \\in \\mathbf{R}$, then $\\sum_{n=1}^{10} f(n)$ is equal to :",
    options: [
      "330",
      "165",
      "190",
      "255"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Functional Equations and Series",
    solution: "Given $f(x + y) = f(x) + f(y) + xy$.\nPut $x = y = 0 \\implies f(0) = 0 \\implies c = 0$.\n\nPut $y = 1$:\n$$f(x + 1) - f(x) = f(1) + x = 3 + x$$\nSumming from $x = 0$ to $n - 1$:\n$$f(n) - f(0) = \\sum_{x=0}^{n-1} (3 + x) = 3n + \\frac{(n - 1)n}{2} = \\frac{n^2 + 5n}{2}$$\n\nNow:\n$$\\sum_{n=1}^{10} f(n) = \\frac{1}{2}\\sum_{n=1}^{10} n^2 + \\frac{5}{2}\\sum_{n=1}^{10} n = \\frac{1}{2} \\left(\\frac{10 \\times 11 \\times 21}{6}\\right) + \\frac{5}{2} \\left(\\frac{10 \\times 11}{2}\\right) = \\frac{385}{2} + \\frac{275}{2} = 330$$"
  },
  {
    question_number: 34,
    question_text: "Let $f(x) = 2^{10}x + 1$ and $g(x) = 3^{10}x - 1$. If $(f \\circ g)(x) = x$, then $x$ is equal to :",
    options: [
      "$\\frac{2^{10} - 1}{2^{10} - 3^{-10}}$",
      "$\\frac{1 - 2^{-10}}{3^{10} - 2^{-10}}$",
      "$\\frac{3^{10} - 1}{3^{10} - 2^{-10}}$",
      "$\\frac{1 - 3^{-10}}{2^{10} - 3^{-10}}$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composite Functions",
    solution: "$$(f \\circ g)(x) = f(g(x)) = 2^{10}(3^{10}x - 1) + 1 = x$$\n$$2^{10} \\cdot 3^{10} x - 2^{10} + 1 = x$$\n$$x(6^{10} - 1) = 2^{10} - 1$$\n$$x = \\frac{2^{10} - 1}{6^{10} - 1} = \\frac{\\frac{2^{10} - 1}{2^{10}}}{\\frac{2^{10} \\cdot 3^{10} - 1}{2^{10}}} = \\frac{1 - 2^{-10}}{3^{10} - 2^{-10}}$$"
  },
  {
    question_number: 35,
    question_text: "The function $f : \\mathbf{N} \\to \\mathbf{I}$ defined by $f(x) = x - 5\\left[\\frac{x}{5}\\right]$, where $\\mathbf{N}$ is the set of natural numbers and $[x]$ denotes the greatest integer less than or equal to $x$, is :",
    options: [
      "one-one but not onto",
      "one-one and onto",
      "neither one-one nor onto",
      "onto but not one-one"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Greatest Integer Function",
    solution: "We can express $f(x) = 5\\left\\{\\frac{x}{5}\\right\\}$.\nFor $x \\in \\mathbf{N}$, $\\left\\{\\frac{x}{5}\\right\\} \\in \\left\\{0, \\frac{1}{5}, \\frac{2}{5}, \\frac{3}{5}, \\frac{4}{5}\\right\\}$.\nHence, $f(x) \\in \\{0, 1, 2, 3, 4\\}$.\n\n1. $f(5) = f(10) = 0$, so $f$ is not one-one.\n2. The range of $f$ is $\\{0, 1, 2, 3, 4\\} \\ne \\mathbf{I}$ (integers), so $f$ is not onto.\n\nHence, $f$ is neither one-one nor onto."
  },
  {
    question_number: 36,
    question_text: "Let $f : A \\to B$ be a function defined as $f(x) = \\frac{x - 1}{x - 2}$, where $A = \\mathbf{R} - \\{2\\}$ and $B = \\mathbf{R} - \\{1\\}$. Then $f$ is :",
    options: [
      "invertible and $f^{-1}(y) = \\frac{2y + 1}{y - 1}$",
      "invertible and $f^{-1}(y) = \\frac{3y - 1}{y - 1}$",
      "not invertible",
      "invertible and $f^{-1}(y) = \\frac{2y - 1}{y - 1}$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Inverse of a Function",
    solution: "Let $y = f(x) = \\frac{x - 1}{x - 2}$.\n$$yx - 2y = x - 1$$\n$$(y - 1)x = 2y - 1$$\n$$x = \\frac{2y - 1}{y - 1}$$\n\nFor every $y \\in \\mathbf{R} - \\{1\\}$, $x \\ne 2$ since $2y - 1 = 2(y - 1) \\implies -1 = -2$ (impossible).\nThus $f$ is a bijection and is invertible with inverse $f^{-1}(y) = \\frac{2y - 1}{y - 1}$."
  },
  {
    question_number: 37,
    question_text: "For $x \\in \\mathbf{R} - \\{0, 1\\}$, let $f_1(x) = \\frac{1}{x}, f_2(x) = 1 - x$ and $f_3(x) = \\frac{1}{1 - x}$ be three given functions. If a function, $J(x)$ satisfies $(f_2 \\circ J \\circ f_1)(x) = f_3(x)$ then $J(x)$ is equal to :",
    options: [
      "$f_3(x)$",
      "$\\frac{1}{x}f_3(x)$",
      "$f_1(x)$",
      "$f_2(x)$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composition of Functions",
    solution: "Given $f_2(J(f_1(x))) = f_3(x)$:\n$$f_2(J(1/x)) = \\frac{1}{1 - x}$$\n$$1 - J(1/x) = \\frac{1}{1 - x}$$\n$$J(1/x) = 1 - \\frac{1}{1 - x} = \\frac{-x}{1 - x} = \\frac{x}{x - 1}$$\nLet $t = 1/x \\implies x = 1/t$:\n$$J(t) = \\frac{1/t}{1/t - 1} = \\frac{1}{1 - t} = f_3(t)$$\nTherefore, $J(x) = f_3(x)$."
  },
  {
    question_number: 38,
    question_text: "Let $A = \\{x \\in \\mathbf{R} : x \\text{ is not a positive integer}\\}$. Define a function $f : A \\to \\mathbf{R}$ as $f(x) = \\frac{2x}{x - 1}$, then $f$ is :",
    options: [
      "Injective but not surjective",
      "Not injective",
      "Surjective but not injective",
      "Neither injective nor surjective"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Injective and Surjective Functions",
    solution: "Given $f(x) = \\frac{2x}{x - 1}$ on $A$.\n$$f'(x) = \\frac{(x - 1)(2) - 2x(1)}{(x - 1)^2} = \\frac{-2}{(x - 1)^2} < 0$$\nSince $f'(x) < 0$, $f$ is strictly decreasing on the domain, so $f$ is injective (one-one).\n\nSince $x$ is not a positive integer, the range does not cover all real numbers (for example, $y = 2$ cannot be attained, and with domain constraints range is a proper subset of $\\mathbf{R}$).\nHence $f$ is not surjective (into).\nThus, $f$ is injective but not surjective."
  },
  {
    question_number: 39,
    question_text: "Let $f : [0, 1] \\to \\mathbf{R}$ be such that $f(xy) = f(x) \\cdot f(y)$, for all $x, y \\in [0, 1]$, and $f(0) \\ne 0$. If $y = y(x)$ satisfies the differential equation, $\\frac{dy}{dx} = f(x)$ with $y(0) = 1$ then $y\\left(\\frac{1}{4}\\right) + y\\left(\\frac{3}{4}\\right)$ is equal to :",
    options: [
      "5",
      "2",
      "3",
      "4"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Functional Equations",
    solution: "Given $f(xy) = f(x) f(y)$. Putting $x = y = 0$:\n$$f(0) = [f(0)]^2 \\implies f(0)(f(0) - 1) = 0$$\nSince $f(0) \\ne 0$, $f(0) = 1$.\n\nPutting $y = 0$:\n$$f(0) = f(x) f(0) \\implies 1 = f(x) \\cdot 1 \\implies f(x) = 1, \\quad \\forall x \\in [0, 1]$$\nThen $\\frac{dy}{dx} = 1 \\implies y = x + C$.\nGiven $y(0) = 1 \\implies C = 1$, so $y = x + 1$.\n$$y\\left(\\frac{1}{4}\\right) + y\\left(\\frac{3}{4}\\right) = \\left(\\frac{1}{4} + 1\\right) + \\left(\\frac{3}{4} + 1\\right) = 3$$"
  },
  {
    question_number: 40,
    question_text: "Let $\\mathbf{N}$ be the set of natural numbers and two functions $f$ and $g$ be defined as $f, g : \\mathbf{N} \\to \\mathbf{N}$ such that $f(n) = \\begin{cases} \\frac{n + 1}{2}, & \\text{if } n \\text{ is odd} \\\\ \\frac{n}{2}, & \\text{if } n \\text{ is even} \\end{cases}$ and $g(n) = n - (-1)^n$. Then $f \\circ g$ is :",
    options: [
      "onto but not one-one",
      "Both one-one and onto",
      "One-one but not onto",
      "Neither one-one nor onto"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composite Functions",
    solution: "We have $g(n) = \\begin{cases} n + 1, & \\text{if } n \\text{ is odd} \\\\ n - 1, & \\text{if } n \\text{ is even} \\end{cases}$.\n- For $n = 1$: $g(1) = 2$ (even) $\\implies f(g(1)) = f(2) = 1$.\n- For $n = 2$: $g(2) = 1$ (odd) $\\implies f(g(2)) = f(1) = 1$.\nSince $(f \\circ g)(1) = (f \\circ g)(2) = 1$, $f \\circ g$ is many-one (not one-one).\n\nFor any $k \\in \\mathbf{N}$:\n$$(f \\circ g)(2k) = f(g(2k)) = f(2k - 1) = \\frac{(2k - 1) + 1}{2} = k$$\nSince every natural number $k$ has a preimage $2k$, $f \\circ g$ is onto.\nThus, $f \\circ g$ is onto but not one-one."
  },
  {
    question_number: 41,
    question_text: "Let $f : \\mathbf{R} \\to \\mathbf{R}$ be defined by $f(x) = \\frac{x}{1 + x^2}, x \\in \\mathbf{R}$. Then the range of $f$ is :",
    options: [
      "$\\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$",
      "$\\mathbf{R} - [-1, 1]$",
      "$\\mathbf{R} - \\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$",
      "$(-1, 1) - \\{0\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Range of Function",
    solution: "Let $y = \\frac{x}{1 + x^2} \\implies y x^2 - x + y = 0$.\nFor $x \\in \\mathbf{R}$:\n$$D \\ge 0 \\implies 1 - 4y^2 \\ge 0 \\implies 4y^2 \\le 1 \\implies |y| \\le \\frac{1}{2} \\implies -\\frac{1}{2} \\le y \\le \\frac{1}{2}$$\nIf $y = 0$, $x = 0$ is a valid real solution.\nThus, the range of $f$ is $\\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$."
  },
  {
    question_number: 42,
    question_text: "The number of functions $f$ from $\\{1, 2, 3, \\dots, 20\\}$ onto $\\{1, 2, 3, \\dots, 20\\}$ such that $f(k)$ is a multiple of $3$, whenever $k$ is a multiple of $4$ is :",
    options: [
      "$6^5 \\times (15)!$",
      "$5! \\times 6!$",
      "$(15)! \\times 6!$",
      "$5^6 \\times 15$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Permutations of Functions",
    solution: "Since the domain and codomain are finite sets of the same size (20 elements), any onto function is a bijection (permutation).\n- Multiples of 4 in domain are $\\{4, 8, 12, 16, 20\\}$ (5 elements).\n- Multiples of 3 in codomain are $\\{3, 6, 9, 12, 15, 18\\}$ (6 elements).\n\nThe 5 multiples of 4 must be mapped to distinct multiples of 3. The number of ways to choose and assign images is:\n$${^6C_5} \\times 5! = 6 \\times 120 = 720 = 6!$$\nThe remaining 15 elements in the domain can be mapped to the remaining 15 elements of the codomain in $15!$ ways.\n\nTotal number of such functions $= 6! \\times 15! = (15)! \\times 6!$."
  },
  {
    question_number: 43,
    question_text: "Let a function $f : (0, \\infty) \\to (0, \\infty)$ be defined by $f(x) = \\left|1 - \\frac{1}{x}\\right|$. Then $f$ is :",
    options: [
      "not injective but it is surjective",
      "injective only",
      "neither injective nor surjective",
      "None of the above"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Well-Defined Functions",
    solution: "For $x = 1 \\in (0, \\infty)$, we have $f(1) = \\left|1 - 1\\right| = 0$.\nHowever, the codomain is given as $(0, \\infty)$, which does not contain 0.\nSince an element in the domain does not map into the specified codomain, $f$ is not a well-defined function.\nHence, \"None of the above\" is the correct choice."
  },
  {
    question_number: 44,
    question_text: "If $f(x) = \\log_e\\left(\\frac{1 - x}{1 + x}\\right), |x| < 1$, then $f\\left(\\frac{2x}{1 + x^2}\\right)$ is equal to :",
    options: [
      "$(f(x))^2$",
      "$2f(x^2)$",
      "$-2f(x)$",
      "$2f(x)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Logarithmic Functions",
    solution: "$$f\\left(\\frac{2x}{1 + x^2}\\right) = \\ln \\left( \\frac{1 - \\frac{2x}{1 + x^2}}{1 + \\frac{2x}{1 + x^2}} \\right) = \\ln \\left( \\frac{1 + x^2 - 2x}{1 + x^2 + 2x} \\right)$$\n$$= \\ln \\left( \\frac{(1 - x)^2}{(1 + x)^2} \\right) = \\ln \\left( \\left( \\frac{1 - x}{1 + x} \\right)^2 \\right)$$\nSince $|x| < 1$, $\\frac{1 - x}{1 + x} > 0$:\n$$= 2\\ln \\left( \\frac{1 - x}{1 + x} \\right) = 2f(x)$$"
  },
  {
    question_number: 45,
    question_text: "Let $f(x) = a^x (a > 0)$ be written as $f(x) = f_1(x) + f_2(x)$, where $f_1(x)$ is an even function and $f_2(x)$ is an odd function. Then $f_1(x + y) + f_1(x - y)$ equals :",
    options: [
      "$2f_1(x)f_1(y)$",
      "$2f_1(x + y)f_1(x - y)$",
      "$2f_1(x)f_2(y)$",
      "$2f_1(x + y)f_2(x - y)$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Even and Odd Functions",
    solution: "Any function $f(x)$ can be uniquely decomposed into even and odd parts:\n$$f_1(x) = \\frac{f(x) + f(-x)}{2} = \\frac{a^x + a^{-x}}{2}$$\n$$f_2(x) = \\frac{f(x) - f(-x)}{2} = \\frac{a^x - a^{-x}}{2}$$\n\nNow:\n$$f_1(x + y) + f_1(x - y) = \\frac{a^{x+y} + a^{-(x+y)}}{2} + \\frac{a^{x-y} + a^{-(x-y)}}{2}$$\n$$= \\frac{(a^x + a^{-x})(a^y + a^{-y})}{2} = 2\\left(\\frac{a^x + a^{-x}}{2}\\right)\\left(\\frac{a^y + a^{-y}}{2}\\right) = 2f_1(x)f_1(y)$$"
  },
  {
    question_number: 46,
    question_text: "If the function $f : \\mathbf{R} - \\{1, -1\\} \\to A$ defined by $f(x) = \\frac{x^2}{1 - x^2}$, is surjective, then $A$ is equal to :",
    options: [
      "$[0, \\infty)$",
      "$\\mathbf{R} - \\{-1\\}$",
      "$\\mathbf{R} - [-1, 0)$",
      "$\\mathbf{R} - (-1, 0)$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Range and Surjective Functions",
    solution: "Let $y = \\frac{x^2}{1 - x^2}$.\n$$y - yx^2 = x^2 \\implies x^2(y + 1) = y \\implies x^2 = \\frac{y}{y + 1}$$\nFor $x \\in \\mathbf{R} - \\{1, -1\\}$, $x^2 \\ge 0$:\n$$\\frac{y}{y + 1} \\ge 0 \\implies y \\in (-\\infty, -1) \\cup [0, \\infty)$$\nAlso, $x^2 \\ne 1 \\implies \\frac{y}{y + 1} \\ne 1$, which is always true.\nThus the range is $(-\\infty, -1) \\cup [0, \\infty) = \\mathbf{R} - [-1, 0)$.\nSince $f$ is surjective, $A = \\mathbf{R} - [-1, 0)$."
  },
  {
    question_number: 47,
    question_text: "The domain of the definition of the function $f(x) = \\frac{1}{4 - x^2} + \\log_{10}(x^3 - x)$ is :",
    options: [
      "$(-1, 0) \\cup (1, 2) \\cup (2, \\infty)$",
      "$(1, 2) \\cup (2, \\infty)$",
      "$(-2, -1) \\cup (-1, 0) \\cup (2, \\infty)$",
      "$(-1, 0) \\cup (1, 2) \\cup (3, \\infty)$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Domain of Function",
    solution: "1. For the logarithmic term: $x^3 - x > 0 \\implies x(x - 1)(x + 1) > 0 \\implies x \\in (-1, 0) \\cup (1, \\infty)$.\n2. For the fraction: $4 - x^2 \\ne 0 \\implies x \\ne \\pm 2$.\n\nIntersecting both conditions:\n$$x \\in (-1, 0) \\cup (1, 2) \\cup (2, \\infty)$$"
  },
  {
    question_number: 48,
    question_text: "Let $f(x) = x^2, x \\in \\mathbf{R}$. For any $A \\subseteq \\mathbf{R}$, define $g(A) = \\{x \\in \\mathbf{R} : f(x) \\in A\\}$. If $S = [0, 4]$, then which one of the following statements is not true ?",
    options: [
      "$g(f(S)) \\ne S$",
      "$f(g(S)) \\ne f(S)$",
      "$f(g(S)) = S$",
      "$g(f(S)) = g(S)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Set Theory and Preimages",
    solution: "Given $S = [0, 4]$ and $f(x) = x^2$:\n- $f(S) = [0, 16]$\n- $g(S) = \\{x \\in \\mathbf{R} : x^2 \\in [0, 4]\\} = [-2, 2]$\n- $g(f(S)) = g([0, 16]) = \\{x \\in \\mathbf{R} : x^2 \\in [0, 16]\\} = [-4, 4]$\n- $f(g(S)) = f([-2, 2]) = [0, 4] = S$\n\nComparing with the statements:\n- $g(f(S)) = [-4, 4] \\ne [0, 4] = S$ (True)\n- $f(g(S)) = [0, 4] \\ne [0, 16] = f(S)$ (True)\n- $f(g(S)) = S$ (True)\n- $g(f(S)) = [-4, 4] \\ne [-2, 2] = g(S)$ (Hence $g(f(S)) = g(S)$ is FALSE).\n\nThus, (D) is not true."
  },
  {
    question_number: 49,
    question_text: "Let $f(x) = \\log_e(\\sin x), (0 < x < \\pi)$ and $g(x) = \\sin^{-1}(e^{-x}), (x \\ge 0)$. If $\\alpha$ is a positive real number such that $a = (f \\circ g)'(\\alpha)$ and $b = (f \\circ g)(\\alpha)$, then :",
    options: [
      "$a\\alpha^2 + b\\alpha + a = 0$",
      "$a\\alpha^2 + b\\alpha - a = -2\\alpha$",
      "$a\\alpha^2 - b\\alpha - a = 0$",
      "$a\\alpha^2 - b\\alpha - a = 1$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composite Functions",
    solution: "$$(f \\circ g)(x) = f(g(x)) = \\log_e(\\sin(\\sin^{-1}(e^{-x}))) = \\log_e(e^{-x}) = -x$$\nSo $(f \\circ g)(x) = -x$.\n- $b = (f \\circ g)(\\alpha) = -\\alpha$\n- $(f \\circ g)'(x) = -1 \\implies a = -1$\n\nEvaluating $a\\alpha^2 - b\\alpha - a$:\n$$(-1)\\alpha^2 - (-\\alpha)\\alpha - (-1) = -\\alpha^2 + \\alpha^2 + 1 = 1$$\nHence, $a\\alpha^2 - b\\alpha - a = 1$."
  },
  {
    question_number: 50,
    question_text: "For $x \\in \\mathbf{R}$, Let $[x]$ denotes the greatest integer $\\le x$, then the sum of the series $\\left[-\\frac{1}{3}\\right] + \\left[-\\frac{1}{3} - \\frac{1}{100}\\right] + \\left[-\\frac{1}{3} - \\frac{2}{100}\\right] + \\dots + \\left[-\\frac{1}{3} - \\frac{99}{100}\\right]$ is :",
    options: [
      "-131",
      "-153",
      "-135",
      "-133"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Greatest Integer Function",
    solution: "The general term is $T_r = \\left[-\\left(\\frac{1}{3} + \\frac{r}{100}\\right)\\right]$ for $r = 0, 1, 2, \\dots, 99$.\n- When $0 < \\frac{1}{3} + \\frac{r}{100} < 1 \\iff r < \\frac{200}{3} \\approx 66.67$, so for $r = 0, 1, \\dots, 66$ (67 terms), $T_r = -1$.\n- When $1 \\le \\frac{1}{3} + \\frac{r}{100} < 2 \\iff 67 \\le r \\le 99$ (33 terms), $T_r = -2$.\n\nSum of the series:\n$$S = 67(-1) + 33(-2) = -67 - 66 = -133$$"
  },
  {
    question_number: 51,
    question_text: "For $x \\in \\left(0, \\frac{3}{2}\\right)$, let $f(x) = \\sqrt{x}, g(x) = \\tan x$ and $h(x) = \\frac{1 - x^2}{1 + x^2}$. If $\\phi(x) = ((h \\circ f) \\circ g)(x)$, then $\\phi\\left(\\frac{\\pi}{3}\\right)$ is equal to :",
    options: [
      "$\\tan \\frac{\\pi}{12}$",
      "$\\tan \\frac{5\\pi}{12}$",
      "$\\tan \\frac{7\\pi}{12}$",
      "$\\tan \\frac{11\\pi}{12}$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composition of Functions",
    solution: "$$(f \\circ g)(x) = f(g(x)) = \\sqrt{\\tan x}$$\n$$\\phi(x) = h(f(g(x))) = \\frac{1 - (\\sqrt{\\tan x})^2}{1 + (\\sqrt{\\tan x})^2} = \\frac{1 - \\tan x}{1 + \\tan x} = \\tan\\left(\\frac{\\pi}{4} - x\\right)$$\nAt $x = \\frac{\\pi}{3}$:\n$$\\phi\\left(\\frac{\\pi}{3}\\right) = \\tan\\left(\\frac{\\pi}{4} - \\frac{\\pi}{3}\\right) = \\tan\\left(-\\frac{\\pi}{12}\\right) = -\\tan\\frac{\\pi}{12} = \\tan\\left(\\pi - \\frac{\\pi}{12}\\right) = \\tan\\frac{11\\pi}{12}$$"
  },
  {
    question_number: 52,
    question_text: "If $g(x) = x^2 + x - 1$ and $(g \\circ f)(x) = 4x^2 - 10x + 5$, then $f\\left(\\frac{5}{4}\\right)$ is equal to :",
    options: [
      "$\\frac{3}{2}$",
      "$-\\frac{1}{2}$",
      "$\\frac{1}{2}$",
      "$-\\frac{3}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Composite Functions",
    solution: "Given $g(f(x)) = (f(x))^2 + f(x) - 1 = 4x^2 - 10x + 5$.\nSubstitute $x = \\frac{5}{4}$:\n$$4\\left(\\frac{5}{4}\\right)^2 - 10\\left(\\frac{5}{4}\\right) + 5 = 4\\left(\\frac{25}{16}\\right) - \\frac{25}{2} + 5 = \\frac{25}{4} - \\frac{25}{2} + 5 = -\\frac{5}{4}$$\nSo:\n$$\\left(f\\left(\\frac{5}{4}\\right)\\right)^2 + f\\left(\\frac{5}{4}\\right) - 1 = -\\frac{5}{4}$$\n$$\\left(f\\left(\\frac{5}{4}\\right)\\right)^2 + f\\left(\\frac{5}{4}\\right) + \\frac{1}{4} = 0$$\n$$\\left(f\\left(\\frac{5}{4}\\right) + \\frac{1}{2}\\right)^2 = 0 \\implies f\\left(\\frac{5}{4}\\right) = -\\frac{1}{2}$$"
  },
  {
    question_number: 53,
    question_text: "The inverse function of $f(x) = \\frac{8^{2x} - 8^{-2x}}{8^{2x} + 8^{-2x}}, x \\in (-1, 1)$, is :",
    options: [
      "$\\frac{1}{4}\\log_e \\left(\\frac{1 + x}{1 - x}\\right)$",
      "$\\frac{1}{4}\\log_e \\left(\\frac{1 - x}{1 + x}\\right)$",
      "$\\frac{1}{4}(\\log_e)\\log_e \\left(\\frac{1 - x}{1 + x}\\right)$",
      "$\\frac{1}{4}\\log_8 \\left(\\frac{1 + x}{1 - x}\\right)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Inverse of a Function",
    solution: "Let $y = \\frac{8^{2x} - 8^{-2x}}{8^{2x} + 8^{-2x}}$.\nApplying componendo and dividendo:\n$$\\frac{1 + y}{1 - y} = \\frac{2 \\cdot 8^{2x}}{2 \\cdot 8^{-2x}} = 8^{4x}$$\nTaking $\\log_8$ on both sides:\n$$4x = \\log_8 \\left(\\frac{1 + y}{1 - y}\\right) \\implies x = \\frac{1}{4}\\log_8 \\left(\\frac{1 + y}{1 - y}\\right)$$\nTherefore:\n$$f^{-1}(x) = \\frac{1}{4}\\log_8 \\left(\\frac{1 + x}{1 - x}\\right)$$"
  },
  {
    question_number: 54,
    question_text: "Let $f : (1, 3) \\to \\mathbf{R}$, be a function defined by $f(x) = \\frac{x[x]}{1 + x^2}$, where $[x]$, denotes the greatest integer $\\le x$. Then the range of $f$, is :",
    options: [
      "$\\left(\\frac{2}{5}, \\frac{3}{5}\\right] \\cup \\left(\\frac{3}{4}, \\frac{4}{5}\\right]$",
      "$\\left(\\frac{2}{5}, \\frac{1}{2}\\right) \\cup \\left(\\frac{3}{5}, \\frac{4}{5}\\right]$",
      "$\\left(\\frac{2}{5}, \\frac{4}{5}\\right]$",
      "$\\left(\\frac{3}{5}, \\frac{4}{5}\\right)$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Functions",
    topic: "Greatest Integer Function and Range",
    solution: "We split the domain $(1, 3)$ into two intervals:\n1. For $x \\in (1, 2)$: $[x] = 1 \\implies f(x) = \\frac{x}{1 + x^2}$.\n$$f'(x) = \\frac{1 - x^2}{(1 + x^2)^2} < 0 \\quad \\text{on } (1, 2)$$\nSo $f$ is strictly decreasing. As $x \\to 1^+$, $f(x) \\to \\frac{1}{2}$. As $x \\to 2^-$, $f(x) \\to \\frac{2}{5}$.\nRange on $(1, 2)$ is $\\left(\\frac{2}{5}, \\frac{1}{2}\\right)$.\n\n2. For $x \\in [2, 3)$: $[x] = 2 \\implies f(x) = \\frac{2x}{1 + x^2}$.\n$$f'(x) = \\frac{2(1 - x^2)}{(1 + x^2)^2} < 0 \\quad \\text{on } [2, 3)$$\nSo $f$ is strictly decreasing. At $x = 2$, $f(2) = \\frac{4}{5}$. As $x \\to 3^-$, $f(x) \\to \\frac{6}{10} = \\frac{3}{5}$.\nRange on $[2, 3)$ is $\\left(\\frac{3}{5}, \\frac{4}{5}\\right]$.\n\nTotal range is $\\left(\\frac{2}{5}, \\frac{1}{2}\\right) \\cup \\left(\\frac{3}{5}, \\frac{4}{5}\\right]$."
  }
];

