/**
 * Data store: notifications
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import invariant from 'invariant';
import { combineStores } from '../data/utils';

// Allowed notice types.
const allowedNoticeTypes = ['error', 'warning', 'success', 'info'];

const baseInitialState = {
	notices: [],
};

const baseActions = {
	/**
	 * Clear all notices.
	 *
	 * @return {Object} Action object.
	 */
	clearNotices() {
		return {
			type: 'CLEAR_NOTICES',
			payload: {},
		};
	},

	/**
	 * Set a notice.
	 *
	 * @param {Object} args
	 * @param {string} args.code       Code of the notice.
	 * @param {string} args.message    Message of the notice.
	 * @param {string} args.noticeType Type of the notice.
	 * @return {Object} Action object.
	 */
	setNotice({ code, noticeType, message }) {
		invariant(
			allowedNoticeTypes.includes(noticeType),
			__('Invalid notice type.', 'temporary-access')
		);

		return {
			type: 'SET_NOTICE',
			payload: { code, message, noticeType },
		};
	},

	/**
	 * Delete a notice.
	 *
	 * @param {Object} param0
	 * @param {string} param0.code Code of the notice.
	 * @return {Object} Action object.
	 */
	deleteNotice({ code }) {
		return {
			type: 'DELETE_NOTICE',
			payload: { code },
		};
	},
};

/**
 * Reducer for handling notices.
 *
 * @param {Object} state          Data store's state.
 * @param {Object} param1         Action object.
 * @param {string} param1.type    Type of the action.
 * @param {Object} param1.payload Payload of the action.
 * @return  {Object} New state.
 */
const baseReducer = (state, { type, payload }) => {
	switch (type) {
		case 'CLEAR_NOTICES': {
			return {
				...state,
				notices: [],
			};
		}

		case 'DELETE_NOTICE': {
			const { code } = payload;
			const newNotices = state.notices.filter(
				(notice) => notice.code !== code
			);

			return {
				...state,
				notices: newNotices,
			};
		}

		case 'SET_NOTICE': {
			const { code, message, noticeType } = payload;
			const newNotice = { code, message, noticeType };

			// Filter any notice with the same code and for a new list.
			const newNotices = state.notices.filter(
				(notice) => notice.code !== code
			);

			newNotices.push(newNotice);

			return {
				...state,
				notices: newNotices,
			};
		}

		default: {
			return state;
		}
	}
};

const baseSelectors = {
	/**
	 * Retrieves the notices from state.
	 *
	 * @param {Object} state Data store's state.
	 * @return {Array} Array of notices.
	 */
	getNotices(state) {
		return state.notices;
	},

	/**
	 * Retrieves the notice object from state.
	 *
	 * @param {Object} state Data store's state.
	 * @param {string} code  Code of the notice.
	 * @return {Object} Notice object.
	 */
	getNotice(state, code) {
		return state.notices.find((notice) => notice.code === code);
	},
};

const store = combineStores({
	initialState: baseInitialState,
	actions: baseActions,
	controls: {},
	reducer: baseReducer,
	resolvers: {},
	selectors: baseSelectors,
});

export const initialState = store.initialState;
export const actions = store.actions;
export const controls = store.controls;
export const reducer = store.reducer;
export const resolvers = store.resolvers;
export const selectors = store.selectors;

export default store;
