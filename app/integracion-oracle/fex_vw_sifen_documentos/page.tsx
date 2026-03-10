import CodeBlock from '@/components/CodeBlock';
import FieldTable from '@/components/FieldTable';
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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Columnas</h2>

      <FieldTable
        title="Columnas de la vista"
        fields={[
          { name: 'clave_movimiento', type: 'number', required: true, description: 'Clave unica del documento en el ERP' },
          { name: 'codigo_departamento_emisor', type: 'number', required: true, description: 'Codigo del departamento del emisor' },
          { name: 'codigo_ciudad_emisor', type: 'number', required: true, description: 'Codigo de la ciudad del emisor' },
          { name: 'denominacion_sucursal', type: 'string', required: true, description: 'Nombre de la sucursal emisora' },
          { name: 'direccion_emisor', type: 'string', required: true, description: 'Direccion del establecimiento emisor' },
          { name: 'telefono_emisor', type: 'string', required: false, description: 'Telefono del emisor' },
          { name: 'tipo_documento_electronico', type: 'number', required: true, description: 'Tipo de DE: 1=Factura, 4=Autofactura, 5=Nota Credito, 6=Nota Debito' },
          { name: 'timbrado', type: 'number', required: true, description: 'Numero de timbrado del documento' },
          { name: 'fecha_inicio_timbrado', type: 'date', required: false, description: 'Fecha de vencimiento del timbrado' },
          { name: 'establecimiento', type: 'string', required: true, description: 'Codigo de establecimiento (ej: "001")' },
          { name: 'punto_expedicion', type: 'number', required: true, description: 'Punto de expedicion' },
          { name: 'comprobante', type: 'number', required: true, description: 'Numero de comprobante' },
          { name: 'nro_comprobante', type: 'string', required: true, description: 'Numero de comprobante completo (ej: "001-001-0000001")' },
          { name: 'fecha_hora_emision', type: 'datetime', required: true, description: 'Fecha y hora de emision del documento' },
          { name: 'condicion', type: 'number', required: true, description: 'Condicion de venta: 1=Contado, 2=Credito' },
          { name: 'total_exentas', type: 'number', required: true, description: 'Total de montos exentos de IVA' },
          { name: 'gravadas_10', type: 'number', required: true, description: 'Monto gravado al 10%' },
          { name: 'iva_10', type: 'number', required: true, description: 'IVA al 10%' },
          { name: 'gravadas_5', type: 'number', required: true, description: 'Monto gravado al 5%' },
          { name: 'iva_5', type: 'number', required: true, description: 'IVA al 5%' },
          { name: 'total_neto_operacion', type: 'number', required: true, description: 'Total neto de la operacion' },
          { name: 'estado', type: 'string', required: true, description: '"V" = Verificado/enviado, "P" = Pendiente de envio' },
          { name: 'cdc', type: 'string', required: true, description: 'Codigo de Control del Documento (44 caracteres)' },
          { name: 'codigo_empresa', type: 'number', required: true, description: 'Identificador de la empresa emisora' },
          { name: 'ruc_sin_dv_emisor', type: 'string', required: true, description: 'RUC del emisor sin digito verificador' },
        ]}
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
