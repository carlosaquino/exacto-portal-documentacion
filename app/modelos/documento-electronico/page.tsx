import FieldTable from '@/components/FieldTable';
import CodeBlock from '@/components/CodeBlock';
import AlertBox from '@/components/AlertBox';

export default function DocumentoElectronicoPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Documento Electronico (DE)</h1>
      <p className="text-slate-400 mb-8">
        Modelo principal que representa un documento electronico enviado al middleware EXACTO.
        Se usa como body del endpoint <code className="text-amber-400">POST /fe/procesar-documento-sinc</code>.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4">Campos de Cabecera</h2>
      <FieldTable
        fields={[
          { name: 'idDocumentoERP', type: 'integer', required: true, description: 'ID del documento en el ERP (clave_movimiento)' },
          { name: 'idFacturador', type: 'integer', required: true, description: 'ID de la empresa en el middleware' },
          { name: 'tipoDocumentoElectronico', type: 'integer', required: true, description: '1=FE, 4=AFE, 5=NCE, 6=NDE, 7=NRE' },
          { name: 'timbrado', type: 'integer', required: true, description: 'Numero de timbrado perpetuo vigente' },
          { name: 'establecimiento', type: 'string', required: true, description: 'Codigo de establecimiento ("001")' },
          { name: 'puntoExpedicion', type: 'integer', required: true, description: 'Punto de expedicion' },
          { name: 'nroComprobante', type: 'integer', required: true, description: 'Numero del comprobante' },
          { name: 'nroComprobanteCompleto', type: 'string', required: true, description: 'Formato "001-001-0000001"' },
          { name: 'fechaEmision', type: 'string', required: true, description: 'ISO 8601: "2026-01-15T10:30:00"' },
          { name: 'moneda', type: 'string', required: true, description: '"PYG", "USD", "BRL"' },
          { name: 'tipoCambio', type: 'number', required: true, description: 'Cotizacion. 1 si moneda = PYG' },
          { name: 'condicionVenta', type: 'string', required: true, description: '"CONTADO" o "CREDITO"' },
          { name: 'tipoOperacion', type: 'string', required: true, description: '"B2B", "B2C", "B2G", "B2F"' },
          { name: 'tipoContribuyente', type: 'string', required: true, description: '"RUC" o "CI"' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Datos del Emisor (Sucursal)</h2>
      <FieldTable
        fields={[
          { name: 'denominacionSucursal', type: 'string', required: false, description: 'Nombre de la sucursal ("CASA CENTRAL")' },
          { name: 'direccionSucursalEmisor', type: 'string', required: false, description: 'Direccion del emisor' },
          { name: 'telefonoSucursalEmisor', type: 'string', required: false, description: 'Telefono del emisor' },
          { name: 'numeroCasaSucursalEmisor', type: 'string', required: false, description: 'Numero de casa' },
          { name: 'codigoDepartamentoEmisor', type: 'integer', required: false, description: 'Codigo departamento SIFEN' },
          { name: 'codigoCiudadEmisor', type: 'integer', required: false, description: 'Codigo ciudad SIFEN' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Datos del Receptor</h2>
      <FieldTable
        fields={[
          { name: 'tipoDocumentoReceptor', type: 'string', required: true, description: '"RUC", "CI", "PASAPORTE", etc.' },
          { name: 'razonSocialReceptor', type: 'string', required: true, description: 'Razon social o nombre del receptor' },
          { name: 'correoElectronicoReceptor', type: 'string', required: false, description: 'Email para enviar el KuDE' },
          { name: 'telefonoReceptor', type: 'string', required: false, description: 'Telefono fijo' },
          { name: 'celularReceptor', type: 'string', required: false, description: 'Celular' },
          { name: 'direccionReceptor', type: 'string', required: false, description: 'Direccion del receptor' },
          { name: 'codigoDepartamentoReceptor', type: 'integer', required: false, description: 'Codigo departamento' },
          { name: 'codigoCiudadReceptor', type: 'integer', required: false, description: 'Codigo ciudad' },
          { name: 'paisReceptor', type: 'string', required: false, description: 'Codigo ISO pais ("PRY")' },
          { name: 'tipoPersonaReceptor', type: 'string', required: false, description: '"FISICA" o "JURIDICA"' },
          { name: 'tipoNaturalezaReceptor', type: 'string', required: false, description: '"CONTRIBUYENTE" o "NO_CONTRIBUYENTE"' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Datos de Credito</h2>
      <FieldTable
        fields={[
          { name: 'montoEntregaInicial', type: 'number', required: false, description: 'Entrega inicial (solo credito)' },
          { name: 'cantidadCuotas', type: 'integer', required: false, description: 'Cantidad de cuotas' },
          { name: 'cantidadDias', type: 'integer', required: false, description: 'Plazo en dias' },
          { name: 'plazoCredito', type: 'string', required: false, description: 'Descripcion del plazo' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Campos Informativos</h2>
      <FieldTable
        fields={[
          { name: 'informacionInteresEmisor', type: 'string', required: false, description: 'Informacion adicional del emisor' },
          { name: 'informacionInteresFisco', type: 'string', required: false, description: 'Informacion de interes fiscal' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Colecciones</h2>
      <FieldTable
        fields={[
          { name: 'detalleDE', type: 'DetalleDE[]', required: true, description: 'Items del documento' },
          { name: 'detalleCobro', type: 'DetalleCobro[]', required: true, description: 'Medios de pago' },
          { name: 'detalleCuotas', type: 'DetalleCuotas[]', required: false, description: 'Solo si condicionVenta = "CREDITO"' },
          { name: 'detalleDEsAsociados', type: 'array', required: false, description: 'Solo para NC/ND (tipo 5 o 6)' },
          { name: 'detalleRemision', type: 'object', required: false, description: 'Solo para NRE (tipo 7)' },
          { name: 'detalleTransporte', type: 'object', required: false, description: 'Datos de transporte' },
          { name: 'detalleAutoFactura', type: 'object', required: false, description: 'Solo para AFE (tipo 4)' },
        ]}
      />

      <AlertBox variant="info" title="Nota">
        Los campos condicionales (detalleCuotas, detalleDEsAsociados, detalleRemision, detalleAutoFactura)
        son requeridos segun el tipo de documento y condicion de venta.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo JSON completo</h2>
      <CodeBlock
        language="json"
        code={`{
  "idDocumentoERP": 12345,
  "idFacturador": 1,
  "tipoDocumentoElectronico": 1,
  "timbrado": 12345678,
  "establecimiento": "001",
  "puntoExpedicion": 1,
  "nroComprobante": 1,
  "nroComprobanteCompleto": "001-001-0000001",
  "fechaEmision": "2026-01-15T10:30:00",
  "moneda": "PYG",
  "tipoCambio": 1,
  "condicionVenta": "CONTADO",
  "tipoOperacion": "B2B",
  "tipoContribuyente": "RUC",
  "denominacionSucursal": "CASA CENTRAL",
  "direccionSucursalEmisor": "AV. PRINCIPAL 123",
  "telefonoSucursalEmisor": "021-123456",
  "numeroCasaSucursalEmisor": "123",
  "codigoDepartamentoEmisor": 11,
  "codigoCiudadEmisor": 1,
  "tipoDocumentoReceptor": "RUC",
  "razonSocialReceptor": "EMPRESA RECEPTORA S.A.",
  "correoElectronicoReceptor": "factura@empresa.com",
  "telefonoReceptor": "021-654321",
  "celularReceptor": "0981-123456",
  "direccionReceptor": "CALLE COMERCIAL 456",
  "codigoDepartamentoReceptor": 11,
  "codigoCiudadReceptor": 1,
  "paisReceptor": "PRY",
  "tipoPersonaReceptor": "JURIDICA",
  "tipoNaturalezaReceptor": "CONTRIBUYENTE",
  "montoEntregaInicial": 0,
  "cantidadCuotas": 0,
  "detalleDE": [
    {
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
    }
  ],
  "detalleCobro": [
    {
      "tipoPago": 1,
      "importe": 1100000,
      "moneda": "PYG",
      "cotizacionMoneda": 1
    }
  ],
  "detalleCuotas": [],
  "detalleDEsAsociados": [],
  "detalleRemision": null,
  "detalleTransporte": null,
  "detalleAutoFactura": null
}`}
      />
    </div>
  );
}
