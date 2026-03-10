import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ObtenerKudePage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Obtener KuDE</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Obtener KuDE</h1>
      <p className="text-slate-400 mb-4">
        Obtiene el KuDE (Constancia de Documento Electronico) en formato PDF estandar A4.
        El KuDE es la representacion grafica del documento electronico aprobado por SIFEN.
      </p>

      <MethodBadge method="GET" path="/fe/obtener-kude/{cdc}" />

      <AlertBox variant="info" title="Formato de respuesta">
        Este endpoint retorna un archivo PDF binario (<code>application/pdf</code>) en formato estandar A4.
        No retorna JSON.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Path Parameters</h2>
      <FieldTable
        title="Parametros de ruta"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento electronico (44 caracteres)' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X GET \\
  "\${API_BASE_URL}/sifex.api.mq/fe/obtener-kude/01800123451001001000000012026011511000000000" \\
  -o kude.pdf`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
String cdc = "01800123451001001000000012026011511000000000";

ResponseEntity<byte[]> response = restTemplate.getForEntity(
    apiUrl + "/fe/obtener-kude/" + cdc,
    byte[].class
);

byte[] pdfBytes = response.getBody();

// Guardar en archivo
Files.write(Paths.get("kude.pdf"), pdfBytes);

// O retornar como respuesta HTTP
return ResponseEntity.ok()
    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE)
    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=kude_" + cdc + ".pdf")
    .body(pdfBytes);`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const cdc = "01800123451001001000000012026011511000000000";

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/obtener-kude/\${cdc}\`
);

const blob = await response.blob();

// Descargar el archivo
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = \`kude_\${cdc}.pdf\`;
document.body.appendChild(a);
a.click();
window.URL.revokeObjectURL(url);
a.remove();

// O abrir en nueva pestana
// window.open(url, '_blank');`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200</h2>
      <p className="text-slate-400 mb-4">
        Retorna el archivo PDF binario con el KuDE del documento en formato estandar A4.
      </p>

      <FieldTable
        title="Detalles del Response"
        fields={[
          { name: 'Content-Type', type: 'header', required: true, description: 'application/pdf' },
          { name: 'body', type: 'binary', required: true, description: 'Contenido binario del archivo PDF (formato A4)' },
        ]}
      />
    </div>
  );
}
