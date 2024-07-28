/**
 * Step to add user access details.
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalSpacer as Spacer,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export function AccessDetails() {
	return (
		<Fragment>
			<BaseControl>
				<SelectControl
					label={__('Role', 'temporary-access')}
					onChange={() => {}}
					options={[
						{
							label: __('Administrator', 'temporary-access'),
							value: 'administrator',
						},
						{
							label: __('Editor', 'temporary-access'),
							value: 'editor',
						},
						{
							label: __('Author', 'temporary-access'),
							value: 'author',
						},
						{
							label: __('Contributor', 'temporary-access'),
							value: 'contributor',
						},
						{
							label: __('Subscriber', 'temporary-access'),
							value: 'subscriber',
						},
					]}
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('Start Date and Time', 'temporary-access')}
					type={'datetime-local'}
					autoComplete="off"
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('End Date and Time', 'temporary-access')}
					type={'datetime-local'}
					autoComplete="off"
				/>
			</BaseControl>

			<Spacer marginY={5} />
		</Fragment>
	);
}
