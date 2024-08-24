/**
 * Columns for the list of users.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import UserBadge from './UserBadge';
import RowActions from './RowActions';

const commonProps = {
	align: 'center',
	headerAlign: 'center',
};

export const DataColumns = [
	{
		field: 'name',
		headerName: __('Name', 'passwordless-temporary-login'),
		width: 300,
	},
	{
		field: 'username',
		headerName: __('Username', 'passwordless-temporary-login'),
		width: 200,
	},
	{
		field: 'email',
		headerName: __('Email', 'passwordless-temporary-login'),
		width: 250,
	},
	{
		field: 'last_access',
		headerName: __('Last access', 'passwordless-temporary-login'),
		width: 250,
	},
	{
		field: 'status',
		headerName: __('Status', 'passwordless-temporary-login'),
		renderCell: ({ row }) => <UserBadge user={row} />,
		width: 120,
	},
	{
		field: 'actions',
		headerName: __('Actions', 'passwordless-temporary-login'),
		renderCell: ({ row }) => <RowActions user={row} />,
		width: 200,
	},
].map((column) => ({ ...column, ...commonProps }));

export function getDataRows(users) {
	return users.map((user) => {
		return {
			...user,
			id: user.ID,
			name: `${user.first_name} ${user.last_name}`.trim(),
			username: user.user_login,
			email: user.user_email,
			last_access: user.last_login,
			key: user.ID,
		};
	});
}
