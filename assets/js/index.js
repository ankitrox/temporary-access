/**
 * WordPress dependencies
 */
import { register } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import TempAccess from './components/TempAccess';
import dataStore from './datastores';
import uiStore from './datastores/ui';

/**
 * Render the root component.
 * @param {HTMLDivElement} rootElement Root element where UI will be rendered.
 * @return {void} Renders the root component.
 */
const renderElement = (rootElement) => {
	rootElement.render(<TempAccess />);
};

/**
 * Mount component when DOM is ready.
 */
domReady(() => {
	// Register the data stores.
	[dataStore, uiStore].forEach((store) => register(store));

	const rootElement = createRoot(document.getElementById('temp-access-root'));
	renderElement(rootElement);
});
