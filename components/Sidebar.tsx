'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  Home,
  BookOpen,
  Zap,
  Server,
  Database,
  FileCode,
  FileJson,
  AlertTriangle,
  History,
  List,
  Search,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: 'Inicio', href: '/', icon: <Home size={18} /> },
  { label: 'Introduccion', href: '/introduccion', icon: <BookOpen size={18} /> },
  { label: 'Quick Start', href: '/quickstart', icon: <Zap size={18} /> },
  { label: 'Ejemplos Postman', href: '/ejemplos-postman', icon: <FileJson size={18} /> },
  {
    label: 'Endpoints',
    icon: <Server size={18} />,
    children: [
      { label: 'Indice de Endpoints', href: '/endpoints' },
      { label: 'Procesar Documento (Sinc)', href: '/endpoints/procesar-documento-sinc' },
      { label: 'Procesar Lote (Asinc)', href: '/endpoints/procesar-lote-asinc' },
      { label: 'Procesar Lote Offline', href: '/endpoints/procesar-lote-asinc-offline' },
      { label: 'Consultar Documentos', href: '/endpoints/consultar-documentos' },
      { label: 'Consultar Doc SIFEN', href: '/endpoints/consultar-documento-sifen' },
      { label: 'Consultar Doc EXACTO', href: '/endpoints/consultar-documento-sifex' },
      { label: 'Consultar Doc Empresa SIFEN', href: '/endpoints/consultar-documento-empresa-sifen' },
      { label: 'Consultar Docs Empresa SIFEN', href: '/endpoints/consultar-documentos-empresa-sifen' },
      { label: 'Consultar Docs EXACTO', href: '/endpoints/consultar-documentos-sifex' },
      { label: 'Consultar Lote SIFEN', href: '/endpoints/consultar-lote-sifen' },
      { label: 'Consultar RUC', href: '/endpoints/consultar-ruc' },
      { label: 'Cancelar DE', href: '/endpoints/cancelar-de' },
      { label: 'Inutilizar Numeracion', href: '/endpoints/inutilizar-numeracion' },
      { label: 'Nominar DE', href: '/endpoints/nominar-de' },
      { label: 'Obtener KuDE', href: '/endpoints/obtener-kude' },
      { label: 'KuDE Cinta', href: '/endpoints/obtener-kude-cinta' },
      { label: 'KuDE Cinta Resumen', href: '/endpoints/obtener-kude-cinta-resumen' },
      { label: 'Remarcar Envio Mail', href: '/endpoints/remarcar-envio-mail-de' },
    ],
  },
  {
    label: 'Modelos de Datos',
    icon: <FileCode size={18} />,
    children: [
      { label: 'Documento Electronico', href: '/modelos/documento-electronico' },
      { label: 'Detalle Item', href: '/modelos/detalle-item' },
      { label: 'Detalle Cobro', href: '/modelos/detalle-cobro' },
      { label: 'Responses', href: '/modelos/responses' },
    ],
  },
  {
    label: 'Integracion Oracle',
    icon: <Database size={18} />,
    children: [
      { label: 'Overview', href: '/integracion-oracle/overview' },
      { label: 'fex_vw_sifen_documentos', href: '/integracion-oracle/fex_vw_sifen_documentos' },
      { label: 'fex_vw_sifen_documentos_det', href: '/integracion-oracle/fex_vw_sifen_documentos_det' },
      { label: 'fex_vw_cobros', href: '/integracion-oracle/fex_vw_cobros' },
      { label: 'fex_vw_cuotas', href: '/integracion-oracle/fex_vw_cuotas' },
      { label: 'fex_vw_referencias', href: '/integracion-oracle/fex_vw_referencias' },
      { label: 'fex_vw_remisiones', href: '/integracion-oracle/fex_vw_remisiones' },
    ],
  },
  { label: 'API Reference (Swagger)', href: '/swagger', icon: <Search size={18} /> },
  { label: 'Catalogos', href: '/catalogos', icon: <List size={18} /> },
  { label: 'Errores', href: '/errores', icon: <AlertTriangle size={18} /> },
  { label: 'Changelog', href: '/changelog', icon: <History size={18} /> },
];

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.href === pathname;
  const hasActiveChild = item.children?.some((c) => c.href === pathname);
  const [open, setOpen] = useState(hasActiveChild ?? false);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            'flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
            hasActiveChild
              ? 'text-sky-400 bg-sky-950/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {open && (
          <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-700/50 pl-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href!}
                className={clsx(
                  'block px-3 py-1.5 text-sm rounded-md transition-colors',
                  child.href === pathname
                    ? 'text-sky-400 bg-sky-950/40 font-medium'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={clsx(
        'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
        isActive
          ? 'text-sky-400 bg-sky-950/40 font-medium'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-slate-800 p-2 rounded-lg border border-slate-700"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-40 h-screen w-72 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-sidebar-border)] overflow-y-auto transition-transform lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-800 flex flex-col items-center">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo_exacto.png" alt="EXACTO" width={160} height={40} className="h-10 w-auto" />
          </Link>
          <p className="text-xs text-slate-500 mt-2 text-center">Portal de Documentacion API v2.0.1</p>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => (
            <NavSection key={item.label} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-[var(--color-sidebar-bg)]">
          <p className="text-xs text-slate-600 text-center">
            Desarrollado por IPYAHU
          </p>
        </div>
      </aside>
    </>
  );
}
