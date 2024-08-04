/**
 * Delete confirmation component.
 */

/**
 * External dependencies
 */
import { Button } from '@mui/material';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Flex, Modal } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { UI_STORE_NAME } from '../../datastores/constants';

export default function DeleteConfirmation() {
	const { resetDeleteConfirmation, setContext } = useDispatch(UI_STORE_NAME);
	const user = useSelect((select) => select(UI_STORE_NAME).getUserToDelete());
	const context = useSelect((select) => select(UI_STORE_NAME).getContext());
	const isOpen = context === 'delete';

	const { deleteUser } = useDispatch(UI_STORE_NAME);

	const onDelete = () => {
		console.log('Deleting user...', user);
	};

	const onCloseModal = () => {
		resetDeleteConfirmation();
		setContext('default');
	};

	return (
		<>
			{isOpen && (
				<Modal
					__experimentalHideHeader={true}
					onRequestClose={onCloseModal}
					className="tempuser-delete-modal"
				>
					<p>
						{__(
							'Are you sure you want to delete the user?',
							'temporary-access'
						)}
					</p>
					<Flex>
						<Button onClick={onCloseModal} variant="outlined">
							{__('Cancel', 'temporary-access')}
						</Button>

						<Button
							variant="outlined"
							color="error"
							onClick={onDelete}
						>
							{__('Delete', 'temporary-access')}
						</Button>
					</Flex>
				</Modal>
			)}
		</>
	);
}
