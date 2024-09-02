/**
 * WithRegistrySetup component.
 */

/**
 * External dependencies
 */
import { useMount } from 'react-use';
import invariant from 'invariant';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useRegistry } from '@wordpress/data';

function WithRegistrySetup({ func, children }) {
	const registry = useRegistry();
	const [ready, setReady] = useState(false);

	invariant(typeof func === 'function', 'func must be a function.');

	useMount(async () => {
		await func(registry);
		setReady(true);
	});

	if (ready) {
		return children;
	}

	return null;
}

export default WithRegistrySetup;
