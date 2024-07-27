/**
 * Row Actions component.
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
import { STORE_NAME } from '../../datastores/constants';

export default function RowActions() {
	const { setContext } = useDispatch(STORE_NAME);

	return (
		<div className="tempuser-actions">
			<Button
				icon="edit"
				title={__('Edit', 'temporary-access')}
				isPressed={false}
				onClick={() => setContext('edit')}
			/>
			<Button
				icon="trash"
				title={__('Delete', 'temporary-access')}
				isPressed={false}
				onClick={() => setContext('delete')}
			/>
		</div>
	);
}
