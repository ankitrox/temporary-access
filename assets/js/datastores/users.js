/**
 * Data store: users
 */

/**
 * Internal dependencies
 */
import API from '../tempuser-api';
import { createFetchStore } from '../data/create-fetch-store';
import { combineStores } from '../data/utils';
import { validateUserCreationParams } from './validations';

const fetchGetUsers = createFetchStore({
	baseName: 'getUsers',
	controlCallback: () =>
		API.get({
			queryParams: {
				page: 1,
			},
		}),
	reducerCallback: (state, users) => {
		return { ...state, users };
	},
});

const fetchCreateUser = createFetchStore({
	baseName: 'createUser',
	controlCallback: (userData) => API.set(userData),
	reducerCallback: (state, user) => {
		return { ...state, users: [...state.users, user] };
	},
	validateParams: validateUserCreationParams,
	argsToParams: (data) => ({
		user_email: data.user_email,
	}),
});

const baseInitialState = {
	users: [],
};

const baseActions = {
	/**
	 * Generator action to retrieve users.
	 * @return {Array} Array of users objects.
	 */
	*getUsers() {
		yield fetchGetUsers.actions.fetchGetUsers();
	},

	*createUser(userData) {
		yield fetchCreateUser.actions.fetchCreateUser(userData);
	},
};

const baseReducer = (state, { type }) => {
	switch (type) {
		default: {
			return state;
		}
	}
};

const baseSelectors = {
	getState(state) {
		return state;
	},
};

const store = combineStores(fetchGetUsers, fetchCreateUser, {
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
