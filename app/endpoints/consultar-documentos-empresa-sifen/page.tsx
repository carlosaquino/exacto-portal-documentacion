import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarDocumentosEmpresaSifenPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar Documentos Empresa SIFEN</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar Documentos por Empresa en SIFEN</h1>
      <p className="text-slate-400 mb-4">
        Consulta el estado de una lista de documentos electronicos en SIFEN (DNIT), cada uno asociado a su empresa correspondiente.
        Permite consultar multiples documentos de diferentes empresas en una sola solicitud.
      </p>

      <MethodBadge method="POST" path="/fe/consultar-documentos-empresa-sifen" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body</h2>
      <p className="text-slate-400 mb-4">
        El body debe contener un objeto con la propiedad <code className="text-amber-400">documentos</code>,
        que es un array de objetos con <code className="text-amber-400">cdc</code> e{' '}
        <code className="text-amber-400">idEmpresa</code>.
      </p>

      <FieldTable
        title="Campos del Request"
        fields={[
          { name: 'documentos', type: 'array', required: true, description: 'Array de objetos con cdc e idEmpresa' },
          { name: 'documentos[].cdc', type: 'string', required: true, description: 'CDC del documento electronico (44 caracteres)' },
          { name: 'documentos[].idEmpresa', type: 'integer', required: true, description: 'ID de la empresa en el middleware' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos-empresa-sifen" \\
  -H "Content-Type: application/json" \\
  -d '{
    "documentos": [
      {
        "cdc": "01800123451001001000000012026011511000000000",
        "idEmpresa": 1
      },
      {
        "cdc": "01800123451001001000000022026011511000000000",
        "idEmpresa": 1
      },
      {
        "cdc": "01800567891001001000000012026011511000000000",
        "idEmpresa": 2
      }
    ]
  }'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
List<Map<String, Object>> documentos = new ArrayList<>();

Map<String, Object> doc1 = new HashMap<>();
doc1.put("cdc", "01800123451001001000000012026011511000000000");
doc1.put("idEmpresa", 1);
documentos.add(doc1);

Map<String, Object> doc2 = new HashMap<>();
doc2.put("cdc", "01800123451001001000000022026011511000000000");
doc2.put("idEmpresa", 1);
documentos.add(doc2);

Map<String, Object> doc3 = new HashMap<>();
doc3.put("cdc", "01800567891001001000000012026011511000000000");
doc3.put("idEmpresa", 2);
documentos.add(doc3);

Map<String, Object> request = new HashMap<>();
request.put("documentos", documentos);

HttpEntity<Map<String, Object>> entity =
    new HttpEntity<>(request, jsonHeaders());

ConsultaDocumentoResponse[] responses = restTemplate.postForObject(
    apiUrl + "/fe/consultar-documentos-empresa-sifen",
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
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-documentos-empresa-sifen\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      documentos: [
        {
          cdc: "01800123451001001000000012026011511000000000",
          idEmpresa: 1
        },
        {
          cdc: "01800123451001001000000022026011511000000000",
          idEmpresa: 1
        },
        {
          cdc: "01800567891001001000000012026011511000000000",
          idEmpresa: 2
        }
      ]
    })
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
    "descripcionEstado": "Aprobado por SIFEN",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
    "nroDocumento": "001-001-0000001",
    "nroTimbrado": 12345678,
    "tipoDocumento": "FACTURA ELECTRONICA"
  },
  {
    "cdc": "01800123451001001000000022026011511000000000",
    "estado": "APROBADO",
    "descripcionEstado": "Aprobado por SIFEN",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
    "nroDocumento": "001-001-0000002",
    "nroTimbrado": 12345678,
    "tipoDocumento": "FACTURA ELECTRONICA"
  },
  {
    "cdc": "01800567891001001000000012026011511000000000",
    "estado": "RECHAZADO",
    "descripcionEstado": "Rechazado por SIFEN - Error en datos del receptor",
    "linkQR": null,
    "nroDocumento": "001-001-0000001",
    "nroTimbrado": 87654321,
    "tipoDocumento": "FACTURA ELECTRONICA"
  }
]`}
      />

      <FieldTable
        title="Campos de cada elemento del Response"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento consultado (44 caracteres)' },
          { name: 'estado', type: 'string', required: true, description: '"APROBADO", "RECHAZADO", "EN_PROCESO", "CANCELADO"' },
          { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion legible del estado en SIFEN' },
          { name: 'linkQR', type: 'string', required: true, description: 'URL del QR para verificacion en ekuatia (null si rechazado)' },
          { name: 'nroDocumento', type: 'string', required: true, description: 'Numero completo del documento "001-001-0000001"' },
          { name: 'nroTimbrado', type: 'integer', required: true, description: 'Numero de timbrado del documento' },
          { name: 'tipoDocumento', type: 'string', required: true, description: 'Tipo del documento electronico' },
        ]}
      />
    </div>
  );
}
