'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-properties';
import 'prismjs/themes/prism-tomorrow.css';
import clsx from 'clsx';

interface Tab {
  label: string;
  language: string;
  code: string;
}

interface CodeBlockProps {
  tabs?: Tab[];
  code?: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ tabs, code, language = 'json', title }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCode = tabs ? tabs[activeTab].code : code ?? '';
  const currentLang = tabs ? tabs[activeTab].language : language;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) Prism.highlightAll();
  }, [mounted, activeTab, currentCode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden my-4 bg-[#1e293b]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
        <div className="flex items-center gap-1">
          {tabs ? (
            tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={clsx(
                  'px-3 py-1 text-xs font-medium rounded-md transition-colors',
                  i === activeTab
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                )}
              >
                {tab.label}
              </button>
            ))
          ) : (
            <span className="text-xs text-slate-400 font-mono uppercase">{title || currentLang}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-4" suppressHydrationWarning>
        <pre className="!bg-transparent !m-0 !p-0" suppressHydrationWarning>
          <code className={`language-${currentLang} !text-sm`} suppressHydrationWarning>
            {currentCode}
          </code>
        </pre>
      </div>
    </div>
  );
}
