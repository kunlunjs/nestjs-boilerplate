module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort', 'import'],
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] }
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/consistent-indexed-object-style': 1,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/no-webpack-loader-syntax': 0
  }
}
