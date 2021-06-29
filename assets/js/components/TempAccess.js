import AddNewUser from "./AddNewUser";
import name from "../store/name";
import EditForm from "./EditForm";
import UsersList from "./UsersList";

const { withSelect } = wp.data;

let TempAccess = ( { context } ) => {
    const ContextualComponent = ( 'view' === context ) ? <UsersList /> : <EditForm />;
    return(
        <>
            <AddNewUser />
            { ContextualComponent }
        </>
    );
};

TempAccess = withSelect( ( select ) => {
    return {
      context: select(name).getContext()
    };

})( TempAccess );

export default TempAccess;
