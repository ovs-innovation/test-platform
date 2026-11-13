import vm from 'vm';

try {
  new vm.Script('const x = "$\\text{C}_4\\text{H}_{10}$";');
  console.log('OK double quotes');
} catch (e) {
  console.log('Failed double quotes:', e.message);
}

try {
  new vm.Script("const x = '$\\text{C}_4\\text{H}_{10}$';");
  console.log('OK single quotes');
} catch (e) {
  console.log('Failed single quotes:', e.message);
}

