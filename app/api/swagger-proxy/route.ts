import { NextResponse } from 'next/server';

export async function GET() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL_DEV || 'http://localhost:8080';
  const ctx = process.env.NEXT_PUBLIC_API_CONTEXT_PATH || '/sifex.api.mq';
  const swaggerUrl = `${apiBase}${ctx}/swagger-ui.html`;

  try {
    const res = await fetch(swaggerUrl);
    if (!res.ok) {
      return NextResponse.json({ error: `HTTP ${res.status}` }, { status: res.status });
    }

    let html = await res.text();

    // Reescribir rutas relativas de recursos para que pasen por el proxy
    // webjars/... → /api-proxy/sifex.api.mq/webjars/...
    html = html.replace(
      /(?:href|src)="(webjars\/[^"]*)"/g,
      (match, path) => match.replace(path, `/api-proxy${ctx}/${path}`)
    );

    // Inyectar script antes de springfox.js para sobrescribir la extracción
    // de baseUrl. Springfox usa: /(.*)\/swagger-ui.html.*/.exec(window.location.href)[1]
    // Pero el iframe no tiene swagger-ui.html en su URL, así que falla.
    // Simulamos que la URL contiene swagger-ui.html apuntando al proxy local.
    const baseUrlOverride = `
<script>
(function(){
  var origExec = RegExp.prototype.exec;
  RegExp.prototype.exec = function(str) {
    if (this.source && this.source.indexOf('swagger-ui.html') !== -1 && typeof str === 'string') {
      // Devolver resultado simulado: baseUrl = '' (raíz del servidor)
      var result = ['', ''];
      result.index = 0;
      result.input = str;
      return result;
    }
    return origExec.call(this, str);
  };
})();
</script>`;
    html = html.replace('<head>', '<head>' + baseUrlOverride);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: `No se pudo conectar: ${(e as Error).message}` },
      { status: 502 }
    );
  }
}
