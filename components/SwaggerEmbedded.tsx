'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerEmbedded() {
  const [expanded, setExpanded] = useState(false);
  const [spec, setSpec] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/swagger-spec.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setSpec(data))
      .catch(err => setError(err.message));
  }, []);

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
        className="rounded-xl overflow-hidden border border-slate-700 bg-white swagger-container"
        style={{ height: expanded ? '90vh' : '700px', transition: 'height 0.3s ease', overflowY: 'auto' }}
      >
        {error && (
          <div className="p-8 text-center text-red-600">
            <p className="font-semibold">Error al cargar el spec</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}
        {!spec && !error && (
          <div className="p-8 text-center text-slate-500">Cargando especificacion...</div>
        )}
        {spec && <SwaggerUI spec={spec} />}
      </div>

      <style jsx global>{`
        .swagger-container .topbar,
        .swagger-container .scheme-container,
        .swagger-container .servers {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
