/**
 * Edit Form Data Store.
 */

import { combineStores } from '../../data/utils';

const baseInitialState = {
	step: 0,
	user: null,
};

const baseActions = {
	/**
	 * Sets the step.
	 *
	 * @param {number} step The step to set.
	 * @return {Object} Redux-style action.
	 */
	setStep(step) {
		return {
			type: 'SET_STEP',
			payload: { step },
		};
	},
	/**
	 * Increments the step.
	 *
	 * @return {Object} Redux-style action.
	 */
	incrementStep() {
		return {
			type: 'INCREMENT_STEP',
		};
	},
	/**
	 * Decrements the step.
	 *
	 * @return {Object} Redux-style action.
	 */
	decrementStep() {
		return {
			type: 'DECREMENT_STEP',
		};
	},
	/**
	 * Resets the step.
	 *
	 * @return {Object} Redux-style action.
	 */
	resetStep() {
		return {
			type: 'RESET_STEP',
		};
	},

	setUser(user) {
		return {
			type: 'SET_USER',
			payload: { user },
		};
	},
};

const baseReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_STEP': {
			const { step } = payload;
			return { ...state, step };
		}

		case 'INCREMENT_STEP': {
			return { ...state, step: state.step + 1 };
		}

		case 'DECREMENT_STEP': {
			return { ...state, step: state.step - 1 };
		}

		case 'RESET_STEP': {
			return { ...state, step: 1 };
		}

		case 'SET_USER': {
			return { ...state, user: payload.user };
		}

		default: {
			return state;
		}
	}
};

const baseSelectors = {
	/**
	 * Retrieves the step from state.
	 *
	 * @param {Object} state State of the data store.
	 * @return {number} Step.
	 */
	getCurrentStep(state) {
		return state.step;
	},

	getUser(state) {
		return state.user;
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
