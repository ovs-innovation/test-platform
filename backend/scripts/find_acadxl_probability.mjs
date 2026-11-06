async function run() {
  try {
    const res = await fetch('https://www.acadxl.com/resources/jee-pyqs');
    const html = await res.text();
    const regex = /href=["']([^"']*probability[^"']*)["']/gi;
    let match;
    const links = [];
    while ((match = regex.exec(html)) !== null) {
      links.push(match[1]);
    }
    console.log('Found Probability links:', links);
  } catch (e) {
    console.error(e);
  }
}
run();

