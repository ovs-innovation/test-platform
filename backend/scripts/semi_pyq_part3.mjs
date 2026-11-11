import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'semi_diagram_urls.json'), 'utf8'));

export const semiPart3Questions = [
  {
    question_number: 91,
    question_text: "Barrier potential of a p-n junction diode does not depend on:",
    options: [
      "diode design",
      "temperature",
      "forward bias",
      "doping density"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "The built-in barrier potential of a p-n junction depends on temperature ($T$), doping concentrations of donor and acceptor atoms ($N_D, N_A$), and semiconductor material bandgap ($n_i$). It does not depend on the physical geometrical design or shape of the diode.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 92,
    question_text: "Following diagram performs the logic function of:",
    options: [
      "OR gate",
      "AND gate",
      "XOR gate",
      "NAND gate"
    ],
    correct_option: "B",
    image_url: urls.semi_q92_diagram || null,
    explanation: "In the diagram, a NOR gate with inputs $\\bar{A}$ and $\\bar{B}$ (each input inverted by a NOT gate) gives output:\n$$Y = \\overline{\\bar{A} + \\bar{B}}$$\nBy De Morgan's theorem:\n$$Y = \\overline{\\bar{A}} \\cdot \\overline{\\bar{B}} = A \\cdot B$$\nThis performs the function of an AND gate.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 93,
    question_text: "In a p-n junction:",
    options: [
      "high potential at n side and low potential at p side",
      "high potential at p side and low potential at n side",
      "p and n both are at same potential",
      "undetermined"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "At the p-n junction, electrons diffuse from the n-side to the p-side, leaving behind uncompensated positive donor ions on the n-side. Holes diffuse from the p-side to the n-side, leaving uncompensated negative acceptor ions on the p-side. Consequently, the n-side is at a higher potential and the p-side is at a lower potential.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 94,
    question_text: "The given truth table is for which logic gate?\nInputs: (1, 1 -> 0), (0, 1 -> 1), (1, 0 -> 1), (0, 0 -> 1)",
    options: [
      "NAND",
      "XOR",
      "NOR",
      "OR"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "For an AND gate, the outputs are: $1 \\cdot 1 = 1$, and $0$ otherwise. The given truth table gives $0$ when both inputs are $1$, and $1$ for all other inputs. This is the inverse of an AND gate, which is a NAND gate ($Y = \\overline{A \\cdot B}$).\n\nHence, the correct option is (A)."
  },
  {
    question_number: 95,
    question_text: "For the given circuit of p-n junction diode which is correct?",
    options: [
      "in forward bias the voltage across $R$ is $V$",
      "in reverse bias the voltage across $R$ is $V$",
      "in forward bias the voltage across $R$ is $2V$",
      "in reverse bias the voltage across $R$ is $2V$"
    ],
    correct_option: "A",
    image_url: urls.semi_q95_diagram || null,
    explanation: "In forward bias, an ideal p-n junction diode conducts with zero resistance (acts as a short circuit). Thus, the entire battery voltage $V$ drops across the series resistor $R$. In reverse bias, the diode acts as an open circuit ($I = 0$), so the voltage across $R$ is $0$.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 96,
    question_text: "The given truth table is for which logic gate?\nInputs: (1, 1 -> 0), (0, 1 -> 1), (1, 0 -> 1), (0, 0 -> 1)",
    options: [
      "NAND",
      "XOR",
      "NOR",
      "OR"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "The output is 0 only when both inputs $A$ and $B$ are 1, and 1 whenever at least one input is 0. This matches the Boolean function $Y = \\overline{A \\cdot B}$, which is a NAND gate.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 97,
    question_text: "The current in the circuit will be:",
    options: [
      "5/40 A",
      "5/50 A",
      "5/10 A",
      "5/20 A"
    ],
    correct_option: "B",
    image_url: urls.semi_q97_diagram || null,
    explanation: "Diode $D_1$ is connected in reverse bias because its n-side is towards the positive terminal of the $5\\text{ V}$ battery, so it does not conduct ($I_1 = 0$).\nDiode $D_2$ is forward biased and conducts with negligible resistance.\nTherefore, the current flows only through the outer branch containing resistors in series: $R_{\\text{eq}} = 20\\ \\Omega + 30\\ \\Omega = 50\\ \\Omega$.\nThe current supplied by the $5\\text{ V}$ battery is:\n$$I = \\frac{V}{R_{\\text{eq}}} = \\frac{5}{50}\\text{ A}$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 98,
    question_text: "In bcc structure of lattice constant $a$, the minimum distance between atoms is:",
    options: [
      "$\\frac{\\sqrt{3}}{2} a$",
      "$\\sqrt{2} a$",
      "$\\frac{a}{\\sqrt{2}}$",
      "$\\frac{a}{2}$"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "In a body-centered cubic (bcc) lattice, the nearest neighbors touch along the body diagonal of length $\\sqrt{3} a$. The distance between the center atom and a corner atom is half the body diagonal:\n$$d_{\\text{min}} = \\frac{\\sqrt{3} a}{2}$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 99,
    question_text: "From the following diode circuit, which diode is in forward biased condition?",
    options: [
      "p-side at 0 V, n-side at -2 V",
      "p-side at 0 V, n-side at 2 V",
      "p-side at -5 V, n-side at -2 V",
      "p-side at -5 V, n-side at 2 V"
    ],
    correct_option: "A",
    image_url: urls.semi_q99_diagram || null,
    explanation: "A diode is forward biased when the potential at the p-side ($V_p$) is higher than the potential at the n-side ($V_n$), i.e., $V_p > V_n$.\nIn option (A): $V_p = 0\\text{ V}$ and $V_n = -2\\text{ V}$. Since $0\\text{ V} > -2\\text{ V}$, the diode is forward biased.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 100,
    question_text: "The truth table given below represents:\nInputs: (0, 0 -> 0), (1, 0 -> 0), (0, 1 -> 0), (1, 1 -> 1)",
    options: [
      "AND gate",
      "NOR gate",
      "OR gate",
      "NAND gate"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "The output is 1 only when both inputs $A$ and $B$ are 1, and 0 for all other cases. This is the truth table of an AND gate ($Y = A \\cdot B$).\n\nHence, the correct option is (A)."
  },
  {
    question_number: 101,
    question_text: "Which of the following when added as an impurity into silicon produces n-type semiconductor?",
    options: [
      "P",
      "Al",
      "B",
      "Mg"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "To create an n-type semiconductor from pure silicon (Group 14), it must be doped with a pentavalent element from Group 15 such as Phosphorus (P), Arsenic (As), or Antimony (Sb). Trivalent elements like Al and B produce p-type semiconductors.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 102,
    question_text: "In a junction diode, the holes are due to:",
    options: [
      "protons",
      "extra electrons",
      "neutrons",
      "missing electrons"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "A hole in a semiconductor is an empty vacancy created in a covalent bond when an electron is displaced or excited away. It acts as an effective positive charge carrier due to the absence (missing) of an electron.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 103,
    question_text: "Depletion layer consists of:",
    options: [
      "electrons",
      "protons",
      "mobile charge carriers",
      "immobile ions"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "In the depletion region of a p-n junction, mobile charge carriers (electrons and holes) have diffused across the junction and recombined, leaving behind only uncompensated, fixed (immobile) donor ions on the n-side and acceptor ions on the p-side.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 104,
    question_text: "In forward bias the width of depletion layer in a p-n junction diode:",
    options: [
      "increases",
      "decreases",
      "remains constant",
      "first increases then decreases"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Under forward bias, the applied voltage opposes the built-in barrier potential. This pushes majority carriers towards the junction against the depletion field, thereby reducing the width of the depletion layer.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 105,
    question_text: "In p-type semiconductor, the major charge carriers are:",
    options: [
      "holes",
      "electrons",
      "protons",
      "neutrons"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "A p-type semiconductor is obtained by doping tetravalent silicon or germanium with trivalent atoms (such as B, Al, In, Ga). Each dopant atom creates an extra hole, making holes the majority charge carriers and electrons the minority carriers.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 106,
    question_text: "Sodium has body centred packing. If the distance between two nearest atoms is $3.7\\text{ \u00c5}$ then the lattice parameter is:",
    options: [
      "$3.3\\text{ \u00c5}$",
      "$3.9\\text{ \u00c5}$",
      "$4.3\\text{ \u00c5}$",
      "$4.8\\text{ \u00c5}$"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "In a body-centered cubic (bcc) structure, the nearest-neighbor distance $d$ is half the body diagonal:\n$$d = \\frac{\\sqrt{3}}{2} a$$\n$$\\implies a = \\frac{2d}{\\sqrt{3}} = \\frac{2 \\times 3.7\\text{ \u00c5}}{\\sqrt{3}} = \\frac{7.4}{1.732} \\approx 4.27\\text{ \u00c5} \\approx 4.3\\text{ \u00c5}$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 107,
    question_text: "The following circuit represents:",
    options: [
      "OR gate",
      "XOR gate",
      "AND gate",
      "NAND gate"
    ],
    correct_option: "B",
    image_url: urls.semi_q107_diagram || null,
    explanation: "The logic gate circuit implements $Y = A\\bar{B} + \\bar{A}B = A \\oplus B$, which is the exclusive-OR (XOR) gate function.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 108,
    question_text: "The cause of the potential barrier in a p-n diode is:",
    options: [
      "depletion of positive charges near the junction",
      "concentration of positive charges near the junction",
      "depletion of negative charges near the junction",
      "concentration of positive and negative charges near the junction"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Diffusion of electrons from n to p and holes from p to n leaves fixed positive donor ions on the n-side and fixed negative acceptor ions on the p-side of the junction. This spatial separation and concentration of positive and negative bound charges sets up the potential barrier across the junction.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 109,
    question_text: "A semi-conducting device is connected in series in a circuit with a battery and a resistance. A current is allowed to pass through the circuit. If the polarity of the battery is reversed, the current drops to almost zero. The device may be:",
    options: [
      "a p-n junction",
      "an intrinsic semiconductor",
      "a p-type semiconductor",
      "an n-type semiconductor"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "A p-n junction diode conducts heavily when forward biased (low resistance) and allows virtually negligible current to flow when reverse biased (very high resistance). In contrast, bulk intrinsic or doped semiconductors conduct equally well in both polarities.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 110,
    question_text: "Which of the following circuits correctly represents an OR gate?",
    options: [
      "Circuit (A)",
      "Circuit (B)",
      "Circuit (C)",
      "Circuit (D)"
    ],
    correct_option: "C",
    image_url: urls.semi_q110_diagram || null,
    explanation: "In a diode logic circuit, two diodes connected with their anodes as inputs and cathodes connected together to a load resistor pulled to ground perform the OR function ($Y = A + B$). When either diode anode is at high potential ($1$), it forward biases and pulls the output high ($1$).\n\nHence, the correct option is (C)."
  },
  {
    question_number: 111,
    question_text: "In an unbiased p-n junction diode:",
    options: [
      "p and n are at same potential",
      "p is at higher potential than n",
      "current flows from p to n",
      "p is at lower potential than n"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Due to the accumulation of uncompensated positive donor ions on the n-side and negative acceptor ions on the p-side near the junction, the n-side develops a positive potential while the p-side develops a negative potential. Therefore, the p-region is at a lower potential than the n-region.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 112,
    question_text: "The given circuit represents:",
    options: [
      "AND gate",
      "OR gate",
      "NAND gate",
      "NOR gate"
    ],
    correct_option: "C",
    image_url: urls.semi_q112_diagram || null,
    explanation: "The circuit shows an AND gate followed by a NOT gate (inverter) or a standard transistor NAND configuration, yielding $Y = \\overline{A \\cdot B}$, which is a NAND gate.\n\nHence, the correct option is (C)."
  },
  {
    question_number: 113,
    question_text: "An oscillator is nothing but an amplifier with:",
    options: [
      "negative feedback",
      "positive feedback",
      "large gain",
      "no feedback"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "An oscillator is an amplifier that generates sustained periodic AC output without any external input signal. It operates on the principle of positive feedback, where a fraction of the output voltage is fed back to the input in phase ($|A\\beta| = 1$, phase shift $0^\\circ$ or $360^\\circ$, Barkhausen criterion).\n\nHence, the correct option is (B)."
  },
  {
    question_number: 114,
    question_text: "The conductivity of a semiconductor increases with increase in temperature because:",
    options: [
      "both number density of carriers increases and relaxation time may decrease but effect of decrease in relaxation time is much less than increase in number density",
      "number density of carriers decreases",
      "relaxation time increases",
      "both number density of carriers and relaxation time decrease"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "Conductivity is given by $\\sigma = n e^2 \\tau / m$. In semiconductors, as temperature rises, thermal energy breaks covalent bonds, causing the carrier density $n$ to increase exponentially. Although lattice scattering decreases the relaxation time $\\tau$, the exponential increase in $n$ dominates overwhelmingly, resulting in a net increase in conductivity.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 115,
    question_text: "To obtain a p-type germanium semiconductor, it must be doped with:",
    options: [
      "phosphorus",
      "indium",
      "arsenic",
      "antimony"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Germanium is a Group 14 element. To obtain a p-type semiconductor, it must be doped with a trivalent Group 13 acceptor impurity such as Indium (In), Boron (B), or Aluminium (Al). Doping with Group 15 elements (P, As, Sb) produces an n-type semiconductor.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 116,
    question_text: "The given circuit diagram shows a transistor configuration with biasing. Which of the following is correct?",
    options: [
      "Common base npn transistor",
      "Common collector pnp transistor",
      "Common emitter npn transistor",
      "Common emitter pnp transistor"
    ],
    correct_option: "C",
    image_url: urls.semi_q116_diagram || null,
    explanation: "The emitter terminal is connected common to both the input (base) and output (collector) circuits, with the arrow on the emitter pointing outward (indicating an n-p-n transistor). Therefore, it is a common emitter npn transistor.\n\nHence, the correct option is (C)."
  },
  {
    question_number: 117,
    question_text: "When a p-n junction diode is reverse biased:",
    options: [
      "no current flows",
      "a very small current flows due to minority carriers",
      "a large current flows due to majority carriers",
      "potential barrier collapses"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "In reverse bias, the potential barrier prevents the flow of majority charge carriers. However, thermally generated minority carriers (electrons in p-side, holes in n-side) are swept across the junction by the electric field, giving rise to a tiny, nearly constant reverse saturation current ($I_0$).\n\nHence, the correct option is (B)."
  },
  {
    question_number: 118,
    question_text: "In the following figures, which one correctly represents the connections for forward biasing of a p-n junction diode?",
    options: [
      "Figure (A)",
      "Figure (B)",
      "Figure (C)",
      "Figure (D)"
    ],
    correct_option: "B",
    image_url: urls.semi_q118_diagram || null,
    explanation: "For forward biasing of a p-n junction diode, the positive terminal of the DC source must be connected to the p-type semiconductor and the negative terminal to the n-type semiconductor, which is depicted correctly in figure (B).\n\nHence, the correct option is (B)."
  },
  {
    question_number: 119,
    question_text: "The given truth table is for which logic gate?\nInputs: (0, 0 -> 1), (0, 1 -> 1), (1, 0 -> 1), (1, 1 -> 0)",
    options: [
      "NAND",
      "XOR",
      "NOR",
      "OR"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "The output is 0 only when both inputs $A = 1$ and $B = 1$, and 1 for all other input combinations. This is the truth table of a NAND gate ($Y = \\overline{A \\cdot B}$).\n\nHence, the correct option is (A)."
  },
  {
    question_number: 120,
    question_text: "A piece of copper and another of germanium are cooled from room temperature to $80\\text{ K}$, then:",
    options: [
      "resistance of each will increase",
      "resistance of copper will decrease while that of germanium will decrease",
      "the resistance of copper will increase while that of germanium will decrease",
      "the resistance of copper will decrease while that of germanium will increase"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Copper is a metallic conductor having a positive temperature coefficient of resistance; on cooling, lattice vibrations decrease, so its resistance decreases.\nGermanium is a semiconductor having a negative temperature coefficient of resistance; on cooling, thermal generation of charge carriers decreases, so its resistance increases.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 121,
    question_text: "The depletion layer in the p-n junction region is caused by:",
    options: [
      "drift of holes",
      "diffusion of charge carriers",
      "migration of impurity ions",
      "drift of electrons"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "When a p-n junction is formed, concentration differences cause electrons to diffuse from the n-side to the p-side and holes from the p-side to the n-side. Their recombination leaves behind unneutralized immobile ion cores, creating the depletion layer.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 122,
    question_text: "The following truth table corresponds to the logical gate:\nInputs: (0, 0 -> 0), (0, 1 -> 1), (1, 0 -> 1), (1, 1 -> 1)",
    options: [
      "NAND",
      "OR",
      "AND",
      "XOR"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "The output is 1 whenever either or both inputs are 1, and 0 only when both inputs are 0. This is the truth table of an OR gate ($Y = A + B$).\n\nHence, the correct option is (B)."
  },
  {
    question_number: 123,
    question_text: "When n-type semiconductor is heated:",
    options: [
      "number of electrons increases while that of holes decreases",
      "number of holes increases while that of electrons decreases",
      "number of electrons and holes remain same",
      "number of electrons and holes increases equally"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Heating breaks covalent bonds in the host crystal lattice. Each broken bond generates one free electron and one hole simultaneously. Thus, the thermal generation produces an equal increase in both electrons and holes ($\\Delta n_e = \\Delta n_h$).\n\nHence, the correct option is (D)."
  },
  {
    question_number: 124,
    question_text: "p-n junction is said to be forward biased, when:",
    options: [
      "the positive pole of the battery is joined to the p-semiconductor and negative pole to the n-semiconductor",
      "the positive pole of the battery is joined to the n-semiconductor and p-semiconductor",
      "the positive pole of the battery is connected to semiconductor and p-semiconductor",
      "mechanical force is applied in the forward direction"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "A p-n junction is in forward bias when the external battery has its positive terminal connected to the p-type region and its negative terminal connected to the n-type region.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 125,
    question_text: "At absolute zero, Si acts as:",
    options: [
      "non metal",
      "metal",
      "insulator",
      "none of these"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "At absolute zero temperature ($0\\text{ K}$), all valence electrons in silicon are firmly bound in covalent bonds. The conduction band is completely empty and no thermal energy is available to promote electrons across the energy gap. Therefore, silicon behaves as a perfect insulator.\n\nHence, the correct option is (C)."
  },
  {
    question_number: 126,
    question_text: "The figure shows the circuit symbol of a transistor. Select the correct statements given below:\n(A) The transistor has two segments of p-type semiconductor separated by a segment of n-type semiconductor.\n(B) The emitter is of moderate size and heavily doped.\n(C) The central segment is thin and lightly doped.\n(D) The emitter base junction is reverse biased in common emitter amplifier circuit.",
    options: [
      "(C) and (D)",
      "(A) and (D)",
      "(A) and (B)",
      "(B) and (C)"
    ],
    correct_option: "D",
    image_url: urls.semi_q126_diagram || null,
    explanation: "In any bipolar junction transistor:\n- The emitter is of moderate size and heavily doped (statement B is correct).\n- The base (central segment) is extremely thin and lightly doped (statement C is correct).\n- The arrow pointing outward represents an n-p-n transistor (not p-n-p, so statement A is incorrect).\n- For normal amplifier action, the emitter-base junction must be forward biased, not reverse biased (statement D is incorrect).\nTherefore, statements (B) and (C) are correct.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 127,
    question_text: "The collector current in a common base amplifier using n-p-n transistor is $24\\text{ mA}$. If $80\\%$ of the electrons released by the emitter is accepted by the collector, then the base current is numerically:",
    options: [
      "3 mA and entering the base",
      "6 mA and leaving the base",
      "3 mA and leaving the base",
      "6 mA and entering the base"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Given collector current $I_C = 24\\text{ mA}$, which is $80\\%$ of emitter current $I_E$:\n$$I_C = 0.80 \\, I_E \\implies I_E = \\frac{24\\text{ mA}}{0.80} = 30\\text{ mA}$$\nThe base current is:\n$$I_B = I_E - I_C = 30\\text{ mA} - 24\\text{ mA} = 6\\text{ mA}$$\nIn an n-p-n transistor, electrons leave the emitter and flow to the collector and base; conventional current leaves the emitter ($I_E$ outward) and enters the base ($I_B$ inward). Thus, the base current is $6\\text{ mA}$ entering the base.\n\nHence, the correct option is (D)."
  },
  {
    question_number: 128,
    question_text: "A n-p-n transistor is connected in common emitter configuration in which collector voltage drop across load resistance ($800\\ \\Omega$) connected to the collector circuit is $0.8\\text{ V}$. The collector current is:",
    options: [
      "0.2 mA",
      "2 mA",
      "0.1 mA",
      "1 mA"
    ],
    correct_option: "D",
    image_url: urls.semi_q128_diagram || null,
    explanation: "The voltage drop across the collector load resistor $R_L = 800\\ \\Omega$ is $V_L = 0.8\\text{ V}$.\nBy Ohm's law, the collector current is:\n$$I_C = \\frac{V_L}{R_L} = \\frac{0.8\\text{ V}}{800\\ \\Omega} = 10^{-3}\\text{ A} = 1\\text{ mA}$$\n\nHence, the correct option is (D)."
  },
  {
    question_number: 129,
    question_text: "For transistor action, which of the following statements is correct?",
    options: [
      "Base, emitter and collector regions should have same size.",
      "Both emitter junction as well as the collector junction are forward biased.",
      "The base region must be very thin and lightly doped.",
      "Base, emitter and collector regions should have same doping concentrations."
    ],
    correct_option: "C",
    image_url: null,
    explanation: "For proper transistor action, the base region must be extremely thin (a few micrometers) and lightly doped so that nearly all charge carriers ($>95\\%$) injected from the emitter can traverse across the base into the collector without recombining.\n\nHence, the correct option is (C)."
  },
  {
    question_number: 130,
    question_text: "In the circuit shown in the figure, the input voltage $V_i$ is $20\\text{ V}, V_{BE} = 0$ and $V_{CE} = 0$. The values of $I_B, I_C$ and $\\beta$ are given by:",
    options: [
      "$I_B = 40\\ \\mu\\text{A}, I_C = 10\\text{ mA}, \\beta = 250$",
      "$I_B = 25\\ \\mu\\text{A}, I_C = 5\\text{ mA}, \\beta = 200$",
      "$I_B = 20\\ \\mu\\text{A}, I_C = 5\\text{ mA}, \\beta = 250$",
      "$I_B = 40\\ \\mu\\text{A}, I_C = 5\\text{ mA}, \\beta = 125$"
    ],
    correct_option: "D",
    image_url: urls.semi_q130_diagram || null,
    explanation: "In the base circuit, with $V_i = 20\\text{ V}, R_B = 500\\text{ k}\\Omega$, and $V_{BE} = 0$:\n$$I_B = \\frac{V_i - V_{BE}}{R_B} = \\frac{20\\text{ V}}{500 \\times 10^3\\ \\Omega} = 40 \\times 10^{-6}\\text{ A} = 40\\ \\mu\\text{A}$$\nIn the collector circuit, with $V_{CC} = 20\\text{ V}, R_C = 4\\text{ k}\\Omega$, and $V_{CE} = 0$:\n$$I_C = \\frac{V_{CC} - V_{CE}}{R_C} = \\frac{20\\text{ V}}{4 \\times 10^3\\ \\Omega} = 5 \\times 10^{-3}\\text{ A} = 5\\text{ mA}$$\nThe current gain $\\beta$ is:\n$$\\beta = \\frac{I_C}{I_B} = \\frac{5 \\times 10^{-3}\\text{ A}}{40 \\times 10^{-6}\\text{ A}} = \\frac{5000}{40} = 125$$\n\nHence, the correct option is (D)."
  }
];
