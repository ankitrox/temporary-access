/**
 * Waits for 5ms to ensure all pending timeouts set with the default 1ms will have executed.
 *
 * @return {Promise} Promise that resolves after a 2ms timeout.
 */
export const waitForDefaultTimeouts = () => {
	return new Promise((resolve) => {
		setTimeout(resolve, 5);
	});
};

/**
 * Creates a function that allows extra time for registry updates to have completed.
 *
 * @since 1.39.0
 *
 * @param {Object} registry WP data registry instance.
 * @return {Function} Function to await all registry updates since creation.
 */
export const createWaitForRegistry = (registry) => {
	const updates = [];
	const listener = () => updates.push(new Promise((resolve) => resolve()));
	const unsubscribe = registry.subscribe(listener);

	// Return a function that:
	// - Waits until the next tick for updates.
	// - Waits for all pending resolvers to resolve.
	// We unsubscribe afterwards to allow for potential additions while
	// Promise.all is resolving.
	return async () => {
		await Promise.all([...updates, waitForDefaultTimeouts()]);
		unsubscribe();
	};
};
