"use client";
import React, { useState } from "react";
import { Sliders, Maximize, Palette, Type, Copy, Check, ChevronDown, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ settings, setSettings, onExport, isExporting, onCopy, isCopying }) => {
  const [expanded, setExpanded] = useState({
    design: true,
    language: true,
    advanced: false
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const AccordionHeader = ({ id, label, icon: Icon, isOpen }) => (
    <button
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between w-full px-1 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors group cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <div className="w-full md:w-80 h-auto md:h-full bg-white dark:bg-black border-t md:border-t-0 md:border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col order-2 md:order-1 h-screen overflow-hidden">
      <div className="mb-8 shrink-0">
        <h2 className="text-xl font-semibold mb-1 grayscale-0 hover:grayscale transition-all cursor-default">CodeShare</h2>
        <p className="text-sm text-zinc-500 font-medium tracking-tight">Premium Snippet Studio</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 -mr-2 custom-scrollbar">
        {/* Design Accordion */}
        <div className="space-y-4">
          <AccordionHeader id="design" label="Design" icon={Palette} isOpen={expanded.design} />
          
          <AnimatePresence initial={false}>
            {expanded.design && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-6 pb-4 pl-1">
                  {/* Appearance */}
                  <div className="space-y-3">
                    <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">Background</span>
                    <div className="grid grid-cols-4 gap-2">
                      {['bg-mesh-1', 'bg-mesh-2', 'bg-mesh-3', 'bg-zinc-950'].map((bg) => (
                        <button
                          key={bg}
                          onClick={() => setSettings({ ...settings, background: bg })}
                          className={`h-8 rounded-md border-2 transition-all group overflow-hidden relative cursor-pointer ${bg} ${
                            settings.background === bg ? 'border-zinc-950 dark:border-white scale-105' : 'border-transparent'
                          }`}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layout */}
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

                  {/* Quality */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                      <span>Resolution</span>
                      <span className="text-zinc-500 font-mono text-[11px]">{settings.quality}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={settings.quality}
                      onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language Accordion */}
        <div className="space-y-4">
          <AccordionHeader id="language" label="Language" icon={Type} isOpen={expanded.language} />
          
          <AnimatePresence initial={false}>
            {expanded.language && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-2 pb-4 pl-1">
                  {[
                    { id: 'auto', name: 'Auto-Detect ✨' },
                    { id: 'javascript', name: 'JavaScript' },
                    { id: 'python', name: 'Python' },
                    { id: 'css', name: 'CSS' },
                    { id: 'typescript', name: 'TypeScript' },
                    { id: 'tsx', name: 'React (TSX)' },
                    { id: 'html', name: 'HTML' },
                    { id: 'json', name: 'JSON' },
                    { id: 'sql', name: 'SQL' },
                    { id: 'cpp', name: 'C++' },
                    { id: 'go', name: 'Go' }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSettings({ ...settings, language: lang.id })}
                      className={`flex items-center justify-between px-4 h-10 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                        settings.language === lang.id
                          ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-md'
                          : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {lang.name}
                      {settings.language === lang.id && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Advanced/Carousel */}
        <div className="space-y-4">
          <AccordionHeader id="advanced" label="Advanced" icon={Sliders} isOpen={expanded.advanced} />
          
          <AnimatePresence initial={false}>
            {expanded.advanced && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pb-4 pl-1">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">Split mode</span>
                      <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Multi-image export</span>
                    </div>
                    <button 
                      onClick={() => setSettings({ ...settings, multiPage: !settings.multiPage })}
                      className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${
                        settings.multiPage ? 'bg-green-500' : 'bg-zinc-200 dark:bg-zinc-800'
                      }`}
                    >
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${
                        settings.multiPage ? 'left-6' : 'left-1'
                      }`} />
                    </button>
                  </div>
                  
                  {settings.multiPage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                          <span>Snippet count</span>
                          <span className="text-zinc-500 font-mono text-[11px]">{settings.splitCount || 2} images</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="10"
                          step="1"
                          value={settings.splitCount || 2}
                          onChange={(e) => setSettings({ ...settings, splitCount: parseInt(e.target.value) })}
                          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-white"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">Sync heights</span>
                        <button 
                          onClick={() => setSettings({ ...settings, syncHeight: !settings.syncHeight })}
                          className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${
                            settings.syncHeight ? 'bg-zinc-950 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'
                          }`}
                        >
                          <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${
                            settings.syncHeight ? 'left-6 bg-white dark:bg-zinc-950' : 'left-1 bg-white'
                          }`} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 shrink-0">
        <button 
          className={`w-full h-12 rounded-xl font-bold shadow-premium transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isExporting 
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed' 
              : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 active:scale-[0.98]'
          }`}
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            "Export PNG"
          )}
        </button>

        <button 
          className={`w-full h-12 mt-3 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-zinc-200 dark:border-zinc-800 ${
            isCopying 
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed' 
              : 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:scale-[0.98]'
          }`}
          onClick={onCopy}
          disabled={isCopying || isExporting}
        >
          {isCopying ? (
            <>
              <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
              <span>Copying...</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Image</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-center mt-3 text-zinc-400 font-medium uppercase tracking-widest opacity-80">Rendered at {settings.quality}x resolution</p>
      </div>
    </div>
  );
};

export default Sidebar;
