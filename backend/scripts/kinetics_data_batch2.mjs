/**
 * Chemical Kinetics Question Bank - Batch 2
 * Source:
 * 1. Image 1: Section B (Assertion - Reason Questions 1 to 14)
 * 2. Image 2: Booklet Page 44 (Objective Questions 94 to 105)
 */

export const kineticsBatch2 = [
  // =========================================================================
  // SECTION B: ASSERTION - REASON QUESTIONS (1 to 14)
  // =========================================================================
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Collision Theory & Effective Collisions",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Product can form only when the required orientation and energy conditions of reactants are favourable.\nReason (R): All collisions between reactants yield the desired product.",
    assertion_text: "Product can form only when the required orientation and energy conditions of reactants are favourable.",
    reason_text: "All collisions between reactants yield the desired product.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "According to collision theory, only those collisions which possess energy greater than or equal to threshold energy ($E \\ge E_a$) with proper steric orientation lead to effective chemical transformations into products. Hence, Assertion is true. However, the vast majority of collisions are ineffective due to lack of activation energy or inappropriate orientation. Hence, Reason is false. Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Elementary Reactions & Molecularity",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): For elementary reactions, the law of mass action and rate law expressions are generally same.\nReason (R): Molecularity of elementary reaction is always one.",
    assertion_text: "For elementary reactions, the law of mass action and rate law expressions are generally same.",
    reason_text: "Molecularity of elementary reaction is always one.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For an elementary (single-step) reaction, the order of each reacting species is equal to its stoichiometric coefficient in the balanced equation. Therefore, the rate law expression matches that obtained from the law of mass action (Assertion is true). However, the molecularity of elementary reactions can be unimolecular (1), bimolecular (2), or termolecular (3). It is not always one (Reason is false). Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Equation at High Temperatures",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): At very high temperature (approaches to infinity) rate constant becomes equal to collision frequency.\nReason (R): The collisions in which molecules collide with proper orientation is called ineffective collisions.",
    assertion_text: "At very high temperature (approaches to infinity) rate constant becomes equal to collision frequency.",
    reason_text: "The collisions in which molecules collide with proper orientation is called ineffective collisions.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "From the Arrhenius equation $k = A e^{-E_a/RT}$, as $T \\rightarrow \\infty$, $\\frac{E_a}{RT} \\rightarrow 0$, so $e^{-E_a/RT} \\rightarrow 1$ and $k \\rightarrow A$ (the collision frequency / pre-exponential factor). Hence, Assertion is true. Collisions where molecules collide with proper orientation and threshold energy are termed *effective collisions*, not ineffective collisions. Hence, Reason is false. Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Saponification & Order of Reaction",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Base catalysed hydrolysis of ethyl acetate is a first order reversible reaction.\nReason (R): Order of reaction always depend on the stoichiometry of the reaction.",
    assertion_text: "Base catalysed hydrolysis of ethyl acetate is a first order reversible reaction.",
    reason_text: "Order of reaction always depend on the stoichiometry of the reaction.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Base-catalyzed ester hydrolysis (saponification): $\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{OH}^- \\rightarrow \\text{CH}_3\\text{COO}^- + \\text{C}_2\\text{H}_5\\text{OH}$ is an irreversible bimolecular reaction following overall second-order kinetics: $\\text{Rate} = k[\\text{ester}][\\text{OH}^-]$. Thus Assertion is false. Furthermore, the order of a reaction is an experimentally determined quantity that cannot be deduced simply from stoichiometry. Thus Reason is false. Both statements are false, so correct option is (4)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Order of Reaction & Higher Order Probability",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The overall order of the reaction is the sum of power of all the reactants in the rate expression.\nReason (R): There are many higher order reactions.",
    assertion_text: "The overall order of the reaction is the sum of power of all the reactants in the rate expression.",
    reason_text: "There are many higher order reactions.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "By definition, the overall order of a reaction is the sum of exponents of the concentration terms appearing in the experimental rate law: $\\text{Rate} = k[A]^x[B]^y \\implies \\text{order} = x + y$. Thus Assertion is true. However, simultaneous collision of more than three molecules has an exceedingly low statistical probability; hence reactions with order greater than three are extremely rare, not abundant. Thus Reason is false. Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Experimental Nature of Rate Law",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Rate law for any reaction cannot be predicted theoretically but must be determined experimentally.\nReason (R): For the reaction $2\\text{N}_2\\text{O}_5 \\rightarrow 2\\text{N}_2\\text{O}_4 + \\text{O}_2$, the rate law will be, $\\text{rate} = k[\\text{N}_2\\text{O}_5]$.",
    assertion_text: "Rate law for any reaction cannot be predicted theoretically but must be determined experimentally.",
    reason_text: "For the reaction 2N2O5 -> 2N2O4 + O2, the rate law will be, rate = k[N2O5].",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The rate law of any complex reaction represents the sequence of elementary steps and must be determined experimentally (Assertion is true). For the thermal decomposition of $\\text{N}_2\\text{O}_5$, despite a stoichiometric coefficient of 2, the experimentally observed rate law is first order: $\\text{Rate} = k[\\text{N}_2\\text{O}_5]$ (Reason is true). Reason serves as an illustrative example of the assertion, but not the complete causal explanation. Correct option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Pseudo First Order Ester Hydrolysis Rate Law",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): For the reaction: $\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O} \\rightarrow \\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH}$ with rate law $= k[\\text{CH}_3\\text{COOC}_2\\text{H}_5][\\text{H}_2\\text{O}]^0$ order of reaction will be 1.\nReason (R): The sum of power of the concentration of the reactant in the rate law expression is called the order of that chemical reaction.",
    assertion_text: "For the reaction: CH3COOC2H5 + H2O -> CH3COOH + C2H5OH with rate law = k[CH3COOC2H5][H2O]^0 order of reaction will be 1.",
    reason_text: "The sum of power of the concentration of the reactant in the rate law expression is called the order of that chemical reaction.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "In the given rate law, the exponent of $[\\text{CH}_3\\text{COOC}_2\\text{H}_5]$ is 1 and that of $[\\text{H}_2\\text{O}]$ is 0. Since the overall order is the sum of powers ($1 + 0 = 1$), the order is 1 (Assertion is true). Reason accurately defines the order of reaction as the sum of concentration exponents in the rate law and directly justifies the calculation. Both are true and Reason is the correct explanation -> Option (1)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Units of Zero Order Rate Constant",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Rate constant of a zero order reaction has the same unit as that rate of reaction.\nReason (R): A zero order reaction means that the rate of reaction is independent of the concentration of reactant.",
    assertion_text: "Rate constant of a zero order reaction has the same unit as that rate of reaction.",
    reason_text: "A zero order reaction means that the rate of reaction is independent of the concentration of reactant.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For a zero-order reaction, $\\text{Rate} = k [A]^0 = k$. Hence, the unit of rate constant $k$ is identical to that of reaction rate: $\\text{mol L}^{-1}\\text{s}^{-1}$ (Assertion is true). A zero order reaction by definition proceeds at a rate independent of the concentration of reactants (Reason is true). Because the rate equation contains no concentration terms, $k$ shares the dimension of rate directly. Both are true and Reason is the correct explanation -> Option (1)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Elementary Reaction Definition & Molecularity",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The reaction taking place in one step is called elementary reaction.\nReason (R): For a elementary reaction order and molecularity of the reaction will be different.",
    assertion_text: "The reaction taking place in one step is called elementary reaction.",
    reason_text: "For a elementary reaction order and molecularity of the reaction will be different.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Reactions that occur in a single concerted step without intermediate stages are termed elementary reactions (Assertion is true). For any elementary reaction, the number of colliding molecules participating in the step represents its molecularity, which is always identically equal to the reaction order (Reason is false). Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Pseudo First Order Acidic Ester Hydrolysis",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Hydrolysis of esters in acidic medium is a pseudo first order reaction.\nReason (R): Water is present in the excess amount therefore its concentration remain constant throughout the reaction.",
    assertion_text: "Hydrolysis of esters in acidic medium is a pseudo first order reaction.",
    reason_text: "Water is present in the excess amount therefore its concentration remain constant throughout the reaction.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Acid-catalyzed hydrolysis of esters: $\\text{RCOOR}' + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{RCOOH} + \\text{R}'\\text{OH}$ is a pseudo first-order reaction (Assertion is true). Because water serves as the solvent and is present in overwhelming excess, its concentration remains practically unchanged during the reaction. Consequently, $[\\text{H}_2\\text{O}]$ is combined with the true second-order rate constant $k'$ into an apparent first-order constant $k = k'[\\text{H}_2\\text{O}]$ (Reason is true). Both are true and Reason correctly explains Assertion -> Option (1)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Energy Coordinates of Exothermic Reactions",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Reactant have greater energy than product for an exothermic reaction.\nReason (R): Activation complex for the forward reaction will have lower energy than that for the backward reaction in an exothermic reaction.",
    assertion_text: "Reactant have greater energy than product for an exothermic reaction.",
    reason_text: "Activation complex for the forward reaction will have lower energy than that for the backward reaction in an exothermic reaction.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "In an exothermic reaction, heat is evolved ($\\Delta H = E_{\\text{products}} - E_{\\text{reactants}} < 0$), meaning the energy of reactants is higher than that of products (Assertion is true). The activated complex represents the same transition state summit for both forward and reverse reaction pathways; hence its absolute potential energy is identical for both directions (Reason is false). Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Activation Energy & Rate Dependence",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Decrease in activation energy increases the rate of reaction.\nReason (R): The rate of reaction always depend upon the concentration of reactant.",
    assertion_text: "Decrease in activation energy increases the rate of reaction.",
    reason_text: "The rate of reaction always depend upon the concentration of reactant.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "According to the Arrhenius relation $k = A e^{-E_a/RT}$, lowering the activation energy $E_a$ increases the magnitude of the Boltzmann fraction $e^{-E_a/RT}$ exponentially, leading to an increased rate constant and reaction rate (Assertion is true). However, for zero-order reactions, the rate of reaction is completely independent of reactant concentration; hence rate does not *always* depend on concentration (Reason is false). Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Threshold Energy & Steric Orientation Factor",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): For a certain reactions a large fraction of reactant have energy more than that the threshold energy still the rate of reaction will be very slow.\nReason (R): If the colliding molecules do not have proper orientation it will be an ineffective collision.",
    assertion_text: "For a certain reactions a large fraction of reactant have energy more than that the threshold energy still the rate of reaction will be very slow.",
    reason_text: "If the colliding molecules do not have proper orientation it will be an ineffective collision.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Even if reactant molecules possess adequate threshold energy, effective product formation requires appropriate geometric orientation during collision ($k = P Z e^{-E_a/RT}$, where $P$ is the steric orientation factor). If orientation requirements are complex, $P \\ll 1$ and the reaction proceeds extremely slowly (Assertion is true). Reason correctly states that collisions without proper orientation are ineffective and provides the exact explanation. Correct option is (1)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Maxwell-Boltzmann Kinetic Energy Distribution",
    question_type: "assertion_reason",
    question_text: "Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): On plotting the fraction of molecule with a given kinetic energy (E) vs kinetic energy, The area under the curve must be constant.\nReason (R): On increasing temperature the area showing the fraction of molecule having energy equal to or greater than activation energy remain constant.",
    assertion_text: "On plotting the fraction of molecule with a given kinetic energy (E) vs kinetic energy, The area under the curve must be constant.",
    reason_text: "On increasing temperature the area showing the fraction of molecule having energy equal to or greater than activation energy remain constant.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The total area under the Maxwell-Boltzmann distribution curve represents the integral of the probability density over all possible kinetic energies, which equals unity (1) and remains invariant with temperature (Assertion is true). When temperature is raised, the curve broadens and shifts to higher energies; consequently, the area under the curve for $E \\ge E_a$ significantly increases (nearly doubling for every $10^\\circ\\text{C}$ rise), rather than remaining constant (Reason is false). Correct option is (3)."
  },

  // =========================================================================
  // SECTION A: OBJECTIVE QUESTIONS (Q94 to Q105)
  // =========================================================================
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Mechanism, Order and Molecularity of Reaction",
    question_type: "mcq",
    booklet_number: 94,
    question_text: "For the reaction:\n\n$$2\\text{NO} + \\text{Br}_2 \\rightarrow 2\\text{NOBr}$$\n\nMechanism given is:\n$$\\text{NO} + \\text{Br}_2 \\rightleftharpoons \\text{NOBr}_2 \\quad (\\text{fast})$$\n$$\\text{NOBr}_2 + \\text{NO} \\rightarrow 2\\text{NOBr} \\quad (\\text{slow})$$\n\nThen which of the following is true?",
    options: [
      "Order of the above reaction is less than molecularity of reaction",
      "Order of the above reaction is equal to molecularity of reaction",
      "Order is greater than molecularity of reaction",
      "Relation between order and molecularity cannot be predicted"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. The rate-determining step is the slow elementary step:\n   $$\\text{Rate} = k'[\\text{NOBr}_2][\\text{NO}]$$\n2. From the fast pre-equilibrium step:\n   $$K = \\frac{[\\text{NOBr}_2]}{[\\text{NO}][\\text{Br}_2]} \\implies [\\text{NOBr}_2] = K[\\text{NO}][\\text{Br}_2]$$\n3. Substituting into the rate law:\n   $$\\text{Rate} = k' K [\\text{NO}]^2[\\text{Br}_2] = k[\\text{NO}]^2[\\text{Br}_2]$$\n   Therefore, overall order $= 2 + 1 = 3$.\n4. For the stoichiometric reaction $2\\text{NO} + \\text{Br}_2 \\rightarrow 2\\text{NOBr}$, molecularity is $2 + 1 = 3$.\nThus, the order of the reaction is equal to the molecularity. Correct option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Rate Constant from Half-Life",
    question_type: "mcq",
    booklet_number: 95,
    question_text: "If the initial conc. of unity is reduced to half in $25\\text{ s}$ for a zero order reaction, then rate constant will be:",
    options: [
      "0.027 mol L⁻¹ s⁻¹",
      "0.027 s⁻¹",
      "0.02 mol L⁻¹ s⁻¹",
      "0.02 L mol⁻¹ s⁻¹"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For a zero-order reaction:\n$$t_{1/2} = \\frac{[A]_0}{2k} \\implies k = \\frac{[A]_0}{2 t_{1/2}}$$\nGiven $[A]_0 = 1\\text{ mol L}^{-1}$ and $t_{1/2} = 25\\text{ s}$:\n$$k = \\frac{1}{2 \\times 25} = \\frac{1}{50} = 0.02\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nCorrect option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Activation Energy from Exponential Exponent",
    question_type: "mcq",
    booklet_number: 96,
    question_text: "If for a $1^{\\text{st}}$ order reaction, $k = 8.5 \\times 10^5 e^{-15000/T}$, the energy of activation is given by:",
    options: [
      "150 kJ/mol",
      "125 kJ/mol",
      "50 kJ/mol",
      "500 kJ/mol"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Comparing the given rate constant expression with the Arrhenius equation $k = A e^{-E_a/RT}$:\n$$\\frac{E_a}{R} = 15000\\text{ K}$$\n$$E_a = 15000 \\times R = 15000 \\times 8.314\\text{ J mol}^{-1} = 124,710\\text{ J mol}^{-1} \\approx 125\\text{ kJ/mol}$$\nCorrect option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Effect of Container Volume Change on Gaseous Rate",
    question_type: "mcq",
    booklet_number: 97,
    question_text: "For the elementary gaseous reaction $2\\text{P} + \\text{Q} \\rightarrow 3\\text{R}$. How the rate is affected if the volume is made triple?",
    options: [
      "Rate increases 9 times",
      "Rate increases 27 times",
      "Rate decreases 27 times",
      "Rate remains unchanged"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For the elementary reaction:\n$$\\text{Rate} = k[\\text{P}]^2[\\text{Q}]$$\nWhen the container volume is tripled ($V' = 3V$), the concentration of each gas becomes one-third ($[\\text{P}]' = [\\text{P}]/3$, $[\\text{Q}]' = [\\text{Q}]/3$):\n$$\\text{Rate}' = k \\left(\\frac{[\\text{P}]}{3}\\right)^2 \\left(\\frac{[\\text{Q}]}{3}\\right) = \\frac{1}{27} k[\\text{P}]^2[\\text{Q}] = \\frac{1}{27} \\text{Rate}$$\nThus, the rate decreases by 27 times. Correct option is (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Determination of Rate Law and Unknown Parameters",
    question_type: "mcq",
    booklet_number: 98,
    question_text: "If for the reaction $\\text{A} + \\text{B} \\rightarrow \\text{Product}$, order with respect to $\\text{A}$ and $\\text{B}$ is respectively $1.5$ and zero. Then in the given table $x$ and $y$ will be respectively:\n\n| $[\\text{A}]$ | $[\\text{B}]$ | $\\text{Rate}$ |\n| :---: | :---: | :---: |\n| $0.01$ | $0.01$ | $5.0$ |\n| $x$ | $0.015$ | $5.0$ |\n| $0.02$ | $0.01$ | $y$ |",
    options: [
      "0.02, 5.0",
      "0.01, 14",
      "0.02, 14",
      "0.01, 5"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793274431/edvedum_chemistry/kinetics/kinetics_q98_rate_table.png",
    solution: "The rate law is:\n$$\\text{Rate} = k[\\text{A}]^{1.5}[\\text{B}]^0 = k[\\text{A}]^{1.5}$$\n1. From row 1: $5.0 = k(0.01)^{1.5}$.\n2. From row 2: The rate is $5.0$. Since the rate does not depend on $[\\text{B}]$, $[\\text{A}]$ must remain identical to row 1:\n   $$x = 0.01$$\n3. From row 3: $[\\text{A}] = 0.02$:\n   $$\\frac{y}{5.0} = \\left(\\frac{0.02}{0.01}\\right)^{1.5} = 2^{1.5} = 2\\sqrt{2} \\approx 2 \\times 1.414 = 2.828$$\n   $$y = 5.0 \\times 2.828 \\approx 14.14 \\approx 14$$\nThus, $x = 0.01$ and $y \\approx 14$. Correct option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Successive Half-Life Concentrations",
    question_type: "mcq",
    booklet_number: 99,
    question_text: "The half life of a first order reaction is $10\\text{ minutes}$. If experiment is started with $0.08\\text{ mol/litre}$, then time taken to reduce the concentration to $0.01\\text{ mol/litre}$:",
    options: [
      "10 minute",
      "30 minute",
      "20 minute",
      "40 minute"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "1. The fraction of reactant remaining is:\n   $$\\frac{[A]_t}{[A]_0} = \\frac{0.01}{0.08} = \\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3$$\n2. The reaction has progressed through $n = 3$ half-lives.\n3. Total time $= n \\times t_{1/2} = 3 \\times 10\\text{ min} = 30\\text{ minutes}$. Correct option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate of Reaction from Ammonia Synthesis Stoichiometry",
    question_type: "mcq",
    booklet_number: 100,
    question_text: "In the reaction $\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightarrow 2\\text{NH}_3(\\text{g})$. If initially $10\\text{ g } \\text{H}_2$ were taken and after $10\\text{ s}$, $34\\text{ g } \\text{NH}_3$ is formed, then rate of reaction (assuming volume of container is $1\\text{ L}$ and $\\text{N}_2$ is present in excess):",
    options: [
      "0.1 mol L⁻¹ s⁻¹",
      "0.2 mol L⁻¹ s⁻¹",
      "2 mol L⁻¹ s⁻¹",
      "0.5 mol L⁻¹ s⁻¹"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Molar mass of $\\text{NH}_3 = 17\\text{ g/mol}$.\n2. Moles of $\\text{NH}_3$ produced $= \\frac{34\\text{ g}}{17\\text{ g/mol}} = 2\\text{ mol}$.\n3. Concentration of $\\text{NH}_3$ in $1\\text{ L} = 2\\text{ mol/L}$.\n4. Rate of formation of $\\text{NH}_3$:\n   $$\\frac{\\Delta[\\text{NH}_3]}{\\Delta t} = \\frac{2\\text{ mol L}^{-1}}{10\\text{ s}} = 0.2\\text{ mol L}^{-1}\\text{ s}^{-1}$$\n5. The overall rate of reaction is related stoichiometrically:\n   $$\\text{Rate} = \\frac{1}{2} \\frac{\\Delta[\\text{NH}_3]}{\\Delta t} = \\frac{1}{2} \\times 0.2 = 0.1\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nCorrect option is (1)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Linear Plot (log K vs 1/T)",
    question_type: "mcq",
    booklet_number: 101,
    question_text: "A graph plotted between $\\log K$ versus $1/T$ for calculating activation energy is shown by:",
    options: [
      "Plot (1)",
      "Plot (2)",
      "Plot (3)",
      "Plot (4)"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793274429/edvedum_chemistry/kinetics/kinetics_q101_logk_vs_inv_t.png",
    solution: "The logarithmic form of the Arrhenius equation is:\n$$\\log_{10} K = \\log_{10} A - \\frac{E_a}{2.303 R} \\left(\\frac{1}{T}\\right)$$\nThis represents a linear equation $y = mx + c$ where $y = \\log K$, $x = 1/T$, intercept $= \\log A$, and slope $m = -\\frac{E_a}{2.303 R}$ (a negative slope straight line).\nGraph (2) correctly depicts this straight line with negative slope. Correct option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Integrated Time Relationships",
    question_type: "mcq",
    booklet_number: 102,
    question_text: "For the first order reaction, which one is not correct?",
    options: [
      "t_{3/4} = 2 × t_{1/2}",
      "t_{7/8} = 3 t_{1/2}",
      "t_{99.9%} = 10 t_{1/2}",
      "t_{50%} = 2.5 t_{1/2}"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For first-order reactions:\n1. $t_{3/4} = 2 t_{1/2}$ (75% completed = 2 half-lives) -> Correct\n2. $t_{7/8} = 3 t_{1/2}$ (87.5% completed = 3 half-lives) -> Correct\n3. $t_{99.9\\%} = \\frac{2.303}{k} \\log 1000 = \\frac{2.303 \\times 3}{k} \\approx 10 \\times \\frac{0.693}{k} = 10 t_{1/2}$ -> Correct\n4. $t_{50\\%}$ is by definition the half-life ($1 \\times t_{1/2}$), NOT $2.5 t_{1/2}$. Hence (4) is incorrect. Correct option is (4)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Equal Rate Constants for Parallel Arrhenius Pathways",
    question_type: "mcq",
    booklet_number: 103,
    question_text: "The two reactions are given:\n$$\\text{X} \\rightarrow \\text{Y} \\quad (K_1 = 10^{10} e^{-500/T})$$\n$$\\text{X} \\rightarrow \\text{Z} \\quad (K_2 = 10^{12} e^{-1000/T})$$\n\nAt what temperature $T$ both $K_1$ and $K_2$ are equal?",
    options: [
      "500 K",
      "500 / 4.606 K",
      "4.606 / 500 K",
      "3.303 / 5000 K"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Setting $K_1 = K_2$:\n$$10^{10} e^{-500/T} = 10^{12} e^{-1000/T}$$\n$$\\frac{e^{-500/T}}{e^{-1000/T}} = \\frac{10^{12}}{10^{10}} = 10^2$$\n$$e^{500/T} = 10^2$$\nTaking natural logarithm on both sides:\n$$\\frac{500}{T} = \\ln(10^2) = 2 \\times 2.303 = 4.606$$\n$$T = \\frac{500}{4.606}\\text{ K}$$\nCorrect option is (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Activation Energy of Reverse Exothermic Reaction",
    question_type: "mcq",
    booklet_number: 104,
    question_text: "Reaction $\\text{A} + \\text{B} \\rightarrow \\text{C} + \\text{D} + 38\\text{ kcal}$ has activation energy $20\\text{ kcal}$. Activation energy for the reaction $\\text{C} + \\text{D} \\rightarrow \\text{A} + \\text{B}$ is:",
    options: [
      "20 kcal",
      "-20 kcal",
      "18 kcal",
      "58 kcal"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The forward reaction releases $38\\text{ kcal}$, meaning $\\Delta H = -38\\text{ kcal}$.\nUsing the relation:\n$$\\Delta H = E_{a,\\text{forward}} - E_{a,\\text{backward}}$$\n$$-38 = 20 - E_{a,\\text{backward}}$$\n$$E_{a,\\text{backward}} = 20 + 38 = 58\\text{ kcal}$$\nCorrect option is (4)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Order from Variation of Half-Life with Pressure",
    question_type: "mcq",
    booklet_number: 105,
    question_text: "For a reaction, $\\text{A}(\\text{g}) \\rightarrow \\text{B}(\\text{g})$. Following data were obtained at $37^\\circ\\text{C}$ for the above reaction:\n\n| $\\text{Pressure of A in mmHg}$ | $10$ | $20$ | $40$ |\n| :---: | :---: | :---: | :---: |\n| $\\text{Half life } (t_{1/2}) \\text{ (relative)}$ | $8$ | $4$ | $2$ |\n\nThe order of reaction is:",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793274432/edvedum_chemistry/kinetics/kinetics_q105_halflife_pressure_table.png",
    solution: "The dependence of half-life on initial pressure/concentration is given by:\n$$t_{1/2} \\propto \\frac{1}{P^{n-1}} = P^{1-n}$$\nFrom the data:\n- When $P$ doubles from 10 to 20, $t_{1/2}$ halves from 8 to 4 ($2^{-1}$).\n- When $P$ doubles from 20 to 40, $t_{1/2}$ halves from 4 to 2 ($2^{-1}$).\nTherefore:\n$$2^{1-n} = 2^{-1} \\implies 1 - n = -1 \\implies n = 2$$\nThe order of the reaction is 2. Correct option is (2)."
  }
];
