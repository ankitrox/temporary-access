/**
 * Validations for the datastores.
 */

/**
 * External dependencies.
 */
import invariant from 'invariant';
import { isPlainObject } from 'lodash';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

export const validateUserCreationParams = function (userData) {
	invariant(
		isPlainObject(userData),
		__('Params must be an object', 'passwordless-temporary-login')
	);

	invariant(userData.user_email, `Email is required.`);

	return true;
};

export const validateUserID = function ({ userId }) {
	invariant(userId, `User ID is required.`);
	invariant(typeof userId === 'number', `User ID must be a number.`);
};

export const isValidName = (name) =>
	typeof name === 'string' &&
	/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name);

export const isValidEmail = (email) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
};

export const isValidRole = (role) => {
	const availableRoles = Object.keys(tempAccess.roles);
	return typeof role === 'string' && availableRoles.includes(role);
};

export const isValidDate = (date) => {
	const timestamp = new Date(date).getTime();
	return !isNaN(timestamp);
};
