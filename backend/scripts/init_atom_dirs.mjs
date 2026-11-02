import fs from 'fs';
import path from 'path';

// Let's create a directory for atom uploads and scripts
const atomDir = path.resolve('backend/uploads/structure_of_atom');
if (!fs.existsSync(atomDir)) {
  fs.mkdirSync(atomDir, { recursive: true });
}
const atomFrontendDir = path.resolve('frontend/public/uploads/structure_of_atom');
if (!fs.existsSync(atomFrontendDir)) {
  fs.mkdirSync(atomFrontendDir, { recursive: true });
}

console.log('Created atom directories');

