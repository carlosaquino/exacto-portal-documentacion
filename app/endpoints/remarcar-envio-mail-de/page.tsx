import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function RemarcarEnvioMailDePage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Remarcar Envio Mail DE</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Remarcar Envio Mail DE</h1>
      <p className="text-slate-400 mb-4">
        Marca un documento electronico para que el middleware reenvie el KuDE al receptor por correo electronico.
        Util cuando el receptor no recibio el correo original o necesita una copia adicional.
      </p>

      <MethodBadge method="GET" path="/fe/remarcar-envio-mail-de/{cdc}" />

      <AlertBox variant="info" title="Comportamiento">
        Este endpoint no envia el correo de forma inmediata. Marca el documento para que el proceso
        de envio del middleware lo incluya en el proximo ciclo de reenvio.
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
  "\${API_BASE_URL}/sifex.api.mq/fe/remarcar-envio-mail-de/01800123451001001000000012026011511000000000"`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
String cdc = "01800123451001001000000012026011511000000000";

ResponseEntity<Map> response = restTemplate.getForEntity(
    apiUrl + "/fe/remarcar-envio-mail-de/" + cdc,
    Map.class
);

Map resultado = response.getBody();
System.out.println("Codigo: " + resultado.get("codigo"));
System.out.println("Respuesta: " + resultado.get("respuesta"));`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const cdc = "01800123451001001000000012026011511000000000";

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/remarcar-envio-mail-de/\${cdc}\`
);

const data = await response.json();
console.log("Codigo:", data.codigo);
console.log("Respuesta:", data.respuesta);`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200</h2>
      <CodeBlock
        language="json"
        code={`{
  "codigo": "0000",
  "respuesta": "Documento marcado para reenvio de correo exitosamente"
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'codigo', type: 'string', required: true, description: 'Codigo de resultado de la operacion ("0000" indica exito)' },
          { name: 'respuesta', type: 'string', required: true, description: 'Descripcion del resultado de la operacion' },
        ]}
      />
    </div>
  );
}
