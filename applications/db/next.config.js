const path = require('path');
const output = require('next/dist/build/output/log');
const withTM = require('next-transpile-modules');
const shell = require('shelljs');

const tmModules = shell
  .exec('ls ../../packages', { silent: true })
  .stdout.trim()
  .split(/\s+/)
  .map((name) => `@cofe/${name}`);

output.info(`next-transpile-modules: ${tmModules.join(', ')}`);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withTM(tmModules, { resolveSymlinks: false })({
  experimental: {
    esmExternals: 'loose',
  },
  compress: false,
  poweredByHeader: false,
  pageExtensions: ['ts', 'tsx'],
  /**
   * @param {import('webpack').Configuration} config
   * @returns import('webpack').Configuration
   */
  webpack: (config) => {
    // https://github.com/microsoft/TypeScript/issues/39436#issuecomment-817029140
    config.module.noParse = [require.resolve('prettier/parser-typescript.js')];
    config.resolve.alias = {
      ...config.resolve.alias,
      // 解决本地 link 时的包嵌套引起的子包不走 transpile 的问题
      '@ide': path.resolve(__dirname, 'node_modules/@ide'),
    };

    return config;
  },
});

module.exports = nextConfig;
