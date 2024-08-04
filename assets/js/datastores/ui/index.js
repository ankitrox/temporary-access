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
import editFormStore from './edit-form';
import deleteConfirmationStore from './delete-confirm';

const store = combineStores(
	contextStore,
	editFormStore,
	deleteConfirmationStore
);

export default createReduxStore(UI_STORE_NAME, store);
