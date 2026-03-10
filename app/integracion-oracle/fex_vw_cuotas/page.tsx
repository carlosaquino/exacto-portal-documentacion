import CodeBlock from '@/components/CodeBlock';
import FieldTable from '@/components/FieldTable';
import Link from 'next/link';

export default function FexVwCuotasPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/integracion-oracle/overview" className="hover:text-sky-400">Integracion Oracle</Link>
        <span>/</span>
        <span className="text-slate-300">fex_vw_cuotas</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">fex_vw_cuotas</h1>
      <p className="text-slate-400 mb-6">
        Vista de plan de cuotas. Mapea al array <code className="text-amber-400">detalleCuotas[]</code> del modelo DE.
        Solo aplica para documentos con <code className="text-amber-400">condicion = 2</code> (credito).
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Columnas</h2>

      <FieldTable
        title="Columnas de la vista"
        fields={[
          { name: 'clave_movimiento', type: 'number', required: true, description: 'Clave del documento padre (FK a fex_vw_sifen_documentos)' },
          { name: 'nro_cuota', type: 'number', required: true, description: 'Numero secuencial de la cuota' },
          { name: 'monto_cuota', type: 'number', required: true, description: 'Monto de la cuota en moneda local' },
          { name: 'vencimiento_cuota', type: 'string', required: true, description: 'Fecha de vencimiento de la cuota (formato YYYY-MM-DD)' },
          { name: 'codigo_empresa', type: 'number', required: true, description: 'Identificador de la empresa emisora' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query de Ejemplo</h2>
      <CodeBlock
        language="sql"
        code={`-- Cuotas de un documento a credito
SELECT nro_cuota, monto_cuota, vencimiento_cuota
FROM fex_vw_cuotas
WHERE clave_movimiento = 12345
ORDER BY nro_cuota;`}
      />
    </div>
  );
}
