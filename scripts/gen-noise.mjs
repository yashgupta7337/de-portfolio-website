import sharp from 'sharp';
import { randomBytes } from 'crypto';

const size = 200;
const pixels = randomBytes(size * size);

await sharp(pixels, {
  raw: { width: size, height: size, channels: 1 }
})
  .png({ compressionLevel: 9 })
  .toFile('public/noise.png');

console.log('public/noise.png written');
