/**
 * WordPress dependencies
 */
import { register } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import Store from './store';
import TempAccess from './components/TempAccess';
import '../css/tempaccess.scss';
import newStore from './datastores';

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
	register(newStore);
	const rootElement = createRoot(document.getElementById('temp-access-root'));
	register(Store);
	renderElement(rootElement);
});
