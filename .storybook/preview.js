/** @type { import('@storybook/react').Preview } */

// WordPress component styles.
import '../node_modules/@wordpress/components/build-style/style.css';
import '../tests/js/utils/global-setup';

const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: { showPanel: false },
	},
};

export default preview;
