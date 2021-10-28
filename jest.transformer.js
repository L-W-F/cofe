const bj = require('babel-jest');

module.exports = bj.default.createTransformer({
  presets: ['babel-preset-cofe/next'],
});
