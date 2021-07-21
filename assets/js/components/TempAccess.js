import AddNewUser from "./AddNewUser";
import name from "../store/name";
import EditForm from "./EditForm";
import UsersList from "./UsersList";
import {Add} from "../../../../web-stories-wp/assets/src/edit-story/icons";

const { withSelect, dispatch } = wp.data;
const { isEmpty } = window.lodash;
const { Notice } = wp.components;

let TempAccess = ( { context, notification } ) => {
    const ContextualComponent = ( 'view' === context ) ? ( <><AddNewUser /><UsersList /></> ) : <EditForm />;

    const { type, message } = notification;
    return(
        <>
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

            { ContextualComponent }
        </>
    );
};

TempAccess = withSelect( ( select ) => {
    return {
        context: select(name).getContext(),
        notification: select(name).getNotifier(),
    };

})( TempAccess );

export default TempAccess;
