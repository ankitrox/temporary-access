import DefaultState from "./DefaultState";

/**
 * Reducer function for store.
 *
 * @param state
 * @param action
 *
 * @return {Object}
 */
const reducer = ( state = DefaultState, action ) => {

    switch ( action.type ) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }

        case 'SET_FIELD':
            return {
                ...state,
                current: {
                    ...state.current,
                    [action.field]: action.data
                }
            }

        case 'SET_CONTEXT':
            return {
                ...state,
                context: action.context
            }
    }

    return state;
};

export default reducer;
