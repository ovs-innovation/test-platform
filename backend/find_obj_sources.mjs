import fs from 'fs';
const files = fs.readdirSync('scripts');
for (const f of files) {
  try {
    const txt = fs.readFileSync('scripts/' + f, 'utf8');
    if (
      txt.includes('For an exothermic chemical process') ||
      txt.includes('The solution of which of the following will be non-conducting') ||
      txt.includes('Which one of the following is optically active') ||
      txt.includes('The major product "A"')
    ) {
      console.log('Match in scripts/' + f);
    }
  } catch (e) {}
}

