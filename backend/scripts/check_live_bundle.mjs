async function check() {
  const jsRes = await fetch('https://edvedum.com/assets/QuestionBank-C4T4P3i7.js');
  const jsText = await jsRes.text();
  console.log('QuestionBank chunk size:', jsText.length);
  console.log('Includes Ray Optics:', jsText.includes('Ray Optics'));
  console.log('Includes Wave Optics:', jsText.includes('Wave Optics'));
  console.log('Includes Alternating Current:', jsText.includes('Alternating Current'));
  console.log('Includes Electromagnetic Waves:', jsText.includes('Electromagnetic Waves'));
  console.log('Includes Electromagnetic Induction:', jsText.includes('Electromagnetic Induction'));
  console.log('Includes Magnetism and Matter:', jsText.includes('Magnetism and Matter'));
  console.log('Includes Electrostatics:', jsText.includes('Electrostatics'));
  console.log('Includes Dual Nature of Matter:', jsText.includes('Dual Nature of Matter'));
  
  // Find where 106 or 194 or 195 is handled
  const idx106 = jsText.indexOf('106');
  if (idx106 !== -1) {
    console.log('Context around 106:\n', jsText.substring(Math.max(0, idx106 - 150), idx106 + 150));
  }
}
check().catch(console.error);
