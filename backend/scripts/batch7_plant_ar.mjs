// Batch 7: Plant Kingdom Assertion - Reason Questions (18 questions)
const arOptions = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batch7Questions = [
  {
    question_type: "assertion_reason",
    assertion_text: "In most of the spermatophytes, endosperm is a pre-fertilisation structure which represents food laden female gametophyte.",
    reason_text: "It is a new triploid material derived from triple fertilisation.",
    question_text: "Assertion (A): In most of the spermatophytes, endosperm is a pre-fertilisation structure which represents food laden female gametophyte.\nReason (R): It is a new triploid material derived from triple fertilisation.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Endosperm in Spermatophytes",
    solution: "Assertion is true for gymnosperms where the endosperm is the haploid female gametophyte formed prior to fertilization. Reason is false because triploid endosperm formed through triple fertilization is exclusive to angiosperms."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Direct pollination occurs in the life cycle of naked seeded plants.",
    reason_text: "Stigma is absent in these plants.",
    question_text: "Assertion (A): Direct pollination occurs in the life cycle of naked seeded plants.\nReason (R): Stigma is absent in these plants.",
    options: arOptions,
    correct_index: 0,
    difficulty: "medium",
    topic: "Direct Pollination in Gymnosperms",
    solution: "In gymnosperms (naked seeded plants), an ovary, style, and stigma are completely absent. Therefore, wind-borne pollen grains land directly into the pollination droplet at the micropyle of the ovule (direct pollination)."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Spore is the first cell of gametophytic generation in bryophytes.",
    reason_text: "Gametophyte is independent.",
    question_text: "Assertion (A): Spore is the first cell of gametophytic generation in bryophytes.\nReason (R): Gametophyte is independent.",
    options: arOptions,
    correct_index: 1,
    difficulty: "easy",
    topic: "Bryophyte Generations",
    solution: "Both statements are correct. The haploid spore is the initial cell of the gametophytic generation, and in bryophytes, the gametophyte is the independent, dominant, photosynthetic generation. However, independence does not explain why the spore is the first cell."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Zygote is the first cell of sporophytic generation in all vascular plants.",
    reason_text: "It is retained within the venter of archegonium in all embryophytes.",
    question_text: "Assertion (A): Zygote is the first cell of sporophytic generation in all vascular plants.\nReason (R): It is retained within the venter of archegonium in all embryophytes.",
    options: arOptions,
    correct_index: 1,
    difficulty: "medium",
    topic: "Sporophytic Generation & Embryophytes",
    solution: "Both statements are true. The diploid zygote produced by fertilization initiates the sporophytic generation. In embryophytes (archegoniates), the zygote is retained within the venter of the archegonium to develop into an embryo."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Mosses reduce the impact of falling rain and prevent soil erosion.",
    reason_text: "They form dense mats on the soil.",
    question_text: "Assertion (A): Mosses reduce the impact of falling rain and prevent soil erosion.\nReason (R): They form dense mats on the soil.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Ecological Importance of Mosses",
    solution: "Mosses form dense carpets and mats over the soil surface, which cushion the impact of falling rain and bind soil particles together, thereby preventing soil erosion."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Red algae occupies deepest position in oceanic water among all algae.",
    reason_text: "Red light penetrates deepest.",
    question_text: "Assertion (A): Red algae occupies deepest position in oceanic water among all algae.\nReason (R): Red light penetrates deepest.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Rhodophyceae Ocean Depth",
    solution: "Assertion is true as red algae can live at the greatest depths in oceans where very little light penetrates. Reason is false because blue-green light penetrates deepest into water (red light is absorbed in the upper layers). Red algae contain r-phycoerythrin which absorbs high-energy blue-green light."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Numerical taxonomy, which is now easily carried out using computers, is based on all the observable characteristics.",
    reason_text: "Each character is given equal importance and at the same time hundreds of characters can be considered.",
    question_text: "Assertion (A): Numerical taxonomy, which is now easily carried out using computers, is based on all the observable characteristics.\nReason (R): Each character is given equal importance and at the same time hundreds of characters can be considered.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Numerical Taxonomy",
    solution: "Numerical taxonomy uses computers to evaluate all observable characteristics by assigning numbers and codes to each character. Each character is given equal weightage, allowing hundreds of traits to be compared simultaneously."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "A classification for flowering plants, given by George Bentham and J.D. Hooker, was based on natural affinities among the organisms.",
    reason_text: "He considered not only the external features but also internal features, like ultra-structure, anatomy, embryology and phytochemistry.",
    question_text: "Assertion (A): A classification for flowering plants, given by George Bentham and J.D. Hooker, was based on natural affinities among the organisms.\nReason (R): He considered not only the external features but also internal features, like ultra-structure, anatomy, embryology and phytochemistry.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Natural Classification System",
    solution: "Bentham and Hooker proposed a natural classification system based on natural affinities. Such systems take into account not only external morphology but also internal anatomical, embryological, ultrastructural, and phytochemical traits."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Member of phaeophyceae vary in colour from olive green to various shades of brown.",
    reason_text: "Members of phaeophyceae possess chlorophyll a, c, carotenoids and xanthophylls.",
    question_text: "Assertion (A): Member of phaeophyceae vary in colour from olive green to various shades of brown.\nReason (R): Members of phaeophyceae possess chlorophyll a, c, carotenoids and xanthophylls.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Phaeophyceae Colouration",
    solution: "Brown algae vary in colour from olive green to brown depending upon the amount of the xanthophyll pigment, fucoxanthin, present in them along with chlorophyll a, c, and carotenoids."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Member of Rhodophyceae are red due to the pre-dominance of the red pigment, r-phycoerythrin in their body.",
    reason_text: "r-phycoerythrin absorbs blue-green wavelength of light and reflect red colour.",
    question_text: "Assertion (A): Member of Rhodophyceae are red due to the pre-dominance of the red pigment, r-phycoerythrin in their body.\nReason (R): r-phycoerythrin absorbs blue-green wavelength of light and reflect red colour.",
    options: arOptions,
    correct_index: 0,
    difficulty: "medium",
    topic: "Rhodophyceae Pigmentation",
    solution: "Red algae appear red due to the predominant accessory pigment r-phycoerythrin, which absorbs blue-green light that penetrates deep water and reflects red light back."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Species of Sphagnum, a moss, is used as packing materials for trans-shipment of living material.",
    reason_text: "Species of Sphagnum have capacity to hold water.",
    question_text: "Assertion (A): Species of Sphagnum, a moss, is used as packing materials for trans-shipment of living material.\nReason (R): Species of Sphagnum have capacity to hold water.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Sphagnum Uses",
    solution: "Sphagnum possesses specialized large dead hyaline cells with reticulate thickenings that have an immense water-holding capacity, making it ideal packing material for trans-shipment of living plant seedlings and cut flowers."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "The sex organs in Bryophytes are jacketed.",
    reason_text: "Members of Bryophytes are terrestrial plants.",
    question_text: "Assertion (A): The sex organs in Bryophytes are jacketed.\nReason (R): Members of Bryophytes are terrestrial plants.",
    options: arOptions,
    correct_index: 0,
    difficulty: "medium",
    topic: "Bryophyte Sex Organs Adaptation",
    solution: "As an adaptation to land/terrestrial life, bryophytes evolved multicellular sex organs protected by a sterile layer of jacket cells to prevent the gametes from desiccating."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Sexual reproduction in Volvox is oogamous and accompanied by complex post-fertilisation developments.",
    reason_text: "Volvox shows absence of chloroplast.",
    question_text: "Assertion (A): Sexual reproduction in Volvox is oogamous and accompanied by complex post-fertilisation developments.\nReason (R): Volvox shows absence of chloroplast.",
    options: arOptions,
    correct_index: 3,
    difficulty: "medium",
    topic: "Volvox Reproduction",
    solution: "Both statements are false. Although Volvox is oogamous, complex post-fertilization developments occur in red algae (not green algae). Furthermore, Volvox cells possess green, cup-shaped chloroplasts."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Liverworts fail to spread to a new locality through fragmentation.",
    reason_text: "Gemmae are helpful in propagating liverworts in different localities.",
    question_text: "Assertion (A): Liverworts fail to spread to a new locality through fragmentation.\nReason (R): Gemmae are helpful in propagating liverworts in different localities.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Liverworts Vegetative Reproduction",
    solution: "Assertion is false because vegetative reproduction by fragmentation of thalli is very common and effective for spreading liverworts. Reason is true as gemmae are specialized multicellular asexual buds that detach and disperse to form new individuals."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "The gymnosperms are plants in which the ovules are not enclosed by any ovary wall and remain exposed.",
    reason_text: "In gymnosperms, the male and the female gametophytes do not have an independent free-living existence.",
    question_text: "Assertion (A): The gymnosperms are plants in which the ovules are not enclosed by any ovary wall and remain exposed.\nReason (R): In gymnosperms, the male and the female gametophytes do not have an independent free-living existence.",
    options: arOptions,
    correct_index: 1,
    difficulty: "easy",
    topic: "Gymnosperm Ovules & Gametophytes",
    solution: "Both statements are correct. In gymnosperms, ovules are naked (not enclosed by an ovary wall). Additionally, gymnosperm gametophytes lack free-living existence and are retained on the sporophyte. However, lack of independent gametophytes is not the reason for the ovules being naked."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "In majority of the pteridophytes homosporous condition exists.",
    reason_text: "Genera like Selaginella and Salvinia, two types/kinds of spores, macro (large) and micro (small) spores are produced.",
    question_text: "Assertion (A): In majority of the pteridophytes homosporous condition exists.\nReason (R): Genera like Selaginella and Salvinia, two types/kinds of spores, macro (large) and micro (small) spores are produced.",
    options: arOptions,
    correct_index: 1,
    difficulty: "easy",
    topic: "Homospory and Heterospory in Pteridophytes",
    solution: "Both statements are true. Majority of pteridophytes produce only one kind of spore (homosporous). Selaginella and Salvinia are notable heterosporous exceptions, but their heterospory does not explain why the majority of pteridophytes are homosporous."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "The predominant stage of the life cycle of a moss is the gametophyte which consists of two stages. The 2nd stage is the leafy stage which develops directly from a spore.",
    reason_text: "The sporophyte in mosses is less elaborate than that in liverworts.",
    question_text: "Assertion (A): The predominant stage of the life cycle of a moss is the gametophyte which consists of two stages. The 2nd stage is the leafy stage which develops directly from a spore.\nReason (R): The sporophyte in mosses is less elaborate than that in liverworts.",
    options: arOptions,
    correct_index: 3,
    difficulty: "medium",
    topic: "Moss Life Cycle Statements",
    solution: "Both statements are false. In mosses, the primary protonema develops directly from the spore, while the leafy stage develops from secondary protonema as a lateral bud. Furthermore, the sporophyte in mosses is MORE elaborate than that in liverworts."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Unlike bryophytes and pteridophytes, in gymnosperms the male and the female gametophytes donot have an independent free-living existence.",
    reason_text: "They remain within the sporangia retained on the sporophytes.",
    question_text: "Assertion (A): Unlike bryophytes and pteridophytes, in gymnosperms the male and the female gametophytes donot have an independent free-living existence.\nReason (R): They remain within the sporangia retained on the sporophytes.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Gymnosperm Gametophyte Retention",
    solution: "In gymnosperms, gametophytes have no independent free-living existence because they complete their development and remain enclosed within the sporangia (microsporangia and megasporangia) on the parent sporophyte."
  }
];
