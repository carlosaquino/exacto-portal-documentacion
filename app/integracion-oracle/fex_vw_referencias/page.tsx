import CodeBlock from '@/components/CodeBlock';
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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Script SQL</h2>
      <CodeBlock
        language="sql"
        code={`create or replace force view fex_vw_referencias as
select cab.idfacturacab as clave_movimiento
,      cab.cdcref as cdc_ref, cab.timbradoref as timbrado_doc_impr
,      to_char(cab.establecimientoref) as establec_doc_impr
,      to_char(cab.puntoexpedicionref) as pto_exp_doc_impr
,      to_char(cab.nrofacturaref)      as nro_comp_doc_impr
,      to_char(cab.fechaemisionref, 'YYYY-MM-DD') as fecha_documento
,      cab.tipdocaso as tipo_doc_asociado
,      doc.codigo_empresa
from   fc_factur_sifen_cab_ts      cab
inner join fex_vw_sifen_documentos doc on doc.clave_movimiento = cab.idfacturacab
where  cab.cdcref is not null or cab.clavefacturef is not null;`}
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
