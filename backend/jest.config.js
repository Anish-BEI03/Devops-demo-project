export default {
  rootDir: '.',

  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.spec.js'
  ],

  transform: {},

  moduleFileExtensions: ['js', 'json'],

  coverageProvider: 'v8',
  collectCoverage: false,

  collectCoverageFrom: [
    '<rootDir>/controllers/**/*.js',
    '<rootDir>/models/**/*.js',
    '<rootDir>/routes/**/*.js',
    '!**/node_modules/**'
  ],

  coverageReporters: ['text', 'lcov', 'html'],

  testTimeout: 10000,
  verbose: true,

  testPathIgnorePatterns: [
    '/node_modules/',
    '/uploads/'
  ]
};
