const isDev = process.env.NEXT_PUBLIC_API_ENV !== 'production';

export const config = {
  apiBaseUrl: isDev
    ? process.env.NEXT_PUBLIC_API_BASE_URL_DEV!
    : process.env.NEXT_PUBLIC_API_BASE_URL_PROD!,
  contextPath: process.env.NEXT_PUBLIC_API_CONTEXT_PATH ?? '/sifex.api.mq',
  swaggerSpecUrl: isDev
    ? process.env.NEXT_PUBLIC_SWAGGER_SPEC_URL_DEV!
    : process.env.NEXT_PUBLIC_SWAGGER_SPEC_URL_PROD!,
  swaggerUiUrl: isDev
    ? process.env.NEXT_PUBLIC_SWAGGER_UI_URL_DEV!
    : process.env.NEXT_PUBLIC_SWAGGER_UI_URL_PROD!,
  productName: process.env.NEXT_PUBLIC_PRODUCT_NAME ?? 'EXACTO API',
  version: process.env.NEXT_PUBLIC_PRODUCT_VERSION ?? '2.0.1',
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'IPYAHU',
  isDev,
};

export function endpoint(path: string): string {
  return `${config.apiBaseUrl}${config.contextPath}${path}`;
}
