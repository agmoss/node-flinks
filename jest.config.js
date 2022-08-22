module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/src/'],
};
