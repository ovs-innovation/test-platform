import { parseAnswerKeyAndSolutions, parseAnswerKeyOnly } from '../src/utils/pdfQuestionParser.js';

const sample = `
1. (3) : Prop root or pillar roots, when root arises from branches of plant.
2. (2) : Basophils secrete histamine.
3. (1) : Lateral roots originate.
4. (2) : The anatomical setup.
10. (1) :The mode of arrangement.
11. (4) :
In given figure,
a-pulmonary vein carries oxygenated blood.
25. (4) :
(a) is air entering the lungs.
32. (4) :The given reaction:-
Hb + O2 <=> HbO2
38. (2) :(i) Inspiratory capacity (IC) : Tidal volume +
Inspiratory reserve volume (TV+IRV)
(ii) Vital Capacity (VC) : Tidal volume + Inspiratory
Reserve Volume + Expiratory Reserve Volume
`;

console.log('--- parseAnswerKeyOnly ---');
console.log(parseAnswerKeyOnly(sample));

console.log('--- parseAnswerKeyAndSolutions ---');
const res = parseAnswerKeyAndSolutions(sample);
console.log('Keys:', res.answerKeyMap);
console.log('Solutions:');
for (const [k, v] of Object.entries(res.solutionsMap)) {
  console.log(`[Q${k}]: ${v.slice(0, 60)}...`);
}
