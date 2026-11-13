import vm from 'vm';

const q32 = `
const q = {
    question_number: 32,
    question_text: "The compound that will react most readily with gaseous bromine has the formula:",
    options: [
      { option_key: "A", option_text: "$\\\\text{C}_3\\\\text{H}_6$" },
      { option_key: "B", option_text: "$\\\\text{C}_2\\\\text{H}_2$" },
      { option_key: "C", option_text: "$\\\\text{C}_4\\\\text{H}_{10}$ },
      { option_key: "D", option_text: "$\\\\text{C}_2\\\\text{H}_4$" }
    ],
    correct_option: "A",
    solution_text: "Propene ($\\\\text{C}_3\\\\text{H}_6$) has an electron-donating methyl group ($+I$ and hyperconjugation) attached to the double bond, increasing the electron density and nucleophilicity of the alkene $\\\\pi$-bond compared to ethene ($\\\\text{C}_2\\\\text{H}_4$). Alkynes ($\\\\text{C}_2\\\\text{H}_2$) have less nucleophilic $sp$ carbons, and butane ($\\\\text{C}_4\\\\text{H}_{10}$) is an unreactive alkane. Thus, propene reacts most readily with gaseous bromine via electrophilic addition."
};
`;

try {
  new vm.Script(q32);
  console.log('Q32 is VALID!');
} catch (e) {
  console.error('Q32 error:', e);
}

