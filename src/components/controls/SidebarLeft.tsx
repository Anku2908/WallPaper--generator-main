import React from 'react';
import { useWallpaperStore } from '../../store/useWallpaperStore';
import { generatorList } from '../../generators';
import { palettes } from '../../palettes';
import { Shuffle, CircleDashed, Grid, Map, Sparkles, Activity, Mountain, Sunset } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'aura-mesh': <CircleDashed className="w-5 h-5" />,
  'cyberpunk-grid': <Grid className="w-5 h-5" />,
  'topography': <Map className="w-5 h-5" />,
  'cosmic-nebula': <Sparkles className="w-5 h-5" />,
  'random-lines': <Activity className="w-5 h-5" />,
  'grassy-hills': <Mountain className="w-5 h-5" />,
  'sea-sunset': <Sunset className="w-5 h-5" />,
};

export const SidebarLeft: React.FC = () => {
  const store = useWallpaperStore();

  return (
    <aside className="w-full md:w-20 lg:w-24 bg-zinc-900/50 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col shrink-0 z-20">
      <div className="flex-1 flex flex-col items-start md:items-center py-3 md:py-4 gap-3 md:gap-4 w-full overflow-hidden">
        
        {/* Style Selection - Horizontal scroll on mobile, Grid on desktop */}
        <section className="flex flex-row md:grid md:grid-cols-2 gap-2 w-full px-4 md:px-2 overflow-x-auto md:overflow-visible shrink-0 md:justify-items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {generatorList.map((gen) => (
            <button
              key={gen.id}
              onClick={() => store.setGeneratorId(gen.id)}
              title={gen.name}
              className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                store.generatorId === gen.id 
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' 
                  : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {iconMap[gen.id] || <CircleDashed className="w-5 h-5" />}
            </button>
          ))}
          {/* Spacer for mobile scroll */}
          <div className="w-2 shrink-0 md:hidden" />
        </section>

        {/* Separator - Hidden on mobile */}
        <div className="hidden md:block w-8 h-px bg-zinc-800/50 rounded-full shrink-0" />

        {/* Color Palette - Horizontal scroll on mobile, Grid on desktop */}
        <section className="flex flex-row md:grid md:grid-cols-2 gap-4 md:gap-3 w-full px-4 md:px-2 overflow-x-auto md:overflow-visible shrink-0 md:justify-items-center items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {palettes.map((palette) => (
            <button
              key={palette.id}
              onClick={() => store.setPalette(palette)}
              title={palette.name}
              className={`w-7 h-7 shrink-0 rounded-full overflow-hidden flex flex-col transition-all border-2 ${
                store.palette.id === palette.id 
                  ? 'border-indigo-500 scale-125 shadow-lg shadow-indigo-500/20' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'
              }`}
            >
              {palette.colors.slice(0, 4).map((c, i) => (
                <div key={i} className="flex-1 w-full" style={{ backgroundColor: c }} />
              ))}
            </button>
          ))}
          
          {/* Randomize All button appended to palettes row on mobile */}
          <div className="md:hidden ml-2 pr-4 shrink-0 flex items-center">
             <button 
               onClick={() => store.randomizeAll()}
               title="Randomize All"
               className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all"
             >
               <Shuffle className="w-4 h-4" />
             </button>
          </div>
        </section>

      </div>

      {/* Sticky Bottom Actions - Desktop Only */}
      <div className="hidden md:flex p-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur items-center justify-center shrink-0">
        <button 
          onClick={() => store.randomizeAll()}
          title="Randomize All"
          className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-900/20 transition-all shrink-0"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
