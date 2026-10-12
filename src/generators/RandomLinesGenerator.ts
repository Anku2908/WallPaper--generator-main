import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';

export const RandomLinesGenerator: WallpaperGenerator = {
  id: 'random-lines',
  name: 'Random Scribbles',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, complexity } = params;
    
    // Solid background
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);
    
    const rng = new RNG(seed);
    
    // We want lots of thin, overlapping, sweeping curved lines concentrated towards the bottom
    const numLines = 50 + Math.floor(complexity * 3);
    
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let i = 0; i < numLines; i++) {
      // Pick a random color from the palette's foreground/accent colors (excluding background)
      const colorIndex = i % palette.colors.length;
      ctx.strokeStyle = palette.colors[colorIndex];
      ctx.globalAlpha = rng.random() * 0.6 + 0.2; // Opacity between 0.2 and 0.8
      
      ctx.beginPath();
      
      // Start somewhere in the bottom half
      let startX = rng.randomInRange(-width * 0.2, width * 1.2);
      let startY = rng.randomInRange(height * 0.6, height * 1.1);
      
      ctx.moveTo(startX, startY);
      
      // Draw a continuous smooth curve with 3-6 bezier segments
      const segments = Math.floor(rng.randomInRange(3, 7));
      
      let currentX = startX;
      let currentY = startY;
      
      for (let j = 0; j < segments; j++) {
        // Control points and end point
        // They should spread out horizontally and drift around the bottom
        const cp1x = currentX + rng.randomInRange(-width * 0.4, width * 0.4);
        const cp1y = currentY + rng.randomInRange(-height * 0.3, height * 0.3);
        
        const cp2x = currentX + rng.randomInRange(-width * 0.4, width * 0.4);
        const cp2y = currentY + rng.randomInRange(-height * 0.3, height * 0.3);
        
        const endX = currentX + rng.randomInRange(-width * 0.5, width * 0.5);
        // Tendency to stay in the bottom 70% of the screen
        const endY = rng.randomInRange(height * 0.5, height * 1.2);
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        
        currentX = endX;
        currentY = endY;
      }
      
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1.0;
  }
};
