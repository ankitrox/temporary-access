/**
 * List users UI data store.
 */

import { combineStores } from '../../data/utils';

const baseInitialState = {
	pageModal: {
		page: 0,
		pageSize: 5,
	},
};

const baseActions = {
	setPageModal(pageModal) {
		return {
			type: 'SET_PAGE_MODAL',
			payload: { pageModal },
		};
	},
};

const baseReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_PAGE_MODAL': {
			const { pageModal } = payload;
			return { ...state, pageModal };
		}

		default: {
			return state;
		}
	}
};

const baseSelectors = {
	getPageModal(state) {
		return state.pageModal;
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

export default store;
