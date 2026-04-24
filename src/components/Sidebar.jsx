"use client";

import React from "react";
import { Sliders, Maximize, Palette, Type } from "lucide-react";

const Sidebar = ({ settings, setSettings, onExport }) => {
  return (
    <div className="w-full md:w-80 h-auto md:h-full bg-white dark:bg-black border-t md:border-t-0 md:border-r border-zinc-200 dark:border-zinc-800 p-6 md:p-8 flex flex-col gap-6 md:gap-8 order-2 md:order-1">
      <div>
        <h2 className="text-xl font-semibold mb-1 grayscale-0 hover:grayscale transition-all cursor-default">CodeShare</h2>
        <p className="text-sm text-zinc-500 font-medium tracking-tight">Premium Snippet Studio</p>
      </div>

      <div className="space-y-6">
        {/* Style Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <Palette className="w-3 h-3" /> Appearance
          </label>
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">Background</span>
              <div className="grid grid-cols-4 gap-2">
                {['bg-mesh-1', 'bg-mesh-2', 'bg-mesh-3', 'bg-zinc-950'].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setSettings({ ...settings, background: bg })}
                    className={`h-8 rounded-md border-2 transition-all group overflow-hidden relative ${bg} ${
                      settings.background === bg ? 'border-zinc-950 dark:border-white scale-105' : 'border-transparent'
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <Maximize className="w-3 h-3" /> Layout
          </label>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                <span>Padding</span>
                <span className="text-zinc-500 font-mono text-[11px]">{settings.padding}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="128"
                step="8"
                value={settings.padding}
                onChange={(e) => setSettings({ ...settings, padding: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button 
          className="w-full h-12 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-bold shadow-premium hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          onClick={onExport}
        >
          Export PNG
        </button>
        <p className="text-[10px] text-center mt-3 text-zinc-400 font-medium">Rendered at 4x resolution</p>
      </div>
    </div>
  );
};

export default Sidebar;
