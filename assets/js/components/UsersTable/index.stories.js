/**
 * EditForm stories.
 */

import WithRegistrySetup from '../../../../tests/js/WithRegistrySetup';
import {
	createTestRegistry,
	WithTestRegistry,
} from '../../../../tests/js/utils/test-utils';
import { STORE_NAME, UI_STORE_NAME } from '../../datastores/constants';
import { users, users as usersData } from '../../../../tests/js/__fixtures__';
import UsersTable from '.';

function Template({ setupRegistry }) {
	return (
		<WithRegistrySetup func={setupRegistry}>
			<UsersTable />
		</WithRegistrySetup>
	);
}

export const Default = Template.bind({});
Default.storyName = 'UsersTable';
Default.args = {
	setupRegistry: (registry) => {
		const perPage = [5, 10, 20, 50];
		const pageNum = Array.from({ length: 5 }, (_, i) => i + 1);
		const combinations = perPage.flatMap((d) =>
			pageNum.map((v) => {
				return { page: v, perPage: d };
			})
		);

		combinations.forEach((c) => {
			registry.dispatch(STORE_NAME).receiveGetUsers(
				{
					...usersData,
					users: usersData.users.slice(
						c.page * c.perPage - c.perPage,
						c.page * c.perPage
					),
				},
				{
					page: c.page - 1,
					pageSize: c.perPage,
				}
			);
		});
	},
};

export const NoUsers = Template.bind({});
NoUsers.storyName = 'NoUsers';
NoUsers.args = {
	setupRegistry: (registry) => {
		registry.dispatch(STORE_NAME).receiveGetUsers(
			{
				users: [],
				totalUsers: 0,
			},
			{
				page: 1,
				pageSize: 5,
			}
		);
	},
};

export default {
	title: 'Components/UsersTable',
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
