module.exports = {

  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/index.ts',
    '!<rootDir>/src/app/**/*.module.ts'
  ],

  coverageDirectory: 'coverage',

  coverageReporters: [
    'lcov',
    'text-summary'
  ],

  testPathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/e2e/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/*.(js|scss)'
  ],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } ),

  'moduleNameMapper': {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^models$': '<rootDir>/projects/models/src/public-api.ts'
  },

  testMatch: [
    '<rootDir>/src/app/*.spec.ts',
    '<rootDir>/src/app/**/*.spec.ts'
  ]
};
