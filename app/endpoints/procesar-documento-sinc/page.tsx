import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ProcesarDocumentoSincPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Procesar Documento Sincrono</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Procesar Documento Sincrono</h1>
      <p className="text-slate-400 mb-4">
        Envia un documento electronico al middleware EXACTO para su procesamiento inmediato.
        El sistema espera la respuesta de SIFEN de forma sincrona.
        <strong className="text-sky-400"> Es el endpoint principal de la integracion.</strong>
      </p>

      <MethodBadge method="POST" path="/fe/procesar-documento-sinc" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body — Modelo DE</h2>
      <p className="text-slate-400 mb-4">
        El body debe contener un objeto <code className="text-amber-400">DE</code> (Documento Electronico) completo.
        Ver la seccion <Link href="/modelos/documento-electronico" className="text-sky-400 hover:underline">Modelos de Datos</Link> para
        la referencia completa de todos los campos.
      </p>

      <FieldTable
        title="Campos principales"
        fields={[
          { name: 'idDocumentoERP', type: 'integer', required: true, description: 'ID del documento en el ERP (clave_movimiento)' },
          { name: 'idFacturador', type: 'integer', required: true, description: 'ID de la empresa en el middleware' },
          { name: 'tipoDocumentoElectronico', type: 'integer', required: true, description: '1=FE, 4=AFE, 5=NCE, 6=NDE, 7=NRE' },
          { name: 'timbrado', type: 'integer', required: true, description: 'Numero de timbrado perpetuo vigente' },
          { name: 'establecimiento', type: 'string', required: true, description: 'Codigo de establecimiento ("001")' },
          { name: 'puntoExpedicion', type: 'integer', required: true, description: 'Punto de expedicion' },
          { name: 'nroComprobante', type: 'integer', required: true, description: 'Numero del comprobante' },
          { name: 'nroComprobanteCompleto', type: 'string', required: true, description: '"001-001-0000001"' },
          { name: 'fechaEmision', type: 'string', required: true, description: 'ISO 8601 "2026-01-15T10:30:00"' },
          { name: 'moneda', type: 'string', required: true, description: '"PYG", "USD", "BRL"' },
          { name: 'tipoCambio', type: 'number', required: true, description: 'Cotizacion. 1 si moneda = PYG' },
          { name: 'condicionVenta', type: 'string', required: true, description: '"CONTADO" o "CREDITO"' },
          { name: 'tipoOperacion', type: 'string', required: true, description: '"B2B", "B2C", "B2G", "B2F"' },
          { name: 'detalleDE', type: 'array', required: true, description: 'Items del documento' },
          { name: 'detalleCobro', type: 'array', required: true, description: 'Medios de pago' },
          { name: 'detalleCuotas', type: 'array', required: false, description: 'Solo si condicion = CREDITO' },
          { name: 'detalleDEsAsociados', type: 'array', required: false, description: 'Solo para NC/ND (tipo 5 o 6)' },
          { name: 'detalleRemision', type: 'object', required: false, description: 'Solo para NRE (tipo 7)' },
          { name: 'detalleAutoFactura', type: 'object', required: false, description: 'Solo para AFE (tipo 4)' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo completo</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/procesar-documento-sinc" \\
  -H "Content-Type: application/json" \\
  -d '{
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
    "detalleDEsAsociados": []
  }'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
DE de = new DE();
de.setIdDocumentoERP(12345L);
de.setIdFacturador(1);
de.setTipoDocumentoElectronico(1);
de.setTimbrado(12345678);
de.setEstablecimiento("001");
de.setPuntoExpedicion(1);
de.setNroComprobante(1);
de.setNroComprobanteCompleto("001-001-0000001");
de.setFechaEmision("2026-01-15T10:30:00");
de.setMoneda("PYG");
de.setTipoCambio(1);
de.setCondicionVenta("CONTADO");
de.setTipoOperacion("B2B");
de.setTipoDocumentoReceptor("RUC");
de.setRazonSocialReceptor("EMPRESA RECEPTORA S.A.");
de.setCorreoElectronicoReceptor("factura@empresa.com");

// Items
DetalleDE item = new DetalleDE();
item.setCodigoArticulo("ART001");
item.setDescripcion("LAPTOP HP ELITEBOOK 840");
item.setCantidad(1);
item.setUnidadMedida(77);
item.setPrecioUnitario(1100000);
item.setTotalBrutoItem(1100000);
item.setAfectaIVA(1);
item.setTasaImpuesto(10);
item.setGravadas10(1000000);
item.setIva10(100000);
item.setTotalNeto(1100000);
de.setDetalleDE(List.of(item));

// Cobros
DetalleCobro cobro = new DetalleCobro();
cobro.setTipoPago(1);
cobro.setImporte(1100000);
cobro.setMoneda("PYG");
cobro.setCotizacionMoneda(1);
de.setDetalleCobro(List.of(cobro));

HttpEntity<DE> entity = new HttpEntity<>(de, jsonHeaders());
ResponseDE response = restTemplate.postForObject(
    apiUrl + "/fe/procesar-documento-sinc",
    entity, ResponseDE.class
);`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/procesar-documento-sinc\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idDocumentoERP: 12345,
      idFacturador: 1,
      tipoDocumentoElectronico: 1,
      timbrado: 12345678,
      establecimiento: "001",
      puntoExpedicion: 1,
      nroComprobante: 1,
      nroComprobanteCompleto: "001-001-0000001",
      fechaEmision: "2026-01-15T10:30:00",
      moneda: "PYG",
      tipoCambio: 1,
      condicionVenta: "CONTADO",
      tipoOperacion: "B2B",
      tipoDocumentoReceptor: "RUC",
      razonSocialReceptor: "EMPRESA RECEPTORA S.A.",
      correoElectronicoReceptor: "factura@empresa.com",
      detalleDE: [{
        codigoArticulo: "ART001",
        descripcion: "LAPTOP HP ELITEBOOK 840",
        cantidad: 1,
        unidadMedida: 77,
        precioUnitario: 1100000,
        totalBrutoItem: 1100000,
        afectaIVA: 1,
        tasaImpuesto: 10,
        gravadas10: 1000000,
        iva10: 100000,
        totalNeto: 1100000
      }],
      detalleCobro: [{
        tipoPago: 1,
        importe: 1100000,
        moneda: "PYG",
        cotizacionMoneda: 1
      }]
    })
  }
);

const data = await response.json();
console.log("CDC:", data.cdc);
console.log("Estado:", data.estado);`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200 — ResponseDE</h2>
      <CodeBlock
        language="json"
        code={`{
  "id": "resp_abc123",
  "cdc": "01800123451001001000000012026011511000000000",
  "estado": "APROBADO",
  "descripcionEstado": "Aprobado por SIFEN",
  "fecha": "2026-01-15T10:30:45",
  "idDocumentoERP": 12345,
  "qrLink": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
  "response": {}
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'id', type: 'string', required: true, description: 'ID interno de la respuesta' },
          { name: 'cdc', type: 'string', required: true, description: 'CDC asignado por SIFEN (44 caracteres)' },
          { name: 'estado', type: 'string', required: true, description: '"APROBADO", "RECHAZADO", "EN_PROCESO"' },
          { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion legible del estado' },
          { name: 'fecha', type: 'string', required: true, description: 'Fecha/hora de procesamiento' },
          { name: 'idDocumentoERP', type: 'integer', required: true, description: 'ID original en el ERP' },
          { name: 'qrLink', type: 'string', required: true, description: 'URL del QR en ekuatia' },
        ]}
      />
    </div>
  );
}
