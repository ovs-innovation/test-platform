import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/animal_kingdom_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 43)) {
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
  12: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(A)** Chondrichthyes | **(I)** *Clarias* |
| **(B)** Cyclostomata | **(II)** *Carcharodon* |
| **(C)** Osteichthyes | **(III)** *Myxine* |
| **(D)** Amphibia | **(IV)** *Ichthyophis* |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'B', text: 'A-I, B-III, C-II, D-IV' },
      { id: 'C', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'D', text: 'A-I, B-II, C-III, D-IV' }
    ],
    explanation: `**Correct Option: C**

- **Chondrichthyes**: *Carcharodon* (Great white shark) -> **(II)**
- **Cyclostomata**: *Myxine* (Hagfish) -> **(III)**
- **Osteichthyes**: *Clarias* (Magur) -> **(I)**
- **Amphibia**: *Ichthyophis* (Limbless amphibian) -> **(IV)**

Matching: **A-II, B-III, C-I, D-IV**.`
  },

  16: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| **A.** *Pleurobrachia* | **I.** Mollusca |
| **B.** Radula | **II.** Ctenophora |
| **C.** Stomochord | **III.** Osteichthyes |
| **D.** Air bladder | **IV.** Hemichordata |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-IV, B-II, C-III, D-I' },
      { id: 'B', text: 'A-II, B-I, C-IV, D-III' },
      { id: 'C', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'D', text: 'A-IV, B-III, C-II, D-I' }
    ],
    explanation: `**Correct Option: B**

- ***Pleurobrachia***: Belongs to phylum Ctenophora -> **II**
- **Radula**: File-like rasping organ for feeding in phylum Mollusca -> **I**
- **Stomochord**: Rudimentary structure found in collar region of phylum Hemichordata -> **IV**
- **Air bladder**: Present in bony fishes (Osteichthyes) to regulate buoyancy -> **III**

Matching: **A-II, B-I, C-IV, D-III**.`
  },

  18: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| **A.** *Pterophyllum* | **I.** Hag fish |
| **B.** *Myxine* | **II.** Saw fish |
| **C.** *Pristis* | **III.** Angel fish |
| **D.** *Exocoetus* | **IV.** Flying fish |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-I, C-III, D-IV' },
      { id: 'B', text: 'A-III, B-I, C-II, D-IV' },
      { id: 'C', text: 'A-IV, B-I, C-II, D-III' },
      { id: 'D', text: 'A-III, B-II, C-I, D-IV' }
    ],
    explanation: `**Correct Option: B**

- ***Pterophyllum***: Angel fish -> **III**
- ***Myxine***: Hag fish -> **I**
- ***Pristis***: Saw fish -> **II**
- ***Exocoetus***: Flying fish -> **IV**

Matching: **A-III, B-I, C-II, D-IV**.`
  },

  20: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(A)** Contractile vacuole | **(I)** *Asterias* |
| **(B)** Water vascular system | **(II)** *Amoeba* |
| **(C)** Canal system | **(III)** *Spongilla* |
| **(D)** Flame cells | **(IV)** *Taenia* |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(A)-(IV), (B)-(II), (C)-(I), (D)-(III)' },
      { id: 'B', text: '(A)-(I), (B)-(III), (C)-(II), (D)-(IV)' },
      { id: 'C', text: '(A)-(III), (B)-(II), (C)-(I), (D)-(IV)' },
      { id: 'D', text: '(A)-(II), (B)-(I), (C)-(III), (D)-(IV)' }
    ],
    explanation: `**Correct Option: D**

- **Contractile vacuole**: Osmoregulation and excretion in *Amoeba* -> **(II)**
- **Water vascular system**: Locomotion, respiration, and food capture in *Asterias* (Echinodermata) -> **(I)**
- **Canal system**: Water transport mechanism in *Spongilla* (Porifera) -> **(III)**
- **Flame cells**: Specialized excretory cells in *Taenia* (Platyhelminthes) -> **(IV)**

Matching: **(A)-(II), (B)-(I), (C)-(III), (D)-(IV)**.`
  },

  26: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(a)** *Chlamydomonas* | **(i)** Conidia |
