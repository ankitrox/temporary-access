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
	let badgeContent = __('Expired', 'temporary-access-wp');

	// Active badge if user access is not expired.
	if (!expired) {
		badgeColor = 'success';
		badgeContent = __('Active', 'temporary-access-wp');
	}

	return <Badge color={badgeColor} badgeContent={badgeContent} />;
}
