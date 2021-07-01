<?php
/**
 * API User Modal.
 *
 * This modal will be returned as a single user modal in API response.
 *
 * @package Ankit\TemporrayAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Modals;

use Ankit\TemporaryAccess\Interfaces\UserManagement;
use function Ankit\TemporaryAccess\plugin;

/**
 * Class APIUser
 *
 * @package Ankit\TemporaryAccess\Modals
 */
class APIUser {

	/**
	 * @var int User ID.
	 */
	private $user_id = 0;

	/**
	 * APIUser constructor.
	 *
	 * @param int $user_id User ID.
	 */
	public function __construct( int $user_id ) {
		$this->user_id = $user_id;
	}

	/**
	 * Retrieve modal
	 *
	 * @return \stdClass
	 */
	public function get_modal(): \stdClass {
		$user = get_user_by( 'id', $this->user_id );
		/** @var UserManagement $user_manager */
		$user_manager         = plugin()->container()->get( 'user_manager' );
		$user_obj             = new \stdClass();
		$user_obj->ID         = $this->user_id;
		$user_obj->first_name = $user->first_name;
		$user_obj->last_name  = $user->last_name;
		$user_obj->email      = $user->data->user_email;
		$user_obj->user_login = $user->data->user_login;
		$user_obj->token      = get_user_meta( $this->user_id, $user_manager::TOKEN_KEY, true );
		$user_obj->expiration = get_user_meta( $this->user_id, $user_manager::EXPIRATION_KEY, true );
		$user_obj->_login_url = add_query_arg(
			[
				'tempaccess_token' => $user_obj->token,
			],
			wp_login_url()
		);
		$user_obj->expired    = ( $user_obj->expiration < time() );

		return apply_filters( 'tempaccess.api_user_modal', $user_obj );
	}

}
