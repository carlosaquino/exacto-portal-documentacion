'use client';

import dynamic from 'next/dynamic';
import CodeBlock from '@/components/CodeBlock';
import AlertBox from '@/components/AlertBox';

const MermaidDiagram = dynamic(() => import('@/components/MermaidDiagram'), { ssr: false });

export default function OracleOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Integracion Oracle — Overview</h1>
      <p className="text-slate-400 mb-8">
        Arquitectura de integracion entre las tablas Oracle del ERP y el middleware EXACTO
        a traves de 6 vistas <code className="text-amber-400">fex_vw_*</code>.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Diagrama de Dependencias</h2>
        <MermaidDiagram
          chart={`graph TB
    subgraph "Tablas Oracle ERP"
        T1[fc_factur_sifen_cab_ts]
        T2[fc_factur_sifen_det_ts]
        T3[fin_cliente]
        T4[fin_pago]
        T5[fin_cuota]
        T6[gen_sucursal]
        T7[gen_timbrado_impresora]
        T8[nre_cabecera]
        T9[fc_param_empresa]
    end
    subgraph "Capa de Vistas fex_vw_*"
        V1[fex_vw_sifen_documentos]
        V2[fex_vw_sifen_documentos_det]
        V3[fex_vw_cobros]
        V4[fex_vw_cuotas]
        V5[fex_vw_referencias]
        V6[fex_vw_remisiones]
    end
    subgraph "Proceso Integracion"
        J[Job Spring Boot]
        API[POST /fe/procesar-documento-sinc]
    end
    T1 & T2 & T3 & T6 & T7 & T9 --> V1
    T2 & V1 --> V2
    T4 & V1 --> V3
    T5 & V1 --> V4
    T1 & V1 --> V5
    V1 & T8 & T9 --> V6
    V1 & V2 & V3 & V4 & V5 & V6 --> J
    J --> API`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Mapeo Vista → Campo del Modelo DE</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Vista Oracle</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Campo DE</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {[
                { vista: 'fex_vw_sifen_documentos', campo: 'Cabecera', desc: 'Datos generales, emisor, receptor, totales', href: '/integracion-oracle/fex_vw_sifen_documentos' },
                { vista: 'fex_vw_sifen_documentos_det', campo: 'detalleDE[]', desc: 'Items con desglose de IVA', href: '/integracion-oracle/fex_vw_sifen_documentos_det' },
                { vista: 'fex_vw_cobros', campo: 'detalleCobro[]', desc: 'Medios de pago', href: '/integracion-oracle/fex_vw_cobros' },
                { vista: 'fex_vw_cuotas', campo: 'detalleCuotas[]', desc: 'Plan de cuotas (solo credito)', href: '/integracion-oracle/fex_vw_cuotas' },
                { vista: 'fex_vw_referencias', campo: 'detalleDEsAsociados[]', desc: 'Docs asociados (NC/ND)', href: '/integracion-oracle/fex_vw_referencias' },
                { vista: 'fex_vw_remisiones', campo: 'detalleRemision', desc: 'Datos de transporte (NRE)', href: '/integracion-oracle/fex_vw_remisiones' },
              ].map((v) => (
                <tr key={v.vista} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                  <td className="px-4 py-2.5">
                    <a href={v.href} className="text-sky-400 hover:text-sky-300 font-mono text-xs">{v.vista}</a>
                  </td>
                  <td className="px-4 py-2.5"><code className="text-amber-400 text-xs">{v.campo}</code></td>
                  <td className="px-4 py-2.5 text-slate-400">{v.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Mapeo de Columnas Principales</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Columna Vista</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Campo DE</th>
                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Notas</th>
              </tr>
            </thead>
            <tbody>
              {[
                { col: 'clave_movimiento', campo: 'idDocumentoERP', nota: 'PK del documento ERP' },
                { col: 'codigo_empresa', campo: 'idFacturador', nota: 'ID empresa middleware' },
                { col: 'tipo_documento_electronico', campo: 'tipoDocumentoElectronico', nota: '1/4/5/6/7' },
                { col: 'timbrado', campo: 'timbrado', nota: 'Numero timbrado perpetuo' },
                { col: 'establecimiento', campo: 'establecimiento', nota: '"001"' },
                { col: 'punto_expedicion', campo: 'puntoExpedicion', nota: 'Numero entero' },
                { col: 'comprobante', campo: 'nroComprobante', nota: 'Numero entero' },
                { col: 'nro_comprobante', campo: 'nroComprobanteCompleto', nota: '"001-001-0000001"' },
                { col: 'fecha_hora_emision', campo: 'fechaEmision', nota: 'ISO 8601' },
                { col: 'moneda', campo: 'moneda', nota: '"PYG"' },
                { col: 'condicion (1/2)', campo: 'condicionVenta', nota: '"CONTADO"/"CREDITO"' },
                { col: 'nombre_cliente', campo: 'razonSocialReceptor', nota: 'Razon social receptor' },
                { col: 'correo_electronico', campo: 'correoElectronicoReceptor', nota: 'Email receptor' },
              ].map((m) => (
                <tr key={m.col} className="border-t border-slate-700/50">
                  <td className="px-4 py-2.5"><code className="text-sky-400 text-xs">{m.col}</code></td>
                  <td className="px-4 py-2.5"><code className="text-amber-400 text-xs">{m.campo}</code></td>
                  <td className="px-4 py-2.5 text-slate-400">{m.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Proceso Java/Spring Boot Completo</h2>
        <CodeBlock
          language="java"
          code={`@Service @Slf4j
public class ExactoIntegrationService {

    @Value("\${exacto.api.base-url}\${exacto.api.context-path:/sifex.api.mq}")
    private String apiUrl;

    private final JdbcTemplate jdbc;
    private final RestTemplate rest;

    public ResponseDE emitirDocumento(Long clave) {
        // 1. Leer todas las vistas Oracle
        Map<String,Object> cab = jdbc.queryForMap(
            "SELECT * FROM fex_vw_sifen_documentos WHERE clave_movimiento = ?", clave);
        List<Map<String,Object>> items = jdbc.queryForList(
            "SELECT * FROM fex_vw_sifen_documentos_det WHERE clave_movimiento = ?", clave);
        List<Map<String,Object>> cobros = jdbc.queryForList(
            "SELECT * FROM fex_vw_cobros WHERE clave_movimiento = ?", clave);

        boolean esCredito = Integer.valueOf(2).equals(cab.get("CONDICION"));
        List<Map<String,Object>> cuotas = esCredito
            ? jdbc.queryForList(
                "SELECT * FROM fex_vw_cuotas WHERE clave_movimiento = ? ORDER BY nro_cuota", clave)
            : List.of();
        List<Map<String,Object>> refs = jdbc.queryForList(
            "SELECT * FROM fex_vw_referencias WHERE clave_movimiento = ?", clave);

        // 2. Construir objeto DE y enviar al middleware
        DE de = buildDE(cab, items, cobros, cuotas, refs);
        HttpEntity<DE> entity = new HttpEntity<>(de, jsonHeaders());

        try {
            return rest.postForObject(
                apiUrl + "/fe/procesar-documento-sinc", entity, ResponseDE.class);
        } catch (HttpClientErrorException e) {
            log.error("Error emitiendo doc {}: {}", clave, e.getResponseBodyAsString());
            throw new ExactoException(e.getResponseBodyAsString(), e);
        }
    }

    @Scheduled(fixedDelayString = "\${exacto.job.interval:60000}")
    public void procesarPendientes() {
        List<Long> pendientes = jdbc.queryForList(
            "SELECT clave_movimiento FROM fex_vw_sifen_documentos WHERE estado = 'P'",
            Long.class);
        log.info("Documentos pendientes: {}", pendientes.size());
        pendientes.forEach(clave -> {
            try { emitirDocumento(clave); }
            catch (Exception e) { log.error("Error doc {}: {}", clave, e.getMessage()); }
        });
    }
}`}
        />

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">application.properties</h3>
        <CodeBlock
          language="properties"
          code={`exacto.api.base-url=\${EXACTO_API_BASE_URL}
exacto.api.context-path=/sifex.api.mq
exacto.job.interval=60000`}
        />
      </section>

      <AlertBox variant="warning" title="Ambiente">
        En la vista <code className="text-amber-400">fex_vw_sifen_documentos</code>, cambiar
        <code className="text-amber-400"> pe.environment = &apos;DEV&apos;</code> en ambiente de pruebas SIFEN.
        En produccion usar <code className="text-amber-400">&apos;PROD&apos;</code>.
      </AlertBox>
    </div>
  );
}
