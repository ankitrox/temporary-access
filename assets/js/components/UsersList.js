import name from '../store/name';

const { withDispatch, withSelect, dispatch } = wp.data;
const { map, isEmpty } = window.lodash;
const { sprintf } = wp.i18n;
const {
    Spacer
} = wp.components;

const UserData = ( { user } ) => {
    const {
        email,
        first_name,
        last_name,
        user_login
    } = user;

    return (
        <>
            <div className={ 'temp__user_data' }>
                <span className={ 'temp__name' }>{ isEmpty( first_name ) && isEmpty( last_name ) ? email : sprintf( '%1s %2s (%3s)', first_name, last_name, email ) }</span>
                <span className={ 'temp__user__login' }>{ user_login }</span>

            </div>
        </>
    );
};

let UsersList = ( props ) => {
    const { usersList } = props;

    return (
        <>
            { usersList.length && (
             <div className={'userslist_wrapper'}>
                 { map( usersList, ( user ) => <UserData user={ user } /> ) }
             </div>
            )}
        </>
    );
}

UsersList = withDispatch( (dispatch) => {
    return {
        users: dispatch(name).getUsers()
    };
})(UsersList);

UsersList = withSelect( (select) => {
    return {
        usersList: select(name).getUsers()
    };
})(UsersList);

export default UsersList;
