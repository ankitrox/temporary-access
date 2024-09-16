/**
 * Row Actions component.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { tempAccessHooks } from '../../data/utils';
import { STORE_NAME, UI_STORE_NAME } from '../../datastores/constants';

export default function RowActions({ user }) {
	const { setContext, setUser, setUserForDeletion } =
		useDispatch(UI_STORE_NAME);
	const { setNotice } = useDispatch(STORE_NAME);

	// Copy the login link to the clipboard and show a notice.
	const onCopyLink = async (userData) => {
		// eslint-disable-next-line camelcase
		const { _login_url } = userData;
		await navigator.clipboard.writeText(_login_url);
		setNotice({
			code: 'link-copied',
			noticeType: 'success',
			message: __(
				'Link copied to clipboard',
				'passwordless-temporary-login'
			),
		});
	};

	const onEdit = () => {
		setContext('edit');
		setUser(user);
	};

	const onDelete = () => {
		setContext('delete');
		setUserForDeletion(user);
	};

	const actions = tempAccessHooks.applyFilters(
		'tempAccess.rowActions',
		[
			<Button
				icon="edit"
				title={__('Edit', 'passwordless-temporary-login')}
				isPressed={false}
				onClick={onEdit}
				key={'row-action-edit'}
			/>,
			<Button
				icon="trash"
				title={__('Delete', 'passwordless-temporary-login')}
				isPressed={false}
				onClick={onDelete}
				key={'row-action-delete'}
			/>,
			<Button
				icon="admin-links"
				title={__('Copy link', 'passwordless-temporary-login')}
				isPressed={false}
				onClick={() => onCopyLink(user)}
				key={'row-action-copy-link'}
			/>,
		],
		user
	);

	return (
		<div className="tempuser-actions">
			{actions.map((action) => ({ ...action }))}
		</div>
	);
}
