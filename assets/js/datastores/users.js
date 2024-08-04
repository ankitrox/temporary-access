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
	reducerCallback: (state, { users, total }, params) => {
		const hash = stringifyObject(params);
		return {
			...state,
			users: {
				...state.users,
				[hash]: users,
			},
			total,
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
	controlCallback: (userData) => {
		const path = userData.ID ? userData.ID.toString() : '';
		return API.set(userData, { path });
	},
	reducerCallback: (state) => state,
	validateParams: validateUserCreationParams,
	argsToParams: (data) => {
		return {
			ID: data?.ID,
			user_email: data?.user_email,
			first_name: data?.first_name,
			last_name: data?.last_name,
			role: data?.role,
			start_date: data?.start_date,
			end_date: data?.end_date,
		};
	},
});

const fetchDeleteUser = createFetchStore({
	baseName: 'deleteUser',
	controlCallback: (userData) => {
		const options = { method: 'DELETE', path: userData.userId };
		return API.remove({}, options);
	},
	reducerCallback: (state) => state,
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
	total: 0,
};

const baseActions = {
	/**
	 * Generator action to create a user.
	 * @param {Object} userData
	 * @param {string} userData.user_email User email.
	 * @return {Object} User object.
	 */
	*createUser(userData) {
		const { response, error } =
			yield fetchCreateUser.actions.fetchCreateUser(userData);
		return { response, error };
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

	getTotalUsers(state) {
		return state.total;
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
