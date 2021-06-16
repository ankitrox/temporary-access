<?php
/**
 * Authenticate the user.
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Interfaces\UserManagement;
use WP_User;
use WP_Error;
use Ankit\TemporaryAccess\Utils\Helper;

/**
 * Class Authenticator
 *
 * @package Ankit\TemporaryAccess
 */
class Authenticator {

	/**
	 * User manager instance.
	 *
	 * @var UserManagement
	 */
	private $user_manager;

	/**
	 * Authenticator constructor.
	 *
	 * @param UserManagement $user_manager User manager object.
	 */
	public function __construct( UserManagement $user_manager ) {
		$this->user_manager = $user_manager;
	}

	/**
	 * Initialization actions.
	 *
	 * @return void
	 */
	public function init(): void {
		add_action( 'authenticate', [ $this, 'authenticate' ] );
	}

	/**
	 * Authenticate the user based on token.
	 *
	 * @return WP_User|WP_Error
	 */
	public function authenticate( $user = null ) {
		if ( $user instanceof WP_User ) {
			return $user;
		}

		$token = Helper::filter_input( INPUT_GET, 'tempaccess_token', FILTER_SANITIZE_STRING );

		if ( ! $token ) {
			return $user;
		}

		$user_id = $this->user_manager->get_user_by_token( $token );

		if ( ! $user_id ) {
			return new WP_Error( 'no_user_found', __( 'No user found for this token', 'temporary-access' ) );
		}

		return get_user_by( 'id', $user_id );
	}
}
