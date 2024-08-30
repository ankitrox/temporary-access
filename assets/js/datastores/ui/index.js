/**
 * Main file for exporting the UI store.
 */

/**
 * WordPress dependencies
 */
import { createReduxStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { UI_STORE_NAME } from '../constants';
import { combineStores } from '../../data/utils';

/**
 * Internal dependencies
 */
import contextStore from './context';
import deleteUserStore from './delete';
import editUserStore from './edit';
import listUsersStore from './list';

export const store = combineStores(
	contextStore,
	editUserStore,
	deleteUserStore,
	listUsersStore
);

export default createReduxStore(UI_STORE_NAME, store);
