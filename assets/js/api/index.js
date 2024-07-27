/**
 * API for temporary access endpoints.
 */

import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Accesses the temporary user API endpoints.
 *
 * @param {Object} param0             Data to be sent to the endpoint.
 * @param {Object} param0.data        POST data to be sent to the endpoint.
 * @param {string} param0.method      HTTP method to use.
 * @param {Object} param0.queryParams Query parameters to be sent to the endpoint.
 * @param {Object} param0.signal      Abort signal to cancel the request.
 * @param {string} param0.path        Path to the endpoint.
 * @return {Promise} Response from the endpoint.
 */
export const tempAccessRequest = async ({
	data,
	method = 'GET',
	path = '',
	queryParams,
	signal,
}) => {
	// Make an API request to retrieve the results.
	try {
		const response = await apiFetch({
			data,
			method,
			signal,
			url: addQueryArgs(`${tempAccess?.path}/${path}`, queryParams),
		});

		return response;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			return null;
		}

		throw error;
	}
};

/**
 * Utility for making GET requests.
 *
 * @param {Object} data Data to sent to the endpoint.
 * @return {Promise} Response from the endpoint.
 */
export const get = (data = {}) => {
	return tempAccessRequest(data);
};

/**
 * Utility for making POST requests.
 * @param {Object} data    Data to sent to the endpoint.
 * @param {Object} options Extra options for request customization.
 * @return {Promise} Response from the endpoint.
 */
export const set = async (data, options = {}) => {
	const { method = 'POST', queryParams, signal } = options;
	const response = await tempAccessRequest({
		data,
		method,
		queryParams,
		signal,
	});

	return response;
};

/**
 * Utility for making POST requests.
 * @param {Object} data    Data to sent to the endpoint.
 * @param {Object} options Extra options for request customization.
 * @return {Promise} Response from the endpoint.
 */
export const remove = async (data, options = {}) => {
	const { method = 'DELETE', path = '', queryParams, signal } = options;
	const response = await tempAccessRequest({
		data,
		method,
		queryParams,
		path,
		signal,
	});

	return response;
};

/**
 * API object.
 */
const API = {
	get,
	set,
	remove,
};

export default API;
