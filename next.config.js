const output = require('next/dist/build/output/log');
const tm = require('next-transpile-modules');
const shell = require('shelljs');

const tmModules = shell
  .exec('ls ./packages', { silent: true })
  .stdout.trim()
  .split(/\s+/)
  .map((name) => `@cofe/${name}`);

output.info(`next-transpile-modules: ${tmModules.join(', ')}`);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = tm(tmModules, {
  resolveSymlinks: false,
})({
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  outputFileTracing: true,
  compress: false,
  poweredByHeader: false,
  pageExtensions: ['ts', 'tsx'],
  /**
   * @param {import('webpack').Configuration} config
   * @returns import('webpack').Configuration
   */
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, url: false };

    return config;
  },
});

module.exports = nextConfig;
