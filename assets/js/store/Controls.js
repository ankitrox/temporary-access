/**
 * Internal dependencies
 */
import name from "./name";

const { lodash } = window;
const { apiFetch } = wp;
const { __ } = wp.i18n;
const { select, dispatch } = wp.data;
const {
    each,
    findIndex,
    filter,
} = lodash;

/**
 * Controls object.
 *
 * @type {{CREATE_USER(): *, FETCH_USERS(*): *}}
 */
const controls = {
  CREATE_USER() {
    let { path } = tempAccess;
    let method = "POST";
    const data = select(name).getCurrentEditData();
    const { ID } = data;

    if ( ID ) {
      method = "PUT";
      path += "/" + ID;
    }

    return apiFetch({
      url: path,
      method: method,
      data: data,
    })
    .then(
        ( user ) => {
            const notice_msg = ID ? __( "User has been updated successfully.", "temporary-access" ) : __( "User has been created successfully.", "temporary-access" );
          dispatch(name).setNotifier(
              {
                type: 'success',
                message: notice_msg,
              }
          );

          if ( ! ID ) {
              dispatch(name).reset();
          }

          each( user, (val, key) => {
              dispatch(name).setField( key, val );
          })

          return user;
        }
    )
    .catch( (e) => {
      dispatch(name).setNotifier(
          {
            type: 'error',
            message: e.message ? e.message : __( "Something went wrong, please try again.", "temporary-access" ),
          }
      );

      return e;
    });
  },

  DELETE_USER( { userId } ) {
      let { path } = tempAccess;
      const Users = select(name).getUsers();

      return apiFetch({
          url: path + "/" + userId,
          method: "DELETE",
      })
      .then( ( response ) => {
          dispatch(name).setNotifier(
              {
                  type: 'success',
                  message: response,
              }
          );

          const UserIndex = findIndex( Users, ( c_user ) => c_user.ID === userId );
          const FilteredList = filter( Users, (user, index) => {
              return UserIndex !== index;
          });

          dispatch(name).setUsers( FilteredList );
      })
      .catch( () => {
          dispatch(name).setNotifier(
              {
                  type: 'error',
                  message: e.message ? e.message : __( "Something went wrong, please try again.", "temporary-access" ),
              }
          );
      });
  },

  FETCH_USERS(action) {
    const { path } = action;

    return apiFetch({ url: path });
  },
};

export default controls;
