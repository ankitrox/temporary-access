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
	TextControl,
} from '@wordpress/components';
import { Fragment, useCallback, useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import { UI_STORE_NAME } from '../../../datastores/constants';

// Build the options for the select control.
const roles = [{ label: __('Select a Role', 'temporary-access'), value: '' }];
if (Object.keys(tempAccess.roles).length) {
	for (const role in tempAccess.roles) {
		roles.push({ label: tempAccess.roles[role], value: role });
	}
}

export default function AccessDetails() {
	const { setData, setError } = useDispatch(UI_STORE_NAME);
	const availableRoles = Object.keys(tempAccess.roles);

	const onDateChange = useCallback(
		(field, value) => {
			try {
				if (!value || value === '') {
					throw new Error(
						__(
							'Please select start date and end date.',
							'temporary-access'
						)
					);
				}

				const timestamp = new Date(value).getTime();
				setData(field, timestamp);
			} catch (error) {
				setError(
					`invalid_${field}`,
					error.message || __('Invalid date', 'temporary-access')
				);
			}
		},
		[setData, setError]
	);

	const onRoleChange = useCallback(
		(field, value) => {
			try {
				if (availableRoles.includes(value)) {
					setData(field, value);
					return;
				}

				throw new Error(__('Invalid role', 'temporary-access'));
			} catch (error) {
				setError(
					`invalid_${field}`,
					error.message || __('Invalid role', 'temporary-access')
				);
			}
		},
		[setData, setError]
	);

	return (
		<Fragment>
			<BaseControl>
				<SelectControl
					label={__('Role', 'temporary-access')}
					onChange={(value) => {
						onRoleChange('role', value);
					}}
					options={roles}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('Start Date and Time', 'temporary-access')}
					type={'datetime-local'}
					autoComplete="off"
					onChange={(value) => {
						onDateChange('startDate', value);
					}}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('End Date and Time', 'temporary-access')}
					type={'datetime-local'}
					autoComplete="off"
					onChange={(value) => {
						onDateChange('endDate', value);
					}}
				/>
			</BaseControl>

			<Spacer marginY={5} />
		</Fragment>
	);
}
