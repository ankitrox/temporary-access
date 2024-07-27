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
import context from './context';

const store = combineStores(context);

export default createReduxStore(UI_STORE_NAME, store);
