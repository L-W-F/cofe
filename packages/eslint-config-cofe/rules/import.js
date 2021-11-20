module.exports = {
  env: {
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: ['import'],

  settings: {
    'import/internal-regex':
      '^(assets|components|fields|hocs|hooks|pages|services|store|theme|types|utils|views)(/|$)',
  },

  rules: {
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@material-ui/**/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@ide/**/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@mid/**/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@bff/**/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@shared/**/*',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
