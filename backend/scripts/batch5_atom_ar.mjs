// Batch 5: Assertion - Reason Questions 1 to 16 (Structure of Atom)
import { pool } from '../src/config/db.js';
import { fileURLToPath } from 'url';

const SUBJECT_ID = 10;
const CHAPTER_ID = 77;
const CHAPTER = 'Structure of Atom';
const CATEGORY = 'Chemistry';

const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const BATCH_AR = [
  {
    q_num: 1,
    assertion_text: "$3d_{z^2}$ has two nodal planes $xy$ and $xz$.",
    reason_text: "$d$-orbitals have four lobes.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "The $3d_{z^2}$ orbital has zero nodal planes; it possesses two conical nodal surfaces. Also, $3d_{z^2}$ has two lobes and a central ring (doughnut), not four lobes. Both Assertion and Reason are false statements.",
    topic: "Quantum Mechanical Model",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 2,
    assertion_text: "Electronic configuration of chromium is $[\\text{Ar}] 3d^5 4s^1$.",
    reason_text: "Chromium can show +6 oxidation number in its compound.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Chromium has anomalous configuration $[\\text{Ar}] 3d^5 4s^1$ due to extra stability of half-filled $d$-subshell and exchange energy. While chromium does exhibit +6 oxidation state, this does not explain its ground state electronic configuration. Both are true, but Reason is not the correct explanation.",
    topic: "Electronic Configuration",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 3,
    assertion_text: "We cannot overcome the uncertainty predicted by Heisenberg's principle by building more precise devices to reduce the error in the measurement below the $\\frac{h}{4\\pi}$ limit.",
    reason_text: "The principle is not due to limitation of the measuring devices. It is on account of the fact that subatomic particles cannot be seen even under a microscope.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Heisenberg's uncertainty principle is an intrinsic wave-particle property of matter at quantum scale, not an artifact of measuring instrument limitations. Both Assertion and Reason are true and Reason correctly explains the Assertion.",
    topic: "Heisenberg's Uncertainty Principle",
    marks: 4, difficulty: "hard"
  },
  {
    q_num: 4,
    assertion_text: "All $d$-orbitals are cloverleaf structure having two nodal plane.",
    reason_text: "Out of five only four $d$-orbitals are degenerate orbitals.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "$d_{z^2}$ is not cloverleaf-shaped and has conical nodal surfaces, not nodal planes. In a free atom, all five $d$-orbitals are degenerate. Both Assertion and Reason are false statements.",
    topic: "Quantum Mechanical Model",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 5,
    assertion_text: "Kinetic energy of electron decreases with increase in orbit number in H-atom.",
    reason_text: "Total energy of electron increases with increase in orbit number.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "In Bohr's orbit, $\\text{K.E.} = \\frac{13.6}{n^2}\\text{ eV}$, which decreases as $n$ increases. Total energy $E_n = -\\frac{13.6}{n^2}\\text{ eV}$ becomes less negative, so it increases. Both statements are true, but Reason is not the explanation of the decrease in kinetic energy.",
    topic: "Bohr's Model of Atom",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 6,
    assertion_text: "First line of Lyman series of H-spectrum and second line of Balmer series of $\\text{He}^+$ spectrum have same wavelength.",
    reason_text: "First line of Lyman series of H-spectrum and third line of Paschen series of $\\text{Li}^{2+}$ spectrum have same wavelength.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "First line of Lyman for H: $\\bar{\\nu} = R(1)(1 - 1/4) = \\frac{3}{4}R$. Second line of Balmer for $\\text{He}^+$: $\\bar{\\nu} = 4R(1/4 - 1/16) = \\frac{3}{4}R$. Third line of Paschen for $\\text{Li}^{2+}$: $\\bar{\\nu} = 9R(1/9 - 1/36) = \\frac{3}{4}R$. Both statements are mathematically true, but Reason is not the explanation of the Assertion.",
    topic: "Hydrogen Spectrum",
    marks: 4, difficulty: "hard"
  },
  {
    q_num: 7,
    assertion_text: "The energy of the electron in the $n^{\\text{th}}$ shell is $-13.6 \\frac{Z^2}{n^2}\\text{ eV/atom}$.",
    reason_text: "The ionisation energy of the electron in the hydrogen atom is equal to $+13.6\\text{ eV/atom}$.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "The energy expression $E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$ and the ground state ionization energy of hydrogen being $+13.6\\text{ eV}$ are both true statements.",
    topic: "Bohr's Model of Atom",
    marks: 4, difficulty: "easy"
  },
  {
    q_num: 8,
    assertion_text: "The radius of $2^{\\text{nd}}$ orbit of $\\text{He}^+$ atom is equal to $0.529 \\times \\frac{2^2}{2} = 1.058\\text{ \\AA}$.",
    reason_text: "Bohr's model can be applied to any electron system.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Radius $r_2 = 0.529 \\frac{n^2}{Z} = 0.529 \\times \\frac{4}{2} = 1.058\\text{ \\AA}$ is correct (Assertion is true). However, Bohr's model is strictly applicable only to single-electron species (like H, $\\text{He}^+$, $\\text{Li}^{2+}$), not to multi-electron systems. Reason is false.",
    topic: "Bohr's Model of Atom",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 9,
    assertion_text: "Splitting of spectral line in electric field is called Stark effect.",
    reason_text: "It is explained by Bohr's theory.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "The splitting of spectral lines under an electric field is known as the Stark effect (Assertion is true). Bohr's theory was unable to explain fine structure, Stark effect, and Zeeman effect (Reason is false).",
    topic: "Atomic Spectra",
    marks: 4, difficulty: "easy"
  },
  {
    q_num: 10,
    assertion_text: "$4s$ orbital is more penetrated than $3d$ orbital.",
    reason_text: "Second shell contains $d$-orbital.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "The $4s$ electron probability density penetrates closer to the nucleus than $3d$ (Assertion is true). The second shell ($n=2$) only contains $s$ and $p$ subshells ($l = 0, 1$), and has no $d$-orbitals (Reason is false).",
    topic: "Rules for Filling of Orbitals",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 11,
    assertion_text: "A spectral line is not observed for $2p_x \\rightarrow 2p_y$ transition for H as both $2p_x$ and $2p_y$ have same energy.",
    reason_text: "A spectral line is observed for $2p_x \\rightarrow 2p_y$ transition for multielectron atoms as both $2p_x$ and $2p_y$ have different energy.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "In hydrogen, $2p_x$ and $2p_y$ are degenerate, so no transition is possible (Assertion is true). In multi-electron atoms without external magnetic or electric fields, the three $p$-orbitals remain degenerate, so no spectral line is observed between them either (Reason is false).",
    topic: "Quantum Mechanical Model",
    marks: 4, difficulty: "hard"
  },
  {
    q_num: 12,
    assertion_text: "Isotopes of an element show identical chemical behaviour.",
    reason_text: "Isotopes of an element have same mass number.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Chemical properties are determined by atomic number (number of electrons and protons), which is the same for all isotopes of an element (Assertion is true). Isotopes differ in neutron count and thus have different mass numbers (Reason is false).",
    topic: "Discovery of Subatomic Particles",
    marks: 4, difficulty: "easy"
  },
  {
    q_num: 13,
    assertion_text: "Specific charge ($e/m$) of electron is greater than that of proton.",
    reason_text: "Mass of electron is $\\frac{1}{1836}$ times that of proton.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Specific charge is inversely proportional to mass. Since $m_e \\approx \\frac{m_p}{1836}$, the specific charge of an electron is $\\approx 1836$ times greater than that of a proton. Both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Discovery of Subatomic Particles",
    marks: 4, difficulty: "easy"
  },
  {
    q_num: 14,
    assertion_text: "In Rutherford's $\\alpha$-ray scattering experiment, one out of 20000 $\\alpha$-particles bounced back i.e., deflected by nearly $180^\\circ$.",
    reason_text: "Most of the space in the atom is empty.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "About 1 in 20,000 $\\alpha$-particles rebounds at $\\approx 180^\\circ$ (Assertion is true). Most of the atom's volume is empty space (Reason is true). However, the direct rebound proves that the positive charge and mass are concentrated in a tiny dense nucleus, while undeflected particles prove the empty space. Reason is not the explanation of the $180^\\circ$ deflection.",
    topic: "Rutherford's Nuclear Model",
    marks: 4, difficulty: "medium"
  },
  {
    q_num: 15,
    assertion_text: "Different types of electromagnetic radiation have different wavelengths.",
    reason_text: "Different types of electromagnetic radiation travel with different velocity in vacuum.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Electromagnetic radiations span a wide spectrum of wavelengths (Assertion is true). However, all electromagnetic waves propagate with the exact same constant speed in vacuum ($c = 3 \\times 10^8\\text{ m/s}$) regardless of wavelength (Reason is false).",
    topic: "Planck's Quantum Theory",
    marks: 4, difficulty: "easy"
  },
  {
    q_num: 16,
    assertion_text: "Work function ($w_0$ or $h\\nu_0$) is same for all metals.",
    reason_text: "When a radiation of frequency $\\nu$ falls on different metals, electrons are ejected with same velocity.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "Work function is a characteristic constant specific to each individual metal (Assertion is false). Since $\\text{K.E.} = h\\nu - w_0$, metals with different work functions eject electrons with different kinetic energies and velocities under the same incident frequency (Reason is false). Both are false statements.",
    topic: "Photoelectric Effect",
    marks: 4, difficulty: "easy"
  }
];

export async function importBatchAR() {
  console.log(`--- Importing Batch AR (${BATCH_AR.length} questions) ---`);
  let count = 0;
  for (const q of BATCH_AR) {
    const questionText = `Assertion (A): ${q.assertion_text}\nReason (R): ${q.reason_text}`;
    const res = await pool.query(
      `INSERT INTO question_bank (
        subject_id, chapter_id, category, chapter, topic,
        question_type, question_text, assertion_text, reason_text,
        options, correct_index, solution, marks, difficulty, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id`,
      [
        SUBJECT_ID,
        CHAPTER_ID,
        CATEGORY,
        CHAPTER,
        q.topic,
        'assertion_reason',
        questionText,
        q.assertion_text,
        q.reason_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        4,
        q.difficulty || 'medium',
        'available'
      ]
    );
    count++;
    console.log(`[Batch AR] Inserted AR Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }
  console.log(`Successfully imported Batch AR: ${count} questions.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importBatchAR().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

