'use client';

import dynamic from 'next/dynamic';
import EnvBadge from '@/components/EnvBadge';

const SwaggerEmbedded = dynamic(() => import('@/components/SwaggerEmbedded'), { ssr: false });

export default function SwaggerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">API Reference</h1>
      <p className="text-slate-400 mb-4">
        Explorador interactivo de todos los endpoints de EXACTO API.
        Podes probar los endpoints directamente desde aqui.
      </p>
      <div className="flex gap-2 mb-6">
        <span className="px-2 py-1 text-xs rounded-full bg-sky-900 text-sky-300 border border-sky-700">v2.0.1</span>
        <span className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-600">OpenAPI 2.0</span>
        <EnvBadge />
      </div>
      <SwaggerEmbedded />
    </div>
  );
}
