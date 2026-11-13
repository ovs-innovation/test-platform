const str = '{ option_key: "C", option_text: "$\\\\text{C}_4\\\\text{H}_{10}$" }';
console.log('Chars:');
for (let i = 0; i < str.length; i++) {
  console.log(`${i}: '${str[i]}' (${str.charCodeAt(i)})`);
}

