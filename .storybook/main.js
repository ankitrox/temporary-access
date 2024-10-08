/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: ['../assets/js/**/*.stories.js'],
	addons: [
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-postcss',
		'@storybook/addon-viewport',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		});
		return config;
	},
};
export default config;
