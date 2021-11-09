// const path = require('path');
const output = require('next/dist/build/output/log');
const mdx = require('@next/mdx');
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
})(
  mdx()({
    swcMinify: true,
    outputFileTracing: true,
    compress: false,
    poweredByHeader: false,
    pageExtensions: ['ts', 'tsx'],
    images: {
      domains: [
        process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/^https?:\/\//, ''),
        'avatars.githubusercontent.com',
        'secure.gravatar.com',
      ],
    },
    /**
     * @param {import('webpack').Configuration} config
     * @returns import('webpack').Configuration
     */
    webpack: (config) => {
      config.resolve.fallback = { fs: false, path: false, url: false };

      return config;
    },
  }),
);

module.exports = nextConfig;
