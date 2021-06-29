import name from "../store/name";

const {
    TextControl,
    SelectControl,
    BaseControl,
    Button
} = wp.components;

const { __ } = wp.i18n;

const { withDispatch } = wp.data;

let EditForm = ( props ) => {
    const { saveField, setContext } = props;

    return (
        <>
            <div>
                <BaseControl>
                    <TextControl
                        label={ __( 'Enter Email', 'temporary-access' ) }
                        type={ 'email' }
                        onChange={ (val) => saveField( 'email', val ) }
                    />
                </BaseControl>

                <BaseControl>
                    <TextControl
                        label={ __( 'Enter First Name', 'temporary-access' ) }
                        type={ 'text' }
                        onChange={ (val) => saveField( 'first_name', val ) }
                    />
                </BaseControl>

                <BaseControl>
                    <TextControl
                        label={ __( 'Enter Last Name', 'temporary-access' ) }
                        type={ 'text' }
                        onChange={ (val) => saveField( 'last_name', val ) }
                    />
                </BaseControl>

                <BaseControl>
                    <Button
                        text={ __( 'Close', 'temporary-access' ) }
                        onClick={ () => setContext('view') }
                        isPrimary
                    />
                </BaseControl>
            </div>
        </>
    );
};

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
