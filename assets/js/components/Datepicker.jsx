/**
 * Datepicker component.
 */

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Dropdown, DateTimePicker } from '@wordpress/components';
import { date } from '@wordpress/date';

export default function Datepicker({
	label,
	dateValue = null,
	onChange = () => {},
}) {
	const currentDate = dateValue ? dateValue : null;

	return (
		<Dropdown
			renderToggle={({ isOpen, onToggle }) => (
				<Fragment>
					<Button
						variant="link"
						onClick={onToggle}
						aria-expanded={isOpen}
					>
						{label}
					</Button>
					<div>
						<small>
							{dateValue &&
								`${date('d.m.Y H:i', currentDate)} - `}
							{__(
								"Corresponds to site's timezone",
								'passwordless-temporary-login'
							)}
						</small>
					</div>
				</Fragment>
			)}
			renderContent={() => (
				<DateTimePicker
					currentDate={currentDate}
					is12Hour={true}
					onChange={onChange}
				/>
			)}
		></Dropdown>
	);
}
