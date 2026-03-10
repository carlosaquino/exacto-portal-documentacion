import CodeBlock from '@/components/CodeBlock';
import FieldTable from '@/components/FieldTable';
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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Columnas</h2>

      <FieldTable
        title="Columnas de la vista"
        fields={[
          { name: 'clave_movimiento', type: 'number', required: true, description: 'Clave del documento de remision' },
          { name: 'motivo_emision', type: 'string', required: true, description: 'Motivo de emision de la nota de remision' },
          { name: 'responsable_emision', type: 'string', required: true, description: 'Responsable de la emision' },
          { name: 'km_estimado', type: 'number', required: false, description: 'Kilometros estimados del recorrido' },
          { name: 'fecha_emision_fac', type: 'string', required: true, description: 'Fecha de emision (formato YYYY-MM-DD)' },
          { name: 'nre_tipo_transporte', type: 'string', required: true, description: 'Tipo de transporte' },
          { name: 'nre_modalidad_transporte', type: 'string', required: true, description: 'Modalidad de transporte' },
          { name: 'direccion_salida', type: 'string', required: true, description: 'Direccion del punto de partida' },
          { name: 'ciudad_salida', type: 'string', required: true, description: 'Ciudad del punto de partida' },
          { name: 'direccion_entrega', type: 'string', required: true, description: 'Direccion del punto de llegada' },
          { name: 'ciudad_entrega', type: 'string', required: true, description: 'Ciudad del punto de llegada' },
          { name: 'tipo_vehiculo', type: 'string', required: false, description: 'Tipo del vehiculo de transporte' },
          { name: 'marca_vehiculo', type: 'string', required: false, description: 'Marca del vehiculo' },
          { name: 'nro_chapa', type: 'string', required: false, description: 'Numero de chapa/matricula del vehiculo' },
          { name: 'naturaleza_transportista', type: 'number', required: false, description: '1 = Persona Fisica, 2 = Persona Juridica' },
          { name: 'nombre_transportista', type: 'string', required: false, description: 'Nombre o razon social del transportista' },
          { name: 'ruc_transportista', type: 'string', required: false, description: 'RUC del transportista' },
          { name: 'domicilio_fiscal', type: 'string', required: false, description: 'Domicilio fiscal del transportista' },
          { name: 'nro_documento_chofer', type: 'string', required: false, description: 'Numero de documento del conductor' },
          { name: 'nombre_chofer', type: 'string', required: false, description: 'Nombre y apellido del conductor' },
          { name: 'codigo_empresa', type: 'number', required: true, description: 'Identificador de la empresa emisora' },
        ]}
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
