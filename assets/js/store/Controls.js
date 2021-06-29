const { apiFetch } = wp;

const controls = {
    FETCH_USERS( action ) {
        const { path } = action;

        return apiFetch( { url: path } );
    }
};

export default controls;
