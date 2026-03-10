'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import MethodBadge from '@/components/MethodBadge';
import AlertBox from '@/components/AlertBox';
import { ChevronDown, ChevronRight, FileJson, Key, Send, Search, FileText, Bell, Variable } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Collapsible section component                                      */
/* ------------------------------------------------------------------ */
function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-700 rounded-xl mb-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-slate-800/60 hover:bg-slate-800 transition-colors text-left"
      >
        <Icon size={18} className="text-sky-400 shrink-0" />
        <span className="text-lg font-semibold text-white flex-1">{title}</span>
        {open ? (
          <ChevronDown size={18} className="text-slate-400" />
        ) : (
          <ChevronRight size={18} className="text-slate-400" />
        )}
      </button>
      {open && <div className="px-5 py-4 space-y-6">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function EjemploPostmanPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <span className="text-slate-300">Ejemplos Postman</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">
        Ejemplos de la Coleccion Postman
      </h1>
      <p className="text-slate-400 mb-6">
        Esta pagina documenta todos los ejemplos de solicitudes reales extraidos de la coleccion Postman oficial de EXACTO API.
        Cada ejemplo incluye el cuerpo (body) JSON completo y los parametros necesarios para realizar las peticiones.
      </p>

      <AlertBox variant="info" title="Acerca de estos ejemplos">
        Los ejemplos presentados en esta pagina fueron extraidos de la coleccion Postman oficial utilizada para pruebas de integracion
        con EXACTO API (<code className="text-sky-300">sifex.api.mq</code>). Todos los cuerpos de solicitud han sido probados
        y validados contra el middleware.
      </AlertBox>

      <AlertBox variant="warning" title="Autenticacion requerida">
        Antes de utilizar cualquier endpoint, debe obtener un token JWT mediante el endpoint{' '}
        <code className="text-amber-300">POST /oauth/token</code>. Todos los demas servicios requieren este token como
        cabecera <code className="text-amber-300">Authorization: Bearer {'{{token}}'}</code>.
      </AlertBox>

      {/* ================================================================ */}
      {/*  Variables Postman                                                */}
      {/* ================================================================ */}
      <Section title="Variables de la Coleccion" icon={Variable} defaultOpen>
        <p className="text-slate-400 text-sm mb-4">
          La coleccion Postman utiliza variables de entorno que deben configurarse antes de ejecutar las solicitudes.
          La URL base se compone como: <code className="text-sky-300">{'{{server}}:{{port}}/{{contextPath}}'}</code>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3 text-slate-300 font-semibold">Variable</th>
                <th className="text-left py-2 px-3 text-slate-300 font-semibold">Descripcion</th>
                <th className="text-left py-2 px-3 text-slate-300 font-semibold">Ejemplo</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{server}}'}</td>
                <td className="py-2 px-3">IP o dominio del servidor</td>
                <td className="py-2 px-3 font-mono text-slate-500">http://mi-servidor</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{port}}'}</td>
                <td className="py-2 px-3">Puerto del servicio</td>
                <td className="py-2 px-3 font-mono text-slate-500">8080</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{contextPath}}'}</td>
                <td className="py-2 px-3">Context path de la aplicacion</td>
                <td className="py-2 px-3 font-mono text-slate-500">sifex.api.mq</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{token}}'}</td>
                <td className="py-2 px-3">Token JWT obtenido del endpoint /oauth/token</td>
                <td className="py-2 px-3 font-mono text-slate-500">eyJhbGciOiJI...</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{nombre_usuario}}'}</td>
                <td className="py-2 px-3">Nombre de usuario para autenticacion</td>
                <td className="py-2 px-3 font-mono text-slate-500">mi_usuario</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{clave}}'}</td>
                <td className="py-2 px-3">Clave del usuario</td>
                <td className="py-2 px-3 font-mono text-slate-500">********</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{ruc-sin-dv}}'}</td>
                <td className="py-2 px-3">RUC sin digito verificador</td>
                <td className="py-2 px-3 font-mono text-slate-500">80030229</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3 font-mono text-sky-400">{'{{cdc}}'}</td>
                <td className="py-2 px-3">Codigo de Control del documento (44 caracteres)</td>
                <td className="py-2 px-3 font-mono text-slate-500">0180024300501...</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-sky-400">{'{{lote}}'}</td>
                <td className="py-2 px-3">Numero de lote de documentos</td>
                <td className="py-2 px-3 font-mono text-slate-500">12345</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  1. Autenticacion                                                */}
      {/* ================================================================ */}
      <Section title="1. Autenticacion" icon={Key} defaultOpen>
        <div>
          <h3 className="text-white font-semibold mb-1">Obtener Token</h3>
          <p className="text-slate-400 text-sm mb-3">
            Servicio RESTful utilizado para la autenticacion y obtencion del token a ser utilizado en todos los demas servicios de EXACTO.
          </p>
          <MethodBadge method="POST" path="/oauth/token" />

          <p className="text-slate-400 text-sm mb-2">
            <strong className="text-slate-300">Autenticacion:</strong> Basic Auth (credenciales del cliente OAuth2)
          </p>

          <h4 className="text-sm font-semibold text-slate-300 mt-4 mb-2">Query Parameters</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-300 font-semibold">Parametro</th>
                  <th className="text-left py-2 px-3 text-slate-300 font-semibold">Valor</th>
                  <th className="text-left py-2 px-3 text-slate-300 font-semibold">Descripcion</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-sky-400">grant_type</td>
                  <td className="py-2 px-3 font-mono">password</td>
                  <td className="py-2 px-3">Tipo de concesion OAuth2</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-sky-400">username</td>
                  <td className="py-2 px-3 font-mono">{'{{nombre_usuario}}'}</td>
                  <td className="py-2 px-3">Nombre de usuario</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-sky-400">password</td>
                  <td className="py-2 px-3 font-mono">{'{{clave}}'}</td>
                  <td className="py-2 px-3">Clave del usuario</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            title="cURL"
            language="bash"
            code={`curl -X POST \\
  "{servidor}:{puerto}/{contextPath}/oauth/token?grant_type=password&username={usuario}&password={clave}" \\
  -H "Authorization: Basic {credenciales_base64}"`}
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  2. Servicios de Recepcion SINCRONOS                             */}
      {/* ================================================================ */}
      <Section title="2. Servicios de Recepcion Sincronos" icon={Send}>
        <p className="text-slate-400 text-sm mb-4">
          Todos los ejemplos de esta seccion utilizan el endpoint{' '}
          <code className="text-sky-300">POST /fe/procesar-documento-sinc</code> con autenticacion Bearer Token.
        </p>
        <MethodBadge method="POST" path="/fe/procesar-documento-sinc" />

        {/* Factura Contado con Info Pago */}
        <div className="border-t border-slate-700 pt-6 mt-2">
          <h3 className="text-white font-semibold text-lg mb-1">Factura Contado con Info de Pago</h3>
          <p className="text-slate-400 text-sm mb-3">
            Ejemplo completo de una factura electonica de contado, incluyendo los datos del cobro (detalleCobro) y los items (detalleDE).
          </p>
          <CodeBlock
            language="json"
            title="Request Body"
            code={`{
  "idFacturador": 1,
  "tipoTransaccion": "VENTA_MERCADERIA",
  "fechaEmision": "2024-04-17T07:08:21.345+00:00",
  "idDocumentoERP": 207566840102,
  "moneda": "PYG",
  "tipoDocumentoElectronico": 1,
  "establecimiento": 1,
  "puntoExpedicion": 1,
  "nroComprobante": 3331,
  "nroComprobanteCompleto": "001-001-0003331",
  "timbrado": 12559378,
  "razonSocialReceptor": "CARLOS AQUINO",
  "documentoReceptor": "RUC",
  "ruc": "123456",
  "digitoVerificador": "1",
  "tipoContribuyente": "1",
  "tipoNaturalezaReceptor": "NO_CONTRIBUYENTE",
  "tipoPersonaReceptor": "PERSONA_FISICA",
  "direccionReceptor": "CIUDAD DEL ESTE",
  "telefonoReceptor": "0541-42679",
  "celularReceptor": "0541-42679",
  "correoElectronicoReceptor": "programacion6@hilagro.com.py",
  "tipoCambio": 1,
  "condicionVenta": "CONTADO",
  "tipoCondicionCredito": "PLAZO",
  "totalOperacion": 220000,
  "detalleCobro": [
    {
      "importe": 220000,
      "moneda": "PYG",
      "tipoPago": 2,
      "numeroCheque": 123456,
      "bancoEmisor": "CONTINENTAL"
    }
  ],
  "detalleDE": [
    {
      "afectaIVA": 1,
      "cantidad": 2,
      "codigoArticulo": "A-614065",
      "descripcion": "BAL TERNERO 40KG",
      "descuentoUnitario": 0,
      "exentas": 0,
      "gravadas10": 200000,
      "gravadas5": 0,
      "infoAdicional": "sin info adicional",
      "iva10": 20000,
      "iva5": 0,
      "montoTotalDescuento": 0,
      "porcentajeDescuento": 0,
      "precioUnitario": 110000,
      "proporcionIVA": 100,
      "tasaImpuesto": 10,
      "tipoIVA": "GRAVADO",
      "totalBrutoItem": 220000,
      "totalNeto": 0,
      "unidadMedida": 77
    }
  ]
}`}
          />
        </div>

        {/* Factura Contado SIN Info Pago */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Factura Contado sin Info de Pago</h3>
          <AlertBox variant="info" title="Diferencia clave">
            Misma estructura que la factura con info de pago, pero el campo <code className="text-sky-300">detalleCobro</code> se
            envia como un arreglo vacio <code className="text-sky-300">[]</code>. Esto indica que no se especifica la forma de pago.
          </AlertBox>
          <CodeBlock
            language="json"
            title="Diferencia"
            code={`{
  "...": "// Mismos campos que Factura Contado con Info Pago",
  "detalleCobro": [],
  "detalleDE": [ "..." ]
}`}
          />
        </div>

        {/* Factura Contado USD sin Info Pago */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Factura Contado USD sin Info de Pago</h3>
          <AlertBox variant="info" title="Diferencia clave">
            Misma estructura base, pero el campo <code className="text-sky-300">moneda</code> puede ser{' '}
            <code className="text-sky-300">&quot;USD&quot;</code> y se debe incluir el{' '}
            <code className="text-sky-300">tipoCambio</code> correspondiente al tipo de cambio del dia.
          </AlertBox>
          <CodeBlock
            language="json"
            title="Diferencia"
            code={`{
  "...": "// Mismos campos base",
  "moneda": "USD",
  "tipoCambio": 7350,
  "detalleCobro": [],
  "detalleDE": [ "..." ]
}`}
          />
        </div>

        {/* Nota de Debito */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Nota de Debito</h3>
          <p className="text-slate-400 text-sm mb-3">
            Documento de tipo 6 (Nota de Debito). La condicion de venta es <code className="text-sky-300">CREDITO</code> e incluye
            el motivo de emision y la referencia al documento asociado mediante CDC. El body se envia como un arreglo.
          </p>
          <AlertBox variant="warning" title="Body como arreglo">
            A diferencia de la factura, la Nota de Debito se envia envuelta en un arreglo:{' '}
            <code className="text-amber-300">[{'{ ... }'}]</code>
          </AlertBox>
          <CodeBlock
            language="json"
            title="Request Body"
            code={`[
  {
    "idFacturador": 1,
    "tipoTransaccion": "VENTA_MERCADERIA",
    "fechaEmision": "2024-04-17T07:08:21.345+00:00",
    "idDocumentoERP": 207566840102,
    "moneda": "PYG",
    "tipoDocumentoElectronico": 6,
    "establecimiento": 1,
    "puntoExpedicion": 1,
    "nroComprobante": 3331,
    "nroComprobanteCompleto": "001-001-0003331",
    "timbrado": 12559378,
    "razonSocialReceptor": "CARLOS AQUINO",
    "documentoReceptor": "RUC",
    "ruc": "123456",
    "digitoVerificador": "1",
    "tipoContribuyente": "1",
    "tipoNaturalezaReceptor": "NO_CONTRIBUYENTE",
    "tipoPersonaReceptor": "PERSONA_FISICA",
    "direccionReceptor": "CIUDAD DEL ESTE",
    "condicionVenta": "CREDITO",
    "tipoCondicionCredito": "PLAZO",
    "motivoEmision": "AJUSTE_DE_PRECIO",
    "totalOperacion": 220000,
    "detalleCobro": [],
    "detalleDE": [
      {
        "afectaIVA": 1,
        "cantidad": 2,
        "codigoArticulo": "A-614065",
        "descripcion": "BAL TERNERO 40KG",
        "precioUnitario": 110000,
        "gravadas10": 200000,
        "iva10": 20000,
        "tasaImpuesto": 10,
        "tipoIVA": "GRAVADO",
        "totalBrutoItem": 220000,
        "unidadMedida": 77
      }
    ],
    "detalleDEsAsociados": [
      {
        "cdc": "01800302290001001000333222024041713242945630"
      }
    ]
  }
]`}
          />
        </div>

        {/* Nota de Remision */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Nota de Remision</h3>
          <p className="text-slate-400 text-sm mb-3">
            Documento de tipo 7 (Nota de Remision). Incluye datos de remision y transporte: salida, destino, vehiculo y transportista.
          </p>
          <CodeBlock
            language="json"
            title="Request Body (campos adicionales)"
            code={`{
  "...": "// Campos base del documento",
  "tipoDocumentoElectronico": 7,
  "detalleRemision": {
    "motivoEmision": "TRASLADO_ENTRE_LOCALES",
    "responsableRemision": 1,
    "kms": 150
  },
  "detalleTransporte": {
    "tipo": "TERRESTRE",
    "modalidad": "PROPIO",
    "tipoResponsable": 1,
    "datosSalida": {
      "direccion": "AV. PRINCIPALES 123, ASUNCION",
      "fechaSalida": "2024-04-17T07:08:21.345+00:00"
    },
    "datosDestino": {
      "direccion": "RUTA 2 KM 30, SAN LORENZO",
      "fechaEstimadaLlegada": "2024-04-17T12:00:00.000+00:00"
    },
    "datosVehiculos": [
      {
        "tipo": "CAMION",
        "marca": "MERCEDES BENZ",
        "chapa": "ABC-1234"
      }
    ],
    "datosTransportista": {
      "contribuyente": true,
      "nombre": "TRANSPORTES SA",
      "ruc": "80012345-6",
      "documentoTipo": "RUC",
      "documentoNumero": "80012345"
    }
  },
  "detalleDE": [ "..." ]
}`}
          />
        </div>

        {/* Autofactura */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Autofactura</h3>
          <p className="text-slate-400 text-sm mb-3">
            Documento de tipo 4 (Autofactura). Incluye los datos del vendedor en <code className="text-sky-300">detalleAutoFactura</code> y
            la referencia a la constancia en <code className="text-sky-300">detalleDEsAsociados</code>.
          </p>
          <CodeBlock
            language="json"
            title="Request Body (campos adicionales)"
            code={`{
  "...": "// Campos base del documento",
  "tipoDocumentoElectronico": 4,
  "detalleAutoFactura": {
    "naturalezaVendedor": 1,
    "tipoDocumentoVendedor": "CI",
    "documentoVendedor": "1234567",
    "nombreVendedor": "JUAN PEREZ",
    "direccionVendedor": "ASUNCION",
    "departamentoVendedor": 11,
    "distritoVendedor": 1,
    "ciudadVendedor": "ASUNCION",
    "lugarTransaccion": "MERCADO MUNICIPAL"
  },
  "detalleDEsAsociados": [
    {
      "constancia": "123456789"
    }
  ],
  "detalleDE": [ "..." ]
}`}
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  3. Servicios de Recepcion ASINCRONOS                            */}
      {/* ================================================================ */}
      <Section title="3. Servicios de Recepcion Asincronos" icon={Send}>
        <p className="text-slate-400 text-sm mb-4">
          Todos los ejemplos de esta seccion utilizan el endpoint{' '}
          <code className="text-sky-300">POST /fe/procesar-lote-asinc</code> con autenticacion Bearer Token.
          El body siempre es un <strong className="text-slate-300">arreglo de documentos</strong>.
        </p>
        <MethodBadge method="POST" path="/fe/procesar-lote-asinc" />

        <AlertBox variant="info" title="Formato del body">
          En el procesamiento asincrono, el body siempre es un arreglo de documentos:{' '}
          <code className="text-sky-300">[{'{ doc1 }, { doc2 }, ...'}]</code>. Puede enviar uno o multiples documentos en un solo lote.
        </AlertBox>

        {/* Factura Contado sin Info Pago */}
        <div className="border-t border-slate-700 pt-6 mt-2">
          <h3 className="text-white font-semibold text-lg mb-1">Factura Contado sin Info de Pago</h3>
          <p className="text-slate-400 text-sm mb-3">
            Misma estructura de factura contado pero envuelta en un arreglo. El campo <code className="text-sky-300">detalleCobro</code> va vacio.
          </p>
          <CodeBlock
            language="json"
            title="Request Body"
            code={`[
  {
    "idFacturador": 1,
    "tipoTransaccion": "VENTA_MERCADERIA",
    "fechaEmision": "2024-04-17T07:08:21.345+00:00",
    "idDocumentoERP": 207566840102,
    "moneda": "PYG",
    "tipoDocumentoElectronico": 1,
    "establecimiento": 1,
    "puntoExpedicion": 1,
    "nroComprobante": 3331,
    "nroComprobanteCompleto": "001-001-0003331",
    "timbrado": 12559378,
    "razonSocialReceptor": "CARLOS AQUINO",
    "documentoReceptor": "RUC",
    "ruc": "123456",
    "digitoVerificador": "1",
    "condicionVenta": "CONTADO",
    "totalOperacion": 220000,
    "detalleCobro": [],
    "detalleDE": [
      {
        "afectaIVA": 1,
        "cantidad": 2,
        "codigoArticulo": "A-614065",
        "descripcion": "BAL TERNERO 40KG",
        "precioUnitario": 110000,
        "gravadas10": 200000,
        "iva10": 20000,
        "tasaImpuesto": 10,
        "tipoIVA": "GRAVADO",
        "totalBrutoItem": 220000,
        "unidadMedida": 77
      }
    ]
  }
]`}
          />
        </div>

        {/* Factura Credito sin Info Pago */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Factura Credito sin Info de Pago</h3>
          <AlertBox variant="info" title="Diferencia clave">
            Se cambia <code className="text-sky-300">condicionVenta</code> a <code className="text-sky-300">&quot;CREDITO&quot;</code> y{' '}
            <code className="text-sky-300">tipoCondicionCredito</code> a <code className="text-sky-300">&quot;CUOTA&quot;</code>.
          </AlertBox>
          <CodeBlock
            language="json"
            title="Diferencia"
            code={`[
  {
    "...": "// Mismos campos base",
    "condicionVenta": "CREDITO",
    "tipoCondicionCredito": "CUOTA",
    "detalleCobro": [],
    "detalleDE": [ "..." ]
  }
]`}
          />
        </div>

        {/* Nota de Credito */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Nota de Credito</h3>
          <p className="text-slate-400 text-sm mb-3">
            Documento de tipo 5 (Nota de Credito). Incluye <code className="text-sky-300">motivoEmision</code> y la referencia al
            documento asociado mediante CDC en <code className="text-sky-300">detalleDEsAsociados</code>.
          </p>
          <CodeBlock
            language="json"
            title="Diferencia"
            code={`[
  {
    "...": "// Campos base",
    "tipoDocumentoElectronico": 5,
    "motivoEmision": "DEVOLUCION_Y_AJUSTES_DE_PRECIOS",
    "detalleDEsAsociados": [
      {
        "cdc": "01800302290001001000333222024041713242945630"
      }
    ],
    "detalleDE": [ "..." ]
  }
]`}
          />
        </div>

        {/* Nota de Debito */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Nota de Debito</h3>
          <AlertBox variant="info" title="Diferencia clave">
            Misma estructura que la Nota de Debito sincrona (tipo 6), pero envuelta en un arreglo para el procesamiento asincrono.
            Incluye <code className="text-sky-300">motivoEmision: &quot;AJUSTE_DE_PRECIO&quot;</code> y{' '}
            <code className="text-sky-300">detalleDEsAsociados</code> con el CDC del documento original.
          </AlertBox>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  4. Procesamiento Offline                                        */}
      {/* ================================================================ */}
      <Section title="4. Procesamiento Offline" icon={Send}>
        <MethodBadge method="POST" path="/fe/procesar-lote-asinc-offline" />
        <p className="text-slate-400 text-sm mb-4">
          Misma estructura que el procesamiento asincrono (<code className="text-sky-300">/fe/procesar-lote-asinc</code>), pero orientado
          para procesamiento sin conexion. El body es un arreglo de documentos con la misma estructura.
        </p>
        <AlertBox variant="info" title="Estructura identica">
          Los cuerpos de solicitud son identicos a los del procesamiento asincrono.
          La unica diferencia es el endpoint utilizado: <code className="text-sky-300">/fe/procesar-lote-asinc-offline</code>.
          Consulte los ejemplos de la seccion anterior.
        </AlertBox>
      </Section>

      {/* ================================================================ */}
      {/*  5. Consultas                                                    */}
      {/* ================================================================ */}
      <Section title="5. Consultas" icon={Search}>
        <p className="text-slate-400 text-sm mb-4">
          Endpoints para consultar informacion de contribuyentes, documentos electronicos y lotes.
          Todos requieren autenticacion Bearer Token.
        </p>

        {/* Consultar RUC */}
        <div className="border-t border-slate-700 pt-6 mt-2">
          <h3 className="text-white font-semibold text-lg mb-1">Consultar RUC</h3>
          <p className="text-slate-400 text-sm mb-3">
            Consultar la existencia y los datos de un contribuyente por su RUC (sin digito verificador).
          </p>
          <MethodBadge method="GET" path="/fe/consultar-ruc/{ruc-sin-dv}" />
          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/consultar-ruc/80030229" \\
  -H "Authorization: Bearer {token}"`}
          />
        </div>

        {/* Consultar Documento SIFEN */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Consultar Documento en SIFEN</h3>
          <p className="text-slate-400 text-sm mb-3">
            Consultar la existencia de un documento electronico en SIFEN mediante su CDC.
          </p>
          <MethodBadge method="GET" path="/fe/consultar-documento-sifen/{cdc}" />
          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/consultar-documento-sifen/01800243005016001002952322024100411722273594" \\
  -H "Authorization: Bearer {token}"`}
          />
        </div>

        {/* Consultar Documento Empresa SIFEN */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Consultar Documento Empresa en SIFEN</h3>
          <p className="text-slate-400 text-sm mb-3">
            Consultar un documento electronico en SIFEN asociado a una empresa especifica.
          </p>
          <MethodBadge method="POST" path="/fe/consultar-documento-empresa-sifen" />
          <CodeBlock
            language="json"
            title="Request Body"
            code={`{
  "cdc": "01800243005016001002952322024100411722273594",
  "idEmpresa": 2
}`}
          />
        </div>

        {/* Consultar Documento EXACTO */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Consultar Documento en EXACTO</h3>
          <p className="text-slate-400 text-sm mb-3">
            Consultar informacion acerca de un documento electronico en EXACTO (middleware local).
          </p>
          <MethodBadge method="GET" path="/fe/consultar-documento-sifex/{cdc}" />
          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/consultar-documento-sifex/{cdc}" \\
  -H "Authorization: Bearer {token}"`}
          />
        </div>

        {/* Consultar Lote SIFEN */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Consultar Lote en SIFEN</h3>
          <p className="text-slate-400 text-sm mb-3">
            Consultar la existencia o el estado de un lote de documentos electronicos en SIFEN.
          </p>
          <MethodBadge method="GET" path="/fe/consultar-lote-sifen/{lote}" />
          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/consultar-lote-sifen/12345" \\
  -H "Authorization: Bearer {token}"`}
          />
        </div>

        {/* Consultar Documentos */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Consultar Documentos por Rango de Fechas</h3>
          <p className="text-slate-400 text-sm mb-3">
            Consultar documentos electronicos filtrados por rango de fechas y empresa.
          </p>
          <MethodBadge method="GET" path="/fe/consultar-documentos" />

          <h4 className="text-sm font-semibold text-slate-300 mt-4 mb-2">Query Parameters</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-300 font-semibold">Parametro</th>
                  <th className="text-left py-2 px-3 text-slate-300 font-semibold">Ejemplo</th>
                  <th className="text-left py-2 px-3 text-slate-300 font-semibold">Descripcion</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-sky-400">desdeFecha</td>
                  <td className="py-2 px-3 font-mono">27/11/2025</td>
                  <td className="py-2 px-3">Fecha inicio (formato dd/MM/yyyy)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3 font-mono text-sky-400">hastaFecha</td>
                  <td className="py-2 px-3 font-mono">27/11/2025</td>
                  <td className="py-2 px-3">Fecha fin (formato dd/MM/yyyy)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-sky-400">idEmpresa</td>
                  <td className="py-2 px-3 font-mono">1003</td>
                  <td className="py-2 px-3">Identificador de la empresa</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/consultar-documentos?desdeFecha=27/11/2025&hastaFecha=27/11/2025&idEmpresa=1003" \\
  -H "Authorization: Bearer {token}"`}
          />

          <h4 className="text-sm font-semibold text-slate-300 mt-4 mb-2">Ejemplo de Respuesta</h4>
          <CodeBlock
            language="json"
            title="Response 200"
            code={`[
  {
    "idDocumento": 1219,
    "idEmpresa": 1003,
    "idTipoDocumento": 1,
    "timbrado": 18441237,
    "serie": null,
    "establecimiento": 1,
    "puntoExpedicion": 1,
    "comprobante": 12,
    "nroComprobante": "001-001-0000012",
    "fechaEmision": "27/11/2025",
    "cdc": "01013117521001001000001222025112715658238366",
    "estado": "Aprobado",
    "observacion": " - ",
    "linkQR": "https://ekuatia.set.gov.py/consultas/qr?...",
    "idDocumentoERP": 460699,
    "cdcRef": null
  }
]`}
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  6. KuDE                                                         */}
      {/* ================================================================ */}
      <Section title="6. KuDE (Documento Electronico Impreso)" icon={FileText}>
        <p className="text-slate-400 text-sm mb-4">
          Endpoints para obtener el KuDE (representacion impresa) de un documento electronico.
          Ambos requieren el CDC del documento como parametro de ruta.
        </p>

        {/* Obtener KuDE */}
        <div className="border-t border-slate-700 pt-6 mt-2">
          <h3 className="text-white font-semibold text-lg mb-1">Obtener KuDE</h3>
          <p className="text-slate-400 text-sm mb-3">
            Obtiene el KuDE en formato estandar (PDF) del documento electronico.
          </p>
          <MethodBadge method="GET" path="/fe/obtener-kude/{cdc}" />
          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/obtener-kude/{cdc}" \\
  -H "Authorization: Bearer {token}"`}
          />
        </div>

        {/* Obtener KuDE Cinta */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Obtener KuDE en Formato Cinta</h3>
          <p className="text-slate-400 text-sm mb-3">
            Obtiene el KuDE en formato cinta (ticket) para impresoras termicas.
          </p>
          <MethodBadge method="GET" path="/fe/obtener-kude-cinta/{cdc}" />
          <CodeBlock
            language="bash"
            title="cURL"
            code={`curl -X GET \\
  "{servidor}:{puerto}/{contextPath}/fe/obtener-kude-cinta/{cdc}" \\
  -H "Authorization: Bearer {token}"`}
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  7. Eventos                                                      */}
      {/* ================================================================ */}
      <Section title="7. Eventos" icon={Bell}>
        <p className="text-slate-400 text-sm mb-4">
          Endpoints para gestionar eventos sobre documentos electronicos (cancelacion, nominacion e inutilizacion).
          Todos requieren autenticacion Bearer Token.
        </p>

        {/* Cancelar DE */}
        <div className="border-t border-slate-700 pt-6 mt-2">
          <h3 className="text-white font-semibold text-lg mb-1">Cancelar Documento Electronico</h3>
          <p className="text-slate-400 text-sm mb-3">
            Cancela un documento electronico previamente aprobado en SIFEN.
          </p>
          <MethodBadge method="POST" path="/fe/cancelar-de" />
          <CodeBlock
            language="json"
            title="Request Body"
            code={`{
  "cdc": "01800302290001001000333222024041713242945630",
  "motivoCancelacion": "Error en la confeccion de la factura"
}`}
          />
        </div>

        {/* Nominar DE */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Nominar Documento Electronico</h3>
          <p className="text-slate-400 text-sm mb-3">
            Asigna o actualiza los datos del receptor en un documento electronico que fue emitido como innominado.
          </p>
          <MethodBadge method="POST" path="/fe/nominar-de" />
          <CodeBlock
            language="json"
            title="Request Body"
            code={`{
  "cdc": "01800243005019002000149922024042613205175215",
  "documentoReceptor": "44444401",
  "digitoVerificador": "7",
  "motivoNominacion": "No se ingreso razon social",
  "razonSocialReceptor": "OCASIONAL",
  "tipoNaturalezaReceptor": "NO_CONTRIBUYENTE",
  "tipoPersonaReceptor": "PERSONA_FISICA"
}`}
          />
        </div>

        {/* Inutilizar Numeracion */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold text-lg mb-1">Inutilizar Numeracion</h3>
          <p className="text-slate-400 text-sm mb-3">
            Permite inutilizar un rango de numeros de comprobantes que no seran utilizados, informando a SIFEN
            que dichos numeros fueron saltados o descartados.
          </p>
          <MethodBadge method="POST" path="/fe/inutilizar-numeracion" />
          <CodeBlock
            language="json"
            title="Request Body"
            code={`{
  "numeroTimbrado": 12559378,
  "establecimiento": "001",
  "puntoExpedicion": "001",
  "tipoDocumentoElectronico": 1,
  "numeroInicio": 100,
  "numeroFin": 150,
  "motivoInutilizacion": "Salto de numeracion por error en sistema"
}`}
          />
          <div className="mt-3">
            <AlertBox variant="info">
              El rango de numeracion (<code className="text-amber-400">numeroInicio</code> a <code className="text-amber-400">numeroFin</code>) debe
              corresponder a comprobantes que no hayan sido emitidos ni registrados previamente.
            </AlertBox>
          </div>
        </div>
      </Section>
    </div>
  );
}
