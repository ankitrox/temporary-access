/**
 * Data store utilities for transforming names to a certain case.
 */

/**
 * Transforms a camelCase name into its PascalCase name.
 *
 * @since n.e.x.t
 * @private
 *
 * @param {string} name "camelCase" name to transform.
 * @return {string} PascalCase name.
 */
export const camelCaseToPascalCase = (name) => {
	return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * Transforms a camelCase name into its CONSTANT_CASE name.
 *
 * @since n.e.x.t
 * @private
 *
 * @param {string} name "camelCase" name to transform.
 * @return {string} CONSTANT_CASE name.
 */
export const camelCaseToConstantCase = (name) => {
	return name.replace(/([a-z0-9]{1})([A-Z]{1})/g, '$1_$2').toUpperCase();
};

/**
 * Transforms a hyphen-case name into its PascalCase name.
 *
 * @since n.e.x.t
 * @private
 *
 * @param {string} name "hyphen-case" name to transform.
 * @return {string} PascalCase name.
 */
export function hyphenCaseToPascalCase(name) {
	return name
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
}
