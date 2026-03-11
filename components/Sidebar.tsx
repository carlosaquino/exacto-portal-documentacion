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
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from './SidebarContext';

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

function NavSection({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = item.href === pathname;
  const hasActiveChild = item.children?.some((c) => c.href === pathname);
  const [open, setOpen] = useState(hasActiveChild ?? false);

  if (item.children) {
    if (collapsed) {
      return (
        <div className="relative group">
          <div
            className={clsx(
              'flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer',
              hasActiveChild
                ? 'text-sky-400 bg-sky-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            )}
          >
            {item.icon}
          </div>
          <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50 bg-slate-800 border border-slate-700 rounded-lg py-2 px-1 min-w-48 shadow-xl">
            <p className="px-3 py-1 text-xs font-semibold text-slate-300 mb-1">{item.label}</p>
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
        </div>
      );
    }

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

  if (collapsed) {
    return (
      <div className="relative group">
        <Link
          href={item.href!}
          className={clsx(
            'flex items-center justify-center p-2 rounded-lg transition-colors',
            isActive
              ? 'text-sky-400 bg-sky-950/40 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          )}
        >
          {item.icon}
        </Link>
        <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50 bg-slate-800 border border-slate-700 rounded-lg py-1.5 px-3 whitespace-nowrap shadow-xl">
          <span className="text-sm text-slate-300">{item.label}</span>
        </div>
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
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();

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
          'fixed top-0 left-0 z-40 h-screen bg-[var(--color-sidebar-bg)] border-r border-[var(--color-sidebar-border)] flex flex-col transition-all duration-300 lg:translate-x-0',
          collapsed ? 'w-16' : 'w-72',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className={clsx(
          'border-b border-slate-800 flex flex-col items-center shrink-0',
          collapsed ? 'p-3' : 'p-5'
        )}>
          <Link href="/" className="flex items-center justify-center overflow-hidden">
            <Image
              src="/logo_exacto.png"
              alt="EXACTO"
              width={160}
              height={40}
              className={clsx('w-auto object-contain transition-all duration-300', collapsed ? 'max-h-7 max-w-[2.5rem]' : 'max-h-10')}
            />
          </Link>
          {!collapsed && (
            <p className="text-xs text-slate-500 mt-2 text-center">Portal de Documentacion API v2.0.1</p>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center p-2 mx-2 mt-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors shrink-0"
          title={collapsed ? 'Expandir menu' : 'Colapsar menu'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Navigation */}
        <nav className={clsx('flex-1 overflow-y-auto space-y-1', collapsed ? 'p-2' : 'p-3')}>
          {navigation.map((item) => (
            <NavSection key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Footer con logo IPYAHU */}
        <div className="shrink-0 border-t border-slate-800 bg-[var(--color-sidebar-bg)] p-3 flex flex-col items-center gap-1">
          <Image
            src="/logo_ipyahu.png"
            alt="IPYAHU"
            width={80}
            height={30}
            className={clsx('w-auto object-contain transition-all duration-300', collapsed ? 'max-h-5 max-w-[2.5rem]' : 'max-h-7')}
          />
          {!collapsed && (
            <p className="text-[10px] text-slate-600 text-center">Desarrollado por IPYAHU</p>
          )}
        </div>
      </aside>
    </>
  );
}
