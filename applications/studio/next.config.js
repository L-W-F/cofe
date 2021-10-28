// const path = require('path');
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
const nextConfig = withTM(
  [
    ...tmModules,
    'ansi-regex',
    'array-iterate',
    'bail',
    'ccount',
    'character-entities',
    'character-entities-html4',
    'character-entities-legacy',
    'character-reference-invalid',
    'cliui',
    'colorette',
    'comma-separated-tokens',
    'flatted',
    'hast-util-is-element',
    'hast-util-to-html',
    'hast-util-whitespace',
    'html-void-elements',
    'is-alphabetical',
    'is-alphanumerical',
    'is-decimal',
    'is-hexadecimal',
    'is-plain-obj',
    'longest-streak',
    'mdast-util-definitions',
    'mdast-util-find-and-replace',
    'mdast-util-from-markdown',
    'mdast-util-gfm',
    'mdast-util-gfm-autolink-literal',
    'mdast-util-gfm-strikethrough',
    'mdast-util-gfm-table',
    'mdast-util-gfm-task-list-item',
    'mdast-util-to-hast',
    'mdast-util-to-markdown',
    'mdast-util-to-string',
    'micromark',
    'micromark-core-commonmark',
    'micromark-extension-gfm',
    'micromark-extension-gfm-autolink-literal',
    'micromark-extension-gfm-strikethrough',
    'micromark-extension-gfm-table',
    'micromark-extension-gfm-tagfilter',
    'micromark-extension-gfm-task-list-item',
    'micromark-factory-destination',
    'micromark-factory-label',
    'micromark-factory-space',
    'micromark-factory-title',
    'micromark-factory-whitespace',
    'micromark-util-character',
    'micromark-util-chunked',
    'micromark-util-classify-character',
    'micromark-util-combine-extensions',
    'micromark-util-decode-numeric-character-reference',
    'micromark-util-decode-string',
    'micromark-util-encode',
    'micromark-util-html-tag-name',
    'micromark-util-normalize-identifier',
    'micromark-util-resolve-all',
    'micromark-util-sanitize-uri',
    'micromark-util-subtokenize',
    'micromark-util-symbol',
    'micromark-util-types',
    'nanoid',
    'parse-entities',
    'property-information',
    'space-separated-tokens',
    'stringify-entities',
    'trough',
    'unified',
    'unist-builder',
    'unist-util-filter',
    'unist-util-generated',
    'unist-util-is',
    'unist-util-map',
    'unist-util-modify-children',
    'unist-util-parents',
    'unist-util-position',
    'unist-util-remove',
    'unist-util-select',
    'unist-util-stringify-position',
    'unist-util-visit',
    'unist-util-visit-parents',
    'vfile',
    'vfile-message',
    'y18n',
    'yargs',
    'yargs-parser',
    'zwitch',
  ],
  {
    resolveSymlinks: false,
  },
)({
  // experimental: {
  //   esmExternals: 'loose',
  // },
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
});

module.exports = nextConfig;
