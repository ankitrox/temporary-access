const DefaultState = {
    current: {
        ID: null,
        user_email: null,
        user_login: '',
        first_name: null,
        last_name: null,
        role: '',
        redirect: '',
        start_date: null,
        end_date: null,
    },
    notifier: {
        type: '',
        message: '',
    },
    users: [],
    context: 'view',
    processing: false
};

export default DefaultState;
