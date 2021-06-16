<?php
/**
 * User management Interface.
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Interfaces;

use WP_User;

/**
 * Interface Container
 *
 * @package WpGuruDev\OrderExport\Interfaces
 */
interface UserManagement {

	/**
	 * Create the temporary user.
	 *
	 * @param array $args User creation args.
	 *
	 * @return WP_User
	 */
	public function create( array $args ): WP_User;

	/**
	 * Retrieve user(s).
	 *
	 * @param int|null $uid User ID.
	 *
	 * @return WP_User
	 */
	public function read( int $uid = null ): WP_User;

	/**
	 * Update an existing temporary user.
	 *
	 * @param int $uid User ID.
	 *
	 * @return WP_User
	 */
	public function update( int $uid ): WP_User;

	/**
	 * Delete an existing temporary user.
	 *
	 * @param int $uid User ID.
	 *
	 * @return bool
	 */
	public function delete( int $uid ): bool;
}
