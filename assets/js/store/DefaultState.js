const DefaultState = {
    current: {
        ID: null,
        user_email: '',
        user_login: '',
        first_name: '',
        last_name: '',
        role: '',
        redirect: '',
        start_date: '',
        end_date: '',
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
