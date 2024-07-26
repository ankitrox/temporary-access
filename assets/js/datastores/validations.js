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

	invariant(userData.user_email, `Email is required.`);

	return true;
};

export const validateUserID = function ({ userId }) {
	invariant(userId, `User ID is required.`);
	invariant(typeof userId === 'number', `User ID must be a number.`);
};
