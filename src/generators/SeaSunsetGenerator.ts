import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';
import { createNoise2D } from 'simplex-noise';

export const SeaSunsetGenerator: WallpaperGenerator = {
  id: 'sea-sunset',
  name: 'Sea Sunset',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, complexity, layerCount } = params;
    
    // Solid background (Sky)
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);
    
    const rng = new RNG(seed);
    const noise2D = createNoise2D(() => rng.random());
    
    const horizonY = height * 0.6; // Sea starts at 60% down
    
    // 1. Draw Sun
    const sunX = width * rng.randomInRange(0.3, 0.7);
    const sunY = horizonY - height * rng.randomInRange(0.05, 0.15);
    const sunRadius = Math.min(width, height) * 0.15;
    
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    sunGradient.addColorStop(0, palette.highlight || '#fff');
    sunGradient.addColorStop(1, palette.accent || '#ccc');
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun glow
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.5;
    const glowGradient = ctx.createRadialGradient(sunX, sunY, sunRadius, sunX, sunY, sunRadius * 2);
    glowGradient.addColorStop(0, palette.accent);
    glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
    
    // 2. Draw Clouds
    // We draw clouds by drawing overlapping circles whose positions are determined by noise
    const numClouds = 3 + Math.floor(complexity / 20);
    ctx.fillStyle = palette.colors[palette.colors.length - 2] || '#ffffff';
    
    for (let i = 0; i < numClouds; i++) {
        ctx.globalAlpha = rng.randomInRange(0.2, 0.6);
        const cx = rng.random() * width;
        const cy = rng.randomInRange(height * 0.1, horizonY * 0.8);
        const baseCloudRadius = Math.min(width, height) * rng.randomInRange(0.05, 0.1);
        
        ctx.beginPath();
        // A cloud is a cluster of 3-5 circles
        const parts = Math.floor(rng.randomInRange(3, 6));
        for(let j=0; j<parts; j++) {
            const offsetX = rng.randomInRange(-baseCloudRadius * 1.5, baseCloudRadius * 1.5);
            const offsetY = rng.randomInRange(-baseCloudRadius * 0.5, baseCloudRadius * 0.5);
            const r = baseCloudRadius * rng.randomInRange(0.5, 1.2);
            ctx.arc(cx + offsetX, cy + offsetY, r, 0, Math.PI * 2);
        }
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    
    // 3. Draw Birds
    const numBirds = Math.floor(rng.randomInRange(3, 8 + complexity / 10));
    ctx.strokeStyle = palette.colors[palette.colors.length - 1]; // Darkest color for silhouette
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let i = 0; i < numBirds; i++) {
        const bx = rng.randomInRange(width * 0.1, width * 0.9);
        const by = rng.randomInRange(height * 0.1, horizonY * 0.7);
        const size = rng.randomInRange(10, 25); // bird wingspan
        
        ctx.beginPath();
        // Left wing
        ctx.moveTo(bx - size, by - size * 0.5);
        ctx.quadraticCurveTo(bx - size * 0.5, by, bx, by + size * 0.2);
        // Right wing
        ctx.quadraticCurveTo(bx + size * 0.5, by, bx + size, by - size * 0.5);
        ctx.stroke();
    }
    
    // 4. Draw Sea (Layered Waves)
    const numWaves = Math.max(3, layerCount);
    for (let i = 0; i < numWaves; i++) {
        const progress = i / (numWaves - 1);
        // Map layers to colors: back layers use mid palette, front layers use fainter palette
        // If palette is faint(0) to dark(end), we want front waves to be darker or lighter?
        // Let's use back waves as darkest (farthest), front waves as lightest.
        const colorIndex = Math.floor((1 - progress) * (palette.colors.length - 1));
        ctx.fillStyle = palette.colors[colorIndex];
        
        const waveBaseY = horizonY + (height - horizonY) * progress;
        
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, waveBaseY);
        
        // Draw wave across width
        const frequency = 0.005 + progress * 0.01; // closer waves have different frequency
        const amplitude = height * 0.02 + progress * height * 0.03; // closer waves are taller
        
        for (let x = 0; x <= width; x += 5) {
            // Mix sine wave with noise for organic water
            const sine = Math.sin(x * frequency + seed + i);
            const n = noise2D(x * 0.002, i * 10);
            const y = waveBaseY + (sine * 0.5 + n * 0.5) * amplitude;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.fill();
        
        // Add a slight highlight on the peak of the waves (sun reflection)
        ctx.strokeStyle = palette.highlight;
        ctx.globalAlpha = 0.3 * (1 - progress);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    }
  }
};
