const { path } = tempAccess;

const actions = {

    /**
     * Set a particular field for user.
     *
     * @param {string} field Field name.
     * @param {Object} data Data to set
     */
    setField( field, data ) {
        return {
            type: 'SET_FIELD',
            field,
            data
        }
    },

    setUsers( users = [] ) {
        return {
            type: 'SET_USERS',
            users
        }
    },

    /**
     * Fetch temp users from API.
     *
     * @param data
     * @return {{data: {}, type: string}}
     */
    fetchUsers( path ) {
        return {
            type: 'FETCH_USERS',
            path
        }
    },

    *getUsers( userId = 0 ) {
        let apiPath = path;

        if ( 0 !== userId ) {
            apiPath = apiPath + userId;
        }

        const users = yield actions.fetchUsers( path );
        return actions.setUsers( users );
    },

    setContext( context = 'view' ) {
        return {
            type: 'SET_CONTEXT',
            context
        }
    },

    setNotifier( { type, message } ) {
        return {
            type: 'SET_NOTIFIER',
            n_type: type,
            message
        }
    },

    setProcessing( processing ) {
        return {
            type: 'SET_PROCESSING',
            processing
        }
    }
};

export default actions;
