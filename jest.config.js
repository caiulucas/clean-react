const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/routes/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/main/test/cypress',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/src',
    }),
    '\\.scss$': 'identity-obj-proxy',
  },
};
