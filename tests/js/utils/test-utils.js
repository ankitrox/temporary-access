/**
 * test utils.
 */

/**
 * External dependencies
 */
import invariant from 'invariant';
import { render, act } from '@testing-library/react';

/**
 * WordPress dependencies
 */
import { createRegistry, RegistryProvider } from '@wordpress/data';
import { store as GenericStore } from '../../../assets/js/datastores';
import { store as UIStore } from '../../../assets/js/datastores/ui';

/**
 * Internal dependencies
 */
import { createWaitForRegistry } from './utils';
import {
	STORE_NAME,
	UI_STORE_NAME,
} from '../../../assets/js/datastores/constants';

export const createTestRegistry = () => {
	const storeConfig = {
		[STORE_NAME]: GenericStore,
		[UI_STORE_NAME]: UIStore,
	};

	const registry = createRegistry(storeConfig);

	return registry;
};

/**
 * Renders the given UI into a container to make assertions.
 *
 * @param {*}        ui                      Any valid React child element.
 * @param {Object}   [options]               Optional. Render options.
 * @param {string[]} [options.features]      Feature flags to enable for this hook render.
 * @param {Function} [options.setupRegistry] A function which accepts the registry instance to configure it.
 * @param {Object}   [options.registry]      A specific registry instance to use. Defaults to a fresh test registry with all stores.
 * @param {History}  [options.history]       History object for React Router. Defaults to MemoryHistory.
 * @param {string}   [options.route]         Route to pass to history as starting route.
 * @param {boolean}  [options.inView]        If the component should consider itself in-view (see `useInView` hook).
 * @param {string}   [options.viewContext]   `viewContext` to use for this component and its children.
 * @return {Object} An object containing all of {@link https://testing-library.com/docs/react-testing-library/api#render-result} as well as the `registry`.
 */
const customRender = (ui, options = {}) => {
	const {
		setupRegistry = (r) => r,
		registry = createTestRegistry(),
		...renderOptions
	} = options;

	invariant(
		typeof setupRegistry === 'function',
		'options.setupRegistry must be a function.'
	);

	setupRegistry(registry);

	function Wrapper({ children }) {
		return <RegistryProvider value={registry}>{children}</RegistryProvider>;
	}

	const waitForRegistry = createWaitForRegistry(registry);

	const result = render(ui, { wrapper: Wrapper, ...renderOptions });

	const {
		getByTestId: getByTestID,
		findByTestId: findByTestID,
		getAllByTestId: getAllByTestID,
		findAllByTestId: findAllByTestID,
		queryByTestId: queryByTestID,
		queryAllByTestId: queryAllByTestID,
	} = result;

	return {
		...result,
		findAllByTestID,
		findByTestID,
		getAllByTestID,
		getByTestID,
		queryAllByTestID,
		queryByTestID,
		registry,
		waitForRegistry: () => act(waitForRegistry),
	};
};

export * from './utils';

export * from '@testing-library/react';

export { customRender as render };
