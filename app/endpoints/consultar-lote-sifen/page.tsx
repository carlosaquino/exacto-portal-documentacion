import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function ConsultarLoteSifenPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Consultar Lote SIFEN</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Consultar Lote SIFEN</h1>
      <p className="text-slate-400 mb-4">
        Consulta el estado de un lote enviado a SIFEN de forma asincrona.
        El identificador del lote es retornado por el endpoint <code className="text-amber-400">/fe/procesar-lote-asinc</code> al momento del envio.
      </p>

      <MethodBadge method="GET" path="/fe/consultar-lote-sifen/{lote}" />

      <AlertBox variant="info" title="Parametro de ruta">
        El parametro <code>lote</code> corresponde al ID del lote retornado por <code>/fe/procesar-lote-asinc</code>.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Path Parameters</h2>
      <FieldTable
        title="Parametros de ruta"
        fields={[
          { name: 'lote', type: 'string', required: true, description: 'ID del lote retornado por /fe/procesar-lote-asinc' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X GET \\
  "\${API_BASE_URL}/sifex.api.mq/fe/consultar-lote-sifen/123456789"`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
String lote = "123456789";

ResponseEntity<RespuestaConsultaLote> response = restTemplate.getForEntity(
    apiUrl + "/fe/consultar-lote-sifen/" + lote,
    RespuestaConsultaLote.class
);

RespuestaConsultaLote resultado = response.getBody();
System.out.println("Estado del lote: " + resultado.getEstado());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const lote = "123456789";

const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/consultar-lote-sifen/\${lote}\`
);

const data = await response.json();
console.log("Estado del lote:", data.estado);`,
          },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Response 200 — RespuestaConsultaLote</h2>
      <CodeBlock
        language="json"
        code={`{
  "codigo": "0000",
  "respuesta": "Consulta exitosa",
  "estado": "PROCESADO",
  "cantidadDocumentos": 5,
  "cantidadAprobados": 4,
  "cantidadRechazados": 1,
  "detalleDocumentos": [
    {
      "cdc": "01800123451001001000000012026011511000000000",
      "estado": "APROBADO",
      "descripcionEstado": "Aprobado por SIFEN"
    }
  ]
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'codigo', type: 'string', required: true, description: 'Codigo de resultado de la operacion' },
          { name: 'respuesta', type: 'string', required: true, description: 'Descripcion del resultado' },
          { name: 'estado', type: 'string', required: true, description: 'Estado general del lote: PROCESADO, EN_PROCESO, RECHAZADO' },
          { name: 'cantidadDocumentos', type: 'integer', required: true, description: 'Cantidad total de documentos en el lote' },
          { name: 'cantidadAprobados', type: 'integer', required: true, description: 'Cantidad de documentos aprobados' },
          { name: 'cantidadRechazados', type: 'integer', required: true, description: 'Cantidad de documentos rechazados' },
          { name: 'detalleDocumentos', type: 'array', required: true, description: 'Detalle del estado de cada documento del lote' },
        ]}
      />
    </div>
  );
}
