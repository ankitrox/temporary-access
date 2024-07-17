<?php
/**
 * Authenticate the user.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Interfaces\UserManagement;
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
		add_action( 'init', array( $this, 'authenticate' ), 5 );
	}

	/**
	 * Authenticate the user based on token.
	 *
	 * @return void
	 */
	public function authenticate() {
		$token = Helper::filter_input( INPUT_GET, 'tempaccess_token', FILTER_SANITIZE_STRING );

		if ( ! $token ) {
			return;
		}

		$user_id = $this->user_manager->get_user_by_token( $token );

		if ( ! $user_id ) {
			return;
		}

		$user_data     = get_user_by( 'id', $user_id );
		$perform_login = true;

		if ( is_user_logged_in() ) {
			if ( get_current_user_id() !== $user_id ) {
				wp_logout();
			} else {
				$perform_login = false;
			}
		}

		if ( $perform_login ) {
			wp_clear_auth_cookie();
			wp_set_current_user( $user_id, $user_data->user_login );
			wp_set_auth_cookie( $user_id );

			do_action( 'tempaccess.user_authenticated', $user_data );
		}
	}
}
