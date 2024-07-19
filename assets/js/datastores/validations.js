/**
 * Validations for the datastores.
 */

/**
 * External dependencies.
 */
import invariant from 'invariant';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

const { isPlainObject } = lodash;

export const validateUserCreationParams = function (userData) {
	invariant(
		isPlainObject(userData),
		__('Params must be an object', 'temporary-access')
	);

	invariant(userData.email, `Email is required.`);
};
