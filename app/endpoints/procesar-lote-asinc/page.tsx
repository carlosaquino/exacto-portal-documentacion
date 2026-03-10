import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ProcesarLoteAsincPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Procesar Lote Asincrono</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Procesar Lote Asincrono</h1>
      <p className="text-slate-400 mb-4">
        Envia un lote de documentos electronicos al middleware EXACTO para su procesamiento asincrono.
        El sistema recibe el lote, lo encola y devuelve un identificador de lote para consultar el resultado posteriormente.
      </p>

      <MethodBadge method="POST" path="/fe/procesar-lote-asinc" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <AlertBox variant="warning" title="Consultar resultado">
        Una vez enviado el lote, utilice el endpoint{' '}
        <Link href="/endpoints/consultar-lote-sifen" className="text-sky-400 hover:underline">
          GET /fe/consultar-lote-sifen/&#123;lote&#125;
        </Link>{' '}
        para verificar el estado de procesamiento de cada documento del lote.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body</h2>
      <p className="text-slate-400 mb-4">
        El body debe contener un <code className="text-amber-400">Array</code> de objetos{' '}
        <code className="text-amber-400">DE</code> (Documento Electronico).
        Cada objeto sigue la misma estructura que el endpoint{' '}
        <Link href="/endpoints/procesar-documento-sinc" className="text-sky-400 hover:underline">procesar-documento-sinc</Link>.
      </p>

      <FieldTable
        title="Estructura del Array"
        fields={[
          { name: 'body', type: 'Array<DE>', required: true, description: 'Array de objetos DE. Cada elemento representa un documento electronico completo.' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/procesar-lote-asinc" \\
  -H "Content-Type: application/json" \\
  -d '[
    {
      "idDocumentoERP": 10001,
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
      "tipoDocumentoReceptor": "RUC",
      "razonSocialReceptor": "EMPRESA A S.A.",
      "detalleDE": [
        {
          "codigoArticulo": "ART001",
          "descripcion": "PRODUCTO A",
          "cantidad": 2,
          "unidadMedida": 77,
          "precioUnitario": 500000,
          "totalBrutoItem": 1000000,
          "afectaIVA": 1,
          "tasaImpuesto": 10,
          "gravadas10": 909091,
          "iva10": 90909,
          "totalNeto": 1000000
        }
      ],
      "detalleCobro": [
        {
          "tipoPago": 1,
          "importe": 1000000,
          "moneda": "PYG",
          "cotizacionMoneda": 1
        }
      ]
    },
    {
      "idDocumentoERP": 10002,
      "idFacturador": 1,
      "tipoDocumentoElectronico": 1,
      "timbrado": 12345678,
      "establecimiento": "001",
      "puntoExpedicion": 1,
      "nroComprobante": 2,
      "nroComprobanteCompleto": "001-001-0000002",
      "fechaEmision": "2026-01-15T10:31:00",
      "moneda": "PYG",
      "tipoCambio": 1,
      "condicionVenta": "CONTADO",
      "tipoOperacion": "B2B",
      "tipoDocumentoReceptor": "RUC",
      "razonSocialReceptor": "EMPRESA B S.A.",
      "detalleDE": [
        {
          "codigoArticulo": "ART002",
          "descripcion": "PRODUCTO B",
          "cantidad": 1,
          "unidadMedida": 77,
          "precioUnitario": 750000,
          "totalBrutoItem": 750000,
          "afectaIVA": 1,
          "tasaImpuesto": 10,
          "gravadas10": 681818,
          "iva10": 68182,
          "totalNeto": 750000
        }
      ],
      "detalleCobro": [
        {
          "tipoPago": 1,
          "importe": 750000,
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
de1.setIdDocumentoERP(10001L);
de1.setIdFacturador(1);
de1.setTipoDocumentoElectronico(1);
de1.setTimbrado(12345678);
de1.setEstablecimiento("001");
de1.setPuntoExpedicion(1);
de1.setNroComprobante(1);
de1.setNroComprobanteCompleto("001-001-0000001");
de1.setFechaEmision("2026-01-15T10:30:00");
de1.setMoneda("PYG");
de1.setCondicionVenta("CONTADO");
de1.setTipoOperacion("B2B");
// ... completar campos y detalles
lote.add(de1);

DE de2 = new DE();
de2.setIdDocumentoERP(10002L);
de2.setIdFacturador(1);
// ... completar campos y detalles
lote.add(de2);

HttpEntity<List<DE>> entity = new HttpEntity<>(lote, jsonHeaders());
ResponseLoteDE response = restTemplate.postForObject(
    apiUrl + "/fe/procesar-lote-asinc",
    entity, ResponseLoteDE.class
);

System.out.println("ID Lote: " + response.getIdLote());
for (DocumentoEnviado doc : response.getDocumentosEnviados()) {
    System.out.println("Doc ERP: " + doc.getIdDocumentoERP()
        + " - Estado: " + doc.getEstado());
}`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const lote = [
  {
    idDocumentoERP: 10001,
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
    razonSocialReceptor: "EMPRESA A S.A.",
    detalleDE: [{
      codigoArticulo: "ART001",
      descripcion: "PRODUCTO A",
      cantidad: 2,
      unidadMedida: 77,
      precioUnitario: 500000,
      totalBrutoItem: 1000000,
      afectaIVA: 1,
      tasaImpuesto: 10,
      gravadas10: 909091,
      iva10: 90909,
      totalNeto: 1000000
    }],
    detalleCobro: [{
      tipoPago: 1,
      importe: 1000000,
      moneda: "PYG",
      cotizacionMoneda: 1
    }]
  },
  {
    idDocumentoERP: 10002,
    idFacturador: 1,
    tipoDocumentoElectronico: 1,
    // ... demas campos del segundo documento
  }
];

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/procesar-lote-asinc\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lote)
  }
);

const data = await response.json();
console.log("ID Lote:", data.idLote);
data.documentosEnviados.forEach(doc => {
  console.log("Doc ERP:", doc.idDocumentoERP, "- Estado:", doc.estado);
});`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200 — ResponseLoteDE</h2>
      <CodeBlock
        language="json"
        code={`{
  "idLote": "LOTE-20260115-001",
  "fechaRecepcion": "2026-01-15T10:30:45",
  "cantidadDocumentos": 2,
  "documentosEnviados": [
    {
      "idDocumentoERP": 10001,
      "estado": "EN_COLA",
      "mensaje": "Documento encolado para procesamiento"
    },
    {
      "idDocumentoERP": 10002,
      "estado": "EN_COLA",
      "mensaje": "Documento encolado para procesamiento"
    }
  ]
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'idLote', type: 'string', required: true, description: 'Identificador unico del lote. Usar para consultar estado con consultar-lote-sifen.' },
          { name: 'fechaRecepcion', type: 'string', required: true, description: 'Fecha y hora de recepcion del lote' },
          { name: 'cantidadDocumentos', type: 'integer', required: true, description: 'Cantidad total de documentos en el lote' },
          { name: 'documentosEnviados', type: 'array', required: true, description: 'Array con el estado inicial de cada documento enviado' },
          { name: 'documentosEnviados[].idDocumentoERP', type: 'integer', required: true, description: 'ID del documento en el ERP' },
          { name: 'documentosEnviados[].estado', type: 'string', required: true, description: '"EN_COLA", "ERROR_VALIDACION"' },
          { name: 'documentosEnviados[].mensaje', type: 'string', required: true, description: 'Mensaje descriptivo del estado' },
        ]}
      />
    </div>
  );
}
