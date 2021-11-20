module.exports = () => ({
  presets: ['./typescript', '@babel/preset-react'].map(require.resolve),
});
