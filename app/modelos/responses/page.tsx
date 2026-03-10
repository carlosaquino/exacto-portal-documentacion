import FieldTable from '@/components/FieldTable';
import CodeBlock from '@/components/CodeBlock';

export default function ResponsesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Modelos de Respuesta</h1>
      <p className="text-slate-400 mb-8">
        Schemas de las respuestas retornadas por los distintos endpoints de EXACTO API.
      </p>

      {/* ResponseDE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">ResponseDE — Respuesta de Emision</h2>
        <p className="text-slate-400 mb-4">
          Retornado por <code className="text-amber-400">POST /fe/procesar-documento-sinc</code>.
        </p>
        <FieldTable
          fields={[
            { name: 'id', type: 'string', required: true, description: 'ID interno de la respuesta' },
            { name: 'cdc', type: 'string', required: true, description: 'CDC asignado por SIFEN (44 caracteres)' },
            { name: 'estado', type: 'string', required: true, description: '"APROBADO", "RECHAZADO", "EN_PROCESO"' },
            { name: 'descripcionEstado', type: 'string', required: true, description: 'Descripcion legible del estado' },
            { name: 'fecha', type: 'string', required: true, description: 'Fecha/hora de procesamiento' },
            { name: 'idDocumentoERP', type: 'integer', required: true, description: 'ID original en el ERP' },
            { name: 'qrLink', type: 'string', required: true, description: 'URL del QR en ekuatia' },
            { name: 'response', type: 'object', required: false, description: 'Objeto con datos adicionales de SIFEN' },
          ]}
        />
        <CodeBlock
          language="json"
          code={`{
  "id": "resp_abc123",
  "cdc": "01800123451001001000000012026011511000000000",
  "estado": "APROBADO",
  "descripcionEstado": "Aprobado por SIFEN",
  "fecha": "2026-01-15T10:30:45",
  "idDocumentoERP": 12345,
  "qrLink": "https://ekuatia.set.gov.py/consultas/qr?qr=...",
  "response": {}
}`}
        />
      </section>

      {/* ResponseLoteDE */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">ResponseLoteDE — Respuesta de Lote</h2>
        <p className="text-slate-400 mb-4">
          Retornado por <code className="text-amber-400">POST /fe/procesar-lote-asinc</code>.
        </p>
        <FieldTable
          fields={[
            { name: 'id', type: 'string', required: true, description: 'ID interno de la respuesta' },
            { name: 'idLote', type: 'string', required: true, description: 'ID del lote para consulta posterior' },
            { name: 'fecha', type: 'string', required: true, description: 'Fecha/hora de recepcion' },
            { name: 'documentosEnviados', type: 'array', required: true, description: 'Lista de documentos con estado' },
            { name: 'response', type: 'object', required: false, description: 'Datos adicionales' },
          ]}
        />
        <CodeBlock
          language="json"
          code={`{
  "id": "resp_lote_001",
  "idLote": "LOTE-2026-001",
  "fecha": "2026-01-15T10:30:00",
  "documentosEnviados": [
    { "cdc": "...", "estado": "EN_PROCESO", "idDocumentoERP": 12345 },
    { "cdc": "...", "estado": "EN_PROCESO", "idDocumentoERP": 12346 }
  ],
  "response": {}
}`}
        />
      </section>

      {/* DocumentoDTO */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">DocumentoDTO — Registro del Middleware</h2>
        <p className="text-slate-400 mb-4">
          Retornado por <code className="text-amber-400">GET /fe/consultar-documentos</code>.
        </p>
        <FieldTable
          fields={[
            { name: 'idDocumento', type: 'integer', required: true, description: 'ID interno en el middleware' },
            { name: 'idDocumentoERP', type: 'integer', required: true, description: 'ID del ERP original' },
            { name: 'idEmpresa', type: 'integer', required: true, description: 'ID de la empresa' },
            { name: 'cdc', type: 'string', required: true, description: 'CDC SIFEN (44 caracteres)' },
            { name: 'nroDocumento', type: 'string', required: true, description: 'Numero del documento' },
            { name: 'timbrado', type: 'integer', required: true, description: 'Numero de timbrado' },
            { name: 'idTipoDocumento', type: 'integer', required: true, description: 'Tipo: 1=FE, 4=AFE, 5=NCE, 6=NDE, 7=NRE' },
            { name: 'estado', type: 'string', required: true, description: 'Estado actual del documento' },
            { name: 'ambiente', type: 'string', required: true, description: '"DEV" o "PROD"' },
            { name: 'fechaCreacion', type: 'string', required: true, description: 'Fecha de creacion' },
            { name: 'indEmailEnviado', type: 'string', required: true, description: '"S"/"N" — si el mail fue enviado' },
            { name: 'indEnviadoSIFEN', type: 'string', required: true, description: '"S"/"N" — si fue enviado a SIFEN' },
            { name: 'linkQr', type: 'string', required: false, description: 'URL del QR' },
            { name: 'respuestaCodigo', type: 'string', required: false, description: 'Codigo de respuesta SIFEN' },
            { name: 'respuestaDescripcion', type: 'string', required: false, description: 'Descripcion de la respuesta' },
            { name: 'kude', type: 'string', required: false, description: 'PDF del KuDE en Base64' },
            { name: 'xmlRequest', type: 'string', required: false, description: 'XML enviado a SIFEN' },
            { name: 'xmlResponse', type: 'string', required: false, description: 'XML de respuesta de SIFEN' },
            { name: 'reenviarEmail', type: 'string', required: false, description: 'Flag para reenviar mail' },
            { name: 'reenviarSifen', type: 'string', required: false, description: 'Flag para reenviar a SIFEN' },
            { name: 'regenerarKude', type: 'string', required: false, description: 'Flag para regenerar el KuDE' },
          ]}
        />
        <CodeBlock
          language="json"
          code={`{
  "idDocumento": 1001,
  "idDocumentoERP": 12345,
  "idEmpresa": 1,
  "cdc": "01800123451001001000000012026011511000000000",
  "nroDocumento": "001-001-0000001",
  "timbrado": 12345678,
  "idTipoDocumento": 1,
  "estado": "APROBADO",
  "ambiente": "PROD",
  "fechaCreacion": "2026-01-15T10:30:00",
  "indEmailEnviado": "S",
  "indEnviadoSIFEN": "S",
  "linkQr": "https://ekuatia.set.gov.py/...",
  "respuestaCodigo": "0260",
  "respuestaDescripcion": "Aprobado",
  "reenviarEmail": "N",
  "reenviarSifen": "N"
}`}
        />
      </section>

      {/* RespuestaConsultaRUC */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">RespuestaConsultaRUC</h2>
        <p className="text-slate-400 mb-4">
          Retornado por <code className="text-amber-400">GET /fe/consultar-ruc/&#123;ruc&#125;</code>.
        </p>
        <FieldTable
          fields={[
            { name: 'ruc', type: 'string', required: true, description: 'RUC sin digito verificador' },
            { name: 'digitoVerificador', type: 'integer', required: true, description: 'Digito verificador' },
            { name: 'razonSocial', type: 'string', required: true, description: 'Razon social del contribuyente' },
            { name: 'tipoContribuyente', type: 'string', required: true, description: '"JURIDICO", "FISICO"' },
            { name: 'estado', type: 'string', required: true, description: '"ACTIVO", "INACTIVO"' },
          ]}
        />
        <CodeBlock
          language="json"
          code={`{
  "ruc": "80012345",
  "digitoVerificador": 1,
  "razonSocial": "EMPRESA EJEMPLO S.A.",
  "tipoContribuyente": "JURIDICO",
  "estado": "ACTIVO"
}`}
        />
      </section>
    </div>
  );
}
