'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#0f172a',
    primaryColor: '#0ea5e9',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#334155',
    lineColor: '#475569',
    secondaryColor: '#1e293b',
    tertiaryColor: '#1e293b',
    fontFamily: 'system-ui, sans-serif',
  },
});

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

export default function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
    mermaid.render(id, chart).then(({ svg }) => {
      setSvg(svg);
    });
  }, [chart]);

  return (
    <div className="my-6">
      {title && <h4 className="text-sm font-semibold text-slate-300 mb-3">{title}</h4>}
      <div
        ref={containerRef}
        className="mermaid-container bg-slate-800/50 rounded-xl border border-slate-700 p-6 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
