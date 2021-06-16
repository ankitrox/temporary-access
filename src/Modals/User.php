<?php
/**
 * User Modal.
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Modals;

use InvalidArgumentException;

/**
 * Class User
 *
 * @package Ankit\TemporaryAccess\Modal
 */
class User {
	/**
	 * Setter attrs.
	 *
	 * @var string[]
	 */
	public $setters = [
		'id',
		'email',
		'first_name',
		'last_name',
		'user_login',
		'role',
		'user_pass',
	];

	/**
	 * User constructor.
	 *
	 * @param array $data User data.
	 */
	public function __construct( array $data = [] ) {
		foreach ( $data as $k => $v ) {
			if ( in_array( $k, $this->setters, true ) ) {
				$this->{$k} = $v;
				if ( method_exists( $this, 'validate_' . $k ) ){
					call_user_func( [ $this, 'validate_' . $k ] );
				}
				continue;
			}

			$this->{$k} = null;
		}
	}

	/**
	 * Validate email address.
	 */
	public function validate_email() {
		if ( empty( $this->email ) || ! filter_var( $this->email, FILTER_VALIDATE_EMAIL ) ) {
			throw new InvalidArgumentException( __( 'Invalid email', 'temporary-access' ) );
		}
	}

	public function validate_role() {
		$roles = wp_roles()->roles;
		$roles = array_keys( $roles );

		if ( ! in_array( $this->role, $roles, true ) ) {
			throw new InvalidArgumentException( __( 'Invalid role selected', 'temporary-access' ) );
		}
	}
}
