import fs from 'fs';
import path from 'path';

function searchFiles(dir) {
  try {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      if (item.name === 'node_modules' || item.name === '.git' || item.name === '.system_generated' || item.name === 'dist') continue;
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        searchFiles(full);
      } else if (item.name.endsWith('.json') || item.name.endsWith('.txt') || item.name.endsWith('.mjs') || item.name.endsWith('.js') || item.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          if (content.includes('most paramagnetic in nature') || content.includes('Mohr\'s salt') || content.includes('outside the co-ordination sphere')) {
            console.log('FOUND IN:', full);
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

searchFiles('.');

