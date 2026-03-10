import CodeBlock from '@/components/CodeBlock';
import FieldTable from '@/components/FieldTable';
import Link from 'next/link';

export default function FexVwReferenciasPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/integracion-oracle/overview" className="hover:text-sky-400">Integracion Oracle</Link>
        <span>/</span>
        <span className="text-slate-300">fex_vw_referencias</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">fex_vw_referencias</h1>
      <p className="text-slate-400 mb-6">
        Vista de documentos asociados. Mapea al array <code className="text-amber-400">detalleDEsAsociados[]</code> del modelo DE.
        Utilizada para Notas de Credito (tipo 5) y Notas de Debito (tipo 6) que referencian a un documento original.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Columnas</h2>

      <FieldTable
        title="Columnas de la vista"
        fields={[
          { name: 'clave_movimiento', type: 'number', required: true, description: 'Clave del documento que hace la referencia' },
          { name: 'cdc_ref', type: 'string', required: false, description: 'CDC del documento electronico referenciado (44 caracteres)' },
          { name: 'timbrado_doc_impr', type: 'string', required: false, description: 'Timbrado del documento impreso referenciado' },
          { name: 'establec_doc_impr', type: 'string', required: false, description: 'Establecimiento del documento impreso referenciado' },
          { name: 'pto_exp_doc_impr', type: 'string', required: false, description: 'Punto de expedicion del documento impreso referenciado' },
          { name: 'nro_comp_doc_impr', type: 'string', required: false, description: 'Numero de comprobante del documento impreso referenciado' },
          { name: 'fecha_documento', type: 'string', required: false, description: 'Fecha del documento referenciado (formato YYYY-MM-DD)' },
          { name: 'tipo_doc_asociado', type: 'string', required: false, description: 'Tipo del documento asociado' },
          { name: 'codigo_empresa', type: 'number', required: true, description: 'Identificador de la empresa emisora' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query de Ejemplo</h2>
      <CodeBlock
        language="sql"
        code={`-- Referencias de una nota de credito
SELECT cdc_ref, timbrado_doc_impr, nro_comp_doc_impr, fecha_documento
FROM fex_vw_referencias
WHERE clave_movimiento = 12345;`}
      />
    </div>
  );
}
