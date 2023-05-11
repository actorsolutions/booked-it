const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir:'./'
})
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
}




module.exports = {
  ...createJestConfig(customJestConfig),
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
