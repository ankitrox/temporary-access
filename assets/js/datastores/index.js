/**
 * Main file for exporting the store.
 */

/**
 * WordPress dependencies
 */
import { createReduxStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import users from './users';
import notices from './notices';
import { combineStores } from '../data/utils';
import { STORE_NAME } from './constants';

const store = combineStores(notices, users);

export default createReduxStore(STORE_NAME, store);
