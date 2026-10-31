import fetch from 'node-fetch';

const STANDARD_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "If Assertion is true statement but Reason is false",
  "If both Assertion and Reason are false statements"
];

const QUESTIONS_TO_SYNC = [
  // Q1 (Update 10987)
  {
    q_num: 1,
    live_id: 10987,
    assertion_text: "A charged capacitor is disconnected from a battery. Now if its plates are separated farther, the electric field between plates will remain the same.",
    reason_text: "The electric field between the plates is $\\frac{\\sigma}{\\varepsilon_0}$ and charge density remains same on separation.",
    question_text: "Assertion (A): A charged capacitor is disconnected from a battery. Now if its plates are separated farther, the electric field between plates will remain the same.\nReason (R): The electric field between the plates is $\\frac{\\sigma}{\\varepsilon_0}$ and charge density remains same on separation.",
    options: STANDARD_OPTIONS,
    correct_index: 0,
    solution: "1. When a charged capacitor is disconnected from the battery, the charge $Q$ on the plates is conserved and remains constant.\n2. Since the plate area $A$ is unchanged, the surface charge density $\\sigma = \\frac{Q}{A}$ remains constant on separation.\n3. The electric field between large parallel plates is given by $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}$, which is uniform and independent of the separation distance $d$.\n4. Thus, separating the plates farther does not change the electric field between them (Assertion is true).\n5. Reason correctly provides the formula $E = \\frac{\\sigma}{\\varepsilon_0}$ and the fact that $\\sigma$ remains constant, which is the exact explanation for why $E$ remains unchanged (Reason is true and is the correct explanation of Assertion).",
    topic: "Electric Field in Disconnected Capacitor"
  },
  // Q2 (Update 10988)
  {
    q_num: 2,
    live_id: 10988,
    assertion_text: "A capacitor can be given only a limited quantity of charge.",
    reason_text: "The capacity of a capacitor depends upon area of overlapping of plates.",
    question_text: "Assertion (A): A capacitor can be given only a limited quantity of charge.\nReason (R): The capacity of a capacitor depends upon area of overlapping of plates.",
    options: STANDARD_OPTIONS,
    correct_index: 1,
    solution: "1. Assertion: As more charge is added to a capacitor, its potential $V$ and the electric field $E$ in its surrounding medium increase proportionally ($E \\propto Q$). When the electric field exceeds the dielectric strength of the surrounding medium (e.g. $3 \\times 10^6\\text{ V/m}$ for air), dielectric breakdown occurs and charge begins to leak into the surroundings. Hence, a capacitor can only hold a limited quantity of charge (Assertion is TRUE).\n2. Reason: The capacitance of a parallel plate capacitor is $C = \\frac{\\varepsilon_0 A}{d}$, meaning the capacity does depend upon the overlapping area $A$ of the plates (Reason is TRUE as an independent fact).\n3. However, the reason why charge is limited is dielectric breakdown of the surrounding medium, not simply the fact that capacity depends on overlapping area. Thus, Reason is NOT the correct explanation of Assertion.",
    topic: "Limits of Capacitor Charge Storage"
  },
  // Q3
  {
    q_num: 3,
    assertion_text: "Electron always moves from a region of higher potential to a region of lower potential.",
    reason_text: "Electron is a positively charged particle.",
    question_text: "Assertion (A): Electron always moves from a region of higher potential to a region of lower potential.\nReason (R): Electron is a positively charged particle.",
    options: STANDARD_OPTIONS,
    correct_index: 3,
    solution: "1. Assertion is false: An electron has a negative charge ($q = -e$). The electrostatic force on an electron in an electric field $\\vec{E}$ is $\\vec{F} = -e\\vec{E}$. Since electric field $\\vec{E}$ points from a region of higher potential to lower potential ($E = -\\frac{dV}{dr}$), the force on the electron points in the opposite direction—from lower potential to higher potential. Furthermore, a moving electron with initial velocity does not always move in the direction of force.\n2. Reason is false: Electron is a negatively charged elementary particle with charge $-1.6 \\times 10^{-19}\\text{ C}$, not a positively charged particle.\n3. Therefore, both Assertion and Reason are false statements.",
    topic: "Motion of Charged Particles in Electric Potential"
  },
  // Q4
  {
    q_num: 4,
    assertion_text: "If a dielectric is inserted to fill the gap between the plates of a capacitor connected to battery, then electric field inside the capacitor decreases.",
    reason_text: "Magnitude of electric field inside a medium is $\\frac{1}{K}$ times the potential gradient in that medium.",
    question_text: "Assertion (A): If a dielectric is inserted to fill the gap between the plates of a capacitor connected to battery, then electric field inside the capacitor decreases.\nReason (R): Magnitude of electric field inside a medium is $\\frac{1}{K}$ times the potential gradient in that medium.",
    options: STANDARD_OPTIONS,
    correct_index: 3,
    solution: "1. Assertion is false: When the capacitor remains connected to a battery, the potential difference $V$ across its plates is maintained constant by the battery ($V = V_0$). The separation $d$ between the plates is unchanged. Hence, the electric field between the plates is $E = \\frac{V}{d} = \\frac{V_0}{d} = \\text{constant}$. The electric field inside does not decrease.\n2. Reason is false: By fundamental definition, the electric field intensity in any medium is related to the potential gradient by $E = -\\frac{dV}{dr}$ (its magnitude is simply the potential gradient, not $\\frac{1}{K}$ times the potential gradient).\n3. Therefore, both Assertion and Reason are false statements.",
    topic: "Dielectric in Capacitor with Battery Connected"
  },
  // Q5
  {
    q_num: 5,
    assertion_text: "Work done in moving a test charge from surface to any part inside a charged metal sphere is zero.",
    reason_text: "Electrostatic potential at every point inside a charged metal sphere is same as that at its surface.",
    question_text: "Assertion (A): Work done in moving a test charge from surface to any part inside a charged metal sphere is zero.\nReason (R): Electrostatic potential at every point inside a charged metal sphere is same as that at its surface.",
    options: STANDARD_OPTIONS,
    correct_index: 0,
    solution: "1. Assertion is true: Inside a charged metallic conductor in electrostatic equilibrium, the electric field $\\vec{E} = 0$. Since $\\vec{E} = -\\frac{dV}{dr} = 0$, the electrostatic potential $V$ is uniform throughout the conductor and equal to the potential at its surface ($V_{\\text{inside}} = V_{\\text{surface}}$).\n2. Reason is true: The electrostatic potential at every interior point is indeed identical to that at the surface.\n3. The work done in moving a test charge $q_0$ from the surface to any point inside is $W = q_0(V_{\\text{inside}} - V_{\\text{surface}}) = q_0(0) = 0$.\n4. Reason is the correct explanation of Assertion.",
    topic: "Equipotential Surface and Electric Field inside Conductor"
  },
  // Q6
  {
    q_num: 6,
    assertion_text: "A point charge $q$ is rotated along a circle in the electric field generated by another point charge $q$. The work done by the electric field on the rotating charge in one complete revolution around that charge is zero.",
    reason_text: "Work done along a closed loop in a conservative field is zero.",
    question_text: "Assertion (A): A point charge $q$ is rotated along a circle in the electric field generated by another point charge $q$. The work done by the electric field on the rotating charge in one complete revolution around that charge is zero.\nReason (R): Work done along a closed loop in a conservative field is zero.",
    options: STANDARD_OPTIONS,
    correct_index: 0,
    solution: "1. Assertion is true: For one complete revolution around the source charge, the path forms a closed loop, returning to the initial position.\n2. Reason is true: The electrostatic field is a conservative vector field. By definition, the work done by a conservative force along any arbitrary closed loop is identically zero ($\\oint \\vec{F}\\cdot d\\vec{r} = 0$).\n3. Reason explains Assertion: Since the path is a closed loop and the electrostatic field is conservative, the work done in one complete revolution is zero.",
    topic: "Conservative Nature of Electrostatic Field"
  },
  // Q7
  {
    q_num: 7,
    assertion_text: "Corona discharge takes place readily at sharper points.",
    reason_text: "Electric field at sharp points of a conductor is more than that at the blunt points.",
    question_text: "Assertion (A): Corona discharge takes place readily at sharper points.\nReason (R): Electric field at sharp points of a conductor is more than that at the blunt points.",
    options: STANDARD_OPTIONS,
    correct_index: 0,
    solution: "1. Assertion is true: Corona discharge (action of points or leakage of charge from pointed conductors) occurs very readily at sharp edges or points of a charged conductor.\n2. Reason is true: For an irregularly shaped conductor at a uniform potential, the surface charge density is inversely proportional to the radius of curvature ($\\sigma \\propto \\frac{1}{r}$). At sharp points (where $r \\to 0$), $\\sigma$ becomes extremely high, leading to an intense electric field ($E = \\frac{\\sigma}{\\varepsilon_0}$) that exceeds the dielectric strength of the surrounding air, ionizing it.\n3. Reason is the correct explanation of Assertion.",
    topic: "Corona Discharge and Action of Points"
  },
  // Q8
  {
    q_num: 8,
    assertion_text: "When air between the plates of an isolated parallel plate capacitor is replaced by insulating dielectric medium, its capacity decreases.",
    reason_text: "Electric field intensity between the plates with dielectric in between is increased.",
    question_text: "Assertion (A): When air between the plates of an isolated parallel plate capacitor is replaced by insulating dielectric medium, its capacity decreases.\nReason (R): Electric field intensity between the plates with dielectric in between is increased.",
    options: STANDARD_OPTIONS,
    correct_index: 3,
    solution: "1. Assertion is false: When a dielectric medium of dielectric constant $K > 1$ is inserted between the plates of a capacitor, its capacitance always increases from $C_0$ to $C = K C_0$ (it does not decrease).\n2. Reason is false: For an isolated capacitor (charge $Q$ is constant), the polarized dielectric produces an induced electric field opposite to the original field, so the net electric field decreases to $E = \\frac{E_0}{K}$ (it does not increase).\n3. Therefore, both Assertion and Reason are false statements.",
    topic: "Dielectrics and Capacitance"
  },
  // Q9
  {
    q_num: 9,
    assertion_text: "If electric potential in a certain region is constant, then the electric field must be zero in this region.",
    reason_text: "The relation between electric field and potential is $E = -\\frac{dV}{dx}$.",
    question_text: "Assertion (A): If electric potential in a certain region is constant, then the electric field must be zero in this region.\nReason (R): The relation between electric field and potential is $E = -\\frac{dV}{dx}$.",
    options: STANDARD_OPTIONS,
    correct_index: 0,
    solution: "1. Assertion is true: If the electric potential $V$ is uniform (constant) throughout a region of space, the electric field $\\vec{E}$ everywhere in that region must be zero.\n2. Reason is true: The component of the electric field along the $x$-direction is given by the negative potential gradient, $E = -\\frac{dV}{dx}$.\n3. Reason explains Assertion: Since $V$ is constant with respect to position, the derivative $\\frac{dV}{dx} = 0$, which mathematically requires $E = 0$. Hence, Reason is the correct explanation of Assertion.",
    topic: "Relation Between Electric Field and Potential"
  },
  // Q10
  {
    q_num: 10,
    assertion_text: "A conducting body is connected to the earth, hence it is electrically neutral.",
    reason_text: "The potential of a conducting body connected to the earth is non zero.",
    question_text: "Assertion (A): A conducting body is connected to the earth, hence it is electrically neutral.\nReason (R): The potential of a conducting body connected to the earth is non zero.",
    options: STANDARD_OPTIONS,
    correct_index: 3,
    solution: "1. Assertion is false: Earthing a conducting body brings its potential to zero ($V = 0$). However, this does not mean the body is necessarily neutral. For example, if a positive charge is placed near an earthed conductor, a negative induced charge is bound on the conductor while its potential remains zero.\n2. Reason is false: The potential of the Earth is taken by convention to be zero ($V_{\\text{earth}} = 0$). When a conductor is connected to the earth, charge transfers until the potential of the conductor becomes exactly zero ($V = 0$, not non-zero).\n3. Therefore, both Assertion and Reason are false statements.",
    topic: "Earthing of Conductors"
  }
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('Logging in to live platform...');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
  }

  const { token } = await loginRes.json();
  console.log('Login successful! Proceeding with sync...');

  for (const q of QUESTIONS_TO_SYNC) {
    const payload = {
      category: 'Physics',
      subject: 'Physics',
      subject_id: 5,
      chapter: 'Electrostatic Potential and Capacitance',
      topic: q.topic,
      question_type: 'assertion_reason',
      question_text: q.question_text,
      assertion_text: q.assertion_text,
      reason_text: q.reason_text,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      difficulty: 'medium',
      marks: 4
    };

    if (q.live_id) {
      console.log(`Updating Live Q${q.q_num} (ID: ${q.live_id})...`);
      const putRes = await fetch(`https://edvedum.com/api/question-bank/${q.live_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) {
        console.log(`-> Successfully updated Live Q${q.q_num} (ID: ${q.live_id})`);
      } else {
        console.error(`-> Failed to update Q${q.q_num}: ${putRes.status} ${await putRes.text()}`);
      }
    } else {
      console.log(`Inserting Live Q${q.q_num}...`);
      const postRes = await fetch(`https://edvedum.com/api/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resJson = await postRes.json();
        const createdId = resJson.question?.id || resJson.id || JSON.stringify(resJson);
        console.log(`-> Successfully inserted Live Q${q.q_num} as ID: ${createdId}`);
      } else {
        console.error(`-> Failed to insert Q${q.q_num}: ${postRes.status} ${await postRes.text()}`);
      }
    }
    await sleep(200);
  }

  console.log('\n--- VERIFYING LIVE STATUS AFTER SYNC ---');
  const verifyRes = await fetch('https://edvedum.com/api/question-bank?category=Physics', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await verifyRes.json();
  const list = Array.isArray(data) ? data : (data.questions || data.data || []);
  const epcQuestions = list.filter(q => {
    const ch = (q.chapter_name || q.chapter || '').toLowerCase();
    return ch.includes('electrostatic') || ch.includes('capacit');
  });

  const arInEpc = epcQuestions.filter(q => {
    const t = (q.question_type || '').toLowerCase();
    const isARType = t === 'assertion_reason' || t === 'assertion-reason';
    const hasARFields = Boolean(q.assertion_text && q.reason_text);
    const hasARText = /assertion/i.test(q.question_text || '') && /reason/i.test(q.question_text || '');
    return isARType || hasARFields || hasARText;
  });

  console.log(`Total questions in EPC on Live now: ${epcQuestions.length}`);
  console.log(`Total AR questions in EPC on Live now: ${arInEpc.length}`);
  arInEpc.forEach((q, i) => {
    console.log(`[#${i+1}] Live ID: ${q.id} | Topic: "${q.topic}" | Opt: ${q.correct_index}`);
  });

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
