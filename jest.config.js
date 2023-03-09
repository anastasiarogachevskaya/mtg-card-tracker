module.exports = {
	// The root directory for Jest to search for tests
	roots: ['<rootDir>'],

	// The file extensions Jest will look for when running tests
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],

	// The environment in which Jest will run tests
	testEnvironment: 'jsdom',

	// Transform files with TypeScript using the babel-jest preset
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},

	// The paths Jest will look for modules in
	modulePaths: ['<rootDir>/src'],

	// The file extensions Jest will look for when importing modules
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

	// Other configuration options...
};
