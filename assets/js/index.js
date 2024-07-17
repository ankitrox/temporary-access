import Store from './store';
import TempAccess from './components/TempAccess';
import '../css/tempaccess.scss';

const { register } = wp.data;
const { domReady } = wp;
const { createRoot } = wp.element;

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
	const rootElement = createRoot(document.getElementById('temp-access-root'));
	register(Store);
	renderElement(rootElement);
});
