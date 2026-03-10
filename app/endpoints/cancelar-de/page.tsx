import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function CancelarDePage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Cancelar DE</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Cancelar DE</h1>
      <p className="text-slate-400 mb-4">
        Envia un evento de cancelacion de un Documento Electronico previamente aprobado por SIFEN.
        La cancelacion invalida el documento de forma permanente.
      </p>

      <MethodBadge method="POST" path="/fe/cancelar-de" />

      <AlertBox variant="warning" title="Plazo de cancelacion">
        La cancelacion solo es posible dentro del plazo establecido por la normativa SIFEN.
        Verifique los plazos vigentes antes de realizar esta operacion.
      </AlertBox>

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body — EveCancelacionDE</h2>
      <FieldTable
        title="Campos del Request"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento electronico a cancelar (44 caracteres)' },
          { name: 'motivoCancelacion', type: 'string', required: true, description: 'Motivo de la cancelacion del documento' },
          { name: 'fechaEvento', type: 'string', required: true, description: 'Fecha del evento de cancelacion. Formato ISO 8601 "2026-01-15T10:30:00"' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/cancelar-de" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cdc": "01800123451001001000000012026011511000000000",
    "motivoCancelacion": "Error en los datos del documento",
    "fechaEvento": "2026-01-16T09:00:00"
  }'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
EveCancelacionDE cancelacion = new EveCancelacionDE();
cancelacion.setCdc("01800123451001001000000012026011511000000000");
cancelacion.setMotivoCancelacion("Error en los datos del documento");
cancelacion.setFechaEvento("2026-01-16T09:00:00");

HttpEntity<EveCancelacionDE> entity = new HttpEntity<>(cancelacion, jsonHeaders());
ResponseDE response = restTemplate.postForObject(
    apiUrl + "/fe/cancelar-de",
    entity, ResponseDE.class
);

System.out.println("Codigo: " + response.getCodigo());
System.out.println("Respuesta: " + response.getRespuesta());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/cancelar-de\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cdc: "01800123451001001000000012026011511000000000",
      motivoCancelacion: "Error en los datos del documento",
      fechaEvento: "2026-01-16T09:00:00"
    })
  }
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
  "respuesta": "Evento de cancelacion procesado exitosamente",
  "cdc": "01800123451001001000000012026011511000000000"
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'codigo', type: 'string', required: true, description: 'Codigo de resultado de la operacion' },
          { name: 'respuesta', type: 'string', required: true, description: 'Descripcion del resultado' },
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento cancelado' },
        ]}
      />
    </div>
  );
}
