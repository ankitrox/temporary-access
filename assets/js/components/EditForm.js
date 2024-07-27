/**
 * Add/Edit form for the user.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { UI_STORE_NAME } from '../datastores/constants';

export default function EditForm() {
	const { setContext } = useDispatch(UI_STORE_NAME);
	return (
		<div className="tempaccess-edit-form">
			<h2>{__('Edit Form', 'temporary-access')}</h2>
			<Button
				variant="primary"
				onClick={() => {
					setContext('default');
				}}
			>
				{__('Close', 'temporary-access')}
			</Button>
		</div>
	);
}
