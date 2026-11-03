// Zoology - Neural Control and Coordination: Batch AR (AR 1 to AR 18)
// 18 Assertion-Reason Questions

const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const neuralBatchAR = [
  {
    question_text: "Assertion (A): Ophthalmic branch of trigeminal nerve innervates the extrinsic muscle of the eye.\nReason (R): It is motor nerve and controls the movement of the eye ball.",
    question_type: "assertion_reason",
    assertion_text: "Ophthalmic branch of trigeminal nerve innervates the extrinsic muscle of the eye.",
    reason_text: "It is motor nerve and controls the movement of the eye ball.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. The ophthalmic nerve (V1) is a purely sensory branch of cranial nerve V (trigeminal nerve) that supplies sensation to the forehead, scalp, and upper eyelid. Extrinsic muscles of the eyeball are motor-innervated by cranial nerves III (Oculomotor), IV (Trochlear), and VI (Abducens)."
  },
  {
    question_text: "Assertion (A): Removal of the motor area of the cerebrum will make it impossible for a person to pick up a glass on the table.\nReason (R): Motor area is responsible for coordinated voluntary movements of the body.",
    question_type: "assertion_reason",
    assertion_text: "Removal of the motor area of the cerebrum will make it impossible for a person to pick up a glass on the table.",
    reason_text: "Motor area is responsible for coordinated voluntary movements of the body.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion. The primary motor cortex (located in the precentral gyrus of the frontal lobe) initiates and controls all voluntary motor activities of skeletal muscles, such as reaching and picking up objects."
  },
  {
    question_text: "Assertion (A): Loss of the secretory activity of substantia nigra is associated with Parkinson's disease.\nReason (R): Substantia nigra is associated with secretion of acetylcholine.",
    question_type: "assertion_reason",
    assertion_text: "Loss of the secretory activity of substantia nigra is associated with Parkinson's disease.",
    reason_text: "Substantia nigra is associated with secretion of acetylcholine.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. The substantia nigra consists of dopaminergic neurons that secrete dopamine (not acetylcholine). Destruction or degeneration of these neurons leads to dopamine depletion in the striatum, causing Parkinson's disease."
  },
  {
    question_text: "Assertion (A): Hypothalamus is known as real master gland.\nReason (R): It maintains homeostasis, controls involuntary behaviour and emotional reactions and secretes neurohormones.",
    question_type: "assertion_reason",
    assertion_text: "Hypothalamus is known as real master gland.",
    reason_text: "It maintains homeostasis, controls involuntary behaviour and emotional reactions and secretes neurohormones.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Although the pituitary was traditionally called the master gland, the hypothalamus synthesizes releasing and inhibiting neurohormones that directly control the pituitary gland, as well as integrating the autonomic nervous system to maintain body homeostasis."
  },
  {
    question_text: "Assertion (A): Refractory period limits the rate at which nerve impulse can be conducted.\nReason (R): A nerve fibre cannot be stimulated again during relative refractory period even if the stimulus is of the same strength.",
    question_type: "assertion_reason",
    assertion_text: "Refractory period limits the rate at which nerve impulse can be conducted.",
    reason_text: "A nerve fibre cannot be stimulated again during relative refractory period even if the stimulus is of the same strength.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. The refractory period (the brief recovery time during which Na+ channels are inactivated and K+ channels are open) sets an absolute upper limit on the maximum frequency of action potential generation and enforces unidirectional propagation."
  },
  {
    question_text: "Assertion (A): Impulse transmission across an electrical synapse is always faster than that across a chemical synapse.\nReason (R): Electrical impulses can flow directly from one neuron into the other across electrical synapse.",
    question_type: "assertion_reason",
    assertion_text: "Impulse transmission across an electrical synapse is always faster than that across a chemical synapse.",
    reason_text: "Electrical impulses can flow directly from one neuron into the other across electrical synapse.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. At an electrical synapse, the membranes of pre- and post-synaptic neurons are in very close proximity and connected by gap junctions, allowing local ionic current to flow directly between neurons with no synaptic delay."
  },
  {
    question_text: "Assertion (A): A nerve fibre can transmit about 1000 impulses per second.\nReason (R): Refractory period is very short, being only about one millisecond.",
    question_type: "assertion_reason",
    assertion_text: "A nerve fibre can transmit about 1000 impulses per second.",
    reason_text: "Refractory period is very short, being only about one millisecond.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Because the absolute refractory period in a mammalian nerve fibre lasts only ~1 millisecond (0.001 s), the theoretical maximum firing frequency is 1 / 0.001 = 1,000 action potentials per second."
  },
  {
    question_text: "Assertion (A): Conduction of nerve impulse through neurons is unidirectional.\nReason (R): Neurotransmitters are released from axon terminals, never from dendrites.",
    question_type: "assertion_reason",
    assertion_text: "Conduction of nerve impulse through neurons is unidirectional.",
    reason_text: "Neurotransmitters are released from axon terminals, never from dendrites.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Synaptic vesicles containing neurotransmitters are localized exclusively in the pre-synaptic axon terminals, and neurotransmitter receptors are localized on the post-synaptic dendrites/cell body, ensuring strict one-way (unidirectional) transmission."
  },
  {
    question_text: "Assertion (A): In human, brain reaches the adult size by six years of age.\nReason (R): In evolution, the size of human brain is increasing so gestation period is slightly decreasing.",
    question_type: "assertion_reason",
    assertion_text: "In human, brain reaches the adult size by six years of age.",
    reason_text: "In evolution, the size of human brain is increasing so gestation period is slightly decreasing.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. A child's brain undergoes rapid myelination and arborization, achieving nearly 90-95% of its adult cranial size by 6 years of age. In human evolution, encephalization required birth at an altricial state before the fetal skull becomes too large for the bipedal pelvic birth canal."
  },
  {
    question_text: "Assertion (A): The forebrain receives and integrates visual, tactile and auditory impulses.\nReason (R): The cerebrum integrates information received from auditory system.",
    question_type: "assertion_reason",
    assertion_text: "The forebrain receives and integrates visual, tactile and auditory impulses.",
    reason_text: "The cerebrum integrates information received from auditory system.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. The forebrain (specifically the thalamus and associative cerebral cortex) receives and integrates multimodal sensory inputs including vision, touch, and audition. Auditory perception is localized to the temporal lobe."
  },
  {
    question_text: "Assertion (A): The speed of nerve impulse conduction depends on diameter of the axon.\nReason (R): Vertebrates have axons of lesser diameter.",
    question_type: "assertion_reason",
    assertion_text: "The speed of nerve impulse conduction depends on diameter of the axon.",
    reason_text: "Vertebrates have axons of lesser diameter.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. Conduction velocity increases with axonal diameter because larger diameter reduces longitudinal internal electrical resistance. Vertebrates possess myelinated axons of varying diameters that utilize saltatory conduction to achieve high conduction velocities without requiring giant unmyelinated axons (like those found in squid)."
  },
  {
    question_text: "Assertion (A): The human brain is covered by cranial meninges.\nReason (R): The middle layer called arachnoid is the characteristic of mammalian brain only.",
    question_type: "assertion_reason",
    assertion_text: "The human brain is covered by cranial meninges.",
    reason_text: "The middle layer called arachnoid is the characteristic of mammalian brain only.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. The human brain is enveloped by three connective tissue layers: outer dura mater, middle arachnoid mater, and inner pia mater. In lower vertebrates (like amphibians), only two meninges exist, making a distinct arachnoid mater characteristic of mammals."
  },
  {
    question_text: "Assertion (A): Pons is a part of brain stem.\nReason (R): Pons consists of tracts that interconnect different regions of brain.",
    question_type: "assertion_reason",
    assertion_text: "Pons is a part of brain stem.",
    reason_text: "Pons consists of tracts that interconnect different regions of brain.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. The brain stem comprises midbrain, pons, and medulla oblongata. The pons consists of white matter fibre tracts that serve as a bridge interconnecting different cerebral, cerebellar, and spinal cord centres."
  },
  {
    question_text: "Assertion (A): GABA is an inhibitory neurotransmitter.\nReason (R): It binds with post-synaptic receptors, opens the K+ gates and hyperpolarises the membrane, making it less excitable.",
    question_type: "assertion_reason",
    assertion_text: "GABA is an inhibitory neurotransmitter.",
    reason_text: "It binds with post-synaptic receptors, opens the K+ gates and hyperpolarises the membrane, making it less excitable.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. GABA (gamma-aminobutyric acid) is the major inhibitory neurotransmitter in the central nervous system; binding to its receptors opens chloride (GABA-A) or potassium (GABA-B) channels, causing membrane hyperpolarisation (IPSP) and reducing neuronal excitability."
  },
  {
    question_text: "Assertion (A): Sympathetic system includes thoracolumbar outflow of spinal nerves.\nReason (R): Post ganglionic fibres of sympathetic system that terminates in sweat glands are adrenergic.",
    question_type: "assertion_reason",
    assertion_text: "Sympathetic system includes thoracolumbar outflow of spinal nerves.",
    reason_text: "Post ganglionic fibres of sympathetic system that terminates in sweat glands are adrenergic.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. The sympathetic nervous system arises from thoracic and upper lumbar spinal cord segments (T1 to L2/L3). However, postganglionic sympathetic fibres that innervate sweat glands are an exception: they are cholinergic (release acetylcholine), not adrenergic."
  },
  {
    question_text: "Assertion (A): Impulse transmission across an electrical synapse is always faster.\nReason (R): Electrical synapse does not exhibit synaptic delay.",
    question_type: "assertion_reason",
    assertion_text: "Impulse transmission across an electrical synapse is always faster.",
    reason_text: "Electrical synapse does not exhibit synaptic delay.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Because electrical synapses transfer ionic currents directly through low-resistance connexon gap junctions, they do not require chemical neurotransmitter synthesis, release, or diffusion, effectively eliminating synaptic delay."
  },
  {
    question_text: "Assertion (A): Unmyelinated nerve fibres are not enclosed by Schwann cells and myelin sheath.\nReason (R): Unmyelinated nerve fibres are absent in CNS.",
    question_type: "assertion_reason",
    assertion_text: "Unmyelinated nerve fibres are not enclosed by Schwann cells and myelin sheath.",
    reason_text: "Unmyelinated nerve fibres are absent in CNS.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. According to NCERT, unmyelinated nerve fibres in the peripheral nervous system are indeed enclosed by Schwann cells, but the Schwann cells do not form a concentric myelin sheath around them. Unmyelinated fibres are widely present throughout the autonomous and somatic neural systems as well as within the central nervous system."
  },
  {
    question_text: "Assertion (A): The cerebral aqueduct passes through the midbrain.\nReason (R): The ventral portion of midbrain consists of corpora quadrigemina.",
    question_type: "assertion_reason",
    assertion_text: "The cerebral aqueduct passes through the midbrain.",
    reason_text: "The ventral portion of midbrain consists of corpora quadrigemina.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. A canal called the cerebral aqueduct passes longitudinally through the midbrain. However, the four rounded swellings of corpora quadrigemina are located on the DORSAL portion of the midbrain (the ventral portion consists of the cerebral peduncles / crura cerebri)."
  }
];

