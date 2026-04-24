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
    language: "javascript"
  });

  const [code, setCode] = useState(`function helloWorld() {
  console.log("Hello from CodeShare! 🚀");
  
  const config = {
    theme: "apple",
    quality: "premium",
    isAwesome: true
  };
  
  return config;
}`);

  const exportRef = useRef(null);

  const exportImage = async () => {
    if (exportRef.current === null) return;
    
    try {
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 4 });
      const link = document.createElement('a');
      link.download = `codeshare-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F4F7] dark:bg-[#080808] text-zinc-950 dark:text-zinc-50 overflow-hidden">
      {/* Settings Panel */}
      <Sidebar settings={settings} setSettings={setSettings} onExport={exportImage} />

      {/* Preview Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Toolbar */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[13px] font-medium text-zinc-500">Preview Mode</span>
          </div>
        </header>

        {/* Studio Canvas */}
        <div className="flex-1 relative overflow-y-auto p-12 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div ref={exportRef}>
              <CodeWindow 
                code={code} 
                {...settings} 
              />
            </div>
            
            {/* Real-time Text Area (Hidden but functional for editing in Phase 1) */}
            <div className="mt-8 relative group">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 p-4 bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 ring-zinc-500/20 transition-all resize-none"
                placeholder="Paste your code here..."
              />
              <div className="absolute top-3 right-3 text-[10px] font-bold text-zinc-400 group-hover:opacity-100 opacity-0 transition-opacity uppercase tracking-widest">
                Raw Editor
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
