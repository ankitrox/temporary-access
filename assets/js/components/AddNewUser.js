import name from "../store/name";

const { Button } = wp.components;
const { __ } = wp.i18n;
const { withDispatch } = wp.data;

let AddNewUser = ( props ) => {
    const { onclick } = props;
    return(
        <>
            <Button
                text={ __( 'Add New User', 'temporary-access' ) }
                isSecondary
                onClick={ onclick }
            />
        </>
    );
};

AddNewUser = withDispatch((dispatch, ownProps) => {
    return {
        onclick: () => {
            dispatch(name).setContext('edit');
        }
    }
})(AddNewUser);

export default AddNewUser;
