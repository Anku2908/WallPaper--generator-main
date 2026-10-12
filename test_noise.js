import { createNoise2D } from 'simplex-noise';

try {
  const noise2D = createNoise2D(() => Math.random());
  console.log('Noise val:', noise2D(1, 1));
} catch (err) {
  console.error('Error:', err);
}
