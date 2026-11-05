// Batch 3: Questions 51 to 75
export const batch3 = [
  {
    question_number: 51,
    question_text: "If $\\int \\frac{\\cos x \\, dx}{\\sin^3 x(1 + \\sin^6 x)^{2/3}} = f(x)(1 + \\sin^6 x)^{1/\\lambda} + c$, where $c$ is a constant of integration, then $\\lambda f\\left(\\frac{\\pi}{3}\\right)$ is equal to :",
    options: [
      { option_text: "$-\\frac{9}{8}$" },
      { option_text: "$2$" },
      { option_text: "$\\frac{9}{8}$" },
      { option_text: "$-2$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Let $\\sin x = t \\implies \\cos x \\, dx = dt$:
$$I = \\int \\frac{dt}{t^3(1 + t^6)^{2/3}} = \\int \\frac{dt}{t^7(1 + t^{-6})^{2/3}}$$
Let $1 + t^{-6} = r^3 \\implies -6t^{-7} dt = 3r^2 dr \\implies \\frac{dt}{t^7} = -\\frac{1}{2}r^2 dr$:
$$I = \\int \\frac{-\\frac{1}{2}r^2 dr}{(r^3)^{2/3}} = -\\frac{1}{2}\\int dr = -\\frac{1}{2}r + c = -\\frac{1}{2}(1 + t^{-6})^{1/3} + c$$
$$= -\\frac{1}{2t^2}(1 + t^6)^{1/3} + c = -\\frac{1}{2\\sin^2 x}(1 + \\sin^6 x)^{1/3} + c$$
Comparing with $f(x)(1 + \\sin^6 x)^{1/\\lambda} + c$:
$$\\lambda = 3, \\quad f(x) = -\\frac{1}{2\\sin^2 x}$$
At $x = \\frac{\\pi}{3}$:
$$\\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2} \\implies f\\left(\\frac{\\pi}{3}\\right) = -\\frac{1}{2\\left(\\frac{3}{4}\\right)} = -\\frac{2}{3}$$
$$\\lambda f\\left(\\frac{\\pi}{3}\\right) = 3\\left(-\\frac{2}{3}\\right) = -2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "The integral $\\int \\frac{dx}{(x + 4)^{8/7}(x - 3)^{6/7}}$ is equal to : (where $C$ is a constant of integration)",
    options: [
      { option_text: "$\\left(\\frac{x - 3}{x + 4}\\right)^{1/7} + C$" },
      { option_text: "$-\\left(\\frac{x - 3}{x + 4}\\right)^{-1/7} + C$" },
      { option_text: "$-\\frac{1}{13}\\left(\\frac{x - 3}{x + 4}\\right)^{-13/7} + C$" },
      { option_text: "$\\frac{1}{2}\\left(\\frac{x - 3}{x + 4}\\right)^{2/7} + C$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rewrite the denominator:
$$(x + 4)^{8/7}(x - 3)^{6/7} = (x + 4)^2 \\left(\\frac{x - 3}{x + 4}\\right)^{6/7}$$
$$I = \\int \\frac{dx}{(x + 4)^2 \\left(\\frac{x - 3}{x + 4}\\right)^{6/7}}$$
Let $t = \\frac{x - 3}{x + 4} \\implies dt = \\frac{(x + 4) - (x - 3)}{(x + 4)^2} dx = \\frac{7}{(x + 4)^2} dx$:
$$\\frac{dx}{(x + 4)^2} = \\frac{1}{7} dt$$
$$I = \\frac{1}{7}\\int t^{-6/7} dt = \\frac{1}{7} \\cdot \\frac{t^{1/7}}{1/7} + C = t^{1/7} + C = \\left(\\frac{x - 3}{x + 4}\\right)^{1/7} + C$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 53,
    question_text: "If $f'(x) = \\tan^{-1}(\\sec x + \\tan x)$, $-\\frac{\\pi}{2} < x < \\frac{\\pi}{2}$ and $f(0) = 0$, then $f(1)$ is equal to :",
    options: [
      { option_text: "$\\frac{\\pi + 1}{4}$" },
      { option_text: "$\\frac{1}{4}$" },
      { option_text: "$\\frac{\\pi - 1}{4}$" },
      { option_text: "$\\frac{\\pi + 2}{4}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$\\sec x + \\tan x = \\frac{1 + \\sin x}{\\cos x} = \\frac{1 - \\cos\\left(\\frac{\\pi}{2} + x\\right)}{\\sin\\left(\\frac{\\pi}{2} + x\\right)} = \\frac{2\\sin^2\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)}{2\\sin\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)\\cos\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)} = \\tan\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)$$
Since $-\\frac{\\pi}{2} < x < \\frac{\\pi}{2} \\implies 0 < \\frac{\\pi}{4} + \\frac{x}{2} < \\frac{\\pi}{2}$:
$$f'(x) = \\tan^{-1}\\left(\\tan\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)\\right) = \\frac{\\pi}{4} + \\frac{x}{2}$$
Integrating:
$$f(x) = \\int \\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right) dx = \\frac{\\pi}{4}x + \\frac{x^2}{4} + c$$
Given $f(0) = 0 \\implies c = 0$.
$$f(1) = \\frac{\\pi}{4}(1) + \\frac{1^2}{4} = \\frac{\\pi + 1}{4}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "If $\\int \\frac{d\\theta}{\\cos^2\\theta(\\tan 2\\theta + \\sec 2\\theta)} = \\lambda\\tan\\theta + 2\\log_e|f(\\theta)| + C$ where $C$ is a constant of integration, then the ordered pair $(\\lambda, f(\\theta))$ is equal to :",
    options: [
      { option_text: "$(1, 1 - \\tan\\theta)$" },
      { option_text: "$(-1, 1 - \\tan\\theta)$" },
      { option_text: "$(-1, 1 + \\tan\\theta)$" },
      { option_text: "$(1, 1 + \\tan\\theta)$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `$$\\tan 2\\theta + \\sec 2\\theta = \\frac{\\sin 2\\theta + 1}{\\cos 2\\theta} = \\frac{(\\cos\\theta + \\sin\\theta)^2}{\\cos^2\\theta - \\sin^2\\theta} = \\frac{\\cos\\theta + \\sin\\theta}{\\cos\\theta - \\sin\\theta} = \\frac{1 + \\tan\\theta}{1 - \\tan\\theta}$$
$$I = \\int \\frac{\\sec^2\\theta \\, d\\theta}{\\frac{1 + \\tan\\theta}{1 - \\tan\\theta}} = \\int \\frac{1 - \\tan\\theta}{1 + \\tan\\theta}\\sec^2\\theta \\, d\\theta$$
Let $\\tan\\theta = t \\implies \\sec^2\\theta \\, d\\theta = dt$:
$$I = \\int \\frac{1 - t}{1 + t} dt = \\int \\left(-1 + \\frac{2}{1 + t}\\right) dt = -t + 2\\log_e|1 + t| + C = -\\tan\\theta + 2\\log_e|1 + \\tan\\theta| + C$$
Comparing with $\\lambda\\tan\\theta + 2\\log_e|f(\\theta)| + C$:
$$\\lambda = -1, \\quad f(\\theta) = 1 + \\tan\\theta \\implies (\\lambda, f(\\theta)) = (-1, 1 + \\tan\\theta)$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "If $\\int \\sin^{-1}\\left(\\sqrt{\\frac{x}{1 + x}}\\right) dx = A(x)\\tan^{-1}(\\sqrt{x}) + B(x) + C$, where $C$ is a constant of integration, then the ordered pair $(A(x), B(x))$ can be :",
    options: [
      { option_text: "$(x - 1, \\sqrt{x})$" },
      { option_text: "$(x - 1, -\\sqrt{x})$" },
      { option_text: "$(x + 1, \\sqrt{x})$" },
      { option_text: "$(x + 1, -\\sqrt{x})$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Let $\\sqrt{x} = \\tan\\theta \\implies \\sin^{-1}\\left(\\sqrt{\\frac{x}{1 + x}}\\right) = \\sin^{-1}\\left(\\frac{\\tan\\theta}{\\sec\\theta}\\right) = \\sin^{-1}(\\sin\\theta) = \\theta = \\tan^{-1}(\\sqrt{x})$.
$$I = \\int \\tan^{-1}(\\sqrt{x}) \\cdot 1 \\, dx$$
Integrating by parts:
$$I = x\\tan^{-1}(\\sqrt{x}) - \\int x \\cdot \\frac{1}{1 + x} \\cdot \\frac{1}{2\\sqrt{x}} dx = x\\tan^{-1}(\\sqrt{x}) - \\frac{1}{2}\\int \\frac{\\sqrt{x}}{1 + x} dx$$
Put $\\sqrt{x} = t \\implies x = t^2, dx = 2t dt$:
$$\\frac{1}{2}\\int \\frac{t}{1 + t^2} (2t \\, dt) = \\int \\frac{t^2}{1 + t^2} dt = \\int \\left(1 - \\frac{1}{1 + t^2}\\right) dt = t - \\tan^{-1} t = \\sqrt{x} - \\tan^{-1}(\\sqrt{x})$$
$$I = x\\tan^{-1}(\\sqrt{x}) - \\sqrt{x} + \\tan^{-1}(\\sqrt{x}) + C = (x + 1)\\tan^{-1}(\\sqrt{x}) - \\sqrt{x} + C$$
Comparing with $A(x)\\tan^{-1}(\\sqrt{x}) + B(x) + C$:
$$(A(x), B(x)) = (x + 1, -\\sqrt{x})$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "Let $f(x) = \\int \\frac{\\sqrt{x}}{(1 + x)^2} dx$ ($x > 0$). Then $f(3) - f(1)$ is equal to :",
    options: [
      { option_text: "$\\frac{\\pi}{12} + \\frac{1}{2} - \\frac{\\sqrt{3}}{4}$" },
      { option_text: "$\\frac{\\pi}{12} + \\frac{1}{4}$" },
      { option_text: "$-\\frac{\\pi}{12} + \\frac{1}{2} + \\frac{\\sqrt{3}}{4}$" },
      { option_text: "$\\frac{\\pi}{12} + \\frac{1}{2} - \\frac{\\sqrt{3}}{4}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Let $x = \\tan^2\\theta \\implies dx = 2\\tan\\theta\\sec^2\\theta \\, d\\theta$:
$$f(x) = \\int \\frac{\\tan\\theta}{(1 + \\tan^2\\theta)^2} \\cdot 2\\tan\\theta\\sec^2\\theta \\, d\\theta = 2\\int \\frac{\\tan^2\\theta}{\\sec^2\\theta} d\\theta = 2\\int \\sin^2\\theta \\, d\\theta$$
$$= \\int (1 - \\cos 2\\theta) d\\theta = \\theta - \\frac{\\sin 2\\theta}{2} + c = \\tan^{-1}\\sqrt{x} - \\frac{\\tan\\theta}{1 + \\tan^2\\theta} + c = \\tan^{-1}\\sqrt{x} - \\frac{\\sqrt{x}}{1 + x} + c$$
Now:
$$f(3) - f(1) = \\left(\\tan^{-1}\\sqrt{3} - \\frac{\\sqrt{3}}{1 + 3}\\right) - \\left(\\tan^{-1}(1) - \\frac{1}{1 + 1}\\right)$$
$$= \\left(\\frac{\\pi}{3} - \\frac{\\sqrt{3}}{4}\\right) - \\left(\\frac{\\pi}{4} - \\frac{1}{2}\\right) = \\frac{\\pi}{12} + \\frac{1}{2} - \\frac{\\sqrt{3}}{4}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "The integral $\\int \\left(\\frac{x}{x\\sin x + \\cos x}\\right)^2 dx$ is equal to, (where $C$ is a constant of integration) :",
    options: [
      { option_text: "$\\tan x - \\frac{x\\sec x}{x\\sin x + \\cos x} + C$" },
      { option_text: "$\\sec x + \\frac{x\\tan x}{x\\sin x + \\cos x} + C$" },
      { option_text: "$\\sec x - \\frac{x\\tan x}{x\\sin x + \\cos x} + C$" },
      { option_text: "$\\tan x + \\frac{x\\sec x}{x\\sin x + \\cos x} + C$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Multiply and divide by $x\\cos x$:
$$I = \\int \\frac{x\\cos x}{(x\\sin x + \\cos x)^2} \\cdot \\frac{x}{\\cos x} dx$$
Notice that $\\frac{d}{dx}(x\\sin x + \\cos x) = x\\cos x + \\sin x - \\sin x = x\\cos x$.
Integrating by parts taking $u = x\\sec x$ and $v' = \\frac{x\\cos x}{(x\\sin x + \\cos x)^2}$:
Since $\\int \\frac{x\\cos x}{(x\\sin x + \\cos x)^2} dx = -\\frac{1}{x\\sin x + \\cos x}$:
$$I = x\\sec x\\left(-\\frac{1}{x\\sin x + \\cos x}\\right) - \\int (\\sec x + x\\sec x\\tan x)\\left(-\\frac{1}{x\\sin x + \\cos x}\\right) dx$$
$$= -\\frac{x\\sec x}{x\\sin x + \\cos x} + \\int \\frac{\\sec x(1 + x\\tan x)}{x\\sin x + \\cos x} dx$$
$$= -\\frac{x\\sec x}{x\\sin x + \\cos x} + \\int \\frac{\\sec^2 x(\\cos x + x\\sin x)}{x\\sin x + \\cos x} dx = -\\frac{x\\sec x}{x\\sin x + \\cos x} + \\int \\sec^2 x \\, dx$$
$$= \\tan x - \\frac{x\\sec x}{x\\sin x + \\cos x} + C$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "If $\\int (e^{2x} + 2e^x - e^{-x} - 1) e^{(e^x + e^{-x})} dx = g(x) e^{(e^x + e^{-x})} + c$, where $c$ is a constant of integration, then $g(0)$ is :",
    options: [
      { option_text: "$e$" },
      { option_text: "$e^2$" },
      { option_text: "$1$" },
      { option_text: "$2$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `$$I = \\int (e^{2x} + e^x - 1) e^{e^x + e^{-x}} dx + \\int (e^x - e^{-x}) e^{e^x + e^{-x}} dx$$
Notice that $\\int (e^x - e^{-x}) e^{e^x + e^{-x}} dx = e^{e^x + e^{-x}} + C$.
For the first integral:
$$\\int (e^{2x} + e^x - 1) e^{e^x + e^{-x}} dx = \\int (e^x + 1 - e^{-x}) e^x e^{e^x + e^{-x}} dx = \\int (e^x + 1 - e^{-x}) e^{e^x + e^{-x} + x} dx$$
Let $u = e^x + e^{-x} + x \\implies du = (e^x - e^{-x} + 1) dx$:
$$= \\int e^u du = e^u = e^{e^x + e^{-x} + x} = e^x e^{e^x + e^{-x}}$$
Therefore:
$$I = e^x e^{e^x + e^{-x}} + e^{e^x + e^{-x}} + c = (e^x + 1)e^{e^x + e^{-x}} + c$$
Comparing with $g(x)e^{(e^x + e^{-x})} + c$:
$$g(x) = e^x + 1$$
$$g(0) = e^0 + 1 = 1 + 1 = 2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "If $\\int \\frac{\\cos\\theta}{5 + 7\\sin\\theta - 2\\cos^2\\theta} d\\theta = A\\log_e|B(\\theta)| + C$, where $C$ is a constant of integration, then $\\frac{B(\\theta)}{A}$ can be :",
    options: [
      { option_text: "$\\frac{2\\sin\\theta + 1}{\\sin\\theta + 3}$" },
      { option_text: "$\\frac{2\\sin\\theta + 1}{5(\\sin\\theta + 3)}$" },
      { option_text: "$\\frac{5(\\sin\\theta + 3)}{2\\sin\\theta + 1}$" },
      { option_text: "$\\frac{5(2\\sin\\theta + 1)}{\\sin\\theta + 3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Rewrite $\\cos^2\\theta = 1 - \\sin^2\\theta$:
$$5 + 7\\sin\\theta - 2(1 - \\sin^2\\theta) = 2\\sin^2\\theta + 7\\sin\\theta + 3 = (2\\sin\\theta + 1)(\\sin\\theta + 3)$$
$$I = \\int \\frac{\\cos\\theta}{(2\\sin\\theta + 1)(\\sin\\theta + 3)} d\\theta$$
Put $\\sin\\theta = t \\implies \\cos\\theta \\, d\\theta = dt$:
$$I = \\int \\frac{dt}{(2t + 1)(t + 3)} = \\frac{1}{5}\\int \\left(\\frac{2}{2t + 1} - \\frac{1}{t + 3}\\right) dt = \\frac{1}{5}\\log_e\\left|\\frac{2t + 1}{t + 3}\\right| + C$$
$$= \\frac{1}{5}\\log_e\\left|\\frac{2\\sin\\theta + 1}{\\sin\\theta + 3}\\right| + C$$
Here $A = \\frac{1}{5}$ and $B(\\theta) = \\frac{2\\sin\\theta + 1}{\\sin\\theta + 3}$:
$$\\frac{B(\\theta)}{A} = \\frac{5(2\\sin\\theta + 1)}{\\sin\\theta + 3}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "If $\\int \\frac{\\cos x - \\sin x}{\\sqrt{8 - \\sin 2x}} dx = a\\sin^{-1}\\left(\\frac{\\sin x + \\cos x}{b}\\right) + c$, where $c$ is a constant of integration, then the ordered pair $(a, b)$ is equal to :",
    options: [
      { option_text: "$(1, -3)$" },
      { option_text: "$(3, 1)$" },
      { option_text: "$(-1, 3)$" },
      { option_text: "$(1, 3)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Note that $(\\sin x + \\cos x)^2 = 1 + \\sin 2x \\implies -\\sin 2x = 1 - (\\sin x + \\cos x)^2$:
$$8 - \\sin 2x = 9 - (\\sin x + \\cos x)^2$$
Let $\\sin x + \\cos x = t \\implies (\\cos x - \\sin x) dx = dt$:
$$I = \\int \\frac{dt}{\\sqrt{9 - t^2}} = \\sin^{-1}\\left(\\frac{t}{3}\\right) + c = \\sin^{-1}\\left(\\frac{\\sin x + \\cos x}{3}\\right) + c$$
Comparing with $a\\sin^{-1}\\left(\\frac{\\sin x + \\cos x}{b}\\right) + c$:
$$a = 1, \\quad b = 3 \\implies (a, b) = (1, 3)$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 61,
    question_text: "The value of the integral $\\int \\frac{\\sin\\theta \\cdot \\sin 2\\theta(\\sin^6\\theta + \\sin^4\\theta + \\sin^2\\theta)\\sqrt{2\\sin^4\\theta + 3\\sin^2\\theta + 6}}{1 - \\cos 2\\theta} d\\theta$ is (where $c$ is a constant of integration) :",
    options: [
      { option_text: "$\\frac{1}{18}[-18\\sin^6\\theta + 9\\sin^4\\theta - 2\\sin^2\\theta]^{3/2} + c$" },
      { option_text: "$\\frac{1}{18}[18 - 2\\sin^6\\theta - 3\\sin^4\\theta - 6\\sin^2\\theta]^{3/2} + c$" },
      { option_text: "$\\frac{1}{18}[11 - 18\\cos^2\\theta + 9\\cos^4\\theta - 2\\cos^6\\theta]^{3/2} + c$" },
      { option_text: "$\\frac{1}{18}[9 - 2\\cos^6\\theta - 3\\cos^4\\theta - 6\\cos^2\\theta]^{3/2} + c$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Using $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ and $1 - \\cos 2\\theta = 2\\sin^2\\theta$:
$$\\frac{\\sin\\theta \\cdot \\sin 2\\theta}{1 - \\cos 2\\theta} = \\frac{2\\sin^2\\theta\\cos\\theta}{2\\sin^2\\theta} = \\cos\\theta$$
$$I = \\int (\\sin^6\\theta + \\sin^4\\theta + \\sin^2\\theta)\\sqrt{2\\sin^4\\theta + 3\\sin^2\\theta + 6}\\cos\\theta \\, d\\theta$$
Put $\\sin\\theta = t \\implies \\cos\\theta \\, d\\theta = dt$:
$$I = \\int (t^6 + t^4 + t^2)\\sqrt{2t^4 + 3t^2 + 6} \\, dt = \\int (t^5 + t^3 + t) \\cdot t\\sqrt{2t^4 + 3t^2 + 6} \\, dt$$
$$= \\int (t^5 + t^3 + t)\\sqrt{2t^6 + 3t^4 + 6t^2} \\, dt$$
Let $2t^6 + 3t^4 + 6t^2 = z \\implies (12t^5 + 12t^3 + 12t) dt = dz \\implies (t^5 + t^3 + t) dt = \\frac{dz}{12}$:
$$I = \\frac{1}{12}\\int \\sqrt{z} \\, dz = \\frac{1}{12} \\cdot \\frac{2}{3} z^{3/2} + c = \\frac{1}{18} z^{3/2} + c = \\frac{1}{18}(2\\sin^6\\theta + 3\\sin^4\\theta + 6\\sin^2\\theta)^{3/2} + c$$
Expressing in terms of $\\cos\\theta$ using $\\sin^2\\theta = 1 - \\cos^2\\theta$:
$$2(1 - \\cos^2\\theta)^3 + 3(1 - \\cos^2\\theta)^2 + 6(1 - \\cos^2\\theta)$$
$$= 2(1 - 3\\cos^2\\theta + 3\\cos^4\\theta - \\cos^6\\theta) + 3(1 - 2\\cos^2\\theta + \\cos^4\\theta) + 6(1 - \\cos^2\\theta)$$
$$= (2 + 3 + 6) - (6 + 6 + 6)\\cos^2\\theta + (6 + 3)\\cos^4\\theta - 2\\cos^6\\theta$$
$$= 11 - 18\\cos^2\\theta + 9\\cos^4\\theta - 2\\cos^6\\theta$$
$$I = \\frac{1}{18}[11 - 18\\cos^2\\theta + 9\\cos^4\\theta - 2\\cos^6\\theta]^{3/2} + c$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "The integral $\\int \\frac{e^{3\\log_e 2x} + 5e^{2\\log_e 2x}}{e^{4\\log_e x} + 5e^{3\\log_e x} - 7e^{2\\log_e x}} dx$, ($x > 0$) is equal to (where $c$ is a constant of integration) :",
    options: [
      { option_text: "$\\log_e|x^2 + 5x - 7| + c$" },
      { option_text: "$4\\log_e|x^2 + 5x - 7| + c$" },
      { option_text: "$\\frac{1}{4}\\log_e|x^2 + 5x - 7| + c$" },
      { option_text: "$\\log_e\\sqrt{x^2 + 5x - 7} + c$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Simplify the exponential and logarithm terms:
$$e^{3\\log_e 2x} = (2x)^3 = 8x^3$$
$$e^{2\\log_e 2x} = (2x)^2 = 4x^2$$
Numerator: $8x^3 + 5(4x^2) = 8x^3 + 20x^2 = 4x^2(2x + 5)$.
Denominator:
$$e^{4\\log_e x} + 5e^{3\\log_e x} - 7e^{2\\log_e x} = x^4 + 5x^3 - 7x^2 = x^2(x^2 + 5x - 7)$$
Therefore:
$$I = \\int \\frac{4x^2(2x + 5)}{x^2(x^2 + 5x - 7)} dx = 4\\int \\frac{2x + 5}{x^2 + 5x - 7} dx = 4\\log_e|x^2 + 5x - 7| + c$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "For real numbers $\\alpha, \\beta, \\gamma$ and $\\delta$, if $\\int \\frac{(x^2 - 1) + \\tan^{-1}\\left(\\frac{x^2 + 1}{x}\\right)}{(x^4 + 3x^2 + 1)\\tan^{-1}\\left(\\frac{x^2 + 1}{x}\\right)} dx = \\alpha \\log_e\\left|\\tan^{-1}\\left(\\frac{x^2 + 1}{x}\\right)\\right| + \\beta \\tan^{-1}\\left(\\frac{\\gamma(x^2 - 1)}{x}\\right) + \\delta \\tan^{-1}\\left(\\frac{x^2 + 1}{x}\\right) + C$, where $C$ is an arbitrary constant, then the value of $10(\\alpha + \beta\\gamma + \\delta)$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "6",
    solution_text: `Split the integral into two parts:
$$I = \\int \\frac{x^2 - 1}{(x^4 + 3x^2 + 1)\\tan^{-1}\\left(x + \\frac{1}{x}\\right)} dx + \\int \\frac{dx}{x^4 + 3x^2 + 1}$$
For the first part $I_1$:
$$I_1 = \\int \\frac{1 - \\frac{1}{x^2}}{\\left(x + \\frac{1}{x}\\right)^2 + 1} \\cdot \\frac{dx}{\\tan^{-1}\\left(x + \\frac{1}{x}\\right)}$$
Let $u = \\tan^{-1}\\left(x + \\frac{1}{x}\\right) \\implies du = \\frac{1}{1 + (x + 1/x)^2} \\left(1 - \\frac{1}{x^2}\\right) dx$:
$$I_1 = \\int \\frac{du}{u} = \\log_e|u| = \\log_e\\left|\\tan^{-1}\\left(\\frac{x^2 + 1}{x}\\right)\\right| \\implies \\alpha = 1$$
For the second part $I_2$:
$$I_2 = \\frac{1}{2}\\int \\frac{(x^2 + 1) - (x^2 - 1)}{x^4 + 3x^2 + 1} dx = \\frac{1}{2}\\int \\frac{1 + 1/x^2}{(x - 1/x)^2 + 5} dx - \\frac{1}{2}\\int \\frac{1 - 1/x^2}{(x + 1/x)^2 + 1} dx$$
$$= \\frac{1}{2\\sqrt{5}}\\tan^{-1}\\left(\\frac{x - 1/x}{\\sqrt{5}}\\right) - \\frac{1}{2}\\tan^{-1}\\left(x + \\frac{1}{x}\\right)$$
$$= \\frac{1}{2\\sqrt{5}}\\tan^{-1}\\left(\\frac{x^2 - 1}{\\sqrt{5}x}\\right) - \\frac{1}{2}\\tan^{-1}\\left(\\frac{x^2 + 1}{x}\\right)$$
Comparing terms:
$$\\beta = \\frac{1}{2\\sqrt{5}}, \\quad \\gamma = \\frac{1}{\\sqrt{5}} \\implies \\beta\\gamma = \\frac{1}{10}$$
$$\\delta = -\\frac{1}{2}$$
Thus:
$$\\alpha + \\beta\\gamma + \\delta = 1 + \\frac{1}{10} - \\frac{1}{2} = \\frac{6}{10}$$
$$10(\\alpha + \\beta\\gamma + \\delta) = 10\\left(\\frac{6}{10}\\right) = 6$$

Hence, the correct answer is 6.`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 64,
    question_text: "If $f(x) = \\int \\frac{5x^8 + 7x^6}{(x^2 + 1 + 2x^7)^2} dx$ ($x \\ge 0$), $f(0) = 0$ and $f(1) = \\frac{1}{K}$, then the value of $K$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "4",
    solution_text: `Factor out $x^{14}$ from the denominator:
$$f(x) = \\int \\frac{5x^8 + 7x^6}{x^{14}(x^{-5} + x^{-7} + 2)^2} dx = \\int \\frac{5x^{-6} + 7x^{-8}}{(x^{-5} + x^{-7} + 2)^2} dx$$
Let $t = x^{-5} + x^{-7} + 2 \\implies dt = (-5x^{-6} - 7x^{-8}) dx$:
$$f(x) = -\\int t^{-2} dt = \\frac{1}{t} + C = \\frac{1}{x^{-5} + x^{-7} + 2} + C = \\frac{x^7}{x^2 + 1 + 2x^7} + C$$
Given $f(0) = 0 \\implies C = 0$.
$$f(1) = \\frac{1}{1 + 1 + 2} = \\frac{1}{4}$$
Given $f(1) = \\frac{1}{K} \\implies K = 4$.

Hence, the correct answer is 4.`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 65,
    question_text: "The integral $\\int \\frac{(2x - 1)\\cos\\sqrt{(2x - 1)^2 + 5}}{\\sqrt{4x^2 - 4x + 6}} dx$ is equal to (where $c$ is a constant of integration) :",
    options: [
      { option_text: "$\\frac{1}{2}\\sin\\sqrt{(2x - 1)^2 + 5} + c$" },
      { option_text: "$\\frac{1}{2}\\cos\\sqrt{(2x + 1)^2 + 5} + c$" },
      { option_text: "$\\frac{1}{2}\\cos\\sqrt{(2x - 1)^2 + 5} + c$" },
      { option_text: "$\\frac{1}{2}\\sin\\sqrt{(2x + 1)^2 + 5} + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Note that $4x^2 - 4x + 6 = (2x - 1)^2 + 5$.
Let $(2x - 1)^2 + 5 = t^2 \\implies 2(2x - 1) \\cdot 2 \\, dx = 2t \\, dt \\implies (2x - 1) dx = \\frac{1}{2} t \\, dt$.
$$I = \\int \\frac{\\cos t}{t} \\left(\\frac{1}{2} t \\, dt\\right) = \\frac{1}{2}\\int \\cos t \\, dt = \\frac{1}{2}\\sin t + c = \\frac{1}{2}\\sin\\sqrt{(2x - 1)^2 + 5} + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "If $\\int \\frac{dx}{(x^2 + x + 1)^2} = a\\tan^{-1}\\left(\\frac{2x + 1}{\\sqrt{3}}\\right) + b\\left(\\frac{2x + 1}{x^2 + x + 1}\\right) + C$ ($x > 0$), where $C$ is the constant of integration, then the value of $9(\\sqrt{3}a + b)$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "15",
    solution_text: `$$x^2 + x + 1 = \\left(x + \\frac{1}{2}\\right)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2$$
Let $x + \\frac{1}{2} = \\frac{\\sqrt{3}}{2}\\tan\\theta \\implies dx = \\frac{\\sqrt{3}}{2}\\sec^2\\theta \\, d\\theta$:
$$x^2 + x + 1 = \\frac{3}{4}\\sec^2\\theta$$
$$I = \\int \\frac{\\frac{\\sqrt{3}}{2}\\sec^2\\theta}{\\frac{9}{16}\\sec^4\\theta} d\\theta = \\frac{8\\sqrt{3}}{9}\\int \\cos^2\\theta \\, d\\theta = \\frac{4\\sqrt{3}}{9}\\int (1 + \\cos 2\\theta) d\\theta$$
$$= \\frac{4\\sqrt{3}}{9}\\left(\\theta + \\frac{\\sin 2\\theta}{2}\\right) + C = \\frac{4\\sqrt{3}}{9}(\\theta + \\sin\\theta\\cos\\theta) + C$$
Since $\\tan\\theta = \\frac{2x + 1}{\\sqrt{3}}$:
$$\\theta = \\tan^{-1}\\left(\\frac{2x + 1}{\\sqrt{3}}\\right), \\quad \\sin\\theta\\cos\\theta = \\frac{\\tan\\theta}{1 + \\tan^2\\theta} = \\frac{\\frac{2x+1}{\\sqrt{3}}}{1 + \\frac{(2x+1)^2}{3}} = \\frac{\\sqrt{3}(2x + 1)}{4(x^2 + x + 1)}$$
$$I = \\frac{4\\sqrt{3}}{9}\\tan^{-1}\\left(\\frac{2x + 1}{\\sqrt{3}}\\right) + \\frac{4\\sqrt{3}}{9} \\cdot \\frac{\\sqrt{3}(2x + 1)}{4(x^2 + x + 1)} + C$$
$$= \\frac{4\\sqrt{3}}{9}\\tan^{-1}\\left(\\frac{2x + 1}{\\sqrt{3}}\\right) + \\frac{1}{3}\\left(\\frac{2x + 1}{x^2 + x + 1}\\right) + C$$
Comparing with $a\\tan^{-1}\\left(\\frac{2x + 1}{\\sqrt{3}}\\right) + b\\left(\\frac{2x + 1}{x^2 + x + 1}\\right) + C$:
$$a = \\frac{4\\sqrt{3}}{9}, \\quad b = \\frac{1}{3}$$
$$9(\\sqrt{3}a + b) = 9\\left(\\sqrt{3} \\cdot \\frac{4\\sqrt{3}}{9} + \\frac{1}{3}\\right) = 9\\left(\\frac{12}{9} + \\frac{1}{3}\\right) = 9\\left(\\frac{4}{3} + \\frac{1}{3}\\right) = 9\\left(\\frac{5}{3}\\right) = 15$$

Hence, the correct answer is 15.`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 67,
    question_text: "$\\int \\frac{2e^x + 3e^{-x}}{4e^x + 7e^{-x}} dx = \\frac{1}{14}\\left(ux + v\\log_e(4e^x + 7e^{-x})\\right) + C$, where $C$ is a constant of integration, then $u + v$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "7",
    solution_text: `Multiply numerator and denominator by $e^x$:
$$I = \\int \\frac{2e^{2x} + 3}{4e^{2x} + 7} dx$$
Let $2e^{2x} + 3 = A\\frac{d}{dx}(4e^{2x} + 7) + B(4e^{2x} + 7) = A(8e^{2x}) + B(4e^{2x} + 7)$:
Equating coefficients:
$$8A + 4B = 2, \\quad 7B = 3 \\implies B = \\frac{3}{7}$$
$$8A = 2 - 4\\left(\\frac{3}{7}\\right) = 2 - \\frac{12}{7} = \\frac{2}{7} \\implies A = \\frac{1}{28}$$
$$I = \\frac{1}{28}\\int \\frac{8e^{2x}}{4e^{2x} + 7} dx + \\frac{3}{7}\\int 1 \\, dx = \\frac{1}{28}\\ln|4e^{2x} + 7| + \\frac{3}{7}x + C$$
$$= \\frac{1}{28}\\ln|e^x(4e^x + 7e^{-x})| + \\frac{3}{7}x + C = \\frac{1}{28}x + \\frac{1}{28}\\ln(4e^x + 7e^{-x}) + \\frac{3}{7}x + C$$
$$= \\frac{13}{28}x + \\frac{1}{28}\\ln(4e^x + 7e^{-x}) + C = \\frac{1}{14}\\left(\\frac{13}{2}x + \\frac{1}{2}\\log_e(4e^x + 7e^{-x})\\right) + C$$
Comparing gives:
$$u = \\frac{13}{2}, \\quad v = \\frac{1}{2} \\implies u + v = \\frac{13}{2} + \\frac{1}{2} = 7$$

Hence, the correct answer is 7.`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 68,
    question_text: "The integral $\\int \\frac{dx}{(x - 1)^{3/4}(x + 2)^{5/4}}$ is equal to : (where $C$ is a constant of integration)",
    options: [
      { option_text: "$\\frac{3}{4}\\left(\\frac{x + 2}{x - 1}\\right)^{1/4} + C$" },
      { option_text: "$\\frac{4}{3}\\left(\\frac{x - 1}{x + 2}\\right)^{1/4} + C$" },
      { option_text: "$\\frac{4}{3}\\left(\\frac{x - 1}{x + 2}\\right)^{5/4} + C$" },
      { option_text: "$\\frac{3}{4}\\left(\\frac{x + 2}{x - 1}\\right)^{5/4} + C$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Rewrite denominator:
$$(x - 1)^{3/4}(x + 2)^{5/4} = (x + 2)^2 \\left(\\frac{x - 1}{x + 2}\\right)^{3/4}$$
$$I = \\int \\frac{dx}{(x + 2)^2 \\left(\\frac{x - 1}{x + 2}\\right)^{3/4}}$$
Let $t = \\frac{x - 1}{x + 2} \\implies dt = \\frac{(x + 2) - (x - 1)}{(x + 2)^2} dx = \\frac{3}{(x + 2)^2} dx \\implies \\frac{dx}{(x + 2)^2} = \\frac{1}{3} dt$:
$$I = \\frac{1}{3}\\int t^{-3/4} dt = \\frac{1}{3} \\cdot \\frac{t^{1/4}}{1/4} + C = \\frac{4}{3} t^{1/4} + C = \\frac{4}{3}\\left(\\frac{x - 1}{x + 2}\\right)^{1/4} + C$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "If $\\int \\frac{\\sin x}{\\sin^3 x + \\cos^3 x} dx = \\alpha\\log_e|1 + \\tan x| + \\beta\\log_e|1 - \\tan x + \\tan^2 x| + \\gamma\\tan^{-1}\\left(\\frac{2\\tan x - 1}{\\sqrt{3}}\\right) + C$, when $C$ is constant of integration, then the value of $18(\\alpha + \\beta + \\gamma^2)$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    solution_text: `Divide numerator and denominator by $\\cos^3 x$:
$$I = \\int \\frac{\\tan x \\sec^2 x}{1 + \\tan^3 x} dx$$
Let $\\tan x = t \\implies \\sec^2 x \\, dx = dt$:
$$I = \\int \\frac{t}{1 + t^3} dt = \\int \\frac{t}{(t + 1)(t^2 - t + 1)} dt$$
Partial fractions:
$$\\frac{t}{(t + 1)(t^2 - t + 1)} = \\frac{A}{t + 1} + \\frac{Bt + C'}{t^2 - t + 1}$$
$$t = A(t^2 - t + 1) + (Bt + C')(t + 1)$$
At $t = -1$: $-1 = 3A \\implies A = -\\frac{1}{3}$.
For $t^2$: $A + B = 0 \\implies B = \\frac{1}{3}$.
Constant term: $A + C' = 0 \\implies C' = \\frac{1}{3}$.
$$I = -\\frac{1}{3}\\int \\frac{dt}{t + 1} + \\frac{1}{3}\\int \\frac{t + 1}{t^2 - t + 1} dt$$
$$= -\\frac{1}{3}\\ln|t + 1| + \\frac{1}{6}\\int \\frac{2t - 1 + 3}{t^2 - t + 1} dt$$
$$= -\\frac{1}{3}\\ln|t + 1| + \\frac{1}{6}\\ln|t^2 - t + 1| + \\frac{1}{2} \\cdot \\frac{2}{\\sqrt{3}}\\tan^{-1}\\left(\\frac{2t - 1}{\\sqrt{3}}\\right) + C$$
$$= -\\frac{1}{3}\\log_e|1 + \\tan x| + \\frac{1}{6}\\log_e|1 - \\tan x + \\tan^2 x| + \\frac{1}{\\sqrt{3}}\\tan^{-1}\\left(\\frac{2\\tan x - 1}{\\sqrt{3}}\\right) + C$$
Comparing gives:
$$\\alpha = -\\frac{1}{3}, \\quad \\beta = \\frac{1}{6}, \\quad \\gamma = \\frac{1}{\\sqrt{3}}$$
$$\\alpha + \\beta + \\gamma^2 = -\\frac{1}{3} + \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{6}$$
$$18(\\alpha + \\beta + \\gamma^2) = 18\\left(\\frac{1}{6}\\right) = 3$$

Hence, the correct answer is 3.`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 70,
    question_text: "Let $g: (0, \\infty) \\to \\mathbb{R}$ be a differentiable function such that $\\int \\left(\\frac{x(\\cos x - \\sin x)}{e^x + 1} + \\frac{g(x)(e^x + 1 - xe^x)}{(e^x + 1)^2}\\right) dx = \\frac{x g(x)}{e^x + 1} + C$, for all $x > 0$, where $C$ is an arbitrary constant. Then :",
    options: [
      { option_text: "$g$ is decreasing in $\\left(0, \\frac{\\pi}{4}\\right)$" },
      { option_text: "$g - g'$ is increasing in $\\left(0, \\frac{\\pi}{2}\\right)$" },
      { option_text: "$g'$ is increasing in $\\left(0, \\frac{\\pi}{4}\\right)$" },
      { option_text: "$g + g'$ is increasing in $\\left(0, \\frac{\\pi}{2}\\right)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Differentiating both sides with respect to $x$:
$$\\frac{x(\\cos x - \\sin x)}{e^x + 1} + \\frac{g(x)(e^x + 1 - xe^x)}{(e^x + 1)^2} = \\frac{(e^x + 1)(g(x) + xg'(x)) - xg(x)e^x}{(e^x + 1)^2}$$
$$= \\frac{g(x)(e^x + 1 - xe^x) + x(e^x + 1)g'(x)}{(e^x + 1)^2}$$
Cancelling $\\frac{g(x)(e^x + 1 - xe^x)}{(e^x + 1)^2}$ from both sides:
$$\\frac{x(\\cos x - \\sin x)}{e^x + 1} = \\frac{x(e^x + 1)g'(x)}{(e^x + 1)^2} = \\frac{x g'(x)}{e^x + 1}$$
$$g'(x) = \\cos x - \\sin x$$
Integrating:
$$g(x) = \\sin x + \\cos x + C_1$$
Now, $g(x) - g'(x) = (\\sin x + \\cos x) - (\\cos x - \\sin x) = 2\\sin x$.
For $x \\in \\left(0, \\frac{\\pi}{2}\\right)$:
$$\\frac{d}{dx}(g(x) - g'(x)) = 2\\cos x > 0$$
Hence, $g - g'$ is strictly increasing in $\\left(0, \\frac{\\pi}{2}\\right)$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 71,
    question_text: "If $\\int \\sqrt{\\frac{1 - x}{1 + x}} \\frac{dx}{x} = g(x) + c$, $g(1) = 0$, then $g\\left(\\frac{1}{2}\\right)$ is equal to :",
    options: [
      { option_text: "$\\log_e\\left(\\frac{\\sqrt{3} - 1}{\\sqrt{3} + 1}\\right) + \\frac{\\pi}{3}$" },
      { option_text: "$\\frac{1}{2}\\log_e\\left(\\frac{\\sqrt{3} - 1}{\\sqrt{3} + 1}\\right) + \\frac{\\pi}{3}$" },
      { option_text: "$\\log_e\\left(\\frac{\\sqrt{3} + 1}{\\sqrt{3} - 1}\\right) + \\frac{\\pi}{3}$" },
      { option_text: "$\\frac{1}{2}\\log_e\\left(\\frac{\\sqrt{3} + 1}{\\sqrt{3} - 1}\\right) + \\frac{\\pi}{6}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Put $x = \\cos 2\\theta \\implies dx = -2\\sin 2\\theta \\, d\\theta$:
$$\\sqrt{\\frac{1 - x}{1 + x}} = \\sqrt{\\frac{2\\sin^2\\theta}{2\\cos^2\\theta}} = \\tan\\theta$$
$$I = \\int \\tan\\theta \\cdot \\frac{-2\\sin 2\\theta \\, d\\theta}{\\cos 2\\theta} = -2\\int \\frac{\\sin\\theta}{\\cos\\theta} \\cdot \\frac{2\\sin\\theta\\cos\\theta}{\\cos 2\\theta} d\\theta$$
$$= -4\\int \\frac{\\sin^2\\theta}{\\cos 2\\theta} d\\theta = -2\\int \\frac{1 - \\cos 2\\theta}{\\cos 2\\theta} d\\theta = -2\\int (\\sec 2\\theta - 1) d\\theta$$
$$= -\\ln|\\sec 2\\theta + \\tan 2\\theta| + 2\\theta + c = -\\ln\\left|\\frac{1 + \\sin 2\\theta}{\\cos 2\\theta}\\right| + 2\\theta + c$$
$$= \\ln\\left|\\frac{\\cos 2\\theta}{1 + \\sin 2\\theta}\\right| + 2\\theta + c = \\ln\\left|\\frac{x}{1 + \\sqrt{1 - x^2}}\\right| + \\cos^{-1} x + c$$
Or equivalently:
$$\\ln\\left|\\frac{1 - \\sqrt{1 - x^2}}{x}\\right| + \\cos^{-1} x + c$$
Since $g(1) = 0 \\implies c = 0$.
At $x = \\frac{1}{2}$:
$$\\cos^{-1}\\left(\\frac{1}{2}\\right) = \\frac{\\pi}{3}$$
$$\\sqrt{1 - x^2} = \\frac{\\sqrt{3}}{2}$$
$$\\frac{1 - \\sqrt{3}/2}{1/2} = 2 - \\sqrt{3} = \\frac{\\sqrt{3} - 1}{\\sqrt{3} + 1}$$
$$g\\left(\\frac{1}{2}\\right) = \\log_e\\left(\\frac{\\sqrt{3} - 1}{\\sqrt{3} + 1}\\right) + \\frac{\\pi}{3}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 72,
    question_text: "$\\int \\frac{(x^2 + 1)e^x}{(x + 1)^2} dx = f(x)e^x + C$, where $C$ is a constant, then $\\frac{d^3 f}{dx^3}$ at $x = 1$ is equal to :",
    options: [
      { option_text: "$\\frac{3}{4}$" },
      { option_text: "$\\frac{3}{8}$" },
      { option_text: "$-\\frac{3}{2}$" },
      { option_text: "$\\frac{7}{8}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$\\frac{x^2 + 1}{(x + 1)^2} = \\frac{x^2 - 1 + 2}{(x + 1)^2} = \\frac{x - 1}{x + 1} + \\frac{2}{(x + 1)^2}$$
Since $\\frac{d}{dx}\\left(\\frac{x - 1}{x + 1}\\right) = \\frac{(x + 1) - (x - 1)}{(x + 1)^2} = \\frac{2}{(x + 1)^2}$:
$$\\int e^x\\left[\\frac{x - 1}{x + 1} + \\frac{2}{(x + 1)^2}\\right] dx = e^x\\left(\\frac{x - 1}{x + 1}\\right) + C$$
Thus:
$$f(x) = \\frac{x - 1}{x + 1} = 1 - \\frac{2}{x + 1}$$
$$f'(x) = 2(x + 1)^{-2}$$
$$f''(x) = -4(x + 1)^{-3}$$
$$f'''(x) = 12(x + 1)^{-4}$$
At $x = 1$:
$$f'''(1) = \\frac{12}{(1 + 1)^4} = \\frac{12}{16} = \\frac{3}{4}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "The integral $\\int \\frac{\\left(1 - \\frac{1}{\\sqrt{3}}\\right)(\\cos x - \\sin x)}{\\left(1 + \\frac{2}{\\sqrt{3}}\\sin 2x\\right)} dx$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{12}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)}\\right| + C$" },
      { option_text: "$\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{3}\\right)}\\right| + C$" },
      { option_text: "$\\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{3}\\right)}\\right| + C$" },
      { option_text: "$\\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{12}\\right)}{\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{6}\\right)}\\right| + C$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Multiply numerator and denominator by $\\frac{\\sqrt{3}}{2}$:
$$I = \\int \\frac{\\left(\\frac{\\sqrt{3}}{2} - \\frac{1}{2}\\right)(\\cos x - \\sin x)}{\\frac{\\sqrt{3}}{2} + \\sin 2x} dx = \\int \\frac{\\left(\\frac{\\sqrt{3}}{2} - \\frac{1}{2}\\right)(\\cos x - \\sin x)}{\\sin\\frac{\\pi}{3} + \\sin 2x} dx$$
$$= \\int \\frac{\\frac{\\sqrt{3}}{2}\\cos x - \\frac{1}{2}\\cos x - \\frac{\\sqrt{3}}{2}\\sin x + \\frac{1}{2}\\sin x}{2\\sin\\left(x + \\frac{\\pi}{6}\\right)\\cos\\left(x - \\frac{\\pi}{6}\\right)} dx$$
$$= \\int \\frac{\\cos\\left(x - \\frac{\\pi}{6}\\right) - \\sin\\left(x + \\frac{\\pi}{6}\\right)}{2\\sin\\left(x + \\frac{\\pi}{6}\\right)\\cos\\left(x - \\frac{\\pi}{6}\\right)} dx$$
$$= \\frac{1}{2}\\int \\csc\\left(x + \\frac{\\pi}{6}\\right) dx - \\frac{1}{2}\\int \\sec\\left(x - \\frac{\\pi}{6}\\right) dx$$
$$= \\frac{1}{2}\\ln\\left|\\tan\\left(\\frac{x + \\pi/6}{2}\\right)\\right| - \\frac{1}{2}\\ln\\left|\\tan\\left(\\frac{\\pi}{4} + \\frac{x - \\pi/6}{2}\\right)\\right| + C$$
$$= \\frac{1}{2}\\ln\\left|\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{12}\\right)\\right| - \\frac{1}{2}\\ln\\left|\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)\\right| + C$$
$$= \\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{12}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)}\\right| + C$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "For $I(x) = \\int \\frac{\\sec^2 x - 2022}{\\sin^{2022} x} dx$, if $I\\left(\\frac{\\pi}{4}\\right) = 2^{1011}$, then :",
    options: [
      { option_text: "$3^{1010} I\\left(\\frac{\\pi}{3}\\right) - I\\left(\\frac{\\pi}{6}\\right) = 0$" },
      { option_text: "$3^{1011} I\\left(\\frac{\\pi}{3}\\right) - I\\left(\\frac{\\pi}{6}\\right) = 0$" },
      { option_text: "$3^{1010} I\\left(\\frac{\\pi}{6}\\right) - I\\left(\\frac{\\pi}{3}\\right) = 0$" },
      { option_text: "$3^{1011} I\\left(\\frac{\\pi}{6}\\right) - I\\left(\\frac{\\pi}{3}\\right) = 0$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$I(x) = \\int \\frac{\\sec^2 x}{\\sin^{2022} x} dx - 2022\\int \\sin^{-2022} x \\, dx$$
$$= \\int \\tan x \\cdot \\sec x \\cdot \\csc^{2021} x \\, dx - 2022\\int \\csc^{2022} x \\, dx$$
Or integrate $\\int \\sec^2 x \\csc^{2022} x \\, dx$ by parts taking $u = \\csc^{2022} x$ and $v' = \\sec^2 x \\implies v = \\tan x$:
$$\\int \\sec^2 x \\csc^{2022} x \\, dx = \\tan x \\csc^{2022} x - \\int \\tan x (-2022\\csc^{2022} x \\cot x) dx$$
$$= \\tan x \\csc^{2022} x + 2022\\int \\csc^{2022} x \\, dx$$
Substituting this back into $I(x)$:
$$I(x) = \\tan x \\csc^{2022} x + 2022\\int \\csc^{2022} x \\, dx - 2022\\int \\csc^{2022} x \\, dx + C = \\frac{\\tan x}{\\sin^{2022} x} + C$$
Given $I\\left(\\frac{\\pi}{4}\\right) = 2^{1011}$:
$$I\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{(1/\\sqrt{2})^{2022}} + C = 2^{1011} + C = 2^{1011} \\implies C = 0$$
So $I(x) = \\frac{\\tan x}{\\sin^{2022} x}$.
Now:
$$I\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{(\\sqrt{3}/2)^{2022}} = \\frac{2^{2022}}{3^{1010.5}}$$
$$I\\left(\\frac{\\pi}{6}\\right) = \\frac{1/\\sqrt{3}}{(1/2)^{2022}} = \\frac{2^{2022}}{\\sqrt{3}}$$
Therefore:
$$3^{1010} I\\left(\\frac{\\pi}{3}\\right) = 3^{1010} \\cdot \\frac{2^{2022}}{3^{1010.5}} = \\frac{2^{2022}}{\\sqrt{3}} = I\\left(\\frac{\\pi}{6}\\right)$$
$$3^{1010} I\\left(\\frac{\\pi}{3}\\right) - I\\left(\\frac{\\pi}{6}\\right) = 0$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 75,
    question_text: "Let $f(x) = \\int \\frac{2x}{(x^2 + 1)(x^2 + 3)} dx$. If $f(3) = \\frac{1}{2}(\\log_e 5 - \\log_e 6)$, then $f(4)$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{2}(\\log_e 17 - \\log_e 19)$" },
      { option_text: "$\\log_e 17 - \\log_e 18$" },
      { option_text: "$\\frac{1}{2}(\\log_e 19 - \\log_e 17)$" },
      { option_text: "$\\log_e 19 - \\log_e 20$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Put $x^2 = t \\implies 2x \\, dx = dt$:
$$f(x) = \\int \\frac{dt}{(t + 1)(t + 3)} = \\frac{1}{2}\\int \\left(\\frac{1}{t + 1} - \\frac{1}{t + 3}\\right) dt = \\frac{1}{2}\\left[\\log_e(t + 1) - \\log_e(t + 3)\\right] + c$$
$$= \\frac{1}{2}\\left[\\log_e(x^2 + 1) - \\log_e(x^2 + 3)\\right] + c$$
Given $f(3) = \\frac{1}{2}(\\log_e 10 - \\log_e 12) + c = \\frac{1}{2}\\left(\\log_e\\frac{5}{6}\\right) + c$:
Since $f(3) = \\frac{1}{2}(\\log_e 5 - \\log_e 6)$, we have $c = 0$.
Now for $x = 4$:
$$f(4) = \\frac{1}{2}(\\log_e(16 + 1) - \\log_e(16 + 3)) = \\frac{1}{2}(\\log_e 17 - \\log_e 19)$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  }
];

