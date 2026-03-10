import AlertBox from '@/components/AlertBox';

export default function IntroduccionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Introduccion</h1>
      <p className="text-slate-400 mb-8">
        Todo lo que necesitas saber sobre EXACTO API y el sistema SIFEN.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Que es EXACTO API?</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          <strong className="text-sky-400">EXACTO API</strong> (<code className="text-amber-400 text-sm">sifex.api.mq</code> v2.0.1)
          es un middleware de facturacion electronica desarrollado por <strong>IPYAHU</strong>, 100% compatible
          con el <strong>Sistema de Facturacion Electronica Nacional (SIFEN)</strong> del DNIT Paraguay.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Actua como intermediario entre tu sistema ERP y los servicios web de SIFEN, encargandose de:
        </p>
        <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1.5 ml-4">
          <li>Generar el XML del Documento Electronico (DE) segun el formato SIFEN</li>
          <li>Firmar digitalmente los documentos</li>
          <li>Enviar al webservice de SIFEN y recibir la respuesta (CDC, QR, estado)</li>
          <li>Generar el KuDE (PDF del comprobante) en formato estandar y cinta</li>
          <li>Gestionar el reenvio de correos electronicos con el KuDE adjunto</li>
          <li>Almacenar los XML de request/response y el estado de cada documento</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Que es SIFEN?</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          El <strong>Sistema Integrado de Facturacion Electronica Nacional (SIFEN)</strong> es la plataforma
          de la DNIT (Direccion Nacional de Ingresos Tributarios) de Paraguay que gestiona la emision,
          validacion y consulta de documentos electronicos tributarios.
        </p>
        <p className="text-slate-300 leading-relaxed">
          SIFEN establece los formatos XML, reglas de validacion, firma digital y procesos obligatorios
          para todos los documentos electronicos: facturas, notas de credito, notas de debito,
          autofacturas y notas de remision.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Tipos de Documentos Electronicos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Codigo</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Tipo</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Abreviatura</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: '1', name: 'Factura Electronica', abbr: 'FE', desc: 'Venta de bienes o servicios' },
                { code: '4', name: 'Autofactura Electronica', abbr: 'AFE', desc: 'Compras sin factura del proveedor' },
                { code: '5', name: 'Nota de Credito Electronica', abbr: 'NCE', desc: 'Descuentos, devoluciones, anulaciones parciales' },
                { code: '6', name: 'Nota de Debito Electronica', abbr: 'NDE', desc: 'Ajustes, intereses, recargos' },
                { code: '7', name: 'Nota de Remision Electronica', abbr: 'NRE', desc: 'Traslado de mercaderias' },
              ].map((t) => (
                <tr key={t.code} className="border-t border-slate-700/50">
                  <td className="px-4 py-2.5"><code className="text-sky-400">{t.code}</code></td>
                  <td className="px-4 py-2.5 text-white">{t.name}</td>
                  <td className="px-4 py-2.5"><span className="text-amber-400">{t.abbr}</span></td>
                  <td className="px-4 py-2.5 text-slate-400">{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Flujo General</h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Tu ERP genera el documento', desc: 'Crea el JSON con los datos del DE (cabecera, items, cobros).' },
              { step: '2', title: 'Envias al middleware EXACTO', desc: 'POST /fe/procesar-documento-sinc con el body JSON.' },
              { step: '3', title: 'EXACTO procesa y envia a SIFEN', desc: 'Genera el XML, firma digitalmente y envia al webservice de SIFEN.' },
              { step: '4', title: 'SIFEN valida y responde', desc: 'Retorna el CDC (44 caracteres), estado y link QR.' },
              { step: '5', title: 'EXACTO retorna la respuesta', desc: 'Tu sistema recibe el ResponseDE con CDC, estado y QR.' },
            ].map((s) => (
              <li key={s.step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <div>
                  <h4 className="text-white font-medium">{s.title}</h4>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AlertBox variant="info" title="Referencia normativa">
        Este sistema cumple con la Ley 6380/2019, la RG 44/2021 y el Manual Tecnico SIFEN v150 del DNIT Paraguay.
      </AlertBox>
    </div>
  );
}
