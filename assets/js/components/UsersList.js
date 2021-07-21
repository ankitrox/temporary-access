import name from '../store/name';
import { SetCurrentUserForEdit } from "../../utils";

const { withDispatch, withSelect, dispatch, select } = wp.data;
const { map, isEmpty, findIndex } = window.lodash;
const { sprintf, __ } = wp.i18n;
const { Dashicon } = wp.components;

const UserData = ( { user, onEdit, onDelete } ) => {
    const {
        ID,
        user_email,
        first_name,
        last_name,
        user_login
    } = user;

    return (
        <>
            <div className={ 'temp__user_data' }>
                <div className={ 'temp_user_data_item' }>{ isEmpty( first_name ) && isEmpty( last_name ) ? user_email : sprintf( '%1s %2s (%3s)', first_name, last_name, user_email ) }</div>
                <div className={ 'temp_user_data_item' }>{ user_login }</div>
                <div className={ 'temp_user_data_item' }>
                    <Dashicon
                        icon={'edit'} style={ { cursor: 'pointer' } }
                        onClick={ () => onEdit( ID ) }
                    />
                </div>
                <div className={ 'temp_user_data_item' }>
                    <Dashicon
                        icon={'trash'} style={ { cursor: 'pointer' } }
                        onClick={ () => onDelete( ID ) }
                    />
                </div>
            </div>
        </>
    );
};

let UsersList = ( props ) => {
    const { usersList } = props;
    const Headings = [
        __( 'Name', 'temporary-access' ),
        __( 'Username', 'temporary-access' ),
        __( 'Edit', 'temporary-access' ),
        __( 'Delete', 'temporary-access' ),
    ];

    return (
        <>
            { usersList.length > 0 && (
             <div className={'userslist_wrapper'}>
                 <div className={ 'temp__user_data temp__user_data_headings' }>
                     { map( Headings, (heading) => <div key={heading} className={ 'temp_user_data_item temp_user_item_heading' }>{ sprintf( __( '%s', 'temporary-access' ), heading ) }</div> ) }
                 </div>
                 { map( usersList, ( user ) => {
                     const { ID } = user;
                     return (
                         <UserData key={ID} user={user} {...props} />
                     );
                 })
                 }
             </div>
            )}

            { ! usersList.length && <p className={'tempaccess__no_users'}>{ __( 'No Users Found', 'temporary-access' ) }</p> }
        </>
    );
}

UsersList = withDispatch( (dispatch) => {
    dispatch(name).getUsers();

    return {
        onEdit: ( userId ) => {
            const Users = select(name).getUsers();
            const UserIndex = findIndex( Users, ( c_user ) => c_user.ID === userId );

            if ( -1 < UserIndex ) {
                SetCurrentUserForEdit( Users[ UserIndex ] );
            }
        },
        onDelete: ( userId ) => {
            dispatch(name).deleteUser( userId );
        }
    };
})(UsersList);

UsersList = withSelect( ( select ) => {
    return {
        usersList: select(name).getUsers()
    };
})(UsersList);

export default UsersList;
