import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarDocumentosPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar Documentos</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar Documentos</h1>
      <p className="text-slate-400 mb-4">
        Consulta documentos electronicos almacenados en el middleware, filtrando por empresa, CDC y/o rango de fechas.
        Retorna un array de objetos <code className="text-amber-400">DocumentoDTO</code> con la informacion de cada documento.
      </p>

      <MethodBadge method="GET" path="/fe/consultar-documentos" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Query Parameters</h2>

      <FieldTable
        title="Parametros de consulta"
        fields={[
          { name: 'idEmpresa', type: 'integer', required: true, description: 'ID de la empresa en el middleware (obligatorio)' },
          { name: 'cdc', type: 'string', required: false, description: 'CDC del documento (44 caracteres). Si se proporciona, filtra por CDC especifico.' },
          { name: 'desdeFecha', type: 'string', required: false, description: 'Fecha inicial del rango. Formato "yyyy-MM-dd" (ej: "2026-01-01")' },
          { name: 'hastaFecha', type: 'string', required: false, description: 'Fecha final del rango. Formato "yyyy-MM-dd" (ej: "2026-01-31")' },
        ]}
      />

      <AlertBox variant="info" title="Filtros opcionales">
        El unico parametro obligatorio es <code>idEmpresa</code>. Los demas filtros son opcionales y se pueden combinar
        para acotar la busqueda. Si no se proporcionan fechas, se retornan todos los documentos de la empresa.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `# Consultar por empresa y rango de fechas
curl -X GET \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos?idEmpresa=1&desdeFecha=2026-01-01&hastaFecha=2026-01-31"

# Consultar por CDC especifico
curl -X GET \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos?idEmpresa=1&cdc=01800123451001001000000012026011511000000000"`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
String url = apiUrl + "/fe/consultar-documentos"
    + "?idEmpresa=1"
    + "&desdeFecha=2026-01-01"
    + "&hastaFecha=2026-01-31";

ResponseEntity<DocumentoDTO[]> response = restTemplate.getForEntity(
    url, DocumentoDTO[].class
);

DocumentoDTO[] documentos = response.getBody();
for (DocumentoDTO doc : documentos) {
    System.out.println("CDC: " + doc.getCdc()
        + " - Estado: " + doc.getEstado()
        + " - Tipo: " + doc.getTipoDocumento());
}`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `// Consultar por rango de fechas
const params = new URLSearchParams({
  idEmpresa: '1',
  desdeFecha: '2026-01-01',
  hastaFecha: '2026-01-31'
});

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos?\${params}\`
);

const documentos = await response.json();
documentos.forEach(doc => {
  console.log("CDC:", doc.cdc);
  console.log("Estado:", doc.estado);
  console.log("Tipo:", doc.tipoDocumento);
  console.log("---");
});`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200 — Array de DocumentoDTO</h2>
      <CodeBlock
        language="json"
        code={`[
  {
    "cdc": "01800123451001001000000012026011511000000000",
    "estado": "APROBADO",
    "descripcionEstado": "Aprobado por SIFEN",
    "idDocumentoERP": 12345,
    "tipoDocumento": "FACTURA ELECTRONICA",
    "tipoDocumentoElectronico": 1,
    "nroDocumento": "001-001-0000001",
    "nroTimbrado": 12345678,
    "fechaEmision": "2026-01-15T10:30:00",
    "razonSocialReceptor": "EMPRESA RECEPTORA S.A.",
    "montoTotal": 1100000,
    "moneda": "PYG",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=..."
  },
  {
    "cdc": "01800123451001001000000022026011511000000000",
    "estado": "APROBADO",
    "descripcionEstado": "Aprobado por SIFEN",
    "idDocumentoERP": 12346,
    "tipoDocumento": "FACTURA ELECTRONICA",
    "tipoDocumentoElectronico": 1,
    "nroDocumento": "001-001-0000002",
    "nroTimbrado": 12345678,
    "fechaEmision": "2026-01-15T11:00:00",
    "razonSocialReceptor": "OTRA EMPRESA S.A.",
    "montoTotal": 750000,
    "moneda": "PYG",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=..."
  }
]`}
      />

      <FieldTable
        title="Campos del DocumentoDTO"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento (44 caracteres)' },
          { name: 'estado', type: 'string', required: true, description: '"APROBADO", "RECHAZADO", "EN_PROCESO", "CANCELADO"' },
          { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion legible del estado' },
          { name: 'idDocumentoERP', type: 'integer', required: true, description: 'ID del documento en el ERP' },
          { name: 'tipoDocumento', type: 'string', required: true, description: 'Nombre del tipo de documento' },
          { name: 'tipoDocumentoElectronico', type: 'integer', required: true, description: '1=FE, 4=AFE, 5=NCE, 6=NDE, 7=NRE' },
          { name: 'nroDocumento', type: 'string', required: true, description: 'Numero completo del documento "001-001-0000001"' },
          { name: 'nroTimbrado', type: 'integer', required: true, description: 'Numero de timbrado' },
          { name: 'fechaEmision', type: 'string', required: true, description: 'Fecha y hora de emision' },
          { name: 'razonSocialReceptor', type: 'string', required: true, description: 'Razon social del receptor' },
          { name: 'montoTotal', type: 'number', required: true, description: 'Monto total del documento' },
          { name: 'moneda', type: 'string', required: true, description: 'Codigo de moneda (PYG, USD, BRL)' },
          { name: 'linkQR', type: 'string', required: true, description: 'URL del QR en ekuatia' },
        ]}
      />
    </div>
  );
}
