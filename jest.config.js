/**
 * FIXME:
 * pathsToModuleNameMapper doesn't work properly
 * for path resolution like `import model from "model"`
 *
 * So we need to write `moduleNameMapper` ourselves.
 */
// const { pathsToModuleNameMapper } = require('ts-jest/utils')
module.exports = {
  verbose: false,
  collectCoverageFrom: ['src/**/*.ts', '!src/interfaces/**', '!src/seeders/**'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  globalSetup: '<rootDir>/src/tests/global-setup.ts',
  globalTeardown: '<rootDir>/src/tests/global-teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup-test-framework.ts'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^app$': '<rootDir>/src/app.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests($|/.*)': '<rootDir>/src/tests$1',
    '^services($|/.*)': '<rootDir>/src/services$1',
    '^drivers($|/.*)': '<rootDir>/src/drivers$1',
    '^utils($|/.*)': '<rootDir>/src/utils$1',
    '^enums($|/.*)': '<rootDir>/src/enums$1',
    '^errors($|/.*)': '<rootDir>/src/errors$1',
    '^interfaces($|/.*)': '<rootDir>/src/interfaces$1',
    '^middlewares($|/.*)': '<rootDir>/src/middlewares$1',
    '^models($|/.*)': '<rootDir>/src/models$1',
    '^repositories($|/.*)': '<rootDir>/src/repositories$1',
    '^transforms($|/.*)': '<rootDir>/src/transforms$1',
    '^validators($|/.*)': '<rootDir>/src/validators$1',
    '^controllers($|/.*)': '<rootDir>/src/controllers$1',
  },
}
