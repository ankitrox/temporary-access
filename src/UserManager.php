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
use Throwable;
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
					'user_email' => null,
					'first_name' => '',
					'last_name'  => '',
					'role'       => is_multisite() ? get_blog_option( get_current_blog_id(), 'default_role', 'subscriber' ) : get_option( 'default_role', 'subscriber' ),
					'user_pass'  => wp_generate_password( 16 ),
					'user_login' => 'user_' . time(),
					'start_date' => strtotime('now'),
					'end_date'   => strtotime( '+1 day' ),
					'redirect'   => admin_url(),
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
	 * @param int|null $uid User ID.
	 * @param array    $args List of arguments for fetching users.
	 *
	 * @return WP_User|array
	 */
	public function read( int $uid = null, array $args = [] ) {
		$return_users = [];
		$page         = $args['page'] ?? 1;
		$orderby      = $args['orderby'] ?? 'user_registered';
		$order        = ( 'ASC' === $args['order'] ) ? 'ASC' : 'DESC';
		$number       = apply_filters( 'tempaccess.read_users', 10 );
		$users_args   = [
			'meta_query' => [
				[
					'key'  => self::EXPIRATION_KEY,
					'type' => 'NUMERIC',
				]
			],
		];

		$users_args['number']  = $number;
		$users_args['paged']   = $page;
		$users_args['orderby'] = $orderby;
		$users_args['order']   = $order;

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
	 * @param int|null $uid User ID.
	 * @param array    $args User args.
	 *
	 * @return \stdClass
	 * @throws Throwable Exception for user update.
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
					'user_email' => null,
					'first_name' => '',
					'last_name'  => '',
					'role'       => is_multisite() ? get_blog_option( get_current_blog_id(), 'default_role', 'subscriber' ) : get_option( 'default_role', 'subscriber' ),
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
	 * Fetch user by token.
	 *
	 * @param string $token User token.
	 *
	 * @return int
	 */
	public function get_user_by_token( string $token ): int {
		$user_args = [
			'meta_key'   => UserManagement::TOKEN_KEY,
			'meta_value' => $token,
		];

		$user = get_users( $user_args );

		if ( ! empty ( $user ) ) {
			/** @var WP_User $user */
			$user = array_pop( $user );

			return $user->ID;
		}

		return 0;
	}

	/**
	 * Associate meta information to newly created temporary user.
	 *
	 * @param WP_User $user User object.
	 * @param array   $args User arguments.
	 *
	 * @return void
	 */
	public function associate_meta( WP_User $user, array $args ): void {
		/**
		 * Token would only be generated during user creation.
		 */
		if ( 'tempaccess.user_created' === current_action() ) {
			$start_date = strtotime( $args['start_date'] ) ?? strtotime( 'now' );
			$end_date   = strtotime( $args['end_date'] ) ?? strtotime( '+1 day' );
			$token      = $user->ID . time() . uniqid( '', true );
			$token      = md5( $token );
			update_user_meta( $user->ID, self::TOKEN_KEY, $token );
			update_user_meta( $user->ID, self::START_DATE_KEY, $start_date );
			update_user_meta( $user->ID, self::EXPIRATION_KEY, $end_date );
		}

		/**
		 * Update start date and end date during user update only if present.
		 */
		if ( 'tempaccess.user_updated' === current_action() ) {
			if ( ! empty( $args['start_date'] ) ) {
				update_user_meta( $user->ID, self::START_DATE_KEY, strtotime( $args['start_date'] ) );
			}

			if ( ! empty( $args['end_date'] ) ) {
				update_user_meta( $user->ID, self::EXPIRATION_KEY, strtotime( $args['end_date'] ) );
			}
		}
	}

	/**
	 * Redirect temporary user post-login.
	 *
	 * @param WP_User $user User object.
	 *
	 * @return void
	 */
	public function post_login_actions( WP_User $user ) {
		update_user_meta( $user->ID, 'tempaccess_last_login', time() );

		wp_safe_redirect( admin_url() );
		die;
	}
}
