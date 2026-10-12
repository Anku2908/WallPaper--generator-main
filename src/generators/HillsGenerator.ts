import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';

export const HillsGenerator: WallpaperGenerator = {
  id: 'grassy-hills',
  name: 'Grassy Hills',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, layerCount } = params;
    
    // Dark background
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);
    
    const rng = new RNG(seed);
    
    // Use the palette colors, from darkest to lightest.
    // The palettes are arranged faint to dark, so we want the reverse for atmospheric depth!
    // Wait, the prompt says "arrange color faint to dark. dark at btm".
    // If the palette is [faint, ..., dark], then colors[0] is faint (light), colors[end] is dark.
    // The image has dark at the back (top) and faint/light at the front (bottom).
    // So we should iterate from dark to faint. i.e., backwards through the colors array (or use them in order if dark is at the front, but we reversed them so dark is at the end).
    // Let's just safely map the layers to the colors.
    
    // We want the back layer to be the darkest color (palette.colors[end]), front layer lightest (palette.colors[0]).
    // Draw the Sun
    const sunX = width * rng.randomInRange(0.2, 0.8);
    const sunY = height * rng.randomInRange(0.2, 0.4);
    const sunRadius = Math.min(width, height) * rng.randomInRange(0.05, 0.1);
    
    // Sun body
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    sunGradient.addColorStop(0, palette.highlight);
    sunGradient.addColorStop(1, palette.accent);
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun glow
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.4;
    const glowGradient = ctx.createRadialGradient(sunX, sunY, sunRadius, sunX, sunY, sunRadius * 2.5);
    glowGradient.addColorStop(0, palette.accent);
    glowGradient.addColorStop(1, 'rgba(0,0,0,0)'); // Transparent
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset context
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    const numLayers = Math.max(3, layerCount);
    
    for (let i = 0; i < numLayers; i++) {
      // i = 0 is the back layer. It should be the darkest color.
      // If palette colors are [lightest, ..., darkest], then index should be near the end.
      const colorProgress = i / (numLayers - 1); // 0 to 1
      // Map to color array: 0 -> darkest (length-1), 1 -> lightest (0)
      const colorIndex = Math.floor((1 - colorProgress) * (palette.colors.length - 1));
      ctx.fillStyle = palette.colors[colorIndex];
      
      // Base height for this layer. Back layers are higher up (smaller Y).
      const baseY = height * 0.4 + (height * 0.5 * colorProgress);
      
      // Generate peak points for linear interpolation
      const numPoints = 3 + Math.floor(rng.random() * 4); // 3 to 6 segments
      const points: {x: number, y: number}[] = [];
      for (let p = 0; p <= numPoints; p++) {
        points.push({
          x: (p / numPoints) * width,
          y: baseY + rng.randomInRange(-height * 0.15, height * 0.15)
        });
      }
      
      const getInterpolatedY = (x: number) => {
        for (let j = 0; j < points.length - 1; j++) {
          if (x >= points[j].x && x <= points[j+1].x) {
            const t = (x - points[j].x) / (points[j+1].x - points[j].x);
            // Cosine interpolation for smooth tops
            const mu2 = (1 - Math.cos(t * Math.PI)) / 2;
            return points[j].y * (1 - mu2) + points[j+1].y * mu2;
          }
        }
        return points[points.length - 1].y;
      };
      
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      // Draw the grassy edge across the screen
      const step = 2; // pixel step
      for (let x = 0; x <= width; x += step) {
        const y = getInterpolatedY(x);
        // Add random grass spike
        const grassSpike = rng.random() * 8; // 0 to 8px tall
        ctx.lineTo(x, y - grassSpike);
      }
      // Ensure we go to the right edge
      ctx.lineTo(width, getInterpolatedY(width));
      
      ctx.lineTo(width, height);
      ctx.fill();
    }
  }
};
