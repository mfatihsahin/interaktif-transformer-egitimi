/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/interaktif-transformer-egitimi' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/interaktif-transformer-egitimi/' : '',
};

module.exports = nextConfig; 