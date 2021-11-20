module.exports = {
  extends: [
    './typescript',
    './rules/jsx-a11y',
    './rules/react',
    './rules/react-hooks',
  ].map(require.resolve),
  rules: {},
};
