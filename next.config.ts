/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/rekrutteringstreff',
  transpilePackages: ['@navikt/ds-react', '@navikt/ds-css'],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  serverExternalPackages: ['@navikt/next-logger'],
};

export default nextConfig;
