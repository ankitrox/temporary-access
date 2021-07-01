import Store from './store';
import TempAccess from './components/TempAccess';
import '../css/tempaccess.scss';

const { subscribe } = wp.data;
const { register } = wp.data;
const { domReady } = wp;
const { render } = wp.element;

/**
 * Render the root component.
 */
const renderElement = () => {
    render(
        <TempAccess />,
        document.getElementById( 'temp-access-root' )
    );
};

/**
 * Mount component when DOM is ready.
 */
domReady ( () => {
    register( Store );
    renderElement();
});

/**
 * Subscribe to state change for re-rendering.
 */
subscribe( renderElement );
