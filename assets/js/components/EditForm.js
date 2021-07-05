import name from "../store/name";
import {SaveField} from "../../utils";

const {
    TextControl,
    SelectControl,
    BaseControl,
    Button,
    Spinner
} = wp.components;

const { roles } = tempAccess;
const { map } = window.lodash;
const { __ } = wp.i18n;
const { withDispatch, withSelect, dispatch } = wp.data;

const getRoles = () => {
    return map( roles, ( value, key ) => {
        return {
            label: value,
            value: key
        };
    });
};

let EditForm = ( props ) => {
    const { setContext, currentData, processing } = props;
    const {
        user_email,
        first_name,
        last_name,
        role,
        start_date,
        end_date,
        redirect,
        user_login
    } = currentData;

    return (
        <div className={"tempaccess_editform"}>
            <BaseControl>
                <TextControl
                    label={ __( 'Enter Email (Required)', 'temporary-access' ) }
                    type={ 'email' }
                    value={ user_email }
                    onChange={ (val) => SaveField( 'user_email', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Username (Required)', 'temporary-access' ) }
                    type={ 'text' }
                    value={ user_login }
                    onChange={ (val) => SaveField( 'user_login', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Enter First Name', 'temporary-access' ) }
                    type={ 'text' }
                    value={ first_name }
                    onChange={ (val) => SaveField( 'first_name', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Enter Last Name', 'temporary-access' ) }
                    type={ 'text' }
                    value={ last_name }
                    onChange={ (val) => SaveField( 'last_name', val ) }
                />
            </BaseControl>

            <BaseControl>
                <SelectControl
                    label={ __( 'Select role', 'temporary-access' ) }
                    value={ role }
                    options={ getRoles() }
                    onChange={ ( role ) => SaveField( 'role', role ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Start Date and Time', 'temporary-access' ) }
                    type={ 'datetime-local' }
                    value={ start_date }
                    onChange={ (val) => SaveField( 'start_date', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'End Date and Time (Required)', 'temporary-access' ) }
                    type={ 'datetime-local' }
                    value={ end_date }
                    onChange={ (val) => SaveField( 'end_date', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Post login redirect URL', 'temporary-access' ) }
                    type={ 'url' }
                    value={ redirect }
                    onChange={ (val) => SaveField( 'redirect', val ) }
                />
            </BaseControl>

            <BaseControl className={'tempaccess_action_buttons'}>
                <Button
                    text={ __( 'Create', 'temporary-access' ) }
                    onClick={ () => setContext('edit') }
                    isPrimary
                />

                <Button
                    text={ __( 'Close', 'temporary-access' ) }
                    onClick={ () => {
                        dispatch(name).reset();
                        setContext('view')
                    }}
                    isSecondary
                />

                { processing && <Spinner /> }

            </BaseControl>

        </div>
    );
};

EditForm = withSelect((select) => {
    return {
        currentData: select(name).getCurrentEditData(),
        processing: select(name).isProcessing()
    };
})(EditForm);

EditForm = withDispatch( ( dispatch ) => {
    return {
        setContext: ( context = 'view' ) => {
            dispatch(name).setContext( context )
        }
    }
})(EditForm);

export default EditForm;
