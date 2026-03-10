import CodeBlock from '@/components/CodeBlock';
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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Script SQL</h2>
      <CodeBlock
        language="sql"
        code={`create or replace force view fex_vw_cobros as
-- Pagos registrados (credito)
select pag.pag_clave_doc as clave_movimiento
,      1 as tipo, round(pag.pag_imp_loc,0) as monto, 'PYG' as moneda, 1 as cotizacion_moneda
,      null as codigo_tarjeta, null as procesadora, null as codigo_autorizacion
,      null as titular, null as nro_tarjeta, null as nro_cheque, null as banco_emisor
,      doc.codigo_empresa
from   fin_pago pag
inner join fex_vw_sifen_documentos doc on doc.clave_movimiento = pag.pag_clave_doc
where  doc.condicion = 2
union all
-- Ventas contado (cobro inmediato por el total)
select doc.clave_movimiento, 1, doc.total_neto_operacion, doc.moneda, doc.cotizacion_moneda
,      null, null, null, null, null, null, null, doc.codigo_empresa
from   fex_vw_sifen_documentos doc
where  doc.condicion = 1;`}
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
