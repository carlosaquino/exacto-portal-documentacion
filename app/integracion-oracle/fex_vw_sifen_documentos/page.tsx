import CodeBlock from '@/components/CodeBlock';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function FexVwSifenDocumentosPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/integracion-oracle/overview" className="hover:text-sky-400">Integracion Oracle</Link>
        <span>/</span>
        <span className="text-slate-300">fex_vw_sifen_documentos</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">fex_vw_sifen_documentos</h1>
      <p className="text-slate-400 mb-4">
        Vista maestra que adapta los documentos del ERP al formato SIFEN.
        Mapea a la <strong>cabecera</strong> del modelo DE (datos generales, emisor, receptor, totales).
      </p>

      <div className="flex gap-2 mb-6">
        <span className="px-2 py-1 text-xs rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700">Vista Maestra</span>
        <span className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-600">Cabecera DE</span>
      </div>

      <AlertBox variant="warning" title="Ambiente SIFEN">
        Cambiar <code className="text-amber-400">pe.environment = &apos;DEV&apos;</code> en ambiente de pruebas SIFEN.
        En produccion usar <code className="text-amber-400">&apos;PROD&apos;</code>.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Script SQL</h2>
      <CodeBlock
        language="sql"
        code={`-- =====================================================================================
-- Vista           : fex_vw_sifen_documentos
-- Autor           : Carlos Aquino — IPYAHU
-- Fecha Creacion  : 05/03/2026
-- Proposito       : Vista maestra — adapta documentos al formato SIFEN.
--                   Filtra documentos de los ultimos 60 dias con CDC generado.
-- =====================================================================================
create or replace force view fex_vw_sifen_documentos as
with
timbrado_unico as (
    select timp_nro_timbrado, timp_establecimiento, timp_punto_emision, timp_fec_vto
    ,      row_number() over (
               partition by timp_nro_timbrado, timp_establecimiento, timp_punto_emision
               order by timp_clave desc
           ) as rn
    from   gen_timbrado_impresora
    where  tmp_estado = 'A'
),
totales_detalle as (
    select det.idfacturadet as clave_doc
    ,      sum(case when nvl(det.porcentaje,0)=0
                    then det.preciounitario*det.cantidad - nvl(det.valordescuento,0)
               else 0 end)  as total_exentas
    ,      sum(case when det.porcentaje=5
                    then det.preciounitario*det.cantidad else 0 end) as total_gravadas_5
    ,      sum(case when det.porcentaje=10
                    then det.preciounitario*det.cantidad else 0 end) as total_gravadas_10
    ,      sum(case when det.porcentaje=10 then det.montogravada else 0 end) as gravadas_10
    ,      sum(case when det.porcentaje=10 then det.iva          else 0 end) as iva_10
    ,      sum(case when det.porcentaje=5  then det.montogravada else 0 end) as gravadas_5
    ,      sum(case when det.porcentaje=5  then det.iva          else 0 end) as iva_5
    ,      sum(nvl(det.valordescuento,0))  as total_descuento
    ,      sum(det.preciounitario*det.cantidad - nvl(det.valordescuento,0)) as total_neto_operacion
    from   fc_factur_sifen_det_ts det
    group  by det.idfacturadet
)
select cab.idfacturacab                as clave_movimiento
,      to_number(pe.codigo_departamento) as codigo_departamento_emisor
,      pe.codigo_ciudad                as codigo_ciudad_emisor
,      upper(trim(suc.suc_desc))       as denominacion_sucursal
,      upper(trim(pe.direccion_empresa)) as direccion_emisor
,      pe.telefono                     as telefono_emisor
,      case cab.tipodocumento
       when 'FACTURA'      then 1
       when 'NOTA_CREDITO' then 5
       when 'NOTA_DEBITO'  then 6
       when 'AUTOFACTURA'  then 4
       else 1 end                      as tipo_documento_electronico
,      cab.timbrado, tim.timp_fec_vto  as fecha_inicio_timbrado
,      cab.establecimiento, cab.puntoexpedicion as punto_expedicion
,      cab.nrofactura as comprobante,  cab.nrofacturacompleto as nro_comprobante
,      cab.fechaemision as fecha_hora_emision
,      case cab.tipofactura
       when 'CONTADO' then 1 when 'CREDITO' then 2 else 1 end as condicion
,      round(nvl(td.total_exentas,0),0)        as total_exentas
,      round(nvl(td.gravadas_10,0),0)          as gravadas_10
,      round(nvl(td.iva_10,0),0)               as iva_10
,      round(nvl(td.gravadas_5,0),0)           as gravadas_5
,      round(nvl(td.iva_5,0),0)                as iva_5
,      round(nvl(td.total_neto_operacion,0),0) as total_neto_operacion
,      case when cab.codigo_estado=300 then 'V' else 'P' end as estado
,      cab.cdc, pe.id as codigo_empresa, pe.ruc as ruc_sin_dv_emisor
from   fc_factur_sifen_cab_ts    cab
inner join fin_documento          doc on doc.doc_clave  = cab.idfacturacab
inner join fin_cliente            cli on cli.cli_codigo = doc.doc_cli
inner join gen_sucursal           suc on suc.suc_codigo = doc.doc_suc
                                     and suc.suc_empr   = doc.doc_empr
inner join fc_param_empresa       pe  on lpad(pe.ruc,8,'0') = substr(cab.cdc,3,8)
                                     and pe.environment  = 'PROD'  -- 'DEV' para testing
left  join timbrado_unico         tim on tim.timp_nro_timbrado    = cab.timbrado
                                     and tim.rn = 1
left  join totales_detalle        td  on td.clave_doc = cab.idfacturacab
where  cab.cdc is not null
and    cab.fechaemision >= trunc(sysdate) - 60;`}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query de Ejemplo</h2>
      <CodeBlock
        language="sql"
        code={`-- Obtener un documento por clave_movimiento
SELECT * FROM fex_vw_sifen_documentos
WHERE clave_movimiento = 12345;

-- Documentos pendientes de envio
SELECT clave_movimiento, nro_comprobante, estado
FROM fex_vw_sifen_documentos
WHERE estado = 'P'
ORDER BY fecha_hora_emision;`}
      />
    </div>
  );
}
