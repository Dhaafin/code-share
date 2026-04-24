"use client";

import React from "react";
import TrafficLights from "./TrafficLights";

const CodeWindow = ({ 
  code = "", 
  language = "javascript", 
  padding = 40,
  background = "bg-mesh-1",
  glassmorphism = true,
  theme = "dark"
}) => {
  return (
    <div 
      className={`relative w-full flex items-center justify-center transition-all duration-300 ${background} rounded-xl overflow-hidden`}
      style={{ padding: `min(${padding}px, 10vw)` }}
    >
      <div 
        className={`w-full max-w-2xl min-h-[100px] border border-white/20 shadow-premium rounded-[12px] md:rounded-[var(--radius-apple)] overflow-hidden flex flex-col ${
          theme === 'dark' ? 'bg-zinc-950/80' : 'bg-white/80'
        } ${glassmorphism ? 'apple-blur' : ''}`}
      >
        {/* Title Bar */}
        <div className="flex items-center px-4 h-8 md:h-10 border-b border-white/10">
          <TrafficLights />
          <div className="flex-1 flex justify-center pr-8 md:pr-12">
            <span className="text-[9px] md:text-[11px] font-medium text-zinc-500 tracking-wide uppercase opacity-60">
              {language}
            </span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 md:p-6 font-mono text-[11px] md:text-[13px] leading-relaxed overflow-x-auto whitespace-pre scrolling-touch text-balance">
          <code className="text-zinc-200">
            {code || "// Paste your code here..."}
          </code>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
