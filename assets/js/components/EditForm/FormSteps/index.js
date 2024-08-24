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
import AccessDetails from './AccessDetails';
import UserDetails from './UserDetails';

const steps = [
	{
		id: 'user-details',
		label: __('User Details', 'passwordless-temporary-login'),
		component: UserDetails,
	},
	{
		id: 'access-details',
		label: __('Access Details', 'passwordless-temporary-login'),
		component: AccessDetails,
	},
];

export default steps;
