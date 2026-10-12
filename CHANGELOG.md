# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-07-19

### Added
- **New Procedural Generators:**
  - `Aura Mesh`: Soft, glowing glassmorphic orbs of color blending seamlessly.
  - `Cyberpunk Grid`: Retro-futuristic synthwave perspective grid with a glowing sun and starfield.
  - `Topography`: Minimalist, elegant sweeping contour lines (iso-lines).
  - `Cosmic Nebula`: Deep space gas clouds and dense star fields.
  - `Random Scribbles`: Chaotic, overlapping sweeping curved lines concentrated near the bottom.
  - `Grassy Hills`: Layered, jagged low-poly mountains with procedurally generated grassy texture on the ridges, featuring a glowing background sun and smooth cosine-interpolated rolling peaks.
  - `Sea Sunset`: Scenic seascape with layered ocean waves, a glowing horizon sun, fluffy noise-based clouds, and flying birds.

- **New Modern Color Palettes:**
  - `Pastel Aura`: Soft, vibrant pastels.
  - `Neon Cyberpunk`: Intense neon pinks and blues.
  - `Cosmic Void`: Deep space purples and indigos.
  - `Monochrome Slate`: Sleek dark-mode aesthetic with deep slate blues and grays.
  - `Synthwave Sunset`: Vibrant transition from glowing yellow to deep twilight purple.
  - `Ocean Abyss`: Deep aquatic blues.
  - `Deep Forest`: Lime greens transitioning into dark, moody pine greens.

### Changed
- All color palettes are now systematically arranged from faint/light to dark, allowing generators to properly simulate atmospheric depth.
- Updated sidebar icons to better represent the new generators using modern lucide-react icons (`Activity`, `Mountain`, `Sunset`, `CircleDashed`, `Map`, `Sparkles`, `Grid`).
- Bumped app version to 2.1.

### Removed
- Legacy generators have been completely removed (`Blob`, `ConcentricWaves`, `LayeredWaves`, `Mountain`, `MountainV2`, `NeuralLines`, `ParticleField`, `SmoothWaves`).
- Legacy palettes have been removed.
