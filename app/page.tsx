import Image from 'next/image';
import Link from 'next/link';
import { Zap, Server, Database, FileCode, Search, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} className="text-amber-400" />,
    title: 'Quick Start',
    desc: 'Emiti tu primer documento electronico en minutos.',
    href: '/quickstart',
  },
  {
    icon: <Server size={24} className="text-sky-400" />,
    title: '18 Endpoints',
    desc: 'Documentacion completa de todos los endpoints /fe/*.',
    href: '/endpoints',
  },
  {
    icon: <Database size={24} className="text-emerald-400" />,
    title: 'Integracion Oracle',
    desc: '6 vistas fex_vw_* con scripts SQL listos para usar.',
    href: '/integracion-oracle/overview',
  },
  {
    icon: <FileCode size={24} className="text-violet-400" />,
    title: 'Modelos de Datos',
    desc: 'Schemas completos del modelo DE, items, cobros y responses.',
    href: '/modelos/documento-electronico',
  },
  {
    icon: <Search size={24} className="text-rose-400" />,
    title: 'API Reference',
    desc: 'Swagger UI embebido para probar endpoints en vivo.',
    href: '/swagger',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-16">
        <Image
          src="/logo_exacto.png"
          alt="EXACTO"
          width={280}
          height={70}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-white mb-3">
          Portal de Documentacion
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-2">
          Guia completa para integrar tu sistema con <strong className="text-sky-400">EXACTO API</strong>{' '}
          (<code className="text-amber-400 text-sm">sifex.api.mq</code> v2.0.1), el middleware de
          facturacion electronica 100% compatible con SIFEN.
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <span className="px-3 py-1 text-xs rounded-full bg-sky-900/50 text-sky-300 border border-sky-700">
            v2.0.1
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-600">
            OpenAPI 2.0
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700">
            SIFEN Compatible
          </span>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="group p-5 rounded-xl border border-slate-700 bg-slate-800/30 hover:border-sky-700 hover:bg-sky-950/20 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              {f.icon}
              <h3 className="text-white font-semibold">{f.title}</h3>
            </div>
            <p className="text-sm text-slate-400 mb-3">{f.desc}</p>
            <span className="text-xs text-sky-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver mas <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      {/* Endpoint principal */}
      <div className="rounded-xl border border-sky-800/50 bg-sky-950/20 p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Endpoint Principal</h2>
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-600/20 text-blue-400 border border-blue-600/30">
            POST
          </span>
          <code className="text-sm font-mono text-slate-300">/fe/procesar-documento-sinc</code>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          Envia un documento electronico al middleware EXACTO para su procesamiento inmediato.
          El sistema espera la respuesta de SIFEN de forma sincrona.
        </p>
        <Link
          href="/endpoints/procesar-documento-sinc"
          className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
        >
          Ver documentacion completa <ArrowRight size={14} />
        </Link>
      </div>

      {/* Audiencia */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-slate-700 bg-slate-800/20">
          <h3 className="text-white font-semibold mb-2">Desarrolladores Java / Spring Boot</h3>
          <p className="text-sm text-slate-400">
            Ejemplos con RestTemplate, modelos DTO, servicio de integracion con Job programado
            y manejo de errores.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-slate-700 bg-slate-800/20">
          <h3 className="text-white font-semibold mb-2">Equipos de Base de Datos Oracle</h3>
          <p className="text-sm text-slate-400">
            6 vistas <code className="text-amber-400">fex_vw_*</code> con scripts SQL completos,
            mapeo de columnas al modelo DE y diagramas de dependencias.
          </p>
        </div>
      </div>
    </div>
  );
}
