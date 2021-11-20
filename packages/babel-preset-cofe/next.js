module.exports = () => ({
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          corejs: 3,
          useBuiltIns: 'usage',
        },
      },
    ],
  ],
  plugins: [
    [
      'inline-react-svg',
      {
        svgo: false,
      },
    ],
  ],
});
