/**
 * Steps for edit form.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { AccessDetails } from './AccessDetails';
import UserDetails from './UserDetails';

const steps = [
	{
		id: 'user-details',
		label: __('User Details', 'temporary-access'),
		component: UserDetails,
	},
	{
		id: 'access-details',
		label: __('Access Details', 'temporary-access'),
		component: AccessDetails,
	},
];

export default steps;
