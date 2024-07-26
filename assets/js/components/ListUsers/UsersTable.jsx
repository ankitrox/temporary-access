/**
 * Users Data Table Component.
 */

/**
 * Wordpress dependencies.
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { DataGrid } from '@mui/x-data-grid';
import { STORE_NAME } from '../../datastores/constants';
import { ActionItems } from '../utils';

export default function UsersTable() {
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 5,
	});

	const users = useSelect(
		(select) =>
			select(STORE_NAME).getUsers({
				page: 0,
				pageSize: 5,
			}),
		[]
	);

	// Return early if there are no users.
	if (!users) {
		return null;
	}

	const onPaginationModalChange = (newPaginationModel) => {
		setPaginationModel(newPaginationModel);
	};

	// Create columns for data grid.
	const dataColums = [
		{
			field: 'name',
			headerName: __('Name', 'temporary-access'),
			width: 150,
		},
		{
			field: 'username',
			headerName: __('Username', 'temporary-access'),
			width: 150,
		},
		{
			field: 'email',
			headerName: __('Email', 'temporary-access'),
			width: 250,
		},
		{
			field: 'actions',
			headerName: __('Actions', 'temporary-access'),
			renderCell: () => <ActionItems />,
			width: 100,
		},
	];

	// Create rows for data grid.
	const dataRows = users.map((user) => {
		return {
			id: user.ID,
			name: `${user.first_name} ${user.last_name}`.trim(),
			username: user.user_login,
			email: user.user_email,
		};
	});

	return (
		<DataGrid
			autoHeight
			columns={dataColums}
			disableRowSelectionOnClick
			disableColumnSorting
			disableColumnFilter
			disableColumnMenu={true}
			paginationModel={paginationModel}
			pageSizeOptions={[5, 10, 20, 50]}
			onPaginationModelChange={onPaginationModalChange}
			rows={dataRows}
		/>
	);
}
