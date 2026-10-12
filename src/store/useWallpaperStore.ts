import { create } from 'zustand';

export interface ColorPalette {
  id: string;
  name: string;
  background: string;
  foreground: string;
  accent: string;
  highlight: string;
  shadow: string;
  colors: string[];
}

interface WallpaperState {
  generatorId: string;
  seed: number;
  palette: ColorPalette;
  width: number;
  height: number;
  complexity: number;
  noise: number;
  layerCount: number;
  setGeneratorId: (id: string) => void;
  setSeed: (seed: number) => void;
  setPalette: (palette: ColorPalette) => void;
  setDimensions: (width: number, height: number) => void;
  setParams: (params: Partial<Pick<WallpaperState, 'complexity' | 'noise' | 'layerCount'>>) => void;
  randomizeAll: () => void;
}

export const useWallpaperStore = create<WallpaperState>((set) => ({
  generatorId: 'aura-mesh',
  seed: Math.floor(Math.random() * 1000000),
  palette: {
    id: 'aura-pastel',
    name: 'Pastel Aura',
    background: '#0a0a0a',
    foreground: '#1c1c1c',
    accent: '#fca311',
    highlight: '#ffffff',
    shadow: '#000000',
    colors: ['#fec5bb', '#fcd5ce', '#fae1dd', '#f8edeb', '#e8e8e4', '#d8e2dc', '#ece4db', '#ffe5d9', '#ffd7ba', '#fec89a'].reverse(),
  },
  width: 1920,
  height: 1080,
  complexity: 50,
  noise: 50,
  layerCount: 5,
  setGeneratorId: (id) => set({ generatorId: id }),
  setSeed: (seed) => set({ seed }),
  setPalette: (palette) => set({ palette }),
  setDimensions: (width, height) => set({ width, height }),
  setParams: (params) => set((state) => ({ ...state, ...params })),
  randomizeAll: () => set(() => ({
    seed: Math.floor(Math.random() * 1000000),
    complexity: Math.floor(Math.random() * 100),
    noise: Math.floor(Math.random() * 100),
    layerCount: Math.floor(Math.random() * 10) + 2,
  })),
}));
