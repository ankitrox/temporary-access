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
import { Fragment } from '@wordpress/element';

export default function UserDetails() {
	return (
		<Fragment>
			<BaseControl>
				<TextControl
					label={__('Email (Required)', 'temporary-access')}
					type={'email'}
					autoComplete="off"
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('First Name', 'temporary-access')}
					type={'text'}
					autoComplete="off"
				/>
			</BaseControl>

			<Spacer marginY={5} />

			<BaseControl>
				<TextControl
					label={__('Last Name', 'temporary-access')}
					type={'text'}
					autoComplete="off"
				/>
			</BaseControl>

			<Spacer marginY={5} />
		</Fragment>
	);
}
