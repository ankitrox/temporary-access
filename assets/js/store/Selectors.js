/**
 * Selector object.
 *
 * @type {Object}
 */
const selectors = {

    getUsers( state ) {

        return state.users;
    },

    getState( state ) {
        return state;
    },

    getContext( state ) {
        return state.context;
    }
};

export default selectors;
