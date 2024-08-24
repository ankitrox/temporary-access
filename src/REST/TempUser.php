<?php
/**
 * Endpoint to manage temporary user.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\REST;

use Ankit\TemporaryAccess\Interfaces\UserManagement;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use Throwable;
use Exception;

/**
 * Class TempUser
 *
 * @package Ankit\TemporaryAccess\REST
 */
class TempUser {


	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	const NAMESPACE = 'tempaccess/v1';

	/**
	 * User manager object.
	 *
	 * @var UserManagement
	 */
	private $user_manager;

	/**
	 * TempUser constructor.
	 *
	 * @param UserManagement $user_manager User manager.
	 */
	public function __construct( UserManagement $user_manager ) {
		$this->user_manager = $user_manager;
	}

	/**
	 * Permission check for accessing endpoints.
	 *
	 * @return bool
	 */
	public function permission_check(): bool {
		return current_user_can( 'edit_users' );
	}

	/**
	 * Register the endpoint.
	 *
	 * @return void
	 */
	public function register(): void {

		register_rest_route(
			self::NAMESPACE,
			'/users',
			array(
				array(
					'methods'  => WP_REST_Server::READABLE,
					'callback' => array( $this, 'get_users' ),
				),
				array(
					'methods'  => WP_REST_Server::CREATABLE,
					'callback' => array( $this, 'create_user' ),
				),
				'permission_callback' => array( $this, 'permission_check' ),
				'args'                => array(),
			)
		);

		register_rest_route(
			self::NAMESPACE,
			'/users/(?P<ID>\d+)',
			array(
				array(
					'methods'  => WP_REST_Server::READABLE,
					'callback' => array( $this, 'get_users' ),
				),
				array(
					'methods'  => WP_REST_Server::EDITABLE,
					'callback' => array( $this, 'update_user' ),
				),
				array(
					'methods'  => WP_REST_Server::DELETABLE,
					'callback' => array( $this, 'delete_user' ),
				),
				'permission_callback' => array( $this, 'permission_check' ),
				'args'                => array(),
			)
		);
	}

	/**
	 * Try to create the new user. Send the user object on success
	 * or send error on failure.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function create_user( WP_REST_Request $request ) {
		try {

			$user = $this->user_manager->create( $request->get_params() );

			return new WP_REST_Response( $user );

		} catch ( Throwable $e ) {

			do_action( 'tempaccess.api_error', $e );

			return new WP_Error( 'user_creation_failed', $e->getMessage() );
		}
	}

	/**
	 * Retrieve users based on the requested criteria.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_users( WP_REST_Request $request ) {
		try {

			$users = $this->user_manager->read( (int) $request->get_param( 'ID' ), $request->get_params() );

			return new WP_REST_Response( $users );

		} catch ( Throwable $e ) {

			do_action( 'tempaccess.api_error', $e );

			return new WP_Error( 'user_fetch_failed', $e->getMessage() );
		}
	}

	/**
	 * Update temporary user's data
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function update_user( WP_REST_Request $request ) {
		try {
			$user = $this->user_manager->update( (int) $request->get_param( 'ID' ), $request->get_params() );

			return new WP_REST_Response( $user );

		} catch ( Throwable $e ) {

			do_action( 'tempaccess.api_error', $e );

			return new WP_Error( 'user_update_failed', $e->getMessage() );
		}
	}

	/**
	 * Delete temporary user's account.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response|WP_Error
	 * @throws \Exception   Unable to delete.
	 */
	public function delete_user( WP_REST_Request $request ) {
		try {
			$delete = $this->user_manager->delete( (int) $request->get_param( 'ID' ) );

			if ( $delete ) {
				return new WP_REST_Response( __( 'User has been deleted successfully', 'passwordless-login' ) );
			}

			throw new Exception( __( 'Could not delete the user. Please try again.', 'passwordless-login' ) );

		} catch ( Throwable $e ) {

			do_action( 'tempaccess.api_error', $e );

			return new WP_Error( 'user_update_failed', $e->getMessage() );
		}
	}
}
