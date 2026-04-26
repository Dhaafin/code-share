"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Sidebar from "@/components/Sidebar";
import CodeWindow from "@/components/CodeWindow";
import { toPng, toBlob } from "html-to-image";

export default function Home() {
  const [settings, setSettings] = useState({
    padding: 64,
    background: "bg-mesh-1",
    theme: "dark",
    glassmorphism: true,
    language: "auto",
    multiPage: false,
    splitCount: 2,
    syncHeight: true,
    quality: 4
  });

  const [code, setCode] = useState(`// Welcome to CodeShare! 🚀
// Premium Syntax Highlighting Enabled

function generateAwesomeSnippet(config) {
  const { theme, quality } = config;
  
  return {
    success: true,
    message: \`Rendering in \${theme} mode...\`,
    timestamp: Date.now()
  };
}

const config = {
  theme: "apple",
  quality: "premium"
};

console.log(generateAwesomeSnippet(config));`);

  const exportRef = useRef(null);
  const snippetRefs = useRef([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [exportStatus, setExportStatus] = useState("");
  const [maxHeight, setMaxHeight] = useState("auto");

  // Logic to split code into N chunks
  const getSplitCode = (fullCode, count) => {
    const lines = fullCode.split('\n');
    const totalLines = lines.length;
    const linesPerSnippet = Math.ceil(totalLines / count);
    const snippets = [];
    
    for (let i = 0; i < count; i++) {
      const chunk = lines.slice(i * linesPerSnippet, (i + 1) * linesPerSnippet).join('\n');
      snippets.push(chunk || ""); // Allow empty chunks if code is short
    }
    return snippets;
  };

  // Manage maxHeight synchronization
  useEffect(() => {
    if (settings.multiPage && settings.syncHeight) {
      // If turning ON or code changed, reset to auto first to measure natural height
      if (maxHeight !== "auto") setMaxHeight("auto");
    } else {
      // If turning OFF or multiPage is off, immediately reset to auto
      if (maxHeight !== "auto") setMaxHeight("auto");
    }
  }, [code, settings.splitCount, settings.syncHeight, settings.padding, settings.multiPage]);

  useLayoutEffect(() => {
    // Only perform measurement if we are in sync mode and currently in 'auto' state
    if (settings.multiPage && settings.syncHeight && maxHeight === "auto") {
      const timer = setTimeout(() => {
        const heights = snippetRefs.current.slice(0, settings.splitCount).map(ref => {
          const inner = ref?.querySelector('.code-window-inner');
          return inner ? inner.getBoundingClientRect().height : 0;
        });
        const max = Math.max(...heights);
        if (max > 0) setMaxHeight(`${max}px`);
      }, 60); // Slightly longer delay for stability
      return () => clearTimeout(timer);
    }
  }, [maxHeight, settings.multiPage, settings.syncHeight, settings.splitCount, code, settings.padding]);

  const copyImage = async () => {
    // Current behavior: copy the whole thing or first snippet
    setIsCopying(true);
    setExportStatus("Copying to clipboard...");

    try {
      let target = exportRef.current;
      if (settings.multiPage) {
        // If multi-page, we copy the first snippet for now
        target = snippetRefs.current[0];
      }

      const blob = await toBlob(target, { cacheBust: true, pixelRatio: settings.quality });
      if (blob) {
        window.focus();
        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          setExportStatus("Copied Snippet 1!");
          setTimeout(() => setExportStatus(""), 2000);
        } catch (clipboardErr) {
          setExportStatus("Focus failed - please click again");
          setTimeout(() => setExportStatus(""), 3000);
        }
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
      setExportStatus("Failed to copy");
      setTimeout(() => setExportStatus(""), 2000);
    } finally {
      setIsCopying(false);
    }
  };

  const exportImage = async () => {
    setIsExporting(true);
    
    try {
      if (!settings.multiPage) {
        setExportStatus("Generating image...");
        const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: settings.quality });
        const link = document.createElement('a');
        link.download = `codeshare-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const snippets = getSplitCode(code, settings.splitCount);
        
        for (let i = 0; i < snippets.length; i++) {
          setExportStatus(`Exporting snippet ${i + 1} of ${snippets.length}...`);
          
          const target = snippetRefs.current[i];
          if (!target) continue;
          
          // Wait a bit for each to be definitely ready
          await new Promise(resolve => setTimeout(resolve, 150));
          
          const dataUrl = await toPng(target, { cacheBust: true, pixelRatio: settings.quality });
          const link = document.createElement('a');
          link.download = `codeshare-part-${i + 1}-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        }
      }
    } catch (err) {
      console.error('oops, something went wrong!', err);
    } finally {
      setIsExporting(false);
      setExportStatus("");
    }
  };

  const snippets = settings.multiPage ? getSplitCode(code, settings.splitCount) : [code];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#F4F4F7] dark:bg-[#080808] text-zinc-950 dark:text-zinc-50 overflow-hidden">
      <Sidebar 
        settings={settings} 
        setSettings={setSettings} 
        onExport={exportImage} 
        isExporting={isExporting}
        onCopy={copyImage}
        isCopying={isCopying}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden order-1 md:order-2">
        <header className="h-14 md:h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 md:px-8 bg-white dark:bg-black justify-between shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] md:text-[13px] font-medium text-zinc-500">
              {isExporting ? exportStatus : "Studio Canvas"}
            </span>
          </div>
          {settings.multiPage && (
             <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Split Mode: {settings.splitCount} Snippets
             </div>
          )}
        </header>

        <div className="flex-1 relative overflow-y-auto bg-zinc-100/30 dark:bg-zinc-900/10 custom-scrollbar">
          {isExporting && (
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-6 py-4 rounded-2xl shadow-premium flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-950 dark:border-t-white rounded-full animate-spin" />
                <span className="text-sm font-semibold tracking-tight">{exportStatus}</span>
              </div>
            </div>
          )}
          
          <div className="w-full min-h-full flex flex-col items-center pt-12 md:pt-20 pb-24 px-4 md:px-12">
            
            <div className="w-full max-w-5xl flex flex-col gap-12">
              
              {/* Carousel / Split View */}
              <div className={`w-full ${settings.multiPage ? 'flex flex-col md:flex-row gap-6 overflow-x-auto pb-6 snap-x' : ''}`}>
                {snippets.map((snippet, idx) => (
                  <div 
                    key={idx} 
                    ref={el => {
                      snippetRefs.current[idx] = el;
                      if (!settings.multiPage && idx === 0) exportRef.current = el;
                    }}
                    className={`${settings.multiPage ? 'w-full md:w-[450px] shrink-0 snap-center' : 'w-full'}`}
                  >
                    <CodeWindow 
                      code={snippet} 
                      {...settings} 
                      minHeight={(settings.multiPage && settings.syncHeight) ? maxHeight : "auto"}
                    />
                  </div>
                ))}
              </div>
              
              {/* Real-time Text Area */}
              <div className="max-w-3xl w-full mx-auto relative group">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-32 md:h-48 p-4 bg-white/10 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-xs md:text-sm focus:outline-none focus:ring-2 ring-zinc-500/20 transition-all resize-none shadow-sm backdrop-blur-md"
                  placeholder="Paste your code here..."
                />
                <div className="absolute top-3 right-3 text-[10px] font-bold text-zinc-400 md:group-hover:opacity-100 opacity-0 transition-opacity uppercase tracking-widest pointer-events-none">
                  Source Code
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
