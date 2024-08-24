/**
 * Add New User Component.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { Button, __experimentalSpacer as Spacer } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { UI_STORE_NAME } from '../../datastores/constants';

/**
 * Add New User Component.
 *
 * @return {Object} AddNewUser component.
 */
export default function AddUserCTA() {
	const { setContext } = useDispatch(UI_STORE_NAME);

	return (
		<Fragment>
			<Spacer marginY={5}>
				<Button
					isPressed={false}
					variant="primary"
					onClick={() => setContext('edit')}
				>
					{__('Add New User', 'passwordless-temporary-login')}
				</Button>
			</Spacer>
		</Fragment>
	);
}
