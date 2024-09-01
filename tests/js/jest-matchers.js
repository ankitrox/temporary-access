/**
 * External dependencies
 */
import '@testing-library/jest-dom';

global.tempAccess = {
	roles: {
		administrator: 'Administrator',
		editor: 'Editor',
		contributor: 'Contributor',
		subscriber: 'Subscriber',
	},
	path: '/tempaccess/v1/users/',
};
