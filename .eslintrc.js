module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // deprecated
    // project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
    // 'plugin:jest/recommended'
    // deprecated https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md
    // 'prettier/@typescript-eslint'
  ],
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0
  }
}
