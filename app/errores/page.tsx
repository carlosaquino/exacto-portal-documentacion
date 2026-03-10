import AlertBox from '@/components/AlertBox';
import CodeBlock from '@/components/CodeBlock';

export default function ErroresPage() {
  const erroresSifen = [
    { code: '0260', desc: 'Aprobado', type: 'success' },
    { code: '0261', desc: 'Aprobado con observacion', type: 'warning' },
    { code: '0300', desc: 'Rechazado — error de formato XML', type: 'error' },
    { code: '0301', desc: 'Rechazado — error de firma digital', type: 'error' },
    { code: '0302', desc: 'Rechazado — timbrado no vigente', type: 'error' },
    { code: '0303', desc: 'Rechazado — RUC emisor no valido', type: 'error' },
    { code: '0304', desc: 'Rechazado — CDC duplicado', type: 'error' },
    { code: '0305', desc: 'Rechazado — numeracion ya utilizada', type: 'error' },
    { code: '0306', desc: 'Rechazado — error de calculo en totales', type: 'error' },
    { code: '0310', desc: 'Rechazado — campo obligatorio faltante', type: 'error' },
    { code: '0500', desc: 'Error interno de SIFEN', type: 'error' },
    { code: '0501', desc: 'Servicio SIFEN temporalmente no disponible', type: 'warning' },
  ];

  const erroresMiddleware = [
    { code: 'MW-001', desc: 'Error de conexion con SIFEN', action: 'Verificar conectividad de red y estado de SIFEN' },
    { code: 'MW-002', desc: 'Timeout en la respuesta de SIFEN', action: 'Aumentar timeout o usar endpoint asincrono' },
    { code: 'MW-003', desc: 'Certificado digital no encontrado', action: 'Verificar configuracion del certificado en el middleware' },
    { code: 'MW-004', desc: 'Empresa (idFacturador) no configurada', action: 'Verificar que la empresa existe en fc_param_empresa' },
    { code: 'MW-005', desc: 'Error al generar XML', action: 'Verificar campos obligatorios del modelo DE' },
    { code: 'MW-006', desc: 'Error al firmar documento', action: 'Verificar certificado digital y su vigencia' },
    { code: 'MW-010', desc: 'Documento ya procesado anteriormente', action: 'Verificar que idDocumentoERP no este duplicado' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Codigos de Error</h1>
      <p className="text-slate-400 mb-8">
        Referencia de codigos de respuesta de SIFEN y errores del middleware EXACTO.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Codigos de Respuesta SIFEN</h2>
        <p className="text-slate-400 mb-4">
          Estos codigos son retornados por el webservice de SIFEN (DNIT) y se incluyen
          en el campo <code className="text-amber-400">respuestaCodigo</code> del DocumentoDTO.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium w-24">Codigo</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
                <th className="text-center px-4 py-2.5 text-slate-400 font-medium w-24">Estado</th>
              </tr>
            </thead>
            <tbody>
              {erroresSifen.map((e) => (
                <tr key={e.code} className="border-t border-slate-700/50">
                  <td className="px-4 py-2.5">
                    <code className="text-sky-400 text-xs">{e.code}</code>
                  </td>
                  <td className="px-4 py-2.5 text-slate-300">{e.desc}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={
                      e.type === 'success' ? 'px-2 py-0.5 text-xs rounded-full bg-emerald-900/50 text-emerald-300' :
                      e.type === 'warning' ? 'px-2 py-0.5 text-xs rounded-full bg-amber-900/50 text-amber-300' :
                      'px-2 py-0.5 text-xs rounded-full bg-red-900/50 text-red-300'
                    }>
                      {e.type === 'success' ? 'OK' : e.type === 'warning' ? 'WARN' : 'ERROR'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Errores del Middleware EXACTO</h2>
        <p className="text-slate-400 mb-4">
          Errores generados internamente por el middleware antes de llegar a SIFEN.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium w-24">Codigo</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Accion Sugerida</th>
              </tr>
            </thead>
            <tbody>
              {erroresMiddleware.map((e) => (
                <tr key={e.code} className="border-t border-slate-700/50">
                  <td className="px-4 py-2.5">
                    <code className="text-amber-400 text-xs">{e.code}</code>
                  </td>
                  <td className="px-4 py-2.5 text-slate-300">{e.desc}</td>
                  <td className="px-4 py-2.5 text-slate-400">{e.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Manejo de Errores en Codigo</h2>
        <CodeBlock
          tabs={[
            {
              label: 'Java',
              language: 'java',
              code: `try {
    ResponseDE response = restTemplate.postForObject(
        apiUrl + "/fe/procesar-documento-sinc",
        entity, ResponseDE.class
    );

    if ("APROBADO".equals(response.getEstado())) {
        log.info("Documento aprobado. CDC: {}", response.getCdc());
    } else {
        log.warn("Documento rechazado: {}", response.getDescripcionEstado());
    }
} catch (HttpClientErrorException e) {
    log.error("Error HTTP {}: {}",
        e.getStatusCode(), e.getResponseBodyAsString());
} catch (ResourceAccessException e) {
    log.error("Error de conexion con el middleware: {}", e.getMessage());
}`,
            },
            {
              label: 'JavaScript',
              language: 'javascript',
              code: `try {
  const response = await fetch(url, { method: 'POST', headers, body });

  if (!response.ok) {
    const error = await response.text();
    console.error(\`Error HTTP \${response.status}: \${error}\`);
    return;
  }

  const data = await response.json();

  if (data.estado === 'APROBADO') {
    console.log('CDC:', data.cdc);
  } else {
    console.warn('Rechazado:', data.descripcionEstado);
  }
} catch (error) {
  console.error('Error de conexion:', error.message);
}`,
            },
          ]}
        />
      </section>

      <AlertBox variant="info" title="Reintentos">
        Para errores de conectividad (MW-001, MW-002, 0501), es seguro reintentar el envio.
        Para errores de validacion (03xx), corregir los datos antes de reenviar.
        Nunca reintentar si el codigo es 0304 (CDC duplicado) — el documento ya fue procesado.
      </AlertBox>
    </div>
  );
}