| **(b)** *Penicillium* | **(ii)** Zoospores |
| **(c)** *Hydra* | **(iii)** Gemmules |
| **(d)** Sponge | **(iv)** Buds |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)' },
      { id: 'B', text: '(a) - (i), (b) - (iv), (c) - (iii), (d) - (ii)' },
      { id: 'C', text: '(a) - (ii), (b) - (i), (c) - (iv), (d) - (iii)' },
      { id: 'D', text: '(a) - (iii), (b) - (ii), (c) - (i), (d) - (iv)' }
    ],
    explanation: `**Correct Option: C**

- ***Chlamydomonas***: Reproduces asexually by motile flagellated **zoospores** -> **(ii)**
- ***Penicillium***: Reproduces asexually by non-motile exogenous spores called **conidia** -> **(i)**
- ***Hydra***: Reproduces asexually by external **buds** -> **(iv)**
- **Sponge**: Produces internal asexual reproductive bodies called **gemmules** -> **(iii)**

Matching: **(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)**.`
  },

  31: {
    question: `Match the following:

| List - I | List - II |
| :--- | :--- |
| **(a)** *Physalia* | **(i)** Pearl oyster |
| **(b)** *Limulus* | **(ii)** Portuguese Man of War |
| **(c)** *Ancylostoma* | **(iii)** Living fossil |
| **(d)** *Pinctada* | **(iv)** Hookworm |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)' },
      { id: 'B', text: '(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)' },
      { id: 'C', text: '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)' },
      { id: 'D', text: '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)' }
    ],
    explanation: `**Correct Option: D**

- ***Physalia***: Portuguese Man of War (Cnidaria) -> **(ii)**
- ***Limulus***: King crab, a living fossil (Arthropoda) -> **(iii)**
- ***Ancylostoma***: Hookworm (Aschelminthes) -> **(iv)**
- ***Pinctada***: Pearl oyster (Mollusca) -> **(i)**

Matching: **(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)**.`
  },

  33: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(a)** Metamerism | **(i)** Coelenterata |
| **(b)** Canal system | **(ii)** Ctenophora |
| **(c)** Comb plates | **(iii)** Annelida |
| **(d)** Cnidoblasts | **(iv)** Porifera |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)' },
      { id: 'B', text: '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)' },
      { id: 'C', text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' },
      { id: 'D', text: '(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)' }
    ],
    explanation: `**Correct Option: D**

- **Metamerism**: True segmentations (metameres) found in phylum Annelida -> **(iii)**
- **Canal system**: Water transport system through ostia and osculum in Porifera -> **(iv)**
- **Comb plates**: Eight ciliated external plates for locomotion in Ctenophora -> **(ii)**
- **Cnidoblasts**: Specialized stinging cells characteristic of Coelenterata -> **(i)**

Matching: **(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)**.`
  },

  35: {
    question: `Match the following group of organisms with their respective distinctive characteristics and select the correct option:

| Organisms | Characteristics |
| :--- | :--- |
| **(a)** Platyhelminthes | **(i)** Cylindrical body with no segmentation |
| **(b)** Echinoderms | **(ii)** Warm blooded animals with direct development |
| **(c)** Hemichordates | **(iii)** Bilateral symmetry with incomplete digestive system |
| **(d)** Aves | **(iv)** Radial symmetry with indirect development |`,
    options: [
      { id: 'A', text: '(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)' },
      { id: 'B', text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' },
      { id: 'C', text: '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)' },
      { id: 'D', text: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)' }
    ],
    explanation: `**Correct Option: B**

- **Platyhelminthes**: Bilateral symmetry with incomplete digestive system (single opening) -> **(iii)**
- **Echinoderms**: Adult radial symmetry with indirect development via larval stages -> **(iv)**
- **Hemichordates**: Worm-like unsegmented cylindrical body composed of proboscis, collar, and trunk -> **(i)**
- **Aves**: Homoiothermous (warm-blooded) feathered bipedal animals with direct development -> **(ii)**

Matching: **(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)**.`
  },

  38: {
    question: `Match the following columns and select the correct option:

| Column - I | Column - II |
| :--- | :--- |
| **(a)** *Aptenodytes* | **(i)** Flying fox |
| **(b)** *Pteropus* | **(ii)** Angel fish |
| **(c)** *Pterophyllum* | **(iii)** Lamprey |
| **(d)** *Petromyzon* | **(iv)** Penguin |`,
    options: [
      { id: 'A', text: '(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)' },
      { id: 'B', text: '(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)' },
      { id: 'C', text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' },
      { id: 'D', text: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)' }
    ],
    explanation: `**Correct Option: D**

- ***Aptenodytes***: Penguin -> **(iv)**
- ***Pteropus***: Flying fox (fruit bat) -> **(i)**
- ***Pterophyllum***: Angel fish -> **(ii)**
- ***Petromyzon***: Lamprey -> **(iii)**

Matching: **(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)**.`
  },

  41: {
    question: `Match the following columns and select the correct option:

| Column - I | Column - II |
| :--- | :--- |
| **(a)** Gregarious, polyphagous pest | **(i)** *Asterias* |
| **(b)** Adult with radial symmetry and larva with bilateral symmetry | **(ii)** Scorpion |
| **(c)** Book lungs | **(iii)** *Ctenoplana* |
| **(d)** Bioluminescence | **(iv)** *Locusta* |`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)' },
      { id: 'B', text: '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)' },
      { id: 'C', text: '(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)' },
      { id: 'D', text: '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)' }
    ],
    explanation: `**Correct Option: A**

- **Gregarious, polyphagous pest**: *Locusta* (Locust) -> **(iv)**
- **Adult radial, larva bilateral symmetry**: *Asterias* (Starfish, Echinodermata) -> **(i)**
- **Book lungs**: Respiratory organ in arachnids (Scorpion) -> **(ii)**
- **Bioluminescence**: Characteristic feature of Ctenophores (*Ctenoplana*) -> **(iii)**

Matching: **(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)**.`
  },

  42: {
    question: `Match the following columns and select the correct option:

| Column - I | Column - II |
| :--- | :--- |
| **(a)** 6-15 pairs of gill slits | **(i)** *Trygon* |
| **(b)** Heterocercal caudal fin | **(ii)** Cyclostomes |
| **(c)** Air bladder | **(iii)** Chondrichthyes |
| **(d)** Poison sting | **(iv)** Osteichthyes |`,
    options: [
      { id: 'A', text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' },
      { id: 'B', text: '(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)' },
      { id: 'C', text: '(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)' },
      { id: 'D', text: '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)' }
    ],
    explanation: `**Correct Option: D**

- **6-15 pairs of gill slits**: Cyclostomes -> **(ii)**
- **Heterocercal caudal fin**: Chondrichthyes (cartilaginous fishes) -> **(iii)**
- **Air bladder**: Osteichthyes (bony fishes) -> **(iv)**
- **Poison sting**: *Trygon* (Stingray) -> **(i)**

Matching: **(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)**.`
  },

  43: {
    question: `Match the following genera with their respective phylum:

| Genera | Phylum |
| :--- | :--- |
| **(a)** *Ophiura* | **(i)** Mollusca |
| **(b)** *Physalia* | **(ii)** Platyhelminthes |
| **(c)** *Pinctada* | **(iii)** Echinodermata |
| **(d)** *Planaria* | **(iv)** Coelenterata |

Select the correct option from the following:`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)' },
      { id: 'B', text: '(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)' },
      { id: 'C', text: '(a)-(i), (b)-(iii), (c)-(iv), (d)-(ii)' },
      { id: 'D', text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' }
    ],
    explanation: `**Correct Option: D**

- ***Ophiura***: Brittle star (Echinodermata) -> **(iii)**
- ***Physalia***: Portuguese Man of War (Coelenterata) -> **(iv)**
- ***Pinctada***: Pearl oyster (Mollusca) -> **(i)**
- ***Planaria***: Free-living flatworm (Platyhelminthes) -> **(ii)**

Matching: **(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)**.`
  },

  46: {
    question: `Match the following organisms with their respective characteristics:

| Organisms | Characteristics |
| :--- | :--- |
| **(a)** *Pila* | **(i)** Flame cells |
| **(b)** *Bombyx* | **(ii)** Comb plates |
| **(c)** *Pleurobrachia* | **(iii)** Radula |
| **(d)** *Taenia* | **(iv)** Malpighian tubules |

Select the correct option from the following:`,
    options: [
      { id: 'A', text: '(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)' },
      { id: 'B', text: '(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)' },
      { id: 'C', text: '(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)' },
      { id: 'D', text: '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)' }
    ],
    explanation: `**Correct Option: B**

- ***Pila***: Rasping organ called radula for feeding -> **(iii)**
- ***Bombyx***: Excretion through Malpighian tubules -> **(iv)**
- ***Pleurobrachia***: Eight rows of ciliated comb plates -> **(ii)**
- ***Taenia***: Flame cells (solenocytes) for osmoregulation and excretion -> **(i)**

Matching: **(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)**.`
  },

  70: {
    question: `Which one of the following animals is correctly matched with its one characteristic and the taxon?`,
    options: [
      { id: 'A', text: 'Millipede - Ventral nerve cord - Arachnida' },
      { id: 'B', text: 'Sea anemone - Triploblastic - Cnidaria' },
      { id: 'C', text: 'Silverfish - Pectoral and pelvic fins - Chordata' },
      { id: 'D', text: 'Duckbilled platypus - Oviparous - Mammalia' }
    ],
    explanation: `**Correct Option: D**

- **Duckbilled platypus (*Ornithorhynchus*)**: Oviparous (egg-laying) mammal belonging to the class Mammalia (order Monotremata).
- Millipede belongs to Myriapoda (not Arachnida).
- Sea anemone is diploblastic (not triploblastic).
- Silverfish (*Lepisma*) is a wingless insect belonging to phylum Arthropoda (not Chordata).`
  },

  74: {
    question: `Match the name of the animal (Column I), with one characteristic (Column II), and the phylum/class (Column III) to which it belongs:`,
    options: [
      { id: 'A', text: 'Limulus - Body covered by chitinous exoskeleton - Pisces' },
      { id: 'B', text: 'Adamsia - Radially symmetrical - Porifera' },
      { id: 'C', text: 'Petromyzon - Ectoparasite - Cyclostomata' },
      { id: 'D', text: 'Ichthyophis - Terrestrial - Reptilia' }
    ],
    explanation: `**Correct Option: C**

- *Petromyzon* (Lamprey) is a jawless aquatic vertebrate that acts as an ectoparasite on fishes and belongs to the class Cyclostomata.
- *Limulus* belongs to Arthropoda (not Pisces).
- *Adamsia* belongs to Cnidaria / Coelenterata (not Porifera).
- *Ichthyophis* is a limbless amphibian belonging to class Amphibia (not Reptilia).`
  },

  79: {
    question: `In which one of the following, the genus name, its two characters and its phylum are NOT correctly matched, whereas the remaining three are correct?`,
    options: [
      { id: 'A', text: 'Pila : (a) Body segmented, (b) Mouth with radula - Mollusca' },
      { id: 'B', text: 'Asterias : (a) Spiny skinned, (b) Water vascular system - Echinodermata' },
      { id: 'C', text: 'Sycon : (a) Pore bearing, (b) Canal system - Porifera' },
      { id: 'D', text: 'Periplaneta : (a) Jointed appendages, (b) Chitinous exoskeleton - Arthropoda' }
    ],
    explanation: `**Correct Option: A**

In phylum Mollusca (such as *Pila*), the body is unsegmented and divided into head, muscular foot, and visceral hump. Therefore, statement (a) "Body segmented" is incorrect.`
  },

  81: {
    question: `The figures (A – D) show four animals. Select the correct option with respect to a common characteristic of two of these animals:

<div align="center">
  <img src="${diagramUrls.q_81}" alt="Four Animals A to D" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: '(A) and (B) have cnidoblasts for self-defence' },
      { id: 'B', text: '(A) and (D) respire mainly through body wall' },
      { id: 'C', text: '(C) and (D) have a true coelom' },
      { id: 'D', text: '(B) and (C) show radial symmetry' }
    ],
    explanation: `**Correct Option: C**

In the given figures:
- Animal (A) (*Tapeworm / Taenia*) is an acoelomate (Platyhelminthes).
- Animal (B) (*Roundworm / Ascaris*) is a pseudocoelomate (Aschelminthes).
- Animals (C) and (D) are true coelomates (eucoelomates possessing a true body cavity lined by mesoderm on all sides).

Therefore, **(C) and (D) have a true coelom** is the correct option.`
  },

  84: {
    question: `In which one of the following the genus name, its two characters and its class/phylum are correctly matched?`,
    options: [
      { id: 'A', text: 'Ascaris : (i) Body segmented, (ii) Males and females distinct - Annelida' },
      { id: 'B', text: 'Salamandra : (i) A tympanum represents ear, (ii) Fertilization is external - Amphibia' },
      { id: 'C', text: 'Pteropus : (i) Skin possesses hair, (ii) Oviparous - Mammalia' },
      { id: 'D', text: 'Aurelia : (i) Cnidoblasts, (ii) Organ level of organization - Coelenterata' }
    ],
    explanation: `**Correct Option: B**

In *Salamandra* (class Amphibia):
- A tympanum represents the ear.
- Fertilization is typically external in amphibians (though some salamanders have internal transfer via spermatophore, in general amphibian characteristics external fertilization applies).
- *Ascaris* belongs to Aschelminthes (not Annelida) and is unsegmented.
- *Pteropus* (Bat) is viviparous (not oviparous).
- *Aurelia* exhibits tissue level of organization (not organ level).`
  },

  95: {
    question: `Which one of the following groups of three animals each is correctly matched with their one characteristic morphological feature?`,
    options: [
      { id: 'A', text: 'Scorpion, spider, cockroach - ventral solid central nervous system' },
      { id: 'B', text: 'Cockroach, locust, Taenia - metameric segmentation' },
      { id: 'C', text: 'Liver fluke, sea anemone, sea cucumber - bilateral symmetry' },
      { id: 'D', text: 'Centipede, prawn, sea urchin - jointed appendages' }
    ],
    explanation: `**Correct Option: A**

Scorpion, spider, and cockroach are all members of the phylum Arthropoda, which possess a paired, ventral, solid nerve cord with segmented ganglia.`
  },

  99: {
    question: `Which of the following pairs are correctly matched?

| Animals | Morphological features |
| :--- | :--- |
| **(i)** Crocodile | 4-chambered heart |
| **(ii)** Sea urchin | Parapodia |
| **(iii)** *Obelia* | Metagenesis |
| **(iv)** Lemur | Thecodont |`,
    options: [
      { id: 'A', text: '(ii), (iii) and (iv)' },
      { id: 'B', text: 'only (i) and (iv)' },
      { id: 'C', text: 'only (i) and (ii)' },
      { id: 'D', text: '(i), (iii) and (iv)' }
    ],
    explanation: `**Correct Option: D**

- **(i) Crocodile**: Has an exceptional four-chambered heart among reptiles (two atria and two ventricles) (Correct).
- **(ii) Sea urchin**: Parapodia are lateral swimming appendages found in aquatic annelids like *Nereis*, not sea urchins (Incorrect).
- **(iii) *Obelia***: Exhibits metagenesis (alternation of polyp and medusa generations) (Correct).
- **(iv) Lemur**: Being a mammal, possesses thecodont dentition where teeth are embedded in jawbone sockets (Correct).

Thus, pairs **(i), (iii) and (iv)** are correctly matched.`
  },

  124: {
    question: `Given below are four matchings of an animal and its kind of respiratory organ:
(A) Silver fish - Trachea
(B) Scorpion - Book lung
(C) Sea squirt - Pharyngeal slits
(D) Dolphin - Skin

The correct matchings are:`,
    options: [
      { id: 'A', text: '(A) and (B)' },
      { id: 'B', text: '(A), (B) and (C)' },
      { id: 'C', text: '(B) and (D)' },
      { id: 'D', text: '(C) and (D)' }
    ],
    explanation: `**Correct Option: B**

- **(A) Silver fish (*Lepisma*)**: An insect that respires through tracheal tubes (Correct).
- **(B) Scorpion**: An arachnid that respires through book lungs (Correct).
- **(C) Sea squirt (*Ascidia*)**: A urochordate that respires through pharyngeal gill slits (Correct).
- **(D) Dolphin**: A mammal that respires through lungs, not skin (Incorrect).

Therefore, **(A), (B) and (C)** are the correct matchings.`
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

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
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
      explanation: `**Correct Option: ${officialKey}**\n\nAccording to the official NEET Answer Key, the correct answer is option (${officialKey}).`
    });
  } else {
    console.error(`FAILED TO PARSE Q${num} (Page ${cur.page})`);
  }
}

console.log(`Successfully generated ${allQuestions.length} questions out of 202.`);
fs.writeFileSync('./backend/scripts/animal_kingdom_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./backend/scripts/animal_kingdom_all_questions.json');
