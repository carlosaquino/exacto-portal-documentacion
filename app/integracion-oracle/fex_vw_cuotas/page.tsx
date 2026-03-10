import CodeBlock from '@/components/CodeBlock';
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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Script SQL</h2>
      <CodeBlock
        language="sql"
        code={`create or replace force view fex_vw_cuotas as
select cuo.cuo_clave_doc as clave_movimiento
,      row_number() over (partition by cuo.cuo_clave_doc order by cuo.cuo_fec_vto) as nro_cuota
,      round(cuo.cuo_imp_loc,0) as monto_cuota
,      to_char(cuo.cuo_fec_vto, 'YYYY-MM-DD') as vencimiento_cuota
,      doc.codigo_empresa
from   fin_cuota cuo
inner join fex_vw_sifen_documentos doc on doc.clave_movimiento = cuo.cuo_clave_doc
where  doc.condicion = 2
and    nvl(cuo.cuo_imp_loc,0) > 0;`}
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
