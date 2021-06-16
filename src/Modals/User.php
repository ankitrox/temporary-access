<?php
/**
 * User Modal.
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Modals;

use Exception;
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
		'ID',
		'user_email',
		'first_name',
		'last_name',
		'user_login',
		'role',
		'user_pass',
	];

	public static $context;

	/**
	 * User constructor.
	 *
	 * @param array  $data    User data.
	 * @param string $context Context in which object is being used. Create/Update.
	 */
	public function __construct( array $data = [], string $context = 'create' ) {
		self::$context = $context;

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
	public function validate_user_email() {
		/**
		 * Email can be skipped during updation.
		 */
		if ( 'update' === self::$context && empty ( $this->user_email ) ) {
			return;
		}

		/**
		 * Email is mandatory during registration.
		 */
		if ( 'create' === self::$context && empty( $this->user_email ) ) {
			throw new InvalidArgumentException( __( 'Please provide email address', 'temporary-access' ) );
		}

		/**
		 * Email should not be already in use.
		 */
		if ( 'create' === self::$context && email_exists( $this->user_email ) ) {
			throw new InvalidArgumentException( __( 'Email is already associated with an account. Please use different email address', 'temporary-access' ) );
		}

		/**
		 * Finally, email needs to be a valid one.
		 */
		if ( ! empty( $this->user_email ) && ! filter_var( $this->user_email, FILTER_VALIDATE_EMAIL ) ) {
			throw new InvalidArgumentException( __( 'Invalid email address', 'temporary-access' ) );
		}

	}

	public function validate_role() {
		/**
		 * Email can be skipped during updation.
		 */
		if ( 'update' === self::$context && empty ( $this->role ) ) {
			return;
		}

		$roles = wp_roles()->roles;
		$roles = array_keys( $roles );

		if ( ! in_array( $this->role, $roles, true ) ) {
			throw new InvalidArgumentException( __( 'Invalid role selected', 'temporary-access' ) );
		}
	}

	public function validate_id() {
		if ( ! empty ( $this->id ) ) {
			$user = get_user_by( 'id', (int) $this->id );
			if ( ! $user ) {
				throw new Exception( __( 'Invalid ID specified for the user.', 'temporary-access' ) );
			}
		}
	}
}
