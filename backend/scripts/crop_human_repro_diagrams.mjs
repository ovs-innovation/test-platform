import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Page 8: Q21 (spermatogenesis flowchart)
  // Question text at top ~170-230, options at top ~700
  await sharp(path.resolve(__dirname, 'human_repro_rendered_pages/page_8.png'))
    .extract({ left: 50, top: 220, width: 850, height: 480 })
    .toFile(path.resolve(__dirname, 'human_repro_diagrams/q_21.png'));
  console.log('Cropped q_21.png');

  // Page 19: Q68 (ovary section)
  // Question text at top ~380-450, options at top ~1300
  await sharp(path.resolve(__dirname, 'human_repro_rendered_pages/page_19.png'))
    .extract({ left: 50, top: 460, width: 600, height: 450 })
    .toFile(path.resolve(__dirname, 'human_repro_diagrams/q_68.png'));
  console.log('Cropped q_68.png');

  // Page 21: Q73 (blastocyst stage)
  // Question text at top ~170-250, options at top ~550
  await sharp(path.resolve(__dirname, 'human_repro_rendered_pages/page_21.png'))
    .extract({ left: 50, top: 250, width: 450, height: 300 })
    .toFile(path.resolve(__dirname, 'human_repro_diagrams/q_73.png'));
  console.log('Cropped q_73.png');

  // Page 23: Q82 (female reproductive system)
  // Question text at top ~170-250, options at top ~750
  await sharp(path.resolve(__dirname, 'human_repro_rendered_pages/page_23.png'))
    .extract({ left: 50, top: 250, width: 650, height: 480 })
    .toFile(path.resolve(__dirname, 'human_repro_diagrams/q_82.png'));
  console.log('Cropped q_82.png');

  // Page 26: Q97 (male reproductive system)
  // Question text at top ~170-250, options at top ~600
  await sharp(path.resolve(__dirname, 'human_repro_rendered_pages/page_26.png'))
    .extract({ left: 50, top: 240, width: 500, height: 380 })
    .toFile(path.resolve(__dirname, 'human_repro_diagrams/q_97.png'));
  console.log('Cropped q_97.png');
}

main().catch(console.error);
