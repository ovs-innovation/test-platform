export const AR_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "If Assertion is true statement but Reason is false, then mark (3).",
  "If both Assertion and Reason are false statements, then mark (4)."
];

export const acArQuestions = [
  {
    qNo: 1,
    assertion: "When a current $i = (3 + 4\\sin\\omega t)$ flows in a wire, then reading of a d.c. ammeter connected in series is 4 units.",
    reason: "A d.c. ammeter measures only the value of current amplitude.",
    options: AR_OPTIONS,
    correct_index: 3, // (4)
    solution: "Assertion is false: A d.c. ammeter (moving coil ammeter) measures the average or DC component of current over a cycle. For $i = 3 + 4\\sin\\omega t$, the average value is $\\langle i \\rangle = 3\\text{ units}$. Hence, the d.c. ammeter reads 3 units, not 4 units. Reason is false: A d.c. ammeter works on the torque produced by steady magnetic force, measuring average current $\\langle i \\rangle$, not current amplitude. Therefore, both Assertion and Reason are false statements (mark 4)."
  },
  {
    qNo: 2,
    assertion: "A capacitor can replace choke coil in a.c circuit.",
    reason: "A capacitor can reduce the current in a.c. circuit like an inductor.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: A capacitor offers capacitive reactance $X_C = \\frac{1}{\\omega C}$ and consumes zero average power over a complete cycle ($P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos 90^\\circ = 0$). Hence, like an ideal choke coil, a capacitor can limit/reduce AC current without dissipating power as heat. Reason is true: The capacitive reactance limits and reduces the AC current flowing through the circuit. Reason correctly explains Assertion (mark 1)."
  },
  {
    qNo: 3,
    assertion: "Average value of sinusoidal AC is always zero in one time period.",
    reason: "Net charge transferred in one time period of sinusoidal AC is zero.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: The average value of a sinusoidal alternating current $i = I_0 \\sin\\omega t$ over a full cycle $T$ is $\\langle i \\rangle = \\frac{1}{T}\\int_0^T i\\,dt = 0$. Reason is true: The total charge transferred over one complete cycle is $q_{\\text{net}} = \\int_0^T i\\,dt = 0$, as equal and opposite charges flow in the positive and negative half-cycles. Since $\\langle i \\rangle = \\frac{q_{\\text{net}}}{T} = 0$, Reason correctly explains Assertion (mark 1)."
  },
  {
    qNo: 4,
    assertion: "Average power in series LCR ac circuit is maximum at resonance.",
    reason: "At resonance circuit is purely inductive.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: At resonance, inductive reactance equals capacitive reactance ($X_L = X_C$), so impedance is minimum ($Z = R$), current is maximum ($I_{\\text{rms}} = V_{\\text{rms}}/R$), and the power factor is unity ($\\cos\\phi = 1$). Thus, average power $P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} = \\frac{V_{\\text{rms}}^2}{R}$ is maximum. Reason is false: At resonance, $X_L = X_C$, so reactive voltages cancel each other completely, and the circuit is purely resistive ($\\phi = 0$), not purely inductive. Hence, Assertion is true but Reason is false (mark 3)."
  },
  {
    qNo: 5,
    assertion: "Current through a pure inductor is wattless.",
    reason: "Phase difference between emf across a pure inductor and current through it is $90^\\circ$ or $\\frac{\\pi}{2}$.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: In an AC circuit containing only a pure inductor, the average power dissipated over a complete cycle is zero ($P_{\\text{avg}} = 0$), meaning the current is wattless. Reason is true: For a pure inductor, current lags voltage by $\\phi = 90^\\circ$ ($\\pi/2$). The power factor is $\\cos 90^\\circ = 0$, giving $P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos 90^\\circ = 0$. Reason correctly explains Assertion (mark 1)."
  },
  {
    qNo: 6,
    assertion: "AC can be measured by a hot wire instrument.",
    reason: "A hot wire instrument works on the principle of magnetic effect of current.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: Hot-wire instruments operate on the Joule heating effect of electric current ($H \\propto I^2$). Because heating depends on $I^2$, it is independent of the direction of alternating current, allowing hot-wire instruments to measure the root mean square (rms) value of AC. Reason is false: A hot-wire instrument works on the thermal (heating) effect of current, not on the magnetic effect (moving coil instruments work on magnetic effect). Hence, Assertion is true but Reason is false (mark 3)."
  },
  {
    qNo: 7,
    assertion: "When the frequency of the AC source in a series LCR circuit equals to the resonant frequency, the reactance of the circuit is zero.",
    reason: "There is maximum current through the inductor as well as capacitor at resonance.",
    options: AR_OPTIONS,
    correct_index: 1, // (2)
    solution: "Assertion is true: In a series LCR circuit, net reactance is $X = X_L - X_C$. At resonant frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}}$, $X_L = X_C$, so net reactance $X = 0$. Reason is true: At resonance, impedance $Z = R$ is minimum, so current $I = V/R$ reaches its maximum value throughout all series elements, including the inductor and capacitor. However, reactance is zero because $X_L = X_C$, not because current is maximum. Hence, both are true but Reason is not the correct explanation of Assertion (mark 2)."
  },
  {
    qNo: 8,
    assertion: "At resonance, power factor of series L.C.R. circuit is zero.",
    reason: "Power factor is equal to $(\\sin\\phi)$, where $\\phi$ is the phase difference between voltage and current.",
    options: AR_OPTIONS,
    correct_index: 3, // (4)
    solution: "Assertion is false: At resonance in a series LCR circuit, $X_L = X_C$, so the phase angle $\\phi = 0$. The power factor is $\\cos\\phi = \\cos 0^\\circ = 1$ (unity), not zero. Reason is false: Power factor is defined as the cosine of the phase angle ($\\cos\\phi = R/Z$), not $\\sin\\phi$. Therefore, both Assertion and Reason are false statements (mark 4)."
  },
  {
    qNo: 9,
    assertion: "Average power in an AC circuit is given by $P = I_{\\text{rms}}^2 R$.",
    reason: "In one full cycle, net power is dissipated only along a capacitor.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: In an AC circuit with resistance $R$, inductance $L$, and capacitance $C$, ideal reactive components consume zero average power over a cycle ($\\langle P_L \\rangle = 0$, $\\langle P_C \\rangle = 0$). Power is dissipated exclusively as heat across the resistor: $P_{\\text{avg}} = I_{\\text{rms}}^2 R$. Reason is false: Over a full cycle, net power dissipated across an ideal capacitor is zero ($\\cos 90^\\circ = 0$). Power is dissipated across resistance, never along a capacitor. Hence, Assertion is true but Reason is false (mark 3)."
  },
  {
    qNo: 10,
    assertion: "If an inductor coil is connected to an AC source, the current through the coil is $I_1$. If the same coil is connected to DC source of same voltage, the current is $I_2$. Then $I_1 < I_2$.",
    reason: "In AC circuit, inductor coil offers more resistance.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: When connected to a DC source, inductive reactance is zero ($X_L = 0$), so current is limited only by resistance: $I_2 = V/R$. When connected to an AC source of frequency $f$, the coil exhibits inductive reactance $X_L = \\omega L$, so total opposition (impedance) is $Z = \\sqrt{R^2 + X_L^2} > R$, giving $I_1 = V/Z < V/R = I_2$. Reason is true: In an AC circuit, the coil offers greater effective opposition (impedance) due to induced back EMF. Reason correctly explains Assertion (mark 1)."
  },
  {
    qNo: 11,
    assertion: "When a dielectric is introduced between the plates of a capacitor connected in series with a bulb to an AC source, then bulb glows dimmer.",
    reason: "Inserting dielectric causes an increase in impedance of circuit.",
    options: AR_OPTIONS,
    correct_index: 3, // (4)
    solution: "Assertion is false: When a dielectric of dielectric constant $k > 1$ is inserted between the capacitor plates, capacitance increases ($C' = k C$). Capacitive reactance $X_C = \\frac{1}{\\omega C}$ decreases. The total impedance $Z = \\sqrt{R^2 + X_C^2}$ decreases, causing circuit current $I = V/Z$ to increase. Since power in the bulb is $P = I^2 R$, the bulb glows brighter, not dimmer. Reason is false: Inserting a dielectric decreases capacitive reactance, thereby decreasing (not increasing) the impedance of the circuit. Therefore, both Assertion and Reason are false statements (mark 4)."
  },
  {
    qNo: 12,
    assertion: "Transformers cannot be used to change DC voltage.",
    reason: "DC can change the flux in the primary coil of a transformer.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: A transformer operates on the principle of mutual induction ($e_s = -M \\frac{dI_p}{dt}$), which requires a changing magnetic flux. For a steady DC supply, current is constant ($\\frac{dI_p}{dt} = 0$), producing constant magnetic flux ($\\frac{d\\Phi}{dt} = 0$). No secondary voltage is induced. Reason is false: Steady DC produces a constant, unchanging magnetic flux in the primary coil. Hence, Assertion is true but Reason is false (mark 3)."
  },
  {
    qNo: 13,
    assertion: "The resonant frequency of an L.C.R. series circuit can be increased by inserting a copper plate between plates of a capacitor.",
    reason: "Inserting a copper rod in an inductor will decrease the coefficient of self-induction of the coil.",
    options: AR_OPTIONS,
    correct_index: 3, // (4)
    solution: "Assertion is false: When a conducting copper plate of thickness $t$ is inserted between capacitor plates of separation $d$, the effective plate separation becomes $d' = d - t$, which increases capacitance ($C' = \\frac{\\varepsilon_0 A}{d - t} > C$). The resonant frequency $f_0 = \\frac{1}{2\\pi \\sqrt{LC}}$ is inversely proportional to $\\sqrt{C}$; thus, an increase in $C$ decreases the resonant frequency, not increases it. In the standard four-option evaluation scheme, Assertion is false statement (mark 4)."
  },
  {
    qNo: 14,
    assertion: "A choke coil is connected in series with a tube light in an AC circuit.",
    reason: "Choke coil has high inductance.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: A choke coil is connected in series with a fluorescent tube light operated on AC to safely choke/limit the current once the gas is ionized. Reason is true: A choke coil is designed with high self-inductance ($L$) and negligible resistance ($R$), providing large inductive reactance $X_L = \\omega L$ to limit current without significant Joule heating loss ($I^2 R \\approx 0$). Reason correctly explains Assertion (mark 1)."
  },
  {
    qNo: 15,
    assertion: "Alternating current is transmitted to far off places at high voltage.",
    reason: "For a given power supplied, current will be low at high voltages thus leading to small power loss during transmission.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: Long-distance AC transmission is carried out at very high voltages (using step-up transformers). Reason is true: For a given transmitted power $P = V I \\cos\\phi$, current is inversely proportional to voltage ($I \\propto 1/V$). The power lost as heat in transmission lines of resistance $R$ is $P_{\\text{loss}} = I^2 R \\propto \\frac{1}{V^2}$. Thus, high voltage transmission ensures low current and minimal $I^2 R$ energy losses. Reason correctly explains Assertion (mark 1)."
  },
  {
    qNo: 16,
    assertion: "AC current through a pure inductive circuit decreases with increase in frequency of the AC source (peak voltage is constant).",
    reason: "Inductive reactance is inversely proportional to frequency of AC source.",
    options: AR_OPTIONS,
    correct_index: 2, // (3)
    solution: "Assertion is true: Inductive reactance is $X_L = 2\\pi f L$. The peak current is $I_0 = \\frac{V_0}{X_L} = \\frac{V_0}{2\\pi f L}$. As frequency $f$ increases, $X_L$ increases, which causes the AC current $I_0$ to decrease. Reason is false: Inductive reactance is directly proportional to frequency ($X_L \\propto f$), not inversely proportional. Hence, Assertion is true but Reason is false (mark 3)."
  },
  {
    qNo: 17,
    assertion: "Resonance phenomenon is exhibited by a AC circuit only if both $L$ and $C$ are present in the circuit.",
    reason: "Voltage across $L$ and $C$ cancel each other and current amplitude is $\\frac{V_0}{R}$.",
    options: AR_OPTIONS,
    correct_index: 0, // (1)
    solution: "Assertion is true: Electrical resonance requires inductive and capacitive reactances to be equal and opposite ($X_L = X_C$, i.e. $\\omega L = \\frac{1}{\\omega C}$). Circuits containing only $R$ and $L$ or only $R$ and $C$ cannot exhibit resonance because cancellation of reactive components is impossible. Reason is true: At resonance, voltages across $L$ and $C$ are $180^\\circ$ out of phase ($V_L = -V_C$), so they cancel each other out ($V_L + V_C = 0$), leaving the full applied voltage across $R$, which yields maximum current amplitude $I_0 = \\frac{V_0}{R}$. Reason correctly explains Assertion (mark 1)."
  }
];

