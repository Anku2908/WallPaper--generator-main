import type { ColorPalette } from '../store/useWallpaperStore';

export interface GeneratorParams {
  seed: number;
  width: number;
  height: number;
  palette: ColorPalette;
  complexity: number;
  noise: number;
  layerCount: number;
}

export interface WallpaperGenerator {
  id: string;
  name: string;
  type: 'canvas' | 'p5';
  
  // For 'canvas' type
  renderCanvas?: (ctx: CanvasRenderingContext2D, params: GeneratorParams) => void;
  
  // For 'p5' type
  renderP5?: (p5: any, params: GeneratorParams) => void;
}
