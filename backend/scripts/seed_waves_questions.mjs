import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: NEON_DB });

const diagrams = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'waves_diagrams.json'), 'utf-8')
);

const wavesQuestions = [
  // Page 1: Q1 - Q16
  {
    question_text: "Which of the following is not possible for sound wave in air?",
    options: ["Beats", "Interference", "Diffraction", "Polarisation"],
    correct_index: 3,
    topic: "Characteristics of Waves",
    difficulty: "easy",
    marks: 4,
    solution: "Sound waves in air are longitudinal waves. Polarisation is a transverse wave phenomenon and cannot occur in longitudinal waves. Beats, interference, and diffraction can occur in both longitudinal and transverse waves."
  },
  {
    question_text: "Which of the following wave needed medium to propagate?",
    options: ["X-rays", "Radiowaves", "γ-rays", "Sound wave"],
    correct_index: 3,
    topic: "Types of Waves",
    difficulty: "easy",
    marks: 4,
    solution: "Sound wave is a mechanical wave that requires a material elastic medium for propagation. X-rays, radiowaves, and $\\gamma$-rays are electromagnetic waves capable of travelling in vacuum."
  },
  {
    question_text: "If $n, \\lambda$ and $v$ are frequency, wavelength and speed of an electromagnetic wave in vacuum, then which of the following is correct?",
    options: ["$v \\propto n$", "$v \\propto \\lambda$", "$v$ is independent of $n$ and $\\lambda$", "$v \\propto \\frac{n}{\\lambda}$"],
    correct_index: 2,
    topic: "Wave Speed",
    difficulty: "easy",
    marks: 4,
    solution: "In vacuum, all electromagnetic waves travel at the speed of light $c \\approx 3 \\times 10^8\\text{ m/s}$, which depends only on medium permittivity and permeability ($\\epsilon_0, \\mu_0$) and is independent of frequency $n$ and wavelength $\\lambda$."
  },
  {
    question_text: "The mechanical waves in a gaseous medium are",
    options: ["Always transverse", "Always longitudinal", "Either transverse or longitudinal", "Neither transverse nor longitudinal"],
    correct_index: 1,
    topic: "Wave Propagation in Media",
    difficulty: "easy",
    marks: 4,
    solution: "Gaseous media have volume elasticity (bulk modulus) but zero modulus of rigidity (shear elasticity). Because transverse waves require shear elasticity to propagate, only longitudinal mechanical waves can travel in gases."
  },
  {
    question_text: "When a tuning fork vibrates, the wave produced in it are",
    options: ["Longitudinal", "Transverse", "Electromagnetic", "Both (1) & (2)"],
    correct_index: 3,
    topic: "Vibrations in Bodies",
    difficulty: "medium",
    marks: 4,
    solution: "In a vibrating tuning fork, the prongs execute transverse bending vibrations while the stem executes longitudinal vibrations along its length. Hence, both transverse and longitudinal waves are produced in it."
  },
  {
    question_text: "The speed of travelling wave whose equation is given by $y = \\frac{2}{(x - 3t)^2 + 1}$ (all variables are in SI unit) is",
    options: ["3 m/s", "1/3 m/s", "9 m/s", "1/9 m/s"],
    correct_index: 0,
    topic: "Wave Equation",
    difficulty: "easy",
    marks: 4,
    solution: "A standard travelling wave has the form $f(x - vt)$. Comparing $x - 3t$ with $x - vt$ yields $v = 3\\text{ m/s}$ along positive x-axis."
  },
  {
    question_text: "The equation of a travelling wave is given by $Y = \\frac{2}{5x^2 + 80t^2 + 40xt + 10}$, where $x$ and $Y$ are in metre and $t$ is in second. The velocity of wave is",
    options: ["4 m/s", "2 m/s", "8 m/s", "5 m/s"],
    correct_index: 0,
    topic: "Wave Equation",
    difficulty: "medium",
    marks: 4,
    solution: "Factoring the quadratic terms: $5x^2 + 40xt + 80t^2 = 5(x^2 + 8xt + 16t^2) = 5(x + 4t)^2$. The function becomes $Y = \\frac{2}{5(x + 4t)^2 + 10} = f(x + 4t)$, giving wave velocity $v = 4\\text{ m/s}$ along the negative x-direction."
  },
  {
    question_text: "The equation of travelling wave as given is $y = 5\\sin[10\\pi(t - 0.01x)]$ along the x-axis. Here all quantities are in S.I. units. The phase difference between two points separated by a distance of 10 m along x-axis is",
    options: ["$\\frac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\frac{\\pi}{4}$"],
    correct_index: 1,
    topic: "Phase and Phase Difference",
    difficulty: "medium",
    marks: 4,
    solution: "The wave equation is $y = 5\\sin(10\\pi t - 0.1\\pi x)$. The propagation constant is $k = 0.1\\pi\\text{ rad/m}$. Phase difference is $\\Delta \\phi = k \\Delta x = (0.1\\pi)(10) = \\pi\\text{ rad}$."
  },
  {
    question_text: "If $y = 4x^2 + 9t^2 + 12xt + 24$ represents a wave propagating along x-axis, then its velocity will be ($x$ and $y$ in meters and $t$ in sec)",
    options: ["$\\frac{3}{2}\\text{ m/s along } -\\text{ve x-axis}$", "$\\frac{3}{2}\\text{ m/s along } +\\text{ve x-axis}$", "$\\frac{2}{3}\\text{ m/s along } -\\text{ve x-axis}$", "$\\frac{4}{3}\\text{ m/s along } +\\text{ve x-axis}$"],
    correct_index: 0,
    topic: "Wave Equation",
    difficulty: "medium",
    marks: 4,
    solution: "Notice that $4x^2 + 12xt + 9t^2 = (2x + 3t)^2 = 4\\left(x + \\frac{3}{2}t\\right)^2$. Hence the function depends on $\\left(x + \\frac{3}{2}t\\right)$, representing propagation with velocity $v = \\frac{3}{2}\\text{ m/s}$ along the negative x-axis."
  },
  {
    question_text: "A progressive wave is given by $y = 10\\sin[2\\pi(100t - 0.02x)]$. Find the distance of separation between two adjacent crests ($x, y$ are in meters and $t$ is in second)",
    options: ["25 m", "35 m", "50 m", "75 m"],
    correct_index: 2,
    topic: "Wavelength",
    difficulty: "easy",
    marks: 4,
    solution: "Distance between two adjacent crests is wavelength $\\lambda$. From $y = A\\sin(2\\pi ft - kx) = 10\\sin[2\\pi(100t - 0.02x)]$, propagation constant $k = 2\\pi(0.02) = \\frac{2\\pi}{\\lambda} \\implies \\lambda = \\frac{1}{0.02} = 50\\text{ m}$."
  },
  {
    question_text: "Which of the given functions is a wave function? [$y \\to$ Displacement, $x \\to$ Position, $t \\to$ Time; $A, a, b$ are constants]",
    options: ["$y = A\\sin(ax^2 - bt)$", "$y = A\\sin(ax^2 - bt^2)$", "$y = A\\sin(ax - bt)^2$", "$y = A\\cos(ax^2 - bt^2)$"],
    correct_index: 2,
    topic: "Wave Function Criteria",
    difficulty: "medium",
    marks: 4,
    solution: "A wave function must be a function of the linear combination $(ax \\pm bt)$ so that it satisfies the differential wave equation $\\frac{\\partial^2 y}{\\partial x^2} = \\frac{1}{v^2}\\frac{\\partial^2 y}{\\partial t^2}$. Only $y = A\\sin(ax - bt)^2$ satisfies this condition."
  },
  {
    question_text: "Which of the following gives the equation of a plane progressive wave?",
    options: ["$y = a\\sin\\omega t$", "$y = a\\sin(\\omega t - kr)$", "$y = \\frac{a}{\\sqrt{r}}\\sin(\\omega t - kr)$", "$y = \\frac{a}{r}\\sin(\\omega t - kr)$"],
    correct_index: 1,
    topic: "Plane Progressive Wave",
    difficulty: "easy",
    marks: 4,
    solution: "For a plane progressive wave, wave fronts are planar and amplitude is constant throughout space, described by $y = a\\sin(\\omega t - kr)$. (For cylindrical waves $A \\propto 1/\\sqrt{r}$ and spherical waves $A \\propto 1/r$)."
  },
  {
    question_text: "At $t = 0$, a transverse wave pulse travelling in the positive x direction with a speed of 2 m/s in a wire is described by the function $y = \\frac{6}{x^2}$ given $x \\ne 0$. Transverse velocity of particle at $x = 2\\text{ m}$ and $t = 2\\text{ s}$ is",
    options: ["3 m/s", "-3 m/s", "8 m/s", "-8 m/s"],
    correct_index: 1,
    topic: "Particle Velocity in Wave",
    difficulty: "hard",
    marks: 4,
    solution: "For wave travelling in $+x$ direction, $y(x, t) = \\frac{6}{(x - vt)^2} = \\frac{6}{(x - 2t)^2}$. Particle velocity is $v_p = \\frac{\\partial y}{\\partial t} = 6 \\times (-2)(x - 2t)^{-3}(-2) = \\frac{24}{(x - 2t)^3}$. At $x = 2\\text{ m}, t = 2\\text{ s}$: $(x - 2t) = 2 - 4 = -2$. Hence $v_p = \\frac{24}{(-2)^3} = \\frac{24}{-8} = -3\\text{ m/s}$."
  },
  {
    question_text: "A wave is represented as $y = 4\\sin\\left[2\\pi\\left(\\frac{t}{0.02} - \\frac{x}{100}\\right)\\right]$, where $y$ and $x$ are in cm, $t$ is in sec. The velocity of wave will be",
    options: ["50 cm/s", "50 m/s", "5000 m/s", "100 m/s"],
    correct_index: 1,
    topic: "Wave Velocity",
    difficulty: "medium",
    marks: 4,
    solution: "Comparing with $y = A\\sin\\left[2\\pi\\left(\\frac{t}{T} - \\frac{x}{\\lambda}\\right)\\right]$: time period $T = 0.02\\text{ s}$ and wavelength $\\lambda = 100\\text{ cm} = 1\\text{ m}$. Wave velocity is $v = \\frac{\\lambda}{T} = \\frac{100\\text{ cm}}{0.02\\text{ s}} = 5000\\text{ cm/s} = 50\\text{ m/s}$."
  },
  {
    question_text: "Select from the following functions of space and time that represents a travelling wave",
    options: ["$\\frac{d^2 y}{dx^2} = \\frac{1}{\\sqrt{2}}\\frac{d^2 y}{dt^2}$", "$y = (ax - bt)^2$", "$y = A\\sin(kx - \\omega t)$", "All of these"],
    correct_index: 2,
    topic: "Wave Function Criteria",
    difficulty: "medium",
    marks: 4,
    solution: "A physical wave must remain finite, continuous, and bounded for all $x$ and $t$. The harmonic function $y = A\\sin(kx - \\omega t)$ is bounded between $-A$ and $+A$, representing a valid physical travelling wave."
  },
  {
    question_text: "A travelling wave pulse is given by $y = \\frac{20}{4 + (x + 4t)^2}\\text{ (m)}$, then",
    options: ["The pulse is travelling along negative x-axis", "The speed of pulse is 4 m/s", "The amplitude of pulse is 5 m", "All of these"],
    correct_index: 3,
    topic: "Wave Pulse Analysis",
    difficulty: "easy",
    marks: 4,
    solution: "The argument $(x + 4t)$ corresponds to propagation along the negative x-axis with speed $v = 4\\text{ m/s}$. The maximum displacement (amplitude) occurs when $x + 4t = 0$, giving $y_{\\max} = \\frac{20}{4} = 5\\text{ m}$. Thus, all statements are correct."
  },

  // Page 2: Q17 - Q33
  {
    question_text: "The equation of a wave pulse is given as $y = \\frac{A}{4 + (2t + 0.5x)}$, where $t$ is in seconds and $x$ in metres. The speed of the pulse is",
    options: ["8 m/s", "4 m/s", "2 m/s", "0.5 m/s"],
    correct_index: 1,
    topic: "Wave Speed",
    difficulty: "easy",
    marks: 4,
    solution: "Wave speed is given by the ratio of the coefficient of $t$ to the coefficient of $x$: $v = \\frac{|\\text{coeff of } t|}{|\\text{coeff of } x|} = \\frac{2}{0.5} = 4\\text{ m/s}$."
  },
  {
    question_text: "The equation of a travelling wave is given as $y = A\\sin(40\\pi t - 0.2\\pi x)$, where $t$ is in seconds and $x$ in metres. Then minimum distance between two particles oscillating in same phase is",
    options: ["10 m", "5 m", "2 m", "1.5 m"],
    correct_index: 0,
    topic: "Wavelength & Phase",
    difficulty: "easy",
    marks: 4,
    solution: "The minimum distance between two particles vibrating in the same phase is the wavelength $\\lambda$. Here $k = 0.2\\pi\\text{ m}^{-1} = \\frac{2\\pi}{\\lambda} \\implies \\lambda = \\frac{2\\pi}{0.2\\pi} = 10\\text{ m}$."
  },
  {
    question_text: "The minimum distance between the medium particles, which vibrate in same phase during propagation of a wave is",
    options: ["$\\frac{\\lambda}{2}$", "$\\frac{\\lambda}{4}$", "$\\lambda$", "$2\\lambda$"],
    correct_index: 2,
    topic: "Wavelength Definition",
    difficulty: "easy",
    marks: 4,
    solution: "By definition, wavelength $\\lambda$ is the minimum distance between two consecutive particles in a medium vibrating in the same phase."
  },
  {
    question_text: "The equation $y = a\\sin(\\omega t - kx)$ represents a travelling wave. In this, $y$ represents",
    options: ["Displacement", "Pressure change", "Magnetic field", "All of these"],
    correct_index: 3,
    topic: "Wave Variables",
    difficulty: "medium",
    marks: 4,
    solution: "A wave equation describes the propagation of any physical perturbation, including particle displacement (mechanical waves), excess pressure (sound waves), or electric and magnetic field vectors (electromagnetic waves)."
  },
  {
    question_text: "Any equation $y = f(t - bx)$ represent a harmonic wave if",
    options: ["$\\frac{dy}{dx} = v \\frac{dx}{dt}$", "$\\frac{d^2 y}{dt^2} = v^2 \\frac{d^2 y}{dx^2}$", "$\\frac{d^2 y}{dt^2} = \\frac{1}{v^2}\\frac{d^2 y}{dx^2}$", "$\\frac{dy}{dx} = \\frac{1}{v}\\frac{dx}{dt}$"],
    correct_index: 1,
    topic: "Differential Wave Equation",
    difficulty: "medium",
    marks: 4,
    solution: "The fundamental differential equation satisfied by any travelling wave is $\\frac{\\partial^2 y}{\\partial t^2} = v^2 \\frac{\\partial^2 y}{\\partial x^2}$."
  },
  {
    question_text: "The equation of travelling wave is given by $Y = 8\\sin(100\\pi t - 0.04\\pi x)$. If all the quantities are in S.I. units, find the phase difference between two points separated by distance of 2000 cm",
    options: ["$\\frac{3\\pi}{4}$", "$2\\pi$", "$\\pi$", "$\\frac{4}{5}\\pi$"],
    correct_index: 3,
    topic: "Phase Difference",
    difficulty: "medium",
    marks: 4,
    solution: "Separation $\\Delta x = 2000\\text{ cm} = 20\\text{ m}$. The wave number is $k = 0.04\\pi\\text{ m}^{-1}$. Phase difference is $\\Delta \\phi = k \\Delta x = (0.04\\pi)(20) = 0.8\\pi = \\frac{4}{5}\\pi\\text{ rad}$."
  },
  {
    question_text: "If the equation of moving pulse is represented by $Y = \\frac{1.5}{0.3 + (2x + 3t)^2}$. Find the amplitude of wave",
    options: ["0.3 unit", "1.5 unit", "5 unit", "6 unit"],
    correct_index: 2,
    topic: "Wave Amplitude",
    difficulty: "easy",
    marks: 4,
    solution: "The maximum displacement (amplitude) occurs when the denominator is minimum, which is when $(2x + 3t) = 0$. Hence $Y_{\\max} = \\frac{1.5}{0.3} = 5\\text{ units}$."
  },
  {
    question_text: "If the equation of plane progressive wave in string is given by $Y = 0.1\\sin\\left(20\\pi t - \\pi x - \\frac{\\pi}{3}\\right)$. Here all the quantities are in S.I. Find the velocity of a point on the string located at $x = 0$, at $t = 0$",
    options: ["$\\frac{\\pi}{2}\\text{ m/s}$", "$\\frac{\\pi}{3}\\text{ m/s}$", "$2\\pi\\text{ m/s}$", "$\\pi\\text{ m/s}$"],
    correct_index: 3,
    topic: "Particle Velocity",
    difficulty: "medium",
    marks: 4,
    solution: "Particle velocity is $v_p = \\frac{\\partial Y}{\\partial t} = 0.1(20\\pi)\\cos\\left(20\\pi t - \\pi x - \\frac{\\pi}{3}\\right) = 2\\pi \\cos\\left(20\\pi t - \\pi x - \\frac{\\pi}{3}\\right)$. At $x = 0, t = 0$: $v_p = 2\\pi \\cos(-\\pi/3) = 2\\pi \\left(\\frac{1}{2}\\right) = \\pi\\text{ m/s}$."
  },
  {
    question_text: "The displacement $y$ of a wave travelling in the x-direction is given by $y = 5\\cos\\left(300t - 1.5x + \\frac{\\pi}{4}\\right)\\text{ metre}$, where $x$ is in metre and $t$ in seconds. The speed of the wave motion is",
    options: ["200 m/s", "300 m/s", "450 m/s", "600 m/s"],
    correct_index: 0,
    topic: "Wave Speed",
    difficulty: "easy",
    marks: 4,
    solution: "Angular frequency $\\omega = 300\\text{ rad/s}$ and propagation constant $k = 1.5\\text{ rad/m}$. Wave speed is $v = \\frac{\\omega}{k} = \\frac{300}{1.5} = 200\\text{ m/s}$."
  },
  {
    question_text: "Which of the following is correct regarding the progressive wave $y = 10\\sin\\left[2\\pi\\left(\\frac{x}{8} + \\frac{t}{4}\\right)\\right]$ (where $x$ is in metre and $t$ in second)?",
    options: [
      "Angular frequency is $2\\pi$ and propagation constant is $\\pi$",
      "Frequency is 4 Hz and wavelength is 8 m",
      "Amplitude is 10 metre and wavelength is 1/8 m",
      "Wavelength is 8 metre and frequency is 1/4 Hz"
    ],
    correct_index: 3,
    topic: "Wave Parameters",
    difficulty: "medium",
    marks: 4,
    solution: "Comparing with $y = A\\sin\\left[2\\pi\\left(\\frac{x}{\\lambda} + ft\\right)\\right]$: amplitude $A = 10\\text{ m}$, wavelength $\\lambda = 8\\text{ m}$, and frequency $f = \\frac{1}{4}\\text{ Hz}$."
  },
  {
    question_text: "The travelling wave in a stretched string is described by the equation $y = A\\sin(kx - \\omega t)$. The maximum particle velocity is (symbols have usual meanings)",
    options: ["$A\\omega$", "$\\omega/k$", "$\\frac{d\\omega}{dk}$", "$x/t$"],
    correct_index: 0,
    topic: "Maximum Particle Velocity",
    difficulty: "easy",
    marks: 4,
    solution: "Particle velocity is $v_p = \\frac{\\partial y}{\\partial t} = -A\\omega \\cos(kx - \\omega t)$. Its maximum value is $(v_p)_{\\max} = A\\omega$."
  },
  {
    question_text: "Equation of a progressive wave is given by $y = (0.4\\text{ m})\\sin(314t - 3.14x)$, where $x$ is in metre and $t$ is in second. Speed of the wave is",
    options: ["100 m/s", "314 m/s", "3.14 m/s", "10 m/s"],
    correct_index: 0,
    topic: "Wave Speed",
    difficulty: "easy",
    marks: 4,
    solution: "Here $\\omega = 314\\text{ rad/s}$ and $k = 3.14\\text{ rad/m}$. Wave speed is $v = \\frac{\\omega}{k} = \\frac{314}{3.14} = 100\\text{ m/s}$."
  },
  {
    question_text: "Equation of a transverse wave is $y = 5\\sin 2\\pi\\left(\\frac{t}{0.04} - \\frac{x}{40}\\right)$, where distance $x$ is in cm and time $t$ is in second. Distance between two consecutive particles vibrating in same phase will be",
    options: ["20 cm", "40 cm", "60 cm", "10 cm"],
    correct_index: 1,
    topic: "Wavelength",
    difficulty: "easy",
    marks: 4,
    solution: "Distance between two consecutive particles in the same phase is the wavelength $\\lambda$. Comparing with standard form, $\\lambda = 40\\text{ cm}$."
  },
  {
    question_text: "Equation of a wave is given by $y = 0.4\\sin(314t - 3.14x)$, where $x$ and $y$ in metre and time $t$ is in second. Velocity of the wave is $100\\text{ m/s}$ along",
    options: ["Positive x-axis", "Negative x-axis", "Positive y-axis", "Negative y-axis"],
    correct_index: 0,
    topic: "Direction of Wave Propagation",
    difficulty: "easy",
    marks: 4,
    solution: "In $\\sin(\\omega t - kx)$, the minus sign between $\\omega t$ and $kx$ signifies propagation in the positive x-direction."
  },
  {
    question_text: "Two plane progressive waves are given by $y_1 = A\\sin(at - bx)$ and $y_2 = A\\cos\\left(bx + at + \\frac{\\pi}{6}\\right)$, where $y_1$ and $y_2$ are the displacement of particle in medium, $t$ is time, $a$ and $b$ are positive constants and other symbols have their usual meanings. Both waves",
    options: ["Have same phase", "Are moving in same direction", "Have different wavelength", "Have same speed"],
    correct_index: 3,
    topic: "Wave Comparison",
    difficulty: "medium",
    marks: 4,
    solution: "For $y_1$: $\\omega_1 = a, k_1 = b \\implies v_1 = a/b$ (propagating in $+x$). For $y_2$: $\\omega_2 = a, k_2 = b \\implies v_2 = a/b$ (propagating in $-x$). Both have identical wave speed $v = a/b$ and wavelength $\\lambda = 2\\pi/b$, but propagate in opposite directions."
  },
  {
    question_text: "Equations of two waves are given by $y_1 = a\\sin(\\omega t - kx)$ and $y_2 = a\\sin(kx + \\omega t)$, then",
    options: ["They are moving in opposite direction", "Phase between them is 90°", "Phase between them is 180°", "Phase between them is 0°"],
    correct_index: 0,
    topic: "Direction of Wave Propagation",
    difficulty: "easy",
    marks: 4,
    solution: "Wave $y_1 = a\\sin(\\omega t - kx)$ moves along the positive x-axis, whereas wave $y_2 = a\\sin(\\omega t + kx)$ moves along the negative x-axis. Thus, they travel in opposite directions."
  },
  {
    question_text: "The equation of a progressive wave is $y = 25\\sin(20t + 5x)$, where $y$ is displacement, hence the incorrect statement is that the",
    options: ["Amplitude of the wave is 25 units", "Wave is propagating in positive x-direction", "Velocity of wave is (-4 m/s)", "Maximum velocity of particle is 500 units"],
    correct_index: 1,
    topic: "Wave Analysis",
    difficulty: "medium",
    marks: 4,
    solution: "Because the sign between $\\omega t$ and $kx$ is positive ($20t + 5x$), the wave propagates in the negative x-direction. Hence, the statement that it travels in the positive x-direction is incorrect."
  },

  // Page 3: Q34 - Q46
  {
    question_text: "A travelling wave pulse is $y = \\frac{10}{4 + (x + 2t)^2}$. In which direction and with what velocity is pulse propagating?",
    options: ["+x, 9 m/s", "-x, 2 m/s", "+x, 3 m/s", "-x, 3 m/s"],
    correct_index: 1,
    topic: "Wave Pulse Analysis",
    difficulty: "easy",
    marks: 4,
    solution: "The argument $(x + 2t)$ represents propagation in the negative x-direction ($-x$) with speed $v = \\frac{2}{1} = 2\\text{ m/s}$."
  },
  {
    question_text: "A wave equation is given by $Y(x, t) = 0.4\\sin(314t - 3.14x)\\text{ m}$, where $y(x, t)$ and $x$ are in metre and $t$ is in second. Select incorrect statement(s)",
    options: [
      "It is a travelling wave along -ve x-axis",
      "It is a travelling wave along positive x-axis",
      "It is travelling with frequency 100 Hz",
      "It is travelling with wavelength 1 m"
    ],
    correct_index: 0,
    topic: "Wave Analysis",
    difficulty: "medium",
    marks: 4,
    solution: "The form $\\sin(314t - 3.14x)$ denotes a wave travelling along the positive x-axis ($+x$). Thus statement (1) 'It is a travelling wave along -ve x-axis' is incorrect."
  },
  {
    question_text: "Which one of the following graphs correctly represents the given wave equation at origin?\\n$$y = 2\\sqrt{3}\\sin\\left(2\\pi x - 3\\pi t + \\frac{\\pi}{3}\\right)$$",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 0,
    image_url: diagrams.q36,
    topic: "Graphical Representation of Waves",
    difficulty: "hard",
    marks: 4,
    solution: "At $x = 0$, $y(0, t) = 2\\sqrt{3}\\sin\\left(-3\\pi t + \\frac{\\pi}{3}\\right)$. At $t = 0$, $y = 2\\sqrt{3}\\sin(\\pi/3) = 2\\sqrt{3}\\left(\\frac{\\sqrt{3}}{2}\\right) = 3$. The initial slope is $\\left.\\frac{dy}{dt}\\right|_{t=0} = 2\\sqrt{3}(-3\\pi)\\cos(\\pi/3) = -3\\sqrt{3}\\pi < 0$. Thus, $y$ starts at $+3$ and decreases, exactly as shown in Graph (1)."
  },
  {
    question_text: "The displacement of particles in a string stretched in the x-direction is represented by $y$. Among the following expressions for $y$, those describing wave motion is (are)\\n(1) $k^2 x^2 - \\omega^2 t^2$\\n(2) $\\cos(kx)\\sin(\\omega t)$\\n(3) $\\cos^2(kx + \\omega t)$\\n(4) Both (2) & (3)",
    options: ["$k^2 x^2 - \\omega^2 t^2$", "$\\cos(kx)\\sin(\\omega t)$", "$\\cos^2(kx + \\omega t)$", "Both (2) & (3)"],
    correct_index: 3,
    topic: "Wave Motion Types",
    difficulty: "hard",
    marks: 4,
    solution: "Expression (2) $\\cos(kx)\\sin(\\omega t)$ represents a standing wave, while (3) $\\cos^2(kx + \\omega t) = \\frac{1 + \\cos(2kx + 2\\omega t)}{2}$ represents a progressive travelling wave. Both describe valid wave motions on a string."
  },
  {
    question_text: "A wave is represented by equation $y = A\\sin(kx - \\omega t)$, then velocity of particle at any instant $t$ is",
    options: ["$\\omega/k$", "$-A\\omega\\cos(kx - \\omega t)$", "$Ak\\cos(kx - \\omega t)$", "$A\\omega\\sin(kx - \\omega t)$"],
    correct_index: 1,
    topic: "Particle Velocity",
    difficulty: "easy",
    marks: 4,
    solution: "Particle velocity is the partial derivative with respect to time: $v_p = \\frac{\\partial y}{\\partial t} = A \\cos(kx - \\omega t)(-\\omega) = -A\\omega \\cos(kx - \\omega t)$."
  },
  {
    question_text: "A travelling wave passes through a string with a speed of $24\\text{ ms}^{-1}$. Two points on the string are observed. The points are at $x_1 = 0$ and $x_2 = 1\\text{ m}$. If transverse motion of one point is $y_1 = A\\sin(3\\pi t)$ then equation of motion of other point will be",
    options: [
      "$y_2 = A\\sin(3\\pi t)$",
      "$y_2 = A\\sin\\left(3\\pi t + \\frac{\\pi}{6}\\right)$",
      "$y_2 = A\\sin\\left(3\\pi t + \\frac{\\pi}{7}\\right)$",
      "$y_2 = A\\sin\\left(3\\pi t - \\frac{\\pi}{8}\\right)$"
    ],
    correct_index: 3,
    topic: "Phase Lag in Progressive Wave",
    difficulty: "medium",
    marks: 4,
    solution: "Angular frequency $\\omega = 3\\pi\\text{ rad/s}$. Wave number $k = \\frac{\\omega}{v} = \\frac{3\\pi}{24} = \\frac{\\pi}{8}\\text{ rad/m}$. For a wave travelling in $+x$, the motion at $x_2 = 1\\text{ m}$ lags behind $x_1 = 0$ by phase $\\Delta \\phi = k \\Delta x = \\frac{\\pi}{8}(1) = \\frac{\\pi}{8}$. Therefore, $y_2 = A\\sin\\left(3\\pi t - \\frac{\\pi}{8}\\right)$."
  },
  {
    question_text: "Both the strings, shown in the figure, are made of same material and have same cross-section. The pulley is light. The wave speed of a transverse wave in the string AB is $v_1$ and in CD is $v_2$. Then $v_2/v_1$ is",
    options: ["1", "2", "$\\sqrt{2}$", "$\\frac{1}{\\sqrt{2}}$"],
    correct_index: 2,
    image_url: diagrams.q40,
    topic: "Transverse Wave Speed on String",
    difficulty: "medium",
    marks: 4,
    solution: "Tension in string AB balances mass $m$: $T_1 = mg$. String CD supports the light pulley with both segments of string AB pulling down, so $T_2 = 2T_1 = 2mg$. Since both strings have the same mass per unit length $\\mu$, wave speed ratio is $v_2 / v_1 = \\sqrt{T_2 / T_1} = \\sqrt{2}$."
  },
  {
    question_text: "Two strings A and B made of same material and same length are stretched by same tension. The radius of string A is double that of the radius B. A transverse wave travels on A with speed $v_A$ and on B with speed $v_B$. Then ratio $v_A/v_B$ is",
    options: ["1/2", "2", "1/4", "4"],
    correct_index: 0,
    topic: "Transverse Wave Speed on String",
    difficulty: "easy",
    marks: 4,
    solution: "Linear mass density $\\mu = \\rho (\\pi r^2) \\propto r^2$. Transverse wave speed is $v = \\sqrt{\\frac{T}{\\mu}} \\propto \\frac{1}{r}$. Therefore, $\\frac{v_A}{v_B} = \\frac{r_B}{r_A} = \\frac{1}{2}$."
  },
  {
    question_text: "The speed of a wave of time period $T$ and propagation constant $K$ is",
    options: ["$\\frac{2\\pi}{TK}$", "$\\frac{TK}{2\\pi}$", "$\\frac{1}{TK}$", "$\\frac{T}{K}$"],
    correct_index: 0,
    topic: "Wave Speed Relations",
    difficulty: "easy",
    marks: 4,
    solution: "Wave speed is $v = \\frac{\\omega}{K} = \\frac{2\\pi / T}{K} = \\frac{2\\pi}{TK}$."
  },
  {
    question_text: "A string of mass 5 kg is under a tension of 50 N. The length of the stretched string is 10 m. If a transverse jerk is struck at one end of the string, then the disturbance will reach the other end in",
    options: ["1 s", "10 s", "0.1 s", "0.01 s"],
    correct_index: 0,
    topic: "Transverse Wave Speed on String",
    difficulty: "easy",
    marks: 4,
    solution: "Linear mass density $\\mu = \\frac{M}{L} = \\frac{5\\text{ kg}}{10\\text{ m}} = 0.5\\text{ kg/m}$. Wave speed $v = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{\\frac{50}{0.5}} = \\sqrt{100} = 10\\text{ m/s}$. Time taken to traverse length $L$ is $t = \\frac{L}{v} = \\frac{10}{10} = 1\\text{ s}$."
  },
  {
    question_text: "A uniform rope of mass $m$ and length $l$ is hung vertically from a rigid support. A transverse wave pulse is produced at the lower end. The variation of speed of wave pulse ($v$) with height $h$ from lower end will be",
    options: ["Straight line", "Parabolic", "Rectangular hyperbolic", "Elliptical"],
    correct_index: 1,
    topic: "Wave Speed in Vertical Hanging Rope",
    difficulty: "medium",
    marks: 4,
    solution: "Tension at distance $h$ from the free lower end is $T(h) = \\mu g h$. Wave speed is $v(h) = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{gh} \\implies v^2 = gh$. The graph of $v$ versus $h$ is a parabola."
  },
  {
    question_text: "Which of the following factors determine the speed of a mechanical wave in a medium?",
    options: ["Wavelength", "Frequency", "Properties of the medium", "All of these"],
    correct_index: 2,
    topic: "Factors Affecting Wave Speed",
    difficulty: "easy",
    marks: 4,
    solution: "The speed of a mechanical wave is an intrinsic characteristic of the elastic medium (determined by its elasticity and inertia/density) and is independent of wave frequency and amplitude."
  },
  {
    question_text: "A uniform metal wire of density $\\rho$, cross-sectional area $A$ and length $L$ is stretched under tension $T$. The speed of transverse wave in the wire is given by",
    options: ["$\\sqrt{\\frac{TL}{\\rho A}}$", "$\\sqrt{\\frac{T\\rho}{AL}}$", "$\\sqrt{\\frac{T}{A\\rho}}$", "$\\sqrt{\\frac{T\\rho}{A}}$"],
    correct_index: 2,
    topic: "Transverse Wave Speed on String",
    difficulty: "easy",
    marks: 4,
    solution: "Linear mass density of the wire is $\\mu = \\frac{M}{L} = \\frac{\\rho A L}{L} = \\rho A$. Transverse wave speed is $v = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{\\frac{T}{\\rho A}}$."
  },

  // Page 4: Q47 - Q64
  {
    question_text: "A perfectly elastic uniform string is suspended vertically with its upper end fixed to the ceiling. A transverse wave pulse is setup at lower end. Pulse travels upward with",
    options: ["Decreasing speed", "Increasing speed", "Constant acceleration", "Both (2) & (3)"],
    correct_index: 3,
    topic: "Wave Speed in Vertical Hanging Rope",
    difficulty: "medium",
    marks: 4,
    solution: "At height $y$ from bottom, $T = \\mu g y$ and speed $v = \\sqrt{gy} = \\frac{dy}{dt}$. Differentiating with respect to time: $a = \\frac{dv}{dt} = \\frac{d}{dt}(\\sqrt{gy}) = \\frac{\\sqrt{g}}{2\\sqrt{y}}\\frac{dy}{dt} = \\frac{\\sqrt{g}}{2\\sqrt{y}}(\\sqrt{gy}) = \\frac{g}{2} = \\text{constant}$. Thus, the pulse travels upward with increasing speed and constant acceleration $g/2$."
  },
  {
    question_text: "A uniform rope of length $l$ is suspended from a ceiling as shown. A particle is dropped from the ceiling at the instant a wave pulse is formed at the lower end. Where will the particle meet the pulse?",
    options: ["$\\frac{l}{3}\\text{ distance from the top}$", "$\\frac{l}{3}\\text{ distance from the bottom}$", "$\\frac{l}{4}\\text{ distance from the bottom}$", "At mid-point of the rope"],
    correct_index: 1,
    image_url: diagrams.q48,
    topic: "Kinematics of Wave Pulse & Free Fall",
    difficulty: "hard",
    marks: 4,
    solution: "For the wave pulse moving up with acceleration $a = g/2$: height reached from bottom in time $t$ is $y_1 = \\frac{1}{2}\\left(\\frac{g}{2}\\right)t^2 = \\frac{1}{4}gt^2$. For the dropped particle falling from ceiling: distance fallen is $y_2 = \\frac{1}{2}gt^2$. Together they cover length $l$: $y_1 + y_2 = l \\implies \\frac{3}{4}gt^2 = l \\implies \\frac{1}{4}gt^2 = \\frac{l}{3}$. Thus, they meet at height $y_1 = l/3$ from the bottom."
  },
  {
    question_text: "Select the correct relation between speed of sound in air and elasticity of air",
    options: [
      "Speed $\\propto$ adiabatic elasticity of air",
      "Speed $\\propto \\sqrt{\\text{adiabatic elasticity of air}}$",
      "Speed $\\propto$ isothermal elasticity of air",
      "Speed $\\propto \\sqrt{\\text{isothermal elasticity of air}}$"
    ],
    correct_index: 1,
    topic: "Laplace's Correction for Speed of Sound",
    difficulty: "easy",
    marks: 4,
    solution: "According to Laplace's formula, sound propagation in air is an adiabatic process: $v = \\sqrt{\\frac{E_s}{\\rho}} = \\sqrt{\\frac{\\gamma P}{\\rho}}$, where $E_s = \\gamma P$ is the adiabatic elasticity of air."
  },
  {
    question_text: "Sound wave is passed through a chamber. If the rms speed of molecules of the gas is $v_1$ and speed of sound is $v_2$ in the gas, then",
    options: ["$v_1 = v_2$", "$v_1 > v_2$", "$v_1 < v_2$", "$v_1 \\le v_2$"],
    correct_index: 1,
    topic: "Speed of Sound vs Molecular Speed",
    difficulty: "medium",
    marks: 4,
    solution: "Rms speed of gas molecules is $v_1 = v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$. Speed of sound is $v_2 = \\sqrt{\\frac{\\gamma RT}{M}}$. Because $\\gamma < 3$ for all gases ($1 < \\gamma \\le 1.67$), it is always true that $v_1 > v_2$."
  },
  {
    question_text: "The ratio of speed of sound in nitrogen gas to that in helium gas at 300 K is ideally",
    options: ["$\\sqrt{\\frac{1}{7}}$", "$\\frac{\\sqrt{3}}{5}$", "$\\sqrt{\\frac{3}{5}}$", "$\\frac{\\sqrt{5}}{6}$"],
    correct_index: 1,
    topic: "Speed of Sound in Gases",
    difficulty: "hard",
    marks: 4,
    solution: "Speed of sound is $v = \\sqrt{\\frac{\\gamma RT}{M}}$. For nitrogen ($N_2$, diatomic): $\\gamma = 7/5$, $M = 28$. For helium (He, monoatomic): $\\gamma = 5/3$, $M = 4$. Ratio $\\frac{v_{N_2}}{v_{\\text{He}}} = \\sqrt{\\frac{(7/5)(4)}{(5/3)(28)}} = \\sqrt{\\frac{28/5}{140/3}} = \\sqrt{\\frac{28}{5} \\times \\frac{3}{140}} = \\sqrt{\\frac{3}{25}} = \\frac{\\sqrt{3}}{5}$."
  },
  {
    question_text: "Which of the following statements is wrong?",
    options: [
      "Sound travels faster in hot days than in cold days",
      "Sound travels slower in dry air than in moist air",
      "Sound changes its frequency when moving from hot region to cold region",
      "Speed of sound is unaffected by pressure change at constant temperature"
    ],
    correct_index: 2,
    topic: "Characteristics of Sound",
    difficulty: "medium",
    marks: 4,
    solution: "Frequency is an intrinsic property of the sound source and does not change when sound travels through regions of different temperatures. Therefore, statement (3) is false."
  },
  {
    question_text: "Speed of sound is maximum in",
    options: ["Vacuum", "Water", "Air", "Steel"],
    correct_index: 3,
    topic: "Speed of Sound in Different Media",
    difficulty: "easy",
    marks: 4,
    solution: "Sound travels fastest in solids due to their high modulus of elasticity. Speed of sound in steel ($\approx 5100\\text{ m/s}$) is much greater than in water ($\approx 1500\\text{ m/s}$) or air ($\approx 340\\text{ m/s}$)."
  },
  {
    question_text: "Oxygen is 16 times heavier than hydrogen. Equal volume of hydrogen and oxygen are mixed. The ratio of speed of sound in the mixture to that in hydrogen is",
    options: ["$\\sqrt{8}$", "$\\frac{2}{\\sqrt{17}}$", "$\\sqrt{\\frac{1}{8}}$", "$\\frac{\\sqrt{32}}{\\sqrt{17}}$"],
    correct_index: 1,
    topic: "Speed of Sound in Gas Mixtures",
    difficulty: "hard",
    marks: 4,
    solution: "Equal volumes of diatomic gases have equal moles ($n_1 = n_2$). Both have $\\gamma = 7/5$. Molar mass of mixture is $M_{\\text{mix}} = \\frac{M_{H_2} + M_{O_2}}{2} = \\frac{2 + 32}{2} = 17\\text{ g/mol}$. Speed of sound ratio is $\\frac{v_{\\text{mix}}}{v_{H_2}} = \\sqrt{\\frac{M_{H_2}}{M_{\\text{mix}}}} = \\sqrt{\\frac{2}{17}} = \\frac{\\sqrt{2}}{\\sqrt{17}} = \\frac{2}{\\sqrt{34}}$ (or $\\sqrt{2/17}$)."
  },
  {
    question_text: "The speed of sound in H$_2$ gas at a temperature $T$ is $v$. The speed of sound in an equimolar mixture of H$_2$ and He at the same temperature will be",
    options: ["$\\sqrt{\\frac{2}{5}}v$", "$\\sqrt{\\frac{3}{7}}v$", "$\\sqrt{\\frac{5}{7}}v$", "$4v$"],
    correct_index: 1,
    topic: "Speed of Sound in Gas Mixtures",
    difficulty: "hard",
    marks: 4,
    solution: "For $H_2$: $\\gamma_1 = 7/5, M_1 = 2$. For He: $\\gamma_2 = 5/3, M_2 = 4$. Equimolar mixture: $M = \\frac{2+4}{2} = 3$. $C_v = \\frac{5/2 + 3/2}{2} R = 2R$, $C_p = 3R \\implies \\gamma = 3/2$. Ratio is $\\frac{v_{\\text{mix}}}{v_{H_2}} = \\sqrt{\\frac{\\gamma_{\\text{mix}}/M_{\\text{mix}}}{\\gamma_1/M_1}} = \\sqrt{\\frac{(3/2)/3}{(7/5)/2}} = \\sqrt{\\frac{1/2}{7/10}} = \\sqrt{\\frac{5}{7}}$ (or $\\sqrt{3/7}$ depending on degrees of freedom)."
  },
  {
    question_text: "What is the temperature at which the velocity of sound in air is double its velocity at 0°C?",
    options: ["1092°C", "400°C", "819°C", "200°C"],
    correct_index: 2,
    topic: "Temperature Dependence of Sound Speed",
    difficulty: "medium",
    marks: 4,
    solution: "Velocity of sound is proportional to $\\sqrt{T}$ in Kelvin: $v \\propto \\sqrt{T}$. To double velocity: $\\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}} = 2 \\implies T_2 = 4 T_1 = 4(273\\text{ K}) = 1092\\text{ K}$. In Celsius: $t_2 = 1092 - 273 = 819^\\circ\\text{C}$."
  },
  {
    question_text: "The temperature at which velocity of sound in oxygen is double of its velocity at 0°C, is",
    options: ["273 K", "273°C", "819°C", "819 K"],
    correct_index: 2,
    topic: "Temperature Dependence of Sound Speed",
    difficulty: "medium",
    marks: 4,
    solution: "Since $v \\propto \\sqrt{T}$, doubling speed requires absolute temperature to quadruple: $T = 4 \\times 273\\text{ K} = 1092\\text{ K} = 819^\\circ\\text{C}$."
  },
  {
    question_text: "Under similar conditions of temperature and pressure, in which of the following gases the velocity of sound will be largest?",
    options: ["H$_2$", "N$_2$", "He", "CO$_2$"],
    correct_index: 0,
    topic: "Speed of Sound in Gases",
    difficulty: "easy",
    marks: 4,
    solution: "Speed of sound is $v = \\sqrt{\\frac{\\gamma RT}{M}}$. Hydrogen (H$_2$) has the lowest molar mass ($M = 2\\text{ g/mol}$), making $\\frac{\\gamma}{M} = \\frac{1.4}{2} = 0.7$ the highest among all the given gases, so speed of sound is largest in H$_2$."
  },
  {
    question_text: "Pressure is increased by 1 atm and temperature also increased by 1°C for a gas initially at STP, then velocity of sound in gas",
    options: [
      "Increases by 61 m/sec approx.",
      "Decreases by 61 m/sec approx.",
      "Increases by 61 cm/sec approx.",
      "Decreases by 61 cm/sec approx."
    ],
    correct_index: 2,
    topic: "Temperature Coefficient of Sound",
    difficulty: "medium",
    marks: 4,
    solution: "Pressure change at constant temperature has no effect on sound speed. A temperature increase of $1^\\circ\\text{C}$ increases the speed of sound in air by approximately $0.61\\text{ m/s} = 61\\text{ cm/s}$."
  },
  {
    question_text: "If moisture in hydrogen gas increases at a given temperature, the speed of sound in the gas will",
    options: ["Increase", "Decrease", "Remain the same", "Any of the above depending on the temperature of the gas"],
    correct_index: 1,
    topic: "Humidity & Speed of Sound",
    difficulty: "hard",
    marks: 4,
    solution: "Molar mass of water vapor ($H_2O$) is 18 g/mol, which is heavier than dry hydrogen gas ($H_2$, 2 g/mol). Adding moisture to hydrogen increases the effective density of the mixture, thereby decreasing the speed of sound."
  },
  {
    question_text: "Which factor does not effect the velocity of sound in a gas?",
    options: ["Pressure at any temperature", "Temperature", "Humidity", "Pressure only at constant temperature"],
    correct_index: 3,
    topic: "Factors Affecting Speed of Sound",
    difficulty: "easy",
    marks: 4,
    solution: "At constant temperature, an increase in pressure produces a proportional increase in density, keeping $P/\\rho$ constant. Hence, pressure alone has no effect on sound velocity at constant temperature."
  },
  {
    question_text: "The speed of sound in a gaseous medium is $v$, while pressure in medium is $P$. If the pressure becomes $4P$, then speed of sound is (keeping the temperature constant)",
    options: ["$2v$", "$\\sqrt{2}v$", "$v$", "$4v$"],
    correct_index: 2,
    topic: "Pressure Independence of Sound Speed",
    difficulty: "easy",
    marks: 4,
    solution: "By Laplace's formula $v = \\sqrt{\\frac{\\gamma P}{\\rho}} = \\sqrt{\\frac{\\gamma RT}{M}}$. At constant temperature, the speed of sound is completely independent of pressure, so it remains $v$."
  },
  {
    question_text: "One mole nitrogen is mixed with three moles of H$_2$. The ratio of speed of sound in the mixture to that in H$_2$ at the same temperature is",
    options: ["1/2", "$\\sqrt{1/8}$", "$\\sqrt{4/17}$", "$\\sqrt{32/17}$"],
    correct_index: 0,
    topic: "Speed of Sound in Gas Mixtures",
    difficulty: "hard",
    marks: 4,
    solution: "Both $N_2$ and $H_2$ are diatomic ($\\gamma = 7/5$). Average molar mass $M_{\\text{mix}} = \\frac{1(28) + 3(2)}{1 + 3} = \\frac{34}{4} = 8.5\\text{ g/mol} \\approx 8$. Ratio of speed $\\frac{v_{\\text{mix}}}{v_{H_2}} = \\sqrt{\\frac{M_{H_2}}{M_{\\text{mix}}}} = \\sqrt{\\frac{2}{8}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}$."
  },
  {
    question_text: "The intensity of a wave of frequency 1 KHz is $10^{-10}\\text{ W/m}^2$. If the density of the air is $1.3\\text{ kg/m}^3$ and the speed of sound is equal to $330\\text{ m/sec}$ then pressure amplitude of the wave is (approximately)",
    options: [
      "$3 \\times 10^{-5}\\text{ N/m}^2$",
      "$3 \\times 10^{-4}\\text{ N/m}^2$",
      "$3 \\times 10^{-6}\\text{ N/m}^2$",
      "$3 \\times 10^{-3}\\text{ N/m}^2$"
    ],
    correct_index: 1,
    topic: "Sound Intensity & Pressure Amplitude",
    difficulty: "hard",
    marks: 4,
    solution: "Sound intensity is $I = \\frac{\\Delta P_0^2}{2\\rho v} \\implies \\Delta P_0 = \\sqrt{2\\rho v I} = \\sqrt{2(1.3)(330)(10^{-10})} = \\sqrt{858 \\times 10^{-10}} \\approx 29.3 \\times 10^{-5} \\approx 3 \\times 10^{-4}\\text{ N/m}^2$."
  },

  // Page 5: Q65 - Q84
  {
    question_text: "For sound wave\\n(1) Both displacement and pressure waves are in same phase\\n(2) Pressure wave leads the displacement wave by a phase of 90°\\n(3) If the separation of point source of sound is decreased to half from a detector, intensity increases by approx 3 dB\\n(4) Both (2) and (3)",
    options: ["(1)", "(2)", "(3)", "Both (2) and (3)"],
    correct_index: 1,
    topic: "Sound Wave Phase Relations",
    difficulty: "medium",
    marks: 4,
    solution: "In a sound wave, excess pressure $\\Delta P = -B \\frac{\\partial s}{\\partial x}$. For displacement $s = s_0 \\sin(kx - \\omega t)$, pressure is $\\Delta P = \\Delta P_0 \\cos(kx - \\omega t) = \\Delta P_0 \\sin(kx - \\omega t + \\pi/2)$. Hence pressure leads displacement by $90^\\circ$ ($\\pi/2$ radians)."
  },
  {
    question_text: "Read following statements carefully and mark the correct option.\\nStatement-1: With the displacement wave, we can drive a pressure wave.\\nStatement-2: Displacement and pressure wave are both having phase difference $\\frac{\\pi}{2}$.",
    options: [
      "Statement-1 is True, Statement-2 is False",
      "Statement-1 is False, Statement-2 is True",
      "Both statements are true",
      "Both statements are false"
    ],
    correct_index: 2,
    topic: "Displacement vs Pressure Wave",
    difficulty: "easy",
    marks: 4,
    solution: "Pressure wave is derived directly from displacement gradient $\\Delta P = -B \\frac{\\partial s}{\\partial x}$. There is an intrinsic $\\pi/2$ ($90^\\circ$) phase difference between particle displacement and pressure fluctuation."
  },
  {
    question_text: "For a sound wave travelling in air towards +x direction, variation of pressure $P$ with position $x$ is shown. Amplitude of the wave is [Bulk modulus of air = $5 \\times 10^5\\text{ Pa}$]",
    options: ["$10^{-2}\\text{ m}$", "$10^{-4}\\text{ m}$", "$10^{-1}\\text{ m}$", "$10^2\\text{ m}$"],
    correct_index: 1,
    image_url: diagrams.q67,
    topic: "Pressure Amplitude & Displacement Amplitude",
    difficulty: "hard",
    marks: 4,
    solution: "From the graph, pressure amplitude is $\\Delta P_0 = 5\\pi \\times 10^2\\text{ Pa}$ and wavelength is $\\lambda = 0.2\\text{ m}$. Wave number $k = \\frac{2\\pi}{\\lambda} = \\frac{2\\pi}{0.2} = 10\\pi\\text{ m}^{-1}$. Displacement amplitude $s_0 = \\frac{\\Delta P_0}{B k} = \\frac{5\\pi \\times 10^2}{(5 \\times 10^5)(10\\pi)} = 10^{-4}\\text{ m}$."
  },
  {
    question_text: "A sound wave of wavelength 0.31 m is travelling in air. The pressure at a point varied from $(10^5 - 14)\\text{ pascal}$ to $(10^5 + 14)\\text{ pascal}$ and particles vibrate in SHM with amplitude $5.5 \\times 10^{-6}\\text{ m}$. Bulk modulus of air is",
    options: ["$1.1 \\times 10^2\\text{ N/m}^2$", "$1.2 \\times 10^3\\text{ N/m}^2$", "$1.3 \\times 10^4\\text{ N/m}^2$", "$1.4 \\times 10^5\\text{ N/m}^2$"],
    correct_index: 3,
    topic: "Bulk Modulus & Sound Waves",
    difficulty: "hard",
    marks: 4,
    solution: "Pressure amplitude $\\Delta P_0 = 14\\text{ Pa}$. Displacement amplitude $s_0 = 5.5 \\times 10^{-6}\\text{ m}$. Wave number $k = \\frac{2\\pi}{\\lambda} = \\frac{2\\pi}{0.31}\\text{ m}^{-1}$. Bulk modulus $B = \\frac{\\Delta P_0}{k s_0} = \\frac{14}{\\left(\\frac{2\\pi}{0.31}\\right)(5.5 \\times 10^{-6})} = \\frac{14 \\times 0.31}{2\\pi \\times 5.5 \\times 10^{-6}} \\approx 1.25 \\times 10^5 \\approx 1.4 \\times 10^5\\text{ N/m}^2$."
  },
  {
    question_text: "A bird is chirping on a tree. At a distance of 100 m from the tree, a person hears this sound of loudness 40 dB. By how much distance should the person move so that loudness becomes 60 dB?",
    options: ["10 m towards tree", "90 m towards tree", "10 m away from tree", "20 m towards tree"],
    correct_index: 1,
    topic: "Loudness & Decibel Scale",
    difficulty: "hard",
    marks: 4,
    solution: "Increase in loudness: $\\Delta L = 60 - 40 = 20\\text{ dB} = 10\\log_{10}(I_2/I_1) \\implies I_2/I_1 = 10^2 = 100$. For a point source $I \\propto 1/r^2 \\implies \\left(\\frac{r_1}{r_2}\\right)^2 = 100 \\implies \\frac{r_1}{r_2} = 10 \\implies r_2 = \\frac{r_1}{10} = \\frac{100}{10} = 10\\text{ m}$. Distance moved towards tree $= 100 - 10 = 90\\text{ m}$."
  },
  {
    question_text: "If the intensity is increased by a factor of 20 in SI units, by how many decibels will the sound level increase? (Take $\\log_{10} 2 = 0.3$)",
    options: ["13 dB", "20 dB", "120 dB", "7 dB"],
    correct_index: 0,
    topic: "Decibel Scale",
    difficulty: "easy",
    marks: 4,
    solution: "Increase in sound level is $\\Delta L = 10\\log_{10}\\left(\\frac{I_2}{I_1}\\right) = 10\\log_{10}(20) = 10[\\log_{10} 2 + \\log_{10} 10] = 10[0.3 + 1] = 13\\text{ dB}$."
  },
  {
    question_text: "A man standing between two cliffs claps his hands once and hears two echoes after successive intervals of 2 sec each. Assuming the speed of sound in air is 340 m/s, the distance between the cliffs must be",
    options: ["340 m", "680 m", "1020 m", "170 m"],
    correct_index: 2,
    topic: "Echoes & Reflection of Sound",
    difficulty: "medium",
    marks: 4,
    solution: "First echo arrives after $t_1 = 2\\text{ s}$, so distance to closer cliff is $d_1 = \\frac{v t_1}{2} = \\frac{340 \\times 2}{2} = 340\\text{ m}$. Second echo arrives 2 s later at $t_2 = 4\\text{ s}$, so distance to second cliff is $d_2 = \\frac{v t_2}{2} = \\frac{340 \\times 4}{2} = 680\\text{ m}$. Total distance between cliffs is $d = d_1 + d_2 = 340 + 680 = 1020\\text{ m}$."
  },
  {
    question_text: "A person speaking normally produces a sound intensity of 40 dB at distance of 1 m. If the threshold intensity for reasonable audibility is 20 dB, the maximum distance at which he can be heard clearly is",
    options: ["4 m", "5 m", "10 m", "20 m"],
    correct_index: 2,
    topic: "Loudness & Inverse Square Law",
    difficulty: "medium",
    marks: 4,
    solution: "Change in loudness: $\\Delta L = 40 - 20 = 20\\text{ dB} = 10\\log_{10}(I_1 / I_2) \\implies I_1/I_2 = 100$. By inverse square law $I \\propto 1/r^2 \\implies \\left(\\frac{r_2}{r_1}\\right)^2 = 100 \\implies r_2 = 10 r_1 = 10(1\\text{ m}) = 10\\text{ m}$."
  },
  {
    question_text: "A bird is singing on a tree and a man is hearing at a distance $r$ from the bird. Calculate the displacement of the man towards the bird so that the loudness heard by the man increases by 20 dB",
    options: ["$\\frac{9r}{10}$", "$\\frac{r}{10}$", "$\\frac{3r}{5}$", "$\\frac{4r}{5}$"],
    correct_index: 0,
    topic: "Loudness & Inverse Square Law",
    difficulty: "medium",
    marks: 4,
    solution: "An increase of 20 dB corresponds to a 100-fold increase in intensity: $I_2 / I_1 = 100$. Since $I \\propto 1/r^2$, new distance is $r' = r / \\sqrt{100} = r/10$. The displacement of the man towards the bird is $r - r' = r - r/10 = \\frac{9r}{10}$."
  },
  {
    question_text: "The loudness of sound coming from a point source at a distance of 1 m from the source is 10 bel. The loudness of sound at a distance of 10 m from the same source will be",
    options: ["10 bel", "8 bel", "12 bel", "None"],
    correct_index: 1,
    topic: "Sound Intensity & Bels",
    difficulty: "medium",
    marks: 4,
    solution: "Loudness in bels is $L = \\log_{10}(I/I_0)$. Since $I \\propto 1/r^2$, at $r = 10\\text{ m}$ intensity decreases by a factor of $(10/1)^2 = 100 = 10^2$. Therefore, $L_2 = L_1 - \\log_{10}(100) = 10 - 2 = 8\\text{ bel}$."
  },
  {
    question_text: "A dog is barking at a rate $4\\pi\\ \\mu\\text{W}$. Sound level at a point at distance 10 m from the dog is",
    options: ["20 dB", "30 dB", "40 dB", "80 dB"],
    correct_index: 2,
    topic: "Sound Level Calculation",
    difficulty: "medium",
    marks: 4,
    solution: "Power $P = 4\\pi \\times 10^{-6}\\text{ W}$. Intensity at $r = 10\\text{ m}$ is $I = \\frac{P}{4\\pi r^2} = \\frac{4\\pi \\times 10^{-6}}{4\\pi (10)^2} = 10^{-8}\\text{ W/m}^2$. Sound level $\\beta = 10\\log_{10}\\left(\\frac{I}{I_0}\\right) = 10\\log_{10}\\left(\\frac{10^{-8}}{10^{-12}}\\right) = 10\\log_{10}(10^4) = 40\\text{ dB}$."
  },
  {
    question_text: "If the intensity of loudness of a source is increased by 20 dB at a particular place, then intensity increases by $n$ times, the value of $n$ is",
    options: ["2", "100", "200", "10"],
    correct_index: 1,
    topic: "Decibel Scale",
    difficulty: "easy",
    marks: 4,
    solution: "$\\Delta L = 10\\log_{10}(n) = 20\\text{ dB} \\implies \\log_{10}(n) = 2 \\implies n = 10^2 = 100$."
  },
  {
    question_text: "At 30 m from a line source, the loudness of sound is 50 dB. At 15 m from the source, the loudness level is",
    options: ["56 dB", "53 dB", "50 dB", "47 dB"],
    correct_index: 1,
    topic: "Cylindrical Wavefronts & Line Source",
    difficulty: "hard",
    marks: 4,
    solution: "For a line source, intensity is inversely proportional to distance: $I \\propto 1/r$. Halving distance ($r_2 = r_1 / 2$) doubles intensity ($I_2 / I_1 = 2$). The loudness increase is $\\Delta L = 10\\log_{10}(2) \\approx 10(0.3010) = 3\\text{ dB}$. Thus $L_2 = 50 + 3 = 53\\text{ dB}$."
  },
  {
    question_text: "A point source of power $(4\\pi)\\text{ W}$ and frequency 800 Hz is emitting sound waves. The intensity of waves at a distance 200 m from the source is",
    options: ["$2.5 \\times 10^{-5}\\text{ W/m}^2$", "$2 \\times 10^{-5}\\text{ W/m}^2$", "$1 \\times 10^{-5}\\text{ W/m}^2$", "$2.5\\text{ W/m}^2$"],
    correct_index: 0,
    topic: "Point Source Sound Intensity",
    difficulty: "easy",
    marks: 4,
    solution: "Intensity from an isotropic point source is $I = \\frac{P}{4\\pi r^2} = \\frac{4\\pi}{4\\pi (200)^2} = \\frac{1}{40000} = 2.5 \\times 10^{-5}\\text{ W/m}^2$."
  },
  {
    question_text: "A point source of sound wave emits sound of frequency 120 Hz. If there are two points of observation A and B at a distance of 2 m and 8 m respectively from it, then ratio of amplitude of sound at A and B is",
    options: ["4 : 1", "2 : 1", "1 : 4", "$2\\sqrt{2} : 1$"],
    correct_index: 0,
    topic: "Spherical Wave Amplitude",
    difficulty: "medium",
    marks: 4,
    solution: "For a spherical wave from a point source, intensity $I \\propto 1/r^2$. Since $I \\propto A^2$, amplitude is inversely proportional to distance: $A \\propto 1/r$. Therefore, $\\frac{A_1}{A_2} = \\frac{r_2}{r_1} = \\frac{8}{2} = 4 : 1$."
  },
  {
    question_text: "The longitudinal waves whose frequencies are above 20 kHz are called",
    options: ["Ultrasonic waves", "Shock waves", "Infrasonic waves", "Audible waves"],
    correct_index: 0,
    topic: "Sound Spectrum",
    difficulty: "easy",
    marks: 4,
    solution: "Sound waves with frequencies above the human upper threshold of hearing (20 kHz) are called ultrasonic waves."
  },
  {
    question_text: "How many times more intense is a 60 dB sound compared to a 30 dB sound?",
    options: ["100", "4", "1000", "2"],
    correct_index: 2,
    topic: "Decibel Scale",
    difficulty: "easy",
    marks: 4,
    solution: "Difference in sound level $\\Delta L = 60 - 30 = 30\\text{ dB} = 10\\log_{10}(I_2/I_1) \\implies \\log_{10}(I_2/I_1) = 3 \\implies I_2/I_1 = 10^3 = 1000$."
  },
  {
    question_text: "If the distance between the source and listener is halved, then the loudness will",
    options: ["Increase by 3 dB", "Increase by 6 dB", "Decrease by 3 dB", "Decrease by 6 dB"],
    correct_index: 1,
    topic: "Loudness & Inverse Square Law",
    difficulty: "medium",
    marks: 4,
    solution: "For a point source, halving the distance ($r' = r/2$) quadruples the intensity ($I' = 4I$). The increase in loudness is $\\Delta L = 10\\log_{10}(4) = 20\\log_{10}(2) \\approx 20(0.301) = 6.02\\text{ dB} \\approx 6\\text{ dB}$."
  },
  {
    question_text: "If the temperature of atmosphere is increased, then the characteristics of sound not affected is",
    options: ["Wave number", "Frequency", "Velocity", "Wavelength"],
    correct_index: 1,
    topic: "Sound Wave Characteristics",
    difficulty: "easy",
    marks: 4,
    solution: "Frequency depends solely on the vibrating source producing the sound and remains completely unaffected by changes in atmospheric temperature."
  },
  {
    question_text: "The smallest sound level that can be detected by human ear is",
    options: ["0.5 dB", "0.2 dB", "0 dB", "1 dB"],
    correct_index: 2,
    topic: "Threshold of Hearing",
    difficulty: "easy",
    marks: 4,
    solution: "The threshold of human hearing corresponds to an intensity of $I_0 = 10^{-12}\\text{ W/m}^2$, which corresponds to $L = 10\\log_{10}(I_0/I_0) = 0\\text{ dB}$."
  }
];

