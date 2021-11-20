module.exports = () => ({
  presets: ['./base', '@babel/preset-typescript'].map(require.resolve),
});
