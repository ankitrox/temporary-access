/**
 * Custom webpack configuration for the project.
 *
 * This creates multiple entry points for the project.
 */

// Import the original config from the @wordpress/scripts package.
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
// Import the helper to find and generate the entry points in the src directory
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

// Add any a new entry point by extending the webpack config.
module.exports = () => ({
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		api: './assets/js/tempuser-api.js', // to variations file in theme.
		'temp-access': './assets/js/index.js', // to variations file in theme.
		'tempaccess-css': './assets/sass/tempaccess.scss',
	},
});
