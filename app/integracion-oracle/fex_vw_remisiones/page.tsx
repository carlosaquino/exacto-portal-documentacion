import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function FexVwRemisionesPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/integracion-oracle/overview" className="hover:text-sky-400">Integracion Oracle</Link>
        <span>/</span>
        <span className="text-slate-300">fex_vw_remisiones</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">fex_vw_remisiones</h1>
      <p className="text-slate-400 mb-6">
        Vista de datos de transporte/remision. Mapea al objeto <code className="text-amber-400">detalleRemision</code> del modelo DE.
        Solo aplica para Notas de Remision Electronica (tipo 7).
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Script SQL</h2>
      <CodeBlock
        language="sql"
        code={`create or replace force view fex_vw_remisiones as
select doc.clave_movimiento
,      nre.nre_motivo_emision as motivo_emision
,      nre.nre_responsable_emision as responsable_emision
,      nre.nre_km_estimados as km_estimado
,      to_char(nre.nre_fecha_emision, 'YYYY-MM-DD') as fecha_emision_fac
,      nre.nre_tipo_transporte, nre.nre_modalidad_transporte
-- Origen / Destino
,      nre.nre_partida_direccion  as direccion_salida
,      nre.nre_partida_ciudad     as ciudad_salida
,      nre.nre_llegada_direccion  as direccion_entrega
,      nre.nre_llegada_ciudad     as ciudad_entrega
-- Vehiculo
,      veh.vehi_tipo_del_vehiculo as tipo_vehiculo
,      mar.mve_descripcion        as marca_vehiculo
,      veh.vehi_matricula         as nro_chapa
-- Transportista
,      case tra.trans_naturaleza when '1' then 1 when '2' then 2 else null end
       as naturaleza_transportista
,      tra.trans_desc as nombre_transportista, tra.trans_ruc as ruc_transportista
,      tra.trans_direccion as domicilio_fiscal
-- Conductor
,      con.cond_nro_documento as nro_documento_chofer
,      con.cond_nombre_apellido as nombre_chofer
,      doc.codigo_empresa
from   fex_vw_sifen_documentos doc
inner join nre_cabecera  nre on nre.nre_codigo    = doc.clave_movimiento
left  join repa_vehiculo veh on veh.vehi_codigo   = nre.nre_cod_vehiculo
left  join stk_marca_vehiculo mar on mar.mve_codigo = veh.codigo_marca
left  join repa_transportista tra on tra.trans_codigo = nre.nre_cod_transportista
left  join nre_conductores    con on con.cond_codigo  = nre.nre_cod_conductor;`}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query de Ejemplo</h2>
      <CodeBlock
        language="sql"
        code={`-- Datos de remision de un documento
SELECT motivo_emision, direccion_salida, ciudad_salida,
       direccion_entrega, ciudad_entrega,
       nombre_transportista, nombre_chofer, nro_chapa
FROM fex_vw_remisiones
WHERE clave_movimiento = 12345;`}
      />
    </div>
  );
}
