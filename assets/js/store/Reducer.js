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

        case 'SET_PROCESSING':
            return {
                ...state,
                processing: action.processing
            }

        case 'SET_NOTIFIER':
            return {
                ...state,
                notifier: {
                    type: action.n_type,
                    message: action.message
                }
            }

        case 'RESET':
            return {
                ...state,
                current: DefaultState.current
            }
    }

    return state;
};

export default reducer;
