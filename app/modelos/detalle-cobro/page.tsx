import FieldTable from '@/components/FieldTable';
import CodeBlock from '@/components/CodeBlock';

export default function DetalleCobroPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Detalle Cobro (DetalleCobro)</h1>
      <p className="text-slate-400 mb-8">
        Modelo que representa un medio de pago del documento electronico.
        Se incluye en el array <code className="text-amber-400">detalleCobro</code> del modelo DE.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4">Campos</h2>
      <FieldTable
        fields={[
          { name: 'tipoPago', type: 'integer', required: true, description: '1=Efectivo, 2=Cheque, 3=Tarjeta Credito, 4=Tarjeta Debito, 5=Transferencia, 6=Giro, 99=Otro' },
          { name: 'importe', type: 'number', required: true, description: 'Monto cobrado' },
          { name: 'moneda', type: 'string', required: true, description: 'Codigo ISO ("PYG", "USD")' },
          { name: 'cotizacionMoneda', type: 'number', required: true, description: 'Tipo de cambio' },
          { name: 'codigoTarjeta', type: 'string', required: false, description: 'Codigo de tarjeta (para pagos con tarjeta)' },
          { name: 'procesadora', type: 'string', required: false, description: 'Nombre de la procesadora' },
          { name: 'codigoAutorizacion', type: 'integer', required: false, description: 'Codigo de autorizacion' },
          { name: 'titular', type: 'string', required: false, description: 'Nombre del titular de la tarjeta' },
          { name: 'numeroTarjeta', type: 'integer', required: false, description: 'Ultimos 4 digitos' },
          { name: 'numeroCheque', type: 'string', required: false, description: 'Numero de cheque' },
          { name: 'bancoEmisor', type: 'string', required: false, description: 'Banco emisor del cheque' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Tipos de Pago</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-slate-800/80">
              <th className="text-center px-4 py-2.5 text-slate-400 font-medium">Codigo</th>
              <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: 1, desc: 'Efectivo' },
              { code: 2, desc: 'Cheque' },
              { code: 3, desc: 'Tarjeta de Credito' },
              { code: 4, desc: 'Tarjeta de Debito' },
              { code: 5, desc: 'Transferencia' },
              { code: 6, desc: 'Giro' },
              { code: 99, desc: 'Otro' },
            ].map((t) => (
              <tr key={t.code} className="border-t border-slate-700/50">
                <td className="px-4 py-2.5 text-center"><code className="text-sky-400">{t.code}</code></td>
                <td className="px-4 py-2.5 text-slate-300">{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo — Pago en Efectivo</h2>
      <CodeBlock
        language="json"
        code={`{
  "tipoPago": 1,
  "importe": 1100000,
  "moneda": "PYG",
  "cotizacionMoneda": 1
}`}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo — Pago con Tarjeta</h2>
      <CodeBlock
        language="json"
        code={`{
  "tipoPago": 3,
  "importe": 1100000,
  "moneda": "PYG",
  "cotizacionMoneda": 1,
  "codigoTarjeta": "VISA",
  "procesadora": "BANCARD",
  "codigoAutorizacion": 123456,
  "titular": "JUAN PEREZ",
  "numeroTarjeta": 4321
}`}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Detalle Cuotas (DetalleCuotas)</h2>
      <p className="text-slate-400 mb-4">
        Solo aplica cuando <code className="text-amber-400">condicionVenta = &quot;CREDITO&quot;</code>.
      </p>
      <FieldTable
        fields={[
          { name: 'numeroCuota', type: 'integer', required: true, description: 'Numero de cuota (1, 2, 3...)' },
          { name: 'importe', type: 'number', required: true, description: 'Monto de la cuota' },
          { name: 'vencimientoCuota', type: 'string', required: true, description: 'Fecha vencimiento "YYYY-MM-DD"' },
        ]}
      />
      <CodeBlock
        language="json"
        code={`[
  { "numeroCuota": 1, "importe": 550000, "vencimientoCuota": "2026-02-15" },
  { "numeroCuota": 2, "importe": 550000, "vencimientoCuota": "2026-03-15" }
]`}
      />
    </div>
  );
}
