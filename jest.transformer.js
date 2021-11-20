const bj = require('babel-jest');

module.exports = bj.default.createTransformer({
  presets: ['@cofe/babel-preset-cofe/next'],
});
