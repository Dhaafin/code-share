import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml'; // handles HTML
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import cpp from 'highlight.js/lib/languages/cpp';
import go from 'highlight.js/lib/languages/go';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript); // map tsx to typescript for detection
hljs.registerLanguage('html', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('go', go);

const SUPPORTED_LANGUAGES = ['javascript', 'python', 'css', 'typescript', 'tsx', 'html', 'json', 'sql', 'cpp', 'go'];

export function detectLanguage(code) {
  if (!code || code.trim().length === 0) return 'javascript'; // Default
  
  try {
    const result = hljs.highlightAuto(code, SUPPORTED_LANGUAGES);
    let detected = result.language;
    
    // Map hljs result back to our Shiki keys if needed
    if (detected === 'xml') detected = 'html';
    
    if (SUPPORTED_LANGUAGES.includes(detected)) {
      return detected;
    }
    
    return 'javascript'; // Fallback
  } catch (error) {
    console.warn("Language detection failed", error);
    return 'javascript';
  }
}
