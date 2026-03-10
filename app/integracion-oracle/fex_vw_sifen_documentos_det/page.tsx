import CodeBlock from '@/components/CodeBlock';
import FieldTable from '@/components/FieldTable';
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

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Columnas</h2>

      <FieldTable
        title="Columnas de la vista"
        fields={[
          { name: 'clave_movimiento', type: 'number', required: true, description: 'Clave del documento padre (FK a fex_vw_sifen_documentos)' },
          { name: 'codigo_producto', type: 'string', required: true, description: 'Codigo del articulo/producto' },
          { name: 'cantidad', type: 'number', required: true, description: 'Cantidad del item' },
          { name: 'unidad_medida', type: 'number', required: true, description: 'Codigo de unidad de medida (ej: 77 = Unidad)' },
          { name: 'descripcion', type: 'string', required: true, description: 'Descripcion del producto/servicio' },
          { name: 'precio_unitario', type: 'number', required: true, description: 'Precio unitario del item' },
          { name: 'total_bruto_item', type: 'number', required: true, description: 'Total bruto (precio_unitario * cantidad)' },
          { name: 'porcentaje_descuento', type: 'number', required: false, description: 'Porcentaje de descuento aplicado' },
          { name: 'descuento_unitario', type: 'number', required: false, description: 'Monto de descuento por unidad' },
          { name: 'monto_total_descuento', type: 'number', required: false, description: 'Monto total de descuento del item' },
          { name: 'afecta_iva', type: 'number', required: true, description: '1 = Gravado, 3 = Exento' },
          { name: 'tasa_impuesto', type: 'number', required: true, description: 'Tasa de IVA: 10, 5 o 0' },
          { name: 'gravadas_10', type: 'number', required: true, description: 'Monto gravado al 10% del item' },
          { name: 'iva_10', type: 'number', required: true, description: 'IVA 10% del item' },
          { name: 'gravadas_5', type: 'number', required: true, description: 'Monto gravado al 5% del item' },
          { name: 'iva_5', type: 'number', required: true, description: 'IVA 5% del item' },
          { name: 'exentas', type: 'number', required: true, description: 'Monto exento del item' },
          { name: 'total_neto', type: 'number', required: true, description: 'Total neto del item (bruto - descuento)' },
          { name: 'codigo_empresa', type: 'number', required: true, description: 'Identificador de la empresa emisora' },
        ]}
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
