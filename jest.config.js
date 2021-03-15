module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  rootDir: 'src',
  testRegex: '/src/.*\\.(test|spec).(ts|tsx|js)$',
  transform: {
    '^.+\\.(t|j)sx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageReporters: ['json', 'lcov'],
  testEnvironment: 'node'
}
