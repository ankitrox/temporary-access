import name from './js/store/name';
import DefaultState from './js/store/DefaultState';

const { dispatch } = wp.data;
const { has, each } = window.lodash;

export const SaveField = (field, val) => {
	const CurrentField = DefaultState.current;

	if (has(CurrentField, field)) {
		dispatch(name).setField(field, val);
	}
};

export const SetCurrentUserForEdit = (user) => {
	each(user, (val, key) => {
		SaveField(key, val);
	});

	dispatch(name).setContext('edit');
};
