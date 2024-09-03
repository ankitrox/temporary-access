module.exports = {
	preset: '@wordpress/jest-preset-default',
	collectCoverage: false, // Enable with `--coverage=true` flag.
	collectCoverageFrom: ['assets/**/**.js'],
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
	coverageReporters: ['html', 'text-summary'],
	rootDir: '../../',
	setupFilesAfterEnv: [
		'<rootDir>/tests/js/jest-matchers',
		'<rootDir>/assets/js/datastores',
	],
	testMatch: [
		'<rootDir>/assets/**/__tests__/**/*.js',
		'<rootDir>/assets/**/test/*.js',
		'<rootDir>/assets/**/?(*.)test.js',
		'<rootDir>/packages/**/__tests__/**/*.js',
		'<rootDir>/packages/**/test/*.js',
		'<rootDir>/packages/**/?(*.)test.js',
		'<rootDir>/tests/js/**/?(*.)test.js',
	],
	testPathIgnorePatterns: [
		'<rootDir>/.git',
		'<rootDir>/node_modules',
		'<rootDir>/build',
	],
	modulePathIgnorePatterns: ['<rootDir>/.vscode'],
	transformIgnorePatterns: ['<rootDir>/node_modules/(?!@material/web)/.*'],
	moduleDirectories: ['node_modules', '<rootDir>/tests/js/utils'],
};
