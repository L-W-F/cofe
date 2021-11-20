module.exports = {
  extends: ['./react']
    .map(require.resolve)
    .concat('plugin:@next/next/recommended'),
  rules: {},
};
