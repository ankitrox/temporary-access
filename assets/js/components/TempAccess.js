/**
 * Main component for TempAccess UI.
 */

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import AddNewUser from './AddNewUser';
import EditForm from './EditForm';
import Notices from './Notices';
import UsersTable from '../components/ListUsers/UsersTable';
import { UI_STORE_NAME } from '../datastores/constants';

export default function TempAccess() {
	// Get the current context.
	const context = useSelect((select) => select(UI_STORE_NAME).getContext());

	return (
		<div className="tempaccess">
			<Notices />
			{context === 'edit' && <EditForm />}
			{context === 'default' && (
				<Fragment>
					<AddNewUser />
					<UsersTable />
				</Fragment>
			)}
		</div>
	);
}
