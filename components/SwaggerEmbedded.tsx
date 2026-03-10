'use client';

import { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function SwaggerEmbedded() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-end mb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
        >
          {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          {expanded ? 'Reducir' : 'Expandir'}
        </button>
      </div>

      <div
        className="rounded-xl overflow-hidden border border-slate-700 bg-white"
        style={{ height: expanded ? '90vh' : '700px', transition: 'height 0.3s ease' }}
      >
        <iframe
          src="/api/swagger-proxy"
          title="Swagger UI — EXACTO API"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
