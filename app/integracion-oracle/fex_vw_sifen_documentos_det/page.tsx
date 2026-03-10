import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function FexVwSifenDocumentosDetPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/integracion-oracle/overview" className="hover:text-sky-400">Integracion Oracle</Link>
        <span>/</span>
        <span className="text-slate-300">fex_vw_sifen_documentos_det</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">fex_vw_sifen_documentos_det</h1>
      <p className="text-slate-400 mb-6">
        Vista de detalle de items. Mapea al array <code className="text-amber-400">detalleDE[]</code> del modelo DE.
        Incluye desglose de IVA por item (10%, 5%, exentas).
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Script SQL</h2>
      <CodeBlock
        language="sql"
        code={`create or replace force view fex_vw_sifen_documentos_det as
select det.idfacturadet as clave_movimiento
,      det.idarticulo   as codigo_producto
,      det.cantidad,    nvl(det.idunimed, 77) as unidad_medida
,      upper(trim(det.descripcion)) as descripcion
,      round(det.preciounitario, 0) as precio_unitario
,      round(det.preciounitario * det.cantidad, 0) as total_bruto_item
,      case when det.valordescuento>0 and det.preciounitario>0 and det.cantidad>0
            then round((det.valordescuento/(det.preciounitario*det.cantidad))*100, 2)
            else 0 end  as porcentaje_descuento
,      case when det.valordescuento>0 and det.cantidad>0
            then round(det.valordescuento/det.cantidad, 0) else 0 end as descuento_unitario
,      round(nvl(det.valordescuento,0), 0) as monto_total_descuento
,      case when nvl(det.porcentaje,0)>0 then 1 else 3 end as afecta_iva
,      nvl(det.porcentaje,0)              as tasa_impuesto
,      round(case when det.porcentaje=10 then det.montogravada else 0 end, 0) as gravadas_10
,      round(case when det.porcentaje=10 then det.iva          else 0 end, 0) as iva_10
,      round(case when det.porcentaje=5  then det.montogravada else 0 end, 0) as gravadas_5
,      round(case when det.porcentaje=5  then det.iva          else 0 end, 0) as iva_5
,      round(case when nvl(det.porcentaje,0)=0
                  then det.preciounitario*det.cantidad - nvl(det.valordescuento,0)
                  else 0 end, 0)         as exentas
,      round(det.preciounitario*det.cantidad - nvl(det.valordescuento,0), 0) as total_neto
,      pe.id as codigo_empresa
from   fc_factur_sifen_det_ts    det
inner join fex_vw_sifen_documentos doc on doc.clave_movimiento = det.idfacturadet
inner join fc_param_empresa        pe  on pe.id = doc.codigo_empresa;`}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query de Ejemplo</h2>
      <CodeBlock
        language="sql"
        code={`-- Items de un documento
SELECT codigo_producto, descripcion, cantidad, precio_unitario,
       tasa_impuesto, gravadas_10, iva_10, total_neto
FROM fex_vw_sifen_documentos_det
WHERE clave_movimiento = 12345;`}
      />
    </div>
  );
}
