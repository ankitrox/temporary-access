/**
 * Users Data Table Component.
 */

/**
 * Wordpress dependencies.
 */
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { DataColumns, getDataRows } from './TableData';
import { DataGrid } from '@mui/x-data-grid';
import { STORE_NAME } from '../../datastores/constants';

export default function UsersTable() {
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 5,
	});

	const users = useSelect(
		(select) => select(STORE_NAME).getUsers(paginationModel),
		[paginationModel]
	);

	const totalUsers = useSelect(
		(select) => select(STORE_NAME).getTotalUsers(),
		[]
	);

	// Return early if there are no users.
	if (!users || !Array.isArray(users) || users.length === 0) {
		return null;
	}

	const onPaginationModalChange = (newPaginationModel) => {
		setPaginationModel(newPaginationModel);
	};

	return (
		<DataGrid
			autoHeight
			columns={DataColumns}
			disableRowSelectionOnClick
			disableColumnSorting
			disableColumnFilter
			disableColumnMenu={true}
			headerAlign="center"
			paginationMode="server"
			paginationModel={paginationModel}
			pageSizeOptions={[5, 10, 20, 50]}
			sx={{
				'&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
					outline: 'none',
				},
			}}
			onPaginationModelChange={onPaginationModalChange}
			rows={getDataRows(users)}
			rowCount={totalUsers}
		/>
	);
}
