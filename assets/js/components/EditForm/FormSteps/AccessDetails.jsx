/**
 * Step to add user access details.
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalSpacer as Spacer,
	SelectControl,
} from '@wordpress/components';
import { Fragment, useEffect, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import { isValidRole, isValidDate } from '../../../datastores/validations';
import { UI_STORE_NAME } from '../../../datastores/constants';
import Datepicker from '../../Datepicker';

// Build the options for the select control.
const roles = [{ label: __('Select a Role', 'passwordless-login'), value: '' }];
if (Object.keys(tempAccess.roles).length) {
	for (const role in tempAccess.roles) {
		roles.push({ label: tempAccess.roles[role], value: role });
	}
}

export default function AccessDetails() {
	const { clearError, setData, setError, setStepValidationFn } =
		useDispatch(UI_STORE_NAME);

	const role = useSelect((select) => select(UI_STORE_NAME).getData('role'));
	const startDate = useSelect((select) =>
		select(UI_STORE_NAME).getData('startDate')
	);
	const endDate = useSelect((select) =>
		select(UI_STORE_NAME).getData('endDate')
	);

	const fields = useMemo(
		() => ({
			role: {
				validationFn: isValidRole,
				errorMessage: __('Invalid role', 'passwordless-login'),
			},
			startDate: {
				validationFn: isValidDate,
				errorMessage: __('Invalid date', 'passwordless-login'),
			},
			endDate: {
				validationFn: isValidDate,
				errorMessage: __('Invalid date', 'passwordless-login'),
			},
		}),
		[]
	);

	const onChangeField = (field) => {
		return (value) => {
			const fieldValidationFn = fields[field].validationFn;

			if (fieldValidationFn(value)) {
				clearError(`invalid_${field}`);
			}

			console.log('field', field);
			console.log('value', value);

			setData(field, value);
		};
	};

	useEffect(() => {
		const getFieldValue = (fieldName) => {
			switch (fieldName) {
				case 'role':
					return role;
				case 'startDate':
					return startDate;
				case 'endDate':
					return endDate;
			}
		};

		const validateFields = () => {
			let isValid = true;
			for (const field in fields) {
				const fieldValidationFn = fields[field].validationFn;
				const fieldValue = getFieldValue(field);

				if (!fieldValidationFn(fieldValue)) {
					setError(`invalid_${field}`, fields[field].errorMessage);
					isValid = false;
				}
			}

			return isValid;
		};

		setStepValidationFn(validateFields);
	}, [endDate, fields, role, setError, setStepValidationFn, startDate]);

	return (
		<Fragment>
			<BaseControl>
				<SelectControl
					label={__('Role', 'passwordless-login')}
					onChange={onChangeField('role')}
					options={roles}
					value={role}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<Datepicker
					label={__('Start Date', 'passwordless-login')}
					dateValue={startDate}
					onChange={onChangeField('startDate')}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<Datepicker
					label={__('End Date', 'passwordless-login')}
					dateValue={endDate}
					onChange={onChangeField('endDate')}
				/>
			</BaseControl>

			<Spacer marginY={5} />
		</Fragment>
	);
}
