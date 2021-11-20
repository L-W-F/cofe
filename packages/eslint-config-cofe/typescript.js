module.exports = {
  extends: ['./base', './rules/typescript'].map(require.resolve),
  rules: {},
};
