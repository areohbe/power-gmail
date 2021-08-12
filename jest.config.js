module.exports = {
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
    "^.+.js$": "babel-jest",
    "^.+.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
  setupFilesAfterEnv: ["<rootDir>/scripts/setupTests.js"],
  coverageDirectory: "./.cov",
  collectCoverage: true,
  coverageReporters: ["clover"],
  collectCoverageFrom: [
    "src/**/*.ts*",
    "src/**/*.svelte",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
};
