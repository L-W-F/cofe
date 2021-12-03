module.exports = {
  plugins: ['react-hooks'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
  },
};
