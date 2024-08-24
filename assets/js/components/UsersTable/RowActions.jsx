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
			message: __('Link copied to clipboard', 'temporary-access-wp'),
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

	return (
		<div className="tempuser-actions">
			<Button
				icon="edit"
				title={__('Edit', 'temporary-access-wp')}
				isPressed={false}
				onClick={onEdit}
			/>
			<Button
				icon="trash"
				title={__('Delete', 'temporary-access-wp')}
				isPressed={false}
				onClick={onDelete}
			/>
			<Button
				icon="admin-links"
				title={__('Copy link', 'temporary-access-wp')}
				isPressed={false}
				onClick={() => onCopyLink(user)}
			/>
		</div>
	);
}
