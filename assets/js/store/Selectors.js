/**
 * Selector object.
 *
 * @type {Object}
 */
const selectors = {
	getUsers(state) {
		return state.users;
	},

	getState(state) {
		return state;
	},

	getContext(state) {
		return state.context;
	},

	getCurrentEditData(state) {
		return state.current;
	},

	getNotifier(state) {
		return state.notifier;
	},

	isProcessing(state) {
		return state.processing;
	},
};

export default selectors;