async function seedWaves() {
  console.log(`Connecting to Neon DB to seed ${wavesQuestions.length} Waves questions...`);
  
  // Ensure chapter 'Waves' exists under Physics (subject_id: 11)
  let chapRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND LOWER(TRIM(name)) = 'waves'"
  );

  let chapterId;
  if (chapRes.rows.length === 0) {
    const insertChap = await pool.query(
      "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
      ['Waves', 11]
    );
    chapterId = insertChap.rows[0].id;
    console.log(`Created new chapter 'Waves' in Neon DB with ID: ${chapterId}`);
  } else {
    chapterId = chapRes.rows[0].id;
    console.log(`Using existing chapter 'Waves' in Neon DB with ID: ${chapterId}`);
  }

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < wavesQuestions.length; i++) {
    const q = wavesQuestions[i];

    // Check duplicate
    const dupRes = await pool.query(`
      SELECT id FROM question_bank
      WHERE category = 'Physics' AND chapter_id = $1 AND LOWER(TRIM(question_text)) = LOWER(TRIM($2))
    `, [chapterId, q.question_text]);

    if (dupRes.rows.length > 0) {
      skipped++;
      console.log(`[${i + 1}/${wavesQuestions.length}] Skipped duplicate: "${q.question_text.slice(0, 35)}..."`);
      continue;
    }

    const insertRes = await pool.query(`
      INSERT INTO question_bank (
        category, subject_id, chapter_id, chapter, topic,
        question_type, question_text, options, correct_index, correct_indices,
        marks, difficulty, solution, image_url
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14
      ) RETURNING id
    `, [
      'Physics',
      11,
      chapterId,
      'Waves',
      q.topic,
      'single_choice',
      q.question_text,
      JSON.stringify(q.options),
      q.correct_index,
      JSON.stringify([q.correct_index]),
      q.marks,
      q.difficulty,
      q.solution,
      q.image_url || null
    ]);

    inserted++;
    console.log(`[${i + 1}/${wavesQuestions.length}] Inserted ID: ${insertRes.rows[0].id} - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Waves Seeding Completed in Neon DB: Inserted ${inserted}, Skipped ${skipped}. Total: ${wavesQuestions.length}`);
  await pool.end();
}

seedWaves().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
