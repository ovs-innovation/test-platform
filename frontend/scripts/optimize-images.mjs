import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'ebooks' && entry.name !== 'brochures') {
        await processDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const stat = fs.statSync(fullPath);
        // Only process files larger than 50KB to avoid unnecessary work
        if (stat.size > 50000) {
          console.log(`Optimizing: ${path.relative(publicDir, fullPath)} (${(stat.size / 1024).toFixed(1)} KB)`);

          const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';

          try {
            const image = sharp(fullPath);
            const metadata = await image.metadata();

            // Resize max width to 1920px for large hero images
            const targetWidth = metadata.width && metadata.width > 1920 ? 1920 : undefined;

            // Generate WebP version
            await sharp(fullPath)
              .resize({ width: targetWidth, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(webpPath);

            // Compress original format in-place
            if (ext === '.png') {
              const buf = await sharp(fullPath)
                .resize({ width: targetWidth, withoutEnlargement: true })
                .png({ compressionLevel: 9, quality: 80 })
                .toBuffer();
              fs.writeFileSync(fullPath, buf);
            } else if (['.jpg', '.jpeg'].includes(ext)) {
              const buf = await sharp(fullPath)
                .resize({ width: targetWidth, withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .toBuffer();
              fs.writeFileSync(fullPath, buf);
            }

            const newStat = fs.statSync(fullPath);
            const webpStat = fs.existsSync(webpPath) ? fs.statSync(webpPath) : null;

            console.log(
              ` -> Compressed ${ext.toUpperCase()}: ${(newStat.size / 1024).toFixed(1)} KB | WebP: ${
                webpStat ? (webpStat.size / 1024).toFixed(1) + ' KB' : 'N/A'
              }`
            );
          } catch (err) {
            console.warn(`Could not optimize ${entry.name}:`, err.message);
          }
        }
      }
    }
  }
}

console.log('Starting image optimization pass on public assets...');
processDirectory(publicDir)
  .then(() => console.log('Image optimization pass complete!'))
  .catch((err) => console.error('Image optimization failed:', err));
