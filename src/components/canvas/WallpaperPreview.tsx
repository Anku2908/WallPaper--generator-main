import React, { useEffect, useRef } from 'react';
import { useWallpaperStore } from '../../store/useWallpaperStore';
import { generators } from '../../generators';
import p5 from 'p5';

export const WallpaperPreview: React.FC = () => {
  const { generatorId, seed, palette, width, height, complexity, noise, layerCount } = useWallpaperStore();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    const generator = generators[generatorId];
    if (!generator) return;
    
    const params = { seed, width, height, palette, complexity, noise, layerCount };

    if (generator.type === 'canvas' && generator.renderCanvas) {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          generator.renderCanvas(ctx, params);
        }
      }
    } else if (generator.type === 'p5' && generator.renderP5) {
      // Clear canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
        }
      }

      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }

      const sketch = (p: p5) => {
        p.setup = () => {
          p.createCanvas(width, height);
          p.noLoop(); // Generate static image initially
        };

        p.draw = () => {
          generator.renderP5!(p, params);
        };
      };

      if (p5ContainerRef.current) {
        p5InstanceRef.current = new p5(sketch, p5ContainerRef.current);
      }
    }
  }, [generatorId, seed, palette, width, height, complexity, noise, layerCount]);

  const generator = generators[generatorId];

  return (
    <div className="flex-1 w-full h-full flex items-center justify-center p-8 overflow-hidden bg-zinc-900/50">
      <div 
        className="relative shadow-2xl shadow-black/50 overflow-hidden rounded-lg bg-black flex-shrink-0"
        style={{
          aspectRatio: `${width}/${height}`,
          height: width > height ? 'auto' : '100%',
          width: width > height ? '100%' : 'auto',
          maxHeight: '100%',
          maxWidth: '100%'
        }}
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ display: generator?.type === 'canvas' ? 'block' : 'none' }}
        />
        <div 
          ref={p5ContainerRef} 
          className="absolute inset-0 w-full h-full [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:object-contain"
          style={{ display: generator?.type === 'p5' ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};
