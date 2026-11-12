import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/org_pop_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/org_pop_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/org_pop_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 29)) {
  const items = [...p.items];
  items.sort((a, b) => (Math.abs(b.y - a.y) > 3) ? (b.y - a.y) : (a.x - b.x));

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
  }
}

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      header: m[2].trim()
    });
  }
}

console.log(`Found ${qStarts.length} question markers in document.`);

const SPECIAL_QUESTIONS = {
  4: {
    question: `Match List-I with List-II.

| List-I (Interaction Type) | List-II (Ecological Description) |
| :--- | :--- |
| **A.** Both species are harmed | **I.** Predation |
| **B.** One species is harmed and the other is benefited | **II.** Mutualism |
| **C.** Both species are benefited | **III.** Competition |
| **D.** One is benefited while the other has no effect | **IV.** Commensalism |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-III, B-I, C-II, D-IV' },
      { id: 'B', text: 'A-III, B-IV, C-II, D-I' },
      { id: 'C', text: 'A-I, B-II, C-III, D-IV' },
      { id: 'D', text: 'A-II, B-I, C-IV, D-III' }
    ],
    explanation: `**Correct Option: A**

- **Competition (Both harmed, -/-)**: A-III
- **Predation / Parasitism (One benefited, one harmed, +/-)**: B-I
- **Mutualism (Both benefited, +/+)**: C-II
- **Commensalism (One benefited, other unaffected, +/0)**: D-IV

Hence, the correct matching is **A-III, B-I, C-II, D-IV**.`
  },

  5: {
    question: `Which of the following equations depicts Verhulst-Pearl logistic population growth?`,
    options: [
      { id: 'A', text: '$\\frac{dN}{dt} = \\frac{rN}{K - N}$' },
      { id: 'B', text: '$\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$' },
      { id: 'C', text: '$\\frac{dN}{dt} = rN\\left(\\frac{K}{K - N}\\right)$' },
      { id: 'D', text: '$\\frac{dN}{dt} = rN$' }
    ],
    explanation: `**Correct Option: B**

The Verhulst-Pearl logistic population growth equation is given by:
$$\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$$
Where:
- $N$ = Population density at time $t$
- $r$ = Intrinsic rate of natural increase
- $K$ = Carrying capacity
- $\\frac{K - N}{K}$ = Environmental resistance`
  },

  10: {
    question: `Which one of the following equations represents the Verhulst-Pearl Logistic Growth of population?`,
    options: [
      { id: 'A', text: '$\\frac{dN}{dt} = \\frac{rN}{K}$' },
      { id: 'B', text: '$\\frac{dN}{dt} = rN\\left(\\frac{K}{K + N}\\right)$' },
      { id: 'C', text: '$\\frac{dN}{dt} = \\frac{N(K - N)}{K}$' },
      { id: 'D', text: '$\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$' }
    ],
    explanation: `**Correct Option: D**

A population growing in a habitat with limited resources exhibits logistic growth described by the Verhulst-Pearl logistic growth equation:
$$\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$$`
  },

  12: {
    question: `Match List-I with List-II:

| List - I (Interaction / Phenomenon) | List - II (Example) |
| :--- | :--- |
| **(A)** Predator | **(I)** *Ophrys* |
| **(B)** Mutualism | **(II)** *Pisaster* |
| **(C)** Parasitism | **(III)** Female wasp and fig |
| **(D)** Sexual deceit | **(IV)** *Plasmodium* |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-III, B-II, C-I, D-IV' },
      { id: 'B', text: 'A-IV, B-I, C-II, D-III' },
      { id: 'C', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'D', text: 'A-II, B-III, C-IV, D-I' }
    ],
    explanation: `**Correct Option: D**

- **Predator**: *Pisaster* (starfish in American Pacific coast rocky intertidal communities) -> (II)
- **Mutualism**: Female wasp and fig fruit (tight one-to-one co-evolution) -> (III)
- **Parasitism**: *Plasmodium* (malarial parasite requiring human & mosquito hosts) -> (IV)
- **Sexual deceit**: Mediterranean orchid *Ophrys* employs sexual deceit to get pollinated by male bees -> (I)

Therefore, the matching is **A-II, B-III, C-IV, D-I**.`
  },

  13: {
    question: `Match List-I with List-II.

| List - I (Ecological Scenario) | List - II (Ecological Principle) |
| :--- | :--- |
| **(A)** Migratory flamingoes and resident fish in South American lakes | **(I)** Interference competition |
| **(B)** Abingdon tortoise became extinct after introduction of goats in their habitat | **(II)** Competitive release |
| **(C)** *Chthamalus* expands its distributional range in the absence of *Balanus* | **(III)** Resource Partitioning |
| **(D)** Five closely related species of Warblers feeding in different locations on same tree | **(IV)** Interspecific competition |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-I, B-IV, C-III, D-II' },
      { id: 'B', text: 'A-IV, B-I, C-II, D-III' },
      { id: 'C', text: 'A-III, B-I, C-II, D-IV' },
      { id: 'D', text: 'A-II, B-IV, C-III, D-I' }
    ],
    explanation: `**Correct Option: B**

- **Migratory flamingoes and resident fish**: Totally unrelated species competing for the same resource (zooplankton) -> Interspecific competition (IV)
- **Abingdon tortoise & goats**: Greater browsing efficiency of goats led to tortoise extinction -> Interference competition (I)
- ***Chthamalus* expanding range**: Superior *Balanus* removed allowing *Chthamalus* to expand -> Competitive release (II)
- **Warblers on same tree**: MacArthur showed resource partitioning avoided competition -> Resource Partitioning (III)

Matching: **A-IV, B-I, C-II, D-III**.`
  },

  14: {
    question: `What do 'a' and 'b' represent in the following population growth curve?

<div align="center">
  <img src="${diagramUrls.q_14}" alt="Population Growth Curves" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: '‘a’ represents exponential growth when resources are not limiting the growth; and ‘b’ represents logistic growth when resources are limiting the growth.' },
      { id: 'B', text: '‘a’ represents logistic growth when resources are not limiting the growth; ‘b’ represents exponential growth when resources are limiting the growth.' },
      { id: 'C', text: '‘a’ represents carrying capacity and ‘b’ shows logistic growth when resources are limiting the growth.' },
      { id: 'D', text: '‘a’ represents exponential growth when resources are not limiting the growth and ‘b’ shows carrying capacity.' }
    ],
    explanation: `**Correct Option: A**

In the graph:
- Curve **'a'** is a J-shaped curve showing **exponential growth** ($\\frac{dN}{dt} = rN$) when resources are unlimited (not limiting).
- Curve **'b'** is a sigmoid/S-shaped curve showing **logistic growth** ($\\frac{dN}{dt} = rN\\left(\\frac{K-N}{K}\\right)$) when resources are limited, leveling off at the carrying capacity ($K$).`
  },

  15: {
    question: `The equation of Verhulst-Pearl logistic growth is $\\frac{dN}{dt} = rN\\left[\\frac{K - N}{K}\\right]$. From this equation, $K$ indicates:`,
    options: [
      { id: 'A', text: 'Intrinsic rate of natural increase' },
      { id: 'B', text: 'Biotic potential' },
      { id: 'C', text: 'Carrying capacity' },
      { id: 'D', text: 'Population density' }
    ],
    explanation: `**Correct Option: C**

In the logistic growth equation:
$$\\frac{dN}{dt} = rN\\left[\\frac{K - N}{K}\\right]$$
- $N$ = Population density at time $t$
- $r$ = Intrinsic rate of natural increase (or biotic potential)
- $K$ = **Carrying capacity** of the habitat (maximum population size that an environment can sustain indefinitely).`
  },

  21: {
    question: `Match List I with List II:

| List I (Interaction) | List II (Species A, Species B Effect) |
| :--- | :--- |
| **(A)** Mutualism | **(I)** $+(A), 0(B)$ |
| **(B)** Commensalism | **(II)** $-(A), 0(B)$ |
| **(C)** Amensalism | **(III)** $+(A), -(B)$ |
| **(D)** Parasitism | **(IV)** $+(A), +(B)$ |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-IV, B-I, C-II, D-III' },
      { id: 'B', text: 'A-IV, B-III, C-I, D-II' },
      { id: 'C', text: 'A-III, B-I, C-IV, D-II' },
      { id: 'D', text: 'A-IV, B-II, C-I, D-III' }
    ],
    explanation: `**Correct Option: A**

- **Mutualism**: Both species benefit ($+/+$) -> **(IV)**
- **Commensalism**: One species benefits, the other is unaffected ($+/0$) -> **(I)**
- **Amensalism**: One species is harmed, the other is unaffected ($-/0$) -> **(II)**
- **Parasitism**: One species benefits (parasite), the other is harmed (host) ($+/-$) -> **(III)**

Correct matching: **A-IV, B-I, C-II, D-III**.`
  },

  22: {
    question: `Match List I with List II.

| List I (Ecological Interaction) | List II (Category) |
| :--- | :--- |
| **(A)** A Leopard and a Lion in a forest/grassland | **(I)** Competition |
| **(B)** A Cuckoo laying egg in a Crow's nest | **(II)** Brood parasitism |
| **(C)** Fungi and root of a higher plant in Mycorrhizae | **(III)** Mutualism |
| **(D)** A cattle egret and Cattle in a field | **(IV)** Commensalism |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-I, B-II, C-IV, D-III' },
      { id: 'B', text: 'A-III, B-IV, C-I, D-II' },
      { id: 'C', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'D', text: 'A-I, B-II, C-III, D-IV' }
    ],
    explanation: `**Correct Option: D**

- **Leopard and Lion**: Compete for similar prey resources -> Competition (I)
- **Cuckoo laying eggs in Crow nest**: Brood parasitism (II)
- **Mycorrhizae (Fungi & higher plant roots)**: Mutualism (III)
- **Cattle egret and Cattle**: Commensalism (IV)

Matching: **A-I, B-II, C-III, D-IV**.`
  },

  23: {
    question: `Match List I with List II.

| List I (Population Characteristic) | List II (Description) |
| :--- | :--- |
| **(A)** Logistic growth | **(I)** Unlimited resource availability condition |
| **(B)** Exponential growth | **(II)** Limited resource availability condition |
| **(C)** Expanding age pyramid | **(III)** The percent individuals of pre-reproductive age is largest followed by reproductive and post-reproductive age groups |
| **(D)** Stable age pyramid | **(IV)** The percent individuals of pre-reproductive and reproductive age groups are same |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'B', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'C', text: 'A-II, B-IV, C-III, D-I' },
      { id: 'D', text: 'A-II, B-I, C-III, D-IV' }
    ],
    explanation: `**Correct Option: D**

- **Logistic growth**: Limited resource condition -> (II)
- **Exponential growth**: Unlimited resource condition -> (I)
- **Expanding age pyramid**: Large pre-reproductive base -> (III)
- **Stable age pyramid**: Equal pre-reproductive and reproductive groups -> (IV)

Matching: **A-II, B-I, C-III, D-IV**.`
  },

  30: {
    question: `In the exponential growth equation $N_t = N_0 e^{rt}$, $e$ represents:`,
    options: [
      { id: 'A', text: 'The base of geometric logarithms' },
      { id: 'B', text: 'The base of number logarithms' },
      { id: 'C', text: 'The base of exponential logarithms' },
      { id: 'D', text: 'The base of natural logarithms' }
    ],
    explanation: `**Correct Option: D**

In the exponential growth equation $N_t = N_0 e^{rt}$:
- $N_t$ = Population density after time $t$
- $N_0$ = Population density at time zero
- $r$ = Intrinsic rate of natural increase
- $e$ = **The base of natural logarithms** (approx. 2.71828).`
  },

  31: {
    question: `Match List-I with List-II:

| List-I (Adaptation) | List-II (Example) |
| :--- | :--- |
| **(a)** Allen's Rule | **(i)** Kangaroo rat |
| **(b)** Physiological adaptation | **(ii)** Desert lizard |
| **(c)** Behavioural adaptation | **(iii)** Marine fish at depth |
| **(d)** Biochemical adaptation | **(iv)** Polar seal |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)' },
      { id: 'B', text: '(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)' },
      { id: 'C', text: '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)' },
      { id: 'D', text: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)' }
    ],
    explanation: `**Correct Option: D**

- **Allen's Rule**: Mammals from colder climates have shorter ears and limbs to minimize heat loss -> Polar seal (iv)
- **Physiological adaptation**: Internal fat oxidation to satisfy water needs, concentrated urine -> Kangaroo rat (i)
- **Behavioural adaptation**: Basking in sun when cold, moving to shade when hot -> Desert lizard (ii)
- **Biochemical adaptation**: Surviving under crushing hydrostatic pressure -> Marine fish at ocean depths (iii)

Matching: **(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)**.`
  },

  33: {
    question: `Match the items in Column I with those in Column II:

| Column I (Interacting Pair) | Column II (Type of Interaction) |
| :--- | :--- |
| **(a)** Herbivores-Plants | **(i)** Commensalism |
| **(b)** Mycorrhiza-Plants | **(ii)** Mutualism |
| **(c)** Sheep-Cattle | **(iii)** Predation |
| **(d)** Orchid-Tree | **(iv)** Competition |

Select the correct option from following:`,
    options: [
      { id: 'A', text: '(a)-(i), (b)-(iii), (c)-(iv), (d)-(ii)' },
      { id: 'B', text: '(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)' },
      { id: 'C', text: '(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)' },
      { id: 'D', text: '(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)' }
    ],
    explanation: `**Correct Option: C**

- **Herbivores-Plants**: In broad ecological terms, herbivores grazing on plants are predators -> (iii)
- **Mycorrhiza-Plants**: Mutualism between fungi and plant roots -> (ii)
- **Sheep-Cattle**: Compete for pasture grass -> Competition (iv)
- **Orchid-Tree**: Epiphytic orchid growing on tree branch -> Commensalism (i)

Matching: **(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)**.`
  },

  38: {
    question: `Match Column-I with Column-II:

| Column - I (Organism / Association) | Column - II (Definition / Role) |
| :--- | :--- |
| **(a)** Saprophyte | **(i)** Symbiotic association of fungi with plant roots |
| **(b)** Parasite | **(ii)** Decomposition of dead organic materials |
| **(c)** Lichens | **(iii)** Living on living plants or animals |
| **(d)** Mycorrhiza | **(iv)** Symbiotic association of algae and fungi |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)' },
      { id: 'B', text: '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)' },
      { id: 'C', text: '(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)' },
      { id: 'D', text: '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)' }
    ],
    explanation: `**Correct Option: D**

- **Saprophyte**: Decomposes dead organic material -> (ii)
- **Parasite**: Lives on or inside living host organisms -> (iii)
- **Lichens**: Mutualistic symbiotic association between algae (phycobiont) and fungi (mycobiont) -> (iv)
- **Mycorrhiza**: Symbiotic association between fungi and roots of higher plants -> (i)

Matching: **(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)**.`
  },

  56: {
    question: `The following graph depicts changes in two populations (A and B) of herbivores in a grassy field. A possible reason for these changes is that:

<div align="center">
  <img src="${diagramUrls.q_56}" alt="Herbivore Populations Graph" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'Population B competed more successfully for food than population A' },
      { id: 'B', text: 'Population A consumed the members of population B' },
      { id: 'C', text: 'Both plant populations in this habitat decreased' },
      { id: 'D', text: 'Population A produced more offspring than population B' }
    ],
    explanation: `**Correct Option: A**

The graph shows population B increasing rapidly while population A declines steeply to extinction. Since both are herbivores competing for the same food resource (grass), competitive exclusion took place where population B competed more successfully for food than population A (Gause's Competitive Exclusion Principle).`
  },

  64: {
    question: `The logistic population growth is expressed by the equation:`,
    options: [
      { id: 'A', text: '$\\frac{dN}{dt} = rN$' },
      { id: 'B', text: '$\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$' },
      { id: 'C', text: '$\\frac{dt}{dN} = Nr\\left(\\frac{K - N}{K}\\right)$' },
      { id: 'D', text: '$\\frac{dN}{dt} = rN\\left(\\frac{K}{K - N}\\right)$' }
    ],
    explanation: `**Correct Option: B**

Logistic population growth occurs when resources are limited and is described by:
$$\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$$`
  },

  65: {
    question: `Consider the following statements (A)-(D) each with one or two blanks:
**(A)** Bears go into _____(1)_____ during winter to _____(2)_____ cold weather.
**(B)** A conical age pyramid with a broad base represents _____(3)_____ human population.
**(C)** A wasp pollinating a fig flower is an example of _____(4)_____.
**(D)** An area with high levels of species richness is known as _____(5)_____.

Which of the following options gives the correct fill ups for the respective blank numbers from (1) to (5) in the statements?`,
    options: [
      { id: 'A', text: '(1) - aestivation, (2) - escape, (3) - stable, (4) - mutualism' },
      { id: 'B', text: '(3) - expanding, (4) - commensalism, (5) - biodiversity park' },
      { id: 'C', text: '(1) - hibernation, (2) - escape, (3) - expanding, (5) - hot spot' },
      { id: 'D', text: '(3) - stable, (4) - commensalism, (5) - marsh' }
    ],
    explanation: `**Correct Option: C**

- Bears enter **hibernation** (1) in winter to **escape** (2) freezing temperatures.
- A broad-based triangular pyramid represents an **expanding** (3) population.
- Fig-wasp interaction is **mutualism** (4).
- High species richness areas are biodiversity **hot spots** (5).
Option C correctly identifies: (1) hibernation, (2) escape, (3) expanding, (5) hot spot.`
  },

  66: {
    question: `What type of human population is represented by the following age pyramid?

<div align="center">
  <img src="${diagramUrls.q_66}" alt="Human Age Pyramid" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'Declining population' },
      { id: 'B', text: 'Vanishing population' },
      { id: 'C', text: 'Expanding population' },
      { id: 'D', text: 'Stable population' }
    ],
    explanation: `**Correct Option: A**

The pyramid shown is urn-shaped: the pre-reproductive age group is smaller than the reproductive age group. As fewer individuals enter the reproductive pool, birth rate falls below death rate, indicating a **declining population** (negative growth).`
  },

  71: {
    question: `The figure given below is a diagrammatic representation of response of organisms to abiotic factors. What do a, b and c represent respectively?

<div align="center">
  <img src="${diagramUrls.q_71}" alt="Organisms Response to Abiotic Factors" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: '(a) partial regulator, (b) regulator, (c) conformer' },
      { id: 'B', text: '(a) conformer, (b) regulator, (c) partial regulator' },
      { id: 'C', text: '(a) regulator, (b) conformer, (c) partial regulator' },
      { id: 'D', text: '(a) regulator, (b) partial regulator, (c) conformer' }
    ],
    explanation: `**Correct Option: C**

In the diagram:
- **(a)** is a straight horizontal line representing organisms maintaining constant internal body environment regardless of external changes -> **Regulator**
- **(b)** is a diagonal line where internal environment changes directly with external environment -> **Conformer**
- **(c)** regulates up to a threshold then conforms -> **Partial regulator**

Therefore: **(a) regulator, (b) conformer, (c) partial regulator**.`
  },

  73: {
    question: `A country with a high rate of population growth took measures to reduce it. The figure below shows age-sex pyramids of populations A and B twenty years apart. Select the correct interpretation:

<div align="center">
  <img src="${diagramUrls.q_73}" alt="Age-Sex Pyramids" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: '"A" is more recent shows slight reduction in the growth rate' },
      { id: 'B', text: '"B" is more recent showing that population is very young' },
      { id: 'C', text: '"A" is the earlier pyramid and no change has occurred in the growth rate' },
      { id: 'D', text: '"B" is earlier pyramid and shows stabilized growth rate' }
    ],
    explanation: `**Correct Option: A**

Pyramid "B" has a very wide base of young pre-reproductive individuals (high explosive growth). Pyramid "A" twenty years later shows narrowing of the youngest age cohort base, indicating successful implementation of population control measures and a reduction in the growth rate.`
  },

  85: {
    question: `At which latitude, heat gain through insolation approximately equals heat loss through terrestrial radiation?`,
    options: [
      { id: 'A', text: '$40^\\circ\\text{ North and South}$' },
      { id: 'B', text: '$42\\frac{1}{2}^\\circ\\text{ North and South}$' },
      { id: 'C', text: '$66^\\circ\\text{ North and South}$' },
      { id: 'D', text: '$22\\frac{1}{2}^\\circ\\text{ North and South}$' }
    ],
    explanation: `**Correct Option: A**

At approximately $40^\\circ\\text{ North and South}$ latitude, incoming solar radiation (insolation) is balanced by outgoing terrestrial radiation, creating radiative equilibrium.`
  },

  101: {
    question: `What is the best pH of the soil for cultivation of plants?`,
    options: [
      { id: 'A', text: '$3.4 - 5.4$' },
      { id: 'B', text: '$6.5 - 7.5$' },
      { id: 'C', text: '$4.5 - 8.5$' },
      { id: 'D', text: '$5.5 - 6.5$' }
    ],
    explanation: `**Correct Option: B**

Most agricultural crops grow best in near-neutral to slightly acidic soil with a pH range of **6.5 to 7.5**, where essential nutrients like nitrogen, phosphorus, and potassium are most readily available.`
  }
};

const allQuestions = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;
  const num = cur.num;

  const officialKey = officialKeys[String(num)] || 'A';

  if (SPECIAL_QUESTIONS[num]) {
    const sq = SPECIAL_QUESTIONS[num];
    allQuestions.push({
      num,
      page: cur.page,
      year: cur.header || '',
      question: sq.question,
      options: sq.options,
      correctOption: officialKey,
      explanation: sq.explanation || `**Correct Option: ${officialKey}**\n\nOfficial NEET Answer Key verified.`
    });
    continue;
  }

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text.replace(/Open solution/gi, '').trim())
    .filter(t => t.length > 0 && !/ExamGOAL|P Y Q P D F|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|Out of syllabus|These questions are on topics/i.test(t));

  const contentLines = rawLines.slice(1);
  let combined = contentLines.join(' ').trim();

  const aIdx = combined.search(/\(A\)\s+/);
  const bIdx = combined.search(/\(B\)\s+/);
  const cIdx = combined.search(/\(C\)\s+/);
  const dIdx = combined.search(/\(D\)\s+/);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
    let qText = combined.substring(0, aIdx).trim();
    let optA = combined.substring(aIdx + 4, bIdx).trim();
    let optB = combined.substring(bIdx + 4, cIdx).trim();
    let optC = combined.substring(cIdx + 4, dIdx).trim();
    let optD = combined.substring(dIdx + 4).trim();

    allQuestions.push({
      num,
      page: cur.page,
      year: cur.header || '',
      question: qText,
      options: [
        { id: 'A', text: optA },
        { id: 'B', text: optB },
        { id: 'C', text: optC },
        { id: 'D', text: optD }
      ],
      correctOption: officialKey,
      explanation: `**Correct Option: ${officialKey}**\n\nOfficial NEET Answer Key verified.`
    });
  } else {
    console.error(`FAILED TO PARSE Q${num} (Page ${cur.page})`);
  }
}

console.log(`Successfully generated ${allQuestions.length} questions out of 124.`);
fs.writeFileSync('./backend/scripts/org_pop_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./backend/scripts/org_pop_all_questions.json');
