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
import name from "../store/name";
import { SaveField } from "../../utils";

const {
  TextControl,
  SelectControl,
  BaseControl,
  Button,
  Spinner,
  Notice,
} = wp.components;

const { roles } = tempAccess;
const { map, isEmpty } = window.lodash;
const { __ } = wp.i18n;
const { withDispatch, withSelect, dispatch } = wp.data;

const getRoles = () => {
  const rolesList = {
    "": __("Select Role", "temporary-access"),
    ...roles,
  };

  return map(rolesList, (value, key) => {
    return {
      label: value,
      value: key,
    };
  });
};

let EditForm = (props) => {
  const {
    setContext,
    currentData,
    processing,
    notification,
    createUser,
  } = props;
  const {
      ID,
    user_email,
    first_name,
    last_name,
    role,
    start_date,
    end_date,
    redirect,
    user_login,
  } = currentData;

  const { type, message } = notification;
  const ButtonLabel = !ID ? __("Create", "temporary-access") : __("Update", "temporary-access");

  return (
    <div className={"tempaccess_editform"}>
      {!isEmpty(message) &&
        <Notice
            status={type}
            onRemove={ () => {
                dispatch(name).setNotifier({ type: '', message:'' });
            }}
        >
            {message}
        </Notice>
      }

      <BaseControl>
        <TextControl
          label={__("Email (Required)", "temporary-access")}
          type={"email"}
          value={user_email}
          onChange={(val) => SaveField("user_email", val)}
        />
      </BaseControl>

      <BaseControl>
        <TextControl
          label={__("Username (Required)", "temporary-access")}
          type={"text"}
          value={user_login}
          onChange={(val) => SaveField("user_login", val)}
        />
      </BaseControl>

      <BaseControl>
        <TextControl
          label={__("First Name", "temporary-access")}
          type={"text"}
          value={first_name}
          onChange={(val) => SaveField("first_name", val)}
        />
      </BaseControl>

      <BaseControl>
        <TextControl
          label={__("Last Name", "temporary-access")}
          type={"text"}
          value={last_name}
          onChange={(val) => SaveField("last_name", val)}
        />
      </BaseControl>

      <BaseControl>
        <SelectControl
          label={__("Role", "temporary-access")}
          value={role}
          options={getRoles()}
          onChange={(role) => SaveField("role", role)}
        />
      </BaseControl>

      <BaseControl>
        <TextControl
          label={__("Start Date and Time", "temporary-access")}
          type={"datetime-local"}
          value={start_date}
          onChange={(val) => SaveField("start_date", val)}
        />
      </BaseControl>

      <BaseControl>
        <TextControl
          label={__("End Date and Time (Required)", "temporary-access")}
          type={"datetime-local"}
          value={end_date}
          onChange={(val) => SaveField("end_date", val)}
        />
      </BaseControl>

      <BaseControl>
        <TextControl
          label={__("Post Login Redirect URL", "temporary-access")}
          type={"url"}
          value={redirect}
          onChange={(val) => SaveField("redirect", val)}
        />
      </BaseControl>

      <BaseControl className={"tempaccess_action_buttons"}>
        <Button
          text={ ButtonLabel }
          onClick={createUser}
          isPrimary
        />

        <Button
          text={__("Close", "temporary-access")}
          onClick={() => {
            dispatch(name).reset();
            setContext("view");
          }}
          isSecondary
        />

        {processing && <Spinner />}
      </BaseControl>
    </div>
  );
};

EditForm = withSelect((select) => {
  return {
    currentData: select(name).getCurrentEditData(),
    processing: select(name).isProcessing(),
    notification: select(name).getNotifier(),
  };
})(EditForm);

EditForm = withDispatch((dispatch) => {
  return {
    setContext: (context = "view") => {
      dispatch(name).setContext(context);
    },
    createUser: () => {
      dispatch(name).generateUser();
    },
  };
})(EditForm);

export default EditForm;
