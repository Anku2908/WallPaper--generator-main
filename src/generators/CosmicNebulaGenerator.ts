import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';
import { createNoise2D } from 'simplex-noise';

export const CosmicNebulaGenerator: WallpaperGenerator = {
  id: 'cosmic-nebula',
  name: 'Cosmic Nebula',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, complexity, noise } = params;
    
    // Deep space background
    ctx.fillStyle = '#05050A';
    ctx.fillRect(0, 0, width, height);
    
    const rng = new RNG(seed);
    const noise2D = createNoise2D(() => rng.random());
    
    // Draw Stars
    const numStars = 200 + Math.floor(complexity * 10);
    for (let i = 0; i < numStars; i++) {
        const x = rng.random() * width;
        const y = rng.random() * height;
        const radius = rng.random() > 0.9 ? rng.random() * 2 : rng.random() * 0.8;
        
        ctx.fillStyle = rng.random() > 0.8 ? palette.highlight : '#ffffff';
        ctx.globalAlpha = rng.random() * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw Nebula Gas Clouds
    // We render multiple large, blurred organic shapes
    ctx.globalCompositeOperation = 'screen';
    
    const numClouds = 5 + Math.floor(complexity / 20);
    
    for (let i = 0; i < numClouds; i++) {
        const color = palette.colors[i % palette.colors.length];
        
        // Center of this cloud
        const cx = rng.random() * width;
        const cy = rng.random() * height;
        const maxRadius = Math.min(width, height) * rng.randomInRange(0.4, 0.8);
        
        ctx.fillStyle = color;
        
        // Draw a distorted organic blob by sampling noise around a circle
        ctx.beginPath();
        const steps = 60;
        for (let j = 0; j <= steps; j++) {
            const angle = (j / steps) * Math.PI * 2;
            
            // Sample noise in a circular path in the 2D noise space
            // This ensures the blob loops seamlessly
            const nx = Math.cos(angle) * 0.5 + i;
            const ny = Math.sin(angle) * 0.5 + i;
            
            const n = noise2D(nx, ny); // [-1, 1]
            // Radius distorted by noise
            const radius = maxRadius * (0.6 + n * 0.4);
            
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        // We want very soft edges. Since canvas filter blur is slow, we use radial gradient
        // Actually, drawing the shape and blurring it is okay for a one-off render
        ctx.filter = `blur(${maxRadius * 0.25}px)`;
        ctx.globalAlpha = 0.4 + (noise / 100) * 0.3;
        ctx.fill();
        ctx.filter = 'none'; // reset
    }
    
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
  }
};
