/**
 * Users Data Table Component.
 */

/**
 * External dependencies.
 */
import { DataGrid } from '@mui/x-data-grid';

/**
 * Wordpress dependencies.
 */
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import ProgressBar from '../ProgressBar';
import { DataColumns, getDataRows } from './TableData';
import { STORE_NAME, UI_STORE_NAME } from '../../datastores/constants';

export default function UsersTable() {
	const { setPageModal, setContext } = useDispatch(UI_STORE_NAME);
	const paginationModel = useSelect((select) =>
		select(UI_STORE_NAME).getPageModal()
	);

	const users = useSelect(
		(select) => select(STORE_NAME).getUsers(paginationModel),
		[paginationModel]
	);

	const totalUsers = useSelect(
		(select) => select(STORE_NAME).getTotalUsers(),
		[]
	);

	const isLoaded = useSelect(
		(select) =>
			select(STORE_NAME).hasFinishedResolution('getUsers', [
				paginationModel,
			]),
		[paginationModel]
	);

	// Display a progress bar while the data is being loaded.
	if (!isLoaded) {
		return <ProgressBar height={200} indeterminate />;
	}

	// Return early if there are no users.
	if (!Array.isArray(users) || users.length === 0) {
		return (
			<div className="no-users-banner">
				<h2>{__('No users found.', 'passwordless-temporary-login')}</h2>
				<p>
					{createInterpolateElement(
						__(
							'<button>Create your first temporary user</button>',
							'passwordless-temporary-login'
						),
						{
							button: (
								<Button
									onClick={() => setContext('edit')}
									variant={'secondary'}
								/>
							),
						}
					)}
				</p>
			</div>
		);
	}

	const onPaginationModalChange = (newPaginationModel) => {
		setPageModal(newPaginationModel);
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
