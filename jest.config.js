module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!ansi-regex|array-iterate|bail|ccount|character-|cliui|colorette|comma-separated-tokens|flatted|hast-util-is-element|hast-util-to-html|hast-util-whitespace|html-void-elements|is-alphabetical|is-alphanumerical|is-decimal|is-hexadecimal|is-plain-obj|longest-streak|mdast-|micromark|micromark-|nanoid|parse-entities|property-information|space-separated-tokens|stringify-entities|trough|unified|unist-|vfile|vfile-message|y18n|yargs|yargs-parser|zwitch).+\\.js$',
  ],
};
