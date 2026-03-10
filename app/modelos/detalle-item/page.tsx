import FieldTable from '@/components/FieldTable';
import CodeBlock from '@/components/CodeBlock';

export default function DetalleItemPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Detalle Item (DetalleDE)</h1>
      <p className="text-slate-400 mb-8">
        Modelo que representa un item/linea dentro del documento electronico.
        Se incluye en el array <code className="text-amber-400">detalleDE</code> del modelo DE.
      </p>

      <FieldTable
        fields={[
          { name: 'codigoArticulo', type: 'string', required: true, description: 'Codigo interno del articulo' },
          { name: 'descripcion', type: 'string', required: true, description: 'Descripcion del item' },
          { name: 'cantidad', type: 'number', required: true, description: 'Cantidad' },
          { name: 'unidadMedida', type: 'integer', required: true, description: 'Codigo SIFEN (77=Unidades)' },
          { name: 'precioUnitario', type: 'number', required: true, description: 'Precio unitario' },
          { name: 'totalBrutoItem', type: 'number', required: true, description: 'precio x cantidad' },
          { name: 'porcentajeDescuento', type: 'number', required: false, description: '% de descuento' },
          { name: 'descuentoUnitario', type: 'number', required: false, description: 'Descuento por unidad' },
          { name: 'montoTotalDescuento', type: 'number', required: false, description: 'Descuento total del item' },
          { name: 'afectaIVA', type: 'integer', required: true, description: '1=Gravado, 3=Exento' },
          { name: 'tasaImpuesto', type: 'integer', required: true, description: '0, 5 o 10' },
          { name: 'gravadas10', type: 'number', required: false, description: 'Base gravada al 10%' },
          { name: 'iva10', type: 'number', required: false, description: 'IVA calculado 10%' },
          { name: 'gravadas5', type: 'number', required: false, description: 'Base gravada al 5%' },
          { name: 'iva5', type: 'number', required: false, description: 'IVA calculado 5%' },
          { name: 'exentas', type: 'number', required: false, description: 'Monto exento del item' },
          { name: 'totalNeto', type: 'number', required: true, description: 'Total neto del item' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo JSON</h2>
      <CodeBlock
        language="json"
        code={`{
  "codigoArticulo": "ART001",
  "descripcion": "LAPTOP HP ELITEBOOK 840",
  "cantidad": 1,
  "unidadMedida": 77,
  "precioUnitario": 1100000,
  "totalBrutoItem": 1100000,
  "porcentajeDescuento": 0,
  "descuentoUnitario": 0,
  "montoTotalDescuento": 0,
  "afectaIVA": 1,
  "tasaImpuesto": 10,
  "gravadas10": 1000000,
  "iva10": 100000,
  "gravadas5": 0,
  "iva5": 0,
  "exentas": 0,
  "totalNeto": 1100000
}`}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Calculo del IVA</h2>
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 text-sm text-slate-300 space-y-3">
        <p><strong className="text-white">Tasa 10%:</strong></p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><code className="text-amber-400">gravadas10</code> = totalNeto / 1.10 (base imponible)</li>
          <li><code className="text-amber-400">iva10</code> = totalNeto - gravadas10</li>
        </ul>
        <p><strong className="text-white">Tasa 5%:</strong></p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><code className="text-amber-400">gravadas5</code> = totalNeto / 1.05</li>
          <li><code className="text-amber-400">iva5</code> = totalNeto - gravadas5</li>
        </ul>
        <p><strong className="text-white">Exento (tasa 0):</strong></p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><code className="text-amber-400">exentas</code> = totalNeto</li>
          <li><code className="text-amber-400">afectaIVA</code> = 3</li>
        </ul>
      </div>
    </div>
  );
}
