/**
 * Data store: users
 */

/**
 * Internal dependencies
 */
import API from '../tempuser-api';
import { createFetchStore } from '../data/create-fetch-store';
import { combineStores, passthroughReducer } from '../data/utils';
import { validateUserCreationParams, validateUserID } from './validations';
import { stringifyObject } from '../utils/stringify';
import invariant from 'invariant';

const { isPlainObject } = lodash;

const fetchGetUsers = createFetchStore({
	baseName: 'getUsers',
	controlCallback: (params) => {
		const { page, pageSize } = params;
		return API.get({
			queryParams: {
				page: page + 1, // API is 1-based.
				per_page: pageSize,
			},
		});
	},
	reducerCallback: (state, users, params) => {
		const hash = stringifyObject(params);
		return {
			...state,
			users: {
				...state.users,
				[hash]: users,
			},
		};
	},
	validateParams: (params) => {
		invariant(isPlainObject(params), 'params is required.');
		invariant(params.page !== undefined, 'page is required.');
		invariant(typeof params.page === 'number', 'page should be number.');
	},
	argsToParams: (params) => params,
});

const fetchCreateUser = createFetchStore({
	baseName: 'createUser',
	controlCallback: (userData) => API.set(userData),
	reducerCallback: (state, user) => {
		return { ...state, users: [...state.users, user] };
	},
	validateParams: validateUserCreationParams,
	argsToParams: (data) => {
		return {
			user_email: data?.user_email,
		};
	},
});

const fetchDeleteUser = createFetchStore({
	baseName: 'deleteUser',
	controlCallback: (userData) => {
		const options = { method: 'DELETE', path: userData.userId };
		return API.remove({}, options);
	},
	reducerCallback: (state, userID) => {
		const users = state.users.filter((u) => u.ID !== userID);
		return { ...state, users };
	},
	validateParams: validateUserID,
	argsToParams: (params) => {
		return { userId: params?.userId };
	},
});

/**
 * Initial state for the store.
 */
const baseInitialState = {
	users: [],
};

const baseActions = {
	/**
	 * Generator action to create a user.
	 * @param {Object} userData
	 * @param {string} userData.user_email User email.
	 * @return {Object} User object.
	 */
	*createUser(userData) {
		yield fetchCreateUser.actions.fetchCreateUser(userData);
	},

	/**
	 * Generator action to delete a user.
	 * @param {number} userId User ID to delete.
	 */
	*deleteUser(userId) {
		yield fetchDeleteUser.actions.fetchDeleteUser({ userId });
	},
};

const baseResolvers = {
	*getUsers(args) {
		yield fetchGetUsers.actions.fetchGetUsers(args);
	},
};

const baseSelectors = {
	/**
	 * Get the state.
	 * @param {Object} state State of the data store.
	 * @return {Object} State of the data store.
	 */
	getState(state) {
		return state;
	},

	/**
	 * Get users.
	 * @param {Object} state State of the data store.
	 * @param {Object} args  Arguments for the selector.
	 * @return {Array} Users.
	 */
	getUsers(state, args = {}) {
		const hash = stringifyObject(args);

		return state.users[hash];
	},
};

const store = combineStores(fetchGetUsers, fetchCreateUser, fetchDeleteUser, {
	initialState: baseInitialState,
	actions: baseActions,
	controls: {},
	reducer: passthroughReducer,
	resolvers: baseResolvers,
	selectors: baseSelectors,
});

export const initialState = store.initialState;
export const actions = store.actions;
export const controls = store.controls;
export const reducer = store.reducer;
export const resolvers = store.resolvers;
export const selectors = store.selectors;

export default store;
