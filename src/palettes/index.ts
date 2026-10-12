import type { ColorPalette } from '../store/useWallpaperStore';

export const palettes: ColorPalette[] = [
  {
    id: 'aura-pastel',
    name: 'Pastel Aura',
    background: '#0a0a0a',
    foreground: '#1c1c1c',
    accent: '#fca311',
    highlight: '#ffffff',
    shadow: '#000000',
    // Faint to Dark
    colors: ['#fec5bb', '#fcd5ce', '#fae1dd', '#f8edeb', '#e8e8e4', '#d8e2dc', '#ece4db', '#ffe5d9', '#ffd7ba', '#fec89a'].reverse(),
  },
  {
    id: 'cyberpunk-neon',
    name: 'Neon Cyberpunk',
    background: '#0a0a10',
    foreground: '#1a1a2e',
    accent: '#ff007f',
    highlight: '#00e5ff',
    shadow: '#000000',
    // Faint to Dark
    colors: ['#00e5ff', '#ff007f', '#e94560', '#0f3460', '#16213e', '#1a1a2e'],
  },
  {
    id: 'cosmic-void',
    name: 'Cosmic Void',
    background: '#05050A',
    foreground: '#1b2735',
    accent: '#6b4c9a',
    highlight: '#ffffff',
    shadow: '#000000',
    // Faint to Dark
    colors: ['#d4c4fb', '#9d8cd7', '#7b72ba', '#5a5592', '#2d2b55', '#1b2735', '#090a0f'],
  },
  {
    id: 'monochrome-topo',
    name: 'Monochrome Slate',
    background: '#020617',
    foreground: '#94a3b8',
    accent: '#334155',
    highlight: '#ffffff',
    shadow: '#000000',
    // Faint to Dark
    colors: ['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'],
  },
  {
    id: 'synthwave',
    name: 'Synthwave Sunset',
    background: '#150030',
    foreground: '#3a0ca3',
    accent: '#ff006e',
    highlight: '#ffbe0b',
    shadow: '#050010',
    // Faint to Dark (vibrant golden hour to twilight)
    colors: ['#ffbe0b', '#fb5607', '#ff006e', '#b5179e', '#7209b7', '#3a0ca3', '#150030'],
  },
  {
    id: 'ocean-abyss',
    name: 'Ocean Abyss',
    background: '#0B1B3D',
    foreground: '#1A365D',
    accent: '#2B6CB0',
    highlight: '#63B3ED',
    shadow: '#000000',
    // Faint to Dark
    colors: ['#90cdf4', '#63b3ed', '#4299e1', '#3182ce', '#2b6cb0', '#2c5282', '#2a4365', '#1a365d', '#0b1b3d'],
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    background: '#040f09',
    foreground: '#0d2818',
    accent: '#4d774e',
    highlight: '#cddc39',
    shadow: '#000000',
    // Faint to Dark
    colors: ['#dce775', '#cddc39', '#8bc34a', '#4caf50', '#388e3c', '#2e7d32', '#1b5e20', '#0d2818', '#040f09'],
  }
];

export function getRandomPalette(seed: number): ColorPalette {
  const index = Math.floor(seed) % palettes.length;
  return palettes[index];
}
