/**
 * User badge component.
 * Used to display a user's active status.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { Badge } from '@mui/material';

export default function UserBadge({ user }) {
	const expired = user.expired;

	let badgeColor = 'error';
	let badgeContent = __('Expired', 'passwordless-temporary-login');

	// Active badge if user access is not expired.
	if (!expired) {
		badgeColor = 'success';
		badgeContent = __('Active', 'passwordless-temporary-login');
	}

	return <Badge color={badgeColor} badgeContent={badgeContent} />;
}
