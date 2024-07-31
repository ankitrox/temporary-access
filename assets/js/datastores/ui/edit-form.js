/**
 * Edit Form Data Store.
 * This is the form which is used to add and edit users.
 */

import { combineStores } from '../../data/utils';

const baseInitialState = {
	step: 0,
	user: null,
	errors: [],
	data: {},
	stepValidationFn: () => true,
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

	setStepValidationFn(validationFn) {
		return {
			type: 'SET_STEP_VALIDATION_FN',
			payload: { validationFn },
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

	setError(code, message) {
		return {
			type: 'SET_ERROR',
			payload: { code, message },
		};
	},

	clearError(code) {
		return {
			type: 'CLEAR_ERROR',
			payload: { code },
		};
	},

	clearErrors() {
		return {
			type: 'CLEAR_ERRORS',
		};
	},

	setData(property, data) {
		return {
			type: 'SET_DATA',
			payload: { property, data },
		};
	},

	resetForm() {
		return {
			type: 'RESET_FORM',
		};
	},
};

const baseReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_STEP': {
			const { step } = payload;
			return { ...state, step };
		}

		case 'SET_STEP_VALIDATION_FN': {
			const { validationFn } = payload;
			return { ...state, stepValidationFn: validationFn };
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
			const { user } = payload;
			return { ...state, user: user || null };
		}

		case 'SET_ERROR': {
			const { code, message } = payload;
			const errors = state.errors.filter((error) => error.code !== code);
			return { ...state, errors: [...errors, { code, message }] };
		}

		case 'CLEAR_ERROR': {
			const { code } = payload;
			const errors = state.errors.filter((error) => error.code !== code);
			return { ...state, errors };
		}

		case 'CLEAR_ERRORS': {
			return { ...state, errors: [] };
		}

		case 'SET_DATA': {
			const { property, data } = payload;
			return { ...state, data: { ...state.data, [property]: data } };
		}

		case 'RESET_FORM': {
			return { ...baseInitialState };
		}

		default: {
			return state;
		}
	}
};

const baseSelectors = {
	getCurrentStep(state) {
		return state.step;
	},
	getUser(state) {
		return state.user;
	},
	isUserEdit(state) {
		return !!state.user;
	},
	getErrors(state) {
		return state.errors;
	},
	getData(state, field) {
		return state.data[field];
	},
	getState(state) {
		return state;
	},
	getStepValidationFn(state) {
		return state.stepValidationFn;
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
