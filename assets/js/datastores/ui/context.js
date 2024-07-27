/**
 * Context data store.
 */

import { combineStores } from '../data/utils';

const baseInitialState = {
	context: 'default',
};

const baseActions = {
	/**
	 * Sets the context.
	 *
	 * @param {string} context The context to set.
	 * @return {Object} Redux-style action.
	 */
	setContext(context) {
		return {
			type: 'SET_CONTEXT',
			payload: { context },
		};
	},
};

/**
 * Base reducer for the data store.
 * @param {Object}        state          Current state.
 * @param {Object}        param1         Action object.
 * @param {string}        param1.type    Type of the action.
 * @param {Object|string} param1.payload Payload of the action.
 * @return {Object} New state.
 */
const baseReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_CONTEXT': {
			const { context } = payload;
			return { ...state, context };
		}

		default: {
			return state;
		}
	}
};

const baseSelectors = {
	/**
	 * Retrieves the context from state.
	 *
	 * @param {Object} state State of the data store.
	 * @return {string} Context.
	 */
	getContext(state) {
		return state.context;
	},
};

const store = combineStores({
	initialState: baseInitialState,
	actions: baseActions,
	reducer: baseReducer,
	selectors: baseSelectors,
});

export const initialState = store.initialState;
export const actions = store.actions;
export const controls = store.controls;
export const reducer = store.reducer;
export const resolvers = store.resolvers;
export const selectors = store.selectors;

export default store;
