import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const STANDARD_OPTIONS = [
  { key: 'A', text: 'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A).' },
  { key: 'B', text: 'Both Assertion (A) and Reason (R) are true, but Reason (R) is not the correct explanation of Assertion (A).' },
  { key: 'C', text: 'Assertion (A) is true, but Reason (R) is false.' },
  { key: 'D', text: 'Both Assertion (A) and Reason (R) are false.' }
];

const QUESTIONS = [
  {
    qNum: 1,
    assertion: 'Sickle cell anaemia is resulted due to a transversion.',
    reason: "A pyrimidine 'T' is substituted by 'A' in DNA sequence normally coding for glutamic acid.",
    correctIndex: 0, // Option A
    solution: "Sickle cell anemia is caused by a point mutation in the beta-globin chain gene where the 6th codon on the DNA template strand changes from 3'-CTC-5' to 3'-CAC-5' (or GAG to GTG in the coding strand). In the template strand, a pyrimidine 'T' is replaced by a purine 'A'. The substitution of a pyrimidine by a purine (or vice versa) is termed a transversion. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    qNum: 2,
    assertion: 'Non-disjunction of chromosomes at the time of gametogenesis results in the gain or loss of a chromosome in gametes.',
    reason: 'Aneuploidy arise due to non-disjunction.',
    correctIndex: 1, // Option B
    solution: 'Non-disjunction refers to the failure of homologous chromosomes or sister chromatids to separate properly during meiosis, producing gametes with an extra chromosome (n+1) or missing a chromosome (n-1). Aneuploidy is the resulting condition where an organism has abnormal chromosome numbers due to this non-disjunction. Both statements are factually correct, but Reason is not the explanation of why non-disjunction causes the gain or loss in gametes.'
  },
  {
    qNum: 3,
    assertion: 'A reciprocal cross can distinguish between nuclear and cytoplasmic inheritance.',
    reason: 'It does not help to distinguish sex linked and autosomal inheritance.',
    correctIndex: 2, // Option C
    solution: 'A reciprocal cross reverses the phenotypes associated with each sex of parent. In cytoplasmic inheritance, traits are inherited through the maternal cytoplasm, so reciprocal crosses produce different outcomes, distinguishing it from nuclear inheritance. Similarly, in sex-linked inheritance, reciprocal crosses also yield different results in male vs female offspring compared to autosomal crosses. Hence, reciprocal crosses DO help distinguish sex-linked from autosomal inheritance. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 4,
    assertion: "In Turner's syndrome, females lack secondary sexual characters.",
    reason: 'They have less number of autosomes than normal female.',
    correctIndex: 2, // Option C
    solution: "Turner's syndrome is caused by the absence of one of the X chromosomes, resulting in a karyotype of 45, XO (44 autosomes + 1 X chromosome). Such females are sterile as ovaries are rudimentary, and they lack secondary sexual characteristics. They have the normal number of autosomes (44), but have one fewer sex chromosome (allosome). Therefore, Assertion is true, but Reason is false."
  },
  {
    qNum: 5,
    assertion: 'Holandric genes are found on Y chromosome.',
    reason: 'Inheritance of holandric genes is always from father to son.',
    correctIndex: 1, // Option B
    solution: 'Holandric genes are genes located specifically on the non-homologous region of the Y chromosome (such as the SRY gene). Because males possess XY chromosomes and pass their Y chromosome only to male progeny, holandric traits are transmitted exclusively from father to son. Both statements are true, but Reason does not explain why holandric genes are located on the Y chromosome (rather, father-to-son transmission is the consequence of their Y-linkage).'
  },
  {
    qNum: 6,
    assertion: 'A dihybrid always produces four kinds of gametes.',
    reason: 'Law of segregation and law of independent assortment are always followed during gametogenesis.',
    correctIndex: 3, // Option D
    solution: 'A dihybrid does not always produce four types of gametes; if complete linkage exists between the two gene loci on the same chromosome with no crossing over, only two parental types of gametes are produced. Furthermore, while the Law of Segregation is universally followed, the Law of Independent Assortment is NOT always followed because linked genes do not assort independently. Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 7,
    assertion: 'Snapdragon flower colour is best suited to study the phenomenon of incomplete dominance.',
    reason: 'In heterozygous condition, the colour of flower of snapdragon exhibit characteristics of both the parents.',
    correctIndex: 2, // Option C
    solution: 'Flower color in Snapdragon (Antirrhinum majus) is the classic model for incomplete dominance, where a cross between true-breeding red (RR) and white (rr) yields pink (Rr) flowers. In the heterozygous state (Rr), the phenotype is an intermediate blend (pink), rather than expressing characteristics of both parents simultaneously (which defines codominance). Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 8,
    assertion: 'A geneticist crossed two plants and obtained the progenies with ratio of 50% tall and 50% dwarf.',
    reason: 'The result obtained is due to the phenomenon of independent assortment of characters.',
    correctIndex: 2, // Option C
    solution: 'Crossing a heterozygous tall plant (Tt) with a homozygous dwarf plant (tt) is a monohybrid test cross that yields 50% tall (Tt) and 50% dwarf (tt) offspring. This 1:1 ratio is governed by the Law of Segregation (purity of gametes) for a single gene pair. The Law of Independent Assortment requires two or more pairs of contrasting characters (dihybrid or polyhybrid crosses). Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 9,
    assertion: 'In birds, females are heterogametic while males are homogametic.',
    reason: 'In birds, females have XY sex chromosomes while males have XX sex chromosomes.',
    correctIndex: 2, // Option C
    solution: 'In birds, sex determination follows the ZW-ZZ system where females have two different sex chromosomes (ZW, heterogametic) and produce two types of eggs (50% with Z and 50% with W), while males have two identical sex chromosomes (ZZ, homogametic) producing only Z-bearing sperms. They do not have XX and XY chromosomes (which is the system in mammals and Drosophila). Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 10,
    assertion: 'A true breeding line shows the stable trait inheritance in which few characters are blended.',
    reason: 'Mendel performed artificial hybridisation to obtain true-breeding lines.',
    correctIndex: 3, // Option D
    solution: 'A true-breeding line is one that has undergone continuous self-pollination and shows stable trait inheritance and expression for several generations without any blending of characters. Mendel established true-breeding lines through repeated self-pollination (selfing), not through artificial hybridization (which he used to cross different true-breeding varieties). Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 11,
    assertion: 'A gamete generally contains either of the traits but not both.',
    reason: 'Factors or alleles controlling the traits occur in a pair.',
    correctIndex: 1, // Option B
    solution: "According to Mendel's Law of Segregation, during gametogenesis the two alleles of a gene pair segregate from each other so that a gamete carries only one allele of the pair (gametes are haploid and pure for each trait). While alleles exist in pairs in diploid cells, the reason a gamete contains only one allele is due to the segregation of homologous chromosomes during meiosis. Both statements are true, but Reason is not the complete explanation of Assertion."
  },
  {
    qNum: 12,
    assertion: 'Translocation, inversion and deletion are chromosomal aberration.',
    reason: 'Chromosomal aberrations arise due to aneuploidy.',
    correctIndex: 2, // Option C
    solution: 'Translocation, inversion, duplication, and deletion are structural chromosomal aberrations resulting from chromosomal breakage and rearrangement. Aneuploidy is a numerical chromosomal disorder characterized by the gain or loss of individual chromosomes (2n ± 1), not structural alterations. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 13,
    assertion: 'Father cannot transmit his X-chromosome to his sons.',
    reason: 'Among children, sons may be haemophilic only when his mother is carrier for the trait.',
    correctIndex: 2, // Option C
    solution: 'Males carry XY sex chromosomes and transmit only the Y chromosome to their sons and the X chromosome to their daughters. Hence, a father can never transmit his X chromosome to his sons. Sons can be haemophilic if the mother is a carrier (XHXh) OR if the mother is herself haemophilic (XhXh). Saying sons can be haemophilic "only" when the mother is a carrier is factually incorrect. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 14,
    assertion: 'The monohybrid phenotypic test cross ratio is 1 : 1.',
    reason: 'In such cross, the ratio obtained is due to complete linkage between two genes.',
    correctIndex: 2, // Option C
    solution: 'A monohybrid test cross (such as Tt × tt) yields a 1:1 phenotypic and genotypic ratio (50% dominant phenotype, 50% recessive phenotype). A monohybrid cross investigates the inheritance of only a single gene, so linkage between two genes is completely irrelevant. Therefore, Assertion is true, but Reason is false.'
  },
  {
    qNum: 15,
    assertion: 'Haemophilia disease is extremely rare in female individuals.',
    reason: 'Female individuals have two copies of X chromosome which enable them to avoid haemophilia.',
    correctIndex: 0, // Option A
    solution: 'Haemophilia is a sex-linked recessive disorder. Because females possess two X chromosomes, a single recessive mutant allele on one X chromosome is masked by the normal dominant allele on the other X chromosome, making the female an unaffected carrier. A female can only suffer from haemophilia if she is homozygous recessive (XhXh), requiring both a carrier/affected mother and a haemophilic father, making it extremely rare in females. Therefore, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 16,
    assertion: 'Polyploidy is very common among animals.',
    reason: 'Failure in segregation of chromosomes during cell division results in polyploidy.',
    correctIndex: 3, // Option D
    solution: 'Polyploidy is common in plants (e.g., wheat, potato, banana) but extremely rare in animals because it disrupts sex determination and normal embryonic development. Furthermore, failure of chromatids to segregate during cell division leads to aneuploidy (gain/loss of individual chromosomes), whereas polyploidy is caused by the failure of cytokinesis after telophase resulting in an entire extra set of chromosomes. Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 17,
    assertion: 'Females with XO genotype have rudimentary ovaries and lack secondary sexual characteristics.',
    reason: 'The XO genotype represents the nullisomy.',
    correctIndex: 2, // Option C
    solution: "Females with XO genotype suffer from Turner's syndrome (45, XO) and exhibit sterile, rudimentary ovaries, short stature, and an absence of secondary sexual characteristics. An XO genotype represents monosomy (2n - 1, the loss of a single chromosome from a diploid pair), whereas nullisomy refers to the loss of both chromosomes of a homologous pair (2n - 2). Therefore, Assertion is true, but Reason is false."
  },
  {
    qNum: 18,
    assertion: 'The transmission of chromosomes as well as genes, from one generation to next, is always independent of each other.',
    reason: 'The experimental proof of independent assortment of genes was given by Thomas Morgan.',
    correctIndex: 3, // Option D
    solution: 'The transmission of genes is not always independent because genes located close to each other on the same chromosome are linked and tend to be inherited together as a unit. Moreover, Thomas Hunt Morgan provided experimental proof of the Chromosomal Theory of Inheritance and discovered linkage and recombination, which contradicted the universal application of independent assortment. Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 19,
    assertion: 'Alleles are slightly different forms of the same gene.',
    reason: 'Genes which code for a pair of contrasting traits are known as alleles.',
    correctIndex: 1, // Option B
    solution: 'According to NCERT, genes that code for a pair of contrasting traits are known as alleles; they represent slightly different molecular forms of the same gene (differing slightly in nucleotide sequences). Both statements are accurate NCERT definitions, but Reason does not explain why alleles are slightly different forms of the same gene. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.'
  },
  {
    qNum: 20,
    assertion: 'The dominance is an autonomous feature of a gene.',
    reason: 'In heterozygous condition, one allele always mask the expression of another allele.',
    correctIndex: 3, // Option D
    solution: 'As stated in NCERT, dominance is not an autonomous feature of a gene or the product it codes for; it depends on the gene product, the phenotype produced, and the particular phenotype chosen for examination. In addition, in heterozygous states exhibiting incomplete dominance or codominance, one allele does not mask the other allele. Therefore, both Assertion and Reason are false.'
  },
  {
    qNum: 21,
    assertion: "Mendel's results on the inheritance of characters remain hidden till 1900.",
    reason: "Mendel's concept of factors, stable inheritance and use of mathematics to explain biological phenomena was not accepted by his contemporaries.",
    correctIndex: 0, // Option A
    solution: "Mendel published his work in 1865, but it remained unnoticed and unrecognized until 1900. His contemporaries did not accept his concept of discrete, non-blending factors to explain continuous natural variations, nor did they accept the novel application of mathematics and statistics to biology, alongside limited communication at the time. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    qNum: 22,
    assertion: 'Polygenic inheritance cannot be observed within an individual.',
    reason: 'Pleiotropy exhibits multiple phenotypic expression as it is controlled by multiple genes.',
    correctIndex: 2, // Option C
    solution: 'Polygenic traits (such as human skin color and height) are controlled by multiple genes with additive effects, producing continuous quantitative phenotypic variation that can only be measured and observed across a population of individuals, not within a single individual. Pleiotropy refers to a single gene controlling multiple phenotypic effects (not multiple genes). Therefore, Assertion is true, but Reason is false.'
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('--- SEEDING BOTANY AR QUESTIONS: PRINCIPLES OF INHERITANCE AND VARIATION ---');

    // 1. Get Botany Subject ID
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'botany'");
    if (subRes.rows.length === 0) {
      throw new Error("Subject 'Botany' not found in database.");
    }
    const subjectId = subRes.rows[0].id;
    console.log(`Subject: Botany (ID: ${subjectId})`);

    // 2. Resolve Chapter: "Principles of Inheritance and Variation"
    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) = 'principles of inheritance and variation' OR LOWER(name) LIKE '%principles of inheritance%')",
      [subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Principles of Inheritance and Variation', subjectId]
      );
      chapterId = createChap.rows[0].id;
      console.log(`Created new chapter 'Principles of Inheritance and Variation' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter '${chapRes.rows[0].name}' (ID: ${chapterId})`);
    }

    // 3. Insert the 22 questions
    let inserted = 0;
    for (const q of QUESTIONS) {
      const questionText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;

      // Check if already exists to prevent duplicate inserts
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE subject_id = $1 AND question_type = 'assertion_reason' AND assertion_text = $2",
        [subjectId, q.assertion]
      );

      if (existing.rows.length > 0) {
        console.log(`[Q${q.qNum}] Already exists (ID: ${existing.rows[0].id}). Updating...`);
        await client.query(
          `UPDATE question_bank SET
            question_text = $1,
            assertion_text = $2,
            reason_text = $3,
            options = $4,
            correct_index = $5,
            correct_indices = $6,
            solution = $7,
            category = 'Botany',
            subject = 'Botany',
            chapter = 'Principles of Inheritance and Variation',
            topic = 'Principles of Inheritance and Variation',
            chapter_id = $8,
            difficulty = 'medium',
            marks = 4,
            status = 'available'
          WHERE id = $9`,
          [
            questionText,
            q.assertion,
            q.reason,
            JSON.stringify(STANDARD_OPTIONS),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            q.solution,
            chapterId,
            existing.rows[0].id
          ]
        );
        inserted++;
      } else {
        const insertRes = await client.query(
          `INSERT INTO question_bank (
            question_type,
            question_text,
            assertion_text,
            reason_text,
            options,
            correct_index,
            correct_indices,
            marks,
            difficulty,
            category,
            status,
            solution,
            subject_id,
            subject,
            chapter_id,
            chapter,
            topic,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW()) RETURNING id`,
          [
            'assertion_reason',
            questionText,
            q.assertion,
            q.reason,
            JSON.stringify(STANDARD_OPTIONS),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            4,
            'medium',
            'Botany',
            'available',
            q.solution,
            subjectId,
            'Botany',
            chapterId,
            'Principles of Inheritance and Variation',
            'Principles of Inheritance and Variation'
          ]
        );
        console.log(`[Q${q.qNum}] Inserted successfully with ID: ${insertRes.rows[0].id}`);
        inserted++;
      }
    }

    console.log(`\nSuccessfully processed ${inserted}/${QUESTIONS.length} Assertion-Reason questions into 'Principles of Inheritance and Variation'!`);

  } catch (err) {
    console.error('Error seeding questions:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();

