/**
 * Delete confirmation UI data store.
 */

import { combineStores } from '../../data/utils';

const baseInitialState = {
	userData: undefined,
};

const baseActions = {
	setUserForDeletion(userData) {
		return {
			type: 'SET_USER_FOR_DELETION',
			payload: { userData },
		};
	},

	resetDeleteConfirmation() {
		return {
			type: 'RESET_DELETE_CONFIRMATION',
		};
	},
};

const baseReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_USER_FOR_DELETION': {
			const { userData } = payload;
			return { ...state, userData };
		}

		case 'RESET_DELETE_CONFIRMATION': {
			return { ...state, ...baseInitialState };
		}

		default: {
			return state;
		}
	}
};

const baseSelectors = {
	getUserToDelete(state) {
		return state.userData;
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
