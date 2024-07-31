/**
 * Step to add user details.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalSpacer as Spacer,
	TextControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { isValidName, isValidEmail } from '../../../datastores/validations';

/**
 * Internal dependencies
 */
import { UI_STORE_NAME } from '../../../datastores/constants';

export default function UserDetails() {
	const { clearError, setData, setError, setStepValidationFn } =
		useDispatch(UI_STORE_NAME);

	const email = useSelect((select) => select(UI_STORE_NAME).getData('email'));
	const name = useSelect((select) => select(UI_STORE_NAME).getData('name'));
	const surname = useSelect((select) =>
		select(UI_STORE_NAME).getData('surname')
	);

	const getFieldValue = (fieldName) => {
		switch (fieldName) {
			case 'email':
				return email;
			case 'name':
				return name;
			case 'surname':
				return surname;
			default:
				return '';
		}
	};

	const fields = {
		email: {
			validationFn: isValidEmail,
			errorMessage: __('Invalid email', 'temporary-access'),
		},
		name: {
			validationFn: isValidName,
			errorMessage: __('Invalid first name', 'temporary-access'),
		},
		surname: {
			validationFn: isValidName,
			errorMessage: __('Invalid last name', 'temporary-access'),
		},
	};

	const onChangeField = (field) => {
		return (value) => {
			const fieldValidationFn = fields[field].validationFn;

			if (fieldValidationFn(value)) {
				clearError(`invalid_${field}`);
			}

			setData(field, value);
		};
	};

	useEffect(() => {
		const validateFields = () => {
			let isValid = true;

			for (const field in fields) {
				const { validationFn, errorMessage } = fields[field];
				const value = getFieldValue(field);

				if (!validationFn(value)) {
					setError(`invalid_${field}`, errorMessage);
					isValid = false;
				}
			}

			return isValid;
		};

		setStepValidationFn(validateFields);
	}, [
		email,
		fields,
		getFieldValue,
		name,
		setError,
		setStepValidationFn,
		surname,
	]);

	return (
		<Fragment>
			<BaseControl>
				<TextControl
					label={__('Email', 'temporary-access')}
					type={'email'}
					autoComplete="off"
					onChange={onChangeField(
						'email',
						isValidEmail,
						__('Invalid email', 'temporary-access')
					)}
					value={email ?? ''}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('First Name', 'temporary-access')}
					type={'text'}
					autoComplete="off"
					onChange={onChangeField(
						'name',
						isValidName,
						__('Invalid first name', 'temporary-access')
					)}
					value={name ?? ''}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('Last Name', 'temporary-access')}
					type={'text'}
					autoComplete="off"
					onChange={onChangeField(
						'surname',
						isValidName,
						__('Invalid last name', 'temporary-access')
					)}
					value={surname ?? ''}
				/>
			</BaseControl>

			<Spacer marginY={5} />
		</Fragment>
	);
}
