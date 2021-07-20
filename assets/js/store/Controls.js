/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Internal dependencies
 */
import name from "./name";

const { lodash } = window;
const { each } = lodash;
const { apiFetch } = wp;
const { __ } = wp.i18n;
const { select, dispatch } = wp.data;

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
  FETCH_USERS(action) {
    const { path } = action;

    return apiFetch({ url: path });
  },
};

export default controls;
