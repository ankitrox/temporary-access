/** @type { import('@storybook/react').Preview } */

// WordPress component styles.
import '../node_modules/@wordpress/components/build-style/style.css';

const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
