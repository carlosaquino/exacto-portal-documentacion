import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarRucPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar RUC</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar RUC</h1>
      <p className="text-slate-400 mb-4">
        Consulta los datos de un contribuyente en SIFEN a partir de su RUC.
        Retorna informacion basica del contribuyente como razon social, tipo y estado.
      </p>

      <MethodBadge method="GET" path="/fe/consultar-ruc/{ruc}" />

      <AlertBox variant="info" title="Formato del RUC">
        El parametro <code>ruc</code> debe enviarse <strong>sin digito verificador</strong>.
        Por ejemplo, para el RUC <code>80012345-1</code>, enviar solo <code>80012345</code>.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Path Parameters</h2>
      <FieldTable
        title="Parametros de ruta"
        fields={[
          { name: 'ruc', type: 'string', required: true, description: 'RUC del contribuyente sin digito verificador' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X GET \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-ruc/80012345"`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
String ruc = "80012345";

ResponseEntity<RespuestaConsultaRUC> response = restTemplate.getForEntity(
    apiUrl + "/fe/consultar-ruc/" + ruc,
    RespuestaConsultaRUC.class
);

RespuestaConsultaRUC resultado = response.getBody();
System.out.println("Razon Social: " + resultado.getRazonSocial());
System.out.println("Estado: " + resultado.getEstado());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const ruc = "80012345";

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-ruc/\${ruc}\`
);

const data = await response.json();
console.log("Razon Social:", data.razonSocial);
console.log("Estado:", data.estado);`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200 — RespuestaConsultaRUC</h2>
      <CodeBlock
        language="json"
        code={`{
  "ruc": "80012345",
  "digitoVerificador": "1",
  "razonSocial": "EMPRESA EJEMPLO S.A.",
  "tipoContribuyente": "PERSONA JURIDICA",
  "estado": "ACTIVO"
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'ruc', type: 'string', required: true, description: 'RUC del contribuyente consultado' },
          { name: 'digitoVerificador', type: 'string', required: true, description: 'Digito verificador del RUC' },
          { name: 'razonSocial', type: 'string', required: true, description: 'Razon social o nombre del contribuyente' },
          { name: 'tipoContribuyente', type: 'string', required: true, description: 'Tipo de contribuyente (PERSONA FISICA, PERSONA JURIDICA)' },
          { name: 'estado', type: 'string', required: true, description: 'Estado del contribuyente (ACTIVO, CANCELADO, SUSPENDIDO)' },
        ]}
      />
    </div>
  );
}
