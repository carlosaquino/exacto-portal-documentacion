import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import FieldTable from '@/components/FieldTable';
import AlertBox from '@/components/AlertBox';
import Link from 'next/link';

export default function NominarDePage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/endpoints" className="hover:text-sky-400">Endpoints</Link>
        <span>/</span>
        <span className="text-slate-300">Nominar DE</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Nominar DE</h1>
      <p className="text-slate-400 mb-4">
        Envia un evento de nominacion para asignar los datos del receptor a un Documento Electronico
        innominado (emitido sin datos del receptor). Permite completar la informacion del receptor
        posterior a la emision del documento.
      </p>

      <MethodBadge method="POST" path="/fe/nominar-de" />

      <AlertBox variant="info" title="Content-Type">
        <code>application/json</code>
      </AlertBox>

      <AlertBox variant="info" title="Documentos innominados">
        Este endpoint se utiliza unicamente para documentos que fueron emitidos como innominados
        (sin datos del receptor). Los documentos que ya tienen receptor asignado no pueden ser nominados.
      </AlertBox>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Request Body — EveNominacionDE</h2>
      <FieldTable
        title="Campos del Request"
        fields={[
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento electronico innominado (44 caracteres)' },
          { name: 'motivoNominacion', type: 'string', required: true, description: 'Motivo de la nominacion del documento' },
          { name: 'tipoDocumentoReceptor', type: 'string', required: true, description: 'Tipo de documento del receptor: "RUC", "CI", "PASAPORTE", etc.' },
          { name: 'documentoReceptor', type: 'string', required: true, description: 'Numero de documento del receptor' },
          { name: 'digitoVerificador', type: 'string', required: true, description: 'Digito verificador del documento (aplica para RUC)' },
          { name: 'razonSocialReceptor', type: 'string', required: true, description: 'Razon social o nombre completo del receptor' },
          { name: 'correoElectronicoReceptor', type: 'string', required: true, description: 'Correo electronico del receptor para envio del KuDE' },
          { name: 'codigoDepartamentoReceptor', type: 'integer', required: true, description: 'Codigo del departamento del receptor' },
          { name: 'codigoCiudadReceptor', type: 'integer', required: true, description: 'Codigo de la ciudad del receptor' },
          { name: 'codigoTipoPersona', type: 'string', required: true, description: 'Tipo de persona: "FISICA" o "JURIDICA"' },
        ]}
      />

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Ejemplo de solicitud</h2>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST \\
  "\${API_BASE_URL}/sifex.api.mq/fe/nominar-de" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cdc": "01800123451001001000000012026011511000000000",
    "motivoNominacion": "Cliente identificado posterior a la venta",
    "tipoDocumentoReceptor": "RUC",
    "documentoReceptor": "80012345",
    "digitoVerificador": "1",
    "razonSocialReceptor": "EMPRESA RECEPTORA S.A.",
    "correoElectronicoReceptor": "factura@empresa.com",
    "codigoDepartamentoReceptor": 11,
    "codigoCiudadReceptor": 1,
    "codigoTipoPersona": "JURIDICA"
  }'`,
          },
          {
            label: 'Java',
            language: 'java',
            code: `// Spring Boot — RestTemplate
EveNominacionDE nominacion = new EveNominacionDE();
nominacion.setCdc("01800123451001001000000012026011511000000000");
nominacion.setMotivoNominacion("Cliente identificado posterior a la venta");
nominacion.setTipoDocumentoReceptor("RUC");
nominacion.setDocumentoReceptor("80012345");
nominacion.setDigitoVerificador("1");
nominacion.setRazonSocialReceptor("EMPRESA RECEPTORA S.A.");
nominacion.setCorreoElectronicoReceptor("factura@empresa.com");
nominacion.setCodigoDepartamentoReceptor(11);
nominacion.setCodigoCiudadReceptor(1);
nominacion.setCodigoTipoPersona("JURIDICA");

HttpEntity<EveNominacionDE> entity = new HttpEntity<>(nominacion, jsonHeaders());
ResponseDE response = restTemplate.postForObject(
    apiUrl + "/fe/nominar-de",
    entity, ResponseDE.class
);

System.out.println("Codigo: " + response.getCodigo());
System.out.println("Respuesta: " + response.getRespuesta());`,
          },
          {
            label: 'JavaScript',
            language: 'javascript',
            code: `const response = await fetch(
  \`\${API_BASE_URL}/sifex.api.mq/fe/nominar-de\`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cdc: "01800123451001001000000012026011511000000000",
      motivoNominacion: "Cliente identificado posterior a la venta",
      tipoDocumentoReceptor: "RUC",
      documentoReceptor: "80012345",
      digitoVerificador: "1",
      razonSocialReceptor: "EMPRESA RECEPTORA S.A.",
      correoElectronicoReceptor: "factura@empresa.com",
      codigoDepartamentoReceptor: 11,
      codigoCiudadReceptor: 1,
      codigoTipoPersona: "JURIDICA"
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
  "respuesta": "Evento de nominacion procesado exitosamente",
  "cdc": "01800123451001001000000012026011511000000000"
}`}
      />

      <FieldTable
        title="Campos del Response"
        fields={[
          { name: 'codigo', type: 'string', required: true, description: 'Codigo de resultado de la operacion' },
          { name: 'respuesta', type: 'string', required: true, description: 'Descripcion del resultado' },
          { name: 'cdc', type: 'string', required: true, description: 'CDC del documento nominado' },
        ]}
      />
    </div>
  );
}
