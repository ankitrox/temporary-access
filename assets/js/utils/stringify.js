/**
 * Stringify function.
 */

/**
 * External dependencies
 */
import md5 from 'md5';

/**
 * Transforms an object into a hash string.
 *
 * This function can be used to e.g. generate cache keys, based on the given
 * object. Object properties are sorted, so even if they are provided in
 * different order, the hash will match. The function furthermore supports
 * nested objects.
 *
 * @since n.e.x.t
 *
 * @param {Object} obj The object to stringify.
 * @return {string} Hash for the object.
 */
export const stringifyObject = (obj) => {
	return md5(JSON.stringify(sortObjectProperties(obj)));
};

function sortObjectProperties(obj) {
	const orderedData = {};
	Object.keys(obj)
		.sort()
		.forEach((key) => {
			let val = obj[key];
			if (val && 'object' === typeof val && !Array.isArray(val)) {
				val = sortObjectProperties(val);
			}
			orderedData[key] = val;
		});
	return orderedData;
}
