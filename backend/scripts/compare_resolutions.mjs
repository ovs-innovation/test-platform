import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compare() {
  const ce = await loadImage(path.resolve(__dirname, 'current_electricity_pages/page_001.png'));
  const wo = await loadImage(path.resolve(__dirname, 'wave_optics_pages/page_001.png'));
  console.log('Current Electricity Page 1:', ce.width, 'x', ce.height);
  console.log('Wave Optics Page 1:', wo.width, 'x', wo.height);
}

compare().catch(console.error);
