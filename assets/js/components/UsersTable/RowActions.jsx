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
import { STORE_NAME } from '../../datastores/constants';

export default function RowActions({ user }) {
	const { setContext, setNotice } = useDispatch(STORE_NAME);

	// Copy the login link to the clipboard and show a notice.
	const onCopyLink = async (userData) => {
		// eslint-disable-next-line camelcase
		const { _login_url } = userData;
		await navigator.clipboard.writeText(_login_url);
		setNotice({
			code: 'link-copied',
			noticeType: 'success',
			message: __('Link copied to clipboard', 'temporary-access'),
		});
	};

	return (
		<div className="tempuser-actions">
			<Button
				icon="edit"
				title={__('Edit', 'temporary-access')}
				isPressed={false}
				onClick={() => setContext('edit')}
			/>
			<Button
				icon="trash"
				title={__('Delete', 'temporary-access')}
				isPressed={false}
				onClick={() => setContext('delete')}
			/>
			<Button
				icon="email"
				title={__('Email login link', 'temporary-access')}
				isPressed={false}
				onClick={() => {}}
			/>
			<Button
				icon="admin-links"
				title={__('Copy link', 'temporary-access')}
				isPressed={false}
				onClick={() => onCopyLink(user)}
			/>
		</div>
	);
}
