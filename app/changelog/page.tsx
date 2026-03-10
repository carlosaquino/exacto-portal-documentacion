export default function ChangelogPage() {
  const releases = [
    {
      version: '2.0.1',
      date: '2026-03-05',
      type: 'patch',
      changes: [
        'Correccion en la vista fex_vw_sifen_documentos: filtro de ambiente (DEV/PROD)',
        'Mejora en el calculo de totales con descuento en fex_vw_sifen_documentos_det',
        'Agregado soporte para unidades de medida personalizadas en detalleDE',
      ],
    },
    {
      version: '2.0.0',
      date: '2026-02-15',
      type: 'major',
      changes: [
        'Nuevos endpoints: obtener-kude-cinta y obtener-kude-cinta-resumen',
        'Endpoint remarcar-envio-mail-de para reenvio de correos',
        'Soporte multi-empresa en consultas SIFEN (consultar-documento-empresa-sifen)',
        'Consulta masiva de documentos (consultar-documentos-empresa-sifen, consultar-documentos-sifex)',
        'Vista fex_vw_remisiones con datos completos de transportista y conductor',
        'Vista fex_vw_referencias con soporte para tipo_doc_asociado',
        'Mejora en el manejo de errores con codigos MW-xxx',
      ],
    },
    {
      version: '1.5.0',
      date: '2026-01-10',
      type: 'minor',
      changes: [
        'Endpoint procesar-lote-asinc-offline para escenarios sin conexion SIFEN',
        'Campo regenerarKude en DocumentoDTO para regeneracion de KuDE',
        'Soporte para Autofacturas (tipo 4) con detalleAutoFactura',
        'Mejora en el Job de procesamiento pendientes (reintentos configurables)',
      ],
    },
    {
      version: '1.0.0',
      date: '2025-11-01',
      type: 'major',
      changes: [
        'Version inicial del middleware EXACTO API',
        'Endpoints principales: procesar-documento-sinc, procesar-lote-asinc',
        'Consultas: consultar-documentos, consultar-documento-sifen, consultar-documento-sifex',
        'Eventos: cancelar-de, inutilizar-numeracion, nominar-de',
        'Generacion de KuDE en formato estandar',
        'Consulta de RUC en SIFEN',
        '6 vistas Oracle fex_vw_* para integracion con ERP',
        'Servicio Java/Spring Boot con Job programado',
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    major: 'bg-sky-900/50 text-sky-300 border-sky-700',
    minor: 'bg-emerald-900/50 text-emerald-300 border-emerald-700',
    patch: 'bg-amber-900/50 text-amber-300 border-amber-700',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Changelog</h1>
      <p className="text-slate-400 mb-8">
        Historial de cambios de EXACTO API (<code className="text-amber-400">sifex.api.mq</code>).
      </p>

      <div className="space-y-8">
        {releases.map((r) => (
          <div key={r.version} className="relative pl-8 border-l-2 border-slate-700">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-sky-600 border-2 border-[var(--color-bg-dark)]" />
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-bold text-white">v{r.version}</h2>
              <span className={`px-2 py-0.5 text-xs rounded-full border ${typeColors[r.type]}`}>
                {r.type}
              </span>
              <span className="text-sm text-slate-500">{r.date}</span>
            </div>
            <ul className="space-y-1.5">
              {r.changes.map((c, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                  <span className="text-slate-600 mt-1">&#8226;</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
