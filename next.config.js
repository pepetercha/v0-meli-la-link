/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config; // fuerza Webpack
  },
  outputFileTracingRoot: __dirname // corrige warning de lockfiles
};

module.exports = nextConfig;
