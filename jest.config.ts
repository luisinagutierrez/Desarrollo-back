/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      babelConfig: './babel.config.cjs', // Point to the Babel config file
    }],
    '^.+\\.jsx?$': 'babel-jest', // Ensure Babel is used for JS/JSX files
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],  
  roots: ['<rootDir>/src/'],
};