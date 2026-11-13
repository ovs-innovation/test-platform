import vm from 'vm';

const lines = [
  '{ option_key: "A", option_text: "$\\\\text{C}_3\\\\text{H}_6$" }',
  '{ option_key: "B", option_text: "$\\\\text{C}_2\\\\text{H}_2$" }',
  '{ option_key: "C", option_text: "$\\\\text{C}_4\\\\text{H}_{10}$" }',
  '{ option_key: "D", option_text: "$\\\\text{C}_2\\\\text{H}_4$" }'
];

for (let i = 0; i < lines.length; i++) {
  try {
    new vm.Script('(' + lines[i] + ')');
    console.log(`Line ${i} OK`);
  } catch (e) {
    console.log(`Line ${i} FAILED:`, e.message);
  }
}

