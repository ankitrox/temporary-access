/**
 * Utilities for the components.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export function ActionItems({ handler = () => {} }) {
	const onClickHandler = (event) => {
		event.preventDefault();
		handler(event);
	};

	const commonProps = {
		isPressed: false,
		onClick: onClickHandler,
	};

	return (
		<div className="tempuser-actions">
			<Button
				icon="edit"
				title={__('Edit', 'passwordless-login')}
				{...commonProps}
			/>
			<Button
				icon="trash"
				title={__('Delete', 'passwordless-login')}
				{...commonProps}
			/>
		</div>
	);
}
