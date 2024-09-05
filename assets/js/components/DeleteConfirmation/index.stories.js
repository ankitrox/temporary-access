/**
 * DeleteConfirmation story.
 */

import WithRegistrySetup from '../../../../tests/js/WithRegistrySetup';
import {
	createTestRegistry,
	WithTestRegistry,
} from '../../../../tests/js/utils/test-utils';
import DeleteConfirmation from '.';
import { UI_STORE_NAME } from '../../datastores/constants';

function Template({ setupRegistry = () => {} }) {
	return (
		<WithRegistrySetup func={setupRegistry}>
			<DeleteConfirmation />
		</WithRegistrySetup>
	);
}

export const Default = Template.bind({});
Default.storyName = 'Delete confirmation';
Default.args = {
	setupRegistry: (registry) => {
		registry.dispatch(UI_STORE_NAME).setContext('delete');
	},
};

export default {
	title: 'Components/DeleteConfirmation',
	decorators: [
		(Story) => {
			const registry = createTestRegistry();

			return (
				<WithTestRegistry registry={registry}>
					<Story />
				</WithTestRegistry>
			);
		},
	],
};
