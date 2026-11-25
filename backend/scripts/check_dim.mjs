import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p1 = await loadImage(path.resolve(__dirname, 'atom_jee_pages/page_001.png'));
console.log(`Page dimensions: width=${p1.width}, height=${p1.height}`);
