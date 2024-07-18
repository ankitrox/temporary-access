/**
 * Public API entrypoint.
 */

/**
 * Internal dependencies
 */
import API from './api';

if (global.tempuser === undefined) {
	global.tempuser = {};
}

if (global.tempuser.api === undefined) {
	global.tempuser.api = API;
}

// This is only exported for Jest and is not used in production.
export default API;
