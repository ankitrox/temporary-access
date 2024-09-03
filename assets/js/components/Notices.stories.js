/**
 * Notice Component Story.
 */

import WithRegistrySetup from '../../../tests/js/WithRegistrySetup';
import {
	createTestRegistry,
	WithTestRegistry,
} from '../../../tests/js/utils/test-utils';
import { STORE_NAME } from '../datastores/constants';
import Notices from './Notices';

function Template({ setupRegistry }) {
	return (
		<WithRegistrySetup func={setupRegistry}>
			<Notices />
		</WithRegistrySetup>
	);
}

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
	setupRegistry: (registry) => {
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice',
			message: 'This is the example notice',
			noticeType: 'success',
		});
	},
};

export const Error = Template.bind({});
Error.storyName = 'Error';
Error.args = {
	setupRegistry: (registry) => {
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice',
			message: 'This is the error notice',
			noticeType: 'error',
		});
	},
};

export const Warning = Template.bind({});
Warning.storyName = 'Warning';
Warning.args = {
	setupRegistry: (registry) => {
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice',
			message: 'This is the warning notice',
			noticeType: 'warning',
		});
	},
};

export const Info = Template.bind({});
Info.storyName = 'Info';
Info.args = {
	setupRegistry: (registry) => {
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice',
			message: 'This is the information notice',
			noticeType: 'info',
		});
	},
};

// Multiple notices.
export const Multiple = Template.bind({});
Multiple.storyName = 'Multiple';
Multiple.args = {
	setupRegistry: (registry) => {
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice-1',
			message: 'This is the error notice',
			noticeType: 'error',
		});
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice-2',
			message: 'This is the warning notice',
			noticeType: 'warning',
		});
		registry.dispatch(STORE_NAME).setNotice({
			code: 'test-notice-3',
			message: 'This is the information notice',
			noticeType: 'info',
		});
	},
};

export default {
	title: 'Components/Notices',
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
