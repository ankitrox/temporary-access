/** @type { import('@storybook/react').Preview } */

// WordPress component styles.
import '../node_modules/@wordpress/components/build-style/style.css';
import '../tests/js/utils/global-setup';
import '../assets/sass/tempaccess.scss';

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

export const decorators = [
	(Story) => (
		<div className="tempaccess-plugin">
			<Story />
		</div>
	),
];

export default preview;
