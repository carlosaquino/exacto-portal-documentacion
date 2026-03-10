import Link from 'next/link';
import MethodBadge from '@/components/MethodBadge';

const endpoints = [
  { num: 1, method: 'POST', path: '/fe/procesar-documento-sinc', desc: 'Emitir documento electronico (sincrono)', href: '/endpoints/procesar-documento-sinc', star: true },
  { num: 2, method: 'POST', path: '/fe/procesar-lote-asinc', desc: 'Emitir lote de documentos (asincrono)', href: '/endpoints/procesar-lote-asinc' },
  { num: 3, method: 'POST', path: '/fe/procesar-lote-asinc-offline', desc: 'Emitir lote offline (sin conexion SIFEN)', href: '/endpoints/procesar-lote-asinc-offline' },
  { num: 4, method: 'GET', path: '/fe/consultar-documentos', desc: 'Consultar documentos por empresa / fecha / CDC', href: '/endpoints/consultar-documentos' },
  { num: 5, method: 'GET', path: '/fe/consultar-documento-sifen/{cdc}', desc: 'Consultar estado en SIFEN por CDC', href: '/endpoints/consultar-documento-sifen' },
  { num: 6, method: 'GET', path: '/fe/consultar-documento-sifex/{cdc}', desc: 'Consultar estado en EXACTO (middleware) por CDC', href: '/endpoints/consultar-documento-sifex' },
  { num: 7, method: 'POST', path: '/fe/consultar-documento-empresa-sifen', desc: 'Consultar en SIFEN con CDC + ID empresa', href: '/endpoints/consultar-documento-empresa-sifen' },
  { num: 8, method: 'POST', path: '/fe/consultar-documentos-empresa-sifen', desc: 'Consultar lista de documentos en SIFEN', href: '/endpoints/consultar-documentos-empresa-sifen' },
  { num: 9, method: 'POST', path: '/fe/consultar-documentos-sifex', desc: 'Consultar lista de documentos en EXACTO', href: '/endpoints/consultar-documentos-sifex' },
  { num: 10, method: 'GET', path: '/fe/consultar-lote-sifen/{lote}', desc: 'Consultar estado de un lote en SIFEN', href: '/endpoints/consultar-lote-sifen' },
  { num: 11, method: 'GET', path: '/fe/consultar-ruc/{ruc}', desc: 'Consultar datos de contribuyente por RUC', href: '/endpoints/consultar-ruc' },
  { num: 12, method: 'POST', path: '/fe/cancelar-de', desc: 'Cancelar documento electronico', href: '/endpoints/cancelar-de' },
  { num: 13, method: 'POST', path: '/fe/inutilizar-numeracion', desc: 'Inutilizar rango de numeracion', href: '/endpoints/inutilizar-numeracion' },
  { num: 14, method: 'POST', path: '/fe/nominar-de', desc: 'Nominar documento innominado', href: '/endpoints/nominar-de' },
  { num: 15, method: 'GET', path: '/fe/obtener-kude/{cdc}', desc: 'Obtener KuDE en formato estandar (PDF)', href: '/endpoints/obtener-kude' },
  { num: 16, method: 'GET', path: '/fe/obtener-kude-cinta/{cdc}', desc: 'Obtener KuDE en formato cinta (PDF)', href: '/endpoints/obtener-kude-cinta' },
  { num: 17, method: 'GET', path: '/fe/obtener-kude-cinta-resumen/{cdc}', desc: 'Obtener KuDE formato cinta resumen (PDF)', href: '/endpoints/obtener-kude-cinta-resumen' },
  { num: 18, method: 'GET', path: '/fe/remarcar-envio-mail-de/{cdc}', desc: 'Remarcar documento para reenvio por correo', href: '/endpoints/remarcar-envio-mail-de' },
];

export default function EndpointsIndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Endpoints</h1>
      <p className="text-slate-400 mb-8">
        Referencia completa de los 18 endpoints de EXACTO API. Todos los paths usan el prefijo
        del context path configurado en <code className="text-amber-400">.env</code>.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-slate-800/80">
              <th className="text-center px-3 py-2.5 text-slate-400 font-medium w-10">#</th>
              <th className="text-left px-3 py-2.5 text-slate-400 font-medium w-20">Metodo</th>
              <th className="text-left px-3 py-2.5 text-slate-400 font-medium">Path</th>
              <th className="text-left px-3 py-2.5 text-slate-400 font-medium">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep) => (
              <tr key={ep.num} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-3 py-2.5 text-center text-slate-500">{ep.num}</td>
                <td className="px-3 py-2.5">
                  <MethodBadge method={ep.method} className="!my-0" />
                </td>
                <td className="px-3 py-2.5">
                  <Link href={ep.href} className="font-mono text-sky-400 hover:text-sky-300 text-xs">
                    {ep.path}
                  </Link>
                  {ep.star && <span className="ml-2 text-amber-400" title="Endpoint principal">&#9733;</span>}
                </td>
                <td className="px-3 py-2.5 text-slate-400">{ep.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
