import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ProcesarLoteAsincOfflinePage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Procesar Lote Asincrono Offline</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Procesar Lote Asincrono Offline</h1>
      <p className="text-slate-400 mb-4">
        Envia un lote de documentos electronicos para procesamiento asincrono en escenarios donde SIFEN no esta disponible.
        Los documentos son encolados localmente y reenviados automaticamente cuando la conectividad con SIFEN se restablece.
      </p>

      <MethodBadge method="POST" path="/fe/procesar-lote-asinc-offline" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <AlertBox variant="warning" title="Modo Offline">
        Este endpoint esta disenado para escenarios de contingencia donde SIFEN (DNIT) no esta disponible.
        Los documentos se almacenan en la cola interna del middleware y se procesan automaticamente
        cuando la conectividad se restablece. No requiere conexion activa con SIFEN al momento del envio.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body</h2>
      <p className="text-slate-400 mb-4">
        El body debe contener un <code className="text-amber-400">Array</code> de objetos{' '}
        <code className="text-amber-400">DE</code> (Documento Electronico), con la misma estructura
        que el endpoint{' '}
        <Link href="/endpoints/procesar-lote-asinc" className="text-sky-400 hover:underline">procesar-lote-asinc</Link>.
      </p>

      <FieldTable
        title="Estructura del Array"
        fields={[
          { name: 'body', type: 'Array<DE>', required: true, description: 'Array de objetos DE. Misma estructura que el lote asincrono regular.' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/procesar-lote-asinc-offline" \\
  -H "Content-Type: application/json" \\
  -d '[
    {
      "idDocumentoERP": 20001,
      "idFacturador": 1,
      "tipoDocumentoElectronico": 1,
      "timbrado": 12345678,
      "establecimiento": "001",
      "puntoExpedicion": 1,
      "nroComprobante": 100,
      "nroComprobanteCompleto": "001-001-0000100",
      "fechaEmision": "2026-01-15T14:00:00",
      "moneda": "PYG",
      "tipoCambio": 1,
      "condicionVenta": "CONTADO",
      "tipoOperacion": "B2B",
      "tipoDocumentoReceptor": "RUC",
      "razonSocialReceptor": "CLIENTE OFFLINE S.A.",
      "detalleDE": [
        {
          "codigoArticulo": "ART010",
          "descripcion": "SERVICIO DE CONSULTORIA",
          "cantidad": 1,
          "unidadMedida": 77,
          "precioUnitario": 2000000,
          "totalBrutoItem": 2000000,
          "afectaIVA": 1,
          "tasaImpuesto": 10,
          "gravadas10": 1818182,
          "iva10": 181818,
          "totalNeto": 2000000
        }
      ],
      "detalleCobro": [
        {
          "tipoPago": 1,
          "importe": 2000000,
          "moneda": "PYG",
          "cotizacionMoneda": 1
        }
      ]
    },
    {
      "idDocumentoERP": 20002,
      "idFacturador": 1,
      "tipoDocumentoElectronico": 1,
      "timbrado": 12345678,
      "establecimiento": "001",
      "puntoExpedicion": 1,
      "nroComprobante": 101,
      "nroComprobanteCompleto": "001-001-0000101",
      "fechaEmision": "2026-01-15T14:05:00",
      "moneda": "PYG",
      "tipoCambio": 1,
      "condicionVenta": "CONTADO",
      "tipoOperacion": "B2C",
      "tipoDocumentoReceptor": "CI",
      "razonSocialReceptor": "JUAN PEREZ",
      "detalleDE": [
        {
          "codigoArticulo": "ART011",
          "descripcion": "PRODUCTO VENTA MOSTRADOR",
          "cantidad": 3,
          "unidadMedida": 77,
          "precioUnitario": 150000,
          "totalBrutoItem": 450000,
          "afectaIVA": 1,
          "tasaImpuesto": 10,
          "gravadas10": 409091,
          "iva10": 40909,
          "totalNeto": 450000
        }
      ],
      "detalleCobro": [
        {
          "tipoPago": 1,
          "importe": 450000,
          "moneda": "PYG",
          "cotizacionMoneda": 1
        }
      ]
    }
  ]'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
List<DE> lote = new ArrayList<>();

DE de1 = new DE();
de1.setIdDocumentoERP(20001L);
de1.setIdFacturador(1);
de1.setTipoDocumentoElectronico(1);
de1.setTimbrado(12345678);
de1.setEstablecimiento("001");
de1.setPuntoExpedicion(1);
de1.setNroComprobante(100);
de1.setNroComprobanteCompleto("001-001-0000100");
de1.setFechaEmision("2026-01-15T14:00:00");
de1.setMoneda("PYG");
de1.setCondicionVenta("CONTADO");
de1.setTipoOperacion("B2B");
// ... completar campos y detalles
lote.add(de1);

DE de2 = new DE();
de2.setIdDocumentoERP(20002L);
de2.setIdFacturador(1);
// ... completar campos y detalles
lote.add(de2);

HttpEntity<List<DE>> entity = new HttpEntity<>(lote, jsonHeaders());
ResponseLoteDE response = restTemplate.postForObject(
    apiUrl + "/fe/procesar-lote-asinc-offline",
    entity, ResponseLoteDE.class
);

System.out.println("ID Lote: " + response.getIdLote());
System.out.println("Documentos encolados: "
    + response.getCantidadDocumentos());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const lote = [
  {
    idDocumentoERP: 20001,
    idFacturador: 1,
    tipoDocumentoElectronico: 1,
    timbrado: 12345678,
    establecimiento: "001",
    puntoExpedicion: 1,
    nroComprobante: 100,
    nroComprobanteCompleto: "001-001-0000100",
    fechaEmision: "2026-01-15T14:00:00",
    moneda: "PYG",
    tipoCambio: 1,
    condicionVenta: "CONTADO",
    tipoOperacion: "B2B",
    tipoDocumentoReceptor: "RUC",
    razonSocialReceptor: "CLIENTE OFFLINE S.A.",
    detalleDE: [{
      codigoArticulo: "ART010",
      descripcion: "SERVICIO DE CONSULTORIA",
      cantidad: 1,
      unidadMedida: 77,
      precioUnitario: 2000000,
      totalBrutoItem: 2000000,
      afectaIVA: 1,
      tasaImpuesto: 10,
      gravadas10: 1818182,
      iva10: 181818,
      totalNeto: 2000000
    }],
    detalleCobro: [{
      tipoPago: 1,
      importe: 2000000,
      moneda: "PYG",
      cotizacionMoneda: 1
    }]
  },
  {
    idDocumentoERP: 20002,
    idFacturador: 1,
    tipoDocumentoElectronico: 1,
    // ... demas campos del segundo documento
  }
];

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/procesar-lote-asinc-offline\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lote)
  }
);

