/**
 * Utility functions.
 */

const { unescape } = lodash;

/**
 * Internal dependencies
 */
export * from './stringify';

/**
 * Calculates the change between two values.
 *
 * @since 1.24.0
 *
 * @param {number} previous The previous value.
 * @param {number} current  The current value.
 * @return {(number|null)} The percent change. Null if the input or output is invalid.
 */
export function calculateChange(previous, current) {
	const isZero = (value) => value === '0' || value === 0;

	// Prevent null result when both values are legitimately zero.
	if (isZero(previous) && isZero(current)) {
		return 0;
	}

	// Prevent divide by zero errors.
	if (isZero(previous) || Number.isNaN(previous)) {
		return null;
	}

	// Avoid NaN at all costs.
	const change = (current - previous) / previous;
	if (Number.isNaN(change) || !Number.isFinite(change)) {
		return null;
	}

	return change;
}

/**
 * Verifies whether JSON is valid.
 *
 * @since 1.0.0
 *
 * @param {string} stringToValidate The string to validate.
 * @return {boolean} Indicates JSON is valid.
 */
export const validateJSON = (stringToValidate) => {
	try {
		return JSON.parse(stringToValidate) && !!stringToValidate;
	} catch (e) {
		return false;
	}
};

/**
 * Converts HTML text into an HTML entity.
 *
 * _.unescape doesn't seem to decode some entities for admin bar titles.
 * adding combination in this helper as a workaround.
 *
 * @since 1.0.0
 *
 * @param {string} str The string to decode.
 * @return {string} Decoded HTML entity.
 */
export const decodeHTMLEntity = (str) => {
	if (!str) {
		return '';
	}

	const decoded = str
		.replace(/&#(\d+);/g, function (match, dec) {
			return String.fromCharCode(dec);
		})
		.replace(/(\\)/g, '');

	return unescape(decoded);
};
