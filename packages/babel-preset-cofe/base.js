module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        corejs: '3',
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: ['babel-plugin-root-import'].map(require.resolve),
});
