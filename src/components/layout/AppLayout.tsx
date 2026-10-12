import React from 'react';
import { WallpaperPreview } from '../canvas/WallpaperPreview';
import { SidebarLeft } from '../controls/SidebarLeft';
import { SidebarRight } from '../controls/SidebarRight';
import { Layers, ExternalLink, Palette } from 'lucide-react';
import { useWallpaperStore } from '../../store/useWallpaperStore';
import { palettes } from '../../palettes';

export const AppLayout: React.FC = () => {
  const store = useWallpaperStore();

  const handleRandomTheme = () => {
    const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
    store.setPalette(randomPalette);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-zinc-900/50 border-b border-zinc-800 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className="text-lg md:text-xl font-medium tracking-tight hidden sm:block">Procedural Wallpaper Gen</h1>
          <h1 className="text-lg font-medium tracking-tight sm:hidden">Wallpaper Gen</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={handleRandomTheme}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Random Theme</span>
          </button>
          <a 
            href="https://github.com/Adi2212/WallPaper--generator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        <SidebarLeft />
        <WallpaperPreview />
        <SidebarRight />
      </main>
    </div>
  );
};
