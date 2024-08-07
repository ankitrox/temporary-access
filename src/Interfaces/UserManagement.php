<?php
/**
 * User management Interface.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Interfaces;

use stdClass;
use WP_User;

/**
 * Interface Container
 *
 * @package WpGuruDev\OrderExport\Interfaces
 */
interface UserManagement {


	const START_DATE_KEY = 'tempaccess_start';

	/**
	 * Expiration meta key.
	 */
	const EXPIRATION_KEY = 'tempaccess_expiration';

	/**
	 * Token meta key.
	 */
	const TOKEN_KEY = 'tempaccess_token';

	/**
	 * Last login meta key.
	 */
	const LAST_LOGIN_KEY = 'tempaccess_last_login';

	/**
	 * Create the temporary user.
	 *
	 * @param array $args User creation args.
	 *
	 * @return WP_User
	 */
	public function create( array $args ): stdClass;

	/**
	 * Retrieve user(s).
	 *
	 * @param int|null $uid  User ID.
	 * @param array    $args Query arguments.
	 *
	 * @return WP_User|array
	 */
	public function read( int $uid = null, array $args = array() );

	/**
	 * Update an existing temporary user.
	 *
	 * @param int   $uid  User ID.
	 * @param array $args User args.
	 *
	 * @return \stdClass
	 */
	public function update( int $uid, array $args ): \stdClass;

	/**
	 * Delete an existing temporary user.
	 *
	 * @param int $uid User ID.
	 *
	 * @return bool
	 */
	public function delete( int $uid ): bool;

	/**
	 * Fetch the user by token.
	 *
	 * @param string $token Token.
	 *
	 * @return mixed
	 */
	public function get_user_by_token( string $token ): int;
}
