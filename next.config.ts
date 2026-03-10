import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL_DEV || 'http://localhost:8080';
    const ctx = process.env.NEXT_PUBLIC_API_CONTEXT_PATH || '/sifex.api.mq';
    return [
      // Proxy general
      { source: '/api-proxy/:path*', destination: `${apiBase}/:path*` },
      // Rutas internas de Springfox Swagger UI (iframe)
      { source: '/swagger-resources/:path*', destination: `${apiBase}${ctx}/swagger-resources/:path*` },
      { source: '/swagger-resources', destination: `${apiBase}${ctx}/swagger-resources` },
      { source: '/v2/api-docs', destination: `${apiBase}${ctx}/v2/api-docs` },
      { source: '/v2/api-docs/:path*', destination: `${apiBase}${ctx}/v2/api-docs/:path*` },
      { source: '/webjars/:path*', destination: `${apiBase}${ctx}/webjars/:path*` },
    ];
  },
};

export default nextConfig;
