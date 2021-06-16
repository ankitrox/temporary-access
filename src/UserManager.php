<?php
/**
 * User management class.
 *
 * @package Ankit\TemporrayAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Modals\APIUser;
use Ankit\TemporaryAccess\Modals\User;
use Ankit\TemporaryAccess\Interfaces\UserManagement;
use Exception;
use InvalidArgumentException;
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
		add_action( 'tempaccess.user_created', [ $this, 'associate_meta' ], 10, 2 );
		add_action( 'tempaccess.user_updated', [ $this, 'associate_meta' ], 10, 2 );
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
					'role'       => is_multisite() ? get_blog_option( get_current_blog_id(), 'default_role', 'subscriber' ) : get_option( 'default_role', 'subscriber' ),
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
			do_action( 'tempaccess.user_created', $user, $args );

			return $user;

		} catch ( \Throwable $e ) {

			do_action( 'tempaccess.exception', $e );

			throw $e;
		}
	}

	/**
	 * Retrieve users.
	 *
	 * @param int|null $uid
	 * @param array $args
	 *
	 * @return WP_User|array
	 */
	public function read( int $uid = null, array $args = [] ) {
		$return_users = [];
		$page         = $args['page'] ?? 1;
		$number       = apply_filters( 'tempaccess.read_users', 10 );
		$users_args = [
			'meta_query' => [
				[
					'key'     => self::EXPIRATION_KEY,
					'type'    => 'NUMERIC',
				]
			],
		];
		$users_args['number'] = $number;
		$users_args['paged']  = $page;

		if ( $uid ) {
			$users_args['include'] = [ $uid ];
		}

		$users = get_users( $users_args );


		if ( ! empty ( $users ) ) {
			foreach ( $users as $user ) {
				$return_users[] = (new APIUser( $user->ID ))->get_modal();
			}
		}

		if ( $uid && isset( $return_users[0] ) ) {
			return $return_users[0];
		}

		return $return_users;
	}

	/**
	 * Update an existing temporary user.
	 *
	 * @param int $uid User ID.
	 * @param array $args User args.
	 *
	 * @return \stdClass
	 */
	public function update( int $uid = null, array $args = [] ): \stdClass {
		if ( ! $uid ) {
			throw new InvalidArgumentException( __( 'User ID is required for update', 'temporary-access' ) );
		}

		try {
			$args = wp_parse_args(
				$args,
				[
					'ID'         => $uid,
					'email'      => null,
					'first_name' => '',
					'last_name'  => '',
					'role'       => is_multisite() ? get_blog_option( get_current_blog_id(), 'default_role', 'subscriber' ) : get_option( 'default_role', 'subscriber' ),
					'user_pass'  => wp_generate_password( 16 ),
					'user_login' => 'user_' . time(),
				]
			);

			$user_modal = new User( $args, 'update' );

			$user       = wp_update_user( get_object_vars( $user_modal ) );

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
			do_action( 'tempaccess.user_updated', $user, $args );

			return (new APIUser( $user->ID ))->get_modal();

		} catch ( \Throwable $e ) {

			do_action( 'tempaccess.exception', $e );

			throw $e;
		}

	}

	/**
	 * Remove the user from system.
	 *
	 * @param int|null $uid
	 *
	 * @return bool
	 */
	public function delete( int $uid = null ): bool {
		if ( ! $uid ) {
			throw new InvalidArgumentException( __( 'User ID is required for deletion', 'temporary-access' ) );
		}

		$user = get_user_by( 'id', $uid );

		if ( ! $user ) {
			throw new Exception( __( 'This user does not exist', 'temporray-access' ) );
		}

		if ( ! function_exists( 'wp_delete_user' ) ) {
			include ABSPATH . 'wp-admin/includes/user.php';
		}

		return wp_delete_user( $user->ID );
	}

	/**
	 * Associate meta information to newly created temporary user.
	 *
	 * @param WP_User $user User object.
	 * @param array $args User arguments.
	 *
	 * @return void
	 */
	public function associate_meta( WP_User $user, array $args ): void {
		$expiration_time = $args['expire'] ?? '+1 day';
		$expiration_time = strtotime( $expiration_time );

		/**
		 * Expire would get updated only during
		 */
		if ( ! empty( $args['expire'] ) || 'tempaccess.user_updated' !== current_action() ) {
			update_user_meta( $user->ID, self::EXPIRATION_KEY, $expiration_time );
		}

		/**
		 * Token would only be generated during user creation.
		 */
		if ( 'tempaccess.user_created' === current_action() ) {
			$token           = $user->ID . time() . uniqid( '', true );
			update_user_meta( $user->ID, self::TOKEN_KEY, $token );
		}
	}
}
