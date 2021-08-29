module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>./node_modules'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/modules/middlewares/*',
    '<rootDir>/src/database/*',
  ],
};
