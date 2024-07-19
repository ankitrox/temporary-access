/**
 * `modules/reader-revenue-manager` data store: publications.
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
	reducerCallback: (state, users) => ({ ...state, users }),
});

const fetchCreateUser = createFetchStore({
	baseName: 'createUser',
	controlCallback: (userData) =>
		API.set({
			bodyParams: userData,
		}),
	reducerCallback: (state, user) => {
		return { ...state.users, user };
	},
	validateParams: validateUserCreationParams,
});

const baseActions = {
	/**
	 * Generator action to retrieve users.
	 * @return {Array} Array of users objects.
	 */
	*getUsers() {
		const { users } = yield fetchGetUsers.actions.fetchGetUsers();
		return users;
	},

	*createUser(userData) {
		const user = yield fetchCreateUser.actions.fetchCreateUser(userData);
		return user;
	},
};

const baseReducer = (state, { type }) => {
	switch (type) {
		default: {
			return state;
		}
	}
};

const store = combineStores(fetchGetUsers, fetchCreateUser, {
	initialState: {},
	actions: baseActions,
	controls: {},
	reducer: baseReducer,
	resolvers: {},
	selectors: {},
});

export const initialState = store.initialState;
export const actions = store.actions;
export const controls = store.controls;
export const reducer = store.reducer;
export const resolvers = store.resolvers;
export const selectors = store.selectors;

export default store;
