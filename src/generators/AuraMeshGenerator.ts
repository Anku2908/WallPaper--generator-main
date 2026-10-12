import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';

export const AuraMeshGenerator: WallpaperGenerator = {
  id: 'aura-mesh',
  name: 'Aura Mesh',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, complexity } = params;
    
    // Background is dark
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, width, height);
    
    const rng = new RNG(seed);
    
    // Aura Mesh uses multiple soft glowing orbs
    // Complexity controls number of orbs
    const numOrbs = 3 + Math.floor((complexity / 100) * 12);
    
    // We will render to a much smaller offscreen canvas and scale it up to get smooth blur
    // Or we can just use radial gradients.
    
    for (let i = 0; i < numOrbs; i++) {
      // Pick color from palette (skip background)
      const colorIndex = i % palette.colors.length;
      const baseColor = palette.colors[colorIndex];
      
      const x = width * rng.random();
      const y = height * rng.random();
      
      // Radius varies
      const baseRadius = Math.min(width, height) * rng.randomInRange(0.4, 0.9);
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, baseRadius);
      
      // Convert hex to rgb for rgba manipulation
      let r = 255, g = 255, b = 255;
      if (baseColor.startsWith('#')) {
        const hex = baseColor.slice(1);
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      // We can use global composite operation for interesting blending
      ctx.globalCompositeOperation = 'screen';
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Reset blend mode
    ctx.globalCompositeOperation = 'source-over';
    
    // Add subtle noise texture overlay
    const noiseOpacity = 0.03; // Light static
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Add monochrome noise
      const val = (Math.random() - 0.5) * 255 * noiseOpacity;
      data[i] = Math.min(255, Math.max(0, data[i] + val));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + val));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + val));
    }
    ctx.putImageData(imgData, 0, 0);
  }
};
