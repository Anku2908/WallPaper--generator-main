import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';
import { createNoise2D } from 'simplex-noise';

export const TopographyGenerator: WallpaperGenerator = {
  id: 'topography',
  name: 'Topographic Lines',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, complexity } = params;
    
    // Solid background
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);
    
    const rng = new RNG(seed);
    const noise2D = createNoise2D(() => rng.random());
    
    // Topography uses marching squares or just contour line approximation.
    // An easy way to do iso-lines is to sample noise on a grid and draw lines where the value crosses a threshold,
    // or since this is just a canvas, we can draw lots of closely spaced lines that follow a noise field!
    
    ctx.strokeStyle = palette.foreground;
    // We can also use gradient stroke depending on Y coordinate, but let's keep it clean
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    const baseFreq = 0.002 + (complexity / 100) * 0.005;
    
    // Instead of true marching squares which is expensive, we can draw flowing lines across the screen
    // Let's use flow fields!
    
    const numLines = 50 + Math.floor(complexity * 1.5);
    const steps = 100;
    const stepLength = Math.max(width, height) / steps;
    
    // We will distribute starting points in a grid or randomly
    for (let i = 0; i < numLines; i++) {
        // Start randomly
        let x = rng.random() * width;
        let y = rng.random() * height;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        for (let j = 0; j < steps; j++) {
            // Get noise value (angle)
            const angleNoise = noise2D(x * baseFreq, y * baseFreq);
            // Map noise from [-1, 1] to [0, 2PI]
            const angle = (angleNoise + 1) * Math.PI;
            
            x += Math.cos(angle) * stepLength;
            y += Math.sin(angle) * stepLength;
            
            ctx.lineTo(x, y);
            
            // If it goes way out of bounds, break early
            if (x < -100 || x > width + 100 || y < -100 || y > height + 100) {
                break;
            }
        }
        
        // Use a color from the palette to make it more interesting
        const colorIndex = i % palette.colors.length;
        ctx.strokeStyle = palette.colors[colorIndex];
        ctx.globalAlpha = 0.7;
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
  }
};
