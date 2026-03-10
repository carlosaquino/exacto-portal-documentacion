import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarDocumentoSifexPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar Documento EXACTO</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar Documento en EXACTO</h1>
      <p className="text-slate-400 mb-4">
        Consulta el estado de un documento electronico en EXACTO (la base de datos interna del middleware)
        utilizando su CDC. A diferencia del endpoint SIFEN, esta consulta no depende de la disponibilidad
        del servicio de la SET.
      </p>

      <MethodBadge method="GET" path="/fe/consultar-documento-sifex/{cdc}" />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Path Parameters</h2>

      <FieldTable
        title="Parametros de ruta"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC (Codigo de Control) del documento electronico. 44 caracteres.' },
        ]}
      />

      <AlertBox variant="info" title="Diferencia con SIFEN">
        Este endpoint consulta la <strong>base de datos interna del middleware EXACTO</strong>, no el servicio web
        de SIFEN (DNIT). Es mas rapido y no depende de la disponibilidad del servicio de la SET.
        Para consultar directamente en SIFEN, utilice{' '}
        <Link href="/endpoints/consultar-documento-sifen" className="text-sky-400 hover:underline">
          consultar-documento-sifen
        </Link>.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X GET \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-documento-sifex/01800123451001001000000012026011511000000000"`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
String cdc = "01800123451001001000000012026011511000000000";

ResponseEntity<ConsultaDocumentoResponse> response =
    restTemplate.getForEntity(
        apiUrl + "/fe/consultar-documento-sifex/" + cdc,
        ConsultaDocumentoResponse.class
    );

ConsultaDocumentoResponse resultado = response.getBody();
System.out.println("CDC: " + resultado.getCdc());
System.out.println("Estado: " + resultado.getEstado());
System.out.println("Descripcion: " + resultado.getDescripcionEstado());
System.out.println("QR: " + resultado.getLinkQR());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const cdc = "01800123451001001000000012026011511000000000";

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-documento-sifex/\${cdc}\`
);

const data = await response.json();
console.log("CDC:", data.cdc);
console.log("Estado:", data.estado);
console.log("Descripcion:", data.descripcionEstado);
console.log("QR:", data.linkQR);
console.log("Nro Documento:", data.nroDocumento);
console.log("Tipo:", data.tipoDocumento);`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200</h2>
      <CodeBlock
        language="json"
        code={`{
  "cdc": "01800123451001001000000012026011511000000000",
  "estado": "APROBADO",
  "descripcionEstado": "Aprobado - registrado en base de datos local",
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
          { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion del estado en la base de datos del middleware' },
          { name: 'linkQR', type: 'string', required: true, description: 'URL del QR para verificacion en ekuatia' },
          { name: 'nroDocumento', type: 'string', required: true, description: 'Numero completo del documento "001-001-0000001"' },
          { name: 'nroTimbrado', type: 'integer', required: true, description: 'Numero de timbrado del documento' },
          { name: 'tipoDocumento', type: 'string', required: true, description: 'Tipo del documento electronico (ej: "FACTURA ELECTRONICA")' },
        ]}
      />
    </div>
  );
}
