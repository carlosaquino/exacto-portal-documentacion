import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import AlertBox from '@/components/AlertBox';

export default function QuickStartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Quick Start</h1>
      <p className="text-slate-400 mb-8">
        Emiti tu primer documento electronico en 5 minutos.
      </p>

      {/* Paso 1 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-xl font-semibold text-white">Configura tu conexion</h2>
        </div>
        <p className="text-slate-400 mb-3">
          Para conectarte a EXACTO API necesitas los siguientes datos:
        </p>
        <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">
          <li><strong className="text-white">URL Base del Servidor</strong>: La IP o dominio donde esta desplegado EXACTO (ej: <code className="text-amber-400">http://servidor:8080</code>)</li>
          <li><strong className="text-white">Context Path</strong>: Siempre <code className="text-amber-400">/sifex.api.mq</code></li>
          <li><strong className="text-white">Credenciales</strong>: Usuario y clave proporcionados por el administrador</li>
        </ul>
        <CodeBlock
          language="bash"
          code={`# Configuracion de conexion a EXACTO API
API_BASE_URL=http://servidor:8080
API_CONTEXT_PATH=/sifex.api.mq
API_USERNAME=tu_usuario
API_PASSWORD=tu_clave`}
        />
      </section>

      {/* Paso 2 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">
            2
          </span>
          <h2 className="text-xl font-semibold text-white">Obtene el Token de Autenticacion</h2>
        </div>
        <MethodBadge method="POST" path="/oauth/token" />
        <p className="text-slate-400 mb-3">
          EXACTO API utiliza OAuth2 con <code className="text-amber-400">grant_type=password</code>. Antes de realizar cualquier operacion, debes obtener un token de acceso:
        </p>
        <CodeBlock
          language="bash"
          code={`curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/oauth/token?grant_type=password&username={usuario}&password={clave}" \\
  -u "sifexmidd:sifexmidd"`}
        />
        <p className="text-slate-400 mt-3 mb-3">
          Respuesta exitosa:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "scope": "read write"
}`}
        />
        <AlertBox variant="info">
          Guarda el <code className="text-amber-400">access_token</code> para incluirlo como header <code className="text-amber-400">Authorization: Bearer &#123;token&#125;</code> en todas las peticiones siguientes.
        </AlertBox>
      </section>

      {/* Paso 3 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="text-xl font-semibold text-white">Envia tu primera factura</h2>
        </div>
        <MethodBadge method="POST" path="/fe/procesar-documento-sinc" />
        <p className="text-slate-400 mb-3">
          Usa el endpoint principal para emitir un documento electronico de forma sincrona:
        </p>
        <CodeBlock
          tabs={[
            {
              label: 'cURL',
              language: 'bash',
              code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/procesar-documento-sinc" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${TOKEN}" \\
  -d '{
    "idDocumentoERP": 12345,
    "idFacturador": 1,
    "tipoDocumentoElectronico": 1,
    "timbrado": 12345678,
    "establecimiento": "001",
    "puntoExpedicion": 1,
    "nroComprobante": 1,
    "nroComprobanteCompleto": "001-001-0000001",
    "fechaEmision": "2026-01-15T10:30:00",
    "moneda": "PYG",
    "tipoCambio": 1,
    "condicionVenta": "CONTADO",
    "tipoOperacion": "B2B",
    "tipoContribuyente": "RUC",
    "razonSocialReceptor": "EMPRESA RECEPTORA S.A.",
    "correoElectronicoReceptor": "factura@empresa.com",
    "tipoDocumentoReceptor": "RUC",
    "detalleDE": [
      {
        "codigoArticulo": "ART001",
        "descripcion": "LAPTOP HP ELITEBOOK 840",
        "cantidad": 1,
        "unidadMedida": 77,
        "precioUnitario": 1100000,
        "totalBrutoItem": 1100000,
        "afectaIVA": 1,
        "tasaImpuesto": 10,
        "gravadas10": 1000000,
        "iva10": 100000,
        "totalNeto": 1100000
      }
    ],
    "detalleCobro": [
      {
        "tipoPago": 1,
        "importe": 1100000,
        "moneda": "PYG",
        "cotizacionMoneda": 1
      }
    ]
  }'`,
            },
            {
              label: 'Java',
              language: 'java',
              code: `// Usando RestTemplate de Spring Boot
String url = apiUrl + "/fe/procesar-documento-sinc";

HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.setBearerAuth(accessToken);

DE documento = new DE();
documento.setIdDocumentoERP(12345L);
documento.setIdFacturador(1);
documento.setTipoDocumentoElectronico(1);
documento.setTimbrado(12345678);
documento.setEstablecimiento("001");
documento.setPuntoExpedicion(1);
documento.setNroComprobante(1);
documento.setNroComprobanteCompleto("001-001-0000001");
documento.setFechaEmision("2026-01-15T10:30:00");
documento.setMoneda("PYG");
documento.setCondicionVenta("CONTADO");
// ... agregar receptor, items, cobros

HttpEntity<DE> entity = new HttpEntity<>(documento, headers);
ResponseDE response = restTemplate.postForObject(
    url, entity, ResponseDE.class
);

System.out.println("CDC: " + response.getCdc());
System.out.println("Estado: " + response.getEstado());`,
            },
            {
              label: 'JavaScript',
              language: 'javascript',
              code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/procesar-documento-sinc\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify({
      idDocumentoERP: 12345,
      idFacturador: 1,
      tipoDocumentoElectronico: 1,
      timbrado: 12345678,
      establecimiento: "001",
      puntoExpedicion: 1,
      nroComprobante: 1,
      nroComprobanteCompleto: "001-001-0000001",
      fechaEmision: "2026-01-15T10:30:00",
      moneda: "PYG",
      tipoCambio: 1,
      condicionVenta: "CONTADO",
      tipoOperacion: "B2B",
      razonSocialReceptor: "EMPRESA RECEPTORA S.A.",
      tipoDocumentoReceptor: "RUC",
      detalleDE: [{
        codigoArticulo: "ART001",
        descripcion: "LAPTOP HP ELITEBOOK 840",
        cantidad: 1,
        unidadMedida: 77,
        precioUnitario: 1100000,
        totalBrutoItem: 1100000,
        afectaIVA: 1,
        tasaImpuesto: 10,
        gravadas10: 1000000,
        iva10: 100000,
        totalNeto: 1100000
      }],
      detalleCobro: [{
        tipoPago: 1,
        importe: 1100000,
        moneda: "PYG",
        cotizacionMoneda: 1
      }]
    })
  }
);

const data = await response.json();
console.log("CDC:", data.cdc);
console.log("Estado:", data.estado);`,
            },
          ]}
        />
      </section>

      {/* Paso 4 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">
            4
          </span>
          <h2 className="text-xl font-semibold text-white">Verifica la respuesta</h2>
        </div>
        <p className="text-slate-400 mb-3">
          Si todo sale bien, recibiras un <code className="text-amber-400">ResponseDE</code> con el CDC y el estado:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "id": "resp_abc123",
  "cdc": "01800123451001001000000012026011511000000000",
  "estado": "APROBADO",
  "descripcionEstado": "Aprobado por SIFEN",
  "fecha": "2026-01-15T10:30:45",
  "idDocumentoERP": 12345,
  "qrLink": "https://ekuatia.set.gov.py/consultas/qr?qr=..."
}`}
        />
        <AlertBox variant="success">
          Si el <code className="text-amber-400">estado</code> es <strong>APROBADO</strong>, el
          documento fue aceptado por SIFEN y ya tiene CDC asignado.
        </AlertBox>
      </section>

      {/* Paso 5 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center">
            5
          </span>
          <h2 className="text-xl font-semibold text-white">Descarga el KuDE (PDF)</h2>
        </div>
        <MethodBadge method="GET" path="/fe/obtener-kude/{cdc}" />
        <CodeBlock
          tabs={[
            {
              label: 'cURL',
              language: 'bash',
              code: `curl -o kude.pdf \\
  -H "Authorization: Bearer \${TOKEN}" \\
  "\${API_BASE_URL}/sifex.api.mq/fe/obtener-kude/01800123451001001000000012026011511000000000"`,
            },
            {
              label: 'JavaScript',
              language: 'javascript',
              code: `const res = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/obtener-kude/\${cdc}\`,
  {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  }
);
const blob = await res.blob();
const url = URL.createObjectURL(blob);
window.open(url);`,
            },
          ]}
        />
      </section>

      <AlertBox variant="info" title="Siguiente paso">
        Revisa la documentacion completa de todos los endpoints en la seccion <strong>Endpoints</strong> del menu lateral.
      </AlertBox>
    </div>
  );
}
