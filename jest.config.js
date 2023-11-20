/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

module.exports = {
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/fileMock.js',
		'\\.(css)$': '<rootDir>/src/styleMock.js',
	},
};
