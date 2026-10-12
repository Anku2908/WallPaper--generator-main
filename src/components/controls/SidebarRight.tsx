import React, { useState } from 'react';
import { useWallpaperStore } from '../../store/useWallpaperStore';
import { Download, Monitor, Smartphone, ChevronUp, ChevronDown } from 'lucide-react';
import { generators } from '../../generators';

export const SidebarRight: React.FC = () => {
  const store = useWallpaperStore();
  const activeGenerator = generators[store.generatorId];
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `wallpaper-${store.seed}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <aside className={`w-full md:w-72 bg-zinc-900/90 md:bg-zinc-900/50 border-t md:border-t-0 md:border-l border-zinc-800 flex flex-col shrink-0 z-20 transition-all duration-300 ${isOpen ? 'h-[75vh]' : 'h-auto'} md:h-full absolute md:relative bottom-0`}>
      {/* Mobile Toggle Handle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center p-3 text-zinc-400 hover:text-zinc-200 border-b border-zinc-800 bg-zinc-900/95"
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
          {isOpen ? <ChevronDown className="w-4 h-4"/> : <ChevronUp className="w-4 h-4"/>}
          Settings & Export
          {isOpen ? <ChevronDown className="w-4 h-4"/> : <ChevronUp className="w-4 h-4"/>}
        </div>
      </button>

      <div className={`p-4 space-y-5 flex-1 flex flex-col justify-between overflow-y-auto ${isOpen ? 'block' : 'hidden md:flex'}`}>
        
        {/* Info */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Generator</span>
              <span className="text-zinc-200 font-medium text-right ml-2">{activeGenerator?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Seed</span>
              <span className="text-zinc-200 font-medium font-mono">{store.seed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Resolution</span>
              <span className="text-zinc-200 font-medium">{store.width} × {store.height}</span>
            </div>
          </div>
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Parameters</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400">Complexity</span>
                <span className="text-zinc-200">{store.complexity}</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={store.complexity}
                onChange={(e) => store.setParams({ complexity: parseInt(e.target.value) })}
                className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400">Noise</span>
                <span className="text-zinc-200">{store.noise}</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={store.noise}
                onChange={(e) => store.setParams({ noise: parseInt(e.target.value) })}
                className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400">Layers / Density</span>
                <span className="text-zinc-200">{store.layerCount}</span>
              </div>
              <input 
                type="range" min="1" max="20" 
                value={store.layerCount}
                onChange={(e) => store.setParams({ layerCount: parseInt(e.target.value) })}
                className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Resolution Presets */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Device</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2">
            <button 
              onClick={() => store.setDimensions(1920, 1080)}
              className={`p-2 rounded-xl border flex flex-row items-center justify-center md:justify-start gap-3 transition-all ${
                store.width === 1920 && store.height === 1080
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300'
                  : 'bg-zinc-800/30 border-transparent text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <Monitor className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium">Desktop (FHD)</span>
            </button>
            <button 
              onClick={() => store.setDimensions(3840, 2160)}
              className={`p-2 rounded-xl border flex flex-row items-center justify-center md:justify-start gap-3 transition-all ${
                store.width === 3840 && store.height === 2160
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300'
                  : 'bg-zinc-800/30 border-transparent text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <Monitor className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium">Desktop (4K)</span>
            </button>
            <button 
              onClick={() => store.setDimensions(1080, 1920)}
              className={`p-2 rounded-xl border flex flex-row items-center justify-center md:justify-start gap-3 transition-all ${
                store.width === 1080 && store.height === 1920
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300'
                  : 'bg-zinc-800/30 border-transparent text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium">Mobile</span>
            </button>
          </div>
        </section>
      </div>

      {/* Export Action */}
      <div className={`p-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur ${isOpen ? 'block' : 'hidden md:block'}`}>
        <button 
          onClick={handleDownload}
          className="w-full py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
      </div>
    </aside>
  );
};
