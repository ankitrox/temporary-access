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
import { STORE_NAME, UI_STORE_NAME } from '../../datastores/constants';
import { useEffect } from '@wordpress/element';

export default function DeleteConfirmation() {
	const dispatch = useDispatch();
	const { resetDeleteConfirmation, setContext } = useDispatch(UI_STORE_NAME);
	const { getUsers, deleteUser, setNotice } = useDispatch(STORE_NAME);
	const user = useSelect((select) => select(UI_STORE_NAME).getUserToDelete());
	const context = useSelect((select) => select(UI_STORE_NAME).getContext());
	const isOpen = context === 'delete';
	const getPageModal = useSelect((select) =>
		select(UI_STORE_NAME).getPageModal()
	);

	const onCloseModal = () => {
		resetDeleteConfirmation();
		setContext('default');
	};

	const onDelete = async () => {
		const { error } = await deleteUser(user?.ID);
		if (!error) {
			dispatch(STORE_NAME).invalidateResolutionForStoreSelector(
				'getUsers'
			);

			setNotice({
				code: 'user_deleted',
				message: __(
					'User deleted successfully',
					'passwordless-temporary-login'
				),
				noticeType: 'success',
			});

			onCloseModal();
			getUsers(getPageModal);
		}
	};

	useEffect(() => {
		if (isOpen) {
			const deleteCancel = document.getElementById(
				'tempaccess-delete-cancel'
			);
			deleteCancel?.focus();
		}
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<Modal
					__experimentalHideHeader={true}
					className="tempaccess-modal-delete-form"
					onRequestClose={onCloseModal}
					shouldCloseOnClickOutside={false}
				>
					<p>
						{__(
							'Are you sure you want to delete the user?',
							'passwordless-temporary-login'
						)}
					</p>
					<Flex>
						<Button
							id="tempaccess-delete-cancel"
							onClick={onCloseModal}
							variant="outlined"
						>
							{__('Cancel', 'passwordless-temporary-login')}
						</Button>

						<Button
							id="tempaccess-delete-confirm"
							variant="outlined"
							color="error"
							onClick={onDelete}
						>
							{__('Delete', 'passwordless-temporary-login')}
						</Button>
					</Flex>
				</Modal>
			)}
		</>
	);
}
