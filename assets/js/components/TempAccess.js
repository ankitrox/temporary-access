/**
 * Main component for TempAccess UI.
 */

/**
 * WordPress dependencies
 */
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
		<div className="tempaccess">
			<h1>{__('Temporary Access', 'temp-access')}</h1>
			<Notices />
			<Fragment>
				<AddUserCTA />
				<UsersTable />
				<EditForm />
				<DeleteConfirmation />
			</Fragment>
		</div>
	);
}
