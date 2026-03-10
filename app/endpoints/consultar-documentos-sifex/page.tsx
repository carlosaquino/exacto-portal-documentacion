import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarDocumentosSifexPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar Documentos EXACTO</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar Documentos en EXACTO</h1>
      <p className="text-slate-400 mb-4">
        Consulta el estado de una lista de documentos electronicos en EXACTO (la base de datos interna del middleware)
        utilizando sus CDCs. Permite consultar multiples documentos en una sola solicitud sin depender de la
        disponibilidad de SIFEN.
      </p>

      <MethodBadge method="POST" path="/fe/consultar-documentos-sifex" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <AlertBox variant="info" title="Consulta local">
        Este endpoint consulta la base de datos interna del middleware EXACTO, no el servicio web de SIFEN (DNIT).
        Es mas rapido y no depende de la disponibilidad del servicio de la SET. Para consultar directamente en SIFEN
        con soporte multi-empresa, utilice{' '}
        <Link href="/endpoints/consultar-documentos-empresa-sifen" className="text-sky-400 hover:underline">
          consultar-documentos-empresa-sifen
        </Link>.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body</h2>
      <p className="text-slate-400 mb-4">
        El body debe contener un <code className="text-amber-400">Array</code> de objetos,
        cada uno con la propiedad <code className="text-amber-400">cdc</code>.
      </p>

      <FieldTable
        title="Campos del Request"
        fields={[
          { name: 'body', type: 'Array<object>', required: true, description: 'Array de objetos con cdc' },
          { name: '[].cdc', type: 'string', required: true, description: 'CDC del documento electronico (44 caracteres)' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos-sifex" \\
  -H "Content-Type: application/json" \\
  -d '[
    {
      "cdc": "01800123451001001000000012026011511000000000"
    },
    {
      "cdc": "01800123451001001000000022026011511000000000"
    },
    {
      "cdc": "01800123451001001000000032026011511000000000"
    }
  ]'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
List<Map<String, String>> documentos = new ArrayList<>();

Map<String, String> doc1 = new HashMap<>();
doc1.put("cdc", "01800123451001001000000012026011511000000000");
documentos.add(doc1);

Map<String, String> doc2 = new HashMap<>();
doc2.put("cdc", "01800123451001001000000022026011511000000000");
documentos.add(doc2);

Map<String, String> doc3 = new HashMap<>();
doc3.put("cdc", "01800123451001001000000032026011511000000000");
documentos.add(doc3);

HttpEntity<List<Map<String, String>>> entity =
    new HttpEntity<>(documentos, jsonHeaders());

ConsultaDocumentoResponse[] responses = restTemplate.postForObject(
    apiUrl + "/fe/consultar-documentos-sifex",
    entity, ConsultaDocumentoResponse[].class
);

for (ConsultaDocumentoResponse resp : responses) {
    System.out.println("CDC: " + resp.getCdc()
        + " - Estado: " + resp.getEstado());
}`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos-sifex\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      { cdc: "01800123451001001000000012026011511000000000" },
      { cdc: "01800123451001001000000022026011511000000000" },
      { cdc: "01800123451001001000000032026011511000000000" }
    ])
  }
);

const resultados = await response.json();
resultados.forEach(doc => {
  console.log("CDC:", doc.cdc);
  console.log("Estado:", doc.estado);
  console.log("Descripcion:", doc.descripcionEstado);
  console.log("---");
});`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200</h2>
      <CodeBlock
        language="json"
        code={`[
  {
    "cdc": "01800123451001001000000012026011511000000000",
    "estado": "APROBADO",
    "descripcionEstado": "Aprobado - registrado en base de datos local",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
    "nroDocumento": "001-001-0000001",
    "nroTimbrado": 12345678,
    "tipoDocumento": "FACTURA ELECTRONICA"
  },
  {
    "cdc": "01800123451001001000000022026011511000000000",
    "estado": "APROBADO",
    "descripcionEstado": "Aprobado - registrado en base de datos local",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
    "nroDocumento": "001-001-0000002",
    "nroTimbrado": 12345678,
    "tipoDocumento": "FACTURA ELECTRONICA"
  },
  {
    "cdc": "01800123451001001000000032026011511000000000",
    "estado": "EN_PROCESO",
    "descripcionEstado": "Documento pendiente de respuesta de SIFEN",
    "linkQR": null,
    "nroDocumento": "001-001-0000003",
    "nroTimbrado": 12345678,
    "tipoDocumento": "FACTURA ELECTRONICA"
  }
]`}
      />

      <FieldTable
        title="Campos de cada elemento del Response"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento consultado (44 caracteres)' },
          { name: 'estado', type: 'string', required: true, description: '"APROBADO", "RECHAZADO", "EN_PROCESO", "CANCELADO"' },
          { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion del estado en la base de datos del middleware' },
          { name: 'linkQR', type: 'string', required: true, description: 'URL del QR para verificacion en ekuatia (null si no disponible)' },
          { name: 'nroDocumento', type: 'string', required: true, description: 'Numero completo del documento "001-001-0000001"' },
          { name: 'nroTimbrado', type: 'integer', required: true, description: 'Numero de timbrado del documento' },
          { name: 'tipoDocumento', type: 'string', required: true, description: 'Tipo del documento electronico' },
        ]}
      />
    </div>
  );
}
