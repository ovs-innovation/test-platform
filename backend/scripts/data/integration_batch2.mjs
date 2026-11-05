// Batch 2: Questions 26 to 50
export const batch2 = [
  {
    question_number: 26,
    question_text: "The integral $\\int \\frac{dx}{(1 + \\sqrt{x})\\sqrt{x - x^2}}$ is equal to :",
    options: [
      { option_text: "$-2\\sqrt{\\frac{1 + \\sqrt{x}}{1 - \\sqrt{x}}} + c$" },
      { option_text: "$-\\sqrt{\\frac{1 - \\sqrt{x}}{1 + \\sqrt{x}}} + c$" },
      { option_text: "$-2\\sqrt{\\frac{1 - \\sqrt{x}}{1 + \\sqrt{x}}} + c$" },
      { option_text: "$\\sqrt{\\frac{1 + \\sqrt{x}}{1 - \\sqrt{x}}} + c$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Rewrite the integral as:
$$I = \\int \\frac{dx}{(1 + \\sqrt{x})\\sqrt{x}\\sqrt{1 - x}}$$
Let $1 + \\sqrt{x} = t \\implies \\frac{1}{2\\sqrt{x}} dx = dt \\implies \\frac{dx}{\\sqrt{x}} = 2dt$.
Also, $\\sqrt{x} = t - 1 \\implies x = (t - 1)^2$, so:
$$1 - x = 1 - (t - 1)^2 = 2t - t^2$$
$$I = \\int \\frac{2dt}{t\\sqrt{2t - t^2}}$$
Put $t = \\frac{1}{z} \\implies dt = -\\frac{1}{z^2} dz$:
$$I = 2\\int \\frac{-\\frac{1}{z^2} dz}{\\frac{1}{z}\\sqrt{\\frac{2}{z} - \\frac{1}{z^2}}} = -2\\int \\frac{dz}{\\sqrt{2z - 1}} = -2 \\cdot \\frac{2\\sqrt{2z - 1}}{2} + c = -2\\sqrt{2z - 1} + c$$
Since $z = \\frac{1}{t} = \\frac{1}{1 + \\sqrt{x}}$:
$$2z - 1 = \\frac{2}{1 + \\sqrt{x}} - 1 = \\frac{1 - \\sqrt{x}}{1 + \\sqrt{x}}$$
$$I = -2\\sqrt{\\frac{1 - \\sqrt{x}}{1 + \\sqrt{x}}} + c$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "Let $I_n = \\int \\tan^n x \\, dx$ ($n > 1$). If $I_4 + I_6 = a\\tan^5 x + bx^5 + c$, then the ordered pair $(a, b)$ is equal to :",
    options: [
      { option_text: "$\\left(-\\frac{1}{5}, 1\\right)$" },
      { option_text: "$\\left(\\frac{1}{5}, 0\\right)$" },
      { option_text: "$\\left(-\\frac{1}{5}, 0\\right)$" },
      { option_text: "$\\left(\\frac{1}{5}, -1\\right)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `$$I_4 + I_6 = \\int (\\tan^4 x + \\tan^6 x) dx = \\int \\tan^4 x (1 + \\tan^2 x) dx = \\int \\tan^4 x \\sec^2 x \\, dx$$
Let $\\tan x = t \\implies \\sec^2 x \\, dx = dt$:
$$I_4 + I_6 = \\int t^4 dt = \\frac{t^5}{5} + c = \\frac{1}{5}\\tan^5 x + c$$
Comparing with $a\\tan^5 x + bx^5 + c$:
$$a = \\frac{1}{5}, \\quad b = 0$$
$$(a, b) = \\left(\\frac{1}{5}, 0\\right)$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "The integral $\\int \\sqrt{1 + 2\\cot x(\\csc x + \\cot x)} \\, dx$, $\\left(0 < x < \\frac{\\pi}{2}\\right)$ is equal to :",
    options: [
      { option_text: "$2\\log\\left|\\sin\\frac{x}{2}\\right| + c$" },
      { option_text: "$4\\log\\left|\\sin\\frac{x}{2}\\right| + c$" },
      { option_text: "$4\\log\\left|\\cos\\frac{x}{2}\\right| + c$" },
      { option_text: "$2\\log\\left|\\cos\\frac{x}{2}\\right| + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Using the trigonometric identity $1 + \\cot^2 x = \\csc^2 x \\implies 1 = \\csc^2 x - \\cot^2 x$:
$$1 + 2\\cot x(\\csc x + \\cot x) = \\csc^2 x - \\cot^2 x + 2\\csc x \\cot x + 2\\cot^2 x$$
$$= \\csc^2 x + 2\\csc x \\cot x + \\cot^2 x = (\\csc x + \\cot x)^2$$
Since $0 < x < \\frac{\\pi}{2}$, $\\csc x + \\cot x > 0$:
$$I = \\int (\\csc x + \\cot x) dx = \\log\\left|\\tan\\frac{x}{2}\\right| + \\log|\\sin x| + c$$
$$= \\log\\left|\\frac{\\sin(x/2)}{\\cos(x/2)} \\cdot 2\\sin\\frac{x}{2}\\cos\\frac{x}{2}\\right| + c = \\log\\left|2\\sin^2\\frac{x}{2}\\right| + c = 2\\log\\left|\\sin\\frac{x}{2}\\right| + c'$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "If $f\\left(\\frac{3x - 4}{3x + 4}\\right) = x + 2$, $x \\neq -\\frac{4}{3}$ and $\\int f(x) \\, dx = A\\log|1 - x| + Bx + C$, then the ordered pair $(A, B)$ is equal to :",
    options: [
      { option_text: "$\\left(\\frac{8}{3}, \\frac{2}{3}\\right)$" },
      { option_text: "$\\left(-\\frac{8}{3}, \\frac{2}{3}\\right)$" },
      { option_text: "$\\left(-\\frac{8}{3}, -\\frac{2}{3}\\right)$" },
      { option_text: "$\\left(\\frac{8}{3}, -\\frac{2}{3}\\right)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Let $\\frac{3x - 4}{3x + 4} = t \\implies 3x - 4 = 3tx + 4t \\implies 3x(1 - t) = 4(1 + t) \\implies x = \\frac{4(1 + t)}{3(1 - t)}$.
$$f(t) = \\frac{4(1 + t)}{3(1 - t)} + 2 = \\frac{4 + 4t + 6 - 6t}{3(1 - t)} = \\frac{10 - 2t}{3(1 - t)}$$
Replacing $t$ by $x$:
$$f(x) = \\frac{10 - 2x}{3(1 - x)} = \\frac{8 + 2(1 - x)}{3(1 - x)} = \\frac{8}{3(1 - x)} + \\frac{2}{3}$$
Integrating:
$$\\int f(x) dx = -\\frac{8}{3}\\log|1 - x| + \\frac{2}{3}x + C$$
Comparing with $A\\log|1 - x| + Bx + C$:
$$A = -\\frac{8}{3}, \\quad B = \\frac{2}{3}$$
$$(A, B) = \\left(-\\frac{8}{3}, \\frac{2}{3}\\right)$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "The integral $\\int \\frac{\\sin^2 x \\cos^2 x}{(\\sin^5 x + \\cos^3 x \\sin^2 x + \\sin^3 x \\cos^2 x + \\cos^5 x)^2} dx$ is equal to (where $C$ is the constant of integration) :",
    options: [
      { option_text: "$-\\frac{1}{1 + \\cot^3 x} + C$" },
      { option_text: "$\\frac{1}{3(1 + \\tan^3 x)} + C$" },
      { option_text: "$-\\frac{1}{3(1 + \\tan^3 x)} + C$" },
      { option_text: "$\\frac{1}{1 + \\cot^3 x} + C$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Factor the denominator:
$$\\sin^5 x + \\cos^3 x \\sin^2 x + \\sin^3 x \\cos^2 x + \\cos^5 x = \\sin^3 x(\\sin^2 x + \\cos^2 x) + \\cos^3 x(\\sin^2 x + \\cos^2 x) = \\sin^3 x + \\cos^3 x$$
Therefore, the denominator squared is $(\\sin^3 x + \\cos^3 x)^2$.
$$I = \\int \\frac{\\sin^2 x \\cos^2 x}{(\\sin^3 x + \\cos^3 x)^2} dx$$
Divide numerator and denominator by $\\cos^6 x$:
$$I = \\int \\frac{\\tan^2 x \\sec^2 x}{(1 + \\tan^3 x)^2} dx$$
Put $1 + \\tan^3 x = t \\implies 3\\tan^2 x \\sec^2 x \\, dx = dt$:
$$I = \\frac{1}{3}\\int t^{-2} dt = -\\frac{1}{3t} + C = -\\frac{1}{3(1 + \\tan^3 x)} + C$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "If $f\\left(\\frac{x - 4}{x + 2}\\right) = 2x + 1$, ($x \\in \\mathbb{R} - \\{1, -2\\}$), then $\\int f(x) \\, dx$ is equal to :",
    options: [
      { option_text: "$12\\ln|1 - x| - 3x + C$" },
      { option_text: "$-12\\ln|1 - x| - 3x + C$" },
      { option_text: "$12\\ln|1 - x| + 3x + C$" },
      { option_text: "$-12\\ln|1 - x| + 3x + C$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Let $\\frac{x - 4}{x + 2} = X \\implies x - 4 = xX + 2X \\implies x(1 - X) = 2X + 4 \\implies x = \\frac{2(X + 2)}{1 - X}$.
$$f(X) = 2\\left(\\frac{2X + 4}{1 - X}\\right) + 1 = \\frac{4X + 8 + 1 - X}{1 - X} = \\frac{3X + 9}{1 - X} = \\frac{3(X + 3)}{1 - X}$$
Replacing $X$ by $x$:
$$f(x) = \\frac{3(x + 3)}{1 - x} = 3\\left(\\frac{4 - (1 - x)}{1 - x}\\right) = \\frac{12}{1 - x} - 3$$
Integrating:
$$\\int f(x) dx = -12\\ln|1 - x| - 3x + C$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "If $f\\left(\\frac{x - 4}{x + 2}\\right) = 2x + 1$, ($x \\in \\mathbb{R} - \\{1, -2\\}$), then $\\int f(x) \\, dx$ is equal to (where $C$ is a constant of integration) :",
    options: [
      { option_text: "$12\\log_e|1 - x| - 3x + c$" },
      { option_text: "$-12\\log_e|1 - x| - 3x + c$" },
      { option_text: "$-12\\log_e|1 - x| + 3x + c$" },
      { option_text: "$12\\log_e|1 - x| + 3x + c$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Suppose $\\frac{x - 4}{x + 2} = y \\implies x - 4 = y(x + 2) \\implies x(1 - y) = 2y + 4 \\implies x = \\frac{2y + 4}{1 - y}$.
So, $f(y) = 2\\left(\\frac{2y + 4}{1 - y}\\right) + 1 = \\frac{3y + 9}{1 - y} = \\frac{3(y + 3)}{1 - y}$.
Now, $f(x) = \\frac{3(x - 1 + 4)}{1 - x} = -3 + \\frac{12}{1 - x}$.
$$\\int f(x) dx = -12\\log_e|1 - x| - 3x + c$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "$\\int \\frac{2x + 5}{\\sqrt{7 - 6x - x^2}} \\, dx = A\\sqrt{7 - 6x - x^2} + B\\sin^{-1}\\left(\\frac{x + 3}{4}\\right) + C$ (where $C$ is a constant of integration), then the ordered pair $(A, B)$ is equal to :",
    options: [
      { option_text: "$(-2, -1)$" },
      { option_text: "$(2, -1)$" },
      { option_text: "$(-2, 1)$" },
      { option_text: "$(2, 1)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Note that $7 - 6x - x^2 = 16 - (x + 3)^2$ and $\\frac{d}{dx}(7 - 6x - x^2) = -2x - 6$.
Express the numerator as:
$$2x + 5 = -(-2x - 6) - 1$$
$$I = -\\int \\frac{-2x - 6}{\\sqrt{7 - 6x - x^2}} dx - \\int \\frac{dx}{\\sqrt{16 - (x + 3)^2}}$$
$$= -2\\sqrt{7 - 6x - x^2} - \\sin^{-1}\\left(\\frac{x + 3}{4}\\right) + C$$
Comparing with $A\\sqrt{7 - 6x - x^2} + B\\sin^{-1}\\left(\\frac{x + 3}{4}\\right) + C$:
$$A = -2, \\quad B = -1$$
$$(A, B) = (-2, -1)$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "If $\\int \\frac{\\tan x}{1 + \\tan x + \\tan^2 x} \\, dx = x - \\frac{K}{\\sqrt{A}}\\tan^{-1}\\left(\\frac{K\\tan x + 1}{\\sqrt{A}}\\right) + C$, ($C$ is a constant of integration), then the ordered pair $(K, A)$ is equal to :",
    options: [
      { option_text: "$(2, 1)$" },
      { option_text: "$(2, 3)$" },
      { option_text: "$(-2, 1)$" },
      { option_text: "$(-2, 3)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `$$I = \\int \\frac{\\tan x}{1 + \\tan x + \\tan^2 x} dx = \\int \\left(1 - \\frac{1 + \\tan^2 x}{1 + \\tan x + \\tan^2 x}\\right) dx$$
$$= \\int 1 \\, dx - \\int \\frac{\\sec^2 x}{1 + \\tan x + \\tan^2 x} dx = x - \\int \\frac{dt}{t^2 + t + 1} \\quad (\\text{where } t = \\tan x)$$
$$= x - \\int \\frac{dt}{\\left(t + \\frac{1}{2}\\right)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2} = x - \\frac{1}{\\frac{\\sqrt{3}}{2}} \\tan^{-1}\\left(\\frac{t + 1/2}{\\sqrt{3}/2}\\right) + C$$
$$= x - \\frac{2}{\\sqrt{3}}\\tan^{-1}\\left(\\frac{2\\tan x + 1}{\\sqrt{3}}\\right) + C$$
Comparing with $x - \\frac{K}{\\sqrt{A}}\\tan^{-1}\\left(\\frac{K\\tan x + 1}{\\sqrt{A}}\\right) + C$:
$$K = 2, \\quad A = 3 \\implies (K, A) = (2, 3)$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "For $x^2 \\neq n\\pi + 1, n \\in \\mathbb{N}$, the integral $\\int x \\sqrt{\\frac{2\\sin(x^2 - 1) - \\sin 2(x^2 - 1)}{2\\sin(x^2 - 1) + \\sin 2(x^2 - 1)}} dx$ is equal to (where $c$ is a constant of integration) :",
    options: [
      { option_text: "$\\log_e\\left|\\sec\\left(\\frac{x^2 - 1}{4}\\right)\\right| + c$" },
      { option_text: "$\\log_e\\left|\\frac{1}{2}\\sec^2(x^2 - 1)\\right| + c$" },
      { option_text: "$\\frac{1}{2}\\log_e|\\sec(x^2 - 1)| + c$" },
      { option_text: "$\\log_e\\left|\\sec\\left(\\frac{x^2 - 1}{2}\\right)\\right| + c$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Put $x^2 - 1 = \\theta \\implies 2x \\, dx = d\\theta \\implies x \\, dx = \\frac{1}{2} d\\theta$:
$$I = \\frac{1}{2}\\int \\sqrt{\\frac{2\\sin\\theta - 2\\sin\\theta\\cos\\theta}{2\\sin\\theta + 2\\sin\\theta\\cos\\theta}} d\\theta = \\frac{1}{2}\\int \\sqrt{\\frac{1 - \\cos\\theta}{1 + \\cos\\theta}} d\\theta$$
$$= \\frac{1}{2}\\int \\sqrt{\\frac{2\\sin^2(\\theta/2)}{2\\cos^2(\\theta/2)}} d\\theta = \\frac{1}{2}\\int \\tan\\left(\\frac{\\theta}{2}\\right) d\\theta$$
$$= \\frac{1}{2} \\cdot 2\\log_e\\left|\\sec\\left(\\frac{\\theta}{2}\\right)\\right| + c = \\log_e\\left|\\sec\\left(\\frac{x^2 - 1}{2}\\right)\\right| + c$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "If $f(x) = \\int \\frac{5x^8 + 7x^6}{(x^2 + 1 + 2x^7)^2} dx$, ($x \\ge 0$), and $f(0) = 0$, then the value of $f(1)$ is :",
    options: [
      { option_text: "$-\\frac{1}{4}$" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "$\\frac{1}{4}$" },
      { option_text: "$-\\frac{1}{2}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Factor out $x^{14}$ from the denominator:
$$f(x) = \\int \\frac{5x^8 + 7x^6}{x^{14}\\left(x^{-5} + x^{-7} + 2\\right)^2} dx = \\int \\frac{5x^{-6} + 7x^{-8}}{(x^{-5} + x^{-7} + 2)^2} dx$$
Let $t = x^{-5} + x^{-7} + 2 \\implies dt = (-5x^{-6} - 7x^{-8}) dx$:
$$f(x) = -\\int t^{-2} dt = \\frac{1}{t} + C = \\frac{1}{x^{-5} + x^{-7} + 2} + C = \\frac{x^7}{x^2 + 1 + 2x^7} + C$$
Given $f(0) = 0 \\implies C = 0$.
$$f(x) = \\frac{x^7}{x^2 + 1 + 2x^7}$$
$$f(1) = \\frac{1}{1 + 1 + 2} = \\frac{1}{4}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "Let $n \\ge 2$ be a natural number and $0 < \\theta < \\frac{\\pi}{2}$. Then $\\int \\frac{(\\sin^n \\theta - \\sin\\theta)^{1/n}\\cos\\theta}{\\sin^{n+1}\\theta} d\\theta$ is equal to :",
    options: [
      { option_text: "$\\frac{n}{n^2 - 1}\\left(1 - \\frac{1}{\\sin^{n+1}\\theta}\\right)^{\\frac{n+1}{n}} + c$" },
      { option_text: "$\\frac{n}{n^2 + 1}\\left(1 - \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + c$" },
      { option_text: "$\\frac{n}{n^2 - 1}\\left(1 - \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + c$" },
      { option_text: "$\\frac{n}{n^2 - 1}\\left(1 + \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + c$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Put $\\sin\\theta = t \\implies \\cos\\theta \\, d\\theta = dt$:
$$I = \\int \\frac{(t^n - t)^{1/n}}{t^{n+1}} dt = \\int \\frac{t(1 - t^{1-n})^{1/n}}{t^{n+1}} dt = \\int (1 - t^{1-n})^{1/n} t^{-n} dt$$
Let $1 - t^{1-n} = z$:
$$dz = -(1 - n)t^{-n} dt = (n - 1)t^{-n} dt \\implies t^{-n} dt = \\frac{dz}{n - 1}$$
$$I = \\frac{1}{n - 1}\\int z^{1/n} dz = \\frac{1}{n - 1} \\cdot \\frac{z^{\\frac{n+1}{n}}}{\\frac{n+1}{n}} + c = \\frac{n}{n^2 - 1} z^{\\frac{n+1}{n}} + c$$
$$= \\frac{n}{n^2 - 1}\\left(1 - \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + c$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "If $\\int x^5 e^{-4x^3} dx = \\frac{1}{48} e^{-4x^3} f(x) + C$, where $C$ is a constant of integration, then $f(x)$ is equal to :",
    options: [
      { option_text: "$-4x^3 - 1$" },
      { option_text: "$-2x^3 + 1$" },
      { option_text: "$-2x^3 - 1$" },
      { option_text: "$4x^3 + 1$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Let $-4x^3 = t \\implies -12x^2 dx = dt \\implies x^2 dx = -\\frac{dt}{12}$.
Also $x^3 = -\\frac{t}{4}$.
$$I = \\int x^3 e^{-4x^3} (x^2 dx) = \\int \\left(-\\frac{t}{4}\\right) e^t \\left(-\\frac{dt}{12}\\right) = \\frac{1}{48}\\int t e^t dt$$
Integrating by parts:
$$\\frac{1}{48}\\int t e^t dt = \\frac{1}{48}(t - 1)e^t + C = \\frac{1}{48}(-4x^3 - 1)e^{-4x^3} + C$$
Comparing with $\\frac{1}{48} e^{-4x^3} f(x) + C$:
$$f(x) = -4x^3 - 1$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "If $\\int \\frac{\\sqrt{1 - x^2}}{x^4} dx = A(x)(\\sqrt{1 - x^2})^m + C$, for a suitable chosen integer $m$ and a function $A(x)$, where $C$ is a constant of integration, then $(A(x))^m$ equals :",
    options: [
      { option_text: "$\\frac{-1}{27x^9}$" },
      { option_text: "$\\frac{-1}{3x^3}$" },
      { option_text: "$\\frac{1}{27x^6}$" },
      { option_text: "$\\frac{1}{9x^4}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rewrite the integral:
$$I = \\int \\frac{\\sqrt{\\frac{1}{x^2} - 1}}{x^3} dx$$
Let $\\frac{1}{x^2} - 1 = u^2 \\implies -\\frac{2}{x^3} dx = 2u \\, du \\implies \\frac{dx}{x^3} = -u \\, du$:
$$I = \\int u(-u \\, du) = -\\int u^2 du = -\\frac{u^3}{3} + C = -\\frac{1}{3}\\left(\\frac{1}{x^2} - 1\\right)^{3/2} + C$$
$$= -\\frac{1}{3x^3}\\left(1 - x^2\\right)^{3/2} + C = -\\frac{1}{3x^3}\\left(\\sqrt{1 - x^2}\\right)^3 + C$$
Comparing with $A(x)(\\sqrt{1 - x^2})^m + C$:
$$A(x) = -\\frac{1}{3x^3}, \\quad m = 3$$
$$(A(x))^m = \\left(-\\frac{1}{3x^3}\\right)^3 = -\\frac{1}{27x^9}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "If $\\int \\frac{x + 1}{\\sqrt{2x - 1}} dx = f(x)\\sqrt{2x - 1} + C$, where $C$ is a constant of integration, then $f(x)$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{3}(x + 1)$" },
      { option_text: "$\\frac{2}{3}(x + 2)$" },
      { option_text: "$\\frac{2}{3}(x - 4)$" },
      { option_text: "$\\frac{1}{3}(x + 4)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Let $2x - 1 = t^2 \\implies 2 \\, dx = 2t \\, dt \\implies dx = t \\, dt$.
Then $x = \\frac{t^2 + 1}{2} \\implies x + 1 = \\frac{t^2 + 3}{2}$.
$$I = \\int \\frac{\\frac{t^2 + 3}{2}}{t} (t \\, dt) = \\frac{1}{2}\\int (t^2 + 3) dt = \\frac{t^3}{6} + \\frac{3t}{2} + C$$
$$= t\\left(\\frac{t^2 + 9}{6}\\right) + C = \\sqrt{2x - 1}\\left(\\frac{2x - 1 + 9}{6}\\right) + C$$
$$= \\sqrt{2x - 1}\\left(\\frac{2x + 8}{6}\\right) + C = \\frac{1}{3}(x + 4)\\sqrt{2x - 1} + C$$
Comparing with $f(x)\\sqrt{2x - 1} + C$:
$$f(x) = \\frac{1}{3}(x + 4)$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "The integral $\\int \\cos(\\ln x) \\, dx$ is equal to :",
    options: [
      { option_text: "$\\frac{x}{2}(\\cos(\\ln x) - \\sin(\\ln x)) + C$" },
      { option_text: "$x(\\cos(\\ln x) - \\sin(\\ln x)) + C$" },
      { option_text: "$x(\\cos(\\ln x) + \\sin(\\ln x)) + C$" },
      { option_text: "$\\frac{x}{2}(\\cos(\\ln x) + \\sin(\\ln x)) + C$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Let $\\ln x = t \\implies x = e^t \\implies dx = e^t dt$:
$$I = \\int e^t \\cos t \\, dt$$
Using standard formula $\\int e^{at}\\cos(bt) dt = \\frac{e^{at}}{a^2 + b^2}(a\\cos bt + b\\sin bt) + C$:
$$I = \\frac{e^t}{1^2 + 1^2}(\\cos t + \\sin t) + C = \\frac{x}{2}(\\cos(\\ln x) + \\sin(\\ln x)) + C$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "The integral $\\int \\frac{3x^{13} + 2x^{11}}{(2x^4 + 3x^2 + 1)^4} dx$ is equal to :",
    options: [
      { option_text: "$\\frac{x^4}{6(2x^4 + 3x^2 + 1)^3} + C$" },
      { option_text: "$\\frac{x^4}{(2x^4 + 3x^2 + 1)^3} + C$" },
      { option_text: "$\\frac{x^{12}}{(2x^4 + 3x^2 + 1)^3} + C$" },
      { option_text: "$\\frac{x^{12}}{6(2x^4 + 3x^2 + 1)^3} + C$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Divide both numerator and denominator by $x^{16}$:
$$I = \\int \\frac{3x^{-3} + 2x^{-5}}{(2 + 3x^{-2} + x^{-4})^4} dx$$
Let $2 + 3x^{-2} + x^{-4} = t \\implies (-6x^{-3} - 4x^{-5}) dx = dt \\implies (3x^{-3} + 2x^{-5}) dx = -\\frac{1}{2} dt$:
$$I = -\\frac{1}{2}\\int t^{-4} dt = -\\frac{1}{2}\\left(\\frac{t^{-3}}{-3}\\right) + C = \\frac{1}{6t^3} + C$$
$$= \\frac{1}{6(2 + 3x^{-2} + x^{-4})^3} + C = \\frac{x^{12}}{6(2x^4 + 3x^2 + 1)^3} + C$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "$\\int \\frac{\\sin\\frac{5x}{2}}{\\sin\\frac{x}{2}} \\, dx$ is equal to :",
    options: [
      { option_text: "$x + 2\\sin x + \\sin 2x + c$" },
      { option_text: "$2x + \\sin x + \\sin 2x + c$" },
      { option_text: "$x + 2\\sin x + 2\\sin 2x + c$" },
      { option_text: "$2x + \\sin x + 2\\sin 2x + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Using the expansion of $\\sin\\left(2x + \\frac{x}{2}\\right)$:
$$\\frac{\\sin\\frac{5x}{2}}{\\sin\\frac{x}{2}} = \\frac{\\sin 2x \\cos\\frac{x}{2} + \\cos 2x \\sin\\frac{x}{2}}{\\sin\\frac{x}{2}} = \\frac{2\\sin x \\cos x \\cos\\frac{x}{2}}{\\sin\\frac{x}{2}} + \\cos 2x$$
$$= \\frac{4\\sin\\frac{x}{2}\\cos^2\\frac{x}{2}\\cos x}{\\sin\\frac{x}{2}} + \\cos 2x = 4\\cos^2\\frac{x}{2}\\cos x + \\cos 2x$$
$$= 2(1 + \\cos x)\\cos x + \\cos 2x = 2\\cos x + 2\\cos^2 x + \\cos 2x$$
$$= 2\\cos x + 1 + \\cos 2x + \\cos 2x = 1 + 2\\cos x + 2\\cos 2x$$
Integrating:
$$I = \\int (1 + 2\\cos x + 2\\cos 2x) dx = x + 2\\sin x + \\sin 2x + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "If $\\int \\frac{dx}{x^3(1 + x^6)^{2/3}} = x f(x)(1 + x^6)^{1/3} + C$, where $C$ is a constant of integration, then the function $f(x)$ is equal to :",
    options: [
      { option_text: "$\\frac{3}{x^2}$" },
      { option_text: "$-\\frac{1}{2x^3}$" },
      { option_text: "$-\\frac{1}{6x^3}$" },
      { option_text: "$-\\frac{1}{2x^2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Factor out $x^6$ from $(1 + x^6)^{2/3}$:
$$(1 + x^6)^{2/3} = x^4(x^{-6} + 1)^{2/3}$$
$$I = \\int \\frac{dx}{x^7(x^{-6} + 1)^{2/3}}$$
Put $t = x^{-6} + 1 \\implies dt = -6x^{-7} dx \\implies x^{-7} dx = -\\frac{1}{6} dt$:
$$I = -\\frac{1}{6}\\int t^{-2/3} dt = -\\frac{1}{6} \\cdot \\frac{t^{1/3}}{1/3} + C = -\\frac{1}{2} t^{1/3} + C$$
$$= -\\frac{1}{2}\\left(\\frac{1 + x^6}{x^6}\\right)^{1/3} + C = -\\frac{1}{2x^2}(1 + x^6)^{1/3} + C$$
$$= x \\cdot \\left(-\\frac{1}{2x^3}\\right)(1 + x^6)^{1/3} + C$$
Comparing with $x f(x)(1 + x^6)^{1/3} + C$:
$$f(x) = -\\frac{1}{2x^3}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "$\\int \\sec^2 x \\cdot \\cot^{4/3} x \\, dx$ is equal to :",
    options: [
      { option_text: "$3\\tan^{-1/3} x + C$" },
      { option_text: "$-\\frac{3}{4}\\tan^{-4/3} x + C$" },
      { option_text: "$-3\\tan^{-1/3} x + C$" },
      { option_text: "$-3\\cot^{-1/3} x + C$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Rewrite the integral in terms of $\\tan x$:
$$I = \\int \\frac{\\sec^2 x}{(\\tan x)^{4/3}} dx$$
Let $\\tan x = t \\implies \\sec^2 x \\, dx = dt$:
$$I = \\int t^{-4/3} dt = \\frac{t^{-1/3}}{-1/3} + C = -3 t^{-1/3} + C = -3\\tan^{-1/3} x + C$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "If $\\int e^{\\sec x}(\\sec x \\tan x f(x) + (\\sec x \\tan x + \\sec^2 x)) dx = e^{\\sec x} f(x) + C$, then a possible choice of $f(x)$ is :",
    options: [
      { option_text: "$\\sec x - \\tan x - \\frac{1}{2}$" },
      { option_text: "$\\sec x + \\tan x + \\frac{1}{2}$" },
      { option_text: "$x\\sec x + \\tan x + \\frac{1}{2}$" },
      { option_text: "$\\sec x + x\\tan x - \\frac{1}{2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Differentiating both sides with respect to $x$:
$$e^{\\sec x}(\\sec x \\tan x f(x) + \\sec x \\tan x + \\sec^2 x) = e^{\\sec x}(\\sec x \\tan x) f(x) + e^{\\sec x} f'(x)$$
Cancelling $e^{\\sec x}(\\sec x \\tan x f(x))$ from both sides:
$$e^{\\sec x}(\\sec x \\tan x + \\sec^2 x) = e^{\\sec x} f'(x)$$
$$f'(x) = \\sec^2 x + \\sec x \\tan x$$
Integrating:
$$f(x) = \\int (\\sec^2 x + \\sec x \\tan x) dx = \\tan x + \\sec x + c_1$$
For $c_1 = \\frac{1}{2}$, a possible choice is:
$$f(x) = \\sec x + \\tan x + \\frac{1}{2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "If $\\int \\frac{dx}{(x^2 - 2x + 10)^2} = A\\left(\\tan^{-1}\\left(\\frac{x - 1}{3}\\right) + \\frac{f(x)}{x^2 - 2x + 10}\\right) + C$, then (where $C$ is a constant of integration) :",
    options: [
      { option_text: "$A = \\frac{1}{27} \\text{ and } f(x) = 9(x - 1)$" },
      { option_text: "$A = \\frac{1}{81} \\text{ and } f(x) = 3(x - 1)$" },
      { option_text: "$A = \\frac{1}{54} \\text{ and } f(x) = 9(x - 1)^2$" },
      { option_text: "$A = \\frac{1}{54} \\text{ and } f(x) = 3(x - 1)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `$$x^2 - 2x + 10 = (x - 1)^2 + 3^2$$
Let $x - 1 = 3\\tan\\theta \\implies dx = 3\\sec^2\\theta \\, d\\theta$:
$$I = \\int \\frac{3\\sec^2\\theta \\, d\\theta}{(9\\sec^2\\theta)^2} = \\frac{3}{81}\\int \\frac{1}{\\sec^2\\theta} d\\theta = \\frac{1}{27}\\int \\cos^2\\theta \\, d\\theta$$
$$= \\frac{1}{54}\\int (1 + \\cos 2\\theta) d\\theta = \\frac{1}{54}\\left(\\theta + \\frac{\\sin 2\\theta}{2}\\right) + C = \\frac{1}{54}(\\theta + \\sin\\theta \\cos\\theta) + C$$
Since $\\tan\\theta = \\frac{x - 1}{3}$:
$$\\theta = \\tan^{-1}\\left(\\frac{x - 1}{3}\\right)$$
$$\\sin\\theta \\cos\\theta = \\frac{\\tan\\theta}{1 + \\tan^2\\theta} = \\frac{\\frac{x - 1}{3}}{1 + \\frac{(x - 1)^2}{9}} = \\frac{3(x - 1)}{(x - 1)^2 + 9} = \\frac{3(x - 1)}{x^2 - 2x + 10}$$
Thus:
$$I = \\frac{1}{54}\\left[\\tan^{-1}\\left(\\frac{x - 1}{3}\\right) + \\frac{3(x - 1)}{x^2 - 2x + 10}\\right] + C$$
Comparing with $A\\left(\\tan^{-1}\\left(\\frac{x - 1}{3}\\right) + \\frac{f(x)}{x^2 - 2x + 10}\\right) + C$:
$$A = \\frac{1}{54}, \\quad f(x) = 3(x - 1)$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "If $\\int x^5 e^{-x^2} dx = g(x)e^{-x^2} + c$, where $c$ is a constant of integration, then $g(-1)$ is equal to :",
    options: [
      { option_text: "$-\\frac{5}{2}$" },
      { option_text: "$-1$" },
      { option_text: "$1$" },
      { option_text: "$-\\frac{1}{2}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Let $-x^2 = t \\implies -2x \\, dx = dt \\implies x \\, dx = -\\frac{1}{2} dt$.
Also $x^4 = t^2$.
$$I = \\int x^4 e^{-x^2} (x \\, dx) = -\\frac{1}{2}\\int t^2 e^t dt$$
Integrating by parts twice:
$$\\int t^2 e^t dt = t^2 e^t - 2t e^t + 2e^t = (t^2 - 2t + 2)e^t$$
$$I = -\\frac{1}{2}(t^2 - 2t + 2)e^t + c = -\\frac{1}{2}(x^4 + 2x^2 + 2)e^{-x^2} + c$$
Comparing with $g(x)e^{-x^2} + c$:
$$g(x) = -\\frac{1}{2}(x^4 + 2x^2 + 2)$$
At $x = -1$:
$$g(-1) = -\\frac{1}{2}((-1)^4 + 2(-1)^2 + 2) = -\\frac{1}{2}(1 + 2 + 2) = -\\frac{5}{2}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "The integral $\\int \\frac{2x^3 - 1}{x^4 + x} dx$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{2}\\log_e\\frac{(x^3 + 1)^2}{|x^3|} + C$" },
      { option_text: "$\\log_e\\frac{|x^3 + 1|}{x^2} + C$" },
      { option_text: "$\\log_e\\left|\\frac{x^3 + 1}{x}\\right| + C$" },
      { option_text: "$\\frac{1}{2}\\log_e\\frac{|x^3 + 1|}{x^2} + C$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Divide the numerator and denominator by $x^2$:
$$I = \\int \\frac{2x - \\frac{1}{x^2}}{x^2 + \\frac{1}{x}} dx$$
Put $x^2 + \\frac{1}{x} = t \\implies \\left(2x - \\frac{1}{x^2}\\right) dx = dt$:
$$I = \\int \\frac{dt}{t} = \\log_e|t| + C = \\log_e\\left|x^2 + \\frac{1}{x}\\right| + C = \\log_e\\left|\\frac{x^3 + 1}{x}\\right| + C$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "Let $\\alpha \\in \\left(0, \\frac{\\pi}{2}\\right)$ be constant. If the integral $\\int \\frac{\\tan x + \\tan\\alpha}{\\tan x - \\tan\\alpha} dx = A(x)\\cos 2\\alpha + B(x)\\sin 2\\alpha + C$, where $C$ is a constant of integration, then the functions $A(x)$ and $B(x)$ are respectively :",
    options: [
      { option_text: "$x - \\alpha \\text{ and } \\log_e|\\sin(x - \\alpha)|$" },
      { option_text: "$x + \\alpha \\text{ and } \\log_e|\\cos(x - \\alpha)|$" },
      { option_text: "$x + \\alpha \\text{ and } \\log_e|\\sin(x + \\alpha)|$" },
      { option_text: "$x - \\alpha \\text{ and } \\log_e|\\cos(x - \\alpha)|$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Convert tangent to sine and cosine:
$$\\frac{\\tan x + \\tan\\alpha}{\\tan x - \\tan\\alpha} = \\frac{\\frac{\\sin x}{\\cos x} + \\frac{\\sin\\alpha}{\\cos\\alpha}}{\\frac{\\sin x}{\\cos x} - \\frac{\\sin\\alpha}{\\cos\\alpha}} = \\frac{\\sin x \\cos\\alpha + \\cos x \\sin\\alpha}{\\sin x \\cos\\alpha - \\cos x \\sin\\alpha} = \\frac{\\sin(x + \\alpha)}{\\sin(x - \\alpha)}$$
Write $x + \\alpha = (x - \\alpha) + 2\\alpha$:
$$\\frac{\\sin((x - \\alpha) + 2\\alpha)}{\\sin(x - \\alpha)} = \\frac{\\sin(x - \\alpha)\\cos 2\\alpha + \\cos(x - \\alpha)\\sin 2\\alpha}{\\sin(x - \\alpha)} = \\cos 2\\alpha + \\sin 2\\alpha \\cot(x - \\alpha)$$
Integrating with respect to $x$:
$$I = \\int [\\cos 2\\alpha + \\sin 2\\alpha \\cot(x - \\alpha)] dx = x\\cos 2\\alpha + \\sin 2\\alpha \\log_e|\\sin(x - \\alpha)| + C'$$
$$= (x - \\alpha)\\cos 2\\alpha + \\sin 2\\alpha \\log_e|\\sin(x - \\alpha)| + C$$
Comparing with $A(x)\\cos 2\\alpha + B(x)\\sin 2\\alpha + C$:
$$A(x) = x - \\alpha, \\quad B(x) = \\log_e|\\sin(x - \\alpha)|$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  }
];

