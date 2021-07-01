const DefaultState = {
    current: {
        ID: null,
        user_email: null,
        user_login: '',
        first_name: null,
        last_name: null,
        role: '',
        redirect: '',
        start_time: null,
        end_time: null,
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
