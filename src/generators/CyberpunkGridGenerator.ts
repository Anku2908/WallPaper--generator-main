import type { WallpaperGenerator, GeneratorParams } from './types';
import { RNG } from '../utils/random';

export const CyberpunkGridGenerator: WallpaperGenerator = {
  id: 'cyberpunk-grid',
  name: 'Cyberpunk Grid',
  type: 'canvas',
  
  renderCanvas: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => {
    const { width, height, seed, palette, complexity } = params;
    
    const rng = new RNG(seed);
    
    // Deep dark background
    ctx.fillStyle = '#0a0a10';
    ctx.fillRect(0, 0, width, height);
    
    const horizonY = height * 0.55;
    
    // 1. Draw Starfield
    const numStars = Math.floor(complexity * 3);
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<numStars; i++) {
        const x = rng.random() * width;
        const y = rng.random() * horizonY;
        const r = rng.random() * 1.5;
        ctx.globalAlpha = rng.random() * 0.8 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    
    // 2. Draw Sun
    const sunX = width / 2;
    const sunY = horizonY;
    const sunRadius = Math.min(width, height) * 0.25;
    
    const sunGradient = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
    // Use the palette's highlight and accent
    sunGradient.addColorStop(0, palette.highlight || '#ff007f');
    sunGradient.addColorStop(1, palette.accent || '#ffea00');
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI, true); // half circle above horizon
    ctx.fill();
    
    // Sun slice effect (synthwave style)
    ctx.fillStyle = '#0a0a10'; // matching background
    for(let i=0; i<6; i++) {
        const sliceY = horizonY - (i * i * 4) - 10;
        const sliceHeight = i * 1.5 + 1;
        if (sliceY > sunY - sunRadius) {
            ctx.fillRect(sunX - sunRadius, sliceY, sunRadius * 2, sliceHeight);
        }
    }
    
    // 3. Draw Horizon Glow
    const glowGradient = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 50);
    glowGradient.addColorStop(0, 'rgba(255, 0, 127, 0)');
    glowGradient.addColorStop(0.5, 'rgba(255, 0, 127, 0.4)');
    glowGradient.addColorStop(1, 'rgba(255, 0, 127, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, horizonY - 50, width, 100);
    
    // 4. Draw Perspective Grid
    ctx.strokeStyle = palette.foreground || '#ff00ff';
    ctx.lineWidth = 2;
    
    // Glow effect for grid
    ctx.shadowColor = palette.foreground || '#ff00ff';
    ctx.shadowBlur = 10;
    
    const vpX = width / 2;
    const vpY = horizonY;
    
    // Vertical lines spreading from center
    const numLines = 20 + Math.floor(complexity / 5);
    for (let i = -numLines; i <= numLines; i++) {
        const xOffset = i * (width / numLines) * 2;
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(vpX + xOffset, height);
        ctx.stroke();
    }
    
    // Horizontal lines moving towards viewer
    for (let i = 1; i <= 20; i++) {
        // Logarithmic spacing
        const distance = Math.pow(i, 2.5) * 1.5;
        if (vpY + distance < height * 1.5) {
            ctx.beginPath();
            ctx.moveTo(0, vpY + distance);
            ctx.lineTo(width, vpY + distance);
            ctx.stroke();
        }
    }
    
    ctx.shadowBlur = 0; // reset
  }
};
