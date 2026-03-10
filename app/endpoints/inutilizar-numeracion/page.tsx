import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function InutilizarNumeracionPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Inutilizar Numeracion</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Inutilizar Numeracion</h1>
      <p className="text-slate-400 mb-4">
        Envia un evento de inutilizacion de un rango de numeracion de documentos electronicos.
        Permite inutilizar numeros de comprobantes que no seran utilizados.
      </p>

      <MethodBadge method="POST" path="/fe/inutilizar-numeracion" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body — EveInutilizacion</h2>
      <FieldTable
        title="Campos del Request"
        fields={[
          { name: 'numeroTimbrado', type: 'integer', required: true, description: 'Numero de timbrado perpetuo vigente' },
          { name: 'establecimiento', type: 'string', required: true, description: 'Codigo de establecimiento ("001")' },
          { name: 'puntoExpedicion', type: 'string', required: true, description: 'Codigo de punto de expedicion ("001")' },
          { name: 'tipoDocumentoElectronico', type: 'integer', required: true, description: 'Tipo de DE: 1=FE, 4=AFE, 5=NCE, 6=NDE, 7=NRE' },
          { name: 'numeroInicio', type: 'integer', required: true, description: 'Numero inicial del rango a inutilizar' },
          { name: 'numeroFin', type: 'integer', required: true, description: 'Numero final del rango a inutilizar' },
          { name: 'motivoInutilizacion', type: 'string', required: true, description: 'Motivo de la inutilizacion del rango de numeracion' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/inutilizar-numeracion" \\
  -H "Content-Type: application/json" \\
  -d '{
    "numeroTimbrado": 12345678,
    "establecimiento": "001",
    "puntoExpedicion": "001",
    "tipoDocumentoElectronico": 1,
    "numeroInicio": 100,
    "numeroFin": 150,
    "motivoInutilizacion": "Salto de numeracion por error en sistema"
  }'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
EveInutilizacion inutilizacion = new EveInutilizacion();
inutilizacion.setNumeroTimbrado(12345678);
inutilizacion.setEstablecimiento("001");
inutilizacion.setPuntoExpedicion("001");
inutilizacion.setTipoDocumentoElectronico(1);
inutilizacion.setNumeroInicio(100);
inutilizacion.setNumeroFin(150);
inutilizacion.setMotivoInutilizacion("Salto de numeracion por error en sistema");

HttpEntity<EveInutilizacion> entity = new HttpEntity<>(inutilizacion, jsonHeaders());
ResponseDE response = restTemplate.postForObject(
    apiUrl + "/fe/inutilizar-numeracion",
    entity, ResponseDE.class
);

System.out.println("Codigo: " + response.getCodigo());
System.out.println("Respuesta: " + response.getRespuesta());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/inutilizar-numeracion\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      numeroTimbrado: 12345678,
      establecimiento: "001",
      puntoExpedicion: "001",
      tipoDocumentoElectronico: 1,
      numeroInicio: 100,
      numeroFin: 150,
      motivoInutilizacion: "Salto de numeracion por error en sistema"
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
  "respuesta": "Evento de inutilizacion procesado exitosamente"
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'codigo', type: 'string', required: true, description: 'Codigo de resultado de la operacion' },
          { name: 'respuesta', type: 'string', required: true, description: 'Descripcion del resultado' },
        ]}
      />
    </div>
  );
}
