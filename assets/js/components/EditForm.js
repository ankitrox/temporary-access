import name from "../store/name";

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
const { withDispatch, withSelect } = wp.data;

const getRoles = () => {
    return map( roles, ( value, key ) => {
        return {
            label: value,
            value: key
        };
    });
};

let EditForm = ( props ) => {
    const { saveField, setContext, currentData, processing } = props;
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
                    label={ __( 'Enter Email', 'temporary-access' ) }
                    type={ 'email' }
                    value={ user_email }
                    onChange={ (val) => saveField( 'email', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Username', 'temporary-access' ) }
                    type={ 'text' }
                    value={ user_login }
                    onChange={ (val) => saveField( 'user_login', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Enter First Name', 'temporary-access' ) }
                    type={ 'text' }
                    value={ first_name }
                    onChange={ (val) => saveField( 'first_name', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Enter Last Name', 'temporary-access' ) }
                    type={ 'text' }
                    value={ last_name }
                    onChange={ (val) => saveField( 'last_name', val ) }
                />
            </BaseControl>

            <BaseControl>
                <SelectControl
                    label={ __( 'Select role', 'temporary-access' ) }
                    value={ role }
                    options={ getRoles() }
                    onChange={ ( role ) => saveField( 'role', role ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Start Date and Time (Optional)', 'temporary-access' ) }
                    type={ 'datetime-local' }
                    value={ start_date }
                    onChange={ (val) => saveField( 'start_date', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'End Date and Time (Required)', 'temporary-access' ) }
                    type={ 'datetime-local' }
                    value={ end_date }
                    onChange={ (val) => saveField( 'start_date', val ) }
                />
            </BaseControl>

            <BaseControl>
                <TextControl
                    label={ __( 'Post login redirect URL', 'temporary-access' ) }
                    type={ 'url' }
                    value={ redirect }
                    onChange={ (val) => saveField( 'redirect', val ) }
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
                    onClick={ () => setContext('view') }
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
        saveField: ( field, val ) => {
            dispatch(name).setField( field, val )
        },
        setContext: ( context = 'view' ) => {
            dispatch(name).setContext( context )
        }
    }
})(EditForm);

export default EditForm;
