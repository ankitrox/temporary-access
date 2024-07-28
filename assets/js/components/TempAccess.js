/**
 * Main component for TempAccess UI.
 */

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import AddUserCTA from './UsersTable/AddUserCTA';
import EditForm from './EditForm';
import Notices from './Notices';
import UsersTable from './UsersTable';

export default function TempAccess() {
	return (
		<div className="tempaccess">
			<Notices />
			<Fragment>
				<AddUserCTA />
				<UsersTable />
				<EditForm />
			</Fragment>
		</div>
	);
}
