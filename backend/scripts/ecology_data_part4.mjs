// Part 4: Section B - Assertion-Reason Type Questions (Q1 to Q20)
// Booklet Chapter 5: Organisms and Populations (Pages 90 - 91)

const AR_DIRECTIONS = "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n(1) If both Assertion & Reason are true and reason is the correct explanation of assertion, then mark (1).\n(2) If both Assertion & Reason are true but reason is not the correct explanation of assertion, then mark (2).\n(3) If Assertion is true statement but Reason is false, then mark (3).\n(4) If both Assertion and Reason are false statements, then mark (4).";

const AR_OPTIONS = [
  "If both Assertion & Reason are true and reason is the correct explanation of assertion",
  "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
  "If Assertion is true statement but Reason is false",
  "If both Assertion and Reason are false statements"
];

export const ecologyPart4 = [
  {
    booklet_qno: 1,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Physiological and behavioural means also allow the organism to maintain homeostasis.",
    reason: "Organisms which show this phenomenon are called conformers.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Physiological and behavioural means also allow the organism to maintain homeostasis.\nReason (R): Organisms which show this phenomenon are called conformers.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Medium",
    solution: "Assertion is true as regulators maintain homeostasis by physiological (like sweating, shivering) and behavioural means. Reason is false because organisms capable of maintaining homeostasis are called regulators, not conformers. Conformers cannot maintain a constant internal environment and their body temperature/osmotic concentration changes with the ambient environment."
  },
  {
    booklet_qno: 2,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Many fish thrive in Antarctic waters where temperature is always below zero.",
    reason: "Antifreeze solutes are present in the body fluids of these animals.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Many fish thrive in Antarctic waters where temperature is always below zero.\nReason (R): Antifreeze solutes are present in the body fluids of these animals.`,
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    difficulty: "Medium",
    solution: "Both Assertion and Reason are true, and Reason correctly explains the Assertion. Antarctic fishes thrive in waters below 0°C because their body fluids contain antifreeze solutes (antifreeze glycoproteins) which lower the freezing point of their body fluids and prevent ice crystal formation."
  },
  {
    booklet_qno: 3,
    section: "B",
    question_type: "assertion_reason",
    assertion: "As we climb a hill, nausea, fatigue and heart palpitations occur.",
    reason: "At hill top atmospheric pressure is low.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): As we climb a hill, nausea, fatigue and heart palpitations occur.\nReason (R): At hill top atmospheric pressure is low.`,
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    difficulty: "Easy",
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. At high altitude (hill top), atmospheric pressure is low, causing hypoxia (inadequate oxygen availability), which results in altitude sickness symptoms such as nausea, fatigue, and heart palpitations."
  },
  {
    booklet_qno: 4,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Predation is a conduit for energy transfer across trophic levels.",
    reason: "It does not help in controlling prey populations.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Predation is a conduit for energy transfer across trophic levels.\nReason (R): It does not help in controlling prey populations.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Easy",
    solution: "Assertion is true because predators transfer energy fixed by plants to higher trophic levels, acting as conduits. Reason is false because predators play a crucial role in controlling prey populations; in the absence of predators, prey species could achieve very high population densities and cause ecosystem instability."
  },
  {
    booklet_qno: 5,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Organisms which cannot maintain thermal and osmotic balance with environment are called conformers.",
    reason: "Thermoregulation is energetically expensive process, especially for large animals.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Organisms which cannot maintain thermal and osmotic balance with environment are called conformers.\nReason (R): Thermoregulation is energetically expensive process, especially for large animals.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Medium",
    solution: "Assertion is true because conformers cannot maintain a constant internal environment (homeostasis) and their body temperature and osmotic concentration change with ambient conditions. Reason is false because thermoregulation is energetically expensive particularly for small animals (like shrews and hummingbirds) due to their high surface area to volume ratio, not large animals."
  },
  {
    booklet_qno: 6,
    section: "B",
    question_type: "assertion_reason",
    assertion: "The difference between biotic potential values of 1981 and 2001 in India was 0.0029.",
    reason: "The magnitude of r = 0.0205 in 1981 which reached 0.0176 in 2001, in India.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): The difference between biotic potential values of 1981 and 2001 in India was 0.0029.\nReason (R): The magnitude of r = 0.0205 in 1981 which reached 0.0176 in 2001, in India.`,
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    difficulty: "Hard",
    solution: "Both Assertion and Reason are true, and Reason correctly explains Assertion. The intrinsic rate of natural increase (r, biotic potential) for the human population in India was 0.0205 in 1981 and 0.0176 in 2001. The difference is: 0.0205 - 0.0176 = 0.0029."
  },
  {
    booklet_qno: 7,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Visiting flamingos and resident fishes in south American lakes are the example of \"competition between unrelated species\".",
    reason: "Competition can occur between closely related and unrelated species.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Visiting flamingos and resident fishes in south American lakes are the example of "competition between unrelated species".\nReason (R): Competition can occur between closely related and unrelated species.`,
    options: AR_OPTIONS,
    correct_index: 1, // (2) Both true, R is not the direct complete explanation (or 1 depending on convention; 2 is standard because explanation is that both compete for common zooplankton)
    difficulty: "Medium",
    solution: "Both Assertion and Reason are true, but Reason is not the complete explanation. Visiting flamingos and resident fishes in shallow South American lakes compete for their common resource, zooplankton. This exemplifies that totally unrelated species can compete for the same limiting resource."
  },
  {
    booklet_qno: 8,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Five closely related species of warblers avoid competition by changing foraging pattern.",
    reason: "Darwin found that 14 species of finches extinct in Galapagos islands.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Five closely related species of warblers avoid competition by changing foraging pattern.\nReason (R): Darwin found that 14 species of finches extinct in Galapagos islands.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Medium",
    solution: "Assertion is true; MacArthur showed that five closely related species of warblers living on the same tree coexisted and avoided competition by resource partitioning (different foraging patterns). Reason is false because Darwin found that finches adapted and diversified into 14 distinct species on the Galapagos islands via adaptive radiation; they did not become extinct."
  },
  {
    booklet_qno: 9,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Barnacles growing on the back of whale is commensalism.",
    reason: "Barnacles are benefitted and whale is harmed.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Barnacles growing on the back of whale is commensalism.\nReason (R): Barnacles are benefitted and whale is harmed.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Easy",
    solution: "Assertion is true; barnacles on the back of a whale represent commensalism (+, 0). Reason is false because in commensalism, one organism benefits while the other is neither harmed nor benefited. The whale derives neither benefit nor harm."
  },
  {
    booklet_qno: 10,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Pseudocopulation occurs between orchid and female bee.",
    reason: "All petals of orchid bear an uncanny resemblance to the male of bee.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Pseudocopulation occurs between orchid and female bee.\nReason (R): All petals of orchid bear an uncanny resemblance to the male of bee.`,
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    difficulty: "Medium",
    solution: "Both Assertion and Reason are false. In Mediterranean orchid Ophrys, pseudocopulation occurs between the male bee and the orchid flower because one petal of the flower bears an uncanny resemblance to the female bee in size, colour and markings."
  },
  {
    booklet_qno: 11,
    section: "B",
    question_type: "assertion_reason",
    assertion: "In altitude sickness binding capacity of haemoglobin decrease.",
    reason: "All four O2 binding sites are not saturated due to enhanced RBC production under limited atmospheric O2 availability.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): In altitude sickness binding capacity of haemoglobin decrease.\nReason (R): All four O2 binding sites are not saturated due to enhanced RBC production under limited atmospheric O2 availability.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Hard",
    solution: "Assertion is true; to compensate for altitude sickness and low oxygen availability, the body decreases the binding affinity/capacity of hemoglobin so that oxygen is readily released to the tissues. Reason is false because low saturation is caused by low atmospheric pO2, not by enhanced RBC production (enhanced RBC production is an adaptive response to increase total oxygen carrying capacity)."
  },
  {
    booklet_qno: 12,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Urn shaped age pyramid shows a negative growth of human population.",
    reason: "There are fewer individuals in pre-reproductive group than the large number of reproductive individuals.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Urn shaped age pyramid shows a negative growth of human population.\nReason (R): There are fewer individuals in pre-reproductive group than the large number of reproductive individuals.`,
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    difficulty: "Medium",
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. An urn-shaped age pyramid has a narrow pre-reproductive base, meaning fewer young individuals enter the reproductive phase in subsequent years compared to the current reproductive cohort, leading to declining (negative) population growth."
  },
  {
    booklet_qno: 13,
    section: "B",
    question_type: "assertion_reason",
    assertion: "The prickly pear cactus introduced into Australia caused havoc by spreading rapidly.",
    reason: "The invasive cactus was brought under control by application of weedicide.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): The prickly pear cactus introduced into Australia caused havoc by spreading rapidly.\nReason (R): The invasive cactus was brought under control by application of weedicide.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Easy",
    solution: "Assertion is true; prickly pear cactus introduced into Australia in the early 1920s caused havoc by spreading over millions of hectares of rangeland. Reason is false because it was brought under control by biological control — introducing a cactus-feeding predator (a moth, Cactoblastis cactorum) from its native habitat, not by weedicides."
  },
  {
    booklet_qno: 14,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Tropical forests are rich in vegetation.",
    reason: "They receive maximum precipitation which is about 200 cm (mean annual precipitation).",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Tropical forests are rich in vegetation.\nReason (R): They receive maximum precipitation which is about 200 cm (mean annual precipitation).`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Medium",
    solution: "Assertion is true; tropical forests harbor high species richness and dense vegetation due to warm and humid conditions throughout the year. Reason is false because mean annual precipitation in tropical rain forests can reach up to 400 - 450 cm (not just 200 cm, which is much lower than the maximum precipitation received)."
  },
  {
    booklet_qno: 15,
    section: "B",
    question_type: "assertion_reason",
    assertion: "All the cormorants in a wetland and rats in an abandoned dwelling are the examples of population.",
    reason: "They are the group of organisms of one species occupying a defined geographical area.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): All the cormorants in a wetland and rats in an abandoned dwelling are the examples of population.\nReason (R): They are the group of organisms of one species occupying a defined geographical area.`,
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    difficulty: "Easy",
    solution: "Both Assertion and Reason are true, and Reason correctly explains Assertion. A population is defined as a group of individuals belonging to the same species that live in a defined geographical area, share or compete for similar resources, and potentially interbreed. Hence, cormorants in a wetland or rats in an abandoned house are typical populations."
  },
  {
    booklet_qno: 16,
    section: "B",
    question_type: "assertion_reason",
    assertion: "A plover enters the mouth of a crocodile to feed on the parasitic leeches.",
    reason: "Both bird and crocodiles are benefitted with each other so they are categorised in mutualism not proto-cooperation.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): A plover enters the mouth of a crocodile to feed on the parasitic leeches.\nReason (R): Both bird and crocodiles are benefitted with each other so they are categorised in mutualism not proto-cooperation.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Medium",
    solution: "Assertion is true; the Egyptian plover bird cleans leeches from the crocodile's mouth, gaining food while the crocodile is cleaned of parasites. Reason is false because this interaction is non-obligatory (facultative) and therefore categorised as proto-cooperation, whereas mutualism is strictly obligatory."
  },
  {
    booklet_qno: 17,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Removal of Pisaster from enclosed intertidal area, caused population explosion of 10 species of invertebrates.",
    reason: "Removal of predators always cause an increase in prey population.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Removal of Pisaster from enclosed intertidal area, caused population explosion of 10 species of invertebrates.\nReason (R): Removal of predators always cause an increase in prey population.`,
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    difficulty: "Medium",
    solution: "Both Assertion and Reason are false. In Robert Paine's field experiment, removal of the starfish predator Pisaster led to the EXTINCTION of more than 10 species of invertebrates within a year due to intense interspecific competition among preys. Hence, removal of a keystone predator does not always increase prey diversity or population; it can cause extinctions."
  },
  {
    booklet_qno: 18,
    section: "B",
    question_type: "assertion_reason",
    assertion: "In brood parasitism, cuckoo is parasite while crow is host bird.",
    reason: "Size and color of eggs reduce the chances of parasite bird detecting the foreign eggs.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): In brood parasitism, cuckoo is parasite while crow is host bird.\nReason (R): Size and color of eggs reduce the chances of parasite bird detecting the foreign eggs.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Easy",
    solution: "Assertion is true; the parasitic bird (cuckoo) lays its eggs in the nest of the host bird (crow). Reason is false because the eggs of the parasitic bird have evolved to resemble the host's egg in size and colour to reduce the chances of the HOST bird (not the parasite bird) detecting and ejecting the foreign eggs."
  },
  {
    booklet_qno: 19,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Immigration is added in deaths (number) while emigration is added in births (number) to calculated population size.",
    reason: "Population size will increase if number of (B + I) < number of (D + E).",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Immigration is added in deaths (number) while emigration is added in births (number) to calculated population size.\nReason (R): Population size will increase if number of (B + I) < number of (D + E).`,
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    difficulty: "Easy",
    solution: "Both Assertion and Reason are false. In calculating population density: N_{t+1} = N_t + [(B + I) - (D + E)]. Thus Immigration (I) is added to Births (B), and Emigration (E) is added to Deaths (D). Furthermore, population size increases only if (B + I) > (D + E); if (B + I) < (D + E), population size decreases."
  },
  {
    booklet_qno: 20,
    section: "B",
    question_type: "assertion_reason",
    assertion: "Decline in J-shaped population is density triggered like algal blooms.",
    reason: "This curve is obtained in geometric fashion when resources are limited.",
    question: `${AR_DIRECTIONS}\n\nAssertion (A): Decline in J-shaped population is density triggered like algal blooms.\nReason (R): This curve is obtained in geometric fashion when resources are limited.`,
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    difficulty: "Medium",
    solution: "Assertion is true; exponential or J-shaped growth shows a rapid exponential rise followed by a sudden crash when carrying capacity is exceeded or nutrients are exhausted, as seen in algal blooms. Reason is false because a J-shaped (exponential) growth curve is obtained when resources are unlimited; when resources are limited, a sigmoid (logistic) growth curve is obtained."
  }
];
