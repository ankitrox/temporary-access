import AddNewUser from './AddNewUser';
import name from '../store/name';
import EditForm from './EditForm';
import UsersTable from '../components/ListUsers/UsersTable';
import Notices from './Notices';

const { withSelect, dispatch } = wp.data;
const { isEmpty } = window.lodash;
const { Notice } = wp.components;

let TempAccess = ({ context = null, notification = null }) => {
	const ContextualComponent =
		'view' === context ? (
			<>
				<Notices />
				<AddNewUser />
				<UsersTable />
			</>
		) : (
			<EditForm />
		);

	const { type, message } = notification;
	return (
		<>
			{!isEmpty(message) && (
				<Notice
					status={type}
					onRemove={() => {
						dispatch(name).setNotifier({ type: '', message: '' });
					}}
				>
					{message}
				</Notice>
			)}

			{ContextualComponent}
		</>
	);
};

TempAccess = withSelect((select) => {
	return {
		context: select(name).getContext(),
		notification: select(name).getNotifier(),
	};
})(TempAccess);

export default TempAccess;