const data = await response.json();
console.log("ID Lote:", data.idLote);
console.log("Documentos encolados:", data.cantidadDocumentos);
// Los documentos se procesaran cuando SIFEN este disponible`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200 — ResponseLoteDE</h2>
      <CodeBlock
        language="json"
        code={`{
  "idLote": "LOTE-OFFLINE-20260115-001",
  "fechaRecepcion": "2026-01-15T14:00:30",
  "cantidadDocumentos": 2,
  "documentosEnviados": [
    {
      "idDocumentoERP": 20001,
      "estado": "EN_COLA_OFFLINE",
      "mensaje": "Documento encolado. Se procesara cuando SIFEN este disponible."
    },
    {
      "idDocumentoERP": 20002,
      "estado": "EN_COLA_OFFLINE",
      "mensaje": "Documento encolado. Se procesara cuando SIFEN este disponible."
    }
  ]
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'idLote', type: 'string', required: true, description: 'Identificador unico del lote offline' },
          { name: 'fechaRecepcion', type: 'string', required: true, description: 'Fecha y hora de recepcion del lote' },
          { name: 'cantidadDocumentos', type: 'integer', required: true, description: 'Cantidad total de documentos en el lote' },
          { name: 'documentosEnviados', type: 'array', required: true, description: 'Array con el estado inicial de cada documento' },
          { name: 'documentosEnviados[].idDocumentoERP', type: 'integer', required: true, description: 'ID del documento en el ERP' },
          { name: 'documentosEnviados[].estado', type: 'string', required: true, description: '"EN_COLA_OFFLINE", "ERROR_VALIDACION"' },
          { name: 'documentosEnviados[].mensaje', type: 'string', required: true, description: 'Mensaje descriptivo del estado' },
        ]}
      />

      <AlertBox variant="info" title="Reenvio automatico">
        El middleware monitorea la conectividad con SIFEN. Cuando la conexion se restablece,
        los documentos encolados en modo offline se procesan automaticamente en el orden en que fueron recibidos.
      </AlertBox>
    </div>
  );
}
