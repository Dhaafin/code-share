"use client";

import React, { useState, useEffect } from "react";
import TrafficLights from "./TrafficLights";
import { codeToHtml } from "shiki";

const CodeWindow = ({ 
  code = "", 
  language = "javascript", 
  padding = 40,
  background = "bg-mesh-1",
  glassmorphism = true,
  theme = "dark"
}) => {
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    const highlight = async () => {
      if (!code) {
        setHighlightedCode("");
        return;
      }
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: theme === 'dark' ? 'github-dark' : 'github-light'
        });
        setHighlightedCode(html);
      } catch (err) {
        console.error("Shiki highlighting failed:", err);
        // Fallback to basic escaping if shiki fails
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
        setHighlightedCode(`<pre><code>${escaped}</code></pre>`);
      }
    };
    highlight();
  }, [code, language, theme]);

  return (
    <div 
      className={`relative w-full flex items-center justify-center transition-all duration-300 ${background} rounded-xl overflow-hidden`}
      style={{ padding: `min(${padding}px, 10vw)` }}
    >
      <div 
        className={`w-full max-w-2xl min-h-[100px] border border-zinc-200/20 dark:border-white/20 shadow-premium rounded-[12px] md:rounded-[var(--radius-apple)] overflow-hidden flex flex-col ${
          theme === 'dark' ? 'bg-zinc-950/90' : 'bg-white/90'
        } ${glassmorphism ? 'apple-blur' : ''}`}
      >
        {/* Title Bar */}
        <div className="flex items-center px-4 h-8 md:h-10 border-b border-zinc-200/10 dark:border-white/10 shrink-0">
          <TrafficLights />
          <div className="flex-1 flex justify-center pr-8 md:pr-12">
            <span className="text-[9px] md:text-[11px] font-medium text-zinc-500 tracking-wide uppercase opacity-60">
              {language}
            </span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 md:p-6 font-mono text-[11px] md:text-[13px] leading-relaxed overflow-x-auto scrolling-touch selection:bg-zinc-500/30">
          <div
            className="shiki-wrapper"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
          <style jsx global>{`
            .shiki-wrapper pre {
              background-color: transparent !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }
            .shiki-wrapper code {
              font-family: inherit !important;
              background-color: transparent !important;
            }
            /* Make it pop like VS Code */
            .shiki-wrapper .shiki span {
              text-shadow: 0 0 1px rgba(255,255,255,0.1);
            }
            .dark .shiki-wrapper .shiki span {
              filter: saturate(1.2) brightness(1.1);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
