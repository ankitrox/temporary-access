/**
 * Main component for TempAccess UI.
 */

/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AddUserCTA from './UsersTable/AddUserCTA';
import EditForm from './EditForm';
import Notices from './Notices';
import UsersTable from './UsersTable';
import DeleteConfirmation from './DeleteConfirmation';

export default function TempAccess() {
	return (
		<TabPanel
			className="tempaccess-tab-panel"
			tabs={[
				{
					name: 'users',
					title: __('Users', 'passwordless-temporary-login'),
					className: 'passwordless-temporary-login-users-tab',
				},
				{
					name: 'settings',
					title: __('Settings', 'passwordless-temporary-login'),
					className: 'passwordless-temporary-login-settings-tab',
				},
			]}
		>
			{(tab) => {
				switch (tab.name) {
					case 'users':
						return (
							<Fragment>
								<Notices />
								<AddUserCTA />
								<UsersTable />
								<EditForm />
								<DeleteConfirmation />
							</Fragment>
						);
					case 'settings':
						return (
							<Fragment>
								<EditForm />
							</Fragment>
						);
				}
			}}
		</TabPanel>
	);
}
