import { AuraMeshGenerator } from './AuraMeshGenerator';
import { CyberpunkGridGenerator } from './CyberpunkGridGenerator';
import { TopographyGenerator } from './TopographyGenerator';
import { CosmicNebulaGenerator } from './CosmicNebulaGenerator';
import { RandomLinesGenerator } from './RandomLinesGenerator';
import { HillsGenerator } from './HillsGenerator';
import { SeaSunsetGenerator } from './SeaSunsetGenerator';
import type { WallpaperGenerator } from './types';

export const generators: Record<string, WallpaperGenerator> = {
  [AuraMeshGenerator.id]: AuraMeshGenerator,
  [CyberpunkGridGenerator.id]: CyberpunkGridGenerator,
  [TopographyGenerator.id]: TopographyGenerator,
  [CosmicNebulaGenerator.id]: CosmicNebulaGenerator,
  [RandomLinesGenerator.id]: RandomLinesGenerator,
  [HillsGenerator.id]: HillsGenerator,
  [SeaSunsetGenerator.id]: SeaSunsetGenerator,
};

export const generatorList = Object.values(generators);
