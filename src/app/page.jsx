"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import CodeWindow from "@/components/CodeWindow";
import { toPng } from "html-to-image";

export default function Home() {
  const [settings, setSettings] = useState({
    padding: 64,
    background: "bg-mesh-1",
    theme: "dark",
    glassmorphism: true,
    language: "javascript",
    multiPage: false,
    linesPerPage: 20,
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
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");

  const exportImage = async () => {
    if (exportRef.current === null) return;
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
        const lines = code.split('\n');
        const totalPages = Math.ceil(lines.length / settings.linesPerPage);
        
        for (let i = 0; i < totalPages; i++) {
          setExportStatus(`Exporting page ${i + 1} of ${totalPages}...`);
          
          // Slice the code for this page
          const chunk = lines.slice(i * settings.linesPerPage, (i + 1) * settings.linesPerPage).join('\n');
          
          // We need a way to temporarily show this chunk in the CodeWindow
          // We'll use a temporary state for the "active export code"
          setActiveCode(chunk);
          
          // Wait for Shiki highlighting to catch up (it's async)
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: settings.quality });
          const link = document.createElement('a');
          link.download = `codeshare-part-${i + 1}-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        }
        setActiveCode(null); // Reset
      }
    } catch (err) {
      console.error('oops, something went wrong!', err);
    } finally {
      setIsExporting(false);
      setExportStatus("");
    }
  };

  const [activeCode, setActiveCode] = useState(null);
  const currentCode = activeCode !== null ? activeCode : code;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#F4F4F7] dark:bg-[#080808] text-zinc-950 dark:text-zinc-50 overflow-hidden">
      {/* Settings Panel */}
      <Sidebar settings={settings} setSettings={setSettings} onExport={exportImage} isExporting={isExporting} />

      {/* Preview Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden order-1 md:order-2">
        {/* Toolbar */}
        <header className="h-14 md:h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 md:px-8 bg-white dark:bg-black justify-between shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] md:text-[13px] font-medium text-zinc-500">
              {isExporting ? exportStatus : "Preview Mode"}
            </span>
          </div>
        </header>

        {/* Studio Canvas */}
        <div className="flex-1 relative overflow-y-auto bg-zinc-100/30 dark:bg-zinc-900/10 custom-scrollbar">
          {isExporting && (
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-6 py-4 rounded-2xl shadow-premium flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-950 dark:border-t-white rounded-full animate-spin" />
                <span className="text-sm font-semibold tracking-tight">{exportStatus}</span>
              </div>
            </div>
          )}
          <div className="w-full min-h-full flex flex-col items-center pt-16 md:pt-24 pb-24 px-4 md:px-12">
            
            <div className="w-full max-w-3xl flex flex-col gap-8 md:gap-12">
              <div ref={exportRef} className="w-full">
                <CodeWindow 
                  code={currentCode} 
                  {...settings} 
                />
              </div>
              
              {/* Real-time Text Area */}
              <div className="relative group">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-32 md:h-48 p-4 bg-white/10 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-xs md:text-sm focus:outline-none focus:ring-2 ring-zinc-500/20 transition-all resize-none shadow-sm backdrop-blur-md"
                  placeholder="Paste your code here..."
                />
                <div className="absolute top-3 right-3 text-[10px] font-bold text-zinc-400 md:group-hover:opacity-100 opacity-0 transition-opacity uppercase tracking-widest pointer-events-none">
                  Raw Editor
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
