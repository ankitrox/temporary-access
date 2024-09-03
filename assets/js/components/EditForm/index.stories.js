/**
 * EditForm stories.
 */

import WithRegistrySetup from '../../../../tests/js/WithRegistrySetup';
import {
	createTestRegistry,
	WithTestRegistry,
} from '../../../../tests/js/utils/test-utils';
import { UI_STORE_NAME } from '../../datastores/constants';
import EditForm from '.';

function Template({ setupRegistry }) {
	return (
		<WithRegistrySetup func={setupRegistry}>
			<EditForm />
		</WithRegistrySetup>
	);
}

export const Default = Template.bind({});
Default.storyName = 'Add New User';
Default.args = {
	setupRegistry: (registry) => {
		registry.dispatch(UI_STORE_NAME).setStep(0);
		registry.dispatch(UI_STORE_NAME).setContext('edit');
	},
};

export const EditUser = Template.bind({});
EditUser.storyName = 'Edit User';
EditUser.args = {
	setupRegistry: (registry) => {
		registry.dispatch(UI_STORE_NAME).setStep(0);
		registry.dispatch(UI_STORE_NAME).setContext('edit');

		registry.dispatch(UI_STORE_NAME).setData('email', 'test@example.com');
		registry.dispatch(UI_STORE_NAME).setData('name', 'John');
		registry.dispatch(UI_STORE_NAME).setData('surname', 'Doe');
		registry.dispatch(UI_STORE_NAME).setData('role', 'administrator');
		registry.dispatch(UI_STORE_NAME).setData('startDate', '2021-09-01');
		registry.dispatch(UI_STORE_NAME).setData('endDate', '2021-09-10');
	},
};

export default {
	title: 'Components/Form',
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
