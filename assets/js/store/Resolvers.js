import actions from './Actions';

const { path } = tempAccess;

const resolvers = {
	*getUsers(userId = 0) {
		let apiPath = path;

		if (0 !== userId) {
			apiPath = apiPath + userId;
		}

		const users = yield actions.fetchUsers(path);
		return actions.setUsers(users);
	},
};

export default resolvers;
