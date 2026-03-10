import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarDocumentoEmpresaSifenPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar Documento Empresa SIFEN</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar Documento por Empresa en SIFEN</h1>
      <p className="text-slate-400 mb-4">
        Consulta el estado de un documento electronico en SIFEN (DNIT) especificando tanto el CDC como el ID de empresa.
        Util en entornos multi-empresa donde es necesario identificar a que empresa pertenece el documento.
      </p>

      <MethodBadge method="POST" path="/fe/consultar-documento-empresa-sifen" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <AlertBox variant="info" title="Entornos multi-empresa">
        Este endpoint es especialmente util cuando el middleware gestiona multiples empresas.
        Al incluir el <code>idEmpresa</code> en el request, el sistema puede identificar correctamente
        las credenciales y certificado digital de la empresa correspondiente para la consulta en SIFEN.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body</h2>

      <FieldTable
        title="Campos del Request"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC (Codigo de Control) del documento electronico. 44 caracteres.' },
          { name: 'idEmpresa', type: 'integer', required: true, description: 'ID de la empresa en el middleware' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-documento-empresa-sifen" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cdc": "01800123451001001000000012026011511000000000",
    "idEmpresa": 1
  }'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
Map<String, Object> request = new HashMap<>();
request.put("cdc", "01800123451001001000000012026011511000000000");
request.put("idEmpresa", 1);

HttpEntity<Map<String, Object>> entity =
    new HttpEntity<>(request, jsonHeaders());

ConsultaDocumentoResponse response = restTemplate.postForObject(
    apiUrl + "/fe/consultar-documento-empresa-sifen",
    entity, ConsultaDocumentoResponse.class
);

System.out.println("CDC: " + response.getCdc());
System.out.println("Estado: " + response.getEstado());
System.out.println("Descripcion: " + response.getDescripcionEstado());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-documento-empresa-sifen\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cdc: "01800123451001001000000012026011511000000000",
      idEmpresa: 1
    })
  }
);

const data = await response.json();
console.log("CDC:", data.cdc);
console.log("Estado:", data.estado);
console.log("Descripcion:", data.descripcionEstado);
console.log("QR:", data.linkQR);`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200</h2>
      <CodeBlock
        language="json"
        code={`{
  "cdc": "01800123451001001000000012026011511000000000",
  "estado": "APROBADO",
  "descripcionEstado": "Aprobado por SIFEN",
  "linkQR": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
  "nroDocumento": "001-001-0000001",
  "nroTimbrado": 12345678,
  "tipoDocumento": "FACTURA ELECTRONICA"
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento consultado (44 caracteres)' },
          { name: 'estado', type: 'string', required: true, description: '"APROBADO", "RECHAZADO", "EN_PROCESO", "CANCELADO"' },
          { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion legible del estado en SIFEN' },
          { name: 'linkQR', type: 'string', required: true, description: 'URL del QR para verificacion en ekuatia' },
          { name: 'nroDocumento', type: 'string', required: true, description: 'Numero completo del documento "001-001-0000001"' },
          { name: 'nroTimbrado', type: 'integer', required: true, description: 'Numero de timbrado del documento' },
          { name: 'tipoDocumento', type: 'string', required: true, description: 'Tipo del documento electronico (ej: "FACTURA ELECTRONICA")' },
        ]}
      />
    </div>
  );
}
