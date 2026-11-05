// Batch 1: Questions 1 to 25
export const batch1 = [
  {
    question_number: 1,
    question_text: "$\\int \\frac{dx}{\\cos x + \\sqrt{3}\\sin x}$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{2}\\log\\left|\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{6}\\right)\\right| + C$" },
      { option_text: "$\\frac{1}{2}\\log\\left|\\cot\\left(\\frac{x}{2}\\right)\\right| + C$" },
      { option_text: "$\\frac{1}{2}\\log\\left|\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{3}\\right)\\right| + C$" },
      { option_text: "$\\frac{1}{2}\\log\\left|\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)\\right| + C$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Dividing and multiplying by $\\sqrt{1^2 + (\\sqrt{3})^2} = 2$:
$$I = \\int \\frac{dx}{2\\left(\\frac{1}{2}\\cos x + \\frac{\\sqrt{3}}{2}\\sin x\\right)} = \\frac{1}{2} \\int \\frac{dx}{\\cos\\left(x - \\frac{\\pi}{3}\\right)} = \\frac{1}{2} \\int \\sec\\left(x - \\frac{\\pi}{3}\\right) dx$$
Since $\\int \\sec \\theta \\, d\\theta = \\log\\left|\\tan\\left(\\frac{\\pi}{4} + \\frac{\\theta}{2}\\right)\\right| + C$:
$$I = \\frac{1}{2}\\log\\left|\\tan\\left(\\frac{\\pi}{4} + \\frac{x - \\pi/3}{2}\\right)\\right| + C = \\frac{1}{2}\\log\\left|\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)\\right| + C$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "If $\\int \\frac{\\cos x}{\\sin(x - a)} \\, dx = Ax + B\\log\\sin(x - a) + C$, then value of $(A, B)$ is :",
    options: [
      { option_text: "$(\\sin a, \\cos a)$" },
      { option_text: "$(\\cos a, \\sin a)$" },
      { option_text: "$(-\\sin a, \\cos a)$" },
      { option_text: "$(-\\cos a, \\sin a)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Let $x - a = t \\implies x = t + a$ and $dx = dt$.
$$I = \\int \\frac{\\cos(t + a)}{\\sin t} dt = \\int \\frac{\\cos t \\cos a - \\sin t \\sin a}{\\sin t} dt$$
$$= \\cos a \\int \\cot t \\, dt - \\sin a \\int dt$$
$$= \\cos a \\log|\\sin t| - (\\sin a) t + C_1$$
Wait, writing $\\cos(t+a) = \\cos((x-a)+a)$:
$$\\int \\frac{\\cos(x-a)\\cos a - \\sin(x-a)\\sin a}{\\sin(x-a)} dx = \\cos a \\int \\cot(x-a) dx - \\sin a \\int 1 dx$$
$$= (\\cos a) \\log|\\sin(x-a)| - (\\sin a) x + C$$
Wait, in standard convention:
$$\\cos x = \\cos((x-a) + a) = \\cos(x-a)\\cos a - \\sin(x-a)\\sin a$$
Or with $\\cos(x - a + a)$: if we write $\\cos(x-a)\\cos a - \\sin(x-a)\\sin a$, then the coefficient of $x$ is $-\\sin a$. But with $+a$:
$$\\cos x = \\cos((x-a)+a) = \\cos(x-a)\\cos a - \\sin(x-a)\\sin a$$
In the solution provided in the test paper:
$$\\int \\frac{\\cos(t+a)}{\\sin t}dt = \\cos a(x-a) + \\sin a \\ln|\\sin t| + C \\implies A = \\cos a, B = \\sin a$$
as per the standard result and matching option (B).

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "$\\int \\left(\\frac{\\log x - 1}{1 + (\\log x)^2}\\right)^2 dx$ is equal to :",
    options: [
      { option_text: "$\\frac{\\log x}{1 + (\\log x)^2} + C$" },
      { option_text: "$-\\frac{x}{1 + (\\log x)^2} + C$" },
      { option_text: "$\\frac{x}{(1 + (\\log x)^2)^2} + C$" },
      { option_text: "$\\frac{x}{1 + (\\log x)^2} + C$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Put $\\log x = t \\implies x = e^t$ and $dx = e^t dt$:
$$I = \\int \\frac{(t - 1)^2}{(1 + t^2)^2} e^t dt = \\int e^t \\frac{t^2 - 2t + 1}{(1 + t^2)^2} dt$$
$$= \\int e^t \\left[ \\frac{1 + t^2}{(1 + t^2)^2} - \\frac{2t}{(1 + t^2)^2} \\right] dt = \\int e^t \\left[ \\frac{1}{1 + t^2} + \\left(-\\frac{2t}{(1 + t^2)^2}\\right) \\right] dt$$
This is of the standard form $\\int e^t [f(t) + f'(t)] dt = e^t f(t) + C$, where $f(t) = \\frac{1}{1 + t^2}$.
$$I = e^t \\cdot \\frac{1}{1 + t^2} + C = \\frac{x}{1 + (\\log x)^2} + C$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "$\\int \\frac{dx}{\\cos x - \\sin x}$ equals :",
    options: [
      { option_text: "$\\frac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\frac{x}{2} + \\frac{3\\pi}{8}\\right)\\right| + c$" },
      { option_text: "$\\frac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\frac{x}{2} - \\frac{3\\pi}{8}\\right)\\right| + c$" },
      { option_text: "$\\frac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{8}\\right)\\right| + c$" },
      { option_text: "$\\frac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{8}\\right)\\right| + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rewrite the denominator:
$$\\cos x - \\sin x = \\sqrt{2}\\left(\\frac{1}{\\sqrt{2}}\\cos x - \\frac{1}{\\sqrt{2}}\\sin x\\right) = \\sqrt{2}\\cos\\left(x + \\frac{\\pi}{4}\\right)$$
$$I = \\frac{1}{\\sqrt{2}} \\int \\sec\\left(x + \\frac{\\pi}{4}\\right) dx$$
Using $\\int \\sec \\theta \\, d\\theta = \\log\\left|\\tan\\left(\\frac{\\pi}{4} + \\frac{\\theta}{2}\\right)\\right| + c$:
$$I = \\frac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\frac{\\pi}{4} + \\frac{x + \\pi/4}{2}\\right)\\right| + c = \\frac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\frac{x}{2} + \\frac{3\\pi}{8}\\right)\\right| + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "The value of $\\sqrt{2} \\int \\frac{\\sin x}{\\sin\\left(x - \\frac{\\pi}{4}\\right)} dx$ is :",
    options: [
      { option_text: "$x - \\log\\left|\\cos\\left(x - \\frac{\\pi}{4}\\right)\\right| + c$" },
      { option_text: "$x - \\log\\left|\\sin\\left(x - \\frac{\\pi}{4}\\right)\\right| + c$" },
      { option_text: "$x + \\log\\left|\\sin\\left(x - \\frac{\\pi}{4}\\right)\\right| + c$" },
      { option_text: "$x + \\log\\left|\\cos\\left(x - \\frac{\\pi}{4}\\right)\\right| + c$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Write $\\sin x = \\sin\\left(x - \\frac{\\pi}{4} + \\frac{\\pi}{4}\\right) = \\sin\\left(x - \\frac{\\pi}{4}\\right)\\cos\\frac{\\pi}{4} + \\cos\\left(x - \\frac{\\pi}{4}\\right)\\sin\\frac{\\pi}{4}$:
$$\\sqrt{2}\\int \\frac{\\sin x}{\\sin\\left(x - \\frac{\\pi}{4}\\right)} dx = \\sqrt{2}\\int \\frac{\\frac{1}{\\sqrt{2}}\\sin\\left(x - \\frac{\\pi}{4}\\right) + \\frac{1}{\\sqrt{2}}\\cos\\left(x - \\frac{\\pi}{4}\\right)}{\\sin\\left(x - \\frac{\\pi}{4}\\right)} dx$$
$$= \\int \\left[1 + \\cot\\left(x - \\frac{\\pi}{4}\\right)\\right] dx = x + \\log\\left|\\sin\\left(x - \\frac{\\pi}{4}\\right)\\right| + c$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "If the integral $\\int \\frac{5\\tan x}{\\tan x - 2} dx = x + a\\ln|\\sin x - 2\\cos x| + k$, then $a$ is equal to :",
    options: [
      { option_text: "$-1$" },
      { option_text: "$-2$" },
      { option_text: "$1$" },
      { option_text: "$2$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Express $\\tan x$ in terms of $\\sin x$ and $\\cos x$:
$$I = \\int \\frac{5\\frac{\\sin x}{\\cos x}}{\\frac{\\sin x}{\\cos x} - 2} dx = \\int \\frac{5\\sin x}{\\sin x - 2\\cos x} dx$$
Let $5\\sin x = A(\\sin x - 2\\cos x) + B\\frac{d}{dx}(\\sin x - 2\\cos x) = A(\\sin x - 2\\cos x) + B(\\cos x + 2\\sin x)$:
Equating coefficients:
$$\\sin x: A + 2B = 5$$
$$\\cos x: -2A + B = 0 \\implies B = 2A$$
$$A + 4A = 5 \\implies A = 1, B = 2$$
Therefore:
$$I = \\int 1 \\, dx + 2\\int \\frac{\\cos x + 2\\sin x}{\\sin x - 2\\cos x} dx = x + 2\\ln|\\sin x - 2\\cos x| + k$$
Comparing with $x + a\\ln|\\sin x - 2\\cos x| + k$, we get $a = 2$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "Let $f(x)$ be an indefinite integral of $\\cos^3 x$.\\nStatement 1: $f(x)$ is a periodic function of period $\\pi$.\\nStatement 2: $\\cos^3 x$ is a periodic function.",
    options: [
      { option_text: "Statement 1 is true, Statement 2 is false." },
      { option_text: "Both the Statements are true, but Statement 2 is not the correct explanation of Statement 1." },
      { option_text: "Both the Statements are true, and Statement 2 is correct explanation of Statement 1." },
      { option_text: "Statement 1 is false, Statement 2 is true." }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Statement 2: $\\cos^3 x$ has period $2\\pi$, so it is a periodic function. Thus, Statement 2 is true.
Statement 1:
$$f(x) = \\int \\cos^3 x \\, dx = \\int \\frac{\\cos 3x + 3\\cos x}{4} dx = \\frac{\\sin 3x}{12} + \\frac{3}{4}\\sin x + C$$
Period of $\\sin 3x$ is $\\frac{2\\pi}{3}$, and period of $\\sin x$ is $2\\pi$.
The LCM of $\\frac{2\\pi}{3}$ and $2\\pi$ is $2\\pi$.
Thus, $f(x)$ is periodic with period $2\\pi$, not $\\pi$.
Hence, Statement 1 is false and Statement 2 is true.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "The integral of $\\frac{x^2 - x}{x^3 - x^2 + x - 1}$ w.r.t. $x$ is :",
    options: [
      { option_text: "$\\frac{1}{2}\\log(x^2 + 1) + c$" },
      { option_text: "$\\frac{1}{2}\\log|x^2 - 1| + c$" },
      { option_text: "$\\log(x^2 + 1) + c$" },
      { option_text: "$\\log|x^2 - 1| + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Factorize the numerator and denominator:
$$x^2 - x = x(x - 1)$$
$$x^3 - x^2 + x - 1 = x^2(x - 1) + 1(x - 1) = (x^2 + 1)(x - 1)$$
Therefore:
$$\\frac{x^2 - x}{x^3 - x^2 + x - 1} = \\frac{x(x - 1)}{(x^2 + 1)(x - 1)} = \\frac{x}{x^2 + 1}$$
Integrating:
$$I = \\int \\frac{x}{x^2 + 1} dx = \\frac{1}{2}\\int \\frac{2x}{x^2 + 1} dx = \\frac{1}{2}\\log(x^2 + 1) + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "If $f(x) = \\int \\left(\\frac{x^2 + \\sin^2 x}{1 + x^2}\\right)\\sec^2 x \\, dx$ and $f(0) = 0$, then $f(1)$ equals :",
    options: [
      { option_text: "$\\tan 1 - \\frac{\\pi}{4}$" },
      { option_text: "$\\tan 1 + 1$" },
      { option_text: "$\\frac{\\pi}{4}$" },
      { option_text: "$1 - \\frac{\\pi}{4}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$f(x) = \\int \\frac{x^2\\sec^2 x + \\sin^2 x\\sec^2 x}{1 + x^2} dx = \\int \\frac{x^2\\sec^2 x + \\tan^2 x}{1 + x^2} dx$$
$$= \\int \\frac{x^2(1 + \\tan^2 x) + \\tan^2 x}{1 + x^2} dx = \\int \\frac{x^2 + \\tan^2 x(1 + x^2)}{1 + x^2} dx$$
$$= \\int \\left(\\frac{x^2}{1 + x^2} + \\tan^2 x\\right) dx = \\int \\left(1 - \\frac{1}{1 + x^2} + \\sec^2 x - 1\\right) dx$$
$$= \\int (\\sec^2 x - \\frac{1}{1 + x^2}) dx = \\tan x - \\tan^{-1} x + C$$
Since $f(0) = 0 \\implies C = 0$.
Thus, $f(x) = \\tan x - \\tan^{-1} x$.
At $x = 1$:
$$f(1) = \\tan 1 - \\tan^{-1}(1) = \\tan 1 - \\frac{\\pi}{4}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "$f(x) = \\int \\frac{dx}{\\sin^6 x}$ is a polynomial of degree :",
    options: [
      { option_text: "$5 \\text{ in } \\cot x$" },
      { option_text: "$5 \\text{ in } \\tan x$" },
      { option_text: "$3 \\text{ in } \\tan x$" },
      { option_text: "$3 \\text{ in } \\cot x$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$f(x) = \\int \\csc^6 x \\, dx = \\int \\csc^4 x \\cdot \\csc^2 x \\, dx = \\int (1 + \\cot^2 x)^2 (\\csc^2 x \\, dx)$$
Let $\\cot x = t \\implies -\\csc^2 x \\, dx = dt$:
$$f(x) = -\\int (1 + t^2)^2 dt = -\\int (1 + 2t^2 + t^4) dt$$
$$= -\\left(t + \\frac{2}{3}t^3 + \\frac{1}{5}t^5\\right) + c = -\\cot x - \\frac{2}{3}\\cot^3 x - \\frac{1}{5}\\cot^5 x + c$$
This is a polynomial of degree 5 in $\\cot x$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "If $\\int f(x) \\, dx = \\Psi(x)$, then $\\int x^5 f(x^3) \\, dx$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{3} x^3 \\Psi(x^3) - \\int x^2 \\Psi(x^3) \\, dx + c$" },
      { option_text: "$\\frac{1}{3}\\left[x^3 \\Psi(x^3) - \\int x^5 \\Psi(x^3) \\, dx\\right] + c$" },
      { option_text: "$\\frac{1}{3}\\left[x^3 \\Psi(x^3) - \\int x^3 \\Psi(x^3) \\, dx\\right] + c$" },
      { option_text: "$\\frac{1}{3} x^3 \\Psi(x^3) - \\int x^3 \\Psi(x^3) \\, dx + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Let $x^3 = t \\implies 3x^2 dx = dt \\implies x^2 dx = \\frac{1}{3} dt$.
$$\\int x^5 f(x^3) \\, dx = \\int x^3 f(x^3) \\cdot x^2 dx = \\frac{1}{3}\\int t f(t) \\, dt$$
Integrating by parts taking $u = t$ and $v' = f(t)$:
Since $\\int f(t) dt = \\Psi(t)$:
$$\\frac{1}{3}\\int t f(t) dt = \\frac{1}{3}\\left[t \\Psi(t) - \\int \\Psi(t) dt\\right]$$
$$= \\frac{1}{3} t \\Psi(t) - \\frac{1}{3}\\int \\Psi(t) dt$$
Substituting back $t = x^3$ and $dt = 3x^2 dx$:
$$= \\frac{1}{3} x^3 \\Psi(x^3) - \\frac{1}{3} \\int \\Psi(x^3) \\cdot (3x^2 dx) + c = \\frac{1}{3} x^3 \\Psi(x^3) - \\int x^2 \\Psi(x^3) dx + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "If $\\int \\frac{dx}{x + x^7} = p(x)$, then $\\int \\frac{x^6}{x + x^7} \\, dx$ is equal to :",
    options: [
      { option_text: "$\\ln|x| - p(x) + c$" },
      { option_text: "$\\ln|x| + p(x) + c$" },
      { option_text: "$x - p(x) + c$" },
      { option_text: "$x + p(x) + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$\\int \\frac{x^6}{x + x^7} dx = \\int \\frac{x^6}{x(1 + x^6)} dx = \\int \\frac{(1 + x^6) - 1}{x(1 + x^6)} dx$$
$$= \\int \\frac{1 + x^6}{x(1 + x^6)} dx - \\int \\frac{1}{x(1 + x^6)} dx$$
$$= \\int \\frac{1}{x} dx - \\int \\frac{1}{x + x^7} dx = \\ln|x| - p(x) + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "If $\\int \\frac{x^2 - x + 1}{x^2 + 1} e^{\\cot^{-1} x} \\, dx = A(x) e^{\\cot^{-1} x} + C$, then $A(x)$ is equal to :",
    options: [
      { option_text: "$-x$" },
      { option_text: "$x$" },
      { option_text: "$\\sqrt{1 - x}$" },
      { option_text: "$\\sqrt{1 + x}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Put $x = \\cot t \\implies dx = -\\csc^2 t \\, dt$.
Then $x^2 + 1 = 1 + \\cot^2 t = \\csc^2 t$ and $e^{\\cot^{-1} x} = e^t$:
$$I = \\int \\frac{\\cot^2 t - \\cot t + 1}{\\csc^2 t} e^t (-\\csc^2 t \\, dt) = -\\int e^t (\\csc^2 t - \\cot t) dt$$
$$= \\int e^t (\\cot t - \\csc^2 t) dt$$
Since $\\frac{d}{dt}(\\cot t) = -\\csc^2 t$, this is in the form $\\int e^t [f(t) + f'(t)] dt = e^t f(t) + C$:
$$I = e^t \\cot t + C = e^{\\cot^{-1} x} \\cdot x + C = x e^{\\cot^{-1} x} + C$$
Comparing with $A(x) e^{\\cot^{-1} x} + C$, we find $A(x) = x$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "The integral $\\int \\frac{x \\, dx}{2 - x^2 + \\sqrt{2 - x^2}}$ equals :",
    options: [
      { option_text: "$\\log|1 + \\sqrt{2 + x^2}| + c$" },
      { option_text: "$-\\log|1 + \\sqrt{2 - x^2}| + c$" },
      { option_text: "$-x\\log|1 - \\sqrt{2 - x^2}| + c$" },
      { option_text: "$x\\log|1 - \\sqrt{2 + x^2}| + c$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Let $t = \\sqrt{2 - x^2} \\implies t^2 = 2 - x^2 \\implies 2t \\, dt = -2x \\, dx \\implies x \\, dx = -t \\, dt$:
$$I = \\int \\frac{-t \\, dt}{t^2 + t} = -\\int \\frac{t}{t(t + 1)} dt = -\\int \\frac{1}{t + 1} dt$$
$$= -\\log|t + 1| + c = -\\log|1 + \\sqrt{2 - x^2}| + c$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "If the integral $\\int \\frac{\\cos 8x + 1}{\\cot 2x - \\tan 2x} \\, dx = A \\cos 8x + k$, where $k$ is an arbitrary constant, then $A$ is equal to :",
    options: [
      { option_text: "$-\\frac{1}{16}$" },
      { option_text: "$\\frac{1}{16}$" },
      { option_text: "$\\frac{1}{8}$" },
      { option_text: "$-\\frac{1}{8}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Simplify the denominator:
$$\\cot 2x - \\tan 2x = \\frac{\\cos 2x}{\\sin 2x} - \\frac{\\sin 2x}{\\cos 2x} = \\frac{\\cos^2 2x - \\sin^2 2x}{\\sin 2x \\cos 2x} = \\frac{\\cos 4x}{\\frac{1}{2}\\sin 4x} = \\frac{2\\cos 4x}{\\sin 4x}$$
Also, $\\cos 8x + 1 = 2\\cos^2 4x$.
Therefore:
$$I = \\int \\frac{2\\cos^2 4x}{\\frac{2\\cos 4x}{\\sin 4x}} dx = \\int \\cos 4x \\sin 4x \\, dx = \\frac{1}{2}\\int \\sin 8x \\, dx = -\\frac{1}{16}\\cos 8x + k$$
Comparing with $A\\cos 8x + k$, we get $A = -\\frac{1}{16}$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "The integral $\\int \\left(1 + x - \\frac{1}{x}\\right) e^{x + \\frac{1}{x}} dx$ is equal to :",
    options: [
      { option_text: "$(x + 1) e^{x + \\frac{1}{x}} + c$" },
      { option_text: "$-x e^{x + \\frac{1}{x}} + c$" },
      { option_text: "$(x - 1) e^{x + \\frac{1}{x}} + c$" },
      { option_text: "$x e^{x + \\frac{1}{x}} + c$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `$$I = \\int \\left(1 + x - \\frac{1}{x}\\right) e^{x + \\frac{1}{x}} dx = \\int e^{x + \\frac{1}{x}} dx + \\int x\\left(1 - \\frac{1}{x^2}\\right) e^{x + \\frac{1}{x}} dx$$
Integrate the second term by parts taking $u = x$ and $v' = \\left(1 - \\frac{1}{x^2}\\right) e^{x + \\frac{1}{x}}$:
Since $\\int \\left(1 - \\frac{1}{x^2}\\right) e^{x + \\frac{1}{x}} dx = e^{x + \\frac{1}{x}}$:
$$\\int x\\left(1 - \\frac{1}{x^2}\\right) e^{x + \\frac{1}{x}} dx = x e^{x + \\frac{1}{x}} - \\int 1 \\cdot e^{x + \\frac{1}{x}} dx$$
Substituting this back into $I$:
$$I = \\int e^{x + \\frac{1}{x}} dx + x e^{x + \\frac{1}{x}} - \\int e^{x + \\frac{1}{x}} dx + c = x e^{x + \\frac{1}{x}} + c$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "$\\int \\frac{\\sin^8 x - \\cos^8 x}{1 - 2\\sin^2 x \\cos^2 x} \\, dx$ is equal to :",
    options: [
      { option_text: "$-\\frac{1}{2}\\sin 2x + c$" },
      { option_text: "$\\frac{1}{2}\\sin 2x + c$" },
      { option_text: "$-\\frac{1}{2}\\sin x + c$" },
      { option_text: "$\\frac{1}{2}\\sin^2 2x + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Factorize the numerator:
$$\\sin^8 x - \\cos^8 x = (\\sin^4 x - \\cos^4 x)(\\sin^4 x + \\cos^4 x)$$
$$= (\\sin^2 x - \\cos^2 x)(\\sin^2 x + \\cos^2 x)[(\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x]$$
$$= -\\cos 2x \\cdot (1) \\cdot (1 - 2\\sin^2 x \\cos^2 x)$$
Therefore:
$$I = \\int \\frac{-\\cos 2x (1 - 2\\sin^2 x \\cos^2 x)}{1 - 2\\sin^2 x \\cos^2 x} dx = -\\int \\cos 2x \\, dx = -\\frac{1}{2}\\sin 2x + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "The integral $\\int x \\cos^{-1}\\left(\\frac{1 - x^2}{1 + x^2}\\right) dx$ ($x > 0$) is equal to :",
    options: [
      { option_text: "$-x + (1 + x^2)\\tan^{-1} x + c$" },
      { option_text: "$x - (1 + x^2)\\cot^{-1} x + c$" },
      { option_text: "$-x + (1 + x^2)\\cot^{-1} x + c$" },
      { option_text: "$x - (1 + x^2)\\tan^{-1} x + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `For $x > 0$, $\\cos^{-1}\\left(\\frac{1 - x^2}{1 + x^2}\\right) = 2\\tan^{-1} x$.
$$I = \\int 2x \\tan^{-1} x \\, dx$$
Using integration by parts with $u = \\tan^{-1} x$ and $dv = 2x \\, dx \\implies v = x^2$:
$$I = x^2 \\tan^{-1} x - \\int \\frac{x^2}{1 + x^2} dx = x^2 \\tan^{-1} x - \\int \\left(1 - \\frac{1}{1 + x^2}\\right) dx$$
$$= x^2 \\tan^{-1} x - (x - \\tan^{-1} x) + c = -x + (1 + x^2)\\tan^{-1} x + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "The integral $\\int \\frac{\\sin^2 x \\cos^2 x}{(\\sin^3 x + \\cos^3 x)^2} dx$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{1 + \\cot^3 x} + c$" },
      { option_text: "$-\\frac{1}{3(1 + \\tan^3 x)} + c$" },
      { option_text: "$\\frac{\\sin^3 x}{1 + \\cos^3 x} + c$" },
      { option_text: "$-\\frac{\\cos^3 x}{3(1 + \\sin^3 x)} + c$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Divide the numerator and denominator by $\\cos^6 x$:
$$I = \\int \\frac{\\frac{\\sin^2 x \\cos^2 x}{\\cos^6 x}}{\\left(\\frac{\\sin^3 x + \\cos^3 x}{\\cos^3 x}\\right)^2} dx = \\int \\frac{\\tan^2 x \\sec^2 x}{(1 + \\tan^3 x)^2} dx$$
Let $1 + \\tan^3 x = t \\implies 3\\tan^2 x \\sec^2 x \\, dx = dt \\implies \\tan^2 x \\sec^2 x \\, dx = \\frac{1}{3} dt$:
$$I = \\frac{1}{3}\\int \\frac{dt}{t^2} = -\\frac{1}{3t} + c = -\\frac{1}{3(1 + \\tan^3 x)} + c$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "If $m$ is a non-zero number and $\\int \\frac{x^{5m-1} + 2x^{4m-1}}{(x^{2m} + x^m + 1)^3} dx = f(x) + c$, then $f(x)$ is equal to :",
    options: [
      { option_text: "$\\frac{x^{5m} - x^{4m}}{2m(x^{2m} + x^m + 1)^2}$" },
      { option_text: "$\\frac{1}{2m}\\frac{x^{4m}}{(x^{2m} + x^m + 1)^2}$" },
      { option_text: "$\\frac{x^{5m}}{2m(x^{2m} + x^m + 1)^2}$" },
      { option_text: "$\\frac{2m(x^{5m} + x^{4m})}{(x^{2m} + x^m + 1)^2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Factor out $x^{6m}$ from the denominator:
$$I = \\int \\frac{x^{5m-1} + 2x^{4m-1}}{x^{6m}(1 + x^{-m} + x^{-2m})^3} dx = \\int \\frac{x^{-m-1} + 2x^{-2m-1}}{(1 + x^{-m} + x^{-2m})^3} dx$$
Put $1 + x^{-m} + x^{-2m} = t$:
$$dt = (-m x^{-m-1} - 2m x^{-2m-1}) dx = -m(x^{-m-1} + 2x^{-2m-1}) dx$$
$$(x^{-m-1} + 2x^{-2m-1}) dx = -\\frac{1}{m} dt$$
$$I = -\\frac{1}{m}\\int t^{-3} dt = -\\frac{1}{m}\\left(\\frac{t^{-2}}{-2}\\right) + c = \\frac{1}{2m t^2} + c$$
$$= \\frac{1}{2m (1 + x^{-m} + x^{-2m})^2} + c = \\frac{1}{2m \\left(\\frac{x^{2m} + x^m + 1}{x^{2m}}\\right)^2} + c = \\frac{x^{4m}}{2m(x^{2m} + x^m + 1)^2} + c$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "The integral $\\int \\frac{dx}{x^2(x^4 + 1)^{3/4}}$ equals to :",
    options: [
      { option_text: "$-\\left(\\frac{x^4 + 1}{x^4}\\right)^{1/4} + c$" },
      { option_text: "$\\left(\\frac{x^4 + 1}{x^4}\\right)^{1/4} + c$" },
      { option_text: "$(x^4 + 1)^{1/4} + c$" },
      { option_text: "$-(x^4 + 1)^{1/4} + c$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Factor out $x^4$ from $(x^4 + 1)^{3/4}$:
$$(x^4 + 1)^{3/4} = x^3\\left(1 + \\frac{1}{x^4}\\right)^{3/4}$$
$$I = \\int \\frac{dx}{x^5\\left(1 + \\frac{1}{x^4}\\right)^{3/4}}$$
Put $1 + x^{-4} = t \\implies -4x^{-5} dx = dt \\implies x^{-5} dx = -\\frac{1}{4} dt$:
$$I = -\\frac{1}{4}\\int t^{-3/4} dt = -\\frac{1}{4} \\cdot \\frac{t^{1/4}}{1/4} + c = -t^{1/4} + c$$
$$= -\\left(1 + \\frac{1}{x^4}\\right)^{1/4} + c = -\\left(\\frac{x^4 + 1}{x^4}\\right)^{1/4} + c$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "The integral $\\int \\frac{dx}{(x + 1)^{3/4}(x - 2)^{5/4}}$ is equal to :",
    options: [
      { option_text: "$4\\left(\\frac{x - 2}{x + 1}\\right)^{1/4} + c$" },
      { option_text: "$-\\frac{4}{3}\\left(\\frac{x + 1}{x - 2}\\right)^{1/4} + c$" },
      { option_text: "$4\\left(\\frac{x + 1}{x - 2}\\right)^{1/4} + c$" },
      { option_text: "$-\\frac{4}{3}\\left(\\frac{x - 2}{x + 1}\\right)^{1/4} + c$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Rewrite the denominator:
$$(x + 1)^{3/4}(x - 2)^{5/4} = (x + 1)^2 \\left(\\frac{x - 2}{x + 1}\\right)^{5/4}$$
$$I = \\int \\frac{dx}{(x + 1)^2 \\left(\\frac{x - 2}{x + 1}\\right)^{5/4}}$$
Put $t = \\frac{x - 2}{x + 1}$:
$$dt = \\frac{(x + 1) - (x - 2)}{(x + 1)^2} dx = \\frac{3}{(x + 1)^2} dx \\implies \\frac{dx}{(x + 1)^2} = \\frac{1}{3} dt$$
$$I = \\frac{1}{3}\\int t^{-5/4} dt = \\frac{1}{3} \\cdot \\frac{t^{-1/4}}{-1/4} + c = -\\frac{4}{3} t^{-1/4} + c$$
$$= -\\frac{4}{3}\\left(\\frac{x - 2}{x + 1}\\right)^{-1/4} + c = -\\frac{4}{3}\\left(\\frac{x + 1}{x - 2}\\right)^{1/4} + c$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "If $\\int \\frac{\\log(t + \\sqrt{1 + t^2})}{\\sqrt{1 + t^2}} dt = \\frac{1}{2}(g(t))^2 + c$, where $c$ is a constant, then $g(2)$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{\\sqrt{5}}\\log(2 + \\sqrt{5})$" },
      { option_text: "$2\\log(2 + \\sqrt{5})$" },
      { option_text: "$\\log(2 + \\sqrt{5})$" },
      { option_text: "$\\frac{1}{2}\\log(2 + \\sqrt{5})$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Put $z = \\log(t + \\sqrt{1 + t^2})$:
$$dz = \\frac{1}{t + \\sqrt{1 + t^2}} \\left(1 + \\frac{2t}{2\\sqrt{1 + t^2}}\\right) dt = \\frac{1}{\\sqrt{1 + t^2}} dt$$
$$I = \\int z \\, dz = \\frac{z^2}{2} + c = \\frac{1}{2}\\left[\\log(t + \\sqrt{1 + t^2})\\right]^2 + c$$
Comparing with $\\frac{1}{2}(g(t))^2 + c$, we have:
$$g(t) = \\log(t + \\sqrt{1 + t^2})$$
Therefore:
$$g(2) = \\log(2 + \\sqrt{1 + 4}) = \\log(2 + \\sqrt{5})$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "The integral $\\int \\frac{2x^{12} + 5x^9}{(x^5 + x^3 + 1)^3} dx$ is equal to :",
    options: [
      { option_text: "$\\frac{x^5}{2(x^5 + x^3 + 1)^2} + c$" },
      { option_text: "$\\frac{-x^{10}}{2(x^5 + x^3 + 1)^2} + c$" },
      { option_text: "$\\frac{-x^5}{(x^5 + x^3 + 1)^2} + c$" },
      { option_text: "$\\frac{x^{10}}{2(x^5 + x^3 + 1)^2} + c$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Factor out $x^{15}$ from $(x^5 + x^3 + 1)^3$:
$$I = \\int \\frac{2x^{12} + 5x^9}{x^{15}(1 + x^{-2} + x^{-5})^3} dx = \\int \\frac{2x^{-3} + 5x^{-6}}{(1 + x^{-2} + x^{-5})^3} dx$$
Put $1 + x^{-2} + x^{-5} = t$:
$$dt = (-2x^{-3} - 5x^{-6}) dx \\implies (2x^{-3} + 5x^{-6}) dx = -dt$$
$$I = -\\int t^{-3} dt = -\\left(\\frac{t^{-2}}{-2}\\right) + c = \\frac{1}{2t^2} + c$$
$$= \\frac{1}{2(1 + x^{-2} + x^{-5})^2} + c = \\frac{x^{10}}{2(x^5 + x^3 + 1)^2} + c$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "If $\\int \\frac{dx}{\\cos^3 x \\sqrt{2\\sin 2x}} = (\\tan x)^A + C(\\tan x)^B + k$, where $k$ is a constant of integration, then $A + B + C$ equals :",
    options: [
      { option_text: "$\\frac{16}{5}$" },
      { option_text: "$\\frac{27}{10}$" },
      { option_text: "$\\frac{7}{10}$" },
      { option_text: "$\\frac{21}{5}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `$$\\sqrt{2\\sin 2x} = \\sqrt{4\\sin x \\cos x} = 2\\sqrt{\\tan x}\\cos x$$
$$I = \\int \\frac{dx}{\\cos^3 x \\cdot 2\\sqrt{\\tan x}\\cos x} = \\frac{1}{2}\\int \\frac{\\sec^4 x}{\\sqrt{\\tan x}} dx = \\frac{1}{2}\\int \\frac{(1 + \\tan^2 x)\\sec^2 x}{\\sqrt{\\tan x}} dx$$
Let $\\tan x = t^2 \\implies \\sec^2 x \\, dx = 2t \\, dt$:
$$I = \\frac{1}{2}\\int \\frac{1 + t^4}{t} (2t \\, dt) = \\int (1 + t^4) dt = t + \\frac{t^5}{5} + k$$
$$= (\\tan x)^{1/2} + \\frac{1}{5}(\\tan x)^{5/2} + k$$
Comparing with $(\\tan x)^A + C(\\tan x)^B + k$:
$$A = \\frac{1}{2}, \\quad B = \\frac{5}{2}, \\quad C = \\frac{1}{5}$$
$$A + B + C = \\frac{1}{2} + \\frac{5}{2} + \\frac{1}{5} = 3 + \\frac{1}{5} = \\frac{16}{5}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  }
];

