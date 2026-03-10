import CodeBlock from '@/components/CodeBlock';
import FieldTable from '@/components/FieldTable';
import Link from 'next/link';

export default function FexVwCobrosPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/integracion-oracle/overview" className="hover:text-sky-400">Integracion Oracle</Link>
        <span>/</span>
        <span className="text-slate-300">fex_vw_cobros</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">fex_vw_cobros</h1>
      <p className="text-slate-400 mb-6">
        Vista de medios de pago. Mapea al array <code className="text-amber-400">detalleCobro[]</code> del modelo DE.
        Incluye tanto pagos registrados (credito) como cobro inmediato (contado).
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Columnas</h2>

      <FieldTable
        title="Columnas de la vista"
        fields={[
          { name: 'clave_movimiento', type: 'number', required: true, description: 'Clave del documento padre (FK a fex_vw_sifen_documentos)' },
          { name: 'tipo', type: 'number', required: true, description: 'Tipo de pago (1=Efectivo, 2=Cheque, 3=Tarjeta credito, 4=Tarjeta debito, etc.)' },
          { name: 'monto', type: 'number', required: true, description: 'Monto del pago' },
          { name: 'moneda', type: 'string', required: true, description: 'Moneda del pago (ej: "PYG", "USD")' },
          { name: 'cotizacion_moneda', type: 'number', required: true, description: 'Cotizacion de la moneda (1 para PYG)' },
          { name: 'codigo_tarjeta', type: 'string', required: false, description: 'Codigo de la tarjeta (si aplica)' },
          { name: 'procesadora', type: 'string', required: false, description: 'Procesadora de la tarjeta (si aplica)' },
          { name: 'codigo_autorizacion', type: 'string', required: false, description: 'Codigo de autorizacion del pago con tarjeta' },
          { name: 'titular', type: 'string', required: false, description: 'Nombre del titular de la tarjeta' },
          { name: 'nro_tarjeta', type: 'string', required: false, description: 'Ultimos digitos de la tarjeta' },
          { name: 'nro_cheque', type: 'string', required: false, description: 'Numero de cheque (si aplica)' },
          { name: 'banco_emisor', type: 'string', required: false, description: 'Banco emisor del cheque (si aplica)' },
          { name: 'codigo_empresa', type: 'number', required: true, description: 'Identificador de la empresa emisora' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query de Ejemplo</h2>
      <CodeBlock
        language="sql"
        code={`-- Cobros de un documento
SELECT tipo, monto, moneda, cotizacion_moneda
FROM fex_vw_cobros
WHERE clave_movimiento = 12345;`}
      />
    </div>
  );
}
