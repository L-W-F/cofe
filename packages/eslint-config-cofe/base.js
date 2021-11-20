module.exports = {
  extends: ['./rules/base', './rules/prettier', './rules/import'].map(
    require.resolve,
  ),
  rules: {},
};
