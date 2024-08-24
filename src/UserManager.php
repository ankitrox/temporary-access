<?php
/**
 * User management class.
 *
 * @package Ankit\TemporrayAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Modals\APIUser;
use Ankit\TemporaryAccess\Modals\User;
use Ankit\TemporaryAccess\Interfaces\UserManagement;
use Exception;
use Throwable;
use InvalidArgumentException;
use stdClass;
use WP_User;
use WP_User_Query;

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
		add_action( 'tempaccess.user_created', array( $this, 'associate_meta' ), 10, 2 );
		add_action( 'tempaccess.user_updated', array( $this, 'associate_meta' ), 10, 2 );
	}

	/**
	 * Create temporary user.
	 *
	 * @param array $args User arguments.
	 *
	 * @return stdClass
	 * @throws Exception Exception for user creation.
	 * @throws Throwable WP Errors.
	 */
	public function create( array $args ): stdClass {
		try {
			$args = wp_parse_args(
				$args,
				array(
					'user_email' => null,
					'first_name' => '',
					'last_name'  => '',
					'role'       => is_multisite() ? get_blog_option( get_current_blog_id(), 'default_role', 'subscriber' ) : get_option( 'default_role', 'subscriber' ),
					'user_pass'  => wp_generate_password( 16 ),
					'user_login' => 'user_' . time(),
					'start_date' => time(),
					'end_date'   => time(),
					+ DAY_IN_SECONDS, // By default valid for 1 day.
					'redirect'   => admin_url(),
				)
			);

			$user_modal = new User( $args );
			$user       = wp_insert_user( get_object_vars( $user_modal ) );

			if ( is_wp_error( $user ) ) {
					throw new Exception( $user->get_error_message() );
			}

			$user = get_user_by( 'id', $user );

			/**
			 * Fires once the user has been created successfully.
			 *
			 * @param WP_User $user User object.
			 *
			 * @since 1.0.0
			 */
			do_action( 'tempaccess.user_created', $user, $user_modal );

			return ( new APIUser( $user->ID ) )->get_modal();

		} catch ( Throwable $e ) {

			do_action( 'tempaccess.exception', $e );

			throw $e;
		}
	}

	/**
	 * Retrieve users.
	 *
	 * @param int|null $uid  User ID.
	 * @param array    $args List of arguments for fetching users.
	 *
	 * @return WP_User|array
	 */
	public function read( int $uid = null, array $args = array() ) {
		$response   = array(
			'users' => array(),
			'total' => 0,
		);
		$page       = $args['page'] ?? 1;
		$orderby    = $args['orderby'] ?? 'user_registered';
		$order      = ( 'ASC' === $args['order'] ) ? 'ASC' : 'DESC';
		$number     = $args['per_page'] ?? apply_filters( 'tempaccess.read_users', 10 );
		$users_args = array(
			'meta_query' => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				array(
					'key'  => self::EXPIRATION_KEY,
					'type' => 'NUMERIC',
				),
			),
		);

		$users_args['number']      = $number;
		$users_args['paged']       = $page;
		$users_args['orderby']     = $orderby;
		$users_args['order']       = $order;
		$users_args['count_total'] = true;

		if ( $uid ) {
			$users_args['include'] = array( $uid );
		}

		$users = new WP_User_Query( $users_args );
		$total = $users->get_total();
		$users = $users->get_results();

		if ( ! empty( $users ) ) {
			$response['users'] = array_map(
				function ( $user ) {
					return ( new APIUser( $user->ID ) )->get_modal();
				},
				$users
			);

			$response['total'] = $total;

			return $response;
		}

		return $response;
	}

	/**
	 * Update an existing temporary user.
	 *
	 * @param int|null $uid  User ID.
	 * @param array    $args User args.
	 *
	 * @return \stdClass
	 * @throws Exception Exception for user update.
	 * @throws Throwable Exception for user update.
	 * @throws InvalidArgumentException Error for no user ID.
	 */
	public function update( int $uid = null, array $args = array() ): \stdClass {
		if ( ! $uid ) {
			throw new InvalidArgumentException( __( 'User ID is required for update', 'temporary-access-wp' ) );
		}

		try {
			$args = wp_parse_args(
				$args,
				array(
					'ID'         => $uid,
					'user_email' => null,
					'first_name' => '',
					'last_name'  => '',
					'role'       => is_multisite() ? get_blog_option( get_current_blog_id(), 'default_role', 'subscriber' ) : get_option( 'default_role', 'subscriber' ),
					'user_login' => 'user_' . time(),
				)
			);

			$user_modal       = new User( $args, 'update' );
			$user_update_args = get_object_vars( $user_modal );
			unset( $user_update_args['setters'] );
			$user = wp_update_user( $user_update_args );

			if ( is_wp_error( $user ) ) {
				throw new Exception( $user->get_error_message() );
			}

			$user = get_user_by( 'id', $user );

			/**
			 * Fires once the user has been created successfully.
			 *
			 * @param WP_User $user User object.
			 *
			 * @since 1.0.0
			 */
			do_action( 'tempaccess.user_updated', $user, $user_modal );

			return ( new APIUser( $user->ID ) )->get_modal();

		} catch ( Throwable $e ) {

			do_action( 'tempaccess.exception', $e );

			throw $e;
		}
	}

	/**
	 * Remove the user from system.
	 *
	 * @param int|null $user_id User ID.
	 *
	 * @throws InvalidArgumentException Error for no user ID.
	 * @throws Exception Error for user deletion.
	 * @return bool
	 */
	public function delete( int $user_id = null ): bool {
		if ( ! $user_id ) {
			throw new InvalidArgumentException( __( 'User ID is required for deletion', 'temporary-access-wp' ) );
		}

		$user = get_user_by( 'id', $user_id );

		if ( ! $user ) {
			throw new Exception( __( 'This user does not exist', 'temporary-access-wp' ) );
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
		$user_args = array(
			'meta_key'   => UserManagement::TOKEN_KEY, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'meta_value' => $token, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
		);

		$users = get_users( $user_args );

		if ( ! empty( $users ) ) {
			/**
			 * WP_User instance.
			 *
			 * @var WP_User $user
			 */
			$user = array_pop( $users );

			$user_id = $user->ID;

			// Check if user is expired.
			$end_time = get_user_meta( $user_id, self::EXPIRATION_KEY, true );
			$expired  = ( $end_time < current_time( 'timestamp' ) ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp.Requested

			if ( $expired ) {
				return 0;
			}

			return $user_id;
		}

		return 0;
	}

	/**
	 * Associate meta information to newly created temporary user.
	 *
	 * @param WP_User $user User object.
	 * @param User    $user_modal User modal.
	 *
	 * @return void
	 */
	public function associate_meta( WP_User $user, User $user_modal ): void {
		// Token would only be generated during user creation.
		if ( 'tempaccess.user_created' === current_action() ) {
			$token = md5( $user->ID . time() . uniqid( '', true ) );
			update_user_meta( $user->ID, self::TOKEN_KEY, $token );
			update_user_meta( $user->ID, self::START_DATE_KEY, $user_modal->gmt_timestamp_start );

			// Save the expiration time in local timezone.
			update_user_meta( $user->ID, self::EXPIRATION_KEY, $user_modal->gmt_timestamp_end );
		}

		// Update start date and end date during user update only if present.
		if ( 'tempaccess.user_updated' === current_action() ) {
			if ( ! empty( $user_modal->gmt_timestamp_start ) ) {
				update_user_meta( $user->ID, self::START_DATE_KEY, $user_modal->gmt_timestamp_start );
			}

			if ( ! empty( $user_modal->gmt_timestamp_end ) ) {
				update_user_meta( $user->ID, self::EXPIRATION_KEY, $user_modal->gmt_timestamp_end );
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
