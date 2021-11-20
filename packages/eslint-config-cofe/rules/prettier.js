module.exports = {
  plugins: ['prettier'],

  rules: {
    indent: ['off', 2, { SwitchCase: 1 }],
    'prettier/prettier': 'error',
  },
};
