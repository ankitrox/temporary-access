<?php
/**
 * User management class.
 *
 * @package Ankit\TemporrayAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Modals\User;
use Ankit\TemporaryAccess\Interfaces\UserManagement;
use WP_User;

/**
 * Class UserManager
 *
 * @package Ankit\TemporaryAccess
 */
class UserManager implements UserManagement {

	/**
	 * Initialization setup.
	 *
	 * Useful for adding any hooks.
	 *
	 * @return void
	 */
	public function init() {

	}

	/**
	 * Create temporary user.
	 *
	 * @param array $args User arguments.
	 *
	 * @return WP_User
	 * @throws \Exception|\Throwable for WP Errors.
	 */
	public function create( array $args ): WP_User {
		try {
			$args = wp_parse_args(
				$args,
				[
					'email'      => null,
					'first_name' => '',
					'last_name'  => '',
					'role'       => 'subscriber',
					'user_pass'  => wp_generate_password( 16 ),
					'user_login' => 'user_' . time(),
				]
			);

			$user_modal = new User( $args );
			$user       = wp_insert_user( get_object_vars( $user_modal ) );

			if ( is_wp_error( $user ) ) {
				throw new \Exception( $user->get_error_message() );
			}

			$user = get_user_by( 'id', $user );

			/**
			 * Fires once the user has been created successfully.
			 *
			 * @param WP_User $user User object.
			 *
			 * @since 1.0.0
			 */
			do_action( 'tempaccess.user_created', $user );

			return $user;

		} catch ( \Throwable $e ) {

			do_action( 'tempaccess.exception', $e );

			throw $e;
		}
	}

	public function read( int $uid = null ): WP_User {
		// TODO: Implement read() method.
	}

	public function update( int $uid ): WP_User {
		// TODO: Implement update() method.
	}

	public function delete( int $uid ): bool {
		// TODO: Implement delete() method.
	}

	private function user_login() {

	}
}
